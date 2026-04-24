"use client";

import Link from "next/link";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { Cookie } from "lucide-react";

import { cn } from "@/lib/cn";
import {
  consentDarkLinkButton,
  consentDarkOutlineButton,
  consentPrimaryButton,
} from "./consentStyles";

export type ConsentBannerProps = {
  open: boolean;
  onAcceptAll: () => void;
  onRejectNonEssential: () => void;
  onCustomize: () => void;
};

/**
 * Full-bleed privacy banner pinned to the bottom of the viewport on every
 * breakpoint. Dark SSP-ink surface (so it reads as a distinct, premium control
 * strip against either a light marketing page or the dark legal bar behind it)
 * with a cyan hairline and a cyan primary CTA. Honors motion-reduce and the
 * iOS home-bar safe area.
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
          initial={reduceMotion ? { opacity: 0 } : { opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          exit={reduceMotion ? { opacity: 0 } : { opacity: 0, y: 16 }}
          transition={{ duration: reduceMotion ? 0 : 0.34, ease: [0.22, 1, 0.36, 1] }}
          className="fixed inset-x-0 bottom-0 z-[130]"
        >
          <div
            className={cn(
              "relative bg-[color:var(--color-ssp-ink-900)]",
              "shadow-[0_-18px_48px_-24px_rgba(2,6,23,0.55)]",
            )}
          >
            {/* Cyan hairline — same language used at the top of premium
                sections elsewhere on the site. */}
            <span
              aria-hidden
              className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-[color:var(--color-ssp-cyan-500)]/55 to-transparent"
            />

            <div
              className={cn(
                "mx-auto flex max-w-[1440px] flex-col gap-4",
                "px-4 py-4 pb-[calc(env(safe-area-inset-bottom)+1rem)]",
                "sm:flex-row sm:items-center sm:gap-6 sm:px-6 sm:py-5 sm:pb-5",
                "lg:px-8",
              )}
            >
              {/* Copy block */}
              <div className="flex min-w-0 items-start gap-3 sm:flex-1">
                <span
                  aria-hidden
                  className="hidden h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-white/[0.06] ring-1 ring-[color:var(--color-ssp-cyan-500)]/30 sm:inline-flex"
                >
                  <Cookie
                    className="h-4 w-4 text-[color:var(--color-ssp-cyan-500)]"
                    aria-hidden
                  />
                </span>
                <div className="min-w-0">
                  <h2 className="text-[13.5px] font-semibold tracking-tight text-white">
                    Your privacy choices
                  </h2>
                  <p className="mt-1 text-[12.25px] leading-[1.6] text-white/70">
                    We use strictly necessary cookies to run this site. With your permission,
                    analytics cookies help us improve navigation and content. You can change your
                    choice anytime in{" "}
                    <Link
                      href="/cookie-preferences"
                      className={cn(
                        "relative font-semibold text-[color:var(--color-ssp-cyan-500)] transition-colors",
                        "after:absolute after:right-0 after:-bottom-0.5 after:left-0 after:h-[1.5px] after:origin-left after:scale-x-0 after:bg-[color:var(--color-ssp-cyan-500)] after:transition-transform after:duration-300 after:ease-[cubic-bezier(0.22,1,0.36,1)]",
                        "hover:text-white hover:after:scale-x-100",
                        "focus:outline-none focus-visible:text-white focus-visible:after:scale-x-100",
                      )}
                    >
                      Cookie Preferences
                    </Link>
                    .
                  </p>
                </div>
              </div>

              {/* Actions */}
              <div className="flex flex-wrap items-center gap-x-2 gap-y-2 sm:shrink-0 sm:gap-3">
                <button
                  type="button"
                  onClick={onAcceptAll}
                  className={cn(
                    consentPrimaryButton,
                    "flex-1 min-w-[9rem] sm:flex-none",
                    "focus-visible:ring-offset-[color:var(--color-ssp-ink-900)]",
                  )}
                >
                  Accept all
                </button>
                <button
                  type="button"
                  onClick={onRejectNonEssential}
                  className={cn(consentDarkOutlineButton, "flex-1 min-w-[11rem] sm:flex-none")}
                >
                  Reject non-essential
                </button>
                <button
                  type="button"
                  onClick={onCustomize}
                  className={cn(consentDarkLinkButton, "order-last w-full sm:order-none sm:w-auto")}
                >
                  Customize
                </button>
              </div>
            </div>
          </div>
        </motion.aside>
      ) : null}
    </AnimatePresence>
  );
}
