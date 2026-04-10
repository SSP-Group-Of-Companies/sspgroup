import type { Metadata } from "next";
import { SITE_NAME, toAbsoluteUrl } from "@/lib/seo/site";

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
  media?: {
    src: string;
    alt: string;
    objectPosition?: string;
  };
  presentation?: {
    textFraction?: string;
    imageFraction?: string;
    slideFrom?: "left" | "right";
    imageOnRight?: boolean;
  };
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
    capacity?: {
      label: string;
      value: string;
    };
  };
  rules: readonly SolutionFitRule[];
  disclaimer?: string;
};

export type SolutionFreightFitSectionData = {
  eyebrow: string;
  title: string;
  description: string;
  guide: SolutionFreightFitGuide;
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
  bestFitProfiles?: {
    eyebrow: string;
    title: string;
    description: string;
    items: readonly SolutionFamilyCard[];
  };
  freightFit?: SolutionFreightFitSectionData;
  serviceUse?: {
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
  equipmentOverview: {
    eyebrow: string;
    /** Optional when the hero already states the same positioning. */
    title?: string;
    description?: string;
  };
  freightFit: SolutionFreightFitSectionData;
  whySsp: {
    eyebrow: string;
    points: readonly SolutionPillar[];
  };
  execution: {
    eyebrow: string;
    title: string;
    description: string;
    steps: readonly SolutionProcessStep[];
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
      src: "/_optimized/solution/truckload/commercialVideo.mp4",
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
      },
      {
        title: "Execution stays tied to operating decisions",
        body: "Truckload performance improves when planning, capacity, and milestone ownership stay connected. SSP keeps those decisions aligned so the shipment is not handed off without accountability.",
      },
      {
        title: "Communication follows the move, not generic updates",
        body: "Status updates are tied to real milestones, exceptions, and next actions, so the shipper has usable operating clarity instead of empty visibility.",
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
        media: {
          src: "/_optimized/solution/dryvan/dryvan-Img.png",
          alt: "Dry van trailer profile",
          objectPosition: "58% 48%",
        },
        presentation: {
          textFraction: "minmax(0,0.60fr)",
          imageFraction: "minmax(0,0.40fr)",
          slideFrom: "left",
          imageOnRight: true,
        },
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
        media: {
          src: "/_optimized/solution/flatbed/flatbed-Img.png",
          alt: "Flatbed truckload profile",
          objectPosition: "54% 54%",
        },
        presentation: {
          textFraction: "minmax(0,0.58fr)",
          imageFraction: "minmax(0,0.42fr)",
          slideFrom: "right",
          imageOnRight: false,
        },
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
        media: {
          src: "/_optimized/solution/stepdeck/stepdeck-Img.png",
          alt: "Step deck truckload profile",
          objectPosition: "56% 42%",
        },
        presentation: {
          textFraction: "minmax(0,0.60fr)",
          imageFraction: "minmax(0,0.40fr)",
          slideFrom: "left",
          imageOnRight: true,
        },
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
        media: {
          src: "/_optimized/solution/rgnheavyhaul/rgn-Img.png",
          alt: "RGN heavy haul profile",
          objectPosition: "50% 58%",
        },
        presentation: {
          textFraction: "minmax(0,0.62fr)",
          imageFraction: "minmax(0,0.38fr)",
          slideFrom: "right",
          imageOnRight: false,
        },
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
        media: {
          src: "/_optimized/solution/conestoga/conestoga-Img.png",
          alt: "Conestoga roll-tite profile",
          objectPosition: "50% 52%",
        },
        presentation: {
          textFraction: "minmax(0,0.60fr)",
          imageFraction: "minmax(0,0.40fr)",
          slideFrom: "left",
          imageOnRight: true,
        },
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

export const LTL_SOLUTION_PAGE: SolutionFamilyPageData = {
  pageType: "family",
  slug: "ltl",
  theme: {
    accent: "#3064a8",
    heroOverlay:
      "linear-gradient(108deg, rgba(7,24,38,0.88) 0%, rgba(20,44,78,0.78) 34%, rgba(48,100,168,0.46) 68%, rgba(48,100,168,0.24) 100%)",
    heroGlow: "radial-gradient(46%_54%_at_82%_18%,rgba(48,100,168,0.2),transparent_72%)",
  },
  meta: {
    title: "LTL Freight | SSP Group",
    description:
      "LTL freight shipping across Canada, the United States, and Mexico with shipment qualification, freight-class discipline, and controlled execution.",
    ogImage: "/_optimized/brand/SSPlogo.png",
  },
  hero: {
    eyebrow: "Less-Than-Truckload",
    title: "LTL freight planned for control before it enters the network.",
    description:
      "SSP plans LTL around density, class, packaging, dock conditions, and service commitments before freight is tendered. Across Canada, the United States, and Mexico, the objective is to use shared capacity efficiently without losing accountability for execution.",
    supportingPoints: [],
    primaryCta: {
      label: "Request an LTL Quote",
      href: "/quote?service=ltl",
    },
    secondaryCta: {
      label: "Talk to the LTL Team",
      href: "/contact?topic=ltl",
    },
    media: {
      src: "/_optimized/solution/ltl/ltl-Img.png",
      alt: "LTL freight moving through a controlled North American distribution lane",
    },
    mediaBrief: [
      {
        title: "LTL hero image",
        orientation: "landscape",
        description:
          "Premium flagship LTL image for the parent LTL page. It should feel operationally credible, modern, and structured around shared-capacity freight rather than generic transportation imagery.",
        mustShow: [
          "A premium LTL or dock-friendly freight scene with clear shipment movement context",
          "A composition that suggests networked execution, handling discipline, or distribution flow",
          "Enough calm negative space for premium hero copy",
        ],
        avoid: [
          "Busy dock scenes with visual clutter or unclear freight focus",
          "Low-resolution or outdated transportation imagery",
          "Artificial-looking edits, heavy filters, or AI-style artifacts",
        ],
      },
    ],
  },
  proof: [
    { value: "Shared-capacity", label: "Shipment model" },
    { value: "Asset-based", label: "Operating model" },
    { value: "CA-US-MX", label: "Operating reach" },
  ],
  subnavLabel: "LTL page sections",
  pageSections: [
    {
      key: "mode-overview",
      label: "Mode Overview",
      summary: "Short LTL framing with an embedded SSP overview video.",
      accent: "#0d4f78",
    },
    {
      key: "why-ssp",
      label: "Why SSP",
      summary: "The execution principles that keep LTL controlled and reliable.",
      accent: "#3064a8",
    },
    {
      key: "freight-fit",
      label: "Freight Fit Guide",
      summary: "The shipment conditions that confirm LTL and the operating paths when it is not the right fit.",
      accent: "#10a7d8",
    },
    {
      key: "how-it-works",
      label: "How It Works",
      summary: "The operating sequence SSP uses to structure an LTL move.",
      accent: "#d71920",
    },
    {
      key: "how-to-use",
      label: "When To Choose",
      summary: "The shipment conditions that make LTL the better operating answer.",
      accent: "#b37a20",
    },
    {
      key: "related",
      label: "Related Services",
      summary: "Where SSP routes the shipper when LTL is not the right fit.",
      accent: "#0d4f78",
    },
    {
      key: "faq",
      label: "FAQ",
      summary: "The main qualification questions shippers ask before booking LTL.",
      accent: "#3064a8",
    },
  ],
  modeOverview: {
    eyebrow: "Mode Overview",
    title: "LTL is a network service. The shipment has to fit it.",
    description:
      "LTL works when freight is palletized, accurately classified, dock-compatible, and able to move through terminal handling without creating avoidable claim or delay exposure. The cost advantage comes from shared capacity, but the operating discipline has to be established before the freight enters the network.",
    video: {
      src: "/_optimized/solution/ltl/commercialVideo.mp4",
      posterSrc: "/_optimized/solution/ltl/mode-overview-poster.jpg",
      title: "LTL service in motion",
    },
  },
  whySsp: {
    eyebrow: "Why SSP For LTL",
    points: [
      {
        title: "Shipment quality is checked before tender",
        body: "SSP reviews weight, dimensions, density, commodity description, packaging, and class inputs before the shipment is booked. That discipline reduces reweigh, reclass, and downstream billing disputes.",
      },
      {
        title: "Facility and accessorial risk is surfaced early",
        body: "Appointment rules, limited-access locations, liftgate needs, and delivery constraints are identified before execution starts. That prevents basic site conditions from turning into service failures.",
      },
      {
        title: "Exception management stays active once freight is moving",
        body: "LTL visibility matters when a terminal transfer, delay, or delivery issue changes the plan. SSP communicates against the exception and the recovery path, not just the scan history.",
      },
    ],
  },
  howItWorks: {
    eyebrow: "How It Works",
    title: "Cleaner LTL execution starts with cleaner shipment data.",
    description:
      "Shared-capacity freight performs best when the shipment profile, class, packaging, and site requirements are resolved before pickup. SSP uses that discipline to protect cost, transit expectations, and delivery follow-through.",
    steps: [
      {
        step: "01",
        title: "Define the shipment correctly",
        body: "Pallet count, dimensions, weight, commodity, packaging, and required service details are confirmed up front so the load is not introduced to the network on bad data.",
      },
      {
        step: "02",
        title: "Confirm class and handling requirements",
        body: "Density, NMFC-class drivers, stackability, accessorials, and pickup or delivery constraints are reviewed before tender to reduce rework and billing surprises.",
      },
      {
        step: "03",
        title: "Assign the right service path",
        body: "SSP aligns the lane, service level, and network path to the freight profile so transit expectations match what the shipment can realistically support.",
      },
      {
        step: "04",
        title: "Manage milestones, exceptions, and closeout",
        body: "Pickup status, terminal movement, appointment changes, proof-of-delivery flow, and any recovery actions stay inside one operating workflow with clear accountability.",
      },
    ],
  },
  freightFit: {
    eyebrow: "Freight Fit Guide",
    title: "Freight fit should be resolved before you book LTL.",
    description:
      "Use this guide to confirm that the shipment belongs in shared capacity. If the freight needs tighter control, exclusive space, or specialized handling, SSP should move it into the correct service path before pickup.",
    guide: {
      title: "LTL Freight Fit Guide",
      intro:
        "LTL is built for freight that does not require exclusive trailer space and can move through a terminal network cleanly. Use this guide to confirm fit and identify the better SSP path when it does not.",
      diagram: "/_optimized/solution/ltl/ltl-Img.png",
      diagramAlt: "LTL freight movement and shared-capacity service overview",
      specs: {
        length: "Shared trailer space across multiple shipments",
        width: "Dock-compatible pallets and packaged freight",
        height: "Standard enclosed-service handling profile",
        weight: "Below the point where dedicated trailer economics win",
        capacity: {
          label: "Typical volume range",
          value: "Often 1-12 pallets, depending on density, class, and lane",
        },
      },
      rules: [
        {
          condition: "Shipment volume large enough for dedicated capacity",
          description:
            "When freight regularly fills enough trailer space that shared handling and terminal routing stop making economic sense, LTL is no longer the cleanest operating answer.",
          recommendation: "Truckload",
          serviceSlug: "/solutions/truckload",
        },
        {
          condition: "Freight requiring tighter transit or recovery speed",
          description:
            "When production timing, customer commitments, or recovery risk cannot absorb standard terminal routing and transit windows, a priority-first service path should lead the move.",
          recommendation: "Expedited",
          serviceSlug: "/solutions/expedited",
        },
        {
          condition: "Freight requiring temperature control",
          description:
            "If product integrity depends on a controlled cargo environment, standard LTL should not be the lead operating model.",
          recommendation: "Temperature-Controlled",
          serviceSlug: "/solutions/temperature-controlled",
        },
        {
          condition: "Freight requiring open-deck loading or oversized handling",
          description:
            "If the cargo needs top, side, or crane loading, or no longer fits standard dock-compatible assumptions, SSP should route it into the correct open-deck equipment path.",
          recommendation: "Flatbed",
          serviceSlug: "/solutions/flatbed",
        },
      ],
      disclaimer:
        "Planning guidance only. Final fit depends on actual dimensions, density, packaging quality, class inputs, lane structure, and site constraints.",
    },
  },
  serviceUse: {
    eyebrow: "When To Choose LTL",
    title: "Choose LTL when the shipment fits the network by design.",
    description:
      "LTL is the right answer when freight is too small for dedicated equipment, properly packaged for terminal handling, and moving on a service window that does not require truckload-style control.",
    checklistTitle: "LTL is usually the better fit when",
    checklist: [
      "The shipment is too small to justify dedicated trailer economics",
      "Freight is palletized, stable, and prepared for normal terminal handling",
      "Transit and appointment expectations fit a shared-capacity network",
      "Accurate dimensions, weight, and commodity data are available before tender",
    ],
    steps: [
      {
        title: "Economic Fit",
        body: "The shipment belongs in pooled trailer space because volume, weight, or order pattern does not justify dedicated capacity.",
      },
      {
        title: "Data Discipline",
        body: "Dimensions, weight, commodity detail, packaging profile, and class inputs are known before booking, which protects both rating accuracy and execution.",
      },
      {
        title: "Site Readiness",
        body: "Pickup and delivery locations can support dock-based handling, or any accessorial requirements are identified early enough to plan the move correctly.",
      },
      {
        title: "Rerouting Threshold",
        body: "If the freight grows beyond LTL economics or needs tighter handling, temperature protection, or faster recovery, SSP should move it to the better-fit service before pickup.",
      },
    ],
  },
  relatedSolutions: {
    eyebrow: "Related Services",
    title: "If LTL stops fitting the shipment, move it early.",
    description:
      "These are the next SSP paths when shared-capacity execution no longer matches the freight.",
    items: [
      {
        label: "Truckload",
        href: "/solutions/truckload",
        reason: "Move to truckload when the freight volume, timing pressure, or handling requirements justify dedicated trailer space instead of pooled capacity.",
      },
      {
        label: "Expedited",
        href: "/solutions/expedited",
        reason: "Move to expedited when the shipment is deadline-critical and standard LTL service windows are too loose for the operating need.",
      },
      {
        label: "Temperature-Controlled",
        href: "/solutions/temperature-controlled",
        reason: "Move to temperature-controlled when product integrity depends on monitored cargo temperature rather than standard enclosed shared-capacity handling.",
      },
      {
        label: "Cross-Border",
        href: "/solutions/cross-border",
        reason: "Move to cross-border when customs, border handoffs, and corridor execution should lead the operating structure.",
      },
      {
        label: "Managed Capacity",
        href: "/solutions/managed-capacity",
        reason: "Move to managed capacity when recurring freight patterns need procurement governance, routing discipline, and program-level control beyond one-off LTL shipments.",
      },
    ],
  },
  faq: {
    eyebrow: "LTL FAQs",
    title: "The questions that matter before booking LTL.",
    description:
      "These are the qualification questions that usually determine whether LTL is the right operating model and what SSP needs to structure the move cleanly.",
    items: [
      {
        question: "What counts as an LTL shipment?",
        answer:
          "Generally, it is palletized freight that does not need exclusive trailer space and can move through a terminal network without specialized equipment. In practice, many LTL shipments fall below full-truckload volume and are prepared for dock-to-dock handling.",
      },
      {
        question: "What information matters most before I request an LTL quote?",
        answer:
          "Pickup and delivery locations, pallet count, dimensions, total weight, commodity description, packaging type, freight class if known, and any accessorial needs such as liftgate, appointment, residential, or limited-access service matter most.",
      },
      {
        question: "What usually causes LTL reclass or extra-charge exposure?",
        answer:
          "Inaccurate dimensions or weight, incomplete commodity descriptions, incorrect class, weak packaging, and undisclosed accessorials are the common drivers. The cleaner the shipment data, the cleaner the billing and execution.",
      },
      {
        question: "When should a shipper move from LTL to truckload or expedited?",
        answer:
          "Move to truckload when freight volume or handling exposure no longer fits shared capacity. Move to expedited when transit tolerance is too tight for standard network routing or the recovery window is too narrow.",
      },
      {
        question: "Can SSP support cross-border LTL between Canada, the United States, and Mexico?",
        answer:
          "Yes. Cross-border LTL can be structured when customs data, commercial documentation, commodity detail, and lane planning are prepared correctly before tender. Border moves require the paperwork and operating sequence to be resolved early.",
      },
    ],
  },
  finalCta: {
    kicker: "Start the conversation",
    title: "Validate the shipment before it enters the LTL network.",
    body: "Send the lane, pallet count, dimensions, weight, commodity, packaging profile, and delivery requirements. SSP will confirm whether LTL is the right fit, identify class or handling risks, and structure the move for controlled execution.",
    trustSignals: [
      "Asset-based operating model across Canada, the United States, and Mexico",
      "Freight-fit review tied to truckload, expedited, temperature-controlled, and cross-border paths",
      "Class, accessorial, and milestone discipline before tender",
    ],
    proof: [
      { label: "Model", value: "Shared-capacity" },
      { label: "Operating model", value: "Asset-based" },
      { label: "Reach", value: "CA-US-MX" },
    ],
    ctas: {
      primary: {
        label: "Request an LTL Quote",
        href: "/quote?service=ltl",
        ctaId: "solutions_ltl_final_request_quote",
      },
      secondary: {
        label: "Talk to the LTL Team",
        href: "/contact?topic=ltl",
        ctaId: "solutions_ltl_final_talk_team",
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
    title: "Dry Van Freight | SSP Group",
    description:
      "Dry van freight across Canada, the United States, and Mexico for palletized and boxed shipments that need enclosed trailer protection and disciplined execution.",
    ogImage: "/_optimized/brand/SSPlogo.png",
  },
  hero: {
    eyebrow: "Dry Van",
    title: "Enclosed dry van capacity for standard freight.",
    description:
      "SSP moves dry van freight across Canada, the United States, and Mexico for shippers that need enclosed trailer protection, dock-compatible loading, and controlled appointment execution. This is the right equipment path for palletized, boxed, and floor-loaded freight that does not require temperature control or open-deck access.",
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
    { value: "26 pallets", label: "Planning capacity" },
    { value: "CA-US-MX", label: "Operating reach" },
  ],
  subnavLabel: "Dry van page sections",
  pageSections: [
    {
      key: "overview",
      label: "Overview",
      summary: "Dry van dimensions, pallet capacity, and the usable equipment envelope.",
      accent: "#0d4f78",
    },
    {
      key: "freight-fit",
      label: "Freight Fit",
      summary: "How to confirm dry van and when SSP should route the load elsewhere.",
      accent: "#10a7d8",
    },
    {
      key: "why-ssp",
      label: "Why SSP",
      summary: "The execution controls that matter once dry van is the right equipment.",
      accent: "#d71920",
    },
    {
      key: "execution",
      label: "How It Works",
      summary: "How SSP qualifies, dispatches, and closes a dry van shipment.",
      accent: "#3064a8",
    },
    {
      key: "related",
      label: "Related Equipment & Services",
      summary: "The next SSP paths to review when dry van is not the right answer.",
      accent: "#b37a20",
    },
    {
      key: "faq",
      label: "FAQ",
      summary: "The operating questions that usually determine whether dry van fits.",
      accent: "#0d4f78",
    },
  ],
  equipmentOverview: {
    eyebrow: "Equipment Overview",
    title: "Dry van dimensions define the usable freight envelope.",
    description:
      "Before a load is booked, trailer dimensions, pallet capacity, and legal payload should be checked against the actual freight profile. That prevents avoidable reloads, dock friction, and late equipment changes.",
  },
  freightFit: {
    eyebrow: "Freight Fit Guide",
    title: "Freight fit should confirm dry van early.",
    description:
      "Use this guide to confirm that the shipment belongs in standard enclosed equipment. If the freight falls outside the dry van envelope, SSP should route it into the correct equipment or service path before the move is committed.",
    guide: {
      title: "Dry Van Freight Fit Guide",
      intro:
        "Dry van is the standard enclosed trailer for general truckload freight across North America. Use this guide to confirm the load fits the equipment envelope and to identify the better SSP path when the shipment requires another operating model.",
      diagram: "/_optimized/solution/dryvan/dry-van.svg",
      diagramAlt: "Dry van trailer equipment diagram with dimensions and payload guidance",
      specs: {
        length: "53 ft trailer",
        width: "8.5 ft (102 inches)",
        height: "~9 ft interior clearance",
        weight: "~43,000-45,000 lbs typical legal payload",
        capacity: {
          label: "Pallet Capacity",
          value: "Typically up to 26 standard pallets",
        },
      },
      rules: [
        {
          condition: "Small palletized shipments",
          description:
            "If the shipment does not need dedicated trailer space and falls below the usual truckload threshold, paying for exclusive equipment may not be the cleanest operating choice.",
          recommendation: "LTL",
          serviceSlug: "/solutions/ltl",
        },
        {
          condition: "Freight taller than enclosed limits or requiring top or side loading",
          description:
            "If the cargo exceeds enclosed height limits or needs crane, side, or top loading access, dry van is no longer the right equipment path.",
          recommendation: "Flatbed",
          serviceSlug: "/solutions/flatbed",
        },
        {
          condition: "Freight requiring temperature control",
          description:
            "If product integrity depends on a controlled cargo environment, enclosed protection alone is not enough.",
          recommendation: "Temperature-Controlled",
          serviceSlug: "/solutions/temperature-controlled",
        },
        {
          condition: "Freight requiring hazardous materials handling",
          description:
            "If the load requires placarding, hazmat documentation, or specialized carrier qualification, dry van should not be the lead decision.",
          recommendation: "Hazmat",
          serviceSlug: "/solutions/hazmat",
        },
      ],
      disclaimer:
        "Planning values only. Final legal fit depends on route, axle configuration, trailer type, and loading method.",
    },
  },
  whySsp: {
    eyebrow: "Why SSP For Dry Van",
    points: [
      {
        title: "Equipment fit is qualified before the load is covered",
        body: "SSP reviews commodity, dimensions, pallet count, loading method, and site conditions before dry van capacity is assigned, so execution starts with the right trailer and a realistic operating plan.",
      },
      {
        title: "Dock execution is structured before pickup day",
        body: "Pickup windows, delivery appointments, reference numbers, and receiving requirements are aligned before dispatch so the move does not lose control at the dock door.",
      },
      {
        title: "Documentation and exceptions stay inside the move",
        body: "BOL control, POD closeout, detention exposure, and delivery-side issues are handled as operating responsibilities tied to the shipment, not cleanup after the fact.",
      },
    ],
  },
  execution: {
    eyebrow: "How It Works",
    title: "A dry van move should be structured before dispatch.",
    description:
      "Dry van execution improves when equipment fit, dock conditions, paperwork, and milestone ownership are aligned before the trailer is moving. This is the operating sequence SSP follows.",
    steps: [
      {
        step: "01",
        title: "Confirm freight profile and trailer fit",
        body: "Commodity, pallet count, dimensions, weight, and loading method are reviewed first so dry van is confirmed before pricing or capacity is assigned.",
      },
      {
        step: "02",
        title: "Align dock requirements and shipment controls",
        body: "Pickup windows, delivery appointments, reference numbers, and paperwork requirements are built into the operating plan before dispatch.",
      },
      {
        step: "03",
        title: "Dispatch against milestone ownership",
        body: "Once the move is qualified, SSP dispatches against pickup, in-transit, and delivery milestones with communication tied to real operating checkpoints.",
      },
      {
        step: "04",
        title: "Close delivery with documentation discipline",
        body: "POD closeout, billing handoff, and any exception follow-through stay connected to the shipment so the move finishes cleanly and stays accountable through completion.",
      },
    ],
  },
  relatedSolutions: {
    eyebrow: "Related Equipment & Services",
    title: "If dry van is not the right fit, reroute early.",
    description:
      "These are the first SSP paths to review when the freight no longer fits standard enclosed trailer assumptions or when another operating model should lead the move.",
    items: [
      {
        label: "Truckload",
        href: "/solutions/truckload",
        reason: "Use the truckload parent page to compare dry van against flatbed, step deck, Conestoga, and heavy-haul equipment before the load is committed.",
      },
      {
        label: "Flatbed",
        href: "/solutions/flatbed",
        reason: "Move to flatbed when the freight exceeds dry van interior limits or needs top, side, or crane loading instead of dock loading.",
      },
      {
        label: "LTL",
        href: "/solutions/ltl",
        reason: "Move to LTL when the shipment is too light or too small to justify a dedicated dry van and can move efficiently in shared capacity.",
      },
      {
        label: "Temperature-Controlled",
        href: "/solutions/temperature-controlled",
        reason: "Move to temperature-controlled when product integrity depends on monitored cargo temperature and dry van enclosure alone is not enough.",
      },
      {
        label: "Hazmat",
        href: "/solutions/hazmat",
        reason: "Move to hazmat when the load requires placarding, hazmat documentation, or carrier qualification beyond standard dry van execution.",
      },
    ],
  },
  faq: {
    eyebrow: "Dry Van FAQs",
    title: "The operating questions that matter before booking dry van.",
    description:
      "These are the questions that usually determine whether dry van is the correct equipment path and what SSP needs to structure the move cleanly.",
    items: [
      {
        question: "What freight is best suited to dry van?",
        answer:
          "Dry van is best for standard palletized, boxed, or floor-loaded freight that needs enclosed trailer protection but does not require temperature control, top loading, or side loading access.",
      },
      {
        question: "How much freight fits in a 53-foot dry van?",
        answer:
          "A standard 53-foot dry van usually plans around 26 standard pallets and roughly 43,000 to 45,000 pounds of legal payload, but final usable capacity depends on pallet pattern, weight distribution, and route limits.",
      },
      {
        question: "When should I choose dry van over LTL?",
        answer:
          "Dry van is usually the better answer when the shipment needs dedicated trailer space, tighter appointment control, or enough volume that shared-capacity service introduces avoidable handling and routing friction.",
      },
      {
        question: "When should dry van be routed to another equipment path?",
        answer:
          "Dry van should be rerouted when the freight exceeds enclosed trailer limits, needs open-deck loading access, requires temperature control, or moves under hazmat requirements that demand another operating model.",
      },
      {
        question: "Can dry van be used for cross-border freight?",
        answer:
          "Yes. Dry van is commonly used for cross-border freight between Canada, the United States, and Mexico when the cargo fits standard enclosed equipment and the shipment is prepared with the right customs and documentation controls.",
      },
    ],
  },
  finalCta: {
    kicker: "Confirm the fit",
    title: "Confirm dry van fit before the trailer is assigned.",
    body: "Share the lane, commodity, pallet count, dimensions, and timing requirements. SSP will confirm whether dry van is the right equipment path, flag any fit risks early, and structure the move for clean execution.",
    trustSignals: [
      "Dry van execution across Canada, the United States, and Mexico",
      "Freight-fit guidance tied to adjacent SSP equipment and service paths",
      "Appointment, documentation, and handoff discipline built into the move",
    ],
    proof: [
      { label: "Equipment", value: "53 ft" },
      { label: "Capacity", value: "26 pallets" },
      { label: "Reach", value: "CA-US-MX" },
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

export const FLATBED_SOLUTION_PAGE: SolutionDetailPageData = {
  pageType: "detail",
  slug: "flatbed",
  theme: {
    accent: "#15608d",
    heroOverlay:
      "linear-gradient(96deg, rgba(7,24,38,0.9) 0%, rgba(12,68,100,0.8) 34%, rgba(21,96,141,0.5) 68%, rgba(16,167,216,0.13) 100%)",
    heroGlow: "radial-gradient(46%_54%_at_84%_16%,rgba(21,96,141,0.13),transparent_74%)",
  },
  meta: {
    title: "Flatbed Freight | SSP Group",
    description:
      "Flatbed freight across Canada, the United States, and Mexico for open-deck shipments that need top, side, or crane loading with securement-led execution.",
    ogImage: "/_optimized/brand/SSPlogo.png",
  },
  hero: {
    eyebrow: "Flatbed",
    title: "Open-deck flatbed capacity for freight that cannot move enclosed.",
    description:
      "SSP moves flatbed freight across Canada, the United States, and Mexico for shippers that need top, side, or crane loading, open-deck access, and controlled securement execution. This is the right equipment path for industrial materials, machinery, construction freight, and oversized cargo that does not fit standard enclosed trailer assumptions.",
    descriptionMaxWidth: "48rem",
    supportingPoints: [],
    primaryCta: {
      label: "Request a Flatbed Quote",
      href: "/quote?service=truckload&mode=flatbed",
    },
    secondaryCta: {
      label: "Talk to the Flatbed Team",
      href: "/contact?topic=truckload&mode=flatbed",
    },
    media: {
      src: "/_optimized/solution/flatbed/flatbedHero-Img.png",
      alt: "Flatbed trailer hauling industrial freight on a North American route",
    },
    mediaBrief: [
      {
        title: "Flatbed hero image",
        orientation: "landscape",
        description:
          "Premium flatbed image for the child page. It should feel industrial, precise, and operationally credible, with clear open-deck context.",
        mustShow: [
          "Flatbed equipment clearly visible as the subject",
          "A freight profile that signals industrial, construction, or machinery movement",
          "A calm composition with clear room for premium headline copy",
        ],
        avoid: [
          "Visual clutter that obscures the load or trailer type",
          "Generic highway imagery where open-deck handling context is unclear",
          "Low-quality, dated, or artificial-looking photography",
        ],
      },
    ],
  },
  proof: [
    { value: "48-53 ft", label: "Typical deck length" },
    { value: "Open-deck", label: "Equipment model" },
    { value: "CA-US-MX", label: "Operating reach" },
  ],
  subnavLabel: "Flatbed page sections",
  pageSections: [
    {
      key: "overview",
      label: "Overview",
      summary: "Flatbed dimensions, deck access, and the usable open-deck freight envelope.",
      accent: "#0d4f78",
    },
    {
      key: "freight-fit",
      label: "Freight Fit",
      summary: "How to confirm flatbed and when SSP should route the load elsewhere.",
      accent: "#10a7d8",
    },
    {
      key: "why-ssp",
      label: "Why SSP",
      summary: "The execution controls that matter once flatbed is the right equipment.",
      accent: "#d71920",
    },
    {
      key: "execution",
      label: "How It Works",
      summary: "How SSP qualifies, dispatches, and closes a flatbed shipment.",
      accent: "#3064a8",
    },
    {
      key: "related",
      label: "Related Equipment & Services",
      summary: "The next SSP paths to review when flatbed is not the right answer.",
      accent: "#b37a20",
    },
    {
      key: "faq",
      label: "FAQ",
      summary: "The operating questions that usually determine whether flatbed fits.",
      accent: "#0d4f78",
    },
  ],
  equipmentOverview: {
    eyebrow: "Equipment Overview",
    title: "Flatbed dimensions define the usable open-deck envelope.",
    description:
      "Before a load is booked, deck length, legal width, cargo height, and securement requirements should be checked against the actual freight profile. That prevents avoidable reloads, permit surprises, and site-side handling failures.",
  },
  freightFit: {
    eyebrow: "Freight Fit Guide",
    title: "Freight fit should confirm flatbed early.",
    description:
      "Use this guide to confirm that the shipment belongs on standard open-deck equipment. If the freight needs more height control, permit-led planning, or enclosed protection, SSP should route it into the correct equipment or service path before the move is committed.",
    guide: {
      title: "Flatbed Freight Fit Guide",
      intro:
        "Flatbed is the standard open-deck trailer for freight that needs top, side, or crane access, or exceeds enclosed trailer constraints. Use this guide to confirm the load fits the equipment envelope and to identify the better SSP path when the shipment requires another operating model.",
      diagram: "/_optimized/solution/flatbed/flatbed.webp",
      diagramAlt: "Flatbed trailer equipment diagram with dimensions and payload guidance",
      specs: {
        length: "48 ft or 53 ft deck",
        width: "8.5 ft (102 inches)",
        height: "Open deck; legal route height still applies",
        weight: "~43,000-48,000 lbs typical legal payload depending on equipment and route",
      },
      rules: [
        {
          condition: "Freight that fits standard enclosed equipment",
          description:
            "If the cargo fits inside a dry van and does not require open-deck loading access, enclosed transport usually provides a cleaner and more weather-protected operating path.",
          recommendation: "Dry Van",
          serviceSlug: "/solutions/dry-van",
        },
        {
          condition: "Taller freight that needs lower deck height to stay legal",
          description:
            "If the load fits open deck but overall height becomes the main issue, a lower-deck equipment path should lead the move before flatbed is committed.",
          recommendation: "Step Deck",
          serviceSlug: "/solutions/step-deck",
        },
        {
          condition: "Oversized or overweight freight requiring permit-led planning",
          description:
            "If the cargo moves beyond standard legal dimensions or weight and needs permits, escorts, or specialized loading geometry, flatbed is no longer the cleanest operating answer.",
          recommendation: "RGN / Heavy Haul",
          serviceSlug: "/solutions/rgn-heavy-haul",
        },
        {
          condition: "Freight that needs weather protection without losing side-loading access",
          description:
            "If the load needs open-deck handling flexibility but cannot be exposed to weather, a covered open-deck path should lead the move.",
          recommendation: "Conestoga / Roll-Tite",
          serviceSlug: "/solutions/conestoga-roll-tite",
        },
      ],
      disclaimer:
        "Planning values only. Final legal fit depends on route, axle configuration, commodity, securement plan, and any permit or site restrictions.",
    },
  },
  whySsp: {
    eyebrow: "Why SSP For Flatbed",
    points: [
      {
        title: "Equipment fit and securement logic are resolved before dispatch",
        body: "SSP reviews commodity, dimensions, loading method, weight distribution, and securement requirements before flatbed capacity is assigned, so execution starts with the right deck and a realistic operating plan.",
      },
      {
        title: "Site coordination is structured before pickup day",
        body: "Loading equipment, crane access, appointment timing, site restrictions, and unloading sequence are aligned before dispatch so the move does not lose control at the jobsite or dock.",
      },
      {
        title: "Exceptions stay tied to the shipment, not handled after the fact",
        body: "Weather exposure, permit changes, route constraints, detention risk, and delivery-side issues are managed as operating responsibilities tied to the load from pickup through closeout.",
      },
    ],
  },
  execution: {
    eyebrow: "How It Works",
    title: "A flatbed move should be structured before the freight is loaded.",
    description:
      "Flatbed execution improves when equipment fit, securement approach, site conditions, and milestone ownership are aligned before the trailer is moving. This is the operating sequence SSP follows.",
    steps: [
      {
        step: "01",
        title: "Confirm freight profile and deck fit",
        body: "Commodity, dimensions, weight, center-of-gravity concerns, and loading method are reviewed first so flatbed is confirmed before pricing or capacity is assigned.",
      },
      {
        step: "02",
        title: "Align securement and site requirements",
        body: "Securement needs, tarping, loading equipment, site access, appointment timing, and unloading sequence are built into the operating plan before dispatch.",
      },
      {
        step: "03",
        title: "Dispatch against milestone ownership",
        body: "Once the move is qualified, SSP dispatches against pickup, in-transit, and delivery milestones with communication tied to real operating checkpoints and site readiness.",
      },
      {
        step: "04",
        title: "Close delivery with documentation and exception discipline",
        body: "Delivery confirmation, POD closeout, accessorial review, and any route or site-side follow-through stay connected to the shipment so the move finishes cleanly and stays accountable through completion.",
      },
    ],
  },
  relatedSolutions: {
    eyebrow: "Related Equipment & Services",
    title: "If flatbed is not the right fit, reroute early.",
    description:
      "These are the first SSP paths to review when the freight no longer fits standard open-deck assumptions or when another operating model should lead the move.",
    items: [
      {
        label: "Truckload",
        href: "/solutions/truckload",
        reason: "Use the truckload parent page to compare flatbed against step deck, Conestoga, and heavy-haul equipment before the load is committed.",
      },
      {
        label: "Step Deck",
        href: "/solutions/step-deck",
        reason: "Move to step deck when the freight fits open deck but needs lower deck height to stay within legal route limits.",
      },
      {
        label: "RGN / Heavy Haul",
        href: "/solutions/rgn-heavy-haul",
        reason: "Move to RGN or heavy haul when the cargo requires permit-led planning, lower loading geometry, or specialized oversized handling.",
      },
      {
        label: "Conestoga / Roll-Tite",
        href: "/solutions/conestoga-roll-tite",
        reason: "Move to Conestoga when the freight needs weather protection but still requires open-deck loading flexibility.",
      },
      {
        label: "Dry Van",
        href: "/solutions/dry-van",
        reason: "Move to dry van when the cargo fits enclosed equipment and open-deck access is not actually required.",
      },
    ],
  },
  faq: {
    eyebrow: "Flatbed FAQs",
    title: "The operating questions that matter before booking flatbed.",
    description:
      "These are the questions that usually determine whether flatbed is the correct equipment path and what SSP needs to structure the move cleanly.",
    items: [
      {
        question: "What freight is best suited to flatbed?",
        answer:
          "Flatbed is best for freight that needs top, side, or crane loading, exceeds enclosed trailer constraints, or moves as industrial or construction cargo that is operationally cleaner on open deck equipment.",
      },
      {
        question: "What deck dimensions matter most for flatbed planning?",
        answer:
          "Deck length, legal width, load height, weight distribution, and available securement points matter most. A standard flatbed usually plans around 48 to 53 feet of deck length and 102 inches of width, but legal fit still depends on route and cargo profile.",
      },
      {
        question: "When should I choose flatbed over dry van?",
        answer:
          "Flatbed is usually the better answer when the shipment needs open-deck access for loading or unloading, exceeds enclosed trailer dimensions, or involves cargo profiles that are operationally cleaner to secure and move on deck.",
      },
      {
        question: "When should flatbed be routed to another equipment path?",
        answer:
          "Flatbed should be rerouted when the freight needs lower deck height, permit-led oversized handling, weather protection, or enclosed transport that better matches the commodity and route.",
      },
      {
        question: "Can flatbed be used for cross-border freight?",
        answer:
          "Yes. Flatbed is commonly used for cross-border freight between Canada, the United States, and Mexico when the cargo fits open-deck equipment and the shipment is planned around the right corridor, securement, and documentation controls.",
      },
    ],
  },
  finalCta: {
    kicker: "Confirm the fit",
    title: "Confirm flatbed fit before the deck is assigned.",
    body: "Share the lane, commodity, dimensions, weight, loading method, and timing requirements. SSP will confirm whether flatbed is the right equipment path, flag any fit or securement risks early, and structure the move for controlled execution.",
    trustSignals: [
      "Flatbed execution across Canada, the United States, and Mexico",
      "Freight-fit guidance tied to adjacent SSP equipment and service paths",
      "Securement, site coordination, and handoff discipline built into the move",
    ],
    proof: [
      { label: "Equipment", value: "48-53 ft" },
      { label: "Model", value: "Open-deck" },
      { label: "Reach", value: "CA-US-MX" },
    ],
    ctas: {
      primary: {
        label: "Request a Flatbed Quote",
        href: "/quote?service=truckload&mode=flatbed",
        ctaId: "solutions_flatbed_final_request_quote",
      },
      secondary: {
        label: "Talk to the Flatbed Team",
        href: "/contact?topic=truckload&mode=flatbed",
        ctaId: "solutions_flatbed_final_talk_team",
      },
    },
  },
};

export const STEP_DECK_SOLUTION_PAGE: SolutionDetailPageData = {
  pageType: "detail",
  slug: "step-deck",
  theme: {
    accent: "#1b5b84",
    heroOverlay:
      "linear-gradient(96deg, rgba(7,24,38,0.9) 0%, rgba(13,64,96,0.8) 34%, rgba(27,91,132,0.5) 68%, rgba(16,167,216,0.12) 100%)",
    heroGlow: "radial-gradient(46%_54%_at_84%_16%,rgba(27,91,132,0.13),transparent_74%)",
  },
  meta: {
    title: "Step Deck Freight | SSP Group",
    description:
      "Step deck freight across Canada, the United States, and Mexico for taller open-deck shipments that need lower deck height and controlled execution.",
    ogImage: "/_optimized/brand/SSPlogo.png",
  },
  hero: {
    eyebrow: "Step Deck",
    title: "Lower-deck step deck capacity for taller open-deck freight.",
    description:
      "SSP moves step deck freight across Canada, the United States, and Mexico for shippers that need open-deck access with lower deck height than a standard flatbed can provide. This is the right equipment path for taller machinery, fabricated units, industrial skids, and freight profiles that must stay legal without moving into a removable-gooseneck or permit-led heavy-haul structure.",
    descriptionMaxWidth: "50rem",
    supportingPoints: [],
    primaryCta: {
      label: "Request a Step Deck Quote",
      href: "/quote?service=truckload&mode=step-deck",
    },
    secondaryCta: {
      label: "Talk to the Step Deck Team",
      href: "/contact?topic=truckload&mode=step-deck",
    },
    media: {
      src: "/_optimized/solution/stepdeck/stepdeckHero-Img.png",
      alt: "Step deck trailer hauling tall industrial freight on a North American route",
    },
    mediaBrief: [
      {
        title: "Step deck hero image",
        orientation: "landscape",
        description:
          "Premium step deck image for the child page. It should feel industrial, precise, and operationally credible, with the lower-deck profile visually clear.",
        mustShow: [
          "Step deck equipment clearly visible as the subject",
          "A freight profile that signals taller industrial cargo or machinery movement",
          "A composed scene with clean room for premium headline copy",
        ],
        avoid: [
          "Imagery where the trailer profile reads like a standard flatbed",
          "Visual clutter that obscures the lower deck or the cargo geometry",
          "Low-quality, dated, or artificial-looking photography",
        ],
      },
    ],
  },
  proof: [
    { value: "Lower deck", label: "Equipment model" },
    { value: "Tall freight", label: "Best-fit profile" },
    { value: "CA-US-MX", label: "Operating reach" },
  ],
  subnavLabel: "Step deck page sections",
  pageSections: [
    {
      key: "overview",
      label: "Overview",
      summary: "Step deck dimensions, lower-deck geometry, and the usable open-deck freight envelope.",
      accent: "#0d4f78",
    },
    {
      key: "freight-fit",
      label: "Freight Fit",
      summary: "How to confirm step deck and when SSP should route the load elsewhere.",
      accent: "#10a7d8",
    },
    {
      key: "why-ssp",
      label: "Why SSP",
      summary: "The execution controls that matter once step deck is the right equipment.",
      accent: "#d71920",
    },
    {
      key: "execution",
      label: "How It Works",
      summary: "How SSP qualifies, dispatches, and closes a step deck shipment.",
      accent: "#3064a8",
    },
    {
      key: "related",
      label: "Related Equipment & Services",
      summary: "The next SSP paths to review when step deck is not the right answer.",
      accent: "#b37a20",
    },
    {
      key: "faq",
      label: "FAQ",
      summary: "The operating questions that usually determine whether step deck fits.",
      accent: "#0d4f78",
    },
  ],
  equipmentOverview: {
    eyebrow: "Equipment Overview",
    title: "Step deck dimensions are about height control, not just deck length.",
    description:
      "Before a load is booked, the lower-deck profile, overall cargo height, deck length, legal width, and securement requirements should be checked against the actual freight. That is what determines whether step deck keeps the shipment legal and operationally clean.",
  },
  freightFit: {
    eyebrow: "Freight Fit Guide",
    title: "Freight fit should confirm step deck before pricing locks in.",
    description:
      "Use this guide to confirm that the shipment needs lower deck height without moving into a more specialized equipment path. If the freight fits a standard flatbed, requires permit-led handling, or needs weather protection, SSP should route it early.",
    guide: {
      title: "Step Deck Freight Fit Guide",
      intro:
        "Step deck is the lower-deck open trailer used when cargo needs more legal height tolerance than a standard flatbed can usually provide. Use this guide to confirm the load fits the equipment envelope and to identify the better SSP path when the shipment requires another operating model.",
      diagram: "/_optimized/solution/stepdeck/stepDeck.webp",
      diagramAlt: "Step deck trailer equipment diagram with lower-deck dimensions and payload guidance",
      specs: {
        length: "48 ft or 53 ft overall deck with upper and lower deck sections",
        width: "8.5 ft (102 inches)",
        height: "Lower deck supports taller legal freight profiles than standard flatbed",
        weight: "~42,000-48,000 lbs typical legal payload depending on configuration and route",
      },
      rules: [
        {
          condition: "Freight that fits standard flatbed deck height",
          description:
            "If the cargo can stay legal and operationally clean on a standard flatbed, adding a lower-deck trailer may create complexity without improving the move.",
          recommendation: "Flatbed",
          serviceSlug: "/solutions/flatbed",
        },
        {
          condition: "Oversized, overweight, or ultra-tall freight requiring permit-led planning",
          description:
            "If the shipment moves beyond standard legal dimensions or needs lower loading geometry, escorts, permits, or specialized axle planning, step deck is no longer the cleanest answer.",
          recommendation: "RGN / Heavy Haul",
          serviceSlug: "/solutions/rgn-heavy-haul",
        },
        {
          condition: "Freight that needs weather protection without losing open-deck loading flexibility",
          description:
            "If the cargo still needs side-loading or crane access but exposure is not acceptable, a covered open-deck path should lead the move instead.",
          recommendation: "Conestoga / Roll-Tite",
          serviceSlug: "/solutions/conestoga-roll-tite",
        },
        {
          condition: "Freight that fits enclosed equipment and does not require open-deck access",
          description:
            "If the load can move inside a dry van and lower deck height is not actually needed, enclosed transport usually provides a cleaner and more protected operating path.",
          recommendation: "Dry Van",
          serviceSlug: "/solutions/dry-van",
        },
      ],
      disclaimer:
        "Planning values only. Final legal fit depends on route, axle configuration, commodity, securement plan, and any permit or site restrictions.",
    },
  },
  whySsp: {
    eyebrow: "Why SSP For Step Deck",
    points: [
      {
        title: "Height-risk qualification happens before capacity is assigned",
        body: "SSP reviews cargo dimensions, lower-deck fit, loading method, route constraints, and securement requirements before step deck capacity is committed, so the operating plan reflects actual height exposure rather than assumption.",
      },
      {
        title: "Site handling and deck geometry are aligned early",
        body: "Upper-deck transition, loading sequence, forklift or crane access, appointment timing, and unload conditions are structured before pickup so the move does not lose control at the site.",
      },
      {
        title: "Exceptions stay tied to the shipment from pickup through closeout",
        body: "Route restrictions, weather exposure, delivery-side readiness, detention risk, and any operating changes remain managed responsibilities tied to the load instead of issues discovered after the fact.",
      },
    ],
  },
  execution: {
    eyebrow: "How It Works",
    title: "A step deck move should be qualified before dispatch.",
    description:
      "Step deck execution improves when cargo height, deck fit, loading method, and route reality are aligned before the trailer is moving. This is the operating sequence SSP follows.",
    steps: [
      {
        step: "01",
        title: "Confirm cargo geometry and lower-deck fit",
        body: "Commodity, dimensions, weight, center-of-gravity concerns, and loading method are reviewed first so step deck is confirmed before pricing or capacity is assigned.",
      },
      {
        step: "02",
        title: "Align route and site constraints",
        body: "Height exposure, route limitations, securement needs, loading equipment, site access, and unloading sequence are built into the operating plan before dispatch.",
      },
      {
        step: "03",
        title: "Dispatch against milestone ownership",
        body: "Once the move is qualified, SSP dispatches against pickup, in-transit, and delivery milestones with communication tied to real operating checkpoints and site readiness.",
      },
      {
        step: "04",
        title: "Close delivery with documentation and exception discipline",
        body: "Delivery confirmation, POD closeout, accessorial review, and any route or site-side follow-through stay connected to the shipment so the move finishes cleanly and stays accountable through completion.",
      },
    ],
  },
  relatedSolutions: {
    eyebrow: "Related Equipment & Services",
    title: "If step deck is not the right fit, reroute early.",
    description:
      "These are the first SSP paths to review when the freight no longer fits the lower-deck open-trailer profile or when another operating model should lead the move.",
    items: [
      {
        label: "Truckload",
        href: "/solutions/truckload",
        reason: "Use the truckload parent page to compare step deck against flatbed, Conestoga, and heavy-haul equipment before the load is committed.",
      },
      {
        label: "Flatbed",
        href: "/solutions/flatbed",
        reason: "Move to flatbed when the freight still needs open-deck access but standard deck height is already sufficient.",
      },
      {
        label: "RGN / Heavy Haul",
        href: "/solutions/rgn-heavy-haul",
        reason: "Move to RGN or heavy haul when the cargo requires lower loading geometry, permit-led planning, or specialized oversized handling beyond standard step deck assumptions.",
      },
      {
        label: "Conestoga / Roll-Tite",
        href: "/solutions/conestoga-roll-tite",
        reason: "Move to Conestoga when the freight needs weather protection while preserving open-deck loading flexibility.",
      },
      {
        label: "Dry Van",
        href: "/solutions/dry-van",
        reason: "Move to dry van when the cargo fits enclosed equipment and lower-deck open access is not actually required.",
      },
    ],
  },
  faq: {
    eyebrow: "Step Deck FAQs",
    title: "The operating questions that matter before booking step deck.",
    description:
      "These are the questions that usually determine whether step deck is the correct equipment path and what SSP needs to structure the move cleanly.",
    items: [
      {
        question: "What freight is best suited to step deck?",
        answer:
          "Step deck is best for open-deck freight that is too tall for a standard flatbed to remain comfortably legal but does not require a removable-gooseneck or other heavy-haul structure. Common examples include tall machinery, fabricated equipment, industrial skids, and irregular freight profiles.",
      },
      {
        question: "Why choose step deck instead of flatbed?",
        answer:
          "Choose step deck when lower deck height materially improves legal route fit for the cargo. If the freight still fits cleanly on a standard flatbed, flatbed is usually the simpler operating answer.",
      },
      {
        question: "When should step deck be routed to RGN or heavy haul?",
        answer:
          "Step deck should be rerouted when the shipment moves beyond standard legal dimensions or weight, needs permits, escorts, or lower loading geometry, or involves equipment and route conditions that require a more specialized heavy-haul plan.",
      },
      {
        question: "Can step deck freight still require tarping or weather protection planning?",
        answer:
          "Yes. Step deck is still open-deck equipment, so weather exposure, tarping requirements, cargo sensitivity, and site handling conditions should be resolved before the trailer is assigned.",
      },
      {
        question: "Can step deck be used for cross-border freight?",
        answer:
          "Yes. Step deck can be used for cross-border freight between Canada, the United States, and Mexico when the cargo fits the equipment path and the shipment is planned around the right corridor, securement, and documentation controls.",
      },
    ],
  },
  finalCta: {
    kicker: "Confirm the fit",
    title: "Confirm step deck fit before the trailer is assigned.",
    body: "Share the lane, commodity, dimensions, weight, loading method, and timing requirements. SSP will confirm whether step deck is the right equipment path, flag height or handling risks early, and structure the move for controlled execution.",
    trustSignals: [
      "Step deck execution across Canada, the United States, and Mexico",
      "Freight-fit guidance tied to adjacent SSP equipment and service paths",
      "Height, route, securement, and site coordination discipline built into the move",
    ],
    proof: [
      { label: "Model", value: "Lower-deck" },
      { label: "Profile", value: "Tall freight" },
      { label: "Reach", value: "CA-US-MX" },
    ],
    ctas: {
      primary: {
        label: "Request a Step Deck Quote",
        href: "/quote?service=truckload&mode=step-deck",
        ctaId: "solutions_step_deck_final_request_quote",
      },
      secondary: {
        label: "Talk to the Step Deck Team",
        href: "/contact?topic=truckload&mode=step-deck",
        ctaId: "solutions_step_deck_final_talk_team",
      },
    },
  },
};

export const CONESTOGA_ROLL_TITE_SOLUTION_PAGE: SolutionDetailPageData = {
  pageType: "detail",
  slug: "conestoga-roll-tite",
  theme: {
    accent: "#114a72",
    heroOverlay:
      "linear-gradient(96deg, rgba(7,24,38,0.9) 0%, rgba(11,58,88,0.8) 34%, rgba(17,74,114,0.5) 68%, rgba(16,167,216,0.11) 100%)",
    heroGlow: "radial-gradient(46%_54%_at_84%_16%,rgba(17,74,114,0.12),transparent_74%)",
  },
  meta: {
    title: "Conestoga Freight | SSP Group",
    description:
      "Conestoga freight across Canada, the United States, and Mexico for weather-protected open-deck shipments that still need flexible loading access.",
    ogImage: "/_optimized/brand/SSPlogo.png",
  },
  hero: {
    eyebrow: "Conestoga / Roll-Tite",
    title: "Covered open-deck capacity for freight that cannot be exposed.",
    description:
      "SSP moves Conestoga and Roll-Tite freight across Canada, the United States, and Mexico for shippers that need open-deck loading flexibility with added weather protection and cleaner cargo containment. This is the right equipment path for industrial freight, crated machinery, aluminum products, and engineered materials that should not move exposed on a standard flatbed or step deck.",
    descriptionMaxWidth: "50rem",
    supportingPoints: [],
    primaryCta: {
      label: "Request a Conestoga Quote",
      href: "/quote?service=truckload&mode=conestoga-roll-tite",
    },
    secondaryCta: {
      label: "Talk to the Conestoga Team",
      href: "/contact?topic=truckload&mode=conestoga-roll-tite",
    },
    media: {
      src: "/_optimized/solution/conestoga/conestogaHero-Img.png",
      alt: "Conestoga trailer hauling weather-sensitive industrial freight on a North American route",
    },
    mediaBrief: [
      {
        title: "Conestoga hero image",
        orientation: "landscape",
        description:
          "Premium Conestoga image for the child page. It should feel industrial, controlled, and operationally credible, with covered open-deck equipment clearly visible.",
        mustShow: [
          "Conestoga or Roll-Tite equipment clearly visible as the subject",
          "A freight profile that signals high-value or weather-sensitive industrial cargo",
          "A composed scene with clear room for premium headline copy",
        ],
        avoid: [
          "Imagery where the equipment reads like a standard dry van or plain flatbed",
          "Visual clutter that obscures the covered open-deck system or cargo context",
          "Low-quality, dated, or artificial-looking photography",
        ],
      },
    ],
  },
  proof: [
    { value: "Covered deck", label: "Equipment model" },
    { value: "Weather-sensitive", label: "Best-fit profile" },
    { value: "CA-US-MX", label: "Operating reach" },
  ],
  subnavLabel: "Conestoga page sections",
  pageSections: [
    {
      key: "overview",
      label: "Overview",
      summary: "Conestoga dimensions, cover system fit, and the usable protected open-deck envelope.",
      accent: "#0d4f78",
    },
    {
      key: "freight-fit",
      label: "Freight Fit",
      summary: "How to confirm Conestoga and when SSP should route the load elsewhere.",
      accent: "#10a7d8",
    },
    {
      key: "why-ssp",
      label: "Why SSP",
      summary: "The execution controls that matter once Conestoga is the right equipment.",
      accent: "#d71920",
    },
    {
      key: "execution",
      label: "How It Works",
      summary: "How SSP qualifies, dispatches, and closes a Conestoga shipment.",
      accent: "#3064a8",
    },
    {
      key: "related",
      label: "Related Equipment & Services",
      summary: "The next SSP paths to review when Conestoga is not the right answer.",
      accent: "#b37a20",
    },
    {
      key: "faq",
      label: "FAQ",
      summary: "The operating questions that usually determine whether Conestoga fits.",
      accent: "#0d4f78",
    },
  ],
  equipmentOverview: {
    eyebrow: "Equipment Overview",
    title: "Conestoga fit is defined by both deck geometry and cover clearance.",
    description:
      "Before a load is booked, deck length, legal width, cargo height, load profile, and the usable cover system should be checked against the freight. That is what determines whether the shipment can keep open-deck handling flexibility without exposing the cargo in transit.",
  },
  freightFit: {
    eyebrow: "Freight Fit Guide",
    title: "Freight fit should confirm Conestoga before the trailer is assigned.",
    description:
      "Use this guide to confirm that the shipment needs weather protection without giving up open-deck loading access. If the freight can move exposed, needs lower deck height, or requires enclosed equipment instead, SSP should route it early.",
    guide: {
      title: "Conestoga Freight Fit Guide",
      intro:
        "Conestoga and Roll-Tite equipment are protected open-deck trailers used when freight still benefits from side, top, or crane loading but should not be exposed to weather in transit. Use this guide to confirm the load fits the equipment envelope and to identify the better SSP path when the shipment requires another operating model.",
      diagram: "/_optimized/solution/conestoga/rollTite_conestoga.webp",
      diagramAlt: "Conestoga trailer equipment diagram with covered open-deck dimensions and payload guidance",
      specs: {
        length: "48 ft or 53 ft protected deck depending on equipment configuration",
        width: "8.5 ft (102 inches)",
        height: "Cover system and cargo profile must work together within legal route limits",
        weight: "~42,000-45,000 lbs typical legal payload depending on equipment and route",
      },
      rules: [
        {
          condition: "Freight that can move exposed on standard open-deck equipment",
          description:
            "If the cargo does not require weather protection and standard deck height is sufficient, a flatbed path usually provides a simpler operating answer.",
          recommendation: "Flatbed",
          serviceSlug: "/solutions/flatbed",
        },
        {
          condition: "Freight that needs lower deck height as much as cover protection",
          description:
            "If the cargo profile is tall enough that overall height becomes the main issue, a lower-deck open-trailer path should be reviewed before Conestoga is committed.",
          recommendation: "Step Deck",
          serviceSlug: "/solutions/step-deck",
        },
        {
          condition: "Freight that fits enclosed equipment and does not require open-deck access",
          description:
            "If the load can move inside a dry van and does not need side-loading, top-loading, or crane handling, enclosed transport is often the cleaner and more economical path.",
          recommendation: "Dry Van",
          serviceSlug: "/solutions/dry-van",
        },
        {
          condition: "Oversized or overweight freight requiring permit-led planning",
          description:
            "If the shipment moves beyond standard legal dimensions or weight and needs permits, escorts, or specialized loading geometry, Conestoga is no longer the cleanest answer.",
          recommendation: "RGN / Heavy Haul",
          serviceSlug: "/solutions/rgn-heavy-haul",
        },
      ],
      disclaimer:
        "Planning values only. Final legal fit depends on route, axle configuration, cargo profile, securement plan, cover system clearance, and any permit or site restrictions.",
    },
  },
  whySsp: {
    eyebrow: "Why SSP For Conestoga",
    points: [
      {
        title: "Protection requirements are qualified before capacity is committed",
        body: "SSP reviews commodity sensitivity, cargo profile, loading method, cover-system fit, and securement requirements before Conestoga capacity is assigned, so the shipment is matched to the right protected open-deck path from the start.",
      },
      {
        title: "Loading flexibility and site execution are aligned early",
        body: "Tarp-system handling, loading sequence, crane or forklift access, appointment timing, and unload conditions are structured before pickup so the move does not lose control at the site.",
      },
      {
        title: "Exceptions stay tied to the load through closeout",
        body: "Weather exposure risk, route changes, delivery-side readiness, detention exposure, and any operating changes remain managed responsibilities tied to the shipment instead of issues left for after-the-fact cleanup.",
      },
    ],
  },
  execution: {
    eyebrow: "How It Works",
    title: "A Conestoga move should be structured before dispatch.",
    description:
      "Conestoga execution improves when cargo sensitivity, loading method, cover fit, and route reality are aligned before the trailer is moving. This is the operating sequence SSP follows.",
    steps: [
      {
        step: "01",
        title: "Confirm cargo profile and protection requirement",
        body: "Commodity, dimensions, weight, handling method, and weather-exposure sensitivity are reviewed first so Conestoga is confirmed before pricing or capacity is assigned.",
      },
      {
        step: "02",
        title: "Align cover system, securement, and site conditions",
        body: "Cover clearance, securement needs, loading equipment, site access, appointment timing, and unloading sequence are built into the operating plan before dispatch.",
      },
      {
        step: "03",
        title: "Dispatch against milestone ownership",
        body: "Once the move is qualified, SSP dispatches against pickup, in-transit, and delivery milestones with communication tied to real operating checkpoints and site readiness.",
      },
      {
        step: "04",
        title: "Close delivery with documentation and exception discipline",
        body: "Delivery confirmation, POD closeout, accessorial review, and any route or site-side follow-through stay connected to the shipment so the move finishes cleanly and stays accountable through completion.",
      },
    ],
  },
  relatedSolutions: {
    eyebrow: "Related Equipment & Services",
    title: "If Conestoga is not the right fit, reroute early.",
    description:
      "These are the first SSP paths to review when the freight no longer fits the protected open-deck profile or when another operating model should lead the move.",
    items: [
      {
        label: "Truckload",
        href: "/solutions/truckload",
        reason: "Use the truckload parent page to compare Conestoga against flatbed, step deck, and heavy-haul equipment before the load is committed.",
      },
      {
        label: "Flatbed",
        href: "/solutions/flatbed",
        reason: "Move to flatbed when the freight still needs open-deck access but weather protection is not actually required.",
      },
      {
        label: "Step Deck",
        href: "/solutions/step-deck",
        reason: "Move to step deck when the freight needs lower deck height to stay legal and protected open-deck equipment is no longer the cleanest answer.",
      },
      {
        label: "Dry Van",
        href: "/solutions/dry-van",
        reason: "Move to dry van when the cargo fits enclosed equipment and open-deck loading flexibility is not needed.",
      },
      {
        label: "RGN / Heavy Haul",
        href: "/solutions/rgn-heavy-haul",
        reason: "Move to RGN or heavy haul when the cargo requires permit-led planning, specialized loading geometry, or oversized handling beyond standard protected open-deck assumptions.",
      },
    ],
  },
  faq: {
    eyebrow: "Conestoga FAQs",
    title: "The operating questions that matter before booking Conestoga.",
    description:
      "These are the questions that usually determine whether Conestoga is the correct equipment path and what SSP needs to structure the move cleanly.",
    items: [
      {
        question: "What freight is best suited to Conestoga or Roll-Tite equipment?",
        answer:
          "Conestoga is best for freight that still benefits from side, top, or crane loading but should not be exposed to weather in transit. Common examples include crated machinery, aluminum products, engineered materials, and other high-value industrial freight.",
      },
      {
        question: "When should I choose Conestoga over flatbed?",
        answer:
          "Choose Conestoga when the shipment still needs open-deck loading flexibility but cargo protection matters. If the freight can safely move exposed, a standard flatbed is usually the simpler path.",
      },
      {
        question: "When should Conestoga be routed to dry van?",
        answer:
          "Conestoga should be rerouted to dry van when the cargo fits enclosed equipment and does not actually require side-loading, top-loading, or crane access. In that case, dry van usually gives a cleaner enclosed operating path.",
      },
      {
        question: "Can Conestoga handle taller freight than a standard flatbed?",
        answer:
          "Sometimes, but cargo fit depends on both legal route height and the usable cover-system clearance. If height becomes the main constraint, SSP should review step deck or another equipment path before committing the move.",
      },
      {
        question: "Can Conestoga be used for cross-border freight?",
        answer:
          "Yes. Conestoga can be used for cross-border freight between Canada, the United States, and Mexico when the cargo fits the equipment path and the shipment is planned around the right corridor, securement, and documentation controls.",
      },
    ],
  },
  finalCta: {
    kicker: "Confirm the fit",
    title: "Confirm Conestoga fit before the trailer is assigned.",
    body: "Share the lane, commodity, dimensions, weight, loading method, and timing requirements. SSP will confirm whether Conestoga is the right equipment path, flag protection or fit risks early, and structure the move for controlled execution.",
    trustSignals: [
      "Conestoga execution across Canada, the United States, and Mexico",
      "Freight-fit guidance tied to adjacent SSP equipment and service paths",
      "Protection, securement, route, and site coordination discipline built into the move",
    ],
    proof: [
      { label: "Model", value: "Covered open-deck" },
      { label: "Profile", value: "Weather-sensitive" },
      { label: "Reach", value: "CA-US-MX" },
    ],
    ctas: {
      primary: {
        label: "Request a Conestoga Quote",
        href: "/quote?service=truckload&mode=conestoga-roll-tite",
        ctaId: "solutions_conestoga_roll_tite_final_request_quote",
      },
      secondary: {
        label: "Talk to the Conestoga Team",
        href: "/contact?topic=truckload&mode=conestoga-roll-tite",
        ctaId: "solutions_conestoga_roll_tite_final_talk_team",
      },
    },
  },
};

export const RGN_HEAVY_HAUL_SOLUTION_PAGE: SolutionDetailPageData = {
  pageType: "detail",
  slug: "rgn-heavy-haul",
  theme: {
    accent: "#0a4267",
    heroOverlay:
      "linear-gradient(96deg, rgba(7,24,38,0.92) 0%, rgba(10,52,80,0.82) 34%, rgba(10,66,103,0.52) 68%, rgba(16,167,216,0.1) 100%)",
    heroGlow: "radial-gradient(46%_54%_at_84%_16%,rgba(10,66,103,0.12),transparent_74%)",
  },
  meta: {
    title: "RGN Heavy Haul Freight | SSP Group",
    description:
      "RGN and heavy haul freight across Canada, the United States, and Mexico for oversized or overweight shipments that need permit-led execution.",
    ogImage: "/_optimized/brand/SSPlogo.png",
  },
  hero: {
    eyebrow: "RGN / Heavy Haul",
    title: "Specialized heavy haul capacity for freight beyond standard deck limits.",
    description:
      "SSP moves RGN and heavy haul freight across Canada, the United States, and Mexico for shippers that need permit-led planning, lower loading geometry, specialized axle configurations, and controlled site execution. This is the right equipment path for construction equipment, transformers, mining units, oversized machinery, and project cargo that cannot move cleanly on standard flatbed, step deck, or protected open-deck equipment.",
    descriptionMaxWidth: "51rem",
    supportingPoints: [],
    primaryCta: {
      label: "Request an RGN Quote",
      href: "/quote?service=truckload&mode=rgn-heavy-haul",
    },
    secondaryCta: {
      label: "Talk to the Heavy Haul Team",
      href: "/contact?topic=truckload&mode=rgn-heavy-haul",
    },
    media: {
      src: "/_optimized/solution/rgnheavyhaul/rgnHero-Img.png",
      alt: "RGN heavy haul trailer transporting oversized industrial freight on a North American route",
    },
    mediaBrief: [
      {
        title: "RGN hero image",
        orientation: "landscape",
        description:
          "Premium RGN and heavy haul image for the child page. It should feel engineered, controlled, and operationally credible, with the specialized trailer geometry clearly visible.",
        mustShow: [
          "RGN or heavy haul equipment clearly visible as the subject",
          "A freight profile that signals oversized machinery, project cargo, or specialized industrial transport",
          "A composed scene with enough clean room for premium headline copy",
        ],
        avoid: [
          "Imagery where the trailer profile reads like standard flatbed or step deck equipment",
          "Chaotic project scenes that feel messy instead of controlled",
          "Low-quality, dated, or artificial-looking photography",
        ],
      },
    ],
  },
  proof: [
    { value: "Permit-led", label: "Operating model" },
    { value: "Low deck", label: "Equipment geometry" },
    { value: "CA-US-MX", label: "Operating reach" },
  ],
  subnavLabel: "RGN heavy haul page sections",
  pageSections: [
    {
      key: "overview",
      label: "Overview",
      summary: "RGN dimensions, low-deck loading geometry, and the usable heavy-haul equipment envelope.",
      accent: "#0d4f78",
    },
    {
      key: "freight-fit",
      label: "Freight Fit",
      summary: "How to confirm RGN or heavy haul and when SSP should route the load elsewhere.",
      accent: "#10a7d8",
    },
    {
      key: "why-ssp",
      label: "Why SSP",
      summary: "The execution controls that matter once heavy haul is the right equipment.",
      accent: "#d71920",
    },
    {
      key: "execution",
      label: "How It Works",
      summary: "How SSP qualifies, dispatches, and closes an RGN or heavy haul shipment.",
      accent: "#3064a8",
    },
    {
      key: "related",
      label: "Related Equipment & Services",
      summary: "The next SSP paths to review when heavy haul is not the right answer.",
      accent: "#b37a20",
    },
    {
      key: "faq",
      label: "FAQ",
      summary: "The operating questions that usually determine whether RGN or heavy haul fits.",
      accent: "#0d4f78",
    },
  ],
  equipmentOverview: {
    eyebrow: "Equipment Overview",
    title: "Heavy haul fit starts with loading geometry, axle plan, and route reality.",
    description:
      "Before a load is booked, overall dimensions, piece weight, loading method, center of gravity, axle requirements, and route constraints should be checked against the actual freight. That is what determines whether RGN or another heavy-haul path is operationally viable before permits and dispatch are set in motion.",
  },
  freightFit: {
    eyebrow: "Freight Fit Guide",
    title: "Freight fit should confirm heavy haul before permit work begins.",
    description:
      "Use this guide to confirm that the shipment moves beyond standard legal or equipment limits and needs a specialized heavy-haul operating path. If the freight still fits flatbed, step deck, or another standard trailer path, SSP should route it early before complexity is added unnecessarily.",
    guide: {
      title: "RGN / Heavy Haul Freight Fit Guide",
      intro:
        "RGN and heavy haul equipment are used when freight needs lower loading geometry, specialized axle configurations, or permit-led planning beyond standard trailer assumptions. Use this guide to confirm the load fits the equipment envelope and to identify the better SSP path when the shipment requires another operating model.",
      diagram: "/_optimized/solution/rgnheavyhaul/RGN_oversize.webp",
      diagramAlt: "RGN heavy haul equipment diagram with low-deck dimensions and oversized freight guidance",
      specs: {
        length: "Configuration depends on trailer setup, deck sections, and project requirements",
        width: "Legal width or permit width depending on cargo profile and route",
        height: "Low deck supports taller freight, but total loaded height still depends on route and permit conditions",
        weight: "Axle- and configuration-dependent; heavy haul planning may exceed standard legal payload with permits",
      },
      rules: [
        {
          condition: "Freight that still fits standard open-deck equipment",
          description:
            "If the cargo can stay legal and operationally clean on a standard flatbed without permit complexity, heavy haul is usually more equipment than the move requires.",
          recommendation: "Flatbed",
          serviceSlug: "/solutions/flatbed",
        },
        {
          condition: "Freight that needs lower deck height but not a full heavy-haul structure",
          description:
            "If the load is tall enough to need lower deck geometry but does not require specialized axle planning or permit-led handling, step deck may be the cleaner answer.",
          recommendation: "Step Deck",
          serviceSlug: "/solutions/step-deck",
        },
        {
          condition: "Weather-sensitive freight that still needs open-deck loading flexibility",
          description:
            "If cargo protection is the lead issue and the shipment still fits protected open-deck equipment, a Conestoga path may be cleaner than moving into heavy haul.",
          recommendation: "Conestoga / Roll-Tite",
          serviceSlug: "/solutions/conestoga-roll-tite",
        },
        {
          condition: "Freight requiring broader program governance beyond a single specialized move",
          description:
            "If the shipment is part of a larger engineered move, phased site sequence, or multi-load project, SSP may need to structure it inside a wider project freight operating plan.",
          recommendation: "Truckload",
          serviceSlug: "/solutions/truckload",
        },
      ],
      disclaimer:
        "Planning values only. Final legal fit depends on dimensions, weight by axle, route survey, permit conditions, escort requirements, loading method, and site restrictions.",
    },
  },
  whySsp: {
    eyebrow: "Why SSP For RGN / Heavy Haul",
    points: [
      {
        title: "Route, permit, and equipment logic are qualified before dispatch",
        body: "SSP reviews dimensions, piece weight, loading geometry, axle requirements, and route exposure before heavy haul capacity is committed, so the move starts with a realistic operating plan instead of assumptions discovered too late.",
      },
      {
        title: "Site execution is aligned before the equipment arrives",
        body: "Pickup conditions, crane or drive-on loading method, escort requirements, unloading sequence, and delivery-site constraints are structured before dispatch so the move does not lose control at either end of the route.",
      },
      {
        title: "Exceptions stay managed as part of the shipment",
        body: "Permit changes, route restrictions, weather exposure, detention risk, and site-side delays remain managed responsibilities tied to the move from planning through closeout rather than issues left for after-the-fact escalation.",
      },
    ],
  },
  execution: {
    eyebrow: "How It Works",
    title: "A heavy haul move should be engineered before dispatch.",
    description:
      "RGN and heavy haul execution improve when cargo geometry, route reality, permit requirements, and site handling are aligned before dispatch. This is the operating sequence SSP follows.",
    steps: [
      {
        step: "01",
        title: "Confirm cargo profile and loading geometry",
        body: "Dimensions, weight, center-of-gravity concerns, loading method, and piece characteristics are reviewed first so the right heavy-haul path is confirmed before pricing or capacity is assigned.",
      },
      {
        step: "02",
        title: "Align route, permit, and site requirements",
        body: "Route limits, permit exposure, escort needs, axle strategy, loading equipment, site access, and unloading sequence are built into the operating plan before dispatch.",
      },
      {
        step: "03",
        title: "Dispatch against controlled milestones",
        body: "Once the move is qualified, SSP dispatches against pickup, in-transit, and delivery milestones with communication tied to permit windows, route checkpoints, and site readiness.",
      },
      {
        step: "04",
        title: "Close delivery with documentation and exception discipline",
        body: "Delivery confirmation, POD closeout, accessorial review, and any route or site-side follow-through stay connected to the shipment so the move finishes cleanly and stays accountable through completion.",
      },
    ],
  },
  relatedSolutions: {
    eyebrow: "Related Equipment & Services",
    title: "If heavy haul is not the right fit, reroute early.",
    description:
      "These are the first SSP paths to review when the freight no longer needs a permit-led heavy-haul structure or when another operating model should lead the move.",
    items: [
      {
        label: "Truckload",
        href: "/solutions/truckload",
        reason: "Use the truckload parent page to compare heavy haul against flatbed, step deck, and protected open-deck equipment before the load is committed.",
      },
      {
        label: "Flatbed",
        href: "/solutions/flatbed",
        reason: "Move to flatbed when the cargo still needs open-deck access but remains within standard legal and equipment assumptions.",
      },
      {
        label: "Step Deck",
        href: "/solutions/step-deck",
        reason: "Move to step deck when lower deck height solves the freight-fit issue without requiring specialized axle planning or permit-led heavy-haul execution.",
      },
      {
        label: "Conestoga / Roll-Tite",
        href: "/solutions/conestoga-roll-tite",
        reason: "Move to Conestoga when cargo protection matters and the shipment still fits a protected open-deck path.",
      },
      {
        label: "Dry Van",
        href: "/solutions/dry-van",
        reason: "Move to dry van when the cargo fits enclosed equipment and neither open-deck access nor heavy-haul geometry is actually required.",
      },
    ],
  },
  faq: {
    eyebrow: "RGN / Heavy Haul FAQs",
    title: "The operating questions that matter before booking heavy haul.",
    description:
      "These are the questions that usually determine whether RGN or heavy haul is the correct equipment path and what SSP needs to structure the move cleanly.",
    items: [
      {
        question: "What freight is best suited to RGN or heavy haul equipment?",
        answer:
          "RGN and heavy haul are best for oversized, overweight, or difficult-geometry freight that cannot move cleanly on standard flatbed, step deck, or protected open-deck equipment. Common examples include construction equipment, transformers, mining units, oversized machinery, and project cargo.",
      },
      {
        question: "When should I choose RGN instead of step deck or flatbed?",
        answer:
          "Choose RGN or heavy haul when lower loading geometry, piece weight, axle requirements, or permit-led route conditions move the freight beyond standard open-deck assumptions. If the load still fits step deck or flatbed cleanly, those paths are usually simpler.",
      },
      {
        question: "What information matters most before I request a heavy haul quote?",
        answer:
          "Dimensions, piece weight, pickup and delivery sites, loading method, center-of-gravity concerns, commodity description, timing requirements, and any known route or permit constraints matter most. The cleaner the front-end data, the cleaner the engineered plan.",
      },
      {
        question: "Does heavy haul always require permits or escorts?",
        answer:
          "Not always, but permit and escort exposure are common once freight moves beyond standard legal dimensions or axle limits. The exact requirement depends on cargo profile, route, jurisdictions involved, and the final equipment configuration.",
      },
      {
        question: "Can RGN or heavy haul be used for cross-border freight?",
        answer:
          "Yes. RGN and heavy haul can be structured across Canada, the United States, and Mexico when the shipment is planned around route feasibility, permit requirements, border coordination, and site execution before pickup.",
      },
    ],
  },
  finalCta: {
    kicker: "Confirm the fit",
    title: "Confirm heavy haul fit before permit work and dispatch begin.",
    body: "Share the lane, commodity, dimensions, weight, loading method, and timing requirements. SSP will confirm whether RGN or heavy haul is the right equipment path, surface route and permit risks early, and structure the move for controlled execution.",
    trustSignals: [
      "RGN and heavy haul execution across Canada, the United States, and Mexico",
      "Freight-fit guidance tied to adjacent SSP equipment and service paths",
      "Route, permit, axle, and site coordination discipline built into the move",
    ],
    proof: [
      { label: "Model", value: "Permit-led" },
      { label: "Geometry", value: "Low deck" },
      { label: "Reach", value: "CA-US-MX" },
    ],
    ctas: {
      primary: {
        label: "Request an RGN Quote",
        href: "/quote?service=truckload&mode=rgn-heavy-haul",
        ctaId: "solutions_rgn_heavy_haul_final_request_quote",
      },
      secondary: {
        label: "Talk to the Heavy Haul Team",
        href: "/contact?topic=truckload&mode=rgn-heavy-haul",
        ctaId: "solutions_rgn_heavy_haul_final_talk_team",
      },
    },
  },
};

export const TEMPERATURE_CONTROLLED_SOLUTION_PAGE: SolutionFamilyPageData = {
  pageType: "family",
  slug: "temperature-controlled",
  theme: {
    accent: "#38bdf8",
    heroOverlay:
      "linear-gradient(108deg, rgba(5,18,32,0.9) 0%, rgba(10,34,56,0.82) 34%, rgba(14,116,144,0.42) 68%, rgba(56,189,248,0.2) 100%)",
    heroGlow: "radial-gradient(46%_54%_at_82%_18%,rgba(56,189,248,0.22),transparent_72%)",
  },
  meta: {
    title: "Temperature-Controlled Freight | SSP Group",
    description:
      "Temperature-controlled freight across Canada, the United States, and Mexico with setpoint planning, monitored transit, and cold-chain execution.",
    ogImage: "/_optimized/brand/SSPlogo.png",
  },
  hero: {
    eyebrow: "Temperature-Controlled",
    title: "Temperature-controlled freight planned around setpoint integrity.",
    description:
      "SSP structures temperature-controlled freight around commodity sensitivity, required setpoint range, trailer readiness, monitoring expectations, and delivery conditions before the load moves. Across Canada, the United States, and Mexico, the priority is protecting product integrity without losing execution control.",
    descriptionMaxWidth: "48rem",
    supportingPoints: [],
    primaryCta: {
      label: "Request a Temperature-Controlled Quote",
      href: "/quote?service=temperature-controlled",
    },
    secondaryCta: {
      label: "Talk to the Temperature-Control Team",
      href: "/contact?topic=temperature-controlled",
    },
    media: {
      src: "/_optimized/solution/tempCtrl/tempCtrl-Img.png",
      alt: "Temperature-controlled trailer moving refrigerated freight through a North American corridor",
    },
    mediaBrief: [
      {
        title: "Temperature-controlled hero image",
        orientation: "landscape",
        description:
          "Premium flagship image for the temperature-controlled page. It should feel operationally precise, modern, and clearly tied to cold-chain freight rather than generic trucking.",
        mustShow: [
          "Temperature-controlled trailer or cold-chain freight context that is visually obvious",
          "A clean operating setting such as a shipper dock, distribution center, or controlled highway corridor",
          "Calm negative space that supports premium hero copy without visual clutter",
        ],
        avoid: [
          "Generic truck photography where refrigerated equipment is unclear",
          "Busy warehouse scenes that bury the subject or dilute the premium feel",
          "Low-resolution, dated, or artificial-looking imagery",
        ],
      },
    ],
  },
  proof: [
    { value: "48-53 ft", label: "Equipment range" },
    { value: "Setpoint-led", label: "Operating model" },
    { value: "CA-US-MX", label: "Operating reach" },
  ],
  subnavLabel: "Temperature-controlled page sections",
  pageSections: [
    {
      key: "mode-overview",
      label: "Mode Overview",
      summary: "What temperature-controlled freight is and the operating controls it depends on.",
      accent: "#0d4f78",
    },
    {
      key: "why-ssp",
      label: "Why SSP",
      summary: "The execution controls that matter once product integrity depends on temperature.",
      accent: "#0284c7",
    },
    {
      key: "freight-fit",
      label: "Freight Fit Guide",
      summary: "How to confirm temperature-controlled service and when another SSP path should lead the move.",
      accent: "#10a7d8",
    },
    {
      key: "how-it-works",
      label: "How It Works",
      summary: "The operating sequence SSP uses to structure a temperature-controlled shipment.",
      accent: "#d71920",
    },
    {
      key: "how-to-use",
      label: "When To Choose",
      summary: "The shipment conditions that make temperature-controlled the correct operating answer.",
      accent: "#b37a20",
    },
    {
      key: "related",
      label: "Related Services",
      summary: "Where SSP routes the shipper when active temperature control is not the lead requirement.",
      accent: "#0d4f78",
    },
    {
      key: "faq",
      label: "FAQ",
      summary: "The qualification questions that matter before booking temperature-controlled freight.",
      accent: "#0284c7",
    },
  ],
  modeOverview: {
    eyebrow: "Mode Overview",
    title: "Temperature-controlled freight is built around product integrity.",
    description:
      "This mode is used when cargo quality, shelf life, or compliance depends on maintaining a defined temperature range during transit. The reefer trailer matters, but so do setpoint instructions, pre-load readiness, airflow, monitoring, and disciplined response if conditions change.",
    video: {
      src: "/_optimized/solution/tempCtrl/comomercialVideo.mp4",
      posterSrc: "/_optimized/solution/tempCtrl/mode-overview-poster.jpg",
      title: "Temperature-controlled service in motion",
    },
  },
  whySsp: {
    eyebrow: "Why SSP For Temperature-Controlled",
    points: [
      {
        title: "Setpoint and commodity requirements are qualified before dispatch",
        body: "SSP confirms temperature range, commodity profile, loading conditions, transit expectations, and delivery requirements before equipment is assigned. That keeps cold-chain execution anchored to product reality rather than assumption.",
      },
      {
        title: "Trailer readiness and handling discipline are checked before loading",
        body: "Pre-cool expectations, trailer condition, loading sequence, and airflow-sensitive constraints are aligned before pickup. That reduces avoidable product exposure at the most vulnerable point in the move.",
      },
      {
        title: "Monitoring and exception response stay active in transit",
        body: "Temperature-controlled freight needs more than milestone updates. SSP manages the move against in-transit conditions, timing risk, and escalation requirements so recovery decisions happen inside the operating workflow.",
      },
    ],
  },
  howItWorks: {
    eyebrow: "How It Works",
    title: "Cold-chain execution is decided before the trailer is loaded.",
    description:
      "Temperature-controlled freight performs best when setpoint instructions, trailer readiness, loading method, and exception protocols are defined before pickup. This is the sequence SSP uses to protect product integrity and delivery execution.",
    steps: [
      {
        step: "01",
        title: "Define the thermal profile and lane requirements",
        body: "SSP starts with commodity sensitivity, required setpoint range, origin and destination conditions, delivery timing, and any receiver protocol that could affect product integrity.",
      },
      {
        step: "02",
        title: "Confirm equipment readiness before loading",
        body: "Trailer suitability, pre-cool expectations, loading sequence, seal requirements, and documentation controls are aligned before the shipment is tendered for pickup.",
      },
      {
        step: "03",
        title: "Run transit against setpoint and milestone control",
        body: "Once the move is underway, SSP manages temperature-sensitive freight against monitoring expectations, route timing, and the operating checkpoints that matter to the shipper and receiver.",
      },
      {
        step: "04",
        title: "Manage delivery, records, and any integrity exceptions",
        body: "Delivery confirmation, closeout documentation, and any variance or delay response stay tied to the shipment so the move finishes with accountability instead of post-event cleanup.",
      },
    ],
  },
  freightFit: {
    eyebrow: "Freight Fit Guide",
    title: "Temperature-controlled fit should be resolved before pickup.",
    description:
      "Use this guide to confirm that the shipment requires active temperature control. If the cargo only needs standard enclosure, smaller shared-capacity handling, or another operating model should lead the move, SSP should route it early.",
    guide: {
      title: "Temperature-Controlled Freight Fit Guide",
      intro:
        "Temperature-controlled service is for freight whose condition, quality, or compliance depends on maintaining a defined thermal range in transit. Use this guide to confirm fit and to identify the better SSP path when active temperature control should not lead the move.",
      diagram: "/_optimized/solution/tempCtrl/tempCtrl-Img.png",
      diagramAlt: "Temperature-controlled freight movement and reefer service overview",
      specs: {
        length: "48 ft and 53 ft reefer equipment are common planning paths",
        width: "Dock-compatible palletized freight with airflow-aware loading",
        height: "Interior clearance and product placement must preserve circulation",
        weight: "Legal payload varies by trailer specification and refrigeration unit",
        capacity: {
          label: "Planning Capacity",
          value: "Often 24-26 pallets in a 53 ft reefer, depending on product and airflow needs",
        },
      },
      rules: [
        {
          condition: "Freight that needs enclosure but not active temperature control",
          description:
            "If cargo only needs protection from weather and standard enclosed handling, paying for reefer equipment may add cost without improving the operating result.",
          recommendation: "Dry Van",
          serviceSlug: "/solutions/dry-van",
        },
        {
          condition: "Temperature-sensitive freight with tighter timing or recovery pressure",
          description:
            "If the shipment cannot absorb standard transit variability because delay itself creates product risk, a faster, urgency-led path should lead the move.",
          recommendation: "Expedited",
          serviceSlug: "/solutions/expedited",
        },
        {
          condition: "Cross-border freight where customs and border control drive the plan",
          description:
            "If customs documentation, border handoffs, or corridor-specific execution requirements dominate the shipment design, the cross-border operating structure should lead the move.",
          recommendation: "Cross-Border",
          serviceSlug: "/solutions/cross-border",
        },
        {
          condition: "Regulated cargo requiring both hazmat and thermal controls",
          description:
            "If the freight also carries hazardous materials requirements, compliance handling needs to be structured alongside the temperature-control plan rather than treated as an afterthought.",
          recommendation: "Hazmat",
          serviceSlug: "/solutions/hazmat",
        },
      ],
      disclaimer:
        "Planning guidance only. Final fit depends on commodity profile, setpoint range, trailer specification, loading pattern, lane conditions, and receiver requirements.",
    },
  },
  serviceUse: {
    eyebrow: "When To Choose Temperature-Controlled",
    title: "Choose temperature-controlled when product integrity depends on thermal control in transit.",
    description:
      "This service is the right answer when the shipment must stay within a defined temperature range, loading and delivery conditions are part of the risk profile, and execution has to be managed around cold-chain discipline instead of standard trailer protection.",
    checklistTitle: "Temperature-controlled is usually the better fit when",
    checklist: [
      "The commodity has a defined temperature range that must be maintained in transit",
      "Trailer readiness, pre-cool, or loading discipline affect product integrity",
      "Monitoring and exception response matter as much as standard shipment visibility",
      "Delivery requirements include thermal sensitivity, receiver protocols, or compliance exposure",
    ],
    steps: [
      {
        title: "Thermal Dependence",
        body: "The product can be damaged, rejected, or placed out of specification if transit temperature falls outside the required range.",
      },
      {
        title: "Equipment Readiness",
        body: "Shipment success depends on the correct reefer equipment, pre-load preparation, and loading conditions rather than trailer availability alone.",
      },
      {
        title: "Monitoring and Response",
        body: "The move requires active operating control around timing, temperature, and exception escalation because passive milestone tracking is not enough.",
      },
      {
        title: "Rerouting Threshold",
        body: "If active temperature control is no longer necessary, or another operating structure should lead the move, SSP should reroute before pickup instead of correcting it in transit.",
      },
    ],
  },
  relatedSolutions: {
    eyebrow: "Related Services",
    title: "If temperature control is not the lead requirement, move early to the right path.",
    description:
      "These are the first SSP paths to review when the shipment no longer depends on reefer execution alone or when another operating model should lead the move.",
    items: [
      {
        label: "Dry Van",
        href: "/solutions/dry-van",
        reason: "Move to dry van when the freight needs enclosed trailer protection but product integrity does not depend on active temperature control.",
      },
      {
        label: "Expedited",
        href: "/solutions/expedited",
        reason: "Move to expedited when timing risk is the dominant issue and the shipment needs faster recovery or tighter transit control.",
      },
      {
        label: "Cross-Border",
        href: "/solutions/cross-border",
        reason: "Move to cross-border when customs, border handoffs, and corridor execution need to define the plan alongside temperature-control requirements.",
      },
      {
        label: "Hazmat",
        href: "/solutions/hazmat",
        reason: "Move to hazmat when the cargo requires placarding, hazardous documentation, or regulated handling in addition to thermal control.",
      },
      {
        label: "Managed Capacity",
        href: "/solutions/managed-capacity",
        reason: "Move to managed capacity when recurring cold-chain freight needs procurement governance, routing discipline, and program-level control beyond one-off shipments.",
      },
    ],
  },
  faq: {
    eyebrow: "Temperature-Controlled FAQs",
    title: "The questions that matter before booking temperature-controlled freight.",
    description:
      "These are the qualification questions that usually determine whether reefer service is the right fit and what SSP needs to structure the shipment cleanly.",
    items: [
      {
        question: "What freight should move on temperature-controlled service?",
        answer:
          "Freight should move temperature-controlled when product quality, safety, shelf life, or compliance depends on staying within a defined thermal range during transit. Common examples include food and beverage, pharmaceuticals, and other heat- or cold-sensitive commodities.",
      },
      {
        question: "What information matters most before I request a temperature-controlled quote?",
        answer:
          "The required setpoint range, commodity description, pickup and delivery locations, timing requirements, pallet count, weight, loading conditions, and any receiver or compliance instructions matter most. Clean intake prevents equipment mismatch and avoidable cold-chain risk.",
      },
      {
        question: "Does temperature-controlled freight require more than reefer equipment?",
        answer:
          "Yes. Equipment is only one part of the operating model. Shipment quality also depends on trailer readiness, pre-load temperature discipline, loading method, monitoring expectations, and how exceptions are handled if conditions change in transit.",
      },
      {
        question: "When should temperature-controlled freight be routed to another SSP service?",
        answer:
          "It should be rerouted when active temperature control is not necessary, when the shipment needs a faster urgency-led path, when customs and border execution should lead the design, or when hazmat requirements must be planned alongside the thermal profile.",
      },
      {
        question: "Can SSP support cross-border temperature-controlled freight?",
        answer:
          "Yes. Temperature-controlled freight can be structured across Canada, the United States, and Mexico when the lane, documentation flow, and border handoffs are planned around both customs execution and product-integrity requirements.",
      },
    ],
  },
  finalCta: {
    kicker: "Confirm the operating fit",
    title: "Validate the cold-chain plan before the load moves.",
    body: "Share the commodity profile, required setpoint, lane, shipment dimensions, and delivery requirements. SSP will confirm whether temperature-controlled is the right operating model, surface integrity risks early, and structure the move for controlled execution.",
    trustSignals: [
      "Temperature-controlled execution across Canada, the United States, and Mexico",
      "Setpoint, trailer-readiness, and monitoring discipline built into the planning path",
      "Freight-fit review tied to dry van, expedited, cross-border, hazmat, and managed-capacity paths",
    ],
    proof: [
      { label: "Equipment", value: "48-53 ft" },
      { label: "Model", value: "Setpoint-led" },
      { label: "Reach", value: "CA-US-MX" },
    ],
    ctas: {
      primary: {
        label: "Request a Temperature-Controlled Quote",
        href: "/quote?service=temperature-controlled",
        ctaId: "solutions_temperature_controlled_final_request_quote",
      },
      secondary: {
        label: "Talk to the Temperature-Control Team",
        href: "/contact?topic=temperature-controlled",
        ctaId: "solutions_temperature_controlled_final_talk_team",
      },
    },
  },
};

export const HAZMAT_SOLUTION_PAGE: SolutionFamilyPageData = {
  pageType: "family",
  slug: "hazmat",
  theme: {
    accent: "#f59e0b",
    heroOverlay:
      "linear-gradient(108deg, rgba(18,12,6,0.92) 0%, rgba(46,24,8,0.84) 30%, rgba(120,53,15,0.42) 66%, rgba(245,158,11,0.18) 100%)",
    heroGlow: "radial-gradient(46%_54%_at_82%_18%,rgba(245,158,11,0.24),transparent_72%)",
  },
  meta: {
    title: "Hazmat Freight | SSP Group",
    description:
      "Hazmat freight across Canada, the United States, and Mexico with classification control, shipping-paper discipline, and compliance-led execution.",
    ogImage: "/_optimized/brand/SSPlogo.png",
  },
  hero: {
    eyebrow: "Hazmat",
    title: "Hazmat freight planned around compliance before movement.",
    description:
      "SSP structures hazmat freight around classification accuracy, packaging and marking requirements, shipping-paper readiness, placarding obligations, and lane-specific operating constraints before the shipment moves. Across Canada, the United States, and Mexico, the priority is controlled execution for regulated freight with clear accountability at every handoff.",
    descriptionMaxWidth: "49rem",
    supportingPoints: [],
    primaryCta: {
      label: "Request a Hazmat Quote",
      href: "/quote?service=hazmat",
    },
    secondaryCta: {
      label: "Talk to the Hazmat Team",
      href: "/contact?topic=hazmat",
    },
    media: {
      src: "/_optimized/solution/hazmat/hazmat-Img.png",
      alt: "Hazmat freight movement with regulated materials transport context",
    },
    mediaBrief: [
      {
        title: "Hazmat hero image",
        orientation: "landscape",
        description:
          "Premium flagship image for the hazmat page. It should feel controlled, industrial, and operationally credible, with clear regulated-freight context rather than generic trucking imagery.",
        mustShow: [
          "A regulated freight scene where industrial or hazardous cargo context is believable and professional",
          "A premium operating environment such as a plant, terminal, shipper yard, or controlled highway corridor",
          "Enough calm negative space for premium headline copy without visual clutter",
        ],
        avoid: [
          "Alarmist or sensational safety imagery",
          "Low-quality industrial photography or scenes with confused subject focus",
          "Artificial-looking effects, heavy filters, or visual clutter that weakens the premium feel",
        ],
      },
    ],
  },
  proof: [
    { value: "49 CFR-led", label: "Compliance frame" },
    { value: "Placard-ready", label: "Shipment model" },
    { value: "CA-US-MX", label: "Operating reach" },
  ],
  subnavLabel: "Hazmat page sections",
  pageSections: [
    {
      key: "mode-overview",
      label: "Mode Overview",
      summary: "What hazmat freight is and the compliance controls it depends on.",
      accent: "#0d4f78",
    },
    {
      key: "why-ssp",
      label: "Why SSP",
      summary: "The execution controls that matter when regulated freight is moving under transport rules.",
      accent: "#f59e0b",
    },
    {
      key: "freight-fit",
      label: "Freight Fit Guide",
      summary: "How to confirm hazmat and when another SSP path should lead the move.",
      accent: "#10a7d8",
    },
    {
      key: "how-it-works",
      label: "How It Works",
      summary: "The operating sequence SSP uses to structure a hazmat shipment.",
      accent: "#d71920",
    },
    {
      key: "how-to-use",
      label: "When To Choose",
      summary: "The shipment conditions that make hazmat the correct operating answer.",
      accent: "#b37a20",
    },
    {
      key: "related",
      label: "Related Services",
      summary: "Where SSP routes the shipper when hazmat should not be the lead structure by itself.",
      accent: "#0d4f78",
    },
    {
      key: "faq",
      label: "FAQ",
      summary: "The qualification questions that matter before booking hazmat freight.",
      accent: "#f59e0b",
    },
  ],
  modeOverview: {
    eyebrow: "Mode Overview",
    title: "Hazmat freight is built around compliance before pickup.",
    description:
      "This mode is used when the material is regulated for transportation and the shipment has to move with the correct classification, packaging, hazard communication, documentation, and operating controls. Equipment matters, but the real operating discipline sits in getting the shipment legally and operationally ready before pickup.",
    video: {
      src: "/_optimized/solution/hazmat/commericalVideo.mp4",
      posterSrc: "/_optimized/solution/hazmat/mode-overview-poster.jpg",
      title: "Hazmat service in motion",
    },
  },
  whySsp: {
    eyebrow: "Why SSP For Hazmat",
    points: [
      {
        title: "Classification and documentation are checked before dispatch",
        body: "SSP starts with the shipment data that actually controls the move: proper shipping name, UN or ID number, hazard class, packing group, packaging profile, and required shipping-paper inputs. That reduces avoidable compliance exposure before the load is tendered.",
      },
      {
        title: "Lane, equipment, and handoff requirements are aligned early",
        body: "Placarding needs, equipment fit, route constraints, segregation issues, and shipper or receiver site conditions are reviewed before capacity is assigned. Regulated freight performs better when those decisions are made before pickup day.",
      },
      {
        title: "Exceptions stay inside a controlled operating workflow",
        body: "Hazmat execution breaks down when delays, documentation gaps, or handoff failures are handled informally. SSP manages milestone communication and escalation inside the move so regulated freight stays accountable from pickup through closeout.",
      },
    ],
  },
  howItWorks: {
    eyebrow: "How It Works",
    title: "Hazmat execution is decided before the shipment is released to move.",
    description:
      "Hazmat freight performs best when classification, packaging, shipping papers, and lane controls are resolved before dispatch. This is the sequence SSP uses to keep regulated freight compliant and operationally controlled.",
    steps: [
      {
        step: "01",
        title: "Define the regulatory shipment profile",
        body: "SSP starts with the proper shipping name, UN or ID number, hazard class, packing group, commodity details, and any route or site requirement that affects how the freight can legally move.",
      },
      {
        step: "02",
        title: "Confirm packaging, marking, and document readiness",
        body: "Packaging configuration, labels and markings, shipping-paper inputs, emergency-response information, and placarding obligations are reviewed before the shipment is released for pickup.",
      },
      {
        step: "03",
        title: "Assign the right equipment and operating path",
        body: "Once the load is qualified, SSP aligns equipment, lane structure, and milestone ownership to the compliance profile so the move is not left to assumptions at handoff points.",
      },
      {
        step: "04",
        title: "Manage transit, delivery, and exception closeout",
        body: "In-transit issues, receiver problems, documentation variances, and proof-of-delivery closeout stay inside one operating workflow with communication tied to the regulated shipment.",
      },
    ],
  },
  freightFit: {
    eyebrow: "Freight Fit Guide",
    title: "Hazmat fit should be confirmed before the load is offered for transport.",
    description:
      "Use this guide to confirm that the shipment belongs in a hazmat operating path. If the freight is not regulated for transport, or another service requirement needs to lead the move, SSP should route it early.",
    guide: {
      title: "Hazmat Freight Fit Guide",
      intro:
        "Hazmat service is for freight regulated in transportation under the applicable hazardous materials rules. Use this guide to confirm fit and to identify the better SSP path when the move should be structured around another requirement.",
      diagram: "/_optimized/solution/hazmat/hazmat-Img.png",
      diagramAlt: "Hazmat freight movement and compliance-controlled service overview",
      specs: {
        length: "Equipment path depends on the regulated material and operating requirement",
        width: "Standard dock and loading assumptions apply only when packaging and segregation permit",
        height: "Shipment fit depends on packaging profile, equipment, and legal handling controls",
        weight: "Legal payload depends on equipment path, package configuration, and route conditions",
      },
      rules: [
        {
          condition: "Freight that is not regulated as hazardous in transport",
          description:
            "If the shipment does not require hazardous materials handling under transport rules, a standard equipment or service path is usually cleaner and more economical.",
          recommendation: "Dry Van",
          serviceSlug: "/solutions/dry-van",
        },
        {
          condition: "Regulated freight that also requires active temperature control",
          description:
            "If product integrity depends on both compliance handling and a maintained temperature range, the shipment should be structured around thermal control as well as hazardous materials requirements.",
          recommendation: "Temperature-Controlled",
          serviceSlug: "/solutions/temperature-controlled",
        },
        {
          condition: "Hazmat freight where customs and border execution define the move",
          description:
            "If cross-border documentation, customs sequencing, and corridor management are the dominant operating challenge, the shipment should be led through the appropriate border structure.",
          recommendation: "Cross-Border",
          serviceSlug: "/solutions/cross-border",
        },
        {
          condition: "Oversized or open-deck regulated freight",
          description:
            "If the cargo also requires open-deck access, dimensional planning, or specialized loading, the hazmat plan needs to be integrated with the correct equipment path before the move is committed.",
          recommendation: "Flatbed",
          serviceSlug: "/solutions/flatbed",
        },
      ],
      disclaimer:
        "Planning guidance only. Final fit depends on the material classification, packaging method, quantity, route, site constraints, and applicable regulatory requirements.",
    },
  },
  serviceUse: {
    eyebrow: "When To Choose Hazmat",
    title: "Choose hazmat when regulated transport requirements control how the shipment has to move.",
    description:
      "Hazmat is the right answer when the material is regulated in transportation and the move has to be structured around compliant classification, packaging, hazard communication, and documented handoffs rather than standard freight assumptions.",
    checklistTitle: "Hazmat is usually the better fit when",
    checklist: [
      "The material is regulated for transport and requires hazmat classification controls",
      "Shipping papers, markings, labels, placards, or emergency-response information are required",
      "Lane planning has to account for regulatory, site, or handling restrictions",
      "Execution quality depends on compliance discipline as much as standard transit performance",
    ],
    steps: [
      {
        title: "Regulatory Dependence",
        body: "The shipment cannot move legally or safely without the correct transport classification, documentation, and hazard communication.",
      },
      {
        title: "Packaging and Communication Discipline",
        body: "Shipment success depends on compliant packaging, markings, labels, and shipping-paper readiness before pickup rather than after-the-fact correction.",
      },
      {
        title: "Controlled Handoffs",
        body: "The move requires disciplined coordination across shipper, carrier, and receiver touchpoints because documentation or site failures can stop the shipment.",
      },
      {
        title: "Rerouting Threshold",
        body: "If the freight is not regulated as hazardous in transport, or another operating model such as temperature control or cross-border execution should lead the move, SSP should reroute early.",
      },
    ],
  },
  relatedSolutions: {
    eyebrow: "Related Services",
    title: "If hazmat is not the only requirement, structure the move around the right lead path.",
    description:
      "These are the first SSP paths to review when the shipment needs more than standard hazmat execution or when another operating model should lead the move.",
    items: [
      {
        label: "Dry Van",
        href: "/solutions/dry-van",
        reason: "Move to dry van when the freight needs standard enclosed transport but is not regulated as hazardous in transportation.",
      },
      {
        label: "Temperature-Controlled",
        href: "/solutions/temperature-controlled",
        reason: "Move to temperature-controlled when the regulated cargo also depends on a maintained thermal range in transit.",
      },
      {
        label: "Cross-Border",
        href: "/solutions/cross-border",
        reason: "Move to cross-border when customs, border handoffs, and corridor execution need to define the move alongside compliance requirements.",
      },
      {
        label: "Flatbed",
        href: "/solutions/flatbed",
        reason: "Move to flatbed when the regulated freight also requires open-deck access, crane loading, or dimensional equipment planning.",
      },
      {
        label: "Managed Capacity",
        href: "/solutions/managed-capacity",
        reason: "Move to managed capacity when recurring regulated freight needs procurement governance, routing discipline, and program-level control beyond one-off shipments.",
      },
    ],
  },
  faq: {
    eyebrow: "Hazmat FAQs",
    title: "The questions that matter before booking hazmat freight.",
    description:
      "These are the qualification questions that usually determine whether hazmat is the right operating path and what SSP needs to structure the shipment cleanly.",
    items: [
      {
        question: "What makes a shipment hazmat in transportation?",
        answer:
          "A shipment is hazmat when the material is regulated for transportation under the applicable hazardous materials rules and must move with the correct classification, packaging, hazard communication, and shipping documentation. The transport status depends on the material offered for shipment, not just the commodity name used internally.",
      },
      {
        question: "What information matters most before I request a hazmat quote?",
        answer:
          "The proper shipping name, UN or ID number, hazard class or division, packing group if applicable, packaging method, quantity, origin and destination, and any site, placarding, or emergency-response requirements matter most. Clean regulatory inputs reduce avoidable delays and compliance risk.",
      },
      {
        question: "Does hazmat freight require more than compliant paperwork?",
        answer:
          "Yes. Paperwork is only one part of the move. Shipment success also depends on correct packaging, labels and markings, placarding decisions, lane planning, equipment fit, and disciplined handoffs at pickup and delivery.",
      },
      {
        question: "When should hazmat freight be routed to another SSP service?",
        answer:
          "It should be rerouted when the freight is not regulated as hazardous in transport, when active temperature control should lead the move, when customs and border execution are the dominant operating challenge, or when the cargo requires a different equipment path such as flatbed.",
      },
      {
        question: "Can SSP support cross-border hazmat freight?",
        answer:
          "Yes. Hazmat freight can be structured across Canada, the United States, and Mexico when the shipment is planned around the applicable documentation, corridor, and handoff requirements before pickup.",
      },
    ],
  },
  finalCta: {
    kicker: "Confirm the compliance fit",
    title: "Validate the hazmat plan before the shipment moves.",
    body: "Share the proper shipping name, UN or ID number, hazard class, packaging profile, lane, and delivery requirements. SSP will confirm whether hazmat is the right operating path, surface compliance risks early, and structure the move for controlled execution.",
    trustSignals: [
      "Hazmat execution across Canada, the United States, and Mexico",
      "Classification, documentation, and placarding discipline built into the planning path",
      "Freight-fit review tied to dry van, temperature-controlled, cross-border, flatbed, and managed-capacity paths",
    ],
    proof: [
      { label: "Compliance frame", value: "49 CFR-led" },
      { label: "Shipment model", value: "Placard-ready" },
      { label: "Reach", value: "CA-US-MX" },
    ],
    ctas: {
      primary: {
        label: "Request a Hazmat Quote",
        href: "/quote?service=hazmat",
        ctaId: "solutions_hazmat_final_request_quote",
      },
      secondary: {
        label: "Talk to the Hazmat Team",
        href: "/contact?topic=hazmat",
        ctaId: "solutions_hazmat_final_talk_team",
      },
    },
  },
};

export const EXPEDITED_SOLUTION_PAGE: SolutionFamilyPageData = {
  pageType: "family",
  slug: "expedited",
  theme: {
    accent: "#ef4444",
    heroOverlay:
      "linear-gradient(108deg, rgba(24,8,8,0.92) 0%, rgba(58,16,16,0.84) 28%, rgba(127,29,29,0.44) 64%, rgba(239,68,68,0.18) 100%)",
    heroGlow: "radial-gradient(46%_54%_at_82%_18%,rgba(239,68,68,0.24),transparent_72%)",
  },
  meta: {
    title: "Expedited Freight | SSP Group",
    description:
      "Expedited freight across Canada, the United States, and Mexico with priority dispatch, recovery speed, and controlled execution for time-critical shipments.",
    ogImage: "/_optimized/brand/SSPlogo.png",
  },
  hero: {
    eyebrow: "Expedited",
    title: "Expedited freight planned around urgency before pickup.",
    description:
      "SSP structures expedited freight around ready time, hard delivery windows, route realism, equipment fit, and escalation requirements before the shipment moves. Across Canada, the United States, and Mexico, the objective is faster recovery and tighter execution when timing carries real business consequence.",
    descriptionMaxWidth: "49rem",
    supportingPoints: [],
    primaryCta: {
      label: "Request an Expedited Quote",
      href: "/quote?service=expedited-specialized&mode=expedited",
    },
    secondaryCta: {
      label: "Talk to the Expedited Team",
      href: "/contact?topic=expedited-specialized&mode=expedited",
    },
    media: {
      src: "/_optimized/solution/expedited/expedited-Img.png",
      alt: "Expedited freight moving on a time-critical North American lane",
    },
    mediaBrief: [
      {
        title: "Expedited hero image",
        orientation: "landscape",
        description:
          "Premium flagship image for the expedited page. It should feel urgent, controlled, and operationally real rather than dramatic or chaotic.",
        mustShow: [
          "A premium freight scene that clearly suggests time-critical execution",
          "Equipment in motion or a controlled operating environment with strong subject focus",
          "Enough calm space for premium hero copy without looking static or lifeless",
        ],
        avoid: [
          "Overly dramatic speed effects or action-heavy imagery that feels promotional",
          "Generic truck shots with no urgency signal or operational context",
          "Low-resolution, outdated, or artificial-looking imagery",
        ],
      },
    ],
  },
  proof: [
    { value: "Priority-led", label: "Operating model" },
    { value: "Time-critical", label: "Shipment profile" },
    { value: "CA-US-MX", label: "Operating reach" },
  ],
  subnavLabel: "Expedited page sections",
  pageSections: [
    {
      key: "mode-overview",
      label: "Mode Overview",
      summary: "What expedited freight is and the operating controls it depends on.",
      accent: "#0d4f78",
    },
    {
      key: "why-ssp",
      label: "Why SSP",
      summary: "The execution controls that matter once timing becomes the main risk.",
      accent: "#ef4444",
    },
    {
      key: "freight-fit",
      label: "Freight Fit Guide",
      summary: "How to confirm expedited and when another SSP path should lead the move.",
      accent: "#10a7d8",
    },
    {
      key: "how-it-works",
      label: "How It Works",
      summary: "The operating sequence SSP uses to structure an expedited shipment.",
      accent: "#d71920",
    },
    {
      key: "how-to-use",
      label: "When To Choose",
      summary: "The shipment conditions that make expedited the correct operating answer.",
      accent: "#b37a20",
    },
    {
      key: "related",
      label: "Related Services",
      summary: "Where SSP routes the shipper when urgency is not the only requirement or should not lead the move alone.",
      accent: "#0d4f78",
    },
    {
      key: "faq",
      label: "FAQ",
      summary: "The qualification questions that matter before booking expedited freight.",
      accent: "#ef4444",
    },
  ],
  modeOverview: {
    eyebrow: "Mode Overview",
    title: "Expedited freight is an urgency-led operating model.",
    description:
      "This mode is used when delivery timing affects production continuity, customer commitments, or shipment recovery and the move has to be built around faster response, directness, and disciplined communication. Speed matters, but execution quality still depends on clean intake, realistic routing, and active exception control.",
    video: {
      src: "/_optimized/solution/expedited/commericalVideo.mp4",
      posterSrc: "/_optimized/solution/expedited/mode-overview-poster.jpg",
      title: "Expedited service in motion",
    },
  },
  whySsp: {
    eyebrow: "Why SSP For Expedited",
    points: [
      {
        title: "Urgency is qualified before capacity is assigned",
        body: "SSP starts with the actual timing risk: ready time, hard delivery window, latest acceptable arrival, commodity profile, and lane reality. That keeps expedited from being booked on urgency language alone.",
      },
      {
        title: "Execution is built around route realism and recovery speed",
        body: "Priority freight performs best when route assumptions, handoff timing, and equipment fit are aligned early. SSP structures the move around what the shipment can realistically achieve, not what the quote promises in theory.",
      },
      {
        title: "Communication stays tied to decision points in the move",
        body: "Expedited freight needs more than generic visibility. SSP communicates against milestones, delays, and recovery actions so the shipper can make decisions while the shipment is still in motion.",
      },
    ],
  },
  howItWorks: {
    eyebrow: "How It Works",
    title: "Expedited execution is decided before the shipment starts moving.",
    description:
      "Expedited freight performs best when timing requirements, equipment fit, route viability, and recovery thresholds are defined before dispatch. This is the sequence SSP uses to protect urgency without losing control of execution.",
    steps: [
      {
        step: "01",
        title: "Define the timing requirement and shipment profile",
        body: "SSP starts with ready time, hard delivery commitment, lane, dimensions, weight, commodity, and the business consequence of delay so the move is qualified against the real operating need.",
      },
      {
        step: "02",
        title: "Confirm the right equipment and route path",
        body: "Transit options, route realism, loading conditions, team or priority requirements, and any site constraints are aligned before the shipment is dispatched.",
      },
      {
        step: "03",
        title: "Run the move against milestone and recovery control",
        body: "Once the load is in motion, SSP manages the shipment against timing-critical milestones with communication tied to route progress, delivery risk, and any needed recovery actions.",
      },
      {
        step: "04",
        title: "Close delivery without losing accountability",
        body: "Delivery confirmation, proof-of-delivery closeout, and any exception follow-through stay connected to the shipment so urgency does not create administrative drift at the end of the move.",
      },
    ],
  },
  freightFit: {
    eyebrow: "Freight Fit Guide",
    title: "Expedited fit should be confirmed before the move is committed.",
    description:
      "Use this guide to confirm that the shipment truly belongs in an expedited operating path. If urgency is not the lead requirement, or another service needs to define the move, SSP should route it early.",
    guide: {
      title: "Expedited Freight Fit Guide",
      intro:
        "Expedited service is for shipments where timing directly affects production, service continuity, customer commitments, or recovery. Use this guide to confirm fit and to identify the better SSP path when urgency should not lead the move.",
      diagram: "/_optimized/solution/expedited/expedited-Img.png",
      diagramAlt: "Expedited freight movement and priority execution overview",
      specs: {
        length: "Equipment path depends on load profile and timing requirement",
        width: "Standard dockable freight unless the shipment requires specialized equipment",
        height: "Equipment selection depends on cargo profile and route constraints",
        weight: "Legal payload varies by equipment path and service design",
      },
      rules: [
        {
          condition: "Freight where dedicated capacity matters more than urgency",
          description:
            "If the shipment needs direct trailer control but timing does not justify a priority-first operating model, a standard truckload path is usually cleaner.",
          recommendation: "Truckload",
          serviceSlug: "/solutions/truckload",
        },
        {
          condition: "Smaller shipments that can move in shared capacity without deadline risk",
          description:
            "If the freight can absorb standard network timing and does not justify exclusive urgent capacity, pooled LTL service may be the better economic answer.",
          recommendation: "LTL",
          serviceSlug: "/solutions/ltl",
        },
        {
          condition: "Freight requiring active temperature control during transit",
          description:
            "If product integrity depends on a maintained temperature range as well as timing, the move should be structured around cold-chain controls instead of urgency alone.",
          recommendation: "Temperature-Controlled",
          serviceSlug: "/solutions/temperature-controlled",
        },
        {
          condition: "Cross-border freight where customs and corridor execution define the move",
          description:
            "If customs sequencing, border handoffs, or corridor-specific planning dominate the shipment design, the cross-border operating structure should lead the move.",
          recommendation: "Cross-Border",
          serviceSlug: "/solutions/cross-border",
        },
      ],
      disclaimer:
        "Planning guidance only. Final fit depends on lane reality, ready time, equipment availability, shipment profile, and the actual delivery commitment.",
    },
  },
  serviceUse: {
    eyebrow: "When To Choose Expedited",
    title: "Choose expedited when timing risk outweighs standard freight economics.",
    description:
      "Expedited is the right answer when a missed delivery has real operational cost and the shipment has to move under a tighter timeline, faster recovery expectation, or higher consequence-of-delay threshold than standard service can support.",
    checklistTitle: "Expedited is usually the better fit when",
    checklist: [
      "The shipment has a hard delivery window or a narrow recovery tolerance",
      "A production stop, service failure, or customer commitment depends on faster execution",
      "The lane needs direct operating control and active milestone communication",
      "The cost of delay is materially higher than the premium for urgency-led service",
    ],
    steps: [
      {
        title: "Business Consequence",
        body: "Delay creates a production, service, customer, or revenue impact that standard freight timing cannot absorb.",
      },
      {
        title: "Route Urgency",
        body: "The shipment needs a tighter route plan, shorter recovery window, or more direct operating path than standard truckload or LTL would normally provide.",
      },
      {
        title: "Active Control",
        body: "The move requires milestone-led communication and active exception handling because passive tracking is not enough for the operating risk.",
      },
      {
        title: "Rerouting Threshold",
        body: "If urgency is not the lead requirement, or another service such as cross-border or temperature-controlled should define the move, SSP should reroute before pickup.",
      },
    ],
  },
  relatedSolutions: {
    eyebrow: "Related Services",
    title: "If urgency is not the only issue, lead with the right service path.",
    description:
      "These are the first SSP paths to review when expedited should not be the only operating model shaping the shipment.",
    items: [
      {
        label: "Truckload",
        href: "/solutions/truckload",
        reason: "Move to truckload when the freight needs dedicated trailer control but does not require a priority-first operating path.",
      },
      {
        label: "LTL",
        href: "/solutions/ltl",
        reason: "Move to LTL when the shipment is smaller, can absorb network timing, and does not justify exclusive urgent capacity.",
      },
      {
        label: "Temperature-Controlled",
        href: "/solutions/temperature-controlled",
        reason: "Move to temperature-controlled when product integrity depends on thermal control in addition to timing sensitivity.",
      },
      {
        label: "Cross-Border",
        href: "/solutions/cross-border",
        reason: "Move to cross-border when customs, border handoffs, and corridor execution need to lead the move alongside urgency.",
      },
      {
        label: "Managed Capacity",
        href: "/solutions/managed-capacity",
        reason: "Move to managed capacity when recurring urgent shipments need procurement governance, lane discipline, and program-level control beyond one-off recoveries.",
      },
    ],
  },
  faq: {
    eyebrow: "Expedited FAQs",
    title: "The questions that matter before booking expedited freight.",
    description:
      "These are the qualification questions that usually determine whether expedited is the right operating path and what SSP needs to structure the shipment cleanly.",
    items: [
      {
        question: "What makes a shipment a fit for expedited service?",
        answer:
          "A shipment fits expedited when timing directly affects production continuity, customer commitments, project execution, or service recovery and standard freight timing cannot absorb the risk. The real qualifier is the consequence of delay, not just the request for faster transit.",
      },
      {
        question: "What information matters most before I request an expedited quote?",
        answer:
          "Ready time, hard delivery deadline, latest acceptable arrival, origin and destination, dimensions, total weight, commodity description, loading conditions, and any site constraints matter most. Clean timing inputs are what make the expedited plan credible.",
      },
      {
        question: "Does expedited freight always mean the fastest possible mode?",
        answer:
          "No. It means the shipment is structured around urgency and recovery speed, but the right operating answer still depends on lane, cargo profile, equipment fit, and delivery requirement. The correct expedited plan is the fastest viable path, not the most dramatic one.",
      },
      {
        question: "When should expedited freight be routed to another SSP service?",
        answer:
          "It should be rerouted when timing is not the lead requirement, when the shipment can move in standard truckload or LTL without meaningful business risk, when temperature control should lead the move, or when cross-border execution needs to define the operating structure.",
      },
      {
        question: "Can SSP support cross-border expedited freight?",
        answer:
          "Yes. Expedited freight can be structured across Canada, the United States, and Mexico when the lane, timing requirement, customs sequence, and border handoffs are planned together before pickup.",
      },
    ],
  },
  finalCta: {
    kicker: "Confirm the urgency fit",
    title: "Validate the expedited plan before the shipment moves.",
    body: "Share the ready time, delivery commitment, lane, commodity, dimensions, and shipment weight. SSP will confirm whether expedited is the right operating path, test route realism early, and structure the move for controlled execution.",
    trustSignals: [
      "Expedited execution across Canada, the United States, and Mexico",
      "Ready-time, route, and milestone discipline built into the planning path",
      "Freight-fit review tied to truckload, LTL, temperature-controlled, cross-border, and managed-capacity paths",
    ],
    proof: [
      { label: "Model", value: "Priority-led" },
      { label: "Profile", value: "Time-critical" },
      { label: "Reach", value: "CA-US-MX" },
    ],
    ctas: {
      primary: {
        label: "Request an Expedited Quote",
        href: "/quote?service=expedited-specialized&mode=expedited",
        ctaId: "solutions_expedited_final_request_quote",
      },
      secondary: {
        label: "Talk to the Expedited Team",
        href: "/contact?topic=expedited-specialized&mode=expedited",
        ctaId: "solutions_expedited_final_talk_team",
      },
    },
  },
};

export const SPECIALIZED_VEHICLES_SOLUTION_PAGE: SolutionFamilyPageData = {
  pageType: "family",
  slug: "specialized-vehicles",
  theme: {
    accent: "#7c3aed",
    heroOverlay:
      "linear-gradient(108deg, rgba(10,12,24,0.94) 0%, rgba(20,18,42,0.86) 30%, rgba(38,30,72,0.34) 66%, rgba(124,58,237,0.12) 100%)",
    heroGlow: "radial-gradient(46%_54%_at_82%_18%,rgba(124,58,237,0.14),transparent_72%)",
  },
  meta: {
    title: "Specialized Vehicle Transport | SSP Group",
    description:
      "Specialized vehicle transport across Canada, the United States, and Mexico with condition-controlled handling, route screening, and accountable delivery execution.",
    ogImage: "/_optimized/brand/SSPlogo.png",
  },
  hero: {
    eyebrow: "Specialized Vehicles Transport",
    title: "Specialized vehicle transport built around condition, fit, and route control.",
    description:
      "SSP structures specialized vehicle transport around unit profile, enclosed equipment fit, route feasibility, handling requirements, and condition accountability before the move begins. Across Canada, the United States, and Mexico, this is the operating path for exotic vehicles, collector units, premium assets, and non-standard rolling cargo that cannot be left to generic transport assumptions.",
    descriptionMaxWidth: "51rem",
    supportingPoints: [],
    primaryCta: {
      label: "Request a Specialized Vehicle Quote",
      href: "/quote?service=expedited-specialized&mode=specialized-vehicles",
    },
    secondaryCta: {
      label: "Talk to the Specialized Vehicle Team",
      href: "/contact?topic=expedited-specialized&mode=specialized-vehicles",
    },
    media: {
      src: "/_optimized/solution/specializedVehicleTransport/svtHero-Img.png",
      alt: "Specialized enclosed vehicle transport on a North American route",
    },
    mediaBrief: [
      {
        title: "Specialized vehicle hero image",
        orientation: "landscape",
        description:
          "Premium flagship image for specialized vehicle transport. It should feel controlled, high-trust, and operationally real, with premium-asset handling clearly implied.",
        mustShow: [
          "Specialized or enclosed vehicle transport context that is visually clear",
          "A premium unit or controlled loading scene with obvious condition-sensitive handling",
          "Clean negative space that supports premium headline copy without clutter",
        ],
        avoid: [
          "Generic car-carrier imagery with no premium-asset or controlled-handling signal",
          "Chaotic lot scenes or busy staging that undermine the quality standard",
          "Low-resolution, dated, or artificial-looking imagery",
        ],
      },
    ],
  },
  proof: [
    { value: "Condition-led", label: "Operating model" },
    { value: "Enclosed / specialty", label: "Equipment path" },
    { value: "CA-US-MX", label: "Operating reach" },
  ],
  subnavLabel: "Specialized vehicles page sections",
  pageSections: [
    {
      key: "mode-overview",
      label: "Mode Overview",
      summary: "What specialized vehicle transport is and the operating controls it depends on.",
      accent: "#0d4f78",
    },
    {
      key: "why-ssp",
      label: "Why SSP",
      summary: "The execution controls that matter once asset condition and handling precision lead the move.",
      accent: "#7c3aed",
    },
    {
      key: "freight-fit",
      label: "Freight Fit Guide",
      summary: "How to confirm specialized vehicle transport and when another SSP path should lead the move.",
      accent: "#10a7d8",
    },
    {
      key: "how-it-works",
      label: "How It Works",
      summary: "The operating sequence SSP uses to structure a specialized vehicle move.",
      accent: "#d71920",
    },
    {
      key: "related",
      label: "Related Services",
      summary: "Where SSP routes the shipper when specialized handling is not the only issue or should not lead the move alone.",
      accent: "#b37a20",
    },
    {
      key: "faq",
      label: "FAQ",
      summary: "The qualification questions that matter before booking specialized vehicle transport.",
      accent: "#7c3aed",
    },
  ],
  modeOverview: {
    eyebrow: "Mode Overview",
    title: "Specialized vehicle transport is built around condition accountability.",
    description:
      "This mode is used when vehicle condition, handling sequence, route feasibility, or premium-asset exposure need to be resolved before dispatch. Enclosed equipment matters, but so do clearance checks, ramp angle, custody points, and delivery-site realism before the unit ever moves.",
    video: {
      src: "/_optimized/solution/specializedVehicleTransport/commericalVideo.mp4",
      posterSrc: "/_optimized/solution/specializedVehicleTransport/mode-overview-poster.jpg",
      title: "Specialized vehicle transport in motion",
    },
  },
  whySsp: {
    eyebrow: "Why SSP For Specialized Vehicle Transport",
    points: [
      {
        title: "Equipment fit and handling standards are resolved before dispatch",
        body: "SSP reviews unit dimensions, ride height, securement approach, loading method, and condition sensitivity before capacity is assigned, so the move starts with the right enclosed or specialty path instead of generic assumptions.",
      },
      {
        title: "Route and site feasibility are checked early",
        body: "Clearance, grade, turning radius, access limitations, appointment timing, and delivery conditions are aligned before pickup so the shipment does not lose control at the most sensitive handoff points.",
      },
      {
        title: "Condition accountability stays attached to the move",
        body: "Pickup condition, milestone communication, delivery confirmation, and any exception follow-through remain tied to the shipment from origin through closeout rather than being treated as post-event administration.",
      },
    ],
  },
  howItWorks: {
    eyebrow: "How It Works",
    title: "Specialized vehicle transport should be qualified before loading.",
    description:
      "Specialized vehicle moves perform best when equipment fit, route reality, site conditions, and condition-accountability standards are aligned before dispatch. This is the sequence SSP uses to structure the move.",
    steps: [
      {
        step: "01",
        title: "Confirm unit profile and handling requirement",
        body: "Vehicle dimensions, ride height, special handling notes, loading method, origin and destination conditions, and condition expectations are reviewed first so the move is qualified against the real operating need.",
      },
      {
        step: "02",
        title: "Match the right equipment and route path",
        body: "Enclosed equipment fit, securement method, route feasibility, access constraints, and delivery timing are aligned before the shipment is dispatched.",
      },
      {
        step: "03",
        title: "Run the move against milestone and custody control",
        body: "Once the shipment is in motion, SSP manages the move against pickup, transit, and delivery milestones with communication tied to the checkpoints that matter for premium-asset handling.",
      },
      {
        step: "04",
        title: "Close delivery with documented handoff discipline",
        body: "Delivery confirmation, condition-aware closeout, and any exception follow-through stay connected to the shipment so accountability does not fall away at the end of the move.",
      },
    ],
  },
  freightFit: {
    eyebrow: "Freight Fit Guide",
    title: "Specialized vehicle fit should be confirmed before capacity is committed.",
    description:
      "Use this guide to confirm that the shipment truly needs condition-controlled vehicle handling, specialized equipment fit, or route-screened execution. If another service should define the move, SSP should route it early.",
    guide: {
      title: "Specialized Vehicle Transport Freight Fit Guide",
      intro:
        "Specialized vehicle transport is for exotic vehicles, collector units, premium rolling assets, and non-standard vehicle moves where condition integrity, enclosed handling, and route feasibility are non-negotiable. Use this guide to confirm fit and identify the better SSP path when another operating model should lead the move.",
      diagram: "/_optimized/solution/specializedVehicleTransport/svtHero-Img.png",
      diagramAlt: "Specialized vehicle transport overview",
      specs: {
        length: "Equipment path depends on unit profile, ride height, and loading method",
        width: "Standard enclosed width unless the unit profile requires another equipment plan",
        height: "Interior clearance, ramp angle, and roof clearance must be validated before commitment",
        weight: "Per unit or load; equipment and securement are matched to the actual vehicle profile",
      },
      rules: [
        {
          condition: "Standard freight or vehicle moves that fit conventional truckload equipment",
          description:
            "If the shipment does not require premium-asset handling, enclosed specialty equipment, or route-screened execution, a standard truckload path is usually cleaner.",
          recommendation: "Truckload",
          serviceSlug: "/solutions/truckload",
        },
        {
          condition: "Oversized, overweight, or permit-required vehicle or equipment moves",
          description:
            "If the unit exceeds standard legal dimensions, needs lower loading geometry, or requires permit-led route control, specialized vehicle transport is no longer the lead answer.",
          recommendation: "RGN / Heavy Haul",
          serviceSlug: "/solutions/rgn-heavy-haul",
        },
        {
          condition: "Shipments where urgency matters more than premium-asset handling",
          description:
            "If the move is being driven mainly by a hard deadline or recovery window rather than enclosed condition control, an expedited operating path may be the better fit.",
          recommendation: "Expedited",
          serviceSlug: "/solutions/expedited",
        },
        {
          condition: "Recurring premium-asset lanes that need program governance",
          description:
            "If the move is part of an ongoing vehicle flow with recurring requirements, the shipment may need a more structured program design than one-off dispatch execution.",
          recommendation: "Dedicated / Contract",
          serviceSlug: "/solutions/dedicated-contract",
        },
      ],
      disclaimer:
        "Planning guidance only. Final fit depends on vehicle profile, access conditions, route feasibility, equipment availability, and the exact handling standard required.",
    },
  },
  relatedSolutions: {
    eyebrow: "Related Services",
    title: "If specialized vehicle transport is not the only requirement, lead with the right path.",
    description:
      "These are the first SSP paths to review when specialized vehicle handling should not be the only operating model shaping the move.",
    items: [
      {
        label: "Truckload",
        href: "/solutions/truckload",
        reason: "Move to truckload when the unit or cargo fits standard dedicated equipment and does not require premium enclosed handling controls.",
      },
      {
        label: "Expedited",
        href: "/solutions/expedited",
        reason: "Move to expedited when timing risk is the dominant issue and the move has to be structured around faster recovery and tighter milestones.",
      },
      {
        label: "RGN / Heavy Haul",
        href: "/solutions/rgn-heavy-haul",
        reason: "Move to RGN or heavy haul when the shipment needs permit-led planning, lower loading geometry, or specialized oversized handling.",
      },
      {
        label: "Managed Capacity",
        href: "/solutions/managed-capacity",
        reason: "Move to managed capacity when recurring specialized moves require procurement governance, lane discipline, and program-level control across ongoing volume.",
      },
      {
        label: "Dedicated / Contract",
        href: "/solutions/dedicated-contract",
        reason: "Move to dedicated or contract when the operating model needs committed capacity, repeatable SOPs, and a more permanent service structure around recurring vehicle programs.",
      },
    ],
  },
  faq: {
    eyebrow: "Specialized Vehicle FAQs",
    title: "The questions that matter before booking specialized vehicle transport.",
    description:
      "These are the qualification questions that usually determine whether specialized vehicle transport is the right operating path and what SSP needs to structure the move cleanly.",
    items: [
      {
        question: "What qualifies as a specialized vehicle transport move?",
        answer:
          "It qualifies when the unit needs enclosed handling, condition-accountable execution, non-standard loading planning, or route screening that standard vehicle or truckload assumptions cannot support cleanly. The real qualifier is handling risk and operating sensitivity, not just the fact that it is a vehicle.",
      },
      {
        question: "What information matters most before I request a quote?",
        answer:
          "Vehicle dimensions, ride height, weight, pickup and delivery locations, loading method, access constraints, condition requirements, and timing expectations matter most. Clean equipment-fit and route inputs are what make the plan credible.",
      },
      {
        question: "Does specialized vehicle transport always mean enclosed equipment?",
        answer:
          "Not always, but it often does when condition integrity is the priority. The right answer depends on the unit profile, exposure risk, handling method, and route conditions that need to be controlled before dispatch.",
      },
      {
        question: "When should a specialized vehicle move be routed to another SSP service?",
        answer:
          "It should be rerouted when the unit fits standard truckload equipment, when urgency rather than handling sensitivity defines the move, when the shipment becomes permit-led heavy haul, or when recurring volume calls for a more programmatic managed-capacity or dedicated model.",
      },
      {
        question: "Can SSP support cross-border specialized vehicle transport?",
        answer:
          "Yes. Specialized vehicle moves can be structured across Canada, the United States, and Mexico when route feasibility, border sequence, documentation, and handling controls are aligned before pickup.",
      },
    ],
  },
  finalCta: {
    kicker: "Confirm the handling fit",
    title: "Validate the specialized vehicle plan before the unit moves.",
    body: "Share the unit profile, origin and destination, dimensions, weight, handling requirements, and timing expectations. SSP will confirm whether specialized vehicle transport is the right operating path, test equipment and route fit early, and structure the move for controlled execution.",
    trustSignals: [
      "Specialized vehicle transport across Canada, the United States, and Mexico",
      "Equipment-fit, route, and custody discipline built into the planning path",
      "Freight-fit review tied to truckload, expedited, heavy haul, and program-level service paths",
    ],
    proof: [
      { label: "Model", value: "Condition-led" },
      { label: "Path", value: "Enclosed / specialty" },
      { label: "Reach", value: "CA-US-MX" },
    ],
    ctas: {
      primary: {
        label: "Request a Specialized Vehicle Quote",
        href: "/quote?service=expedited-specialized&mode=specialized-vehicles",
        ctaId: "solutions_specialized_vehicles_final_request_quote",
      },
      secondary: {
        label: "Talk to the Specialized Vehicle Team",
        href: "/contact?topic=expedited-specialized&mode=specialized-vehicles",
        ctaId: "solutions_specialized_vehicles_final_talk_team",
      },
    },
  },
};

const SOLUTION_PAGES = {
  [TRUCKLOAD_SOLUTION_PAGE.slug]: TRUCKLOAD_SOLUTION_PAGE,
  [LTL_SOLUTION_PAGE.slug]: LTL_SOLUTION_PAGE,
  [FLATBED_SOLUTION_PAGE.slug]: FLATBED_SOLUTION_PAGE,
  [STEP_DECK_SOLUTION_PAGE.slug]: STEP_DECK_SOLUTION_PAGE,
  [CONESTOGA_ROLL_TITE_SOLUTION_PAGE.slug]: CONESTOGA_ROLL_TITE_SOLUTION_PAGE,
  [RGN_HEAVY_HAUL_SOLUTION_PAGE.slug]: RGN_HEAVY_HAUL_SOLUTION_PAGE,
  [TEMPERATURE_CONTROLLED_SOLUTION_PAGE.slug]: TEMPERATURE_CONTROLLED_SOLUTION_PAGE,
  [HAZMAT_SOLUTION_PAGE.slug]: HAZMAT_SOLUTION_PAGE,
  [EXPEDITED_SOLUTION_PAGE.slug]: EXPEDITED_SOLUTION_PAGE,
  [SPECIALIZED_VEHICLES_SOLUTION_PAGE.slug]: SPECIALIZED_VEHICLES_SOLUTION_PAGE,
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
  const pageUrl = toAbsoluteUrl(`/solutions/${page.slug}`);
  const ogImage = page.meta.ogImage ? toAbsoluteUrl(page.meta.ogImage) : undefined;

  return {
    title: page.meta.title,
    description: page.meta.description,
    alternates: {
      canonical: `/solutions/${page.slug}`,
    },
    openGraph: {
      title: page.meta.title,
      description: page.meta.description,
      url: pageUrl,
      type: "website",
      siteName: SITE_NAME,
      images: ogImage ? [ogImage] : undefined,
    },
    twitter: {
      card: "summary_large_image",
      title: page.meta.title,
      description: page.meta.description,
      images: ogImage ? [ogImage] : undefined,
    },
  };
}
