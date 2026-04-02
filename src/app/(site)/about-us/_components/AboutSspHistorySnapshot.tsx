"use client";

import Link from "next/link";
import { motion, useReducedMotion, type Variants } from "framer-motion";
import { Container } from "@/app/(site)/components/layout/Container";
import { SectionSignalEyebrow } from "@/app/(site)/components/ui/SectionSignalEyebrow";
import { SSP_HISTORY_MILESTONES } from "@/config/history";
import { trackCtaClick } from "@/lib/analytics/cta";
import { cn } from "@/lib/cn";

const FOCUS_RING_LIGHT =
  "focus:outline-none focus-visible:ring-2 focus-visible:ring-[color:var(--color-nav-ring)] focus-visible:ring-offset-2 focus-visible:ring-offset-[color:var(--color-surface-1-light)]";

export function AboutSspHistorySnapshot() {
  const reduceMotion = useReducedMotion() ?? false;

  const revealUp: Variants = reduceMotion
    ? { hidden: { opacity: 1, y: 0 }, show: { opacity: 1, y: 0 } }
    : { hidden: { opacity: 1, y: 10 }, show: { opacity: 1, y: 0 } };

  const stagger: Variants = reduceMotion
    ? { hidden: { opacity: 1 }, show: { opacity: 1 } }
    : { hidden: {}, show: { transition: { staggerChildren: 0.05, delayChildren: 0.03 } } };

  const snapshotMilestones = SSP_HISTORY_MILESTONES.filter((milestone) => milestone.snapshotPreview);

  return (
    <section
      id="history-at-a-glance"
      aria-labelledby="history-at-a-glance-heading"
      className="relative overflow-hidden border-y border-[color:var(--color-border-light-soft)] py-20 sm:py-24"
      style={{
        background:
          "linear-gradient(180deg, var(--color-surface-0-light) 0%, var(--color-surface-1-light) 58%, var(--color-surface-2) 100%)",
      }}
    >
      <div className="pointer-events-none absolute inset-0" aria-hidden>
        <div
          className="absolute inset-x-0 top-0 h-24"
          style={{ background: "linear-gradient(180deg, rgba(255,255,255,0.72) 0%, transparent 100%)" }}
        />
        <div
          className="absolute -right-20 top-0 h-[240px] w-[240px] rounded-full blur-[120px]"
          style={{ backgroundColor: "rgba(16,167,216,0.08)" }}
        />
        <div
          className="absolute -left-24 bottom-0 h-[220px] w-[220px] rounded-full blur-[115px]"
          style={{ backgroundColor: "rgba(224,43,53,0.05)" }}
        />
      </div>

      <Container className="site-page-container relative">
        <motion.div
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, amount: 0.15 }}
          variants={stagger}
          className="grid gap-7 lg:grid-cols-12 lg:items-end"
        >
          <div className="lg:col-span-8">
            <motion.div
              variants={revealUp}
              transition={{ duration: reduceMotion ? 0 : 0.35, ease: "easeOut" }}
              className="flex justify-start"
            >
              <SectionSignalEyebrow label="Our History" />
            </motion.div>

            <motion.h2
              id="history-at-a-glance-heading"
              variants={revealUp}
              transition={{ duration: reduceMotion ? 0 : 0.35, ease: "easeOut" }}
              className="mt-4 max-w-[18ch] text-[2rem] font-bold leading-[1.08] tracking-tight text-[color:var(--color-text-strong)] sm:text-[2.45rem]"
            >
              Growth built on operating control.
            </motion.h2>

            <motion.p
              variants={revealUp}
              transition={{ duration: reduceMotion ? 0 : 0.35, ease: "easeOut" }}
              className="mt-4 max-w-[64ch] text-[15px] leading-[1.85] text-[color:var(--color-muted)] sm:text-[15.5px]"
            >
              SSP expanded by adding capacity, locations, and specialized companies without
              loosening operating standards. These milestones show how the business grew from a
              small fleet into a broader North American freight platform.
            </motion.p>
          </div>

          <motion.div
            variants={revealUp}
            transition={{ duration: reduceMotion ? 0 : 0.35, ease: "easeOut" }}
            className="rounded-xl border border-[color:var(--color-border-light-soft)] bg-[color:var(--color-surface-1-light)]/60 px-4 py-3.5 lg:col-span-4 lg:justify-self-end lg:rounded-none lg:border-0 lg:bg-transparent lg:p-0 lg:text-right"
          >
            <p className="text-[10px] font-semibold tracking-[0.13em] text-[color:var(--color-subtle)] uppercase">
              Snapshot Scope
            </p>
            <p className="mt-1 text-[15px] font-semibold tracking-tight text-[color:var(--color-text-strong)]">
              2015 to 2026
            </p>
            <p className="mt-2 max-w-[34ch] text-[13px] leading-6 text-[color:var(--color-muted)] lg:ml-auto">
              Select milestones only. The dedicated history page carries the fuller chronology and
              business context.
            </p>
          </motion.div>
        </motion.div>

        {/* ── Desktop horizontal timeline (lg+) ── */}
        <motion.div
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, amount: 0.2 }}
          variants={stagger}
          className="relative mt-11 hidden lg:block"
        >
          <div className="pointer-events-none absolute left-0 right-0 top-0 h-px bg-gradient-to-r from-[color:var(--color-ssp-cyan-500)]/40 via-[color:var(--color-border-light)] to-transparent" />

          <div className="grid grid-cols-4 gap-x-7 pt-5">
            {snapshotMilestones.map((milestone, idx) => (
              <motion.article
                key={milestone.year}
                variants={revealUp}
                transition={{ duration: reduceMotion ? 0 : 0.35, ease: "easeOut" }}
                className={cn(
                  "relative pb-1",
                  idx < snapshotMilestones.length - 1 &&
                    "border-r border-[color:var(--color-border-light-soft)]",
                  idx < snapshotMilestones.length - 1 && "pr-4",
                )}
              >
                <div className="absolute -top-5 left-0 h-[11px] w-[11px] rounded-full bg-[color:var(--color-surface-0-light)] ring-2 ring-[color:var(--color-ssp-cyan-500)]" />
                <p className="text-[10px] font-semibold tracking-[0.14em] text-[color:var(--color-subtle)] uppercase">
                  Chapter {idx + 1}
                </p>
                <p className="mt-1 text-[1.45rem] leading-none font-bold tracking-tight text-[color:var(--color-text-strong)] sm:text-[1.58rem]">
                  {milestone.year}
                </p>
                <h3 className="mt-3 max-w-[19ch] text-[1.02rem] font-semibold leading-snug tracking-tight text-[color:var(--color-text-strong)]">
                  {milestone.title}
                </h3>
                <p className="mt-2 max-w-[34ch] text-[13px] leading-6 text-[color:var(--color-muted)]">
                  {milestone.snapshotPreview ?? milestone.description}
                </p>
              </motion.article>
            ))}
          </div>
        </motion.div>

        {/* ── Mobile / tablet vertical timeline (< lg) ── */}
        <motion.div
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, amount: 0.15 }}
          variants={stagger}
          className="relative mt-10 lg:hidden"
        >
          <ol className="relative list-none">
            {snapshotMilestones.map((milestone, idx) => (
              <motion.li
                key={milestone.year}
                variants={revealUp}
                transition={{ duration: reduceMotion ? 0 : 0.35, ease: "easeOut" }}
                className="relative flex gap-4 sm:gap-5"
              >
                <div className="relative flex w-10 shrink-0 flex-col items-center sm:w-12">
                  <div className="relative z-10 h-[11px] w-[11px] rounded-full bg-[color:var(--color-surface-0-light)] ring-2 ring-[color:var(--color-ssp-cyan-500)]" />
                  {idx < snapshotMilestones.length - 1 && (
                    <div
                      className="absolute left-1/2 top-[11px] bottom-0 w-px -translate-x-1/2"
                      style={{
                        background:
                          "linear-gradient(180deg, var(--color-ssp-cyan-500) 0%, color-mix(in srgb, var(--color-border-light) 60%, transparent) 70%, transparent 100%)",
                      }}
                      aria-hidden
                    />
                  )}
                </div>

                <div
                  className={cn(
                    "min-w-0 flex-1 pb-8 sm:pb-10",
                    idx < snapshotMilestones.length - 1 &&
                      "border-b border-[color:var(--color-border-light-soft)]",
                  )}
                >
                  <p className="text-[10px] font-semibold tracking-[0.14em] text-[color:var(--color-subtle)] uppercase">
                    Chapter {idx + 1}
                  </p>
                  <p className="mt-1 text-[1.45rem] leading-none font-bold tracking-tight text-[color:var(--color-text-strong)]">
                    {milestone.year}
                  </p>
                  <h3 className="mt-2.5 text-[1.02rem] font-semibold leading-snug tracking-tight text-[color:var(--color-text-strong)]">
                    {milestone.title}
                  </h3>
                  <p className="mt-2 max-w-[38ch] text-[13px] leading-6 text-[color:var(--color-muted)]">
                    {milestone.snapshotPreview ?? milestone.description}
                  </p>
                </div>
              </motion.li>
            ))}
          </ol>
        </motion.div>

        <motion.div
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, amount: 0.2 }}
          variants={revealUp}
          transition={{ duration: reduceMotion ? 0 : 0.35, ease: "easeOut" }}
          className="mt-10 flex justify-start lg:justify-end"
        >
          <Link
            href="/company/our-history"
            data-cta-id="about_history_explore_full_timeline"
            onClick={() =>
              trackCtaClick({
                ctaId: "about_history_explore_full_timeline",
                location: "about_history_snapshot",
                destination: "/company/our-history",
                label: "Explore Full Timeline",
              })
            }
            className={cn(
              "group inline-flex items-center gap-2 rounded-lg text-sm font-semibold text-[color:var(--color-menu-accent)] transition-colors hover:text-[color:var(--color-ssp-ink-800)]",
              FOCUS_RING_LIGHT,
            )}
          >
            Explore Full Timeline
            <span aria-hidden className="transition-transform motion-safe:group-hover:translate-x-0.5">
              &rarr;
            </span>
          </Link>
        </motion.div>
      </Container>
    </section>
  );
}
