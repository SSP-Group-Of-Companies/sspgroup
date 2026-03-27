export type IndustryKey =
  | "automotive"
  | "manufacturing"
  | "retail"
  | "food"
  | "construction"
  | "steel-aluminum"
  | "chemical-plastics";

export type IndustrySlide = {
  key: IndustryKey;
  label: string;
  title: string;
  subtitle: string;
  mobileTitle?: string;
  mobileSubtitle?: string;
  href: string;
  image: string;
  accent?: "red" | "blue" | "slate";
};

export const INDUSTRIES_SECTION = {
  id: "industries",
  kicker: "Industries",
  heading: "Industries We Serve",
  description:
    "Sector-specific logistics programs for the industries where timing, compliance, and precision define outcomes.",
} as const;

export const INDUSTRY_SLIDES: IndustrySlide[] = [
  {
    key: "automotive",
    label: "Automotive",
    title: "Automotive freight engineered for precision.",
    subtitle:
      "From specialty vehicle transport to production-line sequencing, automotive logistics built around asset protection and schedule integrity.",
    mobileTitle: "Precision automotive logistics.",
    mobileSubtitle: "Specialty vehicles, OEM parts, and production-line sequencing.",
    href: "/industries/automotive",
    image: "/_optimized/industries/Automotives.webp",
    accent: "red",
  },
  {
    key: "manufacturing",
    label: "Manufacturing",
    title: "Manufacturing supply chains require control.",
    subtitle:
      "Raw materials and production-critical freight moved with inbound rhythm, handling discipline, and exception ownership.",
    mobileTitle: "Manufacturing supply chains require control.",
    mobileSubtitle:
      "Production-critical freight moved with consistency and real-time visibility.",
    href: "/industries/manufacturing-materials",
    image: "/_optimized/industries/Manufacturing.webp",
    accent: "slate",
  },
  {
    key: "retail",
    label: "Retail & Consumer Goods",
    title: "Retail freight delivered with zero drama.",
    subtitle:
      "Store replenishment and DC lanes with predictable execution, clear updates, and service-level discipline.",
    mobileTitle: "Retail freight delivered with zero drama.",
    mobileSubtitle: "Store and DC lanes delivered with predictable execution and clear updates.",
    href: "/industries/retail-consumer-goods",
    image: "/_optimized/industries/Retail.webp",
    accent: "blue",
  },
  {
    key: "food",
    label: "Food & Beverage",
    title: "Food & beverage moves on precision.",
    subtitle:
      "Temperature-governed execution, transit-time discipline, and compliance-ready documentation protecting product quality.",
    mobileTitle: "Food & beverage moves on precision.",
    mobileSubtitle:
      "Temperature-aware handling and on-time execution protecting shelf life and trust.",
    href: "/industries/food-beverage",
    image: "/_optimized/industries/food.webp",
    accent: "red",
  },
  {
    key: "steel-aluminum",
    label: "Steel & Metals",
    title: "Heavy freight handled with discipline.",
    subtitle:
      "Metal coils, plate, and high-density loads moved with engineered securement, compliance rigor, and accountable execution.",
    mobileTitle: "Heavy freight handled with discipline.",
    mobileSubtitle:
      "Metal coils and plate moved with proper equipment, securement, and accountability.",
    href: "/industries/steel-aluminum",
    image: "/_optimized/industries/Steel.webp",
    accent: "slate",
  },
  {
    key: "construction",
    label: "Construction & Building Materials",
    title: "Project cargo delivered to site on schedule.",
    subtitle:
      "Heavy equipment, building materials, and site-critical freight moved with permit-aware planning and safety-governed execution.",
    mobileTitle: "Project cargo delivered on schedule.",
    mobileSubtitle:
      "Building materials and heavy equipment moved with safety-first execution.",
    href: "/industries/construction-building-materials",
    image: "/_optimized/industries/Industry&Energy.webp",
    accent: "slate",
  },
  {
    key: "chemical-plastics",
    label: "Chemical & Plastics",
    title: "Chemical and plastics freight with controlled execution.",
    subtitle:
      "Regulated freight programs built around carrier qualification, document control, and classification-specific handling across North America.",
    mobileTitle: "Chemical freight with compliance discipline.",
    mobileSubtitle:
      "Controlled regulated-freight execution with stronger document and handling discipline.",
    href: "/industries/chemical-plastics",
    image: "/_optimized/industries/Manufacturing.webp",
    accent: "slate",
  },
];
