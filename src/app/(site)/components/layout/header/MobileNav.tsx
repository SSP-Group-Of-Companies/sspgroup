"use client";

import React from "react";
import * as Dialog from "@radix-ui/react-dialog";
import * as Accordion from "@radix-ui/react-accordion";
import { VisuallyHidden } from "@radix-ui/react-visually-hidden";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { trackCtaClick } from "@/lib/analytics/cta";
import { cn } from "@/lib/cn";
import { NAV } from "@/config/navigation";
import {
  HEADER_ACTIONS,
  HEADER_DIRECT_LINKS,
  HEADER_PRIMARY_DROPDOWNS,
  type HeaderAction,
  type HeaderDropdownKey,
} from "@/config/header";
import { focusRingNav, focusRingMenu, NAV_DESKTOP_MEDIA_QUERY } from "./constants";
import { X, Menu, ChevronDown as ChevronDownIcon, ChevronRight, ArrowUpRight } from "lucide-react";
import { lockViewportScroll, measureHeaderBottom } from "./overlay";

const ROLLOUT_DURATION_S = 0.32;

function navId(value: string) {
  return value.toLowerCase().replace(/[^\w]+/g, "_");
}

function MobileRowLink({
  href,
  label,
  location,
  ctaId,
  externalCue,
  onNavigate,
}: {
  href: string;
  label: string;
  location: string;
  ctaId: string;
  externalCue?: boolean;
  onNavigate: () => void;
}) {
  const pathname = usePathname();
  const handleClick = React.useCallback(
    (event: React.MouseEvent<HTMLAnchorElement>) => {
      onNavigate();
      trackCtaClick({ ctaId, location, destination: href, label });

      const [targetPath, targetHash = ""] = href.split("#");
      const isCareersOverviewTarget =
        targetPath === "/careers" && (targetHash === "" || targetHash === "overview");
      if (!isCareersOverviewTarget || pathname !== "/careers") return;

      event.preventDefault();
      if (window.location.hash !== "#overview") {
        window.history.replaceState(null, "", "#overview");
      }
      window.scrollTo({ top: 0, behavior: "smooth" });
    },
    [ctaId, href, label, location, onNavigate, pathname],
  );

  return (
    <Link
      href={href}
      onClick={handleClick}
      className={cn(
        "group flex items-center justify-between gap-3 rounded-md px-2 py-2 transition",
        "text-[13px] font-medium text-[color:var(--color-menu-title)]",
        "hover:bg-[color:var(--color-menu-hover)]",
        focusRingMenu,
      )}
    >
      <span>{label}</span>
      {externalCue ? (
        <ArrowUpRight className="h-3.5 w-3.5 text-[color:var(--color-menu-subtle)]" aria-hidden />
      ) : (
        <ChevronRight
          className="h-3.5 w-3.5 text-[color:var(--color-menu-subtle)] opacity-0 transition-opacity group-hover:opacity-100"
          aria-hidden
        />
      )}
    </Link>
  );
}

function SectionTrigger({
  label,
  value,
  openValue,
}: {
  label: string;
  value: string;
  openValue: string | undefined;
}) {
  const isOpen = openValue === value;

  return (
    <Accordion.Trigger
      className={cn(
        "flex w-full items-center justify-between py-3.5 text-[15px] font-semibold transition-colors",
        "text-[color:var(--color-menu-title)]",
        "hover:text-[color:var(--color-ssp-ink-800)]",
        focusRingMenu,
      )}
    >
      <span>{label}</span>
      <ChevronDownIcon
        className={cn(
          "h-4 w-4 transition-transform duration-200",
          "text-[color:var(--color-menu-subtle)]",
          isOpen && "rotate-180 text-[color:var(--color-menu-accent)]",
        )}
        aria-hidden
      />
    </Accordion.Trigger>
  );
}

