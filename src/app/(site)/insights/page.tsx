import type { Metadata } from "next";
import InsightsIndexClient from "../blog/BlogIndexClient";
import { INSIGHTS_DEFAULT_OG_IMAGE } from "@/lib/seo/site";
import { ssrApiFetch } from "@/lib/utils/ssrFetch";
import type { IBlogPost } from "@/types/blogPost.types";

type SearchParams = Record<string, string | string[] | undefined>;

function spGet(sp: SearchParams, key: string) {
  const v = sp[key];
  if (Array.isArray(v)) return v[0];
  return v;
}

function toNum(v: string | undefined, fallback: number) {
  const n = Number(v);
  return Number.isFinite(n) && n > 0 ? n : fallback;
}

type InsightsListItem = Pick<IBlogPost, "slug" | "title" | "excerpt" | "viewCount"> & {
  id: string;
  publishedAt?: string | Date | null;
  coverImage?: { url?: string; alt?: string } | null;
  categories?: Array<{ id: string; name: string; slug: string }> | null;
  readTimeMins?: number | null;
};

type SerializedInsightsListItem = Omit<InsightsListItem, "publishedAt"> & {
  publishedAt?: string | null;
};

type InsightsListMeta = { page: number; limit: number; total: number; totalPages: number };

const EMPTY_META: InsightsListMeta = {
  page: 1,
  limit: 9,
  total: 0,
  totalPages: 0,
};

function normalizeInsightsItem(item: InsightsListItem): SerializedInsightsListItem {
  return {
    ...item,
    publishedAt:
      item.publishedAt instanceof Date ? item.publishedAt.toISOString() : (item.publishedAt ?? null),
  };
}

export const metadata: Metadata = {
  title: { absolute: "Insights | SSP Group" },
  description:
    "Operational intelligence, market updates, and execution-focused perspectives from SSP Group.",
  alternates: { canonical: "/insights" },
  openGraph: {
    title: "Insights | SSP Group",
    description:
      "Operational intelligence, market updates, and execution-focused perspectives from SSP Group.",
    type: "website",
    url: "/insights",
    images: [INSIGHTS_DEFAULT_OG_IMAGE],
  },
  twitter: {
    card: "summary_large_image",
    title: "Insights | SSP Group",
    description:
      "Operational intelligence, market updates, and execution-focused perspectives from SSP Group.",
    images: [INSIGHTS_DEFAULT_OG_IMAGE],
  },
};

export default async function InsightsPage({ searchParams }: { searchParams: Promise<SearchParams> }) {
  const sp = await searchParams;

  const q = (spGet(sp, "q") ?? "").toString();
  const categoryId = (spGet(sp, "categoryId") ?? "").toString();
  const categorySlug = (spGet(sp, "categorySlug") ?? "").toString();
  const sortBy = (spGet(sp, "sortBy") ?? "newest").toString();
  const page = toNum((spGet(sp, "page") ?? "1").toString(), 1);
  const limit = toNum((spGet(sp, "limit") ?? "9").toString(), 9);

  const qs = new URLSearchParams();
  if (q) qs.set("q", q);
  if (categoryId) qs.set("categoryId", categoryId);
  if (categorySlug) qs.set("categorySlug", categorySlug);
  if (sortBy) qs.set("sortBy", sortBy);
  qs.set("page", String(page));
  qs.set("limit", String(limit));

  const cqs = new URLSearchParams();
  if (q) cqs.set("q", q);
  if (categorySlug) cqs.set("categorySlug", categorySlug);
  const [postsResp, catsResp, recentResp] = await Promise.allSettled([
    ssrApiFetch<{
      data: {
        items: InsightsListItem[];
        meta: InsightsListMeta;
      };
    }>(`/api/v1/blog?${qs.toString()}`),
    ssrApiFetch<{
      data: Array<{ id: string; name: string; slug: string; postCount?: number }>;
    }>(`/api/v1/blog/categories?${cqs.toString()}`),
    ssrApiFetch<{
      data: {
        items: InsightsListItem[];
        meta: InsightsListMeta;
      };
    }>(`/api/v1/blog?${new URLSearchParams({ page: "1", limit: "5", sortBy: "newest" }).toString()}`),
  ]);

  const fallbackMeta: InsightsListMeta = {
    ...EMPTY_META,
    page,
    limit,
  };
  const resolvedPosts =
    postsResp.status === "fulfilled"
      ? postsResp.value.data
      : { items: [] as InsightsListItem[], meta: fallbackMeta };
  const resolvedCategories =
    catsResp.status === "fulfilled" ? catsResp.value.data : [];
  const resolvedRecent =
    recentResp.status === "fulfilled"
      ? recentResp.value.data.items
      : ([] as InsightsListItem[]);
  const normalizedPosts = resolvedPosts.items.map(normalizeInsightsItem);
  const normalizedRecent = resolvedRecent.map(normalizeInsightsItem);

  const initialQuery = { q, categoryId, categorySlug, sortBy, page, limit };

  return (
    <InsightsIndexClient
      initialItems={normalizedPosts}
      initialMeta={resolvedPosts.meta}
      categories={resolvedCategories}
      recentItems={normalizedRecent}
      initialQuery={initialQuery}
    />
  );
}

