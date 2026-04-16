"use client";

import * as React from "react";
import { cn } from "@/lib/cn";

export function AdminListPageShell({
  children,
  maxWidthClassName = "max-w-7xl",
  className,
}: {
  children: React.ReactNode;
  maxWidthClassName?: string;
  className?: string;
}) {
  return (
    <div className={cn("admin-ambient", className)}>
      <div className={cn("mx-auto px-6 py-8", maxWidthClassName)}>{children}</div>
    </div>
  );
}
