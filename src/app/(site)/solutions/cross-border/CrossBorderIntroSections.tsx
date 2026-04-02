"use client";

import Image from "next/image";
import Link from "next/link";
import { motion, useReducedMotion, type Variants } from "framer-motion";
import { cn } from "@/lib/cn";
import { Container } from "@/app/(site)/components/layout/Container";
import { SectionSignalEyebrow } from "@/app/(site)/components/ui/SectionSignalEyebrow";
import { trackCtaClick } from "@/lib/analytics/cta";

const focusRingDark =
  "focus:outline-none focus-visible:ring-2 focus-visible:ring-white/40 focus-visible:ring-offset-2 focus-visible:ring-offset-[color:var(--color-ssp-ink-800)]";

type CapabilityPillar = {
  title: string;
  body: string;
};

type ProcessStep = {
  step: string;
  title: string;
  body: string;
};

type CrossBorderIntroSectionsProps = {
  capabilityPillars: readonly CapabilityPillar[];
  processSteps: readonly ProcessStep[];
};

export function CrossBorderIntroSections({
  capabilityPillars,
  processSteps,
}: CrossBorderIntroSectionsProps) {
  const reduceMotion = useReducedMotion() ?? false;

  const heroStagger: Variants = reduceMotion
    ? { hidden: { opacity: 1 }, show: { opacity: 1 } }
    : { hidden: {}, show: { transition: { staggerChildren: 0.05, delayChildren: 0.03 } } };

  const revealUp: Variants = reduceMotion
    ? { hidden: { opacity: 1, y: 0 }, show: { opacity: 1, y: 0 } }
    : { hidden: { opacity: 1, y: 10 }, show: { opacity: 1, y: 0 } };

  const cardStagger: Variants = reduceMotion
    ? { hidden: { opacity: 1 }, show: { opacity: 1 } }
    : { hidden: {}, show: { transition: { staggerChildren: 0.05, delayChildren: 0.03 } } };

  return (
    <>
      <section className="relative overflow-hidden border-b border-[color:var(--color-ssp-ink-800)]/45 bg-[linear-gradient(140deg,var(--color-ssp-ink-800),var(--color-cb-hero-ink)_48%,var(--color-utility-bg))] py-24 sm:py-32">
        <div className="pointer-events-none absolute inset-0" aria-hidden>
          <Image
            src="/_optimized/solutions/cross-border-hero.png"
            alt=""
            fill
            priority
            sizes="100vw"
            className="object-cover object-center"
          />
          <div className="absolute inset-0 bg-[linear-gradient(90deg,rgba(8,42,66,0.82)_0%,rgba(11,79,120,0.66)_45%,rgba(9,113,170,0.42)_100%)]" />
          <div className="absolute inset-0 bg-[linear-gradient(180deg,rgba(7,17,26,0.18)_0%,rgba(7,17,26,0.52)_100%)]" />
          <div className="absolute top-[-120px] right-[-130px] h-[320px] w-[320px] rounded-full bg-[color:var(--color-ssp-cyan-500)]/26 blur-[115px]" />
          <div className="absolute bottom-[-140px] left-[-130px] h-[340px] w-[340px] rounded-full bg-[color:var(--color-brand-600)]/10 blur-[120px]" />
        </div>

        <Container className="site-page-container relative">
          <motion.div initial="hidden" animate="show" variants={heroStagger}>
            <motion.div
              variants={revealUp}
              transition={{ duration: reduceMotion ? 0 : 0.38, ease: "easeOut" }}
            >
              <SectionSignalEyebrow label="Cross-Border Freight" light />
            </motion.div>

            <motion.h1
              variants={revealUp}
              transition={{ duration: reduceMotion ? 0 : 0.38, ease: "easeOut" }}
              className="mt-5 max-w-4xl text-3xl leading-[1.15] font-semibold tracking-tight text-white sm:text-4xl md:text-[52px] md:leading-[1.12]"
            >
              North American cross-border freight,
              <br className="hidden md:block" />
              <span className="md:ml-0"> moved with discipline.</span>
            </motion.h1>

            <motion.div
              variants={revealUp}
              transition={{ duration: reduceMotion ? 0 : 0.45, ease: "easeOut" }}
              className="mt-7 max-w-3xl"
            >
              <p className="max-w-[64ch] text-[15px] leading-[1.85] text-white/80 sm:text-base">
                SSP supports manufacturers, distributors, and procurement teams across Canada, the
                U.S., and Mexico with structured documentation control, customs-aligned
                coordination, and milestone-level visibility. The goal is fewer preventable delays,
                stronger schedule protection, and greater confidence across cross-border programs.
              </p>
            </motion.div>

            <motion.div
              variants={revealUp}
              transition={{ duration: reduceMotion ? 0 : 0.42, ease: "easeOut" }}
              className="mt-10 flex flex-wrap gap-3.5"
            >
              <Link
                href="/contact"
                data-cta-id="cb_hub_hero_contact"
                onClick={() =>
                  trackCtaClick({
                    ctaId: "cb_hub_hero_contact",
                    location: "cross_border_hub_hero",
                    destination: "/contact",
                    label: "Discuss Your Requirements",
                  })
                }
                className={cn("inline-flex h-12 items-center rounded-lg bg-[color:var(--color-ssp-cyan-500)] px-6 text-sm font-semibold text-white shadow-[0_6px_20px_rgba(16,167,216,0.35)] transition hover:bg-[color:var(--color-ssp-cyan-600)] hover:shadow-[0_10px_28px_rgba(16,167,216,0.45)]", focusRingDark)}
              >
                Discuss Your Requirements
              </Link>
              <Link
                href="#corridors"
                data-cta-id="cb_hub_hero_corridors"
                onClick={() =>
                  trackCtaClick({
                    ctaId: "cb_hub_hero_corridors",
                    location: "cross_border_hub_hero",
                    destination: "#corridors",
                    label: "Explore Corridors",
                  })
                }
                className={cn("inline-flex h-12 items-center rounded-lg border border-white/22 px-6 text-sm font-medium text-white/75 transition hover:border-white/40 hover:bg-white/10 hover:text-white", focusRingDark)}
              >
                Explore Corridors
              </Link>
            </motion.div>
          </motion.div>
        </Container>
      </section>

      <section className="bg-[color:var(--color-surface-2)] py-20 sm:py-24">
        <Container className="site-page-container">
          <div className="grid gap-8 lg:grid-cols-12 lg:items-start">
            <motion.div
              className="lg:col-span-4 lg:pr-6"
              initial="hidden"
              whileInView="show"
              viewport={{ once: true, amount: 0.15 }}
              variants={revealUp}
              transition={{ duration: reduceMotion ? 0 : 0.45, ease: "easeOut" }}
            >
              <SectionSignalEyebrow label="Why SSP" />
              <h2 className="mt-3 text-3xl leading-tight font-semibold text-[color:var(--color-text)]">
                Freight control built for cross-border complexity.
              </h2>
              <p className="mt-4 text-[15px] leading-8 text-[color:var(--color-muted)]">
                The disciplines that separate structured cross-border execution from standard carrier
                service, and give procurement teams the governance they need.
              </p>
            </motion.div>

            <motion.div
              className="grid gap-4 md:grid-cols-2 lg:col-span-8"
              initial="hidden"
              whileInView="show"
              viewport={{ once: true, amount: 0.2 }}
              variants={cardStagger}
            >
              {capabilityPillars.map((pillar, index) => (
                <motion.article
                  key={pillar.title}
                  variants={revealUp}
                  transition={{ duration: reduceMotion ? 0 : 0.4, ease: "easeOut" }}
                  className="relative overflow-hidden rounded-2xl border border-[color:var(--color-border-light)] bg-white px-6 py-7 shadow-[0_8px_20px_rgba(2,6,23,0.05)] transition-all duration-300 motion-safe:hover:-translate-y-1 hover:shadow-[0_16px_32px_rgba(2,6,23,0.10)]"
                >
                  <div
                    aria-hidden
                    className="pointer-events-none absolute inset-x-0 top-0 h-1 bg-[linear-gradient(90deg,var(--color-ssp-cyan-500),var(--color-utility-bg))]"
                  />
                  <span className="inline-flex h-7 items-center rounded-md bg-[color:var(--color-menu-accent)]/10 px-2.5 text-[11px] font-semibold tracking-[0.08em] text-[color:var(--color-menu-accent)] uppercase">
                    0{index + 1}
                  </span>
                  <h3 className="mt-4 text-[18px] leading-snug font-semibold text-[color:var(--color-text)]">
                    {pillar.title}
                  </h3>
                  <p className="mt-3 text-sm leading-7 text-[color:var(--color-muted)]">
                    {pillar.body}
                  </p>
                </motion.article>
              ))}
            </motion.div>
          </div>
        </Container>
      </section>

      <section className="border-y border-[color:var(--color-menu-border)] bg-[linear-gradient(180deg,#ffffff,#f4f8fc)] py-20 sm:py-24">
        <Container className="site-page-container">
          <motion.div
            className="mx-auto max-w-3xl text-center"
            initial="hidden"
            whileInView="show"
            viewport={{ once: true, amount: 0.15 }}
            variants={revealUp}
            transition={{ duration: reduceMotion ? 0 : 0.45, ease: "easeOut" }}
          >
            <div className="flex justify-center">
              <SectionSignalEyebrow label="Operating Model" />
            </div>
            <h2 className="mt-4 text-3xl leading-tight font-semibold text-[color:var(--color-menu-title)] sm:text-4xl">
              How we manage cross-border freight from first mile to final delivery.
            </h2>
            <p className="mt-4 text-[15px] leading-8 text-[color:var(--color-menu-muted)]">
              Every cross-border shipment follows a four-stage framework: qualifying the lane,
              validating documentation, executing the border transfer, and governing performance
              over time.
            </p>
          </motion.div>

          <motion.div
            className="relative mt-11"
            initial="hidden"
            whileInView="show"
            viewport={{ once: true, amount: 0.2 }}
            variants={cardStagger}
          >
            <div
              aria-hidden
              className="absolute top-5 right-12 left-12 hidden h-px bg-[linear-gradient(90deg,var(--color-ssp-cyan-500)/0.22,var(--color-utility-bg)/0.45,var(--color-ssp-cyan-500)/0.22)] xl:block"
            />
            <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-4">
              {processSteps.map((step) => (
                <motion.article
                  key={step.step}
                  variants={revealUp}
                  transition={{ duration: reduceMotion ? 0 : 0.4, ease: "easeOut" }}
                  className="group relative overflow-hidden rounded-2xl border border-[color:var(--color-menu-border)]/90 bg-white/92 px-4 py-6 shadow-[0_10px_24px_rgba(2,6,23,0.06)] transition-all duration-300 motion-safe:hover:-translate-y-1 hover:shadow-[0_18px_30px_rgba(2,6,23,0.12)] sm:px-5 sm:py-7"
                >
                  <div className="inline-flex h-7 items-center rounded-md border border-[color:var(--color-cb-hero-ink)]/18 bg-[color:var(--color-cb-hero-ink)]/8 px-2.5 text-[11px] font-semibold tracking-[0.08em] text-[color:var(--color-cb-hero-ink)] uppercase">
                    Step {step.step}
                  </div>
                  <h3 className="mt-4 text-[20px] leading-snug font-semibold text-[color:var(--color-menu-title)]">
                    {step.title}
                  </h3>
                  <p className="mt-3 text-sm leading-7 text-[color:var(--color-menu-muted)]">
                    {step.body}
                  </p>
                </motion.article>
              ))}
            </div>
          </motion.div>
        </Container>
      </section>
    </>
  );
}

