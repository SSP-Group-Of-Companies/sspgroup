"use client";

import * as React from "react";
import { useReducedMotion } from "framer-motion";

import { Container } from "@/app/(site)/components/layout/Container";

import {
  LEGAL_LAST_UPDATED,
  LEGAL_LAST_UPDATED_ISO,
  type LegalPageContent,
  type LegalPageKey,
} from "@/config/legal";

import { LegalHero } from "./LegalHero";
import { LegalTableOfContents } from "./LegalTableOfContents";
import { LegalProseSection } from "./LegalProse";
import { LegalCrossLinks } from "./LegalCrossLinks";

type LegalPageShellProps = {
  page: LegalPageContent;
  /** Optional slot rendered before the first section — used by /cookie-preferences. */
  preSections?: React.ReactNode;
  /** Optional slot rendered after the last section and before cross links. */
  postSections?: React.ReactNode;
  /**
   * Optional content injected immediately after a named section's blocks.
   * Keys are section ids from the page config.
   */
  sectionSlots?: Partial<Record<string, React.ReactNode>>;
};

/**
 * Shared shell for every legal/policy page. Handles:
 *   - hero (dark SSP surface)
 *   - sticky TOC ↔ active-section sync (IntersectionObserver)
 *   - consistent prose rhythm
 *   - related-documents cross-link strip
 *
 * Server pages drive content via `page`. Interactive slots (e.g. the Cookie
 * Preferences controls) are injected through `preSections`/`postSections`.
 */
