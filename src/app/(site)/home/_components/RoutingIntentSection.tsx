"use client";

import Link from "next/link";
import type { CSSProperties, FC, ReactNode } from "react";
import { motion, useReducedMotion, type Variants } from "framer-motion";
import { Container } from "@/app/(site)/components/layout/Container";
import { SectionSignalEyebrow } from "@/app/(site)/components/ui/SectionSignalEyebrow";
import { trackCtaClick } from "@/lib/analytics/cta";
import { cn } from "@/lib/cn";

const FOCUS_RING =
  "focus:outline-none focus-visible:ring-2 focus-visible:ring-[color:var(--color-menu-accent)] focus-visible:ring-offset-2 focus-visible:ring-offset-[color:var(--color-home-post-hero-platform)]";

const SECTION_EYEBROW = "Choose Your Path";
const SECTION_TITLE = "Get to the right team faster.";
const SECTION_SUPPORT =
  "Whether you are quoting freight, checking shipment status, or exploring a role with SSP, start with the team built for that conversation.";

/* ─────────────────────────────────────────────────────────────────
   Custom SSP glyphs — hand-tuned 1.6px strokes, matching the
   WhySspGlyph / WhenToChooseIcons vocabulary used across locked pages.
   Not Lucide. Intentional brand marks.
   ───────────────────────────────────────────────────────────────── */

const Svg = ({ children }: { children: ReactNode }) => (
  <svg
    width="34"
    height="34"
    viewBox="0 0 32 32"
    fill="none"
    stroke="currentColor"
    strokeWidth="1.6"
    strokeLinecap="round"
    strokeLinejoin="round"
    aria-hidden
  >
    {children}
  </svg>
);

/** Freight — long-hood tractor silhouette, we chevron lean. */
const FreightGlyph: FC = () => (
  <Svg>
    <path d="M3 20V11h14v9" />
    <path d="M17 13h6l4 4v3" />
    <path d="M3 20h24" />
    <circle cx="9" cy="22" r="2.3" />
    <circle cx="22" cy="22" r="2.3" />
    <path d="M20 13v-2" />
  </Svg>
);

/** Support — live signal / pulse flanked by two dispatch nodes. */
const SupportGlyph: FC = () => (
  <Svg>
    <circle cx="6.5" cy="16" r="1.8" />
    <circle cx="25.5" cy="16" r="1.8" />
    <path d="M8.5 16h2l2-5 3 10 3-8 2 3h2.5" />
    <path d="M6.5 11v-1a2 2 0 0 1 2-2h15a2 2 0 0 1 2 2v1" />
    <path d="M6.5 21v1a2 2 0 0 0 2 2h15a2 2 0 0 0 2-2v-1" />
  </Svg>
);

/** People — three-node team graph, origin-destination style. */
const PeopleGlyph: FC = () => (
  <Svg>
    <circle cx="16" cy="8" r="3" />
    <circle cx="7" cy="22" r="3" />
    <circle cx="25" cy="22" r="3" />
    <path d="M16 11v4" />
    <path d="M9.5 20.5 14.5 15" />
    <path d="M22.5 20.5 17.5 15" />
  </Svg>
);

type RoutingCard = {
  id: string;
  indexLabel: string;
  Glyph: FC;
  accentColor: string;
  audienceLabel: string;
  jobToBeDone: string;
  ctaLabel: string;
  href: string;
  ctaId: string;
  external?: boolean;
};

