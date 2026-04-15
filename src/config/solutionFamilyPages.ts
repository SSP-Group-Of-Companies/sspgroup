import type { WhenToChooseSectionData } from "@/app/(site)/solutions/_components/SolutionWhenToChooseSection";
import type { SolutionRelatedLink, SolutionTheme } from "@/config/solutionPages";

export type SolutionFamilyLandingCard = {
  key: string;
  label?: string;
  title: string;
  description: string;
  href?: string;
  ctaLabel?: string;
  accentColor?: string;
  /** Optional hero art for four-up `ModePathsSplitSection` (falls back to TL/LTL placeholders when omitted). */
  imageSrc?: string;
  imageAlt?: string;
};

/** Signature block: one high-contrast layout per family page. */
export type FamilySignatureVariant = "split-branches" | "dark-grid";

export type SolutionFamilyLandingPageData = {
  slug: "core-freight-modes" | "specialized-critical-freight" | "managed-logistics";
  theme: SolutionTheme;
  meta: {
    title: string;
    description: string;
    ogImage: string;
  };
  hero: {
    eyebrow: string;
    title: string;
    subtitle: string;
    backgroundColor: string;
  };
  /** Optional hero-adjacent signature block (e.g. Core Freight Mode Paths). Omitted when the page goes straight to branch content. */
  signatureSection?: {
    variant: FamilySignatureVariant;
    eyebrow: string;
    title: string;
    description: string;
    columns?: 2 | 3 | 4;
    items: readonly SolutionFamilyLandingCard[];
  };
  /** Omitted when the page has no mid-page branch grid (e.g. Core Freight Modes). */
  branchSection?: {
    eyebrow: string;
    title: string;
    description: string;
    columns?: 2 | 3 | 4;
    items: readonly SolutionFamilyLandingCard[];
  };
  /**
   * Optional list + left-border layout. Family pages now prefer `decisionGuide` + `SolutionWhenToChooseSection` for a consistent four-pillar grid.
   */
  advisorySection?: {
    eyebrow: string;
    title: string;
    description: string;
    items: readonly {
      title: string;
      body: string;
    }[];
  };
  /** Four-pillar "when to choose" grid (`SolutionWhenToChooseSection`). Requires exactly four `steps`, each with `iconKey`. */
  decisionGuide?: WhenToChooseSectionData;
  relatedSolutions: {
    eyebrow: string;
    title: string;
    description: string;
    items: readonly SolutionRelatedLink[];
  };
  finalCta: {
    kicker: string;
    title: string;
    body: string;
    trustSignals: readonly string[];
    proof: readonly { label: string; value: string }[];
    ctas: {
      primary: { label: string; href: string; ctaId: string };
      secondary: { label: string; href: string; ctaId: string };
    };
  };
};

/* ═══════════════════════════════════════════════════════════════════════
   CORE FREIGHT MODES
   ═══════════════════════════════════════════════════════════════════════ */

