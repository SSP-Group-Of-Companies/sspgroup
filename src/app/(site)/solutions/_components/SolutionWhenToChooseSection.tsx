"use client";

import { motion, useReducedMotion, type Variants } from "framer-motion";
import { Container } from "@/app/(site)/components/layout/Container";
import { SectionSignalEyebrow } from "@/app/(site)/components/ui/SectionSignalEyebrow";
import type { SolutionFamilyPageData } from "@/config/solutionPages";

type ServiceUseSectionData = NonNullable<SolutionFamilyPageData["serviceUse"]>;

type Props = {
  section: ServiceUseSectionData;
  accent: string;
  scrollMarginTop?: number;
};

type CardPresentation = Readonly<{
  icon: React.ReactNode;
  footer: string;
  dark: boolean;
  showLongLineLeft?: "top" | "bottom";
  showConnectorRight?: boolean;
  showConnectorBottom?: boolean;
}>;

const GRID_LINE_COLOR = "color-mix(in srgb, var(--color-border-light) 72%, white)";
const STRUCTURE_LINE_COLOR =
  "color-mix(in srgb, var(--color-border-light) 54%, transparent)";
const LONG_STRUCTURE_LINE_COLOR =
  "color-mix(in srgb, var(--color-border-light) 38%, transparent)";
const DARK_CARD_BACKGROUND =
  "linear-gradient(168deg, var(--color-ssp-ink-800) 0%, var(--color-company-ink) 100%)";
const CARD_COUNT = 4;

const CARD_PRESENTATIONS: readonly CardPresentation[] = [
  {
    icon: <DedicatedCapacityIcon key="cap" />,
    footer: "Capacity signal",
    dark: true,
    showLongLineLeft: "top",
    showConnectorRight: true,
    showConnectorBottom: true,
  },
  {
    icon: <EquipmentFitIcon key="eq" />,
    footer: "Routing signal",
    dark: false,
    showConnectorBottom: true,
  },
  {
    icon: <ExecutionControlIcon key="exec" />,
    footer: "Control signal",
    dark: false,
    showLongLineLeft: "bottom",
    showConnectorRight: true,
  },
  {
    icon: <AlternativeRouteIcon key="alt" />,
    footer: "Better-fit signal",
    dark: false,
  },
] as const;

