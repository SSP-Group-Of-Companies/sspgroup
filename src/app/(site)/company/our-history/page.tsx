import type { Metadata } from "next";
import { OurHistoryPage } from "./_components/OurHistoryPage";
import { SITE_URL } from "@/lib/seo/site";

const COMPANY_OG_IMAGE = "/_optimized/company/about-hero-ssp.webp";
const HISTORY_DESCRIPTION =
  "Review the milestones that shaped SSP's operating model across Canada, the United States, and Mexico.";
const HISTORY_PAGE_TITLE = "Our History | SSP Group";

export const metadata: Metadata = {
  title: "Our History",
  description: HISTORY_DESCRIPTION,
  alternates: { canonical: "/company/our-history" },
  openGraph: {
    title: HISTORY_PAGE_TITLE,
    description: HISTORY_DESCRIPTION,
    type: "website",
    url: "/company/our-history",
    images: [COMPANY_OG_IMAGE],
  },
  twitter: {
    card: "summary_large_image",
    title: HISTORY_PAGE_TITLE,
    description: HISTORY_DESCRIPTION,
    images: [COMPANY_OG_IMAGE],
  },
};

export default function Page() {
  const breadcrumbJsonLd = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      {
        "@type": "ListItem",
        position: 1,
        name: "Home",
        item: `${SITE_URL}/`,
      },
      {
        "@type": "ListItem",
        position: 2,
        name: "About Us",
        item: `${SITE_URL}/about-us`,
      },
      {
        "@type": "ListItem",
        position: 3,
        name: "Our History",
        item: `${SITE_URL}/company/our-history`,
      },
    ],
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbJsonLd) }}
      />
      <OurHistoryPage />
    </>
  );
}
