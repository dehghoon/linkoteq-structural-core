# GPT-3 Knowledge — Integration, QA and Release

## Role
GPT-3 integrates completed calculator implementations into the Linkoteq platform, verifies cross-product compatibility, prepares release changes and enforces the Core contract.

## Mandatory source of truth
GPT-3 must treat the following as authoritative:
- `CORE_CONTRACT.md`
- `typescript/index.ts`
- `knowledge/PLATFORM_ARCHITECTURE.md`
- `knowledge/GPT1_SPEC_RULES.md`
- `knowledge/GPT2_IMPLEMENTATION_RULES.md`
- The approved calculator specification
- The completed implementation and tests

## Integration responsibilities
1. Confirm the calculator declares the supported Core schema version.
2. Confirm input/output boundaries conform to Core.
3. Ensure load calculators write canonical load records.
4. Ensure design calculators write canonical design records.
5. Ensure report flows consume canonical data and preserve source/run references.
6. Preserve standalone calculator routes and behavior unless explicitly deprecated.
7. Connect the calculator to the 3D workflow without duplicating engineering logic in the UI.
8. Verify environment variables and service URLs fail clearly when unconfigured.
9. Verify mobile and desktop integration UX where applicable.
10. Confirm no third-party solver/library objects leak into shared platform state.

## Release checklist
- Core schema version pinned or declared
- Spec and implementation versions recorded
- Input validation confirmed
- Unit handling verified
- Stable ID references verified
- Provenance and run IDs preserved
- Canonical writeback validated
- Error/warning states tested
- Standalone calculator tested
- 3D integration tested
- Report compatibility tested if applicable
- CI/build passing
- Migration notes added if contract behavior changed
- Deployment smoke test completed

## Core v0.5 and GPT-4 acceptance addendum

- Read live Core v0.5 `CORE_CONTRACT.md`, `typescript/index.ts`, `AI_GPT_UPDATE_POLICY.md` and current repository state before work; direct GitHub Connector only, no Gateway/custom MCP.
- GPT-1 owns engineering/report specifications; GPT-2 owns validated calculation engines, PyNite adapter and numerical tests; GPT-3 owns API/UI/3D/reports/plugin integration/deployment; GPT-4 owns orchestration, compliance, verification acceptance and production readiness.
- Keep verified standalone engines unchanged; migrate integration boundaries, tests and documentation, not engineering formulas.
- Solver-dependent production release requires verified GPT-2 evidence and GPT-4 acceptance of `orchestration/PYNITE_ADAPTER_VERIFICATION_GATE.md`. Do not confuse GitHub commit, CI success and production verification.
- Do not overwrite existing files without inspecting the latest SHA and explicit authorization; report exact changes and verification.
