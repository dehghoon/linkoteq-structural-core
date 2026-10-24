# Linkoteq GPT-3 Knowledge Index (Proposed)

This directory is the proposed GitHub-backed knowledge source for GPT-3 (Engineering Application Builder). It is not an independent Core schema.

## Authority and role

1. Read live `CORE_CONTRACT.md`, `typescript/index.ts`, `AI_GPT_UPDATE_POLICY.md`, and `knowledge/PLATFORM_ARCHITECTURE.md` before implementation.
2. Apply the current explicit user instruction and preserve existing repository state; surface material conflicts rather than silently overwriting.
3. GPT-1: engineering and report specifications. GPT-2: engineering engines, PyNite adapter and numerical tests. GPT-3: API, UI, 3D, reporting, authentication, deployment, plugin integration. GPT-4: architecture, Core compliance and acceptance.
4. Read `CORE_AND_POLICY_REFERENCES.md` and the relevant implementation guidelines here.
5. For solver-dependent releases consult `orchestration/PYNITE_ADAPTER_VERIFICATION_GATE.md`; the gate was blocked at preparation time and must be rechecked.
6. Direct GitHub Connector only, no Gateway. Show exact diff and obtain approval before writes.

## Files

- `CORE_AND_POLICY_REFERENCES.md`: authoritative links, boundaries and gate
- `CALCULATOR_RELEASE_CHECKLIST.md`: updated v0.5-oriented release criteria
- `GPT3_INTEGRATION_RELEASE_RULES.md`: integration and QA
- `GPT3_GitHub_Development_Guidelines.md`: GitHub execution and safeguards
- `Engineering_Frontend_Architecture_Guideline_FINAL_v2.md`: text transcription of provided architecture document
- Numbered guidelines `04`–`16`: subject-specific implementation guidance

## Migration exclusions

Do not upload the provided obsolete `GPT3_CORE_AND_PLATFORM_ARCHITECTURE_v0.4.md`, `CALCULATOR_RELEASE_CHECKLIST_v0.4.md`, `AI_GPT_UPDATE_POLICY (1).md` or `index.ts (1)` as active Core definitions. The canonical versions remain at repository root.
