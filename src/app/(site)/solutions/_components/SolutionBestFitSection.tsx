"use client";

import Image from "next/image";
import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import { motion, useReducedMotion, type Variants } from "framer-motion";
import { Container } from "@/app/(site)/components/layout/Container";
import { SectionSignalEyebrow } from "@/app/(site)/components/ui/SectionSignalEyebrow";
import type { SolutionFamilyPageData } from "@/config/solutionPages";

type Props = {
  section: SolutionFamilyPageData["bestFitProfiles"];
  scrollMarginTop?: number;
};

const NOISE_TEXTURE =
  "url(\"data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)' opacity='1'/%3E%3C/svg%3E\")";

const PANEL_SURFACE_BACKGROUND =
  "linear-gradient(180deg, var(--color-surface-0-light) 0%, color-mix(in srgb, var(--color-surface-0-light) 78%, white) 56%, var(--color-surface-1-light) 100%)";
const IMAGE_PANEL_BACKGROUND =
  "linear-gradient(180deg, var(--color-company-hero-midnight-start) 0%, var(--color-company-ink) 100%)";

type BestFitProfileKey =
  | "dry-van"
  | "flatbed"
  | "step-deck"
  | "rgn-heavy-haul"
  | "conestoga-roll-tite";

type CardMedia = {
  src: string;
  alt: string;
  objectPosition?: string;
};

const CARD_MEDIA_BY_KEY: Record<BestFitProfileKey, CardMedia> = {
  "dry-van": {
    src: "/_optimized/solution/dryvan/dryvan-Img.png",
    alt: "Dry van trailer profile",
    objectPosition: "58% 48%",
  },
  flatbed: {
    src: "/_optimized/solution/flatbed/flatbed-Img.png",
    alt: "Flatbed truckload profile",
    objectPosition: "54% 54%",
  },
  "step-deck": {
    src: "/_optimized/solution/stepdeck/stepdeck-Img.png",
    alt: "Step deck truckload profile",
    objectPosition: "56% 42%",
  },
  "rgn-heavy-haul": {
    src: "/_optimized/solution/rgnheavyhaul/rgn-Img.png",
    alt: "RGN heavy haul profile",
    objectPosition: "50% 58%",
  },
  "conestoga-roll-tite": {
    src: "/_optimized/solution/conestoga/conestoga-Img.png",
    alt: "Conestoga roll-tite profile",
    objectPosition: "50% 52%",
  },
};

type SliceConfig = {
  textFraction: string;
  imageFraction: string;
  slideFrom: "left" | "right";
  imageOnRight: boolean;
};

const SLICE_CONFIG_BY_KEY: Record<BestFitProfileKey, SliceConfig> = {
  "dry-van": {
    textFraction: "minmax(0,0.60fr)",
    imageFraction: "minmax(0,0.40fr)",
    slideFrom: "left",
    imageOnRight: true,
  },
  flatbed: {
    textFraction: "minmax(0,0.58fr)",
    imageFraction: "minmax(0,0.42fr)",
    slideFrom: "right",
    imageOnRight: false,
  },
  "step-deck": {
    textFraction: "minmax(0,0.60fr)",
    imageFraction: "minmax(0,0.40fr)",
    slideFrom: "left",
    imageOnRight: true,
  },
  "rgn-heavy-haul": {
    textFraction: "minmax(0,0.62fr)",
    imageFraction: "minmax(0,0.38fr)",
    slideFrom: "right",
    imageOnRight: false,
  },
  "conestoga-roll-tite": {
    textFraction: "minmax(0,0.60fr)",
    imageFraction: "minmax(0,0.40fr)",
    slideFrom: "left",
    imageOnRight: true,
  },
};

function isBestFitProfileKey(key: string): key is BestFitProfileKey {
  return key in CARD_MEDIA_BY_KEY && key in SLICE_CONFIG_BY_KEY;
}

function getBestFitProfilePresentation(key: string) {
  if (!isBestFitProfileKey(key)) {
    throw new Error(`Missing best-fit presentation config for profile key: ${key}`);
  }

  return {
    media: CARD_MEDIA_BY_KEY[key],
    config: SLICE_CONFIG_BY_KEY[key],
  };
}

