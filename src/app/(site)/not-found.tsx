import Link from "next/link";
import type { Metadata } from "next";
import { ArrowRight } from "lucide-react";
import { Container } from "./components/layout/Container";
import { SectionSignalEyebrow } from "./components/ui/SectionSignalEyebrow";
import { cn } from "@/lib/cn";
import { SITE_NAME } from "@/lib/seo/site";

export const metadata: Metadata = {
  title: "Page not found",
  description: `The page you were looking for couldn't be found on ${SITE_NAME}. Explore our freight solutions, lanes, and locations instead.`,
  robots: { index: false, follow: true },
};

const FOCUS_RING =
  "focus:outline-none focus-visible:ring-2 focus-visible:ring-[color:var(--color-brand-600)] focus-visible:ring-offset-2";

const SUGGESTED_DESTINATIONS = [
  {
    href: "/solutions",
    label: "Freight solutions",
    description: "Truckload, LTL, specialized, and cross-border programs.",
  },
  {
    href: "/lanes",
    label: "Featured lanes",
    description: "Recurring cross-border and domestic routes SSP runs daily.",
  },
  {
    href: "/locations",
    label: "Service locations",
    description: "North American hubs we operate in and through.",
  },
  {
    href: "/industries",
    label: "Industries served",
    description: "Retail, manufacturing, automotive, food & beverage, and more.",
  },
  {
    href: "/insights",
    label: "Insights",
    description: "Operating standards, freight analysis, and company updates.",
  },
  {
    href: "/contact",
    label: "Talk to SSP",
    description: "Reach our logistics, dispatch, or customer service teams.",
  },
] as const;

export default function SiteNotFound() {
  return (
    <section
      aria-labelledby="not-found-heading"
      className="relative min-h-[70dvh] overflow-hidden bg-[color:var(--color-surface-0)] py-20 sm:py-28"
    >
      <Container className="site-page-container">
        <div className="flex flex-col items-start">
          <SectionSignalEyebrow label="404 — Page not found" />

          <h1
            id="not-found-heading"
            className="mt-5 max-w-3xl text-[2.1rem] leading-[1.08] font-semibold tracking-[-0.02em] text-[color:var(--color-text-strong)] sm:text-[2.6rem] sm:leading-[1.06] md:text-[3rem] md:leading-[1.05]"
          >
            We couldn&rsquo;t find that page.
          </h1>

          <p className="mt-5 max-w-[60ch] text-[15px] leading-[1.85] text-[color:var(--color-muted)] sm:text-base sm:leading-[1.9]">
            The link may have moved, expired, or never existed. These are the most common places our
            customers start — or you can head straight to a quote.
          </p>

          <div className="mt-8 flex flex-col gap-3 sm:flex-row sm:flex-wrap sm:items-center">
            <Link
              href="/quote"
              className={cn(
                "site-cta-radius inline-flex h-12 items-center justify-center px-7 text-sm font-semibold text-white",
                "transition-[transform,filter] duration-300 ease-[cubic-bezier(0.22,1,0.36,1)]",
                "motion-safe:hover:-translate-y-[1px] hover:brightness-[1.04]",
                FOCUS_RING,
              )}
              style={{ backgroundImage: "var(--gradient-home-hero-primary-cta)" }}
            >
              Request a Quote
            </Link>

            <Link
              href="/"
              className={cn(
                "site-cta-radius inline-flex h-12 items-center justify-center px-7 text-sm font-semibold",
                "border border-[color:var(--color-border)] text-[color:var(--color-text)]",
                "transition-colors duration-200 hover:border-[color:var(--color-brand-600)] hover:text-[color:var(--color-brand-600)]",
                FOCUS_RING,
              )}
            >
              Back to homepage
            </Link>
          </div>

          <ul className="mt-14 grid w-full grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-3">
            {SUGGESTED_DESTINATIONS.map((item) => (
              <li key={item.href}>
                <Link
                  href={item.href}
                  className={cn(
                    "group relative flex h-full flex-col rounded-[18px] border border-[color:var(--color-border)] bg-[color:var(--color-surface-1)] p-5 transition-colors",
                    "hover:border-[color:var(--color-brand-600)]",
                    FOCUS_RING,
                  )}
                >
                  <span className="inline-flex items-center gap-1.5 text-[15px] font-semibold text-[color:var(--color-text-strong)]">
                    {item.label}
                    <ArrowRight
                      className="h-4 w-4 text-[color:var(--color-brand-600)] transition-transform duration-200 group-hover:translate-x-0.5"
                      aria-hidden="true"
                    />
                  </span>
                  <span className="mt-1.5 text-[13px] leading-[1.7] text-[color:var(--color-muted)]">
                    {item.description}
                  </span>
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </Container>
    </section>
  );
}