export const CORE_FREIGHT_MODES_FAMILY_PAGE: SolutionFamilyLandingPageData = {
  slug: "core-freight-modes",
  theme: {
    accent: "var(--color-ssp-cyan-500)",
    heroOverlay:
      "linear-gradient(100deg,rgba(7,24,38,0.86)_0%,rgba(11,62,94,0.66)_38%,rgba(13,79,120,0.28)_100%)",
    heroGlow:
      "radial-gradient(48% 52% at 88% 18%, rgba(16,167,216,0.18), transparent 72%)",
  },
  meta: {
    title: "Truckload & LTL Freight Services | SSP Group",
    description:
      "Full truckload and LTL freight services across dry van, flatbed, step deck, Conestoga, and heavy haul in Canada, the United States, and Mexico.",
    ogImage: "/_optimized/solution/truckload/truckload-Image.png",
  },
  hero: {
    eyebrow: "Core Freight Modes",
    title: "Truckload and LTL freight matched to the right equipment path.",
    subtitle:
      "SSP operates full truckload across dry van, flatbed, step deck, Conestoga, and heavy haul — plus LTL for palletized freight that fits shared-capacity networks. The mode and equipment path are confirmed before the shipment is dispatched.",
    backgroundColor: "var(--color-company-ink)",
  },
  signatureSection: {
    variant: "split-branches",
    eyebrow: "Service Paths",
    title: "Two primary execution paths. One decision first.",
    description:
      "Every core freight shipment resolves to one of two operating models: dedicated full-trailer capacity or shared consolidation. The first decision is whether the freight needs its own trailer or can move through a terminal network. Equipment detail follows from there.",
    columns: 2,
    items: [
      {
        key: "truckload",
        label: "Primary Path",
        title: "Truckload",
        description:
          "Full-trailer capacity with direct routing, equipment-fit planning, and shipment-level control from pickup through delivery.",
        href: "/solutions/truckload",
        ctaLabel: "View Truckload",
        accentColor: "#10a7d8",
      },
      {
        key: "ltl",
        label: "Primary Path",
        title: "Less-Than-Truckload",
        description: "Shared-capacity execution for palletized freight with class-ready documentation and terminal-compatible handling.",
        href: "/solutions/ltl",
        ctaLabel: "View LTL",
        accentColor: "#3064a8",
      },
    ],
  },
  decisionGuide: {
    eyebrow: "Decision Guide",
    title: "How to select the right path — and when another family should lead",
    description:
      "Start in Core Freight Modes when the shipment is defined by size, trailer type, and equipment requirements. If urgency, product sensitivity, border compliance, or recurring program governance becomes the lead condition, a different family is the better starting point.",
    steps: [
      {
        title: "Route to LTL",
        body: "The shipment is palletized, below full-trailer volume, dock-compatible, and able to move through terminal handling without creating avoidable delay or claim exposure.",
        footer: "Network fit",
        iconKey: "pallets-network",
      },
      {
        title: "Route to Truckload",
        body: "The freight fills a trailer, requires dedicated capacity, or needs equipment-specific handling where the move is planned as a single execution unit from origin to destination.",
        footer: "Capacity fit",
        iconKey: "dedicated-trailer",
      },
      {
        title: "Match the right equipment",
        body: "Once truckload is confirmed, loading access, cargo dimensions, weather exposure, securement, and permit requirements determine dry van, flatbed, step deck, Conestoga, or heavy haul.",
        footer: "Equipment fit",
        iconKey: "flatbed-open",
      },
      {
        title: "Move to another family",
        body: "If the shipment is governed by deadline compression, temperature integrity, hazmat compliance, border documentation, or recurring program structure, start in the family built for that constraint.",
        footer: "Better-fit signal",
        iconKey: "door-exit",
      },
    ],
  },
  relatedSolutions: {
    eyebrow: "Related Families",
    title: "When the shipment needs more than mode and equipment fit",
    description:
      "Core Freight Modes covers standard truckload and LTL execution. When the lead condition is something other than trailer type and capacity model, these families provide the right starting point.",
    items: [
      {
        label: "Specialized & Critical Freight",
        href: "/solutions/specialized-critical-freight",
        reason:
          "Expedited timelines, temperature-controlled cargo, hazmat classification, or sensitive handling requirements that must shape the plan before equipment selection.",
      },
      {
        label: "Cross-Border",
        href: "/solutions/cross-border",
        reason:
          "Canada-USA, Mexico, or international lanes where customs readiness, documentation, and corridor compliance define the outcome more than trailer choice.",
      },
      {
        label: "Managed Logistics",
        href: "/solutions/managed-logistics",
        reason:
          "Recurring freight programs, warehouse-connected operations, dedicated capacity commitments, or phased project moves that need ongoing governance.",
      },
    ],
  },
  finalCta: {
    kicker: "Start the Conversation",
    title: "Confirm the right mode and equipment path before the load is dispatched.",
    body: "Share the lane, commodity, dimensions, and delivery requirements. SSP will qualify the shipment against the right truckload or LTL path and align equipment before execution begins.",
    trustSignals: ["Truckload and LTL coverage", "Equipment-fit qualification", "CA-US-MX execution"],
    proof: [
      { value: "Mode-led", label: "Operating model" },
      { value: "Equipment fit", label: "Qualification lens" },
      { value: "Asset-based", label: "Carrier model" },
    ],
    ctas: {
      primary: {
        label: "Request a Freight Quote",
        href: "/quote",
        ctaId: "core_freight_modes_final_quote",
      },
      secondary: {
        label: "Talk to SSP",
        href: "/contact",
        ctaId: "core_freight_modes_final_contact",
      },
    },
  },
};

