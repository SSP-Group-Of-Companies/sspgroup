// src/lib/chatbot/widgets/ContactWidget.tsx
"use client";

import { FAQ_PAGE_ROUTES } from "@/config/faqs";
import { CONTACT_INFO } from "../knowledgeBase";
import type { BaseWidgetProps } from "../chatbot.types";
import { LinkButton } from "./_shared";

export default function ContactWidget({ actionProvider }: BaseWidgetProps) {
  return (
    <div className="border-ssp-ink-900/10 ring-ssp-cyan-500/10 space-y-2 rounded-xl border bg-white/95 p-3 text-sm shadow-sm ring-1">
      <div className="text-ssp-ink-900 font-semibold">Customer Support</div>
      <div className="text-[color:var(--color-muted-light)]">
        Email:{" "}
        <a
          className="text-ssp-cyan-600 decoration-ssp-cyan-500/35 hover:text-ssp-ink-800 font-semibold underline underline-offset-2 transition-colors"
          href={`mailto:${CONTACT_INFO.email}`}
        >
          {CONTACT_INFO.email}
        </a>
      </div>
      <div className="text-[color:var(--color-muted-light)]">
        Phone:{" "}
        <a
          className="text-ssp-cyan-600 decoration-ssp-cyan-500/35 hover:text-ssp-ink-800 font-semibold underline underline-offset-2 transition-colors"
          href={`tel:${CONTACT_INFO.phone}`}
        >
          {CONTACT_INFO.phone}
        </a>
      </div>
      <div className="flex flex-wrap gap-2 pt-1">
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
