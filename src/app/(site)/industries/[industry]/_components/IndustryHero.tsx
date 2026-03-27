"use client";

import Image from "next/image";
import Link from "next/link";
import { motion, useReducedMotion, type Variants } from "framer-motion";
import { ChevronLeft } from "lucide-react";
import { Container } from "@/app/(site)/components/layout/Container";
import { SectionEyebrow } from "@/app/(site)/components/ui/SectionEyebrow";
import { cn } from "@/lib/cn";
import type { IndustryPageModel, IndustryHeroTheme } from "@/config/industryPages";
import { THEME_ACCENT, THEME_BG, FOCUS_RING_DARK } from "./industryTheme";

/* ─── Theme gradient overlay — glow positioned right ─── */
function ThemeGradientOverlay({ theme }: { theme: IndustryHeroTheme }) {
  const configs: Record<IndustryHeroTheme, [string, string]> = {
    green: ["rgba(153,207,120,0.18)", "rgba(74,124,58,0.10)"],
    red: ["rgba(140,156,178,0.16)", "rgba(71,85,105,0.10)"],
    blue: ["rgba(37,99,235,0.14)", "rgba(59,130,246,0.08)"],
    slate: ["rgba(71,85,105,0.14)", "rgba(51,65,85,0.08)"],
    amber: ["rgba(245,158,11,0.14)", "rgba(217,119,6,0.08)"],
    steel: ["rgba(100,116,139,0.12)", "rgba(71,85,105,0.08)"],
    teal: ["rgba(95,213,200,0.16)", "rgba(61,176,168,0.09)"],
  };
  const [main, secondary] = configs[theme] ?? configs.red;
  return (
    <>
      <div
        className="absolute inset-0"
        style={{
          background: `radial-gradient(ellipse 900px 500px at 70% 40%, ${main}, transparent 58%)`,
        }}
      />
      <div
        className="absolute inset-0"
        style={{
          background: `radial-gradient(800px 400px at 20% 20%, ${secondary}, transparent 55%)`,
        }}
      />
    </>
  );
}

