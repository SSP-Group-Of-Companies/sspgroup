import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { nptMetadata } from "@/lib/utils/blog/metadata";
import { getPublicBlogPostBySlug } from "@/lib/utils/blog/ssrBlogFetchers";
import { ssrApiFetch } from "@/lib/utils/ssrFetch";
import BlogPostClient from "../../blog/[slug]/BlogPostClient";
import { BlogPostJsonLd } from "../../blog/[slug]/BlogPostJsonLd";

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
    return nptMetadata({
      title: post?.title ?? "Insights",
      description: post?.excerpt?.trim() || fallbackDescription,
      canonicalPath: `/insights/${encodeURIComponent(slug)}`,
      ogImage: post?.bannerImage?.url ?? null,
      openGraphType: "article",
      publishedTime: post?.publishedAt ?? post?.createdAt ?? null,
      modifiedTime: post?.updatedAt ?? post?.publishedAt ?? post?.createdAt ?? null,
    });
  } catch (error) {
    if ((error as { status?: number })?.status === 404) {
      notFound();
    }

    return {
      ...nptMetadata({
        title: "Insights",
        description: "Insights and updates from SSP Group.",
        noIndex: true,
      }),
      robots: {
        index: false,
        follow: false,
      },
    };
  }
}

export default async function InsightsPostPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;

  let post: any;
  try {
    post = await getPublicBlogPostBySlug(slug);
  } catch (e) {
    if ((e as any)?.status === 404) notFound();
    throw e;
  }

  const COMMENTS_PAGE_SIZE = 10;
  const commentsPromise = ssrApiFetch<{ data: { items: any[]; meta: any } }>(
    `/api/v1/blog/${encodeURIComponent(slug)}/comments?page=1&pageSize=${COMMENTS_PAGE_SIZE}&sortBy=createdAt&sortDir=desc`,
  );

  const firstCategoryId =
    Array.isArray(post?.categoryIds) && post.categoryIds.length
      ? String(post.categoryIds[0])
      : null;

  const relatedPromise = (async () => {
    if (!firstCategoryId) return { data: { items: [] as any[] } };

    const qs = new URLSearchParams();
    qs.set("page", "1");
    qs.set("limit", "6");
    qs.set("sortBy", "newest");
    qs.set("categoryId", firstCategoryId);

    const res = await ssrApiFetch<{ data: { items: any[]; meta: any } }>(
      `/api/v1/blog?${qs.toString()}`,
    );

    const items = (res?.data?.items ?? [])
      .filter((p: any) => p?.slug && p.slug !== slug)
      .slice(0, 3);
    return { data: { items } };
  })();

  const [commentsRes, relatedRes] = await Promise.all([commentsPromise, relatedPromise]);

  return (
    <>
      <BlogPostJsonLd post={post} slug={slug} />
      <BlogPostClient
        slug={slug}
        initialPost={post}
        initialComments={commentsRes.data.items}
        initialCommentsMeta={commentsRes.data.meta}
        initialRelated={relatedRes.data.items}
      />
    </>
  );
}
