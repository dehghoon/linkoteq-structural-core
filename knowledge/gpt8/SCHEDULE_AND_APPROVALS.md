# Approved editorial and monitoring cadence (2026-10-30)

User-authorized: blog article approval means approval for publishing associated social posts on LinkedIn, Facebook and Instagram; no separate social approval. Facebook/Instagram/TikTok posts may proceed without a separate approval where account integrations and policies permit. Do not infer authorization for unapproved blog drafts or unconnected platforms.

Monday: market-validation research for Linkoteq, USA and Canada independently, 09:00 weekly. Monday blog article and LinkedIn post were discussed as the established editorial cadence; verify actual automation before asserting live publishing.
Wednesday: engineering tool progress article on Linkoteq blog and LinkedIn, weekly 08:00 article preparation; monitoring blog/LinkedIn Wednesday and Friday at 09:00.
Thursday: engineering AI advances social content weekly 08:00; Instagram/Facebook/TikTok and YouTube Shorts were discussed, but platform-specific posting automation and video generation require independent verification.
Friday/Sunday: website/blog and LinkedIn metrics report weekly 08:00; Wednesday/Friday content monitoring 09:00.

Active automation titles last known: 'اعتبارسنجی بازار Linkoteq' Monday 09:00; 'مقاله هفتگی ابزار Linkoteq' Wednesday 08:00; 'اخبار AI مهندسی در شبکه‌های اجتماعی' Thursday 08:00; 'پایش محتوا و بازدید Linkoteq' Wednesday/Friday 09:00; 'گزارش بازدید و بازخورد Linkoteq' Friday/Sunday 08:00. All times are automation-configured local times; verify timezone and live schedule in Automations. These are research/content/report tasks, not proof of automatic external publishing.

## Confirmed automation consolidation and social delay — 2026-10-30

The ChatGPT account is at its **five active Automations** limit; preserve the five listed tasks. Do **not** create a separate sixth alert/reporting automation. Existing `گزارش بازدید و بازخورد Linkoteq` (ID `6ae43d7379d08191a802b0a23a854dc8`) is enabled Friday and Sunday at **08:00 America/Toronto** and includes **both** analytics/visitor feedback and checks of social publication outcomes and errors. It is a scheduled digest, **not** an immediate per-post notification. Other established monitoring remains Wednesday/Friday.

Supabase's independent `pg_cron` job `linkoteq-blog-social-publisher` polls each minute and dispatches approved blog social posts only **three hours after publication**, not three hours after draft creation. Approval of the published article covers LinkedIn, Facebook and Instagram syndication; drafts do not authorize publishing. This minute-level worker **does not consume a ChatGPT Automation slot**. A verified authenticated HTTP 200 with `processed=[]` proves connection, not a successful Windsor publication. Research/content Automations prepare or review work; they do not by themselves guarantee website publishing. TikTok/YouTube Shorts remain unverified integrations.
