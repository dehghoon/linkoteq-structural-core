"""Reference Linkoteq Core v0.5 -> PyNite analysis adapter.

The adapter intentionally accepts canonical dictionaries so the Python solver layer
is not coupled to the TypeScript implementation. Validation/serialization can later
be generated from the Core schema.
"""
from __future__ import annotations

from dataclasses import dataclass
from typing import Any

try:
    from Pynite import FEModel3D
except ImportError:  # allows contract tooling to import this module without PyNite installed
    FEModel3D = None


class AdapterError(ValueError):
    pass


@dataclass
class IdMaps:
    load_case_to_solver: dict[str, str]
    solver_to_load_case: dict[str, str]


class PyNiteAdapter:
    """Build and solve a PyNite model from a Linkoteq Core v0.5 model."""

    def __init__(self, core_model: dict[str, Any]):
        if core_model.get("schemaVersion") != "0.5":
            raise AdapterError("PyNiteAdapter requires Linkoteq Core schemaVersion 0.5")
        if FEModel3D is None:
            raise AdapterError("PyNite is not installed in this runtime")
        self.core = core_model
        self.model = FEModel3D()
        self.maps = IdMaps({}, {})

    @staticmethod
    def _v(unit_value: dict[str, Any]) -> float:
        """Return a numeric value after upstream unit normalization.

        v0.5 requires explicit UnitValue objects. Production use must place a unit
        normalization service before this method. Refusing hidden conversion here is
        intentional: mixed units must never be silently sent to the solver.
        """
        if not isinstance(unit_value, dict) or "value" not in unit_value or "unit" not in unit_value:
            raise AdapterError("Expected canonical UnitValue {value, unit}")
        return float(unit_value["value"])

    def build(self) -> "PyNiteAdapter":
        self._build_case_map()
        self._add_nodes()
        self._add_materials()
        self._add_sections()
        self._add_members()
        self._add_supports()
        self._add_support_springs()
        self._add_enforced_displacements()
        self._add_releases()
        self._add_loads()
        self._add_combinations()
        return self

    def _build_case_map(self) -> None:
        used: set[str] = set()
        for case in self.core.get("loadCases", []):
            cid = case["id"]
            base = case.get("name") or cid
            name = base
            n = 2
            while name in used:
                name = f"{base} [{n}]"
                n += 1
            used.add(name)
            self.maps.load_case_to_solver[cid] = name
            self.maps.solver_to_load_case[name] = cid

    def _case(self, core_case_id: str) -> str:
        try:
            return self.maps.load_case_to_solver[core_case_id]
        except KeyError as exc:
            raise AdapterError(f"Unknown loadCaseId: {core_case_id}") from exc

    def _add_nodes(self) -> None:
        for node in self.core.get("nodes", []):
            p = node["position"]
            self.model.add_node(node["id"], float(p["x"]), float(p["y"]), float(p["z"]))

    def _add_materials(self) -> None:
        for material in self.core.get("materials", []):
            a = material["analysis"]
            self.model.add_material(
                material["id"], self._v(a["E"]), self._v(a["G"]),
                float(a["nu"]), self._v(a["rho"]),
                self._v(a["fy"]) if a.get("fy") is not None else None,
            )

    def _add_sections(self) -> None:
        for section in self.core.get("sections", []):
            a = section["analysis"]
            self.model.add_section(section["id"], self._v(a["A"]), self._v(a["Iy"]), self._v(a["Iz"]), self._v(a["J"]))

    def _add_members(self) -> None:
        for member in self.core.get("members", []):
            self.model.add_member(
                member["id"], member["startNodeId"], member["endNodeId"],
                member["materialId"], member["sectionId"],
                rotation=float(member.get("rotationDeg", 0.0)),
                tension_only=bool(member.get("tensionOnly", False)),
                comp_only=bool(member.get("compressionOnly", False)),
            )

    def _add_supports(self) -> None:
        for support in self.core.get("supports", []):
            r = support["restraints"]
            self.model.def_support(support["nodeId"], r["DX"], r["DY"], r["DZ"], r["RX"], r["RY"], r["RZ"])

    def _add_support_springs(self) -> None:
        behavior_map = {"two-way": None, "tension-only": "-", "compression-only": "+"}
        for spring in self.core.get("supportSprings", []):
            behavior = spring.get("behavior", "two-way")
            self.model.def_support_spring(spring["nodeId"], spring["dof"], self._v(spring["stiffness"]), behavior_map[behavior])

    def _add_enforced_displacements(self) -> None:
        for disp in self.core.get("enforcedNodeDisplacements", []):
            self.model.def_node_disp(disp["nodeId"], disp["dof"], self._v(disp["magnitude"]))

    def _add_releases(self) -> None:
        dofs = ("DX", "DY", "DZ", "RX", "RY", "RZ")
        for member in self.core.get("members", []):
            i = member.get("startRelease", {})
            j = member.get("endRelease", {})
            values = [bool(i.get(d, False)) for d in dofs] + [bool(j.get(d, False)) for d in dofs]
            if any(values):
                self.model.def_releases(member["id"], *values)

    def _add_loads(self) -> None:
        for load in self.core.get("loads", []):
            case = self._case(load["loadCaseId"])
            kind = load["type"]
            if kind == "nodal":
                for direction, uv in load.get("components", {}).items():
                    self.model.add_node_load(load["nodeId"], direction, self._v(uv), case)
            elif kind == "member-point":
                self.model.add_member_pt_load(load["memberId"], load["direction"], self._v(load["magnitude"]), self._v(load["x"]), case)
            elif kind == "member-distributed":
                x1 = self._v(load["x1"]) if load.get("x1") is not None else None
                x2 = self._v(load["x2"]) if load.get("x2") is not None else None
                self.model.add_member_dist_load(load["memberId"], load["direction"], self._v(load["w1"]), self._v(load["w2"]), x1, x2, case)
            elif kind == "self-weight":
                self.model.add_member_self_weight(load["globalDirection"], float(load["factor"]), case)
            elif kind in ("surface-pressure", "level", "diaphragm"):
                raise AdapterError(f"{kind} requires geometry/load-transfer mapping not implemented in the initial adapter")
            else:
                raise AdapterError(f"Unsupported canonical load type: {kind}")

    def _add_combinations(self) -> None:
        for combo in self.core.get("loadCombinations", []):
            factors = {self._case(case_id): float(factor) for case_id, factor in combo["factors"].items()}
            self.model.add_load_combo(combo["id"], factors, combo.get("tags"))

    def analyze(self, request: dict[str, Any]) -> None:
        mode = request["analysisType"]
        settings = request.get("settings", {})
        if mode == "linear-static":
            self.model.analyze_linear(**settings)
        elif mode == "elastic-iterative":
            self.model.analyze(**settings)
        elif mode == "p-delta":
            self.model.analyze_PDelta(**settings)
        else:
            raise AdapterError(f"Unsupported analysisType: {mode}")

    def node_results(self, combo_id: str) -> list[dict[str, Any]]:
        results = []
        for node_id, node in self.model.nodes.items():
            results.append({
                "nodeId": node_id,
                "loadCombinationId": combo_id,
                "displacement": {"x": float(node.DX[combo_id]), "y": float(node.DY[combo_id]), "z": float(node.DZ[combo_id])},
                "rotation": {"x": float(node.RX[combo_id]), "y": float(node.RY[combo_id]), "z": float(node.RZ[combo_id])},
                "reaction": {"x": float(node.RxnFX[combo_id]), "y": float(node.RxnFY[combo_id]), "z": float(node.RxnFZ[combo_id])},
                "reactionMoment": {"x": float(node.RxnMX[combo_id]), "y": float(node.RxnMY[combo_id]), "z": float(node.RxnMZ[combo_id])},
            })
        return results