/* ─── Floating Lucide-style icons — clean professional line icons ─── */
function FloatingIcons() {
  const s = "currentColor";
  return (
    <div className="pointer-events-none absolute inset-0 hidden text-white sm:block" aria-hidden>
      <svg
        className="absolute left-[6%] top-[15%] h-10 w-10 opacity-[0.12] lg:left-[8%] lg:h-12 lg:w-12"
        viewBox="0 0 24 24"
        fill="none"
        stroke={s}
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      >
        <path d="M14 18V6a2 2 0 0 0-2-2H4a2 2 0 0 0-2 2v11a1 1 0 0 0 1 1h2" />
        <path d="M15 18H9" />
        <path d="M19 18h2a1 1 0 0 0 1-1v-3.65a1 1 0 0 0-.22-.624l-3.48-4.35A1 1 0 0 0 17.52 8H14" />
        <circle cx="17" cy="18" r="2" />
        <circle cx="7" cy="18" r="2" />
      </svg>
      <svg
        className="absolute right-[7%] top-[12%] h-10 w-10 opacity-[0.12] lg:right-[9%] lg:h-12 lg:w-12"
        viewBox="0 0 24 24"
        fill="none"
        stroke={s}
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      >
        <rect width="8" height="4" x="8" y="2" rx="1" ry="1" />
        <path d="M16 4h2a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2V6a2 2 0 0 1 2-2h2" />
        <path d="m9 14 2 2 4-4" />
      </svg>
      <svg
        className="absolute left-[5%] top-[52%] h-9 w-9 -translate-y-1/2 opacity-[0.09] lg:left-[6%] lg:h-11 lg:w-11"
        viewBox="0 0 24 24"
        fill="none"
        stroke={s}
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      >
        <path d="M12.22 2h-.44a2 2 0 0 0-2 2v.18a2 2 0 0 1-1 1.73l-.43.25a2 2 0 0 1-2 0l-.15-.08a2 2 0 0 0-2.73.73l-.22.38a2 2 0 0 0 .73 2.73l.15.1a2 2 0 0 1 1 1.72v.51a2 2 0 0 1-1 1.74l-.15.09a2 2 0 0 0-.73 2.73l.22.38a2 2 0 0 0 2.73.73l.15-.08a2 2 0 0 1 2 0l.43.25a2 2 0 0 1 1 1.73V20a2 2 0 0 0 2 2h.44a2 2 0 0 0 2-2v-.18a2 2 0 0 1 1-1.73l.43-.25a2 2 0 0 1 2 0l.15.08a2 2 0 0 0 2.73-.73l.22-.39a2 2 0 0 0-.73-2.73l-.15-.08a2 2 0 0 1-1-1.74v-.5a2 2 0 0 1 1-1.74l.15-.09a2 2 0 0 0 .73-2.73l-.22-.38a2 2 0 0 0-2.73-.73l-.15.08a2 2 0 0 1-2 0l-.43-.25a2 2 0 0 1-1-1.73V4a2 2 0 0 0-2-2z" />
        <circle cx="12" cy="12" r="3" />
      </svg>
      <svg
        className="absolute bottom-[16%] right-[6%] h-9 w-9 opacity-[0.10] lg:right-[8%] lg:h-11 lg:w-11"
        viewBox="0 0 24 24"
        fill="none"
        stroke={s}
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      >
        <path d="M3 3v18h18" />
        <path d="M18 17V9" />
        <path d="M13 17V5" />
        <path d="M8 17v-3" />
      </svg>
      <svg
        className="absolute bottom-[20%] left-[10%] h-8 w-8 opacity-[0.08] lg:h-10 lg:w-10"
        viewBox="0 0 24 24"
        fill="none"
        stroke={s}
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      >
        <path d="M20 13c0 5-3.5 7.5-7.66 8.95a1 1 0 0 1-.67-.01C7.5 20.5 4 18 4 13V6a1 1 0 0 1 1-1c2 0 4.5-1.2 6.24-2.72a1.17 1.17 0 0 1 1.52 0C14.51 3.81 17 5 19 5a1 1 0 0 1 1 1z" />
        <path d="m9 12 2 2 4-4" />
      </svg>
      <svg
        className="absolute right-[4%] top-[48%] h-9 w-9 opacity-[0.08] lg:right-[5%] lg:h-10 lg:w-10"
        viewBox="0 0 24 24"
        fill="none"
        stroke={s}
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      >
        <path d="M15 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V7Z" />
        <path d="M14 2v4a2 2 0 0 0 2 2h4" />
        <path d="M10 9H8" />
        <path d="M16 13H8" />
        <path d="M16 17H8" />
      </svg>
    </div>
  );
}

function useAnimations() {
  const reduceMotion = useReducedMotion();

  const stagger: Variants = reduceMotion
    ? { hidden: { opacity: 1 }, show: { opacity: 1 } }
    : { hidden: {}, show: { transition: { staggerChildren: 0.1, delayChildren: 0.08 } } };

  const reveal: Variants = reduceMotion
    ? { hidden: { opacity: 1, y: 0 }, show: { opacity: 1, y: 0 } }
    : { hidden: { opacity: 0, y: 20 }, show: { opacity: 1, y: 0 } };

  return { reduceMotion, stagger, reveal };
}

function AutomotiveHeroBadge({ accentColor }: { accentColor: string }) {
  const stats = [
    { value: "24 / 7", label: "Ops desk" },
    { value: "CA / US / MX", label: "Corridors" },
  ];

  return (
    <div className="w-full max-w-[16.5rem] rounded-[22px] border border-white/14 bg-[linear-gradient(180deg,rgba(12,17,24,0.8),rgba(12,17,24,0.72))] p-3 shadow-[0_24px_60px_rgba(2,8,23,0.38)] backdrop-blur-xl">
      <div className="rounded-[18px] border border-white/10 bg-[#10161d]/92 p-4">
        <div className="flex items-start justify-between gap-3">
          <div>
            <p className="text-[10px] font-semibold uppercase tracking-[0.16em] text-white/45">
              Automotive Program
            </p>
            <p className="mt-1 text-[13px] font-semibold leading-tight text-white">
              Enclosed, sequenced, and cross-border freight with named control.
            </p>
          </div>
          <span className="inline-flex h-2.5 w-2.5 rounded-full bg-emerald-400" aria-hidden />
        </div>

        <div className="mt-4 grid grid-cols-2 gap-2">
          {stats.map((stat) => (
            <div key={stat.label} className="rounded-xl border border-white/8 bg-white/[0.03] px-2.5 py-2.5">
              <p className="text-[11px] font-semibold tracking-tight text-white">{stat.value}</p>
              <p className="mt-1 text-[9px] uppercase tracking-[0.14em] text-white/40">{stat.label}</p>
            </div>
          ))}
        </div>

        <div className="mt-4 rounded-xl border border-white/8 bg-black/10 px-3 py-2.5">
          <p className="text-[10px] font-semibold uppercase tracking-[0.14em]" style={{ color: accentColor }}>
            Protection posture
          </p>
          <p className="mt-1 text-[11px] leading-[1.55] text-white/72">
            Named ownership and decision-ready exception reporting.
          </p>
        </div>
      </div>
    </div>
  );
}

