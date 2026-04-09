import { Container } from "@/app/(site)/components/layout/Container";
import { SharedFaqSection } from "@/app/(site)/components/faq/SharedFaqSection";
import { HEADER_HEIGHT_PX } from "@/app/(site)/components/layout/header/constants";
import { SectionSignalEyebrow } from "@/app/(site)/components/ui/SectionSignalEyebrow";
import { StandardFinalCta } from "@/app/(site)/components/cta/StandardFinalCta";
import type { SolutionFamilyPageData } from "@/config/solutionPages";
import { SolutionHero } from "@/app/(site)/solutions/_components/SolutionHero";
import { SolutionOverviewVideoStage } from "@/app/(site)/solutions/_components/SolutionOverviewVideoStage";
import { SolutionWhySspSection } from "@/app/(site)/solutions/_components/SolutionWhySspSection";
import { SolutionBestFitSection } from "@/app/(site)/solutions/_components/SolutionBestFitSection";
import { SolutionHowItWorksSection } from "@/app/(site)/solutions/_components/SolutionHowItWorksSection";
import { SolutionWhenToChooseSection } from "@/app/(site)/solutions/_components/SolutionWhenToChooseSection";
import { SolutionRelatedServicesSection } from "@/app/(site)/solutions/_components/SolutionRelatedServicesSection";

const SECTION_SCROLL_MARGIN = HEADER_HEIGHT_PX + 56 + 16;

export function SolutionPageTemplate({ page }: { page: SolutionFamilyPageData }) {
  const modeOverviewHeadingId = `solution-${page.slug}-mode-overview-heading`;

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
        id="solution-mode-overview"
        aria-labelledby={modeOverviewHeadingId}
        className="border-y border-[color:var(--color-border-light-soft)] bg-[color:var(--color-surface-1-light)]"
        style={{ scrollMarginTop: `${SECTION_SCROLL_MARGIN}px` }}
      >
        <Container className="site-page-container relative py-16 sm:py-20">
          <div className="mx-auto grid max-w-[64rem] gap-10 md:grid-cols-[minmax(0,1fr)_minmax(280px,0.92fr)] md:items-center md:gap-8 lg:grid-cols-[minmax(0,30rem)_minmax(360px,520px)] lg:gap-10 xl:max-w-[66rem] xl:gap-12">
            <div className="max-w-none md:max-w-[28rem] lg:max-w-[32rem]">
              <SectionSignalEyebrow label={page.modeOverview.eyebrow} />
              <h2
                id={modeOverviewHeadingId}
                className="mt-4 max-w-[17ch] text-[1.95rem] font-semibold leading-[1.08] tracking-tight text-[color:var(--color-text-light)] sm:text-[2.2rem] xl:text-[2.35rem]"
              >
                {page.modeOverview.title}
              </h2>
              <p className="mt-5 max-w-[34rem] text-[14.85px] leading-[1.82] text-[color:var(--color-muted-light)] sm:text-[15.2px]">
                {page.modeOverview.description}
              </p>
            </div>

            <div className="mx-auto w-full max-w-[520px] md:mx-0 md:justify-self-end">
              <SolutionOverviewVideoStage video={page.modeOverview.video} />
            </div>
          </div>
        </Container>
      </section>

      <SolutionWhySspSection section={page.whySsp} accent={page.theme.accent} />

      <SolutionBestFitSection
        section={page.bestFitProfiles}
        scrollMarginTop={SECTION_SCROLL_MARGIN}
      />

      <SolutionHowItWorksSection
        section={page.howItWorks}
        accent={page.theme.accent}
        scrollMarginTop={SECTION_SCROLL_MARGIN}
      />

      <SolutionWhenToChooseSection
        section={page.serviceUse}
        accent={page.theme.accent}
        scrollMarginTop={SECTION_SCROLL_MARGIN}
      />

      <SolutionRelatedServicesSection
        section={page.relatedSolutions}
        accent={page.theme.accent}
        scrollMarginTop={SECTION_SCROLL_MARGIN}
      />

      <SharedFaqSection
        eyebrow={<SectionSignalEyebrow label={page.faq.eyebrow} />}
        title={page.faq.title}
        description={page.faq.description}
        items={page.faq.items.map((item) => ({ q: item.question, a: item.answer }))}
        theme="light"
        panelIdPrefix={`solution-${page.slug}-faq`}
      />

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
