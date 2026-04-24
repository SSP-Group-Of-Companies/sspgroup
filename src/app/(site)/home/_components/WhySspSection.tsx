"use client";

import Image from "next/image";
import Link from "next/link";
import {
  animate,
  motion,
  useReducedMotion,
  type Variants,
} from "framer-motion";
import * as React from "react";
import { Globe, Truck, Waypoints } from "lucide-react";
import { Container } from "@/app/(site)/components/layout/Container";
import { SectionSignalEyebrow } from "@/app/(site)/components/ui/SectionSignalEyebrow";
import { trackCtaClick } from "@/lib/analytics/cta";
import { HOME_WHY_SSP_HEADING_ID, HOME_WHY_SSP_SECTION_ID } from "@/config/homeSections";
import { cn } from "@/lib/cn";

const SECTION_EYEBROW = "Why SSP";
const SECTION_TITLE = "Execution built for control.";
const SECTION_SUPPORT =
  "We link asset-based capacity to dispatch-led control across North America, from booking through final delivery. Ownership stays explicit, updates stay timely, and when conditions change, the next move is already defined so the load does not drift into ambiguity.";
const SECTION_HEADER_CTA_LABEL = "About SSP Group";
const SECTION_HEADER_CTA_HREF = "/about-us";

/* Decorative brand cyan used for SVG gradient stops + drop-shadow on
   the lane. Kept as an explicit hex to ensure the SVG attribute
   `stopColor` resolves reliably across WebKit/Gecko — CSS custom
   properties are not uniformly honored on SVG presentation
   attributes. The `SectionSignalEyebrow` accent consumes the token
   directly via `var(--color-ssp-cyan-500)`. */
const BRAND_CYAN_DECORATIVE = "#10A7D8";
const BRAND_CYAN_TOKEN = "var(--color-ssp-cyan-500)";

/* Matches homepage flagship section text-link CTA; ring offset follows this section surface. */
const HEADER_LINK_FOCUS =
  "focus:outline-none focus-visible:ring-2 focus-visible:ring-[color:var(--color-menu-accent)] focus-visible:ring-offset-2 focus-visible:ring-offset-[color:var(--color-surface-0)]";

const STAGE_ASPECT = "3 / 2";
/**
 * The isometric truck composition has built-in empty space at the top of its
 * 3:2 bounding box (see LEAD/UPPER/LOWER anchors). On large screens the grid
 * centers the two columns vertically; we apply a small upward translate so
 * the _visible_ truck content sits at the optical center of the row (instead
 * of the bounding-box center, which would read as slightly low).
 *
 * Using translate (not margin) keeps the card column untouched and does not
 * re-flow anything; the stage simply renders shifted in place.
 */
const STAGE_POSITION_CLASS =
  "lg:-translate-y-[4%] xl:-translate-y-[4%] xl:-mr-[calc(max(0px,(100vw-1440px)/2)+1.5rem)]";
const STAGE_SIZE_CLASS = "xl:w-[132%]";

const ROAD_A: readonly [number, number] = [0.12, 0.12];
const ROAD_B: readonly [number, number] = [0.9, 0.86];
const VA: readonly [number, number] = [ROAD_B[0] - ROAD_A[0], ROAD_B[1] - ROAD_A[1]];
const VA_LEN = Math.hypot(VA[0], VA[1]);
/* Screen-space “forward” along the road from A → B. Trucks face the opposite
   (toward the top-left); intro motion is implemented with negative t along this
   vector so they read as driving forward, not backing up. */
const FWD = { x: VA[0] / VA_LEN, y: VA[1] / VA_LEN } as const;
const LAT = { x: -FWD.y, y: FWD.x } as const;
const LATERAL_PER_ROAD = 0.28;

/* ── Lead cyan lane: tune to match the PNG trailer and “into the wall” fade.
   - LANE_LINE_A + chord A→B set the *default* travel direction; use LANE_AXIS_ROTATE_DEG
     to match the trailer’s isometric long axis without moving A and B.
   - t=1 is one full chord from A. LANE_T1 can be > 1.0 to extend **past** the chord
     toward the bottom-right (wall). */
