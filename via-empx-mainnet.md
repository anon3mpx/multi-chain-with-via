**Origin/Collateral Chains:** These are the primary chains where native assets reside and get locked when bridging out.
**Synthetic/Destination Chains:** These are the target networks where synthetic (wrapped) versions are minted upon bridging in. All listed assets are supported bidirectionally to/from the Origin Chain.

### 1. Origin / Collateral Chains (Native Asset Lock Location)

| Network | Type | Supported Native Assets for Bridging Out | Notes / Status |
| :--- | :--- | :--- | :--- |
| **PulseChain** | Collateral Chain (Primary Origin/Home) | • WPLS (Wrapped Pulse)<br/>• PLSX (PulseX)<br/>• pHEX (HEX on PulseChain)<br/>• INC (Incentive Token)<br/>• HOA<br/>• SAVVA<br/>• COCK | Native assets are locked here when bridging out; originals unlocked on return. Core origin chain with full bidirectional support to all Synthetic Chains. |

### 2. Synthetic / Destination Chains (Wrapped Asset Mint Location)

| Network | Type | Supported Synthetic Assets (Minted 1:1) | Notes / Status |
| :--- | :--- | :--- | :--- |
| **BNB Chain** | Synthetic Chain | WPLS, PLSX, pHEX, INC, HOA, SAVVA, COCK | Full bidirectional support |
| **Arbitrum (ARB)** | Synthetic Chain | WPLS, PLSX, pHEX, INC, HOA, SAVVA, COCK | Full bidirectional support |
| **Base** | Synthetic Chain | WPLS, PLSX, pHEX, INC, HOA, SAVVA, COCK | Full bidirectional support (key L2 integration via Hyperlane/partners) |
| **Optimism (OP)** | Synthetic Chain | WPLS, PLSX, pHEX, INC, HOA, SAVVA, COCK | Full bidirectional support |
| **Polygon (MATIC)** | Synthetic Chain | WPLS, PLSX, pHEX, INC, HOA, SAVVA, COCK | Full bidirectional support |
| **Avalanche (AVAX)** | Synthetic Chain | WPLS, PLSX, pHEX, INC, HOA, SAVVA, COCK | Full bidirectional support |
