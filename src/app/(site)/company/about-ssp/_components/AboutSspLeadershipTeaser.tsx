"use client";

import Link from "next/link";
import { motion, useReducedMotion, type Variants } from "framer-motion";
import { Users2, Compass, Activity } from "lucide-react";
import { Container } from "@/app/(site)/components/layout/Container";
import { SectionSignalEyebrow } from "@/app/(site)/components/ui/SectionSignalEyebrow";
import type { LeadershipTeaserContent } from "@/config/company";
import { trackCtaClick } from "@/lib/analytics/cta";
import { cn } from "@/lib/cn";

const ICONS = [Compass, Activity, Users2] as const;

const FOCUS_RING =
  "focus:outline-none focus-visible:ring-2 focus-visible:ring-[color:var(--color-nav-ring)] focus-visible:ring-offset-2 focus-visible:ring-offset-[color:var(--color-surface-1-light)]";

export function AboutSspLeadershipTeaser({ data }: { data: LeadershipTeaserContent }) {
  const reduceMotion = useReducedMotion();

  const revealUp: Variants = reduceMotion
    ? { hidden: { opacity: 1, y: 0 }, show: { opacity: 1, y: 0 } }
    : { hidden: { opacity: 1, y: 10 }, show: { opacity: 1, y: 0 } };

  const stagger: Variants = reduceMotion
    ? { hidden: { opacity: 1 }, show: { opacity: 1 } }
    : { hidden: {}, show: { transition: { staggerChildren: 0.05, delayChildren: 0.03 } } };

  return (
    <section
      id="leadership"
      aria-labelledby="about-leadership-heading"
      className="relative overflow-hidden border-b border-[color:var(--color-border-light-soft)] py-20 sm:py-24"
      style={{
        background:
          "linear-gradient(180deg, var(--color-surface-0-light) 0%, var(--color-surface-1-light) 60%, var(--color-surface-0-light) 100%)",
      }}
    >
      <div className="pointer-events-none absolute inset-0" aria-hidden>
        <div className="absolute -left-20 top-1/4 h-64 w-64 rounded-full bg-[color:var(--color-brand-500)]/6 blur-[95px]" />
        <div className="absolute -right-20 bottom-0 h-72 w-72 rounded-full bg-[color:var(--color-ssp-cyan-500)]/8 blur-[95px]" />
      </div>

      <Container className="site-page-container relative">
        <motion.div
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, amount: 0.15 }}
          variants={stagger}
        >
          <motion.div variants={revealUp} transition={{ duration: reduceMotion ? 0 : 0.35, ease: "easeOut" }}>
            <SectionSignalEyebrow label={data.sectionLabel} />
          </motion.div>
          <motion.h2
            id="about-leadership-heading"
            variants={revealUp}
            transition={{ duration: reduceMotion ? 0 : 0.38, ease: "easeOut" }}
            className="mt-4 max-w-[24ch] text-[2rem] font-bold leading-[1.08] tracking-tight text-[color:var(--color-text-strong)] sm:text-[2.5rem]"
          >
            {data.title}
          </motion.h2>
          <motion.p
            variants={revealUp}
            transition={{ duration: reduceMotion ? 0 : 0.35, ease: "easeOut" }}
            className="mt-4 max-w-[74ch] text-[15px] leading-[1.82] text-[color:var(--color-muted)] sm:text-[16px]"
          >
            {data.subtitle}
          </motion.p>

          <motion.div
            variants={stagger}
            className="mt-10 grid gap-4 md:grid-cols-3"
          >
            {data.leaders.map((leader, idx) => {
              const Icon = ICONS[idx] ?? Users2;
              return (
                <motion.article
                  key={leader.name}
                  variants={revealUp}
                  transition={{ duration: reduceMotion ? 0 : 0.35, ease: "easeOut" }}
                  className="rounded-2xl border border-[color:var(--color-border-light)] bg-white p-5 shadow-[var(--shadow-company-card-soft)]"
                >
                  <div className="flex items-start justify-between gap-3">
                    <p className="text-[11px] font-semibold uppercase tracking-[0.15em] text-[color:var(--color-subtle)]">
                      {leader.role}
                    </p>
                    <span className="inline-flex h-8 w-8 items-center justify-center rounded-lg border border-[color:var(--color-border-light)] bg-[color:var(--color-surface-1-light)] text-[color:var(--color-menu-accent)]">
                      <Icon className="h-4 w-4" aria-hidden />
                    </span>
                  </div>
                  <h3 className="mt-3 text-[1.03rem] font-semibold leading-snug tracking-tight text-[color:var(--color-text-strong)]">
                    {leader.name}
                  </h3>
                  <p className="mt-2 text-[13.5px] leading-[1.75] text-[color:var(--color-muted)]">{leader.focus}</p>
                </motion.article>
              );
            })}
          </motion.div>

          <motion.div
            variants={revealUp}
            transition={{ duration: reduceMotion ? 0 : 0.35, ease: "easeOut" }}
            className="mt-8"
          >
            <Link
              href={data.cta.href}
              data-cta-id={data.cta.ctaId}
              onClick={() =>
                trackCtaClick({
                  ctaId: data.cta.ctaId,
                  location: "about_leadership_teaser",
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
              <span aria-hidden className="transition-transform group-hover:translate-x-0.5">
                &rarr;
              </span>
            </Link>
          </motion.div>
        </motion.div>
      </Container>
    </section>
  );
}
