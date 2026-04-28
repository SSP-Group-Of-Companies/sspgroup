import type { Metadata } from "next";
import { headers } from "next/headers";
import { notFound } from "next/navigation";
import { CAREERS_DEFAULT_OG_IMAGE, SITE_URL } from "@/lib/seo/site";
import { getPublicJobBySlugSSR } from "@/lib/utils/jobs/ssrJobsFetchers";
import JobPublicClient from "./JobPublicClient";
import type { IJobPosting } from "@/types/jobPosting.types";

async function resolveMetadataOrigin(): Promise<string> {
  const hdrs = await headers();
  const proto = (hdrs.get("x-forwarded-proto") || "").split(",")[0].trim();
  const host = (hdrs.get("x-forwarded-host") || hdrs.get("host") || "").split(",")[0].trim();
  if (proto && host) return `${proto}://${host}`;
  if (host) return `${host.includes("localhost") ? "http" : "https"}://${host}`;
  return SITE_URL;
}

function resolveCareersOgImage(job: Partial<IJobPosting> | null, origin: string): string {
  const asset = job?.coverImage as
    | { url?: string; publicUrl?: string; cdnUrl?: string }
    | undefined;
  const raw = asset?.publicUrl || asset?.cdnUrl || asset?.url || CAREERS_DEFAULT_OG_IMAGE;
  if (typeof raw === "string" && /^https?:\/\//i.test(raw)) return raw;
  const path = String(raw || CAREERS_DEFAULT_OG_IMAGE);
  return new URL(path.startsWith("/") ? path : `/${path}`, origin).toString();
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const origin = await resolveMetadataOrigin();

  try {
    const job = await getPublicJobBySlugSSR(slug);
    const title = job?.title ? `${job.title} | Careers | SSP Group` : "Role | Careers | SSP Group";
    const description =
      job?.summary ?? "Review this career opportunity and submit your application.";
    const canonicalPath = `/careers/${encodeURIComponent(slug)}`;
    const ogImageAbsolute = resolveCareersOgImage(job, origin);
    return {
      title: { absolute: title },
      description,
      alternates: { canonical: canonicalPath },
      openGraph: {
        title,
        description,
        type: "website",
        url: new URL(canonicalPath, origin).toString(),
        images: [
          {
            url: ogImageAbsolute,
            alt: job?.title
              ? `${job.title} role cover image`
              : "Careers preview image for SSP Group",
          },
        ],
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
      alternates: { canonical: `/careers/${encodeURIComponent(slug)}` },
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
