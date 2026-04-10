"use client";

import { motion, useReducedMotion, type Variants } from "framer-motion";
import { Container } from "@/app/(site)/components/layout/Container";
import { SectionSignalEyebrow } from "@/app/(site)/components/ui/SectionSignalEyebrow";
import type { SolutionFamilyPageData } from "@/config/solutionPages";

type Props = {
  section: SolutionFamilyPageData["howItWorks"];
  accent: string;
  scrollMarginTop?: number;
};

type StepData = SolutionFamilyPageData["howItWorks"]["steps"][number];

/* ── Art-directed desktop composition ──────────────────────
   Fixed artboard. Cards are deliberately placed at known
   coordinates. SVG paths are drawn against those positions.
   One coordinate system, one source of truth, zero drift. */

const CARD_W = 280;
const GAP = 36;
const DESKTOP_CARD_COUNT = 4;
const STAGE_W = 4 * CARD_W + 3 * GAP;
const STAGE_H = 430;
const STAGE_BLEED_X = 40;
const STAGE_BLEED_Y = 32;

type Placement = Readonly<{ x: number; y: number }>;

const PLACEMENTS: readonly Placement[] = [
  { x: 0, y: 118 },
  { x: CARD_W + GAP, y: 118 },
  { x: 2 * (CARD_W + GAP), y: 118 },
  { x: 3 * (CARD_W + GAP), y: 118 },
];

