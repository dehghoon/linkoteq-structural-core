"""Experimental one-way surface pressure to parallel edge-member line loads.

Scope: horizontal rectangle, uniform vertical pressure per horizontal plan area,
two full-length opposite edge members, simple tributary-width allocation.
Pure Python, no PyNite dependency. Units: m, kN/m², kN/m.
"""
from dataclasses import dataclass
from math import isfinite, isclose


@dataclass(frozen=True)
class MemberDistributedLoad:
    id: str
    member_id: str
    load_case_id: str
    source_load_id: str
    direction: str
    coordinate_system: str
    w1: float
    w2: float
    x1: float
    x2: float
    force_unit: str = "kN/m"
    length_unit: str = "m"


def transfer_uniform_rectangular_pressure(*, load_id: str, surface_id: str,
                                          load_case_id: str, member_ids: tuple[str, str],
                                          span_m: float, member_length_m: float,
                                          pressure_kn_m2: float,
                                          pressure_basis: str = "horizontal-projected-area",
                                          direction: str = "FZ",
                                          tolerance: float = 1e-9) -> tuple[MemberDistributedLoad, MemberDistributedLoad]:
    """Return equal tributary loads on two parallel edges of a horizontal rectangle.

    span_m is perpendicular distance between supported edges; member_length_m
    is length of each supported edge. Both member IDs must represent the full
    opposite edges, with no openings or overhangs. Negative pressure represents
    uplift; global FZ is positive upward. Geometry is validated by the caller.
    """
    for key, value in (("span_m", span_m), ("member_length_m", member_length_m),
                       ("pressure_kn_m2", pressure_kn_m2), ("tolerance", tolerance)):
        if isinstance(value, bool) or not isinstance(value, (int, float)) or not isfinite(value):
            raise ValueError(f"{key} must be a finite number")
    if span_m <= 0 or member_length_m <= 0 or tolerance <= 0:
        raise ValueError("Lengths and tolerance must be positive")
    if pressure_basis != "horizontal-projected-area" or direction != "FZ":
        raise ValueError("Only vertical pressure per horizontal projected area is supported")
    if len(member_ids) != 2 or any(not isinstance(i, str) or not i.strip() for i in member_ids) or member_ids[0] == member_ids[1]:
        raise ValueError("Exactly two distinct, nonempty member IDs are required")
    if any(not isinstance(i, str) or not i.strip() for i in (load_id, surface_id, load_case_id)):
        raise ValueError("Stable load, surface and case IDs are required")
    # Signed force convention: downward pressure is negative FZ.
    line_load = -pressure_kn_m2 * span_m / 2.0
    output = tuple(
        MemberDistributedLoad(id=f"{load_id}:{member_id}", member_id=member_id,
                              load_case_id=load_case_id, source_load_id=load_id,
                              direction="FZ", coordinate_system="global",
                              w1=line_load, w2=line_load, x1=0.0, x2=float(member_length_m))
        for member_id in member_ids
    )
    expected = -pressure_kn_m2 * span_m * member_length_m
    actual = sum((x.w1 + x.w2) * (x.x2 - x.x1) / 2 for x in output)
    if not isclose(actual, expected, rel_tol=tolerance, abs_tol=tolerance):
        raise ArithmeticError("Surface-to-member force equilibrium check failed")
    return output
