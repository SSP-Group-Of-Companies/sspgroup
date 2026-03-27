import type { Metadata } from "next";
import { IndustriesHub } from "./_components/IndustriesHub";

export const metadata: Metadata = {
  title: "Industries | SSP Group",
  description:
    "Industry-specific logistics programs purpose-built for automotive, manufacturing, retail, food & beverage, steel, construction, and chemical freight across North America.",
  alternates: {
    canonical: "/industries",
  },
};

export default function IndustriesHubPage() {
  return (
    <div className="bg-[color:var(--color-surface-0)]">
      <IndustriesHub />
    </div>
  );
}
