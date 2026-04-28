"use client";

import * as React from "react";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { motion, AnimatePresence, useReducedMotion } from "framer-motion";
import { Search, X } from "lucide-react";
import { cn } from "@/lib/cn";
import { trackCtaClick } from "@/lib/analytics/cta";
import {
  getSiteSearchResults,
  getDidYouMean,
  type SiteSearchResult,
  type SearchGroupKey,
} from "@/lib/search/siteSearch";
import { HEADER_SEARCH_QUICK_LINKS } from "@/config/header";
import { focusRingNav } from "./constants";
import { lockViewportScroll, measureMainbarBottom } from "./overlay";

const ROLLOUT_DURATION_S = 0.32;
const CONTENT_FADE_DURATION_S = 0.16;

const GROUP_ORDER: readonly SearchGroupKey[] = [
  "Shortcuts",
  "Solutions",
  "Industries",
  "Locations",
  "Lanes",
  "Company",
  "Insights",
  "Careers",
  "Legal",
];

type GroupedResults = Record<SearchGroupKey, SiteSearchResult[]>;

function groupResults(results: SiteSearchResult[]): GroupedResults {
  const grouped: GroupedResults = {
    Shortcuts: [],
    Solutions: [],
    Industries: [],
    Locations: [],
    Lanes: [],
    Company: [],
    Insights: [],
    Careers: [],
    Legal: [],
  };
  for (const result of results) {
    grouped[result.group].push(result);
  }
  return grouped;
}

