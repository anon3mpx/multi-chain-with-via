TOKEN_SYMBOL=HOA npx hardhat run scripts/pre-audit-scripts/
update-all-gas-fees.js --network pulsechain

💰 UPDATE ALL GAS FEES (Pre-Audit Contracts)
═══════════════════════════════════════════════════════
📍 Network: pulsechain (Chain ID: 369)
👤 Signer: 0x05F8cC8753D90d67DBB8c02118440b8283F941c9
🎯 Token: HOA

📍 Current Contract: 0xc7dA00db476E18231079Fbf61D67930314EA5b26
   Type: collateral

⚙️  Fee Configuration (same for ALL destinations):
   Protocol Fee: 0.12 USDC (120000)
   VIA Source Fee: 0.25 USDC (250000)
   VIA Dest Gas: 80000000000000000000 wei

🌐 Updating Fees for 6 Remote Chains:
   - Chain 8453 (Base)
   - Chain 42161 (Arbitrum)
   - Chain 10 (Optimism)
   - Chain 56 (BNB Chain)
   - Chain 137 (Polygon)
   - Chain 43114 (Avalanche)

⏳ Updating fees...
═══════════════════════════════════════════════════════

   🌐 Chain 8453 (Base):
      Using Nonce: 711
      TX: 0xe609041def0525bee934d603371a8c0292119b51a70576635b805704c3cdb4da
      ✅ Fees updated!

   🌐 Chain 42161 (Arbitrum):
      Using Nonce: 712
      TX: 0x30290e4f2fdc186dae9f25e446c363f913df6986e690c6191b439d64ea0be74f
      ✅ Fees updated!

   🌐 Chain 10 (Optimism):
      Using Nonce: 713
      TX: 0x65023c9665e22591d6660b24656931b91133b4bd31e40bb7860e3d52c4ef1d87
      ✅ Fees updated!

   🌐 Chain 56 (BNB Chain):
      Using Nonce: 714
      TX: 0x6936c956a0ba84c2060afcb5a6ccb41a9d650fe54b0ca00729f60fda42368dc2
      ✅ Fees updated!

   🌐 Chain 137 (Polygon):
      Using Nonce: 715
      TX: 0xad9599ef75613134202852b7924dc01b6d2289bfce8c2ddf3b505f626519477b
      ✅ Fees updated!

   🌐 Chain 43114 (Avalanche):
      Using Nonce: 716
      TX: 0x1525e900485d3b9aaa0dcd608f96fb644897525bb2168e3e681b1f78caebfbb8
      ✅ Fees updated!

[VERIFICATION] Checking Updated Fees...
═══════════════════════════════════════════════════════
   Chain 8453: VIA Dest Gas = 80000000000000000000 ✅
   Chain 42161: VIA Dest Gas = 80000000000000000000 ✅
   Chain 10: VIA Dest Gas = 80000000000000000000 ✅
   Chain 56: VIA Dest Gas = 80000000000000000000 ✅
   Chain 137: VIA Dest Gas = 80000000000000000000 ✅
   Chain 43114: VIA Dest Gas = 80000000000000000000 ✅

✅ GAS FEE UPDATE COMPLETE FOR HOA ON PULSECHAIN!
═══════════════════════════════════════════════════════
   📋 Success: 6 | Failed: 0

   📋 Run on other chains:
      npx hardhat run scripts/pre-audit-scripts/update-all-gas-fees.js --network base HOA
      npx hardhat run scripts/pre-audit-scripts/update-all-gas-fees.js --network arbitrum HOA
      npx hardhat run scripts/pre-audit-scripts/update-all-gas-fees.js --network optimism HOA
      npx hardhat run scripts/pre-audit-scripts/update-all-gas-fees.js --network bnb HOA
      npx hardhat run scripts/pre-audit-scripts/update-all-gas-fees.js --network polygon HOA
      npx hardhat run scripts/pre-audit-scripts/update-all-gas-fees.js --network avalanche HOA
Ganadhishs-MacBook-Air:multi-chain-with-via ganadhish$ TOKEN_SYMBOL=HOA npx hardhat run scripts/pre-audit-scripts/update-all-gas-fees.js --network base

💰 UPDATE ALL GAS FEES (Pre-Audit Contracts)
═══════════════════════════════════════════════════════
📍 Network: base (Chain ID: 8453)
👤 Signer: 0x05F8cC8753D90d67DBB8c02118440b8283F941c9
🎯 Token: HOA

📍 Current Contract: 0x421b1c25b5Cd1766Aa17d01133a548C28D00b726
   Type: synthetic

⚙️  Fee Configuration (same for ALL destinations):
   Protocol Fee: 0.12 USDC (120000)
   VIA Source Fee: 0.25 USDC (250000)
   VIA Dest Gas: 30000000000000 wei

🌐 Updating Fees for 6 Remote Chains:
   - Chain 369 (PulseChain)
   - Chain 42161 (Arbitrum)
   - Chain 10 (Optimism)
   - Chain 56 (BNB Chain)
   - Chain 137 (Polygon)
   - Chain 43114 (Avalanche)

⏳ Updating fees...
═══════════════════════════════════════════════════════

   🌐 Chain 369 (PulseChain):
      Using Nonce: 480
      TX: 0xaf017af709c7dfa1e7897b614a846e2cc02fe9c1e3d1975a9b043e51d5947da8
      ✅ Fees updated!

   🌐 Chain 42161 (Arbitrum):
      Using Nonce: 481
      TX: 0x8a87f789d65ff9009c62c355c49111bf53d35d2565756dd3f1c5afa59c22f3a5
      ✅ Fees updated!

   🌐 Chain 10 (Optimism):
      Using Nonce: 482
      TX: 0x2c63ffb276949e01af843791ea3e5a7331cd2736ae93bcbfb058e5b684feee62
      ✅ Fees updated!

   🌐 Chain 56 (BNB Chain):
      Using Nonce: 483
      TX: 0x9436f295d8ad1188537ec5ade6f1fff7d5b439b2eebdc654d89f05bfb7cb41db
      ✅ Fees updated!

   🌐 Chain 137 (Polygon):
      Using Nonce: 484
      TX: 0xa7c4f02ccbe62b636d2207d27c5f3444b6196e7e568a61fe608f0dc22dd84890
      ✅ Fees updated!

   🌐 Chain 43114 (Avalanche):
      Using Nonce: 485
      TX: 0x2b04613396d73c956be36cb999d29096bec2f87a5f7e9d4ddd8c24d40c650da3
      ✅ Fees updated!

[VERIFICATION] Checking Updated Fees...
═══════════════════════════════════════════════════════
   Chain 369: VIA Dest Gas = 30000000000000 ✅
   Chain 42161: VIA Dest Gas = 30000000000000 ✅
   Chain 10: VIA Dest Gas = 30000000000000 ✅
   Chain 56: VIA Dest Gas = 30000000000000 ✅
   Chain 137: VIA Dest Gas = 30000000000000 ✅
   Chain 43114: VIA Dest Gas = 30000000000000 ✅

✅ GAS FEE UPDATE COMPLETE FOR HOA ON BASE!
═══════════════════════════════════════════════════════
   📋 Success: 6 | Failed: 0

   📋 Run on other chains:
      npx hardhat run scripts/pre-audit-scripts/update-all-gas-fees.js --network pulsechain HOA
      npx hardhat run scripts/pre-audit-scripts/update-all-gas-fees.js --network arbitrum HOA
      npx hardhat run scripts/pre-audit-scripts/update-all-gas-fees.js --network optimism HOA
      npx hardhat run scripts/pre-audit-scripts/update-all-gas-fees.js --network bnb HOA
      npx hardhat run scripts/pre-audit-scripts/update-all-gas-fees.js --network polygon HOA
      npx hardhat run scripts/pre-audit-scripts/update-all-gas-fees.js --network avalanche HOA
Ganadhishs-MacBook-Air:multi-chain-with-via ganadhish$ TOKEN_SYMBOL=HOA npx hardhat run scripts/pre-audit-scripts/update-all-gas-fees.js --network optimism

💰 UPDATE ALL GAS FEES (Pre-Audit Contracts)
═══════════════════════════════════════════════════════
📍 Network: optimism (Chain ID: 10)
👤 Signer: 0x05F8cC8753D90d67DBB8c02118440b8283F941c9
🎯 Token: HOA

📍 Current Contract: 0x0AD73370Ca2e1b7667B568d20f25eF0864227bFC
   Type: synthetic

⚙️  Fee Configuration (same for ALL destinations):
   Protocol Fee: 0.12 USDC (120000)
   VIA Source Fee: 0.25 USDC (250000)
   VIA Dest Gas: 30000000000000 wei

🌐 Updating Fees for 6 Remote Chains:
   - Chain 369 (PulseChain)
   - Chain 8453 (Base)
   - Chain 42161 (Arbitrum)
   - Chain 56 (BNB Chain)
   - Chain 137 (Polygon)
   - Chain 43114 (Avalanche)