function AutomotiveHeroMedia({ accentColor }: { accentColor: string }) {
  return (
    <div className="relative mx-auto w-full max-w-[43rem]">
      <div
        className="absolute -right-8 top-10 h-36 w-36 rounded-full blur-3xl"
        style={{ backgroundColor: `${accentColor}22` }}
        aria-hidden
      />
      <div
        className="absolute -left-10 bottom-8 h-32 w-32 rounded-full blur-3xl"
        style={{ backgroundColor: `${accentColor}16` }}
        aria-hidden
      />
      <div className="relative overflow-hidden rounded-[30px] border border-white/12 bg-[#121923] shadow-[0_28px_70px_rgba(2,8,23,0.42)]">
        <div className="relative aspect-[4/4.6] sm:aspect-[16/12]">
          <Image
            src="/_optimized/industries/automotive-hero-premium.png"
            alt="Enclosed automotive transport loading finished vehicles at an industrial facility"
            fill
            priority
            className="object-cover object-[56%_50%]"
            sizes="(max-width: 1024px) 100vw, 42rem"
          />
          <div className="absolute inset-0 bg-[linear-gradient(125deg,rgba(7,11,18,0.42)_0%,rgba(7,11,18,0.08)_34%,rgba(7,11,18,0.4)_100%)]" />
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_24%_18%,rgba(255,255,255,0.16),transparent_28%)]" />
          <div className="absolute inset-x-0 bottom-0 h-32 bg-gradient-to-t from-[#0c1117]/62 via-[#0c1117]/14 to-transparent" />
        </div>

        <div className="pointer-events-none absolute inset-0 rounded-[30px] ring-1 ring-inset ring-white/8" />

        <div className="absolute left-3 bottom-3 sm:left-6 sm:bottom-6">
          <AutomotiveHeroBadge accentColor={accentColor} />
        </div>

        <div className="absolute right-3 top-3 sm:right-5 sm:top-5">
          <div className="rounded-full border border-white/12 bg-black/30 px-3 py-1.5 text-[10px] font-semibold uppercase tracking-[0.14em] text-white/78 backdrop-blur-md">
            Finished vehicle transport
          </div>
        </div>
      </div>
    </div>
  );
}

type ImmersiveHeroMediaConfig = {
  src: string;
  alt: string;
  position: string;
  themeColor: string;
  themeRgb: string;
  secondaryOrb?: string;
};

const HERO_MEDIA_CONFIG: Record<string, ImmersiveHeroMediaConfig> = {
  manufacturing: {
    src: "/_optimized/industries/manufacturing-hero-premium-v1.png",
    alt: "Premium manufacturing warehouse with staged raw materials, industrial components, and controlled forklift movement",
    position: "object-[54%_48%]",
    themeColor: "#1a1f2e",
    themeRgb: "26,31,46",
    secondaryOrb: "rgba(203, 213, 225, 0.04)",
  },
  food: {
    src: "/_optimized/industries/food-hero-premium-v6.png",
    alt: "Cold-chain warehouse stocked with fresh produce crates and palletized food freight under atmospheric lighting",
    position: "object-[50%_35%]",
    themeColor: "#133522",
    themeRgb: "19,53,34",
    secondaryOrb: "rgba(153, 207, 120, 0.04)",
  },
  "steel-aluminum": {
    src: "/_optimized/industries/steel-hero-premium-v1.png",
    alt: "Premium steel and aluminum warehouse environment with staged metal freight",
    position: "object-[58%_46%]",
    themeColor: "#13263a",
    themeRgb: "19,38,58",
    secondaryOrb: "rgba(96, 165, 250, 0.04)",
  },
  retail: {
    src: "/_optimized/industries/retail-hero-premium-v3.png",
    alt: "Premium retail environment with in-store replenishment activity",
    position: "object-[56%_50%]",
    themeColor: "#0c1929",
    themeRgb: "12,25,41",
  },
  construction: {
    src: "/_optimized/industries/construction-hero-premium-v1.png",
    alt: "Construction materials staging yard at golden hour with lumber, steel beams, and heavy equipment loading",
    position: "object-[50%_38%]",
    themeColor: "#231a0d",
    themeRgb: "35,26,13",
    secondaryOrb: "rgba(251, 191, 36, 0.04)",
  },
  "chemical-plastics": {
    src: "/_optimized/industries/chemical-hero-premium-v1.png",
    alt: "Premium chemical and plastics logistics warehouse with controlled industrial storage and loading activity",
    position: "object-[58%_50%]",
    themeColor: "#0c242d",
    themeRgb: "12,36,45",
  },
};

