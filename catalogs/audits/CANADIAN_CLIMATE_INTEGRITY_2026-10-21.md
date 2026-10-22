# Canadian climate/location referential integrity — verified

## Scope
Read-only validation of the six existing `catalogs/climate/nbcc-2020/climatic_*.json` files against `catalogs/locations/canadian-location-index.json` on GitHub `main`, performed 2026-10-21.

## Executed checks
- Parsed all six climate JSON datasets and the Canadian location index.
- Compared declared `recordCount` to the actual index record count.
- Checked uniqueness of each location ID.
- Checked uniqueness of each `climateRef.path` + `climateRef.jsonPointer` pair.
- Resolved each index JSON Pointer to an existing climate record.
- Enumerated all climate source province/location pairs and verified each appears in the index.

## Results
| Check | Result |
|---|---:|
| Declared index records | 678 |
| Actual index records | 678 |
| Unique IDs | 678 |
| Unique source pointers | 678 |
| Source climate records | 678 |
| Unresolved pointers | 0 |
| Source records missing from index | 0 |
| Duplicate IDs or pointers | 0 |

### Locations by province/territory
| Jurisdiction | Records |
|---|---:|
| Alberta | 55 |
| British Columbia | 108 |
| Manitoba | 24 |
| New Brunswick | 18 |
| Newfoundland and Labrador | 18 |
| Northwest Territories | 17 |
| Nova Scotia | 25 |
| Nunavut | 16 |
| Ontario | 229 |
| Prince Edward Island | 4 |
| Quebec | 124 |
| Saskatchewan | 31 |
| Yukon | 9 |

## Boundary of verification
**PASS: referential integrity and coverage against existing repository datasets.**
**NOT VERIFIED:** climate numbers against official NBCC source tables, engineering interpretation, jurisdictional adoption, licence, units, or applicability to a particular project. No climate data or existing records were modified.
