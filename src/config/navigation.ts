import { INDUSTRY_KEYS, type IndustryKey } from "./industryKeys";
import { getIndustryByKey } from "./industryPages";

export type NavLink = {
  label: string;
  href: string;
  description?: string;
  icon?:
    | "truck"
    | "package"
    | "train"
    | "zap"
    | "shield"
    | "snowflake"
    | "globe"
    | "warehouse"
    | "briefcase"
    | "building"
    | "map"
    | "phone";
  children?: readonly NavLink[];
};

export type NavSection = {
  label: string;
  intro: {
    title: string;
    description: string;
    ctaLabel: string;
    ctaHref: string;
  };
  links: readonly NavLink[];
};

const INDUSTRY_NAV_LINK_CONTENT: Record<IndustryKey, Omit<NavLink, "href">> = {
  automotive: {
    label: "Automotive",
    description: "Production-critical logistics with OEM-grade timing and asset protection.",
    icon: "truck",
  },
  manufacturing: {
    label: "Manufacturing",
    description: "Inbound rhythm and throughput stability for production supply chains.",
    icon: "package",
  },
  retail: {
    label: "Retail & Consumer Goods",
    description: "Store replenishment and DC lanes with service-level discipline.",
    icon: "warehouse",
  },
  food: {
    label: "Food & Beverage",
    description: "Cold chain execution protecting freshness, quality, and compliance.",
    icon: "snowflake",
  },
  construction: {
    label: "Construction & Building Materials",
    description: "Permit-aware planning and safety-governed delivery to active project sites.",
    icon: "building",
  },
  "steel-aluminum": {
    label: "Steel & Metals",
    description: "Engineered securement and compliance for high-density freight.",
    icon: "shield",
  },
  "chemical-plastics": {
    label: "Chemical & Plastics",
    description: "Carrier-qualified execution with document control for regulated freight.",
    icon: "zap",
  },
};

function getIndustryNavHref(key: IndustryKey) {
  const industry = getIndustryByKey(key);

  if (!industry) {
    throw new Error(`Missing industry config for navigation key "${key}"`);
  }

  return `/industries/${industry.slug}`;
}

