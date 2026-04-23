"use client";

import * as React from "react";
import Link from "next/link";
import { AnimatePresence, motion, useReducedMotion, type Variants } from "framer-motion";
import { Container } from "@/app/(site)/components/layout/Container";
import { SectionSignalEyebrow } from "@/app/(site)/components/ui/SectionSignalEyebrow";
import { SectionImage } from "@/components/media/SectionImage";
import { INDUSTRIES_SECTION, INDUSTRY_SLIDES } from "@/config/industries";
import { trackCtaClick } from "@/lib/analytics/cta";
import { cn } from "@/lib/cn";

/* ─────────────────────────────────────────────────────────────────
   Industries — "The Industry Atlas".

   A dark editorial chapter that breaks the page's airy white rhythm
   into cinema. Left: a tall spotlight that cross-fades between
   industries. Right: a typographic index of all seven sectors — no
   arrows, no pagination, no hidden content. Hovering or focusing any
   row previews it in the spotlight; clicking navigates to the
   industry page. On mobile the layout collapses into compact
   thumbnail list-rows that preserve the same grammar.

   Transition signature: cyan hairline opens the section (continuing
   the site-wide transition mark established by the Hero and the
   HomePostHeroBand), and a second hairline closes it into whatever
   comes next.
   ───────────────────────────────────────────────────────────────── */

const SECTION_EYEBROW = "Industries We Serve";
/* Headline rhymes intentionally with the "What we move" section
   above — "Four ways we move freight." ↔ "Seven sectors. One standard."
   The numeric pairing (four / seven) gives the homepage a subtle
   numerical rhythm as the reader scrolls, and the period-hard
   cadence signals these two sections as paired chapter titles. */
const SECTION_TITLE = "Seven sectors. One standard.";
const SECTION_SUPPORT =
  "Timing, compliance, and load handling are not add-ons: they are constraints that change how the work is planned, staffed, and executed for each market.";

const FOCUS_RING_DARK =
  "focus:outline-none focus-visible:ring-2 focus-visible:ring-[color:var(--color-ssp-cyan-500)] focus-visible:ring-offset-2 focus-visible:ring-offset-[color:var(--color-company-ink)]";

/* Format numbers as "01", "07" — the catalog convention that gives
   the index its editorial weight without needing explicit UI chrome. */
const formatIndex = (n: number) => String(n).padStart(2, "0");

/* Auto-advance cadence. 6 seconds per industry is the editorial sweet
   spot: long enough to register the image, read the copy, and decide;
   short enough that a user scanning casually still sees every sector
   within ~42s. Wired to the CSS @keyframes industries-progress via the
   inline `animation` property on the progress bar. */
const AUTO_ADVANCE_MS = 6000;

/* ─────────────────────────────────────────────────────────────────
   Spotlight — the cinematic left column. All images are stacked and
   cross-faded via opacity, so the swap is frame-perfect. The
   bottom-anchored copy (index, name, hairline, descriptor, CTA)
   AnimatePresence-swaps in sync with the active image.
   ───────────────────────────────────────────────────────────────── */

