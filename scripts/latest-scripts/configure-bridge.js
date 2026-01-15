const hre = require("hardhat");
const { ethers } = hre;
const fs = require("fs");
const path = require("path");
const chainsConfig = require("@vialabs-io/contracts/config/chains");

/**
 * LATEST Configuration Script for Cross-Chain Bridge
 * Handles configuration of the latest ViaCollateralBridge and ViaSyntheticBridge contracts.
 */

async function main() {
  const [signer] = await ethers.getSigners();
  const networkName = hre.network.name;
  const chainId = hre.network.config.chainId;

  console.log(`\n🔧 LATEST BRIDGE CONFIGURATION`);
  console.log(`=======================================`);
  console.log(`Network: ${networkName} (Chain ID: ${chainId})`);
  console.log(`Signer: ${signer.address}`);

  // --- CONFIGURATION ---
  // Note: These are example values. Adjust for your specific needs.
  const config = {
    // Fees in USDC (6 decimals)
    protocolFee: 1_000_000, // 1 USDC
    viaSourceFee: 500_000,  // 0.5 USDC

    // Destination gas amounts (in units of the wrapped gas token)
    // This is the fee paid to VIA for execution on the destination chain.
    // Example: 0.01 WETH on Base Sepolia
    viaDestGas_To_Base: ethers.parseEther("0.001"),
    // Example: 1 WPLS on PulseChain Testnet
    viaDestGas_To_PLS: ethers.parseEther("1"),

    // Wrapped Gas Tokens: Address of the token on THIS chain that represents
    // the gas token of the DESTINATION chain.
    wrappedGasToken: {
      // When on PulseChain, this is the address of wrapped ETH (for Base dest)
      pulsechain_testnet: "0x225E04373c5a291f136a54A71994871044539491", // REPLACE: Wrapped ETH on PulseChain
      // When on Base, this is the address of wrapped PLS (for PLS dest)
      base_sepolia: "0x036CbD53842c5426634e7929541eC2318f3dCF7e",       // REPLACE: Wrapped PLS on Base
    },
  };
  // --- END CONFIGURATION ---

  // Load deployments
  const deploymentsFilePath = path.join(__dirname, "..", "deployments", "latest-deployments.json");
  if (!fs.existsSync(deploymentsFilePath)) {
    throw new Error(`❌ Deployments file not found. Run deploy script first: ${deploymentsFilePath}`);
  }
  const deployments = JSON.parse(fs.readFileSync(deploymentsFilePath, "utf8"));

  const currentDeployment = deployments[chainId];
  if (!currentDeployment) {
    throw new Error(`❌ No deployment found for current chain ID ${chainId} in latest-deployments.json`);
  }

  console.log(`\n📍 Current Contract: ${currentDeployment.contractName}`);
  console.log(`   Address: ${currentDeployment.address}`);

  // Get contract instance
  const contract = await ethers.getContractAt(currentDeployment.contractName, currentDeployment.address);

  // Prepare remote configuration
  const remoteChainIds = [];
  const remoteEndpoints = [];
  const confirmations = [];

  for (const cId in deployments) {
    if (Number(cId) !== chainId) {
      remoteChainIds.push(Number(cId));
      remoteEndpoints.push(deployments[cId].address);
      confirmations.push(1); // 1 confirmation for testnets
    }
  }

  if (remoteChainIds.length === 0) {
    console.log("\n⚠️ No remote deployments found. Skipping cross-chain configuration.");
    console.log("   Deploy contracts on other chains and re-run this script.");
  } else {
    console.log(`\n🌐 Remote Deployments Found:`);
    remoteChainIds.forEach((id, i) => console.log(`   - Chain ${id}: ${remoteEndpoints[i]}`));

    // 1. Configure MessageClient
    console.log(`\n[STEP 1] Configuring MessageClient...`);
    const messageV3Address = chainsConfig[chainId]?.message;
    if (!messageV3Address) {
      throw new Error(`❌ MessageV3 address not found for chain ID ${chainId}`);
    }

    try {
      const tx = await contract.configureMessageClient(
        messageV3Address,
        remoteChainIds,
        remoteEndpoints,
        confirmations,
        { gasLimit: 500000 }
      );
      console.log(`  TX Sent: ${tx.hash}`);
      await tx.wait();
      console.log(`  ✅ MessageClient configured successfully.`);
    } catch (e) {
      console.error(`  ❌ FAILED to configure MessageClient: ${e.message}`);
      throw e;
    }

    // 2. Configure each remote chain
    console.log(`\n[STEP 2] Configuring remote chains...`);
    for (let i = 0; i < remoteChainIds.length; i++) {
      const remoteChainId = remoteChainIds[i];
      const remoteAddress = remoteEndpoints[i];
      const remoteDeployment = deployments[remoteChainId];

      console.log(`\n  Configuring Chain ${remoteChainId} (${remoteDeployment.networkName})...`);

      const isBaseDest = remoteDeployment.networkName === 'base_sepolia';
      const viaDestGas = isBaseDest ? config.viaDestGas_To_Base : config.viaDestGas_To_PLS;
      const wrappedGasTokenAddress = config.wrappedGasToken[networkName];

      console.log(`    Remote Contract: ${remoteAddress}`);
      console.log(`    Wrapped Gas Token: ${wrappedGasTokenAddress}`);
      console.log(`    Protocol Fee: ${config.protocolFee / 1e6} USDC`);
      console.log(`    VIA Source Fee: ${config.viaSourceFee / 1e6} USDC`);
      console.log(`    VIA Dest Gas: ${ethers.formatEther(viaDestGas)} units`);

      try {
        let tx;
        if (currentDeployment.type === "collateral") {
          tx = await contract.configureChain(
            remoteChainId,
            remoteAddress,
            wrappedGasTokenAddress,
            config.protocolFee,
            config.viaSourceFee,
            viaDestGas,
            true, // supported
            { gasLimit: 300000 }
          );
        } else { // synthetic
          tx = await contract.configureChain(
            remoteChainId,
            remoteAddress,
            wrappedGasTokenAddress,
            config.protocolFee,
            config.viaSourceFee,
            viaDestGas,
            true, // supported
            remoteDeployment.type === 'collateral', // authorize minter if remote is collateral
            { gasLimit: 350000 }
          );
           console.log(`    Minter Auth: ${remoteDeployment.type === 'collateral'}`);
        }
        console.log(`    TX Sent: ${tx.hash}`);
        await tx.wait();
        console.log(`    ✅ Chain ${remoteChainId} configured successfully.`);
      } catch (e) {
        console.error(`    ❌ FAILED to configure chain ${remoteChainId}: ${e.message}`);
        throw e;
      }
    }
  }

  console.log(`\n[STEP 3] Verification...`);
  try {
    for (const remoteChainId of remoteChainIds) {
        const isConfigured = await contract.isChainConfigured(remoteChainId);
        console.log(`  Chain ${remoteChainId} configured: ${isConfigured ? "✅" : "❌"}`);

        if (currentDeployment.type === "synthetic") {
            const isMinter = await contract.isAuthorizedMinter(remoteChainId);
            const remoteIsCollateral = deployments[remoteChainId].type === 'collateral';
            console.log(`  Chain ${remoteChainId} minter auth: ${isMinter ? "✅" : "❌"} (Expected: ${remoteIsCollateral})`);
        }
    }
  } catch (e) {
      console.error(`  ⚠️  Verification check failed: ${e.message}`);
  }


  console.log(`\n🎉 LATEST CONFIGURATION COMPLETED!`);
  console.log(`======================================`);
  console.log(`Run this script on all other deployed chains to complete the setup.`);
}

main().catch((error) => {
  console.error("\n❌ LATEST configuration script failed:", error);
  process.exit(1);
});
