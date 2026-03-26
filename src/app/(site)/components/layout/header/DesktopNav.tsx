"use client";

import React from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { AnimatePresence, motion } from "framer-motion";
import { ChevronDown } from "lucide-react";
import { trackCtaClick } from "@/lib/analytics/cta";
import { NAV } from "@/config/navigation";
import { HEADER_DIRECT_LINKS, HEADER_HUB_ROUTES, HEADER_PRIMARY_DROPDOWNS, type HeaderDropdownKey } from "@/config/header";
import { cn } from "@/lib/cn";
import { focusRingNav } from "./constants";

const NAV_OPEN_DELAY_MS = 120;
const NAV_CLOSE_DELAY_MS = 220;
const ROLLOUT_DURATION_S = 0.32;
const CONTENT_FADE_DURATION_S = 0.16;
const DROPDOWN_TOP_OFFSET_PX = 1;

function navId(label: string) {
  return label.toLowerCase().replace(/[^\w]+/g, "_");
}

export function DesktopNav() {
  const [activeKey, setActiveKey] = React.useState<HeaderDropdownKey | null>(null);
  const [dropdownTop, setDropdownTop] = React.useState<number | null>(null);
  const navRef = React.useRef<HTMLElement | null>(null);
  const closeTimer = React.useRef<number | null>(null);
  const openTimer = React.useRef<number | null>(null);
  const pathname = usePathname();

  const openMenu = React.useCallback((key: HeaderDropdownKey) => {
    if (activeKey && activeKey !== key) {
      if (openTimer.current) window.clearTimeout(openTimer.current);
      if (closeTimer.current) window.clearTimeout(closeTimer.current);
      setActiveKey(key);
      return;
    }
    if (openTimer.current) window.clearTimeout(openTimer.current);
    if (closeTimer.current) window.clearTimeout(closeTimer.current);
    openTimer.current = window.setTimeout(() => {
      setActiveKey(key);
      openTimer.current = null;
    }, NAV_OPEN_DELAY_MS);
  }, [activeKey]);

  const scheduleClose = React.useCallback(() => {
    if (openTimer.current) window.clearTimeout(openTimer.current);
    if (closeTimer.current) window.clearTimeout(closeTimer.current);
    closeTimer.current = window.setTimeout(() => {
      setActiveKey(null);
      closeTimer.current = null;
    }, NAV_CLOSE_DELAY_MS);
  }, []);

  const cancelClose = React.useCallback(() => {
    if (closeTimer.current) window.clearTimeout(closeTimer.current);
    closeTimer.current = null;
  }, []);

  const closeMenu = React.useCallback(() => {
    if (openTimer.current) window.clearTimeout(openTimer.current);
    if (closeTimer.current) window.clearTimeout(closeTimer.current);
    openTimer.current = null;
    closeTimer.current = null;
    setActiveKey(null);
  }, []);

  React.useEffect(() => {
    closeMenu();
  }, [pathname, closeMenu]);

  React.useEffect(() => {
    if (!activeKey) return;
    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") closeMenu();
    };
    document.addEventListener("keydown", onKeyDown);
    return () => document.removeEventListener("keydown", onKeyDown);
  }, [activeKey, closeMenu]);

  React.useEffect(() => {
    return () => {
      if (openTimer.current) window.clearTimeout(openTimer.current);
      if (closeTimer.current) window.clearTimeout(closeTimer.current);
    };
  }, []);

  React.useLayoutEffect(() => {
    if (!activeKey) {
      setDropdownTop(null);
      return;
    }

    const measure = () => {
      const anchorEl =
        navRef.current?.closest<HTMLElement>("[data-header-mainbar]") ??
        navRef.current;
      const rect = anchorEl?.getBoundingClientRect();
      if (!rect) return;
      setDropdownTop(rect.bottom + DROPDOWN_TOP_OFFSET_PX);
    };

    measure();
    window.addEventListener("resize", measure);
    window.addEventListener("scroll", measure, true);
    return () => {
      window.removeEventListener("resize", measure);
      window.removeEventListener("scroll", measure, true);
    };
  }, [activeKey]);

  const section =
    activeKey === "solutions"
      ? NAV.solutions
      : activeKey === "industries"
        ? NAV.industries
        : activeKey === "company"
          ? NAV.company
          : activeKey === "careers"
            ? NAV.careers
            : null;
  const linkSection = section && "links" in section ? section : null;

  return (
    <nav
      ref={navRef}
      className="relative hidden h-full lg:flex lg:items-stretch"
      onMouseLeave={scheduleClose}
      onMouseEnter={cancelClose}
      aria-label="Primary"
    >
      <ul className="flex h-full items-center gap-1">
        {HEADER_PRIMARY_DROPDOWNS.map((key) => (
          <li key={key}>
            <Link
              href={HEADER_HUB_ROUTES[key]}
              onMouseEnter={() => openMenu(key)}
              onFocus={() => openMenu(key)}
              onClick={() => {
                closeMenu();
                trackCtaClick({
                  ctaId: `nav_desktop_${key}_hub`,
                  location: "nav_desktop:primary",
                  destination: HEADER_HUB_ROUTES[key],
                  label: NAV[key].label,
                });
              }}
              className={cn(
                "relative inline-flex h-full cursor-pointer items-center gap-1 rounded-none px-3 py-2 text-[14px] font-medium",
                "text-[color:var(--color-nav-text)]",
                "after:absolute after:right-3 after:bottom-0 after:left-3 after:h-[2px] after:origin-center after:scale-x-0",
                "after:bg-[color:var(--color-menu-accent)] after:transition-transform after:duration-200 after:ease-out",
                "hover:after:scale-x-100 focus-visible:after:scale-x-100",
                activeKey === key && "after:scale-x-100",
                focusRingNav,
              )}
              aria-expanded={activeKey === key}
              aria-controls={`desktop-dropdown-${key}`}
            >
              <span>{NAV[key].label}</span>
              <ChevronDown
                className={cn(
                  "h-3.5 w-3.5 text-[color:var(--color-nav-muted)]/90 transition-transform duration-200",
                  activeKey === key && "rotate-180",
                )}
                aria-hidden
              />
            </Link>
          </li>
        ))}

        {HEADER_DIRECT_LINKS.map((link) => (
          <li key={link.href}>
            <Link
              href={link.href}
              onClick={() =>
                trackCtaClick({
                  ctaId: link.ctaIdDesktop,
                  location: "nav_desktop:primary",
                  destination: link.href,
                  label: link.label,
                })
              }
              className={cn(
                "relative inline-flex h-full cursor-pointer items-center rounded-none px-3 py-2 text-[14px] font-medium",
                "text-[color:var(--color-nav-text)]",
                "after:absolute after:right-3 after:bottom-0 after:left-3 after:h-[2px] after:origin-center after:scale-x-0",
                "after:bg-[color:var(--color-menu-accent)] after:transition-transform after:duration-200 after:ease-out",
                "hover:after:scale-x-100 focus-visible:after:scale-x-100",
                focusRingNav,
              )}
            >
              {link.label}
            </Link>
          </li>
        ))}
      </ul>

      <AnimatePresence>
        {activeKey && section ? (
          <>
            <motion.div
              aria-hidden
              className="pointer-events-none fixed inset-x-0 bottom-0 z-40"
              style={{ top: dropdownTop ?? 0 }}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.18, ease: [0.22, 1, 0.36, 1] }}
            >
              <div className="h-full bg-white/34 backdrop-blur-[4px]" />
            </motion.div>

            <motion.div
              id={`desktop-dropdown-${activeKey}`}
              initial={{ clipPath: "inset(0 0 100% 0)" }}
              animate={{ clipPath: "inset(0 0 0% 0)" }}
              exit={{ clipPath: "inset(0 0 100% 0)" }}
              transition={{ duration: ROLLOUT_DURATION_S, ease: [0.16, 1, 0.3, 1] }}
              onMouseEnter={cancelClose}
              onMouseLeave={scheduleClose}
              className={cn(
                "fixed inset-x-0 z-50 mt-0 w-screen overflow-hidden",
                "rounded-none border-x border-b border-[color:var(--color-menu-border)] bg-[color:var(--color-nav-bg)]",
              "shadow-[0_10px_22px_rgba(2,6,23,0.09)]",
              )}
              style={{ top: dropdownTop ?? 0 }}
            >
              <motion.div
                initial={{ opacity: 0, y: -4 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -3 }}
                transition={{
                  duration: CONTENT_FADE_DURATION_S,
                  delay: 0.08,
                  ease: [0.22, 1, 0.36, 1],
                }}
                className="mx-auto grid w-full max-w-[1520px] grid-cols-12"
              >
              <div className="col-span-3 flex min-h-full flex-col border-r border-[color:var(--color-menu-border)] bg-[color:var(--color-nav-bg)] px-10 py-9">
                <p className="text-[22px] leading-[1.2] font-semibold text-[color:var(--color-menu-title)]">
                  {section.intro.title}
                </p>
                <p className="mt-4 max-w-[26ch] text-[14px] leading-7 text-[color:var(--color-menu-muted)]">
                  {section.intro.description}
                </p>
                <Link
                  href={section.intro.ctaHref}
                  onClick={() => {
                    closeMenu();
                    trackCtaClick({
                      ctaId: `nav_desktop_intro_${navId(section.intro.ctaLabel)}`,
                      location: "nav_desktop:intro",
                      destination: section.intro.ctaHref,
                      label: section.intro.ctaLabel,
                    });
                  }}
                  className={cn(
                    "mt-auto inline-flex items-center gap-2 border-t border-[color:var(--color-menu-border)] pt-8 text-[13px] font-semibold tracking-[0.02em]",
                    "text-[color:var(--color-menu-accent)] hover:text-[color:var(--color-menu-accent-hover)]",
                    focusRingNav,
                  )}
                >
                  {section.intro.ctaLabel}
                  <span aria-hidden>→</span>
                </Link>
              </div>

              <div className="col-span-9 px-10 py-9">
                {activeKey === "solutions" ? (
                  <div className="grid grid-cols-4 gap-x-10 gap-y-8">
                    {NAV.solutions.categories.map((category) => (
                      <div key={category.title}>
                        <p className="mb-4 text-[10.5px] font-semibold tracking-[0.12em] text-[color:var(--color-menu-subtle)] uppercase">
                          {category.title}
                        </p>
                        <ul className="space-y-2.5">
                          {category.links.map((link) => (
                            <li key={link.href}>
                              <Link
                                href={link.href}
                                onClick={() => closeMenu()}
                                className={cn(
                                  "relative inline-flex w-fit px-2 py-1.5 text-[14px] font-medium text-[color:var(--color-menu-title)] transition-colors duration-200",
                                  "after:absolute after:bottom-0.5 after:left-2 after:right-2 after:h-[1.5px] after:origin-left after:scale-x-0 after:bg-[color:var(--color-menu-accent)] after:transition-transform after:duration-300 after:ease-[cubic-bezier(0.22,1,0.36,1)]",
                                  "hover:text-[color:var(--color-ssp-ink-800)] hover:after:scale-x-100",
                                  focusRingNav,
                                )}
                              >
                                {link.label}
                              </Link>
                            </li>
                          ))}
                        </ul>
                      </div>
                    ))}
                  </div>
                ) : (
                  <ul className={cn("grid gap-2.5", activeKey === "careers" ? "grid-cols-1" : "grid-cols-2")}>
                    {linkSection?.links.map((link) => (
                      <li key={link.href}>
                        <Link
                          href={link.href}
                          onClick={() => closeMenu()}
                          className={cn(
                            "group block rounded-md px-3 py-3 transition-colors duration-200",
                            focusRingNav,
                          )}
                        >
                          <p className={cn(
                            "relative inline text-[15px] leading-6 font-semibold text-[color:var(--color-menu-title)] transition-colors duration-200",
                            "after:absolute after:-bottom-0.5 after:left-0 after:right-0 after:h-[1.5px] after:origin-left after:scale-x-0 after:bg-[color:var(--color-menu-accent)] after:transition-transform after:duration-300 after:ease-[cubic-bezier(0.22,1,0.36,1)]",
                            "group-hover:text-[color:var(--color-ssp-ink-800)] group-hover:after:scale-x-100",
                          )}>
                            {link.label}
                          </p>
                          {link.description ? (
                            <p className="mt-1 text-[12.5px] leading-6 text-[color:var(--color-menu-muted)]">
                              {link.description}
                            </p>
                          ) : null}
                        </Link>
                      </li>
                    ))}
                  </ul>
                )}
              </div>
              </motion.div>
            </motion.div>
          </>
        ) : null}
      </AnimatePresence>
    </nav>
  );
}
