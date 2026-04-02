"use client";

import Image from "next/image";
import { useEffect, useRef, useState } from "react";
import { AnimatePresence, motion, useReducedMotion, type Variants } from "framer-motion";
import { ArrowUpRight, Linkedin, X } from "lucide-react";
import { Container } from "@/app/(site)/components/layout/Container";
import { SectionSignalEyebrow } from "@/app/(site)/components/ui/SectionSignalEyebrow";
import type { LeadershipAccountabilityContent } from "@/config/company";
import { trackCtaClick } from "@/lib/analytics/cta";
import { cn } from "@/lib/cn";

export function AboutSspLeadershipAccountability({
  data,
}: {
  data: LeadershipAccountabilityContent;
}) {
  const reduceMotion = useReducedMotion() ?? false;
  const [activeProfile, setActiveProfile] = useState<LeadershipAccountabilityContent["profiles"][number] | null>(null);
  const modalRef = useRef<HTMLDivElement | null>(null);
  const closeButtonRef = useRef<HTMLButtonElement | null>(null);
  const triggerRefs = useRef<Record<string, HTMLButtonElement | null>>({});
  const [lastTriggerId, setLastTriggerId] = useState<string | null>(null);

  const revealUp: Variants = reduceMotion
    ? { hidden: { opacity: 1, y: 0 }, show: { opacity: 1, y: 0 } }
    : { hidden: { opacity: 1, y: 10 }, show: { opacity: 1, y: 0 } };

  const stagger: Variants = reduceMotion
    ? { hidden: { opacity: 1 }, show: { opacity: 1 } }
    : { hidden: {}, show: { transition: { staggerChildren: 0.06, delayChildren: 0.04 } } };
  const profiles = data.profiles.slice(0, 4);
  const gridClassName =
    profiles.length === 4
      ? "md:grid-cols-2 xl:grid-cols-2 xl:max-w-5xl"
      : profiles.length === 3
        ? "md:grid-cols-2 lg:grid-cols-3"
        : "md:grid-cols-2";

  useEffect(() => {
    if (!activeProfile) return;

    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    const focusClose = window.setTimeout(() => closeButtonRef.current?.focus(), 0);

    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        setActiveProfile(null);
        return;
      }

      if (event.key === "Tab" && modalRef.current) {
        const focusableElements = Array.from(
          modalRef.current.querySelectorAll<HTMLElement>(
            'a[href], button:not([disabled]), textarea, input, select, [tabindex]:not([tabindex="-1"])',
          ),
        ).filter((el) => !el.hasAttribute("disabled") && el.tabIndex !== -1);

        if (focusableElements.length === 0) return;

        const first = focusableElements[0];
        const last = focusableElements[focusableElements.length - 1];
        const active = document.activeElement as HTMLElement | null;

        if (event.shiftKey && active === first) {
          event.preventDefault();
          last.focus();
        } else if (!event.shiftKey && active === last) {
          event.preventDefault();
          first.focus();
        }
      }
    };

    window.addEventListener("keydown", onKeyDown);
    return () => {
      window.clearTimeout(focusClose);
      document.body.style.overflow = previousOverflow;
      window.removeEventListener("keydown", onKeyDown);
      if (lastTriggerId) {
        triggerRefs.current[lastTriggerId]?.focus();
      }
    };
  }, [activeProfile, lastTriggerId]);

  const openProfile = (profile: LeadershipAccountabilityContent["profiles"][number]) => {
    trackCtaClick({
      ctaId: `about_leadership_view_bio_${profile.id}`,
      location: "about_leadership",
      destination: "/about-us#leadership-accountability",
      label: `View Full Bio - ${profile.name}`,
    });
    setLastTriggerId(profile.id);
    setActiveProfile(profile);
  };

  return (
    <section
      id="leadership-accountability"
      aria-labelledby="about-leadership-accountability-heading"
      className="relative scroll-mt-24 overflow-hidden border-b border-[color:var(--color-menu-border)] py-16 sm:py-18 lg:py-20"
      style={{
        background:
          "linear-gradient(180deg, var(--color-ssp-cloud-50) 0%, var(--color-surface-0-light) 46%, var(--color-ssp-cloud-100) 100%)",
      }}
    >
      <div className="pointer-events-none absolute inset-0" aria-hidden>
        <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-[color:var(--color-ssp-cyan-500)]/30 to-transparent" />
        <div
          className="absolute -left-24 top-[20%] h-72 w-72 rounded-full bg-[color:var(--color-brand-500)]/6 blur-[100px]"
        />
        <div
          className="absolute -right-20 bottom-[-8%] h-72 w-72 rounded-full bg-[color:var(--color-ssp-cyan-500)]/8 blur-[96px]"
        />
      </div>

      <Container className="site-page-container relative">
        <motion.div
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, amount: 0.14 }}
          variants={stagger}
        >
          <motion.div
            variants={revealUp}
            transition={{ duration: reduceMotion ? 0 : 0.35, ease: "easeOut" }}
            className="flex justify-center"
          >
            <SectionSignalEyebrow label={data.sectionLabel} />
          </motion.div>

          <motion.h2
            id="about-leadership-accountability-heading"
            variants={revealUp}
            transition={{ duration: reduceMotion ? 0 : 0.38, ease: "easeOut" }}
            className="mx-auto mt-4 max-w-[18ch] text-balance text-center text-[2.05rem] font-bold leading-[1.03] tracking-tight text-[color:var(--color-text-strong)] sm:max-w-[22ch] sm:text-[2.55rem] lg:max-w-none lg:text-[2.8rem]"
          >
            {data.title}
          </motion.h2>

          <motion.p
            variants={revealUp}
            transition={{ duration: reduceMotion ? 0 : 0.35, ease: "easeOut" }}
            className="mx-auto mt-4 max-w-[62ch] text-center text-[14.75px] leading-[1.76] text-[color:var(--color-muted)] sm:text-[15.25px]"
          >
            {data.intro}
          </motion.p>

          <motion.div
            variants={stagger}
            className={cn("mx-auto mt-11 grid max-w-6xl gap-5 sm:gap-6 lg:gap-7", gridClassName)}
          >
            {profiles.map((profile) => (
              <motion.article
                key={profile.id}
                variants={revealUp}
                transition={{ duration: reduceMotion ? 0 : 0.36, ease: "easeOut" }}
                className="group min-w-0"
              >
                <div className="relative overflow-hidden rounded-2xl border border-[color:var(--color-border-light)]/70 bg-[linear-gradient(180deg,rgba(255,255,255,0.95)_0%,rgba(248,250,252,0.96)_100%)] p-2.5 shadow-[0_20px_48px_-32px_rgba(2,6,23,0.56)] transition-all duration-300 motion-safe:group-hover:-translate-y-0.5 group-hover:shadow-[0_26px_56px_-34px_rgba(2,6,23,0.62)]">
                  <div className="relative aspect-[4/5] overflow-hidden rounded-[0.95rem] border border-[color:var(--color-border-light)]/60 bg-[linear-gradient(180deg,var(--color-surface-2-light)_0%,color-mix(in_srgb,var(--color-surface-2-light)_76%,white)_100%)]">
                    <Image
                      src={profile.image}
                      alt={profile.imageAlt}
                      fill
                      sizes="(max-width: 768px) 100vw, (max-width: 1280px) 50vw, 33vw"
                      className="object-contain p-1"
                      style={{
                        objectPosition: profile.imageCard?.objectPosition ?? "center 78%",
                        transform: `scale(${profile.imageCard?.scale ?? 1})`,
                      }}
                    />
                  </div>

                  <div className="absolute inset-x-4 bottom-4">
                    <div className="flex items-center justify-between gap-3 rounded-xl border border-[color:var(--color-border-light)]/65 bg-white/96 px-3.5 py-2.5 shadow-[0_8px_26px_-18px_rgba(2,6,23,0.44)] backdrop-blur">
                      <div className="min-w-0">
                        <h3 className="truncate text-[0.95rem] font-semibold leading-tight tracking-tight text-[color:var(--color-text-strong)]">
                          {profile.name}
                        </h3>
                        <p className="truncate pt-0.5 text-[11.25px] leading-[1.25] text-[color:var(--color-muted)]">
                          {profile.title}
                        </p>
                      </div>
                      <a
                        href={profile.linkedin}
                        target="_blank"
                        rel="noopener noreferrer"
                        data-cta-id={`about_leadership_linkedin_card_${profile.id}`}
                        onClick={() =>
                          trackCtaClick({
                            ctaId: `about_leadership_linkedin_card_${profile.id}`,
                            location: "about_leadership",
                            destination: profile.linkedin,
                            label: `${profile.name} LinkedIn`,
                          })
                        }
                        aria-label={`${profile.name} on LinkedIn`}
                        className="inline-flex h-7 w-7 shrink-0 items-center justify-center rounded-md border border-[color:var(--color-border-light)]/80 bg-[color:var(--color-surface-0-light)] text-[color:var(--color-subtle)] transition-colors hover:text-[color:var(--color-menu-accent)] focus:outline-none focus-visible:ring-2 focus-visible:ring-[color:var(--color-nav-ring)]"
                      >
                        <Linkedin className="h-3.5 w-3.5" />
                      </a>
                    </div>
                  </div>
                </div>

                <div className="mt-3">
                  <button
                    type="button"
                    onClick={() => openProfile(profile)}
                    data-cta-id={`about_leadership_view_bio_${profile.id}`}
                    ref={(element) => {
                      triggerRefs.current[profile.id] = element;
                    }}
                    className="inline-flex w-full items-center justify-center gap-1.5 rounded-xl border border-[color:var(--color-border-light)]/80 bg-white/82 px-4 py-2 text-[12.5px] font-semibold text-[color:var(--color-menu-accent)] shadow-[0_10px_24px_-22px_rgba(2,6,23,0.54)] transition-colors hover:text-[color:var(--color-ssp-ink-800)] focus:outline-none focus-visible:ring-2 focus-visible:ring-[color:var(--color-nav-ring)] focus-visible:ring-offset-2 focus-visible:ring-offset-[color:var(--color-surface-0-light)]"
                  >
                    View Full Bio
                    <ArrowUpRight className="h-3.5 w-3.5 transition-transform motion-safe:group-hover:translate-x-[1px] motion-safe:group-hover:-translate-y-[1px]" />
                  </button>
                </div>
              </motion.article>
            ))}
          </motion.div>
        </motion.div>
      </Container>

      <AnimatePresence>
        {activeProfile ? (
          <>
            <motion.div
              key="leadership-modal-overlay"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: reduceMotion ? 0 : 0.2, ease: "easeOut" }}
              className="fixed inset-0 z-[80] bg-[rgba(5,12,24,0.5)] backdrop-blur-[7px]"
              onClick={() => setActiveProfile(null)}
              aria-hidden
            />

            <motion.div
              key="leadership-modal-shell"
              initial={reduceMotion ? { opacity: 1 } : { opacity: 0, y: 8, scale: 0.985 }}
              animate={reduceMotion ? { opacity: 1 } : { opacity: 1, y: 0, scale: 1 }}
              exit={reduceMotion ? { opacity: 0 } : { opacity: 0, y: 8, scale: 0.985 }}
              transition={{ duration: reduceMotion ? 0 : 0.22, ease: "easeOut" }}
              className="fixed inset-0 z-[81] flex items-center justify-center p-4 sm:p-6"
              onClick={() => setActiveProfile(null)}
            >
              <div
                ref={modalRef}
                role="dialog"
                aria-modal="true"
                aria-labelledby="leadership-bio-modal-heading"
                aria-describedby="leadership-bio-modal-description"
                className="flex max-h-[92vh] w-full max-w-5xl flex-col overflow-hidden rounded-3xl border border-[color:var(--color-border-light)]/80 bg-[linear-gradient(180deg,rgba(255,255,255,0.98)_0%,rgba(247,250,252,0.98)_100%)] shadow-[0_44px_110px_-52px_rgba(2,6,23,0.72)]"
                onClick={(event) => event.stopPropagation()}
              >
                <div className="flex items-center justify-between border-b border-[color:var(--color-border-light-soft)] px-5 py-4 sm:px-7">
                  <div>
                    <p className="text-[10px] font-semibold tracking-[0.2em] text-[color:var(--color-muted)]/75 uppercase">
                      Leadership Profile
                    </p>
                    <h3
                      id="leadership-bio-modal-heading"
                      className="mt-1 text-[1.6rem] font-semibold tracking-tight text-[color:var(--color-text-strong)] sm:text-[2rem]"
                    >
                      {activeProfile.name}
                    </h3>
                  </div>
                  <button
                    type="button"
                    ref={closeButtonRef}
                    onClick={() => setActiveProfile(null)}
                    aria-label="Close leadership bio"
                    className="inline-flex h-9 w-9 items-center justify-center rounded-md border border-[color:var(--color-border-light)]/70 bg-white/80 text-[color:var(--color-subtle)] transition-colors hover:text-[color:var(--color-text-strong)] focus:outline-none focus-visible:ring-2 focus-visible:ring-[color:var(--color-nav-ring)]"
                  >
                    <X className="h-4.5 w-4.5" />
                  </button>
                </div>

                <div className="grid flex-1 gap-0 overflow-y-auto md:grid-cols-[minmax(250px,340px)_1fr]">
                  <div className="border-b border-[color:var(--color-border-light-soft)] bg-[linear-gradient(180deg,var(--color-surface-2-light)_0%,color-mix(in_srgb,var(--color-surface-2-light)_72%,white)_100%)] p-5 md:border-b-0 md:border-r md:border-[color:var(--color-border-light-soft)] sm:p-6">
                    <div className="relative mx-auto aspect-[4/5] w-full max-w-[18rem] overflow-hidden rounded-xl border border-[color:var(--color-border-light)]/65 bg-[color:var(--color-surface-0-light)]">
                      <Image
                        src={activeProfile.image}
                        alt={activeProfile.imageAlt}
                        fill
                        sizes="(max-width: 768px) 80vw, 320px"
                        className="object-contain p-1"
                        style={{
                          objectPosition: activeProfile.imageModal?.objectPosition ?? "center 78%",
                          transform: `scale(${activeProfile.imageModal?.scale ?? 1})`,
                        }}
                      />
                    </div>
                  </div>

                  <div className="px-5 py-5 sm:px-7 sm:py-7">
                    <p className="text-[1.35rem] font-semibold leading-tight tracking-tight text-[color:var(--color-text-strong)] sm:text-[1.75rem]">
                      {activeProfile.title}
                    </p>
                    <p
                      id="leadership-bio-modal-description"
                      className="mt-4 text-[14px] leading-[1.86] text-[color:var(--color-muted)] sm:text-[15px]"
                    >
                      {activeProfile.bio || "Leadership profile details will be updated shortly."}
                    </p>
                    <div className="mt-6">
                      <a
                        href={activeProfile.linkedin}
                        target="_blank"
                        rel="noopener noreferrer"
                        data-cta-id={`about_leadership_linkedin_modal_${activeProfile.id}`}
                        onClick={() =>
                          trackCtaClick({
                            ctaId: `about_leadership_linkedin_modal_${activeProfile.id}`,
                            location: "about_leadership_modal",
                            destination: activeProfile.linkedin,
                            label: `${activeProfile.name} LinkedIn Profile`,
                          })
                        }
                        className="inline-flex items-center gap-2 rounded-lg border border-[color:var(--color-border-light)]/80 bg-white px-3.5 py-2 text-[12.5px] font-semibold text-[color:var(--color-menu-accent)] transition-colors hover:text-[color:var(--color-ssp-ink-800)] focus:outline-none focus-visible:ring-2 focus-visible:ring-[color:var(--color-nav-ring)]"
                      >
                        View LinkedIn Profile
                        <ArrowUpRight className="h-3.5 w-3.5" />
                      </a>
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>
          </>
        ) : null}
      </AnimatePresence>
    </section>
  );
}
