npx hardhat run scripts/pre-audit-scripts/deploy-collateral.js --network pulsechain   
Compiled 2 Solidity files successfully (evm target: london).

🚀 DEPLOYING ViaCollateralBridge (Pre-Audit)
═══════════════════════════════════════════════════════
📍 Network: pulsechain (Chain ID: 369)
👤 Deployer: 0x05F8cC8753D90d67DBB8c02118440b8283F941c9
🎯 Token: HOA

📋 Deployment Parameters:
   Collateral Token: 0x7901a3569679AEc3501dbeC59399F327854a70fe
   Fee Token (USDC): 0x15D38573d2feeb82e7ad5187aB8c1D52810B1f07
   MessageV3: 0xba01F2bA548e69bA26Fd06a3bdf1A7857eeAC435
   Treasury: 0x02E6B1C1E78A7C71798262ef34386182C553bA8C
   Owner: 0x05F8cC8753D90d67DBB8c02118440b8283F941c9

⏳ Deploying contract...

✅ ViaCollateralBridge (Pre-Audit) deployed!
   Address: 0xc7dA00db476E18231079Fbf61D67930314EA5b26
   Token: HOA (Hex Orange Address)
💾 Deployment saved: HOA on pulsechain -> 0xc7dA00db476E18231079Fbf61D67930314EA5b26

📋 Next Steps:
   1. Deploy ViaSyntheticBridge on destination chains
   2. Run configure-all-routes.js to set up cross-chain routing
      (This will configure MessageClient AND chain settings including wrappedGasToken)

🔗 Contract: 0xc7dA00db476E18231079Fbf61D67930314EA5b26
ganadhish@Ganadhishs-MacBook-Air multi-chain-with-via % npx hardhat run scripts/pre-audit-scripts/deploy-synthetic.js --network base

🚀 DEPLOYING ViaSyntheticBridge (Pre-Audit)
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
   Owner: 0x05F8cC8753D90d67DBB8c02118440b8283F941c9

⏳ Deploying contract...

✅ ViaSyntheticBridge (Pre-Audit) deployed!
   Address: 0x421b1c25b5Cd1766Aa17d01133a548C28D00b726
   Token: HOA (Hex Orange Address)
💾 Deployment saved: HOA on base -> 0x421b1c25b5Cd1766Aa17d01133a548C28D00b726

📋 Next Steps:
   1. Deploy on other destination chains if needed
   2. Run configure-all-routes.js to set up cross-chain routing

🔗 Contract: 0x421b1c25b5Cd1766Aa17d01133a548C28D00b726

________________________________________________________________________________________________

npx hardhat run scripts/pre-audit-scripts/configure-all-routes.js --network pulsechain

🌐 CONFIGURE ALL ROUTES (Pre-Audit Contracts)
═══════════════════════════════════════════════════════
📍 Network: pulsechain (Chain ID: 369)
👤 Signer: 0x05F8cC8753D90d67DBB8c02118440b8283F941c9
🎯 Token: HOA

📍 Current Contract: 0xc7dA00db476E18231079Fbf61D67930314EA5b26
   Type: collateral
   MessageV3: 0xba01F2bA548e69bA26Fd06a3bdf1A7857eeAC435
   Wrapped Gas Token: 0xA1077a294dDE1B09bB078844df40758a5D0f9a27

🌐 Remote Chains to Configure (1 total):
   - Chain 8453 (Base): 0x421b1c25b5Cd1766Aa17d01133a548C28D00b726 [synthetic]

[STEP 1/2] Configuring MessageClient...
═══════════════════════════════════════════════════════
   MessageV3: 0xba01F2bA548e69bA26Fd06a3bdf1A7857eeAC435
   Remote Chains: [8453]
   Confirmations: 15
   Using Nonce: 674
   TX: 0x404038dbecd1e6a47ad3150bf26b106a9b697f4714f412157f1950f4e1b13319
   ✅ MessageClient configured!

[STEP 2/2] Configuring Remote Chains...
═══════════════════════════════════════════════════════

   🌐 Chain 8453 (Base):
      Remote Contract: 0x421b1c25b5Cd1766Aa17d01133a548C28D00b726
      Wrapped Gas Token: 0xA1077a294dDE1B09bB078844df40758a5D0f9a27
      Protocol Fee: 0.12 USDC
      VIA Source Fee: 0.25 USDC
      VIA Dest Gas: 500000000000000 wei
      Using Nonce: 675
      TX: 0x5604616311d081aaabe3b58ece815cfdf383ba38bfd205af83fde04290218bd5
      ✅ Configured!

[VERIFICATION] Checking Configuration...
═══════════════════════════════════════════════════════
   Chain 8453: Configured ✅

✅ ALL ROUTES CONFIGURED FOR HOA ON PULSECHAIN!
═══════════════════════════════════════════════════════
   📋 Configured 1 remote chains.

   📋 Next Steps:
   Run this script on ALL other chains with HOA deployments:
      npx hardhat run scripts/pre-audit-scripts/configure-all-routes.js --network base HOA
ganadhish@Ganadhishs-MacBook-Air multi-chain-with-via % npx hardhat run scripts/pre-audit-scripts/configure-all-routes.js --network base

🌐 CONFIGURE ALL ROUTES (Pre-Audit Contracts)
═══════════════════════════════════════════════════════
📍 Network: base (Chain ID: 8453)
👤 Signer: 0x05F8cC8753D90d67DBB8c02118440b8283F941c9
🎯 Token: HOA

📍 Current Contract: 0x421b1c25b5Cd1766Aa17d01133a548C28D00b726
   Type: synthetic
   MessageV3: 0xe3b3274bb685F37C7f17a604039c77a6A16Cfc2a
   Wrapped Gas Token: 0x4200000000000000000000000000000000000006

🌐 Remote Chains to Configure (1 total):
   - Chain 369 (PulseChain): 0xc7dA00db476E18231079Fbf61D67930314EA5b26 [collateral]

[STEP 1/2] Configuring MessageClient...
═══════════════════════════════════════════════════════
   MessageV3: 0xe3b3274bb685F37C7f17a604039c77a6A16Cfc2a
   Remote Chains: [369]
   Confirmations: 15
   Using Nonce: 426
   TX: 0x8f197a3cfbbd86b0ab6241bb04a330cd6a5ef281fdf2ec343d2deaf6a95ce28c
   ✅ MessageClient configured!

[STEP 2/2] Configuring Remote Chains...
═══════════════════════════════════════════════════════

   🌐 Chain 369 (PulseChain):
      Remote Contract: 0xc7dA00db476E18231079Fbf61D67930314EA5b26
      Wrapped Gas Token: 0x4200000000000000000000000000000000000006
      Protocol Fee: 0.12 USDC
      VIA Source Fee: 0.25 USDC
      VIA Dest Gas: 80000000000000000000 wei
      Authorize Minter: true
      Using Nonce: 427
      TX: 0xb77bc3725e18549a99c95e1edc34126e18760156a4a3276ff2a08dad230f10ed
      ✅ Configured!

[VERIFICATION] Checking Configuration...
═══════════════════════════════════════════════════════
   Chain 369: Configured ✅ | Minter ✅

✅ ALL ROUTES CONFIGURED FOR HOA ON BASE!
═══════════════════════════════════════════════════════
   📋 Configured 1 remote chains.

   📋 Next Steps:
   Run this script on ALL other chains with HOA deployments:
      npx hardhat run scripts/pre-audit-scripts/configure-all-routes.js --network pulsechain HOA

________________________________________________________________________________________________

_______________________
**ALL SYNTHETIC CHAINS |
_______________________

npx hardhat run scripts/pre-audit-scripts/deploy-synthetic.js --network arbitrum

🚀 DEPLOYING ViaSyntheticBridge (Pre-Audit)
═══════════════════════════════════════════════════════
📍 Network: arbitrum (Chain ID: 42161)
👤 Deployer: 0x05F8cC8753D90d67DBB8c02118440b8283F941c9
🎯 Token: HOA

📋 Deployment Parameters:
   Synthetic Name: Hex Orange Address
   Synthetic Symbol: HOA
   Fee Token (USDC): 0xaf88d065e77c8cC2239327C5EDb3A432268e5831
   MessageV3: 0x65EEc58ef38882422E887B82f7085e9a9C35dCA1
   Treasury: 0x02E6B1C1E78A7C71798262ef34386182C553bA8C
   Owner: 0x05F8cC8753D90d67DBB8c02118440b8283F941c9

