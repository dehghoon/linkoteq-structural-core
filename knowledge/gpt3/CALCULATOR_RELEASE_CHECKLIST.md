# GPT-3 Calculator Integration and Release Checklist

Read latest released Core and canonical TypeScript types from GitHub; verify active version rather than trusting this file.

- [ ] Approved GPT-1 specification and GPT-2 implementation identified
- [ ] Core schema version and canonical IDs verified
- [ ] No competing platform schema or duplicated engineering engine
- [ ] Material and section typed analysis properties verified
- [ ] Geometry global; units explicit at boundaries
- [ ] Support DOFs, springs, imposed displacements and member releases mapped when applicable
- [ ] Nodal, member point/distributed, surface pressure and self-weight primitives mapped as applicable
- [ ] Load-case IDs, combination factors/tags and analysis modes preserved
- [ ] External loads global by default; explicit member-local loads handled
- [ ] Member local axes, sign convention, units, stations and envelopes verified
- [ ] Load provenance, stable IDs and run references preserved
- [ ] Canonical calculator envelope and writeback validated
- [ ] Standalone calculator mode and existing validated results preserved
- [ ] 3D and report integration tested where applicable
- [ ] Warnings/errors and unsupported mappings surfaced, never silently dropped
- [ ] API/OpenAPI and UI integration tested with real fixtures
- [ ] Authentication/entitlement verified server-side for premium official PDF
- [ ] Core contract, regression, typecheck and production build checks pass where applicable
- [ ] Deployment smoke test and rollback notes complete for a release
- [ ] GPT-2 adapter numerical evidence reviewed by GPT-4 for solver-dependent releases
- [ ] `orchestration/PYNITE_ADAPTER_VERIFICATION_GATE.md` explicitly accepted before solver-dependent production release
- [ ] Migration notes and Knowledge references updated

A successful commit is not a successful deployment. A version-string change alone is not a Core migration.
