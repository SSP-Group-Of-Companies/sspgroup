import { cn } from "@/lib/cn";

/**
 * SSP Section Eyebrow — the signature visual marker before section headings.
 * Dot · gradient line · label. Supports light (on dark bg) and dark (on light bg) modes.
 * Accepts an accent color to match any page theme.
 */
export function SectionEyebrow({
  label,
  accentColor,
  light = false,
}: {
  label: string;
  accentColor: string;
  light?: boolean;
}) {
  return (
    <div className="inline-flex items-center gap-2.5">
      <span
        aria-hidden
        className={cn(
          "inline-flex items-center gap-1.5 rounded-full px-2.5 py-1",
          light
            ? "border border-white/20 bg-white/6"
            : "border bg-white/50",
        )}
        style={
          light
            ? undefined
            : { borderColor: `${accentColor}30`, backgroundColor: `${accentColor}08` }
        }
      >
        <span
          className="h-1.5 w-1.5 rounded-full"
          style={{ backgroundColor: accentColor }}
        />
        <span
          className="h-px w-8"
          style={{
            background: light
              ? `linear-gradient(90deg, ${accentColor}, rgba(255,255,255,0.25))`
              : `linear-gradient(90deg, ${accentColor}, transparent)`,
          }}
        />
      </span>
      <p
        className={cn(
          "font-semibold uppercase",
          light
            ? "text-xs tracking-[0.16em] text-white/70"
            : "text-[10.5px] tracking-[0.14em]",
        )}
        style={light ? undefined : { color: accentColor }}
      >
        {label}
      </p>
    </div>
  );
}
