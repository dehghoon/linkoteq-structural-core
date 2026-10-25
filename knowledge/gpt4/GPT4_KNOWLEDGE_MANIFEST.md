# GPT-4 Knowledge Manifest — GitHub Runtime (Core v0.5)

## Authority
Before each task, read the latest released root `CORE_CONTRACT.md` in `dehghoon/linkoteq-structural-core`. GitHub Core overrides static Knowledge and historical versioned guides.

## Canonical GPT-4 documents
- `knowledge/gpt4/README.md`
- `knowledge/gpt4/GPT4_MASTER_INSTRUCTIONS.md`
- `knowledge/gpt4/GPT4_OPERATIONS_HANDBOOK.md`
- `knowledge/gpt4/LINKOTEQ_GPT4_ORCHESTRATOR_GUIDE.md`
- `knowledge/gpt4/ANALYSIS_WORKFLOW.md`
- `knowledge/gpt4/MIGRATION_MANIFEST.json`

The migration target files listed above are not considered published until independently verified in GitHub.

## Shared runtime dependencies
- `CORE_CONTRACT.md` (latest released)
- `typescript/index.ts`
- `AI_GPT_UPDATE_POLICY.md`
- `knowledge/GPT3_INTEGRATION_RELEASE_RULES.md` where applicable
- Project repository status, handoffs, tests, CI, deployment and production evidence

## Legacy references
`GPT1_SPEC_RULES_v0.4.md`, `GPT2_IMPLEMENTATION_RULES_v0.4.md`, `GPT3_INTEGRATION_RELEASE_RULES_v0.4.md`, and `CALCULATOR_RELEASE_CHECKLIST_v0.4.md` are historical references, not authoritative Core v0.5 integration contracts. Consult only for applicable non-conflicting process requirements; verify current replacement in GitHub. Do not silently rewrite engineering calculations.

## Mandatory project handoff artifacts
- `project-status.json`
- `handoffs/gpt1-to-gpt2.md`
- `handoffs/gpt2-to-gpt3.md`
- `handoffs/gpt3-to-gpt4.md`

## Migration safeguards
Preserve the current GPT-4 as rollback; use Direct GitHub Plugin; require approval for writes; never equate a commit, CI, deployment and production verification. PyNite must integrate through the Core adapter owned by GPT-2.
