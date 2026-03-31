import type { Metadata } from "next";
import { FaqsPage } from "./_components/FaqsPage";

export const metadata: Metadata = {
  title: "FAQs | SSP Group",
  description: "Answers to common questions about SSP Group's freight services, safety, tracking, operations, and billing.",
  alternates: { canonical: "/company/faqs" },
  openGraph: {
    title: "FAQs | SSP Group",
    description: "Find answers to common questions about SSP Group's freight services and operations.",
    type: "website",
    url: "/company/faqs",
  },
};

export default function Page() {
  return <FaqsPage />;
}
