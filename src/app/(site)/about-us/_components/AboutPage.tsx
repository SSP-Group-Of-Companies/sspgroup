import type { companyAbout } from "@/config/company";
import { AboutSspHero } from "@/app/(site)/about-us/_components/AboutSspHero";
import { AboutSspWhoWeAre } from "@/app/(site)/about-us/_components/AboutSspWhoWeAre";
import { AboutSspHistorySnapshot } from "@/app/(site)/about-us/_components/AboutSspHistorySnapshot";
import { AboutSspMissionValuesSection } from "@/app/(site)/about-us/_components/AboutSspMissionValuesSection";
import { AboutSspCompanies } from "@/app/(site)/about-us/_components/AboutSspCompanies";
import { AboutSspOperatingModel } from "@/app/(site)/about-us/_components/AboutSspOperatingModel";
import { AboutSspSafetyComplianceTeaser } from "@/app/(site)/about-us/_components/AboutSspSafetyComplianceTeaser";
import { AboutSspLeadershipAccountability } from "@/app/(site)/about-us/_components/AboutSspLeadershipAccountability";
import { AboutSspLocationsNetwork } from "@/app/(site)/about-us/_components/AboutSspLocationsNetwork";
import { AboutSspMediaInsightsTeaser } from "@/app/(site)/about-us/_components/AboutSspMediaInsightsTeaser";
import { AboutSspFinalCta } from "@/app/(site)/about-us/_components/AboutSspFinalCta";

type CompanyData = typeof companyAbout;

export function AboutPage({ data }: { data: CompanyData }) {
  return (
    <>
      <AboutSspHero data={data.hero} />
      <AboutSspWhoWeAre data={data.whoWeAre} />
      <AboutSspOperatingModel data={data.operatingModel} />
      <AboutSspMissionValuesSection data={data.missionVision} />
      <AboutSspSafetyComplianceTeaser data={data.safetyComplianceTeaser} />
      <AboutSspLeadershipAccountability data={data.leadershipAccountability} />
      <AboutSspLocationsNetwork data={data.locationsNetwork} />
      <AboutSspCompanies data={data.ourCompanies} />
      <AboutSspHistorySnapshot />
      <AboutSspMediaInsightsTeaser data={data.mediaInsightsTeaser} />
      <AboutSspFinalCta data={data.finalCta} />
    </>
  );
}
