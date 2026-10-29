# Core, Importer and PyNite Readiness Plan

Version: 0.1-proposed | Date: 2026-10-28 | Author: GPT-1
Decision owner: GPT-4 with GPT-1 engineering review.
Status: repository inspection and proposed work allocation; no implementation or release approval.

## 1. Objective and scope

Reach a verified linear-static analysis path quickly while reducing avoidable Core revisions. Complete a bounded requirements review across the importer, 3D loading UI and analysis adapter before selecting the next Core release. Future revisions cannot be ruled out. Freeze an explicitly scoped contract, not all future vendor capabilities.

This is an orchestration and decision package, not a replacement Core contract or an approved diaphragm calculation specification. No Core schema, solver code, UI or existing verification gate is changed by publishing it.

## 2. Inspected baselines and evidence

All reads used the connected GitHub service, branch main. These are inspected snapshots, not releases or verified production deployments.

| Repository | Main commit inspected | Evidence |
|---|---|---|
| dehghoon/linkoteq-structural-core | 09c5bf35e3319c7ba52f50c06ccb8dc1eaa6eeab | CORE_CONTRACT.md; typescript/index.ts; adapters/pynite/{MAPPING.md,adapter.py}; releases/compatibility-manifest.json; orchestration/PYNITE_ADAPTER_VERIFICATION_GATE.md; GPT-1 manuals and architecture/update policy |
| dehghoon/3D-Model | 9fc233f47fa4f2d21cf30839a545299fb0cbe077 | components/LoadManager.tsx; lib/core-loads-v05.ts; package.json; project-status.json |
| dehghoon/linkoteq-structural-importer | f1df51734021c3c50e51d296b6a57734d053131f | docs/CORE_IMPORT_GAP_ANALYSIS.md; project-status.json; published CSI sample findings |
| dehghoon/Main-website | 8ee7c7e1795f0fa1c24b5bbd9f69c97f669eb448 | main/tree inventory only; no application-runtime audit |

Core declares v0.5. GitHub releases and matching tag refs both returned empty arrays. GPT-4 must designate an immutable approved baseline or arrange a release; do not describe main as the latest released version.

The 3D package pins Core 49c0973bd15f6f725e251612785e6f55ff4fede4; its status declares a7c7103e46bb98035d907624b92ff8c21931f496. The status's successful CI belongs to f73c581aa42bcffb060fced9eef1230c2e32a2b6, not the inspected head; production status is REBUILD_PENDING. This inspection does not establish current deployment health.

Importer status contains historical publication and pending-amendment fields even though the amendment files are published. Reconcile these as a separate reviewed status update, without treating them as parser test evidence.

## 3. Findings that determine priority

1. Core already defines nodal, member-point, member-distributed, surface-pressure and self-weight loads, boolean six-DOF supports/releases, scalar support springs, imposed displacements and algebraic combinations. Missing editors do not by themselves require new Core types.
2. The inspected LoadManager creates global negative-FZ nodal loads and uniform member loads in fixed kN/kN-per-m units, slab normal pressure in kPa, and combinations with all factors equal to one and ULS labeling. Wall loading explicitly throws. This is source-level evidence for that component, not proof of every active UI path or production behavior. GPT-3 must trace its mounting and all alternative loading paths.
3. The reference PyNite adapter's _v returns the numeric value after checking value/unit keys; it does not perform conversion or establish dimensional validity. It expects upstream normalization. Nodes use bare coordinates. Production analysis needs an enforced normalization boundary, not merely unit labels.
4. The adapter rejects surface-pressure, level and diaphragm loads. It does not build surfaces or diaphragm MPCs. Its build path does not establish a comprehensive reject-on-unsupported-model check. Unsupported structural entities must not disappear merely because no corresponding load is present.
5. The adapter uses rotationDeg for members; explicit localAxes require verified handling. Spring-direction mapping, self-weight scope and result writeback require tests. Node results are plain numeric dictionaries; canonical result units/run metadata and member results remain verification work.
6. Core already contains a Diaphragm type with level, surface and optional node membership. The MPC guide proposes richer semantics; resolve this existing type rather than creating a competing canonical entity. The guide is proposed and unvalidated.
7. Surface-to-member transfer is marked experimental/not-integrated in the compatibility manifest. A displayed surface load does not prove load transfer or solver support.
8. Importer source inspection exposed story-scoped geometry, local restraints, nonprismatic sections, thermal loading, modifiers, diaphragm constraints and nonalgebraic combinations. Preservation is required now; canonical execution is gated separately.

