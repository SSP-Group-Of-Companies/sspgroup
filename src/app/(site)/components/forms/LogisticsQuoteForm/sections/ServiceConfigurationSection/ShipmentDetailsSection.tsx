// src/app/(site)/components/forms/LogisticsQuoteForm/sections/ServiceConfigurationSection/ShipmentDetailsSection.tsx
"use client";

import type { ReactNode } from "react";
import { cn } from "@/lib/cn";

export function ShipmentDetailsSection({
  children,
  title = "Shipment details",
  description = "Provide the basic details for your shipment.",
}: {
  children: ReactNode;
  title?: string;
  description?: string;
}) {
  return (
    <section className="space-y-5">
      <div>
        <h3 className="text-base font-semibold text-[color:var(--color-text-light)]">{title}</h3>
        <p className="mt-1 text-sm text-[color:var(--color-muted-light)]">{description}</p>
      </div>

      <div className="space-y-4">{children}</div>
    </section>
  );
}

export function ShipmentDetailsBlock({
  title,
  description,
  children,
  className,
}: {
  title?: string;
  description?: string;
  children: ReactNode;
  className?: string;
}) {
  const hasHeader = Boolean(title || description);

  return (
    <section
      className={cn(
        "rounded-2xl border border-[color:var(--color-border-light)] bg-white p-4 sm:p-5",
        hasHeader && "space-y-4",
        className,
      )}
    >
      {hasHeader ? (
        <div className="space-y-1">
          {title ? <h4 className="text-sm font-semibold text-[color:var(--color-text-light)]">{title}</h4> : null}
          {description ? <p className="text-sm text-[color:var(--color-muted-light)]">{description}</p> : null}
        </div>
      ) : null}

      {children}
    </section>
  );
}
