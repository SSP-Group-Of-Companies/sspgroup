"use client";

import { StandardFinalCta } from "@/app/(site)/components/cta/StandardFinalCta";
import { SectionSignalEyebrow } from "@/app/(site)/components/ui/SectionSignalEyebrow";
import { FAQ_FINAL_CTA } from "@/config/faqs";

export function FaqFinalCta() {
  return (
    <StandardFinalCta
      variant="faq"
      headingId="faq-final-cta-heading"
      trackingLocation="faq_final_cta"
      data={{
        kicker: FAQ_FINAL_CTA.kicker,
        title: FAQ_FINAL_CTA.title,
        body: FAQ_FINAL_CTA.body,
        trustSignals: FAQ_FINAL_CTA.trustSignals,
        proof: FAQ_FINAL_CTA.proof,
        ctas: {
          primary: {
            label: FAQ_FINAL_CTA.ctas.primary.label,
            href: FAQ_FINAL_CTA.ctas.primary.href,
            ctaId: FAQ_FINAL_CTA.ctas.primary.ctaId,
          },
          secondary: {
            label: FAQ_FINAL_CTA.ctas.secondary.label,
            ctaId: FAQ_FINAL_CTA.ctas.secondary.ctaId,
            action: "live-chat",
          },
        },
      }}
      eyebrow={<SectionSignalEyebrow label={FAQ_FINAL_CTA.kicker} light />}
      showNoise
      orbMainColor="rgba(16,167,216,0.12)"
      orbSecondaryColor="rgba(255,255,255,0.06)"
      microCopy={FAQ_FINAL_CTA.microCopy}
    />
  );
}
