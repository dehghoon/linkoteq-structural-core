# GPT3 → GPT4: Wood, Concrete, Seismic and Wind review
Prepared 22 November 2026. Status: **ready for independent GPT4 review; NOT accepted for complete production engineering use**.

## Request and boundaries
Review application/API/authentication/3D/deployment integration for four tools and make the findings reviewable by GPT4. This pass changes documentation/evidence only: no engine formulas, runtime code, permissions, DNS, deployment protection, paid plans or production deployments are changed. Existing standalone routes, Steel W-Section and Snow are preserved. A handoff does not notify, execute or obtain approval from GPT4.

The previous conversation's promises to fix login loops and implement a wood species/grade dropdown are **not completed work**. They remain explicit acceptance blockers below. Anonymous denial and green tests do not demonstrate that an entitled employee can open the tool.

## Authoritative baseline
- Core release v0.6.0; active schema0.6, legacy0.5 supported. Current contract/types/compatibility manifest control. Some Knowledge, platform and policy prose still says0.5; record the conflict rather than downgrading the active contract.
- Exact six repository revisions, deployment IDs/SHAs, commands and CI links are in [evidence.json](evidence.json). Repository links in individual handoffs point to pinned revisions.
- GPT1 owns engineering/report specifications. GPT2 owns approved engines/numerical correctness. GPT3 owns application integration. GPT4 accepts scope, Core compliance and production readiness. GPT5 independently reviews security-sensitive changes.
- PyNite acceptance gate remains blocked. No solver was called and this review grants no solver-dependent release permission.

## Inventory
| Tool | Source / application boundary | Current production surface | Findings |
| --- | --- | --- | --- |
| Wind | dehghoon/wind-calculator; Next.js web + FastAPI + included wind-calculation-engine | wind-calculator.vercel.app; unnumbered Vercel project is the current main-site link target | Limited NBC2010/2020 LR/GS/CC; source/workbook scope limits remain; login return/SSO unresolved |
| Seismic | dehghoon/seismic-calculator; Next.js web + separate API; immutable external approved engine | linkoteq-seismic-preview.vercel.app + linkoteq-seismic-api.vercel.app | Engine self-consistency health passes; NBCC2020 release still explicitly blocked; private static export is not canonical Core writeback |
| Wood | dehghoon/WoodDessign engine/API; UI and shared member viewer in dehghoon/Main-website | www.linkoteq.com/tools/wood-design + linkoteq-wood-api.vercel.app | NDS2024 US + limited CSA O86:24 CA; material values still manual, no species/grade design-value catalog |
| Concrete | dehghoon/linkoteq-concrete-beam engine/API; UI and shared member viewer in dehghoon/Main-website | www.linkoteq.com/tools/concrete-beam + linkoteq-concrete-api.vercel.app | ACI318-19 US; CSA2019 flexure/shear; CSA2024 shear only. No full-member approval |

All currently inspected production deployment records say READY. This is deployment status, not engineering or authenticated UX acceptance. Current Vercel domain inventory does not list wind.linkoteq.com or seismic.linkoteq.com; do not assert those domains have been configured.

## Fresh checks
| Check executed in this review | Result | What it establishes |
| --- | --- | --- |
| Wood complete repository pytest suite | 66 passed | Current implementation regressions, including country separation and CSA grade/blocking boundaries |
| Concrete complete pinned repository pytest suite | 61 passed +16 subtests | Existing foundation, component arithmetic/reference fixtures and access boundaries |
| Wind included engineering/API suites | 65 passed | Included engine, workbook lookup and adapter/auth regressions |
| Seismic auth tests only | 10 passed | Fail-closed tool-scoped authorization; not numerical engine verification |
| Main website access-policy tests | 6 passed | Policy unit behavior; not a real signed-in browser session |
| Main website TypeScript | exit0 | Typecheck for current relevant source, matched to pinned Git blobs |

208 test cases passed, with16 additional concrete subtests. These are existing regression suites, not208 independent normative code validations. Runtime used Python3.12; Starlette/httpx and pytest plugin warnings were nonfatal. No new code tests were invented in this pass.

