// src/lib/utils/jobs/jobLocationLabels.ts
import type { JobLocation } from "@/types/jobPosting.types";

function str(v: unknown): string {
  return typeof v === "string" ? v.trim() : "";
}

/** One location: label, else city, else region, else country (matches legacy careers UI). */
export function formatJobLocationLabel(loc?: JobLocation | null): string {
  if (!loc) return "";
  return str(loc.label) || str(loc.city) || str(loc.region) || str(loc.country) || "";
}

/** All locations separated by pipes so commas inside a single location stay unambiguous. */
export function formatJobLocationsDisplay(locations?: JobLocation[] | null): string {
  if (!Array.isArray(locations) || locations.length === 0) return "—";
  const parts = locations.map(formatJobLocationLabel).filter(Boolean);
  return parts.length ? parts.join(" | ") : "—";
}
