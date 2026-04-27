"use client";

import * as React from "react";
import { AnimatePresence, motion, useMotionValue, useReducedMotion, useTransform } from "framer-motion";
import { Container } from "@/app/(site)/components/layout/Container";
import { SectionSignalEyebrow } from "@/app/(site)/components/ui/SectionSignalEyebrow";
import { LogoImage } from "@/components/media/LogoImage";
import { TRUST_PARTNER_LOGOS } from "@/config/partners";
import { TRUST_PROOF_ITEMS, TRUST_PROOF_SECTION, type TestimonialItem } from "@/config/testimonials";
import { cn } from "@/lib/cn";

const SECTION_EYEBROW = "Proof in Practice";
const SECTION_TITLE = "Trust built in live operation";
const SECTION_DESCRIPTION =
  "Trust is established shipment by shipment. Start with client voices, watch the work in motion, and review the operating controls that make accountability real—not aspirational.";
const FOCUS_RING_CYAN_ON_SURFACE =
  "focus:outline-none focus-visible:ring-2 focus-visible:ring-[color:var(--color-ssp-cyan-500)] focus-visible:ring-offset-2 focus-visible:ring-offset-[color:var(--color-surface-0)]";

/** One full loop = width of a single duplicated half of the logo strip (see `MarqueeLogos`). */
const MARQUEE_LOOP_DURATION_MS = 42_000;

function normalizeMarqueeOffset(v: number, loopWidth: number): number {
  if (loopWidth <= 0) return v;
  let t = v;
  while (t <= -loopWidth) t += loopWidth;
  while (t > 0) t -= loopWidth;
  return t;
}

function getYouTubeId(url: string) {
  try {
    const u = new URL(url);
    const v = u.searchParams.get("v");
    if (v) return v;
    if (u.hostname.includes("youtu.be")) return u.pathname.replace("/", "");
    const parts = u.pathname.split("/").filter(Boolean);
    const shortsIdx = parts.indexOf("shorts");
    if (shortsIdx !== -1 && parts[shortsIdx + 1]) return parts[shortsIdx + 1];
    const embedIdx = parts.indexOf("embed");
    if (embedIdx !== -1 && parts[embedIdx + 1]) return parts[embedIdx + 1];
  } catch {
    // noop
  }
  return "";
}

function Stars({ rating }: { rating: number }) {
  return (
    <div className="flex items-center gap-1" aria-label={`${rating} out of 5 stars`}>
      {Array.from({ length: 5 }, (_, i) => (
        <span
          key={i}
          className={cn(
            "text-[13px] leading-none",
            i < rating ? "text-[color:var(--color-ssp-cyan-500)]" : "text-[color:var(--color-border-light)]",
          )}
          aria-hidden="true"
        >
          ★
        </span>
      ))}
    </div>
  );
}

function TestimonialCard({ item }: { item: Extract<TestimonialItem, { type: "testimonial" }> }) {
  return (
    <article
      className={cn(
        "relative h-full overflow-hidden rounded-2xl border border-[color:var(--color-border-light)] bg-white",
        "shadow-[0_14px_30px_rgba(2,6,23,0.07)]",
      )}
    >
      <div className="flex min-h-[190px] h-full flex-col p-4 sm:p-5">
        <div className="flex items-center justify-between gap-3">
          <span className="text-[11px] font-semibold uppercase tracking-[0.14em] text-[color:var(--color-menu-subtle)]">
            Client testimony
          </span>
          <Stars rating={item.rating} />
        </div>
        <blockquote className="mt-4 line-clamp-4 text-[13px] leading-relaxed text-[color:var(--color-muted-light)] sm:text-[14px]">
          <span className="mr-1 text-[color:var(--color-ssp-cyan-500)]">“</span>
          {item.quote}
          <span className="ml-1 text-[color:var(--color-ssp-cyan-500)]">”</span>
        </blockquote>
        <div className="mt-auto pt-4">
          <p className="text-[14px] font-semibold text-[color:var(--color-text-light)]">{item.name}</p>
          {item.meta ? (
            <p className="mt-1 text-[12px] tracking-[0.08em] uppercase text-[color:var(--color-menu-subtle)]">
              {item.meta}
            </p>
          ) : null}
        </div>
      </div>
    </article>
  );
}

