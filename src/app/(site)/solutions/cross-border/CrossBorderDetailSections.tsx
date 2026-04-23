"use client";

import Link from "next/link";
import { useRef, useState } from "react";
import { motion, useReducedMotion, type Variants } from "framer-motion";
import { cn } from "@/lib/cn";
import { Container } from "@/app/(site)/components/layout/Container";
import { SectionSignalEyebrow } from "@/app/(site)/components/ui/SectionSignalEyebrow";
import { SharedFaqSection } from "@/app/(site)/components/faq/SharedFaqSection";
import { StandardFinalCta } from "@/app/(site)/components/cta/StandardFinalCta";
import { trackCtaClick } from "@/lib/analytics/cta";

const focusRing =
  "focus:outline-none focus-visible:ring-2 focus-visible:ring-[color:var(--color-nav-ring)] focus-visible:ring-offset-1";

const focusRingDark =
  "focus:outline-none focus-visible:ring-2 focus-visible:ring-white/40 focus-visible:ring-offset-2 focus-visible:ring-offset-[color:var(--color-ssp-ink-800)]";

type CorridorService = {
  key: string;
  label: string;
  href: string;
  bestFor: string;
  summary: string;
};

type ComplianceGroup = {
  title: string;
  points: readonly string[];
};

type PerformanceMetric = {
  value: string;
  label: string;
  note: string;
};

type PerformanceSnapshot = {
  title: string;
  challenge: string;
  approach: string;
  outcome: string;
};

type ReferenceLink = {
  label: string;
  href: string;
};

type FaqItem = {
  q: string;
  a: string;
};

type CrossBorderDetailSectionsProps = {
  crossBorderServicePaths: readonly CorridorService[];
  performanceMetrics: readonly PerformanceMetric[];
  performanceSnapshots: readonly PerformanceSnapshot[];
  lastReviewedDate: string;
  complianceHighlights: readonly ComplianceGroup[];
  referenceLinks: readonly ReferenceLink[];
  faqItems: readonly FaqItem[];
};

