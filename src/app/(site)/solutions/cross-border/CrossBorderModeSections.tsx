"use client";

import Image from "next/image";
import Link from "next/link";
import { motion, useReducedMotion, type Variants } from "framer-motion";
import { ChevronLeft } from "lucide-react";
import { cn } from "@/lib/cn";
import { Container } from "@/app/(site)/components/layout/Container";
import { SharedFaqSection } from "@/app/(site)/components/faq/SharedFaqSection";
import { StandardFinalCta } from "@/app/(site)/components/cta/StandardFinalCta";
import { trackCtaClick } from "@/lib/analytics/cta";

export type ModeTheme = "air" | "ocean";
export type ModeCard = {
  readonly title: string;
  readonly body: string;
  readonly href?: string;
  readonly ctaId?: string;
};
export type ModeStep = { readonly step: string; readonly title: string; readonly body: string };
export type ModeFaqItem = { readonly q: string; readonly a: string };
export type ModeCtaLink = { readonly label: string; readonly href: string; readonly ctaId?: string };

const THEME = {
  air: {
    pageKey: "air_freight",
    focusRing:
      "focus:outline-none focus-visible:ring-2 focus-visible:ring-[color:var(--color-air-400)] focus-visible:ring-offset-2 focus-visible:ring-offset-white",
    focusRingDark:
      "focus:outline-none focus-visible:ring-2 focus-visible:ring-[color:var(--color-air-300)] focus-visible:ring-offset-2 focus-visible:ring-offset-[color:var(--color-footer-legal-bg)]",
    eyebrowLight:
      "border border-white/24 bg-white/8 text-xs tracking-[0.16em] text-white/70",
    eyebrow:
      "border border-[color:var(--color-air-400)]/20 bg-[color:var(--color-air-400)]/6 text-[10.5px] tracking-[0.14em] text-[color:var(--color-air-500)]",
    dotLight: "bg-[color:var(--color-air-300)]",
    dot: "bg-[color:var(--color-air-400)]",
    lineLight:
      "bg-[linear-gradient(90deg,var(--color-air-300),rgba(255,255,255,0.35))]",
    line: "bg-[linear-gradient(90deg,var(--color-air-400),rgba(12,23,38,0.18))]",
    heroPrimary:
      "bg-[color:var(--color-air-400)] shadow-[0_6px_20px_rgba(91,155,229,0.35)] hover:bg-[color:var(--color-air-500)] hover:shadow-[0_10px_28px_rgba(91,155,229,0.45)]",
    heroSecondary:
      "border-white/22 text-white/75 hover:border-white/40 hover:bg-white/10 hover:text-white",
    heroBackdrop: "bg-[color:var(--color-air-400)]/12",
    heroDesktopGlow: "bg-[color:var(--color-air-400)]/12",
    heroMobileGlow: "bg-[color:var(--color-air-400)]/6",
    heroImage: "/_optimized/solution/crossBorder/air-hero-globe.jpg",
    heroImageAlt: "Cargo aircraft with global air freight network globe",
    cardBorder: "border-[color:var(--color-air-400)]/14",
    cardHoverBorder: "hover:border-[color:var(--color-air-400)]/28",
    cardRail: "bg-[linear-gradient(180deg,var(--color-air-400),var(--color-air-600))]",
    cardBadge: "bg-[color:var(--color-air-400)]/10 text-[color:var(--color-air-500)]",
    glassBadge:
      "border-[color:var(--color-air-400)]/22 bg-[color:var(--color-air-400)]/10 text-[color:var(--color-air-300)]",
    glassLine:
      "bg-[linear-gradient(90deg,transparent,rgba(139,184,240,0.25),transparent)]",
    sectionBg: "bg-[linear-gradient(180deg,#ffffff,var(--color-air-50))]",
    sectionBorder: "border-[color:var(--color-air-400)]/10",
    sectionLine: "via-[color:var(--color-air-400)]/22",
    stepBadge:
      "border-[color:var(--color-air-500)]/18 bg-[color:var(--color-air-500)]/8 text-[color:var(--color-air-500)]",
    faqBg:
      "border-y border-[color:var(--color-air-400)]/10 bg-[linear-gradient(180deg,var(--color-surface-0),var(--color-air-100))]",
    accentColor: "var(--color-air-400)",
    orbMainColor: "rgba(91,155,229,0.3)",
    orbSecondaryColor: "rgba(130,181,238,0.14)",
    finalHeadingId: "air-freight-final-cta-heading",
    finalTrackingLocation: "cross_border_air_freight_final_cta",
    faqPanelPrefix: "air-faq",
    backCtaId: "cb_air_freight_back",
    backLabel: "Cross-Border Overview",
  },
  ocean: {
    pageKey: "ocean_freight",
    focusRing:
      "focus:outline-none focus-visible:ring-2 focus-visible:ring-[color:var(--color-ocean-400)] focus-visible:ring-offset-2 focus-visible:ring-offset-white",
    focusRingDark:
      "focus:outline-none focus-visible:ring-2 focus-visible:ring-[color:var(--color-ocean-300)] focus-visible:ring-offset-2 focus-visible:ring-offset-[color:var(--color-footer-legal-bg)]",
    eyebrowLight:
      "border border-white/24 bg-white/8 text-xs tracking-[0.16em] text-white/70",
    eyebrow:
      "border border-[color:var(--color-ocean-400)]/20 bg-[color:var(--color-ocean-400)]/6 text-[10.5px] tracking-[0.14em] text-[color:var(--color-ocean-500)]",
    dotLight: "bg-[color:var(--color-ocean-300)]",
    dot: "bg-[color:var(--color-ocean-400)]",
    lineLight:
      "bg-[linear-gradient(90deg,var(--color-ocean-300),rgba(255,255,255,0.35))]",
    line: "bg-[linear-gradient(90deg,var(--color-ocean-400),rgba(12,23,38,0.18))]",
    heroPrimary:
      "bg-[color:var(--color-ocean-400)] shadow-[0_6px_20px_rgba(45,139,201,0.35)] hover:bg-[color:var(--color-ocean-500)] hover:shadow-[0_10px_28px_rgba(45,139,201,0.45)]",
    heroSecondary:
      "border-white/22 text-white/75 hover:border-white/40 hover:bg-white/10 hover:text-white",
    heroBackdrop: "bg-[color:var(--color-ocean-400)]/12",
    heroDesktopGlow: "bg-[color:var(--color-ocean-400)]/12",
    heroMobileGlow: "bg-[color:var(--color-ocean-400)]/6",
    heroImage: "/_optimized/solution/crossBorder/ocean-hero-globe.jpg",
    heroImageAlt: "Container ship with global trade network globe",
    cardBorder: "border-[color:var(--color-ocean-400)]/14",
    cardHoverBorder: "hover:border-[color:var(--color-ocean-400)]/28",
    cardRail: "bg-[linear-gradient(180deg,var(--color-ocean-400),var(--color-ocean-600))]",
    cardBadge: "bg-[color:var(--color-ocean-400)]/10 text-[color:var(--color-ocean-500)]",
    glassBadge:
      "border-[color:var(--color-ocean-400)]/22 bg-[color:var(--color-ocean-400)]/10 text-[color:var(--color-ocean-300)]",
    glassLine:
      "bg-[linear-gradient(90deg,transparent,rgba(90,180,229,0.25),transparent)]",
    sectionBg: "bg-[linear-gradient(180deg,#ffffff,var(--color-ocean-50))]",
    sectionBorder: "border-[color:var(--color-ocean-400)]/10",
    sectionLine: "via-[color:var(--color-ocean-400)]/22",
    stepBadge:
      "border-[color:var(--color-ocean-500)]/18 bg-[color:var(--color-ocean-500)]/8 text-[color:var(--color-ocean-500)]",
    faqBg:
      "border-y border-[color:var(--color-ocean-400)]/10 bg-[linear-gradient(180deg,var(--color-surface-0),var(--color-ocean-100))]",
    accentColor: "var(--color-ocean-400)",
    orbMainColor: "rgba(45,139,201,0.3)",
    orbSecondaryColor: "rgba(90,176,222,0.14)",
    finalHeadingId: "ocean-freight-final-cta-heading",
    finalTrackingLocation: "cross_border_ocean_freight_final_cta",
    faqPanelPrefix: "ocean-faq",
    backCtaId: "cb_ocean_freight_back",
    backLabel: "Cross-Border Overview",
  },
} as const;

