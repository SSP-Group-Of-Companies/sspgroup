import { NextRequest } from "next/server";

import connectDB from "@/lib/utils/connectDB";
import { errorResponse, successResponse } from "@/lib/utils/apiResponse";
import { guard } from "@/lib/utils/auth/authUtils";
import { parseJsonBody } from "@/lib/utils/reqParser";
import { SiteSettingsModel } from "@/mongoose/models/SiteSettings";
import { GLOBAL_SITE_SETTINGS_KEY } from "@/mongoose/schemas/siteSettings.schema";
import {
  DEFAULT_SITE_ANNOUNCEMENT,
  normalizeSiteAnnouncementTone,
} from "@/types/siteSettings.types";
import type { ISiteAnnouncementSettings } from "@/types/siteSettings.types";

type PatchBody = {
  driverHiringModalEnabled?: boolean;
  siteAnnouncement?: Partial<ISiteAnnouncementSettings>;
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

function isSafeAnnouncementUrl(value: string) {
  if (!value) return true;
  if (value.startsWith("#")) return true;
  if (value.startsWith("/") && !value.startsWith("//")) return true;
  try {
    const url = new URL(value);
    return url.protocol === "http:" || url.protocol === "https:";
  } catch {
    return false;
  }
}

function normalizeSiteAnnouncement(
  value: Partial<ISiteAnnouncementSettings>,
): ISiteAnnouncementSettings | Response {
  const enabled = !!value.enabled;
  const tone = normalizeSiteAnnouncementTone(
    value.tone !== undefined ? value.tone : DEFAULT_SITE_ANNOUNCEMENT.tone,
  );
  const message = String(value.message || "").trim();
  const linkText = String(value.linkText || "").trim();
  const linkUrl = String(value.linkUrl || "").trim();
  if (message.length > 220) {
    return errorResponse(400, "siteAnnouncement.message must be 220 characters or fewer");
  }
  if (enabled && !message) {
    return errorResponse(400, "siteAnnouncement.message is required when enabled");
  }
  if (linkText.length > 80) {
    return errorResponse(400, "siteAnnouncement.linkText must be 80 characters or fewer");
  }
  if (linkUrl.length > 500) {
    return errorResponse(400, "siteAnnouncement.linkUrl must be 500 characters or fewer");
  }
  if ((linkText && !linkUrl) || (!linkText && linkUrl)) {
    return errorResponse(400, "Both siteAnnouncement.linkText and linkUrl are required for a link");
  }
  if (!isSafeAnnouncementUrl(linkUrl)) {
    return errorResponse(400, "siteAnnouncement.linkUrl must be a relative path or http(s) URL");
  }

  return { enabled, tone, message, linkText, linkUrl };
}

export const GET = async () => {
  try {
    await connectDB();
    await guard();

    const doc = await SiteSettingsModel.findOne({ singletonKey: GLOBAL_SITE_SETTINGS_KEY }).lean();

    return successResponse(200, "OK", {
      driverHiringModalEnabled: !!(doc as { driverHiringModalEnabled?: boolean } | null)
        ?.driverHiringModalEnabled,
      siteAnnouncement: readSiteAnnouncement(doc),
      updatedAt: (doc as { updatedAt?: Date } | null)?.updatedAt ?? null,
    });
  } catch (err) {
    return errorResponse(err);
  }
};

export const PATCH = async (req: NextRequest) => {
  try {
    await connectDB();
    await guard();

    const body = await parseJsonBody<PatchBody>(req);

    if (
      body?.driverHiringModalEnabled !== undefined &&
      typeof body.driverHiringModalEnabled !== "boolean"
    ) {
      return errorResponse(400, "driverHiringModalEnabled must be a boolean");
    }
    if (
      body?.siteAnnouncement !== undefined &&
      (!body.siteAnnouncement || typeof body.siteAnnouncement !== "object")
    ) {
      return errorResponse(400, "siteAnnouncement must be an object");
    }

    const patch: Record<string, unknown> = {};
    if (body?.driverHiringModalEnabled !== undefined) {
      patch.driverHiringModalEnabled = body.driverHiringModalEnabled;
    }
    if (body?.siteAnnouncement !== undefined) {
      const normalized = normalizeSiteAnnouncement(body.siteAnnouncement);
      if (normalized instanceof Response) return normalized;
      patch.siteAnnouncement = normalized;
    }

    if (!Object.keys(patch).length) {
      return errorResponse(400, "No valid fields to update");
    }

    const updated = await SiteSettingsModel.findOneAndUpdate(
      { singletonKey: GLOBAL_SITE_SETTINGS_KEY },
      {
        $set: patch,
        $setOnInsert: { singletonKey: GLOBAL_SITE_SETTINGS_KEY },
      },
      { new: true, upsert: true, setDefaultsOnInsert: true },
    ).lean();

    return successResponse(200, "Site settings updated", {
      driverHiringModalEnabled: !!(updated as { driverHiringModalEnabled?: boolean })
        ?.driverHiringModalEnabled,
      siteAnnouncement: readSiteAnnouncement(updated),
      updatedAt: (updated as { updatedAt?: Date })?.updatedAt ?? null,
    });
  } catch (err) {
    return errorResponse(err);
  }
};
