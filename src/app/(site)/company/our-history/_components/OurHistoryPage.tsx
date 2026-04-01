"use client";

import { type CSSProperties } from "react";
import { motion, useReducedMotion } from "framer-motion";
import { Container } from "@/app/(site)/components/layout/Container";
import { SectionSignalEyebrow } from "@/app/(site)/components/ui/SectionSignalEyebrow";
import { StandardFinalCta } from "@/app/(site)/components/cta/StandardFinalCta";
import { cn } from "@/lib/cn";
import {
  SSP_HISTORY_MILESTONES,
  type HistoryMilestone,
} from "@/config/history";

const TIMELINE_LINE =
  "linear-gradient(180deg, var(--color-brand-500) 0%, rgba(224,43,53,0.62) 24%, rgba(224,43,53,0.2) 70%, transparent 100%)";

const shardMaskStyle: CSSProperties = {
  background: "var(--color-company-hero-midnight-start)",
  WebkitMaskImage: "url('/_optimized/company/ssp-shard-mask.svg')",
  maskImage: "url('/_optimized/company/ssp-shard-mask.svg')",
  WebkitMaskRepeat: "no-repeat",
  maskRepeat: "no-repeat",
  WebkitMaskPosition: "center",
  maskPosition: "center",
  WebkitMaskSize: "contain",
  maskSize: "contain",
};
const shardFadeStyle: CSSProperties = {
  WebkitMaskImage:
    "linear-gradient(136deg, rgba(0,0,0,0.01) 0%, rgba(0,0,0,0.12) 30%, rgba(0,0,0,0.86) 63%, #000 100%)",
  maskImage:
    "linear-gradient(136deg, rgba(0,0,0,0.01) 0%, rgba(0,0,0,0.12) 30%, rgba(0,0,0,0.86) 63%, #000 100%)",
};

const HISTORY_FINAL_CTA = {
  kicker: "Build With SSP",
  title: "Bring the next chapter of your freight program to life.",
  body: "SSP pairs asset-based execution with cross-border operating discipline so enterprise teams can scale lanes without losing control.",
  trustSignals: [
    "Asset-based execution",
    "Cross-border operating model",
    "Single accountable team",
  ],
  proof: [
    { value: "10+", label: "Years Operating" },
    { value: "40K+", label: "Orders Completed" },
    { value: "CA-US-MX", label: "Coverage" },
  ],
  ctas: {
    primary: {
      label: "Request a Quote",
      href: "/quote",
      ctaId: "history_final_cta_request_quote",
    },
    secondary: {
      label: "Talk to Operations",
      href: "/contact",
      ctaId: "history_final_cta_contact_ops",
    },
  },
} as const;

function HeroSection({ skip }: { skip: boolean }) {
  return (
    <section
      aria-labelledby="history-hero-heading"
      className="relative overflow-hidden border-b border-[color:var(--color-border-light-soft)] bg-[color:var(--color-surface-0-light)] py-20 sm:py-24 lg:py-26"
    >
      <div className="pointer-events-none absolute inset-0" aria-hidden>
        <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-[color:var(--color-ssp-cyan-500)]/25 to-transparent" />
        <div className="absolute inset-0 bg-[radial-gradient(66%_68%_at_88%_42%,rgba(8,33,70,0.2),rgba(8,33,70,0.04)_58%,transparent_100%)]" />
        <div className="absolute inset-0 bg-[radial-gradient(58%_62%_at_6%_100%,rgba(16,167,216,0.1),transparent_72%)]" />
        <div className="absolute inset-x-0 bottom-0 h-px bg-gradient-to-r from-transparent via-[color:var(--color-border-light)] to-transparent" />
      </div>

      <Container className="site-page-container relative">
        <motion.div
          initial={skip ? false : { opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: skip ? 0 : 0.4, ease: "easeOut" }}
          className="relative max-w-[44rem]"
        >
          <SectionSignalEyebrow label="Our History" />

          <h1
            id="history-hero-heading"
            className="mt-4 max-w-[18ch] text-balance text-[2.2rem] font-bold leading-[1.02] tracking-tight text-[color:var(--color-text-strong)] sm:text-[2.65rem] lg:text-[3.05rem]"
          >
            A Decade of Disciplined Expansion.
          </h1>

          <p className="mt-4 max-w-[58ch] text-[14.4px] leading-[1.78] text-[color:var(--color-muted)] sm:text-[15.2px]">
            Since 2015, SSP Group has scaled from a two-truck operation into a
            multi-entity freight organization with controlled growth across
            Canada, the United States, and Mexico.
          </p>
        </motion.div>

        <motion.div
          initial={skip ? { opacity: 0.24 } : { opacity: 0.04, x: -34, y: 20 }}
          animate={skip ? { opacity: 0.28 } : { opacity: 0.4, x: 0, y: 0 }}
          transition={{ duration: skip ? 0 : 0.66, ease: [0.22, 1, 0.36, 1] }}
          className="pointer-events-none absolute right-[-45%] top-[-2%] h-[120%] w-[118%] sm:right-[-40%] sm:top-[-4%] sm:h-[126%] sm:w-[110%] md:right-[-31%] md:top-[-7%] md:h-[130%] md:w-[98%] lg:right-[-23%] lg:top-[-10%] lg:h-[134%] lg:w-[80%]"
          aria-hidden
          style={shardFadeStyle}
        >
          <div className="h-full w-full" style={shardMaskStyle} />
        </motion.div>
      </Container>
    </section>
  );
}

