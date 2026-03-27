export const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL || "https://sspgroup.com";

export const SITE_NAME = "SSP Group";

export const SITE_DEFAULT_DESCRIPTION =
  "SSP Group delivers freight transportation across North America with structured execution across truckload, LTL, cross-border, specialized, and temperature-controlled programs.";

export const SITE_DEFAULT_OG_IMAGE = "/_optimized/brand/SSPlogo.png";

export const COMPANY_CONTACT = {
  email: process.env.NEXT_PUBLIC_SSP_CS_EMAIL || process.env.NEXT_PUBLIC_NPT_LOGISTICS_EMAIL || "cs@sspgroup.com",
  phoneE164: "+15199683632",
  phoneDisplay: "+1 (519) 968-3632",
};

export const SOCIAL_PROFILES: string[] = [];

export function toAbsoluteUrl(path: string) {
  return new URL(path, SITE_URL).toString();
}
