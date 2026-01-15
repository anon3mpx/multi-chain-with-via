const hre = require("hardhat");
const { ethers } = hre;
const {
    CHAINS,
    getAllDeploymentsForToken,
    getChainByNetworkName,
    isTestnet,
} = require("./config");

/**
 * Verify deployment and configuration status for a token
 * 
 * Usage:
 *   npx hardhat run scripts/pre-audit-scripts/verify-deployment.js --network pulsechain WPLS
 */

async function main() {
    const networkName = hre.network.name;
    const chainId = hre.network.config.chainId;

    const tokenSymbol = process.argv[2] || process.env.TOKEN_SYMBOL;
    if (!tokenSymbol) {
        console.error("❌ Usage: npx hardhat run verify-deployment.js --network <network> <TOKEN_SYMBOL>");
        process.exit(1);
    }

    console.log(`\n🔍 VERIFYING DEPLOYMENT (Pre-Audit)`);
    console.log(`═══════════════════════════════════════════════════════`);
    console.log(`📍 Network: ${networkName} (Chain ID: ${chainId})`);
    console.log(`🎯 Token: ${tokenSymbol}`);

    const allDeployments = getAllDeploymentsForToken(tokenSymbol);
    const currentDeployment = allDeployments[networkName];

    if (!currentDeployment) {
        console.error(`❌ No deployment found for ${tokenSymbol} on ${networkName}`);
        return;
    }

    console.log(`\n📍 Contract: ${currentDeployment.address}`);
    console.log(`   Type: ${currentDeployment.type}`);
    console.log(`   Deployed: ${currentDeployment.deployedAt}`);

    // Get contract instance
    const contractName = currentDeployment.type === "collateral"
        ? "contracts/pre-audit/ViaCollateralBridge.sol:ViaCollateralBridge"
        : "contracts/pre-audit/ViaSyntheticBridge.sol:ViaSyntheticBridge";

    const contract = await ethers.getContractAt(contractName, currentDeployment.address);

    // Basic contract info
    console.log(`\n📋 Contract State:`);
    try {
        const owner = await contract.owner();
        const treasury = await contract.treasury();
        const feeToken = await contract.feeToken();
        const paused = await contract.paused();

        console.log(`   Owner: ${owner}`);
        console.log(`   Treasury: ${treasury}`);
        console.log(`   Fee Token: ${feeToken}`);
        console.log(`   Paused: ${paused ? "⚠️ YES" : "✅ NO"}`);

        if (currentDeployment.type === "collateral") {
            const collateralToken = await contract.collateralToken();
            const totalLocked = await contract.totalLocked();
            console.log(`   Collateral Token: ${collateralToken}`);
            console.log(`   Total Locked: ${ethers.formatEther(totalLocked)}`);
        } else {
            const totalSupply = await contract.totalSupply();
            console.log(`   Total Supply: ${ethers.formatEther(totalSupply)}`);
        }
    } catch (e) {
        console.error(`   ❌ Failed to read state: ${e.message}`);
    }

    // Check configured chains
    const isCurrentTestnet = isTestnet(networkName);
    const remoteChains = [];

    for (const [deployNetworkName, deployment] of Object.entries(allDeployments)) {
        if (deployNetworkName !== networkName && isTestnet(deployNetworkName) === isCurrentTestnet) {
            const chain = getChainByNetworkName(deployNetworkName);
            if (chain) {
                remoteChains.push({
                    networkName: deployNetworkName,
                    chainId: chain.chainId,
                    name: chain.name,
                    address: deployment.address,
                    type: deployment.type,
                });
            }
        }
    }

    if (remoteChains.length > 0) {
        console.log(`\n🌐 Remote Chain Configuration:`);
        console.log(`═══════════════════════════════════════════════════════`);

        for (const remoteChain of remoteChains) {
            console.log(`\n   Chain ${remoteChain.chainId} (${remoteChain.name}):`);

            try {
                const isConfigured = await contract.isChainConfigured(remoteChain.chainId);
                console.log(`      Configured: ${isConfigured ? "✅" : "❌"}`);

                if (isConfigured) {
                    const stats = await contract.getChainStats(remoteChain.chainId);
                    console.log(`      Volume: ${ethers.formatEther(stats.volume)}`);
                    console.log(`      Protocol Fees Collected: ${Number(stats.protocolFeesCollected) / 1e6} USDC`);
                    console.log(`      VIA Fees Paid: ${Number(stats.viaFeesPaid) / 1e6} USDC`);
                    console.log(`      Protocol Fee: ${Number(stats.protocolFee) / 1e6} USDC`);
                    console.log(`      VIA Source Fee: ${Number(stats.viaSourceFee) / 1e6} USDC`);
                    console.log(`      Remote Contract: ${stats.remoteContract}`);
                    console.log(`      Wrapped Gas Token: ${stats.wrappedGasToken}`);

                    if (currentDeployment.type === "synthetic") {
                        const isAuthorized = await contract.isAuthorizedMinter(remoteChain.chainId);
                        console.log(`      Minter Authorized: ${isAuthorized ? "✅" : "❌"}`);
                    }
                }
            } catch (e) {
                console.log(`      ⚠️ Check failed: ${e.message}`);
            }
        }
    } else {
        console.log(`\n⚠️  No other deployments found for ${tokenSymbol} in the same environment.`);
    }

    console.log(`\n✅ Verification complete!`);
}

main().catch((error) => {
    console.error("\n❌ Verification failed:", error.message);
    process.exit(1);
});
