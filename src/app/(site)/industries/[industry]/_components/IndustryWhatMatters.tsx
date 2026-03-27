"use client";

import { motion, useReducedMotion, type Variants } from "framer-motion";
import { Container } from "@/app/(site)/components/layout/Container";
import { Section } from "@/app/(site)/components/layout/Section";
import { SectionEyebrow } from "@/app/(site)/components/ui/SectionEyebrow";
import type { IndustryPageModel } from "@/config/industryPages";
import { cn } from "@/lib/cn";
import { THEME_ACCENT, THEME_LIGHT_BG } from "./industryTheme";
import { IndustrySectionWidget } from "./widgets";

export function IndustryWhatMatters({ model }: { model: IndustryPageModel }) {
  const reduceMotion = useReducedMotion();
  const { whatMatters, hero } = model;
  const theme = hero.theme;
  const sectionBg = THEME_LIGHT_BG[theme];
  const accentColor = THEME_ACCENT[theme];
  const useRichLayout = true;

  const fadeUp: Variants = reduceMotion
    ? { hidden: { opacity: 1, y: 0 }, show: { opacity: 1, y: 0 } }
    : {
        hidden: { opacity: 0, y: 16 },
        show: { opacity: 1, y: 0, transition: { duration: 0.45, ease: "easeOut" } },
      };
  const stagger: Variants = reduceMotion
    ? { hidden: { opacity: 1 }, show: { opacity: 1 } }
    : { hidden: {}, show: { transition: { staggerChildren: 0.08, delayChildren: 0.04 } } };

  const SECTION_HEADING_ID = "what-matters-heading";

  return (
    <Section
      variant="light"
      id="what-matters"
      aria-labelledby={SECTION_HEADING_ID}
      className="relative scroll-mt-24 overflow-hidden sm:scroll-mt-28"
      style={{ backgroundColor: sectionBg }}
    >
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 opacity-[0.035]"
        style={{
          backgroundImage:
            "radial-gradient(circle, rgba(15,23,42,0.10) 1px, transparent 1px)",
          backgroundSize: "24px 24px",
        }}
      />
      <Container className="site-page-container relative">
        <motion.div
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, amount: 0.15 }}
          variants={stagger}
        >
          {useRichLayout ? (
            <div className="grid gap-6 lg:grid-cols-12 lg:gap-8">
              <motion.div variants={fadeUp} className="lg:col-span-4">
                <div className="lg:sticky lg:top-28">
                  <SectionEyebrow
                    label={whatMatters.eyebrowLabel ?? "Industry Demands"}
                    accentColor={accentColor}
                  />
                  <h2
                    id={SECTION_HEADING_ID}
                    className="mt-4 max-w-sm text-[1.7rem] font-semibold leading-[1.05] tracking-tight text-[color:var(--color-text-light)] sm:text-[2rem] lg:text-[2.25rem]"
                  >
                    {whatMatters.sectionTitle}
                  </h2>
                  <p className="mt-4 max-w-sm text-sm leading-[1.85] text-[color:var(--color-muted-light)] sm:text-[15px]">
                    {whatMatters.intro}
                  </p>

                  <div className="mt-6 space-y-3">
                    {whatMatters.items.map((item, idx) => (
                      <div
                        key={item.title}
                        className="rounded-2xl border border-[color:var(--color-border-light)]/60 bg-white/85 px-4 py-3 shadow-[0_4px_18px_rgba(2,6,23,0.04)] backdrop-blur-sm"
                      >
                        <div className="flex items-center gap-3">
                          <span
                            className="inline-flex h-7 w-7 items-center justify-center rounded-full text-[10px] font-bold"
                            style={{
                              backgroundColor: `${accentColor}10`,
                              color: accentColor,
                            }}
                            aria-hidden
                          >
                            {String(idx + 1).padStart(2, "0")}
                          </span>
                          <p className="text-[13px] font-semibold tracking-tight text-[color:var(--color-text-light)]">
                            {item.title}
                          </p>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </motion.div>

              <motion.div variants={stagger} className="grid gap-4 lg:col-span-8 lg:grid-cols-2 lg:gap-5">
                {whatMatters.items.map((item, idx) => (
                  <motion.article
                    key={item.title}
                    variants={fadeUp}
                    className={cn(
                      "group relative overflow-hidden rounded-[26px] border border-[color:var(--color-border-light)]/60 bg-white p-6 shadow-[0_6px_24px_rgba(2,6,23,0.06)] transition-all duration-300 hover:shadow-[0_12px_32px_rgba(2,6,23,0.09)] sm:p-7",
                      idx === 0 && "lg:col-span-2",
                    )}
                  >
                    <div
                      className="absolute inset-x-0 top-0 h-[2px]"
                      style={{
                        background: `linear-gradient(90deg, ${accentColor} 0%, ${accentColor}40 60%, transparent 100%)`,
                      }}
                      aria-hidden
                    />
                    <span
                      className="mb-4 inline-flex h-8 w-8 items-center justify-center rounded-full text-[10px] font-bold"
                      style={{
                        backgroundColor: `${accentColor}10`,
                        color: accentColor,
                      }}
                      aria-hidden
                    >
                      {String(idx + 1).padStart(2, "0")}
                    </span>
                    <h3 className="text-[1.05rem] font-semibold tracking-tight text-[color:var(--color-text-light)] sm:text-[1.15rem]">
                      {item.title}
                    </h3>
                    <p className="mt-3 text-[13.5px] leading-[1.85] text-[color:var(--color-muted-light)] sm:text-[14px]">
                      {item.body}
                    </p>
                  </motion.article>
                ))}
              </motion.div>
            </div>
          ) : (
            <>
              <motion.header variants={fadeUp} className="max-w-2xl">
                <SectionEyebrow
                  label={whatMatters.eyebrowLabel ?? "Industry Demands"}
                  accentColor={accentColor}
                />
                <h2
                  id={SECTION_HEADING_ID}
                  className="mt-4 text-[1.6rem] font-semibold leading-tight tracking-tight text-[color:var(--color-text-light)] sm:text-[1.95rem] lg:text-[2.2rem]"
                >
                  {whatMatters.sectionTitle}
                </h2>
                <p className="mt-3 text-sm leading-[1.8] text-[color:var(--color-muted-light)] sm:text-[15px]">
                  {whatMatters.intro}
                </p>
              </motion.header>

              <motion.div
                variants={stagger}
                className="mt-10 grid gap-4 sm:mt-12 lg:grid-cols-3 lg:gap-5"
              >
                {whatMatters.items.map((item, idx) => (
                  <motion.article
                    key={item.title}
                    variants={fadeUp}
                    className="group relative overflow-hidden rounded-2xl border border-[color:var(--color-border-light)]/60 bg-white p-6 shadow-[0_2px_16px_rgba(2,6,23,0.05)] transition-all duration-300 hover:shadow-[0_8px_32px_rgba(2,6,23,0.09)] sm:p-7"
                  >
                    <div
                      className="absolute inset-x-0 top-0 h-[2px]"
                      style={{
                        background: `linear-gradient(90deg, ${accentColor} 0%, ${accentColor}40 60%, transparent 100%)`,
                      }}
                      aria-hidden
                    />
                    <span
                      className="mb-4 inline-flex h-8 w-8 items-center justify-center rounded-lg text-[11px] font-bold"
                      style={{
                        backgroundColor: `${accentColor}10`,
                        color: accentColor,
                      }}
                      aria-hidden
                    >
                      {String(idx + 1).padStart(2, "0")}
                    </span>
                    <h3 className="text-[1.05rem] font-semibold tracking-tight text-[color:var(--color-text-light)] sm:text-[1.1rem]">
                      {item.title}
                    </h3>
                    <p className="mt-2.5 text-[13.5px] leading-[1.8] text-[color:var(--color-muted-light)] sm:text-[14px]">
                      {item.body}
                    </p>
                  </motion.article>
                ))}
              </motion.div>
            </>
          )}

          {whatMatters.interactiveWidget ? (
            <motion.div variants={fadeUp} className="mt-10 sm:mt-12">
              <div className="grid gap-6 lg:grid-cols-12 lg:items-stretch">
                <div className="h-full lg:col-span-6">
                  <IndustrySectionWidget
                    widgetType={whatMatters.interactiveWidget}
                    accentColor={accentColor}
                  />
                </div>
                {(whatMatters.widgetSupportTitle != null ||
                  whatMatters.widgetSupportBody != null ||
                  (whatMatters.widgetSupportBullets?.length ?? 0) > 0) ? (
                  <div className="flex h-full flex-col lg:col-span-6">
                    <div className="flex h-full min-h-0 flex-col overflow-hidden rounded-2xl border border-[color:var(--color-border-light)]/60 bg-white shadow-[0_2px_12px_rgba(2,6,23,0.04)]">
                      <div className="flex min-h-0 flex-1 flex-col gap-4 p-6 sm:p-7">
                        {whatMatters.widgetSupportTitle != null ? (
                          <div className="flex items-center gap-3">
                            <div
                              className="h-8 w-1 shrink-0 rounded-full"
                              style={{ backgroundColor: accentColor }}
                              aria-hidden
                            />
                            <h4
                              className="text-[1.05rem] font-semibold tracking-tight sm:text-[1.1rem]"
                              style={{ color: accentColor }}
                            >
                              {whatMatters.widgetSupportTitle}
                            </h4>
                          </div>
                        ) : null}
                        {whatMatters.widgetSupportBody != null ? (
                          <p className="text-[13.5px] leading-[1.8] text-[color:var(--color-muted-light)] sm:text-[14px]">
                            {whatMatters.widgetSupportBody}
                          </p>
                        ) : null}
                        {whatMatters.widgetSupportBullets != null &&
                        whatMatters.widgetSupportBullets.length > 0 ? (
                          <ul className="space-y-3">
                            {whatMatters.widgetSupportBullets.map((bullet, idx) => (
                              <li
                                key={idx}
                                className="flex gap-3 rounded-lg bg-[color:var(--color-surface-0-light)]/40 px-3 py-2.5 text-[13.5px] leading-[1.7] text-[color:var(--color-muted-light)] sm:text-[14px]"
                              >
                                <span
                                  className="mt-0.5 h-2 w-2 shrink-0 rounded-full"
                                  style={{ backgroundColor: accentColor }}
                                  aria-hidden
                                />
                                <span>{bullet}</span>
                              </li>
                            ))}
                          </ul>
                        ) : null}
                      </div>
                      {whatMatters.widgetSupportFooter != null ? (
                        <p className="flex shrink-0 items-center border-t border-[color:var(--color-border-light)]/40 bg-[color:var(--color-surface-0-light)]/25 px-4 py-2.5 text-[12px] font-medium uppercase tracking-wider text-[color:var(--color-muted-light)] sm:px-5">
                          {whatMatters.widgetSupportFooter}
                        </p>
                      ) : null}
                    </div>
                  </div>
                ) : null}
              </div>
            </motion.div>
          ) : null}
        </motion.div>
      </Container>
    </Section>
  );
}
