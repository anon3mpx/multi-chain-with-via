/**
 * Centralized Configuration for Audited V3 Bridge Contracts
 * 
 * This file contains all chain definitions, token addresses, and fee configurations
 * for mainnet deployment of ViaCollateralBridgeV3 and ViaSyntheticBridgeV3.
 */

const fs = require("fs");
const path = require("path");

// ============================================================================
// CHAIN DEFINITIONS
// ============================================================================

const CHAINS = {
    // Origin/Collateral Chain
    pulsechain: {
        chainId: 369,
        name: "PulseChain",
        networkName: "pulsechain",
        rpcUrl: process.env.PULSECHAIN_RPC_URL || "https://rpc.pulsechain.com",
        type: "collateral",
        // VIA MessageV3 - fetched from @vialabs-io/contracts/config/chains
        // These are placeholders - actual values come from chainsConfig
    },

    // Synthetic/Destination Chains
    bnb: {
        chainId: 56,
        name: "BNB Chain",
        networkName: "bnb",
        rpcUrl: process.env.BNB_RPC_URL || "https://bsc-dataseed.binance.org",
        type: "synthetic",
    },
    arbitrum: {
        chainId: 42161,
        name: "Arbitrum",
        networkName: "arbitrum",
        rpcUrl: process.env.ARBITRUM_RPC_URL || "https://arb1.arbitrum.io/rpc",
        type: "synthetic",
    },
    base: {
        chainId: 8453,
        name: "Base",
        networkName: "base",
        rpcUrl: process.env.BASE_RPC_URL || "https://mainnet.base.org",
        type: "synthetic",
    },
    optimism: {
        chainId: 10,
        name: "Optimism",
        networkName: "optimism",
        rpcUrl: process.env.OPTIMISM_RPC_URL || "https://mainnet.optimism.io",
        type: "synthetic",
    },
    polygon: {
        chainId: 137,
        name: "Polygon",
        networkName: "polygon",
        rpcUrl: process.env.POLYGON_RPC_URL || "https://polygon-rpc.com",
        type: "synthetic",
    },
    avalanche: {
        chainId: 43114,
        name: "Avalanche",
        networkName: "avalanche",
        rpcUrl: process.env.AVALANCHE_RPC_URL || "https://api.avax.network/ext/bc/C/rpc",
        type: "synthetic",
    },

    // Testnets (for testing)
    pulsechain_testnet: {
        chainId: 943,
        name: "PulseChain Testnet",
        networkName: "pulsechain_testnet",
        rpcUrl: process.env.PULSECHAIN_TESTNET_RPC_URL || "https://rpc.v4.testnet.pulsechain.com",
        type: "collateral",
    },
    base_sepolia: {
        chainId: 84532,
        name: "Base Sepolia",
        networkName: "base_sepolia",
        rpcUrl: process.env.BASE_SEPOLIA_RPC_URL || "https://sepolia.base.org",
        type: "synthetic",
    },
};

// ============================================================================
// TOKEN DEFINITIONS
// Token addresses on each chain (collateral on PulseChain, synthetic elsewhere)
// ============================================================================

