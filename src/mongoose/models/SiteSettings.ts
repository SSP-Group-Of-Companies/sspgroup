import mongoose, { Model } from "mongoose";
import type { ISiteSettings } from "@/types/siteSettings.types";
import { siteSettingsSchema } from "@/mongoose/schemas/siteSettings.schema";

export const SiteSettingsModel: Model<ISiteSettings> =
  (mongoose.models.SiteSettings as Model<ISiteSettings>) ||
  mongoose.model<ISiteSettings>("SiteSettings", siteSettingsSchema);
