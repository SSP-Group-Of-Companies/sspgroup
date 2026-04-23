import { Layers } from "lucide-react";

import { sspPageMetadata } from "@/lib/utils/blog/metadata";
import { cn } from "@/lib/cn";

import SiteModalsSettingsClient from "./SiteModalsSettingsClient";

export const metadata = sspPageMetadata({
  title: "Admin - Site modals",
  description: "Control marketing modals on the public website.",
});

export default function AdminSiteModalsPage() {
  return (
    <div className="space-y-6">
      <header className="flex items-start gap-4">
        <div
          className={cn(
            "flex h-11 w-11 items-center justify-center rounded-2xl border border-[var(--dash-border)]",
            "bg-[var(--dash-accent-muted)] text-[var(--dash-accent)]",
          )}
        >
          <Layers className="h-5 w-5" aria-hidden />
        </div>

        <div>
          <h1 className="text-2xl font-semibold tracking-tight">Modals</h1>
          <p className="mt-1 text-sm text-[var(--dash-muted)]">
            Decide which promotional overlays appear on the marketing site.
          </p>
        </div>
      </header>

      <SiteModalsSettingsClient />
    </div>
  );
}
