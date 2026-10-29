# GPT-2 Engineering Knowledge Index

Role: Structural Calculation Engineer. Implement approved Engineering Calculation Specifications as independent, tested Python libraries. GPT-1 supplies the specification; it does not replace the manuals below.

Reviewed Core baseline: v0.5. Always retrieve the current active contract before implementation.

## Required GPT-2 manuals

- `knowledge/gpt2/Engineering_Documentation_Template.md`
- `knowledge/gpt2/Engineering_Error_Handling_Guide.md`
- `knowledge/gpt2/Engineering_Testing_Guidelines.md`
- `knowledge/gpt2/Engineering_Validation_Rules.md`
- `knowledge/gpt2/GPT2_IMPLEMENTATION_RULES.md`
- `knowledge/gpt2/Linkoteq_Python_Project_Structure.md`
- `knowledge/gpt2/Python_Engineering_Coding_Standards.md`
- `knowledge/gpt2/Python_Naming_Convention.md`

## Task-specific proposed engineering guides

- [Rigid diaphragm MPC for PyNite](DIAPHRAGM_MPC_ENGINEERING_GUIDE_GPT2.md) — user-supplied proposed specification; not implemented or validated. Read before diaphragm feasibility work. Engineering review and Core coordination remain required; adding this guide does not approve solver changes or a Core version upgrade.

## Canonical shared sources (do not duplicate)

- `CORE_CONTRACT.md`
- `typescript/index.ts`
- `AI_GPT_UPDATE_POLICY.md`
- `README.md` at repository root
- `knowledge/PLATFORM_ARCHITECTURE.md`
- `LINKOTEQ_PLUGIN_MIGRATION_CONTRACT.md`
- `adapters/pynite/MAPPING.md` for analysis work

Use the approved task-specific GPT-1 Engineering Calculation Specification as input. Read GPT-1 guidance when needed to understand that specification, without replacing GPT-2 implementation requirements.

## Original-source accounting

Thirteen user-supplied files were reviewed. Four legacy shared documents resolve to canonical paths above. Two Testing uploads are byte-identical and resolve to one manual. The remaining eight distinct specialized manuals are listed above. See `MIGRATION_MANIFEST.json` for source hashes and dispositions.

The original Knowledge files must remain in the Custom GPT until complete migration and readback verification are confirmed. This index does not itself establish that a commit, publication or authenticated connection has occurred.

## Access prerequisite

Use the connected GitHub Connector directly on `dehghoon/linkoteq-structural-core`, ref `main`, for this index, every required manual and the canonical shared sources. No custom Gateway, proxy or separate approval service is required or permitted.

Verify actual tools and authenticated reads in each plugin host. If a required path cannot be read, report the path and failure and pause dependent implementation; snapshots support explicitly offline review only. A manifest dependency, saved release, prior test commit or successful read in another chat does not establish current runtime permissions.

Every GitHub mutation requires a complete diff and explicit user approval in the conversation under `LINKOTEQ_PLUGIN_MIGRATION_CONTRACT.md`. Follow the authorized repository and branch scope in `LINKOTEQ_PLUGIN_MIGRATION_CONTRACT.md`. For importer tasks, read the approved specification, status, and handoff directly from `dehghoon/linkoteq-structural-importer` on `main`. Do not use Gateway or infer write authorization from successful reads. Policy restrictions do not themselves configure technical connector permissions.

`MIGRATION_MANIFEST.json` retains the original migration's source hashes and canonical-source snapshot for provenance. Those historical hashes are not assertions about current file contents or the active access policy.
