"use client";

import type { CSSProperties } from "react";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { motion, useReducedMotion, type Variants } from "framer-motion";
import { Container } from "@/app/(site)/components/layout/Container";
import { StandardFinalCta } from "@/app/(site)/components/cta/StandardFinalCta";
import { SectionSignalEyebrow } from "@/app/(site)/components/ui/SectionSignalEyebrow";
import {
  SITE_SECTION_H2_DARK,
  SITE_SECTION_H2_LIGHT,
  SITE_SECTION_LEDE_DARK,
  SITE_SECTION_LEDE_LIGHT,
} from "@/app/(site)/components/ui/siteSectionHeading";
import { ModePathsSplitSection } from "@/app/(site)/solutions/_components/ModePathsSplitSection";
import { SolutionRelatedServicesSection } from "@/app/(site)/solutions/_components/SolutionRelatedServicesSection";
import { SolutionWhenToChooseSection } from "@/app/(site)/solutions/_components/SolutionWhenToChooseSection";
import type { SolutionFamilyLandingPageData } from "@/config/solutionFamilyPages";
import { cn } from "@/lib/cn";

/** Requires ancestor with `--family-accent` (set on `SolutionFamilyLandingPage` root). */
const FAMILY_FOCUS_RING_LIGHT =
  "focus:outline-none focus-visible:ring-2 focus-visible:ring-[color:var(--family-accent)] focus-visible:ring-offset-2 focus-visible:ring-offset-white";

const FOCUS_RING_DARK =
  "focus:outline-none focus-visible:ring-2 focus-visible:ring-white/40 focus-visible:ring-offset-2 focus-visible:ring-offset-[color:var(--color-company-ink)]";

/** Hero shard: fixed widths per breakpoint + SVG viewBox aspect — not % of column height (avoids inconsistent scale across family pages). */
const FAMILY_HERO_SHARD_BOX =
  "relative aspect-[1024/1035] w-44 translate-x-[12%] sm:w-52 sm:translate-x-[14%] lg:w-60 lg:translate-x-[16%] xl:w-72 xl:translate-x-[18%]";

function familyAccentVarStyle(accent: string): CSSProperties {
  return { ["--family-accent" as string]: accent } as CSSProperties;
}

function familySectionHairline(accent: string): CSSProperties {
  return {
    background: `linear-gradient(90deg, transparent 8%, color-mix(in srgb, ${accent} 36%, transparent) 50%, transparent 92%)`,
  };
}

function familySignatureBackground(slug: SolutionFamilyLandingPageData["slug"]): string {
  switch (slug) {
    case "specialized-critical-freight":
      return "linear-gradient(148deg, color-mix(in srgb, var(--color-brand-700) 12%, var(--color-company-ink)) 0%, color-mix(in srgb, var(--color-brand-700) 44%, var(--color-company-ink)) 48%, var(--color-company-ink) 100%)";
    case "managed-logistics":
      return "linear-gradient(148deg, color-mix(in srgb, var(--color-ssp-teal-500) 6%, var(--color-company-ink)) 0%, color-mix(in srgb, var(--color-ssp-teal-500) 28%, var(--color-ssp-ink-900)) 50%, var(--color-company-ink) 100%)";
    case "core-freight-modes":
    default:
      return "linear-gradient(148deg, var(--color-footer-legal-bg) 0%, color-mix(in srgb, var(--color-ssp-cyan-600) 20%, var(--color-ssp-ink-900)) 46%, var(--color-company-ink) 100%)";
  }
}

function familyFinalCtaOrbs(accent: string) {
  return {
    orbMainColor: `color-mix(in srgb, ${accent} 24%, transparent)`,
    orbSecondaryColor: `color-mix(in srgb, ${accent} 11%, transparent)`,
  };
}

