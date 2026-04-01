"use client";

import Link from "next/link";
import { motion, useReducedMotion, type Variants } from "framer-motion";
import { ChevronLeft, Leaf } from "lucide-react";
import { Container } from "@/app/(site)/components/layout/Container";
import { SectionSignalEyebrow } from "@/app/(site)/components/ui/SectionSignalEyebrow";
import { sustainabilityPage } from "@/config/companyPages";
import { trackCtaClick } from "@/lib/analytics/cta";
import { cn } from "@/lib/cn";

const FOCUS_RING =
  "focus:outline-none focus-visible:ring-2 focus-visible:ring-[color:var(--color-nav-ring)] focus-visible:ring-offset-2 focus-visible:ring-offset-[color:var(--color-surface-1-light)]";

export function SustainabilityPage() {
  const reduceMotion = useReducedMotion();

  const revealUp: Variants = reduceMotion
    ? { hidden: { opacity: 1, y: 0 }, show: { opacity: 1, y: 0 } }
    : { hidden: { opacity: 1, y: 10 }, show: { opacity: 1, y: 0 } };

  const stagger: Variants = reduceMotion
    ? { hidden: { opacity: 1 }, show: { opacity: 1 } }
    : { hidden: {}, show: { transition: { staggerChildren: 0.05, delayChildren: 0.03 } } };

  return (
    <main className="bg-[color:var(--color-surface-0-light)]">
      <section
        aria-labelledby="sustainability-heading"
        className="relative overflow-hidden border-b border-[color:var(--color-border-light-soft)] py-16 sm:py-20 lg:py-24"
      >
        <div className="pointer-events-none absolute inset-0" aria-hidden>
          <div className="absolute inset-0 bg-[linear-gradient(180deg,var(--color-surface-1-light)_0%,var(--color-surface-0-light)_100%)]" />
          <div className="absolute -right-20 top-1/4 h-80 w-80 rounded-full bg-[color:var(--color-ssp-cyan-500)]/8 blur-[105px]" />
        </div>
        <Container className="site-page-container relative">
          <motion.div initial="hidden" animate="show" variants={stagger} className="grid items-start gap-8 lg:grid-cols-12 lg:gap-10">
            <div className="lg:col-span-7">
              <motion.div variants={revealUp} transition={{ duration: reduceMotion ? 0 : 0.35, ease: "easeOut" }}>
                <Link
                  href="/about-us"
                  className={cn(
                    "inline-flex items-center gap-1.5 rounded-lg border border-[color:var(--color-border-light)] bg-white px-3 py-1.5 text-xs font-medium text-[color:var(--color-muted)] transition-colors hover:text-[color:var(--color-text-strong)]",
                    FOCUS_RING,
                  )}
                >
                  <ChevronLeft className="h-3.5 w-3.5" />
                  About SSP
                </Link>
              </motion.div>
              <motion.div variants={revealUp} transition={{ duration: reduceMotion ? 0 : 0.35, ease: "easeOut" }} className="mt-5">
                <SectionSignalEyebrow label={sustainabilityPage.hero.sectionLabel} />
              </motion.div>
              <motion.h1
                id="sustainability-heading"
                variants={revealUp}
                transition={{ duration: reduceMotion ? 0 : 0.38, ease: "easeOut" }}
                className="mt-4 text-[2.1rem] font-bold leading-[1.04] tracking-tight text-[color:var(--color-text-strong)] sm:text-[2.9rem]"
              >
                {sustainabilityPage.hero.title}
              </motion.h1>
              <motion.p
                variants={revealUp}
                transition={{ duration: reduceMotion ? 0 : 0.35, ease: "easeOut" }}
                className="mt-4 max-w-[72ch] text-[15px] leading-[1.82] text-[color:var(--color-muted)] sm:text-[16px]"
              >
                {sustainabilityPage.hero.subtitle}
              </motion.p>
            </div>

            <motion.aside
              variants={revealUp}
              transition={{ duration: reduceMotion ? 0 : 0.35, ease: "easeOut" }}
              className="lg:col-span-5"
            >
              <div className="rounded-2xl border border-[color:var(--color-border-light)] bg-white p-4 shadow-[var(--shadow-company-card-soft)]">
                <p className="text-[10px] font-semibold uppercase tracking-[0.16em] text-[color:var(--color-subtle)]">
                  Efficiency Priorities
                </p>
                <div className="mt-3 grid gap-2">
                  <div className="rounded-lg border border-[color:var(--color-border-light)] bg-[color:var(--color-surface-1-light)] px-3 py-2 text-[11px] text-[color:var(--color-muted)]">
                    Route quality and reduced waste movement
                  </div>
                  <div className="rounded-lg border border-[color:var(--color-border-light)] bg-[color:var(--color-surface-1-light)] px-3 py-2 text-[11px] text-[color:var(--color-muted)]">
                    Maintenance and fleet stewardship discipline
                  </div>
                  <div className="rounded-lg border border-[color:var(--color-border-light)] bg-[color:var(--color-surface-1-light)] px-3 py-2 text-[11px] text-[color:var(--color-muted)]">
                    Digital workflow maturity and data visibility
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
            <motion.div variants={stagger} className="grid gap-4 md:grid-cols-2">
              {sustainabilityPage.commitments.map((item) => (
                <motion.article
                  key={item.title}
                  variants={revealUp}
                  transition={{ duration: reduceMotion ? 0 : 0.35, ease: "easeOut" }}
                  className="rounded-2xl border border-[color:var(--color-border-light)] bg-white p-5 shadow-[var(--shadow-company-card-soft)]"
                >
                  <span className="inline-flex h-9 w-9 items-center justify-center rounded-lg border border-[color:var(--color-border-light)] bg-[color:var(--color-surface-1-light)] text-[color:var(--color-menu-accent)]">
                    <Leaf className="h-4.5 w-4.5" aria-hidden />
                  </span>
                  <h2 className="mt-4 text-[1.03rem] font-semibold tracking-tight text-[color:var(--color-text-strong)]">
                    {item.title}
                  </h2>
                  <p className="mt-2 text-[13.5px] leading-[1.74] text-[color:var(--color-muted)]">{item.body}</p>
                </motion.article>
              ))}
            </motion.div>

            <motion.div
              variants={revealUp}
              transition={{ duration: reduceMotion ? 0 : 0.35, ease: "easeOut" }}
              className="mt-8 rounded-2xl border border-[color:var(--color-border-light)] bg-[color:var(--color-surface-1-light)] p-6"
            >
              <p className="text-[11px] font-semibold uppercase tracking-[0.14em] text-[color:var(--color-subtle)]">
                Governance note
              </p>
              <p className="mt-3 max-w-[74ch] text-[14px] leading-[1.75] text-[color:var(--color-muted)]">
                {sustainabilityPage.governance}
              </p>
            </motion.div>
          </motion.div>
        </Container>
      </section>

      <section className="border-t border-[color:var(--color-border-light-soft)] py-14 sm:py-16">
        <Container className="site-page-container">
          <div className="flex flex-col items-start gap-3 sm:flex-row sm:items-center">
            <Link
              href={sustainabilityPage.ctas.primary.href}
              data-cta-id={sustainabilityPage.ctas.primary.ctaId}
              onClick={() =>
                trackCtaClick({
                  ctaId: sustainabilityPage.ctas.primary.ctaId,
                  location: "sustainability_page",
                  destination: sustainabilityPage.ctas.primary.href,
                  label: sustainabilityPage.ctas.primary.label,
                })
              }
              className={cn(
                "inline-flex h-11 items-center justify-center rounded-xl bg-[color:var(--color-brand-600)] px-6 text-sm font-semibold text-white shadow-[var(--shadow-action-primary)] transition-transform duration-200 hover:-translate-y-[1px]",
                FOCUS_RING,
              )}
            >
              {sustainabilityPage.ctas.primary.label}
            </Link>
            <Link
              href={sustainabilityPage.ctas.secondary.href}
              data-cta-id={sustainabilityPage.ctas.secondary.ctaId}
              onClick={() =>
                trackCtaClick({
                  ctaId: sustainabilityPage.ctas.secondary.ctaId,
                  location: "sustainability_page",
                  destination: sustainabilityPage.ctas.secondary.href,
                  label: sustainabilityPage.ctas.secondary.label,
                })
              }
              className={cn(
                "inline-flex h-11 items-center justify-center rounded-xl border border-[color:var(--color-border-light)] bg-white px-6 text-sm font-semibold text-[color:var(--color-menu-accent)] transition-colors hover:text-[color:var(--color-ssp-ink-800)]",
                FOCUS_RING,
              )}
            >
              {sustainabilityPage.ctas.secondary.label}
            </Link>
          </div>
        </Container>
      </section>
    </main>
  );
}
