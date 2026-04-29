"use client";

import * as React from "react";
import { Info, ShieldAlert, X } from "lucide-react";

import { AnnouncementBannerSheen } from "@/components/site/AnnouncementBannerSheen";
import { cn } from "@/lib/cn";
import {
  HEADER_UTILITY_COLLAPSE_SCROLL_Y,
  HEADER_UTILITY_EXPAND_SCROLL_Y,
  NAV_DESKTOP_MEDIA_QUERY,
} from "./header/constants";
import { SITE_ANNOUNCEMENT_DISMISS_COOKIE } from "@/lib/site/siteAnnouncementDismiss";
import {
  normalizeSiteAnnouncementTone,
  type ISiteAnnouncementSettings,
  type SiteAnnouncementTone,
} from "@/types/siteSettings.types";

const SESSION_DISMISS_KEY = "ssp.siteAnnouncement.dismissed.session";

const toneConfig: Record<
  SiteAnnouncementTone,
  {
    Icon: React.ComponentType<{ className?: string }>;
    /** Tailwind utilities (no background image — use `surface` for theme gradient tokens). */
    shell: string;
    /** `theme.css` — info: `--gradient-ssp-elevated`; danger: brand reds */
    surface: React.CSSProperties;
    icon: string;
    link: string;
    close: string;
  }
> = {
  info: {
    Icon: Info,
    shell: "border-[color:var(--color-ssp-cyan-600)]/20 text-white shadow-sm",
    surface: { background: "var(--gradient-ssp-elevated)" },
    icon: "text-[color:var(--color-ssp-cloud-50)]",
    link: "text-white underline decoration-white/55 underline-offset-4 hover:decoration-white",
    close: "text-white/80 hover:bg-white/12 hover:text-white",
  },
  danger: {
    Icon: ShieldAlert,
    shell: "border-[color:var(--color-brand-600)]/30 text-white shadow-sm",
    surface: {
      background: "linear-gradient(90deg, var(--color-brand-700), var(--color-brand-600))",
    },
    icon: "text-[color:var(--color-brand-50)]",
    link: "text-white underline decoration-white/55 underline-offset-4 hover:decoration-white",
    close: "text-white/80 hover:bg-white/12 hover:text-white",
  },
};

function readDismissedForRevision(revision: string): boolean {
  try {
    const raw = sessionStorage.getItem(SESSION_DISMISS_KEY);
    if (!raw) return false;
    const idx = raw.indexOf("|");
    if (idx <= 0) return false;
    const rev = raw.slice(0, idx);
    const flag = raw.slice(idx + 1);
    return flag === "1" && rev === revision;
  } catch {
    return false;
  }
}

function writeDismissedSession(revision: string) {
  try {
    sessionStorage.setItem(SESSION_DISMISS_KEY, `${revision}|1`);
  } catch {
    /* ignore */
  }
}

function clearDismissedSession() {
  try {
    sessionStorage.removeItem(SESSION_DISMISS_KEY);
  } catch {
    /* ignore */
  }
}

function writeDismissCookie(revision: string) {
  if (typeof document === "undefined") return;
  try {
    const secure =
      typeof location !== "undefined" && location.protocol === "https:" ? "; Secure" : "";
    document.cookie = `${SITE_ANNOUNCEMENT_DISMISS_COOKIE}=${encodeURIComponent(
      `${revision}|1`,
    )}; Path=/; Max-Age=86400; SameSite=Lax${secure}`;
  } catch {
    /* ignore */
  }
}

function resolveAnnouncementLinkAttributes(href: string, siteOrigin: string) {
  const trimmed = href.trim();
  if (!trimmed)
    return { target: undefined as string | undefined, rel: undefined as string | undefined };

  if (trimmed.startsWith("#")) {
    return { target: undefined, rel: undefined };
  }

  const baseOrigin = siteOrigin.trim();

  try {
    if (trimmed.startsWith("/")) {
      const url = new URL(trimmed, baseOrigin);
      const pageOrigin = new URL(baseOrigin).origin;
      const external = url.origin !== pageOrigin;
      return external
        ? { target: "_blank", rel: "noopener noreferrer" }
        : { target: undefined, rel: undefined };
    }

    if (/^mailto:|^tel:/i.test(trimmed)) {
      return { target: "_blank", rel: "noopener noreferrer" };
    }

    const absolute = trimmed.startsWith("//") ? new URL(`https:${trimmed}`) : new URL(trimmed);

    const pageOrigin = new URL(baseOrigin).origin;
    const external = absolute.origin !== pageOrigin;

    return external
      ? { target: "_blank", rel: "noopener noreferrer" }
      : { target: undefined, rel: undefined };
  } catch {
    return { target: "_blank", rel: "noopener noreferrer" };
  }
}

