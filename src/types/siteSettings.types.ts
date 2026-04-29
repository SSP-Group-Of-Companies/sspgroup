export const SITE_ANNOUNCEMENT_TONES = ["info", "danger"] as const;

export type SiteAnnouncementTone = (typeof SITE_ANNOUNCEMENT_TONES)[number];

/** Only `info` and `danger` are supported; legacy values map to `info`. */
export function normalizeSiteAnnouncementTone(raw: unknown): SiteAnnouncementTone {
  const t = String(raw ?? "")
    .trim()
    .toLowerCase();
  if (t === "danger") return "danger";
  return "info";
}

export interface ISiteAnnouncementSettings {
  enabled: boolean;
  tone: SiteAnnouncementTone;
  message: string;
  linkText?: string;
  linkUrl?: string;
}

export const DEFAULT_SITE_ANNOUNCEMENT: ISiteAnnouncementSettings = {
  enabled: false,
  tone: "info",
  message: "",
  linkText: "",
  linkUrl: "",
};

export interface ISiteSettings {
  singletonKey: string;
  driverHiringModalEnabled: boolean;
  siteAnnouncement: ISiteAnnouncementSettings;
  createdAt?: Date;
  updatedAt?: Date;
}
