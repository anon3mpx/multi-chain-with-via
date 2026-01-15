npx hardhat run scripts/audited-scripts/deploy-collateral.js --network pulsechain
Compiled 2 Solidity files successfully (evm target: london).

🚀 DEPLOYING ViaCollateralBridgeV3
═══════════════════════════════════════════════════════
📍 Network: pulsechain (Chain ID: 369)
👤 Deployer: 0x05F8cC8753D90d67DBB8c02118440b8283F941c9
🎯 Token: HOA

📋 Deployment Parameters:
   Collateral Token: 0x7901a3569679AEc3501dbeC59399F327854a70fe
   Fee Token (USDC): 0x15D38573d2feeb82e7ad5187aB8c1D52810B1f07
   MessageV3: 0xba01F2bA548e69bA26Fd06a3bdf1A7857eeAC435
   Treasury: 0x02E6B1C1E78A7C71798262ef34386182C553bA8C
   Settlement Gas Limit: 300000
   Min Gas Price: 1000000000 wei
   Owner: 0x05F8cC8753D90d67DBB8c02118440b8283F941c9

⏳ Deploying contract...

✅ ViaCollateralBridgeV3 deployed!
   Address: 0x7c3b2630CDe38276bC0a0EF490fC682081929eE0
   Token: HOA (Hex Orange Address)
💾 Deployment saved: HOA on pulsechain -> 0x7c3b2630CDe38276bC0a0EF490fC682081929eE0

📋 Next Steps:
   1. Deploy ViaSyntheticBridgeV3 on destination chains
   2. Run configure-message-client.js on this and all destination chains
   3. Run configure-chain.js to set up cross-chain routing

🔗 Contract: 0x7c3b2630CDe38276bC0a0EF490fC682081929eE0


npx hardhat run scripts/audited-scripts/deploy-synthetic.js --network base

🚀 DEPLOYING ViaSyntheticBridgeV3
═══════════════════════════════════════════════════════
📍 Network: base (Chain ID: 8453)
👤 Deployer: 0x05F8cC8753D90d67DBB8c02118440b8283F941c9
🎯 Token: HOA

📋 Deployment Parameters:
   Synthetic Name: Hex Orange Address
   Synthetic Symbol: HOA
   Fee Token (USDC): 0x833589fCD6eDb6E08f4c7C32D4f71b54bdA02913
   MessageV3: 0xe3b3274bb685F37C7f17a604039c77a6A16Cfc2a
   Treasury: 0x02E6B1C1E78A7C71798262ef34386182C553bA8C
   Settlement Gas Limit: 300000
   Min Gas Price: 1000000000 wei
   Owner: 0x05F8cC8753D90d67DBB8c02118440b8283F941c9

⏳ Deploying contract...

✅ ViaSyntheticBridgeV3 deployed!
   Address: 0x5E9289A6f2aFFc928c6912864e99b00C75f3e24B
   Token: HOA (Hex Orange Address)
💾 Deployment saved: HOA on base -> 0x5E9289A6f2aFFc928c6912864e99b00C75f3e24B

📋 Next Steps:
   1. Deploy on other destination chains if needed
   2. Run configure-message-client.js on this chain
   3. Run configure-chain.js to set up cross-chain routing

🔗 Contract: 0x5E9289A6f2aFFc928c6912864e99b00C75f3e24B

_______________________________________________________________________________

npx hardhat run scripts/audited-scripts/configure-all-routes.js --network pulsechain

🌐 CONFIGURE ALL ROUTES (Cluster Topology)
═══════════════════════════════════════════════════════
📍 Network: pulsechain (Chain ID: 369)
👤 Signer: 0x05F8cC8753D90d67DBB8c02118440b8283F941c9
🎯 Token: HOA

📍 Current Contract: 0x7c3b2630CDe38276bC0a0EF490fC682081929eE0
   Type: collateral
   MessageV3: 0xba01F2bA548e69bA26Fd06a3bdf1A7857eeAC435
   Wrapped Gas Token: 0xA1077a294dDE1B09bB078844df40758a5D0f9a27

