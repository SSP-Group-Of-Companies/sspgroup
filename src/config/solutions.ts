// src/config/solutions.ts

export type SolutionIcon =
  | "truck"
  | "package"
  | "train"
  | "zap"
  | "shield"
  | "snowflake"
  | "globe"
  | "warehouse"
  | "briefcase"
  | "plane"
  | "ship";

/**
 * Controls the skew gradient look of a card (presentation-only).
 * Optional — if not provided, component fallback keeps your current look.
 */
export type CardTheme = "navy" | "red" | "slate" | "blue" | "ltl";

/**
 * Controls category presentation (presentation-only).
 * Optional — component fallback keeps your current look.
 */
export type SolutionsTheme = "default" | "dark";
export type SolutionsLayout = "auto" | "two" | "three" | "four";

export type ServiceCard = {
  /** Stable identifier for analytics and reporting (never change once live). */
  analyticsId?: string;

  label: string;
  href: string;
  description: string;
  icon: SolutionIcon;
  bestFor?: string;
  image?: string;

  /** Optional: explicitly choose gradient without relying on label parsing. */
  cardTheme?: CardTheme;
};

export type SolutionsCategory = {
  description: string;
  cards: ServiceCard[];
  image?: string;

  /** Optional: controls header styling; default keeps existing category checks behavior. */
  theme?: SolutionsTheme;

  /** Optional: controls grid columns; default keeps existing category checks behavior. */
  layout?: SolutionsLayout;
};

