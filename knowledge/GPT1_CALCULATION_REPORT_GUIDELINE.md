# Calculation Report Guideline (Final)

## 1. Purpose
Define the mandatory content, traceability, source-layout review, access tiers, and implementation-neutral data requirements for calculation reports produced from Agent #1 specifications and Agent #2 engineering calculations.

## 2. Core Policy
- Engineering calculations and essential on-screen results are free to all users.
- Formal downloadable PDF calculation reports are premium and require an approved entitlement.
- Never suppress engineering warnings, limitations, applicability conditions, pass/fail information, or safety-critical content for free users.

## 3. Source Presentation and Layout Review
The Calculation Report Specification must not be created as a generic report template without first reviewing the presentation logic of the source calculation.

When Excel, Mathcad, PDF, reports, or hand calculations contain a meaningful engineering presentation structure, Agent #1 must inspect that structure in addition to extracting formulas and variables.

- Review calculation-block order and section sequence.
- Review grouping of inputs, assumptions, intermediate calculations, checks, and outputs.
- Review headings, subheadings, notes, callouts, and engineering annotations.
- Review input/output tables, equation flow, lookup-table presentation, and result summaries.
- Review figures, sketches, diagrams, charts, and other visual elements that support engineering understanding.
- Review how governing results, ratios, pass/fail checks, warnings, and limitations are emphasized.

The Report Specification should preserve useful source presentation logic when it improves engineering readability, reviewability, and traceability. It must not blindly reproduce poor formatting, spreadsheet constraints, Mathcad page limitations, obsolete styling, duplicated information, or source-layout errors.

If source presentation is inconsistent or unsuitable for a production report, document what is being preserved, reorganized, or intentionally not carried forward. Do not change engineering meaning while improving presentation structure.

## 4. Report Levels

### 4.1 Free Calculation Results
Show inputs, relevant intermediate values, final results, governing checks/ratios, pass/fail status, units, warnings, limitations, and calculation applicability needed for responsible engineering use.

### 4.2 Subscription Calculation Report
Provide a formal PDF-ready report with document control, project metadata, calculation narrative, equations and formula IDs, traceability, code references, assumptions, intermediate results, final checks, warnings, validation statement, and report metadata.

## 5. Required Report Specification
- Report identity, title, calculation/module ID, specification version, and revision.
- Project, client, user, date, prepared-by/review fields as configurable metadata.
- Governing standard and edition; unit system; source/specification references.
- Input summary with symbols, descriptions, values, units, source, and validation constraints.
- Assumptions and boundary conditions.
- Ordered calculation sections linked to formula IDs and, where useful, informed by the source calculation's presentation sequence.
- Intermediate values required for review and traceability.
- Final results, governing ratios/checks, pass/fail status, and controlling condition.
- Warnings, invalid-input conditions, limitations, and applicability statements.
- Code/reference register using only source-supported references.
- Validation/benchmark cases and numerical tolerances.
- Display precision, rounding rules, and units.
- Tables, diagrams, plots, or figures required by the engineering specification or useful source presentation.
- Footer/disclaimer and document-control requirements.

## 6. Traceability
Maintain: Source → Calculation Step → Formula ID → Code Reference → Output → Validation Test → Report Section. Every report item must be traceable to the approved engineering specification and calculation output.

## 7. Data Contract for Agent #3
Define a structured, implementation-neutral report payload containing report metadata, inputs, assumptions, calculation sections, equations/formula IDs, intermediate results, final results, checks, warnings, references, validation information, units, display rules, and required presentation elements. Do not prescribe a specific web framework, PDF library, authentication provider, payment provider, or hosting platform.

## 8. Preview and PDF
The specification may define a report preview. Preview content must not contradict or weaken the on-screen free results. Official PDF generation/download is an entitlement decision implemented by Agent #3. Engineering content must be identical in meaning regardless of access tier.

## 9. Engineering Safety
No subscription rule may hide a failed check, warning, invalid-input message, code applicability limit, or safety-critical result. Never invent missing engineering content to make a report appear complete.

## 10. Handoff Requirements
Agent #1 includes this report specification in the Structural Calculation Engineer Handoff. Agent #2 preserves and validates engineering content. Agent #3 implements UI, preview, PDF rendering, authentication, subscription, and authorization without modifying engineering logic.