function useAnimations() {
  const reduceMotion = useReducedMotion() ?? false;

  const stagger: Variants = reduceMotion
    ? { hidden: { opacity: 1 }, show: { opacity: 1 } }
    : { hidden: {}, show: { transition: { staggerChildren: 0.05, delayChildren: 0.03 } } };

  const reveal: Variants = reduceMotion
    ? { hidden: { opacity: 1, y: 0 }, show: { opacity: 1, y: 0 } }
    : { hidden: { opacity: 1, y: 10 }, show: { opacity: 1, y: 0 } };

  const cardStagger: Variants = reduceMotion
    ? { hidden: { opacity: 1 }, show: { opacity: 1 } }
    : { hidden: {}, show: { transition: { staggerChildren: 0.05, delayChildren: 0.03 } } };

  return { reduceMotion, stagger, reveal, cardStagger };
}

function ModeEyebrow({
  label,
  theme,
  light = false,
}: {
  label: string;
  theme: ModeTheme;
  light?: boolean;
}) {
  const styles = THEME[theme];

  return (
    <div className="inline-flex items-center gap-2.5">
      <span
        aria-hidden
        className={cn(
          "inline-flex items-center gap-1.5 rounded-full px-2.5 py-1",
          light ? styles.eyebrowLight : styles.eyebrow,
        )}
      >
        <span className={cn("h-1.5 w-1.5 rounded-full", light ? styles.dotLight : styles.dot)} />
        <span className={cn("h-px w-8", light ? styles.lineLight : styles.line)} />
      </span>
      <p
        className={cn(
          "font-semibold uppercase",
          light
            ? "text-xs tracking-[0.16em] text-white/70"
            : theme === "air"
              ? "text-[10.5px] tracking-[0.14em] text-[color:var(--color-air-500)]"
              : "text-[10.5px] tracking-[0.14em] text-[color:var(--color-ocean-500)]",
        )}
      >
        {label}
      </p>
    </div>
  );
}

