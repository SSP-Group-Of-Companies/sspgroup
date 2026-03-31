"use client";

import { motion, useReducedMotion, type Variants } from "framer-motion";
import { Container } from "@/app/(site)/components/layout/Container";
import { SectionSignalEyebrow } from "@/app/(site)/components/ui/SectionSignalEyebrow";
import { cn } from "@/lib/cn";
import type { MissionVisionContent } from "@/config/company";

const CARD_BASE =
  "relative h-full min-h-0 overflow-hidden rounded-2xl px-5 py-6 sm:px-7 sm:py-8 lg:px-8 lg:py-9";
const CARD_TITLE = "text-xl font-bold leading-snug tracking-tight sm:text-2xl";
const CARD_BODY = "mt-5 flex-1 text-[15px] leading-[1.82] sm:leading-[1.85]";
const LABEL_ROW =
  "text-[10.5px] font-semibold uppercase tracking-[0.18em] sm:text-[11px]";

export function AboutSspMissionValuesSection({ data }: { data: MissionVisionContent }) {
  const reduceMotion = useReducedMotion();

  const revealUp: Variants = reduceMotion
    ? { hidden: { opacity: 1, y: 0 }, show: { opacity: 1, y: 0 } }
    : { hidden: { opacity: 1, y: 10 }, show: { opacity: 1, y: 0 } };

  const stagger: Variants = reduceMotion
    ? { hidden: { opacity: 1 }, show: { opacity: 1 } }
    : { hidden: {}, show: { transition: { staggerChildren: 0.05, delayChildren: 0.03 } } };

  return (
    <section
      id="mission-vision-values"
      aria-labelledby="about-mvv-heading"
      className="relative overflow-hidden scroll-mt-24 border-b border-white/6 py-20 sm:py-24 lg:py-28"
      style={{
        background:
          "linear-gradient(180deg, var(--color-company-hero-midnight-start) 0%, var(--color-company-ink) 56%, var(--color-company-hero-midnight-end) 100%)",
      }}
    >
      <div className="pointer-events-none absolute inset-0" aria-hidden>
        <div className="absolute inset-x-0 top-0 h-20 bg-gradient-to-b from-[color:var(--color-surface-2)]/45 via-white/[0.05] to-transparent" />
        <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-[color:var(--color-ssp-cyan-500)]/60 to-transparent" />
        <div className="absolute -left-16 top-[12%] h-[220px] w-[220px] rounded-full bg-[color:var(--color-ssp-cyan-500)]/8 blur-[115px]" />
        <div className="absolute -right-20 bottom-[8%] h-[230px] w-[230px] rounded-full bg-[color:var(--color-brand-500)]/8 blur-[115px]" />
      </div>

      <Container className="site-page-container relative">
        {/* Section intro — same scale rhythm as AboutSspOperatingModel */}
        <motion.div
          className="max-w-3xl"
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, amount: 0.15 }}
          variants={stagger}
        >
          <motion.div variants={revealUp} transition={{ duration: reduceMotion ? 0 : 0.35, ease: "easeOut" }}>
            <SectionSignalEyebrow label={data.sectionLabel} light />
          </motion.div>
          <motion.h2
            id="about-mvv-heading"
            variants={revealUp}
            transition={{ duration: reduceMotion ? 0 : 0.35, ease: "easeOut" }}
            className="mt-4 text-3xl leading-tight font-bold tracking-tight text-white text-pretty sm:text-4xl lg:text-[2.75rem]"
          >
            {data.sectionTitle}
          </motion.h2>
          <motion.p
            variants={revealUp}
            transition={{ duration: reduceMotion ? 0 : 0.35, ease: "easeOut" }}
            className="mt-3 max-w-3xl text-[15px] leading-8 text-white/76"
          >
            {data.sectionSubtitle}
          </motion.p>
        </motion.div>

        {/* Mission + Vision */}
        <motion.div
          className="mt-10 grid grid-cols-1 gap-5 sm:mt-12 sm:gap-6 lg:grid-cols-12 lg:items-stretch"
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, amount: 0.2 }}
          variants={stagger}
        >
          <motion.article
            variants={revealUp}
            transition={{ duration: reduceMotion ? 0 : 0.35, ease: "easeOut" }}
            className={cn(
              CARD_BASE,
              "flex flex-col border border-white/14 bg-[linear-gradient(145deg,rgba(255,255,255,0.08),rgba(255,255,255,0.02))] shadow-[var(--shadow-glass-card)] lg:col-span-7",
            )}
          >
            <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-[color:var(--color-brand-500)]/65 via-white/20 to-transparent" />
            <div className="pointer-events-none absolute -right-8 -top-10 h-24 w-24 rounded-full bg-[color:var(--color-brand-500)]/20 blur-2xl" />
            <p className={cn(LABEL_ROW, "text-[color:var(--color-brand-500)]")}>{data.missionLabel}</p>
            <h3 className={cn(CARD_TITLE, "mt-3 max-w-[22ch] text-white text-pretty sm:max-w-none")}>
              {data.missionTitle}
            </h3>
            <p className={cn(CARD_BODY, "text-white/72")}>{data.mission}</p>
          </motion.article>

          <motion.article
            variants={revealUp}
            transition={{ duration: reduceMotion ? 0 : 0.35, ease: "easeOut" }}
            className={cn(
              CARD_BASE,
              "flex flex-col border border-white/30 bg-white shadow-[0_20px_44px_rgba(2,6,23,0.28)] lg:col-span-5",
            )}
          >
            <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-[color:var(--color-ssp-cyan-500)]/62 via-[color:var(--color-ssp-cyan-500)]/18 to-transparent" />
            <p className={cn(LABEL_ROW, "text-[color:var(--color-brand-600)]")}>{data.visionLabel}</p>
            <h3
              className={cn(
                CARD_TITLE,
                "mt-3 max-w-[24ch] text-[color:var(--color-ssp-ink-800)] text-pretty sm:max-w-none",
              )}
            >
              {data.visionTitle}
            </h3>
            <p className={cn(CARD_BODY, "text-[color:var(--color-ssp-ink-800)]/78")}>{data.vision}</p>
          </motion.article>
        </motion.div>

        {/* Core values — editorial pillars (no card chrome; dividers + type hierarchy) */}
        <motion.div
          role="region"
          aria-labelledby="about-mvv-values-heading"
          className="mt-14 grid grid-cols-1 sm:mt-16 sm:grid-cols-2 lg:mt-20 lg:grid-cols-4"
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, amount: 0.12 }}
          variants={stagger}
        >
          <motion.div
            variants={revealUp}
            transition={{ duration: reduceMotion ? 0 : 0.35, ease: "easeOut" }}
            className="col-span-full mb-10 max-w-3xl sm:mb-12 lg:col-span-4 lg:mb-14"
          >
            <h3
              id="about-mvv-values-heading"
              className="text-2xl font-bold leading-tight tracking-tight text-white text-pretty sm:text-3xl lg:text-[2rem]"
            >
              {data.valuesTitle}
            </h3>
            <p className="mt-3 max-w-3xl text-[15px] leading-8 text-white/68">{data.valuesSubtitle}</p>
          </motion.div>

          {data.principles.map((principle, idx) => (
            <motion.article
              key={principle.title}
              variants={revealUp}
              transition={{ duration: reduceMotion ? 0 : 0.38, ease: "easeOut" }}
              className={cn(
                "group relative flex min-h-0 flex-col pb-10 sm:pb-12 lg:pb-0",
                /* Mobile stack: hairline between pillars */
                idx >= 1 && "max-sm:border-t max-sm:border-white/[0.08] max-sm:pt-10",
                /* sm 2×2: rule above row 2 only (not between side-by-side items) */
                idx >= 2 && "sm:border-t sm:border-white/[0.08] sm:pt-10 lg:border-t-0 lg:pt-0",
                /* lg 4-col: vertical rules only */
                idx >= 1 && "lg:border-l lg:border-white/[0.08] lg:pl-8 lg:pr-4 xl:pl-10",
              )}
            >
              <span
                className="select-none font-semibold tabular-nums tracking-tight text-[2.15rem] leading-none text-white/[0.14] transition-colors duration-300 group-hover:text-white/[0.22] sm:text-[2.35rem]"
                aria-hidden
              >
                {String(idx + 1).padStart(2, "0")}
              </span>
              <h4 className="mt-5 max-w-[20ch] text-[0.98rem] font-semibold leading-snug tracking-tight text-white text-pretty sm:mt-6 sm:max-w-none sm:text-[1.05rem]">
                {principle.title}
              </h4>
              <p className="mt-3 max-w-prose flex-1 text-[14px] leading-[1.82] text-white/58 sm:mt-4 sm:text-[15px] sm:leading-[1.78]">
                {principle.body}
              </p>
            </motion.article>
          ))}
        </motion.div>
      </Container>
    </section>
  );
}
