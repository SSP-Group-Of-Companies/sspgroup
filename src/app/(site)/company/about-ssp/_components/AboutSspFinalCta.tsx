"use client";

import Link from "next/link";
import { motion, useReducedMotion, type Variants } from "framer-motion";
import { Container } from "@/app/(site)/components/layout/Container";
import { trackCtaClick } from "@/lib/analytics/cta";
import type { AboutFinalCtaContent } from "@/config/company";
import { cn } from "@/lib/cn";

const FOCUS_RING =
  "focus:outline-none focus-visible:ring-2 focus-visible:ring-white/60 focus-visible:ring-offset-2 focus-visible:ring-offset-[color:var(--color-company-ink)]";

export function AboutSspFinalCta({ data }: { data: AboutFinalCtaContent }) {
  const reduceMotion = useReducedMotion();

  const revealUp: Variants = reduceMotion
    ? { hidden: { opacity: 1, y: 0 }, show: { opacity: 1, y: 0 } }
    : { hidden: { opacity: 1, y: 10 }, show: { opacity: 1, y: 0 } };

  return (
    <section
      aria-labelledby="about-final-cta-heading"
      className="relative overflow-hidden py-20 sm:py-24 lg:py-28"
      style={{
        background:
          "linear-gradient(135deg, var(--color-company-hero-midnight-start) 0%, var(--color-company-hero-midnight-end) 100%)",
      }}
    >
      <div className="pointer-events-none absolute inset-0" aria-hidden>
        <div className="absolute inset-0 opacity-[0.028] [background-image:linear-gradient(to_right,rgba(255,255,255,0.7)_1px,transparent_1px),linear-gradient(to_bottom,rgba(255,255,255,0.7)_1px,transparent_1px)] [background-size:110px_110px]" />
        <div className="absolute -left-28 top-[18%] h-72 w-72 rounded-full bg-[color:var(--color-ssp-cyan-500)]/8 blur-[110px]" />
        <div className="absolute -right-28 bottom-0 h-80 w-80 rounded-full bg-[color:var(--color-brand-500)]/10 blur-[120px]" />
      </div>

      <Container className="site-page-container relative">
        <motion.div
          initial={reduceMotion ? false : "hidden"}
          whileInView={reduceMotion ? undefined : "show"}
          viewport={{ once: true, amount: 0.15 }}
          variants={revealUp}
          transition={{ duration: reduceMotion ? 0 : 0.35, ease: "easeOut" }}
          className="mx-auto max-w-4xl rounded-3xl border border-[color:var(--color-glass-border)] bg-[color:var(--color-glass-bg)] px-6 py-8 text-center shadow-[var(--shadow-glass-card)] sm:px-10 sm:py-10"
        >
          <p className="text-[10.5px] font-semibold uppercase tracking-[0.18em] text-white/55">
            {data.kicker}
          </p>
          <h2
            id="about-final-cta-heading"
            className="mt-4 text-3xl font-bold leading-[1.02] tracking-tight text-white sm:text-[2.55rem]"
          >
            {data.title}
          </h2>
          <p className="mx-auto mt-4 max-w-[68ch] text-[15px] leading-[1.78] text-white/75 sm:text-[16px]">
            {data.body}
          </p>

          <div className="mt-6 flex flex-wrap items-center justify-center gap-2">
            {data.trustSignals.map((signal) => (
              <span
                key={signal}
                className="rounded-full border border-white/15 bg-white/[0.03] px-3 py-1.5 text-[11px] font-medium text-white/72"
              >
                {signal}
              </span>
            ))}
          </div>

          <div className="mt-7 flex flex-col items-center justify-center gap-3 sm:flex-row">
            <Link
              href={data.ctas.primary.href}
              data-cta-id={data.ctas.primary.ctaId}
              onClick={() =>
                trackCtaClick({
                  ctaId: data.ctas.primary.ctaId,
                  location: "about_final_cta",
                  destination: data.ctas.primary.href,
                  label: data.ctas.primary.label,
                })
              }
              className={cn(
                "inline-flex h-12 w-full items-center justify-center rounded-xl bg-[color:var(--color-brand-600)] px-7 text-sm font-semibold text-white shadow-[var(--shadow-action-primary)] transition-transform duration-200 hover:-translate-y-[1px] sm:w-auto",
                FOCUS_RING,
              )}
            >
              {data.ctas.primary.label}
            </Link>
            <Link
              href={data.ctas.secondary.href}
              data-cta-id={data.ctas.secondary.ctaId}
              onClick={() =>
                trackCtaClick({
                  ctaId: data.ctas.secondary.ctaId,
                  location: "about_final_cta",
                  destination: data.ctas.secondary.href,
                  label: data.ctas.secondary.label,
                })
              }
              className={cn(
                "inline-flex h-12 w-full items-center justify-center rounded-xl border border-white/22 bg-black/20 px-7 text-sm font-semibold text-white/90 transition-colors duration-200 hover:border-white/35 hover:bg-black/30 sm:w-auto",
                FOCUS_RING,
              )}
            >
              {data.ctas.secondary.label}
            </Link>
          </div>
        </motion.div>
      </Container>
    </section>
  );
}