⏳ Updating fees...
═══════════════════════════════════════════════════════

   🌐 Chain 369 (PulseChain):
      Using Nonce: 91
      TX: 0x81afc5d4be2580ac73a0873f800be7fe2db3a92ede5f414c91f1b792fe9e3645
      ✅ Fees updated!

   🌐 Chain 8453 (Base):
      Using Nonce: 92
      TX: 0x99bb34fd89fe577677e0870e979ab202d03422d0e2bcf9e83e5a3a3188a30d98
      ✅ Fees updated!

   🌐 Chain 42161 (Arbitrum):
      Using Nonce: 93
      TX: 0x0015dde030548dd50ee016d723d65ed7cac0bf242ae0d63f41657f179eff008f
      ✅ Fees updated!

   🌐 Chain 56 (BNB Chain):
      Using Nonce: 94
      TX: 0x173210a884e938913f6a57514f560854982cc643e7e46361e0fdbe2e8d8f8f40
      ✅ Fees updated!

   🌐 Chain 137 (Polygon):
      Using Nonce: 95
      TX: 0x2f68c61f806b5355e1bb36ea64d7276ba9353143612599d1b0e129e7e2516c88
      ✅ Fees updated!

   🌐 Chain 43114 (Avalanche):
      Using Nonce: 96
      TX: 0x0e764aa1638a96105e85688b60db710efd93b23f8845277e107610207e162efe
      ✅ Fees updated!

[VERIFICATION] Checking Updated Fees...
═══════════════════════════════════════════════════════
   Chain 369: VIA Dest Gas = 30000000000000 ✅
   Chain 8453: VIA Dest Gas = 30000000000000 ✅
   Chain 42161: VIA Dest Gas = 30000000000000 ✅
   Chain 56: VIA Dest Gas = 30000000000000 ✅
   Chain 137: VIA Dest Gas = 30000000000000 ✅
   Chain 43114: VIA Dest Gas = 30000000000000 ✅

✅ GAS FEE UPDATE COMPLETE FOR HOA ON OPTIMISM!
═══════════════════════════════════════════════════════
   📋 Success: 6 | Failed: 0

   📋 Run on other chains:
      npx hardhat run scripts/pre-audit-scripts/update-all-gas-fees.js --network pulsechain HOA
      npx hardhat run scripts/pre-audit-scripts/update-all-gas-fees.js --network base HOA
      npx hardhat run scripts/pre-audit-scripts/update-all-gas-fees.js --network arbitrum HOA
      npx hardhat run scripts/pre-audit-scripts/update-all-gas-fees.js --network bnb HOA
      npx hardhat run scripts/pre-audit-scripts/update-all-gas-fees.js --network polygon HOA
      npx hardhat run scripts/pre-audit-scripts/update-all-gas-fees.js --network avalanche HOA
Ganadhishs-MacBook-Air:multi-chain-with-via ganadhish$ TOKEN_SYMBOL=HOA npx hardhat run scripts/pre-audit-scripts/update-all-gas-fees.js --network bnb

💰 UPDATE ALL GAS FEES (Pre-Audit Contracts)
═══════════════════════════════════════════════════════
📍 Network: bnb (Chain ID: 56)
👤 Signer: 0x05F8cC8753D90d67DBB8c02118440b8283F941c9
🎯 Token: HOA

📍 Current Contract: 0xc1Bb27E7AE8af9164Cb6B5D3A465478415EdEbB7
   Type: synthetic

⚙️  Fee Configuration (same for ALL destinations):
   Protocol Fee: 0.12 USDC (120000)
   VIA Source Fee: 0.25 USDC (250000)
   VIA Dest Gas: 1500000000000000 wei

🌐 Updating Fees for 6 Remote Chains:
   - Chain 369 (PulseChain)
   - Chain 8453 (Base)
   - Chain 42161 (Arbitrum)
   - Chain 10 (Optimism)
   - Chain 137 (Polygon)
   - Chain 43114 (Avalanche)

⏳ Updating fees...
═══════════════════════════════════════════════════════

   🌐 Chain 369 (PulseChain):
      Using Nonce: 37
      TX: 0xff9859fea39ab135e53d9aac588c115183432d6f0ce0837d45add8e67e67efaf
      ✅ Fees updated!

   🌐 Chain 8453 (Base):
      Using Nonce: 38
      TX: 0x456627a4b3d298199600ee1e6fa1da0a37a6d237793c82493cb6cba3e5fc83c6
      ✅ Fees updated!

   🌐 Chain 42161 (Arbitrum):
      Using Nonce: 39
      TX: 0x8122754dcb9f8e3799bd0203f05589b3fa56052bca11b312c5b18f25b4f1dada
      ✅ Fees updated!

   🌐 Chain 10 (Optimism):
      Using Nonce: 40
      TX: 0x2479ffd87395b75ba4d6fd5d2f863dc8475cbe84c9fc606b71d3ed490df313b1
      ✅ Fees updated!

   🌐 Chain 137 (Polygon):
      Using Nonce: 41
      TX: 0x7556e7c5b14fa60f023c3e1d93f71766275c8e32f5d441400aa3cebe1cd82038
      ✅ Fees updated!

   🌐 Chain 43114 (Avalanche):
      Using Nonce: 42
      TX: 0x131242f929ceb0ee94ca7495cc819523e70e180ef346f35539f466d66115fefa
      ✅ Fees updated!

[VERIFICATION] Checking Updated Fees...
═══════════════════════════════════════════════════════
   Chain 369: VIA Dest Gas = 1500000000000000 ✅
   Chain 8453: VIA Dest Gas = 1500000000000000 ✅
   Chain 42161: VIA Dest Gas = 1500000000000000 ✅
   Chain 10: VIA Dest Gas = 1500000000000000 ✅
   Chain 137: VIA Dest Gas = 1500000000000000 ✅
   Chain 43114: VIA Dest Gas = 1500000000000000 ✅

✅ GAS FEE UPDATE COMPLETE FOR HOA ON BNB!
═══════════════════════════════════════════════════════
   📋 Success: 6 | Failed: 0

   📋 Run on other chains:
      npx hardhat run scripts/pre-audit-scripts/update-all-gas-fees.js --network pulsechain HOA
      npx hardhat run scripts/pre-audit-scripts/update-all-gas-fees.js --network base HOA
      npx hardhat run scripts/pre-audit-scripts/update-all-gas-fees.js --network arbitrum HOA
      npx hardhat run scripts/pre-audit-scripts/update-all-gas-fees.js --network optimism HOA
      npx hardhat run scripts/pre-audit-scripts/update-all-gas-fees.js --network polygon HOA
      npx hardhat run scripts/pre-audit-scripts/update-all-gas-fees.js --network avalanche HOA
Ganadhishs-MacBook-Air:multi-chain-with-via ganadhish$ TOKEN_SYMBOL=HOA npx hardhat run scripts/pre-audit-scripts/update-all-gas-fees.js --network polygon

💰 UPDATE ALL GAS FEES (Pre-Audit Contracts)
═══════════════════════════════════════════════════════
📍 Network: polygon (Chain ID: 137)
👤 Signer: 0x05F8cC8753D90d67DBB8c02118440b8283F941c9
🎯 Token: HOA

📍 Current Contract: 0x6B7c81207240a38e03E5e9B138C53c4762515cCD
   Type: synthetic

⚙️  Fee Configuration (same for ALL destinations):
   Protocol Fee: 0.12 USDC (120000)
   VIA Source Fee: 0.25 USDC (250000)
   VIA Dest Gas: 30000000000000000 wei

🌐 Updating Fees for 6 Remote Chains:
   - Chain 369 (PulseChain)
   - Chain 8453 (Base)
   - Chain 42161 (Arbitrum)
   - Chain 10 (Optimism)
   - Chain 56 (BNB Chain)
   - Chain 43114 (Avalanche)

⏳ Updating fees...
═══════════════════════════════════════════════════════

   🌐 Chain 369 (PulseChain):
      Using Nonce: 81
      TX: 0x53def9ace1396131a791bc6faecc93b970f556e9e9f34a6365adcedad3913185
      ✅ Fees updated!

   🌐 Chain 8453 (Base):
      Using Nonce: 82
      TX: 0x6691c284103b09ee0fe146d31a2e1982041af4737cfb1c85d2c35389e5bd5ac1
      ✅ Fees updated!

   🌐 Chain 42161 (Arbitrum):
      Using Nonce: 83
      TX: 0x2a1483e9555104e88ae62be3d5c1937f4b232f587a71f9f6802b8f9b37fffa0b
      ✅ Fees updated!

   🌐 Chain 10 (Optimism):
      Using Nonce: 84
      TX: 0xebe8efb8921599d8b9ec5887f35a3e1e4d1d3124854b07dbac68091db9f96515
      ✅ Fees updated!

   🌐 Chain 56 (BNB Chain):
      Using Nonce: 85
      TX: 0x47ff2dae8936c5dcebb162eea250997aba825f830de5bb9cedd5d5d4c6a6899a
      ✅ Fees updated!

   🌐 Chain 43114 (Avalanche):
      Using Nonce: 86
      TX: 0x5a559c1b3acc2b1adaca22c2f75a6fd9fce83787e0c903a95b1edd98cbc7d23d
      ✅ Fees updated!

[VERIFICATION] Checking Updated Fees...
═══════════════════════════════════════════════════════
   Chain 369: VIA Dest Gas = 30000000000000000 ✅
   Chain 8453: VIA Dest Gas = 30000000000000000 ✅
   Chain 42161: VIA Dest Gas = 30000000000000000 ✅
   Chain 10: VIA Dest Gas = 30000000000000000 ✅
   Chain 56: VIA Dest Gas = 30000000000000000 ✅
   Chain 43114: VIA Dest Gas = 30000000000000000 ✅

