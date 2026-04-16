// src/lib/chatbot/widgets/SingleLinkWidget.tsx
"use client";

export default function SingleLinkWidget({ props, actionProvider }: any) {
  const label = props?.label || "Open";
  const href = props?.href || "/";

  return (
    <button
      onClick={() => actionProvider.goTo(href)}
      className="border-ssp-ink-900/10 text-ssp-ink-800/80 hover:border-ssp-ink-900/16 hover:bg-ssp-ink-900/[0.035] hover:text-ssp-ink-900 rounded-lg border bg-transparent px-2.5 py-1.5 text-xs font-medium transition-colors active:scale-[0.99]"
      type="button"
    >
      {label}
    </button>
  );
}
