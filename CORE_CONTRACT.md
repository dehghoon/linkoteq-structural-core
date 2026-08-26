# Linkoteq Structural Core Contract v0.3

## Purpose

This repository is the canonical engineering contract for the Linkoteq platform. The 3D model, importers, load calculators, analysis adapters, design calculators, reports, viewers and AI/GPT workflows exchange engineering information through this contract.

Core is intentionally not a calculation engine. It stores engineering facts, requests, traceable results and standardized integration records.

## Canonical pipeline

```text
2D / image / DXF / IFC / manual / AI
                |
                v
        Structural Model
                |
                v
 Snow / Wind / Seismic / Manual Loads
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
                |
                v
       Canonical Design Results
                |
                v
        Canonical Reports
```

## Core ownership

Core defines project metadata, units, jurisdiction, grids, levels, nodes, members, surfaces, openings, diaphragms, materials, sections, supports, releases, load sources, load cases, load objects, load combinations, analysis requests/results, design runs/results and report records.

External modules own engineering calculation logic. Snow, wind and seismic formulas stay in calculator repositories. PyNite or another solver stays behind an Analysis Adapter. W-section, beam, column, concrete, timber and foundation design logic stays in its calculator repository. Standalone calculator UIs remain valid products.

## Calculator integration

Every integrated calculator uses a Core-compatible boundary containing `projectId`, `runId`, `calculator`, `calculatorVersion`, `targetIds`, Core schema version and calculator-specific inputs. Writeback must use canonical records rather than exposing calculator-private structures to the rest of the platform.

This is the supported contract of the calculator itself, not a second Linkoteq adapter layer.

## Loads and load transfer

Every generated load should reference a `LoadSource` so the Load Manager can display calculator, version, code edition, jurisdiction, inputs, summary and status.

Snow commonly writes area loads to slab/roof surfaces. Seismic may write level or diaphragm loads. Wind may write surface, level, diaphragm, member or nodal loads. Dead/live loads may be manual or geometry/material generated.

Slabs declare engineering load-transfer intent as `one-way`, `two-way`, `shell` or `manual`. Solver-specific conversion of area loads to member/nodal loads belongs in the Analysis Adapter.

## Design result contract

v0.3 adds canonical design results. A design calculator must be able to write a `DesignRun` and one or more `MemberDesignResult` records. Individual `DesignCheck` records may identify demand, capacity, utilization, governing load case/combination, station, code clause and pass/fail status.

The canonical result separates engineering results from UI presentation. A W-section calculator can therefore remain standalone while also returning the same design facts to the 3D workflow and reports.

## Report contract

Reports are consumers of canonical facts, not independent engineering databases. `ReportRequest` identifies the desired project/runs and output format. `ReportRecord` stores report sections, references, assumptions, warnings, figures and artifact references.

Reports should reference source IDs wherever possible so a displayed value can be traced back to its load source, analysis run, design run or model object.

## AI / GPT integration

AI-generated engineering artifacts must follow the same contract as human-authored modules. GPTs and other AI workflows should be supplied a versioned knowledge manifest derived from this repository.

The manifest must communicate at minimum:

- active Core schema version
- canonical type names
- terminology and naming rules
- unit conventions
- stable ID/reference rules
- calculator input/writeback rules
- traceability/provenance requirements
- prohibition on inventing incompatible private schemas at integration boundaries

AI requests and results should carry `modelSchemaVersion`. AI may assist with model creation, mapping, report drafting or calculator generation, but engineering records written into the platform must validate against the canonical contract.

## Stable identity

Nodes, members, surfaces, loads, sections, runs and results use stable IDs. UI labels such as beam numbers may be stored as metadata/display fields, but references between engineering records must use IDs rather than screen position or transient array indexes.

## Versioning

- `0.1`: base structural model
- `0.2`: calculator provenance, load-source metadata, slab load-transfer intent, analysis runs and node results
- `0.3`: canonical design results, report records and AI/GPT integration contracts

Changes should be additive where possible. Breaking changes require a new schema version and migration notes.

## Source-of-truth rule

This repository is the source of truth for cross-product engineering data contracts. Application repositories may extend internal UI state and calculator-private implementation models, but they must not redefine conflicting integration types. When the Core contract changes, dependent repositories and AI knowledge files must be updated against the new version.
