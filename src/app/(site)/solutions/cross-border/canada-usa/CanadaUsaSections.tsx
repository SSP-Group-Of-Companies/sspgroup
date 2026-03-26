"use client";

import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import { AnimatePresence, motion, useReducedMotion, type Variants } from "framer-motion";
import { ChevronLeft } from "lucide-react";
import { cn } from "@/lib/cn";
import { Container } from "@/app/(site)/components/layout/Container";

/* ── Shared types ────────────────────────────────────────────────────── */

export type CorridorCard = { readonly title: string; readonly body: string; readonly href?: string };
export type CorridorStep = { readonly step: string; readonly title: string; readonly body: string };
export type CorridorFaqItem = { readonly q: string; readonly a: string };
export type CtaLink = { readonly label: string; readonly href: string };

/* ── Corridor-themed eyebrow ─────────────────────────────────────────── */

function CorridorEyebrow({ label, light = false }: { label: string; light?: boolean }) {
  return (
    <div className="inline-flex items-center gap-2.5">
      <span
        aria-hidden
        className={cn(
          "inline-flex items-center gap-1.5 rounded-full px-2.5 py-1",
          light
            ? "border border-white/24 bg-white/8"
            : "border border-[color:var(--color-corridor-400)]/20 bg-[color:var(--color-corridor-400)]/6",
        )}
      >
        <span
          className={cn(
            "h-1.5 w-1.5 rounded-full",
            light ? "bg-[color:var(--color-corridor-300)]" : "bg-[color:var(--color-corridor-400)]",
          )}
        />
        <span
          className={cn(
            "h-px w-8",
            light
              ? "bg-[linear-gradient(90deg,var(--color-corridor-300),rgba(255,255,255,0.35))]"
              : "bg-[linear-gradient(90deg,var(--color-corridor-400),rgba(12,23,38,0.18))]",
          )}
        />
      </span>
      <p
        className={cn(
          "font-semibold uppercase",
          light
            ? "text-xs tracking-[0.16em] text-white/70"
            : "text-[10.5px] tracking-[0.14em] text-[color:var(--color-corridor-500)]",
        )}
      >
        {label}
      </p>
    </div>
  );
}

/* ── Animation helpers ───────────────────────────────────────────────── */

function useAnimations() {
  const reduceMotion = useReducedMotion();

  const stagger: Variants = reduceMotion
    ? { hidden: { opacity: 1 }, show: { opacity: 1 } }
    : { hidden: {}, show: { transition: { staggerChildren: 0.08, delayChildren: 0.06 } } };

  const reveal: Variants = reduceMotion
    ? { hidden: { opacity: 1, y: 0 }, show: { opacity: 1, y: 0 } }
    : { hidden: { opacity: 0, y: 16 }, show: { opacity: 1, y: 0 } };

  const cardStagger: Variants = reduceMotion
    ? { hidden: { opacity: 1 }, show: { opacity: 1 } }
    : { hidden: {}, show: { transition: { staggerChildren: 0.06, delayChildren: 0.03 } } };

  return { reduceMotion, stagger, reveal, cardStagger };
}

const focusRing =
  "focus:outline-none focus-visible:ring-2 focus-visible:ring-[color:var(--color-corridor-400)] focus-visible:ring-offset-2 focus-visible:ring-offset-white";

const focusRingDark =
  "focus:outline-none focus-visible:ring-2 focus-visible:ring-[color:var(--color-corridor-300)] focus-visible:ring-offset-2 focus-visible:ring-offset-[color:var(--color-footer-legal-bg)]";

/* ── SVG pattern data URIs (light-bg variants) ──────────────────────── */

const gridPatternSvg = `url("data:image/svg+xml,%3Csvg width='80' height='80' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath d='M80 0H0v80' fill='none' stroke='%230d4f78' stroke-opacity='0.04' stroke-width='0.5'/%3E%3C/svg%3E")`;

