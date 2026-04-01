import type { Metadata } from "next";
import { SustainabilityPage } from "./_components/SustainabilityPage";

export const metadata: Metadata = {
  title: "Sustainability | SSP Group",
  description:
    "See how SSP Group integrates operational efficiency, equipment stewardship, and governance discipline into long-term sustainability outcomes.",
  alternates: { canonical: "/company/sustainability" },
  openGraph: {
    title: "Sustainability | SSP Group",
    description:
      "Operationally grounded sustainability priorities across SSP's North American freight network.",
    type: "website",
    url: "/company/sustainability",
  },
  twitter: {
    card: "summary_large_image",
    title: "Sustainability | SSP Group",
    description: "Efficiency, responsibility, and execution discipline in one operating model.",
  },
};

export default function Page() {
  return <SustainabilityPage />;
}
