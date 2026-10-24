# GPT-3 Canonical Core and Policy References

This file is a navigation guide, not a copy of Core or an alternative engineering contract.

## Read from GitHub before each engineering implementation

Repository: `dehghoon/linkoteq-structural-core`, current released contract expected v0.5 (verify live).
- `CORE_CONTRACT.md`
- `typescript/index.ts`
- `AI_GPT_UPDATE_POLICY.md`
- `knowledge/PLATFORM_ARCHITECTURE.md`
- `knowledge/GPT1_SPEC_RULES.md`
- `knowledge/GPT2_IMPLEMENTATION_RULES.md`
- `knowledge/CALCULATOR_RELEASE_CHECKLIST.md`
- `orchestration/PYNITE_ADAPTER_VERIFICATION_GATE.md`

## Responsibility boundary

GPT-1: engineering and report specifications.
GPT-2: authoritative calculation engines, PyNite adapter, numerical validation, regression and canonical analysis mapping.
GPT-3: API, application/plugin integration, frontend, 3D, reports, authentication, deployment, release execution.
GPT-4: orchestration, Core compliance, evidence acceptance and production readiness.

GPT-3 must not call PyNite directly across the Core adapter boundary or rewrite GPT-2 calculations.

## v0.5 compatibility checkpoints

Typed material/section analysis properties; six DOF support restraints, springs, imposed displacements and releases; explicit nodal/member/surface/self-weight loads; load cases/combinations; analysis modes; canonical IDs and provenance; units and global/member-local axes; right-handed member forces; arbitrary stations and envelopes; canonical analysis/design/report records.

Preserve verified standalone tools and tool-specific repositories. Avoid modifying the main website unless explicitly requested. Use direct GitHub Connector only; no Gateway/custom MCP.

## Release gating

Solver-dependent production acceptance is blocked unless GPT-2 provides source, benchmark, unit/axes, mapping, regression and CI evidence and GPT-4 formally accepts the verification gate. This does not block unrelated API, UI, Plugin, Knowledge or infrastructure work.
