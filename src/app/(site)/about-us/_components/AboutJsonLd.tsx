import { SITE_NAME, SITE_URL, toAbsoluteUrl } from "@/lib/seo/site";

const jsonLd = [
  {
    "@context": "https://schema.org",
    "@type": "AboutPage",
    name: "About SSP Group",
    url: toAbsoluteUrl("/about-us"),
    isPartOf: {
      "@type": "WebSite",
      "@id": `${SITE_URL}#website`,
      name: SITE_NAME,
      url: SITE_URL,
    },
    about: {
      "@type": "Organization",
      "@id": `${SITE_URL}#organization`,
    },
    description:
      "About SSP Group: operating standards, compliance, network coverage, and service philosophy.",
  },
  {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      {
        "@type": "ListItem",
        position: 1,
        name: "Home",
        item: toAbsoluteUrl("/"),
      },
      {
        "@type": "ListItem",
        position: 2,
        name: "About Us",
        item: toAbsoluteUrl("/about-us"),
      },
    ],
  },
];

export function AboutJsonLd() {
  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
    />
  );
}
