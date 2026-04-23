export type AdminSiteSettings = {
  driverHiringModalEnabled: boolean;
  updatedAt: string | null;
};

export async function adminFetchSiteSettings(): Promise<AdminSiteSettings> {
  const res = await fetch("/api/v1/admin/site-settings", { method: "GET" });
  const json = await res.json().catch(() => ({}));
  if (!res.ok) throw new Error(json?.message || "Failed to load site settings");
  const d = json?.data ?? {};
  return {
    driverHiringModalEnabled: !!d.driverHiringModalEnabled,
    updatedAt: d.updatedAt ? String(d.updatedAt) : null,
  };
}

export async function adminPatchSiteSettings(patch: {
  driverHiringModalEnabled?: boolean;
}): Promise<AdminSiteSettings> {
  const res = await fetch("/api/v1/admin/site-settings", {
    method: "PATCH",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(patch),
  });
  const json = await res.json().catch(() => ({}));
  if (!res.ok) throw new Error(json?.message || "Failed to update site settings");
  const d = json?.data ?? {};
  return {
    driverHiringModalEnabled: !!d.driverHiringModalEnabled,
    updatedAt: d.updatedAt ? String(d.updatedAt) : null,
  };
}
