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

export function AboutSspSafetyComplianceTeaser({
  data,
}: {
  data: SafetyComplianceTeaserContent;
}) {
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
      className="relative overflow-hidden border-b border-[color:var(--color-border-light-soft)] py-18 sm:py-20 lg:py-22"
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
          className="absolute right-[4%] top-[18%] h-[34%] w-[34%] blur-[54px]"
          style={{
            background:
              "radial-gradient(closest-side, rgba(255,255,255,0.92), rgba(255,255,255,0.14), transparent 78%)",
          }}
        />
        <div
          className="absolute right-[-2%] top-[22%] h-[42%] w-[26%] blur-[58px]"
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
        {/* ── Text column ── stays within Container */}
        <Container className="site-page-container relative md:min-h-[34rem] lg:min-h-0">
          <div className="md:max-w-[56%] lg:max-w-[42%] xl:max-w-[40%]">
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
              className="mt-4 max-w-[15ch] text-balance text-[2.18rem] font-bold leading-[1.04] tracking-tight text-[color:var(--color-text-strong)] sm:max-w-[16ch] sm:text-[2.85rem]"
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
        </Container>

        {/* ── Image ── right edge flush with viewport on all breakpoints */}
        <motion.div
          variants={revealUp}
          transition={{ duration: reduceMotion ? 0 : 0.35, ease: "easeOut" }}
          className={cn(
            "pointer-events-none",
            "relative mt-3 ml-auto w-[108%] -mr-[8%] sm:mt-5 sm:w-[96%] sm:-mr-[5%]",
            "md:absolute md:bottom-[-2.25rem] md:right-0 md:mt-0 md:mr-0 md:w-[62%] lg:absolute lg:-top-14 lg:-bottom-14 lg:right-0 lg:mt-0 lg:mr-0 lg:w-[64%] xl:-top-16 xl:-bottom-16 xl:w-[62%]",
          )}
        >
          <div className="relative h-[14.5rem] sm:h-[18.5rem] md:h-[21.5rem] lg:h-full">
            <div
              className="absolute inset-x-[4%] inset-y-[10%] bg-[radial-gradient(56%_58%_at_66%_46%,rgba(255,255,255,0.95),rgba(255,255,255,0.12)_58%,transparent_100%)] blur-[36px] sm:blur-[42px] lg:blur-[54px]"
              aria-hidden
            />
            <div
              className="absolute bottom-[3%] right-[1%] h-10 w-[56%] bg-[radial-gradient(closest-side,rgba(15,23,42,0.2),rgba(15,23,42,0.04),transparent_72%)] blur-lg sm:h-12 sm:w-[54%] sm:blur-xl md:bottom-[5%] md:right-[2%] md:w-[52%] lg:bottom-[9%] lg:h-14 lg:w-[46%] lg:blur-2xl"
              aria-hidden
            />
            <div
              className="absolute right-[-3%] top-[16%] h-[44%] w-[42%] bg-[radial-gradient(closest-side,rgba(16,167,216,0.1),rgba(16,167,216,0.02),transparent_74%)] blur-[44px] sm:right-[-2%] md:right-0 lg:top-[18%] lg:w-[38%] lg:blur-[56px]"
              aria-hidden
            />
            <Image
              src={data.image.src}
              alt={data.image.alt}
              fill
              sizes="(max-width: 640px) 108vw, (max-width: 768px) 96vw, (max-width: 1024px) 62vw, 64vw"
              className="origin-right scale-[1.2] object-contain object-[100%_44%] sm:scale-[1.24] sm:object-[100%_45%] md:scale-[1.32] md:object-[100%_46%] lg:scale-[1.24] lg:object-[100%_50%] xl:scale-[1.27]"
            />
          </div>
        </motion.div>
      </motion.div>
    </section>
  );
}
