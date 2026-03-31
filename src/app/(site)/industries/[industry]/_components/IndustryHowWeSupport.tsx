"use client";

import { motion, useReducedMotion, type Variants } from "framer-motion";
import { Container } from "@/app/(site)/components/layout/Container";
import { Section } from "@/app/(site)/components/layout/Section";
import { SectionEyebrow } from "@/app/(site)/components/ui/SectionEyebrow";
import type { IndustryPageModel } from "@/config/industryPages";
import { cn } from "@/lib/cn";
import { THEME_ACCENT, THEME_BG, getThemeOrbs, getThemeBarGradient } from "./industryTheme";

export function IndustryHowWeSupport({ model }: { model: IndustryPageModel }) {
  const reduceMotion = useReducedMotion();
  const { howWeSupport, hero } = model;
  const theme = hero.theme;
  const accentColor = THEME_ACCENT[theme];
  const sectionBg = THEME_BG[theme];
  const orbs = getThemeOrbs(theme);
  const barGradient = getThemeBarGradient(theme);
  const splitAsideContent = howWeSupport.aside
    ? {
        badgeLabel: howWeSupport.aside.badge,
        title: howWeSupport.aside.title,
        body: howWeSupport.aside.body,
        bullets: howWeSupport.aside.bullets,
        stats: howWeSupport.aside.stats,
      }
    : null;

  const fadeUp: Variants = reduceMotion
    ? { hidden: { opacity: 1, y: 0 }, show: { opacity: 1, y: 0 } }
    : {
        hidden: { opacity: 1, y: 10 },
        show: { opacity: 1, y: 0, transition: { duration: 0.35, ease: "easeOut" } },
      };
  const stagger: Variants = reduceMotion
    ? { hidden: { opacity: 1 }, show: { opacity: 1 } }
    : { hidden: {}, show: { transition: { staggerChildren: 0.05, delayChildren: 0.03 } } };

  const sectionHeadingId = "how-we-support-heading";

  return (
    <Section
      id="how-we-support"
      variant="dark"
      aria-labelledby={sectionHeadingId}
      className="relative scroll-mt-24 overflow-hidden sm:scroll-mt-28"
      style={{ backgroundColor: sectionBg }}
    >
      {/* Noise texture for premium depth */}
      <div
        className="pointer-events-none absolute inset-0 opacity-[0.025]"
        style={{
          backgroundImage:
            "url(\"data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E\")",
        }}
        aria-hidden
      />

      <div aria-hidden className="pointer-events-none absolute inset-0">
        <div
          className="absolute top-6 -left-24 h-64 w-64 rounded-full blur-3xl"
          style={{ backgroundColor: orbs.main }}
        />
        <div
          className="absolute -right-24 bottom-10 h-72 w-72 rounded-full blur-3xl"
          style={{ backgroundColor: orbs.secondary }}
        />
      </div>

      <Container className="site-page-container relative">
        <motion.div
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, amount: 0.15 }}
          variants={stagger}
        >
          <motion.header variants={fadeUp} className="max-w-3xl">
            <SectionEyebrow
              label="How We Support"
              accentColor={accentColor}
              light
            />
            <h2
              id={sectionHeadingId}
              className="mt-4 text-[1.6rem] leading-tight font-semibold tracking-tight text-white sm:text-[1.95rem] lg:text-[2.2rem]"
            >
              {howWeSupport.sectionTitle}
            </h2>
            <p className="mt-3 text-sm leading-[1.8] text-white/55 sm:text-[15px]">
              {howWeSupport.intro}
            </p>
          </motion.header>

          {splitAsideContent ? (
            <motion.div
              variants={stagger}
              className="mt-10 grid gap-6 sm:mt-12 lg:grid-cols-12 lg:gap-8"
            >
              <motion.aside variants={fadeUp} className="lg:col-span-4">
                <div className="overflow-hidden rounded-[28px] border border-white/10 bg-white/[0.04] p-6 backdrop-blur-sm sm:p-7 lg:sticky lg:top-28">
                  <p
                    className="text-[10.5px] font-semibold uppercase tracking-[0.16em]"
                    style={{ color: `${accentColor}cc` }}
                  >
                    {splitAsideContent.badgeLabel}
                  </p>
                  <h3 className="mt-3 text-[1.35rem] font-semibold leading-tight tracking-tight text-white sm:text-[1.5rem]">
                    {splitAsideContent.title}
                  </h3>
                  <p className="mt-4 text-[13.5px] leading-[1.8] text-white/58 sm:text-[14px]">
                    {splitAsideContent.body}
                  </p>

                  <div className="mt-6 space-y-3">
                    {splitAsideContent.bullets.map((item) => (
                      <div
                        key={item}
                        className="rounded-2xl border border-white/8 bg-black/10 px-4 py-3 text-[12px] leading-[1.65] text-white/72"
                      >
                        {item}
                      </div>
                    ))}
                  </div>

                  <div className="mt-6 grid grid-cols-2 gap-3">
                    {splitAsideContent.stats.map((item) => (
                      <div
                        key={item.label}
                        className="rounded-2xl border border-white/8 bg-white/[0.03] px-3 py-3 text-center"
                      >
                        <p className="text-sm font-semibold tracking-tight text-white">{item.value}</p>
                        <p className="mt-1 text-[10px] uppercase tracking-[0.14em] text-white/38">{item.label}</p>
                      </div>
                    ))}
                  </div>
                </div>
              </motion.aside>

              <motion.div variants={stagger} className="grid gap-4 sm:grid-cols-2 lg:col-span-8">
                {howWeSupport.cards.map((card) => (
                  <motion.article
                    key={card.title}
                    variants={fadeUp}
                    className={cn(
                      "group relative overflow-hidden rounded-2xl border border-white/8 bg-white/[0.03] p-6 backdrop-blur-sm transition-all duration-300 sm:p-7",
                      "hover:border-white/16 hover:bg-white/[0.06] hover:shadow-[0_20px_40px_rgba(2,6,23,0.18)]",
                    )}
                  >
                    <div
                      className="absolute inset-x-0 top-0 h-[2px] opacity-70"
                      style={{ background: barGradient }}
                      aria-hidden
                    />

                    {card.eyebrow ? (
                      <p
                        className="mb-3 text-[10.5px] font-semibold uppercase tracking-[0.14em]"
                        style={{ color: `${accentColor}cc` }}
                      >
                        {card.eyebrow}
                      </p>
                    ) : null}

                    <h3 className="text-[1.05rem] font-semibold leading-tight tracking-tight text-white sm:text-[1.1rem]">
                      {card.title}
                    </h3>

                    <p className="mt-2.5 text-[13.5px] leading-[1.75] text-white/60 sm:text-[14px]">
                      {card.summary}
                    </p>

                    <p className="mt-2 text-[13px] leading-[1.7] text-white/45 sm:text-[13.5px]">
                      {card.details}
                    </p>

                    {card.metric ? (
                      <span
                        className="mt-4 inline-flex items-center rounded-full border border-white/10 px-2.5 py-1 text-[10px] font-semibold uppercase tracking-[0.12em]"
                        style={{ color: `${accentColor}cc` }}
                      >
                        {card.metric}
                      </span>
                    ) : null}
                  </motion.article>
                ))}
              </motion.div>
            </motion.div>
          ) : (
            <motion.div
              variants={stagger}
              className="mt-10 grid gap-4 sm:mt-12 sm:grid-cols-2"
            >
              {howWeSupport.cards.map((card) => (
                <motion.article
                  key={card.title}
                  variants={fadeUp}
                  className={cn(
                    "group relative overflow-hidden rounded-2xl border border-white/8 bg-white/[0.03] p-6 backdrop-blur-sm transition-all duration-300 sm:p-7",
                    "hover:border-white/16 hover:bg-white/[0.06]",
                  )}
                >
                  <div
                    className="absolute inset-x-0 top-0 h-[2px] opacity-70"
                    style={{ background: barGradient }}
                    aria-hidden
                  />

                  {card.eyebrow ? (
                    <p
                      className="mb-3 text-[10.5px] font-semibold uppercase tracking-[0.14em]"
                      style={{ color: `${accentColor}cc` }}
                    >
                      {card.eyebrow}
                    </p>
                  ) : null}

                  <h3 className="text-[1.05rem] font-semibold leading-tight tracking-tight text-white sm:text-[1.1rem]">
                    {card.title}
                  </h3>

                  <p className="mt-2.5 text-[13.5px] leading-[1.75] text-white/60 sm:text-[14px]">
                    {card.summary}
                  </p>

                  <p className="mt-2 text-[13px] leading-[1.7] text-white/45 sm:text-[13.5px]">
                    {card.details}
                  </p>

                  {card.metric ? (
                    <span
                      className="mt-4 inline-flex items-center rounded-full border border-white/10 px-2.5 py-1 text-[10px] font-semibold uppercase tracking-[0.12em]"
                      style={{ color: `${accentColor}cc` }}
                    >
                      {card.metric}
                    </span>
                  ) : null}
                </motion.article>
              ))}
            </motion.div>
          )}
        </motion.div>
      </Container>
    </Section>
  );
}
