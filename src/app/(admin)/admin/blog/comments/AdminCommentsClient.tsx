// src/app/(admin)/admin/blog/comments/AdminCommentsClient.tsx
"use client";

import * as React from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { adminDeleteComment } from "@/lib/utils/blog/adminBlogApi";
import { cn } from "@/lib/cn";
import { useAdminTheme } from "@/app/(admin)/components/theme/AdminThemeProvider";
import { useAdminConfirmRun } from "@/app/(admin)/components/admin-list";
import { CalendarClock, ExternalLink, MessageSquareText, Trash2 } from "lucide-react";

export default function AdminCommentsClient({
  initialItems,
  initialMeta,
}: {
  initialItems: any[];
  initialMeta: any;
}) {
  const router = useRouter();
  const { resolvedTheme } = useAdminTheme();
  const isDark = resolvedTheme === "dark";

  const [busyId, setBusyId] = React.useState<string | null>(null);
  const [err, setErr] = React.useState<string | null>(null);

  const { requestConfirm, confirmModal } = useAdminConfirmRun({
    busy: Boolean(busyId),
  });

  async function del(id: string) {
    requestConfirm({
      tone: "danger",
      title: "Delete this comment?",
      description: <span className="text-[var(--dash-muted)]">This action cannot be undone.</span>,
      confirmLabel: "Delete",
      action: async () => {
        setBusyId(id);
        setErr(null);
        try {
          await adminDeleteComment(id);
          router.refresh();
        } catch (e: any) {
          setErr(e?.message || "Failed");
        } finally {
          setBusyId(null);
        }
      },
    });
  }

  return (
    <div className="admin-ambient">
      {confirmModal}

      <div className="mx-auto max-w-5xl px-6 py-10">
        {/* Header */}
        <div
          className={cn(
            "mb-6 rounded-3xl border p-6 shadow-[var(--dash-shadow)]",
            "border-[var(--dash-border)] bg-[var(--dash-surface)]",
          )}
        >
          <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
            <div>
              <div className="flex items-center gap-3 text-2xl font-semibold tracking-tight text-[var(--dash-text)]">
                <span
                  className={cn(
                    "inline-flex h-11 w-11 items-center justify-center rounded-xl border",
                    "border-[var(--dash-border)] bg-[var(--dash-accent-muted)] text-[var(--dash-accent)]",
                  )}
                >
                  <MessageSquareText className="h-6 w-6" aria-hidden />
                </span>
                Comments
              </div>
              <div className="mt-1 text-sm text-[var(--dash-muted)]">
                Guest comments moderation (delete only).
              </div>
            </div>
          </div>

          {err ? (
            <div
              className={cn(
                "mt-4 rounded-xl border px-4 py-3 text-sm",
                isDark
                  ? "border-red-500/25 bg-red-600/15 text-red-50"
                  : "border-red-200 bg-red-50 text-red-900",
              )}
            >
              {err}
            </div>
          ) : null}
        </div>

        {/* List */}
        <div className="space-y-4">
          {initialItems.map((c) => {
            const postTitle = c?.postTitle ?? null;
            const postUrl =
              c?.postAdminUrl ??
              (c?.blogPostId ? `/admin/blog/${encodeURIComponent(String(c.blogPostId))}` : null);

            const created = c?.createdAt ? new Date(c.createdAt) : null;
            const isBusy = busyId === String(c.id);

            return (
              <div
                key={String(c.id)}
                className={cn(
                  "group rounded-3xl border p-6 transition",
                  "border-[var(--dash-border)] bg-[var(--dash-surface)] shadow-[var(--dash-shadow)]/14",
                  "hover:-translate-y-[1px] hover:bg-[var(--dash-surface-2)]",
                )}
              >
                {/* Top row */}
                <div className="flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between">
                  <div className="min-w-0">
                    <div className="text-sm font-semibold text-[var(--dash-text)]">
                      {c.name}{" "}
                      {c.email ? (
                        <span className="font-normal text-[var(--dash-muted)]">({c.email})</span>
                      ) : null}
                    </div>

                    <div className="mt-2 flex flex-wrap items-center gap-x-4 gap-y-2 text-xs text-[var(--dash-muted)]">
                      <div className="inline-flex items-center gap-1.5">
                        <CalendarClock className="h-3.5 w-3.5" />
                        <span>{created ? created.toLocaleString() : ""}</span>
                      </div>

                      <div className="inline-flex items-center gap-1.5">
                        <ExternalLink className="h-3.5 w-3.5" />
                        {postUrl ? (
                          <Link
                            href={postUrl}
                            className={cn(
                              "max-w-[520px] truncate font-medium underline underline-offset-2 transition",
                              "text-[var(--dash-text)] decoration-[var(--dash-border)] hover:decoration-[var(--dash-muted)]",
                            )}
                            title={postTitle ?? "Open post"}
                          >
                            {postTitle ?? "View post"}
                          </Link>
                        ) : (
                          <span className="text-[var(--dash-muted)]">Post unavailable</span>
                        )}
                        {!postTitle ? (
                          <span
                            className={cn(
                              "ml-1 rounded-full border px-2 py-0.5 text-[11px]",
                              "border-[var(--dash-border)] bg-[var(--dash-bg)] text-[var(--dash-muted)]",
                            )}
                          >
                            deleted
                          </span>
                        ) : null}
                      </div>
                    </div>
                  </div>

                  <button
                    disabled={!!busyId}
                    onClick={() => del(String(c.id))}
                    className={cn(
                      "inline-flex cursor-pointer items-center justify-center gap-2 rounded-xl border px-3.5 py-2 text-sm font-semibold transition",
                      isDark
                        ? "border-red-500/25 bg-red-600/15 text-red-50 hover:bg-red-600/20"
                        : "border-red-200 bg-red-50 text-red-900 hover:bg-red-100",
                      "shadow-[var(--dash-shadow)]/10 disabled:cursor-not-allowed disabled:opacity-50",
                      "focus:outline-none focus-visible:ring-2 focus-visible:ring-red-500/30",
                    )}
                    title="Delete Comment"
                  >
                    <Trash2 className="h-4 w-4" />
                    <span className="hidden sm:inline">{isBusy ? "Deleting…" : "Delete"}</span>
                  </button>
                </div>

                {/* Comment body */}
                <div
                  className={cn(
                    "mt-4 rounded-3xl border p-4",
                    "border-[var(--dash-border)] bg-[var(--dash-bg)]",
                  )}
                >
                  <div className="text-sm leading-relaxed whitespace-pre-wrap text-[var(--dash-text)]">
                    {c.comment}
                  </div>
                </div>

                {/* Subtle footer */}
                <div className="mt-4 flex items-center justify-between text-xs text-[var(--dash-muted)]">
                  <div className="opacity-0 transition group-hover:opacity-100">
                    {isBusy ? "Working…" : ""}
                  </div>
                  <div className="opacity-0 transition group-hover:opacity-100">
                    Comment ID: {String(c.id)}
                  </div>
                </div>
              </div>
            );
          })}

          {!initialItems.length ? (
            <div
              className={cn(
                "rounded-3xl border p-10 text-center text-sm shadow-[var(--dash-shadow)]/14",
                "border-[var(--dash-border)] bg-[var(--dash-surface)] text-[var(--dash-muted)]",
              )}
            >
              No comments.
            </div>
          ) : null}
        </div>

        {/* Pagination */}
        <div className="mt-8 flex flex-col gap-3 text-sm text-[var(--dash-muted)] sm:flex-row sm:items-center sm:justify-between">
          <div>
            Page{" "}
            <span className="font-semibold text-[var(--dash-text)]">{initialMeta?.page ?? 1}</span>{" "}
            of{" "}
            <span className="font-semibold text-[var(--dash-text)]">
              {initialMeta?.totalPages ?? 1}
            </span>
          </div>

          <div className="flex gap-2">
            <button
              disabled={!initialMeta?.hasPrev || !!busyId}
              onClick={() =>
                router.push(`/admin/blog/comments?page=${Math.max(1, (initialMeta.page ?? 1) - 1)}`)
              }
              className={cn(
                "cursor-pointer rounded-xl border px-3.5 py-2 text-sm font-semibold transition",
                "border-[var(--dash-border)] bg-[var(--dash-surface)] text-[var(--dash-text)]",
                "hover:bg-[var(--dash-surface-2)] disabled:cursor-not-allowed disabled:opacity-50",
                "focus:outline-none focus-visible:ring-2 focus-visible:ring-[var(--dash-accent-soft)]",
              )}
            >
              Prev
            </button>

            <button
              disabled={!initialMeta?.hasNext || !!busyId}
              onClick={() =>
                router.push(`/admin/blog/comments?page=${(initialMeta.page ?? 1) + 1}`)
              }
              className={cn(
                "cursor-pointer rounded-xl border px-3.5 py-2 text-sm font-semibold transition",
                "border-[var(--dash-border)] bg-[var(--dash-surface)] text-[var(--dash-text)]",
                "hover:bg-[var(--dash-surface-2)] disabled:cursor-not-allowed disabled:opacity-50",
                "focus:outline-none focus-visible:ring-2 focus-visible:ring-[var(--dash-accent-soft)]",
              )}
            >
              Next
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
