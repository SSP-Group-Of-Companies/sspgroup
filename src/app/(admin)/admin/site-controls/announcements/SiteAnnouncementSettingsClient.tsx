"use client";

import * as React from "react";
import { Info, Megaphone, ShieldAlert, X } from "lucide-react";

import { AnnouncementBannerSheen } from "@/components/site/AnnouncementBannerSheen";
import { cn } from "@/lib/cn";
import { adminPatchSiteSettings } from "@/lib/utils/siteSettings/adminSiteSettingsApi";
import type { AdminSiteSettingsSnapshot } from "@/lib/siteSettings/getAdminSiteSettings";
import type { ISiteAnnouncementSettings, SiteAnnouncementTone } from "@/types/siteSettings.types";

const toneOptions: Array<{
  value: SiteAnnouncementTone;
  label: string;
  description: string;
  Icon: React.ComponentType<{ className?: string }>;
}> = [
  {
    value: "info",
    label: "Info",
    description: "General notices and neutral updates (default).",
    Icon: Info,
  },
  {
    value: "danger",
    label: "Danger",
    description: "Critical service, safety, or outage messages.",
    Icon: ShieldAlert,
  },
];

const tonePreviewClasses: Record<SiteAnnouncementTone, string> = {
  info: "border-[color:var(--color-ssp-cyan-600)]/30 text-white",
  danger: "border-[color:var(--color-brand-600)]/30 text-white",
};

function tonePreviewSurface(tone: SiteAnnouncementTone): React.CSSProperties {
  if (tone === "danger") {
    return {
      background: "linear-gradient(90deg, var(--color-brand-700), var(--color-brand-600))",
    };
  }
  return { background: "var(--gradient-ssp-elevated)" };
}

const tonePreviewIconClasses: Record<SiteAnnouncementTone, string> = {
  info: "text-[color:var(--color-ssp-cloud-50)]",
  danger: "text-[color:var(--color-brand-50)]",
};

const tonePreviewCloseClasses: Record<SiteAnnouncementTone, string> = {
  info: "text-white/80",
  danger: "text-white/80",
};

function isSafeAnnouncementUrl(value: string) {
  if (!value) return true;
  if (value.startsWith("#")) return true;
  if (value.startsWith("/") && !value.startsWith("//")) return true;
  try {
    const url = new URL(value);
    return url.protocol === "http:" || url.protocol === "https:";
  } catch {
    return false;
  }
}

function getAnnouncementValidationError(announcement: ISiteAnnouncementSettings) {
  if (!announcement.enabled) return null;

  const message = announcement.message.trim();
  const linkText = (announcement.linkText || "").trim();
  const linkUrl = (announcement.linkUrl || "").trim();

  if (!message) return "Message text is required when the announcement is on.";
  if (message.length > 220) return "Message text must be 220 characters or fewer.";
  if (linkText.length > 80) return "Link text must be 80 characters or fewer.";
  if (linkUrl.length > 500) return "Link URL must be 500 characters or fewer.";
  if ((linkText && !linkUrl) || (!linkText && linkUrl)) {
    return "Enter both link text and link URL, or leave both blank.";
  }
  if (!isSafeAnnouncementUrl(linkUrl)) {
    return "Link URL must be a relative path, page anchor, or http(s) URL.";
  }

  return null;
}