export function SolutionBestFitSection({ section, scrollMarginTop }: Props) {
  const reduced = useReducedMotion() ?? false;
  const headingId = "solution-best-fit-heading";

  const fadeUp: Variants = reduced
    ? { hidden: { opacity: 1, y: 0 }, show: { opacity: 1, y: 0 } }
    : { hidden: { opacity: 1, y: 10 }, show: { opacity: 1, y: 0 } };

  return (
    <section
      id="solution-best-fit"
      aria-labelledby={headingId}
      className="relative overflow-hidden bg-[linear-gradient(138deg,var(--color-company-hero-midnight-start)_0%,var(--color-company-ink)_56%,var(--color-company-hero-midnight-end)_100%)]"
      style={scrollMarginTop ? { scrollMarginTop } : undefined}
    >
      <div className="pointer-events-none absolute inset-0" aria-hidden>
        <div className="absolute inset-0 bg-[radial-gradient(46%_52%_at_86%_16%,rgba(16,167,216,0.14),transparent_72%)]" />
        <div className="absolute inset-0 bg-[radial-gradient(36%_40%_at_0%_100%,rgba(215,25,32,0.07),transparent_72%)]" />
        <div
          className="absolute inset-0 opacity-[0.015]"
          style={{ backgroundImage: NOISE_TEXTURE }}
        />
      </div>

      <Container className="site-page-container relative py-16 sm:py-20 lg:py-24">
        <motion.div
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, amount: 0.15 }}
        >
          <motion.div
            variants={fadeUp}
            transition={{ duration: reduced ? 0 : 0.35, ease: "easeOut" }}
            className="max-w-[46rem]"
          >
            <SectionSignalEyebrow label={section.eyebrow} light />
            <h2
              id={headingId}
              className="mt-4 max-w-[18ch] text-[2rem] font-bold leading-[1.08] tracking-tight text-white sm:text-[2.45rem]"
            >
              {section.title}
            </h2>
            <p className="mt-4 max-w-[64ch] text-[15px] leading-[1.85] text-white/74 sm:text-[15.5px]">
              {section.description}
            </p>
          </motion.div>
        </motion.div>

        {/* ── Poster shell ── */}
        <div className="mt-10 flex flex-col gap-3 sm:mt-12 sm:gap-4 lg:gap-0 lg:overflow-hidden lg:rounded-md lg:shadow-[0_32px_80px_rgba(2,8,20,0.5)]">
          {section.items.map((item, index) => {
            const { media, config } = getBestFitProfilePresentation(item.key);
            const isFirst = index === 0;
            const isLast = index === section.items.length - 1;

            const slideVariants: Variants = reduced
              ? { hidden: { opacity: 1, x: 0 }, show: { opacity: 1, x: 0 } }
              : {
                  hidden: {
                    opacity: 1,
                    x: config.slideFrom === "left" ? -60 : 60,
                  },
                  show: { opacity: 1, x: 0 },
                };

            const gridTemplate = config.imageOnRight
              ? `${config.textFraction} ${config.imageFraction}`
              : `${config.imageFraction} ${config.textFraction}`;

            return (
              <motion.div
                key={item.key}
                initial="hidden"
                whileInView="show"
                viewport={{ once: true, amount: 0.15 }}
                variants={slideVariants}
                transition={{
                  duration: reduced ? 0 : 0.38,
                  ease: [0.22, 1, 0.36, 1],
                  delay: reduced ? 0 : isFirst ? 0.08 : 0,
                }}
              >
                <Link
                  href={item.href}
                  className={`group relative block overflow-hidden rounded-md border border-white/10 bg-white/[0.02] shadow-[0_18px_38px_rgba(2,8,20,0.18)] transition duration-300 hover:bg-white/[0.03] focus:outline-none focus-visible:ring-2 focus-visible:ring-[color:var(--color-brand-500)] focus-visible:ring-offset-2 focus-visible:ring-offset-[color:var(--color-company-ink)] lg:rounded-none lg:border-0 lg:border-b lg:border-white/10 lg:bg-transparent lg:shadow-none lg:hover:bg-white/[0.02] lg:last:border-b-0 ${
                    isFirst ? "lg:rounded-t-md" : ""
                  } ${isLast ? "lg:rounded-b-md" : ""}`}
                >
                  {/* ── Desktop: side-by-side ── */}
                  <div
                    className="hidden lg:grid"
                    style={{ gridTemplateColumns: gridTemplate }}
                  >
                    {config.imageOnRight ? (
                      <>
                        <SliceTextPanel item={item} seamSide="right" />
                        <SliceImagePanel
                          media={media}
                          item={item}
                          fadeDirection="right"
                          seamSide="left"
                        />
                      </>
                    ) : (
                      <>
                        <SliceImagePanel
                          media={media}
                          item={item}
                          fadeDirection="left"
                          seamSide="right"
                        />
                        <SliceTextPanel item={item} seamSide="left" />
                      </>
                    )}
                  </div>

                  {/* ── Tablet: balanced split layout ── */}
                  <div className="hidden md:grid md:grid-cols-2 lg:hidden">
                    {config.imageOnRight ? (
                      <>
                        <SliceTextPanel item={item} />
                        <SliceImagePanel media={media} item={item} fadeDirection="right" />
                      </>
                    ) : (
                      <>
                        <SliceImagePanel media={media} item={item} fadeDirection="left" />
                        <SliceTextPanel item={item} />
                      </>
                    )}
                  </div>

                  {/* ── Mobile: stacked ── */}
                  <div className="md:hidden">
                    <SliceImagePanel media={media} item={item} fadeDirection="right" mobile />
                    <SliceTextPanel item={item} mobile />
                  </div>
                </Link>
              </motion.div>
            );
          })}
        </div>
      </Container>
    </section>
  );
}

