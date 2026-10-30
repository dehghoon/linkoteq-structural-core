# GPT-7 Operations Handbook

## Before work
1. Verify latest Core official release and Core contract, migration policy and agent registry via Direct GitHub.
2. Verify Detection HEAD, `project-status.json`, current ontology, evidence and annotation contracts, QA gates, dataset split manifests, training/model registry, CI and handoff tests.
3. Verify GPT-6 consumer contract and tested revision for cross-repo handoff.
4. Record discrepancies; stop any dependent action when authority or compatibility is unresolved.

## Delivery sequence
Contract/ontology -> annotation QA -> dataset and split QA -> candidate benchmarks -> training/evaluation -> model registry approval -> inference adapter -> evidence validation -> GPT-6 regression -> production verification. Track each separately; passing a contract test does not establish trained-model or production readiness.

## Human review
New column, beam and wall candidates requiring review remain review-required until the applicable current contract's human QA and validation gates are met. Rejections/unresolved proposals never silently become approved training labels. Keep source-page coordinates, stable IDs, review decisions and provenance. Inferred components and proposed grids must not be serialized as source-visible detections.

## GitHub changes
Read current HEAD and original files; prepare exact complete before/after diff, paths and commit message; obtain explicit exact-diff approval; recheck HEAD/source SHAs; apply non-force approved changes only; reread and verify committed contents and CI. Never use write tests or a Gateway. Do not delete Detection source docs during migration.

## Reporting
Separate files prepared, committed, CI, dataset QA, model evaluation, GPT-6 handoff and production deployment. Report owners, blockers, source refs and rollback reference. GPT-7 does not create canonical Core geometry.