const LANE_LINE_A: readonly [number, number] = [0.12, 0.12];
const LANE_LINE_B: readonly [number, number] = [0.9, 0.86];
/** degrees CCW. Negative tilts the strip; small values (e.g. −6…8) align long edges to the trailer. */
const LANE_AXIS_ROTATE_DEG = -6;
/** t along the (possibly rotated) ray from A, |chord| per unit. >1 continues past the original B. */
const LANE_T0 = 0.25;
const LANE_T1 = 1.2;
const LANE_HALF_WIDTH = 0.045;
/** Where the end fade *begins* (0–1), measured along the mask from LANE_T0 → LANE_T1. */
const LANE_TIP_FADE_START_FRAC = 0.55;
/** Slight taper at the far (wall) end as a multiple of LANE_HALF_WIDTH. */
const LANE_WIDTH_FAR_TAPER = 1.05;
/** Shift the entire lane along ± lane lateral (perpendicular) for fine placement. */
const LANE_LATERAL_SHIFT = 0.21;
/** Stretches how long “one t” is: 1.2 makes the strip 20% longer for the same t. */
const LANE_T_TO_WORLD = 1;

const LANE_CHORD: readonly [number, number] = [LANE_LINE_B[0] - LANE_LINE_A[0], LANE_LINE_B[1] - LANE_LINE_A[1]];
const LANE_CHORD_LEN = Math.hypot(LANE_CHORD[0], LANE_CHORD[1]) || 1e-6;
const LANE_CHORD_FWD0 = { x: LANE_CHORD[0] / LANE_CHORD_LEN, y: LANE_CHORD[1] / LANE_CHORD_LEN } as const;
const LANE_ROT_R = (LANE_AXIS_ROTATE_DEG * Math.PI) / 180;
const LANE_FWD = {
  x: LANE_CHORD_FWD0.x * Math.cos(LANE_ROT_R) - LANE_CHORD_FWD0.y * Math.sin(LANE_ROT_R),
  y: LANE_CHORD_FWD0.x * Math.sin(LANE_ROT_R) + LANE_CHORD_FWD0.y * Math.cos(LANE_ROT_R),
} as const;
const LANE_LAT = { x: -LANE_FWD.y, y: LANE_FWD.x } as const;
const LANE_STEP = LANE_CHORD_LEN * LANE_T_TO_WORLD;

/* Intro motion (same ratios as the reference): followers stop earlier; lead surges
   in the second half after a slow first half. */
const WHITE_TRAVEL_FRAC = 0.42;
const BLUE_TRAVEL_FRAC = 0.72;
const BLUE_FIRST_HALF = 0.22;
const INTRO_DURATION_S = 2;
const INTRO_FWD_SCALE = 0.2;

function smoothstep01(t: number) {
  const x = Math.min(1, Math.max(0, t));
  return x * x * (3 - 2 * x);
}

function followForwardU(p: number) {
  return WHITE_TRAVEL_FRAC * INTRO_FWD_SCALE * p;
}

function leadForwardU(p: number) {
  const b = BLUE_TRAVEL_FRAC * INTRO_FWD_SCALE;
  if (p <= 0.5) {
    return b * BLUE_FIRST_HALF * (p / 0.5);
  }
  const u = (p - 0.5) / 0.5;
  return b * (BLUE_FIRST_HALF + (1 - BLUE_FIRST_HALF) * smoothstep01(u));
}

type TruckLayout = {
  widthPct: number;
  forward: number;
  lateral: number;
  anchorX: number;
  anchorY: number;
  zIndex?: number;
  opacity?: number;
};

function roadOffset(forward: number, lateral: number) {
  const s = LATERAL_PER_ROAD;
  return {
    x: forward * (ROAD_B[0] - ROAD_A[0]) + lateral * LAT.x * s,
    y: forward * (ROAD_B[1] - ROAD_A[1]) + lateral * LAT.y * s,
  };
}

