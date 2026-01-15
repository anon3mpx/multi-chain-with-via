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

🌐 Remote Chains to Configure (6 total):
   - Chain 8453 (Base): 0x421b1c25b5Cd1766Aa17d01133a548C28D00b726 [synthetic]
   - Chain 42161 (Arbitrum): 0x1F031F7A2652fD6f10F1FB37BEfaac8A69039f08 [synthetic]
   - Chain 10 (Optimism): 0x0AD73370Ca2e1b7667B568d20f25eF0864227bFC [synthetic]
   - Chain 56 (BNB Chain): 0xc1Bb27E7AE8af9164Cb6B5D3A465478415EdEbB7 [synthetic]
   - Chain 137 (Polygon): 0x6B7c81207240a38e03E5e9B138C53c4762515cCD [synthetic]
   - Chain 43114 (Avalanche): 0xc14441CBD763FBad2Db823CCa77AFAdeCbcdd0c4 [synthetic]

[STEP 1/2] Configuring MessageClient...
═══════════════════════════════════════════════════════
   MessageV3: 0xba01F2bA548e69bA26Fd06a3bdf1A7857eeAC435
   Remote Chains: [8453, 42161, 10, 56, 137, 43114]
   Confirmations: 15
   Using Nonce: 689
   TX: 0x195eb6f8bed2cd34eacc349949eba8f22057332b50bb1b5935e686994528a1f3
   ✅ MessageClient configured!

[STEP 2/2] Configuring Remote Chains...
═══════════════════════════════════════════════════════

   🌐 Chain 8453 (Base):
      Remote Contract: 0x421b1c25b5Cd1766Aa17d01133a548C28D00b726
      Wrapped Gas Token: 0xA1077a294dDE1B09bB078844df40758a5D0f9a27
      Protocol Fee: 0.12 USDC
      VIA Source Fee: 0.25 USDC
      VIA Dest Gas: 30000000000000 wei
      Using Nonce: 690
      TX: 0xc912c583f2fa60a07743f5a90c8ba8f8c7b23cd81631b5d889cdbb8ffd96195c
      ✅ Configured!

   🌐 Chain 42161 (Arbitrum):
      Remote Contract: 0x1F031F7A2652fD6f10F1FB37BEfaac8A69039f08
      Wrapped Gas Token: 0xA1077a294dDE1B09bB078844df40758a5D0f9a27
      Protocol Fee: 0.12 USDC
      VIA Source Fee: 0.25 USDC
      VIA Dest Gas: 30000000000000 wei
      Using Nonce: 691
      TX: 0xe311ced2aee006b366b36a598075d07d0891bfb1f9bbdf553eead8539a7dfbf4
      ✅ Configured!

   🌐 Chain 10 (Optimism):
      Remote Contract: 0x0AD73370Ca2e1b7667B568d20f25eF0864227bFC
      Wrapped Gas Token: 0xA1077a294dDE1B09bB078844df40758a5D0f9a27
      Protocol Fee: 0.12 USDC
      VIA Source Fee: 0.25 USDC
      VIA Dest Gas: 30000000000000 wei
      Using Nonce: 692
      TX: 0xc4657f63cf443eb7959f42fc071bec006fa0147b29161229bcd14b1f10eb2924
      ✅ Configured!

   🌐 Chain 56 (BNB Chain):
      Remote Contract: 0xc1Bb27E7AE8af9164Cb6B5D3A465478415EdEbB7
      Wrapped Gas Token: 0xA1077a294dDE1B09bB078844df40758a5D0f9a27
      Protocol Fee: 0.12 USDC
      VIA Source Fee: 0.25 USDC
      VIA Dest Gas: 1500000000000000 wei
      Using Nonce: 693
      TX: 0xccd735ccd978036b79a23d0753240a99b4ee2acea51f19c97ddec9d54ac30b93
      ✅ Configured!

   🌐 Chain 137 (Polygon):
      Remote Contract: 0x6B7c81207240a38e03E5e9B138C53c4762515cCD
      Wrapped Gas Token: 0xA1077a294dDE1B09bB078844df40758a5D0f9a27
      Protocol Fee: 0.12 USDC
      VIA Source Fee: 0.25 USDC
      VIA Dest Gas: 30000000000000000 wei
      Using Nonce: 694
      TX: 0x7452f91d1e4f17b6e2960739ad342890114097c2a233447c274be906d673ed25
      ✅ Configured!

   🌐 Chain 43114 (Avalanche):
      Remote Contract: 0xc14441CBD763FBad2Db823CCa77AFAdeCbcdd0c4
      Wrapped Gas Token: 0xA1077a294dDE1B09bB078844df40758a5D0f9a27
      Protocol Fee: 0.12 USDC
      VIA Source Fee: 0.25 USDC
      VIA Dest Gas: 15000000000000000 wei
      Using Nonce: 695
      TX: 0x2f7044b84a6920e21dec6fd61e378355b64a857fb92102b0f8a6e4e400da0573
      ✅ Configured!

[VERIFICATION] Checking Configuration...
═══════════════════════════════════════════════════════
   Chain 8453: Configured ✅
   Chain 42161: Configured ✅
   Chain 10: Configured ✅
   Chain 56: Configured ✅
   Chain 137: Configured ✅
   Chain 43114: Configured ✅

✅ ALL ROUTES CONFIGURED FOR HOA ON PULSECHAIN!
═══════════════════════════════════════════════════════
   📋 Configured 6 remote chains.

   📋 Next Steps:
   Run this script on ALL other chains with HOA deployments:
      npx hardhat run scripts/pre-audit-scripts/configure-all-routes.js --network base HOA
      npx hardhat run scripts/pre-audit-scripts/configure-all-routes.js --network arbitrum HOA
      npx hardhat run scripts/pre-audit-scripts/configure-all-routes.js --network optimism HOA
      npx hardhat run scripts/pre-audit-scripts/configure-all-routes.js --network bnb HOA
      npx hardhat run scripts/pre-audit-scripts/configure-all-routes.js --network polygon HOA
      npx hardhat run scripts/pre-audit-scripts/configure-all-routes.js --network avalanche HOA

____________________________________________________________________________________________________

npx hardhat run scripts/pre-audit-scripts/configure-all-routes.js --network base

🌐 CONFIGURE ALL ROUTES (Pre-Audit Contracts)
═══════════════════════════════════════════════════════
📍 Network: base (Chain ID: 8453)
👤 Signer: 0x05F8cC8753D90d67DBB8c02118440b8283F941c9
🎯 Token: HOA

📍 Current Contract: 0x421b1c25b5Cd1766Aa17d01133a548C28D00b726
   Type: synthetic
   MessageV3: 0xe3b3274bb685F37C7f17a604039c77a6A16Cfc2a
   Wrapped Gas Token: 0x4200000000000000000000000000000000000006

🌐 Remote Chains to Configure (6 total):
   - Chain 369 (PulseChain): 0xc7dA00db476E18231079Fbf61D67930314EA5b26 [collateral]
   - Chain 42161 (Arbitrum): 0x1F031F7A2652fD6f10F1FB37BEfaac8A69039f08 [synthetic]
   - Chain 10 (Optimism): 0x0AD73370Ca2e1b7667B568d20f25eF0864227bFC [synthetic]
   - Chain 56 (BNB Chain): 0xc1Bb27E7AE8af9164Cb6B5D3A465478415EdEbB7 [synthetic]
   - Chain 137 (Polygon): 0x6B7c81207240a38e03E5e9B138C53c4762515cCD [synthetic]
   - Chain 43114 (Avalanche): 0xc14441CBD763FBad2Db823CCa77AFAdeCbcdd0c4 [synthetic]

[STEP 1/2] Configuring MessageClient...
═══════════════════════════════════════════════════════
   MessageV3: 0xe3b3274bb685F37C7f17a604039c77a6A16Cfc2a
   Remote Chains: [369, 42161, 10, 56, 137, 43114]
   Confirmations: 15
   Using Nonce: 456
   TX: 0xecb129571b8ca4a2bbe33f23f8dffc0d6e9de96b4e2e19e2dd0b22db8e060c06
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
      Using Nonce: 456
      ❌ Failed: nonce too low: next nonce 457, tx nonce 456

   🌐 Chain 42161 (Arbitrum):
      Remote Contract: 0x1F031F7A2652fD6f10F1FB37BEfaac8A69039f08
      Wrapped Gas Token: 0x4200000000000000000000000000000000000006
      Protocol Fee: 0.12 USDC
      VIA Source Fee: 0.25 USDC
      VIA Dest Gas: 30000000000000 wei
      Authorize Minter: true
      Using Nonce: 457
      TX: 0xda69df1f17eb45c30e34f712c247806062ecbbf98c419e90161ac13bc2bf2fdb
      ✅ Configured!

   🌐 Chain 10 (Optimism):
      Remote Contract: 0x0AD73370Ca2e1b7667B568d20f25eF0864227bFC
      Wrapped Gas Token: 0x4200000000000000000000000000000000000006
      Protocol Fee: 0.12 USDC
      VIA Source Fee: 0.25 USDC
      VIA Dest Gas: 30000000000000 wei
      Authorize Minter: true
      Using Nonce: 458
      TX: 0xd94c108d00c9c17bbf9edb82070a10f217fca6d22697fced6c59b67d917cf21d
      ✅ Configured!

   🌐 Chain 56 (BNB Chain):
      Remote Contract: 0xc1Bb27E7AE8af9164Cb6B5D3A465478415EdEbB7
      Wrapped Gas Token: 0x4200000000000000000000000000000000000006
      Protocol Fee: 0.12 USDC
      VIA Source Fee: 0.25 USDC
      VIA Dest Gas: 1500000000000000 wei
      Authorize Minter: true
      Using Nonce: 459
      TX: 0xbe1af6b3e23f8350188d5ee06468ed288f854f04c9c24538c550eec7d0055e55
      ✅ Configured!

   🌐 Chain 137 (Polygon):
      Remote Contract: 0x6B7c81207240a38e03E5e9B138C53c4762515cCD
      Wrapped Gas Token: 0x4200000000000000000000000000000000000006
      Protocol Fee: 0.12 USDC
      VIA Source Fee: 0.25 USDC
      VIA Dest Gas: 30000000000000000 wei
      Authorize Minter: true
      Using Nonce: 460
      TX: 0xeec1367a0d41df445ee41896e16d1ab014bb3b6d23ae7c52f84a05f014147d09
      ✅ Configured!

   🌐 Chain 43114 (Avalanche):
      Remote Contract: 0xc14441CBD763FBad2Db823CCa77AFAdeCbcdd0c4
      Wrapped Gas Token: 0x4200000000000000000000000000000000000006
      Protocol Fee: 0.12 USDC
      VIA Source Fee: 0.25 USDC
      VIA Dest Gas: 15000000000000000 wei
      Authorize Minter: true
      Using Nonce: 461
      TX: 0xb10278cf97827c94633e5a87540a07ff7a40e3b0aab94e76c9e0eeade239a487
      ✅ Configured!

[VERIFICATION] Checking Configuration...
═══════════════════════════════════════════════════════
   Chain 369: Configured ✅ | Minter ✅
   Chain 42161: Configured ✅ | Minter ✅
   Chain 10: Configured ✅ | Minter ✅
   Chain 56: Configured ✅ | Minter ✅
   Chain 137: Configured ✅ | Minter ✅
   Chain 43114: Configured ✅ | Minter ✅

✅ ALL ROUTES CONFIGURED FOR HOA ON BASE!
═══════════════════════════════════════════════════════
   📋 Configured 6 remote chains.

   📋 Next Steps:
   Run this script on ALL other chains with HOA deployments:
      npx hardhat run scripts/pre-audit-scripts/configure-all-routes.js --network pulsechain HOA
      npx hardhat run scripts/pre-audit-scripts/configure-all-routes.js --network arbitrum HOA
      npx hardhat run scripts/pre-audit-scripts/configure-all-routes.js --network optimism HOA
      npx hardhat run scripts/pre-audit-scripts/configure-all-routes.js --network bnb HOA
      npx hardhat run scripts/pre-audit-scripts/configure-all-routes.js --network polygon HOA
      npx hardhat run scripts/pre-audit-scripts/configure-all-routes.js --network avalanche HOA
Ganadhishs-MacBook-Air:multi-chain-with-via ganadhish$ npx hardhat run scripts/pre-audit-scripts/configure-all-routes.js --network arbitrum

🌐 CONFIGURE ALL ROUTES (Pre-Audit Contracts)
═══════════════════════════════════════════════════════
📍 Network: arbitrum (Chain ID: 42161)
👤 Signer: 0x05F8cC8753D90d67DBB8c02118440b8283F941c9
🎯 Token: HOA

📍 Current Contract: 0x1F031F7A2652fD6f10F1FB37BEfaac8A69039f08
   Type: synthetic
   MessageV3: 0x65EEc58ef38882422E887B82f7085e9a9C35dCA1
   Wrapped Gas Token: 0x82aF49447D8a07e3bd95BD0d56f35241523fBab1

🌐 Remote Chains to Configure (6 total):
   - Chain 369 (PulseChain): 0xc7dA00db476E18231079Fbf61D67930314EA5b26 [collateral]
   - Chain 8453 (Base): 0x421b1c25b5Cd1766Aa17d01133a548C28D00b726 [synthetic]
   - Chain 10 (Optimism): 0x0AD73370Ca2e1b7667B568d20f25eF0864227bFC [synthetic]
   - Chain 56 (BNB Chain): 0xc1Bb27E7AE8af9164Cb6B5D3A465478415EdEbB7 [synthetic]
   - Chain 137 (Polygon): 0x6B7c81207240a38e03E5e9B138C53c4762515cCD [synthetic]
   - Chain 43114 (Avalanche): 0xc14441CBD763FBad2Db823CCa77AFAdeCbcdd0c4 [synthetic]

[STEP 1/2] Configuring MessageClient...
═══════════════════════════════════════════════════════
   MessageV3: 0x65EEc58ef38882422E887B82f7085e9a9C35dCA1
   Remote Chains: [369, 8453, 10, 56, 137, 43114]
   Confirmations: 15
   Using Nonce: 111
   TX: 0x40f7953166a5b7ed42e127a0753c050654ee2eed41f7667319d01a52c54eee8c
   ✅ MessageClient configured!

[STEP 2/2] Configuring Remote Chains...
═══════════════════════════════════════════════════════

   🌐 Chain 369 (PulseChain):
      Remote Contract: 0xc7dA00db476E18231079Fbf61D67930314EA5b26
      Wrapped Gas Token: 0x82aF49447D8a07e3bd95BD0d56f35241523fBab1
      Protocol Fee: 0.12 USDC
      VIA Source Fee: 0.25 USDC
      VIA Dest Gas: 80000000000000000000 wei
      Authorize Minter: true
      Using Nonce: 112
      TX: 0x2161df8c217cdeb4a19f5cd8dc5c2673212e56ab52b6e0539b31483b358fd88f
      ✅ Configured!

   🌐 Chain 8453 (Base):
      Remote Contract: 0x421b1c25b5Cd1766Aa17d01133a548C28D00b726
      Wrapped Gas Token: 0x82aF49447D8a07e3bd95BD0d56f35241523fBab1
      Protocol Fee: 0.12 USDC
      VIA Source Fee: 0.25 USDC
      VIA Dest Gas: 30000000000000 wei
      Authorize Minter: true
      Using Nonce: 113
      TX: 0xcf1fec37cc801e8e9cbf9ecac6b1610ded45d11ffcd3f1f2681cf645cb368c0e
      ✅ Configured!

   🌐 Chain 10 (Optimism):
      Remote Contract: 0x0AD73370Ca2e1b7667B568d20f25eF0864227bFC
      Wrapped Gas Token: 0x82aF49447D8a07e3bd95BD0d56f35241523fBab1
      Protocol Fee: 0.12 USDC
      VIA Source Fee: 0.25 USDC
      VIA Dest Gas: 30000000000000 wei
      Authorize Minter: true
      Using Nonce: 114
      TX: 0xf0e894bc91b326d6a426ae9cd40cd351817e66ffca9a375ac360f667566c7ff7
      ✅ Configured!

   🌐 Chain 56 (BNB Chain):
      Remote Contract: 0xc1Bb27E7AE8af9164Cb6B5D3A465478415EdEbB7
      Wrapped Gas Token: 0x82aF49447D8a07e3bd95BD0d56f35241523fBab1
      Protocol Fee: 0.12 USDC
      VIA Source Fee: 0.25 USDC
      VIA Dest Gas: 1500000000000000 wei
      Authorize Minter: true
      Using Nonce: 115
      TX: 0xfb249830445c1926cd73fdd762d98ce7605415a0b2257b5b10b846160b8ad1c5
      ✅ Configured!

   🌐 Chain 137 (Polygon):
      Remote Contract: 0x6B7c81207240a38e03E5e9B138C53c4762515cCD
      Wrapped Gas Token: 0x82aF49447D8a07e3bd95BD0d56f35241523fBab1
      Protocol Fee: 0.12 USDC
      VIA Source Fee: 0.25 USDC
      VIA Dest Gas: 30000000000000000 wei
      Authorize Minter: true
      Using Nonce: 116
      TX: 0xb3a0b2ee8271de72c021eb33ebf859a8e7d435315d3039efed337580384ae376
      ✅ Configured!

   🌐 Chain 43114 (Avalanche):
      Remote Contract: 0xc14441CBD763FBad2Db823CCa77AFAdeCbcdd0c4
      Wrapped Gas Token: 0x82aF49447D8a07e3bd95BD0d56f35241523fBab1
      Protocol Fee: 0.12 USDC
      VIA Source Fee: 0.25 USDC
      VIA Dest Gas: 15000000000000000 wei
      Authorize Minter: true
      Using Nonce: 117
      TX: 0xe9c43fb7a502bcd620060236b959d4920cba785b72b20ea67d49641617702b1e
      ✅ Configured!

[VERIFICATION] Checking Configuration...
═══════════════════════════════════════════════════════
   Chain 369: Configured ✅ | Minter ✅
   Chain 8453: Configured ✅ | Minter ✅
   Chain 10: Configured ✅ | Minter ✅
   Chain 56: Configured ✅ | Minter ✅
   Chain 137: Configured ✅ | Minter ✅
   Chain 43114: Configured ✅ | Minter ✅

✅ ALL ROUTES CONFIGURED FOR HOA ON ARBITRUM!
═══════════════════════════════════════════════════════
   📋 Configured 6 remote chains.

   📋 Next Steps:
   Run this script on ALL other chains with HOA deployments:
      npx hardhat run scripts/pre-audit-scripts/configure-all-routes.js --network pulsechain HOA
      npx hardhat run scripts/pre-audit-scripts/configure-all-routes.js --network base HOA
      npx hardhat run scripts/pre-audit-scripts/configure-all-routes.js --network optimism HOA
      npx hardhat run scripts/pre-audit-scripts/configure-all-routes.js --network bnb HOA
      npx hardhat run scripts/pre-audit-scripts/configure-all-routes.js --network polygon HOA
      npx hardhat run scripts/pre-audit-scripts/configure-all-routes.js --network avalanche HOA
Ganadhishs-MacBook-Air:multi-chain-with-via ganadhish$ npx hardhat run scripts/pre-audit-scripts/configure-all-routes.js --network optimism

🌐 CONFIGURE ALL ROUTES (Pre-Audit Contracts)
═══════════════════════════════════════════════════════
📍 Network: optimism (Chain ID: 10)
👤 Signer: 0x05F8cC8753D90d67DBB8c02118440b8283F941c9
🎯 Token: HOA

📍 Current Contract: 0x0AD73370Ca2e1b7667B568d20f25eF0864227bFC
   Type: synthetic
   MessageV3: 0x15AC559DA4951c796DB6620fAb286B96840D039A
   Wrapped Gas Token: 0x4200000000000000000000000000000000000006

🌐 Remote Chains to Configure (6 total):
   - Chain 369 (PulseChain): 0xc7dA00db476E18231079Fbf61D67930314EA5b26 [collateral]
   - Chain 8453 (Base): 0x421b1c25b5Cd1766Aa17d01133a548C28D00b726 [synthetic]
   - Chain 42161 (Arbitrum): 0x1F031F7A2652fD6f10F1FB37BEfaac8A69039f08 [synthetic]
   - Chain 56 (BNB Chain): 0xc1Bb27E7AE8af9164Cb6B5D3A465478415EdEbB7 [synthetic]
   - Chain 137 (Polygon): 0x6B7c81207240a38e03E5e9B138C53c4762515cCD [synthetic]
   - Chain 43114 (Avalanche): 0xc14441CBD763FBad2Db823CCa77AFAdeCbcdd0c4 [synthetic]

[STEP 1/2] Configuring MessageClient...
═══════════════════════════════════════════════════════
   MessageV3: 0x15AC559DA4951c796DB6620fAb286B96840D039A
   Remote Chains: [369, 8453, 42161, 56, 137, 43114]
   Confirmations: 15
   Using Nonce: 68
   TX: 0x289343c59b4d744abdaac302b610baf31219cf6f753e161c8a51b2ac14a7bdce
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
      Using Nonce: 69
      TX: 0x9ef09b6430df730122f2049b0e812af3c431a9a7b4626575c9638e98b56b2510
      ✅ Configured!

   🌐 Chain 8453 (Base):
      Remote Contract: 0x421b1c25b5Cd1766Aa17d01133a548C28D00b726
      Wrapped Gas Token: 0x4200000000000000000000000000000000000006
      Protocol Fee: 0.12 USDC
      VIA Source Fee: 0.25 USDC
      VIA Dest Gas: 30000000000000 wei
      Authorize Minter: true
      Using Nonce: 70
      TX: 0x8071a303d7cee6ad5f3f3c59f4441739037452fef66cb3961126a491aea24824
      ✅ Configured!

   🌐 Chain 42161 (Arbitrum):
      Remote Contract: 0x1F031F7A2652fD6f10F1FB37BEfaac8A69039f08
      Wrapped Gas Token: 0x4200000000000000000000000000000000000006
      Protocol Fee: 0.12 USDC
      VIA Source Fee: 0.25 USDC
      VIA Dest Gas: 30000000000000 wei
      Authorize Minter: true
      Using Nonce: 71
      TX: 0x26f3fd3e951f9f5588ae0c876b24feacaf7bf0c84d2e6782ae911d9266f7a558
      ✅ Configured!

   🌐 Chain 56 (BNB Chain):
      Remote Contract: 0xc1Bb27E7AE8af9164Cb6B5D3A465478415EdEbB7
      Wrapped Gas Token: 0x4200000000000000000000000000000000000006
      Protocol Fee: 0.12 USDC
      VIA Source Fee: 0.25 USDC
      VIA Dest Gas: 1500000000000000 wei
      Authorize Minter: true
      Using Nonce: 72
      TX: 0x6ba24c58fc6c8cde0e9edadb0ce57940a373c23ac2864c834ff7504d4acdfdaf
      ✅ Configured!

   🌐 Chain 137 (Polygon):
      Remote Contract: 0x6B7c81207240a38e03E5e9B138C53c4762515cCD
      Wrapped Gas Token: 0x4200000000000000000000000000000000000006
      Protocol Fee: 0.12 USDC
      VIA Source Fee: 0.25 USDC
      VIA Dest Gas: 30000000000000000 wei
      Authorize Minter: true
      Using Nonce: 73
      TX: 0x80eecd1916d89a2c2bc2dbcc65bef197cdc68355faf5b80b55fcf01cc0a34d1c
      ✅ Configured!

   🌐 Chain 43114 (Avalanche):
      Remote Contract: 0xc14441CBD763FBad2Db823CCa77AFAdeCbcdd0c4
      Wrapped Gas Token: 0x4200000000000000000000000000000000000006
      Protocol Fee: 0.12 USDC
      VIA Source Fee: 0.25 USDC
      VIA Dest Gas: 15000000000000000 wei
      Authorize Minter: true
      Using Nonce: 74
      TX: 0xd07d43cb3a706925cad2188a74bc03968cd9c01c23fc90b31af4c43fd155ce90
      ✅ Configured!

[VERIFICATION] Checking Configuration...
═══════════════════════════════════════════════════════
   Chain 369: Configured ✅ | Minter ✅
   Chain 8453: Configured ✅ | Minter ✅
   Chain 42161: Configured ✅ | Minter ✅
   Chain 56: Configured ✅ | Minter ✅
   Chain 137: Configured ✅ | Minter ✅
   Chain 43114: Configured ✅ | Minter ✅

✅ ALL ROUTES CONFIGURED FOR HOA ON OPTIMISM!
═══════════════════════════════════════════════════════
   📋 Configured 6 remote chains.

   📋 Next Steps:
   Run this script on ALL other chains with HOA deployments:
      npx hardhat run scripts/pre-audit-scripts/configure-all-routes.js --network pulsechain HOA
      npx hardhat run scripts/pre-audit-scripts/configure-all-routes.js --network base HOA
      npx hardhat run scripts/pre-audit-scripts/configure-all-routes.js --network arbitrum HOA
      npx hardhat run scripts/pre-audit-scripts/configure-all-routes.js --network bnb HOA
      npx hardhat run scripts/pre-audit-scripts/configure-all-routes.js --network polygon HOA
      npx hardhat run scripts/pre-audit-scripts/configure-all-routes.js --network avalanche HOA
Ganadhishs-MacBook-Air:multi-chain-with-via ganadhish$ npx hardhat run scripts/pre-audit-scripts/configure-all-routes.js --network bnb

🌐 CONFIGURE ALL ROUTES (Pre-Audit Contracts)
═══════════════════════════════════════════════════════
📍 Network: bnb (Chain ID: 56)
👤 Signer: 0x05F8cC8753D90d67DBB8c02118440b8283F941c9
🎯 Token: HOA

📍 Current Contract: 0xc1Bb27E7AE8af9164Cb6B5D3A465478415EdEbB7
   Type: synthetic
   MessageV3: 0x7b67dF6728E294db2eb173ac7c738a4627Ae5e11
   Wrapped Gas Token: 0xbb4CdB9CBd36B01bD1cBaEBF2De08d9173bc095c

🌐 Remote Chains to Configure (6 total):
   - Chain 369 (PulseChain): 0xc7dA00db476E18231079Fbf61D67930314EA5b26 [collateral]
   - Chain 8453 (Base): 0x421b1c25b5Cd1766Aa17d01133a548C28D00b726 [synthetic]
   - Chain 42161 (Arbitrum): 0x1F031F7A2652fD6f10F1FB37BEfaac8A69039f08 [synthetic]
   - Chain 10 (Optimism): 0x0AD73370Ca2e1b7667B568d20f25eF0864227bFC [synthetic]
   - Chain 137 (Polygon): 0x6B7c81207240a38e03E5e9B138C53c4762515cCD [synthetic]
   - Chain 43114 (Avalanche): 0xc14441CBD763FBad2Db823CCa77AFAdeCbcdd0c4 [synthetic]

[STEP 1/2] Configuring MessageClient...
═══════════════════════════════════════════════════════
   MessageV3: 0x7b67dF6728E294db2eb173ac7c738a4627Ae5e11
   Remote Chains: [369, 8453, 42161, 10, 137, 43114]
   Confirmations: 15
   Using Nonce: 14
   TX: 0x48f865b3fd968d7e7a0d99fb8d2699f3a5a0e71f0cc367eda09b269991c13376
   ✅ MessageClient configured!

[STEP 2/2] Configuring Remote Chains...
═══════════════════════════════════════════════════════

   🌐 Chain 369 (PulseChain):
      Remote Contract: 0xc7dA00db476E18231079Fbf61D67930314EA5b26
      Wrapped Gas Token: 0xbb4CdB9CBd36B01bD1cBaEBF2De08d9173bc095c
      Protocol Fee: 0.12 USDC
      VIA Source Fee: 0.25 USDC
      VIA Dest Gas: 80000000000000000000 wei
      Authorize Minter: true
      Using Nonce: 15
      TX: 0x0619355dec800a2cab535b41a1b6fa740eff9f0f9cfccad24f99c985cc89bd0d
      ✅ Configured!

   🌐 Chain 8453 (Base):
      Remote Contract: 0x421b1c25b5Cd1766Aa17d01133a548C28D00b726
      Wrapped Gas Token: 0xbb4CdB9CBd36B01bD1cBaEBF2De08d9173bc095c
      Protocol Fee: 0.12 USDC
      VIA Source Fee: 0.25 USDC
      VIA Dest Gas: 30000000000000 wei
      Authorize Minter: true
      Using Nonce: 16
      TX: 0x7d37372856e02a52f4b1dcbab0cd4428aec86383d9e9da2f0c8677953e971395
      ✅ Configured!

   🌐 Chain 42161 (Arbitrum):
      Remote Contract: 0x1F031F7A2652fD6f10F1FB37BEfaac8A69039f08
      Wrapped Gas Token: 0xbb4CdB9CBd36B01bD1cBaEBF2De08d9173bc095c
      Protocol Fee: 0.12 USDC
      VIA Source Fee: 0.25 USDC
      VIA Dest Gas: 30000000000000 wei
      Authorize Minter: true
      Using Nonce: 17
      TX: 0xfb7e53d922480fa0b82435a061d5876214016d65d144bacb78228fc518aab93d
      ✅ Configured!

   🌐 Chain 10 (Optimism):
      Remote Contract: 0x0AD73370Ca2e1b7667B568d20f25eF0864227bFC
      Wrapped Gas Token: 0xbb4CdB9CBd36B01bD1cBaEBF2De08d9173bc095c
      Protocol Fee: 0.12 USDC
      VIA Source Fee: 0.25 USDC
      VIA Dest Gas: 30000000000000 wei
      Authorize Minter: true
      Using Nonce: 18
      TX: 0xf1f69c4b4b91a8e39fe71c490a5c235163992916371dcbe1cededfd70c1417a9
      ✅ Configured!

   🌐 Chain 137 (Polygon):
      Remote Contract: 0x6B7c81207240a38e03E5e9B138C53c4762515cCD
      Wrapped Gas Token: 0xbb4CdB9CBd36B01bD1cBaEBF2De08d9173bc095c
      Protocol Fee: 0.12 USDC
      VIA Source Fee: 0.25 USDC
      VIA Dest Gas: 30000000000000000 wei
      Authorize Minter: true
      Using Nonce: 19
      TX: 0x83357406a87070ca635f28a1ab225a05fdbc897ac2ddbd4cc8fa04f93eb6c3e7
      ✅ Configured!

   🌐 Chain 43114 (Avalanche):
      Remote Contract: 0xc14441CBD763FBad2Db823CCa77AFAdeCbcdd0c4
      Wrapped Gas Token: 0xbb4CdB9CBd36B01bD1cBaEBF2De08d9173bc095c
      Protocol Fee: 0.12 USDC
      VIA Source Fee: 0.25 USDC
      VIA Dest Gas: 15000000000000000 wei
      Authorize Minter: true
      Using Nonce: 20
      TX: 0x9d14f694da0ca5ca530850c22ac10a2b0e2bcbcbd0d7c2dbe182dd6f24fe7cfc
      ✅ Configured!

[VERIFICATION] Checking Configuration...
═══════════════════════════════════════════════════════
   Chain 369: Configured ✅ | Minter ✅
   Chain 8453: Configured ✅ | Minter ✅
   Chain 42161: Configured ✅ | Minter ✅
   Chain 10: Configured ✅ | Minter ✅
   Chain 137: Configured ✅ | Minter ✅
   Chain 43114: Configured ✅ | Minter ✅

✅ ALL ROUTES CONFIGURED FOR HOA ON BNB!
═══════════════════════════════════════════════════════
   📋 Configured 6 remote chains.

   📋 Next Steps:
   Run this script on ALL other chains with HOA deployments:
      npx hardhat run scripts/pre-audit-scripts/configure-all-routes.js --network pulsechain HOA
      npx hardhat run scripts/pre-audit-scripts/configure-all-routes.js --network base HOA
      npx hardhat run scripts/pre-audit-scripts/configure-all-routes.js --network arbitrum HOA
      npx hardhat run scripts/pre-audit-scripts/configure-all-routes.js --network optimism HOA
      npx hardhat run scripts/pre-audit-scripts/configure-all-routes.js --network polygon HOA
      npx hardhat run scripts/pre-audit-scripts/configure-all-routes.js --network avalanche HOA
Ganadhishs-MacBook-Air:multi-chain-with-via ganadhish$ npx hardhat run scripts/pre-audit-scripts/configure-all-routes.js --network polygon

🌐 CONFIGURE ALL ROUTES (Pre-Audit Contracts)
═══════════════════════════════════════════════════════
📍 Network: polygon (Chain ID: 137)
👤 Signer: 0x05F8cC8753D90d67DBB8c02118440b8283F941c9
🎯 Token: HOA

📍 Current Contract: 0x6B7c81207240a38e03E5e9B138C53c4762515cCD
   Type: synthetic
   MessageV3: 0x1C5800eb5fECB7760D7F1978ad744feA652a7b27
   Wrapped Gas Token: 0x0d500B1d8E8eF31E21C99d1Db9A6444d3ADf1270

🌐 Remote Chains to Configure (6 total):
   - Chain 369 (PulseChain): 0xc7dA00db476E18231079Fbf61D67930314EA5b26 [collateral]
   - Chain 8453 (Base): 0x421b1c25b5Cd1766Aa17d01133a548C28D00b726 [synthetic]
   - Chain 42161 (Arbitrum): 0x1F031F7A2652fD6f10F1FB37BEfaac8A69039f08 [synthetic]
   - Chain 10 (Optimism): 0x0AD73370Ca2e1b7667B568d20f25eF0864227bFC [synthetic]
   - Chain 56 (BNB Chain): 0xc1Bb27E7AE8af9164Cb6B5D3A465478415EdEbB7 [synthetic]
   - Chain 43114 (Avalanche): 0xc14441CBD763FBad2Db823CCa77AFAdeCbcdd0c4 [synthetic]

[STEP 1/2] Configuring MessageClient...
═══════════════════════════════════════════════════════
   MessageV3: 0x1C5800eb5fECB7760D7F1978ad744feA652a7b27
   Remote Chains: [369, 8453, 42161, 10, 56, 43114]
   Confirmations: 15
   Using Nonce: 59
   TX: 0x97f72e47aac081073c901f9252e0e83f94d3d2ddbb5cc3c11d597da26b9e78fb
   ✅ MessageClient configured!

