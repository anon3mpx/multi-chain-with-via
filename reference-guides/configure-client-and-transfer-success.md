$ npx hardhat run scripts/quick-fix.js --network pulsechain_testnet
🚨 QUICK FIX: Configuring cross-chain bridge
Network: pulsechain_testnet
Current contract: 0x91E34254655381F873bC50EA1e7Ac9fD4594FAD8
Configuring remote: Chain 84532 -> 0x19BBE0f501251aC16Fcc72cc9AF8678Fc6AAC594
MessageV3: 0x91e26475016B923527B5Ef15789A9768EBA979e6
Configuration tx: 0xecc4e4ac2129ad8c89377c76748e1b7fb113ef3cca6046c486b225a061c005b1
✅ Configuration successful!

🔥 CONFIGURATION COMPLETE FOR PULSECHAIN_TESTNET

Next steps:

1. Run this same script on the OTHER network
2. Test bridging with the debug script

ganad@Ganadhish71 MINGW64 /c/Monarch/via-labs-crosschain/multi-chain-with-via
$ npx hardhat run scripts/quick-fix.js --network base_sepolia
🚨 QUICK FIX: Configuring cross-chain bridge
Network: base_sepolia
Current contract: 0x19BBE0f501251aC16Fcc72cc9AF8678Fc6AAC594
Configuring remote: Chain 943 -> 0x91E34254655381F873bC50EA1e7Ac9fD4594FAD8
MessageV3: 0xE700Ee5d8B7dEc62987849356821731591c048cF
Configuration tx: 0x7663010892dafa576c0f6e56c88f7d93de44893da0cf7b8c1b5e779d8d2d2fde
✅ Configuration successful!

🔥 CONFIGURATION COMPLETE FOR BASE_SEPOLIA

Next steps:

1. Run this same script on the OTHER network
2. Test bridging with the debug script

ganad@Ganadhish71 MINGW64 /c/Monarch/via-labs-crosschain/multi-chain-with-via
$ npx hardhat run scripts/debug-bridge.js --network pulsechain_testnet

🌉 Enhanced Bridge Testing Script
📍 Network: pulsechain_testnet
👤 Signer: 0x05F8cC8753D90d67DBB8c02118440b8283F941c9

📋 Bridge Parameters:
🏷️ Token Address: 0xc16131616B78346eb58bfF11Fafc9895a7180d93
🌉 Bridge Contract: 0x91E34254655381F873bC50EA1e7Ac9fD4594FAD8
💰 Amount: 10.0 tokens
🎯 Destination Chain: 84532 (Base Sepolia)
📧 Recipient: 0x05F8cC8753D90d67DBB8c02118440b8283F941c9

🔍 Initial Diagnostics:
📄 Token: ROB (18 decimals)
🔒 Total Locked: 0.0 tokens
🔧 Running debug state check...
📋 Debug Events:

💰 Balance Check:
🪙 Your Token Balance: 9000000.0
✅ Current Allowance: 100.0

🔓 Token Approval:
✅ Sufficient allowance already exists

🌉 Bridge Transaction:
📤 Sending 10.0 tokens to chain 84532...
⛽ Estimating gas...
⛽ Estimated Gas: 123994
📤 Bridge tx sent: 0x1c60ac3ac1f4c0b302e9289ea6374edffe9a57e825564c7cc5d0737b6a80f84e
⏳ Waiting for confirmation...
✅ Bridge transaction confirmed!
⛽ Gas used: 103329
🧱 Block: 22728102

📋 Transaction Events:

1.  Raw log (topic: 0xddf252ad1be2c89b69c2b068fc378daa952ba7f163c4a11628f55a4df523b3ef)
    🧱 Block: 22728102

📋 Transaction Events:

1.  Raw log (topic: 0xddf252ad1be2c89b69c2b068fc378daa952ba7f163c4a11628f55a4df523b3ef)
    📋 Transaction Events:
