"use client";

import { useState, useCallback, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import { motion, AnimatePresence, useReducedMotion, type Variants } from "framer-motion";
import { ChevronLeft, Play, X, ExternalLink, Youtube } from "lucide-react";
import { cn } from "@/lib/cn";
import { Container } from "@/app/(site)/components/layout/Container";
import { SectionSignalEyebrow } from "@/app/(site)/components/ui/SectionSignalEyebrow";
import {
  SSP_VIDEOS,
  VIDEO_CATEGORIES,
  SSP_YOUTUBE_CHANNEL,
  type VideoItem,
  type VideoCategory,
} from "@/config/media";

const FOCUS_RING =
  "focus:outline-none focus-visible:ring-2 focus-visible:ring-white/60 focus-visible:ring-offset-2 focus-visible:ring-offset-[color:var(--color-company-ink)]";

/* ─────────────────────────── Hero ─────────────────────────── */

function Hero({ reduceMotion }: { reduceMotion: boolean }) {
  const stagger: Variants = reduceMotion
    ? { hidden: { opacity: 1 }, show: { opacity: 1 } }
    : { hidden: {}, show: { transition: { staggerChildren: 0.1, delayChildren: 0.06 } } };

  const reveal: Variants = reduceMotion
    ? { hidden: { opacity: 1, y: 0 }, show: { opacity: 1, y: 0 } }
    : { hidden: { opacity: 0, y: 18 }, show: { opacity: 1, y: 0 } };

  return (
    <section
      aria-labelledby="media-hero-heading"
      className="relative overflow-hidden border-b border-white/6 py-16 sm:py-20 lg:py-24"
      style={{ backgroundColor: "var(--color-company-ink)" }}
    >
      {/* Grid texture */}
      <div className="pointer-events-none absolute inset-0" aria-hidden>
        <div className="absolute inset-0 opacity-[0.03] [background-image:linear-gradient(to_right,rgba(255,255,255,0.8)_1px,transparent_1px),linear-gradient(to_bottom,rgba(255,255,255,0.8)_1px,transparent_1px)] [background-size:80px_80px]" />
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,transparent_50%,rgba(0,0,0,0.35)_100%)]" />
      </div>

      {/* Noise */}
      <div
        className="pointer-events-none absolute inset-0 opacity-[0.025]"
        style={{
          backgroundImage:
            "url(\"data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E\")",
        }}
        aria-hidden
      />

      {/* Decorative play circles */}
      <div className="pointer-events-none absolute inset-0 overflow-hidden" aria-hidden>
        <div className="absolute -right-16 top-1/4 h-64 w-64 rounded-full border border-white/[0.04] sm:h-96 sm:w-96" />
        <div className="absolute -left-24 bottom-1/4 h-48 w-48 rounded-full border border-white/[0.03] sm:h-72 sm:w-72" />
        <div className="absolute left-1/2 top-8 h-3 w-3 -translate-x-1/2 rounded-full bg-red-500/20" />
      </div>

      {/* Bottom accent */}
      <div
        className="pointer-events-none absolute inset-x-0 bottom-0 h-px"
        style={{ background: "linear-gradient(90deg, transparent 5%, rgba(220,38,38,0.25) 50%, transparent 95%)" }}
        aria-hidden
      />

      <Container className="relative z-10">
        <motion.div
          initial="hidden"
          animate="show"
          variants={stagger}
          className="mx-auto max-w-4xl text-center"
        >
          <motion.div
            variants={reveal}
            transition={{ duration: reduceMotion ? 0 : 0.35, ease: "easeOut" }}
          >
            <Link
              href="/company"
              className={cn(
                "mb-6 inline-flex items-center gap-1.5 rounded-lg px-3 py-1.5 text-xs font-medium text-white/50 transition-colors hover:text-white/80",
                FOCUS_RING,
              )}
            >
              <ChevronLeft className="h-3.5 w-3.5" />
              Company
            </Link>
          </motion.div>

          <motion.div
            variants={reveal}
            transition={{ duration: reduceMotion ? 0 : 0.35, ease: "easeOut" }}
            className="flex justify-center"
          >
            <SectionSignalEyebrow label="Company" light />
          </motion.div>

          <motion.h1
            id="media-hero-heading"
            variants={reveal}
            transition={{ duration: reduceMotion ? 0 : 0.45, ease: "easeOut" }}
            className="mt-5 text-[2.5rem] font-bold leading-[0.96] tracking-tight text-white sm:text-[3.2rem] lg:text-[4rem]"
            style={{ textShadow: "0 2px 16px rgba(0,0,0,0.5)" }}
          >
            SSP in Action
          </motion.h1>

          <motion.p
            variants={reveal}
            transition={{ duration: reduceMotion ? 0 : 0.4, ease: "easeOut" }}
            className="mx-auto mt-5 max-w-2xl text-[15px] leading-relaxed text-white/70 sm:text-base"
          >
            Operations footage, specialized transport, and brand media from SSP Group
            — watch our fleet, people, and logistics expertise in motion across North America.
          </motion.p>

          {/* Decorative video count badge */}
          <motion.div
            variants={reveal}
            transition={{ duration: reduceMotion ? 0 : 0.4, ease: "easeOut" }}
            className="mt-7 inline-flex items-center gap-2 rounded-full border border-[color:var(--color-glass-border)] bg-[color:var(--color-glass-bg)] px-4 py-2 backdrop-blur-sm"
          >
            <Play className="h-3.5 w-3.5 fill-red-500 text-red-500" />
            <span className="text-xs font-medium text-white/60">{SSP_VIDEOS.length} Videos</span>
          </motion.div>
        </motion.div>
      </Container>
    </section>
  );
}