export function HeaderSearchMode({
  open,
  onOpenChange,
}: {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}) {
  const router = useRouter();
  const pathname = usePathname();
  const reduceMotion = useReducedMotion();
  const pathnameRef = React.useRef(pathname);
  const shellRef = React.useRef<HTMLDivElement | null>(null);
  const panelRef = React.useRef<HTMLDivElement | null>(null);
  const [panelTop, setPanelTop] = React.useState<number | null>(null);
  const inputRef = React.useRef<HTMLInputElement | null>(null);
  const [query, setQuery] = React.useState("");
  const [activeIndex, setActiveIndex] = React.useState(0);

  const results = React.useMemo(
    () => getSiteSearchResults(query, { limit: 20, currentPath: pathname }),
    [query, pathname],
  );
  const grouped = React.useMemo(() => groupResults(results), [results]);
  const flatResults = React.useMemo(
    () =>
      GROUP_ORDER.flatMap((key) =>
        grouped[key].map((result) => ({ group: key, result })),
      ),
    [grouped],
  );
  const didYouMean = React.useMemo(() => {
    if (results.length > 0) return null;
    if (!query.trim()) return null;
    return getDidYouMean(query);
  }, [results.length, query]);

  React.useLayoutEffect(() => {
    if (!open) return;
    return lockViewportScroll();
  }, [open]);

  React.useEffect(() => {
    if (!open) return;
    const id = window.setTimeout(() => inputRef.current?.focus({ preventScroll: true }), 40);
    return () => window.clearTimeout(id);
  }, [open]);

  React.useEffect(() => {
    if (!open) return;
    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        onOpenChange(false);
      }
    };
    document.addEventListener("keydown", onKeyDown);
    return () => document.removeEventListener("keydown", onKeyDown);
  }, [open, onOpenChange]);

  React.useEffect(() => {
    if (!open) return;
    const onPointerDown = (event: MouseEvent) => {
      const target = event.target as Node | null;
      if (!target) return;
      if (shellRef.current?.contains(target)) return;
      if (panelRef.current?.contains(target)) return;
      onOpenChange(false);
    };
    document.addEventListener("mousedown", onPointerDown);
    return () => document.removeEventListener("mousedown", onPointerDown);
  }, [open, onOpenChange]);

  React.useEffect(() => {
    if (pathnameRef.current === pathname) return;
    pathnameRef.current = pathname;
    onOpenChange(false);
    setQuery("");
    setActiveIndex(0);
  }, [pathname, onOpenChange]);

  React.useEffect(() => {
    setActiveIndex(0);
  }, [query]);

  React.useLayoutEffect(() => {
    if (!open) {
      setPanelTop(null);
      return;
    }

    const measure = () => {
      const nextTop = measureMainbarBottom(shellRef.current);
      setPanelTop((prev) => (Math.abs((prev ?? 0) - nextTop) < 0.5 ? prev : nextTop));
    };

    measure();
    window.addEventListener("resize", measure);
    return () => {
      window.removeEventListener("resize", measure);
    };
  }, [open]);

  const navigateTo = React.useCallback(
    (href: string, label: string, group: string, index: number) => {
      trackCtaClick({
        ctaId: "header_search_mode_result",
        location: "site_header:search_mode",
        destination: href,
        label: `${group} - ${label} (${index + 1})`,
      });
      setQuery("");
      setActiveIndex(0);
      onOpenChange(false);
      router.push(href);
    },
    [onOpenChange, router],
  );

  const onInputKeyDown = React.useCallback(
    (event: React.KeyboardEvent<HTMLInputElement>) => {
      if (!flatResults.length) return;
      if (event.key === "ArrowDown") {
        event.preventDefault();
        setActiveIndex((prev) => (prev + 1) % flatResults.length);
      } else if (event.key === "ArrowUp") {
        event.preventDefault();
        setActiveIndex((prev) => (prev - 1 + flatResults.length) % flatResults.length);
      } else if (event.key === "Enter") {
        event.preventDefault();
        const chosen = flatResults[activeIndex] ?? flatResults[0];
        if (chosen) {
          navigateTo(chosen.result.href, chosen.result.label, chosen.group, activeIndex);
        }
      }
    },
    [activeIndex, flatResults, navigateTo],
  );

  const hasQuery = query.trim().length > 0;

  return (
    <AnimatePresence>
      {open ? (
        <div
          ref={shellRef}
          role="search"
          aria-label="Site search"
          className="relative hidden min-w-0 flex-1 lg:block"
        >
          <div className="flex items-center gap-3">
            <div className="relative min-w-0 flex-1">
              <Search
                className="pointer-events-none absolute top-1/2 left-4 h-4 w-4 -translate-y-1/2 text-[color:var(--color-nav-muted)]"
                aria-hidden
              />
              <input
                ref={inputRef}
                type="search"
                value={query}
                onChange={(event) => setQuery(event.target.value)}
                onKeyDown={onInputKeyDown}
                placeholder="Search solutions, industries, company pages, insights, and careers"
                className={cn(
                  "h-11 w-full rounded-full border border-[color:var(--color-nav-border)] pr-4 pl-11 text-sm",
                  "bg-white/90 text-[color:var(--color-nav-text)] placeholder:text-[color:var(--color-nav-muted)]",
                  "shadow-[inset_0_1px_0_rgba(255,255,255,0.6)]",
                  "outline-none focus:border-[color:var(--color-nav-ring)] focus:ring-2 focus:ring-black/[0.05]",
                )}
                aria-label="Site-wide search"
              />
            </div>

            <button
              type="button"
              onClick={() => onOpenChange(false)}
              className={cn(
                "inline-flex h-10 w-10 items-center justify-center rounded-full text-[color:var(--color-ssp-ink-800)]",
                "hover:bg-[color:var(--color-nav-hover)]",
                focusRingNav,
              )}
              aria-label="Close site search"
            >
              <X className="h-5 w-5" aria-hidden />
            </button>
          </div>

          <motion.div
            initial={{ opacity: 0, y: reduceMotion ? 0 : -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: reduceMotion ? 0 : -8 }}
            transition={{
              duration: reduceMotion ? 0 : ROLLOUT_DURATION_S,
              ease: [0.16, 1, 0.3, 1],
            }}
            className={cn(
              "fixed inset-x-0 z-[65] w-screen overflow-hidden border-x border-b",
              "border-[color:var(--color-menu-border)] bg-[color:var(--color-nav-bg)]",
              "shadow-[0_18px_40px_rgba(2,6,23,0.11)]",
            )}
            style={{ top: panelTop ?? 0 }}
            ref={panelRef}
          >
            <motion.div
              initial={{ opacity: 0, y: reduceMotion ? 0 : -3 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: reduceMotion ? 0 : -2 }}
              transition={{
                duration: reduceMotion ? 0 : CONTENT_FADE_DURATION_S,
                delay: reduceMotion ? 0 : 0.08,
                ease: [0.22, 1, 0.36, 1],
              }}
              className="mx-auto w-full max-w-[1520px]"
            >
              <div className="sr-only" aria-live="polite" aria-atomic="true">
                {hasQuery
                  ? flatResults.length
                    ? `${flatResults.length} result${flatResults.length === 1 ? "" : "s"} found`
                    : "No results found"
                  : ""}
              </div>
              {!hasQuery ? (
                <div className="px-10 py-7">
                  <p className="pl-8 text-[10.5px] font-semibold tracking-[0.12em] text-[color:var(--color-menu-subtle)] uppercase">
                    Quick Links
                  </p>
                  <ul className="mt-4 max-w-[420px] space-y-2.5 pl-8">
                    {HEADER_SEARCH_QUICK_LINKS.map((item) => (
                      <li key={item.href}>
                        <Link
                          href={item.href}
                          onClick={() => {
                            onOpenChange(false);
                            trackCtaClick({
                              ctaId: "header_search_mode_quick_link",
                              location: "site_header:search_mode",
                              destination: item.href,
                              label: item.label,
                            });
                          }}
                          className={cn(
                            "inline-flex items-center gap-2 text-[15px] text-[color:var(--color-menu-title)]",
                            "hover:text-[color:var(--color-menu-accent)]",
                            focusRingNav,
                          )}
                        >
                          <span aria-hidden>→</span>
                          {item.label}
                        </Link>
                      </li>
                    ))}
                  </ul>
                </div>
              ) : flatResults.length ? (
                <div className="max-h-[58vh] overflow-y-auto px-10 py-7">
                  {GROUP_ORDER.filter((key) => grouped[key].length > 0)
                    .map((groupKey) => (
                      <section key={groupKey} className="pb-6 last:pb-0">
                        <p className="mb-2 text-[10.5px] font-semibold tracking-[0.12em] text-[color:var(--color-menu-subtle)] uppercase">
                          {groupKey}
                        </p>
                        <ul className="space-y-1">
                          {grouped[groupKey].map((item) => {
                            const resultFlatIndex = flatResults.findIndex(
                              (entry) =>
                                entry.result.href === item.href &&
                                entry.result.label === item.label,
                            );
                            const isActive = resultFlatIndex === activeIndex;
                            return (
                              <li key={`${groupKey}-${item.href}-${item.label}`}>
                                <button
                                  type="button"
                                  onMouseEnter={() => setActiveIndex(resultFlatIndex)}
                                  onClick={() =>
                                    navigateTo(item.href, item.label, groupKey, resultFlatIndex)
                                  }
                                  className={cn(
                                    "w-full px-3 py-2 text-left",
                                    isActive
                                      ? "bg-[color:var(--color-menu-hover)]"
                                      : "hover:bg-[color:var(--color-menu-hover)]",
                                    focusRingNav,
                                  )}
                                >
                                  <p className="text-sm font-medium text-[color:var(--color-menu-title)]">
                                    {item.label}
                                  </p>
                                  <p className="mt-0.5 text-xs text-[color:var(--color-menu-muted)]">
                                    {item.description ?? item.href}
                                  </p>
                                </button>
                              </li>
                            );
                          })}
                        </ul>
                      </section>
                    ))}
                </div>
              ) : (
                <div className="px-10 py-7 text-sm text-[color:var(--color-menu-muted)]">
                  <p>
                    No direct matches for <span className="font-medium text-[color:var(--color-menu-title)]">&ldquo;{query.trim()}&rdquo;</span>.
                  </p>
                  {didYouMean ? (
                    <p className="mt-2">
                      Did you mean{" "}
                      <button
                        type="button"
                        onClick={() => setQuery(didYouMean)}
                        className={cn(
                          "font-medium text-[color:var(--color-menu-accent)] underline-offset-4 hover:underline",
                          focusRingNav,
                        )}
                      >
                        {didYouMean}
                      </button>
                      ?
                    </p>
                  ) : (
                    <p className="mt-2">
                      Try broader terms like <span className="font-medium">truckload</span>,{" "}
                      <span className="font-medium">cross-border</span>, or{" "}
                      <span className="font-medium">quote</span>.
                    </p>
                  )}
                </div>
              )}
            </motion.div>
          </motion.div>
        </div>
      ) : null}
    </AnimatePresence>
  );
}
