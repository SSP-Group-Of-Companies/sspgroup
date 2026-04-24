"use client";

import Link from "next/link";
import { motion, type Variants } from "framer-motion";
import { ArrowRight, ChevronLeft } from "lucide-react";
import { cn } from "@/lib/cn";
import { Container } from "@/app/(site)/components/layout/Container";
import { SectionSignalEyebrow } from "@/app/(site)/components/ui/SectionSignalEyebrow";
import { TrackedLink } from "@/app/(site)/components/analytics/TrackedLink";
import { FOCUS_RING_DARK, NOISE_BG } from "@/app/(site)/company/faqs/_components/faqStyles";
import {
  NETWORK_HERO_SHARD_FADE_STYLE,
  NETWORK_HERO_SHARD_MASK_STYLE,
  NETWORK_HERO_SURFACE,
} from "./coverageHeroStyles";

type PrimaryCta = {
  href: string;
  label: string;
  ctaId: string;
  location: string;
};

export type NetworkCoverageHeroProps = {
  reduceMotion: boolean;
  sectionLabelledBy: string;
  backHref: string;
  backLabel: string;
  eyebrow: string;
  title: string;
  description: string;
  primaryCta?: PrimaryCta;
};

export function NetworkCoverageHero({
  reduceMotion,
  sectionLabelledBy,
  backHref,
  backLabel,
  eyebrow,
  title,
  description,
  primaryCta,
}: NetworkCoverageHeroProps) {
  const stagger: Variants = reduceMotion
    ? { hidden: { opacity: 1 }, show: { opacity: 1 } }
    : { hidden: {}, show: { transition: { staggerChildren: 0.05, delayChildren: 0.03 } } };

  const reveal: Variants = reduceMotion
    ? { hidden: { opacity: 1, y: 0 }, show: { opacity: 1, y: 0 } }
    : { hidden: { opacity: 1, y: 10 }, show: { opacity: 1, y: 0 } };

  return (
    <section
      aria-labelledby={sectionLabelledBy}
      className="relative overflow-hidden border-b border-white/10 py-18 sm:py-22 lg:py-24"
      style={{ background: NETWORK_HERO_SURFACE }}
    >
      <div className="pointer-events-none absolute inset-0" aria-hidden>
        <div className="absolute inset-0 bg-[radial-gradient(64%_66%_at_86%_42%,var(--color-network-hero-glow-cyan),var(--color-network-hero-glow-cyan-soft)_52%,transparent_100%)]" />
        <div className="absolute inset-0 bg-[radial-gradient(52%_56%_at_9%_96%,var(--color-network-hero-glow-sky),transparent_72%)]" />
        <div className="absolute inset-0 bg-[radial-gradient(44%_50%_at_66%_52%,var(--color-network-hero-glow-white),transparent_74%)]" />
      </div>

      <div
        className="pointer-events-none absolute inset-0 opacity-[0.03]"
        style={{ backgroundImage: NOISE_BG }}
        aria-hidden
      />

      <div
        className="pointer-events-none absolute inset-x-0 top-0 h-px"
        style={{
          background:
            "linear-gradient(90deg, transparent 5%, color-mix(in srgb, var(--color-network-hero-hairline-cyan) 38%, transparent) 50%, transparent 95%)",
        }}
        aria-hidden
      />

      <Container className="site-page-container relative">
        <motion.div
          initial="hidden"
          animate="show"
          variants={stagger}
          className="relative z-10 max-w-[44rem]"
        >
          <motion.div
            variants={reveal}
            transition={{ duration: reduceMotion ? 0 : 0.35, ease: "easeOut" }}
            className="mb-5"
          >
            <Link
              href={backHref}
              className={cn(
                "inline-flex items-center gap-1.5 rounded text-xs font-medium text-white/50 transition-colors hover:text-white/75",
                FOCUS_RING_DARK,
              )}
            >
              <ChevronLeft className="h-3.5 w-3.5" aria-hidden />
              {backLabel}
            </Link>
          </motion.div>

          <motion.div variants={reveal} transition={{ duration: reduceMotion ? 0 : 0.34, ease: "easeOut" }}>
            <SectionSignalEyebrow label={eyebrow} light />
          </motion.div>

          <motion.h1
            id={sectionLabelledBy}
            variants={reveal}
            transition={{ duration: reduceMotion ? 0 : 0.38, ease: "easeOut" }}
            className="mt-4 max-w-[22ch] text-balance text-[2.05rem] font-bold leading-[1.04] tracking-tight text-white sm:max-w-[30ch] sm:text-[2.45rem] lg:max-w-[32ch] lg:text-[2.92rem]"
          >
            {title}
          </motion.h1>

          <motion.p
            variants={reveal}
            transition={{ duration: reduceMotion ? 0 : 0.34, ease: "easeOut" }}
            className="mt-4 max-w-[56ch] text-[14.25px] leading-[1.74] text-white/74 sm:text-[15px]"
          >
            {description}
          </motion.p>

          {primaryCta ? (
            <motion.div
              variants={reveal}
              transition={{ duration: reduceMotion ? 0 : 0.34, ease: "easeOut" }}
              className="mt-8"
            >
              <TrackedLink
                href={primaryCta.href}
                ctaId={primaryCta.ctaId}
                location={primaryCta.location}
                label={primaryCta.label}
                className={cn(
                  "inline-flex h-11 items-center justify-center gap-2 rounded-md px-6",
                  "bg-[color:var(--color-brand-600)] text-sm font-semibold text-white",
                  "shadow-[0_8px_22px_color-mix(in_srgb,var(--color-brand-500)_20%,transparent)]",
                  "transition hover:bg-[color:var(--color-brand-700)]",
                  "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white/50 focus-visible:ring-offset-2",
                  "focus-visible:ring-offset-[color:var(--color-company-ink)]",
                )}
              >
                {primaryCta.label}
                <ArrowRight className="h-4 w-4" aria-hidden />
              </TrackedLink>
            </motion.div>
          ) : null}
        </motion.div>

        <motion.div
          initial={reduceMotion ? { opacity: 0.76 } : { opacity: 0.04, x: -34, y: 20 }}
          animate={reduceMotion ? { opacity: 0.76 } : { opacity: 0.86, x: 0, y: 0 }}
          transition={{ duration: reduceMotion ? 0 : 0.66, ease: [0.22, 1, 0.36, 1] }}
          className="pointer-events-none absolute right-[-45%] top-[-2%] h-[120%] w-[118%] sm:right-[-40%] sm:top-[-4%] sm:h-[126%] sm:w-[110%] md:right-[-31%] md:top-[-7%] md:h-[130%] md:w-[98%] lg:right-[-23%] lg:top-[-10%] lg:h-[134%] lg:w-[80%]"
          aria-hidden
          style={NETWORK_HERO_SHARD_FADE_STYLE}
        >
          <div className="h-full w-full" style={NETWORK_HERO_SHARD_MASK_STYLE} />
        </motion.div>
      </Container>
    </section>
  );
}
