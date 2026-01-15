const hre = require("hardhat");
const chainsConfig = require("@vialabs-io/contracts/config/chains");
const {
    CHAINS,
    TOKENS,
    TREASURY,
    saveDeployment,
    getTokenConfig,
    getFeeToken,
    getChainByNetworkName,
} = require("./config");

/**
 * Deploy ViaCollateralBridge (Pre-Audit) on the collateral chain (PulseChain)
 * 
 * Pre-Audit Constructor:
 *   - collateralToken
 *   - feeToken (USDC)
 *   - messageV3Address
 *   - treasury
 *   - owner
 * 
 * Usage:
 *   npx hardhat run scripts/pre-audit-scripts/deploy-collateral.js --network pulsechain WPLS
 *   npx hardhat run scripts/pre-audit-scripts/deploy-collateral.js --network pulsechain_testnet WPLS
 */

async function main() {
    const [deployer] = await hre.ethers.getSigners();
    const networkName = hre.network.name;
    const chainId = hre.network.config.chainId;

    // Parse token symbol from command line
    const tokenSymbol = process.argv[2] || process.env.TOKEN_SYMBOL;
    if (!tokenSymbol) {
        console.error("❌ Usage: npx hardhat run deploy-collateral.js --network <network> <TOKEN_SYMBOL>");
        console.error("   Example: npx hardhat run deploy-collateral.js --network pulsechain WPLS");
        console.error(`   Available tokens: ${Object.keys(TOKENS).join(", ")}`);
        process.exit(1);
    }

    console.log(`\n🚀 DEPLOYING ViaCollateralBridge (Pre-Audit)`);
    console.log(`═══════════════════════════════════════════════════════`);
    console.log(`📍 Network: ${networkName} (Chain ID: ${chainId})`);
    console.log(`👤 Deployer: ${deployer.address}`);
    console.log(`🎯 Token: ${tokenSymbol}`);

    // Validate chain type
    const chain = getChainByNetworkName(networkName);
    if (!chain || chain.type !== "collateral") {
        console.error(`❌ This script must be run on a collateral chain (PulseChain).`);
        console.error(`   Current network "${networkName}" is type: ${chain?.type || "unknown"}`);
        process.exit(1);
    }

    // Get token configuration
    const tokenConfig = getTokenConfig(tokenSymbol);
    const collateralTokenAddress = tokenConfig.addresses[networkName] || tokenConfig.addresses.pulsechain;
    if (!collateralTokenAddress || collateralTokenAddress === "0x0000000000000000000000000000000000000000") {
        console.error(`❌ Collateral token address not configured for ${tokenSymbol} on ${networkName}`);
        process.exit(1);
    }

    // Get MessageV3 address from VIA config
    const messageV3Address = chainsConfig[chainId]?.message;
    if (!messageV3Address) {
        console.error(`❌ MessageV3 address not found for chain ID ${chainId}`);
        process.exit(1);
    }

    // Get fee token (USDC)
    const feeTokenAddress = getFeeToken(networkName);

    // Treasury and owner
    const treasuryAddress = TREASURY !== "0x0000000000000000000000000000000000000000"
        ? TREASURY
        : deployer.address;
    const ownerAddress = process.env.OWNER_ADDRESS || deployer.address;

    console.log(`\n📋 Deployment Parameters:`);
    console.log(`   Collateral Token: ${collateralTokenAddress}`);
    console.log(`   Fee Token (USDC): ${feeTokenAddress}`);
    console.log(`   MessageV3: ${messageV3Address}`);
    console.log(`   Treasury: ${treasuryAddress}`);
    console.log(`   Owner: ${ownerAddress}`);

    console.log(`\n⏳ Deploying contract...`);

    const Factory = await hre.ethers.getContractFactory(
        "contracts/pre-audit/ViaCollateralBridge.sol:ViaCollateralBridge"
    );

    // Pre-Audit Constructor: collateralToken, feeToken, messageV3, treasury, owner
    const contract = await Factory.deploy(
        collateralTokenAddress,
        feeTokenAddress,
        messageV3Address,
        treasuryAddress,
        ownerAddress
    );

    await contract.waitForDeployment();
    const contractAddress = await contract.getAddress();

    console.log(`\n✅ ViaCollateralBridge (Pre-Audit) deployed!`);
    console.log(`   Address: ${contractAddress}`);
    console.log(`   Token: ${tokenSymbol} (${tokenConfig.name})`);

    // Save deployment
    saveDeployment(tokenSymbol, networkName, contractAddress, "collateral");

    console.log(`\n📋 Next Steps:`);
    console.log(`   1. Deploy ViaSyntheticBridge on destination chains`);
    console.log(`   2. Run configure-all-routes.js to set up cross-chain routing`);
    console.log(`      (This will configure MessageClient AND chain settings including wrappedGasToken)`);
    console.log(`\n🔗 Contract: ${contractAddress}`);
}

main().catch((error) => {
    console.error("\n❌ Deployment failed:", error.message);
    process.exit(1);
});
