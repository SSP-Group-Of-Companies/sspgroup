// src/lib/chatbot/botConfig.tsx
"use client";

import React from "react";
import Image from "next/image";
import { createChatBotMessage } from "react-chatbot-kit";

import StartWidget from "./widgets/StartWidget";
import ContactWidget from "./widgets/ContactWidget";
import QuoteWidget from "./widgets/QuoteWidget";
import IndustriesWidget from "./widgets/IndustriesWidget";
import CareersWidget from "./widgets/CareersWidget";
import WhySspWidget from "./widgets/WhySspWidget";
import TrackingWidget from "./widgets/TrackingWidget";
import SolutionsWidget from "./widgets/SolutionsWidget";
import CompanyWidget from "./widgets/CompanyWidget";
import ResourcesWidget from "./widgets/ResourcesWidget";
import PageSuggestionsWidget from "./widgets/PageSuggestionsWidget";

import type { BaseWidgetProps, PageSuggestionPayload, WidgetComponentProps } from "./chatbot.types";

type IndustriesPayload = {
  viewAllHref?: string;
};

type BotWidget = {
  widgetName: string;
  widgetFunc: (props: BaseWidgetProps) => React.ReactNode;
  mapStateToProps?: string[];
  props?: Record<string, unknown>;
};

type BotConfig = {
  botName: string;
  initialMessages: unknown[];
  customStyles?: Record<string, unknown>;
  customComponents?: Record<string, unknown>;
  widgets: BotWidget[];
};

const botName = "SSP Assistant";

function BotLogoAvatar() {
  return (
    <span className="ssp-chatbot-logo-avatar" aria-hidden="true">
      <Image
        src="/_optimized/brand/SSPlogo.png"
        alt="SSP Group"
        fill
        sizes="34px"
        className="object-contain"
      />
    </span>
  );
}

export const botConfig: BotConfig = {
  botName,
  initialMessages: [
    createChatBotMessage(
      `Hi — I’m ${botName}. I can help you find SSP pages, answers from our FAQs, tracking, quotes, and support.`,
      {
        widget: "startWidget",
      },
    ),
  ],
  customStyles: {
    botMessageBox: { backgroundColor: "var(--color-ssp-ink-900)" },
    chatButton: { backgroundColor: "var(--color-ssp-ink-900)" },
  },
  customComponents: {
    botAvatar: () => <BotLogoAvatar />,
  },
  widgets: [
    { widgetName: "startWidget", widgetFunc: (props) => <StartWidget {...props} /> },
    { widgetName: "quoteWidget", widgetFunc: (props) => <QuoteWidget {...props} /> },
    { widgetName: "solutionsWidget", widgetFunc: (props) => <SolutionsWidget {...props} /> },
    { widgetName: "companyWidget", widgetFunc: (props) => <CompanyWidget {...props} /> },
    { widgetName: "resourcesWidget", widgetFunc: (props) => <ResourcesWidget {...props} /> },
    {
      widgetName: "pageSuggestionsWidget",
      widgetFunc: (props) => (
        <PageSuggestionsWidget {...(props as WidgetComponentProps<PageSuggestionPayload>)} />
      ),
    },
    { widgetName: "contactWidget", widgetFunc: (props) => <ContactWidget {...props} /> },
    {
      widgetName: "industriesWidget",
      widgetFunc: (props) => (
        <IndustriesWidget {...(props as WidgetComponentProps<IndustriesPayload>)} />
      ),
    },
    { widgetName: "careersWidget", widgetFunc: (props) => <CareersWidget {...props} /> },
    { widgetName: "whySspWidget", widgetFunc: (props) => <WhySspWidget {...props} /> },
    { widgetName: "trackingWidget", widgetFunc: (props) => <TrackingWidget {...props} /> },
  ],
};

export default botConfig;
