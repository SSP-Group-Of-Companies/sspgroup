import { errorResponse, successResponse } from "@/lib/utils/apiResponse";
import { getPublicSiteSettings } from "@/lib/siteSettings/getSiteSettings";

/** Public read-only snapshot for marketing modals & site chrome (no auth). */
export const GET = async () => {
  try {
    const settings = await getPublicSiteSettings();
    return successResponse(200, "OK", settings);
  } catch (err) {
    return errorResponse(err);
  }
};
