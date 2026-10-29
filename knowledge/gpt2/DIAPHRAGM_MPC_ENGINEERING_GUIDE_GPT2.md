# GPT-2 Engineering Implementation Guide: Rigid Diaphragm MPC for PyNite

**Status:** Proposed engineering specification; not implemented or validated.
**Owner:** GPT-2 (authoritative Python analysis implementation)
**Review:** GPT-1 (engineering specification), GPT-4 (Core compliance)
**Integration:** GPT-3 (3D Model/Core input and result display)
**Core baseline inspected:** `dehghoon/linkoteq-structural-core/CORE_CONTRACT.md`, v0.5, Git blob `5b88c1c5c3049f81915f4772b94e8e617989f05b`.
**Date:** 2026-10-28

## 1. Critical engineering distinctions

- A **reference point** is a kinematic origin for diaphragm DOFs. It need not be the center of mass or center of rigidity.
- The **geometric centroid** depends on whether the diaphragm is defined by an area, line network, or a set of nodes. The arithmetic mean of mesh-node coordinates is generally *not* the area centroid.
- The **center of mass (CM)** depends on the mass distribution and is relevant to inertial forces and torsional inertia.
- The **center of rigidity (CR)** depends on the *assembled lateral stiffness and boundary conditions* and is not generally equal to the centroid or CM. It cannot be inferred from geometry alone.
- **Reference-point choice does not intrinsically reduce linear rigid-diaphragm accuracy** if all transformations are performed consistently. Treat geometric centroid as the initial reference, not as an approximation to CR.
- **Diaphragm rotation is an unknown solved from structural equilibrium**, not prescribed as zero merely because two centers coincide.
- This guide assumes a **horizontal planar rigid diaphragm**, small displacements/rotations, and global Z normal. Inclined diaphragms require a local orthonormal basis and corresponding 3D kinematics.
- Rigid in-plane constraints do **not** automatically constrain out-of-plane `DZ`, `RX`, `RY`, or force every node's `RZ` to equal diaphragm rotation. The latter is a separate modeling decision requiring specification and tests.

## 2. Geometric reference point

### 2.1 Area centroid of a polygonal slab

For a simple, non-self-intersecting polygon with ordered vertices `(x_i, y_i)` and cyclic `(x_{n+1},y_{n+1})=(x_1,y_1)`:

`c_i = x_i*y_{i+1} - x_{i+1}*y_i`

`A_signed = (1/2) * sum(c_i)`

`x_G = sum((x_i+x_{i+1})*c_i)/(6*A_signed)`

`y_G = sum((y_i+y_{i+1})*c_i)/(6*A_signed)`

For holes, use signed area subtraction with consistent ring orientation; validate winding, intersections, and disconnected regions. For triangulated surfaces, use area-weighted triangle centroids:

`r_G = sum(A_e*r_e)/sum(A_e)`.

For a node-only diaphragm with no area definition, `r_ref = mean(r_i)` is an explicitly labeled **node-cloud reference**, not an area centroid. It is still a valid kinematic origin.

### 2.2 Nonuniform geometry

Do not assume all participating joints define the slab boundary. Use authoritative slab/mesh geometry where available. For several disjoint polygons, use signed area weights and explicitly validate intended diaphragm grouping.

## 3. Center of mass and polar mass moment

For discrete point masses `m_i >= 0` at `(x_i,y_i)`:

`M = sum(m_i)`

`x_CM = sum(m_i*x_i)/M`, `y_CM = sum(m_i*y_i)/M`, for `M > 0`.

`J_CM = sum(m_i*((x_i-x_CM)^2+(y_i-y_CM)^2)) + sum(J_i,local)`

where `J_i,local` is any independently modeled rotational inertia about the vertical axis. Avoid double counting.

For distributed surface mass density `mu(x,y)`:

`M = integral_A mu dA`

`r_CM = integral_A r*mu dA / M`

`J_CM = integral_A mu*((x-x_CM)^2+(y-y_CM)^2) dA`.

For a uniform-density slab, its area centroid equals its slab-only CM, but superimposed floor loads, equipment, framing, partitions, and other assigned masses can move the total CM. Convert weight to mass using the declared gravity constant and consistent units. **Do not assume all gravity loads are seismic masses**; mass-source rules belong in the engineering specification.

If masses are missing, report CM unavailable rather than silently substituting geometric centroid.

