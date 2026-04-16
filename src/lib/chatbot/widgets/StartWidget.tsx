// src/lib/chatbot/widgets/StartWidget.tsx
"use client";

import { FAQ_PAGE_ROUTES } from "@/config/faqs";
import { START_REPLIES } from "../knowledgeBase";
import type { BotIntentId, WidgetComponentProps } from "../chatbot.types";
import { LinkButton, PrimaryQuoteButton, ResponseButton } from "./_shared";

export default function StartWidget({ actionProvider }: WidgetComponentProps) {
  const onPick = (intent: BotIntentId) => {
    switch (intent) {
      case "GET_QUOTE":
        return actionProvider.startQuoteIntakeFlow();

      case "TRACKING":
        return actionProvider.startTracking();

      case "SOLUTIONS":
        return actionProvider.startSolutions();

      case "INDUSTRIES":
        return actionProvider.showIndustries();

      case "CAREERS":
        return actionProvider.showCareers();

      case "WHY_SSP":
        return actionProvider.showWhySsp();

      case "COMPANY":
        return actionProvider.showCompany();

      case "RESOURCES_GUIDES":
        return actionProvider.goToFromNav("Insights", "/insights");

      case "RESOURCES_FAQS":
        return actionProvider.goToFromNav("FAQs", FAQ_PAGE_ROUTES.faqs);

      case "HUMAN_CONTACT":
        return actionProvider.showContact();

      default:
        return actionProvider.startOver();
    }
  };

  const quoteReply = START_REPLIES.find((r) => r.intent === "GET_QUOTE");
  const otherReplies = START_REPLIES.filter((r) => r.intent !== "GET_QUOTE");

  return (
    <div className="flex flex-col gap-3">
      {quoteReply ? (
        <PrimaryQuoteButton onClick={() => onPick(quoteReply.intent)}>
          {quoteReply.label}
        </PrimaryQuoteButton>
      ) : null}

      <div className="flex flex-wrap gap-1.5">
        {otherReplies.map((reply) => {
          const isDirectLink =
            reply.intent === "TRACKING" ||
            reply.intent === "RESOURCES_FAQS" ||
            reply.intent === "RESOURCES_GUIDES";

          const Button = isDirectLink ? LinkButton : ResponseButton;

          return (
            <Button key={reply.intent} onClick={() => onPick(reply.intent)}>
              {reply.label}
            </Button>
          );
        })}
      </div>
    </div>
  );
}