🌐 Remote Chains to Configure (1 total):
   - Chain 8453 (Base): 0x5E9289A6f2aFFc928c6912864e99b00C75f3e24B [synthetic]

[STEP 1/2] Configuring MessageClient...
═══════════════════════════════════════════════════════
   MessageV3: 0xba01F2bA548e69bA26Fd06a3bdf1A7857eeAC435
   Remote Chains: [8453]
   Confirmations: 15
   TX: 0xbc53061f194bee21ec81d820e37fe577ddcf2d349e4d3d6f0d33ae22de70749b
   ✅ MessageClient configured!

[STEP 2/2] Configuring Remote Chains...
═══════════════════════════════════════════════════════

   🌐 Chain 8453 (Base):
      Remote Contract: 0x5E9289A6f2aFFc928c6912864e99b00C75f3e24B
      Wrapped Gas Token: 0xA1077a294dDE1B09bB078844df40758a5D0f9a27
      Protocol Fee: 0.12 USDC
      VIA Source Fee: 0.25 USDC
      TX: 0x4e7fc1a36bfd15a55aec463e2e8a7af42e59eea473177f40c54053c581302e28
      ✅ Configured!

[VERIFICATION] Checking Configuration...
═══════════════════════════════════════════════════════
   Chain 8453: Configured ❌

✅ ALL ROUTES CONFIGURED FOR HOA ON PULSECHAIN!
═══════════════════════════════════════════════════════
   📋 Configured 1 remote chains.

   📋 Next Steps:
   Run this script on ALL other chains with HOA deployments:
      npx hardhat run scripts/audited-scripts/configure-all-routes.js --network base HOA
_______________________________________________________________________________

npx hardhat run scripts/audited-scripts/configure-message-client.js --network base

🔧 CONFIGURING MESSAGE CLIENT
═══════════════════════════════════════════════════════
📍 Network: base (Chain ID: 8453)
👤 Signer: 0x05F8cC8753D90d67DBB8c02118440b8283F941c9
🎯 Token: HOA

📍 Current Contract: 0x5E9289A6f2aFFc928c6912864e99b00C75f3e24B
   Type: synthetic
   MessageV3: 0xe3b3274bb685F37C7f17a604039c77a6A16Cfc2a

🌐 Remote Deployments Found:
   - Chain 369 (PulseChain): 0x7c3b2630CDe38276bC0a0EF490fC682081929eE0

⚙️  Configuration Parameters:
   MessageV3: 0xe3b3274bb685F37C7f17a604039c77a6A16Cfc2a
   Remote Chains: [369]
   Confirmations: 15 per chain

⏳ Configuring MessageClient...
   TX Sent: 0xb7024b7523307893d17dc5048efc0cc306df94810a389353584a663342027f6c
   Waiting for confirmation...
   ✅ MessageClient configured! Block: 40719535

📋 Next Steps:
   1. Run this script on ALL other chains with HOA deployments
   2. Run configure-chain.js to set up fees and chain support

✅ MessageClient configuration complete for base!

npx hardhat run scr
ipts/audited-scripts/configure-message-client.
js --network base

🔧 CONFIGURING MESSAGE CLIENT
═══════════════════════════════════════════════════════
📍 Network: base (Chain ID: 8453)
👤 Signer: 0x05F8cC8753D90d67DBB8c02118440b8283F941c9
🎯 Token: HOA

📍 Current Contract: 0x5E9289A6f2aFFc928c6912864e99b00C75f3e24B
   Type: synthetic
   MessageV3: 0xe3b3274bb685F37C7f17a604039c77a6A16Cfc2a

🌐 Remote Deployments Found:
   - Chain 369 (PulseChain): 0x7c3b2630CDe38276bC0a0EF490fC682081929eE0

