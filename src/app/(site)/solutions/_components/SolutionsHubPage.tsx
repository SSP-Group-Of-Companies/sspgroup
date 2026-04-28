"use client";

import type { ComponentType, CSSProperties, KeyboardEvent, MouseEvent, ReactNode } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { motion, useReducedMotion, type Variants } from "framer-motion";
import { Globe2, ShieldCheck, Truck } from "lucide-react";
import { Container } from "@/app/(site)/components/layout/Container";
import { HEADER_HEIGHT_PX } from "@/app/(site)/components/layout/header/constants";
import { StandardFinalCta } from "@/app/(site)/components/cta/StandardFinalCta";
import { ModeSolutionOverviewSection } from "@/app/(site)/solutions/_components/ModeSolutionOverviewSection";
import { SectionSignalEyebrow } from "@/app/(site)/components/ui/SectionSignalEyebrow";
import {
  SOLUTIONS_HUB_PAGE,
  type SolutionsHubDifferentiatorIcon,
  type SolutionsHubFamily,
} from "@/config/solutionsHub";
import { trackCtaClick } from "@/lib/analytics/cta";
import { cn } from "@/lib/cn";

const FOCUS_RING_LIGHT =
  "focus:outline-none focus-visible:ring-2 focus-visible:ring-[color:var(--color-menu-accent)] focus-visible:ring-offset-2 focus-visible:ring-offset-white";
const FOCUS_RING_DARK =
  "focus:outline-none focus-visible:ring-2 focus-visible:ring-white/40 focus-visible:ring-offset-2 focus-visible:ring-offset-[color:var(--color-company-ink)]";
const SOLUTIONS_HUB_ACCENT = "var(--color-ssp-cyan-500)";
const HUB_SECTION_SCROLL_MARGIN = HEADER_HEIGHT_PX + 56 + 16;

const DIFFERENTIATOR_ICONS: Record<
  SolutionsHubDifferentiatorIcon,
  ComponentType<{ className?: string; strokeWidth?: number }>
> = {
  truck: Truck,
  globe: Globe2,
  "shield-check": ShieldCheck,
};

type TrackedLinkProps = {
  href: string;
  ctaId?: string;
  location: string;
  label: string;
  className?: string;
  ariaLabel?: string;
  onClick?: (event: MouseEvent<HTMLAnchorElement>) => void;
  children: ReactNode;
};

function TrackedLink({
  href,
  ctaId,
  location,
  label,
  className,
  ariaLabel,
  onClick,
  children,
}: TrackedLinkProps) {
  return (
    <Link
      href={href}
      aria-label={ariaLabel}
      data-cta-id={ctaId}
      onClick={(event) => {
        onClick?.(event);
        if (!ctaId) return;
        trackCtaClick({
          ctaId,
          location,
          destination: href,
          label,
        });
      }}
      className={className}
    >
      {children}
    </Link>
  );
}