function sub2(
  a: { x: number; y: number },
  b: { x: number; y: number },
): { x: number; y: number } {
  return { x: a.x - b.x, y: a.y - b.y };
}

function leadMotionO(p: number) {
  const f = leadForwardU(p);
  const end = BLUE_TRAVEL_FRAC * INTRO_FWD_SCALE;
  return sub2(roadOffset(-f, 0), roadOffset(-end, 0));
}

function followerMotionO(p: number) {
  const f = followForwardU(p);
  const end = WHITE_TRAVEL_FRAC * INTRO_FWD_SCALE;
  return sub2(roadOffset(-f, 0), roadOffset(-end, 0));
}

const LEAD_TRUCK_LAYOUT: TruckLayout = {
  widthPct: 50,
  forward: 0.2,
  lateral: 0,
  anchorX: -0.12,
  anchorY: 0.08,
  zIndex: 30,
};

const UPPER_FOLLOWER_LAYOUT: TruckLayout = {
  widthPct: 100,
  forward: -0.12,
  lateral: 0.15,
  anchorX: 0.614,
  anchorY: 0.337,
  zIndex: 10,
  opacity: 1,
};

const LOWER_FOLLOWER_LAYOUT: TruckLayout = {
  widthPct: 100,
  forward: -0.12,
  lateral: -0.15,
  anchorX: 0.17,
  anchorY: 0.7,
  zIndex: 20,
  opacity: 1,
};

const LEAD_TRUCK_SIZES = "(min-width: 1280px) 53vw, (min-width: 1024px) 42vw, 84vw";
const FOLLOWER_TRUCK_SIZES = "(min-width: 1280px) 22vw, (min-width: 1024px) 18vw, 36vw";
/** Dashed “shimmer” uses the same centerline, inset slightly from the ends. */
const LANE_SHIM_T0 = LANE_T0 + 0.08;
const LANE_SHIM_T1 = LANE_T1 - 0.04;

function laneStripPoint(t: number): [number, number] {
  return [
    LANE_LINE_A[0] + t * LANE_STEP * LANE_FWD.x + LANE_LATERAL_SHIFT * LANE_LAT.x,
    LANE_LINE_A[1] + t * LANE_STEP * LANE_FWD.y + LANE_LATERAL_SHIFT * LANE_LAT.y,
  ];
}
function lanePointsActual(): [number, number, number, number, number, number, number, number] {
  const w = LANE_HALF_WIDTH;
  const wf = w * LANE_WIDTH_FAR_TAPER;
  const p0 = laneStripPoint(LANE_T0);
  const p1 = laneStripPoint(LANE_T1);
  const aL: [number, number] = [p0[0] - w * LANE_LAT.x, p0[1] - w * LANE_LAT.y];
  const aR: [number, number] = [p0[0] + w * LANE_LAT.x, p0[1] + w * LANE_LAT.y];
  const bL: [number, number] = [p1[0] - wf * LANE_LAT.x, p1[1] - wf * LANE_LAT.y];
  const bR: [number, number] = [p1[0] + wf * LANE_LAT.x, p1[1] + wf * LANE_LAT.y];
  return [aL[0], aL[1], aR[0], aR[1], bR[0], bR[1], bL[0], bL[1]];
}
function leadLanePolygon() {
  const p = lanePointsActual();
  return `${p[0] * 100},${p[1] * 100} ${p[2] * 100},${p[3] * 100} ${p[4] * 100},${p[5] * 100} ${p[6] * 100},${p[7] * 100}`;
}
function leadLaneShimmerLine(): readonly [number, number, number, number] {
  const p0 = laneStripPoint(LANE_SHIM_T0);
  const p1 = laneStripPoint(LANE_SHIM_T1);
  return [p0[0] * 100, p0[1] * 100, p1[0] * 100, p1[1] * 100];
}

