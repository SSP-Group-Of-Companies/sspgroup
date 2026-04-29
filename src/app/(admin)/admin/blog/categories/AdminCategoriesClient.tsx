// src/app/(admin)/admin/blog/categories/AdminCategoriesClient.tsx
"use client";

import * as React from "react";
import { useRouter } from "next/navigation";
import {
  adminCreateCategory,
  adminDeleteCategory,
  adminUpdateCategory,
} from "@/lib/utils/blog/adminBlogApi";
import { cn } from "@/lib/cn";
import { useAdminTheme } from "@/app/(admin)/components/theme/AdminThemeProvider";
import {
  AdminListErrorAlert,
  AdminListFilterCard,
  AdminListPageHeader,
  AdminListPageShell,
  AdminListResultsHint,
  AdminListSearchInput,
  AdminListTableShell,
  AdminRowMenu,
  type AdminRowMenuAction,
  useAdminConfirmRun,
} from "@/app/(admin)/components/admin-list";
import { Plus, Save, X, Hash } from "lucide-react";

function DashIconButton({
  title,
  disabled,
  onClick,
  children,
  variant = "neutral",
}: {
  title: string;
  disabled?: boolean;
  onClick?: () => void;
  children: React.ReactNode;
  variant?: "neutral" | "danger";
}) {
  const base = cn(
    "inline-flex h-9 w-9 cursor-pointer items-center justify-center rounded-xl border transition",
    "shadow-[var(--dash-shadow)]/10",
    "border-[var(--dash-border)] bg-[var(--dash-surface)] text-[var(--dash-text)]",
    "hover:bg-[var(--dash-surface-2)]",
    "focus:outline-none focus-visible:ring-2 focus-visible:ring-[var(--dash-accent-soft)]",
    "disabled:cursor-not-allowed disabled:opacity-50",
  );

  if (variant === "danger") {
    return (
      <button
        type="button"
        title={title}
        aria-label={title}
        disabled={disabled}
        onClick={onClick}
        className={cn(base, "text-red-500", "hover:bg-red-500/10", "focus-visible:ring-red-500/30")}
      >
        {children}
      </button>
    );
  }

  return (
    <button
      type="button"
      title={title}
      aria-label={title}
      disabled={disabled}
      onClick={onClick}
      className={base}
    >
      {children}
    </button>
  );
}

function PrimaryActionButton({
  disabled,
  onClick,
  children,
}: {
  disabled?: boolean;
  onClick?: () => void;
  children: React.ReactNode;
}) {
  return (
    <button
      type="button"
      disabled={disabled}
      onClick={onClick}
      className={cn(
        "inline-flex h-10 cursor-pointer items-center gap-2 rounded-xl px-4 text-sm font-semibold transition",
        "bg-[var(--dash-red)] text-white hover:brightness-110",
        "shadow-[var(--dash-shadow)]/14",
        "focus:outline-none focus-visible:ring-2 focus-visible:ring-[var(--dash-accent-soft)]",
        "disabled:cursor-not-allowed disabled:opacity-50",
      )}
    >
      {children}
    </button>
  );
}

function TextInput(props: React.InputHTMLAttributes<HTMLInputElement>) {
  return (
    <input
      {...props}
      className={cn(
        "w-full rounded-xl border px-3 py-2 text-sm transition outline-none",
        "border-[var(--dash-border)] bg-[var(--dash-bg)] text-[var(--dash-text)] placeholder:text-[var(--dash-muted)]",
        "focus-visible:ring-2 focus-visible:ring-[var(--dash-accent-soft)]",
        props.className,
      )}
    />
  );
}

