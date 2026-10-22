# Verified repository catalogue inventory and reconciliation

Snapshot: `f1b0b51d0e9022a9dfafe721b932f2a384f89735` on `main` (before this audit's new files).
Method: GitHub REST Git Tree `/git/trees/main?recursive=1`; `truncated=false`. Machine-readable path/blob manifest: `catalogs/audits/repository-file-inventory-2026-10-21.json`.

## File coverage (files, not engineering records)
Total repository: **220 files**; under `catalogs/`: **172 files**.

| Catalogue area | File count |
|---|---:|
| products | 71 |
| sections | 30 |
| sources | 24 |
| schemas | 12 |
| climate | 9 |
| providers | 7 |
| materials | 3 |
| systems | 3 |
| compatibility | 3 |
| locations | 2 |
| performance | 1 |
| catalogue root documentation | 7 |

48 files are outside `catalogs/`. File counts are not record counts and do not establish data correctness.

## Existing data confirmed
- CISC SST13 `catalogs/sections/steel/cisc/sst13-2026-08-25/manifest.json` declares **1,705 section records across 17 families**, stored as split encoded XZ parts. The manifest was inspected; no decompression or independent validation of those 1,705 records was performed in this audit.
- `catalogs/materials/references/material-templates-v05.json` declares **22 reference templates**, explicitly not analysis-ready material objects; numerical engineering properties are not supplied.
- Canadian climate includes six `climatic_*.json` files, an NBCC-2020 provenance file and a Canadian location index. Earlier progress documentation reports **678 indexed locations**; this audit has not recounted the 202 KB index.
- Manufacturer and product references already exist under `catalogs/products/manufacturers/`, `catalogs/products/references/`, and `catalogs/sources/`. No manufacturer design capacity is newly validated here.
- `catalogs/performance/atkore/p1000-table-reference.json` and Canam compatibility/system records exist, but are not grounds for assuming approved numerical design use.
- US sections currently have an AISC source reference; US climate and geographic source indexes exist. This is not evidence of imported US section/climate numerical datasets.

## Correction to preliminary path audit
`catalogs/CATALOG_COVERAGE_AUDIT_2026-10-21.md` checked certain *exact* missing paths such as `catalogs/materials/index.json`. These missing index paths must NOT be interpreted as missing material or climate catalogues. Recursive tree inspection confirms substantial pre-existing data and source records in other paths. Avoid duplicating those migrations.

## Record-level completion backlog
1. Validate all six Canadian climatic datasets and location-index referential integrity against existing provenance; do not change values.
2. Validate CISC encoded parts against manifest and original source when tooling/source rights permit; record actual checksum and record-count results.
3. Audit all 22 material templates for missing standard edition, E/G/nu/rho/fy, and analysis-readiness; never fill absent numerical properties by inference.
4. Validate product identity/variant/source foreign keys and detect duplicate identifiers without overwriting conflicts.
5. Distinguish US source-reference coverage from actual US section and hazard-value datasets; import only where rights permit.
6. Keep manufacturer numerical capacities, installation conditions, Canadian approvals and cross-product compatibility blocked until independently sourced and reviewed.

## Verification limitations
Git tree completeness is confirmed for the stated snapshot. Engineering correctness, schema compliance, legal redistribution rights and numerical record counts beyond inspected manifests are NOT confirmed by this inventory.
