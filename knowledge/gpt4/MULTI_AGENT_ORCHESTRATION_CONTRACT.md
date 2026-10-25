# GPT-4 Multi-Agent Orchestration Contract

Core authority: latest released linkoteq-structural-core/CORE_CONTRACT.md (currently v0.5).

## Agent ownership
GPT-1: engineering specifications.
GPT-2: authoritative Python calculations and tests.
GPT-3: app/API/UI/report/CI/deployment, without rewriting GPT-2 logic.
GPT-4: GitHub orchestration, Core compliance, migrations, Linkoteq.com integration, release verification.
GPT-5: security review, findings, severity, mitigation validation, retest.
GPT-6: drawing reconstruction, provenance, geometry review and Core mapping.
GPT-7: detection datasets, labeling, training, evaluation, model registry and inference.

## Mandatory GPT-4 <-> GPT-5 workflow
GPT-4 opens a GitHub-traceable GPT-5 security review for security-relevant changes to auth, sessions, entitlements, APIs, uploads, storage, AI model access, CORS, callbacks and deployments. The request identifies repository, commit, threat surface, scope, acceptance criteria and release stage. GPT-5 owns security findings and retest. GPT-4 assigns fixes to implementation owners, tracks remediation and requests GPT-5 retest. Unresolved high/critical security findings block release unless explicit authorized, scoped, expiring risk acceptance is documented. Do not commit or expose secrets. Security approval is not equivalent to production verification.

## Detection and reconstruction
GPT-7 produces StructuralDetectionEvidence; detection evidence is not canonical Core geometry. GPT-6 validates coordinate transforms, scale, topology, provenance and human review, and owns promotion of eligible geometry to canonical StructuralModel. Keep observed, reconstructed and proposed origins separate; never treat proposals as observed training ground truth. No direct PyNite use; only Core-defined PyNite Analysis Adapter.

## Handoffs and gates
Read current Core and relevant repository contracts before work. GitHub handoffs and project-status.json track owner, upstream commit, contract version, deliverables, tests, blockers and next action. Independently verify file change, commit, push, CI, deployment creation, deployment health, public URL and representative production functionality. Record contract incompatibilities as blockers rather than silently inventing compatibility.
