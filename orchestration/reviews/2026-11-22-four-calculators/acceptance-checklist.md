# GPT4 independent acceptance checklist
Review ID: GPT3-FOUR-CALCULATORS-20261122. Initial decision: PENDING. Full production acceptance: BLOCKED.

Record pass/fail/not-executed, reviewer, timestamp, exact source revision, deployment ID, fixture and observed result for each applicable item. A checkbox alone is not evidence.

## Common application and security
- [ ] Confirm the six pinned source revisions and current deployed revisions; inspect any changes after snapshot.
- [ ] Verify current released Core0.6 baseline; reconcile stale0.5 prose without silently changing contracts.
- [ ] Owner and active employee can launch Wind/Seismic directly after one sign-in, remain in the intended calculator, and avoid /blog/dashboard redirect.
- [ ] Test main-site entry and direct tool entry with fresh, expired and existing sessions; Chrome Android, desktop Chrome and browser storage restrictions where supported.
- [ ] Customer matrix: no grant, pending, correct active grant, wrong tool, expired/revoked grant, missing disclaimer; confirm backend401/403 and no cross-tool grant inheritance.
- [ ] Logout/revocation blocks the next protected operation; timeout/out-of-order responses do not restore access.
- [ ] Validate identity issuer/audience/expiry and server-side membership; no client role/email/query bypass.
- [ ] GPT5 reviews session handoff, returnTo validation, iframe messages, CSP/CORS/origin allowlists and any proposed domains; retest exact remediation revision.
- [ ] No credentials/tokens in query strings, logs, report artifacts or browser bundles beyond explicitly approved session handling.
- [ ] Plans remain inactive; paid PDF flows are server gated and not silently enabled.
- [ ] Main navigation/preview pages and standalone routes stay valid; Snow/W-Section unchanged.

## Wood
- [ ] GPT1/GPT2 approve CA/US edition-specific material catalog: source rights, numeric values/units, species/grade/product/size/condition applicability and stable IDs.
- [ ] Country → product/species → grade selectors populate the correct documented values automatically.
- [ ] Switching selections invalidates prior results and cannot mix NDS/CSA units or factors.
- [ ] Unsupported categories fail explicitly; manual override is deliberate and recorded with provenance.
- [ ] CA light-framing factor boundary and286mm blocking condition retained.
- [ ] Independent engineering review accepts only documented component scope; whole-member status never inferred from partial pass.
- [ ] Run and inspect numerical fixtures and meaningful material lookup boundary tests at the remediation revision.

## Concrete
- [ ] Preserve explicit ACI318-19 / CSA2019 / CSA2024 scope separation and nominal bar catalogs.
- [ ] CSA2024 flexure remains unavailable until GPT1/GPT2 source, applicability and independent numeric evidence accepted; no2019 fallback.
- [ ] Resolve/label omitted reinforcement, detailing, serviceability and seismic checks; agree permitted Beta scope.
- [ ] Verify geometry/effective depth/bar placement against unit conversions and invalid/overreinforced boundaries.
- [ ] Independent engineering reviewer accepts exact reference targets/tolerances, not merely suite totals.

## Wind / Seismic
- [ ] Wind LR/GS/CC applicability, source limits and Ch policy accepted by engineering owners.
- [ ] Retrieve immutable seismic wheel with approved hash/provenance; rerun complete engine/API suites without rewriting engine.
- [ ] NBCC2020 holds are explicitly accepted or remain blocked; healthy API is not release approval.
- [ ] Verify deployed API base URL, CORS/preflight, actual session-bearing request and numerical result through the browser.
- [ ] Official PDF remains blocked until an accepted server-side entitlement path exists.

## Core / visualization / reports / release
- [ ] Declare standalone-private DTO versus accepted canonical0.6 boundary per tool.
- [ ] Validate stable IDs, dimensions/units, global/member-local axes, signs, combinations, provenance/run IDs and supported mappings.
- [ ] Test canonical writeback into a verified model with equilibrium and no duplicate loads; unsupported records preserved/flagged.
- [ ] No direct PyNite bypass; solver-dependent gate requires GPT2 evidence and explicit GPT4 acceptance.
- [ ] Authenticated mobile/desktop3D rotate/zoom/drag/pinch/keyboard and country/geometry changes verified for wood/concrete.
- [ ] Reports preserve inputs, source edition, units, run/version references, warnings and incomplete status.
- [ ] Exact head CI/typecheck/build/security results, production smoke tests and rollback plan recorded.
- [ ] GPT4 disposition lists accepted scope, rejected scope, open blockers, responsible owners and evidence links. No automatic acceptance.
