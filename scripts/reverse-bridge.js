const hre = require("hardhat");

async function main() {
  const [signer] = await hre.ethers.getSigners();

  console.log(`\n🔄 Reverse Bridge Testing Script (Base Sepolia → PulseChain)`);
  console.log(`📍 Network: ${hre.network.name}`);
  console.log(`👤 Signer: ${signer.address}`);

  // --- CONFIGURATION FOR BASE SEPOLIA ---
  const contractAddress = "0x19BBE0f501251aC16Fcc72cc9AF8678Fc6AAC594"; // Base Sepolia ViaERC20
  const amount = hre.ethers.parseEther("5"); // Bridge 5 tokens back
  const destinationChainId = 943; // PulseChain Testnet
  const recipientAddress = signer.address;

  console.log(`\n📋 Reverse Bridge Parameters:`);
  console.log(`   🌉 Bridge Contract (ViaERC20): ${contractAddress}`);
  console.log(`   💰 Amount: ${hre.ethers.formatEther(amount)} tokens`);
  console.log(
    `   🎯 Destination Chain: ${destinationChainId} (PulseChain Testnet)`
  );
  console.log(`   📧 Recipient: ${recipientAddress}`);

  // ABI for ViaERC20 (burn-and-mint) contract
  const bridgeAbi = [
    "function bridge(uint32 _destChainId, address _recipient, uint256 _amount)",
    "function balanceOf(address owner) view returns (uint256)",
    "function symbol() view returns (string)",
    "function decimals() view returns (uint8)",
    "function totalSupply() view returns (uint256)",
    "event TokensBridged(address indexed sender, uint32 indexed destChainId, address indexed recipient, uint256 amount)",
  ];

  // Get contract instance
  const Bridge = new hre.ethers.Contract(contractAddress, bridgeAbi, signer);

  // --- STEP 1: CHECK TOKEN BALANCE ---
  console.log(`\n💰 Token Balance Check:`);

  try {
    const tokenBalance = await Bridge.balanceOf(signer.address);
    const tokenSymbol = await Bridge.symbol();
    const tokenDecimals = await Bridge.decimals();
    const totalSupply = await Bridge.totalSupply();

    console.log(`   📄 Token: ${tokenSymbol} (${tokenDecimals} decimals)`);
    console.log(
      `   🪙 Your Balance: ${hre.ethers.formatEther(
        tokenBalance
      )} ${tokenSymbol}`
    );
    console.log(
      `   🏭 Total Supply: ${hre.ethers.formatEther(
        totalSupply
      )} ${tokenSymbol}`
    );

    if (tokenBalance < amount) {
      console.log(`\n⚠️  Insufficient balance for bridging!`);
      console.log(
        `   Have: ${hre.ethers.formatEther(tokenBalance)} ${tokenSymbol}`
      );
      console.log(`   Need: ${hre.ethers.formatEther(amount)} ${tokenSymbol}`);
      console.log(
        `\n💡 This is expected if no tokens have been bridged to Base Sepolia yet.`
      );
      console.log(
        `   Wait for the previous bridge transaction to complete, then try again.`
      );
      return;
    }
  } catch (error) {
    console.error(`   ❌ Error checking balance: ${error.message}`);
    throw error;
  }

  // --- STEP 2: BRIDGE TOKENS (BURN AND MINT) ---
  console.log(
    `\n🔥 Bridge Transaction (Burn on Base Sepolia, Mint on PulseChain):`
  );
  console.log(
    `   📤 Burning ${hre.ethers.formatEther(amount)} tokens on Base Sepolia...`
  );

  try {
    // Estimate gas
    console.log(`   ⛽ Estimating gas...`);
    const gasEstimate = await Bridge.bridge.estimateGas(
      destinationChainId,
      recipientAddress,
      amount
    );
    console.log(`   ⛽ Estimated Gas: ${gasEstimate.toString()}`);

    // Execute bridge transaction
    const bridgeTx = await Bridge.bridge(
      destinationChainId,
      recipientAddress,
      amount,
      {
        gasLimit: Math.max(200000, Number(gasEstimate) * 2),
        value: 0,
      }
    );

    console.log(`   📤 Bridge tx sent: ${bridgeTx.hash}`);
    console.log(`   ⏳ Waiting for confirmation...`);

    const receipt = await bridgeTx.wait();
    console.log(`   ✅ Bridge transaction confirmed!`);
    console.log(`   ⛽ Gas used: ${receipt.gasUsed.toString()}`);
    console.log(`   🧱 Block: ${receipt.blockNumber}`);

    // --- STEP 3: ANALYZE EVENTS ---
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

        if (parsed.name === "Transfer") {
          console.log(
            `      🔄 Transfer: ${hre.ethers.formatEther(
              parsed.args.value
            )} tokens`
          );
          console.log(`      📤 From: ${parsed.args.from}`);
          console.log(`      📥 To: ${parsed.args.to}`);
        }
      } catch (e) {
        console.log(`   ${index + 1}. Raw log (topic: ${log.topics[0]})`);
      }
    });

    if (!bridgeEventFound) {
      console.log(`   ⚠️  No TokensBridged event found - check transaction`);
    }

    // --- STEP 4: FINAL STATE ---
    console.log(`\n📊 Final State:`);

    const finalBalance = await Bridge.balanceOf(signer.address);
    const finalTotalSupply = await Bridge.totalSupply();

    console.log(
      `   🪙 Your Token Balance: ${hre.ethers.formatEther(finalBalance)}`
    );
    console.log(
      `   🏭 Total Supply: ${hre.ethers.formatEther(finalTotalSupply)}`
    );
    console.log(`   🔥 Tokens Burned: ${hre.ethers.formatEther(amount)}`);

    // --- STEP 5: MONITORING INSTRUCTIONS ---
    console.log(`\n🔍 Monitoring Instructions:`);
    console.log(
      `   1. 🔗 VIA Scanner: https://scan.vialabs.io/transaction/${bridgeTx.hash}`
    );
    console.log(
      `   2. ⏰ Wait 2-10 minutes for cross-chain message processing`
    );
    console.log(`   3. 🎯 Check PulseChain Testnet for unlocked tokens`);
    console.log(`   4. 📧 Recipient: ${recipientAddress}`);
    console.log(
      `   5. 🏭 PulseChain Contract: 0x91E34254655381F873bC50EA1e7Ac9fD4594FAD8`
    );
    console.log(`\n✅ Reverse bridge transaction completed successfully!`);
  } catch (error) {
    console.error(`\n❌ Reverse bridge transaction failed:`);
    console.error(`   💬 Message: ${error.message}`);

    if (error.reason) {
      console.error(`   🔍 Reason: ${error.reason}`);
    }

    throw error;
  }
}

main().catch((error) => {
  console.error("\n💥 Reverse bridge script failed:", error.message);
  process.exitCode = 1;
});
