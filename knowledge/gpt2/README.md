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

The Gateway public read tool inspected on 2026-10-18 allows only three GPT-1 files. Core and GPT-2 reads are not yet supported by that discovered schema. Do not claim live GPT-2 loading until the required paths and authenticated access are tested. Direct GitHub reads used for this migration review are not Gateway authentication evidence.
