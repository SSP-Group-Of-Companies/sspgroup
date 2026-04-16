// src/app/(admin)/admin/blog/AdminBlogListClient.tsx
"use client";

import * as React from "react";
import { useRouter } from "next/navigation";
import { cn } from "@/lib/cn";
import {
  adminArchivePost,
  adminBulkDeletePosts,
  adminDeletePost,
  adminPublishPost,
  adminUnpublishPost,
} from "@/lib/utils/blog/adminBlogApi";
import { EBlogStatus } from "@/types/blogPost.types";
import { useAdminTheme } from "@/app/(admin)/components/theme/AdminThemeProvider";

import { Checkbox } from "@/app/(admin)/components/ui/Checkbox";
import { SoftButton, IconButton } from "@/app/(admin)/components/ui/Buttons";

import {
  AdminListBulkBar,
  AdminListErrorAlert,
  AdminListFilterCard,
  AdminListFilterToolbar,
  AdminListPageHeader,
  AdminListPageShell,
  AdminListPaginationBar,
  AdminListTableShell,
  useAdminConfirmRun,
  useAdminUrlSyncedFilters,
} from "@/app/(admin)/components/admin-list";

import {
  FileText,
  MoreHorizontal,
  Pencil,
  Eye,
  Upload,
  Download,
  Archive,
  Trash2,
  X,
} from "lucide-react";

function statusPill(status: string, isDark: boolean) {
  const base =
    "inline-flex items-center gap-1 rounded-full border px-2.5 py-1 text-[11px] font-semibold tracking-wide";

  if (status === "PUBLISHED")
    return cn(
      base,
      isDark
        ? "border-emerald-500/25 bg-emerald-500/10 text-emerald-100"
        : "border-emerald-200 bg-emerald-50 text-emerald-700",
    );

  if (status === "DRAFT")
    return cn(
      base,
      isDark
        ? "border-amber-500/25 bg-amber-500/10 text-amber-100"
        : "border-amber-200 bg-amber-50 text-amber-700",
    );

  return cn(
    base,
    isDark
      ? "border-white/10 bg-white/5 text-[var(--dash-muted)]"
      : "border-gray-200 bg-gray-50 text-gray-700",
  );
}

function RowMenu({
  busy,
  onArchive,
  onDelete,
}: {
  busy: boolean;
  onArchive: () => void;
  onDelete: () => void;
}) {
  const [open, setOpen] = React.useState(false);
  const ref = React.useRef<HTMLDivElement | null>(null);

  React.useEffect(() => {
    function onDoc(e: MouseEvent) {
      if (!ref.current) return;
      if (!ref.current.contains(e.target as Node)) setOpen(false);
    }
    document.addEventListener("mousedown", onDoc);
    return () => document.removeEventListener("mousedown", onDoc);
  }, []);

  React.useEffect(() => {
    function onKey(e: KeyboardEvent) {
      if (e.key === "Escape") setOpen(false);
    }
    if (open) document.addEventListener("keydown", onKey);
    return () => document.removeEventListener("keydown", onKey);
  }, [open]);

  return (
    <div ref={ref} className="relative">
      <IconButton title="More actions" disabled={busy} onClick={() => setOpen((v) => !v)}>
        <MoreHorizontal className="h-4 w-4" />
      </IconButton>

      {open ? (
        <div
          className={cn(
            "absolute right-0 z-[95] mt-2 w-52 overflow-hidden rounded-3xl border",
            "border-[var(--dash-border)] bg-[var(--dash-surface)] shadow-[var(--dash-shadow)]",
          )}
          role="menu"
        >
          <button
            type="button"
            disabled={busy}
            onClick={() => {
              setOpen(false);
              onArchive();
            }}
            className={cn(
              "flex w-full cursor-pointer items-center gap-2 px-3 py-2.5 text-left text-sm transition disabled:cursor-not-allowed",
              "text-[var(--dash-text)] hover:bg-[var(--dash-surface-2)] disabled:opacity-50",
            )}
            role="menuitem"
          >
            <Archive className="h-4 w-4 text-amber-500" />
            Archive
          </button>

          <div className="h-px bg-[var(--dash-border)]" />

          <button
            type="button"
            disabled={busy}
            onClick={() => {
              setOpen(false);
              onDelete();
            }}
            className={cn(
              "flex w-full cursor-pointer items-center gap-2 px-3 py-2.5 text-left text-sm transition disabled:cursor-not-allowed",
              "text-red-600 hover:bg-red-500/10 disabled:opacity-50",
              "dark:text-red-300",
            )}
            role="menuitem"
          >
            <Trash2 className="h-4 w-4" />
            Delete
          </button>
        </div>
      ) : null}
    </div>
  );
}

