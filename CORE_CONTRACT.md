# Linkoteq Structural Core Contract v0.5

## Purpose

This repository is the canonical engineering language for Linkoteq. The 3D model, importers, load calculators, analysis adapters, solvers, design calculators, reports, viewers and AI/GPT workflows exchange structural information through this contract.

Core is solver-independent. PyNite is the reference analysis engine for the first analysis adapter, but PyNite classes are not the Core schema.

## Canonical pipeline

```text
2D / image / DXF / IFC / manual / AI
                |
                v
        Structural Model
                |
                v
 Snow / Wind / Seismic / Manual / Self Weight
                |
                v
          Canonical Loads
                |
                v
       PyNite Analysis Adapter
                |
                v
              PyNite
                |
                v
      Canonical Analysis Results
                |
                v
       Design Calculators
                |
                v
       Canonical Design Results
```

## Source-of-truth rule

Core defines the integration boundary. Application repositories may maintain private UI or implementation state, but must not redefine conflicting engineering entities. Materials, sections, coordinates, supports, loads, combinations and analysis results crossing repository boundaries MUST use the canonical definitions in this repository.

## Units

Every project declares a unit system. Engineering values whose dimensions are not unambiguous MUST carry explicit units at integration boundaries. Solver adapters are responsible for converting canonical values to a solver-consistent unit set and converting results back.

Core does not assume that a solver performs unit conversion.

## Coordinate systems

### Global geometry

Node coordinates and model geometry are expressed in the global model coordinate system.

### External loads

External loads are global by default. Nodal loads are canonical global loads. Member point and distributed loads may explicitly use `member-local` axes. Surface pressure is normal to the target surface unless an explicit global vector load representation is used.

### Member local axes

Member local +x runs from `startNodeId` to `endNodeId`. Local axes are right-handed. An explicit orientation/rotation may be stored. If absent, the analysis adapter MUST create a deterministic right-handed system and preserve the mapping used for returned results.

### Internal member forces

Canonical member internal forces are always member-local:

- `axial`
- `shearY`
- `shearZ`
- `torsion`
- `momentY`
- `momentZ`

The sign convention identifier is `member-local-right-hand-v1`.

## Materials

A canonical `Material` is not an arbitrary property bag. All structural materials share analysis properties required by frame/shell solvers:

- stable `id`
- `type`: steel, concrete, wood, or other
- `name`
- modulus of elasticity `E`
- shear modulus `G`
- Poisson ratio `nu`
- mass/weight density `rho`
- optional yield strength `fy`

Material-specific design properties belong in typed extensions (`steel`, `concrete`, `wood`) and may be expanded without changing the common analysis language. Design calculators may add code-specific properties, but they MUST preserve the canonical analysis properties and material identity.

PyNite reference mapping: `add_material(name, E, G, nu, rho, fy)`.

## Sections

A canonical `Section` separates identity/geometry from analysis properties and design extensions.

Required frame-analysis properties are:

- `A` cross-sectional area
- `Iy` second moment about local y
- `Iz` second moment about local z
- `J` torsional constant

Optional common properties include `Ay`, `Az`, `Sy`, `Sz`, `Zy`, `Zz`, `ry`, `rz`, and geometric dimensions. A section may identify a family/designation/library record. Material is referenced by members, not duplicated as a conflicting section property.

A W-section calculator may enrich a steel section with W-shape geometry and design properties, but MUST NOT rename or reinterpret canonical `A`, `Iy`, `Iz`, `J`, `Zy`, or `Zz`.

PyNite reference mapping: `add_section(name, A, Iy, Iz, J)`; steel nonlinear mapping may additionally use `Zy`, `Zz` and material reference.

## Nodes and degrees of freedom

Each structural node has global `x,y,z` coordinates and six structural degrees of freedom:

`DX, DY, DZ, RX, RY, RZ`.

Canonical supports restrain these DOFs individually. Core also supports per-DOF support springs and enforced nodal displacement/rotation so the model can represent settlements and elastic restraints without solver-private records.

## Members

A member references start node, end node, material and section. Optional analysis behavior includes:

- rotation about local x
- tension-only behavior
- compression-only behavior
- independent i-end and j-end releases for all six local DOFs
- explicit local-axis orientation

Physical member identity remains stable even if an analysis adapter subdivides it internally.

## Surfaces

Surfaces represent slabs/walls and may reference material and thickness. Load-transfer intent is one-way, two-way, shell or manual. Solver-specific meshing and conversion of area loading belong to the analysis adapter.

## Load sources and provenance

Every generated load SHOULD reference a `LoadSource` describing calculator, version, code edition, jurisdiction, inputs and generation status. Loads preserve provenance so a design result can be traced to its originating load calculation.

