"use client";

import { motion, useReducedMotion } from "framer-motion";

/* ─────────────────────────────────────────────────────────────────
   Truck fleet scene — three hand-constructed isometric semi-trucks
   running in formation from the lower-right toward the upper-left
   (i.e. toward the SSP logo in the header).

   Construction notes
   ────────────────────
   Every truck is built from flat-shaded parallelograms — three tonal
   planes per solid (top, side, back) — to read as a clean, premium,
   editorial illustration rather than a traced or generated image.

   Local coordinates
   ────────────────────
   Each truck is drawn in its own local coordinate space where:
     • Length axis L  = (−20, −10)  per unit  (front of truck = upper-left)
     • Width axis  W  = (+20, −10)  per unit  (camera-facing right side)
     • Height axis H  = ( 0,  −20)  per unit  (up)
     • Anchor       = back-right-bottom corner of trailer at (460, 260)
     • Trailer      = 13 L × 2.5 W × 2.5 H
     • Cab          = 4.5 L × 2.5 W × 2.4 H, placed 0.8 L forward of trailer

   The three trucks share a single length-axis line so they read as a
   single formation on a single road — the hero of the section is the
   cyan lead truck, the others are tonal followers that recede into
   atmosphere via scale and value.
   ───────────────────────────────────────────────────────────────── */

type TruckVariant = "lead" | "mid" | "rear";

type TruckPalette = {
  trailerTop: string;
  trailerSide: string;
  trailerBack: string;
  trailerSeam: string;
  cabTop: string;
  cabSide: string;
  cabBack: string;
  cabEdge: string;
  windowTint: string;
  wheel: string;
  wheelRim: string;
  tailLight: string;
  shadow: string;
  brandStripe: string;
};

const TRUCK_PALETTES: Record<TruckVariant, TruckPalette> = {
  lead: {
    // Trailer in brand cyan — this is the hero
    trailerTop: "#18b8ea",
    trailerSide: "#0b8fbb",
    trailerBack: "#076a8c",
    trailerSeam: "rgba(255,255,255,0.22)",
    // Cab in deep ink-navy for contrast against cyan trailer
    cabTop: "#2d4867",
    cabSide: "#1c3551",
    cabBack: "#122847",
    cabEdge: "rgba(255,255,255,0.18)",
    windowTint: "rgba(200,230,240,0.55)",
    wheel: "#101723",
    wheelRim: "#394a60",
    tailLight: "#ef4444",
    shadow: "rgba(8,12,22,0.26)",
    brandStripe: "rgba(255,255,255,0.92)",
  },
  mid: {
    trailerTop: "#3b5775",
    trailerSide: "#2a4160",
    trailerBack: "#1c2f4b",
    trailerSeam: "rgba(255,255,255,0.14)",
    cabTop: "#3b5775",
    cabSide: "#2a4160",
    cabBack: "#1c2f4b",
    cabEdge: "rgba(255,255,255,0.12)",
    windowTint: "rgba(180,210,225,0.45)",
    wheel: "#101723",
    wheelRim: "#2e3d52",
    tailLight: "#d83a3a",
    shadow: "rgba(8,12,22,0.22)",
    brandStripe: "transparent",
  },
  rear: {
    // Desaturated and lifted to read as "further away / atmospheric"
    trailerTop: "#8692a3",
    trailerSide: "#707e92",
    trailerBack: "#5e6c80",
    trailerSeam: "rgba(255,255,255,0.18)",
    cabTop: "#8692a3",
    cabSide: "#707e92",
    cabBack: "#5e6c80",
    cabEdge: "rgba(255,255,255,0.22)",
    windowTint: "rgba(200,215,230,0.5)",
    wheel: "#1a2028",
    wheelRim: "#56627a",
    tailLight: "#b84949",
    shadow: "rgba(8,12,22,0.16)",
    brandStripe: "transparent",
  },
};

