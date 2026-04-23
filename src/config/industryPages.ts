/**
 * Industry detail page config: slug-based routing and full page content.
 * Slugs must match NAV.industries.links[].href (e.g. /industries/automotive → slug "automotive").
 */

import { INDUSTRY_KEYS, type IndustryKey } from "./industryKeys";

export type IndustrySlug =
  | "automotive"
  | "manufacturing-materials"
  | "retail-consumer-goods"
  | "food-beverage"
  | "construction-building-materials"
  | "steel-aluminum"
  | "chemical-plastics";

/** Decisive hero color theme per industry — drives background and gradient accents */
export type IndustryHeroTheme =
  | "green" // Food & Beverage — fresh, natural
  | "red" // Automotive — power, brand
  | "blue" // Retail — trust, calm
  | "slate" // Manufacturing — industrial
  | "amber" // Construction & Building Materials — earth, structure
  | "steel" // Steel & Aluminum — metal, strength
  | "teal"; // Chemical & Plastics — precision, science

export type IndustryHero = {
  kicker?: string;
  valueHeadline: string;
  title: string;
  description: string;
  cta: { label: string; href: string; ctaId: string };
  secondaryCta?: { label: string; href: string; ctaId: string };
  /** Decisive theme: sets hero background color and gradient overlays */
  theme: IndustryHeroTheme;
  /** Signal chips shown below the hero description */
  signals?: string[];
  /** Proof metric strip shown below the hero content */
  proofStrip?: Array<{ value: string; label: string }>;
};

/** Optional interactive widget by industry — one where the page uses it */
export type IndustryWidgetType =
  | "transport-protection" // Automotive
  | "load-optimization" // Manufacturing & Materials
  | "demand-surge" // Retail & Consumer Goods
  | "freshness-preservation" // Food & Beverage
  | "heavy-haul-route" // Construction & Building Materials
  | "load-balance-axle"; // Steel & Aluminum

export type IndustryWhatMatters = {
  eyebrowLabel?: string;
  sectionTitle: string;
  intro: string;
  items: Array<{ title: string; body: string }>;
  interactiveWidget?: IndustryWidgetType | null;
  /** Shown in col-6 next to the widget: title + body so the widget is easy to comprehend */
  widgetSupportTitle?: string;
  widgetSupportBody?: string;
  /** Optional bullets for richer support content (e.g. industry-specific points) */
  widgetSupportBullets?: string[];
  /** Optional footer line (e.g. key takeaway) */
  widgetSupportFooter?: string;
};

export type IndustryHowWeSupportCard = {
  eyebrow?: string;
  title: string;
  summary: string;
  details: string;
  metric?: string;
};

export type IndustryHowWeSupportAside = {
  badge: string;
  title: string;
  body: string;
  bullets: string[];
  stats: Array<{ value: string; label: string }>;
};

export type IndustryHowWeSupport = {
  sectionTitle: string;
  intro: string;
  cards: IndustryHowWeSupportCard[];
  aside?: IndustryHowWeSupportAside;
};

export type IndustryTrustProof = {
  sectionTitle: string;
  intro?: string;
  comparisonHeading?: string;
  pillars: Array<{
    title: string;
    icon: string;
    industryBaseline: string;
    sspStandard: string;
    evidence: string;
    industryScore: number;
    sspScore: number;
  }>;
  evidenceNote?: string;
};

export type IndustryRelatedServices = {
  eyebrowLabel?: string;
  sectionTitle: string;
  intro?: string;
  modeFit?: Array<{
    scenario: string;
    recommendation: string;
    rationale: string;
  }>;
  links: Array<{ label: string; href: string }>;
};

export type IndustryFinalCta = {
  kicker?: string;
  title: string;
  body: string;
  implementationSteps?: Array<{
    step: string;
    title: string;
    body: string;
  }>;
  proof: Array<{ value: string; label: string }>;
  trustSignals?: string[];
  ctas: {
    primary: { label: string; href: string; ctaId: string };
    secondary: { label: string; href?: string; ctaId: string; action?: "live-chat" };
  };
};

export type IndustryPageModel = {
  key: IndustryKey;
  slug: IndustrySlug;
  meta: {
    title: string;
    description: string;
    heroImage: string;
    ogImage?: string;
  };
  hero: IndustryHero;
  whatMatters: IndustryWhatMatters;
  howWeSupport: IndustryHowWeSupport;
  trustProof: IndustryTrustProof;
  relatedServices: IndustryRelatedServices;
  finalCta: IndustryFinalCta;
};

