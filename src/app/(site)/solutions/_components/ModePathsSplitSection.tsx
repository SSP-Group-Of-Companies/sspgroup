"use client";

import type { CSSProperties } from "react";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { motion, useReducedMotion, type Variants } from "framer-motion";
import { Container } from "@/app/(site)/components/layout/Container";
import { SectionSignalEyebrow } from "@/app/(site)/components/ui/SectionSignalEyebrow";
import { SITE_SECTION_H2_LIGHT, SITE_SECTION_LEDE_LIGHT } from "@/app/(site)/components/ui/siteSectionHeading";
import { SectionImage } from "@/components/media/SectionImage";
import { trackCtaClick } from "@/lib/analytics/cta";
import type { SolutionFamilyLandingCard, SolutionFamilyLandingPageData } from "@/config/solutionFamilyPages";
import { cn } from "@/lib/cn";

const TL_MODE_IMAGE = "/_optimized/solution/truckload/TL-mode-Img.png";
const LTL_MODE_IMAGE = "/_optimized/solution/ltl/LTL-mode-Img.png";

function modePathImageSrc(key: string): string {
  return key === "ltl" ? LTL_MODE_IMAGE : TL_MODE_IMAGE;
}

/** Fallback art for four-up grids when a card has no `imageSrc` (e.g. Managed Logistics). */
function quadrantPlaceholderImageSrc(index: number): string {
  return index % 2 === 0 ? TL_MODE_IMAGE : LTL_MODE_IMAGE;
}

function resolveQuadrantImageSrc(item: SolutionFamilyLandingCard, fallbackIndex: number): string {
  return item.imageSrc ?? quadrantPlaceholderImageSrc(fallbackIndex);
}

function resolvePathAccent(item: SolutionFamilyLandingCard, fallbackAccent = "var(--family-accent)"): string {
  return item.accentColor ?? fallbackAccent;
}

function pathAccentStyle(accent: string): CSSProperties {
  return { ["--path-accent" as string]: accent } as CSSProperties;
}

const pathCtaClass = cn(
  "mt-1.5 relative inline-flex w-fit items-center gap-1.5 pb-0.5 text-[12.5px] font-semibold tracking-[0.06em]",
  "text-[color:var(--color-menu-title)] transition-colors duration-200 sm:mt-2",
  "after:absolute after:right-0 after:-bottom-0.5 after:left-0 after:h-[1.5px] after:origin-left after:scale-x-0",
  "after:bg-[color:var(--path-accent)] after:transition-transform after:duration-300 after:ease-[cubic-bezier(0.22,1,0.36,1)]",
  "group-hover:text-[color:var(--path-accent)] group-hover:after:scale-x-100",
  "group-focus-within:text-[color:var(--path-accent)] group-focus-within:after:scale-x-100",
);

type ModePathsTrackLocation = "mode_paths" | "service_paths";

function modePathsTrackLocation(page: SolutionFamilyLandingPageData, scope: ModePathsTrackLocation): string {
  const base = page.slug.replace(/-/g, "_");
  return scope === "service_paths" ? `${base}_service_paths` : `${base}_mode_paths`;
}

/* ─── Branch composition ────────────────────────────────────────── */