[STEP 2/2] Configuring Remote Chains...
═══════════════════════════════════════════════════════

   🌐 Chain 369 (PulseChain):
      Remote Contract: 0xc7dA00db476E18231079Fbf61D67930314EA5b26
      Wrapped Gas Token: 0x0d500B1d8E8eF31E21C99d1Db9A6444d3ADf1270
      Protocol Fee: 0.12 USDC
      VIA Source Fee: 0.25 USDC
      VIA Dest Gas: 80000000000000000000 wei
      Authorize Minter: true
      Using Nonce: 60
      TX: 0x576544e14438863c343c0a295740724877485c7bce8c07eda61bf3aa3aa97043
      ✅ Configured!

   🌐 Chain 8453 (Base):
      Remote Contract: 0x421b1c25b5Cd1766Aa17d01133a548C28D00b726
      Wrapped Gas Token: 0x0d500B1d8E8eF31E21C99d1Db9A6444d3ADf1270
      Protocol Fee: 0.12 USDC
      VIA Source Fee: 0.25 USDC
      VIA Dest Gas: 30000000000000 wei
      Authorize Minter: true
      Using Nonce: 61
      TX: 0x07f9b1a2fe837db8e4ed7eb7280fb5ed6c2083c44211da890f5187ceae2c70d9
      ✅ Configured!

   🌐 Chain 42161 (Arbitrum):
      Remote Contract: 0x1F031F7A2652fD6f10F1FB37BEfaac8A69039f08
      Wrapped Gas Token: 0x0d500B1d8E8eF31E21C99d1Db9A6444d3ADf1270
      Protocol Fee: 0.12 USDC
      VIA Source Fee: 0.25 USDC
      VIA Dest Gas: 30000000000000 wei
      Authorize Minter: true
      Using Nonce: 62
      TX: 0xfd7bbb19d2e014e327ab9cc7d560146727389f7266beb5501d795ab5287aec66
      ✅ Configured!

   🌐 Chain 10 (Optimism):
      Remote Contract: 0x0AD73370Ca2e1b7667B568d20f25eF0864227bFC
      Wrapped Gas Token: 0x0d500B1d8E8eF31E21C99d1Db9A6444d3ADf1270
      Protocol Fee: 0.12 USDC
      VIA Source Fee: 0.25 USDC
      VIA Dest Gas: 30000000000000 wei
      Authorize Minter: true
      Using Nonce: 63
      TX: 0xb74f35b945525b05cf033949b905100841d61107d606b316c166cbe591b60fdf
      ✅ Configured!

   🌐 Chain 56 (BNB Chain):
      Remote Contract: 0xc1Bb27E7AE8af9164Cb6B5D3A465478415EdEbB7
      Wrapped Gas Token: 0x0d500B1d8E8eF31E21C99d1Db9A6444d3ADf1270
      Protocol Fee: 0.12 USDC
      VIA Source Fee: 0.25 USDC
      VIA Dest Gas: 1500000000000000 wei
      Authorize Minter: true
      Using Nonce: 64
      TX: 0x0c4376b697e67cf43f6185d1d90ee2907851222da411ff5f570403bddcff3650
      ✅ Configured!

   🌐 Chain 43114 (Avalanche):
      Remote Contract: 0xc14441CBD763FBad2Db823CCa77AFAdeCbcdd0c4
      Wrapped Gas Token: 0x0d500B1d8E8eF31E21C99d1Db9A6444d3ADf1270
      Protocol Fee: 0.12 USDC
      VIA Source Fee: 0.25 USDC
      VIA Dest Gas: 15000000000000000 wei
      Authorize Minter: true
      Using Nonce: 65
      TX: 0x9671bf3b35d4d7326a4dda0d1c95a6ddcac6d61184deecf1592f0921b5e8ecfa
      ✅ Configured!

[VERIFICATION] Checking Configuration...
═══════════════════════════════════════════════════════
   Chain 369: Configured ✅ | Minter ✅
   Chain 8453: Configured ✅ | Minter ✅
   Chain 42161: Configured ✅ | Minter ✅
   Chain 10: Configured ✅ | Minter ✅
   Chain 56: Configured ✅ | Minter ✅
   Chain 43114: Configured ✅ | Minter ✅

✅ ALL ROUTES CONFIGURED FOR HOA ON POLYGON!
═══════════════════════════════════════════════════════
   📋 Configured 6 remote chains.

   📋 Next Steps:
   Run this script on ALL other chains with HOA deployments:
      npx hardhat run scripts/pre-audit-scripts/configure-all-routes.js --network pulsechain HOA
      npx hardhat run scripts/pre-audit-scripts/configure-all-routes.js --network base HOA
      npx hardhat run scripts/pre-audit-scripts/configure-all-routes.js --network arbitrum HOA
      npx hardhat run scripts/pre-audit-scripts/configure-all-routes.js --network optimism HOA
      npx hardhat run scripts/pre-audit-scripts/configure-all-routes.js --network bnb HOA
      npx hardhat run scripts/pre-audit-scripts/configure-all-routes.js --network avalanche HOA
Ganadhishs-MacBook-Air:multi-chain-with-via ganadhish$ npx hardhat run scripts/pre-audit-scripts/configure-all-routes.js --network avalanche

🌐 CONFIGURE ALL ROUTES (Pre-Audit Contracts)
═══════════════════════════════════════════════════════
📍 Network: avalanche (Chain ID: 43114)
👤 Signer: 0x05F8cC8753D90d67DBB8c02118440b8283F941c9
🎯 Token: HOA

📍 Current Contract: 0xc14441CBD763FBad2Db823CCa77AFAdeCbcdd0c4
   Type: synthetic
   MessageV3: 0x72E052Fa7f0788e668965d37B6c38C88703B7859
   Wrapped Gas Token: 0xB31f66AA3C1e785363F0875A1B74E27b85FD66c7

🌐 Remote Chains to Configure (6 total):
   - Chain 369 (PulseChain): 0xc7dA00db476E18231079Fbf61D67930314EA5b26 [collateral]
   - Chain 8453 (Base): 0x421b1c25b5Cd1766Aa17d01133a548C28D00b726 [synthetic]
   - Chain 42161 (Arbitrum): 0x1F031F7A2652fD6f10F1FB37BEfaac8A69039f08 [synthetic]
   - Chain 10 (Optimism): 0x0AD73370Ca2e1b7667B568d20f25eF0864227bFC [synthetic]
   - Chain 56 (BNB Chain): 0xc1Bb27E7AE8af9164Cb6B5D3A465478415EdEbB7 [synthetic]
   - Chain 137 (Polygon): 0x6B7c81207240a38e03E5e9B138C53c4762515cCD [synthetic]

[STEP 1/2] Configuring MessageClient...
═══════════════════════════════════════════════════════
   MessageV3: 0x72E052Fa7f0788e668965d37B6c38C88703B7859
   Remote Chains: [369, 8453, 42161, 10, 56, 137]
   Confirmations: 15
   Using Nonce: 10
   TX: 0xb845cae9bd584265a38312f9c873ab38409577c4d96a68dd558b906e460024f3
   ✅ MessageClient configured!

[STEP 2/2] Configuring Remote Chains...
═══════════════════════════════════════════════════════

   🌐 Chain 369 (PulseChain):
      Remote Contract: 0xc7dA00db476E18231079Fbf61D67930314EA5b26
      Wrapped Gas Token: 0xB31f66AA3C1e785363F0875A1B74E27b85FD66c7
      Protocol Fee: 0.12 USDC
      VIA Source Fee: 0.25 USDC
      VIA Dest Gas: 80000000000000000000 wei
      Authorize Minter: true
      Using Nonce: 11
      TX: 0xfe45c9b3d8bf961f23dc2a4cc5d32a904d9b48d84580fbc18ce0a41007799b76
      ✅ Configured!

   🌐 Chain 8453 (Base):
      Remote Contract: 0x421b1c25b5Cd1766Aa17d01133a548C28D00b726
      Wrapped Gas Token: 0xB31f66AA3C1e785363F0875A1B74E27b85FD66c7
      Protocol Fee: 0.12 USDC
      VIA Source Fee: 0.25 USDC
      VIA Dest Gas: 30000000000000 wei
      Authorize Minter: true
      Using Nonce: 12
      TX: 0x07867964b85927ce3b83dc9f0e8f9bbdf4fef0975f10e8340c3379ceda5629af
      ✅ Configured!

   🌐 Chain 42161 (Arbitrum):
      Remote Contract: 0x1F031F7A2652fD6f10F1FB37BEfaac8A69039f08
      Wrapped Gas Token: 0xB31f66AA3C1e785363F0875A1B74E27b85FD66c7
      Protocol Fee: 0.12 USDC
      VIA Source Fee: 0.25 USDC
      VIA Dest Gas: 30000000000000 wei
      Authorize Minter: true
      Using Nonce: 13
      TX: 0x8d67ce73098aa2834e438a7c5523554c23fc2cdc52cea112453caea419eb9dc9
      ✅ Configured!

   🌐 Chain 10 (Optimism):
      Remote Contract: 0x0AD73370Ca2e1b7667B568d20f25eF0864227bFC
      Wrapped Gas Token: 0xB31f66AA3C1e785363F0875A1B74E27b85FD66c7
      Protocol Fee: 0.12 USDC
      VIA Source Fee: 0.25 USDC
      VIA Dest Gas: 30000000000000 wei
      Authorize Minter: true
      Using Nonce: 14
      TX: 0x7cc3236cefe0f1a859daa953f5756039b9bc94883d0d3429786324f494097cc6

TOKEN_SYMBOL=HOA DEST_CHAIN=optimism npx hardhat run scripts/pre-audit-scripts/configure-chain.js --network avalanche

🔧 CONFIGURING DESTINATION CHAIN (Pre-Audit)
═══════════════════════════════════════════════════════
📍 Current Network: avalanche (Chain ID: 43114)
👤 Signer: 0x05F8cC8753D90d67DBB8c02118440b8283F941c9
🎯 Token: HOA
🌐 Destination Chain: optimism

📍 Current Contract: 0xc14441CBD763FBad2Db823CCa77AFAdeCbcdd0c4
   Type: synthetic

🌐 Destination Contract: 0x0AD73370Ca2e1b7667B568d20f25eF0864227bFC
   Chain ID: 10
   Type: synthetic

⚙️  Configuration Parameters:
   Remote Contract: 0x0AD73370Ca2e1b7667B568d20f25eF0864227bFC
   Wrapped Gas Token (local): 0xB31f66AA3C1e785363F0875A1B74E27b85FD66c7
   Protocol Fee: 0.12 USDC
   VIA Source Fee: 0.25 USDC
   VIA Dest Gas: 30000000000000 wei
   Supported: true
   Authorize Minter: true

⏳ Configuring chain 10...
   TX Sent: 0x50b18cd56b2e80a7f77b8ad32c08f7b85afc95e64789bc0f7ed964bea74f1a72
   Waiting for confirmation...
   ✅ Chain 10 configured! Block: 75742497

🔍 Verifying configuration...
   Chain 10 configured: ✅
   Minter authorized: ✅ (Expected: true)
   Protocol Fee: 0.12 USDC
   VIA Source Fee: 0.25 USDC

📋 Next Steps:
   1. Run this script on the destination chain (optimism) pointing back here
   2. Test bridging with bridge-to-destination.js

✅ Chain configuration complete!
Ganadhishs-MacBook-Air:multi-chain-with-via ganadhish$ TOKEN_SYMBOL=HOA DEST_CHAIN=bnb npx hardhat run scripts/pre
-audit-scripts/configure-chain.js --network avalanche

🔧 CONFIGURING DESTINATION CHAIN (Pre-Audit)
═══════════════════════════════════════════════════════
📍 Current Network: avalanche (Chain ID: 43114)
👤 Signer: 0x05F8cC8753D90d67DBB8c02118440b8283F941c9
🎯 Token: HOA
🌐 Destination Chain: bnb

📍 Current Contract: 0xc14441CBD763FBad2Db823CCa77AFAdeCbcdd0c4
   Type: synthetic

🌐 Destination Contract: 0xc1Bb27E7AE8af9164Cb6B5D3A465478415EdEbB7
   Chain ID: 56
   Type: synthetic

⚙️  Configuration Parameters:
   Remote Contract: 0xc1Bb27E7AE8af9164Cb6B5D3A465478415EdEbB7
   Wrapped Gas Token (local): 0xB31f66AA3C1e785363F0875A1B74E27b85FD66c7
   Protocol Fee: 0.12 USDC
   VIA Source Fee: 0.25 USDC
   VIA Dest Gas: 1500000000000000 wei
   Supported: true
   Authorize Minter: true

⏳ Configuring chain 56...
   TX Sent: 0x17be80371ef5cd12d3cccf81ba1e1afb98e080411e5ea87bd617921f5c74ad3b
   Waiting for confirmation...
   ✅ Chain 56 configured! Block: 75742607

🔍 Verifying configuration...
   Chain 56 configured: ✅
   Minter authorized: ✅ (Expected: true)
   Protocol Fee: 0.12 USDC
   VIA Source Fee: 0.25 USDC

📋 Next Steps:
   1. Run this script on the destination chain (bnb) pointing back here
   2. Test bridging with bridge-to-destination.js

✅ Chain configuration complete!
Ganadhishs-MacBook-Air:multi-chain-with-via ganadhish$ TOKEN_SYMBOL=HOA DEST_CHAIN=polygon npx hardhat run scripts
/pre-audit-scripts/configure-chain.js --network avalanche

🔧 CONFIGURING DESTINATION CHAIN (Pre-Audit)
═══════════════════════════════════════════════════════
📍 Current Network: avalanche (Chain ID: 43114)
👤 Signer: 0x05F8cC8753D90d67DBB8c02118440b8283F941c9
🎯 Token: HOA
🌐 Destination Chain: polygon

📍 Current Contract: 0xc14441CBD763FBad2Db823CCa77AFAdeCbcdd0c4
   Type: synthetic

🌐 Destination Contract: 0x6B7c81207240a38e03E5e9B138C53c4762515cCD
   Chain ID: 137
   Type: synthetic

⚙️  Configuration Parameters:
   Remote Contract: 0x6B7c81207240a38e03E5e9B138C53c4762515cCD
   Wrapped Gas Token (local): 0xB31f66AA3C1e785363F0875A1B74E27b85FD66c7
   Protocol Fee: 0.12 USDC
   VIA Source Fee: 0.25 USDC
   VIA Dest Gas: 30000000000000000 wei
   Supported: true
   Authorize Minter: true

⏳ Configuring chain 137...
   TX Sent: 0x9ef0a8165c84ef1b569a88d51705f1d4add3f06b727f38f3276301697fa69bbe
   Waiting for confirmation...
   ✅ Chain 137 configured! Block: 75742671

🔍 Verifying configuration...
   Chain 137 configured: ✅
   Minter authorized: ✅ (Expected: true)
   Protocol Fee: 0.12 USDC
   VIA Source Fee: 0.25 USDC

📋 Next Steps:
   1. Run this script on the destination chain (polygon) pointing back here
   2. Test bridging with bridge-to-destination.js

✅ Chain configuration complete!


____________________________________________________________________________________

___________________________________________
ALL SYNTHETIC CHAINS CONFIG FOR COCK TOKEN: 
-------------------------------------------
npx hardhat run scripts/pre-audit-scripts/configure-all-routes.js --network pulsechain

🌐 CONFIGURE ALL ROUTES (Pre-Audit Contracts)
═══════════════════════════════════════════════════════
📍 Network: pulsechain (Chain ID: 369)
👤 Signer: 0x05F8cC8753D90d67DBB8c02118440b8283F941c9
🎯 Token: COCK

📍 Current Contract: 0x12b42e964294dCF79f44E11FB4A9c23698f475d4
   Type: collateral
   MessageV3: 0xba01F2bA548e69bA26Fd06a3bdf1A7857eeAC435
   Wrapped Gas Token: 0xA1077a294dDE1B09bB078844df40758a5D0f9a27

🌐 Remote Chains to Configure (6 total):
   - Chain 8453 (Base): 0xE78C3473B59156416994b57bC261a51fFbEee4FA [synthetic]
   - Chain 42161 (Arbitrum): 0x33dD4fEE8555263178a7ffD8bf7522BA2E6C33a3 [synthetic]
   - Chain 10 (Optimism): 0xb50Dd86bB594C3d7FBA44045F4a90f8eb12B5935 [synthetic]
   - Chain 56 (BNB Chain): 0xce032ac88ad11E6f8374B3760F5a98a77c6584f0 [synthetic]
   - Chain 137 (Polygon): 0xd7dDc57fC9eCFd0fb9E0773Eb80276fe62B0Fc93 [synthetic]
   - Chain 43114 (Avalanche): 0x46763657C2e4845C4f72c7Cce605B3cB3309fd2f [synthetic]

[STEP 1/2] Configuring MessageClient...
═══════════════════════════════════════════════════════
   MessageV3: 0xba01F2bA548e69bA26Fd06a3bdf1A7857eeAC435
   Remote Chains: [8453, 42161, 10, 56, 137, 43114]
   Confirmations: 15
   Using Nonce: 696
   TX: 0x362093d906477d672bf3a6f38eeeccfa734df01862afb856c371af23ce19ca86
   ✅ MessageClient configured!

[STEP 2/2] Configuring Remote Chains...
═══════════════════════════════════════════════════════

   🌐 Chain 8453 (Base):
      Remote Contract: 0xE78C3473B59156416994b57bC261a51fFbEee4FA
      Wrapped Gas Token: 0xA1077a294dDE1B09bB078844df40758a5D0f9a27
      Protocol Fee: 0.12 USDC
      VIA Source Fee: 0.25 USDC
      VIA Dest Gas: 30000000000000 wei
      Using Nonce: 697
      TX: 0xb377679c5f4a66a1b12ed2f5f6415b07bb932edd402fe59fca8a0c2dee73ee80
      ✅ Configured!

   🌐 Chain 42161 (Arbitrum):
      Remote Contract: 0x33dD4fEE8555263178a7ffD8bf7522BA2E6C33a3
      Wrapped Gas Token: 0xA1077a294dDE1B09bB078844df40758a5D0f9a27
      Protocol Fee: 0.12 USDC
      VIA Source Fee: 0.25 USDC
      VIA Dest Gas: 30000000000000 wei
      Using Nonce: 698
      TX: 0x8f722f2d8dcda950e52953d3453762331258d2f84c69e3038b043aeee3ffd441
      ✅ Configured!

   🌐 Chain 10 (Optimism):
      Remote Contract: 0xb50Dd86bB594C3d7FBA44045F4a90f8eb12B5935
      Wrapped Gas Token: 0xA1077a294dDE1B09bB078844df40758a5D0f9a27
      Protocol Fee: 0.12 USDC
      VIA Source Fee: 0.25 USDC
      VIA Dest Gas: 30000000000000 wei
      Using Nonce: 699
      TX: 0x8e8837bfa29f37b721cf41a3629335b63514bf7b3a3382631956e01b39bf5769
      ✅ Configured!

   🌐 Chain 56 (BNB Chain):
      Remote Contract: 0xce032ac88ad11E6f8374B3760F5a98a77c6584f0
      Wrapped Gas Token: 0xA1077a294dDE1B09bB078844df40758a5D0f9a27
      Protocol Fee: 0.12 USDC
      VIA Source Fee: 0.25 USDC
      VIA Dest Gas: 1500000000000000 wei
      Using Nonce: 700
      TX: 0x853be28d1552d88bb93f0fad543365d6d3fd56e3283e809d6a6445e4e85b260c
      ✅ Configured!

   🌐 Chain 137 (Polygon):
      Remote Contract: 0xd7dDc57fC9eCFd0fb9E0773Eb80276fe62B0Fc93
      Wrapped Gas Token: 0xA1077a294dDE1B09bB078844df40758a5D0f9a27
      Protocol Fee: 0.12 USDC
      VIA Source Fee: 0.25 USDC
      VIA Dest Gas: 30000000000000000 wei
      Using Nonce: 701
      TX: 0x4621ffa55dbff89a2e6544b50945fe706b343b5312ca1847f759f0799d583077
      ✅ Configured!

   🌐 Chain 43114 (Avalanche):
      Remote Contract: 0x46763657C2e4845C4f72c7Cce605B3cB3309fd2f
      Wrapped Gas Token: 0xA1077a294dDE1B09bB078844df40758a5D0f9a27
      Protocol Fee: 0.12 USDC
      VIA Source Fee: 0.25 USDC
      VIA Dest Gas: 15000000000000000 wei
      Using Nonce: 702
      TX: 0x7a626488406294682dbc59c72338bbacdba8e0693675f47dd7fd66ca069afbec
      ✅ Configured!

[VERIFICATION] Checking Configuration...
═══════════════════════════════════════════════════════
   Chain 8453: Configured ✅
   Chain 42161: Configured ✅
   Chain 10: Configured ✅
   Chain 56: Configured ✅
   Chain 137: Configured ✅
   Chain 43114: Configured ✅

✅ ALL ROUTES CONFIGURED FOR COCK ON PULSECHAIN!
═══════════════════════════════════════════════════════
   📋 Configured 6 remote chains.

   📋 Next Steps:
   Run this script on ALL other chains with COCK deployments:
      npx hardhat run scripts/pre-audit-scripts/configure-all-routes.js --network base COCK
      npx hardhat run scripts/pre-audit-scripts/configure-all-routes.js --network arbitrum COCK
      npx hardhat run scripts/pre-audit-scripts/configure-all-routes.js --network optimism COCK
      npx hardhat run scripts/pre-audit-scripts/configure-all-routes.js --network bnb COCK
      npx hardhat run scripts/pre-audit-scripts/configure-all-routes.js --network polygon COCK
      npx hardhat run scripts/pre-audit-scripts/configure-all-routes.js --network avalanche COCK
Ganadhishs-MacBook-Air:multi-chain-with-via ganadhish$ npx hardhat run scripts/pre-audit-scripts/configure-all-routes.js --network base

🌐 CONFIGURE ALL ROUTES (Pre-Audit Contracts)
═══════════════════════════════════════════════════════
📍 Network: base (Chain ID: 8453)
👤 Signer: 0x05F8cC8753D90d67DBB8c02118440b8283F941c9
🎯 Token: COCK

📍 Current Contract: 0xE78C3473B59156416994b57bC261a51fFbEee4FA
   Type: synthetic
   MessageV3: 0xe3b3274bb685F37C7f17a604039c77a6A16Cfc2a
   Wrapped Gas Token: 0x4200000000000000000000000000000000000006

🌐 Remote Chains to Configure (6 total):
   - Chain 369 (PulseChain): 0x12b42e964294dCF79f44E11FB4A9c23698f475d4 [collateral]
   - Chain 42161 (Arbitrum): 0x33dD4fEE8555263178a7ffD8bf7522BA2E6C33a3 [synthetic]
   - Chain 10 (Optimism): 0xb50Dd86bB594C3d7FBA44045F4a90f8eb12B5935 [synthetic]
   - Chain 56 (BNB Chain): 0xce032ac88ad11E6f8374B3760F5a98a77c6584f0 [synthetic]
   - Chain 137 (Polygon): 0xd7dDc57fC9eCFd0fb9E0773Eb80276fe62B0Fc93 [synthetic]
   - Chain 43114 (Avalanche): 0x46763657C2e4845C4f72c7Cce605B3cB3309fd2f [synthetic]

[STEP 1/2] Configuring MessageClient...
═══════════════════════════════════════════════════════
   MessageV3: 0xe3b3274bb685F37C7f17a604039c77a6A16Cfc2a
   Remote Chains: [369, 42161, 10, 56, 137, 43114]
   Confirmations: 15
   Using Nonce: 463
   TX: 0x3f83544888468f8f27829c9abde79c7fa4e9d2c80784374a1d58b4aa739aae6f
   ✅ MessageClient configured!

[STEP 2/2] Configuring Remote Chains...
═══════════════════════════════════════════════════════

   🌐 Chain 369 (PulseChain):
      Remote Contract: 0x12b42e964294dCF79f44E11FB4A9c23698f475d4
      Wrapped Gas Token: 0x4200000000000000000000000000000000000006
      Protocol Fee: 0.12 USDC
      VIA Source Fee: 0.25 USDC
      VIA Dest Gas: 80000000000000000000 wei
      Authorize Minter: true
      Using Nonce: 463
      ❌ Failed: nonce too low: next nonce 464, tx nonce 463

   🌐 Chain 42161 (Arbitrum):
      Remote Contract: 0x33dD4fEE8555263178a7ffD8bf7522BA2E6C33a3
      Wrapped Gas Token: 0x4200000000000000000000000000000000000006
      Protocol Fee: 0.12 USDC
      VIA Source Fee: 0.25 USDC
      VIA Dest Gas: 30000000000000 wei
      Authorize Minter: true
      Using Nonce: 464
      TX: 0x4b4b4095c36b1aff3cbde78e1f059a76a482b67740ef936ae26df9149b0456bf
      ✅ Configured!

   🌐 Chain 10 (Optimism):
      Remote Contract: 0xb50Dd86bB594C3d7FBA44045F4a90f8eb12B5935
      Wrapped Gas Token: 0x4200000000000000000000000000000000000006
      Protocol Fee: 0.12 USDC
      VIA Source Fee: 0.25 USDC
      VIA Dest Gas: 30000000000000 wei
      Authorize Minter: true
      Using Nonce: 465
      TX: 0x185904fde328f14801078fadb7e82d255780053859a76bdc8f038843fbdf4831
      ✅ Configured!

   🌐 Chain 56 (BNB Chain):
      Remote Contract: 0xce032ac88ad11E6f8374B3760F5a98a77c6584f0
      Wrapped Gas Token: 0x4200000000000000000000000000000000000006
      Protocol Fee: 0.12 USDC
      VIA Source Fee: 0.25 USDC
      VIA Dest Gas: 1500000000000000 wei
      Authorize Minter: true
      Using Nonce: 466
      TX: 0xeac2f140be074e41372a05883093e2e6ee8ea63b5f2b6748ca450d62da75b30b
      ✅ Configured!

   🌐 Chain 137 (Polygon):
      Remote Contract: 0xd7dDc57fC9eCFd0fb9E0773Eb80276fe62B0Fc93
      Wrapped Gas Token: 0x4200000000000000000000000000000000000006
      Protocol Fee: 0.12 USDC
      VIA Source Fee: 0.25 USDC
      VIA Dest Gas: 30000000000000000 wei
      Authorize Minter: true
      Using Nonce: 467
      TX: 0xb4978e8f7bf0abf8030dbd7f594ba584a7668c7bfc91590ff0dae914bb78037e
      ✅ Configured!

   🌐 Chain 43114 (Avalanche):
      Remote Contract: 0x46763657C2e4845C4f72c7Cce605B3cB3309fd2f
      Wrapped Gas Token: 0x4200000000000000000000000000000000000006
      Protocol Fee: 0.12 USDC
      VIA Source Fee: 0.25 USDC
      VIA Dest Gas: 15000000000000000 wei
      Authorize Minter: true
      Using Nonce: 468
      TX: 0x590e906dd58fbf19e3b3c875434848f1972c517e07660c953c00aa2ca956e4a6
      ✅ Configured!

[VERIFICATION] Checking Configuration...
═══════════════════════════════════════════════════════
   Chain 369: Configured ❌ | Minter ❌
   Chain 42161: Configured ✅ | Minter ✅
   Chain 10: Configured ✅ | Minter ✅
   Chain 56: Configured ✅ | Minter ✅
   Chain 137: Configured ✅ | Minter ✅
   Chain 43114: Configured ✅ | Minter ✅

✅ ALL ROUTES CONFIGURED FOR COCK ON BASE!
═══════════════════════════════════════════════════════
   📋 Configured 6 remote chains.

   📋 Next Steps:
   Run this script on ALL other chains with COCK deployments:
      npx hardhat run scripts/pre-audit-scripts/configure-all-routes.js --network pulsechain COCK
      npx hardhat run scripts/pre-audit-scripts/configure-all-routes.js --network arbitrum COCK
      npx hardhat run scripts/pre-audit-scripts/configure-all-routes.js --network optimism COCK
      npx hardhat run scripts/pre-audit-scripts/configure-all-routes.js --network bnb COCK
      npx hardhat run scripts/pre-audit-scripts/configure-all-routes.js --network polygon COCK
      npx hardhat run scripts/pre-audit-scripts/configure-all-routes.js --network avalanche COCK
Ganadhishs-MacBook-Air:multi-chain-with-via ganadhish$ npx hardhat run scripts/pre-audit-scripts/configure-all-routes.js --network arbitrum

🌐 CONFIGURE ALL ROUTES (Pre-Audit Contracts)
═══════════════════════════════════════════════════════
📍 Network: arbitrum (Chain ID: 42161)
👤 Signer: 0x05F8cC8753D90d67DBB8c02118440b8283F941c9
🎯 Token: COCK

📍 Current Contract: 0x33dD4fEE8555263178a7ffD8bf7522BA2E6C33a3
   Type: synthetic
   MessageV3: 0x65EEc58ef38882422E887B82f7085e9a9C35dCA1
   Wrapped Gas Token: 0x82aF49447D8a07e3bd95BD0d56f35241523fBab1

🌐 Remote Chains to Configure (6 total):
   - Chain 369 (PulseChain): 0x12b42e964294dCF79f44E11FB4A9c23698f475d4 [collateral]
   - Chain 8453 (Base): 0xE78C3473B59156416994b57bC261a51fFbEee4FA [synthetic]
   - Chain 10 (Optimism): 0xb50Dd86bB594C3d7FBA44045F4a90f8eb12B5935 [synthetic]
   - Chain 56 (BNB Chain): 0xce032ac88ad11E6f8374B3760F5a98a77c6584f0 [synthetic]
   - Chain 137 (Polygon): 0xd7dDc57fC9eCFd0fb9E0773Eb80276fe62B0Fc93 [synthetic]
   - Chain 43114 (Avalanche): 0x46763657C2e4845C4f72c7Cce605B3cB3309fd2f [synthetic]

[STEP 1/2] Configuring MessageClient...
═══════════════════════════════════════════════════════
   MessageV3: 0x65EEc58ef38882422E887B82f7085e9a9C35dCA1
   Remote Chains: [369, 8453, 10, 56, 137, 43114]
   Confirmations: 15
   Using Nonce: 119
   TX: 0x963fbdf9873281e1fbde9e47c4668cc6f4314c1a81d2d55a03e1bcbb28483b58
   ✅ MessageClient configured!

[STEP 2/2] Configuring Remote Chains...
═══════════════════════════════════════════════════════

   🌐 Chain 369 (PulseChain):
      Remote Contract: 0x12b42e964294dCF79f44E11FB4A9c23698f475d4
      Wrapped Gas Token: 0x82aF49447D8a07e3bd95BD0d56f35241523fBab1
      Protocol Fee: 0.12 USDC
      VIA Source Fee: 0.25 USDC
      VIA Dest Gas: 80000000000000000000 wei
      Authorize Minter: true
      Using Nonce: 120
      TX: 0x5597408cfe5c23e0edf16a33674656eddcd2290f460436196d6a8d8ba5963bad
      ✅ Configured!

   🌐 Chain 8453 (Base):
      Remote Contract: 0xE78C3473B59156416994b57bC261a51fFbEee4FA
      Wrapped Gas Token: 0x82aF49447D8a07e3bd95BD0d56f35241523fBab1
      Protocol Fee: 0.12 USDC
      VIA Source Fee: 0.25 USDC
      VIA Dest Gas: 30000000000000 wei
      Authorize Minter: true
      Using Nonce: 121
      TX: 0x6bba18c6bbfcf380da8a123a9cfd07629028050322701f69920f11c792d9438f
      ✅ Configured!

   🌐 Chain 10 (Optimism):
      Remote Contract: 0xb50Dd86bB594C3d7FBA44045F4a90f8eb12B5935
      Wrapped Gas Token: 0x82aF49447D8a07e3bd95BD0d56f35241523fBab1
      Protocol Fee: 0.12 USDC
      VIA Source Fee: 0.25 USDC
      VIA Dest Gas: 30000000000000 wei
      Authorize Minter: true
      Using Nonce: 122
      TX: 0x39649974fd71f294e995a84cd884887019b9c7f2ebf8a1604ec9ac5f14b923ce
      ✅ Configured!

   🌐 Chain 56 (BNB Chain):
      Remote Contract: 0xce032ac88ad11E6f8374B3760F5a98a77c6584f0
      Wrapped Gas Token: 0x82aF49447D8a07e3bd95BD0d56f35241523fBab1
      Protocol Fee: 0.12 USDC
      VIA Source Fee: 0.25 USDC
      VIA Dest Gas: 1500000000000000 wei
      Authorize Minter: true
      Using Nonce: 123
      TX: 0xdc05a9598edcc48108a86fa3effbb371d0ce5f8aecc7fcff5ee8cd544b2dead7
      ✅ Configured!

   🌐 Chain 137 (Polygon):
      Remote Contract: 0xd7dDc57fC9eCFd0fb9E0773Eb80276fe62B0Fc93
      Wrapped Gas Token: 0x82aF49447D8a07e3bd95BD0d56f35241523fBab1
      Protocol Fee: 0.12 USDC
      VIA Source Fee: 0.25 USDC
      VIA Dest Gas: 30000000000000000 wei
      Authorize Minter: true
      Using Nonce: 124
      TX: 0x1a5d331cb2c68ee626f3912bb4b7301cc9da84bcf763e7b4ad3226be4c3d3476
      ✅ Configured!

   🌐 Chain 43114 (Avalanche):
      Remote Contract: 0x46763657C2e4845C4f72c7Cce605B3cB3309fd2f
      Wrapped Gas Token: 0x82aF49447D8a07e3bd95BD0d56f35241523fBab1
      Protocol Fee: 0.12 USDC
      VIA Source Fee: 0.25 USDC
      VIA Dest Gas: 15000000000000000 wei
      Authorize Minter: true
      Using Nonce: 125
      TX: 0xc4f9d7adf006ac54205b544c30461707b971b571af331cda83190fe93758419d
      ✅ Configured!

[VERIFICATION] Checking Configuration...
═══════════════════════════════════════════════════════
   Chain 369: Configured ✅ | Minter ✅
   Chain 8453: Configured ✅ | Minter ✅
   Chain 10: Configured ✅ | Minter ✅
   Chain 56: Configured ✅ | Minter ✅
   Chain 137: Configured ✅ | Minter ✅
   Chain 43114: Configured ✅ | Minter ✅

✅ ALL ROUTES CONFIGURED FOR COCK ON ARBITRUM!
═══════════════════════════════════════════════════════
   📋 Configured 6 remote chains.

   📋 Next Steps:
   Run this script on ALL other chains with COCK deployments:
      npx hardhat run scripts/pre-audit-scripts/configure-all-routes.js --network pulsechain COCK
      npx hardhat run scripts/pre-audit-scripts/configure-all-routes.js --network base COCK
      npx hardhat run scripts/pre-audit-scripts/configure-all-routes.js --network optimism COCK
      npx hardhat run scripts/pre-audit-scripts/configure-all-routes.js --network bnb COCK
      npx hardhat run scripts/pre-audit-scripts/configure-all-routes.js --network polygon COCK
      npx hardhat run scripts/pre-audit-scripts/configure-all-routes.js --network avalanche COCK
Ganadhishs-MacBook-Air:multi-chain-with-via ganadhish$ npx hardhat run scripts/pre-audit-scripts/configure-all-routes.js --network optimism

🌐 CONFIGURE ALL ROUTES (Pre-Audit Contracts)
═══════════════════════════════════════════════════════
📍 Network: optimism (Chain ID: 10)
👤 Signer: 0x05F8cC8753D90d67DBB8c02118440b8283F941c9
🎯 Token: COCK

📍 Current Contract: 0xb50Dd86bB594C3d7FBA44045F4a90f8eb12B5935
   Type: synthetic
   MessageV3: 0x15AC559DA4951c796DB6620fAb286B96840D039A
   Wrapped Gas Token: 0x4200000000000000000000000000000000000006

