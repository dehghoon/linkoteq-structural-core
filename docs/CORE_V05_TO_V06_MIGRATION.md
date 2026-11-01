# Core v0.5 to v0.6 Candidate Migration Contract

Status: DRAFT. No v0.6 release or schemaVersion change is implied.

1. Existing schemaVersion=0.5 documents remain readable without silent reinterpretation; old IDs, loads, releases, units and geometry are preserved.
2. New optional surfaceAnalysis, nodalLinks, multiPointConstraints and shellAnalysisResults arrays may remain absent. Never synthesize analytical capabilities from absence.
3. Legacy startRelease/endRelease remain valid. New startConnection/endConnection are optional; no finite stiffness is inferred from boolean releases. Reject conflicting duplicate definitions.
4. Existing beam members remain beams; no automatic joist inference from designation. Joist records preserve series, catalog provenance, bearing, bridging and unverified capacities.
5. Existing surfaces without verified local axes have unknown orientation; do not assume +Z. Shell results must preserve axes, units and sampling provenance.
6. New joist member and surface-vector load variants require audit of exhaustive switches in GPT-2 and GPT-3.
7. A future schemaVersion=0.6 requires an approved dual-reader migration with old/new fixtures. Git tag alone does not change saved models.
8. Importer lossless archives remain separate from Core; unmapped/unsupported records remain preserved with diagnostics.
9. Analysis adapters must reject unsupported MPC, nonlinear links, semi-rigid diaphragms and shell behavior rather than silently approximating.
10. Consumer release gate: pin exact Core commit/tag, pass importer three-format fixtures, Advanced Model editor save/load and typecheck/build tests, engineering units/sign/equilibrium review, then publish.