## 4. Exact small-rotation rigid diaphragm kinematics

Let the diaphragm reference be `(x_0,y_0)` and node `i` be `(x_i,y_i)`.

`a_i = x_i - x_0`, `b_i = y_i - y_0`.

Independent in-plane diaphragm DOFs:

`q_d = [U_X, U_Y, THETA_Z]^T`.

For counterclockwise positive `THETA_Z` (radians):

`u_Xi = U_X - b_i*THETA_Z`

`u_Yi = U_Y + a_i*THETA_Z`.

This is the linearized rigid-body relation `u_i = U + theta × (r_i-r_0)`.

**Matrix form:**

```
[ u_Xi ]   [ 1  0  -b_i ] [ U_X     ]
[ u_Yi ] = [ 0  1   a_i ] [ U_Y     ]
                              [ THETA_Z ]
```

The complete six-DOF node vector `[DX,DY,DZ,RX,RY,RZ]` retains unconstrained DOFs according to the structural model. Do not tie `DZ`, `RX`, `RY`, or `RZ` by default.

A *separate* full rigid-body 3D constraint would use different equations and is **not** equivalent to an in-plane diaphragm.

### 4.1 Numerical illustration

Reference `(0,0)`, node `(4,3)` meters, `U_X=0.010 m`, `U_Y=0.005 m`, `THETA_Z=0.002 rad`:

`u_Xi=0.010 - 3*0.002 = 0.004 m`

`u_Yi=0.005 + 4*0.002 = 0.013 m`.

Different nodes move by different amounts; they are *kinematically dependent*, not assigned identical displacements.

### 4.2 Change of reference

For new reference `r_1` and old reference `r_0`, same physical motion:

`U(r_1) = U(r_0) + THETA_Z * [-(y_1-y_0), (x_1-x_0)]^T`.

`THETA_Z` remains unchanged. Therefore changing the reference to geometric centroid or CM does not change the physical solution if transformations are consistent.

## 5. Force and moment transformations

Virtual work must be preserved:

`deltaW = sum_i [F_Xi*delta(u_Xi) + F_Yi*delta(u_Yi)]`.

Equivalent generalized diaphragm force at reference:

`F_X = sum_i F_Xi`

`F_Y = sum_i F_Yi`

`M_Z = sum_i (a_i*F_Yi - b_i*F_Xi) + sum_i M_Zi` (where applicable).

This is `f_reduced = T^T f_full`.

For lateral resultant applied at CM, offset `e = r_CM-r_ref` creates torsional moment:

`M_Z,ref = e_x*F_Y - e_y*F_X + M_Z,applied`.

A force passing through CM does **not** guarantee zero rotation; coupling to stiffness, other load components, and asymmetric boundary conditions can still produce torsion.

## 6. MPC assembly and structural solution

Let the unconstrained full global displacement vector be `u`, and independent reduced vector be `q`. Build a sparse transformation matrix `T` such that:

`u = T q + u_prescribed` (when nonzero prescribed displacements exist).

For the homogeneous linear static case:

`K_reduced = T^T K_full T`

`f_reduced = T^T f_full`

`K_reduced q = f_reduced`.

Recover:

`u_full = T q`

`r_full = K_full*u_full - f_full` (for the correctly assembled physical model and consistent load convention).

Recover element end forces from `u_full` using the original element stiffness/loads, not merely reduced nodal reactions.

**Implementation note:** If `u_prescribed` is nonzero, solve with `T^T(f-K*u_prescribed)` on the right-hand side and preserve correct support reaction recovery.

### 6.1 Modal/dynamic formulation

If dynamic analysis is supported, transform the mass matrix as well:

`M_reduced = T^T M_full T`

and damping as applicable:

`C_reduced = T^T C_full T`.

For discrete translational masses at diaphragm nodes, the reduction generates translational mass, translational–torsional coupling, and polar inertia. If the reference is at CM, the translational–torsional mass coupling vanishes for the idealized lumped-mass model.

Do **not** claim modal or seismic support until the actual solver workflow and tests confirm it.

### 6.2 Constraint conflict detection

Reject or explicitly resolve:

- A DOF controlled by multiple incompatible diaphragms.
- Conflicting support restraints or prescribed displacements.
- Duplicate or cyclic MPC definitions.
- Invalid or empty diaphragm membership.
- Diaphragm nodes with inconsistent plane definitions.
- Mesh nodes not properly connected to the intended floor.
- Nonlinear cases for which the constant linear `T` is invalid.

