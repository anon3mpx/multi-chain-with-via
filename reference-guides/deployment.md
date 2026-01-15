$ npx hardhat run scripts/deploy.js --network pulsechain_testnet

Deploying contracts with the account: 0x05F8cC8753D90d67DBB8c02118440b8283F941c9
Running on network: pulsechain_testnet
Found VIA MessageV3 contract at: 0x91e26475016B923527B5Ef15789A9768EBA979e6

Deploying ViaERC20Collateral on source chain...
ViaERC20Collateral deployed to: 0x44733101c97A41E7F14C995bD212C8d455606751 on pulsechain_testnet

$ npx hardhat run scripts/deploy.js --network base_sepolia

Deploying contracts with the account: 0x05F8cC8753D90d67DBB8c02118440b8283F941c9
Running on network: base_sepolia
Found VIA MessageV3 contract at: 0xE700Ee5d8B7dEc62987849356821731591c048cF

Deploying ViaERC20 on destination chain...
ViaERC20 (bridged token) deployed to: 0x87353B9AA546F8cf7290DeD2d339C0Ec694d7144 on base_sepolia

---

$ npx hardhat run scripts/configure-bridge.js --network pulsechain_testnet

Configuring client with account: 0x05F8cC8753D90d67DBB8c02118440b8283F941c9
Running on network: pulsechain_testnet

1. CONFIGURING CLIENT ON SOURCE CHAIN (pulsechain_testnet)
   - Calling configureClient for remote chain 84532
     Transaction sent, waiting for confirmation...
     ✅ Client configured successfully on pulsechain_testnet!

ganad@Ganadhish71 MINGW64 /c/Monarch/via-labs-crosschain/multi-chain-with-via
$ npx hardhat run scripts/configure-bridge.js --network base_sepolia

Configuring client with account: 0x05F8cC8753D90d67DBB8c02118440b8283F941c9
Running on network: base_sepolia

2. CONFIGURING CLIENT ON DESTINATION CHAIN (base_sepolia)
   - Calling configureClient for remote chain 943
     Transaction sent, waiting for confirmation...
     ✅ Client configured successfully on base_sepolia!

---

Deployment V2:

$ npx hardhat run scripts/deploy.js --network pulsechain_testnet

Deploying on pulsechain_testnet with account: 0x05F8cC8753D90d67DBB8c02118440b8283F941c9
Using VIA MessageV3 contract at: 0x91e26475016B923527B5Ef15789A9768EBA979e6
ViaERC20Collateral deployed to: 0x91E34254655381F873bC50EA1e7Ac9fD4594FAD8

✅ Deployment data saved to C:\Monarch\via-labs-crosschain\multi-chain-with-via\deployments\deployments.json

$ npx hardhat run scripts/deploy.js --network base_sepolia

Deploying on base_sepolia with account: 0x05F8cC8753D90d67DBB8c02118440b8283F941c9
Using VIA MessageV3 contract at: 0xE700Ee5d8B7dEc62987849356821731591c048cF
ViaERC20 deployed to: 0x19BBE0f501251aC16Fcc72cc9AF8678Fc6AAC594

✅ Deployment data saved to C:\Monarch\via-labs-crosschain\multi-chain-with-via\deployments\deployments.json

---

$ npx hardhat run scripts/configure-bridge.js --network pulsechain_testnet

Configuring client on pulsechain_testnet with account: 0x05F8cC8753D90d67DBB8c02118440b8283F941c9
Configuring ViaERC20Collateral at 0x91E34254655381F873bC50EA1e7Ac9fD4594FAD8

- Setting 1 remote(s):
- Chain 84532 (base_sepolia) -> 0x19BBE0f501251aC16Fcc72cc9AF8678Fc6AAC594
- Config tx sent: 0xd1c2bf5e07563c7dc7d2349f9620d52ada366aad9898c75585aa729caf463092. Waiting for confirmation...
- ✅ Configuration successful!

$ npx hardhat run scripts/configure-bridge.js --network base_sepolia

Configuring client on base_sepolia with account: 0x05F8cC8753D90d67DBB8c02118440b8283F941c9
Configuring ViaERC20 at 0x19BBE0f501251aC16Fcc72cc9AF8678Fc6AAC594

