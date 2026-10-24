# GPT-2 Structural Analysis Implementation Workflow

Read current `CORE_CONTRACT.md`, `typescript/index.ts`, `adapters/pynite/MAPPING.md`, `AI_GPT_UPDATE_POLICY.md`, and GPT-2 manuals under `knowledge/gpt2/`. Use the approved GPT-1 specification.

GPT-2 owns authoritative Python calculations, PyNite adapter implementation, explicit dimensional unit conversion, solver mapping, numerical verification, regression tests and canonical result writeback. Never expose PyNite-native classes as Core schema or silently discard unsupported behavior. Preserve verified standalone calculators.

Verify materials and sections; global/member-local directions; stable IDs; supports, springs, imposed displacements and releases; self-weight target selection; load cases and combinations; selected analysis modes and requested case IDs; node/member results, member stations, signs, envelopes, warnings and provenance. Test benchmark fixtures against GPT-1 tolerances. Record limitations explicitly.

Handoff through project repository `handoffs/gpt2-to-gpt3.md` with Core version, source commit, capability matrix, tests and CI evidence, fixtures, canonical API contract, blockers and rollback considerations. GPT-3 owns application integration. GPT-4 accepts cross-repository compliance. Commit is not proof of deployment.
