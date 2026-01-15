// SPDX-License-Identifier: MIT
pragma solidity ^0.8.17;

import "@vialabs-io/contracts/message/MessageClient.sol";
import "@openzeppelin/contracts/token/ERC20/IERC20.sol";
import "@openzeppelin/contracts/token/ERC20/utils/SafeERC20.sol";
import "@openzeppelin/contracts/security/ReentrancyGuard.sol";
import "@openzeppelin/contracts/security/Pausable.sol";
import "@openzeppelin/contracts/access/Ownable.sol";

/**
 * @title CollateralBridge
 * @notice Locks native tokens on source chain (e.g., wPLS on PulseChain)
 * @dev Mainnet-ready collateral bridge with multi-chain support
 * 
 * Complete Fee Structure:
 * 1. Protocol Fee: USDC collected by bridge operator (your revenue)
 * 2. VIA Source Fee: USDC (FEE_TOKEN) paid to VIA for message transmission
 * 3. VIA Destination Gas: Wrapped gas token (WETH/WMATIC/etc.) for destination execution
 * 
 * User must approve:
 * 1. Collateral token (e.g., wPLS) for bridge amount
 * 2. USDC for protocol fee + VIA source fee
 * 3. Wrapped gas token for VIA destination gas
 */
contract ViaCollateralBridge is MessageClient, ReentrancyGuard, Pausable, Ownable {
    using SafeERC20 for IERC20;
    
    // ============ Immutable State ============
    
    /// @notice Token being locked as collateral (e.g., wPLS)
    IERC20 public immutable collateralToken;
    
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
    
    /// @notice Remote synthetic token contracts per chain
    mapping(uint32 => address) public remoteSyntheticContracts;
    
    /// @notice Supported destination chains
    mapping(uint32 => bool) public supportedChains;
    
    /// @notice Treasury address for protocol fee collection
    address public treasury;
    
    // ============ Statistics ============
    
    /// @notice Total volume bridged per chain
    mapping(uint32 => uint256) public volumePerChain;
    
    /// @notice Total protocol fees collected per chain
    mapping(uint32 => uint256) public protocolFeesCollectedPerChain;
    
    /// @notice Total VIA fees paid per chain
    mapping(uint32 => uint256) public viaFeesPaidPerChain;
    
    // ============ Events ============
    
    event TokensLocked(
        address indexed sender,
        uint32 indexed destChainId,
        address indexed recipient,
        uint256 amount,
        uint256 protocolFee,
        uint256 viaSourceFee,
        uint256 viaDestGas
    );
    
    event TokensUnlocked(
        uint256 indexed sourceChainId,
        address indexed recipient,
        uint256 amount
    );
    
    event ChainConfigured(
        uint32 indexed chainId,
        address indexed remoteContract,
        address wrappedGasToken,
        uint256 protocolFee,
        uint256 viaSourceFee,
        uint256 viaDestGas,
        bool supported
    );
    
    event FeesUpdated(
        uint32 indexed chainId,
        uint256 protocolFee,
        uint256 viaSourceFee,
        uint256 viaDestGas
    );
    
    event TreasuryUpdated(address indexed oldTreasury, address indexed newTreasury);
    
    // ============ Errors ============
    
    error InvalidRecipient();
    error InvalidAmount();
    error ChainNotConfigured();
    error UnauthorizedSourceChain();
    error InvalidConfiguration();
    error InsufficientFeeTokenBalance();
    error InsufficientGasTokenBalance();
    
    // ============ Constructor ============
    
    constructor(
        address _collateralToken,
        address _feeToken,
        address _messageV3Address,
        address _treasury,
        address _owner
    ) {
        if (_collateralToken == address(0)) revert InvalidConfiguration();
        if (_feeToken == address(0)) revert InvalidConfiguration();
        if (_messageV3Address == address(0)) revert InvalidConfiguration();
        if (_treasury == address(0)) revert InvalidConfiguration();
        if (_owner == address(0)) revert InvalidConfiguration();
        
        collateralToken = IERC20(_collateralToken);
        feeToken = IERC20(_feeToken);
        MESSAGEv3 = IMessageV3(_messageV3Address);
        treasury = _treasury;
        
        _transferOwnership(_owner);
    }

    // ============ Main Bridge Function ============
    
    /**
     * @notice Bridge tokens to destination chain with complete fee collection
     * @param _destChainId Destination chain ID
     * @param _recipient Recipient address on destination chain
     * @param _amount Amount of collateral tokens to lock
     * @dev User must approve:
     *      1. collateralToken for _amount
     *      2. feeToken (USDC) for protocolFee + viaSourceFee
     *      3. wrappedGasToken for viaDestinationGas
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
        if (!supportedChains[_destChainId]) revert ChainNotConfigured();
        if (remoteSyntheticContracts[_destChainId] == address(0)) revert ChainNotConfigured();
        
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
        
        // Step 4: Lock collateral tokens
        collateralToken.safeTransferFrom(msg.sender, address(this), _amount);
        
        // Step 5: Send cross-chain message (VIA will pull fees from this contract)
        bytes memory data = abi.encode(_recipient, _amount);
        _sendMessage(_destChainId, data);
        
        // Update statistics
        volumePerChain[_destChainId] += _amount;
        
        emit TokensLocked(
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
     * @dev Called by VIA's MessageV3 contract when unlocking tokens
     */
    function messageProcess(
        uint, // _txId
        uint _sourceChainId,
        address _sender,
        address, // _reference
        uint, // _protocolAmount
        bytes calldata _data
    ) external override onlySelf(_sender, _sourceChainId) {
        if (!supportedChains[uint32(_sourceChainId)]) revert UnauthorizedSourceChain();
        
        (address recipient, uint256 amount) = abi.decode(_data, (address, uint256));
        
        if (recipient == address(0)) revert InvalidRecipient();
        if (amount == 0) revert InvalidAmount();
        
        // Unlock collateral tokens
        collateralToken.safeTransfer(recipient, amount);
        
        emit TokensUnlocked(_sourceChainId, recipient, amount);
    }

    // ============ Admin Functions ============
    
    /**
     * @notice Configure a destination chain with all parameters
     * @param _chainId Destination chain ID
     * @param _remoteContract Address of synthetic bridge on destination chain
     * @param _wrappedGasToken Wrapped gas token for destination (WETH, WMATIC, etc.)
     * @param _protocolFee Protocol fee in USDC (6 decimals, e.g., 1e6 = 1 USDC)
     * @param _viaSourceFee VIA source fee in USDC (6 decimals)
     * @param _viaDestGas VIA destination gas in wrapped gas token units
     * @param _supported Whether chain is supported
     */
    function configureChain(
        uint32 _chainId,
        address _remoteContract,
        address _wrappedGasToken,
        uint256 _protocolFee,
        uint256 _viaSourceFee,
        uint256 _viaDestGas,
        bool _supported
    ) external onlyOwner {
        if (_supported) {
            if (_remoteContract == address(0)) revert InvalidConfiguration();
            if (_wrappedGasToken == address(0)) revert InvalidConfiguration();
        }
        
        remoteSyntheticContracts[_chainId] = _remoteContract;
        wrappedGasTokenPerChain[_chainId] = IERC20(_wrappedGasToken);
        protocolFeePerChain[_chainId] = _protocolFee;
        viaSourceFeePerChain[_chainId] = _viaSourceFee;
        viaDestinationGasPerChain[_chainId] = _viaDestGas;
        supportedChains[_chainId] = _supported;
        
        emit ChainConfigured(
            _chainId,
            _remoteContract,
            _wrappedGasToken,
            _protocolFee,
            _viaSourceFee,
            _viaDestGas,
            _supported
        );
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
     * @notice Emergency withdrawal (only for stuck tokens, not collateral in normal operation)
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
     * @notice Get total locked collateral
     */
    function totalLocked() external view returns (uint256) {
        return collateralToken.balanceOf(address(this));
    }
    
    /**
     * @notice Check if chain is properly configured
     */
    function isChainConfigured(uint32 _chainId) external view returns (bool) {
        return supportedChains[_chainId] && 
               remoteSyntheticContracts[_chainId] != address(0) &&
               address(wrappedGasTokenPerChain[_chainId]) != address(0);
    }
    
    /**
     * @notice Get comprehensive bridge statistics for a chain
     */
    function getChainStats(uint32 _chainId) external view returns (
        uint256 volume,
        uint256 protocolFeesCollected,
        uint256 viaFeesPaid,
        uint256 protocolFee,
        uint256 viaSourceFee,
        uint256 viaDestGas,
        address remoteContract,
        address wrappedGasToken,
        bool supported
    ) {
        return (
            volumePerChain[_chainId],
            protocolFeesCollectedPerChain[_chainId],
            viaFeesPaidPerChain[_chainId],
            protocolFeePerChain[_chainId],
            viaSourceFeePerChain[_chainId],
            viaDestinationGasPerChain[_chainId],
            remoteSyntheticContracts[_chainId],
            address(wrappedGasTokenPerChain[_chainId]),
            supportedChains[_chainId]
        );
    }
    
    // ============ Receive Function ============
    
    /// @notice Accept native token (for potential future use)
    // receive() external payable override {}
}