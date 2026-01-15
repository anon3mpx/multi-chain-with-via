const hre = require("hardhat");
const { ethers } = hre;
const {
    CHAINS,
    FEE_CONFIG,
    getDeployment,
    getChainByNetworkName,
    getWrappedGasToken,
    getViaDestinationGas,
} = require("./config");

/**
 * Configure a single destination chain on the bridge contract (Pre-Audit)
 * 
 * PRE-AUDIT VERSION:
 * - configureChain includes wrappedGasToken and viaDestGas parameters
 * - Uses static viaDestinationGas per chain from config
 * 
 * Usage:
 *   npx hardhat run scripts/pre-audit-scripts/configure-chain.js --network pulsechain WPLS base
 *   npx hardhat run scripts/pre-audit-scripts/configure-chain.js --network base WPLS pulsechain
 */

async function main() {
    const [signer] = await ethers.getSigners();
    const networkName = hre.network.name;
    const chainId = hre.network.config.chainId;

    // Parse arguments
    const tokenSymbol = process.argv[2] || process.env.TOKEN_SYMBOL;
    const destChainName = process.argv[3] || process.env.DEST_CHAIN;

    if (!tokenSymbol || !destChainName) {
        console.error("❌ Usage: npx hardhat run configure-chain.js --network <network> <TOKEN_SYMBOL> <DEST_CHAIN>");
        console.error("   Example: npx hardhat run configure-chain.js --network pulsechain WPLS base");
        console.error(`   Available chains: ${Object.keys(CHAINS).join(", ")}`);
        process.exit(1);
    }

    console.log(`\n🔧 CONFIGURING DESTINATION CHAIN (Pre-Audit)`);
    console.log(`═══════════════════════════════════════════════════════`);
    console.log(`📍 Current Network: ${networkName} (Chain ID: ${chainId})`);
    console.log(`👤 Signer: ${signer.address}`);
    console.log(`🎯 Token: ${tokenSymbol}`);
    console.log(`🌐 Destination Chain: ${destChainName}`);

    // Validate destination chain
    const destChain = getChainByNetworkName(destChainName);
    if (!destChain) {
        console.error(`❌ Unknown destination chain: ${destChainName}`);
        console.error(`   Available chains: ${Object.keys(CHAINS).join(", ")}`);
        process.exit(1);
    }

    // Get current deployment
    const currentDeployment = getDeployment(tokenSymbol, networkName);
    if (!currentDeployment) {
        console.error(`❌ No deployment found for ${tokenSymbol} on ${networkName}`);
        console.error(`   Run deploy-collateral.js or deploy-synthetic.js first.`);
        process.exit(1);
    }

    // Get destination deployment
    const destDeployment = getDeployment(tokenSymbol, destChainName);
    if (!destDeployment) {
        console.error(`❌ No deployment found for ${tokenSymbol} on ${destChainName}`);
        console.error(`   Deploy to the destination chain first.`);
        process.exit(1);
    }

    // IMPORTANT: Use CURRENT chain's wrapped gas token (not destination's!)
    // Users on this chain pay in this chain's native gas token
    const currentWrappedGasToken = getWrappedGasToken(networkName);

    // IMPORTANT: Use CURRENT chain's viaDestGas (amount users pay when LEAVING this chain)
    // NOT the destination's gas config!
    const currentViaDestGas = getViaDestinationGas(networkName);

    console.log(`\n📍 Current Contract: ${currentDeployment.address}`);
    console.log(`   Type: ${currentDeployment.type}`);
    console.log(`\n🌐 Destination Contract: ${destDeployment.address}`);
    console.log(`   Chain ID: ${destChain.chainId}`);
    console.log(`   Type: ${destDeployment.type}`);

    // MESH TOPOLOGY: Authorize ALL chains as minters on synthetic contracts
    // This enables synthetic-to-synthetic transfers (e.g., Base HOA → Arbitrum HOA)
    const shouldAuthorizeMinter = currentDeployment.type === "synthetic"; // Always true for synthetics

    console.log(`\n⚙️  Configuration Parameters:`);
    console.log(`   Remote Contract: ${destDeployment.address}`);
    console.log(`   Wrapped Gas Token (local): ${currentWrappedGasToken}`);
    console.log(`   Protocol Fee: ${FEE_CONFIG.protocolFee / 1e6} USDC`);
    console.log(`   VIA Source Fee: ${FEE_CONFIG.viaSourceFee / 1e6} USDC`);
    console.log(`   VIA Dest Gas: ${currentViaDestGas} wei`);
    console.log(`   Supported: true`);
    if (currentDeployment.type === "synthetic") {
        console.log(`   Authorize Minter: ${shouldAuthorizeMinter}`);
    }

    // Get contract instance
    const contractName = currentDeployment.type === "collateral"
        ? "contracts/pre-audit/ViaCollateralBridge.sol:ViaCollateralBridge"
        : "contracts/pre-audit/ViaSyntheticBridge.sol:ViaSyntheticBridge";

    const contract = await ethers.getContractAt(contractName, currentDeployment.address);

    console.log(`\n⏳ Configuring chain ${destChain.chainId}...`);

    try {
        let tx;

        if (currentDeployment.type === "collateral") {
            // PRE-AUDIT ViaCollateralBridge.configureChain - 7 params
            tx = await contract.configureChain(
                destChain.chainId,
                destDeployment.address,
                currentWrappedGasToken,
                FEE_CONFIG.protocolFee,
                FEE_CONFIG.viaSourceFee,
                currentViaDestGas,
                true, // supported
                { gasLimit: 300000 }
            );
        } else {
            // PRE-AUDIT ViaSyntheticBridge.configureChain - 8 params
            tx = await contract.configureChain(
                destChain.chainId,
                destDeployment.address,
                currentWrappedGasToken,
                FEE_CONFIG.protocolFee,
                FEE_CONFIG.viaSourceFee,
                currentViaDestGas,
                true, // supported
                shouldAuthorizeMinter, // authorizedMinter
                { gasLimit: 350000 }
            );
        }

        console.log(`   TX Sent: ${tx.hash}`);
        console.log(`   Waiting for confirmation...`);

        const receipt = await tx.wait();
        console.log(`   ✅ Chain ${destChain.chainId} configured! Block: ${receipt.blockNumber}`);

    } catch (error) {
        console.error(`\n❌ Failed to configure chain ${destChain.chainId}:`);
        console.error(`   ${error.message}`);
        throw error;
    }

    // Verification
    console.log(`\n🔍 Verifying configuration...`);
    try {
        const isConfigured = await contract.isChainConfigured(destChain.chainId);
        console.log(`   Chain ${destChain.chainId} configured: ${isConfigured ? "✅" : "❌"}`);

        if (currentDeployment.type === "synthetic") {
            const isAuthorized = await contract.isAuthorizedMinter(destChain.chainId);
            console.log(`   Minter authorized: ${isAuthorized ? "✅" : "❌"} (Expected: ${shouldAuthorizeMinter})`);
        }

        const stats = await contract.getChainStats(destChain.chainId);
        console.log(`   Protocol Fee: ${Number(stats.protocolFee) / 1e6} USDC`);
        console.log(`   VIA Source Fee: ${Number(stats.viaSourceFee) / 1e6} USDC`);

    } catch (e) {
        console.warn(`   ⚠️  Verification failed: ${e.message}`);
    }

    console.log(`\n📋 Next Steps:`);
    console.log(`   1. Run this script on the destination chain (${destChainName}) pointing back here`);
    console.log(`   2. Test bridging with bridge-to-destination.js`);
    console.log(`\n✅ Chain configuration complete!`);
}

main().catch((error) => {
    console.error("\n❌ Configuration failed:", error.message);
    process.exit(1);
});
