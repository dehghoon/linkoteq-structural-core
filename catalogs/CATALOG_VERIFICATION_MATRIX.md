# Catalogue verification matrix — Canada first

This is a Linkoteq-authored checklist for future record-level validation. It is not a manufacturer catalogue, a design table, or a certification of any existing record.

| Catalogue family | Minimum identity | Essential technical checks | Canada applicability | US applicability | Release gate |
|---|---|---|---|---|---|
| Steel hot-rolled sections | designation, edition, publisher | A, Iy, Iz, J, orientation, units | CISC/CSA design edition explicitly identified | AISC edition separately identified | engineering-reviewed |
| Steel material grades | specification, grade, edition | E, G, nu, rho, fy and unit consistency | CSA material standard/version | ASTM material standard/version | engineering-reviewed |
| Cold-formed sections | exact profile, gauge, grade | effective vs gross properties, bending axis, holes | CSA S136 basis | AISI basis | engineering-reviewed |
| Wood lumber | species/group, grade, moisture/service class | E, density, characteristic strength, duration factors | CSA O86 and grading basis | NDS and grading basis | engineering-reviewed |
| Engineered wood | manufacturer, series, size, revision | product-specific properties, load duration, limitations | manufacturer-approved Canadian use | separately approved US use | licensed + engineering-reviewed |
| Anchors/connectors | model, variant, substrate, fasteners | load direction, edge distance, spacing, embedment, failure modes | applicable Canadian approvals | applicable US approvals | licensed + engineering-reviewed |
| Strut channels/fittings | brand, exact channel/fitting variant, finish | geometry, steel grade, support/span and load-table assumptions | Canada-specific structural design check | US design basis check | licensed + engineering-reviewed |
| Joists/deck | product/series, span, gauge, revision | span, deflection, load case, bracing, bearing | Canadian codes and approvals | US codes and approvals | licensed + engineering-reviewed |
| Climate locations | stable geolocation key, edition | units, duplicates, jurisdiction, source year | NBCC edition and province | separate US climate/code source | source-verified |
| Performance tables | table ID, product variant, source revision | interpolation rule, design method, units, limit states | Canadian design basis | US design basis | engineering-reviewed |

## Automated checks permitted before engineering review
- Unique stable IDs; required provenance fields; ISO date formats where dates are supplied.
- Strict numerical units, dimensional consistency and finite positive values for applicable geometric properties.
- Explicit country and code edition; no cross-jurisdiction fallback.
- Explicit `unknown` for missing rights or review; never infer `approved`.
- Conflict report rather than overwriting an existing engineering value.
- Missing evidence produces `reference-only` or `discovered` status, never design approval.

## Coverage reporting
Coverage should be computed only after a complete recursive inventory. Report separate counts for discovered, reference-only, geometry-verified, engineering-reviewed, approved-for-scope, superseded and withdrawn; do not combine reference counts with approved-for-design counts. Record file paths, batch date, source revisions and duplicate findings.
