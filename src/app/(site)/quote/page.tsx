// src/app/quote/page.tsx
import type { Metadata } from "next";
import { SITE_DEFAULT_OG_IMAGE } from "@/lib/seo/site";

import QuoteClient from "./QuoteClient";

export const metadata: Metadata = {
  title: { absolute: "Request a Quote | SSP Group" },
  description:
    "Request a freight quote from SSP Group for truckload, LTL, cross-border, specialized, and warehousing programs.",
  alternates: {
    canonical: "/quote",
  },
  openGraph: {
    title: "Request a Quote | SSP Group",
    description:
      "Request a freight quote from SSP Group for truckload, LTL, cross-border, specialized, and warehousing programs.",
    type: "website",
    url: "/quote",
    images: [SITE_DEFAULT_OG_IMAGE],
  },
  twitter: {
    card: "summary_large_image",
    title: "Request a Quote | SSP Group",
    description:
      "Request a freight quote from SSP Group for truckload, LTL, cross-border, specialized, and warehousing programs.",
    images: [SITE_DEFAULT_OG_IMAGE],
  },
};

export default function QuotePage() {
  return <QuoteClient />;
}
