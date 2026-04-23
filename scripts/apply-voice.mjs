/**
 * Marketing copy: "SSP <verb>…" → "We <verb>…" where it reads as reporting.
 * Preserves: SSP Group, SSP Truckline Inc., SSP Global Forwarding.
 * Run: node scripts/apply-voice.mjs
 */
import fs from "node:fs";
import path from "node:path";

const DIRS = [
  path.join(process.cwd(), "src", "config"),
  path.join(process.cwd(), "src", "app", "(site)"),
];
const EXTS = new Set([".ts", ".tsx"]);
const files = [];
function walk(d) {
  for (const n of fs.readdirSync(d, { withFileTypes: true })) {
    if (n.name === "node_modules" || n.name === ".next" || n.name.startsWith(".")) continue;
    const f = path.join(d, n.name);
    if (n.isDirectory()) walk(f);
    else if (EXTS.has(path.extname(n.name))) files.push(f);
  }
}
for (const d of DIRS) walk(d);

const PROTECT = [
  [/\bSSP Group\b/g, "§G§"],
  [/\bSSP Truckline Inc\.?/g, "§T§"],
  [/\bSSP Global Forwarding\b/g, "§F§"],
];

const PHRASES = [
  ["SSP operating standards vs.", "Our operating standards vs."],
  ["SSP vs. typical market practice", "Our approach vs. typical market practice"],
  [
    "The execution principles that make SSP different in truckload",
    "The execution principles that set us apart in truckload",
  ],
  ["The operating sequence SSP uses to structure", "The operating sequence we use to structure"],
  ["The operating sequence SSP follows", "The operating sequence we follow"],
  ["This is the operating sequence SSP follows", "This is the operating sequence we follow"],
  ["The full scope of what SSP manages", "The full scope of what we manage"],
  [
    "How SSP qualifies, dispatches, and closes a dry van shipment",
    "How we qualify, dispatch, and close a dry van shipment",
  ],
  [
    "How SSP qualifies, dispatches, and closes a flatbed shipment",
    "How we qualify, dispatch, and close a flatbed shipment",
  ],
  [
    "How SSP qualifies, dispatches, and closes a step deck shipment",
    "How we qualify, dispatch, and close a step deck shipment",
  ],
  [
    "How SSP qualifies, dispatches, and closes a Conestoga shipment",
    "How we qualify, dispatch, and close a Conestoga shipment",
  ],
  [
    "How SSP qualifies, dispatches, and closes an RGN or heavy haul shipment",
    "How we qualify, dispatch, and close an RGN or heavy haul shipment",
  ],
  ["How SSP qualifies, dispatches, and closes", "How we qualify, dispatch, and close"],
  ["Fit-first routing into adjacent SSP services", "Fit-first routing into adjacent services"],
  ["adjacent SSP equipment and service paths", "adjacent equipment and service paths"],
  ["The next SSP paths to review", "The next service paths to review"],
  ["the next SSP paths to review", "the next service paths to review"],
  ["The first SSP paths to review", "The first service paths to review"],
  ["the first SSP paths to review", "the first service paths to review"],
  ["to identify the better SSP path", "to identify a better service path"],
  ["The better SSP path", "A better service path"],
  ["the better SSP path", "a better service path"],
  ["What SSP needs to structure the move", "What we need to structure the move"],
  ["what SSP needs to structure the move", "what we need to structure the move"],
  ["and what SSP needs to structure the move", "and what we need to structure the move"],
  ["What SSP needs", "What we need"],
  ["what SSP needs", "what we need"],
  ["What SSP Moves", "What we move"],
  ["When another SSP service", "When another service"],
  ["Where SSP routes the shipper", "Where we route the shipper"],
  ["embedded SSP overview video", "embedded overview video"],
  [
    "That discipline is built into how SSP runs every load",
    "That discipline is built into how we run every load",
  ],
  ["How SSP runs freight on the ground", "How we run freight on the ground"],
  ["how SSP runs freight on the ground", "how we run freight on the ground"],
  ["How SSP runs freight", "How we run freight"],
  ["how SSP runs freight", "how we run freight"],
  [
    "Fleet, operations, and company footage that shows how SSP runs freight on the ground",
    "Fleet, operations, and company footage that shows how we run freight on the ground",
  ],
  ["How does SSP approach", "How do we approach"],
  ["How does SSP handle", "How do we handle"],
  ["How does SSP control", "How do we control"],
  ["How does SSP reduce", "How do we reduce"],
  ["How does SSP align", "How do we align"],
  ["What does SSP provide", "What do we provide"],
  ["Can SSP support", "Can we support"],
  ["Can SSP align", "Can we align"],
  ["Does SSP handle", "Do we handle"],
];

