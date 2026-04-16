"use client";

import { cn } from "@/lib/cn";

export function AdminListPaginationBar({
  page,
  totalPages,
  hasPrev,
  hasNext,
  disabled,
  onPrev,
  onNext,
}: {
  page: number;
  totalPages: number;
  hasPrev?: boolean;
  hasNext?: boolean;
  disabled?: boolean;
  onPrev: () => void;
  onNext: () => void;
}) {
  return (
    <div className="flex flex-col gap-2 border-t border-[var(--dash-border)] px-4 py-3 sm:flex-row sm:items-center sm:justify-between">
      <div className="text-sm text-[var(--dash-muted)]">
        Page <span className="font-semibold text-[var(--dash-text)]">{page}</span> of{" "}
        <span className="font-semibold text-[var(--dash-text)]">{totalPages}</span>
      </div>

      <div className="flex gap-2">
        <button
          type="button"
          disabled={!hasPrev || disabled}
          onClick={onPrev}
          className={cn(
            "cursor-pointer rounded-2xl border px-3 py-2 text-sm font-semibold transition disabled:cursor-not-allowed",
            "border-[var(--dash-border)] bg-[var(--dash-surface)] text-[var(--dash-text)]",
            "hover:bg-[var(--dash-surface-2)]",
            "disabled:cursor-not-allowed disabled:opacity-50",
            "focus:outline-none focus-visible:ring-2 focus-visible:ring-[var(--dash-accent-soft)]",
          )}
        >
          Prev
        </button>
        <button
          type="button"
          disabled={!hasNext || disabled}
          onClick={onNext}
          className={cn(
            "cursor-pointer rounded-2xl border px-3 py-2 text-sm font-semibold transition disabled:cursor-not-allowed",
            "border-[var(--dash-border)] bg-[var(--dash-surface)] text-[var(--dash-text)]",
            "hover:bg-[var(--dash-surface-2)]",
            "disabled:cursor-not-allowed disabled:opacity-50",
            "focus:outline-none focus-visible:ring-2 focus-visible:ring-[var(--dash-accent-soft)]",
          )}
        >
          Next
        </button>
      </div>
    </div>
  );
}
