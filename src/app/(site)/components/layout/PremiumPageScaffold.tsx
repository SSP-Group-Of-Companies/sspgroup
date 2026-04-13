import Link from "next/link";
import { Container } from "./Container";
import { cn } from "@/lib/cn";

export function PremiumPageScaffold({
  eyebrow,
  title,
  description,
  primaryCta,
  secondaryCta,
}: {
  eyebrow: string;
  title: string;
  description: string;
  primaryCta?: { label: string; href: string };
  secondaryCta?: { label: string; href: string };
}) {
  return (
    <section className="relative overflow-hidden bg-[color:var(--color-company-ink)] py-24">
      <div className="pointer-events-none absolute inset-0" aria-hidden>
        <div className="absolute top-[-100px] right-[-120px] h-[280px] w-[280px] rounded-full bg-[color:var(--color-brand-600)]/10 blur-[90px]" />
        <div className="absolute bottom-[-120px] left-[-130px] h-[320px] w-[320px] rounded-full bg-[color:var(--color-ssp-cyan-500)]/12 blur-[110px]" />
      </div>

      <Container className="site-page-container relative">
        <div className="mx-auto max-w-4xl text-center">
          <p className="text-xs font-semibold tracking-[0.16em] text-white/50 uppercase">
            {eyebrow}
          </p>
          <h1 className="mt-4 text-4xl font-semibold tracking-tight text-white sm:text-5xl">{title}</h1>
          <p className="mx-auto mt-5 max-w-3xl text-base leading-7 text-white/65">
            {description}
          </p>

          {(primaryCta || secondaryCta) && (
            <div className="mt-8 flex flex-wrap items-center justify-center gap-3">
              {primaryCta ? (
                <Link
                  href={primaryCta.href}
                  className={cn(
                    "inline-flex h-11 items-center justify-center px-5 text-sm font-semibold text-white",
                    "bg-[color:var(--color-brand-600)] hover:bg-[color:var(--color-brand-700)]",
                    "site-cta-radius",
                    "focus:outline-none focus-visible:ring-2 focus-visible:ring-white/70 focus-visible:ring-offset-2 focus-visible:ring-offset-[color:var(--color-company-ink)]",
                  )}
                >
                  {primaryCta.label}
                </Link>
              ) : null}

              {secondaryCta ? (
                <Link
                  href={secondaryCta.href}
                  className={cn(
                    "inline-flex h-11 items-center justify-center border border-white/22 px-5 text-sm font-medium text-white/90",
                    "hover:bg-white/8",
                    "site-cta-radius",
                    "focus:outline-none focus-visible:ring-2 focus-visible:ring-white/70 focus-visible:ring-offset-2 focus-visible:ring-offset-[color:var(--color-company-ink)]",
                  )}
                >
                  {secondaryCta.label}
                </Link>
              ) : null}
            </div>
          )}
        </div>
      </Container>
    </section>
  );
}

