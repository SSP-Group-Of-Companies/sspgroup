/**
 * Shared Tailwind primitives for the consent banner + preferences modal.
 * Keeps the button/surface language consistent with the locked pages.
 */

export const consentSurface =
  "rounded-2xl border border-[color:var(--color-border-light)]/85 bg-white/95 shadow-[0_28px_70px_-28px_rgba(2,6,23,0.32)] backdrop-blur-[10px]";

export const consentHairline =
  "absolute inset-x-6 top-0 h-px bg-gradient-to-r from-transparent via-[color:var(--color-ssp-cyan-500)]/45 to-transparent";

export const consentPrimaryButton =
  "inline-flex h-10 items-center justify-center rounded-md bg-[color:var(--color-brand-600)] px-4 text-[12.5px] font-semibold text-white shadow-[0_8px_22px_color-mix(in_srgb,var(--color-brand-500)_22%,transparent)] transition-colors hover:bg-[color:var(--color-brand-700)] focus:outline-none focus-visible:ring-2 focus-visible:ring-[color:var(--color-brand-500)] focus-visible:ring-offset-2 focus-visible:ring-offset-white";

export const consentOutlineButton =
  "inline-flex h-10 items-center justify-center rounded-md border border-[color:var(--color-border-light)] bg-white px-4 text-[12.5px] font-semibold text-[color:var(--color-text-strong)] transition-colors hover:bg-[color:var(--color-surface-0-light)] focus:outline-none focus-visible:ring-2 focus-visible:ring-[color:var(--color-ssp-cyan-500)] focus-visible:ring-offset-2 focus-visible:ring-offset-white";

export const consentGhostButton =
  "inline-flex h-9 items-center justify-center rounded-md px-3 text-[12.5px] font-semibold text-[color:var(--color-muted)] transition-colors hover:text-[color:var(--color-text-strong)] focus:outline-none focus-visible:ring-2 focus-visible:ring-[color:var(--color-ssp-cyan-500)] focus-visible:ring-offset-2 focus-visible:ring-offset-white";

export const consentToggleTrack =
  "relative inline-flex h-6 w-11 shrink-0 cursor-pointer items-center rounded-full border border-transparent bg-[color:var(--color-surface-0-light)] transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-[color:var(--color-ssp-cyan-500)] focus-visible:ring-offset-2 focus-visible:ring-offset-white";

export const consentToggleKnob =
  "inline-block h-5 w-5 translate-x-0.5 transform rounded-full bg-white shadow-[0_1px_4px_rgba(2,6,23,0.16)] transition-transform duration-200";
