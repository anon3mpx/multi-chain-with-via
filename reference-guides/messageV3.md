Usage
Implementing MessageV3Client
Inheritance: Extend your contract from MessageClient.
Message Sending: Use \_sendMessage and \_sendMessageExpress.
Message Processing: Implement messageProcess for incoming message handling.
// SPDX-License-Identifier: MIT
pragma solidity ^0.8.9;

import "@vialabs-io/contracts/message/MessageClient.sol";

contract MyCrossChainContract is MessageClient {
constructor(address messageV3Address) {
MESSAGEv3 = IMessageV3(messageV3Address);
}

    function sendMessageToAnotherChain(uint destinationChainId, bytes memory data) public {
        uint txId = _sendMessage(destinationChainId, data);
    }

    function sendExpressMessageToAnotherChain(uint destinationChainId, bytes memory data) public {
        uint txId = _sendMessageExpress(destinationChainId, data);
    }

    function messageProcess(
        uint _txId, uint _sourceChainId, address _sender, address _reference,
        uint _amount, bytes calldata _data
    ) external override onlySelf(_sender, _sourceChainId) {
        // Decode and process the message
    }

}
Using the MessageClient ABI
import { MessageClientABI } from '@vialabs-io/contracts/abis';

const myContract = new ethers.Contract(contractAddress, MessageClientABI, signer);
Using the MessageClient Configuration
import chainsConfig from '@vialabs-io/contracts/config/chains';

const messageAddress = chainsConfig[hre.network.config.chainId].message;
After Deployment Configuration Script
const { ethers } = require('ethers');
const chainsConfig = require('@vialabs-io/contracts/config/chains');
const { MessageClientABI } = require('@vialabs-io/contracts/message/abi');

async function configureContract() {
const rpcUrl = 'https://mainnet.infura.io/v3/YOUR_INFURA_API_KEY';
const privateKey = '0xYOUR_PRIVATE_KEY';
const contractAddress = '0xabcd...1234';
const provider = new ethers.providers.JsonRpcProvider(rpcUrl);
const signer = new ethers.Wallet(privateKey, provider);
const myContract = new ethers.Contract(contractAddress, MessageClientABI, signer);

    try {
        const chains = [5, 11155111, 17000];
        const endpoints = ['0x000000','0x000000','0x000000'];
        const confirmations = [12, 6, 6];

        const tx = await myContract.configureClient(
            chainsConfig[hre.network.config.chainId].message,
            chains,
            endpoints,
            confirmations
        );

        console.log('Transaction sent:', tx.hash);
        await tx.wait();
        console.log('Chains configured successfully.');
    } catch (error) {
        console.error('An error occurred during configuration:', error);
    }

}

configureContract();
