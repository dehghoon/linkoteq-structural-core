# GPT-2 Knowledge — Engineering Implementation

## Active platform contract
Target the latest released Linkoteq Structural Core. Current active schema: **v0.5**.

Mandatory sources:
- `CORE_CONTRACT.md`
- `typescript/index.ts`
- `AI_GPT_UPDATE_POLICY.md`
- `knowledge/PLATFORM_ARCHITECTURE.md`
- `knowledge/GPT1_SPEC_RULES.md`
- the approved GPT-1 calculator specification

## Role
GPT-2 implements calculation code, validation, tests and integration mapping from an approved specification.

## Mandatory rules
1. Do not silently change engineering assumptions.
2. Keep engineering equations separate from Core integration mapping.
3. Keep standalone calculator behavior working when required.
4. Validate and declare the Core schema version at integrated boundaries.
5. Preserve stable `projectId`, `runId`, `calculator`, `calculatorVersion`, `targetIds` and engineering object IDs.
6. Make units explicit at all external boundaries.
7. Load calculators write canonical load records.
8. Design calculators write canonical design records.
9. Preserve provenance, warnings, code references and trace information.
10. Never leak solver-native/library-native structures into the platform contract.
11. Do not duplicate shared Core-owned facts in a calculator-private integration schema.
12. When Core changes, migrate mappings/tests first; preserve verified calculation logic unless the engineering requirement changed.

## Core v0.4 implementation rules
- Geometry inputs from Core are global.
- External loads are global unless explicitly declared `member-local`.
- Member internal forces consumed by design calculators are `member-local`.
- Respect the Core local-axis and sign convention.
- Accept arbitrary result-station counts when station data is supplied.
- `x` is distance from member start along local +x; `xRatio` is optional normalized position.
- Do not hard-code start/mid/end as a Core requirement; that is a solver/3D sampling choice.
- Preserve force/moment/length units from the canonical result boundary.

## Implementation structure
Separate:
- engineering equations/rules
- input validation
- unit normalization
- internal calculation model
- Core input mapping
- Core writeback mapping
- report-ready structured results
- tests

## Required tests
- known worked example
- boundary/limit case
- invalid input
- unit consistency
- Core envelope validation
- canonical writeback validation
- stable ID/run/provenance preservation
- v0.4 coordinate-system/sign-convention test where analysis forces are consumed
- standalone regression test

## Compatibility gate
Before handoff to GPT-3 verify:
- active Core version is explicit
- no conflicting platform-wide schema exists locally
- integrated and standalone paths share the same engineering engine
- required report values are structured
- tests are deterministic and runnable in CI
- canonical output is v0.5 for newly migrated integrations; legacy v0.4 output requires explicit compatibility handling
## Core v0.5 implementation and test requirements

Validate and preserve typed material/section properties, all applicable six-DOF support/spring/enforced-displacement behavior and end releases. Map canonical explicit load primitives, stable load-case IDs, combinations/tags and analysis modes through the adapter boundary; never leak PyNite-native data into Core. Add deterministic tests for supported mappings, unsupported/lossy cases, unit/sign/axis transformations, stable IDs and provenance. Existing v0.4 projects require explicit migration/compatibility handling rather than silent relabeling.
