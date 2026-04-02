"use client";

import {
  ModeHero,
  ModeCardSection,
  ModeGlassSection,
  ModeStepsSection,
  ModeFaqSection,
  ModeCtaSection,
  type ModeCard as OceanCard,
  type ModeStep as OceanStep,
  type ModeFaqItem as OceanFaqItem,
  type ModeCtaLink as CtaLink,
} from "../CrossBorderModeSections";

export type { OceanCard, OceanStep, OceanFaqItem, CtaLink };

export function OceanHero(props: {
  eyebrow: string;
  title: string;
  description: string;
  primaryCta: CtaLink;
  secondaryCta: CtaLink;
}) {
  return <ModeHero theme="ocean" {...props} />;
}

export function OceanCardSection(props: {
  id?: string;
  eyebrow: string;
  title: string;
  description: string;
  cards: readonly OceanCard[];
  layout?: "sidebar" | "centered";
  trackingLocation?: string;
}) {
  return <ModeCardSection theme="ocean" {...props} />;
}

export function OceanGlassSection(props: {
  eyebrow: string;
  title: string;
  description: string;
  cards: readonly OceanCard[];
}) {
  return <ModeGlassSection theme="ocean" {...props} />;
}

export function OceanStepsSection(props: {
  eyebrow: string;
  title: string;
  description: string;
  steps: readonly OceanStep[];
}) {
  return <ModeStepsSection theme="ocean" {...props} />;
}

export function OceanFaqSection(props: {
  eyebrow: string;
  title: string;
  description: string;
  items: readonly OceanFaqItem[];
}) {
  return <ModeFaqSection theme="ocean" {...props} />;
}

export function OceanCtaSection(props: {
  eyebrow: string;
  title: string;
  description: string;
  pills: readonly string[];
  primaryCta: CtaLink;
  secondaryCta: CtaLink;
}) {
  return <ModeCtaSection theme="ocean" {...props} />;
}
