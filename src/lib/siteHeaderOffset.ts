/**
 * Live height of the sticky site header (including utility row when expanded).
 * Prefer this over a fixed px constant so in-page scroll aligns under the real header.
 */
export function getSiteHeaderOffset(): number {
  if (typeof window === "undefined") return 0;
  const header = document.querySelector("[data-site-header]") as HTMLElement | null;
  if (header) {
    const rect = header.getBoundingClientRect();
    return Math.max(0, rect.height || 0);
  }
  const mainbar = document.querySelector("[data-header-mainbar]") as HTMLElement | null;
  if (mainbar) {
    const rect = mainbar.getBoundingClientRect();
    return Math.max(0, rect.height || 0);
  }
  return 0;
}
