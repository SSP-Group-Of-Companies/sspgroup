// src/lib/chatbot/widgets/CompanyWidget.tsx
"use client";

import { NAV } from "@/config/navigation";
import type { WidgetComponentProps } from "../chatbot.types";
import { LinkButton } from "./_shared";

export default function CompanyWidget({ actionProvider }: WidgetComponentProps) {
  return (
    <div className="flex flex-wrap gap-1.5">
      {NAV.company.links.map((link) => (
        <LinkButton
          key={link.href}
          onClick={() => actionProvider.goToFromNav(link.label, link.href)}
        >
          {link.label}
        </LinkButton>
      ))}

      <LinkButton onClick={() => actionProvider.goToFromNav("Insights", "/insights")}>
        Insights
      </LinkButton>

      <LinkButton onClick={() => actionProvider.goToFromNav("Contact", "/contact")}>
        Contact
      </LinkButton>
    </div>
  );
}