⏳ Deploying contract...

✅ ViaSyntheticBridge (Pre-Audit) deployed!
   Address: 0x1F031F7A2652fD6f10F1FB37BEfaac8A69039f08
   Token: HOA (Hex Orange Address)
💾 Deployment saved: HOA on arbitrum -> 0x1F031F7A2652fD6f10F1FB37BEfaac8A69039f08

📋 Next Steps:
   1. Deploy on other destination chains if needed
   2. Run configure-all-routes.js to set up cross-chain routing

🔗 Contract: 0x1F031F7A2652fD6f10F1FB37BEfaac8A69039f08
ganadhish@Ganadhishs-MacBook-Air multi-chain-with-via % npx hardhat run scripts/pre-audit-scripts/deploy-synthetic.js --network optimism

🚀 DEPLOYING ViaSyntheticBridge (Pre-Audit)
═══════════════════════════════════════════════════════
📍 Network: optimism (Chain ID: 10)
👤 Deployer: 0x05F8cC8753D90d67DBB8c02118440b8283F941c9
🎯 Token: HOA

📋 Deployment Parameters:
   Synthetic Name: Hex Orange Address
   Synthetic Symbol: HOA
   Fee Token (USDC): 0x0b2C639c533813f4Aa9D7837CAf62653d097Ff85
   MessageV3: 0x15AC559DA4951c796DB6620fAb286B96840D039A
   Treasury: 0x02E6B1C1E78A7C71798262ef34386182C553bA8C
   Owner: 0x05F8cC8753D90d67DBB8c02118440b8283F941c9

⏳ Deploying contract...

✅ ViaSyntheticBridge (Pre-Audit) deployed!
   Address: 0x0AD73370Ca2e1b7667B568d20f25eF0864227bFC
   Token: HOA (Hex Orange Address)
💾 Deployment saved: HOA on optimism -> 0x0AD73370Ca2e1b7667B568d20f25eF0864227bFC

📋 Next Steps:
   1. Deploy on other destination chains if needed
   2. Run configure-all-routes.js to set up cross-chain routing

🔗 Contract: 0x0AD73370Ca2e1b7667B568d20f25eF0864227bFC
ganadhish@Ganadhishs-MacBook-Air multi-chain-with-via % npx hardhat run scripts/pre-audit-scripts/deploy-synthetic.js --network bnb 

🚀 DEPLOYING ViaSyntheticBridge (Pre-Audit)
═══════════════════════════════════════════════════════
📍 Network: bnb (Chain ID: 56)
👤 Deployer: 0x05F8cC8753D90d67DBB8c02118440b8283F941c9
🎯 Token: HOA

📋 Deployment Parameters:
   Synthetic Name: Hex Orange Address
   Synthetic Symbol: HOA
   Fee Token (USDC): 0x8AC76a51cc950d9822D68b83fE1Ad97B32Cd580d
   MessageV3: 0x7b67dF6728E294db2eb173ac7c738a4627Ae5e11
   Treasury: 0x02E6B1C1E78A7C71798262ef34386182C553bA8C
   Owner: 0x05F8cC8753D90d67DBB8c02118440b8283F941c9

⏳ Deploying contract...

✅ ViaSyntheticBridge (Pre-Audit) deployed!
   Address: 0xc1Bb27E7AE8af9164Cb6B5D3A465478415EdEbB7
   Token: HOA (Hex Orange Address)
💾 Deployment saved: HOA on bnb -> 0xc1Bb27E7AE8af9164Cb6B5D3A465478415EdEbB7

📋 Next Steps:
   1. Deploy on other destination chains if needed
   2. Run configure-all-routes.js to set up cross-chain routing

🔗 Contract: 0xc1Bb27E7AE8af9164Cb6B5D3A465478415EdEbB7
ganadhish@Ganadhishs-MacBook-Air multi-chain-with-via % npx hardhat run scripts/pre-audit-scripts/deploy-synthetic.js --network pol
ygon 

🚀 DEPLOYING ViaSyntheticBridge (Pre-Audit)
═══════════════════════════════════════════════════════
📍 Network: polygon (Chain ID: 137)
👤 Deployer: 0x05F8cC8753D90d67DBB8c02118440b8283F941c9
🎯 Token: HOA

📋 Deployment Parameters:
   Synthetic Name: Hex Orange Address
   Synthetic Symbol: HOA
   Fee Token (USDC): 0x3c499c542cEF5E3811e1192ce70d8cC03d5c3359
   MessageV3: 0x1C5800eb5fECB7760D7F1978ad744feA652a7b27
   Treasury: 0x02E6B1C1E78A7C71798262ef34386182C553bA8C
   Owner: 0x05F8cC8753D90d67DBB8c02118440b8283F941c9

⏳ Deploying contract...

✅ ViaSyntheticBridge (Pre-Audit) deployed!
   Address: 0x6B7c81207240a38e03E5e9B138C53c4762515cCD
   Token: HOA (Hex Orange Address)
💾 Deployment saved: HOA on polygon -> 0x6B7c81207240a38e03E5e9B138C53c4762515cCD

📋 Next Steps:
   1. Deploy on other destination chains if needed
   2. Run configure-all-routes.js to set up cross-chain routing

🔗 Contract: 0x6B7c81207240a38e03E5e9B138C53c4762515cCD

________________________________________________________________________________________________

_______________________
**ALL SYNTHETIC CHAINS FOR COCK |
_______________________

npx hardhat run scripts/pre-audit-scripts/deploy-synthetic.js --network base

🚀 DEPLOYING ViaSyntheticBridge (Pre-Audit)
═══════════════════════════════════════════════════════
📍 Network: base (Chain ID: 8453)
👤 Deployer: 0x05F8cC8753D90d67DBB8c02118440b8283F941c9
🎯 Token: COCK

📋 Deployment Parameters:
   Synthetic Name: The Rise Of Cock
   Synthetic Symbol: COCK
   Fee Token (USDC): 0x833589fCD6eDb6E08f4c7C32D4f71b54bdA02913
   MessageV3: 0xe3b3274bb685F37C7f17a604039c77a6A16Cfc2a
   Treasury: 0x02E6B1C1E78A7C71798262ef34386182C553bA8C
   Owner: 0x05F8cC8753D90d67DBB8c02118440b8283F941c9

⏳ Deploying contract...

✅ ViaSyntheticBridge (Pre-Audit) deployed!
   Address: 0xE78C3473B59156416994b57bC261a51fFbEee4FA
   Token: COCK (The Rise Of Cock)
💾 Deployment saved: COCK on base -> 0xE78C3473B59156416994b57bC261a51fFbEee4FA

📋 Next Steps:
   1. Deploy on other destination chains if needed
   2. Run configure-all-routes.js to set up cross-chain routing

🔗 Contract: 0xE78C3473B59156416994b57bC261a51fFbEee4FA
ganadhish@Ganadhishs-MacBook-Air multi-chain-with-via % npx hardhat run scripts/pre-audit-scripts/deploy-synthetic.js --network arbitrum

🚀 DEPLOYING ViaSyntheticBridge (Pre-Audit)
═══════════════════════════════════════════════════════
📍 Network: arbitrum (Chain ID: 42161)
👤 Deployer: 0x05F8cC8753D90d67DBB8c02118440b8283F941c9
🎯 Token: COCK

📋 Deployment Parameters:
   Synthetic Name: The Rise Of Cock
   Synthetic Symbol: COCK
   Fee Token (USDC): 0xaf88d065e77c8cC2239327C5EDb3A432268e5831
   MessageV3: 0x65EEc58ef38882422E887B82f7085e9a9C35dCA1
   Treasury: 0x02E6B1C1E78A7C71798262ef34386182C553bA8C
   Owner: 0x05F8cC8753D90d67DBB8c02118440b8283F941c9

⏳ Deploying contract...

✅ ViaSyntheticBridge (Pre-Audit) deployed!
   Address: 0x33dD4fEE8555263178a7ffD8bf7522BA2E6C33a3
   Token: COCK (The Rise Of Cock)
💾 Deployment saved: COCK on arbitrum -> 0x33dD4fEE8555263178a7ffD8bf7522BA2E6C33a3

📋 Next Steps:
   1. Deploy on other destination chains if needed
   2. Run configure-all-routes.js to set up cross-chain routing

