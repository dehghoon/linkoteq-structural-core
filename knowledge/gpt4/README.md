# GPT-4 Orchestrator Knowledge

GitHub runtime knowledge for GPT-4. The released root `CORE_CONTRACT.md` is authoritative for engineering integration.

- [Master Instructions](GPT4_MASTER_INSTRUCTIONS.md)
- [Operations Handbook](GPT4_OPERATIONS_HANDBOOK.md)
- [Knowledge Manifest](GPT4_KNOWLEDGE_MANIFEST.md)
- [Orchestrator Guide](LINKOTEQ_GPT4_ORCHESTRATOR_GUIDE.md)
- [Analysis Workflow](ANALYSIS_WORKFLOW.md) (existing)
- [Migration Manifest](MIGRATION_MANIFEST.json)

Migration remains in progress. Preserve the existing GPT-4 as rollback reference. Do not claim production readiness without the relevant evidence.

## Seven-agent migration controls
- [Seven-agent orchestration contract](MULTI_AGENT_ORCHESTRATION_CONTRACT.md)
- [Plugin migration runbook](GPT4_PLUGIN_MIGRATION_RUNBOOK.md)
- [Migration tracking and blockers](GPT4_PLUGIN_MIGRATION_TRACKING.md)
- [Word reading copy of the guide](LINKOTEQ_GPT4_ORCHESTRATOR_GUIDE.docx)
- [Central agent roles](../../orchestration/AGENT_ROLE_REGISTRY.md)
- [Central handoff workflow](../../orchestration/AGENT_HANDOFF_WORKFLOW.md)
- [Direct GitHub access and exact-diff approval policy](../../LINKOTEQ_PLUGIN_MIGRATION_CONTRACT.md)

GPT-5 provides security review and retest; GPT-6 validates reconstruction and Core geometry promotion; GPT-7 produces detection evidence and owns dataset/model lifecycle. All analysis uses the GPT-2-owned Core Analysis Adapter. Current Core schema is v0.5; verify main and released/pinned baseline separately.

The Markdown guide is the editable source for the DOCX reading copy. Documentation synchronization, plugin configuration, runtime permissions, CI, deployment and production verification are independent milestones. Update the existing GPT-4 plugin in place and retain its prior version as rollback; do not create a replacement plugin.
