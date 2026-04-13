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
    title: "Freight execution starts with the right operating model",
    description:
      "SSP structures freight around the condition that most changes execution: mode fit, cargo constraints, border exposure, or network governance. Start with the family that fits the move across Canada, the United States, and Mexico.",
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
    title: "SSP qualifies the shipment before it assigns capacity.",
    description:
      "The first question is not which service to sell. It is what will govern execution. Equipment profile, timing pressure, regulatory exposure, corridor design, and program cadence determine which family should lead the move.",
    pillars: [
      {
        key: "equipment-profile",
        title: "Equipment fit and shipment profile",
        body: "Trailer environment, loading method, dimensions, weight, shipment size, and cargo protection requirements establish the base path.",
      },
      {
        key: "constraints",
        title: "Timing, cargo, and compliance conditions",
        body: "Expedited windows, temperature control, hazmat exposure, and handling sensitivity can override standard mode selection and require tighter controls.",
      },
      {
        key: "corridor",
        title: "Corridor and customs exposure",
        body: "When border handoffs, customs readiness, or international mode selection carry the risk, corridor execution has to lead the design.",
      },
      {
        key: "governance",
        title: "Program cadence and operating governance",
        body: "Recurring volumes, warehouse-connected flows, and SLA commitments require a managed model with ongoing review and ownership.",
      },
    ],
  },
  serviceFamilies: {
    eyebrow: "Solutions Architecture",
    title: "Four service families built around how freight moves",
    description:
      "SSP organizes freight across four service families based on shipment profile, operating constraints, corridor complexity, and logistics governance. This structure helps shippers move from broad service fit to the right execution path with more clarity and less friction.",
  },
  families: [
    {
      key: "core-freight-modes",
      sectionId: "core-freight-modes",
      label: "Core Freight Modes",
      title: "Standard freight execution starts with the right mode and equipment fit.",
      hubSummary:
        "When the move is led by shipment size, trailer fit, and loading profile. Full truckload and LTL execution, with equipment-specific routing when geometry or handling demands it.",
      description:
        "This family covers freight whose operating path is principally defined by mode, trailer fit, shipment size, and equipment requirements. SSP qualifies the load early, then aligns the right truckload, LTL, or equipment-specific path to protect loading access, cargo protection, and delivery control.",
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
            "Less than Truckload (Palletized freight, Consolidation-based routing, Class-ready execution)",
          href: "/solutions/ltl",
        },
      ],
    },
    {
      key: "specialized-critical-freight",
      sectionId: "specialized-critical-freight",
      label: "Specialized & Critical Freight",
      title: "Some freight requires a tighter operating model from the start.",
      hubSummary:
        "When urgency, cargo sensitivity, compliance, or handling changes the plan before pickup. Tighter intake, controls, and execution discipline from first contact through delivery.",
      description:
        "This family applies when urgency, product sensitivity, compliance exposure, or handling constraints materially change how the shipment has to be planned and executed. SSP structures these moves around tighter intake, clearer controls, and faster exception ownership before the shipment is released.",
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
      title: "Border execution depends on corridor control, documentation, and mode selection.",
      hubSummary:
        "When customs readiness, corridor control, and international handoffs define the outcome. North American lanes plus air and ocean when the move extends beyond regional freight planning.",
      description:
        "This family covers freight whose success is defined by customs preparation, corridor discipline, border-zone handoffs, and international mode selection. SSP aligns documentation readiness, lane-specific operating controls, and milestone ownership so the corridor is structured before the shipment reaches the border.",
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
      title: "Some freight needs program governance, not just shipment coverage.",
      hubSummary:
        "For recurring programs that need coordinated capacity, warehousing, dedicated assets, or project execution. Governance and operating continuity beyond single-shipment coverage.",
      description:
        "This family is built for shippers that need more than one-off shipment coverage. Managed capacity, dedicated resources, warehousing coordination, and project execution all require governance, recurring review, and operating ownership that stays attached to the live program.",
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
    eyebrow: "SSP Execution Standard",
    title: "The same control disciplines carry across every family.",
    description:
      "SSP changes the operating path to fit the freight. It does not change the standard of execution. Qualification, documentation control, milestone ownership, and program governance stay attached to the move where they are required.",
    pillars: [
      {
        title: "Capacity and equipment alignment",
        body: "Freight is matched to the right equipment path before dispatch so execution does not start with preventable fit errors.",
      },
      {
        title: "Documentation and compliance readiness",
        body: "Commercial, customs, and regulated-freight requirements are reviewed before movement where the service model demands it.",
      },
      {
        title: "Cross-border control",
        body: "Canada-USA and Mexico moves are run against corridor-specific documentation, handoff, and escalation standards.",
      },
      {
        title: "Shipment-level accountability",
        body: "Updates are tied to milestones, exceptions, and next actions rather than generic tracking language.",
      },
      {
        title: "Managed logistics governance",
        body: "When the requirement is recurring, SSP adds routing discipline, KPI cadence, stakeholder review, and corrective ownership.",
      },
    ],
    trustSignals: [
      "Asset-based trucking model",
      "Canada-US-Mexico operating coverage",
      "Specialized and regulated freight capability",
      "Warehouse-connected and program-managed execution",
    ],
  },
  finalCta: {
    kicker: "Next Step",
    title: "Start with the condition that governs the move.",
    body: "Share the shipment profile, lane, and operating requirement. SSP will route the freight into the family that fits the execution risk, then align the right service path from there.",
    trustSignals: [
      "Asset-based carrier",
      "Canada, USA, and Mexico coverage",
      "Mode, corridor, and program execution",
    ],
    proof: [
      { value: "Mode fit", label: "Qualification lens" },
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
