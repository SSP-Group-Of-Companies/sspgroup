// src/app/(site)/components/layout/footer/FooterLegalLane.tsx
"use client";

import * as React from "react";
import { Pause, Play } from "lucide-react";
import { cn } from "@/lib/cn";
import { CardImage } from "@/components/media/CardImage";

export function FooterLegalLane({
  children,
  className,
}: {
  children: React.ReactNode;
  className?: string;
}) {
  const laneRef = React.useRef<HTMLDivElement | null>(null);
  const [laneWidth, setLaneWidth] = React.useState(1200);
  const [isTrucksPaused, setIsTrucksPaused] = React.useState(false);

  React.useEffect(() => {
    const el = laneRef.current;
    if (!el) return;
    const update = () => setLaneWidth(el.clientWidth || 1200);
    update();
    const observer = new ResizeObserver(update);
    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  return (
    <div
      ref={laneRef}
      style={{ "--footer-lane-width": `${laneWidth}px` } as React.CSSProperties}
      className={cn("relative bg-[color:var(--color-footer-legal-bg)]", className)}
    >
      <div
        className="pointer-events-none absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-white/22 to-transparent"
        aria-hidden="true"
      />

      {/* Subtle moving trucks on legal lane divider */}
      <div
        className="footer-legal-truck footer-legal-truck-right pointer-events-none absolute top-0 left-0 z-10 hidden sm:block"
        style={{ animationPlayState: isTrucksPaused ? "paused" : "running" }}
        aria-hidden="true"
      >
        <CardImage
          src="/_optimized/brand/footerTruckMovingRight.webp"
          alt="Moving truck"
          width={136}
          height={48}
          className="h-[28px] w-auto object-contain opacity-95 drop-shadow-[0_6px_12px_rgba(2,6,23,0.4)]"
        />
      </div>

      <div
        className="footer-legal-truck footer-legal-truck-left pointer-events-none absolute top-0 left-0 z-10 hidden sm:block"
        style={{ animationPlayState: isTrucksPaused ? "paused" : "running" }}
        aria-hidden="true"
      >
        <CardImage
          src="/_optimized/brand/footerTruckMovingLeft.webp"
          alt="Moving truck"
          width={136}
          height={48}
          className="h-[28px] w-auto object-contain opacity-95 drop-shadow-[0_6px_12px_rgba(2,6,23,0.4)]"
        />
      </div>

      {children}

      <button
        type="button"
        onClick={() => setIsTrucksPaused((prev) => !prev)}
        className="absolute top-0 right-24 z-20 hidden -translate-y-1/2 items-center gap-1 rounded-full border border-white/30 bg-[color:var(--color-footer-pause-bg)] px-2 py-1 text-[11px] font-medium text-white/90 backdrop-blur-sm transition-colors hover:bg-[color:var(--color-footer-pause-hover)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[color:var(--color-brand-600)] focus-visible:ring-offset-2 focus-visible:ring-offset-[color:var(--color-footer-legal-bg)] sm:inline-flex lg:right-32"
        aria-label={isTrucksPaused ? "Play trucks animation" : "Pause trucks animation"}
        aria-pressed={isTrucksPaused}
      >
        {isTrucksPaused ? <Play className="h-3.5 w-3.5" /> : <Pause className="h-3.5 w-3.5" />}
        {isTrucksPaused ? "Play" : "Pause"}
      </button>

      <style jsx>{`
        .footer-legal-truck {
          will-change: transform, opacity;
        }

        .footer-legal-truck-right {
          animation: footerTruckRight 20s linear infinite;
        }

        .footer-legal-truck-left {
          animation: footerTruckLeft 18s linear infinite;
        }

        @keyframes footerTruckRight {
          0% {
            transform: translate3d(-170px, -96%, 0);
            opacity: 0;
          }
          8% {
            opacity: 0.92;
          }
          92% {
            opacity: 0.92;
          }
          100% {
            transform: translate3d(calc(var(--footer-lane-width) + 10px), -96%, 0);
            opacity: 0;
          }
        }

        @keyframes footerTruckLeft {
          0% {
            transform: translate3d(calc(var(--footer-lane-width) + 10px), -96%, 0);
            opacity: 0;
          }
          8% {
            opacity: 0.9;
          }
          92% {
            opacity: 0.9;
          }
          100% {
            transform: translate3d(-170px, -96%, 0);
            opacity: 0;
          }
        }

        @media (prefers-reduced-motion: reduce) {
          .footer-legal-truck-right,
          .footer-legal-truck-left {
            animation: none;
            display: none;
          }
        }
      `}</style>
    </div>
  );
}
