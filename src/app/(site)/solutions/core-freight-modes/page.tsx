import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { Container } from "@/app/(site)/components/layout/Container";
import { StandardFinalCta } from "@/app/(site)/components/cta/StandardFinalCta";
import { SectionSignalEyebrow } from "@/app/(site)/components/ui/SectionSignalEyebrow";
import { cn } from "@/lib/cn";
import { SITE_URL } from "@/lib/seo/site";

const PAGE_TITLE = "Core Freight Modes | SSP Group";
const PAGE_DESCRIPTION =
  "Explore SSP Group's core freight modes across truckload, LTL, dry van, flatbed, step deck, Conestoga, and heavy-haul execution.";
const PAGE_OG_IMAGE = "/_optimized/solution/truckload/truckload-Img.png";

const operatingPillars = [
  {
    title: "Mode-first qualification",
    body: "SSP starts with trailer fit, loading method, shipment size, protection requirements, and appointment structure before capacity is assigned.",
  },
  {
    title: "Equipment-fit routing",
    body: "Dry van, flatbed, step deck, Conestoga, heavy-haul, and LTL paths are selected against the actual freight profile rather than broad mode assumptions.",
  },
  {
    title: "Execution control",
    body: "The objective is a cleaner operating path from pickup through delivery, with the right equipment model established before the shipment is live.",
  },
] as const;

const childPaths = [
  {
    label: "Truckload",
    href: "/solutions/truckload",
    description: "Dedicated trailer capacity for full-load freight that needs direct execution control.",
  },
  {
    label: "Dry Van",
    href: "/solutions/dry-van",
    description: "Enclosed truckload for palletized, boxed, and floor-loaded freight that needs protection.",
  },
  {
    label: "Flatbed",
    href: "/solutions/flatbed",
    description: "Open-deck execution for freight that depends on loading access and securement control.",
  },
  {
    label: "Step Deck",
    href: "/solutions/step-deck",
    description: "Drop-deck capacity for taller cargo profiles that do not fit a standard flatbed path.",
  },
  {
    label: "Conestoga / Roll-Tite",
    href: "/solutions/conestoga-roll-tite",
    description: "Covered-deck flexibility when loading access matters but cargo exposure is not acceptable.",
  },
  {
    label: "RGN / Heavy Haul",
    href: "/solutions/rgn-heavy-haul",
    description: "Permit-aware movement for over-dimensional and over-weight freight requiring specialized planning.",
  },
  {
    label: "Less-Than-Truckload",
    href: "/solutions/ltl",
    description: "Shared-capacity execution for smaller shipments that do not require full-trailer allocation.",
  },
] as const;

export const metadata: Metadata = {
  title: { absolute: PAGE_TITLE },
  description: PAGE_DESCRIPTION,
  alternates: {
    canonical: "/solutions/core-freight-modes",
  },
  openGraph: {
    title: PAGE_TITLE,
    description: PAGE_DESCRIPTION,
    url: "/solutions/core-freight-modes",
    type: "website",
    images: [PAGE_OG_IMAGE],
  },
  twitter: {
    card: "summary_large_image",
    title: PAGE_TITLE,
    description: PAGE_DESCRIPTION,
    images: [PAGE_OG_IMAGE],
  },
};

