import { cn } from "@/lib/cn";

/** Hub / index cards — same lift + shadow as AboutSspMediaInsightsTeaser. */
export const networkHubCard = cn(
  "group/hub relative overflow-hidden rounded-2xl border border-[color:var(--color-border-light)] bg-white p-5",
  "shadow-[var(--shadow-company-card-soft)] transition-all duration-300",
  "motion-safe:hover:-translate-y-0.5 hover:shadow-[var(--shadow-company-card-soft-hover)]",
  "hover:border-[color:var(--color-border-light)]/95",
  "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[color:var(--color-nav-ring)]",
  "focus-visible:ring-offset-2 focus-visible:ring-offset-[color:var(--color-surface-0)]",
);

export const networkHubPriorityP1 = cn(
  "rounded-full border border-[color:var(--color-border-light)]/90",
  "bg-[color:var(--color-surface-1-light)]/90",
  "text-[10px] font-semibold tracking-[0.12em] text-[color:var(--color-menu-accent)] uppercase",
);

export const networkHubPriorityDefault = cn(
  "rounded-full border border-[color:var(--color-border-light)] bg-white",
  "text-[10px] font-semibold tracking-[0.12em] text-[color:var(--color-muted-light)] uppercase",
);

/** Detail: primary content block (lane “built for” + similar). */
export const networkDetailPrimaryCard = cn(
  "group/primary relative overflow-hidden scroll-mt-4",
  "rounded-2xl border border-[color:var(--color-border-light)] bg-white",
  "shadow-[var(--shadow-company-card-soft)] transition-all duration-300",
  "motion-safe:hover:-translate-y-0.5 hover:shadow-[var(--shadow-company-card-soft-hover)]",
);

export const networkDetailHeaderBand = cn(
  "border-b border-[color:var(--color-border-light)]/80",
  "bg-gradient-to-b from-[color:var(--color-surface-0-light)]/95 to-white px-5 py-4 sm:px-6",
);

/** Rounded icon tile — SSP tone (menu accent, not brand red). */
export const networkIconTile = cn(
  "inline-flex h-10 w-10 shrink-0 items-center justify-center rounded-lg",
  "border border-[color:var(--color-border-light)]/90 bg-[color:var(--color-surface-1-light)]",
  "text-[color:var(--color-menu-accent)]",
);

export const networkSectionTitle = "text-base font-semibold tracking-tight text-[color:var(--color-text-strong)]";

export const networkInsetLink = cn(
  "group/row flex min-h-[3.25rem] items-center justify-between gap-3 rounded-xl",
  "border border-[color:var(--color-border-light)]/90 bg-white px-4 py-3.5",
  "text-left text-sm font-medium text-[color:var(--color-text-light)]",
  "transition-all duration-200",
  "hover:border-[color:var(--color-border-light)] hover:bg-[color:var(--color-surface-0-light)]/88",
  "hover:shadow-[0_2px_14px_rgba(2,6,23,0.04)]",
  "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[color:var(--color-nav-ring)]",
  "focus-visible:ring-offset-2 focus-visible:ring-offset-[color:var(--color-surface-0-light)]",
);

export const networkInsetLinkChevron = cn(
  "h-4 w-4 shrink-0 text-[color:var(--color-muted-light)]",
  "transition group-hover/row:translate-x-0.5 group-hover/row:text-[color:var(--color-menu-accent)]",
);

/** Lane list: check in neutral ring with menu-accent glyph. */
export const networkListCheck = cn(
  "mt-0.5 flex h-6 w-6 shrink-0 items-center justify-center rounded-full",
  "border border-[color:var(--color-border-light)]/90 bg-[color:var(--color-surface-1-light)]/95",
  "text-[color:var(--color-menu-accent)]",
);

export const networkSideCard = cn(
  "group/side relative overflow-hidden scroll-mt-4 rounded-2xl border border-[color:var(--color-border-light)]",
  "bg-white p-5 sm:p-6",
  "shadow-[var(--shadow-company-card-soft)] transition-all duration-300",
  "motion-safe:hover:-translate-y-0.5 hover:shadow-[var(--shadow-company-card-soft-hover)]",
);

export const networkCardFooterNote = cn(
  "border-t border-[color:var(--color-border-light)]/70",
  "bg-[color:var(--color-surface-0-light)]/45",
  "px-5 py-3 text-center sm:px-6",
  "text-xs leading-relaxed text-[color:var(--color-muted-light)]",
);
