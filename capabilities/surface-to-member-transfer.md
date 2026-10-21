# Surface-to-Member Load Transfer — experimental specification

- Capability version: `0.1.0`
- Core schema: `0.5` (no schema changes)
- Status: **experimental / not integrated**. This is a capability declaration, **not** evidence of a deployed implementation.
- Inputs: canonical `SurfacePressureLoad`, target surface geometry, support-member geometry, load-transfer intent, units, global gravity vector, and stable IDs.
- Outputs: canonical `MemberDistributedLoad` with original source/load-case provenance and explicit global or member-local direction.
- Initial intended scope: planar rectangular roofs, one-way transfer to two parallel supporting members.
- Out of scope: two-way slabs, arbitrary polygons, openings, complex drifts, and shell/plate solving.
- Reject unsupported geometries, ambiguous pressure basis, unknown surface/member IDs, or missing units; never silently approximate.
- Preserve equilibrium: integrated output member forces must match the input resultant within declared tolerance; for sloped surfaces distinguish pressure normal to surface from gravity-direction load per horizontal projection.
- No automatic conversion of snow pressure to normal pressure without an explicit pressure convention.
- PyNite adapter integration and end-to-end 3D verification are **pending**.

The existing Core contract defines both `SurfacePressureLoad` and `MemberDistributedLoad`. Adding an implementation of this transfer capability does not itself require Core schema v0.6.