const TOKENS = {
    WPLS: {
        name: "Wrapped Pulse",
        symbol: "WPLS",
        decimals: 18,
        addresses: {
            pulsechain: "0xA1077a294dDE1B09bB078844df40758a5D0f9a27", // Native WPLS
            // Synthetic addresses will be deployed
        },
    },
    PLSX: {
        name: "PulseX",
        symbol: "PLSX",
        decimals: 18,
        addresses: {
            pulsechain: "0x95B303987A60C71504D99Aa1b13B4DA07b0790ab",
        },
    },
    pHEX: {
        name: "HEX on PulseChain",
        symbol: "pHEX",
        decimals: 8,
        addresses: {
            pulsechain: "0x2b591e99afE9f32eAA6214f7B7629768c40Eeb39",
        },
    },
    INC: {
        name: "Incentive",
        symbol: "INC",
        decimals: 18,
        addresses: {
            pulsechain: "0x2fa878Ab3F87CC1C9737Fc071108F904c0B0C95d",
        },
    },
    HOA: {
        name: "Hex Orange Address",
        symbol: "HOA",
        decimals: 18,
        addresses: {
            pulsechain: "0x7901a3569679AEc3501dbeC59399F327854a70fe", // REPLACE with actual address
        },
    },
    // SAVVA: {
    //     name: "SAVVA",
    //     symbol: "SAVVA",
    //     decimals: 18,
    //     addresses: {
    //         pulsechain: "0x0000000000000000000000000000000000000000", // REPLACE with actual address
    //     },
    // },
    COCK: {
        name: "The Rise Of Cock",
        symbol: "COCK",
        decimals: 18,
        addresses: {
            pulsechain: "0x40b49a9e5B8E3CC137E9CA57A5F4382D1B3dF6FE", // REPLACE with actual address
        },
    },
};

// ============================================================================
// FEE TOKEN (USDC) ADDRESSES PER CHAIN
// ============================================================================

const FEE_TOKENS = {
    pulsechain: "0x15D38573d2feeb82e7ad5187aB8c1D52810B1f07", // USDC on PulseChain
    bnb: "0x8AC76a51cc950d9822D68b83fE1Ad97B32Cd580d", // USDC on BNB
    arbitrum: "0xaf88d065e77c8cC2239327C5EDb3A432268e5831", // USDC on Arbitrum
    base: "0x833589fCD6eDb6E08f4c7C32D4f71b54bdA02913", // USDC on Base
    optimism: "0x0b2C639c533813f4Aa9D7837CAf62653d097Ff85", // USDC on Optimism
    polygon: "0x3c499c542cEF5E3811e1192ce70d8cC03d5c3359", // USDC on Polygon (native)
    avalanche: "0xB97EF9Ef8734C71904D8002F8b6Bc66Dd9c48a6E", // USDC on Avalanche
    // Testnets
    pulsechain_testnet: "0x225E04373c5a291f136a54A71994871044539491",
    base_sepolia: "0x036CbD53842c5426634e7929541eC2318f3dCF7e",
};

// ============================================================================
// WRAPPED GAS TOKENS (for VIA settlement gas payment)
// Native wrapped gas token for EACH chain - collected from users for VIA settlements
// When bridging from Chain A to Chain B, users pay Chain A's native wrapped gas token.
// This token is used by VIA to settle incoming messages TO Chain A.
// ============================================================================

const WRAPPED_GAS_TOKENS = {
    // Mainnet chains - Native wrapped gas token for each chain
    pulsechain: "0xA1077a294dDE1B09bB078844df40758a5D0f9a27", // WPLS
    bnb: "0xbb4CdB9CBd36B01bD1cBaEBF2De08d9173bc095c", // WBNB
    arbitrum: "0x82aF49447D8a07e3bd95BD0d56f35241523fBab1", // WETH on Arbitrum
    base: "0x4200000000000000000000000000000000000006", // WETH on Base
    optimism: "0x4200000000000000000000000000000000000006", // WETH on Optimism
    polygon: "0x0d500B1d8E8eF31E21C99d1Db9A6444d3ADf1270", // WMATIC
    avalanche: "0xB31f66AA3C1e785363F0875A1B74E27b85FD66c7", // WAVAX
    // Testnets
    pulsechain_testnet: "0x70499adEBB11Efd915E3b69E700c331778628707", // tWPLS - VERIFY
    base_sepolia: "0x4200000000000000000000000000000000000006", // Test WETH on Base Sepolia
};

// ============================================================================
// FEE CONFIGURATION
// ============================================================================

