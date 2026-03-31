import type { Metadata } from "next";
import { MediaPage } from "./_components/MediaPage";

export const metadata: Metadata = {
  title: "Media | SSP Group",
  description: "Watch SSP Group in action — operations footage, specialized transport, and brand media from across North America.",
  alternates: { canonical: "/company/media" },
  openGraph: {
    title: "Media | SSP Group",
    description: "Operations footage, brand media, and video highlights from SSP Group.",
    type: "website",
    url: "/company/media",
  },
};

export default function Page() {
  return <MediaPage />;
}