export function ModeHero({
  theme,
  eyebrow,
  title,
  description,
  primaryCta,
  secondaryCta,
}: {
  theme: ModeTheme;
  eyebrow: string;
  title: string;
  description: string;
  primaryCta: ModeCtaLink;
  secondaryCta: ModeCtaLink;
}) {
  const styles = THEME[theme];
  const { reduceMotion, stagger, reveal } = useAnimations();

  return (
    <section className="relative overflow-hidden border-b border-[color:var(--color-ssp-ink-800)]/40 bg-[linear-gradient(145deg,var(--color-footer-legal-bg),var(--color-ssp-ink-900)_35%,var(--color-ssp-ink-800))] py-20 sm:py-24 lg:py-28">
      <div className="pointer-events-none absolute inset-0" aria-hidden>
        <div className={cn("absolute top-[-60px] right-[20%] h-[300px] w-[300px] rounded-full blur-[120px]", styles.heroBackdrop)} />
        <div className="absolute bottom-[-80px] left-[-60px] h-[260px] w-[260px] rounded-full bg-white/5 blur-[100px]" />
        <div className="absolute top-[50%] left-[40%] h-[180px] w-[180px] rounded-full bg-white/4 blur-[80px]" />
      </div>

      <Container className="site-page-container relative">
        <div className="grid items-center gap-10 lg:grid-cols-2 lg:gap-14">
          <motion.div initial="hidden" animate="show" variants={stagger}>
            <motion.div variants={reveal} transition={{ duration: reduceMotion ? 0 : 0.3, ease: "easeOut" }}>
              <Link
                href="/solutions/cross-border"
                data-cta-id={styles.backCtaId}
                onClick={() =>
                  trackCtaClick({
                    ctaId: styles.backCtaId,
                    location: `cross_border_${styles.pageKey}_hero`,
                    destination: "/solutions/cross-border",
                    label: styles.backLabel,
                  })
                }
                className={cn("mb-6 inline-flex items-center gap-1.5 rounded text-xs font-medium text-white/50 transition-colors hover:text-white/75", styles.focusRingDark)}
              >
                <ChevronLeft className="h-3.5 w-3.5" aria-hidden />
                Cross-Border Overview
              </Link>
            </motion.div>

            <motion.div variants={reveal} transition={{ duration: reduceMotion ? 0 : 0.38, ease: "easeOut" }}>
              <ModeEyebrow label={eyebrow} theme={theme} light />
            </motion.div>

            <motion.h1
              variants={reveal}
              transition={{ duration: reduceMotion ? 0 : 0.38, ease: "easeOut" }}
              className="mt-5 max-w-xl text-3xl leading-[1.15] font-semibold tracking-tight text-white sm:text-4xl md:text-[44px] md:leading-[1.14]"
            >
              {title}
            </motion.h1>

            <motion.div
              variants={reveal}
              transition={{ duration: reduceMotion ? 0 : 0.45, ease: "easeOut" }}
              className="mt-6"
            >
              <p className="max-w-[56ch] text-[15px] leading-[1.85] text-white/72 sm:text-base">{description}</p>
            </motion.div>

            <motion.div
              variants={reveal}
              transition={{ duration: reduceMotion ? 0 : 0.42, ease: "easeOut" }}
              className="mt-9 flex flex-wrap gap-3.5"
            >
              <Link
                href={primaryCta.href}
                data-cta-id={primaryCta.ctaId}
                onClick={() =>
                  primaryCta.ctaId
                    ? trackCtaClick({
                        ctaId: primaryCta.ctaId,
                        location: `cross_border_${styles.pageKey}_hero`,
                        destination: primaryCta.href,
                        label: primaryCta.label,
                      })
                    : undefined
                }
                className={cn("inline-flex h-12 items-center px-6 text-sm font-semibold text-white transition", "site-cta-radius", styles.heroPrimary, styles.focusRingDark)}
              >
                {primaryCta.label}
              </Link>
              <Link
                href={secondaryCta.href}
                data-cta-id={secondaryCta.ctaId}
                onClick={() =>
                  secondaryCta.ctaId
                    ? trackCtaClick({
                        ctaId: secondaryCta.ctaId,
                        location: `cross_border_${styles.pageKey}_hero`,
                        destination: secondaryCta.href,
                        label: secondaryCta.label,
                      })
                    : undefined
                }
                className={cn("inline-flex h-12 items-center border px-6 text-sm font-medium transition", "site-cta-radius", styles.heroSecondary, styles.focusRingDark)}
              >
                {secondaryCta.label}
              </Link>
            </motion.div>
          </motion.div>

          <motion.div
            initial={{ opacity: 1, scale: 0.97 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: reduceMotion ? 0 : 0.4, ease: "easeOut", delay: 0.1 }}
            className="relative mt-4 hidden self-center lg:flex lg:items-center lg:justify-center"
          >
            <div
              aria-hidden
              className={cn(
                "pointer-events-none absolute top-[52%] left-1/2 h-[75%] w-[75%] -translate-x-1/2 -translate-y-1/2 rounded-full blur-[100px]",
                styles.heroDesktopGlow,
              )}
            />
            <Image
              src={styles.heroImage}
              alt={styles.heroImageAlt}
              width={640}
              height={480}
              sizes="(min-width: 1024px) 50vw, 0px"
              className="relative w-full max-w-[640px] object-contain"
              priority
            />
          </motion.div>
        </div>

        <motion.div
          initial={{ opacity: 1, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: reduceMotion ? 0 : 0.4, ease: "easeOut", delay: 0.15 }}
          className="relative mt-8 flex justify-center lg:hidden"
        >
          <div className="relative max-w-[340px] sm:max-w-[400px]">
            <div
              aria-hidden
              className={cn(
                "pointer-events-none absolute top-1/2 left-1/2 h-[65%] w-[65%] -translate-x-1/2 -translate-y-1/2 rounded-full blur-[60px]",
                styles.heroMobileGlow,
              )}
            />
            <Image
              src={styles.heroImage}
              alt={styles.heroImageAlt}
              width={400}
              height={300}
              sizes="(max-width: 639px) 340px, 400px"
              className="relative w-full object-contain"
              loading="eager"
            />
          </div>
        </motion.div>
      </Container>
    </section>
  );
}

