# Contract Structures

## initial contracts (base)

```solidity
// SPDX-License-Identifier: MIT
pragma solidity ^0.8.17;

import "@vialabs-io/contracts/MessageClient.sol";

abstract contract ViaTokenRouter is MessageClient {
    /**
     * @notice Handles incoming messages from VIA's protocol. It decodes
     * the basic transfer data and passes it to the child contract.
     */
    function _processMessage(uint, uint, bytes calldata _data) internal virtual override {
        (address recipient, uint256 amount) = abi.decode(_data, (address, uint256));
        _handleTransfer(recipient, amount);
    }

    /**
     * @notice Dispatches a message to the destination chain using VIA.
     */
    function _dispatchMessage(
        uint32 _destChainId,
        address _recipient,
        uint256 _amount
    ) internal virtual {
        _sendMessage(_destChainId, abi.encode(_recipient, _amount));
    }

    /**
    * @notice Abstract function to be implemented by child contracts
    * with specific token logic (e.g., minting or unlocking).
    */
    function _handleTransfer(address _recipient, uint256 _amount) internal virtual;
}

// SPDX-License-Identifier: MIT
pragma solidity ^0.8.17;

import "../routers/ViaTokenRouter.sol";
import "@openzeppelin/contracts/token/ERC20/ERC20.sol";
import "@openzeppelin/contracts/token/ERC20/extensions/ERC20Burnable.sol";

contract ViaERC20 is ERC20, ERC20Burnable, ViaTokenRouter {

    constructor(
        string memory _name,
        string memory _symbol,
        uint256 _initialSupply
    ) ERC20(_name, _symbol) {
        MESSAGE_OWNER = msg.sender;
        if (_initialSupply > 0) {
            _mint(msg.sender, _initialSupply);
        }
    }

    function bridge(uint32 _destChainId, address _recipient, uint256 _amount) external {
        _burn(msg.sender, _amount); // Burn tokens on source chain
        _dispatchMessage(_destChainId, _recipient, _amount);
    }

    function _handleTransfer(address _recipient, uint256 _amount) internal override {
        _mint(_recipient, _amount); // Mint tokens on destination chain
    }
}

// SPDX-License-Identifier: MIT
pragma solidity ^0.8.17;

import "../routers/ViaTokenRouter.sol";
import "@openzeppelin/contracts/token/ERC20/IERC20.sol";
import "@openzeppelin/contracts/token/ERC20/utils/SafeERC20.sol";

contract ViaERC20Collateral is ViaTokenRouter {
    using SafeERC20 for IERC20;

    IERC20 public immutable wrappedToken;

    constructor(address _wrappedToken) {
        wrappedToken = IERC20(_wrappedToken);
        MESSAGE_OWNER = msg.sender; // Set owner for VIA's MessageClient
    }

    function bridge(uint32 _destChainId, address _recipient, uint256 _amount) external {
        // Lock tokens in this contract
        wrappedToken.safeTransferFrom(msg.sender, address(this), _amount);
        _dispatchMessage(_destChainId, _recipient, _amount);
    }

    function _handleTransfer(address _recipient, uint256 _amount) internal override {
        // Unlock tokens and send to recipient
        wrappedToken.safeTransfer(_recipient, _amount);
    }

    function totalLocked() external view returns (uint256) {
        return wrappedToken.balanceOf(address(this));
    }
}

```

## TokenRouter.sol

````solidity
// SPDX-License-Identifier: MIT
pragma solidity ^0.8.17;

import "@vialabs-io/contracts/MessageClient.sol";
import "@openzeppelin/contracts-upgradeable/token/ERC20/IERC20Upgradeable.sol";
import "@openzeppelin/contracts-upgradeable/token/ERC20/utils/SafeERC20Upgradeable.sol";
import "@openzeppelin/contracts-upgradeable/access/OwnableUpgradeable.sol";

import "@openzeppelin/contracts-upgradeable/proxy/utils/Initializable.sol";

