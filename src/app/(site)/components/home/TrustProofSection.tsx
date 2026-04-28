"use client";

import * as React from "react";
import { AnimatePresence, animate, motion, useMotionValue, useReducedMotion, useTransform } from "framer-motion";
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

const FOCUS_RING_YT_ON_VIDEO =
  "focus:outline-none focus-visible:ring-2 focus-visible:ring-white/90 focus-visible:ring-offset-2 focus-visible:ring-offset-black/80";

const FOCUS_RING_ON_NAVY_STRIP =
  "focus:outline-none focus-visible:ring-2 focus-visible:ring-white/90 focus-visible:ring-offset-2 focus-visible:ring-offset-[color:var(--color-company-ink)]";

function YoutubePlayIcon({ className }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" aria-hidden>
      <path fill="currentColor" d="M8 5v14l11-7L8 5z" />
    </svg>
  );
}

function YoutubeExternalIcon({ className }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="currentColor" aria-hidden>
      <path d="M19 19H5V5h7V3H5a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7h-2v7zM14 3v2h3.59l-9.83 9.83 1.41 1.41L19 6.41V10h2V3h-7z" />
    </svg>
  );
}

/** One full loop = width of a single duplicated half of the logo strip (see `MarqueeLogos`). */
const MARQUEE_LOOP_DURATION_MS = 42_000;

function normalizeMarqueeOffset(v: number, loopWidth: number): number {
  if (loopWidth <= 0) return v;
  let t = v;
  while (t <= -loopWidth) t += loopWidth;
  while (t > 0) t -= loopWidth;
  return t;
}

/**
 * Pointer client position for drag/swipe math.
 * On touch, use the primary event only: the last coalesced sample can disagree with
 * `pointerdown`/`startClient*` on some mobile WebKit builds and breaks axis lock vs vertical bail.
 * For mouse/pen, prefer the last coalesced sample when bundled moves are delivered as one event.
 */