export function SiteAnnouncementBanner({
  announcement,
  siteOrigin,
  announcementRevision,
  dismissedByCookie,
}: {
  announcement: ISiteAnnouncementSettings;
  siteOrigin: string;
  announcementRevision: string;
  dismissedByCookie: boolean;
}) {
  const message = announcement.message.trim();
  const [visible, setVisible] = React.useState(() => {
    if (!announcement.enabled || !message) return false;
    if (dismissedByCookie) return false;
    return true;
  });
  const linkText = announcement.linkText?.trim() || "";
  const linkUrl = announcement.linkUrl?.trim() || "";
  const hasLink = !!linkText && !!linkUrl;
  const tone = normalizeSiteAnnouncementTone(announcement.tone);
  const { Icon, shell, surface, icon, link, close } = toneConfig[tone];

  const linkAttrs = React.useMemo(
    () => (hasLink ? resolveAnnouncementLinkAttributes(linkUrl, siteOrigin) : null),
    [hasLink, linkUrl, siteOrigin],
  );

  React.useLayoutEffect(() => {
    if (!announcement.enabled || !message) {
      setVisible(false);
      return;
    }

    if (dismissedByCookie) {
      writeDismissedSession(announcementRevision);
      setVisible(false);
      return;
    }

    if (readDismissedForRevision(announcementRevision)) {
      writeDismissCookie(announcementRevision);
      setVisible(false);
      return;
    }

    try {
      const raw = sessionStorage.getItem(SESSION_DISMISS_KEY);
      if (raw === "1") {
        writeDismissCookie(announcementRevision);
        writeDismissedSession(announcementRevision);
        setVisible(false);
        return;
      }
      if (raw && raw !== `${announcementRevision}|1`) clearDismissedSession();
    } catch {
      /* ignore */
    }

    setVisible(true);
  }, [announcement.enabled, announcementRevision, dismissedByCookie, message]);

  const handleClose = React.useCallback(() => {
    writeDismissedSession(announcementRevision);
    writeDismissCookie(announcementRevision);
    setVisible(false);
  }, [announcementRevision]);

  const handleLinkActivate = React.useCallback(
    (e: React.MouseEvent<HTMLAnchorElement>) => {
      if (e.button !== 0) return;
      handleClose();
    },
    [handleClose],
  );

  const [announcementCondensed, setAnnouncementCondensed] = React.useState(false);
  const [announcementScrollReady, setAnnouncementScrollReady] = React.useState(false);

  React.useLayoutEffect(() => {
    if (!visible) return;

    let rafId: number | null = null;
    const desktopMq = window.matchMedia(NAV_DESKTOP_MEDIA_QUERY);

    const syncCondensed = () => {
      if (!desktopMq.matches) {
        setAnnouncementCondensed(false);
        setAnnouncementScrollReady(true);
        return;
      }

      const y = window.scrollY;
      setAnnouncementCondensed((prev) => {
        if (!prev && y >= HEADER_UTILITY_COLLAPSE_SCROLL_Y) return true;
        if (prev && y <= HEADER_UTILITY_EXPAND_SCROLL_Y) return false;
        return prev;
      });
      setAnnouncementScrollReady(true);
    };

    const handleScroll = () => {
      if (rafId) return;
      rafId = window.requestAnimationFrame(() => {
        rafId = null;
        if (document.documentElement.style.overflow === "hidden") return;
        syncCondensed();
      });
    };

    syncCondensed();
    window.addEventListener("scroll", handleScroll, { passive: true });
    window.addEventListener("resize", syncCondensed);
    desktopMq.addEventListener?.("change", syncCondensed);
    return () => {
      window.removeEventListener("scroll", handleScroll);
      window.removeEventListener("resize", syncCondensed);
      desktopMq.removeEventListener?.("change", syncCondensed);
      if (rafId) window.cancelAnimationFrame(rafId);
    };
  }, [visible]);

  if (!visible) return null;

  return (
    <aside
      className={cn(
        "relative z-10 grid overflow-hidden border-b",
        "grid-rows-[1fr] opacity-100",
        announcementScrollReady
          ? "transition-[grid-template-rows,opacity,border-color] duration-200 ease-[cubic-bezier(0.22,1,0.36,1)] motion-reduce:transition-none"
          : "transition-none motion-reduce:transition-none",
        announcementCondensed && "lg:grid-rows-[0fr] lg:border-transparent lg:opacity-0",
        shell,
      )}
      style={surface}
      aria-label="Site announcement"
    >
      <div className="min-h-0 overflow-hidden px-4 py-2.5">
        <AnnouncementBannerSheen />
        <div className="relative mx-auto flex max-w-[1180px] items-center justify-center gap-3 pr-10 text-center text-sm leading-snug font-medium">
          <Icon className={cn("h-4 w-4 shrink-0", icon)} aria-hidden />
          <p className="min-w-0">
            <span>{message}</span>
            {hasLink ? (
              <>
                {" "}
                <a
                  href={linkUrl}
                  target={linkAttrs?.target}
                  rel={linkAttrs?.rel}
                  className={cn("font-semibold transition", link)}
                  onClick={handleLinkActivate}
                >
                  {linkText}
                </a>
              </>
            ) : null}
          </p>
          <button
            type="button"
            onClick={handleClose}
            className={cn(
              "absolute top-1/2 right-0 inline-flex h-8 w-8 -translate-y-1/2 cursor-pointer items-center justify-center rounded-full transition",
              "focus-visible:ring-2 focus-visible:ring-white/55 focus-visible:outline-none",
              close,
            )}
            aria-label="Close announcement"
          >
            <X className="h-4 w-4" aria-hidden />
          </button>
        </div>
      </div>
    </aside>
  );
}