function FamilyHero({
  page,
  revealUp,
  stagger,
  reduceMotion,
}: {
  page: SolutionFamilyLandingPageData;
  revealUp: Variants;
  stagger: Variants;
  reduceMotion: boolean;
}) {
  const headingId = `solution-family-${page.slug}-hero-heading`;
  const shardMaskStyle: CSSProperties = {
    background: page.theme.accent,
    WebkitMaskImage: "url('/_optimized/company/ssp-shard-mask.svg')",
    maskImage: "url('/_optimized/company/ssp-shard-mask.svg')",
    WebkitMaskRepeat: "no-repeat",
    maskRepeat: "no-repeat",
    WebkitMaskPosition: "center",
    maskPosition: "center",
    WebkitMaskSize: "contain",
    maskSize: "contain",
    filter: "drop-shadow(0 0 30px rgba(255,255,255,0.06))",
  };
  const shardFadeStyle: CSSProperties = {
    WebkitMaskImage:
      "linear-gradient(136deg, rgba(0,0,0,0.01) 0%, rgba(0,0,0,0.12) 30%, rgba(0,0,0,0.86) 63%, #000 100%)",
    maskImage:
      "linear-gradient(136deg, rgba(0,0,0,0.01) 0%, rgba(0,0,0,0.12) 30%, rgba(0,0,0,0.86) 63%, #000 100%)",
  };

  return (
    <section
      aria-labelledby={headingId}
      className="relative flex min-h-[20rem] flex-col overflow-hidden border-b border-white/10 py-24 sm:min-h-[24rem] sm:py-28 lg:min-h-[26rem] lg:py-36"
      style={{ backgroundColor: page.hero.backgroundColor }}
    >
      <Container className="site-page-container relative z-10 flex flex-1 flex-col justify-center py-2 sm:py-0">
        <motion.div
          initial="hidden"
          animate="show"
          variants={stagger}
          className="relative max-w-[min(100%,42rem)] lg:max-w-[46rem]"
        >
          <motion.div
            variants={revealUp}
            transition={{ duration: reduceMotion ? 0 : 0.32, ease: "easeOut" }}
            className="flex justify-start"
          >
            <SectionSignalEyebrow label={page.hero.eyebrow} light accentColor={page.theme.accent} />
          </motion.div>

          <motion.h1
            id={headingId}
            variants={revealUp}
            transition={{ duration: reduceMotion ? 0 : 0.35, ease: "easeOut" }}
            className="mt-6 text-balance text-[2.2rem] font-bold leading-[1.02] tracking-tight text-white sm:mt-7 sm:text-[2.7rem] lg:mt-8 lg:text-[3.15rem]"
          >
            {page.hero.title}
          </motion.h1>

          <motion.p
            variants={revealUp}
            transition={{ duration: reduceMotion ? 0 : 0.32, ease: "easeOut" }}
            className="mt-5 max-w-[52ch] text-[15px] leading-[1.75] text-white/72 sm:mt-6 sm:text-[15.5px] lg:text-base lg:leading-[1.72]"
          >
            {page.hero.subtitle}
          </motion.p>
        </motion.div>
      </Container>

      <div
        className="pointer-events-none absolute inset-y-0 left-1/2 z-0 w-full max-w-[1440px] -translate-x-1/2 px-4 sm:px-6 lg:px-8"
        aria-hidden
      >
        <div className="flex h-full items-center justify-end">
          <motion.div
            initial={reduceMotion ? { opacity: 0.74 } : { opacity: 0.08, x: -34, y: 20 }}
            animate={reduceMotion ? { opacity: 0.78 } : { opacity: 0.88, x: 0, y: 0 }}
            transition={{ duration: reduceMotion ? 0 : 0.66, ease: [0.22, 1, 0.36, 1] }}
            className={FAMILY_HERO_SHARD_BOX}
            style={shardFadeStyle}
          >
            <div className="h-full w-full" style={shardMaskStyle} />
          </motion.div>
        </div>
      </div>
    </section>
  );
}

function getGridClass(columns: 2 | 3 | 4 | undefined) {
  switch (columns) {
    case 2:
      return "md:grid-cols-2";
    case 4:
      return "md:grid-cols-2 xl:grid-cols-4";
    case 3:
    default:
      return "md:grid-cols-2 xl:grid-cols-3";
  }
}

