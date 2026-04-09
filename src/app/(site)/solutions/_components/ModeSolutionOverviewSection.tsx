import { Container } from "@/app/(site)/components/layout/Container";
import { SectionSignalEyebrow } from "@/app/(site)/components/ui/SectionSignalEyebrow";
import { SolutionOverviewVideoStage } from "@/app/(site)/solutions/_components/SolutionOverviewVideoStage";
import type { SolutionFamilyPageData } from "@/config/solutionPages";

type Props = {
  slug: string;
  section: SolutionFamilyPageData["modeOverview"];
  scrollMarginTop?: number;
};

export function ModeSolutionOverviewSection({
  slug,
  section,
  scrollMarginTop,
}: Props) {
  const headingId = `solution-${slug}-mode-overview-heading`;

  return (
    <section
      id="solution-mode-overview"
      aria-labelledby={headingId}
      className="border-y border-[color:var(--color-border-light-soft)] bg-[color:var(--color-surface-1-light)]"
      style={scrollMarginTop ? { scrollMarginTop } : undefined}
    >
      <Container className="site-page-container relative py-16 sm:py-20 lg:py-24">
        <div className="mx-auto grid max-w-[64rem] gap-10 md:grid-cols-[minmax(0,1fr)_minmax(280px,0.92fr)] md:items-center md:gap-8 lg:grid-cols-[minmax(0,30rem)_minmax(360px,520px)] lg:gap-10 xl:max-w-[66rem] xl:gap-12">
          <div className="max-w-none md:max-w-[28rem] lg:max-w-[32rem]">
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
          </div>

          <div className="mx-auto w-full max-w-[520px] md:mx-0 md:justify-self-end">
            <SolutionOverviewVideoStage video={section.video} />
          </div>
        </div>
      </Container>
    </section>
  );
}
