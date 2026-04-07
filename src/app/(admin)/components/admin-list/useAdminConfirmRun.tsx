"use client";

import * as React from "react";
import { ConfirmModal, type ConfirmTone } from "@/app/(admin)/components/ui/ConfirmModal";

export type AdminConfirmOptions = {
  tone?: ConfirmTone;
  title: string;
  description?: React.ReactNode;
  confirmLabel?: string;
  action: () => Promise<unknown>;
};

export type UseAdminConfirmRunOptions = {
  /** Shown on the modal while a background action is in progress. */
  busy: boolean;
  /**
   * Wraps the confirmed action (shared error handling, refresh, etc.).
   * If omitted, the stored `action` runs directly after the modal closes.
   */
  execute?: (fn: () => Promise<unknown>) => Promise<void>;
};

/**
 * Opens a {@link ConfirmModal} from imperative call sites (`requestConfirm`) and
 * runs the pending action either through `execute` or standalone.
 */
export function useAdminConfirmRun({ busy, execute }: UseAdminConfirmRunOptions) {
  const [open, setOpen] = React.useState(false);
  const actionRef = React.useRef<null | (() => Promise<unknown>)>(null);
  const [tone, setTone] = React.useState<ConfirmTone>("neutral");
  const [title, setTitle] = React.useState("");
  const [description, setDescription] = React.useState<React.ReactNode>(null);
  const [confirmLabel, setConfirmLabel] = React.useState("Confirm");

  function requestConfirm(opts: AdminConfirmOptions) {
    actionRef.current = opts.action;
    setTone(opts.tone ?? "neutral");
    setTitle(opts.title);
    setDescription(opts.description ?? null);
    setConfirmLabel(opts.confirmLabel ?? "Confirm");
    setOpen(true);
  }

  const confirmModal = (
    <ConfirmModal
      open={open}
      tone={tone}
      title={title}
      description={description}
      confirmLabel={confirmLabel}
      busy={busy}
      onClose={() => setOpen(false)}
      onConfirm={() => {
        const act = actionRef.current;
        setOpen(false);
        if (!act) return;
        if (execute) void execute(act);
        else void act();
      }}
    />
  );

  return { requestConfirm, confirmModal };
}
