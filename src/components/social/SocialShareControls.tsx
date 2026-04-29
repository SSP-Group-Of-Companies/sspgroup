"use client";

import * as React from "react";
import {
  Facebook,
  Linkedin,
  Link2,
  Mail,
  MessageCircle,
  Send,
  Share2,
  Twitter,
} from "lucide-react";
import { cn } from "@/lib/cn";

type Variant = "site" | "admin";

type Props = {
  url: string;
  title: string;
  compact?: boolean;
  variant?: Variant;
  className?: string;
};

type ShareOption = {
  id: string;
  label: string;
  href: string;
  icon: React.ComponentType<{ className?: string }>;
};

function normalizeShareUrl(input: string, browserLocation?: { href: string; origin: string }) {
  const value = String(input || "").trim();
  if (!value) {
    if (browserLocation) return browserLocation.href;
    return "";
  }
  if (/^https?:\/\//i.test(value)) return value;
  if (browserLocation) {
    return new URL(value, browserLocation.origin).toString();
  }
  if (value.startsWith("/")) return value;
  return `/${value}`;
}

function buildShareOptions(url: string, title: string): ShareOption[] {
  const encodedUrl = encodeURIComponent(url);
  const encodedTitle = encodeURIComponent(title);

  return [
    {
      id: "linkedin",
      label: "LinkedIn",
      href: `https://www.linkedin.com/sharing/share-offsite/?url=${encodedUrl}`,
      icon: Linkedin,
    },
    {
      id: "facebook",
      label: "Facebook",
      href: `https://www.facebook.com/sharer/sharer.php?u=${encodedUrl}`,
      icon: Facebook,
    },
    {
      id: "x",
      label: "X",
      href: `https://twitter.com/intent/tweet?url=${encodedUrl}&text=${encodedTitle}`,
      icon: Twitter,
    },
    {
      id: "whatsapp",
      label: "WhatsApp",
      href: `https://wa.me/?text=${encodeURIComponent(`${title} ${url}`)}`,
      icon: MessageCircle,
    },
    {
      id: "telegram",
      label: "Telegram",
      href: `https://t.me/share/url?url=${encodedUrl}&text=${encodedTitle}`,
      icon: Send,
    },
    {
      id: "email",
      label: "Email",
      href: `mailto:?subject=${encodedTitle}&body=${encodeURIComponent(`${title}\n\n${url}`)}`,
      icon: Mail,
    },
  ];
}

function CopyButton({ url, variant }: { url: string; variant: Variant }) {
  const [copied, setCopied] = React.useState(false);
  const isSite = variant === "site";

  return (
    <button
      type="button"
      onClick={async () => {
        try {
          await navigator.clipboard.writeText(url);
          setCopied(true);
          window.setTimeout(() => setCopied(false), 1200);
        } catch {
          setCopied(false);
        }
      }}
      className={cn(
        "inline-flex cursor-pointer items-center justify-center border transition",
        variant === "admin"
          ? "h-9 gap-1.5 rounded-xl border-[var(--dash-border)] bg-[var(--dash-surface)] px-3 text-xs font-semibold text-[var(--dash-text)] shadow-[var(--dash-shadow)]/15 hover:bg-[var(--dash-surface-2)] focus:outline-none focus-visible:ring-2 focus-visible:ring-[var(--dash-accent-soft)]"
          : "h-8 w-8 rounded-full border-[color:var(--color-footer-social-border)] text-[color:var(--color-footer-link)] hover:text-[color:var(--color-menu-accent)] focus:outline-none focus-visible:ring-2 focus-visible:ring-[color:var(--color-menu-accent)] focus-visible:ring-offset-2 active:text-[color:var(--color-menu-accent)]",
      )}
      aria-label="Copy share link"
      title={copied ? "Copied" : "Copy share link"}
    >
      <Link2 className={cn("h-4 w-4", copied && "text-[color:var(--color-brand-600)]")} />
      {!isSite ? (copied ? "Copied" : "Copy") : null}
    </button>
  );
}

export default function SocialShareControls({
  url,
  title,
  compact = false,
  variant = "site",
  className,
}: Props) {
  const initialShareUrl = React.useMemo(() => normalizeShareUrl(url), [url]);
  const [shareUrl, setShareUrl] = React.useState(initialShareUrl);
  const options = React.useMemo(
    () => buildShareOptions(shareUrl, title || "Check this out"),
    [shareUrl, title],
  );
  const [open, setOpen] = React.useState(false);
  const menuRef = React.useRef<HTMLDivElement | null>(null);
  const [copied, setCopied] = React.useState(false);

  React.useEffect(() => {
    setShareUrl(
      normalizeShareUrl(url, {
        href: window.location.href,
        origin: window.location.origin,
      }),
    );
  }, [url]);

  React.useEffect(() => {
    if (!open) return;
    function onDocClick(e: MouseEvent) {
      if (!menuRef.current) return;
      if (!menuRef.current.contains(e.target as Node)) setOpen(false);
    }
    function onEsc(e: KeyboardEvent) {
      if (e.key === "Escape") setOpen(false);
    }
    document.addEventListener("mousedown", onDocClick);
    document.addEventListener("keydown", onEsc);
    return () => {
      document.removeEventListener("mousedown", onDocClick);
      document.removeEventListener("keydown", onEsc);
    };
  }, [open]);

  if (compact) {
    return (
      <div ref={menuRef} className={cn("relative", className)}>
        <button
          type="button"
          onClick={() => setOpen((v) => !v)}
          title="Share"
          className={cn(
            "inline-flex h-9 w-9 items-center justify-center rounded-xl border transition",
            variant === "admin"
              ? "border-[var(--dash-border)] bg-[var(--dash-surface)] text-[var(--dash-text)] shadow-[var(--dash-shadow)]/15 hover:bg-[var(--dash-surface-2)] focus:outline-none focus-visible:ring-2 focus-visible:ring-[var(--dash-accent-soft)]"
              : "border-[color:var(--color-border-light)] bg-white text-[color:var(--color-text-light)] hover:bg-[color:var(--color-surface-0-light)]",
          )}
          aria-label="Share"
        >
          <Share2 className="h-4 w-4" />
        </button>

        {open ? (
          <div
            className={cn(
              "absolute top-1/2 right-full z-[100] mr-2 -translate-y-1/2",
              "flex max-w-[min(70vw,34rem)] items-center overflow-x-auto border p-1 shadow-xl",
              variant === "admin"
                ? "rounded-xl border-[var(--dash-border)] bg-[var(--dash-surface)]"
                : "rounded-full border-[color:var(--color-border-light)] bg-white",
            )}
          >
            {options.map((opt, idx) => {
              const Icon = opt.icon;
              return (
                <React.Fragment key={opt.id}>
                  {idx > 0 ? <div className="mx-0.5 h-4 w-px bg-[var(--dash-border)]" /> : null}
                  <a
                    href={opt.href}
                    title={`Share on ${opt.label}`}
                    target={opt.id === "email" ? undefined : "_blank"}
                    rel={opt.id === "email" ? undefined : "noopener noreferrer"}
                    className={cn(
                      "inline-flex h-7 w-7 items-center justify-center transition",
                      variant === "admin"
                        ? "rounded-lg text-[var(--dash-text)] hover:bg-[var(--dash-surface-2)]"
                        : "rounded-full text-[color:var(--color-text-light)] hover:bg-[color:var(--color-surface-0-light)]",
                    )}
                    aria-label={`Share on ${opt.label}`}
                  >
                    <Icon className="h-3.5 w-3.5" />
                  </a>
                </React.Fragment>
              );
            })}

            <div className="mx-0.5 h-4 w-px bg-[var(--dash-border)]" />
            <button
              type="button"
              onClick={async () => {
                try {
                  await navigator.clipboard.writeText(shareUrl);
                  setCopied(true);
                  window.setTimeout(() => setCopied(false), 1200);
                } catch {
                  setCopied(false);
                }
              }}
              className={cn(
                "inline-flex h-7 w-7 cursor-pointer items-center justify-center transition",
                variant === "admin"
                  ? "rounded-lg text-[var(--dash-text)] hover:bg-[var(--dash-surface-2)]"
                  : "rounded-full text-[color:var(--color-text-light)] hover:bg-[color:var(--color-surface-0-light)]",
              )}
              title="Copy share link"
              aria-label={copied ? "Copied" : "Copy share link"}
            >
              <Link2
                className={cn("h-3.5 w-3.5", copied && "text-[color:var(--color-brand-600)]")}
              />
            </button>
          </div>
        ) : null}
      </div>
    );
  }

  return (
    <div className={cn("flex flex-wrap items-center gap-2", className)}>
      {variant === "admin" ? (
        <span className="text-xs font-medium text-[var(--dash-muted)]">Share:</span>
      ) : null}

      {options.map((opt) => {
        const Icon = opt.icon;
        return (
          <a
            key={opt.id}
            href={opt.href}
            title={`Share on ${opt.label}`}
            target={opt.id === "email" ? undefined : "_blank"}
            rel={opt.id === "email" ? undefined : "noopener noreferrer"}
            className={cn(
              "inline-flex items-center justify-center border transition",
              variant === "admin"
                ? "h-9 gap-1.5 rounded-xl border-[var(--dash-border)] bg-[var(--dash-surface)] px-3 text-xs font-semibold text-[var(--dash-text)] shadow-[var(--dash-shadow)]/15 hover:bg-[var(--dash-surface-2)] focus:outline-none focus-visible:ring-2 focus-visible:ring-[var(--dash-accent-soft)]"
                : "h-8 w-8 rounded-full border-[color:var(--color-footer-social-border)] text-[color:var(--color-footer-link)] hover:text-[color:var(--color-menu-accent)] focus:outline-none focus-visible:ring-2 focus-visible:ring-[color:var(--color-menu-accent)] focus-visible:ring-offset-2 active:text-[color:var(--color-menu-accent)]",
            )}
            aria-label={`Share on ${opt.label}`}
          >
            <Icon className={cn(variant === "admin" ? "h-3.5 w-3.5" : "h-4 w-4")} />
            {variant === "admin" ? opt.label : null}
          </a>
        );
      })}

      <CopyButton url={shareUrl} variant={variant} />
    </div>
  );
}