function VideoCard({
  item,
  isActive,
}: {
  item: Extract<TestimonialItem, { type: "video" }>;
  isActive: boolean;
}) {
  const ytId = React.useMemo(() => getYouTubeId(item.youtubeUrl), [item.youtubeUrl]);

  /* Mounting a YouTube `<iframe>` synchronously the moment a slide
   * becomes active is the single most expensive thing this carousel
   * does — on mobile WebKit it can stall the swipe animation by 100ms+.
   * We defer the iframe by one idle frame so the slide-in transition
   * plays cleanly first, then the embed appears underneath it. The
   * thumbnail stays as a placeholder during that brief window so there
   * is never a blank frame. */
  const [iframeReady, setIframeReady] = React.useState(false);
  React.useEffect(() => {
    if (!isActive) {
      setIframeReady(false);
      return;
    }
    const win = typeof window !== "undefined" ? window : undefined;
    if (!win) return;
    const idle = (
      win as Window & { requestIdleCallback?: (cb: () => void, opts?: { timeout: number }) => number }
    ).requestIdleCallback;
    if (typeof idle === "function") {
      const id = idle(() => setIframeReady(true), { timeout: 600 });
      return () => {
        const cancel = (
          win as Window & { cancelIdleCallback?: (id: number) => void }
        ).cancelIdleCallback;
        if (typeof cancel === "function") cancel(id);
      };
    }
    const t = win.setTimeout(() => setIframeReady(true), 220);
    return () => win.clearTimeout(t);
  }, [isActive]);

  const embedSrc = React.useMemo(() => {
    if (!ytId || !isActive || !iframeReady) return "";
    const params = new URLSearchParams({
      autoplay: "0",
      mute: "1",
      loop: "0",
      controls: "1",
      modestbranding: "1",
      rel: "0",
      playsinline: "1",
    });
    return `https://www.youtube.com/embed/${ytId}?${params.toString()}`;
  }, [iframeReady, isActive, ytId]);
  const thumbnailSrc = ytId ? `https://i.ytimg.com/vi/${ytId}/hqdefault.jpg` : "";

  const showCaptionOverlay = !isActive;

  return (
    <article
      className={cn(
        "relative overflow-hidden rounded-2xl border border-[color:var(--color-border-light)] bg-[color:var(--color-company-ink)]",
        "shadow-[0_18px_36px_rgba(2,8,24,0.2)]",
      )}
    >
      <div className="relative aspect-video w-full">
        {isActive && embedSrc ? (
          <iframe
            className="absolute inset-0 h-full w-full"
            src={embedSrc}
            title={item.title}
            loading="lazy"
            referrerPolicy="strict-origin-when-cross-origin"
            allow="autoplay; encrypted-media; picture-in-picture"
            allowFullScreen
          />
        ) : thumbnailSrc ? (
          <>
            <img
              src={thumbnailSrc}
              alt={item.title}
              className="absolute inset-0 h-full w-full object-cover"
              loading="lazy"
            />
            <div className="absolute inset-0 bg-black/26" />
            <div className="pointer-events-none absolute inset-0 grid place-items-center">
              <span className="inline-flex h-14 w-14 items-center justify-center rounded-full border border-white/40 bg-black/45 text-white">
                ▶
              </span>
            </div>
          </>
        ) : (
          <div className="absolute inset-0 grid place-items-center text-white/75">Video unavailable</div>
        )}

        {showCaptionOverlay ? (
          <div className="absolute inset-x-0 bottom-0 border-t border-white/16 bg-black/58 px-5 py-4 backdrop-blur-sm">
            <div className="flex items-center gap-2">
              <LogoImage
                src="/_optimized/brand/SSPlogo.png"
                alt="We logo"
                width={20}
                height={20}
                className="h-5 w-5 object-contain"
              />
              <p className="text-[11px] font-semibold uppercase tracking-[0.14em] text-white/72">
                Live operation preview
              </p>
            </div>
            <h3 className="mt-2 text-[20px] font-semibold leading-[1.08] text-white sm:text-[22px]">
              {item.title}
            </h3>
            {item.description ? <p className="mt-2 line-clamp-2 text-[13px] leading-[1.5] text-white/82">{item.description}</p> : null}
          </div>
        ) : null}
      </div>
    </article>
  );
}

