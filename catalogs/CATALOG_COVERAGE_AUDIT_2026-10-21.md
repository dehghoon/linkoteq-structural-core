# Catalogue coverage and gap audit — 2026-10-21

**Scope:** Canada first, United States second. **Status:** preliminary, path-level audit only; NOT a complete inventory of repository records.

## Verified existing documentation
- `CORE_CONTRACT.md`: canonical materials and sections, units, provenance and solver boundaries.
- `catalogs/README.md`: materials, sections, products, systems, performance, climate and locations catalogue architecture.
- `catalogs/providers/README.md`: integration discovery and licence restrictions.
- `catalogs/ENGINEERING_CATALOG_ACCEPTANCE_POLICY.md`: engineering record admission and review gates.
- `catalogs/providers/atkore-unistrut.json`: manufacturer integration discovery metadata, not licensed product data.

## Path checks performed
The following *exact paths* returned NOT_FOUND when queried on `main`: `catalogs/materials/README.md`, `catalogs/sections/README.md`, `catalogs/materials/index.json`, `catalogs/sections/index.json`, `catalogs/products/index.json`, `catalogs/performance/README.md`, `catalogs/climate/README.md`.

**Interpretation:** missing paths are documentation/index gaps at those locations only. This audit does NOT establish that material, section, climate, or product data are absent elsewhere. GitHub code search returned no indexed results for several broad keywords and is not an authoritative directory listing.

## Prioritized safe completion backlog
| Priority | Family | Canada-first validation | US follow-up | Current finding | Safe next step |
|---|---|---|---|---|---|
| P0 | Structural steel sections | CISC edition, designation, units, A/I/J and axes | AISC edition | Full record-level coverage unverified | Inventory existing paths; compare edition and section IDs |
| P0 | Structural materials | CSA grades, material properties, source revisions | ASTM/AISC | Full record-level coverage unverified | Identify source and unit gaps without inventing values |
| P0 | Climate and locations | NBCC jurisdiction, edition, provenance, location key | ASCE/US climate sources | Full record-level coverage unverified | Check location count, duplicates and edition tagging |
| P1 | Cold-formed steel | CSA S136, material grade, section properties | AISI | Full record-level coverage unverified | Audit source editions and design-basis separation |
| P1 | Wood/engineered wood | CSA O86, grade/product and jurisdiction | NDS | Licensed product feed not verified | Keep product-specific capacity records pending permission |
| P1 | Connections and anchors | Canadian approvals, code editions, loading conditions | US approvals | API access deferred | Add only original metadata and source pointers |
| P1 | Unistrut channels and fittings | Variant, finish, exact source, Canadian code applicability | AISI/US approvals | Official CAD/BIM and distributor documents located; reuse rights unverified | Do not mirror geometry, load tables or BIM without licence |
| P2 | Joists, decking, assemblies | Manufacturer, CSA/NBCC scope and assembly constraints | US scope | Full record-level coverage unverified | Build non-proprietary reference checklist |
| P2 | Performance and load tables | Design method, edition, direction, units, limitations | US-specific basis | Full record-level coverage unverified | Gate all design-use records behind engineering review |

## Rules for follow-on work
1. First obtain a trustworthy recursive file inventory (Git tree or local checkout) before asserting missing records or coverage percentages.
2. Preserve existing numerical engineering records; conflicts go to review, never silent overwrite.
3. Add only Linkoteq-authored schemas, indexes, provenance/validation tests, and permitted reference records.
4. Do not import third-party manufacturer catalogues, load tables, PDFs, BIM or CAD assets without rights.
5. Do not label any reference as approved for structural design until jurisdiction/code, edition, units, conditions and reviewer are recorded.

## Audit limitations
This file is a reproducible *partial audit* of verified files and exact-path lookups. It is not a claim of catalogue completeness, missing entire categories, or numerical engineering verification.
