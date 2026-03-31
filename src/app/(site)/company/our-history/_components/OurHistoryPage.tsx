"use client";

import { motion, useReducedMotion } from "framer-motion";
import Link from "next/link";
import { ArrowRight, ChevronLeft } from "lucide-react";
import { Container } from "@/app/(site)/components/layout/Container";
import { SectionSignalEyebrow } from "@/app/(site)/components/ui/SectionSignalEyebrow";
import { cn } from "@/lib/cn";
import {
  SSP_HISTORY_MILESTONES,
  HISTORY_GROWTH_STATS,
  type HistoryMilestone,
} from "@/config/history";

/* ------------------------------------------------------------------ */
/*  Constants                                                          */
/* ------------------------------------------------------------------ */

const DARK = "var(--color-company-ink)";

const NOISE =
  'url("data:image/svg+xml,%3Csvg viewBox=\'0 0 256 256\' xmlns=\'http://www.w3.org/2000/svg\'%3E%3Cfilter id=\'n\'%3E%3CfeTurbulence type=\'fractalNoise\' baseFrequency=\'0.9\' numOctaves=\'4\' stitchTiles=\'stitch\'/%3E%3C/filter%3E%3Crect width=\'100%25\' height=\'100%25\' filter=\'url(%23n)\'/%3E%3C/svg%3E")';

const FOCUS =
  "focus:outline-none focus-visible:ring-2 focus-visible:ring-white/60 focus-visible:ring-offset-2 focus-visible:ring-offset-[color:var(--color-company-ink)]";

const TIMELINE_LINE =
  "linear-gradient(180deg, var(--color-brand-500) 0%, var(--color-brand-500) 20%, rgba(224,43,53,0.18) 75%, transparent 100%)";

const HERO_STATS = [
  { value: "2015", label: "Founded" },
  { value: "90+", label: "Fleet" },
  { value: "7+", label: "Offices" },
  { value: "40K+", label: "Orders" },
];

/* ------------------------------------------------------------------ */
/*  1 · Hero                                                           */
/* ------------------------------------------------------------------ */

function HeroSection({ skip }: { skip: boolean }) {
  return (
    <section
      aria-labelledby="history-hero-heading"
      className="relative overflow-hidden border-b border-white/6 py-20 sm:py-24 lg:py-28"
      style={{ backgroundColor: DARK }}
    >
      {/* Grid lines */}
      <div className="pointer-events-none absolute inset-0" aria-hidden>
        <div className="absolute inset-0 opacity-[0.034] [background-image:linear-gradient(to_right,rgba(255,255,255,0.8)_1px,transparent_1px),linear-gradient(to_bottom,rgba(255,255,255,0.8)_1px,transparent_1px)] [background-size:120px_120px]" />
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,transparent_70%,rgba(0,0,0,0.2)_100%)]" />
      </div>

      {/* Noise */}
      <div
        className="pointer-events-none absolute inset-0 opacity-[0.025]"
        style={{ backgroundImage: NOISE }}
        aria-hidden
      />

      {/* Gradient orbs */}
      <div className="pointer-events-none absolute inset-0" aria-hidden>
        <div className="absolute -left-32 top-1/4 h-[400px] w-[400px] rounded-full bg-[color:var(--color-brand-500)]/8 blur-[120px]" />
        <div className="absolute -right-20 bottom-0 h-[300px] w-[300px] rounded-full bg-[color:var(--color-ssp-cyan-500)]/6 blur-[100px]" />
      </div>

      {/* Bottom accent */}
      <div
        className="pointer-events-none absolute inset-x-0 bottom-0 h-px"
        style={{
          background:
            "linear-gradient(90deg, transparent 5%, rgba(224,43,53,0.25) 50%, transparent 95%)",
        }}
        aria-hidden
      />

      <Container className="site-page-container relative">
        <motion.div
          initial={skip ? false : { opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: skip ? 0 : 0.4, ease: "easeOut" }}
        >
          <div className="flex items-center gap-4">
            <Link
              href="/company"
              className={cn(
                "inline-flex items-center gap-1 rounded-lg border border-[color:var(--color-glass-border)] bg-[color:var(--color-glass-bg)] px-3 py-1.5 text-xs font-medium text-white/60 transition-colors hover:border-[color:var(--color-glass-border-hover)] hover:text-white/80",
                FOCUS,
              )}
            >
              <ChevronLeft className="h-3.5 w-3.5" />
              Company
            </Link>
            <SectionSignalEyebrow label="Company" light />
          </div>

          <h1
            id="history-hero-heading"
            className="mt-10 max-w-4xl text-[2.5rem] font-bold leading-[0.96] tracking-tight text-white sm:text-[3.2rem] lg:text-[4rem]"
            style={{
              textShadow:
                "0 2px 16px rgba(0,0,0,0.5), 0 8px 32px rgba(10,15,26,0.4)",
            }}
          >
            From 2&nbsp;Trucks to a National&nbsp;Fleet
          </h1>

          <p className="mt-5 max-w-3xl text-[15px] leading-[1.85] text-white/70 sm:text-base">
            Founded in 2015, SSP Group has grown from a two-truck operation into
            one of Canada&rsquo;s Top&nbsp;100 Carriers — with 7+ offices
            spanning Canada, the&nbsp;U.S., and Mexico.
          </p>
        </motion.div>

        {/* Stats bar */}
        <motion.div
          initial={skip ? false : { opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{
            duration: skip ? 0 : 0.45,
            delay: skip ? 0 : 0.15,
            ease: "easeOut",
          }}
          className="mt-10 grid max-w-3xl grid-cols-2 gap-3 sm:grid-cols-4"
        >
          {HERO_STATS.map((s) => (
            <div
              key={s.label}
              className="rounded-2xl border border-[color:var(--color-glass-border)] bg-[color:var(--color-glass-bg)] px-4 py-3.5 text-center backdrop-blur-sm"
            >
              <p className="text-lg font-bold tracking-tight text-white">
                {s.value}
              </p>
              <p className="mt-1 text-[10px] uppercase tracking-[0.16em] text-white/38">
                {s.label}
              </p>
            </div>
          ))}
        </motion.div>
      </Container>
    </section>
  );
}