function MilestoneCard({
  milestone,
  skip,
}: {
  milestone: HistoryMilestone;
  skip: boolean;
}) {
  return (
    <motion.div
      initial={skip ? false : { opacity: 1, y: 12, scale: 0.995 }}
      whileInView={skip ? undefined : { opacity: 1, y: 0, scale: 1 }}
      viewport={{ once: true, amount: 0.3 }}
      transition={{ duration: skip ? 0 : 0.45, ease: [0.22, 1, 0.36, 1] }}
      className="group relative max-w-lg"
    >
      {milestone.highlight && (
        <div
          className="pointer-events-none absolute -inset-3 rounded-3xl"
          style={{
            background:
              "radial-gradient(ellipse at center, rgba(224,43,53,0.10) 0%, transparent 72%)",
          }}
          aria-hidden
        />
      )}

      <div
        className={cn(
          "relative overflow-hidden rounded-2xl border p-6 transition-all duration-300 sm:p-7",
          "border-[color:var(--color-border-light)] bg-white",
          "shadow-[0_10px_26px_rgba(2,6,23,0.08)]",
          "hover:shadow-[0_14px_30px_rgba(2,6,23,0.11)]",
        )}
      >
        <div
          className="pointer-events-none absolute inset-x-0 top-0 h-px"
          style={{
            background:
              "linear-gradient(90deg, transparent, rgba(16,167,216,0.24) 50%, transparent)",
          }}
          aria-hidden
        />

        <p className="mb-2 text-[11px] font-semibold uppercase tracking-[0.18em] text-[color:var(--color-subtle)] lg:hidden">
          {milestone.year}
        </p>

        {milestone.stat && (
          <div className="mb-4 inline-flex items-baseline gap-1.5 rounded-full border border-[color:var(--color-ssp-cyan-500)]/25 bg-[color:var(--color-ssp-cyan-500)]/[0.06] px-3 py-1">
            <span className="text-sm font-bold text-[color:var(--color-menu-accent)]">
              {milestone.stat.value}
            </span>
            <span className="text-[10px] uppercase tracking-wider text-[color:var(--color-subtle)]">
              {milestone.stat.label}
            </span>
          </div>
        )}

        <h3 className="text-[1.1rem] font-bold leading-tight tracking-tight text-[color:var(--color-text-strong)] sm:text-[1.2rem]">
          {milestone.title}
        </h3>

        <p className="mt-2.5 text-[13.5px] leading-[1.8] text-[color:var(--color-muted)] sm:text-sm">
          {milestone.description}
        </p>
      </div>
    </motion.div>
  );
}