/* ─────────────────────── Category Filter ─────────────────────── */

function CategoryFilter({
  active,
  onChange,
}: {
  active: VideoCategory | "all";
  onChange: (cat: VideoCategory | "all") => void;
}) {
  const allCategories: { id: VideoCategory | "all"; label: string }[] = [
    { id: "all", label: "All" },
    ...VIDEO_CATEGORIES,
  ];

  return (
    <div
      className="sticky top-0 z-30 border-b border-white/6"
      style={{ backgroundColor: "var(--color-company-ink)" }}
    >
      <Container>
        <nav
          aria-label="Video categories"
          className="scrollbar-none -mx-4 flex gap-2 overflow-x-auto px-4 py-4 sm:mx-0 sm:flex-wrap sm:justify-center sm:px-0"
        >
          {allCategories.map((cat) => (
            <button
              key={cat.id}
              onClick={() => onChange(cat.id)}
              className={cn(
                "relative shrink-0 rounded-full px-4 py-2 text-[13px] font-medium transition-all duration-200",
                FOCUS_RING,
                active === cat.id
                  ? "bg-red-600 text-white shadow-[0_4px_20px_rgba(220,38,38,0.3)]"
                  : "border border-[color:var(--color-glass-border)] bg-[color:var(--color-glass-bg)] text-white/50 hover:border-[color:var(--color-glass-border-hover)] hover:text-white/80",
              )}
            >
              {cat.label}
            </button>
          ))}
        </nav>
      </Container>
    </div>
  );
}

/* ─────────────────────── Video Card ─────────────────────── */

