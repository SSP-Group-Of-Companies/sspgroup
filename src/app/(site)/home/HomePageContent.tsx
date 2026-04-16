import { CredibilityStrip } from "./_components/CredibilityStrip";
import { Hero } from "./_components/Hero";
import { TrustProofSection } from "@/app/(site)/components/home/TrustProofSection";
import { IndustriesCarouselSection } from "@/app/(site)/components/home/IndustriesCarouselSection";

export function HomePageContent() {
  return (
    <>
      <Hero />
      <CredibilityStrip />
      <IndustriesCarouselSection />
      <TrustProofSection />
    </>
  );
}
