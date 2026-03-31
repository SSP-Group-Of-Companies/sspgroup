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

export const NAV = {
  solutions: {
    label: "Solutions",
    intro: {
      title: "Shipping Solutions",
      description:
        "Freight execution engineered for compliance, visibility, and reliable performance across North America.",
      ctaLabel: "View All Solutions",
      ctaHref: "/solutions",
    },
    categories: [
      {
        title: "Core Freight Modes",
        links: [
          {
            label: "Full Truckload",
            href: "/solutions/truckload",
            description: "Full truckload shipping for high-control lanes.",
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
            label: "Project Freight",
            href: "/solutions/project-freight",
            description: "Program-managed freight for complex and phased moves.",
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
    links: [
      {
        label: "Automotive",
        href: "/industries/automotive",
        description: "Production-critical logistics with OEM-grade timing and asset protection.",
        icon: "truck",
      },
      {
        label: "Manufacturing",
        href: "/industries/manufacturing-materials",
        description: "Inbound rhythm and throughput stability for production supply chains.",
        icon: "package",
      },
      {
        label: "Retail & Consumer Goods",
        href: "/industries/retail-consumer-goods",
        description: "Store replenishment and DC lanes with service-level discipline.",
        icon: "warehouse",
      },
      {
        label: "Food & Beverage",
        href: "/industries/food-beverage",
        description: "Cold chain execution protecting freshness, quality, and compliance.",
        icon: "snowflake",
      },
      {
        label: "Steel & Metals",
        href: "/industries/steel-aluminum",
        description: "Engineered securement and compliance for high-density freight.",
        icon: "shield",
      },
      {
        label: "Construction & Building Materials",
        href: "/industries/construction-building-materials",
        description: "Permit-aware planning and safety-governed delivery to active project sites.",
        icon: "building",
      },
      {
        label: "Chemical & Plastics",
        href: "/industries/chemical-plastics",
        description: "Carrier-qualified execution with document control for regulated freight.",
        icon: "shield",
      },
    ],
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
        label: "Coverage & Network",
        href: "/about-us#coverage-network",
        description: "North America network reach across core freight corridors.",
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
        "Opportunities to join a disciplined logistics organization built around growth, ownership, and execution.",
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
        href: "/careers?track=drivers",
        description: "Driving roles, qualification standards, and growth pathways.",
        icon: "truck",
      },
      {
        label: "Office & Operations Roles",
        href: "/careers?track=office-operations",
        description: "Roles across dispatch, planning, customer success, and operations.",
        icon: "briefcase",
      },
      {
        label: "Why Work With SSP",
        href: "/careers#why-work-with-ssp",
        description: "What makes SSP a long-term platform for growth and ownership.",
        icon: "briefcase",
      },
    ],
  } satisfies NavSection,
} as const;
