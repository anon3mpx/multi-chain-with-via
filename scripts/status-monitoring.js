// ===============================================
// BRIDGE STATUS MONITOR SCRIPT
// ===============================================

const hre = require("hardhat");

async function monitorBridgeStatus() {
  console.log("🔍 Bridge Status Monitor");
  console.log("========================");

  const deployments = {
    943: "0x91E34254655381F873bC50EA1e7Ac9fD4594FAD8", // PulseChain Testnet
    84532: "0x19BBE0f501251aC16Fcc72cc9AF8678Fc6AAC594", // Base Sepolia
  };

  const chainNames = {
    943: "PulseChain Testnet",
    84532: "Base Sepolia",
  };

  // Check both chains
  for (const [chainId, address] of Object.entries(deployments)) {
    console.log(`\n📊 ${chainNames[chainId]} (${chainId})`);
    console.log(`Contract: ${address}`);

    try {
      // You'd need to switch networks or use different providers
      // This is a template - you'd need to implement network switching
      const contract = await hre.ethers.getContractAt(
        "ViaERC20Collateral",
        address
      );

      if (chainId === "943") {
        // Collateral contract stats
        const totalLocked = await contract.totalLocked();
        console.log(
          `🔒 Total Locked: ${hre.ethers.formatEther(totalLocked)} tokens`
        );
      } else {
        // ERC20 contract stats
        const erc20Contract = await hre.ethers.getContractAt(
          "ViaERC20",
          address
        );
        const totalSupply = await erc20Contract.totalSupply();
        console.log(
          `🏭 Total Supply: ${hre.ethers.formatEther(totalSupply)} tokens`
        );
      }

      console.log("✅ Contract responsive");
    } catch (error) {
      console.log("❌ Contract error:", error.message);
    }
  }
}

// ===============================================
// TRANSACTION TRACKER SCRIPT
// ===============================================

async function trackTransaction(txHash) {
  console.log(`🔎 Tracking Transaction: ${txHash}`);
  console.log("=====================================");

  try {
    const provider = hre.ethers.provider;
    const receipt = await provider.getTransactionReceipt(txHash);

    if (!receipt) {
      console.log("❌ Transaction not found or not confirmed");
      return;
    }

    console.log(`📊 Transaction Status:`);
    console.log(`   Block: ${receipt.blockNumber}`);
    console.log(`   Gas Used: ${receipt.gasUsed.toString()}`);
    console.log(`   Status: ${receipt.status === 1 ? "Success" : "Failed"}`);

    // Try to parse events
    const bridgeAbi = [
      "event TokensBridged(address indexed sender, uint32 indexed destChainId, address indexed recipient, uint256 amount)",
      "event TokensReceived(uint indexed sourceChainId, address indexed recipient, uint256 amount)",
    ];

    const iface = new hre.ethers.Interface(bridgeAbi);

    console.log(`\n📋 Events:`);
    receipt.logs.forEach((log, index) => {
      try {
        const parsed = iface.parseLog(log);
        console.log(`   ${index + 1}. ${parsed.name}`);
        if (parsed.name === "TokensBridged") {
          console.log(`      Sender: ${parsed.args.sender}`);
          console.log(`      Destination: Chain ${parsed.args.destChainId}`);
          console.log(`      Recipient: ${parsed.args.recipient}`);
          console.log(
            `      Amount: ${hre.ethers.formatEther(parsed.args.amount)}`
          );
        }
      } catch (e) {
        // Skip unparseable logs
      }
    });

    console.log(
      `\n🔗 VIA Scanner: https://scan.vialabs.io/transaction/${txHash}`
    );
  } catch (error) {
    console.log("❌ Error tracking transaction:", error.message);
  }
}

// ===============================================
// BALANCE CHECKER SCRIPT
// ===============================================

async function checkBalances(userAddress) {
  console.log(`💰 Balance Check for: ${userAddress}`);
  console.log("=====================================");

  const deployments = {
    943: {
      address: "0x91E34254655381F873bC50EA1e7Ac9fD4594FAD8",
      name: "PulseChain Testnet",
      type: "collateral",
    },
    84532: {
      address: "0x19BBE0f501251aC16Fcc72cc9AF8678Fc6AAC594",
      name: "Base Sepolia",
      type: "erc20",
    },
  };

  for (const [chainId, info] of Object.entries(deployments)) {
    console.log(`\n📊 ${info.name} (${chainId})`);

    try {
      if (info.type === "collateral") {
        // For collateral contract, we need to check the wrapped token balance
        const tokenAddress = "0xc16131616B78346eb58bfF11Fafc9895a7180d93";
        const tokenContract = await hre.ethers.getContractAt(
          "IERC20",
          tokenAddress
        );
        const balance = await tokenContract.balanceOf(userAddress);
        console.log(`   🪙 Token Balance: ${hre.ethers.formatEther(balance)}`);

        // Also check total locked in bridge
        const bridgeContract = await hre.ethers.getContractAt(
          "ViaERC20Collateral",
          info.address
        );
        const totalLocked = await bridgeContract.totalLocked();
        console.log(
          `   🔒 Total Locked: ${hre.ethers.formatEther(totalLocked)}`
        );
      } else if (info.type === "erc20") {
        // For ERC20 contract, check balance directly
        const erc20Contract = await hre.ethers.getContractAt(
          "ViaERC20",
          info.address
        );
        const balance = await erc20Contract.balanceOf(userAddress);
        const totalSupply = await erc20Contract.totalSupply();
        console.log(
          `   🪙 Bridge Token Balance: ${hre.ethers.formatEther(balance)}`
        );
        console.log(
          `   🏭 Total Supply: ${hre.ethers.formatEther(totalSupply)}`
        );
      }
    } catch (error) {
      console.log(`   ❌ Error: ${error.message}`);
    }
  }
}

// ===============================================
// MAIN EXECUTION FUNCTIONS
// ===============================================

async function main() {
  const command = process.argv[2];
  const param = process.argv[3];

  switch (command) {
    case "monitor":
      await monitorBridgeStatus();
      break;

    case "track":
      if (!param) {
        console.log("Usage: npm run monitor track <transaction_hash>");
        return;
      }
      await trackTransaction(param);
      break;

    case "balance":
      const address = param || (await hre.ethers.getSigners())[0].address;
      await checkBalances(address);
      break;

    default:
      console.log(`🔧 Bridge Monitoring Tools`);
      console.log(`Usage:`);
      console.log(
        `  npx hardhat run scripts/monitor.js monitor              - Check bridge status`
      );
      console.log(
        `  npx hardhat run scripts/monitor.js track <tx_hash>      - Track transaction`
      );
      console.log(
        `  npx hardhat run scripts/monitor.js balance [address]    - Check balances`
      );
  }
}

main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});

// ===============================================
// EXPORT FOR MODULAR USE
// ===============================================

module.exports = {
  monitorBridgeStatus,
  trackTransaction,
  checkBalances,
};
