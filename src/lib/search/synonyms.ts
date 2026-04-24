/**
 * Freight-logistics synonym / alias graph used for query expansion.
 *
 * At query time each normalized token is expanded against this map so
 * industry shorthand (FTL, LTL, RFQ, TDG, HAZMAT, 3PL, HQ, CUSMA, etc.)
 * resolves to the canonical destinations users actually want.
 *
 * Keys and values must already be lower-case and diacritic-free — they
 * are matched against the output of `normalize()`.
 *
 * Additions should be reciprocal: adding `"reefer" -> ["temperature controlled"]`
 * should also list the reverse mapping so expansion is symmetric.
 */

import { normalize } from "./normalize";

type RawSynonyms = Record<string, readonly string[]>;

const RAW: RawSynonyms = {
  // Modes — full truckload family
  truckload: ["tl", "ftl", "full truckload", "truck load"],
  tl: ["truckload", "ftl", "full truckload"],
  ftl: ["truckload", "tl", "full truckload"],
  "full truckload": ["truckload", "tl", "ftl"],

  // Less-than-truckload
  ltl: ["less than truckload", "less-than-truckload", "partial", "partial load"],
  "less than truckload": ["ltl", "partial"],
  partial: ["ltl", "partial load", "less than truckload"],

  // Equipment types
  "dry van": ["dryvan", "enclosed van", "box trailer", "dry-van"],
  dryvan: ["dry van", "enclosed van"],
  flatbed: ["open deck", "flat deck", "open-deck", "flat-bed"],
  "open deck": ["flatbed"],
  "step deck": ["drop deck", "stepdeck", "lowboy", "step-deck"],
  stepdeck: ["step deck", "drop deck"],
  "drop deck": ["step deck", "stepdeck"],
  conestoga: ["roll tite", "roll-tite", "curtain side", "tarped", "soft side"],
  "roll tite": ["conestoga"],
  rgn: ["removable gooseneck", "heavy haul", "oversize", "lowboy", "permit load"],
  "heavy haul": ["rgn", "oversize", "oversized", "permit load", "super load"],
  oversize: ["heavy haul", "rgn", "oversized", "permit load"],

  // Temperature controlled
  reefer: ["temperature controlled", "refrigerated", "cold chain", "chilled", "temp"],
  "temperature controlled": ["reefer", "refrigerated", "cold chain", "chilled", "temp"],
  refrigerated: ["reefer", "temperature controlled", "cold chain"],
  "cold chain": ["reefer", "temperature controlled", "refrigerated"],
  temp: ["temperature", "temperature controlled", "reefer"],

  // Hazmat / dangerous goods
  hazmat: ["hazardous", "dangerous goods", "tdg", "dg", "regulated materials", "placarded"],
  hazardous: ["hazmat", "dangerous goods", "tdg", "dg"],
  "dangerous goods": ["hazmat", "tdg", "dg", "hazardous"],
  tdg: ["hazmat", "transport dangerous goods", "dangerous goods"],
  dg: ["hazmat", "dangerous goods", "tdg"],

  // Expedited
  expedited: ["rush", "priority", "time critical", "urgent", "hot shot", "expedite"],
  rush: ["expedited", "urgent", "priority", "time critical"],
  urgent: ["expedited", "rush", "priority"],
  "time critical": ["expedited", "rush", "priority"],
  "hot shot": ["expedited", "rush"],

  // Managed logistics / 3PL
  "3pl": [
    "third party logistics",
    "managed logistics",
    "managed capacity",
    "third-party logistics",
  ],
  "third party logistics": ["3pl", "managed logistics"],
  "managed logistics": ["3pl", "managed capacity", "program", "third party logistics"],
  "managed capacity": ["managed logistics", "3pl", "program"],
  "dedicated contract": ["dedicated", "contract logistics", "dedicated fleet"],
  dedicated: ["dedicated contract", "dedicated fleet", "contract logistics"],

  // Warehousing
  warehousing: [
    "warehouse",
    "storage",
    "distribution center",
    "dc",
    "cross dock",
    "cross-dock",
    "fulfillment",
  ],
  warehouse: ["warehousing", "storage", "distribution center"],
  storage: ["warehousing", "warehouse"],
  "distribution center": ["warehousing", "dc", "warehouse"],
  dc: ["distribution center", "warehouse"],
  "cross dock": ["warehousing", "cross-dock"],

  // Cross-border
  "cross border": ["cross-border", "border", "international", "international freight"],
  "cross-border": ["cross border", "border", "international"],
  border: ["cross border", "cross-border", "customs"],
  customs: ["broker", "border", "entry", "cbsa", "cbp", "sat"],
  broker: ["customs", "brokerage"],

  // Corridor / country shorthand
  "canada usa": ["canada us", "usa canada", "bilateral", "canada united states", "cusma", "usmca"],
  "canada us": ["canada usa", "bilateral", "cusma", "usmca"],
  cusma: ["usmca", "nafta", "canada us mexico", "canada usa mexico"],
  usmca: ["cusma", "nafta", "canada us mexico"],
  nafta: ["cusma", "usmca"],
  mexico: ["mexican", "south", "laredo", "monterrey", "pedimento", "mx"],
  mexican: ["mexico"],

  // Actions users search for
  quote: ["rfq", "rate", "pricing", "estimate", "bid", "get quote", "request quote"],
  rfq: ["quote", "request for quote", "rate", "bid"],
  rate: ["quote", "pricing", "rfq"],
  pricing: ["quote", "rate", "rfq", "cost"],
  estimate: ["quote", "rate"],
  track: ["tracking", "status", "shipment status", "where is my shipment", "trace", "eta"],
  tracking: ["track", "status", "trace", "shipment status", "eta"],
  status: ["tracking", "track", "eta", "update"],
  trace: ["track", "tracking"],
  eta: ["tracking", "status", "arrival"],
  ship: ["shipping", "shipment", "send", "freight"],
  shipment: ["ship", "shipping", "load", "freight"],
  freight: ["cargo", "load", "shipment", "goods"],
  cargo: ["freight", "goods", "shipment"],
  load: ["shipment", "freight", "truckload"],

  // Careers
  driver: ["drivers", "trucker", "truck driver", "driving job", "drive", "cdl"],
  cdl: ["driver", "truck driver", "driving"],
  trucker: ["driver", "truck driver"],
  careers: ["jobs", "hiring", "work", "employment", "openings", "positions", "join"],
  jobs: ["careers", "hiring", "work", "openings", "positions"],
  job: ["jobs", "career", "hiring", "position", "opening"],
  hiring: ["jobs", "careers", "now hiring", "driver jobs", "recruit"],
  career: ["careers", "job"],

  // Company
  about: ["company", "who we are", "profile", "about us", "overview"],
  company: ["about", "ssp group", "who we are"],
  "ssp group": ["company", "ssp", "about"],
  ssp: ["ssp group", "company"],
  history: ["our history", "timeline", "milestones", "story", "heritage"],
  safety: ["compliance", "safety and compliance", "fmcsa", "nsc", "csa", "tdg"],
  compliance: ["safety", "regulatory", "fmcsa", "nsc", "safety compliance"],
  fmcsa: ["safety", "compliance", "usa safety"],
  nsc: ["safety", "compliance", "canada safety"],
  media: ["gallery", "videos", "photos", "press"],
  press: ["media", "news"],
  contact: ["reach us", "get in touch", "support", "contact us"],
  support: ["contact", "help"],
  help: ["support", "faq", "contact"],
  faq: ["faqs", "questions", "help", "frequently asked questions"],
  faqs: ["faq", "questions", "help"],

  // Insights
  insights: ["blog", "articles", "news", "posts", "perspectives", "resources"],
  blog: ["insights", "articles", "news", "posts"],
  articles: ["insights", "blog", "posts"],
  news: ["insights", "blog"],

  // Locations — headquarters & majors
  milton: ["milton on", "milton ontario", "headquarters", "hq", "head office", "home base"],
  hq: ["headquarters", "head office", "milton", "milton on"],
  headquarters: ["hq", "milton", "head office"],
  toronto: ["toronto on", "gta", "greater toronto"],
  gta: ["toronto", "greater toronto"],
  montreal: ["montreal qc", "quebec", "mtl"],
  mtl: ["montreal"],
  chicago: ["chicago il", "chicago illinois", "midwest"],
  dallas: ["dallas tx", "dallas fort worth", "dfw", "north texas"],
  dfw: ["dallas", "dallas fort worth"],
  houston: ["houston tx", "gulf coast"],
  laredo: ["laredo tx", "mexican border", "laredo texas"],
  monterrey: ["monterrey nl", "monterrey mexico", "nuevo leon"],
  detroit: ["detroit mi", "motor city"],
  buffalo: ["buffalo ny"],
  "port huron": ["port huron mi", "blue water"],
  ontario: ["on", "canada", "ontario province"],
  quebec: ["qc", "montreal"],
  texas: ["tx"],
  illinois: ["il"],
  michigan: ["mi"],
  canada: ["canadian", "ca"],
  canadian: ["canada"],
  "united states": ["us", "usa", "america", "american"],
  usa: ["united states", "us", "america"],
  america: ["united states", "us", "usa"],

  // Industries
  food: ["food beverage", "grocery", "fresh", "cold chain", "fnb", "f&b"],
  "food beverage": ["food", "grocery", "fnb"],
  beverage: ["food beverage", "grocery", "drinks"],
  grocery: ["food", "food beverage"],
  retail: ["retail consumer", "consumer goods", "stores", "ecommerce", "e-commerce"],
  consumer: ["retail", "consumer goods", "consumer packaged goods", "cpg"],
  cpg: ["consumer goods", "consumer packaged goods"],
  ecommerce: ["retail", "e-commerce", "fulfillment"],
  automotive: ["auto", "car", "oem", "jit", "vehicles", "auto industry"],
  auto: ["automotive", "car", "vehicles"],
  oem: ["automotive", "manufacturing", "tier one"],
  manufacturing: ["industrial", "factory", "plant", "manufacturing materials"],
  industrial: ["manufacturing", "factory"],
  steel: ["metals", "aluminum", "metal", "steel aluminum"],
  metals: ["steel", "aluminum", "metal"],
  aluminum: ["steel", "metals", "metal"],
  construction: ["building materials", "construction materials", "rebar", "aggregate"],
  "building materials": ["construction"],
  chemical: ["plastics", "chemicals", "resins", "chemical plastics"],
  chemicals: ["chemical", "plastics"],
  plastics: ["chemical", "resins"],

  // Legal / policy
  privacy: ["privacy policy", "data", "gdpr", "pii", "data protection"],
  "privacy policy": ["privacy", "data protection"],
  cookies: ["cookie", "cookie policy", "consent", "tracking preferences", "cookie preferences"],
  cookie: ["cookies", "cookie policy", "consent"],
  consent: ["cookies", "cookie preferences", "privacy"],
  terms: ["terms of service", "tos", "conditions", "terms of use", "terms conditions"],
  "terms of service": ["terms", "tos"],
  tos: ["terms", "terms of service"],
  accessibility: ["a11y", "wcag", "ada", "accessible"],
  a11y: ["accessibility", "wcag", "ada"],
  wcag: ["accessibility", "a11y", "ada"],

  // Operational vocabulary
  pickup: ["origin", "pick up", "collect"],
  delivery: ["destination", "drop", "unload", "deliver"],
  origin: ["pickup", "from"],
  destination: ["delivery", "to"],
  lane: ["lanes", "corridor", "route", "freight lane"],
  lanes: ["lane", "corridors", "routes"],
  corridor: ["lane", "route"],
  route: ["lane", "corridor", "routing"],
  "specialized vehicles": ["enclosed auto", "vehicle transport", "auto transport", "car hauler"],
  project: ["project freight", "project cargo", "oversized project"],
  "project freight": ["project", "project cargo"],
};

