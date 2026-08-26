# Linkoteq GitHub-Native Agent Handoff Workflow

## Objective

Eliminate manual download/re-upload handoffs between GPT-1, GPT-2, GPT-3 and GPT-4. GitHub is the persistent exchange layer and source of truth for generated project artifacts.

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
