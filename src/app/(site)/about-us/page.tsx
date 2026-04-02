import type { Metadata } from "next";
import { companyAbout } from "@/config/company";
import { AboutPage } from "./_components/AboutPage";
import { AboutJsonLd } from "./_components/AboutJsonLd";

const ABOUT_PAGE_TITLE = "About SSP Group | Asset-Based Freight Execution Across North America";

export const metadata: Metadata = {
  title: { absolute: ABOUT_PAGE_TITLE },
  description:
    "SSP Group is an asset-based freight operator delivering disciplined transport and cross-border execution across Canada, the United States, and Mexico.",
  alternates: {
    canonical: "/about-us",
  },
  openGraph: {
    title: ABOUT_PAGE_TITLE,
    description:
      "Learn how SSP Group organizes capacity, compliance, and operating accountability across North American freight programs.",
    type: "website",
    url: "/about-us",
    images: ["/_optimized/company/about-hero-ssp.webp"],
  },
  twitter: {
    card: "summary_large_image",
    title: ABOUT_PAGE_TITLE,
    description:
      "Learn how SSP Group organizes capacity, compliance, and operating accountability across North American freight programs.",
    images: ["/_optimized/company/about-hero-ssp.webp"],
  },
};

export default function AboutUsPage() {
  return (
    <>
      <AboutJsonLd />
      <AboutPage data={companyAbout} />
    </>
  );
}
