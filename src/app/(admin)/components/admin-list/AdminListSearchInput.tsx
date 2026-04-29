"use client";

import { cn } from "@/lib/cn";
import { Search, X } from "lucide-react";

export function AdminListSearchInput({
  value,
  onChange,
  placeholder,
  disabled,
  className,
}: {
  value: string;
  onChange: (next: string) => void;
  placeholder: string;
  disabled?: boolean;
  className?: string;
}) {
  return (
    <div
      className={cn(
        "group flex items-center gap-2 rounded-xl border px-3 py-2 transition",
        "border-[var(--dash-border)] bg-[var(--dash-bg)]",
        "focus-within:ring-2 focus-within:ring-[var(--dash-accent-soft)]",
        disabled && "pointer-events-none opacity-60",
        className,
      )}
    >
      <Search className="h-4 w-4 text-[var(--dash-muted)]" />
      <input
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder={placeholder}
        disabled={disabled}
        className="w-full bg-transparent text-sm text-[var(--dash-text)] outline-none placeholder:text-[var(--dash-muted)]"
      />
      {value.trim() ? (
        <button
          type="button"
          onClick={() => onChange("")}
          className={cn(
            "cursor-pointer rounded-xl p-1.5 text-[var(--dash-muted)] transition disabled:cursor-not-allowed",
            "hover:bg-[var(--dash-surface-2)] hover:text-[var(--dash-text)]",
          )}
          aria-label="Clear search"
        >
          <X className="h-4 w-4" />
        </button>
      ) : null}
    </div>
  );
}
