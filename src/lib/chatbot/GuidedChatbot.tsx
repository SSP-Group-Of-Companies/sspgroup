// src/lib/chatbot/GuidedChatbot.tsx
"use client";

import React from "react";
import Image from "next/image";
import Chatbot from "react-chatbot-kit";
import "react-chatbot-kit/build/main.css";
import { Sparkles, X } from "lucide-react";

import botConfig from "@/lib/chatbot/botConfig";
import MessageParser from "@/lib/chatbot/MessageParser";
import { makeActionProvider } from "@/lib/chatbot/ActionProvider";
import { useChatActions } from "@/lib/chatbot/useChatActions";
import { lockViewportScroll } from "@/app/(site)/components/layout/header/overlay";

const TOOLTIP_KEY = "ssp_chatbot_tooltip_dismissed";
/** When set, the launcher ping/dot is hidden — user has opened the chat at least once. */
const LAUNCHER_NOTIFICATION_KEY = "ssp_chatbot_launcher_notification_dismissed";

/** Matches Tailwind `md:` — layout/tooltip/dot differ on small screens. */
const MOBILE_MEDIA_QUERY = "(max-width: 767px)";

const PANEL_ANIMATION_MS = 480;
const LAUNCHER_ANIMATION_MS = 100;
const LAUNCHER_SHOW_DELAY_MS = 0;

