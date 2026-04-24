"use client";

import Link from "next/link";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { Cookie } from "lucide-react";

import { cn } from "@/lib/cn";
import {
  consentGhostButton,
  consentOutlineButton,
  consentPrimaryButton,
} from "./consentStyles";

export type ConsentBannerProps = {
  open: boolean;
  onAcceptAll: () => void;
  onRejectNonEssential: () => void;
  onCustomize: () => void;
};

/**
 * Compact bottom-left consent banner shown until a visitor records a choice.
 * Aligns with the locked pages: rounded-2xl, token-driven colors, motion-safe.
 * Desktop: ~420px card at bottom-left. Mobile: full-width sheet at the bottom.
 */
export function ConsentBanner({
  open,
  onAcceptAll,
  onRejectNonEssential,
  onCustomize,
}: ConsentBannerProps) {
  const reduceMotion = useReducedMotion() ?? false;

  return (
    <AnimatePresence>
      {open ? (
        <motion.aside
          role="region"
          aria-label="Cookie preferences"
          initial={reduceMotion ? { opacity: 0 } : { opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          exit={reduceMotion ? { opacity: 0 } : { opacity: 0, y: 12 }}
          transition={{ duration: reduceMotion ? 0 : 0.32, ease: [0.22, 1, 0.36, 1] }}
          className="fixed inset-x-0 bottom-0 z-[130] px-3 pb-[calc(env(safe-area-inset-bottom)+12px)] sm:inset-x-auto sm:bottom-5 sm:left-5 sm:right-auto sm:w-[min(92vw,28rem)] sm:px-0 sm:pb-0"
        >
          <div
            className={cn(
              "relative overflow-hidden rounded-2xl border border-[color:var(--color-border-light)]/85",
              "bg-white/96 shadow-[0_28px_70px_-28px_rgba(2,6,23,0.34)] backdrop-blur-[10px]",
            )}
          >
            <span
              aria-hidden
              className="absolute inset-x-6 top-0 h-px bg-gradient-to-r from-transparent via-[color:var(--color-ssp-cyan-500)]/55 to-transparent"
            />

            <div className="flex items-start gap-3 px-5 pt-4 sm:px-6 sm:pt-5">
              <span
                aria-hidden
                className="inline-flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-[color:var(--color-surface-0-light)] ring-1 ring-[color:var(--color-ssp-cyan-500)]/18"
              >
                <Cookie className="h-4 w-4 text-[color:var(--color-ssp-cyan-600)]" aria-hidden />
              </span>
              <div className="min-w-0">
                <h2 className="text-[13.5px] font-semibold tracking-tight text-[color:var(--color-text-strong)]">
                  Your privacy choices
                </h2>
                <p className="mt-1 text-[12px] leading-[1.55] text-[color:var(--color-muted)]">
                  We use strictly necessary cookies to run this site. With your permission, analytics
                  cookies help us improve navigation and content. You can change your choice anytime in{" "}
                  <Link
                    href="/cookie-preferences"
                    className="font-semibold text-[color:var(--color-ssp-cyan-600)] underline-offset-2 hover:underline"
                  >
                    Cookie Preferences
                  </Link>
                  .
                </p>
              </div>
            </div>

            <div className="flex flex-wrap gap-2 px-5 pb-4 pt-3 sm:px-6 sm:pb-5">
              <button type="button" onClick={onAcceptAll} className={consentPrimaryButton}>
                Accept all
              </button>
              <button
                type="button"
                onClick={onRejectNonEssential}
                className={consentOutlineButton}
              >
                Reject non-essential
              </button>
              <button type="button" onClick={onCustomize} className={consentGhostButton}>
                Customize
              </button>
            </div>
          </div>
        </motion.aside>
      ) : null}
    </AnimatePresence>
  );
}