abstract contract ViaTokenRouter is MessageClient, OwnableUpgradeable, virtual Initializable {
using SafeERC20Upgradeable for IERC20Upgradeable;

    // --- State Variables for Fees ---
    IERC20Upgradeable public feeToken;
    IERC20Upgradeable public wrappedGasToken;

    mapping(uint32 => uint256) public sourceFees;
    mapping(uint32 => uint256) public destinationGasFees;

    // --- Fee Protection ---
    mapping(uint32 => uint256) public maxFeeLimits;
    mapping(uint32 => uint256) public maxGasLimits;

    function __ViaTokenRouter_init() internal {
        __Ownable_init();
    }

    // --- Core Messaging Logic (from before) ---
    function _processMessage(uint, uint, bytes calldata _data) internal virtual override {
        (address recipient, uint256 amount) = abi.decode(_data, (address, uint256));
        _handleTransfer(recipient, amount);
    }

    function _dispatchMessage(uint32 _destChainId, address _recipient, uint256 _amount) internal virtual {
        _sendMessage(_destChainId, abi.encode(_recipient, _amount));
    }

    function _handleTransfer(address _recipient, uint256 _amount) internal virtual;

    // --- NEW: Internal Fee Collection Logic ---
    function _collectFees(address _from, uint32 _destChainId) internal {
        uint256 sourceFee = sourceFees[_destChainId];
        uint256 destGas = destinationGasFees[_destChainId];

        require(sourceFee <= maxFeeLimits[_destChainId], "Fee exceeds max limit");
        require(destGas <= maxGasLimits[_destChainId], "Gas exceeds max limit");

        if (sourceFee > 0) {
            feeToken.safeTransferFrom(_from, address(this), sourceFee);
        }
        if (destGas > 0) {
            wrappedGasToken.safeTransferFrom(_from, address(this), destGas);
        }
    }

    // --- NEW: Access-Controlled Fee Management Functions ---
    function setFeeTokens(address _feeToken, address _wrappedGasToken) external onlyOwner {
        feeToken = IERC20Upgradeable(_feeToken);
        wrappedGasToken = IERC20Upgradeable(_wrappedGasToken);
    }

    function setFees(uint32 _chainId, uint256 _sourceFee, uint256 _destinationGas) external onlyOwner {
        sourceFees[_chainId] = _sourceFee;
        destinationGasFees[_chainId] = _destinationGas;
    }

    function setMaxFeeLimits(uint32 _chainId, uint256 _maxFee, uint256 _maxGas) external onlyOwner {
        maxFeeLimits[_chainId] = _maxFee;
        maxGasLimits[_chainId] = _maxGas;
    }

    // // --- NEW: Emergency Recovery Functions ---
    // function recoverToken(address _tokenAddress, uint256 _amount) external onlyOwner {
    //     IERC20Upgradeable(_tokenAddress).transfer(owner(), _amount);
    // }

    function recoverNative(uint256 _amount) external onlyOwner {
        payable(owner()).transfer(_amount);
    }

}

## ViaERC20.sol

```solidity
// SPDX-License-Identifier: MIT
pragma solidity ^0.8.17;

import "../routers/ViaTokenRouter.sol";
import "@openzeppelin/contracts-upgradeable/token/ERC20/ERC20Upgradeable.sol";
import "@openzeppelin/contracts-upgradeable/token/ERC20/extensions/ERC20BurnableUpgradeable.sol";

contract ViaERC20 is ERC20Upgradeable, ERC20BurnableUpgradeable, ViaTokenRouter {

    function initialize(
        string memory _name,
        string memory _symbol,
        uint256 _initialSupply,
        address _initialOwner // Add owner for fee management
    ) public initializer {
        __ERC20_init(_name, _symbol);
        __ERC20Burnable_init();
        __ViaTokenRouter_init();
        transferOwnership(_initialOwner);

        if (_initialSupply > 0) {
            _mint(msg.sender, _initialSupply);
        }
    }

    function bridge(uint32 _destChainId, address _recipient, uint256 _amount) external {
        _collectFees(msg.sender, _destChainId);
        _burn(msg.sender, _amount);
        _dispatchMessage(_destChainId, _recipient, _amount);
    }

    function _handleTransfer(address _recipient, uint256 _amount) internal override {
        _mint(_recipient, _amount);
    }
}
````

## ViaERC20Collateral.sol

```solidity
// SPDX-License-Identifier: MIT
pragma solidity ^0.8.17;

import "../routers/ViaTokenRouter.sol";
import "@openzeppelin/contracts-upgradeable/token/ERC20/IERC20Upgradeable.sol";
import "@openzeppelin/contracts-upgradeable/token/ERC20/utils/SafeERC20Upgradeable.sol";
import "@openzeppelin/contracts-upgradeable/proxy/utils/Initializable.sol";

contract ViaERC20Collateral is Initializable, ViaTokenRouter {
    using SafeERC20Upgradeable for IERC20Upgradeable;

    IERC20Upgradeable public wrappedToken;

    function initialize(address _wrappedToken, address _initialOwner) public initializer {
        __ViaTokenRouter_init();
        wrappedToken = IERC20Upgradeable(_wrappedToken);
        transferOwnership(_initialOwner);
    }

    function bridge(uint32 _destChainId, address _recipient, uint256 _amount) external {
        _collectFees(msg.sender, _destChainId);
        wrappedToken.safeTransferFrom(msg.sender, address(this), _amount);
        _dispatchMessage(_destChainId, _recipient, _amount);
    }

    function _handleTransfer(address _recipient, uint256 _amount) internal override {
        wrappedToken.safeTransfer(_recipient, _amount);
    }

    function totalLocked() external view returns (uint256) {
        return wrappedToken.balanceOf(address(this));
    }
}
```
