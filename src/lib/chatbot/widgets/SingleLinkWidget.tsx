// src/lib/chatbot/widgets/SingleLinkWidget.tsx
"use client";

export default function SingleLinkWidget({ props, actionProvider }: any) {
  const label = props?.label || "Open";
  const href = props?.href || "/";

  return (
    <button
      onClick={() => actionProvider.goTo(href)}
      className="border-ssp-cyan-600/25 text-ssp-ink-900 hover:border-ssp-cyan-500/45 hover:bg-ocean-50 rounded-full border bg-white px-3.5 py-1.5 text-sm font-semibold shadow-sm transition-all hover:shadow-md active:scale-[0.99]"
      type="button"
    >
      {label}
    </button>
  );
}
