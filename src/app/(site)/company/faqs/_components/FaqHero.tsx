"use client";

import Link from "next/link";
import { motion, type Variants } from "framer-motion";
import { ChevronLeft } from "lucide-react";
import { cn } from "@/lib/cn";
import { Container } from "@/app/(site)/components/layout/Container";
import { SectionSignalEyebrow } from "@/app/(site)/components/ui/SectionSignalEyebrow";
import { FAQ_HERO, FAQ_PAGE_ROUTES } from "@/config/faqs";
import {
  FAQ_HERO_SHARD_FADE_STYLE,
  FAQ_HERO_SHARD_MASK_STYLE,
  FOCUS_RING_DARK,
  NOISE_BG,
} from "./faqStyles";

const FAQ_HERO_SURFACE =
  "linear-gradient(135deg, var(--color-company-hero-midnight-start) 0%, var(--color-company-ink) 48%, var(--color-company-hero-midnight-end) 100%)";

export function FaqHero({ reduceMotion }: { reduceMotion: boolean }) {
  const stagger: Variants = reduceMotion
    ? { hidden: { opacity: 1 }, show: { opacity: 1 } }
    : { hidden: {}, show: { transition: { staggerChildren: 0.1, delayChildren: 0.08 } } };

  const reveal: Variants = reduceMotion
    ? { hidden: { opacity: 1, y: 0 }, show: { opacity: 1, y: 0 } }
    : { hidden: { opacity: 1, y: 10 }, show: { opacity: 1, y: 0 } };

  return (
    <section
      aria-labelledby="faq-hero-heading"
      className="relative overflow-hidden border-b border-white/10 py-18 sm:py-22 lg:py-24"
      style={{ background: FAQ_HERO_SURFACE }}
    >
      <div className="pointer-events-none absolute inset-0" aria-hidden>
        <div className="absolute inset-0 bg-[radial-gradient(64%_66%_at_88%_44%,var(--color-faq-hero-glow-primary),var(--color-faq-hero-glow-primary-soft)_54%,transparent_100%)]" />
        <div className="absolute inset-0 bg-[radial-gradient(52%_56%_at_9%_96%,var(--color-faq-hero-glow-secondary),transparent_72%)]" />
        <div className="absolute inset-0 bg-[radial-gradient(44%_50%_at_68%_54%,var(--color-faq-hero-glow-white),transparent_74%)]" />
      </div>

      <div
        className="pointer-events-none absolute inset-0 opacity-[0.03]"
        style={{ backgroundImage: NOISE_BG }}
        aria-hidden
      />

      <div
        className="pointer-events-none absolute inset-x-0 top-0 h-px"
        style={{ background: "linear-gradient(90deg, transparent 5%, rgba(125,211,252,0.35) 50%, transparent 95%)" }}
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
              href={FAQ_PAGE_ROUTES.aboutSsp}
              className={cn(
                "inline-flex items-center gap-1.5 rounded text-xs font-medium text-white/50 transition-colors hover:text-white/75",
                FOCUS_RING_DARK,
              )}
            >
              <ChevronLeft className="h-3.5 w-3.5" aria-hidden />
              About SSP
            </Link>
          </motion.div>

          <motion.div variants={reveal} transition={{ duration: reduceMotion ? 0 : 0.34, ease: "easeOut" }}>
            <SectionSignalEyebrow label="FAQ" light />
          </motion.div>

          <motion.h1
            id="faq-hero-heading"
            variants={reveal}
            transition={{ duration: reduceMotion ? 0 : 0.38, ease: "easeOut" }}
            className="mt-4 max-w-[18ch] text-balance text-[2.05rem] font-bold leading-[1.04] tracking-tight text-white sm:text-[2.45rem] lg:text-[2.92rem]"
          >
            {FAQ_HERO.title}
          </motion.h1>

          <motion.p
            variants={reveal}
            transition={{ duration: reduceMotion ? 0 : 0.34, ease: "easeOut" }}
            className="mt-4 max-w-[56ch] text-[14.25px] leading-[1.74] text-white/74 sm:text-[15px]"
          >
            {FAQ_HERO.subtitle}
          </motion.p>
        </motion.div>

        <motion.div
          initial={reduceMotion ? { opacity: 0.74 } : { opacity: 0.04, x: -34, y: 20 }}
          animate={reduceMotion ? { opacity: 0.74 } : { opacity: 0.84, x: 0, y: 0 }}
          transition={{ duration: reduceMotion ? 0 : 0.66, ease: [0.22, 1, 0.36, 1] }}
          className="pointer-events-none absolute right-[-45%] top-[-2%] h-[120%] w-[118%] sm:right-[-40%] sm:top-[-4%] sm:h-[126%] sm:w-[110%] md:right-[-31%] md:top-[-7%] md:h-[130%] md:w-[98%] lg:right-[-23%] lg:top-[-10%] lg:h-[134%] lg:w-[80%]"
          aria-hidden
          style={FAQ_HERO_SHARD_FADE_STYLE}
        >
          <div className="h-full w-full" style={FAQ_HERO_SHARD_MASK_STYLE} />
        </motion.div>
      </Container>
    </section>
  );
}