function ImmersiveHeroMedia({
  accentColor,
  config,
}: {
  accentColor: string;
  config: ImmersiveHeroMediaConfig;
}) {
  const { src, alt, position, themeColor, themeRgb, secondaryOrb } = config;
  return (
    <div className="pointer-events-none absolute inset-0">
      <div
        className="absolute right-[6%] top-[8%] h-56 w-56 rounded-full blur-[100px]"
        style={{ backgroundColor: `${accentColor}0c` }}
        aria-hidden
      />
      <div
        className="absolute left-[10%] bottom-[14%] h-44 w-44 rounded-full blur-[100px]"
        style={{ backgroundColor: secondaryOrb ?? `${accentColor}08` }}
        aria-hidden
      />

      <div
        className="absolute inset-0 overflow-hidden"
        style={{
          maskImage:
            "radial-gradient(ellipse 92% 88% at 50% 46%, black 42%, transparent 72%)",
          WebkitMaskImage:
            "radial-gradient(ellipse 92% 88% at 50% 46%, black 42%, transparent 72%)",
        }}
      >
        <div className="absolute inset-0">
          <Image
            src={src}
            alt={alt}
            fill
            priority
            className={`object-cover ${position}`}
            sizes="100vw"
          />
        </div>
        <div
          className="absolute inset-0"
          style={{
            background: `linear-gradient(180deg,rgba(${themeRgb},0.36) 0%,rgba(${themeRgb},0.10) 22%,rgba(${themeRgb},0.06) 50%,rgba(${themeRgb},0.44) 100%)`,
          }}
        />
      </div>

      <div
        className="absolute inset-0"
        style={{
          boxShadow: `inset 0 0 120px 60px rgba(${themeRgb},0.92), inset 0 0 240px 120px rgba(${themeRgb},0.48)`,
        }}
        aria-hidden
      />

      <div className="absolute inset-y-0 left-0 w-[14%] bg-gradient-to-r to-transparent" style={{ backgroundImage: `linear-gradient(to right, ${themeColor}, ${themeColor}99, transparent)` }} />
      <div className="absolute inset-y-0 right-0 w-[14%] bg-gradient-to-l to-transparent" style={{ backgroundImage: `linear-gradient(to left, ${themeColor}, ${themeColor}99, transparent)` }} />
      <div className="absolute inset-x-0 top-0 h-24" style={{ backgroundImage: `linear-gradient(to bottom, ${themeColor}, ${themeColor}80, transparent)` }} />
      <div className="absolute inset-x-0 bottom-0 h-36" style={{ backgroundImage: `linear-gradient(to top, ${themeColor}, ${themeColor}99, transparent)` }} />

      <div
        className="absolute inset-0"
        style={{
          background: `radial-gradient(ellipse 720px 340px at 50% 42%, rgba(${themeRgb},0.46), transparent 68%)`,
        }}
      />
    </div>
  );
}

type CenteredHeroStyle = {
  valueHeadlineColor: string;
  ctaBg: string;
  ctaText: string;
  ctaShadow: string;
  textShadowRgb: string;
};

