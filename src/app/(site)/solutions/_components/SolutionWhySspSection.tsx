"use client";

import Image from "next/image";
import { motion, useReducedMotion, type Variants } from "framer-motion";
import { Container } from "@/app/(site)/components/layout/Container";
import { SectionSignalEyebrow } from "@/app/(site)/components/ui/SectionSignalEyebrow";
import type { SolutionFamilyPageData } from "@/config/solutionPages";

type SolutionWhySspSectionProps = {
  section: SolutionFamilyPageData["whySsp"];
  accent: string;
};

type SolutionWhySspPoint = SolutionFamilyPageData["whySsp"]["points"][number];

const DESKTOP_ROW_STAGGER = [
  "[--row-pl:0%] sm:[--row-pl:14%] md:[--row-pl:20%] lg:[--row-pl:29%]",
  "[--row-pl:2.5%] sm:[--row-pl:18%] md:[--row-pl:28%] lg:[--row-pl:42%]",
  "[--row-pl:1%] sm:[--row-pl:15%] md:[--row-pl:21%] lg:[--row-pl:30%]",
] as const;

const SECTION_NOISE_TEXTURE =
  "url(\"data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)' opacity='1'/%3E%3C/svg%3E\")";
const ROAD_SURFACE_BACKGROUND =
  "linear-gradient(180deg, color-mix(in srgb, var(--color-company-hero-midnight-end) 68%, var(--color-company-ink)) 0%, var(--color-company-ink) 40%, color-mix(in srgb, var(--color-ssp-ink-800) 86%, black) 100%)";
const MOBILE_ROAD_SURFACE_BACKGROUND =
  "linear-gradient(90deg, color-mix(in srgb, var(--color-company-hero-midnight-end) 68%, var(--color-company-ink)) 0%, var(--color-company-ink) 40%, color-mix(in srgb, var(--color-ssp-ink-800) 86%, black) 100%)";
const ROAD_CHROME_BACKGROUND =
  "linear-gradient(160deg, color-mix(in srgb, white 28%, var(--color-company-ink)) 0%, color-mix(in srgb, white 16%, var(--color-company-ink)) 28%, color-mix(in srgb, white 10%, var(--color-company-ink)) 56%, color-mix(in srgb, white 6%, var(--color-company-ink)) 100%)";
const ROAD_CHROME_HIGHLIGHT =
  "radial-gradient(ellipse 60% 40% at 28% 18%, rgba(255,255,255,0.18), transparent 70%)";
const ROAD_CHROME_SECONDARY_HIGHLIGHT =
  "radial-gradient(ellipse 50% 30% at 75% 82%, rgba(255,255,255,0.06), transparent 60%)";
const ROAD_DARK_CORE_BACKGROUND =
  "linear-gradient(180deg, color-mix(in srgb, var(--color-company-ink) 88%, black) 0%, color-mix(in srgb, var(--color-ssp-ink-800) 94%, black) 100%)";
const ROAD_DARK_CORE_HIGHLIGHT =
  "radial-gradient(ellipse 55% 35% at 30% 15%, rgba(255,255,255,0.08), transparent 60%)";
const MOBILE_ROAD_MASK =
  "linear-gradient(180deg, transparent 0, rgba(0,0,0,0.34) 14px, #000 34px, #000 calc(100% - 34px), rgba(0,0,0,0.34) calc(100% - 14px), transparent 100%)";

function getDesktopRowStagger(index: number) {
  switch (index) {
    case 0:
      return DESKTOP_ROW_STAGGER[0];
    case 1:
      return DESKTOP_ROW_STAGGER[1];
    default:
      return DESKTOP_ROW_STAGGER[2];
  }
}

type WhySspMedallionProps = {
  point: SolutionWhySspPoint;
  accent: string;
  sizeClassName: string;
  chromeInsetClassName: string;
  darkInsetClassName: string;
  coreInsetClassName: string;
  imageSizes: string;
  imagePaddingClassName: string;
  chromeShadowClassName: string;
  showSecondaryChromeHighlight?: boolean;
  showInnerDarkBorder?: boolean;
};

