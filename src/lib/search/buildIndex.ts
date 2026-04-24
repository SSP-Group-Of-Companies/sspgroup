/**
 * Site search document index.
 *
 * Composes every public SSP Group destination — solutions, industries,
 * locations, lanes, company pages, FAQs, legal, home anchors, and
 * operational shortcuts — into a single, ranked `SearchDoc[]` the
 * search engine scores queries against.
 *
 * Docs are built once at module load (pure data) and reused for every
 * query. Any new public page should add an entry here so the header
 * search picks it up automatically.
 */

import { SEO_LOCATIONS, getSeoLocationPriority } from "@/config/seoLocations";
import { SEO_LANES, getSeoLanePriority } from "@/config/seoLanes";
import {
  getIndustrySlugs,
  getIndustryBySlug,
} from "@/config/industryPages";
import {
  TRUCKLOAD_SOLUTION_PAGE,
  LTL_SOLUTION_PAGE,
  DRY_VAN_SOLUTION_PAGE,
  FLATBED_SOLUTION_PAGE,
  STEP_DECK_SOLUTION_PAGE,
  CONESTOGA_ROLL_TITE_SOLUTION_PAGE,
  RGN_HEAVY_HAUL_SOLUTION_PAGE,
  TEMPERATURE_CONTROLLED_SOLUTION_PAGE,
  HAZMAT_SOLUTION_PAGE,
  EXPEDITED_SOLUTION_PAGE,
  SPECIALIZED_VEHICLES_SOLUTION_PAGE,
  PROJECT_FREIGHT_SOLUTION_PAGE,
  MANAGED_CAPACITY_SOLUTION_PAGE,
  DEDICATED_CONTRACT_SOLUTION_PAGE,
  WAREHOUSING_DISTRIBUTION_SOLUTION_PAGE,
} from "@/config/solutionPages";
import {
  CORE_FREIGHT_MODES_FAMILY_PAGE,
  SPECIALIZED_CRITICAL_FREIGHT_FAMILY_PAGE,
  MANAGED_LOGISTICS_FAMILY_PAGE,
} from "@/config/solutionFamilyPages";
import { SOLUTIONS_HUB_PAGE } from "@/config/solutionsHub";
import { FAQ_CATEGORIES } from "@/config/faqs";
import { LEGAL_PAGES, type LegalPageKey } from "@/config/legal";
import {
  HOME_WHY_SSP_SECTION_ID,
} from "@/config/homeSections";
import { normalize } from "./normalize";
import type { SearchDoc, SearchGroupKey } from "./types";

/* ─────────────────────────────────────────────────────────────────────
 * Helpers
 * ──────────────────────────────────────────────────────────────────── */

function kw(...parts: (string | number | undefined | null | readonly string[])[]): string[] {
  const out = new Set<string>();
  for (const part of parts) {
    if (part === undefined || part === null) continue;
    const values = Array.isArray(part) ? part : [String(part)];
    for (const v of values) {
      const n = normalize(v);
      if (!n) continue;
      out.add(n);
      for (const token of n.split(/\s+/).filter((t) => t.length >= 2)) {
        out.add(token);
      }
    }
  }
  return Array.from(out);
}

type DocInput = Omit<SearchDoc, "keywords"> & { keywords?: readonly string[] };

function doc(input: DocInput): SearchDoc {
  return {
    ...input,
    keywords: input.keywords ?? [],
  };
}

/* ─────────────────────────────────────────────────────────────────────
 * Shortcuts — always-available high-intent destinations
 * ──────────────────────────────────────────────────────────────────── */

const SHORTCUT_DOCS: SearchDoc[] = [
  doc({
    id: "/quote",
    label: "Request a Quote",
    href: "/quote",
    description: "Submit lane, commodity, and service requirements for a freight quote.",
    group: "Shortcuts",
    priority: 100,
    keywords: kw("quote", "rfq", "pricing", "rate", "bid", "estimate", "request", "get quote"),
  }),
  doc({
    id: "/track-shipment",
    label: "Track a Shipment",
    href: "/track-shipment",
    description: "Look up an active shipment by reference number for status and milestones.",
    group: "Shortcuts",
    priority: 95,
    keywords: kw(
      "track",
      "tracking",
      "status",
      "trace",
      "eta",
      "where is my shipment",
      "shipment status",
      "load status",
    ),
  }),
  doc({
    id: "/contact",
    label: "Contact SSP Group",
    href: "/contact",
    description: "Reach operations, sales, and customer support for freight programs.",
    group: "Shortcuts",
    priority: 85,
    keywords: kw("contact", "reach us", "talk to ssp", "customer service", "support", "email", "phone"),
  }),
];

