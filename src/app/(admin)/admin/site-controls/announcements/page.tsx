import { Megaphone } from "lucide-react";

import { getAdminSiteSettings } from "@/lib/siteSettings/getAdminSiteSettings";
import { sspPageMetadata } from "@/lib/utils/blog/metadata";
import { cn } from "@/lib/cn";

import SiteAnnouncementSettingsClient from "./SiteAnnouncementSettingsClient";

export const metadata = sspPageMetadata({
  title: "Admin - Site announcements",
  description: "Control the public site announcement banner.",
});

export default async function AdminSiteAnnouncementsPage() {
  const settings = await getAdminSiteSettings();

  return (
    <div className="space-y-6">
      <header className="flex items-start gap-4">
        <div
          className={cn(
            "flex h-11 w-11 items-center justify-center rounded-xl border border-[var(--dash-border)]",
            "bg-[var(--dash-accent-muted)] text-[var(--dash-accent)]",
          )}
        >
          <Megaphone className="h-5 w-5" aria-hidden />
        </div>

        <div>
          <h1 className="text-2xl font-semibold tracking-tight">Announcements</h1>
          <p className="mt-1 text-sm text-[var(--dash-muted)]">
            Configure a dismissible message banner below the public navbar.
          </p>
        </div>
      </header>

      <SiteAnnouncementSettingsClient initialSettings={settings} />
    </div>
  );
}
