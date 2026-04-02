"use client";

import { motion, useReducedMotion, type Variants } from "framer-motion";
import { Container } from "@/app/(site)/components/layout/Container";
import { SectionSignalEyebrow } from "@/app/(site)/components/ui/SectionSignalEyebrow";
import type { OperatingModelContent } from "@/config/company";
import { cn } from "@/lib/cn";

const MIDNIGHT_SURFACE =
  "linear-gradient(180deg, var(--color-company-hero-midnight-start) 0%, var(--color-company-ink) 52%, var(--color-company-hero-midnight-end) 100%)";

/** Node centres on the shared track (four equal columns). */
const TRACK_DOT_LEFT = ["12.5%", "37.5%", "62.5%", "87.5%"] as const;

const PHASE_LABEL = "Phase";

/** Single 2px strand: horizontal fade with a slightly brighter core (one element, no stacked rails). */
const RUNWAY_BG =
  "linear-gradient(90deg, transparent 0%, rgba(255,255,255,0.05) 8%, rgba(255,255,255,0.14) 24%, rgba(255,255,255,0.3) 50%, rgba(255,255,255,0.14) 76%, rgba(255,255,255,0.05) 92%, transparent 100%)";

const LABEL_MICRO =
  "text-[10px] font-medium uppercase tracking-[0.26em] text-white/[0.34]";

const LABEL_TAG =
  "text-[10px] font-medium uppercase tracking-[0.22em] text-white/[0.36]";

/** Large phase index — specimen weight; kept subtle so the runway carries authority. */
function PhaseNumeral({ children }: { children: string }) {
  return (
    <span
      className="mt-2.5 block text-[clamp(2.45rem,3.65vw,3.5rem)] font-extralight leading-none tabular-nums tracking-[-0.045em] text-white/[0.085]"
      style={{
        WebkitTextStroke: "0.65px rgba(255,255,255,0.11)",
        textShadow: "0 0 36px rgba(255,255,255,0.028)",
      }}
      aria-hidden
    >
      {children}
    </span>
  );
}

