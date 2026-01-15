// SPDX-License-Identifier: MIT
pragma solidity ^0.8.17;

import "@vialabs-io/contracts/message/MessageClient.sol";
import "@openzeppelin/contracts/token/ERC20/IERC20.sol";
import "@openzeppelin/contracts/token/ERC20/utils/SafeERC20.sol";

contract ViaERC20CollateralTest is MessageClient {
    using SafeERC20 for IERC20;
    
    IERC20 public immutable wrappedToken;

    // Events for tracking cross-chain transfers
    event TokensBridged(address indexed sender, uint32 indexed destChainId, address indexed recipient, uint256 amount);
    event TokensReceived(uint indexed sourceChainId, address indexed recipient, uint256 amount);

    constructor(address _wrappedToken, address _messageV3Address) {
        wrappedToken = IERC20(_wrappedToken);
        MESSAGEv3 = IMessageV3(_messageV3Address);
    }

    function bridge(uint32 _destChainId, address _recipient, uint256 _amount) external {
        // Lock user's tokens in this contract
        wrappedToken.safeTransferFrom(msg.sender, address(this), _amount);
        
        // Encode recipient and amount for the destination chain
        bytes memory data = abi.encode(_recipient, _amount);
        
        // Send a message to the destination chain
        _sendMessage(_destChainId, data);

        emit TokensBridged(msg.sender, _destChainId, _recipient, _amount);
    }

    function messageProcess(
        uint _txId, 
        uint _sourceChainId, 
        address _sender, 
        address _reference,
        uint _protocolAmount, // This amount is passed by the VIA protocol itself.
        bytes calldata _data
    ) external override onlySelf(_sender, _sourceChainId) {
        // Decode the recipient and amount from our custom data payload
        (address recipient, uint256 amount) = abi.decode(_data, (address, uint256));
        
        // Unlock tokens and send to the recipient
        wrappedToken.safeTransfer(recipient, amount);

        emit TokensReceived(_sourceChainId, recipient, amount);
    }
    
    function totalLocked() external view returns (uint256) {
        return wrappedToken.balanceOf(address(this));
    }
}