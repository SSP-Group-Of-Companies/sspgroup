/**
 * Shared constants for desktop and mobile nav.
 * Single source of truth for a11y, layout, and breakpoint alignment with Tailwind lg (1024px).
 */

/** Header height in px. Used for search panel offset. */
export const HEADER_HEIGHT_PX = 72;

/** Match Tailwind lg so mobile menu closes when desktop nav is shown. */
export const NAV_DESKTOP_MEDIA_QUERY = "(min-width: 1024px)";

/** Focus ring for nav bar (dark theme). */
export const focusRingNav =
  "focus:outline-none focus-visible:ring-2 focus-visible:ring-[color:var(--color-nav-ring)] focus-visible:ring-offset-0";

/** Focus ring for menu panels (light theme). */
export const focusRingMenu =
  "focus:outline-none focus-visible:ring-2 focus-visible:ring-[color:var(--color-menu-ring)] focus-visible:ring-offset-0";
