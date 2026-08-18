# Linkoteq Structural Core

Versioned structural domain contract shared by Linkoteq applications, calculators, importers, analysis adapters, and viewers.

## Scope

This repository defines the canonical structural model. It does **not** contain rendering, PyNite, ezdxf, IFC parsing, or design-calculator logic.

Core entities in v0.1:

- Project metadata and units
- Levels and grids
- Nodes
- Members: beam, column, brace
- Surfaces: slab, wall, diaphragm
- Materials and sections
- Supports
- Loads, load cases, load combinations
- Normalized analysis results

Adapters such as DXF/IFC import and PyNite analysis must translate to/from this contract rather than exposing third-party data structures to the rest of Linkoteq.
