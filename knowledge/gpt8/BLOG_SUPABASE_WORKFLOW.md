# Blog / Supabase operational workflow

Website: https://www.linkoteq.com/blog ; GitHub: dehghoon/Main-website ; Supabase project: xssiwlwlsyxrwdbninqe.

Source table: public.blog_posts. Confirm current schema before writes. Relevant fields observed: id, slug, title, status, excerpt, linkedin_copy, cover_image_url, published_at. Publication requires status='published'. Do not overwrite draft content or auto-approve a draft.

Outbox: public.blog_social_publications (post_id,platform unique), RLS enabled, restricted from anon/authenticated. Trigger trg_enqueue_blog_social_publications creates rows on first transition to published, one per linkedin/facebook/instagram. Already-published articles are not automatically backfilled. Statuses: pending, processing, published, failed, blocked. Never reset published to pending without explicit dedupe investigation.

Edge Function: blog-social-publisher; version 2 deployed 2026-10-30; verify_jwt=true. Intended execution with service-role bearer authorization and WINDSOR_API_KEY secret. Current function normalizes covers via conversion service, checks JPEG signature/size, stores public image at blog-media/social/{post_id}.jpg, verifies public JPEG response before publishing. External converter is a dependency and must be monitored; production-grade pipeline should preferably use owned image processing.

For each article: validate source status and public URL, generate title+excerpt+hashtags+canonical link, create/verify JPEG first-party URL, publish to each platform, persist returned platform IDs and outcome. Never send text-only fallback without explicit change to image requirement.

Operational blockers as of 2026-10-30: WINDSOR_API_KEY availability in Supabase Edge Function not verified; recurring worker/cron not verified; end-to-end automated publishing not yet verified. A successful manual ChatGPT Windsor action is NOT proof of unattended automation.
