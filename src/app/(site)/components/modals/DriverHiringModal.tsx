"use client";

import * as React from "react";
import Link from "next/link";
import { AnimatePresence, motion } from "framer-motion";
import { ArrowUpRight, Truck, X } from "lucide-react";

import { SectionSignalEyebrow } from "@/app/(site)/components/ui/SectionSignalEyebrow";
import { cn } from "@/lib/cn";
import { DRIVE_DOCK_URL } from "@/config/driverHiring";

const SESSION_DISMISS_KEY = "ssp.driverHiringModal.dismissed.session";

function readDismissed(): boolean {
  try {
    return sessionStorage.getItem(SESSION_DISMISS_KEY) === "1";
  } catch {
    return false;
  }
}

function writeDismissed() {
  try {
    sessionStorage.setItem(SESSION_DISMISS_KEY, "1");
  } catch {
    /* ignore */
  }
}

export function DriverHiringModal({ enabled }: { enabled: boolean }) {
  const closeRef = React.useRef<HTMLButtonElement>(null);
  const [open, setOpen] = React.useState(false);

  const handleClose = React.useCallback(() => {
    writeDismissed();
    setOpen(false);
  }, []);

  React.useEffect(() => {
    if (!enabled) {
      setOpen(false);
      return;
    }
    if (typeof window === "undefined") return;
    if (readDismissed()) return;
    const id = window.requestAnimationFrame(() => setOpen(true));
    return () => window.cancelAnimationFrame(id);
  }, [enabled]);

  React.useEffect(() => {
    if (!open) return;

    const prevOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";

    const t = window.setTimeout(() => closeRef.current?.focus(), 80);

    function onKey(e: KeyboardEvent) {
      if (e.key === "Escape") {
        e.preventDefault();
        handleClose();
      }
    }
    window.addEventListener("keydown", onKey);

    return () => {
      window.clearTimeout(t);
      document.body.style.overflow = prevOverflow;
      window.removeEventListener("keydown", onKey);
    };
  }, [open, handleClose]);

  return (
    <AnimatePresence>
      {open && (
        <motion.div
          role="presentation"
          className="fixed inset-0 z-[150]"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.28, ease: [0.22, 1, 0.36, 1] }}
        >
          <button
            type="button"
            tabIndex={-1}
            className="absolute inset-0 z-0 cursor-default bg-[rgba(11,62,94,0.46)] backdrop-blur-[8px] transition-colors"
            aria-label="Dismiss dialog"
            onClick={handleClose}
          />

          <div className="pointer-events-none absolute inset-0 z-10 flex items-center justify-center p-4 sm:p-6">
            <motion.div
              role="dialog"
              aria-modal="true"
              aria-labelledby="driver-hiring-modal-title"
              className={cn(
                "pointer-events-auto relative w-full max-w-[min(100%,30rem)] overflow-hidden rounded-2xl",
                /* Ink shell so anti-aliased corner pixels match the header (avoids white fringing). */
                "bg-[color:var(--color-ssp-ink-900)] shadow-[var(--shadow-company-who-main-card)]",
              )}
              initial={{ opacity: 0, y: 14, scale: 0.98 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: 10, scale: 0.985 }}
              transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
              onClick={(e) => e.stopPropagation()}
            >
              <div
                className={cn(
                  "pointer-events-none absolute -top-24 -right-16 h-48 w-48 rounded-full",
                  "bg-[radial-gradient(circle_at_center,rgba(16,167,216,0.38),transparent_68%)]",
                )}
              />
              <div
                className={cn(
                  "pointer-events-none absolute -bottom-16 -left-12 h-44 w-44 rounded-full",
                  "bg-[radial-gradient(circle_at_center,rgba(224,43,53,0.14),transparent_70%)]",
                )}
              />
              <div
                className="pointer-events-none absolute inset-0 opacity-[0.09]"
                aria-hidden
                style={{
                  backgroundImage: `linear-gradient(rgba(255,255,255,0.55) 1px, transparent 1px),
                    linear-gradient(90deg, rgba(255,255,255,0.42) 1px, transparent 1px)`,
                  backgroundSize: "28px 28px",
                  maskImage:
                    "linear-gradient(180deg, rgba(0,0,0,0.95) 0%, rgba(0,0,0,0.35) 52%, transparent 100%)",
                }}
              />

              <div
                className={cn(
                  "relative overflow-hidden rounded-t-2xl border-b border-white/10",
                  "bg-gradient-to-br from-[color:var(--color-ssp-ink-900)] via-[color:var(--color-ssp-ink-800)] to-[color:var(--color-ssp-cyan-600)]",
                  "px-6 pt-7 pb-6 text-white",
                )}
              >
                <div className="flex items-start justify-between gap-3">
                  <SectionSignalEyebrow label="Hiring" light />

                  <button
                    ref={closeRef}
                    type="button"
                    onClick={handleClose}
                    className={cn(
                      "inline-flex h-10 w-10 shrink-0 cursor-pointer items-center justify-center rounded-xl",
                      "border border-white/20 bg-white/10 text-white backdrop-blur-sm transition",
                      "hover:bg-white/18 focus-visible:ring-2 focus-visible:ring-white/50 focus-visible:outline-none",
                    )}
                    aria-label="Close dialog"
                  >
                    <X className="h-5 w-5" strokeWidth={2} />
                  </button>
                </div>

                <div className="mt-5 flex items-start gap-3.5">
                  <div className="flex h-14 w-14 shrink-0 items-center justify-center rounded-2xl bg-white/[0.11] shadow-[inset_0_1px_0_rgba(255,255,255,0.14)] ring-1 ring-white/18">
                    <Truck className="h-7 w-7 text-white" aria-hidden />
                  </div>
                  <div className="min-w-0 pt-0.5">
                    <h2
                      id="driver-hiring-modal-title"
                      className="text-xl font-semibold tracking-tight text-white drop-shadow-[0_2px_14px_rgba(0,0,0,0.22)] sm:text-[1.35rem]"
                    >
                      We&apos;re hiring drivers
                    </h2>
                    <p className="mt-1.5 text-sm leading-snug text-white/[0.82]">
                      Join SSP Group — reliable freight, modern equipment, and routes across North
                      America.
                    </p>
                  </div>
                </div>
              </div>

              <div
                className={cn(
                  "relative space-y-5 rounded-b-2xl px-6 py-6",
                  "bg-[linear-gradient(180deg,var(--color-surface-1)_0%,var(--color-ssp-cloud-50)_100%)]",
                )}
              >
                <div
                  className="pointer-events-none absolute inset-x-0 top-0 h-px bg-[linear-gradient(90deg,transparent,rgba(16,167,216,0.22),transparent)]"
                  aria-hidden
                />
                <p className="text-[15px] leading-relaxed text-[color:var(--color-muted-light)]">
                  SSP is growing our professional driver network. Apply through DriveDock, our
                  secure digital onboarding portal, or visit careers to learn how we support our
                  fleet.
                </p>

                <div className="flex flex-col gap-3 sm:flex-row sm:items-stretch">
                  <a
                    href={DRIVE_DOCK_URL}
                    target="_blank"
                    rel="noopener noreferrer"
                    className={cn(
                      "group inline-flex min-h-[3rem] min-w-0 flex-1 items-center justify-center gap-2 rounded-xl px-4 py-3 text-sm font-semibold text-white transition",
                      "border border-[color:var(--color-careers-drivedock-500)]/45",
                      "bg-gradient-to-r from-[color:var(--color-careers-drivedock-700)] via-[color:var(--color-careers-drivedock-600)] to-[color:var(--color-careers-drivedock-500)]",
                      "shadow-[var(--shadow-careers-drivedock-cta)] hover:brightness-[1.06] focus-visible:ring-4 focus-visible:ring-[color:var(--color-careers-drivedock-500)]/25 focus-visible:outline-none",
                    )}
                  >
                    Apply on DriveDock
                    <ArrowUpRight
                      className="h-4 w-4 shrink-0 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
                      aria-hidden
                    />
                  </a>

                  <Link
                    href="/careers"
                    onClick={handleClose}
                    className={cn(
                      "inline-flex min-h-[3rem] shrink-0 items-center justify-center rounded-xl border px-5 py-3 text-sm font-semibold whitespace-nowrap transition",
                      "border-[color:var(--color-border-light)] bg-[color:var(--color-surface-2)]",
                      "text-[color:var(--color-text-light)] hover:border-[color:var(--color-ssp-cyan-500)]/40 hover:bg-[color:var(--color-surface-0-light)]",
                      "shadow-[var(--shadow-control-soft)] focus-visible:ring-4 focus-visible:ring-[color:var(--color-brand-500)]/15 focus-visible:outline-none",
                    )}
                  >
                    Careers page
                  </Link>
                </div>

                <p className="text-center text-[11px] leading-relaxed text-[color:var(--color-subtle-light)]">
                  DriveDock opens in a new tab. Click outside, or press{" "}
                  <kbd className="rounded border border-[color:var(--color-border-light-soft)] bg-[color:var(--color-surface-2)] px-1.5 py-0.5 font-mono text-[10px]">
                    Esc
                  </kbd>
                  , to close.
                </p>
              </div>
            </motion.div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