export function SolutionWhenToChooseSection({
  section,
  accent,
  scrollMarginTop,
}: Props) {
  if (section.steps.length !== CARD_COUNT) {
    throw new Error(
      `SolutionWhenToChooseSection requires exactly ${CARD_COUNT} steps; received ${section.steps.length}.`,
    );
  }

  const reduced = useReducedMotion() ?? false;
  const headingId = "solution-how-to-use-heading";

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
      id="solution-how-to-use"
      aria-labelledby={headingId}
      className="relative overflow-hidden bg-[color:var(--color-surface-1-light)]"
      style={scrollMarginTop ? { scrollMarginTop } : undefined}
    >
      <Container className="site-page-container relative py-16 sm:py-20 lg:py-24">
        <motion.div
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, amount: 0.15 }}
          variants={stagger}
          className="grid items-start gap-8 lg:grid-cols-[minmax(0,0.44fr)_minmax(0,0.56fr)] lg:items-center lg:gap-10 xl:gap-14"
        >
          {/* ── Left: section intro ── */}
          <motion.div
            variants={fadeUp}
            transition={{ duration: reduced ? 0 : 0.35, ease: "easeOut" }}
            className="relative lg:self-center"
          >
            <span
              className="pointer-events-none absolute bottom-[-100vh] left-1/2 top-[-100vh] hidden w-px -translate-x-1/2 sm:block"
              aria-hidden
              style={{
                background: `linear-gradient(180deg, transparent 0%, ${LONG_STRUCTURE_LINE_COLOR} 24%, ${LONG_STRUCTURE_LINE_COLOR} 76%, transparent 100%)`,
              }}
            />

            <div
              className="relative z-10 px-1 py-1 sm:rounded-md sm:border sm:bg-white sm:px-8 sm:py-10 sm:shadow-[0_10px_28px_rgba(2,6,23,0.045)]"
              style={{
                borderColor: GRID_LINE_COLOR,
              }}
            >
              <SectionSignalEyebrow label={section.eyebrow} accentColor={accent} />

              <h2
                id={headingId}
                className="mt-5 max-w-[20ch] text-balance text-[1.8rem] font-semibold leading-[1.06] tracking-[-0.032em] text-[color:var(--color-text-light)] sm:text-[2.05rem] lg:text-[2.22rem]"
              >
                {section.title}
              </h2>

              <p className="mt-5 max-w-[46ch] text-[14.15px] leading-[1.82] text-[color:var(--color-muted-light)] sm:text-[14.75px]">
                {section.description}
              </p>
            </div>
          </motion.div>

          {/* ── Right: connected 2×2 card grid ── */}
          <div className="relative">
            <div className="sm:hidden">
              {section.steps.map((step, index) => {
                const card = CARD_PRESENTATIONS[index];

                return (
                  <motion.article
                    key={step.title}
                    variants={fadeUp}
                    transition={{
                      duration: reduced ? 0 : 0.35,
                      ease: "easeOut",
                    }}
                    className="border-b border-[color:var(--color-border-light)] py-6 first:pt-0 last:border-b-0 last:pb-0"
                  >
                    <div className="flex items-center gap-4">
                      <div
                        className="flex h-9 w-9 items-center justify-center rounded-lg"
                        style={{
                          backgroundColor: `color-mix(in srgb, ${accent} 10%, white)`,
                          border: `1px solid color-mix(in srgb, ${accent} 14%, var(--color-border-light))`,
                        }}
                      >
                        <span
                          className="text-[color:var(--when-icon-color)]"
                          style={{
                            ["--when-icon-color" as string]: `color-mix(in srgb, ${accent} 76%, var(--color-company-ink))`,
                          }}
                        >
                          {card.icon}
                        </span>
                      </div>
                    </div>

                    <h3 className="mt-4 max-w-[22ch] text-[1.12rem] font-semibold leading-[1.14] tracking-[-0.022em] text-[color:var(--color-text-light)]">
                      {step.title}
                    </h3>

                    <p className="mt-3 max-w-[54ch] text-[13.6px] leading-[1.82] text-[color:var(--color-muted-light)]">
                      {step.body}
                    </p>
                  </motion.article>
                );
              })}
            </div>

            <div className="hidden grid-cols-2 gap-4 sm:grid">
              {section.steps.map((step, index) => {
                const card = CARD_PRESENTATIONS[index];

                return (
                  <motion.article
                    key={step.title}
                    variants={fadeUp}
                    transition={{
                      duration: reduced ? 0 : 0.38,
                      ease: [0.22, 1, 0.36, 1],
                    }}
                    className="group relative flex flex-col rounded-md border px-5 py-6 transition-shadow duration-300 hover:shadow-[0_14px_34px_rgba(2,8,23,0.08)] sm:px-6 sm:py-7"
                    style={
                      card.dark
                        ? {
                            borderColor: "color-mix(in srgb, white 14%, transparent)",
                            background: DARK_CARD_BACKGROUND,
                          }
                        : {
                            borderColor: GRID_LINE_COLOR,
                            backgroundColor: "var(--color-surface-1-light)",
                          }
                    }
                  >
                    {card.showLongLineLeft === "top" ? (
                      <span
                        className="pointer-events-none absolute left-[-100vw] right-full top-[20%] hidden h-px sm:block"
                        aria-hidden
                        style={{
                          background: `linear-gradient(90deg, transparent 0%, transparent 22%, ${LONG_STRUCTURE_LINE_COLOR} 52%, ${LONG_STRUCTURE_LINE_COLOR} 100%)`,
                        }}
                      />
                    ) : null}

                    {card.showLongLineLeft === "bottom" ? (
                      <span
                        className="pointer-events-none absolute bottom-[20%] left-[-100vw] right-full hidden h-px sm:block"
                        aria-hidden
                        style={{
                          background: `linear-gradient(90deg, transparent 0%, transparent 22%, ${LONG_STRUCTURE_LINE_COLOR} 52%, ${LONG_STRUCTURE_LINE_COLOR} 100%)`,
                        }}
                      />
                    ) : null}

                    {card.showConnectorRight ? (
                      <span
                        className="pointer-events-none absolute top-1/2 right-[-1rem] hidden h-px w-4 -translate-y-1/2 sm:block"
                        aria-hidden
                        style={{ backgroundColor: STRUCTURE_LINE_COLOR }}
                      />
                    ) : null}

                    {card.showConnectorBottom ? (
                      <span
                        className="pointer-events-none absolute bottom-[-1rem] left-1/2 hidden h-4 w-px -translate-x-1/2 sm:block"
                        aria-hidden
                        style={{ backgroundColor: STRUCTURE_LINE_COLOR }}
                      />
                    ) : null}

                    {/* Icon */}
                    <div
                      className="flex h-10 w-10 items-center justify-center rounded-lg"
                      style={{
                        backgroundColor: card.dark
                          ? `color-mix(in srgb, ${accent} 14%, var(--color-ssp-ink-800))`
                          : `color-mix(in srgb, ${accent} 10%, white)`,
                        border: card.dark
                          ? `1px solid color-mix(in srgb, ${accent} 18%, transparent)`
                          : `1px solid color-mix(in srgb, ${accent} 14%, var(--color-border-light))`,
                      }}
                    >
                      <span
                        className="text-[color:var(--when-icon-color)]"
                        style={{
                          ["--when-icon-color" as string]: card.dark
                            ? `color-mix(in srgb, ${accent} 72%, white)`
                            : `color-mix(in srgb, ${accent} 76%, var(--color-company-ink))`,
                        }}
                      >
                        {card.icon}
                      </span>
                    </div>

                    <h3
                      className="mt-4 text-[14.8px] font-semibold leading-[1.3] tracking-[-0.015em] sm:text-[15.2px]"
                      style={{
                        color: card.dark ? "white" : "var(--color-text-light)",
                      }}
                    >
                      {step.title}
                    </h3>

                    <p
                      className="mt-2.5 text-[12.35px] leading-[1.74] sm:text-[12.85px]"
                      style={{
                        color: card.dark ? "rgba(255,255,255,0.62)" : "var(--color-muted-light)",
                      }}
                    >
                      {step.body}
                    </p>

                    <div className="mt-auto pt-5">
                      <div className="flex items-center gap-2.5">
                        <span
                          className="h-px w-8 rounded-full"
                          style={{
                            background: card.dark
                              ? `color-mix(in srgb, ${accent} 58%, white)`
                              : `color-mix(in srgb, ${accent} 18%, var(--color-border-light))`,
                          }}
                        />
                        <span
                          className="text-[10px] font-semibold tracking-[0.14em] uppercase"
                          style={{
                            color: card.dark
                              ? `color-mix(in srgb, ${accent} 68%, white)`
                              : "color-mix(in srgb, var(--color-subtle) 82%, white)",
                          }}
                        >
                          {card.footer}
                        </span>
                      </div>
                    </div>
                  </motion.article>
                );
              })}
            </div>
          </div>
        </motion.div>
      </Container>
    </section>
  );
}

