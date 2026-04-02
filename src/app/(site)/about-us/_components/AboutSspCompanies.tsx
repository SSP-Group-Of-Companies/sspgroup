"use client";

import { motion, useReducedMotion, type Variants } from "framer-motion";
import Image from "next/image";
import { ArrowUpRight } from "lucide-react";
import { Container } from "@/app/(site)/components/layout/Container";
import { SectionSignalEyebrow } from "@/app/(site)/components/ui/SectionSignalEyebrow";
import type { OurCompaniesContent, OurCompanyRegion } from "@/config/company";
import { trackCtaClick } from "@/lib/analytics/cta";
import { cn } from "@/lib/cn";

/** Same underline + color motion as `SiteFooter` links and desktop nav dropdown items. */
const companyWebsiteLinkClass = cn(
  "relative inline-flex w-fit items-center gap-1 pb-0.5 text-[13px] leading-6 font-normal text-[color:var(--color-menu-title)] transition-colors duration-200",
  "after:absolute after:right-0 after:-bottom-0.5 after:left-0 after:h-[1.5px] after:origin-left after:scale-x-0 after:bg-[color:var(--color-menu-accent)] after:transition-transform after:duration-300 after:ease-[cubic-bezier(0.22,1,0.36,1)]",
  "hover:text-[color:var(--color-ssp-ink-800)] hover:after:scale-x-100",
  "focus-visible:text-[color:var(--color-ssp-ink-800)] focus-visible:after:scale-x-100",
  "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[color:var(--color-brand-600)] focus-visible:ring-offset-2 focus-visible:ring-offset-[color:var(--color-ssp-cloud-50)]",
);

/** Quiet ink-forward pills; US gets a whisper of cyan on the border only. */
const REGION_META: Record<
  OurCompanyRegion,
  { code: string; label: string; badgeClass: string }
> = {
  CA: {
    code: "CA",
    label: "Canada",
    badgeClass:
      "border border-[color:var(--color-ssp-ink-800)]/20 bg-white/75 text-[color:var(--color-ssp-ink-900)] shadow-[0_1px_0_rgba(255,255,255,0.9)] backdrop-blur-[2px]",
  },
  US: {
    code: "US",
    label: "United States",
    badgeClass:
      "border border-[color:var(--color-ssp-cyan-600)]/22 bg-white/75 text-[color:var(--color-ssp-ink-900)] shadow-[0_1px_0_rgba(255,255,255,0.9)] backdrop-blur-[2px]",
  },
};

function CompanyLogoMark({ src }: { src: string }) {
  return (
    <div className="relative h-14 w-full max-w-[178px] sm:h-[3.25rem] sm:max-w-[186px]">
      <Image
        src={src}
        alt=""
        fill
        sizes="(max-width: 640px) 45vw, 186px"
        className="object-contain object-left"
        priority={false}
      />
    </div>
  );
}

