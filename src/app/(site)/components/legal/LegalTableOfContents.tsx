"use client";

import { cn } from "@/lib/cn";
import { FOCUS_RING_LIGHT } from "@/app/(site)/company/faqs/_components/faqStyles";
import type { LegalSection } from "@/config/legal";

type LegalTableOfContentsProps = {
  sections: readonly LegalSection[];
  activeId: string;
  onSelect: (id: string) => void;
};

/**
 * Sticky TOC used on desktop and a horizontally-scrolling pill row on
 * mobile. Active state mirrors the FAQ category nav so users move between
 * documents without learning new controls.
 */
export function LegalTableOfContents({
  sections,
  activeId,
  onSelect,
}: LegalTableOfContentsProps) {
  return (
    <>
      <nav className="hidden lg:col-span-3 lg:block" aria-label="Document sections">
        <div className="sticky top-24 rounded-2xl border border-[color:var(--color-border-light-soft)]/70 bg-white/58 p-4 backdrop-blur-[1.5px]">
          <p className="mb-4 text-[10.5px] font-semibold uppercase tracking-[0.14em] text-[color:var(--color-subtle)]">
            Sections
          </p>
          <ul className="flex flex-col gap-1.5">
            {sections.map((section) => (
              <li key={section.id}>
                <a
                  href={`#${section.id}`}
                  aria-current={activeId === section.id ? "true" : undefined}
                  onClick={(event) => {
                    event.preventDefault();
                    onSelect(section.id);
                  }}
                  className={cn(
                    "block rounded-xl border px-3.5 py-3 text-[12.5px] font-medium leading-[1.34] tracking-[-0.004em] transition-all duration-150",
                    FOCUS_RING_LIGHT,
                    activeId === section.id
                      ? "border-[color:var(--color-border-light)] bg-white text-[color:var(--color-text-strong)] shadow-[0_12px_24px_-18px_rgba(2,6,23,0.45)]"
                      : "border-transparent text-[color:var(--color-muted)] hover:border-[color:var(--color-border-light)]/80 hover:bg-white/74 hover:text-[color:var(--color-text-strong)]",
                  )}
                >
                  {section.heading}
                </a>
              </li>
            ))}
          </ul>
        </div>
      </nav>

      <div className="mb-8 lg:hidden">
        <p className="mb-3 text-[10.5px] font-semibold uppercase tracking-[0.14em] text-[color:var(--color-subtle)]">
          Jump to section
        </p>
        <div className="-mx-1 overflow-x-auto pb-1">
          <div className="flex min-w-max gap-2 px-1">
            {sections.map((section) => (
              <a
                key={section.id}
                href={`#${section.id}`}
                aria-current={activeId === section.id ? "true" : undefined}
                onClick={(event) => {
                  event.preventDefault();
                  onSelect(section.id);
                }}
                className={cn(
                  "rounded-full border px-4 py-2.5 text-left text-[12.5px] font-medium leading-[1.34] tracking-[-0.004em] whitespace-nowrap transition-all duration-150",
                  FOCUS_RING_LIGHT,
                  activeId === section.id
                    ? "border-[color:var(--color-menu-accent)]/28 bg-[color:var(--color-nav-hover)] text-[color:var(--color-text-strong)]"
                    : "border-[color:var(--color-menu-border)] bg-white/84 text-[color:var(--color-muted)] hover:text-[color:var(--color-text-strong)]",
                )}
              >
                {section.heading}
              </a>
            ))}
          </div>
        </div>
      </div>
    </>
  );
}