/* ─────────────────────────────────────────────────────────────────────
 * Solutions — hub, families, and every detail page
 * ──────────────────────────────────────────────────────────────────── */

type SolutionPageShape = {
  slug: string;
  meta: { title: string; description: string };
  hero: { eyebrow?: string; title: string; description?: string; subtitle?: string };
  pageSections?: readonly { key: string; label: string; summary: string }[];
  faq?: { items?: readonly { question: string; answer: string }[] };
};

function solutionPageDoc(page: SolutionPageShape, priority = 70): SearchDoc {
  const sectionSummaries = page.pageSections?.map((s) => `${s.label}: ${s.summary}`).join(" ") ?? "";
  return doc({
    id: `/solutions/${page.slug}`,
    label: page.hero.eyebrow ?? page.hero.title,
    href: `/solutions/${page.slug}`,
    description: page.meta.description,
    body: [page.hero.title, page.hero.description ?? page.hero.subtitle ?? "", sectionSummaries]
      .filter(Boolean)
      .join(" "),
    group: "Solutions",
    priority,
    keywords: kw(
      page.slug,
      page.slug.replace(/-/g, " "),
      page.hero.eyebrow,
      page.hero.title,
      page.pageSections?.map((s) => s.label) ?? [],
    ),
  });
}

const SOLUTION_DOCS: SearchDoc[] = [
  // Hub
  doc({
    id: "/solutions",
    label: "Solutions",
    href: "/solutions",
    description: SOLUTIONS_HUB_PAGE.hero.description,
    body: SOLUTIONS_HUB_PAGE.serviceFamilies.description,
    group: "Solutions",
    priority: 80,
    keywords: kw(
      "solutions",
      "services",
      "freight services",
      "freight modes",
      "service families",
      "all solutions",
    ),
  }),

  // Family landing pages
  doc({
    id: "/solutions/core-freight-modes",
    label: "Core Freight Modes",
    href: "/solutions/core-freight-modes",
    description: CORE_FREIGHT_MODES_FAMILY_PAGE.meta.description,
    body: CORE_FREIGHT_MODES_FAMILY_PAGE.hero.subtitle,
    group: "Solutions",
    priority: 75,
    keywords: kw(
      "core freight modes",
      "truckload",
      "tl",
      "ftl",
      "ltl",
      "less than truckload",
      "dry van",
      "flatbed",
      "step deck",
      "conestoga",
      "heavy haul",
      "rgn",
    ),
  }),
  doc({
    id: "/solutions/specialized-critical-freight",
    label: "Specialized & Critical Freight",
    href: "/solutions/specialized-critical-freight",
    description: SPECIALIZED_CRITICAL_FREIGHT_FAMILY_PAGE.meta.description,
    body: SPECIALIZED_CRITICAL_FREIGHT_FAMILY_PAGE.hero.subtitle,
    group: "Solutions",
    priority: 75,
    keywords: kw(
      "specialized",
      "specialized critical",
      "critical freight",
      "expedited",
      "temperature controlled",
      "reefer",
      "hazmat",
      "dangerous goods",
      "tdg",
      "specialized vehicles",
      "project freight",
    ),
  }),
  doc({
    id: "/solutions/managed-logistics",
    label: "Managed Logistics",
    href: "/solutions/managed-logistics",
    description: MANAGED_LOGISTICS_FAMILY_PAGE.meta.description,
    body: MANAGED_LOGISTICS_FAMILY_PAGE.hero.subtitle,
    group: "Solutions",
    priority: 75,
    keywords: kw(
      "managed logistics",
      "managed capacity",
      "3pl",
      "third party logistics",
      "dedicated",
      "contract logistics",
      "warehousing",
      "distribution",
      "project freight",
    ),
  }),

  // Detail pages (each solution)
  solutionPageDoc(TRUCKLOAD_SOLUTION_PAGE, 72),
  solutionPageDoc(LTL_SOLUTION_PAGE, 72),
  solutionPageDoc(DRY_VAN_SOLUTION_PAGE, 68),
  solutionPageDoc(FLATBED_SOLUTION_PAGE, 68),
  solutionPageDoc(STEP_DECK_SOLUTION_PAGE, 66),
  solutionPageDoc(CONESTOGA_ROLL_TITE_SOLUTION_PAGE, 66),
  solutionPageDoc(RGN_HEAVY_HAUL_SOLUTION_PAGE, 66),
  solutionPageDoc(TEMPERATURE_CONTROLLED_SOLUTION_PAGE, 70),
  solutionPageDoc(HAZMAT_SOLUTION_PAGE, 68),
  solutionPageDoc(EXPEDITED_SOLUTION_PAGE, 68),
  solutionPageDoc(SPECIALIZED_VEHICLES_SOLUTION_PAGE, 64),
  solutionPageDoc(PROJECT_FREIGHT_SOLUTION_PAGE, 64),
  solutionPageDoc(MANAGED_CAPACITY_SOLUTION_PAGE, 68),
  solutionPageDoc(DEDICATED_CONTRACT_SOLUTION_PAGE, 66),
  solutionPageDoc(WAREHOUSING_DISTRIBUTION_SOLUTION_PAGE, 68),

  // Cross-border corridor pages (standalone under /solutions/cross-border)
  doc({
    id: "/solutions/cross-border",
    label: "Cross-Border Freight",
    href: "/solutions/cross-border",
    description:
      "Customs-ready corridor execution across Canada, the United States, and Mexico — with documentation discipline, broker coordination, and lane-specific compliance controls.",
    body: "Cross-border freight, CUSMA USMCA, Canada USA Mexico, customs brokerage, pedimento, bilateral trade corridor, CBSA CBP SAT.",
    group: "Solutions",
    priority: 74,
    keywords: kw(
      "cross border",
      "cross-border",
      "border",
      "international",
      "customs",
      "cusma",
      "usmca",
      "nafta",
      "bilateral",
      "corridor",
      "canada us",
      "canada usa",
      "mexico",
      "canada mexico",
    ),
  }),
  doc({
    id: "/solutions/cross-border/canada-usa",
    label: "Canada–USA Cross-Border",
    href: "/solutions/cross-border/canada-usa",
    description:
      "Managed Canada–USA freight programs with CUSMA-aligned documentation, customs brokerage coordination, strategic crossing selection, and structured lane governance.",
    group: "Solutions",
    priority: 72,
    keywords: kw(
      "canada usa",
      "canada us",
      "usa canada",
      "canada united states",
      "bilateral",
      "cusma",
      "usmca",
      "nafta",
      "ontario to usa",
      "border freight",
    ),
  }),
  doc({
    id: "/solutions/cross-border/mexico",
    label: "Mexico Cross-Border",
    href: "/solutions/cross-border/mexico",
    description:
      "Mexico corridor freight programs with pedimento coordination, Laredo-Monterrey lane execution, and CA-US-MX tri-country routing.",
    group: "Solutions",
    priority: 72,
    keywords: kw(
      "mexico",
      "mexican",
      "monterrey",
      "laredo",
      "nuevo laredo",
      "pedimento",
      "mexico border",
      "mx",
      "south of border",
    ),
  }),
  doc({
    id: "/solutions/cross-border/air-freight",
    label: "Air Freight",
    href: "/solutions/cross-border/air-freight",
    description:
      "International air freight forwarding with customs coordination, export documentation, and door-to-airport or door-to-door handoff control.",
    group: "Solutions",
    priority: 60,
    keywords: kw("air freight", "airfreight", "air cargo", "aircargo", "international air", "forwarding"),
  }),
  doc({
    id: "/solutions/cross-border/ocean-freight",
    label: "Ocean Freight",
    href: "/solutions/cross-border/ocean-freight",
    description:
      "Ocean freight forwarding with container routing (FCL/LCL), customs documentation, and port-to-door coordination.",
    group: "Solutions",
    priority: 60,
    keywords: kw(
      "ocean freight",
      "ocean cargo",
      "container",
      "fcl",
      "lcl",
      "port",
      "sea freight",
      "maritime",
      "shipping line",
    ),
  }),
];

