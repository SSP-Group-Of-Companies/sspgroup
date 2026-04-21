import { NextRequest } from "next/server";

import connectDB from "@/lib/utils/connectDB";
import { errorResponse, successResponse } from "@/lib/utils/apiResponse";
import { guard } from "@/lib/utils/auth/authUtils";
import { parseJsonBody } from "@/lib/utils/reqParser";
import { SiteSettingsModel } from "@/mongoose/models/SiteSettings";
import { GLOBAL_SITE_SETTINGS_KEY } from "@/mongoose/schemas/siteSettings.schema";

type PatchBody = {
  driverHiringModalEnabled?: boolean;
};

export const GET = async () => {
  try {
    await connectDB();
    await guard();

    const doc = await SiteSettingsModel.findOne({ singletonKey: GLOBAL_SITE_SETTINGS_KEY }).lean();

    return successResponse(200, "OK", {
      driverHiringModalEnabled: !!(doc as { driverHiringModalEnabled?: boolean } | null)
        ?.driverHiringModalEnabled,
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

    const patch: Record<string, unknown> = {};
    if (body?.driverHiringModalEnabled !== undefined) {
      patch.driverHiringModalEnabled = body.driverHiringModalEnabled;
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
      updatedAt: (updated as { updatedAt?: Date })?.updatedAt ?? null,
    });
  } catch (err) {
    return errorResponse(err);
  }
};
