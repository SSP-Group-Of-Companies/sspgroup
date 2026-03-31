import type { Metadata } from "next";
import { OurHistoryPage } from "./_components/OurHistoryPage";

export const metadata: Metadata = {
  title: "Our History | SSP Group",
  description:
    "From 2 trucks in 2015 to a national fleet — the story of SSP Group's growth across North America.",
  alternates: { canonical: "/company/our-history" },
  openGraph: {
    title: "Our History | SSP Group",
    description:
      "From 2 trucks to Top 100 Carrier in Canada — discover the milestones that shaped SSP Group.",
    type: "website",
    url: "/company/our-history",
  },
};

export default function Page() {
  return <OurHistoryPage />;
}