function WhySspMedallion({
  point,
  accent,
  sizeClassName,
  chromeInsetClassName,
  darkInsetClassName,
  coreInsetClassName,
  imageSizes,
  imagePaddingClassName,
  chromeShadowClassName,
  showSecondaryChromeHighlight = false,
  showInnerDarkBorder = false,
}: WhySspMedallionProps) {
  return (
    <div className={`relative z-10 flex-shrink-0 ${sizeClassName}`}>
      <div
        className="absolute inset-0 rounded-full"
        style={{
          border: `1.5px dashed color-mix(in srgb, ${accent} 28%, #bcc4ce)`,
        }}
      />
      <div
        className={`absolute overflow-hidden rounded-full ${chromeInsetClassName} ${chromeShadowClassName}`}
        style={{ background: ROAD_CHROME_BACKGROUND }}
      >
        <div
          className="absolute inset-0 rounded-full"
          style={{ background: ROAD_CHROME_HIGHLIGHT }}
        />
        {showSecondaryChromeHighlight ? (
          <div
            className="absolute inset-0 rounded-full"
            style={{ background: ROAD_CHROME_SECONDARY_HIGHLIGHT }}
          />
        ) : null}
        <div className="absolute inset-[2px] rounded-full border border-white/[0.08]" />
      </div>
      <div
        className={`absolute rounded-full ${darkInsetClassName}`}
        style={{
          background: ROAD_DARK_CORE_BACKGROUND,
          boxShadow:
            "inset 0 1px 2px rgba(255,255,255,0.06), 0 0 0 1px rgba(255,255,255,0.04)",
        }}
      >
        <div
          className="absolute inset-0 rounded-full"
          style={{ background: ROAD_DARK_CORE_HIGHLIGHT }}
        />
        {showInnerDarkBorder ? (
          <div className="absolute inset-[2px] rounded-full border border-white/[0.03]" />
        ) : null}
      </div>
      <div
        className={`absolute rounded-full border border-gray-200/60 bg-white shadow-[0_8px_24px_rgba(0,0,0,0.1)] ${coreInsetClassName}`}
      >
        {point.imageSrc ? (
          <div className="relative h-full w-full overflow-hidden rounded-full">
            <Image
              src={point.imageSrc}
              alt={point.imageAlt ?? point.title}
              fill
              sizes={imageSizes}
              className={`object-contain ${imagePaddingClassName}`}
            />
          </div>
        ) : null}
      </div>
    </div>
  );
}

