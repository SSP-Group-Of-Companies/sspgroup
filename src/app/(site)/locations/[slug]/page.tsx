import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { getSeoLocationBySlug, getSeoLocationSlugs } from "@/config/seoLocations";
import { SITE_NAME, toAbsoluteUrl } from "@/lib/seo/site";
import { LocationDetailContent } from "../_components/LocationDetailContent";

const DEFAULT_OG = "/_optimized/company/about-hero-ssp.webp";

type Params = { slug: string };

export function generateStaticParams() {
  return getSeoLocationSlugs().map((slug) => ({ slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Params | Promise<Params>;
}): Promise<Metadata> {
  const { slug } = await Promise.resolve(params);
  const location = getSeoLocationBySlug(slug);
  if (!location) return {};

  const canonicalPath = `/locations/${location.slug}`;
  const title = `${location.title} | ${SITE_NAME}`;
  return {
    title: { absolute: title },
    description: location.metaDescription,
    alternates: { canonical: canonicalPath },
    openGraph: {
      title,
      description: location.metaDescription,
      type: "website",
      url: toAbsoluteUrl(canonicalPath),
      siteName: SITE_NAME,
      images: [{ url: toAbsoluteUrl(DEFAULT_OG) }],
    },
    twitter: {
      card: "summary_large_image",
      title,
      description: location.metaDescription,
      images: [DEFAULT_OG],
    },
  };
}

function LocationJsonLd({
  slug,
  city,
  region,
  country,
  title,
  description,
}: {
  slug: string;
  city: string;
  region: string;
  country: string;
  title: string;
  description: string;
}) {
  const pageUrl = toAbsoluteUrl(`/locations/${slug}`);
  const jsonLd = [
    {
      "@context": "https://schema.org",
      "@type": "Service",
      name: title,
      areaServed: `${city}, ${region}, ${country}`,
      description,
      provider: {
        "@type": "Organization",
        name: SITE_NAME,
        url: toAbsoluteUrl("/"),
      },
      url: pageUrl,
    },
    {
      "@context": "https://schema.org",
      "@type": "BreadcrumbList",
      itemListElement: [
        { "@type": "ListItem", position: 1, name: "Home", item: toAbsoluteUrl("/") },
        { "@type": "ListItem", position: 2, name: "Locations", item: toAbsoluteUrl("/locations") },
        { "@type": "ListItem", position: 3, name: `${city}, ${region}`, item: pageUrl },
      ],
    },
  ];

  return (
    <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
  );
}

export default async function LocationPage({ params }: { params: Params | Promise<Params> }) {
  const { slug } = await Promise.resolve(params);
  const location = getSeoLocationBySlug(slug);
  if (!location) notFound();

  return (
    <div className="bg-[color:var(--color-surface-0)]">
      <LocationJsonLd
        slug={location.slug}
        city={location.city}
        region={location.region}
        country={location.country}
        title={location.title}
        description={location.metaDescription}
      />
      <LocationDetailContent location={location} />
    </div>
  );
}
