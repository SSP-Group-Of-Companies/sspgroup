import type { Metadata } from "next";
import { LeadershipPage } from "./_components/LeadershipPage";

export const metadata: Metadata = {
  title: "Leadership | SSP Group",
  description:
    "Meet SSP Group's leadership model for strategic direction, lane execution governance, and customer program accountability.",
  alternates: { canonical: "/company/leadership" },
  openGraph: {
    title: "Leadership | SSP Group",
    description:
      "How SSP leadership aligns strategy, operations, and cross-border program performance.",
    type: "website",
    url: "/company/leadership",
  },
  twitter: {
    card: "summary_large_image",
    title: "Leadership | SSP Group",
    description: "Operating leadership built around freight execution outcomes.",
  },
};

export default function Page() {
  return <LeadershipPage />;
}
