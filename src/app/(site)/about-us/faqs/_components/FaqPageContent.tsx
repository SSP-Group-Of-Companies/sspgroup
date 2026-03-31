"use client";

import { FaqHero } from "./FaqHero";
import { FaqMain } from "./FaqMain";
import { FaqSubnav } from "./FaqSubnav";

export function FaqPageContent() {
  return (
    <>
      <FaqHero />
      <FaqSubnav />
      <FaqMain />
    </>
  );
}
