# Windsor.ai publishing integration

Connected Windsor connector accounts observed 2026-10-30: linkedin_organic organization 10945024 (Linko Tech); facebook_organic page 1469341496252250 (LinkoTeq); instagram account 17841466780429234 (linkoteq). Re-check accounts and list_actions before every schema or integration change.

Action mapping:
- linkedin_organic create_image_post: params {image_url: HTTPS first-party JPEG URL, commentary: caption}. Must include image, summary, canonical blog link.
- facebook_organic create_photo_post: params {image_url, caption}.
- instagram create_image_post: params {image_url, caption}. JPEG <=8MB, ratio 4:5 through 1.91:1; a 1200x630 JPEG is within ratio. Instagram caption links are not necessarily clickable.

Windsor documented HTTP write API: POST https://connectors.windsor.ai/{connector}/actions?api_key=... body {account,action,params}. The API key is server-side only; enable write actions in team settings. Never expose credentials in URLs printed to logs. Discover schemas with GET /{connector}/actions. See https://windsor.ai/api-documentation/.

2026-10-30 incident: original cover SVG; proxy-converted JPEG was accepted for Instagram and Facebook, but LinkedIn image download returned HTTP 403. A text+link LinkedIn post was manually published as fallback (URN urn:li:share:7522010302880714752), contrary to the later image-required rule. For future posts, fail closed on image errors; do not text-only fallback.

Manual publication evidence for article seven-checks-before-trusting-a-converted-structural-model: Instagram media id 18120328360953947; Facebook post id 1469341496252250_122102854311525081; LinkedIn text-only URN above. Existing outbox records are published; do not duplicate.

## v4 integration caveats (2026-10-30)

A verified cron-to-Edge HTTP 200 (`{"processed":[]}`) does **not** prove any Windsor action was called successfully. On a due article, validate each `create_image_post` / `create_photo_post` response body and platform-specific media/post ID, persist immutable external IDs and verified URLs, and visually or via trusted API confirm image, caption and canonical article link. HTTP success without semantic response validation is insufficient. Current v4 does not persist IDs. Never blindly replay failed or ambiguous calls because platform writes may have occurred. Verify write-action enablement, account billing/authorization and live action schemas. Keep API credentials and sensitive request URLs out of logs. Instagram caption URLs may not be clickable. TikTok and YouTube Shorts were discussed but are **not** part of the verified publishing integration.
