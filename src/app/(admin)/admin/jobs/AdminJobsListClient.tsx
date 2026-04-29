// src/app/(admin)/admin/jobs/AdminJobsListClient.tsx
"use client";

import * as React from "react";
import { useRouter } from "next/navigation";
import { cn } from "@/lib/cn";
import { useAdminTheme } from "@/app/(admin)/components/theme/AdminThemeProvider";
import { Checkbox } from "@/app/(admin)/components/ui/Checkbox";
import { SoftButton, IconButton } from "@/app/(admin)/components/ui/Buttons";
import SocialShareControls from "@/components/social/SocialShareControls";

import {
  AdminListBulkBar,
  AdminListErrorAlert,
  AdminListFilterCard,
  AdminListFilterToolbar,
  AdminListPageHeader,
  AdminListPageShell,
  AdminListPaginationBar,
  AdminListTableShell,
  AdminRowMenu,
  type AdminRowMenuAction,
  useAdminConfirmRun,
  useAdminUrlSyncedFilters,
} from "@/app/(admin)/components/admin-list";

import { Briefcase, ExternalLink, Eye, Pencil, Trash2, X, Users } from "lucide-react";

import { EJobPostingStatus } from "@/types/jobPosting.types";
import {
  adminArchiveJob,
  adminCloseJob,
  adminDeleteJob,
  adminPublishJob,
  adminUnarchiveJob,
} from "@/lib/utils/jobs/adminJobsApi";
import { getAllowedJobActions } from "@/lib/utils/jobs/jobStatusTransitions";

function statusPill(status: string, isDark: boolean) {
  const base =
    "inline-flex items-center gap-1 rounded-full border px-2.5 py-1 text-[11px] font-semibold tracking-wide";

  if (status === EJobPostingStatus.PUBLISHED)
    return cn(
      base,
      isDark
        ? "border-emerald-500/25 bg-emerald-500/10 text-emerald-100"
        : "border-emerald-200 bg-emerald-50 text-emerald-700",
    );
  if (status === EJobPostingStatus.DRAFT)
    return cn(
      base,
      isDark
        ? "border-amber-500/25 bg-amber-500/10 text-amber-100"
        : "border-amber-200 bg-amber-50 text-amber-700",
    );
  if (status === EJobPostingStatus.CLOSED)
    return cn(
      base,
      isDark
        ? "border-sky-500/25 bg-sky-500/10 text-sky-100"
        : "border-sky-200 bg-sky-50 text-sky-700",
    );

  return cn(
    base,
    isDark
      ? "border-white/10 bg-white/5 text-[var(--dash-muted)]"
      : "border-gray-200 bg-gray-50 text-gray-700",
  );
}

function formatEnumLabel(v?: string) {
  if (!v) return "";
  return v
    .replace(/_/g, " ")
    .toLowerCase()
    .replace(/\b\w/g, (m) => m.toUpperCase());
}

