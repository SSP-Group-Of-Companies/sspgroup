// src/app/(admin)/admin/jobs/[id]/page.tsx
import { sspPageMetadata } from "@/lib/utils/blog/metadata";
import { ssrApiFetch } from "@/lib/utils/ssrFetch";
import EditJobPostingClient from "./EditJobPostingClient";

export async function generateMetadata({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;

  try {
    const data = await ssrApiFetch<{ data: { jobPosting: any } }>(
      `/api/v1/admin/jobs/${encodeURIComponent(id)}`,
    );
    const job = data?.data?.jobPosting;
    return sspPageMetadata({
      title: `Admin - ${job?.title ?? "Job posting"}`,
      description: "Edit job posting.",
      noIndex: true,
    });
  } catch {
    return sspPageMetadata({ title: "Admin - Job posting", noIndex: true });
  }
}

export default async function AdminEditJobPostingPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;

  const data = await ssrApiFetch<{ data: { jobPosting: any } }>(
    `/api/v1/admin/jobs/${encodeURIComponent(id)}`,
  );

  return <EditJobPostingClient id={id} initialJob={data.data.jobPosting} />;
}
