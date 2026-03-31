// src/lib/chatbot/widgets/CompanyWidget.tsx
"use client";

import type { WidgetComponentProps } from "../chatbot.types";
import { LinkButton } from "./_shared";

export default function CompanyWidget({ actionProvider }: WidgetComponentProps) {
  return (
    <div className="flex flex-wrap gap-2">
      <LinkButton onClick={() => actionProvider.goToFromNav("About SSP Group", "/about-us")}>
        About SSP Group
      </LinkButton>

      <LinkButton
        onClick={() =>
          actionProvider.goToFromNav(
            "Coverage Network",
            "/about-us#coverage-network",
          )
        }
      >
        Coverage Network
      </LinkButton>

      <LinkButton onClick={() => actionProvider.goToFromNav("Blog / Insights", "/insights")}>
        Blog / Insights
      </LinkButton>

      <LinkButton onClick={() => actionProvider.goToFromNav("Contact", "/contact")}>
        Contact
      </LinkButton>
    </div>
  );
}
