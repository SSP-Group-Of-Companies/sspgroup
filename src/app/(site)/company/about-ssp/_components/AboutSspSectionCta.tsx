"use client";

import Link from "next/link";
import { cn } from "@/lib/cn";

type Cta = { label: string; href: string };

const FOCUS_RING =
  "focus:outline-none focus-visible:ring-2 focus-visible:ring-white/40 focus-visible:ring-offset-2 focus-visible:ring-offset-[color:var(--color-company-ink)]";

export function AboutSspSectionCta({
  eyebrow,
  title,
  description,
  primary,
  secondary,
}: {
  eyebrow: string;
  title: string;
  description: string;
  primary: Cta;
  secondary: Cta;
}) {
  return (
    <div className="mt-10 rounded-2xl border border-[color:var(--color-glass-border)] bg-[color:var(--color-glass-bg)] p-5 sm:p-6">
      <p className="text-[10px] font-semibold tracking-[0.14em] text-white/45 uppercase">{eyebrow}</p>
      <h3 className="mt-2 text-lg font-semibold tracking-tight text-white sm:text-xl">{title}</h3>
      <p className="mt-2 text-sm leading-7 text-white/58">{description}</p>
      <div className="mt-5 flex flex-col gap-3 sm:flex-row">
        <Link
          href={primary.href}
          className={cn(
            "inline-flex h-11 items-center justify-center rounded-lg bg-[color:var(--color-ssp-cyan-500)] px-5 text-sm font-semibold text-white",
            "transition-all duration-200 hover:-translate-y-[1px] hover:bg-[color:var(--color-ssp-cyan-600)]",
            FOCUS_RING,
          )}
        >
          {primary.label}
        </Link>
        <Link
          href={secondary.href}
          className={cn(
            "inline-flex h-11 items-center justify-center rounded-lg border border-[color:var(--color-glass-border-hover)] px-5 text-sm font-semibold text-white/84",
            "transition-all duration-200 hover:border-[color:var(--color-glass-border-hover)] hover:bg-[color:var(--color-glass-bg-hover)] hover:text-white",
            FOCUS_RING,
          )}
        >
          {secondary.label}
        </Link>
      </div>
    </div>
  );
}

