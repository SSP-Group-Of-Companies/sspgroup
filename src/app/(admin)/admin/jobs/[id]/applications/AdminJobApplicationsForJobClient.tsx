// src/app/(admin)/admin/jobs/[id]/applications/AdminJobApplicationsForJobClient.tsx
"use client";

import * as React from "react";
import { useRouter } from "next/navigation";
import { cn } from "@/lib/cn";
import { useAdminTheme } from "@/app/(admin)/components/theme/AdminThemeProvider";
import { IconButton } from "@/app/(admin)/components/ui/Buttons";
import { JobApplicationDetailsModal } from "@/app/(admin)/components/jobs/JobApplicationDetailsModal";
import {
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
import { Archive, ArchiveRestore, Eye, Users } from "lucide-react";
import { EJobApplicationStatus } from "@/types/jobApplication.types";
import { adminSetApplicationStatus } from "@/lib/utils/jobs/adminJobsApi";

export default function AdminJobApplicationsForJobClient({
  jobId,
  jobTitle,
  initialItems,
  initialMeta,
}: {
  jobId: string;
  jobTitle: string;
  initialItems: any[];
  initialMeta: any;
}) {
  const router = useRouter();
  const { resolvedTheme } = useAdminTheme();
  const isDark = resolvedTheme === "dark";

  const items = initialItems ?? [];
  const meta = initialMeta ?? {};

  const filters = useAdminUrlSyncedFilters(`/admin/jobs/${encodeURIComponent(jobId)}/applications`);
  const [busy, setBusy] = React.useState(false);
  const [err, setErr] = React.useState<string | null>(null);
  const [actionPending, startActionTransition] = React.useTransition();
  const [selectedApplication, setSelectedApplication] = React.useState<any | null>(null);

  async function run(fn: () => Promise<unknown>) {
    setErr(null);
    setBusy(true);
    try {
      await fn();
      startActionTransition(() => router.refresh());
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

  const pending = busy || filters.isPending || actionPending;

  return (
    <AdminListPageShell>
      {confirmModal}

      <JobApplicationDetailsModal
        open={Boolean(selectedApplication)}
        application={selectedApplication ? { ...selectedApplication, jobTitle } : null}
        onClose={() => setSelectedApplication(null)}
        onDownloadResume={() => {
          // modal handles download via passed callbacks in your existing pattern
        }}
        onDownloadPhoto={() => {
          // modal handles download via passed callbacks in your existing pattern
        }}
      />

      <AdminListFilterCard>
        <div className="p-5">
          <AdminListPageHeader
            icon={Users}
            title={`Applications — ${jobTitle}`}
            description="Scoped to this job posting."
            iconClassName="bg-[var(--dash-bg)] text-[var(--dash-text)]"
          />

          <AdminListErrorAlert error={err} isDark={isDark} onDismiss={() => setErr(null)} />

          <AdminListFilterToolbar
            q={filters.q}
            onQChange={filters.handleQChange}
            searchPlaceholder="Search name, email…"
            status={filters.status}
            onStatusChange={filters.handleStatusChange}
            statusOptions={[
              { value: EJobApplicationStatus.RECEIVED, label: "Received" },
              { value: EJobApplicationStatus.VIEWED, label: "Viewed" },
              { value: EJobApplicationStatus.ARCHIVED, label: "Archived" },
            ]}
            onClearFilters={filters.clearFilters}
            disabled={pending}
          />
        </div>
      </AdminListFilterCard>

      <AdminListTableShell>
        <div className="overflow-x-auto">
          <table className="w-full text-left text-sm">
            <thead className="sticky top-0 z-10">
              <tr className="border-b border-[var(--dash-border)] bg-[var(--dash-surface-2)]/60 backdrop-blur">
                <th className="px-4 py-3 font-semibold text-[var(--dash-muted)]">Applicant</th>
                <th className="px-4 py-3 font-semibold text-[var(--dash-muted)]">Contact</th>
                <th className="px-4 py-3 font-semibold text-[var(--dash-muted)]">Status</th>
                <th className="px-4 py-3 font-semibold text-[var(--dash-muted)]">Submitted</th>
                <th className="px-4 py-3 text-right font-semibold text-[var(--dash-muted)]">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody>
              {items.map((a: any) => {
                const id = String(a.id);
                const name = `${a.firstName || ""} ${a.lastName || ""}`.trim() || "-";
                const email = a.email || "-";
                const isArchived = a.status === EJobApplicationStatus.ARCHIVED;

                return (
                  <tr
                    key={id}
                    className={cn(
                      "border-b border-[var(--dash-border)]/70 last:border-b-0",
                      "transition hover:bg-[var(--dash-surface-2)]/45",
                    )}
                  >
                    <td className="px-4 py-3">
                      <div className="font-semibold text-[var(--dash-text)]">{name}</div>
                      <div className="mt-0.5 text-xs text-[var(--dash-muted)]">
                        {a.currentLocation || a.addressLine || "-"}
                      </div>
                    </td>

                    <td className="px-4 py-3">
                      <div className="text-[var(--dash-text)]/90">{email}</div>
                      <div className="mt-0.5 text-xs text-[var(--dash-muted)]">
                        {a.phone || "-"}
                      </div>
                    </td>

                    <td className="px-4 py-3">
                      <span
                        className={cn(
                          "inline-flex items-center rounded-full border px-2.5 py-1 text-[11px] font-semibold",
                          "border-[var(--dash-border)] bg-[var(--dash-bg)] text-[var(--dash-text)]",
                        )}
                      >
                        {a.status}
                      </span>
                    </td>

                    <td className="px-4 py-3 text-[var(--dash-muted)]">
                      {a.createdAt ? new Date(a.createdAt).toLocaleString() : "-"}
                    </td>

                    <td className="px-4 py-3">
                      <div className="flex items-center justify-end gap-2">
                        <IconButton
                          title="View application"
                          disabled={pending}
                          onClick={() => setSelectedApplication(a)}
                        >
                          <Eye className="h-4 w-4" />
                        </IconButton>

                        {isArchived ? (
                          <IconButton
                            title="Unarchive application"
                            disabled={pending}
                            onClick={() =>
                              requestConfirm({
                                tone: "neutral",
                                title: "Unarchive this application?",
                                description: "This will make it visible again in default views.",
                                confirmLabel: "Unarchive",
                                action: async () => {
                                  await adminSetApplicationStatus(
                                    id,
                                    EJobApplicationStatus.RECEIVED,
                                  );
                                },
                              })
                            }
                          >
                            <ArchiveRestore className="h-4 w-4 -scale-x-100" />
                          </IconButton>
                        ) : (
                          <IconButton
                            title="Archive application"
                            disabled={pending}
                            onClick={() =>
                              requestConfirm({
                                tone: "danger",
                                title: "Archive this application?",
                                description: "Archived applications are hidden from default views.",
                                confirmLabel: "Archive",
                                action: async () => {
                                  await adminSetApplicationStatus(
                                    id,
                                    EJobApplicationStatus.ARCHIVED,
                                  );
                                },
                              })
                            }
                          >
                            <Archive className="h-4 w-4" />
                          </IconButton>
                        )}
                      </div>
                    </td>
                  </tr>
                );
              })}

              {!items.length ? (
                <tr>
                  <td colSpan={5} className="px-4 py-10 text-center text-[var(--dash-muted)]">
                    No applications found.
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
