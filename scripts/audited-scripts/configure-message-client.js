const hre = require("hardhat");
const { ethers } = hre;
const chainsConfig = require("@vialabs-io/contracts/config/chains");
const {
    CHAINS,
    FEE_CONFIG,
    getDeployment,
    getAllDeploymentsForToken,
    getChainByNetworkName,
    isTestnet,
} = require("./config");

/**
 * Configure MessageClient for cross-chain communication
 * 
 * This script configures the MessageClient on the deployed contract to enable
 * cross-chain messaging with all other deployed contracts for the same token.
 * 
 * Usage:
 *   npx hardhat run scripts/audited-scripts/configure-message-client.js --network pulsechain WPLS
 *   npx hardhat run scripts/audited-scripts/configure-message-client.js --network base WPLS
 */

async function main() {
    const [signer] = await ethers.getSigners();
    const networkName = hre.network.name;
    const chainId = hre.network.config.chainId;

    // Parse token symbol from command line
    const tokenSymbol = process.argv[2] || process.env.TOKEN_SYMBOL;
    if (!tokenSymbol) {
        console.error("❌ Usage: npx hardhat run configure-message-client.js --network <network> <TOKEN_SYMBOL>");
        console.error("   Example: npx hardhat run configure-message-client.js --network pulsechain WPLS");
        process.exit(1);
    }

    console.log(`\n🔧 CONFIGURING MESSAGE CLIENT`);
    console.log(`═══════════════════════════════════════════════════════`);
    console.log(`📍 Network: ${networkName} (Chain ID: ${chainId})`);
    console.log(`👤 Signer: ${signer.address}`);
    console.log(`🎯 Token: ${tokenSymbol}`);

    // Get current deployment
    const currentDeployment = getDeployment(tokenSymbol, networkName);
    if (!currentDeployment) {
        console.error(`❌ No deployment found for ${tokenSymbol} on ${networkName}`);
        console.error(`   Run deploy-collateral.js or deploy-synthetic.js first.`);
        process.exit(1);
    }

    console.log(`\n📍 Current Contract: ${currentDeployment.address}`);
    console.log(`   Type: ${currentDeployment.type}`);

    // Get MessageV3 address
    const messageV3Address = chainsConfig[chainId]?.message;
    if (!messageV3Address) {
        console.error(`❌ MessageV3 address not found for chain ID ${chainId}`);
        process.exit(1);
    }
    console.log(`   MessageV3: ${messageV3Address}`);

    // Get all deployments for this token
    const allDeployments = getAllDeploymentsForToken(tokenSymbol);

    // Build remote configuration
    const remoteChainIds = [];
    const remoteEndpoints = [];
    const confirmations = [];

    const isCurrentTestnet = isTestnet(networkName);
    const confirmationCount = isCurrentTestnet
        ? FEE_CONFIG.confirmations.testnet
        : FEE_CONFIG.confirmations.mainnet;

    for (const [deployNetworkName, deployment] of Object.entries(allDeployments)) {
        if (deployNetworkName !== networkName) {
            // Only include chains of the same environment (testnet/mainnet)
            if (isTestnet(deployNetworkName) === isCurrentTestnet) {
                remoteChainIds.push(deployment.chainId);
                remoteEndpoints.push(deployment.address);
                confirmations.push(confirmationCount);
            }
        }
    }

    if (remoteChainIds.length === 0) {
        console.log(`\n⚠️  No remote deployments found for ${tokenSymbol}.`);
        console.log(`   Deploy contracts on other chains first, then re-run this script.`);
        return;
    }

    console.log(`\n🌐 Remote Deployments Found:`);
    remoteChainIds.forEach((id, i) => {
        const chain = Object.values(CHAINS).find(c => c.chainId === id);
        console.log(`   - Chain ${id} (${chain?.name || 'Unknown'}): ${remoteEndpoints[i]}`);
    });

    console.log(`\n⚙️  Configuration Parameters:`);
    console.log(`   MessageV3: ${messageV3Address}`);
    console.log(`   Remote Chains: [${remoteChainIds.join(", ")}]`);
    console.log(`   Confirmations: ${confirmationCount} per chain`);

    // Get contract instance
    const contractName = currentDeployment.type === "collateral"
        ? "contracts/updated-v6/via-collateral-v6.sol:ViaCollateralBridgeV6"
        : "contracts/updated-v6/via-synthetic-v6.sol:ViaSyntheticBridgeV6";

    const contract = await ethers.getContractAt(contractName, currentDeployment.address);

    console.log(`\n⏳ Configuring MessageClient...`);

    try {
        const tx = await contract.configureMessageClient(
            messageV3Address,
            remoteChainIds,
            remoteEndpoints,
            confirmations,
            { gasLimit: 500000 }
        );

        console.log(`   TX Sent: ${tx.hash}`);
        console.log(`   Waiting for confirmation...`);

        const receipt = await tx.wait();
        console.log(`   ✅ MessageClient configured! Block: ${receipt.blockNumber}`);

    } catch (error) {
        console.error(`\n❌ Failed to configure MessageClient:`);
        console.error(`   ${error.message}`);
        throw error;
    }

    console.log(`\n📋 Next Steps:`);
    console.log(`   1. Run this script on ALL other chains with ${tokenSymbol} deployments`);
    console.log(`   2. Run configure-chain.js to set up fees and chain support`);
    console.log(`\n✅ MessageClient configuration complete for ${networkName}!`);
}

main().catch((error) => {
    console.error("\n❌ Configuration failed:", error.message);
    process.exit(1);
});
