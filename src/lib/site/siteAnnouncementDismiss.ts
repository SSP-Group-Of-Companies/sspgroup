import type { ISiteAnnouncementSettings } from "@/types/siteSettings.types";

/** Cookie: dismissed for this browser session only; value must match `revision` to stay dismissed. */
export const SITE_ANNOUNCEMENT_DISMISS_COOKIE = "ssp_site_ann_dismiss";

/** Stable fingerprint for the active banner payload so a new announcement clears old dismissals. */
export function getSiteAnnouncementRevision(a: ISiteAnnouncementSettings): string {
  const payload = [
    a.enabled ? "1" : "0",
    a.tone,
    String(a.message ?? "").trim(),
    String(a.linkText ?? "").trim(),
    String(a.linkUrl ?? "").trim(),
  ].join("\u001f");

  let h = 2166136261;
  for (let i = 0; i < payload.length; i += 1) {
    h ^= payload.charCodeAt(i);
    h = Math.imul(h, 16777619);
  }
  return (h >>> 0).toString(36);
}

export function parseAnnouncementDismissCookie(raw: string | undefined): {
  revision: string;
  dismissed: boolean;
} | null {
  if (!raw) return null;
  let decoded = raw;
  try {
    decoded = decodeURIComponent(raw);
  } catch {
    /* use raw */
  }
  const idx = decoded.indexOf("|");
  if (idx <= 0) return null;
  const revision = decoded.slice(0, idx);
  const flag = decoded.slice(idx + 1);
  if (!revision || flag !== "1") return null;
  return { revision, dismissed: true };
}
