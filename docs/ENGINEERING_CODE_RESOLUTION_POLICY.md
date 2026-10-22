# Engineering code resolution — proposal v1

1. Prefer explicit user selection; otherwise inspect project jurisdiction and engineering source documents (including Excel/Mathcad/PDF evidence). Never default to Canada or to an unqualified `latest` edition.
2. Resolve the standard, exact edition, amendments/national annex, applicable clauses, and jurisdiction against `design-codes/codes.json`.
3. If unavailable, web-discover candidates and ask the user to select; web discovery is not a verified design implementation.
4. Check `design-codes/implementations.json` for capability-specific independent verification. Never infer implementation from code listing or vendor performance tables.
5. Preserve every applicable code and edition in project/document identity, visible titles, calculations, and reports. Reject unsupported or ambiguous code combinations rather than silently substituting editions.
6. Vendor performance artifacts independently own source hash, exact code basis, applicability conditions, and lifecycle/verification status.