/* ─────────────────────────────────────────────────────────────────
   Single truck (local coords). Render order matters — wheels BEFORE
   body so the body overpaints the top half of each tyre, giving the
   "tucked under the chassis" read that cheap stamped-out trucks lack.
   ───────────────────────────────────────────────────────────────── */
function Truck({
  variant,
  wordmark = false,
}: {
  variant: TruckVariant;
  wordmark?: boolean;
}) {
  const c = TRUCK_PALETTES[variant];

  return (
    <g>
      {/* Ground contact shadow — a soft ellipse aligned to the truck's
          length axis (rotated by the 26.57° isometric tilt) and offset
          slightly lower-right to read as cast from an upper-left key light. */}
      <g transform="rotate(26.565 312 164)" opacity="0.85">
        <ellipse
          cx="312"
          cy="164"
          rx="175"
          ry="15"
          fill={c.shadow}
          opacity="0.55"
        />
        <ellipse
          cx="312"
          cy="164"
          rx="140"
          ry="9"
          fill={c.shadow}
          opacity="0.75"
        />
      </g>

      {/* Wheels — painted first so the body clips their upper halves */}
      <g>
        {/* Trailer tandem (rear-most, two axles) */}
        <ellipse cx="442" cy="251" rx="11.5" ry="5.6" fill={c.wheel} />
        <ellipse cx="442" cy="251" rx="4.5" ry="2.2" fill={c.wheelRim} opacity="0.75" />
        <ellipse cx="424" cy="242" rx="11.5" ry="5.6" fill={c.wheel} />
        <ellipse cx="424" cy="242" rx="4.5" ry="2.2" fill={c.wheelRim} opacity="0.75" />
        {/* Cab drive axle (rear of cab) */}
        <ellipse cx="168" cy="114" rx="10" ry="5" fill={c.wheel} />
        <ellipse cx="168" cy="114" rx="3.8" ry="1.9" fill={c.wheelRim} opacity="0.75" />
        {/* Cab front steer axle */}
        <ellipse cx="110" cy="85" rx="10" ry="5" fill={c.wheel} />
        <ellipse cx="110" cy="85" rx="3.8" ry="1.9" fill={c.wheelRim} opacity="0.75" />
      </g>

      {/* ─── Trailer ─── */}
      <g>
        {/* Back face (rear doors) */}
        <polygon points="460,260 510,235 510,185 460,210" fill={c.trailerBack} />
        {/* Right side (camera-facing long flank) */}
        <polygon points="460,260 200,130 200,80 460,210" fill={c.trailerSide} />
        {/* Top plane */}
        <polygon points="460,210 200,80 250,55 510,185" fill={c.trailerTop} />

        {/* Horizontal panel seam along the side */}
        <line
          x1="450"
          y1="230"
          x2="210"
          y2="110"
          stroke={c.trailerSeam}
          strokeWidth="0.5"
        />
        {/* Vertical door split on the back */}
        <line
          x1="485"
          y1="247.5"
          x2="485"
          y2="197.5"
          stroke={c.trailerSeam}
          strokeWidth="0.6"
        />
        {/* Top crown line (upper edge of side face, reads as a subtle rail) */}
        <line
          x1="460"
          y1="210"
          x2="200"
          y2="80"
          stroke={c.cabEdge}
          strokeWidth="0.6"
          opacity="0.7"
        />

        {/* Tail lights — small SSP-red accents on the back doors */}
        <rect
          x="465.5"
          y="250"
          width="4"
          height="2.8"
          rx="0.6"
          fill={c.tailLight}
          opacity="0.92"
        />
        <rect
          x="497.5"
          y="234"
          width="4"
          height="2.8"
          rx="0.6"
          fill={c.tailLight}
          opacity="0.92"
        />

        {/* Lead-only brand band — a single whisper-thin wordmark strip */}
        {wordmark ? (
          <g>
            <polygon
              points="410,244 230,154 230,142 410,232"
              fill={c.brandStripe}
              opacity="0.14"
            />
            <text
              x="320"
              y="200"
              transform="rotate(26.57 320 200)"
              textAnchor="middle"
              fontFamily="Inter, system-ui, sans-serif"
              fontSize="16"
              fontWeight="800"
              letterSpacing="6"
              fill={c.brandStripe}
              opacity="0.85"
            >
              SSP
            </text>
          </g>
        ) : null}
      </g>

      {/* ─── Cab ─── */}
      <g>
        {/* Back face (visible in the gap between cab and trailer) */}
        <polygon points="184,122 234,97 234,49 184,74" fill={c.cabBack} />
        {/* Right side */}
        <polygon points="184,122 94,77 94,29 184,74" fill={c.cabSide} />
        {/* Top plane */}
        <polygon points="184,74 94,29 144,4 234,49" fill={c.cabTop} />

        {/* Window glass — small rectangle along the top of the cab side
            (reads as the side window of a cabover driver cabin) */}
        <polygon
          points="170,64 110,34 110,20 170,50"
          fill={c.windowTint}
          opacity="0.9"
        />
        <line
          x1="170"
          y1="64"
          x2="110"
          y2="34"
          stroke={c.cabEdge}
          strokeWidth="0.4"
          opacity="0.6"
        />

        {/* Top crown */}
        <line
          x1="184"
          y1="74"
          x2="94"
          y2="29"
          stroke={c.cabEdge}
          strokeWidth="0.6"
          opacity="0.7"
        />
      </g>
    </g>
  );
}

