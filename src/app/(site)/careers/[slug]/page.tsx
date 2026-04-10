import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { CAREERS_DEFAULT_OG_IMAGE, toAbsoluteUrl } from "@/lib/seo/site";
import { getPublicJobBySlugSSR } from "@/lib/utils/jobs/ssrJobsFetchers";
import JobPublicClient from "./JobPublicClient";
import type { IJobPosting } from "@/types/jobPosting.types";

function resolveCareersOgImage(job: Partial<IJobPosting> | null): string {
  const asset = job?.coverImage as
    | { url?: string; publicUrl?: string; cdnUrl?: string }
    | undefined;
  const raw =
    asset?.url ||
    asset?.publicUrl ||
    asset?.cdnUrl ||
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
      robots: {
        index: false,
        follow: false,
      },
    };
  }
}

export default async function JobPublicPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const job = await getPublicJobBySlugSSR(slug);
  if (!job) notFound();

  return <JobPublicClient job={job} />;
}
