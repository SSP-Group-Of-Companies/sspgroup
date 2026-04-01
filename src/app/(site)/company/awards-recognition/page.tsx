import type { Metadata } from "next";
import { AwardsRecognitionPage } from "./_components/AwardsRecognitionPage";

export const metadata: Metadata = {
  title: "Awards & Recognition | SSP Group",
  description:
    "Recognition milestones and external validation of SSP Group's freight execution standards across North America.",
  alternates: { canonical: "/company/awards-recognition" },
  openGraph: {
    title: "Awards & Recognition | SSP Group",
    description:
      "How execution discipline and service reliability have been recognized across the freight industry.",
    type: "website",
    url: "/company/awards-recognition",
  },
  twitter: {
    card: "summary_large_image",
    title: "Awards & Recognition | SSP Group",
    description: "Recognition anchored in measurable operating performance.",
  },
};

export default function Page() {
  return <AwardsRecognitionPage />;
}
