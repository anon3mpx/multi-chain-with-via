# VIA MessageClient Configuration Analysis

**Date**: 2026-01-15  
**Issue**: Bridging from synthetic chains back to collateral (PulseChain) fails after initial configuration

---

## Summary of Observations

| Route | Initial Result | After Fix |
|-------|---------------|-----------|
| PulseChain → Base (collateral → synthetic) | ✅ Works | ✅ Works |
| Base → PulseChain (synthetic → collateral) | ❌ Fails | ✅ Works |
| Base → Avalanche (synthetic → synthetic) | ✅ Works | ✅ Works |
| Avalanche → PulseChain (synthetic → collateral) | ❌ Fails | ? |

**Fix Applied**: Called `configureClientExtended` followed by `configureMessageClient` on PulseChain.

---

## Root Cause Analysis

### The Two Configuration Functions in MessageClient.sol

```solidity
// Lines 182-196: Standard EVM configuration
function configureClient(
    address _messageV3,
    uint[] calldata _chains,
    address[] calldata _endpoints,      // Regular address type
    uint16[] calldata _confirmations
) public onlyMessageOwner {
    for(uint x=0; x < _chainsLength; x++) {
        CHAINS[_chains[x]].confirmations = _confirmations[x];
        CHAINS[_chains[x]].endpoint = _endpoints[x];
        CHAINS[_chains[x]].extended = false;  // ← Key: extended = FALSE
    }
    _configureMessageV3(_messageV3);
}

// Lines 165-180: Extended (non-EVM) configuration  
function configureClientExtended(
    address _messageV3,
    uint[] calldata _chains,
    bytes[] calldata _endpoints,         // bytes for larger addresses
    uint16[] calldata _confirmations
) external onlyMessageOwner {
    for(uint x=0; x < _chainsLength; x++) {
        CHAINS[_chains[x]].confirmations = _confirmations[x];
        CHAINS[_chains[x]].endpointExtended = _endpoints[x];
        CHAINS[_chains[x]].extended = true;   // ← Key: extended = TRUE
        CHAINS[_chains[x]].endpoint = address(1);  // ← Placeholder
    }
    _configureMessageV3(_messageV3);
}
```

### The Critical Internal Function

```solidity
// Lines 202-215
function _configureMessageV3(address _messageV3) internal {
    MESSAGEv3 = IMessageV3(_messageV3);
    FEE_TOKEN = IERC20cl(MESSAGEv3.feeToken());

    // Approve MessageV3 for source chain fees (USDC)
    if(address(FEE_TOKEN) != address(0)) {
        FEE_TOKEN.approve(address(MESSAGEv3), type(uint).max);
    }

    // ⚠️ CRITICAL: Approve MessageV3 for destination gas fees (WETH/WPLS)
    if(address(MESSAGEv3.weth()) != address(0)) {
        IERC20cl(MESSAGEv3.weth()).approve(address(MESSAGEv3), type(uint).max);
    }
}
```

---

## Why Your Fix Worked

### Problem: Missing WETH/WPLS Approval

When you deploy and configure bridges, the `configureMessageClient` function in your bridge contracts **only approves the fee token (USDC)**, not the wrapped gas token:

```solidity
// ViaCollateralBridge.sol, Lines 176-182
function configureMessageClient(...) external onlyOwner {
    configureClient(_messageV3, _chainIds, _endpoints, _confirmations);
    
    // Only approves fee token (USDC)
    feeToken.safeApprove(_messageV3, 0);
    feeToken.safeApprove(_messageV3, type(uint256).max);
    // ⚠️ MISSING: wrappedGasToken approval!
}
```

