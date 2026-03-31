"use client";

import { motion, useReducedMotion, type Variants } from "framer-motion";
import { Container } from "@/app/(site)/components/layout/Container";
import { Section } from "@/app/(site)/components/layout/Section";
import type { MissionVisionContent } from "@/config/company";
import { cn } from "@/lib/cn";

export function MissionVisionPrinciples({ data }: { data: MissionVisionContent }) {
  const reduceMotion = useReducedMotion();

  const fadeUp: Variants = reduceMotion
    ? { hidden: { opacity: 1, y: 0 }, show: { opacity: 1, y: 0 } }
    : {
        hidden: { opacity: 1, y: 14, scale: 0.985 },
        show: { opacity: 1, y: 0, scale: 1, transition: { duration: 0.45, ease: "easeOut" } },
      };

  const stagger: Variants = reduceMotion
    ? { hidden: { opacity: 1 }, show: { opacity: 1 } }
    : { hidden: {}, show: { transition: { staggerChildren: 0.06, delayChildren: 0.04 } } };

  return (
    <Section
      variant="light"
      id="mission-vision"
      aria-labelledby="about-us-mvv-heading"
      className="relative scroll-mt-24 overflow-hidden sm:scroll-mt-28"
      style={{ backgroundColor: "var(--color-about-safety-bg)" }}
    >
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 opacity-[0.22]"
        style={{
          backgroundImage: "radial-gradient(circle, rgba(15,23,42,0.10) 1px, transparent 1px)",
          backgroundSize: "28px 28px",
        }}
      />

      <Container className="site-page-container relative">
        {/* Kicker + headline — aligned with AboutHero / WhoWeAre (bar + label + title) */}
        <motion.div
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, amount: 0.25 }}
          variants={fadeUp}
          className="max-w-3xl"
        >
          <div className="mb-3 h-[2px] w-10 bg-[color:var(--color-brand-500)] sm:w-14" />
          <p className="text-[10.5px] font-semibold tracking-[0.14em] text-[color:var(--color-subtle-light)] uppercase">
            {data.sectionLabel}
          </p>
          <h2
            id="about-us-mvv-heading"
            className="mt-2 text-[1.6rem] font-semibold leading-tight tracking-tight text-[color:var(--color-text-light)] sm:text-[1.95rem] lg:text-[2.2rem]"
          >
            {data.sectionTitle}
          </h2>
          <p className="mt-2 max-w-3xl text-sm leading-[1.75] text-[color:var(--color-muted-light)] sm:text-[15px] sm:leading-8">
            {data.sectionSubtitle}
          </p>
        </motion.div>

        <motion.div
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, amount: 0.2 }}
          variants={stagger}
          className="mt-10 grid gap-4 sm:mt-12 sm:grid-cols-2 sm:gap-5"
        >
          <motion.div
            variants={fadeUp}
            className="group relative overflow-hidden rounded-2xl p-8 transition-all duration-300 hover:-translate-y-[3px] sm:p-9 lg:p-11"
            style={{
              backgroundColor: "#1a1f2e",
              boxShadow: "0 2px 0 rgba(0,0,0,0.22), 0 20px 56px rgba(0,0,0,0.20)",
            }}
          >
            <div
              aria-hidden="true"
              className="pointer-events-none absolute inset-0 rounded-2xl"
              style={{
                background: "radial-gradient(ellipse at 15% 0%, rgba(220,38,38,0.16) 0%, transparent 55%)",
              }}
            />
            <div
              className="absolute top-0 right-0 left-0 h-[2px] rounded-t-2xl"
              style={{
                background: "linear-gradient(90deg, #ef4444 0%, rgba(220,38,38,0.15) 60%, transparent 100%)",
              }}
            />
            <div
              aria-hidden="true"
              className="pointer-events-none absolute right-6 bottom-3 select-none font-serif text-[8rem] leading-none text-white opacity-[0.05] transition-opacity duration-500 group-hover:opacity-[0.09]"
            >
              &ldquo;
            </div>

            <span className="relative inline-flex items-center gap-2 text-[10.5px] font-bold tracking-[0.15em] text-[color:var(--color-brand-500)] uppercase">
              <span className="inline-block h-[2px] w-5 rounded-full bg-[color:var(--color-brand-500)]" />
              {data.missionLabel}
            </span>
            <h3 className="relative mt-5 text-[1.35rem] font-bold leading-snug tracking-tight text-white sm:text-[1.5rem] lg:text-[1.65rem]">
              {data.missionTitle}
            </h3>
            <p className="relative mt-4 text-[14.5px] leading-[1.85] text-[rgba(255,255,255,0.60)] sm:text-[15px]">
              {data.mission}
            </p>
            <div aria-hidden="true" className="relative mt-8 flex items-center gap-3">
              <div className="h-px flex-1 bg-[rgba(255,255,255,0.08)]" />
              <div className="h-1.5 w-1.5 rounded-full bg-[color:var(--color-brand-500)] opacity-70" />
            </div>
          </motion.div>

          <motion.div
            variants={fadeUp}
            className="group relative overflow-hidden rounded-2xl bg-white p-8 transition-all duration-500 hover:-translate-y-[3px] sm:p-9 lg:p-11"
            style={{
              border: "1px solid rgba(0,0,0,0.05)",
              boxShadow: "0 2px 0 rgba(0,0,0,0.04), 0 8px 24px rgba(0,0,0,0.06), 0 20px 56px rgba(0,0,0,0.05)",
            }}
          >
            <div
              className="absolute top-0 right-0 left-0 h-[2px] rounded-t-2xl"
              style={{
                background: "linear-gradient(90deg, #ef4444 0%, rgba(220,38,38,0.15) 60%, transparent 100%)",
              }}
            />
            <div
              aria-hidden="true"
              className="pointer-events-none absolute right-6 bottom-3 select-none font-serif text-[8rem] leading-none opacity-[0.05] transition-opacity duration-500 group-hover:opacity-[0.09]"
              style={{ color: "#0f172a" }}
            >
              &ldquo;
            </div>

            <span className="relative inline-flex items-center gap-2 text-[10.5px] font-bold tracking-[0.15em] text-[color:var(--color-brand-600)] uppercase">
              <span className="inline-block h-[2px] w-5 rounded-full bg-[color:var(--color-brand-600)]" />
              {data.visionLabel}
            </span>
            <h3 className="relative mt-5 text-[1.35rem] font-bold leading-snug tracking-tight text-[color:var(--color-text-light)] sm:text-[1.5rem] lg:text-[1.65rem]">
              {data.visionTitle}
            </h3>
            <p className="relative mt-4 max-w-prose text-[14.5px] leading-[1.85] text-[color:var(--color-muted-light)] sm:text-[15px]">
              {data.vision}
            </p>
            <div aria-hidden="true" className="relative mt-8 flex items-center gap-3">
              <div className="h-px flex-1 bg-[rgba(0,0,0,0.07)]" />
              <div className="h-1.5 w-1.5 rounded-full bg-[color:var(--color-brand-500)] opacity-50" />
            </div>
          </motion.div>
        </motion.div>

        {/* Core values — editorial pillars (light-theme variant; full About uses AboutSspPage on /about-us) */}
        <motion.div
          role="region"
          aria-labelledby="about-us-mvv-values-heading"
          className="mt-14 grid grid-cols-1 sm:mt-16 lg:mt-20 lg:grid-cols-4"
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, amount: 0.12 }}
          variants={stagger}
        >
          <motion.div
            variants={fadeUp}
            className="col-span-full mb-10 max-w-3xl sm:mb-12 lg:col-span-4 lg:mb-14"
          >
            <h3
              id="about-us-mvv-values-heading"
              className="text-2xl font-bold leading-tight tracking-tight text-[color:var(--color-text-light)] text-pretty sm:text-3xl lg:text-[2rem]"
            >
              {data.valuesTitle}
            </h3>
            <p className="mt-3 max-w-3xl text-[15px] leading-8 text-[color:var(--color-muted-light)]">
              {data.valuesSubtitle}
            </p>
          </motion.div>

          {data.principles.map((principle, idx) => (
            <motion.article
              key={principle.title}
              variants={fadeUp}
              className={cn(
                "group relative flex min-h-0 flex-col pb-10 sm:pb-12 lg:pb-0",
                idx >= 1 && "max-sm:border-t max-sm:border-[color:var(--color-border-light-soft)] max-sm:pt-10",
                idx >= 2 &&
                  "sm:border-t sm:border-[color:var(--color-border-light-soft)] sm:pt-10 lg:border-t-0 lg:pt-0",
                idx >= 1 &&
                  "lg:border-l lg:border-[color:var(--color-border-light-soft)] lg:pl-8 lg:pr-4 xl:pl-10",
              )}
            >
              <span
                className="select-none font-semibold tabular-nums tracking-tight text-[2.15rem] leading-none text-[color:var(--color-brand-500)]/[0.2] transition-colors duration-300 group-hover:text-[color:var(--color-brand-500)]/30 sm:text-[2.35rem]"
                aria-hidden
              >
                {String(idx + 1).padStart(2, "0")}
              </span>
              <h4 className="mt-5 max-w-[20ch] text-[0.98rem] font-semibold leading-snug tracking-tight text-[color:var(--color-text-light)] text-pretty sm:mt-6 sm:max-w-none sm:text-[1.05rem]">
                {principle.title}
              </h4>
              <p className="mt-3 max-w-prose flex-1 text-[14px] leading-[1.82] text-[color:var(--color-muted-light)] sm:mt-4 sm:text-[15px] sm:leading-[1.78]">
                {principle.body}
              </p>
            </motion.article>
          ))}
        </motion.div>
      </Container>
    </Section>
  );
}