function TrustSlide({ item, isActive }: { item: TestimonialItem; isActive: boolean }) {
  return item.type === "video" ? (
    <VideoCard item={item} isActive={isActive} />
  ) : (
    <TestimonialCard item={item} />
  );
}

export function TrustProofSection() {
  const reduceMotion = useReducedMotion() ?? false;
  const [isMarqueePaused, setIsMarqueePaused] = React.useState(false);
  const pointerStartRef = React.useRef<{ x: number; y: number; pointerType: string } | null>(null);

  const orderedItems = React.useMemo(
    () =>
      [...TRUST_PROOF_ITEMS].sort((a, b) => {
        if (a.type === b.type) return 0;
        return a.type === "video" ? -1 : 1;
      }),
    [],
  );

  const [index, setIndex] = React.useState(0);
  const [direction, setDirection] = React.useState<1 | -1>(1);
  const total = orderedItems.length;
  const hasMultiple = total > 1;
  const shellId = `${TRUST_PROOF_SECTION.id}-carousel`;

  const getLoopedIndex = React.useCallback(
    (value: number) => {
      if (total === 0) return 0;
      return (value + total) % total;
    },
    [total],
  );

  const goPrev = React.useCallback(() => {
    if (total <= 1) return;
    setDirection(-1);
    setIndex((prev) => getLoopedIndex(prev - 1));
  }, [getLoopedIndex, total]);

  const goNext = React.useCallback(() => {
    if (total <= 1) return;
    setDirection(1);
    setIndex((prev) => getLoopedIndex(prev + 1));
  }, [getLoopedIndex, total]);

  const setDirectIndex = React.useCallback(
    (next: number) => {
      if (total <= 1) return;
      const normalized = getLoopedIndex(next);
      if (normalized === index) return;
      const forward = (normalized - index + total) % total;
      const backward = (index - normalized + total) % total;
      setDirection(forward <= backward ? 1 : -1);
      setIndex(normalized);
    },
    [getLoopedIndex, index, total],
  );

  const activeItem = orderedItems[index];
  const leftIndex = React.useMemo(() => getLoopedIndex(index - 1), [getLoopedIndex, index]);
  const rightIndex = React.useMemo(() => getLoopedIndex(index + 1), [getLoopedIndex, index]);

  const activeAnnouncement = React.useMemo(() => {
    const label =
      activeItem?.type === "video"
        ? "Featured video"
        : activeItem
          ? `Testimonial from ${activeItem.name ?? "customer"}`
          : "Slide";
    return `${label}, slide ${index + 1} of ${total}`;
  }, [activeItem, index, total]);

  const onPointerDown = React.useCallback(
    (e: React.PointerEvent<HTMLDivElement>) => {
      if (!hasMultiple) return;
      if (e.pointerType === "mouse" && e.button !== 0) return;
      const target = e.target as HTMLElement;
      if (target.closest("button,a,input,textarea,select,label,iframe")) return;
      pointerStartRef.current = {
        x: e.clientX,
        y: e.clientY,
        pointerType: e.pointerType,
      };
    },
    [hasMultiple],
  );

  const onPointerUp = React.useCallback(
    (e: React.PointerEvent<HTMLDivElement>) => {
      if (!hasMultiple) return;
      const start = pointerStartRef.current;
      pointerStartRef.current = null;
      if (!start) return;
      const dx = e.clientX - start.x;
      const dy = e.clientY - start.y;
      const minSwipe = start.pointerType === "mouse" ? 56 : 44;
      if (Math.abs(dx) < minSwipe || Math.abs(dx) <= Math.abs(dy)) return;
      window.getSelection()?.removeAllRanges();
      if (dx > 0) goPrev();
      else goNext();
    },
    [goNext, goPrev, hasMultiple],
  );

  const onPointerCancel = React.useCallback(() => {
    pointerStartRef.current = null;
  }, []);

  const onKeyDown = React.useCallback(
    (e: React.KeyboardEvent<HTMLDivElement>) => {
      if (!hasMultiple) return;
      if (e.currentTarget !== e.target) return;
      switch (e.key) {
        case "ArrowLeft":
          e.preventDefault();
          goPrev();
          break;
        case "ArrowRight":
          e.preventDefault();
          goNext();
          break;
        case "Home":
          e.preventDefault();
          setDirectIndex(0);
          break;
        case "End":
          e.preventDefault();
          setDirectIndex(total - 1);
          break;
        default:
          break;
      }
    },
    [goNext, goPrev, hasMultiple, setDirectIndex, total],
  );

  return (
    <section
      id={TRUST_PROOF_SECTION.id}
      aria-labelledby={`${TRUST_PROOF_SECTION.id}-heading`}
      className="cv-auto-section relative overflow-hidden bg-[color:var(--color-home-post-hero-platform)]"
    >
      <Container className="site-page-container py-20 sm:py-24 lg:py-28">
        <motion.div
          initial={reduceMotion ? false : { opacity: 1, y: 10 }}
          whileInView={reduceMotion ? undefined : { opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "0px 0px 80px 0px" }}
          transition={{ duration: reduceMotion ? 0 : 0.3, ease: "easeOut" }}
          className="max-w-[44rem]"
        >
          <SectionSignalEyebrow label={SECTION_EYEBROW} />
          <h2
            id={`${TRUST_PROOF_SECTION.id}-heading`}
            className="mt-4 text-[2.05rem] font-semibold leading-[1.08] tracking-[-0.028em] text-[color:var(--color-text-light)] sm:text-[2.45rem] lg:text-[2.8rem]"
          >
            {SECTION_TITLE}
          </h2>
          <p className="mt-4 text-[15px] leading-[1.72] text-[color:var(--color-muted-light)] sm:text-[15.5px]">
            {SECTION_DESCRIPTION}
          </p>
        </motion.div>

        <motion.div
          className="mt-10 select-none"
          initial={reduceMotion ? false : { opacity: 1, y: 10 }}
          whileInView={reduceMotion ? undefined : { opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "0px 0px 80px 0px" }}
          transition={{ duration: reduceMotion ? 0 : 0.3, ease: [0.22, 1, 0.36, 1] }}
        >
          <p className="sr-only" aria-live="polite" aria-atomic="true">
            {activeAnnouncement}
          </p>
          <div
            className="focus-ring-surface outline-none"
            role="region"
            aria-roledescription="carousel"
            aria-label="Trust and proof carousel"
            aria-describedby={`${shellId}-status`}
            tabIndex={0}
            onKeyDown={onKeyDown}
            onPointerDown={onPointerDown}
            onPointerUp={onPointerUp}
            onPointerCancel={onPointerCancel}
            onDragStart={(e) => e.preventDefault()}
          >
            <p id={`${shellId}-status`} className="sr-only">
              {activeAnnouncement}
            </p>

            <div className="flex items-center justify-between gap-4">
              <p className="font-mono text-[11px] tracking-[0.12em] text-[color:var(--color-menu-subtle)]">
                {String(index + 1).padStart(2, "0")} / {String(total).padStart(2, "0")}
              </p>
              <div className="flex items-center gap-2.5">
                <div
                  className="rounded-full p-[2px] shadow-[0_7px_18px_rgba(11,62,94,0.14)] transition-all duration-200 motion-safe:hover:-translate-y-0.5 motion-safe:hover:shadow-[0_11px_26px_rgba(11,62,94,0.2)]"
                  style={{ background: "var(--gradient-ssp-elevated)" }}
                >
                  <button
                    type="button"
                    onClick={goPrev}
                    disabled={!hasMultiple}
                    className={cn(
                      FOCUS_RING_CYAN_ON_SURFACE,
                      "inline-flex h-10 w-10 items-center justify-center rounded-full border-0 bg-white text-[15px] leading-none text-[color:var(--color-text-light)]",
                      "shadow-[inset_0_1px_0_rgba(255,255,255,1)] transition-colors duration-200 hover:text-[color:var(--color-ssp-cyan-600)]",
                      "disabled:cursor-not-allowed disabled:opacity-45 disabled:hover:text-[color:var(--color-text-light)]",
                    )}
                    aria-label="Previous slide"
                  >
                    ←
                  </button>
                </div>
                <div
                  className="rounded-full p-[2px] shadow-[0_7px_18px_rgba(11,62,94,0.14)] transition-all duration-200 motion-safe:hover:-translate-y-0.5 motion-safe:hover:shadow-[0_11px_26px_rgba(11,62,94,0.2)]"
                  style={{ background: "var(--gradient-ssp-elevated)" }}
                >
                  <button
                    type="button"
                    onClick={goNext}
                    disabled={!hasMultiple}
                    className={cn(
                      FOCUS_RING_CYAN_ON_SURFACE,
                      "inline-flex h-10 w-10 items-center justify-center rounded-full border-0 bg-white text-[15px] leading-none text-[color:var(--color-text-light)]",
                      "shadow-[inset_0_1px_0_rgba(255,255,255,1)] transition-colors duration-200 hover:text-[color:var(--color-ssp-cyan-600)]",
                      "disabled:cursor-not-allowed disabled:opacity-45 disabled:hover:text-[color:var(--color-text-light)]",
                    )}
                    aria-label="Next slide"
                  >
                    →
                  </button>
                </div>
              </div>
            </div>

            {/*
              Carousel slot containers are `position: relative` so that
              `mode="popLayout"` can absolutely-position the exiting slide
              into its correct slot rect — without it, exiting nodes would
              float against the next positioned ancestor and visibly drift.

              We use `popLayout` (not `wait`) so a swipe never has to wait
              for the outgoing slide's exit animation to finish before the
              incoming slide starts entering — both animate simultaneously.
              On 0.20s easings, total perceived swipe time drops from
              ~520ms to ~200ms, which is the threshold below which a
              touch interaction reads as "native" instead of "animated".
            */}
            <div className="mt-6 hidden items-center justify-center gap-5 md:flex">
              {orderedItems[leftIndex] ? (
                <div className="relative w-[250px] shrink-0">
                  <AnimatePresence mode="popLayout" initial={false}>
                    <motion.div
                      key={`left-${orderedItems[leftIndex].id}`}
                      className="w-[250px] shrink-0"
                      initial={reduceMotion ? { opacity: 0.62, x: 0, scale: 0.93 } : { opacity: 0.62, x: -16, scale: 0.9 }}
                      animate={reduceMotion ? { opacity: 0.62 } : { opacity: 0.62, x: 0, scale: 0.93 }}
                      exit={reduceMotion ? { opacity: 0 } : { opacity: 0, x: 14, scale: 0.9 }}
                      transition={{ duration: 0.2, ease: "easeOut" }}
                    >
                      <TrustSlide item={orderedItems[leftIndex]} isActive={false} />
                    </motion.div>
                  </AnimatePresence>
                </div>
              ) : null}

              <div className="relative w-[460px] shrink-0 md:-mx-2">
                <AnimatePresence mode="popLayout" initial={false} custom={direction}>
                  <motion.div
                    key={activeItem?.id ?? "active-empty"}
                    custom={direction}
                    className="w-[460px] shrink-0"
                    initial={reduceMotion ? { x: 0 } : { x: direction > 0 ? 22 : -22, opacity: 0 }}
                    animate={{ x: 0, opacity: 1 }}
                    exit={reduceMotion ? { x: 0 } : { x: direction > 0 ? -22 : 22, opacity: 0 }}
                    transition={{ duration: 0.2, ease: [0.22, 1, 0.36, 1] }}
                  >
                    {activeItem ? <TrustSlide item={activeItem} isActive /> : null}
                  </motion.div>
                </AnimatePresence>
              </div>

              {orderedItems[rightIndex] ? (
                <div className="relative w-[250px] shrink-0">
                  <AnimatePresence mode="popLayout" initial={false}>
                    <motion.div
                      key={`right-${orderedItems[rightIndex].id}`}
                      className="w-[250px] shrink-0"
                      initial={reduceMotion ? { opacity: 0.62, x: 0, scale: 0.93 } : { opacity: 0.62, x: 16, scale: 0.9 }}
                      animate={reduceMotion ? { opacity: 0.62 } : { opacity: 0.62, x: 0, scale: 0.93 }}
                      exit={reduceMotion ? { opacity: 0 } : { opacity: 0, x: -14, scale: 0.9 }}
                      transition={{ duration: 0.2, ease: "easeOut" }}
                    >
                      <TrustSlide item={orderedItems[rightIndex]} isActive={false} />
                    </motion.div>
                  </AnimatePresence>
                </div>
              ) : null}
            </div>

            <div className="relative mx-auto mt-6 w-full max-w-[460px] md:hidden">
              <AnimatePresence mode="popLayout" initial={false} custom={direction}>
                <motion.div
                  key={`mobile-${activeItem?.id ?? "active-empty"}`}
                  custom={direction}
                  initial={reduceMotion ? { x: 0 } : { x: direction > 0 ? 18 : -18, opacity: 0 }}
                  animate={{ x: 0, opacity: 1 }}
                  exit={reduceMotion ? { x: 0 } : { x: direction > 0 ? -18 : 18, opacity: 0 }}
                  transition={{ duration: 0.2, ease: [0.22, 1, 0.36, 1] }}
                >
                  {activeItem ? <TrustSlide item={activeItem} isActive /> : null}
                </motion.div>
              </AnimatePresence>
            </div>

            <div className="mt-5 flex items-center justify-center gap-2.5">
              {orderedItems.map((item, i) => (
                <button
                  key={item.id}
                  type="button"
                  onClick={() => setDirectIndex(i)}
                  disabled={!hasMultiple}
                  className={cn(
                    FOCUS_RING_CYAN_ON_SURFACE,
                    "h-2.5 rounded-full transition-all duration-200",
                    i === index
                      ? "w-7 bg-[color:var(--color-ssp-cyan-500)]"
                      : "w-2.5 bg-[color:var(--color-border-light)] hover:bg-[color:var(--color-muted-light)]/45",
                    "disabled:cursor-not-allowed disabled:opacity-45 disabled:hover:bg-[color:var(--color-border-light)]",
                  )}
                  aria-label={`Go to slide ${i + 1}`}
                />
              ))}
            </div>
          </div>
        </motion.div>
      </Container>

      <PartnersBand paused={isMarqueePaused} onTogglePause={() => setIsMarqueePaused((prev) => !prev)} />
    </section>
  );
}

