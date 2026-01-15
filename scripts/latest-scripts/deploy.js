const hre = require("hardhat");
const fs = require("fs");
const path = require("path");
const chainsConfig = require("@vialabs-io/contracts/config/chains");

async function main() {
  const [deployer] = await hre.ethers.getSigners();
  const networkName = hre.network.name;
  const chainId = hre.network.config.chainId;

  console.log(`🚀 Deploying LATEST contracts on ${networkName}`);
  console.log(`👤 Deployer: ${deployer.address}`);

  const messageV3Address = chainsConfig[chainId]?.message;
  if (!messageV3Address) {
    throw new Error(`❌ MessageV3 address not found for chain ID ${chainId}`);
  }

  // Common addresses - REPLACE WITH ACTUAL MAINNET/TESTNET ADDRESSES
  const feeTokenAddress = {
    pulsechain_testnet: "0x225E04373c5a291f136a54A71994871044539491", // Example: USDC on PulseChain Testnet
    base_sepolia: "0x036CbD53842c5426634e7929541eC2318f3dCF7e", // USDC on Base Sepolia
  };

  const treasuryAddress = deployer.address; // Or a dedicated treasury address
  const ownerAddress = deployer.address; // Or a dedicated owner/multisig

  let contract;
  let deploymentData = {};

  if (networkName === "pulsechain_testnet") {
    // Deploy ViaCollateralBridge
    const collateralTokenAddress = "0xc16131616B78346eb58bfF11Fafc9895a7180d93"; // wPLS or other collateral token

    console.log("\nDeploying ViaCollateralBridge...");
    console.log(`  Collateral Token: ${collateralTokenAddress}`);
    console.log(`  Fee Token (USDC): ${feeTokenAddress[networkName]}`);
    console.log(`  MessageV3: ${messageV3Address}`);
    console.log(`  Treasury: ${treasuryAddress}`);
    console.log(`  Owner: ${ownerAddress}`);

    const Factory = await hre.ethers.getContractFactory(
      "contracts/latest/ViaCollateralBridge.sol:ViaCollateralBridge"
    );
    contract = await Factory.deploy(
      collateralTokenAddress,
      feeTokenAddress[networkName],
      messageV3Address,
      treasuryAddress,
      ownerAddress
    );

    await contract.waitForDeployment();
    const contractAddress = await contract.getAddress();
    console.log(`✅ ViaCollateralBridge deployed: ${contractAddress}`);

    deploymentData = {
      address: contractAddress,
      contractName: "ViaCollateralBridge",
      networkName: networkName,
      chainId: chainId,
      type: "collateral",
    };
  } else if (networkName === "base_sepolia") {
    // Deploy ViaSyntheticBridge
    const syntheticName = "Bridged ROB";
    const syntheticSymbol = "bROB";

    console.log("\nDeploying ViaSyntheticBridge...");
    console.log(`  Name: ${syntheticName}`);
    console.log(`  Symbol: ${syntheticSymbol}`);
    console.log(`  Fee Token (USDC): ${feeTokenAddress[networkName]}`);
    console.log(`  MessageV3: ${messageV3Address}`);
    console.log(`  Treasury: ${treasuryAddress}`);
    console.log(`  Owner: ${ownerAddress}`);

    const Factory = await hre.ethers.getContractFactory(
      "contracts/latest/ViaSyntheticBridge.sol:ViaSyntheticBridge"
    );
    contract = await Factory.deploy(
      syntheticName,
      syntheticSymbol,
      feeTokenAddress[networkName],
      messageV3Address,
      treasuryAddress,
      ownerAddress
    );

    await contract.waitForDeployment();
    const contractAddress = await contract.getAddress();
    console.log(`✅ ViaSyntheticBridge deployed: ${contractAddress}`);

    deploymentData = {
      address: contractAddress,
      contractName: "ViaSyntheticBridge",
      networkName: networkName,
      chainId: chainId,
      type: "synthetic",
    };
  } else {
    console.error(
      `\n❌ No deployment configuration for network: ${networkName}`
    );
    return;
  }

  // Save deployment info
  const deploymentsDir = path.join(__dirname, "..", "deployments");
  if (!fs.existsSync(deploymentsDir)) {
    fs.mkdirSync(deploymentsDir);
  }

  const deploymentsFilePath = path.join(
    deploymentsDir,
    "latest-deployments.json"
  );
  let deployments = {};
  if (fs.existsSync(deploymentsFilePath)) {
    deployments = JSON.parse(fs.readFileSync(deploymentsFilePath, "utf8"));
  }

  deployments[chainId] = deploymentData;

  fs.writeFileSync(deploymentsFilePath, JSON.stringify(deployments, null, 2));

  console.log(`\n💾 Deployment info saved to: ${deploymentsFilePath}`);
}

main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
