import type { Metadata } from "next";

import { LegalPageShell } from "@/app/(site)/components/legal";
import { LEGAL_LAST_UPDATED_ISO, getLegalPage } from "@/config/legal";
import { SITE_DEFAULT_OG_IMAGE, SITE_NAME, toAbsoluteUrl } from "@/lib/seo/site";

import { CookiePreferencesPanel } from "./_components/CookiePreferencesPanel";

const PAGE = getLegalPage("cookie-preferences");

export const metadata: Metadata = {
  title: { absolute: PAGE.metadata.title },
  description: PAGE.metadata.description,
  alternates: { canonical: PAGE.route },
  openGraph: {
    title: PAGE.metadata.title,
    description: PAGE.metadata.description,
    type: "website",
    url: toAbsoluteUrl(PAGE.route),
    siteName: SITE_NAME,
    images: [{ url: toAbsoluteUrl(SITE_DEFAULT_OG_IMAGE) }],
  },
  twitter: {
    card: "summary_large_image",
    title: PAGE.metadata.title,
    description: PAGE.metadata.description,
    images: [SITE_DEFAULT_OG_IMAGE],
  },
  // Preferences page has no canonical SEO value beyond the /cookies policy.
  robots: { index: false, follow: true },
};

export default function Page() {
  const webPageJsonLd = {
    "@context": "https://schema.org",
    "@type": "WebPage",
    name: PAGE.metadata.title,
    description: PAGE.metadata.description,
    url: toAbsoluteUrl(PAGE.route),
    inLanguage: "en-CA",
    dateModified: LEGAL_LAST_UPDATED_ISO,
    isPartOf: { "@type": "WebSite", name: SITE_NAME, url: toAbsoluteUrl("/") },
    about: "Interactive cookie preferences for sspgroup.com.",
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(webPageJsonLd) }}
      />
      <LegalPageShell page={PAGE} preSections={<CookiePreferencesPanel />} />
    </>
  );
}
