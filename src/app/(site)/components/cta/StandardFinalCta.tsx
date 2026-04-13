"use client";

import Link from "next/link";
import type { ReactNode } from "react";
import { motion, useReducedMotion } from "framer-motion";
import { Container } from "@/app/(site)/components/layout/Container";
import { SectionSignalEyebrow } from "@/app/(site)/components/ui/SectionSignalEyebrow";
import { trackCtaClick } from "@/lib/analytics/cta";
import { cn } from "@/lib/cn";

type CtaLink = {
  label: string;
  ctaId?: string;
  href?: string;
  action?: "link" | "live-chat";
};

type StandardFinalCtaData = {
  kicker: string;
  title: string;
  body: string;
  trustSignals?: readonly string[];
  proof?: readonly { label: string; value: string }[];
  ctas: {
    primary: Required<Pick<CtaLink, "label" | "href">> & Pick<CtaLink, "ctaId">;
    secondary: CtaLink;
  };
};

type StandardFinalCtaProps = {
  headingId: string;
  trackingLocation: string;
  data: StandardFinalCtaData;
  variant?: "default" | "safety" | "industry" | "corridor" | "cross-border" | "faq";
  sectionClassName?: string;
  eyebrow?: ReactNode;
  titleClassName?: string;
  bodyClassName?: string;
  accentColor?: string;
  trustSignalAccentColor?: string;
  sectionBgColor?: string;
  sectionBackground?: string;
  orbMainColor?: string;
  orbSecondaryColor?: string;
  showNoise?: boolean;
  leftExtra?: ReactNode;
  microCopy?: string;
};

const DEFAULT_ACCENT = "var(--color-ssp-cyan-500)";
const FOCUS_RING_DARK =
  "focus:outline-none focus-visible:ring-2 focus-visible:ring-white/50 focus-visible:ring-offset-2 focus-visible:ring-offset-[color:var(--color-company-ink)]";

