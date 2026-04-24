"use client";

import * as React from "react";
import Script from "next/script";
import { usePathname, useSearchParams } from "next/navigation";

import {
  applyAnalyticsConsent,
  createConsentPreferences,
  readConsentPreferences,
  saveConsentPreferences,
  type ConsentPreferences,
} from "@/lib/analytics/consent";
import { CONSENT_EVENTS } from "@/config/cookies";

import { ConsentBanner } from "@/app/(site)/components/consent/ConsentBanner";
import { CookiePreferencesModal } from "@/app/(site)/components/consent/CookiePreferencesModal";

declare global {
  interface Window {
    dataLayer?: Array<Record<string, unknown>>;
    gtag?: (command: string, eventName: string, params?: Record<string, unknown>) => void;
  }
}

/** Analytics never loads inside the admin surface. */
const ANALYTICS_EXCLUDED_PREFIXES = ["/admin"];

export function AnalyticsClient() {
  const gaId = process.env.NEXT_PUBLIC_GA_MEASUREMENT_ID;
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const routeExcluded = ANALYTICS_EXCLUDED_PREFIXES.some((prefix) => pathname.startsWith(prefix));

  const [consent, setConsent] = React.useState<ConsentPreferences | null>(null);
  const [initialized, setInitialized] = React.useState(false);
  const [bannerOpen, setBannerOpen] = React.useState(false);
  const [modalOpen, setModalOpen] = React.useState(false);
  const [gtagReady, setGtagReady] = React.useState(false);
  const trackedPathRef = React.useRef<string>("");

  // Load (and migrate) stored consent once on mount.
  React.useEffect(() => {
    const stored = readConsentPreferences();
    if (stored) {
      setConsent(stored);
      applyAnalyticsConsent(stored);
    }
    setInitialized(true);
  }, []);

  // Wait for consent initialization before deciding banner visibility to avoid flash/hide.
  React.useEffect(() => {
    if (!initialized) return;
    setBannerOpen(!consent);
  }, [consent, initialized]);

  // Allow any page (e.g. /cookie-preferences, footer link) to open the modal.
  React.useEffect(() => {
    const openPreferences = () => {
      setBannerOpen(false);
      setModalOpen(true);
    };
    window.addEventListener(CONSENT_EVENTS.openPreferences, openPreferences);
    return () => window.removeEventListener(CONSENT_EVENTS.openPreferences, openPreferences);
  }, []);

  // When gtag is already on the window (e.g. client-side navigation after the
  // scripts have loaded on a previous route), flag it ready immediately.
  // Otherwise we rely on the <Script onReady> callback below — no polling.
  React.useEffect(() => {
    if (!initialized || !gaId || routeExcluded) return;
    if (typeof window.gtag === "function") {
      setGtagReady(true);
    }
  }, [gaId, initialized, routeExcluded]);

  const handleInitScriptReady = React.useCallback(() => {
    if (typeof window.gtag === "function") {
      setGtagReady(true);
    }
  }, []);

  // Dispatch page_view for every route change — only when consent granted.
  React.useEffect(() => {
    if (
      routeExcluded ||
      !initialized ||
      !gaId ||
      !gtagReady ||
      !consent?.analytics ||
      typeof window.gtag !== "function"
    ) {
      return;
    }

    const pagePath = pathname;
    if (trackedPathRef.current === pagePath) return;

    trackedPathRef.current = pagePath;
    window.gtag("event", "page_view", {
      page_path: pagePath,
      page_location: window.location.href,
      page_title: document.title,
      transport_type: "beacon",
    });
  }, [consent?.analytics, gaId, gtagReady, initialized, pathname, routeExcluded, searchParams]);

  const saveConsent = React.useCallback((analytics: boolean) => {
    const next = createConsentPreferences(analytics);
    saveConsentPreferences(next);
    setConsent(next);
    applyAnalyticsConsent(next);
    window.dispatchEvent(new CustomEvent(CONSENT_EVENTS.consentUpdated, { detail: next }));
  }, []);

  const handleAcceptAll = React.useCallback(() => {
    saveConsent(true);
    setBannerOpen(false);
    setModalOpen(false);
  }, [saveConsent]);

  const handleRejectNonEssential = React.useCallback(() => {
    saveConsent(false);
    setBannerOpen(false);
    setModalOpen(false);
  }, [saveConsent]);

  const handleCustomize = React.useCallback(() => {
    setBannerOpen(false);
    setModalOpen(true);
  }, []);

  const handleModalClose = React.useCallback(() => {
    setModalOpen(false);
    // Re-open the banner if the visitor never recorded a choice.
    if (!consent) setBannerOpen(true);
  }, [consent]);

  const handleModalSave = React.useCallback(
    (analytics: boolean) => {
      saveConsent(analytics);
      setModalOpen(false);
      setBannerOpen(false);
    },
    [saveConsent],
  );

  if (routeExcluded) return null;
  if (!gaId) {
    // Still surface consent UI so legal obligations are met before GA is added.
    return (
      <>
        <ConsentBanner
          open={bannerOpen}
          onAcceptAll={handleAcceptAll}
          onRejectNonEssential={handleRejectNonEssential}
          onCustomize={handleCustomize}
        />
        <CookiePreferencesModal
          open={modalOpen}
          initialAnalytics={consent?.analytics ?? false}
          onClose={handleModalClose}
          onSave={handleModalSave}
        />
      </>
    );
  }

  return (
    <>
      <Script
        src={`https://www.googletagmanager.com/gtag/js?id=${gaId}`}
        strategy="afterInteractive"
      />
      <Script
        id="ssp-ga-init"
        strategy="afterInteractive"
        onReady={handleInitScriptReady}
        dangerouslySetInnerHTML={{
          __html: `
            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            window.gtag = gtag;
            gtag('js', new Date());
            gtag('consent', 'default', {
              analytics_storage: 'denied',
              ad_storage: 'denied',
              ad_user_data: 'denied',
              ad_personalization: 'denied',
              functionality_storage: 'granted',
              personalization_storage: 'denied',
              security_storage: 'granted',
              wait_for_update: 500
            });
            gtag('config', '${gaId}', {
              send_page_view: false,
              anonymize_ip: true,
              allow_google_signals: false,
              allow_ad_personalization_signals: false
            });
          `,
        }}
      />

      <ConsentBanner
        open={bannerOpen}
        onAcceptAll={handleAcceptAll}
        onRejectNonEssential={handleRejectNonEssential}
        onCustomize={handleCustomize}
      />
      <CookiePreferencesModal
        open={modalOpen}
        initialAnalytics={consent?.analytics ?? false}
        onClose={handleModalClose}
        onSave={handleModalSave}
      />
    </>
  );
}
