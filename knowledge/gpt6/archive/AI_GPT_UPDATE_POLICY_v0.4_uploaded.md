# Linkoteq AI / GPT Core Update Policy
The `dehghoon/linkoteq-structural-core` repository is the single source of truth for cross-product engineering contracts.

All GPTs must use the latest released Core Contract, avoid competing schemas, preserve canonical IDs/units/provenance, and migrate existing verified calculators at the integration boundary rather than rebuilding their engineering logic.

For Core v0.4:
- geometry is global;
- external loads are global by default;
- internal member forces for design are member-local;
- station count is unrestricted;
- `x` is from member start along local +x;
- `xRatio` is optional normalized position.

If older GPT knowledge conflicts with the current Core Contract, the current Core Contract wins for cross-product integration.