export function LegalPageShell({
  page,
  preSections,
  postSections,
  sectionSlots,
}: LegalPageShellProps) {
  const reduceMotion = useReducedMotion() ?? false;
  const [activeId, setActiveId] = React.useState(page.sections[0]?.id ?? "");
  const sectionRefs = React.useRef<Record<string, HTMLElement | null>>({});
  const latestEntriesRef = React.useRef<
    Record<string, { isIntersecting: boolean; intersectionRatio: number; top: number }>
  >({});

  // Stable per-id ref callbacks. Caching the callback prevents React from
  // re-invoking it every render (which, combined with a setState in the body,
  // would trigger an infinite update loop).
  const refCallbacks = React.useRef<Record<string, (el: HTMLElement | null) => void>>({});
  const getRegisterRef = React.useCallback((id: string) => {
    if (!refCallbacks.current[id]) {
      refCallbacks.current[id] = (el: HTMLElement | null) => {
        sectionRefs.current[id] = el;
      };
    }
    return refCallbacks.current[id];
  }, []);

  const scrollToSection = React.useCallback(
    (id: string) => {
      if (typeof window !== "undefined") {
        window.history.replaceState(null, "", `#${id}`);
      }
      const el = sectionRefs.current[id];
      if (!el) return;
      el.scrollIntoView({ behavior: reduceMotion ? "auto" : "smooth", block: "start" });
    },
    [reduceMotion],
  );

  React.useEffect(() => {
    const updateActive = () => {
      const bestVisible = page.sections
        .map((section) => ({
          id: section.id,
          entry: latestEntriesRef.current[section.id],
        }))
        .filter((item) => item.entry?.isIntersecting)
        .sort((a, b) => {
          const ratioDelta = (b.entry?.intersectionRatio ?? 0) - (a.entry?.intersectionRatio ?? 0);
          if (Math.abs(ratioDelta) > 0.001) return ratioDelta;
          return Math.abs(a.entry?.top ?? 0) - Math.abs(b.entry?.top ?? 0);
        })[0];

      if (bestVisible) {
        setActiveId(bestVisible.id);
        return;
      }

      const threshold = 160;
      const items = page.sections
        .map((section) => {
          const el = sectionRefs.current[section.id];
          return el ? { id: section.id, top: el.getBoundingClientRect().top } : null;
        })
        .filter((item): item is { id: string; top: number } => Boolean(item));

      const nearestPassed = [...items]
        .filter((item) => item.top <= threshold)
        .sort((a, b) => b.top - a.top)[0];
      if (nearestPassed) {
        setActiveId(nearestPassed.id);
        return;
      }

      const nearestUpcoming = items.sort((a, b) => a.top - b.top)[0];
      if (nearestUpcoming) setActiveId(nearestUpcoming.id);
    };

    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          const id = (entry.target as HTMLElement).id;
          latestEntriesRef.current[id] = {
            isIntersecting: entry.isIntersecting,
            intersectionRatio: entry.intersectionRatio,
            top: entry.boundingClientRect.top,
          };
        }
        updateActive();
      },
      { rootMargin: "-20% 0px -60% 0px", threshold: [0, 0.15, 0.3, 0.5, 0.75, 1] },
    );

    for (const section of page.sections) {
      const el = sectionRefs.current[section.id];
      if (!el) continue;
      observer.observe(el);
    }

    updateActive();

    return () => observer.disconnect();
  }, [page.sections]);

  React.useEffect(() => {
    if (typeof window === "undefined") return;
    const id = window.location.hash.replace("#", "");
    if (!id || !page.sections.some((section) => section.id === id)) return;
    setActiveId(id);
    const el = sectionRefs.current[id];
    if (!el) return;
    el.scrollIntoView({ behavior: "auto", block: "start" });
  }, [page.sections]);

  const heroLabelledBy = `legal-${page.key}-hero-heading`;
  const crossLinkLocation = `legal:${page.key}:cross_links`;

  return (
    <>
      <LegalHero
        reduceMotion={reduceMotion}
        sectionLabelledBy={heroLabelledBy}
        eyebrow={page.hero.eyebrow}
        title={page.hero.title}
        description={page.hero.description}
        lastUpdated={LEGAL_LAST_UPDATED}
        lastUpdatedIso={LEGAL_LAST_UPDATED_ISO}
      />

      <section
        aria-labelledby={heroLabelledBy}
        className="relative border-b border-[color:var(--color-border-light-soft)] py-14 sm:py-20"
        style={{
          background:
            "linear-gradient(180deg, var(--color-surface-1-light) 0%, var(--color-surface-0-light) 40%, var(--color-ssp-cloud-100) 100%)",
        }}
      >
        <div className="pointer-events-none absolute inset-0" aria-hidden>
          <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-[color:var(--color-ssp-cyan-500)]/20 to-transparent" />
          <div
            className="absolute left-0 top-0 h-[min(18rem,44vh)] w-full max-w-3xl opacity-[0.025]"
            style={{
              backgroundImage:
                "linear-gradient(to right, var(--color-company-companies-grid-line) 1px, transparent 1px), linear-gradient(to bottom, var(--color-company-companies-grid-line) 1px, transparent 1px)",
              backgroundSize: "60px 60px",
              maskImage:
                "radial-gradient(115% 98% at 0% 0%, black 0%, rgba(0,0,0,0.92) 62%, transparent 100%)",
              WebkitMaskImage:
                "radial-gradient(115% 98% at 0% 0%, black 0%, rgba(0,0,0,0.92) 62%, transparent 100%)",
            }}
          />
        </div>

        <Container className="site-page-container relative">
          <div className="lg:grid lg:grid-cols-12 lg:gap-14">
            <LegalTableOfContents
              sections={page.sections}
              activeId={activeId}
              onSelect={scrollToSection}
            />

            <div className="lg:col-span-9">
              <p className="mb-10 border-l-2 border-[color:var(--color-ssp-cyan-500)]/40 pl-4 text-[14.5px] leading-[1.72] text-[color:var(--color-text-strong)]">
                {page.summary}
              </p>

              {preSections}

              {page.sections.map((section) => {
                const slot = sectionSlots?.[section.id];
                return (
                  <React.Fragment key={section.id}>
                    <LegalProseSection
                      section={section}
                      registerRef={getRegisterRef(section.id)}
                    />
                    {slot ? <div className="mt-6">{slot}</div> : null}
                  </React.Fragment>
                );
              })}

              {postSections}

              <LegalCrossLinks
                currentKey={page.key as LegalPageKey}
                reduceMotion={reduceMotion}
                location={crossLinkLocation}
              />
            </div>
          </div>
        </Container>
      </section>
    </>
  );
}