/* ─────────────────────────────────────────────────────────────────────
 * Industries — hub + every industry page
 * ──────────────────────────────────────────────────────────────────── */

const INDUSTRY_HUB_DOC: SearchDoc = doc({
  id: "/industries",
  label: "Industries",
  href: "/industries",
  description: "Industry programs and operating models tailored to vertical-specific freight.",
  group: "Industries",
  priority: 75,
  keywords: kw(
    "industries",
    "verticals",
    "sectors",
    "industry programs",
    "industry solutions",
  ),
});

const INDUSTRY_DOCS: SearchDoc[] = [
  INDUSTRY_HUB_DOC,
  ...getIndustrySlugs()
    .map((slug) => getIndustryBySlug(slug))
    .filter((x): x is NonNullable<typeof x> => Boolean(x))
    .map((industry) =>
      doc({
        id: `/industries/${industry.slug}`,
        label: industry.hero.title,
        href: `/industries/${industry.slug}`,
        description: industry.meta.description,
        body: [
          industry.hero.kicker ?? "",
          industry.hero.description,
          industry.whatMatters?.sectionTitle ?? "",
          industry.whatMatters?.intro ?? "",
        ]
          .filter(Boolean)
          .join(" "),
        group: "Industries",
        priority: 68,
        keywords: kw(
          industry.slug,
          industry.slug.replace(/-/g, " "),
          industry.hero.kicker,
          industry.hero.valueHeadline,
          industry.hero.title,
          industry.hero.signals ?? [],
        ),
      }),
    ),
];