🔗 Contract: 0x33dD4fEE8555263178a7ffD8bf7522BA2E6C33a3
ganadhish@Ganadhishs-MacBook-Air multi-chain-with-via % npx hardhat run scripts/pre-audit-scripts/deploy-synthetic.js --network optimism

🚀 DEPLOYING ViaSyntheticBridge (Pre-Audit)
═══════════════════════════════════════════════════════
📍 Network: optimism (Chain ID: 10)
👤 Deployer: 0x05F8cC8753D90d67DBB8c02118440b8283F941c9
🎯 Token: COCK

📋 Deployment Parameters:
   Synthetic Name: The Rise Of Cock
   Synthetic Symbol: COCK
   Fee Token (USDC): 0x0b2C639c533813f4Aa9D7837CAf62653d097Ff85
   MessageV3: 0x15AC559DA4951c796DB6620fAb286B96840D039A
   Treasury: 0x02E6B1C1E78A7C71798262ef34386182C553bA8C
   Owner: 0x05F8cC8753D90d67DBB8c02118440b8283F941c9

⏳ Deploying contract...

✅ ViaSyntheticBridge (Pre-Audit) deployed!
   Address: 0xb50Dd86bB594C3d7FBA44045F4a90f8eb12B5935
   Token: COCK (The Rise Of Cock)
💾 Deployment saved: COCK on optimism -> 0xb50Dd86bB594C3d7FBA44045F4a90f8eb12B5935

📋 Next Steps:
   1. Deploy on other destination chains if needed
   2. Run configure-all-routes.js to set up cross-chain routing

🔗 Contract: 0xb50Dd86bB594C3d7FBA44045F4a90f8eb12B5935
ganadhish@Ganadhishs-MacBook-Air multi-chain-with-via % npx hardhat run scripts/pre-audit-scripts/deploy-synthetic.js --network bnb    

🚀 DEPLOYING ViaSyntheticBridge (Pre-Audit)
═══════════════════════════════════════════════════════
📍 Network: bnb (Chain ID: 56)
👤 Deployer: 0x05F8cC8753D90d67DBB8c02118440b8283F941c9
🎯 Token: COCK

📋 Deployment Parameters:
   Synthetic Name: The Rise Of Cock
   Synthetic Symbol: COCK
   Fee Token (USDC): 0x8AC76a51cc950d9822D68b83fE1Ad97B32Cd580d
   MessageV3: 0x7b67dF6728E294db2eb173ac7c738a4627Ae5e11
   Treasury: 0x02E6B1C1E78A7C71798262ef34386182C553bA8C
   Owner: 0x05F8cC8753D90d67DBB8c02118440b8283F941c9

⏳ Deploying contract...

✅ ViaSyntheticBridge (Pre-Audit) deployed!
   Address: 0xce032ac88ad11E6f8374B3760F5a98a77c6584f0
   Token: COCK (The Rise Of Cock)
💾 Deployment saved: COCK on bnb -> 0xce032ac88ad11E6f8374B3760F5a98a77c6584f0

📋 Next Steps:
   1. Deploy on other destination chains if needed
   2. Run configure-all-routes.js to set up cross-chain routing

🔗 Contract: 0xce032ac88ad11E6f8374B3760F5a98a77c6584f0
ganadhish@Ganadhishs-MacBook-Air multi-chain-with-via % npx hardhat run scripts/pre-audit-scripts/deploy-synthetic.js --network polygon

🚀 DEPLOYING ViaSyntheticBridge (Pre-Audit)
═══════════════════════════════════════════════════════
📍 Network: polygon (Chain ID: 137)
👤 Deployer: 0x05F8cC8753D90d67DBB8c02118440b8283F941c9
🎯 Token: COCK

📋 Deployment Parameters:
   Synthetic Name: The Rise Of Cock
   Synthetic Symbol: COCK
   Fee Token (USDC): 0x3c499c542cEF5E3811e1192ce70d8cC03d5c3359
   MessageV3: 0x1C5800eb5fECB7760D7F1978ad744feA652a7b27
   Treasury: 0x02E6B1C1E78A7C71798262ef34386182C553bA8C
   Owner: 0x05F8cC8753D90d67DBB8c02118440b8283F941c9

⏳ Deploying contract...

✅ ViaSyntheticBridge (Pre-Audit) deployed!
   Address: 0xd7dDc57fC9eCFd0fb9E0773Eb80276fe62B0Fc93
   Token: COCK (The Rise Of Cock)
💾 Deployment saved: COCK on polygon -> 0xd7dDc57fC9eCFd0fb9E0773Eb80276fe62B0Fc93

📋 Next Steps:
   1. Deploy on other destination chains if needed
   2. Run configure-all-routes.js to set up cross-chain routing

🔗 Contract: 0xd7dDc57fC9eCFd0fb9E0773Eb80276fe62B0Fc93
ganadhish@Ganadhishs-MacBook-Air multi-chain-with-via % npx hardhat run scripts/pre-audit-scripts/deploy-synthetic.js --network avalanche

🚀 DEPLOYING ViaSyntheticBridge (Pre-Audit)
═══════════════════════════════════════════════════════
📍 Network: avalanche (Chain ID: 43114)
👤 Deployer: 0x05F8cC8753D90d67DBB8c02118440b8283F941c9
🎯 Token: COCK

📋 Deployment Parameters:
   Synthetic Name: The Rise Of Cock
   Synthetic Symbol: COCK
   Fee Token (USDC): 0xB97EF9Ef8734C71904D8002F8b6Bc66Dd9c48a6E
   MessageV3: 0x72E052Fa7f0788e668965d37B6c38C88703B7859
   Treasury: 0x02E6B1C1E78A7C71798262ef34386182C553bA8C
   Owner: 0x05F8cC8753D90d67DBB8c02118440b8283F941c9

⏳ Deploying contract...

✅ ViaSyntheticBridge (Pre-Audit) deployed!
   Address: 0x46763657C2e4845C4f72c7Cce605B3cB3309fd2f
   Token: COCK (The Rise Of Cock)
💾 Deployment saved: COCK on avalanche -> 0x46763657C2e4845C4f72c7Cce605B3cB3309fd2f

📋 Next Steps:
   1. Deploy on other destination chains if needed
   2. Run configure-all-routes.js to set up cross-chain routing

🔗 Contract: 0x46763657C2e4845C4f72c7Cce605B3cB3309fd2f

________________________________________________________________________________________________

_______________________
**ALL DEPLOYMENTS CHAINS FOR PLSX |
_______________________

npx hardhat run scripts/pre-audit-scripts/deploy-collateral.js --network pulsechain

🚀 DEPLOYING ViaCollateralBridge (Pre-Audit)
═══════════════════════════════════════════════════════
📍 Network: pulsechain (Chain ID: 369)
👤 Deployer: 0x05F8cC8753D90d67DBB8c02118440b8283F941c9
🎯 Token: PLSX

📋 Deployment Parameters:
   Collateral Token: 0x95B303987A60C71504D99Aa1b13B4DA07b0790ab
   Fee Token (USDC): 0x15D38573d2feeb82e7ad5187aB8c1D52810B1f07
   MessageV3: 0xba01F2bA548e69bA26Fd06a3bdf1A7857eeAC435
   Treasury: 0x02E6B1C1E78A7C71798262ef34386182C553bA8C
   Owner: 0x05F8cC8753D90d67DBB8c02118440b8283F941c9

⏳ Deploying contract...

✅ ViaCollateralBridge (Pre-Audit) deployed!
   Address: 0xDe524350F6421842EE39baC52d69c0Db26DD0479
   Token: PLSX (PulseX)
💾 Deployment saved: PLSX on pulsechain -> 0xDe524350F6421842EE39baC52d69c0Db26DD0479

📋 Next Steps:
   1. Deploy ViaSyntheticBridge on destination chains
   2. Run configure-all-routes.js to set up cross-chain routing
      (This will configure MessageClient AND chain settings including wrappedGasToken)

🔗 Contract: 0xDe524350F6421842EE39baC52d69c0Db26DD0479
ganadhish@Ganadhishs-MacBook-Air multi-chain-with-via % npx hardhat run scripts/pre-audit-scripts/deploy-synthetic.js --network base     

🚀 DEPLOYING ViaSyntheticBridge (Pre-Audit)
═══════════════════════════════════════════════════════
📍 Network: base (Chain ID: 8453)
👤 Deployer: 0x05F8cC8753D90d67DBB8c02118440b8283F941c9
🎯 Token: PLSX

