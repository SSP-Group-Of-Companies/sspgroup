import { normalizeSiteAnnouncementTone } from "@/types/siteSettings.types";
import type { ISiteAnnouncementSettings } from "@/types/siteSettings.types";

export type AdminSiteSettings = {
  driverHiringModalEnabled: boolean;
  siteAnnouncement: ISiteAnnouncementSettings;
  updatedAt: string | null;
};

function readSiteAnnouncement(data: unknown): ISiteAnnouncementSettings {
  const source =
    data && typeof data === "object" && "siteAnnouncement" in data
      ? (data as { siteAnnouncement?: Partial<ISiteAnnouncementSettings> }).siteAnnouncement
      : null;

  return {
    enabled: !!source?.enabled,
    tone: normalizeSiteAnnouncementTone(source?.tone),
    message: String(source?.message || ""),
    linkText: String(source?.linkText || ""),
    linkUrl: String(source?.linkUrl || ""),
  };
}

export async function adminFetchSiteSettings(): Promise<AdminSiteSettings> {
  const res = await fetch("/api/v1/admin/site-settings", { method: "GET" });
  const json = await res.json().catch(() => ({}));
  if (!res.ok) throw new Error(json?.message || "Failed to load site settings");
  const d = json?.data ?? {};
  return {
    driverHiringModalEnabled: !!d.driverHiringModalEnabled,
    siteAnnouncement: readSiteAnnouncement(d),
    updatedAt: d.updatedAt ? String(d.updatedAt) : null,
  };
}

export async function adminPatchSiteSettings(patch: {
  driverHiringModalEnabled?: boolean;
  siteAnnouncement?: ISiteAnnouncementSettings;
}): Promise<AdminSiteSettings> {
  const res = await fetch("/api/v1/admin/site-settings", {
    method: "PATCH",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(patch),
  });
  const json = await res.json().catch(() => ({}));
  if (!res.ok) throw new Error(json?.message || "Failed to update site settings");
  const d = json?.data ?? {};
  return {
    driverHiringModalEnabled: !!d.driverHiringModalEnabled,
    siteAnnouncement: readSiteAnnouncement(d),
    updatedAt: d.updatedAt ? String(d.updatedAt) : null,
  };
}
