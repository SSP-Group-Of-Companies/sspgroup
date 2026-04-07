"use client";

import * as React from "react";

export function AdminListBulkBar({ children }: { children: React.ReactNode }) {
  return (
    <div className="border-t border-[var(--dash-border)] bg-[var(--dash-surface)] px-5 py-3">
      {children}
    </div>
  );
}