📋 Deployment Parameters:
   Synthetic Name: PulseX
   Synthetic Symbol: PLSX
   Fee Token (USDC): 0x833589fCD6eDb6E08f4c7C32D4f71b54bdA02913
   MessageV3: 0xe3b3274bb685F37C7f17a604039c77a6A16Cfc2a
   Treasury: 0x02E6B1C1E78A7C71798262ef34386182C553bA8C
   Owner: 0x05F8cC8753D90d67DBB8c02118440b8283F941c9

⏳ Deploying contract...

✅ ViaSyntheticBridge (Pre-Audit) deployed!
   Address: 0xF8Ae2Ca61ccAF2e6912d142b797080a3F7439c53
   Token: PLSX (PulseX)
💾 Deployment saved: PLSX on base -> 0xF8Ae2Ca61ccAF2e6912d142b797080a3F7439c53

📋 Next Steps:
   1. Deploy on other destination chains if needed
   2. Run configure-all-routes.js to set up cross-chain routing

🔗 Contract: 0xF8Ae2Ca61ccAF2e6912d142b797080a3F7439c53
ganadhish@Ganadhishs-MacBook-Air multi-chain-with-via % npx hardhat run scripts/pre-audit-scripts/deploy-synthetic.js --network arbitrum   

🚀 DEPLOYING ViaSyntheticBridge (Pre-Audit)
═══════════════════════════════════════════════════════
📍 Network: arbitrum (Chain ID: 42161)
👤 Deployer: 0x05F8cC8753D90d67DBB8c02118440b8283F941c9
🎯 Token: PLSX

📋 Deployment Parameters:
   Synthetic Name: PulseX
   Synthetic Symbol: PLSX
   Fee Token (USDC): 0xaf88d065e77c8cC2239327C5EDb3A432268e5831
   MessageV3: 0x65EEc58ef38882422E887B82f7085e9a9C35dCA1
   Treasury: 0x02E6B1C1E78A7C71798262ef34386182C553bA8C
   Owner: 0x05F8cC8753D90d67DBB8c02118440b8283F941c9

⏳ Deploying contract...

✅ ViaSyntheticBridge (Pre-Audit) deployed!
   Address: 0xB04d0A850813A867f9e858A04fa11A22c58ff846
   Token: PLSX (PulseX)
💾 Deployment saved: PLSX on arbitrum -> 0xB04d0A850813A867f9e858A04fa11A22c58ff846

📋 Next Steps:
   1. Deploy on other destination chains if needed
   2. Run configure-all-routes.js to set up cross-chain routing

🔗 Contract: 0xB04d0A850813A867f9e858A04fa11A22c58ff846
ganadhish@Ganadhishs-MacBook-Air multi-chain-with-via % npx hardhat run scripts/pre-audit-scripts/deploy-synthetic.js --network optimism   

🚀 DEPLOYING ViaSyntheticBridge (Pre-Audit)
═══════════════════════════════════════════════════════
📍 Network: optimism (Chain ID: 10)
👤 Deployer: 0x05F8cC8753D90d67DBB8c02118440b8283F941c9
🎯 Token: PLSX

📋 Deployment Parameters:
   Synthetic Name: PulseX
   Synthetic Symbol: PLSX
   Fee Token (USDC): 0x0b2C639c533813f4Aa9D7837CAf62653d097Ff85
   MessageV3: 0x15AC559DA4951c796DB6620fAb286B96840D039A
   Treasury: 0x02E6B1C1E78A7C71798262ef34386182C553bA8C
   Owner: 0x05F8cC8753D90d67DBB8c02118440b8283F941c9

⏳ Deploying contract...

✅ ViaSyntheticBridge (Pre-Audit) deployed!
   Address: 0xEab30C23A015942BDc8204bD8dcA2780a5957a8c
   Token: PLSX (PulseX)
💾 Deployment saved: PLSX on optimism -> 0xEab30C23A015942BDc8204bD8dcA2780a5957a8c

📋 Next Steps:
   1. Deploy on other destination chains if needed
   2. Run configure-all-routes.js to set up cross-chain routing

🔗 Contract: 0xEab30C23A015942BDc8204bD8dcA2780a5957a8c
ganadhish@Ganadhishs-MacBook-Air multi-chain-with-via % npx hardhat run scripts/pre-audit-scripts/deploy-synthetic.js --network bnb    

🚀 DEPLOYING ViaSyntheticBridge (Pre-Audit)
═══════════════════════════════════════════════════════
📍 Network: bnb (Chain ID: 56)
👤 Deployer: 0x05F8cC8753D90d67DBB8c02118440b8283F941c9
🎯 Token: PLSX

📋 Deployment Parameters:
   Synthetic Name: PulseX
   Synthetic Symbol: PLSX
   Fee Token (USDC): 0x8AC76a51cc950d9822D68b83fE1Ad97B32Cd580d
   MessageV3: 0x7b67dF6728E294db2eb173ac7c738a4627Ae5e11
   Treasury: 0x02E6B1C1E78A7C71798262ef34386182C553bA8C
   Owner: 0x05F8cC8753D90d67DBB8c02118440b8283F941c9

⏳ Deploying contract...

✅ ViaSyntheticBridge (Pre-Audit) deployed!
   Address: 0xC1d9A1f64291CF47e703eab6b27fA0660cAE7324
   Token: PLSX (PulseX)
💾 Deployment saved: PLSX on bnb -> 0xC1d9A1f64291CF47e703eab6b27fA0660cAE7324

📋 Next Steps:
   1. Deploy on other destination chains if needed
   2. Run configure-all-routes.js to set up cross-chain routing

🔗 Contract: 0xC1d9A1f64291CF47e703eab6b27fA0660cAE7324
ganadhish@Ganadhishs-MacBook-Air multi-chain-with-via % npx hardhat run scripts/pre-audit-scripts/deploy-synthetic.js --network polygon    

🚀 DEPLOYING ViaSyntheticBridge (Pre-Audit)
═══════════════════════════════════════════════════════
📍 Network: polygon (Chain ID: 137)
👤 Deployer: 0x05F8cC8753D90d67DBB8c02118440b8283F941c9
🎯 Token: PLSX

📋 Deployment Parameters:
   Synthetic Name: PulseX
   Synthetic Symbol: PLSX
   Fee Token (USDC): 0x3c499c542cEF5E3811e1192ce70d8cC03d5c3359
   MessageV3: 0x1C5800eb5fECB7760D7F1978ad744feA652a7b27
   Treasury: 0x02E6B1C1E78A7C71798262ef34386182C553bA8C
   Owner: 0x05F8cC8753D90d67DBB8c02118440b8283F941c9

⏳ Deploying contract...

✅ ViaSyntheticBridge (Pre-Audit) deployed!
   Address: 0xE18947547EB1f49B725c3Ca4f95bD45A84F6c24A
   Token: PLSX (PulseX)
💾 Deployment saved: PLSX on polygon -> 0xE18947547EB1f49B725c3Ca4f95bD45A84F6c24A

📋 Next Steps:
   1. Deploy on other destination chains if needed
   2. Run configure-all-routes.js to set up cross-chain routing

🔗 Contract: 0xE18947547EB1f49B725c3Ca4f95bD45A84F6c24A
ganadhish@Ganadhishs-MacBook-Air multi-chain-with-via % npx hardhat run scripts/pre-audit-scripts/deploy-synthetic.js --network avalanche  

🚀 DEPLOYING ViaSyntheticBridge (Pre-Audit)
═══════════════════════════════════════════════════════
📍 Network: avalanche (Chain ID: 43114)
👤 Deployer: 0x05F8cC8753D90d67DBB8c02118440b8283F941c9
🎯 Token: PLSX

📋 Deployment Parameters:
   Synthetic Name: PulseX
   Synthetic Symbol: PLSX
   Fee Token (USDC): 0xB97EF9Ef8734C71904D8002F8b6Bc66Dd9c48a6E
   MessageV3: 0x72E052Fa7f0788e668965d37B6c38C88703B7859
   Treasury: 0x02E6B1C1E78A7C71798262ef34386182C553bA8C
   Owner: 0x05F8cC8753D90d67DBB8c02118440b8283F941c9

⏳ Deploying contract...

