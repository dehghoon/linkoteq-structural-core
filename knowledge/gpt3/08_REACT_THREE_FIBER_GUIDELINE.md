# React Three Fiber Guideline

## Purpose
Provide engineering visualization without replacing calculations.

## Rules
- Visualize member geometry.
- Update geometry when section changes.
- Display approved loads.
- Keep scene independent from calculations.
- Support mobile performance.
- Provide fallback when WebGL is unavailable.

## Reuse
Keep geometry descriptors reusable for future React Native support.

## Core v0.5 migration addendum

- Before implementation read the latest `CORE_CONTRACT.md`, `typescript/index.ts`, `AI_GPT_UPDATE_POLICY.md` and `knowledge/PLATFORM_ARCHITECTURE.md` in `dehghoon/linkoteq-structural-core` using the direct GitHub Connector only; do not use Gateway/custom MCP.
- GPT-2 owns engineering calculation engines, PyNite adapter, numerical verification and canonical solver result mapping. GPT-3 owns integration, UI, API, 3D, reports and deployment; GPT-4 owns orchestration and acceptance.
- Preserve verified engines, standalone routes, existing repository architecture and canonical v0.5 IDs, types, units, axes and provenance.
- Solver-dependent production acceptance requires GPT-4 acceptance of `orchestration/PYNITE_ADAPTER_VERIFICATION_GATE.md`. Unrelated UI/API/plugin work may proceed.
