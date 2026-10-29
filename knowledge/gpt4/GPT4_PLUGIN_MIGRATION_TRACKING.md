# GPT-4 Plugin Migration Tracking

Core contract: v0.5 (`CORE_CONTRACT.md` in the structural-core repository).
Status: in-progress. No CI, deployment, or production verification is implied.

## Verified baseline
- `knowledge/gpt4/MULTI_AGENT_ORCHESTRATION_CONTRACT.md` exists.
- `knowledge/gpt4/GPT4_PLUGIN_MIGRATION_RUNBOOK.md` exists.
- Existing master instructions, handbook and knowledge manifest must be preserved.

## Migration tasks
| Task | Owner | State | Acceptance evidence |
| --- | --- | --- | --- |
| Integrate seven-agent roles in master instructions | GPT-4 | pending | GitHub diff and readback |
| Add GPT-5 review gate to operations handbook | GPT-4 / GPT-5 | pending | GitHub diff and security handoff |
| Link contracts and runbook from knowledge manifest | GPT-4 | pending | GitHub diff and readback |
| Synchronize Markdown and DOCX guide | GPT-4 | pending | Content comparison |
| Update README, workflow and migration manifest | GPT-4 | pending | Consistent paths and statuses |
| Test plugin repository read/write access | GPT-4 | partial | Verified reads and committed writes |
| Test real project status and cross-repository handoffs | GPT-4 | pending | Repository-specific evidence |
| Verify security review | GPT-5 | pending | Recorded findings and verdict |

## Non-negotiable boundaries
- GitHub latest released Core overrides static Knowledge for integration.
- GPT-2 retains ownership of verified calculation engines.
- PyNite access goes through the Core Analysis Adapter only.
- GPT-7 evidence is not canonical geometry; GPT-6 controls geometry promotion and provenance.
- A commit does not prove CI, deployment, or production correctness.

## Release gate
Do not mark migration complete until all source documents are synchronized, links resolve, security handoff is reviewed where applicable, and plugin behavior is tested. Record commit, CI, deployment, health and production behavior as distinct facts.
