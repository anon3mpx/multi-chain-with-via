$ npx hardhat run scripts/bridge.js --network pulsechain_testnet

Running bridge script on network: pulsechain_testnet

- Signer: 0x05F8cC8753D90d67DBB8c02118440b8283F941c9
- Bridging 100.0 tokens...
- Token Address: 0xc16131616B78346eb58bfF11Fafc9895a7180d93
- Bridge Contract: 0x44733101c97A41E7F14C995bD212C8d455606751
- Destination: Chain ID 84532, Recipient 0x05F8cC8753D90d67DBB8c02118440b8283F941c9

1. Approving the bridge contract to spend 100.0 tokens...
   Approval transaction sent. Waiting for confirmation...
   Approval confirmed.

2. Sending bridge transaction...
   ProviderError: execution reverted: MessageV3: cannot send to zero address
   at HttpProvider.request (C:\Monarch\via-labs-crosschain\multi-chain-with-via\node_modules\hardhat\src\internal\core\providers\http.ts:116:21)
   at processTicksAndRejections (node:internal/process/task_queues:105:5)
   at HardhatEthersProvider.estimateGas (C:\Monarch\via-labs-crosschain\multi-chain-with-via\node_modules\@nomicfoundation\hardhat-ethers\src\internal\hardhat-ethers-provider.ts:246:27)
   at C:\Monarch\via-labs-crosschain\multi-chain-with-via\node_modules\@nomicfoundation\hardhat-ethers\src\signers.ts:335:35
   at async Promise.all (index 0)
   at HardhatEthersSigner.\_sendUncheckedTransaction (C:\Monarch\via-labs-crosschain\multi-chain-with-via\node_modules\@nomicfoundation\hardhat-ethers\src\signers.ts:356:7)
   at HardhatEthersSigner.sendTransaction (C:\Monarch\via-labs-crosschain\multi-chain-with-via\node_modules\@nomicfoundation\hardhat-ethers\src\signers.ts:181:18)
   at send (C:\Monarch\via-labs-crosschain\multi-chain-with-via\node_modules\ethers\src.ts\contract\contract.ts:313:20)
   at Proxy.bridge (C:\Monarch\via-labs-crosschain\multi-chain-with-via\node_modules\ethers\src.ts\contract\contract.ts:352:16)
   at main (C:\Monarch\via-labs-crosschain\multi-chain-with-via\scripts\bridge.js:56:20)
