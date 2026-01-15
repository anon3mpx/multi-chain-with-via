// SPDX-License-Identifier: MIT
pragma solidity ^0.8.17;

import "@vialabs-io/contracts/message/MessageClient.sol";
import "@openzeppelin/contracts/token/ERC20/ERC20.sol";
import "@openzeppelin/contracts/token/ERC20/extensions/ERC20Burnable.sol";
import "@openzeppelin/contracts/token/ERC20/IERC20.sol";
import "@openzeppelin/contracts/token/ERC20/utils/SafeERC20.sol";
import "@openzeppelin/contracts/security/ReentrancyGuard.sol";
import "@openzeppelin/contracts/security/Pausable.sol";
import "@openzeppelin/contracts/access/Ownable.sol";

/**
 * @title SyntheticBridge
 * @notice Mints/burns synthetic tokens on destination chains (e.g., wPLS on Base/Sei)
 * @dev Mainnet-ready synthetic bridge with multi-chain support
 * 
 * Complete Fee Structure:
 * 1. Protocol Fee: USDC collected by bridge operator (your revenue)
 * 2. VIA Source Fee: USDC (FEE_TOKEN) paid to VIA for message transmission
 * 3. VIA Destination Gas: Wrapped gas token (WETH/WMATIC/etc.) for destination execution
 * 
 * User must approve when bridging back:
 * 1. USDC for protocol fee + VIA source fee
 * 2. Wrapped gas token for VIA destination gas
 * 
 * Notes:
 * - Synthetic tokens can be minted from ANY configured collateral chain
 * - Synthetic tokens can be burned to return to ANY configured chain
 * - Multi-chain routing: Base → PulseChain, Sei → PulseChain, Base → Sei, etc.
 */