type Pillar = {
  id: string;
  /** Maps to a Lucide mark aligned with the headline (execution path · fleet · North America). */
  icon: "execution" | "capacity" | "crossBorder";
  title: string;
  body: string;
};

const PILLARS: readonly Pillar[] = [
  {
    id: "own-the-load",
    icon: "execution",
    title: "Operational ownership is defined early",
    body: "Freight performs better when planning, communication, and escalation ownership are clear before the shipment starts moving. That discipline is built into how we run every load.",
  },
  {
    id: "ship-what-we-promise",
    icon: "capacity",
    title: "Capacity is backed by execution discipline",
    body: "Assets matter, but so do routing decisions, communication cadence, and follow-through. We pairs fleet strength with trusted carrier support so capacity stays usable when conditions tighten.",
  },
  {
    id: "show-up-ready",
    icon: "crossBorder",
    title: "Cross-border programs run with tighter control",
    body: "Canada-U.S.-Mexico freight requires more than linehaul coverage. It requires documentation control, compliance discipline, and operating coordination that protect execution at the border.",
  },
] as const;

const PILLAR_ICON_CLASS = "h-[22px] w-[22px] shrink-0" as const;
const PILLAR_ICON_STROKE = 1.6 as const;

function PillarIcon({ icon }: { icon: Pillar["icon"] }) {
  if (icon === "execution") {
    return (
      <Waypoints
        className={PILLAR_ICON_CLASS}
        strokeWidth={PILLAR_ICON_STROKE}
        absoluteStrokeWidth
        aria-hidden
      />
    );
  }
  if (icon === "capacity") {
    return (
      <Truck
        className={PILLAR_ICON_CLASS}
        strokeWidth={PILLAR_ICON_STROKE}
        absoluteStrokeWidth
        aria-hidden
      />
    );
  }
  return (
    <Globe
      className={PILLAR_ICON_CLASS}
      strokeWidth={PILLAR_ICON_STROKE}
      absoluteStrokeWidth
      aria-hidden
    />
  );
}

/**
 * Editorial pillar row — matches the rest of the homepage's chapter grammar:
 *   • No boxed card; rows are separated by hairlines like the Industries index.
 *   • Thin cyan marker appears on hover/focus (same pattern as Industries rows).
 *   • Icon is a bare stroked Lucide mark — no chip, no drop shadow — and nudges
 *     horizontally on hover, echoing the editorial arrow cues in other sections.
 */
function PillarRow({
  pillar,
  isLast,
  reduced,
}: {
  pillar: Pillar;
  isLast: boolean;
  reduced: boolean;
}) {
  const variants: Variants = reduced
    ? { hidden: { opacity: 1, y: 0 }, show: { opacity: 1, y: 0 } }
    : { hidden: { opacity: 1, y: 10 }, show: { opacity: 1, y: 0 } };

  return (
    <motion.div
      variants={variants}
      transition={{
        duration: reduced ? 0 : 0.38,
        ease: [0.22, 1, 0.36, 1],
      }}
      className={cn(
        "group/row relative flex items-start gap-5 py-6 pr-2 pl-5 sm:gap-6 sm:py-7 sm:pl-6",
        "transition-colors duration-300 ease-[cubic-bezier(0.22,1,0.36,1)]",
        "hover:bg-[color-mix(in_srgb,var(--color-ssp-cyan-500)_4%,transparent)]",
        !isLast && "border-b border-[color:var(--color-border-light-soft)]",
      )}
    >
      {/* Cyan marker — thin vertical bar pinned to the left edge, appears on hover. */}
      <span
        aria-hidden
        className="absolute top-1/2 left-0 h-10 w-[2px] -translate-y-1/2 opacity-0 transition-opacity duration-300 ease-[cubic-bezier(0.22,1,0.36,1)] group-hover/row:opacity-100"
        style={{ backgroundColor: "var(--color-ssp-cyan-500)" }}
      />

      <div className="mt-[3px] flex-shrink-0 text-[color:var(--color-ssp-cyan-500)] transition-transform duration-300 ease-[cubic-bezier(0.22,1,0.36,1)] motion-safe:group-hover/row:translate-x-[2px]">
        <PillarIcon icon={pillar.icon} />
      </div>

      <div className="min-w-0">
        <h3 className="text-[1.06rem] font-semibold leading-[1.22] tracking-[-0.014em] text-[color:var(--color-text-strong)] sm:text-[1.14rem]">
          {pillar.title}
        </h3>
        <p className="mt-2 max-w-[56ch] text-[13.5px] leading-[1.68] text-[color:var(--color-muted)] sm:text-[14px]">
          {pillar.body}
        </p>
      </div>
    </motion.div>
  );
}

