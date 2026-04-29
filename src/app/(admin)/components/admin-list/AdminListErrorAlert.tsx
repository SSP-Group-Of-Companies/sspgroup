"use client";

import { cn } from "@/lib/cn";
import { AlertTriangle, X } from "lucide-react";

export function AdminListErrorAlert({
  error,
  isDark,
  onDismiss,
}: {
  error: string | null;
  isDark: boolean;
  onDismiss?: () => void;
}) {
  if (!error) return null;

  return (
    <div
      className={cn(
        "mt-4 flex items-start gap-2 rounded-xl border px-4 py-3 text-sm",
        isDark
          ? "border-red-500/25 bg-red-600/15 text-red-50"
          : "border-red-200 bg-red-50 text-red-900",
      )}
    >
      <AlertTriangle className="mt-0.5 h-4 w-4" />
      <div className="flex-1">{error}</div>
      {onDismiss ? (
        <button
          type="button"
          onClick={onDismiss}
          className={cn(
            "cursor-pointer rounded-xl p-1.5 transition disabled:cursor-not-allowed",
            "text-inherit hover:bg-black/5",
            isDark && "hover:bg-white/5",
          )}
          aria-label="Dismiss error"
        >
          <X className="h-4 w-4" />
        </button>
      ) : null}
    </div>
  );
}
