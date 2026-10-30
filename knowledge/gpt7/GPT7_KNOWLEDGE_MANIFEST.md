# GPT-7 Knowledge Manifest — Migration Candidate

## Core-hosted bootstrap files
- `knowledge/gpt7/README.md`
- `knowledge/gpt7/GPT7_RUNTIME_INSTRUCTIONS.txt`
- `knowledge/gpt7/GPT7_MASTER_INSTRUCTIONS.md`
- `knowledge/gpt7/GPT7_OPERATIONS_HANDBOOK.md`
- `knowledge/gpt7/GPT7_KNOWLEDGE_MANIFEST.md`
- `knowledge/gpt7/GPT7_BUILDER_SETUP.md`

## Core authoritative contracts
`CORE_CONTRACT.md`, `AI_GPT_UPDATE_POLICY.md`, `LINKOTEQ_PLUGIN_MIGRATION_CONTRACT.md`, `orchestration/AGENT_ROLE_REGISTRY.md` at the latest official Core release.

## Detection source docs (retain in place)
- `docs/GPT7_MASTER_INSTRUCTIONS.md` — historical master
- `docs/gpt7/GPT7_INSTRUCTIONS_v0.2.md` — v0.2 candidate guidance
- `docs/gpt7/human-review-pipeline-v0.1.md` — legacy review pipeline
- `docs/gpt7/wall-ontology-impact-analysis-v0.2-proposal.md` — historical proposal
- `project-status.json` — active status and handoff reference
- `contracts/label-ontology-v0.1.md`, `contracts/label-ontology-v0.2.md`
- `contracts/structural-detection-evidence-v0.1.md`, `contracts/structural-detection-evidence-v0.2.md`
- `contracts/annotation-spec-v0.1.md`, `contracts/annotation-spec-v0.2.md`, `contracts/annotation-spec-v0.3.md`
- Applicable validation, QA, dataset, model, migration, tests and CI artifacts

## Consumer
`dehghoon/linkoteq-drawing-reconstruction`: GPT-6 evidence consumer and regression tests.

## Provenance at preparation
Core tag v0.5.0: `a12a76c3fca5dfd1718c295ee9c77f698befdd49`; Detection main: `87b2eaa08396e4bb8cef872ff2d12f3080cc5d96`. Revalidate before writing or runtime use.
