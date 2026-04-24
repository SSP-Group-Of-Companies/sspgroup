"use client";

import * as React from "react";
import Link from "next/link";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { Check, Lock, ShieldCheck, Sparkles, X } from "lucide-react";

import { cn } from "@/lib/cn";
import {
  COOKIE_CATEGORIES,
  COOKIE_INVENTORY,
  COOKIE_INVENTORY_LAST_REVIEWED,
  type CookieCategoryId,
} from "@/config/cookies";
import {
  consentGhostButton,
  consentOutlineButton,
  consentPrimaryButton,
  consentToggleKnob,
  consentToggleTrack,
} from "./consentStyles";

const CATEGORY_ICON: Record<CookieCategoryId, React.ComponentType<{ className?: string }>> = {
  necessary: ShieldCheck,
  analytics: Sparkles,
};

export type CookiePreferencesModalProps = {
  open: boolean;
  initialAnalytics: boolean;
  onClose: () => void;
  onSave: (analytics: boolean) => void;
};

export function CookiePreferencesModal({
  open,
  initialAnalytics,
  onClose,
  onSave,
}: CookiePreferencesModalProps) {
  const reduceMotion = useReducedMotion() ?? false;
  const [analytics, setAnalytics] = React.useState(initialAnalytics);
  const [expanded, setExpanded] = React.useState<Record<CookieCategoryId, boolean>>({
    necessary: false,
    analytics: false,
  });
  const closeRef = React.useRef<HTMLButtonElement>(null);
  const savedRef = React.useRef(false);

  React.useEffect(() => {
    if (!open) return;
    setAnalytics(initialAnalytics);
    savedRef.current = false;
  }, [open, initialAnalytics]);

  React.useEffect(() => {
    if (!open) return;

    const prevOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";

    const focusTimer = window.setTimeout(() => closeRef.current?.focus(), 80);

    function onKey(event: KeyboardEvent) {
      if (event.key === "Escape") {
        event.preventDefault();
        onClose();
      }
    }
    window.addEventListener("keydown", onKey);

    return () => {
      window.clearTimeout(focusTimer);
      document.body.style.overflow = prevOverflow;
      window.removeEventListener("keydown", onKey);
    };
  }, [open, onClose]);

  const commit = React.useCallback(
    (value: boolean) => {
      savedRef.current = true;
      onSave(value);
    },
    [onSave],
  );

  return (
    <AnimatePresence>
      {open ? (
        <motion.div
          role="presentation"
          className="fixed inset-0 z-[160]"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: reduceMotion ? 0 : 0.26, ease: [0.22, 1, 0.36, 1] }}
        >
          <button
            type="button"
            tabIndex={-1}
            aria-label="Close cookie preferences"
            onClick={onClose}
            className="absolute inset-0 z-0 cursor-default bg-[rgba(8,26,43,0.58)] backdrop-blur-[6px]"
          />

          <div className="pointer-events-none absolute inset-0 z-10 flex items-end justify-center px-4 pb-4 pt-6 sm:items-center sm:p-8">
            <motion.div
              role="dialog"
              aria-modal="true"
              aria-labelledby="cookie-preferences-modal-title"
              initial={reduceMotion ? { opacity: 1, y: 0 } : { opacity: 1, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              exit={reduceMotion ? { opacity: 0 } : { opacity: 0, y: 12 }}
              transition={{ duration: reduceMotion ? 0 : 0.32, ease: [0.22, 1, 0.36, 1] }}
              className={cn(
                "pointer-events-auto relative flex max-h-[calc(100vh-2rem)] w-full max-w-[min(100%,38rem)] flex-col overflow-hidden rounded-2xl",
                "border border-[color:var(--color-border-light)]/80 bg-white shadow-[0_40px_80px_-20px_rgba(2,6,23,0.38)]",
              )}
            >
              <span
                aria-hidden
                className="absolute inset-x-6 top-0 h-px bg-gradient-to-r from-transparent via-[color:var(--color-ssp-cyan-500)]/60 to-transparent"
              />

              <header className="flex items-start justify-between gap-4 border-b border-[color:var(--color-border-light-soft)] px-5 py-5 sm:px-6">
                <div className="min-w-0">
                  <p className="text-[10.5px] font-semibold uppercase tracking-[0.16em] text-[color:var(--color-ssp-cyan-600)]">
                    Cookie preferences
                  </p>
                  <h2
                    id="cookie-preferences-modal-title"
                    className="mt-1.5 text-[1.15rem] font-semibold tracking-tight text-[color:var(--color-text-strong)] sm:text-[1.25rem]"
                  >
                    Manage how SSP Group uses cookies
                  </h2>
                  <p className="mt-1.5 text-[12.5px] leading-[1.55] text-[color:var(--color-muted)]">
                    Strictly necessary cookies are always enabled. You can turn analytics on or off at
                    any time. Choices are stored in your browser for {
                      /* 180 days */
                    }
                    180 days.
                  </p>
                </div>
                <button
                  ref={closeRef}
                  type="button"
                  onClick={onClose}
                  aria-label="Close cookie preferences"
                  className="mt-0.5 inline-flex h-9 w-9 shrink-0 items-center justify-center rounded-full border border-[color:var(--color-border-light)] bg-white text-[color:var(--color-muted)] transition-colors hover:bg-[color:var(--color-surface-0-light)] hover:text-[color:var(--color-text-strong)] focus:outline-none focus-visible:ring-2 focus-visible:ring-[color:var(--color-ssp-cyan-500)] focus-visible:ring-offset-2 focus-visible:ring-offset-white"
                >
                  <X className="h-4 w-4" aria-hidden />
                </button>
              </header>

              <div className="flex-1 overflow-y-auto px-5 py-5 sm:px-6">
                <ul className="flex flex-col gap-3">
                  {COOKIE_CATEGORIES.map((category) => {
                    const Icon = CATEGORY_ICON[category.id];
                    const isOn = category.id === "necessary" ? true : analytics;
                    const canToggle = !category.required;
                    const isExpanded = expanded[category.id];
                    const entries = COOKIE_INVENTORY.filter((c) => c.categoryId === category.id);

                    return (
                      <li
                        key={category.id}
                        className="rounded-xl border border-[color:var(--color-border-light)] bg-[color:var(--color-surface-0-light)]/50 p-4"
                      >
                        <div className="flex items-start gap-3">
                          <span
                            aria-hidden
                            className="inline-flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-white ring-1 ring-[color:var(--color-ssp-cyan-500)]/18"
                          >
                            <Icon className="h-4 w-4 text-[color:var(--color-ssp-cyan-600)]" />
                          </span>

                          <div className="min-w-0 flex-1">
                            <div className="flex flex-wrap items-center gap-x-2 gap-y-1">
                              <h3 className="text-[13.5px] font-semibold text-[color:var(--color-text-strong)]">
                                {category.label}
                              </h3>
                              {category.required ? (
                                <span className="inline-flex items-center gap-1 rounded-full border border-[color:var(--color-border-light)] bg-white px-2 py-0.5 text-[10.5px] font-semibold uppercase tracking-[0.1em] text-[color:var(--color-muted)]">
                                  <Lock className="h-3 w-3" aria-hidden />
                                  Always on
                                </span>
                              ) : null}
                            </div>
                            <p className="mt-1 text-[12.5px] leading-[1.55] text-[color:var(--color-muted)]">
                              {category.summary}
                            </p>

                            <button
                              type="button"
                              onClick={() =>
                                setExpanded((prev) => ({ ...prev, [category.id]: !prev[category.id] }))
                              }
                              aria-expanded={isExpanded}
                              aria-controls={`cookie-cat-${category.id}-details`}
                              className="mt-2 inline-flex items-center gap-1 text-[11.5px] font-semibold uppercase tracking-[0.12em] text-[color:var(--color-ssp-cyan-600)] transition-colors hover:text-[color:var(--color-ssp-cyan-500)] focus:outline-none focus-visible:ring-2 focus-visible:ring-[color:var(--color-ssp-cyan-500)] focus-visible:ring-offset-2 focus-visible:ring-offset-white"
                            >
                              {isExpanded ? "Hide details" : "View details"}
                            </button>
                          </div>

                          <label
                            className={cn(
                              "mt-1 flex shrink-0 items-center",
                              !canToggle && "cursor-not-allowed opacity-80",
                            )}
                          >
                            <span className="sr-only">
                              Toggle {category.label.toLowerCase()} cookies
                            </span>
                            <button
                              type="button"
                              role="switch"
                              aria-checked={isOn}
                              aria-label={`${category.label} cookies: ${isOn ? "on" : "off"}`}
                              disabled={!canToggle}
                              onClick={() => {
                                if (!canToggle) return;
                                if (category.id === "analytics") setAnalytics((prev) => !prev);
                              }}
                              className={cn(
                                consentToggleTrack,
                                isOn
                                  ? "bg-[color:var(--color-ssp-cyan-500)]"
                                  : "bg-[color:var(--color-surface-0-light)]",
                                !canToggle && "cursor-not-allowed",
                              )}
                            >
                              <span
                                aria-hidden
                                className={cn(
                                  consentToggleKnob,
                                  isOn ? "translate-x-[1.375rem]" : "translate-x-0.5",
                                )}
                              />
                            </button>
                          </label>
                        </div>

                        <AnimatePresence initial={false}>
                          {isExpanded ? (
                            <motion.div
                              key="details"
                              id={`cookie-cat-${category.id}-details`}
                              initial={reduceMotion ? { opacity: 1, height: "auto" } : { opacity: 0, height: 0 }}
                              animate={{ opacity: 1, height: "auto" }}
                              exit={reduceMotion ? { opacity: 0 } : { opacity: 0, height: 0 }}
                              transition={{ duration: reduceMotion ? 0 : 0.22, ease: "easeOut" }}
                              className="overflow-hidden"
                            >
                              <div className="mt-3 rounded-lg border border-[color:var(--color-border-light-soft)] bg-white p-3">
                                <p className="text-[12.25px] leading-[1.65] text-[color:var(--color-muted)]">
                                  {category.description}
                                </p>
                                {entries.length > 0 ? (
                                  <dl className="mt-3 flex flex-col gap-2">
                                    {entries.map((entry) => (
                                      <div
                                        key={entry.name}
                                        className="rounded-md border border-[color:var(--color-border-light-soft)] bg-[color:var(--color-surface-0-light)]/60 px-3 py-2"
                                      >
                                        <div className="flex flex-wrap items-baseline gap-x-2">
                                          <dt className="text-[11.5px] font-semibold text-[color:var(--color-text-strong)]">
                                            {entry.name}
                                          </dt>
                                          <span className="text-[10.5px] font-semibold uppercase tracking-[0.1em] text-[color:var(--color-muted)]">
                                            {entry.source === "first_party" ? "First-party" : "Third-party"} · {entry.duration}
                                          </span>
                                        </div>
                                        <dd className="mt-0.5 text-[12px] leading-[1.55] text-[color:var(--color-muted)]">
                                          {entry.purpose}{" "}
                                          <span className="text-[color:var(--color-subtle)]">
                                            ({entry.provider})
                                          </span>
                                        </dd>
                                      </div>
                                    ))}
                                  </dl>
                                ) : null}
                              </div>
                            </motion.div>
                          ) : null}
                        </AnimatePresence>
                      </li>
                    );
                  })}
                </ul>

                <p className="mt-4 text-[11px] leading-[1.55] text-[color:var(--color-subtle)]">
                  Cookie inventory last reviewed {COOKIE_INVENTORY_LAST_REVIEWED}. For full disclosure
                  see the{" "}
                  <Link
                    href="/cookies"
                    className="font-semibold text-[color:var(--color-ssp-cyan-600)] underline-offset-2 hover:underline"
                  >
                    Cookie Policy
                  </Link>{" "}
                  and{" "}
                  <Link
                    href="/privacy"
                    className="font-semibold text-[color:var(--color-ssp-cyan-600)] underline-offset-2 hover:underline"
                  >
                    Privacy Policy
                  </Link>
                  .
                </p>
              </div>

              <footer className="flex flex-col gap-3 border-t border-[color:var(--color-border-light-soft)] bg-[color:var(--color-surface-0-light)]/60 px-5 py-4 sm:flex-row sm:items-center sm:justify-between sm:px-6">
                <button
                  type="button"
                  onClick={() => commit(false)}
                  className={cn(consentGhostButton, "self-start sm:self-auto")}
                >
                  Reject non-essential
                </button>
                <div className="flex flex-wrap gap-2 sm:justify-end">
                  <button
                    type="button"
                    onClick={() => commit(analytics)}
                    className={consentOutlineButton}
                  >
                    Save preferences
                  </button>
                  <button
                    type="button"
                    onClick={() => commit(true)}
                    className={consentPrimaryButton}
                  >
                    <Check className="mr-1.5 h-3.5 w-3.5" aria-hidden />
                    Accept all
                  </button>
                </div>
              </footer>
            </motion.div>
          </div>
        </motion.div>
      ) : null}
    </AnimatePresence>
  );
}