/* ─────────────────────────────────────────────────────────────────
   The full scene: road, three trucks, and the cyan lead-glow pushing
   ahead of the formation.
   ───────────────────────────────────────────────────────────────── */

type TruckFleetSceneProps = {
  className?: string;
};

export function TruckFleetScene({ className }: TruckFleetSceneProps) {
  const reduced = useReducedMotion() ?? false;

  // Shared variants for the staggered scroll-in entrance
  const enterBase = { opacity: 0, x: 40, y: 20 };
  const enterRest = { opacity: 1, x: 0, y: 0 };

  return (
    <div className={className}>
      <svg
        viewBox="0 0 760 560"
        width="100%"
        height="100%"
        aria-hidden
        focusable="false"
        role="img"
        style={{ display: "block" }}
      >
        <defs>
          {/* Soft vignette that pulls the eye toward the lead truck */}
          <radialGradient id="why-ssp-scene-vignette" cx="30%" cy="32%" r="70%">
            <stop offset="0%" stopColor="rgba(16,167,216,0.10)" />
            <stop offset="55%" stopColor="rgba(16,167,216,0.03)" />
            <stop offset="100%" stopColor="rgba(16,167,216,0)" />
          </radialGradient>

          {/* Lead-truck forward-glow — the cyan beam of momentum pushing up-left */}
          <linearGradient
            id="why-ssp-lead-glow"
            x1="-115"
            y1="17.5"
            x2="-35"
            y2="-22.5"
            gradientUnits="userSpaceOnUse"
          >
            <stop offset="0%" stopColor="rgba(16,167,216,0.0)" />
            <stop offset="30%" stopColor="rgba(16,167,216,0.6)" />
            <stop offset="100%" stopColor="rgba(16,167,216,0.0)" />
          </linearGradient>

          {/* Road surface — deep ink with a faint upper highlight */}
          <linearGradient id="why-ssp-asphalt" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="#202b3d" />
            <stop offset="60%" stopColor="#1a2331" />
            <stop offset="100%" stopColor="#151c28" />
          </linearGradient>
        </defs>

        {/* Ambient cyan wash */}
        <rect
          x="0"
          y="0"
          width="760"
          height="560"
          fill="url(#why-ssp-scene-vignette)"
        />

        {/* ─── Road ─── A single isometric ribbon carrying all three trucks. */}
        <g>
          {/* Asphalt surface */}
          <polygon
            points="-115,17.5 885,517.5 965,477.5 -35,-22.5"
            fill="url(#why-ssp-asphalt)"
          />

          {/* Upper edge highlight (the "far" rail, catches light) */}
          <line
            x1="-35"
            y1="-22.5"
            x2="965"
            y2="477.5"
            stroke="rgba(255,255,255,0.10)"
            strokeWidth="1"
          />
          {/* Lower edge shadow (the "near" rail) */}
          <line
            x1="-115"
            y1="17.5"
            x2="885"
            y2="517.5"
            stroke="rgba(0,0,0,0.32)"
            strokeWidth="1"
          />

          {/* Center dashed lane markers — white, subtly animated along the
              road direction to imply forward motion */}
          {reduced ? (
            <line
              x1="-75"
              y1="-2.5"
              x2="925"
              y2="497.5"
              stroke="rgba(255,255,255,0.55)"
              strokeWidth="1.6"
              strokeDasharray="10 18"
            />
          ) : (
            <motion.line
              x1="-75"
              y1="-2.5"
              x2="925"
              y2="497.5"
              stroke="rgba(255,255,255,0.55)"
              strokeWidth="1.6"
              strokeDasharray="10 18"
              initial={{ strokeDashoffset: 0 }}
              animate={{ strokeDashoffset: -56 }}
              transition={{ duration: 2.4, repeat: Infinity, ease: "linear" }}
            />
          )}

          {/* Forward cyan beam — the lead's momentum extending past the
              front of the formation toward the logo in the header. The
              quad spans (road-far-end) → (road-edge-at-lead-front). */}
          <motion.polygon
            points="-115,17.5 130,135 210,95 -35,-22.5"
            fill="url(#why-ssp-lead-glow)"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{
              duration: reduced ? 0 : 0.9,
              delay: reduced ? 0 : 0.35,
              ease: [0.22, 1, 0.36, 1],
            }}
          />
          {reduced ? null : (
            <motion.line
              x1="-75"
              y1="-2.5"
              x2="170"
              y2="115"
              stroke="rgba(16,167,216,0.9)"
              strokeWidth="1.6"
              strokeDasharray="4 9"
              initial={{ strokeDashoffset: 0, opacity: 0 }}
              whileInView={{ opacity: 0.82 }}
              viewport={{ once: true, amount: 0.3 }}
              animate={{ strokeDashoffset: -26 }}
              transition={{
                strokeDashoffset: { duration: 1.1, repeat: Infinity, ease: "linear" },
                opacity: { duration: 0.6, delay: 0.5, ease: "easeOut" },
              }}
            />
          )}
        </g>

        {/* ─── Trucks ─── Painted rear → mid → lead so the cyan hero is on top. */}
        <motion.g
          transform="translate(480.8, 284.8) scale(0.52)"
          initial={enterBase}
          whileInView={enterRest}
          viewport={{ once: true, amount: 0.25 }}
          transition={{
            duration: reduced ? 0 : 0.7,
            delay: reduced ? 0 : 0.05,
            ease: [0.22, 1, 0.36, 1],
          }}
        >
          <Truck variant="rear" />
        </motion.g>

        <motion.g
          transform="translate(248.8, 162.8) scale(0.72)"
          initial={enterBase}
          whileInView={enterRest}
          viewport={{ once: true, amount: 0.25 }}
          transition={{
            duration: reduced ? 0 : 0.75,
            delay: reduced ? 0 : 0.18,
            ease: [0.22, 1, 0.36, 1],
          }}
        >
          <Truck variant="mid" />
        </motion.g>

        <motion.g
          transform="translate(-60, 0) scale(1)"
          initial={enterBase}
          whileInView={enterRest}
          viewport={{ once: true, amount: 0.25 }}
          transition={{
            duration: reduced ? 0 : 0.85,
            delay: reduced ? 0 : 0.32,
            ease: [0.22, 1, 0.36, 1],
          }}
        >
          <Truck variant="lead" wordmark />
        </motion.g>
      </svg>
    </div>
  );
}