const CENTERED_HERO_STYLES: Record<string, CenteredHeroStyle> = {
  manufacturing: {
    valueHeadlineColor: "#d5dde8",
    ctaBg: "#d5dde8",
    ctaText: "#121924",
    ctaShadow: "0 10px 28px rgba(213,221,232,0.18)",
    textShadowRgb: "26,31,46",
  },
  food: {
    valueHeadlineColor: "#d7e7bc",
    ctaBg: "#b9d98f",
    ctaText: "#092016",
    ctaShadow: "0 10px 28px rgba(185,217,143,0.24)",
    textShadowRgb: "10,30,18",
  },
  construction: {
    valueHeadlineColor: "#f5d990",
    ctaBg: "#fbbf24",
    ctaText: "#1a1204",
    ctaShadow: "0 10px 28px rgba(251,191,36,0.24)",
    textShadowRgb: "35,26,13",
  },
  "chemical-plastics": {
    valueHeadlineColor: "#b8efe8",
    ctaBg: "#8be4da",
    ctaText: "#08151d",
    ctaShadow: "0 10px 28px rgba(139,228,218,0.22)",
    textShadowRgb: "12,36,45",
  },
  retail: {
    valueHeadlineColor: "#a9c8ff",
    ctaBg: "#4f97ff",
    ctaText: "#ffffff",
    ctaShadow: "0 10px 28px rgba(79,151,255,0.34)",
    textShadowRgb: "12,25,41",
  },
  "steel-aluminum": {
    valueHeadlineColor: "#d7e3ec",
    ctaBg: "#d7e3ec",
    ctaText: "#0d1824",
    ctaShadow: "0 10px 28px rgba(215,227,236,0.18)",
    textShadowRgb: "19,38,58",
  },
};

function CenteredHeroContent({
  hero,
  style,
  accentColor,
  heroSignals,
  reveal,
  reduceMotion,
}: {
  hero: IndustryPageModel["hero"];
  style: CenteredHeroStyle;
  accentColor: string;
  heroSignals: string[];
  reveal: Variants;
  reduceMotion: boolean | null;
}) {
  return (
    <div className="relative mx-auto max-w-5xl px-2 text-center sm:px-6">
      <motion.div
        variants={reveal}
        transition={{ duration: reduceMotion ? 0 : 0.35, ease: "easeOut" }}
        className="flex justify-center"
      >
        <SectionEyebrow
          label={hero.kicker ?? "Industry Logistics"}
          accentColor={accentColor}
          light
        />
      </motion.div>

      {hero.valueHeadline ? (
        <motion.p
          variants={reveal}
          transition={{ duration: reduceMotion ? 0 : 0.4, ease: "easeOut" }}
          className="mt-5 text-[12px] font-semibold uppercase tracking-[0.22em] drop-shadow-[0_2px_8px_rgba(0,0,0,0.4)] sm:text-[12px]"
          style={{ color: style.valueHeadlineColor }}
        >
          {hero.valueHeadline}
        </motion.p>
      ) : null}

      <motion.h1
        id="industry-hero-heading"
        variants={reveal}
        transition={{ duration: reduceMotion ? 0 : 0.45, ease: "easeOut" }}
        className="mx-auto mt-4 max-w-4xl text-[2.6rem] font-bold leading-[0.96] tracking-tight text-white sm:text-[3.35rem] lg:text-[4.15rem]"
        style={{
          textShadow: `0 2px 16px rgba(0,0,0,0.5), 0 8px 32px rgba(${style.textShadowRgb},0.4)`,
        }}
      >
        {hero.title}
      </motion.h1>

      <motion.p
        variants={reveal}
        transition={{ duration: reduceMotion ? 0 : 0.4, ease: "easeOut" }}
        className="mx-auto mt-5 max-w-3xl text-[15px] leading-[1.85] text-white/90 drop-shadow-[0_2px_8px_rgba(0,0,0,0.4)] sm:text-[16px]"
      >
        {hero.description}
      </motion.p>

      {heroSignals.length > 0 ? (
        <motion.ul
          variants={reveal}
          transition={{ duration: reduceMotion ? 0 : 0.42, ease: "easeOut" }}
          className="mx-auto mt-6 grid max-w-2xl gap-2 sm:grid-cols-3"
        >
          {heroSignals.map((signal) => (
            <li
              key={signal}
              className="rounded-xl border border-white/8 bg-black/10 px-3 py-2 text-[11px] leading-[1.5] text-white/68 backdrop-blur-sm"
            >
              {signal}
            </li>
          ))}
        </motion.ul>
      ) : null}

      <motion.div
        variants={reveal}
        transition={{ duration: reduceMotion ? 0 : 0.4, ease: "easeOut" }}
        className="mt-8 flex flex-col gap-3 sm:flex-row sm:flex-wrap sm:items-center sm:justify-center"
      >
        <Link
          href={hero.cta.href}
          className={cn(
            "inline-flex h-12 w-full items-center justify-center rounded-xl px-7 text-sm font-semibold transition-all duration-200 hover:-translate-y-[1px] hover:shadow-lg sm:w-auto",
            FOCUS_RING_DARK,
          )}
          style={{
            backgroundColor: style.ctaBg,
            color: style.ctaText,
            boxShadow: style.ctaShadow,
          }}
        >
          {hero.cta.label}
        </Link>
        {hero.secondaryCta ? (
          <Link
            href={hero.secondaryCta.href}
            className={cn(
              "inline-flex h-12 w-full items-center justify-center rounded-xl border border-white/18 bg-black/18 px-7 text-sm font-semibold text-white/84 backdrop-blur-sm transition-all duration-200 hover:border-white/28 hover:bg-black/24 hover:text-white sm:w-auto",
              FOCUS_RING_DARK,
            )}
          >
            {hero.secondaryCta.label}
          </Link>
        ) : null}
      </motion.div>
    </div>
  );
}

