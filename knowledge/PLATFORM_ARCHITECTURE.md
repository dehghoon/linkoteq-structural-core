# Linkoteq Platform Architecture Knowledge

## Purpose

This file explains how Linkoteq applications, calculators, analysis engines, reports and AI/GPT workflows must interoperate around the canonical Structural Core contract.

## Source of truth

The repository `dehghoon/linkoteq-structural-core` is the single source of truth for cross-product engineering data contracts.

Application repositories may keep internal UI state and calculator-private implementation models, but integration boundaries must not redefine conflicting schemas.

## Canonical engineering flow

```text
2D drawings / images / DXF / IFC / manual / AI
                    |
                    v
              Structural Core
                    |
         +----------+----------+
         |                     |
         v                     v
  Load calculators         Manual loads
 Snow / Wind / Seismic
         |                     |
         +----------+----------+
                    |
                    v
              Canonical Loads
                    |
                    v
             Analysis Adapter
                    |
                    v
              PyNite / Solver
                    |
                    v
        Canonical Analysis Results
                    |
                    v
            Design Calculators
 W-section / Beam / Column / Timber / Concrete / Foundation
                    |
                    v
          Canonical Design Results
                    |
                    v
              Canonical Reports
```

## Product responsibilities

### 3D Model
- Creates and edits geometry, levels, grids, nodes, members and surfaces.
- Assigns materials, sections, supports, releases and loads.
- Stores Core-compatible model state.
- Does not own snow/wind/seismic formulas.
- Does not own solver logic.
- Does not own member design logic.

### Load calculators
- Consume project/model context through a Core-compatible calculator envelope.
- Own their engineering formulas and code logic.
- Write back `LoadSource`, `LoadCase` and `Load` records.
- Preserve provenance, code edition, jurisdiction and run ID.

### Analysis engine
- Lives behind an Analysis Adapter.
- Consumes canonical geometry, boundary conditions and loads.
- Returns canonical member and node analysis results.
- Solver-native types must not leak into the platform contract.

### Design calculators
- Consume geometry, assigned material/section and analysis forces from Core.
- Return canonical `DesignRun`, `MemberDesignResult` and `DesignCheck` records.
- Standalone calculator UIs remain valid products.

### Reports
- Consume canonical engineering facts and results.
- Must not become a second engineering database.
- Values shown in reports should be traceable to source IDs and run IDs.

### AI/GPT workflows
- Must follow the same Core schema and integration rules as human-authored modules.
- Must not invent incompatible private integration schemas.
- Must carry schema version and preserve provenance/traceability.

## Versioning rule

All integrations must declare the Core schema version they support. Breaking changes require an explicit new schema version and migration notes.