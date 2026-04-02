import { INDUSTRY_KEYS, type IndustryKey } from "./industryKeys";
import { getIndustryByKey } from "./industryPages";

export type IndustrySlide = {
  key: IndustryKey;
  label: string;
  title: string;
  subtitle: string;
  mobileTitle?: string;
  mobileSubtitle?: string;
  href: string;
  image: string;
  accent?: "red" | "blue" | "green" | "slate";
};

export const INDUSTRIES_SECTION = {
  id: "industries",
  kicker: "Industries",
  heading: "Industries We Serve",
  description:
    "Sector-specific logistics programs for the industries where timing, compliance, and precision define outcomes.",
} as const;

const INDUSTRY_OVERVIEWS: Record<IndustryKey, Omit<IndustrySlide, "href" | "image" | "key">> = {
  automotive: {
    label: "Automotive",
    title: "Automotive freight engineered for precision.",
    subtitle:
      "From specialty vehicle transport to production-line sequencing, automotive logistics built around asset protection and schedule integrity.",
    mobileTitle: "Precision automotive logistics.",
    mobileSubtitle: "Specialty vehicles, OEM parts, and production-line sequencing.",
    accent: "red",
  },
  manufacturing: {
    label: "Manufacturing",
    title: "Manufacturing supply chains require control.",
    subtitle:
      "Raw materials and production-critical freight moved with inbound rhythm, handling discipline, and exception ownership.",
    mobileTitle: "Manufacturing supply chains require control.",
    mobileSubtitle:
      "Production-critical freight moved with consistency and real-time visibility.",
    accent: "slate",
  },
  retail: {
    label: "Retail & Consumer Goods",
    title: "Retail freight delivered with zero drama.",
    subtitle:
      "Store replenishment and DC lanes with predictable execution, clear updates, and service-level discipline.",
    mobileTitle: "Retail freight delivered with zero drama.",
    mobileSubtitle: "Store and DC lanes delivered with predictable execution and clear updates.",
    accent: "blue",
  },
  food: {
    label: "Food & Beverage",
    title: "Food & beverage moves on precision.",
    subtitle:
      "Temperature-governed execution, transit-time discipline, and compliance-ready documentation protecting product quality.",
    mobileTitle: "Food & beverage moves on precision.",
    mobileSubtitle:
      "Temperature-aware handling and on-time execution protecting shelf life and trust.",
    accent: "green",
  },
  construction: {
    label: "Construction & Building Materials",
    title: "Project cargo delivered to site on schedule.",
    subtitle:
      "Heavy equipment, building materials, and site-critical freight moved with permit-aware planning and safety-governed execution.",
    mobileTitle: "Project cargo delivered on schedule.",
    mobileSubtitle:
      "Building materials and heavy equipment moved with safety-first execution.",
    accent: "slate",
  },
  "steel-aluminum": {
    label: "Steel & Metals",
    title: "Heavy freight handled with discipline.",
    subtitle:
      "Metal coils, plate, and high-density loads moved with engineered securement, compliance rigor, and accountable execution.",
    mobileTitle: "Heavy freight handled with discipline.",
    mobileSubtitle:
      "Metal coils and plate moved with proper equipment, securement, and accountability.",
    accent: "slate",
  },
  "chemical-plastics": {
    label: "Chemical & Plastics",
    title: "Chemical and plastics freight with controlled execution.",
    subtitle:
      "Regulated freight programs built around carrier qualification, document control, and classification-specific handling across North America.",
    mobileTitle: "Chemical freight with compliance discipline.",
    mobileSubtitle:
      "Controlled regulated-freight execution with stronger document and handling discipline.",
    accent: "slate",
  },
};

export const INDUSTRY_SLIDES: IndustrySlide[] = INDUSTRY_KEYS.map((key) => {
  const industry = getIndustryByKey(key);
  const overview = INDUSTRY_OVERVIEWS[key];

  if (!industry) {
    throw new Error(`Missing industry page config for "${key}"`);
  }

  return {
    key,
    ...overview,
    href: `/industries/${industry.slug}`,
    image: industry.meta.heroImage,
  };
});
