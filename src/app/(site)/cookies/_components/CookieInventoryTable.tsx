"use client";

import { motion, useReducedMotion, type Variants } from "framer-motion";

import { COOKIE_CATEGORIES, COOKIE_INVENTORY } from "@/config/cookies";

/**
 * Structured, scannable inventory rendered under the "Cookie inventory"
 * section of /cookies. Card-per-cookie design so it stays readable on
 * phones while still feeling like an enterprise reference.
 */
export function CookieInventoryTable() {
  const reduceMotion = useReducedMotion() ?? false;

  const stagger: Variants = reduceMotion
    ? { hidden: { opacity: 1 }, show: { opacity: 1 } }
    : { hidden: {}, show: { transition: { staggerChildren: 0.04, delayChildren: 0.02 } } };

  const revealUp: Variants = reduceMotion
    ? { hidden: { opacity: 1, y: 0 }, show: { opacity: 1, y: 0 } }
    : { hidden: { opacity: 1, y: 10 }, show: { opacity: 1, y: 0 } };

  return (
    <div className="mt-3 flex flex-col gap-5">
      {COOKIE_CATEGORIES.map((category) => {
        const entries = COOKIE_INVENTORY.filter((c) => c.categoryId === category.id);
        if (entries.length === 0) return null;

        return (
          <motion.section
            key={category.id}
            aria-label={`${category.label} cookies`}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true, amount: 0.2 }}
            variants={stagger}
            className="rounded-2xl border border-[color:var(--color-border-light-soft)] bg-white p-4 sm:p-5"
          >
            <div className="mb-3 flex flex-wrap items-center gap-2">
              <span
                aria-hidden
                className="inline-flex h-1.5 w-1.5 rounded-full bg-[color:var(--color-ssp-cyan-500)]/70"
              />
              <h3 className="text-[12.75px] font-semibold uppercase tracking-[0.12em] text-[color:var(--color-ssp-cyan-600)]">
                {category.label}
              </h3>
              {category.required ? (
                <span className="inline-flex items-center rounded-full border border-[color:var(--color-border-light)] bg-[color:var(--color-surface-0-light)] px-2 py-0.5 text-[10.5px] font-semibold uppercase tracking-[0.1em] text-[color:var(--color-muted)]">
                  Always on
                </span>
              ) : null}
            </div>

            <ul className="flex flex-col gap-2.5">
              {entries.map((entry) => (
                <motion.li
                  key={entry.name}
                  variants={revealUp}
                  transition={{ duration: reduceMotion ? 0 : 0.32, ease: "easeOut" }}
                  className="rounded-xl border border-[color:var(--color-border-light-soft)] bg-[color:var(--color-surface-0-light)]/55 px-4 py-3"
                >
                  <div className="flex flex-wrap items-baseline gap-x-3 gap-y-1">
                    <code className="rounded-md bg-white px-1.5 py-0.5 text-[12px] font-semibold text-[color:var(--color-text-strong)] ring-1 ring-[color:var(--color-border-light-soft)]">
                      {entry.name}
                    </code>
                    <span className="text-[11px] font-semibold uppercase tracking-[0.1em] text-[color:var(--color-muted)]">
                      {entry.source === "first_party" ? "First-party" : "Third-party"} · {entry.duration}
                    </span>
                  </div>
                  <p className="mt-1.5 text-[13px] leading-[1.62] text-[color:var(--color-muted)]">
                    {entry.purpose}
                  </p>
                  <p className="mt-1 text-[11.5px] text-[color:var(--color-subtle)]">
                    Provider: {entry.provider}
                  </p>
                </motion.li>
              ))}
            </ul>
          </motion.section>
        );
      })}
    </div>
  );
}
