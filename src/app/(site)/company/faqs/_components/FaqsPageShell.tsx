"use client";

import { useReducedMotion } from "framer-motion";
import { FaqHero } from "./FaqHero";
import { FaqContent } from "./FaqContent";
import { FaqInsightsCta } from "./FaqInsightsCta";
import { FaqFinalCta } from "./FaqFinalCta";

export function FaqsPageShell() {
  const reduceMotion = useReducedMotion() ?? false;

  return (
    <>
      <FaqHero reduceMotion={reduceMotion} />
      <FaqContent reduceMotion={reduceMotion} />
      <FaqInsightsCta reduceMotion={reduceMotion} />
      <FaqFinalCta />
    </>
  );
}