function WhySspLeadCyanLaneSimplified({ p }: { p: number }) {
  const id = React.useId().replace(/:/g, "");
  const poly = leadLanePolygon();
  const maskNear = laneStripPoint(LANE_T0);
  const maskWall = laneStripPoint(LANE_T1);
  const tipFadeStartPct = (LANE_TIP_FADE_START_FRAC * 100).toFixed(2);
  const grad0 = laneStripPoint(LANE_T0);
  const grad1 = laneStripPoint(LANE_T1);
  return (
    <div className="pointer-events-none absolute inset-0 z-[5] h-full w-full overflow-visible">
      <svg
        className="h-full w-full"
        viewBox="0 0 100 100"
        preserveAspectRatio="none"
        style={{ display: "block", overflow: "visible" as const }}
        overflow="visible"
        aria-hidden
        focusable="false"
      >
        <defs>
          <linearGradient
            id={`wss-lane-cyan-${id}`}
            x1={grad0[0] * 100}
            y1={grad0[1] * 100}
            x2={grad1[0] * 100}
            y2={grad1[1] * 100}
            gradientUnits="userSpaceOnUse"
          >
            <stop offset="0%" stopColor={BRAND_CYAN_DECORATIVE} stopOpacity="0" />
            <stop offset="22%" stopColor={BRAND_CYAN_DECORATIVE} stopOpacity="0.6" />
            <stop offset="72%" stopColor="#0B8FBB" stopOpacity="0.9" />
            <stop offset="100%" stopColor="#0A7BA1" stopOpacity="1" />
          </linearGradient>
          <linearGradient
            id={`wss-lane-m-${id}`}
            x1={maskNear[0] * 100}
            y1={maskNear[1] * 100}
            x2={maskWall[0] * 100}
            y2={maskWall[1] * 100}
            gradientUnits="userSpaceOnUse"
          >
            <stop offset="0%" stopColor="white" stopOpacity="1" />
            <stop offset={`${tipFadeStartPct}%`} stopColor="white" stopOpacity="1" />
            <stop offset="88%" stopColor="white" stopOpacity="0.22" />
            <stop offset="100%" stopColor="white" stopOpacity="0" />
          </linearGradient>
          {/*
            Oversized so when LANE_T1>1 the lane isn’t clipping at the right/bottom; still in userSpaceOnUse. */}
          <mask
            id={`wss-lane-mask-${id}`}
            style={{ maskType: "luminance" }}
            maskUnits="userSpaceOnUse"
            x="-20"
            y="-20"
            width="200"
            height="200"
          >
            <rect x="-20" y="-20" width="200" height="200" fill="black" />
            <rect x="-20" y="-20" width="200" height="200" fill={`url(#wss-lane-m-${id})`} />
          </mask>
        </defs>
        <g>
          <g mask={`url(#wss-lane-mask-${id})`}>
            <polygon
              points={poly}
              fill={`url(#wss-lane-cyan-${id})`}
              style={{
                filter: `drop-shadow(0 2px 4px color-mix(in srgb, ${BRAND_CYAN_DECORATIVE} 25%, transparent))`,
                opacity: Math.min(1, 0.25 + p * 0.75),
              }}
            />
          </g>
        </g>
        {/* Dashed “shimmer” is the section’s primary motion cue. Always mounted
            (no p-gate) and driven by CSS keyframes on stroke-dashoffset so
            production builds never lose it. Opacity fades in with the intro
            via inline style (plain CSS property, not a WAAPI-candidate). */}
        {(() => {
          const s = leadLaneShimmerLine();
          return (
            <line
              x1={s[0]}
              y1={s[1]}
              x2={s[2]}
              y2={s[3]}
              stroke="rgba(255,255,255,0.35)"
              strokeWidth="0.35"
              strokeLinecap="round"
              fill="none"
              strokeDasharray="3 12"
              className="animate-ssp-lane-dash"
              style={{
                mixBlendMode: "overlay",
                opacity: Math.min(1, 0.2 + p * 0.8),
              }}
            />
          );
        })()}
      </svg>
    </div>
  );
}

