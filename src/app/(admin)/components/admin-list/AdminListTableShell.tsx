"use client";

import * as React from "react";
import { cn } from "@/lib/cn";

export function AdminListTableShell({
  children,
  className,
}: {
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <div
      className={cn(
        "overflow-hidden rounded-3xl border bg-[var(--dash-surface)] shadow-[var(--dash-shadow)]",
        "border-[var(--dash-border)]",
        className,
      )}
    >
      {children}
    </div>
  );
}
