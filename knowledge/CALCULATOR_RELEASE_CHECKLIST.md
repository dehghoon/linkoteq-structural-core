# Linkoteq Calculator Release Checklist

Use for W-Section, Snow, Wind, Seismic, Wood/Timber and every future calculator. Inspected Core contract on main: **v0.5**. Verify the applicable released or explicitly approved pinned baseline and record its exact commit; main is not automatically a release.

## Contract
- [ ] Core version declared
- [ ] Canonical IDs and references preserved
- [ ] `projectId`, `runId`, `calculator`, `calculatorVersion`, `targetIds` handled where applicable
- [ ] Units explicit
- [ ] No conflicting local platform schema
- [ ] `AI_GPT_UPDATE_POLICY.md` followed

## Coordinate / analysis compatibility
- [ ] Geometry interpreted in global coordinates
- [ ] External loads global by default
- [ ] Member-local loads explicitly declared if used
- [ ] Internal member forces for design interpreted as member-local
- [ ] Core local-axis/sign convention verified
- [ ] Station `x` and optional `xRatio` interpreted correctly
- [ ] No hard-coded Core requirement for start/mid/end station count

## Engineering ownership
- [ ] Calculator owns only its intended engineering logic
- [ ] Verified calculation engine is not duplicated in UI/integration code
- [ ] Existing standalone mode preserved where required
- [ ] Core migration changes mappings/tests before changing engineering logic

## Canonical outputs
### Load calculator
- [ ] `LoadSource`
- [ ] `LoadCase`
- [ ] `Load`
- [ ] code edition / jurisdiction / provenance

### Design calculator
- [ ] `DesignRun`
- [ ] `MemberDesignResult`
- [ ] `DesignCheck`
- [ ] governing check / utilization / demand-capacity data as applicable

## Reporting
- [ ] Structured report-ready values exposed
- [ ] Source object IDs and run IDs traceable
- [ ] Assumptions/warnings structured

## Tests
- [ ] Known worked example
- [ ] Boundary case
- [ ] Invalid input
- [ ] Unit consistency
- [ ] Active Core v0.5 envelope validation; explicit compatibility tests for retained legacy integrations
- [ ] Canonical writeback validation
- [ ] Provenance/run ID preservation
- [ ] Coordinate/sign-convention test when forces are consumed
- [ ] Standalone regression test

## Integration / release
- [ ] 3D integration tested where applicable
- [ ] Missing service configuration fails clearly
- [ ] CI/typecheck/build passes
- [ ] Deployment smoke test passes
- [ ] Migration notes added when needed
- [ ] Core compatibility documented
- [ ] GPT knowledge synchronized with current Core

## Core v0.5 integration and specialist gates
Apply each item to the declared capability. Record evidence or a justified not-applicable result; a checked box alone is not verification.
- [ ] Typed material/section analysis properties and their dimensional units validated where consumed
- [ ] Six DOFs, restraints, springs, imposed displacements and member-end releases mapped correctly where supported
- [ ] Canonical load primitives, self-weight, directions, signs, case provenance and combination semantics validated
- [ ] Unsupported features produce explicit diagnostics; no invented engineering defaults
- [ ] PyNite execution uses only the GPT-2-owned Core Analysis Adapter
- [ ] Solver-dependent release satisfies `../orchestration/PYNITE_ADAPTER_VERIFICATION_GATE.md`
- [ ] Approved GPT-2 calculation logic preserved; engineering changes have specification and verification evidence
- [ ] GPT-5 security review and remediation/retest recorded for affected security surfaces
- [ ] Unresolved high/critical security findings block affected release unless authorized scoped, expiring risk acceptance is permitted and recorded
- [ ] Drawing-derived inputs retain GPT-7 evidence and GPT-6 reconstruction validation before eligible Core promotion
- [ ] Import/export capabilities report preservation, mapping, visualization, export and analysis support separately
- [ ] Commit, push/merge, CI, deployment creation, deployment health, production URL and representative behavior recorded separately
- [ ] Migration and rollback procedures documented; no production claim based solely on CI or documentation

Legacy v0.4 snapshots are historical references. Updating the declared version alone does not establish v0.5 compatibility.