/** Applied after verb pass — avoids "Yes. We manages" (from ". SSP " + "manages"). */
const PHRASES_AFTER_VERB = [
  [". SSP ", ". We "],
  ["? SSP ", "? We "],
  [": SSP ", ": We "],
  [", SSP ", ", we "],
  ["— SSP ", "— we "],
  [".\"SSP ", ".\"We "],
  ['"SSP ', '"We '],
];

const VERB = {
  qualifies: "We qualify",
  plans: "We plan",
  reviews: "We review",
  confirms: "We confirm",
  communicates: "We communicate",
  dispatches: "We dispatch",
  transitions: "We transition",
  coordinates: "We coordinate",
  provides: "We provide",
  supports: "We support",
  manages: "We manage",
  moves: "We move",
  operates: "We operate",
  links: "We link",
  aligns: "We align",
  uses: "We use",
  follows: "We follow",
  keeps: "We keep",
  routes: "We route",
  executes: "We execute",
  equips: "We equip",
  transitioned: "We transitioned",
  began: "We began",
  pairs: "We pair",
  builds: "We build",
  runs: "We run",
  will: "We will",
  can: "We can",
  should: "We should",
  needs: "We need",
  need: "We need",
  started: "We started",
  starts: "We start",
  treats: "We treat",
  applies: "We apply",
  prioritizes: "We prioritize",
  handles: "We handle",
  holds: "We hold",
  shares: "We share",
  defines: "We define",
  governs: "We govern",
  returns: "We return",
  validates: "We validate",
  designs: "We design",
  structures: "We structure",
  scales: "We scale",
  grows: "We grow",
};

function rewrite(s) {
  for (const [re, ph] of PROTECT) s = s.replace(re, ph);
  for (const [a, b] of PHRASES) s = s.split(a).join(b);
  for (const [v, out] of Object.entries(VERB)) s = s.split(`SSP ${v}`).join(out);
  for (const [a, b] of PHRASES_AFTER_VERB) s = s.split(a).join(b);
  s = s.replace(/SSP is built on/gi, "We're built on");
  s = s.replace(/SSP is built to/gi, "We're built to");
  s = s.replace(/SSP is built/gi, "We're built");
  s = s.replace(
    /SSP safety and compliance in practice/gi,
    "Our safety and compliance in practice",
  );
  s = s.replace(
    /under SSP operating standards/gi,
    "under our operating standards",
  );
  s = s.replace(
    /under SSP operating oversight/gi,
    "under our operating oversight",
  );
  s = s.replace(
    /highlighting SSP operating locations/gi,
    "highlighting our operating locations",
  );
  s = s.replace(/how SSP grows/g, "how we grow");
  s = s.replace(
    /The leadership team is accountable for how SSP grows/g,
    "The leadership team is accountable for how we grow",
  );
  s = s.replace(
    /SSP equipment or clearly relevant freight equipment/gi,
    "our equipment or clearly relevant freight equipment",
  );
  s = s.replace(/§G§/g, "SSP Group");
  s = s.replace(/§T§/g, "SSP Truckline Inc.");
  s = s.replace(/§F§/g, "SSP Global Forwarding");
  return s;
}
for (const fp of files) {
  const orig = fs.readFileSync(fp, "utf8");
  const n = rewrite(orig);
  if (n !== orig) {
    fs.writeFileSync(fp, n, "utf8");
    console.log(path.relative(process.cwd(), fp));
  }
}
console.log("ok");
