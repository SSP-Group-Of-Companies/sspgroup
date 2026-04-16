// src/lib/chatbot/widgets/ContactWidget.tsx
"use client";

import { FAQ_PAGE_ROUTES } from "@/config/faqs";
import { CONTACT_INFO } from "../knowledgeBase";
import type { BaseWidgetProps } from "../chatbot.types";
import { LinkButton } from "./_shared";

export default function ContactWidget({ actionProvider }: BaseWidgetProps) {
  return (
    <div className="border-ssp-ink-900/[0.07] space-y-2 rounded-xl border bg-white/80 p-3 text-sm">
      <div className="text-ssp-ink-900/90 text-xs font-medium">Customer Support</div>
      <div className="text-xs text-[color:var(--color-muted-light)]">
        Email:{" "}
        <a
          className="text-ssp-ink-800/90 decoration-ssp-ink-900/15 hover:text-ssp-ink-900 font-medium underline underline-offset-2 transition-colors"
          href={`mailto:${CONTACT_INFO.email}`}
        >
          {CONTACT_INFO.email}
        </a>
      </div>
      <div className="text-xs text-[color:var(--color-muted-light)]">
        Phone:{" "}
        <a
          className="text-ssp-ink-800/90 decoration-ssp-ink-900/15 hover:text-ssp-ink-900 font-medium underline underline-offset-2 transition-colors"
          href={`tel:${CONTACT_INFO.phone}`}
        >
          {CONTACT_INFO.phone}
        </a>
      </div>
      <div className="flex flex-wrap gap-1.5 pt-0.5">
        <LinkButton onClick={() => actionProvider.goToFromNav("FAQs", FAQ_PAGE_ROUTES.faqs)}>
          FAQ page
        </LinkButton>
        <LinkButton onClick={() => actionProvider.goTo(FAQ_PAGE_ROUTES.contact)}>
          Contact form
        </LinkButton>
      </div>
    </div>
  );
}
