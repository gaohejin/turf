import { Feature, FeatureCollection, Polygon, MultiPolygon } from "geojson";
import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";
import { loadJsonFileSync } from "load-json-file";
import Benchmark, { Event } from "benchmark";
import { mask as turfMask } from "./index.js";

const __dirname = path.dirname(fileURLToPath(import.meta.url));

const suite = new Benchmark.Suite("turf-mask");

const directories = {
  in: path.join(__dirname, "test", "in") + path.sep,
  out: path.join(__dirname, "test", "out") + path.sep,
};

let fixtures = fs.readdirSync(directories.in).map((filename) => {
  return {
    name: path.parse(filename).name,
    geojson: loadJsonFileSync(
      path.join(directories.in, filename)
    ) as FeatureCollection<Polygon | MultiPolygon>,
  };
});

for (const { name, geojson } of fixtures) {
  const [polygon, masking] = geojson.features;
  suite.add(name, () => turfMask(polygon, masking as Feature<Polygon>));
}

// basic x 4,627 ops/sec ±25.23% (21 runs sampled)
// mask-outside x 3,892 ops/sec ±34.80% (15 runs sampled)
// multi-polygon x 5,837 ops/sec ±3.03% (91 runs sampled)
// overlapping x 22,326 ops/sec ±1.34% (90 runs sampled)
suite
  .on("cycle", (event: Event) => {
    console.log(String(event.target));
  })
  .run();