🌐 Remote Chains to Configure (6 total):
   - Chain 369 (PulseChain): 0x12b42e964294dCF79f44E11FB4A9c23698f475d4 [collateral]
   - Chain 8453 (Base): 0xE78C3473B59156416994b57bC261a51fFbEee4FA [synthetic]
   - Chain 42161 (Arbitrum): 0x33dD4fEE8555263178a7ffD8bf7522BA2E6C33a3 [synthetic]
   - Chain 56 (BNB Chain): 0xce032ac88ad11E6f8374B3760F5a98a77c6584f0 [synthetic]
   - Chain 137 (Polygon): 0xd7dDc57fC9eCFd0fb9E0773Eb80276fe62B0Fc93 [synthetic]
   - Chain 43114 (Avalanche): 0x46763657C2e4845C4f72c7Cce605B3cB3309fd2f [synthetic]

[STEP 1/2] Configuring MessageClient...
═══════════════════════════════════════════════════════
   MessageV3: 0x15AC559DA4951c796DB6620fAb286B96840D039A
   Remote Chains: [369, 8453, 42161, 56, 137, 43114]
   Confirmations: 15
   Using Nonce: 76
   TX: 0xfd5f2f1f64cef0cf21e62ca8947b10a8343231026187e0f53f4f9afb56d31097
   ✅ MessageClient configured!

[STEP 2/2] Configuring Remote Chains...
═══════════════════════════════════════════════════════

   🌐 Chain 369 (PulseChain):
      Remote Contract: 0x12b42e964294dCF79f44E11FB4A9c23698f475d4
      Wrapped Gas Token: 0x4200000000000000000000000000000000000006
      Protocol Fee: 0.12 USDC
      VIA Source Fee: 0.25 USDC
      VIA Dest Gas: 80000000000000000000 wei
      Authorize Minter: true
      Using Nonce: 77
      TX: 0x65887611cbb560b8e6178c4eb90d1f9fdf1e5e541ec6d36a1a8acba748ced6e5
      ✅ Configured!

   🌐 Chain 8453 (Base):
      Remote Contract: 0xE78C3473B59156416994b57bC261a51fFbEee4FA
      Wrapped Gas Token: 0x4200000000000000000000000000000000000006
      Protocol Fee: 0.12 USDC
      VIA Source Fee: 0.25 USDC
      VIA Dest Gas: 30000000000000 wei
      Authorize Minter: true
      Using Nonce: 78
      TX: 0xef15fe152ddc2bccd5f6f8dc745775ff180cfe51c67bee5e8eaf325e59f551fa
      ✅ Configured!

   🌐 Chain 42161 (Arbitrum):
      Remote Contract: 0x33dD4fEE8555263178a7ffD8bf7522BA2E6C33a3
      Wrapped Gas Token: 0x4200000000000000000000000000000000000006
      Protocol Fee: 0.12 USDC
      VIA Source Fee: 0.25 USDC
      VIA Dest Gas: 30000000000000 wei
      Authorize Minter: true
      Using Nonce: 79
      TX: 0x433e7880b6a171b41e0871022d6be49892c61b4b53e83e383ef2e1f73b706156
      ✅ Configured!

   🌐 Chain 56 (BNB Chain):
      Remote Contract: 0xce032ac88ad11E6f8374B3760F5a98a77c6584f0
      Wrapped Gas Token: 0x4200000000000000000000000000000000000006
      Protocol Fee: 0.12 USDC
      VIA Source Fee: 0.25 USDC
      VIA Dest Gas: 1500000000000000 wei
      Authorize Minter: true
      Using Nonce: 80
      TX: 0xa804b70572d26068cf01074c3a1d49fcc4e626d88d5c5f484327cf5f120ffbff
      ✅ Configured!

   🌐 Chain 137 (Polygon):
      Remote Contract: 0xd7dDc57fC9eCFd0fb9E0773Eb80276fe62B0Fc93
      Wrapped Gas Token: 0x4200000000000000000000000000000000000006
      Protocol Fee: 0.12 USDC
      VIA Source Fee: 0.25 USDC
      VIA Dest Gas: 30000000000000000 wei
      Authorize Minter: true
      Using Nonce: 81
      TX: 0x8f20bedf112ce9ed796cc8b3fc96bce987c75e57d9403fac24fdae902947edd0
      ✅ Configured!

   🌐 Chain 43114 (Avalanche):
      Remote Contract: 0x46763657C2e4845C4f72c7Cce605B3cB3309fd2f
      Wrapped Gas Token: 0x4200000000000000000000000000000000000006
      Protocol Fee: 0.12 USDC
      VIA Source Fee: 0.25 USDC
      VIA Dest Gas: 15000000000000000 wei
      Authorize Minter: true
      Using Nonce: 82
      TX: 0x724b5af31c92ea21f6388cecd98831c478e441e0777cd3bed37cfa84ac6825d2
      ✅ Configured!

[VERIFICATION] Checking Configuration...
═══════════════════════════════════════════════════════
   Chain 369: Configured ✅ | Minter ✅
   Chain 8453: Configured ✅ | Minter ✅
   Chain 42161: Configured ✅ | Minter ✅
   Chain 56: Configured ✅ | Minter ✅
   Chain 137: Configured ✅ | Minter ✅
   Chain 43114: Configured ✅ | Minter ✅

✅ ALL ROUTES CONFIGURED FOR COCK ON OPTIMISM!
═══════════════════════════════════════════════════════
   📋 Configured 6 remote chains.

   📋 Next Steps:
   Run this script on ALL other chains with COCK deployments:
      npx hardhat run scripts/pre-audit-scripts/configure-all-routes.js --network pulsechain COCK
      npx hardhat run scripts/pre-audit-scripts/configure-all-routes.js --network base COCK
      npx hardhat run scripts/pre-audit-scripts/configure-all-routes.js --network arbitrum COCK
      npx hardhat run scripts/pre-audit-scripts/configure-all-routes.js --network bnb COCK
      npx hardhat run scripts/pre-audit-scripts/configure-all-routes.js --network polygon COCK
      npx hardhat run scripts/pre-audit-scripts/configure-all-routes.js --network avalanche COCK
Ganadhishs-MacBook-Air:multi-chain-with-via ganadhish$ npx hardhat run scripts/pre-audit-scripts/configure-all-routes.js --network bnb

🌐 CONFIGURE ALL ROUTES (Pre-Audit Contracts)
═══════════════════════════════════════════════════════
📍 Network: bnb (Chain ID: 56)
👤 Signer: 0x05F8cC8753D90d67DBB8c02118440b8283F941c9
🎯 Token: COCK

📍 Current Contract: 0xce032ac88ad11E6f8374B3760F5a98a77c6584f0
   Type: synthetic
   MessageV3: 0x7b67dF6728E294db2eb173ac7c738a4627Ae5e11
   Wrapped Gas Token: 0xbb4CdB9CBd36B01bD1cBaEBF2De08d9173bc095c

🌐 Remote Chains to Configure (6 total):
   - Chain 369 (PulseChain): 0x12b42e964294dCF79f44E11FB4A9c23698f475d4 [collateral]
   - Chain 8453 (Base): 0xE78C3473B59156416994b57bC261a51fFbEee4FA [synthetic]
   - Chain 42161 (Arbitrum): 0x33dD4fEE8555263178a7ffD8bf7522BA2E6C33a3 [synthetic]
   - Chain 10 (Optimism): 0xb50Dd86bB594C3d7FBA44045F4a90f8eb12B5935 [synthetic]
   - Chain 137 (Polygon): 0xd7dDc57fC9eCFd0fb9E0773Eb80276fe62B0Fc93 [synthetic]
   - Chain 43114 (Avalanche): 0x46763657C2e4845C4f72c7Cce605B3cB3309fd2f [synthetic]

[STEP 1/2] Configuring MessageClient...
═══════════════════════════════════════════════════════
   MessageV3: 0x7b67dF6728E294db2eb173ac7c738a4627Ae5e11
   Remote Chains: [369, 8453, 42161, 10, 137, 43114]
   Confirmations: 15
   Using Nonce: 22
   TX: 0xce5076714828ab9fa0e8cd57588f4834326da6d3a38672b3800d67219cbf28a0
   ✅ MessageClient configured!

[STEP 2/2] Configuring Remote Chains...
═══════════════════════════════════════════════════════

   🌐 Chain 369 (PulseChain):
      Remote Contract: 0x12b42e964294dCF79f44E11FB4A9c23698f475d4
      Wrapped Gas Token: 0xbb4CdB9CBd36B01bD1cBaEBF2De08d9173bc095c
      Protocol Fee: 0.12 USDC
      VIA Source Fee: 0.25 USDC
      VIA Dest Gas: 80000000000000000000 wei
      Authorize Minter: true
      Using Nonce: 23
      TX: 0x6cdc1cae9b68e317e1c34c7ce4eabdcbe2df53696426a61834ef8cb2514d152b
      ✅ Configured!

   🌐 Chain 8453 (Base):
      Remote Contract: 0xE78C3473B59156416994b57bC261a51fFbEee4FA
      Wrapped Gas Token: 0xbb4CdB9CBd36B01bD1cBaEBF2De08d9173bc095c
      Protocol Fee: 0.12 USDC
      VIA Source Fee: 0.25 USDC
      VIA Dest Gas: 30000000000000 wei
      Authorize Minter: true
      Using Nonce: 24
      TX: 0xbe75293bf0a178235a3f2999ad3e953224ccaa6efe42f082ed3dcdb6acabbe4f
      ✅ Configured!

   🌐 Chain 42161 (Arbitrum):
      Remote Contract: 0x33dD4fEE8555263178a7ffD8bf7522BA2E6C33a3
      Wrapped Gas Token: 0xbb4CdB9CBd36B01bD1cBaEBF2De08d9173bc095c
      Protocol Fee: 0.12 USDC
      VIA Source Fee: 0.25 USDC
      VIA Dest Gas: 30000000000000 wei
      Authorize Minter: true
      Using Nonce: 25
      TX: 0x6cdf94e23687030e5a7c7459a0c3bbb6471590fdf392e4379b4e98a88163dab9
      ✅ Configured!

   🌐 Chain 10 (Optimism):
      Remote Contract: 0xb50Dd86bB594C3d7FBA44045F4a90f8eb12B5935
      Wrapped Gas Token: 0xbb4CdB9CBd36B01bD1cBaEBF2De08d9173bc095c
      Protocol Fee: 0.12 USDC
      VIA Source Fee: 0.25 USDC
      VIA Dest Gas: 30000000000000 wei
      Authorize Minter: true
      Using Nonce: 26
      TX: 0x2026c55e27279e14b5165c6c5a8149bb9a4943091378c0af75e5f34b3210d55a
      ✅ Configured!

   🌐 Chain 137 (Polygon):
      Remote Contract: 0xd7dDc57fC9eCFd0fb9E0773Eb80276fe62B0Fc93
      Wrapped Gas Token: 0xbb4CdB9CBd36B01bD1cBaEBF2De08d9173bc095c
      Protocol Fee: 0.12 USDC
      VIA Source Fee: 0.25 USDC
      VIA Dest Gas: 30000000000000000 wei
      Authorize Minter: true
      Using Nonce: 27
      TX: 0x86d0b726381f8181ff67156d47b789ce86252f0cfa1a82c2c35606d076aafebb
      ✅ Configured!

   🌐 Chain 43114 (Avalanche):
      Remote Contract: 0x46763657C2e4845C4f72c7Cce605B3cB3309fd2f
      Wrapped Gas Token: 0xbb4CdB9CBd36B01bD1cBaEBF2De08d9173bc095c
      Protocol Fee: 0.12 USDC
      VIA Source Fee: 0.25 USDC
      VIA Dest Gas: 15000000000000000 wei
      Authorize Minter: true
      Using Nonce: 28
      TX: 0xda1e55d7235e69da401f349bb13b97c3cbf0dc5e42c9eecc8e7d45ffe6d4f697
      ✅ Configured!

[VERIFICATION] Checking Configuration...
═══════════════════════════════════════════════════════
   Chain 369: Configured ✅ | Minter ✅
   Chain 8453: Configured ✅ | Minter ✅
   Chain 42161: Configured ✅ | Minter ✅
   Chain 10: Configured ✅ | Minter ✅
   Chain 137: Configured ✅ | Minter ✅
   Chain 43114: Configured ✅ | Minter ✅

✅ ALL ROUTES CONFIGURED FOR COCK ON BNB!
═══════════════════════════════════════════════════════
   📋 Configured 6 remote chains.

   📋 Next Steps:
   Run this script on ALL other chains with COCK deployments:
      npx hardhat run scripts/pre-audit-scripts/configure-all-routes.js --network pulsechain COCK
      npx hardhat run scripts/pre-audit-scripts/configure-all-routes.js --network base COCK
      npx hardhat run scripts/pre-audit-scripts/configure-all-routes.js --network arbitrum COCK
      npx hardhat run scripts/pre-audit-scripts/configure-all-routes.js --network optimism COCK
      npx hardhat run scripts/pre-audit-scripts/configure-all-routes.js --network polygon COCK
      npx hardhat run scripts/pre-audit-scripts/configure-all-routes.js --network avalanche COCK
Ganadhishs-MacBook-Air:multi-chain-with-via ganadhish$ npx hardhat run scripts/pre-audit-scripts/configure-all-routes.js --network polygon

🌐 CONFIGURE ALL ROUTES (Pre-Audit Contracts)
═══════════════════════════════════════════════════════
📍 Network: polygon (Chain ID: 137)
👤 Signer: 0x05F8cC8753D90d67DBB8c02118440b8283F941c9
🎯 Token: COCK

📍 Current Contract: 0xd7dDc57fC9eCFd0fb9E0773Eb80276fe62B0Fc93
   Type: synthetic
   MessageV3: 0x1C5800eb5fECB7760D7F1978ad744feA652a7b27
   Wrapped Gas Token: 0x0d500B1d8E8eF31E21C99d1Db9A6444d3ADf1270

🌐 Remote Chains to Configure (6 total):
   - Chain 369 (PulseChain): 0x12b42e964294dCF79f44E11FB4A9c23698f475d4 [collateral]
   - Chain 8453 (Base): 0xE78C3473B59156416994b57bC261a51fFbEee4FA [synthetic]
   - Chain 42161 (Arbitrum): 0x33dD4fEE8555263178a7ffD8bf7522BA2E6C33a3 [synthetic]
   - Chain 10 (Optimism): 0xb50Dd86bB594C3d7FBA44045F4a90f8eb12B5935 [synthetic]
   - Chain 56 (BNB Chain): 0xce032ac88ad11E6f8374B3760F5a98a77c6584f0 [synthetic]
   - Chain 43114 (Avalanche): 0x46763657C2e4845C4f72c7Cce605B3cB3309fd2f [synthetic]

[STEP 1/2] Configuring MessageClient...
═══════════════════════════════════════════════════════
   MessageV3: 0x1C5800eb5fECB7760D7F1978ad744feA652a7b27
   Remote Chains: [369, 8453, 42161, 10, 56, 43114]
   Confirmations: 15
   Using Nonce: 67
   TX: 0x5e60fd75f9f9ebc63679e5327916b494e8d1b85b9713b0f9bf592969e46e08e5
   ✅ MessageClient configured!

[STEP 2/2] Configuring Remote Chains...
═══════════════════════════════════════════════════════

   🌐 Chain 369 (PulseChain):
      Remote Contract: 0x12b42e964294dCF79f44E11FB4A9c23698f475d4
      Wrapped Gas Token: 0x0d500B1d8E8eF31E21C99d1Db9A6444d3ADf1270
      Protocol Fee: 0.12 USDC
      VIA Source Fee: 0.25 USDC
      VIA Dest Gas: 80000000000000000000 wei
      Authorize Minter: true
      Using Nonce: 68
      TX: 0x09f6bcffdd55de55eefe89fd487d5a70299afcda6bf688e9da860777aa14d256
      ✅ Configured!

   🌐 Chain 8453 (Base):
      Remote Contract: 0xE78C3473B59156416994b57bC261a51fFbEee4FA
      Wrapped Gas Token: 0x0d500B1d8E8eF31E21C99d1Db9A6444d3ADf1270
      Protocol Fee: 0.12 USDC
      VIA Source Fee: 0.25 USDC
      VIA Dest Gas: 30000000000000 wei
      Authorize Minter: true
      Using Nonce: 69
      TX: 0x52084d65d0b454f22d6afde907a517c49d08c48309224d790fc36b794294db1f
      ✅ Configured!

   🌐 Chain 42161 (Arbitrum):
      Remote Contract: 0x33dD4fEE8555263178a7ffD8bf7522BA2E6C33a3
      Wrapped Gas Token: 0x0d500B1d8E8eF31E21C99d1Db9A6444d3ADf1270
      Protocol Fee: 0.12 USDC
      VIA Source Fee: 0.25 USDC
      VIA Dest Gas: 30000000000000 wei
      Authorize Minter: true
      Using Nonce: 70
      TX: 0x64f2bb5d4d124eb09d3481f52f7e800b47963372b367ee59a70547dae6690ec0
      ✅ Configured!

   🌐 Chain 10 (Optimism):
      Remote Contract: 0xb50Dd86bB594C3d7FBA44045F4a90f8eb12B5935
      Wrapped Gas Token: 0x0d500B1d8E8eF31E21C99d1Db9A6444d3ADf1270
      Protocol Fee: 0.12 USDC
      VIA Source Fee: 0.25 USDC
      VIA Dest Gas: 30000000000000 wei
      Authorize Minter: true
      Using Nonce: 71
      TX: 0x4273259eccac5c20f40a18b488343d717cf1cd05c095939b5d153a5510750835
      ✅ Configured!

   🌐 Chain 56 (BNB Chain):
      Remote Contract: 0xce032ac88ad11E6f8374B3760F5a98a77c6584f0
      Wrapped Gas Token: 0x0d500B1d8E8eF31E21C99d1Db9A6444d3ADf1270
      Protocol Fee: 0.12 USDC
      VIA Source Fee: 0.25 USDC
      VIA Dest Gas: 1500000000000000 wei
      Authorize Minter: true
      Using Nonce: 72
      TX: 0x78c31e2ab75c2789f10c6c817fb0b31c2f1fea84b1b864ea8c48dda58c9b51e8
      ✅ Configured!

   🌐 Chain 43114 (Avalanche):
      Remote Contract: 0x46763657C2e4845C4f72c7Cce605B3cB3309fd2f
      Wrapped Gas Token: 0x0d500B1d8E8eF31E21C99d1Db9A6444d3ADf1270
      Protocol Fee: 0.12 USDC
      VIA Source Fee: 0.25 USDC
      VIA Dest Gas: 15000000000000000 wei
      Authorize Minter: true
      Using Nonce: 73
      TX: 0x8ea45dadafd392f1bdad5e6608e4d8d269e2caf1a15db1374477c3a6f0ab7f97
      ✅ Configured!

[VERIFICATION] Checking Configuration...
═══════════════════════════════════════════════════════
   Chain 369: Configured ✅ | Minter ✅
   Chain 8453: Configured ✅ | Minter ✅
   Chain 42161: Configured ✅ | Minter ✅
   Chain 10: Configured ✅ | Minter ✅
   Chain 56: Configured ✅ | Minter ✅
   Chain 43114: Configured ✅ | Minter ✅

✅ ALL ROUTES CONFIGURED FOR COCK ON POLYGON!
═══════════════════════════════════════════════════════
   📋 Configured 6 remote chains.

   📋 Next Steps:
   Run this script on ALL other chains with COCK deployments:
      npx hardhat run scripts/pre-audit-scripts/configure-all-routes.js --network pulsechain COCK
      npx hardhat run scripts/pre-audit-scripts/configure-all-routes.js --network base COCK
      npx hardhat run scripts/pre-audit-scripts/configure-all-routes.js --network arbitrum COCK
      npx hardhat run scripts/pre-audit-scripts/configure-all-routes.js --network optimism COCK
      npx hardhat run scripts/pre-audit-scripts/configure-all-routes.js --network bnb COCK
      npx hardhat run scripts/pre-audit-scripts/configure-all-routes.js --network avalanche COCK
Ganadhishs-MacBook-Air:multi-chain-with-via ganadhish$ npx hardhat run scripts/pre-audit-scripts/configure-all-routes.js --network avalanche

🌐 CONFIGURE ALL ROUTES (Pre-Audit Contracts)
═══════════════════════════════════════════════════════
📍 Network: avalanche (Chain ID: 43114)
👤 Signer: 0x05F8cC8753D90d67DBB8c02118440b8283F941c9
🎯 Token: COCK

📍 Current Contract: 0x46763657C2e4845C4f72c7Cce605B3cB3309fd2f
   Type: synthetic
   MessageV3: 0x72E052Fa7f0788e668965d37B6c38C88703B7859
   Wrapped Gas Token: 0xB31f66AA3C1e785363F0875A1B74E27b85FD66c7

🌐 Remote Chains to Configure (6 total):
   - Chain 369 (PulseChain): 0x12b42e964294dCF79f44E11FB4A9c23698f475d4 [collateral]
   - Chain 8453 (Base): 0xE78C3473B59156416994b57bC261a51fFbEee4FA [synthetic]
   - Chain 42161 (Arbitrum): 0x33dD4fEE8555263178a7ffD8bf7522BA2E6C33a3 [synthetic]
   - Chain 10 (Optimism): 0xb50Dd86bB594C3d7FBA44045F4a90f8eb12B5935 [synthetic]
   - Chain 56 (BNB Chain): 0xce032ac88ad11E6f8374B3760F5a98a77c6584f0 [synthetic]
   - Chain 137 (Polygon): 0xd7dDc57fC9eCFd0fb9E0773Eb80276fe62B0Fc93 [synthetic]

[STEP 1/2] Configuring MessageClient...
═══════════════════════════════════════════════════════
   MessageV3: 0x72E052Fa7f0788e668965d37B6c38C88703B7859
   Remote Chains: [369, 8453, 42161, 10, 56, 137]
   Confirmations: 15
   Using Nonce: 19
   TX: 0xf4b2ef36981a230958ba7477aefabbbb5cc837aca64759770351291a299025d7
   ✅ MessageClient configured!

[STEP 2/2] Configuring Remote Chains...
═══════════════════════════════════════════════════════

   🌐 Chain 369 (PulseChain):
      Remote Contract: 0x12b42e964294dCF79f44E11FB4A9c23698f475d4
      Wrapped Gas Token: 0xB31f66AA3C1e785363F0875A1B74E27b85FD66c7
      Protocol Fee: 0.12 USDC
      VIA Source Fee: 0.25 USDC
      VIA Dest Gas: 80000000000000000000 wei
      Authorize Minter: true
      Using Nonce: 20
      TX: 0x921bfa0eefcc017fa280243f123422458d318db8f4267b610d0a8038efb0285b
      ✅ Configured!

   🌐 Chain 8453 (Base):
      Remote Contract: 0xE78C3473B59156416994b57bC261a51fFbEee4FA
      Wrapped Gas Token: 0xB31f66AA3C1e785363F0875A1B74E27b85FD66c7
      Protocol Fee: 0.12 USDC
      VIA Source Fee: 0.25 USDC
      VIA Dest Gas: 30000000000000 wei
      Authorize Minter: true
      Using Nonce: 21
      TX: 0x81e4637e72b1de00cf0c02129845a0dbaba7d780a070ded71e2da68171b6d561
      ✅ Configured!

   🌐 Chain 42161 (Arbitrum):
      Remote Contract: 0x33dD4fEE8555263178a7ffD8bf7522BA2E6C33a3
      Wrapped Gas Token: 0xB31f66AA3C1e785363F0875A1B74E27b85FD66c7
      Protocol Fee: 0.12 USDC
      VIA Source Fee: 0.25 USDC
      VIA Dest Gas: 30000000000000 wei
      Authorize Minter: true
      Using Nonce: 22
      TX: 0xe2113fcdd864cad4b9e755ec52cc67076574fed84ac084e867bb9a1d88f7e91f
      ✅ Configured!

   🌐 Chain 10 (Optimism):
      Remote Contract: 0xb50Dd86bB594C3d7FBA44045F4a90f8eb12B5935
      Wrapped Gas Token: 0xB31f66AA3C1e785363F0875A1B74E27b85FD66c7
      Protocol Fee: 0.12 USDC
      VIA Source Fee: 0.25 USDC
      VIA Dest Gas: 30000000000000 wei
      Authorize Minter: true
      Using Nonce: 23
      TX: 0x9a04cf277dafec542211853120369ce117f921263f1882a297a2ee704e514d38
      ✅ Configured!

   🌐 Chain 56 (BNB Chain):
      Remote Contract: 0xce032ac88ad11E6f8374B3760F5a98a77c6584f0
      Wrapped Gas Token: 0xB31f66AA3C1e785363F0875A1B74E27b85FD66c7
      Protocol Fee: 0.12 USDC
      VIA Source Fee: 0.25 USDC
      VIA Dest Gas: 1500000000000000 wei
      Authorize Minter: true
      Using Nonce: 24
      TX: 0x27ad1be652c637523b6faaca80ae7585cc8b4def13b2f71ec82d125f0c2d3935
      ✅ Configured!

   🌐 Chain 137 (Polygon):
      Remote Contract: 0xd7dDc57fC9eCFd0fb9E0773Eb80276fe62B0Fc93
      Wrapped Gas Token: 0xB31f66AA3C1e785363F0875A1B74E27b85FD66c7
      Protocol Fee: 0.12 USDC
      VIA Source Fee: 0.25 USDC
      VIA Dest Gas: 30000000000000000 wei
      Authorize Minter: true
      Using Nonce: 25
      TX: 0xc626ad746efc73d604a5a4567e7bfd1461a9954998fa1c65741e01c02c59e733
      ✅ Configured!

[VERIFICATION] Checking Configuration...
═══════════════════════════════════════════════════════
   Chain 369: Configured ✅ | Minter ✅
   Chain 8453: Configured ✅ | Minter ✅
   Chain 42161: Configured ✅ | Minter ✅
   Chain 10: Configured ✅ | Minter ✅
   Chain 56: Configured ✅ | Minter ✅
   Chain 137: Configured ✅ | Minter ✅

✅ ALL ROUTES CONFIGURED FOR COCK ON AVALANCHE!
═══════════════════════════════════════════════════════
   📋 Configured 6 remote chains.

   📋 Next Steps:
   Run this script on ALL other chains with COCK deployments:
      npx hardhat run scripts/pre-audit-scripts/configure-all-routes.js --network pulsechain COCK
      npx hardhat run scripts/pre-audit-scripts/configure-all-routes.js --network base COCK
      npx hardhat run scripts/pre-audit-scripts/configure-all-routes.js --network arbitrum COCK
      npx hardhat run scripts/pre-audit-scripts/configure-all-routes.js --network optimism COCK
      npx hardhat run scripts/pre-audit-scripts/configure-all-routes.js --network bnb COCK
      npx hardhat run scripts/pre-audit-scripts/configure-all-routes.js --network polygon COCK

____________________________________________________________________________________

___________________________________________
ALL CHAINS CONFIG FOR PLSX TOKEN: 
-------------------------------------------

npx hardhat run scripts/pre-audit-scripts/configure-all-routes.js --network base

🌐 CONFIGURE ALL ROUTES (Pre-Audit Contracts)
═══════════════════════════════════════════════════════
📍 Network: base (Chain ID: 8453)
👤 Signer: 0x05F8cC8753D90d67DBB8c02118440b8283F941c9
🎯 Token: PLSX

📍 Current Contract: 0xF8Ae2Ca61ccAF2e6912d142b797080a3F7439c53
   Type: synthetic
   MessageV3: 0xe3b3274bb685F37C7f17a604039c77a6A16Cfc2a
   Wrapped Gas Token: 0x4200000000000000000000000000000000000006

🌐 Remote Chains to Configure (6 total):
   - Chain 369 (PulseChain): 0xDe524350F6421842EE39baC52d69c0Db26DD0479 [collateral]
   - Chain 42161 (Arbitrum): 0xB04d0A850813A867f9e858A04fa11A22c58ff846 [synthetic]
   - Chain 10 (Optimism): 0xEab30C23A015942BDc8204bD8dcA2780a5957a8c [synthetic]
   - Chain 56 (BNB Chain): 0xC1d9A1f64291CF47e703eab6b27fA0660cAE7324 [synthetic]
   - Chain 137 (Polygon): 0xE18947547EB1f49B725c3Ca4f95bD45A84F6c24A [synthetic]
   - Chain 43114 (Avalanche): 0x7e39288d48ae017B1dF2f20523a6A1c7C91D96E2 [synthetic]

[STEP 1/2] Configuring MessageClient...
═══════════════════════════════════════════════════════
   MessageV3: 0xe3b3274bb685F37C7f17a604039c77a6A16Cfc2a
   Remote Chains: [369, 42161, 10, 56, 137, 43114]
   Confirmations: 15
   Using Nonce: 472
   TX: 0x03b42390d3e2d050296bc69166d9b2e7c86573c2db523478751f10d9c0ec7815
   ✅ MessageClient configured!

[STEP 2/2] Configuring Remote Chains...
═══════════════════════════════════════════════════════

   🌐 Chain 369 (PulseChain):
      Remote Contract: 0xDe524350F6421842EE39baC52d69c0Db26DD0479
      Wrapped Gas Token: 0x4200000000000000000000000000000000000006
      Protocol Fee: 0.12 USDC
      VIA Source Fee: 0.25 USDC
      VIA Dest Gas: 80000000000000000000 wei
      Authorize Minter: true
      Using Nonce: 472
      ❌ Failed: nonce too low: next nonce 473, tx nonce 472

   🌐 Chain 42161 (Arbitrum):
      Remote Contract: 0xB04d0A850813A867f9e858A04fa11A22c58ff846
      Wrapped Gas Token: 0x4200000000000000000000000000000000000006
      Protocol Fee: 0.12 USDC
      VIA Source Fee: 0.25 USDC
      VIA Dest Gas: 30000000000000 wei
      Authorize Minter: true
      Using Nonce: 473
      TX: 0x5f6b799efcd0f7f5cf9e87684b17691d21b8d1152ecab1d54051470fb10a19c6
      ✅ Configured!

   🌐 Chain 10 (Optimism):
      Remote Contract: 0xEab30C23A015942BDc8204bD8dcA2780a5957a8c
      Wrapped Gas Token: 0x4200000000000000000000000000000000000006
      Protocol Fee: 0.12 USDC
      VIA Source Fee: 0.25 USDC
      VIA Dest Gas: 30000000000000 wei
      Authorize Minter: true
      Using Nonce: 474
      TX: 0xdbc3b30bd9bba8e80b61ca446924e7cf76fa3a51d0507f4ff2ace5e436a53bf2
      ✅ Configured!

   🌐 Chain 56 (BNB Chain):
      Remote Contract: 0xC1d9A1f64291CF47e703eab6b27fA0660cAE7324
      Wrapped Gas Token: 0x4200000000000000000000000000000000000006
      Protocol Fee: 0.12 USDC
      VIA Source Fee: 0.25 USDC
      VIA Dest Gas: 1500000000000000 wei
      Authorize Minter: true
      Using Nonce: 475
      TX: 0x45c9ab132ae49fc74a05a9c23c2c9713d012cc7f7f2942cce70d807b94a111b3
      ✅ Configured!

   🌐 Chain 137 (Polygon):
      Remote Contract: 0xE18947547EB1f49B725c3Ca4f95bD45A84F6c24A
      Wrapped Gas Token: 0x4200000000000000000000000000000000000006
      Protocol Fee: 0.12 USDC
      VIA Source Fee: 0.25 USDC
      VIA Dest Gas: 30000000000000000 wei
      Authorize Minter: true
      Using Nonce: 476
      TX: 0x65afe31582cb5880042e10bb88d0a4bb126bfc12b2adba827bab837bccd6f0ee
      ✅ Configured!

   🌐 Chain 43114 (Avalanche):
      Remote Contract: 0x7e39288d48ae017B1dF2f20523a6A1c7C91D96E2
      Wrapped Gas Token: 0x4200000000000000000000000000000000000006
      Protocol Fee: 0.12 USDC
      VIA Source Fee: 0.25 USDC
      VIA Dest Gas: 15000000000000000 wei
      Authorize Minter: true
      Using Nonce: 477
      TX: 0x3dcb52feabb4e2604cd9147b5339a4062691eee89392352ce47a60876815e339
      ✅ Configured!

[VERIFICATION] Checking Configuration...
═══════════════════════════════════════════════════════
   Chain 369: Configured ❌ | Minter ❌
   Chain 42161: Configured ✅ | Minter ✅
   Chain 10: Configured ✅ | Minter ✅
   Chain 56: Configured ✅ | Minter ✅
   Chain 137: Configured ✅ | Minter ✅
   Chain 43114: Configured ✅ | Minter ✅

✅ ALL ROUTES CONFIGURED FOR PLSX ON BASE!
═══════════════════════════════════════════════════════
   📋 Configured 6 remote chains.

   📋 Next Steps:
   Run this script on ALL other chains with PLSX deployments:
      npx hardhat run scripts/pre-audit-scripts/configure-all-routes.js --network pulsechain PLSX
      npx hardhat run scripts/pre-audit-scripts/configure-all-routes.js --network arbitrum PLSX
      npx hardhat run scripts/pre-audit-scripts/configure-all-routes.js --network optimism PLSX
      npx hardhat run scripts/pre-audit-scripts/configure-all-routes.js --network bnb PLSX
      npx hardhat run scripts/pre-audit-scripts/configure-all-routes.js --network polygon PLSX
      npx hardhat run scripts/pre-audit-scripts/configure-all-routes.js --network avalanche PLSX
Ganadhishs-MacBook-Air:multi-chain-with-via ganadhish$ npx hardhat run scripts/pre-audit-scripts/configure-all-routes.js --network arbitrum

🌐 CONFIGURE ALL ROUTES (Pre-Audit Contracts)
═══════════════════════════════════════════════════════
📍 Network: arbitrum (Chain ID: 42161)
👤 Signer: 0x05F8cC8753D90d67DBB8c02118440b8283F941c9
🎯 Token: PLSX

📍 Current Contract: 0xB04d0A850813A867f9e858A04fa11A22c58ff846
   Type: synthetic
   MessageV3: 0x65EEc58ef38882422E887B82f7085e9a9C35dCA1
   Wrapped Gas Token: 0x82aF49447D8a07e3bd95BD0d56f35241523fBab1

🌐 Remote Chains to Configure (6 total):
   - Chain 369 (PulseChain): 0xDe524350F6421842EE39baC52d69c0Db26DD0479 [collateral]
   - Chain 8453 (Base): 0xF8Ae2Ca61ccAF2e6912d142b797080a3F7439c53 [synthetic]
   - Chain 10 (Optimism): 0xEab30C23A015942BDc8204bD8dcA2780a5957a8c [synthetic]
   - Chain 56 (BNB Chain): 0xC1d9A1f64291CF47e703eab6b27fA0660cAE7324 [synthetic]
   - Chain 137 (Polygon): 0xE18947547EB1f49B725c3Ca4f95bD45A84F6c24A [synthetic]
   - Chain 43114 (Avalanche): 0x7e39288d48ae017B1dF2f20523a6A1c7C91D96E2 [synthetic]

[STEP 1/2] Configuring MessageClient...
═══════════════════════════════════════════════════════
   MessageV3: 0x65EEc58ef38882422E887B82f7085e9a9C35dCA1
   Remote Chains: [369, 8453, 10, 56, 137, 43114]
   Confirmations: 15
   Using Nonce: 127
   TX: 0x802482c8a3b067dc06cecdb33248472e7bb1fb24b8795ae90390374b802caeff
   ✅ MessageClient configured!

