import { CredibilityStrip } from "./_components/CredibilityStrip";
import { FlagshipSolutionsPreview } from "./_components/FlagshipSolutionsPreview";
import { Hero } from "./_components/Hero";
import { HomePostHeroBand } from "./_components/HomePostHeroBand";
import { IndustriesEditorialSection } from "./_components/IndustriesEditorialSection";
import { RoutingIntentSection } from "./_components/RoutingIntentSection";
import { WhySspSection } from "./_components/WhySspSection";
import { TrustProofSection } from "@/app/(site)/components/home/TrustProofSection";
import { CareerTeaserSection } from "./_components/CareerTeaserSection";
import { FinalCtaSection } from "@/app/(site)/components/home/FinalCtaSection";

export function HomePageContent() {
  return (
    <>
      <Hero />
      <HomePostHeroBand>
        <CredibilityStrip />
        <RoutingIntentSection />
      </HomePostHeroBand>
      <FlagshipSolutionsPreview />
      <IndustriesEditorialSection />
      <WhySspSection />
      <TrustProofSection />
      <CareerTeaserSection />
      <FinalCtaSection />
    </>
  );
}
