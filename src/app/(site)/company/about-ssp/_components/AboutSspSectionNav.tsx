"use client";

import Link from "next/link";
import { Container } from "@/app/(site)/components/layout/Container";
import { cn } from "@/lib/cn";

const ABOUT_SECTION_LINKS = [
  { label: "Who We Are", href: "#who-we-are" },
  { label: "Mission & Values", href: "#mission-vision-values" },
  { label: "Our Companies", href: "#our-companies" },
  { label: "Operating Model", href: "#operating-model-heading" },
  { label: "Coverage", href: "#coverage-network" },
  { label: "History", href: "/company/our-history" },
  { label: "Media", href: "/company/media" },
  { label: "FAQs", href: "/company/faqs" },
] as const;

const FOCUS_RING =
  "focus:outline-none focus-visible:ring-2 focus-visible:ring-white/40 focus-visible:ring-offset-2 focus-visible:ring-offset-[color:var(--color-company-ink)]";

export function AboutSspSectionNav() {
  return (
    <div className="sticky top-16 z-30 border-y border-white/8 bg-[color:var(--color-company-ink)]/92 backdrop-blur-md">
      <Container className="site-page-container">
        <nav
          aria-label="About SSP sections"
          className="scrollbar-none -mx-1 flex gap-1 overflow-x-auto py-3"
        >
          {ABOUT_SECTION_LINKS.map((item) => {
            const isAnchor = item.href.startsWith("#");
            return (
              <Link
                key={item.href}
                href={isAnchor ? `/about-us${item.href}` : item.href}
                className={cn(
                  "shrink-0 rounded-full border border-[color:var(--color-glass-border)] bg-[color:var(--color-glass-bg)] px-3.5 py-1.5 text-xs font-medium text-white/72 transition-all",
                  "hover:border-[color:var(--color-glass-border-hover)] hover:bg-[color:var(--color-glass-bg-hover)] hover:text-white",
                  FOCUS_RING,
                )}
              >
                {item.label}
              </Link>
            );
          })}
        </nav>
      </Container>
    </div>
  );
}

