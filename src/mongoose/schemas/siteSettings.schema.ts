import { Schema } from "mongoose";
import type { ISiteSettings } from "@/types/siteSettings.types";

export const GLOBAL_SITE_SETTINGS_KEY = "global";

export const siteSettingsSchema = new Schema<ISiteSettings>(
  {
    singletonKey: {
      type: String,
      required: true,
      unique: true,
      index: true,
      default: GLOBAL_SITE_SETTINGS_KEY,
    },
    driverHiringModalEnabled: {
      type: Boolean,
      default: false,
    },
  },
  {
    timestamps: true,
    toJSON: { virtuals: true },
    toObject: { virtuals: true },
  },
);
