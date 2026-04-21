"use client";

import * as React from "react";
import Link from "next/link";
import { motion, useReducedMotion, type Variants } from "framer-motion";
import { Container } from "@/app/(site)/components/layout/Container";
import { SectionSignalEyebrow } from "@/app/(site)/components/ui/SectionSignalEyebrow";
import { TruckFleetScene } from "./TruckFleetScene";

/* ─────────────────────────────────────────────────────────────────
   Why SSP — "We lead the lane."

   Editorial split: proposition on the left, truck fleet scene on the
   right. The structure mirrors the best editorial-voice pages in
   logistics (Charger, Maersk, C.H. Robinson) but in an SSP cadence —
   quiet, confident, operational.

   Left column
   ────────────
     1. Eyebrow pill ("Why SSP")
     2. Hero headline ("We lead the lane.")
     3. Lede paragraph — one breath of positioning
     4. Three stacked pillars: icon · title · one-line body, each
        bordered by a hairline so they read as quiet, scannable proof
     5. CTA ("See how we run")

   Right column
   ────────────
     TruckFleetScene — three hand-constructed isometric semi-trucks
     moving diagonally from lower-right to upper-left, led by the
     cyan-lit hero. Everything is on one asphalt road so the
     "formation" reads at a glance. See TruckFleetScene.tsx for the
     geometry rationale.
   ───────────────────────────────────────────────────────────────── */

const SECTION_EYEBROW = "Why SSP";
const SECTION_TITLE = "We lead the lane.";
const SECTION_SUPPORT =
  "A single accountable team, on lanes we actually run today, with the gear and paperwork already handled before the truck leaves the yard. That's not a pitch — it's how freight moves at SSP.";
const SECTION_CTA_LABEL = "See how we run";
const SECTION_CTA_HREF = "/solutions";

const BRAND_CYAN = "#10a7d8";

type Pillar = {
  id: string;
  title: string;
  body: string;
  Icon: (props: React.SVGProps<SVGSVGElement>) => React.ReactElement;
};

function IconShield(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg viewBox="0 0 24 24" aria-hidden {...props}>
      <path
        d="M12 3.5l6 2.2v5.6c0 4-2.4 7-6 8.9-3.6-1.9-6-4.9-6-8.9V5.7l6-2.2Z"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.6"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="m9.4 12.2 1.8 1.8 3.7-4"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.6"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

function IconRoute(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg viewBox="0 0 24 24" aria-hidden {...props}>
      <circle
        cx="6"
        cy="6"
        r="2.2"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.6"
      />
      <circle
        cx="18"
        cy="18"
        r="2.2"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.6"
      />
      <path
        d="M6 8.3v3.5a4 4 0 0 0 4 4h2a4 4 0 0 1 4 4v-3.7"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.6"
        strokeLinecap="round"
      />
    </svg>
  );
}

