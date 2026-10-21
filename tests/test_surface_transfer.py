import unittest
from surface_transfer.one_way import transfer_uniform_rectangular_pressure


class TransferTests(unittest.TestCase):
    def args(self):
        return dict(load_id="snow-1", surface_id="roof-1", load_case_id="S",
                    member_ids=("beam-a", "beam-b"), span_m=6.0,
                    member_length_m=10.0, pressure_kn_m2=2.4)

    def test_resultant_and_provenance(self):
        loads = transfer_uniform_rectangular_pressure(**self.args())
        self.assertEqual([x.w1 for x in loads], [-7.2, -7.2])
        self.assertAlmostEqual(sum(x.w1 * (x.x2 - x.x1) for x in loads), -144.0)
        self.assertEqual([x.member_id for x in loads], ["beam-a", "beam-b"])
        self.assertTrue(all(x.source_load_id == "snow-1" and x.load_case_id == "S" for x in loads))
        self.assertTrue(all(x.coordinate_system == "global" and x.direction == "FZ" for x in loads))

    def test_uplift(self):
        args = self.args()
        args["pressure_kn_m2"] = -1.0
        self.assertEqual(transfer_uniform_rectangular_pressure(**args)[0].w1, 3.0)

    def test_rejects_unsupported_or_invalid(self):
        for change in ({"span_m": 0}, {"pressure_kn_m2": float("nan")},
                       {"member_ids": ("same", "same")}, {"direction": "FX"},
                       {"pressure_basis": "surface-normal"}):
            with self.subTest(change=change), self.assertRaises(ValueError):
                transfer_uniform_rectangular_pressure(**(self.args() | change))


if __name__ == "__main__":
    unittest.main()
