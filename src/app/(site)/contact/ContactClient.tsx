// src/app/(site)/contact/ContactClient.tsx

"use client";

import { MessagesSquare, Headset, ShieldCheck, PhoneCall } from "lucide-react";
import { motion, useReducedMotion } from "framer-motion";

import { Container } from "../components/layout/Container";
import { Section } from "../components/layout/Section";
import { SectionSignalEyebrow } from "../components/ui/SectionSignalEyebrow";
import ContactForm from "../components/forms/ContactForm";
import { cn } from "@/lib/cn";
import { NEXT_PUBLIC_SSP_PHONE } from "@/config/env";
import { NAV_OFFSET } from "@/constants/ui";

const contactSupportItems = [
  {
    icon: MessagesSquare,
    title: "Clear routing",
    description: "Your inquiry is directed to the appropriate department from the start.",
  },
  {
    icon: Headset,
    title: "Human support",
    description: "Real people review submissions and follow up with practical next steps.",
  },
  {
    icon: ShieldCheck,
    title: "Secure submission",
    description: "Information is transmitted securely and handled with care.",
  },
];

function ContactHero() {
  const reduceMotion = useReducedMotion() ?? false;
  const shardMaskStyle = {
    background:
      "linear-gradient(154deg, rgba(255,255,255,0.2) 0%, rgba(16,167,216,0.12) 35%, rgba(8,26,43,0.04) 70%, rgba(8,26,43,0) 100%)",
    WebkitMaskImage: "url('/_optimized/company/ssp-shard-mask.svg')",
    maskImage: "url('/_optimized/company/ssp-shard-mask.svg')",
    WebkitMaskRepeat: "no-repeat",
    maskRepeat: "no-repeat",
    WebkitMaskPosition: "center",
    maskPosition: "center",
    WebkitMaskSize: "contain",
    maskSize: "contain",
  } as const;
  const shardFadeStyle = {
    WebkitMaskImage:
      "linear-gradient(136deg, rgba(0,0,0,0.01) 0%, rgba(0,0,0,0.12) 30%, rgba(0,0,0,0.86) 63%, #000 100%)",
    maskImage:
      "linear-gradient(136deg, rgba(0,0,0,0.01) 0%, rgba(0,0,0,0.12) 30%, rgba(0,0,0,0.86) 63%, #000 100%)",
  } as const;
  return (
    <Section
      variant="dark"
      id="contact-hero"
      className="relative overflow-hidden border-b border-white/10 py-18 sm:py-22 lg:py-24"
      style={{
        background:
          "linear-gradient(135deg, var(--color-company-hero-midnight-start) 0%, var(--color-company-ink) 52%, var(--color-company-hero-midnight-end) 100%)",
      }}
    >
      <div aria-hidden="true" className="pointer-events-none absolute inset-0">
        <div className="absolute inset-0 bg-[radial-gradient(62%_64%_at_86%_44%,var(--color-contact-hero-glow-cyan),var(--color-contact-hero-glow-cyan-soft)_56%,transparent_100%)]" />
        <div className="absolute inset-0 bg-[radial-gradient(52%_56%_at_8%_98%,var(--color-contact-hero-glow-ink),transparent_72%)]" />
        <div className="absolute inset-0 bg-[radial-gradient(40%_44%_at_66%_35%,var(--color-contact-hero-glow-steel),transparent_72%)]" />
      </div>

      <Container className="site-page-container relative">
        <div className="max-w-[44rem]">
          <SectionSignalEyebrow label="Contact & Support" light />

          <h1 className="mt-4 max-w-[20ch] text-balance text-[2.05rem] font-bold leading-[1.04] tracking-tight text-white sm:text-[2.45rem] lg:text-[2.92rem]">
            Reach the right SSP team quickly.
          </h1>

          <p className="mt-4 max-w-[56ch] text-[14.25px] leading-[1.74] text-white/74 sm:text-[15px]">
            Select a department and route your inquiry directly to the team best equipped to
            support shipments, carrier operations, compliance, technical issues, or general business
            requests.
          </p>
        </div>

        <motion.div
          initial={reduceMotion ? { opacity: 0.74 } : { opacity: 0.04, x: -34, y: 20 }}
          animate={reduceMotion ? { opacity: 0.74 } : { opacity: 0.84, x: 0, y: 0 }}
          transition={{ duration: reduceMotion ? 0 : 0.66, ease: [0.22, 1, 0.36, 1] }}
          className="pointer-events-none absolute right-[-45%] top-[-2%] h-[120%] w-[118%] sm:right-[-40%] sm:top-[-4%] sm:h-[126%] sm:w-[110%] md:right-[-31%] md:top-[-7%] md:h-[130%] md:w-[98%] lg:right-[-23%] lg:top-[-10%] lg:h-[134%] lg:w-[80%]"
          aria-hidden
          style={shardFadeStyle}
        >
          <div className="h-full w-full" style={shardMaskStyle} />
        </motion.div>
      </Container>
    </Section>
  );
}

