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
