// src/lib/chatbot/widgets/_shared.tsx
"use client";

import type { PropsWithChildren } from "react";

type ChatButtonProps = PropsWithChildren<{
  onClick: () => void;
  type?: "button" | "submit" | "reset";
}>;

const baseClassName =
  "inline-flex items-center rounded-xl px-3 py-2 text-sm font-semibold transition-all duration-150";

export function ResponseButton({ onClick, children, type = "button" }: ChatButtonProps) {
  return (
    <button
      type={type}
      onClick={onClick}
      className={[
        baseClassName,
        "border-ssp-ink-900/15 text-ssp-ink-900 border bg-white shadow-sm",
        "hover:border-ssp-cyan-500/35 hover:bg-ocean-50 hover:shadow-md active:scale-[0.99]",
      ].join(" ")}
    >
      {children}
    </button>
  );
}

export function LinkButton({ onClick, children, type = "button" }: ChatButtonProps) {
  return (
    <button
      type={type}
      onClick={onClick}
      className={[
        baseClassName,
        "border-ssp-cyan-600/20 bg-ocean-50/90 text-ssp-ink-900 border",
        "hover:border-ssp-cyan-500/40 hover:bg-ocean-100 hover:shadow-sm active:scale-[0.99]",
      ].join(" ")}
    >
      {children}
    </button>
  );
}