## 4. Consolidated Core decision register

Every item requires a disposition: existing contract sufficient, clarification, compatible extension, breaking migration, or deferred with preserved source semantics. GPT-4 records the decision and exact evidence. Do not rename the next version to v0.6 until the release decision is made.

| ID | Decision needed before freeze | Proposed disposition / acceptance | Owner |
|---|---|---|---|
| C01 | Geometry units, elevations, angles and stations | Explicit model-boundary units; dimension-aware normalization; missing or ambiguous units reject analysis. SI/US alone must resolve to a documented exact unit set or migrate. | GPT-1/2/4 |
| C02 | rho mass versus weight, gravity and self-weight | Define density kind and gravity conversion; include member/surface scope and prevention of duplicate generated weight. Preserve imported zero modifiers. | GPT-1/2/4 |
| C03 | Axes, orientation and results | One right-handed engineering basis; deterministic vertical-member rule; resolve localAxes versus rotationDeg precedence; station/sign/unit/ID mapping with round-trip tests. Display transforms remain separate. | GPT-1/2/3 |
| C04 | Diaphragm assignment and MPC | Extend or clarify the existing type: membership resolution, plane, reference policy, in-plane DOFs, out-of-plane freedom, conflicts and capability status. Review conditional nodal MZ reduction consistently with independent nodal RZ. | GPT-1/2/4 |
| C05 | Surface loading and load transfer | Separate slab/wall pressure from wall gravity line load; declare normal sign, projected versus actual area, transfer method and generated-load provenance. Define one-way scope first; shell and two-way paths require independent validation. | GPT-1/2/3 |
| C06 | Case/pattern/combination semantics | Algebraic linear case factors for first solve. Retain source patterns and nested operators in IR; never encode SRSS/CQC/envelopes as algebraic factors or tags. Decide extension roadmap now, implementation later. | GPT-1/2/4 |
| C07 | Offsets, partial releases, coupled springs and trusses | Existing boolean releases and scalar springs are sufficient only for their exact semantics. Decide which cross-product extensions are in the release; preserve/reject the rest for analysis. No endpoint movement as a substitute for eccentricity mechanics. | GPT-1/2/4 |
| C08 | Joists, wood and section catalogs | Distinguish catalog identity/section properties from a new element formulation. Reuse Material/Section for equivalent prismatic beams only when properties and equivalence are approved. Open-web assemblies, effective stiffness and proprietary design data require their own evidence. | GPT-1/4 |
| C09 | Provenance and export claims | Keep lossless archive and many-to-many source mapping outside canonical engineering fields. Separate original-byte download, IFC export and edited vendor-native re-export. Native writers require separate grammar/semantic specifications. | GPT-1/2/3 |
| C10 | Capability negotiation and analysis eligibility | Validate requested mode against every relevant model behavior before solver assembly; return entity IDs and blocking reasons. Previewable is not analyzable. Define versioned API/result boundary without frontend-owned engineering rules. | GPT-2/3/4 |

C01-C05 and C10 require resolved contracts or explicit exclusions before the first production analysis. C06-C09 must receive documented dispositions before Core freeze; not every proposed capability needs to enter the release.

## 5. Execution sequence and dependencies

