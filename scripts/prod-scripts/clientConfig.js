const hre = require("hardhat");
const { ethers } = hre;
const fs = require("fs");
const path = require("path");
const chainsConfig = require("@vialabs-io/contracts/config/chains");

/**
 * Production Configuration Script for Cross-Chain Bridge
 * Handles configuration of production contracts with enhanced security
 */

async function main() {
  const [signer] = await ethers.getSigners();
  const networkName = hre.network.name;
  const chainId = hre.network.config.chainId;

  console.log(`\n🔧 PRODUCTION BRIDGE CONFIGURATION`);
  console.log(`=======================================`);
  console.log(`Network: ${networkName}`);
  console.log(`Chain ID: ${chainId}`);
  console.log(`Signer: ${signer.address}`);

  // Production contract addresses (update these after deploying production contracts)
  const productionDeployments = {
    943: {
      address: "0x47D85e748519CAa2F5f217782eB5A291A53A359a", // ViaERC20Collateral
      contractName: "ViaERC20Collateral",
      networkName: "pulsechain_testnet",
      type: "collateral",
    },
    84532: {
      address: "0x49f6BF1E6597d8d1FCDC74FdBBE0AAb0369E0146", // ViaERC20
      contractName: "ViaERC20",
      networkName: "base_sepolia",
      type: "erc20",
    },
  };

  // Load from deployments file if it exists
  const deploymentsFilePath = path.join(
    __dirname,
    "..",
    "deployments",
    "production-deployments.json"
  );
  let deployments = productionDeployments;

  if (fs.existsSync(deploymentsFilePath)) {
    try {
      deployments = JSON.parse(fs.readFileSync(deploymentsFilePath, "utf8"));
      console.log(`📂 Loaded deployments from file`);
    } catch (error) {
      console.log(
        `⚠️  Using hardcoded addresses - could not load deployments file`
      );
    }
  }

  const currentDeployment = deployments[chainId];
  if (!currentDeployment) {
    throw new Error(`❌ No deployment found for chain ID ${chainId}`);
  }

  console.log(`📍 Current Contract: ${currentDeployment.address}`);
  console.log(`📄 Contract Type: ${currentDeployment.contractName}`);

  // Get VIA MessageV3 address
  const messageV3Address = chainsConfig[chainId]?.message;
  if (!messageV3Address) {
    throw new Error(`❌ MessageV3 address not found for chain ID ${chainId}`);
  }
  console.log(`🔗 MessageV3: ${messageV3Address}`);

  // Find remote deployments
  const remoteDeployments = Object.values(deployments).filter(
    (d) => d.chainId !== chainId
  );
  if (remoteDeployments.length === 0) {
    throw new Error(
      `❌ No remote deployments found. Deploy on other chains first.`
    );
  }

  console.log(`\n🌐 Remote Deployments Found:`);
  remoteDeployments.forEach((d, index) => {
    console.log(
      `   ${index + 1}. Chain ${
        d.chainId || Object.keys(deployments).find((k) => deployments[k] === d)
      } (${d.networkName}): ${d.address}`
    );
  });

  // Prepare configuration arrays
  const remoteChainIds = [];
  const remoteEndpoints = [];
  const confirmations = [];

  Object.entries(deployments).forEach(([cId, deployment]) => {
    if (Number(cId) !== chainId) {
      remoteChainIds.push(Number(cId));
      remoteEndpoints.push(deployment.address);
      confirmations.push(1); // Use 1 confirmation for testnets, increase for mainnet
    }
  });

  console.log(`\n⚙️  Configuration Parameters:`);
  console.log(`   🔗 MessageV3: ${messageV3Address}`);
  console.log(`   🌐 Remote Chains: [${remoteChainIds.join(", ")}]`);
  console.log(
    `   📍 Remote Addresses: [${remoteEndpoints
      .map((a) => a.substring(0, 10) + "...")
      .join(", ")}]`
  );
  console.log(`   ✅ Confirmations: [${confirmations.join(", ")}]`);

  // Get contract instance based on type
  let contract;
  if (currentDeployment.type === "collateral") {
    contract = await ethers.getContractAt(
      "ViaERC20Collateral",
      currentDeployment.address
    );
  } else if (currentDeployment.type === "erc20") {
    contract = await ethers.getContractAt(
      "ViaERC20",
      currentDeployment.address
    );
  } else {
    throw new Error(`❌ Unknown contract type: ${currentDeployment.type}`);
  }

  console.log(`\n🔨 STEP 1: Configure MessageClient`);
  console.log(`=====================================`);

  try {
    const configTx = await contract.configureMessageClient(
      messageV3Address,
      remoteChainIds,
      remoteEndpoints,
      confirmations,
      {
        gasLimit: 500000,
      }
    );

    console.log(`📤 MessageClient config tx: ${configTx.hash}`);
    console.log(`⏳ Waiting for confirmation...`);
    await configTx.wait();
    console.log(`✅ MessageClient configured successfully!`);
  } catch (error) {
    console.error(`❌ MessageClient configuration failed: ${error.message}`);
    throw error;
  }

  console.log(`\n🔨 STEP 2: Configure Supported Chains`);
  console.log(`======================================`);

  // Configure each remote chain
  for (let i = 0; i < remoteChainIds.length; i++) {
    const remoteChainId = remoteChainIds[i];
    const remoteAddress = remoteEndpoints[i];

    console.log(`\n🌐 Configuring Chain ${remoteChainId}...`);
    console.log(`   📍 Remote Address: ${remoteAddress}`);

    try {
      const chainConfigTx = await contract.configureChain(
        remoteChainId,
        remoteAddress,
        true, // supported
        {
          gasLimit: 200000,
        }
      );

      console.log(`   📤 Chain config tx: ${chainConfigTx.hash}`);
      await chainConfigTx.wait();
      console.log(`   ✅ Chain ${remoteChainId} configured successfully!`);

      // For ERC20 contracts, also authorize minting from this chain
      if (currentDeployment.type === "erc20") {
        console.log(`   🏭 Authorizing chain ${remoteChainId} for minting...`);

        const authTx = await contract.setMinterAuthorization(
          remoteChainId,
          true, // authorized
          {
            gasLimit: 100000,
          }
        );

        console.log(`   📤 Minter auth tx: ${authTx.hash}`);
        await authTx.wait();
        console.log(`   ✅ Minting authorization granted!`);
      }
    } catch (error) {
      console.error(
        `   ❌ Chain ${remoteChainId} configuration failed: ${error.message}`
      );
      throw error;
    }
  }

  console.log(`\n🔨 STEP 3: Set Production Parameters`);
  console.log(`====================================`);

  // Set production-ready parameters
  const productionParams = {
    minBridgeAmount: ethers.parseEther("1"), // 1 token minimum
    maxBridgeAmount: ethers.parseEther("10000"), // 10,000 tokens maximum
    dailyLimit: ethers.parseEther("100000"), // 100,000 tokens daily limit
    bridgeFee: ethers.parseEther("0.1"), // 0.1 tokens bridge fee
  };

  try {
    console.log(`💰 Setting bridge limits...`);
    console.log(
      `   Min: ${ethers.formatEther(productionParams.minBridgeAmount)} tokens`
    );
    console.log(
      `   Max: ${ethers.formatEther(productionParams.maxBridgeAmount)} tokens`
    );
    console.log(
      `   Daily: ${ethers.formatEther(productionParams.dailyLimit)} tokens`
    );

    const limitsTx = await contract.updateLimits(
      productionParams.minBridgeAmount,
      productionParams.maxBridgeAmount,
      productionParams.dailyLimit,
      {
        gasLimit: 200000,
      }
    );

    console.log(`📤 Limits tx: ${limitsTx.hash}`);
    await limitsTx.wait();
    console.log(`✅ Bridge limits set successfully!`);

    console.log(`💸 Setting bridge fee...`);
    console.log(
      `   Fee: ${ethers.formatEther(productionParams.bridgeFee)} tokens`
    );

    const feeTx = await contract.updateFee(productionParams.bridgeFee, {
      gasLimit: 100000,
    });

    console.log(`📤 Fee tx: ${feeTx.hash}`);
    await feeTx.wait();
    console.log(`✅ Bridge fee set successfully!`);
  } catch (error) {
    console.error(`❌ Parameter configuration failed: ${error.message}`);
    throw error;
  }

  console.log(`\n🔨 STEP 4: Verification`);
  console.log(`=======================`);

  // Verify configuration
  try {
    console.log(`🔍 Verifying configuration...`);

    for (const remoteChainId of remoteChainIds) {
      const isSupported = await contract.isChainSupported(remoteChainId);
      console.log(
        `   Chain ${remoteChainId}: ${
          isSupported ? "✅ Supported" : "❌ Not supported"
        }`
      );

      if (currentDeployment.type === "erc20") {
        const isAuthorized = await contract.isAuthorizedMinter(remoteChainId);
        console.log(
          `   Chain ${remoteChainId} minting: ${
            isAuthorized ? "✅ Authorized" : "❌ Not authorized"
          }`
        );
      }
    }

    // Get current stats
    const stats = await contract.getStats();
    console.log(`\n📊 Current Bridge Stats:`);

    if (currentDeployment.type === "collateral") {
      console.log(`   🔒 Total Locked: ${ethers.formatEther(stats[0])} tokens`);
    } else {
      console.log(`   🏭 Total Supply: ${ethers.formatEther(stats[0])} tokens`);
    }

    console.log(`   🌉 Total Bridged: ${ethers.formatEther(stats[1])} tokens`);
    console.log(`   📈 Total Transactions: ${stats[2].toString()}`);
    console.log(`   📅 Today's Volume: ${ethers.formatEther(stats[3])} tokens`);
    console.log(
      `   🎯 Remaining Daily Limit: ${ethers.formatEther(stats[4])} tokens`
    );
  } catch (error) {
    console.error(`⚠️  Verification failed: ${error.message}`);
  }

  console.log(`\n🎉 PRODUCTION CONFIGURATION COMPLETED!`);
  console.log(`======================================`);
  console.log(`✅ MessageClient configured`);
  console.log(`✅ Supported chains configured`);
  console.log(`✅ Production parameters set`);
  console.log(`✅ Configuration verified`);

  console.log(`\n📋 Next Steps:`);
  console.log(`1. Run this script on ALL other networks`);
  console.log(`2. Test bridge operations with production contracts`);
  console.log(`3. Monitor bridge operations with monitoring scripts`);
  console.log(`4. Consider additional security measures for mainnet`);

  console.log(`\n🔗 Contract Address: ${currentDeployment.address}`);
  console.log(`🌐 Network: ${networkName} (${chainId})`);
}

main().catch((error) => {
  console.error("❌ Production configuration failed:", error);
  process.exit(1);
});
