/**
 * Cookie & consent configuration for SSP Group.
 *
 * Source of truth for:
 *   - which cookie categories we recognise
 *   - which GA4 Consent Mode v2 signals each category controls
 *   - the inventory disclosed in /cookies and the preferences modal
 *
 * Kept token-free (string content only) so it can be imported by both
 * server components (legal pages) and the client consent system.
 */

export const COOKIE_CONSENT_VERSION = 2;

/** First-party storage key for the visitor's cookie preference. */
export const COOKIE_CONSENT_STORAGE_KEY = "ssp_cookie_consent";

export const COOKIE_CONSENT_MAX_AGE_DAYS = 180;

export type CookieCategoryId = "necessary" | "analytics";

export type CookieCategory = {
  id: CookieCategoryId;
  label: string;
  summary: string;
  /**
   * Longer description shown inside the preferences modal when the category
   * is expanded. Reads as calm, enterprise-directed copy.
   */
  description: string;
  /** If true the toggle is locked on and the user cannot opt out. */
  required: boolean;
  /** GA4 Consent Mode v2 signal keys controlled by this category. */
  consentSignals: readonly GoogleConsentSignal[];
};

export type GoogleConsentSignal =
  | "analytics_storage"
  | "ad_storage"
  | "ad_user_data"
  | "ad_personalization"
  | "functionality_storage"
  | "personalization_storage"
  | "security_storage";

export const COOKIE_CATEGORIES: readonly CookieCategory[] = [
  {
    id: "necessary",
    label: "Strictly necessary",
    summary: "Required for secure operation of the website and to remember your cookie choice.",
    description:
      "Strictly necessary cookies keep the website secure, route requests correctly, and remember your cookie preferences. They are always enabled because the site cannot function without them. No personal profile is built, and the data is not shared for marketing.",
    required: true,
    consentSignals: ["functionality_storage", "security_storage"],
  },
  {
    id: "analytics",
    label: "Analytics",
    summary: "Measures anonymised page views and CTA clicks so we can improve navigation and content.",
    description:
      "Analytics cookies help us understand which pages, lanes, and services receive the most attention and where visitors experience friction. Data is aggregated, IP addresses are truncated, and we do not use the information to build advertising profiles or share it with third-party networks.",
    required: false,
    consentSignals: ["analytics_storage"],
  },
] as const;

export type CookieInventoryEntry = {
  name: string;
  provider: string;
  /** Where the cookie is set: "first_party" (sspgroup.com) or "third_party". */
  source: "first_party" | "third_party";
  categoryId: CookieCategoryId;
  purpose: string;
  duration: string;
};

/**
 * Public cookie inventory — disclosed on /cookies and referenced from the
 * preferences modal. Keep this list in lockstep with what the site actually
 * sets. If a provider is added (e.g. GTM, Meta), add it here FIRST before
 * rolling out the integration.
 */
export const COOKIE_INVENTORY: readonly CookieInventoryEntry[] = [
  {
    name: "ssp_cookie_consent",
    provider: "SSP Group",
    source: "first_party",
    categoryId: "necessary",
    purpose: "Stores your cookie category preferences so the consent banner does not re-appear on every page.",
    duration: "180 days",
  },
  {
    name: "_ga",
    provider: "Google LLC (Google Analytics 4)",
    source: "third_party",
    categoryId: "analytics",
    purpose: "Distinguishes anonymous visitors to measure aggregated website usage.",
    duration: "24 months",
  },
  {
    name: "_ga_<container-id>",
    provider: "Google LLC (Google Analytics 4)",
    source: "third_party",
    categoryId: "analytics",
    purpose: "Persists session state for GA4 property reporting.",
    duration: "24 months",
  },
] as const;

/** Last time the cookie categories or inventory changed. */
export const COOKIE_INVENTORY_LAST_REVIEWED = "February 17, 2026";

/** CustomEvent names used to coordinate consent UI across the app. */
export const CONSENT_EVENTS = {
  openPreferences: "ssp:open-cookie-preferences",
  consentUpdated: "ssp:cookie_consent_updated",
} as const;
