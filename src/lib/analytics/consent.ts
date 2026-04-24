import {
  COOKIE_CATEGORIES,
  COOKIE_CONSENT_MAX_AGE_DAYS,
  COOKIE_CONSENT_STORAGE_KEY,
  COOKIE_CONSENT_VERSION,
  type CookieCategory,
  type CookieCategoryId,
  type GoogleConsentSignal,
} from "@/config/cookies";

/** Primary storage key — exported for back-compat with existing imports. */
export const CONSENT_STORAGE_KEY = COOKIE_CONSENT_STORAGE_KEY;

const CONSENT_COOKIE_MAX_AGE_SECONDS = 60 * 60 * 24 * COOKIE_CONSENT_MAX_AGE_DAYS;

/**
 * Persisted consent record. Every toggleable category is represented
 * explicitly so the GA4 Consent Mode v2 mapping can expand without
 * breaking older stored payloads.
 */
export type ConsentPreferences = {
  version: number;
  necessary: true;
  analytics: boolean;
  updatedAt: string;
};

export function createConsentPreferences(analytics: boolean): ConsentPreferences {
  return {
    version: COOKIE_CONSENT_VERSION,
    necessary: true,
    analytics,
    updatedAt: new Date().toISOString(),
  };
}

/**
 * Build a lookup of `{ [categoryId]: boolean }` from a stored payload.
 * Useful for rendering the preferences modal in a generic way.
 */
export function toCategoryState(preferences: ConsentPreferences | null): Record<CookieCategoryId, boolean> {
  return {
    necessary: true,
    analytics: preferences?.analytics ?? false,
  };
}

type RawStoredConsent = Partial<
  Omit<ConsentPreferences, "analytics" | "necessary"> & {
    analytics: boolean;
    necessary: unknown;
  }
>;

function parseStoredConsent(raw: string | null | undefined): ConsentPreferences | null {
  if (!raw) return null;
  try {
    const parsed = JSON.parse(raw) as RawStoredConsent;
    if (typeof parsed?.analytics !== "boolean") return null;
    return {
      version: typeof parsed.version === "number" ? parsed.version : COOKIE_CONSENT_VERSION,
      necessary: true,
      analytics: parsed.analytics,
      updatedAt:
        typeof parsed.updatedAt === "string" && parsed.updatedAt
          ? parsed.updatedAt
          : new Date().toISOString(),
    };
  } catch {
    return null;
  }
}

function readCookie(name: string): string | null {
  if (typeof document === "undefined") return null;
  const pairs = document.cookie ? document.cookie.split("; ") : [];
  for (const pair of pairs) {
    const idx = pair.indexOf("=");
    const key = idx === -1 ? pair : pair.slice(0, idx);
    if (key !== name) continue;
    const value = idx === -1 ? "" : pair.slice(idx + 1);
    try {
      return decodeURIComponent(value);
    } catch {
      return value;
    }
  }
  return null;
}

function writeCookie(name: string, value: string) {
  if (typeof document === "undefined") return;
  document.cookie = `${name}=${encodeURIComponent(value)}; Max-Age=${CONSENT_COOKIE_MAX_AGE_SECONDS}; Path=/; SameSite=Lax; Secure`;
}

/**
 * Read the visitor's consent preference. Local storage is the source of
 * truth; the first-party cookie is used as a secondary read so the value
 * survives storage partitioning and subdomain hops.
 */
export function readConsentPreferences(): ConsentPreferences | null {
  if (typeof window === "undefined") return null;

  const currentLocal = window.localStorage.getItem(COOKIE_CONSENT_STORAGE_KEY);
  const currentParsed = parseStoredConsent(currentLocal);
  if (currentParsed) return currentParsed;

  const currentCookie = readCookie(COOKIE_CONSENT_STORAGE_KEY);
  const cookieParsed = parseStoredConsent(currentCookie);
  if (cookieParsed) {
    try {
      window.localStorage.setItem(COOKIE_CONSENT_STORAGE_KEY, JSON.stringify(cookieParsed));
    } catch {
      /* ignore quota/availability errors */
    }
    return cookieParsed;
  }

  return null;
}

export function saveConsentPreferences(preferences: ConsentPreferences) {
  if (typeof window === "undefined") return;
  const serialized = JSON.stringify(preferences);
  try {
    window.localStorage.setItem(COOKIE_CONSENT_STORAGE_KEY, serialized);
  } catch {
    /* ignore quota/availability errors */
  }
  writeCookie(COOKIE_CONSENT_STORAGE_KEY, serialized);
}

export function hasAnalyticsConsent() {
  const preferences = readConsentPreferences();
  return preferences?.analytics === true;
}

type GtagConsentFn = (
  command: "consent",
  action: "update",
  params: Record<GoogleConsentSignal, "granted" | "denied">,
) => void;

function resolveSignal(
  preferences: ConsentPreferences,
  signal: GoogleConsentSignal,
): "granted" | "denied" {
  // Necessary category always granted; analytics is the only toggle today.
  for (const category of COOKIE_CATEGORIES) {
    if (!category.consentSignals.includes(signal)) continue;
    if (category.id === "necessary") return "granted";
    if (category.id === "analytics") return preferences.analytics ? "granted" : "denied";
  }
  return "denied";
}

/**
 * Build the Consent Mode v2 signal map for the given preferences.
 * Exported so Analytics plumbing (and tests) stay in sync with the
 * category configuration.
 */
export function buildConsentSignals(
  preferences: ConsentPreferences,
): Record<GoogleConsentSignal, "granted" | "denied"> {
  return {
    analytics_storage: resolveSignal(preferences, "analytics_storage"),
    ad_storage: "denied",
    ad_user_data: "denied",
    ad_personalization: "denied",
    functionality_storage: "granted",
    personalization_storage: "denied",
    security_storage: "granted",
  };
}

export function applyAnalyticsConsent(preferences: ConsentPreferences) {
  if (typeof window === "undefined") return;
  const w = window as typeof window & { gtag?: GtagConsentFn };
  if (typeof w.gtag !== "function") return;
  w.gtag("consent", "update", buildConsentSignals(preferences));
}

/** Re-export for downstream code that wants the full category list. */
export type { CookieCategory, CookieCategoryId };
export { COOKIE_CATEGORIES };
