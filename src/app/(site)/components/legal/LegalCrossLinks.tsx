"use client";

import { motion, type Variants } from "framer-motion";
import { ArrowUpRight } from "lucide-react";

import { cn } from "@/lib/cn";
import { TrackedLink } from "@/app/(site)/components/analytics/TrackedLink";
import { FOCUS_RING_LIGHT } from "@/app/(site)/company/faqs/_components/faqStyles";
import {
  LEGAL_CROSS_LINKS,
  type LegalPageKey,
} from "@/config/legal";

type LegalCrossLinksProps = {
  currentKey: LegalPageKey;
  reduceMotion: boolean;
  location: string;
};

/**
 * Cross-reference strip linking visitors to the sibling legal documents.
 * Premium card treatment with hairline hover, consistent with network pages.
 */
export function LegalCrossLinks({
  currentKey,
  reduceMotion,
  location,
}: LegalCrossLinksProps) {
  const items = LEGAL_CROSS_LINKS.filter((item) => item.key !== currentKey);

  const revealUp: Variants = reduceMotion
    ? { hidden: { opacity: 1, y: 0 }, show: { opacity: 1, y: 0 } }
    : { hidden: { opacity: 1, y: 10 }, show: { opacity: 1, y: 0 } };

  const stagger: Variants = reduceMotion
    ? { hidden: { opacity: 1 }, show: { opacity: 1 } }
    : { hidden: {}, show: { transition: { staggerChildren: 0.05, delayChildren: 0.03 } } };

  return (
    <aside
      aria-label="Related legal documents"
      className="mt-14 rounded-2xl border border-[color:var(--color-border-light-soft)] bg-white/70 p-5 sm:p-6"
    >
      <div className="mb-4 flex items-center gap-2" aria-hidden>
        <span className="h-1.5 w-1.5 rounded-full bg-[color:var(--color-menu-accent)]/70" />
        <span className="h-px w-10 bg-gradient-to-r from-[color:var(--color-menu-accent)]/55 to-transparent" />
      </div>
      <h2 className="text-[13.5px] font-semibold tracking-[-0.005em] text-[color:var(--color-text-strong)] sm:text-[14px]">
        Related documents
      </h2>
      <motion.ul
        initial="hidden"
        whileInView="show"
        viewport={{ once: true, amount: 0.2 }}
        variants={stagger}
        className="mt-4 grid gap-2.5 sm:grid-cols-2"
      >
        {items.map((item) => (
          <motion.li key={item.key} variants={revealUp} transition={{ duration: reduceMotion ? 0 : 0.3, ease: "easeOut" }}>
            <TrackedLink
              href={item.href}
              ctaId={`legal_cross_link_${item.key.replace(/-/g, "_")}`}
              location={location}
              label={item.label}
              className={cn(
                "group/legal-link flex items-center justify-between rounded-xl border border-[color:var(--color-border-light)] bg-white px-4 py-3 transition-all duration-200",
                "hover:-translate-y-[1px] hover:border-[color:var(--color-ssp-cyan-500)]/36 hover:shadow-[0_10px_24px_-18px_rgba(2,6,23,0.32)]",
                FOCUS_RING_LIGHT,
              )}
            >
              <span className="text-[13px] font-semibold text-[color:var(--color-text-strong)]">
                {item.label}
              </span>
              <ArrowUpRight
                aria-hidden
                className="h-4 w-4 text-[color:var(--color-muted)] transition-all duration-200 group-hover/legal-link:-translate-y-0.5 group-hover/legal-link:translate-x-0.5 group-hover/legal-link:text-[color:var(--color-ssp-cyan-600)]"
              />
            </TrackedLink>
          </motion.li>
        ))}
      </motion.ul>
    </aside>
  );
}
