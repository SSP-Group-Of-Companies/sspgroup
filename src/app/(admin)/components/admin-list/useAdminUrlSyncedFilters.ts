"use client";

import * as React from "react";
import { useRouter, useSearchParams } from "next/navigation";

/**
 * Keeps `q` and `status` in sync with the URL (debounced writes) and handles
 * the stale-navigation guard used across admin list pages.
 */
export function useAdminUrlSyncedFilters(basePath: string) {
  const router = useRouter();
  const sp = useSearchParams();
  const [isPending, startTransition] = React.useTransition();

  const [q, setQ] = React.useState(() => sp.get("q") ?? "");
  const [status, setStatus] = React.useState(() => sp.get("status") ?? "");
  const latestFilterRequestRef = React.useRef<{ q: string; status: string } | null>(null);
  const lastUserInputAtRef = React.useRef(0);

  function pushQuery(
    next: Record<string, string | null | undefined>,
    opts?: { replace?: boolean },
  ) {
    const qs = new URLSearchParams(sp.toString());
    for (const [k, v] of Object.entries(next)) {
      if (!v) qs.delete(k);
      else qs.set(k, v);
    }
    const href = `${basePath}?${qs.toString()}`;
    startTransition(() => {
      if (opts?.replace) router.replace(href);
      else router.push(href);
    });
  }

  React.useEffect(() => {
    const urlQ = sp.get("q") ?? "";
    const urlStatus = sp.get("status") ?? "";

    if (Date.now() - lastUserInputAtRef.current < 450) return;

    const latest = latestFilterRequestRef.current;
    if (latest) {
      const isLatestRequestedUrl = latest.q === urlQ && latest.status === urlStatus;
      if (!isLatestRequestedUrl) return;
      latestFilterRequestRef.current = null;
    }

    if (q !== urlQ) setQ(urlQ);
    if (status !== urlStatus) setStatus(urlStatus);
    // Sync when URL changes only; q/status are compared intentionally without listing them as deps.
  }, [sp]);

  function handleQChange(next: string) {
    lastUserInputAtRef.current = Date.now();
    setQ(next);
  }

  function handleStatusChange(next: string) {
    lastUserInputAtRef.current = Date.now();
    setStatus(next);
  }

  function clearFilters() {
    lastUserInputAtRef.current = Date.now();
    setQ("");
    setStatus("");
  }

  React.useEffect(() => {
    const id = window.setTimeout(() => {
      const nextQ = q.trim();
      const currentQ = (sp.get("q") ?? "").trim();
      const currentStatus = sp.get("status") ?? "";

      if (nextQ === currentQ && status === currentStatus) return;
      latestFilterRequestRef.current = { q: nextQ, status };
      pushQuery({ q: nextQ || null, status: status || null, page: "1" }, { replace: true });
    }, 350);

    return () => window.clearTimeout(id);
  }, [q, status, sp]);

  return {
    q,
    status,
    handleQChange,
    handleStatusChange,
    clearFilters,
    pushQuery,
    isPending,
    searchParams: sp,
  };
}
