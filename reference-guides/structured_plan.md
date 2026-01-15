# Refactoring Plan for VIA MessageV3 Architecture

This document outlines the step-by-step plan to refactor the `multi-chain-with-via` project to use the official MessageV3 architecture provided by VIA Labs. The core idea is to remove the `ViaTokenRouter` and have the token contracts inherit directly from `MessageClient`, implementing the V3 interface.

---

## 1. Foundational Changes

- **Delete `ViaTokenRouter.sol`**: This contract is no longer needed. All its logic will be merged directly into the pattern contracts.
- **Update Imports**: All contracts will now import `MessageClient` directly from `@vialabs-io/contracts/message/MessageClient.sol`.

## 2. Contract Refactoring: `ViaERC20Collateral.sol` (Lock-and-Unlock)

This contract will be updated to handle cross-chain logic internally.

- **Inheritance**: The contract will inherit from `MessageClient`.
- **Constructor**:
    - It will now accept `address _wrappedToken` and `address _messageV3Address`.
    - It will set the `wrappedToken` and initialize the `MessageClient` by setting `MESSAGEv3 = IMessageV3(_messageV3Address);`.
- **`bridge` function**:
    - This function will lock the user's tokens in the contract.
    - It will then call `_sendMessage(uint32 _destChainId, uint256 _amount, bytes memory _data)`.
    - The `_data` payload will be `abi.encode(_recipient)` to specify who receives the tokens on the destination chain.
- **`messageProcess` function**:
    - This new function will replace the old `_handleTransfer` logic. It is the entry point for incoming messages from the VIA protocol.
    - Its signature will be: `function messageProcess(uint _txId, uint _sourceChainId, address _sender, address _reference, uint _amount, bytes calldata _data) external override onlySelf(_sender, _sourceChainId)`.
    - It will decode the `recipient` from the `_data` payload.
    - It will unlock the tokens by transferring `_amount` of `wrappedToken` to the `recipient`.

## 3. Contract Refactoring: `ViaERC20.sol` (Burn-and-Mint)

This contract will be updated similarly.

- **Inheritance**: The contract will inherit from `ERC20`, `ERC20Burnable`, and `MessageClient`.
- **Constructor**:
    - It will accept `_name`, `_symbol`, `_initialSupply`, and `_messageV3Address`.
    - It will call the `ERC20` constructor and set `MESSAGEv3 = IMessageV3(_messageV3Address);`.
- **`bridge` function**:
    - This function will `_burn` the specified `_amount` from the `msg.sender`.
    - It will then call `_sendMessage`, passing the destination chain, amount, and the encoded recipient address as the data payload.
- **`messageProcess` function**:
    - This function will be the entry point for minting tokens.
    - It will decode the `recipient` from the `_data` payload.
    - It will `_mint` `_amount` of new tokens to the `recipient`.

## 4. Scripting Overhaul

All scripts must be updated to match the new contract architecture and configuration process.

- **`deploy.js`**:
    - This script will be updated to import `chainsConfig` from `@vialabs-io/contracts/config/chains`.
    - When deploying, it will automatically get the correct `messageV3Address` for the target network from `chainsConfig` and pass it to the contract's constructor.
- **`configure-bridge.js`**:
    - This script will be completely rewritten based on the example in `messageV3.md`.
    - It will now call a `configureClient` function on **your own deployed contracts**.
    - This function will register your other deployed contract addresses as trusted `endpoints` for specific chain IDs.
- **`bridge.js`**:
    - This script's logic will remain fundamentally the same (approve and call `bridge`), but the function call will now be on the newly refactored contracts.

## 5. New Workflow Summary

1.  **Deploy**: Run the updated `deploy.js` for each network. The script will automatically link your contract to VIA's MessageV3 contract on that chain.
2.  **Configure**: Run the new `configure-bridge.js` for each network. This calls `configureClient` on your contracts to make them aware of each other.
3.  **Bridge**: Run the `bridge.js` script to initiate a cross-chain transfer.
