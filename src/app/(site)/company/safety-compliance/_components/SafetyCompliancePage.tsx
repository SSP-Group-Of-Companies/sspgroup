"use client";

import Link from "next/link";
import { useState, type CSSProperties } from "react";
import { motion, useReducedMotion, type Variants } from "framer-motion";
import { ChevronLeft, Pause, Play, Radio, Route, ShieldCheck } from "lucide-react";
import { Container } from "@/app/(site)/components/layout/Container";
import { HEADER_HEIGHT_PX } from "@/app/(site)/components/layout/header/constants";
import { ModeSolutionOverviewSection } from "@/app/(site)/solutions/_components/ModeSolutionOverviewSection";
import { SectionSignalEyebrow } from "@/app/(site)/components/ui/SectionSignalEyebrow";
import { SharedFaqSection } from "@/app/(site)/components/faq/SharedFaqSection";
import { StandardFinalCta } from "@/app/(site)/components/cta/StandardFinalCta";
import { safetyCompliancePage } from "@/config/companyPages";
import { TRUST_PARTNER_LOGOS } from "@/config/partners";
import { cn } from "@/lib/cn";
import { LogoImage } from "@/components/media/LogoImage";
import {
  COMPANY_HERO_SHARD_BOX,
  COMPANY_HERO_SHARD_FRAME,
  COMPANY_HERO_SHARD_FRAME_INNER,
} from "@/app/(site)/components/network/coverageHeroStyles";

const FOCUS_RING_LIGHT =
  "focus:outline-none focus-visible:ring-2 focus-visible:ring-[color:var(--color-nav-ring)] focus-visible:ring-offset-2 focus-visible:ring-offset-[color:var(--color-surface-0-light)]";

const SAFETY_SECTION_SCROLL_MARGIN = HEADER_HEIGHT_PX + 56 + 16;

const VISIBILITY_CONTROL_ICONS = {
  radio: Radio,
  route: Route,
  shield: ShieldCheck,
} as const;

function CertificationMarquee({ paused }: { paused: boolean }) {
  const logos = [...TRUST_PARTNER_LOGOS, ...TRUST_PARTNER_LOGOS];
  return (
    <div
      className={cn(
        "relative overflow-hidden rounded-[1.05rem] border border-white/70 bg-[linear-gradient(180deg,rgba(255,255,255,0.95),rgba(248,251,255,0.88))]",
        "shadow-[0_18px_42px_rgba(2,6,23,0.08),inset_0_1px_0_rgba(255,255,255,0.95)] backdrop-blur-xl",
      )}
    >
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(760px_240px_at_100%_100%,rgba(16,167,216,0.08),transparent_58%)]" />
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(640px_180px_at_0%_0%,rgba(59,130,246,0.07),transparent_62%)]" />
      <div className="pointer-events-none absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-white/85 to-transparent" />
      <div className="pointer-events-none absolute inset-x-0 bottom-0 h-px bg-gradient-to-r from-transparent via-slate-300/45 to-transparent" />
      <div
        className="marquee-track relative flex w-max items-center gap-11 px-8 py-6 sm:gap-14 sm:px-10 sm:py-7"
        style={{ animationPlayState: paused ? "paused" : "running" }}
      >
        {logos.map((logo, idx) => (
          <div
            key={`${logo.src}-${idx}`}
            className="group/logo flex h-10 w-[126px] items-center justify-center rounded-md px-1.5 transition-all duration-300 motion-safe:hover:-translate-y-[1px] sm:h-12 sm:w-[160px]"
          >
            <LogoImage
              src={logo.src}
              alt={logo.alt}
              width={220}
              height={90}
              className="h-full w-full object-contain opacity-[0.9] transition-all duration-300 motion-safe:group-hover/logo:scale-[1.025] group-hover/logo:opacity-100"
            />
          </div>
        ))}
      </div>
      <div className="pointer-events-none absolute inset-y-0 left-0 w-20 bg-gradient-to-r from-[color:var(--color-surface-0-light)] via-white/92 to-transparent" />
      <div className="pointer-events-none absolute inset-y-0 right-0 w-20 bg-gradient-to-l from-[color:var(--color-surface-0-light)] via-white/92 to-transparent" />

      <style jsx>{`
        .marquee-track {
          animation: marquee 32s cubic-bezier(0.22, 1, 0.36, 1) infinite;
        }
        .marquee-track:hover,
        .marquee-track:focus-within {
          animation-play-state: paused;
        }
        @keyframes marquee {
          0% {
            transform: translateX(0);
          }
          100% {
            transform: translateX(-50%);
          }
        }
        @media (prefers-reduced-motion: reduce) {
          .marquee-track {
            animation: none;
          }
        }
      `}</style>
    </div>
  );
}

