"use client";

import type { companyAbout } from "@/config/company";
import { AboutSspHero } from "./AboutSspHero";
import { AboutSspWhoWeAre } from "./AboutSspWhoWeAre";
import { AboutSspHistorySnapshot } from "./AboutSspHistorySnapshot";
import { AboutSspMissionValuesSection } from "./AboutSspMissionValuesSection";
import { AboutSspCompanies } from "./AboutSspCompanies";
import { AboutSspOperatingModel } from "./AboutSspOperatingModel";
import { AboutSspCoverageSection } from "./AboutSspCoverageSection";
import { AboutSspFinalCta } from "./AboutSspFinalCta";

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
      <AboutSspCoverageSection data={data.locationsNetwork} />
      <AboutSspFinalCta data={data.finalCta} />
    </>
  );
}
