# Engineering catalogue acceptance and validation policy

Status: Linkoteq-authored normative guidance (not a manufacturer data feed)
Scope: Canada first; United States second.
Last reviewed: 2026-10-21

## Purpose
This policy defines the minimum evidence and validation gates for admitting a material, section, connector, fastening system, or product family to the Linkoteq structural catalogue. It supplements CORE_CONTRACT.md and does not replace its canonical definitions.

## Record lifecycle
- `discovered`: product/family or reference identified; no design-use claim.
- `reference-only`: traceable official documentation identified, but design values have not been independently verified against the stated jurisdiction and edition.
- `geometry-verified`: geometry, designation, units and section axes reviewed; not design-approved.
- `engineering-reviewed`: governing source, edition, design method, load duration, applicable limits and engineering quantities reviewed by a qualified reviewer.
- `approved-for-scope`: reviewed for the explicitly named jurisdiction, code edition, material/product variant and intended application; not a blanket approval for all projects.
- `superseded` / `withdrawn`: retained for provenance, excluded from new design selections.

No automated promotion to `engineering-reviewed` or `approved-for-scope` based solely on a webpage, AI extraction, PDF parse, CAD file, distributor listing or numerical plausibility check.

## Minimum traceability fields
Every reference record SHOULD carry: `record_id`, `family`, `designation`, `manufacturer_or_publisher`, `source_url`, `source_title`, `source_revision_or_date`, `accessed_at`, `jurisdiction`, `code_edition`, `units`, `verification_status`, `reviewer`, `reviewed_at`, `licence_status`, `limitations`.

If any field is unknown, mark it explicitly `null` or `unknown` rather than inventing a value. `source_url` is a citation pointer, not a licence to reproduce the source.

## Acceptance gates
1. **Identity**: distinguish family, nominal size, exact variant, grade, coating, hole pattern and manufacturer; do not merge similarly named products.
2. **Rights**: check commercial use, caching, redistribution, derivative data and model-download rights before storing third-party material. Public availability does not imply permission.
3. **Provenance**: use an official, versioned primary source when possible; preserve revision and date. Distributor pages can help discovery but do not replace manufacturer verification.
4. **Dimensions**: check unit conversions, positive physical quantities, axis orientation and section property conventions against the canonical Core contract.
5. **Design basis**: explicitly distinguish ASD from LRFD/limit-states design; distinguish US AISI/AISC/NDS from Canadian CSA/NBCC workflows. Do not transpose resistance or allowable-load tables without an approved conversion/design method.
6. **Applicability**: identify load direction, span, bracing, fastener configuration, support condition, environmental conditions, connection details, safety factors and manufacturer notes.
7. **Review**: record reviewer identity, review date, original evidence and limitations before permitting numerical design use.
8. **Regression**: test identifiers, unit transformations, duplicate conflicts, and numerical invariants; any changed source edition requires re-review of affected records.

## Canadian and US scope separation
A product sold in Canada is not automatically approved for NBCC/CSA design. A US approval, seismic listing, electrical listing, or OPM preapproval does not itself establish structural resistance under a Canadian design standard. Record country-specific availability separately from code-specific structural applicability.

## Non-destructive conflict policy
If a new source disagrees with an existing engineering value, do not overwrite it automatically. Create a review finding recording both sources, revisions, units, calculation basis and affected records. Keep existing records unchanged until reviewed.

## No proprietary catalogue mirroring
Do not bulk-import manufacturer PDFs, BIM families, CAD libraries, product descriptions, load tables or scraped listings without a verified licence. Linkoteq-authored schemas, tests, provenance indexes and source pointers are permitted. No API credentials or private partner documents in GitHub.

## Example record — illustrative metadata only
```json
{
  "record_id": "example:channel-family:review-pending",
  "family": "cold-formed framing channel",
  "designation": "EXAMPLE-ONLY",
  "manufacturer_or_publisher": "unknown",
  "source_url": null,
  "source_title": null,
  "source_revision_or_date": null,
  "accessed_at": null,
  "jurisdiction": "CA",
  "code_edition": null,
  "units": "mm",
  "verification_status": "discovered",
  "reviewer": null,
  "reviewed_at": null,
  "licence_status": "unverified",
  "limitations": ["No geometry, material properties or design capacities provided", "Not for structural design"]
}
```

## Definition of done for a catalogue batch
- All new paths are additive and scoped to the catalogue.
- Each record has unique stable identity and traceable source metadata.
- No invented or unlicensed engineering values.
- Country, code edition, units, design method and review status are explicit.
- Conflicts are documented rather than silently overwritten.
- Reviewer sign-off is present before design-use status.