function AnimatedTruck({
  src,
  alt,
  layout,
  intrinsicWidth,
  intrinsicHeight,
  sizes,
  role,
  enterDelay,
  p,
  reduced,
}: {
  src: string;
  alt: string;
  layout: TruckLayout;
  intrinsicWidth: number;
  intrinsicHeight: number;
  sizes: string;
  role: "lead" | "follower";
  enterDelay: number;
  p: number;
  reduced: boolean;
}) {
  const o = roadOffset(layout.forward, layout.lateral);
  const mot = reduced
    ? { x: 0, y: 0 }
    : role === "lead"
      ? leadMotionO(p)
      : followerMotionO(p);
  const left = (layout.anchorX + o.x + mot.x) * 100;
  const top = (layout.anchorY + o.y + mot.y) * 100;
  const style = {
    left: `${left}%`,
    top: `${top}%`,
    width: `${layout.widthPct}%`,
    zIndex: layout.zIndex,
    opacity: layout.opacity,
  } as const;

  /* Visible-first variants — children inherit hidden/show from the
     parent stagger (`fadeUp` on the stage), but we never render at
     opacity: 0 so the trucks remain visible even if the viewport
     observer misses this stage on a slow device. The lane animation
     handled separately in `WhySspLeadCyanLaneSimplified` carries the
     cinematic entrance. */
  const variants: Variants = reduced
    ? { hidden: { opacity: layout.opacity ?? 1, y: 0 }, show: { opacity: layout.opacity ?? 1, y: 0 } }
    : {
        hidden: { opacity: layout.opacity ?? 1, y: 10 },
        show: { opacity: layout.opacity ?? 1, y: 0 },
      };

  return (
    <motion.div
      className="absolute will-change-transform"
      style={style}
      variants={variants}
      transition={{
        duration: reduced ? 0 : 0.38,
        delay: reduced ? 0 : enterDelay,
        ease: [0.22, 1, 0.36, 1],
      }}
    >
      <Image
        src={src}
        alt={alt}
        width={intrinsicWidth}
        height={intrinsicHeight}
        sizes={sizes}
        className="block h-auto w-full select-none"
        priority={false}
        draggable={false}
      />
    </motion.div>
  );
}