const ROUTING_CARDS: RoutingCard[] = [
  {
    id: "move-freight",
    indexLabel: "01",
    Glyph: FreightGlyph,
    accentColor: "var(--color-ssp-cyan-500)",
    audienceLabel: "Move Freight",
    jobToBeDone:
      "Review the modes, equipment, and cross-border capabilities that fit your lane requirements.",
    ctaLabel: "Explore Solutions",
    href: "/solutions",
    ctaId: "routing_move_freight_explore_solutions",
  },
  {
    id: "track-support",
    indexLabel: "02",
    Glyph: SupportGlyph,
    accentColor: "var(--color-ssp-cyan-500)",
    audienceLabel: "Track a Shipment",
    jobToBeDone:
      "Check shipment status and connect with the operating team responsible for the load.",
    ctaLabel: "Track Shipment",
    href: "/tracking",
    ctaId: "routing_track_support_track_shipment",
    external: true,
  },
  {
    id: "join-ssp",
    indexLabel: "03",
    Glyph: PeopleGlyph,
    accentColor: "var(--color-ssp-cyan-500)",
    audienceLabel: "Join SSP",
    jobToBeDone:
      "Explore driving, operations, and office roles across the business.",
    ctaLabel: "View Careers",
    href: "/careers",
    ctaId: "routing_join_ssp_view_careers",
  },
];

/* ─────────────────────────────────────────────────────────────────
   Ink medallion header — one canonical treatment across all cards.
   Matches hero ink vocabulary (midnight → cyan) for homepage continuity.
   Composed internal details: corner index, path-signal, whole-card arrow.
   ───────────────────────────────────────────────────────────────── */

function RoutingCardIconMedallion({
  Glyph,
  indexLabel,
}: {
  Glyph: FC;
  indexLabel: string;
}) {
  return (
    <div
      className={cn(
        "relative flex h-[7rem] w-full shrink-0 items-center justify-center overflow-hidden sm:h-[7.5rem]",
        "bg-[linear-gradient(135deg,#051a28_0%,#0b3e5e_52%,#0d4f78_100%)]",
        "transition-[filter] duration-500 ease-[cubic-bezier(0.22,1,0.36,1)] group-hover:brightness-[1.06]",
      )}
      aria-hidden
    >
      {/* Specular hi-light — reads as lacquered, not flat */}
      <div
        className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_98%_74%_at_50%_-20%,rgba(255,255,255,0.26),transparent_56%)]"
        aria-hidden
      />
      {/* Cyan corner wash — signature SSP brand air */}
      <div
        className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_72%_58%_at_100%_108%,rgba(16,167,216,0.3),transparent_54%)]"
        aria-hidden
      />
      {/* Top hairline + floor hairline for jewelry-grade edge */}
      <div
        className="pointer-events-none absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-white/30 to-transparent"
        aria-hidden
      />
      <div
        className="pointer-events-none absolute inset-x-6 bottom-0 h-px bg-gradient-to-r from-transparent via-white/18 to-transparent"
        aria-hidden
      />
      {/* Scan-line grain for depth */}
      <div
        className="pointer-events-none absolute inset-0 opacity-[0.06] mix-blend-overlay"
        style={{
          backgroundImage:
            "repeating-linear-gradient(180deg, rgba(255,255,255,0.38) 0 1px, transparent 1px 3px)",
        }}
        aria-hidden
      />

      {/* Top-left index kicker — classical magazine mark */}
      <div className="pointer-events-none absolute top-[0.95rem] left-[1.15rem] sm:top-[1.1rem] sm:left-[1.3rem]">
        <span className="font-mono text-[10.5px] font-semibold tracking-[0.18em] text-white/55 sm:text-[11px]">
          {indexLabel}
        </span>
      </div>

      {/* Bottom-right affordance — whole-card link, rises on hover */}
      <div
        className="pointer-events-none absolute right-[1.1rem] bottom-[0.85rem] text-white/45 transition-all duration-300 ease-[cubic-bezier(0.22,1,0.36,1)] group-hover:right-[0.95rem] group-hover:bottom-[0.95rem] group-hover:text-white/95 sm:right-[1.25rem] sm:bottom-[0.9rem]"
        aria-hidden
      >
        <svg width="17" height="17" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round">
          <path d="M7 17 17 7" />
          <path d="M8 7h9v9" />
        </svg>
      </div>

      {/* Glass mark — jewelry-scale, with Apple-tile micro-life on hover */}
      <div
        className={cn(
          "relative z-[1] grid h-[3.8rem] w-[3.8rem] place-items-center rounded-2xl sm:h-[4rem] sm:w-[4rem]",
          "border border-white/[0.2] bg-white/[0.07] text-white backdrop-blur-[1.5px]",
          "shadow-[inset_0_1px_0_rgba(255,255,255,0.26),0_16px_32px_-10px_rgba(0,0,0,0.6)]",
          "transition-[transform,border-color,background-color,box-shadow] duration-500 ease-[cubic-bezier(0.22,1,0.36,1)]",
          "motion-safe:group-hover:scale-[1.06] group-hover:border-white/[0.3] group-hover:bg-white/[0.1]",
          "group-hover:shadow-[inset_0_1px_0_rgba(255,255,255,0.34),0_22px_40px_-12px_rgba(0,0,0,0.65)]",
        )}
      >
        <span className="block transition-transform duration-500 ease-[cubic-bezier(0.22,1,0.36,1)] motion-safe:group-hover:scale-[1.04]">
          <Glyph />
        </span>
      </div>
    </div>
  );
}