1.  Raw log (topic: 0xddf252ad1be2c89b69c2b068fc378daa952ba7f163c4a11628f55a4df523b3ef)
1.  Raw log (topic: 0xddf252ad1be2c89b69c2b068fc378daa952ba7f163c4a11628f55a4df523b3ef)
1.  Raw log (topic: 0x9834f28f43506b43566f34f4f5ebe894dd1fff56af9407054982215536a4cb4c)
1.  Raw log (topic: 0x6e7fcebe00a0baf04fc44adc96f7a0dc8349f19593c2838a64e4ad3734702d16)
    ⚠️ No TokensBridged event found - this might indicate an issue

📊 Final State:
🪙 Your Token Balance: 8999990.0
🔒 Total Locked in Bridge: 10.0
📉 Tokens Transferred: 10.0

🔍 Monitoring Instructions:

1.  🔗 Check VIA Scanner: https://scan.vialabs.io/transaction/0x1c60ac3ac1f4c0b302e9289ea6374edffe9a57e825564c7cc5d0737b6a80f84e
2.  ⏰ Cross-chain messages typically take 2-10 minutes
3.  🎯 Check destination chain (Base Sepolia) for minted tokens
4.  📧 Recipient address: 0x05F8cC8753D90d67DBB8c02118440b8283F941c9
5.  🏭 Destination contract: 0x19BBE0f501251aC16Fcc72cc9AF8678Fc6AAC594

ganad@Ganadhish71 MINGW64 /c/Monarch/via-labs-crosschain/multi-chain-with-via
$ npx hardhat run scripts/reverse-bridge.js --network base_sepolia

🔄 Reverse Bridge Testing Script (Base Sepolia → PulseChain)
📍 Network: base_sepolia
👤 Signer: 0x05F8cC8753D90d67DBB8c02118440b8283F941c9

📋 Reverse Bridge Parameters:
🌉 Bridge Contract (ViaERC20): 0x19BBE0f501251aC16Fcc72cc9AF8678Fc6AAC594
💰 Amount: 5.0 tokens
🎯 Destination Chain: 943 (PulseChain Testnet)
📧 Recipient: 0x05F8cC8753D90d67DBB8c02118440b8283F941c9

💰 Token Balance Check:
📄 Token: MBT (18 decimals)
🪙 Your Balance: 10.0 MBT
🏭 Total Supply: 10.0 MBT

🔥 Bridge Transaction (Burn on Base Sepolia, Mint on PulseChain):
📤 Burning 5.0 tokens on Base Sepolia...
⛽ Estimating gas...
⛽ Estimated Gas: 75836
📤 Bridge tx sent: 0x5b6fc8266c7aa6ff5654918b84b76646c26e7017dd6f57e53811f87e95e591f6
⏳ Waiting for confirmation...
✅ Bridge transaction confirmed!
⛽ Gas used: 74956
🧱 Block: 31610407

📋 Transaction Events:

1.  Raw log (topic: 0xddf252ad1be2c89b69c2b068fc378daa952ba7f163c4a11628f55a4df523b3ef)
2.  Raw log (topic: 0x9834f28f43506b43566f34f4f5ebe894dd1fff56af9407054982215536a4cb4c)
3.  TokensBridged
    👤 Sender: 0x05F8cC8753D90d67DBB8c02118440b8283F941c9
    🎯 Destination Chain: 943
    📧 Recipient: 0x05F8cC8753D90d67DBB8c02118440b8283F941c9
    💰 Amount: 5.0

📊 Final State:
🪙 Your Token Balance: 5.0
🏭 Total Supply: 5.0
🔥 Tokens Burned: 5.0

🔍 Monitoring Instructions:

1.  🔗 VIA Scanner: https://scan.vialabs.io/transaction/0x5b6fc8266c7aa6ff5654918b84b76646c26e7017dd6f57e53811f87e95e591f6
2.  ⏰ Wait 2-10 minutes for cross-chain message processing
3.  🎯 Check PulseChain Testnet for unlocked tokens
4.  📧 Recipient: 0x05F8cC8753D90d67DBB8c02118440b8283F941c9
5.  🏭 PulseChain Contract: 0x91E34254655381F873bC50EA1e7Ac9fD4594FAD8

✅ Reverse bridge transaction completed successfully!
