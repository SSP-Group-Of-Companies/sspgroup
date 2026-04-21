import type { ReactNode } from "react";

/**
 * Single neutral “platform” under the hero: credibility + routing read as one
 * composition (platform tint vs white cards, atmospheric bridge from hero, soft internal rhythm).
 */
export function HomePostHeroBand({ children }: { children: ReactNode }) {
  return (
    <div className="relative overflow-hidden bg-[color:var(--color-home-post-hero-platform)]">
      {/* Bridge: a breath of hero ink — deepened so the platform settles under the hero,
          not beside it. Reads as continuity, not a new page. */}
      <div
        className="pointer-events-none absolute inset-x-0 top-0 h-[7.5rem] bg-gradient-to-b from-[color:var(--color-company-ink)]/[0.18] via-[color:var(--color-company-ink)]/[0.07] to-transparent sm:h-[8.5rem]"
        aria-hidden
      />
      {/* Cyan micro-wash — the hero's signature hairline pools downward into the platform
          for one more breath of brand atmosphere. */}
      <div
        className="pointer-events-none absolute inset-x-0 top-0 h-[4.5rem] sm:h-[5.25rem]"
        style={{
          background:
            "linear-gradient(180deg, color-mix(in srgb, var(--color-ssp-cyan-500) 6%, transparent) 0%, transparent 100%)",
        }}
        aria-hidden
      />
      <div
        className="pointer-events-none absolute inset-x-0 top-0 h-44 bg-[radial-gradient(ellipse_95%_72%_at_50%_-8%,var(--color-section-glow-brand),transparent_58%)]"
        aria-hidden
      />

      <div className="relative z-[1]">{children}</div>

      {/* Soft cyan haze climbing into the hairline — a whisper, not a block */}
      <div
        className="pointer-events-none absolute inset-x-0 bottom-0 z-[2] h-10"
        style={{
          background:
            "linear-gradient(0deg, color-mix(in srgb, var(--color-ssp-cyan-500) 6%, transparent) 0%, transparent 100%)",
        }}
        aria-hidden
      />
      {/* Signature cyan hairline closing the platform — mirrors the hero's mark so the
          handoff into "What SSP Moves" feels authored, not stacked. */}
      <div
        className="pointer-events-none absolute inset-x-0 bottom-0 z-[3] h-px"
        style={{
          background:
            "linear-gradient(90deg, transparent 3%, color-mix(in srgb, var(--color-ssp-cyan-500) 48%, transparent) 50%, transparent 97%)",
        }}
        aria-hidden
      />
    </div>
  );
}