A node can have other support/element connections, but the reduction must preserve all valid contributions without duplicate DOFs.

## 7. Center of rigidity and solved rotation

Do not substitute the geometric centroid for CR and then assume zero torsion. A valid *effective* center of rigidity is a property of the assembled lateral system under a specified linearization, loading, and boundary conditions.

A practical diagnostic approach (not a substitute for the complete structural solution) is to form an effective condensed 3x3 floor stiffness matrix in `[U_X,U_Y,THETA_Z]` after appropriately accounting for other DOFs:

```
K_eff = [ K_tt   k_tθ ]
        [ k_θt   k_θθ ]
```

`K_eff` may be obtained by static condensation of the *full* constrained structural stiffness with other free DOFs `r`:

`K_eff = K_dd - K_dr * inv(K_rr) * K_rd`

when the necessary blocks are invertible and the condensation assumptions hold. In practice, solve linear systems rather than explicitly inverting.

The actual diaphragm rotation follows the coupled equilibrium equation:

`K_eff * [U_X,U_Y,THETA_Z]^T = [F_X,F_Y,M_Z]^T`

for a single condensed diaphragm with appropriately represented boundary conditions and other floor effects. For a multistory structure, solve all coupled diaphragm DOFs simultaneously; a standalone 3x3 floor stiffness is not generally sufficient.

For intuition only, in an idealized uncoupled torsional model:

`THETA_Z ≈ M_Z / K_θ`

but this is **not** the general solution and must not be used as the implementation algorithm.

If CR is requested, derive and validate its definition from an appropriate stiffness/flexibility method, with clear assumptions. Do not use an arbitrary stiffness-weighted average of member locations as an exact CR.

## 8. PyNite adapter strategy

**Do not fork or patch PyNite immediately.** First inspect the currently pinned PyNite version, its public APIs, global DOF ordering, assembly process, boundary-condition elimination, P-Delta handling, and result recovery.

Implement the MPC capability in the approved **Core-to-PyNite Analysis Adapter** or a reviewed solver extension, not in the Core schema or the 3D frontend.

Two candidate approaches require feasibility evaluation:

**A. Reduced-system adapter:** Obtain or construct the global `K`, `M` (when relevant), and `f`; apply `T^T K T`, solve, and recover `u` and element results. Prefer sparse operations. This requires access to the relevant PyNite assembly and post-processing interfaces.

**B. Constraint-equation/Lagrange multiplier solver:** Form `C u=0` and solve:

```
[ K  C^T ] [u] = [f]
[ C   0  ] [λ]   [0]
```

This is an alternative with different conditioning/solver requirements. It must be verified against PyNite's actual interfaces.

**Avoid penalty methods or artificial ultra-stiff members as the primary solution.** They introduce stiffness-selection and conditioning problems and may distort forces.

Check whether the current PyNite version already supports suitable general MPC or constraint APIs before implementing anything. No such current-version capability is established by this document.

## 9. Core contract and integration boundary

The inspected Core v0.5 contract covers six node DOFs, supports, springs, members, surfaces, loads, and the PyNite adapter boundary, but **does not explicitly define a general diaphragm MPC entity** in `CORE_CONTRACT.md`.

GPT-2 must not invent an incompatible canonical schema. Propose a versioned `DiaphragmConstraint` contract through GPT-1/GPT-4, with at least:

- Stable `id` and `name`.
- `type`: `rigid` (first implementation); semi-rigid modeled separately through actual shell/membrane stiffness.
- Explicit node membership, and optional surface assignments that deterministically resolve to nodes.
- Plane/orientation and reference-point selection method.
- Source provenance.
- Analysis capability and validation status.
- Optional derived CM and effective stiffness/CR results, with methods and units.

A surface assignment and a node assignment are two **selection mechanisms** for the same kinematic constraint; the diaphragm is not itself a slab section or material.

Preserve source diaphragm data even when the analysis adapter cannot execute it. Breaking Core changes require migration notes and cross-repository regression tests.

## 10. GPT-3 -> GPT-2 data contract

GPT-3 must provide a Core-compatible model containing:

