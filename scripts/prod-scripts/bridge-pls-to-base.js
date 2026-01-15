const hre = require("hardhat");

/**
 * Production Bridge Script: PulseChain Testnet → Base Sepolia
 * Handles bridging tokens using production contracts with enhanced features
 */

async function main() {
  const [signer] = await hre.ethers.getSigners();

  console.log(`\n🌉 PRODUCTION BRIDGE: PulseChain → Base Sepolia`);
  console.log(`===============================================`);
  console.log(`📍 Network: ${hre.network.name}`);
  console.log(`👤 Signer: ${signer.address}`);

  // === CONFIGURATION ===
  const config = {
    // Production contract addresses (update these after deploying)
    bridgeContract: "0x47D85e748519CAa2F5f217782eB5A291A53A359a", // ViaERC20Collateral
    wrappedToken: "0xc16131616B78346eb58bfF11Fafc9895a7180d93", // ROB token on PulseChain

    // Bridge parameters
    destinationChainId: 84532, // Base Sepolia
    amount: process.argv[2]
      ? hre.ethers.parseEther(process.argv[2])
      : hre.ethers.parseEther("5"), // Default 5 tokens
    recipient: process.argv[3] || signer.address, // Default to sender

    // Destination info
    destinationContract: "0x49f6BF1E6597d8d1FCDC74FdBBE0AAb0369E0146", // ViaERC20 on Base Sepolia
  };

  console.log(`\n📋 Bridge Configuration:`);
  console.log(`   🏷️  Wrapped Token: ${config.wrappedToken}`);
  console.log(`   🌉 Bridge Contract: ${config.bridgeContract}`);
  console.log(`   💰 Amount: ${hre.ethers.formatEther(config.amount)} tokens`);
  console.log(
    `   🎯 Destination: Chain ${config.destinationChainId} (Base Sepolia)`
  );
  console.log(`   📧 Recipient: ${config.recipient}`);
  console.log(`   🏭 Destination Contract: ${config.destinationContract}`);

  // Verify we're on the correct network
  if (hre.network.name !== "pulsechain_testnet") {
    throw new Error(`❌ This script must be run on pulsechain_testnet network`);
  }

  // === CONTRACT INSTANCES ===
  const Bridge = await hre.ethers.getContractAt(
    "ViaERC20Collateral",
    config.bridgeContract
  );
  const Token = await hre.ethers.getContractAt("IERC20", config.wrappedToken);

  console.log(`\n🔍 STEP 1: Pre-Bridge Checks`);
  console.log(`=============================`);

  // Check token info
  try {
    const tokenSymbol = await Token.symbol();
    const tokenDecimals = await Token.decimals();
    console.log(`   📄 Token: ${tokenSymbol} (${tokenDecimals} decimals)`);
  } catch (error) {
    console.log(`   ⚠️  Unable to read token info: ${error.message}`);
  }

  // Check user balance
  const userBalance = await Token.balanceOf(signer.address);
  console.log(
    `   🪙 Your Balance: ${hre.ethers.formatEther(userBalance)} tokens`
  );

  if (userBalance < config.amount) {
    throw new Error(
      `❌ Insufficient balance. Have: ${hre.ethers.formatEther(
        userBalance
      )}, Need: ${hre.ethers.formatEther(config.amount)}`
    );
  }

  // Check bridge stats and limits
  try {
    const stats = await Bridge.getStats();
    const minAmount = await Bridge.minBridgeAmount();
    const maxAmount = await Bridge.maxBridgeAmount();
    const bridgeFee = await Bridge.bridgeFee();

    console.log(`\n📊 Bridge Statistics:`);
    console.log(
      `   🔒 Total Locked: ${hre.ethers.formatEther(stats[0])} tokens`
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
  } catch (error) {
    throw new Error(`❌ Chain support check failed: ${error.message}`);
  }

  console.log(`\n🔓 STEP 2: Token Approval`);
  console.log(`==========================`);

  // Check current allowance
  const currentAllowance = await Token.allowance(
    signer.address,
    config.bridgeContract
  );
  console.log(
    `   📊 Current Allowance: ${hre.ethers.formatEther(
      currentAllowance
    )} tokens`
  );

  if (currentAllowance < config.amount) {
    console.log(
      `   📤 Approving ${hre.ethers.formatEther(config.amount)} tokens...`
    );

    try {
      const approveTx = await Token.approve(
        config.bridgeContract,
        config.amount,
        {
          gasLimit: 100000,
        }
      );

      console.log(`   ⏳ Approval tx: ${approveTx.hash}`);
      await approveTx.wait();
      console.log(`   ✅ Approval confirmed`);

      // Verify approval
      const newAllowance = await Token.allowance(
        signer.address,
        config.bridgeContract
      );
      console.log(
        `   🔍 New Allowance: ${hre.ethers.formatEther(newAllowance)} tokens`
      );
    } catch (error) {
      throw new Error(`❌ Token approval failed: ${error.message}`);
    }
  } else {
    console.log(`   ✅ Sufficient allowance already exists`);
  }

  console.log(`\n🌉 STEP 3: Execute Bridge Transaction`);
  console.log(`=====================================`);

  try {
    // Estimate gas first
    console.log(`   ⛽ Estimating gas...`);
    const gasEstimate = await Bridge.bridge.estimateGas(
      config.destinationChainId,
      config.recipient,
      config.amount
    );
    console.log(`   ⛽ Estimated Gas: ${gasEstimate.toString()}`);

    // Execute bridge transaction
    console.log(`   📤 Sending bridge transaction...`);
    const bridgeTx = await Bridge.bridge(
      config.destinationChainId,
      config.recipient,
      config.amount,
      {
        gasLimit: Math.max(400000, Number(gasEstimate) * 2), // Use 2x estimated gas or 400k
        value: 0,
      }
    );

    console.log(`   📤 Bridge tx sent: ${bridgeTx.hash}`);
    console.log(`   ⏳ Waiting for confirmation...`);

    const receipt = await bridgeTx.wait();
    console.log(`   ✅ Bridge transaction confirmed!`);
    console.log(`   ⛽ Gas used: ${receipt.gasUsed.toString()}`);
    console.log(`   🧱 Block: ${receipt.blockNumber}`);

    console.log(`\n📋 STEP 4: Transaction Analysis`);
    console.log(`===============================`);

    // Parse events
    let bridgeEventFound = false;
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

    console.log(`\n📊 STEP 5: Final State`);
    console.log(`=======================`);

    // Check final balances and stats
    const finalUserBalance = await Token.balanceOf(signer.address);
    const finalStats = await Bridge.getStats();

    console.log(
      `   🪙 Your Token Balance: ${hre.ethers.formatEther(
        finalUserBalance
      )} tokens`
    );
    console.log(
      `   🔒 Total Locked in Bridge: ${hre.ethers.formatEther(
        finalStats[0]
      )} tokens`
    );
    console.log(
      `   📉 Tokens Transferred: ${hre.ethers.formatEther(
        userBalance - finalUserBalance
      )} tokens`
    );
    console.log(`   📈 Bridge Total Transactions: ${finalStats[2].toString()}`);
    console.log(
      `   🎯 Remaining Daily Limit: ${hre.ethers.formatEther(
        finalStats[4]
      )} tokens`
    );

    console.log(`\n🔍 STEP 6: Monitoring Information`);
    console.log(`==================================`);
    console.log(
      `   🔗 VIA Scanner: https://scan.vialabs.io/transaction/${bridgeTx.hash}`
    );
    console.log(`   ⏰ Cross-chain processing time: 2-10 minutes`);
    console.log(
      `   🎯 Destination chain: Base Sepolia (${config.destinationChainId})`
    );
    console.log(`   📧 Recipient address: ${config.recipient}`);
    console.log(`   🏭 Destination contract: ${config.destinationContract}`);
    if (txId) {
      console.log(`   🆔 Bridge Transaction ID: ${txId.toString()}`);
    }

    console.log(`\n✅ PRODUCTION BRIDGE TRANSACTION COMPLETED!`);
    console.log(`===========================================`);

    if (actualAmount && actualFee) {
      console.log(
        `💰 Net Amount Bridged: ${hre.ethers.formatEther(actualAmount)} tokens`
      );
      console.log(`💸 Fee Paid: ${hre.ethers.formatEther(actualFee)} tokens`);
    }

    console.log(`📱 Next steps:`);
    console.log(`   1. Wait 2-10 minutes for cross-chain processing`);
    console.log(`   2. Check VIA Scanner for message status`);
    console.log(`   3. Verify tokens minted on Base Sepolia`);
    console.log(`   4. Use reverse bridge script to test return journey`);
  } catch (error) {
    console.error(`\n❌ Bridge Transaction Failed:`);
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
    console.log(`   🏷️  Token Contract: ${config.wrappedToken}`);
    console.log(
      `   💰 Requested Amount: ${hre.ethers.formatEther(config.amount)}`
    );
    console.log(`   🎯 Destination Chain: ${config.destinationChainId}`);
    console.log(`   📧 Recipient: ${config.recipient}`);

    throw error;
  }
}

// Help function
function showHelp() {
  console.log(`\n🌉 Production Bridge Script Usage`);
  console.log(`================================`);
  console.log(
    `npx hardhat run scripts/production-bridge-to-base.js --network pulsechain_testnet [amount] [recipient]`
  );
  console.log(`\nParameters:`);
  console.log(`  amount    - Amount of tokens to bridge (default: 5)`);
  console.log(`  recipient - Recipient address (default: your address)`);
  console.log(`\nExamples:`);
  console.log(
    `  npx hardhat run scripts/production-bridge-to-base.js --network pulsechain_testnet`
  );
  console.log(
    `  npx hardhat run scripts/production-bridge-to-base.js --network pulsechain_testnet 10`
  );
  console.log(
    `  npx hardhat run scripts/production-bridge-to-base.js --network pulsechain_testnet 10 0x1234...`
  );
}

// Check for help flag
if (process.argv.includes("--help") || process.argv.includes("-h")) {
  showHelp();
  process.exit(0);
}

main().catch((error) => {
  console.error("\n💥 Production bridge script failed:", error.message);
  process.exitCode = 1;
});
