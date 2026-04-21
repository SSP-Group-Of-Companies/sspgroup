import { NAV } from "./navigation";

export type FooterLink = { label: string; href: string };

export type FooterSection = {
  title: string;
  viewAllLabel?: string;
  viewAllHref?: string;
  viewAllCtaId?: string;
  links: FooterLink[];
  location: string;
  ctaPrefix: string;
};

export type FooterQuickAction = {
  label: string;
  href: string;
  ctaIdDesktop: string;
  ctaIdMobile: string;
  externalCue?: boolean;
  highlight?: boolean;
  mobileVisible?: boolean;
};

export type FooterSocial = {
  label: string;
  href: string;
  icon: "facebook" | "linkedin" | "instagram" | "youtube" | "mail";
  toneClass: string;
  hoverClass: string;
  external?: boolean;
};

function normalizeLinks(links: readonly { label: string; href: string }[]): FooterLink[] {
  return links
    .filter((l) => typeof l?.label === "string" && l.label && typeof l?.href === "string" && l.href)
    .map((l) => ({ label: l.label, href: l.href }));
}

/**
 * Footer Solutions column — curated to the four flagship families.
 *
 * Rationale: the footer used to mix four category hubs with four
 * sub-solutions (Truckload / LTL / Dedicated-Contract / Managed
 * Capacity) at the same visual rank, which flattened the hierarchy
 * and let no single link "own" its slot. Trimming to the four
 * families keeps the footer strategic — it mirrors the home "What
 * SSP Moves" section and lets the families act as the authoritative
 * entry points. Visitors hunting a specific mode still have one
 * click away via "View all solutions →" (rendered above this list)
 * or by drilling into the family hub.
 */
function getSolutionsFooterLinks(): FooterLink[] {
  const curatedOrder: FooterLink[] = [
    { label: "Core Freight", href: "/solutions/core-freight-modes" },
    { label: "Specialized & Critical Freight", href: "/solutions/specialized-critical-freight" },
    { label: "Cross-Border", href: "/solutions/cross-border" },
    { label: "Managed Logistics", href: "/solutions/managed-logistics" },
  ];

  // Prefer the nav's own label/href for each curated family when
  // available — keeps the footer in sync with nav naming changes.
  const flattened: FooterLink[] = [];
  NAV.solutions.categories.forEach((cat) => {
    cat.links.forEach((l) => {
      if (l?.label && l?.href) flattened.push({ label: l.label, href: l.href });
    });
  });
  const flattenedByHref = new Map(flattened.map((l) => [l.href, l]));

  return curatedOrder.map((c) => {
    const match = flattenedByHref.get(c.href);
    // Keep our curated label (e.g. "Core Freight" vs nav's "Core
    // Freight Modes") — we only fall back to nav label if ours is
    // somehow empty, which shouldn't happen.
    return { label: c.label || match?.label || "", href: c.href };
  }).filter((l) => l.label && l.href);
}

export const FOOTER_SECTIONS: Record<"solutions" | "industries" | "company" | "careers", FooterSection> = {
  solutions: {
    title: "Solutions",
    viewAllLabel: "View all solutions",
    viewAllHref: "/solutions",
    viewAllCtaId: "footer_view_all_solutions",
    links: getSolutionsFooterLinks(),
    location: "footer:solutions",
    ctaPrefix: "footer_solution_",
  },
  industries: {
    title: "Industries",
    viewAllLabel: "View all industries",
    viewAllHref: "/industries",
    viewAllCtaId: "footer_view_all_industries",
    links: normalizeLinks(NAV.industries.links),
    location: "footer:industries",
    ctaPrefix: "footer_industry_",
  },
  company: {
    title: "Company",
    links: normalizeLinks(NAV.company.links),
    location: "footer:company",
    ctaPrefix: "footer_company_",
  },
  careers: {
    title: "Careers",
    links: normalizeLinks(NAV.careers.links),
    location: "footer:careers",
    ctaPrefix: "footer_careers_",
  },
};

export const FOOTER_QUICK_ACTIONS: FooterQuickAction[] = [
  {
    label: "Freight by location",
    href: "/locations",
    ctaIdDesktop: "footer_freight_by_location",
    ctaIdMobile: "footer_m_freight_by_location",
  },
  {
    label: "Freight lanes",
    href: "/lanes",
    ctaIdDesktop: "footer_freight_lanes",
    ctaIdMobile: "footer_m_freight_lanes",
  },
  {
    label: "Contact SSP",
    href: "/contact",
    ctaIdDesktop: "footer_contact_ssp",
    ctaIdMobile: "footer_m_contact_ssp",
  },
  {
    label: "Track Shipment",
    href: "/track-shipment",
    ctaIdDesktop: "footer_track_shipment",
    ctaIdMobile: "footer_m_track_shipment",
    externalCue: true,
    mobileVisible: true,
  },
  {
    label: "Carrier Portal",
    href: "/carrier-portal",
    ctaIdDesktop: "footer_carrier_portal",
    ctaIdMobile: "footer_m_carrier_portal",
    externalCue: true,
    mobileVisible: true,
  },
  {
    label: "Request a Quote",
    href: "/quote",
    ctaIdDesktop: "footer_request_quote",
    ctaIdMobile: "footer_m_request_quote",
    externalCue: true,
    highlight: true,
    mobileVisible: true,
  },
];

export const FOOTER_LEGAL_LINKS = [
  { label: "Privacy Policy", href: "/privacy" },
  { label: "Terms of Service", href: "/terms" },
  { label: "Cookie Policy", href: "/cookies" },
  { label: "Cookie Preferences", href: "/cookie-preferences" },
  { label: "Accessibility", href: "/accessibility" },
] as const;

export const FOOTER_SOCIALS: FooterSocial[] = [
  {
    label: "Facebook",
    href: "https://www.facebook.com/SSPTRUCKLINE/",
    icon: "facebook",
    toneClass: "text-[#1877F2]",
    hoverClass: "hover:bg-[#eaf2ff]",
    external: true,
  },
  {
    label: "LinkedIn",
    href: "https://www.linkedin.com/company/ssp-group-of-companies/",
    icon: "linkedin",
    toneClass: "text-[#0A66C2]",
    hoverClass: "hover:bg-[#e8f3ff]",
    external: true,
  },
  {
    label: "Instagram",
    href: "https://www.instagram.com/ssptruckline/",
    icon: "instagram",
    toneClass: "text-[#E4405F]",
    hoverClass: "hover:bg-[#fff0f4]",
    external: true,
  },
  {
    label: "YouTube",
    href: "https://www.youtube.com/@SSPGroupofCompanies",
    icon: "youtube",
    toneClass: "text-[#FF0000]",
    hoverClass: "hover:bg-[#fff0f0]",
    external: true,
  },
  {
    label: "Email SSP",
    href: "mailto:cs@sspgroup.com",
    icon: "mail",
    toneClass: "text-[#EA4335]",
    hoverClass: "hover:bg-[#fff1ef]",
  },
];
