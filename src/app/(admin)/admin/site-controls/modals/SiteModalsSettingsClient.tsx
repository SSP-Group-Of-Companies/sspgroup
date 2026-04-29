"use client";

import * as React from "react";
import { Layers } from "lucide-react";

import { cn } from "@/lib/cn";
import { adminPatchSiteSettings } from "@/lib/utils/siteSettings/adminSiteSettingsApi";
import type { AdminSiteSettingsSnapshot } from "@/lib/siteSettings/getAdminSiteSettings";

export default function SiteModalsSettingsClient({
  initialSettings,
}: {
  initialSettings: AdminSiteSettingsSnapshot;
}) {
  const [enabled, setEnabled] = React.useState(initialSettings.driverHiringModalEnabled);
  const [updatedAt, setUpdatedAt] = React.useState<string | null>(initialSettings.updatedAt);
  const [saving, setSaving] = React.useState(false);
  const [error, setError] = React.useState<string | null>(null);

  async function onToggle(next: boolean) {
    setError(null);
    setSaving(true);
    try {
      const s = await adminPatchSiteSettings({ driverHiringModalEnabled: next });
      setEnabled(s.driverHiringModalEnabled);
      setUpdatedAt(s.updatedAt);
    } catch (e) {
      setError(e instanceof Error ? e.message : "Could not save");
    } finally {
      setSaving(false);
    }
  }

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
            <Layers className="h-5 w-5" aria-hidden />
          </div>
          <div>
            <h2 className="text-lg font-semibold">Driver hiring modal</h2>
            <p className="mt-1 max-w-xl text-sm text-[var(--dash-muted)]">
              When enabled, visitors see a one-time modal on their first page load (per browser
              session) inviting drivers to apply via DriveDock.
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
            {enabled ? "On" : "Off"}
          </span>
          <button
            type="button"
            role="switch"
            aria-checked={enabled}
            disabled={saving}
            onClick={() => onToggle(!enabled)}
            className={cn(
              "relative inline-flex h-8 w-11 shrink-0 cursor-pointer rounded-full border border-[var(--dash-border)] transition-colors duration-300 ease-out",
              "focus:outline-none focus-visible:ring-2 focus-visible:ring-[var(--dash-accent-soft)] focus-visible:ring-offset-2 focus-visible:ring-offset-[var(--dash-surface)]",
              enabled
                ? "bg-[var(--dash-accent)] shadow-[inset_0_1px_0_rgba(255,255,255,0.2),inset_0_-1px_1px_rgba(0,0,0,0.12)]"
                : "bg-[var(--dash-surface-2)] shadow-[inset_0_2px_4px_rgba(0,0,0,0.08)] dark:shadow-[inset_0_2px_4px_rgba(0,0,0,0.25)]",
              saving && "cursor-not-allowed opacity-60",
            )}
          >
            <span className="sr-only">Toggle driver hiring modal</span>
            <span
              className={cn(
                "pointer-events-none absolute top-1 left-1 size-6 rounded-full bg-white",
                "shadow-[0_1px_2px_rgba(0,0,0,0.12),0_3px_6px_rgba(0,0,0,0.15)]",
                "ring-1 ring-black/[0.06] dark:ring-white/10",
                "transition-transform duration-300 ease-[cubic-bezier(0.34,1.3,0.64,1)] will-change-transform",
                enabled ? "translate-x-3" : "translate-x-0",
              )}
            />
          </button>
        </div>
      </div>

      {error && (
        <p className="mt-4 rounded-xl border border-red-500/25 bg-red-500/10 px-3 py-2 text-sm text-red-700 dark:text-red-300">
          {error}
        </p>
      )}
    </section>
  );
}