- Setting 1 remote(s):
- Chain 943 (pulsechain_testnet) -> 0x91E34254655381F873bC50EA1e7Ac9fD4594FAD8
- Config tx sent: 0x2c48c4a9d3b337b9172599070c84be7f11513ecd0f2a27771a728501ea462c1b. Waiting for confirmation...
- ✅ Configuration successful!

---

---

Production:

$ npx hardhat run scripts/prod-scripts/deploy.js --network pulsechain_testnet
Compiled 2 Solidity files successfully (evm target: london).
🚀 Deploying PRODUCTION contracts on pulsechain_testnet
👤 Deployer: 0x05F8cC8753D90d67DBB8c02118440b8283F941c9
✅ ViaERC20Collateral deployed: 0x47D85e748519CAa2F5f217782eB5A291A53A359a

$ npx hardhat run scripts/prod-scripts/deploy.js --network base_sepolia
🚀 Deploying PRODUCTION contracts on base_sepolia
👤 Deployer: 0x05F8cC8753D90d67DBB8c02118440b8283F941c9
✅ ViaERC20 deployed: 0x49f6BF1E6597d8d1FCDC74FdBBE0AAb0369E0146

---

---

$ npx hardhat run scripts/prod-scripts/clientConfig.js --network pulsechain_testnet

# 🔧 PRODUCTION BRIDGE CONFIGURATION

Network: pulsechain_testnet
Chain ID: 943
Signer: 0x05F8cC8753D90d67DBB8c02118440b8283F941c9
📍 Current Contract: 0x47D85e748519CAa2F5f217782eB5A291A53A359a
📄 Contract Type: ViaERC20Collateral
🔗 MessageV3: 0x91e26475016B923527B5Ef15789A9768EBA979e6

🌐 Remote Deployments Found:

1.  Chain 943 (pulsechain_testnet): 0x47D85e748519CAa2F5f217782eB5A291A53A359a
2.  Chain 84532 (base_sepolia): 0x49f6BF1E6597d8d1FCDC74FdBBE0AAb0369E0146

⚙️ Configuration Parameters:
🔗 MessageV3: 0x91e26475016B923527B5Ef15789A9768EBA979e6
🌐 Remote Chains: [84532]
📍 Remote Addresses: [0x49f6BF1E...]
✅ Confirmations: [1]

# 🔨 STEP 1: Configure MessageClient

📤 MessageClient config tx: 0x531b2d87d4bee311d9ac6d195a103e84aaf788878bc2a38e75c22b7713b538eb
⏳ Waiting for confirmation...
✅ MessageClient configured successfully!

# 🔨 STEP 2: Configure Supported Chains

🌐 Configuring Chain 84532...
📍 Remote Address: 0x49f6BF1E6597d8d1FCDC74FdBBE0AAb0369E0146
📤 Chain config tx: 0xfa0d6ec387e148f7522ddf8c9149105140d892ee81ed30c0b3b203bb2dcc1f50
✅ Chain 84532 configured successfully!

# 🔨 STEP 3: Set Production Parameters

💰 Setting bridge limits...
Min: 1.0 tokens
Max: 10000.0 tokens
Daily: 100000.0 tokens
📤 Limits tx: 0x6eb1d843964ea3d9d05be5bb1e0436d791736ea66a3c84e72e56eff6e89055df
✅ Bridge limits set successfully!
💸 Setting bridge fee...
Fee: 0.1 tokens
📤 Fee tx: 0x11ea85ce6c9fe2ff77a87ce4b503074eb8f91dfb5fe93febd05b6490d9b9c545
✅ Bridge fee set successfully!

# 🔨 STEP 4: Verification

🔍 Verifying configuration...
Chain 84532: ✅ Supported

📊 Current Bridge Stats:
🔒 Total Locked: 0.0 tokens
🌉 Total Bridged: 0.0 tokens
📈 Total Transactions: 0
📅 Today's Volume: 0.0 tokens
🎯 Remaining Daily Limit: 100000.0 tokens

# 🎉 PRODUCTION CONFIGURATION COMPLETED!

