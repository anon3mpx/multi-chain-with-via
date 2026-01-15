// SPDX-License-Identifier: MIT
pragma solidity ^0.8.17;

import ".deps/npm/@vialabs-io/contracts/message/MessageClient.sol";
import "@openzeppelin/contracts/token/ERC20/ERC20.sol";
import "@openzeppelin/contracts/token/ERC20/extensions/ERC20Burnable.sol";
import "@openzeppelin/contracts/security/ReentrancyGuard.sol";
import "@openzeppelin/contracts/security/Pausable.sol";
import "@openzeppelin/contracts/access/Ownable.sol";

/**
 * @title ViaERC20
 * @dev Production-ready cross-chain ERC20 token with burn-and-mint bridge functionality
 * @notice This contract burns tokens on source chain and mints on destination chains
 */
contract ViaERC20 is ERC20, ERC20Burnable, MessageClient, ReentrancyGuard, Pausable, Ownable {
    
    // === STATE VARIABLES ===
    
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
    
    // Minting permissions (for cross-chain minting)
    mapping(uint32 => bool) public authorizedMinters; // chainId => authorized

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
    event MinterAuthorized(uint32 indexed chainId, bool authorized);
    event LimitsUpdated(uint256 minAmount, uint256 maxAmount, uint256 dailyLimit);
    event FeeUpdated(uint256 newFee);

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
        string memory _name,
        string memory _symbol,
        uint256 _initialSupply,
        address _messageV3Address,
        address _owner
    ) ERC20(_name, _symbol) {
        require(_messageV3Address != address(0), "Invalid MessageV3 address");
        require(_owner != address(0), "Invalid owner address");
        
        MESSAGEv3 = IMessageV3(_messageV3Address);
        _transferOwnership(_owner);
        
        if (_initialSupply > 0) {
            _mint(_owner, _initialSupply);
        }
    }

    // === BRIDGE FUNCTIONS ===
    
    /**
     * @notice Bridge tokens to another chain (burn on this chain, mint on destination)
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
        require(balanceOf(msg.sender) >= _amount, "Insufficient balance");
        
        uint256 bridgeAmount = _amount - bridgeFee;
        uint256 today = block.timestamp / 86400;
        
        // Update statistics
        dailyVolume[today] += _amount;
        totalBridged += bridgeAmount;
        totalTransactions++;
        userBridged[msg.sender] += bridgeAmount;
        
        // Burn tokens (including fee)
        _burn(msg.sender, _amount);
        
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
     * @notice Process incoming cross-chain messages (mint tokens)
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
        require(authorizedMinters[uint32(_sourceChainId)], "Source chain not authorized to mint");
        
        // Decode message data
        (address recipient, uint256 amount, uint256 bridgeTxId) = abi.decode(_data, (address, uint256, uint256));
        
        require(recipient != address(0), "Invalid recipient");
        require(amount > 0, "Invalid amount");
        
        // Mint tokens to recipient
        _mint(recipient, amount);
        
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
     * @notice Authorize chain for minting operations
     */
    function setMinterAuthorization(uint32 _chainId, bool _authorized) external onlyOwner {
        authorizedMinters[_chainId] = _authorized;
        emit MinterAuthorized(_chainId, _authorized);
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
     * @notice Emergency mint function (use with extreme caution)
     */
    function emergencyMint(address _to, uint256 _amount) external onlyOwner {
        require(_to != address(0), "Invalid recipient");
        _mint(_to, _amount);
    }

    // === VIEW FUNCTIONS ===
    
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
        uint256 _totalSupply,
        uint256 _totalBridged,
        uint256 _totalTransactions,
        uint256 _todayVolume,
        uint256 _remainingLimit
    ) {
        uint256 today = block.timestamp / 86400;
        uint256 used = dailyVolume[today];
        
        return (
            totalSupply(),
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
    
    /**
     * @notice Check if chain is authorized for minting
     */
    function isAuthorizedMinter(uint32 _chainId) external view returns (bool) {
        return authorizedMinters[_chainId];
    }
}