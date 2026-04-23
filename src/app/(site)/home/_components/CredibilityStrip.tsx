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
    <span className="flex h-[clamp(2.42rem,5.25vw,3.2rem)] items-end justify-center overflow-visible">
      <StatFigure className="text-[clamp(2.42rem,5.25vw,3.2rem)] tabular-nums">
        {value}
      </StatFigure>
    </span>
  );
}

function NetworkValue({ countries }: { countries: NetworkStat["countries"] }) {
  return (
    <div
      className="flex h-[clamp(2.42rem,5.25vw,3.2rem)] w-full max-w-full items-end justify-center"
      aria-label={countries.map((country) => country.name).join(", ")}
    >
      <div className="relative flex h-[3.05rem] w-[9.5rem] items-end justify-center sm:w-[10.1rem]">
        <div
          aria-hidden
          className="absolute inset-x-2.5 top-1/2 h-px -translate-y-1/2"
          style={{
            background:
              "linear-gradient(90deg, transparent 0%, color-mix(in srgb, var(--color-ssp-cyan-500) 34%, white) 16%, color-mix(in srgb, var(--color-ssp-cyan-500) 72%, white) 50%, color-mix(in srgb, var(--color-ssp-cyan-500) 34%, white) 84%, transparent 100%)",
          }}
        />
        <div
          aria-hidden
          className="absolute inset-x-4 top-1/2 h-px -translate-y-1/2 opacity-70"
          style={{
            backgroundImage:
              "repeating-linear-gradient(90deg, transparent 0 5px, color-mix(in srgb, var(--color-ssp-cyan-500) 68%, white) 5px 9px)",
          }}
        />

        <div className="relative z-[1] flex items-end justify-center gap-2 sm:gap-2.5">
          {countries.map((country, index) => {
            const isCenter = index === 1;
            return (
            <span
              key={country.name}
              className={cn(
                "group relative flex items-center justify-center overflow-hidden rounded-full",
                "border border-white/85 bg-[linear-gradient(180deg,rgba(255,255,255,0.98),rgba(245,249,253,0.96))]",
                "shadow-[0_10px_24px_rgba(2,6,23,0.09),inset_0_1px_0_rgba(255,255,255,0.92),inset_0_-1px_0_rgba(148,163,184,0.12)]",
                "ring-1 ring-[rgba(16,167,216,0.08)]",
                isCenter ? "h-[2.32rem] w-[2.32rem]" : "h-[2.05rem] w-[2.05rem]",
              )}
            >
              <span
                aria-hidden
                className="pointer-events-none absolute inset-0 rounded-full bg-[radial-gradient(circle_at_30%_28%,rgba(255,255,255,0.95),transparent_46%)]"
              />
              <Image
                src={country.src}
                alt={country.alt}
                width={isCenter ? 34 : 30}
                height={isCenter ? 34 : 30}
                className={cn(
                  "relative z-[1] rounded-full object-cover",
                  isCenter ? "h-[1.62rem] w-[1.62rem]" : "h-[1.4rem] w-[1.4rem]",
                )}
              />
            </span>
            );
          })}
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
        SSP at a glance
      </h2>
      <Container className="site-page-container pb-8 pt-12 sm:pb-9 sm:pt-14 lg:pb-10 lg:pt-16">
        <motion.ul
          className="mx-auto flex flex-col items-center gap-y-10 sm:flex-row sm:items-end sm:justify-center sm:gap-y-0 sm:gap-x-5 md:gap-x-7 lg:gap-x-9"
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