export function ModeCardSection({
  theme,
  id,
  eyebrow,
  title,
  description,
  cards,
  layout = "sidebar",
  trackingLocation,
}: {
  theme: ModeTheme;
  id?: string;
  eyebrow: string;
  title: string;
  description: string;
  cards: readonly ModeCard[];
  layout?: "sidebar" | "centered";
  trackingLocation?: string;
}) {
  const styles = THEME[theme];
  const { reduceMotion, reveal, cardStagger } = useAnimations();
  const resolvedTrackingLocation = trackingLocation ?? `cross_border_${styles.pageKey}_capabilities`;

  const inner = (
    <motion.div
      className="grid gap-4 md:grid-cols-2"
      initial="hidden"
      whileInView="show"
      viewport={{ once: true, amount: 0.2 }}
      variants={cardStagger}
    >
      {cards.map((card, i) => {
        const content = (
          <>
            <div aria-hidden className={cn("pointer-events-none absolute inset-y-0 left-0 w-1", styles.cardRail)} />
            <span className={cn("inline-flex h-7 items-center rounded-md px-2.5 text-[11px] font-semibold tracking-[0.08em] uppercase", styles.cardBadge)}>
              0{i + 1}
            </span>
            <h3 className="mt-4 text-[18px] leading-snug font-semibold text-[color:var(--color-text)]">{card.title}</h3>
            <p className="mt-3 text-sm leading-7 text-[color:var(--color-muted)]">{card.body}</p>
            {card.href ? (
              <span className={cn("mt-4 inline-flex items-center gap-1.5 text-xs font-semibold", theme === "air" ? "text-[color:var(--color-air-400)] group-hover:text-[color:var(--color-air-500)]" : "text-[color:var(--color-ocean-400)] group-hover:text-[color:var(--color-ocean-500)]")}>
                Learn more
                <svg className="h-3.5 w-3.5 transition-transform motion-safe:group-hover:translate-x-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}><path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" /></svg>
              </span>
            ) : null}
          </>
        );

        return card.href ? (
          <motion.div key={card.title} variants={reveal} transition={{ duration: reduceMotion ? 0 : 0.4, ease: "easeOut" }}>
            <Link
              href={card.href}
              data-cta-id={card.ctaId}
              onClick={() =>
                card.ctaId
                  ? trackCtaClick({
                      ctaId: card.ctaId,
                      location: resolvedTrackingLocation,
                      destination: card.href!,
                      label: card.title,
                    })
                  : undefined
              }
              className={cn(
                "group block relative overflow-hidden rounded-2xl border bg-white px-5 py-6 shadow-[0_8px_20px_rgba(2,6,23,0.05)] transition-all duration-300 motion-safe:hover:-translate-y-1 hover:shadow-[0_16px_32px_rgba(2,6,23,0.10)] sm:px-6 sm:py-7",
                styles.cardBorder,
                styles.cardHoverBorder,
                styles.focusRing,
              )}
            >
              {content}
            </Link>
          </motion.div>
        ) : (
          <motion.article
            key={card.title}
            variants={reveal}
            transition={{ duration: reduceMotion ? 0 : 0.4, ease: "easeOut" }}
            className={cn(
              "group relative overflow-hidden rounded-2xl border bg-white px-5 py-6 shadow-[0_8px_20px_rgba(2,6,23,0.05)] transition-all duration-300 motion-safe:hover:-translate-y-1 hover:shadow-[0_16px_32px_rgba(2,6,23,0.10)] sm:px-6 sm:py-7",
              styles.cardBorder,
              styles.cardHoverBorder,
            )}
          >
            {content}
          </motion.article>
        );
      })}
    </motion.div>
  );

  return (
    <section
      id={id}
      className={cn(
        "relative overflow-hidden py-20 sm:py-24",
        styles.sectionBg,
        layout === "centered" ? styles.sectionBorder : "",
        id && "scroll-mt-24",
      )}
    >
      <div className="pointer-events-none absolute inset-0" aria-hidden>
        <div className={cn("absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent to-transparent", styles.sectionLine)} />
        <div
          className="absolute left-0 top-0 h-[min(21rem,54vh)] w-full max-w-4xl opacity-[0.038]"
          style={{
            backgroundImage:
              "linear-gradient(to right, var(--color-company-companies-grid-line) 1px, transparent 1px), linear-gradient(to bottom, var(--color-company-companies-grid-line) 1px, transparent 1px)",
            backgroundSize: "62px 62px",
            maskImage: "radial-gradient(118% 98% at 0% 0%, black 0%, rgba(0,0,0,0.92) 60%, transparent 100%)",
            WebkitMaskImage:
              "radial-gradient(118% 98% at 0% 0%, black 0%, rgba(0,0,0,0.92) 60%, transparent 100%)",
          }}
        />
      </div>
      <Container className="site-page-container">
        {layout === "centered" ? (
          <>
            <motion.div
              className="mx-auto max-w-3xl text-center"
              initial="hidden"
              whileInView="show"
              viewport={{ once: true, amount: 0.15 }}
              variants={reveal}
              transition={{ duration: reduceMotion ? 0 : 0.45, ease: "easeOut" }}
            >
              <div className="flex justify-center">
                <ModeEyebrow label={eyebrow} theme={theme} />
              </div>
              <h2 className="mt-4 text-3xl leading-tight font-semibold text-[color:var(--color-text)] sm:text-4xl">
                {title}
              </h2>
              <p className="mt-4 text-[15px] leading-8 text-[color:var(--color-muted)]">{description}</p>
            </motion.div>
            <div className="mt-10">{inner}</div>
          </>
        ) : (
          <div className="grid gap-8 lg:grid-cols-12 lg:items-start">
            <motion.div
              className="lg:col-span-4 lg:pr-6"
              initial="hidden"
              whileInView="show"
              viewport={{ once: true, amount: 0.15 }}
              variants={reveal}
              transition={{ duration: reduceMotion ? 0 : 0.45, ease: "easeOut" }}
            >
              <ModeEyebrow label={eyebrow} theme={theme} />
              <h2 className="mt-3 text-3xl leading-tight font-semibold text-[color:var(--color-text)]">{title}</h2>
              <p className="mt-4 text-[15px] leading-8 text-[color:var(--color-muted)]">{description}</p>
            </motion.div>
            <div className="lg:col-span-8">{inner}</div>
          </div>
        )}
      </Container>
    </section>
  );
}

