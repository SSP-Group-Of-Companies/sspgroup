import type { Metadata } from "next";
import { SolutionFamilyLandingPage } from "@/app/(site)/solutions/_components/SolutionFamilyLandingPage";
import { SPECIALIZED_CRITICAL_FREIGHT_FAMILY_PAGE } from "@/config/solutionFamilyPages";
import { SITE_URL } from "@/lib/seo/site";

const PAGE = SPECIALIZED_CRITICAL_FREIGHT_FAMILY_PAGE;

export const metadata: Metadata = {
  title: { absolute: PAGE.meta.title },
  description: PAGE.meta.description,
  alternates: {
    canonical: "/solutions/specialized-critical-freight",
  },
  openGraph: {
    title: PAGE.meta.title,
    description: PAGE.meta.description,
    url: "/solutions/specialized-critical-freight",
    type: "website",
    images: [PAGE.meta.ogImage],
  },
  twitter: {
    card: "summary_large_image",
    title: PAGE.meta.title,
    description: PAGE.meta.description,
    images: [PAGE.meta.ogImage],
  },
};

export default function SpecializedCriticalFreightPage() {
  const serviceJsonLd = {
    "@context": "https://schema.org",
    "@type": "Service",
    name: PAGE.meta.title,
    provider: {
      "@type": "Organization",
      name: "SSP Group",
      url: SITE_URL,
    },
    serviceType: "Specialized and Critical Freight",
    areaServed: ["Canada", "United States", "Mexico"],
    description: PAGE.meta.description,
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
      <SolutionFamilyLandingPage page={PAGE} />
    </>
  );
}
