"use client";

import Link from "next/link";
import { motion, useReducedMotion, type Variants } from "framer-motion";
import { ArrowUpRight, Newspaper, Video } from "lucide-react";
import { Container } from "@/app/(site)/components/layout/Container";
import { SectionSignalEyebrow } from "@/app/(site)/components/ui/SectionSignalEyebrow";
import type { MediaInsightsTeaserContent } from "@/config/company";
import { trackCtaClick } from "@/lib/analytics/cta";
import { cn } from "@/lib/cn";

const ICONS = [Video, Newspaper] as const;

const FOCUS_RING =
  "focus:outline-none focus-visible:ring-2 focus-visible:ring-[color:var(--color-nav-ring)] focus-visible:ring-offset-2 focus-visible:ring-offset-[color:var(--color-surface-1-light)]";

export function AboutSspMediaInsightsTeaser({
  data,
}: {
  data: MediaInsightsTeaserContent;
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
      id="media-insights"
      aria-labelledby="about-media-insights-heading"
      className="relative overflow-hidden border-b border-[color:var(--color-border-light-soft)] py-18 sm:py-20 lg:py-22"
      style={{
        background:
          "linear-gradient(180deg, var(--color-ssp-cloud-50) 0%, var(--color-surface-0-light) 42%, var(--color-ssp-cloud-100) 100%)",
      }}
    >
      <Container className="site-page-container relative">
        <motion.div
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, amount: 0.15 }}
          variants={stagger}
          className="mx-auto max-w-4xl text-center"
        >
          <motion.div variants={revealUp} transition={{ duration: reduceMotion ? 0 : 0.35, ease: "easeOut" }}>
            <div className="flex justify-center">
              <SectionSignalEyebrow label={data.sectionLabel} />
            </div>
          </motion.div>
          <motion.h2
            id="about-media-insights-heading"
            variants={revealUp}
            transition={{ duration: reduceMotion ? 0 : 0.38, ease: "easeOut" }}
            className="mx-auto mt-4 max-w-[20ch] text-balance text-[2.05rem] font-bold leading-[1.04] tracking-tight text-[color:var(--color-text-strong)] sm:text-[2.55rem] lg:text-[2.75rem]"
          >
            {data.title}
          </motion.h2>
          <motion.p
            variants={revealUp}
            transition={{ duration: reduceMotion ? 0 : 0.35, ease: "easeOut" }}
            className="mx-auto mt-4 max-w-[66ch] text-[14.85px] leading-[1.8] text-[color:var(--color-muted)] sm:text-[15.35px]"
          >
            {data.subtitle}
          </motion.p>
        </motion.div>

        <motion.div
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, amount: 0.15 }}
          variants={stagger}
          className="mx-auto mt-11 grid max-w-6xl gap-5 md:grid-cols-2"
        >
          {data.cards.map((card, idx) => {
            const Icon = ICONS[idx] ?? Video;
            return (
              <motion.article
                key={card.title}
                variants={revealUp}
                transition={{ duration: reduceMotion ? 0 : 0.35, ease: "easeOut" }}
                className="group relative overflow-hidden rounded-2xl border border-[color:var(--color-border-light)] bg-white p-6 shadow-[var(--shadow-company-card-soft)] transition-all duration-300 motion-safe:hover:-translate-y-0.5 hover:shadow-[var(--shadow-company-card-soft-hover)] sm:p-7"
              >
                <div className="flex items-start justify-between gap-3">
                  <span className="inline-flex h-10 w-10 items-center justify-center rounded-lg border border-[color:var(--color-border-light)] bg-[color:var(--color-surface-1-light)] text-[color:var(--color-menu-accent)]">
                    <Icon className="h-4.5 w-4.5" aria-hidden />
                  </span>
                  <span className="rounded-full border border-[color:var(--color-border-light)]/85 bg-white/85 px-2.5 py-1 text-[10px] font-semibold tracking-[0.14em] text-[color:var(--color-muted)]/75 uppercase">
                    {idx === 0 ? "Media" : "Insights"}
                  </span>
                </div>
                <h3 className="mt-4 text-[1.14rem] font-semibold tracking-tight text-[color:var(--color-text-strong)]">
                  {card.title}
                </h3>
                <p className="mt-2 text-[14px] leading-[1.75] text-[color:var(--color-muted)]">{card.body}</p>
                <Link
                  href={card.href}
                  data-cta-id={card.ctaId}
                  onClick={() =>
                    trackCtaClick({
                      ctaId: card.ctaId,
                      location: "about_media_insights_teaser",
                      destination: card.href,
                      label: card.ctaLabel,
                    })
                  }
                  className={cn(
                    "mt-5 inline-flex items-center gap-2 rounded-lg text-sm font-semibold text-[color:var(--color-menu-accent)] transition-colors hover:text-[color:var(--color-ssp-ink-800)]",
                    FOCUS_RING,
                  )}
                >
                  {card.ctaLabel}
                  <ArrowUpRight
                    aria-hidden
                    className="h-4 w-4 transition-transform motion-safe:group-hover:translate-x-[1px] motion-safe:group-hover:-translate-y-[1px]"
                  />
                </Link>
              </motion.article>
            );
          })}
        </motion.div>
      </Container>
    </section>
  );
}