export function ModeGlassSection({
  theme,
  eyebrow,
  title,
  description,
  cards,
}: {
  theme: ModeTheme;
  eyebrow: string;
  title: string;
  description: string;
  cards: readonly ModeCard[];
}) {
  const styles = THEME[theme];
  const { reduceMotion, reveal, cardStagger } = useAnimations();

  return (
    <section className="relative overflow-hidden border-y border-[color:var(--color-ssp-ink-800)]/40 bg-[linear-gradient(160deg,var(--color-footer-legal-bg),var(--color-ssp-ink-900)_45%,var(--color-ssp-ink-800))] py-20 sm:py-24">
      <div className="pointer-events-none absolute inset-0" aria-hidden>
        <div className="absolute top-[20%] right-[-60px] h-[240px] w-[240px] rounded-full bg-white/6 blur-[100px]" />
        <div className="absolute bottom-[-40px] left-[20%] h-[200px] w-[200px] rounded-full bg-white/5 blur-[90px]" />
      </div>

      <Container className="site-page-container relative">
        <motion.div
          className="mx-auto max-w-3xl text-center"
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, amount: 0.15 }}
          variants={reveal}
          transition={{ duration: reduceMotion ? 0 : 0.45, ease: "easeOut" }}
        >
          <div className="flex justify-center">
            <ModeEyebrow label={eyebrow} theme={theme} light />
          </div>
          <h2 className="mt-4 text-3xl leading-tight font-semibold text-white sm:text-4xl">{title}</h2>
          <p className="mt-4 text-[15px] leading-8 text-white/65">{description}</p>
        </motion.div>

        <motion.div
          className="mt-10 grid gap-4 md:grid-cols-2"
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, amount: 0.2 }}
          variants={cardStagger}
        >
          {cards.map((card, i) => (
            <motion.article
              key={card.title}
              variants={reveal}
              transition={{ duration: reduceMotion ? 0 : 0.4, ease: "easeOut" }}
              className="group relative overflow-hidden rounded-2xl border border-white/10 bg-white/[0.05] px-5 py-6 shadow-[0_8px_32px_rgba(0,0,0,0.22),inset_0_1px_0_rgba(255,255,255,0.06)] backdrop-blur-sm transition-all duration-300 motion-safe:hover:-translate-y-1 hover:border-white/18 hover:bg-white/[0.08] hover:shadow-[0_20px_48px_rgba(0,0,0,0.36),inset_0_1px_0_rgba(255,255,255,0.10)] sm:px-6 sm:py-7"
            >
              <div aria-hidden className={cn("pointer-events-none absolute inset-x-0 top-0 h-px", styles.glassLine)} />
              <span className={cn("inline-flex h-7 items-center rounded-md border px-2.5 text-[11px] font-semibold tracking-[0.08em] uppercase", styles.glassBadge)}>
                0{i + 1}
              </span>
              <h3 className="mt-4 text-[18px] leading-snug font-semibold text-white">{card.title}</h3>
              <p className="mt-3 text-sm leading-7 text-white/60">{card.body}</p>
            </motion.article>
          ))}
        </motion.div>
      </Container>
    </section>
  );
}

