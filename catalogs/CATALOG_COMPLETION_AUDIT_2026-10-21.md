# Catalog completion audit — 2026-10-21

Scope: Canada and United States. Audit of repository `main` at `ede4c22b1fd6a09215dc5a77cd9dc0ebf24fb994`. This document records repository coverage, not independent verification of manufacturer claims.

## Existing

- `catalogs/products/`: manufacturer metadata and discovery-only pilot product records for Hilti, Simpson Strong-Tie, Atkore/Unistrut and Canam. These are not complete product catalogs.
- `catalogs/sources/`: four discovery-only source references, not downloaded or hashed technical documents.
- `catalogs/schemas/`: catalog foundation and draft family-specific product schemas.
- `catalogs/sections/steel/cisc/sst13-2026-08-25/`: 28 encoded XZ parts and a manifest for the 1,705-record/17-family CISC SST13 source dataset. Files were previously checked for blob identity against `dehghoon/steel-verification`; this audit does not validate decompressed engineering records.

## Missing or incomplete

1. `catalogs/materials/`: no material reference dataset yet. Candidate source: `dehghoon/3D-Model/lib/material-reference-library-v05.ts` (22 reference templates, not independently verified design properties).
2. `catalogs/climate/`: no climatic data yet. Candidate source: six `backend/app/climatic_*.json` files in `dehghoon/Snow-Calculator` (678 Canadian place entries across 13 provinces/territories, as counted from source JSON).
3. `catalogs/locations/`: no location index yet. The source climate JSON has place names but no verified latitude/longitude.
4. `catalogs/sections/`: CISC SST13 exists; US AISC and other families not yet cataloged.
5. `catalogs/systems/`, `catalogs/performance/`: no populated records yet; source-backed compatibility, code edition, installation conditions, and verified capacity tables must not be invented.
6. Manufacturer catalogs: existing four product records are discovery seeds only; official manufacturer technical sources must be acquired and checked before adding dimensional/capacity/approval values.

## Next safe batches

1. Import the 22 material reference templates, preserving source IDs, jurisdiction, standard names, and provenance; explicitly label them as references rather than validated engineering properties.
2. Copy the six Canadian climate JSON files without numeric modification; generate a deterministic province/location index with no invented coordinates.
3. Research official manufacturer technical documentation and add sourced product variants in small batches, with explicit Canada/US applicability.
4. Expand US section and climate coverage only from attributable, publicly reusable primary data; keep inaccessible or copyrighted tables as external references.

## Data governance

- Existing product seeds and CISC dataset are preserved.
- Never infer approval, compatibility, allowable loads, or design capacities from discovery records.
- Maintain separate provenance and jurisdiction for Canada and the United States.
- Commit additions in small reviewable batches; verify actual GitHub HEAD and file paths after each commit.