export const SOLUTIONS_DATA = {
  "Core Freight Modes": {
    description: "Standard shipping methods for everyday freight needs.",
    image: "/_optimized/solutions/npt-core-freight-hero.webp",
    layout: "two",
    theme: "default",
    cards: [
      {
        analyticsId: "truckload_tl",
        label: "Truckload (FTL)",
        href: "/solutions/truckload",
        description: "Dedicated capacity for your entire shipment with faster transit times.",
        icon: "truck",
        bestFor: "Full loads, expedited delivery",
        image: "/_optimized/solutions/card-truckload-tl.webp",
        cardTheme: "red",
      },
      {
        analyticsId: "ltl",
        label: "Less-Than-Truckload (LTL)",
        href: "/solutions/ltl",
        description: "Cost-efficient shipping by consolidating smaller shipments.",
        icon: "package",
        bestFor: "Smaller shipments, cost savings",
        image: "/_optimized/solutions/card-ltl.webp",
        cardTheme: "ltl",
      },
      /* COMMENTED OUT - uncomment to restore intermodal
      {
        analyticsId: "intermodal",
        label: "Intermodal",
        href: "/services/intermodal",
        description: "Rail efficiency for long distances with truck flexibility for delivery.",
        icon: "train",
        bestFor: "Long distances, cost optimization",
        image: "/_optimized/solutions/card-intermodal.webp",
        cardTheme: "navy",
      },
      */
    ],
  },
  "Specialized & Time-Sensitive": {
    description: "Expert handling for urgent and specialized freight requirements.",
    image: "/_optimized/solutions/card-specialized-vehicleImg.webp",
    layout: "four",
    theme: "dark",
    cards: [
      {
        analyticsId: "expedited",
        label: "Expedited Shipping",
        href: "/solutions/expedited",
        description: "Fast-track delivery for urgent shipments.",
        icon: "zap",
        bestFor: "Time-sensitive freight",
        image: "/_optimized/solutions/card-expeditedd.webp",
      },
      {
        analyticsId: "specialized_vehicle_transport",
        label: "Specialized Vehicle Programs",
        href: "/solutions/specialized-vehicles",
        description: "Expert handling for specialized vehicles and equipment.",
        icon: "truck",
        bestFor: "Oversized, delicate cargo",
        image: "/_optimized/solutions/card-specialized-vehicleImg.webp",
      },
      {
        analyticsId: "hazmat",
        label: "Hazardous Materials (HAZMAT)",
        href: "/solutions/hazmat",
        description: "Compliant hazmat movement and documentation.",
        icon: "shield",
        bestFor: "Regulated materials",
        image: "/_optimized/solutions/card-hazmat.webp",
      },
      {
        analyticsId: "temperature_controlled",
        label: "Refrigerated / Temperature-Controlled",
        href: "/solutions/temperature-controlled",
        description: "Refrigerated and controlled-temperature freight.",
        icon: "snowflake",
        bestFor: "Perishables, pharmaceuticals",
        image: "/_optimized/solutions/card-refrigerated.webp",
      },
    ],
  },
  "Cross-Border & Global": {
    description: "Seamless international shipping across borders and oceans.",
    image: "/_optimized/hero/hero-poster.webp",
    layout: "four",
    theme: "default",
    cards: [
      {
        analyticsId: "cross_border_canada_us",
        label: "Canada ↔ USA Cross-Border",
        href: "/solutions/cross-border/canada-usa",
        description: "Seamless cross-border shipping between Canada and USA.",
        icon: "globe",
        bestFor: "North American trade",
        image: "/_optimized/solutions/card-cross-border-canada-us.webp",
      },
      {
        analyticsId: "cross_border_mexico",
        label: "Mexico Cross-Border",
        href: "/solutions/cross-border/mexico",
        description: "Reliable Mexico cross-border logistics.",
        icon: "globe",
        bestFor: "Mexico trade lanes",
        image: "/_optimized/solutions/card-cross-border-mexico.webp",
      },
      {
        analyticsId: "ocean_freight",
        label: "Ocean Freight",
        href: "/solutions/cross-border/ocean-freight",
        description: "International ocean shipping solutions.",
        icon: "ship",
        bestFor: "International bulk shipping",
        image: "/_optimized/solutions/card-ocean-freight.webp",
      },
      {
        analyticsId: "air_freight",
        label: "Air Freight",
        href: "/solutions/cross-border/air-freight",
        description: "Fast international air cargo services.",
        icon: "plane",
        bestFor: "Urgent international delivery",
        image: "/_optimized/solutions/card-air-freight.webp",
      },
    ],
  },
  "Logistics & Value-Added": {
    description: "Comprehensive logistics solutions beyond transportation.",
    image: "/_optimized/solutions/solutions-logistics.webp",
    layout: "four",
    theme: "dark",
    cards: [
      {
        analyticsId: "warehousing_distribution",
        label: "Warehousing & Distribution",
        href: "/solutions/warehousing-distribution",
        description: "Strategic warehousing and distribution networks.",
        icon: "warehouse",
        bestFor: "Inventory management",
        image: "/_optimized/solutions/card-warehousing-distribution.webp",
      },
      {
        analyticsId: "managed_capacity",
        label: "Managed Capacity",
        href: "/solutions/managed-capacity",
        description: "Dedicated capacity solutions for consistent volume.",
        icon: "briefcase",
        bestFor: "High-volume shippers",
        image: "/_optimized/solutions/card-managed-capacity.webp",
      },
      {
        analyticsId: "dedicated_contract_logistics",
        label: "Dedicated / Contract Logistics",
        href: "/solutions/dedicated-contract",
        description: "Custom logistics programs tailored to your needs.",
        icon: "briefcase",
        bestFor: "Long-term partnerships",
        image: "/_optimized/solutions/card-dedicated-contract.webp",
      },
      {
        analyticsId: "project_oversize_programs",
        label: "Project-Specific (Oversize) Programs",
        href: "/solutions/project-freight",
        description: "Specialized handling for large-scale and oversize projects.",
        icon: "truck",
        bestFor: "Complex, oversized cargo",
        image: "/_optimized/solutions/card-project-oversize.webp",
      },
    ],
  },
} satisfies Record<string, SolutionsCategory>;

export const SOLUTIONS_CATEGORIES = Object.keys(SOLUTIONS_DATA) as Array<
  keyof typeof SOLUTIONS_DATA
>;
