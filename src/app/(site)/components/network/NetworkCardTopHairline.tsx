import { cn } from "@/lib/cn";

type NetworkCardTopHairlineProps = {
  /** Matches parent `group/hub` | `group/primary` | `group/side` */
  variant: "hub" | "primary" | "side";
  className?: string;
};

const VARIANT: Record<NetworkCardTopHairlineProps["variant"], string> = {
  hub: "opacity-0 motion-safe:transition-opacity motion-safe:duration-300 motion-safe:group-hover/hub:opacity-100",
  primary:
    "opacity-0 motion-safe:transition-opacity motion-safe:duration-300 motion-safe:group-hover/primary:opacity-100",
  side: "opacity-0 motion-safe:transition-opacity motion-safe:duration-300 motion-safe:group-hover/side:opacity-100",
};

/**
 * Single-pixel top edge on hover — same intent as industry hub cards; keeps network pages
 * in the “premium surface” family without another loud accent.
 */
export function NetworkCardTopHairline({ variant, className }: NetworkCardTopHairlineProps) {
  return (
    <div
      aria-hidden
      className={cn("pointer-events-none absolute inset-x-[6%] top-0 z-20 h-px", VARIANT[variant], className)}
      style={{
        background:
          "linear-gradient(90deg, transparent 0%, color-mix(in srgb, var(--color-menu-accent) 24%, transparent) 50%, transparent 100%)",
      }}
    />
  );
}
