// SPDX-License-Identifier: MIT
pragma solidity ^0.8.17;

import "@vialabs-io/contracts/message/MessageClient.sol";
import "@openzeppelin/contracts/token/ERC20/ERC20.sol";
import "@openzeppelin/contracts/token/ERC20/extensions/ERC20Burnable.sol";
import "@openzeppelin/contracts/security/ReentrancyGuard.sol";
import "@openzeppelin/contracts/security/Pausable.sol";
import "@openzeppelin/contracts/access/Ownable.sol";

/**
 * @title ViaERC20
 * @dev Simplified cross-chain ERC20 token with burn-and-mint bridge functionality
 * @notice This contract burns tokens on source chain and mints on destination chains
 */
contract ViaERC20 is ERC20, ERC20Burnable, MessageClient, ReentrancyGuard, Pausable, Ownable {
    
    // === STATE VARIABLES ===
    
    // Bridge fee in native token (ETH/BNB/MATIC etc.)
    uint256 public bridgeFeeNative = 0.001 ether; // 0.001 ETH fee by default
    
    // Supported chains
    mapping(uint32 => bool) public supportedChains;
    mapping(uint32 => address) public remoteContracts;
    
    // Minting permissions (for cross-chain minting)
    mapping(uint32 => bool) public authorizedMinters; // chainId => authorized

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
    event MinterAuthorized(uint32 indexed chainId, bool authorized);
    event NativeFeeUpdated(uint256 newFee);
    event NativeFeesWithdrawn(address indexed to, uint256 amount);

    // === MODIFIERS ===
    modifier onlySupportedChain(uint32 _chainId) {
        require(supportedChains[_chainId], "Chain not supported");
        require(remoteContracts[_chainId] != address(0), "Remote contract not configured");
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
        payable
        nonReentrant 
        whenNotPaused 
        onlySupportedChain(_destChainId)
    {
        require(_recipient != address(0), "Invalid recipient");
        require(_amount > 0, "Amount must be greater than 0");
        require(balanceOf(msg.sender) >= _amount, "Insufficient token balance");
        require(msg.value >= bridgeFeeNative, "Insufficient native fee");
        
        // Burn tokens
        _burn(msg.sender, _amount);
        
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
        (address recipient, uint256 amount) = abi.decode(_data, (address, uint256));
        
        require(recipient != address(0), "Invalid recipient");
        require(amount > 0, "Invalid amount");
        
        // Mint tokens to recipient
        _mint(recipient, amount);
        
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
     * @notice Authorize chain for minting operations
     */
    function setMinterAuthorization(uint32 _chainId, bool _authorized) external onlyOwner {
        authorizedMinters[_chainId] = _authorized;
        emit MinterAuthorized(_chainId, _authorized);
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
     * @notice Emergency mint function (use with extreme caution)
     */
    function emergencyMint(address _to, uint256 _amount) external onlyOwner {
        require(_to != address(0), "Invalid recipient");
        _mint(_to, _amount);
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

    // === RECEIVE FUNCTION ===
    
    /**
     * @notice Allow contract to receive native tokens
     */
    receive() external payable {
        // Allow contract to receive native tokens
    }
}