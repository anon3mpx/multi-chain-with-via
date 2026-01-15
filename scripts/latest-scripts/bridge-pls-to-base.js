const hre = require("hardhat");
const { ethers } = hre;

/**
 * LATEST Bridge Script: PulseChain Testnet → Base Sepolia
 * Bridges collateral using the ViaCollateralBridge contract.
 */

async function main() {
  const [signer] = await hre.ethers.getSigners();
  const networkName = hre.network.name;

  console.log(`\n🌉 LATEST BRIDGE: PulseChain → Base Sepolia`);
  console.log(`===============================================`);
  console.log(`📍 Network: ${networkName}`);
  console.log(`👤 Signer: ${signer.address}`);

  // --- CONFIGURATION ---
  // These addresses should correspond to your deployment and configuration
  const config = {
    bridgeContract: "0x47D85e748519CAa2F5f217782eB5A291A53A359a", // Address of ViaCollateralBridge on PulseChain
    destinationChainId: 84532, // Base Sepolia
    amount: process.argv[2] ? ethers.parseEther(process.argv[2]) : ethers.parseEther("5"),
    recipient: process.argv[3] || signer.address,
  };
  // --- END CONFIGURATION ---

  if (networkName !== "pulsechain_testnet") {
    throw new Error(`❌ This script must be run on pulsechain_testnet`);
  }

  console.log(`\n📋 Bridge Configuration:`);
  console.log(`   Bridge Contract: ${config.bridgeContract}`);
  console.log(`   Amount: ${ethers.formatEther(config.amount)} collateral tokens`);
  console.log(`   Destination: Chain ${config.destinationChainId} (Base Sepolia)`);
  console.log(`   Recipient: ${config.recipient}`);

  // === CONTRACT INSTANCES ===
  const bridge = await ethers.getContractAt("ViaCollateralBridge", config.bridgeContract);
  const collateralToken = await ethers.getContractAt("IERC20", await bridge.collateralToken());
  const feeToken = await ethers.getContractAt("IERC20", await bridge.feeToken());
  const wrappedGasTokenAddress = await bridge.getWrappedGasToken(config.destinationChainId);
  const wrappedGasToken = await ethers.getContractAt("IERC20", wrappedGasTokenAddress);

  console.log(`\n[STEP 1] Pre-Bridge Checks`);
  console.log(`=============================`);

  // Fetch fees
  const { protocolFee, viaSourceFee, viaDestGas } = await bridge.getBridgeFees(config.destinationChainId);
  const totalUsdcRequired = protocolFee + viaSourceFee;

  console.log(`   Collateral Token: ${await collateralToken.symbol()} (${collateralToken.target})`);
  console.log(`   Fee Token (USDC): ${await feeToken.symbol()} (${feeToken.target})`);
  console.log(`   Gas Token (for Dest): ${await wrappedGasToken.symbol()} (${wrappedGasToken.target})`);

  console.log(`\n   Fees for Destination Chain ${config.destinationChainId}:`);
  console.log(`     - Protocol Fee: ${ethers.formatUnits(protocolFee, 6)} USDC`);
  console.log(`     - VIA Source Fee: ${ethers.formatUnits(viaSourceFee, 6)} USDC`);
  console.log(`     - VIA Dest Gas: ${ethers.formatEther(viaDestGas)} ${await wrappedGasToken.symbol()}`);
  console.log(`     - Total USDC Needed: ${ethers.formatUnits(totalUsdcRequired, 6)} USDC`);

  // Check balances
  const collateralBalance = await collateralToken.balanceOf(signer.address);
  const feeTokenBalance = await feeToken.balanceOf(signer.address);
  const gasTokenBalance = await wrappedGasToken.balanceOf(signer.address);

  console.log(`\n   Your Balances:`);
  console.log(`     - Collateral: ${ethers.formatEther(collateralBalance)}`);
  console.log(`     - USDC: ${ethers.formatUnits(feeTokenBalance, 6)}`);
  console.log(`     - Wrapped Gas: ${ethers.formatEther(gasTokenBalance)}`);

  if (collateralBalance < config.amount) {
    throw new Error(`❌ Insufficient collateral balance. Need ${ethers.formatEther(config.amount)}`);
  }
  if (feeTokenBalance < totalUsdcRequired) {
    throw new Error(`❌ Insufficient USDC balance. Need ${ethers.formatUnits(totalUsdcRequired, 6)}`);
  }
  if (gasTokenBalance < viaDestGas) {
    throw new Error(`❌ Insufficient wrapped gas token balance. Need ${ethers.formatEther(viaDestGas)}`);
  }

  console.log(`\n[STEP 2] Token Approvals`);
  console.log(`==========================`);

  // Approve Collateral
  await approveToken(collateralToken, "Collateral", config.amount, config.bridgeContract);
  // Approve USDC Fee
  await approveToken(feeToken, "USDC Fee", totalUsdcRequired, config.bridgeContract);
  // Approve Gas Token
  await approveToken(wrappedGasToken, "Wrapped Gas", viaDestGas, config.bridgeContract);

  console.log(`\n[STEP 3] Execute Bridge Transaction`);
  console.log(`=====================================`);

  try {
    console.log(`   Estimating gas for bridge transaction...`);
    const gasEstimate = await bridge.bridge.estimateGas(
      config.destinationChainId,
      config.recipient,
      config.amount
    );
    console.log(`   Estimated Gas: ${gasEstimate.toString()}`);

    console.log(`   Sending bridge transaction...`);
    const tx = await bridge.bridge(
      config.destinationChainId,
      config.recipient,
      config.amount,
      { gasLimit: Number(gasEstimate) * 2 }
    );

    console.log(`   TX Sent: ${tx.hash}`);
    console.log(`   Waiting for confirmation...`);
    const receipt = await tx.wait();
    console.log(`   ✅ Bridge transaction confirmed in block ${receipt.blockNumber}`);

    const lockedEvent = receipt.logs.map(log => {
        try { return bridge.interface.parseLog(log); } catch (e) { return null; }
    }).find(event => event && event.name === 'TokensLocked');

    if (lockedEvent) {
        console.log(`\n   Event 'TokensLocked' found:`);
        console.log(`     - Amount: ${ethers.formatEther(lockedEvent.args.amount)}`);
        console.log(`     - Protocol Fee: ${ethers.formatUnits(lockedEvent.args.protocolFee, 6)} USDC`);
        console.log(`     - VIA Fees: ${ethers.formatUnits(lockedEvent.args.viaSourceFee, 6)} USDC + ${ethers.formatEther(lockedEvent.args.viaDestGas)} Gas Token`);
    }

  } catch (error) {
    console.error(`\n❌ Bridge Transaction Failed:`);
    console.error(`   ${error.message}`);
    throw error;
  }

  console.log(`\n[STEP 4] Post-Bridge State`);
  console.log(`===========================`);
  const newCollateralBalance = await collateralToken.balanceOf(signer.address);
  const newFeeTokenBalance = await feeToken.balanceOf(signer.address);
  const newGasTokenBalance = await wrappedGasToken.balanceOf(signer.address);
  const totalLocked = await bridge.totalLocked();

  console.log(`   Your New Balances:`);
  console.log(`     - Collateral: ${ethers.formatEther(newCollateralBalance)}`);
  console.log(`     - USDC: ${ethers.formatUnits(newFeeTokenBalance, 6)}`);
  console.log(`     - Wrapped Gas: ${ethers.formatEther(newGasTokenBalance)}`);
  console.log(`\n   Bridge Total Locked: ${ethers.formatEther(totalLocked)}`);

  console.log(`\n✅ LATEST BRIDGE TRANSACTION COMPLETED!`);
  console.log(`=======================================`);
  console.log(`   🔗 VIA Scanner: https://scan.vialabs.io/transaction/${(await receipt).transactionHash}`);
  console.log(`   ⏰ Wait 2-10 minutes for tokens to be minted on Base Sepolia.`);
}

async function approveToken(token, name, amount, spender) {
    const [signer] = await ethers.getSigners();
    const allowance = await token.allowance(signer.address, spender);
    console.log(`\n   Checking ${name} allowance...`);
    console.log(`     Current allowance: ${ethers.formatUnits(allowance, await token.decimals())}`);
    if (allowance < amount) {
        console.log(`     Approving ${ethers.formatUnits(amount, await token.decimals())} ${name}...`);
        const tx = await token.approve(spender, amount);
        console.log(`     TX Sent: ${tx.hash}`);
        await tx.wait();
        console.log(`     ✅ ${name} approved.`);
    } else {
        console.log(`     ✅ Sufficient ${name} allowance exists.`);
    }
}

main().catch((error) => {
  console.error("\n💥 LATEST bridge script failed:", error);
  process.exitCode = 1;
});