function FamilySignatureSection({
  page,
  revealUp,
  stagger,
  reduceMotion,
}: {
  page: SolutionFamilyLandingPageData;
  revealUp: Variants;
  stagger: Variants;
  reduceMotion: boolean;
}) {
  if (!page.signatureSection) return null;
  const section = page.signatureSection;
  const headingId = `solution-family-${page.slug}-signature-heading`;
  const [primary, secondary] = section.items;

  if (page.slug === "core-freight-modes" && section.variant === "split-branches" && primary && secondary) {
    return <ModePathsSplitSection page={page} />;
  }

  if (section.variant === "split-branches" && primary && secondary) {
    return (
      <section
        aria-labelledby={headingId}
        className="relative overflow-hidden border-b border-white/10"
        style={{ background: familySignatureBackground(page.slug) }}
      >
        <div className="pointer-events-none absolute inset-0" aria-hidden>
          <div
            className="absolute inset-0"
            style={{
              background: `radial-gradient(46% 40% at 86% 14%, color-mix(in srgb, ${page.theme.accent} 20%, transparent), transparent 70%)`,
            }}
          />
          <div
            className="absolute inset-0 opacity-[0.02]"
            style={{
              backgroundImage:
                "url(\"data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E\")",
            }}
          />
        </div>

        <Container className="site-page-container relative py-24 sm:py-28 lg:pt-32 lg:pb-28">
          <motion.div
            initial="hidden"
            whileInView="show"
            viewport={{ once: true, amount: 0.12 }}
            variants={stagger}
          >
            <motion.div variants={revealUp} transition={{ duration: reduceMotion ? 0 : 0.35, ease: "easeOut" }}>
              <div className="flex justify-start">
                <SectionSignalEyebrow label={section.eyebrow} light accentColor={page.theme.accent} />
              </div>
              <h2 id={headingId} className={SITE_SECTION_H2_DARK}>
                {section.title}
              </h2>
              <p className={SITE_SECTION_LEDE_DARK}>{section.description}</p>
            </motion.div>

            <div className="mt-12 grid gap-6 lg:mt-16 lg:grid-cols-[minmax(0,1.12fr)_minmax(0,auto)_minmax(0,0.88fr)] lg:items-stretch lg:gap-0">
              <motion.article
                variants={revealUp}
                transition={{ duration: reduceMotion ? 0 : 0.38, ease: "easeOut" }}
                className="relative overflow-hidden rounded-2xl border border-white/16 bg-[linear-gradient(180deg,rgba(255,255,255,0.1),rgba(255,255,255,0.05))] px-6 py-8 backdrop-blur-sm sm:px-8 sm:py-10"
              >
                <div
                  aria-hidden
                  className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-white/35 to-transparent"
                />
                {primary.label ? (
                  <p className="text-[10px] font-semibold tracking-[0.16em] text-white/50 uppercase">{primary.label}</p>
                ) : null}
                <h3 className={cn(primary.label ? "mt-3" : "mt-1", "text-2xl font-semibold tracking-tight text-white")}>
                  {primary.title}
                </h3>
                <p className="mt-4 text-[15px] leading-[1.75] text-white/72">{primary.description}</p>
                {primary.href && primary.ctaLabel ? (
                  <Link
                    href={primary.href}
                    className={cn(
                      "mt-6 inline-flex items-center gap-2 text-sm font-semibold text-white transition hover:text-white/85",
                      FOCUS_RING_DARK,
                    )}
                  >
                    {primary.ctaLabel} <ArrowRight className="h-4 w-4" />
                  </Link>
                ) : null}
              </motion.article>

              <div
                className="hidden w-px shrink-0 self-stretch bg-gradient-to-b from-transparent via-white/14 to-transparent lg:mx-6 lg:block"
                aria-hidden
              />

              <motion.article
                variants={revealUp}
                transition={{ duration: reduceMotion ? 0 : 0.38, ease: "easeOut" }}
                className="relative overflow-hidden rounded-2xl border border-white/10 bg-white/[0.04] px-6 py-7 backdrop-blur-sm sm:px-7 sm:py-8"
              >
                <div
                  aria-hidden
                  className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-white/20 to-transparent"
                />
                {secondary.label ? (
                  <p className="text-[10px] font-semibold tracking-[0.16em] text-white/45 uppercase">{secondary.label}</p>
                ) : null}
                <h3
                  className={cn(
                    secondary.label ? "mt-3" : "mt-1",
                    "text-xl font-semibold tracking-tight text-white sm:text-[1.35rem]",
                  )}
                >
                  {secondary.title}
                </h3>
                <p className="mt-3 text-sm leading-[1.72] text-white/68 sm:text-[15px]">{secondary.description}</p>
                {secondary.href && secondary.ctaLabel ? (
                  <Link
                    href={secondary.href}
                    className={cn(
                      "mt-5 inline-flex items-center gap-2 text-sm font-semibold text-white/88 transition hover:text-white",
                      FOCUS_RING_DARK,
                    )}
                  >
                    {secondary.ctaLabel} <ArrowRight className="h-4 w-4" />
                  </Link>
                ) : null}
              </motion.article>
            </div>
          </motion.div>
        </Container>
      </section>
    );
  }

  /* dark-grid: one high-contrast signature grid (Specialized + Managed) */
  return (
    <section
      aria-labelledby={headingId}
      className="relative overflow-hidden border-b border-white/10"
      style={{ background: familySignatureBackground(page.slug) }}
    >
      <div className="pointer-events-none absolute inset-0" aria-hidden>
        <div
          className="absolute inset-0"
          style={{
            background: `radial-gradient(46% 40% at 86% 14%, color-mix(in srgb, ${page.theme.accent} 20%, transparent), transparent 70%)`,
          }}
        />
        <div
          className="absolute inset-0 opacity-[0.02]"
          style={{
            backgroundImage:
              "url(\"data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E\")",
          }}
        />
      </div>

      <Container className="site-page-container relative py-24 sm:py-28 lg:pt-32 lg:pb-28">
        <motion.div
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, amount: 0.12 }}
          variants={stagger}
        >
          <motion.div variants={revealUp} transition={{ duration: reduceMotion ? 0 : 0.35, ease: "easeOut" }}>
            <div className="flex justify-start">
              <SectionSignalEyebrow label={section.eyebrow} light accentColor={page.theme.accent} />
            </div>
            <h2 id={headingId} className={SITE_SECTION_H2_DARK}>
              {section.title}
            </h2>
            <p className={SITE_SECTION_LEDE_DARK}>{section.description}</p>
          </motion.div>

          <div className={cn("mt-12 grid gap-4 lg:mt-14", getGridClass(section.columns))}>
            {section.items.map((item) => (
              <motion.article
                key={item.key}
                variants={revealUp}
                transition={{ duration: reduceMotion ? 0 : 0.38, ease: "easeOut" }}
                className="relative overflow-hidden rounded-[22px] border border-white/10 bg-[linear-gradient(180deg,rgba(255,255,255,0.08),rgba(255,255,255,0.04))] px-5 py-6 backdrop-blur-sm sm:px-6"
              >
                <div
                  aria-hidden
                  className="absolute inset-x-0 top-0 h-px"
                  style={{
                    background: `linear-gradient(90deg, transparent, color-mix(in srgb, ${page.theme.accent} 65%, white), transparent)`,
                  }}
                />
                <h3 className="text-[1.05rem] leading-snug font-semibold text-white">{item.title}</h3>
                <p className="mt-3 text-sm leading-7 text-white/70">{item.description}</p>
              </motion.article>
            ))}
          </div>
        </motion.div>
      </Container>
    </section>
  );
}

