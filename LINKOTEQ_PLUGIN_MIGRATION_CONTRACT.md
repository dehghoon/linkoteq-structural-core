# LINKOTEQ PLUGIN MIGRATION CONTRACT — v1.0

**Scope:** GPT-2 through GPT-7\
**Reference implementation:** Linkoteq GPT-1 Beta\
**Status:** Proposed — not yet deployed

## 1. Preservation of GPT identity

- Preserve each GPT's original engineering role, instructions, skills, and responsibilities.
- Do not replace role-specific instructions with generic plugin instructions.
- Do not delete or recreate existing plugins unless explicitly authorized.

## 2. Canonical engineering knowledge

- Repository: `dehghoon/linkoteq-structural-core`
- Read the active `CORE_CONTRACT.md` and applicable GPT-specific knowledge files.
- Follow `AI_GPT_UPDATE_POLICY.md`.
- Use the current active Structural Core version.
- Never silently substitute outdated local Knowledge for required canonical GitHub files.

## 3. Shared MCP configuration

- Server name: `linkoteq-gateway`
- Transport: Streamable HTTP
- Endpoint: `https://linkoteq-gateway.vercel.app/api/mcp`
- Authentication: Existing Gateway OAuth
- Do not embed GitHub tokens, OAuth secrets, or credentials in plugin instructions.
- Do not invent endpoints or claim access without successful tool execution.

## 4. Shared GitHub permissions

Authorized repositories:

- `dehghoon/linkoteq-structural-core`
- `dehghoon/Main-website`

All operations must respect the Gateway's actual repository, branch, path, identity, and authorization restrictions.

Reading and writing permissions must be independently verified.

## 5. Secure write workflow

1. Prepare a write Proposal.
2. Validate the authorized repository, branch, and path.
3. Display the exact Diff.
4. Require explicit browser approval.
5. Commit only the approved change through Gateway.
6. Report the actual Commit SHA.
7. Never bypass approval or commit merely because the user requested a change in chat.

## 6. Required MCP tools

- `read_canonical_knowledge`
- `prepare_github_write_proposal`
- `get_github_write_proposal_status`
- `review_github_write_proposal` — only according to its documented behavior

Tool availability must be verified through actual MCP discovery.

## 7. Migration acceptance tests

Each migrated plugin must pass:

- MCP tool discovery
- Authenticated canonical file read
- Correct GPT-specific knowledge loading
- Proposal creation without Commit
- Proposal status retrieval
- Unauthorized-access rejection
- Explicit browser approval enforcement
- No regression in original GPT responsibilities

A real GitHub Commit is not required for every GPT migration if the same Gateway write implementation has already passed the shared security test.

## 8. Deployment and reporting

For each GPT, report:

- Original GPT identity and responsibilities
- Plugin ID and version
- MCP discovery and authentication results
- Engineering knowledge sources verified
- Read/write capabilities tested
- Any missing permissions
- Acceptance test results

Never report a successful connection or deployment without evidence.

## 9. Migration rule

Do not repeat Gateway infrastructure development for each GPT.

Reuse the validated Gateway, OAuth flow, proposal storage, browser approval, and GitHub security controls.

Only GPT-specific engineering instructions, skills, knowledge mappings, and acceptance tests should differ.
