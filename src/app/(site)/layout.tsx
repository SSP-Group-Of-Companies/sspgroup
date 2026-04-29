// src/app/(site)/layout.tsx
import type { ReactNode } from "react";
import { cookies } from "next/headers";
import { SiteHeader } from "./components/layout/SiteHeader";
import { SiteFooter } from "./components/layout/SiteFooter";
import { SolutionsHashScroll } from "./components/layout/SolutionsHashScroll";
import ClientChatbot from "./components/ClientChatbot";
import { DriverHiringModal } from "./components/modals/DriverHiringModal";
import { SiteAnnouncementBanner } from "./components/layout/SiteAnnouncementBanner";
import {
  SITE_ANNOUNCEMENT_DISMISS_COOKIE,
  getSiteAnnouncementRevision,
  parseAnnouncementDismissCookie,
} from "@/lib/site/siteAnnouncementDismiss";
import { getRequestSiteOrigin } from "@/lib/site/requestOrigin";
import { getPublicSiteSettings } from "@/lib/siteSettings/getSiteSettings";

/** Site chrome reads Mongo-backed settings; must not use prerendered/stale snapshots. */
export const dynamic = "force-dynamic";

export default async function SiteLayout({ children }: { children: ReactNode }) {
  const { driverHiringModalEnabled, siteAnnouncement } = await getPublicSiteSettings();
  const siteOrigin = await getRequestSiteOrigin();
  const cookieStore = await cookies();
  const announcementRevision = getSiteAnnouncementRevision(siteAnnouncement);
  const dismissCookie = parseAnnouncementDismissCookie(
    cookieStore.get(SITE_ANNOUNCEMENT_DISMISS_COOKIE)?.value,
  );
  const dismissedForRevision =
    dismissCookie?.dismissed === true && dismissCookie.revision === announcementRevision;
  const hasActiveAnnouncement =
    siteAnnouncement.enabled && siteAnnouncement.message.trim().length > 0;

  return (
    <>
      {/* Site-only client helpers */}
      <SolutionsHashScroll />

      {/* Sticky shell: utility + nav + announcement move together; mega-menu stacks above the bar */}
      <div className="sticky top-0 isolate z-[65] [overflow-anchor:none]" data-site-header>
        <SiteHeader />
        {hasActiveAnnouncement ? (
          <SiteAnnouncementBanner
            announcement={siteAnnouncement}
            siteOrigin={siteOrigin}
            announcementRevision={announcementRevision}
            dismissedByCookie={dismissedForRevision}
          />
        ) : null}
      </div>
      <main id="main-content" className="overflow-x-clip">
        {children}
      </main>

      {/* Lazy-loaded client-only widget */}
      <ClientChatbot />

      <DriverHiringModal enabled={driverHiringModalEnabled} />

      <SiteFooter />
    </>
  );
}
