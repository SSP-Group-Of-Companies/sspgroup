/**
 * Shared types for the site search engine.
 */

export type SearchGroupKey =
  | "Shortcuts"
  | "Solutions"
  | "Industries"
  | "Locations"
  | "Lanes"
  | "Company"
  | "Insights"
  | "Careers"
  | "Legal";

/** A single indexable document — one row per destination in the site. */
export type SearchDoc = {
  /** Stable id — usually href; unique per doc (anchors differentiate home sections). */
  id: string;
  label: string;
  href: string;
  description?: string;
  /** Free-form body text that should influence ranking but not appear in the UI. */
  body?: string;
  keywords: readonly string[];
  group: SearchGroupKey;
  /** Higher = more likely to surface at parity (shortcuts, P1 lanes, core hubs). */
  priority: number;
};

/** Result surfaced to the UI. Stable shape — keep backward compatible. */
export type SiteSearchResult = {
  label: string;
  href: string;
  description?: string;
  keywords: readonly string[];
  group: SearchGroupKey;
  score: number;
};

export type SearchOptions = {
  limit?: number;
  /** If provided, results whose href shares this path family get a small boost. */
  currentPath?: string | null;
};
