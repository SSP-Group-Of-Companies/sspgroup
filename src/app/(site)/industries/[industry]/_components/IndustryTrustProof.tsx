"use client";

import { motion, useReducedMotion, type Variants } from "framer-motion";
import { Container } from "@/app/(site)/components/layout/Container";
import { Section } from "@/app/(site)/components/layout/Section";
import { SectionEyebrow } from "@/app/(site)/components/ui/SectionEyebrow";
import type { IndustryPageModel } from "@/config/industryPages";
import { THEME_ACCENT, THEME_PROOF_BG } from "./industryTheme";

function clampScore(value: number): number {
  return Math.max(10, Math.min(100, value));
}

function ComparisonChart({
  pillars,
  accentColor,
}: {
  pillars: IndustryPageModel["trustProof"]["pillars"];
  accentColor: string;
}) {
  const chartPillars = pillars.slice(0, 3);

  return (
    <div className="rounded-xl border border-[color:var(--color-border-light)]/60 bg-white p-4 shadow-[0_2px_12px_rgba(2,6,23,0.04)]">
      <div className="relative grid min-h-[170px] grid-cols-3 gap-4">
        <div className="pointer-events-none absolute inset-x-0 top-3 bottom-[calc(0.5rem+11px*1.35*2)]">
          {[25, 50, 75].map((mark) => (
            <div
              key={mark}
              className="absolute left-0 right-0 border-t border-[color:var(--color-border-light)]/30"
              style={{ bottom: `calc(${mark}% - 1px)` }}
              aria-hidden
            />
          ))}
        </div>

        {chartPillars.map((pillar) => (
          <div key={pillar.title} className="relative z-10 flex min-w-0 flex-col items-center">
            <div className="flex h-36 w-full items-end justify-center gap-2.5 sm:h-32">
              <div
                className="w-6 rounded-t-md sm:w-5"
                style={{
                  height: `${clampScore(pillar.industryScore)}%`,
                  backgroundColor: "#e2e8f0",
                }}
                aria-hidden
              />
              <div
                className="w-6 rounded-t-md shadow-sm sm:w-5"
                style={{
                  height: `${clampScore(pillar.sspScore)}%`,
                  backgroundColor: accentColor,
                }}
                aria-hidden
              />
            </div>
            {/* Fixed label band so 1- vs 2-line titles do not shift bar alignment */}
            <div className="mt-2 flex min-h-[calc(11px*1.35*2)] w-full items-end justify-center px-0.5">
              <p className="line-clamp-2 w-full text-center text-[11px] leading-[1.35] text-[color:var(--color-muted-light)]">
                {pillar.title}
              </p>
            </div>
          </div>
        ))}
      </div>

      <div className="mt-3 flex flex-wrap items-center gap-x-4 gap-y-2 border-t border-[color:var(--color-border-light)]/50 pt-3 text-[11px]">
        <span className="inline-flex items-center gap-1.5 text-[color:var(--color-muted-light)]">
          <span className="h-2.5 w-2.5 rounded-sm bg-[#e2e8f0]" aria-hidden />
          Typical market
        </span>
        <span className="inline-flex items-center gap-1.5 text-[color:var(--color-muted-light)]">
          <span className="h-2.5 w-2.5 rounded-sm" style={{ backgroundColor: accentColor }} aria-hidden />
          SSP standard
        </span>
      </div>
      <ul className="sr-only">
        {chartPillars.map((pillar) => (
          <li key={pillar.title}>
            {pillar.title}: Typical market score {clampScore(pillar.industryScore)}. SSP
            standard score {clampScore(pillar.sspScore)}.
          </li>
        ))}
      </ul>
    </div>
  );
}

