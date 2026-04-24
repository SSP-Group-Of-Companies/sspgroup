"use client";

import * as React from "react";
import { motion, useReducedMotion, type Variants } from "framer-motion";
import { Cookie, ShieldCheck, Sparkles, Settings2 } from "lucide-react";

import { cn } from "@/lib/cn";
import { CONSENT_EVENTS, COOKIE_CATEGORIES } from "@/config/cookies";
import { readConsentPreferences, type ConsentPreferences } from "@/lib/analytics/consent";
import { trackCtaClick } from "@/lib/analytics/cta";
import { TrackedLink } from "@/app/(site)/components/analytics/TrackedLink";
import { consentOutlineButton, consentPrimaryButton } from "@/app/(site)/components/consent/consentStyles";
import { FOCUS_RING_LIGHT } from "@/app/(site)/company/faqs/_components/faqStyles";

const PANEL_LOCATION = "cookie_preferences:panel";

const CATEGORY_ICON = {
  necessary: ShieldCheck,
  analytics: Sparkles,
} as const;

function formatDate(iso: string | undefined): string {
  if (!iso) return "No preference saved yet";
  try {
    return new Intl.DateTimeFormat("en-CA", { dateStyle: "long", timeStyle: "short" }).format(
      new Date(iso),
    );
  } catch {
    return iso;
  }
}

/**
 * Interactive panel shown at the top of /cookie-preferences. Lets a visitor
 * review their current choice and open the preferences modal to update it.
 * Rehydrates from storage on mount and stays in sync with `ssp:cookie_consent_updated`.
 */
export function CookiePreferencesPanel() {
  const reduceMotion = useReducedMotion() ?? false;
  const [consent, setConsent] = React.useState<ConsentPreferences | null>(null);
  const [hydrated, setHydrated] = React.useState(false);

  React.useEffect(() => {
    setConsent(readConsentPreferences());
    setHydrated(true);
  }, []);

  React.useEffect(() => {
    function onUpdated(event: Event) {
      const detail = (event as CustomEvent<ConsentPreferences>).detail;
      if (detail) setConsent(detail);
    }
    window.addEventListener(CONSENT_EVENTS.consentUpdated, onUpdated as EventListener);
    return () =>
      window.removeEventListener(CONSENT_EVENTS.consentUpdated, onUpdated as EventListener);
  }, []);

  const openPreferences = React.useCallback(() => {
    trackCtaClick({
      ctaId: "cookie_preferences_manage",
      location: PANEL_LOCATION,
      label: "Manage preferences",
    });
    window.dispatchEvent(new CustomEvent(CONSENT_EVENTS.openPreferences));
  }, []);

  const stagger: Variants = reduceMotion
    ? { hidden: { opacity: 1 }, show: { opacity: 1 } }
    : { hidden: {}, show: { transition: { staggerChildren: 0.05, delayChildren: 0.03 } } };

  const revealUp: Variants = reduceMotion
    ? { hidden: { opacity: 1, y: 0 }, show: { opacity: 1, y: 0 } }
    : { hidden: { opacity: 1, y: 10 }, show: { opacity: 1, y: 0 } };

  const analyticsOn = consent?.analytics ?? false;

  return (
    <motion.section
      aria-label="Current cookie preferences"
      initial="hidden"
      animate="show"
      variants={stagger}
      className="mb-10 rounded-2xl border border-[color:var(--color-border-light)] bg-white p-5 shadow-[0_12px_24px_-18px_rgba(2,6,23,0.32)] sm:p-6"
    >
      <motion.div variants={revealUp} transition={{ duration: reduceMotion ? 0 : 0.32, ease: "easeOut" }} className="flex items-start gap-3">
        <span
          aria-hidden
          className="inline-flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-[color:var(--color-surface-0-light)] ring-1 ring-[color:var(--color-ssp-cyan-500)]/18"
        >
          <Cookie className="h-4.5 w-4.5 text-[color:var(--color-ssp-cyan-600)]" aria-hidden />
        </span>
        <div className="min-w-0 flex-1">
          <h2 className="text-[1rem] font-semibold tracking-tight text-[color:var(--color-text-strong)] sm:text-[1.05rem]">
            Your current preference
          </h2>
          <p className="mt-1 text-[13px] leading-[1.62] text-[color:var(--color-muted)]">
            {hydrated
              ? consent
                ? analyticsOn
                  ? "Analytics cookies are enabled. Strictly necessary cookies are always on."
                  : "Only strictly necessary cookies are enabled."
                : "You have not made a choice yet. Strictly necessary cookies remain enabled so the site can run."
              : "Loading your saved preference\u2026"}
          </p>
          {consent ? (
            <p className="mt-1 text-[11.5px] text-[color:var(--color-subtle)]">
              Last saved: {formatDate(consent.updatedAt)}
            </p>
          ) : null}
        </div>
      </motion.div>

      <motion.ul
        variants={revealUp}
        transition={{ duration: reduceMotion ? 0 : 0.32, ease: "easeOut" }}
        className="mt-5 grid gap-2.5 sm:grid-cols-2"
      >
        {COOKIE_CATEGORIES.map((category) => {
          const Icon = CATEGORY_ICON[category.id];
          const isOn = category.id === "necessary" ? true : analyticsOn;
          return (
            <li
              key={category.id}
              className="flex items-start gap-3 rounded-xl border border-[color:var(--color-border-light)] bg-[color:var(--color-surface-0-light)]/50 px-4 py-3"
            >
              <span
                aria-hidden
                className="inline-flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-white ring-1 ring-[color:var(--color-ssp-cyan-500)]/18"
              >
                <Icon className="h-4 w-4 text-[color:var(--color-ssp-cyan-600)]" />
              </span>
              <div className="min-w-0 flex-1">
                <div className="flex items-center gap-2">
                  <h3 className="text-[12.75px] font-semibold text-[color:var(--color-text-strong)]">
                    {category.label}
                  </h3>
                  <span
                    className={cn(
                      "inline-flex items-center rounded-full px-2 py-0.5 text-[10.5px] font-semibold uppercase tracking-[0.1em]",
                      isOn
                        ? "bg-[color:var(--color-ssp-cyan-500)]/10 text-[color:var(--color-ssp-cyan-600)]"
                        : "bg-[color:var(--color-surface-0-light)] text-[color:var(--color-muted)]",
                    )}
                  >
                    {isOn ? "On" : "Off"}
                  </span>
                </div>
                <p className="mt-1 text-[12px] leading-[1.55] text-[color:var(--color-muted)]">
                  {category.summary}
                </p>
              </div>
            </li>
          );
        })}
      </motion.ul>

      <motion.div
        variants={revealUp}
        transition={{ duration: reduceMotion ? 0 : 0.32, ease: "easeOut" }}
        className="mt-5 flex flex-wrap items-center gap-2"
      >
        <button type="button" onClick={openPreferences} className={consentPrimaryButton}>
          <Settings2 className="mr-1.5 h-3.5 w-3.5" aria-hidden />
          Manage preferences
        </button>
        <TrackedLink
          href="/cookies"
          ctaId="cookie_preferences_view_policy"
          location={PANEL_LOCATION}
          label="View Cookie Policy"
          className={cn(consentOutlineButton, "no-underline", FOCUS_RING_LIGHT)}
        >
          View Cookie Policy
        </TrackedLink>
      </motion.div>
    </motion.section>
  );
}
