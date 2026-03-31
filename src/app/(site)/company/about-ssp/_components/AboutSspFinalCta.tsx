"use client";

import Link from "next/link";
import { motion, useReducedMotion, type Variants } from "framer-motion";
import { Container } from "@/app/(site)/components/layout/Container";
import { SectionSignalEyebrow } from "@/app/(site)/components/ui/SectionSignalEyebrow";
import { cn } from "@/lib/cn";

type FinalCtaData = Readonly<{
  kicker?: string;
  title: string;
  body: string;
  trustSignals?: readonly string[];
  proof: readonly { value: string; label: string }[];
  microCopy?: string;
  ctas: {
    primary: { label: string; href: string; ctaId: string };
    secondary: { label: string; href: string; ctaId: string };
  };
}>;

const FOCUS_RING_DARK =
  "focus:outline-none focus-visible:ring-2 focus-visible:ring-white/40 focus-visible:ring-offset-2 focus-visible:ring-offset-[color:var(--color-ssp-ink-800)]";

export function AboutSspFinalCta({ data }: { data: FinalCtaData }) {
  const reduceMotion = useReducedMotion();
  const kicker = data.kicker ?? "Start the conversation";
  const trustSignals = data.trustSignals ?? [];
  const isLiveChat = data.ctas.secondary.href === "#live-chat";

  const revealUp: Variants = reduceMotion
    ? { hidden: { opacity: 1, y: 0 }, show: { opacity: 1, y: 0 } }
    : { hidden: { opacity: 0, y: 18 }, show: { opacity: 1, y: 0 } };

  return (
    <section
      aria-labelledby="about-final-cta-heading"
      className="relative overflow-hidden bg-[color:var(--color-company-ink)] py-20 sm:py-24"
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
        <div className="absolute -left-20 bottom-[-60px] h-[200px] w-[200px] rounded-full bg-[color:var(--color-ssp-cyan-500)]/14 blur-[100px]" />
        <div className="absolute right-[10%] top-[-40px] h-[180px] w-[180px] rounded-full bg-white/6 blur-[80px]" />
      </div>

      {/* Top separator */}
      <div
        className="pointer-events-none absolute inset-x-0 top-0 h-px"
        style={{
          background:
            "linear-gradient(90deg, transparent 10%, var(--color-company-final-separator) 50%, transparent 90%)",
        }}
        aria-hidden
      />

      <Container className="site-page-container relative">
        <motion.div
          className="rounded-2xl border border-[color:var(--color-glass-border)] bg-[color:var(--color-glass-bg)] px-5 py-8 backdrop-blur-sm sm:px-8 sm:py-10 md:px-10"
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, amount: 0.3 }}
          variants={revealUp}
          transition={{ duration: reduceMotion ? 0 : 0.45, ease: "easeOut" }}
        >
          <div className="grid gap-8 lg:grid-cols-12 lg:items-center">
            {/* Left column — content */}
            <div className="lg:col-span-8">
              <SectionSignalEyebrow label={kicker} light />

              <h2
                id="about-final-cta-heading"
                className="mt-4 text-[1.75rem] font-bold leading-[1.1] tracking-tight text-white sm:text-[2.2rem] lg:text-[2.5rem]"
              >
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
                      className="inline-flex items-center gap-2 rounded-full border border-[color:var(--color-ssp-cyan-500)]/20 bg-[color:var(--color-ssp-cyan-500)]/[0.06] px-3 py-1 text-xs text-white/60"
                    >
                      <span
                        className="h-1 w-1 rounded-full bg-[color:var(--color-ssp-cyan-500)]"
                        aria-hidden
                      />
                      {signal}
                    </span>
                  ))}
                </div>
              ) : null}
            </div>

            {/* Right column — action card */}
            <div className="lg:col-span-4">
              <div className="rounded-xl border border-[color:var(--color-glass-border)] bg-[color:var(--color-glass-bg)] p-5 sm:p-6">
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
                    data-cta-id={data.ctas.primary.ctaId}
                    aria-label={data.ctas.primary.label}
                    className={cn(
                      "inline-flex h-12 w-full items-center justify-center rounded-lg bg-[color:var(--color-ssp-cyan-500)] px-5 text-sm font-semibold text-white shadow-[var(--shadow-company-final-primary)] transition-all duration-200 hover:-translate-y-[1px] hover:bg-[color:var(--color-ssp-cyan-600)] hover:shadow-[var(--shadow-company-final-primary-hover)]",
                      FOCUS_RING_DARK,
                    )}
                  >
                    {data.ctas.primary.label}
                  </Link>

                  {isLiveChat ? (
                    <button
                      type="button"
                      data-cta-id={data.ctas.secondary.ctaId}
                      aria-label={data.ctas.secondary.label}
                      onClick={() =>
                        window.dispatchEvent(
                          new CustomEvent("ssp:open-live-chat"),
                        )
                      }
                      className={cn(
                        "inline-flex h-12 w-full items-center justify-center gap-2 rounded-lg border border-[color:var(--color-glass-border-hover)] px-5 text-sm font-semibold text-white/80 transition-all duration-200 hover:border-[color:var(--color-glass-border-hover)] hover:bg-[color:var(--color-glass-bg-hover)]",
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
                      href={data.ctas.secondary.href}
                      data-cta-id={data.ctas.secondary.ctaId}
                      aria-label={data.ctas.secondary.label}
                      className={cn(
                        "inline-flex h-12 w-full items-center justify-center rounded-lg border border-[color:var(--color-glass-border-hover)] px-5 text-sm font-semibold text-white/80 transition-all duration-200 hover:border-[color:var(--color-glass-border-hover)] hover:bg-[color:var(--color-glass-bg-hover)]",
                        FOCUS_RING_DARK,
                      )}
                    >
                      {data.ctas.secondary.label}
                    </Link>
                  )}
                </div>

                {/* Micro-copy */}
                {data.microCopy ? (
                  <p className="mt-4 text-center text-[11px] leading-5 text-white/30">
                    {data.microCopy}
                  </p>
                ) : null}
              </div>
            </div>
          </div>
        </motion.div>
      </Container>
    </section>
  );
}
