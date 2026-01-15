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
 * @title ViaSyntheticBridgeV6
 * @notice Mints/burns synthetic tokens on destination chains.
 * @dev Version 6: Global Gas Config.
 * - Single 'wrappedGasToken' for ALL routes.
 * - Single 'globalMinDestGas' enforces mandatory collection.
 */
contract ViaSyntheticBridgeV6 is 
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
    // V6: Global Token for gas. Applies to ALL chains.
    IERC20 public wrappedGasToken;
    
    // V6: Global Minimum Gas Floor. Applies to ALL chains.
    uint256 public globalMinDestGas;

    mapping(uint32 => uint256) public protocolFeePerChain;
    mapping(uint32 => uint256) public viaSourceFeePerChain;
    
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
    event ChainConfigured(uint32 indexed chainId, address indexed remoteContract, uint256 protocolFee, uint256 viaSourceFee, bool supported, bool authorizedMinter);
    event FeesUpdated(uint32 indexed chainId, uint256 protocolFee, uint256 viaSourceFee);
    event GlobalGasConfigUpdated(address indexed token, uint256 minGas);
    event TreasuryUpdated(address indexed oldTreasury, address indexed newTreasury);
    event MinterAuthorizationUpdated(uint32 indexed chainId, bool authorized);

    // ============ Errors ============
    error InvalidRecipient();
    error InvalidAmount();
    error ChainNotConfigured();
    error UnauthorizedMinter();
    error InvalidSourceChain();
    error InvalidConfiguration();
    error InsufficientBalance();
    error InsufficientGasFee(); // V6

    constructor(
        string memory _name,
        string memory _symbol,
        address _feeToken,
        address _wrappedGasToken, // Set immediately
        address _messageV3Address,
        address _treasury,
        address _owner
    ) ERC20(_name, _symbol) {
        if (_feeToken == address(0) || _wrappedGasToken == address(0) || _messageV3Address == address(0) || _treasury == address(0) || _owner == address(0)) revert InvalidConfiguration();
        
        feeToken = IERC20(_feeToken);
        wrappedGasToken = IERC20(_wrappedGasToken);
        MESSAGEv3 = IMessageV3(_messageV3Address);
        treasury = _treasury;

        globalMinDestGas = 1000;

        // Approve MessageV3 (Reset then Max)
        feeToken.safeApprove(_messageV3Address, 0);
        feeToken.safeApprove(_messageV3Address, type(uint256).max);

        // V6: Approve Wrapped Gas
        wrappedGasToken.safeApprove(_messageV3Address, 0);
        wrappedGasToken.safeApprove(_messageV3Address, type(uint256).max);
        
        _transferOwnership(_owner);
    }

    // ============ Main Bridge Function ============
    function bridge(
        uint32 _destChainId,
        address _recipient,
        uint256 _amount,
        uint256 _viaDestGas // Input: Frontend Calculated Fee
    ) external nonReentrant whenNotPaused {
        if (_recipient == address(0)) revert InvalidRecipient();
        if (_amount == 0) revert InvalidAmount();
        if (balanceOf(msg.sender) < _amount) revert InsufficientBalance();
        if (!supportedChains[_destChainId]) revert ChainNotConfigured();
        if (remoteContracts[_destChainId] == address(0)) revert ChainNotConfigured();
        
        // V6: Mandatory Gas Check
        if (_viaDestGas < globalMinDestGas) revert InsufficientGasFee();

        uint256 protocolFee = protocolFeePerChain[_destChainId];
        uint256 viaSourceFee = viaSourceFeePerChain[_destChainId];
        
        // 1. Collect Fees
        if (protocolFee > 0) {
            feeToken.safeTransferFrom(msg.sender, treasury, protocolFee);
            protocolFeesCollectedPerChain[_destChainId] += protocolFee;
        }
        
        if (viaSourceFee > 0) {
            feeToken.safeTransferFrom(msg.sender, address(this), viaSourceFee);
            viaFeesPaidPerChain[_destChainId] += viaSourceFee;
        }
        
        // 2. Collect Gas (Global Token)
        wrappedGasToken.safeTransferFrom(msg.sender, address(this), _viaDestGas);
        
        // 3. Burn Synthetic Tokens
        _burn(msg.sender, _amount);

        // 4. Send Message
        bytes memory data = abi.encode(_recipient, _amount);
        _sendMessage(_destChainId, data);

        volumePerChain[_destChainId] += _amount;
        burnedPerChain[_destChainId] += _amount;
        emit TokensBurned(msg.sender, _destChainId, _recipient, _amount, protocolFee, viaSourceFee, _viaDestGas);
    }
    
    function messageProcess(
        uint, uint _sourceChainId, address _sender, address, uint, bytes calldata _data
    ) external override onlySelf(_sender, _sourceChainId) {
        if (_sourceChainId > type(uint32).max) revert InvalidSourceChain();
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
        uint256 _protocolFee,
        uint256 _viaSourceFee,
        bool _supported,
        bool _authorizedMinter
    ) external onlyOwner {
        if (_supported) {
            if (_remoteContract == address(0)) revert InvalidConfiguration();
        }
        
        remoteContracts[_chainId] = _remoteContract;
        protocolFeePerChain[_chainId] = _protocolFee;
        viaSourceFeePerChain[_chainId] = _viaSourceFee;
        supportedChains[_chainId] = _supported;
        authorizedMinters[_chainId] = _authorizedMinter;

        emit ChainConfigured(_chainId, _remoteContract, _protocolFee, _viaSourceFee, _supported, _authorizedMinter);
    }
    
    // V6: Global Gas Config
    function updateGlobalGasConfig(address _newGasToken, uint256 _newMinGas) external onlyOwner {
        if (_newGasToken != address(0)) {
            wrappedGasToken = IERC20(_newGasToken);
            wrappedGasToken.safeApprove(address(MESSAGEv3), 0);
            wrappedGasToken.safeApprove(address(MESSAGEv3), type(uint256).max);
        }
        globalMinDestGas = _newMinGas;
        emit GlobalGasConfigUpdated(address(wrappedGasToken), _newMinGas);
    }

    function setMinterAuthorization(uint32 _chainId, bool _authorized) external onlyOwner {
        authorizedMinters[_chainId] = _authorized;
        emit MinterAuthorizationUpdated(_chainId, _authorized);
    }
    
    function updateFees(uint32 _chainId, uint256 _protocolFee, uint256 _viaSourceFee) external onlyOwner {
        protocolFeePerChain[_chainId] = _protocolFee;
        viaSourceFeePerChain[_chainId] = _viaSourceFee;
        emit FeesUpdated(_chainId, _protocolFee, _viaSourceFee);
    }
    
    function updateTreasury(address _newTreasury) external onlyOwner {
        if (_newTreasury == address(0)) revert InvalidConfiguration();
        address oldTreasury = treasury;
        treasury = _newTreasury;
        emit TreasuryUpdated(oldTreasury, _newTreasury);
    }
    
    function configureMessageClient(address _messageV3, uint[] calldata _chainIds, address[] calldata _endpoints, uint16[] calldata _confirmations) external onlyOwner {
        configureClient(_messageV3, _chainIds, _endpoints, _confirmations);
        feeToken.safeApprove(_messageV3, 0);
        feeToken.safeApprove(_messageV3, type(uint256).max);
    }
    
    function setPaused(bool _paused) external onlyOwner {
        if (_paused) _pause();
        else _unpause();
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
    function getBridgeFees(uint32 _destChainId) external view returns (uint256 protocolFee, uint256 viaSourceFee, uint256 globalMinGas, uint256 totalFixedFees) {
        protocolFee = protocolFeePerChain[_destChainId];
        viaSourceFee = viaSourceFeePerChain[_destChainId];
        globalMinGas = globalMinDestGas;
        
        totalFixedFees = protocolFee + viaSourceFee;
    }
    
    function getWrappedGasToken() external view returns (address) {
        return address(wrappedGasToken);
    }
    
    function isChainConfigured(uint32 _chainId) external view returns (bool) {
        return supportedChains[_chainId] && remoteContracts[_chainId] != address(0);
    }
    
    function isAuthorizedMinter(uint32 _chainId) external view returns (bool) {
        return authorizedMinters[_chainId];
    }
    
    function getChainStats(uint32 _chainId) external view returns (uint256 volume, uint256 protocolFeesCollected, uint256 viaFeesPaid, uint256 minted, uint256 burned, uint256 protocolFee, uint256 viaSourceFee, address remoteContract, bool supported, bool authorizedMinter) {
        return (volumePerChain[_chainId], protocolFeesCollectedPerChain[_chainId], viaFeesPaidPerChain[_chainId], mintedPerChain[_chainId], burnedPerChain[_chainId], protocolFeePerChain[_chainId], viaSourceFeePerChain[_chainId], remoteContracts[_chainId], supportedChains[_chainId], authorizedMinters[_chainId]);
    }
    
    function getSupplyStats() external view returns (uint256 currentTotalSupply, uint256 totalMintedAllChains, uint256 totalBurnedAllChains) {
        currentTotalSupply = totalSupply();
        totalMintedAllChains = 0;
        totalBurnedAllChains = 0;
    }
}