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

function normalizeShareUrl(input: string) {
  const value = String(input || "").trim();
  if (!value) {
    if (typeof window !== "undefined") return window.location.href;
    return "";
  }
  if (/^https?:\/\//i.test(value)) return value;
  if (typeof window !== "undefined") {
    return new URL(value, window.location.origin).toString();
  }
  // SSR fallback: keep relative path as-is until hydrated on client.
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
        "inline-flex h-9 cursor-pointer items-center justify-center gap-1.5 rounded-xl border px-3 text-xs font-semibold transition",
        variant === "admin"
          ? "border-[var(--dash-border)] bg-[var(--dash-surface)] text-[var(--dash-text)] shadow-[var(--dash-shadow)]/15 hover:bg-[var(--dash-surface-2)] focus:outline-none focus-visible:ring-2 focus-visible:ring-[var(--dash-accent-soft)]"
          : "border-[color:var(--color-border-light)] bg-white text-[color:var(--color-text-light)] hover:bg-[color:var(--color-surface-0-light)]",
      )}
      aria-label="Copy share link"
    >
      <Link2 className="h-3.5 w-3.5" />
      {copied ? "Copied" : "Copy"}
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
  const absoluteUrl = React.useMemo(() => normalizeShareUrl(url), [url]);
  const options = React.useMemo(
    () => buildShareOptions(absoluteUrl, title || "Check this out"),
    [absoluteUrl, title],
  );
  const [open, setOpen] = React.useState(false);
  const menuRef = React.useRef<HTMLDivElement | null>(null);

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
              "absolute right-0 z-[100] mt-2 w-52 overflow-hidden rounded-2xl border p-2 shadow-xl",
              variant === "admin"
                ? "border-[var(--dash-border)] bg-[var(--dash-surface)]"
                : "border-[color:var(--color-border-light)] bg-white",
            )}
          >
            <div className="mb-2 px-2 text-[11px] font-semibold tracking-wide text-[color:var(--color-subtle-light)] uppercase">
              Share
            </div>

            <div className="space-y-1">
              {options.map((opt) => {
                const Icon = opt.icon;
                return (
                  <a
                    key={opt.id}
                    href={opt.href}
                    target={opt.id === "email" ? undefined : "_blank"}
                    rel={opt.id === "email" ? undefined : "noopener noreferrer"}
                    className={cn(
                      "flex items-center gap-2 rounded-lg px-2 py-1.5 text-xs font-medium transition",
                      variant === "admin"
                        ? "text-[var(--dash-text)] hover:bg-[var(--dash-surface-2)]"
                        : "text-[color:var(--color-text-light)] hover:bg-[color:var(--color-surface-0-light)]",
                    )}
                  >
                    <Icon className="h-3.5 w-3.5" />
                    {opt.label}
                  </a>
                );
              })}
            </div>

            <div className="mt-2">
              <CopyButton url={absoluteUrl} variant={variant} />
            </div>
          </div>
        ) : null}
      </div>
    );
  }

  return (
    <div className={cn("flex flex-wrap items-center gap-2", className)}>
      <span
        className={cn(
          "text-xs font-medium",
          variant === "admin"
            ? "text-[var(--dash-muted)]"
            : "text-[color:var(--color-muted-light)]",
        )}
      >
        Share:
      </span>

      {options.map((opt) => {
        const Icon = opt.icon;
        return (
          <a
            key={opt.id}
            href={opt.href}
            target={opt.id === "email" ? undefined : "_blank"}
            rel={opt.id === "email" ? undefined : "noopener noreferrer"}
            className={cn(
              "inline-flex h-9 items-center justify-center gap-1.5 rounded-xl border px-3 text-xs font-semibold transition",
              variant === "admin"
                ? "border-[var(--dash-border)] bg-[var(--dash-surface)] text-[var(--dash-text)] shadow-[var(--dash-shadow)]/15 hover:bg-[var(--dash-surface-2)] focus:outline-none focus-visible:ring-2 focus-visible:ring-[var(--dash-accent-soft)]"
                : "border-[color:var(--color-border-light)] bg-white text-[color:var(--color-text-light)] hover:bg-[color:var(--color-surface-0-light)]",
            )}
          >
            <Icon className="h-3.5 w-3.5" />
            {opt.label}
          </a>
        );
      })}

      <CopyButton url={absoluteUrl} variant={variant} />
    </div>
  );
}