/* ------------------------------------------------------------------ */
/*  2 · Timeline — Milestone Card                                      */
/* ------------------------------------------------------------------ */

function MilestoneCard({
  milestone,
  skip,
}: {
  milestone: HistoryMilestone;
  skip: boolean;
}) {
  return (
    <motion.div
      initial={skip ? false : { opacity: 0, y: 32, scale: 0.97 }}
      whileInView={skip ? undefined : { opacity: 1, y: 0, scale: 1 }}
      viewport={{ once: true, amount: 0.3 }}
      transition={{
        duration: skip ? 0 : 0.6,
        delay: skip ? 0 : 0.1,
        ease: [0.22, 1, 0.36, 1],
      }}
      className="group relative max-w-lg"
    >
      {/* Highlight glow */}
      {milestone.highlight && (
        <div
          className="pointer-events-none absolute -inset-3 rounded-3xl"
          style={{
            background:
              "radial-gradient(ellipse at center, rgba(224,43,53,0.12) 0%, transparent 70%)",
          }}
          aria-hidden
        />
      )}

      {/* Glass card */}
      <div
        className={cn(
          "relative overflow-hidden rounded-2xl border p-6 transition-all duration-300 sm:p-7",
          "border-[color:var(--color-glass-border)] bg-[color:var(--color-glass-bg)]",
          "shadow-[var(--shadow-glass-card)]",
          "hover:-translate-y-1 hover:border-[color:var(--color-glass-border-hover)] hover:bg-[color:var(--color-glass-bg-hover)]",
          "hover:shadow-[var(--shadow-glass-card-hover)]",
        )}
      >
        {/* Top highlight line */}
        <div
          className="pointer-events-none absolute inset-x-0 top-0 h-px"
          style={{
            background:
              "linear-gradient(90deg, transparent, rgba(255,255,255,0.08) 50%, transparent)",
          }}
          aria-hidden
        />

        {/* Year — visible on mobile only (desktop shows the badge instead) */}
        <p className="mb-2 text-[11px] font-semibold uppercase tracking-[0.18em] text-white/30 lg:hidden">
          {milestone.year}
        </p>

        {milestone.stat && (
          <div className="mb-4 inline-flex items-baseline gap-1.5 rounded-full border border-[color:var(--color-ssp-cyan-500)]/20 bg-[color:var(--color-ssp-cyan-500)]/[0.08] px-3 py-1">
            <span className="text-sm font-bold text-[color:var(--color-ssp-cyan-500)]">
              {milestone.stat.value}
            </span>
            <span className="text-[10px] uppercase tracking-wider text-white/40">
              {milestone.stat.label}
            </span>
          </div>
        )}

        <h3 className="text-[1.1rem] font-bold leading-tight tracking-tight text-white sm:text-[1.2rem]">
          {milestone.title}
        </h3>

        <p className="mt-2.5 text-[13.5px] leading-[1.8] text-white/50 sm:text-sm">
          {milestone.description}
        </p>
      </div>
    </motion.div>
  );
}

