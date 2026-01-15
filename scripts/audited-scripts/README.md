# Audited Bridge Deployment Scripts

Scripts for deploying and configuring the audited V3 bridge contracts (`ViaCollateralBridgeV3` and `ViaSyntheticBridgeV3`).

## Prerequisites

1. Configure `hardhat.config.js` with mainnet networks
2. Update addresses in `config.js`:
   - Token addresses (line ~93)
   - Fee tokens / USDC addresses (line ~157)
   - Wrapped gas tokens (line ~175) - Simple mapping: chain → native wrapped gas
   - Treasury address (line ~219)
3. Set environment variables:
   ```bash
   export PRIVATE_KEY="your-private-key"
   export TREASURY_ADDRESS="your-treasury-address"
   ```

## Pre-Deployment Checklist (Double Check These!)

1.  **Token Addresses**: Verify ALL addresses in `config.js` match mainnet tokens exactly.
2.  **Fee Configuration**: Confirm `protocolFee` (0.12 USDC) and `viaSourceFee` (0.25 USDC) are correct.
3.  **Wrapped Gas Tokens**: Ensure `WRAPPED_GAS_TOKENS` has the correct *native* wrapped gas address for each chain.
4.  **Treasury**: Double check the `TREASURY` address where protocol fees will be sent.
5.  **Gas Funds**: Ensure deploying wallet has sufficient native gas (PLS, ETH, BNB, MATIC, AVAX) on **ALL** chains.

## Quick Start (Deployment Sequence)

### Step 1: Deploy Collateral Contract (PulseChain)

```bash
npx hardhat run scripts/audited-scripts/deploy-collateral.js --network pulsechain WPLS
```

### Step 2: Deploy Synthetic Contract (Destination Chains)

```bash
npx hardhat run scripts/audited-scripts/deploy-synthetic.js --network base WPLS
npx hardhat run scripts/audited-scripts/deploy-synthetic.js --network bnb WPLS
npx hardhat run scripts/audited-scripts/deploy-synthetic.js --network arbitrum WPLS
# ... repeat for all destination chains
```

### Step 3: Configure ALL Routes (One Script Per Chain)

```bash
# Run on each chain - configures MessageClient AND all remote chains at once
npx hardhat run scripts/audited-scripts/configure-all-routes.js --network pulsechain WPLS
npx hardhat run scripts/audited-scripts/configure-all-routes.js --network base WPLS
npx hardhat run scripts/audited-scripts/configure-all-routes.js --network bnb WPLS
# ... repeat for all chains
```

### Step 4: Test Bridge

```bash
# Bridge 10 WPLS from PulseChain to Base
npx hardhat run scripts/audited-scripts/bridge-to-destination.js --network pulsechain WPLS base 10

# Bridge 5 WPLS back from Base to PulseChain  
npx hardhat run scripts/audited-scripts/bridge-to-origin.js --network base WPLS 5
```

### Step 5: Check Status

```bash
npx hardhat run scripts/audited-scripts/check-status.js --network pulsechain WPLS
```

## Scripts Reference

| Script | Purpose |
|--------|---------|
| `config.js` | Centralized chain/token configuration |
| `deploy-collateral.js` | Deploy ViaCollateralBridgeV3 on PulseChain |
| `deploy-synthetic.js` | Deploy ViaSyntheticBridgeV3 on destination chains |
| `configure-all-routes.js` | **Recommended**: Configure MessageClient + all chains in one go |
| `configure-message-client.js` | Configure VIA MessageClient only |
| `configure-chain.js` | Configure single destination chain |
| `bridge-to-destination.js` | Bridge from PulseChain to destination |
| `bridge-to-origin.js` | Reverse bridge from destination to PulseChain |
| `check-status.js` | Check deployment and configuration status |

## Cluster Topology

The bridge supports mesh routing - users can bridge between ANY chains:
- PulseChain ↔ Base
- PulseChain ↔ BNB
- Base ↔ BNB
- Base ↔ Arbitrum
- etc.

Each synthetic contract is configured to communicate with all other chains.

## Files Generated

- `audited-deployments.json` - Tracks all deployments by token and chain

## Supported Tokens

- WPLS (Wrapped Pulse)
- PLSX (PulseX)
- pHEX (HEX on PulseChain)
- INC (Incentive Token)
- HOA
- SAVVA
- COCK

## Supported Chains

**Origin (Collateral):** PulseChain

**Destinations (Synthetic):** BNB, Arbitrum, Base, Optimism, Polygon, Avalanche
