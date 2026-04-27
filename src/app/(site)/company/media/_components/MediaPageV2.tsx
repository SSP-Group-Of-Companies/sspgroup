"use client";

import {
  useCallback,
  useEffect,
  useRef,
  useState,
  type CSSProperties,
  type KeyboardEvent as ReactKeyboardEvent,
  type RefObject,
} from "react";
import Image from "next/image";
import Link from "next/link";
import { AnimatePresence, motion, useReducedMotion, type Variants } from "framer-motion";
import { ArrowUpRight, ChevronLeft, ExternalLink, Play, X } from "lucide-react";
import { Container } from "@/app/(site)/components/layout/Container";
import { SectionEyebrow } from "@/app/(site)/components/ui/SectionEyebrow";
import { MEDIA_HERO_VIDEO, SSP_VIDEOS, SSP_YOUTUBE_CHANNEL, type VideoItem } from "@/config/media";
import { trackCtaClick } from "@/lib/analytics/cta";
import { cn } from "@/lib/cn";
import {
  COMPANY_HERO_SHARD_BOX,
  COMPANY_HERO_SHARD_FRAME,
  COMPANY_HERO_SHARD_FRAME_INNER,
} from "@/app/(site)/components/network/coverageHeroStyles";

const FOCUS_RING =
  "focus:outline-none focus-visible:ring-2 focus-visible:ring-[color:var(--color-nav-ring)] focus-visible:ring-offset-2 focus-visible:ring-offset-[color:var(--color-surface-0-light)]";
const HERO_EYEBROW_ACCENT = "var(--color-media-eyebrow-accent)";
const HERO_SURFACE =
  "linear-gradient(135deg, var(--color-media-hero-bg-start) 0%, var(--color-media-hero-bg-mid) 52%, var(--color-media-hero-bg-end) 100%)";
const HERO_PRIMARY_CTA_LABEL = "Watch A Decade of Growth, Reliability, and Trust";
const HERO_PRIMARY_CTA_ID = "media_hero_play_hero_primary_video";

const ytThumb = (id: string) => `https://img.youtube.com/vi/${id}/hqdefault.jpg`;
const videoAnchor = (id: string) => `/company/media#${id}`;

type VideoLaunchSource = "media_hero" | "media_gallery";

