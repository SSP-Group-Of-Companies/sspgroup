import Link from "next/link";
import Image from "next/image";
import { ArrowUpRight } from "lucide-react";
import { cn } from "@/lib/cn";

export type SolutionFreightRule = {
  condition: string;
  recommendation: string;
  serviceSlug?: string;
  description: string;
};

export type SolutionFreightSpecs = {
  length: string;
  width: string;
  height: string;
  weight: string;
  capacity?: {
    label: string;
    value: string;
  };
};

const SOLUTION_LINKS: Record<string, string> = {
  truckload: "/solutions/truckload",
  ltl: "/solutions/ltl",
  "dry-van": "/solutions/dry-van",
  reefer: "/solutions/temperature-controlled",
  "temperature-controlled": "/solutions/temperature-controlled",
  flatbed: "/solutions/flatbed",
  "step-deck": "/solutions/step-deck",
  "rgn-oversize": "/solutions/rgn-heavy-haul",
  hazmat: "/solutions/hazmat",
  "expedited-specialized": "/solutions/expedited",
  "canada-us": "/solutions/cross-border/canada-usa",
  "canada-usa": "/solutions/cross-border/canada-usa",
  "mexico-cross-border": "/solutions/cross-border/mexico",
  "ocean-freight": "/solutions/cross-border/ocean-freight",
  "air-freight": "/solutions/cross-border/air-freight",
  "warehousing-distribution": "/solutions/warehousing-distribution",
  "managed-capacity": "/solutions/managed-capacity",
  "dedicated-contract": "/solutions/dedicated-contract",
  "project-oversize-programs": "/solutions/project-freight",
};

function toSolutionHref(serviceSlug?: string) {
  if (!serviceSlug) return undefined;
  if (serviceSlug.startsWith("/")) return serviceSlug;
  return SOLUTION_LINKS[serviceSlug] ?? `/solutions/${serviceSlug}`;
}

export function SolutionFreightGuideDiagram({
  diagram,
  diagramAlt = "Freight equipment dimensions diagram",
  className,
}: {
  diagram: string;
  diagramAlt?: string;
  className?: string;
}) {
  return (
    <div
      className={cn(
        "rounded-md border bg-[linear-gradient(180deg,rgba(255,255,255,0.98),rgba(247,249,252,0.95))] p-3 shadow-[0_18px_44px_rgba(15,23,42,0.06),0_2px_8px_rgba(15,23,42,0.04)]",
        className,
      )}
    >
      <div className="overflow-hidden rounded-md border border-[color:color-mix(in_srgb,var(--color-border-light)_72%,white)] bg-[linear-gradient(180deg,#f8fafd,#f3f6fa)]">
        <div className="relative aspect-[16/10] w-full">
          <Image
            src={diagram}
            alt={diagramAlt}
            fill
            sizes="(min-width: 1280px) 34vw, (min-width: 768px) 44vw, 100vw"
            className="object-contain"
          />
        </div>
      </div>
    </div>
  );
}

export function SolutionFreightGuideRecommendations({
  rules,
  title = "Freight Fit Recommendations",
  intro,
}: {
  rules: SolutionFreightRule[];
  title?: string;
  intro?: string;
}) {
  return (
    <div className="mt-8">
      <h3 className="text-[1.18rem] font-semibold tracking-tight text-[color:var(--color-text-light)] sm:text-[1.28rem]">
        {title}
      </h3>
      {intro ? (
        <p className="mt-2.5 text-[15px] leading-[1.72] text-[color:var(--color-muted-light)] sm:text-[15.5px]">
          {intro}
        </p>
      ) : null}
      <div className="mt-4 grid gap-3 md:grid-cols-2">
        {rules.map((rule) => {
          const href = toSolutionHref(rule.serviceSlug);
          const cardClass = cn(
            "rounded-md border border-[color:var(--color-border-light)] bg-white p-4 shadow-[0_8px_24px_rgba(15,23,42,0.05)] transition-all duration-300",
            href
              ? "group block cursor-pointer hover:-translate-y-[1px] hover:shadow-[0_18px_34px_rgba(15,23,42,0.08)]"
              : "",
          );

          const content = (
            <>
              <div className="text-[11px] font-semibold uppercase tracking-wide text-[color:var(--color-muted-light)]">
                If your freight is
              </div>
              <h4 className="mt-1 text-sm font-semibold text-[color:var(--color-text-light)]">
                {rule.condition}
              </h4>
              <p className="mt-2 text-sm leading-relaxed text-[color:var(--color-muted-light)]">
                {rule.description}
              </p>
              <div className="mt-3 text-xs font-semibold uppercase tracking-wide text-[color:var(--color-muted-light)]">
                Recommended
              </div>
              <div className="mt-1 flex items-center justify-between gap-3">
                <span
                  className={cn(
                    "text-sm font-semibold",
                    href
                      ? "text-[color:var(--color-brand-600)] underline decoration-[color:var(--color-brand-300)] underline-offset-2 group-hover:text-[color:var(--color-brand-700)]"
                      : "text-[color:var(--color-text-light)]",
                  )}
                >
                  {rule.recommendation}
                </span>
                {href ? (
                  <div className="lg:self-end">
                    <div
                      className="group/cta relative inline-flex w-fit items-center gap-2 pb-0.5 text-[12.2px] font-semibold tracking-[0.01em] transition-colors duration-200 after:absolute after:bottom-0 after:left-0 after:h-px after:w-[calc(100%-1.2rem)] after:origin-left after:scale-x-0 after:bg-current after:transition-transform after:duration-200 group-hover:after:scale-x-100 group-focus-visible:after:scale-x-100"
                      style={{ color: "var(--color-brand-600)" }}
                    >
                      <span className="transition-colors duration-200">
                        Explore profile
                      </span>
                      <ArrowUpRight className="h-3.5 w-3.5 transition-transform duration-200 motion-safe:group-hover/cta:translate-x-[1px] motion-safe:group-hover/cta:-translate-y-[1px] motion-safe:group-focus-visible:translate-x-[1px] motion-safe:group-focus-visible:-translate-y-[1px]" />
                    </div>
                  </div>
                ) : null}
              </div>
            </>
          );

          if (href) {
            return (
              <Link
                key={`${rule.condition}-${rule.recommendation}`}
                href={href}
                className={cn(
                  cardClass,
                  "focus:outline-none focus-visible:ring-2 focus-visible:ring-[color:var(--color-brand-500)] focus-visible:ring-offset-2 focus-visible:ring-offset-white",
                )}
              >
                {content}
              </Link>
            );
          }

          return (
            <article key={`${rule.condition}-${rule.recommendation}`} className={cardClass}>
              {content}
            </article>
          );
        })}
      </div>
    </div>
  );
}
