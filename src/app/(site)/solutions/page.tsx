import type { Metadata } from "next";
import { PremiumPageScaffold } from "@/app/(site)/components/layout/PremiumPageScaffold";

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
    <PremiumPageScaffold
      eyebrow="Solutions"
      title="Freight execution built by mode, not guesswork."
      description="SSP Group combines core freight modes, specialized execution, and value-added logistics into one operating system designed for reliability, compliance, and scalable growth."
      primaryCta={{ label: "Request Quote", href: "/quote" }}
      secondaryCta={{ label: "View Industries", href: "/industries" }}
    />
  );
}