⚙️  Configuration Parameters:
   MessageV3: 0xe3b3274bb685F37C7f17a604039c77a6A16Cfc2a
   Remote Chains: [369]
   Confirmations: 15 per chain

⏳ Configuring MessageClient...
   TX Sent: 0xb7024b7523307893d17dc5048efc0cc306df94810a389353584a663342027f6c
   Waiting for confirmation...
   ✅ MessageClient configured! Block: 40719535

📋 Next Steps:
   1. Run this script on ALL other chains with HOA deployments
   2. Run configure-chain.js to set up fees and chain support

✅ MessageClient configuration complete for base!
ganadhish@Ganadhishs-MacBook-Air multi-chain-with-via % 
TOKEN_SYMBOL=HOA DEST_CHAIN=pulsechain npx hardhat run scripts/audited-scripts/configure-chain.js --network base

🔧 CONFIGURING DESTINATION CHAIN
═══════════════════════════════════════════════════════
📍 Current Network: base (Chain ID: 8453)
👤 Signer: 0x05F8cC8753D90d67DBB8c02118440b8283F941c9
🎯 Token: HOA
🌐 Destination Chain: pulsechain

📍 Current Contract: 0x5E9289A6f2aFFc928c6912864e99b00C75f3e24B
   Type: synthetic

🌐 Destination Contract: 0x7c3b2630CDe38276bC0a0EF490fC682081929eE0
   Chain ID: 369
   Type: collateral

⚙️  Configuration Parameters:
   Remote Contract: 0x7c3b2630CDe38276bC0a0EF490fC682081929eE0
   Wrapped Gas Token: 0x4200000000000000000000000000000000000006
   Protocol Fee: 0.12 USDC
   VIA Source Fee: 0.25 USDC
   Supported: true
   Authorize Minter: true

⏳ Configuring chain 369...
   TX Sent: 0xcf07425d5eade14a82831b18c939d8b6204bee5cef48fbfafd85984aaa5b58b4
   Waiting for confirmation...
   ✅ Chain 369 configured! Block: 40719554

🔍 Verifying configuration...
   Chain 369 configured: ❌
   Minter authorized: ✅ (Expected: true)
   Protocol Fee: 0.12 USDC
   VIA Source Fee: 0.25 USDC

📋 Next Steps:
   1. Run this script on the destination chain (pulsechain) pointing back here
   2. Test bridging with bridge-to-destination.js

✅ Chain configuration complete!

_________________________________________________________________________________________________
_________________________________________________________________________________________________

13/01/26

 npx hardhat run scripts/audited-scripts/deploy-collateral.js --network pulsechain
Compiled 2 Solidity files successfully (evm target: london).

🚀 DEPLOYING ViaCollateralBridgeV6
═══════════════════════════════════════════════════════
📍 Network: pulsechain (Chain ID: 369)
👤 Deployer: 0x05F8cC8753D90d67DBB8c02118440b8283F941c9
🎯 Token: HOA

📋 Deployment Parameters:
   Collateral Token: 0x7901a3569679AEc3501dbeC59399F327854a70fe
   Fee Token (USDC): 0x15D38573d2feeb82e7ad5187aB8c1D52810B1f07
   Wrapped Gas Token: 0xA1077a294dDE1B09bB078844df40758a5D0f9a27
   MessageV3: 0xba01F2bA548e69bA26Fd06a3bdf1A7857eeAC435
   Treasury: 0x02E6B1C1E78A7C71798262ef34386182C553bA8C
   Owner: 0x05F8cC8753D90d67DBB8c02118440b8283F941c9

⏳ Deploying contract...

✅ ViaCollateralBridgeV6 deployed!
   Address: 0x3Aef79E7455843A33E4c46D5Cf283A809BF50970
   Token: HOA (Hex Orange Address)
💾 Deployment saved: HOA on pulsechain -> 0x3Aef79E7455843A33E4c46D5Cf283A809BF50970

