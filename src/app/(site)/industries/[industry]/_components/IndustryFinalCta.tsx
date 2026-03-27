"use client";

import Link from "next/link";
import { motion, useReducedMotion } from "framer-motion";
import { Container } from "@/app/(site)/components/layout/Container";
import { SectionEyebrow } from "@/app/(site)/components/ui/SectionEyebrow";
import { cn } from "@/lib/cn";
import type { IndustryPageModel } from "@/config/industryPages";
import { THEME_ACCENT, THEME_BG, FOCUS_RING_DARK, getThemeOrbs } from "./industryTheme";

export function IndustryFinalCta({ model }: { model: IndustryPageModel }) {
  const reduceMotion = useReducedMotion();
  const data = model.finalCta;
  const kicker = data.kicker ?? "Start the conversation";
  const trustSignals = data.trustSignals ?? [];
  const implementationSteps = data.implementationSteps ?? [];
  const theme = model.hero.theme;
  const accentColor = THEME_ACCENT[theme];
  const bgColor = THEME_BG[theme];
  const orbs = getThemeOrbs(theme);

  return (
    <section
      aria-labelledby="industry-final-cta-heading"
      className="relative overflow-hidden py-20 sm:py-24"
      style={{ backgroundColor: bgColor }}
    >
      {/* Noise texture */}
      <div
        className="pointer-events-none absolute inset-0 opacity-[0.025]"
        style={{
          backgroundImage:
            "url(\"data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E\")",
        }}
        aria-hidden
      />

      {/* Ambient orbs */}
      <div className="pointer-events-none absolute inset-0" aria-hidden>
        <div
          className="absolute -left-20 bottom-[-60px] h-[200px] w-[200px] rounded-full blur-[100px]"
          style={{ backgroundColor: orbs.main }}
        />
        <div
          className="absolute right-[10%] top-[-40px] h-[180px] w-[180px] rounded-full blur-[80px]"
          style={{ backgroundColor: orbs.secondary }}
        />
      </div>

      {/* Top separator */}
      <div
        className="pointer-events-none absolute inset-x-0 top-0 h-px"
        style={{
          background: `linear-gradient(90deg, transparent 10%, ${accentColor}20 50%, transparent 90%)`,
        }}
        aria-hidden
      />

      <Container className="site-page-container relative">
        <motion.div
          className="rounded-2xl border border-white/10 bg-white/[0.03] px-5 py-8 backdrop-blur-sm sm:px-8 sm:py-10 md:px-10"
          initial={reduceMotion ? false : { opacity: 0, y: 16 }}
          whileInView={reduceMotion ? undefined : { opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.45, ease: "easeOut" }}
        >
          <div className="grid gap-8 lg:grid-cols-12 lg:items-center">
            {/* Left column: content */}
            <div className="lg:col-span-8">
              <SectionEyebrow
                label={kicker}
                accentColor={accentColor}
                light
              />
              <h2 id="industry-final-cta-heading" className="mt-4 text-[1.75rem] font-bold leading-[1.1] tracking-tight text-white sm:text-[2.2rem] lg:text-[2.5rem]">
                {data.title}
              </h2>
              <p className="mt-3 max-w-2xl text-[14px] leading-[1.8] text-white/55 sm:text-[15px]">
                {data.body}
              </p>

              {/* Trust signal pills */}
              {trustSignals.length > 0 ? (
                <div className="mt-5 flex flex-wrap gap-2">
                  {trustSignals.map((signal) => (
                    <span
                      key={signal}
                      className="inline-flex items-center gap-2 rounded-full border px-3 py-1 text-xs text-white/60"
                      style={{
                        borderColor: `${accentColor}30`,
                        backgroundColor: `${accentColor}0a`,
                      }}
                    >
                      <span
                        className="h-1 w-1 rounded-full"
                        style={{ backgroundColor: accentColor }}
                        aria-hidden
                      />
                      {signal}
                    </span>
                  ))}
                </div>
              ) : null}

              {/* Implementation steps — inline below content */}
              {implementationSteps.length > 0 ? (
                <div className="mt-8 grid gap-3 md:grid-cols-3">
                  {implementationSteps.map((step) => (
                    <div
                      key={step.step}
                      className="rounded-xl border border-white/8 bg-white/[0.03] px-3.5 py-3.5"
                    >
                      <span
                        className="inline-flex h-6 w-6 items-center justify-center rounded-md text-[10px] font-bold"
                        style={{
                          color: accentColor,
                          backgroundColor: `${accentColor}18`,
                        }}
                      >
                        {step.step}
                      </span>
                      <h3 className="mt-2 text-[13px] font-semibold leading-tight tracking-tight text-white">
                        {step.title}
                      </h3>
                      <p className="mt-1.5 text-[12px] leading-[1.65] text-white/40">
                        {step.body}
                      </p>
                    </div>
                  ))}
                </div>
              ) : null}
            </div>

            {/* Right column: action card */}
            <div className="lg:col-span-4">
              <div className="rounded-xl border border-white/10 bg-white/[0.04] p-5 sm:p-6">
                <p className="text-xs font-semibold uppercase tracking-[0.12em] text-white/50">
                  {kicker}
                </p>

                {/* Proof metrics */}
                {data.proof.length > 0 ? (
                  <div className="mt-4 grid gap-2 sm:grid-cols-3">
                    {data.proof.map((item) => (
                      <div
                        key={item.label}
                        className="rounded-lg border border-white/6 bg-white/[0.02] px-2 py-2 text-center"
                      >
                        <div className="text-[13px] font-semibold tracking-tight text-white/75">
                          {item.value}
                        </div>
                        <div className="mt-0.5 text-[9px] uppercase tracking-wider text-white/30">
                          {item.label}
                        </div>
                      </div>
                    ))}
                  </div>
                ) : null}

                {/* CTAs */}
                <div className="mt-5 grid gap-3">
                  <Link
                    href={data.ctas.primary.href}
                    className={cn(
                      "inline-flex h-12 w-full items-center justify-center rounded-lg px-5 text-sm font-semibold text-white transition-all duration-200 hover:-translate-y-[1px] sm:w-auto",
                      FOCUS_RING_DARK,
                    )}
                    style={{
                      backgroundColor: accentColor,
                      boxShadow: `0 6px 20px ${accentColor}30`,
                    }}
                  >
                    {data.ctas.primary.label}
                  </Link>
                  {data.ctas.secondary.action === "live-chat" ? (
                    <button
                      type="button"
                      onClick={() =>
                        window.dispatchEvent(
                          new CustomEvent("ssp:open-live-chat"),
                        )
                      }
                      className={cn(
                        "inline-flex h-12 w-full items-center justify-center gap-2 rounded-lg border border-white/15 px-5 text-sm font-semibold text-white/80 transition-all duration-200 hover:border-white/25 hover:bg-white/6 sm:w-auto",
                        FOCUS_RING_DARK,
                      )}
                    >
                      <span
                        className="h-2 w-2 animate-pulse rounded-full bg-emerald-400"
                        aria-hidden
                      />
                      {data.ctas.secondary.label}
                    </button>
                  ) : (
                    <Link
                      href={data.ctas.secondary.href ?? "/contact"}
                      className={cn(
                        "inline-flex h-12 w-full items-center justify-center rounded-lg border border-white/15 px-5 text-sm font-semibold text-white/80 transition-all duration-200 hover:border-white/25 hover:bg-white/6 sm:w-auto",
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
