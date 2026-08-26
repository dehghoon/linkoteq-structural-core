# Linkoteq Calculator Release Checklist

Use for W-Section, Snow, Wind, Seismic, Wood/Timber and every future calculator. Active Core schema: **v0.4**.

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
- [ ] Core v0.4 envelope validation
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