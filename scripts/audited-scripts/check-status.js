const hre = require("hardhat");
const { ethers } = hre;
const {
    CHAINS,
    loadDeployments,
    getDeployment,
    getAllDeploymentsForToken,
    getChainByNetworkName,
    isTestnet,
} = require("./config");

/**
 * Check deployment and configuration status for a token
 * 
 * Usage:
 *   npx hardhat run scripts/audited-scripts/check-status.js --network pulsechain WPLS
 *   npx hardhat run scripts/audited-scripts/check-status.js --network base_sepolia WPLS
 */

async function main() {
    const [signer] = await ethers.getSigners();
    const networkName = hre.network.name;
    const chainId = hre.network.config.chainId;

    // Parse arguments
    const tokenSymbol = process.argv[2] || process.env.TOKEN_SYMBOL;

    console.log(`\n📊 BRIDGE STATUS CHECK`);
    console.log(`═══════════════════════════════════════════════════════`);
    console.log(`📍 Network: ${networkName} (Chain ID: ${chainId})`);
    console.log(`👤 Signer: ${signer.address}`);

    if (!tokenSymbol) {
        // Show all deployments
        console.log(`\n📋 ALL DEPLOYMENTS:`);
        const allDeployments = loadDeployments();

        if (Object.keys(allDeployments).length === 0) {
            console.log(`   No deployments found.`);
            console.log(`   Run deploy-collateral.js or deploy-synthetic.js first.`);
            return;
        }

        for (const [symbol, chains] of Object.entries(allDeployments)) {
            console.log(`\n   🎯 ${symbol}:`);
            for (const [chain, deployment] of Object.entries(chains)) {
                console.log(`      ${chain}: ${deployment.address} (${deployment.type})`);
            }
        }
        return;
    }

    console.log(`🎯 Token: ${tokenSymbol}`);

    // Get current deployment
    const currentDeployment = getDeployment(tokenSymbol, networkName);
    if (!currentDeployment) {
        console.log(`\n❌ No deployment found for ${tokenSymbol} on ${networkName}`);
        console.log(`   Available deployments:`);
        const allDeployments = getAllDeploymentsForToken(tokenSymbol);
        for (const [chain, deployment] of Object.entries(allDeployments)) {
            console.log(`      ${chain}: ${deployment.address}`);
        }
        return;
    }

    console.log(`\n📍 Current Deployment:`);
    console.log(`   Address: ${currentDeployment.address}`);
    console.log(`   Type: ${currentDeployment.type}`);
    console.log(`   Deployed: ${currentDeployment.deployedAt}`);

    // Get contract instance
    const contractName = currentDeployment.type === "collateral"
        ? "contracts/updated-v6/via-collateral-v6.sol:ViaCollateralBridgeV6"
        : "contracts/updated-v6/via-synthetic-v6.sol:ViaSyntheticBridgeV6";

    const contract = await ethers.getContractAt(contractName, currentDeployment.address);

    // Basic info
    console.log(`\n📋 Contract Info:`);
    try {
        const treasury = await contract.treasury();
        const settlementGasLimit = await contract.settlementGasLimit();
        const minGasPrice = await contract.minGasPrice();
        const feeToken = await contract.feeToken();

        console.log(`   Treasury: ${treasury}`);
        console.log(`   Fee Token: ${feeToken}`);
        console.log(`   Settlement Gas Limit: ${settlementGasLimit.toString()}`);
        console.log(`   Min Gas Price: ${ethers.formatUnits(minGasPrice, "gwei")} gwei`);

        if (currentDeployment.type === "collateral") {
            const collateralToken = await contract.collateralToken();
            const totalLocked = await contract.totalLocked();
            console.log(`   Collateral Token: ${collateralToken}`);
            console.log(`   Total Locked: ${ethers.formatEther(totalLocked)}`);
        } else {
            const totalSupply = await contract.totalSupply();
            const name = await contract.name();
            const symbol = await contract.symbol();
            console.log(`   Token Name: ${name}`);
            console.log(`   Token Symbol: ${symbol}`);
            console.log(`   Total Supply: ${ethers.formatEther(totalSupply)}`);
        }
    } catch (e) {
        console.log(`   ⚠️  Error reading contract info: ${e.message}`);
    }

    // Check all remote chains
    console.log(`\n🌐 Remote Chain Status:`);
    const allDeployments = getAllDeploymentsForToken(tokenSymbol);
    const isCurrentTestnet = isTestnet(networkName);

    for (const [deployNetworkName, deployment] of Object.entries(allDeployments)) {
        if (deployNetworkName !== networkName && isTestnet(deployNetworkName) === isCurrentTestnet) {
            const chain = getChainByNetworkName(deployNetworkName);
            if (!chain) continue;

            console.log(`\n   Chain ${chain.chainId} (${chain.name}):`);
            console.log(`      Remote Address: ${deployment.address}`);

            try {
                const isConfigured = await contract.isChainConfigured(chain.chainId);
                const stats = await contract.getChainStats(chain.chainId);

                console.log(`      Configured: ${isConfigured ? "✅" : "❌"}`);
                console.log(`      Supported: ${stats.supported ? "✅" : "❌"}`);
                console.log(`      Protocol Fee: ${ethers.formatUnits(stats.protocolFee, 6)} USDC`);
                console.log(`      VIA Source Fee: ${ethers.formatUnits(stats.viaSourceFee, 6)} USDC`);
                console.log(`      Volume: ${ethers.formatEther(stats.volume)}`);

                if (currentDeployment.type === "collateral") {
                    console.log(`      Protocol Fees Collected: ${ethers.formatUnits(stats.protocolFeesCollected, 6)} USDC`);
                    console.log(`      VIA Fees Paid: ${ethers.formatUnits(stats.viaFeesPaid, 6)} USDC`);
                } else {
                    const isAuthorized = await contract.isAuthorizedMinter(chain.chainId);
                    console.log(`      Minter Authorized: ${isAuthorized ? "✅" : "❌"}`);
                    console.log(`      Minted: ${ethers.formatEther(stats.minted)}`);
                    console.log(`      Burned: ${ethers.formatEther(stats.burned)}`);
                }
            } catch (e) {
                console.log(`      ⚠️  Error: ${e.message}`);
            }
        }
    }

    // Fee preview
    console.log(`\n💰 Current Fee Preview:`);
    for (const [deployNetworkName, deployment] of Object.entries(allDeployments)) {
        if (deployNetworkName !== networkName && isTestnet(deployNetworkName) === isCurrentTestnet) {
            const chain = getChainByNetworkName(deployNetworkName);
            if (!chain) continue;

            try {
                const fees = await contract.getBridgeFees(chain.chainId);
                console.log(`\n   To ${chain.name} (${chain.chainId}):`);
                console.log(`      Protocol Fee: ${ethers.formatUnits(fees.protocolFee, 6)} USDC`);
                console.log(`      VIA Source Fee: ${ethers.formatUnits(fees.viaSourceFee, 6)} USDC`);
                console.log(`      VIA Dest Gas: ${ethers.formatEther(fees.viaDestGas)} (at current gas price)`);
                console.log(`      Total USDC: ${ethers.formatUnits(fees.totalUsdcRequired, 6)} USDC`);
            } catch (e) {
                console.log(`   To ${chain.name}: ⚠️  ${e.message}`);
            }
        }
    }

    console.log(`\n✅ Status check complete!`);
}

main().catch((error) => {
    console.error("\n❌ Status check failed:", error.message);
    process.exit(1);
});
