# Consolidated Core Gap Register — SAP2000 / ETABS / STAAD / 3D Model

Status: OPEN / discovery only. Baseline: current released Structural Core contract (verify exact release and dependency pins). This document is a register of **candidates**, not evidence of missing Core features.

## Governance (decision 2026-10-31)
- Structural Core remains unchanged during GPT-2 importer work for SAP2000, ETABS and STAAD.Pro and GPT-3 Advanced Model development.
- GPT-2 and GPT-3 must compare each capability against the actual Core contract and tests before marking a gap confirmed.
- Aggregate, deduplicate and review all confirmed gaps after GPT-2 has assessed all three source formats and GPT-3 has assessed the Advanced Model.
- Propose **one consolidated Core revision**, only if required, with explicit approval and coordinated migrations. No unilateral Core schema changes.
- Continue features supported by existing Core; do not invent incompatible temporary schemas.
- Preserve source data and provenance independently of Core mapping. No silent substitutions or data loss.

## Candidate gap inventory (not yet verified)
| ID | Area | Owner | Core coverage to verify | Status |
|---|---|---|---|---|
| CG-001 | Nodal FX/FY/FZ and MX/MY/MZ; signs, units and frames | GPT-3 + GPT-2 | Existing canonical load types and unit semantics | REVIEW |
| CG-002 | Member distributed and point loads; positions, local/global directions | GPT-3 + GPT-2 | Existing member load types and transforms | REVIEW |
| CG-003 | End releases / pin presets, 6 DOF and offsets | GPT-3 + GPT-2 | Existing MemberEndRelease type and semantics | REVIEW |
| CG-004 | Diaphragms from slabs and explicit node constraints | GPT-3 + GPT-2 | Existing Diaphragm type, membership and round-trip | REVIEW |
| CG-005 | Supports, springs, links and constraints | GPT-3 + GPT-2 | Existing support and constraint representations | REVIEW |
| CG-006 | Custom materials and sections; catalog aliases | GPT-2 + GPT-3 | Existing custom property / provenance support | REVIEW |
| CG-007 | Load cases/combinations, envelopes, modal/SRSS semantics | GPT-2 + GPT-3 | Existing combinations and source-extension boundary | REVIEW |
| CG-008 | Source metadata, unsupported features and fidelity | GPT-2 | Core provenance vs importer source archive | REVIEW |
| CG-009 | Model persistence and IFC4 physical/analytical mapping | GPT-3 | Existing Core entities and IFC adapter boundary | REVIEW |
| CG-010 | SAP2000 / ETABS / STAAD format-specific engineering features | GPT-2 | To populate from parser evidence for each format | PENDING |
| CG-011 | Steel joists as independent structural members, with K/LH/DLH catalogs and analysis/design representation | GPT-1 + GPT-2 + GPT-3 | Current `MemberType` has no explicit `joist`; evaluate dedicated joist identity, properties, behavior and preservation | REVIEW |
| CG-012 | Canonical local axes, transforms and signs for frame members and shell/surface elements | GPT-1 + GPT-2 + GPT-3 | Existing frame right-handed axes; missing explicit shell-axis and shell-result contract to assess | REVIEW |


## Preliminary Core v0.5 coverage observations (2026-11-01; not implementation validation)
Source: `CORE_CONTRACT.md` and `typescript/index.ts` on `main`. These are schema-level observations; runtime tests, format samples, and catalog evidence are still required.
- CG-001: `NodalLoad` includes FX/FY/FZ and MX/MY/MZ in global axes. Source-local to canonical-global conversion remains to be verified.
- CG-002: `MemberPointLoad` and `MemberDistributedLoad` include global/member-local directions and positions. Verify source-specific transformation and load signs.
- CG-003: `MemberEndRelease` supports six boolean DOFs at each end; semi-rigid end stiffness, rigid offsets and eccentricities are not explicitly typed.
- CG-004: `Diaphragm` includes `surfaceIds` and optional `nodeIds`; constraints, meshing and round-trip semantics require evidence.
- CG-005: `Support`, `SupportSpring` and `EnforcedNodeDisplacement` are typed; coupled stiffness matrices, links and multipoint constraints are not explicitly typed.
- CG-006: `Material` and `Section` include typed properties and extensions; validate catalog coverage, variable sections and source aliases.
- CG-007: `LoadCase`, `LoadCombination` and member force envelopes exist; modal/SRSS/CQC and response-spectrum combination semantics require validation.
- CG-008–010: Distinguish canonical Core responsibilities from lossless importer archives, application persistence, IFC adapters and source-specific semantics. Do not infer coverage from type names alone.

## CG-011 — Steel joists as independent structural members (approved requirement; schema proposal pending)
- Preserve an independent joist identity and stable ID, rather than relying on an ordinary beam designation or `other` classification.
- Assess joist span, bearing locations/lengths, end details, orientation, slope, spacing/layout, support relationships, bridging, and connectivity.
- Evaluate K, LH and DLH series against applicable SJI references and Canadian catalog/standard requirements. Record catalog edition, provenance, verified capacities and manufacturer-specific limitations; do not invent capacities.
- Distinguish physical open-web geometry from an equivalent analytical member or explicit chord/web truss model. Define mapping and traceability without assuming beam equivalence.
- Assess joist loading, panel-point and non-panel-point concentrated loads, distributed loads, load tables, self-weight, deflection/serviceability, erection/bridging and future design checks.
- Advanced Model: independent create/edit/select/display, assignments, serialization and round-trip. Importer: preserve SAP2000/ETABS/STAAD source identity even when a canonical joist mapping cannot be proven.
- Acceptance evidence: identity round-trip, geometric orientation, load transfer, unsupported-source preservation, and comparison to independently verified joist examples. Solver and design readiness remain separate flags.

