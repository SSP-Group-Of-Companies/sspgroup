// src/lib/chatbot/widgets/_shared.tsx
"use client";

import type { PropsWithChildren } from "react";

type ChatButtonProps = PropsWithChildren<{
  onClick: () => void;
  type?: "button" | "submit" | "reset";
}>;

/** Minimal ghost — keeps visual hierarchy under the primary quote CTA. */
const secondaryClassName =
  "inline-flex items-center rounded-lg border border-ssp-ink-900/10 bg-transparent px-2.5 py-1.5 text-xs font-medium text-ssp-ink-800/80 transition-colors duration-150 hover:border-ssp-ink-900/16 hover:bg-ssp-ink-900/[0.035] hover:text-ssp-ink-900 active:scale-[0.99]";

export function ResponseButton({ onClick, children, type = "button" }: ChatButtonProps) {
  return (
    <button type={type} onClick={onClick} className={secondaryClassName}>
      {children}
    </button>
  );
}

export function LinkButton({ onClick, children, type = "button" }: ChatButtonProps) {
  return (
    <button type={type} onClick={onClick} className={secondaryClassName}>
      {children}
    </button>
  );
}

/** Primary CTA — only strong button in the chatbot (quick quote). */
export function PrimaryQuoteButton({ onClick, children, type = "button" }: ChatButtonProps) {
  return (
    <button
      type={type}
      onClick={onClick}
      className={[
        "inline-flex w-full items-center justify-center rounded-xl px-3 py-3 text-sm font-semibold tracking-tight transition-all duration-150",
        "from-ssp-cyan-600 to-utility-bg text-utility-text shadow-lg",
        "bg-gradient-to-r hover:brightness-[1.04] active:scale-[0.99]",
        "ring-1 ring-white/20",
      ].join(" ")}
    >
      {children}
    </button>
  );
}
