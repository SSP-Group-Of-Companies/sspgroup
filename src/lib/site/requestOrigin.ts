import "server-only";

import { headers } from "next/headers";

import { SITE_URL } from "@/lib/seo/site";

/** Origin for the active HTTP request (SSR). Falls back to SITE_URL when headers are incomplete. */
export async function getRequestSiteOrigin(): Promise<string> {
  const hdrs = await headers();
  const proto = (hdrs.get("x-forwarded-proto") || "").split(",")[0].trim();
  const host = (hdrs.get("x-forwarded-host") || hdrs.get("host") || "").split(",")[0].trim();
  if (proto && host) return `${proto}://${host}`;
  if (host) return `${host.includes("localhost") ? "http" : "https"}://${host}`;
  return SITE_URL;
}
