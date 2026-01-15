// SPDX-License-Identifier: MIT
pragma solidity ^0.8.17;

import "@vialabs-io/contracts/message/MessageClient.sol";
import "@openzeppelin/contracts/token/ERC20/ERC20.sol";
import "@openzeppelin/contracts/token/ERC20/IERC20.sol";
import "@openzeppelin/contracts/token/ERC20/utils/SafeERC20.sol";
import "@openzeppelin/contracts/security/ReentrancyGuard.sol";
import "@openzeppelin/contracts/security/Pausable.sol";
import "@openzeppelin/contracts/access/Ownable.sol";

/**
 * @title SyntheticBridge
 * @notice Mints/burns synthetic tokens on destination chains.
 * @dev Final Version: Removed ERC20Burnable, fixed approvals for future config updates.
 */
contract ViaSyntheticBridge is 
    ERC20, 
    MessageClient, 
    ReentrancyGuard, 
    Pausable, 
    Ownable 
{
    using SafeERC20 for IERC20;

    // ============ Immutable State ============
    IERC20 public immutable feeToken; // USDC

    // ============ Configuration State ============
    mapping(uint32 => IERC20) public wrappedGasTokenPerChain;
    mapping(uint32 => uint256) public protocolFeePerChain;
    mapping(uint32 => uint256) public viaSourceFeePerChain;
    mapping(uint32 => uint256) public viaDestinationGasPerChain;
    mapping(uint32 => address) public remoteContracts;
    mapping(uint32 => bool) public supportedChains;
    mapping(uint32 => bool) public authorizedMinters;
    address public treasury;

    // ============ Statistics ============
    mapping(uint32 => uint256) public volumePerChain;
    mapping(uint32 => uint256) public protocolFeesCollectedPerChain;
    mapping(uint32 => uint256) public viaFeesPaidPerChain;
    mapping(uint32 => uint256) public mintedPerChain;
    mapping(uint32 => uint256) public burnedPerChain;

    // ============ Events ============
    event TokensMinted(uint256 indexed sourceChainId, address indexed recipient, uint256 amount);
    event TokensBurned(address indexed sender, uint32 indexed destChainId, address indexed recipient, uint256 amount, uint256 protocolFee, uint256 viaSourceFee, uint256 viaDestGas);
    event ChainConfigured(uint32 indexed chainId, address indexed remoteContract, address wrappedGasToken, uint256 protocolFee, uint256 viaSourceFee, uint256 viaDestGas, bool supported, bool authorizedMinter);
    event FeesUpdated(uint32 indexed chainId, uint256 protocolFee, uint256 viaSourceFee, uint256 viaDestGas);
    event TreasuryUpdated(address indexed oldTreasury, address indexed newTreasury);
    event MinterAuthorizationUpdated(uint32 indexed chainId, bool authorized);
    
    // ============ Errors ============
    error InvalidRecipient();
    error InvalidAmount();
    error ChainNotConfigured();
    error UnauthorizedMinter();
    error InvalidConfiguration();
    error InsufficientBalance();
    
    constructor(
        string memory _name,
        string memory _symbol,
        address _feeToken,
        address _messageV3Address,
        address _treasury,
        address _owner
    ) ERC20(_name, _symbol) {
        if (_feeToken == address(0) || _messageV3Address == address(0) || _treasury == address(0) || _owner == address(0)) revert InvalidConfiguration();
        
        feeToken = IERC20(_feeToken);
        MESSAGEv3 = IMessageV3(_messageV3Address);
        treasury = _treasury;

        // Approve MessageV3 (Reset then Max)
        feeToken.safeApprove(_messageV3Address, 0);
        feeToken.safeApprove(_messageV3Address, type(uint256).max);
        
        _transferOwnership(_owner);
    }

    // ============================================================
    // TODO: HARDCODED DECIMALS FOR pHEX DEPLOYMENT
    // REMOVE THIS OVERRIDE FOR OTHER TOKEN DEPLOYMENTS (e.g., WPLS, PLSX, INC)
    // These tokens use the default 18 decimals
    // ============================================================
    function decimals() public view virtual override returns (uint8) {
        return 8; // pHEX uses 8 decimals
    }
    // ============================================================
    // END OF pHEX-SPECIFIC MODIFICATION
    // ============================================================

    // ============ Main Bridge Function ============
    function bridge(
        uint32 _destChainId,
        address _recipient,
        uint256 _amount
    ) external nonReentrant whenNotPaused {
        if (_recipient == address(0)) revert InvalidRecipient();
        if (_amount == 0) revert InvalidAmount();
        if (balanceOf(msg.sender) < _amount) revert InsufficientBalance();
        if (!supportedChains[_destChainId]) revert ChainNotConfigured();
        if (remoteContracts[_destChainId] == address(0)) revert ChainNotConfigured();
        
        uint256 protocolFee = protocolFeePerChain[_destChainId];
        uint256 viaSourceFee = viaSourceFeePerChain[_destChainId];
        uint256 viaDestGas = viaDestinationGasPerChain[_destChainId];
        IERC20 wrappedGasToken = wrappedGasTokenPerChain[_destChainId];
        
        // 1. Collect Fees
        if (protocolFee > 0) {
            feeToken.safeTransferFrom(msg.sender, treasury, protocolFee);
            protocolFeesCollectedPerChain[_destChainId] += protocolFee;
        }
        
        if (viaSourceFee > 0) {
            feeToken.safeTransferFrom(msg.sender, address(this), viaSourceFee);
            viaFeesPaidPerChain[_destChainId] += viaSourceFee;
        }
        
        if (viaDestGas > 0) {
            if (address(wrappedGasToken) == address(0)) revert InvalidConfiguration();
            wrappedGasToken.safeTransferFrom(msg.sender, address(this), viaDestGas);
        }
        
        // 2. Burn Synthetic Tokens
        _burn(msg.sender, _amount);

        // 3. Send Message
        bytes memory data = abi.encode(_recipient, _amount);
        _sendMessage(_destChainId, data);
        
        volumePerChain[_destChainId] += _amount;
        burnedPerChain[_destChainId] += _amount;
        emit TokensBurned(msg.sender, _destChainId, _recipient, _amount, protocolFee, viaSourceFee, viaDestGas);
    }
    
    function messageProcess(
        uint, uint _sourceChainId, address _sender, address, uint, bytes calldata _data
    ) external override onlySelf(_sender, _sourceChainId) {
        if (!supportedChains[uint32(_sourceChainId)]) revert ChainNotConfigured();
        if (!authorizedMinters[uint32(_sourceChainId)]) revert UnauthorizedMinter();
        
        (address recipient, uint256 amount) = abi.decode(_data, (address, uint256));
        
        if (recipient == address(0)) revert InvalidRecipient();
        if (amount == 0) revert InvalidAmount();
        
        _mint(recipient, amount);
        mintedPerChain[uint32(_sourceChainId)] += amount;
        emit TokensMinted(_sourceChainId, recipient, amount);
    }

    // ============ Admin Functions ============
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
            if (_remoteContract == address(0) || _wrappedGasToken == address(0)) revert InvalidConfiguration();
        }
        
        remoteContracts[_chainId] = _remoteContract;
        wrappedGasTokenPerChain[_chainId] = IERC20(_wrappedGasToken);
        protocolFeePerChain[_chainId] = _protocolFee;
        viaSourceFeePerChain[_chainId] = _viaSourceFee;
        viaDestinationGasPerChain[_chainId] = _viaDestGas;
        supportedChains[_chainId] = _supported;
        authorizedMinters[_chainId] = _authorizedMinter;

        // FIX: Safe Reset-Approval Pattern
        if (_wrappedGasToken != address(0)) {
            IERC20(_wrappedGasToken).safeApprove(address(MESSAGEv3), 0);
            IERC20(_wrappedGasToken).safeApprove(address(MESSAGEv3), type(uint256).max);
        }

        emit ChainConfigured(_chainId, _remoteContract, _wrappedGasToken, _protocolFee, _viaSourceFee, _viaDestGas, _supported, _authorizedMinter);
    }
    
    function setMinterAuthorization(uint32 _chainId, bool _authorized) external onlyOwner {
        authorizedMinters[_chainId] = _authorized;
        emit MinterAuthorizationUpdated(_chainId, _authorized);
    }
    
    function updateFees(uint32 _chainId, uint256 _protocolFee, uint256 _viaSourceFee, uint256 _viaDestGas) external onlyOwner {
        protocolFeePerChain[_chainId] = _protocolFee;
        viaSourceFeePerChain[_chainId] = _viaSourceFee;
        viaDestinationGasPerChain[_chainId] = _viaDestGas;
        emit FeesUpdated(_chainId, _protocolFee, _viaSourceFee, _viaDestGas);
    }
    
    function updateTreasury(address _newTreasury) external onlyOwner {
        if (_newTreasury == address(0)) revert InvalidConfiguration();
        address oldTreasury = treasury;
        treasury = _newTreasury;
        emit TreasuryUpdated(oldTreasury, _newTreasury);
    }
    
    function configureMessageClient(address _messageV3, uint[] calldata _chainIds, address[] calldata _endpoints, uint16[] calldata _confirmations) external onlyOwner {
        configureClient(_messageV3, _chainIds, _endpoints, _confirmations);
        
        // FIX: Safe Reset-Approval Pattern
        feeToken.safeApprove(_messageV3, 0);
        feeToken.safeApprove(_messageV3, type(uint256).max);
    }
    
    function setPaused(bool _paused) external onlyOwner {
        if (_paused) _pause(); else _unpause();
    }
    
    function emergencyWithdraw(address _token, uint256 _amount, address _to) external onlyOwner {
        if (_to == address(0)) revert InvalidConfiguration();
        if (_token == address(0)) {
            payable(_to).transfer(_amount);
        } else {
            IERC20(_token).safeTransfer(_to, _amount);
        }
    }

    // ============ View Functions ============
    function getBridgeFees(uint32 _destChainId) external view returns (uint256 protocolFee, uint256 viaSourceFee, uint256 viaDestGas, uint256 totalUsdcRequired) {
        protocolFee = protocolFeePerChain[_destChainId];
        viaSourceFee = viaSourceFeePerChain[_destChainId];
        viaDestGas = viaDestinationGasPerChain[_destChainId];
        totalUsdcRequired = protocolFee + viaSourceFee;
    }
    
    function getWrappedGasToken(uint32 _destChainId) external view returns (address) {
        return address(wrappedGasTokenPerChain[_destChainId]);
    }
    
    function isChainConfigured(uint32 _chainId) external view returns (bool) {
        return supportedChains[_chainId] && remoteContracts[_chainId] != address(0) && address(wrappedGasTokenPerChain[_chainId]) != address(0);
    }
    
    function isAuthorizedMinter(uint32 _chainId) external view returns (bool) {
        return authorizedMinters[_chainId];
    }
    
    function getChainStats(uint32 _chainId) external view returns (uint256 volume, uint256 protocolFeesCollected, uint256 viaFeesPaid, uint256 minted, uint256 burned, uint256 protocolFee, uint256 viaSourceFee, uint256 viaDestGas, address remoteContract, address wrappedGasToken, bool supported, bool authorizedMinter) {
        return (volumePerChain[_chainId], protocolFeesCollectedPerChain[_chainId], viaFeesPaidPerChain[_chainId], mintedPerChain[_chainId], burnedPerChain[_chainId], protocolFeePerChain[_chainId], viaSourceFeePerChain[_chainId], viaDestinationGasPerChain[_chainId], remoteContracts[_chainId], address(wrappedGasTokenPerChain[_chainId]), supportedChains[_chainId], authorizedMinters[_chainId]);
    }
    
    function getSupplyStats() external view returns (uint256 currentTotalSupply, uint256 totalMintedAllChains, uint256 totalBurnedAllChains) {
        currentTotalSupply = totalSupply();
        totalMintedAllChains = 0;
        totalBurnedAllChains = 0;
    }
    
    // receive() function removed to use parent implementation
}