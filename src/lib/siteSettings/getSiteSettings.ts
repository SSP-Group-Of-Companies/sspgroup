import "server-only";

import connectDB from "@/lib/utils/connectDB";
import { SiteSettingsModel } from "@/mongoose/models/SiteSettings";
import { GLOBAL_SITE_SETTINGS_KEY } from "@/mongoose/schemas/siteSettings.schema";

export type PublicSiteSettings = {
  driverHiringModalEnabled: boolean;
};

export async function getPublicSiteSettings(): Promise<PublicSiteSettings> {
  await connectDB();
  const doc = await SiteSettingsModel.findOne({ singletonKey: GLOBAL_SITE_SETTINGS_KEY }).lean();
  return {
    driverHiringModalEnabled: !!(doc as { driverHiringModalEnabled?: boolean } | null)
      ?.driverHiringModalEnabled,
  };
}