function VideoCard({
  video,
  index,
  onPlay,
  reduceMotion,
}: {
  video: VideoItem;
  index: number;
  onPlay: (video: VideoItem) => void;
  reduceMotion: boolean;
}) {
  const categoryLabel = VIDEO_CATEGORIES.find((c) => c.id === video.category)?.label ?? video.category;
  const thumbUrl = `https://img.youtube.com/vi/${video.youtubeId}/maxresdefault.jpg`;

  const cardVariants: Variants = reduceMotion
    ? { hidden: { opacity: 1 }, show: { opacity: 1 } }
    : {
        hidden: { opacity: 0, y: 30, scale: 0.97 },
        show: {
          opacity: 1,
          y: 0,
          scale: 1,
          transition: { duration: 0.5, delay: index * 0.06, ease: [0.25, 0.46, 0.45, 0.94] },
        },
      };

  return (
    <motion.button
      variants={cardVariants}
      onClick={() => onPlay(video)}
      className={cn(
        "group relative flex flex-col overflow-hidden rounded-2xl border border-[color:var(--color-glass-border)] text-left transition-all duration-300",
        "hover:border-[color:var(--color-glass-border-hover)] hover:shadow-[0_8px_40px_rgba(0,0,0,0.4)]",
        FOCUS_RING,
        video.featured ? "col-span-1 sm:col-span-2 row-span-1" : "col-span-1",
      )}
    >
      {/* Thumbnail */}
      <div className={cn("relative w-full overflow-hidden", video.featured ? "aspect-[16/8]" : "aspect-video")}>
        <Image
          src={thumbUrl}
          alt={video.title}
          fill
          sizes={video.featured ? "(max-width: 640px) 100vw, 66vw" : "(max-width: 640px) 100vw, 33vw"}
          className="object-cover transition-transform duration-500 ease-out group-hover:scale-[1.04]"
        />

        {/* Gradient overlay */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent transition-opacity duration-300 group-hover:from-black/90" />

        {/* Play button */}
        <div className="absolute inset-0 flex items-center justify-center">
          <div
            className={cn(
              "flex items-center justify-center rounded-full border border-white/20 bg-black/40 backdrop-blur-md transition-all duration-300",
              "group-hover:scale-110 group-hover:border-red-500/50 group-hover:bg-red-600/80 group-hover:shadow-[0_0_30px_rgba(220,38,38,0.4)]",
              video.featured ? "h-16 w-16 sm:h-20 sm:w-20" : "h-12 w-12 sm:h-14 sm:w-14",
            )}
          >
            <Play
              className={cn(
                "fill-white text-white transition-transform duration-300 group-hover:scale-110",
                video.featured ? "ml-1 h-6 w-6 sm:h-8 sm:w-8" : "ml-0.5 h-5 w-5 sm:h-6 sm:w-6",
              )}
            />
          </div>
        </div>

        {/* Category pill */}
        <div className="absolute left-3 top-3">
          <span className="rounded-full bg-black/50 px-2.5 py-1 text-[10px] font-semibold uppercase tracking-wider text-white/70 backdrop-blur-sm">
            {categoryLabel}
          </span>
        </div>

        {/* Featured badge */}
        {video.featured && (
          <div className="absolute right-3 top-3">
            <span className="rounded-full bg-red-600/80 px-2.5 py-1 text-[10px] font-bold uppercase tracking-wider text-white backdrop-blur-sm">
              Featured
            </span>
          </div>
        )}

        {/* Title overlay */}
        <div className="absolute inset-x-0 bottom-0 p-4 sm:p-5">
          <h3
            className={cn(
              "font-semibold leading-snug text-white drop-shadow-[0_1px_4px_rgba(0,0,0,0.6)]",
              video.featured ? "text-lg sm:text-xl" : "text-sm sm:text-[15px]",
            )}
          >
            {video.title}
          </h3>
        </div>
      </div>
    </motion.button>
  );
}

/* ─────────────────────── Video Gallery ─────────────────────── */

function VideoGallery({
  videos,
  onPlay,
  reduceMotion,
  activeCategory,
}: {
  videos: readonly VideoItem[];
  onPlay: (video: VideoItem) => void;
  reduceMotion: boolean;
  activeCategory: VideoCategory | "all";
}) {
  return (
    <section
      aria-label="Video gallery"
      className="border-b border-white/6 py-12 sm:py-16 lg:py-20"
      style={{ backgroundColor: "var(--color-company-ink)" }}
    >
      <Container>
        <AnimatePresence mode="wait">
          <motion.div
            key={activeCategory}
            initial={reduceMotion ? false : { opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            exit={reduceMotion ? undefined : { opacity: 0, y: -12 }}
            transition={{ duration: 0.25, ease: "easeInOut" }}
            className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3"
          >
            {videos.map((video, i) => (
              <VideoCard
                key={video.id}
                video={video}
                index={i}
                onPlay={onPlay}
                reduceMotion={reduceMotion}
              />
            ))}
          </motion.div>
        </AnimatePresence>

        {videos.length === 0 && (
          <div className="py-20 text-center">
            <p className="text-sm text-white/40">No videos in this category yet.</p>
          </div>
        )}
      </Container>
    </section>
  );
}

/* ─────────────────────── Video Modal ─────────────────────── */

function VideoModal({
  video,
  onClose,
  reduceMotion,
}: {
  video: VideoItem | null;
  onClose: () => void;
  reduceMotion: boolean;
}) {
  useEffect(() => {
    if (!video) return;
    const handleKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    document.addEventListener("keydown", handleKey);
    document.body.style.overflow = "hidden";
    return () => {
      document.removeEventListener("keydown", handleKey);
      document.body.style.overflow = "";
    };
  }, [video, onClose]);

  return (
    <AnimatePresence>
      {video && (
        <motion.div
          initial={reduceMotion ? { opacity: 1 } : { opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={reduceMotion ? { opacity: 0 } : { opacity: 0 }}
          transition={{ duration: 0.2 }}
          className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-8"
          role="dialog"
          aria-modal="true"
          aria-label={`Playing: ${video.title}`}
        >
          {/* Backdrop */}
          <motion.div
            initial={reduceMotion ? undefined : { backdropFilter: "blur(0px)" }}
            animate={{ backdropFilter: "blur(12px)" }}
            exit={reduceMotion ? undefined : { backdropFilter: "blur(0px)" }}
            className="absolute inset-0 bg-black/85"
            onClick={onClose}
          />

          {/* Content */}
          <motion.div
            initial={reduceMotion ? { opacity: 1 } : { opacity: 0, scale: 0.92, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={reduceMotion ? { opacity: 0 } : { opacity: 0, scale: 0.95, y: 10 }}
            transition={{ duration: 0.3, ease: [0.25, 0.46, 0.45, 0.94] }}
            className="relative z-10 w-full max-w-5xl"
          >
            {/* Close button */}
            <button
              onClick={onClose}
              className={cn(
                "absolute -top-12 right-0 flex h-9 w-9 items-center justify-center rounded-full border border-[color:var(--color-glass-border-hover)] bg-[color:var(--color-glass-bg)] text-white/60 transition-colors hover:bg-[color:var(--color-glass-bg-hover)] hover:text-white",
                FOCUS_RING,
              )}
              aria-label="Close video"
            >
              <X className="h-5 w-5" />
            </button>

            {/* Video title */}
            <p className="absolute -top-12 left-0 truncate text-sm font-medium text-white/50">
              {video.title}
            </p>

            {/* Iframe container */}
            <div className="relative overflow-hidden rounded-xl border border-[color:var(--color-glass-border)] shadow-[0_20px_80px_rgba(0,0,0,0.6)]">
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
      )}
    </AnimatePresence>
  );
}

/* ─────────────────────── YouTube CTA ─────────────────────── */

function YouTubeCta({ reduceMotion }: { reduceMotion: boolean }) {
  const thumbnails = SSP_VIDEOS.slice(0, 6);

  const reveal: Variants = reduceMotion
    ? { hidden: { opacity: 1 }, show: { opacity: 1 } }
    : { hidden: { opacity: 0, y: 20 }, show: { opacity: 1, y: 0, transition: { duration: 0.5, ease: "easeOut" } } };

  return (
    <section
      aria-label="YouTube channel"
      className="relative overflow-hidden py-16 sm:py-20 lg:py-24"
      style={{ backgroundColor: "var(--color-company-ink)" }}
    >
      {/* Ambient glow */}
      <div className="pointer-events-none absolute inset-0" aria-hidden>
        <div className="absolute left-1/2 top-1/2 h-[600px] w-[800px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-red-600/[0.04] blur-[120px]" />
      </div>

      <Container className="relative z-10">
        <motion.div
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, amount: 0.3 }}
          variants={reveal}
          className="mx-auto max-w-3xl"
        >
          {/* Flowing thumbnails collage */}
          <div className="mb-8 flex justify-center gap-2 sm:gap-3">
            {thumbnails.map((v, i) => (
              <div
                key={v.id}
                className={cn(
                  "relative overflow-hidden rounded-lg border border-[color:var(--color-glass-border)] opacity-60 transition-opacity hover:opacity-90",
                  i % 2 === 0 ? "translate-y-2" : "-translate-y-2",
                )}
                style={{ width: `${100 / thumbnails.length - 1}%`, maxWidth: 120 }}
              >
                <div className="relative aspect-video">
                  <Image
                    src={`https://img.youtube.com/vi/${v.youtubeId}/mqdefault.jpg`}
                    alt=""
                    fill
                    sizes="120px"
                    className="object-cover"
                  />
                </div>
              </div>
            ))}
          </div>

          {/* Glass card */}
          <div className="relative overflow-hidden rounded-2xl border border-[color:var(--color-glass-border)] bg-[color:var(--color-glass-bg)] p-8 text-center backdrop-blur-sm sm:p-10 lg:p-12">
            {/* Inner glow */}
            <div
              className="pointer-events-none absolute inset-0"
              style={{
                background: "radial-gradient(ellipse at 50% 0%, rgba(220,38,38,0.08) 0%, transparent 60%)",
              }}
              aria-hidden
            />

            <div className="relative z-10">
              <div className="mx-auto mb-5 flex h-14 w-14 items-center justify-center rounded-2xl border border-red-500/20 bg-red-600/10">
                <Youtube className="h-7 w-7 text-red-500" />
              </div>

              <h2 className="text-2xl font-bold tracking-tight text-white sm:text-3xl">
                See More on YouTube
              </h2>
              <p className="mx-auto mt-3 max-w-lg text-[15px] leading-relaxed text-white/50">
                Subscribe to the SSP Group channel for the latest operations footage,
                behind-the-scenes content, and transport highlights.
              </p>

              <a
                href={SSP_YOUTUBE_CHANNEL}
                target="_blank"
                rel="noopener noreferrer"
                className={cn(
                  "mt-7 inline-flex items-center gap-2.5 rounded-xl px-7 py-3.5 text-sm font-semibold transition-all duration-200 hover:-translate-y-[1px] hover:shadow-lg",
                  "bg-red-600 text-white shadow-[0_8px_24px_rgba(220,38,38,0.3)]",
                  FOCUS_RING,
                )}
              >
                Visit SSP on YouTube
                <ExternalLink className="h-4 w-4" />
              </a>
            </div>
          </div>
        </motion.div>
      </Container>
    </section>
  );
}

/* ─────────────────────── Main Page ─────────────────────── */

export function MediaPage() {
  const reduceMotion = useReducedMotion() ?? false;
  const [activeCategory, setActiveCategory] = useState<VideoCategory | "all">("all");
  const [activeVideo, setActiveVideo] = useState<VideoItem | null>(null);

  const filteredVideos =
    activeCategory === "all" ? SSP_VIDEOS : SSP_VIDEOS.filter((v) => v.category === activeCategory);

  const handlePlay = useCallback((video: VideoItem) => setActiveVideo(video), []);
  const handleClose = useCallback(() => setActiveVideo(null), []);

  return (
    <main>
      <Hero reduceMotion={reduceMotion} />
      <CategoryFilter active={activeCategory} onChange={setActiveCategory} />
      <VideoGallery
        videos={filteredVideos}
        onPlay={handlePlay}
        reduceMotion={reduceMotion}
        activeCategory={activeCategory}
      />
      <VideoModal video={activeVideo} onClose={handleClose} reduceMotion={reduceMotion} />
      <YouTubeCta reduceMotion={reduceMotion} />
    </main>
  );
}
