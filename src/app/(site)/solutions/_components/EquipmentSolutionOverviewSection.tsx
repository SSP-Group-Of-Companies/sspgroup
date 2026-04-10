import { Container } from "@/app/(site)/components/layout/Container";
import { SectionSignalEyebrow } from "@/app/(site)/components/ui/SectionSignalEyebrow";
import { SolutionFreightGuideDiagram } from "@/app/(site)/solutions/_components/SolutionFreightGuide";
import type { SolutionDetailPageData } from "@/config/solutionPages";
import { cn } from "@/lib/cn";

type Props = {
  section: SolutionDetailPageData["equipmentOverview"];
  guide: SolutionDetailPageData["freightFit"]["guide"];
  accent: string;
  scrollMarginTop?: number;
};

export function EquipmentSolutionOverviewSection({
  section,
  guide,
  accent,
  scrollMarginTop,
}: Props) {
  const headingId = "solution-overview-heading";
  const overviewSpecs = [
    { label: "Length", value: guide.specs.length },
    { label: "Width", value: guide.specs.width },
    { label: "Height", value: guide.specs.height },
    { label: "Max Freight Weight", value: guide.specs.weight },
    ...(guide.specs.capacity
      ? [{ label: guide.specs.capacity.label, value: guide.specs.capacity.value }]
      : []),
  ];

  return (
    <section
      id="solution-overview"
      aria-labelledby={headingId}
      className="border-y border-[color:var(--color-border-light-soft)] bg-[color:var(--color-surface-1-light)]"
      style={scrollMarginTop ? { scrollMarginTop } : undefined}
    >
      <Container className="site-page-container relative py-16 sm:py-20">
        <div className="mx-auto grid max-w-[73rem] gap-10 md:grid-cols-[minmax(0,1fr)_minmax(300px,0.96fr)] md:items-center md:gap-8 lg:grid-cols-[minmax(0,1.04fr)_minmax(400px,580px)] lg:gap-10 xl:max-w-[75rem] xl:gap-12">
          <div className="max-w-none md:max-w-[32rem] lg:max-w-[36rem]">
            <SectionSignalEyebrow label={section.eyebrow} accentColor={accent} />
            <h2
              id={headingId}
              className="mt-4 max-w-[19ch] text-balance text-[1.95rem] font-semibold leading-[1.08] tracking-tight text-[color:var(--color-text-light)] sm:max-w-[21ch] sm:text-[2.2rem] xl:text-[2.35rem]"
            >
              {section.title ?? "Technical specs and dimensions."}
            </h2>
            {section.description ? (
              <p className="mt-5 max-w-[62ch] text-[14.85px] leading-[1.82] text-[color:var(--color-muted-light)] sm:text-[15.2px]">
                {section.description}
              </p>
            ) : null}
            <div className="relative mt-7 max-w-[36rem]">
              <div
                aria-hidden
                className="pointer-events-none absolute -left-10 -top-3 h-32 w-32 rounded-full blur-3xl"
                style={{
                  background: `radial-gradient(circle, color-mix(in srgb, ${accent} 14%, white) 0%, transparent 72%)`,
                }}
              />
              <div
                aria-hidden
                className="pointer-events-none absolute left-0 top-0 h-px w-14"
                style={{
                  background: `linear-gradient(90deg, color-mix(in srgb, ${accent} 42%, white) 0%, transparent 100%)`,
                }}
              />
              <dl className="relative grid gap-x-10 gap-y-8 pt-6 sm:grid-cols-2 sm:gap-y-9">
                {overviewSpecs.map((spec, index) => (
                  <div
                    key={spec.label}
                    className={cn(
                      "relative",
                      index === overviewSpecs.length - 1 && overviewSpecs.length % 2 !== 0 && "sm:col-span-2",
                    )}
                  >
                    <dt className="text-[10px] font-semibold uppercase tracking-[0.18em] text-[color:var(--color-subtle-light)]">
                      {spec.label}
                    </dt>
                    <dd className="mt-3 max-w-[18ch] text-[1.18rem] font-semibold leading-[1.22] tracking-tight text-[color:var(--color-text-light)] sm:text-[1.28rem]">
                      {spec.value}
                    </dd>
                  </div>
                ))}
              </dl>
            </div>
          </div>

          <div className="relative mx-auto w-full max-w-[580px] md:mx-0 md:justify-self-end">
            <div
              aria-hidden
              className="pointer-events-none absolute inset-x-10 inset-y-12 rounded-full blur-3xl"
              style={{
                background: `radial-gradient(circle, color-mix(in srgb, ${accent} 10%, white) 0%, transparent 72%)`,
              }}
            />
            <SolutionFreightGuideDiagram
              diagram={guide.diagram}
              diagramAlt={guide.diagramAlt}
              className="relative rounded-md border-[color:color-mix(in_srgb,var(--color-border-light)_58%,white)] bg-[linear-gradient(180deg,rgba(255,255,255,0.985),rgba(249,250,252,0.96))] p-2.5 shadow-[0_24px_54px_rgba(15,23,42,0.06),0_3px_10px_rgba(15,23,42,0.03)] sm:p-3"
            />
          </div>
        </div>
      </Container>
    </section>
  );
}
