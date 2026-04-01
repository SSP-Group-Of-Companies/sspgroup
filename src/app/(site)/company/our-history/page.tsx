import type { Metadata } from "next";
import { OurHistoryPage } from "./_components/OurHistoryPage";

export const metadata: Metadata = {
  title: "Our History | SSP Group",
  description:
    "A chronology of how SSP scaled from a small fleet into a multi-entity North American freight operation with disciplined execution standards.",
  alternates: { canonical: "/company/our-history" },
  openGraph: {
    title: "Our History | SSP Group",
    description:
      "Review the milestones that shaped SSP's operating model across Canada, the United States, and Mexico.",
    type: "website",
    url: "/company/our-history",
  },
};

export default function Page() {
  return <OurHistoryPage />;
}