function PartnersBand({
  paused,
  onTogglePause,
}: {
  paused: boolean;
  onTogglePause: () => void;
}) {
  return (
    <div className="w-full bg-[color:var(--color-company-ink)] py-12 sm:py-14">
      <Container className="site-page-container">
        <div className="mb-7 flex flex-wrap items-end justify-between gap-4">
          <div>
            <SectionSignalEyebrow label="Certifications & Partners" light />
            <p className="mt-3 max-w-2xl text-[14px] leading-[1.65] text-white/72 sm:text-[14.5px]">
              Certifications and partner standards that reinforce compliant, secure freight execution.
            </p>
          </div>

          <button
            type="button"
            onClick={onTogglePause}
            className={cn(
              "focus-ring-dark inline-flex h-7 items-center rounded-full border border-white/22 bg-white/5 px-2.5 text-[10px] font-semibold tracking-[0.03em] text-white/78",
              "transition-colors hover:border-white/40 hover:bg-white/10 hover:text-white",
            )}
            aria-pressed={paused}
            aria-label={paused ? "Resume partner logo motion" : "Pause partner logo motion"}
          >
            {paused ? "Play motion" : "Pause motion"}
          </button>
        </div>
      </Container>

      <Container className="site-page-container">
        <MarqueeLogos paused={paused} />
      </Container>
    </div>
  );
}

