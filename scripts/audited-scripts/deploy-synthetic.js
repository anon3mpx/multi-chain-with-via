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
 * Deploy ViaSyntheticBridgeV3 on destination chains
 * 
 * Usage:
 *   npx hardhat run scripts/audited-scripts/deploy-synthetic.js --network base WPLS
 *   npx hardhat run scripts/audited-scripts/deploy-synthetic.js --network base_sepolia WPLS
 */

async function main() {
    const [deployer] = await hre.ethers.getSigners();
    const networkName = hre.network.name;
    const chainId = hre.network.config.chainId;

    // Parse token symbol from command line
    const tokenSymbol = process.argv[2] || process.env.TOKEN_SYMBOL;
    if (!tokenSymbol) {
        console.error("❌ Usage: npx hardhat run deploy-synthetic.js --network <network> <TOKEN_SYMBOL>");
        console.error("   Example: npx hardhat run deploy-synthetic.js --network base WPLS");
        console.error(`   Available tokens: ${Object.keys(TOKENS).join(", ")}`);
        process.exit(1);
    }

    console.log(`\n🚀 DEPLOYING ViaSyntheticBridgeV6`);
    console.log(`═══════════════════════════════════════════════════════`);
    console.log(`📍 Network: ${networkName} (Chain ID: ${chainId})`);
    console.log(`👤 Deployer: ${deployer.address}`);
    console.log(`🎯 Token: ${tokenSymbol}`);

    // Validate chain type
    const chain = getChainByNetworkName(networkName);
    if (!chain || chain.type !== "synthetic") {
        console.error(`❌ This script must be run on a synthetic/destination chain.`);
        console.error(`   Current network "${networkName}" is type: ${chain?.type || "unknown"}`);
        process.exit(1);
    }

    // Get token configuration
    const tokenConfig = getTokenConfig(tokenSymbol);

    // Synthetic token naming
    const syntheticName = `${tokenConfig.name}`;
    const syntheticSymbol = `${tokenConfig.symbol}`;

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
    console.log(`   Synthetic Name: ${syntheticName}`);
    console.log(`   Synthetic Symbol: ${syntheticSymbol}`);
    console.log(`   Fee Token (USDC): ${feeTokenAddress}`);
    console.log(`   Wrapped Gas Token: ${wrappedGasTokenAddress}`);
    console.log(`   MessageV3: ${messageV3Address}`);
    console.log(`   Treasury: ${treasuryAddress}`);
    console.log(`   Owner: ${ownerAddress}`);

    console.log(`\n⏳ Deploying contract...`);

    const Factory = await hre.ethers.getContractFactory(
        "contracts/updated-v6/via-synthetic-v6.sol:ViaSyntheticBridgeV6"
    );

    // V6 Constructor: name, symbol, feeToken, wrappedGasToken, messageV3, treasury, owner
    const contract = await Factory.deploy(
        syntheticName,
        syntheticSymbol,
        feeTokenAddress,
        wrappedGasTokenAddress,
        messageV3Address,
        treasuryAddress,
        ownerAddress
    );

    await contract.waitForDeployment();
    const contractAddress = await contract.getAddress();

    console.log(`\n✅ ViaSyntheticBridgeV6 deployed!`);
    console.log(`   Address: ${contractAddress}`);
    console.log(`   Token: ${syntheticSymbol} (${syntheticName})`);

    // Save deployment
    saveDeployment(tokenSymbol, networkName, contractAddress, "synthetic");

    console.log(`\n📋 Next Steps:`);
    console.log(`   1. Deploy on other destination chains if needed`);
    console.log(`   2. Run configure-message-client.js on this chain`);
    console.log(`   3. Run configure-chain.js to set up cross-chain routing`);
    console.log(`\n🔗 Contract: ${contractAddress}`);
}

main().catch((error) => {
    console.error("\n❌ Deployment failed:", error.message);
    process.exit(1);
});