function Hero({
  onPlay,
  reduceMotion,
}: {
  onPlay: (video: VideoItem, triggerEl: HTMLElement, source: VideoLaunchSource) => void;
  reduceMotion: boolean;
}) {
  const stagger: Variants = reduceMotion
    ? { hidden: { opacity: 1 }, show: { opacity: 1 } }
    : { hidden: {}, show: { transition: { staggerChildren: 0.06, delayChildren: 0.04 } } };

  const reveal: Variants = reduceMotion
    ? { hidden: { opacity: 1, y: 0 }, show: { opacity: 1, y: 0 } }
    : { hidden: { opacity: 1, y: 12 }, show: { opacity: 1, y: 0 } };

  const shardMaskStyle: CSSProperties = {
    background:
      "linear-gradient(162deg, var(--color-media-shard-start) 0%, var(--color-media-shard-mid) 56%, var(--color-media-shard-end) 100%)",
    WebkitMaskImage: "url('/_optimized/company/ssp-shard-mask.svg')",
    maskImage: "url('/_optimized/company/ssp-shard-mask.svg')",
    WebkitMaskRepeat: "no-repeat",
    maskRepeat: "no-repeat",
    WebkitMaskPosition: "center",
    maskPosition: "center",
    WebkitMaskSize: "contain",
    maskSize: "contain",
  };
  const shardFadeStyle: CSSProperties = {
    WebkitMaskImage:
      "linear-gradient(136deg, rgba(0,0,0,0.01) 0%, rgba(0,0,0,0.12) 30%, rgba(0,0,0,0.86) 63%, #000 100%)",
    maskImage:
      "linear-gradient(136deg, rgba(0,0,0,0.01) 0%, rgba(0,0,0,0.12) 30%, rgba(0,0,0,0.86) 63%, #000 100%)",
  };

  return (
    <section
      id={MEDIA_HERO_VIDEO.id}
      aria-labelledby="media-hero-heading"
      className="relative overflow-hidden border-b border-white/10 py-18 sm:py-22 lg:py-24"
      style={{ background: HERO_SURFACE }}
    >
      <div className="pointer-events-none absolute inset-0" aria-hidden>
        <div className="absolute inset-0 bg-[radial-gradient(64%_66%_at_86%_44%,var(--color-media-hero-glow-primary),var(--color-media-hero-glow-primary-soft)_54%,transparent_100%)]" />
        <div className="absolute inset-0 bg-[radial-gradient(52%_56%_at_9%_96%,var(--color-media-hero-glow-secondary),transparent_72%)]" />
        <div className="absolute inset-0 bg-[radial-gradient(44%_50%_at_68%_54%,var(--color-media-hero-glow-tertiary),transparent_74%)]" />
      </div>

      <div className={COMPANY_HERO_SHARD_FRAME} aria-hidden>
        <div className={COMPANY_HERO_SHARD_FRAME_INNER}>
          <motion.div
            initial={reduceMotion ? { opacity: 0.74 } : { opacity: 0.04, x: -34, y: 20 }}
            animate={reduceMotion ? { opacity: 0.66 } : { opacity: 0.68, x: 0, y: 0 }}
            transition={{ duration: reduceMotion ? 0 : 0.66, ease: [0.22, 1, 0.36, 1] }}
            className={COMPANY_HERO_SHARD_BOX}
            style={shardFadeStyle}
          >
            <div className="h-full w-full" style={shardMaskStyle} />
          </motion.div>
        </div>
      </div>

      <Container className="site-page-container relative z-10">
        <motion.div initial="hidden" animate="show" variants={stagger} className="relative max-w-[44rem]">
          <div className="relative z-20">
            <motion.div variants={reveal} transition={{ duration: reduceMotion ? 0 : 0.32, ease: "easeOut" }}>
              <Link
                href="/about-us"
                className={cn(
                  "mb-5 inline-flex items-center gap-1.5 rounded text-xs font-medium text-white/50 transition-colors hover:text-white/75",
                  FOCUS_RING,
                )}
              >
                <ChevronLeft className="h-3.5 w-3.5" />
                About SSP
              </Link>
            </motion.div>
            <motion.div variants={reveal} transition={{ duration: reduceMotion ? 0 : 0.34, ease: "easeOut" }}>
              <SectionEyebrow label="Media Library" accentColor={HERO_EYEBROW_ACCENT} light />
            </motion.div>
            <motion.h1
              id="media-hero-heading"
              variants={reveal}
              transition={{ duration: reduceMotion ? 0 : 0.38, ease: "easeOut" }}
              className="mt-4 max-w-[20ch] text-balance text-[2.05rem] font-bold leading-[1.04] tracking-tight text-white sm:text-[2.45rem] lg:text-[2.92rem]"
            >
              Watch operational discipline in motion.
            </motion.h1>
            <motion.p
              variants={reveal}
              transition={{ duration: reduceMotion ? 0 : 0.34, ease: "easeOut" }}
              className="mt-4 max-w-[54ch] text-[14.25px] leading-[1.74] text-white/74 sm:text-[15px]"
            >
              Scroll through the corridor, open any video instantly, and continue on our full YouTube channel.
            </motion.p>
            <motion.div
              variants={reveal}
              transition={{ duration: reduceMotion ? 0 : 0.34, ease: "easeOut" }}
              className="mt-7 flex flex-wrap items-center gap-3"
            >
              <button
                type="button"
                data-cta-id={HERO_PRIMARY_CTA_ID}
                onClick={(event) =>
                  onPlay(MEDIA_HERO_VIDEO, event.currentTarget, "media_hero")
                }
                className={cn(
                  "group inline-flex items-center gap-2 rounded-xl border border-white/20 bg-white/10 px-4 py-2.5 text-sm font-semibold text-white shadow-[0_16px_30px_-20px_rgba(2,6,23,0.62)] backdrop-blur transition-all motion-safe:hover:-translate-y-0.5 hover:bg-white/16",
                  FOCUS_RING,
                )}
              >
                <Play className="h-4 w-4 fill-current" />
                {HERO_PRIMARY_CTA_LABEL}
                <ArrowUpRight className="h-4 w-4 transition-transform motion-safe:group-hover:translate-x-[1px] motion-safe:group-hover:-translate-y-[1px]" />
              </button>
              <a
                href={SSP_YOUTUBE_CHANNEL}
                target="_blank"
                rel="noopener noreferrer"
                data-cta-id="media_hero_youtube_channel"
                onClick={() =>
                  trackCtaClick({
                    ctaId: "media_hero_youtube_channel",
                    location: "media_hero",
                    destination: SSP_YOUTUBE_CHANNEL,
                    label: "YouTube Channel",
                  })
                }
                className={cn(
                  "inline-flex items-center gap-2 rounded-xl border border-white/16 bg-black/16 px-4 py-2.5 text-sm font-semibold text-white/76 transition-colors hover:text-white",
                  FOCUS_RING,
                )}
              >
                YouTube Channel
                <ExternalLink className="h-4 w-4" />
              </a>
            </motion.div>
          </div>
        </motion.div>
      </Container>
    </section>
  );
}

