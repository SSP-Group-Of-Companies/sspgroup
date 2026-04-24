/**
 * Shared Tailwind primitives for the consent banner + preferences modal.
 * Keeps the button/surface language consistent with the locked pages.
 */

export const consentSurface =
  "rounded-2xl border border-[color:var(--color-border-light)]/85 bg-white/95 shadow-[0_28px_70px_-28px_rgba(2,6,23,0.32)] backdrop-blur-[10px]";

export const consentHairline =
  "absolute inset-x-6 top-0 h-px bg-gradient-to-r from-transparent via-[color:var(--color-ssp-cyan-500)]/45 to-transparent";

/**
 * Primary CTA. Uses SSP cyan instead of brand red so the call to action reads
 * as "clean and cool" rather than competing with the red editorial brand
 * signal. Works on both white (modal) and dark (banner) surfaces; the banner
 * overrides `ring-offset` when mounted on the dark variant.
 */
export const consentPrimaryButton =
  "inline-flex h-10 items-center justify-center rounded-md bg-[color:var(--color-ssp-cyan-500)] px-4 text-[12.5px] font-semibold text-white shadow-[0_8px_22px_color-mix(in_srgb,var(--color-ssp-cyan-500)_28%,transparent)] transition-colors hover:bg-[color:var(--color-ssp-cyan-600)] focus:outline-none focus-visible:ring-2 focus-visible:ring-[color:var(--color-ssp-cyan-500)] focus-visible:ring-offset-2 focus-visible:ring-offset-white";

export const consentOutlineButton =
  "inline-flex h-10 items-center justify-center rounded-md border border-[color:var(--color-border-light)] bg-white px-4 text-[12.5px] font-semibold text-[color:var(--color-text-strong)] transition-colors hover:bg-[color:var(--color-surface-0-light)] focus:outline-none focus-visible:ring-2 focus-visible:ring-[color:var(--color-ssp-cyan-500)] focus-visible:ring-offset-2 focus-visible:ring-offset-white";

export const consentGhostButton =
  "inline-flex h-9 items-center justify-center rounded-md px-3 text-[12.5px] font-semibold text-[color:var(--color-muted)] transition-colors hover:text-[color:var(--color-text-strong)] focus:outline-none focus-visible:ring-2 focus-visible:ring-[color:var(--color-ssp-cyan-500)] focus-visible:ring-offset-2 focus-visible:ring-offset-white";

/* ─────────────── Dark-surface variants (used by the banner) ─────────────── */

/**
 * Secondary CTA on the dark consent banner. Ghost-on-navy with a soft white
 * border that brightens on hover — companion to the cyan primary.
 */
export const consentDarkOutlineButton =
  "inline-flex h-10 items-center justify-center rounded-md border border-white/20 bg-transparent px-4 text-[12.5px] font-semibold text-white transition-colors hover:border-white/40 hover:bg-white/[0.06] focus:outline-none focus-visible:ring-2 focus-visible:ring-[color:var(--color-ssp-cyan-500)] focus-visible:ring-offset-2 focus-visible:ring-offset-[color:var(--color-ssp-ink-900)]";

/**
 * Tertiary "Customize" action styled as a footer-style text link:
 * white copy with a cyan hairline that sweeps in on hover/focus.
 */
export const consentDarkLinkButton =
  "relative inline-flex h-10 items-center pb-0.5 px-1 text-[12.5px] font-semibold text-white/80 transition-colors duration-200 after:absolute after:right-1 after:left-1 after:bottom-2 after:h-[1.5px] after:origin-left after:scale-x-0 after:bg-[color:var(--color-ssp-cyan-500)] after:transition-transform after:duration-300 after:ease-[cubic-bezier(0.22,1,0.36,1)] hover:text-white hover:after:scale-x-100 focus-visible:text-white focus-visible:after:scale-x-100 focus:outline-none focus-visible:ring-2 focus-visible:ring-[color:var(--color-ssp-cyan-500)] focus-visible:ring-offset-2 focus-visible:ring-offset-[color:var(--color-ssp-ink-900)]";

export const consentToggleTrack =
  "relative inline-flex h-6 w-11 shrink-0 cursor-pointer items-center rounded-full border border-transparent bg-[color:var(--color-surface-0-light)] transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-[color:var(--color-ssp-cyan-500)] focus-visible:ring-offset-2 focus-visible:ring-offset-white";

export const consentToggleKnob =
  "inline-block h-5 w-5 translate-x-0.5 transform rounded-full bg-white shadow-[0_1px_4px_rgba(2,6,23,0.16)] transition-transform duration-200";
