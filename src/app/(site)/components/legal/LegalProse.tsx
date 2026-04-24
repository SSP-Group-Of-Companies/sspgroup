"use client";

import { Info } from "lucide-react";

import { cn } from "@/lib/cn";
import type { LegalBlock, LegalSection } from "@/config/legal";

type LegalSectionProps = {
  section: LegalSection;
  registerRef: (el: HTMLElement | null) => void;
};

/**
 * Renders one LegalSection as semantic HTML. Typography is calibrated for
 * long-form policy reading while staying aligned with the SSP light surface
 * tokens used on the locked pages.
 */
export function LegalProseSection({ section, registerRef }: LegalSectionProps) {
  return (
    <section
      id={section.id}
      ref={registerRef}
      className="scroll-mt-24 [&+section]:mt-12"
      aria-labelledby={`legal-${section.id}-heading`}
    >
      <div className="mb-2.5 flex items-center gap-2" aria-hidden>
        <span className="h-1.5 w-1.5 rounded-full bg-[color:var(--color-menu-accent)]/70" />
        <span className="h-px w-10 bg-gradient-to-r from-[color:var(--color-menu-accent)]/55 to-transparent" />
      </div>
      <h2
        id={`legal-${section.id}-heading`}
        className="mb-2 text-[1.08rem] font-semibold tracking-[-0.005em] text-[color:var(--color-text-strong)] sm:text-[1.18rem]"
      >
        {section.heading}
      </h2>
      {section.subheading ? (
        <p className="mb-4 text-[12.5px] italic text-[color:var(--color-subtle)]">
          {section.subheading}
        </p>
      ) : null}

      <div className="flex flex-col gap-3.5">
        {section.blocks.map((block, index) => (
          <LegalBlockRenderer key={index} block={block} />
        ))}
      </div>
    </section>
  );
}

function LegalBlockRenderer({ block }: { block: LegalBlock }) {
  if (block.kind === "paragraph") {
    return (
      <p className="text-[14.25px] leading-[1.74] text-[color:var(--color-muted)]">
        {block.text}
      </p>
    );
  }

  if (block.kind === "note") {
    return (
      <div
        role="note"
        className="flex items-start gap-3 rounded-xl border border-[color:var(--color-ssp-cyan-500)]/22 bg-[color:var(--color-ssp-cloud-100)] px-4 py-3"
      >
        <span
          aria-hidden
          className="mt-0.5 inline-flex h-6 w-6 shrink-0 items-center justify-center rounded-md bg-white ring-1 ring-[color:var(--color-ssp-cyan-500)]/20"
        >
          <Info className="h-3.5 w-3.5 text-[color:var(--color-ssp-cyan-600)]" aria-hidden />
        </span>
        <div>
          {block.label ? (
            <div className="text-[11.5px] font-semibold uppercase tracking-[0.12em] text-[color:var(--color-ssp-cyan-600)]">
              {block.label}
            </div>
          ) : null}
          <p
            className={cn(
              "text-[13.5px] leading-[1.62] text-[color:var(--color-text-strong)]",
              block.label ? "mt-1" : "",
            )}
          >
            {block.text}
          </p>
        </div>
      </div>
    );
  }

  const ListTag = block.ordered ? "ol" : "ul";
  return (
    <ListTag
      className={cn(
        "flex flex-col gap-2.5 pl-0",
        block.ordered ? "list-decimal pl-5" : "",
      )}
    >
      {block.items.map((item, idx) => (
        <li
          key={idx}
          className={cn(
            "text-[14.25px] leading-[1.72] text-[color:var(--color-muted)]",
            block.ordered ? "pl-1" : "relative pl-5 before:absolute before:left-1 before:top-[0.78em] before:h-1.5 before:w-1.5 before:rounded-full before:bg-[color:var(--color-ssp-cyan-500)]/55",
          )}
        >
          {item.lead ? (
            <strong className="font-semibold text-[color:var(--color-text-strong)]">
              {item.lead}.
            </strong>
          ) : null}
          {item.lead ? " " : null}
          {item.text}
        </li>
      ))}
    </ListTag>
  );
}