const FEE_CONFIG = {
    // Protocol fee in USDC (6 decimals) - goes to treasury
    protocolFee: 120_000, // 0.12 USDC

    // VIA source fee in USDC (6 decimals) - goes to VIA protocol
    viaSourceFee: 250_000, // 0.25 USDC

    // Settlement gas limit (in gas units) - global for all destination chains
    settlementGasLimit: 300_000, // 300k gas units

    // Minimum gas price floor (in wei) - prevents manipulation
    minGasPrice: 1_000_000_000, // 1 gwei

    // Confirmations required for cross-chain messages
    confirmations: {
        mainnet: 15,
        testnet: 1,
    },
};

// ============================================================================
// TREASURY ADDRESS
// ============================================================================

const TREASURY = process.env.TREASURY_ADDRESS || "0x0000000000000000000000000000000000000000"; // REPLACE

// ============================================================================
// DEPLOYMENT TRACKING
// ============================================================================

const DEPLOYMENTS_FILE = path.join(__dirname, "audited-deployments.json");

function loadDeployments() {
    if (fs.existsSync(DEPLOYMENTS_FILE)) {
        return JSON.parse(fs.readFileSync(DEPLOYMENTS_FILE, "utf8"));
    }
    return {};
}

function saveDeployment(tokenSymbol, chainName, contractAddress, contractType) {
    const deployments = loadDeployments();

    if (!deployments[tokenSymbol]) {
        deployments[tokenSymbol] = {};
    }

    deployments[tokenSymbol][chainName] = {
        address: contractAddress,
        type: contractType,
        deployedAt: new Date().toISOString(),
        chainId: CHAINS[chainName]?.chainId,
    };

    fs.writeFileSync(DEPLOYMENTS_FILE, JSON.stringify(deployments, null, 2));
    console.log(`💾 Deployment saved: ${tokenSymbol} on ${chainName} -> ${contractAddress}`);
}

function getDeployment(tokenSymbol, chainName) {
    const deployments = loadDeployments();
    return deployments[tokenSymbol]?.[chainName];
}

function getAllDeploymentsForToken(tokenSymbol) {
    const deployments = loadDeployments();
    return deployments[tokenSymbol] || {};
}

// ============================================================================
// HELPER FUNCTIONS
// ============================================================================

function getChainByNetworkName(networkName) {
    return Object.values(CHAINS).find((c) => c.networkName === networkName);
}

function getChainByChainId(chainId) {
    return Object.values(CHAINS).find((c) => c.chainId === Number(chainId));
}

function getTokenConfig(symbol) {
    const token = TOKENS[symbol.toUpperCase()];
    if (!token) {
        throw new Error(`❌ Token not found: ${symbol}. Available: ${Object.keys(TOKENS).join(", ")}`);
    }
    return token;
}

function getFeeToken(networkName) {
    const address = FEE_TOKENS[networkName];
    if (!address) {
        throw new Error(`❌ Fee token not configured for network: ${networkName}`);
    }
    return address;
}

function getWrappedGasToken(sourceNetworkName) {
    const address = WRAPPED_GAS_TOKENS[sourceNetworkName];
    if (!address || address === "0x0000000000000000000000000000000000000000") {
        console.warn(`⚠️  Wrapped gas token not configured for ${sourceNetworkName}`);
    }
    return address;
}

function isTestnet(networkName) {
    return networkName.includes("testnet") || networkName.includes("sepolia");
}

// ============================================================================
// EXPORTS
// ============================================================================

module.exports = {
    CHAINS,
    TOKENS,
    FEE_TOKENS,
    WRAPPED_GAS_TOKENS,
    FEE_CONFIG,
    TREASURY,
    // Deployment tracking
    loadDeployments,
    saveDeployment,
    getDeployment,
    getAllDeploymentsForToken,
    // Helpers
    getChainByNetworkName,
    getChainByChainId,
    getTokenConfig,
    getFeeToken,
    getWrappedGasToken,
    isTestnet,
};