[STEP 2/2] Configuring Remote Chains...
═══════════════════════════════════════════════════════

   🌐 Chain 369 (PulseChain):
      Remote Contract: 0xDe524350F6421842EE39baC52d69c0Db26DD0479
      Wrapped Gas Token: 0x82aF49447D8a07e3bd95BD0d56f35241523fBab1
      Protocol Fee: 0.12 USDC
      VIA Source Fee: 0.25 USDC
      VIA Dest Gas: 80000000000000000000 wei
      Authorize Minter: true
      Using Nonce: 128
      TX: 0x732335a16a554266935206aadc17a171f2b6a16e092c687bf11edd02f04f6d20
      ✅ Configured!

   🌐 Chain 8453 (Base):
      Remote Contract: 0xF8Ae2Ca61ccAF2e6912d142b797080a3F7439c53
      Wrapped Gas Token: 0x82aF49447D8a07e3bd95BD0d56f35241523fBab1
      Protocol Fee: 0.12 USDC
      VIA Source Fee: 0.25 USDC
      VIA Dest Gas: 30000000000000 wei
      Authorize Minter: true
      Using Nonce: 129
      TX: 0x6ca55481c7fa0c012305cf42175716201f524e257e113bfb6d6b6d26e5489200
      ✅ Configured!

   🌐 Chain 10 (Optimism):
      Remote Contract: 0xEab30C23A015942BDc8204bD8dcA2780a5957a8c
      Wrapped Gas Token: 0x82aF49447D8a07e3bd95BD0d56f35241523fBab1
      Protocol Fee: 0.12 USDC
      VIA Source Fee: 0.25 USDC
      VIA Dest Gas: 30000000000000 wei
      Authorize Minter: true
      Using Nonce: 130
      TX: 0xaa15676db52d1c9d00dc70f9ad2d0ce83f7d18923d8193a99ca32ffcb7a76d5f
      ✅ Configured!

   🌐 Chain 56 (BNB Chain):
      Remote Contract: 0xC1d9A1f64291CF47e703eab6b27fA0660cAE7324
      Wrapped Gas Token: 0x82aF49447D8a07e3bd95BD0d56f35241523fBab1
      Protocol Fee: 0.12 USDC
      VIA Source Fee: 0.25 USDC
      VIA Dest Gas: 1500000000000000 wei
      Authorize Minter: true
      Using Nonce: 131
      TX: 0xad89c794fc68aaaad8e86bf8bf0666b7ffaeda741c698d77e3ee7ce25b52d75b
      ✅ Configured!

   🌐 Chain 137 (Polygon):
      Remote Contract: 0xE18947547EB1f49B725c3Ca4f95bD45A84F6c24A
      Wrapped Gas Token: 0x82aF49447D8a07e3bd95BD0d56f35241523fBab1
      Protocol Fee: 0.12 USDC
      VIA Source Fee: 0.25 USDC
      VIA Dest Gas: 30000000000000000 wei
      Authorize Minter: true
      Using Nonce: 132
      TX: 0x8cddff9e6c5f5c15bc4e451617a55a234340e6f6e6efff64221ac723eeb0d445
      ✅ Configured!

   🌐 Chain 43114 (Avalanche):
      Remote Contract: 0x7e39288d48ae017B1dF2f20523a6A1c7C91D96E2
      Wrapped Gas Token: 0x82aF49447D8a07e3bd95BD0d56f35241523fBab1
      Protocol Fee: 0.12 USDC
      VIA Source Fee: 0.25 USDC
      VIA Dest Gas: 15000000000000000 wei
      Authorize Minter: true
      Using Nonce: 133
      TX: 0xc2c42482643317f46b10028ff4902d40c3215d597b31200443a88b36eb42606c
      ✅ Configured!

[VERIFICATION] Checking Configuration...
═══════════════════════════════════════════════════════
   Chain 369: Configured ✅ | Minter ✅
   Chain 8453: Configured ✅ | Minter ✅
   Chain 10: Configured ✅ | Minter ✅
   Chain 56: Configured ✅ | Minter ✅
   Chain 137: Configured ✅ | Minter ✅
   Chain 43114: Configured ✅ | Minter ✅

✅ ALL ROUTES CONFIGURED FOR PLSX ON ARBITRUM!
═══════════════════════════════════════════════════════
   📋 Configured 6 remote chains.

   📋 Next Steps:
   Run this script on ALL other chains with PLSX deployments:
      npx hardhat run scripts/pre-audit-scripts/configure-all-routes.js --network pulsechain PLSX
      npx hardhat run scripts/pre-audit-scripts/configure-all-routes.js --network base PLSX
      npx hardhat run scripts/pre-audit-scripts/configure-all-routes.js --network optimism PLSX
      npx hardhat run scripts/pre-audit-scripts/configure-all-routes.js --network bnb PLSX
      npx hardhat run scripts/pre-audit-scripts/configure-all-routes.js --network polygon PLSX
      npx hardhat run scripts/pre-audit-scripts/configure-all-routes.js --network avalanche PLSX
Ganadhishs-MacBook-Air:multi-chain-with-via ganadhish$ npx hardhat run scripts/pre-audit-scripts/configure-all-routes.js --network optimism

🌐 CONFIGURE ALL ROUTES (Pre-Audit Contracts)
═══════════════════════════════════════════════════════
📍 Network: optimism (Chain ID: 10)
👤 Signer: 0x05F8cC8753D90d67DBB8c02118440b8283F941c9
🎯 Token: PLSX

📍 Current Contract: 0xEab30C23A015942BDc8204bD8dcA2780a5957a8c
   Type: synthetic
   MessageV3: 0x15AC559DA4951c796DB6620fAb286B96840D039A
   Wrapped Gas Token: 0x4200000000000000000000000000000000000006

🌐 Remote Chains to Configure (6 total):
   - Chain 369 (PulseChain): 0xDe524350F6421842EE39baC52d69c0Db26DD0479 [collateral]
   - Chain 8453 (Base): 0xF8Ae2Ca61ccAF2e6912d142b797080a3F7439c53 [synthetic]
   - Chain 42161 (Arbitrum): 0xB04d0A850813A867f9e858A04fa11A22c58ff846 [synthetic]
   - Chain 56 (BNB Chain): 0xC1d9A1f64291CF47e703eab6b27fA0660cAE7324 [synthetic]
   - Chain 137 (Polygon): 0xE18947547EB1f49B725c3Ca4f95bD45A84F6c24A [synthetic]
   - Chain 43114 (Avalanche): 0x7e39288d48ae017B1dF2f20523a6A1c7C91D96E2 [synthetic]

[STEP 1/2] Configuring MessageClient...
═══════════════════════════════════════════════════════
   MessageV3: 0x15AC559DA4951c796DB6620fAb286B96840D039A
   Remote Chains: [369, 8453, 42161, 56, 137, 43114]
   Confirmations: 15
   Using Nonce: 84
   TX: 0x825a887a648f56ff07574c53e35771a0611233b40c180608215bb892776a51b1
   ✅ MessageClient configured!

[STEP 2/2] Configuring Remote Chains...
═══════════════════════════════════════════════════════

   🌐 Chain 369 (PulseChain):
      Remote Contract: 0xDe524350F6421842EE39baC52d69c0Db26DD0479
      Wrapped Gas Token: 0x4200000000000000000000000000000000000006
      Protocol Fee: 0.12 USDC
      VIA Source Fee: 0.25 USDC
      VIA Dest Gas: 80000000000000000000 wei
      Authorize Minter: true
      Using Nonce: 85
      TX: 0xfc2d78fdedf3e5228015d6ec26a58aead9635db366ba2c970aae0855c120f6a0
      ✅ Configured!

   🌐 Chain 8453 (Base):
      Remote Contract: 0xF8Ae2Ca61ccAF2e6912d142b797080a3F7439c53
      Wrapped Gas Token: 0x4200000000000000000000000000000000000006
      Protocol Fee: 0.12 USDC
      VIA Source Fee: 0.25 USDC
      VIA Dest Gas: 30000000000000 wei
      Authorize Minter: true
      Using Nonce: 86
      TX: 0x74d30683dcb765a7b64aa88be00a049f6a2d06cfcc76d141fe1862c2a16e4509
      ✅ Configured!

   🌐 Chain 42161 (Arbitrum):
      Remote Contract: 0xB04d0A850813A867f9e858A04fa11A22c58ff846
      Wrapped Gas Token: 0x4200000000000000000000000000000000000006
      Protocol Fee: 0.12 USDC
      VIA Source Fee: 0.25 USDC
      VIA Dest Gas: 30000000000000 wei
      Authorize Minter: true
      Using Nonce: 87
      TX: 0xe690c3f08aaf8f4fdbae3f5b8ac56ebbffbeb9cf76fbf4c1664bc3f83b9b8f36
      ✅ Configured!

   🌐 Chain 56 (BNB Chain):
      Remote Contract: 0xC1d9A1f64291CF47e703eab6b27fA0660cAE7324
      Wrapped Gas Token: 0x4200000000000000000000000000000000000006
      Protocol Fee: 0.12 USDC
      VIA Source Fee: 0.25 USDC
      VIA Dest Gas: 1500000000000000 wei
      Authorize Minter: true
      Using Nonce: 88
      TX: 0xcf7e9ed210039bf79348d9c2c4fb5efd6428f195f1f06b8f15a7dedd1f8d2f03
      ✅ Configured!

   🌐 Chain 137 (Polygon):
      Remote Contract: 0xE18947547EB1f49B725c3Ca4f95bD45A84F6c24A
      Wrapped Gas Token: 0x4200000000000000000000000000000000000006
      Protocol Fee: 0.12 USDC
      VIA Source Fee: 0.25 USDC
      VIA Dest Gas: 30000000000000000 wei
      Authorize Minter: true
      Using Nonce: 89
      TX: 0x6d3bcf66f47fffb6045d297401a094925f93618ef48522646c4bde5750b48933
      ✅ Configured!

   🌐 Chain 43114 (Avalanche):
      Remote Contract: 0x7e39288d48ae017B1dF2f20523a6A1c7C91D96E2
      Wrapped Gas Token: 0x4200000000000000000000000000000000000006
      Protocol Fee: 0.12 USDC
      VIA Source Fee: 0.25 USDC
      VIA Dest Gas: 15000000000000000 wei
      Authorize Minter: true
      Using Nonce: 90
      TX: 0xfc2946d3b0437ca0a15f90b5c2c5b694de03008a22f3dd33405df3a51ae5f3c6
      ✅ Configured!

[VERIFICATION] Checking Configuration...
═══════════════════════════════════════════════════════
   Chain 369: Configured ✅ | Minter ✅
   Chain 8453: Configured ✅ | Minter ✅
   Chain 42161: Configured ✅ | Minter ✅
   Chain 56: Configured ✅ | Minter ✅
   Chain 137: Configured ✅ | Minter ✅
   Chain 43114: Configured ✅ | Minter ✅

✅ ALL ROUTES CONFIGURED FOR PLSX ON OPTIMISM!
═══════════════════════════════════════════════════════
   📋 Configured 6 remote chains.

   📋 Next Steps:
   Run this script on ALL other chains with PLSX deployments:
      npx hardhat run scripts/pre-audit-scripts/configure-all-routes.js --network pulsechain PLSX
      npx hardhat run scripts/pre-audit-scripts/configure-all-routes.js --network base PLSX
      npx hardhat run scripts/pre-audit-scripts/configure-all-routes.js --network arbitrum PLSX
      npx hardhat run scripts/pre-audit-scripts/configure-all-routes.js --network bnb PLSX
      npx hardhat run scripts/pre-audit-scripts/configure-all-routes.js --network polygon PLSX
      npx hardhat run scripts/pre-audit-scripts/configure-all-routes.js --network avalanche PLSX
Ganadhishs-MacBook-Air:multi-chain-with-via ganadhish$ npx hardhat run scripts/pre-audit-scripts/configure-all-routes.js --network bnb

🌐 CONFIGURE ALL ROUTES (Pre-Audit Contracts)
═══════════════════════════════════════════════════════
📍 Network: bnb (Chain ID: 56)
👤 Signer: 0x05F8cC8753D90d67DBB8c02118440b8283F941c9
🎯 Token: PLSX

📍 Current Contract: 0xC1d9A1f64291CF47e703eab6b27fA0660cAE7324
   Type: synthetic
   MessageV3: 0x7b67dF6728E294db2eb173ac7c738a4627Ae5e11
   Wrapped Gas Token: 0xbb4CdB9CBd36B01bD1cBaEBF2De08d9173bc095c

🌐 Remote Chains to Configure (6 total):
   - Chain 369 (PulseChain): 0xDe524350F6421842EE39baC52d69c0Db26DD0479 [collateral]
   - Chain 8453 (Base): 0xF8Ae2Ca61ccAF2e6912d142b797080a3F7439c53 [synthetic]
   - Chain 42161 (Arbitrum): 0xB04d0A850813A867f9e858A04fa11A22c58ff846 [synthetic]
   - Chain 10 (Optimism): 0xEab30C23A015942BDc8204bD8dcA2780a5957a8c [synthetic]
   - Chain 137 (Polygon): 0xE18947547EB1f49B725c3Ca4f95bD45A84F6c24A [synthetic]
   - Chain 43114 (Avalanche): 0x7e39288d48ae017B1dF2f20523a6A1c7C91D96E2 [synthetic]

[STEP 1/2] Configuring MessageClient...
═══════════════════════════════════════════════════════
   MessageV3: 0x7b67dF6728E294db2eb173ac7c738a4627Ae5e11
   Remote Chains: [369, 8453, 42161, 10, 137, 43114]
   Confirmations: 15
   Using Nonce: 30
   TX: 0x41e79dc125a57321653726ba5e7b7cead30d1d940f422059e503cdaaff341716
   ✅ MessageClient configured!

[STEP 2/2] Configuring Remote Chains...
═══════════════════════════════════════════════════════

   🌐 Chain 369 (PulseChain):
      Remote Contract: 0xDe524350F6421842EE39baC52d69c0Db26DD0479
      Wrapped Gas Token: 0xbb4CdB9CBd36B01bD1cBaEBF2De08d9173bc095c
      Protocol Fee: 0.12 USDC
      VIA Source Fee: 0.25 USDC
      VIA Dest Gas: 80000000000000000000 wei
      Authorize Minter: true
      Using Nonce: 31
      TX: 0x452660a0180d048a107b59a56b49de6d6d29b8a51f208747c5ef0b60c6dc40e0
      ✅ Configured!

   🌐 Chain 8453 (Base):
      Remote Contract: 0xF8Ae2Ca61ccAF2e6912d142b797080a3F7439c53
      Wrapped Gas Token: 0xbb4CdB9CBd36B01bD1cBaEBF2De08d9173bc095c
      Protocol Fee: 0.12 USDC
      VIA Source Fee: 0.25 USDC
      VIA Dest Gas: 30000000000000 wei
      Authorize Minter: true
      Using Nonce: 32
      TX: 0xdff7f416db8140b25c9ec56d2b1097cc00c68e14de038fc6e9f4c1be2647e6d5
      ✅ Configured!

   🌐 Chain 42161 (Arbitrum):
      Remote Contract: 0xB04d0A850813A867f9e858A04fa11A22c58ff846
      Wrapped Gas Token: 0xbb4CdB9CBd36B01bD1cBaEBF2De08d9173bc095c
      Protocol Fee: 0.12 USDC
      VIA Source Fee: 0.25 USDC
      VIA Dest Gas: 30000000000000 wei
      Authorize Minter: true
      Using Nonce: 33
      TX: 0xde141de279c49d665c7af1e382432e384804ac94caedc61bbeeeb2ae1405728a
      ✅ Configured!

   🌐 Chain 10 (Optimism):
      Remote Contract: 0xEab30C23A015942BDc8204bD8dcA2780a5957a8c
      Wrapped Gas Token: 0xbb4CdB9CBd36B01bD1cBaEBF2De08d9173bc095c
      Protocol Fee: 0.12 USDC
      VIA Source Fee: 0.25 USDC
      VIA Dest Gas: 30000000000000 wei
      Authorize Minter: true
      Using Nonce: 34
      TX: 0x23334c1daccabfc0262b17059837906bcbdea92d73023766cf3016862e7abc17
      ✅ Configured!

   🌐 Chain 137 (Polygon):
      Remote Contract: 0xE18947547EB1f49B725c3Ca4f95bD45A84F6c24A
      Wrapped Gas Token: 0xbb4CdB9CBd36B01bD1cBaEBF2De08d9173bc095c
      Protocol Fee: 0.12 USDC
      VIA Source Fee: 0.25 USDC
      VIA Dest Gas: 30000000000000000 wei
      Authorize Minter: true
      Using Nonce: 35
      TX: 0x9ba3cb74456a5246aac62a79788a6cfa2fc50b07ec0c6df0eac90bcc593e51d3
      ✅ Configured!

   🌐 Chain 43114 (Avalanche):
      Remote Contract: 0x7e39288d48ae017B1dF2f20523a6A1c7C91D96E2
      Wrapped Gas Token: 0xbb4CdB9CBd36B01bD1cBaEBF2De08d9173bc095c
      Protocol Fee: 0.12 USDC
      VIA Source Fee: 0.25 USDC
      VIA Dest Gas: 15000000000000000 wei
      Authorize Minter: true
      Using Nonce: 36
      TX: 0xe506127e60023a1278e90da476a71dd90cbabe3c93da78d7e75b7787781f6470
      ✅ Configured!

[VERIFICATION] Checking Configuration...
═══════════════════════════════════════════════════════
   Chain 369: Configured ✅ | Minter ✅
   Chain 8453: Configured ✅ | Minter ✅
   Chain 42161: Configured ✅ | Minter ✅
   Chain 10: Configured ✅ | Minter ✅
   Chain 137: Configured ✅ | Minter ✅
   Chain 43114: Configured ✅ | Minter ✅

✅ ALL ROUTES CONFIGURED FOR PLSX ON BNB!
═══════════════════════════════════════════════════════
   📋 Configured 6 remote chains.

   📋 Next Steps:
   Run this script on ALL other chains with PLSX deployments:
      npx hardhat run scripts/pre-audit-scripts/configure-all-routes.js --network pulsechain PLSX
      npx hardhat run scripts/pre-audit-scripts/configure-all-routes.js --network base PLSX
      npx hardhat run scripts/pre-audit-scripts/configure-all-routes.js --network arbitrum PLSX
      npx hardhat run scripts/pre-audit-scripts/configure-all-routes.js --network optimism PLSX
      npx hardhat run scripts/pre-audit-scripts/configure-all-routes.js --network polygon PLSX
      npx hardhat run scripts/pre-audit-scripts/configure-all-routes.js --network avalanche PLSX
Ganadhishs-MacBook-Air:multi-chain-with-via ganadhish$ npx hardhat run scripts/pre-audit-scripts/configure-all-routes.js --network polygon

🌐 CONFIGURE ALL ROUTES (Pre-Audit Contracts)
═══════════════════════════════════════════════════════
📍 Network: polygon (Chain ID: 137)
👤 Signer: 0x05F8cC8753D90d67DBB8c02118440b8283F941c9
🎯 Token: PLSX

📍 Current Contract: 0xE18947547EB1f49B725c3Ca4f95bD45A84F6c24A
   Type: synthetic
   MessageV3: 0x1C5800eb5fECB7760D7F1978ad744feA652a7b27
   Wrapped Gas Token: 0x0d500B1d8E8eF31E21C99d1Db9A6444d3ADf1270

🌐 Remote Chains to Configure (6 total):
   - Chain 369 (PulseChain): 0xDe524350F6421842EE39baC52d69c0Db26DD0479 [collateral]
   - Chain 8453 (Base): 0xF8Ae2Ca61ccAF2e6912d142b797080a3F7439c53 [synthetic]
   - Chain 42161 (Arbitrum): 0xB04d0A850813A867f9e858A04fa11A22c58ff846 [synthetic]
   - Chain 10 (Optimism): 0xEab30C23A015942BDc8204bD8dcA2780a5957a8c [synthetic]
   - Chain 56 (BNB Chain): 0xC1d9A1f64291CF47e703eab6b27fA0660cAE7324 [synthetic]
   - Chain 43114 (Avalanche): 0x7e39288d48ae017B1dF2f20523a6A1c7C91D96E2 [synthetic]

[STEP 1/2] Configuring MessageClient...
═══════════════════════════════════════════════════════
   MessageV3: 0x1C5800eb5fECB7760D7F1978ad744feA652a7b27
   Remote Chains: [369, 8453, 42161, 10, 56, 43114]
   Confirmations: 15
   Using Nonce: 75
   TX: 0xd3397886edafd23a5d9fdb22549eec4ef81df8e74975c6a0c1ce04443b2852f1
   ✅ MessageClient configured!

[STEP 2/2] Configuring Remote Chains...
═══════════════════════════════════════════════════════

   🌐 Chain 369 (PulseChain):
      Remote Contract: 0xDe524350F6421842EE39baC52d69c0Db26DD0479
      Wrapped Gas Token: 0x0d500B1d8E8eF31E21C99d1Db9A6444d3ADf1270
      Protocol Fee: 0.12 USDC
      VIA Source Fee: 0.25 USDC
      VIA Dest Gas: 80000000000000000000 wei
      Authorize Minter: true
      Using Nonce: 76
      TX: 0xeed8c8e57a9e9259f05f95fbc8ef424d3c99ec25c4a4f5d0d02f976d412f4c88
      ✅ Configured!

   🌐 Chain 8453 (Base):
      Remote Contract: 0xF8Ae2Ca61ccAF2e6912d142b797080a3F7439c53
      Wrapped Gas Token: 0x0d500B1d8E8eF31E21C99d1Db9A6444d3ADf1270
      Protocol Fee: 0.12 USDC
      VIA Source Fee: 0.25 USDC
      VIA Dest Gas: 30000000000000 wei
      Authorize Minter: true
      Using Nonce: 77
      TX: 0xa72f7e4ecafd727422008a0b10aea341f1b2db53d732b426c5daa657bd24addc
      ✅ Configured!

   🌐 Chain 42161 (Arbitrum):
      Remote Contract: 0xB04d0A850813A867f9e858A04fa11A22c58ff846
      Wrapped Gas Token: 0x0d500B1d8E8eF31E21C99d1Db9A6444d3ADf1270
      Protocol Fee: 0.12 USDC
      VIA Source Fee: 0.25 USDC
      VIA Dest Gas: 30000000000000 wei
      Authorize Minter: true
      Using Nonce: 78
      TX: 0x64ca045b46a6d01b3ac9924c604424deea7bf58d74dae8c5edfda81e8a31cc8b
      ✅ Configured!

   🌐 Chain 10 (Optimism):
      Remote Contract: 0xEab30C23A015942BDc8204bD8dcA2780a5957a8c
      Wrapped Gas Token: 0x0d500B1d8E8eF31E21C99d1Db9A6444d3ADf1270
      Protocol Fee: 0.12 USDC
      VIA Source Fee: 0.25 USDC
      VIA Dest Gas: 30000000000000 wei
      Authorize Minter: true
      Using Nonce: 78
      TX: 0x6cddbba670830069c81fa0b7283c1c6f2247d46b8f11a46598e55cf85fd21e4e
^C
Ganadhishs-MacBook-Air:multi-chain-with-via ganadhish$ npx hardhat run scripts/pre-audit-scripts/configure-all-routes.js --network avalanche

🌐 CONFIGURE ALL ROUTES (Pre-Audit Contracts)
═══════════════════════════════════════════════════════
📍 Network: avalanche (Chain ID: 43114)
👤 Signer: 0x05F8cC8753D90d67DBB8c02118440b8283F941c9
🎯 Token: PLSX

📍 Current Contract: 0x7e39288d48ae017B1dF2f20523a6A1c7C91D96E2
   Type: synthetic
   MessageV3: 0x72E052Fa7f0788e668965d37B6c38C88703B7859
   Wrapped Gas Token: 0xB31f66AA3C1e785363F0875A1B74E27b85FD66c7

🌐 Remote Chains to Configure (6 total):
   - Chain 369 (PulseChain): 0xDe524350F6421842EE39baC52d69c0Db26DD0479 [collateral]
   - Chain 8453 (Base): 0xF8Ae2Ca61ccAF2e6912d142b797080a3F7439c53 [synthetic]
   - Chain 42161 (Arbitrum): 0xB04d0A850813A867f9e858A04fa11A22c58ff846 [synthetic]
   - Chain 10 (Optimism): 0xEab30C23A015942BDc8204bD8dcA2780a5957a8c [synthetic]
   - Chain 56 (BNB Chain): 0xC1d9A1f64291CF47e703eab6b27fA0660cAE7324 [synthetic]
   - Chain 137 (Polygon): 0xE18947547EB1f49B725c3Ca4f95bD45A84F6c24A [synthetic]

[STEP 1/2] Configuring MessageClient...
═══════════════════════════════════════════════════════
   MessageV3: 0x72E052Fa7f0788e668965d37B6c38C88703B7859
   Remote Chains: [369, 8453, 42161, 10, 56, 137]
   Confirmations: 15
   Using Nonce: 27
   TX: 0x7482f2b516c4dd6aad3c476d8d00396fff8bc3b441159e6b54d6e313d8130cd6
   ✅ MessageClient configured!

[STEP 2/2] Configuring Remote Chains...
═══════════════════════════════════════════════════════

   🌐 Chain 369 (PulseChain):
      Remote Contract: 0xDe524350F6421842EE39baC52d69c0Db26DD0479
      Wrapped Gas Token: 0xB31f66AA3C1e785363F0875A1B74E27b85FD66c7
      Protocol Fee: 0.12 USDC
      VIA Source Fee: 0.25 USDC
      VIA Dest Gas: 80000000000000000000 wei
      Authorize Minter: true
      Using Nonce: 28
      TX: 0x42a9bfd56653ac29bcb15056714327408931d567d4b5c68e84b1a380a17c7ad6
      ✅ Configured!

   🌐 Chain 8453 (Base):
      Remote Contract: 0xF8Ae2Ca61ccAF2e6912d142b797080a3F7439c53
      Wrapped Gas Token: 0xB31f66AA3C1e785363F0875A1B74E27b85FD66c7
      Protocol Fee: 0.12 USDC
      VIA Source Fee: 0.25 USDC
      VIA Dest Gas: 30000000000000 wei
      Authorize Minter: true
      Using Nonce: 29
      TX: 0x7ebd3015793ab858b8f821de94d4d7c0399367d6e250f26ec1166b455de9e965
      ✅ Configured!

   🌐 Chain 42161 (Arbitrum):
      Remote Contract: 0xB04d0A850813A867f9e858A04fa11A22c58ff846
      Wrapped Gas Token: 0xB31f66AA3C1e785363F0875A1B74E27b85FD66c7
      Protocol Fee: 0.12 USDC
      VIA Source Fee: 0.25 USDC
      VIA Dest Gas: 30000000000000 wei
      Authorize Minter: true
      Using Nonce: 30
      TX: 0x03471e3557d864f36b52de1c9e2125a0e32ee12b1ab0a97e3d6d6a862e1c0863
      ✅ Configured!

   🌐 Chain 10 (Optimism):
      Remote Contract: 0xEab30C23A015942BDc8204bD8dcA2780a5957a8c
      Wrapped Gas Token: 0xB31f66AA3C1e785363F0875A1B74E27b85FD66c7
      Protocol Fee: 0.12 USDC
      VIA Source Fee: 0.25 USDC
      VIA Dest Gas: 30000000000000 wei
      Authorize Minter: true
      Using Nonce: 31
      TX: 0x1a81143c8c232ff9c222b812471cdaa34c7adca5d514d6988e4cb5323b4a0845
      ✅ Configured!

   🌐 Chain 56 (BNB Chain):
      Remote Contract: 0xC1d9A1f64291CF47e703eab6b27fA0660cAE7324
      Wrapped Gas Token: 0xB31f66AA3C1e785363F0875A1B74E27b85FD66c7
      Protocol Fee: 0.12 USDC
      VIA Source Fee: 0.25 USDC
      VIA Dest Gas: 1500000000000000 wei
      Authorize Minter: true
      Using Nonce: 32
      TX: 0x7123e0559676462b42d0f8f9397ef6a395a664831897ef26bdb55d37a54335bf
      ✅ Configured!

   🌐 Chain 137 (Polygon):
      Remote Contract: 0xE18947547EB1f49B725c3Ca4f95bD45A84F6c24A
      Wrapped Gas Token: 0xB31f66AA3C1e785363F0875A1B74E27b85FD66c7
      Protocol Fee: 0.12 USDC
      VIA Source Fee: 0.25 USDC
      VIA Dest Gas: 30000000000000000 wei
      Authorize Minter: true
      Using Nonce: 33
      TX: 0x93af9034720deeda4674904bb726562270f0dc9c8b3f48b0b733dafc1a39927d
      ✅ Configured!

[VERIFICATION] Checking Configuration...
═══════════════════════════════════════════════════════
   Chain 369: Configured ✅ | Minter ✅
   Chain 8453: Configured ✅ | Minter ✅
   Chain 42161: Configured ✅ | Minter ✅
   Chain 10: Configured ✅ | Minter ✅
   Chain 56: Configured ✅ | Minter ✅
   Chain 137: Configured ✅ | Minter ✅

✅ ALL ROUTES CONFIGURED FOR PLSX ON AVALANCHE!
═══════════════════════════════════════════════════════
   📋 Configured 6 remote chains.

   📋 Next Steps:
   Run this script on ALL other chains with PLSX deployments:
      npx hardhat run scripts/pre-audit-scripts/configure-all-routes.js --network pulsechain PLSX
      npx hardhat run scripts/pre-audit-scripts/configure-all-routes.js --network base PLSX
      npx hardhat run scripts/pre-audit-scripts/configure-all-routes.js --network arbitrum PLSX
      npx hardhat run scripts/pre-audit-scripts/configure-all-routes.js --network optimism PLSX
      npx hardhat run scripts/pre-audit-scripts/configure-all-routes.js --network bnb PLSX
      npx hardhat run scripts/pre-audit-scripts/configure-all-routes.js --network polygon PLSX

________________________________________________________________________________________________

___________________________________________

___________________________________________
ALL SYNTHETIC CHAINS CONFIG FOR INC TOKEN: 
-------------------------------------------

npx hardhat run scripts/pre-audit-scripts/configure-all-routes.js --network pulsechain

🌐 CONFIGURE ALL ROUTES (Pre-Audit Contracts)
═══════════════════════════════════════════════════════
📍 Network: pulsechain (Chain ID: 369)
👤 Signer: 0x05F8cC8753D90d67DBB8c02118440b8283F941c9
🎯 Token: INC

📍 Current Contract: 0x25f9387AA86a6853C74AD1A14D531d03F8F1619a
   Type: collateral
   MessageV3: 0xba01F2bA548e69bA26Fd06a3bdf1A7857eeAC435
   Wrapped Gas Token: 0xA1077a294dDE1B09bB078844df40758a5D0f9a27

🌐 Remote Chains to Configure (6 total):
   - Chain 8453 (Base): 0x02B7f5Fe7459B6482545f0b1979c61BA22F4CCA5 [synthetic]
   - Chain 42161 (Arbitrum): 0x808945fc3ab570f67011e2008E56949ee6899267 [synthetic]
   - Chain 10 (Optimism): 0x1D135C2711f89e6eb70665BF55942E498835b336 [synthetic]
   - Chain 56 (BNB Chain): 0x6B7c81207240a38e03E5e9B138C53c4762515cCD [synthetic]
   - Chain 137 (Polygon): 0x7307FEE834DdC88A716904830C0cb356A4878be1 [synthetic]
   - Chain 43114 (Avalanche): 0x3E8cEA4287b7D1d707FE3FD526a19C3fE2221798 [synthetic]

[STEP 1/2] Configuring MessageClient...
═══════════════════════════════════════════════════════
   MessageV3: 0xba01F2bA548e69bA26Fd06a3bdf1A7857eeAC435
   Remote Chains: [8453, 42161, 10, 56, 137, 43114]
   Confirmations: 15
   Using Nonce: 730
   TX: 0xe6a52edff070730f2d254f66238f28bc704ea61bcc5830f621b38559527fc473
   ✅ MessageClient configured!

[STEP 2/2] Configuring Remote Chains...
═══════════════════════════════════════════════════════

   🌐 Chain 8453 (Base):
      Remote Contract: 0x02B7f5Fe7459B6482545f0b1979c61BA22F4CCA5
      Wrapped Gas Token: 0xA1077a294dDE1B09bB078844df40758a5D0f9a27
      Protocol Fee: 0.12 USDC
      VIA Source Fee: 0.25 USDC
      VIA Dest Gas: 80000000000000000000 wei
      Using Nonce: 731
      TX: 0x256ba6d4efd19ef1ddb995d2fe90aa72afd94c0ae05929d21344c8d684d83a2e
      ✅ Configured!

   🌐 Chain 42161 (Arbitrum):
      Remote Contract: 0x808945fc3ab570f67011e2008E56949ee6899267
      Wrapped Gas Token: 0xA1077a294dDE1B09bB078844df40758a5D0f9a27
      Protocol Fee: 0.12 USDC
      VIA Source Fee: 0.25 USDC
      VIA Dest Gas: 80000000000000000000 wei
      Using Nonce: 732
      TX: 0x9826f732f742a9a3cdbe817173fd7ea9b4a689be8260d192a76e5b0172a35992
      ✅ Configured!

   🌐 Chain 10 (Optimism):
      Remote Contract: 0x1D135C2711f89e6eb70665BF55942E498835b336
      Wrapped Gas Token: 0xA1077a294dDE1B09bB078844df40758a5D0f9a27
      Protocol Fee: 0.12 USDC
      VIA Source Fee: 0.25 USDC
      VIA Dest Gas: 80000000000000000000 wei
      Using Nonce: 733
      TX: 0xe30614c8348291f3f3fb358eadc1365221302981152ca637a429642d7c7e2c9c
      ✅ Configured!

   🌐 Chain 56 (BNB Chain):
      Remote Contract: 0x6B7c81207240a38e03E5e9B138C53c4762515cCD
      Wrapped Gas Token: 0xA1077a294dDE1B09bB078844df40758a5D0f9a27
      Protocol Fee: 0.12 USDC
      VIA Source Fee: 0.25 USDC
      VIA Dest Gas: 80000000000000000000 wei
      Using Nonce: 734
      TX: 0xd76a6ebc79007d8ca1a24de6086ac80a60ea2f33bfa5353eef4fbed8218a94ec
      ✅ Configured!

   🌐 Chain 137 (Polygon):
      Remote Contract: 0x7307FEE834DdC88A716904830C0cb356A4878be1
      Wrapped Gas Token: 0xA1077a294dDE1B09bB078844df40758a5D0f9a27
      Protocol Fee: 0.12 USDC
      VIA Source Fee: 0.25 USDC
      VIA Dest Gas: 80000000000000000000 wei
      Using Nonce: 735
      TX: 0x36ec939e8cd4adc0aef5acb4e9d365817cbe254c5484bbacb177e8ecdef960d8
      ✅ Configured!

   🌐 Chain 43114 (Avalanche):
      Remote Contract: 0x3E8cEA4287b7D1d707FE3FD526a19C3fE2221798
      Wrapped Gas Token: 0xA1077a294dDE1B09bB078844df40758a5D0f9a27
      Protocol Fee: 0.12 USDC
      VIA Source Fee: 0.25 USDC
      VIA Dest Gas: 80000000000000000000 wei
      Using Nonce: 736
      TX: 0x729dbb3c85354ec97b5af84f8a34be178c10f69d99c2559b323f96c5ec51c425
      ✅ Configured!

