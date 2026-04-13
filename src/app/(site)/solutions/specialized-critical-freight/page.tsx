import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { Container } from "@/app/(site)/components/layout/Container";
import { StandardFinalCta } from "@/app/(site)/components/cta/StandardFinalCta";
import { SectionSignalEyebrow } from "@/app/(site)/components/ui/SectionSignalEyebrow";
import { cn } from "@/lib/cn";
import { SITE_URL } from "@/lib/seo/site";

const PAGE_TITLE = "Specialized & Critical Freight | SSP Group";
const PAGE_DESCRIPTION =
  "Explore SSP Group's specialized and critical freight paths across expedited, temperature-controlled, hazmat, and specialized vehicle programs.";
const PAGE_OG_IMAGE = "/_optimized/solution/expedited/expedited-Img.png";

const operatingPillars = [
  {
    title: "Constraint-led planning",
    body: "These shipments are qualified first by urgency, cargo condition, compliance exposure, or handling sensitivity rather than by mode alone.",
  },
  {
    title: "Tighter intake discipline",
    body: "SSP aligns timing risk, product requirements, loading controls, and escalation expectations before the shipment moves.",
  },
  {
    title: "Higher consequence execution",
    body: "The operating model is built to protect the consequence that matters most, whether that is time, temperature integrity, regulatory control, or cargo handling.",
  },
] as const;

const childPaths = [
  {
    label: "Expedited",
    href: "/solutions/expedited",
    description: "Priority-led execution for shipments where timing carries direct business consequence.",
  },
  {
    label: "Temperature-Controlled",
    href: "/solutions/temperature-controlled",
    description: "Cold-chain and controlled-environment freight planned around product integrity.",
  },
  {
    label: "Hazmat",
    href: "/solutions/hazmat",
    description: "Regulated freight managed with documentation discipline and compliance-aware execution.",
  },
  {
    label: "Specialized Vehicle Programs",
    href: "/solutions/specialized-vehicles",
    description: "Specialized handling paths for sensitive vehicle and equipment movements.",
  },
] as const;

export const metadata: Metadata = {
  title: { absolute: PAGE_TITLE },
  description: PAGE_DESCRIPTION,
  alternates: {
    canonical: "/solutions/specialized-critical-freight",
  },
  openGraph: {
    title: PAGE_TITLE,
    description: PAGE_DESCRIPTION,
    url: "/solutions/specialized-critical-freight",
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

export default function SpecializedCriticalFreightPage() {
  const serviceJsonLd = {
    "@context": "https://schema.org",
    "@type": "Service",
    name: PAGE_TITLE,
    provider: {
      "@type": "Organization",
      name: "SSP Group",
      url: SITE_URL,
    },
    serviceType: "Specialized and Critical Freight",
    areaServed: ["Canada", "United States", "Mexico"],
    description: PAGE_DESCRIPTION,
    url: `${SITE_URL}/solutions/specialized-critical-freight`,
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
        name: "Specialized & Critical Freight",
        item: `${SITE_URL}/solutions/specialized-critical-freight`,
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
            src="/_optimized/solution/expedited/expedited-Img.png"
            alt=""
            fill
            priority
            sizes="100vw"
            className="object-cover"
          />
          <div className="absolute inset-0 bg-[linear-gradient(108deg,rgba(24,8,8,0.88)_0%,rgba(58,16,16,0.74)_34%,rgba(127,29,29,0.34)_100%)]" />
          <div className="absolute inset-0 bg-[linear-gradient(180deg,rgba(7,17,26,0.26)_0%,rgba(7,17,26,0.56)_100%)]" />
        </div>

        <Container className="site-page-container relative">
          <div className="max-w-3xl">
            <SectionSignalEyebrow label="Specialized & Critical Freight" light accentColor="#ef4444" />
            <h1 className="mt-5 max-w-[14ch] text-4xl leading-[1.04] font-semibold tracking-tight text-white sm:text-5xl lg:text-[3.3rem]">
              Execution changes when the freight carries higher consequence.
            </h1>
            <p className="mt-6 max-w-[64ch] text-[15px] leading-[1.88] text-white/78 sm:text-base">
              This family is built for freight where urgency, product sensitivity, regulatory
              exposure, or handling constraints materially change how the move has to be planned and
              controlled. Start here when the cargo condition should lead the operating model.
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

      <section className="border-b border-[color:var(--color-border-light-soft)] bg-[linear-gradient(180deg,#f8fafc,#ffffff)] py-20 sm:py-20">
        <Container className="site-page-container">
          <div className="grid gap-8 lg:grid-cols-[minmax(0,0.95fr)_minmax(0,1.05fr)]">
            <div className="max-w-[34rem]">
              <SectionSignalEyebrow label="Operating Model" />
              <h2 className="mt-4 text-[1.95rem] leading-[1.08] font-semibold tracking-tight text-[color:var(--color-menu-title)] sm:text-[2.25rem]">
                Lead with the condition that changes the shipment rules.
              </h2>
              <p className="mt-4 text-[15px] leading-[1.85] text-[color:var(--color-menu-muted)]">
                Specialized & Critical Freight is the right starting point when standard mode
                selection is no longer enough to protect the shipment outcome.
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
            <SectionSignalEyebrow label="Explore Specialized Paths" />
            <h2 className="mt-4 text-[1.95rem] leading-[1.08] font-semibold tracking-tight text-[color:var(--color-menu-title)] sm:text-[2.25rem]">
              Move into the operating path that protects the consequence.
            </h2>
            <p className="mt-4 text-[15px] leading-[1.85] text-[color:var(--color-menu-muted)]">
              Each page below focuses on the specific control model that should lead the move once
              time, temperature, compliance, or specialized handling becomes decisive.
            </p>
          </div>

          <div className="mt-10 grid gap-4 md:grid-cols-2">
            {childPaths.map((item) => (
              <article
                key={item.href}
                className="rounded-[24px] border border-[color:var(--color-menu-border)] bg-[linear-gradient(180deg,#ffffff,#fafafb)] px-5 py-6 shadow-[0_10px_22px_rgba(2,6,23,0.04)] sm:px-6"
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
        headingId="specialized-critical-final-cta"
        trackingLocation="specialized_critical_final_cta"
        variant="industry"
        accentColor="#ef4444"
        trustSignalAccentColor="#ef4444"
        data={{
          kicker: "Next Step",
          title: "Route the freight into the right control model early.",
          body: "Share the shipment constraints, lane, and consequence of failure. SSP will align the move to the specialized path that best protects timing, product integrity, and compliance control.",
          trustSignals: ["Urgency-led execution", "Regulated freight capability", "Cargo-sensitive planning"],
          proof: [
            { value: "Constraint-led", label: "Operating model" },
            { value: "Higher consequence", label: "Shipment profile" },
            { value: "CA-US-MX", label: "Coverage" },
          ],
          ctas: {
            primary: {
              label: "Request a Freight Quote",
              href: "/quote",
              ctaId: "specialized_critical_final_quote",
            },
            secondary: {
              label: "Talk to SSP",
              href: "/contact",
              ctaId: "specialized_critical_final_contact",
            },
          },
        }}
      />
    </>
  );
}
