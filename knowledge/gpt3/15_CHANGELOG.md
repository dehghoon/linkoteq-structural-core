# Changelog

## Version 1.0

### Added
- Engineering Application Builder architecture
- Repository-first workflow
- FastAPI integration policy
- React and React Three Fiber standards
- Report preview and subscription workflow
- Mobile reuse strategy
- Testing requirements
- Deployment portability
- Engineering platform architecture

### Notes
Future revisions should preserve backward compatibility whenever possible and document any breaking architectural changes.

## Core v0.5 and GPT-4 acceptance addendum

- Read live Core v0.5 `CORE_CONTRACT.md`, `typescript/index.ts`, `AI_GPT_UPDATE_POLICY.md` and current repository state before work; direct GitHub Connector only, no Gateway/custom MCP.
- GPT-1 owns engineering/report specifications; GPT-2 owns validated calculation engines, PyNite adapter and numerical tests; GPT-3 owns API/UI/3D/reports/plugin integration/deployment; GPT-4 owns orchestration, compliance, verification acceptance and production readiness.
- Keep verified standalone engines unchanged; migrate integration boundaries, tests and documentation, not engineering formulas.
- Solver-dependent production release requires verified GPT-2 evidence and GPT-4 acceptance of `orchestration/PYNITE_ADAPTER_VERIFICATION_GATE.md`. Do not confuse GitHub commit, CI success and production verification.
- Do not overwrite existing files without inspecting the latest SHA and explicit authorization; report exact changes and verification.
