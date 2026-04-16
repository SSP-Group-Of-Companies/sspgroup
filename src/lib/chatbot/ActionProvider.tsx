// src/lib/chatbot/ActionProvider.tsx
import type { MutableRefObject } from "react";
import { FAQ, COMPANY_FACTS, FAQ_HELP_FALLBACK } from "./knowledgeBase";
import { getSectionCtas, searchNavMatches, type NavMatch } from "./navIndex";
import type { ActionProviderShape, PageSuggestionPayload } from "./chatbot.types";
import {
  buildQuoteIntakePayload,
  createIdleQuoteState,
  QUOTE_INTAKE_STEPS,
  validateQuoteStep,
  type QuoteIntakeControllerState,
} from "./quoteIntakeFlow";

type ChatbotMessageFactory = (message: string, options?: Record<string, unknown>) => unknown;

type StateUpdater = (
  updater: (prev: { messages: unknown[] }) => { messages: unknown[] } & Record<string, unknown>,
) => void;

type PageActions = {
  goTo: (href: string) => void;
  scrollTo: (anchorId: string) => void;
};

type QuoteIntakeDeps = {
  quoteStateRef: MutableRefObject<QuoteIntakeControllerState>;
  onQuoteModeChange: (active: boolean) => void;
  /** Remounts chat with quote-only transcript (first question at top). */
  onEnterQuoteIntakeMode: () => void;
};

const LOW_SIGNAL_TOKENS = new Set([
  "a",
  "an",
  "the",
  "and",
  "or",
  "to",
  "for",
  "of",
  "in",
  "on",
  "at",
  "by",
  "with",
  "from",
  "into",
  "through",
  "about",
  "how",
  "what",
  "when",
  "where",
  "why",
  "can",
  "do",
  "does",
  "did",
  "is",
  "are",
  "was",
  "were",
  "be",
  "we",
  "you",
  "your",
  "our",
  "i",
  "me",
  "my",
  "it",
  "this",
  "that",
  "these",
  "those",
  "handle",
  "handling",
  "work",
  "working",
  "help",
  "support",
]);

function normText(s: string) {
  return (s || "")
    .toLowerCase()
    .replace(/&/g, " and ")
    .replace(/[^\w\s]/g, " ")
    .replace(/\s+/g, " ")
    .trim();
}

function tokensOf(s: string) {
  return normText(s).split(" ").filter(Boolean);
}

function strongTokensOf(s: string) {
  return tokensOf(s).filter((token) => {
    if (LOW_SIGNAL_TOKENS.has(token)) return false;
    if (token.length <= 2 && token !== "3pl") return false;
    return true;
  });
}

function overlapCount(a: readonly string[], b: readonly string[]) {
  const bSet = new Set(b);
  let count = 0;

  for (const token of a) {
    if (bSet.has(token)) count += 1;
  }

  return count;
}

