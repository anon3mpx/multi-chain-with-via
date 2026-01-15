// SPDX-License-Identifier: MIT
pragma solidity ^0.8.17;

import "@vialabs-io/contracts/message/MessageClient.sol";
import "@openzeppelin/contracts/token/ERC20/IERC20.sol";
import "@openzeppelin/contracts/token/ERC20/utils/SafeERC20.sol";
import "@openzeppelin/contracts/security/ReentrancyGuard.sol";
import "@openzeppelin/contracts/security/Pausable.sol";
import "@openzeppelin/contracts/access/Ownable.sol";

/**
 * @title ViaCollateralBridgeV3
 * @notice Locks native tokens on source chain.
 * @dev Version 3: Dynamic Gas Pricing with Gas Floor, Slippage Protection, and Chain Validation.
 */
contract ViaCollateralBridgeV3 is MessageClient, ReentrancyGuard, Pausable, Ownable {
    using SafeERC20 for IERC20;
    
    // ============ Immutable State ============
    IERC20 public immutable collateralToken;
    IERC20 public immutable feeToken; // USDC

    // ============ Configuration State ============
    mapping(uint32 => IERC20) public wrappedGasTokenPerChain;
    mapping(uint32 => uint256) public protocolFeePerChain;
    mapping(uint32 => uint256) public viaSourceFeePerChain;
    
    // Global Settlement Limit for all chains
    uint256 public settlementGasLimit;
    
    // Minimum Gas Price Floor to prevent manipulation
    uint256 public minGasPrice;
    
    mapping(uint32 => address) public remoteSyntheticContracts;
    mapping(uint32 => bool) public supportedChains;
    address public treasury;

    // ============ Statistics ============
    mapping(uint32 => uint256) public volumePerChain;
    mapping(uint32 => uint256) public protocolFeesCollectedPerChain;
    mapping(uint32 => uint256) public viaFeesPaidPerChain;

    // ============ Events ============
    event TokensLocked(address indexed sender, uint32 indexed destChainId, address indexed recipient, uint256 amount, uint256 protocolFee, uint256 viaSourceFee, uint256 viaDestGas);
    event TokensUnlocked(uint256 indexed sourceChainId, address indexed recipient, uint256 amount);
    
    event ChainConfigured(uint32 indexed chainId, address indexed remoteContract, address wrappedGasToken, uint256 protocolFee, uint256 viaSourceFee, bool supported);
    event FeesUpdated(uint32 indexed chainId, uint256 protocolFee, uint256 viaSourceFee);
    event SettlementGasLimitUpdated(uint256 oldLimit, uint256 newLimit);
    event MinGasPriceUpdated(uint256 oldPrice, uint256 newPrice);
    
    event TreasuryUpdated(address indexed oldTreasury, address indexed newTreasury);
    
    // ============ Errors ============
    error InvalidRecipient();
    error InvalidAmount();
    error ChainNotConfigured();
    error UnauthorizedSourceChain();
    error InvalidSourceChain();
    error InvalidConfiguration();
    error InsufficientFeeTokenBalance();
    error InsufficientGasTokenBalance();
    error CannotWithdrawCollateral();
    error ExcessiveFee(); // Slippage protection

    constructor(
        address _collateralToken,
        address _feeToken,
        address _messageV3Address,
        address _treasury,
        uint256 _settlementGasLimit,
        uint256 _minGasPrice,
        address _owner
    ) {
        if (_collateralToken == address(0) || _feeToken == address(0) || _messageV3Address == address(0) || _treasury == address(0) || _owner == address(0)) revert InvalidConfiguration();
        
        collateralToken = IERC20(_collateralToken);
        feeToken = IERC20(_feeToken);
        MESSAGEv3 = IMessageV3(_messageV3Address);
        treasury = _treasury;
        
        settlementGasLimit = _settlementGasLimit;
        minGasPrice = _minGasPrice;

        // Approve MessageV3 (Reset first to be safe, then Max)
        feeToken.safeApprove(_messageV3Address, 0);
        feeToken.safeApprove(_messageV3Address, type(uint256).max);
        
        _transferOwnership(_owner);
    }

    // ============ Main Bridge Function ============
    function bridge(
        uint32 _destChainId,
        address _recipient,
        uint256 _amount,
        uint256 _maxViaDestGas // Renamed for clarity: only caps gas fee
    ) external nonReentrant whenNotPaused {
        if (_recipient == address(0)) revert InvalidRecipient();
        if (_amount == 0) revert InvalidAmount();
        if (!supportedChains[_destChainId]) revert ChainNotConfigured();
        if (remoteSyntheticContracts[_destChainId] == address(0)) revert ChainNotConfigured();
        
        uint256 protocolFee = protocolFeePerChain[_destChainId];
        uint256 viaSourceFee = viaSourceFeePerChain[_destChainId];
        
        // Dynamic Market-Rate Calculation with Floor
        uint256 effectiveGasPrice = tx.gasprice < minGasPrice ? minGasPrice : tx.gasprice;
        uint256 viaDestGas = settlementGasLimit * effectiveGasPrice;
        
        // Slippage check applies ONLY to the dynamic gas component
        if (viaDestGas > _maxViaDestGas) revert ExcessiveFee();

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
        
        // 2. Lock Collateral
        collateralToken.safeTransferFrom(msg.sender, address(this), _amount);

        // 3. Send Message
        bytes memory data = abi.encode(_recipient, _amount);
        _sendMessage(_destChainId, data);
        
        volumePerChain[_destChainId] += _amount;
        emit TokensLocked(msg.sender, _destChainId, _recipient, _amount, protocolFee, viaSourceFee, viaDestGas);
    }
    
    function messageProcess(
        uint, uint _sourceChainId, address _sender, address, uint, bytes calldata _data
    ) external override onlySelf(_sender, _sourceChainId) {
        // Strict Validation against overflow/spoofing
        // This MUST be the first line to neutralize any modifier bypass risk
        if (_sourceChainId > type(uint32).max) revert InvalidSourceChain();
        
        if (!supportedChains[uint32(_sourceChainId)]) revert UnauthorizedSourceChain();
        (address recipient, uint256 amount) = abi.decode(_data, (address, uint256));
        
        if (recipient == address(0)) revert InvalidRecipient();
        if (amount == 0) revert InvalidAmount();

        collateralToken.safeTransfer(recipient, amount);
        emit TokensUnlocked(_sourceChainId, recipient, amount);
    }

    // ============ Admin Functions ============
    function configureChain(
        uint32 _chainId,
        address _remoteContract,
        address _wrappedGasToken,
        uint256 _protocolFee,
        uint256 _viaSourceFee,
        bool _supported
    ) external onlyOwner {
        if (_supported) {
            if (_remoteContract == address(0) || _wrappedGasToken == address(0)) revert InvalidConfiguration();
        }
        
        remoteSyntheticContracts[_chainId] = _remoteContract;
        wrappedGasTokenPerChain[_chainId] = IERC20(_wrappedGasToken);
        protocolFeePerChain[_chainId] = _protocolFee;
        viaSourceFeePerChain[_chainId] = _viaSourceFee;
        
        supportedChains[_chainId] = _supported;

        // FIX: Safe Reset-Approval Pattern
        if (_wrappedGasToken != address(0)) {
            // Reset to 0 first to prevent "approve from non-zero to non-zero" revert
            IERC20(_wrappedGasToken).safeApprove(address(MESSAGEv3), 0);
            IERC20(_wrappedGasToken).safeApprove(address(MESSAGEv3), type(uint256).max);
        }

        emit ChainConfigured(_chainId, _remoteContract, _wrappedGasToken, _protocolFee, _viaSourceFee, _supported);
    }
    
    function updateFees(uint32 _chainId, uint256 _protocolFee, uint256 _viaSourceFee) external onlyOwner {
        protocolFeePerChain[_chainId] = _protocolFee;
        viaSourceFeePerChain[_chainId] = _viaSourceFee;
        emit FeesUpdated(_chainId, _protocolFee, _viaSourceFee);
    }

    function updateSettlementGasLimit(uint256 _newLimit) external onlyOwner {
        if (_newLimit == 0) revert InvalidConfiguration();
        emit SettlementGasLimitUpdated(settlementGasLimit, _newLimit);
        settlementGasLimit = _newLimit;
    }

    function updateMinGasPrice(uint256 _newPrice) external onlyOwner {
        emit MinGasPriceUpdated(minGasPrice, _newPrice);
        minGasPrice = _newPrice;
    }
    
    function updateTreasury(address _newTreasury) external onlyOwner {
        if (_newTreasury == address(0)) revert InvalidConfiguration();
        address oldTreasury = treasury;
        treasury = _newTreasury;
        emit TreasuryUpdated(oldTreasury, _newTreasury);
    }
    
    function configureMessageClient(address _messageV3, uint[] calldata _chainIds, address[] calldata _endpoints, uint16[] calldata _confirmations) external onlyOwner {
        configureClient(_messageV3, _chainIds, _endpoints, _confirmations);
        
        // FIX: Safe Reset-Approval Pattern for Fee Token
        feeToken.safeApprove(_messageV3, 0);
        feeToken.safeApprove(_messageV3, type(uint256).max);
    }
    
    function setPaused(bool _paused) external onlyOwner {
        if (_paused) _pause(); else _unpause();
    }
    
    function emergencyWithdraw(address _token, uint256 _amount, address _to) external onlyOwner {
        if (_to == address(0)) revert InvalidConfiguration();
        
        // Anti-Rug Protection
        if (_token == address(collateralToken)) revert CannotWithdrawCollateral();

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
        
        // Dynamic View Calculation with Floor
        uint256 effectiveGasPrice = tx.gasprice < minGasPrice ? minGasPrice : tx.gasprice;
        viaDestGas = settlementGasLimit * effectiveGasPrice;
        
        totalUsdcRequired = protocolFee + viaSourceFee;
    }
    
    function getWrappedGasToken(uint32 _destChainId) external view returns (address) {
        return address(wrappedGasTokenPerChain[_destChainId]);
    }
    
    function totalLocked() external view returns (uint256) {
        return collateralToken.balanceOf(address(this));
    }
    
    function isChainConfigured(uint32 _chainId) external view returns (bool) {
        return supportedChains[_chainId] && remoteSyntheticContracts[_chainId] != address(0) && address(wrappedGasTokenPerChain[_chainId]) != address(0);
    }
    
    function getChainStats(uint32 _chainId) external view returns (uint256 volume, uint256 protocolFeesCollected, uint256 viaFeesPaid, uint256 protocolFee, uint256 viaSourceFee, address remoteContract, address wrappedGasToken, bool supported) {
        return (volumePerChain[_chainId], protocolFeesCollectedPerChain[_chainId], viaFeesPaidPerChain[_chainId], protocolFeePerChain[_chainId], viaSourceFeePerChain[_chainId], remoteSyntheticContracts[_chainId], address(wrappedGasTokenPerChain[_chainId]), supportedChains[_chainId]);
    }
}