"use client";

import Link from "next/link";
import { useState } from "react";
import { AnimatePresence, motion, useReducedMotion, type Variants } from "framer-motion";
import { cn } from "@/lib/cn";
import { Container } from "@/app/(site)/components/layout/Container";
import { SectionSignalEyebrow } from "./SectionSignalEyebrow";

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
  const reduceMotion = useReducedMotion();
  const [activeComplianceIdx, setActiveComplianceIdx] = useState(0);
  const [openFaqIdx, setOpenFaqIdx] = useState(0);

  const revealUp: Variants = reduceMotion
    ? { hidden: { opacity: 1, y: 0 }, show: { opacity: 1, y: 0 } }
    : { hidden: { opacity: 0, y: 16 }, show: { opacity: 1, y: 0 } };

  const cardStagger: Variants = reduceMotion
    ? { hidden: { opacity: 1 }, show: { opacity: 1 } }
    : { hidden: {}, show: { transition: { staggerChildren: 0.06, delayChildren: 0.03 } } };

  const activeCompliance = complianceHighlights[activeComplianceIdx] ?? complianceHighlights[0];

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
            viewport={{ once: true, amount: 0.3 }}
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
                id={
                  item.key === "canada-usa"
                    ? "canada-usa"
                    : item.key === "mexico"
                      ? "mexico-cross-border"
                      : undefined
                }
                variants={revealUp}
                transition={{ duration: reduceMotion ? 0 : 0.4, ease: "easeOut" }}
                className="group relative overflow-hidden rounded-2xl border border-white/16 bg-[linear-gradient(180deg,rgba(255,255,255,0.10),rgba(255,255,255,0.05))] px-5 py-6 shadow-[0_10px_24px_rgba(2,6,23,0.16)] backdrop-blur-sm transition-all duration-300 hover:-translate-y-0.5 hover:border-white/28 hover:bg-white/[0.14] sm:px-7 sm:py-7"
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
                  className={cn("mt-5 inline-flex items-center gap-2 rounded text-sm font-semibold text-[color:var(--color-cb-link-light)] transition-colors hover:text-white", focusRingDark)}
                >
                  Explore service <span aria-hidden>{"->"}</span>
                </Link>
              </motion.article>
            ))}
          </motion.div>
        </Container>
      </section>

      <section className="border-y border-[color:var(--color-menu-border)] bg-[linear-gradient(180deg,#ffffff,#f4f8fc)] py-20 sm:py-24">
        <Container className="site-page-container">
          <motion.div
            className="grid gap-6 lg:grid-cols-12 lg:items-end"
            initial="hidden"
            whileInView="show"
            viewport={{ once: true, amount: 0.3 }}
            variants={revealUp}
            transition={{ duration: reduceMotion ? 0 : 0.45, ease: "easeOut" }}
          >
            <div className="lg:col-span-8">
              <SectionSignalEyebrow label="Performance" />
              <h2 className="mt-4 text-3xl leading-tight font-semibold text-[color:var(--color-menu-title)] sm:text-4xl">
                Proven results across managed cross-border programs.
              </h2>
              <p className="mt-4 max-w-3xl text-[15px] leading-8 text-[color:var(--color-menu-muted)]">
                Lane-level metrics reviewed continuously. Exception drivers identified. Recovery
                speed measured. Reliability compounded over time.
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

      <section className="border-y border-[color:var(--color-menu-border)] bg-[linear-gradient(180deg,#ffffff,#f6f9fc)] py-20 sm:py-24">
        <Container className="site-page-container">
          <motion.div
            className="grid gap-6 lg:grid-cols-12 lg:items-end"
            initial="hidden"
            whileInView="show"
            viewport={{ once: true, amount: 0.3 }}
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
          >
            {complianceHighlights.map((group, idx) => (
              <motion.button
                key={group.title}
                type="button"
                onClick={() => setActiveComplianceIdx(idx)}
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
            key={activeCompliance.title}
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
                  <span className="mt-[10px] h-1.5 w-1.5 rounded-full bg-[color:var(--color-menu-accent)]/70" />
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

      <section className="border-y border-[color:var(--color-menu-border)] bg-[linear-gradient(180deg,#f5f8fb,#eef3f8)] py-20 sm:py-24">
        <Container className="site-page-container">
          <div className="grid gap-7 lg:grid-cols-12">
            <motion.div
              className="lg:col-span-4"
              initial="hidden"
              whileInView="show"
              viewport={{ once: true, amount: 0.35 }}
              variants={revealUp}
              transition={{ duration: reduceMotion ? 0 : 0.45, ease: "easeOut" }}
            >
              <SectionSignalEyebrow label="Common Questions" />
              <h2 className="mt-3 text-3xl leading-tight font-semibold text-[color:var(--color-text)]">
                What shippers ask before starting a cross-border program.
              </h2>
              <p className="mt-4 text-[15px] leading-8 text-[color:var(--color-muted)]">
                The questions procurement and operations teams ask most often when evaluating
                cross-border freight partnerships across North America.
              </p>
            </motion.div>
            <motion.div
              className="lg:col-span-8"
              initial="hidden"
              whileInView="show"
              viewport={{ once: true, amount: 0.2 }}
              variants={cardStagger}
            >
              <motion.div
                variants={revealUp}
                transition={{ duration: reduceMotion ? 0 : 0.35, ease: "easeOut" }}
                className="overflow-hidden rounded-2xl border border-[color:var(--color-menu-border)] bg-white shadow-[0_8px_24px_rgba(2,6,23,0.06)]"
              >
                {faqItems.map((item, idx) => {
                  const isOpen = idx === openFaqIdx;
                  const panelId = `cb-faq-panel-${idx}`;
                  return (
                    <article
                      key={item.q}
                      className={idx < faqItems.length - 1 ? "border-b border-[color:var(--color-menu-border)]" : ""}
                    >
                      <button
                        type="button"
                        onClick={() => setOpenFaqIdx((prev) => (prev === idx ? -1 : idx))}
                        className={cn(
                          "flex w-full items-start justify-between gap-3 px-4 py-4 text-left transition-colors hover:bg-[color:var(--color-nav-hover)] sm:gap-4 sm:px-6 sm:py-5",
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
                              ? "border-[color:var(--color-menu-accent)]/30"
                              : "border-[color:var(--color-menu-border)]",
                          )}
                        >
                          <span
                            className={cn(
                              "absolute h-[1.5px] w-2.5 rounded-full transition-colors",
                              isOpen
                                ? "bg-[color:var(--color-menu-accent)]"
                                : "bg-[color:var(--color-menu-subtle)]",
                            )}
                          />
                          <span
                            className={cn(
                              "absolute h-2.5 w-[1.5px] rounded-full transition-all duration-200",
                              isOpen
                                ? "scale-0 bg-[color:var(--color-menu-accent)]"
                                : "scale-100 bg-[color:var(--color-menu-subtle)]",
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
                            <p className="px-4 pb-4 text-sm leading-7 text-[color:var(--color-nav-muted)] sm:px-6 sm:pb-5">
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

      <section className="border-t border-[color:var(--color-ssp-ink-800)]/45 bg-[linear-gradient(140deg,var(--color-ssp-ink-900),var(--color-ssp-ink-800))] py-20 sm:py-24">
        <Container className="site-page-container">
          <motion.div
            className="rounded-2xl border border-white/16 bg-white/[0.05] px-5 py-8 backdrop-blur-sm sm:px-8 sm:py-10 md:px-10"
            initial="hidden"
            whileInView="show"
            viewport={{ once: true, amount: 0.35 }}
            variants={revealUp}
            transition={{ duration: reduceMotion ? 0 : 0.45, ease: "easeOut" }}
          >
            <div className="grid gap-7 lg:grid-cols-12 lg:items-center">
              <div className="lg:col-span-8">
                <SectionSignalEyebrow label="Start Your Program" light />
                <h2 className="mt-3 text-2xl leading-tight font-semibold text-white sm:text-3xl">
                  Ready to build a cross-border freight program that holds?
                </h2>
                <p className="mt-3 max-w-3xl text-sm leading-7 text-white/74">
                  Share your corridor profile, freight requirements, and service priorities. SSP
                  will design an execution plan aligned to your compliance, reliability, and
                  control standards.
                </p>
                <div className="mt-5 flex flex-wrap gap-2 text-xs text-white/72">
                  <span className="rounded-full border border-white/20 bg-white/[0.07] px-3 py-1">Lane-level onboarding</span>
                  <span className="rounded-full border border-white/20 bg-white/[0.07] px-3 py-1">Customs-aligned workflows</span>
                  <span className="rounded-full border border-white/20 bg-white/[0.07] px-3 py-1">Dedicated cross-border team</span>
                </div>
              </div>

              <div className="rounded-xl border border-white/16 bg-white/[0.06] p-4 sm:p-5 lg:col-span-4">
                <p className="text-xs font-semibold tracking-[0.12em] text-white/70 uppercase">
                  Start Your Engagement
                </p>
                <div className="mt-4 grid gap-3">
                  <Link
                    href="/quote"
                    className={cn("inline-flex h-12 items-center justify-center rounded-lg bg-[color:var(--color-ssp-cyan-500)] px-5 text-sm font-semibold text-white shadow-[0_6px_20px_rgba(16,167,216,0.35)] transition hover:bg-[color:var(--color-ssp-cyan-600)] hover:shadow-[0_10px_28px_rgba(16,167,216,0.45)]", focusRingDark)}
                  >
                    Request a Cross-Border Quote
                  </Link>
                  <Link
                    href="/contact"
                    className={cn("inline-flex h-12 items-center justify-center rounded-lg border border-white/24 px-5 text-sm font-semibold text-white/92 transition hover:border-white/40 hover:bg-white/10", focusRingDark)}
                  >
                    Contact SSP Group
                  </Link>
                </div>
              </div>
            </div>
          </motion.div>
        </Container>
      </section>
    </>
  );
}

