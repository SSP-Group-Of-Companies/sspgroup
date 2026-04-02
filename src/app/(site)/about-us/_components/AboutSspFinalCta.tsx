"use client";

import { StandardFinalCta } from "@/app/(site)/components/cta/StandardFinalCta";
import type { AboutFinalCtaContent } from "@/config/company";

export function AboutSspFinalCta({ data }: { data: AboutFinalCtaContent }) {
  return (
    <StandardFinalCta
      headingId="about-final-cta-heading"
      trackingLocation="about_final_cta"
      data={data}
      variant="default"
      sectionClassName="border-t border-white/8"
      sectionBackground="linear-gradient(135deg, var(--color-company-hero-midnight-start) 0%, var(--color-company-hero-midnight-end) 100%)"
      accentColor="var(--color-brand-600)"
      trustSignalAccentColor="var(--color-ssp-cyan-500)"
      orbMainColor="rgba(224,43,53,0.1)"
      orbSecondaryColor="rgba(16,167,216,0.1)"
      showNoise
    />
  );
}
