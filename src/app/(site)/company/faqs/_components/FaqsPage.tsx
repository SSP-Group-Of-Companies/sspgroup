"use client";

import Link from "next/link";
import { useState, useEffect, useRef, useCallback } from "react";
import { AnimatePresence, motion, useReducedMotion, type Variants } from "framer-motion";
import { ChevronLeft, ChevronDown } from "lucide-react";
import { cn } from "@/lib/cn";
import { Container } from "@/app/(site)/components/layout/Container";
import { SectionSignalEyebrow } from "@/app/(site)/components/ui/SectionSignalEyebrow";
import { FAQ_CATEGORIES, FAQ_HERO, FAQ_FINAL_CTA } from "@/config/faqs";

const FOCUS_RING_DARK =
  "focus:outline-none focus-visible:ring-2 focus-visible:ring-white/40 focus-visible:ring-offset-2 focus-visible:ring-offset-[color:var(--color-company-ink)]";

const NOISE_BG =
  "url(\"data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E\")";

/* ------------------------------------------------------------------ */
/*  Hero                                                              */
/* ------------------------------------------------------------------ */

function FaqHero({ reduceMotion }: { reduceMotion: boolean }) {
  const stagger: Variants = reduceMotion
    ? { hidden: { opacity: 1 }, show: { opacity: 1 } }
    : { hidden: {}, show: { transition: { staggerChildren: 0.1, delayChildren: 0.08 } } };

  const reveal: Variants = reduceMotion
    ? { hidden: { opacity: 1, y: 0 }, show: { opacity: 1, y: 0 } }
    : { hidden: { opacity: 0, y: 20 }, show: { opacity: 1, y: 0 } };

  return (
    <section
      aria-labelledby="faq-hero-heading"
      className="relative overflow-hidden border-b border-white/6 py-16 sm:py-20 lg:py-24"
      style={{ backgroundColor: "var(--color-company-ink)" }}
    >
      {/* Grid lines */}
      <div className="pointer-events-none absolute inset-0" aria-hidden>
        <div className="absolute inset-0 opacity-[0.034] [background-image:linear-gradient(to_right,rgba(255,255,255,0.8)_1px,transparent_1px),linear-gradient(to_bottom,rgba(255,255,255,0.8)_1px,transparent_1px)] [background-size:120px_120px]" />
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,transparent_70%,rgba(0,0,0,0.2)_100%)]" />
      </div>

      {/* Noise texture */}
      <div
        className="pointer-events-none absolute inset-0 opacity-[0.03]"
        style={{ backgroundImage: NOISE_BG }}
        aria-hidden
      />

      {/* Gradient orbs */}
      <div className="pointer-events-none absolute inset-0" aria-hidden>
        <div className="absolute -left-20 top-[-40px] h-[220px] w-[220px] rounded-full bg-[color:var(--color-ssp-cyan-500)]/12 blur-[100px]" />
        <div className="absolute -bottom-16 right-[-60px] h-[200px] w-[200px] rounded-full bg-white/6 blur-[90px]" />
      </div>

      {/* Bottom accent */}
      <div
        className="pointer-events-none absolute inset-x-0 bottom-0 h-px"
        style={{ background: "linear-gradient(90deg, transparent 5%, rgba(16,167,216,0.18) 50%, transparent 95%)" }}
        aria-hidden
      />

      <Container className="site-page-container relative">
        <motion.div
          initial="hidden"
          animate="show"
          variants={stagger}
          className="relative z-10 mx-auto max-w-4xl text-center"
        >
          <motion.div
            variants={reveal}
            transition={{ duration: reduceMotion ? 0 : 0.35, ease: "easeOut" }}
            className="flex justify-center"
          >
            <SectionSignalEyebrow label="Company" light />
          </motion.div>

          <motion.div
            variants={reveal}
            transition={{ duration: reduceMotion ? 0 : 0.35, ease: "easeOut" }}
            className="mt-4 flex justify-center"
          >
            <Link
              href="/company"
              className={cn(
                "inline-flex items-center gap-1 rounded-full border border-[color:var(--color-glass-border)] bg-[color:var(--color-glass-bg)] px-3 py-1 text-xs font-medium text-white/60 transition-colors hover:border-[color:var(--color-glass-border-hover)] hover:text-white/80",
                FOCUS_RING_DARK,
              )}
            >
              <ChevronLeft className="h-3 w-3" />
              Company
            </Link>
          </motion.div>

          <motion.h1
            id="faq-hero-heading"
            variants={reveal}
            transition={{ duration: reduceMotion ? 0 : 0.45, ease: "easeOut" }}
            className="mx-auto mt-6 max-w-3xl text-[2.4rem] font-bold leading-[0.96] tracking-tight text-white sm:text-[3rem] lg:text-[3.8rem]"
            style={{ textShadow: "0 2px 16px rgba(0,0,0,0.5)" }}
          >
            {FAQ_HERO.title}
          </motion.h1>

          <motion.p
            variants={reveal}
            transition={{ duration: reduceMotion ? 0 : 0.4, ease: "easeOut" }}
            className="mx-auto mt-5 max-w-2xl text-[15px] leading-[1.85] text-white/60 sm:text-[16px]"
          >
            {FAQ_HERO.subtitle}
          </motion.p>
        </motion.div>
      </Container>
    </section>
  );
}

