"use client";

import { useReducedMotion } from "framer-motion";
import { TrackedLink } from "@/app/(site)/components/analytics/TrackedLink";
import { NetworkCardTopHairline } from "@/app/(site)/components/network/NetworkCardTopHairline";
import { NetworkCoverageHero } from "@/app/(site)/components/network/NetworkCoverageHero";
import { NetworkPageContentSection } from "@/app/(site)/components/network/NetworkPageContentSection";
import { LANES_HUB_HERO } from "@/config/networkPages";
import { getSeoLanePriority, type SeoLanePage, type SeoPriority } from "@/config/seoLanes";
import {
  networkHubCard,
  networkHubPriorityDefault,
  networkHubPriorityP1,
} from "@/app/(site)/components/network/networkPageClasses";
import { cn } from "@/lib/cn";

type LanesIndexContentProps = {
  lanes: readonly SeoLanePage[];
};

export function LanesIndexContent({ lanes }: LanesIndexContentProps) {
  const reduceMotion = useReducedMotion() ?? false;
  const sorted = [...lanes].sort((a, b) => {
    const rank: Record<SeoPriority, number> = { P1: 1, P2: 2, P3: 3 };
    const pa = rank[getSeoLanePriority(a.slug)];
    const pb = rank[getSeoLanePriority(b.slug)];
    return pa - pb || a.originLabel.localeCompare(b.originLabel);
  });

  return (
    <>
      <NetworkCoverageHero
        reduceMotion={reduceMotion}
        sectionLabelledBy="lanes-hero-heading"
        backHref={LANES_HUB_HERO.backHref}
        backLabel={LANES_HUB_HERO.backLabel}
        eyebrow={LANES_HUB_HERO.eyebrow}
        title={LANES_HUB_HERO.title}
        description={LANES_HUB_HERO.description}
      />
      <NetworkPageContentSection containerClassName="max-w-6xl">
        <div className="grid gap-4 sm:grid-cols-2">
          {sorted.map((lane) => {
            const priority = getSeoLanePriority(lane.slug);
            return (
              <TrackedLink
                key={lane.slug}
                href={`/lanes/${lane.slug}`}
                ctaId={`lanes_hub_open_${lane.slug}`}
                location="lanes_hub:cards"
                label={`${lane.originLabel} to ${lane.destinationLabel}`}
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
                <h2 className="pr-12 text-[15px] font-semibold tracking-tight text-[color:var(--color-text-strong)]">
                  {lane.originLabel} to {lane.destinationLabel}
                </h2>
                <p className="mt-2 text-sm leading-relaxed text-[color:var(--color-muted-light)]">{lane.intro}</p>
              </TrackedLink>
            );
          })}
        </div>
      </NetworkPageContentSection>
    </>
  );
}
