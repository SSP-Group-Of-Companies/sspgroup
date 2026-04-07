"use client";

import * as React from "react";
import { cn } from "@/lib/cn";

export function AdminListFilterCard({
  children,
  className,
  overflowHidden = false,
}: {
  children: React.ReactNode;
  className?: string;
  /** When true, clips overflow (used when the card also contains a bulk-actions strip). */
  overflowHidden?: boolean;
}) {
  return (
    <div
      className={cn(
        "mb-6 rounded-3xl border shadow-[var(--dash-shadow)]",
        "border-[var(--dash-border)] bg-[var(--dash-surface)]",
        overflowHidden && "overflow-hidden",
        className,
      )}
    >
      {children}
    </div>
  );
}