export default function AdminJobsListClient({
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

  const filters = useAdminUrlSyncedFilters("/admin/jobs");
  const [busy, setBusy] = React.useState(false);
  const [err, setErr] = React.useState<string | null>(null);
  const [selected, setSelected] = React.useState<string[]>([]);
  const [actionPending, startActionTransition] = React.useTransition();

  async function run(fn: () => Promise<unknown>) {
    setErr(null);
    setBusy(true);
    try {
      await fn();
      startActionTransition(() => router.refresh());
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

  function openPublic(slug: string) {
    window.open(`/careers/${encodeURIComponent(slug)}`, "_blank", "noopener,noreferrer");
  }

  const allChecked = items.length > 0 && selected.length === items.length;

  const selectedItems = React.useMemo(() => {
    const set = new Set(selected);
    return items.filter((x) => set.has(String(x.id)));
  }, [items, selected]);

  const bulkDeletableIds = React.useMemo(
    () => selectedItems.map((x) => String(x.id)),
    [selectedItems],
  );

  const bulkDeleteDisabled =
    busy || filters.isPending || actionPending || bulkDeletableIds.length === 0;

  async function bulkDelete() {
    const ids = bulkDeletableIds.slice();
    if (!ids.length) return;
    for (const id of ids) {
      await adminDeleteJob(id);
    }
  }

  const pending = busy || filters.isPending || actionPending;

  return (
    <AdminListPageShell>
      {confirmModal}

      <AdminListFilterCard overflowHidden>
        <div className="p-5">
          <AdminListPageHeader
            icon={Briefcase}
            title="Job postings"
            description="Create, publish, close, archive, and review applicants."
          />

          <AdminListErrorAlert error={err} isDark={isDark} onDismiss={() => setErr(null)} />

          <AdminListFilterToolbar
            q={filters.q}
            onQChange={filters.handleQChange}
            searchPlaceholder="Search title, department, tags…"
            status={filters.status}
            onStatusChange={filters.handleStatusChange}
            statusOptions={[
              { value: EJobPostingStatus.DRAFT, label: "Draft" },
              { value: EJobPostingStatus.PUBLISHED, label: "Published" },
              { value: EJobPostingStatus.CLOSED, label: "Closed" },
              { value: EJobPostingStatus.ARCHIVED, label: "Archived" },
            ]}
            onClearFilters={filters.clearFilters}
            disabled={pending}
          />
        </div>

        <AdminListBulkBar>
          <div className="flex flex-wrap items-center justify-between gap-3">
            <div className="text-sm text-[var(--dash-muted)]">
              Selected:{" "}
              <span className="font-semibold text-[var(--dash-text)]">{selected.length}</span>
            </div>

            <div className="flex items-center gap-2">
              {selected.length ? (
                <>
                  <SoftButton
                    icon={<X className="h-4 w-4" />}
                    label="Clear"
                    disabled={pending}
                    onClick={() => setSelected([])}
                  />
                  <SoftButton
                    icon={<Trash2 className="h-4 w-4" />}
                    label={`Delete selected (${bulkDeletableIds.length})`}
                    disabled={bulkDeleteDisabled}
                    onClick={() =>
                      requestConfirm({
                        tone: "danger",
                        title: `Delete ${bulkDeletableIds.length} job${bulkDeletableIds.length === 1 ? "" : "s"}?`,
                        description: (
                          <div className="space-y-2">
                            <div>This cannot be undone.</div>
                            <div className="text-xs opacity-80">
                              Tip: If you want to keep a record, use Archive instead of Delete.
                            </div>
                          </div>
                        ),
                        confirmLabel: "Delete",
                        action: bulkDelete,
                      })
                    }
                  />
                </>
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
                    disabled={pending || items.length === 0}
                    onChange={(next) => setSelected(next ? items.map((x) => String(x.id)) : [])}
                    label="Select all"
                  />
                </th>
                <th className="px-4 py-3 font-semibold text-[var(--dash-muted)]">Title</th>
                <th className="px-4 py-3 font-semibold text-[var(--dash-muted)]">Department</th>
                <th className="px-4 py-3 font-semibold text-[var(--dash-muted)]">Type</th>
                <th className="px-4 py-3 font-semibold text-[var(--dash-muted)]">Status</th>
                <th className="px-4 py-3 text-right font-semibold text-[var(--dash-muted)]">
                  Views
                </th>
                <th className="px-4 py-3 text-right font-semibold text-[var(--dash-muted)]">
                  Applications
                </th>
                <th className="px-4 py-3 font-semibold text-[var(--dash-muted)]">Updated</th>
                <th className="px-4 py-3 text-right font-semibold text-[var(--dash-muted)]">
                  Actions
                </th>
              </tr>
            </thead>

            <tbody>
              {items.map((j) => {
                const id = String(j.id);
                const isPublished = j.status === EJobPostingStatus.PUBLISHED;
                const isClosed = j.status === EJobPostingStatus.CLOSED;

                const canPublicPreview = isPublished;

                const { canPublish, canClose, canArchive, canUnarchive } = getAllowedJobActions(
                  j.status,
                );

                const typeLabel =
                  [formatEnumLabel(j.workplaceType), formatEnumLabel(j.employmentType)]
                    .filter(Boolean)
                    .join(" • ") || "—";

                const viewCount = Number.isFinite(Number(j?.viewCount)) ? Number(j.viewCount) : 0;
                const applicationsCount = Number.isFinite(Number(j?.applicationsCount))
                  ? Number(j.applicationsCount)
                  : 0;

                const showPublish = canPublish;
                const showClose = canClose;

                const rowMenuActions: AdminRowMenuAction[] = [];
                if (showPublish) {
                  rowMenuActions.push({
                    key: "publish",
                    label: "Publish",
                    onClick: () =>
                      requestConfirm({
                        title: "Publish this job posting?",
                        description:
                          "This will make the posting visible on the public careers page.",
                        confirmLabel: "Publish",
                        action: async () => adminPublishJob(id, null),
                      }),
                  });
                }
                if (showClose) {
                  rowMenuActions.push({
                    key: "close",
                    label: "Close",
                    onClick: () =>
                      requestConfirm({
                        tone: "danger",
                        title: "Close this job posting?",
                        description: "This will mark the posting as closed to new applicants.",
                        confirmLabel: "Close",
                        action: async () => adminCloseJob(id),
                      }),
                  });
                }
                if (canArchive) {
                  rowMenuActions.push({
                    key: "archive",
                    label: "Archive",
                    onClick: () =>
                      requestConfirm({
                        tone: "danger",
                        title: "Archive this job?",
                        description: "Archived postings are hidden from public listings.",
                        confirmLabel: "Archive",
                        action: async () => adminArchiveJob(id),
                      }),
                  });
                }
                if (canUnarchive) {
                  rowMenuActions.push({
                    key: "unarchive",
                    label: "Unarchive",
                    onClick: () =>
                      requestConfirm({
                        tone: "neutral",
                        title: "Unarchive this job?",
                        description:
                          "This restores the posting so you can publish or edit it again. It will not be public until published.",
                        confirmLabel: "Unarchive",
                        action: async () => adminUnarchiveJob(id),
                      }),
                  });
                }
                rowMenuActions.push({
                  key: "delete",
                  label: "Delete",
                  danger: true,
                  onClick: () =>
                    requestConfirm({
                      tone: "danger",
                      title: "Delete this job?",
                      description: "This cannot be undone.",
                      confirmLabel: "Delete",
                      action: async () => adminDeleteJob(id),
                    }),
                });

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
                        disabled={pending}
                        onChange={() =>
                          setSelected((prev) =>
                            prev.includes(id) ? prev.filter((x) => x !== id) : [...prev, id],
                          )
                        }
                        label={`Select ${j.title}`}
                      />
                    </td>

                    <td className="px-4 py-3">
                      <div className="font-semibold text-[var(--dash-text)]">{j.title}</div>
                    </td>

                    <td className="px-4 py-3 text-[var(--dash-text)]/90">{j.department || "—"}</td>
                    <td className="px-4 py-3 text-[var(--dash-text)]/85">{typeLabel}</td>

                    <td className="px-4 py-3">
                      <span className={statusPill(j.status, isDark)}>{j.status}</span>
                    </td>

                    <td className="px-4 py-3 text-right font-medium text-[var(--dash-text)]/85">
                      {viewCount}
                    </td>

                    <td className="px-4 py-3 text-right">
                      <button
                        type="button"
                        disabled={pending}
                        onClick={() => router.push(`/admin/jobs/${id}/applications`)}
                        className={cn(
                          "inline-flex items-center gap-1.5 rounded-xl border px-2.5 py-1 text-xs font-semibold transition",
                          "border-[var(--dash-border)] text-[var(--dash-text)] hover:bg-[var(--dash-surface-2)]",
                          "disabled:cursor-not-allowed disabled:opacity-50",
                          applicationsCount === 0 ? "opacity-70" : "",
                        )}
                        title={`View applications (${applicationsCount})`}
                      >
                        <Users className="h-3.5 w-3.5" />
                        <span>{applicationsCount}</span>
                      </button>
                    </td>

                    <td className="px-4 py-3 text-[var(--dash-muted)]">
                      {j.updatedAt
                        ? new Date(j.updatedAt).toLocaleString([], {
                            year: "numeric",
                            month: "numeric",
                            day: "numeric",
                            hour: "numeric",
                            minute: "2-digit",
                          })
                        : "-"}
                    </td>

                    <td className="px-4 py-3">
                      <div className="flex items-center justify-end gap-2">
                        <IconButton
                          title="Edit"
                          disabled={pending}
                          onClick={() => router.push(`/admin/jobs/${id}`)}
                        >
                          <Pencil className="h-4 w-4" />
                        </IconButton>

                        <IconButton
                          title={
                            canPublicPreview
                              ? "Preview public page"
                              : "Preview disabled (publish first)"
                          }
                          disabled={!canPublicPreview || pending}
                          onClick={() => openPublic(String(j.slug))}
                        >
                          {canPublicPreview ? (
                            <Eye className="h-4 w-4" />
                          ) : (
                            <ExternalLink className="h-4 w-4 opacity-60" />
                          )}
                        </IconButton>

                        <SocialShareControls
                          compact
                          variant="admin"
                          url={
                            canPublicPreview
                              ? `/careers/${encodeURIComponent(String(j.slug))}`
                              : `/admin/jobs/${encodeURIComponent(id)}`
                          }
                          title={j.title || "Job posting"}
                        />

                        <AdminRowMenu busy={pending} actions={rowMenuActions} />
                      </div>

                      {isClosed ? (
                        <div className="mt-2 text-right text-[11px] text-[var(--dash-muted)]">
                          Closed postings remain visible in admin.
                        </div>
                      ) : null}
                    </td>
                  </tr>
                );
              })}

              {!items.length ? (
                <tr>
                  <td colSpan={9} className="px-4 py-10 text-center text-[var(--dash-muted)]">
                    No job postings found.
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
          disabled={pending}
          onPrev={() => filters.pushQuery({ page: String(Math.max(1, (meta.page ?? 1) - 1)) })}
          onNext={() => filters.pushQuery({ page: String((meta.page ?? 1) + 1) })}
        />
      </AdminListTableShell>
    </AdminListPageShell>
  );
}
