/**
 * Site search scoring engine.
 *
 * Given a user query, expands freight-industry synonyms, applies
 * multi-tier scoring across each indexed document (exact → prefix →
 * substring → synonym → stem → fuzzy), and returns a ranked result set
 * grouped by destination type.
 *
 * Tuning the weights in `WEIGHTS` directly shifts ranking; the tests
 * in `queries.test` style (see manual scenarios) are the source of
 * truth for "expected" behavior.
 */

import { SEARCH_DOCS, SEARCH_VOCABULARY } from "./buildIndex";
import { normalize, compact, tokenize, stem } from "./normalize";
import { expandQueryTerms, expandToken } from "./synonyms";
import {
  damerauLevenshtein,
  fuzzyThreshold,
  isFuzzyMatch,
} from "./fuzzy";
import type { SearchDoc, SiteSearchResult, SearchOptions } from "./types";

const WEIGHTS = {
  labelExact: 240,
  labelCompactExact: 220,
  labelStartsWith: 140,
  labelIncludesPhrase: 95,
  descIncludesPhrase: 32,
  keywordExactPhrase: 180,
  keywordPhraseSynonym: 150,
  keywordIncludesPhrase: 60,
  keywordSynonymExact: 100,
  keywordSynonymPrefix: 60,
  // Per-term contributions
  termLabelExactToken: 40,
  termLabelPrefixToken: 26,
  termLabelIncludes: 14,
  termKeywordExact: 30,
  termKeywordPrefix: 18,
  termKeywordIncludes: 10,
  termDescIncludes: 5,
  termHrefIncludes: 3,
  termStemMatch: 8,
  termFuzzyLabelToken: 14,
  termFuzzyKeyword: 10,
  // Global
  priorityFactor: 0.55,
  contextBoost: 18,
} as const;

/* ─────────────────────────────────────────────────────────────────────
 * Doc-level cached tokens. Built lazily once per doc.
 * ──────────────────────────────────────────────────────────────────── */

type DocCache = {
  labelN: string;
  labelCompact: string;
  labelTokens: string[];
  labelTokenStems: string[];
  descN: string;
  hrefN: string;
  keyN: string[];
  keyCompact: string[];
  keyStems: string[];
  keyTokens: string[];
  bodyN: string;
};

const cacheBySearchDocId = new WeakMap<SearchDoc, DocCache>();

function getCache(d: SearchDoc): DocCache {
  const cached = cacheBySearchDocId.get(d);
  if (cached) return cached;

  const labelN = normalize(d.label);
  const descN = normalize(d.description ?? "");
  const hrefN = normalize(d.href);
  const bodyN = normalize(d.body ?? "");

  const labelTokens = tokenize(d.label);
  const labelTokenStems = labelTokens.map(stem);

  const keyN = d.keywords.map(normalize).filter(Boolean);
  const keyCompact = keyN.map(compact);
  const keyTokensSet = new Set<string>();
  for (const k of keyN) {
    for (const t of k.split(/\s+/)) if (t) keyTokensSet.add(t);
  }
  const keyTokens = Array.from(keyTokensSet);
  const keyStems = keyTokens.map(stem);

  const built: DocCache = {
    labelN,
    labelCompact: compact(d.label),
    labelTokens,
    labelTokenStems,
    descN,
    hrefN,
    keyN,
    keyCompact,
    keyStems,
    keyTokens,
    bodyN,
  };
  cacheBySearchDocId.set(d, built);
  return built;
}

/* ─────────────────────────────────────────────────────────────────────
 * Context-family detection — boost docs that share the current section
 * ──────────────────────────────────────────────────────────────────── */

function pathFamily(path: string | null | undefined): string | null {
  if (!path) return null;
  const clean = path.split("?")[0].split("#")[0];
  const segments = clean.split("/").filter(Boolean);
  if (!segments.length) return null;
  return `/${segments[0]}`;
}

function isContextMatch(doc: SearchDoc, family: string | null): boolean {
  if (!family) return false;
  return doc.href.startsWith(family) && doc.href !== family;
}

/* ─────────────────────────────────────────────────────────────────────
 * Per-term scoring — runs once per (doc, term).
 * ──────────────────────────────────────────────────────────────────── */

function scoreTermAgainstDoc(term: string, cache: DocCache): number {
  if (!term) return 0;
  let score = 0;
  const termStem = stem(term);

  // Label-token level
  for (const token of cache.labelTokens) {
    if (token === term) score += WEIGHTS.termLabelExactToken;
    else if (token.startsWith(term) && term.length >= 2) score += WEIGHTS.termLabelPrefixToken;
  }
  if (cache.labelN.includes(term)) score += WEIGHTS.termLabelIncludes;

  // Keyword level
  for (const k of cache.keyN) {
    if (k === term) {
      score += WEIGHTS.termKeywordExact;
    } else if (k.startsWith(term) && term.length >= 2) {
      score += WEIGHTS.termKeywordPrefix;
    } else if (k.includes(term)) {
      score += WEIGHTS.termKeywordIncludes;
    }
  }

  if (cache.descN.includes(term)) score += WEIGHTS.termDescIncludes;
  if (cache.bodyN.includes(term)) score += WEIGHTS.termDescIncludes;
  if (cache.hrefN.includes(term)) score += WEIGHTS.termHrefIncludes;

  // Stem match (catches "quotes" ↔ "quote", "trucking" ↔ "truck")
  if (termStem && termStem !== term) {
    for (const s of cache.labelTokenStems) if (s === termStem) { score += WEIGHTS.termStemMatch; break; }
    for (const s of cache.keyStems) if (s === termStem) { score += WEIGHTS.termStemMatch; break; }
  }

  // Fuzzy fallback — only if we haven't matched anything cleanly already
  if (score === 0 && term.length >= 4) {
    for (const token of cache.labelTokens) {
      if (Math.abs(token.length - term.length) <= fuzzyThreshold(term) && isFuzzyMatch(term, token)) {
        score += WEIGHTS.termFuzzyLabelToken;
        break;
      }
    }
    if (score === 0) {
      for (const k of cache.keyTokens) {
        if (Math.abs(k.length - term.length) <= fuzzyThreshold(term) && isFuzzyMatch(term, k)) {
          score += WEIGHTS.termFuzzyKeyword;
          break;
        }
      }
    }
  }

  return score;
}

