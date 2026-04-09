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
    pallets?: string;
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
      src: "/_optimized/solution/ltl/mode-overview.mp4",
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
        pallets: "Often 1-12 pallets, depending on density, class, and lane",
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
    title: "Temperature-controlled freight is a product-integrity service, not just an equipment choice.",
    description:
      "This mode is used when cargo quality, shelf life, or compliance depends on maintaining a defined temperature range during transit. The reefer trailer matters, but so do setpoint instructions, pre-load readiness, airflow, monitoring, and disciplined response if conditions change.",
    video: {
      src: "/_optimized/solution/tempCtrl/mode-overview.mp4",
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
        pallets: "Often 24-26 pallets in a 53 ft reefer, depending on product and airflow needs",
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
    title: "Hazmat freight is a compliance-controlled service, not a standard truckload with extra paperwork.",
    description:
      "This mode is used when the material is regulated for transportation and the shipment has to move with the correct classification, packaging, hazard communication, documentation, and operating controls. Equipment matters, but the real operating discipline sits in getting the shipment legally and operationally ready before pickup.",
    video: {
      src: "/_optimized/solution/hazmat/mode-overview.mp4",
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
        pallets: "Pallet count varies by material, packaging method, and segregation requirements",
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
    title: "Expedited freight is an urgency-first operating model, not just a faster quote.",
    description:
      "This mode is used when delivery timing affects production continuity, customer commitments, or shipment recovery and the move has to be built around faster response, directness, and disciplined communication. Speed matters, but execution quality still depends on clean intake, realistic routing, and active exception control.",
    video: {
      src: "/_optimized/solution/expedited/mode-overview.mp4",
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
        pallets: "Pallet count varies by shipment profile; urgency matters more than standard volume thresholds",
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

const SOLUTION_PAGES = {
  [TRUCKLOAD_SOLUTION_PAGE.slug]: TRUCKLOAD_SOLUTION_PAGE,
  [LTL_SOLUTION_PAGE.slug]: LTL_SOLUTION_PAGE,
  [TEMPERATURE_CONTROLLED_SOLUTION_PAGE.slug]: TEMPERATURE_CONTROLLED_SOLUTION_PAGE,
  [HAZMAT_SOLUTION_PAGE.slug]: HAZMAT_SOLUTION_PAGE,
  [EXPEDITED_SOLUTION_PAGE.slug]: EXPEDITED_SOLUTION_PAGE,
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
