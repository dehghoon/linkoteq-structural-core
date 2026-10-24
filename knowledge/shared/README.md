# Shared Linkoteq Knowledge

The authoritative contract remains `../../CORE_CONTRACT.md` on the latest released Core branch. The canonical TypeScript definitions remain `../../typescript/index.ts`. The update policy is `../../AI_GPT_UPDATE_POLICY.md`. The analysis adapter mapping is `../../adapters/pynite/MAPPING.md`.

Role-specific documentation belongs under `knowledge/gpt1/`, `knowledge/gpt2/`, `knowledge/gpt3/`, `knowledge/gpt4/` and `knowledge/gpt5/`. Read the role folder plus shared references directly from GitHub before work. Root-level `knowledge/GPT*_*.md` documents are retained temporarily for compatibility and must not override newer role-specific instructions. Do not use an intermediary connection service. PyNite integration must pass through the Core adapter. Do not change verified engineering calculation logic merely for integration.
