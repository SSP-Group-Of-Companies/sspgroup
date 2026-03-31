import type { Metadata } from "next";
import { FAQ_FINAL_CTA } from "@/config/faqs";
import { AboutFinalCta } from "../_components/AboutFinalCta";
import { FaqJsonLd } from "./_components/FaqJsonLd";
import { FaqPageContent } from "./_components/FaqPageContent";

export const metadata: Metadata = {
  title: "FAQs & Shipping Guides",
  description:
    "Find answers to common questions about our freight services, safety, tracking, and operations. Plus shipping guides for shippers and supply chain teams.",
  alternates: {
    canonical: "/about-us/faqs",
  },
  openGraph: {
    title: "FAQs & Shipping Guides | SSP Group",
    description:
      "Common questions about SSP Group services, compliance, and operations. Enterprise shipping guides and best practices.",
    type: "website",
    url: "/about-us/faqs",
    images: ["/_optimized/brand/SSPlogo.png"],
  },
  twitter: {
    card: "summary_large_image",
    title: "FAQs & Shipping Guides | SSP Group",
    description:
      "Common questions about SSP Group services, compliance, and operations. Enterprise shipping guides and best practices.",
    images: ["/_optimized/brand/SSPlogo.png"],
  },
};

export default function FaqsPage() {
  return (
    <>
      <FaqJsonLd />
      <FaqPageContent />
      <AboutFinalCta data={FAQ_FINAL_CTA} variant="faq" />
    </>
  );
}
