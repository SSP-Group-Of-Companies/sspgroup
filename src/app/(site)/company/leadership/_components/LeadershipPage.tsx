"use client";

import Link from "next/link";
import { motion, useReducedMotion, type Variants } from "framer-motion";
import { ChevronLeft, UserRound } from "lucide-react";
import { Container } from "@/app/(site)/components/layout/Container";
import { SectionSignalEyebrow } from "@/app/(site)/components/ui/SectionSignalEyebrow";
import { leadershipPage } from "@/config/companyPages";
import { trackCtaClick } from "@/lib/analytics/cta";
import { cn } from "@/lib/cn";

const FOCUS_RING =
  "focus:outline-none focus-visible:ring-2 focus-visible:ring-[color:var(--color-nav-ring)] focus-visible:ring-offset-2 focus-visible:ring-offset-[color:var(--color-surface-1-light)]";

export function LeadershipPage() {
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
        aria-labelledby="leadership-heading"
        className="relative overflow-hidden border-b border-[color:var(--color-border-light-soft)] py-16 sm:py-20 lg:py-24"
      >
        <div className="pointer-events-none absolute inset-0" aria-hidden>
          <div className="absolute inset-0 bg-[linear-gradient(180deg,var(--color-surface-1-light)_0%,var(--color-surface-0-light)_100%)]" />
          <div className="absolute -left-24 top-1/3 h-72 w-72 rounded-full bg-[color:var(--color-brand-500)]/7 blur-[100px]" />
          <div className="absolute -right-24 bottom-0 h-72 w-72 rounded-full bg-[color:var(--color-ssp-cyan-500)]/9 blur-[100px]" />
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
                <SectionSignalEyebrow label={leadershipPage.hero.sectionLabel} />
              </motion.div>
              <motion.h1
                id="leadership-heading"
                variants={revealUp}
                transition={{ duration: reduceMotion ? 0 : 0.38, ease: "easeOut" }}
                className="mt-4 text-[2.1rem] font-bold leading-[1.04] tracking-tight text-[color:var(--color-text-strong)] sm:text-[2.9rem] lg:text-[3.2rem]"
              >
                {leadershipPage.hero.title}
              </motion.h1>
              <motion.p
                variants={revealUp}
                transition={{ duration: reduceMotion ? 0 : 0.35, ease: "easeOut" }}
                className="mt-4 max-w-[72ch] text-[15px] leading-[1.82] text-[color:var(--color-muted)] sm:text-[16px]"
              >
                {leadershipPage.hero.subtitle}
              </motion.p>
            </div>

            <motion.aside
              variants={revealUp}
              transition={{ duration: reduceMotion ? 0 : 0.35, ease: "easeOut" }}
              className="lg:col-span-5"
            >
              <div className="rounded-2xl border border-[color:var(--color-border-light)] bg-white p-4 shadow-[var(--shadow-company-card-soft)]">
                <p className="text-[10px] font-semibold uppercase tracking-[0.16em] text-[color:var(--color-subtle)]">
                  Leadership Cadence
                </p>
                <div className="mt-3 grid gap-2">
                  <div className="rounded-lg border border-[color:var(--color-border-light)] bg-[color:var(--color-surface-1-light)] px-3 py-2">
                    <p className="text-[11px] font-semibold text-[color:var(--color-text-strong)]">Strategic Reviews</p>
                    <p className="mt-1 text-[11px] text-[color:var(--color-muted)]">Network and capability priorities</p>
                  </div>
                  <div className="rounded-lg border border-[color:var(--color-border-light)] bg-[color:var(--color-surface-1-light)] px-3 py-2">
                    <p className="text-[11px] font-semibold text-[color:var(--color-text-strong)]">Ops Governance</p>
                    <p className="mt-1 text-[11px] text-[color:var(--color-muted)]">Lane-level performance and escalations</p>
                  </div>
                  <div className="rounded-lg border border-[color:var(--color-border-light)] bg-[color:var(--color-surface-1-light)] px-3 py-2">
                    <p className="text-[11px] font-semibold text-[color:var(--color-text-strong)]">Customer Alignment</p>
                    <p className="mt-1 text-[11px] text-[color:var(--color-muted)]">Service-level commitments and adjustments</p>
                  </div>
                </div>
              </div>
            </motion.aside>
          </motion.div>
        </Container>
      </section>

      <section aria-labelledby="leadership-groups-heading" className="py-20 sm:py-24">
        <Container className="site-page-container">
          <motion.div
            initial="hidden"
            whileInView="show"
            viewport={{ once: true, amount: 0.15 }}
            variants={stagger}
          >
            <motion.h2
              id="leadership-groups-heading"
              variants={revealUp}
              transition={{ duration: reduceMotion ? 0 : 0.35, ease: "easeOut" }}
              className="text-2xl font-bold tracking-tight text-[color:var(--color-text-strong)] sm:text-[2rem]"
            >
              Leadership structure
            </motion.h2>
            <motion.div variants={stagger} className="mt-7 grid gap-4 md:grid-cols-2">
              {leadershipPage.groups.map((group) => (
                <motion.article
                  key={group.title}
                  variants={revealUp}
                  transition={{ duration: reduceMotion ? 0 : 0.35, ease: "easeOut" }}
                  className="rounded-2xl border border-[color:var(--color-border-light)] bg-white p-5 shadow-[var(--shadow-company-card-soft)]"
                >
                  <span className="inline-flex h-9 w-9 items-center justify-center rounded-lg border border-[color:var(--color-border-light)] bg-[color:var(--color-surface-1-light)] text-[color:var(--color-menu-accent)]">
                    <UserRound className="h-4.5 w-4.5" aria-hidden />
                  </span>
                  <p className="mt-4 text-[10.5px] font-semibold uppercase tracking-[0.15em] text-[color:var(--color-subtle)]">
                    {group.role}
                  </p>
                  <h3 className="mt-2 text-[1.03rem] font-semibold leading-snug tracking-tight text-[color:var(--color-text-strong)]">
                    {group.title}
                  </h3>
                  <p className="mt-2 text-[13.5px] leading-[1.74] text-[color:var(--color-muted)]">{group.body}</p>
                </motion.article>
              ))}
            </motion.div>

            <motion.div
              variants={revealUp}
              transition={{ duration: reduceMotion ? 0 : 0.35, ease: "easeOut" }}
              className="mt-10 rounded-2xl border border-[color:var(--color-border-light)] bg-[color:var(--color-surface-1-light)] p-6"
            >
              <p className="text-[11px] font-semibold uppercase tracking-[0.14em] text-[color:var(--color-subtle)]">
                Shared leadership principles
              </p>
              <ul className="mt-4 grid gap-2.5 md:grid-cols-2">
                {leadershipPage.principles.map((item) => (
                  <li key={item} className="text-[13px] leading-[1.72] text-[color:var(--color-muted)]">
                    - {item}
                  </li>
                ))}
              </ul>
            </motion.div>
          </motion.div>
        </Container>
      </section>

      <section className="border-t border-[color:var(--color-border-light-soft)] py-14 sm:py-16">
        <Container className="site-page-container">
          <div className="flex flex-col items-start gap-3 sm:flex-row sm:items-center">
            <Link
              href={leadershipPage.ctas.primary.href}
              data-cta-id={leadershipPage.ctas.primary.ctaId}
              onClick={() =>
                trackCtaClick({
                  ctaId: leadershipPage.ctas.primary.ctaId,
                  location: "leadership_page",
                  destination: leadershipPage.ctas.primary.href,
                  label: leadershipPage.ctas.primary.label,
                })
              }
              className={cn(
                "inline-flex h-11 items-center justify-center rounded-xl bg-[color:var(--color-brand-600)] px-6 text-sm font-semibold text-white shadow-[var(--shadow-action-primary)] transition-transform duration-200 hover:-translate-y-[1px]",
                FOCUS_RING,
              )}
            >
              {leadershipPage.ctas.primary.label}
            </Link>
            <Link
              href={leadershipPage.ctas.secondary.href}
              data-cta-id={leadershipPage.ctas.secondary.ctaId}
              onClick={() =>
                trackCtaClick({
                  ctaId: leadershipPage.ctas.secondary.ctaId,
                  location: "leadership_page",
                  destination: leadershipPage.ctas.secondary.href,
                  label: leadershipPage.ctas.secondary.label,
                })
              }
              className={cn(
                "inline-flex h-11 items-center justify-center rounded-xl border border-[color:var(--color-border-light)] bg-white px-6 text-sm font-semibold text-[color:var(--color-menu-accent)] transition-colors hover:text-[color:var(--color-ssp-ink-800)]",
                FOCUS_RING,
              )}
            >
              {leadershipPage.ctas.secondary.label}
            </Link>
          </div>
        </Container>
      </section>
    </main>
  );
}
