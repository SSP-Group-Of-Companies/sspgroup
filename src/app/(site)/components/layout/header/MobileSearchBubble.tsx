"use client";

import * as React from "react";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { motion, AnimatePresence, useReducedMotion } from "framer-motion";
import { Search, X } from "lucide-react";
import { cn } from "@/lib/cn";
import { trackCtaClick } from "@/lib/analytics/cta";
import { getSiteSearchResults } from "@/lib/search/siteSearch";
import { HEADER_SEARCH_QUICK_LINKS } from "@/config/header";
import { focusRingNav, focusRingMenu } from "./constants";

const ROLLOUT_DURATION_S = 0.32;

export function MobileSearchBubble({
  open,
  onOpenChange,
  triggerRef,
}: {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  triggerRef?: React.RefObject<HTMLElement | null>;
}) {
  const router = useRouter();
  const pathname = usePathname();
  const reduceMotion = useReducedMotion();
  const pathnameRef = React.useRef(pathname);
  const panelRef = React.useRef<HTMLDivElement | null>(null);
  const inputRef = React.useRef<HTMLInputElement | null>(null);
  const [sheetTop, setSheetTop] = React.useState(0);
  const [query, setQuery] = React.useState("");
  const [activeIndex, setActiveIndex] = React.useState(0);

  const results = React.useMemo(() => getSiteSearchResults(query, 12), [query]);

  React.useLayoutEffect(() => {
    if (!open) return;

    const measure = () => {
      const header = triggerRef?.current?.closest("header");
      if (header) setSheetTop(header.getBoundingClientRect().bottom);
    };

    measure();
    window.addEventListener("resize", measure);
    return () => {
      window.removeEventListener("resize", measure);
    };
  }, [open, triggerRef]);

  React.useEffect(() => {
    if (!open) return;
    const scrollY = window.scrollY;
    const header = triggerRef?.current?.closest("header") as HTMLElement | null;

    document.body.style.position = "fixed";
    document.body.style.top = `-${scrollY}px`;
    document.body.style.left = "0";
    document.body.style.right = "0";
    document.body.style.overflow = "hidden";

    if (header) {
      header.style.position = "fixed";
      header.style.top = "0";
      header.style.left = "0";
      header.style.right = "0";
    }

    return () => {
      document.body.style.position = "";
      document.body.style.top = "";
      document.body.style.left = "";
      document.body.style.right = "";
      document.body.style.overflow = "";

      if (header) {
        header.style.position = "";
        header.style.top = "";
        header.style.left = "";
        header.style.right = "";
      }

      window.scrollTo(0, scrollY);
    };
  }, [open]);

  React.useEffect(() => {
    if (!open) return;
    const id = window.setTimeout(() => inputRef.current?.focus(), 50);
    return () => window.clearTimeout(id);
  }, [open]);

  React.useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") onOpenChange(false);
    };
    document.addEventListener("keydown", onKey);
    return () => document.removeEventListener("keydown", onKey);
  }, [open, onOpenChange]);

  React.useEffect(() => {
    if (!open) return;
    const onDown = (e: MouseEvent) => {
      const target = e.target as Node | null;
      if (triggerRef?.current?.contains(target)) return;
      if (panelRef.current?.contains(target)) return;
      onOpenChange(false);
    };
    document.addEventListener("mousedown", onDown);
    return () => document.removeEventListener("mousedown", onDown);
  }, [open, onOpenChange, triggerRef]);

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

  const navigateTo = React.useCallback(
    (href: string, label: string, index: number) => {
      trackCtaClick({
        ctaId: "nav_mobile_search_result",
        location: "nav_mobile:search_sheet",
        destination: href,
        label: `${label} (${index + 1})`,
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
      if (!results.length) return;
      if (event.key === "ArrowDown") {
        event.preventDefault();
        setActiveIndex((prev) => (prev + 1) % results.length);
      } else if (event.key === "ArrowUp") {
        event.preventDefault();
        setActiveIndex((prev) => (prev - 1 + results.length) % results.length);
      } else if (event.key === "Enter") {
        event.preventDefault();
        const chosen = results[activeIndex] ?? results[0];
        if (chosen) navigateTo(chosen.href, chosen.label, activeIndex);
      }
    },
    [activeIndex, results, navigateTo],
  );

  const hasQuery = query.trim().length > 0;

  return (
    <AnimatePresence>
      {open ? (
        <>
          {/* Backdrop */}
          <motion.div
            className="fixed inset-0 z-[60] lg:hidden"
            style={{ top: sheetTop }}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: reduceMotion ? 0 : 0.2, ease: [0.22, 1, 0.36, 1] }}
          >
            <div className="h-full bg-black/40 backdrop-blur-sm" />
          </motion.div>

          {/* Search sheet */}
          <motion.div
            ref={panelRef}
            className={cn(
              "fixed inset-x-0 z-[66] w-full overflow-hidden lg:hidden",
              "bg-[color:var(--color-nav-bg)]",
              "shadow-[0_12px_32px_rgba(2,6,23,0.12)]",
            )}
            style={{ top: sheetTop }}
            initial={{ clipPath: "inset(0 0 100% 0)" }}
            animate={{ clipPath: "inset(0 0 0% 0)" }}
            exit={{ clipPath: "inset(0 0 100% 0)" }}
            transition={{ duration: reduceMotion ? 0 : ROLLOUT_DURATION_S, ease: [0.16, 1, 0.3, 1] }}
          >
            <div role="search" aria-label="Mobile site search">
            {/* Search input bar */}
            <div className="flex items-center gap-3 border-b border-[color:var(--color-nav-border)] px-4 py-3">
              <div className="relative min-w-0 flex-1">
                <Search
                  className="pointer-events-none absolute top-1/2 left-3.5 h-4 w-4 -translate-y-1/2 text-[color:var(--color-nav-muted)]"
                  aria-hidden
                />
                <input
                  ref={inputRef}
                  type="search"
                  value={query}
                  onChange={(e) => setQuery(e.target.value)}
                  onKeyDown={onInputKeyDown}
                  placeholder="Search solutions, industries, company..."
                  className={cn(
                    "h-11 w-full rounded-xl border border-[color:var(--color-nav-border)] pl-10 pr-4 text-sm",
                    "bg-white/90 text-[color:var(--color-nav-text)] placeholder:text-[color:var(--color-nav-muted)]",
                    "shadow-[inset_0_1px_0_rgba(255,255,255,0.6)]",
                    "outline-none focus:border-[color:var(--color-nav-ring)] focus:ring-2 focus:ring-black/[0.05]",
                  )}
                  aria-label="Mobile site search"
                />
              </div>

              <button
                type="button"
                onClick={() => onOpenChange(false)}
                className={cn(
                  "inline-flex h-10 w-10 shrink-0 items-center justify-center rounded-md",
                  "text-[color:var(--color-ssp-ink-800)] hover:bg-[color:var(--color-nav-hover)]",
                  focusRingNav,
                )}
                aria-label="Close search"
              >
                <X className="h-5 w-5" aria-hidden />
              </button>
            </div>

            <div className="sr-only" aria-live="polite" aria-atomic="true">
              {hasQuery
                ? results.length
                  ? `${results.length} result${results.length === 1 ? "" : "s"} found`
                  : "No results found"
                : ""}
            </div>

            {/* Results panel */}
            <div
              className="overflow-y-auto overscroll-contain px-4 py-4"
              style={{ maxHeight: `calc(100svh - ${sheetTop + 68}px)` }}
            >
              {!hasQuery ? (
                <div>
                  <p className="px-2 text-[10.5px] font-semibold tracking-[0.12em] text-[color:var(--color-menu-subtle)] uppercase">
                    Quick Links
                  </p>
                  <ul className="mt-3 space-y-1">
                    {HEADER_SEARCH_QUICK_LINKS.map((item) => (
                      <li key={item.href}>
                        <Link
                          href={item.href}
                          onClick={() => {
                            onOpenChange(false);
                            trackCtaClick({
                              ctaId: "nav_mobile_search_quick_link",
                              location: "nav_mobile:search_sheet",
                              destination: item.href,
                              label: item.label,
                            });
                          }}
                          className={cn(
                            "flex items-center gap-2.5 rounded-lg px-2 py-2.5 text-[14px] font-medium",
                            "text-[color:var(--color-menu-title)]",
                            "hover:bg-[color:var(--color-menu-hover)]",
                            focusRingMenu,
                          )}
                        >
                          <span className="text-[color:var(--color-menu-subtle)]" aria-hidden>→</span>
                          {item.label}
                        </Link>
                      </li>
                    ))}
                  </ul>
                </div>
              ) : results.length > 0 ? (
                <ul className="space-y-1">
                  {results.map((item, idx) => {
                    const isActive = idx === activeIndex;
                    return (
                      <li key={`${item.href}-${item.label}`}>
                        <button
                          type="button"
                          onMouseEnter={() => setActiveIndex(idx)}
                          onClick={() => navigateTo(item.href, item.label, idx)}
                          className={cn(
                            "w-full rounded-lg px-3 py-2.5 text-left transition",
                            isActive
                              ? "bg-[color:var(--color-menu-hover)]"
                              : "hover:bg-[color:var(--color-menu-hover)]",
                            focusRingMenu,
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
              ) : (
                <div className="px-2 py-3 text-sm text-[color:var(--color-menu-muted)]">
                  No direct matches found. Try broader terms like truckload, cross-border, or quote.
                </div>
              )}
            </div>
            </div>
          </motion.div>
        </>
      ) : null}
    </AnimatePresence>
  );
}
