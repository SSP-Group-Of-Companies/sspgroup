import "server-only";

import connectDB from "@/lib/utils/connectDB";
import { guard } from "@/lib/utils/auth/authUtils";
import { SiteSettingsModel } from "@/mongoose/models/SiteSettings";
import { GLOBAL_SITE_SETTINGS_KEY } from "@/mongoose/schemas/siteSettings.schema";
import { normalizeSiteAnnouncementTone } from "@/types/siteSettings.types";
import type { ISiteAnnouncementSettings } from "@/types/siteSettings.types";

export type AdminSiteSettingsSnapshot = {
  driverHiringModalEnabled: boolean;
  siteAnnouncement: ISiteAnnouncementSettings;
  updatedAt: string | null;
};

function readSiteAnnouncement(doc: unknown): ISiteAnnouncementSettings {
  const source =
    doc && typeof doc === "object" && "siteAnnouncement" in doc
      ? (doc as { siteAnnouncement?: Partial<ISiteAnnouncementSettings> }).siteAnnouncement
      : null;
  return {
    enabled: !!source?.enabled,
    tone: normalizeSiteAnnouncementTone(source?.tone),
    message: String(source?.message || ""),
    linkText: String(source?.linkText || ""),
    linkUrl: String(source?.linkUrl || ""),
  };
}

export async function getAdminSiteSettings(): Promise<AdminSiteSettingsSnapshot> {
  await connectDB();
  await guard();

  const doc = await SiteSettingsModel.findOne({ singletonKey: GLOBAL_SITE_SETTINGS_KEY }).lean();

  return {
    driverHiringModalEnabled: !!(doc as { driverHiringModalEnabled?: boolean } | null)
      ?.driverHiringModalEnabled,
    siteAnnouncement: readSiteAnnouncement(doc),
    updatedAt: (doc as { updatedAt?: Date } | null)?.updatedAt?.toISOString() ?? null,
  };
}