## CG-012 — Local coordinate systems, transformations and sign conventions (review)
### CG-012A — Line/frame members
- Preserve `+x` from start node to end node, right-handed local x/y/z axes, and explicit rotation/orientation where provided; define deterministic fallback and vertical/near-vertical degeneracy handling.
- Validate transformation of global/local forces, moments, distributed loads, member offsets, releases, spring/connection DOFs, internal-force signs and principal-section axes.
- Test reversed connectivity, 90° rotation, inclined/vertical members, mirrored geometry, strong/weak axis design, and SAP2000/ETABS/STAAD source-local axes.

### CG-012B — Shell, slab, wall and surface elements (approved for review)
The existing `Surface` type has no explicit local-axis frame or shell-result tensors. Do not treat this observation alone as proof that a new Core schema is required; distinguish geometric surfaces from analysis mesh elements.
- Define separate, orthonormal, right-handed in-plane local axes 1 and 2 and normal axis 3 for each relevant physical surface and analytical shell element. Document orientation rules from node winding, connectivity, user rotation and deterministic defaults, including curved, warped and meshed surfaces.
- Preserve positive/negative faces and top/bottom interpretation. Do not assume global +Z always means slab top; clarify wall faces and orientation after reversing node order.
- Specify global/local transformations for surface pressure and vector loads, including normal sign, projected/gravity loading, in-plane actions and distributed-to-nodal transfer. Record force vs force-per-length vs pressure units.
- Define shell result sign and component conventions for membrane `F11,F22,F12`, bending/twisting `M11,M22,M12`, transverse shear `V13,V23`, and stresses, including per-unit-length units, integration points, nodal averaging, face/layer and output-location provenance. Treat CSI output labels as source conventions requiring explicit conversion, not universal Core signs.
- Distinguish physical shell orientation, analysis element axes, orthotropic material directions, rebar directions, design-strip axes and top/bottom reinforcement layers. Material or rebar orientation may rotate relative to shell axes.
- Validate membrane/plate/shell behavior, anisotropic/orthotropic constitutive matrices, cracked-section stiffness modifiers, thickness offsets, layered shells, and membrane-bending coupling under axis rotation.
- Preserve principal values and directions, shell forces/moments, mesh-local axes and design demands through transformations. Slab design should use verified code-specific reinforcement rules rather than treating raw M11/M22 as reinforcement demands without twisting and membrane effects.
- Verify shell-to-frame interface, diaphragm constraints, edge releases, local-axis orientation of surface springs and supports, physical/analytical model mapping and IFC export.
- Acceptance tests: rotate shell axes 90° and arbitrary angles; reverse surface node winding; compare global reactions and equilibrium, transformed F/M/V tensors, top/bottom and reinforcement directions; test horizontal slabs, vertical walls, inclined slabs, orthotropic panels, triangular/quadrilateral meshes, source import round-trip and units/signs. Equivalent physical models must produce invariant global response within declared numerical tolerances; component labels may change by transformation.
- Reference starting points (require verification against exact editions and sample files):
  - CSI SAP2000 shell output conventions: https://help.csiamerica.com/help/sap2000/26/26.0.0/SAP2000/WebHelp/Output/Shell_Element_Internal_Forces_Stresses_Output_Convention.htm
  - CSI ETABS `AreaForceShell` API: https://docs.csiamerica.com/help-files/etabs-api-2016/html/33495335-ec0e-387a-cfe2-9e88cf8b97ee.htm
  - CSI analysis reference: https://docs.csiamerica.com/manuals/sap2000/CSiRefer.pdf
- Open verification: STAAD.Pro shell axes and force conventions, IFC4 representation, relevant concrete slab design code editions, source-format tests and actual Core implementation/adapter behavior.

## Revision and GPT-4 handoff gate
For CG-001–CG-012 record evidence, exact contract locations, source samples, classification (`covered`, `adapter-only`, `extension-preserved`, `confirmed Core gap`, `deferred`), minimum proposed schema, compatibility, owner and acceptance tests. Keep unresolved items `REVIEW`/`PENDING`. GPT-4 may coordinate one proposed revision only after review and explicit approval; no Core contract/code changes are authorized by this document.

## Evidence required per confirmed gap
Record: source format and sample/test; exact Core contract type/path/version; expected vs observed semantics; why existing Core cannot represent it; proposed minimum schema change; backward compatibility and migrations; GPT-2/GPT-3 impact; owner; test cases; decision (covered / adapter-only / extension-preserved / confirmed Core gap / deferred).

## Coordination
GPT-2: append importer evidence and format coverage for SAP2000, ETABS and STAAD.Pro.
GPT-3: append editor UI, load, release, diaphragm, persistence and IFC evidence.
Core owner/orchestrator: review duplicates and approve the single proposed revision only after coverage is complete.

**No Core contract revision is authorized by this register.**
