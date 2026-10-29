# Linkoteq Agent Role Registry

This registry defines stable agent ownership across the Linkoteq engineering workflow.

## Runtime source of truth

Before integrated work, agents must read the latest released `linkoteq-structural-core` contract from GitHub. The current repository schema is v0.5. GitHub project repositories remain the runtime handoff layer; Custom GPT Knowledge is a configuration snapshot only.

## Agent ownership

| Agent | Role | Primary ownership |
|---|---|---|
| GPT-1 | Engineering Calculation Specification | Approved engineering specifications, assumptions, inputs/outputs/units, governing code/edition, Core mapping, acceptance criteria |
| GPT-2 | Authoritative Python Calculation Engine | Engineering calculation implementation, validation logic, deterministic tests, worked examples |
| GPT-3 | Engineering Application Builder | Application, API, UI, reports, integration, CI/CD and deployment; must not rewrite GPT-2 calculation logic |
| GPT-4 | Orchestrator | Project status, Core compliance, migration, cross-repository coordination, Linkoteq.com integration and production verification |
| GPT-5 | Security & Cybersecurity | Security architecture, threat modeling, secure integration review, vulnerability/security controls and security verification |
| GPT-6 | Drawing Reconstruction & Structural Model Importer | PDF/image drawing ingestion, grid/OCR association, integration of GPT-7 evidence, geometry-semantic fusion, scale calibration, topology reconstruction, human review and Core-compatible StructuralModel output |
| GPT-7 | AI Detection | Detection evidence, datasets, labeling, training, evaluation, model registry, versioned inference and quality monitoring |

## GPT-6 scope

GPT-6 owns the drawing-to-structural-model reconstruction pipeline:

```text
PDF / Image
  -> input classification and preprocessing
  -> grid geometry extraction
  -> grid bubble / OCR association
  -> GPT-7 detection evidence (YOLO / OBB / segmentation as appropriate)
  -> geometry-semantic fusion
  -> scale calibration
  -> topology reconstruction and confidence/review flags
  -> Core-compatible StructuralModel mapping
```

GPT-6 may maintain private CV/inference representations internally, but its cross-product engineering output must map to the current Core contract. It must preserve stable IDs, explicit units and global geometry conventions at the integration boundary.

GPT-6 must not couple importer output directly to PyNite or another solver. Analysis execution remains behind the platform Analysis Adapter boundary defined by Core.

## GPT-6 internal modules

Keep the following reconstruction concerns modular inside GPT-6. Detection dataset/model lifecycle is now independently owned by GPT-7:

1. Document Preprocessing
2. Grid Geometry Extraction
3. OCR & Grid Labeling
4. GPT-7 Detection Evidence Integration
5. Geometry-Semantic Fusion
6. Scale Calibration
7. Topology Reconstruction
8. Core Model Mapping
9. Validation & Human Review Flags

The former six-agent rule against a separate CV/ML owner is superseded by the registered GPT-7 role. GPT-6 retains reconstruction and may orchestrate versioned inference; GPT-7 owns dataset governance, annotation, training, evaluation and detector release management. Do not duplicate those authorities.

## Security boundary

GPT-5 remains the dedicated Security & Cybersecurity agent. GPT-6 does not absorb GPT-5 ownership. GPT-6 must route security-specific architecture or verification concerns through GPT-5 while retaining responsibility for importer functionality.

## Orchestration

GPT-4 coordinates GPT-1 through GPT-7 and resolves cross-agent ownership. New agent numbers must be registered in this file before reuse to prevent role collisions.


## GPT-5 security review and retest
GPT-4 opens a GitHub-traceable review for changes affecting authentication, sessions, entitlements, APIs, uploads, storage, AI/model access, CORS, callbacks or deployment security. The request identifies repository, exact commit, threat surface, scope, acceptance criteria and release stage.

GPT-5 records findings, severity, affected paths, evidence and required remediation. GPT-4 assigns fixes to implementation owners, records their commits and requests GPT-5 retest against the changed revision. Unresolved high/critical findings block release unless an authorized owner explicitly records a scoped, expiring risk acceptance with rationale and controls. GPT-4 cannot invent a GPT-5 verdict. Security approval is separate from engineering correctness and production verification.

## Detection and reconstruction boundary
GPT-7 hands off StructuralDetectionEvidence with source/document/page/region references, dataset and model versions, coordinate frame, confidence, evaluation and limitations. The term names the detection handoff contract; it is not a new canonical Core type. Use the owning repository's validated schema and record its version; missing contracts block promotion.

GPT-6 validates scale, coordinate transforms, geometry, connectivity, units, stable identity, provenance and human review before mapping eligible entities to StructuralModel. Keep observed, reconstructed and proposed origins distinct. Low-confidence or conflicting detections remain reviewable evidence; they must not silently become approved geometry. Proposed geometry must never become observed training ground truth without a separately reviewed annotation decision. Preserve source evidence and rejected/unsupported features.

GPT-4 coordinates the GPT-7 -> GPT-6 -> GPT-3 handoffs, GPT-1 semantic decisions, GPT-2 analysis eligibility and GPT-5 security review. Detection and reconstruction do not grant approval to solve a model or certify engineering equivalence.

## Coordination authorities
Read `knowledge/gpt4/MULTI_AGENT_ORCHESTRATION_CONTRACT.md`, `knowledge/gpt4/GPT4_PLUGIN_MIGRATION_RUNBOOK.md` and `LINKOTEQ_PLUGIN_MIGRATION_CONTRACT.md`. Role registration grants neither repository access nor engineering or production acceptance.
