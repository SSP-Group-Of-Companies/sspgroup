"use client";

import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { motion, useReducedMotion, type Variants } from "framer-motion";
import { Container } from "@/app/(site)/components/layout/Container";
import { SectionSignalEyebrow } from "@/app/(site)/components/ui/SectionSignalEyebrow";
import type { SolutionFamilyPageData } from "@/config/solutionPages";

type Props = {
  section: SolutionFamilyPageData["relatedSolutions"];
  accent: string;
  scrollMarginTop?: number;
};

export function SolutionRelatedServicesSection({
  section,
  accent,
  scrollMarginTop,
}: Props) {
  const reduced = useReducedMotion() ?? false;
  const headingId = "solution-related-heading";

  const fadeUp: Variants = reduced
    ? { hidden: { opacity: 1, y: 0 }, show: { opacity: 1, y: 0 } }
    : { hidden: { opacity: 1, y: 10 }, show: { opacity: 1, y: 0 } };

  const stagger: Variants = {
    hidden: {},
    show: {
      transition: {
        staggerChildren: reduced ? 0 : 0.05,
        delayChildren: reduced ? 0 : 0.03,
      },
    },
  };

  return (
    <section
      id="solution-related"
      aria-labelledby={headingId}
      className="relative overflow-hidden border-t border-[color:var(--color-border-light-soft)] bg-[color:var(--color-surface-0-light)]"
      style={scrollMarginTop ? { scrollMarginTop } : undefined}
    >
      <Container className="site-page-container relative py-16 sm:py-20 lg:py-24">
        <motion.div
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, amount: 0.15 }}
          variants={stagger}
          className="grid gap-8 sm:gap-10 lg:grid-cols-[minmax(0,0.42fr)_minmax(0,0.58fr)] lg:gap-12 xl:gap-16"
        >
          <motion.div
            variants={fadeUp}
            transition={{ duration: reduced ? 0 : 0.35, ease: "easeOut" }}
            className="max-w-[32rem]"
          >
            <SectionSignalEyebrow label={section.eyebrow} />
            <h2
              id={headingId}
              className="mt-4 max-w-[17ch] text-[1.95rem] font-semibold leading-[1.08] tracking-tight text-[color:var(--color-text-light)] sm:text-[2.2rem] xl:text-[2.35rem]"
            >
              {section.title}
            </h2>
            <p className="mt-5 max-w-[34rem] text-[14.85px] leading-[1.82] text-[color:var(--color-muted-light)] sm:text-[15.2px]">
              {section.description}
            </p>
          </motion.div>

          <motion.div variants={stagger} className="space-y-2 sm:space-y-3.5">
            {section.items.map((item, index) => {
              const featured = index === 0;

              return (
                <motion.div
                  key={item.label}
                  variants={fadeUp}
                  transition={{
                    duration: reduced ? 0 : 0.38,
                    ease: [0.22, 1, 0.36, 1],
                  }}
                >
                  <Link
                    href={item.href}
                    className="group block rounded-xl focus:outline-none focus-visible:ring-2 focus-visible:ring-[color:var(--color-brand-500)] focus-visible:ring-offset-2 focus-visible:ring-offset-[color:var(--color-surface-0-light)] sm:rounded-[22px]"
                  >
                    <article
                      className={`grid grid-cols-[1fr_auto] grid-rows-[auto_auto] items-start gap-x-3 gap-y-1.5 rounded-xl px-4 py-3.5 transition-all duration-300 sm:grid-cols-[minmax(170px,0.44fr)_minmax(0,1fr)_auto] sm:grid-rows-none sm:items-center sm:gap-4 sm:rounded-[22px] sm:px-6 sm:py-5 lg:px-7 ${
                        featured
                          ? "border-0 overflow-hidden"
                          : "border"
                      }`}
                      style={
                        featured
                          ? {
                              background: `linear-gradient(135deg, color-mix(in srgb, ${accent} 90%, var(--color-company-ink)) 0%, var(--color-company-ink) 100%)`,
                              boxShadow: `0 18px 40px color-mix(in srgb, ${accent} 14%, transparent)`,
                            }
                          : {
                              borderColor: "color-mix(in srgb, var(--color-border-light) 86%, white)",
                              backgroundColor: "white",
                              boxShadow: "0 2px 10px rgba(2,6,23,0.035)",
                            }
                      }
                    >
                      <h3
                        className="col-start-1 row-start-1 min-w-0 self-center text-[0.94rem] font-semibold leading-tight tracking-tight sm:col-start-1 sm:row-start-1 sm:text-[1.06rem]"
                        style={{
                          color: featured ? "white" : "var(--color-text-light)",
                        }}
                      >
                        {item.label}
                      </h3>

                      <div className="col-start-2 row-start-1 shrink-0 self-center sm:col-start-3 sm:row-start-1">
                        <span
                          className="inline-flex h-8 w-8 items-center justify-center rounded-full border transition-transform duration-200 group-hover:translate-x-0.5 sm:h-10 sm:w-10"
                          style={
                            featured
                              ? {
                                  borderColor: "rgba(255,255,255,0.18)",
                                  backgroundColor: "rgba(255,255,255,0.12)",
                                  color: "white",
                                }
                              : {
                                  borderColor: `color-mix(in srgb, ${accent} 18%, var(--color-border-light))`,
                                  backgroundColor: `color-mix(in srgb, ${accent} 8%, white)`,
                                  color: accent,
                                }
                          }
                        >
                          <ArrowRight className="h-3.5 w-3.5 sm:h-4 sm:w-4" />
                        </span>
                      </div>

                      <p
                        className="col-span-2 row-start-2 min-w-0 text-[12.35px] leading-[1.52] sm:col-span-1 sm:col-start-2 sm:row-start-1 sm:row-end-1 sm:text-[13.3px] sm:leading-[1.68]"
                        style={{
                          color: featured
                            ? "rgba(255,255,255,0.76)"
                            : "var(--color-muted-light)",
                        }}
                      >
                        {item.reason}
                      </p>
                    </article>
                  </Link>
                </motion.div>
              );
            })}
          </motion.div>
        </motion.div>
      </Container>
    </section>
  );
}