export function makeActionProvider(pageActions?: PageActions, quoteIntakeDeps?: QuoteIntakeDeps) {
  return class ActionProvider implements ActionProviderShape {
    private createChatBotMessage: ChatbotMessageFactory;
    private setState: StateUpdater;

    constructor(createChatBotMessage: ChatbotMessageFactory, setStateFunc: StateUpdater) {
      this.createChatBotMessage = createChatBotMessage;
      this.setState = setStateFunc;
    }

    private get quoteRef() {
      return quoteIntakeDeps?.quoteStateRef;
    }

    isQuoteIntakeActive = () => {
      return this.quoteRef?.current.active === true;
    };

    startQuoteIntakeFlow = () => {
      quoteIntakeDeps?.onEnterQuoteIntakeMode();
    };

    handleQuoteIntakeUserMessage = (message: string) => {
      void this.processQuoteIntakeTurn(message);
    };

    private async processQuoteIntakeTurn(message: string) {
      const ref = this.quoteRef;
      if (!ref?.current.active) return;

      const flow = QUOTE_INTAKE_STEPS;
      const idx = ref.current.stepIndex;
      if (idx >= flow.length) return;

      const step = flow[idx];
      const validation = validateQuoteStep(step.key, message);
      if (!validation.ok) {
        this.sendText(validation.message);
        return;
      }

      ref.current.answers[step.key] = message.trim();
      ref.current.stepIndex = idx + 1;

      if (ref.current.stepIndex < flow.length) {
        this.sendText(flow[ref.current.stepIndex].prompt);
        return;
      }

      const payload = buildQuoteIntakePayload(ref.current.answers);
      if (!payload) {
        this.sendText(
          "Something went wrong saving your answers. Please tap refresh and try again.",
        );
        ref.current = createIdleQuoteState();
        quoteIntakeDeps?.onQuoteModeChange(false);
        return;
      }

      try {
        const res = await fetch("/api/v1/chatbot/quote-intake", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ ...payload, source: "chatbot" }),
        });
        const json = (await res.json().catch(() => null)) as { success?: boolean } | null;

        if (res.ok && json?.success !== false) {
          this.sendText(
            "Thank you — we've received your details. Our freight team will review your request carefully and get back to you as soon as possible. We appreciate you reaching out to SSP Group.",
          );
        } else {
          this.sendText(
            "We couldn't send that just now. You can try again in a moment, or use our full quote form for more detail.",
          );
          this.sendWidget(`Open the full quote form when you're ready.`, "quoteWidget");
        }
      } catch {
        this.sendText("We couldn't send that just now. Please try again shortly.");
        this.sendWidget(`You can also use our full quote form.`, "quoteWidget");
      } finally {
        ref.current = createIdleQuoteState();
        quoteIntakeDeps?.onQuoteModeChange(false);
      }
    }

    private addMessage = (msg: unknown) => {
      this.setState((prev) => ({
        ...prev,
        messages: [...prev.messages, msg],
      }));
    };

    private sendText(message: string) {
      this.addMessage(this.createChatBotMessage(message));
    }

    private sendWidget<TPayload extends object>(
      message: string,
      widget: string,
      payload?: TPayload,
    ) {
      this.addMessage(
        this.createChatBotMessage(message, {
          widget,
          payload,
        }),
      );
    }

    goTo = (href: string) => {
      if (pageActions?.goTo) {
        pageActions.goTo(href);
        return;
      }

      if (typeof window !== "undefined") {
        window.location.href = href;
      }
    };

    goToFromNav = (labelHint: string, fallbackHref: string) => {
      const top = searchNavMatches(labelHint, 1)[0];
      this.goTo(top?.href ?? fallbackHref);
    };

    private formatMatchLabel(match: NavMatch) {
      return `${match.label} (${match.sectionLabel})`;
    }

    suggestNavOptions = (userText: string, opts?: { limit?: number }) => {
      const limit = opts?.limit ?? 3;
      const matches = searchNavMatches(userText, limit);
      const top = matches[0];

      if (!top || top.score < 7) return false;

      const second = matches[1];
      const veryConfident = !second || top.score - second.score >= 8;
      const somewhatConfident = !!second && top.score - second.score >= 4;

      const payload: PageSuggestionPayload = veryConfident
        ? {
            title: "Suggested page",
            suggestions: [
              {
                label: this.formatMatchLabel(top),
                href: top.href,
                description: top.description,
              },
            ],
            secondaryLabel: "Show other options",
            secondaryAction: "startSolutions",
          }
        : {
            title: "Possible matches",
            suggestions: matches.map((m) => ({
              label: this.formatMatchLabel(m),
              href: m.href,
              description: m.description,
            })),
            secondaryLabel: somewhatConfident ? "Not these" : "Contact support",
            secondaryAction: somewhatConfident ? "startOver" : "showContact",
          };

      this.sendWidget(
        veryConfident ? `I found a likely page for that.` : `I found a few pages that might help.`,
        "pageSuggestionsWidget",
        payload,
      );

      return true;
    };

    suggestNavPage = (labelHint: string, fallbackHref: string, description?: string) => {
      this.sendWidget(`This page looks like the best fit:`, "pageSuggestionsWidget", {
        title: "Open page",
        suggestions: [
          {
            label: labelHint,
            href: fallbackHref,
            description,
          },
        ],
        secondaryLabel: "Show more options",
        secondaryAction: "startSolutions",
      } satisfies PageSuggestionPayload);
    };

    startOver = () => {
      this.sendWidget(
        `How can I help today? You can choose an option below or type your question.`,
        "startWidget",
      );
    };

    startQuote = () => {
      this.startQuoteIntakeFlow();
    };

    startTracking = () => {
      this.sendWidget(
        `You can open tracking and enter your shipment or reference number.`,
        "trackingWidget",
      );
    };

    startSolutions = () => {
      this.sendWidget(`Here are the main solution pages you can explore:`, "solutionsWidget");
    };

    showCompany = () => {
      this.sendWidget(`Here are a few company pages you might find useful:`, "companyWidget");
    };

    showResources = () => {
      this.sendWidget(`Here are some helpful resources:`, "resourcesWidget");
    };

    showContact = () => {
      this.sendWidget(`You can reach customer support here:`, "contactWidget");
    };

    showIndustries = () => {
      const { industries } = getSectionCtas();
      this.sendWidget(`You can browse the industries we support here:`, "industriesWidget", {
        viewAllHref: industries,
      });
    };

    showCareers = () => {
      const { careers } = getSectionCtas();
      this.sendWidget(`Looking for careers or driver opportunities?`, "careersWidget", {
        careersHref: careers,
      });
    };

    showWhySsp = () => {
      this.sendWidget(
        `SSP Group has moved ${COMPANY_FACTS.loadsMoved} loads with ${COMPANY_FACTS.onTime} on-time performance across North America.`,
        "whySspWidget",
      );
    };

    tryAnswerFaq = (query: string) => {
      const qN = normText(query);
      if (!qN) return false;

      const exact = FAQ.find((f) => normText(f.question) === qN);
      if (exact) {
        this.sendText(exact.answer);
        return true;
      }

      const qStrongTokens = strongTokensOf(qN);
      if (qStrongTokens.length === 0) return false;

      const ranked = FAQ.map((faq) => {
        const faqQuestion = normText(faq.question);
        const faqAnswer = normText(faq.answer);
        const faqStrongTokens = strongTokensOf(faqQuestion);
        const faqAnswerStrong = strongTokensOf(faqAnswer);
        const categoryStrong = strongTokensOf(normText(faq.categoryLabel));
        const categoryIdTokens = strongTokensOf(faq.categoryId.replace(/-/g, " "));
        const faqTags = faq.tags.map((tag) => normText(tag)).filter(Boolean);

        let score = 0;

        if (faqQuestion.includes(qN)) score += 20;
        if (qN.includes(faqQuestion)) score += 16;
        if (faqAnswer.includes(qN) && qN.length >= 12) score += 22;

        const strongOverlap = overlapCount(qStrongTokens, faqStrongTokens);
        score += strongOverlap * 10;

        const tagOverlap = overlapCount(qStrongTokens, faqTags);
        score += tagOverlap * 14;

        const answerOverlap = overlapCount(qStrongTokens, faqAnswerStrong);
        score += answerOverlap * 7;

        const categoryOverlap = overlapCount(qStrongTokens, categoryStrong);
        score += categoryOverlap * 9;

        const categoryIdOverlap = overlapCount(qStrongTokens, categoryIdTokens);
        score += categoryIdOverlap * 6;

        for (const token of qStrongTokens) {
          if (faqQuestion === token) score += 20;
          if (faqStrongTokens.includes(token)) score += 6;
          if (faqTags.includes(token)) score += 8;
          if (faqAnswerStrong.includes(token)) score += 5;
        }

        const overlapRatio = qStrongTokens.length > 0 ? strongOverlap / qStrongTokens.length : 0;

        if (overlapRatio >= 0.75) score += 12;
        else if (overlapRatio >= 0.5) score += 6;

        if (
          strongOverlap === 0 &&
          tagOverlap === 0 &&
          answerOverlap === 0 &&
          categoryOverlap === 0
        ) {
          score -= 20;
        }
        if (strongOverlap === 1 && qStrongTokens.length >= 2) score -= 8;

        return { faq, score };
      })
        .filter((entry) => entry.score > 0)
        .sort((a, b) => b.score - a.score);

      const best = ranked[0];
      const second = ranked[1];

      if (!best) return false;

      const confidentlyBetter = !second || best.score - second.score >= 8;
      const strongEnough = best.score >= 18;

      if (strongEnough && confidentlyBetter) {
        this.sendText(best.faq.answer);
        return true;
      }

      return false;
    };

    searchFaq = (query: string) => {
      if (this.tryAnswerFaq(query)) return;

      const suggested = this.suggestNavOptions(query, { limit: 3 });
      if (suggested) return;

      this.sendWidget(
        `I’m not sure I understood that. ${FAQ_HELP_FALLBACK.title} — ${FAQ_HELP_FALLBACK.body} You can also reach customer support below.`,
        "contactWidget",
      );
    };
  };
}