✅ GAS FEE UPDATE COMPLETE FOR HOA ON POLYGON!
═══════════════════════════════════════════════════════
   📋 Success: 6 | Failed: 0

   📋 Run on other chains:
      npx hardhat run scripts/pre-audit-scripts/update-all-gas-fees.js --network pulsechain HOA
      npx hardhat run scripts/pre-audit-scripts/update-all-gas-fees.js --network base HOA
      npx hardhat run scripts/pre-audit-scripts/update-all-gas-fees.js --network arbitrum HOA
      npx hardhat run scripts/pre-audit-scripts/update-all-gas-fees.js --network optimism HOA
      npx hardhat run scripts/pre-audit-scripts/update-all-gas-fees.js --network bnb HOA
      npx hardhat run scripts/pre-audit-scripts/update-all-gas-fees.js --network avalanche HOA
Ganadhishs-MacBook-Air:multi-chain-with-via ganadhish$ TOKEN_SYMBOL=HOA npx hardhat run scripts/pre-audit-scripts/update-all-gas-fees.js --network avalanche

💰 UPDATE ALL GAS FEES (Pre-Audit Contracts)
═══════════════════════════════════════════════════════
📍 Network: avalanche (Chain ID: 43114)
👤 Signer: 0x05F8cC8753D90d67DBB8c02118440b8283F941c9
🎯 Token: HOA

📍 Current Contract: 0xc14441CBD763FBad2Db823CCa77AFAdeCbcdd0c4
   Type: synthetic

⚙️  Fee Configuration (same for ALL destinations):
   Protocol Fee: 0.12 USDC (120000)
   VIA Source Fee: 0.25 USDC (250000)
   VIA Dest Gas: 15000000000000000 wei

🌐 Updating Fees for 6 Remote Chains:
   - Chain 369 (PulseChain)
   - Chain 8453 (Base)
   - Chain 42161 (Arbitrum)
   - Chain 10 (Optimism)
   - Chain 56 (BNB Chain)
   - Chain 137 (Polygon)

⏳ Updating fees...
═══════════════════════════════════════════════════════

   🌐 Chain 369 (PulseChain):
      Using Nonce: 34
      TX: 0xc26c8b83d85642f8f9d6b96302786f7f68d04d536289d36c237beabff3b2741f
      ✅ Fees updated!

   🌐 Chain 8453 (Base):
      Using Nonce: 35
      TX: 0xb0dc33631b31e5223a9f486d12dd319f764f717c96fe7b7918ed1c25268987db
      ✅ Fees updated!

   🌐 Chain 42161 (Arbitrum):
      Using Nonce: 36
      TX: 0xde1d292b1ea824c752d57a43efc9d9192505c2dd970e94dc58fdae0b8a6c5fcc
      ✅ Fees updated!

   🌐 Chain 10 (Optimism):
      Using Nonce: 37
      TX: 0x86b94557badc6c71208cf0fb18bfb7623d7bbf5d39c398b710ab4fb0315682fc
      ✅ Fees updated!

   🌐 Chain 56 (BNB Chain):
      Using Nonce: 38
      TX: 0xe2b601eda316ac23b7284827b0bced3a775a8711a068a3c9d8133f641e2a1760
      ✅ Fees updated!

   🌐 Chain 137 (Polygon):
      Using Nonce: 39
      TX: 0x86b334a1f01974726d12a798ed818b37c10583b4164cdfaf6e8335510bdc5ea3
      ✅ Fees updated!

[VERIFICATION] Checking Updated Fees...
═══════════════════════════════════════════════════════
   Chain 369: VIA Dest Gas = 15000000000000000 ✅
   Chain 8453: VIA Dest Gas = 15000000000000000 ✅
   Chain 42161: VIA Dest Gas = 15000000000000000 ✅
   Chain 10: VIA Dest Gas = 15000000000000000 ✅
   Chain 56: VIA Dest Gas = 15000000000000000 ✅
   Chain 137: VIA Dest Gas = 15000000000000000 ✅

✅ GAS FEE UPDATE COMPLETE FOR HOA ON AVALANCHE!
═══════════════════════════════════════════════════════
   📋 Success: 6 | Failed: 0

   📋 Run on other chains:
      npx hardhat run scripts/pre-audit-scripts/update-all-gas-fees.js --network pulsechain HOA
      npx hardhat run scripts/pre-audit-scripts/update-all-gas-fees.js --network base HOA
      npx hardhat run scripts/pre-audit-scripts/update-all-gas-fees.js --network arbitrum HOA
      npx hardhat run scripts/pre-audit-scripts/update-all-gas-fees.js --network optimism HOA
      npx hardhat run scripts/pre-audit-scripts/update-all-gas-fees.js --network bnb HOA
      npx hardhat run scripts/pre-audit-scripts/update-all-gas-fees.js --network polygon HOA
Ganadhishs-MacBook-Air:multi-chain-with-via ganadhish$ TOKEN_SYMBOL=HOA npx hardhat run scripts/pre-audit-scripts/update-all-gas-fees.js --network arbitrum

💰 UPDATE ALL GAS FEES (Pre-Audit Contracts)
═══════════════════════════════════════════════════════
📍 Network: arbitrum (Chain ID: 42161)
👤 Signer: 0x05F8cC8753D90d67DBB8c02118440b8283F941c9
🎯 Token: HOA

📍 Current Contract: 0x1F031F7A2652fD6f10F1FB37BEfaac8A69039f08
   Type: synthetic

⚙️  Fee Configuration (same for ALL destinations):
   Protocol Fee: 0.12 USDC (120000)
   VIA Source Fee: 0.25 USDC (250000)
   VIA Dest Gas: 30000000000000 wei

🌐 Updating Fees for 6 Remote Chains:
   - Chain 369 (PulseChain)
   - Chain 8453 (Base)
   - Chain 10 (Optimism)
   - Chain 56 (BNB Chain)
   - Chain 137 (Polygon)
   - Chain 43114 (Avalanche)

⏳ Updating fees...
═══════════════════════════════════════════════════════

   🌐 Chain 369 (PulseChain):
      Using Nonce: 134
      TX: 0xba8f4c3793c33d36427ed3ba26d58b46894e0fc825edceadca0a33ed626486a0
      ✅ Fees updated!

   🌐 Chain 8453 (Base):
      Using Nonce: 135
      TX: 0xb3767aa3cfecb62c57a46e62b0da182efd9aa3a1464d75bfca4a86424551deb5
      ✅ Fees updated!

   🌐 Chain 10 (Optimism):
      Using Nonce: 136
      TX: 0x6c88d6773e6087d91fa67bdf8bce7906c9f3178e0be73096b10c98594bf86981
      ✅ Fees updated!

   🌐 Chain 56 (BNB Chain):
      Using Nonce: 137
      TX: 0x942a6a5edbc10df42db5cae177120aa87ba90b1ff88c134ea1ca6c954492bd8c
      ✅ Fees updated!

   🌐 Chain 137 (Polygon):
      Using Nonce: 138
      TX: 0x7601b8accd6b99aca2cbd54e2f8454a9af370c4869cbc1530514f2c3feb32826
      ✅ Fees updated!

   🌐 Chain 43114 (Avalanche):
      Using Nonce: 139
      TX: 0xb64db93da2acfaf2ed585a4d99156219765d6b1e75f77ae9933a502ea09ca939
      ✅ Fees updated!

[VERIFICATION] Checking Updated Fees...
═══════════════════════════════════════════════════════
   Chain 369: VIA Dest Gas = 30000000000000 ✅
   Chain 8453: VIA Dest Gas = 30000000000000 ✅
   Chain 10: VIA Dest Gas = 30000000000000 ✅
   Chain 56: VIA Dest Gas = 30000000000000 ✅
   Chain 137: VIA Dest Gas = 30000000000000 ✅
   Chain 43114: VIA Dest Gas = 30000000000000 ✅

✅ GAS FEE UPDATE COMPLETE FOR HOA ON ARBITRUM!
═══════════════════════════════════════════════════════
   📋 Success: 6 | Failed: 0

   📋 Run on other chains:
      npx hardhat run scripts/pre-audit-scripts/update-all-gas-fees.js --network pulsechain HOA
      npx hardhat run scripts/pre-audit-scripts/update-all-gas-fees.js --network base HOA
      npx hardhat run scripts/pre-audit-scripts/update-all-gas-fees.js --network optimism HOA
      npx hardhat run scripts/pre-audit-scripts/update-all-gas-fees.js --network bnb HOA
      npx hardhat run scripts/pre-audit-scripts/update-all-gas-fees.js --network polygon HOA
      npx hardhat run scripts/pre-audit-scripts/update-all-gas-fees.js --network avalanche HOA

---------------------------------------------------
---------------------------------------------------

TOKEN_SYMBOL=COCK npx hardhat run scripts/pre-audit-scripts/update-all-gas-fees.js --network arbitrum

💰 UPDATE ALL GAS FEES (Pre-Audit Contracts)
═══════════════════════════════════════════════════════
📍 Network: arbitrum (Chain ID: 42161)
👤 Signer: 0x05F8cC8753D90d67DBB8c02118440b8283F941c9
🎯 Token: COCK

📍 Current Contract: 0x33dD4fEE8555263178a7ffD8bf7522BA2E6C33a3
   Type: synthetic

⚙️  Fee Configuration (same for ALL destinations):
   Protocol Fee: 0.12 USDC (120000)
   VIA Source Fee: 0.25 USDC (250000)
   VIA Dest Gas: 30000000000000 wei

🌐 Updating Fees for 6 Remote Chains:
   - Chain 369 (PulseChain)
   - Chain 8453 (Base)
   - Chain 10 (Optimism)
   - Chain 56 (BNB Chain)
   - Chain 137 (Polygon)
   - Chain 43114 (Avalanche)

