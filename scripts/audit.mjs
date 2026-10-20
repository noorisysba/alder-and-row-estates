import fs from "node:fs";
import path from "node:path";
import assert from "node:assert/strict";
import ts from "typescript";
const cache = new Map();
function load(file) {
  file = path.resolve(file);
  if (cache.has(file)) return cache.get(file);
  const module = { exports: {} };
  cache.set(file, module.exports);
  const output = ts.transpileModule(fs.readFileSync(file, "utf8"), {
    compilerOptions: {
      module: ts.ModuleKind.CommonJS,
      target: ts.ScriptTarget.ES2022,
    },
  }).outputText;
  new Function("require", "module", "exports", output)(
    (name) =>
      load(
        path.resolve(
          name.startsWith("@/") ? "." : path.dirname(file),
          name.replace(/^@\//, ""),
        ) + ".ts",
      ),
    module,
    module.exports,
  );
  return module.exports;
}
const { properties, money } = load("data/properties.ts");
const { areas } = load("data/areas.ts");
const { filterProperties, emptyFilters } = load("lib/filter.ts");
assert.equal(properties.length, 30);
assert.equal(areas.length, 15);
assert.equal(new Set(properties.map((p) => p.slug)).size, 30);
for (const [category, count] of [
  ["buy", 12],
  ["rent", 10],
  ["commercial", 8],
])
  assert.equal(properties.filter((p) => p.category === category).length, count);
for (const p of properties) {
  assert(
    p.gallery.length >= 5 && p.gallery.length <= 8,
    p.slug + " gallery count",
  );
  assert.equal(
    new Set(p.gallery).size,
    p.gallery.length,
    p.slug + " repeated gallery image",
  );
  assert(p.highlights.length >= 5 && p.highlights.length <= 8);
  assert(areas.some((a) => a.name === p.area));
  assert(p.price > 0 && p.size > 0);
  for (const image of new Set([p.image, ...p.gallery]))
    for (const ext of [".jpg", "-640.webp", "-1280.webp"])
      assert(fs.existsSync("public/assets/" + image + ext), image + ext);
}
for (const a of areas)
  assert(
    fs.existsSync("public/assets/" + a.image + ".jpg"),
    a.name + " photograph",
  );
const sale = properties.filter((p) => p.category === "buy");
const rent = properties.filter((p) => p.category === "rent");
const commercial = properties.filter((p) => p.category === "commercial");
assert.equal(
  filterProperties(sale, { ...emptyFilters, location: "notting hill" }).length,
  1,
);
assert(
  filterProperties(sale, {
    ...emptyFilters,
    min: "600000",
    max: "1500000",
    beds: "2",
  }).every((p) => p.price >= 600000 && p.price <= 1500000 && p.beds >= 2),
);
assert.equal(
  filterProperties(rent, { ...emptyFilters, beds: "studio" })[0].beds,
  0,
);
assert(
  filterProperties(rent, {
    ...emptyFilters,
    furnishing: "Furnished",
    availability: "Available now",
  }).every((p) => p.furnishing === "Furnished" && p.status === "Available now"),
);
assert.equal(
  filterProperties(commercial, { ...emptyFilters, transaction: "Sale" }).length,
  2,
);
const sorted = filterProperties(sale, { ...emptyFilters, sort: "price-asc" });
assert(sorted.every((p, i) => !i || sorted[i - 1].price <= p.price));
assert.equal(
  filterProperties(sale, { ...emptyFilters, location: "No such neighbourhood" })
    .length,
  0,
);
assert.equal(
  filterProperties(sale, { ...emptyFilters, saved: "1" }, [sale[0].id]).length,
  1,
);
assert(money(rent[0]).endsWith("pcm"));
console.log(
  "PASS: 30 listings (12 sale / 10 rent / 8 commercial), 15 areas, unique slugs, complete galleries, local image variants, location/price/bedroom/furnishing/availability/transaction/shortlist filters and sorting.",
);
if (process.argv.includes("--routes")) {
  const routes = [
    "/",
    "/buy",
    "/rent",
    "/commercial",
    "/shortlist",
    "/area-guides",
    "/services",
    "/about",
    "/contact",
    "/valuation",
    "/privacy",
    "/cookies",
    "/credits",
    ...areas.map((a) => "/area-guides/" + a.slug),
    ...properties.map((p) => "/properties/" + p.slug),
  ];
  let checked = 0;
  for (let i = 0; i < routes.length; i += 6)
    await Promise.all(
      routes.slice(i, i + 6).map(async (route) => {
        const response = await fetch("http://localhost:3000" + route);
        assert.equal(response.status, 200, route);
        const html = await response.text();
        assert(html.includes("<h1"), route + " missing content");
        checked++;
      }),
    );
  console.log(
    `PASS: ${checked} routes returned HTTP 200 with real page content.`,
  );
}
