import { CredibilityStrip } from "./_components/CredibilityStrip";
import { Hero } from "./_components/Hero";
import { HomePostHeroBand } from "./_components/HomePostHeroBand";
import { RoutingIntentSection } from "./_components/RoutingIntentSection";
import { TrustProofSection } from "@/app/(site)/components/home/TrustProofSection";
import { IndustriesCarouselSection } from "@/app/(site)/components/home/IndustriesCarouselSection";

export function HomePageContent() {
  return (
    <>
      <Hero />
      <HomePostHeroBand>
        <CredibilityStrip />
        <RoutingIntentSection />
      </HomePostHeroBand>
      <IndustriesCarouselSection />
      <TrustProofSection />
    </>
  );
}