⏳ Updating fees...
═══════════════════════════════════════════════════════

   🌐 Chain 369 (PulseChain):
      Using Nonce: 140
      TX: 0x6fbc6332116b4144fc1a473cc0c0c4e4d19a77c8d8c02dc2a138912c0bb75095
      ✅ Fees updated!

   🌐 Chain 8453 (Base):
      Using Nonce: 141
      TX: 0x7031770a2a14f76405a9ea0ebaaab3487ee9d4ae6c0bb719c28464e672eca34a
      ✅ Fees updated!

   🌐 Chain 10 (Optimism):
      Using Nonce: 142
      TX: 0xbda09dab8cfb4ee2fe6dc1ec76e1d47e856f405b9e2f7089e3878a4b5aac507a
      ✅ Fees updated!

   🌐 Chain 56 (BNB Chain):
      Using Nonce: 143
      TX: 0xf68e0834de3642dfaf42c536e4c1c964814af1a5dea6c29c9232f1a36ab27e94
      ✅ Fees updated!

   🌐 Chain 137 (Polygon):
      Using Nonce: 144
      TX: 0x036ab04a750d40b17fb5bad5177ea20b9efc09d593851902ca2abacd5005e800
      ✅ Fees updated!

   🌐 Chain 43114 (Avalanche):
      Using Nonce: 145
      TX: 0x59cb0698d46c6fadc0312643296a6d285f1b1062e2804832845a8b760c32585b
      ✅ Fees updated!

[VERIFICATION] Checking Updated Fees...
═══════════════════════════════════════════════════════
   Chain 369: VIA Dest Gas = 30000000000000 ✅
   Chain 8453: VIA Dest Gas = 30000000000000 ✅
   Chain 10: VIA Dest Gas = 30000000000000 ✅
   Chain 56: VIA Dest Gas = 30000000000000 ✅
   Chain 137: VIA Dest Gas = 30000000000000 ✅
   Chain 43114: VIA Dest Gas = 30000000000000 ✅

✅ GAS FEE UPDATE COMPLETE FOR COCK ON ARBITRUM!
═══════════════════════════════════════════════════════
   📋 Success: 6 | Failed: 0

   📋 Run on other chains:
      npx hardhat run scripts/pre-audit-scripts/update-all-gas-fees.js --network pulsechain COCK
      npx hardhat run scripts/pre-audit-scripts/update-all-gas-fees.js --network base COCK
      npx hardhat run scripts/pre-audit-scripts/update-all-gas-fees.js --network optimism COCK
      npx hardhat run scripts/pre-audit-scripts/update-all-gas-fees.js --network bnb COCK
      npx hardhat run scripts/pre-audit-scripts/update-all-gas-fees.js --network polygon COCK
      npx hardhat run scripts/pre-audit-scripts/update-all-gas-fees.js --network avalanche COCK
Ganadhishs-MacBook-Air:multi-chain-with-via ganadhish$ TOKEN_SYMBOL=COCK npx hardhat run scripts/pre-audit-scripts/update-all-gas-fees.js --network optimism

💰 UPDATE ALL GAS FEES (Pre-Audit Contracts)
═══════════════════════════════════════════════════════
📍 Network: optimism (Chain ID: 10)
👤 Signer: 0x05F8cC8753D90d67DBB8c02118440b8283F941c9
🎯 Token: COCK

📍 Current Contract: 0xb50Dd86bB594C3d7FBA44045F4a90f8eb12B5935
   Type: synthetic

⚙️  Fee Configuration (same for ALL destinations):
   Protocol Fee: 0.12 USDC (120000)
   VIA Source Fee: 0.25 USDC (250000)
   VIA Dest Gas: 30000000000000 wei

🌐 Updating Fees for 6 Remote Chains:
   - Chain 369 (PulseChain)
   - Chain 8453 (Base)
   - Chain 42161 (Arbitrum)
   - Chain 56 (BNB Chain)
   - Chain 137 (Polygon)
   - Chain 43114 (Avalanche)

⏳ Updating fees...
═══════════════════════════════════════════════════════

   🌐 Chain 369 (PulseChain):
      Using Nonce: 97
      TX: 0xdc9118063be5a0d8217bda49efd654b8987382b0acd98d5c84ec4d12fcf74395
      ✅ Fees updated!

   🌐 Chain 8453 (Base):
      Using Nonce: 98
      TX: 0x2f1d2644cda72d60d66c021b316559092502a70b6be2b793ec32f7e716c64628
      ✅ Fees updated!

   🌐 Chain 42161 (Arbitrum):
      Using Nonce: 99
      TX: 0x4ed569fa7d98bc0e5aa519737733972f7c6e0c259ad4865781f09717aed2cf8f
      ✅ Fees updated!

   🌐 Chain 56 (BNB Chain):
      Using Nonce: 100
      TX: 0xeb1dd20bc8007ce919eb1ba3f9945533b8bc98c7e7020b9a71c56c8f4f95c58a
      ✅ Fees updated!

   🌐 Chain 137 (Polygon):
      Using Nonce: 101
      TX: 0xfb5856f352ac76c6c3506a16cc6d28600665e41e4de75276eccc345bb16cfa13
      ✅ Fees updated!

   🌐 Chain 43114 (Avalanche):
      Using Nonce: 102
      TX: 0x4d19d8d7c76d06afb32a78f439d4a6a2138e63025a28eab34e7328d55468d620
      ✅ Fees updated!

[VERIFICATION] Checking Updated Fees...
═══════════════════════════════════════════════════════
   Chain 369: VIA Dest Gas = 30000000000000 ✅
   Chain 8453: VIA Dest Gas = 30000000000000 ✅
   Chain 42161: VIA Dest Gas = 30000000000000 ✅
   Chain 56: VIA Dest Gas = 30000000000000 ✅
   Chain 137: VIA Dest Gas = 30000000000000 ✅
   Chain 43114: VIA Dest Gas = 30000000000000 ✅

✅ GAS FEE UPDATE COMPLETE FOR COCK ON OPTIMISM!
═══════════════════════════════════════════════════════
   📋 Success: 6 | Failed: 0

   📋 Run on other chains:
      npx hardhat run scripts/pre-audit-scripts/update-all-gas-fees.js --network pulsechain COCK
      npx hardhat run scripts/pre-audit-scripts/update-all-gas-fees.js --network base COCK
      npx hardhat run scripts/pre-audit-scripts/update-all-gas-fees.js --network arbitrum COCK
      npx hardhat run scripts/pre-audit-scripts/update-all-gas-fees.js --network bnb COCK
      npx hardhat run scripts/pre-audit-scripts/update-all-gas-fees.js --network polygon COCK
      npx hardhat run scripts/pre-audit-scripts/update-all-gas-fees.js --network avalanche COCK
Ganadhishs-MacBook-Air:multi-chain-with-via ganadhish$ TOKEN_SYMBOL=COCK npx hardhat run scripts/pre-audit-scripts/update-all-gas-fees.js --network bnb

💰 UPDATE ALL GAS FEES (Pre-Audit Contracts)
═══════════════════════════════════════════════════════
📍 Network: bnb (Chain ID: 56)
👤 Signer: 0x05F8cC8753D90d67DBB8c02118440b8283F941c9
🎯 Token: COCK

📍 Current Contract: 0xce032ac88ad11E6f8374B3760F5a98a77c6584f0
   Type: synthetic

⚙️  Fee Configuration (same for ALL destinations):
   Protocol Fee: 0.12 USDC (120000)
   VIA Source Fee: 0.25 USDC (250000)
   VIA Dest Gas: 1500000000000000 wei

🌐 Updating Fees for 6 Remote Chains:
   - Chain 369 (PulseChain)
   - Chain 8453 (Base)
   - Chain 42161 (Arbitrum)
   - Chain 10 (Optimism)
   - Chain 137 (Polygon)
   - Chain 43114 (Avalanche)

⏳ Updating fees...
═══════════════════════════════════════════════════════

   🌐 Chain 369 (PulseChain):
      Using Nonce: 43
      TX: 0x311e165e92937e00eccbc5a6c63824582300df3120a2f094b351fda5e274c3e8
      ✅ Fees updated!

   🌐 Chain 8453 (Base):
      Using Nonce: 44
      TX: 0x6bdf8a43ef0d59fceefe08706d089a0a952ce27c2427ae15c412d22ac1ef5622
      ✅ Fees updated!

   🌐 Chain 42161 (Arbitrum):
      Using Nonce: 45
      TX: 0xe49cf63689c42ca1dad04121fe2af5893f8162b1ad8c7bd5f51741def0524935
      ✅ Fees updated!

   🌐 Chain 10 (Optimism):
      Using Nonce: 46
      TX: 0xcb18f8dd6c050561ca9256f2965ecd34bd53f3157752f140b011ee9d0f3d2323
      ✅ Fees updated!

   🌐 Chain 137 (Polygon):
      Using Nonce: 47
      TX: 0x12bc7e3059cb3a7784569e594678d8a605a4a419f8cf2100761191f97464e7d9
      ✅ Fees updated!

   🌐 Chain 43114 (Avalanche):
      Using Nonce: 48
      TX: 0xdb43dbd65e89b086ea9153fe243131ebbfebbfd4c213b453f7be9149783e0a73
      ✅ Fees updated!

[VERIFICATION] Checking Updated Fees...
═══════════════════════════════════════════════════════
   Chain 369: VIA Dest Gas = 1500000000000000 ✅
   Chain 8453: VIA Dest Gas = 1500000000000000 ✅
   Chain 42161: VIA Dest Gas = 1500000000000000 ✅
   Chain 10: VIA Dest Gas = 1500000000000000 ✅
   Chain 137: VIA Dest Gas = 1500000000000000 ✅
   Chain 43114: VIA Dest Gas = 1500000000000000 ✅

