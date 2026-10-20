# GPT-2 Knowledge — Engineering Implementation
Baseline reviewed against active Core schema: **v0.5**. Re-read the active contract before implementation; this baseline does not freeze the platform version.

Mandatory sources: `CORE_CONTRACT.md`, `typescript/index.ts`, `AI_GPT_UPDATE_POLICY.md`, repository `README.md`, `knowledge/PLATFORM_ARCHITECTURE.md`, `LINKOTEQ_PLUGIN_MIGRATION_CONTRACT.md`, and the GPT-2 manuals listed in `knowledge/gpt2/README.md`. For analysis work read `adapters/pynite/MAPPING.md`. Use the approved task-specific Engineering Calculation Specification produced by GPT-1; GPT-1 guidance does not replace GPT-2 implementation knowledge.

Rules:
- Preserve engineering assumptions.
- Separate equations from Core mapping.
- Keep standalone behavior where required.
- Validate Core version and stable IDs.
- Make units explicit.
- Load calculators write canonical load records.
- Design calculators write canonical design records.
- Preserve provenance, warnings, code refs and trace.
- Do not leak solver/library-native structures into platform contracts.
- Do not duplicate Core-owned facts.
- Migrate mappings/tests before changing verified calculation logic.

Coordinate rules retained from Core v0.4 and applicable to v0.5:
- Geometry global.
- External loads global unless explicitly member-local.
- Internal member forces are member-local.
- Respect local-axis/right-hand sign convention.
- Accept arbitrary station counts.
- `x` is from member start along local +x; `xRatio` optional.

## Core v0.5 integration requirements

These additions govern integration, validation and tests. They do not authorize any change to approved formulas, engineering assumptions, numerical tolerances or calculation order.

- Validate against the actual canonical types in `typescript/index.ts`; changing a version label is not a migration.
- Use `CalculatorEnvelope` and `CalculatorWriteback` at integration boundaries, preserving schema version, project/run/target IDs, source references and traceability. Keep private calculation inputs inside the engine boundary.
- Use typed `Material.analysis` properties (`E`, `G`, `nu`, `rho`, optional `fy`) and `Section.analysis` properties (`A`, `Iy`, `Iz`, `J`). Preserve required member material/section references and the canonical material type `wood`. Do not infer missing material properties or reinterpret section axes.
- Map restraints, springs, imposed displacements and member end releases using `DX`, `DY`, `DZ`, `RX`, `RY`, `RZ`. Keep global support DOFs separate from local release DOFs. Legacy `ux/uy/uz/rx/ry/rz` fields require an explicit, validated compatibility mapping.
- Use explicit nodal, member-point, member-distributed, surface-pressure, self-weight, level and diaphragm load records. Legacy generic loads require an explicit mapping; do not silently assume directions, dimensions, units or missing positions.
- Nodal loads are global. Member loads must have consistent declared axes and direction names. Internal member results remain member-local with `member-local-right-hand-v1`; preserve arbitrary stations and envelopes.
- Preserve stable load-case IDs, combination factors keyed by those IDs, tags, code references and provenance. Never infer load category from a display name.
- Preserve selected analysis mode: `linear-static`, `elastic-iterative` or `p-delta`. Validate compatibility with tension-only/compression-only behavior. Do not silently switch methods.
- Keep solver-native types behind the analysis adapter. Follow `adapters/pynite/MAPPING.md`, including dimensional unit conversion, explicit case-ID mapping, local-axis verification and unsupported/lossy mapping reporting. Do not silently discard unsupported engineering behavior.
- Add contract tests for current types, stable IDs, references, units, axes, loads, writeback, provenance and applicable support/release/analysis behavior. Keep all original formula, boundary, invalid-input, regression and benchmark tests with recorded approved tolerances.
- Where standalone and integrated modes are required, both must use the same verified engineering engine. Migrate integration mappings, validation, tests and documentation first.

## Source access and migration safeguards

Use the existing Gateway only through actually available, verified interfaces. Do not invent tools, routes or authentication. The Custom GPT must not claim direct MCP support or authenticated access before a successful test in that environment.

Before engineering work, retrieve the active shared contract and all GPT-2 manuals listed in `knowledge/gpt2/README.md` through Gateway. If the required interface or path is unavailable, identify the exact blocked source and pause dependent implementation; user-supplied snapshots may support an explicitly labelled offline review, never a claim of live synchronization.

GitHub wins for cross-product contracts; approved engineering standards and specifications govern formula logic. Resolve conflicts explicitly. Do not use GPT-1 manuals as substitutes for the GPT-2 manuals.

For each GitHub write follow `LINKOTEQ_PLUGIN_MIGRATION_CONTRACT.md`: prepare a complete Proposal, validate scope, display the exact Diff, require explicit browser approval, then commit only the approved content through Gateway. A chat request or draft URL is not approval or authentication. Verify the returned Commit SHA. Never embed tokens or bypass the review flow.