✅ ViaSyntheticBridge (Pre-Audit) deployed!
   Address: 0x7e39288d48ae017B1dF2f20523a6A1c7C91D96E2
   Token: PLSX (PulseX)
💾 Deployment saved: PLSX on avalanche -> 0x7e39288d48ae017B1dF2f20523a6A1c7C91D96E2

📋 Next Steps:
   1. Deploy on other destination chains if needed
   2. Run configure-all-routes.js to set up cross-chain routing

🔗 Contract: 0x7e39288d48ae017B1dF2f20523a6A1c7C91D96E2

________________________________________________________________________________________________

_______________________
**ALL DEPLOYMENTS CHAINS FOR INC |
_______________________


npx hardhat run scripts/pre-audit-scripts/deploy-collateral.js --network pulsechain

🚀 DEPLOYING ViaCollateralBridge (Pre-Audit)
═══════════════════════════════════════════════════════
📍 Network: pulsechain (Chain ID: 369)
👤 Deployer: 0x05F8cC8753D90d67DBB8c02118440b8283F941c9
🎯 Token: INC

📋 Deployment Parameters:
   Collateral Token: 0x2fa878Ab3F87CC1C9737Fc071108F904c0B0C95d
   Fee Token (USDC): 0x15D38573d2feeb82e7ad5187aB8c1D52810B1f07
   MessageV3: 0xba01F2bA548e69bA26Fd06a3bdf1A7857eeAC435
   Treasury: 0x02E6B1C1E78A7C71798262ef34386182C553bA8C
   Owner: 0x05F8cC8753D90d67DBB8c02118440b8283F941c9

⏳ Deploying contract...

✅ ViaCollateralBridge (Pre-Audit) deployed!
   Address: 0x25f9387AA86a6853C74AD1A14D531d03F8F1619a
   Token: INC (Incentive)
💾 Deployment saved: INC on pulsechain -> 0x25f9387AA86a6853C74AD1A14D531d03F8F1619a

📋 Next Steps:
   1. Deploy ViaSyntheticBridge on destination chains
   2. Run configure-all-routes.js to set up cross-chain routing
      (This will configure MessageClient AND chain settings including wrappedGasToken)

🔗 Contract: 0x25f9387AA86a6853C74AD1A14D531d03F8F1619a
ganadhish@Ganadhishs-MacBook-Air multi-chain-with-via % npx hardhat run scripts/pre-audit-scripts/deploy-synthetic.js --network base       

🚀 DEPLOYING ViaSyntheticBridge (Pre-Audit)
═══════════════════════════════════════════════════════
📍 Network: base (Chain ID: 8453)
👤 Deployer: 0x05F8cC8753D90d67DBB8c02118440b8283F941c9
🎯 Token: INC

📋 Deployment Parameters:
   Synthetic Name: Incentive
   Synthetic Symbol: INC
   Fee Token (USDC): 0x833589fCD6eDb6E08f4c7C32D4f71b54bdA02913
   MessageV3: 0xe3b3274bb685F37C7f17a604039c77a6A16Cfc2a
   Treasury: 0x02E6B1C1E78A7C71798262ef34386182C553bA8C
   Owner: 0x05F8cC8753D90d67DBB8c02118440b8283F941c9

⏳ Deploying contract...

✅ ViaSyntheticBridge (Pre-Audit) deployed!
   Address: 0x02B7f5Fe7459B6482545f0b1979c61BA22F4CCA5
   Token: INC (Incentive)
💾 Deployment saved: INC on base -> 0x02B7f5Fe7459B6482545f0b1979c61BA22F4CCA5

📋 Next Steps:
   1. Deploy on other destination chains if needed
   2. Run configure-all-routes.js to set up cross-chain routing

🔗 Contract: 0x02B7f5Fe7459B6482545f0b1979c61BA22F4CCA5
ganadhish@Ganadhishs-MacBook-Air multi-chain-with-via % npx hardhat run scripts/pre-audit-scripts/deploy-synthetic.js --network arbitrum

🚀 DEPLOYING ViaSyntheticBridge (Pre-Audit)
═══════════════════════════════════════════════════════
📍 Network: arbitrum (Chain ID: 42161)
👤 Deployer: 0x05F8cC8753D90d67DBB8c02118440b8283F941c9
🎯 Token: INC

📋 Deployment Parameters:
   Synthetic Name: Incentive
   Synthetic Symbol: INC
   Fee Token (USDC): 0xaf88d065e77c8cC2239327C5EDb3A432268e5831
   MessageV3: 0x65EEc58ef38882422E887B82f7085e9a9C35dCA1
   Treasury: 0x02E6B1C1E78A7C71798262ef34386182C553bA8C
   Owner: 0x05F8cC8753D90d67DBB8c02118440b8283F941c9

⏳ Deploying contract...

✅ ViaSyntheticBridge (Pre-Audit) deployed!
   Address: 0x808945fc3ab570f67011e2008E56949ee6899267
   Token: INC (Incentive)
💾 Deployment saved: INC on arbitrum -> 0x808945fc3ab570f67011e2008E56949ee6899267

📋 Next Steps:
   1. Deploy on other destination chains if needed
   2. Run configure-all-routes.js to set up cross-chain routing

🔗 Contract: 0x808945fc3ab570f67011e2008E56949ee6899267
ganadhish@Ganadhishs-MacBook-Air multi-chain-with-via % npx hardhat run scripts/pre-audit-scripts/deploy-synthetic.js --network optimism

🚀 DEPLOYING ViaSyntheticBridge (Pre-Audit)
═══════════════════════════════════════════════════════
📍 Network: optimism (Chain ID: 10)
👤 Deployer: 0x05F8cC8753D90d67DBB8c02118440b8283F941c9
🎯 Token: INC

📋 Deployment Parameters:
   Synthetic Name: Incentive
   Synthetic Symbol: INC
   Fee Token (USDC): 0x0b2C639c533813f4Aa9D7837CAf62653d097Ff85
   MessageV3: 0x15AC559DA4951c796DB6620fAb286B96840D039A
   Treasury: 0x02E6B1C1E78A7C71798262ef34386182C553bA8C
   Owner: 0x05F8cC8753D90d67DBB8c02118440b8283F941c9

⏳ Deploying contract...

✅ ViaSyntheticBridge (Pre-Audit) deployed!
   Address: 0x1D135C2711f89e6eb70665BF55942E498835b336
   Token: INC (Incentive)
💾 Deployment saved: INC on optimism -> 0x1D135C2711f89e6eb70665BF55942E498835b336

📋 Next Steps:
   1. Deploy on other destination chains if needed
   2. Run configure-all-routes.js to set up cross-chain routing

🔗 Contract: 0x1D135C2711f89e6eb70665BF55942E498835b336
ganadhish@Ganadhishs-MacBook-Air multi-chain-with-via % npx hardhat run scripts/pre-audit-scripts/deploy-synthetic.js --network bnb    

🚀 DEPLOYING ViaSyntheticBridge (Pre-Audit)
═══════════════════════════════════════════════════════
📍 Network: bnb (Chain ID: 56)
👤 Deployer: 0x05F8cC8753D90d67DBB8c02118440b8283F941c9
🎯 Token: INC

📋 Deployment Parameters:
   Synthetic Name: Incentive
   Synthetic Symbol: INC
   Fee Token (USDC): 0x8AC76a51cc950d9822D68b83fE1Ad97B32Cd580d
   MessageV3: 0x7b67dF6728E294db2eb173ac7c738a4627Ae5e11
   Treasury: 0x02E6B1C1E78A7C71798262ef34386182C553bA8C
   Owner: 0x05F8cC8753D90d67DBB8c02118440b8283F941c9

⏳ Deploying contract...

✅ ViaSyntheticBridge (Pre-Audit) deployed!
   Address: 0x6B7c81207240a38e03E5e9B138C53c4762515cCD
   Token: INC (Incentive)
💾 Deployment saved: INC on bnb -> 0x6B7c81207240a38e03E5e9B138C53c4762515cCD

📋 Next Steps:
   1. Deploy on other destination chains if needed
   2. Run configure-all-routes.js to set up cross-chain routing

🔗 Contract: 0x6B7c81207240a38e03E5e9B138C53c4762515cCD
ganadhish@Ganadhishs-MacBook-Air multi-chain-with-via % npx hardhat run scripts/pre-audit-scripts/deploy-synthetic.js --network polygon

