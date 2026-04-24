"use client";

import Link from "next/link";
import { motion, type Variants } from "framer-motion";
import { ChevronLeft } from "lucide-react";

import { cn } from "@/lib/cn";
import { Container } from "@/app/(site)/components/layout/Container";
import { SectionSignalEyebrow } from "@/app/(site)/components/ui/SectionSignalEyebrow";
import { FOCUS_RING_DARK, NOISE_BG } from "@/app/(site)/company/faqs/_components/faqStyles";

import { LEGAL_HERO_CHIP, LEGAL_HERO_GRID_STYLE, LEGAL_HERO_SURFACE } from "./legalStyles";

export type LegalHeroProps = {
  reduceMotion: boolean;
  sectionLabelledBy: string;
  eyebrow: string;
  title: string;
  description: string;
  lastUpdated: string;
  lastUpdatedIso: string;
  /** Optional back-link target; defaults to Home. */
  backHref?: string;
  backLabel?: string;
};

/**
 * Shared hero for the legal/policy document pages. Dark SSP surface with
 * a muted grid motif — deliberately quieter than the marketing heroes so
 * the page reads as a serious reference document.
 */
export function LegalHero({
  reduceMotion,
  sectionLabelledBy,
  eyebrow,
  title,
  description,
  lastUpdated,
  lastUpdatedIso,
  backHref = "/",
  backLabel = "Home",
}: LegalHeroProps) {
  const stagger: Variants = reduceMotion
    ? { hidden: { opacity: 1 }, show: { opacity: 1 } }
    : { hidden: {}, show: { transition: { staggerChildren: 0.05, delayChildren: 0.03 } } };

  const reveal: Variants = reduceMotion
    ? { hidden: { opacity: 1, y: 0 }, show: { opacity: 1, y: 0 } }
    : { hidden: { opacity: 1, y: 10 }, show: { opacity: 1, y: 0 } };

  return (
    <section
      aria-labelledby={sectionLabelledBy}
      className="relative overflow-hidden border-b border-white/10 py-16 sm:py-20 lg:py-22"
      style={{ background: LEGAL_HERO_SURFACE }}
    >
      <div className="pointer-events-none absolute inset-0" aria-hidden>
        <div className="absolute inset-0 bg-[radial-gradient(58%_58%_at_86%_38%,var(--color-faq-hero-glow-primary),var(--color-faq-hero-glow-primary-soft)_54%,transparent_100%)]" />
        <div className="absolute inset-0 bg-[radial-gradient(46%_48%_at_12%_96%,var(--color-faq-hero-glow-secondary),transparent_72%)]" />
      </div>

      <div
        className="pointer-events-none absolute inset-0 opacity-[0.28]"
        style={LEGAL_HERO_GRID_STYLE}
        aria-hidden
      />

      <div
        className="pointer-events-none absolute inset-0 opacity-[0.03]"
        style={{ backgroundImage: NOISE_BG }}
        aria-hidden
      />

      <div
        className="pointer-events-none absolute inset-x-0 top-0 h-px"
        style={{
          background:
            "linear-gradient(90deg, transparent 5%, color-mix(in srgb, var(--color-ssp-cyan-500) 45%, transparent) 50%, transparent 95%)",
        }}
        aria-hidden
      />

      <Container className="site-page-container relative">
        <motion.div
          initial="hidden"
          animate="show"
          variants={stagger}
          className="relative z-10 max-w-[48rem]"
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

          <motion.div
            variants={reveal}
            transition={{ duration: reduceMotion ? 0 : 0.34, ease: "easeOut" }}
          >
            <SectionSignalEyebrow label={eyebrow} light />
          </motion.div>

          <motion.h1
            id={sectionLabelledBy}
            variants={reveal}
            transition={{ duration: reduceMotion ? 0 : 0.38, ease: "easeOut" }}
            className="mt-4 max-w-[28ch] text-balance text-[2rem] font-bold leading-[1.06] tracking-tight text-white sm:max-w-[34ch] sm:text-[2.4rem] lg:max-w-[36ch] lg:text-[2.75rem]"
          >
            {title}
          </motion.h1>

          <motion.p
            variants={reveal}
            transition={{ duration: reduceMotion ? 0 : 0.34, ease: "easeOut" }}
            className="mt-4 max-w-[62ch] text-[14.25px] leading-[1.74] text-white/74 sm:text-[15px]"
          >
            {description}
          </motion.p>

          <motion.div
            variants={reveal}
            transition={{ duration: reduceMotion ? 0 : 0.34, ease: "easeOut" }}
            className="mt-6"
          >
            <span className={LEGAL_HERO_CHIP}>
              <span aria-hidden className="h-1.5 w-1.5 rounded-full bg-[color:var(--color-ssp-cyan-500)]" />
              Last updated{" "}
              <time dateTime={lastUpdatedIso} className="font-semibold text-white/90">
                {lastUpdated}
              </time>
            </span>
          </motion.div>
        </motion.div>
      </Container>
    </section>
  );
}