function IconBox(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg viewBox="0 0 24 24" aria-hidden {...props}>
      <path
        d="M3.8 7.6 12 4l8.2 3.6v8.8L12 20l-8.2-3.6Z"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.6"
        strokeLinejoin="round"
      />
      <path
        d="M3.8 7.6 12 11.2l8.2-3.6M12 11.2V20"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.6"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

const PILLARS: readonly Pillar[] = [
  {
    id: "own-the-load",
    title: "We own the load.",
    body: "One program, one accountable team — from first pickup to final signature. You don't chase the freight. We do.",
    Icon: IconShield,
  },
  {
    id: "ship-what-we-promise",
    title: "We ship what we promise.",
    body: "Every lane on our map is a lane we run today. Quotes reflect real operations, not sales optimism.",
    Icon: IconRoute,
  },
  {
    id: "show-up-ready",
    title: "We show up ready.",
    body: "Cross-border paperwork, bonded carriers, specialized gear — handled before the truck leaves the yard.",
    Icon: IconBox,
  },
] as const;

function PillarRow({
  pillar,
  index,
  reduced,
}: {
  pillar: Pillar;
  index: number;
  reduced: boolean;
}) {
  const { Icon } = pillar;
  const variants: Variants = reduced
    ? { hidden: { opacity: 1, y: 0 }, show: { opacity: 1, y: 0 } }
    : { hidden: { opacity: 0, y: 14 }, show: { opacity: 1, y: 0 } };

  return (
    <motion.div
      variants={variants}
      transition={{
        duration: reduced ? 0 : 0.5,
        delay: reduced ? 0 : 0.1 + index * 0.08,
        ease: [0.22, 1, 0.36, 1],
      }}
      className="group/pillar relative flex items-start gap-4 py-6 first:pt-2 last:pb-1"
    >
      {/* Icon tile */}
      <div
        className="relative flex h-11 w-11 flex-shrink-0 items-center justify-center rounded-[10px]"
        style={{
          background: `linear-gradient(135deg, color-mix(in srgb, ${BRAND_CYAN} 10%, #ffffff) 0%, #ffffff 100%)`,
          border: `1px solid color-mix(in srgb, ${BRAND_CYAN} 22%, rgba(15,23,42,0.08))`,
          boxShadow:
            "0 1px 0 rgba(255,255,255,0.9) inset, 0 6px 14px -8px rgba(16,167,216,0.28)",
        }}
      >
        <Icon
          className="h-[22px] w-[22px]"
          style={{ color: "#0a7ba1" }}
        />
        {/* Cyan signal dot connecting to the scene (desktop only) */}
        <span
          aria-hidden
          className="pointer-events-none absolute -right-1.5 top-1/2 hidden h-[5px] w-[5px] -translate-y-1/2 rounded-full xl:block"
          style={{ backgroundColor: BRAND_CYAN, opacity: 0.55 }}
        />
      </div>

      <div className="min-w-0 flex-1">
        <h3 className="text-[1.05rem] font-semibold leading-[1.2] tracking-[-0.012em] text-[color:var(--color-text-strong)]">
          {pillar.title}
        </h3>
        <p className="mt-1.5 max-w-[44ch] text-[13.5px] leading-[1.65] text-[color:var(--color-muted)]">
          {pillar.body}
        </p>
      </div>

      {/* Hairline divider — skipped on the last row */}
      <span
        aria-hidden
        className="absolute inset-x-0 bottom-0 h-px bg-[color:var(--color-border-light-soft)] group-last/pillar:hidden"
      />
    </motion.div>
  );
}

export function WhySspSection() {
  const reduced = useReducedMotion() ?? false;
  const headingId = "home-why-ssp-heading";

  const fadeUp: Variants = reduced
    ? { hidden: { opacity: 1, y: 0 }, show: { opacity: 1, y: 0 } }
    : { hidden: { opacity: 0, y: 14 }, show: { opacity: 1, y: 0 } };

  return (
    <section
      id="home-why-ssp"
      aria-labelledby={headingId}
      className="relative overflow-hidden border-y border-[color:var(--color-border-light-soft)]"
      style={{
        backgroundColor: "var(--color-surface-0)",
        backgroundImage:
          "radial-gradient(60% 45% at 78% 18%, rgba(16,167,216,0.045), transparent 70%), radial-gradient(45% 50% at 8% 92%, rgba(15,23,42,0.025), transparent 72%)",
      }}
    >
      <Container className="site-page-container relative py-20 sm:py-24 xl:py-28">
        <motion.div
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, amount: 0.15 }}
          className="grid grid-cols-1 gap-12 xl:grid-cols-[minmax(0,1fr)_minmax(0,1.12fr)] xl:gap-20"
        >
          {/* ─── LEFT COLUMN — editorial voice ─── */}
          <div className="relative flex flex-col justify-center">
            <motion.div
              variants={fadeUp}
              transition={{ duration: reduced ? 0 : 0.5, ease: [0.22, 1, 0.36, 1] }}
            >
              <SectionSignalEyebrow
                label={SECTION_EYEBROW}
                accentColor={BRAND_CYAN}
              />
            </motion.div>

            <motion.h2
              id={headingId}
              variants={fadeUp}
              transition={{
                duration: reduced ? 0 : 0.55,
                delay: reduced ? 0 : 0.05,
                ease: [0.22, 1, 0.36, 1],
              }}
              className="mt-5 text-balance text-[2.35rem] font-semibold leading-[1.04] tracking-[-0.025em] text-[color:var(--color-text-strong)] sm:text-[2.85rem] xl:text-[3.3rem]"
            >
              {SECTION_TITLE}
            </motion.h2>

            <motion.p
              variants={fadeUp}
              transition={{
                duration: reduced ? 0 : 0.55,
                delay: reduced ? 0 : 0.1,
                ease: [0.22, 1, 0.36, 1],
              }}
              className="mt-5 max-w-[52ch] text-[15px] leading-[1.72] text-[color:var(--color-muted)] sm:text-[15.5px]"
            >
              {SECTION_SUPPORT}
            </motion.p>

            {/* Three pillars, stacked, each with hairline divider */}
            <div className="mt-8 border-t border-[color:var(--color-border-light-soft)]">
              {PILLARS.map((pillar, index) => (
                <PillarRow
                  key={pillar.id}
                  pillar={pillar}
                  index={index}
                  reduced={reduced}
                />
              ))}
            </div>

            {/* CTA */}
            <motion.div
              variants={fadeUp}
              transition={{
                duration: reduced ? 0 : 0.5,
                delay: reduced ? 0 : 0.35,
                ease: [0.22, 1, 0.36, 1],
              }}
              className="mt-8 flex flex-wrap items-center gap-4"
            >
              <Link
                href={SECTION_CTA_HREF}
                className="group/cta inline-flex h-11 items-center gap-2.5 rounded-full px-6 text-[13.5px] font-semibold tracking-[0.01em] text-white transition-all duration-300 focus:outline-none focus-visible:ring-2 focus-visible:ring-offset-2"
                style={{
                  background:
                    "linear-gradient(135deg, #0b8fbb 0%, #10a7d8 50%, #18b8ea 100%)",
                  boxShadow:
                    "0 1px 0 rgba(255,255,255,0.3) inset, 0 10px 26px -10px rgba(16,167,216,0.6), 0 2px 6px -2px rgba(16,167,216,0.35)",
                }}
              >
                <span>{SECTION_CTA_LABEL}</span>
                <svg
                  viewBox="0 0 20 20"
                  aria-hidden
                  className="h-[15px] w-[15px] transition-transform duration-300 group-hover/cta:translate-x-0.5"
                >
                  <path
                    d="M4 10h11m0 0-4-4m4 4-4 4"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="1.8"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
              </Link>

              <span className="text-[12.5px] font-medium uppercase tracking-[0.14em] text-[color:var(--color-muted)]/80">
                or&nbsp;
                <Link
                  href="/quote"
                  className="text-[color:var(--color-text-strong)] underline decoration-[color:var(--color-border-light)] decoration-from-font underline-offset-4 transition-colors duration-200 hover:decoration-[color:var(--color-text-strong)]"
                >
                  request a quote
                </Link>
              </span>
            </motion.div>
          </div>

          {/* ─── RIGHT COLUMN — truck fleet scene ─── */}
          <motion.div
            variants={fadeUp}
            transition={{
              duration: reduced ? 0 : 0.7,
              delay: reduced ? 0 : 0.15,
              ease: [0.22, 1, 0.36, 1],
            }}
            className="relative flex items-center justify-center"
          >
            <div className="relative w-full">
              {/* Subtle frame glow behind the scene */}
              <div
                aria-hidden
                className="pointer-events-none absolute -inset-6 rounded-[32px] opacity-70"
                style={{
                  background:
                    "radial-gradient(55% 50% at 35% 40%, rgba(16,167,216,0.10), transparent 72%)",
                }}
              />
              <TruckFleetScene className="relative w-full" />

              {/* Bottom caption — quiet operational signal, echoes Hero's rail */}
              <div
                aria-hidden
                className="mt-4 flex items-center gap-3 text-[10.5px] font-medium uppercase tracking-[0.22em] text-[color:var(--color-muted)]/70 xl:mt-6"
              >
                <span
                  className="h-px flex-1"
                  style={{
                    background:
                      "linear-gradient(90deg, transparent, rgba(16,167,216,0.45) 50%, transparent)",
                  }}
                />
                <span>Fleet in formation · On the lane we run</span>
                <span
                  className="h-[5px] w-[5px] rounded-full"
                  style={{ backgroundColor: BRAND_CYAN, opacity: 0.6 }}
                />
              </div>
            </div>
          </motion.div>
        </motion.div>
      </Container>
    </section>
  );
}
