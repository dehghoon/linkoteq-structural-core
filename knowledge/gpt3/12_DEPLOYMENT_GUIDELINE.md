# Deployment Guideline

## Purpose

Ensure every LinkoTech engineering application can be tested on Vercel today and migrated later to another host or custom domain without architectural rewrite.

## Core Rule

Do not create platform lock-in.

The application must not depend exclusively on Vercel-specific behavior unless explicitly approved and documented.

## Preferred Deployment Architecture

```text
Frontend
  React / Next.js

API
  FastAPI

Engineering Engine
  Validated Python package

Data
  CISC dataset and application database

Reports
  PDF generation service and optional object storage
```

Frontend and API should remain independently deployable.

## Current Vercel Use

Vercel may be used for:

- frontend preview;
- branch deployments;
- production frontend;
- temporary testing.

Do not assume the FastAPI service must run inside Vercel.

If FastAPI is deployed separately, configure the frontend using environment variables.

## Future Hosting

Support future deployment to:

- VPS;
- Docker host;
- managed container service;
- dedicated server;
- cloud platform;
- custom domain.

## Environment Variables

Use environment-based configuration.

Example:

```text
NEXT_PUBLIC_API_BASE_URL=
APP_BASE_URL=
API_ALLOWED_ORIGINS=
DATABASE_URL=
REPORT_STORAGE_URL=
AUTH_PROVIDER=
BILLING_PROVIDER=
JWT_SECRET=
LOG_LEVEL=
```

Provide `.env.example`.

Never commit real secrets.

## Build and Start Commands

Document exact commands.

Example frontend:

```bash
npm ci
npm run build
npm run start
```

Example API:

```bash
pip install -r requirements.txt
uvicorn app.main:app --host 0.0.0.0 --port 8000
```

Use the repository’s actual package manager and structure.

## Containers

When appropriate, provide:

- frontend Dockerfile;
- API Dockerfile;
- `.dockerignore`;
- `docker-compose.yml` for local/testing;
- health checks;
- non-root runtime user;
- explicit ports;
- environment configuration.

## Domains

Do not hard-code:

- Vercel preview URLs;
- localhost URLs;
- personal repository URLs;
- temporary deployment domains.

Use configurable public URLs.

## CORS

Configure allowed origins through environment variables.

Do not use unrestricted production CORS unless explicitly approved.

## Static Assets

Serve assets through portable project paths or approved storage.

Avoid deployment-specific paths.

## Report Generation

Document whether reports are:

- streamed directly;
- temporarily stored;
- stored in object storage.

Define:

- retention;
- cleanup;
- privacy;
- signed access;
- authorization;
- filename behavior.

## Database and Migrations

When a database is introduced:

- use explicit migrations;
- document migration commands;
- test upgrades;
- avoid destructive automatic migrations;
- back up before production migration.

## Health and Observability

Provide:

- `/health`;
- `/version`;
- structured logs;
- correlation IDs;
- error tracking integration point;
- no sensitive engineering input logging by default.

## CI/CD

Recommended checks:

```text
lint
type-check
unit tests
contract tests
integration tests
frontend build
API startup
Docker build
```

A deployment should not proceed after failed required checks.

## Deployment Documentation

Provide:

- `DEPLOYMENT.md`;
- environment variable list;
- build commands;
- start commands;
- frontend/API relationship;
- domain setup;
- rollback procedure;
- known provider-specific differences.

## Migration from Vercel

A future move from Vercel should require:

1. build frontend on new host;
2. configure API URL;
3. configure environment variables;
4. configure DNS;
5. verify CORS;
6. verify authentication callback URLs;
7. verify report storage;
8. run smoke tests.

It should not require rewriting business logic.

## Rollback

Document how to:

- redeploy the previous frontend version;
- redeploy the previous API image;
- restore the prior database version;
- restore the prior CISC dataset;
- disable report generation if needed.

## Final Portability Check

Before delivery, confirm:

- no hard-coded preview URLs;
- no committed secrets;
- frontend and API can be configured independently;
- build commands are documented;
- production build succeeds;
- migration path is documented.

## Core v0.5 migration addendum

- Use current GitHub Core v0.5 contracts, not uploaded v0.4 snapshots; direct GitHub Connector only, no Gateway.
- GPT-2 owns calculation and PyNite adapter logic; GPT-3 consumes verified canonical inputs/results; GPT-4 owns architecture and production acceptance.
- Preserve standalone behavior, canonical IDs, units, coordinate conventions, typed materials/sections, support DOFs, explicit load primitives, load combinations, and provenance where relevant.
- Solver-dependent production release is blocked until the GPT-2 evidence is accepted by GPT-4 under `orchestration/PYNITE_ADAPTER_VERIFICATION_GATE.md`. Non-solver-dependent work may continue.
