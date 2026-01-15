const hre = require("hardhat");
const { ethers } = hre;
const {
    CHAINS,
    FEE_CONFIG,
    getDeployment,
    getAllDeploymentsForToken,
    getChainByNetworkName,
    isTestnet,
} = require("./config");

/**
 * Configure a supported destination chain on the bridge contract
 * 
 * This script configures chain-specific settings including:
 * - Remote contract address
 * - Wrapped gas token for VIA fees
 * - Protocol fee and VIA source fee
 * - Chain support status
 * - Minter authorization (for synthetic contracts)
 * 
 * Usage:
 *   npx hardhat run scripts/audited-scripts/configure-chain.js --network pulsechain WPLS base
 *   npx hardhat run scripts/audited-scripts/configure-chain.js --network base WPLS pulsechain
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

    console.log(`\n🔧 CONFIGURING DESTINATION CHAIN`);
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

    console.log(`\n📍 Current Contract: ${currentDeployment.address}`);
    console.log(`   Type: ${currentDeployment.type}`);
    console.log(`\n🌐 Destination Contract: ${destDeployment.address}`);
    console.log(`   Chain ID: ${destChain.chainId}`);
    console.log(`   Type: ${destDeployment.type}`);

    // Determine minter authorization (only for synthetic contracts)
    // Synthetic should authorize minting from collateral chain
    const shouldAuthorizeMinter = currentDeployment.type === "synthetic" && destDeployment.type === "collateral";

    console.log(`\n⚙️  Configuration Parameters:`);
    console.log(`   Remote Contract: ${destDeployment.address}`);
    console.log(`   Protocol Fee: ${FEE_CONFIG.protocolFee / 1e6} USDC`);
    console.log(`   VIA Source Fee: ${FEE_CONFIG.viaSourceFee / 1e6} USDC`);
    console.log(`   Supported: true`);
    if (currentDeployment.type === "synthetic") {
        console.log(`   Authorize Minter: ${shouldAuthorizeMinter}`);
    }

    // Get contract instance
    const contractName = currentDeployment.type === "collateral"
        ? "contracts/updated-v6/via-collateral-v6.sol:ViaCollateralBridgeV6"
        : "contracts/updated-v6/via-synthetic-v6.sol:ViaSyntheticBridgeV6";

    const contract = await ethers.getContractAt(contractName, currentDeployment.address);

    console.log(`\n⏳ Configuring chain ${destChain.chainId}...`);

    try {
        let tx;

        if (currentDeployment.type === "collateral") {
            // V6: ViaCollateralBridgeV6.configureChain has 5 params (no wrappedGasToken)
            tx = await contract.configureChain(
                destChain.chainId,
                destDeployment.address,
                FEE_CONFIG.protocolFee,
                FEE_CONFIG.viaSourceFee,
                true, // supported
                { gasLimit: 300000 }
            );
        } else {
            // V6: ViaSyntheticBridgeV6.configureChain has 6 params (no wrappedGasToken)
            tx = await contract.configureChain(
                destChain.chainId,
                destDeployment.address,
                FEE_CONFIG.protocolFee,
                FEE_CONFIG.viaSourceFee,
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