export function RoutingIntentSection() {
  const reduceMotion = useReducedMotion() ?? false;

  const stagger: Variants = reduceMotion
    ? { hidden: { opacity: 1 }, show: { opacity: 1 } }
    : { hidden: {}, show: { transition: { staggerChildren: 0.04, delayChildren: 0 } } };

  const revealUp: Variants = reduceMotion
    ? { hidden: { opacity: 1, y: 0 }, show: { opacity: 1, y: 0 } }
    : { hidden: { opacity: 1, y: 10 }, show: { opacity: 1, y: 0 } };

  return (
    <section
      id="home-routing-intent"
      aria-labelledby="home-routing-intent-heading"
      className="relative bg-transparent pb-16 antialiased sm:pb-20 lg:pb-24"
    >
      <Container className="site-page-container relative pt-5 sm:pt-6">
        <motion.div
          className="mx-auto max-w-[36rem] text-center lg:max-w-[42rem]"
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, margin: "0px 0px 80px 0px" }}
          variants={revealUp}
          transition={{ duration: reduceMotion ? 0 : 0.3, ease: "easeOut" }}
        >
          <div className="flex justify-center">
            <SectionSignalEyebrow label={SECTION_EYEBROW} />
          </div>
          <h2
            id="home-routing-intent-heading"
            className="mt-4 text-[1.8rem] font-semibold leading-[1.1] tracking-[-0.03em] text-[color:var(--color-menu-title)] sm:text-[2rem] lg:text-[2.2rem]"
          >
            {SECTION_TITLE}
          </h2>
          <p className="mt-4 text-[15px] leading-[1.78] text-[color:var(--color-menu-muted)] sm:text-[15.5px] sm:leading-[1.82]">
            {SECTION_SUPPORT}
          </p>
        </motion.div>

        <motion.ul
          className="mt-11 grid gap-5 sm:mt-12 sm:grid-cols-3 sm:gap-6 lg:mt-14 lg:gap-7"
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, margin: "0px 0px 80px 0px" }}
          variants={stagger}
        >
          {ROUTING_CARDS.map((card) => {
            const accentStyle = {
              ["--card-accent" as string]: card.accentColor,
            } as CSSProperties;
            return (
              <motion.li
                key={card.id}
                variants={revealUp}
                transition={{ duration: reduceMotion ? 0 : 0.32, ease: [0.22, 1, 0.36, 1] }}
              >
                <article
                  style={accentStyle}
                  className={cn(
                    "group relative isolate flex h-full min-h-0 flex-col overflow-hidden site-cta-radius",
                    "border border-[color:var(--color-border-light-soft)] bg-white",
                    "shadow-[0_10px_24px_rgba(2,6,23,0.04)]",
                    "transition-all duration-300 ease-[cubic-bezier(0.22,1,0.36,1)]",
                    "motion-safe:hover:-translate-y-[2px] hover:border-[color:var(--color-menu-border)] hover:shadow-[0_18px_36px_rgba(2,6,23,0.08)]",
                  )}
                >
                  {/* Accent sheen on hover — matches SolutionsHubPage family card DNA */}
                  <div
                    className="pointer-events-none absolute inset-0 z-0 opacity-0 transition-opacity duration-500 ease-[cubic-bezier(0.22,1,0.36,1)] group-hover:opacity-[0.6] group-focus-within:opacity-[0.6]"
                    style={{
                      background:
                        "radial-gradient(118% 96% at 50% 100%, color-mix(in srgb, var(--card-accent) 7%, white) 0%, color-mix(in srgb, var(--card-accent) 2%, transparent) 46%, transparent 74%)",
                    }}
                    aria-hidden
                  />

                  <RoutingCardIconMedallion
                    Glyph={card.Glyph}
                    indexLabel={card.indexLabel}
                  />

                  <div className="relative z-[1] flex min-h-0 flex-1 flex-col px-[1.4rem] pt-[1.35rem] pb-[1.4rem] sm:px-[1.55rem] sm:pt-[1.5rem] sm:pb-[1.55rem]">
                    <h3 className="text-[1.14rem] font-semibold leading-[1.25] tracking-[-0.022em] text-[color:var(--color-menu-title)] sm:text-[1.22rem]">
                      {card.audienceLabel}
                    </h3>

                    <p className="mt-3 text-[14px] leading-[1.68] text-[color:var(--color-menu-muted)] sm:text-[14.5px] sm:leading-[1.72]">
                      {card.jobToBeDone}
                    </p>

                    {/* Baseline rule anchors the CTA (FamilyNavigationCard grammar) */}
                    <div className="mt-auto flex shrink-0 flex-col pt-5">
                      <div className="h-px w-full bg-[color:var(--color-border-light-soft)]" aria-hidden />
                      <span
                        className={cn(
                          "relative mt-4 inline-flex w-fit shrink-0 items-center gap-2 pb-0.5 text-[13px] font-semibold tracking-[0.05em]",
                          "text-[color:var(--color-menu-title)] transition-colors duration-200",
                          "after:pointer-events-none after:absolute after:right-0 after:-bottom-0.5 after:left-0 after:h-[1.5px] after:origin-left after:scale-x-0 after:bg-[color:var(--card-accent)] after:transition-transform after:duration-300 after:ease-[cubic-bezier(0.22,1,0.36,1)]",
                          "group-hover:text-[color:var(--card-accent)] group-hover:after:scale-x-100",
                          "group-focus-within:text-[color:var(--card-accent)] group-focus-within:after:scale-x-100",
                        )}
                      >
                        {card.ctaLabel}
                        <span
                          aria-hidden
                          className="inline-block translate-x-0 transition-transform duration-300 ease-[cubic-bezier(0.22,1,0.36,1)] motion-safe:group-hover:translate-x-[2px]"
                        >
                          &rarr;
                        </span>
                      </span>
                    </div>
                  </div>

                  {/* Whole-card link overlay (matches ModePathsSplitSection pattern) */}
                  <Link
                    href={card.href}
                    target={card.external ? "_blank" : undefined}
                    rel={card.external ? "noopener noreferrer" : undefined}
                    data-cta-id={card.ctaId}
                    aria-label={`${card.audienceLabel} — ${card.ctaLabel}`}
                    onClick={() =>
                      trackCtaClick({
                        ctaId: card.ctaId,
                        location: "home_routing_intent",
                        destination: card.href,
                        label: card.ctaLabel,
                      })
                    }
                    className={cn(
                      "absolute inset-0 z-[2] site-cta-radius",
                      FOCUS_RING,
                    )}
                  />
                </article>
              </motion.li>
            );
          })}
        </motion.ul>
      </Container>
    </section>
  );
}
