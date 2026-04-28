"use client";

import Link from "next/link";
import Image from "next/image";
import { motion, useReducedMotion, type Variants } from "framer-motion";
import { Container } from "@/app/(site)/components/layout/Container";
import { SectionSignalEyebrow } from "@/app/(site)/components/ui/SectionSignalEyebrow";
import type { SafetyComplianceTeaserContent } from "@/config/company";
import { trackCtaClick } from "@/lib/analytics/cta";
import { cn } from "@/lib/cn";

const FOCUS_RING =
  "focus:outline-none focus-visible:ring-2 focus-visible:ring-[color:var(--color-nav-ring)] focus-visible:ring-offset-2 focus-visible:ring-offset-[color:var(--color-surface-1-light)]";

/** Fraction of the artwork hidden past the right edge; same on all breakpoints (width-based mask). */
const SAFETY_IMAGE_RIGHT_CLIP = 0.12;

/** Hard cap on the visible frame width so the illustration does not scale up without bound when zoomed out. */
const SAFETY_IMAGE_FRAME_MAX_PX = 800;

export function AboutSspSafetyComplianceTeaser({ data }: { data: SafetyComplianceTeaserContent }) {
  const reduceMotion = useReducedMotion() ?? false;

  const revealUp: Variants = reduceMotion
    ? { hidden: { opacity: 1, y: 0 }, show: { opacity: 1, y: 0 } }
    : { hidden: { opacity: 1, y: 10 }, show: { opacity: 1, y: 0 } };

  const stagger: Variants = reduceMotion
    ? { hidden: { opacity: 1 }, show: { opacity: 1 } }
    : { hidden: {}, show: { transition: { staggerChildren: 0.05, delayChildren: 0.03 } } };

  return (
    <section
      id="safety-compliance"
      aria-labelledby="about-safety-heading"
      className="relative overflow-visible border-b border-[color:var(--color-border-light-soft)] py-18 sm:py-20 lg:py-22"
      style={{
        background:
          "linear-gradient(180deg, var(--color-surface-0-light) 0%, color-mix(in srgb, var(--color-surface-0-light) 62%, white) 52%, var(--color-surface-1-light) 100%)",
      }}
    >
      <div className="pointer-events-none absolute inset-0" aria-hidden>
        <div
          className="absolute inset-x-0 top-0 h-20"
          style={{ background: "linear-gradient(180deg, rgba(7,16,30,0.06) 0%, transparent 100%)" }}
        />
        <div
          className="absolute inset-x-0 top-0 h-px"
          style={{
            background:
              "linear-gradient(90deg, transparent 12%, color-mix(in srgb, var(--color-ssp-cyan-500) 26%, transparent) 50%, transparent 88%)",
          }}
        />
        <div
          className="absolute top-[18%] right-[4%] h-[34%] w-[34%] blur-[54px]"
          style={{
            background:
              "radial-gradient(closest-side, rgba(255,255,255,0.92), rgba(255,255,255,0.14), transparent 78%)",
          }}
        />
        <div
          className="absolute top-[22%] right-[-2%] h-[42%] w-[26%] blur-[58px]"
          style={{
            background: "radial-gradient(closest-side, rgba(16,167,216,0.12), transparent 72%)",
          }}
        />
      </div>

      <motion.div
        initial="hidden"
        whileInView="show"
        viewport={{ once: true, amount: 0.15 }}
        variants={stagger}
        className="relative"
      >
        <Container className="site-page-container relative md:min-h-[34rem] lg:min-h-0">
          <div className="grid grid-cols-1 items-start gap-8 md:grid-cols-12 md:items-center md:gap-10">
            <div className="md:col-span-5 md:min-w-0 lg:col-span-5 lg:pr-2">
              <motion.div
                variants={revealUp}
                transition={{ duration: reduceMotion ? 0 : 0.35, ease: "easeOut" }}
              >
                <SectionSignalEyebrow label={data.sectionLabel} />
              </motion.div>
              <motion.h2
                id="about-safety-heading"
                variants={revealUp}
                transition={{ duration: reduceMotion ? 0 : 0.38, ease: "easeOut" }}
                className="mt-4 max-w-[15ch] text-[2.18rem] leading-[1.04] font-bold tracking-tight text-balance text-[color:var(--color-text-strong)] sm:max-w-[16ch] sm:text-[2.85rem]"
              >
                {data.title}
              </motion.h2>
              <motion.p
                variants={revealUp}
                transition={{ duration: reduceMotion ? 0 : 0.35, ease: "easeOut" }}
                className="mt-4 max-w-[34rem] text-[15.5px] leading-[1.82] text-[color:var(--color-text-strong)]/68 sm:text-[16px]"
              >
                {data.subtitle}
              </motion.p>

              <motion.ul
                variants={revealUp}
                transition={{ duration: reduceMotion ? 0 : 0.35, ease: "easeOut" }}
                className="mt-7 max-w-[30rem] divide-y divide-[color:var(--color-border-light-soft)] border-y border-[color:var(--color-border-light-soft)]"
              >
                {data.credentials.map((credential) => (
                  <li
                    key={credential}
                    className="py-3.5 text-[13.5px] leading-[1.68] text-[color:var(--color-text-strong)]/74"
                  >
                    {credential}
                  </li>
                ))}
              </motion.ul>

              <motion.div
                variants={revealUp}
                transition={{ duration: reduceMotion ? 0 : 0.35, ease: "easeOut" }}
                className="mt-7"
              >
                <Link
                  href={data.cta.href}
                  data-cta-id={data.cta.ctaId}
                  onClick={() =>
                    trackCtaClick({
                      ctaId: data.cta.ctaId,
                      location: "about_safety_compliance_teaser",
                      destination: data.cta.href,
                      label: data.cta.label,
                    })
                  }
                  className={cn(
                    "group inline-flex items-center gap-2 rounded-lg text-sm font-semibold text-[color:var(--color-menu-accent)] transition-colors hover:text-[color:var(--color-ssp-ink-800)]",
                    FOCUS_RING,
                  )}
                >
                  {data.cta.label}
                  <span
                    aria-hidden
                    className="transition-transform motion-safe:group-hover:translate-x-0.5"
                  >
                    &rarr;
                  </span>
                </Link>
              </motion.div>
            </div>

            <motion.div
              variants={revealUp}
              transition={{ duration: reduceMotion ? 0 : 0.35, ease: "easeOut" }}
              className={cn(
                "pointer-events-none relative w-full min-w-0 select-none md:col-span-7",
                /* Mobile: cancel Container right padding only so the art meets the screen edge (left gutter unchanged). */
                "max-md:-mr-4 max-md:w-[calc(100%+1rem)] sm:max-md:-mr-6 sm:max-md:w-[calc(100%+1.5rem)]",
                /* Desktop: bleed to viewport right (1440px site max + horizontal padding); mirrors homepage Why SSP stage. */
                "md:!-mr-[calc(max(0px,(100vw-1440px)/2)+1.5rem)] md:!w-[calc(100%+max(0px,(100vw-1440px)/2)+1.5rem)]",
                "lg:!-mr-[calc(max(0px,(100vw-1440px)/2)+2rem)] lg:!w-[calc(100%+max(0px,(100vw-1440px)/2)+2rem)]",
              )}
            >
              <div
                className="relative w-full overflow-hidden md:ml-auto"
                style={{ maxWidth: `${SAFETY_IMAGE_FRAME_MAX_PX}px` }}
              >
                <div
                  className="absolute inset-x-[3%] inset-y-[6%] bg-[radial-gradient(56%_58%_at_66%_46%,rgba(255,255,255,0.9),rgba(255,255,255,0.1)_58%,transparent_100%)] blur-[32px] sm:blur-[40px] md:blur-[48px]"
                  aria-hidden
                />
                <div
                  className="absolute right-0 bottom-[2%] h-9 w-1/2 bg-[radial-gradient(closest-side,rgba(15,23,42,0.16),transparent_70%)] blur-md md:bottom-[4%] md:blur-lg"
                  aria-hidden
                />
                <div
                  className="absolute top-[14%] right-0 h-[40%] w-[38%] bg-[radial-gradient(closest-side,rgba(16,167,216,0.08),transparent_75%)] blur-[40px] md:top-[12%] md:blur-[48px]"
                  aria-hidden
                />
                <Image
                  src={data.image.src}
                  alt={data.image.alt}
                  width={1438}
                  height={1024}
                  className="relative z-[1] block h-auto max-w-none"
                  sizes="(max-width: 767px) 90vw, 943px"
                  style={{
                    width: `calc(100% / ${1 - SAFETY_IMAGE_RIGHT_CLIP})`,
                    height: "auto",
                  }}
                />
              </div>
            </motion.div>
          </div>
        </Container>
      </motion.div>
    </section>
  );
}
