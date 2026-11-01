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

## Evidence required per confirmed gap
Record: source format and sample/test; exact Core contract type/path/version; expected vs observed semantics; why existing Core cannot represent it; proposed minimum schema change; backward compatibility and migrations; GPT-2/GPT-3 impact; owner; test cases; decision (covered / adapter-only / extension-preserved / confirmed Core gap / deferred).

## Coordination
GPT-2: append importer evidence and format coverage for SAP2000, ETABS and STAAD.Pro.
GPT-3: append editor UI, load, release, diaphragm, persistence and IFC evidence.
Core owner/orchestrator: review duplicates and approve the single proposed revision only after coverage is complete.

**No Core contract revision is authorized by this register.**
