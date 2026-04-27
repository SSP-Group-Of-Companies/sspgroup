"use client";

import * as React from "react";
import { cn } from "@/lib/cn";

/**
 * Fun operational widget card: icon + title → big visual area → controls.
 * Subtle border + soft shadow, on-brand. No form vibe.
 */
export function WidgetCard({
  icon,
  title,
  accentColor,
  howToUse,
  visual,
  controls,
  didYouKnow,
  "aria-labelledby": ariaLabelledby,
  className,
  /** When true, card uses h-full flex flex-col and visual area is flex-1 min-h-0 for equal-height layouts */
  fillHeight,
}: {
  icon: React.ReactNode;
  title: string;
  accentColor?: string;
  /** One short line so users know what to do without thinking */
  howToUse?: string;
  visual: React.ReactNode;
  controls: React.ReactNode;
  didYouKnow?: string;
  "aria-labelledby"?: string;
  className?: string;
  fillHeight?: boolean;
}) {
  const accent = accentColor ?? "var(--color-brand-500)";
  return (
    <div
      className={cn(
        "rounded-2xl bg-white shadow-[0_2px_12px_rgba(2,6,23,0.04)] overflow-hidden",
        "focus-within:ring-2 focus-within:ring-offset-2 focus-within:ring-[color:var(--color-border-light)]",
        fillHeight && "flex h-full flex-col",
        className,
      )}
      style={{ ["--widget-accent" as string]: accent } as React.CSSProperties}
      role="group"
      aria-labelledby={ariaLabelledby}
    >
      <div className={cn("shrink-0", fillHeight ? "px-4 pt-3 sm:px-5 sm:pt-4" : "px-4 pt-4 sm:px-5 sm:pt-5")}>
        <div className="flex items-center gap-2.5">
          <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-[color:var(--color-surface-0-light)]" style={{ color: accent }}>
            {icon}
          </span>
          <h3
            id={ariaLabelledby}
            className="text-[0.9375rem] font-semibold tracking-tight"
            style={{ color: accent }}
          >
            {title}
          </h3>
        </div>
        {howToUse != null && (
          <p className="mt-1.5 text-[11px] text-[color:var(--color-muted-light)]">
            {howToUse}
          </p>
        )}
      </div>
      <div className={cn(fillHeight ? "flex-1 min-h-0 flex flex-col px-4 pb-2 sm:px-5 sm:pb-3" : "px-4 pb-3 sm:px-5 sm:pb-4")}>
        {visual}
      </div>
      {controls != null ? (
        <div className="px-4 py-3 sm:px-5 sm:py-4">
          {controls}
        </div>
      ) : null}
      {didYouKnow != null && (
        <p className={cn("shrink-0 border-t border-[color:var(--color-border-light)]/50 px-4 pb-2.5 pt-2.5 text-[10px] text-[color:var(--color-muted-light)] sm:px-5 min-h-[2.75rem] flex items-center bg-[color:var(--color-surface-0-light)]/30")}>
          {didYouKnow}
        </p>
      )}
    </div>
  );
}

/** Pill toggle: 1–2 controls, role="tablist" / role="tab", keyboard usable. Uses accentColor for selected state when provided. */
export function PillToggle<T extends string>({
  value,
  options,
  onChange,
  accentColor,
  "aria-label": ariaLabel,
}: {
  value: T;
  options: ReadonlyArray<{ id: T; label: string }>;
  onChange: (id: T) => void;
  accentColor?: string;
  "aria-label"?: string;
}) {
  const accent = accentColor ?? "var(--color-brand-500)";
  const tabRefs = React.useRef<Array<HTMLButtonElement | null>>([]);

  function moveFocus(nextIndex: number) {
    const nextOption = options[nextIndex];
    if (!nextOption) return;
    onChange(nextOption.id);
    tabRefs.current[nextIndex]?.focus();
  }

  return (
    <div
      role="tablist"
      aria-label={ariaLabel}
      className="flex flex-wrap gap-1.5"
    >
      {options.map((opt, index) => (
        <button
          key={opt.id}
          ref={(element) => {
            tabRefs.current[index] = element;
          }}
          type="button"
          role="tab"
          aria-selected={value === opt.id}
          tabIndex={value === opt.id ? 0 : -1}
          onClick={() => onChange(opt.id)}
          onKeyDown={(event) => {
            const currentIndex = options.findIndex((option) => option.id === value);
            const lastIndex = options.length - 1;

            if (currentIndex === -1 || lastIndex < 0) return;

            if (event.key === "ArrowRight" || event.key === "ArrowDown") {
              event.preventDefault();
              moveFocus(currentIndex === lastIndex ? 0 : currentIndex + 1);
              return;
            }

            if (event.key === "ArrowLeft" || event.key === "ArrowUp") {
              event.preventDefault();
              moveFocus(currentIndex === 0 ? lastIndex : currentIndex - 1);
              return;
            }

            if (event.key === "Home") {
              event.preventDefault();
              moveFocus(0);
              return;
            }

            if (event.key === "End") {
              event.preventDefault();
              moveFocus(lastIndex);
            }
          }}
          className={cn(
            "rounded-full px-3 py-1.5 text-[11px] font-medium transition-colors duration-150 focus:outline-none focus-visible:ring-2 focus-visible:ring-offset-1",
            !(value === opt.id) && "bg-[color:var(--color-surface-0-light)] text-[color:var(--color-muted-light)] hover:bg-[color:var(--color-border-light)]/30 hover:text-[color:var(--color-text-light)]",
          )}
          style={value === opt.id ? { backgroundColor: accent, color: "white" } : undefined}
        >
          {opt.label}
        </button>
      ))}
    </div>
  );
}

