"use client";

import * as React from "react";
import { MoreHorizontal } from "lucide-react";
import { cn } from "@/lib/cn";
import { IconButton } from "@/app/(admin)/components/ui/Buttons";

export type AdminRowMenuAction = {
  key: string;
  label: string;
  onClick: () => void;
  danger?: boolean;
};

export function AdminRowMenu({
  busy,
  title = "More actions",
  actions,
}: {
  busy: boolean;
  title?: string;
  actions: AdminRowMenuAction[];
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

  if (actions.length === 0) return null;

  return (
    <div ref={ref} className="relative">
      <IconButton title={title} disabled={busy} onClick={() => setOpen((v) => !v)}>
        <MoreHorizontal className="h-4 w-4" />
      </IconButton>

      {open ? (
        <div
          className={cn(
            "absolute top-1/2 right-full z-[95] mr-2 -translate-y-1/2",
            "flex max-w-[min(70vw,32rem)] items-center overflow-x-auto rounded-xl border p-1",
            "border-[var(--dash-border)] bg-[var(--dash-surface)] shadow-[var(--dash-shadow)]",
          )}
          role="menu"
        >
          {actions.map((action, idx) => (
            <React.Fragment key={action.key}>
              {idx > 0 ? <div className="mx-0.5 h-4 w-px bg-[var(--dash-border)]" /> : null}
              <button
                type="button"
                disabled={busy}
                onClick={() => {
                  setOpen(false);
                  action.onClick();
                }}
                className={cn(
                  "cursor-pointer rounded-lg px-3 py-1.5 text-xs font-semibold whitespace-nowrap transition disabled:cursor-not-allowed",
                  action.danger
                    ? "text-red-600 hover:bg-red-500/10 disabled:opacity-50 dark:text-red-300"
                    : "text-[var(--dash-text)] hover:bg-[var(--dash-surface-2)] disabled:opacity-50",
                )}
                role="menuitem"
              >
                {action.label}
              </button>
            </React.Fragment>
          ))}
        </div>
      ) : null}
    </div>
  );
}
