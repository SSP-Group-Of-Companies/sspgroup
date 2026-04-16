// src/lib/chatbot/widgets/PageSuggestionsWidget.tsx
"use client";

import type { PageSuggestionPayload, WidgetComponentProps } from "../chatbot.types";
import { LinkButton, ResponseButton } from "./_shared";

export default function PageSuggestionsWidget({
  actionProvider,
  payload,
  props,
}: WidgetComponentProps<PageSuggestionPayload>) {
  const widgetProps = payload ?? props;

  const title = widgetProps?.title || "Suggested pages";
  const suggestions = widgetProps?.suggestions ?? [];
  const secondaryLabel = widgetProps?.secondaryLabel || "Go back";
  const secondaryAction = widgetProps?.secondaryAction || "startOver";

  const onSecondary = () => {
    const fn = actionProvider[secondaryAction];
    if (typeof fn === "function") {
      fn();
    }
  };

  return (
    <div className="space-y-2">
      <div className="text-ssp-ink-800/40 text-[10px] font-medium tracking-wide uppercase">
        {title}
      </div>

      <div className="space-y-2">
        {suggestions.slice(0, 3).map((suggestion) => (
          <div
            key={`${suggestion.href}-${suggestion.label}`}
            className="border-ssp-ink-900/[0.07] rounded-lg border bg-white/60 p-2"
          >
            <div className="flex flex-wrap gap-1.5">
              <LinkButton onClick={() => actionProvider.goTo(suggestion.href)}>
                {suggestion.label}
              </LinkButton>
            </div>

            {suggestion.description ? (
              <div className="mt-2 text-xs text-[color:var(--color-muted-light)]">
                {suggestion.description}
              </div>
            ) : null}
          </div>
        ))}

        <ResponseButton onClick={onSecondary}>{secondaryLabel}</ResponseButton>
      </div>
    </div>
  );
}