Current Core and app files were fetched directly from GitHub, not a Gateway. Concrete's older scratch foundation differed from GitHub; final concrete results use a separately staged pinned copy. Wood's17 source/test files and15 relevant main frontend/proxy/policy/package files matched Git blob hashes. Wind's39 files and seismic's12 backend files were staged from exact pinned GitHub revisions.

Live probes ([live-probes.json](live-probes.json)):
- Four tool execution surfaces returned application JSON401 to anonymous POSTs: wind, seismic API, wood API and concrete API. Main website wood/concrete proxies also returned401 with private,no-store.
- Wood/concrete public pages returned200 and contained no rendered calculation form; both offered account access links.
- Seismic, wood and concrete backend health returned200. Seismic version explicitly says BLOCKED_PENDING_ENGINEERING_APPROVAL for NBCC2020.
- Wind root returned200; /health returned404 because the web service owns that path. /api/health and /api/version returned401 under the broad /api guard. Do not describe those probes as an unhealthy wind engine.
- Vercel reports all_except_custom_domains protection for several projects, but the measured canonical public URLs returned app pages/JSON, not a Vercel sign-in wall. Configuration alone does not establish the reported login loop's cause.

## Findings and disposition
### F01 — P1: Login loop and lost destination, Wind/Seismic (open)
Both web/components/ToolAccessGate.tsx link employees to https://www.linkoteq.com/blog/login with no returnTo. Main-website app/blog/login/page.tsx defaults to /blog/dashboard without returnTo. This confirms the lost-destination branch.

Both gates request a session from a header iframe in another origin. Main-website app/account/header-session/header-session.tsx obtains a Supabase session in that embedded context, requires an origin handshake and posts an access token to an allowlisted parent. Browser storage/partitioning, blocked embedding or handshake timing may cause the signed-in state to disappear, but a real session trace was not collected. Treat these as hypotheses, not a proven complete root cause.

Required: architecture decision for reliable top-level/federated SSO and safe return routing, preserving server-side per-tool authorization; prove Owner/employee/customer flows and logout/revocation. Do not solve the loop by removing backend checks, granting plans, trusting client roles or placing reusable tokens in query strings. The staged cross-tool SSO contract calls for short-lived audience-bound handoff or authorization-code flow; current iframe bearer exchange needs GPT5 review against that contract.

Adding a subdomain alone is not accepted remediation. Adding one requires coordinated canonical URLs, iframe/CSP/origin/CORS/issuer callback configuration and a tested migration, with existing standalone routes preserved.

### F02 — P1: Wood species/grade auto-selection missing (open)
The US UI still requires typed designation/source and numerical Fb/Fv/Fc/Ft/Fc-perp/E/Emin. The Canadian UI still requires typed designation/source/fb/fv/fcp/E. Its grading-category selector only controls factor applicability; it is NOT a species/grade material-value dropdown.

The current Core material reference catalog explicitly says parsed reference templates only, no verified numerical engineering properties supplied. It cannot be presented as an approved strength table.

Required GPT1/GPT2 handoff: authorized edition-specific CA/US material records with stable record IDs, species/species-group, grade, product, size applicability, units, unadjusted design values, verified source/edition/page, permitted adjustment rules and supported scope. GPT3 can then implement linked country/product/species/grade selectors, automatic values, provenance and deliberate advanced override. Country/grade changes must invalidate results; unsupported combinations fail explicitly. No guessed values, synthetic defaults promoted to real grades, or mixing NDS/CSA factors.

### F03 — P1 acceptance hold: incomplete engineering scopes (open)
- Concrete CSA2024 flexure deliberately unavailable pending beta1/ductility source verification. CSA2019 pilot omits minimum longitudinal reinforcement/detailing/serviceability coverage. ACI immediate bending deflection is not full long-term serviceability. Component checks must not become a full beam PASS.
- Wood CA restricted to dry untreated38mm visually graded framing at listed depths, single member, continuous restraint; light-framing KZ=1, eligible structural visual grades use supported table, depth286 requires additional blocking confirmation. No generic glulam/SCL/built-up applicability.
- Seismic version explicitly blocks NBCC2020 company-approved release. The historical55-engine/9-API results in TEST_RESULTS.md were not rerun here. Approved immutable wheel/version/hash/provenance and GPT2 acceptance evidence must be supplied.
- Wind scope is limited LR/GS/CC; Ch remains explicit engineering input and roof/source configurations must not be generalized.