export function SolutionHowItWorksSection({
  section,
  accent,
  scrollMarginTop,
}: Props) {
  const reduced = useReducedMotion() ?? false;
  const steps = section.steps;
  const headingId = "solution-how-it-works-heading";

  if (steps.length !== DESKTOP_CARD_COUNT) {
    throw new Error(
      `SolutionHowItWorksSection requires exactly ${DESKTOP_CARD_COUNT} steps; received ${steps.length}.`,
    );
  }

  const fadeUp: Variants = reduced
    ? { hidden: { opacity: 1, y: 0 }, show: { opacity: 1, y: 0 } }
    : { hidden: { opacity: 1, y: 10 }, show: { opacity: 1, y: 0 } };

  const stagger: Variants = {
    hidden: {},
    show: {
      transition: {
        staggerChildren: reduced ? 0 : 0.05,
        delayChildren: reduced ? 0 : 0.03,
      },
    },
  };

  return (
    <section
      id="solution-how-it-works"
      aria-labelledby={headingId}
      className="relative overflow-hidden bg-[color:var(--color-surface-0-light)]"
      style={scrollMarginTop ? { scrollMarginTop } : undefined}
    >
      <Container className="site-page-container relative py-16 sm:py-20 lg:py-24">
        {/* ── Intro: eyebrow + title + description ── */}
        <motion.div
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, amount: 0.15 }}
          className="mx-auto max-w-[72rem] text-center"
        >
          <motion.div
            variants={fadeUp}
            transition={{ duration: reduced ? 0 : 0.35, ease: "easeOut" }}
            className="flex justify-center"
          >
            <SectionSignalEyebrow label={section.eyebrow} accentColor={accent} />
          </motion.div>

          <motion.h2
            id={headingId}
            variants={fadeUp}
            transition={{ duration: reduced ? 0 : 0.35, ease: "easeOut" }}
            className="mx-auto mt-4 max-w-[18ch] text-[1.95rem] font-semibold leading-[1.08] tracking-tight text-[color:var(--color-text-light)] sm:max-w-[20ch] sm:text-[2.2rem] lg:max-w-none lg:whitespace-nowrap lg:text-[2.08rem] xl:text-[2.24rem] 2xl:text-[2.35rem]"
          >
            {section.title}
          </motion.h2>

          <motion.p
            variants={fadeUp}
            transition={{ duration: reduced ? 0 : 0.35, ease: "easeOut" }}
            className="mx-auto mt-5 max-w-[68ch] text-[14.85px] leading-[1.72] text-[color:var(--color-muted-light)] sm:text-[15.25px] lg:max-w-[56rem] xl:max-w-[60rem]"
          >
            {section.description}
          </motion.p>
        </motion.div>

        {/* ── Desktop: fixed art-directed composition ── */}
        <motion.div
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, amount: 0.15 }}
          variants={stagger}
          className="relative mx-auto mt-8 hidden overflow-visible xl:mt-10 xl:block"
          style={{ width: STAGE_W, height: STAGE_H }}
        >
          <DesktopConnector accent={accent} />

          {steps.map((step, index) => {
            const p = PLACEMENTS[index];
            if (!p) return null;
            return (
              <motion.div
                key={step.step}
                variants={fadeUp}
                transition={{
                  duration: reduced ? 0 : 0.38,
                  ease: [0.22, 1, 0.36, 1],
                }}
                className="absolute z-10"
                style={{ left: p.x, top: p.y, width: CARD_W }}
              >
                <ProcessCard step={step} accent={accent} index={index} />
              </motion.div>
            );
          })}
        </motion.div>

        {/* ── Mobile / Tablet: left-track sequence ── */}
        <motion.div
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, amount: 0.15 }}
          variants={stagger}
          className="relative mt-10 xl:hidden"
        >
          <div className="relative mx-auto max-w-[46rem]">
            <div
              className="pointer-events-none absolute bottom-4 left-[21px] top-4 w-px rounded-full"
              aria-hidden
              style={{
                background: `linear-gradient(180deg, color-mix(in srgb, ${accent} 18%, transparent) 0%, color-mix(in srgb, ${accent} 42%, var(--color-border-light)) 20%, color-mix(in srgb, ${accent} 42%, var(--color-border-light)) 80%, color-mix(in srgb, ${accent} 18%, transparent) 100%)`,
              }}
            />

            <div className="space-y-5">
              {steps.map((step, index) => (
                <motion.article
                  key={step.step}
                  variants={fadeUp}
                  transition={{ duration: reduced ? 0 : 0.35, ease: "easeOut" }}
                  className="relative pl-14"
                >
                  <div
                    className="absolute left-0 top-5 z-10 flex h-[42px] w-[42px] items-center justify-center rounded-full border bg-[color:var(--color-surface-0-light)] shadow-[0_10px_24px_rgba(2,6,23,0.08)]"
                    style={{
                      borderColor: `color-mix(in srgb, ${accent} 16%, var(--color-border-light))`,
                    }}
                  >
                    <span
                      className="text-[10px] font-semibold tracking-[0.16em] text-[color:var(--color-text-light)] uppercase"
                      style={{
                        color: `color-mix(in srgb, ${accent} 76%, var(--color-company-ink))`,
                      }}
                    >
                      {step.step}
                    </span>
                  </div>

                  <motion.div
                    variants={fadeUp}
                    transition={{ duration: reduced ? 0 : 0.35, ease: "easeOut" }}
                    className="relative h-full"
                  >
                    <ProcessCard
                      step={step}
                      accent={accent}
                      index={index}
                      autoHeight
                    />
                  </motion.div>
                </motion.article>
              ))}
            </div>
          </div>
        </motion.div>
      </Container>
    </section>
  );
}

/* ────────────────────────────────────────────────────────── */
/*  Process Card                                              */
/* ────────────────────────────────────────────────────────── */