📋 Next Steps:
   1. Deploy ViaSyntheticBridgeV3 on destination chains
   2. Run configure-message-client.js on this and all destination chains
   3. Run configure-chain.js to set up cross-chain routing

🔗 Contract: 0x3Aef79E7455843A33E4c46D5Cf283A809BF50970
Ganadhishs-MacBook-Air:multi-chain-with-via ganadhish$ npx hardhat run scripts/audited-scripts/deploy-synthetic.js --network base

🚀 DEPLOYING ViaSyntheticBridgeV6
═══════════════════════════════════════════════════════
📍 Network: base (Chain ID: 8453)
👤 Deployer: 0x05F8cC8753D90d67DBB8c02118440b8283F941c9
🎯 Token: HOA

📋 Deployment Parameters:
   Synthetic Name: Hex Orange Address
   Synthetic Symbol: HOA
   Fee Token (USDC): 0x833589fCD6eDb6E08f4c7C32D4f71b54bdA02913
   Wrapped Gas Token: 0x4200000000000000000000000000000000000006
   MessageV3: 0xe3b3274bb685F37C7f17a604039c77a6A16Cfc2a
   Treasury: 0x02E6B1C1E78A7C71798262ef34386182C553bA8C
   Owner: 0x05F8cC8753D90d67DBB8c02118440b8283F941c9

⏳ Deploying contract...

✅ ViaSyntheticBridgeV6 deployed!
   Address: 0xae72a52f4A6B36d65cC971dF9FdEFfa07ab5Db5E
   Token: HOA (Hex Orange Address)
💾 Deployment saved: HOA on base -> 0xae72a52f4A6B36d65cC971dF9FdEFfa07ab5Db5E

📋 Next Steps:
   1. Deploy on other destination chains if needed
   2. Run configure-message-client.js on this chain
   3. Run configure-chain.js to set up cross-chain routing

🔗 Contract: 0xae72a52f4A6B36d65cC971dF9FdEFfa07ab5Db5E

_____________________________________________
_________________________________________

npx hardhat run scripts/audited-scripts/configure-all-routes.js --network base

🌐 CONFIGURE ALL ROUTES (Cluster Topology)
═══════════════════════════════════════════════════════
📍 Network: base (Chain ID: 8453)
👤 Signer: 0x05F8cC8753D90d67DBB8c02118440b8283F941c9
🎯 Token: HOA

📍 Current Contract: 0xae72a52f4A6B36d65cC971dF9FdEFfa07ab5Db5E
   Type: synthetic
   MessageV3: 0xe3b3274bb685F37C7f17a604039c77a6A16Cfc2a

🌐 Remote Chains to Configure (1 total):
   - Chain 369 (PulseChain): 0x3Aef79E7455843A33E4c46D5Cf283A809BF50970 [collateral]

[STEP 1/2] Configuring MessageClient...
═══════════════════════════════════════════════════════
   MessageV3: 0xe3b3274bb685F37C7f17a604039c77a6A16Cfc2a
   Remote Chains: [369]
   Confirmations: 15
   Using Nonce: 415
   TX: 0x40451e442e2b0ab1b180a1b4bfdc29d1c691e9255439433dcc0cc2b98c9110c2
   ✅ MessageClient configured!

[STEP 2/2] Configuring Remote Chains...
═══════════════════════════════════════════════════════

   🌐 Chain 369 (PulseChain):
      Remote Contract: 0x3Aef79E7455843A33E4c46D5Cf283A809BF50970
      Protocol Fee: 0.12 USDC
      VIA Source Fee: 0.25 USDC
      Authorize Minter: true
      Using Nonce: 415
      ❌ Failed: nonce too low: next nonce 416, tx nonce 415

[VERIFICATION] Checking Configuration...
═══════════════════════════════════════════════════════
   Chain 369: Configured ❌ | Minter ❌

