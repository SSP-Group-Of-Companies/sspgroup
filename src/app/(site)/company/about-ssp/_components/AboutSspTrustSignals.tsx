"use client";

import { motion, useReducedMotion, type Variants } from "framer-motion";
import { Container } from "@/app/(site)/components/layout/Container";
import { SectionSignalEyebrow } from "@/app/(site)/components/ui/SectionSignalEyebrow";
import type { TrustSignalsContent } from "@/config/company";

export function AboutSspTrustSignals({ data }: { data: TrustSignalsContent }) {
  const reduceMotion = useReducedMotion();

  const revealUp: Variants = reduceMotion
    ? { hidden: { opacity: 1, y: 0 }, show: { opacity: 1, y: 0 } }
    : { hidden: { opacity: 1, y: 10 }, show: { opacity: 1, y: 0 } };

  const stagger: Variants = reduceMotion
    ? { hidden: { opacity: 1 }, show: { opacity: 1 } }
    : { hidden: {}, show: { transition: { staggerChildren: 0.05, delayChildren: 0.03 } } };

  return (
    <section
      id="performance-trust"
      aria-labelledby="about-trust-heading"
      className="relative overflow-hidden border-b border-white/7 py-20 sm:py-24"
      style={{
        background:
          "linear-gradient(180deg, var(--color-company-hero-midnight-end) 0%, var(--color-company-ink) 100%)",
      }}
    >
      <div className="pointer-events-none absolute inset-0" aria-hidden>
        <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-[color:var(--color-ssp-cyan-500)]/42 to-transparent" />
      </div>

      <Container className="site-page-container relative">
        <motion.div
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, amount: 0.15 }}
          variants={stagger}
          className="grid gap-10 lg:grid-cols-12"
        >
          <div className="lg:col-span-5">
            <motion.div variants={revealUp} transition={{ duration: reduceMotion ? 0 : 0.35, ease: "easeOut" }}>
              <SectionSignalEyebrow label={data.sectionLabel} light />
            </motion.div>
            <motion.h2
              id="about-trust-heading"
              variants={revealUp}
              transition={{ duration: reduceMotion ? 0 : 0.38, ease: "easeOut" }}
              className="mt-4 text-3xl font-bold leading-[1.06] tracking-tight text-white sm:text-4xl"
            >
              {data.title}
            </motion.h2>
            <motion.p
              variants={revealUp}
              transition={{ duration: reduceMotion ? 0 : 0.35, ease: "easeOut" }}
              className="mt-4 max-w-[60ch] text-[15px] leading-[1.82] text-white/72 sm:text-[16px]"
            >
              {data.subtitle}
            </motion.p>

            <motion.ul
              variants={revealUp}
              transition={{ duration: reduceMotion ? 0 : 0.35, ease: "easeOut" }}
              className="mt-6 space-y-2.5"
            >
              {data.proofPoints.map((point) => (
                <li key={point} className="text-[13.5px] leading-[1.7] text-white/70">
                  - {point}
                </li>
              ))}
            </motion.ul>
          </div>

          <motion.div variants={stagger} className="grid gap-3 sm:grid-cols-2 lg:col-span-7">
            {data.metrics.map((metric) => (
              <motion.article
                key={metric.label}
                variants={revealUp}
                transition={{ duration: reduceMotion ? 0 : 0.35, ease: "easeOut" }}
                className="rounded-2xl border border-white/12 bg-[color:var(--color-glass-bg)] px-5 py-4 shadow-[var(--shadow-glass-card)]"
              >
                <p className="text-[1.45rem] font-bold tracking-tight text-white">{metric.value}</p>
                <p className="mt-1 text-[11px] font-semibold uppercase tracking-[0.15em] text-white/42">
                  {metric.label}
                </p>
                <p className="mt-3 text-[13px] leading-[1.68] text-white/62">{metric.note}</p>
              </motion.article>
            ))}
          </motion.div>
        </motion.div>
      </Container>
    </section>
  );
}
