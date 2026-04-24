// src/lib/chatbot/widgets/WhySspWidget.tsx
"use client";

import { HOME_WHY_SSP_SECTION_ID } from "@/config/homeSections";
import type { BaseWidgetProps } from "../chatbot.types";
import { LinkButton } from "./_shared";

const WHY_SSP_HOME_ANCHOR = `/#${HOME_WHY_SSP_SECTION_ID}`;

export default function WhySspWidget({ actionProvider }: BaseWidgetProps) {
  return (
    <div className="flex flex-wrap gap-1.5">
      <LinkButton onClick={() => actionProvider.goTo(WHY_SSP_HOME_ANCHOR)}>
        Why choose SSP
      </LinkButton>

      <LinkButton onClick={() => actionProvider.goTo("/quote")}>Request a quote</LinkButton>
    </div>
  );
}
