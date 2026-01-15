const hre = require("hardhat");
const { ethers } = hre;

/**
 * LATEST Bridge Script: Base Sepolia → PulseChain Testnet
 * Bridges synthetic tokens back to the collateral chain using the ViaSyntheticBridge contract.
 */

async function main() {
  const [signer] = await hre.ethers.getSigners();
  const networkName = hre.network.name;

  console.log(`\n🔥 LATEST REVERSE BRIDGE: Base Sepolia → PulseChain`);
  console.log(`======================================================`);
  console.log(`📍 Network: ${networkName}`);
  console.log(`👤 Signer: ${signer.address}`);

  // --- CONFIGURATION ---
  const config = {
    bridgeContract: "0x49f6BF1E6597d8d1FCDC74FdBBE0AAb0369E0146", // Address of ViaSyntheticBridge on Base Sepolia
    destinationChainId: 943, // PulseChain Testnet
    amount: process.argv[2] ? ethers.parseEther(process.argv[2]) : ethers.parseEther("3"),
    recipient: process.argv[3] || signer.address,
  };
  // --- END CONFIGURATION ---

  if (networkName !== "base_sepolia") {
    throw new Error(`❌ This script must be run on base_sepolia`);
  }

  console.log(`\n📋 Reverse Bridge Configuration:`);
  console.log(`   Bridge Contract (Synthetic): ${config.bridgeContract}`);
  console.log(`   Amount to Burn: ${ethers.formatEther(config.amount)} synthetic tokens`);
  console.log(`   Destination: Chain ${config.destinationChainId} (PulseChain Testnet)`);
  console.log(`   Recipient: ${config.recipient}`);

  // === CONTRACT INSTANCES ===
  const bridge = await ethers.getContractAt("ViaSyntheticBridge", config.bridgeContract);
  const feeToken = await ethers.getContractAt("IERC20", await bridge.feeToken());
  const wrappedGasTokenAddress = await bridge.getWrappedGasToken(config.destinationChainId);
  const wrappedGasToken = await ethers.getContractAt("IERC20", wrappedGasTokenAddress);

  console.log(`\n[STEP 1] Pre-Bridge Checks`);
  console.log(`=============================`);

  // Fetch fees
  const { protocolFee, viaSourceFee, viaDestGas } = await bridge.getBridgeFees(config.destinationChainId);
  const totalUsdcRequired = protocolFee + viaSourceFee;

  console.log(`   Synthetic Token: ${await bridge.symbol()} (${bridge.target})`);
  console.log(`   Fee Token (USDC): ${await feeToken.symbol()} (${feeToken.target})`);
  console.log(`   Gas Token (for Dest): ${await wrappedGasToken.symbol()} (${wrappedGasToken.target})`);

  console.log(`\n   Fees for Destination Chain ${config.destinationChainId}:`);
  console.log(`     - Protocol Fee: ${ethers.formatUnits(protocolFee, 6)} USDC`);
  console.log(`     - VIA Source Fee: ${ethers.formatUnits(viaSourceFee, 6)} USDC`);
  console.log(`     - VIA Dest Gas: ${ethers.formatEther(viaDestGas)} ${await wrappedGasToken.symbol()}`);
  console.log(`     - Total USDC Needed: ${ethers.formatUnits(totalUsdcRequired, 6)} USDC`);

  // Check balances
  const syntheticBalance = await bridge.balanceOf(signer.address);
  const feeTokenBalance = await feeToken.balanceOf(signer.address);
  const gasTokenBalance = await wrappedGasToken.balanceOf(signer.address);

  console.log(`\n   Your Balances:`);
  console.log(`     - Synthetic Token: ${ethers.formatEther(syntheticBalance)}`);
  console.log(`     - USDC: ${ethers.formatUnits(feeTokenBalance, 6)}`);
  console.log(`     - Wrapped Gas: ${ethers.formatEther(gasTokenBalance)}`);

  if (syntheticBalance < config.amount) {
    throw new Error(`❌ Insufficient synthetic token balance. Need ${ethers.formatEther(config.amount)}`);
  }
  if (feeTokenBalance < totalUsdcRequired) {
    throw new Error(`❌ Insufficient USDC balance. Need ${ethers.formatUnits(totalUsdcRequired, 6)}`);
  }
  if (gasTokenBalance < viaDestGas) {
    throw new Error(`❌ Insufficient wrapped gas token balance. Need ${ethers.formatEther(viaDestGas)}`);
  }

  console.log(`\n[STEP 2] Token Approvals`);
  console.log(`==========================`);
  // The synthetic token is the bridge contract itself, so no approval is needed to burn from self.
  // Approve USDC Fee
  await approveToken(feeToken, "USDC Fee", totalUsdcRequired, config.bridgeContract);
  // Approve Gas Token
  await approveToken(wrappedGasToken, "Wrapped Gas", viaDestGas, config.bridgeContract);

  console.log(`\n[STEP 3] Execute Reverse Bridge (Burn)`);
  console.log(`=======================================`);

  try {
    console.log(`   Estimating gas for burn-and-bridge transaction...`);
    const gasEstimate = await bridge.bridge.estimateGas(
      config.destinationChainId,
      config.recipient,
      config.amount
    );
    console.log(`   Estimated Gas: ${gasEstimate.toString()}`);

    console.log(`   Sending burn transaction...`);
    const tx = await bridge.bridge(
      config.destinationChainId,
      config.recipient,
      config.amount,
      { gasLimit: Number(gasEstimate) * 2 }
    );

    console.log(`   TX Sent: ${tx.hash}`);
    console.log(`   Waiting for confirmation...`);
    const receipt = await tx.wait();
    console.log(`   ✅ Burn transaction confirmed in block ${receipt.blockNumber}`);

    const burnedEvent = receipt.logs.map(log => {
        try { return bridge.interface.parseLog(log); } catch (e) { return null; }
    }).find(event => event && event.name === 'TokensBurned');

    if (burnedEvent) {
        console.log(`\n   Event 'TokensBurned' found:`);
        console.log(`     - Amount: ${ethers.formatEther(burnedEvent.args.amount)}`);
        console.log(`     - Protocol Fee: ${ethers.formatUnits(burnedEvent.args.protocolFee, 6)} USDC`);
    }

  } catch (error) {
    console.error(`\n❌ Burn Transaction Failed:`);
    console.error(`   ${error.message}`);
    throw error;
  }

  console.log(`\n[STEP 4] Post-Bridge State`);
  console.log(`===========================`);
  const newSyntheticBalance = await bridge.balanceOf(signer.address);
  const newFeeTokenBalance = await feeToken.balanceOf(signer.address);
  const newGasTokenBalance = await wrappedGasToken.balanceOf(signer.address);
  const totalSupply = await bridge.totalSupply();

  console.log(`   Your New Balances:`);
  console.log(`     - Synthetic Token: ${ethers.formatEther(newSyntheticBalance)}`);
  console.log(`     - USDC: ${ethers.formatUnits(newFeeTokenBalance, 6)}`);
  console.log(`     - Wrapped Gas: ${ethers.formatEther(newGasTokenBalance)}`);
  console.log(`\n   Synthetic Total Supply: ${ethers.formatEther(totalSupply)}`);

  console.log(`\n✅ LATEST REVERSE BRIDGE COMPLETED!`);
  console.log(`====================================`);
  console.log(`   🔗 VIA Scanner: https://scan.vialabs.io/transaction/${(await receipt).transactionHash}`);
  console.log(`   ⏰ Wait 2-10 minutes for collateral to be unlocked on PulseChain.`);
}

async function approveToken(token, name, amount, spender) {
    const [signer] = await ethers.getSigners();
    const allowance = await token.allowance(signer.address, spender);
    console.log(`\n   Checking ${name} allowance...`);
    const decimals = await token.decimals();
    console.log(`     Current allowance: ${ethers.formatUnits(allowance, decimals)}`);
    if (allowance < amount) {
        console.log(`     Approving ${ethers.formatUnits(amount, decimals)} ${name}...`);
        const tx = await token.approve(spender, amount);
        console.log(`     TX Sent: ${tx.hash}`);
        await tx.wait();
        console.log(`     ✅ ${name} approved.`);
    } else {
        console.log(`     ✅ Sufficient ${name} allowance exists.`);
    }
}

main().catch((error) => {
  console.error("\n💥 LATEST reverse bridge script failed:", error);
  process.exitCode = 1;
});
