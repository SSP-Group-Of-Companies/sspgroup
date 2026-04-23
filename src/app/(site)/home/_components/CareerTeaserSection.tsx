"use client";

import Link from "next/link";
import { motion, useReducedMotion } from "framer-motion";
import { ArrowUpRight, Briefcase, ExternalLink } from "lucide-react";
import { Container } from "@/app/(site)/components/layout/Container";
import { SectionSignalEyebrow } from "@/app/(site)/components/ui/SectionSignalEyebrow";
import { trackCtaClick } from "@/lib/analytics/cta";
import { cn } from "@/lib/cn";

/** Matches `CareersClient` — driver onboarding URL. */
const DRIVEDOCK_URL = "https://drivedock.ssp4you.com/";

const SECTION_EYEBROW = "Careers & culture at SSP";
const SECTION_TITLE = "Build Your Career With a Team That Executes";
/** One editorial beat: who we hire for, how we work, why the careers hub is the next step. */
const SECTION_SUPPORT =
  "We look for exceptional people who want roles where execution changes outcomes—company drivers and owner-operators, dispatch and operations coordinators, cross-border and compliance specialists, and the teams that support them. If you want an operations-first culture where quality of work is the standard, not the exception, our careers hub is where you’ll find current openings, how we hire, and what support looks like from day one.";

const HEADER_CTA_LABEL = "Explore careers at SSP";
const CAREERS_HUB_HREF = "/careers";
const OPENINGS_HREF = "/careers#jobs";

const FOCUS_RING_LIGHT =
  "focus:outline-none focus-visible:ring-2 focus-visible:ring-[color:var(--color-menu-accent)] focus-visible:ring-offset-2 focus-visible:ring-offset-[color:var(--color-surface-1)]";

/* Same card grammar as cross-border capability pillars — white panel, light border,
   soft lift — with a matched 3px top bar on every card so none read “secondary.” */
const CAREER_CARD_SHELL =
  "relative overflow-hidden rounded-2xl border border-[color:var(--color-border-light)] bg-white px-6 py-7 shadow-[0_8px_22px_rgba(2,6,23,0.06)] transition-all duration-300 motion-safe:hover:-translate-y-[2px] motion-safe:hover:shadow-[0_16px_34px_rgba(2,6,23,0.09)]";

const CARD_TOP_BAR =
  "pointer-events-none absolute inset-x-0 top-0 h-[3px] rounded-t-[inherit]";

const ICON_WRAP =
  "inline-flex h-10 w-10 shrink-0 items-center justify-center rounded-xl border border-[color:var(--color-border-light)] bg-[color:var(--color-surface-0)] text-[color:var(--color-ssp-cyan-600)]";