function marqueePointerClient(e: React.PointerEvent<Element>): { clientX: number; clientY: number } {
  const ne = e.nativeEvent as PointerEvent;
  if (
    ne.pointerType !== "touch" &&
    typeof ne.getCoalescedEvents === "function"
  ) {
    const c = ne.getCoalescedEvents();
    if (c.length > 0) {
      const last = c[c.length - 1];
      if (last) return { clientX: last.clientX, clientY: last.clientY };
    }
  }
  return { clientX: ne.clientX, clientY: ne.clientY };
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
  const [userPlaying, setUserPlaying] = React.useState(false);

  React.useEffect(() => {
    if (!isActive) setUserPlaying(false);
  }, [isActive]);

  /* Mount the iframe synchronously from the Play click. Delaying this with
   * requestIdleCallback/setTimeout can lose the browser's user-activation
   * window, which makes YouTube autoplay wait for a second tap. */
  const [iframeReady, setIframeReady] = React.useState(false);
  React.useEffect(() => {
    if (!isActive || !userPlaying) {
      setIframeReady(false);
    }
  }, [isActive, userPlaying]);

  /** After src is set, keep poster visible until iframe `load` so there is no black flash. */
  const [iframePainted, setIframePainted] = React.useState(false);
  const embedSrc = React.useMemo(() => {
    if (!ytId || !isActive || !userPlaying || !iframeReady) return "";
    const params = new URLSearchParams({
      autoplay: "1",
      /* User explicitly taps Play — unmuted so audio is audible; some mobile
       * browsers may still enforce mute until the user unmutes in the player. */
      mute: "0",
      loop: "0",
      controls: "1",
      modestbranding: "1",
      rel: "0",
      playsinline: "1",
    });
    if (typeof window !== "undefined" && window.location?.origin) {
      params.set("origin", window.location.origin);
    }
    return `https://www.youtube-nocookie.com/embed/${ytId}?${params.toString()}`;
  }, [iframeReady, isActive, userPlaying, ytId]);

  React.useEffect(() => {
    setIframePainted(false);
  }, [embedSrc]);

  /* Prefer maxres poster when available; fall back once to hqdefault on load error. */
  const [thumbKind, setThumbKind] = React.useState<"max" | "hq">("max");
  React.useEffect(() => {
    setThumbKind("max");
  }, [ytId]);
  const thumbSrc = ytId
    ? `https://i.ytimg.com/vi/${ytId}/${thumbKind === "max" ? "maxresdefault" : "hqdefault"}.jpg`
    : "";

  const showCaptionOverlay = !isActive;
  const showEmbed = Boolean(embedSrc);
  const showPreparing = Boolean(isActive && userPlaying && ytId && !showEmbed);

  const watchLabel = "Watch on YouTube (opens in a new tab)";

  const videoEyebrow = item.eyebrow ?? "Live operation preview";

  const handlePlayClick = React.useCallback(() => {
    setIframePainted(false);
    setIframeReady(true);
    setUserPlaying(true);
  }, []);

  return (
    <article
      className={cn(
        "relative overflow-hidden rounded-2xl border border-[color:var(--color-border-light)] bg-[color:var(--color-company-ink)]",
        "shadow-[0_14px_28px_rgba(2,8,24,0.16)]",
      )}
    >
      <div className="relative w-full bg-black">
        {thumbSrc ? (
          /* Single stack: poster stays mounted when iframe appears so React never swaps trees (avoids a black frame). */
          <div className="relative aspect-video w-full min-h-0 overflow-hidden rounded-t-2xl bg-black">
            <img
              src={thumbSrc}
              alt={isActive ? "" : item.title}
              draggable={false}
              aria-hidden={isActive || undefined}
              decoding="async"
              loading={isActive ? "eager" : "lazy"}
              onError={() => setThumbKind((k) => (k === "max" ? "hq" : k))}
              className={cn(
                "pointer-events-none absolute inset-0 z-0 h-full w-full object-cover transition-opacity duration-500 ease-out",
                showEmbed && iframePainted ? "opacity-0" : "opacity-100",
              )}
            />
            {!showEmbed ? (
              <div className="pointer-events-none absolute inset-0 z-[1] bg-black/22" aria-hidden />
            ) : null}
            {showEmbed ? (
              <iframe
                key={embedSrc}
                className={cn(
                  "absolute inset-0 z-10 h-full w-full border-0 transition-opacity duration-500 ease-out",
                  iframePainted ? "pointer-events-auto opacity-100" : "pointer-events-none opacity-0",
                )}
                src={embedSrc}
                title={item.title}
                loading="eager"
                referrerPolicy="strict-origin-when-cross-origin"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                allowFullScreen
                onLoad={() => setIframePainted(true)}
              />
            ) : null}
          </div>
        ) : (
          <div className="relative flex aspect-video w-full items-center justify-center overflow-hidden rounded-t-2xl bg-black text-white/75">
            Video unavailable
          </div>
        )}

        {/* Thumbnail-only: our copy; hide while iframe plays so it does not stack on YouTube chrome. */}
        {isActive && !showEmbed ? (
          <div className="pointer-events-none absolute inset-x-0 top-0 z-[5] max-h-[46%] bg-gradient-to-b from-black/82 via-black/50 to-transparent px-3.5 pb-10 pt-2.5 sm:px-4 sm:pb-12 sm:pt-3">
            <div className="flex items-center gap-1.5">
              <LogoImage
                src="/_optimized/brand/SSPlogo.png"
                alt=""
                width={18}
                height={18}
                className="h-4 w-4 object-contain opacity-90 sm:h-[18px] sm:w-[18px]"
              />
              <p className="text-[10px] font-semibold uppercase tracking-[0.12em] text-white/66 sm:text-[10.5px]">
                {videoEyebrow}
              </p>
            </div>
            <h3 className="mt-1 line-clamp-2 text-[16px] font-semibold leading-[1.12] tracking-[-0.02em] text-white sm:text-[17px]">
              {item.title}
            </h3>
            {item.description ? (
              <p className="mt-0.5 line-clamp-3 text-[11.5px] leading-snug text-white/74 sm:text-[12px]">{item.description}</p>
            ) : null}
          </div>
        ) : null}

        {isActive && item.youtubeUrl ? (
          <div className="border-t border-white/[0.08] bg-[color:var(--color-company-ink)] px-3 py-2 sm:px-4">
            <a
              href={item.youtubeUrl}
              target="_blank"
              rel="noopener noreferrer"
              className={cn(
                FOCUS_RING_ON_NAVY_STRIP,
                "group inline-flex max-w-full cursor-pointer items-center gap-2 rounded-full border border-white/14 bg-white/[0.06] px-3 py-1.5 text-[11.5px] font-semibold tracking-[0.01em] text-white/90 shadow-[0_6px_20px_rgba(0,0,0,0.2)] transition-colors sm:px-3.5 sm:text-[12px]",
                "hover:border-white/22 hover:bg-white/[0.1] hover:text-white",
              )}
              aria-label={watchLabel}
            >
              <span className="truncate">Watch on YouTube</span>
              <span
                className="inline-flex h-7 w-7 shrink-0 items-center justify-center rounded-md bg-[#ff0000] text-white transition-colors group-hover:bg-[#cc0000] sm:h-8 sm:w-8"
                aria-hidden
              >
                <YoutubeExternalIcon className="h-3.5 w-3.5 sm:h-4 sm:w-4" />
              </span>
            </a>
          </div>
        ) : null}

        {showCaptionOverlay ? (
          <div className="pointer-events-none absolute inset-x-0 bottom-0 max-h-[55%] border-t border-white/14 bg-gradient-to-t from-black/72 via-black/52 to-transparent px-4 py-3 backdrop-blur-sm sm:px-5 sm:py-3.5">
            <div className="flex items-center gap-1.5">
              <LogoImage
                src="/_optimized/brand/SSPlogo.png"
                alt=""
                width={18}
                height={18}
                className="pointer-events-none h-4 w-4 object-contain sm:h-[18px] sm:w-[18px]"
              />
              <p className="text-[10px] font-semibold uppercase tracking-[0.12em] text-white/70 sm:text-[10.5px]">
                {videoEyebrow}
              </p>
            </div>
            <h3 className="mt-1.5 line-clamp-2 text-[17px] font-semibold leading-[1.1] text-white sm:text-[19px]">
              {item.title}
            </h3>
            {item.description ? (
              <p className="mt-1 line-clamp-3 text-[12px] leading-snug text-white/78 sm:text-[12.5px]">{item.description}</p>
            ) : null}
          </div>
        ) : null}
      </div>

      {/* Center over full card (16:9 + navy footer) so the play control does not ride high. */}
      {!showEmbed && thumbSrc ? (
        <div className="pointer-events-none absolute inset-0 z-[8] flex items-center justify-center">
          {isActive ? (
            <button
              type="button"
              onClick={handlePlayClick}
              disabled={showPreparing}
              className={cn(
                FOCUS_RING_YT_ON_VIDEO,
                "pointer-events-auto flex h-11 w-[62px] shrink-0 cursor-pointer items-center justify-center rounded-[10px] bg-[#ff0000] text-white shadow-[0_8px_24px_rgba(0,0,0,0.42)] transition-[transform,background-color] sm:h-12 sm:w-[68px]",
                "hover:bg-[#cc0000] active:scale-[0.98] disabled:cursor-wait disabled:opacity-80",
              )}
              aria-label={showPreparing ? "Loading video player" : "Play video"}
            >
              {showPreparing ? (
                <span className="text-[15px] font-semibold leading-none" aria-hidden>
                  …
                </span>
              ) : (
                <YoutubePlayIcon className="ml-0.5 h-[22px] w-[22px] sm:h-6 sm:w-6" />
              )}
            </button>
          ) : (
            <span
              className="flex h-10 w-[56px] items-center justify-center rounded-[9px] bg-[#ff0000] text-white shadow-[0_6px_18px_rgba(0,0,0,0.35)] sm:h-11 sm:w-[60px]"
              aria-hidden
            >
              <YoutubePlayIcon className="ml-0.5 h-5 w-5 sm:h-[22px] sm:w-[22px]" />
            </span>
          )}
        </div>
      ) : null}
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

type TrustCarouselSwipeSession = {
  pointerId: number;
  pointerType: string;
  startClientX: number;
  startClientY: number;
  locked: boolean;
  lockClientX: number;
};

const MOBILE_CAROUSEL_MQ = "(max-width: 767px)";

function useMobileTrustCarousel() {
  return React.useSyncExternalStore(
    (onStoreChange) => {
      if (typeof window === "undefined") return () => {};
      const mq = window.matchMedia(MOBILE_CAROUSEL_MQ);
      mq.addEventListener("change", onStoreChange);
      return () => mq.removeEventListener("change", onStoreChange);
    },
    () => (typeof window !== "undefined" ? window.matchMedia(MOBILE_CAROUSEL_MQ).matches : false),
    () => false,
  );
}

export function TrustProofSection() {
  const reduceMotion = useReducedMotion() ?? false;
  const [isMarqueePaused, setIsMarqueePaused] = React.useState(false);
  const carouselSwipeRef = React.useRef<TrustCarouselSwipeSession | null>(null);
  const carouselTrackRef = React.useRef<HTMLDivElement>(null);
  const isMobileCarousel = useMobileTrustCarousel();
  const carouselPullX = useMotionValue(0);

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

  React.useEffect(() => {
    carouselPullX.set(0);
  }, [index, carouselPullX]);

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

  const releaseCarouselPointerSafe = React.useCallback((target: HTMLElement, pointerId: number) => {
    try {
      if (target.hasPointerCapture(pointerId)) target.releasePointerCapture(pointerId);
    } catch {
      /* noop */
    }
  }, []);

  const clearCarouselSwipe = React.useCallback(
    (target: HTMLElement, pointerId: number) => {
      const s = carouselSwipeRef.current;
      if (!s || s.pointerId !== pointerId) return;
      carouselSwipeRef.current = null;
      releaseCarouselPointerSafe(target, pointerId);
      carouselPullX.set(0);
    },
    [carouselPullX, releaseCarouselPointerSafe],
  );

  const onCarouselTrackPointerDown = React.useCallback(
    (e: React.PointerEvent<HTMLDivElement>) => {
      if (!hasMultiple) return;
      if (e.pointerType === "mouse" && e.button !== 0) return;
      const target = e.target as HTMLElement;
      if (target.closest("button, a[href], input, textarea, select, label, iframe")) return;
      carouselPullX.set(0);
      carouselSwipeRef.current = {
        pointerId: e.pointerId,
        pointerType: e.pointerType,
        startClientX: e.clientX,
        startClientY: e.clientY,
        locked: false,
        lockClientX: e.clientX,
      };
      try {
        e.currentTarget.setPointerCapture(e.pointerId);
      } catch {
        /* noop */
      }
    },
    [carouselPullX, hasMultiple],
  );

  const onCarouselTrackPointerMove = React.useCallback(
    (e: React.PointerEvent<HTMLDivElement>) => {
      const session = carouselSwipeRef.current;
      if (!session || session.pointerId !== e.pointerId) return;
      const { clientX, clientY } = marqueePointerClient(e);
      const dx = clientX - session.startClientX;
      const dy = clientY - session.startClientY;
      const adx = Math.abs(dx);
      const ady = Math.abs(dy);
      const isTouch = session.pointerType === "touch";

      if (isMobileCarousel) {
        if (!session.locked) {
          const dead = isTouch ? 3.5 : 5;
          if (Math.hypot(dx, dy) < dead) return;

          if (ady >= adx * (isTouch ? 1.22 : 1.18) && ady >= (isTouch ? 9 : 10)) {
            releaseCarouselPointerSafe(e.currentTarget, e.pointerId);
            carouselSwipeRef.current = null;
            carouselPullX.set(0);
            return;
          }

          const horizontal =
            adx >= ady * (isTouch ? 1.02 : 1.06) || adx >= (isTouch ? 4 : 6);
          if (horizontal) {
            session.locked = true;
            session.lockClientX = clientX;
            carouselPullX.set(0);
          } else {
            return;
          }
        }

        carouselPullX.set(clientX - session.lockClientX);
        return;
      }

      if (Math.hypot(dx, dy) < (isTouch ? 3.5 : 5)) return;
      if (ady >= adx * (isTouch ? 1.22 : 1.18) && ady >= (isTouch ? 9 : 10)) {
        carouselSwipeRef.current = null;
        releaseCarouselPointerSafe(e.currentTarget, e.pointerId);
      }
    },
    [carouselPullX, isMobileCarousel, releaseCarouselPointerSafe],
  );

  const onCarouselTrackPointerUp = React.useCallback(
    (e: React.PointerEvent<HTMLDivElement>) => {
      const session = carouselSwipeRef.current;
      if (!session || session.pointerId !== e.pointerId) return;
      const el = e.currentTarget;
      const id = e.pointerId;
      const { clientX, clientY } = marqueePointerClient(e);
      const dx = clientX - session.startClientX;
      const dy = clientY - session.startClientY;
      carouselSwipeRef.current = null;
      releaseCarouselPointerSafe(el, id);

      if (isMobileCarousel && session.locked) {
        const pull = carouselPullX.get();
        const minSwipe = session.pointerType === "mouse" ? 48 : 36;
        if (Math.abs(pull) >= minSwipe) {
          window.getSelection()?.removeAllRanges();
          carouselPullX.set(0);
          if (pull > 0) goPrev();
          else goNext();
        } else if (!reduceMotion) {
          void animate(carouselPullX, 0, { duration: 0.2, ease: [0.22, 1, 0.36, 1] });
        } else {
          carouselPullX.set(0);
        }
        return;
      }

      const minSwipe = session.pointerType === "mouse" ? 48 : 36;
      if (Math.abs(dx) < minSwipe || Math.abs(dx) <= Math.abs(dy)) return;
      window.getSelection()?.removeAllRanges();
      if (dx > 0) goPrev();
      else goNext();
    },
    [carouselPullX, goNext, goPrev, isMobileCarousel, reduceMotion, releaseCarouselPointerSafe],
  );

  const onCarouselTrackPointerCancel = React.useCallback(
    (e: React.PointerEvent<HTMLDivElement>) => {
      clearCarouselSwipe(e.currentTarget, e.pointerId);
    },
    [clearCarouselSwipe],
  );

  const onCarouselTrackLostPointerCapture = React.useCallback(
    (e: React.PointerEvent<HTMLDivElement>) => {
      if (carouselSwipeRef.current?.pointerId !== e.pointerId) return;
      carouselSwipeRef.current = null;
      if (isMobileCarousel) {
        if (!reduceMotion) {
          void animate(carouselPullX, 0, { duration: 0.18, ease: "easeOut" });
        } else {
          carouselPullX.set(0);
        }
      }
    },
    [carouselPullX, isMobileCarousel, reduceMotion],
  );

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

              Pointer handlers live on this track only (with capture + coalesced
              moves) so drags match the partner marquee and are not lost to
              embeds or hit-testing drift.

              Do not add `touch-manipulation` here: it sets touch-action in a way
              that overrides pan-y and lets the browser take horizontal pans on
              iOS, which breaks swipe/drag on the slides.
            */}
            <div
              ref={carouselTrackRef}
              className="mt-6 cursor-grab touch-pan-y overscroll-x-contain select-none active:cursor-grabbing"
              onPointerDown={onCarouselTrackPointerDown}
              onPointerMove={onCarouselTrackPointerMove}
              onPointerUp={onCarouselTrackPointerUp}
              onPointerCancel={onCarouselTrackPointerCancel}
              onLostPointerCapture={onCarouselTrackLostPointerCapture}
              onDragStart={(e) => e.preventDefault()}
            >
            <div className="hidden items-center justify-center gap-5 md:flex">
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

            <div className="relative mx-auto w-full max-w-[460px] overflow-x-clip md:hidden">
              <motion.div style={{ x: carouselPullX }} className="will-change-transform">
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
              </motion.div>
            </div>
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
    pointerType: string;
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
      pointerType: e.pointerType,
      startClientX: e.clientX,
      startClientY: e.clientY,
      locked: false,
      lockClientX: e.clientX,
    };
    // Capture immediately: autoplay moves the strip; without capture, the finger can leave this
    // element before we "lock" and pointer moves are delivered to whatever is underneath (felt as random misses on mobile).
    try {
      e.currentTarget.setPointerCapture(e.pointerId);
    } catch {
      /* noop */
    }
  };

  const onPointerMove = (e: React.PointerEvent<HTMLDivElement>) => {
    const session = dragRef.current;
    if (!session || session.pointerId !== e.pointerId) return;

    const { clientX, clientY } = marqueePointerClient(e);
    const dx = clientX - session.startClientX;
    const dy = clientY - session.startClientY;
    const adx = Math.abs(dx);
    const ady = Math.abs(dy);
    const isTouch = session.pointerType === "touch";

    if (!session.locked) {
      const dead = isTouch ? 3.5 : 5;
      if (Math.hypot(dx, dy) < dead) return;

      // Release capture so the page can scroll when the gesture is clearly vertical.
      if (ady >= adx * (isTouch ? 1.22 : 1.18) && ady >= (isTouch ? 9 : 10)) {
        releasePointerSafe(e.currentTarget, e.pointerId);
        dragRef.current = null;
        pullX.set(0);
        return;
      }

      const horizontal =
        adx >= ady * (isTouch ? 1.02 : 1.06) || adx >= (isTouch ? 4 : 6);
      if (horizontal) {
        session.locked = true;
        session.lockClientX = clientX;
        pullX.set(0);
      } else {
        return;
      }
    }

    pullX.set(clientX - session.lockClientX);
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