function ProcessCard({
  step,
  accent,
  index,
  showOrderLabel = false,
  autoHeight = false,
}: {
  step: StepData;
  accent: string;
  index: number;
  showOrderLabel?: boolean;
  autoHeight?: boolean;
}) {
  const useDeepBlueHeader = index === 0 || index === 2;
  const headerBg = useDeepBlueHeader
    ? "var(--color-company-ink)"
    : `color-mix(in srgb, ${accent} 10%, var(--color-surface-0-light))`;
  const headerDotAccent = useDeepBlueHeader
    ? "color-mix(in srgb, white 78%, var(--color-company-ink))"
    : `color-mix(in srgb, ${accent} 55%, white)`;
  const headerDotMuted = useDeepBlueHeader
    ? "rgba(255,255,255,0.26)"
    : `color-mix(in srgb, ${accent} 18%, var(--color-border-light))`;
  const bodyBarMuted = `color-mix(in srgb, ${accent} 12%, var(--color-border-light))`;
  const titleColor = `color-mix(in srgb, ${accent} 84%, var(--color-text-light))`;
  const bodyColor =
    "color-mix(in srgb, var(--color-muted-light) 88%, var(--color-text-light))";

  return (
    <div
      className={`relative overflow-hidden rounded-lg border bg-white shadow-[0_16px_40px_rgba(2,6,23,0.08),0_2px_6px_rgba(2,6,23,0.05)] ${
        autoHeight ? "h-auto" : "h-[280px]"
      }`}
      style={{
        borderColor: `color-mix(in srgb, ${accent} 10%, var(--color-border-light))`,
      }}
    >
      <div
        className={`flex items-center gap-[4px] px-3.5 ${autoHeight ? "h-[22px]" : "h-[24px]"}`}
        style={{ background: headerBg }}
      >
        <span className="h-[5px] w-[5px] rounded-full" style={{ background: headerDotAccent }} />
        <span className="h-[5px] w-[5px] rounded-full" style={{ background: headerDotMuted }} />
        <span className="h-[5px] w-[5px] rounded-full" style={{ background: headerDotMuted }} />
      </div>

      <div
        className={`relative flex flex-col px-6 ${
          autoHeight ? "h-auto pb-5 pt-6" : "h-[calc(100%-24px)] pb-5 pt-8"
        }`}
      >
        {showOrderLabel ? (
          <div className={`flex justify-end ${autoHeight ? "mb-3" : "mb-4"}`}>
            <span
              className={`inline-flex items-center rounded-full border font-semibold tracking-[0.16em] uppercase ${
                autoHeight ? "h-6 px-2 text-[9px]" : "h-7 px-2.5 text-[10px]"
              }`}
              style={{
                borderColor: `color-mix(in srgb, ${accent} 18%, var(--color-border-light))`,
                color: titleColor,
                background: "color-mix(in srgb, white 84%, var(--color-surface-0-light))",
              }}
            >
              {step.step}
            </span>
          </div>
        ) : null}
        <p
          className={`w-full font-semibold tracking-[-0.032em] text-balance ${
            autoHeight ? "text-[15.5px] leading-[1.06]" : "text-[16.5px] leading-[1.04]"
          }`}
          style={{ color: titleColor }}
        >
          {step.title}
        </p>

        <p
          className={`w-full text-[11px] leading-[1.78] ${autoHeight ? "mt-4" : "mt-5"}`}
          style={{ color: bodyColor }}
        >
          {step.body}
        </p>

        <div className={autoHeight ? "pt-5" : "mt-auto pt-6"}>
          <div className="flex items-center gap-2">
            <span
              className="h-[1.5px] w-7 rounded-full"
              style={{ background: titleColor }}
            />
            <span
              className="h-px flex-1 rounded-full"
              style={{ background: bodyBarMuted }}
            />
          </div>
        </div>
      </div>
    </div>
  );
}

/* ────────────────────────────────────────────────────────── */
/*  Desktop connector: dashed curves + decorative circles     */
/*                                                            */
/*  SVG viewBox matches stage dimensions 1:1.                 */
/*  All coordinates are in the same system as card positions. */
/* ────────────────────────────────────────────────────────── */