function IntentionalCollage({
  videos,
  onPlay,
  reduceMotion,
}: {
  videos: readonly VideoItem[];
  onPlay: (video: VideoItem, triggerEl: HTMLElement, source: VideoLaunchSource) => void;
  reduceMotion: boolean;
}) {
  const topVideos = videos;

  return (
    <section className="relative overflow-hidden border-b border-[color:var(--color-border-light-soft)] bg-[color:var(--color-surface-0-light)] py-14 sm:py-18 lg:py-20">
      <div className="pointer-events-none absolute inset-0" aria-hidden>
        <div className="absolute inset-0 bg-[linear-gradient(to_bottom,rgba(255,255,255,0.97),rgba(255,255,255,0.93))]" />
        <div className="absolute inset-x-0 top-0 h-24 bg-[linear-gradient(to_bottom,rgba(74,14,28,0.14),rgba(74,14,28,0.04)_46%,transparent)]" />
        <div className="absolute inset-0 bg-[radial-gradient(46%_40%_at_90%_0%,rgba(122,22,42,0.08),transparent_72%)]" />
        <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-[color:var(--color-brand-500)]/35 to-transparent" />
      </div>
      <Container className="site-page-container relative">
        <div className="mb-9 max-w-3xl">
          <h2 className="max-w-[20ch] text-balance text-[2.05rem] font-bold leading-[1.04] tracking-tight text-[color:var(--color-text-strong)] sm:text-[2.38rem] lg:text-[2.62rem]">
            Video gallery
          </h2>
          <p className="mt-4 max-w-[62ch] text-[14.85px] leading-[1.8] text-[color:var(--color-muted)] sm:text-[15.35px]">
            Browse a curated view of SSP operations and services with accurate live titles and YouTube-backed playback.
          </p>
        </div>

        <motion.div
          initial={reduceMotion ? false : { opacity: 1, y: 8, scale: 0.995 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.2 }}
          transition={{ duration: reduceMotion ? 0 : 0.35, ease: "easeOut" }}
          className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3"
        >
          {topVideos.map((video) => (
            <article
              key={video.id}
              id={video.id}
              className="group h-full overflow-hidden rounded-2xl border border-white/10 bg-[linear-gradient(165deg,rgba(8,14,24,0.96),rgba(7,12,22,0.96))] shadow-[0_26px_52px_-34px_rgba(2,6,23,0.95)] transition-all duration-300 motion-safe:hover:-translate-y-[1px] hover:shadow-[0_30px_58px_-32px_rgba(2,6,23,0.98)]"
            >
              <button
                type="button"
                data-cta-id={`media_gallery_play_${video.id}`}
                onClick={(event) =>
                  onPlay(video, event.currentTarget, "media_gallery")
                }
                aria-label={`Play ${video.title}`}
                className={cn("block w-full text-left", FOCUS_RING)}
              >
                <div className="relative aspect-[16/10] overflow-hidden rounded-2xl">
                  <Image
                    src={ytThumb(video.youtubeId)}
                    alt={video.title}
                    fill
                    sizes="(max-width: 1024px) 100vw, 33vw"
                    className="object-cover transition-transform duration-500 motion-safe:group-hover:scale-[1.025]"
                  />
                  <div className="absolute inset-0 bg-[linear-gradient(180deg,rgba(3,8,18,0.08)_0%,rgba(3,8,18,0.28)_46%,rgba(3,8,18,0.88)_100%)]" />

                  <div className="absolute inset-0 flex items-center justify-center">
                    <span className="inline-flex h-14 w-14 items-center justify-center rounded-full border border-white/45 bg-black/42 text-white shadow-[0_16px_34px_-18px_rgba(0,0,0,0.95)] backdrop-blur-sm transition-transform duration-300 motion-safe:group-hover:scale-105">
                      <Play className="ml-[2px] h-6 w-6 fill-current" />
                    </span>
                  </div>

                  <div className="absolute inset-x-0 bottom-0 p-4">
                    <div className="mb-1.5">
                      <p className="text-[9px] font-semibold tracking-[0.15em] text-white/54 uppercase">{video.category}</p>
                    </div>
                    <h3 className="line-clamp-2 text-[1.17rem] font-medium leading-[1.14] tracking-tight text-white">
                      {video.title}
                    </h3>
                    <p className="mt-1 line-clamp-1 text-[12px] leading-[1.45] text-white/52">{video.description}</p>
                  </div>
                </div>
              </button>
            </article>
          ))}
        </motion.div>

        <div className="mt-8 flex justify-center">
          <a
            href={SSP_YOUTUBE_CHANNEL}
            target="_blank"
            rel="noopener noreferrer"
            data-cta-id="media_gallery_youtube_channel"
            onClick={() =>
              trackCtaClick({
                ctaId: "media_gallery_youtube_channel",
                location: "media_gallery",
                destination: SSP_YOUTUBE_CHANNEL,
                label: "Visit our YouTube channel",
              })
            }
            className={cn(
              "group inline-flex items-center gap-2 rounded-xl border border-[color:var(--color-media-cta-600)]/85 bg-[linear-gradient(180deg,var(--color-media-cta-500)_0%,var(--color-media-cta-600)_55%,var(--color-media-cta-700)_100%)] px-5 py-3 text-sm font-semibold text-white shadow-[var(--shadow-media-cta)] transition-all motion-safe:hover:-translate-y-0.5 hover:brightness-[1.03]",
              FOCUS_RING,
            )}
          >
            <span className="inline-flex h-5 w-5 items-center justify-center rounded-full bg-white/20 ring-1 ring-inset ring-white/28">
              <Play className="ml-[1px] h-3.5 w-3.5 fill-current text-white" />
            </span>
            Visit our YouTube channel to see full company media
            <ExternalLink className="h-4 w-4 transition-transform motion-safe:group-hover:translate-x-[1px] motion-safe:group-hover:-translate-y-[1px]" />
          </a>
        </div>
      </Container>
    </section>
  );
}