/* ─────────────────────────────────────────────────────────────────────
 * Locations — hub + every city page
 * ──────────────────────────────────────────────────────────────────── */

const LOCATION_DOCS: SearchDoc[] = [
  doc({
    id: "/locations",
    label: "Freight by Location",
    href: "/locations",
    description: "Freight shipping services organized by origin and destination city across North America.",
    group: "Locations",
    priority: 70,
    keywords: kw("locations", "cities", "freight by location", "freight cities", "service areas"),
  }),
  ...SEO_LOCATIONS.map((loc) => {
    const priorityMark = getSeoLocationPriority(loc.slug);
    const priorityBoost = priorityMark === "P1" ? 12 : priorityMark === "P2" ? 6 : 0;
    return doc({
      id: `/locations/${loc.slug}`,
      label: `${loc.city}, ${loc.region}`,
      href: `/locations/${loc.slug}`,
      description: loc.metaDescription,
      body: `${loc.intro} ${loc.serviceHighlights.join(" ")}`,
      group: "Locations",
      priority: 55 + priorityBoost,
      keywords: kw(
        loc.city,
        loc.region,
        loc.country,
        `${loc.city} ${loc.region}`,
        `${loc.city} freight`,
        `${loc.city} logistics`,
        `${loc.city} trucking`,
        loc.slug,
        loc.slug.replace(/-/g, " "),
      ),
    });
  }),
];

/* ─────────────────────────────────────────────────────────────────────
 * Lanes — hub + every lane page
 * ──────────────────────────────────────────────────────────────────── */

const LANE_DOCS: SearchDoc[] = [
  doc({
    id: "/lanes",
    label: "Freight Lanes",
    href: "/lanes",
    description: "Origin-to-destination freight lane execution across Canada, the United States, and Mexico.",
    group: "Lanes",
    priority: 70,
    keywords: kw("lanes", "corridors", "routes", "freight lanes", "lane list"),
  }),
  ...SEO_LANES.map((lane) => {
    const priorityMark = getSeoLanePriority(lane.slug);
    const priorityBoost = priorityMark === "P1" ? 14 : priorityMark === "P2" ? 7 : 0;
    return doc({
      id: `/lanes/${lane.slug}`,
      label: `${lane.originLabel} → ${lane.destinationLabel}`,
      href: `/lanes/${lane.slug}`,
      description: lane.metaDescription,
      body: `${lane.intro} ${lane.bestFor.join(" ")}`,
      group: "Lanes",
      priority: 50 + priorityBoost,
      keywords: kw(
        lane.originLabel,
        lane.destinationLabel,
        lane.originLabel.split(",")[0],
        lane.destinationLabel.split(",")[0],
        `${lane.originLabel} to ${lane.destinationLabel}`,
        lane.slug,
        lane.slug.replace(/-/g, " "),
        lane.bestFor,
      ),
    });
  }),
];