/* ═══════════════════════════════════════════════════════════════════════
   SPECIALIZED & CRITICAL FREIGHT
   ═══════════════════════════════════════════════════════════════════════ */

export const SPECIALIZED_CRITICAL_FREIGHT_FAMILY_PAGE: SolutionFamilyLandingPageData = {
  slug: "specialized-critical-freight",
  theme: {
    accent: "var(--color-brand-500)",
    heroOverlay:
      "linear-gradient(108deg,rgba(24,8,8,0.88)_0%,rgba(58,16,16,0.74)_34%,rgba(127,29,29,0.34)_100%)",
    heroGlow:
      "radial-gradient(48% 52% at 88% 18%, rgba(215,25,32,0.22), transparent 72%)",
  },
  meta: {
    title: "Specialized & Critical Freight | SSP Group",
    description:
      "Expedited, temperature-controlled, hazmat, and specialized vehicle transport across Canada, the United States, and Mexico with tighter controls from intake to delivery.",
    ogImage: "/_optimized/solution/expedited/expedited-Img.png",
  },
  hero: {
    eyebrow: "Specialized & Critical Freight",
    title: "When the consequence of failure changes how the shipment must be controlled.",
    subtitle:
      "Deadline compression, thermal integrity, hazmat compliance, and sensitive cargo handling require tighter intake, active monitoring, and faster escalation than standard freight execution provides. SSP structures these moves around the constraint that carries the most risk.",
    backgroundColor: "color-mix(in srgb, var(--color-brand-700) 34%, var(--color-company-ink))",
  },
  branchSection: {
    eyebrow: "Service Paths",
    title: "Four paths built around different operating risks",
    description:
      "Each path addresses a specific constraint — time, temperature, regulation, or handling sensitivity. The service model, monitoring discipline, and escalation structure are shaped by whichever condition governs the shipment.",
    columns: 4,
    items: [
      {
        key: "expedited",
        label: "Time-critical",
        title: "Expedited",
        description:
          "Deadline-driven freight where transit compression, recovery windows, or production-line timing cannot absorb standard network delays. Team drivers, dedicated equipment, and active milestone management.",
        href: "/solutions/expedited",
        ctaLabel: "View Expedited",
        accentColor: "#ef4444",
        imageSrc: "/_optimized/solution/expedited/Exp-mode-Img.png",
        imageAlt: "Expedited freight equipment and time-critical trucking execution",
      },
      {
        key: "temperature-controlled",
        label: "Cargo-sensitive",
        title: "Temperature-Controlled",
        description:
          "Reefer and climate-controlled shipments where setpoint discipline, continuous monitoring, and chain-of-custody documentation protect product integrity from pickup through delivery.",
        href: "/solutions/temperature-controlled",
        ctaLabel: "View Temperature-Controlled",
        accentColor: "#38bdf8",
        imageSrc: "/_optimized/solution/tempCtrl/TC-mode-Img.png",
        imageAlt: "Temperature-controlled reefer freight and thermal integrity execution",
      },
      {
        key: "hazmat",
        label: "Regulated",
        title: "Hazmat",
        description:
          "DOT and TDG-regulated freight where commodity classification, compliant documentation, qualified carriers, and proper placarding must be confirmed before the shipment is released.",
        href: "/solutions/hazmat",
        ctaLabel: "View Hazmat",
        accentColor: "#f59e0b",
        imageSrc: "/_optimized/solution/hazmat/Hazmat-mode-Img.png",
        imageAlt: "Hazmat-regulated freight transport and compliance-ready equipment",
      },
      {
        key: "specialized-vehicles",
        label: "High-value units",
        title: "Specialized Vehicle Programs",
        description:
          "Vehicle and high-value equipment transport requiring controlled loading, premium chain of custody, and handling protocols that standard truckload cannot provide.",
        href: "/solutions/specialized-vehicles",
        ctaLabel: "View Specialized Vehicles",
        accentColor: "#7c3aed",
        imageSrc: "/_optimized/solution/specializedVehicleTransport/SVTt-mode-Img.png",
        imageAlt: "Specialized vehicle transport and high-value unit handling",
      },
    ],
  },
  decisionGuide: {
    eyebrow: "Qualification Guide",
    title: "When the freight belongs here — and when it does not",
    description:
      "This family applies when urgency, product condition, regulatory exposure, or handling sensitivity must shape the operating plan before mode or equipment is finalized. If the shipment is defined by trailer type, border compliance, or recurring program structure, a different family is the better entry point.",
    steps: [
      {
        title: "The constraint must lead the plan",
        body: "Start here when time pressure, temperature requirements, hazmat classification, or handling sensitivity should govern tender, milestones, and control — not be added after truckload or LTL is assumed.",
        footer: "Control signal",
        iconKey: "radar-control",
      },
      {
        title: "Standard mode fit is still the open question",
        body: "If the decision is still full trailer versus consolidation and no specialized constraint has surfaced, qualify the shipment in Core Freight Modes first and route here only if conditions require it.",
        footer: "Mode signal",
        iconKey: "branch-route",
      },
      {
        title: "The requirement is programmatic, not per-shipment",
        body: "When recurring volume, facility coordination, SLA governance, or multi-site accountability is the real need, Managed Logistics provides the operating framework this family does not.",
        footer: "Program signal",
        iconKey: "nodes-handoff",
      },
      {
        title: "The corridor defines the risk more than the cargo",
        body: "When customs readiness, broker coordination, and border-zone handoffs carry more execution risk than cargo condition, Cross-Border should lead and specialized controls should layer in where needed.",
        footer: "Corridor signal",
        iconKey: "package-docs",
      },
    ],
  },
  relatedSolutions: {
    eyebrow: "Related Families",
    title: "When the operating risk points to a different starting point",
    description:
      "Not every shipment with a constraint belongs here. These families become the better entry point when mode fit, corridor compliance, or program governance is the condition that most changes execution.",
    items: [
      {
        label: "Core Freight Modes",
        href: "/solutions/core-freight-modes",
        reason:
          "Standard truckload and LTL execution where the shipment is defined by trailer type, equipment profile, and loading requirements rather than cargo consequence.",
      },
      {
        label: "Cross-Border",
        href: "/solutions/cross-border",
        reason:
          "Canada-USA, Mexico, and international lanes where customs documentation, corridor discipline, and border-zone execution carry more risk than cargo condition alone.",
      },
      {
        label: "Managed Logistics",
        href: "/solutions/managed-logistics",
        reason:
          "Recurring programs with defined SLAs, multi-site coordination, and governance requirements that extend beyond individual shipment control.",
      },
    ],
  },
  finalCta: {
    kicker: "Start the Conversation",
    title: "Define the constraint early. SSP will structure the controls around it.",
    body: "Share the shipment profile, lane, timing requirement, and what happens if execution fails. SSP will align the move to the specialized path that protects timing, product integrity, or compliance from intake through delivery.",
    trustSignals: ["Expedited and time-critical capability", "Regulated freight compliance", "Temperature-monitored execution"],
    proof: [
      { value: "Constraint-led", label: "Operating model" },
      { value: "Higher consequence", label: "Shipment profile" },
      { value: "CA-US-MX", label: "Coverage" },
    ],
    ctas: {
      primary: {
        label: "Request a Freight Quote",
        href: "/quote",
        ctaId: "specialized_critical_final_quote",
      },
      secondary: {
        label: "Talk to SSP",
        href: "/contact",
        ctaId: "specialized_critical_final_contact",
      },
    },
  },
};