[VERIFICATION] Checking Configuration...
═══════════════════════════════════════════════════════
   Chain 8453: Configured ✅
   Chain 42161: Configured ✅
   Chain 10: Configured ✅
   Chain 56: Configured ✅
   Chain 137: Configured ✅
   Chain 43114: Configured ✅

✅ ALL ROUTES CONFIGURED FOR INC ON PULSECHAIN!
═══════════════════════════════════════════════════════
   📋 Configured 6 remote chains.

   📋 Next Steps:
   Run this script on ALL other chains with INC deployments:
      npx hardhat run scripts/pre-audit-scripts/configure-all-routes.js --network base INC
      npx hardhat run scripts/pre-audit-scripts/configure-all-routes.js --network arbitrum INC
      npx hardhat run scripts/pre-audit-scripts/configure-all-routes.js --network optimism INC
      npx hardhat run scripts/pre-audit-scripts/configure-all-routes.js --network bnb INC
      npx hardhat run scripts/pre-audit-scripts/configure-all-routes.js --network polygon INC
      npx hardhat run scripts/pre-audit-scripts/configure-all-routes.js --network avalanche INC
Ganadhishs-MacBook-Air:multi-chain-with-via ganadhish$ npx hardhat run scripts/pre-audit-scripts/configure-all-routes.js --network base

🌐 CONFIGURE ALL ROUTES (Pre-Audit Contracts)
═══════════════════════════════════════════════════════
📍 Network: base (Chain ID: 8453)
👤 Signer: 0x05F8cC8753D90d67DBB8c02118440b8283F941c9
🎯 Token: INC

📍 Current Contract: 0x02B7f5Fe7459B6482545f0b1979c61BA22F4CCA5
   Type: synthetic
   MessageV3: 0xe3b3274bb685F37C7f17a604039c77a6A16Cfc2a
   Wrapped Gas Token: 0x4200000000000000000000000000000000000006

🌐 Remote Chains to Configure (6 total):
   - Chain 369 (PulseChain): 0x25f9387AA86a6853C74AD1A14D531d03F8F1619a [collateral]
   - Chain 42161 (Arbitrum): 0x808945fc3ab570f67011e2008E56949ee6899267 [synthetic]
   - Chain 10 (Optimism): 0x1D135C2711f89e6eb70665BF55942E498835b336 [synthetic]
   - Chain 56 (BNB Chain): 0x6B7c81207240a38e03E5e9B138C53c4762515cCD [synthetic]
   - Chain 137 (Polygon): 0x7307FEE834DdC88A716904830C0cb356A4878be1 [synthetic]
   - Chain 43114 (Avalanche): 0x3E8cEA4287b7D1d707FE3FD526a19C3fE2221798 [synthetic]

[STEP 1/2] Configuring MessageClient...
═══════════════════════════════════════════════════════
   MessageV3: 0xe3b3274bb685F37C7f17a604039c77a6A16Cfc2a
   Remote Chains: [369, 42161, 10, 56, 137, 43114]
   Confirmations: 15
   Using Nonce: 500
   TX: 0x6d5c1782cebb2e3f3b28b218a7deba426a89835c9b950c04dc1a7b6d9411b1f9
   ✅ MessageClient configured!

[STEP 2/2] Configuring Remote Chains...
═══════════════════════════════════════════════════════

   🌐 Chain 369 (PulseChain):
      Remote Contract: 0x25f9387AA86a6853C74AD1A14D531d03F8F1619a
      Wrapped Gas Token: 0x4200000000000000000000000000000000000006
      Protocol Fee: 0.12 USDC
      VIA Source Fee: 0.25 USDC
      VIA Dest Gas: 30000000000000 wei
      Authorize Minter: true
      Using Nonce: 501
      TX: 0x12664018b8f14e2b1aacccdd00f99dd0c1c95b5658f2e9c2346a8862e3e4b61f
      ✅ Configured!

   🌐 Chain 42161 (Arbitrum):
      Remote Contract: 0x808945fc3ab570f67011e2008E56949ee6899267
      Wrapped Gas Token: 0x4200000000000000000000000000000000000006
      Protocol Fee: 0.12 USDC
      VIA Source Fee: 0.25 USDC
      VIA Dest Gas: 30000000000000 wei
      Authorize Minter: true
      Using Nonce: 502
      TX: 0xef7cdffb6a925899592e59c0cdf4cc821b5d7b58d823d96e932b981c27ecf65c
      ✅ Configured!

   🌐 Chain 10 (Optimism):
      Remote Contract: 0x1D135C2711f89e6eb70665BF55942E498835b336
      Wrapped Gas Token: 0x4200000000000000000000000000000000000006
      Protocol Fee: 0.12 USDC
      VIA Source Fee: 0.25 USDC
      VIA Dest Gas: 30000000000000 wei
      Authorize Minter: true
      Using Nonce: 503
      TX: 0x0edf1472b34d679cf431e2701bb9e6626024917e017166aee5ac2b9eecfd536a
      ✅ Configured!

   🌐 Chain 56 (BNB Chain):
      Remote Contract: 0x6B7c81207240a38e03E5e9B138C53c4762515cCD
      Wrapped Gas Token: 0x4200000000000000000000000000000000000006
      Protocol Fee: 0.12 USDC
      VIA Source Fee: 0.25 USDC
      VIA Dest Gas: 30000000000000 wei
      Authorize Minter: true
      Using Nonce: 504
      TX: 0x4f7bfd223168fefafe038a6ce1a6c5a2ee565e4db9a56c38d3070a6914579841
      ✅ Configured!

   🌐 Chain 137 (Polygon):
      Remote Contract: 0x7307FEE834DdC88A716904830C0cb356A4878be1
      Wrapped Gas Token: 0x4200000000000000000000000000000000000006
      Protocol Fee: 0.12 USDC
      VIA Source Fee: 0.25 USDC
      VIA Dest Gas: 30000000000000 wei
      Authorize Minter: true
      Using Nonce: 505
      TX: 0x083882b9ad119750d5fc6f08c77755180c71ca43b736cf2e5e770b8edbb178e6
      ✅ Configured!

   🌐 Chain 43114 (Avalanche):
      Remote Contract: 0x3E8cEA4287b7D1d707FE3FD526a19C3fE2221798
      Wrapped Gas Token: 0x4200000000000000000000000000000000000006
      Protocol Fee: 0.12 USDC
      VIA Source Fee: 0.25 USDC
      VIA Dest Gas: 30000000000000 wei
      Authorize Minter: true
      Using Nonce: 506
      TX: 0x1d5e9f94c67c3bb14c3244155e402c97984acfc9e98e42a925322bf0eafabff8
      ✅ Configured!

[VERIFICATION] Checking Configuration...
═══════════════════════════════════════════════════════
   Chain 369: Configured ✅ | Minter ✅
   Chain 42161: Configured ✅ | Minter ✅
   Chain 10: Configured ✅ | Minter ✅
   Chain 56: Configured ✅ | Minter ✅
   Chain 137: Configured ✅ | Minter ✅
   Chain 43114: Configured ✅ | Minter ✅

✅ ALL ROUTES CONFIGURED FOR INC ON BASE!
═══════════════════════════════════════════════════════
   📋 Configured 6 remote chains.

   📋 Next Steps:
   Run this script on ALL other chains with INC deployments:
      npx hardhat run scripts/pre-audit-scripts/configure-all-routes.js --network pulsechain INC
      npx hardhat run scripts/pre-audit-scripts/configure-all-routes.js --network arbitrum INC
      npx hardhat run scripts/pre-audit-scripts/configure-all-routes.js --network optimism INC
      npx hardhat run scripts/pre-audit-scripts/configure-all-routes.js --network bnb INC
      npx hardhat run scripts/pre-audit-scripts/configure-all-routes.js --network polygon INC
      npx hardhat run scripts/pre-audit-scripts/configure-all-routes.js --network avalanche INC
Ganadhishs-MacBook-Air:multi-chain-with-via ganadhish$ npx hardhat run scripts/pre-audit-scripts/configure-all-routes.js --network arbitrum

🌐 CONFIGURE ALL ROUTES (Pre-Audit Contracts)
═══════════════════════════════════════════════════════
📍 Network: arbitrum (Chain ID: 42161)
👤 Signer: 0x05F8cC8753D90d67DBB8c02118440b8283F941c9
🎯 Token: INC

📍 Current Contract: 0x808945fc3ab570f67011e2008E56949ee6899267
   Type: synthetic
   MessageV3: 0x65EEc58ef38882422E887B82f7085e9a9C35dCA1
   Wrapped Gas Token: 0x82aF49447D8a07e3bd95BD0d56f35241523fBab1

🌐 Remote Chains to Configure (6 total):
   - Chain 369 (PulseChain): 0x25f9387AA86a6853C74AD1A14D531d03F8F1619a [collateral]
   - Chain 8453 (Base): 0x02B7f5Fe7459B6482545f0b1979c61BA22F4CCA5 [synthetic]
   - Chain 10 (Optimism): 0x1D135C2711f89e6eb70665BF55942E498835b336 [synthetic]
   - Chain 56 (BNB Chain): 0x6B7c81207240a38e03E5e9B138C53c4762515cCD [synthetic]
   - Chain 137 (Polygon): 0x7307FEE834DdC88A716904830C0cb356A4878be1 [synthetic]
   - Chain 43114 (Avalanche): 0x3E8cEA4287b7D1d707FE3FD526a19C3fE2221798 [synthetic]

[STEP 1/2] Configuring MessageClient...
═══════════════════════════════════════════════════════
   MessageV3: 0x65EEc58ef38882422E887B82f7085e9a9C35dCA1
   Remote Chains: [369, 8453, 10, 56, 137, 43114]
   Confirmations: 15
   Using Nonce: 153
   TX: 0x16ef13a15c77ff5fff2bd7b4a818a906ad0e1fddba273c6e9bb5c68fb3843643
   ✅ MessageClient configured!

[STEP 2/2] Configuring Remote Chains...
═══════════════════════════════════════════════════════

   🌐 Chain 369 (PulseChain):
      Remote Contract: 0x25f9387AA86a6853C74AD1A14D531d03F8F1619a
      Wrapped Gas Token: 0x82aF49447D8a07e3bd95BD0d56f35241523fBab1
      Protocol Fee: 0.12 USDC
      VIA Source Fee: 0.25 USDC
      VIA Dest Gas: 30000000000000 wei
      Authorize Minter: true
      Using Nonce: 154
      TX: 0x1ccb778eca0a94823571b4c31c66c9342b0121710b1ed51002545bc7c390cbf2
      ✅ Configured!

   🌐 Chain 8453 (Base):
      Remote Contract: 0x02B7f5Fe7459B6482545f0b1979c61BA22F4CCA5
      Wrapped Gas Token: 0x82aF49447D8a07e3bd95BD0d56f35241523fBab1
      Protocol Fee: 0.12 USDC
      VIA Source Fee: 0.25 USDC
      VIA Dest Gas: 30000000000000 wei
      Authorize Minter: true
      Using Nonce: 155
      TX: 0x2585f7983be4851c45ddfeac4b25962ee12357be4ede911cc0f09e49dc96321f
      ✅ Configured!

   🌐 Chain 10 (Optimism):
      Remote Contract: 0x1D135C2711f89e6eb70665BF55942E498835b336
      Wrapped Gas Token: 0x82aF49447D8a07e3bd95BD0d56f35241523fBab1
      Protocol Fee: 0.12 USDC
      VIA Source Fee: 0.25 USDC
      VIA Dest Gas: 30000000000000 wei
      Authorize Minter: true
      Using Nonce: 156
      TX: 0x42a9c3e1bd48ac4f10729a1845eccffaf671f14dfbe7d5f1d4b1b3b33b1ab425
      ✅ Configured!

   🌐 Chain 56 (BNB Chain):
      Remote Contract: 0x6B7c81207240a38e03E5e9B138C53c4762515cCD
      Wrapped Gas Token: 0x82aF49447D8a07e3bd95BD0d56f35241523fBab1
      Protocol Fee: 0.12 USDC
      VIA Source Fee: 0.25 USDC
      VIA Dest Gas: 30000000000000 wei
      Authorize Minter: true
      Using Nonce: 157
      TX: 0xa966d58369cceab9781d1a628065e51133c05559966d54dfdb488bbf5f90fc71
      ✅ Configured!

   🌐 Chain 137 (Polygon):
      Remote Contract: 0x7307FEE834DdC88A716904830C0cb356A4878be1
      Wrapped Gas Token: 0x82aF49447D8a07e3bd95BD0d56f35241523fBab1
      Protocol Fee: 0.12 USDC
      VIA Source Fee: 0.25 USDC
      VIA Dest Gas: 30000000000000 wei
      Authorize Minter: true
      Using Nonce: 158
      TX: 0x6df75a9d7464c7c942e21d8f5d1cdd27a0cdf1496e645dd769fed40619bfd3d7
      ✅ Configured!

   🌐 Chain 43114 (Avalanche):
      Remote Contract: 0x3E8cEA4287b7D1d707FE3FD526a19C3fE2221798
      Wrapped Gas Token: 0x82aF49447D8a07e3bd95BD0d56f35241523fBab1
      Protocol Fee: 0.12 USDC
      VIA Source Fee: 0.25 USDC
      VIA Dest Gas: 30000000000000 wei
      Authorize Minter: true
      Using Nonce: 159
      TX: 0xc0d89187794090550dd4a32d30989abb1381202fa00ca63b63803b982e1b3646
      ✅ Configured!

[VERIFICATION] Checking Configuration...
═══════════════════════════════════════════════════════
   Chain 369: Configured ✅ | Minter ✅
   Chain 8453: Configured ✅ | Minter ✅
   Chain 10: Configured ✅ | Minter ✅
   Chain 56: Configured ✅ | Minter ✅
   Chain 137: Configured ✅ | Minter ✅
   Chain 43114: Configured ✅ | Minter ✅

✅ ALL ROUTES CONFIGURED FOR INC ON ARBITRUM!
═══════════════════════════════════════════════════════
   📋 Configured 6 remote chains.

   📋 Next Steps:
   Run this script on ALL other chains with INC deployments:
      npx hardhat run scripts/pre-audit-scripts/configure-all-routes.js --network pulsechain INC
      npx hardhat run scripts/pre-audit-scripts/configure-all-routes.js --network base INC
      npx hardhat run scripts/pre-audit-scripts/configure-all-routes.js --network optimism INC
      npx hardhat run scripts/pre-audit-scripts/configure-all-routes.js --network bnb INC
      npx hardhat run scripts/pre-audit-scripts/configure-all-routes.js --network polygon INC
      npx hardhat run scripts/pre-audit-scripts/configure-all-routes.js --network avalanche INC
Ganadhishs-MacBook-Air:multi-chain-with-via ganadhish$ npx hardhat run scripts/pre-audit-scripts/configure-all-routes.js --network optimism

🌐 CONFIGURE ALL ROUTES (Pre-Audit Contracts)
═══════════════════════════════════════════════════════
📍 Network: optimism (Chain ID: 10)
👤 Signer: 0x05F8cC8753D90d67DBB8c02118440b8283F941c9
🎯 Token: INC

📍 Current Contract: 0x1D135C2711f89e6eb70665BF55942E498835b336
   Type: synthetic
   MessageV3: 0x15AC559DA4951c796DB6620fAb286B96840D039A
   Wrapped Gas Token: 0x4200000000000000000000000000000000000006

🌐 Remote Chains to Configure (6 total):
   - Chain 369 (PulseChain): 0x25f9387AA86a6853C74AD1A14D531d03F8F1619a [collateral]
   - Chain 8453 (Base): 0x02B7f5Fe7459B6482545f0b1979c61BA22F4CCA5 [synthetic]
   - Chain 42161 (Arbitrum): 0x808945fc3ab570f67011e2008E56949ee6899267 [synthetic]
   - Chain 56 (BNB Chain): 0x6B7c81207240a38e03E5e9B138C53c4762515cCD [synthetic]
   - Chain 137 (Polygon): 0x7307FEE834DdC88A716904830C0cb356A4878be1 [synthetic]
   - Chain 43114 (Avalanche): 0x3E8cEA4287b7D1d707FE3FD526a19C3fE2221798 [synthetic]

[STEP 1/2] Configuring MessageClient...
═══════════════════════════════════════════════════════
   MessageV3: 0x15AC559DA4951c796DB6620fAb286B96840D039A
   Remote Chains: [369, 8453, 42161, 56, 137, 43114]
   Confirmations: 15
   Using Nonce: 110
   TX: 0xd136f2283ccced49f4dde9beae534668e9b43c63be9a44e55b9921455d4d665c
   ✅ MessageClient configured!

[STEP 2/2] Configuring Remote Chains...
═══════════════════════════════════════════════════════

   🌐 Chain 369 (PulseChain):
      Remote Contract: 0x25f9387AA86a6853C74AD1A14D531d03F8F1619a
      Wrapped Gas Token: 0x4200000000000000000000000000000000000006
      Protocol Fee: 0.12 USDC
      VIA Source Fee: 0.25 USDC
      VIA Dest Gas: 30000000000000 wei
      Authorize Minter: true
      Using Nonce: 111
      TX: 0x3f8eb448eff82ee839ec02e9999d5a50f3d402deee2f66d13fab892ee22091b6
      ✅ Configured!

   🌐 Chain 8453 (Base):
      Remote Contract: 0x02B7f5Fe7459B6482545f0b1979c61BA22F4CCA5
      Wrapped Gas Token: 0x4200000000000000000000000000000000000006
      Protocol Fee: 0.12 USDC
      VIA Source Fee: 0.25 USDC
      VIA Dest Gas: 30000000000000 wei
      Authorize Minter: true
      Using Nonce: 112
      TX: 0xb9f991e974c56a965c8bcd352484d80d86a758ecee7668c89938a67a3d696b2f
      ✅ Configured!

   🌐 Chain 42161 (Arbitrum):
      Remote Contract: 0x808945fc3ab570f67011e2008E56949ee6899267
      Wrapped Gas Token: 0x4200000000000000000000000000000000000006
      Protocol Fee: 0.12 USDC
      VIA Source Fee: 0.25 USDC
      VIA Dest Gas: 30000000000000 wei
      Authorize Minter: true
      Using Nonce: 113
      TX: 0xc5ada1ae4a230ebad148ead0ab73be156ec64cc653f6c0ef0c4c01c753ff7828
      ✅ Configured!

   🌐 Chain 56 (BNB Chain):
      Remote Contract: 0x6B7c81207240a38e03E5e9B138C53c4762515cCD
      Wrapped Gas Token: 0x4200000000000000000000000000000000000006
      Protocol Fee: 0.12 USDC
      VIA Source Fee: 0.25 USDC
      VIA Dest Gas: 30000000000000 wei
      Authorize Minter: true
      Using Nonce: 114
      TX: 0x5483276998ab6af76ba346affab5be8e79d366642743d45730d10ebf11061128
      ✅ Configured!

   🌐 Chain 137 (Polygon):
      Remote Contract: 0x7307FEE834DdC88A716904830C0cb356A4878be1
      Wrapped Gas Token: 0x4200000000000000000000000000000000000006
      Protocol Fee: 0.12 USDC
      VIA Source Fee: 0.25 USDC
      VIA Dest Gas: 30000000000000 wei
      Authorize Minter: true
      Using Nonce: 115
      TX: 0x4455daf964cd46d075f5f42905301d43149b403a0c1170fa8251b88593ac4870
      ✅ Configured!

   🌐 Chain 43114 (Avalanche):
      Remote Contract: 0x3E8cEA4287b7D1d707FE3FD526a19C3fE2221798
      Wrapped Gas Token: 0x4200000000000000000000000000000000000006
      Protocol Fee: 0.12 USDC
      VIA Source Fee: 0.25 USDC
      VIA Dest Gas: 30000000000000 wei
      Authorize Minter: true
      Using Nonce: 116
      TX: 0x7eb6dfd988517d4c1be581275c133194095bc8290896118370c102b9c40ff94c
      ✅ Configured!

[VERIFICATION] Checking Configuration...
═══════════════════════════════════════════════════════
   Chain 369: Configured ✅ | Minter ✅
   Chain 8453: Configured ✅ | Minter ✅
   Chain 42161: Configured ✅ | Minter ✅
   Chain 56: Configured ✅ | Minter ✅
   Chain 137: Configured ✅ | Minter ✅
   Chain 43114: Configured ✅ | Minter ✅

✅ ALL ROUTES CONFIGURED FOR INC ON OPTIMISM!
═══════════════════════════════════════════════════════
   📋 Configured 6 remote chains.

   📋 Next Steps:
   Run this script on ALL other chains with INC deployments:
      npx hardhat run scripts/pre-audit-scripts/configure-all-routes.js --network pulsechain INC
      npx hardhat run scripts/pre-audit-scripts/configure-all-routes.js --network base INC
      npx hardhat run scripts/pre-audit-scripts/configure-all-routes.js --network arbitrum INC
      npx hardhat run scripts/pre-audit-scripts/configure-all-routes.js --network bnb INC
      npx hardhat run scripts/pre-audit-scripts/configure-all-routes.js --network polygon INC
      npx hardhat run scripts/pre-audit-scripts/configure-all-routes.js --network avalanche INC
Ganadhishs-MacBook-Air:multi-chain-with-via ganadhish$ npx hardhat run scripts/pre-audit-scripts/configure-all-routes.js --network bnb

🌐 CONFIGURE ALL ROUTES (Pre-Audit Contracts)
═══════════════════════════════════════════════════════
📍 Network: bnb (Chain ID: 56)
👤 Signer: 0x05F8cC8753D90d67DBB8c02118440b8283F941c9
🎯 Token: INC

📍 Current Contract: 0x6B7c81207240a38e03E5e9B138C53c4762515cCD
   Type: synthetic
   MessageV3: 0x7b67dF6728E294db2eb173ac7c738a4627Ae5e11
   Wrapped Gas Token: 0xbb4CdB9CBd36B01bD1cBaEBF2De08d9173bc095c

🌐 Remote Chains to Configure (6 total):
   - Chain 369 (PulseChain): 0x25f9387AA86a6853C74AD1A14D531d03F8F1619a [collateral]
   - Chain 8453 (Base): 0x02B7f5Fe7459B6482545f0b1979c61BA22F4CCA5 [synthetic]
   - Chain 42161 (Arbitrum): 0x808945fc3ab570f67011e2008E56949ee6899267 [synthetic]
   - Chain 10 (Optimism): 0x1D135C2711f89e6eb70665BF55942E498835b336 [synthetic]
   - Chain 137 (Polygon): 0x7307FEE834DdC88A716904830C0cb356A4878be1 [synthetic]
   - Chain 43114 (Avalanche): 0x3E8cEA4287b7D1d707FE3FD526a19C3fE2221798 [synthetic]

[STEP 1/2] Configuring MessageClient...
═══════════════════════════════════════════════════════
   MessageV3: 0x7b67dF6728E294db2eb173ac7c738a4627Ae5e11
   Remote Chains: [369, 8453, 42161, 10, 137, 43114]
   Confirmations: 15
   Using Nonce: 56
   TX: 0x9ed9c3174ca96e50fb7aadf499c7d985e5fdf1c04f92f63fa1949d835fe5ad3f
   ✅ MessageClient configured!

[STEP 2/2] Configuring Remote Chains...
═══════════════════════════════════════════════════════

   🌐 Chain 369 (PulseChain):
      Remote Contract: 0x25f9387AA86a6853C74AD1A14D531d03F8F1619a
      Wrapped Gas Token: 0xbb4CdB9CBd36B01bD1cBaEBF2De08d9173bc095c
      Protocol Fee: 0.12 USDC
      VIA Source Fee: 0.25 USDC
      VIA Dest Gas: 1500000000000000 wei
      Authorize Minter: true
      Using Nonce: 57
      TX: 0x15c90f968ba4d088ae9648484f559b8e1249fbd3e798e2c3d55065e18a3d2c0a
      ✅ Configured!

   🌐 Chain 8453 (Base):
      Remote Contract: 0x02B7f5Fe7459B6482545f0b1979c61BA22F4CCA5
      Wrapped Gas Token: 0xbb4CdB9CBd36B01bD1cBaEBF2De08d9173bc095c
      Protocol Fee: 0.12 USDC
      VIA Source Fee: 0.25 USDC
      VIA Dest Gas: 1500000000000000 wei
      Authorize Minter: true
      Using Nonce: 58
      TX: 0x3163651438f9987cb296f4b64297231d3f563876794fc5897a797f60ada57ff4
      ✅ Configured!

   🌐 Chain 42161 (Arbitrum):
      Remote Contract: 0x808945fc3ab570f67011e2008E56949ee6899267
      Wrapped Gas Token: 0xbb4CdB9CBd36B01bD1cBaEBF2De08d9173bc095c
      Protocol Fee: 0.12 USDC
      VIA Source Fee: 0.25 USDC
      VIA Dest Gas: 1500000000000000 wei
      Authorize Minter: true
      Using Nonce: 59
      TX: 0x0ca25edb26f0741eb80b4e301a998d2645c6ca5517fa27c8cb15dd49198d44e1
      ✅ Configured!

   🌐 Chain 10 (Optimism):
      Remote Contract: 0x1D135C2711f89e6eb70665BF55942E498835b336
      Wrapped Gas Token: 0xbb4CdB9CBd36B01bD1cBaEBF2De08d9173bc095c
      Protocol Fee: 0.12 USDC
      VIA Source Fee: 0.25 USDC
      VIA Dest Gas: 1500000000000000 wei
      Authorize Minter: true
      Using Nonce: 60
      TX: 0xb92e987fe464b4f57afd588f2303385f273e5a795aae01ff822a3d5fe32663f5
      ✅ Configured!

   🌐 Chain 137 (Polygon):
      Remote Contract: 0x7307FEE834DdC88A716904830C0cb356A4878be1
      Wrapped Gas Token: 0xbb4CdB9CBd36B01bD1cBaEBF2De08d9173bc095c
      Protocol Fee: 0.12 USDC
      VIA Source Fee: 0.25 USDC
      VIA Dest Gas: 1500000000000000 wei
      Authorize Minter: true
      Using Nonce: 61
      TX: 0xf875d4f9aa002966b705550cb20f8948f3a5aff30e38c6aa7eb9be767aea8446
      ✅ Configured!

   🌐 Chain 43114 (Avalanche):
      Remote Contract: 0x3E8cEA4287b7D1d707FE3FD526a19C3fE2221798
      Wrapped Gas Token: 0xbb4CdB9CBd36B01bD1cBaEBF2De08d9173bc095c
      Protocol Fee: 0.12 USDC
      VIA Source Fee: 0.25 USDC
      VIA Dest Gas: 1500000000000000 wei
      Authorize Minter: true
      Using Nonce: 62
      TX: 0x34022bc0648af22af537986955ae8a528cc42a48864946dcff64314a2ff3c017
      ✅ Configured!

[VERIFICATION] Checking Configuration...
═══════════════════════════════════════════════════════
   Chain 369: Configured ✅ | Minter ✅
   Chain 8453: Configured ✅ | Minter ✅
   Chain 42161: Configured ✅ | Minter ✅
   Chain 10: Configured ✅ | Minter ✅
   Chain 137: Configured ✅ | Minter ✅
   Chain 43114: Configured ✅ | Minter ✅

✅ ALL ROUTES CONFIGURED FOR INC ON BNB!
═══════════════════════════════════════════════════════
   📋 Configured 6 remote chains.

   📋 Next Steps:
   Run this script on ALL other chains with INC deployments:
      npx hardhat run scripts/pre-audit-scripts/configure-all-routes.js --network pulsechain INC
      npx hardhat run scripts/pre-audit-scripts/configure-all-routes.js --network base INC
      npx hardhat run scripts/pre-audit-scripts/configure-all-routes.js --network arbitrum INC
      npx hardhat run scripts/pre-audit-scripts/configure-all-routes.js --network optimism INC
      npx hardhat run scripts/pre-audit-scripts/configure-all-routes.js --network polygon INC
      npx hardhat run scripts/pre-audit-scripts/configure-all-routes.js --network avalanche INC
Ganadhishs-MacBook-Air:multi-chain-with-via ganadhish$ npx hardhat run scripts/pre-audit-scripts/configure-all-routes.js --network polygon

🌐 CONFIGURE ALL ROUTES (Pre-Audit Contracts)
═══════════════════════════════════════════════════════
📍 Network: polygon (Chain ID: 137)
👤 Signer: 0x05F8cC8753D90d67DBB8c02118440b8283F941c9
🎯 Token: INC

📍 Current Contract: 0x7307FEE834DdC88A716904830C0cb356A4878be1
   Type: synthetic
   MessageV3: 0x1C5800eb5fECB7760D7F1978ad744feA652a7b27
   Wrapped Gas Token: 0x0d500B1d8E8eF31E21C99d1Db9A6444d3ADf1270

🌐 Remote Chains to Configure (6 total):
   - Chain 369 (PulseChain): 0x25f9387AA86a6853C74AD1A14D531d03F8F1619a [collateral]
   - Chain 8453 (Base): 0x02B7f5Fe7459B6482545f0b1979c61BA22F4CCA5 [synthetic]
   - Chain 42161 (Arbitrum): 0x808945fc3ab570f67011e2008E56949ee6899267 [synthetic]
   - Chain 10 (Optimism): 0x1D135C2711f89e6eb70665BF55942E498835b336 [synthetic]
   - Chain 56 (BNB Chain): 0x6B7c81207240a38e03E5e9B138C53c4762515cCD [synthetic]
   - Chain 43114 (Avalanche): 0x3E8cEA4287b7D1d707FE3FD526a19C3fE2221798 [synthetic]

[STEP 1/2] Configuring MessageClient...
═══════════════════════════════════════════════════════
   MessageV3: 0x1C5800eb5fECB7760D7F1978ad744feA652a7b27
   Remote Chains: [369, 8453, 42161, 10, 56, 43114]
   Confirmations: 15
   Using Nonce: 100
   TX: 0x40bd5b5514cf5750041d8f0177639c57ecf85458b7a5465dc220f2e95058f50e
   ✅ MessageClient configured!

[STEP 2/2] Configuring Remote Chains...
═══════════════════════════════════════════════════════

   🌐 Chain 369 (PulseChain):
      Remote Contract: 0x25f9387AA86a6853C74AD1A14D531d03F8F1619a
      Wrapped Gas Token: 0x0d500B1d8E8eF31E21C99d1Db9A6444d3ADf1270
      Protocol Fee: 0.12 USDC
      VIA Source Fee: 0.25 USDC
      VIA Dest Gas: 30000000000000000 wei
      Authorize Minter: true
      Using Nonce: 101
      TX: 0x96fe3e5b27b9cda677a2793046b1762c364548e5eea7ac7d2691fd33f096535a
      ✅ Configured!

   🌐 Chain 8453 (Base):
      Remote Contract: 0x02B7f5Fe7459B6482545f0b1979c61BA22F4CCA5
      Wrapped Gas Token: 0x0d500B1d8E8eF31E21C99d1Db9A6444d3ADf1270
      Protocol Fee: 0.12 USDC
      VIA Source Fee: 0.25 USDC
      VIA Dest Gas: 30000000000000000 wei
      Authorize Minter: true
      Using Nonce: 102
      TX: 0xa64c0e81530aeb71258f4af1b4856c412b87111db220feb298210fc4e616ab75
      ✅ Configured!

   🌐 Chain 42161 (Arbitrum):
      Remote Contract: 0x808945fc3ab570f67011e2008E56949ee6899267
      Wrapped Gas Token: 0x0d500B1d8E8eF31E21C99d1Db9A6444d3ADf1270
      Protocol Fee: 0.12 USDC
      VIA Source Fee: 0.25 USDC
      VIA Dest Gas: 30000000000000000 wei
      Authorize Minter: true
      Using Nonce: 103
      TX: 0xc7e770b666c8106b4b9e3476c926159a2e459191fcd7b344440d611a17e41e12
      ✅ Configured!

   🌐 Chain 10 (Optimism):
      Remote Contract: 0x1D135C2711f89e6eb70665BF55942E498835b336
      Wrapped Gas Token: 0x0d500B1d8E8eF31E21C99d1Db9A6444d3ADf1270
      Protocol Fee: 0.12 USDC
      VIA Source Fee: 0.25 USDC
      VIA Dest Gas: 30000000000000000 wei
      Authorize Minter: true
      Using Nonce: 104
      TX: 0xa51d3dd0063ef6139d625cdad533e3be3c2fe8119a27a593480fc1cca04a9fd8
      ✅ Configured!

   🌐 Chain 56 (BNB Chain):
      Remote Contract: 0x6B7c81207240a38e03E5e9B138C53c4762515cCD
      Wrapped Gas Token: 0x0d500B1d8E8eF31E21C99d1Db9A6444d3ADf1270
      Protocol Fee: 0.12 USDC
      VIA Source Fee: 0.25 USDC
      VIA Dest Gas: 30000000000000000 wei
      Authorize Minter: true
      Using Nonce: 105
      TX: 0x200119449eb18bd06f8567435a76197e76bd40b6df2badf64498121e4f923342
      ✅ Configured!

   🌐 Chain 43114 (Avalanche):
      Remote Contract: 0x3E8cEA4287b7D1d707FE3FD526a19C3fE2221798
      Wrapped Gas Token: 0x0d500B1d8E8eF31E21C99d1Db9A6444d3ADf1270
      Protocol Fee: 0.12 USDC
      VIA Source Fee: 0.25 USDC
      VIA Dest Gas: 30000000000000000 wei
      Authorize Minter: true
      Using Nonce: 106
      TX: 0x36bd88704b8448650c80ac4ef2d6d33f7c7966bb7595796cc4af3cebe67fa062
      ✅ Configured!

[VERIFICATION] Checking Configuration...
═══════════════════════════════════════════════════════
   Chain 369: Configured ✅ | Minter ✅
   Chain 8453: Configured ✅ | Minter ✅
   Chain 42161: Configured ✅ | Minter ✅
   Chain 10: Configured ✅ | Minter ✅
   Chain 56: Configured ✅ | Minter ✅
   Chain 43114: Configured ✅ | Minter ✅

✅ ALL ROUTES CONFIGURED FOR INC ON POLYGON!
═══════════════════════════════════════════════════════
   📋 Configured 6 remote chains.

   📋 Next Steps:
   Run this script on ALL other chains with INC deployments:
      npx hardhat run scripts/pre-audit-scripts/configure-all-routes.js --network pulsechain INC
      npx hardhat run scripts/pre-audit-scripts/configure-all-routes.js --network base INC
      npx hardhat run scripts/pre-audit-scripts/configure-all-routes.js --network arbitrum INC
      npx hardhat run scripts/pre-audit-scripts/configure-all-routes.js --network optimism INC
      npx hardhat run scripts/pre-audit-scripts/configure-all-routes.js --network bnb INC
      npx hardhat run scripts/pre-audit-scripts/configure-all-routes.js --network avalanche INC
Ganadhishs-MacBook-Air:multi-chain-with-via ganadhish$ npx hardhat run scripts/pre-audit-scripts/configure-all-routes.js --network avalanche

