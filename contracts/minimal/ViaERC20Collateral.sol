// SPDX-License-Identifier: MIT
pragma solidity ^0.8.17;

import ".deps/npm/@vialabs-io/contracts/message/MessageClient.sol";
import "@openzeppelin/contracts/token/ERC20/IERC20.sol";
import "@openzeppelin/contracts/token/ERC20/utils/SafeERC20.sol";
import "@openzeppelin/contracts/security/ReentrancyGuard.sol";
import "@openzeppelin/contracts/security/Pausable.sol";
import "@openzeppelin/contracts/access/Ownable.sol";

// price impact
/**
 * @title ViaERC20Collateral
 * @dev Simplified cross-chain token bridge with lock-and-unlock functionality
 * @notice This contract locks tokens on the source chain and facilitates minting on destination chains
 */
contract ViaERC20Collateral is MessageClient, ReentrancyGuard, Pausable, Ownable {
    using SafeERC20 for IERC20;
    
    // === STATE VARIABLES ===
    IERC20 public immutable wrappedToken;
    
    // Bridge fee in native token (ETH/BNB/MATIC etc.)
    uint256 public bridgeFeeNative = 0.001 ether; // 0.001 ETH fee by default
    
    // Supported chains
    mapping(uint32 => bool) public supportedChains;
    mapping(uint32 => address) public remoteContracts;

    // === EVENTS ===
    event TokensBridged(
        address indexed sender, 
        uint32 indexed destChainId, 
        address indexed recipient, 
        uint256 amount,
        uint256 nativeFee
    );
    
    event TokensReceived(
        uint256 indexed sourceChainId, 
        address indexed recipient, 
        uint256 amount
    );
    
    event ChainConfigured(uint32 indexed chainId, address indexed remoteContract, bool supported);
    event NativeFeeUpdated(uint256 newFee);
    event NativeFeesWithdrawn(address indexed to, uint256 amount);
    event EmergencyWithdraw(address indexed token, uint256 amount, address indexed to);

    // === MODIFIERS ===
    modifier onlySupportedChain(uint32 _chainId) {
        require(supportedChains[_chainId], "Chain not supported");
        require(remoteContracts[_chainId] != address(0), "Remote contract not configured");
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
        payable
        nonReentrant 
        whenNotPaused 
        onlySupportedChain(_destChainId)
    {
        require(_recipient != address(0), "Invalid recipient");
        require(_amount > 0, "Amount must be greater than 0");
        require(msg.value >= bridgeFeeNative, "Insufficient native fee");
        
        // Lock tokens in this contract
        wrappedToken.safeTransferFrom(msg.sender, address(this), _amount);
        
        // Encode message data
        bytes memory data = abi.encode(_recipient, _amount);
        
        // Send cross-chain message
        _sendMessage(_destChainId, data);
        
        emit TokensBridged(
            msg.sender, 
            _destChainId, 
            _recipient, 
            _amount,
            msg.value
        );
        
        // Refund excess native tokens if any
        if (msg.value > bridgeFeeNative) {
            payable(msg.sender).transfer(msg.value - bridgeFeeNative);
        }
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
        (address recipient, uint256 amount) = abi.decode(_data, (address, uint256));
        
        require(recipient != address(0), "Invalid recipient");
        require(amount > 0, "Invalid amount");
        
        // Unlock tokens to recipient
        wrappedToken.safeTransfer(recipient, amount);
        
        emit TokensReceived(_sourceChainId, recipient, amount);
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
     * @notice Update native bridge fee (max 5% of 1 ETH = 0.05 ETH)
     */
    function updateNativeFee(uint256 _newFee) external onlyOwner {
        require(_newFee <= 0.05 ether, "Fee too high"); // Max 5% of 1 ETH
        bridgeFeeNative = _newFee;
        emit NativeFeeUpdated(_newFee);
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
            // Withdraw native tokens (ETH/BNB/MATIC etc.)
            require(_amount <= address(this).balance, "Insufficient native balance");
            payable(_to).transfer(_amount);
        } else {
            // Withdraw ERC20 tokens
            IERC20(_token).safeTransfer(_to, _amount);
        }
        
        emit EmergencyWithdraw(_token, _amount, _to);
    }
    
    /**
     * @notice Withdraw collected native fees
     */
    function withdrawNativeFees(address _to, uint256 _amount) external onlyOwner {
        require(_to != address(0), "Invalid recipient");
        require(_amount <= address(this).balance, "Insufficient balance");
        
        payable(_to).transfer(_amount);
        emit NativeFeesWithdrawn(_to, _amount);
    }
    
    /**
     * @notice Withdraw all collected native fees
     */
    function withdrawAllNativeFees(address _to) external onlyOwner {
        require(_to != address(0), "Invalid recipient");
        uint256 amount = address(this).balance;
        require(amount > 0, "No fees to withdraw");
        
        payable(_to).transfer(amount);
        emit NativeFeesWithdrawn(_to, amount);
    }

    // === VIEW FUNCTIONS ===
    
    /**
     * @notice Get total locked tokens
     */
    function totalLocked() external view returns (uint256) {
        return wrappedToken.balanceOf(address(this));
    }
    
    /**
     * @notice Check if chain is supported
     */
    function isChainSupported(uint32 _chainId) external view returns (bool) {
        return supportedChains[_chainId] && remoteContracts[_chainId] != address(0);
    }
    
    /**
     * @notice Get current native fee balance in contract
     */
    function getNativeFeeBalance() external view returns (uint256) {
        return address(this).balance;
    }
    
    /**
     * @notice Get bridge fee in native token
     */
    function getBridgeFee() external view returns (uint256) {
        return bridgeFeeNative;
    }
    
    /**
     * @notice Get wrapped token address
     */
    function getWrappedToken() external view returns (address) {
        return address(wrappedToken);
    }

    // === RECEIVE FUNCTION ===
    
    /**
     * @notice Allow contract to receive native tokens
     */
    receive() external payable {
        // Allow contract to receive native tokens
    }
}