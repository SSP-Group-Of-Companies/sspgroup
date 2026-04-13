"use client";

import type { KeyboardEvent, MouseEvent, ReactNode } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { motion, useReducedMotion, type Variants } from "framer-motion";
import { Container } from "@/app/(site)/components/layout/Container";
import { StandardFinalCta } from "@/app/(site)/components/cta/StandardFinalCta";
import { SectionSignalEyebrow } from "@/app/(site)/components/ui/SectionSignalEyebrow";
import { SOLUTIONS_HUB_PAGE, type SolutionsHubFamily } from "@/config/solutionsHub";
import { trackCtaClick } from "@/lib/analytics/cta";
import { cn } from "@/lib/cn";

const FOCUS_RING_LIGHT =
  "focus:outline-none focus-visible:ring-2 focus-visible:ring-[color:var(--color-menu-accent)] focus-visible:ring-offset-2 focus-visible:ring-offset-white";
const FOCUS_RING_DARK =
  "focus:outline-none focus-visible:ring-2 focus-visible:ring-white/40 focus-visible:ring-offset-2 focus-visible:ring-offset-[color:var(--color-company-ink)]";
const SOLUTIONS_HUB_ACCENT = "var(--color-ssp-cyan-500)";

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

function OperatingModelSection({
  revealUp,
  stagger,
  reduceMotion,
}: {
  revealUp: Variants;
  stagger: Variants;
  reduceMotion: boolean;
}) {
  const section = SOLUTIONS_HUB_PAGE.operatingModel;

  return (
    <section
      aria-labelledby="solutions-hub-operating-model-heading"
      className="relative overflow-hidden border-b border-[color:var(--color-border-light-soft)] bg-[color:var(--color-surface-0-light)] py-20 sm:py-24"
    >
      <div className="pointer-events-none absolute inset-0" aria-hidden>
        <div className="absolute inset-0 bg-[linear-gradient(180deg,rgba(255,255,255,0.98),rgba(244,248,251,0.96)_48%,rgba(238,244,248,0.94)_100%)]" />
        <div className="absolute inset-0 bg-[radial-gradient(78%_58%_at_0%_0%,rgba(16,167,216,0.07),transparent_58%)]" />
        <div className="absolute inset-0 bg-[radial-gradient(62%_44%_at_100%_18%,rgba(8,26,43,0.06),transparent_60%)]" />
        <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-[color:var(--color-menu-accent)]/18 to-transparent" />
        <div
          className="absolute left-0 top-0 h-[min(20rem,52vh)] w-full max-w-4xl opacity-[0.04]"
          style={{
            backgroundImage:
              "linear-gradient(to right, var(--color-company-companies-grid-line) 1px, transparent 1px), linear-gradient(to bottom, var(--color-company-companies-grid-line) 1px, transparent 1px)",
            backgroundSize: "62px 62px",
            maskImage:
              "radial-gradient(118% 98% at 0% 0%, black 0%, rgba(0,0,0,0.92) 60%, transparent 100%)",
            WebkitMaskImage:
              "radial-gradient(118% 98% at 0% 0%, black 0%, rgba(0,0,0,0.92) 60%, transparent 100%)",
          }}
        />
      </div>

      <Container className="site-page-container relative">
        <div className="grid gap-8 lg:grid-cols-[minmax(0,0.9fr)_minmax(0,1.1fr)] lg:items-start xl:gap-14">
          <motion.div
            initial="hidden"
            whileInView="show"
            viewport={{ once: true, amount: 0.15 }}
            variants={revealUp}
            transition={{ duration: reduceMotion ? 0 : 0.35, ease: "easeOut" }}
            className="max-w-[36rem]"
          >
            <SectionSignalEyebrow label={section.eyebrow} />
            <h2
              id="solutions-hub-operating-model-heading"
              className="mt-4 max-w-[16ch] text-[2rem] leading-[1.08] font-semibold tracking-tight text-[color:var(--color-menu-title)] sm:text-[2.4rem]"
            >
              {section.title}
            </h2>
            <p className="mt-5 max-w-[62ch] text-[15px] leading-[1.9] text-[color:var(--color-menu-muted)]">
              {section.description}
            </p>
          </motion.div>

          <motion.div
            initial="hidden"
            whileInView="show"
            viewport={{ once: true, amount: 0.15 }}
            variants={stagger}
            className="grid gap-4 sm:grid-cols-2"
          >
            {section.pillars.map((pillar) => (
              <motion.article
                key={pillar.key}
                variants={revealUp}
                transition={{ duration: reduceMotion ? 0 : 0.36, ease: "easeOut" }}
                className="relative overflow-hidden rounded-[24px] border border-[color:var(--color-menu-border)] bg-white px-5 py-6 shadow-[0_10px_24px_rgba(2,6,23,0.05)] sm:px-6 sm:py-7"
              >
                <div
                  aria-hidden
                  className="pointer-events-none absolute inset-x-0 top-0 h-[2px] bg-[linear-gradient(90deg,var(--color-ssp-cyan-500),rgba(16,167,216,0.42))]"
                />
                <h3 className="mt-1 text-[1.1rem] leading-snug font-semibold text-[color:var(--color-menu-title)]">
                  {pillar.title}
                </h3>
                <p className="mt-3 text-sm leading-7 text-[color:var(--color-menu-muted)]">
                  {pillar.body}
                </p>
              </motion.article>
            ))}
          </motion.div>
        </div>
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

  return (
    <motion.article
      id={family.sectionId}
      variants={revealUp}
      transition={{ duration: reduceMotion ? 0 : 0.38, ease: "easeOut" }}
      className={cn(
        "group relative flex h-full min-h-0 cursor-pointer flex-col overflow-hidden border border-[color:var(--color-border-light-soft)] bg-white p-5 shadow-[0_10px_24px_rgba(2,6,23,0.04)] transition-all duration-300 motion-safe:hover:-translate-y-[2px] hover:border-[color:var(--color-menu-border)] hover:shadow-[0_16px_32px_rgba(2,6,23,0.07)] site-cta-radius sm:p-6",
        FOCUS_RING_LIGHT,
      )}
      style={{ scrollMarginTop: "7rem" }}
      role="link"
      tabIndex={0}
      aria-label={family.familyCtaLabel}
      onClick={handleCardNavigation}
      onKeyDown={handleCardKeyDown}
    >
      <p className="shrink-0 text-[11px] font-semibold tracking-[0.14em] text-[color:var(--color-menu-accent)] uppercase">
        {family.label}
      </p>
      <h3 className="mt-3 min-h-[5rem] shrink-0 text-[1.18rem] leading-snug font-semibold tracking-[-0.02em] text-[color:var(--color-menu-title)] lg:min-h-[6rem] lg:text-[1.24rem]">
        {family.title}
      </h3>
      <p className="mt-3 min-h-0 flex-1 text-[12.5px] leading-[1.62] text-[color:var(--color-menu-muted)]">
        {family.hubSummary}
      </p>
      {/* Fixed height keeps the rule + CTA baseline aligned across cards (Core paths run longer). */}
      <div className="mt-5 flex h-[12rem] shrink-0 flex-col border-t border-[color:var(--color-border-light-soft)] pt-3.5 lg:h-[12.75rem]">
        <p className="shrink-0 text-[10px] font-semibold tracking-[0.14em] text-[color:var(--color-menu-subtle)] uppercase">
          Included paths
        </p>
        <div className="mt-1.5 flex min-h-0 flex-1 flex-col gap-2">
          <div className="min-h-0 flex-1 overflow-y-auto overscroll-contain pr-0.5 [-webkit-overflow-scrolling:touch]">
            <div className="space-y-1.5 text-[11.5px] leading-[1.5] text-[color:var(--color-menu-muted)]">
              {family.childReferences.map((reference, index) => (
                <TrackedLink
                  key={`${family.key}-${reference.href}-${index}`}
                  href={reference.href}
                  ctaId={`solutions_hub_family_${family.key}_path_${index}`}
                  location="solutions_hub_family_paths"
                  label={reference.label}
                  onClick={(event) => event.stopPropagation()}
                  className={cn(
                    "block text-left text-[11.5px] leading-[1.5] text-[color:var(--color-menu-muted)] transition-colors hover:text-[color:var(--color-menu-accent)]",
                    FOCUS_RING_LIGHT,
                  )}
                >
                  {reference.label}
                </TrackedLink>
              ))}
            </div>
          </div>
          <TrackedLink
            href={family.familyHref}
            ctaId={`solutions_hub_family_${family.key}`}
            location="solutions_hub_family_navigation"
            label={family.familyCtaLabel}
            onClick={(event) => event.stopPropagation()}
            className={cn(
              "inline-flex shrink-0 items-center gap-2 text-[13px] font-semibold text-[color:var(--color-menu-accent)] transition hover:text-[color:var(--color-ssp-ink-800)]",
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

function TrustStripSection({
  revealUp,
  stagger,
  reduceMotion,
}: {
  revealUp: Variants;
  stagger: Variants;
  reduceMotion: boolean;
}) {
  const section = SOLUTIONS_HUB_PAGE.executionStandard;

  return (
    <section
      aria-labelledby="solutions-hub-execution-standard-heading"
      className="relative overflow-hidden border-b border-white/8 py-16 sm:py-20"
      style={{
        background:
          "linear-gradient(145deg, var(--color-footer-legal-bg), var(--color-ssp-ink-900) 42%, var(--color-company-ink))",
      }}
    >
      <div className="pointer-events-none absolute inset-0" aria-hidden>
        <div className="absolute -top-16 right-[-84px] h-[210px] w-[210px] rounded-full bg-[color:var(--color-ssp-cyan-500)]/14 blur-[90px]" />
        <div className="absolute -bottom-24 left-[-110px] h-[250px] w-[250px] rounded-full bg-[color:var(--color-ssp-cyan-500)]/10 blur-[105px]" />
      </div>

      <Container className="site-page-container relative">
        <div className="grid gap-8 lg:grid-cols-[minmax(0,0.9fr)_minmax(0,1.1fr)] xl:gap-14">
          <motion.div
            initial="hidden"
            whileInView="show"
            viewport={{ once: true, amount: 0.15 }}
            variants={revealUp}
            transition={{ duration: reduceMotion ? 0 : 0.35, ease: "easeOut" }}
            className="max-w-[35rem]"
          >
            <SectionSignalEyebrow label={section.eyebrow} light />
            <h2
              id="solutions-hub-execution-standard-heading"
              className="mt-4 max-w-[18ch] text-[1.8rem] leading-[1.08] font-semibold tracking-tight text-white sm:text-[2.1rem]"
            >
              {section.title}
            </h2>
            <p className="mt-5 max-w-[62ch] text-[15px] leading-[1.9] text-white/72">
              {section.description}
            </p>
            <div className="mt-7 flex flex-wrap gap-2.5">
              {section.trustSignals.map((signal) => (
                <span
                  key={signal}
                  className="inline-flex items-center rounded-full border border-white/12 bg-white/7 px-3 py-1.5 text-xs font-medium tracking-[0.08em] text-white/70 uppercase"
                >
                  {signal}
                </span>
              ))}
            </div>
          </motion.div>

          <motion.div
            initial="hidden"
            whileInView="show"
            viewport={{ once: true, amount: 0.15 }}
            variants={stagger}
            className="grid gap-4 sm:grid-cols-2"
          >
            {section.pillars.slice(0, 4).map((pillar) => (
              <motion.article
                key={pillar.title}
                variants={revealUp}
                transition={{ duration: reduceMotion ? 0 : 0.38, ease: "easeOut" }}
                className="relative overflow-hidden rounded-[24px] border border-white/10 bg-[linear-gradient(180deg,rgba(255,255,255,0.08),rgba(255,255,255,0.05))] px-5 py-6 backdrop-blur-sm sm:px-6"
              >
                <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-white/18 to-transparent" />
                <h3 className="text-[1.08rem] leading-snug font-semibold text-white">{pillar.title}</h3>
                <p className="mt-3 text-sm leading-7 text-white/70">{pillar.body}</p>
              </motion.article>
            ))}
          </motion.div>
        </div>
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
      <OperatingModelSection revealUp={revealUp} stagger={stagger} reduceMotion={reduceMotion} />
      <FamilyNavigationSection revealUp={revealUp} stagger={stagger} reduceMotion={reduceMotion} />
      <TrustStripSection revealUp={revealUp} stagger={stagger} reduceMotion={reduceMotion} />
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
