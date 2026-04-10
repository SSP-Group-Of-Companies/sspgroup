// src/app/(site)/components/layout/SiteFooter.tsx

import Link from "next/link";
import { ArrowUpRight, Facebook, Instagram, Linkedin, Mail, Youtube } from "lucide-react";
import { CardImage } from "@/components/media/CardImage";
import { Container } from "@/app/(site)/components/layout/Container";
import { TrackedLink } from "@/app/(site)/components/analytics/TrackedLink";
import { FOOTER_LEGAL_LINKS, FOOTER_QUICK_ACTIONS, FOOTER_SECTIONS, FOOTER_SOCIALS, type FooterSocial } from "@/config/footer";
import { cn } from "@/lib/cn";
import { FooterLegalLane } from "./footer/FooterLegalLane";

const footerLink = cn(
  "relative inline-flex w-fit items-center pb-0.5 text-[13px] leading-6 font-normal text-[color:var(--color-footer-link)] transition-colors duration-200",
  "after:absolute after:right-0 after:-bottom-0.5 after:left-0 after:h-[1.5px] after:origin-left after:scale-x-0 after:bg-[color:var(--color-menu-accent)] after:transition-transform after:duration-300 after:ease-[cubic-bezier(0.22,1,0.36,1)]",
  "hover:text-[color:var(--color-footer-link-hover)] hover:after:scale-x-100",
  "focus-visible:text-[color:var(--color-footer-link-hover)] focus-visible:after:scale-x-100",
  "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[color:var(--color-brand-600)] focus-visible:ring-offset-2 focus-visible:ring-offset-[color:var(--color-footer-bg)]",
);

const footerHeading = "text-[11px] font-bold tracking-[0.08em] text-[color:var(--color-footer-heading)] uppercase sm:text-[12px]";

const footerLegalLink = cn(
  "text-[13px] text-[color:var(--color-footer-legal-muted)] transition-colors",
  "hover:text-[color:var(--color-footer-legal-hover)]",
  "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[color:var(--color-brand-600)] focus-visible:ring-offset-2 focus-visible:ring-offset-[color:var(--color-footer-legal-bg)]",
);

const SOCIAL_ICON_MAP: Record<FooterSocial["icon"], typeof Facebook> = {
  facebook: Facebook,
  linkedin: Linkedin,
  instagram: Instagram,
  youtube: Youtube,
  mail: Mail,
};

