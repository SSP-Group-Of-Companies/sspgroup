import type { Metadata } from "next";
import { LANES_HUB_SEO } from "@/config/networkPages";
import { SEO_LANES } from "@/config/seoLanes";
import { SITE_NAME, toAbsoluteUrl } from "@/lib/seo/site";
import { LanesIndexContent } from "./_components/LanesIndexContent";

const HUB_OG_IMAGE = "/_optimized/company/about-hero-ssp.webp";

export const metadata: Metadata = {
  title: { absolute: LANES_HUB_SEO.title },
  description: LANES_HUB_SEO.description,
  alternates: { canonical: "/lanes" },
  openGraph: {
    title: LANES_HUB_SEO.title,
    description: LANES_HUB_SEO.description,
    type: "website",
    url: toAbsoluteUrl("/lanes"),
    siteName: SITE_NAME,
    images: [{ url: toAbsoluteUrl(HUB_OG_IMAGE) }],
  },
  twitter: {
    card: "summary_large_image",
    title: LANES_HUB_SEO.title,
    description: LANES_HUB_SEO.description,
    images: [HUB_OG_IMAGE],
  },
};

export default function Page() {
  const collectionJsonLd = {
    "@context": "https://schema.org",
    "@type": "CollectionPage",
    name: "Freight lanes",
    description: LANES_HUB_SEO.description,
    url: toAbsoluteUrl("/lanes"),
    isPartOf: { "@type": "WebSite", name: SITE_NAME, url: toAbsoluteUrl("/") },
    numberOfItems: SEO_LANES.length,
  };

  const webPageJsonLd = {
    "@context": "https://schema.org",
    "@type": "WebPage",
    name: LANES_HUB_SEO.title,
    description: LANES_HUB_SEO.description,
    url: toAbsoluteUrl("/lanes"),
    isPartOf: { "@type": "WebSite", name: SITE_NAME, url: toAbsoluteUrl("/") },
  };

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(collectionJsonLd) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(webPageJsonLd) }} />
      <div className="bg-[color:var(--color-surface-0)]">
        <LanesIndexContent lanes={SEO_LANES} />
      </div>
    </>
  );
}