function VideoModal({
  video,
  onClose,
  reduceMotion,
  modalRef,
  closeButtonRef,
  lastTriggerRef,
}: {
  video: VideoItem | null;
  onClose: (location: string) => void;
  reduceMotion: boolean;
  modalRef: RefObject<HTMLDivElement | null>;
  closeButtonRef: RefObject<HTMLButtonElement | null>;
  lastTriggerRef: RefObject<HTMLElement | null>;
}) {
  useEffect(() => {
    if (!video) return;

    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    const focusTimer = window.setTimeout(() => closeButtonRef.current?.focus(), 0);

    const onKey = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        event.preventDefault();
        onClose("media_modal_escape");
        return;
      }

      if (event.key !== "Tab" || !modalRef.current) return;

      const focusableElements = Array.from(
        modalRef.current.querySelectorAll<HTMLElement>(
          'a[href], button:not([disabled]), textarea, input, select, iframe, [tabindex]:not([tabindex="-1"])',
        ),
      ).filter((element) => !element.hasAttribute("disabled") && element.tabIndex !== -1);

      if (focusableElements.length === 0) return;

      const first = focusableElements[0];
      const last = focusableElements[focusableElements.length - 1];
      const activeElement = document.activeElement as HTMLElement | null;

      if (event.shiftKey && activeElement === first) {
        event.preventDefault();
        last.focus();
      } else if (!event.shiftKey && activeElement === last) {
        event.preventDefault();
        first.focus();
      }
    };

    window.addEventListener("keydown", onKey);
    return () => {
      window.clearTimeout(focusTimer);
      window.removeEventListener("keydown", onKey);
      document.body.style.overflow = previousOverflow;
      lastTriggerRef.current?.focus();
    };
  }, [video, onClose, modalRef, closeButtonRef, lastTriggerRef]);

  const onShellKeyDown = (event: ReactKeyboardEvent<HTMLDivElement>) => {
    if (event.key === "Escape") {
      event.preventDefault();
      onClose("media_modal_escape");
    }
  };

  return (
    <AnimatePresence>
      {video ? (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: reduceMotion ? 0 : 0.2 }}
          className="fixed inset-0 z-[90] flex items-center justify-center p-4 sm:p-7"
          role="dialog"
          aria-modal="true"
          aria-label={`Playing ${video.title}`}
        >
          <div className="absolute inset-0 bg-black/84" onClick={() => onClose("media_modal_overlay")} />
          <motion.div
            initial={reduceMotion ? { opacity: 1 } : { opacity: 0, y: 16, scale: 0.985 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={reduceMotion ? { opacity: 0 } : { opacity: 0, y: 12, scale: 0.99 }}
            transition={{ duration: reduceMotion ? 0 : 0.25, ease: "easeOut" }}
            className="relative z-10 w-full max-w-6xl"
            ref={modalRef}
            onKeyDown={onShellKeyDown}
          >
            <button
              type="button"
              ref={closeButtonRef}
              onClick={() => onClose("media_modal_close_button")}
              className={cn(
                "absolute -top-12 right-0 inline-flex h-9 w-9 items-center justify-center rounded-full border border-white/24 bg-black/38 text-white/72 transition-colors hover:text-white",
                FOCUS_RING,
              )}
              aria-label="Close video"
            >
              <X className="h-4.5 w-4.5" />
            </button>
            <div className="overflow-hidden rounded-xl border border-white/16 shadow-[0_24px_90px_rgba(0,0,0,0.68)]">
              <div className="relative aspect-video w-full">
                <iframe
                  src={`https://www.youtube.com/embed/${video.youtubeId}?autoplay=1&rel=0&modestbranding=1`}
                  title={video.title}
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                  allowFullScreen
                  className="absolute inset-0 h-full w-full"
                />
              </div>
            </div>
          </motion.div>
        </motion.div>
      ) : null}
    </AnimatePresence>
  );
}

