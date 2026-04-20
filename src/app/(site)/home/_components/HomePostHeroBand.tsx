import type { ReactNode } from "react";

/**
 * Single neutral “platform” under the hero: credibility + routing read as one
 * composition (platform tint vs white cards, atmospheric bridge from hero, soft internal rhythm).
 */
export function HomePostHeroBand({ children }: { children: ReactNode }) {
  return (
    <div className="relative overflow-hidden border-b border-[color:var(--color-border-light-soft)] bg-[color:var(--color-home-post-hero-platform)]">
      {/* Bridge: a breath of hero ink + whisper cyan — reads as continuity, not a new page */}
      <div
        className="pointer-events-none absolute inset-x-0 top-0 h-[6rem] bg-gradient-to-b from-[color:var(--color-company-ink)]/[0.12] via-[color:var(--color-company-ink)]/[0.04] to-transparent sm:h-[6.75rem]"
        aria-hidden
      />
      <div
        className="pointer-events-none absolute inset-x-0 top-0 h-44 bg-[radial-gradient(ellipse_95%_72%_at_50%_-8%,var(--color-section-glow-brand),transparent_58%)]"
        aria-hidden
      />
      <div className="relative z-[1]">{children}</div>
    </div>
  );
}
