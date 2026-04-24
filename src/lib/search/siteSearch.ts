/**
 * Public site-search API.
 *
 * Thin wrapper around the scoring engine — all intelligence lives in
 * `engine.ts`, `buildIndex.ts`, `synonyms.ts`, `fuzzy.ts`, and
 * `normalize.ts`. The header and mobile search UIs depend only on the
 * surface exported here.
 */

import { searchDocs, suggestNearest } from "./engine";
import type {
  SiteSearchResult,
  SearchOptions,
  SearchGroupKey,
} from "./types";

export type { SiteSearchResult, SearchOptions, SearchGroupKey };

/**
 * Return ranked search results for `query`.
 *
 * @param query   Raw user input (no normalization required).
 * @param options Numeric `limit` for result count or an options object
 *                with `limit` and/or `currentPath` (context boost).
 *                The numeric shorthand preserves the legacy signature.
 */
export function getSiteSearchResults(
  query: string,
  options: number | SearchOptions = 10,
): SiteSearchResult[] {
  if (typeof options === "number") {
    return searchDocs(query, { limit: options });
  }
  return searchDocs(query, options);
}

/**
 * Nearest vocabulary term for a query that returned no results.
 * Returns `null` when the query is too short for reliable fuzzy matching
 * or when nothing is within the allowed edit distance.
 */
export function getDidYouMean(query: string): string | null {
  return suggestNearest(query);
}
