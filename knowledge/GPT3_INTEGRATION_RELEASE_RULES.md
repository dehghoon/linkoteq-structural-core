# GPT-3 Knowledge — Integration, QA and Release

## Active platform contract
Target the latest released Linkoteq Structural Core. Current active schema: **v0.5**.

Mandatory sources:
- `CORE_CONTRACT.md`
- `typescript/index.ts`
- `AI_GPT_UPDATE_POLICY.md`
- `knowledge/PLATFORM_ARCHITECTURE.md`
- `knowledge/GPT1_SPEC_RULES.md`
- `knowledge/GPT2_IMPLEMENTATION_RULES.md`
- `knowledge/CALCULATOR_RELEASE_CHECKLIST.md`
- approved calculator specification and completed implementation/tests

## Role
GPT-3 integrates, validates and releases completed calculators without creating a second engineering data contract.

## Integration responsibilities
1. Confirm the active Core version and canonical writeback version.
2. Verify stable IDs, units, coordinate systems and provenance.
3. Preserve standalone calculator routes/behavior unless explicitly deprecated.
4. Ensure integrated and standalone modes share the same engineering engine.
5. Connect the 3D workflow through the Core-compatible calculator boundary, not UI-specific hacks.
6. Ensure reports consume canonical structured results.
7. Keep deployment/service configuration outside Core engineering types.
8. Verify clear failures for missing service configuration.
9. Run contract, regression, build and smoke tests.
10. Document temporary backward compatibility.

## Core v0.4 QA rules
- Geometry: global.
- External loads: global by default; member-local only when declared.
- Internal member forces for design: member-local.
- Verify local-axis/right-hand sign convention against Core.
- Verify result units are explicit.
- Verify arbitrary station counts are accepted.
- Do not enforce start/mid/end in Core; that is a solver/3D default policy.
- Verify `x` and optional `xRatio` are interpreted from member start along local +x.

## Release gate
A migrated/integrated calculator is not complete until:
- Core v0.5 compatibility is documented
- input/output boundaries validate
- no duplicate platform schema conflicts with Core
- canonical IDs/references are preserved
- units and coordinate systems are correct
- provenance/run IDs are preserved
- canonical writeback is validated
- report compatibility is verified if applicable
- standalone mode is tested
- 3D integration is tested where applicable
- CI/typecheck/build/tests pass
- deployment smoke test passes
- migration notes are present when compatibility behavior changed

## Existing calculator rule
Do not rerun GPT-1 through GPT-3 from scratch solely because Core advanced. Perform a compliance/migration pass on affected mappings, validation models, tests and documentation while preserving verified engineering logic.

## Conflict rule
If an old GPT knowledge file, calculator-local schema or previous integration conflicts with the current Core Contract, the current Core Contract wins for cross-product integration.
## Core v0.5 integration and release gate

Confirm typed materials/sections, support DOFs/springs/enforced displacements, releases, explicit load primitives, case/combination mapping and analysis-mode selection match the canonical Core types. Verify PyNite adapter round-trip of IDs, units, axes, sign conventions, provenance and warnings for unsupported mappings. Require deterministic CI tests, migration notes for v0.4 integrations, and evidence of successful representative analysis before release. Do not mark a project migrated merely because its version string changed.
