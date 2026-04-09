import type { Metadata } from "next";
import { SITE_NAME } from "@/lib/seo/site";

export type SolutionHeroImageBrief = {
  title: string;
  orientation: "landscape";
  description: string;
  mustShow: readonly string[];
  avoid: readonly string[];
};

export type SolutionTheme = {
  accent: string;
  heroOverlay: string;
  heroGlow: string;
};

export type SolutionAnchorItem = {
  key: string;
  label: string;
  summary: string;
  accent: string;
};

export type SolutionFamilyCard = {
  key: string;
  label: string;
  title: string;
  description: string;
  bestFor: string;
  href: string;
  accent: string;
};

export type SolutionPillar = {
  title: string;
  body: string;
  imageSrc?: string;
  imageAlt?: string;
};

export type SolutionVideoAsset = {
  src: string;
  posterSrc?: string;
  title: string;
};

export type SolutionProcessStep = {
  step: string;
  title: string;
  body: string;
};

export type SolutionRelatedLink = {
  label: string;
  href: string;
  reason: string;
};

export type SolutionFaqItem = {
  question: string;
  answer: string;
};

export type SolutionFitRule = {
  condition: string;
  recommendation: string;
  serviceSlug?: string;
  description: string;
};

export type SolutionFreightFitGuide = {
  title: string;
  intro: string;
  diagram: string;
  diagramAlt: string;
  specs: {
    length: string;
    width: string;
    height: string;
    weight: string;
    pallets?: string;
  };
  rules: readonly SolutionFitRule[];
  disclaimer?: string;
};

