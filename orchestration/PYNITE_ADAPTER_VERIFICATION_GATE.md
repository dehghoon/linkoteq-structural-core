# PyNite Adapter Verification Gate

Gate ID: PY-NITE-CORE-V05
Status: blocked
Owner: GPT-2
Acceptance owner: GPT-4
Downstream owner: GPT-3
Core contract: CORE_CONTRACT.md (v0.5)

GPT-3 MUST NOT release solver-dependent structural analysis integration until GPT-2 provides verifiable evidence and GPT-4 accepts this gate. Unrelated UI work may proceed.

Required evidence: adapter source commit; Core v0.5 compatibility; unit conversion, local/global axes, materials/sections, supports/releases, load cases/combinations, and canonical result mapping tests; benchmark fixtures with expected values and tolerances; CI test links; limitations; and handoffs/gpt2-to-gpt3.md in the project repository.

GPT-4 must inspect actual implementation, fixtures, CI, and Core compatibility. A commit or self-reported test pass alone does not unblock this gate. Record accepted source commit and evidence links before changing status to complete. Breaking Core changes reopen verification.

No direct PyNite access from downstream apps across the integration boundary. GPT-2 retains calculation ownership.
