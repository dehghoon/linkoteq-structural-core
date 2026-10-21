#!/usr/bin/env python3
import json
from pathlib import Path
root = Path(__file__).resolve().parents[1]
registry = json.loads((root / "registry/components.json").read_text())
manifest = json.loads((root / "releases/compatibility-manifest.json").read_text())
assert registry["authority"]["coreSchemaVersion"] == manifest["coreSchemaVersion"]
ids = [x["id"] for x in registry["components"]]
assert len(ids) == len(set(ids)), "Duplicate component IDs"
assert ids, "Registry must not be empty"
for component in registry["components"]:
    assert component["coreSchemaVersion"] == manifest["coreSchemaVersion"], component["id"]
    assert component["status"] in {"partial-verified", "verified", "pending-verification", "not-integrated", "pending-inventory"}
print("Component registry valid")
