// src/app/(admin)/admin/jobs/page.tsx
import { nptMetadata } from "@/lib/utils/blog/metadata";
import { ssrApiFetch } from "@/lib/utils/ssrFetch";
import AdminJobsListClient from "./AdminJobsListClient";

export const metadata = nptMetadata({
  title: "Admin - Jobs",
  description: "Manage job postings.",
  noIndex: true,
});

export default async function AdminJobsPage({
  searchParams,
}: {
  searchParams: Promise<Record<string, string | string[] | undefined>>;
}) {
  const sp = await searchParams;

  const qs = new URLSearchParams();
  for (const [k, v] of Object.entries(sp)) {
    if (v == null) continue;
    if (Array.isArray(v)) v.forEach((x) => qs.append(k, x));
    else qs.set(k, v);
  }

  const data = await ssrApiFetch<{ data: { items: any[]; meta: any } }>(
    `/api/v1/admin/jobs?${qs.toString()}`,
  );

  return <AdminJobsListClient initialItems={data.data.items} initialMeta={data.data.meta} />;
}
