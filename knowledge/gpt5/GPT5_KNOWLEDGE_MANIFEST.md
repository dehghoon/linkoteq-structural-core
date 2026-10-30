> Canonical location: `dehghoon/linkoteq-structural-core/knowledge/gpt5/GPT5_KNOWLEDGE_MANIFEST.md`.
> Routing update: read GPT role manuals from this Core folder. References below to the former security/ guide location are retained for provenance and resolve here by filename. Project code, active project contracts, tests, status and handoffs remain in their owning project repositories. This routing notice supersedes older upload/setup instructions; it does not change engineering semantics. Historical candidate and status sections remain historical.

# Linkoteq GPT-5 Security Knowledge Manifest

## Canonical runtime sources

GPT-5 MUST read these from GitHub before work:

1. `dehghoon/linkoteq-structural-core/CORE_CONTRACT.md`
2. `dehghoon/linkoteq-structural-core/knowledge/gpt5/SECURITY_POLICY.md`
3. `dehghoon/linkoteq-structural-core/knowledge/gpt5/THREAT_MODEL.md`
4. `dehghoon/linkoteq-structural-core/knowledge/gpt5/GPT5_MASTER_INSTRUCTIONS.md`
5. `dehghoon/linkoteq-structural-core/knowledge/gpt5/GPT5_OPERATIONS_HANDBOOK.md`
6. Target repository source, status, handoffs, tests, workflows, deployment configuration, and security artifacts

## Current application security context

Current top-level identity model:

- `client`
- `employee`

Current client plans:

- `starter`
- `pro`
- `company`

Current employee roles observed in server-side Blog authorization:

- `member`
- `manager`
- `admin`

Current areas requiring coordinated security:

- Main Website
- Supabase authentication and RLS
- client workspace
- subscription/entitlement enforcement
- Blog/CMS
- Timesheet
- Engineering Tools
- 3D Model
- reports and exports
- protected uploads
- cross-domain session behavior
- GitHub/Vercel/Render deployment security
- backup and recovery

## Known current observations

The security baseline currently records that:

- employee self-signup is exposed in the Blog login UI
- Blog dashboard authentication alone does not independently prove employee role
- Blog AI API has server-side employee-role checks
- Timesheet handoff has used Supabase access/refresh tokens in a URL fragment
- client workspace authentication has been intentionally not fully connected yet
- access policy defines entitlements but entitlement definition alone does not prove server-side enforcement
- Blog HTML rendering uses `dangerouslySetInnerHTMl`
- Blog RLS requires role-focused verification to ensure a generic authenticated client cannot gain write/publish access

These observations are audit inputs, not proof of exploitation and not substitutes for fresh repository verification.

## Engineering constraint

Latest Core Contract is authoritative for structural integration.
PyNite is accessed only through the Core Analysis Adapter.
Security GPT must not rewrite authoritative engineering calculation logic.

## Knowledge precedence

1. Current GitHub runtime state
2. Latest Core Contract
3. Security policy and threat model
4. Current repository status/handoffs/evidence
5. Uploaded/static GPT knowledge

If static knowledge conflicts with current released Core or live repository state, current GitHub/Core wins.


## Additional mandatory sources and migration precedence
- `dehghoon/linkoteq-structural-core/knowledge/gpt5/BACKUP_AND_DISASTER_RECOVERY_GUIDE.md`: required before every backup/recovery/readiness task.
- `dehghoon/linkoteq-structural-core/knowledge/gpt5/GPT5_PLUGIN_MIGRATION_TRACKING.md`: migration evidence and blockers.
- `dehghoon/linkoteq-structural-core/knowledge/gpt5/GPT5_RUNTIME_INSTRUCTIONS.txt`: concise host bootstrap; full guides remain authoritative within their scope.
- `dehghoon/linkoteq-structural-core/AI_GPT_UPDATE_POLICY.md`
- `dehghoon/linkoteq-structural-core/knowledge/gpt5/README.md`
- `dehghoon/linkoteq-structural-core/knowledge/gpt5/GPT5_KNOWLEDGE_MANIFEST.md`
- `dehghoon/linkoteq-structural-core/orchestration/AGENT_ROLE_REGISTRY.md`
- `dehghoon/linkoteq-structural-core/LINKOTEQ_PLUGIN_MIGRATION_CONTRACT.md`

The canonical GPT-5 manuals are maintained in `dehghoon/linkoteq-structural-core/knowledge/gpt5/`. Historical references to Main-website/security remain provenance only. Application code, tests, status, handoffs and deployment evidence must still be read from their owning repositories.

Clarification of the earlier precedence list: current code is authoritative evidence of observed behavior, not permission to override the applicable Core contract, security policy or approved engineering requirements. Verify releases/tags separately from main; if no released baseline exists, report it and obtain an approved pinned baseline before release claims. Old threat observations require fresh source evidence before being reported as current findings.

All six original security/backup guides remain preserved in this repository. No Knowledge attachment inventory was supplied for GPT-5; do not claim all original assets have been checked. Preserve and inspect any remaining attachments during migration. Role registration does not establish runtime activation or security approval.

