"use client";

import * as React from "react";
import Link from "next/link";
import { motion, useReducedMotion, type Variants } from "framer-motion";
import { Container } from "@/app/(site)/components/layout/Container";
import { SectionSignalEyebrow } from "@/app/(site)/components/ui/SectionSignalEyebrow";
import { trackCtaClick } from "@/lib/analytics/cta";
import { cn } from "@/lib/cn";

const VIDEO_DESKTOP = "/_optimized/hero/hero-desktop.mp4";
const POSTER = "/_optimized/hero/hero-poster2.png";

const HEADING_ID = "home-hero-heading";

const FOCUS_RING =
  "focus:outline-none focus-visible:ring-2 focus-visible:ring-white/60 focus-visible:ring-offset-2 focus-visible:ring-offset-[color:var(--color-company-ink)]";

const EYEBROW = "North American Freight Logistics";

const DESCRIPTION =
  "SSP manages truckload, LTL, specialized, and cross-border freight across Canada, the United States, and Mexico with disciplined execution, accountable communication, and shipment visibility from pickup through delivery.";

export function Hero() {
  const reduceMotion = useReducedMotion() ?? false;
  const desktopVideoRef = React.useRef<HTMLVideoElement | null>(null);
  const [desktopVideoState, setDesktopVideoState] = React.useState<"loading" | "ready" | "failed">(
    "loading",
  );

  const markDesktopReady = React.useCallback(() => setDesktopVideoState("ready"), []);
  const markDesktopFailed = React.useCallback(() => setDesktopVideoState("failed"), []);

  React.useEffect(() => {
    const timer = window.setTimeout(() => {
      const el = desktopVideoRef.current;
      if (!el || desktopVideoState !== "loading") return;
      if (el.error || el.networkState === HTMLMediaElement.NETWORK_NO_SOURCE) {
        setDesktopVideoState("failed");
      }
    }, 2500);
    return () => window.clearTimeout(timer);
  }, [desktopVideoState]);

  const stagger: Variants = reduceMotion
    ? { hidden: { opacity: 1 }, show: { opacity: 1 } }
    : { hidden: {}, show: { transition: { staggerChildren: 0.05, delayChildren: 0.03 } } };

  const reveal: Variants = reduceMotion
    ? { hidden: { opacity: 1, y: 0 }, show: { opacity: 1, y: 0 } }
    : { hidden: { opacity: 1, y: 12 }, show: { opacity: 1, y: 0 } };

  return (
    <section
      id="top"
      aria-labelledby={HEADING_ID}
      className="relative flex min-h-[min(74svh,980px)] flex-col overflow-hidden border-b border-white/6 py-16 sm:py-20 lg:py-24"
    >
      <div className="pointer-events-none absolute inset-0" aria-hidden>
        {desktopVideoState === "failed" ? (
          <div
            className="absolute inset-0 hidden bg-cover bg-center md:block"
            style={{ backgroundImage: `url(${POSTER})` }}
          />
        ) : null}
        <div
          className="absolute inset-0 block bg-cover bg-center md:hidden"
          style={{ backgroundImage: `url(${POSTER})` }}
        />

        <video
          ref={desktopVideoRef}
          className="absolute inset-0 hidden h-full w-full object-cover md:block"
          autoPlay
          muted
          loop
          playsInline
          preload="metadata"
          disablePictureInPicture
          onLoadedData={markDesktopReady}
          onCanPlay={markDesktopReady}
          onError={markDesktopFailed}
          src={VIDEO_DESKTOP}
        />

        {/* Base cinematic film */}
        <div
          className="absolute inset-0"
          style={{
            background:
              "linear-gradient(180deg, rgba(7,10,18,0.44) 0%, rgba(7,10,18,0.40) 38%, rgba(7,10,18,0.48) 100%)",
          }}
          aria-hidden
        />

        {/* Left text-stage shaping only */}
        <div
          className="absolute inset-0"
          style={{
            background:
              "linear-gradient(90deg, rgba(7,10,18,0.82) 0%, rgba(7,10,18,0.74) 18%, rgba(7,10,18,0.54) 34%, rgba(7,10,18,0.26) 52%, rgba(7,10,18,0.10) 70%, rgba(7,10,18,0.04) 100%)",
          }}
          aria-hidden
        />

        {/* Light top shaping below nav */}
        <div
          className="absolute inset-x-0 top-0 h-28"
          style={{
            background:
              "linear-gradient(180deg, rgba(7,10,18,0.22) 0%, rgba(7,10,18,0.00) 100%)",
          }}
          aria-hidden
        />

        {/* Subtle brand atmosphere */}
        <div
          className="absolute left-[-120px] top-[18%] h-[260px] w-[260px] rounded-full blur-[120px]"
          style={{ background: "rgba(220,38,38,0.055)" }}
          aria-hidden
        />
        <div
          className="absolute right-[8%] top-[12%] h-[220px] w-[220px] rounded-full blur-[130px]"
          style={{ background: "rgba(220,38,38,0.03)" }}
          aria-hidden
        />

        {/* Soft edge vignette */}
        <div
          className="absolute inset-0"
          style={{
            background:
              "radial-gradient(circle at 55% 42%, rgba(7,10,18,0) 42%, rgba(7,10,18,0.12) 100%)",
          }}
          aria-hidden
        />
      </div>

      <div className="relative z-10 flex flex-1 flex-col justify-center">
        <Container className="site-page-container relative">
          <motion.div
            className="relative flex flex-col px-1 sm:px-2"
            initial="hidden"
            animate="show"
            variants={stagger}
          >
            <motion.div
              variants={reveal}
              transition={{ duration: reduceMotion ? 0 : 0.35, ease: "easeOut" }}
              className="flex justify-start"
            >
              <SectionSignalEyebrow label={EYEBROW} light />
            </motion.div>

            <motion.h1
              id={HEADING_ID}
              variants={reveal}
              transition={{ duration: reduceMotion ? 0 : 0.36, ease: "easeOut" }}
              className="mt-5 max-w-4xl text-3xl leading-[1.15] font-semibold tracking-tight text-white sm:text-4xl md:text-[44px] md:leading-[1.14] lg:text-[52px] lg:leading-[1.12]"
              style={{ textShadow: "var(--shadow-company-hero-heading)" }}
            >
              Built to keep&nbsp;
              <br className="md:hidden" />
              North America&rsquo;s
              <br />
              supply chains moving.
            </motion.h1>

            <motion.p
              variants={reveal}
              transition={{ duration: reduceMotion ? 0 : 0.35, ease: "easeOut" }}
              className="mt-6 max-w-[64ch] text-[15px] leading-[1.85] text-white/80 sm:text-base sm:leading-[1.9]"
              style={{ textShadow: "var(--shadow-company-hero-body)" }}
            >
              {DESCRIPTION}
            </motion.p>

            <motion.div
              variants={reveal}
              transition={{ duration: reduceMotion ? 0 : 0.35, ease: "easeOut" }}
              className="mt-9 flex flex-col gap-3 sm:flex-row sm:flex-wrap sm:items-center"
            >
              <Link
                href="/quote"
                data-cta-id="hero_primary_request_quote"
                onClick={() =>
                  trackCtaClick({
                    ctaId: "hero_primary_request_quote",
                    location: "home_hero",
                    destination: "/quote",
                    label: "Request a Quote",
                  })
                }
                className={cn(
                  "inline-flex h-12 w-full items-center justify-center px-7 text-sm font-semibold text-white transition-all duration-200 motion-safe:hover:-translate-y-[1px] hover:brightness-[1.04] sm:w-auto",
                  "site-cta-radius",
                  FOCUS_RING,
                )}
                style={{
                  backgroundImage: "var(--gradient-home-hero-primary-cta)",
                  boxShadow: "var(--shadow-home-hero-primary-cta)",
                }}
              >
                Request a Quote
              </Link>

              <Link
                href="/solutions"
                data-cta-id="hero_secondary_explore_solutions"
                onClick={() =>
                  trackCtaClick({
                    ctaId: "hero_secondary_explore_solutions",
                    location: "home_hero",
                    destination: "/solutions",
                    label: "Explore Solutions",
                  })
                }
                className={cn(
                  "inline-flex h-12 w-full items-center justify-center border border-white/22 bg-black/20 px-7 text-sm font-semibold text-white/92 backdrop-blur-sm transition-all duration-200 hover:border-white/35 hover:bg-black/28 hover:text-white sm:w-auto",
                  "site-cta-radius",
                  FOCUS_RING,
                )}
              >
                Explore Solutions
              </Link>
            </motion.div>
          </motion.div>
        </Container>
      </div>
    </section>
  );
}
