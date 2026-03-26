import { NAV_INDEX } from "@/lib/chatbot/navIndex";
import { SEO_LOCATIONS } from "@/config/seoLocations";
import { SEO_LANES } from "@/config/seoLanes";
import { getIndustryBySlug, getIndustrySlugs } from "@/config/industryPages";
import { SERVICES } from "@/config/services";

export type SiteSearchResult = {
  label: string;
  href: string;
  description?: string;
  keywords: string[];
  score: number;
};

type SearchCandidate = {
  label: string;
  href: string;
  description?: string;
  keywords: string[];
};

const SMART_ALIASES: Array<Omit<SearchCandidate, "keywords"> & { keywords: string[] }> = [
  {
    label: "Flatbed",
    href: "/solutions/flatbed",
    description: "Open-deck securement freight",
    keywords: ["flatbed", "flat bed", "open deck", "open-deck"],
  },
  {
    label: "Step Deck",
    href: "/solutions/step-deck",
    description: "Drop-deck for tall cargo",
    keywords: ["stepdeck", "step deck", "drop deck", "drop-deck"],
  },
  {
    label: "Dry Van",
    href: "/solutions/dry-van",
    description: "Enclosed truckload freight",
    keywords: ["dryvan", "dry van", "van freight"],
  },
  {
    label: "RGN / Heavy Haul",
    href: "/solutions/rgn-heavy-haul",
    description: "Permit and heavy-haul freight",
    keywords: ["rgn", "oversize", "heavy haul", "oversized"],
  },
  {
    label: "Conestoga / Roll-Tite",
    href: "/solutions/conestoga-roll-tite",
    description: "Covered-deck protection",
    keywords: ["conestoga", "roll tite", "roll-tite", "covered deck"],
  },
  {
    label: "Request a Quote",
    href: "/quote",
    description: "Get pricing and planning support",
    keywords: ["quote", "pricing", "rate", "rfq"],
  },
  {
    label: "Track Shipment",
    href: "/track-shipment",
    description: "Track your active freight status",
    keywords: ["track", "tracking", "shipment", "status"],
  },
];

const LOCATION_CANDIDATES: SearchCandidate[] = SEO_LOCATIONS.map((loc) => ({
  label: `${loc.city}, ${loc.region}`,
  href: `/locations/${loc.slug}`,
  description: `Freight services in ${loc.city}`,
  keywords: [
    loc.city.toLowerCase(),
    loc.region.toLowerCase(),
    loc.slug.toLowerCase(),
    `${loc.city.toLowerCase()} freight`,
    `${loc.city.toLowerCase()} logistics`,
  ],
}));

const LANE_CANDIDATES: SearchCandidate[] = SEO_LANES.map((lane) => ({
  label: `${lane.originLabel} → ${lane.destinationLabel}`,
  href: `/lanes/${lane.slug}`,
  description: lane.title,
  keywords: [
    lane.originLabel.toLowerCase(),
    lane.destinationLabel.toLowerCase(),
    lane.slug.toLowerCase(),
    lane.title.toLowerCase(),
    ...lane.bestFor.map((x) => x.toLowerCase()),
  ],
}));

const INDUSTRY_CANDIDATES: SearchCandidate[] = getIndustrySlugs()
  .map((slug) => getIndustryBySlug(slug))
  .filter((x): x is NonNullable<typeof x> => Boolean(x))
  .map((industry) => ({
    label: industry.hero.title,
    href: `/industries/${industry.slug}`,
    description: industry.hero.description,
    keywords: [
      industry.slug.toLowerCase(),
      industry.hero.kicker?.toLowerCase() ?? "",
      industry.hero.valueHeadline.toLowerCase(),
      industry.hero.title.toLowerCase(),
      ...industry.relatedServices.links.map((x) => x.label.toLowerCase()),
    ].filter(Boolean),
  }));

const STATIC_DESTINATIONS: SearchCandidate[] = [
  {
    label: "Solutions",
    href: "/solutions",
    description: "Explore all freight solutions",
    keywords: ["solutions", "services", "freight modes"],
  },
  {
    label: "Industries",
    href: "/industries",
    description: "Industry programs and vertical expertise",
    keywords: ["industries", "verticals", "sectors"],
  },
  {
    label: "Company",
    href: "/company",
    description: "SSP profile, standards, and network",
    keywords: ["company", "about", "ssp group"],
  },
  {
    label: "Insights",
    href: "/insights",
    description: "Editorial logistics insights and updates",
    keywords: ["insights", "articles", "blog", "news"],
  },
  {
    label: "Careers",
    href: "/careers",
    description: "Open roles across SSP Group",
    keywords: ["careers", "jobs", "hiring", "opportunities"],
  },
];