✅ GAS FEE UPDATE COMPLETE FOR COCK ON BNB!
═══════════════════════════════════════════════════════
   📋 Success: 6 | Failed: 0

   📋 Run on other chains:
      npx hardhat run scripts/pre-audit-scripts/update-all-gas-fees.js --network pulsechain COCK
      npx hardhat run scripts/pre-audit-scripts/update-all-gas-fees.js --network base COCK
      npx hardhat run scripts/pre-audit-scripts/update-all-gas-fees.js --network arbitrum COCK
      npx hardhat run scripts/pre-audit-scripts/update-all-gas-fees.js --network optimism COCK
      npx hardhat run scripts/pre-audit-scripts/update-all-gas-fees.js --network polygon COCK
      npx hardhat run scripts/pre-audit-scripts/update-all-gas-fees.js --network avalanche COCK
Ganadhishs-MacBook-Air:multi-chain-with-via ganadhish$ TOKEN_SYMBOL=COCK npx hardhat run scripts/pre-audit-scripts/update-all-gas-fees.js --network polygon

💰 UPDATE ALL GAS FEES (Pre-Audit Contracts)
═══════════════════════════════════════════════════════
📍 Network: polygon (Chain ID: 137)
👤 Signer: 0x05F8cC8753D90d67DBB8c02118440b8283F941c9
🎯 Token: COCK

📍 Current Contract: 0xd7dDc57fC9eCFd0fb9E0773Eb80276fe62B0Fc93
   Type: synthetic

⚙️  Fee Configuration (same for ALL destinations):
   Protocol Fee: 0.12 USDC (120000)
   VIA Source Fee: 0.25 USDC (250000)
   VIA Dest Gas: 30000000000000000 wei

🌐 Updating Fees for 6 Remote Chains:
   - Chain 369 (PulseChain)
   - Chain 8453 (Base)
   - Chain 42161 (Arbitrum)
   - Chain 10 (Optimism)
   - Chain 56 (BNB Chain)
   - Chain 43114 (Avalanche)

⏳ Updating fees...
═══════════════════════════════════════════════════════

   🌐 Chain 369 (PulseChain):
      Using Nonce: 87
      TX: 0x00dbec1eb499e5c7046f44edce0558ead0a74d3c7126bc62c7f4572449f8e55a
      ✅ Fees updated!

   🌐 Chain 8453 (Base):
      Using Nonce: 88
      TX: 0x267e9efd24ba952614ee28f2f7d382d8bafaa5fc133040c1ad9b71c79963ae8b
      ✅ Fees updated!

   🌐 Chain 42161 (Arbitrum):
      Using Nonce: 89
      TX: 0x963f39b8d6cb21b51b3ad18394c8aef3d2700d89a3bdd11f7d8ff6c9401d0036
      ✅ Fees updated!

   🌐 Chain 10 (Optimism):
      Using Nonce: 90
      TX: 0xf60765629495033fb8fa11f37fcd3c5d764c747155fbcf543a68af862af1d8a0
      ✅ Fees updated!

   🌐 Chain 56 (BNB Chain):
      Using Nonce: 91
      TX: 0x2968f6b6755bd518f8d43f74f1dd8e9e42d07f1aaa70b7fe499828825ce53581
      ✅ Fees updated!

   🌐 Chain 43114 (Avalanche):
      Using Nonce: 92
      TX: 0x7d1237779f1dbe465943d0c7261630f7887e4570f3d4111ebb1a56e124f9f37c
      ✅ Fees updated!

[VERIFICATION] Checking Updated Fees...
═══════════════════════════════════════════════════════
   Chain 369: VIA Dest Gas = 30000000000000000 ✅
   Chain 8453: VIA Dest Gas = 30000000000000000 ✅
   Chain 42161: VIA Dest Gas = 30000000000000000 ✅
   Chain 10: VIA Dest Gas = 30000000000000000 ✅
   Chain 56: VIA Dest Gas = 30000000000000000 ✅
   Chain 43114: VIA Dest Gas = 30000000000000000 ✅

✅ GAS FEE UPDATE COMPLETE FOR COCK ON POLYGON!
═══════════════════════════════════════════════════════
   📋 Success: 6 | Failed: 0

   📋 Run on other chains:
      npx hardhat run scripts/pre-audit-scripts/update-all-gas-fees.js --network pulsechain COCK
      npx hardhat run scripts/pre-audit-scripts/update-all-gas-fees.js --network base COCK
      npx hardhat run scripts/pre-audit-scripts/update-all-gas-fees.js --network arbitrum COCK
      npx hardhat run scripts/pre-audit-scripts/update-all-gas-fees.js --network optimism COCK
      npx hardhat run scripts/pre-audit-scripts/update-all-gas-fees.js --network bnb COCK
      npx hardhat run scripts/pre-audit-scripts/update-all-gas-fees.js --network avalanche COCK
Ganadhishs-MacBook-Air:multi-chain-with-via ganadhish$ TOKEN_SYMBOL=COCK npx hardhat run scripts/pre-audit-scripts/update-all-gas-fees.js --network avalanche

💰 UPDATE ALL GAS FEES (Pre-Audit Contracts)
═══════════════════════════════════════════════════════
📍 Network: avalanche (Chain ID: 43114)
👤 Signer: 0x05F8cC8753D90d67DBB8c02118440b8283F941c9
🎯 Token: COCK

📍 Current Contract: 0x46763657C2e4845C4f72c7Cce605B3cB3309fd2f
   Type: synthetic

⚙️  Fee Configuration (same for ALL destinations):
   Protocol Fee: 0.12 USDC (120000)
   VIA Source Fee: 0.25 USDC (250000)
   VIA Dest Gas: 15000000000000000 wei

🌐 Updating Fees for 6 Remote Chains:
   - Chain 369 (PulseChain)
   - Chain 8453 (Base)
   - Chain 42161 (Arbitrum)
   - Chain 10 (Optimism)
   - Chain 56 (BNB Chain)
   - Chain 137 (Polygon)

⏳ Updating fees...
═══════════════════════════════════════════════════════

   🌐 Chain 369 (PulseChain):
      Using Nonce: 40
      TX: 0xeb807974e67d8a975230af2c4314e62ffc3825a3ccc6deb665f9db3d60ea8cfd
^C
Ganadhishs-MacBook-Air:multi-chain-with-via ganadhish$ 
Ganadhishs-MacBook-Air:multi-chain-with-via ganadhish$ TOKEN_SYMBOL=COCK npx hardhat run scripts/pre-audit-scripts/update-all-gas-fees.js --network avalanche

💰 UPDATE ALL GAS FEES (Pre-Audit Contracts)
═══════════════════════════════════════════════════════
📍 Network: avalanche (Chain ID: 43114)
👤 Signer: 0x05F8cC8753D90d67DBB8c02118440b8283F941c9
🎯 Token: COCK

📍 Current Contract: 0x46763657C2e4845C4f72c7Cce605B3cB3309fd2f
   Type: synthetic

⚙️  Fee Configuration (same for ALL destinations):
   Protocol Fee: 0.12 USDC (120000)
   VIA Source Fee: 0.25 USDC (250000)
   VIA Dest Gas: 15000000000000000 wei

🌐 Updating Fees for 6 Remote Chains:
   - Chain 369 (PulseChain)
   - Chain 8453 (Base)
   - Chain 42161 (Arbitrum)
   - Chain 10 (Optimism)
   - Chain 56 (BNB Chain)
   - Chain 137 (Polygon)

⏳ Updating fees...
═══════════════════════════════════════════════════════

   🌐 Chain 369 (PulseChain):
      Using Nonce: 40
      TX: 0x8c977c92848b2dd4a95dc022995becf0969eb1441f26c1cac876fbd22844218c
      ✅ Fees updated!

   🌐 Chain 8453 (Base):
      Using Nonce: 41
      TX: 0x79f5ff27dcd59155e3ac5cef66caa5e6c4015f3c561339b189afe7096d810b61
      ✅ Fees updated!

   🌐 Chain 42161 (Arbitrum):
      Using Nonce: 42
      TX: 0x184f110590fea77b14ace2f8168d81163a0f0333129f40410814f43439adb201
      ✅ Fees updated!

   🌐 Chain 10 (Optimism):
      Using Nonce: 43
      TX: 0x75f639fab82e2a82db337035a2a9560bb22181fb0ae885ab2517c5560359abaa
      ✅ Fees updated!

   🌐 Chain 56 (BNB Chain):
      Using Nonce: 44
      TX: 0x677168b91c9f6c9a718cf3fd7c70d05fa1dc562df77c1560340327f542f076c1
      ✅ Fees updated!

   🌐 Chain 137 (Polygon):
      Using Nonce: 45
      TX: 0x4ddbd811f9323961f64271e6c23f6e7b4d44743454021de3d83ef08d9929d694
      ✅ Fees updated!

[VERIFICATION] Checking Updated Fees...
═══════════════════════════════════════════════════════
   Chain 369: VIA Dest Gas = 15000000000000000 ✅
   Chain 8453: VIA Dest Gas = 15000000000000000 ✅
   Chain 42161: VIA Dest Gas = 15000000000000000 ✅
   Chain 10: VIA Dest Gas = 15000000000000000 ✅
   Chain 56: VIA Dest Gas = 15000000000000000 ✅
   Chain 137: VIA Dest Gas = 15000000000000000 ✅