export function SafetyCompliancePage() {
  const reduceMotion = useReducedMotion() ?? false;
  const [isMarqueePaused, setIsMarqueePaused] = useState(false);

  const revealUp: Variants = reduceMotion
    ? { hidden: { opacity: 1, y: 0 }, show: { opacity: 1, y: 0 } }
    : { hidden: { opacity: 1, y: 10 }, show: { opacity: 1, y: 0 } };

  const stagger: Variants = reduceMotion
    ? { hidden: { opacity: 1 }, show: { opacity: 1 } }
    : { hidden: {}, show: { transition: { staggerChildren: 0.05, delayChildren: 0.03 } } };

  const shardMaskStyle: CSSProperties = {
    background: "var(--color-ssp-cyan-500)",
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
    WebkitMaskImage: "linear-gradient(136deg, rgba(0,0,0,0.01) 0%, rgba(0,0,0,0.12) 30%, rgba(0,0,0,0.86) 63%, #000 100%)",
    maskImage: "linear-gradient(136deg, rgba(0,0,0,0.01) 0%, rgba(0,0,0,0.12) 30%, rgba(0,0,0,0.86) 63%, #000 100%)",
  };

  return (
    <div className="bg-[color:var(--color-surface-0-light)]">
      <section
        aria-labelledby="safety-compliance-heading"
        className="relative overflow-hidden border-b border-white/10 bg-[linear-gradient(135deg,var(--color-company-hero-midnight-start)_0%,var(--color-company-ink)_52%,var(--color-company-hero-midnight-end)_100%)] py-18 sm:py-22 lg:py-24"
      >
        <div className="pointer-events-none absolute inset-0" aria-hidden>
          <div className="absolute inset-0 bg-[radial-gradient(62%_64%_at_88%_45%,rgba(56,189,248,0.14),rgba(56,189,248,0.02)_56%,transparent_100%)]" />
          <div className="absolute inset-0 bg-[radial-gradient(55%_58%_at_8%_100%,rgba(2,132,199,0.16),transparent_72%)]" />
        </div>

        <div className={COMPANY_HERO_SHARD_FRAME} aria-hidden>
          <div className={COMPANY_HERO_SHARD_FRAME_INNER}>
            <motion.div
              initial={reduceMotion ? { opacity: 0.74 } : { opacity: 0.04, x: -34, y: 20 }}
              animate={reduceMotion ? { opacity: 0.74 } : { opacity: 0.84, x: 0, y: 0 }}
              transition={{ duration: reduceMotion ? 0 : 0.66, ease: [0.22, 1, 0.36, 1] }}
              className={COMPANY_HERO_SHARD_BOX}
              style={shardFadeStyle}
            >
              <div className="h-full w-full" style={shardMaskStyle} />
            </motion.div>
          </div>
        </div>

        <Container className="site-page-container relative z-10">
          <motion.div
            initial="hidden"
            animate="show"
            variants={stagger}
            className="relative max-w-[44rem]"
          >
            <motion.div
              variants={revealUp}
              transition={{ duration: reduceMotion ? 0 : 0.32, ease: "easeOut" }}
              className="mb-5"
            >
              <Link
                href="/about-us"
                className={cn(
                  "inline-flex items-center gap-1.5 rounded text-xs font-medium text-white/50 transition-colors hover:text-white/75",
                  FOCUS_RING_LIGHT,
                )}
              >
                <ChevronLeft className="h-3.5 w-3.5" />
                About SSP
              </Link>
            </motion.div>

            <motion.div
              variants={revealUp}
              transition={{ duration: reduceMotion ? 0 : 0.32, ease: "easeOut" }}
            >
              <SectionSignalEyebrow label={safetyCompliancePage.hero.sectionLabel} light />
            </motion.div>

            <motion.h1
              id="safety-compliance-heading"
              variants={revealUp}
              transition={{ duration: reduceMotion ? 0 : 0.35, ease: "easeOut" }}
              className="mt-4 max-w-[20ch] text-balance text-[2.05rem] font-bold leading-[1.04] tracking-tight text-white sm:text-[2.45rem] lg:text-[2.92rem]"
            >
              {safetyCompliancePage.hero.title}
            </motion.h1>

            <motion.p
              variants={revealUp}
              transition={{ duration: reduceMotion ? 0 : 0.32, ease: "easeOut" }}
              className="mt-4 max-w-[54ch] text-[14.25px] leading-[1.74] text-white/74 sm:text-[15px]"
            >
              {safetyCompliancePage.hero.subtitle}
            </motion.p>
          </motion.div>
        </Container>
      </section>

      <ModeSolutionOverviewSection
        slug="safety-compliance"
        section={safetyCompliancePage.complianceOverview}
        accent="var(--color-ssp-cyan-500)"
        scrollMarginTop={SAFETY_SECTION_SCROLL_MARGIN}
      />

      <section
        className="relative overflow-hidden border-b border-[color:var(--color-border-light-soft)] bg-[color:var(--color-surface-0-light)] py-18 sm:py-20 lg:py-24"
        aria-labelledby="safety-operating-sequence-heading"
      >
        <div className="pointer-events-none absolute inset-0" aria-hidden>
          <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-[color:var(--color-ssp-cyan-500)]/24 to-transparent" />
          <div
            className="absolute left-0 top-0 h-[min(22rem,56vh)] w-full max-w-4xl opacity-[0.045]"
            style={{
              backgroundImage:
                "linear-gradient(to right, var(--color-company-companies-grid-line) 1px, transparent 1px), linear-gradient(to bottom, var(--color-company-companies-grid-line) 1px, transparent 1px)",
              backgroundSize: "62px 62px",
              maskImage: "radial-gradient(118% 98% at 0% 0%, black 0%, rgba(0,0,0,0.92) 60%, transparent 100%)",
              WebkitMaskImage:
                "radial-gradient(118% 98% at 0% 0%, black 0%, rgba(0,0,0,0.92) 60%, transparent 100%)",
            }}
          />
        </div>
        <Container className="site-page-container">
          <motion.div
            initial="hidden"
            whileInView="show"
            viewport={{ once: true, amount: 0.15 }}
            variants={stagger}
            className="relative"
          >
            <motion.div variants={revealUp} transition={{ duration: reduceMotion ? 0 : 0.35, ease: "easeOut" }}>
              <SectionSignalEyebrow label="Operating sequence" />
            </motion.div>
            <motion.h2
              id="safety-operating-sequence-heading"
              variants={revealUp}
              transition={{ duration: reduceMotion ? 0 : 0.38, ease: "easeOut" }}
              className="mt-4 max-w-[18ch] text-[2rem] font-bold leading-[1.05] tracking-tight text-[color:var(--color-text-strong)] sm:text-[2.4rem]"
            >
              {safetyCompliancePage.operatingApproach.title}
            </motion.h2>
            <motion.p
              variants={revealUp}
              transition={{ duration: reduceMotion ? 0 : 0.35, ease: "easeOut" }}
              className="mt-4 max-w-[70ch] text-[15px] leading-[1.84] text-[color:var(--color-muted)] sm:text-[16px]"
            >
              {safetyCompliancePage.operatingApproach.intro}
            </motion.p>

            <motion.div variants={stagger} className="mt-10">
              <div className="md:hidden">
                <ol className="relative ml-2 border-l border-[color:var(--color-border-light)] pl-6">
                  {safetyCompliancePage.operatingApproach.steps.map((step, idx) => (
                    <motion.li
                      key={step.title}
                      variants={revealUp}
                      transition={{ duration: reduceMotion ? 0 : 0.35, ease: "easeOut" }}
                      className="relative pb-8 last:pb-0"
                    >
                      <span className="absolute -left-[1.72rem] top-1 inline-flex h-5 w-5 items-center justify-center rounded-full border border-[color:var(--color-border-light)] bg-white text-[10px] font-semibold text-[color:var(--color-text-strong)]">
                        {idx + 1}
                      </span>
                      <h3 className="text-[1rem] font-semibold leading-snug tracking-tight text-[color:var(--color-text-strong)]">
                        {step.title}
                      </h3>
                      <p className="mt-2 text-[13.5px] leading-[1.74] text-[color:var(--color-muted)]">
                        {step.body}
                      </p>
                    </motion.li>
                  ))}
                </ol>
              </div>

              <div className="hidden md:grid md:grid-cols-4 md:gap-4">
                {safetyCompliancePage.operatingApproach.steps.map((step, idx) => (
                  <motion.article
                    key={step.title}
                    variants={revealUp}
                    transition={{ duration: reduceMotion ? 0 : 0.35, ease: "easeOut" }}
                    className="relative rounded-2xl border border-[color:var(--color-border-light)] bg-white p-5 shadow-[var(--shadow-company-card-soft)] transition-all duration-200 hover:-translate-y-[1px] hover:shadow-[0_14px_28px_rgba(2,6,23,0.12)]"
                  >
                    <div className="absolute inset-x-5 top-0 h-px bg-gradient-to-r from-transparent via-[color:var(--color-menu-accent)]/50 to-transparent" />
                    <span className="inline-flex h-6 min-w-6 items-center justify-center rounded-md border border-[color:var(--color-border-light)] bg-[color:var(--color-surface-1-light)] px-1.5 text-[10px] font-semibold text-[color:var(--color-subtle)]">
                      0{idx + 1}
                    </span>
                    <h3 className="mt-3 text-[1rem] font-semibold leading-snug tracking-tight text-[color:var(--color-text-strong)]">
                      {step.title}
                    </h3>
                    <p className="mt-2 text-[13.5px] leading-[1.74] text-[color:var(--color-muted)]">
                      {step.body}
                    </p>
                  </motion.article>
                ))}
              </div>
            </motion.div>
          </motion.div>
        </Container>
      </section>

      <section
        className="relative overflow-hidden border-y border-white/8 bg-[linear-gradient(145deg,var(--color-company-hero-midnight-start),var(--color-company-ink)_55%,var(--color-company-hero-midnight-end))] py-18 sm:py-20 lg:py-24"
        aria-labelledby="regulatory-coverage-heading"
      >
        <div className="pointer-events-none absolute inset-0" aria-hidden>
          <div className="absolute -left-24 bottom-0 h-72 w-72 rounded-full bg-[color:var(--color-ssp-cyan-500)]/10 blur-[95px]" />
          <div className="absolute -right-24 top-0 h-72 w-72 rounded-full bg-white/5 blur-[110px]" />
        </div>

        <Container className="site-page-container relative">
          <motion.div
            initial="hidden"
            whileInView="show"
            viewport={{ once: true, amount: 0.15 }}
            variants={stagger}
            className="grid gap-8 lg:grid-cols-12 lg:gap-10"
          >
            <div className="lg:col-span-5">
              <motion.div variants={revealUp} transition={{ duration: reduceMotion ? 0 : 0.35, ease: "easeOut" }}>
                <SectionSignalEyebrow label="Regulatory coverage" light />
              </motion.div>
              <motion.h2
                id="regulatory-coverage-heading"
                variants={revealUp}
                transition={{ duration: reduceMotion ? 0 : 0.38, ease: "easeOut" }}
                className="mt-4 max-w-[18ch] text-[2rem] font-bold leading-[1.05] tracking-tight text-white sm:text-[2.4rem]"
              >
                {safetyCompliancePage.regulatoryCoverage.title}
              </motion.h2>
              <motion.p
                variants={revealUp}
                transition={{ duration: reduceMotion ? 0 : 0.35, ease: "easeOut" }}
                className="mt-4 max-w-[66ch] text-[15px] leading-[1.85] text-white/72 sm:text-[16px]"
              >
                {safetyCompliancePage.regulatoryCoverage.intro}
              </motion.p>
            </div>

            <motion.div variants={stagger} className="grid gap-4 lg:col-span-7">
              {safetyCompliancePage.regulatoryCoverage.markets.map((entry) => (
                <motion.article
                  key={entry.market}
                  variants={revealUp}
                  transition={{ duration: reduceMotion ? 0 : 0.35, ease: "easeOut" }}
                  className="rounded-2xl border border-white/14 bg-white/[0.05] p-5 shadow-[var(--shadow-glass-card)] backdrop-blur-sm"
                >
                  <div className="flex items-center justify-between gap-4">
                    <p className="text-[10.5px] font-semibold uppercase tracking-[0.15em] text-white/50">
                      {entry.market}
                    </p>
                    <span className="rounded-full border border-white/16 bg-white/[0.05] px-2.5 py-1 text-[10px] font-semibold tracking-[0.14em] text-white/58 uppercase">
                      {entry.authority}
                    </span>
                  </div>
                  <p className="mt-3 text-[13.5px] leading-[1.76] text-white/66">{entry.controls}</p>
                </motion.article>
              ))}
              <motion.p
                variants={revealUp}
                transition={{ duration: reduceMotion ? 0 : 0.35, ease: "easeOut" }}
                className="text-[12px] leading-[1.7] text-white/46"
              >
                {safetyCompliancePage.regulatoryCoverage.note}
              </motion.p>
            </motion.div>
          </motion.div>
        </Container>
      </section>

      <section className="border-b border-[color:var(--color-border-light-soft)] py-18 sm:py-20 lg:py-24" aria-labelledby="certification-partners-heading">
        <Container className="site-page-container">
          <motion.div
            initial="hidden"
            whileInView="show"
            viewport={{ once: true, amount: 0.15 }}
            variants={stagger}
            className="mx-auto max-w-4xl text-center"
          >
            <motion.div variants={revealUp} transition={{ duration: reduceMotion ? 0 : 0.35, ease: "easeOut" }}>
              <SectionSignalEyebrow label="Certification partners" />
            </motion.div>
            <motion.h2
              id="certification-partners-heading"
              variants={revealUp}
              transition={{ duration: reduceMotion ? 0 : 0.38, ease: "easeOut" }}
              className="mt-4 text-[2rem] font-bold leading-[1.05] tracking-tight text-[color:var(--color-text-strong)] sm:text-[2.35rem]"
            >
              {safetyCompliancePage.certificationPartners.title}
            </motion.h2>
            <motion.p
              variants={revealUp}
              transition={{ duration: reduceMotion ? 0 : 0.35, ease: "easeOut" }}
              className="mx-auto mt-4 max-w-[74ch] text-[15px] leading-[1.84] text-[color:var(--color-muted)] sm:text-[16px]"
            >
              {safetyCompliancePage.certificationPartners.body}
            </motion.p>
            <motion.div
              variants={revealUp}
              transition={{ duration: reduceMotion ? 0 : 0.35, ease: "easeOut" }}
              className="mt-6 flex justify-center"
            >
              <button
                type="button"
                onClick={() => setIsMarqueePaused((prev) => !prev)}
                aria-pressed={isMarqueePaused}
                className={cn(
                  "inline-flex h-9 items-center gap-2 rounded-full border border-[color:var(--color-border-light)] bg-white px-4 text-xs font-semibold text-[color:var(--color-text-strong)] transition-colors hover:bg-[color:var(--color-surface-1-light)]",
                  FOCUS_RING_LIGHT,
                )}
              >
                {isMarqueePaused ? <Play className="h-3.5 w-3.5" /> : <Pause className="h-3.5 w-3.5" />}
                {isMarqueePaused ? "Resume logo motion" : "Pause logo motion"}
              </button>
            </motion.div>
          </motion.div>
          <motion.div
            variants={revealUp}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true, amount: 0.2 }}
            transition={{ duration: reduceMotion ? 0 : 0.35, ease: "easeOut" }}
            className="mt-8"
          >
            <CertificationMarquee paused={isMarqueePaused} />
          </motion.div>
        </Container>
      </section>

      <section className="border-b border-[color:var(--color-border-light-soft)] py-18 sm:py-20 lg:py-24" aria-labelledby="visibility-control-heading">
        <Container className="site-page-container">
          <motion.div
            initial="hidden"
            whileInView="show"
            viewport={{ once: true, amount: 0.15 }}
            variants={stagger}
            className="grid gap-8 lg:grid-cols-12 lg:gap-10"
          >
            <div className="lg:col-span-5">
              <motion.div variants={revealUp} transition={{ duration: reduceMotion ? 0 : 0.35, ease: "easeOut" }}>
                <SectionSignalEyebrow label="Technology, visibility, and control" />
              </motion.div>
              <motion.h2
                id="visibility-control-heading"
                variants={revealUp}
                transition={{ duration: reduceMotion ? 0 : 0.38, ease: "easeOut" }}
                className="mt-4 max-w-[18ch] text-[2rem] font-bold leading-[1.05] tracking-tight text-[color:var(--color-text-strong)] sm:text-[2.4rem]"
              >
                {safetyCompliancePage.visibilityControl.title}
              </motion.h2>
              <motion.p
                variants={revealUp}
                transition={{ duration: reduceMotion ? 0 : 0.35, ease: "easeOut" }}
                className="mt-4 max-w-[68ch] text-[15px] leading-[1.84] text-[color:var(--color-muted)] sm:text-[16px]"
              >
                {safetyCompliancePage.visibilityControl.intro}
              </motion.p>
            </div>

            <motion.div variants={stagger} className="grid gap-4 lg:col-span-7 md:grid-cols-3">
              {safetyCompliancePage.visibilityControl.items.map((item) => {
                const Icon = VISIBILITY_CONTROL_ICONS[item.icon];

                return (
                  <motion.article
                    key={item.title}
                    variants={revealUp}
                    transition={{ duration: reduceMotion ? 0 : 0.35, ease: "easeOut" }}
                    className="rounded-2xl border border-[color:var(--color-border-light)] bg-white p-5 shadow-[var(--shadow-company-card-soft)]"
                  >
                    <span className="inline-flex h-9 w-9 items-center justify-center rounded-lg border border-[color:var(--color-border-light)] bg-[color:var(--color-surface-1-light)] text-[color:var(--color-menu-accent)]">
                      <Icon className="h-4 w-4" aria-hidden />
                    </span>
                    <h3 className="text-[1.02rem] font-semibold leading-snug tracking-tight text-[color:var(--color-text-strong)]">
                      {item.title}
                    </h3>
                    <p className="mt-3 text-[13.5px] leading-[1.76] text-[color:var(--color-muted)]">
                      {item.body}
                    </p>
                  </motion.article>
                );
              })}
            </motion.div>
          </motion.div>
        </Container>
      </section>

      <SharedFaqSection
        eyebrow={<SectionSignalEyebrow label="FAQ" light />}
        title="Questions procurement and operations teams ask first."
        description="Clear answers on operating controls, regulatory awareness, and shipment governance across North American freight lanes."
        items={safetyCompliancePage.faqs.map((item) => ({ q: item.question, a: item.answer }))}
        theme="dark"
        panelIdPrefix="safety-faq"
      />

      <StandardFinalCta
        variant="safety"
        headingId="safety-final-cta-heading"
        trackingLocation="safety_compliance_final_cta"
        data={safetyCompliancePage.finalCta}
        eyebrow={<SectionSignalEyebrow label={safetyCompliancePage.finalCta.kicker} light />}
        titleClassName="max-w-[18ch] text-[1.9rem] leading-[1.04] sm:text-[2.4rem]"
        bodyClassName="mt-4 max-w-[70ch] text-[15px] leading-[1.84] text-white/72 sm:text-[16px]"
      />
    </div>
  );
}
