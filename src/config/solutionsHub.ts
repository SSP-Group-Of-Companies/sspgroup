export type SolutionsHubChildReference = {
  label: string;
  href: string;
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
  operatingModel: {
    eyebrow: "Operating Model",
    title: "The shipment is qualified before capacity is assigned.",
    description:
      "SSP does not default to a service and work backward. Equipment profile, cargo condition, timing pressure, regulatory exposure, corridor complexity, and program cadence are assessed first — then the right operating family leads the move.",
    pillars: [
      {
        key: "equipment-profile",
        title: "Equipment and shipment profile",
        body: "Trailer type, loading method, dimensions, weight, and cargo protection requirements are confirmed so the move starts on the right equipment path.",
      },
      {
        key: "constraints",
        title: "Timing, cargo, and regulatory conditions",
        body: "Expedited windows, temperature integrity, hazmat classification, and handling sensitivity are identified when they should change how the shipment is controlled.",
      },
      {
        key: "corridor",
        title: "Corridor and customs exposure",
        body: "Canada-USA, Mexico, and international lanes are structured around documentation readiness, border handoffs, and corridor-specific operating standards.",
      },
      {
        key: "governance",
        title: "Program cadence and logistics governance",
        body: "Recurring freight, warehouse-connected flows, and SLA-driven programs require managed oversight with defined review cadence and named accountability.",
      },
    ],
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
        "This family covers freight defined by mode selection and equipment fit. SSP qualifies the load against trailer type, shipment size, and cargo handling requirements, then routes it to the truckload or LTL path that delivers controlled execution from pickup through final delivery.",
      familyHref: "/solutions/core-freight-modes",
      familyCtaLabel: "Explore Core Freight Modes",
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
        "This family applies when cargo condition, time sensitivity, regulatory classification, or handling constraints materially change how a shipment must be planned, documented, and executed. SSP structures tighter intake, active monitoring, and faster escalation around the constraint that carries the most risk.",
      familyHref: "/solutions/specialized-critical-freight",
      familyCtaLabel: "Explore Specialized & Critical Freight",
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
        "This family covers freight whose outcome depends on customs preparation, corridor discipline, and international mode selection. SSP aligns documentation, broker coordination, and lane-specific controls so the corridor is structured before the shipment moves — not resolved under pressure at the border.",
      familyHref: "/solutions/cross-border",
      familyCtaLabel: "Explore Cross-Border",
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
      childReferences: [
        { label: "Managed Capacity", href: "/solutions/managed-capacity" },
        { label: "Dedicated / Contract Logistics", href: "/solutions/dedicated-contract" },
        { label: "Warehousing & Distribution", href: "/solutions/warehousing-distribution" },
        { label: "Project Freight", href: "/solutions/project-freight" },
      ],
    },
  ] satisfies readonly SolutionsHubFamily[],
  executionStandard: {
    eyebrow: "Execution Standard",
    title: "The operating standard does not change between families.",
    description:
      "The service path changes to fit the freight. The execution discipline does not. Qualification, documentation control, milestone ownership, and escalation accountability carry across every family and every lane SSP operates.",
    pillars: [
      {
        title: "Equipment and capacity alignment",
        body: "Every shipment is matched to the right trailer, mode, and capacity model before dispatch — so execution does not begin with a preventable fit error.",
      },
      {
        title: "Documentation and compliance readiness",
        body: "Commercial invoices, customs paperwork, regulated-freight documentation, and BOLs are reviewed before movement where the service model requires it.",
      },
      {
        title: "Cross-border corridor control",
        body: "Canada-USA and Mexico lanes run against corridor-specific documentation, handoff, and compliance standards — with milestone ownership from origin to final delivery.",
      },
      {
        title: "Shipment-level accountability",
        body: "Updates follow milestones, exceptions, and next actions. Communication is tied to what changed and what happens next — not generic status language.",
      },
      {
        title: "Program-level governance",
        body: "When freight recurs, SSP adds routing discipline, KPI review cadence, stakeholder reporting, and corrective ownership over the life of the program.",
      },
    ],
    trustSignals: [
      "Asset-based North American fleet",
      "Canada, United States, and Mexico coverage",
      "Specialized and regulated freight capability",
      "Warehouse-connected and program-managed operations",
    ],
  },
  finalCta: {
    kicker: "Start the Conversation",
    title: "Share the shipment. SSP will confirm the right path.",
    body: "Provide the lane, commodity, equipment requirement, and service expectation. SSP will route the freight into the family and service path that fits the operating risk — then structure execution from there.",
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
