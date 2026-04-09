"use client";

import Image from "next/image";
import Link from "next/link";
import { motion, useReducedMotion, type Variants } from "framer-motion";
import { Container } from "@/app/(site)/components/layout/Container";
import { SectionSignalEyebrow } from "@/app/(site)/components/ui/SectionSignalEyebrow";
import { trackCtaClick } from "@/lib/analytics/cta";
import { cn } from "@/lib/cn";
import type { SolutionTheme } from "@/config/solutionPages";

type SolutionHeroProps = {
  slug: string;
  eyebrow: string;
  title: string;
  description: string;
  descriptionMaxWidth?: string;
  primaryCta: { label: string; href: string };
  secondaryCta: { label: string; href: string };
  media?: {
    src?: string;
    alt?: string;
    objectPosition?: string;
  };
  theme: SolutionTheme;
};

const FOCUS_RING =
  "focus:outline-none focus-visible:ring-2 focus-visible:ring-white/40 focus-visible:ring-offset-2 focus-visible:ring-offset-[color:var(--color-ssp-ink-800)]";

const HERO_BACKGROUND =
  "linear-gradient(135deg, var(--color-company-hero-midnight-start) 0%, var(--color-company-ink) 56%, var(--color-company-hero-midnight-end) 100%)";

export function SolutionHero({
  slug,
  eyebrow,
  title,
  description,
  descriptionMaxWidth,
  primaryCta,
  secondaryCta,
  media,
  theme,
}: SolutionHeroProps) {
  const reduceMotion = useReducedMotion() ?? false;

  const stagger: Variants = reduceMotion
    ? { hidden: { opacity: 1 }, show: { opacity: 1 } }
    : { hidden: {}, show: { transition: { staggerChildren: 0.05, delayChildren: 0.03 } } };

  const reveal: Variants = reduceMotion
    ? { hidden: { opacity: 1, y: 0 }, show: { opacity: 1, y: 0 } }
    : { hidden: { opacity: 1, y: 12 }, show: { opacity: 1, y: 0 } };

  const headingId = `solution-${slug}-hero-heading`;
  const analyticsLocation = `solution_${slug}_hero`;

  return (
    <section
      aria-labelledby={headingId}
      className="relative overflow-hidden border-b border-white/6 py-16 sm:py-20 lg:py-24"
      style={{ background: HERO_BACKGROUND }}
    >
      <div className="pointer-events-none absolute inset-0" aria-hidden>
        {media?.src ? (
          <Image
            src={media.src}
            alt=""
            fill
            priority
            sizes="100vw"
            className="object-cover"
            style={{ objectPosition: media.objectPosition ?? "center" }}
          />
        ) : null}
        <div className="absolute inset-0" style={{ background: theme.heroOverlay }} />
        <div className="absolute inset-0" style={{ background: theme.heroGlow }} />
        <div className="absolute inset-0 bg-[linear-gradient(180deg,rgba(7,17,26,0.18)_0%,rgba(7,17,26,0.52)_100%)]" />
        <div className="absolute top-[-120px] right-[-130px] h-[320px] w-[320px] rounded-full blur-[115px]" style={{ backgroundColor: `${theme.accent}42` }} />
        <div className="absolute bottom-[-140px] left-[-130px] h-[340px] w-[340px] rounded-full bg-[color:var(--color-brand-600)]/10 blur-[120px]" />
      </div>

      <Container className="site-page-container relative">
        <motion.div initial="hidden" animate="show" variants={stagger} className="relative z-10">
          <motion.div
            variants={reveal}
            transition={{ duration: reduceMotion ? 0 : 0.35, ease: "easeOut" }}
            className="flex justify-start"
          >
            <SectionSignalEyebrow label={eyebrow} light accentColor={theme.accent} />
          </motion.div>

          <motion.h1
            id={headingId}
            variants={reveal}
            transition={{ duration: reduceMotion ? 0 : 0.36, ease: "easeOut" }}
            className="mt-5 max-w-3xl text-3xl leading-[1.15] font-semibold tracking-tight text-white sm:text-4xl md:text-[44px] md:leading-[1.14] lg:text-[52px] lg:leading-[1.12]"
          >
            {title}
          </motion.h1>

          <motion.p
            variants={reveal}
            transition={{ duration: reduceMotion ? 0 : 0.35, ease: "easeOut" }}
            className="mt-6 text-[15px] leading-[1.85] text-white/80 sm:text-base sm:leading-[1.9]"
            style={{ maxWidth: descriptionMaxWidth ?? "64ch" }}
          >
            {description}
          </motion.p>

          <motion.div
            variants={reveal}
            transition={{ duration: reduceMotion ? 0 : 0.35, ease: "easeOut" }}
            className="mt-9 flex flex-wrap gap-3.5"
          >
            <Link
              href={primaryCta.href}
              data-cta-id={`${slug}_hero_primary`}
              onClick={() =>
                trackCtaClick({
                  ctaId: `${slug}_hero_primary`,
                  location: analyticsLocation,
                  destination: primaryCta.href,
                  label: primaryCta.label,
                })
              }
              className={cn(
                "inline-flex h-12 items-center rounded-lg px-6 text-sm font-semibold text-white transition hover:bg-[var(--solution-accent-hover)] hover:shadow-[var(--solution-accent-shadow-hover)]",
                FOCUS_RING,
              )}
              style={{
                ["--solution-accent" as string]: theme.accent,
                ["--solution-accent-hover" as string]: `color-mix(in srgb, ${theme.accent} 88%, black)`,
                ["--solution-accent-shadow" as string]: `0 6px 20px color-mix(in srgb, ${theme.accent} 35%, transparent)`,
                ["--solution-accent-shadow-hover" as string]: `0 10px 28px color-mix(in srgb, ${theme.accent} 45%, transparent)`,
                backgroundColor: "var(--solution-accent)",
                boxShadow: "var(--solution-accent-shadow)",
              }}
            >
              {primaryCta.label}
            </Link>

            <Link
              href={secondaryCta.href}
              data-cta-id={`${slug}_hero_secondary`}
              onClick={() =>
                trackCtaClick({
                  ctaId: `${slug}_hero_secondary`,
                  location: analyticsLocation,
                  destination: secondaryCta.href,
                  label: secondaryCta.label,
                })
              }
              className={cn(
                "inline-flex h-12 items-center rounded-lg border border-white/22 px-6 text-sm font-medium text-white/75 transition hover:border-white/40 hover:bg-white/10 hover:text-white",
                FOCUS_RING,
              )}
            >
              {secondaryCta.label}
            </Link>
          </motion.div>
        </motion.div>
      </Container>
    </section>
  );
}