function HeroSection({
  revealUp,
  reduceMotion,
}: {
  revealUp: Variants;
  reduceMotion: boolean;
}) {
  const hero = SOLUTIONS_HUB_PAGE.hero;

  return (
    <section
      aria-labelledby="solutions-hub-hero-heading"
      className="relative overflow-hidden border-b border-white/6"
      style={{
        background:
          "linear-gradient(180deg, var(--color-company-hero-midnight-start) 0%, var(--color-company-ink) 56%, var(--color-company-hero-midnight-end) 100%)",
      }}
    >
      <div className="pointer-events-none absolute inset-0" aria-hidden>
        <div className="absolute right-[-10%] top-[-8%] h-[420px] w-[420px] rounded-full bg-[radial-gradient(circle,rgba(16,167,216,0.08)_0%,transparent_68%)]" />
        <div className="absolute bottom-[-18%] left-[-8%] h-[360px] w-[360px] rounded-full bg-[radial-gradient(circle,rgba(16,167,216,0.05)_0%,transparent_70%)]" />
        <div className="absolute inset-x-0 top-0 h-[18rem] bg-[linear-gradient(180deg,rgba(255,255,255,0.02),transparent)]" />
      </div>

      <Container className="site-page-container relative py-20 sm:py-24 lg:py-28">
        <motion.div
          className="mx-auto max-w-4xl text-center"
          initial="hidden"
          animate="show"
          variants={{
            hidden: {},
            show: { transition: { staggerChildren: reduceMotion ? 0 : 0.05, delayChildren: 0.03 } },
          }}
        >
          <motion.div
            variants={revealUp}
            transition={{ duration: reduceMotion ? 0 : 0.35, ease: "easeOut" }}
            className="flex justify-center"
          >
            <SectionSignalEyebrow label={hero.eyebrow} light />
          </motion.div>

          <motion.h1
            id="solutions-hub-hero-heading"
            variants={revealUp}
            transition={{ duration: reduceMotion ? 0 : 0.38, ease: "easeOut" }}
            className="mt-7 text-[2.55rem] font-semibold leading-[1.03] tracking-tight text-white sm:text-[3.5rem] lg:text-[4.1rem]"
          >
            {hero.title}
          </motion.h1>

          <motion.p
            variants={revealUp}
            transition={{ duration: reduceMotion ? 0 : 0.35, ease: "easeOut" }}
            className="mx-auto mt-6 max-w-3xl text-[15px] leading-[1.9] text-white/72 sm:text-base"
          >
            {hero.description}
          </motion.p>

          <motion.div
            variants={revealUp}
            transition={{ duration: reduceMotion ? 0 : 0.35, ease: "easeOut" }}
            className="mt-10 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-center"
          >
            <TrackedLink
              href={hero.primaryCta.href}
              ctaId={hero.primaryCta.ctaId}
              location="solutions_hub_hero"
              label={hero.primaryCta.label}
              className={cn(
                "inline-flex h-12 items-center justify-center px-7 text-sm font-semibold text-white transition-all duration-200 motion-safe:hover:-translate-y-[1px]",
                "bg-[color:var(--color-ssp-cyan-500)] shadow-[0_10px_30px_rgba(16,167,216,0.22)] hover:bg-[color:var(--color-ssp-cyan-600)] hover:shadow-[0_14px_38px_rgba(16,167,216,0.32)]",
                "site-cta-radius",
                FOCUS_RING_DARK,
              )}
            >
              {hero.primaryCta.label}
            </TrackedLink>
            <TrackedLink
              href={hero.secondaryCta.href}
              ctaId={hero.secondaryCta.ctaId}
              location="solutions_hub_hero"
              label={hero.secondaryCta.label}
              className={cn(
                "inline-flex h-12 items-center justify-center border border-white/16 px-7 text-sm font-semibold text-white/86 transition-all duration-200 hover:border-white/28 hover:bg-white/8 hover:text-white",
                "site-cta-radius",
                FOCUS_RING_DARK,
              )}
            >
              {hero.secondaryCta.label}
            </TrackedLink>
          </motion.div>
        </motion.div>
      </Container>
    </section>
  );
}

