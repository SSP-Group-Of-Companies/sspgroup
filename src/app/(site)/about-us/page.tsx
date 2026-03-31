import type { Metadata } from "next";
import { companyAbout } from "@/config/company";
import { AboutSspPage } from "@/app/(site)/company/about-ssp/_components/AboutSspPage";
import { AboutJsonLd } from "./_components/AboutJsonLd";

export const metadata: Metadata = {
  title: "About SSP Group | Asset-Based Logistics Across North America",
  description:
    "SSP Group of Companies is an asset-based logistics provider delivering disciplined freight execution across Canada, the U.S., and Mexico.",
  alternates: {
    canonical: "/about-us",
  },
  openGraph: {
    title: "About SSP Group",
    description:
      "Discover how SSP Group delivers disciplined freight execution across North America through compliance-first operations, accountable communication, and lane-level control.",
    type: "website",
    url: "/about-us",
    images: ["/_optimized/company/about-hero-ssp.webp"],
  },
  twitter: {
    card: "summary_large_image",
    title: "About SSP Group",
    description:
      "Discover how SSP Group delivers disciplined freight execution across North America through compliance-first operations, accountable communication, and lane-level control.",
    images: ["/_optimized/company/about-hero-ssp.webp"],
  },
};

export default function AboutUsPage() {
  return (
    <>
      <AboutJsonLd />
      <AboutSspPage data={companyAbout} />
    </>
  );
}
