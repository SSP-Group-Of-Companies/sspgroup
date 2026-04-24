// Single source of truth for SSP Group identity, contact, address, and social profiles.
// All UI, metadata, JSON-LD, and structured-data consumers should read from here so
// that a change to the env (or this file) propagates everywhere the values are used.

export const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL || "https://sspgroup.com";

export const SITE_NAME = "SSP Group";

// Registered corporate name. Used in Organization JSON-LD (`legalName`) so Google
// can distinguish the marketing name ("SSP Group") from the legal entity.
export const COMPANY_LEGAL_NAME = "SSP Group of Companies";

// ISO-8601 year SSP Group was founded. Emitted as `foundingDate` in Organization
// JSON-LD so Google can display "Founded 2015" in the knowledge panel.
export const COMPANY_FOUNDING_YEAR = "2015";

export const SITE_DEFAULT_DESCRIPTION =
  "SSP Group delivers freight transportation across North America with structured execution across truckload, LTL, cross-border, specialized, and temperature-controlled programs.";

export const SITE_DEFAULT_OG_IMAGE = "/_optimized/brand/SSPlogo.png";

/** Default social preview for /insights when a post has no banner (aligned with listing hero art). */
export const INSIGHTS_DEFAULT_OG_IMAGE = "/_optimized/insights/insights-hero-ssp-containers-topdown.jpg";
/** Careers sharing fallback (until a dedicated careers social banner is introduced). */
export const CAREERS_DEFAULT_OG_IMAGE = SITE_DEFAULT_OG_IMAGE;

// Human-readable phone comes from env so ops can change the number in one place.
// E.164 is derived so JSON-LD / tel: links stay consistent with whatever is in env.
const PHONE_DISPLAY_FALLBACK = "+1 (519) 968-3632";
const CS_EMAIL_FALLBACK = "cs@sspgroup.com";

const rawPhone = (process.env.NEXT_PUBLIC_SSP_PHONE || PHONE_DISPLAY_FALLBACK).trim();

function toE164(input: string): string {
  // Keep a leading +, strip everything except digits after that.
  const hasPlus = input.startsWith("+");
  const digits = input.replace(/[^\d]/g, "");
  return `${hasPlus ? "+" : ""}${digits}`;
}

export const COMPANY_CONTACT = {
  email: process.env.NEXT_PUBLIC_SSP_CS_EMAIL || CS_EMAIL_FALLBACK,
  phoneDisplay: rawPhone,
  phoneE164: toE164(rawPhone),
} as const;

// Headquarters postal address. Mirrors the Milton / Halton Hills site used for
// the Google Business listing and Organization JSON-LD `address`.
export const COMPANY_ADDRESS = {
  streetAddress: "8401 5 Side Rd",
  addressLocality: "Milton",
  addressRegion: "ON",
  postalCode: "L9T 2Y7",
  addressCountry: "CA",
  /** Single-line presentation used by the header utility strip and footer HQ line. */
  formatted: "8401 5 Side Rd, Milton, ON L9T 2Y7",
} as const;

// Official SSP social profiles. Emitted as `sameAs` in Organization JSON-LD so
// Google can attach verified social accounts to the knowledge panel.
export const SOCIAL_PROFILES = [
  "https://www.facebook.com/SSPTRUCKLINE/",
  "https://www.linkedin.com/company/ssp-group-of-companies/",
  "https://www.instagram.com/ssptruckline/",
  "https://www.youtube.com/@SSPGroupofCompanies",
] as const;

export function toAbsoluteUrl(path: string) {
  return new URL(path, SITE_URL).toString();
}