function BranchComposition({
  item,
  edge,
  imageSrc,
  revealUp,
  reduceMotion,
  analyticsLocation,
}: {
  item: SolutionFamilyLandingCard;
  edge: "leading" | "trailing";
  imageSrc: string;
  revealUp: Variants;
  reduceMotion: boolean;
  analyticsLocation: string;
}) {
  const isLeading = edge === "leading";
  const pathAccent = resolvePathAccent(item);

  const frameScale = isLeading
    ? "max-lg:scale-[1.08] max-lg:sm:scale-[1.11] lg:scale-[1.32] xl:scale-[1.36]"
    : "max-lg:scale-[1] max-lg:sm:scale-[1.03] lg:scale-[1.12] xl:scale-[1.14]";
  const framePullToCenter = isLeading
    ? "max-lg:translate-x-[2%] max-lg:sm:translate-x-[3%] lg:translate-x-[10%] xl:translate-x-[11.5%]"
    : "translate-x-0 lg:translate-x-[-10%] xl:translate-x-[-11.5%]";

  const ctaLabel = item.ctaLabel ?? "View details";

  return (
    <motion.article
      variants={revealUp}
      transition={{ duration: reduceMotion ? 0 : 0.35, ease: [0.22, 1, 0.36, 1] }}
      style={pathAccentStyle(pathAccent)}
      className={cn(
        "group relative isolate min-h-0 overflow-visible bg-transparent",
        isLeading &&
          "max-lg:border-b max-lg:border-[color:var(--color-border-light-soft)] max-lg:pb-10 sm:max-lg:pb-12",
        !isLeading && "max-lg:pt-8 sm:max-lg:pt-10",
      )}
    >
      {/* Inner-edge demarcation only (toward pair center) — no top/left/bottom box */}
      <div
        className={cn(
          "pointer-events-none absolute z-[15] hidden w-px transition-opacity duration-500 lg:block lg:opacity-100 lg:group-hover:opacity-[0.16] lg:group-focus-within:opacity-[0.16]",
          isLeading ? "top-[5%] bottom-[14%] right-0" : "top-[5%] bottom-[14%] left-0",
        )}
        style={{
          background:
            "linear-gradient(180deg, transparent 0%, color-mix(in srgb, var(--color-border-light) 52%, transparent) 18%, color-mix(in srgb, var(--color-border-light) 40%, transparent) 50%, color-mix(in srgb, var(--color-border-light) 52%, transparent) 82%, transparent 100%)",
        }}
        aria-hidden
      />
      {/* Hover / focus-within: soft accent glare on that same edge — Apple-like “selected” read */}
      <div
        className={cn(
          "pointer-events-none absolute z-[15] hidden opacity-0 transition-[opacity,filter] duration-500 ease-out group-hover:opacity-100 group-focus-within:opacity-100 lg:block",
          isLeading ? "top-[4%] bottom-[12%] right-0 w-px" : "top-[4%] bottom-[12%] left-0 w-px",
        )}
        style={{
          background:
            "linear-gradient(180deg, transparent 0%, color-mix(in srgb, var(--path-accent) 38%, white) 42%, color-mix(in srgb, var(--path-accent) 24%, white) 50%, color-mix(in srgb, var(--path-accent) 38%, white) 58%, transparent 100%)",
          boxShadow: isLeading
            ? "3px 0 16px -3px color-mix(in srgb, var(--path-accent) 12%, transparent)"
            : "-3px 0 16px -3px color-mix(in srgb, var(--path-accent) 12%, transparent)",
        }}
        aria-hidden
      />
      <div
        className="pointer-events-none absolute inset-x-0 inset-y-[4%] z-0 opacity-0 transition-opacity duration-500 ease-[cubic-bezier(0.22,1,0.36,1)] group-hover:opacity-[0.78] group-focus-within:opacity-[0.78] max-lg:hidden"
        style={{
          background:
            "radial-gradient(122% 92% at 50% 46%, color-mix(in srgb, var(--path-accent) 8.5%, white) 0%, color-mix(in srgb, var(--path-accent) 3.2%, transparent) 44%, transparent 78%)",
        }}
        aria-hidden
      />

      {/* Truck — relative, drives height via aspect ratio */}
      <div className="relative z-[2] aspect-[16/10.5] sm:aspect-[16/10] lg:aspect-[16/9]">
        <div
          className={cn(
            "absolute inset-0 will-change-transform transition-transform duration-500 ease-[cubic-bezier(0.22,1,0.36,1)]",
            framePullToCenter,
            frameScale,
            "origin-bottom",
            "motion-safe:group-hover:translate-y-[-0.3%]",
          )}
        >
          <SectionImage
            fill
            src={imageSrc}
            alt={
              item.imageAlt ??
              (isLeading
                ? "Semi-truck with dry van trailer representing dedicated truckload capacity"
                : "Box truck with palletized freight representing consolidated less-than-truckload service")
            }
            sizes="(min-width: 1280px) 52vw, (min-width: 1024px) 50vw, (min-width: 640px) 90vw, 92vw"
            quality={86}
            surfaceTone="none"
            wrapperClassName="h-full w-full overflow-visible"
            className={cn(
              "object-contain transition-transform duration-500 ease-[cubic-bezier(0.22,1,0.36,1)] motion-safe:group-hover:scale-[1.006]",
              isLeading ? "object-left-bottom" : "object-right-bottom",
            )}
          />
        </div>
      </div>

      {/* Copy — pulled into the frame so type reads with the truck, not below a caption band */}
      <div
        className={cn(
          "relative z-10 w-full text-left",
          "flex flex-col items-start gap-1 sm:gap-1.5 lg:gap-1.5",
          "[&>h3]:max-w-[26rem] [&>span]:max-w-[26rem]",
          isLeading ? "mr-auto" : null,
          "-mt-9 max-lg:-mt-8 sm:-mt-11 lg:-mt-[4.75rem] xl:-mt-[5.25rem]",
          "max-lg:px-0",
          isLeading
            ? "max-lg:pl-0 lg:pl-[12%] lg:pr-0 xl:pl-[11%]"
            : "max-lg:pl-0 lg:pl-[14%] lg:pr-3 xl:pl-[15%] xl:pr-4",
        )}
      >
        <h3 className="text-[1.45rem] font-semibold leading-[1.08] tracking-tight text-[color:var(--color-text-strong)] sm:text-[1.6rem] lg:text-[1.88rem] lg:text-[color:var(--color-text-light)] xl:text-[2.08rem]">
          {item.title}
        </h3>
        <p className="w-full max-w-[26rem] text-[15px] leading-[1.82] text-[color:var(--color-muted)] sm:text-[15.5px] lg:text-[color:var(--color-muted-light)]">
          {item.description}
        </p>
        {item.ctaLabel ? (
          <span className={pathCtaClass}>
            {item.ctaLabel}
            <ArrowRight className="h-3.5 w-3.5 transition-transform duration-300 motion-safe:group-hover:translate-x-0.5" />
          </span>
        ) : null}
      </div>

      {/* Full-branch hit target — entire half navigates (no nested link) */}
      {item.href ? (
        <Link
          href={item.href}
          className={cn(
            "absolute inset-0 z-20 cursor-pointer rounded-sm outline-none",
            "focus-visible:ring-2 focus-visible:ring-[color:var(--family-accent)] focus-visible:ring-offset-2 max-lg:focus-visible:ring-offset-white lg:focus-visible:ring-offset-transparent",
          )}
          aria-label={`${item.title}. ${ctaLabel}`}
          onClick={() =>
            trackCtaClick({
              ctaId: `mode-path-${item.key}`,
              location: analyticsLocation,
              destination: item.href,
              label: ctaLabel,
            })
          }
        />
      ) : null}
    </motion.article>
  );
}