🚀 DEPLOYING ViaSyntheticBridge (Pre-Audit)
═══════════════════════════════════════════════════════
📍 Network: polygon (Chain ID: 137)
👤 Deployer: 0x05F8cC8753D90d67DBB8c02118440b8283F941c9
🎯 Token: INC

📋 Deployment Parameters:
   Synthetic Name: Incentive
   Synthetic Symbol: INC
   Fee Token (USDC): 0x3c499c542cEF5E3811e1192ce70d8cC03d5c3359
   MessageV3: 0x1C5800eb5fECB7760D7F1978ad744feA652a7b27
   Treasury: 0x02E6B1C1E78A7C71798262ef34386182C553bA8C
   Owner: 0x05F8cC8753D90d67DBB8c02118440b8283F941c9

⏳ Deploying contract...

✅ ViaSyntheticBridge (Pre-Audit) deployed!
   Address: 0x7307FEE834DdC88A716904830C0cb356A4878be1
   Token: INC (Incentive)
💾 Deployment saved: INC on polygon -> 0x7307FEE834DdC88A716904830C0cb356A4878be1

📋 Next Steps:
   1. Deploy on other destination chains if needed
   2. Run configure-all-routes.js to set up cross-chain routing

🔗 Contract: 0x7307FEE834DdC88A716904830C0cb356A4878be1
ganadhish@Ganadhishs-MacBook-Air multi-chain-with-via % npx hardhat run scripts/pre-audit-scripts/deploy-synthetic.js --network avalanche

🚀 DEPLOYING ViaSyntheticBridge (Pre-Audit)
═══════════════════════════════════════════════════════
📍 Network: avalanche (Chain ID: 43114)
👤 Deployer: 0x05F8cC8753D90d67DBB8c02118440b8283F941c9
🎯 Token: INC

📋 Deployment Parameters:
   Synthetic Name: Incentive
   Synthetic Symbol: INC
   Fee Token (USDC): 0xB97EF9Ef8734C71904D8002F8b6Bc66Dd9c48a6E
   MessageV3: 0x72E052Fa7f0788e668965d37B6c38C88703B7859
   Treasury: 0x02E6B1C1E78A7C71798262ef34386182C553bA8C
   Owner: 0x05F8cC8753D90d67DBB8c02118440b8283F941c9

⏳ Deploying contract...

✅ ViaSyntheticBridge (Pre-Audit) deployed!
   Address: 0x3E8cEA4287b7D1d707FE3FD526a19C3fE2221798
   Token: INC (Incentive)
💾 Deployment saved: INC on avalanche -> 0x3E8cEA4287b7D1d707FE3FD526a19C3fE2221798

📋 Next Steps:
   1. Deploy on other destination chains if needed
   2. Run configure-all-routes.js to set up cross-chain routing

🔗 Contract: 0x3E8cEA4287b7D1d707FE3FD526a19C3fE2221798

______________________________________________________________________________
_______________________
**ALL DEPLOYMENTS CHAINS FOR WPLS |
_______________________


npx hardhat run scripts/pre-audit-scripts/deploy-collateral.js --network pulsechain

🚀 DEPLOYING ViaCollateralBridge (Pre-Audit)
═══════════════════════════════════════════════════════
📍 Network: pulsechain (Chain ID: 369)
👤 Deployer: 0x05F8cC8753D90d67DBB8c02118440b8283F941c9
🎯 Token: WPLS

📋 Deployment Parameters:
   Collateral Token: 0xA1077a294dDE1B09bB078844df40758a5D0f9a27
   Fee Token (USDC): 0x15D38573d2feeb82e7ad5187aB8c1D52810B1f07
   MessageV3: 0xba01F2bA548e69bA26Fd06a3bdf1A7857eeAC435
   Treasury: 0x02E6B1C1E78A7C71798262ef34386182C553bA8C
   Owner: 0x05F8cC8753D90d67DBB8c02118440b8283F941c9

⏳ Deploying contract...

✅ ViaCollateralBridge (Pre-Audit) deployed!
   Address: 0xEecBf7a332e16572AB367623E9A05d4d26d2c8C4
   Token: WPLS (Wrapped Pulse)
💾 Deployment saved: WPLS on pulsechain -> 0xEecBf7a332e16572AB367623E9A05d4d26d2c8C4

📋 Next Steps:
   1. Deploy ViaSyntheticBridge on destination chains
   2. Run configure-all-routes.js to set up cross-chain routing
      (This will configure MessageClient AND chain settings including wrappedGasToken)

🔗 Contract: 0xEecBf7a332e16572AB367623E9A05d4d26d2c8C4
ganadhish@Ganadhishs-MacBook-Air multi-chain-with-via % npx hardhat run scripts/pre-audit-scripts/deploy-synthetic.js --network base       

🚀 DEPLOYING ViaSyntheticBridge (Pre-Audit)
═══════════════════════════════════════════════════════
📍 Network: base (Chain ID: 8453)
👤 Deployer: 0x05F8cC8753D90d67DBB8c02118440b8283F941c9
🎯 Token: WPLS

📋 Deployment Parameters:
   Synthetic Name: Wrapped Pulse
   Synthetic Symbol: WPLS
   Fee Token (USDC): 0x833589fCD6eDb6E08f4c7C32D4f71b54bdA02913
   MessageV3: 0xe3b3274bb685F37C7f17a604039c77a6A16Cfc2a
   Treasury: 0x02E6B1C1E78A7C71798262ef34386182C553bA8C
   Owner: 0x05F8cC8753D90d67DBB8c02118440b8283F941c9

⏳ Deploying contract...

✅ ViaSyntheticBridge (Pre-Audit) deployed!
   Address: 0x78208aeC3e336c6636AB5E0bA16aB9FEA1710ca5
   Token: WPLS (Wrapped Pulse)
💾 Deployment saved: WPLS on base -> 0x78208aeC3e336c6636AB5E0bA16aB9FEA1710ca5

📋 Next Steps:
   1. Deploy on other destination chains if needed
   2. Run configure-all-routes.js to set up cross-chain routing

🔗 Contract: 0x78208aeC3e336c6636AB5E0bA16aB9FEA1710ca5
ganadhish@Ganadhishs-MacBook-Air multi-chain-with-via % npx hardhat run scripts/pre-audit-scripts/deploy-synthetic.js --network arbitrum   

🚀 DEPLOYING ViaSyntheticBridge (Pre-Audit)
═══════════════════════════════════════════════════════
📍 Network: arbitrum (Chain ID: 42161)
👤 Deployer: 0x05F8cC8753D90d67DBB8c02118440b8283F941c9
🎯 Token: WPLS

📋 Deployment Parameters:
   Synthetic Name: Wrapped Pulse
   Synthetic Symbol: WPLS
   Fee Token (USDC): 0xaf88d065e77c8cC2239327C5EDb3A432268e5831
   MessageV3: 0x65EEc58ef38882422E887B82f7085e9a9C35dCA1
   Treasury: 0x02E6B1C1E78A7C71798262ef34386182C553bA8C
   Owner: 0x05F8cC8753D90d67DBB8c02118440b8283F941c9

⏳ Deploying contract...

✅ ViaSyntheticBridge (Pre-Audit) deployed!
   Address: 0xA11F758A972e843Fde082BE31Ff1a7cd6e47ac1C
   Token: WPLS (Wrapped Pulse)
💾 Deployment saved: WPLS on arbitrum -> 0xA11F758A972e843Fde082BE31Ff1a7cd6e47ac1C

📋 Next Steps:
   1. Deploy on other destination chains if needed
   2. Run configure-all-routes.js to set up cross-chain routing

🔗 Contract: 0xA11F758A972e843Fde082BE31Ff1a7cd6e47ac1C
ganadhish@Ganadhishs-MacBook-Air multi-chain-with-via % npx hardhat run scripts/pre-audit-scripts/deploy-synthetic.js --network optimism   

🚀 DEPLOYING ViaSyntheticBridge (Pre-Audit)
═══════════════════════════════════════════════════════
📍 Network: optimism (Chain ID: 10)
👤 Deployer: 0x05F8cC8753D90d67DBB8c02118440b8283F941c9
🎯 Token: WPLS

