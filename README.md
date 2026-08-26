# Linkoteq Structural Core

Canonical, versioned engineering data contract shared by Linkoteq applications, calculators, importers, analysis adapters, design modules, reports, viewers and AI/GPT workflows.

Current schema: **v0.4**.

## Scope

Core defines the shared structural domain and integration boundaries. It does **not** contain rendering, PyNite, DXF/IFC parsing, snow/wind/seismic formulas or member-design calculation logic.

Canonical domains include:

- Project metadata, units, codes and jurisdiction
- Levels, grids and nodes
- Members, surfaces, openings and diaphragms
- Materials, sections, supports and releases
- Load sources, load cases, loads and combinations
- Global/local coordinate-system conventions
- Analysis requests, runs, member stations, force envelopes and normalized results
- Design runs, checks and member design results
- Report requests and traceable report records
- AI/GPT knowledge and generation envelopes

Key v0.4 rules:

- External loads are global by default, with explicit member-local loads allowed when required.
- Member internal forces are canonical in right-handed member-local axes.
- Member result stations are not limited by Core; start/mid/end may be an application default.
- Optional min/max force envelopes are available for fast downstream design access.
- Result units and sign convention are explicit at the integration boundary.

All Linkoteq products may maintain private implementation/UI state, but cross-product engineering exchange should conform to this repository.

See `CORE_CONTRACT.md` for architecture and integration rules and `typescript/index.ts` for canonical TypeScript interfaces.