type SliceItem = SolutionFamilyPageData["bestFitProfiles"]["items"][number];

function SliceTextPanel({
  item,
  mobile,
  seamSide,
}: {
  item: SliceItem;
  mobile?: boolean;
  seamSide?: "left" | "right";
}) {
  return (
    <div
      className={`relative z-10 isolate flex flex-col justify-center overflow-hidden ${
        mobile
          ? "px-5 py-5 sm:px-6 sm:py-6"
          : seamSide === "right"
            ? "px-6 py-6 pr-12 xl:px-8 xl:py-7 xl:pr-16"
            : seamSide === "left"
              ? "px-6 py-6 pl-12 xl:px-8 xl:py-7 xl:pl-16"
              : "px-6 py-6 xl:px-8 xl:py-7"
      }`}
      style={{ background: PANEL_SURFACE_BACKGROUND }}
    >
      <div
        className="pointer-events-none absolute inset-[1px] rounded-[inherit] border border-[color:var(--color-border-light)]/70"
        aria-hidden
      />
      <div
        className="pointer-events-none absolute right-[-8%] top-[-18%] h-28 w-28 rounded-full opacity-[0.12] blur-[58px]"
        aria-hidden
        style={{ backgroundColor: item.accent }}
      />

      <div className="relative z-10 flex items-center gap-3">
        <span
          className="h-px w-11 shrink-0"
          style={{
            background: `linear-gradient(90deg, ${item.accent}, color-mix(in srgb, ${item.accent} 18%, transparent))`,
          }}
          aria-hidden
        />
        <span
          className="text-[10px] font-semibold tracking-[0.22em] uppercase"
          style={{
            color: `color-mix(in srgb, ${item.accent} 82%, var(--color-text-light))`,
          }}
        >
          {item.label}
        </span>
      </div>

      <h3 className="relative z-10 mt-4 max-w-[24ch] text-[1.26rem] font-semibold leading-[1.03] tracking-[-0.025em] text-[color:var(--color-text-light)] sm:text-[1.34rem] lg:text-[1.5rem]">
        {item.title}
      </h3>

      <p className="relative z-10 mt-3 max-w-[48ch] text-[13.2px] leading-[1.72] text-[color:var(--color-muted-light)] lg:text-[13.6px]">
        {item.description}
      </p>

      <div className="relative z-10 mt-4 border-t border-[color:var(--color-border-light)]/90 pt-3">
        <div className="flex flex-col gap-3 sm:gap-3.5 lg:grid lg:grid-cols-[minmax(0,1fr)_auto] lg:items-end lg:gap-5">
          <div>
            <div className="text-[9px] font-semibold tracking-[0.18em] text-[color:var(--color-subtle)] uppercase">
              Best fit
            </div>
            <p className="mt-1.5 max-w-[42ch] text-[12.4px] leading-[1.52] text-[color:var(--color-muted-light)]">
              {item.bestFor}
            </p>
          </div>

          <div className="lg:self-end">
            <div
              className="group/cta relative inline-flex w-fit items-center gap-2 pb-0.5 text-[12.2px] font-semibold tracking-[0.01em] transition-colors duration-200 after:absolute after:bottom-0 after:left-0 after:h-px after:w-[calc(100%-1.2rem)] after:origin-left after:scale-x-0 after:bg-current after:transition-transform after:duration-200 group-hover:after:scale-x-100 group-focus-visible:after:scale-x-100"
              style={{ color: item.accent }}
            >
              <span className="transition-colors duration-200">
                Explore profile
              </span>
              <ArrowUpRight className="h-3.5 w-3.5 transition-transform duration-200 motion-safe:group-hover/cta:translate-x-[1px] motion-safe:group-hover/cta:-translate-y-[1px] motion-safe:group-focus-visible:translate-x-[1px] motion-safe:group-focus-visible:-translate-y-[1px]" />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

function SliceImagePanel({
  media,
  item,
  fadeDirection,
  mobile,
  seamSide,
}: {
  media: { src: string; alt: string; objectPosition?: string };
  item: SliceItem;
  fadeDirection: "left" | "right";
  mobile?: boolean;
  seamSide?: "left" | "right";
}) {
  return (
    <div
      className={`relative z-20 overflow-hidden ${
        mobile
          ? "aspect-[16/10] min-h-[210px] sm:min-h-[230px]"
          : "h-full min-h-[240px] xl:min-h-[256px]"
      }`}
      style={
        !mobile && seamSide === "left"
          ? {
              background: IMAGE_PANEL_BACKGROUND,
              marginLeft: "-34px",
              clipPath: "polygon(34px 0, 100% 0, 100% 100%, 0 100%)",
            }
          : !mobile && seamSide === "right"
            ? {
                background: IMAGE_PANEL_BACKGROUND,
                marginRight: "-34px",
                clipPath: "polygon(0 0, 100% 0, calc(100% - 34px) 100%, 0 100%)",
              }
            : { background: IMAGE_PANEL_BACKGROUND }
      }
    >
      <Image
        src={media.src}
        alt={media.alt}
        fill
        sizes={
          mobile
            ? "(min-width: 640px) 92vw, 100vw"
            : "(min-width: 1440px) 34vw, (min-width: 1280px) 36vw, (min-width: 1024px) 39vw, 100vw"
        }
        className="object-cover transition-transform duration-500 ease-out group-hover:scale-[1.04]"
        style={
          media.objectPosition
            ? { objectPosition: media.objectPosition }
            : undefined
        }
      />
      <div
        className="absolute inset-0"
        aria-hidden
        style={{
          background:
            fadeDirection === "right"
              ? `linear-gradient(270deg, rgba(6,18,31,0.06) 0%, rgba(6,18,31,0.22) 100%), radial-gradient(circle at 82% 50%, color-mix(in srgb, ${item.accent} 14%, transparent), transparent 52%)`
              : `linear-gradient(90deg, rgba(6,18,31,0.06) 0%, rgba(6,18,31,0.22) 100%), radial-gradient(circle at 18% 50%, color-mix(in srgb, ${item.accent} 14%, transparent), transparent 52%)`,
        }}
      />
      <div
        className="absolute inset-x-0 top-0 h-[2px]"
        aria-hidden
        style={{
          background: `linear-gradient(90deg, color-mix(in srgb, ${item.accent} 80%, #fff), ${item.accent})`,
          opacity: 0.85,
        }}
      />
    </div>
  );
}
