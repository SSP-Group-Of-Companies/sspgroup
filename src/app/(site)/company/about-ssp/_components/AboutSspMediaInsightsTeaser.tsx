"use client";

import Link from "next/link";
import { motion, useReducedMotion, type Variants } from "framer-motion";
import { Video, Newspaper } from "lucide-react";
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
  const reduceMotion = useReducedMotion();

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
      className="relative overflow-hidden border-b border-[color:var(--color-border-light-soft)] py-20 sm:py-24"
      style={{
        background:
          "linear-gradient(180deg, var(--color-surface-1-light) 0%, var(--color-surface-0-light) 100%)",
      }}
    >
      <Container className="site-page-container relative">
        <motion.div
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, amount: 0.15 }}
          variants={stagger}
          className="max-w-3xl"
        >
          <motion.div variants={revealUp} transition={{ duration: reduceMotion ? 0 : 0.35, ease: "easeOut" }}>
            <SectionSignalEyebrow label={data.sectionLabel} />
          </motion.div>
          <motion.h2
            id="about-media-insights-heading"
            variants={revealUp}
            transition={{ duration: reduceMotion ? 0 : 0.38, ease: "easeOut" }}
            className="mt-4 text-[2rem] font-bold leading-[1.08] tracking-tight text-[color:var(--color-text-strong)] sm:text-[2.5rem]"
          >
            {data.title}
          </motion.h2>
          <motion.p
            variants={revealUp}
            transition={{ duration: reduceMotion ? 0 : 0.35, ease: "easeOut" }}
            className="mt-4 text-[15px] leading-[1.82] text-[color:var(--color-muted)] sm:text-[16px]"
          >
            {data.subtitle}
          </motion.p>
        </motion.div>

        <motion.div
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, amount: 0.15 }}
          variants={stagger}
          className="mt-10 grid gap-4 md:grid-cols-2"
        >
          {data.cards.map((card, idx) => {
            const Icon = ICONS[idx] ?? Video;
            return (
              <motion.article
                key={card.title}
                variants={revealUp}
                transition={{ duration: reduceMotion ? 0 : 0.35, ease: "easeOut" }}
                className="rounded-2xl border border-[color:var(--color-border-light)] bg-white p-6 shadow-[var(--shadow-company-card-soft)]"
              >
                <span className="inline-flex h-9 w-9 items-center justify-center rounded-lg border border-[color:var(--color-border-light)] bg-[color:var(--color-surface-1-light)] text-[color:var(--color-menu-accent)]">
                  <Icon className="h-4 w-4" aria-hidden />
                </span>
                <h3 className="mt-4 text-[1.1rem] font-semibold tracking-tight text-[color:var(--color-text-strong)]">
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
                    "group mt-4 inline-flex items-center gap-2 rounded-lg text-sm font-semibold text-[color:var(--color-menu-accent)] transition-colors hover:text-[color:var(--color-ssp-ink-800)]",
                    FOCUS_RING,
                  )}
                >
                  {card.ctaLabel}
                  <span aria-hidden className="transition-transform group-hover:translate-x-0.5">
                    &rarr;
                  </span>
                </Link>
              </motion.article>
            );
          })}
        </motion.div>
      </Container>
    </section>
  );
}
