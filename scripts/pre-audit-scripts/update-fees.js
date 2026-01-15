const hre = require("hardhat");
const { ethers } = hre;
const {
    CHAINS,
    FEE_CONFIG,
    getDeployment,
    getChainByNetworkName,
    getViaDestinationGas,
} = require("./config");

/**
 * Update fees for a specific destination chain (Pre-Audit)
 * 
 * PRE-AUDIT VERSION:
 * - updateFees has 4 params: chainId, protocolFee, viaSourceFee, viaDestGas
 * 
 * Usage:
 *   npx hardhat run scripts/pre-audit-scripts/update-fees.js --network pulsechain WPLS base
 */

async function main() {
    const [signer] = await ethers.getSigners();
    const networkName = hre.network.name;
    const chainId = hre.network.config.chainId;

    // Parse arguments
    const tokenSymbol = process.argv[2] || process.env.TOKEN_SYMBOL;
    const destChainName = process.argv[3] || process.env.DEST_CHAIN;

    // Optional: Override fees from command line
    const protocolFee = process.argv[4] ? parseInt(process.argv[4]) : FEE_CONFIG.protocolFee;
    const viaSourceFee = process.argv[5] ? parseInt(process.argv[5]) : FEE_CONFIG.viaSourceFee;
    const viaDestGas = process.argv[6] || getViaDestinationGas(destChainName);

    if (!tokenSymbol || !destChainName) {
        console.error("❌ Usage: npx hardhat run update-fees.js --network <network> <TOKEN_SYMBOL> <DEST_CHAIN> [protocolFee] [viaSourceFee] [viaDestGas]");
        console.error("   Example: npx hardhat run update-fees.js --network pulsechain WPLS base");
        console.error("   Example with custom fees: npx hardhat run update-fees.js --network pulsechain WPLS base 100000 200000 500000000000000");
        process.exit(1);
    }

    console.log(`\n💰 UPDATING FEES (Pre-Audit)`);
    console.log(`═══════════════════════════════════════════════════════`);
    console.log(`📍 Current Network: ${networkName} (Chain ID: ${chainId})`);
    console.log(`👤 Signer: ${signer.address}`);
    console.log(`🎯 Token: ${tokenSymbol}`);
    console.log(`🌐 Destination Chain: ${destChainName}`);

    // Validate destination chain
    const destChain = getChainByNetworkName(destChainName);
    if (!destChain) {
        console.error(`❌ Unknown destination chain: ${destChainName}`);
        process.exit(1);
    }

    // Get current deployment
    const currentDeployment = getDeployment(tokenSymbol, networkName);
    if (!currentDeployment) {
        console.error(`❌ No deployment found for ${tokenSymbol} on ${networkName}`);
        process.exit(1);
    }

    console.log(`\n📍 Contract: ${currentDeployment.address}`);
    console.log(`   Type: ${currentDeployment.type}`);

    console.log(`\n⚙️  New Fee Configuration:`);
    console.log(`   Protocol Fee: ${protocolFee / 1e6} USDC (${protocolFee})`);
    console.log(`   VIA Source Fee: ${viaSourceFee / 1e6} USDC (${viaSourceFee})`);
    console.log(`   VIA Dest Gas: ${viaDestGas} wei`);

    // Get contract instance
    const contractName = currentDeployment.type === "collateral"
        ? "contracts/pre-audit/ViaCollateralBridge.sol:ViaCollateralBridge"
        : "contracts/pre-audit/ViaSyntheticBridge.sol:ViaSyntheticBridge";

    const contract = await ethers.getContractAt(contractName, currentDeployment.address);

    console.log(`\n⏳ Updating fees for chain ${destChain.chainId}...`);

    try {
        // PRE-AUDIT updateFees: chainId, protocolFee, viaSourceFee, viaDestGas
        const tx = await contract.updateFees(
            destChain.chainId,
            protocolFee,
            viaSourceFee,
            viaDestGas,
            { gasLimit: 150000 }
        );

        console.log(`   TX Sent: ${tx.hash}`);
        console.log(`   Waiting for confirmation...`);

        const receipt = await tx.wait();
        console.log(`   ✅ Fees updated! Block: ${receipt.blockNumber}`);

    } catch (error) {
        console.error(`\n❌ Failed to update fees:`);
        console.error(`   ${error.message}`);
        throw error;
    }

    // Verification
    console.log(`\n🔍 Verifying new fees...`);
    try {
        const fees = await contract.getBridgeFees(destChain.chainId);
        console.log(`   Protocol Fee: ${Number(fees.protocolFee) / 1e6} USDC`);
        console.log(`   VIA Source Fee: ${Number(fees.viaSourceFee) / 1e6} USDC`);
        console.log(`   VIA Dest Gas: ${fees.viaDestGas} wei`);
        console.log(`   Total USDC Required: ${Number(fees.totalUsdcRequired) / 1e6} USDC`);
    } catch (e) {
        console.warn(`   ⚠️  Verification failed: ${e.message}`);
    }

    console.log(`\n✅ Fee update complete!`);
}

main().catch((error) => {
    console.error("\n❌ Fee update failed:", error.message);
    process.exit(1);
});