export function MobileNav() {
  const [open, setOpen] = React.useState(false);
  const [active, setActive] = React.useState<string>("");
  const [sheetTop, setSheetTop] = React.useState(0);
  const triggerRef = React.useRef<HTMLButtonElement | null>(null);
  const reduceMotion = useReducedMotion();

  React.useLayoutEffect(() => {
    if (!open) return;
    const measure = () => {
      const nextTop = measureHeaderBottom(triggerRef.current);
      setSheetTop((prev) => (Math.abs(prev - nextTop) < 0.5 ? prev : nextTop));
    };
    const viewport = window.visualViewport;

    measure();
    window.addEventListener("resize", measure);
    viewport?.addEventListener("resize", measure);
    viewport?.addEventListener("scroll", measure);
    return () => {
      window.removeEventListener("resize", measure);
      viewport?.removeEventListener("resize", measure);
      viewport?.removeEventListener("scroll", measure);
    };
  }, [open]);

  React.useEffect(() => {
    if (!open) return;
    return lockViewportScroll();
  }, [open]);

  React.useEffect(() => {
    const mq = window.matchMedia(NAV_DESKTOP_MEDIA_QUERY);
    const handle = () => {
      if (mq.matches) {
        setOpen(false);
        setActive("");
      }
    };
    handle();
    mq.addEventListener?.("change", handle);
    return () => mq.removeEventListener?.("change", handle);
  }, []);

  const closeAll = React.useCallback(() => {
    setOpen(false);
    setActive("");
  }, []);

  const handlePrimaryActionClick = React.useCallback(
    (action: HeaderAction) => {
      closeAll();
      trackCtaClick({
        ctaId: action.ctaIdMobile,
        location: "nav_mobile:actions",
        destination: action.href,
        label: action.label,
      });
    },
    [closeAll],
  );

  const renderSectionContent = (key: HeaderDropdownKey) => {
    if (key === "solutions") {
      return (
        <div className="space-y-4">
          <p className="text-[12px] leading-5 text-[color:var(--color-menu-muted)]">
            {NAV.solutions.intro.description}
          </p>
          {NAV.solutions.categories.map((cat) => (
            <div key={cat.title}>
              <p className="mb-1 px-2 text-[10px] font-semibold tracking-[0.1em] text-[color:var(--color-menu-subtle)] uppercase">
                {cat.title}
              </p>
              <div className="space-y-0.5">
                {cat.links.map((l) => (
                  <MobileRowLink
                    key={l.href}
                    href={l.href}
                    label={l.label}
                    location="nav_mobile:menu"
                    ctaId={`nav_mobile_menu_${navId(l.href)}`}
                    onNavigate={closeAll}
                  />
                ))}
              </div>
            </div>
          ))}
          <Link
            href={NAV.solutions.intro.ctaHref}
            onClick={() => {
              closeAll();
              trackCtaClick({
                ctaId: `nav_mobile_intro_${navId(NAV.solutions.intro.ctaLabel)}`,
                location: "nav_mobile:intro",
                destination: NAV.solutions.intro.ctaHref,
                label: NAV.solutions.intro.ctaLabel,
              });
            }}
            className={cn(
              "inline-flex items-center gap-1 px-2 text-[13px] font-semibold text-[color:var(--color-menu-accent)]",
              "hover:text-[color:var(--color-menu-accent-hover)]",
              focusRingMenu,
            )}
          >
            {NAV.solutions.intro.ctaLabel}
            <ArrowUpRight className="h-3.5 w-3.5" aria-hidden />
          </Link>
        </div>
      );
    }

    const section = NAV[key];
    return (
      <div className="space-y-3">
        <p className="text-[12px] leading-5 text-[color:var(--color-menu-muted)]">
          {section.intro.description}
        </p>
        <div className="space-y-0.5">
          {section.links.map((l) => (
            <MobileRowLink
              key={l.href}
              href={l.href}
              label={l.label}
              location="nav_mobile:menu"
              ctaId={`nav_mobile_menu_${navId(l.href)}`}
              onNavigate={closeAll}
            />
          ))}
        </div>
        <Link
          href={section.intro.ctaHref}
          onClick={() => {
            closeAll();
            trackCtaClick({
              ctaId: `nav_mobile_intro_${navId(section.intro.ctaLabel)}`,
              location: "nav_mobile:intro",
              destination: section.intro.ctaHref,
              label: section.intro.ctaLabel,
            });
          }}
          className={cn(
            "inline-flex items-center gap-1 px-2 text-[13px] font-semibold text-[color:var(--color-menu-accent)]",
            "hover:text-[color:var(--color-menu-accent-hover)]",
            focusRingMenu,
          )}
        >
          {section.intro.ctaLabel}
          <ArrowUpRight className="h-3.5 w-3.5" aria-hidden />
        </Link>
      </div>
    );
  };

  return (
    <Dialog.Root
      modal={false}
      open={open}
      onOpenChange={(v) => {
        setOpen(v);
        if (!v) setActive("");
      }}
    >
      <Dialog.Trigger asChild>
        <button
          ref={triggerRef}
          type="button"
          className={cn(
            "inline-flex h-10 w-10 items-center justify-center rounded-md lg:hidden",
            "text-[color:var(--color-ssp-ink-800)]",
            "hover:bg-[color:var(--color-nav-hover)]",
            focusRingNav,
          )}
          aria-label={open ? "Close menu" : "Open menu"}
        >
          {open ? <X className="h-5 w-5" aria-hidden /> : <Menu className="h-5 w-5" aria-hidden />}
        </button>
      </Dialog.Trigger>

      <AnimatePresence>
        {open ? (
          <motion.div
            className="fixed inset-0 z-[60] lg:hidden"
            style={{ top: sheetTop }}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: reduceMotion ? 0 : 0.2, ease: [0.22, 1, 0.36, 1] }}
          >
            <div className="h-full bg-black/42" />
          </motion.div>
        ) : null}
      </AnimatePresence>

      <Dialog.Portal>
        <Dialog.Content forceMount asChild>
          <div
            className={cn(
              "fixed inset-x-0 z-[70] w-full outline-none",
              open ? "pointer-events-auto" : "pointer-events-none",
            )}
            style={{ top: sheetTop }}
            aria-hidden={!open}
          >
            <VisuallyHidden>
              <Dialog.Title>Navigation</Dialog.Title>
              <Dialog.Description>Mobile navigation menu</Dialog.Description>
            </VisuallyHidden>

            <AnimatePresence>
              {open ? (
                <motion.div
                  className={cn(
                    "overflow-hidden",
                    "bg-[color:var(--color-nav-bg)]",
                    "shadow-[0_18px_40px_rgba(2,6,23,0.14)]",
                  )}
                  initial={{ opacity: 0, y: reduceMotion ? 0 : -10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: reduceMotion ? 0 : -8 }}
                  transition={{
                    duration: reduceMotion ? 0 : ROLLOUT_DURATION_S,
                    ease: [0.16, 1, 0.3, 1],
                  }}
                  style={{ willChange: "transform, opacity" }}
                >
                  <motion.div
                    className="overflow-y-auto overscroll-contain"
                    style={{ maxHeight: `calc(100svh - ${sheetTop}px)` }}
                    initial={{ opacity: 0, y: reduceMotion ? 0 : -6 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: reduceMotion ? 0 : -6 }}
                    transition={{
                      duration: reduceMotion ? 0 : 0.16,
                      delay: reduceMotion ? 0 : 0.08,
                      ease: [0.22, 1, 0.36, 1],
                    }}
                  >
                    {/* ── Zone 1: Primary actions ── */}
                    <div className="px-5 pt-5 pb-4">
                      <div className="flex gap-2.5">
                        {HEADER_ACTIONS.filter((a) => !a.primary).map((action) => (
                          <Link
                            key={action.href}
                            href={action.href}
                            onClick={() => handlePrimaryActionClick(action)}
                            className={cn(
                              "inline-flex h-10 flex-1 items-center justify-center gap-1 rounded-lg border px-3 text-[13px] font-medium",
                              "border-[color:var(--color-nav-border)]",
                              "text-[color:var(--color-ssp-ink-800)] hover:bg-[color:var(--color-nav-hover)]",
                              focusRingNav,
                            )}
                          >
                            {action.label}
                            {action.externalCue ? (
                              <ArrowUpRight className="h-3 w-3 opacity-60" aria-hidden />
                            ) : null}
                          </Link>
                        ))}
                      </div>

                      {HEADER_ACTIONS.filter((a) => a.primary).map((action) => (
                        <Link
                          key={action.href}
                          href={action.href}
                          onClick={() => handlePrimaryActionClick(action)}
                          className={cn(
                            "mt-2.5 inline-flex h-11 w-full items-center justify-center gap-1 rounded-lg text-sm font-semibold",
                            "bg-[color:var(--color-brand-600)] text-white hover:bg-[color:var(--color-brand-700)]",
                            "shadow-[0_2px_8px_rgba(215,25,32,0.25)]",
                            focusRingNav,
                          )}
                        >
                          {action.label}
                          {action.externalCue ? (
                            <ArrowUpRight className="h-3.5 w-3.5" aria-hidden />
                          ) : null}
                        </Link>
                      ))}
                    </div>

                    {/* ── Zone 2: Navigation ── */}
                    <div className="border-t border-[color:var(--color-nav-border)] px-5">
                      <Accordion.Root
                        type="single"
                        collapsible
                        value={active}
                        onValueChange={setActive}
                      >
                        {HEADER_PRIMARY_DROPDOWNS.map((key, idx) => (
                          <Accordion.Item
                            key={key}
                            value={key}
                            className={cn(
                              idx < HEADER_PRIMARY_DROPDOWNS.length - 1 &&
                                "border-b border-[color:var(--color-nav-border)]",
                            )}
                          >
                            <Accordion.Header>
                              <SectionTrigger
                                label={NAV[key].label}
                                value={key}
                                openValue={active}
                              />
                            </Accordion.Header>
                            <Accordion.Content className="pb-3" asChild>
                              <motion.div
                                initial={{ opacity: 0, y: reduceMotion ? 0 : -4 }}
                                animate={{ opacity: 1, y: 0 }}
                                exit={{ opacity: 0, y: reduceMotion ? 0 : -4 }}
                                transition={{
                                  duration: reduceMotion ? 0 : 0.16,
                                  ease: [0.22, 1, 0.36, 1],
                                }}
                              >
                                <div className="rounded-lg bg-[color:var(--color-surface-2)] p-3">
                                  {renderSectionContent(key)}
                                </div>
                              </motion.div>
                            </Accordion.Content>
                          </Accordion.Item>
                        ))}
                      </Accordion.Root>

                      {/* Direct nav links */}
                      <div className="border-t border-[color:var(--color-nav-border)]">
                        {HEADER_DIRECT_LINKS.map((link, idx) => (
                          <Link
                            key={link.href}
                            href={link.href}
                            onClick={() => {
                              closeAll();
                              trackCtaClick({
                                ctaId: link.ctaIdMobile,
                                location: "nav_mobile:primary",
                                destination: link.href,
                                label: link.label,
                              });
                            }}
                            className={cn(
                              "flex w-full items-center justify-between py-3.5 text-[15px] font-semibold transition-colors",
                              "text-[color:var(--color-menu-title)]",
                              "hover:text-[color:var(--color-ssp-ink-800)]",
                              idx < HEADER_DIRECT_LINKS.length - 1 &&
                                "border-b border-[color:var(--color-nav-border)]",
                              focusRingMenu,
                            )}
                          >
                            <span>{link.label}</span>
                            <ChevronRight
                              className="h-4 w-4 text-[color:var(--color-menu-subtle)]"
                              aria-hidden
                            />
                          </Link>
                        ))}
                      </div>
                    </div>

                    {/* Bottom breathing space */}
                    <div className="h-5" />
                  </motion.div>
                </motion.div>
              ) : null}
            </AnimatePresence>
          </div>
        </Dialog.Content>
      </Dialog.Portal>
    </Dialog.Root>
  );
}
