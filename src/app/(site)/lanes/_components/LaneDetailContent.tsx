"use client";

import { useReducedMotion } from "framer-motion";
import { ArrowRight, Check, ListChecks, MapPin, Package } from "lucide-react";
import { TrackedLink } from "@/app/(site)/components/analytics/TrackedLink";
import { NetworkCardTopHairline } from "@/app/(site)/components/network/NetworkCardTopHairline";
import { NetworkCoverageHero } from "@/app/(site)/components/network/NetworkCoverageHero";
import {
  networkCardFooterNote,
  networkDetailHeaderBand,
  networkDetailPrimaryCard,
  networkIconTile,
  networkInsetLink,
  networkInsetLinkChevron,
  networkListCheck,
  networkSectionTitle,
  networkSideCard,
} from "@/app/(site)/components/network/networkPageClasses";
import { NetworkPageContentSection } from "@/app/(site)/components/network/NetworkPageContentSection";
import { LANE_DETAIL } from "@/config/networkPages";
import type { SeoLanePage } from "@/config/seoLanes";

type LaneDetailContentProps = {
  lane: SeoLanePage;
};

export function LaneDetailContent({ lane }: LaneDetailContentProps) {
  const reduceMotion = useReducedMotion() ?? false;
  const deliverId = `lane-${lane.slug}-deliver-heading`;
  const servicesId = `lane-${lane.slug}-services-heading`;
  const locId = `lane-${lane.slug}-locations-heading`;

  return (
    <>
      <NetworkCoverageHero
        reduceMotion={reduceMotion}
        sectionLabelledBy="lane-hero-heading"
        backHref={LANE_DETAIL.backHref}
        backLabel={LANE_DETAIL.backLabel}
        eyebrow={LANE_DETAIL.heroEyebrow}
        title={lane.title}
        description={lane.intro}
        primaryCta={{
          href: "/quote",
          ctaId: `lane_detail_quote_${lane.slug}`,
          location: "lane_detail:hero",
          label: "Request a quote for this lane",
        }}
      />
      <NetworkPageContentSection containerClassName="max-w-6xl">
        <section
          aria-labelledby={deliverId}
          className={networkDetailPrimaryCard}
        >
          <div className={networkDetailHeaderBand}>
            <div className="flex items-start gap-3 sm:gap-4">
              <span className={networkIconTile} aria-hidden>
                <ListChecks className="h-4.5 w-4.5" />
              </span>
              <div className="min-w-0 flex-1">
                <h2 id={deliverId} className={networkSectionTitle}>
                  What this lane is built for
                </h2>
                <p className="mt-1.5 text-[13px] leading-relaxed text-[color:var(--color-muted)]">
                  Mode fit, border controls, and visibility from pickup to delivery
                </p>
              </div>
            </div>
          </div>
          <ul className="divide-y divide-[color:var(--color-border-light)]/65 px-5 sm:px-6">
            {lane.bestFor.map((item) => (
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
          <div className={networkCardFooterNote}>
            <p>
              Commercial and operations teams respond within one business day on most requests
            </p>
          </div>
        </section>

        <div className="mt-8 grid gap-6 md:grid-cols-2">
          <section aria-labelledby={servicesId} className={networkSideCard}>
            <NetworkCardTopHairline variant="side" />
            <div className="flex items-center gap-3 sm:gap-3.5">
              <span className={networkIconTile} aria-hidden>
                <Package className="h-4.5 w-4.5" />
              </span>
              <h2 id={servicesId} className={networkSectionTitle}>
                Related capabilities
              </h2>
            </div>
            <p className="mt-1.5 pl-0 text-[13px] leading-relaxed text-[color:var(--color-muted)] sm:pl-[3.25rem]">
              Service modes and governance that typically apply to this corridor
            </p>
            <div className="mt-4 flex flex-col gap-2 pl-0 sm:pl-[3.25rem]">
              {lane.relatedServices.map((service) => (
                <TrackedLink
                  key={service.href}
                  href={service.href}
                  ctaId={`lane_detail_related_service_${lane.slug}_${service.label}`}
                  location="lane_detail:related_services"
                  label={service.label}
                  className={networkInsetLink}
                >
                  <span className="min-w-0">{service.label}</span>
                  <ArrowRight className={networkInsetLinkChevron} />
                </TrackedLink>
              ))}
            </div>
          </section>

          <section aria-labelledby={locId} className={networkSideCard}>
            <NetworkCardTopHairline variant="side" />
            <div className="flex items-center gap-3 sm:gap-3.5">
              <span className={networkIconTile} aria-hidden>
                <MapPin className="h-4.5 w-4.5" />
              </span>
              <h2 id={locId} className={networkSectionTitle}>
                Market pages
              </h2>
            </div>
            <p className="mt-1.5 pl-0 text-[13px] leading-relaxed text-[color:var(--color-muted)] sm:pl-[3.25rem]">
              Hubs and coverage detail for key endpoints on this lane
            </p>
            <div className="mt-4 flex flex-col gap-2 pl-0 sm:pl-[3.25rem]">
              {lane.relatedLocations.map((item) => (
                <TrackedLink
                  key={item.href}
                  href={item.href}
                  ctaId={`lane_detail_related_location_${lane.slug}_${item.label}`}
                  location="lane_detail:related_locations"
                  label={item.label}
                  className={networkInsetLink}
                >
                  <span className="min-w-0">{item.label}</span>
                  <ArrowRight className={networkInsetLinkChevron} />
                </TrackedLink>
              ))}
            </div>
          </section>
        </div>
      </NetworkPageContentSection>
    </>
  );
}
