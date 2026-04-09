// src/lib/utils/blog/ssrBlogFetchers.ts
import { cache } from "react";
import { ssrApiFetch } from "@/lib/utils/ssrFetch";
import type { IBlogPost } from "@/types/blogPost.types";

export const getAdminBlogPostById = cache(async (id: string) => {
  const res = await ssrApiFetch<{ data: { blogPost: any } }>(`/api/v1/admin/blog/${encodeURIComponent(id)}`);
  return res.data.blogPost;
});

export const getPublicBlogPostBySlug = cache(async (slug: string) => {
  const res = await ssrApiFetch<{ data: { blogPost: IBlogPost } }>(
    `/api/v1/blog/${encodeURIComponent(slug)}`,
  );
  return res.data.blogPost;
});