🌐 CONFIGURE ALL ROUTES (Pre-Audit Contracts)
═══════════════════════════════════════════════════════
📍 Network: avalanche (Chain ID: 43114)
👤 Signer: 0x05F8cC8753D90d67DBB8c02118440b8283F941c9
🎯 Token: INC

📍 Current Contract: 0x3E8cEA4287b7D1d707FE3FD526a19C3fE2221798
   Type: synthetic
   MessageV3: 0x72E052Fa7f0788e668965d37B6c38C88703B7859
   Wrapped Gas Token: 0xB31f66AA3C1e785363F0875A1B74E27b85FD66c7

🌐 Remote Chains to Configure (6 total):
   - Chain 369 (PulseChain): 0x25f9387AA86a6853C74AD1A14D531d03F8F1619a [collateral]
   - Chain 8453 (Base): 0x02B7f5Fe7459B6482545f0b1979c61BA22F4CCA5 [synthetic]
   - Chain 42161 (Arbitrum): 0x808945fc3ab570f67011e2008E56949ee6899267 [synthetic]
   - Chain 10 (Optimism): 0x1D135C2711f89e6eb70665BF55942E498835b336 [synthetic]
   - Chain 56 (BNB Chain): 0x6B7c81207240a38e03E5e9B138C53c4762515cCD [synthetic]
   - Chain 137 (Polygon): 0x7307FEE834DdC88A716904830C0cb356A4878be1 [synthetic]

[STEP 1/2] Configuring MessageClient...
═══════════════════════════════════════════════════════
   MessageV3: 0x72E052Fa7f0788e668965d37B6c38C88703B7859
   Remote Chains: [369, 8453, 42161, 10, 56, 137]
   Confirmations: 15
   Using Nonce: 53
   TX: 0x77798137c1e2a2569ee49831c4f6fec933bded5bb24efa3084dac53c345a54fa
^C
Ganadhishs-MacBook-Air:multi-chain-with-via ganadhish$ 
Ganadhishs-MacBook-Air:multi-chain-with-via ganadhish$ npx hardhat run scripts/pre-audit-scripts/configure-all-routes.js --network avalanche

🌐 CONFIGURE ALL ROUTES (Pre-Audit Contracts)
═══════════════════════════════════════════════════════
📍 Network: avalanche (Chain ID: 43114)
👤 Signer: 0x05F8cC8753D90d67DBB8c02118440b8283F941c9
🎯 Token: INC

📍 Current Contract: 0x3E8cEA4287b7D1d707FE3FD526a19C3fE2221798
   Type: synthetic
   MessageV3: 0x72E052Fa7f0788e668965d37B6c38C88703B7859
   Wrapped Gas Token: 0xB31f66AA3C1e785363F0875A1B74E27b85FD66c7

🌐 Remote Chains to Configure (6 total):
   - Chain 369 (PulseChain): 0x25f9387AA86a6853C74AD1A14D531d03F8F1619a [collateral]
   - Chain 8453 (Base): 0x02B7f5Fe7459B6482545f0b1979c61BA22F4CCA5 [synthetic]
   - Chain 42161 (Arbitrum): 0x808945fc3ab570f67011e2008E56949ee6899267 [synthetic]
   - Chain 10 (Optimism): 0x1D135C2711f89e6eb70665BF55942E498835b336 [synthetic]
   - Chain 56 (BNB Chain): 0x6B7c81207240a38e03E5e9B138C53c4762515cCD [synthetic]
   - Chain 137 (Polygon): 0x7307FEE834DdC88A716904830C0cb356A4878be1 [synthetic]

[STEP 1/2] Configuring MessageClient...
═══════════════════════════════════════════════════════
   MessageV3: 0x72E052Fa7f0788e668965d37B6c38C88703B7859
   Remote Chains: [369, 8453, 42161, 10, 56, 137]
   Confirmations: 15
   Using Nonce: 54
   TX: 0x22fe7016bc8cf6ac837d65a86a848e2f63304e4d5b4e24ee1a3dc3a550f12303
   ✅ MessageClient configured!

[STEP 2/2] Configuring Remote Chains...
═══════════════════════════════════════════════════════

   🌐 Chain 369 (PulseChain):
      Remote Contract: 0x25f9387AA86a6853C74AD1A14D531d03F8F1619a
      Wrapped Gas Token: 0xB31f66AA3C1e785363F0875A1B74E27b85FD66c7
      Protocol Fee: 0.12 USDC
      VIA Source Fee: 0.25 USDC
      VIA Dest Gas: 15000000000000000 wei
      Authorize Minter: true
      Using Nonce: 55
      TX: 0x34bffcf70eb673a550042e6cba86029f35634b27459127ecc58ca746f34d9a0f
      ✅ Configured!

   🌐 Chain 8453 (Base):
      Remote Contract: 0x02B7f5Fe7459B6482545f0b1979c61BA22F4CCA5
      Wrapped Gas Token: 0xB31f66AA3C1e785363F0875A1B74E27b85FD66c7
      Protocol Fee: 0.12 USDC
      VIA Source Fee: 0.25 USDC
      VIA Dest Gas: 15000000000000000 wei
      Authorize Minter: true
      Using Nonce: 56
      TX: 0x13c5f76b187cd8cac9832a3591852dcdb7b397c37a186833eaadc70e5d8b0e82
      ✅ Configured!

   🌐 Chain 42161 (Arbitrum):
      Remote Contract: 0x808945fc3ab570f67011e2008E56949ee6899267
      Wrapped Gas Token: 0xB31f66AA3C1e785363F0875A1B74E27b85FD66c7
      Protocol Fee: 0.12 USDC
      VIA Source Fee: 0.25 USDC
      VIA Dest Gas: 15000000000000000 wei
      Authorize Minter: true
      Using Nonce: 57
      TX: 0x1823dae74778adb60a9ec499c46691651cf9663d946e998b851e3473b99111e3
      ✅ Configured!

   🌐 Chain 10 (Optimism):
      Remote Contract: 0x1D135C2711f89e6eb70665BF55942E498835b336
      Wrapped Gas Token: 0xB31f66AA3C1e785363F0875A1B74E27b85FD66c7
      Protocol Fee: 0.12 USDC
      VIA Source Fee: 0.25 USDC
      VIA Dest Gas: 15000000000000000 wei
      Authorize Minter: true
      Using Nonce: 58
      TX: 0x03da7642b90e2242a739bd4972f2a3ac4e314b5ff332101cfa9ae5ead3b55cdd
      ✅ Configured!

   🌐 Chain 56 (BNB Chain):
      Remote Contract: 0x6B7c81207240a38e03E5e9B138C53c4762515cCD
      Wrapped Gas Token: 0xB31f66AA3C1e785363F0875A1B74E27b85FD66c7
      Protocol Fee: 0.12 USDC
      VIA Source Fee: 0.25 USDC
      VIA Dest Gas: 15000000000000000 wei
      Authorize Minter: true
      Using Nonce: 59
      TX: 0xaf853fe2663ce86548d4691bffbb51b4dfad115a2ff6e7b518fb0ce940b02187
      ✅ Configured!

   🌐 Chain 137 (Polygon):
      Remote Contract: 0x7307FEE834DdC88A716904830C0cb356A4878be1
      Wrapped Gas Token: 0xB31f66AA3C1e785363F0875A1B74E27b85FD66c7
      Protocol Fee: 0.12 USDC
      VIA Source Fee: 0.25 USDC
      VIA Dest Gas: 15000000000000000 wei
      Authorize Minter: true
      Using Nonce: 60
      TX: 0x63f3e1ab6e2ee2306dc270187c2515dccabc5388c8dadfac562ba6313dbc4583
      ✅ Configured!

[VERIFICATION] Checking Configuration...
═══════════════════════════════════════════════════════
   Chain 369: Configured ✅ | Minter ✅
   Chain 8453: Configured ✅ | Minter ✅
   Chain 42161: Configured ✅ | Minter ✅
   Chain 10: Configured ✅ | Minter ✅
   Chain 56: Configured ✅ | Minter ✅
   Chain 137: Configured ✅ | Minter ✅

✅ ALL ROUTES CONFIGURED FOR INC ON AVALANCHE!
═══════════════════════════════════════════════════════
   📋 Configured 6 remote chains.

   📋 Next Steps:
   Run this script on ALL other chains with INC deployments:
      npx hardhat run scripts/pre-audit-scripts/configure-all-routes.js --network pulsechain INC
      npx hardhat run scripts/pre-audit-scripts/configure-all-routes.js --network base INC
      npx hardhat run scripts/pre-audit-scripts/configure-all-routes.js --network arbitrum INC
      npx hardhat run scripts/pre-audit-scripts/configure-all-routes.js --network optimism INC
      npx hardhat run scripts/pre-audit-scripts/configure-all-routes.js --network bnb INC
      npx hardhat run scripts/pre-audit-scripts/configure-all-routes.js --network polygon INC

________________________________________________________________________________________________

___________________________________________

___________________________________________
ALL SYNTHETIC CHAINS CONFIG FOR WPLS TOKEN: 
-------------------------------------------

npx hardhat run scripts/pre-audit-scripts/configure-all-routes.js --network pulsechain

🌐 CONFIGURE ALL ROUTES (Pre-Audit Contracts)
═══════════════════════════════════════════════════════
📍 Network: pulsechain (Chain ID: 369)
👤 Signer: 0x05F8cC8753D90d67DBB8c02118440b8283F941c9
🎯 Token: WPLS

📍 Current Contract: 0xEecBf7a332e16572AB367623E9A05d4d26d2c8C4
   Type: collateral
   MessageV3: 0xba01F2bA548e69bA26Fd06a3bdf1A7857eeAC435
   Wrapped Gas Token: 0xA1077a294dDE1B09bB078844df40758a5D0f9a27

🌐 Remote Chains to Configure (6 total):
   - Chain 8453 (Base): 0x78208aeC3e336c6636AB5E0bA16aB9FEA1710ca5 [synthetic]
   - Chain 42161 (Arbitrum): 0xA11F758A972e843Fde082BE31Ff1a7cd6e47ac1C [synthetic]
   - Chain 10 (Optimism): 0x4Ce7a88A512FB0BfbB1F6Fe9cE70F2A98D413BeC [synthetic]
   - Chain 56 (BNB Chain): 0x84B0b1EE6eef971105442Eb9Ab420F3DbB774b46 [synthetic]
   - Chain 137 (Polygon): 0x1f5C42FCd0940692d4be52d17CD6bbFDFac9b0ac [synthetic]
   - Chain 43114 (Avalanche): 0x2271f95dda2b85BefadDe6BdC689C84c63150e04 [synthetic]

[STEP 1/2] Configuring MessageClient...
═══════════════════════════════════════════════════════
   MessageV3: 0xba01F2bA548e69bA26Fd06a3bdf1A7857eeAC435
   Remote Chains: [8453, 42161, 10, 56, 137, 43114]
   Confirmations: 15
   Using Nonce: 738
   TX: 0xd4ead50bffbbb31c3ecc5ce508cff78edbfb3e83a324ccc2916191e5425f4538
   ✅ MessageClient configured!

[STEP 2/2] Configuring Remote Chains...
═══════════════════════════════════════════════════════

   🌐 Chain 8453 (Base):
      Remote Contract: 0x78208aeC3e336c6636AB5E0bA16aB9FEA1710ca5
      Wrapped Gas Token: 0xA1077a294dDE1B09bB078844df40758a5D0f9a27
      Protocol Fee: 0.12 USDC
      VIA Source Fee: 0.25 USDC
      VIA Dest Gas: 80000000000000000000 wei
      Using Nonce: 739
      TX: 0x0c6f1a641a22fe8c794fdbd3475035a2be391b26ab6d2ff9b7d496257ba4e24a
      ✅ Configured!

   🌐 Chain 42161 (Arbitrum):
      Remote Contract: 0xA11F758A972e843Fde082BE31Ff1a7cd6e47ac1C
      Wrapped Gas Token: 0xA1077a294dDE1B09bB078844df40758a5D0f9a27
      Protocol Fee: 0.12 USDC
      VIA Source Fee: 0.25 USDC
      VIA Dest Gas: 80000000000000000000 wei
      Using Nonce: 740
      TX: 0x155595ad0887a03f823946ffb536876f4e21248a757256bad65bf826eef47d84
      ✅ Configured!

   🌐 Chain 10 (Optimism):
      Remote Contract: 0x4Ce7a88A512FB0BfbB1F6Fe9cE70F2A98D413BeC
      Wrapped Gas Token: 0xA1077a294dDE1B09bB078844df40758a5D0f9a27
      Protocol Fee: 0.12 USDC
      VIA Source Fee: 0.25 USDC
      VIA Dest Gas: 80000000000000000000 wei
      Using Nonce: 741
      TX: 0xfc3f2bb163d88ed7aa646f564b9579e266f30a1ec17b7e3da930d81a084b86ba
      ✅ Configured!

   🌐 Chain 56 (BNB Chain):
      Remote Contract: 0x84B0b1EE6eef971105442Eb9Ab420F3DbB774b46
      Wrapped Gas Token: 0xA1077a294dDE1B09bB078844df40758a5D0f9a27
      Protocol Fee: 0.12 USDC
      VIA Source Fee: 0.25 USDC
      VIA Dest Gas: 80000000000000000000 wei
      Using Nonce: 742
      TX: 0x18e72fa22b354d0e77a55e473d49bc8430ba516e7809500d1ce630c798e6c396
      ✅ Configured!

   🌐 Chain 137 (Polygon):
      Remote Contract: 0x1f5C42FCd0940692d4be52d17CD6bbFDFac9b0ac
      Wrapped Gas Token: 0xA1077a294dDE1B09bB078844df40758a5D0f9a27
      Protocol Fee: 0.12 USDC
      VIA Source Fee: 0.25 USDC
      VIA Dest Gas: 80000000000000000000 wei
      Using Nonce: 743
      TX: 0x67a3cc842d628c8802cbb4e50e8c9786347bd9602df667d130fd6add3cb4234a
      ✅ Configured!

   🌐 Chain 43114 (Avalanche):
      Remote Contract: 0x2271f95dda2b85BefadDe6BdC689C84c63150e04
      Wrapped Gas Token: 0xA1077a294dDE1B09bB078844df40758a5D0f9a27
      Protocol Fee: 0.12 USDC
      VIA Source Fee: 0.25 USDC
      VIA Dest Gas: 80000000000000000000 wei
      Using Nonce: 744
      TX: 0x85cc38959472c798480b4c929f5f4769aa3161003ca1ededaa949143d441d587
      ✅ Configured!

[VERIFICATION] Checking Configuration...
═══════════════════════════════════════════════════════
   Chain 8453: Configured ✅
   Chain 42161: Configured ✅
   Chain 10: Configured ✅
   Chain 56: Configured ✅
   Chain 137: Configured ✅
   Chain 43114: Configured ✅

✅ ALL ROUTES CONFIGURED FOR WPLS ON PULSECHAIN!
═══════════════════════════════════════════════════════
   📋 Configured 6 remote chains.

   📋 Next Steps:
   Run this script on ALL other chains with WPLS deployments:
      npx hardhat run scripts/pre-audit-scripts/configure-all-routes.js --network base WPLS
      npx hardhat run scripts/pre-audit-scripts/configure-all-routes.js --network arbitrum WPLS
      npx hardhat run scripts/pre-audit-scripts/configure-all-routes.js --network optimism WPLS
      npx hardhat run scripts/pre-audit-scripts/configure-all-routes.js --network bnb WPLS
      npx hardhat run scripts/pre-audit-scripts/configure-all-routes.js --network polygon WPLS
      npx hardhat run scripts/pre-audit-scripts/configure-all-routes.js --network avalanche WPLS
Ganadhishs-MacBook-Air:multi-chain-with-via ganadhish$ npx hardhat run scripts/pre-audit-scripts/configure-all-routes.js --network base

🌐 CONFIGURE ALL ROUTES (Pre-Audit Contracts)
═══════════════════════════════════════════════════════
📍 Network: base (Chain ID: 8453)
👤 Signer: 0x05F8cC8753D90d67DBB8c02118440b8283F941c9
🎯 Token: WPLS

📍 Current Contract: 0x78208aeC3e336c6636AB5E0bA16aB9FEA1710ca5
   Type: synthetic
   MessageV3: 0xe3b3274bb685F37C7f17a604039c77a6A16Cfc2a
   Wrapped Gas Token: 0x4200000000000000000000000000000000000006

🌐 Remote Chains to Configure (6 total):
   - Chain 369 (PulseChain): 0xEecBf7a332e16572AB367623E9A05d4d26d2c8C4 [collateral]
   - Chain 42161 (Arbitrum): 0xA11F758A972e843Fde082BE31Ff1a7cd6e47ac1C [synthetic]
   - Chain 10 (Optimism): 0x4Ce7a88A512FB0BfbB1F6Fe9cE70F2A98D413BeC [synthetic]
   - Chain 56 (BNB Chain): 0x84B0b1EE6eef971105442Eb9Ab420F3DbB774b46 [synthetic]
   - Chain 137 (Polygon): 0x1f5C42FCd0940692d4be52d17CD6bbFDFac9b0ac [synthetic]
   - Chain 43114 (Avalanche): 0x2271f95dda2b85BefadDe6BdC689C84c63150e04 [synthetic]

[STEP 1/2] Configuring MessageClient...
═══════════════════════════════════════════════════════
   MessageV3: 0xe3b3274bb685F37C7f17a604039c77a6A16Cfc2a
   Remote Chains: [369, 42161, 10, 56, 137, 43114]
   Confirmations: 15
   Using Nonce: 508
   TX: 0xb46f56999b8a3c62cba00a63237e33d429eddec18cb16303d1bdfcd5007ca31f
   ✅ MessageClient configured!

[STEP 2/2] Configuring Remote Chains...
═══════════════════════════════════════════════════════

   🌐 Chain 369 (PulseChain):
      Remote Contract: 0xEecBf7a332e16572AB367623E9A05d4d26d2c8C4
      Wrapped Gas Token: 0x4200000000000000000000000000000000000006
      Protocol Fee: 0.12 USDC
      VIA Source Fee: 0.25 USDC
      VIA Dest Gas: 30000000000000 wei
      Authorize Minter: true
      Using Nonce: 509
      TX: 0x91b6f7b448bf58dbe55a3b06bcaf003e26dbf31684a5c5c583ba0960d83a83be
      ✅ Configured!

   🌐 Chain 42161 (Arbitrum):
      Remote Contract: 0xA11F758A972e843Fde082BE31Ff1a7cd6e47ac1C
      Wrapped Gas Token: 0x4200000000000000000000000000000000000006
      Protocol Fee: 0.12 USDC
      VIA Source Fee: 0.25 USDC
      VIA Dest Gas: 30000000000000 wei
      Authorize Minter: true
      Using Nonce: 510
      TX: 0x33bc9dff68b8fc47743f5aa3449212e63d460885355b14f12359ebd9a43adc51
      ✅ Configured!

   🌐 Chain 10 (Optimism):
      Remote Contract: 0x4Ce7a88A512FB0BfbB1F6Fe9cE70F2A98D413BeC
      Wrapped Gas Token: 0x4200000000000000000000000000000000000006
      Protocol Fee: 0.12 USDC
      VIA Source Fee: 0.25 USDC
      VIA Dest Gas: 30000000000000 wei
      Authorize Minter: true
      Using Nonce: 511
      TX: 0x7ec72ec46753dd79dff4da8179ea620c3cb23929e1e8099bdd4f842354a241c5
      ✅ Configured!

   🌐 Chain 56 (BNB Chain):
      Remote Contract: 0x84B0b1EE6eef971105442Eb9Ab420F3DbB774b46
      Wrapped Gas Token: 0x4200000000000000000000000000000000000006
      Protocol Fee: 0.12 USDC
      VIA Source Fee: 0.25 USDC
      VIA Dest Gas: 30000000000000 wei
      Authorize Minter: true
      Using Nonce: 512
      TX: 0xe4de4f1b41177d2d9db0ab3ea6bafc28fe971f068adb62df5ce83edfc05b62a8
      ✅ Configured!

   🌐 Chain 137 (Polygon):
      Remote Contract: 0x1f5C42FCd0940692d4be52d17CD6bbFDFac9b0ac
      Wrapped Gas Token: 0x4200000000000000000000000000000000000006
      Protocol Fee: 0.12 USDC
      VIA Source Fee: 0.25 USDC
      VIA Dest Gas: 30000000000000 wei
      Authorize Minter: true
      Using Nonce: 513
      TX: 0x7c7ec485035f5b57ff8b5ab2afcd4d6754a1b4a57afa141762cbe087dd7cdf21
      ✅ Configured!

   🌐 Chain 43114 (Avalanche):
      Remote Contract: 0x2271f95dda2b85BefadDe6BdC689C84c63150e04
      Wrapped Gas Token: 0x4200000000000000000000000000000000000006
      Protocol Fee: 0.12 USDC
      VIA Source Fee: 0.25 USDC
      VIA Dest Gas: 30000000000000 wei
      Authorize Minter: true
      Using Nonce: 514
      TX: 0x3293bac2d21ae4ce538a85e1613b59eecb9c95541c11a8226ebf37367f903209
      ✅ Configured!

[VERIFICATION] Checking Configuration...
═══════════════════════════════════════════════════════
   Chain 369: Configured ✅ | Minter ✅
   Chain 42161: Configured ✅ | Minter ✅
   Chain 10: Configured ✅ | Minter ✅
   Chain 56: Configured ✅ | Minter ✅
   Chain 137: Configured ✅ | Minter ✅
   Chain 43114: Configured ✅ | Minter ✅

✅ ALL ROUTES CONFIGURED FOR WPLS ON BASE!
═══════════════════════════════════════════════════════
   📋 Configured 6 remote chains.

   📋 Next Steps:
   Run this script on ALL other chains with WPLS deployments:
      npx hardhat run scripts/pre-audit-scripts/configure-all-routes.js --network pulsechain WPLS
      npx hardhat run scripts/pre-audit-scripts/configure-all-routes.js --network arbitrum WPLS
      npx hardhat run scripts/pre-audit-scripts/configure-all-routes.js --network optimism WPLS
      npx hardhat run scripts/pre-audit-scripts/configure-all-routes.js --network bnb WPLS
      npx hardhat run scripts/pre-audit-scripts/configure-all-routes.js --network polygon WPLS
      npx hardhat run scripts/pre-audit-scripts/configure-all-routes.js --network avalanche WPLS
Ganadhishs-MacBook-Air:multi-chain-with-via ganadhish$ npx hardhat run scripts/pre-audit-scripts/configure-all-routes.js --network arbitrum

🌐 CONFIGURE ALL ROUTES (Pre-Audit Contracts)
═══════════════════════════════════════════════════════
📍 Network: arbitrum (Chain ID: 42161)
👤 Signer: 0x05F8cC8753D90d67DBB8c02118440b8283F941c9
🎯 Token: WPLS

📍 Current Contract: 0xA11F758A972e843Fde082BE31Ff1a7cd6e47ac1C
   Type: synthetic
   MessageV3: 0x65EEc58ef38882422E887B82f7085e9a9C35dCA1
   Wrapped Gas Token: 0x82aF49447D8a07e3bd95BD0d56f35241523fBab1

🌐 Remote Chains to Configure (6 total):
   - Chain 369 (PulseChain): 0xEecBf7a332e16572AB367623E9A05d4d26d2c8C4 [collateral]
   - Chain 8453 (Base): 0x78208aeC3e336c6636AB5E0bA16aB9FEA1710ca5 [synthetic]
   - Chain 10 (Optimism): 0x4Ce7a88A512FB0BfbB1F6Fe9cE70F2A98D413BeC [synthetic]
   - Chain 56 (BNB Chain): 0x84B0b1EE6eef971105442Eb9Ab420F3DbB774b46 [synthetic]
   - Chain 137 (Polygon): 0x1f5C42FCd0940692d4be52d17CD6bbFDFac9b0ac [synthetic]
   - Chain 43114 (Avalanche): 0x2271f95dda2b85BefadDe6BdC689C84c63150e04 [synthetic]

[STEP 1/2] Configuring MessageClient...
═══════════════════════════════════════════════════════
   MessageV3: 0x65EEc58ef38882422E887B82f7085e9a9C35dCA1
   Remote Chains: [369, 8453, 10, 56, 137, 43114]
   Confirmations: 15
   Using Nonce: 161
   TX: 0x439c46460c404da2ff6fa1e63b7ad0492634f6785638503cecf3490469e4499d
   ✅ MessageClient configured!

[STEP 2/2] Configuring Remote Chains...
═══════════════════════════════════════════════════════

   🌐 Chain 369 (PulseChain):
      Remote Contract: 0xEecBf7a332e16572AB367623E9A05d4d26d2c8C4
      Wrapped Gas Token: 0x82aF49447D8a07e3bd95BD0d56f35241523fBab1
      Protocol Fee: 0.12 USDC
      VIA Source Fee: 0.25 USDC
      VIA Dest Gas: 30000000000000 wei
      Authorize Minter: true
      Using Nonce: 162
      TX: 0x4bedbde5b975070087ddf7187fb241219394fa4cb38d9d16ae92e38be3054823
      ✅ Configured!

   🌐 Chain 8453 (Base):
      Remote Contract: 0x78208aeC3e336c6636AB5E0bA16aB9FEA1710ca5
      Wrapped Gas Token: 0x82aF49447D8a07e3bd95BD0d56f35241523fBab1
      Protocol Fee: 0.12 USDC
      VIA Source Fee: 0.25 USDC
      VIA Dest Gas: 30000000000000 wei
      Authorize Minter: true
      Using Nonce: 163
      TX: 0x7a33b57f9c5a11642fef21ccd8f315852845e67f3bbffc9d0bf5f6222b2398c0
      ✅ Configured!

   🌐 Chain 10 (Optimism):
      Remote Contract: 0x4Ce7a88A512FB0BfbB1F6Fe9cE70F2A98D413BeC
      Wrapped Gas Token: 0x82aF49447D8a07e3bd95BD0d56f35241523fBab1
      Protocol Fee: 0.12 USDC
      VIA Source Fee: 0.25 USDC
      VIA Dest Gas: 30000000000000 wei
      Authorize Minter: true
      Using Nonce: 164
      TX: 0xe5a598616f818149f802574c5eca4bcf4c593ea4b417b1b8d6b5a97ef81623ea
      ✅ Configured!

   🌐 Chain 56 (BNB Chain):
      Remote Contract: 0x84B0b1EE6eef971105442Eb9Ab420F3DbB774b46
      Wrapped Gas Token: 0x82aF49447D8a07e3bd95BD0d56f35241523fBab1
      Protocol Fee: 0.12 USDC
      VIA Source Fee: 0.25 USDC
      VIA Dest Gas: 30000000000000 wei
      Authorize Minter: true
      Using Nonce: 165
      TX: 0xd0a8ace015bb27ff85bb94d79613b4b1f24cd1a12470f7051f175961a49a8f1c
      ✅ Configured!

   🌐 Chain 137 (Polygon):
      Remote Contract: 0x1f5C42FCd0940692d4be52d17CD6bbFDFac9b0ac
      Wrapped Gas Token: 0x82aF49447D8a07e3bd95BD0d56f35241523fBab1
      Protocol Fee: 0.12 USDC
      VIA Source Fee: 0.25 USDC
      VIA Dest Gas: 30000000000000 wei
      Authorize Minter: true
      Using Nonce: 166
      TX: 0x9d972370add5631a0e9d92cae3a1c438aec7834ccce3b64c03314ee3c4cf7553
      ✅ Configured!

   🌐 Chain 43114 (Avalanche):
      Remote Contract: 0x2271f95dda2b85BefadDe6BdC689C84c63150e04
      Wrapped Gas Token: 0x82aF49447D8a07e3bd95BD0d56f35241523fBab1
      Protocol Fee: 0.12 USDC
      VIA Source Fee: 0.25 USDC
      VIA Dest Gas: 30000000000000 wei
      Authorize Minter: true
      Using Nonce: 167
      TX: 0x161ad01a3a5bb66cb20e5858d2c7cac8637984c2319a95edd935c157583e558d
      ✅ Configured!

[VERIFICATION] Checking Configuration...
═══════════════════════════════════════════════════════
   Chain 369: Configured ✅ | Minter ✅
   Chain 8453: Configured ✅ | Minter ✅
   Chain 10: Configured ✅ | Minter ✅
   Chain 56: Configured ✅ | Minter ✅
   Chain 137: Configured ✅ | Minter ✅
   Chain 43114: Configured ✅ | Minter ✅

✅ ALL ROUTES CONFIGURED FOR WPLS ON ARBITRUM!
═══════════════════════════════════════════════════════
   📋 Configured 6 remote chains.

   📋 Next Steps:
   Run this script on ALL other chains with WPLS deployments:
      npx hardhat run scripts/pre-audit-scripts/configure-all-routes.js --network pulsechain WPLS
      npx hardhat run scripts/pre-audit-scripts/configure-all-routes.js --network base WPLS
      npx hardhat run scripts/pre-audit-scripts/configure-all-routes.js --network optimism WPLS
      npx hardhat run scripts/pre-audit-scripts/configure-all-routes.js --network bnb WPLS
      npx hardhat run scripts/pre-audit-scripts/configure-all-routes.js --network polygon WPLS
      npx hardhat run scripts/pre-audit-scripts/configure-all-routes.js --network avalanche WPLS
Ganadhishs-MacBook-Air:multi-chain-with-via ganadhish$ npx hardhat run scripts/pre-audit-scripts/configure-all-routes.js --network optimism

🌐 CONFIGURE ALL ROUTES (Pre-Audit Contracts)
═══════════════════════════════════════════════════════
📍 Network: optimism (Chain ID: 10)
👤 Signer: 0x05F8cC8753D90d67DBB8c02118440b8283F941c9
🎯 Token: WPLS

📍 Current Contract: 0x4Ce7a88A512FB0BfbB1F6Fe9cE70F2A98D413BeC
   Type: synthetic
   MessageV3: 0x15AC559DA4951c796DB6620fAb286B96840D039A
   Wrapped Gas Token: 0x4200000000000000000000000000000000000006

🌐 Remote Chains to Configure (6 total):
   - Chain 369 (PulseChain): 0xEecBf7a332e16572AB367623E9A05d4d26d2c8C4 [collateral]
   - Chain 8453 (Base): 0x78208aeC3e336c6636AB5E0bA16aB9FEA1710ca5 [synthetic]
   - Chain 42161 (Arbitrum): 0xA11F758A972e843Fde082BE31Ff1a7cd6e47ac1C [synthetic]
   - Chain 56 (BNB Chain): 0x84B0b1EE6eef971105442Eb9Ab420F3DbB774b46 [synthetic]
   - Chain 137 (Polygon): 0x1f5C42FCd0940692d4be52d17CD6bbFDFac9b0ac [synthetic]
   - Chain 43114 (Avalanche): 0x2271f95dda2b85BefadDe6BdC689C84c63150e04 [synthetic]

[STEP 1/2] Configuring MessageClient...
═══════════════════════════════════════════════════════
   MessageV3: 0x15AC559DA4951c796DB6620fAb286B96840D039A
   Remote Chains: [369, 8453, 42161, 56, 137, 43114]
   Confirmations: 15
   Using Nonce: 118
   TX: 0x499ad6ede725020e4c8d5a1f4e3e0560e067d2908e6d43ccf5cb3c430aca85a0
   ✅ MessageClient configured!

[STEP 2/2] Configuring Remote Chains...
═══════════════════════════════════════════════════════

   🌐 Chain 369 (PulseChain):
      Remote Contract: 0xEecBf7a332e16572AB367623E9A05d4d26d2c8C4
      Wrapped Gas Token: 0x4200000000000000000000000000000000000006
      Protocol Fee: 0.12 USDC
      VIA Source Fee: 0.25 USDC
      VIA Dest Gas: 30000000000000 wei
      Authorize Minter: true
      Using Nonce: 119
      TX: 0x4428bbfc3ef174a33e111d7f82e07a60b83645759729aaedefab4b1dc7be379b
      ✅ Configured!

   🌐 Chain 8453 (Base):
      Remote Contract: 0x78208aeC3e336c6636AB5E0bA16aB9FEA1710ca5
      Wrapped Gas Token: 0x4200000000000000000000000000000000000006
      Protocol Fee: 0.12 USDC
      VIA Source Fee: 0.25 USDC
      VIA Dest Gas: 30000000000000 wei
      Authorize Minter: true
      Using Nonce: 120
      TX: 0xcaf0e2eff65f594b7c526b27653c22b64a7beae1c5dda16669e9c9151aad7933
      ✅ Configured!

   🌐 Chain 42161 (Arbitrum):
      Remote Contract: 0xA11F758A972e843Fde082BE31Ff1a7cd6e47ac1C
      Wrapped Gas Token: 0x4200000000000000000000000000000000000006
      Protocol Fee: 0.12 USDC
      VIA Source Fee: 0.25 USDC
      VIA Dest Gas: 30000000000000 wei
      Authorize Minter: true
      Using Nonce: 121
      TX: 0x76135c37ca98d2fa37d5f7c9d9ff3264764eef24a2bdc2577d8cdaff87ed8e11
      ✅ Configured!

   🌐 Chain 56 (BNB Chain):
      Remote Contract: 0x84B0b1EE6eef971105442Eb9Ab420F3DbB774b46
      Wrapped Gas Token: 0x4200000000000000000000000000000000000006
      Protocol Fee: 0.12 USDC
      VIA Source Fee: 0.25 USDC
      VIA Dest Gas: 30000000000000 wei
      Authorize Minter: true
      Using Nonce: 122
      TX: 0xabdc3bbde5b891d3fe3d8b96d398a9608751fcba54577e19c36f909ce0b5717d
      ✅ Configured!

   🌐 Chain 137 (Polygon):
      Remote Contract: 0x1f5C42FCd0940692d4be52d17CD6bbFDFac9b0ac
      Wrapped Gas Token: 0x4200000000000000000000000000000000000006
      Protocol Fee: 0.12 USDC
      VIA Source Fee: 0.25 USDC
      VIA Dest Gas: 30000000000000 wei
      Authorize Minter: true
      Using Nonce: 123
      TX: 0x699d501a4d96a763e43a1788bacaa0e13d6cc6ed69a484f6bf718fcdb589f486
      ✅ Configured!

   🌐 Chain 43114 (Avalanche):
      Remote Contract: 0x2271f95dda2b85BefadDe6BdC689C84c63150e04
      Wrapped Gas Token: 0x4200000000000000000000000000000000000006
      Protocol Fee: 0.12 USDC
      VIA Source Fee: 0.25 USDC
      VIA Dest Gas: 30000000000000 wei
      Authorize Minter: true
      Using Nonce: 124
      TX: 0x07a43ba65892d733ab256f60594fad023d66c3901bebcd132e4c67bea12e770e
      ✅ Configured!

[VERIFICATION] Checking Configuration...
═══════════════════════════════════════════════════════
   Chain 369: Configured ✅ | Minter ✅
   Chain 8453: Configured ✅ | Minter ✅
   Chain 42161: Configured ✅ | Minter ✅
   Chain 56: Configured ✅ | Minter ✅
   Chain 137: Configured ✅ | Minter ✅
   Chain 43114: Configured ✅ | Minter ✅

