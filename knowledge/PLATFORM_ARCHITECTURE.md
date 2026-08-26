# Linkoteq Platform Architecture Knowledge

## Source of truth
`dehghoon/linkoteq-structural-core` is the single source of truth for cross-product engineering contracts. Current active schema: **v0.4**.

All GPTs must also follow `AI_GPT_UPDATE_POLICY.md`.

## Canonical flow
2D drawings / images / DXF / IFC / manual / AI -> Structural Core -> Load Calculators -> Canonical Loads -> Analysis Adapter -> Solver -> Canonical Analysis Results -> Design Calculators -> Canonical Design Results -> Canonical Reports.

## Ownership
- 3D Model owns geometry editing, assignment UX and Core-compatible model state.
- Snow/Wind/Seismic calculators own their engineering formulas and write canonical loads.
- Analysis Adapter owns translation between Core and solver-native types.
- Solver owns analysis execution but not the cross-product contract.
- Design calculators consume canonical model/analysis facts and return canonical design records.
- Reports consume canonical facts and do not become a second engineering database.
- AI/GPT workflows must use the same Core contracts as human-authored modules.

## Core v0.4 coordinate model
- Geometry is global.
- External loads are global by default.
- Explicit member-local external loads are allowed.
- Internal member forces used for design are canonical in member-local axes.
- Member local axes use the Core right-handed convention.
- Result station count is unrestricted by Core.
- Station `x` is measured from member start along local +x.
- Optional `xRatio` is normalized position.
- Analysis/3D layers may choose default station sampling such as start/mid/end without making that a Core requirement.

## Versioning
Every integration declares the Core version it supports. New work targets the latest released Core version. Existing verified calculators are migrated at the integration boundary rather than rebuilt from scratch unless engineering requirements change.

## Duplication rule
Shared engineering facts have one canonical owner. Product repositories may keep private UI/internal models, but they must not redefine conflicting cross-product schemas.