export function SolutionWhySspSection({
  section,
  accent,
}: SolutionWhySspSectionProps) {
  const reduced = useReducedMotion() ?? false;
  const points = section.points;
  const headingId = "solution-why-ssp-heading";

  const fadeUp: Variants = reduced
    ? { hidden: { opacity: 1, y: 0 }, show: { opacity: 1, y: 0 } }
    : { hidden: { opacity: 1, y: 10 }, show: { opacity: 1, y: 0 } };

  const roadGrow: Variants = reduced
    ? { hidden: { scaleX: 1, opacity: 1 }, show: { scaleX: 1, opacity: 1 } }
    : { hidden: { scaleX: 0, opacity: 1 }, show: { scaleX: 1, opacity: 1 } };

  return (
    <section
      id="solution-why-ssp"
      aria-labelledby={headingId}
      className="relative overflow-hidden border-y border-[color:var(--color-border-light-soft)] bg-[linear-gradient(180deg,var(--color-surface-0-light)_0%,var(--color-surface-1-light)_52%,color-mix(in_srgb,var(--color-surface-1-light)_82%,var(--color-surface-2-light))_100%)]"
    >
      {/* Noise texture for subtle paper-like depth */}
      <div className="pointer-events-none absolute inset-0" aria-hidden>
        <div className="absolute inset-0 bg-[radial-gradient(42%_38%_at_82%_14%,rgba(15,23,42,0.016),transparent_70%)]" />
        <div className="absolute inset-0 bg-[radial-gradient(28%_30%_at_8%_88%,rgba(15,23,42,0.012),transparent_72%)]" />
        <div
          className="absolute inset-0 opacity-[0.018]"
          style={{
            backgroundImage: SECTION_NOISE_TEXTURE,
          }}
        />
      </div>

      <Container className="site-page-container relative py-16 sm:py-22 lg:py-28">
        <h2 id={headingId} className="sr-only">
          {section.eyebrow}
        </h2>
        <motion.div
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, amount: 0.15 }}
        >
          <motion.div
            variants={fadeUp}
            transition={{ duration: reduced ? 0 : 0.35, ease: "easeOut" }}
            className="flex justify-center"
          >
            <SectionSignalEyebrow label={section.eyebrow} />
          </motion.div>

          {/* ── Mobile: medallions on road, quiet premium cards ── */}
          <div className="mt-12 sm:hidden">
            <div className="relative">
              <div
                className="pointer-events-none absolute bottom-[10px] left-[34px] top-[10px] w-[15px]"
                aria-hidden
                style={{
                  background: MOBILE_ROAD_SURFACE_BACKGROUND,
                  boxShadow: "2px 0 12px rgba(2,6,23,0.14), -1px 0 0 rgba(0,0,0,0.18)",
                  borderRadius: "9999px",
                  WebkitMaskImage: MOBILE_ROAD_MASK,
                  maskImage: MOBILE_ROAD_MASK,
                }}
              >
                <div className="absolute inset-x-[2px] inset-y-0 rounded-full border border-white/[0.06]" />
                <div
                  className="absolute inset-y-0 left-1/2 w-px -translate-x-1/2"
                  style={{
                    background:
                      "repeating-linear-gradient(180deg, rgba(255,255,255,0.6) 0 10px, transparent 10px 20px)",
                  }}
                />
                <div className="absolute inset-y-0 left-0 w-px bg-[linear-gradient(180deg,rgba(255,255,255,0.14),rgba(255,255,255,0.06))]" />
                <div className="absolute inset-y-0 right-0 w-px bg-[linear-gradient(180deg,rgba(0,0,0,0.14),rgba(0,0,0,0.1))]" />
              </div>

              <div className="space-y-8">
                {points.map((point, index) => (
                  <motion.article
                    key={point.title}
                    variants={fadeUp}
                    transition={{
                      duration: reduced ? 0 : 0.35,
                      ease: "easeOut",
                      delay: reduced ? 0 : index * 0.08,
                    }}
                    className="relative min-h-[104px]"
                  >
                    <div className="absolute inset-y-[7px] left-[50px] right-0 rounded-[22px] border border-white/80 bg-white/88 shadow-[0_18px_42px_rgba(15,23,42,0.08)] backdrop-blur-[2px]" />

                    <div className="relative flex items-center">
                      <WhySspMedallion
                        point={point}
                        accent={accent}
                        sizeClassName="h-[92px] w-[92px]"
                        chromeInsetClassName="inset-[7px]"
                        darkInsetClassName="inset-[17px]"
                        coreInsetClassName="inset-[19px]"
                        imageSizes="52px"
                        imagePaddingClassName="p-[3%]"
                        chromeShadowClassName="shadow-[0_16px_34px_rgba(2,6,23,0.24)]"
                      />

                      <div className="relative z-10 min-w-0 flex-1 pl-5 pr-5 py-5">
                        <div className="flex items-start gap-2.5">
                          <span className="pt-0.5 text-[1.8rem] leading-none font-semibold italic tracking-[-0.04em] text-[color:var(--color-text-light)]/10">
                            {`0${index + 1}`}
                          </span>
                          <div className="min-w-0">
                            <h3 className="text-[1.03rem] font-bold leading-[1.18] tracking-[-0.015em] text-[color:var(--color-text-light)]">
                              {point.title}
                            </h3>
                            <p className="mt-2.5 text-[13.2px] leading-[1.72] text-[color:var(--color-muted-light)]">
                              {point.body}
                            </p>
                          </div>
                        </div>
                      </div>
                    </div>
                  </motion.article>
                ))}
              </div>
            </div>
          </div>

          <div className="mt-14 hidden space-y-16 sm:block lg:mt-16 lg:space-y-20">
            {points.map((point, index) => {
              return (
                <div
                  key={point.title}
                  className={`group/row relative [--cr:55px] md:[--cr:65px] ${getDesktopRowStagger(index)}`}
                  style={{ paddingLeft: "var(--row-pl)" }}
                >
                  {/* ── Road ── */}
                  <motion.div
                    variants={roadGrow}
                    transition={{
                      duration: reduced ? 0 : 0.38,
                      ease: [0.22, 1, 0.36, 1],
                      delay: reduced ? 0 : index * 0.12,
                    }}
                    className="absolute top-1/2 h-[18px] -translate-y-1/2 md:h-[20px]"
                    style={{
                      left: "calc(50% - 50vw)",
                      right: "calc(100% - var(--row-pl) - var(--cr) + 12px)",
                      transformOrigin: "left center",
                      background: ROAD_SURFACE_BACKGROUND,
                      boxShadow: "0 6px 18px rgba(2,6,23,0.16), 0 1px 0 rgba(0,0,0,0.22)",
                      borderRadius: "0 9999px 9999px 0",
                    }}
                  >
                    <div
                      className="absolute inset-x-0 top-0 h-px"
                      style={{
                        borderRadius: "0 9999px 9999px 0",
                        background:
                          "linear-gradient(90deg, transparent 20%, rgba(255,255,255,0.13) 50%, rgba(255,255,255,0.08) 100%)",
                      }}
                    />
                    <div
                      className="absolute inset-x-0 bottom-0 h-px"
                      style={{
                        borderRadius: "0 9999px 9999px 0",
                        background:
                          "linear-gradient(90deg, transparent 20%, rgba(0,0,0,0.18) 60%, rgba(0,0,0,0.12) 100%)",
                      }}
                    />
                    <div
                      className="absolute inset-y-[2px] left-0 right-0 border border-white/[0.06]"
                      style={{ borderRadius: "0 9999px 9999px 0" }}
                    />
                    <div
                      className="absolute left-0 right-0 top-1/2 h-px -translate-y-1/2"
                      style={{
                        background:
                          "repeating-linear-gradient(90deg, rgba(255,255,255,0.62) 0 10px, transparent 10px 20px)",
                      }}
                    />
                    <div
                      className="absolute right-1.5 top-1/2 h-[3px] w-[44px] -translate-y-1/2 rounded-full blur-[2px]"
                      style={{ backgroundColor: accent, opacity: 0.7 }}
                    />
                  </motion.div>

                  <div className="relative z-10 flex items-center">
                    <motion.div
                      variants={fadeUp}
                      transition={{
                        duration: reduced ? 0 : 0.38,
                        ease: [0.22, 1, 0.36, 1],
                        delay: reduced ? 0 : 0.1 + index * 0.12,
                      }}
                      className="relative"
                    >
                      <WhySspMedallion
                        point={point}
                        accent={accent}
                        sizeClassName="h-[110px] w-[110px] md:h-[130px] md:w-[130px]"
                        chromeInsetClassName="inset-[10px] md:inset-[12px]"
                        darkInsetClassName="inset-[23px] md:inset-[26px]"
                        coreInsetClassName="inset-[27px] md:inset-[31px]"
                        imageSizes="72px"
                        imagePaddingClassName="p-[4%]"
                        chromeShadowClassName="shadow-[0_16px_40px_rgba(2,6,23,0.24)]"
                        showSecondaryChromeHighlight
                        showInnerDarkBorder
                      />
                    </motion.div>

                    <motion.div
                      variants={fadeUp}
                      transition={{
                        duration: reduced ? 0 : 0.35,
                        ease: "easeOut",
                        delay: reduced ? 0 : 0.18 + index * 0.12,
                      }}
                      className="relative flex min-w-0 flex-1 items-start"
                    >
                      <div className="pointer-events-none absolute left-0 top-1/2 -translate-y-1/2" aria-hidden>
                        <div
                          className="h-px"
                          style={{
                            width: "clamp(48px, 8vw, 100px)",
                            background: `linear-gradient(90deg, color-mix(in srgb, ${accent} 24%, #c0c8d2), color-mix(in srgb, ${accent} 10%, #d8dde4))`,
                            opacity: 0.75,
                          }}
                        />
                      </div>
                      <div
                        className="pointer-events-none absolute top-1/2 h-[5px] w-[5px] -translate-y-1/2 rounded-full transition-transform duration-300 group-hover/row:scale-125"
                        style={{
                          left: 14,
                          backgroundColor: `color-mix(in srgb, ${accent} 50%, #8892a0)`,
                        }}
                        aria-hidden
                      />
                      <div className="relative z-10 flex-shrink-0 pl-5 pr-3 md:pl-6 md:pr-4">
                        <span className="block text-[2.8rem] leading-none font-semibold italic tracking-[-0.04em] text-[color:var(--color-text-light)]/8 md:text-[3.4rem]">
                          {`0${index + 1}`}
                        </span>
                      </div>
                      <div className="relative z-10 min-w-0 pt-1">
                        <h3 className="text-[1.25rem] font-extrabold leading-[1.16] tracking-tight text-[color:var(--color-text-light)] md:text-[1.4rem]">
                          {point.title}
                        </h3>
                        <p className="mt-1.5 max-w-[48ch] text-[13.2px] leading-[1.72] text-[color:var(--color-muted-light)] md:text-[13.8px]">
                          {point.body}
                        </p>
                      </div>
                    </motion.div>
                  </div>
                </div>
              );
            })}
          </div>
        </motion.div>
      </Container>
    </section>
  );
}
