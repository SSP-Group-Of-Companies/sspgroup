import type { Metadata } from "next";
import { SafetyCompliancePage } from "./_components/SafetyCompliancePage";

export const metadata: Metadata = {
  title: "Safety & Compliance | SSP Group",
  description:
    "How SSP Group approaches safety, compliance, visibility, and cross-border freight control across regulated and specialized shipment environments.",
  alternates: { canonical: "/company/safety-compliance" },
  openGraph: {
    title: "Safety & Compliance | SSP Group",
    description:
      "Operational discipline, shipment visibility, and cross-border control built into every SSP shipment.",
    type: "website",
    url: "/company/safety-compliance",
  },
  twitter: {
    card: "summary_large_image",
    title: "Safety & Compliance | SSP Group",
    description:
      "Safety, documentation rigor, and operational control across SSP freight execution.",
  },
};

export default function Page() {
  return <SafetyCompliancePage />;
}
