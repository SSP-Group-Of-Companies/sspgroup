import { SharedFaqSection } from "@/app/(site)/components/faq/SharedFaqSection";
import { HEADER_HEIGHT_PX } from "@/app/(site)/components/layout/header/constants";
import { SectionSignalEyebrow } from "@/app/(site)/components/ui/SectionSignalEyebrow";
import { StandardFinalCta } from "@/app/(site)/components/cta/StandardFinalCta";
import type { SolutionFamilyPageData } from "@/config/solutionPages";
import { SolutionHero } from "@/app/(site)/solutions/_components/SolutionHero";
import { ModeSolutionOverviewSection } from "@/app/(site)/solutions/_components/ModeSolutionOverviewSection";
import { SolutionWhySspSection } from "@/app/(site)/solutions/_components/SolutionWhySspSection";
import { SolutionBestFitSection } from "@/app/(site)/solutions/_components/SolutionBestFitSection";
import { EquipmentSolutionFreightFitSection } from "@/app/(site)/solutions/_components/EquipmentSolutionFreightFitSection";
import { SolutionHowItWorksSection } from "@/app/(site)/solutions/_components/SolutionHowItWorksSection";
import { SolutionWhenToChooseSection } from "@/app/(site)/solutions/_components/SolutionWhenToChooseSection";
import { SolutionRelatedServicesSection } from "@/app/(site)/solutions/_components/SolutionRelatedServicesSection";

const SECTION_SCROLL_MARGIN = HEADER_HEIGHT_PX + 56 + 16;

export function ModeSolutionPage({ page }: { page: SolutionFamilyPageData }) {
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

      <ModeSolutionOverviewSection
        slug={page.slug}
        section={page.modeOverview}
        accent={page.theme.accent}
        scrollMarginTop={SECTION_SCROLL_MARGIN}
      />

      <SolutionWhySspSection section={page.whySsp} accent={page.theme.accent} />

      {page.bestFitProfiles ? (
        <SolutionBestFitSection
          section={page.bestFitProfiles}
          accent={page.theme.accent}
          scrollMarginTop={SECTION_SCROLL_MARGIN}
        />
      ) : page.freightFit ? (
        <EquipmentSolutionFreightFitSection
          slug={page.slug}
          section={page.freightFit}
          accent={page.theme.accent}
          scrollMarginTop={SECTION_SCROLL_MARGIN}
        />
      ) : null}

      <SolutionHowItWorksSection
        section={page.howItWorks}
        accent={page.theme.accent}
        scrollMarginTop={SECTION_SCROLL_MARGIN}
      />

      {page.serviceUse ? (
        <SolutionWhenToChooseSection
          section={page.serviceUse}
          accent={page.theme.accent}
          scrollMarginTop={SECTION_SCROLL_MARGIN}
        />
      ) : null}

      <SolutionRelatedServicesSection
        section={page.relatedSolutions}
        accent={page.theme.accent}
        scrollMarginTop={SECTION_SCROLL_MARGIN}
      />

      <SharedFaqSection
        eyebrow={<SectionSignalEyebrow label={page.faq.eyebrow} accentColor={page.theme.accent} />}
        title={page.faq.title}
        description={page.faq.description}
        items={page.faq.items.map((item) => ({ q: item.question, a: item.answer }))}
        theme="light"
        panelIdPrefix={`solution-${page.slug}-faq`}
        accentColor={page.theme.accent}
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