✅ ALL ROUTES CONFIGURED FOR WPLS ON OPTIMISM!
═══════════════════════════════════════════════════════
   📋 Configured 6 remote chains.

   📋 Next Steps:
   Run this script on ALL other chains with WPLS deployments:
      npx hardhat run scripts/pre-audit-scripts/configure-all-routes.js --network pulsechain WPLS
      npx hardhat run scripts/pre-audit-scripts/configure-all-routes.js --network base WPLS
      npx hardhat run scripts/pre-audit-scripts/configure-all-routes.js --network arbitrum WPLS
      npx hardhat run scripts/pre-audit-scripts/configure-all-routes.js --network bnb WPLS
      npx hardhat run scripts/pre-audit-scripts/configure-all-routes.js --network polygon WPLS
      npx hardhat run scripts/pre-audit-scripts/configure-all-routes.js --network avalanche WPLS
Ganadhishs-MacBook-Air:multi-chain-with-via ganadhish$ npx hardhat run scripts/pre-audit-scripts/configure-all-routes.js --network bnb

🌐 CONFIGURE ALL ROUTES (Pre-Audit Contracts)
═══════════════════════════════════════════════════════
📍 Network: bnb (Chain ID: 56)
👤 Signer: 0x05F8cC8753D90d67DBB8c02118440b8283F941c9
🎯 Token: WPLS

📍 Current Contract: 0x84B0b1EE6eef971105442Eb9Ab420F3DbB774b46
   Type: synthetic
   MessageV3: 0x7b67dF6728E294db2eb173ac7c738a4627Ae5e11
   Wrapped Gas Token: 0xbb4CdB9CBd36B01bD1cBaEBF2De08d9173bc095c

🌐 Remote Chains to Configure (6 total):
   - Chain 369 (PulseChain): 0xEecBf7a332e16572AB367623E9A05d4d26d2c8C4 [collateral]
   - Chain 8453 (Base): 0x78208aeC3e336c6636AB5E0bA16aB9FEA1710ca5 [synthetic]
   - Chain 42161 (Arbitrum): 0xA11F758A972e843Fde082BE31Ff1a7cd6e47ac1C [synthetic]
   - Chain 10 (Optimism): 0x4Ce7a88A512FB0BfbB1F6Fe9cE70F2A98D413BeC [synthetic]
   - Chain 137 (Polygon): 0x1f5C42FCd0940692d4be52d17CD6bbFDFac9b0ac [synthetic]
   - Chain 43114 (Avalanche): 0x2271f95dda2b85BefadDe6BdC689C84c63150e04 [synthetic]

[STEP 1/2] Configuring MessageClient...
═══════════════════════════════════════════════════════
   MessageV3: 0x7b67dF6728E294db2eb173ac7c738a4627Ae5e11
   Remote Chains: [369, 8453, 42161, 10, 137, 43114]
   Confirmations: 15
   Using Nonce: 64
   TX: 0x4f41130b7660d17b6091aad154881e2d98dae6b28736db3efae51cd9b390dabd
   ✅ MessageClient configured!

[STEP 2/2] Configuring Remote Chains...
═══════════════════════════════════════════════════════

   🌐 Chain 369 (PulseChain):
      Remote Contract: 0xEecBf7a332e16572AB367623E9A05d4d26d2c8C4
      Wrapped Gas Token: 0xbb4CdB9CBd36B01bD1cBaEBF2De08d9173bc095c
      Protocol Fee: 0.12 USDC
      VIA Source Fee: 0.25 USDC
      VIA Dest Gas: 1500000000000000 wei
      Authorize Minter: true
      Using Nonce: 65
      TX: 0x0b832aa35718c05e00a4885833ac749fa22806a563544aeba710f2123ed64217
      ✅ Configured!

   🌐 Chain 8453 (Base):
      Remote Contract: 0x78208aeC3e336c6636AB5E0bA16aB9FEA1710ca5
      Wrapped Gas Token: 0xbb4CdB9CBd36B01bD1cBaEBF2De08d9173bc095c
      Protocol Fee: 0.12 USDC
      VIA Source Fee: 0.25 USDC
      VIA Dest Gas: 1500000000000000 wei
      Authorize Minter: true
      Using Nonce: 66
      TX: 0x0ae0a72ccd3b902a2721841e557c66a02c0761b9b1147b3adba0edb0c724dcba
      ✅ Configured!

   🌐 Chain 42161 (Arbitrum):
      Remote Contract: 0xA11F758A972e843Fde082BE31Ff1a7cd6e47ac1C
      Wrapped Gas Token: 0xbb4CdB9CBd36B01bD1cBaEBF2De08d9173bc095c
      Protocol Fee: 0.12 USDC
      VIA Source Fee: 0.25 USDC
      VIA Dest Gas: 1500000000000000 wei
      Authorize Minter: true
      Using Nonce: 67
      TX: 0xfa7dded7d3148f54ffc3fb2117de2d4dd024c276df4e812fb5b02b8862a58f26
      ✅ Configured!

   🌐 Chain 10 (Optimism):
      Remote Contract: 0x4Ce7a88A512FB0BfbB1F6Fe9cE70F2A98D413BeC
      Wrapped Gas Token: 0xbb4CdB9CBd36B01bD1cBaEBF2De08d9173bc095c
      Protocol Fee: 0.12 USDC
      VIA Source Fee: 0.25 USDC
      VIA Dest Gas: 1500000000000000 wei
      Authorize Minter: true
      Using Nonce: 68
      TX: 0x95c4140fae0b04e5a3d35aff69bf206116dca76a84be258de506ae1abb28f2f2
      ✅ Configured!

   🌐 Chain 137 (Polygon):
      Remote Contract: 0x1f5C42FCd0940692d4be52d17CD6bbFDFac9b0ac
      Wrapped Gas Token: 0xbb4CdB9CBd36B01bD1cBaEBF2De08d9173bc095c
      Protocol Fee: 0.12 USDC
      VIA Source Fee: 0.25 USDC
      VIA Dest Gas: 1500000000000000 wei
      Authorize Minter: true
      Using Nonce: 69
      TX: 0xcbe1bf9bfa650fba9b269c3bc9af5f7c54766ab59e5117bb118f55774a71f560
      ✅ Configured!

   🌐 Chain 43114 (Avalanche):
      Remote Contract: 0x2271f95dda2b85BefadDe6BdC689C84c63150e04
      Wrapped Gas Token: 0xbb4CdB9CBd36B01bD1cBaEBF2De08d9173bc095c
      Protocol Fee: 0.12 USDC
      VIA Source Fee: 0.25 USDC
      VIA Dest Gas: 1500000000000000 wei
      Authorize Minter: true
      Using Nonce: 70
      TX: 0xbdf50d3ba94b405fcca827429f7e63f07f16748c266301c1139f64cc1626b352
      ✅ Configured!

[VERIFICATION] Checking Configuration...
═══════════════════════════════════════════════════════
   Chain 369: Configured ✅ | Minter ✅
   Chain 8453: Configured ✅ | Minter ✅
   Chain 42161: Configured ✅ | Minter ✅
   Chain 10: Configured ✅ | Minter ✅
   Chain 137: Configured ✅ | Minter ✅
   Chain 43114: Configured ✅ | Minter ✅

✅ ALL ROUTES CONFIGURED FOR WPLS ON BNB!
═══════════════════════════════════════════════════════
   📋 Configured 6 remote chains.

   📋 Next Steps:
   Run this script on ALL other chains with WPLS deployments:
      npx hardhat run scripts/pre-audit-scripts/configure-all-routes.js --network pulsechain WPLS
      npx hardhat run scripts/pre-audit-scripts/configure-all-routes.js --network base WPLS
      npx hardhat run scripts/pre-audit-scripts/configure-all-routes.js --network arbitrum WPLS
      npx hardhat run scripts/pre-audit-scripts/configure-all-routes.js --network optimism WPLS
      npx hardhat run scripts/pre-audit-scripts/configure-all-routes.js --network polygon WPLS
      npx hardhat run scripts/pre-audit-scripts/configure-all-routes.js --network avalanche WPLS
Ganadhishs-MacBook-Air:multi-chain-with-via ganadhish$ npx hardhat run scripts/pre-audit-scripts/configure-all-routes.js --network polygon

🌐 CONFIGURE ALL ROUTES (Pre-Audit Contracts)
═══════════════════════════════════════════════════════
📍 Network: polygon (Chain ID: 137)
👤 Signer: 0x05F8cC8753D90d67DBB8c02118440b8283F941c9
🎯 Token: WPLS

📍 Current Contract: 0x1f5C42FCd0940692d4be52d17CD6bbFDFac9b0ac
   Type: synthetic
   MessageV3: 0x1C5800eb5fECB7760D7F1978ad744feA652a7b27
   Wrapped Gas Token: 0x0d500B1d8E8eF31E21C99d1Db9A6444d3ADf1270

🌐 Remote Chains to Configure (6 total):
   - Chain 369 (PulseChain): 0xEecBf7a332e16572AB367623E9A05d4d26d2c8C4 [collateral]
   - Chain 8453 (Base): 0x78208aeC3e336c6636AB5E0bA16aB9FEA1710ca5 [synthetic]
   - Chain 42161 (Arbitrum): 0xA11F758A972e843Fde082BE31Ff1a7cd6e47ac1C [synthetic]
   - Chain 10 (Optimism): 0x4Ce7a88A512FB0BfbB1F6Fe9cE70F2A98D413BeC [synthetic]
   - Chain 56 (BNB Chain): 0x84B0b1EE6eef971105442Eb9Ab420F3DbB774b46 [synthetic]
   - Chain 43114 (Avalanche): 0x2271f95dda2b85BefadDe6BdC689C84c63150e04 [synthetic]

[STEP 1/2] Configuring MessageClient...
═══════════════════════════════════════════════════════
   MessageV3: 0x1C5800eb5fECB7760D7F1978ad744feA652a7b27
   Remote Chains: [369, 8453, 42161, 10, 56, 43114]
   Confirmations: 15
   Using Nonce: 108
   TX: 0x098cd25bd4061edb6c48f6b641a5047afb9245ba3189f932cd193073320e6726
   ✅ MessageClient configured!

[STEP 2/2] Configuring Remote Chains...
═══════════════════════════════════════════════════════

   🌐 Chain 369 (PulseChain):
      Remote Contract: 0xEecBf7a332e16572AB367623E9A05d4d26d2c8C4
      Wrapped Gas Token: 0x0d500B1d8E8eF31E21C99d1Db9A6444d3ADf1270
      Protocol Fee: 0.12 USDC
      VIA Source Fee: 0.25 USDC
      VIA Dest Gas: 30000000000000000 wei
      Authorize Minter: true
      Using Nonce: 109
      TX: 0x2d0f22aafaa64395396b92c9c634b0e44cf782896a2ff873ef7392f2376e016e
      ✅ Configured!

   🌐 Chain 8453 (Base):
      Remote Contract: 0x78208aeC3e336c6636AB5E0bA16aB9FEA1710ca5
      Wrapped Gas Token: 0x0d500B1d8E8eF31E21C99d1Db9A6444d3ADf1270
      Protocol Fee: 0.12 USDC
      VIA Source Fee: 0.25 USDC
      VIA Dest Gas: 30000000000000000 wei
      Authorize Minter: true
      Using Nonce: 110
      TX: 0xc77cf153825d157a2202501a1c0102b1cfe971f12a0f12467435f4be5734d6aa
      ✅ Configured!

   🌐 Chain 42161 (Arbitrum):
      Remote Contract: 0xA11F758A972e843Fde082BE31Ff1a7cd6e47ac1C
      Wrapped Gas Token: 0x0d500B1d8E8eF31E21C99d1Db9A6444d3ADf1270
      Protocol Fee: 0.12 USDC
      VIA Source Fee: 0.25 USDC
      VIA Dest Gas: 30000000000000000 wei
      Authorize Minter: true
      Using Nonce: 111
      TX: 0x87f3e4609b96f6daf6492cd7f1460d6119a355b0c1e268ee60e5f972fd0ddfdf
      ✅ Configured!

   🌐 Chain 10 (Optimism):
      Remote Contract: 0x4Ce7a88A512FB0BfbB1F6Fe9cE70F2A98D413BeC
      Wrapped Gas Token: 0x0d500B1d8E8eF31E21C99d1Db9A6444d3ADf1270
      Protocol Fee: 0.12 USDC
      VIA Source Fee: 0.25 USDC
      VIA Dest Gas: 30000000000000000 wei
      Authorize Minter: true
      Using Nonce: 112
      TX: 0xca03d9ac636a1c87e81ad835857b05a2794a7e11fa1c384ca8d68bc09111e2c5
      ✅ Configured!

   🌐 Chain 56 (BNB Chain):
      Remote Contract: 0x84B0b1EE6eef971105442Eb9Ab420F3DbB774b46
      Wrapped Gas Token: 0x0d500B1d8E8eF31E21C99d1Db9A6444d3ADf1270
      Protocol Fee: 0.12 USDC
      VIA Source Fee: 0.25 USDC
      VIA Dest Gas: 30000000000000000 wei
      Authorize Minter: true
      Using Nonce: 113
      TX: 0xaa5acfbf4f1e6993582de6cf965edadd9caf33a7b70632fffd61f46fecb43311
      ✅ Configured!

   🌐 Chain 43114 (Avalanche):
      Remote Contract: 0x2271f95dda2b85BefadDe6BdC689C84c63150e04
      Wrapped Gas Token: 0x0d500B1d8E8eF31E21C99d1Db9A6444d3ADf1270
      Protocol Fee: 0.12 USDC
      VIA Source Fee: 0.25 USDC
      VIA Dest Gas: 30000000000000000 wei
      Authorize Minter: true
      Using Nonce: 114
      TX: 0xcd0329d130ac9318e183b2d852e653b9d97ad3c7b7ed1866573267de154c3408
      ✅ Configured!

[VERIFICATION] Checking Configuration...
═══════════════════════════════════════════════════════
   Chain 369: Configured ✅ | Minter ✅
   Chain 8453: Configured ✅ | Minter ✅
   Chain 42161: Configured ✅ | Minter ✅
   Chain 10: Configured ✅ | Minter ✅
   Chain 56: Configured ✅ | Minter ✅
   Chain 43114: Configured ✅ | Minter ✅

✅ ALL ROUTES CONFIGURED FOR WPLS ON POLYGON!
═══════════════════════════════════════════════════════
   📋 Configured 6 remote chains.

   📋 Next Steps:
   Run this script on ALL other chains with WPLS deployments:
      npx hardhat run scripts/pre-audit-scripts/configure-all-routes.js --network pulsechain WPLS
      npx hardhat run scripts/pre-audit-scripts/configure-all-routes.js --network base WPLS
      npx hardhat run scripts/pre-audit-scripts/configure-all-routes.js --network arbitrum WPLS
      npx hardhat run scripts/pre-audit-scripts/configure-all-routes.js --network optimism WPLS
      npx hardhat run scripts/pre-audit-scripts/configure-all-routes.js --network bnb WPLS
      npx hardhat run scripts/pre-audit-scripts/configure-all-routes.js --network avalanche WPLS
Ganadhishs-MacBook-Air:multi-chain-with-via ganadhish$ npx hardhat run scripts/pre-audit-scripts/configure-all-routes.js --network avalanche

🌐 CONFIGURE ALL ROUTES (Pre-Audit Contracts)
═══════════════════════════════════════════════════════
📍 Network: avalanche (Chain ID: 43114)
👤 Signer: 0x05F8cC8753D90d67DBB8c02118440b8283F941c9
🎯 Token: WPLS

📍 Current Contract: 0x2271f95dda2b85BefadDe6BdC689C84c63150e04
   Type: synthetic
   MessageV3: 0x72E052Fa7f0788e668965d37B6c38C88703B7859
   Wrapped Gas Token: 0xB31f66AA3C1e785363F0875A1B74E27b85FD66c7

🌐 Remote Chains to Configure (6 total):
   - Chain 369 (PulseChain): 0xEecBf7a332e16572AB367623E9A05d4d26d2c8C4 [collateral]
   - Chain 8453 (Base): 0x78208aeC3e336c6636AB5E0bA16aB9FEA1710ca5 [synthetic]
   - Chain 42161 (Arbitrum): 0xA11F758A972e843Fde082BE31Ff1a7cd6e47ac1C [synthetic]
   - Chain 10 (Optimism): 0x4Ce7a88A512FB0BfbB1F6Fe9cE70F2A98D413BeC [synthetic]
   - Chain 56 (BNB Chain): 0x84B0b1EE6eef971105442Eb9Ab420F3DbB774b46 [synthetic]
   - Chain 137 (Polygon): 0x1f5C42FCd0940692d4be52d17CD6bbFDFac9b0ac [synthetic]

[STEP 1/2] Configuring MessageClient...
═══════════════════════════════════════════════════════
   MessageV3: 0x72E052Fa7f0788e668965d37B6c38C88703B7859
   Remote Chains: [369, 8453, 42161, 10, 56, 137]
   Confirmations: 15
   Using Nonce: 62
   TX: 0x94d745cf022d119220176832efc6d652355cf705c113b9e51f3b463eb506fa65
   ✅ MessageClient configured!

[STEP 2/2] Configuring Remote Chains...
═══════════════════════════════════════════════════════

   🌐 Chain 369 (PulseChain):
      Remote Contract: 0xEecBf7a332e16572AB367623E9A05d4d26d2c8C4
      Wrapped Gas Token: 0xB31f66AA3C1e785363F0875A1B74E27b85FD66c7
      Protocol Fee: 0.12 USDC
      VIA Source Fee: 0.25 USDC
      VIA Dest Gas: 15000000000000000 wei
      Authorize Minter: true
      Using Nonce: 63
      TX: 0x0990cb05f9be45262f26fd2bf9d62fb4edc06b7e0f6abbb4725032861573c5af
      ✅ Configured!

   🌐 Chain 8453 (Base):
      Remote Contract: 0x78208aeC3e336c6636AB5E0bA16aB9FEA1710ca5
      Wrapped Gas Token: 0xB31f66AA3C1e785363F0875A1B74E27b85FD66c7
      Protocol Fee: 0.12 USDC
      VIA Source Fee: 0.25 USDC
      VIA Dest Gas: 15000000000000000 wei
      Authorize Minter: true
      Using Nonce: 64
      TX: 0xf12c406870d88c8baf3e2fcf6340bb9663885283c142024bc9963dada7f2803a
      ✅ Configured!

   🌐 Chain 42161 (Arbitrum):
      Remote Contract: 0xA11F758A972e843Fde082BE31Ff1a7cd6e47ac1C
      Wrapped Gas Token: 0xB31f66AA3C1e785363F0875A1B74E27b85FD66c7
      Protocol Fee: 0.12 USDC
      VIA Source Fee: 0.25 USDC
      VIA Dest Gas: 15000000000000000 wei
      Authorize Minter: true
      Using Nonce: 65
      TX: 0xbcb77cff87eed0dd86ede1fbefbdcba7648133f8802aa6892f79bc0f3a0244de
      ✅ Configured!

   🌐 Chain 10 (Optimism):
      Remote Contract: 0x4Ce7a88A512FB0BfbB1F6Fe9cE70F2A98D413BeC
      Wrapped Gas Token: 0xB31f66AA3C1e785363F0875A1B74E27b85FD66c7
      Protocol Fee: 0.12 USDC
      VIA Source Fee: 0.25 USDC
      VIA Dest Gas: 15000000000000000 wei
      Authorize Minter: true
      Using Nonce: 66
      TX: 0xb40d76e6224a7d558d88b2bbb6aa584e368b2eef071e316a31a5489d9f441b72
      ✅ Configured!

   🌐 Chain 56 (BNB Chain):
      Remote Contract: 0x84B0b1EE6eef971105442Eb9Ab420F3DbB774b46
      Wrapped Gas Token: 0xB31f66AA3C1e785363F0875A1B74E27b85FD66c7
      Protocol Fee: 0.12 USDC
      VIA Source Fee: 0.25 USDC
      VIA Dest Gas: 15000000000000000 wei
      Authorize Minter: true
      Using Nonce: 67
      TX: 0x17535d2c08bfef9f3db5c6510e7a44e594a202c88d5fe18ffa5029c97696279c
      ✅ Configured!

   🌐 Chain 137 (Polygon):
      Remote Contract: 0x1f5C42FCd0940692d4be52d17CD6bbFDFac9b0ac
      Wrapped Gas Token: 0xB31f66AA3C1e785363F0875A1B74E27b85FD66c7
      Protocol Fee: 0.12 USDC
      VIA Source Fee: 0.25 USDC
      VIA Dest Gas: 15000000000000000 wei
      Authorize Minter: true
      Using Nonce: 68
      TX: 0x1a9d9c4fbc09db8d8daff59140af2295851a86c112e3c0e81337ec2a475b5e42
      ✅ Configured!

[VERIFICATION] Checking Configuration...
═══════════════════════════════════════════════════════
   Chain 369: Configured ✅ | Minter ✅
   Chain 8453: Configured ✅ | Minter ✅
   Chain 42161: Configured ✅ | Minter ✅
   Chain 10: Configured ✅ | Minter ✅
   Chain 56: Configured ✅ | Minter ✅
   Chain 137: Configured ✅ | Minter ✅

✅ ALL ROUTES CONFIGURED FOR WPLS ON AVALANCHE!
═══════════════════════════════════════════════════════
   📋 Configured 6 remote chains.

   📋 Next Steps:
   Run this script on ALL other chains with WPLS deployments:
      npx hardhat run scripts/pre-audit-scripts/configure-all-routes.js --network pulsechain WPLS
      npx hardhat run scripts/pre-audit-scripts/configure-all-routes.js --network base WPLS
      npx hardhat run scripts/pre-audit-scripts/configure-all-routes.js --network arbitrum WPLS
      npx hardhat run scripts/pre-audit-scripts/configure-all-routes.js --network optimism WPLS
      npx hardhat run scripts/pre-audit-scripts/configure-all-routes.js --network bnb WPLS
      npx hardhat run scripts/pre-audit-scripts/configure-all-routes.js --network polygon WPLS

________________________________________________________________________________________________

___________________________________________

___________________________________________
ALL SYNTHETIC CHAINS CONFIG FOR pHEX TOKEN: 
-------------------------------------------

npx hardhat run scripts/pre-audit-scripts/configure-all-routes.js --network pulsechain

🌐 CONFIGURE ALL ROUTES (Pre-Audit Contracts)
═══════════════════════════════════════════════════════
📍 Network: pulsechain (Chain ID: 369)
👤 Signer: 0x05F8cC8753D90d67DBB8c02118440b8283F941c9
🎯 Token: pHEX

📍 Current Contract: 0xa489CeA254e8649F5b4BA1A4708ed348425606BE
   Type: collateral
   MessageV3: 0xba01F2bA548e69bA26Fd06a3bdf1A7857eeAC435
   Wrapped Gas Token: 0xA1077a294dDE1B09bB078844df40758a5D0f9a27

🌐 Remote Chains to Configure (6 total):
   - Chain 8453 (Base): 0xb97A43ae0563670D83f547638a5A89F2210D1a2c [synthetic]
   - Chain 42161 (Arbitrum): 0xf4e53aAe1D9f27851B03842007D0a8a023317cD2 [synthetic]
   - Chain 10 (Optimism): 0x74b40bAc12a493ab0D9c2daC6B1BCa7A705A6743 [synthetic]
   - Chain 56 (BNB Chain): 0x5f8Eea46Aaf2b936790495d25806B22c21f92242 [synthetic]
   - Chain 137 (Polygon): 0x9BD3C63e254a3fF7b757c9bad18F3c420e7825B2 [synthetic]
   - Chain 43114 (Avalanche): 0x762c2206681c4059df13acb9D2eF87fFA4Ee3FEc [synthetic]

[STEP 1/2] Configuring MessageClient...
═══════════════════════════════════════════════════════
   MessageV3: 0xba01F2bA548e69bA26Fd06a3bdf1A7857eeAC435
   Remote Chains: [8453, 42161, 10, 56, 137, 43114]
   Confirmations: 15
   Using Nonce: 746
   TX: 0x3d280df8dbc0fc240dd0b3af434f43b325bd520ac6929e52a2ce1420b0c3edcd
   ✅ MessageClient configured!

[STEP 2/2] Configuring Remote Chains...
═══════════════════════════════════════════════════════

   🌐 Chain 8453 (Base):
      Remote Contract: 0xb97A43ae0563670D83f547638a5A89F2210D1a2c
      Wrapped Gas Token: 0xA1077a294dDE1B09bB078844df40758a5D0f9a27
      Protocol Fee: 0.12 USDC
      VIA Source Fee: 0.25 USDC
      VIA Dest Gas: 80000000000000000000 wei
      Using Nonce: 747
      TX: 0x46d710e3318c7c6c3c59b5a52c59884433c464b28186766c45ec633687e371a1
      ✅ Configured!

   🌐 Chain 42161 (Arbitrum):
      Remote Contract: 0xf4e53aAe1D9f27851B03842007D0a8a023317cD2
      Wrapped Gas Token: 0xA1077a294dDE1B09bB078844df40758a5D0f9a27
      Protocol Fee: 0.12 USDC
      VIA Source Fee: 0.25 USDC
      VIA Dest Gas: 80000000000000000000 wei
      Using Nonce: 748
      TX: 0x98a7c4f4c13611051eddaa70f0321ee032fb94fc4047eaa4a92ddcdc24aad9d0
      ✅ Configured!

   🌐 Chain 10 (Optimism):
      Remote Contract: 0x74b40bAc12a493ab0D9c2daC6B1BCa7A705A6743
      Wrapped Gas Token: 0xA1077a294dDE1B09bB078844df40758a5D0f9a27
      Protocol Fee: 0.12 USDC
      VIA Source Fee: 0.25 USDC
      VIA Dest Gas: 80000000000000000000 wei
      Using Nonce: 749
      TX: 0xbf4643b4472ba92aed666b87318f3d467744d3dbc3c9bdd820ea25b01b19f7c7
      ✅ Configured!

   🌐 Chain 56 (BNB Chain):
      Remote Contract: 0x5f8Eea46Aaf2b936790495d25806B22c21f92242
      Wrapped Gas Token: 0xA1077a294dDE1B09bB078844df40758a5D0f9a27
      Protocol Fee: 0.12 USDC
      VIA Source Fee: 0.25 USDC
      VIA Dest Gas: 80000000000000000000 wei
      Using Nonce: 750
      TX: 0x9135abf3f3fea306a54aa37d76a42364d174936b7ce75ff4039e2663969be5c1
      ✅ Configured!

   🌐 Chain 137 (Polygon):
      Remote Contract: 0x9BD3C63e254a3fF7b757c9bad18F3c420e7825B2
      Wrapped Gas Token: 0xA1077a294dDE1B09bB078844df40758a5D0f9a27
      Protocol Fee: 0.12 USDC
      VIA Source Fee: 0.25 USDC
      VIA Dest Gas: 80000000000000000000 wei
      Using Nonce: 751
      TX: 0x3063e16cca2d2539526259ad5585cd72007b0c57a7346098bd3c8730cd0908be
      ✅ Configured!

   🌐 Chain 43114 (Avalanche):
      Remote Contract: 0x762c2206681c4059df13acb9D2eF87fFA4Ee3FEc
      Wrapped Gas Token: 0xA1077a294dDE1B09bB078844df40758a5D0f9a27
      Protocol Fee: 0.12 USDC
      VIA Source Fee: 0.25 USDC
      VIA Dest Gas: 80000000000000000000 wei
      Using Nonce: 752
      TX: 0xcf9e229a6e74c3e8e5bf2a2d093b9a8223b9af13da8133dcc7db6fa03f9d6b45
      ✅ Configured!

[VERIFICATION] Checking Configuration...
═══════════════════════════════════════════════════════
   Chain 8453: Configured ✅
   Chain 42161: Configured ✅
   Chain 10: Configured ✅
   Chain 56: Configured ✅
   Chain 137: Configured ✅
   Chain 43114: Configured ✅

✅ ALL ROUTES CONFIGURED FOR pHEX ON PULSECHAIN!
═══════════════════════════════════════════════════════
   📋 Configured 6 remote chains.

   📋 Next Steps:
   Run this script on ALL other chains with pHEX deployments:
      npx hardhat run scripts/pre-audit-scripts/configure-all-routes.js --network base pHEX
      npx hardhat run scripts/pre-audit-scripts/configure-all-routes.js --network arbitrum pHEX
      npx hardhat run scripts/pre-audit-scripts/configure-all-routes.js --network optimism pHEX
      npx hardhat run scripts/pre-audit-scripts/configure-all-routes.js --network bnb pHEX
      npx hardhat run scripts/pre-audit-scripts/configure-all-routes.js --network polygon pHEX
      npx hardhat run scripts/pre-audit-scripts/configure-all-routes.js --network avalanche pHEX
Ganadhishs-MacBook-Air:multi-chain-with-via ganadhish$ npx hardhat run scripts/pre-audit-scripts/configure-all-routes.js --network base

🌐 CONFIGURE ALL ROUTES (Pre-Audit Contracts)
═══════════════════════════════════════════════════════
📍 Network: base (Chain ID: 8453)
👤 Signer: 0x05F8cC8753D90d67DBB8c02118440b8283F941c9
🎯 Token: pHEX

📍 Current Contract: 0xb97A43ae0563670D83f547638a5A89F2210D1a2c
   Type: synthetic
   MessageV3: 0xe3b3274bb685F37C7f17a604039c77a6A16Cfc2a
   Wrapped Gas Token: 0x4200000000000000000000000000000000000006

🌐 Remote Chains to Configure (6 total):
   - Chain 369 (PulseChain): 0xa489CeA254e8649F5b4BA1A4708ed348425606BE [collateral]
   - Chain 42161 (Arbitrum): 0xf4e53aAe1D9f27851B03842007D0a8a023317cD2 [synthetic]
   - Chain 10 (Optimism): 0x74b40bAc12a493ab0D9c2daC6B1BCa7A705A6743 [synthetic]
   - Chain 56 (BNB Chain): 0x5f8Eea46Aaf2b936790495d25806B22c21f92242 [synthetic]
   - Chain 137 (Polygon): 0x9BD3C63e254a3fF7b757c9bad18F3c420e7825B2 [synthetic]
   - Chain 43114 (Avalanche): 0x762c2206681c4059df13acb9D2eF87fFA4Ee3FEc [synthetic]

[STEP 1/2] Configuring MessageClient...
═══════════════════════════════════════════════════════
   MessageV3: 0xe3b3274bb685F37C7f17a604039c77a6A16Cfc2a
   Remote Chains: [369, 42161, 10, 56, 137, 43114]
   Confirmations: 15
   Using Nonce: 516
   TX: 0x32b6110d85463288dbfd4000c76cd288624aeae0da8568007094d627f2fb772d
   ✅ MessageClient configured!

[STEP 2/2] Configuring Remote Chains...
═══════════════════════════════════════════════════════

   🌐 Chain 369 (PulseChain):
      Remote Contract: 0xa489CeA254e8649F5b4BA1A4708ed348425606BE
      Wrapped Gas Token: 0x4200000000000000000000000000000000000006
      Protocol Fee: 0.12 USDC
      VIA Source Fee: 0.25 USDC
      VIA Dest Gas: 30000000000000 wei
      Authorize Minter: true
      Using Nonce: 516
      ❌ Failed: replacement transaction underpriced

   🌐 Chain 42161 (Arbitrum):
      Remote Contract: 0xf4e53aAe1D9f27851B03842007D0a8a023317cD2
      Wrapped Gas Token: 0x4200000000000000000000000000000000000006
      Protocol Fee: 0.12 USDC
      VIA Source Fee: 0.25 USDC
      VIA Dest Gas: 30000000000000 wei
      Authorize Minter: true
      Using Nonce: 516
      ❌ Failed: nonce too low: next nonce 517, tx nonce 516

   🌐 Chain 10 (Optimism):
      Remote Contract: 0x74b40bAc12a493ab0D9c2daC6B1BCa7A705A6743
      Wrapped Gas Token: 0x4200000000000000000000000000000000000006
      Protocol Fee: 0.12 USDC
      VIA Source Fee: 0.25 USDC
      VIA Dest Gas: 30000000000000 wei
      Authorize Minter: true
      Using Nonce: 517
      TX: 0x271027c2425af95388b019b92eab69bcacaf87078aa73ac9bb10f4749baa671b
      ✅ Configured!

   🌐 Chain 56 (BNB Chain):
      Remote Contract: 0x5f8Eea46Aaf2b936790495d25806B22c21f92242
      Wrapped Gas Token: 0x4200000000000000000000000000000000000006
      Protocol Fee: 0.12 USDC
      VIA Source Fee: 0.25 USDC
      VIA Dest Gas: 30000000000000 wei
      Authorize Minter: true
      Using Nonce: 518
      TX: 0x95d38d08991f2c38c0b4244a08178ce0962b7f0967c82f7ed0950ad816e11a1b
      ✅ Configured!

   🌐 Chain 137 (Polygon):
      Remote Contract: 0x9BD3C63e254a3fF7b757c9bad18F3c420e7825B2
      Wrapped Gas Token: 0x4200000000000000000000000000000000000006
      Protocol Fee: 0.12 USDC
      VIA Source Fee: 0.25 USDC
      VIA Dest Gas: 30000000000000 wei
      Authorize Minter: true
      Using Nonce: 519
      TX: 0xf80575126d2848428269c63fd85321346f00296fdb139ac9cdecc593943c6ff3
      ✅ Configured!

   🌐 Chain 43114 (Avalanche):
      Remote Contract: 0x762c2206681c4059df13acb9D2eF87fFA4Ee3FEc
      Wrapped Gas Token: 0x4200000000000000000000000000000000000006
      Protocol Fee: 0.12 USDC
      VIA Source Fee: 0.25 USDC
      VIA Dest Gas: 30000000000000 wei
      Authorize Minter: true
      Using Nonce: 520
      TX: 0x22dd2a65d158ef1e82d406ee505779d5037b720fbf6cb2b9189a4bc812a3663b
      ✅ Configured!

[VERIFICATION] Checking Configuration...
═══════════════════════════════════════════════════════
   Chain 369: Configured ❌ | Minter ❌
   Chain 42161: Configured ❌ | Minter ❌
   Chain 10: Configured ✅ | Minter ✅
   Chain 56: Configured ✅ | Minter ✅
   Chain 137: Configured ✅ | Minter ✅
   Chain 43114: Configured ✅ | Minter ✅

✅ ALL ROUTES CONFIGURED FOR pHEX ON BASE!
═══════════════════════════════════════════════════════
   📋 Configured 6 remote chains.

   📋 Next Steps:
   Run this script on ALL other chains with pHEX deployments:
      npx hardhat run scripts/pre-audit-scripts/configure-all-routes.js --network pulsechain pHEX
      npx hardhat run scripts/pre-audit-scripts/configure-all-routes.js --network arbitrum pHEX
      npx hardhat run scripts/pre-audit-scripts/configure-all-routes.js --network optimism pHEX
      npx hardhat run scripts/pre-audit-scripts/configure-all-routes.js --network bnb pHEX
      npx hardhat run scripts/pre-audit-scripts/configure-all-routes.js --network polygon pHEX
      npx hardhat run scripts/pre-audit-scripts/configure-all-routes.js --network avalanche pHEX
TOKEN_SYMBOL=pHEX DEST_CHAIN=arbitrum npx hardhat run scrip
ts/pre-audit-scripts/configure-chain.js --network base