function FamilyBranchSection({
  page,
  section,
  revealUp,
  stagger,
  reduceMotion,
}: {
  page: SolutionFamilyLandingPageData;
  section: NonNullable<SolutionFamilyLandingPageData["branchSection"]>;
  revealUp: Variants;
  stagger: Variants;
  reduceMotion: boolean;
}) {
  if (section.items.length === 4) {
    return <ModePathsSplitSection page={page} contentSection={section} ariaScope="branch" />;
  }

  const headingId = `solution-family-${page.slug}-branch-heading`;

  return (
    <section
      aria-labelledby={headingId}
      className="relative overflow-hidden border-b border-[color:var(--color-border-light-soft)] bg-[color:var(--color-surface-1-light)]"
    >
      <div className="pointer-events-none absolute inset-0" aria-hidden>
        <div className="absolute inset-0 bg-[linear-gradient(180deg,rgba(255,255,255,0.985),rgba(248,251,252,0.97)_58%,rgba(242,247,250,0.95)_100%)]" />
        <div
          className="absolute inset-0"
          style={{
            background: `radial-gradient(56% 42% at 100% 0%, color-mix(in srgb, ${page.theme.accent} 8%, transparent), transparent 70%)`,
          }}
        />
        <div className="absolute inset-x-0 top-0 h-px" style={familySectionHairline(page.theme.accent)} />
      </div>

      <Container className="site-page-container relative py-16 sm:py-20 lg:py-20">
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
            <h2 id={headingId} className={SITE_SECTION_H2_LIGHT}>
              {section.title}
            </h2>
            <p className={SITE_SECTION_LEDE_LIGHT}>{section.description}</p>
          </motion.div>

          <div className={cn("mt-8 grid gap-3.5 sm:gap-4", getGridClass(section.columns))}>
            {section.items.map((item) => (
              <motion.article
                key={item.key}
                variants={revealUp}
                transition={{ duration: reduceMotion ? 0 : 0.36, ease: "easeOut" }}
                className="group relative overflow-hidden rounded-2xl border border-[color:var(--color-menu-border)] bg-white px-5 py-5 shadow-[0_8px_20px_rgba(2,6,23,0.04)] transition-all duration-300 motion-safe:hover:-translate-y-[1px] hover:shadow-[0_14px_28px_rgba(2,6,23,0.07)] sm:px-6 sm:py-6"
              >
                <div
                  aria-hidden
                  className="absolute inset-x-0 top-0 h-[2px]"
                  style={{
                    background: `linear-gradient(90deg, ${page.theme.accent}, color-mix(in srgb, ${page.theme.accent} 45%, transparent))`,
                  }}
                />
                {item.label ? (
                  <p className="text-[10px] font-semibold tracking-[0.14em] text-[color:var(--color-menu-subtle)] uppercase">
                    {item.label}
                  </p>
                ) : null}
                <h3
                  className={cn(
                    item.label ? "mt-2.5" : "mt-1",
                    "text-[1.02rem] leading-snug font-semibold text-[color:var(--color-menu-title)]",
                  )}
                >
                  {item.title}
                </h3>
                <p className="mt-2.5 text-[13.75px] leading-[1.72] text-[color:var(--color-menu-muted)] sm:text-sm">
                  {item.description}
                </p>
                {item.href && item.ctaLabel ? (
                  <Link
                    href={item.href}
                    className={cn(
                      "mt-4 inline-flex items-center gap-2 text-sm font-semibold text-[color:var(--family-accent)] transition hover:opacity-[0.88]",
                      FAMILY_FOCUS_RING_LIGHT,
                    )}
                  >
                    {item.ctaLabel} <ArrowRight className="h-4 w-4 transition-transform duration-200 motion-safe:group-hover:translate-x-[1px]" />
                  </Link>
                ) : null}
              </motion.article>
            ))}
          </div>
        </motion.div>
      </Container>
    </section>
  );
}

