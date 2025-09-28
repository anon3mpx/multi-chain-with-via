// SPDX-License-Identifier: MIT
pragma solidity ^0.8.17;

import ".deps/npm/@vialabs-io/contracts/message/MessageClient.sol";
import "@openzeppelin/contracts/token/ERC20/ERC20.sol";
import "@openzeppelin/contracts/token/ERC20/extensions/ERC20Burnable.sol";

contract ViaERC20 is ERC20, ERC20Burnable, MessageClient {

    // Events for tracking cross-chain transfers
    event TokensBridged(address indexed sender, uint32 indexed destChainId, address indexed recipient, uint256 amount);
    event TokensReceived(uint indexed sourceChainId, address indexed recipient, uint256 amount);
    
    constructor(
        string memory _name,
        string memory _symbol,
        uint256 _initialSupply,
        address _messageV3Address
    ) ERC20(_name, _symbol) {
        MESSAGEv3 = IMessageV3(_messageV3Address);
        if (_initialSupply > 0) {
            _mint(msg.sender, _initialSupply);
        }
    }

    function bridge(uint32 _destChainId, address _recipient, uint256 _amount) external {
        // Burn tokens on the source chain
        _burn(msg.sender, _amount);
        
        // Encode recipient and amount for the destination chain
        bytes memory data = abi.encode(_recipient, _amount);
        
        // Send a message to the destination chain to mint tokens
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
        
        // Mint new tokens for the recipient on the destination chain
        _mint(recipient, amount);

        emit TokensReceived(_sourceChainId, recipient, amount);
    }
}