function MarqueeLogos({ paused }: { paused: boolean }) {
  const reduceMotion = useReducedMotion() ?? false;
  const items = [...TRUST_PARTNER_LOGOS, ...TRUST_PARTNER_LOGOS];

  const trackRef = React.useRef<HTMLDivElement>(null);
  const autoX = useMotionValue(0);
  const pullX = useMotionValue(0);
  const [loopW, setLoopW] = React.useState(0);
  const loopWRef = React.useRef(0);
  React.useEffect(() => {
    loopWRef.current = loopW;
  }, [loopW]);

  const pausedRef = React.useRef(paused);
  pausedRef.current = paused;

  const reduceMotionRef = React.useRef(reduceMotion);
  reduceMotionRef.current = reduceMotion;

  const x = useTransform([autoX, pullX], ([a, b]) => {
    const L = loopWRef.current;
    if (!L || L <= 0) return 0;
    return normalizeMarqueeOffset(Number(a) + Number(b), L);
  });

  type DragSession = {
    pointerId: number;
    startClientX: number;
    startClientY: number;
    locked: boolean;
    lockClientX: number;
  };
  const dragRef = React.useRef<DragSession | null>(null);

  const releasePointerSafe = (target: HTMLElement, pointerId: number) => {
    try {
      if (target.hasPointerCapture(pointerId)) target.releasePointerCapture(pointerId);
    } catch {
      /* noop */
    }
  };

  const endPointerSession = (target: HTMLElement, pointerId: number) => {
    const session = dragRef.current;
    if (!session || session.pointerId !== pointerId) return;
    const wasLocked = session.locked;
    const L = loopWRef.current;
    dragRef.current = null;
    releasePointerSafe(target, pointerId);
    if (wasLocked && L > 0) {
      autoX.set(normalizeMarqueeOffset(autoX.get() + pullX.get(), L));
      pullX.set(0);
    } else {
      pullX.set(0);
    }
  };

  React.useLayoutEffect(() => {
    const el = trackRef.current;
    if (!el) return;
    const measure = () => {
      const half = el.scrollWidth / 2;
      setLoopW(half);
    };
    measure();
    const ro = new ResizeObserver(measure);
    ro.observe(el);
    return () => ro.disconnect();
  }, []);

  React.useLayoutEffect(() => {
    if (loopW <= 0) return;
    autoX.set(normalizeMarqueeOffset(autoX.get() + pullX.get(), loopW));
    pullX.set(0);
  }, [loopW, autoX, pullX]);

  /** Fold manual pull into autoplay offset whenever loop length or pause state changes (not on every frame). */
  React.useEffect(() => {
    if (loopW <= 0) return;
    autoX.set(normalizeMarqueeOffset(autoX.get() + pullX.get(), loopW));
    pullX.set(0);
  }, [paused, loopW, autoX, pullX]);

  React.useEffect(() => {
    let raf = 0;
    let last = performance.now();
    const tick = (now: number) => {
      const dt = Math.min(48, now - last);
      last = now;
      const L = loopWRef.current;
      if (L > 0 && !reduceMotionRef.current && !pausedRef.current) {
        const speed = L / MARQUEE_LOOP_DURATION_MS;
        autoX.set(normalizeMarqueeOffset(autoX.get() - speed * dt, L));
      }
      raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, [autoX]);

  const onPointerDown = (e: React.PointerEvent<HTMLDivElement>) => {
    if (e.button !== 0) return;
    pullX.set(0);
    dragRef.current = {
      pointerId: e.pointerId,
      startClientX: e.clientX,
      startClientY: e.clientY,
      locked: false,
      lockClientX: e.clientX,
    };
    // Defer setPointerCapture until horizontal intent is clear so vertical page scroll still works from the strip.
  };

  const onPointerMove = (e: React.PointerEvent<HTMLDivElement>) => {
    const session = dragRef.current;
    if (!session || session.pointerId !== e.pointerId) return;

    const dx = e.clientX - session.startClientX;
    const dy = e.clientY - session.startClientY;
    const adx = Math.abs(dx);
    const ady = Math.abs(dy);

    if (!session.locked) {
      if (Math.hypot(dx, dy) < 5) return;

      // Clear vertical scroll intent before capture so the page can scroll.
      if (ady >= adx * 1.18 && ady >= 10) {
        dragRef.current = null;
        pullX.set(0);
        return;
      }

      if (adx >= ady * 1.06 || adx >= 6) {
        session.locked = true;
        session.lockClientX = e.clientX;
        pullX.set(0);
        try {
          e.currentTarget.setPointerCapture(e.pointerId);
        } catch {
          /* noop */
        }
      } else {
        return;
      }
    }

    pullX.set(e.clientX - session.lockClientX);
  };

  const onPointerUp = (e: React.PointerEvent<HTMLDivElement>) => {
    const session = dragRef.current;
    if (!session || session.pointerId !== e.pointerId) return;
    endPointerSession(e.currentTarget, e.pointerId);
  };

  const onPointerCancel = (e: React.PointerEvent<HTMLDivElement>) => {
    const session = dragRef.current;
    if (!session || session.pointerId !== e.pointerId) return;
    endPointerSession(e.currentTarget, e.pointerId);
  };

  return (
    <div className="relative overflow-hidden border-y border-white/12 py-5">
      <p className="sr-only">
        Partner and certification logos. The strip scrolls automatically; swipe horizontally on the logos
        to nudge it while it keeps moving. Use the pause control above to stop motion entirely.
      </p>
      <motion.div
        ref={trackRef}
        role="list"
        aria-label="Partner and certification logos"
        style={{ x }}
        className={cn(
          "home-trust-marquee-track flex cursor-grab touch-pan-y items-center gap-10 px-6 select-none active:cursor-grabbing sm:gap-12 sm:px-8",
          "[&_img]:pointer-events-none",
        )}
        onPointerDown={onPointerDown}
        onPointerMove={onPointerMove}
        onPointerUp={onPointerUp}
        onPointerCancel={onPointerCancel}
        onLostPointerCapture={(e) => {
          if (dragRef.current?.pointerId === e.pointerId) {
            endPointerSession(e.currentTarget, e.pointerId);
          }
        }}
      >
        {items.map((logo, idx) => (
          <div
            key={`${logo.src}-${idx}`}
            role="listitem"
            className={cn(
              "flex h-14 w-[160px] shrink-0 items-center justify-center rounded-xl border border-[color:var(--color-partners-chip-border)] bg-[color:var(--color-partners-chip-surface)] px-4",
              "shadow-[0_7px_16px_rgba(2,8,24,0.13)] transition-all duration-300 hover:-translate-y-0.5 hover:border-[color:var(--color-partners-chip-border-hover)] hover:bg-[color:var(--color-partners-chip-surface-hover)]",
            )}
          >
            <LogoImage
              src={logo.src}
              alt={logo.alt}
              width={220}
              height={90}
              draggable={false}
              className="h-8 w-full object-contain opacity-90"
            />
          </div>
        ))}
      </motion.div>
      <div className="pointer-events-none absolute inset-y-0 left-0 w-14 bg-gradient-to-r from-[color:var(--color-company-ink)] to-transparent" />
      <div className="pointer-events-none absolute inset-y-0 right-0 w-14 bg-gradient-to-l from-[color:var(--color-company-ink)] to-transparent" />
    </div>
  );
}