/* ─────────────────────────────────────────────────────────────────────
 * Phrase-level scoring (full query against label/description/keywords)
 * ──────────────────────────────────────────────────────────────────── */

function scorePhraseAgainstDoc(
  phraseN: string,
  phraseCompact: string,
  cache: DocCache,
  phraseSynonyms: readonly string[],
): number {
  if (!phraseN) return 0;
  let score = 0;

  if (cache.labelN === phraseN) score += WEIGHTS.labelExact;
  if (cache.labelCompact === phraseCompact) score += WEIGHTS.labelCompactExact;
  if (cache.labelN.startsWith(phraseN)) score += WEIGHTS.labelStartsWith;
  else if (cache.labelN.includes(phraseN)) score += WEIGHTS.labelIncludesPhrase;

  if (cache.descN.includes(phraseN)) score += WEIGHTS.descIncludesPhrase;

  for (const k of cache.keyN) {
    if (k === phraseN) {
      score += WEIGHTS.keywordExactPhrase;
    } else if (k.includes(phraseN)) {
      score += WEIGHTS.keywordIncludesPhrase;
    }
  }

  for (const k of cache.keyCompact) {
    if (k === phraseCompact) score += WEIGHTS.keywordSynonymExact;
  }

  // Synonym-based phrase matches (e.g. user types "cold chain" → doc keyword "reefer")
  for (const syn of phraseSynonyms) {
    if (!syn || syn === phraseN) continue;
    for (const k of cache.keyN) {
      if (k === syn) {
        score += WEIGHTS.keywordPhraseSynonym;
        break;
      }
      if (k.includes(syn)) {
        score += WEIGHTS.keywordSynonymPrefix;
        break;
      }
    }
    if (cache.labelN.includes(syn)) score += WEIGHTS.keywordSynonymPrefix;
  }

  return score;
}

/* ─────────────────────────────────────────────────────────────────────
 * Public scoring entrypoint
 * ──────────────────────────────────────────────────────────────────── */

export function searchDocs(query: string, options: SearchOptions = {}): SiteSearchResult[] {
  const limit = options.limit ?? 10;
  const phraseN = normalize(query);
  if (!phraseN) return [];

  const phraseCompact = compact(phraseN);
  const phraseSynonyms = Array.from(expandQueryTerms(phraseN));
  const tokens = tokenize(phraseN);

  // Expanded per-term pool — each original token plus all synonym aliases.
  const termPool = new Set<string>();
  for (const t of tokens) {
    for (const alias of expandToken(t)) {
      for (const piece of alias.split(/\s+/).filter(Boolean)) {
        termPool.add(piece);
      }
    }
  }

  const family = pathFamily(options.currentPath);

  const scored: { doc: SearchDoc; score: number }[] = [];
  for (const d of SEARCH_DOCS) {
    const cache = getCache(d);

    let score = scorePhraseAgainstDoc(phraseN, phraseCompact, cache, phraseSynonyms);

    for (const term of termPool) {
      score += scoreTermAgainstDoc(term, cache);
    }

    if (score === 0) continue;

    score += d.priority * WEIGHTS.priorityFactor;
    if (isContextMatch(d, family)) score += WEIGHTS.contextBoost;

    scored.push({ doc: d, score });
  }

  scored.sort((a, b) => {
    if (b.score !== a.score) return b.score - a.score;
    // Tiebreak: shorter labels (more specific) win, then alphabetical.
    const ca = getCache(a.doc);
    const cb = getCache(b.doc);
    if (ca.labelN.length !== cb.labelN.length) return ca.labelN.length - cb.labelN.length;
    return ca.labelN.localeCompare(cb.labelN);
  });

  const seen = new Set<string>();
  const results: SiteSearchResult[] = [];
  for (const row of scored) {
    const id = row.doc.href;
    if (seen.has(id)) continue;
    seen.add(id);
    results.push({
      label: row.doc.label,
      href: row.doc.href,
      description: row.doc.description,
      keywords: row.doc.keywords,
      group: row.doc.group,
      score: row.score,
    });
    if (results.length >= limit) break;
  }

  return results;
}

/* ─────────────────────────────────────────────────────────────────────
 * "Did you mean …" — nearest vocabulary term to a failed query
 * ──────────────────────────────────────────────────────────────────── */

export function suggestNearest(query: string): string | null {
  const q = normalize(query);
  if (!q || q.length < 4) return null;
  const threshold = fuzzyThreshold(q);
  if (threshold === 0) return null;

  let best: { term: string; distance: number } | null = null;
  for (const candidate of SEARCH_VOCABULARY) {
    if (Math.abs(candidate.length - q.length) > threshold) continue;
    const distance = damerauLevenshtein(q, candidate);
    if (distance > threshold) continue;
    if (!best || distance < best.distance) {
      best = { term: candidate, distance };
      if (distance === 1) break;
    }
  }

  if (!best || best.term === q) return null;
  return best.term;
}
