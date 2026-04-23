// src/app/(site)/layout.tsx
import type { ReactNode } from "react";
import { SiteHeader } from "./components/layout/SiteHeader";
import { SiteFooter } from "./components/layout/SiteFooter";
import { SolutionsHashScroll } from "./components/layout/SolutionsHashScroll";
import ClientChatbot from "./components/ClientChatbot";
import { DriverHiringModal } from "./components/modals/DriverHiringModal";
import { getPublicSiteSettings } from "@/lib/siteSettings/getSiteSettings";

export default async function SiteLayout({ children }: { children: ReactNode }) {
  const { driverHiringModalEnabled } = await getPublicSiteSettings();

  return (
    <>
      {/* Site-only client helpers */}
      <SolutionsHashScroll />

      {/* Site chrome */}
      <SiteHeader />
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
