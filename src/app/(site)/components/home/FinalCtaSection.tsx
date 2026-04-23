"use client";

import { StandardFinalCta } from "@/app/(site)/components/cta/StandardFinalCta";
import { SectionSignalEyebrow } from "@/app/(site)/components/ui/SectionSignalEyebrow";
import { HOME_FINAL_CTA } from "@/config/homeFinalCta";

export function FinalCtaSection() {
  return (
    <StandardFinalCta
      variant="default"
      headingId="home-final-cta-heading"
      trackingLocation="home_final_cta"
      data={{
        kicker: HOME_FINAL_CTA.kicker,
        title: HOME_FINAL_CTA.title,
        body: HOME_FINAL_CTA.body,
        trustSignals: HOME_FINAL_CTA.trustSignals,
        proof: HOME_FINAL_CTA.proof,
        ctas: {
          primary: {
            label: HOME_FINAL_CTA.ctas.primary.label,
            href: HOME_FINAL_CTA.ctas.primary.href,
            ctaId: HOME_FINAL_CTA.ctas.primary.ctaId,
          },
          secondary: {
            label: HOME_FINAL_CTA.ctas.secondary.label,
            href: HOME_FINAL_CTA.ctas.secondary.href,
            ctaId: HOME_FINAL_CTA.ctas.secondary.ctaId,
          },
        },
      }}
      eyebrow={<SectionSignalEyebrow label={HOME_FINAL_CTA.kicker} light />}
      sectionClassName="border-t border-white/8"
      sectionBackground="linear-gradient(135deg, var(--color-company-hero-midnight-start) 0%, var(--color-company-hero-midnight-end) 100%)"
      accentColor="var(--color-brand-600)"
      trustSignalAccentColor="var(--color-ssp-cyan-500)"
      orbMainColor="rgba(224,43,53,0.1)"
      orbSecondaryColor="rgba(16,167,216,0.1)"
      showNoise
      microCopy={HOME_FINAL_CTA.microCopy}
    />
  );
}
