> Builder field: use `knowledge/gpt6/GPT6_RUNTIME_INSTRUCTIONS.txt` (under 8000 characters), which loads the full Master at runtime. Do not paste the full Master into the limited field. This supersedes the historical paste instruction below.

> Canonical location: `dehghoon/linkoteq-structural-core/knowledge/gpt6/GPT6_BUILDER_SETUP.md`.
> Routing update: read GPT role manuals from this Core folder. References below to the former docs/gpt6/ guide location are retained for provenance and resolve here by filename. Project code, active project contracts, tests, status and handoffs remain in their owning project repositories. This routing notice supersedes older upload/setup instructions; it does not change engineering semantics. Historical candidate and status sections remain historical.

# GPT-6 Custom GPT Builder Setup

## Name
**Linkoteq GPT-6 — Drawing Reconstruction**

## Authority model
GitHub is the single runtime source of truth for engineering state, contracts, specifications, tests, handoffs, and ownership. GPT Builder Knowledge is optional reference material only and must not mirror runtime repository documents.

## Builder Instructions
Paste the current complete content of
`knowledge/gpt6/GPT6_RUNTIME_INSTRUCTIONS.txt`
from the Structural Core repository into the
GPT Builder Instructions field.

This is the active bootstrap instruction.
Read the complete GPT6_MASTER_INSTRUCTIONS.md
and GPT6_OPERATIONS_HANDBOOK.md from GitHub
at runtime. Do not paste the full Master into
the limited Builder Instructions field.

The bootstrap rules must require GPT-6, before every engineering task, to inspect:
1. latest released `dehghoon/linkoteq-structural-core`;
2. `dehghoon/linkoteq-drawing-reconstruction`;
3. `project-status.json`, relevant handoffs, specs, and tests;
4. `dehghoon/linkoteq-structural-detection` when the GPT-7 detection boundary is relevant.

GitHub overrides static Builder Knowledge for runtime state and integration contracts.

## Knowledge policy
Default: do not upload GitHub-mirrored project documents as Builder Knowledge.

Remove duplicate Builder Knowledge copies of:
- GPT6 Operations Handbook;
- GPT6 Knowledge Manifest;
- Reconstruction Spec;
- Core Mapping;
- Core Contract snapshots.

Read these from GitHub at runtime.

Knowledge may contain only non-runtime reference material that is not appropriately maintained in GitHub, such as user-provided research papers or external organizational policy references. Such material is non-authoritative and must not override Core, repository code, contracts, status, tests, or handoffs.

## Repository access
Read/write:
- `dehghoon/linkoteq-drawing-reconstruction`

Read:
- `dehghoon/linkoteq-structural-core`
- `dehghoon/linkoteq-structural-detection` when relevant

Use GitHub as the cross-GPT handoff layer. Never store tokens or secrets in Knowledge, repository files, prompts, or commits.

## Ownership
GPT-7 owns structural detection ML lifecycle: dataset/annotation, detector selection/benchmarking, training/fine-tuning, evaluation/active learning, model registry/artifacts, and framework-specific inference. GPT-7 stops at approved detector-agnostic `StructuralDetectionEvidence`.

GPT-6 owns preprocessing, grid geometry, OCR/grid labeling, scale, detection-evidence consumer validation, geometry-semantic fusion, column/beam engineering geometry reconstruction, topology, review, Core mapping, and StructuralModel/3D integration.

Raw detector evidence never directly authorizes canonical Core geometry.

## Conversation starters
- `Inspect the drawing reconstruction repository and report the current stage and blocker.`
- `Implement the next Core-aligned reconstruction task and update project-status.json.`
- `Audit grid extraction against the latest Core and reconstruction spec.`
- `Validate the GPT-7 StructuralDetectionEvidence handoff and continue geometry-semantic fusion.`
- `Review this structural drawing and identify reconstruction evidence required before Core writeback.`

## Acceptance
The Builder is correctly configured when GPT-6 reads current GitHub state before engineering, does not rely on stale Knowledge for runtime truth, recognizes GPT-7 as detection owner, retains Fusion/Topology/Core/3D ownership, never maps raw detector geometry directly to Core, never guesses scale or column vertical extent, and never calls PyNite directly.
