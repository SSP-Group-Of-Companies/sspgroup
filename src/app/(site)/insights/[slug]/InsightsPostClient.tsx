// src/app/(site)/insights/[slug]/InsightsPostClient.tsx
"use client";

import * as React from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import dynamic from "next/dynamic";
import type { PartialBlock } from "@blocknote/core";
import { Calendar, Clock, User2, ChevronLeft, ChevronRight } from "lucide-react";
import { FOCUS_RING_DARK } from "@/app/(site)/company/faqs/_components/faqStyles";
import { Container } from "@/app/(site)/components/layout/Container";
import { SectionSignalEyebrow } from "@/app/(site)/components/ui/SectionSignalEyebrow";
import { cn } from "@/lib/cn";
import {
  publicCountView,
  publicCreateComment,
  publicFetchComments,
} from "@/lib/utils/blog/publicBlogApi";

const BlockNote = dynamic(() => import("@/components/blocknote/BlockNote"), { ssr: false });

function fmtDate(d?: any) {
  if (!d) return "";
  try {
    return new Date(d).toLocaleDateString(undefined, {
      year: "numeric",
      month: "short",
      day: "numeric",
    });
  } catch {
    return "";
  }
}

function safeInt(v: any, fallback: number) {
  const n = Number(v);
  return Number.isFinite(n) && n > 0 ? n : fallback;
}

