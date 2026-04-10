"use client";

import * as React from "react";
import Link from "next/link";
import { Mail, MapPin, PhoneCall, Search } from "lucide-react";
import { Container } from "@/app/(site)/components/layout/Container";
import { LogoImage } from "@/components/media/LogoImage";
import { cn } from "@/lib/cn";
import { trackCtaClick } from "@/lib/analytics/cta";
import { DesktopNav } from "./header/DesktopNav";
import { MobileNav } from "./header/MobileNav";
import { MobileSearchBubble } from "./header/MobileSearchBubble";
import { HeaderSearchMode } from "./header/HeaderSearchMode";
import { HEADER_ACTIONS, HEADER_UTILITY } from "@/config/header";
import { NAV_DESKTOP_MEDIA_QUERY } from "./header/constants";

const focusRing =
  "focus:outline-none focus-visible:ring-2 focus-visible:ring-[color:var(--color-nav-ring)] focus-visible:ring-offset-0";

export function SiteHeader() {
  const SEARCH_SHEET_CLOSE_MS = 320;
  const UTILITY_COLLAPSE_AT = 64;
  const UTILITY_EXPAND_AT = 20;
  const [isCondensed, setIsCondensed] = React.useState(false);
  const [scrollStateReady, setScrollStateReady] = React.useState(false);
  const [desktopSearchOpen, setDesktopSearchOpen] = React.useState(false);
  const [desktopSearchVisible, setDesktopSearchVisible] = React.useState(false);
  const [mobileSearchOpen, setMobileSearchOpen] = React.useState(false);
  const mobileSearchTriggerRef = React.useRef<HTMLButtonElement | null>(null);
  const desktopSearchTriggerRef = React.useRef<HTMLButtonElement | null>(null);

  React.useLayoutEffect(() => {
    let rafId: number | null = null;
    const desktopMq = window.matchMedia(NAV_DESKTOP_MEDIA_QUERY);

    const syncCondensed = () => {
      if (!desktopMq.matches) {
        setIsCondensed(false);
        setScrollStateReady(true);
        return;
      }

      const y = window.scrollY;
      setIsCondensed((prev) => {
        if (!prev && y >= UTILITY_COLLAPSE_AT) return true;
        if (prev && y <= UTILITY_EXPAND_AT) return false;
        return prev;
      });
      setScrollStateReady(true);
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
  }, []);

  React.useEffect(() => {
    if (desktopSearchOpen || !desktopSearchVisible) return;
    const id = window.setTimeout(() => {
      setDesktopSearchVisible(false);
    }, SEARCH_SHEET_CLOSE_MS);
    return () => window.clearTimeout(id);
  }, [desktopSearchOpen, desktopSearchVisible, SEARCH_SHEET_CLOSE_MS]);

  return (
    <header
      data-site-header
      className={cn(
        "sticky top-0 isolate z-[65]",
        "border-b border-[color:var(--color-nav-border)]",
        "bg-[color:var(--color-nav-bg)]",
        "shadow-[0_10px_26px_rgba(2,6,23,0.08)]",
      )}
    >
      <Link
        href="#main-content"
        className={cn(
          "sr-only focus:not-sr-only",
          "fixed top-4 left-4 z-[60]",
          "rounded-md bg-white px-4 py-2 text-sm font-semibold text-black",
          focusRing,
        )}
      >
        Skip to content
      </Link>

      <div
        className={cn(
          "grid overflow-hidden border-b border-white/12 bg-[color:var(--color-utility-bg)] text-[color:var(--color-utility-text)] motion-reduce:transition-none",
          scrollStateReady
            ? "transition-[grid-template-rows,opacity,border-color] duration-200 ease-[cubic-bezier(0.22,1,0.36,1)]"
            : "transition-none",
          isCondensed
            ? "grid-rows-[0fr] border-transparent opacity-0"
            : "grid-rows-[1fr] opacity-100",
        )}
      >
        <div className="min-h-0 overflow-hidden">
          <Container className="site-page-container">
            <div
              className={cn(
                "flex min-h-11 items-center justify-between gap-4 py-2 motion-reduce:transition-none",
                scrollStateReady
                  ? "transition-transform duration-200 ease-[cubic-bezier(0.22,1,0.36,1)]"
                  : "transition-none",
                isCondensed ? "-translate-y-2" : "translate-y-0",
              )}
            >
              <div className="hidden min-w-0 items-center gap-5 text-xs tracking-wide text-[color:var(--color-utility-text)]/90 lg:flex">
                <a
                  href={HEADER_UTILITY.mailtoHref}
                  className={cn(
                    "inline-flex items-center gap-1.5 truncate hover:text-white",
                    focusRing,
                  )}
                >
                  <Mail
                    className="h-3.5 w-3.5 text-[color:var(--color-utility-icon)]"
                    aria-hidden
                  />
                  <span>{HEADER_UTILITY.email}</span>
                </a>
                <span className="h-3.5 w-px bg-[color:var(--color-utility-divider)]" aria-hidden />
                <span className="inline-flex items-center gap-1.5 truncate">
                  <MapPin
                    className="h-3.5 w-3.5 text-[color:var(--color-utility-icon)]"
                    aria-hidden
                  />
                  <span>{HEADER_UTILITY.address}</span>
                </span>
                <span className="h-3.5 w-px bg-[color:var(--color-utility-divider)]" aria-hidden />
                <a
                  href={HEADER_UTILITY.telHref}
                  className={cn("inline-flex items-center gap-1.5 hover:text-white", focusRing)}
                >
                  <PhoneCall
                    className="h-3.5 w-3.5 text-[color:var(--color-utility-icon)]"
                    aria-hidden
                  />
                  <span>{HEADER_UTILITY.phone}</span>
                </a>
              </div>

              <div className="flex min-w-0 items-center gap-3 text-[11px] tracking-wide text-[color:var(--color-utility-text)]/90 lg:hidden">
                <a
                  href={HEADER_UTILITY.mailtoHref}
                  className={cn(
                    "inline-flex items-center gap-1.5 truncate hover:text-white",
                    focusRing,
                  )}
                >
                  <Mail
                    className="h-3.5 w-3.5 text-[color:var(--color-utility-icon)]"
                    aria-hidden
                  />
                  <span>{HEADER_UTILITY.email}</span>
                </a>
                <span className="h-3.5 w-px bg-[color:var(--color-utility-divider)]" aria-hidden />
                <a
                  href={HEADER_UTILITY.telHref}
                  className={cn(
                    "inline-flex items-center gap-1.5 truncate hover:text-white",
                    focusRing,
                  )}
                >
                  <PhoneCall
                    className="h-3.5 w-3.5 text-[color:var(--color-utility-icon)]"
                    aria-hidden
                  />
                  <span>{HEADER_UTILITY.phone}</span>
                </a>
              </div>

              <div className="ml-auto hidden items-center lg:flex">
                <button
                  ref={desktopSearchTriggerRef}
                  type="button"
                  onClick={() => {
                    const next = desktopSearchVisible ? !desktopSearchOpen : true;
                    setDesktopSearchVisible(true);
                    setDesktopSearchOpen(next);
                    trackCtaClick({
                      ctaId: next ? "header_utility_search_open" : "header_utility_search_close",
                      location: "site_header:utility_strip",
                      destination: "site_search_mode",
                      label: next ? "Open site search" : "Close site search",
                    });
                  }}
                  className={cn(
                    "hidden h-8 w-8 items-center justify-center rounded-full text-[color:var(--color-utility-text)] transition hover:bg-white/15 lg:inline-flex",
                    focusRing,
                  )}
                  aria-expanded={desktopSearchVisible}
                  aria-label="Search site"
                >
                  <Search className="h-4 w-4" aria-hidden />
                </button>
              </div>
            </div>
          </Container>
        </div>
      </div>

      <Container className="site-page-container">
        <div data-header-mainbar className={cn("flex h-[72px] items-center justify-between gap-4")}>
          {/* Logo (NO hover background) */}
          <Link
            href="/"
            onClick={() =>
              trackCtaClick({
                ctaId: "header_home_logo",
                location: "site_header:brand",
                destination: "/",
                label: "SSP Group",
              })
            }
            className={cn("flex cursor-pointer items-center rounded-md px-2 py-1.5", focusRing)}
            aria-label="SSP Group home"
          >
            <LogoImage
              src="/_optimized/brand/SSPlogo.png"
              alt="SSP Group"
              width={220}
              height={80}
              className="h-auto w-[88px] object-contain sm:w-[88px] md:w-[88px]"
            />
          </Link>

          {/* Desktop nav / desktop search mode */}
          <div className={cn("min-w-0 flex-1", desktopSearchVisible && "hidden")}>
            <DesktopNav />
          </div>
          {desktopSearchVisible ? (
            <HeaderSearchMode
              open={desktopSearchOpen}
              onOpenChange={(open) => {
                setDesktopSearchOpen(open);
                if (open) setDesktopSearchVisible(true);
              }}
            />
          ) : null}

          {/* Desktop actions + Mobile hamburger */}
          <div className="flex items-center gap-2">
            {/* Desktop-only CTAs */}
            <div
              className={cn(
                "hidden items-center gap-2 lg:flex",
                desktopSearchVisible && "lg:hidden",
              )}
            >
              {HEADER_ACTIONS.filter((action) => !action.primary).map((action) => (
                <Link
                  key={action.href}
                  href={action.href}
                  onClick={() =>
                    trackCtaClick({
                      ctaId: action.ctaIdDesktop,
                      location: "site_header:actions",
                      destination: action.href,
                      label: action.label,
                    })
                  }
                  className={cn(
                    "hidden h-10 cursor-pointer items-center justify-center rounded-md px-4 text-sm font-medium lg:inline-flex",
                    "border border-[color:var(--color-nav-border)]",
                    "text-[color:var(--color-nav-text)]",
                    "hover:bg-[color:var(--color-nav-hover)]",
                    focusRing,
                  )}
                >
                  {action.label}
                </Link>
              ))}
              {HEADER_ACTIONS.filter((action) => action.primary).map((action) => (
                <Link
                  key={action.href}
                  href={action.href}
                  onClick={() =>
                    trackCtaClick({
                      ctaId: action.ctaIdDesktop,
                      location: "site_header:actions",
                      destination: action.href,
                      label: action.label,
                    })
                  }
                  className={cn(
                    "inline-flex h-10 cursor-pointer items-center justify-center rounded-md px-4 text-sm font-semibold",
                    "bg-[color:var(--color-brand-600)] text-white hover:bg-[color:var(--color-brand-700)]",
                    "shadow-sm shadow-black/20",
                    focusRing,
                  )}
                >
                  {action.label}
                </Link>
              ))}
            </div>

            {/* Mobile only */}
            <button
              ref={mobileSearchTriggerRef}
              type="button"
              onClick={() => {
                setMobileSearchOpen((prev) => {
                  const next = !prev;
                  trackCtaClick({
                    ctaId: next ? "nav_mobile_search_open" : "nav_mobile_search_close",
                    location: "site_header:mobile_search_trigger",
                    destination: "mobile_search_mode",
                    label: next ? "Open mobile search" : "Close mobile search",
                  });
                  return next;
                });
              }}
              className={cn(
                "inline-flex h-10 w-10 cursor-pointer items-center justify-center rounded-md lg:hidden",
                "text-[color:var(--color-ssp-ink-800)] hover:bg-[color:var(--color-nav-hover)]",
                focusRing,
              )}
              aria-label="Search site"
              aria-expanded={mobileSearchOpen}
            >
              <Search className="h-5 w-5" aria-hidden />
            </button>
            <MobileNav />
          </div>
        </div>
      </Container>

      <MobileSearchBubble
        open={mobileSearchOpen}
        onOpenChange={setMobileSearchOpen}
        triggerRef={mobileSearchTriggerRef}
      />
    </header>
  );
}