function FamilyAdvisorySection({
  page,
  section,
  revealUp,
  stagger,
  reduceMotion,
}: {
  page: SolutionFamilyLandingPageData;
  section: NonNullable<SolutionFamilyLandingPageData["advisorySection"]>;
  revealUp: Variants;
  stagger: Variants;
  reduceMotion: boolean;
}) {
  const headingId = `solution-family-${page.slug}-advisory-heading`;

  return (
    <section
      aria-labelledby={headingId}
      className="relative overflow-hidden border-b border-[color:var(--color-border-light-soft)] bg-[color:var(--color-surface-0-light)]"
    >
      <div className="pointer-events-none absolute inset-0" aria-hidden>
        <div className="absolute inset-0 bg-[linear-gradient(180deg,var(--color-surface-0-light)_0%,color-mix(in_srgb,var(--color-surface-0-light)_82%,white)_55%,var(--color-surface-1-light)_100%)]" />
        <div
          className="absolute inset-0"
          style={{
            background: `radial-gradient(48% 36% at 0% 100%, color-mix(in srgb, ${page.theme.accent} 7%, transparent), transparent 74%)`,
          }}
        />
      </div>

      <Container className="site-page-container relative py-16 sm:py-20 lg:py-24">
        <motion.div
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, amount: 0.15 }}
          variants={stagger}
          className="max-w-[68rem]"
        >
          <motion.div variants={revealUp} transition={{ duration: reduceMotion ? 0 : 0.35, ease: "easeOut" }}>
            <div className="flex justify-start">
              <SectionSignalEyebrow label={section.eyebrow} accentColor={page.theme.accent} />
            </div>
            <h2 id={headingId} className={SITE_SECTION_H2_LIGHT}>
              {section.title}
            </h2>
            <p className={SITE_SECTION_LEDE_LIGHT}>{section.description}</p>
          </motion.div>

          <ul className="mt-10 space-y-8">
            {section.items.map((item) => (
              <motion.li
                key={item.title}
                variants={revealUp}
                transition={{ duration: reduceMotion ? 0 : 0.34, ease: "easeOut" }}
                className="border-l-2 pl-5 sm:pl-6"
                style={{
                  borderColor: `color-mix(in srgb, ${page.theme.accent} 55%, var(--color-border-light))`,
                }}
              >
                <h3 className="text-[15px] font-semibold leading-snug text-[color:var(--color-text-light)]">{item.title}</h3>
                <p className="mt-2 max-w-[62ch] text-[14.5px] leading-[1.78] text-[color:var(--color-muted-light)] sm:text-[14.85px]">
                  {item.body}
                </p>
              </motion.li>
            ))}
          </ul>
        </motion.div>
      </Container>
    </section>
  );
}