export function IndustryHero({ model }: { model: IndustryPageModel }) {
  const { reduceMotion, stagger, reveal } = useAnimations();
  const { hero } = model;

  const theme = hero.theme ?? "red";
  const bgColor = THEME_BG[theme];
  const accentColor = THEME_ACCENT[theme];
  const isSplitHero = model.key === "automotive";
  const isImmersiveCenteredHero = model.key in HERO_MEDIA_CONFIG;
  const heroSignals = hero.signals ?? [];
  const proofStrip = hero.proofStrip ?? [];

  return (
    <section
      aria-labelledby="industry-hero-heading"
      className="relative overflow-hidden border-b border-white/6 py-16 sm:py-20 lg:py-24"
      style={{ backgroundColor: bgColor }}
    >
      {/* Background layers — grid, vignette, gradient glow */}
      <div className="pointer-events-none absolute inset-0" aria-hidden>
        {/* Grid lines — 120px cells, edge-to-edge */}
        <div
          className={cn(
            "absolute inset-0 [background-image:linear-gradient(to_right,rgba(255,255,255,0.8)_1px,transparent_1px),linear-gradient(to_bottom,rgba(255,255,255,0.8)_1px,transparent_1px)] [background-size:120px_120px]",
            isImmersiveCenteredHero ? "opacity-[0.034]" : "opacity-[0.05]",
          )}
        />
        {isImmersiveCenteredHero ? (
          <div className="absolute inset-x-[14%] inset-y-[10%] bg-[radial-gradient(ellipse_at_center,rgba(11,20,34,0.16)_0%,rgba(11,20,34,0.08)_48%,transparent_78%)]" />
        ) : null}
        {/* Edge vignette — darkens corners for depth */}
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,transparent_70%,rgba(0,0,0,0.2)_100%)]" />
        {/* Top fade */}
        <div className="absolute inset-x-0 top-0 h-24 bg-gradient-to-b from-black/40 to-transparent" />
        {/* Bottom fade */}
        <div
          className="absolute inset-x-0 bottom-0 h-20"
          style={{ background: `linear-gradient(to top, ${bgColor}, transparent)` }}
        />
        {/* Theme gradient glow — positioned right at 70% */}
        <ThemeGradientOverlay theme={theme} />
      </div>

      {/* Noise texture for depth */}
      <div
        className="pointer-events-none absolute inset-0 opacity-[0.03]"
        style={{
          backgroundImage:
            "url(\"data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E\")",
        }}
        aria-hidden
      />

      {/* Decorative icons stay on simpler fallback heroes only to keep premium photo-led layouts clean. */}
      {!isSplitHero && !isImmersiveCenteredHero ? <FloatingIcons /> : null}

      {/* Bottom accent rule */}
      <div
        className="pointer-events-none absolute inset-x-0 bottom-0 h-px"
        style={{
          background: `linear-gradient(90deg, transparent 5%, ${accentColor}25 50%, transparent 95%)`,
        }}
        aria-hidden
      />

      <Container className="site-page-container relative">
        <motion.div
          initial="hidden"
          animate="show"
          variants={stagger}
          className={cn(
            isSplitHero
              ? "mx-auto max-w-6xl"
              : "mx-auto max-w-5xl text-center",
          )}
        >
          <motion.div
            variants={reveal}
            transition={{ duration: reduceMotion ? 0 : 0.3, ease: "easeOut" }}
            className={cn("relative z-20 mb-8", isSplitHero ? "text-left" : "text-center")}
          >
            <Link
              href="/industries"
              className={cn(
                "inline-flex items-center gap-1.5 rounded text-xs font-medium text-white/50 transition-colors hover:text-white/75",
                FOCUS_RING_DARK,
              )}
            >
              <ChevronLeft className="h-3.5 w-3.5" />
              All Industries
            </Link>
          </motion.div>


          {isSplitHero ? (
            <div className="grid items-center gap-10 lg:grid-cols-[minmax(0,0.95fr)_minmax(380px,1.05fr)] lg:gap-12 xl:grid-cols-[minmax(0,0.92fr)_minmax(460px,1.08fr)]">
              <div className="max-w-2xl text-left">
                <motion.div
                  variants={reveal}
                  transition={{ duration: reduceMotion ? 0 : 0.35, ease: "easeOut" }}
                  className="flex"
                >
                  <SectionEyebrow
                    label={hero.kicker ?? "Industry Logistics"}
                    accentColor={accentColor}
                    light
                  />
                </motion.div>

                {hero.valueHeadline ? (
                  <motion.p
                    variants={reveal}
                    transition={{ duration: reduceMotion ? 0 : 0.4, ease: "easeOut" }}
                    className="mt-6 text-[12px] font-semibold uppercase tracking-[0.22em] sm:text-[12px]"
                    style={{ color: `${accentColor}f0` }}
                  >
                    {hero.valueHeadline}
                  </motion.p>
                ) : null}

                <motion.h1
                  id="industry-hero-heading"
                  variants={reveal}
                  transition={{ duration: reduceMotion ? 0 : 0.45, ease: "easeOut" }}
                  className="mt-4 text-[2.8rem] font-bold leading-[0.96] tracking-tight text-white sm:text-[3.6rem] lg:text-[4.6rem]"
                >
                  {hero.title}
                </motion.h1>

                <motion.p
                  variants={reveal}
                  transition={{ duration: reduceMotion ? 0 : 0.4, ease: "easeOut" }}
                  className="mt-5 max-w-[40rem] text-[15px] leading-[1.8] text-white/68 sm:text-[16px]"
                >
                  {hero.description}
                </motion.p>

                <motion.ul
                  variants={reveal}
                  transition={{ duration: reduceMotion ? 0 : 0.42, ease: "easeOut" }}
                  className="mt-6 grid gap-2 sm:grid-cols-2"
                >
                  {heroSignals.map((signal) => (
                    <li
                      key={signal}
                      className="rounded-xl border border-white/10 bg-white/[0.03] px-3.5 py-2.5 text-[12px] leading-[1.6] text-white/74 backdrop-blur-sm"
                    >
                      {signal}
                    </li>
                  ))}
                </motion.ul>

                <motion.div
                  variants={reveal}
                  transition={{ duration: reduceMotion ? 0 : 0.4, ease: "easeOut" }}
                  className="mt-8 flex flex-col gap-3 sm:flex-row sm:flex-wrap sm:items-center"
                >
                  <Link
                    href={hero.cta.href}
                    className={cn(
                      "inline-flex h-12 w-full items-center justify-center rounded-xl px-7 text-sm font-semibold text-white transition-all duration-200 hover:-translate-y-[1px] hover:shadow-lg sm:w-auto",
                      FOCUS_RING_DARK,
                    )}
                    style={{
                      backgroundColor: accentColor,
                      boxShadow: `0 8px 32px ${accentColor}30`,
                    }}
                  >
                    {hero.cta.label}
                  </Link>
                  {hero.secondaryCta ? (
                    <Link
                      href={hero.secondaryCta.href}
                      className={cn(
                        "inline-flex h-12 w-full items-center justify-center rounded-xl border border-white/15 bg-white/5 px-7 text-sm font-semibold text-white/80 backdrop-blur-sm transition-all duration-200 hover:border-white/25 hover:bg-white/8 hover:text-white sm:w-auto",
                        FOCUS_RING_DARK,
                      )}
                    >
                      {hero.secondaryCta.label}
                    </Link>
                  ) : null}
                </motion.div>
              </div>

              <motion.div
                variants={reveal}
                transition={{ duration: reduceMotion ? 0 : 0.48, ease: "easeOut" }}
              >
                <AutomotiveHeroMedia accentColor={accentColor} />
              </motion.div>
            </div>
          ) : isImmersiveCenteredHero && HERO_MEDIA_CONFIG[model.key] && CENTERED_HERO_STYLES[model.key] ? (
            <>
              <ImmersiveHeroMedia accentColor={accentColor} config={HERO_MEDIA_CONFIG[model.key]} />
              <CenteredHeroContent
                hero={hero}
                style={CENTERED_HERO_STYLES[model.key]}
                accentColor={accentColor}
                heroSignals={heroSignals}
                reveal={reveal}
                reduceMotion={reduceMotion}
              />
            </>
          ) : (
            <>
              <motion.div
                variants={reveal}
                transition={{ duration: reduceMotion ? 0 : 0.35, ease: "easeOut" }}
                className="flex justify-center"
              >
                <SectionEyebrow
                  label={hero.kicker ?? "Industry Logistics"}
                  accentColor={accentColor}
                  light
                />
              </motion.div>

              <motion.h1
                id="industry-hero-heading"
                variants={reveal}
                transition={{ duration: reduceMotion ? 0 : 0.45, ease: "easeOut" }}
                className="mt-6 text-[2.45rem] font-bold leading-[1.02] tracking-tight text-white sm:text-[3.1rem] lg:text-[4rem]"
              >
                {hero.title}
              </motion.h1>

              {hero.valueHeadline ? (
                <motion.p
                  variants={reveal}
                  transition={{ duration: reduceMotion ? 0 : 0.4, ease: "easeOut" }}
                  className="mt-4 text-lg font-semibold tracking-tight sm:text-xl"
                  style={{ color: accentColor }}
                >
                  {hero.valueHeadline}
                </motion.p>
              ) : null}

              <motion.p
                variants={reveal}
                transition={{ duration: reduceMotion ? 0 : 0.4, ease: "easeOut" }}
                className="mx-auto mt-5 max-w-[46rem] text-[15px] leading-[1.85] text-white/60 sm:text-base"
              >
                {hero.description}
              </motion.p>

              <motion.div
                variants={reveal}
                transition={{ duration: reduceMotion ? 0 : 0.4, ease: "easeOut" }}
                className="mt-9 flex flex-col gap-3 sm:flex-row sm:flex-wrap sm:items-center sm:justify-center"
              >
                <Link
                  href={hero.cta.href}
                  className={cn(
                    "inline-flex h-12 w-full items-center justify-center rounded-xl px-7 text-sm font-semibold text-white transition-all duration-200 hover:-translate-y-[1px] hover:shadow-lg sm:w-auto",
                    FOCUS_RING_DARK,
                  )}
                  style={{
                    backgroundColor: accentColor,
                    boxShadow: `0 8px 32px ${accentColor}30`,
                  }}
                >
                  {hero.cta.label}
                </Link>
                {hero.secondaryCta ? (
                  <Link
                    href={hero.secondaryCta.href}
                    className={cn(
                      "inline-flex h-12 w-full items-center justify-center rounded-xl border border-white/15 bg-white/5 px-7 text-sm font-semibold text-white/80 backdrop-blur-sm transition-all duration-200 hover:border-white/25 hover:bg-white/8 hover:text-white sm:w-auto",
                      FOCUS_RING_DARK,
                    )}
                  >
                    {hero.secondaryCta.label}
                  </Link>
                ) : null}
              </motion.div>
            </>
          )}
        </motion.div>

        {proofStrip.length > 0 ? (
          <motion.div
            initial="hidden"
            animate="show"
            variants={stagger}
            className="mx-auto mt-9 grid max-w-4xl gap-3 md:grid-cols-3"
          >
            {proofStrip.map((item) => (
              <motion.div
                key={item.label}
                variants={reveal}
                transition={{ duration: reduceMotion ? 0 : 0.45, ease: "easeOut" }}
                className="rounded-2xl border border-white/8 bg-black/14 px-4 py-3.5 backdrop-blur-sm"
              >
                <p className="text-[0.98rem] font-semibold tracking-tight text-white">{item.value}</p>
                <p className="mt-1 text-[10px] uppercase tracking-[0.16em] text-white/38">{item.label}</p>
              </motion.div>
            ))}
          </motion.div>
        ) : null}
      </Container>
    </section>
  );
}