type WidgetRangeProps = {
  value: number;
  onChange: (value: number) => void;
  min: number;
  max: number;
  step?: number;
  accentColor?: string;
  "aria-label": string;
  fillOpacityClassName?: string;
  children?: React.ReactNode;
};

const rangeThumbClass = cn(
  "[&::-webkit-slider-thumb]:relative [&::-webkit-slider-thumb]:z-10",
  "[&::-webkit-slider-thumb]:h-5 [&::-webkit-slider-thumb]:w-5",
  "[&::-webkit-slider-thumb]:appearance-none [&::-webkit-slider-thumb]:rounded-full",
  "[&::-webkit-slider-thumb]:border-2 [&::-webkit-slider-thumb]:border-slate-300",
  "[&::-webkit-slider-thumb]:bg-white [&::-webkit-slider-thumb]:shadow-md",
  "[&::-moz-range-thumb]:h-5 [&::-moz-range-thumb]:w-5",
  "[&::-moz-range-thumb]:rounded-full [&::-moz-range-thumb]:border-2",
  "[&::-moz-range-thumb]:border-slate-300 [&::-moz-range-thumb]:bg-white",
  "[&::-moz-range-thumb]:shadow-md",
);

export function WidgetRange({
  value,
  onChange,
  min,
  max,
  step,
  accentColor,
  "aria-label": ariaLabel,
  fillOpacityClassName,
  children,
}: WidgetRangeProps) {
  const accent = accentColor ?? "var(--color-brand-500)";
  const [displayValue, setDisplayValue] = React.useState(value);
  const frameRef = React.useRef<number | null>(null);
  const pendingValueRef = React.useRef(value);
  const draggingRef = React.useRef(false);

  React.useEffect(() => {
    if (!draggingRef.current) setDisplayValue(value);
    pendingValueRef.current = value;
  }, [value]);

  React.useEffect(() => {
    return () => {
      if (frameRef.current != null) cancelAnimationFrame(frameRef.current);
    };
  }, []);

  const commit = React.useCallback(
    (next: number) => {
      pendingValueRef.current = next;
      if (frameRef.current != null) return;
      frameRef.current = requestAnimationFrame(() => {
        frameRef.current = null;
        onChange(pendingValueRef.current);
      });
    },
    [onChange],
  );

  const flush = React.useCallback(() => {
    draggingRef.current = false;
    if (frameRef.current != null) {
      cancelAnimationFrame(frameRef.current);
      frameRef.current = null;
    }
    onChange(pendingValueRef.current);
  }, [onChange]);

  const denominator = max - min;
  const percent = denominator === 0 ? 0 : ((displayValue - min) / denominator) * 100;
  const clampedPercent = Math.max(0, Math.min(100, percent));

  return (
    <div className="relative">
      <div className="h-2 w-full rounded-full bg-slate-200/90" aria-hidden />
      <div
        className={cn("absolute left-0 top-0 h-2 rounded-full", fillOpacityClassName)}
        style={{ width: `${clampedPercent}%`, backgroundColor: accent }}
        aria-hidden
      />
      {children}
      <input
        type="range"
        min={min}
        max={max}
        step={step}
        value={displayValue}
        onPointerDown={() => {
          draggingRef.current = true;
        }}
        onPointerUp={flush}
        onPointerCancel={flush}
        onBlur={flush}
        onChange={(event) => {
          const next = Number(event.target.value);
          setDisplayValue(next);
          commit(next);
        }}
        aria-valuemin={min}
        aria-valuemax={max}
        aria-valuenow={displayValue}
        aria-label={ariaLabel}
        className={cn(
          "absolute inset-0 h-2 w-full cursor-pointer touch-pan-y appearance-none rounded-full bg-transparent",
          rangeThumbClass,
        )}
        style={{ accentColor: accent } as React.CSSProperties}
      />
    </div>
  );
}
