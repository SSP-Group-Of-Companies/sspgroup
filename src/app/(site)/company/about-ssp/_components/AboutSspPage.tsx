import type { companyAbout } from "@/config/company";
import { AboutSspHero } from "./AboutSspHero";
import { AboutSspWhoWeAre } from "./AboutSspWhoWeAre";
import { AboutSspHistorySnapshot } from "./AboutSspHistorySnapshot";
import { AboutSspMissionValuesSection } from "./AboutSspMissionValuesSection";
import { AboutSspCompanies } from "./AboutSspCompanies";
import { AboutSspOperatingModel } from "./AboutSspOperatingModel";

type CompanyData = typeof companyAbout;

export function AboutSspPage({ data }: { data: CompanyData }) {
  return (
    <>
      <AboutSspHero data={data.hero} />
      <AboutSspWhoWeAre data={data.whoWeAre} />
      <AboutSspHistorySnapshot />
      <AboutSspMissionValuesSection data={data.missionVision} />
      <AboutSspCompanies data={data.ourCompanies} />
      <AboutSspOperatingModel data={data.operatingModel} />
    </>
  );
}
