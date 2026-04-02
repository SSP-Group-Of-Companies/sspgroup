import type { Metadata } from "next";
import { SafetyCompliancePage } from "./_components/SafetyCompliancePage";
import { SITE_URL } from "@/lib/seo/site";

const COMPANY_OG_IMAGE = "/_optimized/company/about-hero-ssp.webp";
const SAFETY_DESCRIPTION =
  "How SSP Group approaches safety, compliance, visibility, and cross-border freight control across regulated and specialized shipment environments.";
const SAFETY_PAGE_TITLE = "Safety & Compliance | SSP Group";

export const metadata: Metadata = {
  title: "Safety & Compliance",
  description: SAFETY_DESCRIPTION,
  alternates: { canonical: "/company/safety-compliance" },
  openGraph: {
    title: SAFETY_PAGE_TITLE,
    description: SAFETY_DESCRIPTION,
    type: "website",
    url: "/company/safety-compliance",
    images: [COMPANY_OG_IMAGE],
  },
  twitter: {
    card: "summary_large_image",
    title: SAFETY_PAGE_TITLE,
    description: SAFETY_DESCRIPTION,
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
        name: "Safety & Compliance",
        item: `${SITE_URL}/company/safety-compliance`,
      },
    ],
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbJsonLd) }}
      />
      <SafetyCompliancePage />
    </>
  );
}
