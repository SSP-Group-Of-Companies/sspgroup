// src/lib/chatbot/widgets/WhySspWidget.tsx
"use client";

import { WHY_NPT_SECTION } from "@/config/whyNpt";
import type { BaseWidgetProps } from "../chatbot.types";
import { LinkButton } from "./_shared";

const WHY_SSP_HOME_ANCHOR = `/#${WHY_NPT_SECTION.id}`;

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
