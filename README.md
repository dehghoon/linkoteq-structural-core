# Linkoteq Structural Core

Canonical, versioned engineering data contract shared by Linkoteq applications, calculators, importers, analysis adapters, design modules, reports, viewers and AI/GPT workflows.

Current schema on `main`: **v0.6** (v0.5 remains supported for backward compatibility).

Package version: **v0.6.0**. Official GitHub Release: **pending** (latest verified published release: v0.5.0).

Revision 6 adds TypeScript definitions for:
- Joist specifications and capacity-verification status.
- Member-end connections, releases, stiffness and offsets.
- Nodal links and multi-point constraints.
- Surface local-axis information.
- Extended shell analysis results.

These definitions do not establish verified solver
support or production integration.

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

Key Core v0.5 rules:

- External loads are global by default, with explicit member-local loads allowed when required.
- Member internal forces are canonical in right-handed member-local axes.
- Member result stations are not limited by Core; start/mid/end may be an application default.
- Optional min/max force envelopes are available for fast downstream design access.
- Result units and sign convention are explicit at the integration boundary.

Core v0.5 additionally defines:

- Typed material and section analysis properties.
- Explicit support DOFs, springs, and imposed displacements.
- Member-end releases and local-axis conventions.
- Explicit nodal, member, surface, and self-weight loads.
- Load-case and load-combination semantics.
- Analysis modes and the PyNite adapter boundary.

All Linkoteq products may maintain private implementation/UI state, but cross-product engineering exchange should conform to this repository.

See `CORE_CONTRACT.md` for architecture and integration rules and `typescript/index.ts` for canonical TypeScript interfaces.

## Core Gap Register — proposed future revisions

All Linkoteq GPT agents and engineering teams should consult and contribute to the [Core Gap Register](docs/CORE_GAP_REGISTER.md) when a feature or importer exposes a possible missing Core capability. Record evidence against the current released Core contract before classifying a gap as confirmed; do **not** change Core or introduce a parallel incompatible schema for each feature.

The register collects candidates across the 3D Model and SAP2000, ETABS, and STAAD.Pro importers. After GPT-2 has assessed all three formats and GPT-3 has assessed the Advanced Model, consolidate and deduplicate confirmed needs into **one proposed Core revision** for review and explicit approval. Until then, continue development using the existing Core contract and preserve unsupported source information without silent loss.

This register is a planning process, not a Core schema revision.
