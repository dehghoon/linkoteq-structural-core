# One-way rectangular surface-to-member transfer (experimental)

Pure-Python prototype under `surface_transfer/one_way.py`; **not** integrated with
PyNite, 3D Model or production calculators. Core schema remains v0.5.

## Assumptions / required upstream geometry validation
- Horizontal, rectangular roof with dimensions `span_m` perpendicular to two
  parallel full-length supported edge members and `member_length_m` along them.
- No openings, overhangs, eccentric supports, or other supporting members.
- Uniform signed pressure in kN/m² **per horizontal projected area**. Positive
  input means downward gravity loading; negative means uplift.
- Global +Z upward. Output `FZ` line loads are negative for downward load.
- All IDs identify existing canonical surface, load case, load and members;
  caller must verify geometry and references before using results.
- Equal tributary widths `span_m/2` each. Output `w1=w2=-p*span_m/2`
  in kN/m, over `x1=0` to `x2=member_length_m`.
- Total signed FZ force equals `-p*span_m*member_length_m` within tolerance.

No claim of a complete canonical serializer: the returned dataclass is a
minimal, explicit transfer result for an eventual v0.5 integration adapter.
No sloped roofs, surface-normal pressures, arbitrary polygons, two-way load
distribution, load combinations or plate/quad solving. Reject these cases
rather than silently approximate.

Run: `python -m unittest discover -s tests -p 'test_surface_transfer.py'`
