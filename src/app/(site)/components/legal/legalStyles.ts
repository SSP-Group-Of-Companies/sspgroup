/**
 * Legal/policy shared styles — token-driven and consistent with the locked
 * FAQ and network hero patterns. Keeps the legal surface calm, precise,
 * and obviously first-class rather than an afterthought.
 */

import type { CSSProperties } from "react";

export const LEGAL_HERO_SURFACE = [
  "linear-gradient(135deg,",
  "var(--color-company-hero-midnight-start) 0%,",
  "var(--color-company-ink) 48%,",
  "var(--color-company-hero-midnight-end) 100%)",
].join(" ");

/**
 * Subtle horizon grid motif — replaces the heavy shard on legal pages so
 * the eye stays on the title. Token-driven where possible; the rgba/hex
 * values below are decorative-only and intentionally muted.
 */
export const LEGAL_HERO_GRID_STYLE: CSSProperties = {
  backgroundImage:
    "linear-gradient(to right, rgba(255,255,255,0.045) 1px, transparent 1px)," +
    "linear-gradient(to bottom, rgba(255,255,255,0.045) 1px, transparent 1px)",
  backgroundSize: "52px 52px",
  maskImage:
    "radial-gradient(120% 100% at 100% 0%, black 0%, rgba(0,0,0,0.6) 52%, transparent 82%)",
  WebkitMaskImage:
    "radial-gradient(120% 100% at 100% 0%, black 0%, rgba(0,0,0,0.6) 52%, transparent 82%)",
};

/**
 * Ink badge background used for the "Last updated" chip in the hero.
 * Keeps the chip consistent with the dark surface palette.
 */
export const LEGAL_HERO_CHIP =
  "inline-flex items-center gap-2 rounded-full border border-white/14 bg-white/6 px-3 py-1 text-[11px] font-semibold uppercase tracking-[0.14em] text-white/75";
