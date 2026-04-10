import { Container } from "@/app/(site)/components/layout/Container";
import { SectionSignalEyebrow } from "@/app/(site)/components/ui/SectionSignalEyebrow";
import { SolutionOverviewVideoStage } from "@/app/(site)/solutions/_components/SolutionOverviewVideoStage";
import type { SolutionFamilyPageData } from "@/config/solutionPages";

type Props = {
  slug: string;
  section: SolutionFamilyPageData["modeOverview"];
  accent: string;
  scrollMarginTop?: number;
};

export function ModeSolutionOverviewSection({
  slug,
  section,
  accent,
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
        <div className="mx-auto grid max-w-[68rem] gap-10 md:grid-cols-[minmax(0,1fr)_minmax(300px,0.94fr)] md:items-center md:gap-8 lg:grid-cols-[minmax(0,34rem)_minmax(360px,520px)] lg:gap-10 xl:max-w-[70rem] xl:gap-12">
          <div className="max-w-none md:max-w-[32rem] lg:max-w-[34rem]">
            <SectionSignalEyebrow label={section.eyebrow} accentColor={accent} />
            <h2
              id={headingId}
              className="mt-4 max-w-[20ch] text-balance text-[1.95rem] font-semibold leading-[1.08] tracking-tight text-[color:var(--color-text-light)] sm:max-w-[22ch] sm:text-[2.2rem] xl:text-[2.35rem]"
            >
              {section.title}
            </h2>
            <p className="mt-5 max-w-[36rem] text-[14.85px] leading-[1.82] text-[color:var(--color-muted-light)] sm:text-[15.2px]">
              {section.description}
            </p>
          </div>

          <div className="relative mx-auto w-full max-w-[520px] md:mx-0 md:justify-self-end">
            <div
              aria-hidden
              className="pointer-events-none absolute inset-x-10 inset-y-12 rounded-full blur-3xl"
              style={{
                background: `radial-gradient(circle, color-mix(in srgb, ${accent} 10%, white) 0%, transparent 72%)`,
              }}
            />
            <SolutionOverviewVideoStage video={section.video} />
          </div>
        </div>
      </Container>
    </section>
  );
}
