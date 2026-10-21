# Contract governance and compatibility

## Separate version axes

1. **Core schema version** (`schemaVersion`, currently `0.5`): semantic data contract. Change only for a schema-level addition or semantic migration. Breaking changes require migration notes and a new supported version.
2. **Repository release** (Git tag / immutable commit SHA): delivery of documentation, code, tests, and schemas without necessarily changing `schemaVersion`.
3. **Capability version**: independent version for reusable implementations such as surface-to-member transfer.

## Source of truth

`CORE_CONTRACT.md` defines engineering semantics; `releases/compatibility-manifest.json` declares integration readiness. A manifest entry is not proof of deployment. Consumer applications must verify their actual deployed package/API version and pass contract tests.

## Change process

1. Prepare a change proposal against main. Document the change
   type (bugfix, capability, additive schema, breaking schema),
   impact, and migration requirements.
2. For GitHub Connector writes, follow
   LINKOTEQ_PLUGIN_MIGRATION_CONTRACT.md:
   read the current main head, present the complete before/after
   diff, paths, base SHA, and commit message, and obtain explicit
   user approval before any mutation.
3. Revalidate main and source SHAs before writing. If anything
   changed, prepare a new proposal and obtain fresh approval.
   Commit only the approved changes directly to main without
   force-pushing or creating a branch.
4. Validate the compatibility manifest and run applicable tests.
   Obtain engineering review for affected calculations, units,
   coordinate directions, load equilibrium, and provenance.
   Record validation results and any remaining release blockers.
5. Tag an immutable release and publish release notes only
   after the applicable release requirements are satisfied.
6. Consumers pin an approved tag/SHA or versioned API; test compatibility in their own CI before deploying.
7. Update a consumer's declared status only after evidence from that consumer's tests/deployment. Never claim automatic rollout.
8. GPTs/plugins read the approved pinned Core revision through authorized GitHub tools at task start. Their instructions, skills, permissions, and executable integrations must be updated separately if required.

## Readiness

`experimental` is not production-ready. `not-integrated` means no verified live integration exists. Production status requires a real end-to-end test from the 3D model through the transfer implementation and solver, including conservation and direction checks.

## Migration

When Core schema changes, keep old schemas addressable; document field mappings, compatibility windows, and consumer upgrade plans. Never reinterpret old values silently.
