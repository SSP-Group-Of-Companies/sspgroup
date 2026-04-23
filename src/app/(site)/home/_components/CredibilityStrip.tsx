"use client";

import Image from "next/image";
import { motion, useReducedMotion, type Variants } from "framer-motion";
import { Container } from "@/app/(site)/components/layout/Container";
import { cn } from "@/lib/cn";

type TextStat = {
  type: "text";
  value: string;
  label: string;
};

type NetworkStat = {
  type: "network";
  label: string;
  countries: readonly {
    name: string;
    src: string;
    alt: string;
  }[];
};

type Stat = TextStat | NetworkStat;

const STATS: readonly Stat[] = [
  { type: "text", value: "10+", label: "Years in Operation" },
  {
    type: "network",
    label: "Canada, U.S.A. & Mexico",
    countries: [
      { name: "Canada", src: "/_optimized/brand/Canada.png", alt: "Canada flag" },
      { name: "USA", src: "/_optimized/brand/USA.png", alt: "United States flag" },
      { name: "Mexico", src: "/_optimized/brand/Mexico.png", alt: "Mexico flag" },
    ],
  },
  { type: "text", value: "24/7", label: "Tracking & Support" },
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
    <span className="flex h-[clamp(2.42rem,5.25vw,3.2rem)] items-center justify-center overflow-visible">
      <StatFigure className="text-[clamp(2.42rem,5.25vw,3.2rem)] tabular-nums">
        {value}
      </StatFigure>
    </span>
  );
}

/** All three orbs + inner flags share one size so the row matches the
 * 10+ / 24/7 cap band and connector lines read through the true centers. */
const FLAG_ORB = "h-[2.2rem] w-[2.2rem] sm:h-9 sm:w-9" as const;
const FLAG_IMG = "h-[1.45rem] w-[1.45rem] sm:h-6 sm:w-6" as const;

function NetworkValue({ countries }: { countries: NetworkStat["countries"] }) {
  return (
    <div
      className="flex h-[clamp(2.42rem,5.25vw,3.2rem)] w-full max-w-full items-center justify-center"
      aria-label={countries.map((country) => country.name).join(", ")}
    >
      {/* Row height comes from the three orbs; line uses top-1/2 of that row */}
      <div className="relative flex w-full max-w-[10.5rem] items-center justify-center sm:max-w-[11rem]">
        <div
          aria-hidden
          className="pointer-events-none absolute left-[12%] right-[12%] top-1/2 z-0 h-px -translate-y-1/2"
          style={{
            background:
              "linear-gradient(90deg, transparent 0%, color-mix(in srgb, var(--color-ssp-cyan-500) 34%, white) 12%, color-mix(in srgb, var(--color-ssp-cyan-500) 72%, white) 50%, color-mix(in srgb, var(--color-ssp-cyan-500) 34%, white) 88%, transparent 100%)",
          }}
        />
        <div
          aria-hidden
          className="pointer-events-none absolute left-[14%] right-[14%] top-1/2 z-0 h-px -translate-y-1/2 opacity-70"
          style={{
            backgroundImage:
              "repeating-linear-gradient(90deg, transparent 0 5px, color-mix(in srgb, var(--color-ssp-cyan-500) 68%, white) 5px 9px)",
          }}
        />

        <div className="relative z-[1] flex items-center justify-center gap-2 sm:gap-2.5">
          {countries.map((country) => (
            <span
              key={country.name}
              className={cn(
                "group relative flex items-center justify-center overflow-hidden rounded-full",
                "border border-white/85 bg-[linear-gradient(180deg,rgba(255,255,255,0.98),rgba(245,249,253,0.96))]",
                "shadow-[0_10px_24px_rgba(2,6,23,0.09),inset_0_1px_0_rgba(255,255,255,0.92),inset_0_-1px_0_rgba(148,163,184,0.12)]",
                "ring-1 ring-[rgba(16,167,216,0.08)]",
                FLAG_ORB,
              )}
            >
              <span
                aria-hidden
                className="pointer-events-none absolute inset-0 rounded-full bg-[radial-gradient(circle_at_30%_28%,rgba(255,255,255,0.95),transparent_46%)]"
              />
              <Image
                src={country.src}
                alt={country.alt}
                width={32}
                height={32}
                className={cn("relative z-[1] rounded-full object-cover", FLAG_IMG)}
              />
            </span>
          ))}
        </div>
      </div>
    </div>
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
        At a glance
      </h2>
      <Container className="site-page-container pb-8 pt-12 sm:pb-9 sm:pt-14 lg:pb-10 lg:pt-16">
        <motion.ul
          className="mx-auto flex flex-col items-center gap-y-10 sm:flex-row sm:items-stretch sm:justify-center sm:gap-y-0 sm:gap-x-5 md:gap-x-7 lg:gap-x-9"
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, amount: 0.2 }}
          variants={{
            hidden: {},
            show: {
              transition: { staggerChildren: reduceMotion ? 0 : 0.05, delayChildren: 0.03 },
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
              {stat.type === "text" ? (
                <StatValue value={stat.value} />
              ) : (
                <NetworkValue countries={stat.countries} />
              )}
              <p className="mt-3.5 text-[11px] font-semibold uppercase tracking-[0.16em] text-[color:var(--color-muted-light)] sm:text-[11.5px]">
                {stat.label}
              </p>
            </motion.li>
          ))}
        </motion.ul>
      </Container>
    </section>
  );
}