const INDUSTRY_PAGE_DATA: Record<IndustryKey, IndustryPageModel> = {
  automotive: {
    key: "automotive",
    slug: "automotive",
    meta: {
      title: "Automotive Logistics | JIT, Enclosed & Cross-Border Freight | SSP Group",
      description:
        "Automotive logistics for OEMs, Tier-1 suppliers, and specialty vehicle programs across Canada, the United States, and Mexico. JIT inbound sequencing, enclosed transport, and cross-border freight managed with control.",
      heroImage: "/_optimized/industries/automotive-hero-premium.png",
      ogImage: "/_optimized/industries/automotive-hero-premium.png",
    },
    hero: {
      kicker: "Automotive Logistics",
      valueHeadline: "Production continuity.",
      title: "Automotive Logistics for Production-Critical Freight",
      description:
        "From JIT inbound sequencing to enclosed vehicle transport and North American cross-border execution, we runs automotive freight with the control, documentation discipline, and exception ownership serious shippers expect.",
      cta: { label: "Review Your Automotive Network", href: "/contact", ctaId: "industry_automotive_hero_contact" },
      secondaryCta: { label: "See the Operating Model", href: "#how-we-support", ctaId: "industry_automotive_hero_capabilities" },
      theme: "red",
      signals: ["OEM and Tier-1 operating discipline", "Enclosed and high-value vehicle handling", "USMCA-ready corridor execution"],
      proofStrip: [
        { value: "24 / 7", label: "Operations coverage" },
        { value: "CA / US / MX", label: "Automotive corridors" },
        { value: "JIT / JIS", label: "Production-fit execution" },
      ],
    },
    whatMatters: {
      eyebrowLabel: "Industry Demands",
      sectionTitle: "Where Automotive Freight Fails First",
      intro:
        "Automotive freight does not break in the same way on every move. For most OEM, Tier-1, and specialty vehicle programs, exposure concentrates in three places: sequence integrity, cargo protection, and border readiness.",

      items: [
        {
          title: "Inbound Sequencing",
          body: "Assembly lines run on sequence, not broad appointment windows. A single missed component handoff can create line-stop exposure, labor disruption, and downstream schedule pressure across the plant.",
        },
        {
          title: "High-Value Vehicle Protection",
          body: "Finished vehicles, prototypes, and specialty units require low-touch handling, controlled custody, and equipment matched to asset value. Damage is not just a claim event. It is a brand and delivery failure.",
        },
        {
          title: "Cross-Border Regulatory Precision",
          body: "Automotive cross-border freight depends on pre-cleared documents, broker coordination, and rules-of-origin discipline. Border issues rarely stay at the border. They move directly into production risk.",
        },
      ],

      interactiveWidget: "transport-protection",

      widgetSupportTitle: "Protection Standards by Cargo Profile",

      widgetSupportBody:
        "Protection requirements shift materially between components, finished vehicles, and cross-border movements. We align equipment, handling controls, and documentation posture to the actual exposure on the lane.",

      widgetSupportBullets: [
        "Vehicle units: enclosed transport decisions are driven by exposure, custody points, and delivery-condition expectations.",
        "Component freight: securement, stack stability, and moisture protection protect sequence integrity at destination.",
        "Cross-border freight: customs dwell and additional handoffs increase risk unless controls are set before dispatch.",
      ],

      widgetSupportFooter: "Controls are defined before movement starts, not after something goes wrong.",
    },
    howWeSupport: {
      sectionTitle: "How SSP Runs Automotive Freight",
      intro:
        "SSP's automotive model is built around four control points that matter most to buyers: sequence discipline, asset protection, cross-border readiness, and decision-ready visibility.",
      cards: [
        {
          eyebrow: "Production-Sensitive Inbound",
          title: "Sequence discipline at plant level",
          summary: "JIT and JIS programs managed to plant timing, receiving constraints, and component criticality, with immediate escalation when tolerance begins to tighten.",
          details:
            "Movement plans are built around production timing, named ownership, and recovery logic that protects line-side continuity when conditions shift.",
          metric: "Plant-level timing",
        },
        {
          eyebrow: "Asset Protection",
          title: "Enclosed vehicle transport",
          summary: "Specialty vehicles and high-value units moved under low-touch operating plans with route controls, custody verification, and delivery-condition documentation.",
          details:
            "Protection posture is matched to the asset, the lane, and the delivery expectation before dispatch, not left to generic operating assumptions in transit.",
          metric: "Asset-fit handling",
        },
        {
          eyebrow: "Cross-Border Execution",
          title: "Canada-US-Mexico corridor control",
          summary: "Border-facing automotive freight moves with document validation, broker coordination, and handoff discipline before crossing risk becomes transit risk.",
          details:
            "Automotive cross-border programs are structured around document readiness, customs coordination, and corridor visibility so border variability does not become production variability.",
          metric: "Border-ready execution",
        },
        {
          eyebrow: "Visibility & Control",
          title: "Decision-ready reporting",
          summary: "Milestones, exceptions, and corrective actions are delivered in a format buyers can act on, not a stream of disconnected tracking events.",
          details:
            "Reporting cadence is aligned to planning, receiving, and commercial escalation windows, with context that supports action before the issue expands.",
          metric: "Actionable visibility",
        },
      ],
      aside: {
        badge: "Premium operating model",
        title: "Execution that feels managed, not merely dispatched.",
        body: "Automotive buyers need a partner that can protect production timing, preserve asset condition, and surface exceptions before they become line-side problems. This section turns the operating model into a clearer, faster-to-scan story.",
        bullets: [
          "Named ownership across pickup, linehaul, and delivery milestones",
          "Production-aligned reporting cadence, not generic tracking events",
          "Recovery options defined before disruption reaches the plant floor",
        ],
        stats: [
          { value: "JIT / JIS", label: "Program fit" },
          { value: "Enclosed", label: "Vehicle protocol" },
          { value: "USMCA", label: "Border discipline" },
          { value: "24 / 7", label: "Ops coverage" },
        ],
      },
    },
    trustProof: {
      sectionTitle: "Control Standards Buyers Can Audit",
      comparisonHeading: "Our operating standards vs. common market practice",
      intro:
        "The difference between a standard carrier relationship and a production-critical automotive program shows up in operating discipline, not marketing language.",
      pillars: [
        {
          title: "Asset Protection",
          icon: "AP",
          industryBaseline: "Coverage and cargo protection are often treated as a dispatch prerequisite rather than a lane-specific control standard.",
          sspStandard: "Protection posture is matched to lane, equipment, custody points, and asset value before movement begins.",
          evidence: "Shipment files retain pre-dispatch verification, condition documentation, and delivery-closeout records.",
          industryScore: 38,
          sspScore: 88,
        },
        {
          title: "Cross-Border Compliance",
          icon: "RC",
          industryBaseline: "Documentation quality varies by movement and is often finalized too late in the process to protect the lane.",
          sspStandard: "Border-facing automotive freight moves with document validation, broker coordination, and named ownership before crossing risk becomes transit risk.",
          evidence: "Shipment files retain compliance checkpoints and document-confirmation workflows.",
          industryScore: 42,
          sspScore: 90,
        },
        {
          title: "Exception Visibility",
          icon: "SV",
          industryBaseline: "Updates often arrive after decision windows narrow, with limited context for corrective action.",
          sspStandard: "Exception reporting is aligned to production planning, receiving, and commercial escalation needs.",
          evidence: "Corrective-action timelines and owner-led updates are retained through closeout.",
          industryScore: 35,
          sspScore: 86,
        },
      ],
      evidenceNote:
        "Examples of operating records and control artifacts can be reviewed during program qualification.",
    },
    relatedServices: {
      eyebrowLabel: "Mode Selection",
      sectionTitle: "Automotive Programs by Freight Profile",
      intro:
        "The right operating model depends on the cargo, the recovery tolerance, and the border exposure on the lane.",
      modeFit: [
        {
          scenario: "Production-sequence inbound",
          recommendation: "Dedicated truckload with expedited recovery support",
          rationale: "Protects timing, preserves plant-facing discipline, and creates a clear recovery path for critical exceptions.",
        },
        {
          scenario: "Finished vehicles and specialty units",
          recommendation: "Enclosed specialized transport",
          rationale: "Aligns equipment, custody control, and delivery-condition expectations to asset value.",
        },
        {
          scenario: "Canada-US-Mexico automotive lanes",
          recommendation: "Cross-border execution with documentation governance",
          rationale: "Reduces border variability and supports controlled handoffs across the corridor.",
        },
      ],
      links: [
        { label: "Expedited & Specialized", href: "/services/expedited-specialized" },
        { label: "Truckload", href: "/services/truckload" },
        { label: "Cross-Border", href: "/solutions/cross-border" },
        { label: "LTL & Consolidation", href: "/services/ltl" },
      ],
    },
    finalCta: {
      kicker: "Ready to review the network",
      title: "Review Your Automotive Network with SSP",
      body: "If production timing, vehicle condition, or border reliability are carrying too much risk in your network, we can review the freight model with you and define where tighter control will matter most.",
      implementationSteps: [
        {
          step: "01",
          title: "Network and lane review",
          body: "We assess production sensitivity, freight profile, corridor structure, and exposure points.",
        },
        {
          step: "02",
          title: "Operating model design",
          body: "We align escalation paths, visibility cadence, handling standards, and border controls to the network.",
        },
        {
          step: "03",
          title: "Launch and governance",
          body: "Execution begins with active oversight, defined ownership, and structured review once the lanes are live.",
        },
      ],
      proof: [
        { value: "≤ 15 min", label: "Response time" },
        { value: "24 / 7", label: "Operations desk" },
        { value: "CA / US / MX", label: "Corridor coverage" },
      ],
      trustSignals: [
        "Named account ownership",
        "Production-aligned visibility",
        "Audit-ready documentation",
        "Pre-staged recovery support",
      ],
      ctas: {
        primary: {
          label: "Request an Automotive Review",
          href: "/quote",
          ctaId: "industry_automotive_final_quote",
        },
        secondary: {
          label: "Speak with an Automotive Specialist",
          ctaId: "industry_automotive_final_chat",
          action: "live-chat",
        },
      },
    },
  },

  manufacturing: {
    key: "manufacturing",
    slug: "manufacturing-materials",
    meta: {
      title: "Manufacturing & Materials Logistics | Industrial Supply Chain | SSP Group",
      description:
        "Raw materials and production-critical freight moved with consistency, visibility, and recovery when conditions shift. Industrial supply chain execution across North America.",
      heroImage: "/_optimized/industries/manufacturing-hero-premium-v1.png",
      ogImage: "/_optimized/industries/manufacturing-hero-premium-v1.png",
    },
    hero: {
      kicker: "Manufacturing & Materials Logistics",
      valueHeadline: "Throughput stability, protected.",
      title: "Supply Continuity Starts at the Loading Dock",
      description:
        "From raw materials and production-critical inputs to repeat industrial replenishment across North America, we manages manufacturing and materials freight with lane discipline, commodity-fit handling, and owner-led exception control that keeps flow stable when conditions tighten.",
      cta: { label: "Review Your Manufacturing Network", href: "/contact", ctaId: "industry_manufacturing_hero_contact" },
      secondaryCta: { label: "See the Operating Model", href: "#how-we-support", ctaId: "industry_manufacturing_hero_capabilities" },
      theme: "slate",
      signals: ["Plant-aligned inbound cadence", "Commodity-fit handling controls", "Owner-led exception governance"],
      proofStrip: [
        { value: "Milestone-safe", label: "Inbound rhythm" },
        { value: "Commodity-fit", label: "Handling controls" },
        { value: "Owner-led", label: "Exception governance" },
      ],
    },
    whatMatters: {
      sectionTitle: "What Keeps Manufacturing Running",
      intro:
        "Manufacturing performance depends on inbound rhythm, not last-minute firefighting. Late or compromised materials create downstream pressure across labor, equipment, and customer delivery commitments. This model prioritizes lane stability, controlled exception response, and handling standards that protect throughput.",
      items: [
        {
          title: "Inbound Rhythm You Can Plan Around",
          body: "Shipments are managed to milestone checkpoints with proactive status communication so planning, receiving, and production teams can operate from the same timeline.",
        },
        {
          title: "Exception Control with Clear Ownership",
          body: "When disruptions occur, response ownership is immediate: root cause, revised execution path, and documented updates are communicated through resolution.",
        },
        {
          title: "Handling Engineered to Commodity Risk",
          body: "Equipment and securement are matched to commodity profile and handling sensitivity, with documentation quality that supports operational and audit requirements.",
        },
      ],
      interactiveWidget: "load-optimization",
      widgetSupportTitle: "Load Engineering for Manufacturing Flow",
      widgetSupportBody:
        "Utilization is not a volume metric alone. Density, shipment structure, and stress tolerance determine safe efficiency. This model helps teams evaluate loading posture before dispatch.",
      widgetSupportBullets: [
        "FTL: higher structural efficiency when density and distribution remain controlled.",
        "LTL: mixed profiles create natural gaps and require tighter cube planning discipline.",
        "High density raises stress exposure; load plans are engineered to stay within safe operating limits.",
      ],
      widgetSupportFooter: "Engineered utilization. Controlled stress. Documented execution.",
    },
    howWeSupport: {
      sectionTitle: "How SSP Supports Manufacturing & Materials",
      intro:
        "Building on these throughput priorities, we support manufacturing operations with a control-first model focused on inbound rhythm, handling discipline, exception ownership, and execution transparency.",
      cards: [
        {
          eyebrow: "Plan with us",
          title: "Inbound rhythm design",
          summary: "Transport plans are aligned to production cadence, receiving constraints, and material criticality.",
          details:
            "Lane playbooks define appointment strategy, sequencing priorities, and escalation paths so movement supports floor stability.",
          metric: "Operating playbooks",
        },
        {
          eyebrow: "Execute it",
          title: "Commodity-fit handling execution",
          summary: "Equipment and securement protocols are mapped to commodity profile and handling sensitivity.",
          details:
            "From palletized inputs to dense raw material, each movement is executed to preserve cargo condition and receiving readiness.",
          metric: "Handling controls",
        },
        {
          eyebrow: "Monitor in real time",
          title: "Planner-ready visibility",
          summary: "Milestone and exception reporting is structured for planning, receiving, and plant coordination decisions.",
          details:
            "Updates include execution status, exception cause, and corrective path so stakeholders can adjust proactively rather than react late.",
          metric: "Shared visibility",
        },
        {
          eyebrow: "Strengthen resilience",
          title: "Downtime risk containment",
          summary: "When lanes deviate, documented recovery paths are activated to maintain inbound continuity.",
          details:
            "Escalation ownership remains explicit through resolution, reducing cascading disruption across production and fulfillment timelines.",
          metric: "Exception governance",
        },
      ],
      aside: {
        badge: "Manufacturing operating model",
        title: "Execution built for inbound rhythm, materials control, and production-facing visibility.",
        body: "Manufacturing freight performs best when lane cadence, handling posture, and exception ownership are aligned before the load begins to move. We run industrial programs with cleaner planning discipline and clearer operational control when schedule pressure starts to build.",
        bullets: [
          "Inbound planning aligned to production timing, receiving limits, and material criticality",
          "Commodity-fit handling that protects cargo condition and receiving readiness across industrial lanes",
          "Milestone and exception reporting structured for planners, receiving teams, and operations leaders",
        ],
        stats: [
          { value: "Plant-ready", label: "Inbound cadence" },
          { value: "Commodity-fit", label: "Handling posture" },
          { value: "Owner-led", label: "Exception control" },
          { value: "24 / 7", label: "Ops coverage" },
        ],
      },
    },
    trustProof: {
      sectionTitle: "The SSP Standard",
      comparisonHeading: "Our approach vs. typical market practice",
      intro:
        "Manufacturing buyers benchmark partners on risk coverage, process compliance, and operational visibility under schedule pressure.",
      pillars: [
        {
          title: "Insurance Coverage",
          icon: "IC",
          industryBaseline: "Insurance is often validated once, with limited linkage to commodity-specific risk.",
          sspStandard: "Coverage verification is tied to lane and material profile before dispatch authorization.",
          evidence: "Pre-dispatch risk and insurance check attached to lane execution brief.",
          industryScore: 44,
          sspScore: 81,
        },
        {
          title: "Regulatory Compliance",
          icon: "RC",
          industryBaseline: "Compliance is frequently handled as a separate audit track from daily operations.",
          sspStandard: "Compliance controls are embedded in dispatch, handoff, and exception closure workflow.",
          evidence: "Shipment closeout includes compliance checkpoints and owner signoff.",
          industryScore: 46,
          sspScore: 85,
        },
        {
          title: "Shipment Visibility",
          icon: "SV",
          industryBaseline: "Visibility tends to be reactive when receiving windows are already at risk.",
          sspStandard: "Milestone cadence and exception alerts are structured for production-facing decisions.",
          evidence: "Timestamped milestone and recovery log retained per load.",
          industryScore: 41,
          sspScore: 83,
        },
      ],
      evidenceNote:
        "Operational artifacts and document samples are shared during onboarding and lane design review.",
    },
    relatedServices: {
      sectionTitle: "Mode Fit and Coverage",
      intro: "Match service design to inbound criticality, load profile, and network rhythm.",
      modeFit: [
        {
          scenario: "Production-critical inbound materials",
          recommendation: "Truckload with escalation controls",
          rationale: "Provides stable cadence and controlled response when schedule risk appears.",
        },
        {
          scenario: "Mixed-volume replenishment lanes",
          recommendation: "LTL with consolidation discipline",
          rationale: "Balances cost and service while preserving milestone visibility.",
        },
        {
          scenario: "Long-haul repetitive corridors",
          recommendation: "Truckload with planning buffer",
          rationale: "Supports predictable cycle planning for repeatable manufacturing flows.",
        },
      ],
      links: [
        { label: "Truckload", href: "/services/truckload" },
        { label: "LTL", href: "/services/ltl" },
        { label: "Value-Added", href: "/services/value-added" },
      ],
    },
    finalCta: {
      kicker: "Ready to simplify your manufacturing freight?",
      title: "Let's align on your lanes.",
      body: "Talk to our team about your raw materials, components, and production-critical moves. We'll outline how we deliver consistency and visibility.",
      implementationSteps: [
        {
          step: "01",
          title: "Network and flow assessment",
          body: "We document lane criticality, receiving constraints, and production dependencies.",
        },
        {
          step: "02",
          title: "Execution playbook setup",
          body: "We define handling standards, milestone governance, and escalation rules by lane.",
        },
        {
          step: "03",
          title: "Controlled launch and tuning",
          body: "Operations start with active oversight and structured cadence optimization.",
        },
      ],
      proof: [
        { value: "≤ 15 min", label: "Initial response" },
        { value: "24/7", label: "Operations coverage" },
        { value: "CA–US–MX", label: "Lane scope" },
      ],
      trustSignals: ["Lane-level control", "Proactive updates", "Audit-ready documentation"],
      ctas: {
        primary: {
          label: "Request a Quote",
          href: "/quote",
          ctaId: "industry_manufacturing_final_quote",
        },
        secondary: {
          label: "Speak to a Live Agent",
          ctaId: "industry_manufacturing_final_live_agent",
          action: "live-chat",
        },
      },
    },
  },

  retail: {
    key: "retail",
    slug: "retail-consumer-goods",
    meta: {
      title: "Retail & Consumer Goods Logistics | Cross-Border Replenishment | SSP Group",
      description:
        "Retail and consumer goods logistics for store replenishment, distribution centers, and cross-border freight across Canada, the United States, and Mexico. We manage retail freight with window control, visibility, and surge-ready execution.",
      heroImage: "/_optimized/industries/retail-hero-premium-v3.png",
      ogImage: "/_optimized/industries/retail-hero-premium-v3.png",
    },
    hero: {
      kicker: "Retail & Consumer Goods Logistics",
      valueHeadline: "Shelf availability, protected.",
      title: "Shelf Availability Starts with Lane Discipline",
      description:
        "From store replenishment and DC freight to promotion-driven surges and cross-border retail flows across Canada, the United States, and Mexico, we runs consumer goods logistics with delivery-window control, escalation discipline, and decision-ready visibility.",
      cta: { label: "Review Your Retail Network", href: "/contact", ctaId: "industry_retail_hero_contact" },
      secondaryCta: { label: "See the Operating Model", href: "#how-we-support", ctaId: "industry_retail_hero_capabilities" },
      theme: "blue",
      signals: ["Window-governed store and DC delivery", "Campaign-aware surge planning", "Cross-border retail flow control"],
      proofStrip: [
        { value: "Window-safe", label: "Store and DC execution" },
        { value: "Border-ready", label: "CA / US / MX retail lanes" },
        { value: "Decision-ready", label: "Retail visibility" },
      ],
    },
    whatMatters: {
      eyebrowLabel: "Industry Demands",
      sectionTitle: "Where Retail Availability Breaks Down First",
      intro:
        "Retail service failure rarely begins at the shelf. It starts earlier in missed delivery windows, weak exception control, and avoidable friction across North American replenishment lanes. For retailers and consumer goods brands, availability depends on disciplined execution across stores, DCs, and cross-border flow.",
      items: [
        {
          title: "Delivery-Window Control Across Stores and DCs",
          body: "Retail networks are judged on clean appointments, receiving readiness, and dependable replenishment timing. A late or poorly managed delivery creates pressure at the dock, in inventory positions, and eventually in market.",
        },
        {
          title: "Decision-Ready Exception Visibility",
          body: "Updates only matter when they arrive early enough to protect allocation, labor planning, and in-stock performance. Retail teams need concise status, clear ownership, and corrective action they can trust.",
        },
        {
          title: "Cross-Border and Surge Readiness",
          body: "Campaign periods, seasonal peaks, and Canada-US-Mexico retail freight flows expose weak operating discipline quickly. Capacity, documentation, and escalation rules need to be set before the network tightens, not while it is already slipping.",
        },
      ],
      interactiveWidget: "demand-surge",
      widgetSupportTitle: "Surge Exposure Across Retail Networks",
      widgetSupportBody:
        "Demand volatility, node density, and border exposure shift pressure unevenly across retail networks. We use the same planning logic to identify where queue risk, stockout exposure, and service deterioration are most likely to build first.",
      widgetSupportBullets: [
        "Store-led replenishment often follows a steadier cadence, while omnichannel volume introduces sharper peaks and less forgiving node pressure.",
        "More nodes can reduce queue concentration, but only when routing logic, appointment control, and visibility remain aligned.",
        "Surge response is strongest when priority rules, capacity posture, and border-facing ownership are defined before the peak begins.",
      ],
      widgetSupportFooter: "Pressure mapped early. Service protected before the network tightens.",
    },
    howWeSupport: {
      sectionTitle: "How SSP Governs Retail and Consumer Goods Freight",
      intro:
        "SSP's retail model is built around four controls that matter most to buyers: replenishment planning, delivery-window performance, cross-border continuity, and escalation discipline when the network comes under pressure.",
      cards: [
        {
          eyebrow: "Network Planning",
          title: "Replenishment and campaign alignment",
          summary: "Capacity, routing, and service posture are aligned to replenishment cadence, promotional calendars, and node-level demand before the network tightens.",
          details:
            "Retail freight performs best when store cadence, DC throughput, and campaign timing are managed as one operating system rather than separate transportation events.",
          metric: "Cadence planning",
        },
        {
          eyebrow: "Store & DC Execution",
          title: "Delivery-window control",
          summary: "Appointments and receiving windows are managed with disciplined handoffs across stores, distribution centers, and replenishment lanes.",
          details:
            "Dock performance is treated as a commercial service issue, not simply a dispatch milestone. Clean arrivals, clean PODs, and clean closeout protect availability.",
          metric: "Dock governance",
        },
        {
          eyebrow: "Cross-Border Control",
          title: "Canada-US-Mexico retail corridor execution",
          summary: "Border-facing retail freight moves with document readiness, broker coordination, and handoff discipline before customs variability becomes shelf risk.",
          details:
            "For retail and consumer goods programs, cross-border discipline protects replenishment timing, receiving confidence, and product flow across North America.",
          metric: "Border continuity",
        },
        {
          eyebrow: "Operational Visibility",
          title: "Decision-ready exception reporting",
          summary: "Retail teams receive concise milestone updates, owner-led escalations, and corrective-action context at the moments that matter most.",
          details:
            "Reporting is structured for merchandising, transportation, and operations leaders who need to protect receiving windows and in-market availability before issues compound.",
          metric: "Exception clarity",
        },
      ],
      aside: {
        badge: "Retail operating model",
        title: "Execution built for shelf availability, window discipline, and network control.",
        body: "Retail freight is judged at receiving, in inventory positions, and during peak periods when the margin for error narrows. We run retail programs with planned cadence, clean handoffs, and escalation ownership that holds under pressure.",
        bullets: [
          "Campaign-aware planning across stores, DCs, and replenishment lanes",
          "Cross-border coordination that protects Canada-US-Mexico retail flow",
          "Exception reporting retail teams can act on before pressure compounds",
        ],
        stats: [
          { value: "Stores / DCs", label: "Network flow" },
          { value: "CA / US / MX", label: "Cross-border lanes" },
          { value: "Peak-ready", label: "Surge posture" },
          { value: "24 / 7", label: "Ops coverage" },
        ],
      },
    },
    trustProof: {
      sectionTitle: "Operating Standards Buyers Can Verify",
      comparisonHeading: "Our operating standards vs. common retail freight practice",
      intro:
        "Retail freight is not judged by how many modes a provider lists. It is judged by whether replenishment, receiving, and cross-border execution stay controlled when the network comes under pressure.",
      pillars: [
        {
          title: "Delivery-Window Governance",
          icon: "DG",
          industryBaseline: "Appointments and service expectations are often managed broadly, with limited linkage to specific store, DC, or campaign pressure points.",
          sspStandard: "Execution standards are set by receiving profile, delivery window, and service sensitivity before freight enters the cycle.",
          evidence: "Lane playbooks retain appointment logic, service triggers, and owner-led escalation paths.",
          industryScore: 43,
          sspScore: 83,
        },
        {
          title: "Cross-Border Control",
          icon: "CB",
          industryBaseline: "Retail cross-border freight is often treated as ordinary linehaul until customs, document, or handoff issues begin to slow replenishment.",
          sspStandard: "Canada-US-Mexico retail lanes move with document readiness, broker coordination, and named ownership before border variability turns into shelf risk.",
          evidence: "Shipment files retain document checkpoints, broker coordination notes, and border-facing exception workflows.",
          industryScore: 41,
          sspScore: 89,
        },
        {
          title: "Exception Visibility",
          icon: "EV",
          industryBaseline: "Updates frequently arrive after delivery windows tighten or inventory exposure is already expanding.",
          sspStandard: "Milestone reporting and corrective-action updates are issued in a cadence retail teams can use to protect receiving, allocation, and in-market availability.",
          evidence: "Variance logs capture owner, impact, and recovery timeline through closeout.",
          industryScore: 39,
          sspScore: 86,
        },
      ],
      evidenceNote:
        "Examples of lane playbooks, service logs, and border-control records can be reviewed during qualification.",
    },
    relatedServices: {
      eyebrowLabel: "Mode Selection",
      sectionTitle: "Retail Programs by Lane and Network Need",
      intro: "The right retail operating model depends on replenishment cadence, order profile, product sensitivity, and cross-border exposure.",
      modeFit: [
        {
          scenario: "Store and DC replenishment across Canada and the US",
          recommendation: "Truckload with appointment governance",
          rationale: "Supports predictable receiving performance, cleaner delivery windows, and steadier replenishment flow across the network.",
        },
        {
          scenario: "Mixed-volume retail and consumer goods moves",
          recommendation: "LTL and consolidation with milestone visibility",
          rationale: "Balances cost and service while preserving shipment transparency and cleaner exception handling.",
        },
        {
          scenario: "Mexico-origin consumer goods and seasonal retail programs",
          recommendation: "Cross-border execution with temperature-controlled or value-added support",
          rationale: "Protects border continuity, product condition, and receiving readiness when demand and handoff pressure rise.",
        },
      ],
      links: [
        { label: "Truckload", href: "/services/truckload" },
        { label: "LTL", href: "/services/ltl" },
        { label: "Cross-Border", href: "/solutions/cross-border" },
        { label: "Temperature-Controlled", href: "/services/temperature-controlled" },
      ],
    },
    finalCta: {
      kicker: "Ready to review the network",
      title: "Review Your Retail and Consumer Goods Network with SSP",
      body: "If shelf availability, receiving performance, or cross-border retail freight are carrying too much risk in your network, we can review the lanes with you and identify where tighter control, cleaner visibility, and stronger escalation discipline will have the most impact.",
      implementationSteps: [
        {
          step: "01",
          title: "Network and lane assessment",
          body: "We map replenishment cadence, delivery windows, product sensitivity, and Canada-US-Mexico lane exposure.",
        },
        {
          step: "02",
          title: "Operating model design",
          body: "We define appointment controls, visibility cadence, border workflows, and escalation ownership by lane.",
        },
        {
          step: "03",
          title: "Launch and governance",
          body: "Execution starts with active oversight, service review, and structured adjustment as the network stabilizes.",
        },
      ],
      proof: [
        { value: "≤ 15 min", label: "Response time" },
        { value: "24 / 7", label: "Operations desk" },
        { value: "CA / US / MX", label: "Corridor coverage" },
      ],
      trustSignals: [
        "Window-controlled execution",
        "Decision-ready updates",
        "Single point of accountability",
        "Border-ready documentation",
      ],
      ctas: {
        primary: { label: "Request a Retail Network Review", href: "/quote", ctaId: "industry_retail_final_quote" },
        secondary: {
          label: "Speak with a Retail Specialist",
          ctaId: "industry_retail_final_live_agent",
          action: "live-chat",
        },
      },
    },
  },

  food: {
    key: "food",
    slug: "food-beverage",
    meta: {
      title: "Food & Beverage Logistics | Cold Chain & Temperature-Controlled | SSP Group",
      description:
        "Temperature-aware handling, clean documentation, and on-time execution to protect shelf life and brand trust. Food and beverage freight with precision.",
      heroImage: "/_optimized/industries/food-hero-premium-v6.png",
      ogImage: "/_optimized/industries/food-hero-premium-v6.png",
    },
    hero: {
      kicker: "Food & Beverage Logistics",
      valueHeadline: "Freshness integrity, protected.",
      title: "Cold-Chain Integrity from Origin to Receiving",
      description:
        "From temperature-controlled replenishment and retail-ready food freight to freshness-sensitive cross-border lanes across North America, we manages food and beverage logistics with temperature discipline, transit-time control, and compliance-ready records that protect product quality in motion.",
      cta: { label: "Review Your Cold-Chain Network", href: "/contact", ctaId: "industry_food_hero_contact" },
      secondaryCta: { label: "See the Operating Model", href: "#how-we-support", ctaId: "industry_food_hero_capabilities" },
      theme: "green",
      signals: ["Temperature-governed lane execution", "Freshness-window and dwell control", "Compliance-ready cold-chain records"],
      proofStrip: [
        { value: "Cold-chain", label: "Temperature posture" },
        { value: "Freshness-safe", label: "Transit discipline" },
        { value: "Audit-ready", label: "Traceability" },
      ],
    },
    whatMatters: {
      sectionTitle: "What Protects Product Integrity",
      intro:
        "Food and beverage freight is governed by three non-negotiables: temperature control, transit-time discipline, and documentation quality. When one fails, product integrity and brand trust are exposed. The operating model prioritizes cold-chain stability, controlled handoffs, and compliance-ready records.",
      items: [
        {
          title: "Temperature Governance by Lane",
          body: "Equipment selection and monitoring requirements are aligned to product profile, with documented temperature handling expectations from pickup through delivery.",
        },
        {
          title: "Transit-Time Control for Shelf-Life Risk",
          body: "Appointment precision and transit execution are managed to reduce time-at-risk and protect freshness windows at receiving facilities.",
        },
        {
          title: "Compliance-Ready Records and Exceptions",
          body: "Shipment documents, temperature records, and exception logs are maintained in a traceable format that supports internal QA and customer audit requirements.",
        },
      ],
      interactiveWidget: "freshness-preservation",
      widgetSupportTitle: "Cold-Chain Control Model",
      widgetSupportBody:
        "Freshness is a function of temperature discipline and time-at-risk. This model shows how deviation compounds exposure and where intervention protects product integrity.",
      widgetSupportBullets: [
        "Each product profile has a target band; out-of-band exposure accelerates quality decay.",
        "Longer transit increases cumulative risk, making route discipline and handoff timing critical.",
        "Exception records and temperature documentation maintain compliance traceability through delivery.",
      ],
      widgetSupportFooter: "Temperature governance. Time control. Compliance-ready records.",
    },
    howWeSupport: {
      sectionTitle: "How SSP Supports Food & Beverage Logistics",
      intro:
        "Building on these integrity priorities, we protect food and beverage shipments through temperature-governed execution, transit-time control, and documentation discipline across cold-chain lanes.",
      cards: [
        {
          eyebrow: "Plan with us",
          title: "Cold-chain lane design",
          summary: "Lane plans are built around product sensitivity, transit limits, and receiving requirements before dispatch begins.",
          details:
            "Equipment strategy, timing controls, and escalation steps are documented up front to reduce preventable quality exposure.",
          metric: "Cold-chain planning",
        },
        {
          eyebrow: "Execute it",
          title: "Integrity-first transport control",
          summary: "Loads move with specification-matched equipment and monitored handling from pickup through final handoff.",
          details:
            "Execution discipline centers on thermal control, appointment precision, and clean transfer-of-custody at each milestone.",
          metric: "Process discipline",
        },
        {
          eyebrow: "Monitor in real time",
          title: "Compliance-ready visibility",
          summary: "Status and document trails are maintained in a traceable format that supports QA and compliance workflows.",
          details:
            "Milestone updates and exception records are structured so operations and quality teams can intervene quickly when needed.",
          metric: "Traceability",
        },
        {
          eyebrow: "Strengthen resilience",
          title: "Freshness-window recovery",
          summary: "If disruptions occur, recovery options are executed to protect freshness windows and receiving readiness.",
          details:
            "Alternate routing and controlled escalation are coordinated quickly to contain quality risk and preserve customer confidence.",
          metric: "Risk containment",
        },
      ],
      aside: {
        badge: "Cold-chain operating model",
        title: "Execution built for temperature discipline, freshness protection, and traceable control.",
        body: "Food and beverage freight is judged by what happens between pickup, transit, and receiving when temperature drift or time-at-risk begins to expand. We run cold-chain programs with tighter thermal governance, cleaner handoffs, and visibility teams can use before integrity risk compounds.",
        bullets: [
          "Lane planning aligned to product sensitivity, temperature band, and receiving-window requirements",
          "Cold-chain execution designed to reduce dwell, protect freshness windows, and preserve product condition",
          "Milestone and exception reporting structured for operations, QA, and compliance stakeholders together",
        ],
        stats: [
          { value: "Cold-chain", label: "Thermal posture" },
          { value: "Freshness-safe", label: "Transit control" },
          { value: "Traceable", label: "QA visibility" },
          { value: "24 / 7", label: "Ops coverage" },
        ],
      },
    },
    trustProof: {
      sectionTitle: "The SSP Standard",
      comparisonHeading: "Our approach vs. typical market practice",
      intro:
        "Food and beverage teams compare partners on cold-chain exposure controls, compliance rigor, and visibility during freshness-sensitive windows.",
      pillars: [
        {
          title: "Insurance Coverage",
          icon: "IC",
          industryBaseline: "Coverage checks are often broad and not tied to thermal or shelf-life exposure conditions.",
          sspStandard: "Coverage validation is tied to product sensitivity and route risk before movement starts.",
          evidence: "Product-profile risk sheet included in dispatch readiness packet.",
          industryScore: 42,
          sspScore: 83,
        },
        {
          title: "Regulatory Compliance",
          icon: "RC",
          industryBaseline: "Compliance controls are frequently treated as periodic documentation tasks.",
          sspStandard: "Compliance checkpoints are enforced in daily cold-chain execution and exception closure.",
          evidence: "Temperature and handling checkpoint log retained with load records.",
          industryScore: 47,
          sspScore: 87,
        },
        {
          title: "Shipment Visibility",
          icon: "SV",
          industryBaseline: "Status updates may not arrive in time for freshness-window intervention.",
          sspStandard: "Milestone and deviation reporting is structured for immediate QA and operations response.",
          evidence: "Exception-to-recovery timeline with timestamps and assigned owner.",
          industryScore: 38,
          sspScore: 85,
        },
      ],
      evidenceNote:
        "QA-supporting record samples are available during onboarding and operating-model alignment.",
    },
    relatedServices: {
      sectionTitle: "Mode Fit and Coverage",
      intro: "Align transport mode to temperature sensitivity, shelf-life pressure, and lane constraints.",
      modeFit: [
        {
          scenario: "High-sensitivity refrigerated lanes",
          recommendation: "Temperature-Controlled with governance checkpoints",
          rationale: "Maintains thermal control and documented handoffs across the full route.",
        },
        {
          scenario: "High-volume standard shipments",
          recommendation: "Truckload with milestone discipline",
          rationale: "Supports predictable timing and cleaner receiving execution.",
        },
        {
          scenario: "Urgent freshness-window recovery",
          recommendation: "Expedited and Cross-Border options",
          rationale: "Provides accelerated recovery paths when schedule or border constraints emerge.",
        },
      ],
      links: [
        { label: "Temperature-Controlled", href: "/services/temperature-controlled" },
        { label: "Truckload", href: "/services/truckload" },
        { label: "Expedited & Specialized", href: "/services/expedited-specialized" },
        { label: "Cross-Border", href: "/solutions/cross-border" },
      ],
    },
    finalCta: {
      kicker: "Ready to move your food & beverage freight?",
      title: "Let's protect your cold chain.",
      body: "Talk to our team about your temperature requirements and lanes. We'll outline how we deliver precision and documentation.",
      implementationSteps: [
        {
          step: "01",
          title: "Product and lane qualification",
          body: "We review product sensitivity, transit limits, and compliance expectations by lane.",
        },
        {
          step: "02",
          title: "Cold-chain control setup",
          body: "We establish temperature handling, documentation cadence, and escalation protocols.",
        },
        {
          step: "03",
          title: "Launch with compliance oversight",
          body: "Operations begin with active monitoring and structured quality-risk reporting.",
        },
      ],
      proof: [
        { value: "≤ 15 min", label: "Initial response" },
        { value: "24/7", label: "Operations coverage" },
        { value: "CA–US–MX", label: "Lane scope" },
      ],
      trustSignals: ["Temperature documentation", "Proactive updates", "Audit-ready paperwork"],
      ctas: {
        primary: { label: "Request a Quote", href: "/quote", ctaId: "industry_food_final_quote" },
        secondary: {
          label: "Speak to a Live Agent",
          ctaId: "industry_food_final_live_agent",
          action: "live-chat",
        },
      },
    },
  },

  construction: {
    key: "construction",
    slug: "construction-building-materials",
    meta: {
      title: "Construction & Building Materials Logistics | Project-Specific Freight | SSP Group",
      description:
        "Heavy equipment, building materials, and site-critical freight delivered with permit-aware planning, safety governance, and checkpoint visibility across North America.",
      heroImage: "/_optimized/industries/construction-hero-premium-v1.png",
      ogImage: "/_optimized/industries/construction-hero-premium-v1.png",
    },
    hero: {
      kicker: "Construction & Building Materials Logistics",
      valueHeadline: "Project schedules, protected.",
      title: "Site-Critical Freight, Delivered on Schedule",
      description:
        "From heavy equipment and structural steel to building materials and oversized loads across North America, we manages construction freight with permit-aware route engineering, safety-governed execution, and checkpoint visibility that keeps project timelines intact.",
      cta: {
        label: "Review Your Project-Specific Freight",
        href: "/contact",
        ctaId: "industry_construction_hero_contact",
      },
      secondaryCta: { label: "See the Operating Model", href: "#how-we-support", ctaId: "industry_construction_hero_capabilities" },
      theme: "amber",
      signals: ["Permit-aware route and load engineering", "Safety-governed heavy-haul execution", "Checkpoint-based project visibility"],
      proofStrip: [
        { value: "Permit-ready", label: "Route compliance" },
        { value: "Safety-led", label: "Execution governance" },
        { value: "Project-fit", label: "Schedule protection" },
      ],
    },
    whatMatters: {
      sectionTitle: "What Secures Site-Critical Delivery",
      intro:
        "Construction and building-materials freight carries schedule risk the moment a site window, crane booking, or crew plan is missed. Permit constraints, route engineering, equipment fit, and delivery sequencing need to be locked before movement begins. The operating priority is safety-led control, checkpoint visibility, and accountable execution from dispatch through site handoff.",
      items: [
        {
          title: "Pre-Move Safety and Permit Readiness",
          body: "Equipment fit, securement approach, and applicable routing constraints are validated before dispatch so movement begins on a compliant foundation.",
        },
        {
          title: "Command Ownership Through Each Checkpoint",
          body: "A single operations owner manages status communication, checkpoint progress, and exception escalation from origin through site delivery.",
        },
        {
          title: "Equipment-Fit Planning for High-Consequence Loads",
          body: "Transport mode, route assumptions, and handling controls are aligned to load class so project timelines and site operations remain protected.",
        },
      ],
      interactiveWidget: "heavy-haul-route",
      widgetSupportTitle: "Route Compliance Control",
      widgetSupportBody:
        "Project requirements escalate with load class and route complexity. This model shows how permits, escorts, and control checkpoints shift before mobilization.",
      widgetSupportBullets: [
        "Standard heavy freight may run baseline controls; oversized moves increase permit and escort demands.",
        "Hazardous classifications add compliance requirements, handling controls, and route restrictions.",
        "Special-handling moves are engineered in advance so legal and schedule constraints stay aligned.",
      ],
      widgetSupportFooter: "Permit-aware planning. Safety governance. Schedule protection.",
    },
    howWeSupport: {
      sectionTitle: "How SSP Supports Construction & Building Materials",
      intro:
        "Our construction logistics model applies project-level control: permit-aware planning, safety governance, checkpoint visibility, and accountable recovery for every movement.",
      cards: [
        {
          eyebrow: "Plan with us",
          title: "Permit and route engineering",
          summary: "Transport plans are engineered around permit constraints, route complexity, and site delivery milestones.",
          details:
            "Regulatory checkpoints, escort considerations, and contingency routes are established before mobilization begins.",
          metric: "Project planning",
        },
        {
          eyebrow: "Execute it",
          title: "Safety-governed execution control",
          summary: "Execution runs under defined safety and compliance controls with clear operational command throughout movement.",
          details:
            "From pre-move preparation through final-site delivery, process adherence is managed against project-critical requirements.",
          metric: "Safety governance",
        },
        {
          eyebrow: "Monitor in real time",
          title: "Checkpoint-based visibility",
          summary: "Project teams receive checkpoint progress, timing adjustments, and active risk-control status in real time.",
          details:
            "Reporting is structured to keep project, procurement, and site operations aligned without information gaps.",
          metric: "Project reporting",
        },
        {
          eyebrow: "Strengthen resilience",
          title: "Schedule-protection recovery",
          summary: "When constraints emerge, predefined recovery paths are activated to protect project schedule commitments.",
          details:
            "Alternate routing and resource options are coordinated with clear ownership to maintain delivery certainty on critical assets.",
          metric: "Recovery control",
        },
      ],
      aside: {
        badge: "Project freight operating model",
        title: "Execution built for permit control, safety governance, and schedule-protected delivery.",
        body: "Construction freight is judged at the site gate, during permit windows, and when project schedules compress. We run project freight with engineered route planning, safety-governed execution, and checkpoint ownership that holds when conditions shift across the corridor.",
        bullets: [
          "Permit and route engineering completed before heavy-haul or oversized loads are released to move",
          "Safety-governed execution with clear operational command from dispatch through site delivery",
          "Checkpoint reporting structured for project managers, procurement, and site operations teams",
        ],
        stats: [
          { value: "Permit-ready", label: "Route engineering" },
          { value: "Safety-led", label: "Execution control" },
          { value: "Project-fit", label: "Schedule posture" },
          { value: "24 / 7", label: "Ops coverage" },
        ],
      },
    },
    trustProof: {
      sectionTitle: "The SSP Standard",
      comparisonHeading: "Our approach vs. typical market practice",
      intro:
        "Construction freight is judged by permit readiness, delivery-window control, and checkpoint visibility under live project pressure. We is built to protect site schedules with engineered routing, compliance discipline, and clear operational ownership.",
      pillars: [
        {
          title: "Insurance Coverage",
          icon: "IC",
          industryBaseline: "Coverage verification is often handled as a static prerequisite rather than project-specific risk control.",
          sspStandard: "Coverage is reviewed against load class, route constraints, and project consequence before mobilization.",
          evidence: "Project risk-coverage review recorded in pre-move readiness file.",
          industryScore: 41,
          sspScore: 82,
        },
        {
          title: "Regulatory Compliance",
          icon: "RC",
          industryBaseline: "Permit and regulatory checks are sometimes fragmented across teams.",
          sspStandard: "Permit, compliance, and dispatch checkpoints are unified under clear operational ownership.",
          evidence: "Permit/compliance signoff trail retained for each movement stage.",
          industryScore: 44,
          sspScore: 88,
        },
        {
          title: "Shipment Visibility",
          icon: "SV",
          industryBaseline: "Stakeholder updates are often inconsistent across project checkpoints.",
          sspStandard: "Checkpoint reporting cadence is structured for project, site, and procurement decisions.",
          evidence: "Checkpoint variance and recovery log maintained through final handoff.",
          industryScore: 40,
          sspScore: 84,
        },
      ],
      evidenceNote:
        "Project evidence packets and operational records can be shared in qualification and mobilization planning.",
    },
    relatedServices: {
      sectionTitle: "Mode Fit and Coverage",
      intro: "Select the movement model by load class, permit complexity, and project risk profile.",
      modeFit: [
        {
          scenario: "Permit-heavy project moves",
          recommendation: "Expedited & Specialized with route governance",
          rationale: "Combines permit-aware execution with active control over checkpoint timing.",
        },
        {
          scenario: "Heavy equipment standard corridors",
          recommendation: "Truckload and Flatbed / Step Deck / RGN (Oversize)",
          rationale: "Aligns equipment fit and securement discipline to large-format cargo profiles.",
        },
        {
          scenario: "Site schedule-critical handoffs",
          recommendation: "Value-Added coordination layer",
          rationale: "Adds operating controls around communication and exception recovery.",
        },
      ],
      links: [
        { label: "Truckload", href: "/services/truckload" },
        { label: "Expedited & Specialized", href: "/services/expedited-specialized" },
        { label: "Flatbed, Step Deck & RGN (Oversize)", href: "/services/truckload#section-flatbed" },
        { label: "Value-Added", href: "/services/value-added" },
      ],
    },
    finalCta: {
      kicker: "Start the conversation",
      title: "Let's get your materials to site.",
      body: "Whether you're moving heavy equipment, structural materials, or managing phased project freight, our team is ready to align on your requirements.",
      implementationSteps: [
        {
          step: "01",
          title: "Project movement scoping",
          body: "We assess load profile, route complexity, permit dependencies, and site timing.",
        },
        {
          step: "02",
          title: "Control and safety setup",
          body: "We define checkpoint governance, escalation pathways, and communication cadence.",
        },
        {
          step: "03",
          title: "Mobilize with command oversight",
          body: "Execution launches with active project-control reporting through delivery closeout.",
        },
      ],
      proof: [
        { value: "≤ 15 min", label: "Initial response" },
        { value: "24/7", label: "Operations coverage" },
        { value: "CA–US–MX", label: "Lane scope" },
      ],
      trustSignals: ["Safety-first execution", "Proactive updates", "Right equipment"],
      ctas: {
        primary: {
          label: "Request a Quote",
          href: "/quote",
          ctaId: "industry_construction_final_quote",
        },
        secondary: {
          label: "Speak to a Live Agent",
          ctaId: "industry_construction_final_live_agent",
          action: "live-chat",
        },
      },
    },
  },

  "steel-aluminum": {
    key: "steel-aluminum",
    slug: "steel-aluminum",
    meta: {
      title: "Steel & Aluminum Logistics | Flatbed, Heavy Freight & Cross-Border Metals | SSP Group",
      description:
        "Steel and aluminum logistics for coils, plate, extrusions, and high-density freight across Canada, the United States, and Mexico. We manage metal freight with engineered securement, route control, and accountable execution.",
      heroImage: "/_optimized/industries/steel-hero-premium-v1.png",
      ogImage: "/_optimized/industries/steel-hero-premium-v1.png",
    },
    hero: {
      kicker: "Steel & Aluminum Logistics",
      valueHeadline: "Load integrity protected.",
      title: "Heavy Freight Engineered for Safe Arrival",
      description:
        "From coils, plate, and extrusions to high-density mill freight and cross-border metal flows across Canada, the United States, and Mexico, we manages steel and aluminum logistics with engineered load planning, route discipline, and clear operational ownership from pickup through delivery.",
      cta: {
        label: "Review Your Metal Freight Network",
        href: "/contact",
        ctaId: "industry_steel_aluminum_hero_contact",
      },
      secondaryCta: {
        label: "See the Operating Model",
        href: "#how-we-support",
        ctaId: "industry_steel_aluminum_hero_capabilities",
      },
      theme: "steel",
      signals: ["Engineered load securement", "Heavy-freight route compliance", "Receiving-coordinated delivery"],
      proofStrip: [
        { value: "Load-safe", label: "Engineered securement" },
        { value: "Route-ready", label: "Heavy-freight compliance" },
        { value: "CA / US / MX", label: "Metal corridors" },
      ],
    },
    whatMatters: {
      eyebrowLabel: "Industry Demands",
      sectionTitle: "Where Metal Freight Exposure Builds First",
      intro:
        "Steel and aluminum freight starts to fail when load physics, route readiness, and handoff control are treated as separate tasks. For mills, service centers, and metal buyers, delivery confidence depends on engineered loading, compliant routing, and accountable execution across every custody point.",
      items: [
        {
          title: "Load Engineering and Securement Discipline",
          body: "Coils, plate, billets, and extrusions require equipment, axle distribution, and securement matched to the actual load profile before pickup. Heavy-freight risk is often decided before the trailer leaves the shipper.",
        },
        {
          title: "Route and Compliance Readiness Before Dispatch",
          body: "Weight, dimension, permit, and site-access requirements need to be resolved before movement begins. Constraints discovered too late create dwell, compliance exposure, and missed receiving windows.",
        },
        {
          title: "Traceable Control from Mill to Delivery",
          body: "Metal buyers need one operating thread from origin handoff through final receipt. Ownership, milestone visibility, and corrective action need to stay clear when handling, timing, or destination conditions change.",
        },
      ],
      interactiveWidget: "load-balance-axle",
      widgetSupportTitle: "Load Balance and Axle-Control Planning",
      widgetSupportBody:
        "For high-density metal freight, load distribution and center-of-gravity control directly shape axle pressure, handling stability, and route feasibility. We use this planning logic to identify imbalance risk before the load is released to move.",
      widgetSupportBullets: [
        "Balanced distribution protects axle pressure, trailer behavior, and securement performance under heavy load.",
        "As total weight rises, tolerance narrows and placement discipline becomes more important than generic dispatch assumptions.",
        "When overstress appears, load placement, equipment choice, and route posture are adjusted before execution begins.",
      ],
      widgetSupportFooter: "Engineered load posture. Route-ready execution. Controlled delivery.",
    },
    howWeSupport: {
      sectionTitle: "How SSP Governs Steel & Aluminum Freight",
      intro:
        "SSP's steel and aluminum model is built around four controls buyers feel first: load engineering, route readiness, cross-border continuity, and owner-led exception handling when dense freight conditions start to shift.",
      cards: [
        {
          eyebrow: "Load Engineering",
          title: "Equipment and securement matched to the load",
          summary: "Move plans are built around weight profile, commodity behavior, securement requirements, and destination handling constraints before dispatch.",
          details:
            "Each shipment is structured for trailer fit, load balance, route feasibility, and risk controls appropriate to metal cargo rather than left to generic heavy-freight assumptions.",
          metric: "Load-fit planning",
        },
        {
          eyebrow: "Route Compliance",
          title: "Route, permit, and site-readiness control",
          summary: "Routing, dimensional considerations, and receiving constraints are reviewed before movement so compliance issues do not surface mid-lane.",
          details:
            "Heavy-freight execution depends on route discipline, permit awareness, and site-facing readiness being defined before the shipment is in motion.",
          metric: "Route-ready execution",
        },
        {
          eyebrow: "Cross-Border Continuity",
          title: "Canada-US-Mexico metal corridor control",
          summary: "Border-facing steel and aluminum freight moves with document readiness, broker coordination, and named ownership before corridor variability becomes delivery risk.",
          details:
            "For North American metal programs, cross-border discipline protects transit consistency, receiving readiness, and commercial confidence across mills, processors, and destination sites.",
          metric: "Corridor control",
        },
        {
          eyebrow: "Operational Visibility",
          title: "Decision-ready milestone and exception reporting",
          summary: "Status, variance, and corrective action are reported in a format operations, procurement, and receiving teams can act on quickly.",
          details:
            "Communication cadence is designed for mill, warehouse, fabricator, and project-site coordination, with clear ownership when conditions tighten.",
          metric: "Owner-led visibility",
        },
      ],
      aside: {
        badge: "Metal freight operating model",
        title: "Execution built for load physics, route discipline, and controlled delivery.",
        body: "Steel and aluminum freight is judged by what happens before dispatch, during handoff, and at receiving. We run metal programs with engineered loading posture, route-ready planning, and owner-led control when heavy-freight conditions start to shift.",
        bullets: [
          "Load planning built around securement, axle balance, and destination handling constraints",
          "Route and site-readiness checked before dense freight is released to move",
          "Exception ownership that keeps mills, yards, and receiving teams aligned in motion",
        ],
        stats: [
          { value: "Coil / Plate", label: "Load profile" },
          { value: "CA / US / MX", label: "Metal corridors" },
          { value: "Route-ready", label: "Compliance posture" },
          { value: "24 / 7", label: "Ops coverage" },
        ],
      },
    },
    trustProof: {
      sectionTitle: "Operating Standards Buyers Can Verify",
      comparisonHeading: "Our operating standards vs. common heavy-freight practice",
      intro:
        "Steel and aluminum buyers do not judge partners by whether they can move heavy freight in theory. They judge them by whether load control, route discipline, and execution ownership hold when dense cargo and restrictive lanes leave less margin for error.",
      pillars: [
        {
          title: "Load Engineering",
          icon: "LE",
          industryBaseline: "Equipment and securement decisions are often treated as routine dispatch setup instead of lane-specific engineering for dense metal freight.",
          sspStandard: "Equipment fit, axle distribution, and securement posture are aligned to the load profile before the shipment is released to move.",
          evidence: "Shipment files retain load-planning assumptions, equipment selection, and release controls before dispatch.",
          industryScore: 43,
          sspScore: 85,
        },
        {
          title: "Route and Compliance Control",
          icon: "RC",
          industryBaseline: "Route, dimension, permit, and site constraints are often checked too late, creating avoidable friction once the load is already in motion.",
          sspStandard: "Route and compliance controls are embedded in pre-dispatch planning and owner-led execution governance.",
          evidence: "Route, permit, and constraint checkpoints are retained with shipment-level operating records.",
          industryScore: 46,
          sspScore: 89,
        },
        {
          title: "Exception Visibility",
          icon: "EV",
          industryBaseline: "Heavy-load visibility is often event-only, with limited context when receiving timing, route issues, or destination conditions begin to shift.",
          sspStandard: "Milestone reporting includes impact context, named ownership, and corrective-action logic buyers can use before the issue expands.",
          evidence: "Exception logs capture owner, trigger, and recovery path through closeout.",
          industryScore: 38,
          sspScore: 86,
        },
      ],
      evidenceNote:
        "Examples of load-control files, route checkpoints, and exception records can be reviewed during qualification.",
    },
    relatedServices: {
      eyebrowLabel: "Mode Selection",
      sectionTitle: "Steel & Aluminum Programs by Load and Lane Need",
      intro: "The right operating model depends on commodity form, equipment fit, route complexity, and border exposure across the lane.",
      modeFit: [
        {
          scenario: "Coils, plate, and slit-stock lanes",
          recommendation: "Flatbed or step deck with engineered securement",
          rationale: "Aligns trailer choice, load balance, and securement method to high-density metal behavior and receiving requirements.",
        },
        {
          scenario: "Oversize, high-density, or route-sensitive metal moves",
          recommendation: "RGN or specialized heavy-haul execution with route compliance planning",
          rationale: "Supports restrictive dimensions, route constraints, and controlled movement where standard deck assumptions are not enough.",
        },
        {
          scenario: "Canada-US-Mexico steel and aluminum supply lanes",
          recommendation: "Cross-border execution with document and handoff control",
          rationale: "Reduces corridor variability and protects continuity across mills, processors, and downstream receiving points.",
        },
      ],
      links: [
        { label: "Truckload", href: "/services/truckload" },
        { label: "Flatbed, Step Deck & RGN (Oversize)", href: "/services/truckload#section-flatbed" },
        { label: "Cross-Border", href: "/solutions/cross-border" },
        { label: "Expedited & Specialized", href: "/services/expedited-specialized" },
      ],
    },
    finalCta: {
      kicker: "Ready to review the network",
      title: "Review Your Steel & Aluminum Freight Program with SSP",
      body: "If load control, route readiness, or cross-border metal freight are carrying too much risk in your network, we can review the lanes with you and identify where stronger engineering, clearer visibility, and tighter operating discipline will matter most.",
      implementationSteps: [
        {
          step: "01",
          title: "Load and lane assessment",
          body: "We evaluate commodity form, weight profile, route constraints, receiving conditions, and corridor exposure by lane.",
        },
        {
          step: "02",
          title: "Operating model design",
          body: "We define equipment posture, load controls, visibility cadence, compliance checkpoints, and escalation ownership.",
        },
        {
          step: "03",
          title: "Launch and governance",
          body: "Execution starts with active oversight, shipment-level control, and structured review as the program stabilizes.",
        },
      ],
      proof: [
        { value: "≤ 15 min", label: "Response time" },
        { value: "24 / 7", label: "Operations desk" },
        { value: "CA / US / MX", label: "Corridor coverage" },
      ],
      trustSignals: [
        "Engineered load planning",
        "Named operational ownership",
        "Route-ready compliance",
        "Decision-ready updates",
      ],
      ctas: {
        primary: {
          label: "Request a Steel Freight Review",
          href: "/quote",
          ctaId: "industry_steel_aluminum_final_quote",
        },
        secondary: {
          label: "Speak with a Metal Freight Specialist",
          ctaId: "industry_steel_aluminum_final_live_agent",
          action: "live-chat",
        },
      },
    },
  },

  "chemical-plastics": {
    key: "chemical-plastics",
    slug: "chemical-plastics",
    meta: {
      title: "Chemical & Plastics Logistics | Hazmat, Compliant Freight & Cross-Border Control | SSP Group",
      description:
        "Chemical and plastics logistics across Canada, the United States, and Mexico. We manage regulated freight with carrier qualification, documentation governance, classification-specific handling, and controlled cross-border execution.",
      heroImage: "/_optimized/industries/chemical-hero-premium-v1.png",
      ogImage: "/_optimized/industries/chemical-hero-premium-v1.png",
    },
    hero: {
      kicker: "Chemical & Plastics Logistics",
      valueHeadline: "Compliance controlled.",
      title: "Regulated Freight Under Governed Control",
      description:
        "From resins and specialty compounds to cross-border regulated freight across Canada, the United States, and Mexico, we manages chemical and plastics shipments with carrier qualification, document control, and disciplined execution.",
      cta: { label: "Review Your Chemical Network", href: "/contact", ctaId: "industry_chemical_hero_contact" },
      secondaryCta: {
        label: "See the Operating Model",
        href: "#how-we-support",
        ctaId: "industry_chemical_hero_capabilities",
      },
      theme: "teal",
      signals: ["Hazmat-qualified carrier release controls", "DOT / TDG aligned document governance", "Cross-border regulated freight oversight"],
      proofStrip: [
        { value: "DOT / TDG", label: "Compliance posture" },
        { value: "CA / US / MX", label: "Regulated corridors" },
        { value: "Owner-led", label: "Exception control" },
      ],
    },
    whatMatters: {
      eyebrowLabel: "Industry Demands",
      sectionTitle: "Where Chemical Freight Risk Builds First",
      intro:
        "Chemical and plastics freight starts to fail when qualification, documentation, and handling controls drift apart. For regulated shipments, execution confidence depends on disciplined carrier selection, classification accuracy, and controlled custody from origin through final delivery.",
      items: [
        {
          title: "Carrier and Equipment Qualification",
          body: "Regulated freight depends on the right carrier, the right equipment, and the right certification posture before the load is released to move. Qualification cannot be treated as a one-time onboarding step.",
        },
        {
          title: "Classification and Documentation Accuracy",
          body: "Shipping papers, SDS records, placarding requirements, and border-facing documentation need to align to the actual product classification before dispatch. Clean paperwork protects the lane before the shipment is in motion.",
        },
        {
          title: "Controlled Handling and Custody Transfer",
          body: "Loading method, securement, temperature controls, and custody-transfer discipline have to match the product, packaging, and regulatory profile. Generic handling assumptions create unnecessary exposure quickly.",
        },
      ],
      interactiveWidget: null,
    },
    howWeSupport: {
      sectionTitle: "How SSP Governs Chemical & Plastics Freight",
      intro:
        "SSP's chemical and plastics model is built around four controls buyers feel first: carrier qualification, document governance, classification-specific execution, and decision-ready visibility when regulated freight conditions begin to shift.",
      cards: [
        {
          eyebrow: "Carrier Qualification",
          title: "Qualified hazmat carrier coverage",
          summary: "Carriers are qualified for hazmat certification, safety posture, and equipment fit before they are used on chemical or plastics freight.",
          details:
            "Ongoing review keeps certification, insurance, and operating status aligned to the shipment before dispatch decisions are made.",
          metric: "Qualified coverage",
        },
        {
          eyebrow: "Documentation Governance",
          title: "Compliance paperwork controlled before dispatch",
          summary: "Shipping documents, SDS records, placarding requirements, and classification checks are verified before freight is released to the carrier.",
          details:
            "Documentation governance is treated as an operating control, not back-office cleanup after the load is already moving.",
          metric: "Document control",
        },
        {
          eyebrow: "Execution Control",
          title: "Classification-specific handling and transit posture",
          summary: "Loading protocols, securement standards, and transit controls are adapted to the specific classification, packaging, and temperature requirements of the freight.",
          details:
            "Sensitive chemical and plastics programs move with handling instructions that reflect the actual product profile, not a generic regulated-freight checklist.",
          metric: "Handling precision",
        },
        {
          eyebrow: "Operational Visibility",
          title: "Decision-ready compliance visibility",
          summary: "Milestone updates and exception alerts are structured for operations, safety, and compliance leaders who need to intervene before issues widen.",
          details:
            "Status reporting includes document checkpoints, owner-led escalation, and corrective-action context so your team can act early on any gaps.",
          metric: "Exception clarity",
        },
      ],
      aside: {
        badge: "Regulated freight operating model",
        title: "Execution built for qualification control, document discipline, and governed escalation.",
        body: "Chemical and plastics buyers feel risk before the truck even moves. We run regulated freight with carrier release controls, shipment-level documentation checks, and escalation ownership that stays clear when conditions tighten across the lane.",
        bullets: [
          "Carrier qualification and release controls reviewed against the actual shipment before dispatch",
          "Documentation checkpoints designed to catch classification, placarding, and border-facing gaps early",
          "Operational visibility structured for safety, compliance, and logistics stakeholders together",
        ],
        stats: [
          { value: "Hazmat", label: "Qualified release" },
          { value: "DOT / TDG", label: "Document posture" },
          { value: "CA / US / MX", label: "Regulated corridors" },
          { value: "24 / 7", label: "Ops coverage" },
        ],
      },
    },
    trustProof: {
      sectionTitle: "Operating Standards Buyers Can Verify",
      comparisonHeading: "Our operating standards vs. common regulated-freight practice",
      intro:
        "Chemical and plastics buyers do not judge partners by whether they claim compliance. They judge them by whether qualification, documentation, and handling controls still hold when regulated freight is moving across jurisdictions and decision windows tighten.",
      pillars: [
        {
          title: "Carrier Qualification",
          icon: "CQ",
          industryBaseline: "Carrier hazmat qualification is often checked at onboarding but not treated as a live dispatch control before every regulated move.",
          sspStandard: "Hazmat certification, safety posture, and equipment fit are verified against the shipment before each chemical dispatch.",
          evidence: "Pre-dispatch carrier qualification and release controls are retained with shipment records.",
          industryScore: 40,
          sspScore: 85,
        },
        {
          title: "Documentation Governance",
          icon: "DC",
          industryBaseline: "Shipping paper accuracy often depends on manual process adherence with limited verification before freight moves.",
          sspStandard: "Document completeness, classification alignment, and placarding requirements are verified before release to carrier.",
          evidence: "Documentation checkpoints are recorded in dispatch workflow before movement begins.",
          industryScore: 45,
          sspScore: 88,
        },
        {
          title: "Handling & Transit Controls",
          icon: "HC",
          industryBaseline: "Handling instructions are frequently broad, even when classifications, packaging requirements, or temperature exposure materially differ.",
          sspStandard: "Loading protocols and transit controls are matched to classification, packaging, and temperature requirements before dispatch.",
          evidence: "Classification-specific handling instructions and shipment controls are retained with the operating record.",
          industryScore: 42,
          sspScore: 84,
        },
      ],
      evidenceNote:
        "Examples of qualification files, documentation controls, and handling records can be reviewed during qualification.",
    },
    relatedServices: {
      eyebrowLabel: "Mode Selection",
      sectionTitle: "Chemical & Plastics Programs by Shipment Need",
      intro: "The right operating model depends on product classification, shipment profile, handling sensitivity, and cross-border regulatory exposure.",
      modeFit: [
        {
          scenario: "Packaged or bulk regulated chemical shipments",
          recommendation: "Truckload with hazmat-qualified carrier coverage",
          rationale: "Supports dedicated equipment, controlled custody, and stronger compliance governance for regulated freight.",
        },
        {
          scenario: "Mixed plastics, resins, and non-bulk regulated freight",
          recommendation: "LTL with classification-specific handling controls",
          rationale: "Balances cost and service while maintaining segregation, documentation accuracy, and shipment visibility.",
        },
        {
          scenario: "Canada-US-Mexico regulated chemical corridors",
          recommendation: "Cross-border execution with regulatory coordination",
          rationale: "Protects continuity through customs alignment, TDG/DOT coordination, and controlled cross-border handoff.",
        },
      ],
      links: [
        { label: "Truckload", href: "/services/truckload" },
        { label: "Hazmat", href: "/services/hazmat" },
        { label: "LTL", href: "/services/ltl" },
        { label: "Cross-Border", href: "/solutions/cross-border" },
      ],
    },
    finalCta: {
      kicker: "Ready to review the network",
      title: "Review Your Chemical & Plastics Network with SSP",
      body: "If carrier qualification, document control, or cross-border chemical freight are carrying too much risk in your network, we can review the lanes with you and identify where tighter governance, clearer visibility, and stronger shipment control will matter most.",
      implementationSteps: [
        {
          step: "01",
          title: "Classification and lane assessment",
          body: "We assess product profiles, documentation requirements, handling needs, and corridor exposure by lane.",
        },
        {
          step: "02",
          title: "Compliance model design",
          body: "We define carrier standards, handling controls, documentation checkpoints, and escalation ownership around the freight.",
        },
        {
          step: "03",
          title: "Launch and governance",
          body: "Execution starts with pre-dispatch verification, shipment-level oversight, and structured review through live operation.",
        },
      ],
      proof: [
        { value: "≤ 15 min", label: "Response time" },
        { value: "24 / 7", label: "Operations desk" },
        { value: "CA / US / MX", label: "Corridor coverage" },
      ],
      trustSignals: [
        "Qualified hazmat coverage",
        "Audit-ready documentation",
        "Classification-specific handling",
        "Owner-led escalation",
      ],
      ctas: {
        primary: {
          label: "Request a Chemical Freight Review",
          href: "/quote",
          ctaId: "industry_chemical_final_quote",
        },
        secondary: {
          label: "Speak with a Chemical Logistics Specialist",
          ctaId: "industry_chemical_final_live_agent",
          action: "live-chat",
        },
      },
    },
  },
};

const SLUG_TO_KEY: Record<IndustrySlug, IndustryKey> = {
  automotive: "automotive",
  "manufacturing-materials": "manufacturing",
  "retail-consumer-goods": "retail",
  "food-beverage": "food",
  "construction-building-materials": "construction",
  "steel-aluminum": "steel-aluminum",
  "chemical-plastics": "chemical-plastics",
};

export function getIndustryBySlug(slug: string): IndustryPageModel | null {
  const key = SLUG_TO_KEY[slug as IndustrySlug];
  if (!key) return null;
  return INDUSTRY_PAGE_DATA[key] ?? null;
}

export function getIndustryByKey(key: IndustryKey): IndustryPageModel | null {
  return INDUSTRY_PAGE_DATA[key] ?? null;
}

export function getIndustrySlugs(): IndustrySlug[] {
  return INDUSTRY_KEYS.map((key) => INDUSTRY_PAGE_DATA[key].slug);
}
