"use client";

import { useRef } from "react";
import Image from "next/image";
import Link from "next/link";
import { motion, useReducedMotion, useScroll, useTransform, type Variants } from "framer-motion";
import { Container } from "@/app/(site)/components/layout/Container";
import { SectionSignalEyebrow } from "@/app/(site)/components/ui/SectionSignalEyebrow";
import { cn } from "@/lib/cn";

type HeroData = Readonly<{
  title: string;
  description: string;
  ctas: {
    primary: { label: string; href: string; ctaId: string };
    secondary: { label: string; href: string; ctaId: string };
  };
}>;

const FOCUS_RING =
  "focus:outline-none focus-visible:ring-2 focus-visible:ring-white/60 focus-visible:ring-offset-2 focus-visible:ring-offset-[color:var(--color-company-ink)]";

const HERO_BACKGROUND =
  "linear-gradient(135deg, var(--color-company-hero-midnight-start) 0%, var(--color-company-hero-midnight-end) 100%)";

const PROOF_ITEMS = [
  { value: "Compliance-First", label: "Operating Standard" },
  { value: "Cross-Border", label: "Canada • U.S. • Mexico" },
  { value: "Asset-Based", label: "Capacity + Accountability" },
] as const;

const HERO_CAPTION_EYEBROW = "Enterprise Freight Positioning";
const HERO_CAPTION_BODY =
  "A cross-border operating model built for controlled execution, audit-ready compliance, and clear accountability.";

