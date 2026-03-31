"use client";

import Link from "next/link";
import { motion, useReducedMotion, type Variants } from "framer-motion";
import { Container } from "@/app/(site)/components/layout/Container";
import { SectionSignalEyebrow } from "@/app/(site)/components/ui/SectionSignalEyebrow";
import { SSP_HISTORY_MILESTONES } from "@/config/history";
import { cn } from "@/lib/cn";

const FOCUS_RING_LIGHT =
  "focus:outline-none focus-visible:ring-2 focus-visible:ring-[color:var(--color-nav-ring)] focus-visible:ring-offset-2 focus-visible:ring-offset-[color:var(--color-surface-1-light)]";

const SNAPSHOT_YEARS = new Set(["2015", "2018", "2021", "2026"]);
const SNAPSHOT_PREVIEWS: Record<string, string> = {
  "2015": "Founded with a lane-first execution model and a clear service standard.",
  "2018":
    "Transitioned into SSP Group, expanding from trucking into broader logistics capability.",
  "2021":
    "Cross-border corridor structure took shape across Canada, the United States, and Mexico.",
  "2026":
    "Entered a more mature enterprise chapter with stronger systems and clearer market positioning.",
};

export function AboutSspHistorySnapshot() {
  const reduceMotion = useReducedMotion();

  const revealUp: Variants = reduceMotion
    ? { hidden: { opacity: 1, y: 0 }, show: { opacity: 1, y: 0 } }
    : { hidden: { opacity: 0, y: 18 }, show: { opacity: 1, y: 0 } };

  const stagger: Variants = reduceMotion
    ? { hidden: { opacity: 1 }, show: { opacity: 1 } }
    : { hidden: {}, show: { transition: { staggerChildren: 0.08, delayChildren: 0.04 } } };

  const snapshotMilestones = SSP_HISTORY_MILESTONES.filter((m) => SNAPSHOT_YEARS.has(m.year));

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
        <div className="absolute inset-x-0 top-0 h-24 bg-gradient-to-b from-[color:var(--color-surface-1-light)] to-transparent" />
        <div className="absolute -right-20 top-0 h-[240px] w-[240px] rounded-full bg-[color:var(--color-ssp-cyan-500)]/8 blur-[120px]" />
        <div className="absolute -left-24 bottom-0 h-[220px] w-[220px] rounded-full bg-[color:var(--color-brand-500)]/7 blur-[115px]" />
      </div>

      <Container className="site-page-container relative">
        <motion.div
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, amount: 0.25 }}
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
              transition={{ duration: reduceMotion ? 0 : 0.45, ease: "easeOut" }}
              className="mt-4 max-w-[18ch] text-[2rem] font-bold leading-[1.08] tracking-tight text-[color:var(--color-text-strong)] sm:text-[2.45rem]"
            >
              From operator mindset to enterprise momentum.
            </motion.h2>

            <motion.p
              variants={revealUp}
              transition={{ duration: reduceMotion ? 0 : 0.4, ease: "easeOut" }}
              className="mt-4 max-w-[64ch] text-[15px] leading-[1.85] text-[color:var(--color-muted)] sm:text-[15.5px]"
            >
              After establishing how SSP operates today, this snapshot shows how that model was
              built. These four inflection points trace the move from early lane execution to a
              broader North American logistics group.
            </motion.p>
          </div>

          <motion.div
            variants={revealUp}
            transition={{ duration: reduceMotion ? 0 : 0.45, ease: "easeOut" }}
            className="lg:col-span-4 lg:justify-self-end lg:text-right"
          >
            <p className="text-[10px] font-semibold tracking-[0.13em] text-[color:var(--color-subtle)] uppercase">
              Snapshot Scope
            </p>
            <p className="mt-1 text-[15px] font-semibold tracking-tight text-[color:var(--color-text-strong)]">
              2015 to 2026
            </p>
            <p className="mt-2 max-w-[34ch] text-[13px] leading-6 text-[color:var(--color-muted)] lg:ml-auto">
              Strategic summary only. The dedicated history page carries the full chronology and
              milestone context.
            </p>
          </motion.div>
        </motion.div>

        <motion.div
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, amount: 0.2 }}
          variants={stagger}
          className="relative mt-11"
        >
          <div className="pointer-events-none absolute left-0 right-0 top-0 h-px bg-gradient-to-r from-[color:var(--color-ssp-cyan-500)]/40 via-[color:var(--color-border-light)] to-transparent" />

          <div className="grid gap-8 pt-5 md:grid-cols-2 md:gap-x-8 md:gap-y-10 lg:grid-cols-4 lg:gap-x-7">
            {snapshotMilestones.map((milestone, idx) => (
              <motion.article
                key={milestone.year}
                variants={revealUp}
                transition={{ duration: reduceMotion ? 0 : 0.4, ease: "easeOut" }}
                className={cn(
                  "relative pb-1 md:pr-4",
                  idx < snapshotMilestones.length - 1
                    ? "lg:border-r lg:border-[color:var(--color-border-light-soft)]"
                    : "",
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
                  {SNAPSHOT_PREVIEWS[milestone.year] ?? milestone.description}
                </p>
              </motion.article>
            ))}
          </div>
        </motion.div>

        <motion.div
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, amount: 0.2 }}
          variants={revealUp}
          transition={{ duration: reduceMotion ? 0 : 0.4, ease: "easeOut" }}
          className="mt-10 flex justify-start lg:justify-end"
        >
          <Link
            href="/company/our-history"
            className={cn(
              "group inline-flex items-center gap-2 rounded-lg text-sm font-semibold text-[color:var(--color-menu-accent)] transition-colors hover:text-[color:var(--color-ssp-ink-800)]",
              FOCUS_RING_LIGHT,
            )}
          >
            Explore Full Timeline
            <span aria-hidden className="transition-transform group-hover:translate-x-0.5">
              &rarr;
            </span>
          </Link>
        </motion.div>
      </Container>
    </section>
  );
}
