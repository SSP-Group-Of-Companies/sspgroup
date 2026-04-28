export const HEADER_PRIMARY_DROPDOWNS = [
  "solutions",
  "industries",
  "company",
  "careers",
] as const;

export type HeaderDropdownKey = (typeof HEADER_PRIMARY_DROPDOWNS)[number];

export const HEADER_HUB_ROUTES: Record<HeaderDropdownKey, string> = {
  solutions: "/solutions",
  industries: "/industries",
  company: "/about-us",
  careers: "/careers",
};

export type HeaderAction = {
  label: string;
  href: string;
  ctaIdDesktop: string;
  ctaIdMobile: string;
  primary?: boolean;
  externalCue?: boolean;
};

export const HEADER_ACTIONS: HeaderAction[] = [
  {
    label: "Track Shipment",
    href: "/tracking",
    ctaIdDesktop: "header_track_shipment",
    ctaIdMobile: "nav_mobile_track_shipment",
    externalCue: true,
  },
  {
    label: "Carrier Portal",
    href: "/employee-portal",
    ctaIdDesktop: "header_carrier_portal",
    ctaIdMobile: "nav_mobile_carrier_portal",
    externalCue: true,
  },
  {
    label: "Request a Quote",
    href: "/quote",
    ctaIdDesktop: "header_request_quote",
    ctaIdMobile: "nav_mobile_request_quote",
    primary: true,
    externalCue: true,
  },
];

export type HeaderDirectLink = {
  label: string;
  href: string;
  ctaIdDesktop: string;
  ctaIdMobile: string;
};

export const HEADER_DIRECT_LINKS: HeaderDirectLink[] = [
  {
    label: "Insights",
    href: "/insights",
    ctaIdDesktop: "nav_desktop_insights",
    ctaIdMobile: "nav_mobile_insights",
  },
  {
    label: "Contact",
    href: "/contact",
    ctaIdDesktop: "nav_desktop_contact",
    ctaIdMobile: "nav_mobile_contact",
  },
];

export const HEADER_SEARCH_QUICK_LINKS = [
  { label: "Flatbed", href: "/solutions/flatbed" },
  { label: "Full Truckload", href: "/solutions/truckload" },
  { label: "Dry Van", href: "/solutions/dry-van" },
  { label: "Step Deck", href: "/solutions/step-deck" },
  { label: "Cross-Border", href: "/solutions/cross-border" },
  { label: "Request Quote", href: "/quote" },
] as const;

import { COMPANY_ADDRESS, COMPANY_CONTACT } from "@/lib/seo/site";

// Derived from the central `COMPANY_CONTACT` / `COMPANY_ADDRESS` so a change in
// env (phone) or site.ts (address) propagates to every header utility surface
// without needing to touch this file.
export const HEADER_UTILITY = {
  email: COMPANY_CONTACT.email,
  phone: COMPANY_CONTACT.phoneDisplay,
  telHref: `tel:${COMPANY_CONTACT.phoneE164}`,
  mailtoHref: `mailto:${COMPANY_CONTACT.email}`,
  address: COMPANY_ADDRESS.formatted,
} as const;
