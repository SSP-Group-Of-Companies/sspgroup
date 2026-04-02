import type { Metadata } from "next";
import { MediaPageV2 } from "./_components/MediaPageV2";
import { MEDIA_LIBRARY_VIDEOS } from "@/config/media";
import { SITE_URL } from "@/lib/seo/site";

const COMPANY_OG_IMAGE = "/_optimized/company/about-hero-ssp.webp";
const MEDIA_DESCRIPTION =
  "Evidence-led video highlights from SSP's operations, fleet, and cross-border execution model.";
const MEDIA_PAGE_TITLE = "Media Library | SSP Group";

export const metadata: Metadata = {
  title: "Media Library",
  description: MEDIA_DESCRIPTION,
  alternates: { canonical: "/company/media" },
  openGraph: {
    title: MEDIA_PAGE_TITLE,
    description: MEDIA_DESCRIPTION,
    type: "website",
    url: "/company/media",
    images: [COMPANY_OG_IMAGE],
  },
  twitter: {
    card: "summary_large_image",
    title: MEDIA_PAGE_TITLE,
    description: MEDIA_DESCRIPTION,
    images: [COMPANY_OG_IMAGE],
  },
};

export default function Page() {
  const videoObjects = MEDIA_LIBRARY_VIDEOS.map((video) => ({
    "@type": "VideoObject",
    "@id": `${SITE_URL}/company/media#${video.id}`,
    name: video.title,
    description: video.description,
    thumbnailUrl: `https://img.youtube.com/vi/${video.youtubeId}/hqdefault.jpg`,
    embedUrl: `https://www.youtube.com/embed/${video.youtubeId}`,
    contentUrl: `https://www.youtube.com/watch?v=${video.youtubeId}`,
    publisher: {
      "@type": "Organization",
      name: "SSP Group",
      url: SITE_URL,
    },
  }));

  const mediaJsonLd = [
    {
      "@context": "https://schema.org",
      "@type": "CollectionPage",
      "@id": `${SITE_URL}/company/media#collection`,
      name: "Media Library | SSP Group",
      description: MEDIA_DESCRIPTION,
      url: `${SITE_URL}/company/media`,
      hasPart: videoObjects.map((video) => ({ "@id": video["@id"] })),
      isPartOf: {
        "@type": "WebSite",
        "@id": `${SITE_URL}#website`,
      },
    },
    {
      "@context": "https://schema.org",
      "@type": "ItemList",
      name: "SSP Group media videos",
      itemListElement: videoObjects.map((video, index) => ({
        "@type": "ListItem",
        position: index + 1,
        item: { "@id": video["@id"] },
      })),
    },
    {
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
          name: "Media Library",
          item: `${SITE_URL}/company/media`,
        },
      ],
    },
    ...videoObjects.map((video) => ({ "@context": "https://schema.org", ...video })),
  ];

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(mediaJsonLd) }}
      />
      <MediaPageV2 />
    </>
  );
}
