# Blog / Supabase operational workflow

Website: https://www.linkoteq.com/blog ; GitHub: dehghoon/Main-website ; Supabase project: xssiwlwlsyxrwdbninqe.

Source table: public.blog_posts. Confirm current schema before writes. Relevant fields observed: id, slug, title, status, excerpt, linkedin_copy, cover_image_url, published_at. Publication requires status='published'. Do not overwrite draft content or auto-approve a draft.

Outbox: public.blog_social_publications (post_id,platform unique), RLS enabled, restricted from anon/authenticated. Trigger trg_enqueue_blog_social_publications creates rows on first transition to published, one per linkedin/facebook/instagram. Already-published articles are not automatically backfilled. Statuses: pending, processing, published, failed, blocked. Never reset published to pending without explicit dedupe investigation.

Edge Function: blog-social-publisher; version 2 deployed 2026-10-30; verify_jwt=true. Intended execution with service-role bearer authorization and WINDSOR_API_KEY secret. Current function normalizes covers via conversion service, checks JPEG signature/size, stores public image at blog-media/social/{post_id}.jpg, verifies public JPEG response before publishing. External converter is a dependency and must be monitored; production-grade pipeline should preferably use owned image processing.

For each article: validate source status and public URL, generate title+excerpt+hashtags+canonical link, create/verify JPEG first-party URL, publish to each platform, persist returned platform IDs and outcome. Never send text-only fallback without explicit change to image requirement.

Operational blockers as of 2026-10-30: WINDSOR_API_KEY availability in Supabase Edge Function not verified; recurring worker/cron not verified; end-to-end automated publishing not yet verified. A successful manual ChatGPT Windsor action is NOT proof of unattended automation.

## Verified runtime reconciliation — 2026-10-30 (supersedes older version-2/blocker status above)

- Deployed Supabase Edge Function: `blog-social-publisher` **v4**, `verify_jwt=true`, status ACTIVE. The `WINDSOR_API_KEY` Edge Secret was configured by the user; this key's end-to-end publish authority is **not** yet proven through a new automatic post.
- `public.blog_social_publications.due_at` determines earliest permitted dispatch; for each newly published article, `due_at = publication time + interval '3 hours'`. The publisher queries `status='pending' AND due_at <= now()` and polls eligible jobs with a limit of 15. Do not reset already-published entries.
- Supabase Vault entry **name only** `marketing_publisher_service_jwt` exists; secret bytes must never be read into chat or logs. The `pg_cron` job `linkoteq-blog-social-publisher` (`jobid=1`) is ACTIVE on `* * * * *` and uses Vault for the bearer token and `pg_net` to invoke `https://xssiwlwlsyxrwdbninqe.supabase.co/functions/v1/blog-social-publisher`.
- Verified transport evidence: at 2026-10-30 19:54 UTC the `net._http_response` status was **200**, body `{"processed":[]}`; associated cron run was `succeeded`. This proves authenticated Edge Function invocation with no eligible jobs at that instant. It does not establish JPEG publication, account permissions, posting IDs or delivery notifications.
- Critical implementation gaps: v4 marks `published` on HTTP OK without verifying Windsor response semantics and does not persist `external_post_id`; caller must be restricted to service-role (JWT verification alone is not sufficient authorization); `pending -> processing` claims require concurrency/load testing; failures/unknown responses need guarded manual reconciliation; image normalization depends on external `wsrv.nl` and only checks signature/size/content type, not reliably dimensions or final platform visibility. The notification table does not itself send notifications.
- Distinguish the independently scheduled Supabase cron (publication) from ChatGPT Automations (research and reporting). Five-task limit requires combined reporting and publication-monitoring; no sixth automatic task should be assumed.
