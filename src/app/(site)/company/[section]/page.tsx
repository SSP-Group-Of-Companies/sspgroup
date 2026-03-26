import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { PremiumPageScaffold } from "@/app/(site)/components/layout/PremiumPageScaffold";
import { Container } from "@/app/(site)/components/layout/Container";

const COMPANY_SECTIONS = {
  "about-ssp": {
    title: "About SSP",
    description: "An overview of SSP Group's operating standards, philosophy, and execution model.",
    legacyHref: "/about-us",
  },
  "our-history": {
    title: "Our History",
    description: "The growth timeline and operating milestones behind SSP Group.",
  },
  "mission-vision-values": {
    title: "Mission / Vision / Values",
    description: "The principles that define how SSP plans, executes, and improves.",
    legacyHref: "/about-us#mission-vision-principles",
  },
  "our-companies": {
    title: "Our Companies",
    description: "A group-level view of the companies and capabilities within SSP.",
  },
  "coverage-network": {
    title: "Coverage & Network",
    description: "North American coverage strategy and lane-level operating footprint.",
    legacyHref: "/about-us#locations-network",
  },
  "safety-compliance": {
    title: "Safety & Compliance",
    description: "How SSP enforces safety governance and compliance controls across operations.",
    legacyHref: "/about-us#safety-compliance",
  },
  "video-gallery": {
    title: "Video Gallery",
    description: "Company media, operating footage, and brand storytelling assets.",
  },
  faqs: {
    title: "FAQs",
    description: "Answers to common questions about operations, lanes, and shipping processes.",
    legacyHref: "/about-us/faqs",
  },
} as const;

type CompanySectionSlug = keyof typeof COMPANY_SECTIONS;

function getSection(slug: string) {
  return COMPANY_SECTIONS[slug as CompanySectionSlug];
}

export function generateStaticParams() {
  return Object.keys(COMPANY_SECTIONS).map((section) => ({ section }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ section: string }>;
}): Promise<Metadata> {
  const { section } = await params;
  const data = getSection(section);
  if (!data) return {};
  return {
    title: data.title,
    description: data.description,
    alternates: {
      canonical: `/company/${section}`,
    },
  };
}

export default async function CompanySectionPage({
  params,
}: {
  params: Promise<{ section: string }>;
}) {
  const { section } = await params;
  const data = getSection(section);
  if (!data) notFound();
  const legacyHref = "legacyHref" in data ? data.legacyHref : undefined;

  return (
    <>
      <PremiumPageScaffold
        eyebrow="Company"
        title={data.title}
        description={data.description}
        primaryCta={{ label: "Contact SSP", href: "/contact" }}
        secondaryCta={{ label: "Explore Company", href: "/company" }}
      />

      <section className="bg-[color:var(--color-surface-0)] pb-20">
        <Container className="site-page-container">
          <div className="mx-auto max-w-3xl rounded-2xl border border-white/12 bg-white/[0.03] px-6 py-6 text-center">
            <p className="text-sm leading-7 text-[color:var(--color-nav-muted)]">
              This section has been scaffolded in the new SSP information architecture and is ready for
              expanded editorial content.
            </p>
            {legacyHref ? (
              <div className="mt-4">
                <Link
                  href={legacyHref}
                  className="inline-flex items-center gap-2 text-sm font-semibold text-white hover:text-white/85"
                >
                  View current detailed content
                  <span aria-hidden>→</span>
                </Link>
              </div>
            ) : null}
          </div>
        </Container>
      </section>
    </>
  );
}

