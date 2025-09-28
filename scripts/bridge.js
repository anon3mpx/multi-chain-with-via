const hre = require("hardhat");

async function main() {
  const [signer] = await hre.ethers.getSigners();

  // --- CONFIGURATION ---
  // This script bridges a token from PulseChain Testnet to Base Sepolia

  // The ViaERC20Collateral contract deployed on the source chain (pulsechain_testnet)
  const contractAddress = "0x91E34254655381F873bC50EA1e7Ac9fD4594FAD8";

  // The token being locked as collateral on the source chain
  const tokenAddress = "0xc16131616B78346eb58bfF11Fafc9895a7180d93";

  const amount = hre.ethers.parseEther("100"); // The amount of tokens to bridge (100 tokens)

  // The chain ID for the destination chain (Base Sepolia).
  // IMPORTANT: Verify this is the correct chain ID from the VIA protocol documentation.
  const destinationChainId = 84532;

  const recipientAddress = signer.address; // Address to receive tokens on the destination chain

  // --- SCRIPT LOGIC ---
  console.log(`\nRunning bridge script on network: ${hre.network.name}`);
  console.log(`  - Signer: ${signer.address}`);
  console.log(`  - Bridging ${hre.ethers.formatEther(amount)} tokens...`);
  console.log(`  - Token Address: ${tokenAddress}`);
  console.log(`  - Bridge Contract: ${contractAddress}`);
  console.log(
    `  - Destination: Chain ID ${destinationChainId}, Recipient ${recipientAddress}`
  );

  // Get contract instances
  const Bridge = await hre.ethers.getContractAt(
    "ViaERC20Collateral",
    contractAddress
  );
  const Token = await hre.ethers.getContractAt("IERC20", tokenAddress);

  // 1. Approve the bridge to spend the tokens
  console.log(
    `\n1. Approving the bridge contract to spend ${hre.ethers.formatEther(
      amount
    )} tokens...`
  );
  const approveTx = await Token.connect(signer).approve(
    await Bridge.getAddress(),
    amount
  );
  console.log("   Approval transaction sent. Waiting for confirmation...");
  await approveTx.wait();
  console.log("   Approval confirmed.");

  console.log(
    "Destination chain id",
    destinationChainId,
    "recipient",
    recipientAddress,
    "amount",
    amount.toString()
  );

  // 2. Call the bridge function
  console.log("\n2. Sending bridge transaction...");
  const bridgeTx = await Bridge.connect(signer).bridge(
    destinationChainId,
    recipientAddress,
    amount
  );

  console.log("   Transaction sent. Waiting for confirmation...");
  await bridgeTx.wait();

  console.log(`\nBridge transaction confirmed! Hash: ${bridgeTx.hash}`);
}

main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
