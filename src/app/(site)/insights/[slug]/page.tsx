import type { Metadata } from "next";
import { headers } from "next/headers";
import { notFound } from "next/navigation";
import { INSIGHTS_DEFAULT_OG_IMAGE, SITE_URL } from "@/lib/seo/site";
import { getPublicBlogPostBySlug } from "@/lib/utils/blog/ssrBlogFetchers";
import { ssrApiFetch } from "@/lib/utils/ssrFetch";
import { InsightsPostJsonLd } from "./InsightsPostJsonLd";
import InsightsPostClient from "./InsightsPostClient";
import { IBlogComment } from "@/types/blogComment.types";
import { IBlogPost } from "@/types/blogPost.types";

async function resolveMetadataOrigin(): Promise<string> {
  const hdrs = await headers();
  const proto = (hdrs.get("x-forwarded-proto") || "").split(",")[0].trim();
  const host = (hdrs.get("x-forwarded-host") || hdrs.get("host") || "").split(",")[0].trim();
  if (proto && host) return `${proto}://${host}`;
  if (host) return `${host.includes("localhost") ? "http" : "https"}://${host}`;
  return SITE_URL;
}

function resolveInsightsOgImage(url: string | undefined | null, origin: string): string {
  const raw = url?.trim() ? String(url).trim() : INSIGHTS_DEFAULT_OG_IMAGE;
  if (/^https?:\/\//i.test(raw)) return raw;
  const path = raw.startsWith("/") ? raw : `/${raw}`;
  return new URL(path, origin).toString();
}

function toMetadataDate(value: Date | string | undefined): string | undefined {
  if (!value) return undefined;
  return value instanceof Date ? value.toISOString() : value;
}

type BlogCommentMeta = {
  page?: number;
  pageSize?: number;
  total?: number;
  totalPages?: number;
};

type RelatedPostListItem = Pick<
  IBlogPost,
  "id" | "slug" | "title" | "excerpt" | "publishedAt" | "readingTimeMinutes"
> & {
  bannerImage?: IBlogPost["bannerImage"];
};

type BlogCategoryListItem = {
  id: string;
  name: string;
  slug: string;
  postCount?: number;
};

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const origin = await resolveMetadataOrigin();

  try {
    const post = await getPublicBlogPostBySlug(slug);
    const fallbackDescription = post?.title
      ? `${post.title} from SSP Group insights.`
      : "Insights and updates from SSP Group.";
    const title = post?.title ? `${post.title} | Insights | SSP Group` : "Insights | SSP Group";
    const description = post?.excerpt?.trim() || fallbackDescription;
    const canonicalPath = `/insights/${encodeURIComponent(slug)}`;
    const ogImageAbsolute = resolveInsightsOgImage(post?.bannerImage?.url ?? null, origin);
    return {
      title: { absolute: title },
      description,
      alternates: { canonical: canonicalPath },
      openGraph: {
        title,
        description,
        type: "article",
        url: new URL(canonicalPath, origin).toString(),
        images: [
          {
            url: ogImageAbsolute,
            alt: post?.title ? `${post.title} article banner` : "Insights article preview image",
          },
        ],
        publishedTime: toMetadataDate(post?.publishedAt ?? post?.createdAt ?? undefined),
        modifiedTime: toMetadataDate(
          post?.updatedAt ?? post?.publishedAt ?? post?.createdAt ?? undefined,
        ),
      },
      twitter: {
        card: "summary_large_image",
        title,
        description,
        images: [ogImageAbsolute],
      },
    };
  } catch (error) {
    if ((error as { status?: number })?.status === 404) {
      notFound();
    }

    return {
      title: { absolute: "Insights | SSP Group" },
      description: "Operational intelligence and updates from SSP Group.",
      robots: {
        index: false,
        follow: false,
      },
    };
  }
}

export default async function InsightsPostPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;

  let post: IBlogPost;
  try {
    post = await getPublicBlogPostBySlug(slug);
  } catch (e) {
    if ((e as { status?: number })?.status === 404) notFound();
    throw e;
  }

  const COMMENTS_PAGE_SIZE = 10;
  const commentsPromise = ssrApiFetch<{ data: { items: IBlogComment[]; meta: BlogCommentMeta } }>(
    `/api/v1/blog/${encodeURIComponent(slug)}/comments?page=1&pageSize=${COMMENTS_PAGE_SIZE}&sortBy=createdAt&sortDir=desc`,
  );

  const categoryIds = Array.isArray(post?.categoryIds)
    ? Array.from(new Set(post.categoryIds.map((id) => String(id)).filter(Boolean)))
    : [];

  const relatedPromise = (async () => {
    if (!categoryIds.length) return { data: { items: [] as RelatedPostListItem[] } };

    const responses = await Promise.all(
      categoryIds.map(async (categoryId) => {
        const qs = new URLSearchParams();
        qs.set("page", "1");
        qs.set("limit", "6");
        qs.set("sortBy", "newest");
        qs.set("categoryId", categoryId);
        return ssrApiFetch<{
          data: { items: RelatedPostListItem[]; meta: BlogCommentMeta };
        }>(`/api/v1/blog?${qs.toString()}`);
      }),
    );

    const byId = new Map<
      string,
      { item: RelatedPostListItem; overlapCount: number; publishedAtTs: number }
    >();

    for (const res of responses) {
      for (const p of res?.data?.items ?? []) {
        if (!p?.slug || p.slug === slug) continue;
        const key = String(p.id ?? p.slug);
        const publishedAtTs = p?.publishedAt ? new Date(p.publishedAt).getTime() || 0 : 0;
        const prev = byId.get(key);
        if (prev) {
          prev.overlapCount += 1;
          if (publishedAtTs > prev.publishedAtTs) prev.publishedAtTs = publishedAtTs;
          continue;
        }
        byId.set(key, { item: p, overlapCount: 1, publishedAtTs });
      }
    }

    const items = Array.from(byId.values())
      .sort((a, b) => {
        if (b.overlapCount !== a.overlapCount) return b.overlapCount - a.overlapCount;
        return b.publishedAtTs - a.publishedAtTs;
      })
      .map((x) => x.item)
      .slice(0, 3);

    return { data: { items } };
  })();

  const categoriesPromise = ssrApiFetch<{ data: BlogCategoryListItem[] }>(
    "/api/v1/blog/categories",
  );

  const [commentsRes, relatedRes, categoriesRes] = await Promise.all([
    commentsPromise,
    relatedPromise,
    categoriesPromise,
  ]);

  return (
    <>
      <InsightsPostJsonLd post={post} slug={slug} />
      <InsightsPostClient
        slug={slug}
        initialPost={post}
        initialComments={commentsRes.data.items}
        initialCommentsMeta={commentsRes.data.meta}
        initialRelated={relatedRes.data.items}
        initialCategories={categoriesRes.data}
      />
    </>
  );
}
