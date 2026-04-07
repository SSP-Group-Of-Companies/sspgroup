"use client";

import { cn } from "@/lib/cn";
import { Select } from "@/app/(admin)/components/ui/Select";
import { SoftButton } from "@/app/(admin)/components/ui/Buttons";
import { X } from "lucide-react";
import { AdminListSearchInput } from "./AdminListSearchInput";

export type AdminListFilterOption = { value: string; label: string };

export function AdminListFilterToolbar({
  q,
  onQChange,
  searchPlaceholder,
  status,
  onStatusChange,
  statusOptions,
  statusPlaceholder = "All statuses",
  onClearFilters,
  disabled,
  gridClassName,
}: {
  q: string;
  onQChange: (next: string) => void;
  searchPlaceholder: string;
  status: string;
  onStatusChange: (next: string) => void;
  statusOptions: AdminListFilterOption[];
  statusPlaceholder?: string;
  onClearFilters: () => void;
  disabled?: boolean;
  gridClassName?: string;
}) {
  return (
    <div
      className={cn("mt-4 grid grid-cols-1 gap-3 sm:grid-cols-[1fr_220px_140px]", gridClassName)}
    >
      <AdminListSearchInput
        value={q}
        onChange={onQChange}
        placeholder={searchPlaceholder}
        disabled={disabled}
      />
      <Select
        value={status}
        onChange={onStatusChange}
        placeholder={statusPlaceholder}
        disabled={disabled}
        options={statusOptions}
      />
      <SoftButton
        disabled={disabled}
        onClick={onClearFilters}
        icon={<X className="h-4 w-4" />}
        label="Clear"
      />
    </div>
  );
}
