import type { Metadata } from "next";
import { LOCATIONS_HUB_SEO } from "@/config/networkPages";
import { SEO_LOCATIONS } from "@/config/seoLocations";
import { SITE_NAME, toAbsoluteUrl } from "@/lib/seo/site";
import { LocationsIndexContent } from "./_components/LocationsIndexContent";

const HUB_OG_IMAGE = "/_optimized/company/about-hero-ssp.webp";

export const metadata: Metadata = {
  title: { absolute: LOCATIONS_HUB_SEO.title },
  description: LOCATIONS_HUB_SEO.description,
  alternates: { canonical: "/locations" },
  openGraph: {
    title: LOCATIONS_HUB_SEO.title,
    description: LOCATIONS_HUB_SEO.description,
    type: "website",
    url: toAbsoluteUrl("/locations"),
    siteName: SITE_NAME,
    images: [{ url: toAbsoluteUrl(HUB_OG_IMAGE) }],
  },
  twitter: {
    card: "summary_large_image",
    title: LOCATIONS_HUB_SEO.title,
    description: LOCATIONS_HUB_SEO.description,
    images: [HUB_OG_IMAGE],
  },
};

export default function Page() {
  const collectionJsonLd = {
    "@context": "https://schema.org",
    "@type": "CollectionPage",
    name: "Freight by location",
    description: LOCATIONS_HUB_SEO.description,
    url: toAbsoluteUrl("/locations"),
    isPartOf: { "@type": "WebSite", name: SITE_NAME, url: toAbsoluteUrl("/") },
    numberOfItems: SEO_LOCATIONS.length,
  };

  const webPageJsonLd = {
    "@context": "https://schema.org",
    "@type": "WebPage",
    name: LOCATIONS_HUB_SEO.title,
    description: LOCATIONS_HUB_SEO.description,
    url: toAbsoluteUrl("/locations"),
    isPartOf: { "@type": "WebSite", name: SITE_NAME, url: toAbsoluteUrl("/") },
  };

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(collectionJsonLd) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(webPageJsonLd) }} />
      <div className="bg-[color:var(--color-surface-0)]">
        <LocationsIndexContent locations={SEO_LOCATIONS} />
      </div>
    </>
  );
}