/* ------------------------------------------------------------------ */
/*  2 · Timeline                                                       */
/* ------------------------------------------------------------------ */

function TimelineSection({ skip }: { skip: boolean }) {
  return (
    <section
      aria-labelledby="history-timeline-heading"
      className="relative overflow-hidden py-20 sm:py-24 lg:py-28"
      style={{ backgroundColor: DARK }}
    >
      {/* Noise */}
      <div
        className="pointer-events-none absolute inset-0 opacity-[0.025]"
        style={{ backgroundImage: NOISE }}
        aria-hidden
      />

      {/* Top separator */}
      <div
        className="pointer-events-none absolute inset-x-0 top-0 h-px"
        style={{
          background:
            "linear-gradient(90deg, transparent 10%, rgba(224,43,53,0.18) 50%, transparent 90%)",
        }}
        aria-hidden
      />

      <Container className="site-page-container relative">
        {/* Header */}
        <motion.div
          initial={skip ? false : { opacity: 0, y: 16 }}
          whileInView={skip ? undefined : { opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: skip ? 0 : 0.5, ease: "easeOut" }}
          className="mb-16 text-center"
        >
          <SectionSignalEyebrow label="Timeline" light />

          <h2
            id="history-timeline-heading"
            className="mt-4 text-[1.75rem] font-bold tracking-tight text-white sm:text-[2.2rem] lg:text-[2.8rem]"
          >
            The Milestones That Built SSP
          </h2>

          <p className="mx-auto mt-3 max-w-2xl text-sm leading-[1.8] text-white/50 sm:text-[15px]">
            Every year brought new challenges, new lanes, and a deeper
            commitment to disciplined freight execution.
          </p>
        </motion.div>

        {/* Timeline body */}
        <div className="relative">
          {/* Vertical line — mobile */}
          <div
            className="absolute bottom-0 left-[23px] top-0 w-px lg:hidden"
            style={{ background: TIMELINE_LINE }}
            aria-hidden
          />

          {/* Vertical line — desktop */}
          <div
            className="absolute bottom-0 left-1/2 top-0 hidden w-px -translate-x-1/2 lg:block"
            style={{ background: TIMELINE_LINE }}
            aria-hidden
          />

          <div className="space-y-10 lg:space-y-16">
            {SSP_HISTORY_MILESTONES.map((m, i) => {
              const isLeft = i % 2 === 0;

              return (
                <div
                  key={m.year}
                  className="relative grid grid-cols-[48px_1fr] items-start gap-4 lg:grid-cols-[1fr_80px_1fr] lg:gap-8"
                >
                  {/* Desktop — left card */}
                  <div
                    className={cn(
                      "hidden lg:flex",
                      isLeft ? "justify-end" : "",
                    )}
                  >
                    {isLeft && <MilestoneCard milestone={m} skip={skip} />}
                  </div>

                  {/* Centre — year badge */}
                  <div className="relative flex justify-center pt-5">
                    {/* Horizontal connector — desktop only */}
                    <div
                      className={cn(
                        "absolute top-[calc(1.25rem+1.75rem)] hidden h-px w-11 lg:block",
                        isLeft
                          ? "right-[calc(50%+1.75rem)] bg-gradient-to-l from-white/15 to-transparent"
                          : "left-[calc(50%+1.75rem)] bg-gradient-to-r from-white/15 to-transparent",
                      )}
                      aria-hidden
                    />

                    <motion.div
                      initial={skip ? false : { scale: 0.5, opacity: 0 }}
                      whileInView={
                        skip ? undefined : { scale: 1, opacity: 1 }
                      }
                      viewport={{ once: true, amount: 0.5 }}
                      transition={{
                        duration: skip ? 0 : 0.4,
                        ease: [0.22, 1, 0.36, 1],
                      }}
                      className={cn(
                        "relative z-10 flex h-12 w-12 items-center justify-center rounded-full border text-[11px] font-bold lg:h-14 lg:w-14 lg:text-xs",
                        m.highlight
                          ? "border-[color:var(--color-brand-500)]/40 bg-[color:var(--color-brand-500)]/12 text-white shadow-[0_0_24px_rgba(224,43,53,0.3)]"
                          : "border-white/15 bg-[#0f1520] text-white/80",
                      )}
                      aria-label={`Year ${m.year}`}
                    >
                      {m.year}
                    </motion.div>
                  </div>

                  {/* Desktop — right card */}
                  <div
                    className={cn(
                      "hidden lg:flex",
                      !isLeft ? "justify-start" : "",
                    )}
                  >
                    {!isLeft && <MilestoneCard milestone={m} skip={skip} />}
                  </div>

                  {/* Mobile — card always on the right */}
                  <div className="lg:hidden">
                    <MilestoneCard milestone={m} skip={skip} />
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </Container>
    </section>
  );
}

/* ------------------------------------------------------------------ */
/*  3 · Growth Summary                                                 */
/* ------------------------------------------------------------------ */

function GrowthSection({ skip }: { skip: boolean }) {
  return (
    <section
      aria-labelledby="history-growth-heading"
      className="relative overflow-hidden py-20 sm:py-24"
      style={{ backgroundColor: DARK }}
    >
      {/* Noise */}
      <div
        className="pointer-events-none absolute inset-0 opacity-[0.025]"
        style={{ backgroundImage: NOISE }}
        aria-hidden
      />

      {/* Top separator */}
      <div
        className="pointer-events-none absolute inset-x-0 top-0 h-px"
        style={{
          background:
            "linear-gradient(90deg, transparent 10%, rgba(16,167,216,0.2) 50%, transparent 90%)",
        }}
        aria-hidden
      />

      <Container className="site-page-container relative">
        <motion.div
          initial={skip ? false : { opacity: 0, y: 16 }}
          whileInView={skip ? undefined : { opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: skip ? 0 : 0.5, ease: "easeOut" }}
          className="mb-12 text-center"
        >
          <SectionSignalEyebrow label="Growth" light />

          <h2
            id="history-growth-heading"
            className="mt-4 text-[1.75rem] font-bold tracking-tight text-white sm:text-[2.2rem] lg:text-[2.5rem]"
          >
            The Journey in Numbers
          </h2>
        </motion.div>

        <div className="mx-auto grid max-w-4xl gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {HISTORY_GROWTH_STATS.map((stat, i) => (
            <motion.div
              key={stat.label}
              initial={skip ? false : { opacity: 0, y: 24 }}
              whileInView={skip ? undefined : { opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.3 }}
              transition={{
                duration: skip ? 0 : 0.5,
                delay: skip ? 0 : i * 0.08,
                ease: "easeOut",
              }}
              className={cn(
                "relative overflow-hidden rounded-2xl border p-5 text-center transition-all duration-300 sm:p-6",
                "border-[color:var(--color-glass-border)] bg-[color:var(--color-glass-bg)]",
                "shadow-[var(--shadow-glass-card)]",
                "hover:-translate-y-1 hover:border-[color:var(--color-glass-border-hover)] hover:bg-[color:var(--color-glass-bg-hover)]",
                "hover:shadow-[var(--shadow-glass-card-hover)]",
              )}
            >
              {/* Top shine */}
              <div
                className="pointer-events-none absolute inset-x-0 top-0 h-px"
                style={{
                  background:
                    "linear-gradient(90deg, transparent, rgba(255,255,255,0.06) 50%, transparent)",
                }}
                aria-hidden
              />

              <div className="flex items-center justify-center gap-3">
                <span className="text-base font-medium text-white/25 line-through decoration-white/20">
                  {stat.from}
                </span>
                <ArrowRight className="h-3.5 w-3.5 text-[color:var(--color-ssp-cyan-500)]/60" />
                <span className="text-2xl font-bold tracking-tight text-white">
                  {stat.to}
                </span>
              </div>

              <p className="mt-2 text-[10px] uppercase tracking-[0.16em] text-white/38">
                {stat.label}
              </p>
            </motion.div>
          ))}
        </div>
      </Container>
    </section>
  );
}

/* ------------------------------------------------------------------ */
/*  4 · CTA                                                            */
/* ------------------------------------------------------------------ */

function CtaSection({ skip }: { skip: boolean }) {
  return (
    <section
      aria-labelledby="history-cta-heading"
      className="relative overflow-hidden py-20 sm:py-24"
      style={{ backgroundColor: DARK }}
    >
      {/* Noise */}
      <div
        className="pointer-events-none absolute inset-0 opacity-[0.025]"
        style={{ backgroundImage: NOISE }}
        aria-hidden
      />

      {/* Ambient orbs */}
      <div className="pointer-events-none absolute inset-0" aria-hidden>
        <div className="absolute -left-20 bottom-[-60px] h-[200px] w-[200px] rounded-full bg-[color:var(--color-ssp-cyan-500)]/14 blur-[100px]" />
        <div className="absolute right-[10%] top-[-40px] h-[180px] w-[180px] rounded-full bg-white/6 blur-[80px]" />
      </div>

      {/* Top separator */}
      <div
        className="pointer-events-none absolute inset-x-0 top-0 h-px"
        style={{
          background:
            "linear-gradient(90deg, transparent 10%, rgba(16,167,216,0.2) 50%, transparent 90%)",
        }}
        aria-hidden
      />

      <Container className="site-page-container relative">
        <motion.div
          initial={skip ? false : { opacity: 0, y: 16 }}
          whileInView={skip ? undefined : { opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: skip ? 0 : 0.5, ease: "easeOut" }}
          className="relative mx-auto max-w-3xl overflow-hidden rounded-2xl border border-[color:var(--color-glass-border)] bg-[color:var(--color-glass-bg)] px-6 py-10 text-center shadow-[var(--shadow-glass-card)] backdrop-blur-sm sm:px-10 sm:py-14"
        >
          {/* Top shine */}
          <div
            className="pointer-events-none absolute inset-x-0 top-0 h-px"
            style={{
              background:
                "linear-gradient(90deg, transparent, rgba(255,255,255,0.08) 50%, transparent)",
            }}
            aria-hidden
          />

          <SectionSignalEyebrow label="Join the Journey" light />

          <h2
            id="history-cta-heading"
            className="mt-5 text-[1.75rem] font-bold leading-[1.1] tracking-tight text-white sm:text-[2.2rem]"
          >
            Write the Next Chapter With&nbsp;Us
          </h2>

          <p className="mx-auto mt-3 max-w-xl text-sm leading-[1.8] text-white/50 sm:text-[15px]">
            From two trucks to a continent-wide operation — our story is still
            being written. Be part of what comes next.
          </p>

          <div className="mt-8 flex flex-col gap-3 sm:flex-row sm:justify-center">
            <Link
              href="/careers"
              className={cn(
                "inline-flex h-12 items-center justify-center rounded-xl px-7 text-sm font-semibold transition-all duration-200 hover:-translate-y-[1px] hover:shadow-lg",
                "bg-[color:var(--color-brand-600)] text-white shadow-[var(--shadow-action-primary)]",
                FOCUS,
              )}
            >
              Explore Careers
            </Link>
            <Link
              href="/contact"
              className={cn(
                "inline-flex h-12 items-center justify-center rounded-xl border border-[color:var(--color-glass-border-hover)] bg-black/18 px-7 text-sm font-semibold text-white/84 backdrop-blur-sm transition-all duration-200 hover:border-white/28 hover:bg-black/24 hover:text-white",
                FOCUS,
              )}
            >
              Contact Us
            </Link>
          </div>
        </motion.div>
      </Container>
    </section>
  );
}

/* ------------------------------------------------------------------ */
/*  Page Composition                                                   */
/* ------------------------------------------------------------------ */

export function OurHistoryPage() {
  const skip = !!useReducedMotion();

  return (
    <>
      <HeroSection skip={skip} />
      <TimelineSection skip={skip} />
      <GrowthSection skip={skip} />
      <CtaSection skip={skip} />
    </>
  );
}