export const NAV = {
  solutions: {
    label: "Solutions",
    intro: {
      title: "Shipping Solutions",
      description:
        "Dedicated solution pages across truckload, specialized freight, cross-border, and integrated logistics for North American shippers.",
      ctaLabel: "View All Solutions",
      ctaHref: "/solutions",
    },
    categories: [
      {
        title: "Core Freight Modes",
        links: [
          {
            label: "Truckload",
            href: "/solutions/truckload",
            description: "Dedicated truckload capacity with equipment-fit planning by freight profile.",
            icon: "truck",
          },
          {
            label: "Dry Van",
            href: "/solutions/dry-van",
            description: "Enclosed freight coverage with stable transit discipline.",
            icon: "package",
          },
          {
            label: "Flatbed",
            href: "/solutions/flatbed",
            description: "Open-deck freight for industrial and construction cargo.",
            icon: "truck",
          },
          {
            label: "Step Deck",
            href: "/solutions/step-deck",
            description: "Drop-deck geometry for taller freight profiles.",
            icon: "truck",
          },
          {
            label: "Conestoga / Roll-Tite",
            href: "/solutions/conestoga-roll-tite",
            description: "Covered deck protection without sacrificing loading flexibility.",
            icon: "package",
          },
          {
            label: "RGN / Heavy Haul",
            href: "/solutions/rgn-heavy-haul",
            description: "Permit-aware movement for oversize and heavy units.",
            icon: "shield",
          },
          {
            label: "Less-Than-Truckload",
            href: "/solutions/ltl",
            description: "Cost-efficient LTL shipping across shared lane networks.",
            icon: "package",
          },
        ],
      },
      {
        title: "Specialized & Time-Sensitive",
        links: [
          {
            label: "Expedited",
            href: "/solutions/expedited",
            description: "Priority execution for time-critical shipments.",
            icon: "zap",
          },
          {
            label: "Temperature-Controlled",
            href: "/solutions/temperature-controlled",
            description: "Refrigerated and controlled-temperature freight.",
            icon: "snowflake",
          },
          {
            label: "Hazmat",
            href: "/solutions/hazmat",
            description: "Compliant hazmat movement and documentation controls.",
            icon: "shield",
          },
          {
            label: "Specialized Vehicles Transport",
            href: "/solutions/specialized-vehicles",
            description: "Specialized equipment programs matched to cargo constraints.",
            icon: "truck",
          },
          {
            label: "Project-Specific",
            href: "/solutions/project-freight",
            description: "Program-managed freight for engineered and phased moves.",
            icon: "briefcase",
          },
        ],
      },
      {
        title: "Cross-Border & Global",
        links: [
          {
            label: "Explore All",
            href: "/solutions/cross-border",
            description: "North American cross-border planning, compliance, and execution.",
            icon: "globe",
          },
          {
            label: "Canada–USA",
            href: "/solutions/cross-border/canada-usa",
            description: "Managed bilateral corridor programs between Canada and the United States.",
            icon: "map",
          },
          {
            label: "Mexico",
            href: "/solutions/cross-border/mexico",
            description: "Security-grade corridor execution with pedimento-aligned documentation.",
            icon: "map",
          },
          {
            label: "Air Freight",
            href: "/solutions/cross-border/air-freight",
            description: "Time-critical air freight for urgent cross-border shipments.",
            icon: "zap",
          },
          {
            label: "Ocean Freight",
            href: "/solutions/cross-border/ocean-freight",
            description: "Managed ocean programs with inland cross-border distribution.",
            icon: "globe",
          },
        ],
      },
      {
        title: "Integrated Logistics",
        links: [
          {
            label: "Managed Capacity",
            href: "/solutions/managed-capacity",
            description: "Elastic capacity strategy for volatile lane demand.",
            icon: "briefcase",
          },
          {
            label: "Dedicated / Contract",
            href: "/solutions/dedicated-contract",
            description: "Dedicated fleet programs structured around SLAs.",
            icon: "building",
          },
          {
            label: "Warehousing & Distribution",
            href: "/solutions/warehousing-distribution",
            description: "Storage, handling, and distribution orchestration.",
            icon: "warehouse",
          },
        ],
      },
    ],
  },

  industries: {
    label: "Industries",
    intro: {
      title: "Industries We Serve",
      description:
        "Sector-specific logistics programs for the industries where timing, compliance, and precision define outcomes.",
      ctaLabel: "View All Industries",
      ctaHref: "/industries",
    },
    links: INDUSTRY_KEYS.map((key) => ({
      ...INDUSTRY_NAV_LINK_CONTENT[key],
      href: getIndustryNavHref(key),
    })),
  } satisfies NavSection,

  company: {
    label: "Company",
    intro: {
      title: "Company",
      description:
        "The story, standards, and operating philosophy behind SSP Group.",
      ctaLabel: "About SSP Group",
      ctaHref: "/about-us",
    },
    links: [
      {
        label: "About SSP",
        href: "/about-us",
        description: "Our operating philosophy, standards, and leadership approach.",
        icon: "building",
      },
      {
        label: "Our History",
        href: "/company/our-history",
        description: "Milestones that shaped SSP's operating model and scale.",
        icon: "briefcase",
      },
      {
        label: "Mission, Vision & Values",
        href: "/about-us#mission-vision-values",
        description: "The principles that guide planning, execution, and accountability.",
        icon: "building",
      },
      {
        label: "Safety & Compliance",
        href: "/company/safety-compliance",
        description: "Compliance governance and risk controls across active freight programs.",
        icon: "shield",
      },
      {
        label: "Leadership",
        href: "/about-us#leadership-accountability",
        description: "Executive leadership accountable for strategy, operating governance, and execution outcomes.",
        icon: "briefcase",
      },
      {
        label: "Locations & Network",
        href: "/about-us#locations-network",
        description: "North American office footprint and operating coverage across Canada, the United States, and Mexico.",
        icon: "map",
      },
      {
        label: "Media",
        href: "/company/media",
        description: "Operations footage, brand media, and video highlights.",
        icon: "briefcase",
      },
      {
        label: "FAQs",
        href: "/company/faqs",
        description: "Clear answers on process, timelines, and freight requirements.",
        icon: "phone",
      },
    ],
  } satisfies NavSection,

  careers: {
    label: "Careers",
    intro: {
      title: "Careers",
      description:
        "Career pathways for operators, drivers, and leaders who value disciplined execution, ownership, and measurable growth.",
      ctaLabel: "View Careers",
      ctaHref: "/careers",
    },
    links: [
      {
        label: "Careers Overview",
        href: "/careers",
        description: "Culture, operating standards, and career pathways at SSP.",
        icon: "briefcase",
      },
      {
        label: "Driver Opportunities",
        href: "/careers#drive",
        description: "Digital onboarding through DriveDock, qualification standards, and growth pathways for fleet professionals.",
        icon: "truck",
      },
      {
        label: "Office & Operations Roles",
        href: "/careers#jobs",
        description: "Open roles across dispatch, planning, compliance, customer operations, and leadership support.",
        icon: "briefcase",
      },
      {
        label: "Why Work With SSP",
        href: "/careers#why-work-with-ssp",
        description: "The operating culture, support model, and performance standards that define careers at SSP.",
        icon: "briefcase",
      },
    ],
  } satisfies NavSection,
} as const;
