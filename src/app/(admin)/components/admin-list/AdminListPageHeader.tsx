"use client";

import * as React from "react";
import { cn } from "@/lib/cn";
import type { LucideIcon } from "lucide-react";

export function AdminListPageHeader({
  icon: Icon,
  title,
  description,
  actions,
  iconClassName,
}: {
  icon: LucideIcon;
  title: string;
  description: string;
  actions?: React.ReactNode;
  /** Override the default accent icon tile (e.g. neutral tile for job-scoped views). */
  iconClassName?: string;
}) {
  return (
    <div className="flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between">
      <div className="min-w-0">
        <div className="flex items-center gap-3">
          <div
            className={cn(
              "inline-flex h-10 w-10 items-center justify-center rounded-2xl border",
              "border-[var(--dash-border)] bg-[var(--dash-accent-muted)] text-[var(--dash-accent)]",
              iconClassName,
            )}
          >
            <Icon className="h-5 w-5" />
          </div>
          <div>
            <div className="text-2xl font-semibold tracking-tight text-[var(--dash-text)]">
              {title}
            </div>
            <div className="mt-1 text-sm text-[var(--dash-muted)]">{description}</div>
          </div>
        </div>
      </div>

      <div className="flex items-center gap-2">{actions}</div>
    </div>
  );
}