## Load cases

A `LoadCase` has a stable ID, display name and canonical category. Categories include dead, live, roof-live, snow, rain, wind, seismic, temperature, construction and other.

The category describes engineering meaning; the case name remains user/project specific. The PyNite adapter maps the stable Core load-case ID to a deterministic PyNite case name and retains the reverse mapping.

## Canonical external load primitives

Core defines explicit load primitives rather than one ambiguous load record.

### NodalLoad

Target: node. Coordinate system: global. Components may contain `FX,FY,FZ,MX,MY,MZ`.

PyNite mapping: `add_node_load`.

### MemberPointLoad

Target: member. Contains force/moment direction, magnitude, distance `x` from member start, load case and coordinate system (`global` or `member-local`).

PyNite mapping: `add_member_pt_load`.

### MemberDistributedLoad

Target: member. Represents uniform, trapezoidal or linearly varying distributed loading using `w1,w2,x1,x2`. `x1/x2` are measured from member start. Coordinate system may be global or member-local.

PyNite mapping: `add_member_dist_load`.

### SurfacePressureLoad

Target: surface/plate/quad. Stores pressure magnitude, load case and pressure convention. Meshing and solver element targeting are adapter responsibilities.

PyNite mapping: plate/quad surface pressure methods.

### SelfWeightLoad

Defines a global gravity direction, factor and load case. The adapter may use native solver self-weight support or generate equivalent canonical loads while retaining provenance.

### Level and diaphragm loads

Wind/seismic calculators may generate level/diaphragm resultants. These are valid Core loads, but a solver adapter must transform them into solver-supported nodal/member/surface actions deterministically and record that transformation.

## Load combinations

A load combination contains:

- stable ID and name
- factors keyed by Core load-case ID
- optional limit state: ULS, SLS, ASD or other
- optional tags such as Strength, Service, Overstrength
- optional code reference

PyNite mapping: `add_load_combo(name, factors, combo_tags)`.

## Analysis request

An `AnalysisRequest` explicitly selects analysis mode and requested cases/combinations. Canonical modes include:

- `linear-static`
- `elastic-iterative`
- `p-delta`

Solver-specific settings are isolated in adapter settings and must not redefine canonical model data.

## Analysis results

### Node results

Canonical node results may include global translations `DX,DY,DZ`, rotations `RX,RY,RZ`, reactions `FX,FY,FZ` and reaction moments `MX,MY,MZ`, keyed to a load case or combination.

### Member results

Member results are returned in member-local axes. A station contains distance `x` from the start node, optional `xRatio`, six internal-force components and optional local displacements/rotations.

Core does not prescribe station count. An application may request start/mid/end by default; dense solver sampling is also valid.

Optional envelopes store min/max and governing station for each force component. Combination tags may be used by adapters/calculators to create Strength/Service envelopes.

## PyNite adapter boundary

The PyNite adapter is a separate module from the Core contract. Its responsibilities are:

1. validate a Core model before analysis;
2. establish solver units;
3. create PyNite nodes;
4. create materials and sections;
5. create members/springs/plates/quads as supported;
6. apply supports, support springs, releases and enforced displacements;
7. map canonical load cases and all supported load primitives;
8. create load combinations and tags;
9. run the selected PyNite analysis mode;
10. extract node and member results;
11. transform all results back to canonical IDs, axes, units and sign conventions;
12. emit warnings/errors for unsupported or lossy mappings rather than silently discarding information.

No 3D model or design calculator should call PyNite directly across the platform integration boundary.

## Design calculators

Design calculators consume canonical material, section, member and analysis-result records. They may maintain richer private code-specific models internally. Writeback MUST use canonical IDs and canonical result contracts.

PyNite performs structural analysis. Code design remains the responsibility of design calculators.

## Reports and AI/GPT integration

Reports consume canonical facts. AI-generated engineering artifacts must use the same versioned contract. GPT workflows should read the latest Core contract from this repository before generating specifications or integration code and must not invent incompatible integration schemas.

## Stable identity

Nodes, members, surfaces, materials, sections, load cases, loads, combinations, runs and results use stable IDs. Display labels are metadata and are not cross-record identifiers.

## Versioning

- `0.1`: base structural model
- `0.2`: load provenance and analysis runs
- `0.3`: design/report/AI integration
- `0.4`: coordinate systems, internal-force convention, arbitrary stations and envelopes
- `0.5`: typed material/section analysis properties; explicit DOF/support behavior; explicit external load primitives; load-case/combination semantics; analysis modes; PyNite reference mapping and adapter boundary

Breaking semantic changes require a new schema version and migration notes.
