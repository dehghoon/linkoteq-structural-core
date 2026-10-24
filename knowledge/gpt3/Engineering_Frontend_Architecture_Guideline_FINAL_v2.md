# Engineering Frontend Architecture Guideline (Source transcription)

Engineering Frontend Architecture Guideline (Final)

1. Purpose
Define repository boundaries, shared engineering architecture, domain/subdomain behavior, API
integration, deployment portability, authentication integration, and report entitlement rules for
LinkoTech engineering tools.



2. Repository Strategy
Do not force all engineering tools into a single repository.

   Existing exception: Steel Verification remains in the current `Engineering-Frontend` repository.
    Its current production subdomain is `steel.linkoteq.com`. Do not migrate or rename it solely for
    architectural consistency unless the user explicitly requests that work.
   For each new engineering tool, prefer a dedicated repository unless the user explicitly selects a
    different architecture.
   A new tool repository may contain frontend, backend/API, tests, documentation, deployment
    configuration, and tool-specific assets.
   Do not automatically create separate frontend and API repositories for a single tool. Use
    separate repositories only when justified and approved.
   Do not modify the main LinkoTech website repository unless the user explicitly requests a
    main-site change.



3. Shared Platform Principles
   Separate repositories do not justify duplicated engineering or platform logic.
   Reuse shared API contracts, types, validation interfaces, authentication integration, report
    components, design tokens, and utilities when genuinely reusable.
   Engineering calculations and validation logic remain owned by Agent #2 and must not be
    duplicated in frontend code.
   Keep reusable business logic separate from UI logic so future web/mobile clients can reuse
    contracts and services.



4. Domains and Subdomains
Each engineering tool may be exposed through its own LinkoTech subdomain under
`linkoteq.com`. Current example: `steel.linkoteq.com` for Steel Verification. Future subdomains
must come from the user or deployment configuration. Never invent a production subdomain.

A tool's repository name, hosting provider, and subdomain are separate architectural decisions. Do
not couple reusable code to a specific production host.

5. Main Website Boundary
The main LinkoTech website is the corporate, marketing, navigation, authentication-entry, and
product-discovery layer. It may link users to engineering tools. Tool implementation belongs in the
tool's approved repository unless a main-site change is explicitly requested.



6. API Integration
   Inspect and reuse existing FastAPI/REST/OpenAPI contracts before adding endpoints.
   Use typed, reusable API clients and contracts.
   Keep API base URLs and deployment-specific settings in environment/configuration layers.
   Do not hardcode production hosts in reusable business logic.
   Engineering values, warnings, ratios, units, validation, and applicability come from Agent #2
    and must not be re-derived or altered in UI code.



7. Access and Subscription
   Engineering calculations are free to run for all users unless the user explicitly changes the
    policy.
   All users can see core on-screen engineering results, governing checks, pass/fail status,
    warnings, limitations, and safety/applicability information.
   Formal PDF calculation-report generation/download is premium.
   Premium PDF access requires authenticated server-side authorization and an active report
    subscription or another approved entitlement.
   Client-side hiding alone is never sufficient authorization.
   Keep entitlement logic separate from calculation logic so future premium features can be
    added without changing engineering calculations.



8. Authentication
Integrate with the approved LinkoTech authentication architecture when available. Reuse
authenticated employee/customer state where technically supported. Do not create duplicate
identity systems without explicit approval. Authentication implementation must remain modular.



9. Reports
Report content follows Agent #1's Report Specification and Agent #2's engineering outputs. Agent
#3 owns report preview UI, PDF rendering, authorization, subscription enforcement, and delivery.
Agent #3 must never change formulas or engineering meaning to fit a report layout.

10. Deployment Portability
Remain hosting-provider neutral. Deployments may use Netlify, Vercel, VPS, Docker, dedicated
hosting, or another suitable platform. Isolate platform adapters/configuration. Do not make
reusable application logic dependent on a single hosting vendor.



11. Project Intake
The mandatory Project Intake Protocol belongs in GPT #3 Core Instruction, not in a separate intake
guideline. This architecture guideline only reinforces that repository and configuration decisions
must be inspected before implementation.



12. Quality Gate
   Inspect the target repository before coding.
   Reuse before creating.
   No duplicate utilities or components.
   Tests pass.
   Production build succeeds.
   Environment/configuration requirements are documented.
   Documentation and API contracts are updated.
   Repository remains clean and existing user work is preserved.

13. Mobile / Expo Architecture
   Tool repositories should be designed so a future Expo / React Native client can reuse the same
    API, contracts, types, validation interfaces, authentication integration, engineering models,
    report contracts, and entitlement interfaces.
   When mobile development begins, prefer a dedicated `mobile/` application inside the tool
    repository. Do not duplicate engineering calculation logic in the mobile application.
   A practical active multi-client structure is `web/`, `mobile/`, `backend/`, `packages/`, `tests/`, and
    `docs/`, but existing repositories must be inspected before restructuring.
   Do not create unused Expo scaffolding for every tool by default. Add the mobile application
    when mobile work begins or when explicitly requested.
   Web and mobile clients must consume the same approved backend engineering outputs so
    formulas, warnings, ratios, units, validation, and applicability remain controlled by Agent #2.

## Core v0.5 addendum

This source guideline is retained for repository boundaries, standalone Steel Verification, modular web/mobile, free calculations, server-authorized premium PDF, and deployment portability. Read the current Core v0.5 before implementation. GPT-2 owns engineering engines and PyNite; GPT-3 owns application integration; GPT-4 owns release acceptance. No Gateway/custom MCP. Solver-dependent release requires the verified PyNite gate.
