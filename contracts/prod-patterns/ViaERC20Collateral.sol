// SPDX-License-Identifier: MIT
pragma solidity ^0.8.17;

import ".deps/npm/@vialabs-io/contracts/message/MessageClient.sol";
import "@openzeppelin/contracts/token/ERC20/IERC20.sol";
import "@openzeppelin/contracts/token/ERC20/utils/SafeERC20.sol";
import "@openzeppelin/contracts/security/ReentrancyGuard.sol";
import "@openzeppelin/contracts/security/Pausable.sol";
import "@openzeppelin/contracts/access/Ownable.sol";

/**
 * @title ViaERC20Collateral
 * @dev Production-ready cross-chain token bridge with enhanced security features
 * @notice This contract locks tokens on the source chain and facilitates minting on destination chains
 */
contract ViaERC20Collateral is MessageClient, ReentrancyGuard, Pausable, Ownable {
    using SafeERC20 for IERC20;
    
    // === STATE VARIABLES ===
    IERC20 public immutable wrappedToken;
    
    // Bridge limits and fees
    uint256 public minBridgeAmount = 1e15; // 0.001 tokens minimum
    uint256 public maxBridgeAmount = 1000000e18; // 1M tokens maximum
    uint256 public dailyLimit = 10000000e18; // 10M tokens per day
    uint256 public bridgeFee = 1e15; // 0.001 tokens fee
    
    // Daily tracking
    mapping(uint256 => uint256) public dailyVolume; // day => volume
    
    // Supported chains
    mapping(uint32 => bool) public supportedChains;
    mapping(uint32 => address) public remoteContracts;
    
    // Statistics
    uint256 public totalBridged;
    uint256 public totalTransactions;
    mapping(address => uint256) public userBridged;

    // === EVENTS ===
    event TokensBridged(
        address indexed sender, 
        uint32 indexed destChainId, 
        address indexed recipient, 
        uint256 amount,
        uint256 fee,
        uint256 txId
    );
    
    event TokensReceived(
        uint256 indexed sourceChainId, 
        address indexed recipient, 
        uint256 amount,
        uint256 txId
    );
    
    event ChainConfigured(uint32 indexed chainId, address indexed remoteContract, bool supported);
    event LimitsUpdated(uint256 minAmount, uint256 maxAmount, uint256 dailyLimit);
    event FeeUpdated(uint256 newFee);
    event EmergencyWithdraw(address indexed token, uint256 amount, address indexed to);

    // === MODIFIERS ===
    modifier onlySupportedChain(uint32 _chainId) {
        require(supportedChains[_chainId], "Chain not supported");
        require(remoteContracts[_chainId] != address(0), "Remote contract not configured");
        _;
    }
    
    modifier withinLimits(uint256 _amount) {
        require(_amount >= minBridgeAmount, "Amount below minimum");
        require(_amount <= maxBridgeAmount, "Amount above maximum");
        
        uint256 today = block.timestamp / 86400; // Current day
        require(dailyVolume[today] + _amount <= dailyLimit, "Daily limit exceeded");
        _;
    }

    // === CONSTRUCTOR ===
    constructor(
        address _wrappedToken, 
        address _messageV3Address,
        address _owner
    ) {
        require(_wrappedToken != address(0), "Invalid token address");
        require(_messageV3Address != address(0), "Invalid MessageV3 address");
        require(_owner != address(0), "Invalid owner address");
        
        wrappedToken = IERC20(_wrappedToken);
        MESSAGEv3 = IMessageV3(_messageV3Address);
        _transferOwnership(_owner);
    }

    // === BRIDGE FUNCTIONS ===
    
    /**
     * @notice Bridge tokens to another chain
     * @param _destChainId Destination chain ID
     * @param _recipient Recipient address on destination chain
     * @param _amount Amount of tokens to bridge
     */
    function bridge(
        uint32 _destChainId, 
        address _recipient, 
        uint256 _amount
    ) 
        external 
        nonReentrant 
        whenNotPaused 
        onlySupportedChain(_destChainId)
        withinLimits(_amount)
    {
        require(_recipient != address(0), "Invalid recipient");
        require(_amount > bridgeFee, "Amount must cover fee");
        
        uint256 bridgeAmount = _amount - bridgeFee;
        uint256 today = block.timestamp / 86400;
        
        // Update statistics
        dailyVolume[today] += _amount;
        totalBridged += bridgeAmount;
        totalTransactions++;
        userBridged[msg.sender] += bridgeAmount;
        
        // Lock tokens (including fee)
        wrappedToken.safeTransferFrom(msg.sender, address(this), _amount);
        
        // Encode message data
        bytes memory data = abi.encode(_recipient, bridgeAmount, totalTransactions);
        
        // Send cross-chain message
        _sendMessage(_destChainId, data);
        
        emit TokensBridged(
            msg.sender, 
            _destChainId, 
            _recipient, 
            bridgeAmount,
            bridgeFee,
            totalTransactions
        );
    }
    
    /**
     * @notice Process incoming cross-chain messages
     */
    function messageProcess(
        uint _txId, 
        uint _sourceChainId, 
        address _sender, 
        address _reference,
        uint _protocolAmount,
        bytes calldata _data
    ) external override onlySelf(_sender, _sourceChainId) {
        require(supportedChains[uint32(_sourceChainId)], "Source chain not supported");
        
        // Decode message data
        (address recipient, uint256 amount, uint256 bridgeTxId) = abi.decode(_data, (address, uint256, uint256));
        
        require(recipient != address(0), "Invalid recipient");
        require(amount > 0, "Invalid amount");
        
        // Unlock tokens to recipient
        wrappedToken.safeTransfer(recipient, amount);
        
        emit TokensReceived(_sourceChainId, recipient, amount, bridgeTxId);
    }

    // === ADMIN FUNCTIONS ===
    
    /**
     * @notice Configure supported chains and remote contracts
     */
    function configureChain(
        uint32 _chainId, 
        address _remoteContract, 
        bool _supported
    ) external onlyOwner {
        supportedChains[_chainId] = _supported;
        remoteContracts[_chainId] = _remoteContract;
        
        emit ChainConfigured(_chainId, _remoteContract, _supported);
    }
    
    /**
     * @notice Update bridge limits
     */
    function updateLimits(
        uint256 _minAmount,
        uint256 _maxAmount,
        uint256 _dailyLimit
    ) external onlyOwner {
        require(_minAmount < _maxAmount, "Invalid limits");
        require(_dailyLimit >= _maxAmount, "Daily limit too low");
        
        minBridgeAmount = _minAmount;
        maxBridgeAmount = _maxAmount;
        dailyLimit = _dailyLimit;
        
        emit LimitsUpdated(_minAmount, _maxAmount, _dailyLimit);
    }
    
    /**
     * @notice Update bridge fee
     */
    function updateFee(uint256 _newFee) external onlyOwner {
        require(_newFee < maxBridgeAmount / 100, "Fee too high"); // Max 1% fee
        bridgeFee = _newFee;
        emit FeeUpdated(_newFee);
    }
    
    /**
     * @notice Configure MessageClient with multiple chains
     */
    function configureMessageClient(
        address _messageV3,
        uint[] calldata _chainIds,
        address[] calldata _endpoints,
        uint16[] calldata _confirmations
    ) external onlyOwner {
        require(_chainIds.length == _endpoints.length, "Array length mismatch");
        require(_chainIds.length == _confirmations.length, "Array length mismatch");
        
        configureClient(_messageV3, _chainIds, _endpoints, _confirmations);
    }
    
    /**
     * @notice Pause/unpause bridge operations
     */
    function setPaused(bool _paused) external onlyOwner {
        if (_paused) {
            _pause();
        } else {
            _unpause();
        }
    }
    
    /**
     * @notice Emergency withdraw function
     */
    function emergencyWithdraw(
        address _token,
        uint256 _amount,
        address _to
    ) external onlyOwner {
        require(_to != address(0), "Invalid recipient");
        
        if (_token == address(0)) {
            // Withdraw ETH
            payable(_to).transfer(_amount);
        } else {
            // Withdraw ERC20
            IERC20(_token).safeTransfer(_to, _amount);
        }
        
        emit EmergencyWithdraw(_token, _amount, _to);
    }

    // === VIEW FUNCTIONS ===
    
    /**
     * @notice Get total locked tokens
     */
    function totalLocked() external view returns (uint256) {
        return wrappedToken.balanceOf(address(this));
    }
    
    /**
     * @notice Get daily volume for a specific day
     */
    function getDailyVolume(uint256 _day) external view returns (uint256) {
        return dailyVolume[_day];
    }
    
    /**
     * @notice Get current day's volume
     */
    function getTodayVolume() external view returns (uint256) {
        return dailyVolume[block.timestamp / 86400];
    }
    
    /**
     * @notice Check remaining daily limit
     */
    function getRemainingDailyLimit() external view returns (uint256) {
        uint256 today = block.timestamp / 86400;
        uint256 used = dailyVolume[today];
        return used >= dailyLimit ? 0 : dailyLimit - used;
    }
    
    /**
     * @notice Get bridge statistics
     */
    function getStats() external view returns (
        uint256 _totalLocked,
        uint256 _totalBridged,
        uint256 _totalTransactions,
        uint256 _todayVolume,
        uint256 _remainingLimit
    ) {
        uint256 today = block.timestamp / 86400;
        uint256 used = dailyVolume[today];
        
        return (
            wrappedToken.balanceOf(address(this)),
            totalBridged,
            totalTransactions,
            used,
            used >= dailyLimit ? 0 : dailyLimit - used
        );
    }
    
    /**
     * @notice Check if chain is supported
     */
    function isChainSupported(uint32 _chainId) external view returns (bool) {
        return supportedChains[_chainId] && remoteContracts[_chainId] != address(0);
    }
}