# CISC Data Guideline

## Purpose

Define how the LinkoTech Engineering Platform ingests, validates, stores, serves, and consumes CISC section data.

The approved CISC workbook is the authoritative source unless a newer approved source is explicitly provided.

## Core Rule

Do not hard-code section designations or section properties in React, FastAPI routes, tests, or visualization components.

Use the approved CISC workbook or a validated normalized dataset derived from it.

## Required Data Pipeline

```text
Approved CISC Workbook
        ↓
Versioned Ingestion Script
        ↓
Validation and Normalization
        ↓
Canonical Dataset
        ↓
FastAPI Section Service
        ↓
Typed Frontend Client
        ↓
Searchable Section Selector
```

## Workbook Intake

Before ingestion, inspect:

- workbook filename;
- workbook version;
- worksheet names;
- header rows;
- merged cells;
- units;
- hidden rows or sheets;
- duplicate records;
- missing values;
- unsupported section families;
- source notes and footnotes.

Do not assume column names.

Record the discovered workbook schema before transformation.

## Ingestion Requirements

The ingestion process must:

- read the approved workbook deterministically;
- normalize worksheet and column names;
- preserve source designation text;
- normalize numeric values;
- preserve units;
- validate required properties;
- reject duplicate designations;
- report missing values;
- report malformed numeric values;
- preserve source metadata;
- attach dataset version;
- generate a validation report;
- support repeatable regeneration;
- avoid manual editing of generated records.

## Canonical Record

Each section record should contain, where available:

```json
{
  "id": "cisc-w100x19",
  "designation": "W100X19",
  "family": "W",
  "source": "CISC",
  "dataset_version": "2026-01",
  "units": {
    "length": "mm",
    "area": "mm2",
    "inertia": "mm4",
    "warping": "mm6",
    "mass": "kg/m"
  },
  "properties": {
    "mass": 19.0,
    "depth": 106.0,
    "flange_width": 103.0,
    "web_thickness": 6.0,
    "flange_thickness": 8.8,
    "area": 2420.0,
    "ix": 4500000.0,
    "iy": 1600000.0,
    "rx": 43.1,
    "ry": 25.7,
    "j": 12300.0,
    "cw": 4500000000.0
  }
}
```

The actual fields must follow the approved workbook and engineering specifications.

## Supported Storage

The normalized dataset may be stored as:

- versioned JSON;
- SQLite;
- PostgreSQL;
- another approved database.

Choose the simplest solution that preserves integrity, search performance, and future reuse.

## FastAPI Responsibilities

FastAPI owns section retrieval.

Suggested endpoints:

```text
GET /api/v1/sections
GET /api/v1/sections/{designation}
GET /api/v1/section-datasets/current
GET /api/v1/section-datasets/{version}
```

Supported query parameters may include:

- `query`;
- `family`;
- `limit`;
- `offset`;
- `dataset_version`.

## Frontend Responsibilities

The frontend must:

- query section designations from the API;
- use a searchable dropdown;
- support large datasets efficiently;
- display loading and error states;
- populate approved section properties automatically;
- treat authoritative properties as read-only unless the specification allows overrides;
- update visualization when the selected section changes;
- show dataset version;
- detect stale or missing records;
- never silently substitute another section.

## Calculation Request

The calculation request should include:

- selected designation;
- dataset version;
- section record ID when available.

The API should verify that the requested record exists in the approved dataset.

## Visualization Mapping

Section family determines visualization type.

Examples:

- W and similar wide-flange sections;
- HSS / RHS / SHS box sections;
- PIPE / CHS circular sections;
- channels;
- angles.

The mapping logic must be centralized and reusable.

## Data Validation Tests

Required tests include:

- expected worksheets exist;
- required columns exist;
- units are recognized;
- duplicate designations are rejected;
- malformed values are reported;
- representative records match the workbook;
- deterministic regeneration;
- dataset version is present;
- API returns the correct record;
- frontend selection populates expected properties.

## Change Management

When the workbook changes:

1. preserve the previous normalized dataset;
2. generate a new version;
3. run validation tests;
4. compare record counts and changed values;
5. document breaking changes;
6. avoid silently replacing data used by historical reports.

## Reuse Rule

The normalized CISC dataset must be reusable by:

- current engineering tools;
- future beam and column tools;
- future AI model-generation services;
- future React Native applications;
- report generation;
- validation services.

## Core v0.5 migration addendum

- Use current GitHub Core v0.5 contracts, not uploaded v0.4 snapshots; direct GitHub Connector only, no Gateway.
- GPT-2 owns calculation and PyNite adapter logic; GPT-3 consumes verified canonical inputs/results; GPT-4 owns architecture and production acceptance.
- Preserve standalone behavior, canonical IDs, units, coordinate conventions, typed materials/sections, support DOFs, explicit load primitives, load combinations, and provenance where relevant.
- Solver-dependent production release is blocked until the GPT-2 evidence is accepted by GPT-4 under `orchestration/PYNITE_ADAPTER_VERIFICATION_GATE.md`. Non-solver-dependent work may continue.
