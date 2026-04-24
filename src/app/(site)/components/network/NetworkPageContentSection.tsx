import type { ReactNode } from "react";
import { Container } from "@/app/(site)/components/layout/Container";
import { cn } from "@/lib/cn";

type NetworkPageContentSectionProps = {
  id?: string;
  children: ReactNode;
  className?: string;
  containerClassName?: string;
};

/**
 * Light band for network hub/detail body — token-based ambient, no legacy gray hex stacks.
 */
export function NetworkPageContentSection({
  id,
  children,
  className,
  containerClassName,
}: NetworkPageContentSectionProps) {
  return (
    <div id={id} className={cn("relative py-10 sm:py-12", className)}>
      <div className="absolute inset-0" aria-hidden>
        <div className="absolute inset-0 bg-[radial-gradient(900px_520px_at_14%_-12%,color-mix(in_srgb,var(--color-brand-500)_6%,transparent),transparent_62%)]" />
        <div className="absolute inset-0 bg-[radial-gradient(1000px_520px_at_88%_108%,color-mix(in_srgb,var(--color-ssp-ink-900)_6%,transparent),transparent_66%)]" />
        <div
          className="absolute inset-0 bg-gradient-to-b from-[color:var(--color-surface-0-light)] to-[color:var(--color-surface-0)]"
          aria-hidden
        />
      </div>
      <Container className={cn("site-page-container relative", containerClassName)}>{children}</Container>
    </div>
  );
}