type Quadrant = "tl" | "tr" | "bl" | "br";

function QuadrantBranchComposition({
  item,
  quadrant,
  imageSrc,
  revealUp,
  reduceMotion,
  analyticsLocation,
  mobileShowDividerBelow,
}: {
  item: SolutionFamilyLandingCard;
  quadrant: Quadrant;
  imageSrc: string;
  revealUp: Variants;
  reduceMotion: boolean;
  analyticsLocation: string;
  mobileShowDividerBelow: boolean;
}) {
  const ctaLabel = item.ctaLabel ?? "View details";
  const pathAccent = resolvePathAccent(item);

  const innerVertical = cn(
    "pointer-events-none absolute z-[15] hidden w-px transition-opacity duration-500 lg:block lg:opacity-100 lg:group-hover:opacity-[0.14] lg:group-focus-within:opacity-[0.14]",
    quadrant === "tl" || quadrant === "bl" ? "top-[6%] bottom-[12%] right-0" : "top-[6%] bottom-[12%] left-0",
  );
  const innerHorizontal = cn(
    "pointer-events-none absolute z-[15] hidden h-px transition-opacity duration-500 lg:block lg:opacity-100 lg:group-hover:opacity-[0.14] lg:group-focus-within:opacity-[0.14]",
    quadrant === "tl" || quadrant === "tr" ? "bottom-0 left-[6%] right-[6%]" : "top-0 left-[6%] right-[6%]",
  );

  const glareVertical = cn(
    "pointer-events-none absolute z-[15] hidden opacity-0 transition-[opacity,filter] duration-500 ease-out group-hover:opacity-100 group-focus-within:opacity-100 lg:block",
    quadrant === "tl" || quadrant === "bl"
      ? "top-[5%] bottom-[10%] right-0 w-px"
      : "top-[5%] bottom-[10%] left-0 w-px",
  );
  const glareHorizontal = cn(
    "pointer-events-none absolute z-[15] hidden opacity-0 transition-[opacity,filter] duration-500 ease-out group-hover:opacity-100 group-focus-within:opacity-100 lg:block",
    quadrant === "tl" || quadrant === "tr"
      ? "bottom-0 left-[5%] right-[5%] h-px"
      : "top-0 left-[5%] right-[5%] h-px",
  );

  const imageObject =
    quadrant === "tl" || quadrant === "bl" ? "object-left-bottom" : "object-right-bottom";

  /* Four-up: full breakout width (same shell as Core Freight); scales still below half-truck peak (~1.32). */
  const frameScale =
    quadrant === "tl"
      ? "max-lg:scale-[1] max-lg:sm:scale-[1.03] lg:scale-[1.11] xl:scale-[1.16]"
      : quadrant === "tr"
        ? "max-lg:scale-[0.98] max-lg:sm:scale-[1.01] lg:scale-[1.08] xl:scale-[1.13]"
        : quadrant === "bl"
          ? item.key === "hazmat"
            ? "max-lg:scale-[0.98] max-lg:sm:scale-[1.005] lg:scale-[1.015] xl:scale-[1.05]"
            : "max-lg:scale-[0.98] max-lg:sm:scale-[1.005] lg:scale-[1.06] xl:scale-[1.11]"
          : "max-lg:scale-[0.96] max-lg:sm:scale-[0.985] lg:scale-[1.04] xl:scale-[1.09]";

  /* Match `BranchComposition` framePullToCenter so copy pl-[12%]/[14%]… locks to truck mass like Core Freight (weaker nudge made type look inset vs bumper). */
  const frameNudge =
    quadrant === "tl"
      ? "max-lg:translate-x-[2%] max-lg:sm:translate-x-[3%] lg:translate-x-[10%] xl:translate-x-[11.5%]"
      : quadrant === "tr"
        ? "max-lg:-translate-x-[2%] max-lg:sm:-translate-x-[3%] lg:-translate-x-[10%] xl:-translate-x-[11.5%]"
        : quadrant === "bl"
          ? item.key === "hazmat"
            ? "max-lg:translate-x-[2%] max-lg:sm:translate-x-[3%] lg:translate-x-[5.75%] xl:translate-x-[6.75%]"
            : "max-lg:translate-x-[2%] max-lg:sm:translate-x-[3%] lg:translate-x-[10%] xl:translate-x-[11.5%]"
          : "max-lg:-translate-x-[2%] max-lg:sm:-translate-x-[3%] lg:-translate-x-[10%] xl:-translate-x-[11.5%]";

  const lineGradient =
    "linear-gradient(180deg, transparent 0%, color-mix(in srgb, var(--color-border-light) 52%, transparent) 18%, color-mix(in srgb, var(--color-border-light) 40%, transparent) 50%, color-mix(in srgb, var(--color-border-light) 52%, transparent) 82%, transparent 100%)";
  const lineGradientH =
    "linear-gradient(90deg, transparent 0%, color-mix(in srgb, var(--color-border-light) 52%, transparent) 18%, color-mix(in srgb, var(--color-border-light) 40%, transparent) 50%, color-mix(in srgb, var(--color-border-light) 52%, transparent) 82%, transparent 100%)";

  const glareV =
    "linear-gradient(180deg, transparent 0%, color-mix(in srgb, var(--path-accent) 42%, white) 42%, color-mix(in srgb, var(--path-accent) 28%, white) 50%, color-mix(in srgb, var(--path-accent) 42%, white) 58%, transparent 100%)";
  const glareH =
    "linear-gradient(90deg, transparent 0%, color-mix(in srgb, var(--path-accent) 42%, white) 42%, color-mix(in srgb, var(--path-accent) 28%, white) 50%, color-mix(in srgb, var(--path-accent) 42%, white) 58%, transparent 100%)";

  const verticalGlareShadow =
    quadrant === "tl" || quadrant === "bl"
      ? "3px 0 14px -3px color-mix(in srgb, var(--path-accent) 11%, transparent)"
      : "-3px 0 14px -3px color-mix(in srgb, var(--path-accent) 11%, transparent)";

  const horizontalGlareShadow =
    quadrant === "tl" || quadrant === "tr"
      ? "0 3px 14px -3px color-mix(in srgb, var(--path-accent) 9%, transparent)"
      : "0 -3px 14px -3px color-mix(in srgb, var(--path-accent) 9%, transparent)";

  return (
    <motion.article
      variants={revealUp}
      transition={{ duration: reduceMotion ? 0 : 0.35, ease: [0.22, 1, 0.36, 1] }}
      style={pathAccentStyle(pathAccent)}
      className={cn(
        "group relative isolate min-h-0 overflow-visible bg-transparent",
        mobileShowDividerBelow &&
          "max-lg:border-b max-lg:border-[color:var(--color-border-light-soft)] max-lg:pb-12 sm:max-lg:pb-14",
      )}
    >
      <div className={innerVertical} style={{ background: lineGradient }} aria-hidden />
      <div className={innerHorizontal} style={{ background: lineGradientH }} aria-hidden />

      <div
        className={glareVertical}
        style={{
          background: glareV,
          boxShadow: verticalGlareShadow,
        }}
        aria-hidden
      />
      <div
        className={glareHorizontal}
        style={{
          background: glareH,
          boxShadow: horizontalGlareShadow,
        }}
        aria-hidden
      />
      <div
        className="pointer-events-none absolute inset-x-0 inset-y-[3%] z-0 opacity-0 transition-opacity duration-500 ease-[cubic-bezier(0.22,1,0.36,1)] group-hover:opacity-[0.74] group-focus-within:opacity-[0.74] max-lg:hidden"
        style={{
          background:
            "radial-gradient(120% 90% at 50% 44%, color-mix(in srgb, var(--path-accent) 7.5%, white) 0%, color-mix(in srgb, var(--path-accent) 2.8%, transparent) 42%, transparent 76%)",
        }}
        aria-hidden
      />

      {/* Clip to cell; inset art box toward the inner cross on desktop — Hazmat (bl) needs more gutter than Expedited (tl) so the tanker clears the vertical rule like the top row. */}
      <div className="relative z-[2] aspect-[16/10.45] sm:aspect-[16/9.95] lg:aspect-[16/9.2] overflow-hidden">
        <div
          className={cn(
            "absolute inset-0 will-change-transform transition-transform duration-500 ease-[cubic-bezier(0.22,1,0.36,1)]",
            quadrant === "tl"
              ? "lg:inset-y-0 lg:left-0 lg:right-[4.25%] xl:right-[3.75%]"
              : quadrant === "bl"
                ? "lg:inset-y-0 lg:left-0 lg:right-[7.25%] xl:right-[6.5%]"
                : quadrant === "tr"
                  ? "lg:inset-y-0 lg:right-0 lg:left-[4.25%] xl:left-[3.75%]"
                  : "lg:inset-y-0 lg:right-0 lg:left-[5.25%] xl:left-[4.75%]",
            frameNudge,
            frameScale,
            "origin-bottom",
            "motion-safe:group-hover:translate-y-[-0.25%]",
          )}
        >
          <SectionImage
            fill
            src={imageSrc}
            alt={item.imageAlt ?? `Illustration for ${item.title}`}
            sizes="(min-width: 1280px) 36vw, (min-width: 1024px) 40vw, (min-width: 640px) 92vw, 94vw"
            quality={86}
            surfaceTone="none"
            wrapperClassName="h-full w-full overflow-hidden"
            className={cn(
              "object-contain transition-transform duration-500 ease-[cubic-bezier(0.22,1,0.36,1)] motion-safe:group-hover:scale-[1.006]",
              imageObject,
            )}
          />
        </div>
      </div>

      {/* Copy inset matches `BranchComposition` (leading / trailing) so type lines up with truck art like Core Freight. */}
      <div
        className={cn(
          "relative z-10 w-full text-left",
          "flex flex-col items-start gap-0.5 sm:gap-1",
          "[&>h3]:max-w-[24rem] [&>span]:max-w-[24rem]",
          "-mt-5 max-lg:-mt-4 sm:-mt-8 lg:-mt-[3rem] xl:-mt-[3.35rem]",
          "max-lg:px-0",
          "pb-5 sm:pb-6 lg:pb-8",
          quadrant === "tl" || quadrant === "bl"
            ? "max-lg:pl-0 lg:pl-[12%] lg:pr-0 xl:pl-[11%]"
            : "max-lg:pl-0 lg:pl-[14%] lg:pr-3 xl:pl-[15%] xl:pr-4",
        )}
      >
        <h3 className="text-[1.24rem] font-semibold leading-[1.09] tracking-tight text-[color:var(--color-text-strong)] sm:text-[1.3rem] lg:text-[1.4rem] lg:text-[color:var(--color-text-light)] xl:text-[1.54rem]">
          {item.title}
        </h3>
        <p className="w-full max-w-[24rem] text-[14.25px] leading-[1.78] text-[color:var(--color-muted)] sm:text-[14.5px] lg:text-[color:var(--color-muted-light)]">
          {item.description}
        </p>
        {item.ctaLabel ? (
          <span className={cn(pathCtaClass, "text-[12px]")}>
            {item.ctaLabel}
            <ArrowRight className="h-3.5 w-3.5 transition-transform duration-300 motion-safe:group-hover:translate-x-0.5" />
          </span>
        ) : null}
      </div>

      {item.href ? (
        <Link
          href={item.href}
          className={cn(
            "absolute inset-0 z-20 cursor-pointer rounded-sm outline-none",
            "focus-visible:ring-2 focus-visible:ring-[color:var(--family-accent)] focus-visible:ring-offset-2 max-lg:focus-visible:ring-offset-white lg:focus-visible:ring-offset-transparent",
          )}
          aria-label={`${item.title}. ${ctaLabel}`}
          onClick={() =>
            trackCtaClick({
              ctaId: `mode-path-${item.key}`,
              location: analyticsLocation,
              destination: item.href,
              label: ctaLabel,
            })
          }
        />
      ) : null}
    </motion.article>
  );
}