/* ────────────────────────────────────────────────────────── */
/*  Card icons — clean line-style, matching SSP design lang   */
/* ────────────────────────────────────────────────────────── */

function DedicatedCapacityIcon() {
  return (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
      <rect x="1" y="3" width="15" height="13" rx="2" />
      <path d="M16 8h4a2 2 0 0 1 2 2v5a2 2 0 0 1-2 2h-1" />
      <circle cx="5.5" cy="18.5" r="2.5" />
      <circle cx="18.5" cy="18.5" r="2.5" />
      <path d="M8 18.5h8" />
    </svg>
  );
}

function EquipmentFitIcon() {
  return (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
      <path d="M12 3H5a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7" />
      <path d="M18.375 2.625a1 1 0 0 1 3 3l-9.013 9.014a2 2 0 0 1-.853.505l-2.873.84a.5.5 0 0 1-.62-.62l.84-2.873a2 2 0 0 1 .506-.852z" />
    </svg>
  );
}

function ExecutionControlIcon() {
  return (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
      <circle cx="12" cy="12" r="10" />
      <polyline points="12 6 12 12 16 14" />
    </svg>
  );
}

function AlternativeRouteIcon() {
  return (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
      <circle cx="18" cy="18" r="3" />
      <circle cx="6" cy="6" r="3" />
      <path d="M6 21V9a9 9 0 0 0 9 9" />
    </svg>
  );
}
