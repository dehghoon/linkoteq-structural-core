# Canadian source-attributed climatic references

Six original JSON files copied from the pinned Snow-Calculator revision in `provenance.json`. Lowercase `ss` and `sr`, numerical values, spelling, Unicode and original formatting are preserved. Units and NBCC 2020 Appendix C Table C-2 attribution come from the source application's code, not independent official-table verification.

678 source entries cover all 13 provinces/territories; this does not imply exhaustive geographic coverage. Use exact province/location keys or the JSON Pointers in `catalogs/locations/canadian-location-index.json`. IDs retain the exact source names through percent encoding. No geographic coordinates or interpolated values are supplied. Do not use this Canadian dataset for ASCE/IBC calculations. Local amendments and project applicability require separate review.

## Hourly wind reference pressures

[NBC 2020 Table C-2 wind catalog](wind-pressure-second-printing.json) contains all 680 named station rows from the NRC second printing (March 2025 revisions and errata). The two values per station are hourly reference pressures for 1-in-10 and 1-in-50 years in kPa. They are reference inputs for a wind calculation.

The wind catalog covers all 678 IDs in the climate location index, plus Windsor, Ontario and Windsor, Quebec. Windsor IDs are separate and carry their source province. This wind coverage does not provide snow values for either Windsor. Choose the exact station and verify the printing and local amendments adopted for the project.

The [first-printing pilot](wind-pressure-first-printing.json) is retained for reference.
