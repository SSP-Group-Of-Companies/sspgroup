"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { ChevronDown } from "lucide-react";
import { trackCtaClick } from "@/lib/analytics/cta";
import { cn } from "@/lib/cn";
import { Container } from "@/app/(site)/components/layout/Container";
import { FAQ_PAGE_ROUTES } from "@/config/faqs";
import { FOCUS_RING_LIGHT } from "./faqStyles";

export function FaqInsightsCta({ reduceMotion }: { reduceMotion: boolean }) {
  return (
    <section
      aria-label="Related resources"
      className="border-y border-[color:var(--color-border-light-soft)] py-10"
      style={{
        background:
          "linear-gradient(180deg, var(--color-ssp-cloud-100) 0%, var(--color-surface-1-light) 100%)",
      }}
    >
      <Container className="site-page-container">
        <motion.div
          className="flex flex-col items-center gap-3 sm:flex-row sm:justify-center sm:gap-4"
          initial={reduceMotion ? false : { opacity: 1, y: 8 }}
          whileInView={reduceMotion ? undefined : { opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.5 }}
          transition={{ duration: reduceMotion ? 0 : 0.35, ease: "easeOut" }}
        >
          <p className="text-[13px] text-[color:var(--color-muted)]">
            Looking for shipping guides and industry insights?
          </p>
          <Link
            href={FAQ_PAGE_ROUTES.insights}
            data-cta-id="faq_insights_browse"
            onClick={() =>
              trackCtaClick({
                ctaId: "faq_insights_browse",
                location: "faq_insights_nudge",
                destination: FAQ_PAGE_ROUTES.insights,
                label: "Browse Insights",
              })
            }
            className={cn(
              "inline-flex items-center gap-1 rounded-full border border-[color:var(--color-border-light)] bg-white px-4 py-1.5 text-xs font-medium text-[color:var(--color-text-strong)] transition-colors hover:border-[color:var(--color-border-light-strong)]",
              FOCUS_RING_LIGHT,
            )}
          >
            Browse Insights
            <ChevronDown className="h-3 w-3 -rotate-90" aria-hidden />
          </Link>
        </motion.div>
      </Container>
    </section>
  );
}