/* ─── Section ───────────────────────────────────────────────────── */

export type ModePathsSplitSectionProps = {
  page: SolutionFamilyLandingPageData;
  /**
   * When set, drives eyebrow/title/description/items (e.g. `branchSection` “Service Paths”).
   * Defaults to `page.signatureSection` (Core Freight two-up).
   */
  contentSection?: Pick<
    NonNullable<SolutionFamilyLandingPageData["signatureSection"]>,
    "eyebrow" | "title" | "description" | "items"
  >;
  /** Landmark id: `signature` (default) or `branch` for service paths. */
  ariaScope?: "signature" | "branch";
};

function resolveModePathsAnalyticsLocation(
  page: SolutionFamilyLandingPageData,
  itemCount: number,
  ariaScope: "signature" | "branch",
): string {
  if (itemCount === 2 && page.slug === "core-freight-modes" && ariaScope === "signature") {
    return "core_freight_modes_mode_paths";
  }
  if (ariaScope === "branch" || itemCount === 4) {
    return modePathsTrackLocation(page, "service_paths");
  }
  return modePathsTrackLocation(page, "mode_paths");
}

/**
 * Editorial mode / service path splits: two-up (Core Freight) or four-up with a center cross.
 * Intro copy stays inside the page container; the visual composition breaks out from it.
 */
