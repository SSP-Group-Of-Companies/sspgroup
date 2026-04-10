"use client";

import Image from "next/image";
import Link from "next/link";
import { motion, useReducedMotion, type Variants } from "framer-motion";
import { ArrowRight } from "lucide-react";
import { Container } from "@/app/(site)/components/layout/Container";
import { SectionSignalEyebrow } from "@/app/(site)/components/ui/SectionSignalEyebrow";
import { INDUSTRY_SLIDES, type IndustrySlide } from "@/config/industries";
import { getIndustryByKey } from "@/config/industryPages";
import { cn } from "@/lib/cn";
import { trackCtaClick } from "@/lib/analytics/cta";

const focusRingDark =
  "focus:outline-none focus-visible:ring-2 focus-visible:ring-white/40 focus-visible:ring-offset-2 focus-visible:ring-offset-[color:var(--color-ssp-ink-800)]";

/* ═══════════════════════════════════════════════════════════════════════
   DATA
   ═══════════════════════════════════════════════════════════════════════ */

type IndustryCard = {
  key: IndustrySlide["key"];
  label: string;
  tagline: string;
  href: string;
  image: string;
  theme: string;
  themeRgb: string;
  accent: string;
  accentRgb: string;
  signals: string[];
};

const INDUSTRY_CARD_THEMES: Record<
  IndustrySlide["key"],
  Pick<IndustryCard, "theme" | "themeRgb" | "accent" | "accentRgb">
> = {
  automotive: { theme: "#0d1218", themeRgb: "13,18,24", accent: "#9aa8b8", accentRgb: "154,168,184" },
  manufacturing: { theme: "#1a1f2e", themeRgb: "26,31,46", accent: "#94a3b8", accentRgb: "148,163,184" },
  retail: { theme: "#0c1929", themeRgb: "12,25,41", accent: "#60a5fa", accentRgb: "96,165,250" },
  food: { theme: "#133522", themeRgb: "19,53,34", accent: "#99cf78", accentRgb: "153,207,120" },
  "steel-aluminum": { theme: "#13263a", themeRgb: "19,38,58", accent: "#6f879d", accentRgb: "111,135,157" },
  construction: { theme: "#231a0d", themeRgb: "35,26,13", accent: "#fbbf24", accentRgb: "251,191,36" },
  "chemical-plastics": { theme: "#0c242d", themeRgb: "12,36,45", accent: "#5fd5c8", accentRgb: "95,213,200" },
};

const INDUSTRIES: IndustryCard[] = INDUSTRY_SLIDES.map((slide) => {
  const industry = getIndustryByKey(slide.key);

  if (!industry) {
    throw new Error(`Missing industry config for "${slide.key}"`);
  }

  return {
    key: slide.key,
    label: slide.label,
    tagline: slide.mobileSubtitle ?? slide.subtitle,
    href: slide.href,
    image: slide.image,
    ...INDUSTRY_CARD_THEMES[slide.key],
    signals: industry.hero.signals?.slice(0, 3) ?? [],
  };
});

const DIFFERENTIATORS = [
  {
    stat: "7",
    label: "Industry programs",
    detail: "Purpose-built operating models, not generic dispatch.",
  },
  {
    stat: "3",
    label: "Countries",
    detail: "Canada, United States, and Mexico corridor coverage.",
  },
  {
    stat: "24/7",
    label: "Operations desk",
    detail: "Named ownership from first pickup to final delivery.",
  },
  {
    stat: "1",
    label: "Point of accountability",
    detail: "Single-thread execution across every lane.",
  },
];

const CTA_TRUST_PILLS = [
  "Industry-specific onboarding",
  "Named operations ownership",
  "Lane-level execution clarity",
] as const;

/* ═══════════════════════════════════════════════════════════════════════
   ANIMATION HELPERS
   ═══════════════════════════════════════════════════════════════════════ */

