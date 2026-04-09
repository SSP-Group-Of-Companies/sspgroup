import Link from "next/link";
import { Container } from "@/app/(site)/components/layout/Container";
import { SectionEyebrow } from "@/app/(site)/components/ui/SectionEyebrow";
import { SectionSignalEyebrow } from "@/app/(site)/components/ui/SectionSignalEyebrow";
import { StandardFinalCta } from "@/app/(site)/components/cta/StandardFinalCta";
import {
  FreightFitGuideMedia,
  FreightFitGuideRecommendations,
} from "@/app/(site)/services/[service]/_components/FreightFitGuide";
import { HEADER_HEIGHT_PX } from "@/app/(site)/components/layout/header/constants";
import type { SolutionDetailPageData } from "@/config/solutionPages";
import { SolutionHero } from "@/app/(site)/solutions/_components/SolutionHero";

const SECTION_SCROLL_MARGIN = HEADER_HEIGHT_PX + 56 + 16;

export function SolutionDetailPageTemplate({ page }: { page: SolutionDetailPageData }) {
  return (
    <>
      <SolutionHero
        slug={page.slug}
        eyebrow={page.hero.eyebrow}
        title={page.hero.title}
        description={page.hero.description}
        descriptionMaxWidth={page.hero.descriptionMaxWidth}
        primaryCta={page.hero.primaryCta}
        secondaryCta={page.hero.secondaryCta}
        media={page.hero.media}
        theme={page.theme}
      />

      <section
        id="solution-overview"
        className="bg-white"
        style={{ scrollMarginTop: `${SECTION_SCROLL_MARGIN}px` }}
      >
        <Container className="site-page-container py-16 sm:py-20">
          <div className="grid gap-8 xl:grid-cols-[minmax(0,0.95fr)_minmax(320px,1.05fr)] xl:items-end">
            <div className="max-w-[42rem]">
              <SectionSignalEyebrow label={page.identity.eyebrow} />
              <h2 className="mt-4 max-w-[24ch] text-[2rem] font-semibold leading-[1.08] tracking-tight text-[color:var(--color-text-light)] sm:text-[2.35rem]">
                {page.identity.title}
              </h2>
              <p className="mt-4 max-w-[60ch] text-[14.75px] leading-[1.82] text-[color:var(--color-muted-light)] sm:text-[15.25px]">
                {page.identity.description}
              </p>
            </div>

            <div className="rounded-[28px] border border-[color:var(--color-border-light)] bg-[linear-gradient(180deg,#ffffff,#f8fafc)] p-5 shadow-[0_18px_46px_rgba(2,6,23,0.08)] sm:p-6">
              <div className="text-[11px] font-semibold tracking-[0.14em] uppercase" style={{ color: page.theme.accent }}>
                Dry van operating signals
              </div>
              <div className="mt-4 grid gap-3 sm:grid-cols-2">
                {page.identity.signals.map((signal) => (
                  <div
                    key={signal}
                    className="rounded-2xl border border-[color:var(--color-border-light)] bg-white px-4 py-4 text-sm leading-6 text-[color:var(--color-text-light)]"
                  >
                    {signal}
                  </div>
                ))}
              </div>
            </div>
          </div>
        </Container>
      </section>

      <section
        id="solution-use"
        className="bg-[color:var(--color-surface-0-light)]"
        style={{ scrollMarginTop: `${SECTION_SCROLL_MARGIN}px` }}
      >
        <Container className="site-page-container py-16 sm:py-20">
          <div className="max-w-[46rem]">
            <SectionSignalEyebrow label={page.whenToUse.eyebrow} />
            <h2 className="mt-4 max-w-[24ch] text-[2rem] font-semibold leading-[1.08] tracking-tight text-[color:var(--color-text-light)] sm:text-[2.35rem]">
              {page.whenToUse.title}
            </h2>
            <p className="mt-4 max-w-[62ch] text-[14.75px] leading-[1.82] text-[color:var(--color-muted-light)] sm:text-[15.25px]">
              {page.whenToUse.description}
            </p>
          </div>

          <div className="mt-10 rounded-[28px] border border-[color:var(--color-border-light)] bg-white p-6 shadow-[0_12px_30px_rgba(2,6,23,0.05)]">
            <ul className="grid gap-4 md:grid-cols-2">
              {page.whenToUse.items.map((item) => (
                <li key={item} className="flex items-start gap-3">
                  <span className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full" style={{ backgroundColor: page.theme.accent }} aria-hidden />
                  <span className="text-[14px] leading-7 text-[color:var(--color-muted-light)]">{item}</span>
                </li>
              ))}
            </ul>
          </div>
        </Container>
      </section>

      <section
        id="solution-freight-fit"
        className="bg-white"
        style={{ scrollMarginTop: `${SECTION_SCROLL_MARGIN}px` }}
      >
        <Container className="site-page-container py-16 sm:py-20">
          <div className="max-w-[46rem]">
            <SectionSignalEyebrow label={page.freightFit.eyebrow} />
            <h2 className="mt-4 max-w-[24ch] text-[2rem] font-semibold leading-[1.08] tracking-tight text-[color:var(--color-text-light)] sm:text-[2.35rem]">
              {page.freightFit.title}
            </h2>
            <p className="mt-4 max-w-[62ch] text-[14.75px] leading-[1.82] text-[color:var(--color-muted-light)] sm:text-[15.25px]">
              {page.freightFit.description}
            </p>
          </div>

          <div className="mt-10 grid gap-6 xl:grid-cols-[minmax(0,0.96fr)_minmax(320px,1.04fr)]">
            <FreightFitGuideMedia
              diagram={page.freightFit.guide.diagram}
              diagramAlt={page.freightFit.guide.diagramAlt}
              specs={page.freightFit.guide.specs}
              disclaimer={page.freightFit.guide.disclaimer}
            />
            <div className="rounded-[28px] border border-[color:var(--color-border-light)] bg-[linear-gradient(180deg,#ffffff,#f8fafc)] p-6 shadow-[0_12px_30px_rgba(2,6,23,0.05)]">
              <FreightFitGuideRecommendations
                title={page.freightFit.guide.title}
                intro={page.freightFit.guide.intro}
                rules={page.freightFit.guide.rules.map((rule) => ({
                  condition: rule.condition,
                  recommendation: rule.recommendation,
                  serviceSlug: rule.serviceSlug,
                  description: rule.description,
                }))}
              />
            </div>
          </div>
        </Container>
      </section>

      <section
        id="solution-execution"
        className="bg-[color:var(--color-surface-0-light)]"
        style={{ scrollMarginTop: `${SECTION_SCROLL_MARGIN}px` }}
      >
        <Container className="site-page-container py-16 sm:py-20">
          <div className="max-w-[46rem]">
            <SectionSignalEyebrow label={page.execution.eyebrow} />
            <h2 className="mt-4 max-w-[24ch] text-[2rem] font-semibold leading-[1.08] tracking-tight text-[color:var(--color-text-light)] sm:text-[2.35rem]">
              {page.execution.title}
            </h2>
            <p className="mt-4 max-w-[62ch] text-[14.75px] leading-[1.82] text-[color:var(--color-muted-light)] sm:text-[15.25px]">
              {page.execution.description}
            </p>
          </div>

          <div className="mt-10 grid gap-4 lg:grid-cols-3">
            {page.execution.pillars.map((pillar, index) => (
              <article
                key={pillar.title}
                className="rounded-[28px] border border-[color:var(--color-border-light)] bg-white p-6 shadow-[0_12px_30px_rgba(2,6,23,0.05)]"
              >
                <div
                  className="inline-flex h-7 min-w-8 items-center justify-center rounded-md px-2 text-[10px] font-semibold tracking-[0.12em] uppercase"
                  style={{
                    backgroundColor: `color-mix(in srgb, ${page.theme.accent} 12%, white)`,
                    color: page.theme.accent,
                  }}
                >
                  {`0${index + 1}`}
                </div>
                <h3 className="mt-4 text-[20px] font-semibold tracking-tight text-[color:var(--color-text-light)]">
                  {pillar.title}
                </h3>
                <p className="mt-3 text-[14px] leading-7 text-[color:var(--color-muted-light)]">
                  {pillar.body}
                </p>
              </article>
            ))}
          </div>

          <div className="mt-6 rounded-[28px] border border-[color:var(--color-border-light)] bg-white p-6 shadow-[0_12px_30px_rgba(2,6,23,0.05)]">
            <SectionEyebrow label={page.engagement.eyebrow} accentColor={page.theme.accent} />
            <h3 className="mt-4 text-[1.6rem] font-semibold tracking-tight text-[color:var(--color-text-light)]">
              {page.engagement.title}
            </h3>
            <p className="mt-3 max-w-[62ch] text-[14px] leading-7 text-[color:var(--color-muted-light)]">
              {page.engagement.description}
            </p>
            <ol className="mt-6 grid gap-4 md:grid-cols-2 xl:grid-cols-5">
              {page.engagement.steps.map((step, index) => (
                <li
                  key={step}
                  className="rounded-2xl border border-[color:var(--color-border-light)] bg-[color:var(--color-surface-0-light)] px-4 py-4"
                >
                  <div
                    className="inline-flex h-6 min-w-6 items-center justify-center rounded-md px-1 text-[10px] font-semibold tracking-[0.12em] uppercase"
                    style={{
                      backgroundColor: `color-mix(in srgb, ${page.theme.accent} 12%, white)`,
                      color: page.theme.accent,
                    }}
                  >
                    {index + 1}
                  </div>
                  <p className="mt-3 text-[13px] leading-6 text-[color:var(--color-text-light)]">{step}</p>
                </li>
              ))}
            </ol>
          </div>
        </Container>
      </section>

      <section
        id="solution-related"
        className="bg-white"
        style={{ scrollMarginTop: `${SECTION_SCROLL_MARGIN}px` }}
      >
        <Container className="site-page-container py-16 sm:py-20">
          <div className="max-w-[46rem]">
            <SectionSignalEyebrow label={page.relatedSolutions.eyebrow} />
            <h2 className="mt-4 max-w-[24ch] text-[2rem] font-semibold leading-[1.08] tracking-tight text-[color:var(--color-text-light)] sm:text-[2.35rem]">
              {page.relatedSolutions.title}
            </h2>
            <p className="mt-4 max-w-[62ch] text-[14.75px] leading-[1.82] text-[color:var(--color-muted-light)] sm:text-[15.25px]">
              {page.relatedSolutions.description}
            </p>
          </div>

          <div className="mt-10 grid gap-4 md:grid-cols-2 xl:grid-cols-5">
            {page.relatedSolutions.items.map((item) => (
              <Link
                key={item.label}
                href={item.href}
                className="rounded-[26px] border border-[color:var(--color-border-light)] bg-[linear-gradient(180deg,#ffffff,#f8fafc)] p-5 shadow-[0_12px_30px_rgba(2,6,23,0.05)] transition hover:-translate-y-[2px] hover:shadow-[0_18px_38px_rgba(2,6,23,0.08)] focus-ring-surface"
              >
                <h3 className="text-[18px] font-semibold tracking-tight text-[color:var(--color-text-light)]">
                  {item.label}
                </h3>
                <p className="mt-3 text-[13px] leading-6 text-[color:var(--color-muted-light)]">
                  {item.reason}
                </p>
                <div className="mt-4 text-sm font-semibold" style={{ color: page.theme.accent }}>
                  View solution
                </div>
              </Link>
            ))}
          </div>
        </Container>
      </section>

      <section className="bg-[color:var(--color-surface-0-light)]">
        <Container className="site-page-container py-16 sm:py-20">
          <div className="max-w-[46rem]">
            <SectionSignalEyebrow label={page.faq.eyebrow} />
            <h2 className="mt-4 max-w-[24ch] text-[2rem] font-semibold leading-[1.08] tracking-tight text-[color:var(--color-text-light)] sm:text-[2.35rem]">
              {page.faq.title}
            </h2>
          </div>

          <div className="mt-10 grid gap-4 lg:grid-cols-3">
            {page.faq.items.map((item) => (
              <article
                key={item.question}
                className="rounded-[28px] border border-[color:var(--color-border-light)] bg-white p-6 shadow-[0_12px_30px_rgba(2,6,23,0.05)]"
              >
                <h3 className="text-[18px] font-semibold tracking-tight text-[color:var(--color-text-light)]">
                  {item.question}
                </h3>
                <p className="mt-3 text-[14px] leading-7 text-[color:var(--color-muted-light)]">
                  {item.answer}
                </p>
              </article>
            ))}
          </div>
        </Container>
      </section>

      <StandardFinalCta
        headingId={`solution-${page.slug}-final-cta`}
        trackingLocation={`solution_page:${page.slug}:final_cta`}
        variant="industry"
        accentColor={page.theme.accent}
        trustSignalAccentColor={page.theme.accent}
        data={{
          kicker: page.finalCta.kicker,
          title: page.finalCta.title,
          body: page.finalCta.body,
          trustSignals: page.finalCta.trustSignals,
          proof: page.finalCta.proof,
          ctas: page.finalCta.ctas,
        }}
      />
    </>
  );
}