✅ MessageClient configured
✅ Supported chains configured
✅ Production parameters set
✅ Configuration verified

📋 Next Steps:

1. Run this script on ALL other networks
2. Test bridge operations with production contracts
3. Monitor bridge operations with monitoring scripts
4. Consider additional security measures for mainnet

🔗 Contract Address: 0x47D85e748519CAa2F5f217782eB5A291A53A359a
🌐 Network: pulsechain_testnet (943)

---

---

$ npx hardhat run scripts/prod-scripts/clientConfig.js --network base_sepolia

# 🔧 PRODUCTION BRIDGE CONFIGURATION

Network: base_sepolia
Chain ID: 84532
Signer: 0x05F8cC8753D90d67DBB8c02118440b8283F941c9
📍 Current Contract: 0x49f6BF1E6597d8d1FCDC74FdBBE0AAb0369E0146
📄 Contract Type: ViaERC20
🔗 MessageV3: 0xE700Ee5d8B7dEc62987849356821731591c048cF

🌐 Remote Deployments Found:

1.  Chain 943 (pulsechain_testnet): 0x47D85e748519CAa2F5f217782eB5A291A53A359a
2.  Chain 84532 (base_sepolia): 0x49f6BF1E6597d8d1FCDC74FdBBE0AAb0369E0146

⚙️ Configuration Parameters:
🔗 MessageV3: 0xE700Ee5d8B7dEc62987849356821731591c048cF
🌐 Remote Chains: [943]
📍 Remote Addresses: [0x47D85e74...]
✅ Confirmations: [1]

# 🔨 STEP 1: Configure MessageClient

📤 MessageClient config tx: 0x50aae55a632ed128c2c3724f70ace1422dd1ea900b3475c38b32f28fbac7e0c8
⏳ Waiting for confirmation...
✅ MessageClient configured successfully!

# 🔨 STEP 2: Configure Supported Chains

🌐 Configuring Chain 943...
📍 Remote Address: 0x47D85e748519CAa2F5f217782eB5A291A53A359a
📤 Chain config tx: 0x66a00acbd2598c0d59f8a6bf7357451d2f9d5e9200c8a982f1427145505f2cea
✅ Chain 943 configured successfully!
🏭 Authorizing chain 943 for minting...
📤 Minter auth tx: 0x86b609dc17199abcdb32181d3707f2e5ace0c34a87ad0e27c45d3fc5c0d1f73e
✅ Minting authorization granted!

# 🔨 STEP 3: Set Production Parameters

💰 Setting bridge limits...
Min: 1.0 tokens
Max: 10000.0 tokens
Daily: 100000.0 tokens
📤 Limits tx: 0x66e234531ee5d5c64c1a229bf0e5501b268d18c3f62745ce2d2301327eaa410f
✅ Bridge limits set successfully!
💸 Setting bridge fee...
Fee: 0.1 tokens
📤 Fee tx: 0x771ba6c6d65b99227b16e161829e501f2508e566c7f8019ec8a98f92dc543124
✅ Bridge fee set successfully!

# 🔨 STEP 4: Verification

🔍 Verifying configuration...
Chain 943: ✅ Supported
Chain 943 minting: ✅ Authorized

📊 Current Bridge Stats:
🏭 Total Supply: 0.0 tokens
🌉 Total Bridged: 0.0 tokens
📈 Total Transactions: 0
📅 Today's Volume: 0.0 tokens
🎯 Remaining Daily Limit: 100000.0 tokens

# 🎉 PRODUCTION CONFIGURATION COMPLETED!

✅ MessageClient configured
✅ Supported chains configured
✅ Production parameters set
✅ Configuration verified

📋 Next Steps:

1. Run this script on ALL other networks
2. Test bridge operations with production contracts
3. Monitor bridge operations with monitoring scripts
4. Consider additional security measures for mainnet

🔗 Contract Address: 0x49f6BF1E6597d8d1FCDC74FdBBE0AAb0369E0146
🌐 Network: base_sepolia (84532)

---

Bridge

---

$ npx hardhat run scripts/prod-scripts/bridge-pls-to-base.js --network pulsechain_testnet

