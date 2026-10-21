# Contract governance and compatibility

## Separate version axes

1. **Core schema version** (`schemaVersion`, currently `0.5`): semantic data contract. Change only for a schema-level addition or semantic migration. Breaking changes require migration notes and a new supported version.
2. **Repository release** (Git tag / immutable commit SHA): delivery of documentation, code, tests, and schemas without necessarily changing `schemaVersion`.
3. **Capability version**: independent version for reusable implementations such as surface-to-member transfer.

## Source of truth

`CORE_CONTRACT.md` defines engineering semantics; `releases/compatibility-manifest.json` declares integration readiness. A manifest entry is not proof of deployment. Consumer applications must verify their actual deployed package/API version and pass contract tests.

## Change process

1. Propose change on a branch with PR; document type (bugfix, capability, additive schema, breaking schema), impact, migration needs.
2. Validate manifest and run tests in CI; obtain engineering review for pressure basis, units, coordinate directions, load equilibrium, and provenance.
3. Merge only after approval, then tag an immutable release and publish release notes.
4. Consumers pin an approved tag/SHA or versioned API; test compatibility in their own CI before deploying.
5. Update a consumer's declared status only after evidence from that consumer's tests/deployment. Never claim automatic rollout.
6. GPTs/plugins read the approved pinned Core revision through authorized GitHub tools at task start. Their instructions, skills, permissions, and executable integrations must be updated separately if required.

## Readiness

`experimental` is not production-ready. `not-integrated` means no verified live integration exists. Production status requires a real end-to-end test from the 3D model through the transfer implementation and solver, including conservation and direction checks.

## Migration

When Core schema changes, keep old schemas addressable; document field mappings, compatibility windows, and consumer upgrade plans. Never reinterpret old values silently.