/* ------------------------------------------------------------------ */
/*  Accordion Item                                                    */
/* ------------------------------------------------------------------ */

function AccordionItem({
  question,
  answer,
  isOpen,
  onToggle,
  reduceMotion,
}: {
  question: string;
  answer: string;
  isOpen: boolean;
  onToggle: () => void;
  reduceMotion: boolean;
}) {
  return (
    <div
      className={cn(
        "rounded-xl border transition-colors duration-200",
        isOpen
          ? "border-[color:var(--color-glass-border)] bg-[color:var(--color-glass-bg)]"
          : "border-white/6 bg-[color:var(--color-glass-bg)] hover:border-[color:var(--color-glass-border)] hover:bg-[color:var(--color-glass-bg-hover)]",
      )}
    >
      <button
        type="button"
        onClick={onToggle}
        className={cn(
          "flex w-full items-center justify-between gap-4 px-5 py-4 text-left",
          FOCUS_RING_DARK,
          "rounded-xl",
        )}
        aria-expanded={isOpen}
      >
        <span className="text-[14px] font-semibold leading-snug text-white sm:text-[15px]">
          {question}
        </span>
        <motion.span
          animate={{ rotate: isOpen ? 180 : 0 }}
          transition={{ duration: reduceMotion ? 0 : 0.2 }}
          className="flex-shrink-0 text-white/40"
        >
          <ChevronDown className="h-4 w-4" />
        </motion.span>
      </button>

      <AnimatePresence initial={false}>
        {isOpen && (
          <motion.div
            key="content"
            initial={reduceMotion ? { opacity: 1 } : { height: 0, opacity: 0 }}
            animate={reduceMotion ? { opacity: 1 } : { height: "auto", opacity: 1 }}
            exit={reduceMotion ? { opacity: 0 } : { height: 0, opacity: 0 }}
            transition={{ duration: reduceMotion ? 0 : 0.25, ease: "easeOut" }}
            className="overflow-hidden"
          >
            <p className="px-5 pb-4 text-[13.5px] leading-relaxed text-white/60 sm:text-[14px]">
              {answer}
            </p>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

/* ------------------------------------------------------------------ */
/*  FAQ Content (sidebar + accordion)                                 */
/* ------------------------------------------------------------------ */

function FaqContent({ reduceMotion }: { reduceMotion: boolean }) {
  const [activeCategoryId, setActiveCategoryId] = useState(FAQ_CATEGORIES[0].id);
  const [openMap, setOpenMap] = useState<Record<string, number | null>>({});
  const sectionRefs = useRef<Record<string, HTMLElement | null>>({});

  const setRef = useCallback((id: string) => (el: HTMLElement | null) => {
    sectionRefs.current[id] = el;
  }, []);

  useEffect(() => {
    const observers: IntersectionObserver[] = [];

    for (const cat of FAQ_CATEGORIES) {
      const el = sectionRefs.current[cat.id];
      if (!el) continue;

      const observer = new IntersectionObserver(
        ([entry]) => {
          if (entry.isIntersecting) setActiveCategoryId(cat.id);
        },
        { rootMargin: "-20% 0px -60% 0px", threshold: 0 },
      );
      observer.observe(el);
      observers.push(observer);
    }

    return () => observers.forEach((o) => o.disconnect());
  }, []);

  const toggleItem = (categoryId: string, idx: number) => {
    setOpenMap((prev) => ({
      ...prev,
      [categoryId]: prev[categoryId] === idx ? null : idx,
    }));
  };

  return (
    <section
      className="relative py-16 sm:py-20"
      style={{ backgroundColor: "var(--color-company-ink)" }}
    >
      <Container className="site-page-container">
        <div className="lg:grid lg:grid-cols-12 lg:gap-12">
          {/* Sidebar */}
          <nav className="hidden lg:col-span-3 lg:block" aria-label="FAQ categories">
            <div className="sticky top-24">
              <p className="mb-4 text-[10px] font-semibold uppercase tracking-[0.16em] text-white/30">
                Categories
              </p>
              <ul className="flex flex-col gap-1">
                {FAQ_CATEGORIES.map((cat) => (
                  <li key={cat.id}>
                    <a
                      href={`#${cat.id}`}
                      onClick={(e) => {
                        e.preventDefault();
                        const el = sectionRefs.current[cat.id];
                        if (el) el.scrollIntoView({ behavior: "smooth", block: "start" });
                      }}
                      className={cn(
                        "block rounded-lg px-3 py-2 text-[13px] font-medium transition-all duration-150",
                        FOCUS_RING_DARK,
                        activeCategoryId === cat.id
                          ? "bg-[color:var(--color-glass-bg-hover)] text-white"
                          : "text-white/40 hover:bg-[color:var(--color-glass-bg-hover)] hover:text-white/60",
                      )}
                    >
                      {cat.label}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          </nav>

          {/* Mobile category bar */}
          <div className="mb-8 flex gap-2 overflow-x-auto pb-2 lg:hidden">
            {FAQ_CATEGORIES.map((cat) => (
              <a
                key={cat.id}
                href={`#${cat.id}`}
                onClick={(e) => {
                  e.preventDefault();
                  const el = sectionRefs.current[cat.id];
                  if (el) el.scrollIntoView({ behavior: "smooth", block: "start" });
                }}
                className={cn(
                  "flex-shrink-0 rounded-full border px-3.5 py-1.5 text-xs font-medium transition-all duration-150",
                  FOCUS_RING_DARK,
                  activeCategoryId === cat.id
                    ? "border-[color:var(--color-glass-border-hover)] bg-[color:var(--color-glass-bg-hover)] text-white"
                    : "border-[color:var(--color-glass-border)] text-white/40 hover:border-[color:var(--color-glass-border)] hover:text-white/60",
                )}
              >
                {cat.label}
              </a>
            ))}
          </div>

          {/* Main content */}
          <div className="lg:col-span-9">
            {FAQ_CATEGORIES.map((cat) => (
              <motion.div
                key={cat.id}
                ref={setRef(cat.id)}
                id={cat.id}
                className="scroll-mt-24 [&+&]:mt-12"
                initial={reduceMotion ? false : { opacity: 0, y: 16 }}
                whileInView={reduceMotion ? undefined : { opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.15 }}
                transition={{ duration: 0.4, ease: "easeOut" }}
              >
                <h2 className="mb-5 text-[1.35rem] font-bold tracking-tight text-white sm:text-[1.5rem]">
                  {cat.label}
                </h2>
                <div className="flex flex-col gap-2.5">
                  {cat.items.map((item, idx) => (
                    <AccordionItem
                      key={item.question}
                      question={item.question}
                      answer={item.answer}
                      isOpen={openMap[cat.id] === idx}
                      onToggle={() => toggleItem(cat.id, idx)}
                      reduceMotion={reduceMotion}
                    />
                  ))}
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </Container>
    </section>
  );
}

/* ------------------------------------------------------------------ */
/*  Insights CTA nudge                                                */
/* ------------------------------------------------------------------ */

function InsightsCta({ reduceMotion }: { reduceMotion: boolean }) {
  return (
    <section
      className="border-t border-white/6 py-10"
      style={{ backgroundColor: "var(--color-company-ink)" }}
    >
      <Container className="site-page-container">
        <motion.div
          className="flex flex-col items-center gap-3 sm:flex-row sm:justify-center sm:gap-4"
          initial={reduceMotion ? false : { opacity: 0, y: 10 }}
          whileInView={reduceMotion ? undefined : { opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.5 }}
          transition={{ duration: 0.35, ease: "easeOut" }}
        >
          <p className="text-[13px] text-white/40">
            Looking for shipping guides and industry insights?
          </p>
          <Link
            href="/insights"
            className={cn(
              "inline-flex items-center gap-1 rounded-full border border-[color:var(--color-glass-border)] bg-[color:var(--color-glass-bg)] px-4 py-1.5 text-xs font-medium text-white/60 transition-colors hover:border-[color:var(--color-glass-border-hover)] hover:text-white/80",
              FOCUS_RING_DARK,
            )}
          >
            Browse Insights
            <ChevronDown className="h-3 w-3 -rotate-90" />
          </Link>
        </motion.div>
      </Container>
    </section>
  );
}

/* ------------------------------------------------------------------ */
/*  Final CTA                                                         */
/* ------------------------------------------------------------------ */

function FinalCta({ reduceMotion }: { reduceMotion: boolean }) {
  return (
    <section
      aria-labelledby="faq-final-cta-heading"
      className="relative overflow-hidden py-20 sm:py-24"
      style={{ backgroundColor: "var(--color-company-ink)" }}
    >
      {/* Noise */}
      <div
        className="pointer-events-none absolute inset-0 opacity-[0.025]"
        style={{ backgroundImage: NOISE_BG }}
        aria-hidden
      />

      {/* Orbs */}
      <div className="pointer-events-none absolute inset-0" aria-hidden>
        <div className="absolute -left-20 bottom-[-60px] h-[200px] w-[200px] rounded-full bg-[color:var(--color-ssp-cyan-500)]/12 blur-[100px]" />
        <div className="absolute right-[10%] top-[-40px] h-[180px] w-[180px] rounded-full bg-white/6 blur-[80px]" />
      </div>

      {/* Top separator */}
      <div
        className="pointer-events-none absolute inset-x-0 top-0 h-px"
        style={{ background: `linear-gradient(90deg, transparent 10%, rgba(16,167,216,0.15) 50%, transparent 90%)` }}
        aria-hidden
      />

      <Container className="site-page-container relative">
        <motion.div
          className="rounded-2xl border border-[color:var(--color-glass-border)] bg-[color:var(--color-glass-bg)] px-5 py-8 backdrop-blur-sm sm:px-8 sm:py-10 md:px-10"
          initial={reduceMotion ? false : { opacity: 0, y: 16 }}
          whileInView={reduceMotion ? undefined : { opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.45, ease: "easeOut" }}
        >
          <div className="grid gap-8 lg:grid-cols-12 lg:items-center">
            {/* Left column */}
            <div className="lg:col-span-8">
              <SectionSignalEyebrow label={FAQ_FINAL_CTA.kicker} light />

              <h2
                id="faq-final-cta-heading"
                className="mt-4 text-[1.75rem] font-bold leading-[1.1] tracking-tight text-white sm:text-[2.2rem] lg:text-[2.5rem]"
              >
                {FAQ_FINAL_CTA.title}
              </h2>

              <p className="mt-3 max-w-2xl text-[14px] leading-[1.8] text-white/55 sm:text-[15px]">
                {FAQ_FINAL_CTA.body}
              </p>

              {/* Trust signals */}
              <div className="mt-5 flex flex-wrap gap-2">
                {FAQ_FINAL_CTA.trustSignals.map((signal) => (
                  <span
                    key={signal}
                    className="inline-flex items-center gap-2 rounded-full border border-[color:var(--color-ssp-cyan-500)]/20 bg-[color:var(--color-ssp-cyan-500)]/[0.04] px-3 py-1 text-xs text-white/60"
                  >
                    <span
                      className="h-1 w-1 rounded-full bg-[color:var(--color-ssp-cyan-500)]"
                      aria-hidden
                    />
                    {signal}
                  </span>
                ))}
              </div>
            </div>

            {/* Right column — action card */}
            <div className="lg:col-span-4">
              <div className="rounded-xl border border-[color:var(--color-glass-border)] bg-[color:var(--color-glass-bg)] p-5 sm:p-6">
                <p className="text-xs font-semibold uppercase tracking-[0.12em] text-white/50">
                  {FAQ_FINAL_CTA.kicker}
                </p>

                {/* Proof metrics */}
                <div className="mt-4 grid gap-2 sm:grid-cols-3">
                  {FAQ_FINAL_CTA.proof.map((item) => (
                    <div
                      key={item.label}
                      className="rounded-lg border border-white/6 bg-[color:var(--color-glass-bg)] px-2 py-2 text-center"
                    >
                      <div className="text-[13px] font-semibold tracking-tight text-white/75">
                        {item.value}
                      </div>
                      <div className="mt-0.5 text-[9px] uppercase tracking-wider text-white/30">
                        {item.label}
                      </div>
                    </div>
                  ))}
                </div>

                {/* Micro copy */}
                <p className="mt-4 text-[11px] leading-relaxed text-white/30">
                  {FAQ_FINAL_CTA.microCopy}
                </p>

                {/* CTAs */}
                <div className="mt-5 grid gap-3">
                  <Link
                    href={FAQ_FINAL_CTA.ctas.primary.href}
                    className={cn(
                      "inline-flex h-12 w-full items-center justify-center rounded-lg px-5 text-sm font-semibold text-white transition-all duration-200 hover:-translate-y-[1px]",
                      "bg-[color:var(--color-ssp-cyan-500)] shadow-[0_6px_20px_rgba(0,191,255,0.2)]",
                      FOCUS_RING_DARK,
                    )}
                  >
                    {FAQ_FINAL_CTA.ctas.primary.label}
                  </Link>
                  <button
                    type="button"
                    onClick={() =>
                      window.dispatchEvent(new CustomEvent("ssp:open-live-chat"))
                    }
                    className={cn(
                      "inline-flex h-12 w-full items-center justify-center gap-2 rounded-lg border border-[color:var(--color-glass-border-hover)] px-5 text-sm font-semibold text-white/80 transition-all duration-200 hover:border-[color:var(--color-glass-border-hover)] hover:bg-[color:var(--color-glass-bg-hover)]",
                      FOCUS_RING_DARK,
                    )}
                  >
                    <span
                      className="h-2 w-2 animate-pulse rounded-full bg-emerald-400"
                      aria-hidden
                    />
                    {FAQ_FINAL_CTA.ctas.secondary.label}
                  </button>
                </div>
              </div>
            </div>
          </div>
        </motion.div>
      </Container>
    </section>
  );
}

/* ------------------------------------------------------------------ */
/*  Page shell                                                        */
/* ------------------------------------------------------------------ */

export function FaqsPage() {
  const reduceMotion = !!useReducedMotion();

  return (
    <>
      <FaqHero reduceMotion={reduceMotion} />
      <FaqContent reduceMotion={reduceMotion} />
      <InsightsCta reduceMotion={reduceMotion} />
      <FinalCta reduceMotion={reduceMotion} />
    </>
  );
}
