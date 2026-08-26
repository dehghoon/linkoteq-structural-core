# Linkoteq Core v0.5 ↔ PyNite Mapping

This document defines the reference mapping for the first Linkoteq structural analysis adapter. Core remains solver-independent; this adapter translates Core v0.5 records to PyNite and returns canonical results.

## Mapping table

| Core | PyNite | Rule |
|---|---|---|
| Node.position | `FEModel3D.add_node(name, X, Y, Z)` | Use stable Core node ID as deterministic solver name or retain explicit ID map. |
| Material.analysis | `add_material(name, E, G, nu, rho, fy)` | Convert UnitValue fields into one solver-consistent unit system first. |
| Section.analysis | `add_section(name, A, Iy, Iz, J)` | `A/Iy/Iz/J` are canonical. Optional `Zy/Zz` can map to steel-section functionality where required. |
| Member | `add_member(name, i_node, j_node, material_name, section_name, rotation, tension_only, comp_only)` | Preserve physical-member ID and local-axis mapping. |
| Member releases | `def_releases(...)` | Map six local DOFs independently at i and j ends. |
| Support | `def_support(...)` | Map global DX/DY/DZ/RX/RY/RZ. |
| SupportSpring | `def_support_spring(...)` | two-way → `None`; tension-only/compression-only map to PyNite direction convention after adapter verification tests. |
| EnforcedNodeDisplacement | `def_node_disp(...)` | Convert magnitude units and DOF. |
| NodalLoad | `add_node_load(...)` | Expand nonzero global components into individual PyNite calls. |
| MemberPointLoad | `add_member_pt_load(...)` | Core global directions use uppercase; local directions use lowercase PyNite convention. |
| MemberDistributedLoad | `add_member_dist_load(...)` | Map w1,w2,x1,x2 exactly after unit conversion. |
| SurfacePressureLoad | plate/quad surface pressure APIs | Adapter resolves Core surface to generated solver elements. |
| SelfWeightLoad | `add_member_self_weight(...)` or generated loads | Preserve source/case provenance. |
| LoadCombination | `add_load_combo(name, factors, combo_tags)` | Convert Core load-case IDs to solver case names. |
| AnalysisRequest linear-static | `analyze_linear(...)` | Adapter settings may control logging/stability/statics/sparse. |
| AnalysisRequest elastic-iterative | `analyze(...)` | Used for tension/compression-only behavior and iterative elastic solution. |
| AnalysisRequest p-delta | `analyze_PDelta(...)` | Geometric nonlinear P-Delta analysis. |
| NodeAnalysisResult | node displacement/reaction dictionaries | Return global canonical vectors and explicit units. |
| MemberAnalysisResult | member axial/shear/moment/torque/deflection methods | Return local canonical components at requested/adopted stations. |

## Load-case identity

PyNite uses case-name strings on loads. Core uses stable IDs plus names/categories. The adapter MUST build an explicit map:

```text
coreLoadCaseId -> pyniteCaseName
pyniteCaseName -> coreLoadCaseId
```

Never infer engineering category from a case-name abbreviation during result writeback.

## Direction mapping

Core nodal loads are global only.

Member load mapping follows PyNite's case convention:

- Core global: `FX FY FZ MX MY MZ`
- Core member-local: `Fx Fy Fz Mx My Mz`

The adapter MUST reject a direction/coordinate-system mismatch rather than silently changing axes.

## Local member axes

Core local +x is start → end. The adapter must preserve or record the exact PyNite local y/z orientation used. Returned member forces are transformed/verified against `member-local-right-hand-v1` before canonical writeback.

## Stations

Core does not prescribe station count. If `AnalysisRequest.requestedStations` is supplied, sample those normalized or documented positions. If absent, the application may request start/mid/end or the adapter may return a denser solver result set. The adopted station set must be explicit in the result.

## Unit conversion

PyNite does not impose a universal unit system. The adapter MUST choose a coherent solver unit set for each run, convert all inputs consistently, and return results using the canonical result units. No mixed dimensional system may be passed to PyNite.

## Unsupported mappings

The adapter MUST NOT silently discard unsupported Core behavior. It must emit a warning or error identifying:

- Core entity ID
- unsupported property/behavior
- whether mapping is lossy
- whether analysis can safely continue

## Validation gates

Before solving, validate:

1. all member node/material/section references exist;
2. material E/G/rho units are dimensionally valid;
3. section A/I/J dimensions are valid;
4. member length is nonzero;
5. load target and load-case references exist;
6. member-local loads target a member;
7. load positions are inside member bounds;
8. combination factors reference existing cases;
9. support/release DOFs are valid;
10. the selected analysis mode is compatible with tension/compression-only behavior.

## Result verification

Adapter tests should include at minimum:

- simply supported beam with point load;
- simply supported beam with uniform and trapezoidal distributed load;
- 3D frame with global nodal load;
- member-local load on a rotated member;
- torsion;
- end releases;
- support spring;
- enforced displacement;
- tension-only/compression-only case;
- P-Delta frame;
- load-combination tags/envelopes;
- plate/quad surface pressure when surface analysis is enabled.