function FamilyNavigationSection({
  revealUp,
  stagger,
  reduceMotion,
}: {
  revealUp: Variants;
  stagger: Variants;
  reduceMotion: boolean;
}) {
  const intro = SOLUTIONS_HUB_PAGE.serviceFamilies;

  return (
    <section
      aria-labelledby="solutions-hub-service-families-heading"
      className="relative overflow-hidden border-b border-[color:var(--color-border-light-soft)] bg-[color:var(--color-surface-1-light)] py-20 sm:py-24"
    >
      <div className="pointer-events-none absolute inset-0" aria-hidden>
        <div className="absolute inset-0 bg-[linear-gradient(180deg,rgba(255,255,255,0.985),rgba(250,252,253,0.97)_52%,rgba(244,248,251,0.95)_100%)]" />
        <div className="absolute inset-0 bg-[radial-gradient(54%_42%_at_100%_0%,rgba(16,167,216,0.08),transparent_66%)]" />
        <div className="absolute inset-0 bg-[radial-gradient(44%_34%_at_0%_100%,rgba(15,23,42,0.04),transparent_72%)]" />
        <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-[color:var(--color-menu-accent)]/18 to-transparent" />
      </div>

      <Container className="site-page-container relative">
        <motion.div
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, amount: 0.15 }}
          variants={revealUp}
          transition={{ duration: reduceMotion ? 0 : 0.35, ease: "easeOut" }}
          className="max-w-3xl"
        >
          <SectionSignalEyebrow label={intro.eyebrow} />
          <h2
            id="solutions-hub-service-families-heading"
            className="mt-4 text-[2rem] leading-[1.08] font-semibold tracking-tight text-[color:var(--color-menu-title)] sm:text-[2.35rem]"
          >
            {intro.title}
          </h2>
          <p className="mt-4 max-w-[64ch] text-[15px] leading-[1.85] text-[color:var(--color-menu-muted)]">
            {intro.description}
          </p>
        </motion.div>

        <motion.div
          className="mt-10 grid items-stretch gap-4 lg:grid-cols-4"
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, amount: 0.15 }}
          variants={stagger}
        >
          {SOLUTIONS_HUB_PAGE.families.map((family) => (
            <FamilyNavigationCard
              key={family.key}
              family={family}
              revealUp={revealUp}
              reduceMotion={reduceMotion}
            />
          ))}
        </motion.div>
      </Container>
    </section>
  );
}

