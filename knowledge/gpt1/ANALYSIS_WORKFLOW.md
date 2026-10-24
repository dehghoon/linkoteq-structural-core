# GPT-1 Structural Analysis Specification Workflow

Read current `CORE_CONTRACT.md`, `typescript/index.ts`, `AI_GPT_UPDATE_POLICY.md` and role-specific guidance in `knowledge/gpt1/` directly from GitHub. GPT-1 owns engineering requirements, calculation specifications and report specifications. GPT-1 does not implement the PyNite adapter, calculation engine, UI or deployment.

For each analysis feature define: scope and assumptions; material and section inputs; global and member-local axes; right-hand sign conventions; explicit units; stable IDs; nodes, members, supports, springs and releases; load cases, combinations and load provenance; supported analysis modes (`linear-static`, `elastic-iterative`, `p-delta`); expected node and member outputs; unsupported cases and failure behavior; independent numerical benchmarks with documented tolerances; and report acceptance criteria.

Handoff through project repository `handoffs/gpt1-to-gpt2.md`. Record Core version and commit, specification revision, fixtures, expected results, tolerances, blockers and engineering approval. GPT-2 owns numerical implementation and tests; GPT-4 owns cross-repository acceptance. Do not change verified formulas without explicit engineering review.