/* ─────────────────────────────────────────────────────────────────────
 * Company pages
 * ──────────────────────────────────────────────────────────────────── */

const COMPANY_DOCS: SearchDoc[] = [
  doc({
    id: "/about-us",
    label: "About SSP Group",
    href: "/about-us",
    description:
      "Asset-based freight logistics company with owned capacity across Canada, the United States, and Mexico.",
    group: "Company",
    priority: 72,
    keywords: kw(
      "about",
      "about us",
      "company",
      "who we are",
      "ssp group",
      "asset based",
      "owned capacity",
      "profile",
      "overview",
    ),
  }),
  doc({
    id: "/company/our-history",
    label: "Our History",
    href: "/company/our-history",
    description:
      "From two trucks in 2015 to tri-country freight operations — the SSP Group operating timeline.",
    body: "2015 founding, Milton operations, cross-border growth, CUSMA corridor, SSP Global Forwarding.",
    group: "Company",
    priority: 55,
    keywords: kw(
      "history",
      "our history",
      "timeline",
      "milestones",
      "story",
      "heritage",
      "founded",
      "2015",
      "growth",
    ),
  }),
  doc({
    id: "/company/safety-compliance",
    label: "Safety & Compliance",
    href: "/company/safety-compliance",
    description:
      "Operational discipline across FMCSA, NSC, and SICT regulatory frameworks from dispatch through closeout.",
    body: "FMCSA CSA hours of service HOS, National Safety Code NSC Canada, SICT Mexico, TDG hazmat, carrier safety, equipment maintenance, pre-trip, exception control.",
    group: "Company",
    priority: 62,
    keywords: kw(
      "safety",
      "compliance",
      "safety compliance",
      "safety and compliance",
      "regulatory",
      "fmcsa",
      "csa",
      "nsc",
      "tdg",
      "sict",
      "hours of service",
      "hos",
      "carrier safety",
    ),
  }),
  doc({
    id: "/company/media",
    label: "Media & Gallery",
    href: "/company/media",
    description: "Photos, videos, and press materials from SSP Group operations.",
    group: "Company",
    priority: 45,
    keywords: kw("media", "gallery", "photos", "videos", "press", "press kit", "images"),
  }),
  doc({
    id: "/company/faqs",
    label: "FAQs",
    href: "/company/faqs",
    description:
      "Answers to common questions about services, cross-border execution, equipment, visibility, and program onboarding.",
    group: "Company",
    priority: 60,
    keywords: kw(
      "faq",
      "faqs",
      "frequently asked questions",
      "help",
      "questions",
      "answers",
      "support",
    ),
  }),
  doc({
    id: "/carrier-portal",
    label: "Carrier Portal",
    href: "/carrier-portal",
    description: "Dedicated portal for partner carriers.",
    group: "Company",
    priority: 40,
    keywords: kw("carrier portal", "partner carrier", "owner operator", "carrier login", "broker carrier"),
  }),
];

/* ─────────────────────────────────────────────────────────────────────
 * Careers
 * ──────────────────────────────────────────────────────────────────── */

const CAREERS_DOCS: SearchDoc[] = [
  doc({
    id: "/careers",
    label: "Careers at SSP Group",
    href: "/careers",
    description:
      "Open roles across dispatch, driving, operations, and corporate functions. CDL drivers, logistics coordinators, and more.",
    group: "Careers",
    priority: 72,
    keywords: kw(
      "careers",
      "jobs",
      "hiring",
      "employment",
      "work",
      "join",
      "openings",
      "positions",
      "driver",
      "cdl",
      "trucker",
      "driver jobs",
      "truck driver",
      "owner operator",
    ),
  }),
];

/* ─────────────────────────────────────────────────────────────────────
 * Insights (index only — article pages are API-driven)
 * ──────────────────────────────────────────────────────────────────── */

const INSIGHTS_DOCS: SearchDoc[] = [
  doc({
    id: "/insights",
    label: "Insights",
    href: "/insights",
    description:
      "Operational intelligence, lane updates, and execution-focused perspectives from SSP Group.",
    group: "Insights",
    priority: 65,
    keywords: kw(
      "insights",
      "blog",
      "articles",
      "news",
      "posts",
      "perspectives",
      "resources",
      "updates",
      "market updates",
    ),
  }),
];

