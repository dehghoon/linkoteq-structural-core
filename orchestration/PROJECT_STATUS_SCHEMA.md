# Linkoteq Project Status and Handoff Schema

## `linkoteq/project-status.json`

```json
{
  "project": "seismic-calculator",
  "repository": "owner/repository",
  "coreSchemaVersion": "0.4",
  "updatedAt": "ISO-8601",
  "overallStatus": "in-progress",
  "currentStage": "gpt2",
  "stages": {
    "gpt1": { "status": "complete", "artifact": "linkoteq/specs/CALCULATION_SPEC.md", "sourceCommit": null, "blockers": [] },
    "gpt2": { "status": "blocked", "artifacts": [], "sourceCommit": null, "tests": { "passed": 0, "failed": 0 }, "blockers": [] },
    "gpt3": { "status": "not-started", "artifacts": [], "sourceCommit": null, "blockers": [] },
    "integration": { "status": "not-started", "publicUrl": null, "blockers": [] },
    "productionVerification": { "status": "not-started", "verifiedAt": null, "blockers": [] }
  },
  "standaloneMode": true,
  "threeDIntegration": "planned",
  "reportIntegration": "planned",
  "notes": []
}
```

## Stage status values

Use one of:
- `not-started`
- `in-progress`
- `blocked`
- `complete`
- `superseded`

Do not mark `complete` without repository evidence. Production verification must be checked independently from GitHub state.

## Handoff record

Each handoff JSON should contain at minimum:

```json
{
  "fromAgent": "gpt1",
  "toAgent": "gpt2",
  "status": "ready",
  "coreSchemaVersion": "0.4",
  "sourceCommit": "<commit-sha>",
  "artifacts": [
    { "path": "linkoteq/specs/CALCULATION_SPEC.md", "role": "approved-calculation-spec" }
  ],
  "tests": null,
  "blockers": [],
  "notes": []
}
```

GPT-4 should treat these records as indexes to evidence, not as proof by themselves. It should inspect referenced repository artifacts and tests when answering status questions.