export default function GuidedChatbot() {
  const pageActions = useChatActions();

  const [open, setOpen] = React.useState(false);
  const [closing, setClosing] = React.useState(false);
  const [opening, setOpening] = React.useState(false);
  /** Once true, the chat widget stays mounted (off-screen when closed) so messages survive close/reopen until a full page load. */
  const [chatSessionActive, setChatSessionActive] = React.useState(false);
  const [showTooltip, setShowTooltip] = React.useState(false);
  const [showLauncher, setShowLauncher] = React.useState(true);
  const [launcherVisible, setLauncherVisible] = React.useState(true);
  /** False until client reads storage; then true only if the user has never opened the chat. */
  const [showLauncherNotification, setShowLauncherNotification] = React.useState(false);
  const [isMobile, setIsMobile] = React.useState(false);
  /** iOS: align overlay with visual viewport (keyboard / URL bar) — same idea as MobileNav visualViewport listeners. */
  const [mobileViewportBox, setMobileViewportBox] = React.useState<{
    top: number;
    left: number;
    width: number;
    height: number;
  } | null>(null);

  const panelRef = React.useRef<HTMLDivElement | null>(null);
  const bodyRef = React.useRef<HTMLDivElement | null>(null);
  const closeTimerRef = React.useRef<number | null>(null);
  const openTimerRef = React.useRef<number | null>(null);
  const launcherShowTimerRef = React.useRef<number | null>(null);
  const launcherEnterTimerRef = React.useRef<number | null>(null);

  React.useEffect(() => {
    const mq = window.matchMedia(MOBILE_MEDIA_QUERY);
    function syncMobile() {
      setIsMobile(mq.matches);
    }
    syncMobile();
    mq.addEventListener("change", syncMobile);
    return () => mq.removeEventListener("change", syncMobile);
  }, []);

  React.useEffect(() => {
    if (isMobile) {
      setShowTooltip(false);
      return;
    }

    const dismissed = typeof window !== "undefined" && sessionStorage.getItem(TOOLTIP_KEY) === "1";
    if (dismissed) return;

    let dismissTimer: number | null = null;
    const showTimer = window.setTimeout(() => {
      setShowTooltip(true);
      dismissTimer = window.setTimeout(() => setShowTooltip(false), 7000);
    }, 1800);

    return () => {
      window.clearTimeout(showTimer);
      if (dismissTimer) window.clearTimeout(dismissTimer);
    };
  }, [isMobile]);

  React.useEffect(() => {
    try {
      setShowLauncherNotification(localStorage.getItem(LAUNCHER_NOTIFICATION_KEY) !== "1");
    } catch {
      setShowLauncherNotification(true);
    }
  }, []);

  React.useEffect(() => {
    function onOpenLiveChat() {
      openChat();
    }

    window.addEventListener("ssp:open-live-chat", onOpenLiveChat);
    return () => window.removeEventListener("ssp:open-live-chat", onOpenLiveChat);
  }, []);

  React.useEffect(() => {
    function onKeyDown(e: KeyboardEvent) {
      if (e.key === "Escape") {
        window.setTimeout(() => closeChat(), 120);
      }
    }

    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, [open, closing]);

  React.useEffect(() => {
    function onMouseDown(e: MouseEvent) {
      if (!open || closing) return;
      const el = panelRef.current;
      if (!el) return;
      if (e.target instanceof Node && !el.contains(e.target)) {
        window.setTimeout(() => closeChat(), 120);
      }
    }

    window.addEventListener("mousedown", onMouseDown);
    return () => window.removeEventListener("mousedown", onMouseDown);
  }, [open, closing]);

  const showPanel = open || closing || opening;
  const fullScreenMobile = isMobile && showPanel;

  React.useEffect(() => {
    if (!isMobile || !showPanel) return;
    return lockViewportScroll();
  }, [isMobile, showPanel]);

  React.useLayoutEffect(() => {
    if (!isMobile || !showPanel) {
      setMobileViewportBox(null);
      return;
    }
    const vv = window.visualViewport;
    const sync = () => {
      if (!vv) {
        setMobileViewportBox(null);
        return;
      }
      setMobileViewportBox({
        top: vv.offsetTop,
        left: vv.offsetLeft,
        width: vv.width,
        height: vv.height,
      });
    };
    sync();
    vv?.addEventListener("resize", sync);
    vv?.addEventListener("scroll", sync);
    window.addEventListener("resize", sync);
    return () => {
      vv?.removeEventListener("resize", sync);
      vv?.removeEventListener("scroll", sync);
      window.removeEventListener("resize", sync);
    };
  }, [isMobile, showPanel]);

  React.useEffect(() => {
    return () => {
      if (closeTimerRef.current) window.clearTimeout(closeTimerRef.current);
      if (openTimerRef.current) window.clearTimeout(openTimerRef.current);
      if (launcherShowTimerRef.current) window.clearTimeout(launcherShowTimerRef.current);
      if (launcherEnterTimerRef.current) window.clearTimeout(launcherEnterTimerRef.current);
    };
  }, []);

  function hideLauncherImmediately() {
    if (launcherShowTimerRef.current) {
      window.clearTimeout(launcherShowTimerRef.current);
      launcherShowTimerRef.current = null;
    }
    if (launcherEnterTimerRef.current) {
      window.clearTimeout(launcherEnterTimerRef.current);
      launcherEnterTimerRef.current = null;
    }

    setLauncherVisible(false);
    setShowLauncher(false);
  }

  function scheduleLauncherReturn() {
    if (launcherShowTimerRef.current) {
      window.clearTimeout(launcherShowTimerRef.current);
    }
    if (launcherEnterTimerRef.current) {
      window.clearTimeout(launcherEnterTimerRef.current);
    }

    launcherShowTimerRef.current = window.setTimeout(() => {
      setShowLauncher(true);

      launcherEnterTimerRef.current = window.setTimeout(() => {
        setLauncherVisible(true);
        launcherEnterTimerRef.current = null;
      }, 16);

      launcherShowTimerRef.current = null;
    }, LAUNCHER_SHOW_DELAY_MS);
  }

  function openChat() {
    if (closeTimerRef.current) {
      window.clearTimeout(closeTimerRef.current);
      closeTimerRef.current = null;
    }
    if (openTimerRef.current) {
      window.clearTimeout(openTimerRef.current);
      openTimerRef.current = null;
    }

    setChatSessionActive(true);
    hideLauncherImmediately();
    setClosing(false);
    if (isMobile && !chatSessionActive && !open) {
      setOpen(false);
      setOpening(true);
      openTimerRef.current = window.setTimeout(() => {
        setOpen(true);
        setOpening(false);
        openTimerRef.current = null;
      }, 16);
    } else {
      setOpening(false);
      setOpen(true);
    }
    setShowTooltip(false);
    setShowLauncherNotification(false);

    try {
      sessionStorage.setItem(TOOLTIP_KEY, "1");
      localStorage.setItem(LAUNCHER_NOTIFICATION_KEY, "1");
    } catch {
      // Ignore
    }
  }

  function closeChat() {
    if ((!open && !opening) || closing) return;

    if (openTimerRef.current) {
      window.clearTimeout(openTimerRef.current);
      openTimerRef.current = null;
    }
    setOpening(false);

    setClosing(true);

    closeTimerRef.current = window.setTimeout(() => {
      setOpen(false);
      setClosing(false);
      closeTimerRef.current = null;
      scheduleLauncherReturn();
    }, PANEL_ANIMATION_MS);
  }

  function dismissTooltip() {
    setShowTooltip(false);

    try {
      sessionStorage.setItem(TOOLTIP_KEY, "1");
    } catch {
      // Ignore
    }
  }

  const pageActionsWithAutoClose = React.useMemo(() => {
    return {
      ...pageActions,
      goTo: (href: string) => {
        pageActions.goTo(href);
        window.setTimeout(() => closeChat(), 120);
      },
    };
  }, [pageActions]);

  const ActionProvider = React.useMemo(
    () => makeActionProvider(pageActionsWithAutoClose),
    [pageActionsWithAutoClose],
  );

  const panelEntering = open && !closing;

  return (
    <div
      className={[
        fullScreenMobile
          ? [
              "fixed z-[10000] flex min-h-0 min-w-0 flex-col overflow-hidden",
              mobileViewportBox ? "" : "inset-0",
            ].join(" ")
          : "fixed right-4 bottom-4 z-[10000] md:right-5 md:bottom-5",
      ].join(" ")}
      style={
        fullScreenMobile && mobileViewportBox
          ? {
              top: mobileViewportBox.top,
              left: mobileViewportBox.left,
              width: mobileViewportBox.width,
              height: mobileViewportBox.height,
            }
          : undefined
      }
    >
      {chatSessionActive && (
        <div
          ref={panelRef}
          className={
            showPanel
              ? fullScreenMobile
                ? [
                    "border-ssp-ink-900/10 absolute inset-0 flex h-full min-h-0 w-full min-w-0 flex-col overflow-hidden rounded-none border bg-white",
                    "shadow-none",
                    "origin-bottom transition-all",
                    panelEntering
                      ? "pointer-events-auto visible translate-y-0 opacity-100"
                      : "pointer-events-none visible translate-y-2 opacity-0",
                  ].join(" ")
                : [
                    "border-ssp-ink-900/10 absolute right-0 bottom-0 w-[360px] max-w-[92vw] overflow-hidden rounded-2xl border bg-white",
                    "shadow-[0_25px_50px_-12px_rgba(11,62,94,0.28),0_0_0_1px_rgba(16,167,216,0.06)_inset]",
                    "origin-bottom-right transition-all",
                    panelEntering
                      ? "pointer-events-auto visible translate-y-0 scale-100 opacity-100"
                      : "pointer-events-none visible translate-y-3 scale-[0.975] opacity-0",
                  ].join(" ")
              : [
                  "pointer-events-none invisible fixed top-0 -left-[10000px] z-[-1] w-[360px] max-w-[92vw] overflow-hidden opacity-0",
                ].join(" ")
          }
          style={
            showPanel
              ? {
                  transitionDuration: `${PANEL_ANIMATION_MS}ms`,
                  transitionTimingFunction: "cubic-bezier(0.22, 1, 0.36, 1)",
                  willChange: "transform, opacity",
                }
              : undefined
          }
          role="dialog"
          aria-label="Chatbot"
          aria-hidden={!showPanel || !panelEntering}
        >
          {showPanel && (
            <div
              className={[
                "border-ssp-ink-900/10 via-ocean-50/40 flex shrink-0 items-center justify-between border-b bg-gradient-to-r from-white to-white px-4 py-3",
                fullScreenMobile ? "pt-[max(0.75rem,env(safe-area-inset-top))]" : "",
              ].join(" ")}
            >
              <div className="flex items-center gap-2.5">
                <span
                  className="bg-ocean-50/80 ring-ssp-cyan-500/20 relative inline-flex h-8 w-8 shrink-0 items-center justify-center rounded-full p-0.5 ring-1"
                  aria-hidden="true"
                >
                  <Image
                    src="/_optimized/brand/SSPlogo.png"
                    alt="SSP Group"
                    fill
                    sizes="32px"
                    className="object-contain"
                  />
                </span>
                <div className="text-ssp-ink-900 text-sm font-semibold tracking-tight">
                  SSP Assistant
                </div>
              </div>

              <button
                type="button"
                onClick={closeChat}
                className="text-ssp-ink-800/70 hover:bg-ocean-50 hover:text-ssp-ink-900 rounded-xl p-2 transition-colors hover:cursor-pointer"
                aria-label="Close chat"
              >
                <X size={18} />
              </button>
            </div>
          )}

          <div
            ref={bodyRef}
            className={[
              "ssp-chatbot",
              fullScreenMobile ? "ssp-chatbot--mobile-full min-h-0 flex-1" : "",
            ].join(" ")}
          >
            <Chatbot
              config={botConfig as never}
              messageParser={MessageParser as never}
              actionProvider={ActionProvider as never}
              placeholderText="Ask about quotes, tracking, solutions, FAQs, lanes, or support…"
              validator={(message: string) => message.trim().length > 0}
            />
          </div>
        </div>
      )}

      {showLauncher && (
        <div
          className={[
            "relative flex items-end justify-end transition-all",
            launcherVisible
              ? "translate-y-0 scale-100 opacity-100"
              : "translate-y-2 scale-95 opacity-0",
          ].join(" ")}
          style={{
            transitionDuration: `${LAUNCHER_ANIMATION_MS}ms`,
            transitionTimingFunction: "cubic-bezier(0.22, 1, 0.36, 1)",
            willChange: "transform, opacity",
            pointerEvents: launcherVisible ? "auto" : "none",
          }}
          aria-hidden={!launcherVisible}
        >
          {showTooltip && !isMobile && (
            <div className="absolute right-0 bottom-[53px] w-[260px] md:bottom-[61px]">
              <div
                className="border-ssp-ink-900/10 relative overflow-visible rounded-2xl border px-4 py-3 shadow-[0_20px_40px_-12px_rgba(11,62,94,0.25)] backdrop-blur-md"
                style={{
                  background:
                    "linear-gradient(180deg, color-mix(in srgb, var(--color-surface-1) 96%, #fff) 0%, color-mix(in srgb, var(--color-ocean-50) 24%, var(--color-surface-1)) 100%)",
                }}
              >
                <button
                  type="button"
                  onClick={dismissTooltip}
                  className="text-ssp-ink-800/55 hover:bg-ocean-50 hover:text-ssp-ink-900 absolute top-2 right-2 rounded-lg p-1 transition-colors"
                  aria-label="Dismiss tip"
                >
                  <X size={14} />
                </button>

                <div className="flex items-start gap-3">
                  <span className="from-ssp-cyan-600 to-utility-bg text-utility-text mt-0.5 inline-flex h-8 w-8 items-center justify-center rounded-full bg-gradient-to-br shadow-md ring-1 ring-white/20">
                    <Sparkles size={16} />
                  </span>

                  <div className="text-sm">
                    <div className="text-ssp-ink-900 font-semibold">Hi 👋</div>
                    <div className="mt-0.5 text-[color:var(--color-muted-light)]">
                      Need help with a quote, tracking, FAQs, or finding the right page?
                    </div>

                    <div className="mt-3 flex gap-2">
                      <button
                        type="button"
                        onClick={openChat}
                        className="from-ssp-cyan-600 to-utility-bg text-utility-text rounded-full bg-gradient-to-r px-3 py-1.5 text-xs font-semibold shadow-md transition hover:brightness-105"
                      >
                        Open chat
                      </button>
                      <button
                        type="button"
                        onClick={dismissTooltip}
                        className="border-ssp-ink-900/12 text-ssp-ink-900 hover:bg-ocean-50 rounded-full border bg-white px-3 py-1.5 text-xs font-semibold transition"
                      >
                        Not now
                      </button>
                    </div>
                  </div>
                </div>

                <div
                  className="pointer-events-none absolute top-full right-[calc(1.5rem-7px)] z-[1] mt-[-3px] h-[8px] w-[14px] md:right-[calc(1.75rem-7px)]"
                  aria-hidden
                >
                  <div
                    className="absolute inset-0 [clip-path:polygon(50%_100%,0_0,100%_0)]"
                    style={{
                      background:
                        "linear-gradient(180deg, color-mix(in srgb, var(--color-surface-1) 58%, transparent) 0%, color-mix(in srgb, var(--color-ocean-50) 18%, color-mix(in srgb, var(--color-surface-1) 82%, transparent)) 100%)",
                      boxShadow:
                        "0 0 0 1px color-mix(in srgb, var(--color-ssp-ink-900) 6%, transparent)",
                    }}
                  />
                </div>
              </div>
            </div>
          )}

          <button
            type="button"
            onClick={openChat}
            aria-label="Open chat"
            className={[
              "group relative inline-flex h-12 w-12 cursor-pointer items-center justify-center rounded-full md:h-14 md:w-14",
              "shadow-lg transition hover:-translate-y-0.5 hover:shadow-xl active:translate-y-0",
              "focus:outline-none focus-visible:ring-2 focus-visible:ring-[var(--color-ssp-cyan-500)] focus-visible:ring-offset-2 focus-visible:ring-offset-[var(--color-surface-0)]",
            ].join(" ")}
            style={{
              background:
                "linear-gradient(155deg, var(--color-ssp-ink-900) 0%, var(--color-ssp-ink-800) 52%, var(--color-utility-bg) 125%)",
              border: "1px solid var(--color-glass-border)",
              boxShadow:
                "0 14px 34px rgba(11, 62, 94, 0.42), 0 0 0 1px rgba(255, 255, 255, 0.06) inset, 0 1px 0 rgba(255, 255, 255, 0.12) inset",
            }}
          >
            <span
              className="pointer-events-none absolute -inset-px rounded-full opacity-80 transition group-hover:opacity-100"
              style={{
                background:
                  "conic-gradient(from 210deg, color-mix(in srgb, var(--color-ssp-cyan-500) 55%, transparent), color-mix(in srgb, var(--color-utility-bg) 40%, transparent) 38%, transparent 58%, color-mix(in srgb, var(--color-ssp-cyan-500) 45%, transparent))",
              }}
            />
            <span
              className="pointer-events-none absolute inset-0 rounded-full"
              style={{
                background:
                  "radial-gradient(circle at 30% 22%, rgba(255, 255, 255, 0.14), transparent 52%)",
              }}
            />

            {showLauncherNotification && !isMobile && (
              <span
                className="pointer-events-none absolute top-1 -right-0.5 z-10 flex h-3 w-3 items-center justify-center"
                aria-hidden="true"
              >
                <span
                  className="absolute inline-flex h-full w-full animate-ping rounded-full bg-[var(--color-ssp-cyan-500)] opacity-25 motion-reduce:animate-none motion-reduce:opacity-0"
                  aria-hidden="true"
                />
                <span className="relative h-2.5 w-2.5 shrink-0 rounded-full bg-[var(--color-ssp-cyan-500)] ring-1 ring-[var(--color-ssp-ink-900)]" />
              </span>
            )}

            <span
              className="relative inline-flex h-9 w-9 items-center justify-center rounded-full transition group-hover:scale-[1.02] md:h-10 md:w-10"
              style={{
                background: "var(--color-glass-bg)",
                border: "1px solid var(--color-glass-border)",
                backdropFilter: "blur(8px)",
              }}
            >
              <Sparkles
                aria-hidden
                style={{ color: "var(--color-utility-text)" }}
                className="h-[18px] w-[18px] transition group-hover:scale-105 md:h-5 md:w-5"
              />
            </span>
          </button>
        </div>
      )}
    </div>
  );
}