| Priority / ticket | Work and concrete output | Owner | Start / completion condition |
|---|---|---|---|
| P0 BASE-01 | Reconcile Core dependency, lockfile resolution and status across consumers; choose immutable baseline and version policy | GPT-4 with GPT-3 | Start now; complete with exact SHA manifest and contract-test evidence |
| P0 SEM-01 | Close decision register with field-level proposal, exclusions, migration rules and examples | GPT-1 with GPT-2/3 review | Start now; each in-scope ambiguity has an approved rule and test oracle |
| P0 SOL-01 | Audit the actually installed/pinned PyNite version, API, assembly, results and MPC feasibility; inventory current adapter tests | GPT-2 | Start now; exact solver/dependency pins, source references and feasibility report; no inferred API support |
| P1 UI-01 | Trace active loading paths; edit six global nodal components, member force/moment direction, local/global basis, point stations, trapezoid endpoints, case factors and explicit units | GPT-3 | Existing Core primitives can be prepared now; integrate only against resolved C01/C03 and agreed contract |
| P1 IMP-01 | Archive bytes, record spans, unknown commands, scoped IDs, unit state and fidelity stages; implement version-scoped source IR tests | GPT-2 | Existing importer infrastructure contract; no need to wait for all UI features or future Core fields |
| P1 SOL-02 | Enforced normalization, preflight rejection and linear-static prismatic frame adapter, canonical node/member results | GPT-2 | Resolved relevant semantics; tests may begin on explicit experimental fixtures before Core release |
| P1 MPC-01 | Independent rigid-diaphragm feasibility and benchmark work | GPT-2, reviewed GPT-1 | Parallel with frame adapter; no production promotion until C04 and separate tests pass |
| P2 CORE-01 | One coordinated Core proposal/release: contract, types, migrations, examples, compatibility manifest and consumer migration | GPT-4 coordinates owners | After decision register review and experimental contract fixtures; exact-diff approval before mutations |
| P2 E2E-01 | Same small model from manual 3D input and one validated import profile to analysis and canonical results | GPT-2/3 | Contract frozen for slice and fixture semantics verified; GPT-4 independently accepts evidence |
| P2 SURF-01 | Verified one-way surface load transfer or explicitly scoped shell path | GPT-2/3 | C05 resolved; conservation, provenance and duplicate-load tests; separate capability gate |
| P3 IFC-01 | Physical/analytical IFC mapping, omissions report, schema validation and independent reimport | GPT-3 | Can research/prototype in parallel; release depends on tested Core mappings and licenses |
| P3 PROD-01 | Deployment, authentication, access control, limits, retention, rollback and production smoke tests | GPT-3/4 | Runtime gates accepted; per-format/per-capability claims only |

UI polish, mobile interaction and preservation infrastructure may continue independently. Do not wait for complete ETABS/SAP/STAAD coverage to validate the first solver slice. Do not advertise all formats based on one accepted fixture.

## 6. First analysis slice

Slice A: linear-static, small-displacement, elastic prismatic frame members with complete approved section/material properties; explicit global supports, verified boolean end releases; nodal forces/moments and member point/distributed loads; algebraic combinations. Add scalar two-way springs and prescribed displacements only after their tests pass. Self-weight follows density/scope resolution. Each feature has its own capability flag and test evidence.

Slice B: horizontal rigid diaphragm MPC added to the verified frame slice. Do not tie DZ/RX/RY or nodal RZ by default. Preserve external work and recover full displacements, element forces and reactions. A diaphragm-bearing input must fail analysis explicitly until Slice B passes; never analyze it as Slice A after silently dropping constraints.

Outside initial solve: semi-rigid shells, nonlinear links, P-Delta, modal/dynamic analysis, response spectra, moving loads, thermal loads, nonprismatic/modifier-dependent members and unverified offsets. These remain preserved and inspectable; analysis is blocked when they affect the requested solve. This is staging, not permanent removal from the product scope.

## 7. Acceptance fixtures and gates

GPT-1 must approve numerical expected values and per-quantity absolute/relative tolerances before engineering-test acceptance. No universal tolerance is assumed here. Fixtures must state geometry, DOFs, units, axes, loads, element assumptions, expected results and independent derivation; avoid solver-generated expected values from the implementation under test.

