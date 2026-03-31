"use client";

import Link from "next/link";
import { motion, useReducedMotion, type Variants } from "framer-motion";
import { Container } from "@/app/(site)/components/layout/Container";
import { Section } from "@/app/(site)/components/layout/Section";
import { SectionEyebrow } from "@/app/(site)/components/ui/SectionEyebrow";
import type { IndustryPageModel } from "@/config/industryPages";
import { cn } from "@/lib/cn";
import { getThemeOrbs, THEME_ACCENT, THEME_MODEFIT_BG } from "./industryTheme";

const focusRing =
  "focus:outline-none focus-visible:ring-2 focus-visible:ring-[color:var(--color-brand-500)] focus-visible:ring-offset-2 focus-visible:ring-offset-white";

export function IndustryRelatedServices({ model }: { model: IndustryPageModel }) {
  const reduceMotion = useReducedMotion();
  const { relatedServices, hero } = model;
  const theme = hero.theme;
  const sectionBg = THEME_MODEFIT_BG[theme];
  const accentColor = THEME_ACCENT[theme];
  const orbs = getThemeOrbs(theme);

  const fadeUp: Variants = reduceMotion
    ? { hidden: { opacity: 1, y: 0 }, show: { opacity: 1, y: 0 } }
    : {
        hidden: { opacity: 1, y: 10 },
        show: { opacity: 1, y: 0, transition: { duration: 0.35, ease: "easeOut" } },
      };
  const stagger: Variants = reduceMotion
    ? { hidden: { opacity: 1 }, show: { opacity: 1 } }
    : { hidden: {}, show: { transition: { staggerChildren: 0.05, delayChildren: 0.03 } } };

  return (
    <Section
      variant="light"
      id="related-services"
      className="relative scroll-mt-24 overflow-hidden sm:scroll-mt-28"
      style={{ backgroundColor: sectionBg }}
    >
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0"
        style={{
          background: `radial-gradient(72% 88% at 10% 0%, ${orbs.main}, transparent 62%), radial-gradient(62% 82% at 90% 10%, ${orbs.secondary}, transparent 65%)`,
        }}
      />
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 opacity-[0.04]"
        style={{
          backgroundImage: "radial-gradient(circle, rgba(15,23,42,0.10) 1px, transparent 1px)",
          backgroundSize: "24px 24px",
        }}
      />
      <Container className="site-page-container relative">
        <motion.div
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, amount: 0.2 }}
          variants={stagger}
        >
          <div className="grid gap-6 lg:grid-cols-12 lg:gap-8">
            <motion.header variants={fadeUp} className="lg:col-span-4 lg:pr-4">
              <SectionEyebrow
                label={relatedServices.eyebrowLabel ?? "Service Coverage"}
                accentColor={accentColor}
              />
              <h2 className="mt-4 text-[1.5rem] font-semibold leading-tight tracking-tight text-[color:var(--color-text-light)] sm:text-[1.85rem]">
                {relatedServices.sectionTitle}
              </h2>
              {relatedServices.intro ? (
                <p className="mt-3 text-sm leading-[1.8] text-[color:var(--color-muted-light)] sm:text-[15px]">
                  {relatedServices.intro}
                </p>
              ) : null}
              <p className="mt-5 text-[12px] font-semibold uppercase tracking-[0.14em] text-[color:var(--color-muted-light)]">
                Transport Mode Matrix
              </p>
            </motion.header>

            <motion.div variants={fadeUp} className="lg:col-span-8">
              {relatedServices.modeFit?.length ? (
                <motion.div
                  variants={stagger}
                  className="overflow-hidden rounded-2xl border border-[color:var(--color-border-light)]/60 bg-white/95 shadow-[0_4px_20px_rgba(2,6,23,0.05)]"
                >
                  <div className="hidden grid-cols-[44px_minmax(0,1.2fr)_minmax(0,1fr)_minmax(0,1.2fr)] border-b border-[color:var(--color-border-light)]/60 bg-[color:var(--color-surface-0-light)]/60 px-5 py-3 text-[11px] font-semibold uppercase tracking-[0.12em] text-[color:var(--color-muted-light)] lg:grid">
                    <span />
                    <span>Scenario</span>
                    <span>Recommended mode</span>
                    <span>Rationale</span>
                  </div>

                  {relatedServices.modeFit.map((item, index) => (
                    <motion.article
                      key={item.scenario}
                      variants={fadeUp}
                      className="grid gap-2 border-b border-[color:var(--color-border-light)]/50 px-4 py-4 last:border-b-0 sm:px-5 lg:grid-cols-[44px_minmax(0,1.2fr)_minmax(0,1fr)_minmax(0,1.2fr)] lg:items-start lg:gap-4 lg:py-5"
                    >
                      <div className="flex items-center gap-2 lg:block">
                        <span
                          className="inline-flex h-7 w-7 items-center justify-center rounded-lg text-[11px] font-semibold"
                          style={{
                            backgroundColor: `${accentColor}14`,
                            color: accentColor,
                          }}
                        >
                          {String(index + 1).padStart(2, "0")}
                        </span>
                      </div>

                      <div>
                        <h3 className="mt-1 text-[1rem] font-semibold tracking-tight text-[color:var(--color-text-light)]">
                          {item.scenario}
                        </h3>
                      </div>

                      <div>
                        <p className="text-[10px] font-semibold uppercase tracking-[0.12em] text-[color:var(--color-muted-light)] lg:mt-0">
                          Recommended
                        </p>
                        <p className="mt-1 text-[13.5px] font-semibold leading-[1.55] text-[color:var(--color-text-light)]">
                          {item.recommendation}
                        </p>
                      </div>

                      <div>
                        <p className="text-[10px] font-semibold uppercase tracking-[0.12em] text-[color:var(--color-muted-light)]">
                          Rationale
                        </p>
                        <p className="mt-1 text-[13px] leading-[1.7] text-[color:var(--color-muted-light)]">
                          {item.rationale}
                        </p>
                      </div>
                    </motion.article>
                  ))}
                </motion.div>
              ) : null}
            </motion.div>
          </div>

          <motion.div
            variants={fadeUp}
            className="mt-6 rounded-2xl border border-[color:var(--color-border-light)]/60 bg-white/95 p-4 shadow-[0_4px_18px_rgba(2,6,23,0.04)] sm:mt-7 sm:p-5"
          >
            <div className="flex flex-wrap items-start justify-between gap-3">
              <div>
                <p className="text-[12px] font-semibold uppercase tracking-[0.14em] text-[color:var(--color-muted-light)]">
                  Direct Access
                </p>
                <p className="mt-1 text-[13px] leading-[1.7] text-[color:var(--color-muted-light)]">
                  Explore the service families used across the scenarios above.
                </p>
              </div>
            </div>

            <motion.nav
              variants={stagger}
              className="mt-4 grid gap-2 sm:mt-5 sm:grid-cols-2 lg:grid-cols-4"
              aria-label="Related freight services"
            >
              {relatedServices.links.map((link, i) => (
                <motion.span key={i} variants={fadeUp}>
                  <Link
                    href={link.href}
                    className={cn(
                      "group inline-flex w-full items-center justify-between rounded-xl border border-[color:var(--color-border-light)]/60 bg-[color:var(--color-surface-0-light)]/50 px-3.5 py-2.5 text-[13px] font-semibold text-[color:var(--color-text-light)] transition-all duration-200 hover:-translate-y-[1px] hover:border-[color:var(--color-border-light)] hover:bg-white hover:shadow-md",
                      focusRing,
                    )}
                  >
                    <span>{link.label}</span>
                    <span
                      className="text-[12px] font-bold transition-transform duration-200 group-hover:translate-x-[2px]"
                      style={{ color: accentColor }}
                      aria-hidden
                    >
                      &rarr;
                    </span>
                  </Link>
                </motion.span>
              ))}
            </motion.nav>
          </motion.div>
        </motion.div>
      </Container>
    </Section>
  );
}
