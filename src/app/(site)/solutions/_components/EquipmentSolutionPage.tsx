import { SharedFaqSection } from "@/app/(site)/components/faq/SharedFaqSection";
import { HEADER_HEIGHT_PX } from "@/app/(site)/components/layout/header/constants";
import { SectionSignalEyebrow } from "@/app/(site)/components/ui/SectionSignalEyebrow";
import { StandardFinalCta } from "@/app/(site)/components/cta/StandardFinalCta";
import type { SolutionDetailPageData } from "@/config/solutionPages";
import { SolutionHero } from "@/app/(site)/solutions/_components/SolutionHero";
import { EquipmentSolutionOverviewSection } from "@/app/(site)/solutions/_components/EquipmentSolutionOverviewSection";
import { EquipmentSolutionFreightFitSection } from "@/app/(site)/solutions/_components/EquipmentSolutionFreightFitSection";
import { SolutionWhySspSection } from "@/app/(site)/solutions/_components/SolutionWhySspSection";
import { SolutionHowItWorksSection } from "@/app/(site)/solutions/_components/SolutionHowItWorksSection";
import { SolutionRelatedServicesSection } from "@/app/(site)/solutions/_components/SolutionRelatedServicesSection";

const SECTION_SCROLL_MARGIN = HEADER_HEIGHT_PX + 56 + 16;

export function EquipmentSolutionPage({ page }: { page: SolutionDetailPageData }) {
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

      <EquipmentSolutionOverviewSection
        section={page.equipmentOverview}
        guide={page.freightFit.guide}
        accent={page.theme.accent}
        scrollMarginTop={SECTION_SCROLL_MARGIN}
      />

      <SolutionWhySspSection section={page.whySsp} accent={page.theme.accent} />

      <EquipmentSolutionFreightFitSection
        slug={page.slug}
        section={page.freightFit}
        accent={page.theme.accent}
        scrollMarginTop={SECTION_SCROLL_MARGIN}
      />

      <SolutionHowItWorksSection
        section={page.execution}
        accent={page.theme.accent}
        scrollMarginTop={SECTION_SCROLL_MARGIN}
      />

      <SolutionRelatedServicesSection
        section={page.relatedSolutions}
        accent={page.theme.accent}
        scrollMarginTop={SECTION_SCROLL_MARGIN}
      />

      <SharedFaqSection
        eyebrow={<SectionSignalEyebrow label={page.faq.eyebrow} accentColor={page.theme.accent} />}
        title={page.faq.title}
        description={page.faq.description ?? ""}
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
