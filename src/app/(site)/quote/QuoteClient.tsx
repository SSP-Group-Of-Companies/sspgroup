// src/app/(site)/quote/QuoteClient.tsx
"use client";

import { ShieldCheck, Clock3, Globe2, PhoneCall } from "lucide-react";
import { motion, useReducedMotion } from "framer-motion";

import { Container } from "../components/layout/Container";
import { Section } from "../components/layout/Section";
import { SectionEyebrow } from "../components/ui/SectionEyebrow";
import LogisticsQuoteForm from "../components/forms/LogisticsQuoteForm";
import { cn } from "@/lib/cn";
import {
  COMPANY_HERO_SHARD_BOX,
  COMPANY_HERO_SHARD_FRAME,
  COMPANY_HERO_SHARD_FRAME_INNER,
} from "@/app/(site)/components/network/coverageHeroStyles";
import { NEXT_PUBLIC_SSP_PHONE } from "@/config/env";
import { getSiteHeaderOffset } from "@/lib/siteHeaderOffset";

function QuoteHero() {
  const reduceMotion = useReducedMotion() ?? false;
  const shardMaskStyle = {
    background:
      "linear-gradient(160deg, rgba(255,248,248,0.94) 0%, rgba(255,207,207,0.6) 38%, rgba(248,113,113,0.3) 72%, rgba(34,12,18,0.12) 100%)",
    WebkitMaskImage: "url('/_optimized/company/ssp-shard-mask.svg')",
    maskImage: "url('/_optimized/company/ssp-shard-mask.svg')",
    WebkitMaskRepeat: "no-repeat",
    maskRepeat: "no-repeat",
    WebkitMaskPosition: "center",
    maskPosition: "center",
    WebkitMaskSize: "contain",
    maskSize: "contain",
    filter: "drop-shadow(0 0 32px rgba(255, 196, 196, 0.16))",
  } as const;
  const shardFadeStyle = {
    WebkitMaskImage:
      "linear-gradient(136deg, rgba(0,0,0,0.01) 0%, rgba(0,0,0,0.12) 30%, rgba(0,0,0,0.86) 63%, #000 100%)",
    maskImage:
      "linear-gradient(136deg, rgba(0,0,0,0.01) 0%, rgba(0,0,0,0.12) 30%, rgba(0,0,0,0.86) 63%, #000 100%)",
  } as const;

  return (
    <Section
      variant="dark"
      id="quote-hero"
      className="relative overflow-hidden border-b border-white/10 py-18 sm:py-22 lg:py-24"
      style={{
        background:
          "linear-gradient(135deg, var(--color-quote-hero-bg-start) 0%, var(--color-quote-hero-bg-mid) 52%, var(--color-quote-hero-bg-end) 100%)",
      }}
    >
      <div aria-hidden="true" className="pointer-events-none absolute inset-0">
        <div className="absolute inset-0 bg-[radial-gradient(62%_64%_at_86%_44%,var(--color-quote-hero-glow-brand),var(--color-quote-hero-glow-brand-soft)_56%,transparent_100%)]" />
        <div className="absolute inset-0 bg-[radial-gradient(52%_56%_at_8%_98%,var(--color-quote-hero-glow-ink),transparent_72%)]" />
        <div className="absolute inset-0 bg-[radial-gradient(40%_44%_at_66%_35%,var(--color-quote-hero-glow-steel),transparent_72%)]" />
      </div>

      <div className={COMPANY_HERO_SHARD_FRAME} aria-hidden>
        <div className={COMPANY_HERO_SHARD_FRAME_INNER}>
          <motion.div
            initial={reduceMotion ? { opacity: 0.86 } : { opacity: 0.08, x: -34, y: 20 }}
            animate={reduceMotion ? { opacity: 0.86 } : { opacity: 0.94, x: 0, y: 0 }}
            transition={{ duration: reduceMotion ? 0 : 0.66, ease: [0.22, 1, 0.36, 1] }}
            className={COMPANY_HERO_SHARD_BOX}
            style={shardFadeStyle}
          >
            <div className="h-full w-full" style={shardMaskStyle} />
          </motion.div>
        </div>
      </div>

      <Container className="site-page-container relative z-10">
        <div className="max-w-[44rem]">
          <SectionEyebrow label="Quotes & Planning" accentColor="var(--color-brand-500)" light />
          <h1 className="mt-4 max-w-[20ch] text-[2.05rem] leading-[1.04] font-bold tracking-tight text-balance text-white sm:text-[2.45rem] lg:text-[2.92rem]">
            Share your shipment. We’ll handle the precision.
          </h1>
          <p className="mt-4 max-w-[56ch] text-[14.25px] leading-[1.74] text-white/74 sm:text-[15px]">
            Tell us where your freight is moving, what needs to move, and the service window. Our
            team reviews every request, aligns the right capacity, and comes back with a tailored
            quote—not a generic rate sheet.
          </p>
        </div>
      </Container>
    </Section>
  );
}

