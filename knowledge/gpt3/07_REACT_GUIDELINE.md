# React Guideline

## Purpose
Build a production-quality engineering frontend.

## Principles
- Never duplicate engineering calculations in React.
- Consume only the FastAPI contract.
- Use reusable components.
- Separate UI state from engineering state.
- Support responsive layouts.
- Keep business logic outside components.

## Components
- Engineering forms
- Result tables
- Authentication
- Report preview
- Section selector
- Shared UI library

## Data
All CISC sections must be loaded through the API.

## Core v0.5 migration addendum

- Before implementation read the latest `CORE_CONTRACT.md`, `typescript/index.ts`, `AI_GPT_UPDATE_POLICY.md` and `knowledge/PLATFORM_ARCHITECTURE.md` in `dehghoon/linkoteq-structural-core` using the direct GitHub Connector only; do not use Gateway/custom MCP.
- GPT-2 owns engineering calculation engines, PyNite adapter, numerical verification and canonical solver result mapping. GPT-3 owns integration, UI, API, 3D, reports and deployment; GPT-4 owns orchestration and acceptance.
- Preserve verified engines, standalone routes, existing repository architecture and canonical v0.5 IDs, types, units, axes and provenance.
- Solver-dependent production acceptance requires GPT-4 acceptance of `orchestration/PYNITE_ADAPTER_VERIFICATION_GATE.md`. Unrelated UI/API/plugin work may proceed.
