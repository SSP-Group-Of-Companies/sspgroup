"use client";

import {
  ModeHero,
  ModeCardSection,
  ModeGlassSection,
  ModeStepsSection,
  ModeFaqSection,
  ModeCtaSection,
  type ModeCard as AirCard,
  type ModeStep as AirStep,
  type ModeFaqItem as AirFaqItem,
  type ModeCtaLink as CtaLink,
} from "../CrossBorderModeSections";

export type { AirCard, AirStep, AirFaqItem, CtaLink };

export function AirHero(props: {
  eyebrow: string;
  title: string;
  description: string;
  primaryCta: CtaLink;
  secondaryCta: CtaLink;
}) {
  return <ModeHero theme="air" {...props} />;
}

export function AirCardSection(props: {
  id?: string;
  eyebrow: string;
  title: string;
  description: string;
  cards: readonly AirCard[];
  layout?: "sidebar" | "centered";
  trackingLocation?: string;
}) {
  return <ModeCardSection theme="air" {...props} />;
}

export function AirGlassSection(props: {
  eyebrow: string;
  title: string;
  description: string;
  cards: readonly AirCard[];
}) {
  return <ModeGlassSection theme="air" {...props} />;
}

export function AirStepsSection(props: {
  eyebrow: string;
  title: string;
  description: string;
  steps: readonly AirStep[];
}) {
  return <ModeStepsSection theme="air" {...props} />;
}

export function AirFaqSection(props: {
  eyebrow: string;
  title: string;
  description: string;
  items: readonly AirFaqItem[];
}) {
  return <ModeFaqSection theme="air" {...props} />;
}

export function AirCtaSection(props: {
  eyebrow: string;
  title: string;
  description: string;
  pills: readonly string[];
  primaryCta: CtaLink;
  secondaryCta: CtaLink;
}) {
  return <ModeCtaSection theme="air" {...props} />;
}