function TimelineSection({ skip }: { skip: boolean }) {
  return (
    <section
      aria-labelledby="history-timeline-heading"
      className="relative overflow-hidden border-y border-[color:var(--color-border-light-soft)] bg-[color:var(--color-surface-0-light)] py-20 sm:py-24 lg:py-28"
    >
      <div className="pointer-events-none absolute inset-0" aria-hidden>
        <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-[color:var(--color-border-light)] to-transparent" />
        <div
          className="absolute left-0 top-0 h-[min(22rem,56vh)] w-full max-w-4xl opacity-[0.028]"
          style={{
            backgroundImage:
              "linear-gradient(to right, var(--color-company-companies-grid-line) 1px, transparent 1px), linear-gradient(to bottom, var(--color-company-companies-grid-line) 1px, transparent 1px)",
            backgroundSize: "62px 62px",
            maskImage: "radial-gradient(118% 98% at 0% 0%, black 0%, rgba(0,0,0,0.92) 60%, transparent 100%)",
            WebkitMaskImage:
              "radial-gradient(118% 98% at 0% 0%, black 0%, rgba(0,0,0,0.92) 60%, transparent 100%)",
          }}
        />
        <div className="absolute inset-0 bg-[radial-gradient(58%_52%_at_100%_0%,rgba(16,167,216,0.05),transparent_60%)]" />
      </div>

      <Container className="site-page-container relative">
        <motion.div
          initial={skip ? false : { opacity: 0, y: 16 }}
          whileInView={skip ? undefined : { opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: skip ? 0 : 0.5, ease: "easeOut" }}
          className="mb-16 text-center"
        >
          <SectionSignalEyebrow label="Timeline" />

          <h2
            id="history-timeline-heading"
            className="mt-4 text-[1.75rem] font-bold tracking-tight text-[color:var(--color-text-strong)] sm:text-[2.2rem] lg:text-[2.8rem]"
          >
            The Milestones That Built SSP
          </h2>

          <p className="mx-auto mt-3 max-w-2xl text-sm leading-[1.8] text-[color:var(--color-muted)] sm:text-[15px]">
            Every year brought new challenges, new lanes, and a deeper
            commitment to disciplined freight execution.
          </p>
        </motion.div>

        <div className="relative">
          <div
            className="absolute bottom-0 left-[23px] top-0 w-px lg:hidden"
            style={{ background: TIMELINE_LINE }}
            aria-hidden
          />

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
                  <div
                    className={cn(
                      "hidden lg:flex",
                      isLeft ? "justify-end" : "",
                    )}
                  >
                    {isLeft && <MilestoneCard milestone={m} skip={skip} />}
                  </div>

                  <div className="relative flex justify-center pt-5">
                    <div
                      className={cn(
                        "absolute top-[calc(1.25rem+1.75rem)] hidden h-px w-11 lg:block",
                        isLeft
                          ? "right-[calc(50%+1.75rem)] bg-gradient-to-l from-[color:var(--color-border-light)] to-transparent"
                          : "left-[calc(50%+1.75rem)] bg-gradient-to-r from-[color:var(--color-border-light)] to-transparent",
                      )}
                      aria-hidden
                    />

                    <motion.div
                      initial={skip ? false : { scale: 0.95, opacity: 1 }}
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
                          ? "border-[color:var(--color-brand-500)]/40 bg-[color:var(--color-brand-500)]/10 text-[color:var(--color-text-strong)] shadow-[0_0_20px_rgba(224,43,53,0.18)]"
                          : "border-[color:var(--color-border-light)] bg-white text-[color:var(--color-text-strong)]",
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
/*  Page Composition                                                   */
/* ------------------------------------------------------------------ */

export function OurHistoryPage() {
  const skip = !!useReducedMotion();

  return (
    <>
      <HeroSection skip={skip} />
      <TimelineSection skip={skip} />
      <StandardFinalCta
        headingId="history-final-cta-heading"
        trackingLocation="history_final_cta"
        data={HISTORY_FINAL_CTA}
        sectionBgColor="var(--color-company-ink)"
        eyebrow={<SectionSignalEyebrow label={HISTORY_FINAL_CTA.kicker} light />}
      />
    </>
  );
}