function FamilyNavigationCard({
  family,
  revealUp,
  reduceMotion,
}: {
  family: SolutionsHubFamily;
  revealUp: Variants;
  reduceMotion: boolean;
}) {
  const router = useRouter();

  const handleCardNavigation = () => {
    trackCtaClick({
      ctaId: `solutions_hub_family_card_${family.key}`,
      location: "solutions_hub_family_card",
      destination: family.familyHref,
      label: family.familyCtaLabel,
    });
    router.push(family.familyHref);
  };

  const handleCardKeyDown = (event: KeyboardEvent<HTMLElement>) => {
    if (event.key !== "Enter" && event.key !== " ") return;
    event.preventDefault();
    handleCardNavigation();
  };

  const cardAccentStyle = {
    ["--card-accent" as string]: family.accentColor,
    scrollMarginTop: "7rem",
  } as CSSProperties;

  return (
    <motion.article
      id={family.sectionId}
      variants={revealUp}
      transition={{ duration: reduceMotion ? 0 : 0.38, ease: "easeOut" }}
      className={cn(
        "group relative isolate flex h-full min-h-0 cursor-pointer flex-col overflow-hidden border border-[color:var(--color-border-light-soft)] bg-white p-5 shadow-[0_10px_24px_rgba(2,6,23,0.04)] transition-all duration-300 motion-safe:hover:-translate-y-[2px] hover:border-[color:var(--color-menu-border)] hover:shadow-[0_16px_32px_rgba(2,6,23,0.07)] site-cta-radius sm:p-6",
        FOCUS_RING_LIGHT,
      )}
      style={cardAccentStyle}
      role="link"
      tabIndex={0}
      aria-label={family.familyCtaLabel}
      onClick={handleCardNavigation}
      onKeyDown={handleCardKeyDown}
    >
      <div
        className="pointer-events-none absolute inset-0 z-0 opacity-0 transition-opacity duration-500 ease-[cubic-bezier(0.22,1,0.36,1)] group-hover:opacity-[0.52] group-focus-within:opacity-[0.52]"
        style={{
          background:
            "radial-gradient(118% 96% at 50% 88%, color-mix(in srgb, var(--card-accent) 7%, white) 0%, color-mix(in srgb, var(--card-accent) 2.2%, transparent) 46%, transparent 74%)",
        }}
        aria-hidden
      />
      <div className="relative z-[1] flex min-h-0 flex-1 flex-col">
        <p className="shrink-0 text-[11px] font-semibold tracking-[0.14em] text-[color:var(--color-menu-accent)] uppercase">
          {family.label}
        </p>
        <h3 className="mt-3 min-h-[5rem] shrink-0 text-[1.18rem] leading-snug font-semibold tracking-[-0.02em] text-[color:var(--color-menu-title)] lg:min-h-[6rem] lg:text-[1.24rem]">
          {family.title}
        </h3>
        <p className="mt-3 min-h-0 flex-1 pb-5 text-[12.5px] leading-[1.62] text-[color:var(--color-menu-muted)]">
          {family.hubSummary}
        </p>
        {/* Plain text paths (no nested links / scroll) so mobile vertical scroll is not captured. */}
        <div className="mt-auto shrink-0 border-t border-[color:var(--color-border-light-soft)] pt-3.5">
          <p className="text-[10px] font-semibold tracking-[0.14em] text-[color:var(--color-menu-subtle)] uppercase">
            Included paths
          </p>
          <ul className="mt-1.5 list-none space-y-1.5 p-0 text-left text-[11.5px] leading-[1.5] text-[color:var(--color-menu-muted)]">
            {family.childReferences.map((reference, index) => (
              <li key={`${family.key}-path-${index}`}>{reference.label}</li>
            ))}
          </ul>
          <TrackedLink
            href={family.familyHref}
            ctaId={`solutions_hub_family_${family.key}`}
            location="solutions_hub_family_navigation"
            label={family.familyCtaLabel}
            onClick={(event) => event.stopPropagation()}
            className={cn(
              "relative mt-3 inline-flex w-fit items-center gap-2 pb-0.5 text-[13px] font-semibold tracking-[0.05em]",
              "text-[color:var(--color-menu-title)] transition-colors duration-200",
              "after:pointer-events-none after:absolute after:right-0 after:-bottom-0.5 after:left-0 after:h-[1.5px] after:origin-left after:scale-x-0 after:bg-[color:var(--card-accent)] after:transition-transform after:duration-300 after:ease-[cubic-bezier(0.22,1,0.36,1)]",
              "group-hover:text-[color:var(--card-accent)] group-hover:after:scale-x-100",
              "group-focus-within:text-[color:var(--card-accent)] group-focus-within:after:scale-x-100",
              "focus-visible:text-[color:var(--card-accent)] focus-visible:after:scale-x-100",
              FOCUS_RING_LIGHT,
            )}
            ariaLabel={family.familyCtaLabel}
          >
            {family.familyCtaLabel} <span aria-hidden>{"->"}</span>
          </TrackedLink>
        </div>
      </div>
    </motion.article>
  );
}

