"use client";

import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import { AnimatePresence, motion, useReducedMotion, type Variants } from "framer-motion";
import { ChevronLeft } from "lucide-react";
import { cn } from "@/lib/cn";
import { trackCtaClick } from "@/lib/analytics/cta";
import { Container } from "@/app/(site)/components/layout/Container";

/* ── Shared types ────────────────────────────────────────────────────── */

export type AirCard = { readonly title: string; readonly body: string };
export type AirStep = { readonly step: string; readonly title: string; readonly body: string };
export type AirFaqItem = { readonly q: string; readonly a: string };
export type CtaLink = { readonly label: string; readonly href: string; readonly ctaId?: string };

/* ── Air-themed eyebrow ──────────────────────────────────────────────── */

function AirEyebrow({ label, light = false }: { label: string; light?: boolean }) {
  return (
    <div className="inline-flex items-center gap-2.5">
      <span
        aria-hidden
        className={cn(
          "inline-flex items-center gap-1.5 rounded-full px-2.5 py-1",
          light
            ? "border border-white/24 bg-white/8"
            : "border border-[color:var(--color-air-400)]/20 bg-[color:var(--color-air-400)]/6",
        )}
      >
        <span
          className={cn(
            "h-1.5 w-1.5 rounded-full",
            light ? "bg-[color:var(--color-air-300)]" : "bg-[color:var(--color-air-400)]",
          )}
        />
        <span
          className={cn(
            "h-px w-8",
            light
              ? "bg-[linear-gradient(90deg,var(--color-air-300),rgba(255,255,255,0.35))]"
              : "bg-[linear-gradient(90deg,var(--color-air-400),rgba(12,23,38,0.18))]",
          )}
        />
      </span>
      <p
        className={cn(
          "font-semibold uppercase",
          light
            ? "text-xs tracking-[0.16em] text-white/70"
            : "text-[10.5px] tracking-[0.14em] text-[color:var(--color-air-500)]",
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
    : { hidden: {}, show: { transition: { staggerChildren: 0.05, delayChildren: 0.03 } } };

  const reveal: Variants = reduceMotion
    ? { hidden: { opacity: 1, y: 0 }, show: { opacity: 1, y: 0 } }
    : { hidden: { opacity: 1, y: 10 }, show: { opacity: 1, y: 0 } };

  const cardStagger: Variants = reduceMotion
    ? { hidden: { opacity: 1 }, show: { opacity: 1 } }
    : { hidden: {}, show: { transition: { staggerChildren: 0.05, delayChildren: 0.03 } } };

  return { reduceMotion, stagger, reveal, cardStagger };
}

const focusRing =
  "focus:outline-none focus-visible:ring-2 focus-visible:ring-[color:var(--color-air-400)] focus-visible:ring-offset-2 focus-visible:ring-offset-white";

const focusRingDark =
  "focus:outline-none focus-visible:ring-2 focus-visible:ring-[color:var(--color-air-300)] focus-visible:ring-offset-2 focus-visible:ring-offset-[color:var(--color-footer-legal-bg)]";

/* ═══════════════════════════════════════════════════════════════════════
   1. HERO — Split layout with image, sky-blue gradient
   ═══════════════════════════════════════════════════════════════════════ */

export function AirHero({
  eyebrow,
  title,
  description,
  primaryCta,
  secondaryCta,
}: {
  eyebrow: string;
  title: string;
  description: string;
  primaryCta: CtaLink;
  secondaryCta: CtaLink;
}) {
  const { reduceMotion, stagger, reveal } = useAnimations();

  return (
    <section className="relative overflow-hidden border-b border-[color:var(--color-ssp-ink-800)]/40 bg-[linear-gradient(145deg,var(--color-footer-legal-bg),var(--color-ssp-ink-900)_35%,var(--color-ssp-ink-800))] py-20 sm:py-24 lg:py-28">
      <div className="pointer-events-none absolute inset-0" aria-hidden>
        <div className="absolute top-[-60px] right-[20%] h-[300px] w-[300px] rounded-full bg-[color:var(--color-air-400)]/10 blur-[120px]" />
        <div className="absolute bottom-[-80px] left-[-60px] h-[260px] w-[260px] rounded-full bg-[color:var(--color-air-500)]/8 blur-[100px]" />
        <div className="absolute top-[50%] left-[40%] h-[180px] w-[180px] rounded-full bg-[color:var(--color-air-300)]/5 blur-[80px]" />
      </div>

      <Container className="site-page-container relative">
        <div className="grid items-center gap-10 lg:grid-cols-2 lg:gap-14">
          <motion.div initial="hidden" animate="show" variants={stagger}>
            <motion.div variants={reveal} transition={{ duration: reduceMotion ? 0 : 0.3, ease: "easeOut" }}>
              <Link
                href="/solutions/cross-border"
                className={cn("mb-6 inline-flex items-center gap-1.5 rounded text-xs font-medium text-white/50 transition-colors hover:text-white/75", focusRingDark)}
              >
                <ChevronLeft className="h-3.5 w-3.5" />
                Cross-Border Overview
              </Link>
            </motion.div>

            <motion.div variants={reveal} transition={{ duration: reduceMotion ? 0 : 0.38, ease: "easeOut" }}>
              <AirEyebrow label={eyebrow} light />
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
                className={cn("inline-flex h-12 items-center rounded-lg bg-[color:var(--color-air-400)] px-6 text-sm font-semibold text-white shadow-[0_6px_20px_rgba(91,155,229,0.35)] transition hover:bg-[color:var(--color-air-500)] hover:shadow-[0_10px_28px_rgba(91,155,229,0.45)]", focusRingDark)}
              >
                {primaryCta.label}
              </Link>
              <Link
                href={secondaryCta.href}
                className={cn("inline-flex h-12 items-center rounded-lg border border-white/22 px-6 text-sm font-medium text-white/75 transition hover:border-white/40 hover:bg-white/10 hover:text-white", focusRingDark)}
              >
                {secondaryCta.label}
              </Link>
            </motion.div>
          </motion.div>

          {/* Desktop — aircraft + globe image */}
          <motion.div
            initial={{ opacity: 1, scale: 0.97 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: reduceMotion ? 0 : 0.4, ease: "easeOut", delay: 0.1 }}
            className="relative hidden lg:flex lg:items-center lg:justify-center self-center mt-4"
          >
            <div
              aria-hidden
              className="pointer-events-none absolute top-[52%] left-1/2 h-[75%] w-[75%] -translate-x-1/2 -translate-y-1/2 rounded-full bg-[color:var(--color-air-400)]/12 blur-[100px]"
            />
            <Image
              src="/_optimized/solutions/air-hero-globe.png"
              alt="Cargo aircraft with global air freight network globe"
              width={640}
              height={480}
              sizes="(min-width: 1024px) 50vw, 0px"
              className="relative w-full max-w-[640px] object-contain"
              priority
            />
          </motion.div>
        </div>

        {/* Mobile — aircraft + globe image */}
        <motion.div
          initial={{ opacity: 1, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: reduceMotion ? 0 : 0.4, ease: "easeOut", delay: 0.15 }}
          className="relative mt-8 flex justify-center lg:hidden"
        >
          <div className="relative max-w-[340px] sm:max-w-[400px]">
            <div
              aria-hidden
              className="pointer-events-none absolute top-1/2 left-1/2 h-[65%] w-[65%] -translate-x-1/2 -translate-y-1/2 rounded-full bg-[color:var(--color-air-400)]/6 blur-[60px]"
            />
            <Image
              src="/_optimized/solutions/air-hero-globe.png"
              alt="Cargo aircraft with global air freight network globe"
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

/* ═══════════════════════════════════════════════════════════════════════
   2. CARD SECTION — Light background, sky-blue accent borders
   ═══════════════════════════════════════════════════════════════════════ */

export function AirCardSection({
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
  cards: readonly AirCard[];
  layout?: "sidebar" | "centered";
}) {
  const { reduceMotion, reveal, cardStagger } = useAnimations();

  const inner = (
    <motion.div
      className="grid gap-4 md:grid-cols-2"
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
          className="group relative overflow-hidden rounded-2xl border border-[color:var(--color-air-400)]/14 bg-white px-5 py-6 shadow-[0_8px_20px_rgba(2,6,23,0.05)] transition-all duration-300 hover:-translate-y-1 hover:border-[color:var(--color-air-400)]/28 hover:shadow-[0_16px_32px_rgba(2,6,23,0.10)] sm:px-6 sm:py-7"
        >
          <div
            aria-hidden
            className="pointer-events-none absolute inset-y-0 left-0 w-1 bg-[linear-gradient(180deg,var(--color-air-400),var(--color-air-600))]"
          />
          <span className="inline-flex h-7 items-center rounded-md bg-[color:var(--color-air-400)]/10 px-2.5 text-[11px] font-semibold tracking-[0.08em] text-[color:var(--color-air-500)] uppercase">
            0{i + 1}
          </span>
          <h3 className="mt-4 text-[18px] leading-snug font-semibold text-[color:var(--color-text)]">{card.title}</h3>
          <p className="mt-3 text-sm leading-7 text-[color:var(--color-muted)]">{card.body}</p>
        </motion.article>
      ))}
    </motion.div>
  );

  if (layout === "centered") {
    return (
      <section id={id} className={cn("border-y border-[color:var(--color-air-400)]/10 bg-[linear-gradient(180deg,#ffffff,var(--color-air-50))] py-20 sm:py-24", id && "scroll-mt-24")}>
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
              <AirEyebrow label={eyebrow} />
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
    <section id={id} className={cn("bg-[linear-gradient(180deg,#ffffff,var(--color-air-50))] py-20 sm:py-24", id && "scroll-mt-24")}>
      <Container className="site-page-container">
        <div className="grid gap-8 lg:grid-cols-12 lg:items-start">
          <motion.div
            className="lg:col-span-4 lg:pr-6"
            initial="hidden"
            whileInView="show"
            viewport={{ once: true, amount: 0.15 }}
            variants={reveal}
            transition={{ duration: reduceMotion ? 0 : 0.45, ease: "easeOut" }}
          >
            <AirEyebrow label={eyebrow} />
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
   3. GLASS CARDS — Dark sky-blue background with glass-morphism cards
   ═══════════════════════════════════════════════════════════════════════ */

export function AirGlassSection({
  eyebrow,
  title,
  description,
  cards,
}: {
  eyebrow: string;
  title: string;
  description: string;
  cards: readonly AirCard[];
}) {
  const { reduceMotion, reveal, cardStagger } = useAnimations();

  return (
    <section className="relative overflow-hidden border-y border-[color:var(--color-ssp-ink-800)]/40 bg-[linear-gradient(160deg,var(--color-footer-legal-bg),var(--color-ssp-ink-900)_45%,var(--color-ssp-ink-800))] py-20 sm:py-24">
      <div className="pointer-events-none absolute inset-0" aria-hidden>
        <div className="absolute top-[20%] right-[-60px] h-[240px] w-[240px] rounded-full bg-[color:var(--color-air-400)]/8 blur-[100px]" />
        <div className="absolute bottom-[-40px] left-[20%] h-[200px] w-[200px] rounded-full bg-[color:var(--color-air-300)]/5 blur-[90px]" />
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
            <AirEyebrow label={eyebrow} light />
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
              className="group relative overflow-hidden rounded-2xl border border-white/10 bg-white/[0.05] px-5 py-6 shadow-[0_8px_32px_rgba(0,0,0,0.20),inset_0_1px_0_rgba(255,255,255,0.06)] backdrop-blur-sm transition-all duration-300 hover:-translate-y-1 hover:border-white/18 hover:bg-white/[0.08] hover:shadow-[0_20px_48px_rgba(0,0,0,0.32),inset_0_1px_0_rgba(255,255,255,0.10)] sm:px-6 sm:py-7"
            >
              <div
                aria-hidden
                className="pointer-events-none absolute inset-x-0 top-0 h-px bg-[linear-gradient(90deg,transparent,rgba(139,184,240,0.25),transparent)]"
              />
              <span className="inline-flex h-7 items-center rounded-md border border-[color:var(--color-air-400)]/22 bg-[color:var(--color-air-400)]/10 px-2.5 text-[11px] font-semibold tracking-[0.08em] text-[color:var(--color-air-300)] uppercase">
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

export function AirStepsSection({
  eyebrow,
  title,
  description,
  steps,
}: {
  eyebrow: string;
  title: string;
  description: string;
  steps: readonly AirStep[];
}) {
  const { reduceMotion, reveal, cardStagger } = useAnimations();

  return (
    <section className="border-y border-[color:var(--color-air-400)]/10 bg-[linear-gradient(180deg,var(--color-air-50),#ffffff)] py-20 sm:py-24">
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
            <AirEyebrow label={eyebrow} />
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
            className="absolute top-5 right-12 left-12 hidden h-px bg-[linear-gradient(90deg,var(--color-air-400)/0.18,var(--color-air-500)/0.35,var(--color-air-400)/0.18)] xl:block"
          />
          <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-4">
            {steps.map((step) => (
              <motion.article
                key={step.step}
                variants={reveal}
                transition={{ duration: reduceMotion ? 0 : 0.4, ease: "easeOut" }}
                className="group relative overflow-hidden rounded-2xl border border-[color:var(--color-air-400)]/12 bg-white px-4 py-6 shadow-[0_10px_24px_rgba(2,6,23,0.06)] transition-all duration-300 hover:-translate-y-1 hover:border-[color:var(--color-air-400)]/24 hover:shadow-[0_18px_30px_rgba(2,6,23,0.12)] sm:px-5 sm:py-7"
              >
                <div className="inline-flex h-7 items-center rounded-md border border-[color:var(--color-air-500)]/18 bg-[color:var(--color-air-500)]/8 px-2.5 text-[11px] font-semibold tracking-[0.08em] text-[color:var(--color-air-500)] uppercase">
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
   5. FAQ — Light sky-tinted background with air accents
   ═══════════════════════════════════════════════════════════════════════ */

export function AirFaqSection({
  eyebrow,
  title,
  description,
  items,
}: {
  eyebrow: string;
  title: string;
  description: string;
  items: readonly AirFaqItem[];
}) {
  const { reduceMotion, reveal, cardStagger } = useAnimations();
  const [openIdx, setOpenIdx] = useState(0);

  return (
    <section className="border-y border-[color:var(--color-air-400)]/10 bg-[linear-gradient(180deg,var(--color-surface-0),var(--color-air-100))] py-20 sm:py-24">
      <Container className="site-page-container">
        <div className="grid gap-7 lg:grid-cols-12">
          <motion.div
            className="lg:col-span-4"
            initial="hidden"
            whileInView="show"
            viewport={{ once: true, amount: 0.15 }}
            variants={reveal}
            transition={{ duration: reduceMotion ? 0 : 0.45, ease: "easeOut" }}
          >
            <AirEyebrow label={eyebrow} />
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
              className="overflow-hidden rounded-2xl border border-[color:var(--color-air-400)]/14 bg-white shadow-[0_8px_24px_rgba(2,6,23,0.06)]"
            >
              {items.map((item, idx) => {
                const isOpen = idx === openIdx;
                const panelId = `air-faq-panel-${idx}`;
                return (
                  <article
                    key={item.q}
                    className={idx < items.length - 1 ? "border-b border-[color:var(--color-air-400)]/10" : ""}
                  >
                    <button
                      type="button"
                      onClick={() => setOpenIdx((p) => (p === idx ? -1 : idx))}
                      className={cn(
                        "flex w-full items-start justify-between gap-3 px-4 py-4 text-left transition-colors hover:bg-[color:var(--color-air-400)]/5 sm:gap-4 sm:px-6 sm:py-5",
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
                            ? "border-[color:var(--color-air-400)]/30"
                            : "border-[color:var(--color-air-400)]/14",
                        )}
                      >
                        <span
                          className={cn(
                            "absolute h-[1.5px] w-2.5 rounded-full transition-colors",
                            isOpen ? "bg-[color:var(--color-air-400)]" : "bg-[color:var(--color-muted)]",
                          )}
                        />
                        <span
                          className={cn(
                            "absolute h-2.5 w-[1.5px] rounded-full transition-all duration-200",
                            isOpen ? "scale-0 bg-[color:var(--color-air-400)]" : "scale-100 bg-[color:var(--color-muted)]",
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
   6. CLOSING CTA — Deep sky gradient with glass card
   ═══════════════════════════════════════════════════════════════════════ */

export function AirCtaSection({
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
        <div className="absolute bottom-[-60px] right-[10%] h-[200px] w-[200px] rounded-full bg-[color:var(--color-air-400)]/8 blur-[100px]" />
        <div className="absolute top-[-40px] left-[25%] h-[180px] w-[180px] rounded-full bg-[color:var(--color-air-300)]/5 blur-[80px]" />
      </div>

      <Container className="site-page-container relative">
        <motion.div
          className="rounded-2xl border border-white/12 bg-white/[0.04] px-5 py-8 backdrop-blur-sm sm:px-8 sm:py-10 md:px-10"
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, amount: 0.15 }}
          variants={reveal}
          transition={{ duration: reduceMotion ? 0 : 0.45, ease: "easeOut" }}
        >
          <div className="grid gap-7 lg:grid-cols-12 lg:items-center">
            <div className="lg:col-span-8">
              <AirEyebrow label={eyebrow} light />
              <h2 className="mt-3 text-2xl leading-tight font-semibold text-white sm:text-3xl">{title}</h2>
              <p className="mt-3 max-w-3xl text-sm leading-7 text-white/65">{description}</p>
              <div className="mt-5 flex flex-wrap gap-2 text-xs text-white/65">
                {pills.map((p) => (
                  <span
                    key={p}
                    className="rounded-full border border-[color:var(--color-air-400)]/22 bg-[color:var(--color-air-400)]/8 px-3 py-1"
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
                  onClick={() =>
                    primaryCta.ctaId &&
                    trackCtaClick({
                      ctaId: primaryCta.ctaId,
                      location: "air_freight_final_cta",
                      destination: primaryCta.href,
                      label: primaryCta.label,
                    })
                  }
                  className={cn("inline-flex h-12 items-center justify-center rounded-lg bg-[color:var(--color-air-400)] px-5 text-sm font-semibold text-white shadow-[0_6px_20px_rgba(91,155,229,0.35)] transition hover:bg-[color:var(--color-air-500)] hover:shadow-[0_10px_28px_rgba(91,155,229,0.45)]", focusRingDark)}
                >
                  {primaryCta.label}
                </Link>
                <Link
                  href={secondaryCta.href}
                  onClick={() =>
                    secondaryCta.ctaId &&
                    trackCtaClick({
                      ctaId: secondaryCta.ctaId,
                      location: "air_freight_final_cta",
                      destination: secondaryCta.href,
                      label: secondaryCta.label,
                    })
                  }
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
