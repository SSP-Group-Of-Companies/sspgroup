import fs from "node:fs";
import path from "node:path";

const DIRS = [
  path.join(process.cwd(), "src", "config"),
  path.join(process.cwd(), "src", "app", "(site)"),
  path.join(process.cwd(), "src", "lib"),
];
const EXTS = new Set([".ts", ".tsx"]);
const list = [];
function walk(d) {
  for (const n of fs.readdirSync(d, { withFileTypes: true })) {
    if (n.name === "node_modules" || n.name === ".next" || n.name.startsWith(".")) continue;
    const f = path.join(d, n.name);
    if (n.isDirectory()) walk(f);
    else if (EXTS.has(path.extname(n.name))) list.push(f);
  }
}
for (const d of DIRS) {
  if (fs.existsSync(d)) walk(d);
}

const PAIRS = [
  ["We manages", "We manage"],
  ["We operates", "We operate"],
  ["We runs", "We run"],
  ["We qualifies", "We qualify"],
  ["We uses", "We use"],
  ["We supports", "We support"],
  ["We coordinates", "We coordinate"],
  ["We confirms", "We confirm"],
  ["We aligns", "We align"],
  ["We provides", "We provide"],
  ["We structures", "We structure"],
  ["We links", "We link"],
  ["We handles", "We handle"],
  ["We builds", "We build"],
  ["We dispatches", "We dispatch"],
  ["We executes", "We execute"],
  ["We communicates", "We communicate"],
  ["We equips", "We equip"],
  ["We plans", "We plan"],
  ["We reviews", "We review"],
  ["We returns", "We return"],
  ["We validates", "We validate"],
  ["We governs", "We govern"],
  ["We designs", "We design"],
  ["We scales", "We scale"],
  ["We treats", "We treat"],
  ["We applies", "We apply"],
  ["We prioritizes", "We prioritize"],
  ["We shares", "We share"],
  ["We defines", "We define"],
  ["We started", "We started"],
  ["We needs", "We need"],
].filter(([a, b]) => a !== b);
for (const fp of list) {
  let s = fs.readFileSync(fp, "utf8");
  const o = s;
  for (const [a, b] of PAIRS) s = s.split(a).join(b);
  if (s !== o) fs.writeFileSync(fp, s, "utf8");
}
console.log("done");
