import type { Metadata } from "next";
import { SolutionsHubPage } from "./_components/SolutionsHubPage";
import { SOLUTIONS_HUB_PAGE } from "@/config/solutionsHub";
import { SITE_URL } from "@/lib/seo/site";

const PAGE_TITLE = "Freight Solutions | SSP Group";
const PAGE_DESCRIPTION =
  "Freight solutions across truckload, LTL, specialized, cross-border, and managed logistics in Canada, the United States, and Mexico.";
const PAGE_OG_IMAGE = "/_optimized/solution/crossBorder/cross-BorderHeroImg.png";

export const metadata: Metadata = {
  title: { absolute: PAGE_TITLE },
  description: PAGE_DESCRIPTION,
  alternates: {
    canonical: "/solutions",
  },
  openGraph: {
    title: PAGE_TITLE,
    description: PAGE_DESCRIPTION,
    url: "/solutions",
    type: "website",
    images: [PAGE_OG_IMAGE],
  },
  twitter: {
    card: "summary_large_image",
    title: PAGE_TITLE,
    description: PAGE_DESCRIPTION,
    images: [PAGE_OG_IMAGE],
  },
};

export default function SolutionsPage() {
  const collectionPageJsonLd = {
    "@context": "https://schema.org",
    "@type": "CollectionPage",
    name: PAGE_TITLE,
    description: PAGE_DESCRIPTION,
    url: `${SITE_URL}/solutions`,
    provider: {
      "@type": "Organization",
      name: "SSP Group",
      url: SITE_URL,
    },
    hasPart: SOLUTIONS_HUB_PAGE.families.map((family) => ({
      "@type": "WebPage",
      name: family.label,
      url: `${SITE_URL}${family.familyHref}`,
      description: family.description,
    })),
  };

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
        name: "Solutions",
        item: `${SITE_URL}/solutions`,
      },
    ],
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(collectionPageJsonLd) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbJsonLd) }}
      />
      <SolutionsHubPage />
    </>
  );
}

