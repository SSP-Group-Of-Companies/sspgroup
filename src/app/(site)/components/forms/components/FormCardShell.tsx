// src/app/(site)/components/forms/components/FormCardShell.tsx
"use client";

import * as React from "react";
import { cn } from "@/lib/cn";

interface FormCardShellProps {
  children: React.ReactNode;
  className?: string;
  innerClassName?: string;
}

export function FormCardShell({ children, className, innerClassName }: FormCardShellProps) {
  return (
    <div
      className={cn(
        "relative mx-auto w-full overflow-hidden rounded-3xl",
        "border border-[color:var(--color-border-light)]/85 bg-white/88",
        "shadow-[0_18px_44px_rgba(12,23,38,0.12)]",
        className,
      )}
    >
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-x-0 top-0 h-14 bg-[linear-gradient(90deg,var(--color-brand-600)_0%,var(--color-brand-500)_44%,rgba(16,167,216,0.78)_100%)]"
      />

      <div
        className={cn(
          "relative mt-[4px] overflow-hidden rounded-3xl bg-[color:var(--color-surface-0-light)]",
          innerClassName,
        )}
      >
        <div className="bg-white/95">{children}</div>
      </div>
    </div>
  );
}
