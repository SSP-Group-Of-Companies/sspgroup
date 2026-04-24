import type { Metadata } from "next";
import { SITE_URL } from "@/lib/seo/site";
import { IndustriesHub } from "./_components/IndustriesHub";

const PAGE_TITLE = "Industries We Serve";
const PAGE_DESCRIPTION =
  "Industry-specific logistics programs purpose-built for automotive, manufacturing, retail, food & beverage, steel, construction, and chemical freight across North America.";
const PAGE_OG_IMAGE = "/_optimized/industries/automotive-hero-premium.jpg";

export const metadata: Metadata = {
  title: PAGE_TITLE,
  description: PAGE_DESCRIPTION,
  alternates: {
    canonical: "/industries",
  },
  openGraph: {
    title: `${PAGE_TITLE} | SSP Group`,
    description: PAGE_DESCRIPTION,
    url: "/industries",
    type: "website",
    images: [PAGE_OG_IMAGE],
  },
  twitter: {
    card: "summary_large_image",
    title: `${PAGE_TITLE} | SSP Group`,
    description: PAGE_DESCRIPTION,
    images: [PAGE_OG_IMAGE],
  },
};

export default function IndustriesHubPage() {
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "CollectionPage",
    name: PAGE_TITLE,
    description: PAGE_DESCRIPTION,
    url: `${SITE_URL}/industries`,
    provider: {
      "@type": "Organization",
      name: "SSP Group",
      url: SITE_URL,
    },
  };

  return (
    <div className="bg-[color:var(--color-surface-0)]">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <IndustriesHub />
    </div>
  );
}