function toTelHref(phone: string) {
  return `tel:${phone.replace(/[^\d+]/g, "")}`;
}

function scrollToQuoteForm() {
  const el = document.getElementById("quote-form-card");
  if (!el) return;

  const padding = 20;
  const offset = getSiteHeaderOffset() + padding;
  const top = el.getBoundingClientRect().top + window.scrollY - offset;
  const behavior: ScrollBehavior = window.matchMedia?.("(prefers-reduced-motion: reduce)").matches
    ? "auto"
    : "smooth";
  window.scrollTo({ top: Math.max(0, top), behavior });
}

function QuoteCallout() {
  return (
    <div className="mx-auto mb-5 max-w-5xl sm:mb-6">
      <div
        className={cn(
          "relative overflow-hidden rounded-2xl border px-4 py-3.5 sm:px-5 sm:py-4",
          "border-[color:var(--color-quote-callout-border)] bg-[linear-gradient(180deg,var(--color-quote-callout-bg-start)_0%,var(--color-quote-callout-bg-end)_100%)]",
          "shadow-[0_12px_28px_rgba(2,6,23,0.18)]",
        )}
      >
        <div aria-hidden="true" className="pointer-events-none absolute inset-0">
          <div className="absolute inset-0 bg-[radial-gradient(ellipse_360px_140px_at_12%_0%,var(--color-quote-callout-glow-brand),transparent_60%)]" />
          <div className="absolute inset-0 bg-[radial-gradient(ellipse_260px_120px_at_88%_100%,var(--color-quote-callout-glow-amber),transparent_60%)]" />
        </div>

        <div className="relative flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between">
          <p className="min-w-0 text-[12.5px] leading-5 text-[color:var(--color-quote-callout-text)] sm:text-[13px]">
            <span className="mr-2 inline-block text-[10px] font-semibold tracking-[0.14em] text-[color:var(--color-brand-500)] uppercase">
              Prefer to call?
            </span>
            Reach us at{" "}
            <a
              href={toTelHref(NEXT_PUBLIC_SSP_PHONE)}
              className="font-semibold text-white underline decoration-white/25 underline-offset-4 transition hover:decoration-white/60"
            >
              {NEXT_PUBLIC_SSP_PHONE}
            </a>
            .
          </p>

          <div className="flex shrink-0 gap-2">
            <a
              href={toTelHref(NEXT_PUBLIC_SSP_PHONE)}
              className={cn(
                "inline-flex h-8 items-center justify-center gap-1.5 rounded-md px-3 text-[12px] font-semibold",
                "border border-[color:var(--color-brand-600)] bg-[linear-gradient(180deg,var(--color-brand-600),var(--color-brand-700))] text-white",
                "shadow-[0_6px_16px_rgba(215,25,32,0.16)] transition hover:-translate-y-[1px] hover:shadow-[0_10px_20px_rgba(215,25,32,0.22)]",
                "focus-ring-surface",
              )}
              aria-label={`Call SSP Group at ${NEXT_PUBLIC_SSP_PHONE}`}
            >
              <PhoneCall className="h-3.5 w-3.5" />
              Call
            </a>

            <button
              type="button"
              onClick={scrollToQuoteForm}
              className={cn(
                "inline-flex h-8 items-center justify-center rounded-md px-3 text-[12px] font-semibold",
                "border border-[color:var(--color-quote-callout-secondary-border)] bg-[color:var(--color-quote-callout-secondary-bg)] text-[color:var(--color-quote-callout-secondary-text)] backdrop-blur",
                "transition hover:-translate-y-[1px] hover:cursor-pointer hover:border-[color:var(--color-quote-callout-secondary-border-hover)] hover:text-white",
                "focus-ring-surface",
              )}
              aria-label="Scroll to quote form"
            >
              Form
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

const assuranceItems = [
  {
    icon: ShieldCheck,
    title: "Enterprise-grade security",
    description: "Your shipment details are submitted securely and handled with care.",
  },
  {
    icon: Clock3,
    title: "Fast, human response",
    description: "Experienced logistics professionals review every request.",
  },
  {
    icon: Globe2,
    title: "North America expertise",
    description: "Built for domestic, cross-border, and specialized freight.",
  },
];

function QuoteAssurance() {
  return (
    <section
      className="border-t border-[color:var(--color-border-light-soft)] py-10 sm:py-12"
      style={{ backgroundColor: "var(--color-quote-assurance-bg)" }}
    >
      <Container className="site-page-container">
        <div className="mx-auto max-w-3xl text-center">
          <div className="flex justify-center">
            <SectionEyebrow label="Why shippers trust SSP" accentColor="var(--color-brand-500)" />
          </div>
          <h2 className="mt-3 text-[1.5rem] font-semibold tracking-tight text-[color:var(--color-text-light)] sm:text-[1.85rem]">
            Built for confidence at every step
          </h2>
        </div>

        <div className="mt-8 grid grid-cols-1 gap-4 sm:mt-10 sm:grid-cols-3">
          {assuranceItems.map((item) => {
            const Icon = item.icon;

            return (
              <div
                key={item.title}
                className={cn(
                  "group relative overflow-hidden rounded-[24px] border p-5 sm:p-6",
                  "border-[color:var(--color-border-light)] bg-white",
                  "shadow-[0_10px_30px_rgba(15,23,42,0.05)] transition duration-300",
                  "motion-safe:hover:-translate-y-[1px] hover:shadow-[0_14px_36px_rgba(15,23,42,0.08)]",
                )}
              >
                <div
                  aria-hidden
                  className="absolute top-0 left-0 h-16 w-16 rounded-br-[22px]"
                  style={{
                    background:
                      "linear-gradient(135deg, rgba(220,38,38,0.10) 0%, rgba(220,38,38,0.04) 55%, transparent 100%)",
                  }}
                />

                <div className="relative flex items-start gap-4">
                  <div
                    className={cn(
                      "inline-flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl",
                      "border border-[color:var(--color-brand-100)] bg-white",
                      "shadow-[0_4px_12px_rgba(15,23,42,0.05)]",
                    )}
                  >
                    <Icon className="h-5.5 w-5.5 text-[color:var(--color-brand-600)]" />
                  </div>

                  <div className="min-w-0">
                    <h3 className="text-[1.05rem] font-semibold tracking-tight text-[color:var(--color-text-light)]">
                      {item.title}
                    </h3>

                    <p className="mt-2 max-w-[24ch] text-sm leading-6 text-[color:var(--color-muted-light)]">
                      {item.description}
                    </p>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </Container>
    </section>
  );
}

export default function QuoteClient() {
  return (
    <div className="bg-[color:var(--color-surface-0-light)]">
      <QuoteHero />

      <section id="quote-form" className="relative py-12 sm:py-14 lg:py-16">
        <div className="absolute inset-0" aria-hidden="true">
          <div
            className="absolute inset-0"
            style={{
              background:
                "radial-gradient(920px 500px at 16% -4%, var(--color-quote-form-glow-brand), transparent 62%)",
            }}
          />
          <div
            className="absolute inset-0"
            style={{
              background:
                "radial-gradient(1000px 580px at 84% 112%, var(--color-quote-form-glow-amber), transparent 66%)",
            }}
          />
          <div className="absolute inset-0 bg-[linear-gradient(180deg,var(--color-quote-form-surface-start)_0%,var(--color-quote-form-surface-mid)_45%,var(--color-quote-form-surface-end)_100%)]" />
        </div>

        <Container className="site-page-container relative">
          <QuoteCallout />

          <div id="quote-form-card" className="mx-auto max-w-5xl">
            <LogisticsQuoteForm />
          </div>
        </Container>
      </section>

      <QuoteAssurance />
    </div>
  );
}