export default function InsightsPostClient({
  slug,
  initialPost,
  initialComments,
  initialRelated = [],
  initialCommentsMeta,
}: {
  slug: string;
  initialPost: any;
  initialComments: any[];
  initialRelated?: any[];
  // If your SSR page isn’t passing this yet, we still work (we’ll fetch meta on mount).
  initialCommentsMeta?: any;
}) {
  const router = useRouter();

  // ----- COMMENTS PAGINATION STATE -----
  const DEFAULT_PAGE_SIZE = 10;

  const [comments, setComments] = React.useState<any[]>(initialComments ?? []);
  const [commentsMeta, setCommentsMeta] = React.useState<any>(initialCommentsMeta ?? null);

  const [commentsPage, setCommentsPage] = React.useState<number>(
    safeInt(initialCommentsMeta?.page, 1),
  );
  const [pageSize, setPageSize] = React.useState<number>(
    safeInt(initialCommentsMeta?.pageSize, DEFAULT_PAGE_SIZE),
  );

  const [commentsBusy, setCommentsBusy] = React.useState(false);

  // ----- RELATED -----
  const [related, setRelated] = React.useState<any[]>(initialRelated ?? []);

  // ----- COMMENT FORM -----
  const [name, setName] = React.useState("");
  const [email, setEmail] = React.useState("");
  const [comment, setComment] = React.useState("");
  const [busy, setBusy] = React.useState(false);
  const [err, setErr] = React.useState<string | null>(null);

  const bannerUrl = initialPost?.bannerImage?.url ?? null;

  // Helpers derived from meta (supports both “totalPages/hasPrev/hasNext” or “total”)
  const totalPages = React.useMemo(() => {
    const m = commentsMeta ?? {};
    if (typeof m.totalPages === "number") return m.totalPages;
    const total = typeof m.total === "number" ? m.total : undefined;
    const ps = typeof m.pageSize === "number" ? m.pageSize : pageSize;
    if (typeof total === "number" && ps > 0) return Math.max(1, Math.ceil(total / ps));
    return 1;
  }, [commentsMeta, pageSize]);

  const hasPrev = React.useMemo(() => {
    const m = commentsMeta ?? {};
    if (typeof m.hasPrev === "boolean") return m.hasPrev;
    return commentsPage > 1;
  }, [commentsMeta, commentsPage]);

  const hasNext = React.useMemo(() => {
    const m = commentsMeta ?? {};
    if (typeof m.hasNext === "boolean") return m.hasNext;
    return commentsPage < totalPages;
  }, [commentsMeta, commentsPage, totalPages]);

  async function fetchComments(page: number, nextPageSize = pageSize) {
    setCommentsBusy(true);
    try {
      const data = await publicFetchComments(slug, {
        page,
        pageSize: nextPageSize,
        sortBy: "createdAt",
        sortDir: "desc",
      });
      setComments(data.items ?? []);
      setCommentsMeta(data.meta ?? null);
      setCommentsPage(page);
      setPageSize(nextPageSize);
    } finally {
      setCommentsBusy(false);
    }
  }

  // Ensure we have meta even if SSR didn’t provide it (and avoid 200-size fetch)
  React.useEffect(() => {
    if (commentsMeta) return;
    fetchComments(1, DEFAULT_PAGE_SIZE).catch(() => {});
  }, [slug]);

  async function submit() {
    setErr(null);
    setBusy(true);
    try {
      await publicCreateComment(slug, { name, email: email || null, comment });
      setName("");
      setEmail("");
      setComment("");

      // After posting, jump to page 1 to show newest comment (since sort desc)
      await fetchComments(1, pageSize);

      router.refresh();
    } catch (e: any) {
      setErr(e?.message || "Failed to post comment");
    } finally {
      setBusy(false);
    }
  }

  // Fallback: if SSR didn’t pass related, fetch by category (first category)
  React.useEffect(() => {
    async function run() {
      if (related?.length) return;
      const catId = (initialPost?.categoryIds ?? [])?.[0];
      if (!catId) return;

      const qs = new URLSearchParams({
        page: "1",
        limit: "6",
        sortBy: "newest",
        categoryId: String(catId),
      });

      const res = await fetch(`/api/v1/blog?${qs.toString()}`);
      if (!res.ok) return;
      const json = await res.json();
      const items = (json?.data?.items ?? []).filter((p: any) => p?.slug && p.slug !== slug);
      setRelated(items.slice(0, 3));
    }
    run();
  }, [slug]); // keep as you had

  // Count views once per tab session
  React.useEffect(() => {
    // only count if the post is present + published
    if (!slug) return;
    if (initialPost?.status && String(initialPost.status) !== "PUBLISHED") return;

    const key = `ssp_insight_viewed:${slug}`;
    try {
      if (typeof window === "undefined") return;

      // sessionStorage = once per tab session (good UX, avoids inflating on back/forward)
      const already = window.sessionStorage.getItem(key);
      if (already) return;

      window.sessionStorage.setItem(key, "1");
      publicCountView(slug);
    } catch {
      // if storage blocked, fall back to counting (rare)
      publicCountView(slug);
    }
  }, [slug]); // intentionally only on slug change

  return (
    <div className="min-h-svh bg-[linear-gradient(180deg,var(--color-surface-0)_0%,var(--color-surface-1)_52%,var(--color-surface-1)_100%)]">
      {/* HERO */}
      <div className="relative overflow-hidden border-b border-white/10">
        <div className="absolute inset-0">
          <div className="absolute inset-0 bg-[color:var(--color-company-ink)]" />
          {bannerUrl ? (
            <img
              src={bannerUrl}
              alt={
                initialPost?.title
                  ? `Banner image for ${String(initialPost.title)}`
                  : "Insights article banner"
              }
              className="h-full w-full object-cover opacity-40"
            />
          ) : null}
          <div className="absolute inset-0 bg-gradient-to-r from-[color:var(--color-company-hero-midnight-start)]/88 via-[color:var(--color-company-hero-midnight-mid)]/72 to-[color:var(--color-company-hero-midnight-end)]/42" />
        </div>

        <Container className="site-page-container relative py-12 sm:py-14">
          <div className="mb-5">
            <Link
              href="/insights"
              className={cn(
                "inline-flex items-center gap-1.5 rounded text-xs font-medium text-white/50 transition-colors hover:text-white/75",
                FOCUS_RING_DARK,
              )}
            >
              <ChevronLeft className="h-3.5 w-3.5" aria-hidden />
              Back to Insights
            </Link>
          </div>

          <div>
            <SectionSignalEyebrow label="Insights" light />
          </div>

          <h1 className="mt-4 max-w-3xl text-3xl font-semibold tracking-tight text-white sm:text-4xl">
            {initialPost?.title}
          </h1>

          <div className="mt-3 flex flex-wrap items-center gap-4 text-sm text-white/80">
            {initialPost?.author?.name ? <span>By {initialPost.author.name}</span> : null}
            {initialPost?.publishedAt ? (
              <span className="inline-flex items-center gap-1.5">
                <Calendar className="h-4 w-4" />
                {fmtDate(initialPost.publishedAt)}
              </span>
            ) : null}
            {initialPost?.readingTimeMinutes ? (
              <span className="inline-flex items-center gap-1.5">
                <Clock className="h-4 w-4" />
                {initialPost.readingTimeMinutes} min read
              </span>
            ) : null}
          </div>
        </Container>
      </div>

      {/* BODY */}
      <Container className="site-page-container py-10">
        <div className="grid gap-8 lg:grid-cols-[1fr_360px]">
          {/* LEFT */}
          <div>
            <div className="site-card-surface rounded-[28px] p-7">
              {initialPost?.excerpt ? (
                <div className="mb-6 rounded-2xl border border-[color:var(--color-border-light)] bg-[color:var(--color-surface-0-light)] p-4 text-sm text-[color:var(--color-muted-light)]">
                  {initialPost.excerpt}
                </div>
              ) : null}

              <div className="prose max-w-none">
                <BlockNote
                  editable={false}
                  initialContent={(initialPost.body as PartialBlock[]) ?? []}
                />
              </div>
            </div>

            {/* COMMENTS */}
            <div className="site-card-surface mt-8 rounded-[28px] p-6">
              <div className="flex items-center justify-between">
                <div className="text-lg font-semibold text-[color:var(--color-text-light)]">
                  Comments
                </div>

                <div className="flex items-center gap-2 text-xs text-[color:var(--color-muted-light)]">
                  {commentsMeta?.total ? <span>{commentsMeta.total} total</span> : null}
                  {commentsBusy ? (
                    <span className="rounded-full border border-[color:var(--color-border-light)] bg-[color:var(--color-surface-0-light)] px-2 py-1">
                      Loading…
                    </span>
                  ) : null}
                </div>
              </div>

              {err ? (
                <div className="mt-3 rounded-2xl border border-[color:var(--color-brand-100)] bg-[color:var(--color-brand-50)] px-4 py-3 text-sm text-[color:var(--color-text-light)]">
                  {err}
                </div>
              ) : null}

              {/* Form */}
              <div className="mt-4 rounded-2xl border border-[color:var(--color-border-light)] bg-[color:var(--color-surface-0-light)]/60 p-4">
                <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
                  <div>
                    <label className="mb-1 block text-xs font-medium text-[color:var(--color-muted-light)]">
                      Name *
                    </label>
                    <input
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      placeholder="Your name"
                      className="site-input-light focus-ring-light w-full rounded-xl px-3 py-2 text-sm transition outline-none"
                    />
                  </div>

                  <div>
                    <label className="mb-1 block text-xs font-medium text-[color:var(--color-muted-light)]">
                      Email (optional)
                    </label>
                    <input
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      placeholder="you@company.com"
                      className="site-input-light focus-ring-light w-full rounded-xl px-3 py-2 text-sm transition outline-none"
                    />
                  </div>
                </div>

                <div className="mt-3">
                  <label className="mb-1 block text-xs font-medium text-[color:var(--color-muted-light)]">
                    Comment
                  </label>
                  <textarea
                    value={comment}
                    onChange={(e) => setComment(e.target.value)}
                    placeholder="Write a comment…"
                    rows={3}
                    className="site-input-light focus-ring-light w-full rounded-xl px-3 py-2 text-sm transition outline-none"
                  />
                </div>

                <div className="mt-3 flex items-center justify-between gap-3">
                  <div className="text-xs text-[color:var(--color-muted-light)]">
                    Be respectful. Your comment appears immediately.
                  </div>

                  <button
                    disabled={busy || !name.trim() || !comment.trim()}
                    onClick={submit}
                    className="focus-ring-light inline-flex items-center justify-center rounded-xl bg-[color:var(--color-ssp-ink-800)] px-3 py-2 text-sm font-semibold text-white shadow-sm transition hover:bg-[color:var(--color-ssp-ink-900)] disabled:opacity-50"
                  >
                    {busy ? "Posting…" : "Post"}
                  </button>
                </div>
              </div>

              {/* Thread */}
              <div className="mt-6">
                {comments.length ? (
                  <>
                    <div className="divide-y divide-[color:var(--color-border-light)]">
                      {comments.map((c) => {
                        const initial = (c?.name?.trim?.()?.[0] || "U").toUpperCase();
                        return (
                          <div key={String(c.id)} className="py-4">
                            <div className="flex items-start gap-3">
                              <div className="mt-0.5 flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-[color:var(--color-ssp-ink-800)] text-xs font-semibold text-white">
                                {initial}
                              </div>

                              <div className="min-w-0 flex-1">
                                <div className="flex flex-wrap items-center gap-x-2 gap-y-1">
                                  <div className="text-sm font-semibold text-[color:var(--color-text-light)]">
                                    {c.name}
                                  </div>
                                  <div className="text-xs text-[color:var(--color-muted-light)]">
                                    •
                                  </div>
                                  <div className="text-xs text-[color:var(--color-muted-light)]">
                                    {c.createdAt ? new Date(c.createdAt).toLocaleString() : ""}
                                  </div>
                                </div>

                                <div className="mt-1 text-sm leading-relaxed whitespace-pre-wrap text-[color:var(--color-muted-light)]">
                                  {c.comment}
                                </div>
                              </div>
                            </div>
                          </div>
                        );
                      })}
                    </div>

                    {/* Pagination */}
                    <div className="mt-6 flex items-center justify-center">
                      <div className="inline-flex items-center gap-2 rounded-full border border-[color:var(--color-border-light)] bg-white px-3 py-1.5 shadow-sm">
                        <button
                          type="button"
                          disabled={commentsBusy || !hasPrev}
                          onClick={() => fetchComments(Math.max(1, commentsPage - 1))}
                          className="focus-ring-light inline-flex h-8 w-8 items-center justify-center rounded-full text-[color:var(--color-muted-light)] transition hover:bg-[color:var(--color-surface-0-light)] disabled:opacity-40"
                          aria-label="Previous page"
                        >
                          <ChevronLeft className="h-4 w-4" />
                        </button>

                        <div className="px-2 text-xs text-[color:var(--color-muted-light)]">
                          Page{" "}
                          <span className="font-semibold text-[color:var(--color-text-light)]">
                            {commentsPage}
                          </span>{" "}
                          of{" "}
                          <span className="font-semibold text-[color:var(--color-text-light)]">
                            {totalPages}
                          </span>
                        </div>

                        <button
                          type="button"
                          disabled={commentsBusy || !hasNext}
                          onClick={() => fetchComments(commentsPage + 1)}
                          className="focus-ring-light inline-flex h-8 w-8 items-center justify-center rounded-full text-[color:var(--color-muted-light)] transition hover:bg-[color:var(--color-surface-0-light)] disabled:opacity-40"
                          aria-label="Next page"
                        >
                          <ChevronRight className="h-4 w-4" />
                        </button>
                      </div>
                    </div>
                  </>
                ) : (
                  <div className="rounded-2xl border border-dashed border-[color:var(--color-border-light)] bg-white p-4 text-sm text-[color:var(--color-muted-light)]">
                    No comments yet. Be the first to share your thoughts.
                  </div>
                )}
              </div>
            </div>
          </div>

          {/* RIGHT (sticky) */}
          <aside className="hidden lg:block">
            <div className="sticky top-6 space-y-5">
              {/* About author */}
              <div className="site-card-surface rounded-[28px] p-5">
                <div className="text-sm font-semibold text-[color:var(--color-text-light)]">
                  About the Author
                </div>

                <div className="mt-4 flex items-start gap-3">
                  <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-[color:var(--color-ssp-ink-800)] text-white">
                    <User2 className="h-5 w-5" />
                  </div>
                  <div className="min-w-0">
                    <div className="text-sm font-semibold text-[color:var(--color-text-light)]">
                      {initialPost?.author?.name ?? "SSP Group"}
                    </div>
                    <div className="mt-3 text-sm text-[color:var(--color-muted-light)]">
                      SSP contributor sharing operational perspective on transportation strategy,
                      cross-border execution, and disciplined freight delivery.
                    </div>
                  </div>
                </div>
              </div>

              {/* Related */}
              <div className="site-card-surface rounded-[28px] p-5">
                <div className="text-sm font-semibold text-[color:var(--color-text-light)]">
                  Related Insights
                </div>

                <div className="mt-3 divide-y divide-[color:var(--color-border-light)]">
                  {related.slice(0, 3).map((p: any) => (
                    <Link
                      key={String(p.id)}
                      href={`/insights/${encodeURIComponent(p.slug)}`}
                      className="block py-3 transition hover:opacity-80"
                    >
                      <div className="line-clamp-2 text-sm font-semibold text-[color:var(--color-text-light)]">
                        {p.title}
                      </div>
                      <div className="mt-1 text-xs text-[color:var(--color-muted-light)]">
                        {fmtDate(p.publishedAt)}
                      </div>
                    </Link>
                  ))}
                  {!related.length ? (
                    <div className="py-3 text-sm text-[color:var(--color-muted-light)]">
                      No related insights.
                    </div>
                  ) : null}
                </div>
              </div>
            </div>
          </aside>
        </div>
      </Container>
    </div>
  );
}
