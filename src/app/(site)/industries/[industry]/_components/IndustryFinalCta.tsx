"use client";

import { StandardFinalCta } from "@/app/(site)/components/cta/StandardFinalCta";
import { SectionEyebrow } from "@/app/(site)/components/ui/SectionEyebrow";
import type { IndustryPageModel } from "@/config/industryPages";
import { THEME_ACCENT, THEME_BG, getThemeOrbs } from "./industryTheme";

export function IndustryFinalCta({ model }: { model: IndustryPageModel }) {
  const data = model.finalCta;
  const kicker = data.kicker ?? "Start the conversation";
  const trustSignals = data.trustSignals ?? [];
  const implementationSteps = data.implementationSteps ?? [];
  const theme = model.hero.theme;
  const accentColor = THEME_ACCENT[theme];
  const bgColor = THEME_BG[theme];
  const orbs = getThemeOrbs(theme);

  return (
    <StandardFinalCta
      variant="industry"
      headingId="industry-final-cta-heading"
      trackingLocation={`industry_${model.key}_final_cta`}
      data={{
        kicker,
        title: data.title,
        body: data.body,
        trustSignals,
        proof: data.proof,
        ctas: {
          primary: {
            label: data.ctas.primary.label,
            href: data.ctas.primary.href,
            ctaId: data.ctas.primary.ctaId,
          },
          secondary: {
            label: data.ctas.secondary.label,
            ctaId: data.ctas.secondary.ctaId,
            href: data.ctas.secondary.href,
            action: data.ctas.secondary.action,
          },
        },
      }}
      eyebrow={<SectionEyebrow label={kicker} accentColor={accentColor} light />}
      accentColor={accentColor}
      sectionBgColor={bgColor}
      orbMainColor={orbs.main}
      orbSecondaryColor={orbs.secondary}
      leftExtra={
        implementationSteps.length > 0 ? (
          <div className="mt-8 grid gap-3 md:grid-cols-3">
            {implementationSteps.map((step) => (
              <div
                key={step.step}
                className="rounded-xl border border-white/8 bg-white/[0.03] px-3.5 py-3.5"
              >
                <span
                  className="inline-flex h-6 w-6 items-center justify-center rounded-md text-[10px] font-bold"
                  style={{
                    color: accentColor,
                    backgroundColor: `${accentColor}18`,
                  }}
                >
                  {step.step}
                </span>
                <h3 className="mt-2 text-[13px] font-semibold leading-tight tracking-tight text-white">
                  {step.title}
                </h3>
                <p className="mt-1.5 text-[12px] leading-[1.65] text-white/40">
                  {step.body}
                </p>
              </div>
            ))}
          </div>
        ) : null
      }
    />
  );
}