export function WhySspSection() {
  const reduced = useReducedMotion() ?? false;
  const headingId = HOME_WHY_SSP_HEADING_ID;
  const [p, setP] = React.useState(0);

  /* Lane dash + lead motion are gated on `p` → 1. Gating the intro on
     IntersectionObserver was still unreliable on some prod builds / mobile
     WebViews: `p` never completed, so the stage stayed at p≈0 (static).
     We run the intro on mount (when motion is allowed) so the timeline and
     looping lane always reach the animated state; the section is often below
     the fold on first paint, so the intro mostly finishes off-screen. */
  React.useEffect(() => {
    if (reduced) {
      setP(1);
      return;
    }
    const c = animate(0, 1, {
      duration: INTRO_DURATION_S,
      ease: "linear",
      onUpdate: (v) => setP(v),
      onComplete: () => setP(1),
    });
    return () => c.stop();
  }, [reduced]);

  const stagger: Variants = reduced
    ? { hidden: { opacity: 1 }, show: { opacity: 1 } }
    : {
        hidden: {},
        show: { transition: { staggerChildren: 0.05, delayChildren: 0.03 } },
      };

  const fadeUp: Variants = reduced
    ? { hidden: { opacity: 1, y: 0 }, show: { opacity: 1, y: 0 } }
    : { hidden: { opacity: 1, y: 10 }, show: { opacity: 1, y: 0 } };

  return (
    <section
      id={HOME_WHY_SSP_SECTION_ID}
      aria-labelledby={headingId}
      className="relative overflow-hidden scroll-mt-16 py-20 sm:py-24 lg:py-28"
      style={{ backgroundColor: "var(--color-surface-0)" }}
    >
      <div
        className="pointer-events-none absolute inset-x-0 top-0 z-[3] h-px"
        style={{
          background:
            "linear-gradient(90deg, transparent 3%, color-mix(in srgb, var(--color-ssp-cyan-500) 55%, transparent) 50%, transparent 97%)",
        }}
        aria-hidden
      />
      <div
        className="pointer-events-none absolute inset-x-0 top-0 z-[2] h-12"
        style={{
          background:
            "linear-gradient(180deg, color-mix(in srgb, var(--color-ssp-cyan-500) 6%, transparent) 0%, transparent 100%)",
        }}
        aria-hidden
      />

      <div
        className="pointer-events-none absolute -bottom-40 -right-[14%] h-[38rem] w-[40rem] rounded-full opacity-80 blur-[150px]"
        style={{
          background:
            "radial-gradient(circle, color-mix(in srgb, var(--color-ssp-cyan-500) 18%, transparent) 0%, transparent 70%)",
        }}
        aria-hidden
      />
      <div
        className="pointer-events-none absolute -top-32 right-[-10%] h-[28rem] w-[30rem] rounded-full opacity-60 blur-[140px]"
        style={{
          background:
            "radial-gradient(circle, color-mix(in srgb, var(--color-ssp-cyan-500) 10%, transparent) 0%, transparent 70%)",
        }}
        aria-hidden
      />
      <div
        className="pointer-events-none absolute -bottom-32 -left-[12%] h-[30rem] w-[32rem] rounded-full opacity-50 blur-[140px]"
        style={{
          background:
            "radial-gradient(circle, rgba(15,23,42,0.05) 0%, transparent 70%)",
        }}
        aria-hidden
      />

      <Container className="site-page-container relative z-[1]">
        <motion.div
          className="flex flex-col gap-6 sm:flex-row sm:items-end sm:justify-between sm:gap-10"
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, amount: 0.2 }}
          variants={fadeUp}
          transition={{ duration: reduced ? 0 : 0.38, ease: "easeOut" }}
        >
          <div className="min-w-0 max-w-[40rem]">
            <SectionSignalEyebrow
              label={SECTION_EYEBROW}
              accentColor={BRAND_CYAN_TOKEN}
            />
            <h2
              id={headingId}
              className="mt-4 text-balance text-[2rem] font-semibold leading-[1.06] tracking-[-0.028em] text-[color:var(--color-text-strong)] sm:text-[2.4rem] lg:text-[2.75rem] lg:leading-[1.04]"
            >
              {SECTION_TITLE}
            </h2>
            <p className="mt-4 max-w-[40rem] text-[14.5px] leading-[1.72] text-[color:var(--color-muted)] sm:text-[15px]">
              {SECTION_SUPPORT}
            </p>
          </div>

          <Link
            href={SECTION_HEADER_CTA_HREF}
            data-cta-id="home_why_ssp_about_ssp"
            onClick={() =>
              trackCtaClick({
                ctaId: "home_why_ssp_about_ssp",
                location: "home_why_ssp",
                destination: SECTION_HEADER_CTA_HREF,
                label: SECTION_HEADER_CTA_LABEL,
              })
            }
            className={cn(
              "group/all relative inline-flex w-fit shrink-0 items-center gap-2 self-start pb-0.5 text-[13px] font-semibold tracking-[0.05em] sm:self-end",
              "text-[color:var(--color-text-strong)] transition-colors duration-200 hover:text-[color:var(--color-ssp-cyan-600)]",
              "after:pointer-events-none after:absolute after:right-0 after:-bottom-0.5 after:left-0 after:h-[1.5px] after:origin-left after:scale-x-0 after:bg-[color:var(--color-ssp-cyan-500)] after:transition-transform after:duration-300 after:ease-[cubic-bezier(0.22,1,0.36,1)]",
              "hover:after:scale-x-100",
              HEADER_LINK_FOCUS,
            )}
          >
            {SECTION_HEADER_CTA_LABEL}
            <span
              aria-hidden
              className="inline-block translate-x-0 transition-transform duration-300 ease-[cubic-bezier(0.22,1,0.36,1)] motion-safe:group-hover/all:translate-x-[2px]"
            >
              &rarr;
            </span>
          </Link>
        </motion.div>

        <motion.div
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, amount: 0.15 }}
          variants={stagger}
          className="mt-12 grid grid-cols-1 gap-12 lg:mt-14 lg:grid-cols-[minmax(0,1.12fr)_minmax(0,1fr)] lg:items-center lg:gap-12 xl:grid-cols-[minmax(0,1.08fr)_minmax(0,1fr)] xl:gap-14"
        >
          <div className="relative flex flex-col lg:pr-6">
            <motion.div
              variants={fadeUp}
              transition={{ duration: reduced ? 0 : 0.38, ease: [0.22, 1, 0.36, 1] }}
              className="border-t border-[color:var(--color-border-light-soft)]"
            >
              {PILLARS.map((pillar, idx) => (
                <PillarRow
                  key={pillar.id}
                  pillar={pillar}
                  isLast={idx === PILLARS.length - 1}
                  reduced={reduced}
                />
              ))}
            </motion.div>
          </div>

          <motion.div
            variants={fadeUp}
            transition={{
              duration: reduced ? 0 : 0.38,
              ease: [0.22, 1, 0.36, 1],
            }}
            className={`relative ml-auto w-full overflow-visible ${STAGE_SIZE_CLASS} ${STAGE_POSITION_CLASS}`}
            style={{ aspectRatio: STAGE_ASPECT }}
            role="img"
            aria-label="We lead truck flanked by two follower trucks in escort formation with a cyan lane under the lead"
          >
            <WhySspLeadCyanLaneSimplified p={p} />
            <AnimatedTruck
              src="/_optimized/brand/leadTruckImg.png"
              alt=""
              layout={LEAD_TRUCK_LAYOUT}
              intrinsicWidth={3026}
              intrinsicHeight={1979}
              sizes={LEAD_TRUCK_SIZES}
              role="lead"
              enterDelay={0.1}
              p={p}
              reduced={reduced}
            />
            <AnimatedTruck
              src="/_optimized/brand/followerTruck.png"
              alt=""
              layout={UPPER_FOLLOWER_LAYOUT}
              intrinsicWidth={2546}
              intrinsicHeight={1580}
              sizes={FOLLOWER_TRUCK_SIZES}
              role="follower"
              enterDelay={0.22}
              p={p}
              reduced={reduced}
            />
            <AnimatedTruck
              src="/_optimized/brand/followerTruck.png"
              alt=""
              layout={LOWER_FOLLOWER_LAYOUT}
              intrinsicWidth={2546}
              intrinsicHeight={1580}
              sizes={FOLLOWER_TRUCK_SIZES}
              role="follower"
              enterDelay={0.3}
              p={p}
              reduced={reduced}
            />
          </motion.div>
        </motion.div>
      </Container>
    </section>
  );
}