function WhatSetsUsApartSection({
  revealUp,
  stagger,
  reduceMotion,
}: {
  revealUp: Variants;
  stagger: Variants;
  reduceMotion: boolean;
}) {
  const section = SOLUTIONS_HUB_PAGE.whatSetsUsApart;

  return (
    <section
      aria-labelledby="solutions-hub-differentiators-heading"
      className="relative overflow-hidden border-b border-[color:var(--color-border-light-soft)] bg-[color:var(--color-surface-2)] py-20 sm:py-24"
    >
      <div className="pointer-events-none absolute inset-0" aria-hidden>
        <div className="absolute inset-0 bg-[linear-gradient(180deg,rgba(255,255,255,0.55),transparent_42%,rgba(255,255,255,0.35)_100%)]" />
        <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-[color:var(--color-menu-accent)]/14 to-transparent" />
      </div>

      <Container className="site-page-container relative">
        <motion.div
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, amount: 0.2 }}
          variants={revealUp}
          transition={{ duration: reduceMotion ? 0 : 0.35, ease: "easeOut" }}
          className="mx-auto max-w-[52rem] text-center"
        >
          <div className="flex justify-center">
            <SectionSignalEyebrow label={section.eyebrow} />
          </div>
          <h2
            id="solutions-hub-differentiators-heading"
            className="mt-4 text-[1.85rem] font-semibold leading-[1.12] tracking-tight text-[color:var(--color-menu-title)] sm:text-[2.15rem] lg:text-[2.35rem]"
          >
            {section.title}
          </h2>
        </motion.div>

        <motion.div
          className="mt-12 grid gap-10 sm:gap-12 lg:mt-14 lg:grid-cols-3 lg:gap-8"
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, amount: 0.15 }}
          variants={stagger}
        >
          {section.items.map((item) => {
            const Icon = DIFFERENTIATOR_ICONS[item.icon];
            return (
              <motion.article
                key={item.key}
                variants={revealUp}
                transition={{ duration: reduceMotion ? 0 : 0.38, ease: "easeOut" }}
                className="flex flex-col items-center text-center"
              >
                <div
                  className={cn(
                    "mb-5 grid h-[4.25rem] w-[4.25rem] shrink-0 place-items-center rounded-2xl border border-[color:var(--color-menu-accent)]/14",
                    "bg-[color:var(--color-surface-1-light)] text-[color:var(--color-menu-accent)] shadow-[0_10px_28px_rgba(2,6,23,0.05)]",
                  )}
                  aria-hidden
                >
                  <Icon className="h-[1.65rem] w-[1.65rem]" strokeWidth={1.35} />
                </div>
                <h3 className="max-w-[22ch] text-[1.12rem] font-semibold leading-snug tracking-[-0.015em] text-[color:var(--color-menu-title)] sm:text-[1.2rem]">
                  {item.title}
                </h3>
                <p className="mt-3 max-w-[38ch] text-[14.5px] leading-[1.75] text-[color:var(--color-menu-muted)] sm:text-[15px] sm:leading-[1.82]">
                  {item.body}
                </p>
              </motion.article>
            );
          })}
        </motion.div>
      </Container>
    </section>
  );
}

export function SolutionsHubPage() {
  const reduceMotion = useReducedMotion() ?? false;

  const stagger: Variants = reduceMotion
    ? { hidden: { opacity: 1 }, show: { opacity: 1 } }
    : { hidden: {}, show: { transition: { staggerChildren: 0.05, delayChildren: 0.03 } } };

  const revealUp: Variants = reduceMotion
    ? { hidden: { opacity: 1, y: 0 }, show: { opacity: 1, y: 0 } }
    : { hidden: { opacity: 1, y: 10 }, show: { opacity: 1, y: 0 } };

  return (
    <div className="bg-[color:var(--color-surface-0)]">
      <HeroSection revealUp={revealUp} reduceMotion={reduceMotion} />
      <ModeSolutionOverviewSection
        slug="hub"
        section={SOLUTIONS_HUB_PAGE.whySspOverview}
        accent={SOLUTIONS_HUB_ACCENT}
        scrollMarginTop={HUB_SECTION_SCROLL_MARGIN}
      />
      <FamilyNavigationSection revealUp={revealUp} stagger={stagger} reduceMotion={reduceMotion} />
      <WhatSetsUsApartSection revealUp={revealUp} stagger={stagger} reduceMotion={reduceMotion} />
      <StandardFinalCta
        headingId="solutions-hub-final-cta"
        trackingLocation="solutions_hub_final_cta"
        variant="cross-border"
        accentColor={SOLUTIONS_HUB_ACCENT}
        trustSignalAccentColor={SOLUTIONS_HUB_ACCENT}
        orbMainColor="rgba(16,167,216,0.12)"
        orbSecondaryColor="rgba(16,167,216,0.1)"
        data={SOLUTIONS_HUB_PAGE.finalCta}
      />
    </div>
  );
}