function DesktopConnector({ accent }: { accent: string }) {
  const stroke = `color-mix(in srgb, ${accent} 58%, white)`;
  const dot = `color-mix(in srgb, ${accent} 62%, white)`;
  const arrow = `color-mix(in srgb, ${accent} 78%, white)`;

  /*  Anchor geometry (derived from PLACEMENTS + CARD_W):
      Card 1 rect: (0,106) → (190, ~306)   exit upper-right ≈ (190, 176)
      Card 2 rect: (250,48) → (440, ~248)   entry upper-left ≈ (250, 118)
      Card 2 exit: (440, 118)               Card 3 entry: (500, 138)
      Card 3 exit: (690, 138)               Card 4 entry: (750, 166)  */

  return (
    <div
      className="pointer-events-none absolute z-0"
      aria-hidden
      style={{
        left: -STAGE_BLEED_X,
        top: -STAGE_BLEED_Y,
        width: STAGE_W + STAGE_BLEED_X * 2,
        height: STAGE_H + STAGE_BLEED_Y * 2,
      }}
    >
      <svg
        viewBox={`${-STAGE_BLEED_X} ${-STAGE_BLEED_Y} ${STAGE_W + STAGE_BLEED_X * 2} ${STAGE_H + STAGE_BLEED_Y * 2}`}
        fill="none"
        className="absolute inset-0 h-full w-full"
      >
        <defs>
          <marker
            id="hiw-arrow"
            viewBox="0 0 8 8"
            refX="6.6"
            refY="4"
            markerWidth="5"
            markerHeight="5"
            orient="auto-start-reverse"
          >
            <path
              d="M 1.2 1.4 L 6.2 4 L 1.2 6.6"
              fill="none"
              stroke={arrow}
              strokeWidth="0.9"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </marker>
        </defs>

        {/* ── Decorative dashed circle — top-left of card 1 ── */}
        <circle
          cx="0" cy="125" r="26"
          stroke={dot}
          strokeWidth="1.15"
          strokeDasharray="2.4 4.8"
          strokeLinecap="round"
          fill="none"
          opacity="0.88"
        />

        {/* ── Smaller dashed circle — bottom area near card 1 ── */}
        <circle
          cx="278" cy="395" r="14"
          stroke={dot}
          strokeWidth="1.05"
          strokeDasharray="2.2 4.4"
          strokeLinecap="round"
          fill="none"
          opacity="0.68"
        />

        {/* ── Connector 1 → 2: sweeping arc below the cards ── */}
        <path
          d="M 290 410 C 340 480, 440 440, 456 118"
          stroke={stroke}
          strokeWidth="1.35"
          strokeDasharray="2.8 5.4"
          strokeLinecap="round"
          fill="none"
        />
        <path
          d="M -5 -3.2 L 0 0 L -5 3.2"
          transform="translate(370 427) rotate(-30)"
          fill="none"
          stroke={arrow}
          strokeWidth="0.9"
          strokeLinecap="round"
          strokeLinejoin="round"
        />

        {/* ── Connector 2 → 3: arc above ── */}
        <path
          d="M 456 118 C 540 18, 690 18, 772 118"
          stroke={stroke}
          strokeWidth="1.35"
          strokeDasharray="2.8 5.4"
          strokeLinecap="round"
          fill="none"
        />
        <path
          d="M -5 -3.2 L 0 0 L -5 3.2"
          transform="translate(615 43) rotate(0)"
          fill="none"
          stroke={arrow}
          strokeWidth="0.9"
          strokeLinecap="round"
          strokeLinejoin="round"
        />

        {/* ── Connector 3 → 4: arc below ── */}
        <path
          d="M 772 198 C 858 470, 1012 470, 1104 398"
          stroke={stroke}
          strokeWidth="1.35"
          strokeDasharray="2.8 5.4"
          strokeLinecap="round"
          fill="none"
        />
        <path
          d="M -5 -3.2 L 0 0 L -5 3.2"
          transform="translate(950 432) rotate(8)"
          fill="none"
          stroke={arrow}
          strokeWidth="0.9"
          strokeLinecap="round"
          strokeLinejoin="round"
        />

        {/* ── Accent dots near card 4 ── */}
        <circle cx="924" cy="70" r="3.5" fill={accent} opacity="0.22" />
        <circle cx="933" cy="88" r="2" fill={accent} opacity="0.14" />
      </svg>
    </div>
  );
}
