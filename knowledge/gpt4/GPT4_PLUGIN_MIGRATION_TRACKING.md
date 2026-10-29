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
| Integrate seven-agent roles in master instructions | GPT-4 | prepared | Full proposed diff; commit/readback pending |
| Add GPT-5 review gate to operations handbook | GPT-4 / GPT-5 | prepared; review pending | Handbook gate added; no GPT-5 verdict claimed |
| Link contracts and runbook from knowledge manifest | GPT-4 | prepared | Full proposed diff; commit/readback pending |
| Synchronize Markdown and DOCX guide | GPT-4 | prepared | 345-paragraph text parity passed; all 10 rendered pages visually reviewed |
| Update README, workflow and migration manifest | GPT-4 | prepared | Linked seven-agent package and manifest; publication pending |
| Test plugin repository read/write access | GPT-4 | partial | Direct canonical reads verified in this session; actual GPT-4 plugin host and write verification remain separate |
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


## Documentation synchronization checkpoint 2026-10-29
Base main commit: `5b4590bf5b70bf3fc345b1e1c376736cff4fde31`. Root Core Contract v0.5 read directly; blob `5b88c1c5c3049f81915f4772b94e8e617989f05b`. GitHub releases returned an empty list; a released baseline is not established by this inspection.

Prepared changes preserve valid instructions and extend master/handbook/manifest, Markdown/DOCX guide, README, analysis workflow, migration runbook/manifest and central role/handoff records. Historical GPT-4 entry points are retained and linked. The former central six-agent ownership conflict is resolved explicitly. No Core type, PyNite adapter, GPT-2 calculation, application or deployment configuration is modified.

Evidence states at preparation: local files changed; publication commit pending exact-diff approval; main update/readback pending; CI not run for this change; deployment not performed; production not verified. After publication, use the commit containing this checkpoint as the documentation revision and record readback/CI results in a subsequent evidence update; do not invent a self-referential commit SHA.

## Remaining blockers and next permitted work
| Blocker | Owner | Required evidence / next action |
| --- | --- | --- |
| Exact-diff publication | User / GPT-4 | Approve complete text diff and binary before/after hashes; recheck base, publish, read back every changed file |
| Existing plugin identity and configuration | GPT-4 / plugin owner | Inspect actual plugin ID, audience, version/release, dependencies and assets; update in place and preserve rollback |
| Actual plugin host permissions | GPT-4 / plugin owner | Test discovered tools and authorized canonical reads in that host; distinguish behavioral scope from technical permissions |
| Cross-repository operational handoff | GPT-4 with relevant owners | Inspect a real authorized project, exact commits/status and next-owner handoff; website README read alone does not satisfy this test |
| Independent security review | GPT-5 | Review changed orchestration/access guidance; findings/verdict and retest where required; no security approval inferred from documentation |
| Release baseline | GPT-4 / Core owner | Designate approved immutable baseline or verified release |
| Applicable CI | GPT-4 | Inspect checks for the published documentation revision; absence of runs is not a pass |

Next permitted work is documentation publication after exact-diff approval, followed by actual existing-plugin inspection, configuration review and runtime tests. Migration remains in-progress. Plugin release, deployment and production readiness are not established.

Local document QA: all original DOCX paragraphs were accounted for in the original Markdown; revised Markdown/DOCX paragraph parity passed (345 paragraphs). All 10 final rendered pages were visually reviewed. Relative README links resolve against the inspected tree. These are local document checks, not CI or runtime tests.
