const hre = require("hardhat");
const { ethers } = hre;
const {
    CHAINS,
    getDeployment,
    getChainByNetworkName,
} = require("./config");

/**
 * Bridge tokens from synthetic chain back to collateral chain (PulseChain)
 * 
 * This script burns synthetic tokens and triggers unlock on the origin chain.
 * 
 * Usage:
 *   npx hardhat run scripts/audited-scripts/bridge-to-origin.js --network base WPLS 5
 *   npx hardhat run scripts/audited-scripts/bridge-to-origin.js --network base_sepolia WPLS 1
 */

async function main() {
    const [signer] = await ethers.getSigners();
    const networkName = hre.network.name;
    const chainId = hre.network.config.chainId;

    // Parse arguments
    const tokenSymbol = process.argv[2] || process.env.TOKEN_SYMBOL;
    const amountStr = process.argv[3] || process.env.AMOUNT || "1";
    const recipientAddress = process.argv[4] || process.env.RECIPIENT || signer.address;

    if (!tokenSymbol) {
        console.error("❌ Usage: npx hardhat run bridge-to-origin.js --network <network> <TOKEN_SYMBOL> [AMOUNT] [RECIPIENT]");
        console.error("   Example: npx hardhat run bridge-to-origin.js --network base WPLS 5");
        process.exit(1);
    }

    const amount = ethers.parseEther(amountStr);

    console.log(`\n🔥 REVERSE BRIDGE TO ORIGIN (Burn Synthetic)`);
    console.log(`═══════════════════════════════════════════════════════`);
    console.log(`📍 Source Network: ${networkName} (Chain ID: ${chainId})`);
    console.log(`👤 Signer: ${signer.address}`);
    console.log(`🎯 Token: ${tokenSymbol}`);
    console.log(`💰 Amount to Burn: ${amountStr}`);
    console.log(`📧 Recipient: ${recipientAddress}`);

    // Validate current chain is synthetic
    const currentChain = getChainByNetworkName(networkName);
    if (!currentChain || currentChain.type !== "synthetic") {
        console.error(`❌ This script must be run on a synthetic/destination chain.`);
        process.exit(1);
    }

    // Get current deployment
    const currentDeployment = getDeployment(tokenSymbol, networkName);
    if (!currentDeployment) {
        console.error(`❌ No deployment found for ${tokenSymbol} on ${networkName}`);
        process.exit(1);
    }

    // Find origin chain deployment (collateral)
    const { getAllDeploymentsForToken, isTestnet } = require("./config");
    const allDeployments = getAllDeploymentsForToken(tokenSymbol);
    const isCurrentTestnet = isTestnet(networkName);

    let originChainName = null;
    let originDeployment = null;
    let originChain = null;

    for (const [name, deployment] of Object.entries(allDeployments)) {
        if (deployment.type === "collateral" && isTestnet(name) === isCurrentTestnet) {
            originChainName = name;
            originDeployment = deployment;
            originChain = getChainByNetworkName(name);
            break;
        }
    }

    if (!originDeployment) {
        console.error(`❌ No collateral chain deployment found for ${tokenSymbol}`);
        process.exit(1);
    }

    console.log(`\n📍 Synthetic Contract: ${currentDeployment.address}`);
    console.log(`🌐 Origin Chain: ${originChainName} (Chain ID: ${originChain.chainId})`);
    console.log(`🔓 Origin Contract: ${originDeployment.address}`);

    // Get contract instance 
    const bridge = await ethers.getContractAt(
        "contracts/updated-v6/via-synthetic-v6.sol:ViaSyntheticBridgeV3",
        currentDeployment.address
    );

    // Get token contracts
    const feeTokenAddress = await bridge.feeToken();
    const wrappedGasTokenAddress = await bridge.getWrappedGasToken(originChain.chainId);

    const feeToken = await ethers.getContractAt("IERC20", feeTokenAddress);
    const wrappedGasToken = await ethers.getContractAt("IERC20", wrappedGasTokenAddress);

    console.log(`\n[STEP 1] Pre-Bridge Checks`);
    console.log(`═══════════════════════════════════════════════════════`);

    // Fetch fees
    const fees = await bridge.getBridgeFees(originChain.chainId);
    const protocolFee = fees.protocolFee;
    const viaSourceFee = fees.viaSourceFee;
    const viaDestGas = fees.viaDestGas;
    const totalUsdcRequired = protocolFee + viaSourceFee;

    console.log(`   Synthetic Token: ${await bridge.symbol()} (${bridge.target})`);
    console.log(`   Fee Token (USDC): ${feeTokenAddress}`);
    console.log(`   Wrapped Gas Token: ${wrappedGasTokenAddress}`);

    console.log(`\n   Fees for Origin Chain ${originChain.chainId}:`);
    console.log(`     Protocol Fee: ${ethers.formatUnits(protocolFee, 6)} USDC`);
    console.log(`     VIA Source Fee: ${ethers.formatUnits(viaSourceFee, 6)} USDC`);
    console.log(`     VIA Dest Gas: ${ethers.formatEther(viaDestGas)} (wrapped gas token)`);
    console.log(`     Total USDC Needed: ${ethers.formatUnits(totalUsdcRequired, 6)} USDC`);

    // Check balances
    const syntheticBalance = await bridge.balanceOf(signer.address);
    const feeTokenBalance = await feeToken.balanceOf(signer.address);
    const gasTokenBalance = await wrappedGasToken.balanceOf(signer.address);

    console.log(`\n   Your Balances:`);
    console.log(`     Synthetic Token: ${ethers.formatEther(syntheticBalance)}`);
    console.log(`     USDC: ${ethers.formatUnits(feeTokenBalance, 6)}`);
    console.log(`     Wrapped Gas: ${ethers.formatEther(gasTokenBalance)}`);

    if (syntheticBalance < amount) {
        throw new Error(`Insufficient synthetic token balance. Need ${amountStr}, have ${ethers.formatEther(syntheticBalance)}`);
    }
    if (feeTokenBalance < totalUsdcRequired) {
        throw new Error(`Insufficient USDC balance. Need ${ethers.formatUnits(totalUsdcRequired, 6)}`);
    }
    if (gasTokenBalance < viaDestGas) {
        throw new Error(`Insufficient wrapped gas token balance. Need ${ethers.formatEther(viaDestGas)}`);
    }

    console.log(`\n[STEP 2] Token Approvals`);
    console.log(`═══════════════════════════════════════════════════════`);
    // Note: Synthetic tokens are burned directly, no approval needed for the token itself

    await approveToken(feeToken, "USDC Fee", totalUsdcRequired, currentDeployment.address);
    await approveToken(wrappedGasToken, "Wrapped Gas", viaDestGas, currentDeployment.address);

    console.log(`\n[STEP 3] Execute Reverse Bridge (Burn)`);
    console.log(`═══════════════════════════════════════════════════════`);

    // Set slippage tolerance for viaDestGas (e.g., 20% buffer)
    const maxViaDestGas = (viaDestGas * 120n) / 100n;
    console.log(`   Max VIA Dest Gas (with 20% slippage): ${ethers.formatEther(maxViaDestGas)}`);

    try {
        console.log(`   Estimating gas...`);
        const gasEstimate = await bridge.bridge.estimateGas(
            originChain.chainId,
            recipientAddress,
            amount,
            maxViaDestGas
        );
        console.log(`   Estimated Gas: ${gasEstimate.toString()}`);

        console.log(`   Sending burn transaction...`);
        const tx = await bridge.bridge(
            originChain.chainId,
            recipientAddress,
            amount,
            maxViaDestGas,
            { gasLimit: Number(gasEstimate) * 2 }
        );

        console.log(`   TX Sent: ${tx.hash}`);
        console.log(`   Waiting for confirmation...`);

        const receipt = await tx.wait();
        console.log(`   ✅ Burn transaction confirmed! Block: ${receipt.blockNumber}`);

        // Parse events
        const burnedEvent = receipt.logs.map(log => {
            try {
                return bridge.interface.parseLog(log);
            } catch (e) {
                return null;
            }
        }).find(event => event && event.name === "TokensBurned");

        if (burnedEvent) {
            console.log(`\n   📋 TokensBurned Event:`);
            console.log(`     Amount: ${ethers.formatEther(burnedEvent.args.amount)}`);
            console.log(`     Protocol Fee: ${ethers.formatUnits(burnedEvent.args.protocolFee, 6)} USDC`);
            console.log(`     VIA Source Fee: ${ethers.formatUnits(burnedEvent.args.viaSourceFee, 6)} USDC`);
            console.log(`     VIA Dest Gas: ${ethers.formatEther(burnedEvent.args.viaDestGas)}`);
        }

        console.log(`\n[STEP 4] Post-Bridge State`);
        console.log(`═══════════════════════════════════════════════════════`);

        const newSyntheticBalance = await bridge.balanceOf(signer.address);
        const totalSupply = await bridge.totalSupply();

        console.log(`   Your New Synthetic Balance: ${ethers.formatEther(newSyntheticBalance)}`);
        console.log(`   Synthetic Total Supply: ${ethers.formatEther(totalSupply)}`);

        console.log(`\n✅ REVERSE BRIDGE COMPLETED!`);
        console.log(`═══════════════════════════════════════════════════════`);
        console.log(`   🔗 VIA Scanner: https://scan.vialabs.io/transaction/${receipt.hash}`);
        console.log(`   ⏰ Wait 2-10 minutes for tokens to be unlocked on ${originChainName}.`);
        console.log(`   📧 Recipient: ${recipientAddress}`);
        console.log(`   🌐 Origin Contract: ${originDeployment.address}`);

    } catch (error) {
        console.error(`\n❌ Burn Transaction Failed:`);
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
    console.error("\n❌ Reverse bridge script failed:", error.message);
    process.exit(1);
});