✅ ALL ROUTES CONFIGURED FOR HOA ON BASE!
═══════════════════════════════════════════════════════
   📋 Configured 1 remote chains.

   📋 Next Steps:
   Run this script on ALL other chains with HOA deployments:
      npx hardhat run scripts/audited-scripts/configure-all-routes.js --network pulsechain HOA
Ganadhishs-MacBook-Air:multi-chain-with-via ganadhish$ npx hardhat run scripts/audited-scripts/configure-message-client.js --network base

🔧 CONFIGURING MESSAGE CLIENT
═══════════════════════════════════════════════════════
📍 Network: base (Chain ID: 8453)
👤 Signer: 0x05F8cC8753D90d67DBB8c02118440b8283F941c9
🎯 Token: HOA

📍 Current Contract: 0xae72a52f4A6B36d65cC971dF9FdEFfa07ab5Db5E
   Type: synthetic
   MessageV3: 0xe3b3274bb685F37C7f17a604039c77a6A16Cfc2a

🌐 Remote Deployments Found:
   - Chain 369 (PulseChain): 0x3Aef79E7455843A33E4c46D5Cf283A809BF50970

⚙️  Configuration Parameters:
   MessageV3: 0xe3b3274bb685F37C7f17a604039c77a6A16Cfc2a
   Remote Chains: [369]
   Confirmations: 15 per chain

⏳ Configuring MessageClient...
   TX Sent: 0x6c836d3e5892b861d8d390e446ca3e5635a40aea43d12e597886046bcf55689c
   Waiting for confirmation...
   ✅ MessageClient configured! Block: 40763557

📋 Next Steps:
   1. Run this script on ALL other chains with HOA deployments
   2. Run configure-chain.js to set up fees and chain support

✅ MessageClient configuration complete for base!
Ganadhishs-MacBook-Air:multi-chain-with-via ganadhish$ npx hardhat run scripts/audited-scripts/configure-chain.js --network base
❌ Usage: npx hardhat run configure-chain.js --network <network> <TOKEN_SYMBOL> <DEST_CHAIN>
   Example: npx hardhat run configure-chain.js --network pulsechain WPLS base
   Available chains: pulsechain, bnb, arbitrum, base, optimism, polygon, avalanche, pulsechain_testnet, base_sepolia
Ganadhishs-MacBook-Air:multi-chain-with-via ganadhish$ TOKEN_SYMBOL=HOA DEST_CHAIN=pulsechain npx hardhat run scripts/audited-scripts/configure-chain.js --network base

🔧 CONFIGURING DESTINATION CHAIN
═══════════════════════════════════════════════════════
📍 Current Network: base (Chain ID: 8453)
👤 Signer: 0x05F8cC8753D90d67DBB8c02118440b8283F941c9
🎯 Token: HOA
🌐 Destination Chain: pulsechain

📍 Current Contract: 0xae72a52f4A6B36d65cC971dF9FdEFfa07ab5Db5E
   Type: synthetic

🌐 Destination Contract: 0x3Aef79E7455843A33E4c46D5Cf283A809BF50970
   Chain ID: 369
   Type: collateral

⚙️  Configuration Parameters:
   Remote Contract: 0x3Aef79E7455843A33E4c46D5Cf283A809BF50970
   Protocol Fee: 0.12 USDC
   VIA Source Fee: 0.25 USDC
   Supported: true
   Authorize Minter: true

⏳ Configuring chain 369...
   TX Sent: 0x71d1366268e9ae7c74e99b69001e0db503156f1fa14b3d930b134d3c62e3cdf3
   Waiting for confirmation...
   ✅ Chain 369 configured! Block: 40763608

🔍 Verifying configuration...
   Chain 369 configured: ❌
   Minter authorized: ❌ (Expected: true)
   Protocol Fee: 0.12 USDC
   VIA Source Fee: 0.25 USDC

📋 Next Steps:
   1. Run this script on the destination chain (pulsechain) pointing back here
   2. Test bridging with bridge-to-destination.js

✅ Chain configuration complete!