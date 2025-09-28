const hre = require("hardhat");

async function main() {
  const [signer] = await hre.ethers.getSigners();

  console.log(`\n🌉 Enhanced Bridge Testing Script`);
  console.log(`📍 Network: ${hre.network.name}`);
  console.log(`👤 Signer: ${signer.address}`);

  // --- CONFIGURATION ---
  const contractAddress = "0x91E34254655381F873bC50EA1e7Ac9fD4594FAD8"; // Updated address from your deployment V2
  const tokenAddress = "0xc16131616B78346eb58bfF11Fafc9895a7180d93";
  const amount = hre.ethers.parseEther("10"); // Reduced amount for testing
  const destinationChainId = 84532; // Base Sepolia
  const recipientAddress = signer.address;

  console.log(`\n📋 Bridge Parameters:`);
  console.log(`   🏷️  Token Address: ${tokenAddress}`);
  console.log(`   🌉 Bridge Contract: ${contractAddress}`);
  console.log(`   💰 Amount: ${hre.ethers.formatEther(amount)} tokens`);
  console.log(`   🎯 Destination Chain: ${destinationChainId} (Base Sepolia)`);
  console.log(`   📧 Recipient: ${recipientAddress}`);

  // Enhanced ABI with debug functions
  const bridgeAbi = [
    "function bridge(uint32 _destChainId, address _recipient, uint256 _amount)",
    "function totalLocked() external view returns (uint256)",
    "function debugCurrentState()",
    "event TokensBridged(address indexed sender, uint32 indexed destChainId, address indexed recipient, uint256 amount, bytes data)",
    "event DebugInfo(string message, uint256 value)",
    "event DebugAddress(string message, address addr)",
  ];

  const tokenAbi = [
    "function balanceOf(address owner) view returns (uint256)",
    "function allowance(address owner, address spender) view returns (uint256)",
    "function approve(address spender, uint256 amount) returns (bool)",
    "function symbol() view returns (string)",
    "function decimals() view returns (uint8)",
  ];

  // Get contract instances
  const Bridge = new hre.ethers.Contract(contractAddress, bridgeAbi, signer);
  const Token = new hre.ethers.Contract(tokenAddress, tokenAbi, signer);

  // --- STEP 0: INITIAL DIAGNOSTICS ---
  console.log(`\n🔍 Initial Diagnostics:`);

  try {
    const tokenSymbol = await Token.symbol();
    const tokenDecimals = await Token.decimals();
    console.log(`   📄 Token: ${tokenSymbol} (${tokenDecimals} decimals)`);
  } catch (error) {
    console.log(`   ⚠️  Unable to read token info: ${error.message}`);
  }

  try {
    const totalLocked = await Bridge.totalLocked();
    console.log(
      `   🔒 Total Locked: ${hre.ethers.formatEther(totalLocked)} tokens`
    );
  } catch (error) {
    console.log(`   ⚠️  Unable to read total locked: ${error.message}`);
  }

  // Run debug function if available
  try {
    console.log(`   🔧 Running debug state check...`);
    const debugTx = await Bridge.debugCurrentState();
    const debugReceipt = await debugTx.wait();

    console.log(`   📋 Debug Events:`);
    debugReceipt.logs.forEach((log, index) => {
      try {
        const parsed = Bridge.interface.parseLog(log);
        console.log(
          `      ${index + 1}. ${parsed.name}: ${JSON.stringify(parsed.args)}`
        );
      } catch (e) {
        // Ignore unparseable logs
      }
    });
  } catch (error) {
    console.log(`   ℹ️  Debug function not available (using regular contract)`);
  }

  // --- STEP 1: CHECK BALANCES ---
  console.log(`\n💰 Balance Check:`);

  const tokenBalance = await Token.balanceOf(signer.address);
  console.log(
    `   🪙 Your Token Balance: ${hre.ethers.formatEther(tokenBalance)}`
  );

  const allowance = await Token.allowance(signer.address, contractAddress);
  console.log(`   ✅ Current Allowance: ${hre.ethers.formatEther(allowance)}`);

  if (tokenBalance < amount) {
    throw new Error(
      `❌ Insufficient token balance. Have: ${hre.ethers.formatEther(
        tokenBalance
      )}, Need: ${hre.ethers.formatEther(amount)}`
    );
  }

  // --- STEP 2: APPROVE TOKENS ---
  console.log(`\n🔓 Token Approval:`);

  if (allowance < amount) {
    console.log(`   📤 Approving ${hre.ethers.formatEther(amount)} tokens...`);

    try {
      const approveTx = await Token.approve(contractAddress, amount, {
        gasLimit: 100000,
      });
      console.log(`   ⏳ Approval tx: ${approveTx.hash}`);
      await approveTx.wait();
      console.log(`   ✅ Approval confirmed`);

      // Verify approval
      const newAllowance = await Token.allowance(
        signer.address,
        contractAddress
      );
      console.log(
        `   🔍 New Allowance: ${hre.ethers.formatEther(newAllowance)}`
      );
    } catch (error) {
      console.error(`   ❌ Approval failed: ${error.message}`);
      throw error;
    }
  } else {
    console.log(`   ✅ Sufficient allowance already exists`);
  }

  // --- STEP 3: BRIDGE TOKENS ---
  console.log(`\n🌉 Bridge Transaction:`);
  console.log(
    `   📤 Sending ${hre.ethers.formatEther(
      amount
    )} tokens to chain ${destinationChainId}...`
  );

  try {
    // First, let's try to estimate gas to catch issues early
    console.log(`   ⛽ Estimating gas...`);

    const gasEstimate = await Bridge.bridge.estimateGas(
      destinationChainId,
      recipientAddress,
      amount
    );
    console.log(`   ⛽ Estimated Gas: ${gasEstimate.toString()}`);

    // Now execute the transaction
    const bridgeTx = await Bridge.bridge(
      destinationChainId,
      recipientAddress,
      amount,
      {
        gasLimit: Math.max(300000, Number(gasEstimate) * 2), // Use 2x estimated gas or 300k, whichever is higher
        value: 0,
      }
    );

    console.log(`   📤 Bridge tx sent: ${bridgeTx.hash}`);
    console.log(`   ⏳ Waiting for confirmation...`);

    const receipt = await bridgeTx.wait();
    console.log(`   ✅ Bridge transaction confirmed!`);
    console.log(`   ⛽ Gas used: ${receipt.gasUsed.toString()}`);
    console.log(`   🧱 Block: ${receipt.blockNumber}`);

    // --- STEP 4: ANALYZE EVENTS ---
    console.log(`\n📋 Transaction Events:`);

    let bridgeEventFound = false;
    receipt.logs.forEach((log, index) => {
      try {
        const parsed = Bridge.interface.parseLog(log);
        console.log(`   ${index + 1}. ${parsed.name}`);

        if (parsed.name === "TokensBridged") {
          bridgeEventFound = true;
          console.log(`      👤 Sender: ${parsed.args.sender}`);
          console.log(`      🎯 Destination Chain: ${parsed.args.destChainId}`);
          console.log(`      📧 Recipient: ${parsed.args.recipient}`);
          console.log(
            `      💰 Amount: ${hre.ethers.formatEther(parsed.args.amount)}`
          );
        }

        if (parsed.name === "DebugInfo") {
          console.log(`      💬 ${parsed.args.message}: ${parsed.args.value}`);
        }

        if (parsed.name === "DebugAddress") {
          console.log(`      🏠 ${parsed.args.message}: ${parsed.args.addr}`);
        }
      } catch (e) {
        console.log(`   ${index + 1}. Raw log (topic: ${log.topics[0]})`);
      }
    });

    if (!bridgeEventFound) {
      console.log(
        `   ⚠️  No TokensBridged event found - this might indicate an issue`
      );
    }

    // --- STEP 5: FINAL STATE ---
    console.log(`\n📊 Final State:`);

    const finalTokenBalance = await Token.balanceOf(signer.address);
    const finalTotalLocked = await Bridge.totalLocked();

    console.log(
      `   🪙 Your Token Balance: ${hre.ethers.formatEther(finalTokenBalance)}`
    );
    console.log(
      `   🔒 Total Locked in Bridge: ${hre.ethers.formatEther(
        finalTotalLocked
      )}`
    );
    console.log(
      `   📉 Tokens Transferred: ${hre.ethers.formatEther(
        tokenBalance - finalTokenBalance
      )}`
    );

    // --- STEP 6: MONITORING INSTRUCTIONS ---
    console.log(`\n🔍 Monitoring Instructions:`);
    console.log(
      `   1. 🔗 Check VIA Scanner: https://scan.vialabs.io/transaction/${bridgeTx.hash}`
    );
    console.log(`   2. ⏰ Cross-chain messages typically take 2-10 minutes`);
    console.log(
      `   3. 🎯 Check destination chain (Base Sepolia) for minted tokens`
    );
    console.log(`   4. 📧 Recipient address: ${recipientAddress}`);
    console.log(
      `   5. 🏭 Destination contract: 0x19BBE0f501251aC16Fcc72cc9AF8678Fc6AAC594`
    ); // From your deployment logs
  } catch (error) {
    console.error(`\n❌ Bridge transaction failed:`);
    console.error(`   💬 Message: ${error.message}`);

    if (error.reason) {
      console.error(`   🔍 Reason: ${error.reason}`);
    }

    if (error.data) {
      console.error(`   📊 Data: ${error.data}`);
    }

    // Specific error handling
    if (error.message.includes("cannot send to zero address")) {
      console.error(`\n🔧 DIAGNOSIS: "Cannot send to zero address" error`);
      console.error(
        `   This means your contract is not properly configured with the destination chain.`
      );
      console.error(`   
   🚨 SOLUTION STEPS:
   1. Verify both contracts are deployed:
      - PulseChain Testnet (943): ${contractAddress}
      - Base Sepolia (84532): 0x19BBE0f501251aC16Fcc72cc9AF8678Fc6AAC594
   
   2. Run configuration script on BOTH chains:
      npx hardhat run scripts/configure-bridge.js --network pulsechain_testnet
      npx hardhat run scripts/configure-bridge.js --network base_sepolia
   
   3. Verify deployments.json contains both deployments
   
   4. Check VIA Labs chain configuration for correct MessageV3 addresses`);
    }

    throw error;
  }
}

main().catch((error) => {
  console.error("\n💥 Script execution failed:", error.message);
  process.exitCode = 1;
});
