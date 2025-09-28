const hre = require("hardhat");
const { ethers } = hre;
const fs = require('fs');
const path = require('path');
const chainsConfig = require("@vialabs-io/contracts/config/chains");

async function main() {
    const [signer] = await ethers.getSigners();
    const networkName = hre.network.name;
    console.log(`\nConfiguring client on ${networkName} with account: ${signer.address}`);

    // Load all deployments from our deployments.json file
    const deploymentsFilePath = path.join(__dirname, '..', 'deployments', 'deployments.json');
    if (!fs.existsSync(deploymentsFilePath)) {
        throw new Error("deployments.json not found. Please run the deploy script on all chains first.");
    }
    const deployments = JSON.parse(fs.readFileSync(deploymentsFilePath, 'utf8'));

    const currentChainId = hre.network.config.chainId;
    const currentDeployment = deployments[currentChainId];

    if (!currentDeployment) {
        throw new Error(`Deployment for current network (${networkName}) not found in deployments.json.`);
    }

    // Get the official VIA MessageV3 address for the current chain
    const messageV3Address = chainsConfig[currentChainId].message;

    // Find all other deployments to configure as remotes
    const remoteDeployments = Object.values(deployments).filter(d => d.chainId !== currentChainId);
    if (remoteDeployments.length === 0) {
        console.log("No other deployments found to configure against. Exiting.");
        return;
    }

    const remoteChainIds = remoteDeployments.map(d => d.chainId);
    const remoteEndpoints = remoteDeployments.map(d => d.address);
    const confirmations = remoteDeployments.map(() => 6); // Default 6 confirmations

    // Define the ABI for the function we want to call
    const messageClientAbi = ["function configureClient(address messageV3, uint256[] memory chains, address[] memory endpoints, uint256[] memory confirmations)"];
    
    // Create a contract instance for our deployed contract
    const contract = new ethers.Contract(currentDeployment.address, messageClientAbi, signer);

    console.log(`Configuring ${currentDeployment.contractName} at ${currentDeployment.address}`);
    console.log(`   - Setting ${remoteEndpoints.length} remote(s):`);
    remoteDeployments.forEach(d => {
        console.log(`   - Chain ${d.chainId} (${d.networkName}) -> ${d.address}`);
    });

    // Call the configureClient function
    const tx = await contract.configureClient(messageV3Address, remoteChainIds, remoteEndpoints, confirmations);
    console.log(`   - Config tx sent: ${tx.hash}. Waiting for confirmation...`);
    await tx.wait();
    console.log("   - ✅ Configuration successful!");
}

main().catch((error) => {
    console.error(error);
    process.exit(1);
});
