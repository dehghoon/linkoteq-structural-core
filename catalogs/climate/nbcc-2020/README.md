# Canadian source-attributed climatic references

Six original JSON files copied from the pinned Snow-Calculator revision in `provenance.json`. Lowercase `ss` and `sr`, numerical values, spelling, Unicode and original formatting are preserved. Units and NBCC 2020 Appendix C Table C-2 attribution come from the source application's code, not independent official-table verification.

678 source entries cover all 13 provinces/territories; this does not imply exhaustive geographic coverage. Use exact province/location keys or the JSON Pointers in `catalogs/locations/canadian-location-index.json`. IDs retain the exact source names through percent encoding. No geographic coordinates or interpolated values are supplied. Do not use this Canadian dataset for ASCE/IBC calculations. Local amendments and project applicability require separate review.

## Hourly wind reference pressures

[Wind pressure pilot](wind-pressure-first-printing.json) records the 1-in-10-year and 1-in-50-year hourly wind pressures in kPa for four exact location IDs. Its source is NBC 2020 Appendix C, Table C-2, first printing. Select the exact location and verify the adopted printing and amendments for the project. Coverage is limited to the listed station names.