✅ GAS FEE UPDATE COMPLETE FOR COCK ON AVALANCHE!
═══════════════════════════════════════════════════════
   📋 Success: 6 | Failed: 0

   📋 Run on other chains:
      npx hardhat run scripts/pre-audit-scripts/update-all-gas-fees.js --network pulsechain COCK
      npx hardhat run scripts/pre-audit-scripts/update-all-gas-fees.js --network base COCK
      npx hardhat run scripts/pre-audit-scripts/update-all-gas-fees.js --network arbitrum COCK
      npx hardhat run scripts/pre-audit-scripts/update-all-gas-fees.js --network optimism COCK
      npx hardhat run scripts/pre-audit-scripts/update-all-gas-fees.js --network bnb COCK
      npx hardhat run scripts/pre-audit-scripts/update-all-gas-fees.js --network polygon COCK
Ganadhishs-MacBook-Air:multi-chain-with-via ganadhish$ TOKEN_SYMBOL=PLSX npx hardhat run scripts/pre-audit-scripts
/update-all-gas-fees.js --network pulsechain

💰 UPDATE ALL GAS FEES (Pre-Audit Contracts)
═══════════════════════════════════════════════════════
📍 Network: pulsechain (Chain ID: 369)
👤 Signer: 0x05F8cC8753D90d67DBB8c02118440b8283F941c9
🎯 Token: PLSX

📍 Current Contract: 0xDe524350F6421842EE39baC52d69c0Db26DD0479
   Type: collateral

⚙️  Fee Configuration (same for ALL destinations):
   Protocol Fee: 0.12 USDC (120000)
   VIA Source Fee: 0.25 USDC (250000)
   VIA Dest Gas: 80000000000000000000 wei

🌐 Updating Fees for 6 Remote Chains:
   - Chain 8453 (Base)
   - Chain 42161 (Arbitrum)
   - Chain 10 (Optimism)
   - Chain 56 (BNB Chain)
   - Chain 137 (Polygon)
   - Chain 43114 (Avalanche)

⏳ Updating fees...
═══════════════════════════════════════════════════════

   🌐 Chain 8453 (Base):
      Using Nonce: 723
      TX: 0x3c16c64e098f6b42c2f4bd19a11d66a765758ea6a7d85c97fb0577432e4f7468
      ✅ Fees updated!

   🌐 Chain 42161 (Arbitrum):
      Using Nonce: 724
      TX: 0x307be4de1fcae111371652607fb24163d4f504d9f14a586a17ca2915edf50388
      ✅ Fees updated!

   🌐 Chain 10 (Optimism):
      Using Nonce: 725
      TX: 0x27cdd9009ef266810348978b07e5ee610fd704712e86a8b2883c5b6d0a8d7c2f
      ✅ Fees updated!

   🌐 Chain 56 (BNB Chain):
      Using Nonce: 726
      TX: 0x56d4e85470bc0c2c343116873f5dd8573f6959636081d4b257ee7c3ea9e892e6
      ✅ Fees updated!

   🌐 Chain 137 (Polygon):
      Using Nonce: 727
      TX: 0xbdd29baa21e096a35725ab24f2670e82943a682485d655ff738175bcdfc96f88
      ✅ Fees updated!

   🌐 Chain 43114 (Avalanche):
      Using Nonce: 728
      TX: 0xacf00607dfe0a4e2aa0b5afb6d3d6abe554fc2a9e91e43bee888a679bee860ad
      ✅ Fees updated!

[VERIFICATION] Checking Updated Fees...
═══════════════════════════════════════════════════════
   Chain 8453: VIA Dest Gas = 80000000000000000000 ✅
   Chain 42161: VIA Dest Gas = 80000000000000000000 ✅
   Chain 10: VIA Dest Gas = 80000000000000000000 ✅
   Chain 56: VIA Dest Gas = 80000000000000000000 ✅
   Chain 137: VIA Dest Gas = 80000000000000000000 ✅
   Chain 43114: VIA Dest Gas = 80000000000000000000 ✅

✅ GAS FEE UPDATE COMPLETE FOR PLSX ON PULSECHAIN!
═══════════════════════════════════════════════════════
   📋 Success: 6 | Failed: 0

   📋 Run on other chains:
      npx hardhat run scripts/pre-audit-scripts/update-all-gas-fees.js --network base PLSX
      npx hardhat run scripts/pre-audit-scripts/update-all-gas-fees.js --network arbitrum PLSX
      npx hardhat run scripts/pre-audit-scripts/update-all-gas-fees.js --network optimism PLSX
      npx hardhat run scripts/pre-audit-scripts/update-all-gas-fees.js --network bnb PLSX
      npx hardhat run scripts/pre-audit-scripts/update-all-gas-fees.js --network polygon PLSX
      npx hardhat run scripts/pre-audit-scripts/update-all-gas-fees.js --network avalanche PLSX
Ganadhishs-MacBook-Air:multi-chain-with-via ganadhish$ TOKEN_SYMBOL=PLSX npx hardhat run scripts/pre-audit-scripts
/update-all-gas-fees.js --network base

💰 UPDATE ALL GAS FEES (Pre-Audit Contracts)
═══════════════════════════════════════════════════════
📍 Network: base (Chain ID: 8453)
👤 Signer: 0x05F8cC8753D90d67DBB8c02118440b8283F941c9
🎯 Token: PLSX

📍 Current Contract: 0xF8Ae2Ca61ccAF2e6912d142b797080a3F7439c53
   Type: synthetic

⚙️  Fee Configuration (same for ALL destinations):
   Protocol Fee: 0.12 USDC (120000)
   VIA Source Fee: 0.25 USDC (250000)
   VIA Dest Gas: 30000000000000 wei

🌐 Updating Fees for 6 Remote Chains:
   - Chain 369 (PulseChain)
   - Chain 42161 (Arbitrum)
   - Chain 10 (Optimism)
   - Chain 56 (BNB Chain)
   - Chain 137 (Polygon)
   - Chain 43114 (Avalanche)

⏳ Updating fees...
═══════════════════════════════════════════════════════

   🌐 Chain 369 (PulseChain):
      Using Nonce: 493
      TX: 0x83a20ae951222df0f70f7ba5c785e0c0f8eac77c95b91b838d77ee27bea60590
      ✅ Fees updated!

   🌐 Chain 42161 (Arbitrum):
      Using Nonce: 494
      TX: 0x324dec9540e6f92dabd55b802b4147268cd89e67f047b7a70721d06679415132
      ✅ Fees updated!

   🌐 Chain 10 (Optimism):
      Using Nonce: 495
      TX: 0xc87e0fc5d63d8d8a3df52361e4c30b4ca06bd0eb0bcd85b5f609f69224987303
      ✅ Fees updated!

   🌐 Chain 56 (BNB Chain):
      Using Nonce: 496
      TX: 0x7cdb00e217597f35f648400976373b5e44382dbe4de31895513836c158fa4c1f
      ✅ Fees updated!

   🌐 Chain 137 (Polygon):
      Using Nonce: 497
      TX: 0x9fe613b26937b3ba1ce4373844af295dbc03095fb2af3e18c053ce7c5dcc039b
      ✅ Fees updated!

   🌐 Chain 43114 (Avalanche):
      Using Nonce: 498
      TX: 0xe43ba3bb20c42d2ba84d0bf85c49549b464efb60aec2e0b5d04b2ac88c206b09
      ✅ Fees updated!

[VERIFICATION] Checking Updated Fees...
═══════════════════════════════════════════════════════
   Chain 369: VIA Dest Gas = 30000000000000 ✅
   Chain 42161: VIA Dest Gas = 30000000000000 ✅
   Chain 10: VIA Dest Gas = 30000000000000 ✅
   Chain 56: VIA Dest Gas = 30000000000000 ✅
   Chain 137: VIA Dest Gas = 30000000000000 ✅
   Chain 43114: VIA Dest Gas = 30000000000000 ✅

✅ GAS FEE UPDATE COMPLETE FOR PLSX ON BASE!
═══════════════════════════════════════════════════════
   📋 Success: 6 | Failed: 0

   📋 Run on other chains:
      npx hardhat run scripts/pre-audit-scripts/update-all-gas-fees.js --network pulsechain PLSX
      npx hardhat run scripts/pre-audit-scripts/update-all-gas-fees.js --network arbitrum PLSX
      npx hardhat run scripts/pre-audit-scripts/update-all-gas-fees.js --network optimism PLSX
      npx hardhat run scripts/pre-audit-scripts/update-all-gas-fees.js --network bnb PLSX
      npx hardhat run scripts/pre-audit-scripts/update-all-gas-fees.js --network polygon PLSX
      npx hardhat run scripts/pre-audit-scripts/update-all-gas-fees.js --network avalanche PLSX
Ganadhishs-MacBook-Air:multi-chain-with-via ganadhish$ TOKEN_SYMBOL=PLSX npx hardhat run scripts/pre-audit-scripts/update-all-gas-fees.js --network arbitrum

💰 UPDATE ALL GAS FEES (Pre-Audit Contracts)
═══════════════════════════════════════════════════════
📍 Network: arbitrum (Chain ID: 42161)
👤 Signer: 0x05F8cC8753D90d67DBB8c02118440b8283F941c9
🎯 Token: PLSX

📍 Current Contract: 0xB04d0A850813A867f9e858A04fa11A22c58ff846
   Type: synthetic