function IndustrySpotlight({
  activeIndex,
  reduceMotion,
}: {
  activeIndex: number;
  reduceMotion: boolean;
}) {
  const active = INDUSTRY_SLIDES[activeIndex];
  const total = INDUSTRY_SLIDES.length;

  return (
    <div className="relative overflow-hidden site-cta-radius border border-white/[0.09] shadow-[0_24px_60px_rgba(2,6,23,0.5)]">
      {/*
        Cinematic landscape frame. aspect-[3/2] is the classic editorial
        proportion — wide enough to feel filmic, short enough that the
        whole chapter fits inside a laptop viewport without scrolling.
        The max-h clamp prevents the spotlight from growing uncontrollably
        on very wide screens: it stays generous, never dominant.
      */}
      <div className="relative aspect-[3/2] max-h-[clamp(360px,48vh,520px)] w-full">
        {INDUSTRY_SLIDES.map((slide, idx) => (
          <div
            key={slide.key}
            className="absolute inset-0 transition-opacity duration-[550ms] ease-[cubic-bezier(0.22,1,0.36,1)]"
            style={{ opacity: idx === activeIndex ? 1 : 0 }}
            aria-hidden={idx !== activeIndex}
          >
            <SectionImage
              src={slide.image}
              alt={`${slide.label} — sector imagery`}
              fill
              className="object-cover"
              /* 3:2 landscape on lg+ — the spotlight takes roughly half
                 the viewport width, so 55vw is a generous upper bound
                 for the sizes the browser may request. */
              sizes="(min-width: 1280px) 50vw, (min-width: 1024px) 55vw, 100vw"
              quality={88}
              priority={idx === 0}
            />
          </div>
        ))}

        {/* Cinematic overlay — lighter at the top so the image breathes
            and the composition reads sharp, deepening toward the bottom
            where the editorial copy lives. Bottom opacity is held at
            0.82 (not 0.9) so imagery keeps presence *through* the copy
            block — the image is still visible as atmosphere, not just
            as a backdrop that disappears behind a dark pool. */}
        <div
          className="absolute inset-0"
          aria-hidden
          style={{
            background:
              "linear-gradient(180deg, rgba(8,26,43,0.08) 0%, rgba(8,26,43,0.02) 28%, rgba(8,26,43,0.42) 66%, rgba(8,26,43,0.82) 100%)",
          }}
        />
        {/* Soft left-edge vignette — almost imperceptible, just enough
            to protect the copy when imagery is busy or bright. */}
        <div
          className="absolute inset-0"
          aria-hidden
          style={{
            background:
              "linear-gradient(90deg, rgba(8,26,43,0.22) 0%, rgba(8,26,43,0.08) 24%, rgba(8,26,43,0) 52%)",
          }}
        />

        {/* Top-left index — catalog convention, "03 / 07" style. */}
        <div className="absolute top-5 left-6 font-mono text-[11px] font-medium tracking-[0.2em] text-white/80 sm:top-6 sm:left-7">
          <AnimatePresence mode="wait" initial={false}>
            <motion.span
              key={`spotlight-idx-${active.key}`}
              initial={reduceMotion ? { opacity: 1 } : { opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={reduceMotion ? { opacity: 0 } : { opacity: 0 }}
              transition={{ duration: reduceMotion ? 0 : 0.28, ease: "easeOut" }}
              className="inline-block"
            >
              <span className="text-white">{formatIndex(activeIndex + 1)}</span>
              <span className="text-white/45"> / {formatIndex(total)}</span>
            </motion.span>
          </AnimatePresence>
        </div>

        {/* Bottom-anchored editorial copy. Padding matches the landscape
            proportion — tighter vertical since the frame is shorter,
            generous horizontal so the type breathes. */}
        <div className="absolute inset-x-0 bottom-0 px-6 pb-6 sm:px-7 sm:pb-7 lg:px-8 lg:pb-7">
          <AnimatePresence mode="wait" initial={false}>
            <motion.div
              key={`spotlight-copy-${active.key}`}
              initial={reduceMotion ? { opacity: 1, y: 0 } : { opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={reduceMotion ? { opacity: 0 } : { opacity: 0, y: -6 }}
              transition={{ duration: reduceMotion ? 0 : 0.38, ease: [0.22, 1, 0.36, 1] }}
            >
              <h3 className="text-[1.85rem] font-semibold leading-[1.05] tracking-[-0.022em] text-white sm:text-[2.1rem] lg:text-[2.35rem]">
                {active.label}
              </h3>
              {/* Signature cyan hairline — 2px × 64px carries the optical
                  weight the editorial heading above it demands. The
                  cyan-to-transparent gradient keeps it from reading as
                  a flat rule; it reads as a drawn mark. */}
              <div
                aria-hidden
                className="mt-4 h-[2px] w-16"
                style={{
                  background:
                    "linear-gradient(90deg, var(--color-ssp-cyan-500) 0%, color-mix(in srgb, var(--color-ssp-cyan-500) 18%, transparent) 100%)",
                }}
              />
              <p className="mt-4 max-w-[44ch] text-[13.5px] leading-[1.65] text-white/80 sm:text-[14px]">
                {active.subtitle}
              </p>
              <Link
                href={active.href}
                data-cta-id={`home_industries_spotlight_${active.key}`}
                onClick={() =>
                  trackCtaClick({
                    ctaId: `home_industries_spotlight_${active.key}`,
                    location: "home_industries_spotlight",
                    destination: active.href,
                    label: `Explore ${active.label}`,
                  })
                }
                className={cn(
                  "group/spot mt-5 inline-flex items-center gap-2.5 text-[13px] font-semibold tracking-[0.06em] text-white",
                  FOCUS_RING_DARK,
                )}
              >
                {/* Underline sits at 35% opacity in the resting state so
                    the link telegraphs as a link, not just styled text.
                    Hover fills it to 100% and shifts to full cyan — the
                    line becomes a confident closing stroke. */}
                <span className="relative">
                  Explore {active.label}
                  <span
                    aria-hidden
                    className="absolute inset-x-0 -bottom-0.5 h-px bg-[color:var(--color-ssp-cyan-500)] opacity-35 transition-opacity duration-300 ease-[cubic-bezier(0.22,1,0.36,1)] motion-safe:group-hover/spot:opacity-100"
                  />
                </span>
                <span
                  aria-hidden
                  className="inline-block translate-x-0 text-[color:var(--color-ssp-cyan-500)] transition-transform duration-300 ease-[cubic-bezier(0.22,1,0.36,1)] motion-safe:group-hover/spot:translate-x-[3px]"
                >
                  →
                </span>
              </Link>
            </motion.div>
          </AnimatePresence>
        </div>
      </div>
    </div>
  );
}

/* ─────────────────────────────────────────────────────────────────
   Index list (desktop) — the typographic catalog. Each row is a link
   that also sets the active spotlight on hover/focus. A cyan marker
   bar appears on the left edge of the active row; the arrow fades
   in; the label brightens.
   ───────────────────────────────────────────────────────────────── */

function IndustryIndexList({
  activeIndex,
  setActiveIndex,
}: {
  activeIndex: number;
  setActiveIndex: (i: number) => void;
}) {
  return (
    <ul
      className="flex flex-col"
      role="list"
      aria-label="Industries — browse the list to preview each sector"
    >
      {INDUSTRY_SLIDES.map((slide, idx) => {
        const isActive = idx === activeIndex;
        return (
          <li key={slide.key} className="relative">
            <Link
              href={slide.href}
              data-cta-id={`home_industries_row_${slide.key}`}
              onMouseEnter={() => setActiveIndex(idx)}
              onFocus={() => setActiveIndex(idx)}
              onClick={() =>
                trackCtaClick({
                  ctaId: `home_industries_row_${slide.key}`,
                  location: "home_industries_index",
                  destination: slide.href,
                  label: slide.label,
                })
              }
              className={cn(
                "group/row relative flex items-center gap-4 py-4 pr-2 pl-6 sm:gap-5 sm:py-[18px] sm:pl-7",
                "border-b border-white/[0.08] last:border-b-0",
                "transition-colors duration-300 ease-[cubic-bezier(0.22,1,0.36,1)]",
                FOCUS_RING_DARK,
              )}
              aria-current={isActive ? "true" : undefined}
            >
              {/* Active marker — a cyan hairline pinned to the left edge
                  of the row. Present in DOM on every row so the appear/
                  disappear is a pure opacity transition (no layout). */}
              <span
                aria-hidden
                className={cn(
                  "absolute top-1/2 left-0 h-9 w-[2px] -translate-y-1/2 transition-opacity duration-300 ease-[cubic-bezier(0.22,1,0.36,1)]",
                  isActive ? "opacity-100" : "opacity-0",
                )}
                style={{ backgroundColor: "var(--color-ssp-cyan-500)" }}
              />

              <span
                className={cn(
                  "font-mono text-[11px] font-medium tracking-[0.18em] transition-colors duration-300",
                  isActive
                    ? "text-[color:var(--color-ssp-cyan-500)]"
                    : "text-white/40",
                )}
              >
                {formatIndex(idx + 1)}
              </span>

              <span
                className={cn(
                  "flex-1 text-[15.5px] font-semibold tracking-[-0.005em] transition-colors duration-300 sm:text-[16px]",
                  isActive ? "text-white" : "text-white/78 group-hover/row:text-white",
                )}
              >
                {slide.label}
              </span>

              <span
                aria-hidden
                className={cn(
                  "inline-flex h-6 w-6 shrink-0 items-center justify-center text-[14px] leading-none transition-all duration-300 ease-[cubic-bezier(0.22,1,0.36,1)]",
                  isActive
                    ? "translate-x-0 text-[color:var(--color-ssp-cyan-500)] opacity-100"
                    : "translate-x-[-4px] text-white/40 opacity-0",
                )}
              >
                →
              </span>
            </Link>
          </li>
        );
      })}
    </ul>
  );
}

/* ─────────────────────────────────────────────────────────────────
   Mobile list — each industry is its own compact card: thumbnail +
   index + label + one-line tagline + arrow. Same editorial language
   as desktop, but self-contained rows so no state juggling on touch.
   ───────────────────────────────────────────────────────────────── */

function IndustryMobileList() {
  return (
    <ul className="flex flex-col gap-3 lg:hidden" role="list">
      {INDUSTRY_SLIDES.map((slide, idx) => (
        <li key={slide.key}>
          <Link
            href={slide.href}
            data-cta-id={`home_industries_mobile_${slide.key}`}
            onClick={() =>
              trackCtaClick({
                ctaId: `home_industries_mobile_${slide.key}`,
                location: "home_industries_mobile",
                destination: slide.href,
                label: slide.label,
              })
            }
            className={cn(
              "group/mrow relative flex items-stretch gap-4 overflow-hidden site-cta-radius",
              "border border-white/[0.1] bg-white/[0.03] p-3",
              "transition-[border-color,background-color,transform] duration-300 ease-[cubic-bezier(0.22,1,0.36,1)]",
              "hover:border-white/[0.2] hover:bg-white/[0.06] motion-safe:hover:-translate-y-[1px]",
              FOCUS_RING_DARK,
            )}
          >
            <div className="relative h-20 w-20 shrink-0 overflow-hidden rounded-md sm:h-24 sm:w-24">
              <SectionImage
                src={slide.image}
                alt={`${slide.label} preview image`}
                fill
                className="object-cover"
                sizes="96px"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/30 to-transparent" />
            </div>

            <div className="flex min-w-0 flex-1 flex-col justify-center gap-1.5">
              <div className="flex items-baseline gap-2">
                <span className="font-mono text-[10.5px] font-medium tracking-[0.18em] text-[color:var(--color-ssp-cyan-500)]">
                  {formatIndex(idx + 1)}
                </span>
                <span className="truncate text-[15px] font-semibold text-white sm:text-[16px]">
                  {slide.label}
                </span>
              </div>
              <p className="line-clamp-2 text-[12.5px] leading-[1.5] text-white/65 sm:text-[13px]">
                {slide.mobileSubtitle ?? slide.subtitle}
              </p>
            </div>

            <span
              aria-hidden
              className="self-center pr-2 text-white/35 transition-all duration-300 group-hover/mrow:translate-x-[2px] group-hover/mrow:text-[color:var(--color-ssp-cyan-500)]"
            >
              →
            </span>
          </Link>
        </li>
      ))}
    </ul>
  );
}

/* ─────────────────────────────────────────────────────────────────
   Section shell — dark editorial chapter with cyan signature
   hairlines opening and closing, ambient cyan glows, and the
   composed header / spotlight+index / mobile-list layout.
   ───────────────────────────────────────────────────────────────── */

export function IndustriesEditorialSection() {
  const reduceMotion = useReducedMotion() ?? false;
  const [activeIndex, setActiveIndex] = React.useState(0);
  const total = INDUSTRY_SLIDES.length;

  /* ───── Auto-advance state ─────
     The cyan progress bar that rides the hairline above the index is
     driven by a CSS animation; advance-on-completion is wired to
     `onAnimationEnd`. Two gates pause the animation:

       • `isPaused` — the user is hovering or focus is inside the
         atlas. Their attention is in control of the section.
       • `isVisible` — the section is in the viewport. Off-screen, we
         halt the animation so it isn't burning cycles the user can't
         see (and so they arrive at the full cadence the moment they
         scroll the section into view).

     Reduced-motion users skip autoplay entirely: the progress bar
     stays at scaleX(0), the static hairline still shows, and the
     section behaves exactly as it did before autoplay existed. */
  const [isPaused, setIsPaused] = React.useState(false);
  const [isVisible, setIsVisible] = React.useState(false);
  const atlasRef = React.useRef<HTMLDivElement | null>(null);

  React.useEffect(() => {
    const el = atlasRef.current;
    if (!el || typeof IntersectionObserver === "undefined") return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry) setIsVisible(entry.isIntersecting);
      },
      /* 10% threshold — the cycle starts as soon as the atlas has any
         meaningful presence on screen, not only when it's fully in
         view. Feels responsive to scroll arrival. */
      { threshold: 0.1 },
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  const handleAtlasEnter = React.useCallback(() => setIsPaused(true), []);
  const handleAtlasLeave = React.useCallback(() => setIsPaused(false), []);
  /* onFocus/onBlur bubble in React, so attaching to the atlas container
     pauses whenever focus lands on any descendant — and resumes only
     when focus leaves the atlas entirely (checked via relatedTarget). */
  const handleAtlasFocus = React.useCallback(() => setIsPaused(true), []);
  const handleAtlasBlur = React.useCallback(
    (event: React.FocusEvent<HTMLDivElement>) => {
      if (!event.currentTarget.contains(event.relatedTarget as Node | null)) {
        setIsPaused(false);
      }
    },
    [],
  );

  const handleProgressEnd = React.useCallback(() => {
    setActiveIndex((i) => (i + 1) % total);
  }, [total]);

  const autoplayEnabled = !reduceMotion && isVisible;
  const animationPlayState: React.CSSProperties["animationPlayState"] =
    !autoplayEnabled || isPaused ? "paused" : "running";

  const stagger: Variants = reduceMotion
    ? { hidden: { opacity: 1 }, show: { opacity: 1 } }
    : { hidden: {}, show: { transition: { staggerChildren: 0.07, delayChildren: 0.05 } } };

  const revealUp: Variants = reduceMotion
    ? { hidden: { opacity: 1, y: 0 }, show: { opacity: 1, y: 0 } }
    : { hidden: { opacity: 1, y: 14 }, show: { opacity: 1, y: 0 } };

  return (
    <section
      id={INDUSTRIES_SECTION.id}
      aria-labelledby="home-industries-heading"
      className="relative overflow-hidden scroll-mt-16 py-20 sm:py-24 lg:py-28"
      style={{ backgroundColor: "var(--color-company-ink)" }}
    >
      {/* ─── Opening signature: cyan hairline + soft cyan haze — the
          site-wide chapter-turn grammar. ─── */}
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
            "linear-gradient(180deg, color-mix(in srgb, var(--color-ssp-cyan-500) 7%, transparent) 0%, transparent 100%)",
        }}
        aria-hidden
      />

      {/* ─── Atmospheric ambient glows — subtle cyan breaths top-right
          and bottom-left, giving the dark panel depth without pattern.
          ─── */}
      <div
        className="pointer-events-none absolute -top-32 right-[-12%] h-[32rem] w-[34rem] rounded-full opacity-60 blur-[140px]"
        style={{
          background:
            "radial-gradient(circle, color-mix(in srgb, var(--color-ssp-cyan-500) 16%, transparent) 0%, transparent 70%)",
        }}
        aria-hidden
      />
      <div
        className="pointer-events-none absolute -bottom-32 left-[-14%] h-[34rem] w-[36rem] rounded-full opacity-40 blur-[140px]"
        style={{
          background:
            "radial-gradient(circle, color-mix(in srgb, var(--color-ssp-cyan-500) 12%, transparent) 0%, transparent 70%)",
        }}
        aria-hidden
      />

      <Container className="site-page-container relative z-[1]">
        {/* Header — mirrors the editorial header on "What we move":
            eyebrow + headline + support copy on the left, directory
            link on the right. */}
        <motion.div
          className="flex flex-col gap-6 sm:flex-row sm:items-end sm:justify-between sm:gap-10"
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, amount: 0.2 }}
          variants={revealUp}
          transition={{ duration: reduceMotion ? 0 : 0.38, ease: "easeOut" }}
        >
          <div className="max-w-[34rem]">
            <SectionSignalEyebrow label={SECTION_EYEBROW} light />
            <h2
              id="home-industries-heading"
              className="mt-4 text-[2rem] font-semibold leading-[1.06] tracking-[-0.028em] text-white sm:text-[2.4rem] lg:text-[2.75rem] lg:leading-[1.04]"
            >
              {SECTION_TITLE}
            </h2>
            <p className="mt-4 max-w-[34rem] text-[14.5px] leading-[1.72] text-white/70 sm:text-[15px]">
              {SECTION_SUPPORT}
            </p>
          </div>

          <Link
            href="/industries"
            data-cta-id="home_industries_see_all"
            onClick={() =>
              trackCtaClick({
                ctaId: "home_industries_see_all",
                location: "home_industries",
                destination: "/industries",
                label: "See all industries",
              })
            }
            className={cn(
              "group/all relative inline-flex w-fit shrink-0 items-center gap-2 self-start pb-0.5 text-[13px] font-semibold tracking-[0.05em] sm:self-end",
              "text-white/92 transition-colors duration-200 hover:text-white",
              "after:pointer-events-none after:absolute after:right-0 after:-bottom-0.5 after:left-0 after:h-[1.5px] after:origin-left after:scale-x-0 after:bg-[color:var(--color-ssp-cyan-500)] after:transition-transform after:duration-300 after:ease-[cubic-bezier(0.22,1,0.36,1)]",
              "hover:after:scale-x-100",
              FOCUS_RING_DARK,
            )}
          >
            See all industries
            <span
              aria-hidden
              className="inline-block translate-x-0 transition-transform duration-300 ease-[cubic-bezier(0.22,1,0.36,1)] motion-safe:group-hover/all:translate-x-[2px]"
            >
              &rarr;
            </span>
          </Link>
        </motion.div>

        {/* Desktop atlas — spotlight + index.
            Aligned at the top so if the index extends a row or two
            beyond the spotlight, the composition still reads intentional
            (editorial spreads rarely have perfect column parity — that's
            the point).

            Hover/focus anywhere inside this container pauses the
            auto-advance; leaving resumes it. This is the "user is in
            control" guarantee the section depends on. */}
        <motion.div
          ref={atlasRef}
          className="mt-12 hidden items-start gap-10 lg:mt-14 lg:grid lg:grid-cols-[minmax(0,1fr)_21rem] lg:gap-12 xl:grid-cols-[minmax(0,1fr)_23rem]"
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, amount: 0.15 }}
          variants={stagger}
          onMouseEnter={handleAtlasEnter}
          onMouseLeave={handleAtlasLeave}
          onFocus={handleAtlasFocus}
          onBlur={handleAtlasBlur}
        >
          <motion.div variants={revealUp} transition={{ duration: reduceMotion ? 0 : 0.38, ease: [0.22, 1, 0.36, 1] }}>
            <IndustrySpotlight activeIndex={activeIndex} reduceMotion={reduceMotion} />
          </motion.div>

          <motion.div
            variants={revealUp}
            transition={{ duration: reduceMotion ? 0 : 0.38, ease: [0.22, 1, 0.36, 1] }}
            className="relative"
          >
            {/* The static hairline — the track. Always visible, whether
                autoplay is running or not. Mirrors the spotlight's
                frame rule and anchors the list visually. */}
            <div
              aria-hidden
              className="absolute inset-x-0 top-0 h-px bg-white/[0.08]"
            />
            {/* The cyan progress bar — the indicator. Rides on top of
                the track, fills from 0 → 100% over AUTO_ADVANCE_MS, then
                fires onAnimationEnd to increment activeIndex.

                `key={activeIndex}` forces React to remount the element
                each time the active industry changes — either by
                auto-advance or by the user hovering a different row —
                which cleanly restarts the CSS animation from 0.

                The trailing fade on the right edge of the gradient is
                what makes the bar read as *flowing* rather than
                marching: the tip gets a soft cyan wash instead of a
                hard vertical terminus. */}
            <div
              key={activeIndex}
              aria-hidden
              className="pointer-events-none absolute top-0 left-0 h-px w-full origin-left will-change-transform"
              style={{
                transform: reduceMotion ? "scaleX(0)" : undefined,
                background:
                  "linear-gradient(90deg, var(--color-ssp-cyan-500) 0%, var(--color-ssp-cyan-500) 80%, color-mix(in srgb, var(--color-ssp-cyan-500) 40%, transparent) 100%)",
                animation: reduceMotion
                  ? undefined
                  : `industries-progress ${AUTO_ADVANCE_MS}ms linear forwards`,
                animationPlayState,
              }}
              onAnimationEnd={handleProgressEnd}
            />
            <IndustryIndexList activeIndex={activeIndex} setActiveIndex={setActiveIndex} />
          </motion.div>
        </motion.div>

        {/* Mobile / tablet atlas — self-contained compact rows */}
        <motion.div
          className="mt-12 lg:hidden"
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, amount: 0.12 }}
          variants={stagger}
        >
          <motion.div variants={revealUp} transition={{ duration: reduceMotion ? 0 : 0.38, ease: [0.22, 1, 0.36, 1] }}>
            <IndustryMobileList />
          </motion.div>
        </motion.div>
      </Container>

      {/* ─── Closing signature: mirrors the opening, marks the handoff
          into the next section. ─── */}
      <div
        className="pointer-events-none absolute inset-x-0 bottom-0 z-[2] h-12"
        style={{
          background:
            "linear-gradient(0deg, color-mix(in srgb, var(--color-ssp-cyan-500) 7%, transparent) 0%, transparent 100%)",
        }}
        aria-hidden
      />
      <div
        className="pointer-events-none absolute inset-x-0 bottom-0 z-[3] h-px"
        style={{
          background:
            "linear-gradient(90deg, transparent 3%, color-mix(in srgb, var(--color-ssp-cyan-500) 55%, transparent) 50%, transparent 97%)",
        }}
        aria-hidden
      />
    </section>
  );
}