export function CrossBorderDetailSections({
  crossBorderServicePaths,
  performanceMetrics,
  performanceSnapshots,
  lastReviewedDate,
  complianceHighlights,
  referenceLinks,
  faqItems,
}: CrossBorderDetailSectionsProps) {
  const reduceMotion = useReducedMotion() ?? false;
  const [activeComplianceIdx, setActiveComplianceIdx] = useState(0);
  const complianceTabRefs = useRef<Array<HTMLButtonElement | null>>([]);

  const revealUp: Variants = reduceMotion
    ? { hidden: { opacity: 1, y: 0 }, show: { opacity: 1, y: 0 } }
    : { hidden: { opacity: 1, y: 10 }, show: { opacity: 1, y: 0 } };

  const cardStagger: Variants = reduceMotion
    ? { hidden: { opacity: 1 }, show: { opacity: 1 } }
    : { hidden: {}, show: { transition: { staggerChildren: 0.05, delayChildren: 0.03 } } };

  const activeCompliance = complianceHighlights[activeComplianceIdx] ?? complianceHighlights[0];

  function moveComplianceTab(nextIdx: number) {
    const nextTab = complianceHighlights[nextIdx];
    if (!nextTab) return;
    setActiveComplianceIdx(nextIdx);
    complianceTabRefs.current[nextIdx]?.focus();
  }

  return (
    <>
      <section
        id="corridors"
        className="relative overflow-hidden scroll-mt-24 border-y border-[color:var(--color-cb-corridor-border)] bg-[linear-gradient(145deg,var(--color-cb-hero-ink-deep),var(--color-ssp-ink-800)_50%,#0c3a58)] py-20 sm:py-24"
      >
        <div className="pointer-events-none absolute inset-0" aria-hidden>
          <div className="absolute -top-20 right-[-90px] h-[230px] w-[230px] rounded-full bg-[color:var(--color-ssp-cyan-500)]/16 blur-[85px]" />
          <div className="absolute -bottom-20 left-[-100px] h-[240px] w-[240px] rounded-full bg-white/8 blur-[105px]" />
          <div className="absolute inset-x-0 top-0 h-px bg-white/16" />
        </div>

        <Container className="site-page-container relative">
          <motion.div
            className="max-w-4xl"
            initial="hidden"
            whileInView="show"
            viewport={{ once: true, amount: 0.15 }}
            variants={revealUp}
            transition={{ duration: reduceMotion ? 0 : 0.45, ease: "easeOut" }}
          >
            <SectionSignalEyebrow label="Service Corridors" light />
            <h2 className="mt-3 text-3xl leading-tight font-semibold text-white sm:text-4xl">
              Cross-border execution matched to your corridor and freight profile.
            </h2>
            <p className="mt-4 text-[15px] leading-8 text-white/76">
              Each corridor carries different documentation, security, and handoff requirements.
              Select the service model that fits your lane priorities.
            </p>
          </motion.div>

          <motion.div
            className="mt-9 grid gap-4 md:grid-cols-2"
            initial="hidden"
            whileInView="show"
            viewport={{ once: true, amount: 0.2 }}
            variants={cardStagger}
          >
            {crossBorderServicePaths.map((item) => (
              <motion.article
                key={item.key}
                id={item.key}
                variants={revealUp}
                transition={{ duration: reduceMotion ? 0 : 0.4, ease: "easeOut" }}
                className="group relative overflow-hidden rounded-2xl border border-white/16 bg-[linear-gradient(180deg,rgba(255,255,255,0.10),rgba(255,255,255,0.05))] px-5 py-6 shadow-[0_10px_24px_rgba(2,6,23,0.16)] backdrop-blur-sm transition-all duration-300 motion-safe:hover:-translate-y-0.5 hover:border-white/28 hover:bg-white/[0.14] sm:px-7 sm:py-7"
              >
                <div
                  aria-hidden
                  className="pointer-events-none absolute inset-x-0 top-0 h-[2px] bg-[linear-gradient(90deg,var(--color-ssp-cyan-500),rgba(255,255,255,0.2))]"
                />
                <p className="text-[10.5px] font-semibold tracking-[0.14em] text-white/65 uppercase">
                  Best for
                </p>
                <p className="mt-1 text-sm leading-7 text-white/75">{item.bestFor}</p>
                <h3 className="mt-3 text-[19px] leading-tight font-semibold text-white sm:text-[22px]">{item.label}</h3>
                <p className="mt-3 text-sm leading-7 text-white/74">{item.summary}</p>
                <Link
                  href={item.href}
                  aria-label={`Explore ${item.label} service`}
                  onClick={() =>
                    trackCtaClick({
                      ctaId: `cb_corridor_${item.key}`,
                      location: "cross_border_hub_corridors",
                      destination: item.href,
                      label: item.label,
                    })
                  }
                  className={cn("mt-5 inline-flex items-center gap-2 rounded text-sm font-semibold text-[color:var(--color-cb-link-light)] transition-colors hover:text-white", focusRingDark)}
                >
                  Explore service <span aria-hidden>{"->"}</span>
                </Link>
              </motion.article>
            ))}
          </motion.div>
        </Container>
      </section>

      <section className="relative overflow-hidden border-y border-[color:var(--color-menu-border)] bg-[linear-gradient(180deg,#ffffff,#f4f8fc)] py-20 sm:py-24">
        <div className="pointer-events-none absolute inset-0" aria-hidden>
          <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-[color:var(--color-menu-accent)]/18 to-transparent" />
          <div
            className="absolute left-0 top-0 h-[min(21rem,54vh)] w-full max-w-4xl opacity-[0.036]"
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
            className="grid gap-6 lg:grid-cols-12 lg:items-end"
            initial="hidden"
            whileInView="show"
            viewport={{ once: true, amount: 0.15 }}
            variants={revealUp}
            transition={{ duration: reduceMotion ? 0 : 0.45, ease: "easeOut" }}
          >
            <div className="lg:col-span-8">
              <SectionSignalEyebrow label="Program Controls" />
              <h2 className="mt-4 text-3xl leading-tight font-semibold text-[color:var(--color-menu-title)] sm:text-4xl">
                Cross-border execution controls designed before results are measured.
              </h2>
              <p className="mt-4 max-w-3xl text-[15px] leading-8 text-[color:var(--color-menu-muted)]">
                These controls summarize how We structure managed cross-border freight before
                live performance is reviewed through corridor governance cycles.
              </p>
            </div>
            <div className="lg:col-span-4 lg:justify-self-end">
              <span className="inline-flex rounded-full border border-[color:var(--color-menu-border)] bg-white px-3 py-1 text-xs font-medium text-[color:var(--color-menu-subtle)]">
                Last reviewed: {lastReviewedDate}
              </span>
            </div>
          </motion.div>

          <motion.div
            className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-4"
            initial="hidden"
            whileInView="show"
            viewport={{ once: true, amount: 0.2 }}
            variants={cardStagger}
          >
            {performanceMetrics.map((metric) => (
              <motion.article
                key={metric.label}
                variants={revealUp}
                transition={{ duration: reduceMotion ? 0 : 0.38, ease: "easeOut" }}
                className="rounded-2xl border border-[color:var(--color-menu-border)] bg-white px-5 py-5 shadow-[0_6px_18px_rgba(2,6,23,0.05)] sm:px-6 sm:py-6"
              >
                <p className="text-[30px] leading-none font-bold tracking-tight text-[color:var(--color-ssp-ink-800)] sm:text-[36px]">
                  {metric.value}
                </p>
                <p className="mt-3 text-[14px] font-semibold text-[color:var(--color-menu-title)]">
                  {metric.label}
                </p>
                <p className="mt-2 text-xs leading-6 text-[color:var(--color-menu-muted)]">{metric.note}</p>
              </motion.article>
            ))}
          </motion.div>
          <motion.p
            variants={revealUp}
            transition={{ duration: reduceMotion ? 0 : 0.32, ease: "easeOut" }}
            className="mt-4 max-w-3xl text-xs leading-6 text-[color:var(--color-menu-subtle)]"
          >
            Control examples shown reflect SSP&apos;s operating model. Actual execution varies by
            corridor, freight profile, customs conditions, and operating window.
          </motion.p>

          <motion.div
            className="mt-8 grid gap-4 lg:grid-cols-2"
            initial="hidden"
            whileInView="show"
            viewport={{ once: true, amount: 0.2 }}
            variants={cardStagger}
          >
            {performanceSnapshots.map((snapshot) => (
              <motion.article
                key={snapshot.title}
                variants={revealUp}
                transition={{ duration: reduceMotion ? 0 : 0.4, ease: "easeOut" }}
                className="rounded-2xl border border-[color:var(--color-menu-border)] bg-white px-5 py-6 shadow-[0_6px_18px_rgba(2,6,23,0.05)] sm:px-7 sm:py-7"
              >
                <h3 className="text-[19px] leading-snug font-semibold text-[color:var(--color-menu-title)]">
                  {snapshot.title}
                </h3>
                <p className="mt-4 text-xs font-semibold tracking-[0.12em] text-[color:var(--color-menu-subtle)] uppercase">
                  Challenge
                </p>
                <p className="mt-1 text-sm leading-7 text-[color:var(--color-menu-muted)]">
                  {snapshot.challenge}
                </p>
                <p className="mt-4 text-xs font-semibold tracking-[0.12em] text-[color:var(--color-menu-subtle)] uppercase">
                  SSP Approach
                </p>
                <p className="mt-1 text-sm leading-7 text-[color:var(--color-menu-muted)]">
                  {snapshot.approach}
                </p>
                <p className="mt-4 text-xs font-semibold tracking-[0.12em] text-[color:var(--color-menu-subtle)] uppercase">
                  Outcome
                </p>
                <p className="mt-1 text-sm leading-7 text-[color:var(--color-menu-muted)]">
                  {snapshot.outcome}
                </p>
              </motion.article>
            ))}
          </motion.div>
        </Container>
      </section>

      <section className="relative overflow-hidden border-y border-[color:var(--color-menu-border)] bg-[linear-gradient(180deg,#ffffff,#f6f9fc)] py-20 sm:py-24">
        <div className="pointer-events-none absolute inset-0" aria-hidden>
          <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-[color:var(--color-menu-accent)]/18 to-transparent" />
          <div
            className="absolute left-0 top-0 h-[min(21rem,54vh)] w-full max-w-4xl opacity-[0.036]"
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
            className="grid gap-6 lg:grid-cols-12 lg:items-end"
            initial="hidden"
            whileInView="show"
            viewport={{ once: true, amount: 0.15 }}
            variants={revealUp}
            transition={{ duration: reduceMotion ? 0 : 0.45, ease: "easeOut" }}
          >
            <div className="lg:col-span-8">
              <SectionSignalEyebrow label="Regulatory Readiness" />
              <h2 className="mt-3 text-3xl leading-tight font-semibold text-[color:var(--color-menu-title)] sm:text-4xl">
                Documentation discipline built into every corridor.
              </h2>
              <p className="mt-4 max-w-3xl text-[15px] leading-8 text-[color:var(--color-menu-muted)]">
                Region-specific customs readiness aligned to published regulatory frameworks.
                Designed to reduce preventable delays and strengthen pre-movement control.
              </p>
            </div>
            <div className="lg:col-span-4 lg:justify-self-end">
              <span className="inline-flex rounded-full border border-[color:var(--color-menu-border)] bg-white px-3 py-1 text-xs font-medium text-[color:var(--color-menu-subtle)]">
                Informational only - not legal advice
              </span>
            </div>
          </motion.div>

          <motion.div
            className="mt-8 flex flex-wrap gap-2.5"
            initial="hidden"
            whileInView="show"
            viewport={{ once: true, amount: 0.2 }}
            variants={cardStagger}
            role="tablist"
            aria-label="Regulatory guidance by region"
          >
            {complianceHighlights.map((group, idx) => (
              <motion.button
                key={group.title}
                ref={(element) => {
                  complianceTabRefs.current[idx] = element;
                }}
                type="button"
                onClick={() => setActiveComplianceIdx(idx)}
                onKeyDown={(event) => {
                  const lastIndex = complianceHighlights.length - 1;

                  if (lastIndex < 0) return;

                  if (event.key === "ArrowRight" || event.key === "ArrowDown") {
                    event.preventDefault();
                    moveComplianceTab(idx === lastIndex ? 0 : idx + 1);
                    return;
                  }

                  if (event.key === "ArrowLeft" || event.key === "ArrowUp") {
                    event.preventDefault();
                    moveComplianceTab(idx === 0 ? lastIndex : idx - 1);
                    return;
                  }

                  if (event.key === "Home") {
                    event.preventDefault();
                    moveComplianceTab(0);
                    return;
                  }

                  if (event.key === "End") {
                    event.preventDefault();
                    moveComplianceTab(lastIndex);
                  }
                }}
                id={`cross-border-compliance-tab-${idx}`}
                role="tab"
                aria-selected={idx === activeComplianceIdx}
                aria-controls="cross-border-compliance-panel"
                tabIndex={idx === activeComplianceIdx ? 0 : -1}
                variants={revealUp}
                transition={{ duration: reduceMotion ? 0 : 0.3, ease: "easeOut" }}
                className={cn(
                  "inline-flex rounded-full px-3.5 py-1.5 text-xs transition",
                  focusRing,
                  idx === activeComplianceIdx
                    ? "border border-[color:var(--color-menu-accent)] bg-[color:var(--color-menu-accent)]/12 font-semibold text-[color:var(--color-menu-accent)]"
                    : "border border-[color:var(--color-menu-border)] bg-white font-medium text-[color:var(--color-menu-subtle)] hover:border-[color:var(--color-menu-accent)]/40 hover:text-[color:var(--color-menu-title)]",
                )}
              >
                {group.title}
              </motion.button>
            ))}
          </motion.div>

          <motion.div
            id="cross-border-compliance-panel"
            role="tabpanel"
            aria-labelledby={`cross-border-compliance-tab-${activeComplianceIdx}`}
            tabIndex={0}
            className="mt-6 rounded-2xl border border-[color:var(--color-menu-border)] bg-white px-5 py-6 shadow-[0_6px_18px_rgba(2,6,23,0.05)] sm:px-7 sm:py-7"
            initial="hidden"
            animate="show"
            variants={revealUp}
            transition={{ duration: reduceMotion ? 0 : 0.4, ease: "easeOut" }}
          >
            <h3 className="text-[20px] leading-snug font-semibold text-[color:var(--color-menu-title)]">
              {activeCompliance.title}
            </h3>
            <ul className="mt-4 space-y-2.5 text-sm leading-7 text-[color:var(--color-menu-muted)]">
              {activeCompliance.points.map((point) => (
                <li key={point} className="flex gap-2">
                  <span
                    aria-hidden
                    className="mt-[10px] h-1.5 w-1.5 rounded-full bg-[color:var(--color-menu-accent)]/70"
                  />
                  <span>{point}</span>
                </li>
              ))}
            </ul>

            <p className="mt-5 text-xs leading-6 text-[color:var(--color-menu-muted)]">
              References are provided for transparency. Final documentation and customs requirements
              vary by commodity, route, importer profile, and current regulatory updates.
            </p>
            <p className="mt-2 text-xs leading-6 text-[color:var(--color-menu-subtle)]">
              Last reviewed: {lastReviewedDate}
            </p>

            <details className="mt-4 rounded-lg border border-[color:var(--color-menu-border)] bg-[color:var(--color-surface-1)] px-4 py-3">
              <summary className="cursor-pointer text-sm font-semibold text-[color:var(--color-menu-title)]">
                View source references
              </summary>
              <ul className="mt-3 grid gap-2.5">
                {referenceLinks.map((item) => (
                  <li key={item.href}>
                    <a
                      href={item.href}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-sm text-[color:var(--color-menu-title)] underline-offset-4 hover:text-[color:var(--color-menu-accent)] hover:underline"
                    >
                      {item.label}
                    </a>
                  </li>
                ))}
              </ul>
            </details>
          </motion.div>
        </Container>
      </section>

      <SharedFaqSection
        eyebrow={<SectionSignalEyebrow label="FAQ" />}
        title="What shippers ask before starting a cross-border program."
        description="The questions procurement and operations teams ask most often when evaluating cross-border freight partnerships across North America."
        items={faqItems}
        theme="light"
        panelIdPrefix="cb-faq"
      />

      <StandardFinalCta
        variant="corridor"
        headingId="cross-border-final-cta-heading"
        trackingLocation="cross_border_hub_final_cta"
        accentColor="var(--color-ssp-cyan-500)"
        orbMainColor="rgba(16,167,216,0.1)"
        orbSecondaryColor="rgba(255,255,255,0.06)"
        eyebrow={<SectionSignalEyebrow label="Start Your Program" light />}
        data={{
          kicker: "Start Your Engagement",
          title: "Ready to build a cross-border freight program that holds?",
          body: "Share your corridor profile, freight requirements, and service priorities. We will design an execution plan aligned to your compliance, reliability, and control standards.",
          trustSignals: [
            "Lane-level onboarding",
            "Customs-aligned workflows",
            "Dedicated cross-border team",
          ],
          ctas: {
            primary: {
              label: "Request a Cross-Border Quote",
              href: "/quote",
              ctaId: "cb_hub_final_quote",
            },
            secondary: {
              label: "Contact SSP Group",
              href: "/contact",
              ctaId: "cb_hub_final_contact",
            },
          },
        }}
      />
    </>
  );
}