contract ViaSyntheticBridge is 
    ERC20, 
    ERC20Burnable, 
    MessageClient, 
    ReentrancyGuard, 
    Pausable, 
    Ownable 
{
    using SafeERC20 for IERC20;
    
    // ============ Immutable State ============
    
    /// @notice USDC token (used for both protocol fee and VIA source fee)
    IERC20 public immutable feeToken;
    
    // ============ Configuration State ============
    
    /// @notice Wrapped gas token per destination chain (WETH, WMATIC, etc.)
    mapping(uint32 => IERC20) public wrappedGasTokenPerChain;
    
    /// @notice Protocol fee per destination chain (in USDC, 6 decimals)
    /// @dev This is YOUR revenue. Example: 1 USDC = 1_000_000 (1e6)
    mapping(uint32 => uint256) public protocolFeePerChain;
    
    /// @notice VIA source fee per destination chain (in USDC, 6 decimals)
    /// @dev Fee paid to VIA for message transmission on source chain
    mapping(uint32 => uint256) public viaSourceFeePerChain;
    
    /// @notice VIA destination gas per destination chain (in wrapped gas token)
    /// @dev Fee paid to VIA for message execution on destination chain
    mapping(uint32 => uint256) public viaDestinationGasPerChain;
    
    /// @notice Remote contract addresses (collateral or synthetic bridges)
    mapping(uint32 => address) public remoteContracts;
    
    /// @notice Supported chains for bridging
    mapping(uint32 => bool) public supportedChains;
    
    /// @notice Chains authorized to mint synthetic tokens
    /// @dev Typically collateral chains (PulseChain) that lock native tokens
    mapping(uint32 => bool) public authorizedMinters;
    
    /// @notice Treasury address for protocol fee collection
    address public treasury;
    
    // ============ Statistics ============
    
    /// @notice Total volume bridged per chain
    mapping(uint32 => uint256) public volumePerChain;
    
    /// @notice Total protocol fees collected per chain
    mapping(uint32 => uint256) public protocolFeesCollectedPerChain;
    
    /// @notice Total VIA fees paid per chain
    mapping(uint32 => uint256) public viaFeesPaidPerChain;
    
    /// @notice Total minted per source chain
    mapping(uint32 => uint256) public mintedPerChain;
    
    /// @notice Total burned to destination chain
    mapping(uint32 => uint256) public burnedPerChain;
    
    // ============ Events ============
    
    event TokensMinted(
        uint256 indexed sourceChainId,
        address indexed recipient,
        uint256 amount
    );
    
    event TokensBurned(
        address indexed sender,
        uint32 indexed destChainId,
        address indexed recipient,
        uint256 amount,
        uint256 protocolFee,
        uint256 viaSourceFee,
        uint256 viaDestGas
    );
    
    event ChainConfigured(
        uint32 indexed chainId,
        address indexed remoteContract,
        address wrappedGasToken,
        uint256 protocolFee,
        uint256 viaSourceFee,
        uint256 viaDestGas,
        bool supported,
        bool authorizedMinter
    );
    
    event FeesUpdated(
        uint32 indexed chainId,
        uint256 protocolFee,
        uint256 viaSourceFee,
        uint256 viaDestGas
    );
    
    event TreasuryUpdated(address indexed oldTreasury, address indexed newTreasury);
    event MinterAuthorizationUpdated(uint32 indexed chainId, bool authorized);
    
    // ============ Errors ============
    
    error InvalidRecipient();
    error InvalidAmount();
    error ChainNotConfigured();
    error UnauthorizedMinter();
    error InvalidConfiguration();
    error InsufficientBalance();
    
    // ============ Constructor ============
    
    constructor(
        string memory _name,
        string memory _symbol,
        address _feeToken,
        address _messageV3Address,
        address _treasury,
        address _owner
    ) ERC20(_name, _symbol) {
        if (_feeToken == address(0)) revert InvalidConfiguration();
        if (_messageV3Address == address(0)) revert InvalidConfiguration();
        if (_treasury == address(0)) revert InvalidConfiguration();
        if (_owner == address(0)) revert InvalidConfiguration();
        
        feeToken = IERC20(_feeToken);
        MESSAGEv3 = IMessageV3(_messageV3Address);
        treasury = _treasury;
        
        _transferOwnership(_owner);
    }

    // ============ Main Bridge Function ============
    
    /**
     * @notice Bridge synthetic tokens back to destination chain
     * @param _destChainId Destination chain ID (collateral chain or another synthetic chain)
     * @param _recipient Recipient address on destination chain
     * @param _amount Amount of synthetic tokens to burn
     * @dev User must approve:
     *      1. feeToken (USDC) for protocolFee + viaSourceFee
     *      2. wrappedGasToken for viaDestinationGas
     *      3. Must have sufficient synthetic token balance
     */
    function bridge(
        uint32 _destChainId,
        address _recipient,
        uint256 _amount
    ) 
        external 
        nonReentrant 
        whenNotPaused 
    {
        // Validation
        if (_recipient == address(0)) revert InvalidRecipient();
        if (_amount == 0) revert InvalidAmount();
        if (balanceOf(msg.sender) < _amount) revert InsufficientBalance();
        if (!supportedChains[_destChainId]) revert ChainNotConfigured();
        if (remoteContracts[_destChainId] == address(0)) revert ChainNotConfigured();
        
        uint256 protocolFee = protocolFeePerChain[_destChainId];
        uint256 viaSourceFee = viaSourceFeePerChain[_destChainId];
        uint256 viaDestGas = viaDestinationGasPerChain[_destChainId];
        IERC20 wrappedGasToken = wrappedGasTokenPerChain[_destChainId];
        
        // Step 1: Collect protocol fee (goes to treasury)
        if (protocolFee > 0) {
            feeToken.safeTransferFrom(msg.sender, treasury, protocolFee);
            protocolFeesCollectedPerChain[_destChainId] += protocolFee;
        }
        
        // Step 2: Collect VIA source fee (stays in contract, VIA will pull it)
        if (viaSourceFee > 0) {
            feeToken.safeTransferFrom(msg.sender, address(this), viaSourceFee);
            viaFeesPaidPerChain[_destChainId] += viaSourceFee;
        }
        
        // Step 3: Collect VIA destination gas (stays in contract, VIA will pull it)
        if (viaDestGas > 0) {
            if (address(wrappedGasToken) == address(0)) revert InvalidConfiguration();
            wrappedGasToken.safeTransferFrom(msg.sender, address(this), viaDestGas);
        }
        
        // Step 4: Burn synthetic tokens
        _burn(msg.sender, _amount);
        
        // Step 5: Send cross-chain message (VIA will pull fees from this contract)
        bytes memory data = abi.encode(_recipient, _amount);
        _sendMessage(_destChainId, data);
        
        // Update statistics
        volumePerChain[_destChainId] += _amount;
        burnedPerChain[_destChainId] += _amount;
        
        emit TokensBurned(
            msg.sender,
            _destChainId,
            _recipient,
            _amount,
            protocolFee,
            viaSourceFee,
            viaDestGas
        );
    }
    
    /**
     * @notice Process incoming messages from VIA protocol
     * @dev Called by VIA's MessageV3 contract when minting synthetic tokens
     */
    function messageProcess(
        uint, // _txId
        uint _sourceChainId,
        address _sender,
        address, // _reference
        uint, // _protocolAmount
        bytes calldata _data
    ) external override onlySelf(_sender, _sourceChainId) {
        if (!supportedChains[uint32(_sourceChainId)]) revert ChainNotConfigured();
        if (!authorizedMinters[uint32(_sourceChainId)]) revert UnauthorizedMinter();
        
        (address recipient, uint256 amount) = abi.decode(_data, (address, uint256));
        
        if (recipient == address(0)) revert InvalidRecipient();
        if (amount == 0) revert InvalidAmount();
        
        // Mint synthetic tokens
        _mint(recipient, amount);
        
        // Update statistics
        mintedPerChain[uint32(_sourceChainId)] += amount;
        
        emit TokensMinted(_sourceChainId, recipient, amount);
    }

    // ============ Admin Functions ============
    
    /**
     * @notice Configure a destination chain with all parameters
     * @param _chainId Chain ID
     * @param _remoteContract Address of bridge contract on remote chain
     * @param _wrappedGasToken Wrapped gas token for destination
     * @param _protocolFee Protocol fee in USDC (6 decimals)
     * @param _viaSourceFee VIA source fee in USDC (6 decimals)
     * @param _viaDestGas VIA destination gas in wrapped gas token units
     * @param _supported Whether chain is supported for bridging
     * @param _authorizedMinter Whether chain can mint synthetic tokens (true for collateral chains)
     */
    function configureChain(
        uint32 _chainId,
        address _remoteContract,
        address _wrappedGasToken,
        uint256 _protocolFee,
        uint256 _viaSourceFee,
        uint256 _viaDestGas,
        bool _supported,
        bool _authorizedMinter
    ) external onlyOwner {
        if (_supported) {
            if (_remoteContract == address(0)) revert InvalidConfiguration();
            if (_wrappedGasToken == address(0)) revert InvalidConfiguration();
        }
        
        remoteContracts[_chainId] = _remoteContract;
        wrappedGasTokenPerChain[_chainId] = IERC20(_wrappedGasToken);
        protocolFeePerChain[_chainId] = _protocolFee;
        viaSourceFeePerChain[_chainId] = _viaSourceFee;
        viaDestinationGasPerChain[_chainId] = _viaDestGas;
        supportedChains[_chainId] = _supported;
        authorizedMinters[_chainId] = _authorizedMinter;
        
        emit ChainConfigured(
            _chainId,
            _remoteContract,
            _wrappedGasToken,
            _protocolFee,
            _viaSourceFee,
            _viaDestGas,
            _supported,
            _authorizedMinter
        );
    }
    
    /**
     * @notice Update minter authorization for a chain
     * @param _chainId Chain ID
     * @param _authorized Whether chain can mint synthetic tokens
     */
    function setMinterAuthorization(uint32 _chainId, bool _authorized) external onlyOwner {
        authorizedMinters[_chainId] = _authorized;
        emit MinterAuthorizationUpdated(_chainId, _authorized);
    }
    
    /**
     * @notice Update fees for a specific chain
     * @param _chainId Chain ID
     * @param _protocolFee New protocol fee in USDC
     * @param _viaSourceFee New VIA source fee in USDC
     * @param _viaDestGas New VIA destination gas in wrapped gas token
     */
    function updateFees(
        uint32 _chainId,
        uint256 _protocolFee,
        uint256 _viaSourceFee,
        uint256 _viaDestGas
    ) external onlyOwner {
        protocolFeePerChain[_chainId] = _protocolFee;
        viaSourceFeePerChain[_chainId] = _viaSourceFee;
        viaDestinationGasPerChain[_chainId] = _viaDestGas;
        
        emit FeesUpdated(_chainId, _protocolFee, _viaSourceFee, _viaDestGas);
    }
    
    /**
     * @notice Update treasury address
     * @param _newTreasury New treasury address
     */
    function updateTreasury(address _newTreasury) external onlyOwner {
        if (_newTreasury == address(0)) revert InvalidConfiguration();
        address oldTreasury = treasury;
        treasury = _newTreasury;
        emit TreasuryUpdated(oldTreasury, _newTreasury);
    }
    
    /**
     * @notice Configure VIA MessageClient
     * @param _messageV3 MessageV3 address
     * @param _chainIds Array of chain IDs
     * @param _endpoints Array of remote contract addresses
     * @param _confirmations Array of confirmation requirements
     */
    function configureMessageClient(
        address _messageV3,
        uint[] calldata _chainIds,
        address[] calldata _endpoints,
        uint16[] calldata _confirmations
    ) external onlyOwner {
        configureClient(_messageV3, _chainIds, _endpoints, _confirmations);
    }
    
    /**
     * @notice Pause/unpause bridge
     */
    function setPaused(bool _paused) external onlyOwner {
        if (_paused) _pause();
        else _unpause();
    }
    
    /**
     * @notice Emergency withdrawal (only for stuck tokens)
     * @param _token Token address (address(0) for native)
     * @param _amount Amount to withdraw
     * @param _to Recipient address
     */
    function emergencyWithdraw(
        address _token,
        uint256 _amount,
        address _to
    ) external onlyOwner {
        if (_to == address(0)) revert InvalidConfiguration();
        
        if (_token == address(0)) {
            payable(_to).transfer(_amount);
        } else {
            IERC20(_token).safeTransfer(_to, _amount);
        }
    }

    // ============ View Functions ============
    
    /**
     * @notice Get complete fee breakdown for bridging to a destination
     * @param _destChainId Destination chain ID
     * @return protocolFee Protocol fee in USDC (your revenue)
     * @return viaSourceFee VIA source fee in USDC
     * @return viaDestGas VIA destination gas in wrapped gas token
     * @return totalUsdcRequired Total USDC user needs to approve
     */
    function getBridgeFees(uint32 _destChainId) external view returns (
        uint256 protocolFee,
        uint256 viaSourceFee,
        uint256 viaDestGas,
        uint256 totalUsdcRequired
    ) {
        protocolFee = protocolFeePerChain[_destChainId];
        viaSourceFee = viaSourceFeePerChain[_destChainId];
        viaDestGas = viaDestinationGasPerChain[_destChainId];
        totalUsdcRequired = protocolFee + viaSourceFee;
    }
    
    /**
     * @notice Get wrapped gas token for a destination chain
     */
    function getWrappedGasToken(uint32 _destChainId) external view returns (address) {
        return address(wrappedGasTokenPerChain[_destChainId]);
    }
    
    /**
     * @notice Check if chain is properly configured
     */
    function isChainConfigured(uint32 _chainId) external view returns (bool) {
        return supportedChains[_chainId] && 
               remoteContracts[_chainId] != address(0) &&
               address(wrappedGasTokenPerChain[_chainId]) != address(0);
    }
    
    /**
     * @notice Check if chain is authorized to mint
     */
    function isAuthorizedMinter(uint32 _chainId) external view returns (bool) {
        return authorizedMinters[_chainId];
    }
    
    /**
     * @notice Get comprehensive bridge statistics for a chain
     */
    function getChainStats(uint32 _chainId) external view returns (
        uint256 volume,
        uint256 protocolFeesCollected,
        uint256 viaFeesPaid,
        uint256 minted,
        uint256 burned,
        uint256 protocolFee,
        uint256 viaSourceFee,
        uint256 viaDestGas,
        address remoteContract,
        address wrappedGasToken,
        bool supported,
        bool authorizedMinter
    ) {
        return (
            volumePerChain[_chainId],
            protocolFeesCollectedPerChain[_chainId],
            viaFeesPaidPerChain[_chainId],
            mintedPerChain[_chainId],
            burnedPerChain[_chainId],
            protocolFeePerChain[_chainId],
            viaSourceFeePerChain[_chainId],
            viaDestinationGasPerChain[_chainId],
            remoteContracts[_chainId],
            address(wrappedGasTokenPerChain[_chainId]),
            supportedChains[_chainId],
            authorizedMinters[_chainId]
        );
    }
    
    /**
     * @notice Get overall supply statistics
     */
    function getSupplyStats() external view returns (
        uint256 currentTotalSupply,
        uint256 totalMintedAllChains,
        uint256 totalBurnedAllChains
    ) {
        currentTotalSupply = totalSupply();
        
        // Note: To get accurate totals across all chains without iteration,
        // you could maintain cumulative counters in state if needed
        totalMintedAllChains = 0; // Implement if needed
        totalBurnedAllChains = 0; // Implement if needed
    }
    
    // ============ Receive Function ============
    
    /// @notice Accept native token (for potential future use)
    // receive() external payable override {}
}