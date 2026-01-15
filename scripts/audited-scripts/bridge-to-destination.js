const hre = require("hardhat");
const { ethers } = hre;
const {
    CHAINS,
    getDeployment,
    getChainByNetworkName,
    getFeeToken,
    getWrappedGasToken,
} = require("./config");

/**
 * Bridge tokens from collateral chain (PulseChain) to a destination chain
 * 
 * This script:
 * 1. Checks balances and fees
 * 2. Approves collateral token, fee token (USDC), and wrapped gas token
 * 3. Executes the bridge transaction with slippage protection
 * 
 * Usage:
 *   npx hardhat run scripts/audited-scripts/bridge-to-destination.js --network pulsechain WPLS base 10
 *   npx hardhat run scripts/audited-scripts/bridge-to-destination.js --network pulsechain_testnet WPLS base_sepolia 1
 */

async function main() {
    const [signer] = await ethers.getSigners();
    const networkName = hre.network.name;
    const chainId = hre.network.config.chainId;

    // Parse arguments
    const tokenSymbol = process.argv[2] || process.env.TOKEN_SYMBOL;
    const destChainName = process.argv[3] || process.env.DEST_CHAIN;
    const amountStr = process.argv[4] || process.env.AMOUNT || "1";
    const recipientAddress = process.argv[5] || process.env.RECIPIENT || signer.address;

    if (!tokenSymbol || !destChainName) {
        console.error("❌ Usage: npx hardhat run bridge-to-destination.js --network <network> <TOKEN_SYMBOL> <DEST_CHAIN> [AMOUNT] [RECIPIENT]");
        console.error("   Example: npx hardhat run bridge-to-destination.js --network pulsechain WPLS base 10");
        process.exit(1);
    }

    const amount = ethers.parseEther(amountStr);

    console.log(`\n🌉 BRIDGE TO DESTINATION CHAIN`);
    console.log(`═══════════════════════════════════════════════════════`);
    console.log(`📍 Source Network: ${networkName} (Chain ID: ${chainId})`);
    console.log(`👤 Signer: ${signer.address}`);
    console.log(`🎯 Token: ${tokenSymbol}`);
    console.log(`🌐 Destination: ${destChainName}`);
    console.log(`💰 Amount: ${amountStr}`);
    console.log(`📧 Recipient: ${recipientAddress}`);

    // Validate current chain is collateral
    const currentChain = getChainByNetworkName(networkName);
    if (!currentChain || currentChain.type !== "collateral") {
        console.error(`❌ This script must be run on a collateral chain (PulseChain).`);
        process.exit(1);
    }

    // Get deployments
    const currentDeployment = getDeployment(tokenSymbol, networkName);
    const destDeployment = getDeployment(tokenSymbol, destChainName);
    const destChain = getChainByNetworkName(destChainName);

    if (!currentDeployment) {
        console.error(`❌ No deployment found for ${tokenSymbol} on ${networkName}`);
        process.exit(1);
    }
    if (!destDeployment) {
        console.error(`❌ No deployment found for ${tokenSymbol} on ${destChainName}`);
        process.exit(1);
    }

    console.log(`\n📍 Bridge Contract: ${currentDeployment.address}`);
    console.log(`🌐 Destination Contract: ${destDeployment.address}`);

    // Get contract instance
    const bridge = await ethers.getContractAt(
        "contracts/updated-v6/via-collateral-v6.sol:ViaCollateralBridgeV6",
        currentDeployment.address
    );

    // Get token contracts
    const collateralTokenAddress = await bridge.collateralToken();
    const feeTokenAddress = await bridge.feeToken();
    const wrappedGasTokenAddress = await bridge.getWrappedGasToken(destChain.chainId);

    const collateralToken = await ethers.getContractAt("IERC20", collateralTokenAddress);
    const feeToken = await ethers.getContractAt("IERC20", feeTokenAddress);
    const wrappedGasToken = await ethers.getContractAt("IERC20", wrappedGasTokenAddress);

    console.log(`\n[STEP 1] Pre-Bridge Checks`);
    console.log(`═══════════════════════════════════════════════════════`);

    // Fetch fees
    const fees = await bridge.getBridgeFees(destChain.chainId);
    const protocolFee = fees.protocolFee;
    const viaSourceFee = fees.viaSourceFee;
    const viaDestGas = fees.viaDestGas;
    const totalUsdcRequired = protocolFee + viaSourceFee;

    console.log(`   Collateral Token: ${collateralTokenAddress}`);
    console.log(`   Fee Token (USDC): ${feeTokenAddress}`);
    console.log(`   Wrapped Gas Token: ${wrappedGasTokenAddress}`);

    console.log(`\n   Fees for Chain ${destChain.chainId}:`);
    console.log(`     Protocol Fee: ${ethers.formatUnits(protocolFee, 6)} USDC`);
    console.log(`     VIA Source Fee: ${ethers.formatUnits(viaSourceFee, 6)} USDC`);
    console.log(`     VIA Dest Gas: ${ethers.formatEther(viaDestGas)} (wrapped gas token)`);
    console.log(`     Total USDC Needed: ${ethers.formatUnits(totalUsdcRequired, 6)} USDC`);

    // Check balances
    const collateralBalance = await collateralToken.balanceOf(signer.address);
    const feeTokenBalance = await feeToken.balanceOf(signer.address);
    const gasTokenBalance = await wrappedGasToken.balanceOf(signer.address);

    console.log(`\n   Your Balances:`);
    console.log(`     Collateral: ${ethers.formatEther(collateralBalance)}`);
    console.log(`     USDC: ${ethers.formatUnits(feeTokenBalance, 6)}`);
    console.log(`     Wrapped Gas: ${ethers.formatEther(gasTokenBalance)}`);

    if (collateralBalance < amount) {
        throw new Error(`Insufficient collateral balance. Need ${amountStr}, have ${ethers.formatEther(collateralBalance)}`);
    }
    if (feeTokenBalance < totalUsdcRequired) {
        throw new Error(`Insufficient USDC balance. Need ${ethers.formatUnits(totalUsdcRequired, 6)}`);
    }
    if (gasTokenBalance < viaDestGas) {
        throw new Error(`Insufficient wrapped gas token balance. Need ${ethers.formatEther(viaDestGas)}`);
    }

    console.log(`\n[STEP 2] Token Approvals`);
    console.log(`═══════════════════════════════════════════════════════`);

    await approveToken(collateralToken, "Collateral", amount, currentDeployment.address);
    await approveToken(feeToken, "USDC Fee", totalUsdcRequired, currentDeployment.address);
    await approveToken(wrappedGasToken, "Wrapped Gas", viaDestGas, currentDeployment.address);

    console.log(`\n[STEP 3] Execute Bridge Transaction`);
    console.log(`═══════════════════════════════════════════════════════`);

    // Set slippage tolerance for viaDestGas (e.g., 20% buffer)
    const maxViaDestGas = (viaDestGas * 120n) / 100n;
    console.log(`   Max VIA Dest Gas (with 20% slippage): ${ethers.formatEther(maxViaDestGas)}`);

    try {
        console.log(`   Estimating gas...`);
        const gasEstimate = await bridge.bridge.estimateGas(
            destChain.chainId,
            recipientAddress,
            amount,
            maxViaDestGas
        );
        console.log(`   Estimated Gas: ${gasEstimate.toString()}`);

        console.log(`   Sending bridge transaction...`);
        const tx = await bridge.bridge(
            destChain.chainId,
            recipientAddress,
            amount,
            maxViaDestGas,
            { gasLimit: Number(gasEstimate) * 2 }
        );

        console.log(`   TX Sent: ${tx.hash}`);
        console.log(`   Waiting for confirmation...`);

        const receipt = await tx.wait();
        console.log(`   ✅ Bridge transaction confirmed! Block: ${receipt.blockNumber}`);

        // Parse events
        const lockedEvent = receipt.logs.map(log => {
            try {
                return bridge.interface.parseLog(log);
            } catch (e) {
                return null;
            }
        }).find(event => event && event.name === "TokensLocked");

        if (lockedEvent) {
            console.log(`\n   📋 TokensLocked Event:`);
            console.log(`     Amount: ${ethers.formatEther(lockedEvent.args.amount)}`);
            console.log(`     Protocol Fee: ${ethers.formatUnits(lockedEvent.args.protocolFee, 6)} USDC`);
            console.log(`     VIA Source Fee: ${ethers.formatUnits(lockedEvent.args.viaSourceFee, 6)} USDC`);
            console.log(`     VIA Dest Gas: ${ethers.formatEther(lockedEvent.args.viaDestGas)}`);
        }

        console.log(`\n[STEP 4] Post-Bridge State`);
        console.log(`═══════════════════════════════════════════════════════`);

        const newCollateralBalance = await collateralToken.balanceOf(signer.address);
        const totalLocked = await bridge.totalLocked();

        console.log(`   Your New Collateral Balance: ${ethers.formatEther(newCollateralBalance)}`);
        console.log(`   Bridge Total Locked: ${ethers.formatEther(totalLocked)}`);

        console.log(`\n✅ BRIDGE TRANSACTION COMPLETED!`);
        console.log(`═══════════════════════════════════════════════════════`);
        console.log(`   🔗 VIA Scanner: https://scan.vialabs.io/transaction/${receipt.hash}`);
        console.log(`   ⏰ Wait 2-10 minutes for tokens to be minted on ${destChainName}.`);
        console.log(`   📧 Recipient: ${recipientAddress}`);
        console.log(`   🌐 Destination Contract: ${destDeployment.address}`);

    } catch (error) {
        console.error(`\n❌ Bridge Transaction Failed:`);
        console.error(`   ${error.message}`);
        throw error;
    }
}

async function approveToken(token, name, amount, spender) {
    const [signer] = await ethers.getSigners();
    const allowance = await token.allowance(signer.address, spender);
    let decimals;
    try {
        decimals = await token.decimals();
    } catch {
        decimals = 18;
    }

    console.log(`\n   Checking ${name} allowance...`);
    console.log(`     Current: ${ethers.formatUnits(allowance, decimals)}`);

    if (allowance < amount) {
        console.log(`     Approving ${ethers.formatUnits(amount, decimals)} ${name}...`);
        const tx = await token.approve(spender, amount);
        console.log(`     TX: ${tx.hash}`);
        await tx.wait();
        console.log(`     ✅ ${name} approved.`);
    } else {
        console.log(`     ✅ Sufficient ${name} allowance exists.`);
    }
}

main().catch((error) => {
    console.error("\n❌ Bridge script failed:", error.message);
    process.exit(1);
});
