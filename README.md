# Linkoteq Structural Core

Canonical, versioned engineering data contract shared by Linkoteq applications, calculators, importers, analysis adapters, design modules, reports, viewers and AI/GPT workflows.

Current schema: **v0.3**.

## Scope

Core defines the shared structural domain and integration boundaries. It does **not** contain rendering, PyNite, DXF/IFC parsing, snow/wind/seismic formulas or member-design calculation logic.

Canonical domains include:

- Project metadata, units, codes and jurisdiction
- Levels, grids and nodes
- Members, surfaces, openings and diaphragms
- Materials, sections, supports and releases
- Load sources, load cases, loads and combinations
- Analysis requests, runs and normalized results
- Design runs, checks and member design results
- Report requests and traceable report records
- AI/GPT knowledge and generation envelopes

All Linkoteq products may maintain private implementation/UI state, but cross-product engineering exchange should conform to this repository.

See `CORE_CONTRACT.md` for architecture and integration rules and `typescript/index.ts` for canonical TypeScript interfaces.
