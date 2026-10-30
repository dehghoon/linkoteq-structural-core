# Operations and handoff

1. Check latest Core and Main-website releases, approved claims, Supabase blog_posts status and published_at.
2. Check cover format; convert to actual JPEG, validate JPEG magic bytes and end marker, dimension, file size, accessible public URL in blog-media; use first-party URL in Windsor.
3. Inspect Windsor connected accounts and list_actions schema; verify team write access, server-side key, and platform authorization.
4. Queue one job per post/platform; enforce idempotency; record claimed job and result. No blind retry on timeout after possible publication.
5. Check all three published post URLs/IDs and visual presence of image + summary + article link. If image unavailable, block rather than publish text only.
6. Record errors and notify; preserve logs without secrets; verify actual schedule execution.

Known gap: the version-2 Supabase Edge Function deployed on 2026-10-30 has not been end-to-end tested. WINDSOR_API_KEY secret configuration and cron activation remain unverified. Do not claim these are done.

Security: do not put API keys in GitHub; Supabase Edge Secrets only. No direct DB writes from public clients to social queue. Check RLS, tenant separation and permissions before exposing management APIs. Avoid leaking API keys in request logs. Maintain clear production evidence.

## Verified state and acceptance gates — 2026-10-30

The historic v2/cron-unverified statement above is superseded by this evidence: Edge Function v4 ACTIVE; Vault named secret `marketing_publisher_service_jwt` present; cron `linkoteq-blog-social-publisher` (job 1) active every minute; `pg_net` responded HTTP 200 `{"processed":[]}` on 2026-10-30 19:54 UTC. This verifies the invocation path only, and no new platform post was attempted by that empty-queue response.

Acceptance for unattended production publishing requires: (1) service-role-only authorization enforced in the function, not just `verify_jwt`; (2) three-hour `due_at` gating from the first published transition; (3) real validated durable JPEG under first-party Supabase Storage, platform dimensions/ratio and public fetchability; (4) one atomic claim per platform job, robust against concurrent invocations; (5) semantic validation of Windsor body, saved `external_post_id` / link and platform evidence; (6) reconciliation of ambiguous responses without blind retries; (7) failure alerts or monitored digest and secure logging; and (8) one new, approved article passing all three automatic publishing paths without duplicate sends. Until then, report partial readiness, not production-proven auto publishing.

The five ChatGPT Automations are independent of pg_cron. The Friday/Sunday 08:00 Toronto digest combines feedback/analytics and social-post status monitoring because of the five-task cap; it is not an immediate notification. Do not assume TikTok or YouTube Shorts are connected. Keep secrets in Edge Secrets / Vault only and never record their values or authentication headers.
