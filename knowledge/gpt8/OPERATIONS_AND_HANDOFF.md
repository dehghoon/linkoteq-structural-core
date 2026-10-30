# Operations and handoff

1. Check latest Core and Main-website releases, approved claims, Supabase blog_posts status and published_at.
2. Check cover format; convert to actual JPEG, validate JPEG magic bytes and end marker, dimension, file size, accessible public URL in blog-media; use first-party URL in Windsor.
3. Inspect Windsor connected accounts and list_actions schema; verify team write access, server-side key, and platform authorization.
4. Queue one job per post/platform; enforce idempotency; record claimed job and result. No blind retry on timeout after possible publication.
5. Check all three published post URLs/IDs and visual presence of image + summary + article link. If image unavailable, block rather than publish text only.
6. Record errors and notify; preserve logs without secrets; verify actual schedule execution.

Known gap: the version-2 Supabase Edge Function deployed on 2026-10-30 has not been end-to-end tested. WINDSOR_API_KEY secret configuration and cron activation remain unverified. Do not claim these are done.

Security: do not put API keys in GitHub; Supabase Edge Secrets only. No direct DB writes from public clients to social queue. Check RLS, tenant separation and permissions before exposing management APIs. Avoid leaking API keys in request logs. Maintain clear production evidence.
