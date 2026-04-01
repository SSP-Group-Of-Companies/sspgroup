"use client";

import { useState, type ReactNode } from "react";
import { AnimatePresence, motion, useReducedMotion, type Variants } from "framer-motion";
import { cn } from "@/lib/cn";
import { Container } from "@/app/(site)/components/layout/Container";

type SharedFaqItem = {
  q: string;
  a: string;
};

type SharedFaqSectionProps = {
  eyebrow: ReactNode;
  title: string;
  description: string;
  items: readonly SharedFaqItem[];
  theme?: "light" | "dark";
  panelIdPrefix?: string;
};

export function SharedFaqSection({
  eyebrow,
  title,
  description,
  items,
  theme = "light",
  panelIdPrefix = "faq",
}: SharedFaqSectionProps) {
  const reduceMotion = !!useReducedMotion();
  const [openIdx, setOpenIdx] = useState(0);

  const revealUp: Variants = reduceMotion
    ? { hidden: { opacity: 1, y: 0 }, show: { opacity: 1, y: 0 } }
    : { hidden: { opacity: 1, y: 10 }, show: { opacity: 1, y: 0 } };

  const cardStagger: Variants = reduceMotion
    ? { hidden: { opacity: 1 }, show: { opacity: 1 } }
    : { hidden: {}, show: { transition: { staggerChildren: 0.05, delayChildren: 0.03 } } };

  const focusRing =
    theme === "dark"
      ? "focus:outline-none focus-visible:ring-2 focus-visible:ring-white/40 focus-visible:ring-offset-2 focus-visible:ring-offset-[color:var(--color-company-ink)]"
      : "focus:outline-none focus-visible:ring-2 focus-visible:ring-[color:var(--color-nav-ring)] focus-visible:ring-offset-1";

  const sectionClasses =
    theme === "dark"
      ? "border-t border-white/8 bg-[linear-gradient(140deg,var(--color-company-hero-midnight-start),var(--color-company-ink)_58%,var(--color-company-hero-midnight-end))] py-20 sm:py-24"
      : "relative overflow-hidden border-y border-[color:var(--color-menu-border)] bg-[linear-gradient(180deg,#f5f8fb,#eef3f8)] py-20 sm:py-24";

  const titleClasses =
    theme === "dark"
      ? "mt-3 text-3xl leading-tight font-semibold text-white"
      : "mt-3 text-3xl leading-tight font-semibold text-[color:var(--color-text)]";

  const descriptionClasses =
    theme === "dark"
      ? "mt-4 text-[15px] leading-8 text-white/64"
      : "mt-4 text-[15px] leading-8 text-[color:var(--color-muted)]";

  const cardBorder = theme === "dark" ? "border-white/14 bg-white/[0.04]" : "border-[color:var(--color-menu-border)] bg-white";
  const itemDivider = theme === "dark" ? "border-white/12" : "border-[color:var(--color-menu-border)]";
  const questionColor = theme === "dark" ? "text-white" : "text-[color:var(--color-text)]";
  const answerColor = theme === "dark" ? "text-white/68" : "text-[color:var(--color-nav-muted)]";
  const hoverBg = theme === "dark" ? "hover:bg-white/[0.03]" : "hover:bg-[color:var(--color-nav-hover)]";
  const iconClosedColor = theme === "dark" ? "bg-white/55" : "bg-[color:var(--color-menu-subtle)]";
  const iconClosedBorder = theme === "dark" ? "border-white/18" : "border-[color:var(--color-menu-border)]";
  const iconOpenColor = theme === "dark" ? "bg-[color:var(--color-ssp-cyan-500)]" : "bg-[color:var(--color-menu-accent)]";
  const iconOpenBorder = theme === "dark" ? "border-[color:var(--color-ssp-cyan-500)]/35" : "border-[color:var(--color-menu-accent)]/30";

  return (
    <section className={sectionClasses}>
      <Container className="site-page-container">
        <div className="grid gap-7 lg:grid-cols-12">
          <motion.div
            className="lg:col-span-4"
            initial="hidden"
            whileInView="show"
            viewport={{ once: true, amount: 0.15 }}
            variants={revealUp}
            transition={{ duration: reduceMotion ? 0 : 0.45, ease: "easeOut" }}
          >
            {eyebrow}
            <h2 className={titleClasses}>{title}</h2>
            <p className={descriptionClasses}>{description}</p>
          </motion.div>

          <motion.div
            className="lg:col-span-8"
            initial="hidden"
            whileInView="show"
            viewport={{ once: true, amount: 0.2 }}
            variants={cardStagger}
          >
            <motion.div
              variants={revealUp}
              transition={{ duration: reduceMotion ? 0 : 0.35, ease: "easeOut" }}
              className={cn(
                "overflow-hidden rounded-2xl border shadow-[0_8px_24px_rgba(2,6,23,0.06)]",
                cardBorder,
              )}
            >
              {items.map((item, idx) => {
                const isOpen = idx === openIdx;
                const panelId = `${panelIdPrefix}-panel-${idx}`;
                return (
                  <article key={item.q} className={idx < items.length - 1 ? `border-b ${itemDivider}` : ""}>
                    <button
                      type="button"
                      onClick={() => setOpenIdx((p) => (p === idx ? -1 : idx))}
                      className={cn(
                        "flex w-full items-start justify-between gap-3 px-4 py-4 text-left transition-colors sm:gap-4 sm:px-6 sm:py-5",
                        hoverBg,
                        focusRing,
                      )}
                      aria-expanded={isOpen}
                      aria-controls={panelId}
                    >
                      <h3 className={cn("text-[15px] leading-snug font-semibold sm:text-[17px]", questionColor)}>
                        {item.q}
                      </h3>
                      <span
                        aria-hidden
                        className={cn(
                          "relative mt-0.5 inline-flex h-6 w-6 shrink-0 items-center justify-center rounded-full border transition-colors",
                          isOpen ? iconOpenBorder : iconClosedBorder,
                        )}
                      >
                        <span
                          className={cn(
                            "absolute h-[1.5px] w-2.5 rounded-full transition-colors",
                            isOpen ? iconOpenColor : iconClosedColor,
                          )}
                        />
                        <span
                          className={cn(
                            "absolute h-2.5 w-[1.5px] rounded-full transition-all duration-200",
                            isOpen
                              ? `scale-0 ${iconOpenColor}`
                              : `scale-100 ${iconClosedColor}`,
                          )}
                        />
                      </span>
                    </button>
                    <AnimatePresence initial={false}>
                      {isOpen ? (
                        <motion.div
                          id={panelId}
                          role="region"
                          initial={{ height: 0, opacity: 0 }}
                          animate={{ height: "auto", opacity: 1 }}
                          exit={{ height: 0, opacity: 0 }}
                          transition={{ duration: reduceMotion ? 0 : 0.24, ease: "easeOut" }}
                          className="overflow-hidden"
                        >
                          <p className={cn("px-4 pb-4 text-sm leading-7 sm:px-6 sm:pb-5", answerColor)}>{item.a}</p>
                        </motion.div>
                      ) : null}
                    </AnimatePresence>
                  </article>
                );
              })}
            </motion.div>
          </motion.div>
        </div>
      </Container>
    </section>
  );
}