export function ModeStepsSection({
  theme,
  eyebrow,
  title,
  description,
  steps,
}: {
  theme: ModeTheme;
  eyebrow: string;
  title: string;
  description: string;
  steps: readonly ModeStep[];
}) {
  const styles = THEME[theme];
  const { reduceMotion, reveal, cardStagger } = useAnimations();

  return (
    <section className={cn("relative overflow-hidden border-y bg-[linear-gradient(180deg,#ffffff,var(--color-surface-0-light))] py-20 sm:py-24", styles.sectionBorder)}>
      <div className="pointer-events-none absolute inset-0" aria-hidden>
        <div className={cn("absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent to-transparent", styles.sectionLine)} />
        <div
          className="absolute left-0 top-0 h-[min(21rem,54vh)] w-full max-w-4xl opacity-[0.038]"
          style={{
            backgroundImage:
              "linear-gradient(to right, var(--color-company-companies-grid-line) 1px, transparent 1px), linear-gradient(to bottom, var(--color-company-companies-grid-line) 1px, transparent 1px)",
            backgroundSize: "62px 62px",
            maskImage: "radial-gradient(118% 98% at 0% 0%, black 0%, rgba(0,0,0,0.92) 60%, transparent 100%)",
            WebkitMaskImage:
              "radial-gradient(118% 98% at 0% 0%, black 0%, rgba(0,0,0,0.92) 60%, transparent 100%)",
          }}
        />
      </div>
      <Container className="site-page-container">
        <motion.div
          className="mx-auto max-w-3xl text-center"
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, amount: 0.15 }}
          variants={reveal}
          transition={{ duration: reduceMotion ? 0 : 0.45, ease: "easeOut" }}
        >
          <div className="flex justify-center">
            <ModeEyebrow label={eyebrow} theme={theme} />
          </div>
          <h2 className="mt-4 text-3xl leading-tight font-semibold text-[color:var(--color-text)] sm:text-4xl">
            {title}
          </h2>
          <p className="mt-4 text-[15px] leading-8 text-[color:var(--color-muted)]">{description}</p>
        </motion.div>

        <motion.div
          className="relative mt-11"
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, amount: 0.2 }}
          variants={cardStagger}
        >
          <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-4">
            {steps.map((step) => (
              <motion.article
                key={step.step}
                variants={reveal}
                transition={{ duration: reduceMotion ? 0 : 0.4, ease: "easeOut" }}
                className={cn(
                  "group relative overflow-hidden rounded-2xl border bg-white px-4 py-6 shadow-[0_10px_24px_rgba(2,6,23,0.06)] transition-all duration-300 motion-safe:hover:-translate-y-1 hover:shadow-[0_18px_30px_rgba(2,6,23,0.12)] sm:px-5 sm:py-7",
                  styles.sectionBorder,
                )}
              >
                <div className={cn("inline-flex h-7 items-center rounded-md border px-2.5 text-[11px] font-semibold tracking-[0.08em] uppercase", styles.stepBadge)}>
                  Step {step.step}
                </div>
                <h3 className="mt-4 text-[20px] leading-snug font-semibold text-[color:var(--color-text)]">
                  {step.title}
                </h3>
                <p className="mt-3 text-sm leading-7 text-[color:var(--color-muted)]">{step.body}</p>
              </motion.article>
            ))}
          </div>
        </motion.div>
      </Container>
    </section>
  );
}

