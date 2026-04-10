import { Container } from "@/app/(site)/components/layout/Container";
import { SectionSignalEyebrow } from "@/app/(site)/components/ui/SectionSignalEyebrow";
import Image from "next/image";
import type { SolutionFamilyPageData } from "@/config/solutionPages";

type OverviewSectionData = SolutionFamilyPageData["modeOverview"] & {
  imageCard: NonNullable<SolutionFamilyPageData["modeOverview"]["imageCard"]>;
};

type Props = {
  slug: string;
  section: OverviewSectionData;
  accent: string;
  scrollMarginTop?: number;
};

export function DedicatedSolutionOverviewSection({
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
        <div className="mx-auto grid max-w-[73rem] gap-10 md:grid-cols-[minmax(0,1fr)_minmax(300px,0.96fr)] md:items-center md:gap-8 lg:grid-cols-[minmax(0,34rem)_minmax(400px,580px)] lg:gap-10 xl:max-w-[75rem] xl:gap-12">
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

          <div className="relative mx-auto w-full max-w-[580px] md:mx-0 md:justify-self-end">
            <div
              aria-hidden
              className="pointer-events-none absolute inset-x-10 inset-y-12 rounded-full blur-3xl"
              style={{
                background: `radial-gradient(circle, color-mix(in srgb, ${accent} 10%, white) 0%, transparent 72%)`,
              }}
            />
            <div className="relative rounded-md border-[color:color-mix(in_srgb,var(--color-border-light)_58%,white)] bg-[linear-gradient(180deg,rgba(255,255,255,0.985),rgba(249,250,252,0.96))] p-2.5 shadow-[0_24px_54px_rgba(15,23,42,0.06),0_3px_10px_rgba(15,23,42,0.03)] sm:p-3">
              <div className="overflow-hidden rounded-md border border-[color:color-mix(in_srgb,var(--color-border-light)_72%,white)] bg-[linear-gradient(180deg,#f8fafd,#f3f6fa)]">
                <div className="relative aspect-[16/10] w-full">
                  <Image
                    src={section.imageCard.src}
                    alt={section.imageCard.alt}
                    fill
                    sizes="(min-width: 1280px) 34vw, (min-width: 768px) 44vw, 100vw"
                    className="object-cover"
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      </Container>
    </section>
  );
}
