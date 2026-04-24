"use client";

import { useReducedMotion } from "framer-motion";
import { ArrowRight, Building2, Check, MapPinned } from "lucide-react";
import { TrackedLink } from "@/app/(site)/components/analytics/TrackedLink";
import { NetworkCardTopHairline } from "@/app/(site)/components/network/NetworkCardTopHairline";
import { NetworkCoverageHero } from "@/app/(site)/components/network/NetworkCoverageHero";
import {
  networkDetailHeaderBand,
  networkDetailPrimaryCard,
  networkIconTile,
  networkInsetLink,
  networkInsetLinkChevron,
  networkListCheck,
  networkSectionTitle,
} from "@/app/(site)/components/network/networkPageClasses";
import { NetworkPageContentSection } from "@/app/(site)/components/network/NetworkPageContentSection";
import { LOCATION_DETAIL } from "@/config/networkPages";
import type { SeoLocationPage } from "@/config/seoLocations";

type LocationDetailContentProps = {
  location: SeoLocationPage;
};

export function LocationDetailContent({ location }: LocationDetailContentProps) {
  const reduceMotion = useReducedMotion() ?? false;
  const capabilitiesId = `location-${location.slug}-capabilities-heading`;
  const lanesId = `location-${location.slug}-lanes-heading`;

  return (
    <>
      <NetworkCoverageHero
        reduceMotion={reduceMotion}
        sectionLabelledBy="location-hero-heading"
        backHref={LOCATION_DETAIL.backHref}
        backLabel={LOCATION_DETAIL.backLabel}
        eyebrow={LOCATION_DETAIL.heroEyebrow}
        title={location.title}
        description={location.intro}
        primaryCta={{
          href: "/quote",
          ctaId: `location_detail_quote_${location.slug}`,
          location: "location_detail:hero",
          label: "Request a freight quote",
        }}
      />
      <NetworkPageContentSection containerClassName="max-w-6xl">
        <section aria-labelledby={capabilitiesId} className={networkDetailPrimaryCard}>
          <NetworkCardTopHairline variant="primary" />
          <div className={networkDetailHeaderBand}>
            <div className="flex items-start gap-3 sm:gap-4">
              <span className={networkIconTile} aria-hidden>
                <Building2 className="h-4.5 w-4.5" />
              </span>
              <div className="min-w-0 flex-1">
                <h2 id={capabilitiesId} className={networkSectionTitle}>
                  {`Execution in ${location.city}`}
                </h2>
                <p className="mt-1.5 text-[13px] leading-relaxed text-[color:var(--color-muted)]">
                  Truckload, LTL, and cross-border programs with accountable milestone control
                </p>
              </div>
            </div>
          </div>
          <ul className="divide-y divide-[color:var(--color-border-light)]/65 px-5 sm:px-6">
            {location.serviceHighlights.map((item) => (
              <li
                key={item}
                className="flex items-start gap-3.5 py-3.5 first:pt-4 first:pb-3.5 last:pb-4"
              >
                <span className={networkListCheck} aria-hidden>
                  <Check className="h-3.5 w-3.5" strokeWidth={2.75} />
                </span>
                <span className="pt-0.5 text-sm leading-[1.65] text-[color:var(--color-text-light)]">
                  {item}
                </span>
              </li>
            ))}
          </ul>
        </section>

        <section aria-labelledby={lanesId} className="mt-8 scroll-mt-4">
          <div className="mb-4 flex items-center gap-3 sm:mb-5">
            <span className={networkIconTile} aria-hidden>
              <MapPinned className="h-4.5 w-4.5" />
            </span>
            <h2 id={lanesId} className={networkSectionTitle}>
              {`Primary lanes from ${location.city}, ${location.region}`}
            </h2>
          </div>
          <p className="mb-4 max-w-2xl pl-0 text-[13px] leading-relaxed text-[color:var(--color-muted)] sm:pl-[3.25rem]">
            High-repeat corridors we scale with dedicated execution and border-ready controls
          </p>
          <div className="grid gap-2.5 pl-0 sm:grid-cols-2 sm:pl-[3.25rem]">
            {location.topLanes.map((lane) => (
              <TrackedLink
                key={lane.href}
                href={lane.href}
                ctaId={`location_detail_lane_${location.slug}_${lane.label}`}
                location="location_detail:top_lanes"
                label={lane.label}
                className={networkInsetLink}
              >
                <span className="min-w-0">{lane.label}</span>
                <ArrowRight className={networkInsetLinkChevron} />
              </TrackedLink>
            ))}
          </div>
        </section>
      </NetworkPageContentSection>
    </>
  );
}
