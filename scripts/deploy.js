const hre = require("hardhat");
const { ethers } = hre;
const fs = require('fs');
const path = require('path');
const chainsConfig = require("@vialabs-io/contracts/config/chains");

/**
 * Saves deployment information to a deployments.json file.
 * This file acts as a single source of truth for contract addresses and ABIs.
 */
function saveDeployment(deploymentInfo) {
    const deploymentsDir = path.join(__dirname, '..', 'deployments');
    if (!fs.existsSync(deploymentsDir)) {
        fs.mkdirSync(deploymentsDir, { recursive: true });
    }
    const filePath = path.join(deploymentsDir, 'deployments.json');

    let deployments = {};
    if (fs.existsSync(filePath)) {
        try {
            deployments = JSON.parse(fs.readFileSync(filePath, 'utf8'));
        } catch (e) {
            console.error("Error reading existing deployments.json, starting fresh.");
        }
    }

    // Add or update the deployment info for the current chain
    deployments[deploymentInfo.chainId] = deploymentInfo;

    fs.writeFileSync(filePath, JSON.stringify(deployments, null, 2));
    console.log(`\n✅ Deployment data saved to ${filePath}`);
}


async function main() {
    const [deployer] = await ethers.getSigners();
    const networkName = hre.network.name;
    console.log(`\nDeploying on ${networkName} with account: ${deployer.address}`);

    const chainId = hre.network.config.chainId;
    if (!chainsConfig[chainId] || !chainsConfig[chainId].message) {
        throw new Error(`VIA MessageV3 config not found for chain ID ${chainId}.`);
    }
    const messageV3Address = chainsConfig[chainId].message;
    console.log(`Using VIA MessageV3 contract at: ${messageV3Address}`);

    let contract;
    let contractName;

    // Deploy the appropriate contract based on the network
    if (networkName === "pulsechain_testnet") {
        contractName = "ViaERC20Collateral";
        const wrappedTokenAddress = "0xc16131616B78346eb58bfF11Fafc9895a7180d93";
        const Factory = await ethers.getContractFactory(contractName);
        contract = await Factory.deploy(wrappedTokenAddress, messageV3Address);
    } else if (networkName === "base_sepolia") {
        contractName = "ViaERC20";
        const tokenName = "MyBridgedToken";
        const tokenSymbol = "MBT";
        const initialSupply = 0;
        const Factory = await ethers.getContractFactory(contractName);
        contract = await Factory.deploy(tokenName, tokenSymbol, initialSupply, messageV3Address);
    } else {
        throw new Error(`No deployment logic for network: ${networkName}`);
    }

    await contract.waitForDeployment();
    const address = await contract.getAddress();
    console.log(`${contractName} deployed to: ${address}`);

    // Save the deployment information
    const abi = JSON.parse(contract.interface.formatJson());
    const deploymentInfo = {
        address,
        contractName,
        abi,
        chainId,
        networkName,
    };

    saveDeployment(deploymentInfo);
}

main().catch((error) => {
    console.error(error);
    process.exit(1);
});
