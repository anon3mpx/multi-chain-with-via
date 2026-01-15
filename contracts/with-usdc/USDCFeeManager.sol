// SPDX-License-Identifier: MIT
pragma solidity ^0.8.17;

import "@openzeppelin/contracts/access/Ownable.sol";
import "@openzeppelin/contracts/security/ReentrancyGuard.sol";
import "@openzeppelin/contracts/token/ERC20/IERC20.sol";
import "@openzeppelin/contracts/token/ERC20/utils/SafeERC20.sol";

/**
 * @title CorrectedFeeManager
 * @notice Manages protocol fee (fixed) and VIA fee limits (dynamic)
 * @dev VIA fees are NOT hardcoded - only limits are set for protection
 */
contract CorrectedFeeManager is Ownable, ReentrancyGuard {
    using SafeERC20 for IERC20;
    
    // ============ Structs ============
    
    struct ChainConfig {
        uint256 maxSourceFee;       // Max VIA source fee limit (protection)
        uint256 maxDestGas;         // Max destination gas limit (protection)
        bool isActive;
    }
    
    // ============ State Variables ============
    
    /// @notice USDC token for protocol fee
    IERC20 public immutable USDC;
    
    /// @notice Protocol fee in USDC (fixed, e.g., 0.30 USDC)
    uint256 public protocolFee;
    
    /// @notice Maximum protocol fee (10 USDC)
    uint256 public constant MAX_PROTOCOL_FEE = 10_000000; // 10 USDC (6 decimals)
    
    /// @notice Fee limits per destination chain
    mapping(uint32 => ChainConfig) public chainConfigs;
    
    /// @notice Fee recipient address
    address public feeRecipient;
    
    /// @notice Authorized bridge contracts
    mapping(address => bool) public authorizedBridges;
    
    /// @notice Total protocol fees collected (USDC)
    uint256 public totalProtocolFees;
    
    /// @notice Total transactions processed
    uint256 public totalTransactions;
    
    // ============ Events ============
    
    event ProtocolFeeSet(uint256 newFee);
    event FeeRecipientSet(address indexed newRecipient);
    event ChainConfigured(
        uint32 indexed chainId,
        uint256 maxSourceFee,
        uint256 maxDestGas,
        bool isActive
    );
    event BridgeAuthorized(address indexed bridge, bool authorized);
    event ProtocolFeeCollected(
        address indexed bridge,
        address indexed user,
        uint32 indexed destChainId,
        uint256 protocolFee,
        uint256 txCount
    );
    event FeesWithdrawn(address indexed recipient, uint256 amount);
    
    // ============ Modifiers ============
    
    modifier onlyAuthorizedBridge() {
        require(authorizedBridges[msg.sender], "CorrectedFeeManager: not authorized");
        _;
    }
    
    modifier validChain(uint32 _chainId) {
        require(chainConfigs[_chainId].isActive, "CorrectedFeeManager: chain not active");
        _;
    }
    
    // ============ Constructor ============
    
    /**
     * @param _usdc USDC token address (protocol fee)
     * @param _protocolFee Initial protocol fee (in USDC with 6 decimals)
     * @param _feeRecipient Address to receive protocol fees
     * @param _owner Owner of the contract
     */
    constructor(
        address _usdc,
        uint256 _protocolFee,
        address _feeRecipient,
        address _owner
    ) {
        require(_usdc != address(0), "Invalid USDC");
        require(_feeRecipient != address(0), "Invalid recipient");
        require(_owner != address(0), "Invalid owner");
        require(_protocolFee <= MAX_PROTOCOL_FEE, "Fee too high");
        
        USDC = IERC20(_usdc);
        protocolFee = _protocolFee;
        feeRecipient = _feeRecipient;
        _transferOwnership(_owner);
        
        emit ProtocolFeeSet(_protocolFee);
        emit FeeRecipientSet(_feeRecipient);
    }
    
    // ============ Main Functions ============
    
    /**
     * @notice Get protocol fee and chain limits
     * @param _destChainId Destination chain ID
     * @return protocolFeeAmount Fixed protocol fee
     * @return maxSourceFee Maximum allowed VIA source fee
     * @return maxDestGas Maximum allowed destination gas
     * @dev Bridge should query VIA for actual fees and validate against these limits
     */
    function getFeeInfo(uint32 _destChainId) 
        external 
        view 
        validChain(_destChainId) 
        returns (
            uint256 protocolFeeAmount,
            uint256 maxSourceFee,
            uint256 maxDestGas
        ) 
    {
        ChainConfig memory config = chainConfigs[_destChainId];
        return (protocolFee, config.maxSourceFee, config.maxDestGas);
    }
    
    /**
     * @notice Collect protocol fee and validate VIA fees
     * @param _user User performing the bridge
     * @param _destChainId Destination chain ID
     * @param _viaSourceFee Actual VIA source fee (from VIA quote)
     * @param _viaDestGas Actual VIA destination gas (from VIA quote)
     * @return protocolFeeAmount Protocol fee collected
     * @dev Bridge must get actual VIA fees from VIA Labs and pass them here for validation
     */
    function collectProtocolFee(
        address _user,
        uint32 _destChainId,
        uint256 _viaSourceFee,
        uint256 _viaDestGas
    ) 
        external 
        onlyAuthorizedBridge 
        validChain(_destChainId) 
        nonReentrant 
        returns (uint256 protocolFeeAmount) 
    {
        require(_user != address(0), "Invalid user");
        
        ChainConfig memory config = chainConfigs[_destChainId];
        
        // Validate VIA fees against max limits (PROTECTION)
        require(_viaSourceFee <= config.maxSourceFee, "VIA source fee exceeds maximum");
        require(_viaDestGas <= config.maxDestGas, "VIA dest gas exceeds maximum");
        
        protocolFeeAmount = protocolFee;
        
        // Collect only protocol fee (USDC)
        if (protocolFeeAmount > 0) {
            USDC.safeTransferFrom(_user, address(this), protocolFeeAmount);
            totalProtocolFees += protocolFeeAmount;
        }
        
        totalTransactions++;
        
        emit ProtocolFeeCollected(
            msg.sender,
            _user,
            _destChainId,
            protocolFeeAmount,
            totalTransactions
        );
        
        return protocolFeeAmount;
    }
    
    // ============ Admin Functions ============
    
    /**
     * @notice Set protocol fee
     * @param _newFee New protocol fee in USDC (6 decimals)
     */
    function setProtocolFee(uint256 _newFee) external onlyOwner {
        require(_newFee <= MAX_PROTOCOL_FEE, "Fee too high");
        protocolFee = _newFee;
        emit ProtocolFeeSet(_newFee);
    }
    
    /**
     * @notice Set fee recipient
     * @param _newRecipient New fee recipient address
     */
    function setFeeRecipient(address _newRecipient) external onlyOwner {
        require(_newRecipient != address(0), "Invalid recipient");
        feeRecipient = _newRecipient;
        emit FeeRecipientSet(_newRecipient);
    }
    
    /**
     * @notice Configure fee limits for a destination chain
     * @param _chainId Destination chain ID
     * @param _maxSourceFee Maximum allowed VIA source fee
     * @param _maxDestGas Maximum allowed destination gas
     * @param _isActive Whether chain is active
     * @dev These are LIMITS only - actual VIA fees are queried dynamically
     */
    function configureChain(
        uint32 _chainId,
        uint256 _maxSourceFee,
        uint256 _maxDestGas,
        bool _isActive
    ) external onlyOwner {
        chainConfigs[_chainId] = ChainConfig({
            maxSourceFee: _maxSourceFee,
            maxDestGas: _maxDestGas,
            isActive: _isActive
        });
        
        emit ChainConfigured(_chainId, _maxSourceFee, _maxDestGas, _isActive);
    }
    
    /**
     * @notice Authorize or deauthorize a bridge contract
     * @param _bridge Bridge contract address
     * @param _authorized Authorization status
     */
    function setBridgeAuthorization(address _bridge, bool _authorized) external onlyOwner {
        require(_bridge != address(0), "Invalid bridge");
        authorizedBridges[_bridge] = _authorized;
        emit BridgeAuthorized(_bridge, _authorized);
    }
    
    /**
     * @notice Withdraw collected protocol fees (USDC)
     * @param _amount Amount to withdraw (0 = all)
     */
    function withdrawProtocolFees(uint256 _amount) external onlyOwner nonReentrant {
        uint256 balance = USDC.balanceOf(address(this));
        require(balance > 0, "No fees to withdraw");
        
        uint256 withdrawAmount = (_amount == 0 || _amount > balance) ? balance : _amount;
        
        USDC.safeTransfer(feeRecipient, withdrawAmount);
        emit FeesWithdrawn(feeRecipient, withdrawAmount);
    }
    
    /**
     * @notice Emergency withdraw any ERC20 token
     * @param _token Token address
     * @param _amount Amount to withdraw
     * @param _to Recipient address
     */
    function emergencyWithdraw(
        address _token,
        uint256 _amount,
        address _to
    ) external onlyOwner nonReentrant {
        require(_to != address(0), "Invalid recipient");
        IERC20(_token).safeTransfer(_to, _amount);
    }
    
    // ============ View Functions ============
    
    /**
     * @notice Get protocol fee
     * @return fee Protocol fee amount
     */
    function getProtocolFee() external view returns (uint256 fee) {
        return protocolFee;
    }
    
    /**
     * @notice Get chain configuration
     * @param _chainId Chain ID
     * @return config Chain configuration
     */
    function getChainConfig(uint32 _chainId) 
        external 
        view 
        returns (ChainConfig memory config) 
    {
        return chainConfigs[_chainId];
    }
    
    /**
     * @notice Get current USDC balance (protocol fees)
     * @return balance USDC balance
     */
    function getProtocolFeeBalance() external view returns (uint256 balance) {
        return USDC.balanceOf(address(this));
    }
    
    /**
     * @notice Get fee statistics
     * @return _totalProtocolFees Total protocol fees collected (USDC)
     * @return _totalTx Total transactions
     * @return _currentBalance Current USDC balance
     */
    function getStats() external view returns (
        uint256 _totalProtocolFees,
        uint256 _totalTx,
        uint256 _currentBalance
    ) {
        return (
            totalProtocolFees,
            totalTransactions,
            USDC.balanceOf(address(this))
        );
    }
    
    /**
     * @notice Check if bridge is authorized
     * @param _bridge Bridge address
     * @return authorized Authorization status
     */
    function isBridgeAuthorized(address _bridge) external view returns (bool authorized) {
        return authorizedBridges[_bridge];
    }
    
    /**
     * @notice Check if chain is active
     * @param _chainId Chain ID
     * @return active Chain active status
     */
    function isChainActive(uint32 _chainId) external view returns (bool active) {
        return chainConfigs[_chainId].isActive;
    }
}