However, the base `MessageClient._configureMessageV3()` **does approve** `MESSAGEv3.weth()` (the MessageV3's default WETH).

### Why Calling `configureClientExtended` First Helped

When you called `configureClientExtended` directly on the contract (bypassing your wrapper), it invoked `_configureMessageV3()` which:

1. Set `MESSAGEv3` reference
2. Approved `FEE_TOKEN` (USDC) for MessageV3  
3. **Approved `MESSAGEv3.weth()` for MessageV3** ← This was missing!

Then calling `configureMessageClient` again re-set the standard EVM endpoint values.

---

## The Actual Issue: `wrappedGasToken` vs `MESSAGEv3.weth()`

Your bridge contracts use a **per-chain wrapped gas token**:

```solidity
// Per-chain configuration
mapping(uint32 => IERC20) public wrappedGasTokenPerChain;
```

But MessageClient's `_configureMessageV3()` approves **MessageV3's global WETH**:

```solidity
IERC20cl(MESSAGEv3.weth()).approve(address(MESSAGEv3), type(uint).max);
```

On PulseChain, `MESSAGEv3.weth()` likely returns **WPLS** (`0xA1077a294dDE1B09bB078844df40758a5D0f9a27`).

If your `configureChain` sets `wrappedGasTokenPerChain[chainId] = WPLS` but MessageV3 never got approved to spend WPLS, the bridge can't pay for destination gas!

---

## Recommended Fix

### Option A: Update Bridge Contracts (Best)

Add WPLS/WETH approval in your `configureMessageClient` wrapper:

```solidity
function configureMessageClient(
    address _messageV3, 
    uint[] calldata _chainIds, 
    address[] calldata _endpoints, 
    uint16[] calldata _confirmations
) external onlyOwner {
    configureClient(_messageV3, _chainIds, _endpoints, _confirmations);
    
    // Approve fee token
    feeToken.safeApprove(_messageV3, 0);
    feeToken.safeApprove(_messageV3, type(uint256).max);
    
    // ✅ ADD: Approve wrapped gas token (WPLS on PulseChain)
    // This is already done per-chain in configureChain, but MessageV3.weth() 
    // also needs approval for the internal VIA fee collection
    address weth = IMessageV3(_messageV3).weth();
    if (weth != address(0)) {
        IERC20(weth).safeApprove(_messageV3, 0);
        IERC20(weth).safeApprove(_messageV3, type(uint256).max);
    }
}
```

### Option B: Manual Fix Script (No Contract Changes)

Call `configureClientExtended` with dummy data, then reconfigure properly. See script below.

---

## Fix Script: `fix-pulsechain-approval.js`

This script calls the base `MessageClient.configureClient` function directly (which triggers `_configureMessageV3` internally), ensuring proper WETH/WPLS approval.

Since your contracts don't expose `_configureMessageV3()` directly, we'll call `configureClient` from the inherited `MessageClient` through the `configureMessageClient` wrapper - but the real fix is that VIA's internal `_configureMessageV3` was never called with the right approvals.

**Workaround**: Call the deployment's `configureMessageClient` again to re-trigger `configureClient` → `_configureMessageV3`.

---

## Token Status Summary

| Token | Collateral (PulseChain) | Synthetics | Config Status |
|-------|------------------------|------------|---------------|
| HOA | ✅ Fixed (manual intervention) | All chains | Needs re-verify |
| COCK | ✅ Fixed (manual intervention) | All chains | Needs re-verify |
| PLSX | ❓ Partial | All chains | **Needs fix on PulseChain** |
| pHEX | Pending | Pending | Not yet deployed |

---

## Next Steps

1. **For PLSX**: Re-run `configure-all-routes.js` on PulseChain to refresh MessageClient config
2. **For all tokens**: Consider updating `ViaCollateralBridge.sol` to add WETH approval
3. **Test**: Bridge from each synthetic chain back to PulseChain

---

## Commands to Re-Configure

```bash
# Re-run configuration on PulseChain for each token
export TOKEN_SYMBOL=PLSX
npx hardhat run scripts/pre-audit-scripts/configure-all-routes.js --network pulsechain

export TOKEN_SYMBOL=HOA  
npx hardhat run scripts/pre-audit-scripts/configure-all-routes.js --network pulsechain

export TOKEN_SYMBOL=COCK
npx hardhat run scripts/pre-audit-scripts/configure-all-routes.js --network pulsechain
```

If the above doesn't work, we may need a dedicated script that calls `configureClientExtended` directly through the contract's inherited interface.