export function ModeFaqSection({
  theme,
  eyebrow,
  title,
  description,
  items,
}: {
  theme: ModeTheme;
  eyebrow: string;
  title: string;
  description: string;
  items: readonly ModeFaqItem[];
}) {
  const styles = THEME[theme];

  return (
    <SharedFaqSection
      eyebrow={<ModeEyebrow label={eyebrow} theme={theme} />}
      title={title}
      description={description}
      items={items}
      theme="light"
      panelIdPrefix={styles.faqPanelPrefix}
    />
  );
}

export function ModeCtaSection({
  theme,
  eyebrow,
  title,
  description,
  pills,
  primaryCta,
  secondaryCta,
}: {
  theme: ModeTheme;
  eyebrow: string;
  title: string;
  description: string;
  pills: readonly string[];
  primaryCta: ModeCtaLink;
  secondaryCta: ModeCtaLink;
}) {
  const styles = THEME[theme];

  return (
    <StandardFinalCta
      variant="cross-border"
      headingId={styles.finalHeadingId}
      trackingLocation={styles.finalTrackingLocation}
      accentColor={styles.accentColor}
      orbMainColor={styles.orbMainColor}
      orbSecondaryColor={styles.orbSecondaryColor}
      eyebrow={<ModeEyebrow label={eyebrow} theme={theme} light />}
      data={{
        kicker: eyebrow,
        title,
        body: description,
        trustSignals: pills,
        ctas: {
          primary: {
            label: primaryCta.label,
            href: primaryCta.href,
            ctaId: primaryCta.ctaId,
          },
          secondary: {
            label: secondaryCta.label,
            href: secondaryCta.href,
            ctaId: secondaryCta.ctaId,
          },
        },
      }}
      bodyClassName="max-w-3xl text-sm leading-7 text-white/65"
    />
  );
}