export function ModePathsSplitSection({ page, contentSection, ariaScope = "signature" }: ModePathsSplitSectionProps) {
  const reduceMotion = useReducedMotion() ?? false;
  const section = contentSection ?? page.signatureSection;
  if (!section) return null;
  const headingId =
    ariaScope === "branch"
      ? `solution-family-${page.slug}-branch-heading`
      : `solution-family-${page.slug}-signature-heading`;
  const items = section.items;
  const [primary, secondary] = items;

  const stagger: Variants = reduceMotion
    ? { hidden: { opacity: 1 }, show: { opacity: 1 } }
    : { hidden: {}, show: { transition: { staggerChildren: 0.05, delayChildren: 0.03 } } };

  const revealUp: Variants = reduceMotion
    ? { hidden: { opacity: 1, y: 0 }, show: { opacity: 1, y: 0 } }
    : { hidden: { opacity: 1, y: 10 }, show: { opacity: 1, y: 0 } };

  const analyticsLocation = resolveModePathsAnalyticsLocation(page, items.length, ariaScope);

  const isFourUp = items.length === 4;
  const isTwoUp = items.length === 2;

  if (isTwoUp && (!primary || !secondary)) return null;
  if (!isTwoUp && !isFourUp) return null;

  /* Intro matches Core Freight two-up for both layouts (eyebrow, H2, lede). */
  const introPadding = "pt-16 sm:pt-20 lg:pt-24";
  const stagePadding = "pb-12 sm:pb-14 lg:pb-20";
  const stageMarginTop = "mt-6 sm:mt-8 lg:mt-10";

  const introBlock = (
    <motion.div
      initial="hidden"
      whileInView="show"
      viewport={{ once: true, amount: 0.15 }}
      variants={stagger}
    >
      <motion.div
        variants={revealUp}
        transition={{ duration: reduceMotion ? 0 : 0.35, ease: "easeOut" }}
        className="max-w-[48rem]"
      >
        <div className="flex justify-start">
          <SectionSignalEyebrow label={section.eyebrow} accentColor={page.theme.accent} />
        </div>
        <h2
          id={headingId}
          className={cn(SITE_SECTION_H2_LIGHT, "max-sm:text-[1.88rem] max-sm:leading-[1.06]")}
        >
          {section.title}
        </h2>
        <p className={cn(SITE_SECTION_LEDE_LIGHT, "max-sm:text-[15px] max-sm:leading-[1.78]")}>
          {section.description}
        </p>
      </motion.div>
    </motion.div>
  );

  return (
    <section
      aria-labelledby={headingId}
      className="relative overflow-hidden border-b border-[color:var(--color-border-light-soft)]"
    >
      {isFourUp ? (
        <>
          <Container className={cn("site-page-container relative", introPadding)}>{introBlock}</Container>
          <motion.div
            initial="hidden"
            whileInView="show"
            viewport={{ once: true, amount: 0.08 }}
            variants={stagger}
            className={cn("relative w-full overflow-x-clip", stageMarginTop, stagePadding)}
          >
            <div className="relative mx-auto w-full max-w-7xl px-4 sm:px-6 lg:max-w-[82rem] lg:px-0 xl:max-w-[84rem]">
              <div
                className="pointer-events-none absolute inset-0 top-[-1rem]"
                style={{
                  background:
                    "radial-gradient(ellipse 89% 90% at 50% 46.25%, rgba(241,243,245,0.66) 0%, rgba(241,243,245,0.225) 57.5%, transparent 100%)",
                }}
                aria-hidden
              />
              <div className="relative grid max-lg:grid-cols-1 max-lg:gap-0 lg:grid-cols-2 lg:grid-rows-2 lg:gap-0">
                {(
                  [
                    ["tl", items[0]],
                    ["tr", items[1]],
                    ["bl", items[2]],
                    ["br", items[3]],
                  ] as const
                ).map(([q, item], idx) => (
                  <QuadrantBranchComposition
                    key={item.key}
                    item={item}
                    quadrant={q}
                    imageSrc={resolveQuadrantImageSrc(item, idx)}
                    revealUp={revealUp}
                    reduceMotion={reduceMotion}
                    analyticsLocation={analyticsLocation}
                    mobileShowDividerBelow={idx < 3}
                  />
                ))}
              </div>
            </div>
          </motion.div>
        </>
      ) : (
        <>
          <Container className={cn("site-page-container relative", introPadding)}>{introBlock}</Container>
          <motion.div
            initial="hidden"
            whileInView="show"
            viewport={{ once: true, amount: 0.08 }}
            variants={stagger}
            className={cn("relative w-full", stageMarginTop, stagePadding)}
          >
            <div className="relative mx-auto w-full max-w-7xl px-4 sm:px-6 lg:max-w-none lg:px-0 lg:w-[calc(100%-3rem)] xl:w-[calc(100%-4rem)]">
              <div
                className="pointer-events-none absolute inset-0 top-[-1rem]"
                style={{
                  background:
                    "radial-gradient(ellipse 90% 90% at 50% 46%, rgba(241,243,245,0.68) 0%, rgba(241,243,245,0.24) 58%, transparent 100%)",
                }}
                aria-hidden
              />
              <div className="relative grid max-lg:grid-cols-1 max-lg:gap-0 lg:grid-cols-2 lg:gap-0">
                <BranchComposition
                  item={primary}
                  edge="leading"
                  imageSrc={primary.imageSrc ?? modePathImageSrc(primary.key)}
                  revealUp={revealUp}
                  reduceMotion={reduceMotion}
                  analyticsLocation={analyticsLocation}
                />
                <BranchComposition
                  item={secondary}
                  edge="trailing"
                  imageSrc={secondary.imageSrc ?? modePathImageSrc(secondary.key)}
                  revealUp={revealUp}
                  reduceMotion={reduceMotion}
                  analyticsLocation={analyticsLocation}
                />
              </div>
            </div>
          </motion.div>
        </>
      )}
    </section>
  );
}
