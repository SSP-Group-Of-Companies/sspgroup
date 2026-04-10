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

const TOOLTIP_KEY = "ssp_chatbot_tooltip_dismissed";

const PANEL_ANIMATION_MS = 480;
const LAUNCHER_ANIMATION_MS = 100;
const LAUNCHER_SHOW_DELAY_MS = 0;

export default function GuidedChatbot() {
  const pageActions = useChatActions();

  const [open, setOpen] = React.useState(false);
  const [closing, setClosing] = React.useState(false);
  /** Once true, the chat widget stays mounted (off-screen when closed) so messages survive close/reopen until a full page load. */
  const [chatSessionActive, setChatSessionActive] = React.useState(false);
  const [showTooltip, setShowTooltip] = React.useState(false);
  const [showLauncher, setShowLauncher] = React.useState(true);
  const [launcherVisible, setLauncherVisible] = React.useState(true);

  const panelRef = React.useRef<HTMLDivElement | null>(null);
  const bodyRef = React.useRef<HTMLDivElement | null>(null);
  const closeTimerRef = React.useRef<number | null>(null);
  const launcherShowTimerRef = React.useRef<number | null>(null);
  const launcherEnterTimerRef = React.useRef<number | null>(null);

  React.useEffect(() => {
    const dismissed = typeof window !== "undefined" && sessionStorage.getItem(TOOLTIP_KEY) === "1";
    if (dismissed) return;

    const t = window.setTimeout(() => {
      setShowTooltip(true);
      const t2 = window.setTimeout(() => setShowTooltip(false), 7000);
      return () => window.clearTimeout(t2);
    }, 1800);

    return () => window.clearTimeout(t);
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

  React.useEffect(() => {
    return () => {
      if (closeTimerRef.current) window.clearTimeout(closeTimerRef.current);
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

    setChatSessionActive(true);
    hideLauncherImmediately();
    setClosing(false);
    setOpen(true);
    setShowTooltip(false);

    try {
      sessionStorage.setItem(TOOLTIP_KEY, "1");
    } catch {
      // Ignore
    }
  }

  function closeChat() {
    if (!open || closing) return;

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

  const showPanel = open || closing;
  const panelEntering = open && !closing;

  return (
    <div className="fixed right-5 bottom-5 z-50">
      {chatSessionActive && (
        <div
          ref={panelRef}
          className={
            showPanel
              ? [
                  "absolute right-0 bottom-0 w-[360px] max-w-[92vw] overflow-hidden rounded-2xl border border-gray-200 bg-white shadow-2xl",
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
            <div className="flex items-center justify-between border-b border-gray-200 px-4 py-3">
              <div className="flex items-center gap-2">
                <span
                  className="relative inline-flex h-8 w-8 shrink-0 items-center justify-center"
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
                <div className="text-sm font-semibold text-gray-900">SSP Assistant</div>
              </div>

              <button
                type="button"
                onClick={closeChat}
                className="rounded-md p-2 text-gray-600 hover:cursor-pointer hover:bg-gray-100"
                aria-label="Close chat"
              >
                <X size={18} />
              </button>
            </div>
          )}

          <div ref={bodyRef} className="ssp-chatbot">
            <Chatbot
              config={botConfig as never}
              messageParser={MessageParser as never}
              actionProvider={ActionProvider as never}
              placeholderText="Ask about quotes, tracking, solutions, FAQs, lanes, or support…"
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
          {showTooltip && (
            <div className="absolute right-0 bottom-16 w-[260px]">
              <div className="relative rounded-2xl border border-gray-200 bg-white px-4 py-3 shadow-xl">
                <button
                  type="button"
                  onClick={dismissTooltip}
                  className="absolute top-2 right-2 rounded-md p-1 text-gray-500 hover:bg-gray-100"
                  aria-label="Dismiss tip"
                >
                  <X size={14} />
                </button>

                <div className="flex items-start gap-3">
                  <span className="mt-0.5 inline-flex h-8 w-8 items-center justify-center rounded-full bg-gray-900 text-white">
                    <Sparkles size={16} />
                  </span>

                  <div className="text-sm">
                    <div className="font-semibold text-gray-900">Hi 👋</div>
                    <div className="mt-0.5 text-gray-600">
                      Need help with a quote, tracking, FAQs, or finding the right page?
                    </div>

                    <div className="mt-3 flex gap-2">
                      <button
                        type="button"
                        onClick={openChat}
                        className="rounded-full bg-gray-900 px-3 py-1.5 text-xs font-semibold text-white hover:bg-gray-800"
                      >
                        Open chat
                      </button>
                      <button
                        type="button"
                        onClick={dismissTooltip}
                        className="rounded-full border border-gray-300 bg-white px-3 py-1.5 text-xs font-semibold text-gray-700 hover:bg-gray-50"
                      >
                        Not now
                      </button>
                    </div>
                  </div>
                </div>

                <div className="absolute right-6 -bottom-2 h-4 w-4 rotate-45 border-r border-b border-gray-200 bg-white" />
              </div>
            </div>
          )}

          <button
            type="button"
            onClick={openChat}
            aria-label="Open chat"
            className={[
              "group relative inline-flex h-14 w-14 cursor-pointer items-center justify-center rounded-full",
              "shadow-lg transition hover:-translate-y-0.5 hover:shadow-xl active:translate-y-0",
              "focus:outline-none focus-visible:ring-2 focus-visible:ring-[var(--color-brand-500)] focus-visible:ring-offset-2 focus-visible:ring-offset-[var(--color-surface-0)]",
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
                  "conic-gradient(from 210deg, color-mix(in srgb, var(--color-ssp-cyan-500) 55%, transparent), color-mix(in srgb, var(--color-brand-500) 40%, transparent) 38%, transparent 58%, color-mix(in srgb, var(--color-ssp-cyan-500) 45%, transparent))",
              }}
            />
            <span
              className="pointer-events-none absolute inset-0 rounded-full"
              style={{
                background:
                  "radial-gradient(circle at 30% 22%, rgba(255, 255, 255, 0.14), transparent 52%)",
              }}
            />

            <span
              className="pointer-events-none absolute top-1 -right-0.5 z-10 flex h-3 w-3 items-center justify-center"
              aria-hidden="true"
            >
              <span
                className="absolute inline-flex h-full w-full animate-ping rounded-full bg-[var(--color-brand-500)] opacity-25 motion-reduce:animate-none motion-reduce:opacity-0"
                aria-hidden="true"
              />
              <span className="relative h-2.5 w-2.5 shrink-0 rounded-full bg-[var(--color-brand-500)] ring-1 ring-[var(--color-ssp-ink-900)]" />
            </span>

            <span
              className="relative inline-flex h-10 w-10 items-center justify-center rounded-full transition group-hover:scale-[1.02]"
              style={{
                background: "var(--color-glass-bg)",
                border: "1px solid var(--color-glass-border)",
                backdropFilter: "blur(8px)",
              }}
            >
              <Sparkles
                size={20}
                style={{ color: "var(--color-utility-text)" }}
                className="transition group-hover:scale-105"
              />
            </span>
          </button>
        </div>
      )}
    </div>
  );
}