export function IndustryTrustProof({ model }: { model: IndustryPageModel }) {
  const reduceMotion = useReducedMotion() ?? false;
  const { trustProof, hero } = model;
  const theme = hero.theme;
  const sectionBg = THEME_PROOF_BG[theme];
  const accentColor = THEME_ACCENT[theme];

  const fadeUp: Variants = reduceMotion
    ? { hidden: { opacity: 1, y: 0 }, show: { opacity: 1, y: 0 } }
    : {
        hidden: { opacity: 1, y: 10 },
        show: { opacity: 1, y: 0, transition: { duration: 0.35, ease: "easeOut" } },
      };
  const stagger: Variants = reduceMotion
    ? { hidden: { opacity: 1 }, show: { opacity: 1 } }
    : { hidden: {}, show: { transition: { staggerChildren: 0.06, delayChildren: 0.04 } } };

  const sectionHeadingId = "trust-proof-heading";

  return (
    <Section
      variant="light"
      id="trust-proof"
      aria-labelledby={sectionHeadingId}
      className="relative scroll-mt-24 overflow-hidden sm:scroll-mt-28"
      style={{ backgroundColor: sectionBg }}
    >
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 opacity-[0.035]"
        style={{
          backgroundImage: "radial-gradient(circle, rgba(15,23,42,0.10) 1px, transparent 1px)",
          backgroundSize: "24px 24px",
        }}
      />
      <Container className="site-page-container relative">
        <motion.div
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, amount: 0.15 }}
          variants={stagger}
        >
          <motion.header variants={fadeUp} className="max-w-2xl">
            <SectionEyebrow
              label="The SSP Standard"
              accentColor={accentColor}
            />
            <h2
              id={sectionHeadingId}
              className="mt-4 text-[1.6rem] font-semibold leading-tight tracking-tight text-[color:var(--color-text-light)] sm:text-[1.95rem] lg:text-[2.2rem]"
            >
              {trustProof.sectionTitle}
            </h2>
            {trustProof.intro ? (
              <p className="mt-3 text-sm leading-[1.8] text-[color:var(--color-muted-light)] sm:text-[15px]">
                {trustProof.intro}
              </p>
            ) : null}
          </motion.header>

          <motion.div variants={stagger} className="mt-8 grid gap-5 lg:grid-cols-12 lg:gap-6">
            <motion.article
              variants={fadeUp}
              className="rounded-2xl border border-[color:var(--color-border-light)]/60 bg-white p-5 shadow-[0_4px_20px_rgba(2,6,23,0.05)] lg:col-span-5"
            >
              <h3 className="text-[1rem] font-semibold tracking-tight text-[color:var(--color-text-light)] sm:text-[1.08rem]">
                {trustProof.comparisonHeading ?? "Our approach vs. typical market practice"}
              </h3>
              <div className="mt-5">
                <ComparisonChart pillars={trustProof.pillars} accentColor={accentColor} />
              </div>
            </motion.article>

            <motion.div variants={stagger} className="space-y-3 lg:col-span-7">
              {trustProof.pillars.map((pillar) => (
                <motion.article
                  key={pillar.title}
                  variants={fadeUp}
                  className="rounded-2xl border border-[color:var(--color-border-light)]/60 bg-white p-5 shadow-[0_2px_14px_rgba(2,6,23,0.04)]"
                >
                  <div className="flex items-start gap-3.5">
                    <span
                      className="inline-flex h-9 w-9 shrink-0 items-center justify-center rounded-xl text-[10px] font-bold tracking-[0.08em] text-white"
                      style={{ backgroundColor: accentColor }}
                      aria-hidden
                    >
                      {pillar.icon}
                    </span>
                    <div className="min-w-0">
                      <h4 className="text-[1rem] font-semibold tracking-tight text-[color:var(--color-text-light)]">
                        {pillar.title}
                      </h4>
                      <p className="mt-1.5 text-[13px] leading-[1.7] text-[color:var(--color-muted-light)]">
                        <span className="font-semibold text-[color:var(--color-text-light)]">
                          Typical market:{" "}
                        </span>
                        {pillar.industryBaseline}
                      </p>
                      <p className="mt-1.5 text-[13px] leading-[1.7] text-[color:var(--color-muted-light)]">
                        <span className="font-semibold" style={{ color: accentColor }}>
                          SSP:{" "}
                        </span>
                        {pillar.sspStandard}
                      </p>
                      <p className="mt-2 text-[11.5px] font-medium text-[color:var(--color-subtle-light)]">
                        Typical market score: {clampScore(pillar.industryScore)}. We standard
                        score: {clampScore(pillar.sspScore)}.
                      </p>
                      <p className="mt-2.5 rounded-lg bg-[color:var(--color-surface-0-light)]/50 px-3 py-2 text-[12.5px] leading-[1.65] text-[color:var(--color-text-light)]">
                        <span className="font-semibold">Evidence: </span>
                        {pillar.evidence}
                      </p>
                    </div>
                  </div>
                </motion.article>
              ))}
            </motion.div>
          </motion.div>

          {trustProof.evidenceNote ? (
            <motion.p
              variants={fadeUp}
              className="mt-6 max-w-3xl text-[13px] leading-[1.75] text-[color:var(--color-muted-light)] sm:text-[14px]"
            >
              {trustProof.evidenceNote}
            </motion.p>
          ) : null}
        </motion.div>
      </Container>
    </Section>
  );
}
