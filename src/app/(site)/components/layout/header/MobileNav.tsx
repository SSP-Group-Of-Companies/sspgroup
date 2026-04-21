"use client";

import React from "react";
import * as Dialog from "@radix-ui/react-dialog";
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
import { X, Menu, ChevronRight, ArrowUpRight, ArrowLeft } from "lucide-react";
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
  tone = "default",
}: {
  href: string;
  label: string;
  location: string;
  ctaId: string;
  externalCue?: boolean;
  onNavigate: () => void;
  /** Family hub row: accent ink (matches desktop mega-menu column headers). */
  /** Solution list rows under a family: footer-weight typography (not menu-title heavy). */
  tone?: "default" | "familySection" | "solutionLeaf";
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
        tone === "familySection"
          ? "text-[11px] font-semibold tracking-[0.1em] text-[color:var(--color-menu-accent)] uppercase"
          : tone === "solutionLeaf"
            ? "text-[13px] font-normal leading-6 text-[color:var(--color-footer-link)] hover:text-[color:var(--color-footer-link-hover)]"
            : "text-[14px] font-medium text-[color:var(--color-menu-title)]",
        "[-webkit-tap-highlight-color:transparent] hover:bg-[color:var(--color-menu-hover)]",
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

function MobileMenuRowButton({ label, onClick }: { label: string; onClick: () => void }) {
  return (
    <button
      type="button"
      onClick={onClick}
      className={cn(
        "flex w-full items-center justify-between rounded-md py-3 text-left text-[17px] font-semibold transition-colors",
        "text-[color:var(--color-menu-title)]",
        "[-webkit-tap-highlight-color:transparent]",
        "hover:text-[color:var(--color-ssp-ink-800)]",
        focusRingMenu,
      )}
    >
      <span>{label}</span>
      <ChevronRight className="h-4 w-4 text-[color:var(--color-menu-subtle)]" aria-hidden />
    </button>
  );
}

function MobileMenuRowLink({
  href,
  label,
  ctaId,
  onNavigate,
}: {
  href: string;
  label: string;
  ctaId: string;
  onNavigate: () => void;
}) {
  return (
    <Link
      href={href}
      onClick={() => {
        onNavigate();
        trackCtaClick({
          ctaId,
          location: "nav_mobile:primary",
          destination: href,
          label,
        });
      }}
      className={cn(
        "flex w-full items-center justify-between rounded-md py-3 text-[17px] font-semibold transition-colors",
        "text-[color:var(--color-menu-title)]",
        "[-webkit-tap-highlight-color:transparent]",
        "hover:text-[color:var(--color-ssp-ink-800)]",
        focusRingMenu,
      )}
    >
      <span>{label}</span>
      <ChevronRight className="h-4 w-4 text-[color:var(--color-menu-subtle)]" aria-hidden />
    </Link>
  );
}

function MobileActionTextLink({
  action,
  onNavigate,
}: {
  action: HeaderAction;
  onNavigate: () => void;
}) {
  return (
    <Link
      href={action.href}
      onClick={() => {
        onNavigate();
        trackCtaClick({
          ctaId: action.ctaIdMobile,
          location: "nav_mobile:actions",
          destination: action.href,
          label: action.label,
        });
      }}
      className={cn(
        "flex w-fit items-center gap-2 rounded-md py-1.5 text-[15px] font-medium transition-colors",
        "[-webkit-tap-highlight-color:transparent]",
        action.primary
          ? "text-[color:var(--color-brand-600)] hover:text-[color:var(--color-brand-700)]"
          : "text-[color:var(--color-menu-title)] hover:text-[color:var(--color-menu-accent)]",
        focusRingMenu,
      )}
    >
      <span>{action.label}</span>
      <ArrowUpRight
        className={cn(
          "h-3.5 w-3.5",
          action.primary
            ? "text-[color:var(--color-brand-600)]"
            : "text-[color:var(--color-menu-subtle)]",
        )}
        aria-hidden
      />
    </Link>
  );
}

export function MobileNav() {
  const [open, setOpen] = React.useState(false);
  const [activePanel, setActivePanel] = React.useState<HeaderDropdownKey | null>(null);
  const [direction, setDirection] = React.useState<1 | -1>(1);
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
        setActivePanel(null);
      }
    };
    handle();
    mq.addEventListener?.("change", handle);
    return () => mq.removeEventListener?.("change", handle);
  }, []);

  const closeAll = React.useCallback(() => {
    setOpen(false);
    setActivePanel(null);
    setDirection(-1);
  }, []);

  const openPanel = React.useCallback((key: HeaderDropdownKey) => {
    setDirection(1);
    setActivePanel(key);
    triggerRef.current?.blur();
  }, []);

  const returnToMainMenu = React.useCallback(() => {
    setDirection(-1);
    setActivePanel(null);
  }, []);

  const renderSectionContent = (key: HeaderDropdownKey) => {
    if (key === "solutions") {
      return (
        <div className="space-y-6">
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
              "inline-flex items-center gap-2 rounded-md text-[15px] font-semibold text-[color:var(--color-menu-accent)]",
              "[-webkit-tap-highlight-color:transparent] hover:text-[color:var(--color-menu-accent-hover)]",
              focusRingMenu,
            )}
          >
            {NAV.solutions.intro.ctaLabel}
            <ArrowUpRight className="h-3.5 w-3.5" aria-hidden />
          </Link>
          {NAV.solutions.categories.map((cat) => (
            <div key={cat.title}>
              <div className="mb-1.5">
                <MobileRowLink
                  href={cat.href}
                  label={cat.title}
                  location="nav_mobile:menu"
                  ctaId={`nav_mobile_menu_${navId(cat.href)}`}
                  onNavigate={closeAll}
                  tone="familySection"
                />
              </div>
              <div className="space-y-1">
                {cat.links.map((l) => (
                  <MobileRowLink
                    key={l.href}
                    href={l.href}
                    label={l.label}
                    location="nav_mobile:menu"
                    ctaId={`nav_mobile_menu_${navId(l.href)}`}
                    onNavigate={closeAll}
                    tone="solutionLeaf"
                  />
                ))}
              </div>
            </div>
          ))}
        </div>
      );
    }

    const section = NAV[key];
    return (
      <div className="space-y-6">
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
            "inline-flex items-center gap-2 rounded-md text-[15px] font-semibold text-[color:var(--color-menu-accent)]",
            "[-webkit-tap-highlight-color:transparent] hover:text-[color:var(--color-menu-accent-hover)]",
            focusRingMenu,
          )}
        >
          {section.intro.ctaLabel}
          <ArrowUpRight className="h-3.5 w-3.5" aria-hidden />
        </Link>
        <div className="space-y-1">
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
      </div>
    );
  };

  return (
    <Dialog.Root
      modal
      open={open}
      onOpenChange={(v) => {
        setOpen(v);
        if (!v) {
          setActivePanel(null);
          setDirection(-1);
        }
      }}
    >
      <Dialog.Trigger asChild>
        <button
          ref={triggerRef}
          type="button"
          className={cn(
            "inline-flex h-10 w-10 items-center justify-center rounded-md [-webkit-tap-highlight-color:transparent] lg:hidden",
            "text-[color:var(--color-ssp-ink-800)]",
            "hover:bg-[color:var(--color-nav-hover)]",
            focusRingNav,
          )}
          onClick={() => triggerRef.current?.blur()}
          aria-label={open ? "Close menu" : "Open menu"}
        >
          {open ? <X className="h-5 w-5" aria-hidden /> : <Menu className="h-5 w-5" aria-hidden />}
        </button>
      </Dialog.Trigger>

      <Dialog.Portal>
        <Dialog.Overlay asChild>
          <div
            className={cn(
              "fixed inset-x-0 bottom-0 z-[69] bg-black/42 lg:hidden",
              open ? "pointer-events-auto" : "pointer-events-none",
            )}
            style={{ top: Math.max(0, sheetTop - 1) }}
            aria-hidden
          />
        </Dialog.Overlay>
        <Dialog.Content
          forceMount
          onOpenAutoFocus={(event) => event.preventDefault()}
          onCloseAutoFocus={(event) => event.preventDefault()}
          asChild
        >
          <div
            className={cn(
              "fixed inset-x-0 bottom-0 z-[70] w-full outline-none",
              open ? "pointer-events-auto" : "pointer-events-none",
            )}
            style={{ top: Math.max(0, sheetTop - 1) }}
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
                    "flex h-full flex-col overflow-hidden",
                    "bg-[color:var(--color-nav-bg)]",
                    "shadow-[0_18px_40px_rgba(2,6,23,0.12)]",
                  )}
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  transition={{
                    duration: reduceMotion ? 0 : ROLLOUT_DURATION_S,
                    ease: [0.16, 1, 0.3, 1],
                  }}
                  style={{ willChange: "opacity" }}
                >
                  <div className="relative flex-1 overflow-hidden">
                    <AnimatePresence initial={false} custom={direction} mode="wait">
                      {activePanel ? (
                        <motion.div
                          key={activePanel}
                          custom={direction}
                          className="absolute inset-0 overflow-y-auto overscroll-contain [overscroll-behavior-y:contain] px-5 pt-5 pb-6"
                          initial={{ opacity: 0, x: reduceMotion ? 0 : 32 }}
                          animate={{ opacity: 1, x: 0 }}
                          exit={{ opacity: 0, x: reduceMotion ? 0 : -24 }}
                          transition={{
                            duration: reduceMotion ? 0 : 0.24,
                            ease: [0.22, 1, 0.36, 1],
                          }}
                        >
                          <button
                            type="button"
                            onClick={returnToMainMenu}
                            className={cn(
                              "inline-flex items-center gap-2 rounded-md pb-5 text-[16px] font-medium text-[color:var(--color-menu-title)]",
                              "[-webkit-tap-highlight-color:transparent]",
                              focusRingMenu,
                            )}
                          >
                            <ArrowLeft className="h-4 w-4" aria-hidden />
                            <span>Main Menu</span>
                          </button>

                          <div className="pb-8">{renderSectionContent(activePanel)}</div>
                        </motion.div>
                      ) : (
                        <motion.div
                          key="main-menu"
                          custom={direction}
                          className="absolute inset-0 overflow-y-auto overscroll-contain [overscroll-behavior-y:contain] px-5 pt-5 pb-6"
                          initial={{ opacity: 0, x: reduceMotion ? 0 : -24 }}
                          animate={{ opacity: 1, x: 0 }}
                          exit={{ opacity: 0, x: reduceMotion ? 0 : 24 }}
                          transition={{
                            duration: reduceMotion ? 0 : 0.24,
                            ease: [0.22, 1, 0.36, 1],
                          }}
                        >
                          <div className="space-y-0.5">
                            {HEADER_PRIMARY_DROPDOWNS.map((key) => (
                              <MobileMenuRowButton
                                key={key}
                                label={NAV[key].label}
                                onClick={() => openPanel(key)}
                              />
                            ))}
                            {HEADER_DIRECT_LINKS.map((link) => (
                              <MobileMenuRowLink
                                key={link.href}
                                href={link.href}
                                label={link.label}
                                ctaId={link.ctaIdMobile}
                                onNavigate={closeAll}
                              />
                            ))}
                          </div>

                          <div className="mt-8 border-t border-[color:var(--color-nav-border)] pt-6">
                            <div className="space-y-2">
                              {HEADER_ACTIONS.map((action) => (
                                <MobileActionTextLink
                                  key={action.href}
                                  action={action}
                                  onNavigate={closeAll}
                                />
                              ))}
                            </div>
                          </div>
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </div>
                </motion.div>
              ) : null}
            </AnimatePresence>
          </div>
        </Dialog.Content>
      </Dialog.Portal>
    </Dialog.Root>
  );
}