⚙️  Fee Configuration (same for ALL destinations):
   Protocol Fee: 0.12 USDC (120000)
   VIA Source Fee: 0.25 USDC (250000)
   VIA Dest Gas: 30000000000000 wei

🌐 Updating Fees for 6 Remote Chains:
   - Chain 369 (PulseChain)
   - Chain 8453 (Base)
   - Chain 10 (Optimism)
   - Chain 56 (BNB Chain)
   - Chain 137 (Polygon)
   - Chain 43114 (Avalanche)

⏳ Updating fees...
═══════════════════════════════════════════════════════

   🌐 Chain 369 (PulseChain):
      Using Nonce: 146
      TX: 0xc392820234f2a42a72d6a05375640b5ad17bafa00bc7fec20fe359ca074596d6
      ✅ Fees updated!

   🌐 Chain 8453 (Base):
      Using Nonce: 147
      TX: 0xe4a0e00dce780f957d5671098ebf42869cbb2f891e561f1c4be2f0458dffff37
      ✅ Fees updated!

   🌐 Chain 10 (Optimism):
      Using Nonce: 148
      TX: 0x0fe60ae38408078e1dde383d7a05d953631fdaed9aa9c5c353f70d6579a8b6ad
      ✅ Fees updated!

   🌐 Chain 56 (BNB Chain):
      Using Nonce: 149
      TX: 0x2c65e31ffb5344337c664554d9fed18c8c6e61da8b58f99f2a9fdee4614ee849
      ✅ Fees updated!

   🌐 Chain 137 (Polygon):
      Using Nonce: 150
      TX: 0x128670da4741eadaaf643232b3f0bcdd8ed1a48d3c134a7a0e942b961f2479ad
      ✅ Fees updated!

   🌐 Chain 43114 (Avalanche):
      Using Nonce: 151
      TX: 0x16510f186a24180c4e67ae7af5e3c1d99bfd513383bdd05b34451f843e236a30
      ✅ Fees updated!

[VERIFICATION] Checking Updated Fees...
═══════════════════════════════════════════════════════
   Chain 369: VIA Dest Gas = 30000000000000 ✅
   Chain 8453: VIA Dest Gas = 30000000000000 ✅
   Chain 10: VIA Dest Gas = 30000000000000 ✅
   Chain 56: VIA Dest Gas = 30000000000000 ✅
   Chain 137: VIA Dest Gas = 30000000000000 ✅
   Chain 43114: VIA Dest Gas = 30000000000000 ✅

✅ GAS FEE UPDATE COMPLETE FOR PLSX ON ARBITRUM!
═══════════════════════════════════════════════════════
   📋 Success: 6 | Failed: 0

   📋 Run on other chains:
      npx hardhat run scripts/pre-audit-scripts/update-all-gas-fees.js --network pulsechain PLSX
      npx hardhat run scripts/pre-audit-scripts/update-all-gas-fees.js --network base PLSX
      npx hardhat run scripts/pre-audit-scripts/update-all-gas-fees.js --network optimism PLSX
      npx hardhat run scripts/pre-audit-scripts/update-all-gas-fees.js --network bnb PLSX
      npx hardhat run scripts/pre-audit-scripts/update-all-gas-fees.js --network polygon PLSX
      npx hardhat run scripts/pre-audit-scripts/update-all-gas-fees.js --network avalanche PLSX
Ganadhishs-MacBook-Air:multi-chain-with-via ganadhish$ TOKEN_SYMBOL=PLSX npx hardhat run scripts/pre-audit-scripts/update-all-gas-fees.js --network optimism

💰 UPDATE ALL GAS FEES (Pre-Audit Contracts)
═══════════════════════════════════════════════════════
📍 Network: optimism (Chain ID: 10)
👤 Signer: 0x05F8cC8753D90d67DBB8c02118440b8283F941c9
🎯 Token: PLSX

📍 Current Contract: 0xEab30C23A015942BDc8204bD8dcA2780a5957a8c
   Type: synthetic

⚙️  Fee Configuration (same for ALL destinations):
   Protocol Fee: 0.12 USDC (120000)
   VIA Source Fee: 0.25 USDC (250000)
   VIA Dest Gas: 30000000000000 wei

🌐 Updating Fees for 6 Remote Chains:
   - Chain 369 (PulseChain)
   - Chain 8453 (Base)
   - Chain 42161 (Arbitrum)
   - Chain 56 (BNB Chain)
   - Chain 137 (Polygon)
   - Chain 43114 (Avalanche)

⏳ Updating fees...
═══════════════════════════════════════════════════════

   🌐 Chain 369 (PulseChain):
      Using Nonce: 103
      TX: 0x1c6f6f2f70ae6e131d7ebe995644f1cb5551f95545a30e2336e7c8da8c00ecdb
      ✅ Fees updated!

   🌐 Chain 8453 (Base):
      Using Nonce: 104
      TX: 0x1434b9a218d3ef48c19a3f520b58b0a382e8f4de89417d52df7923d018b83a59
      ✅ Fees updated!

   🌐 Chain 42161 (Arbitrum):
      Using Nonce: 105
      TX: 0x8d5cbe5673181b5c20b263c9ded97a10e9705182f07b138257278d74564f2b2b
      ✅ Fees updated!

   🌐 Chain 56 (BNB Chain):
      Using Nonce: 106
      TX: 0xdafbaab3c52e2fa4e7c9dafddc2ba86c4d9aa6aa0b03a80b2317761a6cc963d7
      ✅ Fees updated!

   🌐 Chain 137 (Polygon):
      Using Nonce: 107
      TX: 0xdfe627bfb292f71d903336ddaa8ff2b5bd843fbe685d7e739a75a61323c15c7c
      ✅ Fees updated!

   🌐 Chain 43114 (Avalanche):
      Using Nonce: 108
      TX: 0xfb2f93ace6e4d9faa5e069de2c30225a01fdd3644216db79e226472158fcfa7a
      ✅ Fees updated!

[VERIFICATION] Checking Updated Fees...
═══════════════════════════════════════════════════════
   Chain 369: VIA Dest Gas = 30000000000000 ✅
   Chain 8453: VIA Dest Gas = 30000000000000 ✅
   Chain 42161: VIA Dest Gas = 30000000000000 ✅
   Chain 56: VIA Dest Gas = 30000000000000 ✅
   Chain 137: VIA Dest Gas = 30000000000000 ✅
   Chain 43114: VIA Dest Gas = 30000000000000 ✅

✅ GAS FEE UPDATE COMPLETE FOR PLSX ON OPTIMISM!
═══════════════════════════════════════════════════════
   📋 Success: 6 | Failed: 0

   📋 Run on other chains:
      npx hardhat run scripts/pre-audit-scripts/update-all-gas-fees.js --network pulsechain PLSX
      npx hardhat run scripts/pre-audit-scripts/update-all-gas-fees.js --network base PLSX
      npx hardhat run scripts/pre-audit-scripts/update-all-gas-fees.js --network arbitrum PLSX
      npx hardhat run scripts/pre-audit-scripts/update-all-gas-fees.js --network bnb PLSX
      npx hardhat run scripts/pre-audit-scripts/update-all-gas-fees.js --network polygon PLSX
      npx hardhat run scripts/pre-audit-scripts/update-all-gas-fees.js --network avalanche PLSX
Ganadhishs-MacBook-Air:multi-chain-with-via ganadhish$ TOKEN_SYMBOL=PLSX npx hardhat run scripts/pre-audit-scripts/update-all-gas-fees.js --network bnb

💰 UPDATE ALL GAS FEES (Pre-Audit Contracts)
═══════════════════════════════════════════════════════
📍 Network: bnb (Chain ID: 56)
👤 Signer: 0x05F8cC8753D90d67DBB8c02118440b8283F941c9
🎯 Token: PLSX

📍 Current Contract: 0xC1d9A1f64291CF47e703eab6b27fA0660cAE7324
   Type: synthetic

⚙️  Fee Configuration (same for ALL destinations):
   Protocol Fee: 0.12 USDC (120000)
   VIA Source Fee: 0.25 USDC (250000)
   VIA Dest Gas: 1500000000000000 wei

🌐 Updating Fees for 6 Remote Chains:
   - Chain 369 (PulseChain)
   - Chain 8453 (Base)
   - Chain 42161 (Arbitrum)
   - Chain 10 (Optimism)
   - Chain 137 (Polygon)
   - Chain 43114 (Avalanche)

⏳ Updating fees...
═══════════════════════════════════════════════════════

   🌐 Chain 369 (PulseChain):
      Using Nonce: 49
      TX: 0xbf599c84f84595ce7d52794ff71f1e52f76739446258ca0fca309c9d684922ac
      ✅ Fees updated!

   🌐 Chain 8453 (Base):
      Using Nonce: 50
      TX: 0x20520bc6f7fedf1ea64b3ee52cb5d1c367b1fb13c9585c59debd264402da3edb
      ✅ Fees updated!

   🌐 Chain 42161 (Arbitrum):
      Using Nonce: 51
      TX: 0x833ffd32ad69baea599f0f3708222f9cad07e64fab111bbdf2a94a772dfdda71
      ✅ Fees updated!

   🌐 Chain 10 (Optimism):
      Using Nonce: 52
      TX: 0xc3c0af05648477b2dfd94840d9ac053b05193823b3c1b72fa7e32cac9b02baaf
      ✅ Fees updated!

   🌐 Chain 137 (Polygon):
      Using Nonce: 53
      TX: 0xf1f6fc52cc86e57e11bfd4ac07f570390bedf2614e43618ef3726a0ab5793257
      ✅ Fees updated!

   🌐 Chain 43114 (Avalanche):
      Using Nonce: 54
      TX: 0xce7df159d56ae6a5396d820fcc740a1d8561738924c89ab21d13ded7770453a4
      ✅ Fees updated!

