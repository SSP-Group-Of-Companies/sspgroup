"use client";

import { motion } from "framer-motion";
import { cn } from "@/lib/cn";
import { FOCUS_RING_LIGHT } from "./faqStyles";

type FaqAccordionItemProps = {
  question: string;
  answer: string;
  isOpen: boolean;
  onToggle: () => void;
  reduceMotion: boolean;
  panelId: string;
  triggerId: string;
};

export function FaqAccordionItem({
  question,
  answer,
  isOpen,
  onToggle,
  reduceMotion,
  panelId,
  triggerId,
}: FaqAccordionItemProps) {
  return (
    <article
      className={cn(
        "relative overflow-hidden rounded-2xl border bg-white shadow-[var(--shadow-company-card-soft)] transition-all duration-200",
        isOpen
          ? "border-[color:var(--color-menu-accent)]/25 shadow-[0_16px_34px_-22px_rgba(2,6,23,0.35)]"
          : "border-[color:var(--color-border-light)] hover:shadow-[0_14px_30px_rgba(2,6,23,0.11)]",
      )}
    >
      <div
        className="pointer-events-none absolute inset-x-4 top-0 h-px bg-gradient-to-r from-transparent via-[color:var(--color-menu-accent)]/32 to-transparent"
        aria-hidden
      />
      <h3>
        <button
          id={triggerId}
          type="button"
          onClick={onToggle}
          className={cn(
            "flex w-full items-center justify-between gap-3 px-5 py-3.5 text-left transition-colors sm:gap-4 sm:px-6 sm:py-4",
            isOpen ? "bg-[color:var(--color-nav-hover)]/72" : "hover:bg-[color:var(--color-nav-hover)]",
            FOCUS_RING_LIGHT,
          )}
          aria-expanded={isOpen}
          aria-controls={panelId}
        >
          <span className="min-w-0 flex-1 text-pretty text-[14px] font-medium leading-[1.4] tracking-[-0.008em] text-[color:var(--color-text-strong)] sm:text-[14.75px]">
            {question}
          </span>
          <span
            aria-hidden
            className={cn(
              "relative inline-flex h-6 w-6 shrink-0 items-center justify-center rounded-full border transition-colors",
              isOpen
                ? "border-[color:var(--color-menu-accent)]/34 bg-[color:var(--color-nav-hover)]"
                : "border-[color:var(--color-menu-border)]",
            )}
          >
            <span
              className={cn(
                "absolute h-[1.5px] w-2 rounded-full transition-colors",
                isOpen ? "bg-[color:var(--color-menu-accent)]" : "bg-[color:var(--color-menu-subtle)]",
              )}
            />
            <span
              className={cn(
                "absolute h-2 w-[1.5px] rounded-full transition-all duration-200",
                isOpen
                  ? "scale-0 bg-[color:var(--color-menu-accent)]"
                  : "scale-100 bg-[color:var(--color-menu-subtle)]",
              )}
            />
          </span>
        </button>
      </h3>
      <motion.div
        id={panelId}
        aria-labelledby={triggerId}
        aria-hidden={!isOpen}
        initial={false}
        animate={isOpen ? { height: "auto", opacity: 1 } : { height: 0, opacity: 0 }}
        transition={{ duration: reduceMotion ? 0 : 0.24, ease: "easeOut" }}
        className="overflow-hidden"
      >
        <p className="px-5 pb-4 pt-0 text-[13.5px] leading-[1.72] text-[color:var(--color-muted)] sm:px-6 sm:pb-4.5 sm:text-[14px]">
          {answer}
        </p>
      </motion.div>
    </article>
  );
}
