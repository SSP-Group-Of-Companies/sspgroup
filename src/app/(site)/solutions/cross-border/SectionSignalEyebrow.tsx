import { cn } from "@/lib/cn";

type SectionSignalEyebrowProps = {
  label: string;
  light?: boolean;
  className?: string;
};

export function SectionSignalEyebrow({ label, light = false, className }: SectionSignalEyebrowProps) {
  return (
    <div className={cn("inline-flex items-center gap-2.5", className)}>
      <span
        aria-hidden
        className={cn(
          "inline-flex items-center gap-1.5 rounded-full px-2.5 py-1",
          light
            ? "border border-white/24 bg-white/8"
            : "border border-[color:var(--color-menu-border)] bg-white",
        )}
      >
        <span
          className={cn(
            "h-1.5 w-1.5 rounded-full",
            light ? "bg-[color:var(--color-ssp-cyan-500)]" : "bg-[color:var(--color-menu-accent)]",
          )}
        />
        <span
          className={cn(
            "h-px w-8",
            light
              ? "bg-[linear-gradient(90deg,var(--color-ssp-cyan-500),rgba(255,255,255,0.35))]"
              : "bg-[linear-gradient(90deg,var(--color-menu-accent),rgba(12,23,38,0.22))]",
          )}
        />
      </span>
      <p
        className={cn(
          "font-semibold uppercase",
          light
            ? "text-xs tracking-[0.16em] text-white/70"
            : "text-[10.5px] tracking-[0.14em] text-[color:var(--color-menu-subtle)]",
        )}
      >
        {label}
      </p>
    </div>
  );
}
