export type SolutionsHubChildReference = {
  label: string;
  href: string;
};

/** Lucide icon keys mapped in `SolutionsHubPage` for the “What sets us apart” row. */
export type SolutionsHubDifferentiatorIcon = "truck" | "globe" | "shield-check";

export type SolutionsHubDifferentiator = {
  key: string;
  icon: SolutionsHubDifferentiatorIcon;
  title: string;
  body: string;
};

export type SolutionsHubFamily = {
  key: string;
  sectionId: string;
  label: string;
  title: string;
  hubSummary: string;
  description: string;
  familyHref: string;
  familyCtaLabel: string;
  /** Matches each family landing page accent for Service Families card hover (hue + CTA). */
  accentColor: string;
  childReferences: readonly SolutionsHubChildReference[];
};

export const SOLUTIONS_HUB_PAGE = {
  hero: {
    eyebrow: "Solutions",
    title: "Freight logistics across every mode, constraint, and corridor in North America",
    description:
      "SSP Group operates truckload, LTL, specialized, cross-border, and managed logistics programs across Canada, the United States, and Mexico. Every shipment is routed through the service family that fits how it actually needs to move — by equipment, by constraint, by corridor, or by program.",
    primaryCta: {
      label: "Request a Freight Quote",
      href: "/quote",
      ctaId: "solutions_hub_hero_request_quote",
    },
    secondaryCta: {
      label: "Talk to SSP",
      href: "/contact",
      ctaId: "solutions_hub_hero_talk_to_ssp",
    },
  },
  /** Same layout as solution `modeOverview` + `ModeSolutionOverviewSection` (truckload, etc.). */
  whySspOverview: {
    eyebrow: "Why SSP",
    title: "North American freight programs led by owned capacity and disciplined execution.",
    description:
      "SSP Group is an asset-based logistics company: owned trucks, tri-country lane experience, and structured controls across truckload, LTL, specialized, cross-border, and managed logistics. This hub is where shippers align operating risk to the right service family—before the shipment is tendered and while it moves.",
    video: {
      src: "/_optimized/solution/solutionHub/whySSP.mp4",
      posterSrc: "/_optimized/solution/solutionHub/whySSP_poster.webp",
      title: "Why SSP Group shipping services",
    },
  },
  serviceFamilies: {
    eyebrow: "Service Families",
    title: "Four families organized around how freight moves",
    description:
      "Each family addresses a different operating condition. Core Freight Modes covers standard truckload and LTL execution. Specialized & Critical Freight applies when cargo condition or urgency must lead. Cross-Border structures corridor and customs control. Managed Logistics governs recurring programs.",
  },
  families: [
    {
      key: "core-freight-modes",
      sectionId: "core-freight-modes",
      label: "Core Freight Modes",
      title: "Truckload and LTL execution with equipment-fit routing across North America.",
      hubSummary:
        "Full truckload capacity across dry van, flatbed, step deck, Conestoga, and heavy haul — plus LTL for palletized freight that fits shared-capacity networks. The mode and equipment path are matched to the shipment before dispatch.",
      description:
        "This family covers freight defined by mode selection and equipment fit. We qualify the load against trailer type, shipment size, and cargo handling requirements, then routes it to the truckload or LTL path that delivers controlled execution from pickup through final delivery.",
      familyHref: "/solutions/core-freight-modes",
      familyCtaLabel: "Explore Core Freight Modes",
      accentColor: "var(--color-ssp-cyan-500)",
      childReferences: [
        {
          label:
            "Truckload (Dry Van, Flatbed, Step Deck, Conestoga / Roll-Tite, RGN / Heavy Haul)",
          href: "/solutions/truckload",
        },
        {
          label:
            "Less-Than-Truckload (Palletized freight, Class-ready execution, Consolidation routing)",
          href: "/solutions/ltl",
        },
      ],
    },
    {
      key: "specialized-critical-freight",
      sectionId: "specialized-critical-freight",
      label: "Specialized & Critical Freight",
      title: "Higher-consequence shipments controlled from intake through delivery.",
      hubSummary:
        "Expedited, temperature-controlled, hazmat, and sensitive vehicle transport — where urgency, product integrity, or regulatory compliance must shape the plan before the shipment is released.",
      description:
        "This family applies when cargo condition, time sensitivity, regulatory classification, or handling constraints materially change how a shipment must be planned, documented, and executed. We structure tighter intake, active monitoring, and faster escalation around the constraint that carries the most risk.",
      familyHref: "/solutions/specialized-critical-freight",
      familyCtaLabel: "Explore Specialized & Critical Freight",
      accentColor: "var(--color-brand-500)",
      childReferences: [
        { label: "Expedited", href: "/solutions/expedited" },
        { label: "Temperature-Controlled", href: "/solutions/temperature-controlled" },
        { label: "Hazmat", href: "/solutions/hazmat" },
        { label: "Specialized Vehicle Transport", href: "/solutions/specialized-vehicles" },
      ],
    },
    {
      key: "cross-border",
      sectionId: "cross-border",
      label: "Cross-Border",
      title: "Customs-ready corridor execution across Canada, the United States, and Mexico.",
      hubSummary:
        "Canada-USA, Mexico, air freight, and ocean freight lanes structured around documentation readiness, border-zone handoffs, and corridor-specific compliance before the shipment reaches the crossing.",
      description:
        "This family covers freight whose outcome depends on customs preparation, corridor discipline, and international mode selection. We align documentation, broker coordination, and lane-specific controls so the corridor is structured before the shipment moves — not resolved under pressure at the border.",
      familyHref: "/solutions/cross-border",
      familyCtaLabel: "Explore Cross-Border",
      accentColor: "var(--color-ssp-cyan-500)",
      childReferences: [
        { label: "Canada-USA", href: "/solutions/cross-border/canada-usa" },
        { label: "Mexico", href: "/solutions/cross-border/mexico" },
        { label: "Air Freight", href: "/solutions/cross-border/air-freight" },
        { label: "Ocean Freight", href: "/solutions/cross-border/ocean-freight" },
      ],
    },
    {
      key: "managed-logistics",
      sectionId: "managed-logistics",
      label: "Managed Logistics",
      title: "Recurring freight programs with built-in governance and accountability.",
      hubSummary:
        "Managed capacity, dedicated and contract logistics, warehousing and distribution, and project freight — for shippers whose operations need ongoing oversight, not one-off coverage.",
      description:
        "This family is built for freight programs that repeat. Managed capacity, dedicated resources, warehouse-connected operations, and phased project moves all require defined ownership, recurring review, and governance that stays attached to the program over time — not just the next shipment.",
      familyHref: "/solutions/managed-logistics",
      familyCtaLabel: "Explore Managed Logistics",
      accentColor: "var(--color-ssp-teal-500)",
      childReferences: [
        { label: "Managed Capacity", href: "/solutions/managed-capacity" },
        { label: "Dedicated / Contract Logistics", href: "/solutions/dedicated-contract" },
        { label: "Warehousing & Distribution", href: "/solutions/warehousing-distribution" },
        { label: "Project Freight", href: "/solutions/project-freight" },
      ],
    },
  ] satisfies readonly SolutionsHubFamily[],
  /**
   * Grounded in sspgroup.com positioning: asset-based model, tri-country footprint,
   * and technology-led visibility / cargo security.
   */
  whatSetsUsApart: {
    eyebrow: "Core strengths",
    title: "What sets SSP Group shipping services apart",
    items: [
      {
        key: "asset-based",
        icon: "truck",
        title: "Asset-based logistics with owned accountability",
        body: "We operate as an asset-based carrier—owned trucks, disciplined dispatch, and execution ownership that stays with your freight. That foundation supports truckload, LTL, specialized, cross-border, and managed programs without defaulting to brokerage-only coverage.",
      },
      {
        key: "north-america",
        icon: "globe",
        title: "Tri-country terminals, warehousing, and lane depth",
        body: "Operating presence across Canada, the United States, and Mexico—including terminals, warehousing, and cross-dock capability—matches how freight actually moves. Domestic and international programs benefit from corridor familiarity and repeatable handoffs, not single-lane guesswork.",
      },
      {
        key: "visibility-security",
        icon: "shield-check",
        title: "Real-time visibility and cargo security",
        body: "Modern tracking and monitoring give shippers a clear view of progress, risk, and exceptions. Security-minded controls and responsive communication help teams align on milestones from pickup through delivery—especially when timing, compliance, or cargo sensitivity matters.",
      },
    ] satisfies readonly SolutionsHubDifferentiator[],
  },
  finalCta: {
    kicker: "Start the Conversation",
    title: "Share the shipment. We will confirm the right path.",
    body: "Provide the lane, commodity, equipment requirement, and service expectation. We will route the freight into the family and service path that fits the operating risk — then structure execution from there.",
    trustSignals: [
      "Asset-based carrier with owned fleet",
      "Canada, USA, and Mexico coverage",
      "Mode, corridor, and program execution",
    ],
    proof: [
      { value: "Qualified", label: "Routing method" },
      { value: "CA-US-MX", label: "Coverage" },
      { value: "Asset-based", label: "Carrier model" },
    ],
    ctas: {
      primary: {
        label: "Request a Freight Quote",
        href: "/quote",
        ctaId: "solutions_hub_final_request_quote",
      },
      secondary: {
        label: "Talk to SSP",
        href: "/contact",
        ctaId: "solutions_hub_final_talk_to_ssp",
      },
    },
  },
} as const;
