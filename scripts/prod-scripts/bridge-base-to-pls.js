const hre = require("hardhat");

/**
 * Production Bridge Script: Base Sepolia → PulseChain Testnet
 * Handles reverse bridging using production contracts with enhanced features
 */

async function main() {
  const [signer] = await hre.ethers.getSigners();

  console.log(`\n🔄 PRODUCTION REVERSE BRIDGE: Base Sepolia → PulseChain`);
  console.log(`======================================================`);
  console.log(`📍 Network: ${hre.network.name}`);
  console.log(`👤 Signer: ${signer.address}`);

  // === CONFIGURATION ===
  const config = {
    // Production contract addresses (update these after deploying)
    bridgeContract: "REPLACE_WITH_PRODUCTION_ERC20_ADDRESS", // ViaERC20 on Base Sepolia

    // Bridge parameters
    destinationChainId: 943, // PulseChain Testnet
    amount: process.argv[2]
      ? hre.ethers.parseEther(process.argv[2])
      : hre.ethers.parseEther("3"), // Default 3 tokens
    recipient: process.argv[3] || signer.address, // Default to sender

    // Destination info
    destinationContract: "REPLACE_WITH_PRODUCTION_COLLATERAL_ADDRESS", // ViaERC20CollateralPro on PulseChain
    wrappedTokenOnDestination: "0xc16131616B78346eb58bfF11Fafc9895a7180d93", // ROB token that will be unlocked
  };

  console.log(`\n📋 Reverse Bridge Configuration:`);
  console.log(`   🌉 Bridge Contract (ERC20): ${config.bridgeContract}`);
  console.log(`   💰 Amount: ${hre.ethers.formatEther(config.amount)} tokens`);
  console.log(
    `   🎯 Destination: Chain ${config.destinationChainId} (PulseChain Testnet)`
  );
  console.log(`   📧 Recipient: ${config.recipient}`);
  console.log(`   🏭 Destination Contract: ${config.destinationContract}`);
  console.log(`   🏷️  Token to Unlock: ${config.wrappedTokenOnDestination}`);

  // Verify we're on the correct network
  if (hre.network.name !== "base_sepolia") {
    throw new Error(`❌ This script must be run on base_sepolia network`);
  }

  // === CONTRACT INSTANCE ===
  const Bridge = await hre.ethers.getContractAt(
    "ViaERC20",
    config.bridgeContract
  );

  console.log(`\n🔍 STEP 1: Pre-Bridge Checks`);
  console.log(`=============================`);

  // Check token info
  try {
    const tokenName = await Bridge.name();
    const tokenSymbol = await Bridge.symbol();
    const tokenDecimals = await Bridge.decimals();
    console.log(
      `   📄 Token: ${tokenName} (${tokenSymbol}, ${tokenDecimals} decimals)`
    );
  } catch (error) {
    console.log(`   ⚠️  Unable to read token info: ${error.message}`);
  }

  // Check user balance
  const userBalance = await Bridge.balanceOf(signer.address);
  console.log(
    `   🪙 Your Balance: ${hre.ethers.formatEther(userBalance)} tokens`
  );

  if (userBalance < config.amount) {
    console.log(`\n❌ Insufficient balance for reverse bridge!`);
    console.log(`   Have: ${hre.ethers.formatEther(userBalance)} tokens`);
    console.log(`   Need: ${hre.ethers.formatEther(config.amount)} tokens`);
    console.log(`\n💡 This is expected if:`);
    console.log(
      `   1. No tokens have been bridged from PulseChain to Base Sepolia yet`
    );
    console.log(
      `   2. Previous bridge transactions haven't completed yet (wait 2-10 minutes)`
    );
    console.log(`   3. Bridge tokens are in a different wallet`);
    console.log(`\n🔧 Solutions:`);
    console.log(`   1. First bridge tokens FROM PulseChain TO Base Sepolia`);
    console.log(`   2. Wait for cross-chain transactions to complete`);
    console.log(`   3. Check your balance again`);
    return;
  }

  // Check bridge stats and limits
  try {
    const stats = await Bridge.getStats();
    const minAmount = await Bridge.minBridgeAmount();
    const maxAmount = await Bridge.maxBridgeAmount();
    const bridgeFee = await Bridge.bridgeFee();

    console.log(`\n📊 Bridge Statistics:`);
    console.log(
      `   🏭 Total Supply: ${hre.ethers.formatEther(stats[0])} tokens`
    );
    console.log(
      `   🌉 Total Bridged: ${hre.ethers.formatEther(stats[1])} tokens`
    );
    console.log(`   📈 Total Transactions: ${stats[2].toString()}`);
    console.log(
      `   📅 Today's Volume: ${hre.ethers.formatEther(stats[3])} tokens`
    );
    console.log(
      `   🎯 Remaining Daily Limit: ${hre.ethers.formatEther(stats[4])} tokens`
    );

    console.log(`\n💰 Bridge Limits:`);
    console.log(
      `   📏 Min Amount: ${hre.ethers.formatEther(minAmount)} tokens`
    );
    console.log(
      `   📏 Max Amount: ${hre.ethers.formatEther(maxAmount)} tokens`
    );
    console.log(
      `   💸 Bridge Fee: ${hre.ethers.formatEther(bridgeFee)} tokens`
    );

    // Validate amounts
    if (config.amount < minAmount) {
      throw new Error(
        `❌ Amount below minimum. Min: ${hre.ethers.formatEther(
          minAmount
        )}, Requested: ${hre.ethers.formatEther(config.amount)}`
      );
    }

    if (config.amount > maxAmount) {
      throw new Error(
        `❌ Amount above maximum. Max: ${hre.ethers.formatEther(
          maxAmount
        )}, Requested: ${hre.ethers.formatEther(config.amount)}`
      );
    }

    if (config.amount > stats[4]) {
      throw new Error(
        `❌ Amount exceeds daily limit. Remaining: ${hre.ethers.formatEther(
          stats[4]
        )}, Requested: ${hre.ethers.formatEther(config.amount)}`
      );
    }

    if (config.amount <= bridgeFee) {
      throw new Error(
        `❌ Amount must be greater than bridge fee. Fee: ${hre.ethers.formatEther(
          bridgeFee
        )}, Amount: ${hre.ethers.formatEther(config.amount)}`
      );
    }

    const netAmount = config.amount - bridgeFee;
    console.log(
      `   💎 Net Amount (after fee): ${hre.ethers.formatEther(
        netAmount
      )} tokens`
    );
  } catch (error) {
    if (error.message.includes("Amount")) {
      throw error; // Re-throw validation errors
    }
    console.log(`   ⚠️  Unable to read bridge stats: ${error.message}`);
  }

  // Check if destination chain is supported
  try {
    const isSupported = await Bridge.isChainSupported(
      config.destinationChainId
    );
    if (!isSupported) {
      throw new Error(
        `❌ Destination chain ${config.destinationChainId} is not supported`
      );
    }
    console.log(
      `   ✅ Destination chain ${config.destinationChainId} is supported`
    );

    const isAuthorized = await Bridge.isAuthorizedMinter(
      config.destinationChainId
    );
    if (!isAuthorized) {
      throw new Error(
        `❌ Destination chain ${config.destinationChainId} is not authorized for minting`
      );
    }
    console.log(
      `   ✅ Destination chain ${config.destinationChainId} is authorized`
    );
  } catch (error) {
    throw new Error(`❌ Chain support check failed: ${error.message}`);
  }

  console.log(
    `\n🔥 STEP 2: Execute Reverse Bridge Transaction (Burn & Unlock)`
  );
  console.log(
    `===============================================================`
  );

  try {
    // Estimate gas first
    console.log(`   ⛽ Estimating gas for burn-and-bridge...`);
    const gasEstimate = await Bridge.bridge.estimateGas(
      config.destinationChainId,
      config.recipient,
      config.amount
    );
    console.log(`   ⛽ Estimated Gas: ${gasEstimate.toString()}`);

    // Execute bridge transaction (this will burn tokens on Base Sepolia)
    console.log(
      `   🔥 Burning ${hre.ethers.formatEther(
        config.amount
      )} tokens on Base Sepolia...`
    );
    console.log(`   📤 Sending bridge transaction...`);

    const bridgeTx = await Bridge.bridge(
      config.destinationChainId,
      config.recipient,
      config.amount,
      {
        gasLimit: Math.max(300000, Number(gasEstimate) * 2), // Use 2x estimated gas or 300k
        value: 0,
      }
    );

    console.log(`   📤 Bridge tx sent: ${bridgeTx.hash}`);
    console.log(`   ⏳ Waiting for confirmation...`);

    const receipt = await bridgeTx.wait();
    console.log(`   ✅ Bridge transaction confirmed!`);
    console.log(`   ⛽ Gas used: ${receipt.gasUsed.toString()}`);
    console.log(`   🧱 Block: ${receipt.blockNumber}`);

    console.log(`\n📋 STEP 3: Transaction Analysis`);
    console.log(`===============================`);

    // Parse events
    let bridgeEventFound = false;
    let burnEventFound = false;
    let txId = null;
    let actualAmount = null;
    let actualFee = null;

    console.log(`   📊 Events Emitted:`);
    receipt.logs.forEach((log, index) => {
      try {
        const parsed = Bridge.interface.parseLog(log);
        console.log(`      ${index + 1}. ${parsed.name}`);

        if (parsed.name === "TokensBridged") {
          bridgeEventFound = true;
          txId = parsed.args.txId;
          actualAmount = parsed.args.amount;
          actualFee = parsed.args.fee;

          console.log(`         👤 Sender: ${parsed.args.sender}`);
          console.log(
            `         🎯 Destination Chain: ${parsed.args.destChainId}`
          );
          console.log(`         📧 Recipient: ${parsed.args.recipient}`);
          console.log(
            `         💰 Amount: ${hre.ethers.formatEther(
              parsed.args.amount
            )} tokens`
          );
          console.log(
            `         💸 Fee: ${hre.ethers.formatEther(parsed.args.fee)} tokens`
          );
          console.log(
            `         🆔 Transaction ID: ${parsed.args.txId.toString()}`
          );
        }

        if (
          parsed.name === "Transfer" &&
          parsed.args.to === "0x0000000000000000000000000000000000000000"
        ) {
          burnEventFound = true;
          console.log(
            `         🔥 Burned: ${hre.ethers.formatEther(
              parsed.args.value
            )} tokens`
          );
          console.log(`         👤 From: ${parsed.args.from}`);
        }
      } catch (e) {
        console.log(
          `      ${index + 1}. Raw log (topic: ${log.topics[0].substring(
            0,
            10
          )}...)`
        );
      }
    });

    if (!bridgeEventFound) {
      console.log(
        `   ⚠️  No TokensBridged event found - transaction may have failed`
      );
    }

    if (!burnEventFound) {
      console.log(
        `   ⚠️  No burn event found - tokens may not have been burned`
      );
    }

    console.log(`\n📊 STEP 4: Final State`);
    console.log(`=======================`);

    // Check final balances and stats
    const finalUserBalance = await Bridge.balanceOf(signer.address);
    const finalStats = await Bridge.getStats();

    console.log(
      `   🪙 Your Token Balance: ${hre.ethers.formatEther(
        finalUserBalance
      )} tokens`
    );
    console.log(
      `   🏭 Total Supply: ${hre.ethers.formatEther(finalStats[0])} tokens`
    );
    console.log(
      `   🔥 Tokens Burned: ${hre.ethers.formatEther(
        userBalance - finalUserBalance
      )} tokens`
    );
    console.log(`   📈 Bridge Total Transactions: ${finalStats[2].toString()}`);
    console.log(
      `   🎯 Remaining Daily Limit: ${hre.ethers.formatEther(
        finalStats[4]
      )} tokens`
    );

    console.log(`\n🔍 STEP 5: Monitoring Information`);
    console.log(`==================================`);
    console.log(
      `   🔗 VIA Scanner: https://scan.vialabs.io/transaction/${bridgeTx.hash}`
    );
    console.log(`   ⏰ Cross-chain processing time: 2-10 minutes`);
    console.log(
      `   🎯 Destination chain: PulseChain Testnet (${config.destinationChainId})`
    );
    console.log(`   📧 Recipient address: ${config.recipient}`);
    console.log(`   🏭 Destination contract: ${config.destinationContract}`);
    console.log(
      `   🏷️  Token to be unlocked: ${config.wrappedTokenOnDestination}`
    );
    if (txId) {
      console.log(`   🆔 Bridge Transaction ID: ${txId.toString()}`);
    }

    console.log(`\n✅ PRODUCTION REVERSE BRIDGE COMPLETED!`);
    console.log(`=======================================`);

    if (actualAmount && actualFee) {
      console.log(
        `💰 Net Amount Bridged: ${hre.ethers.formatEther(actualAmount)} tokens`
      );
      console.log(`💸 Fee Paid: ${hre.ethers.formatEther(actualFee)} tokens`);
    }

    console.log(`📱 What happens next:`);
    console.log(
      `   1. ⏰ Wait 2-10 minutes for cross-chain message processing`
    );
    console.log(`   2. 🔗 VIA protocol delivers message to PulseChain Testnet`);
    console.log(
      `   3. 🔓 Collateral contract unlocks ${config.wrappedTokenOnDestination} tokens`
    );
    console.log(`   4. 💰 Recipient receives unlocked tokens on PulseChain`);
    console.log(`   5. 🔍 Monitor VIA Scanner and check PulseChain balance`);
  } catch (error) {
    console.error(`\n❌ Reverse Bridge Transaction Failed:`);
    console.error(`   💬 Error: ${error.message}`);

    if (error.reason) {
      console.error(`   🔍 Reason: ${error.reason}`);
    }

    if (error.data) {
      console.error(`   📊 Data: ${error.data}`);
    }

    // Provide helpful debugging info
    console.log(`\n🔧 Debugging Information:`);
    console.log(`   📍 Bridge Contract: ${config.bridgeContract}`);
    console.log(
      `   💰 Requested Amount: ${hre.ethers.formatEther(config.amount)}`
    );
    console.log(`   🎯 Destination Chain: ${config.destinationChainId}`);
    console.log(`   📧 Recipient: ${config.recipient}`);
    console.log(
      `   🪙 Your Balance: ${hre.ethers.formatEther(userBalance)} tokens`
    );

    throw error;
  }
}

