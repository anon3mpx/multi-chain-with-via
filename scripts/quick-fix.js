const hre = require("hardhat");
const chainsConfig = require("@vialabs-io/contracts/config/chains");

async function main() {
  const [signer] = await ethers.getSigners();

  console.log(`🚨 QUICK FIX: Configuring cross-chain bridge`);
  console.log(`Network: ${hre.network.name}`);

  // Your current deployment addresses from the logs
  const deployments = {
    943: "0x91E34254655381F873bC50EA1e7Ac9fD4594FAD8", // PulseChain Testnet
    84532: "0x19BBE0f501251aC16Fcc72cc9AF8678Fc6AAC594", // Base Sepolia
  };

  const currentChainId = hre.network.config.chainId;
  const currentAddress = deployments[currentChainId];

  if (!currentAddress) {
    throw new Error(`No deployment found for chain ${currentChainId}`);
  }

  console.log(`Current contract: ${currentAddress}`);

  // Find remote chain
  const remoteChainId = currentChainId === 943 ? 84532 : 943;
  const remoteAddress = deployments[remoteChainId];

  console.log(`Configuring remote: Chain ${remoteChainId} -> ${remoteAddress}`);

  // Get MessageV3 address
  const messageV3Address = chainsConfig[currentChainId]?.message;
  if (!messageV3Address) {
    throw new Error(`MessageV3 not found for chain ${currentChainId}`);
  }

  console.log(`MessageV3: ${messageV3Address}`);

  // Configure
  const contract = await hre.ethers.getContractAt(
    "ViaERC20Collateral",
    currentAddress
  );

  const tx = await contract.configureClient(
    messageV3Address,
    [remoteChainId],
    [remoteAddress],
    [1], // 1 confirmation
    {
      gasLimit: 500000,
    }
  );

  console.log(`Configuration tx: ${tx.hash}`);
  await tx.wait();
  console.log(`✅ Configuration successful!`);

  console.log(
    `\n🔥 CONFIGURATION COMPLETE FOR ${hre.network.name.toUpperCase()}`
  );
  console.log(`\nNext steps:`);
  console.log(`1. Run this same script on the OTHER network`);
  console.log(`2. Test bridging with the debug script`);
}

main().catch((error) => {
  console.error("Fix failed:", error);
  process.exit(1);
});
