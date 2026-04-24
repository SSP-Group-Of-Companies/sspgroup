// src/app/(admin)/layout.tsx
import { cookies } from "next/headers";
import Script from "next/script";

import { AdminShell } from "@/app/(admin)/components/layout/AdminShell";
import {
  AdminThemeProvider,
  type AdminThemeMode,
} from "@/app/(admin)/components/theme/AdminThemeProvider";

export default async function AdminLayout({ children }: { children: React.ReactNode }) {
  const cookieStore = await cookies();
  const rawMode = cookieStore.get("ssp.admin.theme.mode")?.value;

  const initialMode: AdminThemeMode | undefined =
    rawMode === "light" || rawMode === "dark" || rawMode === "system" ? rawMode : undefined;

  return (
    <>
      {/* Resolve the admin theme before paint so /admin pages never flash the default surface. */}
      <Script
        id="admin-theme-init"
        strategy="beforeInteractive"
        dangerouslySetInnerHTML={{
          __html:
            "(function(){try{if(!location.pathname.startsWith('/admin'))return;var html=document.documentElement;var existing=html.dataset.adminTheme;var k='ssp.admin.theme.mode';var m=localStorage.getItem(k);if(!(m==='light'||m==='dark'||m==='system'))m='system';var t=(m==='light'||m==='dark')?m:((window.matchMedia&&window.matchMedia('(prefers-color-scheme: dark)').matches)?'dark':'light');if(existing!=='light'&&existing!=='dark'){html.dataset.adminTheme=t;}document.cookie=k+'='+encodeURIComponent(m)+';path=/;max-age=31536000;samesite=lax';}catch(e){}})();",
        }}
      />

      <AdminThemeProvider initialMode={initialMode}>
        <AdminShell>{children}</AdminShell>
      </AdminThemeProvider>
    </>
  );
}
