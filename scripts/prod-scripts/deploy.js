const hre = require("hardhat");
const chainsConfig = require("@vialabs-io/contracts/config/chains");

async function main() {
  const [deployer] = await hre.ethers.getSigners();
  const networkName = hre.network.name;
  const chainId = hre.network.config.chainId;

  console.log(`🚀 Deploying PRODUCTION contracts on ${networkName}`);
  console.log(`👤 Deployer: ${deployer.address}`);

  const messageV3Address = chainsConfig[chainId].message;

  if (networkName === "pulsechain_testnet") {
    // Deploy enhanced collateral contract
    const wrappedTokenAddress = "0xc16131616B78346eb58bfF11Fafc9895a7180d93";

    const Factory = await hre.ethers.getContractFactory("ViaERC20Collateral");
    const contract = await Factory.deploy(
      wrappedTokenAddress,
      messageV3Address,
      deployer.address // Owner
    );

    await contract.waitForDeployment();
    console.log(
      `✅ ViaERC20Collateral deployed: ${await contract.getAddress()}`
    );
  } else if (networkName === "base_sepolia") {
    // Deploy enhanced ERC20 contract
    const Factory = await hre.ethers.getContractFactory("ViaERC20");
    const contract = await Factory.deploy(
      "Bridged Rise Of Bat", // Name
      "bROB", // Symbol
      0, // Initial supply (0 for destination)
      messageV3Address,
      deployer.address // Owner
    );

    await contract.waitForDeployment();
    console.log(`✅ ViaERC20 deployed: ${await contract.getAddress()}`);
  }
}

main().catch(console.error);