export function AboutSspOperatingModel({ data }: { data: OperatingModelContent }) {
  const reduceMotion = useReducedMotion() ?? false;
  const stages = data.stages;

  const revealUp: Variants = reduceMotion
    ? { hidden: { opacity: 1, y: 0 }, show: { opacity: 1, y: 0 } }
    : { hidden: { opacity: 1, y: 10 }, show: { opacity: 1, y: 0 } };

  const stagger: Variants = reduceMotion
    ? { hidden: { opacity: 1 }, show: { opacity: 1 } }
    : { hidden: {}, show: { transition: { staggerChildren: 0.05, delayChildren: 0.03 } } };

  const gridGap = "gap-x-8 xl:gap-x-12 2xl:gap-x-[3.25rem]";

  return (
    <section
      id="operating-model"
      aria-labelledby="operating-model-heading"
      className="relative scroll-mt-24 overflow-hidden border-b border-white/6 py-[5.25rem] sm:py-24 lg:py-[6.75rem]"
      style={{ background: MIDNIGHT_SURFACE }}
    >
      <div className="pointer-events-none absolute inset-0" aria-hidden>
        <div
          className="absolute inset-x-0 top-0 h-24"
          style={{ background: "linear-gradient(180deg, rgba(238,242,246,0.36) 0%, rgba(255,255,255,0.03) 50%, transparent 100%)" }}
        />
        <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-[color:var(--color-ssp-cyan-500)]/48 to-transparent" />
        <div
          className="absolute -left-20 top-[20%] h-[240px] w-[240px] rounded-full bg-[color:var(--color-ssp-cyan-500)]/5 blur-[118px]"
        />
        <div
          className="absolute -right-24 bottom-[16%] h-[300px] w-[300px] rounded-full bg-[color:var(--color-brand-500)]/5 blur-[132px]"
        />
        <div
          className="absolute inset-0 opacity-[0.016]"
          style={{
            backgroundImage:
              "linear-gradient(to right, rgba(255,255,255,0.065) 1px, transparent 1px), linear-gradient(to bottom, rgba(255,255,255,0.065) 1px, transparent 1px)",
            backgroundSize: "92px 92px",
          }}
        />
      </div>

      <Container className="site-page-container relative">
        <motion.div
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, amount: 0.2 }}
          variants={stagger}
        >
          <motion.div variants={revealUp} transition={{ duration: reduceMotion ? 0 : 0.35, ease: "easeOut" }}>
            <SectionSignalEyebrow label={data.sectionLabel} light />
          </motion.div>
          <motion.h2
            id="operating-model-heading"
            variants={revealUp}
            transition={{ duration: reduceMotion ? 0 : 0.38, ease: "easeOut" }}
            className="mt-3.5 max-w-[38rem] text-pretty text-[2.15rem] font-bold leading-[1.05] tracking-[-0.025em] text-white sm:text-4xl lg:text-[2.62rem]"
          >
            {data.title}
          </motion.h2>
          <motion.p
            variants={revealUp}
            transition={{ duration: reduceMotion ? 0 : 0.35, ease: "easeOut" }}
            className="mt-4 max-w-[34rem] text-pretty text-[15px] leading-[1.75] text-white/[0.62] sm:text-[15.5px] sm:leading-[1.76]"
          >
            {data.subtitle}
          </motion.p>

          <motion.div
            variants={revealUp}
            transition={{ duration: reduceMotion ? 0 : 0.35, ease: [0.22, 1, 0.36, 1] }}
            className="mt-16 lg:mt-[5.25rem]"
          >
            <div
              role="region"
              aria-label="Operating sequence from plan through close"
              className="hidden lg:block"
            >
              <div className={cn("grid grid-cols-4", gridGap)}>
                {stages.map((stage) => (
                  <div key={`upper-${stage.number}`} className="flex min-w-0 flex-col items-start text-left">
                    <span className={LABEL_MICRO}>{PHASE_LABEL}</span>
                    <span className="sr-only">{stage.number}</span>
                    <PhaseNumeral>{stage.number}</PhaseNumeral>
                  </div>
                ))}
              </div>

              {/* Runway: one element, stacked gradients — stronger spine, no double-line DOM. */}
              <div className="relative mx-0 my-[3.25rem] min-h-[4rem] xl:my-[3.75rem]">
                <div
                  className="pointer-events-none absolute left-0 right-0 top-1/2 z-0 h-[2px] -translate-y-1/2 rounded-[1px]"
                  style={{ background: RUNWAY_BG }}
                  aria-hidden
                />
                {stages.map((stage, i) => (
                  <div
                    key={`dot-${stage.number}`}
                    className="absolute top-1/2 z-10 flex -translate-x-1/2 -translate-y-1/2 flex-col items-center"
                    style={{ left: TRACK_DOT_LEFT[i] }}
                    aria-hidden
                  >
                    <span
                      className="h-[9px] w-[9px] rounded-full bg-white"
                      style={{
                        boxShadow:
                          "inset 0 1px 0 rgba(255,255,255,0.95), 0 0 0 5px var(--color-company-ink), 0 0 0 6px rgba(255,255,255,0.06)",
                      }}
                    />
                  </div>
                ))}
              </div>

              <div className={cn("grid grid-cols-4", gridGap, "mt-0.5")}>
                {stages.map((stage) => (
                  <article
                    key={`lower-${stage.number}`}
                    className="flex min-w-0 flex-col items-start border-t border-white/[0.075] pt-10 text-left xl:pt-[2.65rem]"
                  >
                    <span className={LABEL_TAG}>{stage.tag}</span>
                    <h3 className="mt-2 text-[1.0625rem] font-semibold tracking-[-0.022em] text-white xl:text-[1.125rem]">
                      {stage.title}
                    </h3>
                    <p className="mt-3.5 max-w-[17.25rem] text-pretty text-[13px] leading-[1.7] text-white/[0.52] xl:max-w-[17.75rem] xl:text-[13.25px] xl:leading-[1.74]">
                      {stage.body}
                    </p>
                  </article>
                ))}
              </div>
            </div>

            <div role="region" aria-label="Operating sequence from plan through close" className="lg:hidden">
              <ol className="relative list-none">
                {stages.map((stage, i) => (
                  <li key={stage.number} className="relative flex gap-4 sm:gap-6">
                    <div className="relative flex w-12 shrink-0 flex-col items-center sm:w-14">
                      <div
                        className="relative z-10 flex h-11 w-11 items-center justify-center rounded-full border border-white/20 bg-white/[0.045] text-[10px] font-semibold tabular-nums text-white sm:h-12 sm:w-12 sm:text-[11px]"
                        style={{
                          boxShadow: "inset 0 1px 0 rgba(255,255,255,0.08)",
                        }}
                      >
                        {stage.number}
                      </div>
                      {i < stages.length - 1 ? (
                        <div
                          className="absolute left-1/2 top-11 bottom-0 mt-2 w-px -translate-x-1/2 sm:top-12"
                          style={{
                            background:
                              "linear-gradient(180deg, rgba(255,255,255,0.18) 0%, rgba(255,255,255,0.06) 72%, transparent 100%)",
                          }}
                          aria-hidden
                        />
                      ) : null}
                    </div>

                    <div
                      className={cn(
                        "min-w-0 flex-1 pb-10 sm:pb-11",
                        i < stages.length - 1 && "border-b border-white/[0.06]",
                      )}
                    >
                      <span className={LABEL_MICRO}>{PHASE_LABEL}</span>
                      <span className={cn(LABEL_TAG, "mt-1.5 block")}>
                        {stage.tag}
                      </span>
                      <h3 className="mt-2 text-lg font-semibold tracking-[-0.022em] text-white sm:text-xl">
                        {stage.title}
                      </h3>
                      <p className="mt-3 text-pretty text-[14px] leading-[1.72] text-white/[0.55] sm:text-[15px] sm:leading-[1.76]">
                        {stage.body}
                      </p>
                    </div>
                  </li>
                ))}
              </ol>
            </div>
          </motion.div>
        </motion.div>
      </Container>
    </section>
  );
}