🔧 CONFIGURING DESTINATION CHAIN (Pre-Audit)
═══════════════════════════════════════════════════════
📍 Current Network: base (Chain ID: 8453)
👤 Signer: 0x05F8cC8753D90d67DBB8c02118440b8283F941c9
🎯 Token: pHEX
🌐 Destination Chain: arbitrum

📍 Current Contract: 0xb97A43ae0563670D83f547638a5A89F2210D1a2c
   Type: synthetic

🌐 Destination Contract: 0xf4e53aAe1D9f27851B03842007D0a8a023317cD2
   Chain ID: 42161
   Type: synthetic

⚙️  Configuration Parameters:
   Remote Contract: 0xf4e53aAe1D9f27851B03842007D0a8a023317cD2
   Wrapped Gas Token (local): 0x4200000000000000000000000000000000000006
   Protocol Fee: 0.12 USDC
   VIA Source Fee: 0.25 USDC
   VIA Dest Gas: 30000000000000 wei
   Supported: true
   Authorize Minter: true

⏳ Configuring chain 42161...
   TX Sent: 0x58881b3c8b2da3f86b635896660b2eb17b6671764d37dc68c52798a681dac281
   Waiting for confirmation...
   ✅ Chain 42161 configured! Block: 40844808

🔍 Verifying configuration...
   Chain 42161 configured: ✅
   Minter authorized: ✅ (Expected: true)
   Protocol Fee: 0.12 USDC
   VIA Source Fee: 0.25 USDC

📋 Next Steps:
   1. Run this script on the destination chain (arbitrum) pointing back here
   2. Test bridging with bridge-to-destination.js

✅ Chain configuration complete!
Ganadhishs-MacBook-Air:multi-chain-with-via ganadhish$ TOKEN_SYMBOL=pHEX DEST_CHAIN=pulsechain npx hardhat run scripts/pre-audit-scripts/configure-chain.js --network base

🔧 CONFIGURING DESTINATION CHAIN (Pre-Audit)
═══════════════════════════════════════════════════════
📍 Current Network: base (Chain ID: 8453)
👤 Signer: 0x05F8cC8753D90d67DBB8c02118440b8283F941c9
🎯 Token: pHEX
🌐 Destination Chain: pulsechain

📍 Current Contract: 0xb97A43ae0563670D83f547638a5A89F2210D1a2c
   Type: synthetic

🌐 Destination Contract: 0xa489CeA254e8649F5b4BA1A4708ed348425606BE
   Chain ID: 369
   Type: collateral

⚙️  Configuration Parameters:
   Remote Contract: 0xa489CeA254e8649F5b4BA1A4708ed348425606BE
   Wrapped Gas Token (local): 0x4200000000000000000000000000000000000006
   Protocol Fee: 0.12 USDC
   VIA Source Fee: 0.25 USDC
   VIA Dest Gas: 30000000000000 wei
   Supported: true
   Authorize Minter: true

⏳ Configuring chain 369...
   TX Sent: 0x76ba33644d471ead398388f5d9d0d6a39ab5224baff383f9bd0fa2eac02dd867
   Waiting for confirmation...
   ✅ Chain 369 configured! Block: 40844813

🔍 Verifying configuration...
   Chain 369 configured: ✅
   Minter authorized: ✅ (Expected: true)
   Protocol Fee: 0.12 USDC
   VIA Source Fee: 0.25 USDC

📋 Next Steps:
   1. Run this script on the destination chain (pulsechain) pointing back here
   2. Test bridging with bridge-to-destination.js

✅ Chain configuration complete!


Ganadhishs-MacBook-Air:multi-chain-with-via ganadhish$ npx hardhat run scripts/pre-audit-scripts/configure-all-routes.js --network arbitrum

🌐 CONFIGURE ALL ROUTES (Pre-Audit Contracts)
═══════════════════════════════════════════════════════
📍 Network: arbitrum (Chain ID: 42161)
👤 Signer: 0x05F8cC8753D90d67DBB8c02118440b8283F941c9
🎯 Token: pHEX

📍 Current Contract: 0xf4e53aAe1D9f27851B03842007D0a8a023317cD2
   Type: synthetic
   MessageV3: 0x65EEc58ef38882422E887B82f7085e9a9C35dCA1
   Wrapped Gas Token: 0x82aF49447D8a07e3bd95BD0d56f35241523fBab1

🌐 Remote Chains to Configure (6 total):
   - Chain 369 (PulseChain): 0xa489CeA254e8649F5b4BA1A4708ed348425606BE [collateral]
   - Chain 8453 (Base): 0xb97A43ae0563670D83f547638a5A89F2210D1a2c [synthetic]
   - Chain 10 (Optimism): 0x74b40bAc12a493ab0D9c2daC6B1BCa7A705A6743 [synthetic]
   - Chain 56 (BNB Chain): 0x5f8Eea46Aaf2b936790495d25806B22c21f92242 [synthetic]
   - Chain 137 (Polygon): 0x9BD3C63e254a3fF7b757c9bad18F3c420e7825B2 [synthetic]
   - Chain 43114 (Avalanche): 0x762c2206681c4059df13acb9D2eF87fFA4Ee3FEc [synthetic]

[STEP 1/2] Configuring MessageClient...
═══════════════════════════════════════════════════════
   MessageV3: 0x65EEc58ef38882422E887B82f7085e9a9C35dCA1
   Remote Chains: [369, 8453, 10, 56, 137, 43114]
   Confirmations: 15
   Using Nonce: 169
   TX: 0x5acdab4a6f83c88f51da644544df1827f74c580a7c2f6a9c98c1435180e91644
   ✅ MessageClient configured!

[STEP 2/2] Configuring Remote Chains...
═══════════════════════════════════════════════════════

   🌐 Chain 369 (PulseChain):
      Remote Contract: 0xa489CeA254e8649F5b4BA1A4708ed348425606BE
      Wrapped Gas Token: 0x82aF49447D8a07e3bd95BD0d56f35241523fBab1
      Protocol Fee: 0.12 USDC
      VIA Source Fee: 0.25 USDC
      VIA Dest Gas: 30000000000000 wei
      Authorize Minter: true
      Using Nonce: 170
      TX: 0x4992bd51da9e2d54f44be345d0a1e9c1deeb9438981edb5a85f3c9739687da19
      ✅ Configured!

   🌐 Chain 8453 (Base):
      Remote Contract: 0xb97A43ae0563670D83f547638a5A89F2210D1a2c
      Wrapped Gas Token: 0x82aF49447D8a07e3bd95BD0d56f35241523fBab1
      Protocol Fee: 0.12 USDC
      VIA Source Fee: 0.25 USDC
      VIA Dest Gas: 30000000000000 wei
      Authorize Minter: true
      Using Nonce: 171
      TX: 0xa4ea2473c943bcf1df584c4a9a5601b0e3ff81b51f19b72b26a9ebef998dd159
      ✅ Configured!

   🌐 Chain 10 (Optimism):
      Remote Contract: 0x74b40bAc12a493ab0D9c2daC6B1BCa7A705A6743
      Wrapped Gas Token: 0x82aF49447D8a07e3bd95BD0d56f35241523fBab1
      Protocol Fee: 0.12 USDC
      VIA Source Fee: 0.25 USDC
      VIA Dest Gas: 30000000000000 wei
      Authorize Minter: true
      Using Nonce: 172
      TX: 0x12bb2f8cc789f4ab711bd1e8e5bedc0273ffac7861768ab26ae50408d629ef85
      ✅ Configured!

   🌐 Chain 56 (BNB Chain):
      Remote Contract: 0x5f8Eea46Aaf2b936790495d25806B22c21f92242
      Wrapped Gas Token: 0x82aF49447D8a07e3bd95BD0d56f35241523fBab1
      Protocol Fee: 0.12 USDC
      VIA Source Fee: 0.25 USDC
      VIA Dest Gas: 30000000000000 wei
      Authorize Minter: true
      Using Nonce: 173
      TX: 0x5ce3f85bfc7705815d20363078a7d447e736fc06133a9f6882e0560ba0b5a1ab
      ✅ Configured!

   🌐 Chain 137 (Polygon):
      Remote Contract: 0x9BD3C63e254a3fF7b757c9bad18F3c420e7825B2
      Wrapped Gas Token: 0x82aF49447D8a07e3bd95BD0d56f35241523fBab1
      Protocol Fee: 0.12 USDC
      VIA Source Fee: 0.25 USDC
      VIA Dest Gas: 30000000000000 wei
      Authorize Minter: true
      Using Nonce: 174
      TX: 0x53ba09a55e85fc027aeb3245855beb9bcbaf8ba1a27648403919f85ea59c4838
      ✅ Configured!

   🌐 Chain 43114 (Avalanche):
      Remote Contract: 0x762c2206681c4059df13acb9D2eF87fFA4Ee3FEc
      Wrapped Gas Token: 0x82aF49447D8a07e3bd95BD0d56f35241523fBab1
      Protocol Fee: 0.12 USDC
      VIA Source Fee: 0.25 USDC
      VIA Dest Gas: 30000000000000 wei
      Authorize Minter: true
      Using Nonce: 175
      TX: 0x157e3b944a1b4360953e4a662d69e8636591945fb9551c4e877b74bda5848e62
      ✅ Configured!

[VERIFICATION] Checking Configuration...
═══════════════════════════════════════════════════════
   Chain 369: Configured ✅ | Minter ✅
   Chain 8453: Configured ✅ | Minter ✅
   Chain 10: Configured ✅ | Minter ✅
   Chain 56: Configured ✅ | Minter ✅
   Chain 137: Configured ✅ | Minter ✅
   Chain 43114: Configured ✅ | Minter ✅

✅ ALL ROUTES CONFIGURED FOR pHEX ON ARBITRUM!
═══════════════════════════════════════════════════════
   📋 Configured 6 remote chains.

   📋 Next Steps:
   Run this script on ALL other chains with pHEX deployments:
      npx hardhat run scripts/pre-audit-scripts/configure-all-routes.js --network pulsechain pHEX
      npx hardhat run scripts/pre-audit-scripts/configure-all-routes.js --network base pHEX
      npx hardhat run scripts/pre-audit-scripts/configure-all-routes.js --network optimism pHEX
      npx hardhat run scripts/pre-audit-scripts/configure-all-routes.js --network bnb pHEX
      npx hardhat run scripts/pre-audit-scripts/configure-all-routes.js --network polygon pHEX
      npx hardhat run scripts/pre-audit-scripts/configure-all-routes.js --network avalanche pHEX
Ganadhishs-MacBook-Air:multi-chain-with-via ganadhish$ npx hardhat run scripts/pre-audit-scripts/configure-all-routes.js --network optimism

🌐 CONFIGURE ALL ROUTES (Pre-Audit Contracts)
═══════════════════════════════════════════════════════
📍 Network: optimism (Chain ID: 10)
👤 Signer: 0x05F8cC8753D90d67DBB8c02118440b8283F941c9
🎯 Token: pHEX

📍 Current Contract: 0x74b40bAc12a493ab0D9c2daC6B1BCa7A705A6743
   Type: synthetic
   MessageV3: 0x15AC559DA4951c796DB6620fAb286B96840D039A
   Wrapped Gas Token: 0x4200000000000000000000000000000000000006

🌐 Remote Chains to Configure (6 total):
   - Chain 369 (PulseChain): 0xa489CeA254e8649F5b4BA1A4708ed348425606BE [collateral]
   - Chain 8453 (Base): 0xb97A43ae0563670D83f547638a5A89F2210D1a2c [synthetic]
   - Chain 42161 (Arbitrum): 0xf4e53aAe1D9f27851B03842007D0a8a023317cD2 [synthetic]
   - Chain 56 (BNB Chain): 0x5f8Eea46Aaf2b936790495d25806B22c21f92242 [synthetic]
   - Chain 137 (Polygon): 0x9BD3C63e254a3fF7b757c9bad18F3c420e7825B2 [synthetic]
   - Chain 43114 (Avalanche): 0x762c2206681c4059df13acb9D2eF87fFA4Ee3FEc [synthetic]

[STEP 1/2] Configuring MessageClient...
═══════════════════════════════════════════════════════
   MessageV3: 0x15AC559DA4951c796DB6620fAb286B96840D039A
   Remote Chains: [369, 8453, 42161, 56, 137, 43114]
   Confirmations: 15
   Using Nonce: 126
   TX: 0xdab31a8555dc9f44e9c9e67d9fc8e76496f74fd0110c061787c25375c753b03f
   ✅ MessageClient configured!

[STEP 2/2] Configuring Remote Chains...
═══════════════════════════════════════════════════════

   🌐 Chain 369 (PulseChain):
      Remote Contract: 0xa489CeA254e8649F5b4BA1A4708ed348425606BE
      Wrapped Gas Token: 0x4200000000000000000000000000000000000006
      Protocol Fee: 0.12 USDC
      VIA Source Fee: 0.25 USDC
      VIA Dest Gas: 30000000000000 wei
      Authorize Minter: true
      Using Nonce: 127
      TX: 0xf8f5d7308c4cd2fd8c43299089489982b1f7c7ab91983dd4fc3708515687c3ff
      ✅ Configured!

   🌐 Chain 8453 (Base):
      Remote Contract: 0xb97A43ae0563670D83f547638a5A89F2210D1a2c
      Wrapped Gas Token: 0x4200000000000000000000000000000000000006
      Protocol Fee: 0.12 USDC
      VIA Source Fee: 0.25 USDC
      VIA Dest Gas: 30000000000000 wei
      Authorize Minter: true
      Using Nonce: 128
      TX: 0xdf91dbd1630f56ddb26b81d4699025b7c5fcb851e3ce2083a93858257f240774
      ✅ Configured!

   🌐 Chain 42161 (Arbitrum):
      Remote Contract: 0xf4e53aAe1D9f27851B03842007D0a8a023317cD2
      Wrapped Gas Token: 0x4200000000000000000000000000000000000006
      Protocol Fee: 0.12 USDC
      VIA Source Fee: 0.25 USDC
      VIA Dest Gas: 30000000000000 wei
      Authorize Minter: true
      Using Nonce: 129
      TX: 0xfcb42798c188115e97306787bcb00b955b4c7cce0736350be11f282657516b51
      ✅ Configured!

   🌐 Chain 56 (BNB Chain):
      Remote Contract: 0x5f8Eea46Aaf2b936790495d25806B22c21f92242
      Wrapped Gas Token: 0x4200000000000000000000000000000000000006
      Protocol Fee: 0.12 USDC
      VIA Source Fee: 0.25 USDC
      VIA Dest Gas: 30000000000000 wei
      Authorize Minter: true
      Using Nonce: 130
      TX: 0x96ad847cd53b3b6b5493ce284188d49ca1610351b9ec3432e747095b3a56a245
      ✅ Configured!

   🌐 Chain 137 (Polygon):
      Remote Contract: 0x9BD3C63e254a3fF7b757c9bad18F3c420e7825B2
      Wrapped Gas Token: 0x4200000000000000000000000000000000000006
      Protocol Fee: 0.12 USDC
      VIA Source Fee: 0.25 USDC
      VIA Dest Gas: 30000000000000 wei
      Authorize Minter: true
      Using Nonce: 131
      TX: 0x546b417260d6ece968eb35b9fd5443af8d9fed3b45d7aa70e235cfd3ea4958c0
      ✅ Configured!

   🌐 Chain 43114 (Avalanche):
      Remote Contract: 0x762c2206681c4059df13acb9D2eF87fFA4Ee3FEc
      Wrapped Gas Token: 0x4200000000000000000000000000000000000006
      Protocol Fee: 0.12 USDC
      VIA Source Fee: 0.25 USDC
      VIA Dest Gas: 30000000000000 wei
      Authorize Minter: true
      Using Nonce: 132
      TX: 0x697c230f5de6191d9522e1be8581b99518e61710104932eac377cf01b313865c
      ✅ Configured!

[VERIFICATION] Checking Configuration...
═══════════════════════════════════════════════════════
   Chain 369: Configured ✅ | Minter ✅
   Chain 8453: Configured ✅ | Minter ✅
   Chain 42161: Configured ✅ | Minter ✅
   Chain 56: Configured ✅ | Minter ✅
   Chain 137: Configured ✅ | Minter ✅
   Chain 43114: Configured ✅ | Minter ✅

✅ ALL ROUTES CONFIGURED FOR pHEX ON OPTIMISM!
═══════════════════════════════════════════════════════
   📋 Configured 6 remote chains.

   📋 Next Steps:
   Run this script on ALL other chains with pHEX deployments:
      npx hardhat run scripts/pre-audit-scripts/configure-all-routes.js --network pulsechain pHEX
      npx hardhat run scripts/pre-audit-scripts/configure-all-routes.js --network base pHEX
      npx hardhat run scripts/pre-audit-scripts/configure-all-routes.js --network arbitrum pHEX
      npx hardhat run scripts/pre-audit-scripts/configure-all-routes.js --network bnb pHEX
      npx hardhat run scripts/pre-audit-scripts/configure-all-routes.js --network polygon pHEX
      npx hardhat run scripts/pre-audit-scripts/configure-all-routes.js --network avalanche pHEX
Ganadhishs-MacBook-Air:multi-chain-with-via ganadhish$ npx hardhat run scripts/pre-audit-scripts/configure-all-routes.js --network bnb

🌐 CONFIGURE ALL ROUTES (Pre-Audit Contracts)
═══════════════════════════════════════════════════════
📍 Network: bnb (Chain ID: 56)
👤 Signer: 0x05F8cC8753D90d67DBB8c02118440b8283F941c9
🎯 Token: pHEX

📍 Current Contract: 0x5f8Eea46Aaf2b936790495d25806B22c21f92242
   Type: synthetic
   MessageV3: 0x7b67dF6728E294db2eb173ac7c738a4627Ae5e11
   Wrapped Gas Token: 0xbb4CdB9CBd36B01bD1cBaEBF2De08d9173bc095c

🌐 Remote Chains to Configure (6 total):
   - Chain 369 (PulseChain): 0xa489CeA254e8649F5b4BA1A4708ed348425606BE [collateral]
   - Chain 8453 (Base): 0xb97A43ae0563670D83f547638a5A89F2210D1a2c [synthetic]
   - Chain 42161 (Arbitrum): 0xf4e53aAe1D9f27851B03842007D0a8a023317cD2 [synthetic]
   - Chain 10 (Optimism): 0x74b40bAc12a493ab0D9c2daC6B1BCa7A705A6743 [synthetic]
   - Chain 137 (Polygon): 0x9BD3C63e254a3fF7b757c9bad18F3c420e7825B2 [synthetic]
   - Chain 43114 (Avalanche): 0x762c2206681c4059df13acb9D2eF87fFA4Ee3FEc [synthetic]

[STEP 1/2] Configuring MessageClient...
═══════════════════════════════════════════════════════
   MessageV3: 0x7b67dF6728E294db2eb173ac7c738a4627Ae5e11
   Remote Chains: [369, 8453, 42161, 10, 137, 43114]
   Confirmations: 15
   Using Nonce: 72
   TX: 0x43f2fdb2fd41688e2a5081643a6e3e41eb4d096a2a6406cee62a82f179569bda
   ✅ MessageClient configured!

[STEP 2/2] Configuring Remote Chains...
═══════════════════════════════════════════════════════

   🌐 Chain 369 (PulseChain):
      Remote Contract: 0xa489CeA254e8649F5b4BA1A4708ed348425606BE
      Wrapped Gas Token: 0xbb4CdB9CBd36B01bD1cBaEBF2De08d9173bc095c
      Protocol Fee: 0.12 USDC
      VIA Source Fee: 0.25 USDC
      VIA Dest Gas: 1500000000000000 wei
      Authorize Minter: true
      Using Nonce: 73
      TX: 0x979a2dc11b58719f8db0da66fb94ef9a2792a414b25c8ba1a87279360d482cfe
      ✅ Configured!

   🌐 Chain 8453 (Base):
      Remote Contract: 0xb97A43ae0563670D83f547638a5A89F2210D1a2c
      Wrapped Gas Token: 0xbb4CdB9CBd36B01bD1cBaEBF2De08d9173bc095c
      Protocol Fee: 0.12 USDC
      VIA Source Fee: 0.25 USDC
      VIA Dest Gas: 1500000000000000 wei
      Authorize Minter: true
      Using Nonce: 74
      TX: 0x1ea4eabc6ab3a88e33fad566c73115ee199d894313181a75cc09607c8e16347f
      ✅ Configured!

   🌐 Chain 42161 (Arbitrum):
      Remote Contract: 0xf4e53aAe1D9f27851B03842007D0a8a023317cD2
      Wrapped Gas Token: 0xbb4CdB9CBd36B01bD1cBaEBF2De08d9173bc095c
      Protocol Fee: 0.12 USDC
      VIA Source Fee: 0.25 USDC
      VIA Dest Gas: 1500000000000000 wei
      Authorize Minter: true
      Using Nonce: 75
      TX: 0xe73bf95abfd3a019ba2da9a8eb64aed4ef427b6a4d367f4fb70885dd6025ef3c
      ✅ Configured!

   🌐 Chain 10 (Optimism):
      Remote Contract: 0x74b40bAc12a493ab0D9c2daC6B1BCa7A705A6743
      Wrapped Gas Token: 0xbb4CdB9CBd36B01bD1cBaEBF2De08d9173bc095c
      Protocol Fee: 0.12 USDC
      VIA Source Fee: 0.25 USDC
      VIA Dest Gas: 1500000000000000 wei
      Authorize Minter: true
      Using Nonce: 76
      TX: 0xb7e1d1df18f7e8383eeae5c4485b43c235ea652ae425a005b5b4184c15cfd451
      ✅ Configured!

   🌐 Chain 137 (Polygon):
      Remote Contract: 0x9BD3C63e254a3fF7b757c9bad18F3c420e7825B2
      Wrapped Gas Token: 0xbb4CdB9CBd36B01bD1cBaEBF2De08d9173bc095c
      Protocol Fee: 0.12 USDC
      VIA Source Fee: 0.25 USDC
      VIA Dest Gas: 1500000000000000 wei
      Authorize Minter: true
      Using Nonce: 77
      TX: 0x2381e465747b56049de11343cbcb60f11120c3087a9e5d2d9c911a7a1a55aa44
      ✅ Configured!

   🌐 Chain 43114 (Avalanche):
      Remote Contract: 0x762c2206681c4059df13acb9D2eF87fFA4Ee3FEc
      Wrapped Gas Token: 0xbb4CdB9CBd36B01bD1cBaEBF2De08d9173bc095c
      Protocol Fee: 0.12 USDC
      VIA Source Fee: 0.25 USDC
      VIA Dest Gas: 1500000000000000 wei
      Authorize Minter: true
      Using Nonce: 78
      TX: 0x600e3f9a390841b31a1ae7182f71fec91e40076bfcbc3d4a5f3b069deaab3cf8
      ✅ Configured!

[VERIFICATION] Checking Configuration...
═══════════════════════════════════════════════════════
   Chain 369: Configured ✅ | Minter ✅
   Chain 8453: Configured ✅ | Minter ✅
   Chain 42161: Configured ✅ | Minter ✅
   Chain 10: Configured ✅ | Minter ✅
   Chain 137: Configured ✅ | Minter ✅
   Chain 43114: Configured ✅ | Minter ✅

✅ ALL ROUTES CONFIGURED FOR pHEX ON BNB!
═══════════════════════════════════════════════════════
   📋 Configured 6 remote chains.

   📋 Next Steps:
   Run this script on ALL other chains with pHEX deployments:
      npx hardhat run scripts/pre-audit-scripts/configure-all-routes.js --network pulsechain pHEX
      npx hardhat run scripts/pre-audit-scripts/configure-all-routes.js --network base pHEX
      npx hardhat run scripts/pre-audit-scripts/configure-all-routes.js --network arbitrum pHEX
      npx hardhat run scripts/pre-audit-scripts/configure-all-routes.js --network optimism pHEX
      npx hardhat run scripts/pre-audit-scripts/configure-all-routes.js --network polygon pHEX
      npx hardhat run scripts/pre-audit-scripts/configure-all-routes.js --network avalanche pHEX
Ganadhishs-MacBook-Air:multi-chain-with-via ganadhish$ npx hardhat run scripts/pre-audit-scripts/configure-all-routes.js --network polygon

🌐 CONFIGURE ALL ROUTES (Pre-Audit Contracts)
═══════════════════════════════════════════════════════
📍 Network: polygon (Chain ID: 137)
👤 Signer: 0x05F8cC8753D90d67DBB8c02118440b8283F941c9
🎯 Token: pHEX

📍 Current Contract: 0x9BD3C63e254a3fF7b757c9bad18F3c420e7825B2
   Type: synthetic
   MessageV3: 0x1C5800eb5fECB7760D7F1978ad744feA652a7b27
   Wrapped Gas Token: 0x0d500B1d8E8eF31E21C99d1Db9A6444d3ADf1270

🌐 Remote Chains to Configure (6 total):
   - Chain 369 (PulseChain): 0xa489CeA254e8649F5b4BA1A4708ed348425606BE [collateral]
   - Chain 8453 (Base): 0xb97A43ae0563670D83f547638a5A89F2210D1a2c [synthetic]
   - Chain 42161 (Arbitrum): 0xf4e53aAe1D9f27851B03842007D0a8a023317cD2 [synthetic]
   - Chain 10 (Optimism): 0x74b40bAc12a493ab0D9c2daC6B1BCa7A705A6743 [synthetic]
   - Chain 56 (BNB Chain): 0x5f8Eea46Aaf2b936790495d25806B22c21f92242 [synthetic]
   - Chain 43114 (Avalanche): 0x762c2206681c4059df13acb9D2eF87fFA4Ee3FEc [synthetic]

[STEP 1/2] Configuring MessageClient...
═══════════════════════════════════════════════════════
   MessageV3: 0x1C5800eb5fECB7760D7F1978ad744feA652a7b27
   Remote Chains: [369, 8453, 42161, 10, 56, 43114]
   Confirmations: 15
   Using Nonce: 116
   TX: 0x50b0df92ef1c0febd6a55466083353a087aa46b4553d3c0e08aa1de2a07647bc
   ✅ MessageClient configured!

[STEP 2/2] Configuring Remote Chains...
═══════════════════════════════════════════════════════

   🌐 Chain 369 (PulseChain):
      Remote Contract: 0xa489CeA254e8649F5b4BA1A4708ed348425606BE
      Wrapped Gas Token: 0x0d500B1d8E8eF31E21C99d1Db9A6444d3ADf1270
      Protocol Fee: 0.12 USDC
      VIA Source Fee: 0.25 USDC
      VIA Dest Gas: 30000000000000000 wei
      Authorize Minter: true
      Using Nonce: 117
      TX: 0x2ebf73779b2eed6d588f3c554ac629581a857e838d8e32e559b5c4980da15f92
      ✅ Configured!

   🌐 Chain 8453 (Base):
      Remote Contract: 0xb97A43ae0563670D83f547638a5A89F2210D1a2c
      Wrapped Gas Token: 0x0d500B1d8E8eF31E21C99d1Db9A6444d3ADf1270
      Protocol Fee: 0.12 USDC
      VIA Source Fee: 0.25 USDC
      VIA Dest Gas: 30000000000000000 wei
      Authorize Minter: true
      Using Nonce: 118
      TX: 0x028bfe2a71b5d6d2820becb63dd8d08a3bb11b80f59704fb701bd4e9af46946c
      ✅ Configured!

   🌐 Chain 42161 (Arbitrum):
      Remote Contract: 0xf4e53aAe1D9f27851B03842007D0a8a023317cD2
      Wrapped Gas Token: 0x0d500B1d8E8eF31E21C99d1Db9A6444d3ADf1270
      Protocol Fee: 0.12 USDC
      VIA Source Fee: 0.25 USDC
      VIA Dest Gas: 30000000000000000 wei
      Authorize Minter: true
      Using Nonce: 119
      TX: 0xdb378bb0d95767fb149a53b59ec854d8d9ef1dd738626243a90b556ce05b8520
      ✅ Configured!

   🌐 Chain 10 (Optimism):
      Remote Contract: 0x74b40bAc12a493ab0D9c2daC6B1BCa7A705A6743
      Wrapped Gas Token: 0x0d500B1d8E8eF31E21C99d1Db9A6444d3ADf1270
      Protocol Fee: 0.12 USDC
      VIA Source Fee: 0.25 USDC
      VIA Dest Gas: 30000000000000000 wei
      Authorize Minter: true
      Using Nonce: 120
      TX: 0xe64e0513106637fea927b8125ac45f63ed0d986dbcd890a93218119f70e19d17
      ✅ Configured!

   🌐 Chain 56 (BNB Chain):
      Remote Contract: 0x5f8Eea46Aaf2b936790495d25806B22c21f92242
      Wrapped Gas Token: 0x0d500B1d8E8eF31E21C99d1Db9A6444d3ADf1270
      Protocol Fee: 0.12 USDC
      VIA Source Fee: 0.25 USDC
      VIA Dest Gas: 30000000000000000 wei
      Authorize Minter: true
      Using Nonce: 121
      TX: 0x7885f198b4903fbc68c1fb4231df3ccfb2860fb976493be72f64e612ca7c5064
      ✅ Configured!

   🌐 Chain 43114 (Avalanche):
      Remote Contract: 0x762c2206681c4059df13acb9D2eF87fFA4Ee3FEc
      Wrapped Gas Token: 0x0d500B1d8E8eF31E21C99d1Db9A6444d3ADf1270
      Protocol Fee: 0.12 USDC
      VIA Source Fee: 0.25 USDC
      VIA Dest Gas: 30000000000000000 wei
      Authorize Minter: true
      Using Nonce: 122
      TX: 0x6e9d07e752ae7cd05e9126c90238be2fe02baae8978ae6c31a619633c58ea8dd
      ✅ Configured!

[VERIFICATION] Checking Configuration...
═══════════════════════════════════════════════════════
   Chain 369: Configured ✅ | Minter ✅
   Chain 8453: Configured ✅ | Minter ✅
   Chain 42161: Configured ✅ | Minter ✅
   Chain 10: Configured ✅ | Minter ✅
   Chain 56: Configured ✅ | Minter ✅
   Chain 43114: Configured ✅ | Minter ✅

✅ ALL ROUTES CONFIGURED FOR pHEX ON POLYGON!
═══════════════════════════════════════════════════════
   📋 Configured 6 remote chains.

   📋 Next Steps:
   Run this script on ALL other chains with pHEX deployments:
      npx hardhat run scripts/pre-audit-scripts/configure-all-routes.js --network pulsechain pHEX
      npx hardhat run scripts/pre-audit-scripts/configure-all-routes.js --network base pHEX
      npx hardhat run scripts/pre-audit-scripts/configure-all-routes.js --network arbitrum pHEX
      npx hardhat run scripts/pre-audit-scripts/configure-all-routes.js --network optimism pHEX
      npx hardhat run scripts/pre-audit-scripts/configure-all-routes.js --network bnb pHEX
      npx hardhat run scripts/pre-audit-scripts/configure-all-routes.js --network avalanche pHEX
Ganadhishs-MacBook-Air:multi-chain-with-via ganadhish$ npx hardhat run scripts/pre-audit-scripts/configure-all-routes.js --network avalanche

🌐 CONFIGURE ALL ROUTES (Pre-Audit Contracts)
═══════════════════════════════════════════════════════
📍 Network: avalanche (Chain ID: 43114)
👤 Signer: 0x05F8cC8753D90d67DBB8c02118440b8283F941c9
🎯 Token: pHEX

📍 Current Contract: 0x762c2206681c4059df13acb9D2eF87fFA4Ee3FEc
   Type: synthetic
   MessageV3: 0x72E052Fa7f0788e668965d37B6c38C88703B7859
   Wrapped Gas Token: 0xB31f66AA3C1e785363F0875A1B74E27b85FD66c7

🌐 Remote Chains to Configure (6 total):
   - Chain 369 (PulseChain): 0xa489CeA254e8649F5b4BA1A4708ed348425606BE [collateral]
   - Chain 8453 (Base): 0xb97A43ae0563670D83f547638a5A89F2210D1a2c [synthetic]
   - Chain 42161 (Arbitrum): 0xf4e53aAe1D9f27851B03842007D0a8a023317cD2 [synthetic]
   - Chain 10 (Optimism): 0x74b40bAc12a493ab0D9c2daC6B1BCa7A705A6743 [synthetic]
   - Chain 56 (BNB Chain): 0x5f8Eea46Aaf2b936790495d25806B22c21f92242 [synthetic]
   - Chain 137 (Polygon): 0x9BD3C63e254a3fF7b757c9bad18F3c420e7825B2 [synthetic]

[STEP 1/2] Configuring MessageClient...
═══════════════════════════════════════════════════════
   MessageV3: 0x72E052Fa7f0788e668965d37B6c38C88703B7859
   Remote Chains: [369, 8453, 42161, 10, 56, 137]
   Confirmations: 15
   Using Nonce: 70
   TX: 0x332333f5696c526c3f1fa434f1ca7adc30821f29733b5d3ad93d5cf3f25788b3
   ✅ MessageClient configured!

[STEP 2/2] Configuring Remote Chains...
═══════════════════════════════════════════════════════

   🌐 Chain 369 (PulseChain):
      Remote Contract: 0xa489CeA254e8649F5b4BA1A4708ed348425606BE
      Wrapped Gas Token: 0xB31f66AA3C1e785363F0875A1B74E27b85FD66c7
      Protocol Fee: 0.12 USDC
      VIA Source Fee: 0.25 USDC
      VIA Dest Gas: 15000000000000000 wei
      Authorize Minter: true
      Using Nonce: 71
      TX: 0xa3312a82dc9d99df8499a166cf37f09bc72db57244dd3e529bdf595ecf68a6c8
      ✅ Configured!

   🌐 Chain 8453 (Base):
      Remote Contract: 0xb97A43ae0563670D83f547638a5A89F2210D1a2c
      Wrapped Gas Token: 0xB31f66AA3C1e785363F0875A1B74E27b85FD66c7
      Protocol Fee: 0.12 USDC
      VIA Source Fee: 0.25 USDC
      VIA Dest Gas: 15000000000000000 wei
      Authorize Minter: true
      Using Nonce: 72
      TX: 0x997b38b3caaec7dd5216780b59a54185119e683c2dbb917022e64c090997e3b6
      ✅ Configured!

   🌐 Chain 42161 (Arbitrum):
      Remote Contract: 0xf4e53aAe1D9f27851B03842007D0a8a023317cD2
      Wrapped Gas Token: 0xB31f66AA3C1e785363F0875A1B74E27b85FD66c7
      Protocol Fee: 0.12 USDC
      VIA Source Fee: 0.25 USDC
      VIA Dest Gas: 15000000000000000 wei
      Authorize Minter: true
      Using Nonce: 73
      TX: 0x54ca2070491c7fbbbdd1d2206aa08f992e9a893081f267e70c6066b734f2cfac
      ✅ Configured!

   🌐 Chain 10 (Optimism):
      Remote Contract: 0x74b40bAc12a493ab0D9c2daC6B1BCa7A705A6743
      Wrapped Gas Token: 0xB31f66AA3C1e785363F0875A1B74E27b85FD66c7
      Protocol Fee: 0.12 USDC
      VIA Source Fee: 0.25 USDC
      VIA Dest Gas: 15000000000000000 wei
      Authorize Minter: true
      Using Nonce: 74
      TX: 0x388caac5993be5c996876adf5f0f75907e196c924632669bc9687303256d1d8c
^C