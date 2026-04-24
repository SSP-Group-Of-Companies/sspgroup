/**
 * Text normalization helpers used by the site search engine.
 *
 * The goal is to produce stable, comparable string representations
 * so user queries and indexed documents score consistently regardless
 * of case, punctuation, diacritics, or minor suffix variation.
 */

/** Lowercase, strip diacritics, drop non-word punctuation, collapse whitespace. */
export function normalize(value: string): string {
  if (!value) return "";
  return value
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .toLowerCase()
    .replace(/[^\w\s&+/-]/g, " ")
    .replace(/\s+/g, " ")
    .trim();
}

/** Collapse all whitespace and hyphens — `"cross-border"` ↔ `"crossborder"`. */
export function compact(value: string): string {
  return normalize(value).replace(/[\s-]+/g, "");
}

/** Split a string into lowercase, diacritic-free tokens. */
export function tokenize(value: string): string[] {
  const n = normalize(value);
  if (!n) return [];
  return n
    .split(/[\s/&+-]+/)
    .map((t) => t.trim())
    .filter(Boolean);
}

/**
 * Lightweight English stemmer — strips common inflections.
 * Conservative to avoid collisions (eg. "cross" stays "cross").
 */
export function stem(word: string): string {
  if (word.length <= 3) return word;
  const endings = [
    "ational",
    "tional",
    "ization",
    "ations",
    "ating",
    "ation",
    "ings",
    "ing",
    "edly",
    "ied",
    "ies",
    "ers",
    "er",
    "est",
    "ly",
    "es",
    "ed",
    "s",
  ];
  for (const suffix of endings) {
    if (word.endsWith(suffix) && word.length - suffix.length >= 3) {
      return word.slice(0, -suffix.length);
    }
  }
  return word;
}

export function uniq<T>(items: readonly T[]): T[] {
  return Array.from(new Set(items));
}
