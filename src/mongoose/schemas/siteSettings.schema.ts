import { Schema } from "mongoose";
import { SITE_ANNOUNCEMENT_TONES } from "@/types/siteSettings.types";
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
    siteAnnouncement: {
      enabled: {
        type: Boolean,
        default: false,
      },
      tone: {
        type: String,
        enum: SITE_ANNOUNCEMENT_TONES,
        default: "info",
      },
      message: {
        type: String,
        default: "",
        trim: true,
      },
      linkText: {
        type: String,
        default: "",
        trim: true,
      },
      linkUrl: {
        type: String,
        default: "",
        trim: true,
      },
    },
  },
  {
    timestamps: true,
    toJSON: { virtuals: true },
    toObject: { virtuals: true },
  },
);