| Test | Required evidence |
|---|---|
| A01 | Stable simply supported beam: point and uniform load; reactions, deflection, moment and sign against hand derivation; all irrelevant rigid-body DOFs explicitly stabilized |
| A02 | Rotated 3D member under local and equivalent global loads; full orientation, torsion and member-end ordering; canonical result mapping |
| A03 | Same physical fixture in two explicit unit systems; equivalent displacements, forces, reactions and self-weight when enabled |
| A04 | End release, two-way spring and prescribed displacement fixtures; correct DOFs, reactions and equilibrium |
| A05 | Independently factored load cases; no implicit factor-one or ULS default accepted as user engineering intent |
| A06 | Preflight failures: missing units/properties, missing references, invalid stations, mechanisms, unsupported surfaces/constraints/modifiers and nonalgebraic combinations |
| B01 | MPC kinematics, reference invariance, eccentric force, independent nodal RZ/moment, retained out-of-plane freedom and constraint conflicts |
| B02 | Multiple diaphragms and floors; force/moment equilibrium and independent matrix-reference benchmark; dynamics excluded unless separately verified |
| S01 | Surface transfer conserves resultant force and moment, handles support topology and normal sign, retains provenance and does not double-apply source loads |
| I01 | Manual model and imported equivalent produce matching canonical physics and results under reviewed tolerances; IDs may differ but traceable entity correspondence is required |
| I02 | Archive hash recovery, unknown-record preservation, per-stage fidelity report and explicit analysis exclusions for each source profile |
| X01 | IFC schema/relationships/geometry checks plus independent reimport; unsupported semantics listed; no lossless-IFC claim |

Gate F (contract freeze): approved baseline; decisions/dispositions; schema/types/docs aligned; explicit migration of unknown historical units (no guessed defaults); compatibility/rollback examples; GPT-1/2/3 review and GPT-4 acceptance.

Gate A (solver): exact adapter and PyNite versions; relevant A tests and inspected CI evidence; stable canonical results; limitations and GPT-2-to-GPT-3 handoff. Existing PY-NITE-CORE-V05 remains blocked until GPT-4 accepts evidence. A version-breaking migration reopens it.

Gate B (diaphragm): C04 engineering review, actual MPC feasibility, B tests and recovered-result validation. Passing Gate A does not imply Gate B.

Gate P (production): accepted capabilities, deployment commit, healthy deployment, reachable actual URL, authorized upload/download/solve smoke tests and rollback evidence. A Git commit or historical green CI is insufficient.

## 8. Handoff and status instructions

GPT-2: start SOL-01 and importer preservation/IR work; prepare A tests against explicit fixture semantics. Deliver feasibility audit, version pins, API proposal, unresolved questions and test evidence. Production solving remains gated.

GPT-3: start active-load-path inventory, existing-type editors, preservation/fidelity UI and API mocks. Implement no unit, load-transfer or diaphragm mechanics in the frontend. Coordinate UI-01 with C01/C03; preserve unsupported properties on edit/save.

GPT-4: own baseline reconciliation, C01-C10 dispositions, consolidated release proposal and independent gates. Require repo/path/commit evidence for each handoff. Resolve importer and 3D status drift in separately reviewed changes. Do not mark this plan's publication as a completed implementation stage.

Each workstream status must record ticket, owner, dependencies, exact source/consumer commits, test and CI links, limitations, deployment evidence, blocker owner and next permitted stage. This plan does not overwrite another owner's authoritative status or deliverables.

## 9. Current completion and limitations

Completed: source inspection, gap prioritization, proposed bounded analysis scope, dependency plan and acceptance inventory.

Not completed: solver version/runtime audit, numerical benchmark execution, engineering approval of unresolved transformations, Core migration/release, UI changes, parser implementation, IFC export or deployment verification. No messages have been sent to other GPTs; publication supplies a discoverable GitHub handoff only.
