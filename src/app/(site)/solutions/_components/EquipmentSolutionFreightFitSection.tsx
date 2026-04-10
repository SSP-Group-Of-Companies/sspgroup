import { Container } from "@/app/(site)/components/layout/Container";
import { SectionSignalEyebrow } from "@/app/(site)/components/ui/SectionSignalEyebrow";
import { SolutionFreightGuideRecommendations } from "@/app/(site)/solutions/_components/SolutionFreightGuide";
import type { SolutionFreightFitSectionData } from "@/config/solutionPages";

type Props = {
  slug: string;
  section: SolutionFreightFitSectionData;
  accent: string;
  scrollMarginTop?: number;
};

const NOISE_TEXTURE =
  "url(\"data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)' opacity='1'/%3E%3C/svg%3E\")";

export function EquipmentSolutionFreightFitSection({
  slug,
  section,
  accent,
  scrollMarginTop,
}: Props) {
  const headingId = `solution-${slug}-freight-fit-heading`;

  return (
    <section
      id="solution-freight-fit"
      aria-labelledby={headingId}
      className="relative overflow-hidden bg-[linear-gradient(138deg,var(--color-company-hero-midnight-start)_0%,var(--color-company-ink)_56%,var(--color-company-hero-midnight-end)_100%)]"
      style={scrollMarginTop ? { scrollMarginTop } : undefined}
    >
      <div className="pointer-events-none absolute inset-0" aria-hidden>
        <div
          className="absolute inset-0"
          style={{
            background: `radial-gradient(46% 52% at 86% 16%, color-mix(in srgb, ${accent} 22%, transparent), transparent 72%)`,
          }}
        />
        <div className="absolute inset-0 bg-[radial-gradient(36%_40%_at_0%_100%,rgba(215,25,32,0.07),transparent_72%)]" />
        <div
          className="absolute inset-0 opacity-[0.015]"
          style={{ backgroundImage: NOISE_TEXTURE }}
        />
      </div>

      <Container className="site-page-container relative py-16 sm:py-20 lg:py-24">
        <div className="max-w-[46rem]">
          <SectionSignalEyebrow label={section.eyebrow} light accentColor={accent} />
          <h2
            id={headingId}
            className="mt-4 max-w-[22ch] text-balance text-[2rem] font-semibold leading-[1.08] tracking-tight text-white sm:max-w-[24ch] sm:text-[2.35rem]"
          >
            {section.title}
          </h2>
          <p className="mt-4 max-w-[62ch] text-[14.75px] leading-[1.82] text-white/74 sm:text-[15.25px]">
            {section.description}
          </p>
        </div>

        <div
          className="mt-10 rounded-md border border-[color:var(--color-border-light)] bg-[linear-gradient(180deg,var(--color-surface-0-light),var(--color-surface-1-light))] p-6 shadow-[0_12px_30px_rgba(2,6,23,0.05)]"
          style={{
            boxShadow: `0 12px 30px rgba(2,6,23,0.05), 0 1px 0 color-mix(in srgb, ${accent} 18%, transparent) inset`,
          }}
        >
          <SolutionFreightGuideRecommendations
            title={section.guide.title}
            intro={section.guide.intro}
            rules={section.guide.rules.map((rule) => ({
              condition: rule.condition,
              recommendation: rule.recommendation,
              serviceSlug: rule.serviceSlug,
              description: rule.description,
            }))}
          />
        </div>
      </Container>
    </section>
  );
}
