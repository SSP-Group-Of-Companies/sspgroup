import type { Metadata } from "next";
import { HomePageContent } from "@/app/(site)/home/HomePageContent";
import { SITE_URL, toAbsoluteUrl } from "@/lib/seo/site";

const PAGE_TITLE = "Freight Logistics Across North America | SSP Group";
const PAGE_DESCRIPTION =
  "Asset-based freight across Canada, the United States, and Mexico. We run truckload, LTL, specialized, and cross-border freight under direct operational ownership from dispatch through delivery.";
const PAGE_OG_IMAGE = "/_optimized/hero/hero-poster2.webp";

export const metadata: Metadata = {
  title: { absolute: PAGE_TITLE },
  description: PAGE_DESCRIPTION,
  alternates: {
    canonical: "/",
  },
  openGraph: {
    title: PAGE_TITLE,
    description: PAGE_DESCRIPTION,
    type: "website",
    url: "/",
    images: [PAGE_OG_IMAGE],
  },
  twitter: {
    card: "summary_large_image",
    title: PAGE_TITLE,
    description: PAGE_DESCRIPTION,
    images: [PAGE_OG_IMAGE],
  },
};

export default function HomePage() {
  // Root layout already emits WebSite + Organization nodes, so the homepage
  // contributes a WebPage node that references both via @id — keeping the
  // structured-data graph lean instead of re-declaring the Organization.
  const webPageJsonLd = {
    "@context": "https://schema.org",
    "@type": "WebPage",
    "@id": `${SITE_URL}/#webpage`,
    url: SITE_URL,
    name: PAGE_TITLE,
    description: PAGE_DESCRIPTION,
    inLanguage: "en",
    isPartOf: { "@id": `${SITE_URL}#website` },
    about: { "@id": `${SITE_URL}#organization` },
    primaryImageOfPage: {
      "@type": "ImageObject",
      url: toAbsoluteUrl(PAGE_OG_IMAGE),
    },
    publisher: { "@id": `${SITE_URL}#organization` },
    potentialAction: {
      "@type": "ViewAction",
      target: SITE_URL,
    },
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(webPageJsonLd) }}
      />
      <HomePageContent />
    </>
  );
}
