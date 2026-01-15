const hre = require("hardhat");
const { ethers } = hre;
const chainsConfig = require("@vialabs-io/contracts/config/chains");
const {
    getAllDeploymentsForToken,
    getChainByNetworkName,
    FEE_CONFIG,
    isTestnet,
} = require("./config");

/**
 * Fix MessageClient WETH/WPLS Approval
 * 
 * This script calls configureClient on the MessageClient base contract
 * to trigger _configureMessageV3(), which approves MESSAGEv3.weth() for spending.
 * 
 * This fixes the issue where bridging TO collateral chains fails because
 * the wrapped gas token (WPLS) wasn't approved for MessageV3.
 * 
 * Usage:
 *   npx hardhat run scripts/pre-audit-scripts/fix-weth-approval.js --network pulsechain HOA
 *   npx hardhat run scripts/pre-audit-scripts/fix-weth-approval.js --network pulsechain PLSX
 */

async function main() {
    const [signer] = await ethers.getSigners();
    const networkName = hre.network.name;
    const chainId = hre.network.config.chainId;

    const tokenSymbol = process.argv[2] || process.env.TOKEN_SYMBOL;
    if (!tokenSymbol) {
        console.error("❌ Usage: npx hardhat run fix-weth-approval.js --network <network> <TOKEN_SYMBOL>");
        process.exit(1);
    }

    console.log(`\n🔧 FIX WETH/WPLS APPROVAL (MessageClient)`);
    console.log(`═══════════════════════════════════════════════════════`);
    console.log(`📍 Network: ${networkName} (Chain ID: ${chainId})`);
    console.log(`👤 Signer: ${signer.address}`);
    console.log(`🎯 Token: ${tokenSymbol}`);

    // Get deployment
    const allDeployments = getAllDeploymentsForToken(tokenSymbol);
    const currentDeployment = allDeployments[networkName];

    if (!currentDeployment) {
        console.error(`❌ No deployment found for ${tokenSymbol} on ${networkName}`);
        process.exit(1);
    }

    console.log(`\n📍 Contract: ${currentDeployment.address}`);
    console.log(`   Type: ${currentDeployment.type}`);

    // Get MessageV3 address
    const messageV3Address = chainsConfig[chainId]?.message;
    if (!messageV3Address) {
        console.error(`❌ MessageV3 address not found for chain ID ${chainId}`);
        process.exit(1);
    }
    console.log(`   MessageV3: ${messageV3Address}`);

    // Build remote chains list
    const isCurrentTestnet = isTestnet(networkName);
    const remoteChains = [];

    for (const [deployNetworkName, deployment] of Object.entries(allDeployments)) {
        if (deployNetworkName !== networkName && isTestnet(deployNetworkName) === isCurrentTestnet) {
            const chain = getChainByNetworkName(deployNetworkName);
            if (chain) {
                remoteChains.push({
                    chainId: chain.chainId,
                    address: deployment.address,
                    name: chain.name,
                });
            }
        }
    }

    if (remoteChains.length === 0) {
        console.log(`\n⚠️  No remote chains configured.`);
        return;
    }

    console.log(`\n🌐 Remote Chains (${remoteChains.length} total):`);
    remoteChains.forEach((c) => console.log(`   - Chain ${c.chainId} (${c.name}): ${c.address}`));

    // Get contract - we need to access the MessageClient interface
    const contractName = currentDeployment.type === "collateral"
        ? "contracts/pre-audit/ViaCollateralBridge.sol:ViaCollateralBridge"
        : "contracts/pre-audit/ViaSyntheticBridge.sol:ViaSyntheticBridge";

    const contract = await ethers.getContractAt(contractName, currentDeployment.address);

    // Prepare params for configureMessageClient
    const remoteChainIds = remoteChains.map((c) => c.chainId);
    const remoteEndpoints = remoteChains.map((c) => c.address);
    const confirmationCount = isCurrentTestnet
        ? FEE_CONFIG.confirmations.testnet
        : FEE_CONFIG.confirmations.mainnet;
    const confirmations = remoteChains.map(() => confirmationCount);

    console.log(`\n⏳ Calling configureMessageClient to trigger WETH approval...`);
    console.log(`   This will call configureClient → _configureMessageV3()`);
    console.log(`   Which approves MESSAGEv3.weth() for spending`);

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
        console.log(`   ✅ MessageClient reconfigured!`);

        // Verify MESSAGEv3 is set
        try {
            const messageV3 = await contract.MESSAGEv3();
            console.log(`\n🔍 Verification:`);
            console.log(`   MESSAGEv3: ${messageV3}`);

            // Check WETH address from MessageV3
            const IMessageV3 = await ethers.getContractAt("IMessageV3", messageV3);
            const wethAddress = await IMessageV3.weth();
            console.log(`   MESSAGEv3.weth(): ${wethAddress}`);

            if (wethAddress !== ethers.constants.AddressZero) {
                // Check approval
                const wethContract = await ethers.getContractAt("IERC20", wethAddress);
                const allowance = await wethContract.allowance(currentDeployment.address, messageV3);
                const isApproved = allowance.gt(0);
                console.log(`   WETH Allowance: ${ethers.utils.formatEther(allowance)} (${isApproved ? "✅ Approved" : "❌ Not Approved"})`);
            }
        } catch (e) {
            console.log(`   ⚠️  Verification check failed: ${e.message}`);
        }

    } catch (error) {
        console.error(`\n❌ Failed: ${error.message}`);
        throw error;
    }

    console.log(`\n✅ WETH/WPLS APPROVAL FIX COMPLETE!`);
    console.log(`═══════════════════════════════════════════════════════`);
    console.log(`\n📋 Run on other chains/tokens as needed:`);
    console.log(`   npx hardhat run scripts/pre-audit-scripts/fix-weth-approval.js --network pulsechain HOA`);
    console.log(`   npx hardhat run scripts/pre-audit-scripts/fix-weth-approval.js --network pulsechain PLSX`);
    console.log(`   npx hardhat run scripts/pre-audit-scripts/fix-weth-approval.js --network pulsechain COCK`);
}

main().catch((error) => {
    console.error("\n❌ Fix failed:", error.message);
    process.exit(1);
});
