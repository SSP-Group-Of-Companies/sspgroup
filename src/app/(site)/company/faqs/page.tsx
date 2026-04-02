import type { Metadata } from "next";
import { FaqsPageShell } from "./_components/FaqsPageShell";
import { FAQ_CATEGORIES } from "@/config/faqs";
import { SITE_URL } from "@/lib/seo/site";

const COMPANY_OG_IMAGE = "/_optimized/company/about-hero-ssp.webp";
const FAQ_DESCRIPTION =
  "Operational answers on SSP Group service scope, cross-border execution, compliance controls, visibility, and commercial workflows.";
const FAQ_PAGE_TITLE = "FAQs | SSP Group";

export const metadata: Metadata = {
  title: { absolute: FAQ_PAGE_TITLE },
  description: FAQ_DESCRIPTION,
  alternates: { canonical: "/company/faqs" },
  openGraph: {
    title: FAQ_PAGE_TITLE,
    description: FAQ_DESCRIPTION,
    type: "website",
    url: "/company/faqs",
    images: [COMPANY_OG_IMAGE],
  },
  twitter: {
    card: "summary_large_image",
    title: FAQ_PAGE_TITLE,
    description: FAQ_DESCRIPTION,
    images: [COMPANY_OG_IMAGE],
  },
};

export default function Page() {
  const faqJsonLd = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: FAQ_CATEGORIES.flatMap((category) =>
      category.items.map((item) => ({
        "@type": "Question",
        name: item.question,
        acceptedAnswer: { "@type": "Answer", text: item.answer },
      })),
    ),
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
        name: "About Us",
        item: `${SITE_URL}/about-us`,
      },
      {
        "@type": "ListItem",
        position: 3,
        name: "FAQs",
        item: `${SITE_URL}/company/faqs`,
      },
    ],
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbJsonLd) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqJsonLd) }}
      />
      <FaqsPageShell />
    </>
  );
}