export default function CoreFreightModesPage() {
  const serviceJsonLd = {
    "@context": "https://schema.org",
    "@type": "Service",
    name: PAGE_TITLE,
    provider: {
      "@type": "Organization",
      name: "SSP Group",
      url: SITE_URL,
    },
    serviceType: "Core Freight Modes",
    areaServed: ["Canada", "United States", "Mexico"],
    description: PAGE_DESCRIPTION,
    url: `${SITE_URL}/solutions/core-freight-modes`,
  };

  const breadcrumbJsonLd = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: "Home", item: `${SITE_URL}/` },
      { "@type": "ListItem", position: 2, name: "Solutions", item: `${SITE_URL}/solutions` },
      {
        "@type": "ListItem",
        position: 3,
        name: "Core Freight Modes",
        item: `${SITE_URL}/solutions/core-freight-modes`,
      },
    ],
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(serviceJsonLd) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbJsonLd) }}
      />

      <section className="relative overflow-hidden border-b border-white/6 bg-[linear-gradient(135deg,var(--color-company-hero-midnight-start),var(--color-company-ink)_58%,var(--color-company-hero-midnight-end))] py-20 sm:py-24 lg:py-24">
        <div className="pointer-events-none absolute inset-0" aria-hidden>
          <Image
            src="/_optimized/solution/truckload/truckload-Img.png"
            alt=""
            fill
            priority
            sizes="100vw"
            className="object-cover"
          />
          <div className="absolute inset-0 bg-[linear-gradient(100deg,rgba(7,24,38,0.86)_0%,rgba(11,62,94,0.66)_38%,rgba(13,79,120,0.28)_100%)]" />
          <div className="absolute inset-0 bg-[linear-gradient(180deg,rgba(7,17,26,0.28)_0%,rgba(7,17,26,0.58)_100%)]" />
        </div>

        <Container className="site-page-container relative">
          <div className="max-w-3xl">
            <SectionSignalEyebrow label="Core Freight Modes" light accentColor="#10a7d8" />
            <h1 className="mt-5 max-w-[14ch] text-4xl leading-[1.04] font-semibold tracking-tight text-white sm:text-5xl lg:text-[3.3rem]">
              Core freight execution starts with the right mode.
            </h1>
            <p className="mt-6 max-w-[64ch] text-[15px] leading-[1.88] text-white/78 sm:text-base">
              This family covers freight whose operating path is principally defined by trailer fit,
              shipment size, equipment requirements, and loading method. Start here when mode
              selection should lead the execution model before any specialized condition overrides it.
            </p>
            <div className="mt-9 flex flex-wrap gap-3">
              <Link
                href="/quote"
                className={cn(
                  "inline-flex h-12 items-center bg-[color:var(--color-brand-600)] px-6 text-sm font-semibold text-white hover:bg-[color:var(--color-brand-700)] focus:outline-none focus-visible:ring-2 focus-visible:ring-white/40 focus-visible:ring-offset-2 focus-visible:ring-offset-[color:var(--color-company-ink)]",
                  "site-cta-radius",
                )}
              >
                Request a Freight Quote
              </Link>
              <Link
                href="/solutions"
                className={cn(
                  "inline-flex h-12 items-center border border-white/20 px-6 text-sm font-semibold text-white/82 hover:border-white/36 hover:bg-white/10 hover:text-white focus:outline-none focus-visible:ring-2 focus-visible:ring-white/40 focus-visible:ring-offset-2 focus-visible:ring-offset-[color:var(--color-company-ink)]",
                  "site-cta-radius",
                )}
              >
                Back to Solutions
              </Link>
            </div>
          </div>
        </Container>
      </section>

      <section className="border-b border-[color:var(--color-border-light-soft)] bg-[linear-gradient(180deg,#f7fafc,#ffffff)] py-20 sm:py-20">
        <Container className="site-page-container">
          <div className="grid gap-8 lg:grid-cols-[minmax(0,0.95fr)_minmax(0,1.05fr)]">
            <div className="max-w-[34rem]">
              <SectionSignalEyebrow label="Operating Model" />
              <h2 className="mt-4 text-[1.95rem] leading-[1.08] font-semibold tracking-tight text-[color:var(--color-menu-title)] sm:text-[2.25rem]">
                Choose the mode that governs the move.
              </h2>
              <p className="mt-4 text-[15px] leading-[1.85] text-[color:var(--color-menu-muted)]">
                Core Freight Modes is the right starting point when the shipment can be qualified
                primarily through equipment, trailer environment, loading profile, and shipment size.
              </p>
            </div>
            <div className="grid gap-4">
              {operatingPillars.map((pillar, index) => (
                <article
                  key={pillar.title}
                  className="rounded-[24px] border border-[color:var(--color-menu-border)] bg-white px-5 py-5 shadow-[0_10px_24px_rgba(2,6,23,0.04)] sm:px-6"
                >
                  <span className="inline-flex rounded-full border border-[color:var(--color-menu-border)] bg-[color:var(--color-surface-1-light)] px-2.5 py-1 text-[10px] font-semibold tracking-[0.14em] text-[color:var(--color-menu-subtle)] uppercase">
                    {`0${index + 1}`}
                  </span>
                  <h3 className="mt-4 text-[1.08rem] leading-snug font-semibold text-[color:var(--color-menu-title)]">
                    {pillar.title}
                  </h3>
                  <p className="mt-3 text-sm leading-7 text-[color:var(--color-menu-muted)]">
                    {pillar.body}
                  </p>
                </article>
              ))}
            </div>
          </div>
        </Container>
      </section>

      <section className="border-b border-[color:var(--color-border-light-soft)] bg-white py-20 sm:py-20">
        <Container className="site-page-container">
          <div className="max-w-3xl">
            <SectionSignalEyebrow label="Explore Core Paths" />
            <h2 className="mt-4 text-[1.95rem] leading-[1.08] font-semibold tracking-tight text-[color:var(--color-menu-title)] sm:text-[2.25rem]">
              Move into the equipment path that fits the freight.
            </h2>
            <p className="mt-4 text-[15px] leading-[1.85] text-[color:var(--color-menu-muted)]">
              These pages take the next step down into the specific operating path, trailer
              environment, and freight profile that should define the shipment.
            </p>
          </div>

          <div className="mt-10 grid gap-4 md:grid-cols-2 xl:grid-cols-3">
            {childPaths.map((item) => (
              <article
                key={item.href}
                className="rounded-[24px] border border-[color:var(--color-menu-border)] bg-[linear-gradient(180deg,#ffffff,#f8fbfd)] px-5 py-6 shadow-[0_10px_22px_rgba(2,6,23,0.04)] sm:px-6"
              >
                <h3 className="text-[1.15rem] leading-snug font-semibold text-[color:var(--color-menu-title)]">
                  {item.label}
                </h3>
                <p className="mt-3 text-sm leading-7 text-[color:var(--color-menu-muted)]">
                  {item.description}
                </p>
                <Link
                  href={item.href}
                  className="mt-5 inline-flex items-center gap-2 text-sm font-semibold text-[color:var(--color-menu-accent)] hover:text-[color:var(--color-ssp-ink-800)] focus:outline-none focus-visible:ring-2 focus-visible:ring-[color:var(--color-menu-accent)] focus-visible:ring-offset-2 focus-visible:ring-offset-white"
                >
                  View path <span aria-hidden>{"->"}</span>
                </Link>
              </article>
            ))}
          </div>
        </Container>
      </section>

      <StandardFinalCta
        headingId="core-freight-modes-final-cta"
        trackingLocation="core_freight_modes_final_cta"
        variant="industry"
        accentColor="#10a7d8"
        trustSignalAccentColor="#10a7d8"
        data={{
          kicker: "Next Step",
          title: "Confirm the mode before the shipment is committed.",
          body: "Share the shipment profile, lane, and equipment requirement. SSP will align the load to the right core freight path before dispatch begins.",
          trustSignals: ["Truckload and LTL coverage", "Equipment-fit routing", "CA-US-MX execution"],
          proof: [
            { value: "Mode-led", label: "Operating model" },
            { value: "Equipment fit", label: "Qualification lens" },
            { value: "Asset-based", label: "Carrier model" },
          ],
          ctas: {
            primary: {
              label: "Request a Freight Quote",
              href: "/quote",
              ctaId: "core_freight_modes_final_quote",
            },
            secondary: {
              label: "Talk to SSP",
              href: "/contact",
              ctaId: "core_freight_modes_final_contact",
            },
          },
        }}
      />
    </>
  );
}