export function SiteFooter() {
  const year = new Date().getFullYear();

  return (
    <footer
      className={cn(
        "relative overflow-hidden",
        "md:border-t md:border-[color:var(--color-footer-border)]",
        "md:bg-[color:var(--color-footer-bg)]",
      )}
    >
      <Container className="relative hidden max-w-[1440px] px-4 pt-14 pb-14 sm:px-6 sm:pt-16 sm:pb-16 md:block lg:px-6">
        {/* Footer navigation (desktop/tablet) */}
        <nav aria-label="Footer">
          <div className="hidden gap-8 md:grid md:grid-cols-2 md:gap-x-12 md:gap-y-10 lg:grid-cols-3 xl:grid-cols-[repeat(5,minmax(0,1fr))_minmax(220px,0.95fr)] xl:gap-x-9 xl:gap-y-10">
            {/* Solutions */}
            <div>
              <h3 className={footerHeading}>
                Solutions
              </h3>
              <ul className="mt-4 space-y-3">
                <li>
                  <TrackedLink
                    href="/solutions"
                    ctaId="footer_view_all_solutions"
                    location="footer:solutions"
                    label="View all solutions"
                    className={footerLink}
                  >
                    View all solutions →
                  </TrackedLink>
                </li>
                {FOOTER_SECTIONS.solutions.links.map((item, idx) => (
                  <li key={`${item.href}-${idx}`}>
                    <TrackedLink
                      href={item.href}
                      ctaId={`footer_solution_${item.label}`}
                      location="footer:solutions"
                      label={item.label}
                      className={footerLink}
                    >
                      {item.label}
                    </TrackedLink>
                  </li>
                ))}
              </ul>
            </div>

            {/* Industries */}
            <div>
              <h3 className={footerHeading}>
                Industries
              </h3>
              <ul className="mt-4 space-y-3">
                <li>
                  <TrackedLink
                    href="/industries"
                    ctaId="footer_view_all_industries"
                    location="footer:industries"
                    label="View all industries"
                    className={footerLink}
                  >
                    View all industries →
                  </TrackedLink>
                </li>
                {FOOTER_SECTIONS.industries.links.map((l, idx) => (
                  <li key={`${l.href}-${idx}`}>
                    <TrackedLink
                      href={l.href}
                      ctaId={`footer_industry_${l.label}`}
                      location="footer:industries"
                      label={l.label}
                      className={footerLink}
                    >
                      {l.label}
                    </TrackedLink>
                  </li>
                ))}
              </ul>
            </div>

            {/* Company */}
            <div>
              <h3 className={footerHeading}>
                Company
              </h3>
              <ul className="mt-4 space-y-3">
                {FOOTER_SECTIONS.company.links.map((l, idx) => (
                  <li key={`${l.href}-${idx}`}>
                    <TrackedLink
                      href={l.href}
                      ctaId={`footer_company_${l.label}`}
                      location="footer:company"
                      label={l.label}
                      className={footerLink}
                    >
                      {l.label}
                    </TrackedLink>
                  </li>
                ))}
              </ul>
            </div>

            {/* Careers */}
            <div>
              <h3 className={footerHeading}>
                Careers
              </h3>
              <ul className="mt-4 space-y-3">
                {FOOTER_SECTIONS.careers.links.map((l, idx) => (
                  <li key={`${l.href}-${idx}`}>
                    <TrackedLink
                      href={l.href}
                      ctaId={`footer_careers_${l.label}`}
                      location="footer:careers"
                      label={l.label}
                      className={footerLink}
                    >
                      {l.label}
                    </TrackedLink>
                  </li>
                ))}
              </ul>
            </div>

            {/* Quick actions */}
            <div>
              <h3 className={footerHeading}>
                Quick actions
              </h3>
              <ul className="mt-4 space-y-3">
                {FOOTER_QUICK_ACTIONS.map((action) => (
                  <li key={action.href}>
                    <TrackedLink
                      href={action.href}
                      ctaId={action.ctaIdDesktop}
                      location="footer:quick_actions"
                      label={action.label}
                      className={
                        action.highlight
                          ? cn(
                              "inline-flex items-center gap-1 text-[13px] leading-6 font-semibold text-[color:var(--color-brand-500)]",
                              "hover:text-[color:var(--color-brand-500)]",
                              "focus-visible:ring-2 focus-visible:ring-[color:var(--color-brand-600)] focus-visible:ring-offset-2 focus-visible:ring-offset-[color:var(--color-footer-bg)] focus-visible:outline-none",
                            )
                          : cn(footerLink, action.externalCue && "inline-flex items-center gap-1")
                      }
                    >
                      {action.label}
                      {action.externalCue ? <ArrowUpRight className="h-3.5 w-3.5 opacity-80" aria-hidden="true" /> : null}
                    </TrackedLink>
                  </li>
                ))}
              </ul>
            </div>

            {/* Brand rail */}
            <aside className="hidden md:block md:col-span-2 md:border-t md:border-[color:var(--color-footer-card-border)] md:pt-5 lg:col-span-3 xl:col-span-1 xl:border-t-0 xl:pt-0 xl:pl-4">
              <Link
                href="/"
                className={cn(
                  "inline-flex items-center",
                  "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[color:var(--color-brand-600)] focus-visible:ring-offset-2 focus-visible:ring-offset-[color:var(--color-footer-bg)]",
                )}
              >
                <CardImage
                  src="/_optimized/brand/SSPlogo.png"
                  alt="SSP Group"
                  width={150}
                  height={44}
                  className="h-10 w-auto object-contain"
                />
              </Link>

              <p className="mt-4 max-w-[16rem] text-[11px] font-semibold tracking-[0.11em] text-[color:var(--color-footer-tagline)] uppercase">
                Your Success is our success
              </p>
              <p className="mt-2 max-w-[18rem] text-[12px] leading-6 text-[color:var(--color-footer-description)]">
                Trusted by leading companies for over 10 years across North America.
              </p>

              <div className="mt-5 flex items-center gap-2.5">
                {FOOTER_SOCIALS.map((social) => {
                  const Icon = SOCIAL_ICON_MAP[social.icon];
                  return (
                    <Link
                      key={social.href}
                      href={social.href}
                      target={social.external ? "_blank" : undefined}
                      rel={social.external ? "noopener noreferrer" : undefined}
                      aria-label={social.label}
                      className={cn(
                        "inline-flex h-8 w-8 items-center justify-center rounded-full border border-[color:var(--color-footer-social-border)] transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[color:var(--color-brand-600)]",
                        social.toneClass,
                        social.hoverClass,
                      )}
                    >
                      <Icon className="h-4 w-4" />
                    </Link>
                  );
                })}
              </div>
            </aside>
          </div>

        </nav>

        {/* Single oversized watermark on the light quick-links surface */}
        <div className="pointer-events-none absolute inset-x-0 bottom-4 z-0 hidden md:block" aria-hidden="true">
          <div className="relative h-64">
            <div className="absolute -right-10 -bottom-3 lg:-right-14">
              <CardImage
                src="/_optimized/brand/favicon.png"
                alt="SSP watermark"
                width={1400}
                height={1400}
                className="h-[240px] w-[240px] object-contain opacity-[0.029] lg:h-[300px] lg:w-[300px]"
              />
            </div>
          </div>
        </div>

      </Container>

      <div className="border-t border-[color:var(--color-footer-border)] bg-[color:var(--color-footer-bg)] md:hidden">
        <Container className="px-4 pt-5 pb-4">
          <div>
            <Link
              href="/"
              className={cn(
                "inline-flex items-center",
                "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[color:var(--color-brand-600)] focus-visible:ring-offset-2 focus-visible:ring-offset-[color:var(--color-footer-bg)]",
              )}
            >
              <CardImage
                src="/_optimized/brand/SSPlogo.png"
                alt="SSP Group"
                width={138}
                height={40}
                className="h-9 w-auto object-contain"
              />
            </Link>

            <p className="mt-3 text-[11px] font-semibold tracking-[0.08em] text-[color:var(--color-footer-tagline)] uppercase">
              Your Success is our success
            </p>

            <div className="mt-3 flex items-center gap-2.5">
              {FOOTER_SOCIALS.map((social) => {
                const Icon = SOCIAL_ICON_MAP[social.icon];
                return (
                  <Link
                    key={`m-${social.href}`}
                    href={social.href}
                    target={social.external ? "_blank" : undefined}
                    rel={social.external ? "noopener noreferrer" : undefined}
                    aria-label={social.label}
                    className={cn(
                      "inline-flex h-8 w-8 items-center justify-center rounded-full border border-[color:var(--color-footer-social-border)] transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[color:var(--color-brand-600)]",
                      social.toneClass,
                      social.hoverClass,
                    )}
                  >
                    <Icon className="h-4 w-4" />
                  </Link>
                );
              })}
            </div>
          </div>
        </Container>
      </div>

      <FooterLegalLane className="mt-0">
        <Container className="max-w-[1440px] px-4 pt-7 pb-12 sm:px-6 sm:py-7 lg:px-6">
          <div
            className={cn(
              "flex flex-col items-center gap-6 text-center",
              "sm:flex-row sm:flex-wrap sm:items-center sm:justify-between sm:gap-6 sm:text-left",
            )}
          >
            <div className="min-w-0">
              <p className="max-w-sm text-[13px] font-medium text-[color:var(--color-footer-legal-muted)]/92 sm:max-w-none sm:text-xs sm:font-normal">
                Milton, ON HQ • Canada, U.S. & Mexico coverage • 24/7 support
              </p>
            </div>

            <nav
              aria-label="Legal"
              className="flex max-w-[22rem] flex-wrap justify-center gap-x-5 gap-y-2.5 pr-12 text-center sm:max-w-none sm:justify-start sm:gap-x-6 sm:gap-y-2 sm:pr-0"
            >
              {FOOTER_LEGAL_LINKS.map((link) => (
                <Link key={link.href} href={link.href} className={footerLegalLink}>
                  {link.label}
                </Link>
              ))}
            </nav>

            <p className="pr-14 text-[13px] text-[color:var(--color-footer-legal-muted)] sm:pr-0 sm:text-sm">
              © {year} SSP Group. All rights reserved.
            </p>
          </div>
        </Container>
      </FooterLegalLane>
    </footer>
  );
}
