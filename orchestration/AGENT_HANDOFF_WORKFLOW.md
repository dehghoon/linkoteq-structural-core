# Linkoteq GitHub-Native Agent Handoff Workflow

## Objective

Eliminate manual download/re-upload handoffs among GPT-1 through GPT-7. GitHub is the persistent exchange layer and source of truth for generated project artifacts.

## Agent roles

- **GPT-1** creates or updates the approved engineering specification in the target calculator repository.
- **GPT-2** reads the approved specification directly from GitHub, creates/updates the authoritative Python calculation engine and tests, and records its handoff in GitHub.
- **GPT-3** reads the approved specification and GPT-2 engine/tests directly from GitHub, then creates/updates the application, API, UI, report integration, tests and deployment configuration. GPT-3 must not rewrite GPT-2 engineering logic.
- **GPT-4** is the orchestrator. It inspects repositories, Core compatibility, status records and handoff artifacts; diagnoses blockers; coordinates the next stage; audits production integration; and coordinates connection of independent tool repositories to Linkoteq.com.

## No manual artifact transfer

Project artifacts must not depend on the user downloading a file from one GPT and uploading it to another GPT.

Each agent must read required artifacts from the project repository and write its outputs back to that repository when authorized GitHub access is available.

Static Custom-GPT Knowledge files remain configuration snapshots and cannot be automatically rewritten inside another Custom GPT by this workflow. Dynamic project artifacts and current Core files must therefore be read from GitHub at execution time whenever freshness matters.

## Standard repository paths

Recommended paths in each calculator repository:

```text
linkoteq/
  project-status.json
  handoffs/
    gpt1-to-gpt2.json
    gpt2-to-gpt3.json
    gpt3-to-gpt4.json
  specs/
    CALCULATION_SPEC.md
  integration/
    CORE_COMPATIBILITY.md
    LINKOTEQ_INTEGRATION.md
```

Existing repositories do not need to be reorganized solely to match these paths. GPT-4 may map existing equivalent files and introduce the standard paths incrementally.

## Handoff requirements

### GPT-1 -> GPT-2
GPT-1 writes the approved specification and a handoff record containing:
- artifact path
- Core schema version
- governing code/edition
- status
- blockers
- source commit

GPT-2 must fetch the referenced specification from GitHub before implementation.

### GPT-2 -> GPT-3
GPT-2 writes/updates:
- Python engine
- validation code
- tests
- engineering notes required by GPT-3
- handoff record with exact paths and test status

GPT-3 must fetch these artifacts from GitHub. GPT-3 must not substitute regenerated calculation logic for the authoritative GPT-2 implementation.

### GPT-3 -> GPT-4
GPT-3 records:
- application/integration status
- build/test status
- deployment configuration status
- production URL if deployed
- Core compatibility
- blockers
- source commit

GPT-4 independently verifies repository and production claims before marking completion.

## Core freshness

The latest released `dehghoon/linkoteq-structural-core` repository is authoritative for cross-product integration.

Agents should fetch current Core files from GitHub when performing integrated work instead of relying only on possibly stale uploaded Knowledge snapshots.

## Linkoteq.com integration

GPT-4 coordinates the final integration of independent engineering-tool repositories with the Linkoteq main website. It must verify the tool repository, production deployment, main-site navigation/route, API/backend, auth/session requirements, Core compatibility and representative production functionality.

A GitHub commit alone is never proof that the tool is deployed or connected to Linkoteq.com.


- GPT-5 owns independent security review, threat modeling, findings, severity, remediation validation and retest; it does not replace engineering acceptance.
- GPT-6 owns drawing reconstruction, scale calibration, coordinate transforms, topology, provenance, human review and promotion of eligible geometry to canonical Core models.
- GPT-7 owns AI detection evidence, datasets, labeling, training, evaluation, model registry, inference versions and detection-quality monitoring; it does not approve structural geometry or calculations.

## Seven-agent handoff extensions
Retain existing GPT-1/2/3 handoffs. Recommended additional project paths are `handoffs/gpt4-to-gpt5.md`, `handoffs/gpt5-to-gpt4.md`, `handoffs/gpt7-to-gpt6.md`, and `handoffs/gpt6-to-gpt3.md`; existing equivalent paths may be retained with an explicit index. Security retest records must identify both the finding revision and the remediation revision.

Each handoff records source/target owner, repository/path, exact source commit, Core and interface versions, deliverables, test commands and evidence, limitations, blockers, next actions and forbidden changes. Detection handoffs also record source/dataset/model versions and confidence. Reconstruction handoffs also record calibration, topology checks, provenance and review state. Security handoffs also record findings, severity, disposition, retest and any expiring risk acceptance.

Add security, detection, reconstruction and plugin-runtime evidence to project status where applicable; use `not-applicable` only with a reason. Keep code changes, commit creation, main update, CI, deployment creation, deployment health, URL reachability and representative production behavior as separate facts with exact revisions. A handoff file does not automatically notify or execute another agent.

## GPT-5 security review and retest
GPT-4 opens a GitHub-traceable review for changes affecting authentication, sessions, entitlements, APIs, uploads, storage, AI/model access, CORS, callbacks or deployment security. The request identifies repository, exact commit, threat surface, scope, acceptance criteria and release stage.

GPT-5 records findings, severity, affected paths, evidence and required remediation. GPT-4 assigns fixes to implementation owners, records their commits and requests GPT-5 retest against the changed revision. Unresolved high/critical findings block release unless an authorized owner explicitly records a scoped, expiring risk acceptance with rationale and controls. GPT-4 cannot invent a GPT-5 verdict. Security approval is separate from engineering correctness and production verification.

## Detection and reconstruction boundary
GPT-7 hands off StructuralDetectionEvidence with source/document/page/region references, dataset and model versions, coordinate frame, confidence, evaluation and limitations. The term names the detection handoff contract; it is not a new canonical Core type. Use the owning repository's validated schema and record its version; missing contracts block promotion.

GPT-6 validates scale, coordinate transforms, geometry, connectivity, units, stable identity, provenance and human review before mapping eligible entities to StructuralModel. Keep observed, reconstructed and proposed origins distinct. Low-confidence or conflicting detections remain reviewable evidence; they must not silently become approved geometry. Proposed geometry must never become observed training ground truth without a separately reviewed annotation decision. Preserve source evidence and rejected/unsupported features.

GPT-4 coordinates the GPT-7 -> GPT-6 -> GPT-3 handoffs, GPT-1 semantic decisions, GPT-2 analysis eligibility and GPT-5 security review. Detection and reconstruction do not grant approval to solve a model or certify engineering equivalence.

## Current Core and access controls
Core v0.5 is the active inspected schema; verify the released or approved pinned baseline independently. All PyNite execution uses the GPT-2-owned Core Analysis Adapter. Read `knowledge/gpt4/MULTI_AGENT_ORCHESTRATION_CONTRACT.md`, `knowledge/gpt4/GPT4_PLUGIN_MIGRATION_RUNBOOK.md` and `LINKOTEQ_PLUGIN_MIGRATION_CONTRACT.md`. Keep existing JSON or Markdown handoffs where already established; list exact paths and do not create conflicting parallel records.
