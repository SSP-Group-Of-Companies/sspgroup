// src/lib/utils/blog/metadata.ts
import type { Metadata } from "next";
import { SITE_DEFAULT_OG_IMAGE, SITE_NAME, toAbsoluteUrl } from "@/lib/seo/site";

export function sspPageTitle(pageTitle?: string | null) {
  const t = String(pageTitle ?? "").trim();
  return t || SITE_NAME;
}

function toBrandedTitle(title: string) {
  return title === SITE_NAME ? SITE_NAME : `${title} | SSP Group`;
}

export function sspPageMetadata(opts: {
  title?: string | null;
  description?: string | null;
  noIndex?: boolean;
  canonicalPath?: string;
  ogImage?: string | null;
  openGraphType?: "website" | "article";
  publishedTime?: string | null;
  modifiedTime?: string | null;
}): Metadata {
  const description = opts.description ? String(opts.description).trim() : undefined;
  const title = sspPageTitle(opts.title);
  const brandedTitle = toBrandedTitle(title);
  const image = opts.ogImage ? String(opts.ogImage) : SITE_DEFAULT_OG_IMAGE;
  const openGraphType = opts.openGraphType ?? "website";
  const publishedTime = opts.publishedTime ? String(opts.publishedTime) : undefined;
  const modifiedTime = opts.modifiedTime ? String(opts.modifiedTime) : undefined;

  return {
    title,
    ...(description ? { description } : {}),
    ...(opts.canonicalPath
      ? {
          alternates: { canonical: opts.canonicalPath },
          openGraph: {
            type: openGraphType,
            title: brandedTitle,
            description,
            url: toAbsoluteUrl(opts.canonicalPath),
            images: [image],
            siteName: SITE_NAME,
            ...(openGraphType === "article"
              ? {
                  publishedTime,
                  modifiedTime,
                }
              : {}),
          },
          twitter: {
            card: "summary_large_image",
            title: brandedTitle,
            description,
            images: [image],
          },
        }
      : {}),
    ...(opts.noIndex
      ? {
          robots: { index: false, follow: false },
        }
      : {}),
  };
}
