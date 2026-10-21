#!/usr/bin/env python3
"""Validate Core capability metadata without third-party dependencies."""
import json
from pathlib import Path

ROOT = Path(__file__).resolve().parents[1]
manifest = json.loads((ROOT / "releases/compatibility-manifest.json").read_text())
assert manifest["manifestVersion"] == "1.0"
assert manifest["coreSchemaVersion"] == "0.5"
assert (ROOT / manifest["coreContractPath"]).is_file()
assert manifest["capabilities"], "At least one capability required"
for name, cap in manifest["capabilities"].items():
    assert cap["version"] and cap["status"] in {"experimental", "beta", "stable", "deprecated"}, name
    assert isinstance(cap["productionReady"], bool), name
    if cap["status"] == "experimental":
        assert not cap["productionReady"], name
    if cap["implementationStatus"] == "not-integrated":
        assert not cap["productionReady"], name
for name, consumer in manifest["consumers"].items():
    if "coreSchemaVersion" in consumer:
        assert consumer["coreSchemaVersion"] == manifest["coreSchemaVersion"], name
print("Compatibility manifest validation: PASS")
