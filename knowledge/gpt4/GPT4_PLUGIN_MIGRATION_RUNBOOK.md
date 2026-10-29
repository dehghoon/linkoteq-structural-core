# GPT-4 Plugin Migration Runbook

Status: in-progress
Core authority: `dehghoon/linkoteq-structural-core/CORE_CONTRACT.md` v0.5.

This document supplements, and does not replace, the existing GPT-4 master instructions, handbook, knowledge manifest, and guides.

## Required agent coordination
- GPT-1 owns engineering specifications.
- GPT-2 owns authoritative Python calculation engines and tests.
- GPT-3 owns application, API, UI, reports, CI, deployment, and integration adapters; GPT-3 must not silently rewrite GPT-2 logic.
- GPT-4 owns cross-repository orchestration, Core compliance, migration, Linkoteq.com integration, and release evidence.
- GPT-5 owns independent security review, findings, severity, remediation retest, and security verdict.
- GPT-6 owns drawing reconstruction, scale, topology, provenance, human review, and canonical geometry mapping.
- GPT-7 owns detection evidence, datasets, labeling, training, and evaluation. Detection proposals are not observed ground truth.

## Mandatory GPT-4 / GPT-5 gate
For auth, sessions, entitlements, public APIs, uploads, storage, AI access, CORS, callbacks, or deployment security changes, GPT-4 requests a GitHub-traceable review from GPT-5, specifying repo, commit, threat surface, criteria, and release stage. GPT-4 routes fixes and requests retest. Unresolved high or critical findings block release unless authorized, scoped, expiring risk acceptance is recorded.

## Core integration
Preserve stable IDs, units, coordinate conventions, material/section identity, LoadCase, LoadSource, canonical load primitives, analysis results, and design writeback. All PyNite access crosses the Core-defined PyNite Analysis Adapter. Preserve verified GPT-2 calculations; migrate integration boundaries.

## GitHub evidence
Inspect `project-status.json`, `handoffs/`, code, tests, CI, and deployment artifacts. Report stage, completed, incomplete, blocker, owner, next action, and next-stage permission. Verify file change, commit, push, CI, deployment creation, deployment health, public URL, and representative production functionality separately.

## Completion gates
1. Preserve existing instructions while linking this runbook and `MULTI_AGENT_ORCHESTRATION_CONTRACT.md` from the master, handbook, manifest, guides, README, workflow, and migration manifest.
2. Synchronize Markdown and DOCX guide content.
3. Confirm plugin GitHub read/write permissions and cross-repository status inspection.
4. Obtain GPT-5 review for affected security workflows.
5. Independently verify all commits and applicable CI; record missing evidence explicitly.
