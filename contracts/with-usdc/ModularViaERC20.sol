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
 * @title CorrectedSyntheticBridge
 * @notice Synthetic bridge with dynamic VIA fee handling
 */
contract CorrectedSyntheticBridge is ERC20, ERC20Burnable, MessageClient, ReentrancyGuard, Pausable, Ownable {
    
    // ============ State Variables ============
    
    IEnhancedFeeManager public feeManager;
    IERC20 public immutable USDC;
    
    bytes32 public routeId;
    string public routeName;
    uint32 public destinationChainId;
    address public remoteContract;
    
    mapping(uint32 => bool) public supportedChains;
    mapping(uint32 => address) public remoteContracts;
    mapping(uint32 => bool) public authorizedMinters;

    // ============ Events ============
    
    event TokensBridged(
        address indexed sender,
        uint32 indexed destChainId,
        address indexed recipient,
        uint256 amount,
        uint256 protocolFee,
        bytes32 routeId
    );
    
    event TokensReceived(
        uint256 indexed sourceChainId,
        address indexed recipient,
        uint256 amount,
        bytes32 routeId
    );
    
    event FeeManagerUpdated(address indexed oldManager, address indexed newManager);
    event MinterAuthorized(uint32 indexed chainId, bool authorized);

    // ============ Constructor ============
    
    constructor(
        string memory _name,
        string memory _symbol,
        uint256 _initialSupply,
        address _usdc,
        address _messageV3Address,
        address _feeManager,
        bytes32 _routeId,
        string memory _routeName,
        address _owner
    ) ERC20(_name, _symbol) {
        require(_usdc != address(0), "Invalid USDC");
        require(_messageV3Address != address(0), "Invalid MessageV3");
        require(_feeManager != address(0), "Invalid fee manager");
        require(_owner != address(0), "Invalid owner");
        
        USDC = IERC20(_usdc);
        MESSAGEv3 = IMessageV3(_messageV3Address);
        feeManager = IEnhancedFeeManager(_feeManager);
        routeId = _routeId;
        routeName = _routeName;
        
        _transferOwnership(_owner);
        
        if (_initialSupply > 0) {
            _mint(_owner, _initialSupply);
        }
    }

    // ============ Main Bridge Function ============
    
    /**
     * @notice Bridge tokens back with dynamic VIA fees
     * @param _recipient Recipient on destination chain
     * @param _amount Amount to bridge
     * @param _viaSourceFee VIA source fee (from off-chain quote)
     * @param _viaDestGas VIA destination gas (from off-chain quote)
     */
    function bridge(
        address _recipient,
        uint256 _amount,
        uint256 _viaSourceFee,
        uint256 _viaDestGas
    ) 
        external 
        payable
        nonReentrant 
        whenNotPaused 
    {
        require(_recipient != address(0), "Invalid recipient");
        require(_amount > 0, "Invalid amount");
        require(balanceOf(msg.sender) >= _amount, "Insufficient balance");
        require(destinationChainId != 0, "Route not configured");
        require(remoteContract != address(0), "Remote not set");
        
        // Step 1: Collect protocol fee and validate VIA fees
        uint256 protocolFee = feeManager.collectProtocolFee(
            msg.sender,
            destinationChainId,
            _viaSourceFee,
            _viaDestGas
        );
        
        // Step 2: Collect VIA fees from user
        uint256 totalViaFee = _viaSourceFee + _viaDestGas;
        if (totalViaFee > 0) {
            USDC.safeTransferFrom(msg.sender, address(this), totalViaFee);
            USDC.approve(address(MESSAGEv3), totalViaFee);
        }
        
        // Step 3: Burn synthetic tokens
        _burn(msg.sender, _amount);
        
        // Step 4: Send cross-chain message
        bytes memory data = abi.encode(_recipient, _amount);
        _sendMessage(destinationChainId, data);
        
        emit TokensBridged(
            msg.sender,
            destinationChainId,
            _recipient,
            _amount,
            protocolFee,
            routeId
        );
    }
    
    function messageProcess(
        uint _txId,
        uint _sourceChainId,
        address _sender,
        address _reference,
        uint _protocolAmount,
        bytes calldata _data
    ) external override onlySelf(_sender, _sourceChainId) {
        require(supportedChains[uint32(_sourceChainId)], "Chain not supported");
        require(authorizedMinters[uint32(_sourceChainId)], "Not authorized to mint");
        
        (address recipient, uint256 amount) = abi.decode(_data, (address, uint256));
        
        require(recipient != address(0), "Invalid recipient");
        require(amount > 0, "Invalid amount");
        
        _mint(recipient, amount);
        
        emit TokensReceived(_sourceChainId, recipient, amount, routeId);
    }

    // ============ Admin Functions ============
    
    function configureRoute(
        bytes32 _routeId,
        string memory _routeName,
        uint32 _destinationChainId,
        address _remoteContract
    ) external onlyOwner {
        routeId = _routeId;
        routeName = _routeName;
        destinationChainId = _destinationChainId;
        remoteContract = _remoteContract;
        
        supportedChains[_destinationChainId] = true;
        remoteContracts[_destinationChainId] = _remoteContract;
        authorizedMinters[_destinationChainId] = true;
        
        emit MinterAuthorized(_destinationChainId, true);
    }
    
    function setMinterAuthorization(uint32 _chainId, bool _authorized) external onlyOwner {
        authorizedMinters[_chainId] = _authorized;
        emit MinterAuthorized(_chainId, _authorized);
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
}