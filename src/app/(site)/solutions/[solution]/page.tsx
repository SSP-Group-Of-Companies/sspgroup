import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { PremiumPageScaffold } from "@/app/(site)/components/layout/PremiumPageScaffold";
import { Container } from "@/app/(site)/components/layout/Container";
import {
  buildSolutionPageMetadata,
  getSolutionPageBySlug,
  getSolutionPageSlugs,
} from "@/config/solutionPages";
import { SolutionPageTemplate } from "../_components/SolutionPageTemplate";
import { SolutionDetailPageTemplate } from "../_components/SolutionDetailPageTemplate";
import { SITE_URL } from "@/lib/seo/site";

const SOLUTION_PAGES = {
  truckload: {
    title: "Full Truckload",
    description: "High-control truckload execution across primary North American lanes.",
  },
  "dry-van": {
    title: "Dry Van",
    description: "Enclosed capacity for general freight with disciplined schedule execution.",
  },
  flatbed: {
    title: "Flatbed",
    description: "Open-deck shipping for industrial materials, equipment, and construction loads.",
  },
  "step-deck": {
    title: "Step Deck",
    description: "Drop-deck capability for tall or irregular freight profiles.",
  },
  "rgn-heavy-haul": {
    title: "RGN / Heavy Haul",
    description: "Permit-aware movement for oversize and heavy-haul projects.",
  },
  "conestoga-roll-tite": {
    title: "Conestoga / Roll-Tite",
    description: "Covered-deck flexibility with weather protection and rapid loading.",
  },
  ltl: {
    title: "Less-Than-Truckload",
    description: "Cost-efficient partial-load transportation with managed service visibility.",
  },
  expedited: {
    title: "Expedited",
    description: "Priority freight options for production-critical and time-sensitive moves.",
  },
  "specialized-vehicles": {
    title: "Specialized Vehicles Transport",
    description: "Specialized equipment programs matched to cargo dimensions and constraints.",
  },
  hazmat: {
    title: "Hazmat",
    description: "Regulatory-compliant hazardous materials transportation and control processes.",
  },
  "temperature-controlled": {
    title: "Temperature-Controlled",
    description: "Cold-chain freight managed with temperature integrity and documentation rigor.",
  },
  "warehousing-distribution": {
    title: "Warehousing & Distribution",
    description: "Storage, handling, and outbound distribution across regional networks.",
  },
  "managed-capacity": {
    title: "Managed Capacity",
    description: "Flexible capacity programs for demand volatility and lane continuity.",
  },
  "dedicated-contract": {
    title: "Dedicated / Contract",
    description: "Dedicated fleet and contract logistics support built around SLAs.",
  },
  "project-freight": {
    title: "Project Freight",
    description: "Project-based logistics with schedule governance and cross-functional planning.",
  },
} as const;

type SolutionSlug = keyof typeof SOLUTION_PAGES;

function getSolution(slug: string) {
  return SOLUTION_PAGES[slug as SolutionSlug];
}

export function generateStaticParams() {
  const fallbackSolutions = Object.keys(SOLUTION_PAGES);
  const solutionPages = getSolutionPageSlugs();
  return Array.from(new Set([...fallbackSolutions, ...solutionPages])).map((solution) => ({ solution }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ solution: string }>;
}): Promise<Metadata> {
  const { solution } = await params;
  const solutionPage = getSolutionPageBySlug(solution);
  if (solutionPage) {
    return buildSolutionPageMetadata(solutionPage);
  }
  const data = getSolution(solution);
  if (!data) notFound();

  return {
    title: data.title,
    description: data.description,
    alternates: {
      canonical: `/solutions/${solution}`,
    },
  };
}

export default async function SolutionDetailPage({
  params,
}: {
  params: Promise<{ solution: string }>;
}) {
  const { solution } = await params;
  const solutionPage = getSolutionPageBySlug(solution);
  if (solutionPage) {
    const breadcrumbJsonLd = {
      "@context": "https://schema.org",
      "@type": "BreadcrumbList",
      itemListElement: [
        { "@type": "ListItem", position: 1, name: "Home", item: `${SITE_URL}/` },
        { "@type": "ListItem", position: 2, name: "Solutions", item: `${SITE_URL}/solutions` },
        {
          "@type": "ListItem",
          position: 3,
          name: solutionPage.hero.eyebrow,
          item: `${SITE_URL}/solutions/${solutionPage.slug}`,
        },
      ],
    };

    const serviceJsonLd = {
      "@context": "https://schema.org",
      "@type": "Service",
      name: solutionPage.hero.eyebrow,
      provider: {
        "@type": "Organization",
        name: "SSP Group",
        url: SITE_URL,
      },
      areaServed: ["Canada", "United States", "Mexico"],
      description: solutionPage.meta.description,
      url: `${SITE_URL}/solutions/${solutionPage.slug}`,
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
        {solutionPage.pageType === "family" ? (
          <SolutionPageTemplate page={solutionPage} />
        ) : (
          <SolutionDetailPageTemplate page={solutionPage} />
        )}
      </>
    );
  }

  const data = getSolution(solution);
  if (!data) notFound();

  return (
    <>
      <PremiumPageScaffold
        eyebrow="Solutions"
        title={data.title}
        description={data.description}
        primaryCta={{ label: "Request Quote", href: "/quote" }}
        secondaryCta={{ label: "View All Solutions", href: "/solutions" }}
      />

      <section className="bg-[color:var(--color-surface-0)] pb-20">
        <Container className="site-page-container">
          <div className="mx-auto max-w-3xl rounded-2xl border border-white/12 bg-white/[0.03] px-6 py-6 text-center">
            <p className="text-sm leading-7 text-[color:var(--color-nav-muted)]">
              Detailed solution modules are being expanded for SSP Group. For immediate planning, our team
              can align this service to your freight profile, compliance requirements, and lane coverage.
            </p>
            <div className="mt-4">
              <Link
                href="/contact"
                className="inline-flex items-center gap-2 text-sm font-semibold text-white hover:text-white/85"
              >
                Speak with our team
                <span aria-hidden>→</span>
              </Link>
            </div>
          </div>
        </Container>
      </section>
    </>
  );
}

