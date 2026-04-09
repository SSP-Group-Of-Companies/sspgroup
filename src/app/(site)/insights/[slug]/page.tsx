import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { INSIGHTS_DEFAULT_OG_IMAGE, toAbsoluteUrl } from "@/lib/seo/site";
import { getPublicBlogPostBySlug } from "@/lib/utils/blog/ssrBlogFetchers";
import { ssrApiFetch } from "@/lib/utils/ssrFetch";
import InsightsPostClient from "../../blog/[slug]/BlogPostClient";
import { InsightsPostJsonLd } from "../../blog/[slug]/BlogPostJsonLd";
import type { IBlogComment } from "@/types/blogComment.types";
import type { IBlogPost } from "@/types/blogPost.types";

function resolveInsightsOgImage(url: string | undefined | null): string {
  const raw = url?.trim() ? String(url).trim() : INSIGHTS_DEFAULT_OG_IMAGE;
  if (/^https?:\/\//i.test(raw)) return raw;
  const path = raw.startsWith("/") ? raw : `/${raw}`;
  return toAbsoluteUrl(path);
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

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;

  try {
    const post = await getPublicBlogPostBySlug(slug);
    const fallbackDescription = post?.title
      ? `${post.title} from SSP Group insights.`
      : "Insights and updates from SSP Group.";
    const title = post?.title ? `${post.title} | Insights | SSP Group` : "Insights | SSP Group";
    const description = post?.excerpt?.trim() || fallbackDescription;
    const canonicalPath = `/insights/${encodeURIComponent(slug)}`;
    const ogImageAbsolute = resolveInsightsOgImage(post?.bannerImage?.url ?? null);
    return {
      title: { absolute: title },
      description,
      alternates: { canonical: canonicalPath },
      openGraph: {
        title,
        description,
        type: "article",
        url: toAbsoluteUrl(canonicalPath),
        images: [ogImageAbsolute],
        publishedTime: toMetadataDate(post?.publishedAt ?? post?.createdAt ?? undefined),
        modifiedTime: toMetadataDate(post?.updatedAt ?? post?.publishedAt ?? post?.createdAt ?? undefined),
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

  const firstCategoryId =
    Array.isArray(post?.categoryIds) && post.categoryIds.length
      ? String(post.categoryIds[0])
      : null;

  const relatedPromise = (async () => {
    if (!firstCategoryId) return { data: { items: [] as RelatedPostListItem[] } };

    const qs = new URLSearchParams();
    qs.set("page", "1");
    qs.set("limit", "6");
    qs.set("sortBy", "newest");
    qs.set("categoryId", firstCategoryId);

    const res = await ssrApiFetch<{ data: { items: RelatedPostListItem[]; meta: BlogCommentMeta } }>(
      `/api/v1/blog?${qs.toString()}`,
    );

    const items = (res?.data?.items ?? [])
      .filter((p) => p?.slug && p.slug !== slug)
      .slice(0, 3);
    return { data: { items } };
  })();

  const [commentsRes, relatedRes] = await Promise.all([commentsPromise, relatedPromise]);

  return (
    <>
      <InsightsPostJsonLd post={post} slug={slug} />
      <InsightsPostClient
        slug={slug}
        initialPost={post}
        initialComments={commentsRes.data.items}
        initialCommentsMeta={commentsRes.data.meta}
        initialRelated={relatedRes.data.items}
      />
    </>
  );
}
