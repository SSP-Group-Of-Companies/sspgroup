"use client";

import { useReducedMotion } from "framer-motion";
import { TrackedLink } from "@/app/(site)/components/analytics/TrackedLink";
import { NetworkCardTopHairline } from "@/app/(site)/components/network/NetworkCardTopHairline";
import { NetworkCoverageHero } from "@/app/(site)/components/network/NetworkCoverageHero";
import { NetworkPageContentSection } from "@/app/(site)/components/network/NetworkPageContentSection";
import { LOCATIONS_HUB_HERO } from "@/config/networkPages";
import { getSeoLocationPriority, type SeoLocationPage, type SeoPriority } from "@/config/seoLocations";
import {
  networkHubCard,
  networkHubPriorityDefault,
  networkHubPriorityP1,
} from "@/app/(site)/components/network/networkPageClasses";
import { cn } from "@/lib/cn";

type LocationsIndexContentProps = {
  locations: readonly SeoLocationPage[];
};

export function LocationsIndexContent({ locations }: LocationsIndexContentProps) {
  const reduceMotion = useReducedMotion() ?? false;
  const sorted = [...locations].sort((a, b) => {
    const rank: Record<SeoPriority, number> = { P1: 1, P2: 2, P3: 3 };
    const pa = rank[getSeoLocationPriority(a.slug)];
    const pb = rank[getSeoLocationPriority(b.slug)];
    return pa - pb || a.city.localeCompare(b.city);
  });

  return (
    <>
      <NetworkCoverageHero
        reduceMotion={reduceMotion}
        sectionLabelledBy="locations-hero-heading"
        backHref={LOCATIONS_HUB_HERO.backHref}
        backLabel={LOCATIONS_HUB_HERO.backLabel}
        eyebrow={LOCATIONS_HUB_HERO.eyebrow}
        title={LOCATIONS_HUB_HERO.title}
        description={LOCATIONS_HUB_HERO.description}
      />
      <NetworkPageContentSection containerClassName="max-w-6xl">
        <div className="grid gap-4 sm:grid-cols-2">
          {sorted.map((location) => {
            const priority = getSeoLocationPriority(location.slug);
            return (
              <TrackedLink
                key={location.slug}
                href={`/locations/${location.slug}`}
                ctaId={`locations_hub_open_${location.slug}`}
                location="locations_hub:cards"
                label={`${location.city}, ${location.region}`}
                className={networkHubCard}
              >
                <NetworkCardTopHairline variant="hub" />
                <span
                  className={cn(
                    "absolute right-3 top-3 rounded-full px-2 py-0.5",
                    priority === "P1" ? networkHubPriorityP1 : networkHubPriorityDefault,
                  )}
                >
                  {priority}
                </span>
                <h2 className="text-[15px] font-semibold tracking-tight text-[color:var(--color-text-strong)]">
                  {location.city}, {location.region}
                </h2>
                <p className="mt-1 text-sm text-[color:var(--color-muted-light)]">{location.country}</p>
                <p className="mt-2 text-sm leading-relaxed text-[color:var(--color-muted-light)]">{location.intro}</p>
              </TrackedLink>
            );
          })}
        </div>
      </NetworkPageContentSection>
    </>
  );
}
