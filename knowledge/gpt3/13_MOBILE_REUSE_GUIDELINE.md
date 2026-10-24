# Mobile Reuse Guideline

## Goal
Prepare the web platform so a future React Native agent can reuse the engineering core.

## Share
- API contracts
- Shared types
- Validation
- Engineering models
- Design tokens
- Formatting
- Authentication interfaces

## Do Not Share
- Browser APIs
- DOM code
- Next.js routing
- Web-only rendering
- React Three Fiber scene implementation

Keep business logic platform-independent.

## Core v0.5 migration addendum

- Use current GitHub Core v0.5 contracts, not uploaded v0.4 snapshots; direct GitHub Connector only, no Gateway.
- GPT-2 owns calculation and PyNite adapter logic; GPT-3 consumes verified canonical inputs/results; GPT-4 owns architecture and production acceptance.
- Preserve standalone behavior, canonical IDs, units, coordinate conventions, typed materials/sections, support DOFs, explicit load primitives, load combinations, and provenance where relevant.
- Solver-dependent production release is blocked until the GPT-2 evidence is accepted by GPT-4 under `orchestration/PYNITE_ADAPTER_VERIFICATION_GATE.md`. Non-solver-dependent work may continue.
