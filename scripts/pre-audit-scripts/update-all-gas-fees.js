const hre = require("hardhat");
const { ethers } = hre;
const {
    CHAINS,
    FEE_CONFIG,
    getAllDeploymentsForToken,
    getChainByNetworkName,
    getViaDestinationGas,
    isTestnet,
} = require("./config");

/**
 * Update gas fees for ALL configured routes on a contract
 * 
 * PRE-AUDIT VERSION:
 * - Uses updateFees(chainId, protocolFee, viaSourceFee, viaDestGas)
 * - Sets the SAME viaDestGas for ALL destinations (source chain's fee)
 * 
 * This script updates fees without reconfiguring the entire route.
 * Use this to fix incorrect viaDestGas values.
 * 
 * Usage:
 *   npx hardhat run scripts/pre-audit-scripts/update-all-gas-fees.js --network pulsechain WPLS
 *   npx hardhat run scripts/pre-audit-scripts/update-all-gas-fees.js --network base WPLS
 */

async function main() {
    const [signer] = await ethers.getSigners();
    const networkName = hre.network.name;
    const chainId = hre.network.config.chainId;

    // Parse token symbol
    const tokenSymbol = process.argv[2] || process.env.TOKEN_SYMBOL;
    if (!tokenSymbol) {
        console.error("❌ Usage: npx hardhat run update-all-gas-fees.js --network <network> <TOKEN_SYMBOL>");
        process.exit(1);
    }

    console.log(`\n💰 UPDATE ALL GAS FEES (Pre-Audit Contracts)`);
    console.log(`═══════════════════════════════════════════════════════`);
    console.log(`📍 Network: ${networkName} (Chain ID: ${chainId})`);
    console.log(`👤 Signer: ${signer.address}`);
    console.log(`🎯 Token: ${tokenSymbol}`);

    // Get all deployments for this token
    const allDeployments = getAllDeploymentsForToken(tokenSymbol);
    const currentDeployment = allDeployments[networkName];

    if (!currentDeployment) {
        console.error(`❌ No deployment found for ${tokenSymbol} on ${networkName}`);
        process.exit(1);
    }

    console.log(`\n📍 Current Contract: ${currentDeployment.address}`);
    console.log(`   Type: ${currentDeployment.type}`);

    // Get the SOURCE chain's viaDestGas (what users pay when leaving this chain)
    const sourceViaDestGas = getViaDestinationGas(networkName);
    console.log(`\n⚙️  Fee Configuration (same for ALL destinations):`);
    console.log(`   Protocol Fee: ${FEE_CONFIG.protocolFee / 1e6} USDC (${FEE_CONFIG.protocolFee})`);
    console.log(`   VIA Source Fee: ${FEE_CONFIG.viaSourceFee / 1e6} USDC (${FEE_CONFIG.viaSourceFee})`);
    console.log(`   VIA Dest Gas: ${sourceViaDestGas} wei`);

    // Build list of remote chains (same testnet/mainnet environment)
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
                });
            }
        }
    }

    if (remoteChains.length === 0) {
        console.log(`\n⚠️  No remote deployments found for ${tokenSymbol}.`);
        return;
    }

    console.log(`\n🌐 Updating Fees for ${remoteChains.length} Remote Chains:`);
    remoteChains.forEach((c) => console.log(`   - Chain ${c.chainId} (${c.name})`));

    // Get contract instance
    const contractName = currentDeployment.type === "collateral"
        ? "contracts/pre-audit/ViaCollateralBridge.sol:ViaCollateralBridge"
        : "contracts/pre-audit/ViaSyntheticBridge.sol:ViaSyntheticBridge";

    const contract = await ethers.getContractAt(contractName, currentDeployment.address);

    console.log(`\n⏳ Updating fees...`);
    console.log(`═══════════════════════════════════════════════════════`);

    let successCount = 0;
    let failCount = 0;

    for (const remoteChain of remoteChains) {
        console.log(`\n   🌐 Chain ${remoteChain.chainId} (${remoteChain.name}):`);

        try {
            const nonce = await ethers.provider.getTransactionCount(signer.address, "pending");
            console.log(`      Using Nonce: ${nonce}`);

            // updateFees(chainId, protocolFee, viaSourceFee, viaDestGas)
            const tx = await contract.updateFees(
                remoteChain.chainId,
                FEE_CONFIG.protocolFee,
                FEE_CONFIG.viaSourceFee,
                sourceViaDestGas,
                {
                    gasLimit: 150000,
                    nonce: nonce
                }
            );

            console.log(`      TX: ${tx.hash}`);
            await tx.wait();
            console.log(`      ✅ Fees updated!`);
            successCount++;

            // Small delay to let RPC sync
            await new Promise(r => setTimeout(r, 1500));

        } catch (error) {
            console.error(`      ❌ Failed: ${error.message}`);
            failCount++;
        }
    }

    // Verification
    console.log(`\n[VERIFICATION] Checking Updated Fees...`);
    console.log(`═══════════════════════════════════════════════════════`);

    for (const remoteChain of remoteChains) {
        try {
            const stats = await contract.getChainStats(remoteChain.chainId);
            const viaDestGas = stats.viaDestGas || stats[5]; // Handle different return formats
            const isCorrect = viaDestGas.toString() === sourceViaDestGas.toString();
            console.log(`   Chain ${remoteChain.chainId}: VIA Dest Gas = ${viaDestGas} ${isCorrect ? "✅" : "❌"}`);
        } catch (e) {
            console.log(`   Chain ${remoteChain.chainId}: ⚠️ Verification failed`);
        }
    }

    console.log(`\n✅ GAS FEE UPDATE COMPLETE FOR ${tokenSymbol} ON ${networkName.toUpperCase()}!`);
    console.log(`═══════════════════════════════════════════════════════`);
    console.log(`   📋 Success: ${successCount} | Failed: ${failCount}`);
    console.log(`\n   📋 Run on other chains:`);
    remoteChains.forEach((c) => {
        console.log(`      npx hardhat run scripts/pre-audit-scripts/update-all-gas-fees.js --network ${c.networkName} ${tokenSymbol}`);
    });
}

main().catch((error) => {
    console.error("\n❌ Update failed:", error.message);
    process.exit(1);
});