📋 Deployment Parameters:
   Synthetic Name: Wrapped Pulse
   Synthetic Symbol: WPLS
   Fee Token (USDC): 0x0b2C639c533813f4Aa9D7837CAf62653d097Ff85
   MessageV3: 0x15AC559DA4951c796DB6620fAb286B96840D039A
   Treasury: 0x02E6B1C1E78A7C71798262ef34386182C553bA8C
   Owner: 0x05F8cC8753D90d67DBB8c02118440b8283F941c9

⏳ Deploying contract...

✅ ViaSyntheticBridge (Pre-Audit) deployed!
   Address: 0x4Ce7a88A512FB0BfbB1F6Fe9cE70F2A98D413BeC
   Token: WPLS (Wrapped Pulse)
💾 Deployment saved: WPLS on optimism -> 0x4Ce7a88A512FB0BfbB1F6Fe9cE70F2A98D413BeC

📋 Next Steps:
   1. Deploy on other destination chains if needed
   2. Run configure-all-routes.js to set up cross-chain routing

🔗 Contract: 0x4Ce7a88A512FB0BfbB1F6Fe9cE70F2A98D413BeC
ganadhish@Ganadhishs-MacBook-Air multi-chain-with-via % npx hardhat run scripts/pre-audit-scripts/deploy-synthetic.js --network bnb        

🚀 DEPLOYING ViaSyntheticBridge (Pre-Audit)
═══════════════════════════════════════════════════════
📍 Network: bnb (Chain ID: 56)
👤 Deployer: 0x05F8cC8753D90d67DBB8c02118440b8283F941c9
🎯 Token: WPLS

📋 Deployment Parameters:
   Synthetic Name: Wrapped Pulse
   Synthetic Symbol: WPLS
   Fee Token (USDC): 0x8AC76a51cc950d9822D68b83fE1Ad97B32Cd580d
   MessageV3: 0x7b67dF6728E294db2eb173ac7c738a4627Ae5e11
   Treasury: 0x02E6B1C1E78A7C71798262ef34386182C553bA8C
   Owner: 0x05F8cC8753D90d67DBB8c02118440b8283F941c9

⏳ Deploying contract...

✅ ViaSyntheticBridge (Pre-Audit) deployed!
   Address: 0x84B0b1EE6eef971105442Eb9Ab420F3DbB774b46
   Token: WPLS (Wrapped Pulse)
💾 Deployment saved: WPLS on bnb -> 0x84B0b1EE6eef971105442Eb9Ab420F3DbB774b46

📋 Next Steps:
   1. Deploy on other destination chains if needed
   2. Run configure-all-routes.js to set up cross-chain routing

🔗 Contract: 0x84B0b1EE6eef971105442Eb9Ab420F3DbB774b46
ganadhish@Ganadhishs-MacBook-Air multi-chain-with-via % npx hardhat run scripts/pre-audit-scripts/deploy-synthetic.js --network polygon    

🚀 DEPLOYING ViaSyntheticBridge (Pre-Audit)
═══════════════════════════════════════════════════════
📍 Network: polygon (Chain ID: 137)
👤 Deployer: 0x05F8cC8753D90d67DBB8c02118440b8283F941c9
🎯 Token: WPLS

📋 Deployment Parameters:
   Synthetic Name: Wrapped Pulse
   Synthetic Symbol: WPLS
   Fee Token (USDC): 0x3c499c542cEF5E3811e1192ce70d8cC03d5c3359
   MessageV3: 0x1C5800eb5fECB7760D7F1978ad744feA652a7b27
   Treasury: 0x02E6B1C1E78A7C71798262ef34386182C553bA8C
   Owner: 0x05F8cC8753D90d67DBB8c02118440b8283F941c9

⏳ Deploying contract...

✅ ViaSyntheticBridge (Pre-Audit) deployed!
   Address: 0x1f5C42FCd0940692d4be52d17CD6bbFDFac9b0ac
   Token: WPLS (Wrapped Pulse)
💾 Deployment saved: WPLS on polygon -> 0x1f5C42FCd0940692d4be52d17CD6bbFDFac9b0ac

📋 Next Steps:
   1. Deploy on other destination chains if needed
   2. Run configure-all-routes.js to set up cross-chain routing

🔗 Contract: 0x1f5C42FCd0940692d4be52d17CD6bbFDFac9b0ac
ganadhish@Ganadhishs-MacBook-Air multi-chain-with-via % npx hardhat run scripts/pre-audit-scripts/deploy-synthetic.js --network avalanche  

🚀 DEPLOYING ViaSyntheticBridge (Pre-Audit)
═══════════════════════════════════════════════════════
📍 Network: avalanche (Chain ID: 43114)
👤 Deployer: 0x05F8cC8753D90d67DBB8c02118440b8283F941c9
🎯 Token: WPLS

📋 Deployment Parameters:
   Synthetic Name: Wrapped Pulse
   Synthetic Symbol: WPLS
   Fee Token (USDC): 0xB97EF9Ef8734C71904D8002F8b6Bc66Dd9c48a6E
   MessageV3: 0x72E052Fa7f0788e668965d37B6c38C88703B7859
   Treasury: 0x02E6B1C1E78A7C71798262ef34386182C553bA8C
   Owner: 0x05F8cC8753D90d67DBB8c02118440b8283F941c9

⏳ Deploying contract...

✅ ViaSyntheticBridge (Pre-Audit) deployed!
   Address: 0x2271f95dda2b85BefadDe6BdC689C84c63150e04
   Token: WPLS (Wrapped Pulse)
💾 Deployment saved: WPLS on avalanche -> 0x2271f95dda2b85BefadDe6BdC689C84c63150e04

📋 Next Steps:
   1. Deploy on other destination chains if needed
   2. Run configure-all-routes.js to set up cross-chain routing

🔗 Contract: 0x2271f95dda2b85BefadDe6BdC689C84c63150e04


________________________________________________________________________________________________

_______________________
**ALL DEPLOYMENTS CHAINS FOR pHEX |
_______________________

npx hardhat run scripts/pre-audit-scripts/deploy-collateral.js --network pul
sechain

🚀 DEPLOYING ViaCollateralBridge (Pre-Audit)
═══════════════════════════════════════════════════════
📍 Network: pulsechain (Chain ID: 369)
👤 Deployer: 0x05F8cC8753D90d67DBB8c02118440b8283F941c9
🎯 Token: pHEX

📋 Deployment Parameters:
   Collateral Token: 0x2b591e99afE9f32eAA6214f7B7629768c40Eeb39
   Fee Token (USDC): 0x15D38573d2feeb82e7ad5187aB8c1D52810B1f07
   MessageV3: 0xba01F2bA548e69bA26Fd06a3bdf1A7857eeAC435
   Treasury: 0x02E6B1C1E78A7C71798262ef34386182C553bA8C
   Owner: 0x05F8cC8753D90d67DBB8c02118440b8283F941c9

⏳ Deploying contract...

✅ ViaCollateralBridge (Pre-Audit) deployed!
   Address: 0xa489CeA254e8649F5b4BA1A4708ed348425606BE
   Token: pHEX (HEX on PulseChain)
💾 Deployment saved: pHEX on pulsechain -> 0xa489CeA254e8649F5b4BA1A4708ed348425606BE

📋 Next Steps:
   1. Deploy ViaSyntheticBridge on destination chains
   2. Run configure-all-routes.js to set up cross-chain routing
      (This will configure MessageClient AND chain settings including wrappedGasToken)

🔗 Contract: 0xa489CeA254e8649F5b4BA1A4708ed348425606BE
Ganadhishs-MacBook-Air:multi-chain-with-via ganadhish$ npx hardhat run scripts/pre-audit-scripts/deploy-synthetic.js --network base
 
🚀 DEPLOYING ViaSyntheticBridge (Pre-Audit)
═══════════════════════════════════════════════════════
📍 Network: base (Chain ID: 8453)
👤 Deployer: 0x05F8cC8753D90d67DBB8c02118440b8283F941c9
🎯 Token: pHEX

📋 Deployment Parameters:
   Synthetic Name: HEX on PulseChain
   Synthetic Symbol: pHEX
   Fee Token (USDC): 0x833589fCD6eDb6E08f4c7C32D4f71b54bdA02913
   MessageV3: 0xe3b3274bb685F37C7f17a604039c77a6A16Cfc2a
   Treasury: 0x02E6B1C1E78A7C71798262ef34386182C553bA8C
   Owner: 0x05F8cC8753D90d67DBB8c02118440b8283F941c9

⏳ Deploying contract...