export function MediaPageV2() {
  const reduceMotion = useReducedMotion() ?? false;
  const [activeVideo, setActiveVideo] = useState<VideoItem | null>(null);
  const modalRef = useRef<HTMLDivElement | null>(null);
  const closeButtonRef = useRef<HTMLButtonElement | null>(null);
  const lastTriggerRef = useRef<HTMLElement | null>(null);

  const openVideo = useCallback(
    (video: VideoItem, triggerEl: HTMLElement, source: VideoLaunchSource) => {
      lastTriggerRef.current = triggerEl;
      trackCtaClick({
        ctaId: `${source}_play_${video.id}`,
        location: source,
        destination: videoAnchor(video.id),
        label: video.title,
      });
      setActiveVideo(video);
    },
    [],
  );

  const closeVideo = useCallback(
    (_location: string) => {
      setActiveVideo(null);
    },
    [],
  );

  return (
    <>
      <Hero onPlay={openVideo} reduceMotion={reduceMotion} />
      <IntentionalCollage videos={SSP_VIDEOS} onPlay={openVideo} reduceMotion={reduceMotion} />
      <VideoModal
        video={activeVideo}
        onClose={closeVideo}
        reduceMotion={reduceMotion}
        modalRef={modalRef}
        closeButtonRef={closeButtonRef}
        lastTriggerRef={lastTriggerRef}
      />
    </>
  );
}
