/**
 * Damerau–Levenshtein edit distance with adjacent-transposition support.
 *
 * Used for typo tolerance in the site search engine. Two-row dynamic
 * programming to keep memory O(min(|a|, |b|)).
 */

export function damerauLevenshtein(a: string, b: string): number {
  if (a === b) return 0;
  if (!a.length) return b.length;
  if (!b.length) return a.length;

  // Ensure `a` is the shorter string → smaller column count.
  if (a.length > b.length) [a, b] = [b, a];

  const prev = new Array<number>(a.length + 1);
  const cur = new Array<number>(a.length + 1);
  const prev2 = new Array<number>(a.length + 1);

  for (let i = 0; i <= a.length; i++) prev[i] = i;

  for (let j = 1; j <= b.length; j++) {
    cur[0] = j;
    for (let i = 1; i <= a.length; i++) {
      const cost = a[i - 1] === b[j - 1] ? 0 : 1;
      cur[i] = Math.min(
        cur[i - 1] + 1, // insertion
        prev[i] + 1, // deletion
        prev[i - 1] + cost, // substitution
      );
      if (
        i > 1 &&
        j > 1 &&
        a[i - 1] === b[j - 2] &&
        a[i - 2] === b[j - 1]
      ) {
        cur[i] = Math.min(cur[i], prev2[i - 2] + 1); // transposition
      }
    }
    for (let i = 0; i <= a.length; i++) {
      prev2[i] = prev[i];
      prev[i] = cur[i];
    }
  }

  return prev[a.length];
}

/**
 * Acceptable edit distance for a term based on its length.
 *   len ≤ 3 → no fuzzy (too noisy)
 *   len 4-5 → 1 edit
 *   len 6-9 → up to 2 edits
 *   len ≥ 10 → up to 3 edits
 */
export function fuzzyThreshold(term: string): number {
  const len = term.length;
  if (len <= 3) return 0;
  if (len <= 5) return 1;
  if (len <= 9) return 2;
  return 3;
}

/** Returns true if `term` is within the fuzzy threshold of `candidate`. */
export function isFuzzyMatch(term: string, candidate: string): boolean {
  const threshold = fuzzyThreshold(term);
  if (threshold === 0) return false;
  if (Math.abs(term.length - candidate.length) > threshold) return false;
  return damerauLevenshtein(term, candidate) <= threshold;
}