export default function AdminCategoriesClient({ initialItems }: { initialItems: any[] }) {
  const router = useRouter();
  const { resolvedTheme } = useAdminTheme();
  const isDark = resolvedTheme === "dark";

  const [items, setItems] = React.useState<any[]>(initialItems ?? []);
  const [q, setQ] = React.useState("");
  const [newName, setNewName] = React.useState("");
  const [err, setErr] = React.useState<string | null>(null);
  const [busy, setBusy] = React.useState(false);

  const filtered = React.useMemo(() => {
    const t = q.trim().toLowerCase();
    if (!t) return items;
    return items.filter((c) => `${c.name} ${c.slug}`.toLowerCase().includes(t));
  }, [items, q]);

  async function run(fn: () => Promise<unknown>) {
    setErr(null);
    setBusy(true);
    try {
      await fn();
      router.refresh();
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

  return (
    <AdminListPageShell maxWidthClassName="max-w-5xl">
      {confirmModal}

      <AdminListFilterCard>
        <div className="p-5">
          <AdminListPageHeader
            icon={Hash}
            title="Categories"
            description="Create, rename, and delete categories."
          />

          <AdminListErrorAlert error={err} isDark={isDark} onDismiss={() => setErr(null)} />

          <div className="mt-4 grid grid-cols-1 gap-3 lg:grid-cols-[1fr_1fr]">
            <AdminListSearchInput
              value={q}
              onChange={setQ}
              placeholder="Search categories…"
              disabled={busy}
            />

            <div className="flex gap-2">
              <TextInput
                value={newName}
                onChange={(e) => setNewName(e.target.value)}
                placeholder="New category name"
              />
              <PrimaryActionButton
                disabled={busy}
                onClick={() =>
                  run(async () => {
                    const name = newName.trim();
                    if (!name) throw new Error("Name required");
                    const created = await adminCreateCategory(name);
                    setItems((prev) => [{ ...created }, ...prev]);
                    setNewName("");
                  })
                }
              >
                <Plus className="h-4 w-4" />
                Add
              </PrimaryActionButton>
            </div>
          </div>
        </div>
      </AdminListFilterCard>

      <AdminListTableShell>
        <AdminListResultsHint showing={filtered.length} total={items.length} />

        <div className="overflow-x-auto">
          <table className="w-full text-left text-sm">
            <thead className={cn("border-b", "border-[var(--dash-border)]")}>
              <tr>
                <th className="px-4 py-3 font-semibold text-[var(--dash-muted)]">Name</th>
                <th className="px-4 py-3 font-semibold text-[var(--dash-muted)]">Slug</th>
                <th className="px-4 py-3 text-right font-semibold text-[var(--dash-muted)]">
                  Actions
                </th>
              </tr>
            </thead>

            <tbody>
              {filtered.map((c) => (
                <Row
                  key={String(c.id)}
                  cat={c}
                  busy={busy}
                  onRename={async (id, name) =>
                    run(async () => {
                      const nm = name.trim();
                      if (!nm) throw new Error("Name required");
                      const updated = await adminUpdateCategory(id, { name: nm });
                      setItems((prev) => prev.map((x) => (String(x.id) === id ? updated : x)));
                    })
                  }
                  onDelete={(id) =>
                    requestConfirm({
                      tone: "danger",
                      title: "Delete category?",
                      description: (
                        <span className="text-[var(--dash-muted)]">
                          This cannot be undone. Posts using this category may show without it.
                        </span>
                      ),
                      confirmLabel: "Delete",
                      action: async () => {
                        await adminDeleteCategory(id);
                        setItems((prev) => prev.filter((x) => String(x.id) !== id));
                      },
                    })
                  }
                />
              ))}

              {!filtered.length ? (
                <tr>
                  <td colSpan={3} className="px-4 py-10 text-center">
                    <div className="mx-auto max-w-sm">
                      <div className="text-sm font-semibold text-[var(--dash-text)]">
                        No categories found
                      </div>
                      <div className="mt-1 text-sm text-[var(--dash-muted)]">
                        Try a different search or create a new category.
                      </div>
                    </div>
                  </td>
                </tr>
              ) : null}
            </tbody>
          </table>
        </div>
      </AdminListTableShell>
    </AdminListPageShell>
  );
}

function Row({
  cat,
  busy,
  onRename,
  onDelete,
}: {
  cat: any;
  busy: boolean;
  onRename: (id: string, name: string) => Promise<void>;
  onDelete: (id: string) => void;
}) {
  const [editing, setEditing] = React.useState(false);
  const [name, setName] = React.useState(cat.name);

  React.useEffect(() => {
    if (!editing) setName(cat.name);
  }, [cat.name, editing]);

  const id = String(cat.id);

  if (editing) {
    return (
      <tr className={cn("border-b last:border-b-0", "border-[var(--dash-border)]")}>
        <td className="px-4 py-3">
          <input
            value={name}
            onChange={(e) => setName(e.target.value)}
            className={cn(
              "w-full rounded-xl border px-3 py-2 text-sm transition outline-none",
              "border-[var(--dash-border)] bg-[var(--dash-bg)] text-[var(--dash-text)]",
              "focus-visible:ring-2 focus-visible:ring-[var(--dash-accent-soft)]",
            )}
            autoFocus
          />
          <div className="mt-1 text-xs text-[var(--dash-muted)]">Press Save to apply changes.</div>
        </td>

        <td className="px-4 py-3">
          <span
            className={cn(
              "inline-flex items-center rounded-full border px-2 py-1 text-xs",
              "border-[var(--dash-border)] bg-[var(--dash-bg)] text-[var(--dash-text)]",
            )}
          >
            {cat.slug}
          </span>
        </td>

        <td className="px-4 py-3">
          <div className="flex justify-end gap-2">
            <button
              disabled={busy}
              onClick={async () => {
                await onRename(id, name);
                setEditing(false);
              }}
              className={cn(
                "inline-flex h-9 cursor-pointer items-center gap-2 rounded-xl px-3 text-sm font-semibold transition",
                "bg-[var(--dash-red)] text-white hover:brightness-110",
                "shadow-[var(--dash-shadow)]/12",
                "focus:outline-none focus-visible:ring-2 focus-visible:ring-[var(--dash-accent-soft)]",
                "disabled:cursor-not-allowed disabled:opacity-50",
              )}
            >
              <Save className="h-4 w-4" />
              <span className="hidden sm:inline">Save</span>
            </button>

            <DashIconButton
              title="Cancel"
              disabled={busy}
              onClick={() => {
                setName(cat.name);
                setEditing(false);
              }}
            >
              <X className="h-4 w-4" />
            </DashIconButton>
          </div>
        </td>
      </tr>
    );
  }

  return (
    <tr
      className={cn(
        "border-b last:border-b-0",
        "border-[var(--dash-border)] hover:bg-[var(--dash-surface-2)]/60",
      )}
    >
      <td className="px-4 py-3">
        <div className="font-semibold text-[var(--dash-text)]">{cat.name}</div>
      </td>

      <td className="px-4 py-3">
        <span
          className={cn(
            "inline-flex items-center rounded-full border px-2 py-1 text-xs",
            "border-[var(--dash-border)] bg-[var(--dash-bg)] text-[var(--dash-text)]",
          )}
        >
          {cat.slug}
        </span>
      </td>

      <td className="px-4 py-3">
        <div className="flex items-center justify-end gap-2">
          <AdminRowMenu
            busy={busy}
            actions={
              [
                { key: "rename", label: "Rename", onClick: () => setEditing(true) },
                {
                  key: "delete",
                  label: "Delete",
                  danger: true,
                  onClick: () => onDelete(id),
                },
              ] satisfies AdminRowMenuAction[]
            }
          />
        </div>
      </td>
    </tr>
  );
}