export function AboutSspHero({ data }: { data: HeroData }) {
  const sectionRef = useRef<HTMLElement>(null);
  const reduceMotion = useReducedMotion();
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start end", "end start"],
  });
  const visualTranslateY = useTransform(scrollYProgress, [0, 0.5, 1], [14, 0, -18]);
  const visualScale = useTransform(scrollYProgress, [0, 0.5, 1], [1.02, 1, 1.03]);

  const stagger: Variants = reduceMotion
    ? { hidden: { opacity: 1 }, show: { opacity: 1 } }
    : { hidden: {}, show: { transition: { staggerChildren: 0.08, delayChildren: 0.05 } } };

  const reveal: Variants = reduceMotion
    ? { hidden: { opacity: 1, y: 0 }, show: { opacity: 1, y: 0 } }
    : { hidden: { opacity: 0, y: 18 }, show: { opacity: 1, y: 0 } };

  return (
    <section
      ref={sectionRef}
      aria-labelledby="about-hero-heading"
      className="relative overflow-hidden border-b border-white/6 py-16 sm:py-20 lg:py-24"
      style={{ background: HERO_BACKGROUND }}
    >
      {/* Ambient background system */}
      <div className="pointer-events-none absolute inset-0">
        <div
          className="absolute inset-0 opacity-[0.028]"
          style={{
            backgroundImage:
              "linear-gradient(to right, var(--color-company-hero-grid-line) 1px, transparent 1px), linear-gradient(to bottom, var(--color-company-hero-grid-line) 1px, transparent 1px)",
            backgroundSize: "110px 110px",
          }}
        />
        <div
          className="absolute inset-0"
          style={{
            background:
              "radial-gradient(ellipse at top, var(--color-company-hero-glow-cyan) 0%, transparent 55%)",
          }}
        />
        <div
          className="absolute inset-0"
          style={{
            background:
              "radial-gradient(ellipse at bottom, var(--color-company-hero-glow-brand) 0%, transparent 52%)",
          }}
        />
        <div className="absolute inset-x-0 top-0 h-24 bg-gradient-to-b from-[color:var(--color-company-ink)] to-transparent" />
        <div className="absolute inset-x-0 bottom-0 h-28 bg-gradient-to-t from-[color:var(--color-company-ink)] to-transparent" />
      </div>

      {/* Noise texture */}
      <div
        className="pointer-events-none absolute inset-0 opacity-[0.03]"
        style={{
          backgroundImage:
            "url(\"data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E\")",
        }}
        aria-hidden
      />

      {/* Bottom accent rule */}
      <div
        className="pointer-events-none absolute inset-x-0 bottom-0 h-px"
        style={{ background: "linear-gradient(90deg, transparent 5%, var(--color-company-hero-accent) 50%, transparent 95%)" }}
        aria-hidden
      />

      <Container className="site-page-container relative">
        <motion.div
          initial="hidden"
          animate="show"
          variants={stagger}
          className="relative z-20 grid items-center gap-8 lg:min-h-[68vh] lg:grid-cols-12 lg:gap-12"
        >
          <div className="px-1 text-left sm:px-2 lg:col-span-6 lg:px-0">
            <motion.div
              variants={reveal}
              transition={{ duration: reduceMotion ? 0 : 0.35, ease: "easeOut" }}
              className="flex justify-start"
            >
              <SectionSignalEyebrow label="About SSP Group" light />
            </motion.div>

            <motion.h1
              id="about-hero-heading"
              variants={reveal}
              transition={{ duration: reduceMotion ? 0 : 0.45, ease: "easeOut" }}
              className="mt-5 max-w-[18ch] text-[clamp(2.4rem,7.2vw,4rem)] font-bold leading-[0.94] tracking-tight text-white"
              style={{ textShadow: "var(--shadow-company-hero-heading)" }}
            >
              {data.title}
            </motion.h1>

            <motion.p
              variants={reveal}
              transition={{ duration: reduceMotion ? 0 : 0.4, ease: "easeOut" }}
              className="mt-5 max-w-[58ch] text-[15.5px] leading-[1.74] text-white/92 sm:text-[16px]"
              style={{ textShadow: "var(--shadow-company-hero-body)" }}
            >
              {data.description}
            </motion.p>

            <motion.div
              variants={reveal}
              transition={{ duration: reduceMotion ? 0 : 0.4, ease: "easeOut" }}
              className="mt-8 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-start"
            >
              <Link
                href={data.ctas.primary.href}
                data-cta-id={data.ctas.primary.ctaId}
                className={cn(
                  "inline-flex h-12 w-full items-center justify-center rounded-xl px-7 text-sm font-semibold transition-all duration-200 hover:-translate-y-[1px] hover:shadow-lg sm:w-auto",
                  "bg-[color:var(--color-brand-600)] text-white shadow-[var(--shadow-action-primary)]",
                  FOCUS_RING,
                )}
              >
                {data.ctas.primary.label}
              </Link>
              <Link
                href={data.ctas.secondary.href}
                data-cta-id={data.ctas.secondary.ctaId}
                className={cn(
                  "inline-flex h-12 w-full items-center justify-center rounded-xl border border-white/22 bg-black/20 px-7 text-sm font-semibold text-white/92 backdrop-blur-sm transition-all duration-200 hover:border-white/35 hover:bg-black/28 hover:text-white sm:w-auto",
                  FOCUS_RING,
                )}
              >
                {data.ctas.secondary.label}
              </Link>
            </motion.div>

            {/* Proof strip */}
            <motion.div
              initial="hidden"
              animate="show"
              variants={stagger}
              className="mt-7 hidden max-w-[44rem] gap-2 md:grid md:grid-cols-3 lg:mx-0"
            >
              {PROOF_ITEMS.map((item) => (
                <motion.div
                  key={item.label}
                  variants={reveal}
                  transition={{ duration: reduceMotion ? 0 : 0.45, ease: "easeOut" }}
                  className="min-h-[72px] rounded-xl border border-white/8 bg-white/[0.03] px-3 py-2.5 backdrop-blur-sm sm:min-h-[84px] sm:rounded-2xl sm:border-white/9 sm:bg-[color:var(--color-glass-bg)] sm:px-3.5 sm:py-3"
                >
                  <p className="text-[0.95rem] font-semibold tracking-tight text-white">{item.value}</p>
                  <p className="mt-1 text-[10.5px] uppercase tracking-[0.13em] text-white/66">{item.label}</p>
                </motion.div>
              ))}
            </motion.div>

            <motion.div
              variants={reveal}
              transition={{ duration: reduceMotion ? 0 : 0.45, ease: "easeOut", delay: reduceMotion ? 0 : 0.08 }}
              className="mt-6 block lg:hidden"
            >
              <div className="relative overflow-hidden rounded-2xl border border-[color:var(--color-glass-border)] bg-[color:var(--color-glass-bg)] p-1.5 backdrop-blur-sm">
                <div className="relative aspect-[16/10] overflow-hidden rounded-[0.95rem]">
                  <Image
                    src="/_optimized/company/about-hero-ssp.webp"
                    alt="SSP Group fleet and terminal operations"
                    fill
                    priority
                    className="object-cover object-[58%_42%]"
                    sizes="100vw"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/35 via-transparent to-black/8" />
                </div>
              </div>
            </motion.div>
          </div>

          <motion.div
            variants={reveal}
            transition={{ duration: reduceMotion ? 0 : 0.45, ease: "easeOut", delay: reduceMotion ? 0 : 0.08 }}
            className="hidden lg:col-span-6 lg:block"
          >
            <div className="relative overflow-hidden rounded-[1.35rem] border border-[color:var(--color-glass-border)] bg-[color:var(--color-glass-bg)] p-2 backdrop-blur-sm">
              <motion.div
                className="relative aspect-[4/3] overflow-hidden rounded-[1.1rem]"
                style={
                  reduceMotion
                    ? undefined
                    : {
                        y: visualTranslateY,
                        scale: visualScale,
                      }
                }
              >
                <Image
                  src="/_optimized/company/about-hero-ssp.webp"
                  alt="SSP Group logistics terminal and fleet operations"
                  fill
                  priority
                  className="object-cover object-[58%_42%]"
                  sizes="(min-width: 1024px) 46vw, 100vw"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/35 via-transparent to-black/5" />
              </motion.div>

              <div className="absolute right-5 bottom-5 left-5 rounded-xl border border-[color:var(--color-glass-border)] bg-black/38 px-[18px] py-3.5 backdrop-blur-sm">
                <p className="text-[10px] font-semibold tracking-[0.14em] text-white/55 uppercase">
                  {HERO_CAPTION_EYEBROW}
                </p>
                <p className="mt-1.5 text-[0.95rem] leading-[1.68] font-medium text-white/90">
                  {HERO_CAPTION_BODY}
                </p>
              </div>
            </div>
          </motion.div>
        </motion.div>
      </Container>
    </section>
  );
}