✅ ViaSyntheticBridge (Pre-Audit) deployed!
   Address: 0xb97A43ae0563670D83f547638a5A89F2210D1a2c
   Token: pHEX (HEX on PulseChain)
💾 Deployment saved: pHEX on base -> 0xb97A43ae0563670D83f547638a5A89F2210D1a2c

📋 Next Steps:
   1. Deploy on other destination chains if needed
   2. Run configure-all-routes.js to set up cross-chain routing

🔗 Contract: 0xb97A43ae0563670D83f547638a5A89F2210D1a2c
Ganadhishs-MacBook-Air:multi-chain-with-via ganadhish$ npx hardhat run scripts/pre-audit-scripts/deploy-synthetic.js --network arbitrum

🚀 DEPLOYING ViaSyntheticBridge (Pre-Audit)
═══════════════════════════════════════════════════════
📍 Network: arbitrum (Chain ID: 42161)
👤 Deployer: 0x05F8cC8753D90d67DBB8c02118440b8283F941c9
🎯 Token: pHEX

📋 Deployment Parameters:
   Synthetic Name: HEX on PulseChain
   Synthetic Symbol: pHEX
   Fee Token (USDC): 0xaf88d065e77c8cC2239327C5EDb3A432268e5831
   MessageV3: 0x65EEc58ef38882422E887B82f7085e9a9C35dCA1
   Treasury: 0x02E6B1C1E78A7C71798262ef34386182C553bA8C
   Owner: 0x05F8cC8753D90d67DBB8c02118440b8283F941c9

⏳ Deploying contract...

✅ ViaSyntheticBridge (Pre-Audit) deployed!
   Address: 0xf4e53aAe1D9f27851B03842007D0a8a023317cD2
   Token: pHEX (HEX on PulseChain)
💾 Deployment saved: pHEX on arbitrum -> 0xf4e53aAe1D9f27851B03842007D0a8a023317cD2

📋 Next Steps:
   1. Deploy on other destination chains if needed
   2. Run configure-all-routes.js to set up cross-chain routing

🔗 Contract: 0xf4e53aAe1D9f27851B03842007D0a8a023317cD2
Ganadhishs-MacBook-Air:multi-chain-with-via ganadhish$ npx hardhat run scripts/pre-audit-scripts/deploy-synthetic.js --network optimism

🚀 DEPLOYING ViaSyntheticBridge (Pre-Audit)
═══════════════════════════════════════════════════════
📍 Network: optimism (Chain ID: 10)
👤 Deployer: 0x05F8cC8753D90d67DBB8c02118440b8283F941c9
🎯 Token: pHEX

📋 Deployment Parameters:
   Synthetic Name: HEX on PulseChain
   Synthetic Symbol: pHEX
   Fee Token (USDC): 0x0b2C639c533813f4Aa9D7837CAf62653d097Ff85
   MessageV3: 0x15AC559DA4951c796DB6620fAb286B96840D039A
   Treasury: 0x02E6B1C1E78A7C71798262ef34386182C553bA8C
   Owner: 0x05F8cC8753D90d67DBB8c02118440b8283F941c9

⏳ Deploying contract...

✅ ViaSyntheticBridge (Pre-Audit) deployed!
   Address: 0x74b40bAc12a493ab0D9c2daC6B1BCa7A705A6743
   Token: pHEX (HEX on PulseChain)
💾 Deployment saved: pHEX on optimism -> 0x74b40bAc12a493ab0D9c2daC6B1BCa7A705A6743

📋 Next Steps:
   1. Deploy on other destination chains if needed
   2. Run configure-all-routes.js to set up cross-chain routing

🔗 Contract: 0x74b40bAc12a493ab0D9c2daC6B1BCa7A705A6743
Ganadhishs-MacBook-Air:multi-chain-with-via ganadhish$ npx hardhat run scripts/pre-audit-scripts/deploy-synthetic.js --network bnb

🚀 DEPLOYING ViaSyntheticBridge (Pre-Audit)
═══════════════════════════════════════════════════════
📍 Network: bnb (Chain ID: 56)
👤 Deployer: 0x05F8cC8753D90d67DBB8c02118440b8283F941c9
🎯 Token: pHEX

📋 Deployment Parameters:
   Synthetic Name: HEX on PulseChain
   Synthetic Symbol: pHEX
   Fee Token (USDC): 0x8AC76a51cc950d9822D68b83fE1Ad97B32Cd580d
   MessageV3: 0x7b67dF6728E294db2eb173ac7c738a4627Ae5e11
   Treasury: 0x02E6B1C1E78A7C71798262ef34386182C553bA8C
   Owner: 0x05F8cC8753D90d67DBB8c02118440b8283F941c9

⏳ Deploying contract...

✅ ViaSyntheticBridge (Pre-Audit) deployed!
   Address: 0x5f8Eea46Aaf2b936790495d25806B22c21f92242
   Token: pHEX (HEX on PulseChain)
💾 Deployment saved: pHEX on bnb -> 0x5f8Eea46Aaf2b936790495d25806B22c21f92242

📋 Next Steps:
   1. Deploy on other destination chains if needed
   2. Run configure-all-routes.js to set up cross-chain routing

🔗 Contract: 0x5f8Eea46Aaf2b936790495d25806B22c21f92242
Ganadhishs-MacBook-Air:multi-chain-with-via ganadhish$ npx hardhat run scripts/pre-audit-scripts/deploy-synthetic.js --network polygon

🚀 DEPLOYING ViaSyntheticBridge (Pre-Audit)
═══════════════════════════════════════════════════════
📍 Network: polygon (Chain ID: 137)
👤 Deployer: 0x05F8cC8753D90d67DBB8c02118440b8283F941c9
🎯 Token: pHEX

📋 Deployment Parameters:
   Synthetic Name: HEX on PulseChain
   Synthetic Symbol: pHEX
   Fee Token (USDC): 0x3c499c542cEF5E3811e1192ce70d8cC03d5c3359
   MessageV3: 0x1C5800eb5fECB7760D7F1978ad744feA652a7b27
   Treasury: 0x02E6B1C1E78A7C71798262ef34386182C553bA8C
   Owner: 0x05F8cC8753D90d67DBB8c02118440b8283F941c9

⏳ Deploying contract...

✅ ViaSyntheticBridge (Pre-Audit) deployed!
   Address: 0x9BD3C63e254a3fF7b757c9bad18F3c420e7825B2
   Token: pHEX (HEX on PulseChain)
💾 Deployment saved: pHEX on polygon -> 0x9BD3C63e254a3fF7b757c9bad18F3c420e7825B2

📋 Next Steps:
   1. Deploy on other destination chains if needed
   2. Run configure-all-routes.js to set up cross-chain routing

🔗 Contract: 0x9BD3C63e254a3fF7b757c9bad18F3c420e7825B2
Ganadhishs-MacBook-Air:multi-chain-with-via ganadhish$ npx hardhat run scripts/pre-audit-scripts/deploy-synthetic.js --network avalanche

🚀 DEPLOYING ViaSyntheticBridge (Pre-Audit)
═══════════════════════════════════════════════════════
📍 Network: avalanche (Chain ID: 43114)
👤 Deployer: 0x05F8cC8753D90d67DBB8c02118440b8283F941c9
🎯 Token: pHEX

📋 Deployment Parameters:
   Synthetic Name: HEX on PulseChain
   Synthetic Symbol: pHEX
   Fee Token (USDC): 0xB97EF9Ef8734C71904D8002F8b6Bc66Dd9c48a6E
   MessageV3: 0x72E052Fa7f0788e668965d37B6c38C88703B7859
   Treasury: 0x02E6B1C1E78A7C71798262ef34386182C553bA8C
   Owner: 0x05F8cC8753D90d67DBB8c02118440b8283F941c9

⏳ Deploying contract...

✅ ViaSyntheticBridge (Pre-Audit) deployed!
   Address: 0x762c2206681c4059df13acb9D2eF87fFA4Ee3FEc
   Token: pHEX (HEX on PulseChain)
💾 Deployment saved: pHEX on avalanche -> 0x762c2206681c4059df13acb9D2eF87fFA4Ee3FEc

📋 Next Steps:
   1. Deploy on other destination chains if needed
   2. Run configure-all-routes.js to set up cross-chain routing

🔗 Contract: 0x762c2206681c4059df13acb9D2eF87fFA4Ee3FEc