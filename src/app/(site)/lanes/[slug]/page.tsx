import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { getSeoLaneBySlug, getSeoLaneSlugs } from "@/config/seoLanes";
import { SITE_NAME, toAbsoluteUrl } from "@/lib/seo/site";
import { LaneDetailContent } from "../_components/LaneDetailContent";

const DEFAULT_OG = "/_optimized/company/about-hero-ssp.webp";

type Params = { slug: string };

export function generateStaticParams() {
  return getSeoLaneSlugs().map((slug) => ({ slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Params | Promise<Params>;
}): Promise<Metadata> {
  const { slug } = await Promise.resolve(params);
  const lane = getSeoLaneBySlug(slug);
  if (!lane) return {};

  const canonicalPath = `/lanes/${lane.slug}`;
  const title = `${lane.title} | ${SITE_NAME}`;
  return {
    title: { absolute: title },
    description: lane.metaDescription,
    alternates: { canonical: canonicalPath },
    openGraph: {
      title,
      description: lane.metaDescription,
      type: "website",
      url: toAbsoluteUrl(canonicalPath),
      siteName: SITE_NAME,
      images: [{ url: toAbsoluteUrl(DEFAULT_OG) }],
    },
    twitter: {
      card: "summary_large_image",
      title,
      description: lane.metaDescription,
      images: [DEFAULT_OG],
    },
  };
}

function LaneJsonLd({
  slug,
  title,
  description,
  originLabel,
  destinationLabel,
}: {
  slug: string;
  title: string;
  description: string;
  originLabel: string;
  destinationLabel: string;
}) {
  const pageUrl = toAbsoluteUrl(`/lanes/${slug}`);
  const jsonLd = [
    {
      "@context": "https://schema.org",
      "@type": "Service",
      name: title,
      description,
      provider: {
        "@type": "Organization",
        name: SITE_NAME,
        url: toAbsoluteUrl("/"),
      },
      areaServed: [originLabel, destinationLabel],
      url: pageUrl,
    },
    {
      "@context": "https://schema.org",
      "@type": "BreadcrumbList",
      itemListElement: [
        { "@type": "ListItem", position: 1, name: "Home", item: toAbsoluteUrl("/") },
        { "@type": "ListItem", position: 2, name: "Lanes", item: toAbsoluteUrl("/lanes") },
        { "@type": "ListItem", position: 3, name: title, item: pageUrl },
      ],
    },
  ];

  return (
    <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
  );
}

export default async function LanePage({ params }: { params: Params | Promise<Params> }) {
  const { slug } = await Promise.resolve(params);
  const lane = getSeoLaneBySlug(slug);
  if (!lane) notFound();

  return (
    <div className="bg-[color:var(--color-surface-0)]">
      <LaneJsonLd
        slug={lane.slug}
        title={lane.title}
        description={lane.metaDescription}
        originLabel={lane.originLabel}
        destinationLabel={lane.destinationLabel}
      />
      <LaneDetailContent lane={lane} />
    </div>
  );
}
