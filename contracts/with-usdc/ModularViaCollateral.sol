// SPDX-License-Identifier: MIT
pragma solidity ^0.8.17;

import "@vialabs-io/contracts/message/MessageClient.sol";
import "@openzeppelin/contracts/token/ERC20/IERC20.sol";
import "@openzeppelin/contracts/token/ERC20/utils/SafeERC20.sol";
import "@openzeppelin/contracts/security/ReentrancyGuard.sol";
import "@openzeppelin/contracts/security/Pausable.sol";
import "@openzeppelin/contracts/access/Ownable.sol";

interface IEnhancedFeeManager {
    function calculateFees(uint32 _destChainId) external view returns (
        uint256 protocolFeeAmount,
        uint256 sourceFeeAmount,
        uint256 destGasAmount
    );
    
    function collectFees(address _user, uint32 _destChainId) external returns (
        uint256 protocolFeeAmount,
        uint256 sourceFeeAmount,
        uint256 destGasAmount
    );
}

/**
 * @title FinalModularCollateralBridge
 * @notice Complete bridge with Protocol Fee + VIA Source Fee + Destination Gas
 */
contract FinalModularCollateralBridge is MessageClient, ReentrancyGuard, Pausable, Ownable {
    using SafeERC20 for IERC20;
    
    // ============ State Variables ============
    
    IERC20 public immutable wrappedToken;
    IEnhancedFeeManager public feeManager;
    
    bytes32 public routeId;
    string public routeName;
    uint32 public destinationChainId;
    address public remoteContract;
    
    mapping(uint32 => bool) public supportedChains;
    mapping(uint32 => address) public remoteContracts;

    // ============ Events ============
    
    event TokensBridged(
        address indexed sender,
        uint32 indexed destChainId,
        address indexed recipient,
        uint256 amount,
        uint256 protocolFee,
        uint256 sourceFee,
        uint256 destGas,
        bytes32 routeId
    );
    
    event TokensReceived(
        uint256 indexed sourceChainId,
        address indexed recipient,
        uint256 amount,
        bytes32 routeId
    );
    
    event FeeManagerUpdated(address indexed oldManager, address indexed newManager);
    
    // ============ Constructor ============
    
    constructor(
        address _wrappedToken,
        address _messageV3Address,
        address _feeManager,
        bytes32 _routeId,
        string memory _routeName,
        address _owner
    ) {
        require(_wrappedToken != address(0), "Invalid token");
        require(_messageV3Address != address(0), "Invalid MessageV3");
        require(_feeManager != address(0), "Invalid fee manager");
        require(_owner != address(0), "Invalid owner");
        
        wrappedToken = IERC20(_wrappedToken);
        MESSAGEv3 = IMessageV3(_messageV3Address);
        feeManager = IEnhancedFeeManager(_feeManager);
        routeId = _routeId;
        routeName = _routeName;
        
        _transferOwnership(_owner);
    }

    // ============ Main Bridge Function ============
    
    /**
     * @notice Bridge tokens with complete fee collection
     * @param _recipient Recipient on destination chain
     * @param _amount Amount of tokens to bridge
     * @dev User must approve:
     *      1. USDC for protocol fee
     *      2. FEE_TOKEN for VIA source fee
     *      3. WRAPPED_GAS_TOKEN for destination gas
     *      4. wrappedToken for bridge amount
     */
    function bridge(
        address _recipient,
        uint256 _amount
    ) 
        external 
        nonReentrant 
        whenNotPaused 
    {
        require(_recipient != address(0), "Invalid recipient");
        require(_amount > 0, "Invalid amount");
        require(destinationChainId != 0, "Route not configured");
        require(remoteContract != address(0), "Remote not set");
        
        // Step 1: Collect all fees (protocol + VIA source + dest gas)
        (
            uint256 protocolFee,
            uint256 sourceFee,
            uint256 destGas
        ) = feeManager.collectFees(msg.sender, destinationChainId);
        
        // Step 2: Lock wrapped tokens
        wrappedToken.safeTransferFrom(msg.sender, address(this), _amount);
        
        // Step 3: Send cross-chain message
        // VIA Labs will use the FEE_TOKEN and WRAPPED_GAS_TOKEN we received
        bytes memory data = abi.encode(_recipient, _amount);
        _sendMessage(destinationChainId, data);
        
        emit TokensBridged(
            msg.sender,
            destinationChainId,
            _recipient,
            _amount,
            protocolFee,
            sourceFee,
            destGas,
            routeId
        );
    }
    
    /**
     * @notice Process incoming messages
     */
    function messageProcess(
        uint _txId,
        uint _sourceChainId,
        address _sender,
        address _reference,
        uint _protocolAmount,
        bytes calldata _data
    ) external override onlySelf(_sender, _sourceChainId) {
        require(supportedChains[uint32(_sourceChainId)], "Chain not supported");
        
        (address recipient, uint256 amount) = abi.decode(_data, (address, uint256));
        
        require(recipient != address(0), "Invalid recipient");
        require(amount > 0, "Invalid amount");
        
        wrappedToken.safeTransfer(recipient, amount);
        
        emit TokensReceived(_sourceChainId, recipient, amount, routeId);
    }

    // ============ Admin Functions ============
    
    function configureRoute(
        bytes32 _routeId,
        string memory _routeName,
        uint32 _destinationChainId,
        address _remoteContract
    ) external onlyOwner {
        require(_destinationChainId != 0, "Invalid chain");
        require(_remoteContract != address(0), "Invalid remote");
        
        routeId = _routeId;
        routeName = _routeName;
        destinationChainId = _destinationChainId;
        remoteContract = _remoteContract;
        
        supportedChains[_destinationChainId] = true;
        remoteContracts[_destinationChainId] = _remoteContract;
    }
    
    function configureChain(
        uint32 _chainId,
        address _remoteContract,
        bool _supported
    ) external onlyOwner {
        supportedChains[_chainId] = _supported;
        remoteContracts[_chainId] = _remoteContract;
    }
    
    function updateFeeManager(address _newFeeManager) external onlyOwner {
        require(_newFeeManager != address(0), "Invalid fee manager");
        address oldManager = address(feeManager);
        feeManager = IEnhancedFeeManager(_newFeeManager);
        emit FeeManagerUpdated(oldManager, _newFeeManager);
    }
    
    function configureMessageClient(
        address _messageV3,
        uint[] calldata _chainIds,
        address[] calldata _endpoints,
        uint16[] calldata _confirmations
    ) external onlyOwner {
        configureClient(_messageV3, _chainIds, _endpoints, _confirmations);
    }
    
    function setPaused(bool _paused) external onlyOwner {
        if (_paused) _pause();
        else _unpause();
    }
    
    function emergencyWithdraw(
        address _token,
        uint256 _amount,
        address _to
    ) external onlyOwner {
        require(_to != address(0), "Invalid recipient");
        
        if (_token == address(0)) {
            payable(_to).transfer(_amount);
        } else {
            IERC20(_token).safeTransfer(_to, _amount);
        }
    }

    // ============ View Functions ============
    
    /**
     * @notice Get all fees required for bridge transaction
     * @return protocolFee USDC protocol fee
     * @return sourceFee VIA source fee (FEE_TOKEN)
     * @return destGas Destination gas (WRAPPED_GAS_TOKEN)
     */
    function getBridgeFees() external view returns (
        uint256 protocolFee,
        uint256 sourceFee,
        uint256 destGas
    ) {
        if (destinationChainId == 0) return (0, 0, 0);
        return feeManager.calculateFees(destinationChainId);
    }
    
    function totalLocked() external view returns (uint256) {
        return wrappedToken.balanceOf(address(this));
    }
    
    function isChainSupported(uint32 _chainId) external view returns (bool) {
        return supportedChains[_chainId] && remoteContracts[_chainId] != address(0);
    }
}