// Help function
function showHelp() {
  console.log(`\n🔄 Production Reverse Bridge Script Usage`);
  console.log(`========================================`);
  console.log(
    `npx hardhat run scripts/production-bridge-to-pulsechain.js --network base_sepolia [amount] [recipient]`
  );
  console.log(`\nParameters:`);
  console.log(`  amount    - Amount of tokens to bridge back (default: 3)`);
  console.log(
    `  recipient - Recipient address on PulseChain (default: your address)`
  );
  console.log(`\nExamples:`);
  console.log(
    `  npx hardhat run scripts/production-bridge-to-pulsechain.js --network base_sepolia`
  );
  console.log(
    `  npx hardhat run scripts/production-bridge-to-pulsechain.js --network base_sepolia 5`
  );
  console.log(
    `  npx hardhat run scripts/production-bridge-to-pulsechain.js --network base_sepolia 5 0x1234...`
  );
  console.log(`\nNotes:`);
  console.log(
    `  - This burns tokens on Base Sepolia and unlocks them on PulseChain`
  );
  console.log(`  - You must have bridge tokens in your Base Sepolia wallet`);
  console.log(
    `  - Bridge tokens are obtained by first bridging FROM PulseChain TO Base Sepolia`
  );
}

// Check for help flag
if (process.argv.includes("--help") || process.argv.includes("-h")) {
  showHelp();
  process.exit(0);
}

main().catch((error) => {
  console.error("\n💥 Production reverse bridge script failed:", error.message);
  process.exitCode = 1;
});
