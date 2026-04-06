import type { Metadata } from "next";
import { CAREERS_DEFAULT_OG_IMAGE, toAbsoluteUrl } from "@/lib/seo/site";
import { getPublicJobBySlugSSR } from "@/lib/utils/jobs/ssrJobsFetchers";
import JobPublicClient from "./JobPublicClient";

function resolveCareersOgImage(job: any): string {
  const raw =
    job?.coverImage?.url ||
    job?.coverImage?.publicUrl ||
    job?.coverImage?.cdnUrl ||
    CAREERS_DEFAULT_OG_IMAGE;
  if (typeof raw === "string" && /^https?:\/\//i.test(raw)) return raw;
  const path = String(raw || CAREERS_DEFAULT_OG_IMAGE);
  return toAbsoluteUrl(path.startsWith("/") ? path : `/${path}`);
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;

  try {
    const job = await getPublicJobBySlugSSR(slug);
    const title = job?.title ? `${job.title} | Careers | SSP Group` : "Role | Careers | SSP Group";
    const description = job?.summary ?? "Review this career opportunity and submit your application.";
    const canonicalPath = `/careers/${slug}`;
    const ogImageAbsolute = resolveCareersOgImage(job);
    return {
      title: { absolute: title },
      description,
      alternates: { canonical: canonicalPath },
      openGraph: {
        title,
        description,
        type: "website",
        url: toAbsoluteUrl(canonicalPath),
        images: [ogImageAbsolute],
      },
      twitter: {
        card: "summary_large_image",
        title,
        description,
        images: [ogImageAbsolute],
      },
    };
  } catch {
    return {
      title: { absolute: "Role | Careers | SSP Group" },
      description: "Review this career opportunity and submit your application.",
      alternates: { canonical: `/careers/${slug}` },
    };
  }
}

export default async function JobPublicPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const job = await getPublicJobBySlugSSR(slug);

  // If ssrApiFetch throws, your existing error handler should catch it.
  // If it returns null-ish, render a simple fallback.
  if (!job) {
    return (
      <div className="min-h-screen bg-[color:var(--color-surface-0)]">
        <div className="mx-auto max-w-3xl px-6 py-16">
          <div className="site-card-surface rounded-3xl p-10 text-center text-sm text-[color:var(--color-muted-light)] shadow-sm">
            Job not found.
          </div>
        </div>
      </div>
    );
  }

  return <JobPublicClient job={job as any} />;
}