const diagonalPatternSvg = `url("data:image/svg+xml,%3Csvg width='48' height='48' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath d='M0 48L48 0' fill='none' stroke='%232b4a8e' stroke-opacity='0.035' stroke-width='0.5'/%3E%3C/svg%3E")`;

/* ── Flag watermark components ────────────────────────────────────────── */

/* ── Hero image paths ─────────────────────────────────────────────────── */

const HERO_IMAGES: Record<string, { src: string; alt: string }> = {
  "canada-usa": {
    src: "/_optimized/solutions/canada-usa-hero-v2.png",
    alt: "Map illustration showing the Canada–USA cross-border freight corridor with route connection between both countries",
  },
  mexico: {
    src: "/_optimized/solutions/mexico-hero-v2.png",
    alt: "Map illustration showing the U.S.–Mexico cross-border freight corridor with route connection between both countries",
  },
};

/* ═══════════════════════════════════════════════════════════════════════
   1. HERO — Light background, full-width text, SVG patterns, optional flag
   ═══════════════════════════════════════════════════════════════════════ */

export function CorridorHero({
  eyebrow,
  title,
  description,
  primaryCta,
  secondaryCta,
  flag,
}: {
  eyebrow: string;
  title: string;
  description: string;
  primaryCta: CtaLink;
  secondaryCta: CtaLink;
  flag?: "mexico" | "canada-usa";
}) {
  const { reduceMotion, stagger, reveal } = useAnimations();

  return (
    <section className="relative overflow-hidden border-b border-[color:var(--color-border)] bg-[linear-gradient(180deg,#fafbfd,#f0f2f7)] py-14 sm:py-16 lg:py-24">
      {/* Grid pattern */}
      <div
        className="pointer-events-none absolute inset-0"
        aria-hidden
        style={{ backgroundImage: gridPatternSvg }}
      />

      {/* Diagonal accent lines */}
      <div
        className="pointer-events-none absolute inset-0"
        aria-hidden
        style={{ backgroundImage: diagonalPatternSvg }}
      />

      {/* Subtle indigo ambient glows */}
      <div className="pointer-events-none absolute inset-0" aria-hidden>
        <div className="absolute top-[-80px] right-[20%] h-[300px] w-[300px] rounded-full bg-[color:var(--color-corridor-400)]/6 blur-[140px]" />
        <div className="absolute bottom-[-60px] left-[10%] h-[240px] w-[240px] rounded-full bg-[color:var(--color-corridor-300)]/5 blur-[120px]" />
      </div>

      <Container className="site-page-container relative">
        {/* Corridor hero image — inside container for alignment */}
        {flag && HERO_IMAGES[flag] ? (
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: reduceMotion ? 0 : 0.7, ease: "easeOut", delay: 0.2 }}
            className="pointer-events-none absolute top-1/2 right-[-3%] hidden h-[380px] w-[530px] -translate-y-1/2 lg:block xl:right-[-2%] xl:h-[440px] xl:w-[610px] 2xl:right-0 2xl:h-[480px] 2xl:w-[670px]"
          >
            <Image
              src={HERO_IMAGES[flag].src}
              alt={HERO_IMAGES[flag].alt}
              fill
              className="object-contain object-right"
              sizes="(min-width:1536px) 700px, (min-width:1280px) 640px, 560px"
              priority
            />
          </motion.div>
        ) : null}

        <motion.div initial="hidden" animate="show" variants={stagger}>
          <motion.div variants={reveal} transition={{ duration: reduceMotion ? 0 : 0.3, ease: "easeOut" }}>
            <Link
              href="/solutions/cross-border"
              className={cn("mb-6 inline-flex items-center gap-1.5 rounded text-xs font-medium text-[color:var(--color-muted)] transition-colors hover:text-[color:var(--color-text)]", focusRing)}
            >
              <ChevronLeft className="h-3.5 w-3.5" />
              Cross-Border Overview
            </Link>
          </motion.div>

          <motion.div variants={reveal} transition={{ duration: reduceMotion ? 0 : 0.38, ease: "easeOut" }}>
            <CorridorEyebrow label={eyebrow} />
          </motion.div>

          <motion.h1
            variants={reveal}
            transition={{ duration: reduceMotion ? 0 : 0.48, ease: "easeOut" }}
            className="mt-5 max-w-3xl text-3xl leading-[1.15] font-semibold tracking-tight text-[color:var(--color-ssp-ink-800)] sm:text-4xl md:text-[44px] md:leading-[1.14] lg:text-[52px] lg:leading-[1.12]"
          >
            {title}
          </motion.h1>

          <motion.div
            variants={reveal}
            transition={{ duration: reduceMotion ? 0 : 0.45, ease: "easeOut" }}
            className="mt-6"
          >
            <p className="max-w-[64ch] text-[15px] leading-[1.85] text-[color:var(--color-muted)] sm:text-base sm:leading-[1.9]">{description}</p>
          </motion.div>

          <motion.div
            variants={reveal}
            transition={{ duration: reduceMotion ? 0 : 0.42, ease: "easeOut" }}
            className="mt-9 flex flex-wrap gap-3.5"
          >
            <Link
              href={primaryCta.href}
              className={cn("inline-flex h-12 items-center rounded-lg bg-[color:var(--color-corridor-400)] px-6 text-sm font-semibold text-white shadow-[0_6px_20px_rgba(43,74,142,0.3)] transition hover:bg-[color:var(--color-corridor-500)] hover:shadow-[0_10px_28px_rgba(43,74,142,0.4)]", focusRing)}
            >
              {primaryCta.label}
            </Link>
            <Link
              href={secondaryCta.href}
              className={cn("inline-flex h-12 items-center rounded-lg border border-[color:var(--color-ssp-ink-800)]/20 px-6 text-sm font-medium text-[color:var(--color-ssp-ink-800)] transition hover:border-[color:var(--color-ssp-ink-800)]/40 hover:bg-[color:var(--color-ssp-ink-800)]/5", focusRing)}
            >
              {secondaryCta.label}
            </Link>
          </motion.div>
        </motion.div>
      </Container>
    </section>
  );
}