/* ─────────────────────────────────────────────────────────────────────
 * FAQ entries — every Q&A becomes a searchable doc
 * ──────────────────────────────────────────────────────────────────── */

const FAQ_DOCS: SearchDoc[] = FAQ_CATEGORIES.flatMap((category, catIdx) =>
  category.items.map((item, itemIdx) =>
    doc({
      id: `/company/faqs#${category.id}-${itemIdx}`,
      label: item.question,
      href: `/company/faqs#${category.id}`,
      description: item.answer,
      body: item.answer,
      group: "Company",
      priority: 35 + (catIdx === 0 ? 2 : 0),
      keywords: kw(category.label, category.id, item.question),
    }),
  ),
);

/* ─────────────────────────────────────────────────────────────────────
 * Legal pages — hub entries for every policy
 * ──────────────────────────────────────────────────────────────────── */

const LEGAL_DOCS: SearchDoc[] = (Object.keys(LEGAL_PAGES) as LegalPageKey[]).map((key) => {
  const page = LEGAL_PAGES[key];
  const labelMap: Record<LegalPageKey, string> = {
    privacy: "Privacy Policy",
    terms: "Terms of Service",
    cookies: "Cookie Policy",
    "cookie-preferences": "Cookie Preferences",
    accessibility: "Accessibility",
  };
  const keywordMap: Record<LegalPageKey, readonly string[]> = {
    privacy: ["privacy", "privacy policy", "data protection", "gdpr", "pii"],
    terms: ["terms", "terms of service", "tos", "terms conditions", "terms of use"],
    cookies: ["cookie", "cookies", "cookie policy", "consent", "tracking"],
    "cookie-preferences": [
      "cookie preferences",
      "cookie settings",
      "consent preferences",
      "manage cookies",
    ],
    accessibility: ["accessibility", "a11y", "wcag", "ada", "accessible"],
  };
  return doc({
    id: page.route,
    label: labelMap[key],
    href: page.route,
    description: page.hero.description,
    body: page.hero.description,
    group: "Legal",
    priority: 48,
    keywords: kw(labelMap[key], keywordMap[key]),
  });
});

/* ─────────────────────────────────────────────────────────────────────
 * Homepage + key anchors
 * ──────────────────────────────────────────────────────────────────── */

const HOME_DOCS: SearchDoc[] = [
  doc({
    id: "/",
    label: "SSP Group — Home",
    href: "/",
    description:
      "Freight logistics across Canada, the United States, and Mexico — asset-based carrier with owned capacity.",
    group: "Company",
    priority: 50,
    keywords: kw("home", "homepage", "ssp group", "ssp"),
  }),
  doc({
    id: `/#${HOME_WHY_SSP_SECTION_ID}`,
    label: "Why SSP Group",
    href: `/#${HOME_WHY_SSP_SECTION_ID}`,
    description: "Why shippers choose SSP Group — operating principles and execution standards.",
    group: "Company",
    priority: 45,
    keywords: kw("why ssp", "why ssp group", "differentiators", "why choose", "why us", "advantages"),
  }),
];

/* ─────────────────────────────────────────────────────────────────────
 * Final index
 * ──────────────────────────────────────────────────────────────────── */

export const SEARCH_DOCS: readonly SearchDoc[] = [
  ...SHORTCUT_DOCS,
  ...HOME_DOCS,
  ...SOLUTION_DOCS,
  ...INDUSTRY_DOCS,
  ...LOCATION_DOCS,
  ...LANE_DOCS,
  ...COMPANY_DOCS,
  ...CAREERS_DOCS,
  ...INSIGHTS_DOCS,
  ...FAQ_DOCS,
  ...LEGAL_DOCS,
];

/** Quick lookup used by "did you mean" to surface the nearest real term. */
export const SEARCH_VOCABULARY: readonly string[] = (() => {
  const out = new Set<string>();
  for (const d of SEARCH_DOCS) {
    for (const token of normalize(d.label).split(/\s+/).filter(Boolean)) {
      if (token.length >= 4) out.add(token);
    }
    for (const k of d.keywords) {
      if (k.length >= 4) out.add(k);
    }
  }
  return Array.from(out);
})();

export type { SearchDoc, SearchGroupKey };
