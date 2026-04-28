import type { CSSProperties } from "react";

export const NETWORK_HERO_SURFACE = [
  "linear-gradient(135deg,",
  "var(--color-network-hero-surface-start) 0%,",
  "var(--color-company-ink) 42%,",
  "var(--color-network-hero-surface-mid) 66%,",
  "var(--color-network-hero-surface-end) 100%)",
].join(" ");

/** Shard fill tuned toward brand cyan so the mask reads with the network hero surface. */
export const NETWORK_HERO_SHARD_MASK_STYLE: CSSProperties = {
  background:
    "linear-gradient(162deg, rgba(255,255,255,0.55) 0%, color-mix(in srgb, var(--color-ssp-cyan-500) 46%, #ffffff) 45%, color-mix(in srgb, var(--color-ssp-cyan-600) 42%, #000) 100%)",
  WebkitMaskImage: "url('/_optimized/company/ssp-shard-mask.svg')",
  maskImage: "url('/_optimized/company/ssp-shard-mask.svg')",
  WebkitMaskRepeat: "no-repeat",
  maskRepeat: "no-repeat",
  WebkitMaskPosition: "center",
  maskPosition: "center",
  WebkitMaskSize: "contain",
  maskSize: "contain",
};

export const NETWORK_HERO_SHARD_FADE_STYLE: CSSProperties = {
  WebkitMaskImage:
    "linear-gradient(136deg, rgba(0,0,0,0.02) 0%, rgba(0,0,0,0.16) 32%, rgba(0,0,0,0.86) 63%, #000 100%)",
  maskImage:
    "linear-gradient(136deg, rgba(0,0,0,0.02) 0%, rgba(0,0,0,0.16) 32%, rgba(0,0,0,0.86) 63%, #000 100%)",
};

/* ─── Shared “company hero” shard layout (our-history, FAQs, network, etc.)
   Historically these heroes used `right: -45%` + `%` width/height on an
   absolutely positioned mask — that extended past the viewport on phones,
   clipped harshly at `overflow-hidden`, and painted *above* the headline
   because it followed the copy in the DOM without an explicit z-index.

   Pattern: a centered frame matching `.site-page-container` (max 1440px +
   horizontal padding), `overflow-x-hidden`, fixed aspect box sized from
   the mask SVG’s native ratio (1024×1035). Place the frame as `z-0` before
   the content column at `z-10`.

   Extra end padding + modest translate keeps the shard tip inside the clip
   rect (heroes also use `overflow-hidden` on the section). */

/** Matches `.site-page-container` width + padding; clips stray horizontal bleed. */
export const COMPANY_HERO_SHARD_FRAME =
  "pointer-events-none absolute inset-y-0 left-1/2 z-0 w-full max-w-[1440px] -translate-x-1/2 overflow-x-hidden ps-4 pe-12 sm:ps-6 sm:pe-14 md:pe-16 lg:pe-[4.5rem] xl:pe-[5.25rem]";

/** Right-aligns the shard within the frame; vertically centers in the hero band. */
export const COMPANY_HERO_SHARD_FRAME_INNER = "flex h-full min-w-0 items-center justify-end";

/**
 * Masked shard graphic — `ssp-shard-mask.svg` viewBox 1024×1035.
 * Width-only scaling keeps every breakpoint predictable; light `translate-x`
 * nudges the graphic without pushing the tip past `overflow-x-hidden`.
 */
export const COMPANY_HERO_SHARD_BOX =
  "relative aspect-[1024/1035] w-40 shrink-0 translate-x-[3%] sm:w-44 sm:translate-x-[4%] md:w-52 md:translate-x-[5%] lg:w-60 lg:translate-x-[6%] xl:w-72 xl:translate-x-[7%]";
