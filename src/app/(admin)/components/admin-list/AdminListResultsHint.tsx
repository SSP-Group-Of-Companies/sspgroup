"use client";

import { cn } from "@/lib/cn";

export function AdminListResultsHint({
  showing,
  total,
  className,
}: {
  showing: number;
  total: number;
  className?: string;
}) {
  return (
    <div
      className={cn(
        "flex items-center justify-between gap-3 border-b px-4 py-3",
        "border-[var(--dash-border)]",
        className,
      )}
    >
      <div className="text-sm text-[var(--dash-muted)]">
        Showing <span className="font-semibold text-[var(--dash-text)]">{showing}</span> of{" "}
        <span className="font-semibold text-[var(--dash-text)]">{total}</span>
      </div>
    </div>
  );
}
