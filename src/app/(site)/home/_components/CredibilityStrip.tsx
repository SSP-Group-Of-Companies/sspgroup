"use client";

import { motion, useReducedMotion, type Variants } from "framer-motion";
import { Container } from "@/app/(site)/components/layout/Container";
import { cn } from "@/lib/cn";

const STATS = [
  { value: "10+", label: "Years Operating" },
  { value: "3", label: "Countries Covered" },
  { value: "24/7", label: "Tracking & Support Access" },
] as const;

/** Large figures — ink base with a restrained cyan lift (SSP system colors, no arbitrary hex). */
function StatFigure({ children }: { children: string }) {
  return (
    <span
      className={cn(
        "block bg-gradient-to-br from-[color:var(--color-ssp-ink-900)] via-[color:var(--color-ssp-ink-800)] to-[color:var(--color-ssp-cyan-600)]",
        "bg-clip-text font-semibold tracking-[-0.04em] text-transparent",
        "text-[clamp(2.5rem,5.5vw,3.35rem)] leading-[0.95]",
        "drop-shadow-[0_1px_0_rgba(255,255,255,0.35)]",
      )}
      style={{ WebkitBackgroundClip: "text" }}
    >
      {children}
    </span>
  );
}

export function CredibilityStrip() {
  const reduceMotion = useReducedMotion() ?? false;

  const reveal: Variants = reduceMotion
    ? { hidden: { opacity: 1, y: 0 }, show: { opacity: 1, y: 0 } }
    : { hidden: { opacity: 1, y: 8 }, show: { opacity: 1, y: 0 } };

  return (
    <section
      aria-labelledby="home-credibility-strip-heading"
      className="border-b border-[color:var(--color-border-light-soft)] bg-[color:var(--color-surface-0-light)]"
    >
      <h2 id="home-credibility-strip-heading" className="sr-only">
        SSP at a glance
      </h2>
      <Container className="site-page-container py-11 sm:py-14 lg:py-16">
        <motion.ul
          className="mx-auto grid gap-y-10 sm:grid-cols-3 sm:gap-y-0"
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, amount: 0.35 }}
          variants={{
            hidden: {},
            show: {
              transition: { staggerChildren: reduceMotion ? 0 : 0.08, delayChildren: 0.04 },
            },
          }}
        >
          {STATS.map((stat, index) => (
            <motion.li
              key={stat.label}
              variants={reveal}
              transition={{ duration: reduceMotion ? 0 : 0.38, ease: "easeOut" }}
              className={cn(
                "flex flex-col items-center text-center",
                "sm:px-6 md:px-8",
                index > 0 && "sm:border-l sm:border-[color:var(--color-border-light-soft)]",
              )}
            >
              <StatFigure>{stat.value}</StatFigure>
              <p className="mt-2.5 text-[11px] font-medium uppercase tracking-[0.14em] text-[color:var(--color-muted-light)] sm:text-[11.5px]">
                {stat.label}
              </p>
            </motion.li>
          ))}
        </motion.ul>
      </Container>
    </section>
  );
}
