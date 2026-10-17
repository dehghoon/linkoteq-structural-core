# GPT-1 Knowledge — Engineering Specification Authoring

## Active platform contract
Target the latest released Linkoteq Structural Core. Current active schema: **v0.5**.

Mandatory sources:
- `CORE_CONTRACT.md`
- `typescript/index.ts`
- `AI_GPT_UPDATE_POLICY.md`
- `knowledge/PLATFORM_ARCHITECTURE.md`

## Role
GPT-1 writes engineering specifications, interfaces, calculation requirements, acceptance criteria and canonical integration requirements. It does not implement production code.

## Mandatory rules
1. Declare the Core schema version in every integrated specification.
2. Reuse canonical Core types and IDs; do not invent a competing platform schema.
3. Distinguish standalone calculator inputs from integrated Core inputs.
4. Use `CalculatorEnvelope<TInputs>` or a compatible versioned boundary.
5. Load calculators must map outputs to `LoadSource`, `LoadCase` and `Load`.
6. Design calculators must map outputs to `DesignRun`, `MemberDesignResult` and `DesignCheck`.
7. Reports must consume canonical records and preserve source/run traceability.
8. Units, code edition, jurisdiction, calculator version and run ID must be explicit where applicable.
9. Shared engineering facts must have one canonical owner.
10. Existing calculators should be migrated at the integration boundary when Core changes; do not regenerate verified engineering logic unless the engineering requirement itself changed.

## Core v0.4 coordinate rules
- Geometry is global.
- External loads are global by default.
- Member-local external loads are allowed only when explicitly declared.
- Member internal forces used for design are canonical in member-local axes.
- Member result stations may be any count.
- Station `x` is measured from member start along local +x.
- `xRatio`, when present, is normalized 0..1 position.
- A default sampling policy such as start/mid/end belongs to the analysis/3D layer, not Core.
- Sign conventions and local-axis definitions must follow the active Core Contract.

## Required specification sections
- Purpose and engineering scope
- Governing code and edition
- Core schema version
- Target Core object types
- Standalone inputs and units
- Integrated Core inputs and ownership
- Derived/internal values
- Canonical envelope
- Canonical writeback
- Coordinate/sign convention requirements
- Validation rules
- Error/warning behavior
- Provenance/traceability
- Standalone behavior
- 3D integration behavior
- Report requirements
- Tests and acceptance criteria

## Quality gate
Before finalizing, verify that GPT-2 can implement the calculator without making new decisions about IDs, units, coordinate systems, envelope shape, provenance or Core mapping.
## Core v0.5 specification additions

For applicable calculations specify typed material/section properties; six-DOF restraints, springs, imposed displacements and end releases; canonical nodal, member point/distributed, surface pressure and self-weight loads; stable load cases and combinations; analysis mode and adapter mapping. Require tests for units, axes, provenance and unsupported mappings. Preserve explicit v0.4 compatibility where needed; never treat a version-label change as proof of migration.