function resolveSolutionHref(serviceSlug: string, sectionKey?: string) {
  if (serviceSlug === "truckload") {
    if (sectionKey === "dry-van") return "/solutions/dry-van";
    if (sectionKey === "flatbed") return "/solutions/flatbed";
    if (sectionKey === "step-deck") return "/solutions/step-deck";
    if (sectionKey === "rgn-oversize") return "/solutions/rgn-heavy-haul";
    if (sectionKey === "roll-tite-conestoga") return "/solutions/conestoga-roll-tite";
    return "/solutions/truckload";
  }

  if (serviceSlug === "expedited-specialized") {
    if (sectionKey === "specialized-vehicle-programs") return "/solutions/specialized-vehicles";
    return "/solutions/expedited";
  }

  if (serviceSlug === "cross-border") {
    if (sectionKey === "ocean-freight") return "/solutions/ocean-freight";
    if (sectionKey === "air-freight") return "/solutions/air-freight";
    return "/solutions/cross-border";
  }

  if (serviceSlug === "value-added") {
    if (sectionKey === "managed-capacity") return "/solutions/managed-capacity";
    if (sectionKey === "dedicated-contract") return "/solutions/dedicated-contract";
    if (sectionKey === "project-oversize-programs") return "/solutions/project-freight";
    return "/solutions/warehousing-distribution";
  }

  if (serviceSlug === "ltl") return "/solutions/ltl";
  if (serviceSlug === "hazmat") return "/solutions/hazmat";
  if (serviceSlug === "temperature-controlled") return "/solutions/temperature-controlled";
  return "/solutions";
}

const SERVICE_SECTION_CANDIDATES: SearchCandidate[] = Object.values(SERVICES).flatMap((service) => {
  const base: SearchCandidate[] = [
    {
      label: service.hero.kicker,
      href: resolveSolutionHref(service.slug),
      description: service.hero.title,
      keywords: [
        service.slug.toLowerCase(),
        service.hero.kicker.toLowerCase(),
        service.hero.title.toLowerCase(),
      ],
    },
  ];

  const sectionCandidates = (service.sections ?? []).map((section) => ({
    label: section.label,
    href: resolveSolutionHref(service.slug, section.key),
    description: section.trustSnippet?.title ?? section.title,
    keywords: [
      section.key.toLowerCase(),
      section.label.toLowerCase(),
      section.title.toLowerCase(),
      section.description.toLowerCase(),
    ],
  }));

  return [...base, ...sectionCandidates];
});

const NAV_CANDIDATES: SearchCandidate[] = NAV_INDEX.map((n) => ({
  label: n.label,
  href: n.href,
  description: n.description,
  keywords: n.keywords,
}));

const CANDIDATES: SearchCandidate[] = [
  ...STATIC_DESTINATIONS,
  ...SMART_ALIASES,
  ...NAV_CANDIDATES,
  ...SERVICE_SECTION_CANDIDATES,
  ...INDUSTRY_CANDIDATES,
  ...LOCATION_CANDIDATES,
  ...LANE_CANDIDATES,
];

function normalize(value: string) {
  return value.toLowerCase().replace(/[^\w\s-]/g, " ").trim();
}

function compact(value: string) {
  return normalize(value).replace(/\s+/g, "");
}

function toTerms(value: string) {
  return normalize(value).split(/\s+/).filter(Boolean);
}

export function getSiteSearchResults(query: string, limit = 6): SiteSearchResult[] {
  const normalized = normalize(query);
  if (!normalized) return [];

  const terms = toTerms(normalized);
  const compactQuery = compact(normalized);

  const scored = CANDIDATES.map((candidate) => {
    const labelN = normalize(candidate.label);
    const descN = normalize(candidate.description ?? "");
    const hrefN = normalize(candidate.href);
    const keyN = candidate.keywords.map(normalize);
    const keyCompact = keyN.map(compact);
    const labelCompact = compact(candidate.label);

    let score = 0;

    if (labelN === normalized) score += 60;
    if (labelCompact === compactQuery) score += 70;
    if (labelN.includes(normalized)) score += 25;
    if (descN.includes(normalized)) score += 8;

    for (const k of keyN) {
      if (k === normalized) score += 40;
      if (k.includes(normalized)) score += 14;
    }

    for (const k of keyCompact) {
      if (k === compactQuery) score += 45;
    }

    for (const t of terms) {
      if (labelN.includes(t)) score += 8;
      if (descN.includes(t)) score += 3;
      if (hrefN.includes(t)) score += 2;
      if (keyN.some((k) => k.includes(t))) score += 6;
    }

    return { candidate, score };
  })
    .filter((x) => x.score > 0)
    .sort((a, b) => b.score - a.score);

  // Deduplicate by href while keeping best score.
  const deduped: SiteSearchResult[] = [];
  const seen = new Set<string>();
  for (const row of scored) {
    if (seen.has(row.candidate.href)) continue;
    seen.add(row.candidate.href);
    deduped.push({
      label: row.candidate.label,
      href: row.candidate.href,
      description: row.candidate.description,
      keywords: row.candidate.keywords,
      score: row.score,
    });
    if (deduped.length >= limit) break;
  }

  return deduped;
}