export function StandardFinalCta({
  headingId,
  trackingLocation,
  data,
  variant = "default",
  sectionClassName,
  eyebrow,
  titleClassName,
  bodyClassName,
  accentColor = DEFAULT_ACCENT,
  trustSignalAccentColor,
  sectionBgColor = "var(--color-company-ink)",
  sectionBackground,
  orbMainColor = "rgba(224,43,53,0.1)",
  orbSecondaryColor = "rgba(16,167,216,0.1)",
  showNoise,
  leftExtra,
  microCopy,
}: StandardFinalCtaProps) {
  const variantDefaults: Record<
    NonNullable<StandardFinalCtaProps["variant"]>,
    {
      sectionClassName?: string;
      sectionBgColor?: string;
      sectionBackground?: string;
      accentColor?: string;
      orbMainColor?: string;
      orbSecondaryColor?: string;
      showNoise?: boolean;
    }
  > = {
    default: {},
    safety: {
      sectionClassName: "border-t border-white/8",
      sectionBackground:
        "linear-gradient(135deg, var(--color-company-hero-midnight-start), var(--color-company-ink) 58%, var(--color-company-hero-midnight-end))",
      accentColor: "var(--color-ssp-cyan-500)",
      orbMainColor: "rgba(224,43,53,0.1)",
      orbSecondaryColor: "rgba(16,167,216,0.1)",
      showNoise: true,
    },
    industry: {
      showNoise: true,
    },
    corridor: {
      sectionClassName: "border-t border-[color:var(--color-ssp-ink-800)]/40",
      sectionBackground:
        "linear-gradient(145deg, var(--color-footer-legal-bg), var(--color-ssp-ink-900) 40%, var(--color-ssp-ink-800))",
      showNoise: true,
    },
    "cross-border": {
      sectionClassName: "border-t border-[color:var(--color-ssp-ink-800)]/40",
      sectionBackground:
        "linear-gradient(145deg, var(--color-footer-legal-bg), var(--color-ssp-ink-900) 40%, var(--color-ssp-ink-800))",
      showNoise: true,
    },
    faq: {
      sectionBgColor: "var(--color-company-ink)",
      accentColor: "var(--color-ssp-cyan-500)",
      showNoise: true,
    },
  };

  const preset = variantDefaults[variant];
  const effectiveSectionClassName = sectionClassName ?? preset.sectionClassName;
  const effectiveSectionBgColor =
    sectionBgColor ?? preset.sectionBgColor ?? "var(--color-company-ink)";
  const effectiveSectionBackground = sectionBackground ?? preset.sectionBackground;
  const effectiveAccentColor = accentColor ?? preset.accentColor ?? DEFAULT_ACCENT;
  const effectiveTrustSignalAccentColor = trustSignalAccentColor ?? DEFAULT_ACCENT;
  const effectiveOrbMainColor = orbMainColor ?? preset.orbMainColor ?? "rgba(224,43,53,0.1)";
  const effectiveOrbSecondaryColor =
    orbSecondaryColor ?? preset.orbSecondaryColor ?? "rgba(16,167,216,0.1)";
  const effectiveShowNoise = showNoise ?? preset.showNoise ?? true;

  const reduceMotion = !!useReducedMotion();
  const trustSignals = data.trustSignals ?? [];
  const proof = data.proof ?? [];
  const secondaryIsLiveChat =
    data.ctas.secondary.action === "live-chat" || data.ctas.secondary.href === "#live-chat";

  return (
    <section
      className={cn("relative overflow-hidden py-20 sm:py-24", effectiveSectionClassName)}
      aria-labelledby={headingId}
      style={
        effectiveSectionBackground
          ? { background: effectiveSectionBackground }
          : { backgroundColor: effectiveSectionBgColor }
      }
    >
      {effectiveShowNoise ? (
        <div
          className="pointer-events-none absolute inset-0 opacity-[0.025]"
          style={{
            backgroundImage:
              "url(\"data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E\")",
          }}
          aria-hidden
        />
      ) : null}

      <div className="pointer-events-none absolute inset-0" aria-hidden>
        <div
          className="absolute bottom-[-60px] -left-20 h-[200px] w-[200px] rounded-full blur-[100px]"
          style={{ backgroundColor: effectiveOrbMainColor }}
        />
        <div
          className="absolute top-[-40px] right-[10%] h-[180px] w-[180px] rounded-full blur-[80px]"
          style={{ backgroundColor: effectiveOrbSecondaryColor }}
        />
      </div>

      <div
        className="pointer-events-none absolute inset-x-0 top-0 h-px"
        style={{
          background: `linear-gradient(90deg, transparent 10%, color-mix(in srgb, ${effectiveAccentColor} 35%, transparent) 50%, transparent 90%)`,
        }}
        aria-hidden
      />

      <Container className="site-page-container relative">
        <motion.div
          className="rounded-2xl border border-[color:var(--color-glass-border)] bg-[color:var(--color-glass-bg)] px-5 py-8 backdrop-blur-sm sm:px-8 sm:py-10 md:px-10"
          initial={reduceMotion ? false : { opacity: 0, y: 16 }}
          whileInView={reduceMotion ? undefined : { opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.15 }}
          transition={{ duration: reduceMotion ? 0 : 0.35, ease: "easeOut" }}
        >
          <div className="grid gap-8 lg:grid-cols-12 lg:items-center">
            <div className="lg:col-span-8">
              {eyebrow ?? <SectionSignalEyebrow label={data.kicker} light />}

              <h2
                id={headingId}
                className={cn(
                  "mt-4 text-[1.75rem] leading-[1.1] font-bold tracking-tight text-white sm:text-[2.2rem] lg:text-[2.5rem]",
                  titleClassName,
                )}
              >
                {data.title}
              </h2>

              <p
                className={cn(
                  "mt-3 max-w-2xl text-[14px] leading-[1.8] text-white/55 sm:text-[15px]",
                  bodyClassName,
                )}
              >
                {data.body}
              </p>

              {trustSignals.length > 0 ? (
                <div className="mt-5 hidden flex-wrap gap-2 sm:flex">
                  {trustSignals.map((signal) => (
                    <span
                      key={signal}
                      className="inline-flex items-center gap-2 rounded-full border px-3 py-1 text-xs text-white/68"
                      style={{
                        borderColor: `color-mix(in srgb, ${effectiveTrustSignalAccentColor} 24%, rgba(255,255,255,0.08))`,
                        backgroundColor: `color-mix(in srgb, ${effectiveTrustSignalAccentColor} 6%, transparent)`,
                      }}
                    >
                      <span
                        className="h-1 w-1 rounded-full"
                        style={{ backgroundColor: effectiveTrustSignalAccentColor }}
                        aria-hidden
                      />
                      {signal}
                    </span>
                  ))}
                </div>
              ) : null}

              {leftExtra}
            </div>

            <div className="lg:col-span-4">
              <div className="rounded-xl border border-[color:var(--color-glass-border)] bg-[color:var(--color-glass-bg)] p-5 sm:p-6">
                <p className="text-xs font-semibold tracking-[0.12em] text-white/50 uppercase">
                  {data.kicker}
                </p>

                {proof.length > 0 ? (
                  <div className="mt-4 hidden gap-2 sm:grid sm:grid-cols-3">
                    {proof.map((item) => (
                      <div
                        key={item.label}
                        className="rounded-lg border border-white/6 bg-[color:var(--color-glass-bg)] px-2 py-2 text-center"
                      >
                        <div className="text-[13px] font-semibold tracking-tight text-white/75">
                          {item.value}
                        </div>
                        <div className="mt-0.5 text-[9px] tracking-wider text-white/30 uppercase">
                          {item.label}
                        </div>
                      </div>
                    ))}
                  </div>
                ) : null}

                {microCopy ? (
                  <p className="mt-4 text-[11px] leading-relaxed text-white/30">{microCopy}</p>
                ) : null}

                <div className="mt-5 grid gap-3">
                  <Link
                    href={data.ctas.primary.href}
                    data-cta-id={data.ctas.primary.ctaId}
                    onClick={() =>
                      data.ctas.primary.ctaId
                        ? trackCtaClick({
                            ctaId: data.ctas.primary.ctaId,
                            location: trackingLocation,
                            destination: data.ctas.primary.href,
                            label: data.ctas.primary.label,
                          })
                        : undefined
                    }
                    className={cn(
                      "inline-flex h-12 w-full items-center justify-center px-5 text-sm font-semibold text-white transition-all duration-200 motion-safe:hover:-translate-y-[1px]",
                      "site-cta-radius",
                      FOCUS_RING_DARK,
                    )}
                    style={{
                      backgroundColor: effectiveAccentColor,
                      boxShadow: `0 6px 20px color-mix(in srgb, ${effectiveAccentColor} 30%, transparent)`,
                    }}
                  >
                    {data.ctas.primary.label}
                  </Link>

                  {secondaryIsLiveChat ? (
                    <button
                      type="button"
                      data-cta-id={data.ctas.secondary.ctaId}
                      onClick={() => {
                        if (data.ctas.secondary.ctaId) {
                          trackCtaClick({
                            ctaId: data.ctas.secondary.ctaId,
                            location: trackingLocation,
                            destination: "#live-chat",
                            label: data.ctas.secondary.label,
                          });
                        }
                        window.dispatchEvent(new CustomEvent("ssp:open-live-chat"));
                      }}
                      className={cn(
                        "inline-flex h-12 w-full items-center justify-center gap-2 border border-[color:var(--color-glass-border-hover)] px-5 text-sm font-semibold text-white/80 transition-all duration-200 hover:border-[color:var(--color-glass-border-hover)] hover:bg-[color:var(--color-glass-bg-hover)]",
                        "site-cta-radius",
                        FOCUS_RING_DARK,
                      )}
                    >
                      <span
                        className="h-2 w-2 rounded-full bg-emerald-400 motion-safe:animate-pulse"
                        aria-hidden
                      />
                      {data.ctas.secondary.label}
                    </button>
                  ) : (
                    <Link
                      href={data.ctas.secondary.href ?? "/contact"}
                      data-cta-id={data.ctas.secondary.ctaId}
                      onClick={() =>
                        data.ctas.secondary.ctaId
                          ? trackCtaClick({
                              ctaId: data.ctas.secondary.ctaId,
                              location: trackingLocation,
                              destination: data.ctas.secondary.href ?? "/contact",
                              label: data.ctas.secondary.label,
                            })
                          : undefined
                      }
                      className={cn(
                        "inline-flex h-12 w-full items-center justify-center border border-[color:var(--color-glass-border-hover)] px-5 text-sm font-semibold text-white/80 transition-all duration-200 hover:border-[color:var(--color-glass-border-hover)] hover:bg-[color:var(--color-glass-bg-hover)]",
                        "site-cta-radius",
                        FOCUS_RING_DARK,
                      )}
                    >
                      {data.ctas.secondary.label}
                    </Link>
                  )}
                </div>
              </div>
            </div>
          </div>
        </motion.div>
      </Container>
    </section>
  );
}