- Stable node IDs, global coordinates, units, supports, springs.
- Members, sections, materials, releases, and orientations.
- Surface geometry/mesh and connectivity, when present.
- Diaphragm assignment (node IDs and/or surface IDs), plane, rigidity type.
- Load cases, nodal/member/surface loads, self-weight, combinations.
- Mass sources and nodal/element mass information **if CM or dynamic analysis is requested**.
- Provenance and imported source identifiers.

GPT-2 must validate the contract, build MPC mapping, execute supported analyses, and return canonical node/member results plus diaphragm reference displacements, rotations, reactions, and warnings.

GPT-3 is responsible for UI/API plumbing and result display, not for inventing or duplicating the constraint mechanics.

## 11. Mandatory verification tests

1. **Rigid-body kinematics:** For multiple non-collinear nodes, verify `u_Xi=U_X-b_i*theta` and `u_Yi=U_Y+a_i*theta` to numerical tolerance.
2. **Reference invariance:** Repeat the same model with geometric-centroid, CM, and arbitrary reference points; compare physical node displacements and member forces.
3. **Load transformation:** Compare `T^T f` against manual resultant force and moment.
4. **Stiffness transformation:** Compare `T^T K T` against an independently assembled small model.
5. **Symmetry:** Symmetric structure and centered lateral force should yield zero rotation within tolerance *only under the appropriate symmetry and boundary assumptions*.
6. **Eccentric load:** A known eccentric force produces the correct signed torsional moment and rotation.
7. **Mass properties:** Verify CM, polar inertia, and mass coupling against hand calculations.
8. **Out-of-plane freedom:** Verify `DZ`, `RX`, `RY` remain unconstrained by diaphragm MPC; test `RZ` handling explicitly.
9. **Conflicts:** Duplicate membership, contradictory restraints, zero/negative mass, missing IDs, and invalid planes.
10. **Multistory coupling:** Compare against an independent matrix structural-analysis reference.
11. **Numerical conditioning:** Compare reduced MPC with a penalty-method demonstration; do not accept penalty as default.
12. **Regression:** Existing non-diaphragm models must retain prior results.
13. **Solver scope:** Separately validate linear-static, P-Delta, nonlinear, and modal cases; unsupported modes must fail explicitly rather than silently ignore constraints.
14. **Independent benchmark:** Compare small benchmark cases with verified ETABS/SAP2000/STAAD results where licensed reference access is available.

## 12. Delivery gates and ownership

**GPT-1:** Approve semantics, DOF scope, mass-source rules, Core extension proposal, and acceptance tests.

**GPT-2:** Inspect PyNite internals; implement adapter-level MPC with authoritative Python tests; document solver limitations; provide handoff to GPT-3.

**GPT-3:** Deliver compatible model data and UI/API integration; preserve source diaphragm assignments; display results and limitations.

**GPT-4:** Verify Core compatibility, migrations, cross-repository CI, deployment, and production smoke tests.

Do not claim implementation success until actual tests pass. Do not claim deployment success based on a commit.

### GPT-2 required deliverables

- `docs/DIAPHRAGM_MPC_ENGINEERING_GUIDE.md` (this document)
- `docs/PYNITE_MPC_FEASIBILITY_AUDIT.md` (actual version/API/source inspection)
- `docs/DIAPHRAGM_CORE_GAP_PROPOSAL.md`
- `tests/test_diaphragm_mpc.py`
- `tests/test_diaphragm_mass_properties.py`
- `tests/test_diaphragm_reference_invariance.py`
- `handoffs/gpt2-to-gpt3.md`
- Updated `project-status.json` with verified evidence

**Stop/go rule:** Do not modify authoritative PyNite calculations until the feasibility audit and GPT-1 engineering review identify the correct extension point.

## 13. References to inspect and cite during implementation

- Linkoteq Core: https://github.com/dehghoon/linkoteq-structural-core/blob/main/CORE_CONTRACT.md
- PyNite source: https://github.com/JWock82/Pynite
- CSI SAP2000/ETABS documentation: diaphragm constraints, rigid-body kinematics, and master/slave constraints (verify against current official manuals).
- STAAD.Pro documentation: floor diaphragm and master-slave / rigid-floor modeling (verify current Bentley documentation).
- Standard structural matrix analysis references: coordinate transformation, multi-point constraints, static condensation, and virtual work.

This guide's matrix equations are standard linear structural mechanics derivations. It does **not** assert that current PyNite exposes a particular public MPC API, nor that ETABS, SAP2000, or STAAD use an identical internal implementation.
