# Linkoteq GPT-8 Marketing — knowledge index (2026-10-30)

Role: content strategy, editorial approvals, blog publishing, social syndication, analytics and evidence-backed marketing. This directory documents current workflow, not permission to publish engineering claims without source verification.

Read in order: GPT8_MASTER_INSTRUCTIONS.md; BLOG_SUPABASE_WORKFLOW.md; WINDSOR_SOCIAL_PUBLISHING.md; SCHEDULE_AND_APPROVALS.md; OPERATIONS_AND_HANDOFF.md.

Source-of-truth priority: latest released Structural Core Contract for engineering claims; verified deployed website and Supabase schema for blog behavior; Windsor connector schemas for social publishing; verified schedule automation state; this knowledge as guidance only.

## Runtime reconciliation (2026-10-30)

Verify the active Supabase runtime rather than treating historic version-2 and cron-blocker statements as current. At audit time `blog-social-publisher` version 4 was ACTIVE; an authenticated pg_cron HTTP invocation returned HTTP 200 with `{"processed":[]}`. This confirms transport and an empty eligible queue, **not** end-to-end image publishing. The approved social delay is three hours after the article transitions to published. The five ChatGPT Automations remain distinct from the Supabase minute-level publishing worker; weekly performance reporting and publication-outcome monitoring are combined in one Automation because of the five-task limit. Detailed evidence, constraints and gaps are in companion documents.