export function CareerTeaserSection() {
  const reduceMotion = useReducedMotion() ?? false;

  return (
    <section
      id="home-career-teaser"
      aria-labelledby="home-career-teaser-heading"
      className="relative scroll-mt-16 overflow-hidden bg-[color:var(--color-surface-1)] py-20 sm:py-24 lg:py-28"
    >
      <div
        className="pointer-events-none absolute inset-x-0 top-0 z-[1] h-[2px] opacity-80"
        style={{ background: "var(--gradient-ssp-elevated)" }}
        aria-hidden
      />

      <Container className="site-page-container relative z-[2]">
        <motion.div
          className="flex flex-col gap-6 sm:flex-row sm:items-end sm:justify-between sm:gap-10"
          initial={reduceMotion ? false : { opacity: 0, y: 12 }}
          whileInView={reduceMotion ? undefined : { opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.35 }}
          transition={{ duration: reduceMotion ? 0 : 0.42, ease: [0.22, 1, 0.36, 1] }}
        >
          <div className="max-w-[44rem]">
            <SectionSignalEyebrow label={SECTION_EYEBROW} />
            <h2
              id="home-career-teaser-heading"
              className="mt-4 text-[2rem] font-semibold leading-[1.06] tracking-[-0.028em] text-[color:var(--color-text-light)] sm:text-[2.4rem] lg:text-[2.65rem] lg:leading-[1.04]"
            >
              {SECTION_TITLE}
            </h2>
            <p className="mt-4 max-w-[48rem] text-[14.5px] leading-[1.78] text-[color:var(--color-muted-light)] sm:text-[15px]">
              {SECTION_SUPPORT}
            </p>
          </div>

          <Link
            href={CAREERS_HUB_HREF}
            data-cta-id="home_career_teaser_explore_careers"
            onClick={() =>
              trackCtaClick({
                ctaId: "home_career_teaser_explore_careers",
                location: "home_career_teaser",
                destination: CAREERS_HUB_HREF,
                label: HEADER_CTA_LABEL,
              })
            }
            className={cn(
              "group/ct relative inline-flex w-fit shrink-0 items-center gap-2 self-start pb-0.5 text-[13px] font-semibold tracking-[0.05em] sm:self-end",
              "text-[color:var(--color-text-light)] transition-colors duration-200 hover:text-[color:var(--color-ssp-cyan-600)]",
              "after:pointer-events-none after:absolute after:right-0 after:-bottom-0.5 after:left-0 after:h-[1.5px] after:origin-left after:scale-x-0 after:bg-[color:var(--color-ssp-cyan-500)] after:transition-transform after:duration-300 after:ease-[cubic-bezier(0.22,1,0.36,1)]",
              "hover:after:scale-x-100",
              FOCUS_RING_LIGHT,
            )}
          >
            {HEADER_CTA_LABEL}
            <span
              aria-hidden
              className="inline-block translate-x-0 transition-transform duration-300 ease-[cubic-bezier(0.22,1,0.36,1)] motion-safe:group-hover/ct:translate-x-[2px]"
            >
              &rarr;
            </span>
          </Link>
        </motion.div>

        <motion.div
          className="mt-12 grid gap-5 sm:mt-14 lg:grid-cols-2 lg:gap-6"
          initial={reduceMotion ? false : { opacity: 0, y: 10 }}
          whileInView={reduceMotion ? undefined : { opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.2 }}
          transition={{ duration: reduceMotion ? 0 : 0.45, ease: "easeOut", delay: reduceMotion ? 0 : 0.06 }}
        >
          <article className={cn("flex flex-col", CAREER_CARD_SHELL)}>
            <div aria-hidden className={CARD_TOP_BAR} style={{ background: "var(--gradient-ssp-elevated)" }} />
            <div className="flex items-center gap-3">
              <span className={ICON_WRAP}>
                <Briefcase className="h-[18px] w-[18px]" strokeWidth={1.75} aria-hidden />
              </span>
              <h3 className="text-[15px] font-semibold tracking-[-0.01em] text-[color:var(--color-text-light)]">
                Current openings
              </h3>
            </div>
            <p className="mt-3 flex-1 text-[13.5px] leading-[1.65] text-[color:var(--color-muted-light)] sm:text-[14px]">
              Active roles across departments and locations—filter, read requirements, and apply to
              the position that matches your discipline.
            </p>
            <Link
              href={OPENINGS_HREF}
              data-cta-id="home_career_teaser_open_roles"
              onClick={() =>
                trackCtaClick({
                  ctaId: "home_career_teaser_open_roles",
                  location: "home_career_teaser",
                  destination: OPENINGS_HREF,
                  label: "See open roles",
                })
              }
              className={cn(
                "group/open mt-5 inline-flex w-fit items-center gap-2 text-[13px] font-semibold text-[color:var(--color-text-light)] transition-colors hover:text-[color:var(--color-ssp-cyan-600)]",
                FOCUS_RING_LIGHT,
              )}
            >
              See open roles
              <span
                aria-hidden
                className="inline-block transition-transform duration-300 ease-[cubic-bezier(0.22,1,0.36,1)] motion-safe:group-hover/open:translate-x-[2px]"
              >
                &rarr;
              </span>
            </Link>
          </article>

          <article className={cn("flex flex-col", CAREER_CARD_SHELL)}>
            <div aria-hidden className={CARD_TOP_BAR} style={{ background: "var(--gradient-ssp-elevated)" }} />
            <div className="flex items-center gap-3">
              <span className={ICON_WRAP}>
                <ExternalLink className="h-[18px] w-[18px]" strokeWidth={1.75} aria-hidden />
              </span>
              <h3 className="text-[15px] font-semibold tracking-[-0.01em] text-[color:var(--color-text-light)]">
                Driver onboarding
              </h3>
            </div>
            <p className="mt-3 flex-1 text-[13.5px] leading-[1.65] text-[color:var(--color-muted-light)] sm:text-[14px]">
              Company driver and owner-operator applications run through DriveDock—SSP&apos;s
              digital onboarding platform. Continue or start your qualification there.
            </p>
            <a
              href={DRIVEDOCK_URL}
              target="_blank"
              rel="noopener noreferrer"
              data-cta-id="home_career_teaser_drivedock"
              onClick={() =>
                trackCtaClick({
                  ctaId: "home_career_teaser_drivedock",
                  location: "home_career_teaser",
                  destination: DRIVEDOCK_URL,
                  label: "Open DriveDock",
                })
              }
              className={cn(
                "group/dd site-cta-radius relative isolate mt-5 inline-flex w-fit items-center gap-2 overflow-hidden border-0 px-5 py-2.5 text-[13px] font-semibold text-white transition",
                "shadow-[inset_0_1px_0_rgba(255,255,255,0.22),inset_0_0_0_1px_rgba(255,255,255,0.1),0_10px_28px_rgba(11,62,94,0.35)]",
                "before:pointer-events-none before:absolute before:inset-0 before:z-0 before:rounded-[var(--radius-action)] before:content-[''] before:bg-[linear-gradient(180deg,rgba(255,255,255,0.14),transparent_42%)] before:opacity-90",
                "hover:shadow-[inset_0_1px_0_rgba(255,255,255,0.26),inset_0_0_0_1px_rgba(255,255,255,0.14),0_14px_36px_rgba(11,62,94,0.42)] motion-safe:hover:brightness-[1.03] active:brightness-[0.98]",
                FOCUS_RING_LIGHT,
              )}
              style={{ background: "var(--gradient-ssp-elevated)" }}
            >
              <span className="relative z-[1] inline-flex items-center gap-2">
                Open DriveDock
                <ArrowUpRight
                  className="h-3.5 w-3.5 text-white/90 transition-transform motion-safe:group-hover/dd:translate-x-0.5 motion-safe:group-hover/dd:-translate-y-0.5"
                  aria-hidden
                />
              </span>
            </a>
            <p className="mt-2 text-[11px] leading-snug text-[color:var(--color-menu-subtle)]">
              drivedock.ssp4you.com · opens in a new tab
            </p>
          </article>
        </motion.div>
      </Container>
    </section>
  );
}
