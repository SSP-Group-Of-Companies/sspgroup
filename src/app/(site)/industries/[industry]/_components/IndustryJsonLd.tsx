import type { IndustryPageModel } from "@/config/industryPages";
import { SITE_URL } from "@/lib/seo/site";

export function IndustryJsonLd({ model }: { model: IndustryPageModel }) {
  const breadcrumb = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: "Home", item: `${SITE_URL}/` },
      { "@type": "ListItem", position: 2, name: "Industries", item: `${SITE_URL}/industries` },
      { "@type": "ListItem", position: 3, name: model.hero.title, item: `${SITE_URL}/industries/${model.slug}` },
    ],
  };

  const service = {
    "@context": "https://schema.org",
    "@type": "Service",
    name: model.meta.title,
    serviceType: model.hero.kicker ?? model.hero.title,
    provider: {
      "@type": "Organization",
      name: "SSP Group",
      url: SITE_URL,
    },
    areaServed: ["Canada", "United States", "Mexico"],
    description: model.meta.description,
    url: `${SITE_URL}/industries/${model.slug}`,
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumb) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(service) }}
      />
    </>
  );
}
