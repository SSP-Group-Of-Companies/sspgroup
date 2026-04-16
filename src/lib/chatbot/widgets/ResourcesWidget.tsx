// src/lib/chatbot/widgets/ResourcesWidget.tsx
"use client";

import { FAQ_PAGE_ROUTES } from "@/config/faqs";
import type { WidgetComponentProps } from "../chatbot.types";
import { LinkButton, ResponseButton } from "./_shared";

export default function ResourcesWidget({ actionProvider }: WidgetComponentProps) {
  return (
    <div className="flex flex-wrap gap-2">
      <LinkButton onClick={() => actionProvider.goToFromNav("Insights", "/insights")}>
        Insights & articles
      </LinkButton>

      <LinkButton onClick={() => actionProvider.goToFromNav("FAQs", FAQ_PAGE_ROUTES.faqs)}>
        FAQs
      </LinkButton>

      <ResponseButton onClick={() => actionProvider.showCompany()}>Company info</ResponseButton>

      <ResponseButton onClick={() => actionProvider.showContact()}>Contact support</ResponseButton>
    </div>
  );
}
