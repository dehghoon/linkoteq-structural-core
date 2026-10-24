# Testing and QA Guideline

## Purpose

Define the minimum testing and quality requirements for every application produced by Engineering Application Builder.

Testing is part of the deliverable.

Code is not complete because it compiles or renders.

## Quality Principle

Do not claim that software is bug-free.

Report:

- what was tested;
- what passed;
- what failed;
- what was skipped;
- what remains untested;
- known risks;
- environment used.

## Required Test Layers

### 1. Inherited Engineering Tests

Run Agent #2 tests unchanged.

Confirm:

- approved validation cases still pass;
- API packaging does not change results;
- engine version is preserved;
- warnings remain unchanged;
- numerical precision is preserved.

### 2. Adapter Tests

Test the layer between FastAPI and the validated engine.

Cover:

- input mapping;
- unit normalization;
- section lookup;
- engine invocation;
- output mapping;
- warning propagation;
- exception translation;
- version metadata.

### 3. FastAPI Unit Tests

Test:

- valid requests;
- missing fields;
- invalid data types;
- unsupported units;
- unsupported sections;
- boundary values;
- structured errors;
- health endpoint;
- version endpoint;
- OpenAPI generation.

### 4. API Contract Tests

Verify:

- request schema;
- response schema;
- required metadata;
- all applicable checks;
- utilization ratio for each check;
- governing check;
- warnings and limitations;
- error schema;
- backward compatibility.

### 5. CISC Data Tests

Test:

- workbook ingestion;
- expected sheets;
- required columns;
- units;
- duplicate designations;
- null values;
- representative records;
- deterministic output;
- dataset version;
- API search and retrieval.

### 6. Frontend Component Tests

Test:

- section dropdown;
- search behavior;
- automatic property population;
- validation messages;
- loading states;
- empty states;
- API error states;
- result rendering;
- all-check rendering;
- warning rendering;
- report preview states;
- subscription states.

### 7. Visualization Tests

Test:

- section family mapping;
- geometry update after selection;
- member and support rendering;
- load visibility;
- mobile sizing;
- camera stability;
- fallback when WebGL fails;
- reduced-quality mode;
- no duplicated labels or loads.

Use visual regression tests where practical, but do not rely on snapshots alone.

### 8. Report Tests

Test:

- report schema validation;
- required report sections;
- equation and clause presence;
- report metadata;
- page numbers;
- header/footer behavior;
- image inclusion;
- watermark behavior;
- preview vs official version;
- PDF opens successfully;
- expected text is extractable;
- deterministic filename;
- no missing fonts or assets.

### 9. Authentication and Authorization Tests

Test:

- anonymous preview behavior;
- anonymous official download denied;
- authenticated but unsubscribed user denied;
- active subscriber allowed;
- expired entitlement denied;
- direct API bypass denied;
- forged client state denied;
- report endpoint checks authorization server-side.

### 10. Integration Tests

Test complete flows between:

- frontend and API;
- API and calculation engine;
- API and section data;
- API and report service;
- authentication and entitlement;
- report generation and storage.

### 11. End-to-End Tests

Critical path:

```text
Open application
→ Select CISC section
→ Enter geometry and loads
→ Run calculation
→ Review all checks
→ Open report preview
→ Sign in
→ Verify entitlement
→ Generate official PDF
```

Also test at least one failure path.

### 12. Responsive Tests

Verify:

- desktop;
- tablet;
- mobile;
- narrow portrait;
- landscape;
- touch interaction;
- keyboard navigation;
- overflow behavior;
- readable result tables;
- usable 3D fallback.

### 13. Build and Deployment Tests

Run:

- frontend production build;
- API startup;
- linting;
- type checking;
- Docker build when supplied;
- environment validation;
- migration check;
- Vercel preview when applicable;
- generic host instructions.

## Test Organization

Recommended:

```text
tests/
├── api/
├── contracts/
├── data/
├── frontend/
├── visualization/
├── reports/
├── auth/
├── integration/
└── e2e/
```

## Test Evidence

Deliver `TEST_RESULTS.md` with:

- date;
- environment;
- commands;
- pass/fail count;
- skipped tests;
- coverage if available;
- known failures;
- unresolved risks;
- build status.

## Acceptance Rule

Do not declare completion until:

- inherited engineering tests pass;
- API contract tests pass;
- frontend critical tests pass;
- report authorization tests pass;
- production build succeeds;
- known limitations are documented.

## Core v0.5 migration addendum

- Use current GitHub Core v0.5 contracts, not uploaded v0.4 snapshots; direct GitHub Connector only, no Gateway.
- GPT-2 owns calculation and PyNite adapter logic; GPT-3 consumes verified canonical inputs/results; GPT-4 owns architecture and production acceptance.
- Preserve standalone behavior, canonical IDs, units, coordinate conventions, typed materials/sections, support DOFs, explicit load primitives, load combinations, and provenance where relevant.
- Solver-dependent production release is blocked until the GPT-2 evidence is accepted by GPT-4 under `orchestration/PYNITE_ADAPTER_VERIFICATION_GATE.md`. Non-solver-dependent work may continue.
