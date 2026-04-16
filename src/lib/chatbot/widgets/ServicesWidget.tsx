// src/lib/chatbot/widgets/ServicesWidget.tsx
"use client";

import { NAV } from "@/config/navigation";
import type { WidgetComponentProps } from "../chatbot.types";
import { LinkButton, ResponseButton } from "./_shared";

/** Legacy widget; paths align with `navigation.ts`. */
export default function ServicesWidget({ actionProvider }: WidgetComponentProps) {
  return (
    <div className="flex flex-wrap gap-1.5">
      <ResponseButton onClick={() => actionProvider.startSolutions()}>
        Browse solutions
      </ResponseButton>

      <LinkButton onClick={() => actionProvider.goTo("/solutions/truckload")}>
        Truckload (FTL)
      </LinkButton>

      <LinkButton onClick={() => actionProvider.goTo("/solutions/ltl")}>LTL</LinkButton>

      <LinkButton onClick={() => actionProvider.goTo("/solutions/cross-border")}>
        Cross-border
      </LinkButton>

      <LinkButton onClick={() => actionProvider.goTo(NAV.solutions.intro.ctaHref)}>
        {NAV.solutions.intro.ctaLabel}
      </LinkButton>

      <ResponseButton onClick={() => actionProvider.startQuote()}>Start a quote</ResponseButton>
    </div>
  );
}