function useAnimations() {
  const reduceMotion = useReducedMotion() ?? false;
  const stagger: Variants = reduceMotion
    ? { hidden: { opacity: 1 }, show: { opacity: 1 } }
    : { hidden: {}, show: { transition: { staggerChildren: 0.05, delayChildren: 0.03 } } };
  const fadeUp: Variants = reduceMotion
    ? { hidden: { opacity: 1, y: 0 }, show: { opacity: 1, y: 0 } }
    : { hidden: { opacity: 1, y: 10 }, show: { opacity: 1, y: 0 } };
  return { reduceMotion, stagger, fadeUp };
}

/* ═══════════════════════════════════════════════════════════════════════
   INDUSTRY CARD COMPONENT
   ═══════════════════════════════════════════════════════════════════════ */

function IndustryCardItem({ card, index, isLarge }: { card: IndustryCard; index: number; isLarge: boolean }) {
  const { reduceMotion } = useAnimations();

  return (
    <Link
      href={card.href}
      onClick={() =>
        trackCtaClick({
          ctaId: `industries_hub_${card.key}`,
          location: "industries_hub_grid",
          destination: card.href,
          label: `Explore ${card.label}`,
        })
      }
      className="block"
    >
      <motion.article
        initial={{ opacity: 1, y: 12 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-40px" }}
        transition={{ duration: reduceMotion ? 0 : 0.35, delay: reduceMotion ? 0 : index * 0.04, ease: "easeOut" }}
        className={cn(
          "group relative overflow-hidden rounded-2xl",
          "border border-white/[0.08] transition-all duration-500",
          "hover:shadow-[0_28px_72px_rgba(0,0,0,0.55)]",
          isLarge ? "min-h-[380px] sm:min-h-[420px]" : "min-h-[340px] sm:min-h-[380px]",
        )}
        style={{ backgroundColor: card.theme }}
      >
        {/* Accent glow on top edge — appears on hover */}
        <div
          className="pointer-events-none absolute inset-x-0 top-0 z-20 h-px opacity-0 transition-opacity duration-500 group-hover:opacity-100"
          style={{ background: `linear-gradient(90deg, transparent 10%, ${card.accent} 50%, transparent 90%)` }}
          aria-hidden
        />
        <div
          className="pointer-events-none absolute inset-x-[10%] top-0 z-20 h-24 opacity-0 transition-opacity duration-500 group-hover:opacity-100"
          style={{ background: `radial-gradient(ellipse at 50% 0%, rgba(${card.accentRgb},0.14) 0%, transparent 70%)` }}
          aria-hidden
        />

        {/* Full-bleed image */}
        <div className="absolute inset-0">
          <Image
            src={card.image}
            alt={`${card.label} freight logistics`}
            fill
            className="object-cover transition-transform duration-700 ease-out motion-safe:group-hover:scale-[1.05]"
            sizes={isLarge ? "(max-width: 768px) 100vw, 50vw" : "(max-width: 768px) 100vw, 33vw"}
          />
          {/* Light vignette — keeps image visible most of the card */}
          <div
            className="absolute inset-0"
            style={{
              background: `linear-gradient(180deg, rgba(${card.themeRgb},0.06) 0%, rgba(${card.themeRgb},0.04) 30%, rgba(${card.themeRgb},0.35) 60%, rgba(${card.themeRgb},0.7) 80%, ${card.theme} 100%)`,
            }}
          />
        </div>

        {/* Content — pinned to bottom with soft feathered backdrop */}
        <div
          className="relative z-10 flex h-full flex-col justify-end rounded-b-2xl p-6 sm:p-7"
          style={{
            background: `linear-gradient(to top, transparent 0%, ${card.theme}cc 12%, ${card.theme}f2 35%, ${card.theme}cc 70%, transparent 100%)`,
          }}
        >
          {/* Signal chips */}
          <div className="mb-3 flex flex-wrap gap-1.5">
            {card.signals.map((s) => (
              <span
                key={s}
                className="rounded-md px-2 py-0.5 text-[10px] font-medium uppercase tracking-wider backdrop-blur-sm"
                style={{
                  border: `1px solid rgba(${card.accentRgb},0.25)`,
                  backgroundColor: `rgba(${card.accentRgb},0.1)`,
                  color: `rgba(${card.accentRgb},0.8)`,
                }}
              >
                {s}
              </span>
            ))}
          </div>

          <h3
            className="text-[1.3rem] font-semibold leading-tight tracking-tight text-white sm:text-[1.45rem]"
            style={{ textShadow: "0 2px 8px rgba(0,0,0,0.4)" }}
          >
            {card.label}
          </h3>

          <p
            className="mt-1.5 max-w-sm text-[13px] leading-relaxed text-white/65 sm:text-sm"
            style={{ textShadow: "0 1px 4px rgba(0,0,0,0.3)" }}
          >
            {card.tagline}
          </p>

          <div className="mt-4">
            <span
              className="inline-flex items-center gap-2 text-[13px] font-semibold transition-all duration-300 group-hover:gap-3"
              style={{ color: card.accent }}
            >
              Explore program
              <ArrowRight className="h-3.5 w-3.5 transition-transform duration-300 motion-safe:group-hover:translate-x-1" />
            </span>
          </div>
        </div>
      </motion.article>
    </Link>
  );
}

/* ═══════════════════════════════════════════════════════════════════════
   MAIN COMPONENT
   ═══════════════════════════════════════════════════════════════════════ */

export function IndustriesHub() {
  const { reduceMotion, stagger, fadeUp } = useAnimations();

  return (
    <>
      {/* ────────────────────────────────────────────────────────────────
          HERO — premium light
          ──────────────────────────────────────────────────────────────── */}
      <section className="relative overflow-hidden bg-[linear-gradient(180deg,#ffffff_0%,#f5f7fa_50%,#eef2f6_100%)] pb-16 pt-16 sm:pb-20 sm:pt-20 lg:pb-24 lg:pt-24">
        {/* Subtle ambient washes */}
        <div className="pointer-events-none absolute inset-0" aria-hidden>
          <div className="absolute right-[-10%] top-[-5%] h-[500px] w-[500px] rounded-full bg-[radial-gradient(circle,rgba(16,167,216,0.05)_0%,transparent_65%)]" />
          <div className="absolute bottom-[-10%] left-[-5%] h-[400px] w-[400px] rounded-full bg-[radial-gradient(circle,rgba(215,25,32,0.03)_0%,transparent_65%)]" />
        </div>

        <Container className="site-page-container relative">
          <motion.div
            initial="hidden"
            animate="show"
            variants={stagger}
            className="mx-auto max-w-4xl text-center"
          >
            <motion.div
              variants={fadeUp}
              transition={{ duration: 0.35, ease: "easeOut" }}
              className="flex justify-center"
            >
              <SectionSignalEyebrow label="Industry Programs" />
            </motion.div>

            <motion.h1
              variants={fadeUp}
              transition={{ duration: 0.38, ease: "easeOut" }}
              className="mt-7 text-[2.4rem] font-bold leading-[1.04] tracking-tight text-[color:var(--color-text-strong)] sm:text-[3.4rem] lg:text-[4rem]"
            >
              Every industry has a
              <br className="hidden sm:block" />
              breaking point.{" "}
              <span className="text-[color:var(--color-ssp-ink-800)]">We engineer around it.</span>
            </motion.h1>

            <motion.p
              variants={fadeUp}
              transition={{ duration: 0.35, ease: "easeOut" }}
              className="mx-auto mt-6 max-w-2xl text-[15px] leading-[1.85] text-[color:var(--color-muted)] sm:text-base"
            >
              Generic freight models break under industry-specific pressure. SSP builds operating
              programs purpose-fit to the timing, compliance, and handling standards your supply
              chain actually demands.
            </motion.p>

            <motion.div
              variants={fadeUp}
              transition={{ duration: 0.35, ease: "easeOut" }}
              className="mt-9 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-center"
            >
              <Link
                href="/contact"
                data-cta-id="industries_hub_hero_contact"
                onClick={() =>
                  trackCtaClick({
                    ctaId: "industries_hub_hero_contact",
                    location: "industries_hub_hero",
                    destination: "/contact",
                    label: "Talk to Our Team",
                  })
                }
                className={cn(
                  "inline-flex h-12 items-center justify-center rounded-xl px-7 text-sm font-semibold text-white transition-all duration-200 motion-safe:hover:-translate-y-[1px]",
                  "bg-[color:var(--color-ssp-ink-800)] shadow-[0_8px_28px_rgba(13,79,120,0.22)] hover:bg-[color:var(--color-ssp-ink-900)] hover:shadow-[0_12px_36px_rgba(13,79,120,0.32)]",
                  "focus-ring-surface",
                )}
              >
                Talk to Our Team
              </Link>
              <Link
                href="#industries"
                data-cta-id="industries_hub_hero_view_programs"
                onClick={() =>
                  trackCtaClick({
                    ctaId: "industries_hub_hero_view_programs",
                    location: "industries_hub_hero",
                    destination: "#industries",
                    label: "View All Programs",
                  })
                }
                className="inline-flex h-12 items-center justify-center rounded-xl border border-[color:var(--color-border)] px-7 text-sm font-semibold text-[color:var(--color-text)] transition-all duration-200 hover:border-[color:var(--color-ssp-ink-800)]/30 hover:bg-[color:var(--color-ssp-ink-800)]/[0.04] focus-ring-surface"
              >
                View All Programs
              </Link>
            </motion.div>
          </motion.div>

          {/* ── DIFFERENTIATORS STRIP ── */}
          <motion.div
            initial="hidden"
            whileInView="show"
            viewport={{ once: true, margin: "-60px" }}
            variants={stagger}
            className="mx-auto mt-14 grid max-w-5xl grid-cols-2 gap-3 sm:mt-16 sm:gap-4 lg:grid-cols-4"
          >
            {DIFFERENTIATORS.map((d) => (
              <motion.div
                key={d.label}
                variants={fadeUp}
                transition={{ duration: 0.35, ease: "easeOut" }}
                className="rounded-2xl border border-[color:var(--color-border)] bg-white p-5 shadow-[0_4px_20px_rgba(0,0,0,0.04)] sm:p-6"
              >
                <p className="text-[1.6rem] font-bold tracking-tight text-[color:var(--color-ssp-ink-800)] sm:text-[1.85rem]">
                  {d.stat}
                </p>
                <p className="mt-1 text-[10px] font-semibold uppercase tracking-[0.16em] text-[color:var(--color-muted)] sm:text-xs">
                  {d.label}
                </p>
                <p className="mt-2 text-[11px] leading-[1.6] text-[color:var(--color-subtle)] sm:text-[12px]">
                  {d.detail}
                </p>
              </motion.div>
            ))}
          </motion.div>
        </Container>
      </section>

      {/* ────────────────────────────────────────────────────────────────
          INDUSTRY GRID
          ──────────────────────────────────────────────────────────────── */}
      <section id="industries" className="relative bg-[linear-gradient(180deg,var(--color-ssp-ink-800),var(--color-ssp-ink-900)_40%)] py-20 sm:py-24 lg:py-28">
        {/* Ambient */}
        <div className="pointer-events-none absolute inset-0" aria-hidden>
          <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,transparent_45%,rgba(0,0,0,0.2)_100%)]" />
          <div className="absolute right-[-5%] top-[10%] h-[400px] w-[400px] rounded-full bg-[color:var(--color-ssp-cyan-500)]/8 blur-[120px]" />
          <div className="absolute bottom-[5%] left-[-5%] h-[350px] w-[350px] rounded-full bg-[color:var(--color-brand-600)]/5 blur-[120px]" />
        </div>

        <Container className="site-page-container relative">
          <motion.div
            initial="hidden"
            whileInView="show"
            viewport={{ once: true, margin: "-80px" }}
            variants={stagger}
            className="mx-auto mb-12 max-w-2xl text-center sm:mb-16"
          >
            <motion.div
              variants={fadeUp}
              transition={{ duration: 0.35, ease: "easeOut" }}
              className="flex justify-center"
            >
              <SectionSignalEyebrow label="Sector-Specific Programs" light />
            </motion.div>
            <motion.h2
              variants={fadeUp}
              transition={{ duration: 0.35, ease: "easeOut" }}
              className="mt-4 text-[1.85rem] font-semibold leading-[1.1] tracking-tight text-white sm:text-[2.4rem]"
            >
              Programs built around how your industry actually moves freight.
            </motion.h2>
            <motion.p
              variants={fadeUp}
              transition={{ duration: 0.4, ease: "easeOut" }}
              className="mx-auto mt-4 max-w-xl text-[14px] leading-[1.8] text-white/40 sm:text-[15px]"
            >
              Select an industry to see how SSP structures carriers, documentation, handling
              controls, and reporting around your operating environment.
            </motion.p>
          </motion.div>

          {/* Bento grid: 3 large + 4 smaller */}
          <div className="grid gap-3 sm:gap-4 md:grid-cols-2 lg:grid-cols-3">
            {INDUSTRIES.slice(0, 3).map((card, i) => (
              <IndustryCardItem key={card.key} card={card} index={i} isLarge />
            ))}
          </div>
          <div className="mt-3 grid gap-3 sm:mt-4 sm:gap-4 md:grid-cols-2 lg:grid-cols-4">
            {INDUSTRIES.slice(3).map((card, i) => (
              <IndustryCardItem key={card.key} card={card} index={i + 3} isLarge={false} />
            ))}
          </div>
        </Container>
      </section>

      {/* ────────────────────────────────────────────────────────────────
          WHY INDUSTRY-SPECIFIC
          ──────────────────────────────────────────────────────────────── */}
      <section className="bg-[color:var(--color-surface-0)] py-20 sm:py-24 lg:py-28">
        <Container className="site-page-container">
          <div className="grid items-center gap-12 lg:grid-cols-2 lg:gap-16">
            <motion.div
              initial="hidden"
              whileInView="show"
              viewport={{ once: true, margin: "-80px" }}
              variants={stagger}
            >
              <motion.div
                variants={fadeUp}
                transition={{ duration: 0.35, ease: "easeOut" }}
              >
                <SectionSignalEyebrow label="Why It Matters" />
              </motion.div>
              <motion.h2
                variants={fadeUp}
                transition={{ duration: 0.35, ease: "easeOut" }}
                className="mt-4 max-w-lg text-[1.8rem] font-semibold leading-[1.1] tracking-tight text-[color:var(--color-text-strong)] sm:text-[2.2rem]"
              >
                The difference is in the operating model, not the sales pitch.
              </motion.h2>
              <motion.p
                variants={fadeUp}
                transition={{ duration: 0.4, ease: "easeOut" }}
                className="mt-5 max-w-lg text-[15px] leading-[1.85] text-[color:var(--color-muted)]"
              >
                A food shipper and a steel shipper have completely different failure modes.
                Temperature drift versus load securement. Freshness windows versus axle
                compliance. The only thing they share is that a generic broker won&apos;t
                understand either one deeply enough.
              </motion.p>
              <motion.p
                variants={fadeUp}
                transition={{ duration: 0.4, ease: "easeOut" }}
                className="mt-4 max-w-lg text-[15px] leading-[1.85] text-[color:var(--color-muted)]"
              >
                SSP assigns dedicated teams per industry with operating models, exception
                playbooks, and reporting cadences designed around how your freight actually
                behaves under pressure.
              </motion.p>
            </motion.div>

            <motion.div
              initial="hidden"
              whileInView="show"
              viewport={{ once: true, margin: "-60px" }}
              variants={stagger}
              className="grid grid-cols-2 gap-3"
            >
              {[
                { title: "Timing-specific", body: "Operating models aligned to your receiving windows, production schedules, and delivery cadence." },
                { title: "Compliance-fit", body: "Documentation, carrier qualification, and handling controls matched to your regulatory environment." },
                { title: "Exception-owned", body: "Named accountability from dispatch through delivery with industry-context escalation paths." },
                { title: "Visibility-built", body: "Reporting structured for how your team actually makes decisions, not generic tracking feeds." },
              ].map((item, i) => (
                <motion.div
                  key={item.title}
                  variants={fadeUp}
                  transition={{ duration: 0.35, delay: i * 0.04, ease: "easeOut" }}
                  className="rounded-2xl border border-[color:var(--color-border)] bg-[color:var(--color-surface-1)] p-5 shadow-[0_2px_12px_rgba(0,0,0,0.03)]"
                >
                  <p className="text-[13px] font-semibold text-[color:var(--color-text-strong)]">
                    {item.title}
                  </p>
                  <p className="mt-2 text-[12px] leading-[1.7] text-[color:var(--color-subtle)]">
                    {item.body}
                  </p>
                </motion.div>
              ))}
            </motion.div>
          </div>
        </Container>
      </section>

      {/* ────────────────────────────────────────────────────────────────
          FINAL CTA — SSP dark glass-card pattern
          ──────────────────────────────────────────────────────────────── */}
      <section
        aria-labelledby="industries-hub-cta-heading"
        className="border-t border-[color:var(--color-ssp-ink-800)]/45 bg-[linear-gradient(140deg,var(--color-ssp-ink-900),var(--color-ssp-ink-800))] py-20 sm:py-24"
      >
        <Container className="site-page-container">
          <motion.div
            className="rounded-2xl border border-white/16 bg-white/[0.05] px-5 py-8 backdrop-blur-sm sm:px-8 sm:py-10 md:px-10"
            initial={reduceMotion ? false : { opacity: 1, y: 10 }}
            whileInView={reduceMotion ? undefined : { opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.15 }}
            transition={{ duration: 0.35, ease: "easeOut" }}
          >
            <div className="grid gap-7 lg:grid-cols-12 lg:items-center">
              <div className="lg:col-span-8">
                <SectionSignalEyebrow label="Start Your Program" light />
                <h2
                  id="industries-hub-cta-heading"
                  className="mt-3 text-2xl leading-tight font-semibold text-white sm:text-3xl"
                >
                  Tell us the industry. We&apos;ll show you the operating model.
                </h2>
                <p className="mt-3 max-w-3xl text-sm leading-7 text-white/74">
                  Share your lanes, constraints, and standards. SSP will scope a program
                  with the carriers, documentation, and handling controls your freight
                  actually requires.
                </p>
                <div className="mt-5 flex flex-wrap gap-2 text-xs text-white/72">
                  {CTA_TRUST_PILLS.map((pill) => (
                    <span
                      key={pill}
                      className="rounded-full border border-white/20 bg-white/[0.07] px-3 py-1"
                    >
                      {pill}
                    </span>
                  ))}
                </div>
              </div>

              <div className="rounded-xl border border-white/16 bg-white/[0.06] p-4 sm:p-5 lg:col-span-4">
                <p className="text-xs font-semibold tracking-[0.12em] text-white/70 uppercase">
                  Start Your Engagement
                </p>
                <div className="mt-4 grid gap-3">
                  <Link
                    href="/quote"
                    data-cta-id="industries_hub_final_quote"
                    onClick={() =>
                      trackCtaClick({
                        ctaId: "industries_hub_final_quote",
                        location: "industries_hub_cta",
                        destination: "/quote",
                        label: "Request a Quote",
                      })
                    }
                    className={cn(
                      "inline-flex h-12 items-center justify-center rounded-lg bg-[color:var(--color-ssp-cyan-500)] px-5 text-sm font-semibold text-white shadow-[0_6px_20px_rgba(16,167,216,0.35)] transition hover:bg-[color:var(--color-ssp-cyan-600)] hover:shadow-[0_10px_28px_rgba(16,167,216,0.45)]",
                      focusRingDark,
                    )}
                  >
                    Request a Quote
                  </Link>
                  <Link
                    href="/contact"
                    data-cta-id="industries_hub_final_contact"
                    onClick={() =>
                      trackCtaClick({
                        ctaId: "industries_hub_final_contact",
                        location: "industries_hub_cta",
                        destination: "/contact",
                        label: "Contact SSP Group",
                      })
                    }
                    className={cn(
                      "inline-flex h-12 items-center justify-center rounded-lg border border-white/24 px-5 text-sm font-semibold text-white/92 transition hover:border-white/40 hover:bg-white/10",
                      focusRingDark,
                    )}
                  >
                    Contact SSP Group
                  </Link>
                </div>
              </div>
            </div>
          </motion.div>
        </Container>
      </section>
    </>
  );
}
