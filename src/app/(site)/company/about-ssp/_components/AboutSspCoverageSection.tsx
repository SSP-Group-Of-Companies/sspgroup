"use client";

import Image from "next/image";
import { motion, useReducedMotion, type Variants } from "framer-motion";
import { Container } from "@/app/(site)/components/layout/Container";
import { SectionSignalEyebrow } from "@/app/(site)/components/ui/SectionSignalEyebrow";
import type { LocationsNetworkContent } from "@/config/company";
import { AboutSspSectionCta } from "./AboutSspSectionCta";

export function AboutSspCoverageSection({ data }: { data: LocationsNetworkContent }) {
  const reduceMotion = useReducedMotion();

  const revealUp: Variants = reduceMotion
    ? { hidden: { opacity: 1, y: 0 }, show: { opacity: 1, y: 0 } }
    : { hidden: { opacity: 0, y: 18 }, show: { opacity: 1, y: 0 } };

  const stagger: Variants = reduceMotion
    ? { hidden: { opacity: 1 }, show: { opacity: 1 } }
    : { hidden: {}, show: { transition: { staggerChildren: 0.08, delayChildren: 0.06 } } };

  return (
    <section
      id="coverage-network"
      aria-labelledby="about-coverage-heading"
      className="relative overflow-hidden scroll-mt-24 border-b border-white/6 bg-[color:var(--color-company-ink)] py-20 sm:py-24"
    >
      <Container className="site-page-container">
        <motion.div
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, amount: 0.2 }}
          variants={stagger}
        >
          <motion.div
            variants={revealUp}
            transition={{ duration: reduceMotion ? 0 : 0.35, ease: "easeOut" }}
          >
            <SectionSignalEyebrow label={data.sectionLabel} light />
          </motion.div>

          <motion.h2
            id="about-coverage-heading"
            variants={revealUp}
            transition={{ duration: reduceMotion ? 0 : 0.45, ease: "easeOut" }}
            className="mt-4 text-[2rem] font-bold tracking-tight text-white sm:text-[2.45rem]"
          >
            {data.title}
          </motion.h2>

          {data.supportingLine ? (
            <motion.p
              variants={revealUp}
              transition={{ duration: reduceMotion ? 0 : 0.4, ease: "easeOut" }}
              className="mt-3 max-w-[36rem] text-[15px] leading-[1.78] text-white/[0.62]"
            >
              {data.supportingLine}
            </motion.p>
          ) : null}

          <motion.div
            variants={revealUp}
            transition={{ duration: reduceMotion ? 0 : 0.45, ease: "easeOut" }}
            className="mt-8"
          >
            <p
              className="font-bold tracking-tighter text-[color:var(--color-brand-500)]"
              style={{ fontSize: "clamp(5rem, 12vw, 9rem)", lineHeight: 0.85 }}
            >
              {data.heroStat}
            </p>
            <p className="mt-2 text-lg font-medium tracking-tight text-white/80">{data.heroStatLabel}</p>
          </motion.div>

          {data.metrics?.length ? (
            <motion.div
              variants={revealUp}
              transition={{ duration: reduceMotion ? 0 : 0.4, ease: "easeOut" }}
              className="mt-7 flex flex-wrap gap-3"
            >
              {data.metrics.map((metric) => (
                <span
                  key={metric.label}
                  className="rounded-full border border-[color:var(--color-glass-border)] bg-[color:var(--color-glass-bg)] px-3.5 py-1.5 text-xs font-medium text-white/72"
                >
                  {metric.value} {metric.label}
                </span>
              ))}
            </motion.div>
          ) : null}
        </motion.div>

        <motion.div
          className="mt-10 grid gap-10 lg:grid-cols-2 lg:items-start"
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, amount: 0.2 }}
          variants={stagger}
        >
          <motion.div variants={revealUp} transition={{ duration: reduceMotion ? 0 : 0.42, ease: "easeOut" }}>
            <h3 className="text-2xl font-semibold tracking-tight text-white">{data.capabilitiesHeading}</h3>
            <ul className="mt-5 grid gap-y-2.5">
              {data.capabilities.map((capability) => (
                <li key={capability} className="flex items-start gap-2.5 text-[14px] leading-7 text-white/72">
                  <span className="mt-[10px] h-1.5 w-1.5 shrink-0 rounded-full bg-[color:var(--color-ssp-cyan-500)]" />
                  <span>{capability}</span>
                </li>
              ))}
            </ul>

            {data.countries?.length ? (
              <div className="mt-6 flex flex-wrap gap-2">
                {data.countries.map((country) => (
                  <span
                    key={country.name}
                    className="rounded-full border border-[color:var(--color-glass-border)] bg-[color:var(--color-glass-bg)] px-3 py-1 text-xs font-medium text-white/70"
                  >
                    {country.name}
                  </span>
                ))}
              </div>
            ) : null}
          </motion.div>

          {data.mapImage ? (
            <motion.div
              variants={revealUp}
              transition={{ duration: reduceMotion ? 0 : 0.46, ease: "easeOut" }}
              className="relative overflow-hidden rounded-2xl border border-[color:var(--color-glass-border)] bg-[color:var(--color-glass-bg)]"
            >
              <div className="relative aspect-[4/3] w-full">
                <Image
                  src={data.mapImage}
                  alt="SSP Group North American network map"
                  fill
                  className="object-contain p-4"
                  sizes="(max-width: 1024px) 100vw, 50vw"
                />
              </div>
            </motion.div>
          ) : null}
        </motion.div>

        <motion.div
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, amount: 0.4 }}
          variants={revealUp}
          transition={{ duration: reduceMotion ? 0 : 0.45, ease: "easeOut" }}
          className="mt-10"
        >
          <AboutSspSectionCta
            eyebrow="Network Engagement"
            title="Build lane coverage with one accountable operating team."
            description="From Canada to the U.S. and Mexico, we align capacity, visibility, and compliance into one coordinated execution model."
            primary={{ label: "Talk to Network Operations", href: "/contact" }}
            secondary={{ label: "Watch SSP in Action", href: "/company/media" }}
          />
        </motion.div>
      </Container>
    </section>
  );
}

