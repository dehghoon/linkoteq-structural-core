import assert from "node:assert/strict";
import { readFileSync } from "node:fs";
import test from "node:test";

function readJson(path: string) {
  return JSON.parse(readFileSync(new URL(path, import.meta.url), "utf8"));
}

type Station = {
  id: string;
  provinceOrTerritory: string;
  q10KPa: number;
  q50KPa: number;
};

test("NBC 2020 wind pressure catalog covers the full station list", () => {
  const { source, records }: { source: { printing: number }; records: Station[] } =
    readJson("../catalogs/climate/nbcc-2020/wind-pressure-second-printing.json");
  const locations: { records: { id: string }[] } =
    readJson("../catalogs/locations/canadian-location-index.json");
  const byId = new Map(records.map((station) => [station.id, station]));

  assert.equal(source.printing, 2);
  assert.equal(records.length, 680);
  assert.equal(byId.size, 680);
  assert.equal(new Set(records.map((station) => station.provinceOrTerritory)).size, 13);
  assert.ok(locations.records.every(({ id }) => byId.has(id)));
  assert.ok(records.every(({ q10KPa, q50KPa }) => q10KPa > 0 && q10KPa <= q50KPa));

  const referenceChecks = [
    ["CA/Ontario/Toronto%20(City%20Hall)", 0.34, 0.44],
    ["CA/British%20Columbia/Vancouver%20(City%20Hall)", 0.34, 0.45],
    ["CA/Ontario/Windsor", 0.37, 0.47],
    ["CA/Quebec/Windsor", 0.25, 0.32],
    ["CA/Nunavut/Resolution%20Island", 0.96, 1.23],
  ] as const;

  for (const [id, q10, q50] of referenceChecks) {
    const station = byId.get(id);
    assert.deepEqual([station?.q10KPa, station?.q50KPa], [q10, q50], id);
  }
});
