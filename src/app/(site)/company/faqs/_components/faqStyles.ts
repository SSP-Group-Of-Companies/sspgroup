import type { CSSProperties } from "react";

export const FOCUS_RING_DARK =
  "focus:outline-none focus-visible:ring-2 focus-visible:ring-white/40 focus-visible:ring-offset-2 focus-visible:ring-offset-[color:var(--color-company-ink)]";

export const FOCUS_RING_LIGHT =
  "focus:outline-none focus-visible:ring-2 focus-visible:ring-[color:var(--color-nav-ring)] focus-visible:ring-offset-2 focus-visible:ring-offset-[color:var(--color-surface-0-light)]";

export const NOISE_BG =
  "url(\"data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E\")";

export const FAQ_HERO_SHARD_MASK_STYLE: CSSProperties = {
  background:
    "linear-gradient(162deg, rgba(255,255,255,0.9) 0%, rgba(147,197,253,0.86) 50%, rgba(59,130,246,0.6) 100%)",
  WebkitMaskImage: "url('/_optimized/company/ssp-shard-mask.svg')",
  maskImage: "url('/_optimized/company/ssp-shard-mask.svg')",
  WebkitMaskRepeat: "no-repeat",
  maskRepeat: "no-repeat",
  WebkitMaskPosition: "center",
  maskPosition: "center",
  WebkitMaskSize: "contain",
  maskSize: "contain",
};

export const FAQ_HERO_SHARD_FADE_STYLE: CSSProperties = {
  WebkitMaskImage:
    "linear-gradient(136deg, rgba(0,0,0,0.02) 0%, rgba(0,0,0,0.16) 32%, rgba(0,0,0,0.86) 63%, #000 100%)",
  maskImage:
    "linear-gradient(136deg, rgba(0,0,0,0.02) 0%, rgba(0,0,0,0.16) 32%, rgba(0,0,0,0.86) 63%, #000 100%)",
};
