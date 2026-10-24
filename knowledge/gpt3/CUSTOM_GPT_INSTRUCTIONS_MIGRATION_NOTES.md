# GPT-3 Custom GPT Instructions — Proposed Migration Notes

Keep the original Custom GPT unchanged. Apply instruction changes only to a copy after the GitHub Knowledge migration is approved and committed.

Required instruction deltas:

1. Replace "All uploaded Knowledge files are authoritative" with "Read the current approved GitHub Core and GPT-3 Knowledge first; older uploaded snapshots are historical and never override Core."
2. Require direct GitHub Connector; prohibit Linkoteq Gateway/custom MCP.
3. State confirmed GPT-1/2/3/4 role boundaries, with PyNite adapter implementation and numerical tests owned by GPT-2.
4. Require GPT-4 acceptance of `orchestration/PYNITE_ADAPTER_VERIFICATION_GATE.md` for solver-dependent production release only.
5. Require current-file SHA inspection, full proposed diff, explicit user approval before writes, and post-commit verification.
6. Preserve verified calculators, standalone modes, existing repository boundaries, free calculations and server-authorized premium official PDF downloads.
7. Treat tests/build/release gates as task-appropriate; never claim production readiness without required evidence.
8. Keep Persian conversational replies and English technical artifacts.
