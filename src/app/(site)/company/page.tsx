import type { Metadata } from "next";
import Link from "next/link";
import { NAV } from "@/config/navigation";
import { PremiumPageScaffold } from "@/app/(site)/components/layout/PremiumPageScaffold";
import { Container } from "@/app/(site)/components/layout/Container";

export const metadata: Metadata = {
  title: "Company",
  description:
    "Learn about SSP Group's history, standards, network, and operating philosophy across North America.",
  alternates: {
    canonical: "/company",
  },
};

export default function CompanyHubPage() {
  return (
    <>
      <PremiumPageScaffold
        eyebrow="Company"
        title="Built on standards, scaled through disciplined execution."
        description="SSP Group combines operating discipline, compliance governance, and multi-company coordination to deliver dependable freight outcomes at scale."
        primaryCta={{ label: "Contact SSP", href: "/contact" }}
        secondaryCta={{ label: "Explore Careers", href: "/careers" }}
      />

      <section className="bg-[color:var(--color-surface-0)] pb-20">
        <Container className="site-page-container">
          <div className="mx-auto grid max-w-5xl grid-cols-1 gap-3 md:grid-cols-2">
            {NAV.company.links.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className="rounded-xl border border-white/12 bg-white/[0.03] px-4 py-4 hover:bg-white/[0.06]"
              >
                <p className="text-base font-semibold text-white">{item.label}</p>
                {item.description ? (
                  <p className="mt-1 text-sm text-[color:var(--color-nav-muted)]">{item.description}</p>
                ) : null}
              </Link>
            ))}
          </div>
        </Container>
      </section>
    </>
  );
}

