import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { Container } from "@/app/(site)/components/layout/Container";
import { StandardFinalCta } from "@/app/(site)/components/cta/StandardFinalCta";
import { SectionSignalEyebrow } from "@/app/(site)/components/ui/SectionSignalEyebrow";
import { cn } from "@/lib/cn";
import { SITE_URL } from "@/lib/seo/site";

const PAGE_TITLE = "Managed Logistics | SSP Group";
const PAGE_DESCRIPTION =
  "Explore SSP Group's managed logistics family across managed capacity, dedicated programs, warehousing, distribution, and project freight execution.";
const PAGE_OG_IMAGE = "/_optimized/solution/managedCapacity/managedCapacityHero-Img.png";

const operatingPillars = [
  {
    title: "Program-level governance",
    body: "This family applies when recurring freight needs carrier discipline, warehouse coordination, KPI review, or embedded service ownership beyond individual shipments.",
  },
  {
    title: "Recurring execution design",
    body: "SSP aligns network requirements, service cadence, facility needs, and accountability structure before the operating rhythm is live.",
  },
  {
    title: "Continuous control",
    body: "The model is built for programs that need governance over time, not only shipment-by-shipment coverage.",
  },
] as const;

const childPaths = [
  {
    label: "Managed Capacity",
    href: "/solutions/managed-capacity",
    description: "Recurring freight governed through carrier strategy, routing discipline, and KPI-led review.",
  },
  {
    label: "Dedicated / Contract Logistics",
    href: "/solutions/dedicated-contract",
    description: "Committed-capacity programs structured around service continuity and SLA accountability.",
  },
  {
    label: "Warehousing & Distribution",
    href: "/solutions/warehousing-distribution",
    description: "Inventory, fulfillment, and outbound execution aligned inside one operating model.",
  },
  {
    label: "Project Freight",
    href: "/solutions/project-freight",
    description: "Program-managed freight for engineered, phased, and site-sensitive execution requirements.",
  },
] as const;

export const metadata: Metadata = {
  title: { absolute: PAGE_TITLE },
  description: PAGE_DESCRIPTION,
  alternates: {
    canonical: "/solutions/managed-logistics",
  },
  openGraph: {
    title: PAGE_TITLE,
    description: PAGE_DESCRIPTION,
    url: "/solutions/managed-logistics",
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

export default function ManagedLogisticsPage() {
  const serviceJsonLd = {
    "@context": "https://schema.org",
    "@type": "Service",
    name: PAGE_TITLE,
    provider: {
      "@type": "Organization",
      name: "SSP Group",
      url: SITE_URL,
    },
    serviceType: "Managed Logistics",
    areaServed: ["Canada", "United States", "Mexico"],
    description: PAGE_DESCRIPTION,
    url: `${SITE_URL}/solutions/managed-logistics`,
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
        name: "Managed Logistics",
        item: `${SITE_URL}/solutions/managed-logistics`,
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
            src="/_optimized/solution/managedCapacity/managedCapacityHero-Img.png"
            alt=""
            fill
            priority
            sizes="100vw"
            className="object-cover"
          />
          <div className="absolute inset-0 bg-[linear-gradient(108deg,rgba(8,16,16,0.9)_0%,rgba(10,30,30,0.78)_34%,rgba(15,118,110,0.26)_100%)]" />
          <div className="absolute inset-0 bg-[linear-gradient(180deg,rgba(7,17,26,0.26)_0%,rgba(7,17,26,0.56)_100%)]" />
        </div>

        <Container className="site-page-container relative">
          <div className="max-w-3xl">
            <SectionSignalEyebrow label="Managed Logistics" light accentColor="#0f766e" />
            <h1 className="mt-5 max-w-[14ch] text-4xl leading-[1.04] font-semibold tracking-tight text-white sm:text-5xl lg:text-[3.3rem]">
              Freight programs need governance when shipment coverage is not enough.
            </h1>
            <p className="mt-6 max-w-[64ch] text-[15px] leading-[1.88] text-white/78 sm:text-base">
              This family is built for recurring volume, warehouse-connected operations, and
              programmatic freight requirements that need more than one-off execution. Start here
              when the operating model has to govern the network over time.
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

      <section className="border-b border-[color:var(--color-border-light-soft)] bg-[linear-gradient(180deg,#f7fbfa,#ffffff)] py-20 sm:py-20">
        <Container className="site-page-container">
          <div className="grid gap-8 lg:grid-cols-[minmax(0,0.95fr)_minmax(0,1.05fr)]">
            <div className="max-w-[34rem]">
              <SectionSignalEyebrow label="Operating Model" />
              <h2 className="mt-4 text-[1.95rem] leading-[1.08] font-semibold tracking-tight text-[color:var(--color-menu-title)] sm:text-[2.25rem]">
                Start with the requirement for governance, not the next load.
              </h2>
              <p className="mt-4 text-[15px] leading-[1.85] text-[color:var(--color-menu-muted)]">
                Managed Logistics is the right starting point when recurring freight, facilities,
                service levels, or program controls need to stay aligned through an ongoing model.
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
            <SectionSignalEyebrow label="Explore Managed Paths" />
            <h2 className="mt-4 text-[1.95rem] leading-[1.08] font-semibold tracking-tight text-[color:var(--color-menu-title)] sm:text-[2.25rem]">
              Move into the program structure that fits the network.
            </h2>
            <p className="mt-4 text-[15px] leading-[1.85] text-[color:var(--color-menu-muted)]">
              These pages take the next step into the logistics model, facility structure, or
              recurring freight program that should lead the operation.
            </p>
          </div>

          <div className="mt-10 grid gap-4 md:grid-cols-2">
            {childPaths.map((item) => (
              <article
                key={item.href}
                className="rounded-[24px] border border-[color:var(--color-menu-border)] bg-[linear-gradient(180deg,#ffffff,#f9fbfb)] px-5 py-6 shadow-[0_10px_22px_rgba(2,6,23,0.04)] sm:px-6"
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
        headingId="managed-logistics-final-cta"
        trackingLocation="managed_logistics_final_cta"
        variant="industry"
        accentColor="#0f766e"
        trustSignalAccentColor="#0f766e"
        data={{
          kicker: "Next Step",
          title: "Define the program before execution drifts.",
          body: "Share the network scope, recurring freight profile, and service requirements. SSP will align the operation to the managed model that fits the cadence and accountability it needs.",
          trustSignals: ["Program-led execution", "Recurring freight governance", "Warehouse-connected capability"],
          proof: [
            { value: "Governed", label: "Operating model" },
            { value: "Recurring", label: "Program profile" },
            { value: "CA-US-MX", label: "Coverage" },
          ],
          ctas: {
            primary: {
              label: "Request a Freight Quote",
              href: "/quote",
              ctaId: "managed_logistics_final_quote",
            },
            secondary: {
              label: "Talk to SSP",
              href: "/contact",
              ctaId: "managed_logistics_final_contact",
            },
          },
        }}
      />
    </>
  );
}