Existing numerical matches/source documents are regression evidence. They do not substitute for GPT1 approval, independent GPT2 numerical review or GPT4 acceptance. No new engineering equations were approved or rewritten by GPT3 in this review.

### F04 — P1 platform integration hold: Core writeback not accepted (open)
Seismic backend/app/core_handoff.py emits private linkoteq.seismic.static.v1 with storey forces and torsion and guards equilibrium/applicability; it lacks the full canonical CalculatorWriteback records, stable target IDs, run binding and LoadSource/LoadCase/Load provenance needed for platform writeback. Keep it as a private review payload, not accepted canonical loads.

Wind provides private pressure/calculator responses; no canonical load writeback demonstrated. Wood country endpoints emit private component reports without demonstrated canonical model/design roundtrip. Concrete has a separate validated-boundary-only Core envelope and blocked writeback scaffold, while the public automatic component endpoint is private; these are distinct, and neither proves completed integrated design.

Required GPT4 decision: explicitly accept standalone Beta scope separately, or require a Core0.6 adapter with stable model/run/material/section/member IDs, units, axes/sign/combination mapping, provenance and roundtrip tests. No solver integration may bypass the GPT2-owned adapter gate.

### F05 — P2: deployment/verification provenance gaps (open)
- Seismic main=038074cadb7e6e007a366b4582e22d981416d97c; deployed web=785aad72dd3e80bbf27e36857b6857181d388216; deployed API=dec2b9c76439f9f6f0cc4fe5679c32213c11f06a. The GitHub web-to-main compare reports2 commits ahead with no changed files. This is revision bookkeeping evidence, not a claim of runtime drift. API equivalence and immutable-wheel build provenance still need acceptance evidence.
- Wood/concrete API deployments identify their repository and commit, while Vercel may show Connect Git Repository: source provenance is not the same as an automatic Git deployment connection.
- Main's inspected merge commit returned no check runs; existing green branch/earlier build claims are historical unless linked to exact CI heads. Other repository check-run observations are recorded separately in evidence.json.
- TEST_RESULTS/source prose contains older statuses (e.g. CSA not implemented, v0.5, builds not verified); the later code/dated component notes are more specific. Reconcile documentation without overstating approval.
- No mobile/desktop authenticated interaction, pinch/drag/keyboard retest, complete access-role matrix, formal report entitlement or full canonical model roundtrip was performed here.

## 3D and reports
Wood/concrete share Main-website app/components/member-viewer.tsx, an interactive SVG projection with rotate/zoom controls. It is a section/member visual aid, not a full analytical StructuralModel or proof of Core writeback. US/CA units and reinforcement geometry must be reviewed during actual authenticated mobile/desktop QA. W-Section remains a separate verified tool in steel-verification and was not changed.

Seismic has free report preview; official PDF remains intentionally disabled pending entitlement integration. Wood/concrete complete formal-report traceability is not accepted by this review. Do not infer report readiness from a component table.

## Ordered GPT4 actions
1. Validate this snapshot and disposition findings; distinguish ready-for-review from accepted.
2. Prioritize F01; coordinate GPT3 remediation and GPT5 security review/retest with exact commits. Preserve access policies and working tools.
3. Obtain approved GPT1/GPT2 material catalog and engine-scope handoffs for F02/F03.
4. Decide standalone Beta versus Core-integrated acceptance and coordinate missing adapters for F04.
5. Reconcile deployment/build/engine artifact provenance and stale docs in F05.
6. Execute [acceptance-checklist.md](acceptance-checklist.md), record exact evidence and signed disposition in a follow-up review record. Do not change this snapshot into an invented acceptance verdict.

This pass prepares the review package only. It does not repair the defects, migrate hosting, configure DNS, execute GPT4 or publish a new tool release.