function ToggleSwitch({
  checked,
  disabled,
  label,
  onChange,
}: {
  checked: boolean;
  disabled?: boolean;
  label: string;
  onChange: (next: boolean) => void;
}) {
  return (
    <button
      type="button"
      role="switch"
      aria-checked={checked}
      disabled={disabled}
      onClick={() => onChange(!checked)}
      className={cn(
        "relative inline-flex h-8 w-11 shrink-0 cursor-pointer rounded-full border border-[var(--dash-border)] transition-colors duration-300 ease-out",
        "focus:outline-none focus-visible:ring-2 focus-visible:ring-[var(--dash-accent-soft)] focus-visible:ring-offset-2 focus-visible:ring-offset-[var(--dash-surface)]",
        checked
          ? "bg-[var(--dash-accent)] shadow-[inset_0_1px_0_rgba(255,255,255,0.2),inset_0_-1px_1px_rgba(0,0,0,0.12)]"
          : "bg-[var(--dash-surface-2)] shadow-[inset_0_2px_4px_rgba(0,0,0,0.08)] dark:shadow-[inset_0_2px_4px_rgba(0,0,0,0.25)]",
        disabled && "cursor-not-allowed opacity-60",
      )}
    >
      <span className="sr-only">{label}</span>
      <span
        className={cn(
          "pointer-events-none absolute top-1 left-1 size-6 rounded-full bg-white",
          "shadow-[0_1px_2px_rgba(0,0,0,0.12),0_3px_6px_rgba(0,0,0,0.15)]",
          "ring-1 ring-black/[0.06] dark:ring-white/10",
          "transition-transform duration-300 ease-[cubic-bezier(0.34,1.3,0.64,1)] will-change-transform",
          checked ? "translate-x-3" : "translate-x-0",
        )}
      />
    </button>
  );
}

