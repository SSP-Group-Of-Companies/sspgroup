// src/lib/chatbot/widgets/SolutionsWidget.tsx
"use client";

import { NAV } from "@/config/navigation";
import type { WidgetComponentProps } from "../chatbot.types";
import { LinkButton } from "./_shared";

type SolutionLink = {
  label: string;
  href: string;
  description?: string;
};

export default function SolutionsWidget({ actionProvider }: WidgetComponentProps) {
  const categories = (
    NAV.solutions as unknown as {
      categories: Array<{ title: string; links: SolutionLink[] }>;
    }
  ).categories;

  const coreFreight = categories.find((c) => c.title === "Core Freight Modes") ?? categories[0];
  const topLinks = coreFreight?.links ?? [];

  return (
    <div className="space-y-2.5">
      <div className="flex flex-wrap gap-1.5">
        {topLinks.map((link) => (
          <LinkButton key={link.href} onClick={() => actionProvider.goTo(link.href)}>
            {link.label}
          </LinkButton>
        ))}

        <LinkButton onClick={() => actionProvider.goTo(NAV.solutions.intro.ctaHref)}>
          {NAV.solutions.intro.ctaLabel}
        </LinkButton>
      </div>
    </div>
  );
}