# 🌉 PRODUCTION BRIDGE: PulseChain → Base Sepolia

📍 Network: pulsechain_testnet
👤 Signer: 0x05F8cC8753D90d67DBB8c02118440b8283F941c9

📋 Bridge Configuration:
🏷️ Wrapped Token: 0xc16131616B78346eb58bfF11Fafc9895a7180d93
🌉 Bridge Contract: 0x47D85e748519CAa2F5f217782eB5A291A53A359a
💰 Amount: 5.0 tokens
🎯 Destination: Chain 84532 (Base Sepolia)
📧 Recipient: 0x05F8cC8753D90d67DBB8c02118440b8283F941c9
🏭 Destination Contract: 0x49f6BF1E6597d8d1FCDC74FdBBE0AAb0369E0146

# 🔍 STEP 1: Pre-Bridge Checks

⚠️ Unable to read token info: Token.symbol is not a function
🪙 Your Balance: 8999995.0 tokens

📊 Bridge Statistics:
🔒 Total Locked: 0.0 tokens
🌉 Total Bridged: 0.0 tokens
📈 Total Transactions: 0
📅 Today's Volume: 0.0 tokens
🎯 Remaining Daily Limit: 100000.0 tokens

💰 Bridge Limits:
📏 Min Amount: 1.0 tokens
📏 Max Amount: 10000.0 tokens
💸 Bridge Fee: 0.1 tokens
💎 Net Amount (after fee): 4.9 tokens
✅ Destination chain 84532 is supported

# 🔓 STEP 2: Token Approval

📊 Current Allowance: 0.0 tokens
📤 Approving 5.0 tokens...
⏳ Approval tx: 0xf781e5aa302f54f9caf1f03fa159921c56e470ee2aa0ec352a35bd68fc33ebd2
✅ Approval confirmed
🔍 New Allowance: 5.0 tokens

# 🌉 STEP 3: Execute Bridge Transaction

⛽ Estimating gas...
⛽ Estimated Gas: 261468
📤 Sending bridge transaction...
📤 Bridge tx sent: 0x8642dc988147eb19e19339454c3b21ffc43c045a22e6e54ec172d7a9ab751cab
⏳ Waiting for confirmation...
✅ Bridge transaction confirmed!
⛽ Gas used: 208115
🧱 Block: 22735604

# 📋 STEP 4: Transaction Analysis

📊 Events Emitted: 1. Raw log (topic: 0xddf252ad...) 2. Raw log (topic: 0x9834f28f...) 3. TokensBridged
👤 Sender: 0x05F8cC8753D90d67DBB8c02118440b8283F941c9
🎯 Destination Chain: 84532
📧 Recipient: 0x05F8cC8753D90d67DBB8c02118440b8283F941c9
💰 Amount: 4.9 tokens
💸 Fee: 0.1 tokens
🆔 Transaction ID: 1

# 📊 STEP 5: Final State

🪙 Your Token Balance: 8999990.0 tokens
🔒 Total Locked in Bridge: 5.0 tokens
📉 Tokens Transferred: 5.0 tokens
📈 Bridge Total Transactions: 1
🎯 Remaining Daily Limit: 99995.0 tokens

# 🔍 STEP 6: Monitoring Information

🔗 VIA Scanner: https://scan.vialabs.io/transaction/0x8642dc988147eb19e19339454c3b21ffc43c045a22e6e54ec172d7a9ab751cab
⏰ Cross-chain processing time: 2-10 minutes
🎯 Destination chain: Base Sepolia (84532)
📧 Recipient address: 0x05F8cC8753D90d67DBB8c02118440b8283F941c9
🏭 Destination contract: 0x49f6BF1E6597d8d1FCDC74FdBBE0AAb0369E0146
🆔 Bridge Transaction ID: 1

# ✅ PRODUCTION BRIDGE TRANSACTION COMPLETED!

💰 Net Amount Bridged: 4.9 tokens
💸 Fee Paid: 0.1 tokens
📱 Next steps:

1.  Wait 2-10 minutes for cross-chain processing
2.  Check VIA Scanner for message status
3.  Verify tokens minted on Base Sepolia
4.  Use reverse bridge script to test return journey