function toTelHref(phone: string) {
  return `tel:${phone.replace(/[^\d+]/g, "")}`;
}

function scrollToContactForm() {
  const el = document.getElementById("contact-form-card");
  if (!el) return;

  const top = el.getBoundingClientRect().top + window.scrollY - NAV_OFFSET - 20;
  window.scrollTo({ top, behavior: "smooth" });
}

function ContactCallout() {
  return (
    <div className="mx-auto mb-5 max-w-5xl sm:mb-6">
      <div
        className={cn(
          "relative overflow-hidden rounded-2xl border px-4 py-3.5 sm:px-5 sm:py-4",
          "border-[color:var(--color-contact-callout-border)] bg-[linear-gradient(180deg,var(--color-contact-callout-bg-start)_0%,var(--color-contact-callout-bg-end)_100%)]",
          "shadow-[0_12px_28px_rgba(2,6,23,0.18)]",
        )}
      >
        <div
          aria-hidden
          className="pointer-events-none absolute inset-0"
          style={{
            background:
              "radial-gradient(70% 120% at 100% 0%, var(--color-contact-callout-glow), transparent 64%)",
          }}
        />
        <div className="relative flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between">
          <p className="min-w-0 text-[12.5px] leading-5 text-[color:var(--color-contact-callout-text)] sm:text-[13px]">
            Need help right away? Call{" "}
            <a
              href={toTelHref(NEXT_PUBLIC_SSP_PHONE)}
              className="font-semibold text-white underline decoration-white/25 underline-offset-4 transition hover:decoration-white/60"
            >
              {NEXT_PUBLIC_SSP_PHONE}
            </a>
            .
          </p>

          <div className="flex shrink-0 gap-2">
            <a
              href={toTelHref(NEXT_PUBLIC_SSP_PHONE)}
              className={cn(
                "inline-flex h-8 items-center justify-center gap-1.5 rounded-md px-3 text-[12px] font-semibold",
                "border border-[color:var(--color-brand-600)] bg-[linear-gradient(180deg,var(--color-brand-600),var(--color-brand-700))] text-white",
                "shadow-[0_6px_16px_rgba(215,25,32,0.16)] transition hover:-translate-y-[1px] hover:shadow-[0_10px_20px_rgba(215,25,32,0.22)]",
                "focus-ring-surface",
              )}
              aria-label={`Call SSP Group at ${NEXT_PUBLIC_SSP_PHONE}`}
            >
              <PhoneCall className="h-3.5 w-3.5" />
              Call
            </a>

            <button
              type="button"
              onClick={scrollToContactForm}
              className={cn(
                "inline-flex h-8 items-center justify-center rounded-md px-3 text-[12px] font-semibold",
                "border border-[color:var(--color-contact-callout-secondary-border)] bg-[color:var(--color-contact-callout-secondary-bg)] text-[color:var(--color-contact-callout-secondary-text)] backdrop-blur",
                "transition hover:-translate-y-[1px] hover:cursor-pointer hover:border-[color:var(--color-contact-callout-secondary-border-hover)] hover:text-white",
                "focus-ring-surface",
              )}
              aria-label="Scroll to contact form"
            >
              Form
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

function ContactSupportSection() {
  return (
    <section className="border-t border-[color:var(--color-border-light-soft)] bg-[color:var(--color-surface-0-light)] py-10 sm:py-12">
      <Container className="site-page-container">
        <div className="mx-auto max-w-3xl text-center">
          <SectionSignalEyebrow label="What to expect" className="justify-center" />
          <h2 className="mt-3 text-[1.5rem] font-semibold tracking-tight text-[color:var(--color-text-light)] sm:text-[1.85rem]">
            Simple, direct, and responsive
          </h2>
        </div>

        <div className="mt-8 grid grid-cols-1 gap-4 sm:mt-10 sm:grid-cols-3">
          {contactSupportItems.map((item) => {
            const Icon = item.icon;

            return (
              <div
                key={item.title}
                className={cn(
                  "group relative overflow-hidden rounded-[24px] border p-5 sm:p-6",
                  "border-[color:var(--color-border-light)] bg-white/88 backdrop-blur-sm",
                  "shadow-[0_10px_30px_rgba(15,23,42,0.05)] transition duration-300",
                  "hover:-translate-y-[1px] hover:shadow-[0_14px_36px_rgba(15,23,42,0.08)]",
                )}
              >
                <div
                  aria-hidden
                  className="absolute top-0 left-0 h-16 w-16 rounded-br-[22px]"
                  style={{
                    background:
                      "linear-gradient(135deg, rgba(215,25,32,0.10) 0%, rgba(215,25,32,0.04) 55%, transparent 100%)",
                  }}
                />

                <div className="relative flex items-start gap-4">
                  <div
                    className={cn(
                      "inline-flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl",
                      "border border-[color:var(--color-brand-100)] bg-white",
                      "shadow-[0_4px_12px_rgba(15,23,42,0.05)]",
                    )}
                  >
                    <Icon className="h-5.5 w-5.5 text-[color:var(--color-brand-600)]" />
                  </div>

                  <div className="min-w-0">
                    <h3 className="text-[1.05rem] font-semibold tracking-tight text-[color:var(--color-text-light)]">
                      {item.title}
                    </h3>

                    <p className="mt-2 max-w-[24ch] text-sm leading-6 text-[color:var(--color-muted-light)]">
                      {item.description}
                    </p>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </Container>
    </section>
  );
}

export default function ContactClient() {
  return (
    <div className="bg-[color:var(--color-surface-0-light)]">
      <ContactHero />

      <section id="contact-form" className="relative py-12 sm:py-14 lg:py-16">
        <div className="absolute inset-0" aria-hidden="true">
          <div
            className="absolute inset-0"
            style={{
              background:
                "radial-gradient(860px 460px at 16% -4%, var(--color-contact-form-glow-brand), transparent 62%)",
            }}
          />
          <div
            className="absolute inset-0"
            style={{
              background:
                "radial-gradient(980px 560px at 84% 112%, var(--color-contact-form-glow-ink), transparent 66%)",
            }}
          />
          <div className="absolute inset-0 bg-[linear-gradient(180deg,var(--color-contact-form-surface-start)_0%,var(--color-contact-form-surface-mid)_45%,var(--color-contact-form-surface-end)_100%)]" />
        </div>

        <Container className="site-page-container relative">
          <ContactCallout />

          <div id="contact-form-card" className="mx-auto max-w-5xl">
            <ContactForm />
          </div>
        </Container>
      </section>

      <ContactSupportSection />
    </div>
  );
}
