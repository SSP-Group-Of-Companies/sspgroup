import { cn } from "@/lib/cn";

type SectionSignalEyebrowProps = {
  label: string;
  light?: boolean;
  className?: string;
  accentColor?: string;
};

/**
 * SSP brand-level section eyebrow — uses SSP cyan / menu accent tokens.
 * For theme-customizable eyebrows (per-industry accent), use SectionEyebrow instead.
 */
export function SectionSignalEyebrow({
  label,
  light = false,
  className,
  accentColor,
}: SectionSignalEyebrowProps) {
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
          className="h-1.5 w-1.5 rounded-full"
          style={{
            backgroundColor: accentColor
              ? accentColor
              : light
                ? "var(--color-ssp-cyan-500)"
                : "var(--color-menu-accent)",
          }}
        />
        <span
          className="h-px w-8"
          style={{
            background: accentColor
              ? light
                ? `linear-gradient(90deg, ${accentColor}, rgba(255,255,255,0.35))`
                : `linear-gradient(90deg, ${accentColor}, rgba(12,23,38,0.22))`
              : light
                ? "linear-gradient(90deg,var(--color-ssp-cyan-500),rgba(255,255,255,0.35))"
                : "linear-gradient(90deg,var(--color-menu-accent),rgba(12,23,38,0.22))",
          }}
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