function buildSymmetricMap(raw: RawSynonyms): ReadonlyMap<string, readonly string[]> {
  const merge = new Map<string, Set<string>>();

  const addPair = (a: string, b: string) => {
    const aN = normalize(a);
    const bN = normalize(b);
    if (!aN || !bN || aN === bN) return;
    if (!merge.has(aN)) merge.set(aN, new Set());
    if (!merge.has(bN)) merge.set(bN, new Set());
    merge.get(aN)!.add(bN);
    merge.get(bN)!.add(aN);
  };

  for (const [key, values] of Object.entries(raw)) {
    for (const v of values) addPair(key, v);
  }

  // Transitive closure (BFS per node) — modest size so the cost is negligible.
  const finalized = new Map<string, readonly string[]>();
  for (const [key] of merge) {
    const visited = new Set<string>([key]);
    const stack = [key];
    while (stack.length) {
      const next = stack.pop()!;
      const neighbors = merge.get(next);
      if (!neighbors) continue;
      for (const n of neighbors) {
        if (!visited.has(n)) {
          visited.add(n);
          stack.push(n);
        }
      }
    }
    visited.delete(key);
    finalized.set(key, Array.from(visited));
  }

  return finalized;
}

const SYNONYM_MAP = buildSymmetricMap(RAW);

/** Expand a single normalized token (or phrase) into itself plus all known aliases. */
export function expandToken(token: string): string[] {
  const n = normalize(token);
  if (!n) return [];
  const aliases = SYNONYM_MAP.get(n);
  if (!aliases) return [n];
  return [n, ...aliases];
}

/**
 * Expand a full query phrase by trying the whole phrase first,
 * then each individual token. Deduplicated.
 */
export function expandQueryTerms(phrase: string): string[] {
  const n = normalize(phrase);
  if (!n) return [];
  const out = new Set<string>();
  out.add(n);
  for (const alias of SYNONYM_MAP.get(n) ?? []) out.add(alias);
  for (const t of n.split(/\s+/).filter(Boolean)) {
    out.add(t);
    for (const alias of SYNONYM_MAP.get(t) ?? []) out.add(alias);
  }
  return Array.from(out);
}
