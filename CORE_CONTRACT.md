# Linkoteq Structural Core Contract v0.2

## Purpose

The Structural Core is the canonical engineering data model shared by the 3D editor, load calculators, analysis engines, and member calculators.

It is intentionally **not** a calculation engine. It stores engineering facts and traceable results.

## What belongs in Core

- Project metadata, units, jurisdiction and code references
- Grids and levels
- Nodes
- Members: beam, column, brace
- Surfaces: slab, wall
- Openings and diaphragms
- Materials and assigned sections
- Supports and releases
- Load sources
- Load cases, load objects and load combinations
- Analysis requests and analysis results
- Traceability metadata needed to understand where a load or result came from

## What does not belong in Core

### Load calculation logic

Snow, wind and seismic formulas live in their own calculator repositories. A calculator reads Core-compatible information and writes Core-compatible `LoadSource`, `LoadCase` and `Load` records.

### Structural solver logic

PyNite or another solver is external. An Analysis Adapter converts the canonical model into the selected solver's input model and writes canonical analysis results back.

### Member design logic

W-section verification, beam design, column design, concrete design and other member calculators stay external. They consume geometry, assigned material/section and analysis forces from Core. Their standalone calculator pages remain valid products and must not be removed.

## Required data flow

```text
3D editor / AI import / DXF / IFC
              |
              v
      Structural Core v0.2
              |
      +-------+--------+
      |                |
      v                v
Snow / Wind /       Manual loads
Seismic calculators
      |                |
      +-------+--------+
              |
              v
      Structural Core loads
              |
              v
       Analysis Adapter
              |
              v
        PyNite / solver
              |
              v
     Core analysis results
              |
      +-------+--------+
      |                |
      v                v
 W-section          Beam / Column /
 calculator         Foundation calculators
```

## Calculator rule

New calculators must use a Core-compatible envelope at their integration boundary. They may keep their existing standalone UI and internal calculation models.

A calculator integration must identify:

1. `projectId`
2. `runId`
3. `calculator`
4. `targetIds`
5. Core schema version
6. Calculator-specific inputs
7. Core-compatible writeback records

This is not an adapter layer between Linkoteq calculators and Core. It is the calculator's supported integration contract.

## Load ownership

Core stores the final engineering load objects, but does not derive them.

Examples:

- Snow calculator produces an `area` load targeted to a slab/roof surface.
- Seismic calculator may produce a `level` or `diaphragm` load representing floor force.
- Wind calculator may produce surface, level, diaphragm, member or nodal loads depending on the selected analytical idealization.
- Dead/live loads may be manually assigned or generated from geometry/material information by a dedicated load-generation module.

## Slab load transfer

A slab may declare `loadTransfer.method` as:

- `one-way`
- `two-way`
- `shell`
- `manual`

This describes the engineering intent. Transfer of an area load into solver-specific member/nodal loads belongs in the Analysis Adapter because the correct representation depends on the solver model.

## Traceability

Every generated load should reference a `LoadSource`. The source should capture calculator, version, code edition, jurisdiction, inputs, summary and generation status. A Load Manager can therefore explain where each load came from without recomputing engineering logic in the UI.

## Versioning

`0.2` adds calculator provenance, load-source metadata, slab load-transfer intent, analysis runs and node results while retaining compatibility with the original `0.1` model shape.

Future changes should be additive where possible. Breaking changes require a new schema version and explicit migration notes.
