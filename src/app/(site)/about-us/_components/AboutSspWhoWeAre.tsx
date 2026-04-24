"use client";

import Image from "next/image";
import Link from "next/link";
import { motion, useReducedMotion, type Variants } from "framer-motion";
import { Container } from "@/app/(site)/components/layout/Container";
import { SectionSignalEyebrow } from "@/app/(site)/components/ui/SectionSignalEyebrow";
import { trackCtaClick } from "@/lib/analytics/cta";
import { cn } from "@/lib/cn";

type WhoWeAreData = Readonly<{
  title: string;
  subtitle: string;
  body: readonly string[];
  stats: readonly { value: string; label: string }[];
  cta: { label: string; href: string; ctaId: string };
}>;

const FOCUS_RING_DARK =
  "focus:outline-none focus-visible:ring-2 focus-visible:ring-[color:var(--color-nav-ring)] focus-visible:ring-offset-2 focus-visible:ring-offset-[color:var(--color-surface-1-light)]";

export function AboutSspWhoWeAre({ data }: { data: WhoWeAreData }) {
  const reduceMotion = useReducedMotion() ?? false;

  const revealUp: Variants = reduceMotion
    ? { hidden: { opacity: 1, y: 0 }, show: { opacity: 1, y: 0 } }
    : { hidden: { opacity: 1, y: 10 }, show: { opacity: 1, y: 0 } };

  const stagger: Variants = reduceMotion
    ? { hidden: { opacity: 1 }, show: { opacity: 1 } }
    : { hidden: {}, show: { transition: { staggerChildren: 0.05, delayChildren: 0.03 } } };

  return (
    <section
      id="who-we-are"
      aria-labelledby="who-we-are-heading"
      className="relative overflow-hidden scroll-mt-24 border-b border-[color:var(--color-border-light-soft)] py-20 sm:py-24"
      style={{
        background:
          "linear-gradient(180deg, var(--color-surface-1-light) 0%, var(--color-surface-0-light) 100%)",
      }}
    >
      {/* Ambient layer */}
      <div className="pointer-events-none absolute inset-0" aria-hidden>
        <div
          className="absolute -top-24 right-[8%] h-[260px] w-[260px] rounded-full blur-[120px]"
          style={{ backgroundColor: "var(--color-company-who-light-glow-cyan)" }}
        />
        <div
          className="absolute -bottom-20 left-[-70px] h-[220px] w-[220px] rounded-full blur-[105px]"
          style={{ backgroundColor: "var(--color-company-who-light-glow-brand)" }}
        />
      </div>

      <Container className="site-page-container relative">
        <div className="grid gap-10 lg:grid-cols-12 lg:items-center lg:gap-14">
          <motion.div
            className="lg:col-span-6"
            initial="hidden"
            whileInView="show"
            viewport={{ once: true, amount: 0.15 }}
            variants={stagger}
          >
            <motion.div
              variants={revealUp}
              transition={{ duration: reduceMotion ? 0 : 0.35, ease: "easeOut" }}
              className="flex justify-start"
            >
              <SectionSignalEyebrow label={data.title} />
            </motion.div>

            <motion.h2
              id="who-we-are-heading"
              variants={revealUp}
              transition={{ duration: reduceMotion ? 0 : 0.35, ease: "easeOut" }}
              className="mt-4 max-w-[18ch] text-[2.1rem] leading-[1.1] font-bold tracking-tight text-[color:var(--color-text-strong)] sm:text-[2.4rem] lg:text-[2.6rem]"
            >
              {data.subtitle}
            </motion.h2>

            <motion.div
              variants={revealUp}
              transition={{ duration: reduceMotion ? 0 : 0.35, ease: "easeOut" }}
              className="mt-5 space-y-2"
            >
              {data.body.map((line, i) => (
                <p key={i} className="max-w-[56ch] text-[15.5px] leading-[1.82] text-[color:var(--color-muted)] sm:text-[16px]">
                  {line}
                </p>
              ))}
            </motion.div>

            <motion.div className="mt-7 grid gap-3 sm:grid-cols-3" variants={stagger}>
              {data.stats.map((stat) => (
                <motion.div
                  key={stat.label}
                  variants={revealUp}
                  transition={{ duration: reduceMotion ? 0 : 0.35, ease: "easeOut" }}
                  className="group relative overflow-hidden rounded-xl border border-[color:var(--color-border-light)] bg-[color:var(--color-surface-1-light)] px-4 py-4 shadow-[var(--shadow-company-card-soft)] transition-all duration-300 motion-safe:hover:-translate-y-[1px] hover:shadow-[var(--shadow-company-card-soft-hover)]"
                >
                  <div className="pointer-events-none absolute inset-x-0 top-0 h-[2px] bg-[linear-gradient(90deg,var(--color-ssp-cyan-500),transparent)] opacity-0 transition-opacity duration-300 group-hover:opacity-100" />
                  <p className="text-[22px] leading-none font-bold tracking-tight text-[color:var(--color-text-strong)] sm:text-[25px]">
                    {stat.value}
                  </p>
                  <p className="mt-2 text-[10px] font-semibold uppercase tracking-[0.16em] text-[color:var(--color-subtle)]">
                    {stat.label}
                  </p>
                </motion.div>
              ))}
            </motion.div>

            <motion.div
              variants={revealUp}
              transition={{ duration: reduceMotion ? 0 : 0.35, ease: "easeOut" }}
              className="mt-7"
            >
              <Link
                href={data.cta.href}
                data-cta-id={data.cta.ctaId}
                onClick={() =>
                  trackCtaClick({
                    ctaId: data.cta.ctaId,
                    location: "about_who_we_are",
                    destination: data.cta.href,
                    label: data.cta.label,
                  })
                }
                className={cn(
                  "group inline-flex items-center gap-2 rounded-lg text-sm font-semibold text-[color:var(--color-menu-accent)] transition-colors hover:text-[color:var(--color-ssp-ink-800)]",
                  FOCUS_RING_DARK,
                )}
              >
                {data.cta.label}
                <span aria-hidden className="transition-transform motion-safe:group-hover:translate-x-0.5">
                  &rarr;
                </span>
              </Link>
            </motion.div>
          </motion.div>

          <motion.div
            className="relative overflow-hidden lg:col-span-6 lg:overflow-visible"
            initial={reduceMotion ? false : { opacity: 1, scale: 0.98 }}
            whileInView={reduceMotion ? undefined : { opacity: 1, scale: 1 }}
            viewport={{ once: true, amount: 0.15 }}
            transition={{ duration: 0.35, ease: "easeOut", delay: 0.03 }}
          >
            <div
              className="pointer-events-none absolute -inset-5 rounded-3xl opacity-35 blur-3xl"
              style={{
                background:
                  "radial-gradient(ellipse at 30% 40%, var(--color-company-who-light-glow-cyan), transparent 72%)",
              }}
              aria-hidden
            />

            <div className="relative">
              <div
                className="pointer-events-none absolute -left-4 -top-4 hidden h-[84%] w-[84%] rounded-[1.4rem] border border-[color:var(--color-border-light)]/80 bg-[color:var(--color-surface-1-light)]/60 lg:block"
                aria-hidden
              />
              <div
                className="relative z-10 overflow-hidden rounded-[1.4rem] border border-[color:var(--color-border-light)] bg-white p-2.5"
                style={{ boxShadow: "var(--shadow-company-who-main-card)" }}
              >
                <div className="relative aspect-[16/10] overflow-hidden rounded-[1.1rem]">
                  <Image
                    src="/_optimized/company/who-we-are-group-photo.webp"
                    alt="SSP Group leadership and operations team"
                    fill
                    className="object-cover object-center"
                    sizes="(max-width: 1024px) 100vw, 56vw"
                  />
                </div>
              </div>

              <div className="absolute left-4 top-4 z-20 hidden rounded-xl border border-[color:var(--color-border-light)] bg-white px-3.5 py-2.5 shadow-[var(--shadow-company-who-float-card)] sm:block">
                <p className="text-[10px] font-semibold tracking-[0.12em] text-[color:var(--color-subtle)] uppercase">
                  Operating Discipline
                </p>
                <p className="mt-1 text-[13.5px] font-semibold text-[color:var(--color-text-strong)]">
                  Planned. Escalated. Closed.
                </p>
              </div>

              <div className="absolute -right-8 top-[12%] z-20 hidden w-[33%] -rotate-[2deg] rounded-xl border border-[color:var(--color-border-light)] bg-white p-1.5 shadow-[var(--shadow-company-who-float-card)] xl:block">
                <div className="relative aspect-[16/10] overflow-hidden rounded-[0.8rem]">
                  <Image
                    src="/_optimized/company/who-we-are-meeting-photo.webp"
                    alt="We leadership and operations team meeting at the Milton operations base"
                    fill
                    className="object-cover object-center"
                    sizes="24vw"
                  />
                </div>
                <p className="px-2.5 pb-1.5 pt-2 text-[10.5px] leading-5 text-[color:var(--color-muted)]">
                  Leadership and operations planning from the Milton base.
                </p>
              </div>

              {/* Desktop-only layered card to avoid mobile stacking */}
              <div className="absolute -right-7 -bottom-10 z-20 hidden w-[39%] rotate-[1.5deg] rounded-xl border border-[color:var(--color-border-light)] bg-white p-1.5 shadow-[var(--shadow-company-who-float-card)] lg:block">
                <div className="relative aspect-[16/10] overflow-hidden rounded-[0.8rem]">
                  <Image
                    src="/_optimized/company/who-we-are-leadership-team.webp"
                    alt="We leadership and operations team in planning session"
                    fill
                    className="object-cover object-center"
                    sizes="28vw"
                  />
                </div>
                <p className="px-2.5 pb-1.5 pt-2 text-[11px] leading-5 text-[color:var(--color-muted)]">
                  Leadership and operations alignment behind every lane plan.
                </p>
              </div>

              {/* Mobile composition: clean two-card storyline */}
              <div className="mt-4 grid grid-cols-2 gap-3 lg:hidden">
                <div className="rounded-xl border border-[color:var(--color-border-light)] bg-white p-1.5 shadow-[var(--shadow-company-card-soft)]">
                  <div className="relative aspect-[4/3] overflow-hidden rounded-[0.75rem]">
                    <Image
                      src="/_optimized/company/who-we-are-meeting-photo.webp"
                      alt="We leadership and operations team meeting at the Milton operations base"
                      fill
                      className="object-cover object-center"
                      sizes="50vw"
                    />
                  </div>
                </div>
                <div className="rounded-xl border border-[color:var(--color-border-light)] bg-white p-1.5 shadow-[var(--shadow-company-card-soft)]">
                  <div className="relative aspect-[4/3] overflow-hidden rounded-[0.75rem]">
                    <Image
                      src="/_optimized/company/who-we-are-leadership-team.webp"
                      alt="We leadership and operations team in planning session"
                      fill
                      className="object-cover object-center"
                      sizes="50vw"
                    />
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </Container>
    </section>
  );
}