/* ═══════════════════════════════════════════════════════════════════════
   2. CARD SECTION — Light background, indigo accent borders
   ═══════════════════════════════════════════════════════════════════════ */

export function CorridorCardSection({
  id,
  eyebrow,
  title,
  description,
  cards,
  layout = "sidebar",
}: {
  id?: string;
  eyebrow: string;
  title: string;
  description: string;
  cards: readonly CorridorCard[];
  layout?: "sidebar" | "centered";
}) {
  const { reduceMotion, reveal, cardStagger } = useAnimations();

  const cardClasses =
    "group relative overflow-hidden rounded-2xl border border-[color:var(--color-corridor-400)]/14 bg-white px-5 py-6 shadow-[0_8px_20px_rgba(2,6,23,0.05)] transition-all duration-300 hover:-translate-y-1 hover:border-[color:var(--color-corridor-400)]/28 hover:shadow-[0_16px_32px_rgba(2,6,23,0.10)] sm:px-6 sm:py-7";

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
            <div
              aria-hidden
              className="pointer-events-none absolute inset-y-0 left-0 w-1 bg-[linear-gradient(180deg,var(--color-corridor-400),var(--color-corridor-600))]"
            />
            <span className="inline-flex h-7 items-center rounded-md bg-[color:var(--color-corridor-400)]/10 px-2.5 text-[11px] font-semibold tracking-[0.08em] text-[color:var(--color-corridor-500)] uppercase">
              0{i + 1}
            </span>
            <h3 className="mt-4 text-[18px] leading-snug font-semibold text-[color:var(--color-text)]">{card.title}</h3>
            <p className="mt-3 text-sm leading-7 text-[color:var(--color-muted)]">{card.body}</p>
            {card.href ? (
              <span className="mt-4 inline-flex items-center gap-1.5 text-xs font-semibold text-[color:var(--color-corridor-400)] transition-colors group-hover:text-[color:var(--color-corridor-500)]">
                Learn more
                <svg className="h-3.5 w-3.5 transition-transform group-hover:translate-x-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}><path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" /></svg>
              </span>
            ) : null}
          </>
        );

        return card.href ? (
          <motion.div key={card.title} variants={reveal} transition={{ duration: reduceMotion ? 0 : 0.4, ease: "easeOut" }}>
            <Link href={card.href} className={cn(cardClasses, focusRing, "block")}>
              {content}
            </Link>
          </motion.div>
        ) : (
          <motion.article key={card.title} variants={reveal} transition={{ duration: reduceMotion ? 0 : 0.4, ease: "easeOut" }} className={cardClasses}>
            {content}
          </motion.article>
        );
      })}
    </motion.div>
  );

  if (layout === "centered") {
    return (
      <section id={id} className={cn("border-y border-[color:var(--color-corridor-400)]/10 bg-[linear-gradient(180deg,#ffffff,var(--color-corridor-50))] py-20 sm:py-24", id && "scroll-mt-24")}>
        <Container className="site-page-container">
          <motion.div
            className="mx-auto max-w-3xl text-center"
            initial="hidden"
            whileInView="show"
            viewport={{ once: true, amount: 0.35 }}
            variants={reveal}
            transition={{ duration: reduceMotion ? 0 : 0.45, ease: "easeOut" }}
          >
            <div className="flex justify-center">
              <CorridorEyebrow label={eyebrow} />
            </div>
            <h2 className="mt-4 text-3xl leading-tight font-semibold text-[color:var(--color-text)] sm:text-4xl">
              {title}
            </h2>
            <p className="mt-4 text-[15px] leading-8 text-[color:var(--color-muted)]">{description}</p>
          </motion.div>
          <div className="mt-10">{inner}</div>
        </Container>
      </section>
    );
  }

  return (
    <section id={id} className={cn("bg-[linear-gradient(180deg,#ffffff,var(--color-corridor-50))] py-20 sm:py-24", id && "scroll-mt-24")}>
      <Container className="site-page-container">
        <div className="grid gap-8 lg:grid-cols-12 lg:items-start">
          <motion.div
            className="lg:col-span-4 lg:pr-6"
            initial="hidden"
            whileInView="show"
            viewport={{ once: true, amount: 0.35 }}
            variants={reveal}
            transition={{ duration: reduceMotion ? 0 : 0.45, ease: "easeOut" }}
          >
            <CorridorEyebrow label={eyebrow} />
            <h2 className="mt-3 text-3xl leading-tight font-semibold text-[color:var(--color-text)]">{title}</h2>
            <p className="mt-4 text-[15px] leading-8 text-[color:var(--color-muted)]">{description}</p>
          </motion.div>
          <div className="lg:col-span-8">{inner}</div>
        </div>
      </Container>
    </section>
  );
}