export type SolutionFamilyPageData = {
  pageType: "family";
  slug: string;
  theme: SolutionTheme;
  meta: {
    title: string;
    description: string;
    ogImage?: string;
  };
  hero: {
    eyebrow: string;
    title: string;
    description: string;
    descriptionMaxWidth?: string;
    supportingPoints: readonly string[];
    primaryCta: { label: string; href: string };
    secondaryCta: { label: string; href: string };
    media?: {
      src?: string;
      alt?: string;
      objectPosition?: string;
    };
    mediaBrief: readonly SolutionHeroImageBrief[];
  };
  proof: readonly { value: string; label: string }[];
  subnavLabel: string;
  pageSections: readonly SolutionAnchorItem[];
  modeOverview: {
    eyebrow: string;
    title: string;
    description: string;
    video: SolutionVideoAsset;
  };
  whySsp: {
    eyebrow: string;
    points: readonly SolutionPillar[];
  };
  howItWorks: {
    eyebrow: string;
    title: string;
    description: string;
    steps: readonly SolutionProcessStep[];
  };
  bestFitProfiles: {
    eyebrow: string;
    title: string;
    description: string;
    items: readonly SolutionFamilyCard[];
  };
  serviceUse: {
    eyebrow: string;
    title: string;
    description: string;
    checklistTitle: string;
    checklist: readonly string[];
    steps: readonly SolutionPillar[];
  };
  relatedSolutions: {
    eyebrow: string;
    title: string;
    description: string;
    items: readonly SolutionRelatedLink[];
  };
  faq: {
    eyebrow: string;
    title: string;
    description: string;
    items: readonly SolutionFaqItem[];
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

export type SolutionDetailPageData = {
  pageType: "detail";
  slug: string;
  theme: SolutionTheme;
  meta: {
    title: string;
    description: string;
    ogImage?: string;
  };
  hero: {
    eyebrow: string;
    title: string;
    description: string;
    descriptionMaxWidth?: string;
    supportingPoints: readonly string[];
    primaryCta: { label: string; href: string };
    secondaryCta: { label: string; href: string };
    media?: {
      src?: string;
      alt?: string;
      objectPosition?: string;
    };
    mediaBrief: readonly SolutionHeroImageBrief[];
  };
  proof: readonly { value: string; label: string }[];
  subnavLabel: string;
  pageSections: readonly SolutionAnchorItem[];
  parent: {
    label: string;
    href: string;
  };
  identity: {
    eyebrow: string;
    title: string;
    description: string;
    signals: readonly string[];
  };
  whenToUse: {
    eyebrow: string;
    title: string;
    description: string;
    items: readonly string[];
  };
  freightFit: {
    eyebrow: string;
    title: string;
    description: string;
    guide: SolutionFreightFitGuide;
  };
  execution: {
    eyebrow: string;
    title: string;
    description: string;
    pillars: readonly SolutionPillar[];
  };
  engagement: {
    eyebrow: string;
    title: string;
    description: string;
    steps: readonly string[];
  };
  relatedSolutions: {
    eyebrow: string;
    title: string;
    description: string;
    items: readonly SolutionRelatedLink[];
  };
  faq: {
    eyebrow: string;
    title: string;
    description?: string;
    items: readonly SolutionFaqItem[];
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

export type SolutionPageData = SolutionFamilyPageData | SolutionDetailPageData;

export const TRUCKLOAD_SOLUTION_PAGE: SolutionFamilyPageData = {
  pageType: "family",
  slug: "truckload",
  theme: {
    accent: "#10a7d8",
    heroOverlay:
      "linear-gradient(108deg, rgba(7,24,38,0.84) 0%, rgba(11,62,94,0.72) 36%, rgba(13,79,120,0.48) 62%, rgba(13,79,120,0.28) 100%)",
    heroGlow: "radial-gradient(46%_54%_at_82%_18%,rgba(16,167,216,0.18),transparent_72%)",
  },
  meta: {
    title: "Full Truckload Freight | SSP Group",
    description:
      "Full truckload freight across Canada, the United States, and Mexico, aligned to the right equipment path for dry van, flatbed, step deck, Conestoga, and heavy haul.",
    ogImage: "/_optimized/brand/SSPlogo.png",
  },
  hero: {
    eyebrow: "Full Truckload",
    title: "Full truckload built around freight fit and execution control.",
    description:
      "SSP structures truckload around lane requirements, cargo profile, and the equipment path the shipment actually needs. Across Canada, the United States, and Mexico, the priority is controlled execution from pickup planning through final delivery.",
    supportingPoints: [],
    primaryCta: {
      label: "Request a Truckload Quote",
      href: "/quote?service=truckload",
    },
    secondaryCta: {
      label: "Talk to the Truckload Team",
      href: "/contact?topic=truckload",
    },
    media: {
      src: "/_optimized/solution/truckload/truckload-Img.png",
      alt: "Truckload tractor trailer moving on an open North American highway",
    },
    mediaBrief: [
      {
        title: "Truckload hero image",
        orientation: "landscape",
        description:
          "Premium flagship truckload image for the parent truckload page. It should feel executive, modern, and operationally real rather than like a commodity stock transportation shot.",
        mustShow: [
          "SSP equipment or clearly relevant freight equipment in a real operating environment",
          "Strong single subject with enough calm space for premium hero copy",
          "A setting that signals North American freight scale such as a highway corridor, terminal, distribution center, or shipper yard",
        ],
        avoid: [
          "Busy scenes with multiple trucks competing for attention",
          "Outdated imagery, obvious old branding, or low-resolution photos",
          "Artificial-looking edits, heavy filters, or AI-style visual artifacts",
        ],
      },
    ],
  },
  proof: [
    { value: "Full-trailer", label: "Shipment model" },
    { value: "CA-US-MX", label: "Operating reach" },
    { value: "Asset-based", label: "Operating model" },
  ],
  subnavLabel: "Truckload page sections",
  pageSections: [
    {
      key: "mode-overview",
      label: "Mode Overview",
      summary: "Short truckload framing with an embedded SSP overview video.",
      accent: "#0d4f78",
    },
    {
      key: "why-ssp",
      label: "Why SSP",
      summary: "The execution principles that make SSP different in truckload.",
      accent: "#10a7d8",
    },
    {
      key: "best-fit",
      label: "Best-Fit Profiles",
      summary: "The freight profiles inside the truckload family and where each fits.",
      accent: "#3064a8",
    },
    {
      key: "how-it-works",
      label: "How It Works",
      summary: "The operating sequence SSP uses to structure a truckload move.",
      accent: "#d71920",
    },
    {
      key: "how-to-use",
      label: "When To Choose",
      summary: "The shipment conditions that make truckload the right operating answer.",
      accent: "#b37a20",
    },
    {
      key: "related",
      label: "Related Services",
      summary: "Where SSP routes the shipper when another service fits better than truckload.",
      accent: "#0d4f78",
    },
    {
      key: "faq",
      label: "FAQ",
      summary: "The main qualification questions shippers ask before booking truckload.",
      accent: "#10a7d8",
    },
  ],
  modeOverview: {
    eyebrow: "Mode Overview",
    title: "Truckload creates a direct operating environment for the shipment.",
    description:
      "Truckload is built for freight that should move in dedicated trailer space with clearer handling control, fewer shared-capacity compromises, and tighter appointment discipline. The objective is a cleaner operating path from pickup through delivery.",
    video: {
      src: "/_optimized/solution/truckload/mode-overview.mp4",
      posterSrc: "/_optimized/solution/truckload/mode-overview-poster.jpg",
      title: "Truckload service in motion",
    },
  },
  whySsp: {
    eyebrow: "Why SSP For Truckload",
    points: [
      {
        title: "Freight fit is resolved before capacity is assigned",
        body: "SSP qualifies loading method, cargo dimensions, appointment conditions, and route requirements before the load is dispatched, so truckload starts with the right operating structure.",
        imageSrc: "/_optimized/solution/truckload/icons/why-ssp-truck.png",
        imageAlt: "Truckload equipment illustration",
      },
      {
        title: "Execution stays tied to operating decisions",
        body: "Truckload performance improves when planning, capacity, and milestone ownership stay connected. SSP keeps those decisions aligned so the shipment is not handed off without accountability.",
        imageSrc: "/_optimized/solution/truckload/icons/why-ssp-visibility.png",
        imageAlt: "Shipment visibility route illustration",
      },
      {
        title: "Communication follows the move, not generic updates",
        body: "Status updates are tied to real milestones, exceptions, and next actions, so the shipper has usable operating clarity instead of empty visibility.",
        imageSrc: "/_optimized/solution/truckload/icons/why-ssp-milestone.png",
        imageAlt: "Milestone execution illustration",
      },
    ],
  },
  howItWorks: {
    eyebrow: "How It Works",
    title: "Execution quality is decided before the shipment moves.",
    description:
      "SSP qualifies the shipment first, then aligns trailer selection, dispatch, and delivery control around that operating profile. Early decisions matter because the wrong structure is expensive to correct once the load is in motion.",
    steps: [
      {
        step: "01",
        title: "Qualify the lane and the freight",
        body: "We start with the lane, appointment requirements, cargo profile, loading method, and delivery expectations so the move is framed correctly before capacity is assigned.",
      },
      {
        step: "02",
        title: "Match the right equipment path",
        body: "Dry van, flatbed, step deck, Conestoga, and heavy-haul options are evaluated against the freight so the operating plan reflects reality rather than assumption.",
      },
      {
        step: "03",
        title: "Dispatch against clear milestones",
        body: "Once the move is aligned, SSP executes against pickup, in-transit, and delivery milestones with direct ownership over the handoffs that matter to the shipper.",
      },
      {
        step: "04",
        title: "Manage delivery and exceptions",
        body: "Any change in timing, access, or routing is handled inside the operating workflow with communication that stays tied to the shipment, not left to guesswork.",
      },
    ],
  },
  bestFitProfiles: {
    eyebrow: "Best-Fit Freight Profiles",
    title: "Freight fit determines the correct truckload path.",
    description:
      "Truckload is the parent mode. These featured equipment profiles help define how the shipment should move based on loading method, cargo geometry, protection requirements, and operating risk.",
    items: [
      {
        key: "dry-van",
        label: "Dry Van",
        title: "Enclosed truckload for freight that needs protection and schedule control.",
        description:
          "For palletized, boxed, or floor-loaded freight that needs weather protection and a dedicated trailer without temperature-control requirements.",
        bestFor: "Retail replenishment, manufacturing freight, packaged goods, and enclosed industrial cargo.",
        href: "/solutions/dry-van",
        accent: "#0d4f78",
      },
      {
        key: "flatbed",
        label: "Flatbed",
        title: "Open-deck truckload for freight that needs loading access and securement control.",
        description:
          "For freight that loads from the side, top, or by crane, or cargo that does not fit enclosed trailer constraints.",
        bestFor: "Steel, lumber, machinery, building materials, and industrial components.",
        href: "/solutions/flatbed",
        accent: "#10a7d8",
      },
      {
        key: "step-deck",
        label: "Step Deck",
        title: "Lower-deck truckload for taller freight profiles.",
        description:
          "For open-deck freight that exceeds standard flatbed height tolerance but does not require a removable-gooseneck or heavy-haul structure.",
        bestFor: "Tall machinery, fabricated equipment, industrial skids, and irregular freight profiles.",
        href: "/solutions/step-deck",
        accent: "#3064a8",
      },
      {
        key: "rgn-heavy-haul",
        label: "RGN / Heavy Haul",
        title: "Specialized truckload for over-dimensional and over-weight freight.",
        description:
          "For cargo that requires permit strategy, route review, and engineered planning beyond standard trailer assumptions.",
        bestFor: "Construction equipment, transformers, mining units, oversized machinery, and project freight.",
        href: "/solutions/rgn-heavy-haul",
        accent: "#d71920",
      },
      {
        key: "conestoga-roll-tite",
        label: "Conestoga / Roll-Tite",
        title: "Protected open-deck truckload when exposure is not acceptable.",
        description:
          "For freight that needs open-deck loading flexibility with added weather protection and cleaner cargo containment.",
        bestFor: "High-value industrial freight, crated machinery, aluminum products, and engineered materials.",
        href: "/solutions/conestoga-roll-tite",
        accent: "#b37a20",
      },
    ],
  },
  serviceUse: {
    eyebrow: "When To Choose Truckload",
    title: "Choose truckload when the shipment should not be blended into shared capacity.",
    description:
      "Truckload is usually the right fit when the freight needs dedicated trailer space, a specific trailer type, or tighter handling and appointment control than pooled capacity can reasonably provide.",
    checklistTitle: "Truckload is usually the better fit when",
    checklist: [
      "The shipment needs dedicated trailer space instead of shared capacity",
      "Loading method or cargo profile points to a specific equipment path",
      "Appointments, site access, or delivery timing require tighter operating control",
      "LTL or shared-capacity service would introduce avoidable handling or routing friction",
    ],
    steps: [
      {
        title: "Dedicated Capacity",
        body: "The shipment needs full-trailer space, cleaner handling control, and a direct operating thread from pickup through delivery.",
      },
      {
        title: "Equipment-Fit Routing",
        body: "The freight points toward the right trailer structure for the cargo, whether that means enclosed van, open-deck, protected deck, heavy-haul, or another specialized truckload configuration.",
      },
      {
        title: "Execution Control",
        body: "Appointments, securement, site access, or delivery coordination create operating pressure that lighter service models are not built to absorb.",
      },
      {
        title: "Alternative Routing",
        body: "If the freight is too small for dedicated economics, requires temperature control, or belongs in a cross-border structure, SSP routes the shipment to the better-fit service.",
      },
    ],
  },
  relatedSolutions: {
    eyebrow: "Related Services",
    title: "If truckload is not the right fit, these are the next services to consider.",
    description:
      "These services usually deserve the next review when the shipment does not belong in a dedicated truckload structure.",
    items: [
      {
        label: "LTL",
        href: "/solutions/ltl",
        reason: "For lighter pallet counts and smaller shipment volumes that do not justify dedicated truckload economics.",
      },
      {
        label: "Expedited",
        href: "/solutions/expedited",
        reason: "For production-critical or deadline-compressed freight that needs urgency-first execution.",
      },
      {
        label: "Temperature-Controlled",
        href: "/solutions/temperature-controlled",
        reason: "For freight where cargo temperature, not just trailer protection, defines the service fit.",
      },
      {
        label: "Cross-Border",
        href: "/solutions/cross-border",
        reason: "For corridor-led freight involving customs, border handoffs, and tri-national execution logic.",
      },
      {
        label: "Managed Capacity",
        href: "/solutions/managed-capacity",
        reason: "For recurring truckload volumes where procurement discipline and lane governance matter more than one-off load coverage.",
      },
    ],
  },
  faq: {
    eyebrow: "Truckload FAQs",
    title: "The questions that matter before booking truckload.",
    description:
      "These are the qualification questions that usually determine whether truckload is the right family and, if it is, which equipment path should lead the move.",
    items: [
      {
        question: "What counts as a truckload shipment?",
        answer:
          "Most truckload shipments move in 48- or 53-foot equipment and make sense when the freight takes a substantial share of the trailer, often around 10 to 12 pallets or more, or when the load needs dedicated handling regardless of volume.",
      },
      {
        question: "How do I know whether I need dry van, flatbed, step deck, Conestoga, or heavy haul?",
        answer:
          "The answer depends on loading method, cargo dimensions, protection requirements, clearance risk, legal route constraints, and site conditions. SSP qualifies those variables first, then routes the shipment into the correct equipment path.",
      },
      {
        question: "When should I not book truckload?",
        answer:
          "Do not default to truckload when the shipment is too small for dedicated economics, when temperature control defines the move, or when customs, border handoffs, or managed-capacity governance should lead the operating model.",
      },
    ],
  },
  finalCta: {
    kicker: "Start the conversation",
    title: "Confirm the right truckload path before the load is live.",
    body: "Share the lane, commodity, loading method, and delivery requirements. SSP will determine whether truckload is the right family and, if it is, which equipment path should structure the move.",
    trustSignals: [
      "Featured equipment profiles across core truckload configurations",
      "Truckload execution across Canada, the United States, and Mexico",
      "Fit-first routing into adjacent SSP services when truckload is not the right answer",
    ],
    proof: [
      { label: "Structure", value: "Equipment-led" },
      { label: "Reach", value: "CA-US-MX" },
      { label: "Model", value: "Asset-based" },
    ],
    ctas: {
      primary: {
        label: "Request a Truckload Quote",
        href: "/quote?service=truckload",
        ctaId: "solutions_truckload_final_request_quote",
      },
      secondary: {
        label: "Talk to Truckload Team",
        href: "/contact?topic=truckload",
        ctaId: "solutions_truckload_final_talk_team",
      },
    },
  },
};

export const DRY_VAN_SOLUTION_PAGE: SolutionDetailPageData = {
  pageType: "detail",
  slug: "dry-van",
  theme: {
    accent: "#0d4f78",
    heroOverlay:
      "linear-gradient(96deg, rgba(7,24,38,0.9) 0%, rgba(11,62,94,0.8) 34%, rgba(13,79,120,0.5) 68%, rgba(16,167,216,0.14) 100%)",
    heroGlow: "radial-gradient(46%_54%_at_84%_16%,rgba(16,167,216,0.12),transparent_74%)",
  },
  meta: {
    title: "Dry Van Truckload | Enclosed Freight Capacity | SSP Group",
    description:
      "Dry van truckload solutions for enclosed freight moving across Canada, the United States, and Mexico with schedule discipline, appointment control, and clean execution.",
    ogImage: "/_optimized/brand/SSPlogo.png",
  },
  hero: {
    eyebrow: "Dry Van",
    title: "Dry van capacity for freight that needs protection and schedule discipline.",
    description:
      "SSP moves standard truckload freight in enclosed dry van equipment across Canada, the United States, and Mexico. This is the right fit for palletized, boxed, and floor-loaded freight that does not require temperature control but does require reliable appointments, cargo protection, and consistent execution from pickup through delivery.",
    descriptionMaxWidth: "46rem",
    supportingPoints: [],
    primaryCta: {
      label: "Request a Dry Van Quote",
      href: "/quote?service=truckload&mode=dry-van",
    },
    secondaryCta: {
      label: "Talk to the Dry Van Team",
      href: "/contact?topic=truckload&mode=dry-van",
    },
    media: {
      src: "/_optimized/solution/dryvan/dryvan-Img.png",
      alt: "Dry van trailer in motion across a North American freight corridor",
      objectPosition: "82% 38%",
    },
    mediaBrief: [
      {
        title: "Dry van hero image",
        orientation: "landscape",
        description:
          "Premium dry van image for the child page. It should feel precise, modern, and dependable, with a clear sense of enclosed freight execution.",
        mustShow: [
          "Dry van trailer clearly visible as the subject",
          "Professional setting such as a shipper dock, distribution center, or controlled highway corridor",
          "Calm composition that still leaves clean breathing room for headline copy",
        ],
        avoid: [
          "Generic traffic-heavy highway shots where the equipment type is unclear",
          "Busy warehouse clutter or staging chaos",
          "Low-quality, old, or obviously legacy-branded imagery",
        ],
      },
    ],
  },
  proof: [
    { value: "53 ft", label: "Standard trailer length" },
    { value: "26", label: "Typical pallet capacity" },
    { value: "CA-US-MX", label: "Lane coverage" },
  ],
  subnavLabel: "Dry van page sections",
  pageSections: [
    {
      key: "overview",
      label: "Overview",
      summary: "What dry van is and why it fits standard truckload freight.",
      accent: "#0d4f78",
    },
    {
      key: "use",
      label: "When To Use",
      summary: "Where dry van is the right operating answer.",
      accent: "#10a7d8",
    },
    {
      key: "freight-fit",
      label: "Freight Fit",
      summary: "Dimensions, technical specs, and what to choose instead.",
      accent: "#d71920",
    },
    {
      key: "execution",
      label: "Execution",
      summary: "How SSP structures dry van performance and engagement.",
      accent: "#3064a8",
    },
    {
      key: "related",
      label: "Related Solutions",
      summary: "Where to go when dry van is not the best fit.",
      accent: "#b37a20",
    },
  ],
  parent: {
    label: "Truckload",
    href: "/solutions/truckload",
  },
  identity: {
    eyebrow: "Dry Van Overview",
    title: "Dry van is the standard enclosed truckload mode, but on SSP it is treated as a deliberate operating path rather than a default trailer booking.",
    description:
      "The strongest market pages explain dry van through reliability, protection, and execution control. SSP should go further by helping the shipper understand fit, operational expectations, and where the dry van decision sits inside the broader truckload family.",
    signals: [
      "Enclosed protection from weather and road exposure",
      "High-fit for palletized, boxed, and floor-loaded freight",
      "Appointment discipline for retail, manufacturing, and distribution lanes",
      "Best used when temperature control and open-deck handling are not required",
    ],
  },
  whenToUse: {
    eyebrow: "When To Use Dry Van",
    title: "Choose dry van when the freight needs enclosed protection and predictable truckload execution.",
    description:
      "Dry van is the right answer when the move is standard enough for enclosed truckload, but important enough that direct capacity, schedule integrity, and clean documentation handoff matter.",
    items: [
      "Palletized, boxed, or floor-loaded freight without temperature control requirements",
      "Retail replenishment and distribution moves with strict receiving windows",
      "Manufacturing and automotive shipments where schedule integrity is non-negotiable",
      "Regional and long-haul lanes where direct truckload improves consistency",
      "Cross-border freight that still fits standard enclosed truckload handling",
    ],
  },
  freightFit: {
    eyebrow: "Freight Fit Guide",
    title: "The right dry van page should teach the shipper what fits here and when to move laterally to another solution.",
    description:
      "This is where SSP can beat generic competitor pages. We do not just say dry van exists. We help the shipper understand the equipment, the envelope, and the smarter next move when the freight does not belong here.",
    guide: {
      title: "Dry Van Freight Fit Guide",
      intro:
        "Dry van trailers are the standard enclosed truckload solution in North America. Use this guide to understand whether a standard dry van fits your load and which SSP solution is more appropriate when it does not.",
      diagram: "/_optimized/equipment-diagrams/dry-van.svg",
      diagramAlt: "Dry van trailer equipment diagram with dimensions and payload guidance",
      specs: {
        length: "53 ft trailer",
        width: "8.5 ft (102 inches)",
        height: "~9 ft interior clearance",
        weight: "~43,000-45,000 lbs typical legal payload",
        pallets: "Typically up to 26 standard pallets",
      },
      rules: [
        {
          condition: "Small palletized shipments",
          description:
            "If freight is under roughly 12 pallets or 15,000 lbs, booking the full trailer may not be the most efficient operating choice.",
          recommendation: "LTL",
          serviceSlug: "/solutions/ltl",
        },
        {
          condition: "Freight taller than enclosed limits or requiring top or side loading",
          description:
            "If cargo exceeds dry van height constraints or handling requires open-deck access, enclosed truckload is no longer the best fit.",
          recommendation: "Flatbed",
          serviceSlug: "/solutions/flatbed",
        },
        {
          condition: "Freight requiring temperature control",
          description:
            "If product quality depends on controlled cargo temperature, dry van protection alone is not enough.",
          recommendation: "Temperature-Controlled",
          serviceSlug: "/solutions/temperature-controlled",
        },
        {
          condition: "Freight requiring hazardous materials handling",
          description:
            "If the shipment requires placarding, regulatory documentation, or specialized carrier qualification, another SSP solution should lead the move.",
          recommendation: "Hazmat",
          serviceSlug: "/solutions/hazmat",
        },
      ],
      disclaimer:
        "Planning values only. Final legal fit depends on route, axle configuration, trailer type, and loading method.",
    },
  },
  execution: {
    eyebrow: "Execution Model",
    title: "Dry van performance depends less on the trailer itself and more on how the move is structured.",
    description:
      "Competitors typically talk about capacity and network scale. SSP should also articulate the execution system behind the move, because that is what protects service quality after booking.",
    pillars: [
      {
        title: "Appointment-first planning",
        body: "Dry van execution is sequenced around dock windows, receiver requirements, and milestone cadence so schedule integrity is protected before the truck is moving.",
      },
      {
        title: "Documentation discipline",
        body: "Reference numbers, BOL workflows, POD closeout, and billing handoff are treated as part of the operating model, not as cleanup after delivery.",
      },
      {
        title: "Exception ownership",
        body: "Escalations are surfaced against actual decision points so missed appointments, detention risk, or handoff failures are managed before they compound.",
      },
    ],
  },
  engagement: {
    eyebrow: "How To Engage",
    title: "What SSP needs to structure a dry van move correctly.",
    description:
      "This keeps the page useful for the shipper. It tells them what to prepare so a dry van quote and plan can be built cleanly the first time.",
    steps: [
      "Share pickup and delivery addresses, dock hours, and the appointment process.",
      "Provide commodity description, pallet count, dimensions or linear feet, and total shipment weight.",
      "Clarify service window, delivery expectations, and any receiving constraints.",
      "Include reference numbers, document requirements, and proof-of-delivery expectations.",
      "Flag any exception sensitivities such as detention risk, reconsignment, or schedule-critical receivers.",
    ],
  },
  relatedSolutions: {
    eyebrow: "Related Solutions",
    title: "If dry van is not the right answer, SSP should route you elsewhere quickly.",
    description:
      "Dry van sits inside the broader truckload family and connects directly to adjacent solutions when the freight profile changes.",
    items: [
      {
        label: "Truckload",
        href: "/solutions/truckload",
        reason: "Go back to the truckload parent page to compare dry van against flatbed, step deck, Conestoga, and heavy haul.",
      },
      {
        label: "Flatbed",
        href: "/solutions/flatbed",
        reason: "For freight that no longer fits enclosed dimensions or needs open-deck loading access.",
      },
      {
        label: "LTL",
        href: "/solutions/ltl",
        reason: "For lighter pallet counts and partial loads that do not need dedicated trailer economics.",
      },
      {
        label: "Temperature-Controlled",
        href: "/solutions/temperature-controlled",
        reason: "For freight where product temperature, not just enclosure, defines the fit.",
      },
      {
        label: "Hazmat",
        href: "/solutions/hazmat",
        reason: "For freight requiring regulatory handling and compliance-led execution.",
      },
    ],
  },
  faq: {
    eyebrow: "Dry Van FAQs",
    title: "Dry van pages should answer the practical questions shippers ask before booking.",
    items: [
      {
        question: "What type of freight is best suited to dry van?",
        answer:
          "Dry van is best for standard palletized, boxed, or floor-loaded freight that needs enclosed protection but does not require temperature control or open-deck handling access.",
      },
      {
        question: "When should I choose dry van over LTL?",
        answer:
          "Dry van becomes the better answer when shipment volume, control requirements, or lane sensitivity make dedicated truckload more appropriate than shared-capacity service.",
      },
      {
        question: "When should I not use dry van?",
        answer:
          "If freight exceeds enclosed height limits, needs top or side loading, requires temperature control, or moves under hazmat constraints, SSP should route you to another solution path.",
      },
    ],
  },
  finalCta: {
    kicker: "Move forward",
    title: "Need SSP to confirm whether dry van is the right fit for the shipment?",
    body: "Send the lane, commodity, pallet count, dimensions, and timing window. SSP will confirm fit, highlight any equipment issues early, and guide the move into the correct solution path.",
    trustSignals: [
      "Enclosed truckload expertise for standard freight",
      "Freight-fit guidance tied to adjacent SSP solutions",
      "Execution planning built around appointment and handoff discipline",
    ],
    proof: [
      { label: "Equipment", value: "53 ft" },
      { label: "Capacity", value: "26 pallets" },
      { label: "Coverage", value: "CA-US-MX" },
    ],
    ctas: {
      primary: {
        label: "Request a Dry Van Quote",
        href: "/quote?service=truckload&mode=dry-van",
        ctaId: "solutions_dry_van_final_request_quote",
      },
      secondary: {
        label: "Talk to Dry Van Team",
        href: "/contact?topic=truckload&mode=dry-van",
        ctaId: "solutions_dry_van_final_talk_team",
      },
    },
  },
};

const SOLUTION_PAGES = {
  [TRUCKLOAD_SOLUTION_PAGE.slug]: TRUCKLOAD_SOLUTION_PAGE,
  [DRY_VAN_SOLUTION_PAGE.slug]: DRY_VAN_SOLUTION_PAGE,
} satisfies Record<string, SolutionPageData>;

export type SolutionPageSlug = keyof typeof SOLUTION_PAGES;

export function getSolutionPageBySlug(slug: string) {
  return SOLUTION_PAGES[slug as SolutionPageSlug];
}

export function getSolutionPageSlugs() {
  return Object.keys(SOLUTION_PAGES);
}

export function buildSolutionPageMetadata(page: SolutionPageData): Metadata {
  return {
    title: page.meta.title,
    description: page.meta.description,
    alternates: {
      canonical: `/solutions/${page.slug}`,
    },
    openGraph: {
      title: `${page.meta.title} | ${SITE_NAME}`,
      description: page.meta.description,
      url: `/solutions/${page.slug}`,
      type: "website",
      images: page.meta.ogImage ? [page.meta.ogImage] : undefined,
    },
    twitter: {
      card: "summary_large_image",
      title: `${page.meta.title} | ${SITE_NAME}`,
      description: page.meta.description,
      images: page.meta.ogImage ? [page.meta.ogImage] : undefined,
    },
  };
}
