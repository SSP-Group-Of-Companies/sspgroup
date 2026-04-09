import type { Metadata } from "next";
import { PremiumPageScaffold } from "@/app/(site)/components/layout/PremiumPageScaffold";
import { SolutionsOverview } from "@/app/(site)/components/home/SolutionsOverview";

export const metadata: Metadata = {
  title: "Solutions",
  description:
    "Explore SSP Group shipping solutions across truckload, specialized, cross-border, and value-added logistics programs.",
  alternates: {
    canonical: "/solutions",
  },
};

export default function SolutionsPage() {
  return (
    <>
      <PremiumPageScaffold
        eyebrow="Solutions"
        title="Freight execution built by mode, equipment, and operating reality."
        description="Explore SSP Group solutions across truckload, specialized, cross-border, and integrated logistics programs, with dedicated pages expanding mode by mode under the new `/solutions` system."
        primaryCta={{ label: "Request Quote", href: "/quote" }}
        secondaryCta={{ label: "View Industries", href: "/industries" }}
      />
      <SolutionsOverview />
    </>
  );
}