/* ═══════════════════════════════════════════════════════════════════════
   3. GLASS CARDS — Dark background with indigo glass-morphism cards
   ═══════════════════════════════════════════════════════════════════════ */

export function CorridorGlassSection({
  eyebrow,
  title,
  description,
  cards,
}: {
  eyebrow: string;
  title: string;
  description: string;
  cards: readonly CorridorCard[];
}) {
  const { reduceMotion, reveal, cardStagger } = useAnimations();

  return (
    <section className="relative overflow-hidden border-y border-[color:var(--color-ssp-ink-800)]/40 bg-[linear-gradient(160deg,var(--color-footer-legal-bg),var(--color-ssp-ink-900)_45%,var(--color-ssp-ink-800))] py-20 sm:py-24">
      <div className="pointer-events-none absolute inset-0" aria-hidden>
        <div className="absolute top-[20%] right-[-60px] h-[240px] w-[240px] rounded-full bg-[color:var(--color-corridor-400)]/8 blur-[100px]" />
        <div className="absolute bottom-[-40px] left-[20%] h-[200px] w-[200px] rounded-full bg-[color:var(--color-corridor-300)]/6 blur-[90px]" />
      </div>

      <Container className="site-page-container relative">
        <motion.div
          className="mx-auto max-w-3xl text-center"
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, amount: 0.35 }}
          variants={reveal}
          transition={{ duration: reduceMotion ? 0 : 0.45, ease: "easeOut" }}
        >
          <div className="flex justify-center">
            <CorridorEyebrow label={eyebrow} light />
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
              className="group relative overflow-hidden rounded-2xl border border-white/10 bg-white/[0.05] px-5 py-6 shadow-[0_8px_32px_rgba(0,0,0,0.22),inset_0_1px_0_rgba(255,255,255,0.06)] backdrop-blur-sm transition-all duration-300 hover:-translate-y-1 hover:border-white/18 hover:bg-white/[0.08] hover:shadow-[0_20px_48px_rgba(0,0,0,0.36),inset_0_1px_0_rgba(255,255,255,0.10)] sm:px-6 sm:py-7"
            >
              <div
                aria-hidden
                className="pointer-events-none absolute inset-x-0 top-0 h-px bg-[linear-gradient(90deg,transparent,rgba(82,114,184,0.25),transparent)]"
              />
              <span className="inline-flex h-7 items-center rounded-md border border-[color:var(--color-corridor-400)]/22 bg-[color:var(--color-corridor-400)]/10 px-2.5 text-[11px] font-semibold tracking-[0.08em] text-[color:var(--color-corridor-300)] uppercase">
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

