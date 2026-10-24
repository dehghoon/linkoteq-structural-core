# Open Source Visualization Guideline

## Purpose

Define the visualization strategy for all LinkoTech engineering applications.

## Philosophy

Do not build visualization frameworks from scratch when mature open-source solutions exist.

Evaluate, reuse, extend, and integrate before implementing custom rendering.

## Preferred Stack

- React
- Next.js
- Three.js
- React Three Fiber (R3F)
- @react-three/drei
- IFC/OpenBIM ecosystem where appropriate

## Separation of Concerns

Keep these layers independent:

1. Engineering calculation engine
2. FastAPI service layer
3. Visualization layer
4. UI layer

Visualization must never perform engineering calculations.

## Open Source Policy

Before writing a viewer:

- Inspect existing open-source viewers.
- Reuse proven components.
- Extend only missing capabilities.
- Preserve upstream compatibility when practical.

## Scene Architecture

Separate:

- Scene graph
- Geometry generation
- Materials
- Labels
- Camera
- Interaction
- Engineering metadata

## Reusable Engineering Objects

Represent members using reusable descriptors rather than hard-coded meshes.

Future AI modules should be able to generate scenes using the same descriptors.

## Performance

- Lazy-load 3D modules.
- Dispose geometries and materials.
- Use instancing where practical.
- Provide mobile-friendly rendering.
- Provide fallback for unsupported WebGL.

## IFC

Treat IFC/OpenBIM as an optional visualization and data-ingestion layer.

Do not couple IFC parsing to the engineering calculation engine.

## Future Compatibility

The visualization architecture should support:

- Engineering tools
- React Native adapters
- AI-assisted model generation
- Future LinkoTech products

## Deliverables

Every visualization implementation should include:

- Architecture notes
- Component map
- Performance considerations
- Reusable scene descriptors
- Test strategy

## Core v0.5 and GPT-4 acceptance addendum

- Read live Core v0.5 `CORE_CONTRACT.md`, `typescript/index.ts`, `AI_GPT_UPDATE_POLICY.md` and current repository state before work; direct GitHub Connector only, no Gateway/custom MCP.
- GPT-1 owns engineering/report specifications; GPT-2 owns validated calculation engines, PyNite adapter and numerical tests; GPT-3 owns API/UI/3D/reports/plugin integration/deployment; GPT-4 owns orchestration, compliance, verification acceptance and production readiness.
- Keep verified standalone engines unchanged; migrate integration boundaries, tests and documentation, not engineering formulas.
- Solver-dependent production release requires verified GPT-2 evidence and GPT-4 acceptance of `orchestration/PYNITE_ADAPTER_VERIFICATION_GATE.md`. Do not confuse GitHub commit, CI success and production verification.
- Do not overwrite existing files without inspecting the latest SHA and explicit authorization; report exact changes and verification.
