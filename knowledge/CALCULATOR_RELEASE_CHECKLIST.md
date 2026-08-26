# Linkoteq Calculator Release Checklist

Use this checklist for Snow, W-Section, Wind, Seismic, Timber/Wood Design and every future calculator.

## Contract
- [ ] Supported Core schema version declared
- [ ] `projectId`, `runId`, `calculator`, `calculatorVersion`, `targetIds` handled
- [ ] Stable engineering IDs preserved
- [ ] Units explicit at every integration boundary
- [ ] No conflicting local copy of platform-wide Core types

## Engineering ownership
- [ ] Calculator owns only its intended engineering logic
- [ ] Solver logic remains outside design calculators unless explicitly part of scope
- [ ] Load calculators write canonical loads rather than UI-only values
- [ ] Design calculators consume canonical forces/results when integrated with 3D Model

## Outputs
### Load calculator
- [ ] `LoadSource`
- [ ] `LoadCase`
- [ ] `Load`
- [ ] code edition / jurisdiction / provenance

### Design calculator
- [ ] `DesignRun`
- [ ] `MemberDesignResult`
- [ ] `DesignCheck`
- [ ] demand / capacity / utilization
- [ ] governing check and code clause where applicable

## Reporting
- [ ] Results expose all structured values required for a report
- [ ] Report values can trace back to model object IDs and run IDs
- [ ] Assumptions and warnings are structured, not buried only in prose

## Tests
- [ ] Known worked example
- [ ] Boundary case
- [ ] Invalid input
- [ ] Unit consistency
- [ ] Core envelope validation
- [ ] Canonical writeback validation
- [ ] Provenance/run ID preservation
- [ ] Regression test

## Product integration
- [ ] Standalone calculator still works
- [ ] 3D Model integration works
- [ ] Missing environment/service configuration gives a clear error
- [ ] Desktop smoke test
- [ ] Mobile smoke test where relevant
- [ ] Build/CI passes

## Release
- [ ] Version updated
- [ ] Migration notes added if needed
- [ ] Core compatibility documented
- [ ] Deployment smoke-tested
- [ ] Integration not marked complete until structured results are visible downstream