/* ═══════════════════════════════════════════════════════════════════════
   4. PROCESS STEPS — Light section with connected step cards
   ═══════════════════════════════════════════════════════════════════════ */

export function CorridorStepsSection({
  eyebrow,
  title,
  description,
  steps,
}: {
  eyebrow: string;
  title: string;
  description: string;
  steps: readonly CorridorStep[];
}) {
  const { reduceMotion, reveal, cardStagger } = useAnimations();

  return (
    <section className="border-y border-[color:var(--color-corridor-400)]/10 bg-[linear-gradient(180deg,var(--color-corridor-50),#ffffff)] py-20 sm:py-24">
      <Container className="site-page-container">
        <motion.div
          className="mx-auto max-w-3xl text-center"
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, amount: 0.35 }}
          variants={reveal}
          transition={{ duration: reduceMotion ? 0 : 0.45, ease: "easeOut" }}
        >
          <div className="flex justify-center">
            <CorridorEyebrow label={eyebrow} />
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
          <div
            aria-hidden
            className="absolute top-5 right-12 left-12 hidden h-px bg-[linear-gradient(90deg,var(--color-corridor-400)/0.18,var(--color-corridor-500)/0.35,var(--color-corridor-400)/0.18)] xl:block"
          />
          <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-4">
            {steps.map((step) => (
              <motion.article
                key={step.step}
                variants={reveal}
                transition={{ duration: reduceMotion ? 0 : 0.4, ease: "easeOut" }}
                className="group relative overflow-hidden rounded-2xl border border-[color:var(--color-corridor-400)]/12 bg-white px-4 py-6 shadow-[0_10px_24px_rgba(2,6,23,0.06)] transition-all duration-300 hover:-translate-y-1 hover:border-[color:var(--color-corridor-400)]/24 hover:shadow-[0_18px_30px_rgba(2,6,23,0.12)] sm:px-5 sm:py-7"
              >
                <div className="inline-flex h-7 items-center rounded-md border border-[color:var(--color-corridor-500)]/18 bg-[color:var(--color-corridor-500)]/8 px-2.5 text-[11px] font-semibold tracking-[0.08em] text-[color:var(--color-corridor-500)] uppercase">
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

/* ═══════════════════════════════════════════════════════════════════════
   5. FAQ — Light indigo-tinted background with corridor accents
   ═══════════════════════════════════════════════════════════════════════ */

export function CorridorFaqSection({
  eyebrow,
  title,
  description,
  items,
}: {
  eyebrow: string;
  title: string;
  description: string;
  items: readonly CorridorFaqItem[];
}) {
  const { reduceMotion, reveal, cardStagger } = useAnimations();
  const [openIdx, setOpenIdx] = useState(0);

  return (
    <section className="border-y border-[color:var(--color-corridor-400)]/10 bg-[linear-gradient(180deg,var(--color-surface-0),var(--color-corridor-100))] py-20 sm:py-24">
      <Container className="site-page-container">
        <div className="grid gap-7 lg:grid-cols-12">
          <motion.div
            className="lg:col-span-4"
            initial="hidden"
            whileInView="show"
            viewport={{ once: true, amount: 0.35 }}
            variants={reveal}
            transition={{ duration: reduceMotion ? 0 : 0.45, ease: "easeOut" }}
          >
            <CorridorEyebrow label={eyebrow} />
            <h2 className="mt-3 text-3xl leading-tight font-semibold text-[color:var(--color-text)]">{title}</h2>
            <p className="mt-4 text-[15px] leading-8 text-[color:var(--color-muted)]">{description}</p>
          </motion.div>

          <motion.div
            className="lg:col-span-8"
            initial="hidden"
            whileInView="show"
            viewport={{ once: true, amount: 0.2 }}
            variants={cardStagger}
          >
            <motion.div
              variants={reveal}
              transition={{ duration: reduceMotion ? 0 : 0.35, ease: "easeOut" }}
              className="overflow-hidden rounded-2xl border border-[color:var(--color-corridor-400)]/14 bg-white shadow-[0_8px_24px_rgba(2,6,23,0.06)]"
            >
              {items.map((item, idx) => {
                const isOpen = idx === openIdx;
                const panelId = `corridor-faq-panel-${idx}`;
                return (
                  <article
                    key={item.q}
                    className={idx < items.length - 1 ? "border-b border-[color:var(--color-corridor-400)]/10" : ""}
                  >
                    <button
                      type="button"
                      onClick={() => setOpenIdx((p) => (p === idx ? -1 : idx))}
                      className={cn(
                        "flex w-full items-start justify-between gap-3 px-4 py-4 text-left transition-colors hover:bg-[color:var(--color-corridor-400)]/5 sm:gap-4 sm:px-6 sm:py-5",
                        focusRing,
                      )}
                      aria-expanded={isOpen}
                      aria-controls={panelId}
                    >
                      <h3 className="text-[15px] leading-snug font-semibold text-[color:var(--color-text)] sm:text-[17px]">
                        {item.q}
                      </h3>
                      <span
                        aria-hidden
                        className={cn(
                          "relative mt-0.5 inline-flex h-6 w-6 shrink-0 items-center justify-center rounded-full border transition-colors",
                          isOpen
                            ? "border-[color:var(--color-corridor-400)]/30"
                            : "border-[color:var(--color-corridor-400)]/14",
                        )}
                      >
                        <span
                          className={cn(
                            "absolute h-[1.5px] w-2.5 rounded-full transition-colors",
                            isOpen ? "bg-[color:var(--color-corridor-400)]" : "bg-[color:var(--color-muted)]",
                          )}
                        />
                        <span
                          className={cn(
                            "absolute h-2.5 w-[1.5px] rounded-full transition-all duration-200",
                            isOpen ? "scale-0 bg-[color:var(--color-corridor-400)]" : "scale-100 bg-[color:var(--color-muted)]",
                          )}
                        />
                      </span>
                    </button>
                    <AnimatePresence initial={false}>
                      {isOpen ? (
                        <motion.div
                          id={panelId}
                          role="region"
                          initial={{ height: 0, opacity: 0 }}
                          animate={{ height: "auto", opacity: 1 }}
                          exit={{ height: 0, opacity: 0 }}
                          transition={{ duration: reduceMotion ? 0 : 0.24, ease: "easeOut" }}
                          className="overflow-hidden"
                        >
                          <p className="px-4 pb-4 text-sm leading-7 text-[color:var(--color-muted)] sm:px-6 sm:pb-5">
                            {item.a}
                          </p>
                        </motion.div>
                      ) : null}
                    </AnimatePresence>
                  </article>
                );
              })}
            </motion.div>
          </motion.div>
        </div>
      </Container>
    </section>
  );
}

/* ═══════════════════════════════════════════════════════════════════════
   6. CLOSING CTA — Deep gradient with indigo glass card
   ═══════════════════════════════════════════════════════════════════════ */

export function CorridorCtaSection({
  eyebrow,
  title,
  description,
  pills,
  primaryCta,
  secondaryCta,
}: {
  eyebrow: string;
  title: string;
  description: string;
  pills: readonly string[];
  primaryCta: CtaLink;
  secondaryCta: CtaLink;
}) {
  const { reduceMotion, reveal } = useAnimations();

  return (
    <section className="relative overflow-hidden border-t border-[color:var(--color-ssp-ink-800)]/40 bg-[linear-gradient(145deg,var(--color-footer-legal-bg),var(--color-ssp-ink-900)_40%,var(--color-ssp-ink-800))] py-20 sm:py-24">
      <div className="pointer-events-none absolute inset-0" aria-hidden>
        <div className="absolute bottom-[-60px] right-[10%] h-[200px] w-[200px] rounded-full bg-[color:var(--color-corridor-400)]/8 blur-[100px]" />
        <div className="absolute top-[-40px] left-[25%] h-[180px] w-[180px] rounded-full bg-[color:var(--color-corridor-300)]/6 blur-[80px]" />
      </div>

      <Container className="site-page-container relative">
        <motion.div
          className="rounded-2xl border border-white/12 bg-white/[0.04] px-5 py-8 backdrop-blur-sm sm:px-8 sm:py-10 md:px-10"
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, amount: 0.35 }}
          variants={reveal}
          transition={{ duration: reduceMotion ? 0 : 0.45, ease: "easeOut" }}
        >
          <div className="grid gap-7 lg:grid-cols-12 lg:items-center">
            <div className="lg:col-span-8">
              <CorridorEyebrow label={eyebrow} light />
              <h2 className="mt-3 text-2xl leading-tight font-semibold text-white sm:text-3xl">{title}</h2>
              <p className="mt-3 max-w-3xl text-sm leading-7 text-white/65">{description}</p>
              <div className="mt-5 flex flex-wrap gap-2 text-xs text-white/65">
                {pills.map((p) => (
                  <span
                    key={p}
                    className="rounded-full border border-[color:var(--color-corridor-400)]/22 bg-[color:var(--color-corridor-400)]/8 px-3 py-1"
                  >
                    {p}
                  </span>
                ))}
              </div>
            </div>

            <div className="rounded-xl border border-white/12 bg-white/[0.05] p-4 sm:p-5 lg:col-span-4">
              <p className="text-xs font-semibold tracking-[0.12em] text-white/60 uppercase">
                {eyebrow}
              </p>
              <div className="mt-4 grid gap-3">
                <Link
                  href={primaryCta.href}
                  className={cn("inline-flex h-12 items-center justify-center rounded-lg bg-[color:var(--color-corridor-400)] px-5 text-sm font-semibold text-white shadow-[0_6px_20px_rgba(43,74,142,0.35)] transition hover:bg-[color:var(--color-corridor-500)] hover:shadow-[0_10px_28px_rgba(43,74,142,0.45)]", focusRingDark)}
                >
                  {primaryCta.label}
                </Link>
                <Link
                  href={secondaryCta.href}
                  className={cn("inline-flex h-12 items-center justify-center rounded-lg border border-white/20 px-5 text-sm font-semibold text-white/85 transition hover:border-white/35 hover:bg-white/8", focusRingDark)}
                >
                  {secondaryCta.label}
                </Link>
              </div>
            </div>
          </div>
        </motion.div>
      </Container>
    </section>
  );
}