/* ═══════════════════════════════════════════════════════════════════════
   MANAGED LOGISTICS
   ═══════════════════════════════════════════════════════════════════════ */

export const MANAGED_LOGISTICS_FAMILY_PAGE: SolutionFamilyLandingPageData = {
  slug: "managed-logistics",
  theme: {
    accent: "var(--color-ssp-teal-500)",
    heroOverlay:
      "linear-gradient(108deg,rgba(8,16,16,0.9)_0%,rgba(10,30,30,0.78)_34%,rgba(15,118,110,0.26)_100%)",
    heroGlow:
      "radial-gradient(48% 52% at 88% 18%, rgba(15,118,110,0.22), transparent 72%)",
  },
  meta: {
    title: "Managed Logistics & Freight Programs | SSP Group",
    description:
      "Managed capacity, dedicated logistics, warehousing and distribution, and project freight programs with ongoing governance across Canada, the United States, and Mexico.",
    ogImage: "/_optimized/solution/managedCapacity/managedCapacityHero-Img.png",
  },
  hero: {
    eyebrow: "Managed Logistics",
    title: "Recurring freight needs a program — not repeated one-off coverage.",
    subtitle:
      "When freight repeats across lanes, facilities, and seasons, execution quality depends on structured capacity, warehouse coordination, defined SLAs, and named accountability that outlasts any single shipment. SSP builds and governs that program.",
    backgroundColor: "color-mix(in srgb, var(--color-ssp-teal-500) 34%, var(--color-company-ink))",
  },
  branchSection: {
    eyebrow: "Program Paths",
    title: "Four operating models for recurring freight",
    description:
      "Each path addresses a different program structure — procurement governance, committed capacity, facility-connected operations, or phased project coordination. All include recurring review, defined ownership, and accountability that stays with the program.",
    columns: 4,
    items: [
      {
        key: "managed-capacity",
        label: "Procurement",
        title: "Managed Capacity",
        description:
          "Carrier strategy, network optimization, and KPI-led governance for shippers with recurring freight volume across multiple lanes and carriers.",
        href: "/solutions/managed-capacity",
        ctaLabel: "View Managed Capacity",
        accentColor: "#0f766e",
        imageSrc: "/_optimized/solution/managedCapacity/managedCapacity-mode-Img.png",
        imageAlt: "Managed capacity programs and multi-lane freight procurement governance",
      },
      {
        key: "dedicated-contract",
        label: "Committed assets",
        title: "Dedicated / Contract Logistics",
        description:
          "Committed equipment, embedded operations, and SLA-driven service for programs that need consistent capacity and operating continuity at defined facilities or lanes.",
        href: "/solutions/dedicated-contract",
        ctaLabel: "View Dedicated / Contract",
        accentColor: "#1d4ed8",
        imageSrc: "/_optimized/solution/dedicatedContract/dedicated-mode-Img.png",
        imageAlt: "Dedicated contract logistics and committed fleet capacity at scale",
      },
      {
        key: "warehousing-distribution",
        label: "Facility operations",
        title: "Warehousing & Distribution",
        description:
          "Inventory management, cross-docking, and outbound coordination where warehouse flow and transport execution are planned as one connected operation.",
        href: "/solutions/warehousing-distribution",
        ctaLabel: "View Warehousing & Distribution",
        accentColor: "#0ea5a4",
        imageSrc: "/_optimized/solution/warehouse/warehouse-mode-Img.png",
        imageAlt: "Warehousing and distribution operations connected to outbound freight",
      },
      {
        key: "project-freight",
        label: "Phased execution",
        title: "Project Freight",
        description:
          "Milestone-driven coordination for phased, engineered, or site-sensitive moves where sequencing, permitting, and multi-carrier orchestration define the project.",
        href: "/solutions/project-freight",
        ctaLabel: "View Project Freight",
        accentColor: "#14b8a6",
        imageSrc: "/_optimized/solution/projectSpecific/projectSpecific-mode-Img.png",
        imageAlt: "Project freight and phased heavy or engineered cargo coordination",
      },
    ],
  },
  decisionGuide: {
    eyebrow: "Operating Model",
    title: "Governance is the product — not shipment coverage alone",
    description:
      "Managed Logistics applies when the requirement is a program, not a transaction. Accountability is named, review is recurring, and coordination spans capacity, facilities, and warehousing over the life of the engagement.",
    steps: [
      {
        title: "Defined review cadence",
        body: "Performance, cost, exceptions, and network changes are reviewed on a set schedule — not only when a shipment escalates or a quarterly report is due.",
        footer: "Cadence signal",
        iconKey: "pulse-monitor",
      },
      {
        title: "Named accountability",
        body: "Procurement, operations, site coordination, and escalation have assigned owners so decisions are made by accountable roles, not passed between rotating contacts.",
        footer: "Ownership signal",
        iconKey: "nodes-handoff",
      },
      {
        title: "Program continuity",
        body: "The operating model survives personnel turnover and lane changes because rules, data, and governance stay attached to the program — not to individuals.",
        footer: "Continuity signal",
        iconKey: "clipboard-data",
      },
      {
        title: "Transport and facility coordination",
        body: "Freight movement, warehouse activity, and facility operations are planned as one system so handoffs between transport and storage do not create hidden execution risk.",
        footer: "System signal",
        iconKey: "warehouse-dock",
      },
    ],
  },
  relatedSolutions: {
    eyebrow: "Related Families",
    title: "When the freight is transactional, not programmatic",
    description:
      "Managed Logistics fits shippers whose operations need ongoing governance. When the real question is equipment fit, cargo-specific controls, or border compliance for individual shipments, one of these families is the better starting point.",
    items: [
      {
        label: "Core Freight Modes",
        href: "/solutions/core-freight-modes",
        reason:
          "Truckload and LTL execution for shipments defined by mode, trailer type, and equipment profile — without the overhead of program governance.",
      },
      {
        label: "Specialized & Critical Freight",
        href: "/solutions/specialized-critical-freight",
        reason:
          "Expedited, temperature-controlled, hazmat, or sensitive shipments where cargo condition or urgency must shape the plan before recurring structure is considered.",
      },
      {
        label: "Cross-Border",
        href: "/solutions/cross-border",
        reason:
          "Canada-USA, Mexico, and international lanes where customs, documentation, and corridor execution are the primary operating challenges.",
      },
    ],
  },
  finalCta: {
    kicker: "Start the Conversation",
    title: "Define the program scope. SSP will build the governance around it.",
    body: "Share the network footprint, recurring freight profile, facility requirements, and service expectations. SSP will structure the managed model — capacity, warehousing, dedicated assets, or project coordination — with the review cadence and accountability the program needs.",
    trustSignals: ["Program-managed execution", "Recurring freight governance", "Warehouse-connected capability"],
    proof: [
      { value: "Governed", label: "Operating model" },
      { value: "Recurring", label: "Program profile" },
      { value: "CA-US-MX", label: "Coverage" },
    ],
    ctas: {
      primary: {
        label: "Request a Program Review",
        href: "/quote",
        ctaId: "managed_logistics_final_quote",
      },
      secondary: {
        label: "Talk to SSP",
        href: "/contact",
        ctaId: "managed_logistics_final_contact",
      },
    },
  },
};
