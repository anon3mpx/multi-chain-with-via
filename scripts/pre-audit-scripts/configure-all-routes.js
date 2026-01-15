const hre = require("hardhat");
const { ethers } = hre;
const chainsConfig = require("@vialabs-io/contracts/config/chains");
const {
    CHAINS,
    FEE_CONFIG,
    getAllDeploymentsForToken,
    getChainByNetworkName,
    getWrappedGasToken,
    getViaDestinationGas,
    isTestnet,
} = require("./config");

/**
 * Configure ALL routes for a token in one go (cluster/mesh topology)
 * 
 * PRE-AUDIT VERSION:
 * - configureChain includes wrappedGasToken and viaDestGas parameters
 * - Uses static viaDestinationGas per chain from config
 * 
 * This script:
 * 1. Configures MessageClient with all remote endpoints
 * 2. Configures each remote chain with fees, wrappedGasToken, and minter authorization
 * 
 * Run this on EACH chain where the token is deployed.
 * 
 * Usage:
 *   npx hardhat run scripts/pre-audit-scripts/configure-all-routes.js --network pulsechain WPLS
 *   npx hardhat run scripts/pre-audit-scripts/configure-all-routes.js --network base WPLS
 */

async function main() {
    const [signer] = await ethers.getSigners();
    const networkName = hre.network.name;
    const chainId = hre.network.config.chainId;

    // Parse token symbol
    const tokenSymbol = process.argv[2] || process.env.TOKEN_SYMBOL;
    if (!tokenSymbol) {
        console.error("❌ Usage: npx hardhat run configure-all-routes.js --network <network> <TOKEN_SYMBOL>");
        process.exit(1);
    }

    console.log(`\n🌐 CONFIGURE ALL ROUTES (Pre-Audit Contracts)`);
    console.log(`═══════════════════════════════════════════════════════`);
    console.log(`📍 Network: ${networkName} (Chain ID: ${chainId})`);
    console.log(`👤 Signer: ${signer.address}`);
    console.log(`🎯 Token: ${tokenSymbol}`);

    // Get all deployments for this token
    const allDeployments = getAllDeploymentsForToken(tokenSymbol);
    const currentDeployment = allDeployments[networkName];

    if (!currentDeployment) {
        console.error(`❌ No deployment found for ${tokenSymbol} on ${networkName}`);
        console.error(`   Available deployments:`);
        for (const [chain, dep] of Object.entries(allDeployments)) {
            console.error(`      ${chain}: ${dep.address}`);
        }
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

    // Get wrapped gas token for the CURRENT chain (used for incoming settlements)
    const currentWrappedGasToken = getWrappedGasToken(networkName);
    console.log(`   Wrapped Gas Token: ${currentWrappedGasToken}`);

    // Build list of remote chains (same testnet/mainnet environment)
    const isCurrentTestnet = isTestnet(networkName);
    const remoteChains = [];

    // IMPORTANT: Use CURRENT chain's viaDestGas for ALL destinations
    // This is the amount users pay when LEAVING this chain (in local wrapped gas token)
    // Example: On PulseChain, always charge 80 WPLS regardless of destination
    const currentViaDestGas = getViaDestinationGas(networkName);

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
                    // Use CURRENT chain's wrapped gas token (users pay in local token)
                    wrappedGasToken: currentWrappedGasToken,
                    // Use CURRENT chain's viaDestGas (same fee for all destinations)
                    viaDestGas: currentViaDestGas,
                });
            }
        }
    }

    if (remoteChains.length === 0) {
        console.log(`\n⚠️  No remote deployments found for ${tokenSymbol}.`);
        console.log(`   Deploy contracts on other chains first, then re-run this script.`);
        return;
    }

    console.log(`\n🌐 Remote Chains to Configure (${remoteChains.length} total):`);
    remoteChains.forEach((c) => console.log(`   - Chain ${c.chainId} (${c.name}): ${c.address} [${c.type}]`));

    // Get contract instance
    const contractName = currentDeployment.type === "collateral"
        ? "contracts/pre-audit/ViaCollateralBridge.sol:ViaCollateralBridge"
        : "contracts/pre-audit/ViaSyntheticBridge.sol:ViaSyntheticBridge";

    const contract = await ethers.getContractAt(contractName, currentDeployment.address);

    // ========================================================================
    // STEP 1: Configure MessageClient
    // ========================================================================
    console.log(`\n[STEP 1/2] Configuring MessageClient...`);
    console.log(`═══════════════════════════════════════════════════════`);

    const remoteChainIds = remoteChains.map((c) => c.chainId);
    const remoteEndpoints = remoteChains.map((c) => c.address);
    const confirmationCount = isCurrentTestnet
        ? FEE_CONFIG.confirmations.testnet
        : FEE_CONFIG.confirmations.mainnet;
    const confirmations = remoteChains.map(() => confirmationCount);

    console.log(`   MessageV3: ${messageV3Address}`);
    console.log(`   Remote Chains: [${remoteChainIds.join(", ")}]`);
    console.log(`   Confirmations: ${confirmationCount}`);

    try {
        const nonce = await ethers.provider.getTransactionCount(signer.address, "pending");
        console.log(`   Using Nonce: ${nonce}`);

        const tx = await contract.configureMessageClient(
            messageV3Address,
            remoteChainIds,
            remoteEndpoints,
            confirmations,
            {
                gasLimit: 500000,
                nonce: nonce
            }
        );

        console.log(`   TX: ${tx.hash}`);
        await tx.wait();
        console.log(`   ✅ MessageClient configured!`);
    } catch (error) {
        console.error(`   ❌ Failed: ${error.message}`);
        throw error;
    }

    // ========================================================================
    // STEP 2: Configure Each Remote Chain (Pre-Audit: includes wrappedGasToken & viaDestGas)
    // ========================================================================
    console.log(`\n[STEP 2/2] Configuring Remote Chains...`);
    console.log(`═══════════════════════════════════════════════════════`);

    for (const remoteChain of remoteChains) {
        console.log(`\n   🌐 Chain ${remoteChain.chainId} (${remoteChain.name}):`);
        console.log(`      Remote Contract: ${remoteChain.address}`);
        console.log(`      Wrapped Gas Token: ${remoteChain.wrappedGasToken}`);
        console.log(`      Protocol Fee: ${FEE_CONFIG.protocolFee / 1e6} USDC`);
        console.log(`      VIA Source Fee: ${FEE_CONFIG.viaSourceFee / 1e6} USDC`);
        console.log(`      VIA Dest Gas: ${remoteChain.viaDestGas} wei`);

        // MESH TOPOLOGY: Authorize ALL chains as minters on synthetic contracts
        // This enables synthetic-to-synthetic transfers (e.g., Base HOA → Arbitrum HOA)
        // For hub-and-spoke topology (only collateral ↔ synthetic), use:
        //   const shouldAuthorizeMinter = remoteChain.type === "collateral";
        const shouldAuthorizeMinter = currentDeployment.type === "synthetic"; // Always true for synthetics
        if (currentDeployment.type === "synthetic") {
            console.log(`      Authorize Minter: ${shouldAuthorizeMinter}`);
        }

        try {
            const nonce = await ethers.provider.getTransactionCount(signer.address, "pending");
            console.log(`      Using Nonce: ${nonce}`);

            const overrides = {
                gasLimit: 350000,
                nonce: nonce
            };

            let tx;
            if (currentDeployment.type === "collateral") {
                // PRE-AUDIT ViaCollateralBridge.configureChain - 7 params
                // configureChain(chainId, remoteContract, wrappedGasToken, protocolFee, viaSourceFee, viaDestGas, supported)
                tx = await contract.configureChain(
                    remoteChain.chainId,
                    remoteChain.address,
                    remoteChain.wrappedGasToken,
                    FEE_CONFIG.protocolFee,
                    FEE_CONFIG.viaSourceFee,
                    remoteChain.viaDestGas,
                    true, // supported
                    overrides
                );
            } else {
                // PRE-AUDIT ViaSyntheticBridge.configureChain - 8 params
                // configureChain(chainId, remoteContract, wrappedGasToken, protocolFee, viaSourceFee, viaDestGas, supported, authorizedMinter)
                tx = await contract.configureChain(
                    remoteChain.chainId,
                    remoteChain.address,
                    remoteChain.wrappedGasToken,
                    FEE_CONFIG.protocolFee,
                    FEE_CONFIG.viaSourceFee,
                    remoteChain.viaDestGas,
                    true, // supported
                    shouldAuthorizeMinter, // authorizedMinter
                    overrides
                );
            }

            console.log(`      TX: ${tx.hash}`);
            await tx.wait();
            console.log(`      ✅ Configured!`);

            // Small delay to let RPC sync
            await new Promise(r => setTimeout(r, 2000));

        } catch (error) {
            console.error(`      ❌ Failed: ${error.message}`);
            // Continue with other chains
        }
    }

    // ========================================================================
    // VERIFICATION
    // ========================================================================
    console.log(`\n[VERIFICATION] Checking Configuration...`);
    console.log(`═══════════════════════════════════════════════════════`);

    for (const remoteChain of remoteChains) {
        try {
            const isConfigured = await contract.isChainConfigured(remoteChain.chainId);
            const status = isConfigured ? "✅" : "❌";

            if (currentDeployment.type === "synthetic") {
                const isAuthorized = await contract.isAuthorizedMinter(remoteChain.chainId);
                const minterStatus = isAuthorized ? "✅" : "❌";
                console.log(`   Chain ${remoteChain.chainId}: Configured ${status} | Minter ${minterStatus}`);
            } else {
                console.log(`   Chain ${remoteChain.chainId}: Configured ${status}`);
            }
        } catch (e) {
            console.log(`   Chain ${remoteChain.chainId}: ⚠️  Check failed`);
        }
    }

    console.log(`\n✅ ALL ROUTES CONFIGURED FOR ${tokenSymbol} ON ${networkName.toUpperCase()}!`);
    console.log(`═══════════════════════════════════════════════════════`);
    console.log(`   📋 Configured ${remoteChains.length} remote chains.`);
    console.log(`\n   📋 Next Steps:`);
    console.log(`   Run this script on ALL other chains with ${tokenSymbol} deployments:`);
    remoteChains.forEach((c) => {
        console.log(`      npx hardhat run scripts/pre-audit-scripts/configure-all-routes.js --network ${c.networkName} ${tokenSymbol}`);
    });
}

main().catch((error) => {
    console.error("\n❌ Configuration failed:", error.message);
    process.exit(1);
});
