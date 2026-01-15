const hre = require("hardhat");
const chainsConfig = require("@vialabs-io/contracts/config/chains");
const {
    CHAINS,
    TOKENS,
    FEE_CONFIG,
    TREASURY,
    saveDeployment,
    getTokenConfig,
    getFeeToken,
    getWrappedGasToken,
    getChainByNetworkName,
    isTestnet,
} = require("./config");

/**
 * Deploy ViaCollateralBridgeV3 on the collateral chain (PulseChain)
 * 
 * Usage:
 *   npx hardhat run scripts/audited-scripts/deploy-collateral.js --network pulsechain WPLS
 *   npx hardhat run scripts/audited-scripts/deploy-collateral.js --network pulsechain_testnet WPLS
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

    console.log(`\n🚀 DEPLOYING ViaCollateralBridgeV6`);
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

    // V6: Get wrapped gas token for the source chain (global for all destinations)
    const wrappedGasTokenAddress = getWrappedGasToken(networkName);
    if (!wrappedGasTokenAddress || wrappedGasTokenAddress === "0x0000000000000000000000000000000000000000") {
        console.error(`❌ Wrapped gas token not configured for ${networkName}`);
        process.exit(1);
    }

    // Treasury and owner
    const treasuryAddress = TREASURY !== "0x0000000000000000000000000000000000000000"
        ? TREASURY
        : deployer.address;
    const ownerAddress = process.env.OWNER_ADDRESS || deployer.address;

    console.log(`\n📋 Deployment Parameters:`);
    console.log(`   Collateral Token: ${collateralTokenAddress}`);
    console.log(`   Fee Token (USDC): ${feeTokenAddress}`);
    console.log(`   Wrapped Gas Token: ${wrappedGasTokenAddress}`);
    console.log(`   MessageV3: ${messageV3Address}`);
    console.log(`   Treasury: ${treasuryAddress}`);
    console.log(`   Owner: ${ownerAddress}`);

    console.log(`\n⏳ Deploying contract...`);

    const Factory = await hre.ethers.getContractFactory(
        "contracts/updated-v6/via-collateral-v6.sol:ViaCollateralBridgeV6"
    );

    // V6 Constructor: collateralToken, feeToken, wrappedGasToken, messageV3, treasury, owner
    const contract = await Factory.deploy(
        collateralTokenAddress,
        feeTokenAddress,
        wrappedGasTokenAddress,
        messageV3Address,
        treasuryAddress,
        ownerAddress
    );

    await contract.waitForDeployment();
    const contractAddress = await contract.getAddress();

    console.log(`\n✅ ViaCollateralBridgeV6 deployed!`);
    console.log(`   Address: ${contractAddress}`);
    console.log(`   Token: ${tokenSymbol} (${tokenConfig.name})`);

    // Save deployment
    saveDeployment(tokenSymbol, networkName, contractAddress, "collateral");

    console.log(`\n📋 Next Steps:`);
    console.log(`   1. Deploy ViaSyntheticBridgeV3 on destination chains`);
    console.log(`   2. Run configure-message-client.js on this and all destination chains`);
    console.log(`   3. Run configure-chain.js to set up cross-chain routing`);
    console.log(`\n🔗 Contract: ${contractAddress}`);
}

main().catch((error) => {
    console.error("\n❌ Deployment failed:", error.message);
    process.exit(1);
});
