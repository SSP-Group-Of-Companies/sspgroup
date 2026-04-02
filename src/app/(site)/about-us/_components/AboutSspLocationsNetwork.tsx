"use client";

import Image from "next/image";
import { motion, useReducedMotion, type Variants } from "framer-motion";
import { Container } from "@/app/(site)/components/layout/Container";
import { SectionSignalEyebrow } from "@/app/(site)/components/ui/SectionSignalEyebrow";
import type { LocationsNetworkContent } from "@/config/company";

const MIDNIGHT_SURFACE =
  "linear-gradient(180deg, var(--color-company-hero-midnight-start) 0%, var(--color-company-ink) 52%, var(--color-company-hero-midnight-end) 100%)";

export function AboutSspLocationsNetwork({ data }: { data: LocationsNetworkContent }) {
  const reduceMotion = useReducedMotion() ?? false;

  const revealUp: Variants = reduceMotion
    ? { hidden: { opacity: 1, y: 0 }, show: { opacity: 1, y: 0 } }
    : { hidden: { opacity: 1, y: 10 }, show: { opacity: 1, y: 0 } };

  const stagger: Variants = reduceMotion
    ? { hidden: { opacity: 1 }, show: { opacity: 1 } }
    : { hidden: {}, show: { transition: { staggerChildren: 0.06, delayChildren: 0.05 } } };

  return (
    <section
      id="locations-network"
      aria-labelledby="about-locations-network-heading"
      className="relative scroll-mt-24 overflow-hidden border-b border-white/6 py-18 sm:py-20 lg:py-22"
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
          className="grid items-center gap-9 xl:grid-cols-[minmax(280px,0.8fr)_minmax(0,1.2fr)] xl:gap-8"
        >
          <motion.div
            variants={revealUp}
            transition={{ duration: reduceMotion ? 0 : 0.38, ease: "easeOut" }}
            className="relative z-10"
          >
            <SectionSignalEyebrow label={data.sectionLabel} light />
            <h2
              id="about-locations-network-heading"
              className="mt-3.5 max-w-[28rem] text-pretty text-[2.04rem] font-bold leading-[1.03] tracking-[-0.028em] text-white sm:text-[2.38rem] lg:text-[2.62rem]"
            >
              {data.title}
            </h2>
            <p className="mt-4 max-w-[31rem] text-pretty text-[14.8px] leading-[1.78] text-white/[0.6] sm:text-[15.35px] sm:leading-[1.8]">
              {data.subtitle}
            </p>

            <div className="relative mt-9 pb-6 lg:mt-10">
              <p className="text-[clamp(3.45rem,6.6vw,4.55rem)] font-semibold leading-[0.82] tracking-[-0.065em] text-white">
                {data.officeCount}
              </p>
              <p className="mt-1.5 text-[0.98rem] font-semibold tracking-tight text-white/94">{data.officeLabel}</p>
              <p className="mt-2 max-w-[22rem] text-[12.75px] leading-[1.72] text-white/[0.48]">
                Structured coverage across Canada, the United States, and Mexico under one accountable operating standard.
              </p>
              <div className="pointer-events-none absolute inset-x-0 bottom-0 h-px bg-gradient-to-r from-transparent via-white/10 to-transparent" />
              <div className="pointer-events-none absolute inset-x-[10%] bottom-0 h-px bg-gradient-to-r from-transparent via-[color:var(--color-ssp-cyan-500)]/26 to-transparent blur-[0.5px]" />
            </div>

            <div className="mt-7 lg:mt-8">
              <p className="text-[10px] font-semibold tracking-[0.22em] text-white/[0.36] uppercase">{data.benefitsTitle}</p>
              <ul className="mt-4 grid gap-x-8 gap-y-0 sm:grid-cols-2">
                {data.benefits.map((benefit) => (
                  <li
                    key={benefit}
                    className="flex items-start gap-2.5 border-t border-white/[0.055] py-3 text-[12.9px] leading-[1.68] text-white/[0.58]"
                  >
                    <span className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-white/72 shadow-[0_0_14px_rgba(255,255,255,0.16)]" />
                    <span>{benefit}</span>
                  </li>
                ))}
              </ul>
            </div>
          </motion.div>

          <motion.div
            variants={revealUp}
            transition={{ duration: reduceMotion ? 0 : 0.42, ease: "easeOut" }}
            className="relative min-w-0"
          >
            <div className="relative mx-auto max-w-[68rem] xl:-ml-10">
              <div className="relative aspect-[16/12] sm:aspect-[16/11] lg:aspect-[1.1] xl:aspect-[1.14]">
                <Image
                  src={data.map.src}
                  alt={data.map.alt}
                  fill
                  sizes="(max-width: 1024px) 100vw, 64vw"
                  className="object-contain object-center drop-shadow-[0_32px_124px_rgba(2,6,23,0.96)]"
                />
              </div>
            </div>
          </motion.div>
        </motion.div>
      </Container>
    </section>
  );
}