export function AboutSspCompanies({ data }: { data: OurCompaniesContent }) {
  const reduceMotion = useReducedMotion() ?? false;

  const revealUp: Variants = reduceMotion
    ? { hidden: { opacity: 1, y: 0 }, show: { opacity: 1, y: 0 } }
    : { hidden: { opacity: 1, y: 10 }, show: { opacity: 1, y: 0 } };

  const stagger: Variants = reduceMotion
    ? { hidden: { opacity: 1 }, show: { opacity: 1 } }
    : { hidden: {}, show: { transition: { staggerChildren: 0.05, delayChildren: 0.03 } } };

  return (
    <section
      id="our-companies"
      aria-labelledby="our-companies-heading"
      className="relative overflow-hidden scroll-mt-24 border-b border-[color:var(--color-menu-border)] pt-20 pb-16 sm:pt-24 sm:pb-20"
      style={{
        background:
          "linear-gradient(180deg, var(--color-ssp-cloud-50) 0%, var(--color-surface-0-light) 42%, var(--color-ssp-cloud-100) 100%)",
      }}
    >
      <div
        className="pointer-events-none absolute inset-x-0 top-0 z-0 h-32 sm:h-40"
        aria-hidden
        style={{
          background:
            "linear-gradient(180deg, color-mix(in srgb, var(--color-company-ink) 16%, transparent) 0%, transparent 100%)",
        }}
      />

      <div
        className="pointer-events-none absolute inset-x-0 top-0 z-[1] h-px bg-gradient-to-r from-transparent via-[color:var(--color-ssp-cyan-500)]/28 to-transparent"
        aria-hidden
      />

      <div
        className="pointer-events-none absolute left-0 top-0 z-0 h-[min(22rem,55vh)] w-full max-w-3xl opacity-[0.022]"
        aria-hidden
        style={{
          backgroundImage:
            "linear-gradient(to right, var(--color-company-companies-grid-line) 1px, transparent 1px), linear-gradient(to bottom, var(--color-company-companies-grid-line) 1px, transparent 1px)",
          backgroundSize: "64px 64px",
          maskImage: "linear-gradient(180deg, black 0%, black 55%, transparent 100%)",
          WebkitMaskImage: "linear-gradient(180deg, black 0%, black 55%, transparent 100%)",
        }}
      />

      <div className="pointer-events-none absolute inset-0 overflow-hidden" aria-hidden>
        <div className="absolute -left-24 top-1/3 h-72 w-72 rounded-full bg-[color:var(--color-brand-500)]/[0.025] blur-[100px]" />
        <div className="absolute -right-16 bottom-0 h-64 w-64 rounded-full bg-[color:var(--color-ssp-cyan-500)]/[0.04] blur-[90px]" />
      </div>

      <Container className="site-page-container relative z-[2]">
        <motion.div
          className="max-w-3xl"
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, amount: 0.15 }}
          variants={revealUp}
          transition={{ duration: reduceMotion ? 0 : 0.35, ease: "easeOut" }}
        >
          <SectionSignalEyebrow label={data.sectionLabel} />
          <h2
            id="our-companies-heading"
            className="mt-5 text-pretty text-3xl leading-tight font-bold tracking-tight text-[color:var(--color-menu-title)] sm:mt-6 sm:text-4xl"
          >
            {data.title}
          </h2>
          <p className="mt-6 max-w-[34rem] text-[15px] leading-[1.75] text-[color:var(--color-menu-muted)]">
            {data.subtitle}
          </p>
        </motion.div>

        <motion.ul
          className="mt-12 grid grid-cols-1 gap-10 sm:grid-cols-2 sm:gap-x-8 sm:gap-y-10 lg:mt-14 lg:grid-cols-3 lg:gap-x-8 lg:gap-y-11 xl:grid-cols-5 xl:gap-x-0 xl:gap-y-12"
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, amount: 0.08 }}
          variants={stagger}
        >
          {data.companies.map((company) => {
            const region = REGION_META[company.region];
            return (
              <motion.li
                key={company.name}
                variants={revealUp}
                transition={{ duration: reduceMotion ? 0 : 0.38, ease: [0.22, 1, 0.36, 1] }}
                className={cn(
                  "group relative flex min-h-full min-w-0 flex-col items-start py-7 text-left first:pt-0 last:pb-0 sm:py-0",
                  "xl:border-l xl:border-[color:var(--color-menu-border)]/65 xl:px-5",
                  "first:xl:border-l-0 first:xl:pl-0 last:xl:pr-0",
                )}
              >
                <div className="relative z-[1] flex w-full shrink-0 justify-start">
                  <CompanyLogoMark src={company.logoSrc} />
                </div>

                <div className="relative z-[1] mt-4 flex min-h-0 w-full flex-1 flex-col items-start gap-2.5 text-left">
                  <h3 className="text-[1.03rem] font-semibold leading-[1.28] tracking-tight text-[color:var(--color-menu-title)]">
                    {company.name}
                  </h3>
                  <span
                    className={cn(
                      "inline-flex w-fit items-center gap-1.5 rounded-full border px-2.5 py-1 text-[10px] font-semibold tracking-wide uppercase",
                      region.badgeClass,
                    )}
                  >
                    <span className="tabular-nums">{region.code}</span>
                    <span className="font-semibold normal-case tracking-normal">{region.label}</span>
                  </span>
                  <p className="text-pretty text-[12.5px] leading-[1.65] text-[color:var(--color-menu-muted)]">
                    {company.description}
                  </p>
                  {company.address ? (
                    <p className="text-pretty text-[10.5px] leading-[1.45] text-[color:var(--color-menu-subtle)]/90">
                      {company.address}
                    </p>
                  ) : null}

                  <div className="mt-auto w-full pt-4">
                    {company.website ? (
                      <a
                        href={company.website}
                        target="_blank"
                        rel="noopener noreferrer"
                        data-cta-id={`about_company_website_${company.name}`}
                        onClick={() =>
                          trackCtaClick({
                            ctaId: `about_company_website_${company.name}`,
                            location: "about_our_companies",
                            destination: company.website ?? undefined,
                            label: `${company.name} Website`,
                          })
                        }
                        className={companyWebsiteLinkClass}
                      >
                        <span>Website</span>
                        <ArrowUpRight className="h-3.5 w-3.5 shrink-0" aria-hidden />
                        <span className="sr-only"> ({company.name}, opens in a new tab)</span>
                      </a>
                    ) : (
                      <span className="text-[11px] font-medium tracking-wide text-[color:var(--color-menu-subtle)]">
                        Part of SSP Group
                      </span>
                    )}
                  </div>
                </div>
              </motion.li>
            );
          })}
        </motion.ul>
      </Container>
    </section>
  );
}