[VERIFICATION] Checking Updated Fees...
═══════════════════════════════════════════════════════
   Chain 369: VIA Dest Gas = 1500000000000000 ✅
   Chain 8453: VIA Dest Gas = 1500000000000000 ✅
   Chain 42161: VIA Dest Gas = 1500000000000000 ✅
   Chain 10: VIA Dest Gas = 1500000000000000 ✅
   Chain 137: VIA Dest Gas = 1500000000000000 ✅
   Chain 43114: VIA Dest Gas = 1500000000000000 ✅

✅ GAS FEE UPDATE COMPLETE FOR PLSX ON BNB!
═══════════════════════════════════════════════════════
   📋 Success: 6 | Failed: 0

   📋 Run on other chains:
      npx hardhat run scripts/pre-audit-scripts/update-all-gas-fees.js --network pulsechain PLSX
      npx hardhat run scripts/pre-audit-scripts/update-all-gas-fees.js --network base PLSX
      npx hardhat run scripts/pre-audit-scripts/update-all-gas-fees.js --network arbitrum PLSX
      npx hardhat run scripts/pre-audit-scripts/update-all-gas-fees.js --network optimism PLSX
      npx hardhat run scripts/pre-audit-scripts/update-all-gas-fees.js --network polygon PLSX
      npx hardhat run scripts/pre-audit-scripts/update-all-gas-fees.js --network avalanche PLSX
Ganadhishs-MacBook-Air:multi-chain-with-via ganadhish$ TOKEN_SYMBOL=PLSX npx hardhat run scripts/pre-audit-scripts/update-all-gas-fees.js --network polygon

💰 UPDATE ALL GAS FEES (Pre-Audit Contracts)
═══════════════════════════════════════════════════════
📍 Network: polygon (Chain ID: 137)
👤 Signer: 0x05F8cC8753D90d67DBB8c02118440b8283F941c9
🎯 Token: PLSX

📍 Current Contract: 0xE18947547EB1f49B725c3Ca4f95bD45A84F6c24A
   Type: synthetic

⚙️  Fee Configuration (same for ALL destinations):
   Protocol Fee: 0.12 USDC (120000)
   VIA Source Fee: 0.25 USDC (250000)
   VIA Dest Gas: 30000000000000000 wei

🌐 Updating Fees for 6 Remote Chains:
   - Chain 369 (PulseChain)
   - Chain 8453 (Base)
   - Chain 42161 (Arbitrum)
   - Chain 10 (Optimism)
   - Chain 56 (BNB Chain)
   - Chain 43114 (Avalanche)

⏳ Updating fees...
═══════════════════════════════════════════════════════

   🌐 Chain 369 (PulseChain):
      Using Nonce: 93
      TX: 0x94879eb1f4abb7d39d155657691d017eb2671b4b43ab705adcb8f218a85bd501
      ✅ Fees updated!

   🌐 Chain 8453 (Base):
      Using Nonce: 94
      TX: 0xcbafea743583807fbd333a6905bdd0d39ef80689c42a92fc7dc9c4d291ba0632
      ✅ Fees updated!

   🌐 Chain 42161 (Arbitrum):
      Using Nonce: 95
      TX: 0x51396dd948a53210081d9d1a643ba42286cc6477a9276aa5caf866de610c4748
      ✅ Fees updated!

   🌐 Chain 10 (Optimism):
      Using Nonce: 96
      TX: 0xaa9e6e2c5084f111202ad0d5dbfd98f2d531932f361983b19333af512857c905
      ✅ Fees updated!

   🌐 Chain 56 (BNB Chain):
      Using Nonce: 97
      TX: 0x296ade0f4b27ef2ce7f91b1b41c723ff1d1bbca40f36b0944e142eb5c6675ce6
      ✅ Fees updated!

   🌐 Chain 43114 (Avalanche):
      Using Nonce: 98
      TX: 0x4d67c7e3db2b98f5f80a5687e2cb4c6caa42504f56111ea8ebe9909061e14604
      ✅ Fees updated!

[VERIFICATION] Checking Updated Fees...
═══════════════════════════════════════════════════════
   Chain 369: VIA Dest Gas = 30000000000000000 ✅
   Chain 8453: VIA Dest Gas = 30000000000000000 ✅
   Chain 42161: VIA Dest Gas = 30000000000000000 ✅
   Chain 10: VIA Dest Gas = 30000000000000000 ✅
   Chain 56: VIA Dest Gas = 30000000000000000 ✅
   Chain 43114: VIA Dest Gas = 30000000000000000 ✅

✅ GAS FEE UPDATE COMPLETE FOR PLSX ON POLYGON!
═══════════════════════════════════════════════════════
   📋 Success: 6 | Failed: 0

   📋 Run on other chains:
      npx hardhat run scripts/pre-audit-scripts/update-all-gas-fees.js --network pulsechain PLSX
      npx hardhat run scripts/pre-audit-scripts/update-all-gas-fees.js --network base PLSX
      npx hardhat run scripts/pre-audit-scripts/update-all-gas-fees.js --network arbitrum PLSX
      npx hardhat run scripts/pre-audit-scripts/update-all-gas-fees.js --network optimism PLSX
      npx hardhat run scripts/pre-audit-scripts/update-all-gas-fees.js --network bnb PLSX
      npx hardhat run scripts/pre-audit-scripts/update-all-gas-fees.js --network avalanche PLSX
Ganadhishs-MacBook-Air:multi-chain-with-via ganadhish$ TOKEN_SYMBOL=PLSX npx hardhat run scripts/pre-audit-scripts/update-all-gas-fees.js --network avalanche

💰 UPDATE ALL GAS FEES (Pre-Audit Contracts)
═══════════════════════════════════════════════════════
📍 Network: avalanche (Chain ID: 43114)
👤 Signer: 0x05F8cC8753D90d67DBB8c02118440b8283F941c9
🎯 Token: PLSX

📍 Current Contract: 0x7e39288d48ae017B1dF2f20523a6A1c7C91D96E2
   Type: synthetic

⚙️  Fee Configuration (same for ALL destinations):
   Protocol Fee: 0.12 USDC (120000)
   VIA Source Fee: 0.25 USDC (250000)
   VIA Dest Gas: 15000000000000000 wei

🌐 Updating Fees for 6 Remote Chains:
   - Chain 369 (PulseChain)
   - Chain 8453 (Base)
   - Chain 42161 (Arbitrum)
   - Chain 10 (Optimism)
   - Chain 56 (BNB Chain)
   - Chain 137 (Polygon)

⏳ Updating fees...
═══════════════════════════════════════════════════════

   🌐 Chain 369 (PulseChain):
      Using Nonce: 46
      TX: 0x04859f6bc007a2008138bfab94420d312bbc5756a9ee7959b38de4349ee0ad05
      ✅ Fees updated!

   🌐 Chain 8453 (Base):
      Using Nonce: 47
      TX: 0xfef008319f9fd0d2ca9b5b0db5c549153a5e9515c78c21aa01a3aa770536cf8c
      ✅ Fees updated!

   🌐 Chain 42161 (Arbitrum):
      Using Nonce: 48
      TX: 0xd1075bd333a483a4732258b0af666ba764083b3ed4c1ea1c934c06168899cc06
      ✅ Fees updated!

   🌐 Chain 10 (Optimism):
      Using Nonce: 49
      TX: 0x29894289f1dc6cc39a3772e1cfb0b1744f3d4848bebd90ab1ce76b1939aaeabc
      ✅ Fees updated!

   🌐 Chain 56 (BNB Chain):
      Using Nonce: 50
      TX: 0xe94687a400b8f32ec9bdd6812610ec260cf8fe2f1162cbe13ad69c06ae6609e6
      ✅ Fees updated!

   🌐 Chain 137 (Polygon):
      Using Nonce: 51
      TX: 0x46407ac7eef3d0518ff4b587a7969fab129c137a91fef596e084188aad661b3e
      ✅ Fees updated!

[VERIFICATION] Checking Updated Fees...
═══════════════════════════════════════════════════════
   Chain 369: VIA Dest Gas = 15000000000000000 ✅
   Chain 8453: VIA Dest Gas = 15000000000000000 ✅
   Chain 42161: VIA Dest Gas = 15000000000000000 ✅
   Chain 10: VIA Dest Gas = 15000000000000000 ✅
   Chain 56: VIA Dest Gas = 15000000000000000 ✅
   Chain 137: VIA Dest Gas = 15000000000000000 ✅

✅ GAS FEE UPDATE COMPLETE FOR PLSX ON AVALANCHE!
═══════════════════════════════════════════════════════
   📋 Success: 6 | Failed: 0

   📋 Run on other chains:
      npx hardhat run scripts/pre-audit-scripts/update-all-gas-fees.js --network pulsechain PLSX
      npx hardhat run scripts/pre-audit-scripts/update-all-gas-fees.js --network base PLSX
      npx hardhat run scripts/pre-audit-scripts/update-all-gas-fees.js --network arbitrum PLSX
      npx hardhat run scripts/pre-audit-scripts/update-all-gas-fees.js --network optimism PLSX
      npx hardhat run scripts/pre-audit-scripts/update-all-gas-fees.js --network bnb PLSX
      npx hardhat run scripts/pre-audit-scripts/update-all-gas-fees.js --network polygon PLSX