export default function SiteAnnouncementSettingsClient({
  initialSettings,
}: {
  initialSettings: AdminSiteSettingsSnapshot;
}) {
  const [announcement, setAnnouncement] = React.useState<ISiteAnnouncementSettings>(
    initialSettings.siteAnnouncement,
  );
  const [updatedAt, setUpdatedAt] = React.useState<string | null>(initialSettings.updatedAt);
  const [saving, setSaving] = React.useState(false);
  const [saved, setSaved] = React.useState(false);
  const [error, setError] = React.useState<string | null>(null);

  function updateAnnouncement(patch: Partial<ISiteAnnouncementSettings>) {
    setSaved(false);
    setError(null);
    setAnnouncement((current) => ({ ...current, ...patch }));
  }

  async function onSave() {
    setError(null);
    setSaved(false);

    const validationError = getAnnouncementValidationError(announcement);
    if (validationError) {
      setError(validationError);
      return;
    }

    setSaving(true);
    try {
      const s = await adminPatchSiteSettings({ siteAnnouncement: announcement });
      setAnnouncement(s.siteAnnouncement);
      setUpdatedAt(s.updatedAt);
      setSaved(true);
    } catch (e) {
      setError(e instanceof Error ? e.message : "Could not save announcement");
    } finally {
      setSaving(false);
    }
  }

  const message = announcement.message.trim() || "Your announcement message will appear here.";
  const linkText = announcement.linkText?.trim();
  const validationError = getAnnouncementValidationError(announcement);
  const canSave = !saving && !validationError;
  const PreviewIcon =
    toneOptions.find((option) => option.value === announcement.tone)?.Icon ?? Info;

  return (
    <section
      className={cn(
        "rounded-3xl border p-6 shadow-[var(--dash-shadow)]",
        "border-[var(--dash-border)] bg-[var(--dash-surface)]",
      )}
    >
      <div className="flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between">
        <div className="flex gap-4">
          <div
            className={cn(
              "flex h-11 w-11 shrink-0 items-center justify-center rounded-xl border border-[var(--dash-border)]",
              "bg-[var(--dash-accent-muted)] text-[var(--dash-accent)]",
            )}
          >
            <Megaphone className="h-5 w-5" aria-hidden />
          </div>
          <div>
            <h2 className="text-lg font-semibold">Site announcement banner</h2>
            <p className="mt-1 max-w-2xl text-sm text-[var(--dash-muted)]">
              Show a dismissible message below the public navbar. Visitors who close it will not see
              it again during the same browser session.
            </p>
            {updatedAt && (
              <p className="mt-2 text-xs text-[var(--dash-muted)]">
                Last updated {new Date(updatedAt).toLocaleString()}
              </p>
            )}
          </div>
        </div>

        <div className="flex shrink-0 items-center gap-3 sm:pt-1">
          <span className="text-sm font-medium text-[var(--dash-muted)]">
            {announcement.enabled ? "On" : "Off"}
          </span>
          <ToggleSwitch
            checked={announcement.enabled}
            disabled={saving}
            label="Toggle site announcement banner"
            onChange={(enabled) => updateAnnouncement({ enabled })}
          />
        </div>
      </div>

      {announcement.enabled ? (
        <div className="mt-6 grid gap-5 lg:grid-cols-[minmax(0,1fr)_minmax(18rem,0.8fr)]">
          <div className="space-y-5">
            <div>
              <label className="text-sm font-semibold text-[var(--dash-text)]" htmlFor="tone">
                Tone
              </label>
              <div className="mt-2 grid gap-2 sm:grid-cols-2">
                {toneOptions.map(({ value, label, description, Icon }) => {
                  const active = announcement.tone === value;
                  return (
                    <button
                      key={value}
                      type="button"
                      disabled={saving}
                      onClick={() => updateAnnouncement({ tone: value })}
                      className={cn(
                        "cursor-pointer rounded-xl border p-4 text-left transition disabled:cursor-not-allowed disabled:opacity-60",
                        active
                          ? "border-[var(--dash-accent)] bg-[var(--dash-accent-muted)]"
                          : "border-[var(--dash-border)] bg-[var(--dash-surface-2)] hover:border-[var(--dash-accent-soft)]",
                      )}
                    >
                      <div className="flex items-center gap-2 text-sm font-semibold">
                        <Icon className="h-4 w-4 text-[var(--dash-accent)]" aria-hidden />
                        {label}
                      </div>
                      <p className="mt-1 text-xs leading-relaxed text-[var(--dash-muted)]">
                        {description}
                      </p>
                    </button>
                  );
                })}
              </div>
            </div>

            <div>
              <label className="text-sm font-semibold text-[var(--dash-text)]" htmlFor="message">
                Message text
              </label>
              <textarea
                id="message"
                value={announcement.message}
                disabled={saving}
                maxLength={220}
                rows={3}
                onChange={(e) => updateAnnouncement({ message: e.target.value })}
                placeholder="Example: Weather delays may affect some westbound shipments today."
                className={cn(
                  "mt-2 w-full rounded-xl border border-[var(--dash-border)] bg-[var(--dash-surface-2)] px-4 py-3 text-sm text-[var(--dash-text)]",
                  "placeholder:text-[var(--dash-muted)]/75 focus:border-[var(--dash-accent)] focus:ring-2 focus:ring-[var(--dash-accent-soft)] focus:outline-none",
                  "disabled:cursor-not-allowed disabled:opacity-60",
                )}
              />
              <p className="mt-1 text-xs text-[var(--dash-muted)]">
                {announcement.message.length}/220 characters
              </p>
            </div>

            <div className="grid gap-4 sm:grid-cols-2">
              <div>
                <label className="text-sm font-semibold text-[var(--dash-text)]" htmlFor="linkText">
                  Optional link text
                </label>
                <input
                  id="linkText"
                  value={announcement.linkText || ""}
                  disabled={saving}
                  maxLength={80}
                  onChange={(e) => updateAnnouncement({ linkText: e.target.value })}
                  placeholder="Learn more"
                  className={cn(
                    "mt-2 w-full rounded-xl border border-[var(--dash-border)] bg-[var(--dash-surface-2)] px-4 py-3 text-sm text-[var(--dash-text)]",
                    "placeholder:text-[var(--dash-muted)]/75 focus:border-[var(--dash-accent)] focus:ring-2 focus:ring-[var(--dash-accent-soft)] focus:outline-none",
                    "disabled:cursor-not-allowed disabled:opacity-60",
                  )}
                />
              </div>
              <div>
                <label className="text-sm font-semibold text-[var(--dash-text)]" htmlFor="linkUrl">
                  Optional link URL
                </label>
                <input
                  id="linkUrl"
                  value={announcement.linkUrl || ""}
                  disabled={saving}
                  maxLength={500}
                  onChange={(e) => updateAnnouncement({ linkUrl: e.target.value })}
                  placeholder="/company/news or https://..."
                  className={cn(
                    "mt-2 w-full rounded-xl border border-[var(--dash-border)] bg-[var(--dash-surface-2)] px-4 py-3 text-sm text-[var(--dash-text)]",
                    "placeholder:text-[var(--dash-muted)]/75 focus:border-[var(--dash-accent)] focus:ring-2 focus:ring-[var(--dash-accent-soft)] focus:outline-none",
                    "disabled:cursor-not-allowed disabled:opacity-60",
                  )}
                />
              </div>
            </div>
          </div>

          <div className="rounded-3xl border border-[var(--dash-border)] bg-[var(--dash-surface-2)] p-4">
            <div className="text-xs font-semibold tracking-[0.18em] text-[var(--dash-muted)] uppercase">
              Preview
            </div>
            <div
              className={cn(
                "relative mt-3 flex items-center justify-center gap-3 overflow-hidden rounded-xl px-4 py-3 pr-10 text-center text-sm font-medium shadow-sm",
                tonePreviewClasses[announcement.tone],
              )}
              style={tonePreviewSurface(announcement.tone)}
            >
              <PreviewIcon
                className={cn("h-4 w-4 shrink-0", tonePreviewIconClasses[announcement.tone])}
                aria-hidden
              />
              <p className="min-w-0">
                <span>{message}</span>
                {linkText ? (
                  <>
                    {" "}
                    <span className="font-semibold underline decoration-current/55 underline-offset-4">
                      {linkText}
                    </span>
                  </>
                ) : null}
              </p>
              <AnnouncementBannerSheen />
              <span
                className={cn(
                  "absolute top-1/2 right-2 inline-flex h-8 w-8 -translate-y-1/2 items-center justify-center rounded-xl",
                  tonePreviewCloseClasses[announcement.tone],
                )}
                aria-hidden
              >
                <X className="h-4 w-4" />
              </span>
            </div>
            <p className="mt-3 text-xs leading-relaxed text-[var(--dash-muted)]">
              The public banner uses the same looping sheen as this preview until the visitor closes
              it.
            </p>
          </div>
        </div>
      ) : (
        <div className="mt-6 rounded-xl border border-[var(--dash-border)] bg-[var(--dash-surface-2)] px-4 py-3 text-sm text-[var(--dash-muted)]">
          Turn on the announcement banner to configure the tone, message, optional link, and
          preview.
        </div>
      )}

      <div className="mt-6 flex flex-col gap-3 border-t border-[var(--dash-border)] pt-5 sm:flex-row sm:items-center sm:justify-between">
        <div>
          {error && (
            <p className="rounded-xl border border-red-500/25 bg-red-500/10 px-3 py-2 text-sm text-red-700 dark:text-red-300">
              {error}
            </p>
          )}
          {!error && validationError ? (
            <p className="rounded-xl border border-amber-500/25 bg-amber-500/10 px-3 py-2 text-sm text-amber-700 dark:text-amber-200">
              {validationError}
            </p>
          ) : null}
          {saved && !error ? (
            <p className="text-sm font-medium text-emerald-600 dark:text-emerald-300">
              Announcement settings saved.
            </p>
          ) : null}
        </div>
        <button
          type="button"
          disabled={!canSave}
          onClick={onSave}
          className={cn(
            "inline-flex min-h-11 cursor-pointer items-center justify-center rounded-xl px-5 text-sm font-semibold text-white transition",
            "bg-[var(--dash-accent)] shadow-[var(--dash-shadow)] hover:brightness-105",
            "focus-visible:ring-2 focus-visible:ring-[var(--dash-accent-soft)] focus-visible:ring-offset-2 focus-visible:ring-offset-[var(--dash-surface)] focus-visible:outline-none",
            !canSave && "cursor-not-allowed opacity-60",
          )}
        >
          {saving ? "Saving..." : "Save announcement"}
        </button>
      </div>
    </section>
  );
}
