# Advanced Core Engineering Semantics — v0.6 Candidate

Status: proposed. Schema discriminator remains 0.5. These definitions are preservation/transport contracts, not proof of solver or editor support.

## Connections, links and offsets
Member.startConnection/endConnection supplement legacy boolean releases. A true release means a free DOF, not a finite stiffness. Conflicting legacy/new declarations must fail validation, never silently override. Connection stiffness is per DOF, distinct from support springs. offsetGlobal requires an explicit global length-unit interpretation before production use.

NodalLink endpoints retain stable IDs. coupledStiffness.dofs orders rows/columns; matrices must be square, dimensionally consistent and checked for symmetry when linear reciprocal behavior is assumed. Force/displacement, force/rotation, moment/displacement and moment/rotation terms carry different units. Link-local axes must be orthonormal and right-handed. Nonlinear preserve-only behavior cannot be silently converted to linear.

MultiPointConstraint preserves master/slave IDs, DOFs and behavior. Reject self-references, duplicate slaves, missing nodes and unsupported cycles. Preserve-only means no solver enforcement is claimed.

## Steel joists
Member.type=joist is independent of beam. Joist series K/LH/DLH/other, designation, publisher/edition/record, bearing and bridging remain traceable. Analytical equivalent-member and explicit-truss models require verified properties and connectivity respectively. Preserve-only is not analysis-supported. Never fabricate catalog capacities or infer a joist from a beam section name.

## Shell axes and results
SurfaceAnalysisDefinition relates physical surface to verified mesh and right-handed local axes. Validate normalized orthogonal basis, winding, positive face, and orientation. ShellAnalysisResult F11/F22/F12, M11/M22/M12, V13/V23 are local components; benchmarked sign conventions, averaging, locations and tensor transformations remain required before numerical interoperability. Top/bottom is relative to surface normal, not global +Z.

## Loads and diaphragms
SurfaceVectorLoad is a global force-per-area vector, distinct from normal SurfacePressureLoad. Adapters must preserve integrated force and moment and must not silently flip surface normals. Diaphragm nodes are the deduplicated union of explicit nodes and verified surface-mesh nodes; avoid duplicate loads/constraints. Semi-rigid requires verified mesh stiffness.

## Importer and analysis boundaries
SAP2000, ETABS and STAAD.Pro need separate source semantic converters and one canonical Core mapping, alongside lossless source archive and fidelity diagnostics. Preserve source bytes, command order, units, axes, IDs, unknown features and provenance. Core-shaped JSON alone is not evidence of semantic compatibility. PyNite remains behind Core Analysis Adapter; unsupported features require explicit diagnostics.
