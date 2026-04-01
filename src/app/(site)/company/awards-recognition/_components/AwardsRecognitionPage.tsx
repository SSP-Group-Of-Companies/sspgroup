"use client";

import Link from "next/link";
import { motion, useReducedMotion, type Variants } from "framer-motion";
import { ChevronLeft, Award } from "lucide-react";
import { Container } from "@/app/(site)/components/layout/Container";
import { SectionSignalEyebrow } from "@/app/(site)/components/ui/SectionSignalEyebrow";
import { awardsRecognitionPage } from "@/config/companyPages";
import { trackCtaClick } from "@/lib/analytics/cta";
import { cn } from "@/lib/cn";

const FOCUS_RING =
  "focus:outline-none focus-visible:ring-2 focus-visible:ring-white/60 focus-visible:ring-offset-2 focus-visible:ring-offset-[color:var(--color-company-ink)]";

export function AwardsRecognitionPage() {
  const reduceMotion = useReducedMotion();

  const revealUp: Variants = reduceMotion
    ? { hidden: { opacity: 1, y: 0 }, show: { opacity: 1, y: 0 } }
    : { hidden: { opacity: 1, y: 10 }, show: { opacity: 1, y: 0 } };

  const stagger: Variants = reduceMotion
    ? { hidden: { opacity: 1 }, show: { opacity: 1 } }
    : { hidden: {}, show: { transition: { staggerChildren: 0.05, delayChildren: 0.03 } } };

  return (
    <main className="bg-[color:var(--color-company-ink)]">
      <section
        aria-labelledby="awards-heading"
        className="relative overflow-hidden border-b border-white/8 py-16 sm:py-20 lg:py-24"
        style={{
          background:
            "linear-gradient(135deg, var(--color-company-hero-midnight-start) 0%, var(--color-company-hero-midnight-end) 100%)",
        }}
      >
        <div className="pointer-events-none absolute inset-0" aria-hidden>
          <div className="absolute inset-0 opacity-[0.025] [background-image:linear-gradient(to_right,rgba(255,255,255,0.65)_1px,transparent_1px),linear-gradient(to_bottom,rgba(255,255,255,0.65)_1px,transparent_1px)] [background-size:120px_120px]" />
          <div className="absolute -left-20 top-0 h-[280px] w-[280px] rounded-full bg-[color:var(--color-brand-500)]/10 blur-[110px]" />
        </div>
        <Container className="site-page-container relative">
          <motion.div initial="hidden" animate="show" variants={stagger} className="grid items-start gap-8 lg:grid-cols-12 lg:gap-10">
            <div className="lg:col-span-7">
              <motion.div variants={revealUp} transition={{ duration: reduceMotion ? 0 : 0.35, ease: "easeOut" }}>
                <Link
                  href="/about-us"
                  className={cn(
                    "inline-flex items-center gap-1.5 rounded-lg border border-[color:var(--color-glass-border)] bg-[color:var(--color-glass-bg)] px-3 py-1.5 text-xs font-medium text-white/65 transition-colors hover:text-white/85",
                    FOCUS_RING,
                  )}
                >
                  <ChevronLeft className="h-3.5 w-3.5" />
                  About SSP
                </Link>
              </motion.div>
              <motion.div variants={revealUp} transition={{ duration: reduceMotion ? 0 : 0.35, ease: "easeOut" }} className="mt-5">
                <SectionSignalEyebrow label={awardsRecognitionPage.hero.sectionLabel} light />
              </motion.div>
              <motion.h1
                id="awards-heading"
                variants={revealUp}
                transition={{ duration: reduceMotion ? 0 : 0.38, ease: "easeOut" }}
                className="mt-4 text-[2.2rem] font-bold leading-[1.02] tracking-tight text-white sm:text-[3rem]"
              >
                {awardsRecognitionPage.hero.title}
              </motion.h1>
              <motion.p
                variants={revealUp}
                transition={{ duration: reduceMotion ? 0 : 0.35, ease: "easeOut" }}
                className="mt-4 max-w-[70ch] text-[15px] leading-[1.8] text-white/72 sm:text-[16px]"
              >
                {awardsRecognitionPage.hero.subtitle}
              </motion.p>
            </div>

            <motion.aside
              variants={revealUp}
              transition={{ duration: reduceMotion ? 0 : 0.35, ease: "easeOut" }}
              className="lg:col-span-5"
            >
              <div className="rounded-2xl border border-white/14 bg-[color:var(--color-glass-bg)] p-4 shadow-[var(--shadow-glass-card)]">
                <p className="text-[10px] font-semibold uppercase tracking-[0.16em] text-white/52">
                  Recognition Themes
                </p>
                <div className="mt-3 grid gap-2">
                  <div className="rounded-lg border border-white/12 bg-white/[0.03] px-3 py-2 text-[11px] text-white/74">
                    Service consistency under load
                  </div>
                  <div className="rounded-lg border border-white/12 bg-white/[0.03] px-3 py-2 text-[11px] text-white/74">
                    Program reliability and governance
                  </div>
                  <div className="rounded-lg border border-white/12 bg-white/[0.03] px-3 py-2 text-[11px] text-white/74">
                    Documented operating discipline
                  </div>
                </div>
              </div>
            </motion.aside>
          </motion.div>
        </Container>
      </section>

      <section className="py-20 sm:py-24">
        <Container className="site-page-container">
          <motion.div initial="hidden" whileInView="show" viewport={{ once: true, amount: 0.15 }} variants={stagger}>
            <motion.div variants={stagger} className="grid gap-4 md:grid-cols-3">
              {awardsRecognitionPage.highlights.map((item) => (
                <motion.article
                  key={item.title}
                  variants={revealUp}
                  transition={{ duration: reduceMotion ? 0 : 0.35, ease: "easeOut" }}
                  className="rounded-2xl border border-white/12 bg-[color:var(--color-glass-bg)] p-5 shadow-[var(--shadow-glass-card)]"
                >
                  <span className="inline-flex h-9 w-9 items-center justify-center rounded-lg border border-white/14 bg-white/[0.03] text-[color:var(--color-ssp-cyan-500)]">
                    <Award className="h-4.5 w-4.5" aria-hidden />
                  </span>
                  <p className="mt-4 text-[10.5px] font-semibold uppercase tracking-[0.14em] text-white/48">{item.period}</p>
                  <h2 className="mt-2 text-[1.03rem] font-semibold tracking-tight text-white">{item.title}</h2>
                  <p className="mt-2 text-[13.5px] leading-[1.74] text-white/66">{item.body}</p>
                </motion.article>
              ))}
            </motion.div>
            <motion.p
              variants={revealUp}
              transition={{ duration: reduceMotion ? 0 : 0.35, ease: "easeOut" }}
              className="mt-8 max-w-[72ch] text-[13.5px] leading-[1.72] text-white/62"
            >
              {awardsRecognitionPage.note}
            </motion.p>
          </motion.div>
        </Container>
      </section>

      <section className="border-t border-white/8 py-14 sm:py-16">
        <Container className="site-page-container">
          <div className="flex flex-col items-start gap-3 sm:flex-row sm:items-center">
            <Link
              href={awardsRecognitionPage.ctas.primary.href}
              data-cta-id={awardsRecognitionPage.ctas.primary.ctaId}
              onClick={() =>
                trackCtaClick({
                  ctaId: awardsRecognitionPage.ctas.primary.ctaId,
                  location: "awards_page",
                  destination: awardsRecognitionPage.ctas.primary.href,
                  label: awardsRecognitionPage.ctas.primary.label,
                })
              }
              className={cn(
                "inline-flex h-11 items-center justify-center rounded-xl bg-[color:var(--color-brand-600)] px-6 text-sm font-semibold text-white shadow-[var(--shadow-action-primary)] transition-transform duration-200 hover:-translate-y-[1px]",
                FOCUS_RING,
              )}
            >
              {awardsRecognitionPage.ctas.primary.label}
            </Link>
            <Link
              href={awardsRecognitionPage.ctas.secondary.href}
              data-cta-id={awardsRecognitionPage.ctas.secondary.ctaId}
              onClick={() =>
                trackCtaClick({
                  ctaId: awardsRecognitionPage.ctas.secondary.ctaId,
                  location: "awards_page",
                  destination: awardsRecognitionPage.ctas.secondary.href,
                  label: awardsRecognitionPage.ctas.secondary.label,
                })
              }
              className={cn(
                "inline-flex h-11 items-center justify-center rounded-xl border border-white/18 px-6 text-sm font-semibold text-white/86 transition-colors hover:border-white/34 hover:text-white",
                FOCUS_RING,
              )}
            >
              {awardsRecognitionPage.ctas.secondary.label}
            </Link>
          </div>
        </Container>
      </section>
    </main>
  );
}
