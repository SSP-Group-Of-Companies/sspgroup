"use client";

import { motion, useReducedMotion, type Variants } from "framer-motion";
import { Container } from "@/app/(site)/components/layout/Container";
import { cn } from "@/lib/cn";

const STATS = [
  { value: "10+", label: "Years in Operation" },
  { value: "3", label: "Countries, One Network" },
  { value: "24/7", label: "Tracking & Support" },
] as const;

const FIGURE_GRADIENT =
  "bg-gradient-to-br from-[color:var(--color-ssp-ink-900)] via-[color:var(--color-ssp-ink-800)] to-[color:var(--color-ssp-cyan-600)] bg-clip-text font-semibold text-transparent";

const FIGURE_SHADOW = "drop-shadow-[0_1px_0_rgba(255,255,255,0.42)]";

function StatFigure({ children, className }: { children: string; className?: string }) {
  return (
    <span
      className={cn(FIGURE_GRADIENT, FIGURE_SHADOW, "block leading-none tracking-[-0.045em]", className)}
      style={{ WebkitBackgroundClip: "text" }}
    >
      {children}
    </span>
  );
}

/**
 * Shared baseline box for all three stat figures — every value renders
 * through the same `StatFigure` span at the same font size, so all
 * three stats share one cap-height, one baseline, and one optical
 * weight. The `+` in "10+" is treated as an inline qualifier (same
 * role the `/` plays in "24/7"), not as a superscript — this
 * guarantees the three stat blocks top-align AND bottom-align with no
 * special-case layout math, and eliminates the glyph-crowding that
 * happens when an absolutely-positioned superscript sits too close
 * to the preceding digit.
 */
function StatValue({ value }: { value: string }) {
  return (
    <span className="flex h-[clamp(2.42rem,5.25vw,3.2rem)] items-end justify-center overflow-visible">
      <StatFigure className="text-[clamp(2.42rem,5.25vw,3.2rem)] tabular-nums">
        {value}
      </StatFigure>
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
      className="relative bg-transparent antialiased"
    >
      <h2 id="home-credibility-strip-heading" className="sr-only">
        SSP at a glance
      </h2>
      <Container className="site-page-container pb-10 pt-12 sm:pb-11 sm:pt-14 lg:pb-12 lg:pt-16">
        <motion.ul
          className="mx-auto flex flex-col items-center gap-y-10 sm:flex-row sm:items-end sm:justify-center sm:gap-y-0 sm:gap-x-5 md:gap-x-7 lg:gap-x-9"
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
              transition={{ duration: reduceMotion ? 0 : 0.38, ease: [0.22, 1, 0.36, 1] }}
              className={cn(
                "flex min-w-0 flex-col items-center text-center",
                index > 0 &&
                  "sm:border-l sm:border-[color:var(--color-border-light)]/45 sm:pl-5 md:pl-6 lg:pl-7",
              )}
            >
              <StatValue value={stat.value} />
              <p className="mt-3.5 text-[11px] font-semibold uppercase tracking-[0.14em] text-[color:var(--color-muted-light)] sm:text-[11.25px]">
                {stat.label}
              </p>
            </motion.li>
          ))}
        </motion.ul>
      </Container>
    </section>
  );
}