export default function AdminBlogListClient({
  initialItems,
  initialMeta,
}: {
  initialItems: any[];
  initialMeta: any;
}) {
  const router = useRouter();
  const { resolvedTheme } = useAdminTheme();
  const isDark = resolvedTheme === "dark";

  const items = initialItems ?? [];
  const meta = initialMeta ?? {};

  const filters = useAdminUrlSyncedFilters("/admin/blog");
  const [selected, setSelected] = React.useState<string[]>([]);
  const [busy, setBusy] = React.useState(false);
  const [err, setErr] = React.useState<string | null>(null);
  const [actionPending, startActionTransition] = React.useTransition();

  async function run(fn: () => Promise<unknown>) {
    setErr(null);
    setBusy(true);
    try {
      await fn();
      startActionTransition(() => {
        router.refresh();
      });
      setSelected([]);
    } catch (e: any) {
      setErr(e?.message || "Action failed");
    } finally {
      setBusy(false);
    }
  }

  const { requestConfirm, confirmModal } = useAdminConfirmRun({
    busy,
    execute: run,
  });

  function openPreview(slug: string) {
    window.open(`/insights/${encodeURIComponent(slug)}`, "_blank", "noopener,noreferrer");
  }

  const allChecked = items.length > 0 && selected.length === items.length;

  return (
    <AdminListPageShell>
      {confirmModal}

      <AdminListFilterCard overflowHidden>
        <div className="p-5">
          <AdminListPageHeader
            icon={FileText}
            title="Blog posts"
            description="Manage drafts, publishing, archive, deletions."
          />

          <AdminListErrorAlert error={err} isDark={isDark} onDismiss={() => setErr(null)} />

          <AdminListFilterToolbar
            q={filters.q}
            onQChange={filters.handleQChange}
            searchPlaceholder="Search title, slug…"
            status={filters.status}
            onStatusChange={filters.handleStatusChange}
            statusOptions={[
              { value: "DRAFT", label: "Draft" },
              { value: "PUBLISHED", label: "Published" },
              { value: "ARCHIVED", label: "Archived" },
            ]}
            onClearFilters={filters.clearFilters}
            disabled={busy || filters.isPending || actionPending}
          />
        </div>

        <AdminListBulkBar>
          <div className="flex flex-wrap items-center justify-between gap-3">
            <div className="text-sm text-[var(--dash-muted)]">
              Selected:{" "}
              <span className="font-semibold text-[var(--dash-text)]">{selected.length}</span>
            </div>

            <div className="flex items-center gap-2">
              <button
                disabled={busy || filters.isPending || actionPending || selected.length === 0}
                onClick={() =>
                  requestConfirm({
                    tone: "danger",
                    title: "Bulk delete posts?",
                    description: (
                      <>
                        You are about to delete{" "}
                        <span className="font-semibold text-[var(--dash-text)]">
                          {selected.length}
                        </span>{" "}
                        post(s). This cannot be undone.
                      </>
                    ),
                    confirmLabel: "Delete",
                    action: async () => {
                      await adminBulkDeletePosts(selected);
                    },
                  })
                }
                className={cn(
                  "inline-flex h-10 cursor-pointer items-center gap-2 rounded-2xl border px-3 text-sm font-semibold transition disabled:cursor-not-allowed",
                  "focus:outline-none focus-visible:ring-2 focus-visible:ring-red-500/30",
                  "disabled:cursor-not-allowed disabled:opacity-50",
                  isDark
                    ? "border-red-500/25 bg-red-600/15 text-red-50 hover:bg-red-600/20"
                    : "border-red-200 bg-red-50 text-red-900 hover:bg-red-100",
                )}
              >
                <Trash2 className="h-4 w-4" />
                Bulk delete
              </button>

              {selected.length ? (
                <SoftButton
                  icon={<X className="h-4 w-4" />}
                  label="Clear"
                  disabled={busy || filters.isPending || actionPending}
                  onClick={() => setSelected([])}
                />
              ) : null}
            </div>
          </div>
        </AdminListBulkBar>
      </AdminListFilterCard>

      <AdminListTableShell>
        <div className="overflow-x-auto">
          <table className="w-full text-left text-sm">
            <thead className="sticky top-0 z-10">
              <tr className="border-b border-[var(--dash-border)] bg-[var(--dash-surface-2)]/60 backdrop-blur">
                <th className="px-4 py-3">
                  <Checkbox
                    checked={allChecked}
                    disabled={busy || filters.isPending || actionPending || items.length === 0}
                    onChange={(next) => setSelected(next ? items.map((x) => String(x.id)) : [])}
                    label="Select all"
                  />
                </th>
                <th className="px-4 py-3 font-semibold text-[var(--dash-muted)]">Title</th>
                <th className="px-4 py-3 font-semibold text-[var(--dash-muted)]">Author</th>
                <th className="px-4 py-3 font-semibold text-[var(--dash-muted)]">Read</th>
                <th className="px-4 py-3 font-semibold text-[var(--dash-muted)]">Views</th>
                <th className="px-4 py-3 font-semibold text-[var(--dash-muted)]">Status</th>
                <th className="px-4 py-3 font-semibold text-[var(--dash-muted)]">Updated</th>
                <th className="px-4 py-3 text-right font-semibold text-[var(--dash-muted)]">
                  Actions
                </th>
              </tr>
            </thead>

            <tbody>
              {items.map((p) => {
                const id = String(p.id);
                const isPublished = p.status === EBlogStatus.PUBLISHED;

                const authorName = p?.author?.name || p?.author?.email || "—";
                const reading = p?.readingTimeMinutes != null ? `${p.readingTimeMinutes}m` : "—";
                const views = p?.viewCount != null ? String(p.viewCount) : "0";

                return (
                  <tr
                    key={id}
                    className={cn(
                      "border-b border-[var(--dash-border)]/70 last:border-b-0",
                      "transition hover:bg-[var(--dash-surface-2)]/45",
                    )}
                  >
                    <td className="px-4 py-3">
                      <Checkbox
                        checked={selected.includes(id)}
                        disabled={busy || filters.isPending || actionPending}
                        onChange={() =>
                          setSelected((prev) =>
                            prev.includes(id) ? prev.filter((x) => x !== id) : [...prev, id],
                          )
                        }
                        label={`Select ${p.title}`}
                      />
                    </td>

                    <td className="px-4 py-3">
                      <div className="font-semibold text-[var(--dash-text)]">{p.title}</div>
                      <div className="mt-0.5 text-xs text-[var(--dash-muted)]">{p.slug}</div>
                    </td>

                    <td className="px-4 py-3 text-[var(--dash-text)]/90">{authorName}</td>
                    <td className="px-4 py-3 text-[var(--dash-text)]/85">{reading}</td>
                    <td className="px-4 py-3 text-[var(--dash-text)]/85">{views}</td>

                    <td className="px-4 py-3">
                      <span className={statusPill(p.status, isDark)}>{p.status}</span>
                    </td>

                    <td className="px-4 py-3 text-[var(--dash-muted)]">
                      {p.updatedAt ? new Date(p.updatedAt).toLocaleString() : "-"}
                    </td>

                    <td className="px-4 py-3">
                      <div className="flex items-center justify-end gap-2">
                        <SoftButton
                          disabled={busy || filters.isPending || actionPending}
                          onClick={() => {
                            if (isPublished) {
                              requestConfirm({
                                tone: "danger",
                                title: "Unpublish this post?",
                                description:
                                  "This will remove it from the public blog until published again.",
                                confirmLabel: "Unpublish",
                                action: async () => {
                                  await adminUnpublishPost(id);
                                },
                              });
                            } else {
                              run(async () => {
                                await adminPublishPost(id, null);
                              });
                            }
                          }}
                          icon={
                            isPublished ? (
                              <Download className="h-4 w-4" />
                            ) : (
                              <Upload className="h-4 w-4" />
                            )
                          }
                          label={isPublished ? "Unpublish" : "Publish"}
                        />

                        <IconButton
                          title="Edit"
                          disabled={busy || filters.isPending || actionPending}
                          onClick={() => router.push(`/admin/blog/${id}`)}
                        >
                          <Pencil className="h-4 w-4" />
                        </IconButton>

                        <IconButton
                          title={
                            isPublished ? "Preview public page" : "Preview disabled (publish first)"
                          }
                          disabled={!isPublished || busy || filters.isPending || actionPending}
                          onClick={() => openPreview(String(p.slug))}
                        >
                          <Eye className="h-4 w-4" />
                        </IconButton>

                        <RowMenu
                          busy={busy || filters.isPending}
                          onArchive={() =>
                            requestConfirm({
                              tone: "danger",
                              title: "Archive this post?",
                              description:
                                "Archived posts are hidden from the public blog. You can keep it for records.",
                              confirmLabel: "Archive",
                              action: async () => {
                                await adminArchivePost(id);
                              },
                            })
                          }
                          onDelete={() =>
                            requestConfirm({
                              tone: "danger",
                              title: "Delete this post?",
                              description: "This cannot be undone.",
                              confirmLabel: "Delete",
                              action: async () => {
                                await adminDeletePost(id);
                              },
                            })
                          }
                        />
                      </div>
                    </td>
                  </tr>
                );
              })}

              {!items.length ? (
                <tr>
                  <td colSpan={8} className="px-4 py-10 text-center text-[var(--dash-muted)]">
                    No posts found.
                  </td>
                </tr>
              ) : null}
            </tbody>
          </table>
        </div>

        <AdminListPaginationBar
          page={meta?.page ?? 1}
          totalPages={meta?.totalPages ?? 1}
          hasPrev={meta?.hasPrev}
          hasNext={meta?.hasNext}
          disabled={busy || filters.isPending || actionPending}
          onPrev={() => filters.pushQuery({ page: String(Math.max(1, (meta.page ?? 1) - 1)) })}
          onNext={() => filters.pushQuery({ page: String((meta.page ?? 1) + 1) })}
        />
      </AdminListTableShell>
    </AdminListPageShell>
  );
}