export function SolutionFamilyLandingPage({
  page,
}: {
  page: SolutionFamilyLandingPageData;
}) {
  const reduceMotion = useReducedMotion() ?? false;

  const stagger: Variants = reduceMotion
    ? { hidden: { opacity: 1 }, show: { opacity: 1 } }
    : { hidden: {}, show: { transition: { staggerChildren: 0.05, delayChildren: 0.03 } } };

  const revealUp: Variants = reduceMotion
    ? { hidden: { opacity: 1, y: 0 }, show: { opacity: 1, y: 0 } }
    : { hidden: { opacity: 1, y: 10 }, show: { opacity: 1, y: 0 } };

  const orb = familyFinalCtaOrbs(page.theme.accent);

  return (
    <div style={familyAccentVarStyle(page.theme.accent)}>
      <FamilyHero
        page={page}
        revealUp={revealUp}
        stagger={stagger}
        reduceMotion={reduceMotion}
      />
      {page.signatureSection ? (
        <FamilySignatureSection
          page={page}
          revealUp={revealUp}
          stagger={stagger}
          reduceMotion={reduceMotion}
        />
      ) : null}
      {page.branchSection ? (
        <FamilyBranchSection
          page={page}
          section={page.branchSection}
          revealUp={revealUp}
          stagger={stagger}
          reduceMotion={reduceMotion}
        />
      ) : null}
      {page.decisionGuide ? (
        <SolutionWhenToChooseSection section={page.decisionGuide} accent={page.theme.accent} />
      ) : page.advisorySection ? (
        <FamilyAdvisorySection
          page={page}
          section={page.advisorySection}
          revealUp={revealUp}
          stagger={stagger}
          reduceMotion={reduceMotion}
        />
      ) : null}
      <SolutionRelatedServicesSection
        section={page.relatedSolutions}
        accent={page.theme.accent}
      />
      <StandardFinalCta
        headingId={`solution-family-${page.slug}-final-cta`}
        trackingLocation={`solution_family_${page.slug}_final_cta`}
        variant="industry"
        accentColor={page.theme.accent}
        trustSignalAccentColor={page.theme.accent}
        orbMainColor={orb.orbMainColor}
        orbSecondaryColor={orb.orbSecondaryColor}
        data={page.finalCta}
      />
    </div>
  );
}
