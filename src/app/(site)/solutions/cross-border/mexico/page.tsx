import type { Metadata } from "next";
import { SITE_URL } from "@/lib/seo/site";
import {
  CorridorHero,
  CorridorCardSection,
  CorridorGlassSection,
  CorridorStepsSection,
  CorridorFaqSection,
  CorridorCtaSection,
} from "../canada-usa/CanadaUsaSections";

const PAGE_TITLE = "Mexico Cross-Border Freight | Security-Grade Corridor Execution";
const PAGE_DESCRIPTION =
  "SSP operates managed freight programs across the U.S.–Mexico border with pedimento-aligned documentation, controlled border-zone transfers, security governance calibrated to corridor conditions, and disciplined execution through Laredo, El Paso, Nogales, and high-volume crossings.";

/* ── Data ─────────────────────────────────────────────────────────────── */

const capabilities = [
  {
    title: "Full Truckload (Dry Van)",
    body: "Standard truckload capacity across U.S.–Mexico corridors with vetted carrier networks on both sides of the border, schedule discipline, and committed coverage for recurring southbound and northbound programs.",
    href: "/solutions/dry-van",
  },
  {
    title: "Flatbed & Specialized",
    body: "Over-dimensional, open-deck, and heavy-haul freight with cross-border permitting, escort coordination, and route planning compliant with both Mexican and U.S. federal requirements.",
    href: "/solutions/flatbed",
  },
  {
    title: "Temperature-Controlled",
    body: "Reefer capacity for perishable goods, pharmaceuticals, and cold-chain commodities. Continuous monitoring through the border zone and into final delivery, with compliance documentation included.",
    href: "/solutions/temperature-controlled",
  },
  {
    title: "Drayage & Border Transfer",
    body: "Short-haul border-zone movements for trailer repositioning, relay transfers, and cross-dock operations at major crossing points where direct transit is restricted or operationally impractical.",
  },
  {
    title: "Bonded & In-Transit",
    body: "Bonded warehouse coordination and staged customs clearance for freight requiring temporary holding or phased release at the border zone before final delivery.",
  },
  {
    title: "Project Freight",
    body: "Complex multi-load programs for industrial, energy, and manufacturing projects requiring phased border execution, coordinated delivery schedules, and security-grade oversight.",
    href: "/solutions/project-freight",
  },
] as const;

const differentiators = [
  {
    title: "Pre-Movement Pedimento Control",
    body: "Pedimento filing, SAT alignment, and customs-agent coordination structured before freight reaches the border zone. Documentation gaps are resolved pre-dispatch, not discovered at the crossing.",
  },
  {
    title: "Security-Grade Corridor Governance",
    body: "Route-risk assessment, cargo sensitivity classification, vetted carrier networks with established security records, real-time GPS tracking, and structured escalation protocols. Controls calibrated to each corridor's conditions.",
  },
  {
    title: "Border-Zone Transfer Discipline",
    body: "Controlled handoffs through Laredo, El Paso, Nogales, and Otay Mesa. Drayage, cross-dock, and relay transfers executed with milestone confirmation and chain-of-custody accountability at every stage.",
  },
  {
    title: "Bilateral Compliance Framework",
    body: "Mexican customs (SAT/pedimento) and U.S. re-entry (CBP) documentation managed under a single coordination framework. Northbound and southbound clearance requirements handled by the same program team.",
  },
] as const;

const processSteps = [
  {
    step: "01",
    title: "Corridor qualification",
    body: "Route conditions, security profile, commodity requirements, and documentation standards evaluated before freight is committed. SSP qualifies the corridor, not just the lane.",
  },
  {
    step: "02",
    title: "Documentation and customs alignment",
    body: "Pedimento preparation, customs-agent coordination, and commercial documentation validated before dispatch. No freight moves until clearance readiness is confirmed on both sides.",
  },
  {
    step: "03",
    title: "Border-zone execution",
    body: "Controlled handoff at the crossing point with drayage coordination, transfer management, and post-clearance delivery to final destination under continuous tracking and defined exception protocols.",
  },
  {
    step: "04",
    title: "Security and performance governance",
    body: "Route monitoring, exception escalation, and corridor-level performance metrics reviewed in structured governance cycles. Security posture and delivery reliability measured continuously, not retrospectively.",
  },
] as const;

const faqItems = [
  {
    q: "Which Mexico border crossings does SSP operate through?",
    a: "SSP manages freight programs through Laredo (Nuevo Laredo), El Paso (Ciudad Juarez), Nogales, Otay Mesa (Tijuana), and additional crossings selected based on corridor requirements, commodity profile, and route-security conditions.",
  },
  {
    q: "How does SSP handle pedimento requirements?",
    a: "Through pre-movement documentation preparation, customs-agent coordination, and pedimento filing discipline built into the corridor operating playbook. All documentation is validated before freight reaches the border zone.",
  },
  {
    q: "What security controls does SSP apply to Mexico freight?",
    a: "Route-risk assessment, cargo sensitivity classification, vetted carrier networks with established security records, real-time GPS monitoring, and structured escalation protocols. Security posture is calibrated to each corridor's specific conditions.",
  },
  {
    q: "Can SSP manage cross-dock and relay transfers at the border?",
    a: "Yes. SSP coordinates cross-dock operations, trailer-to-trailer transfers, and relay movements at major border crossings where direct crossing is restricted or operationally impractical.",
  },
  {
    q: "Does SSP handle northbound (Mexico to U.S.) freight?",
    a: "Yes. SSP manages bilateral programs in both directions. Northbound freight includes U.S. CBP re-entry documentation, broker coordination, and entry-summary data preparation alongside Mexican export requirements.",
  },
  {
    q: "How does SSP govern freight security in high-risk corridors?",
    a: "Through route-specific risk assessments, carrier vetting calibrated to corridor sensitivity, real-time monitoring, defined escalation protocols, and governance reviews that track incident trends and response effectiveness over time.",
  },
] as const;

/* ── Metadata ────────────────────────────────────────────────────────── */

export const metadata: Metadata = {
  title: PAGE_TITLE,
  description: PAGE_DESCRIPTION,
  alternates: { canonical: "/solutions/cross-border/mexico" },
  openGraph: {
    title: `${PAGE_TITLE} | SSP Group`,
    description: PAGE_DESCRIPTION,
    url: "/solutions/cross-border/mexico",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: `${PAGE_TITLE} | SSP Group`,
    description: PAGE_DESCRIPTION,
  },
};

/* ── Page ─────────────────────────────────────────────────────────────── */

export default function MexicoCrossBorderPage() {
  const faqJsonLd = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: faqItems.map((item) => ({
      "@type": "Question",
      name: item.q,
      acceptedAnswer: { "@type": "Answer", text: item.a },
    })),
  };

  const serviceJsonLd = {
    "@context": "https://schema.org",
    "@type": "Service",
    name: "Mexico Cross-Border Freight",
    provider: { "@type": "Organization", name: "SSP Group", url: SITE_URL },
    serviceType: "Mexico Cross-Border Logistics",
    areaServed: ["United States", "Mexico"],
    description: PAGE_DESCRIPTION,
    url: `${SITE_URL}/solutions/cross-border/mexico`,
  };

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(serviceJsonLd) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqJsonLd) }} />

      <CorridorHero
        eyebrow="Mexico Cross-Border"
        title="U.S.–Mexico freight with security-grade control across every corridor."
        description="SSP operates managed freight programs across the U.S.–Mexico border with pedimento-aligned documentation, controlled border-zone transfers, security governance calibrated to corridor conditions, and disciplined execution through Laredo, El Paso, Nogales, and high-volume crossings."
        primaryCta={{ label: "Discuss Your Requirements", href: "/contact" }}
        secondaryCta={{ label: "Explore Capabilities", href: "#capabilities" }}
        flag="mexico"
      />

      <CorridorCardSection
        id="capabilities"
        eyebrow="Service Capabilities"
        title="Cross-border capacity for the operational demands of the Mexico corridor."
        description="Truckload, specialized, drayage, and bonded freight modes for recurring programs and project-based cross-border execution."
        cards={capabilities}
        layout="sidebar"
      />

      <CorridorGlassSection
        eyebrow="The SSP Difference"
        title="Why the Mexico corridor requires a different operating standard."
        description="The U.S.–Mexico border demands more than carrier access. It requires pedimento-level documentation control, security-grade governance, and border-zone transfer coordination that standard freight providers are not structured to deliver."
        cards={differentiators}
      />

      <CorridorStepsSection
        eyebrow="How It Works"
        title="How SSP builds and governs a Mexico cross-border freight program."
        description="Every corridor follows a defined execution framework: qualify the corridor, control the documentation, execute the border transfer, govern with security discipline."
        steps={processSteps}
      />

      <CorridorFaqSection
        eyebrow="Common Questions"
        title="Questions shippers ask before committing freight to the Mexico corridor."
        description="Practical questions from procurement, logistics, and operations teams evaluating security-grade cross-border freight programs for U.S.–Mexico lanes."
        items={faqItems}
      />

      <CorridorCtaSection
        eyebrow="Start Your Program"
        title="Build a Mexico freight program with security-grade operational discipline."
        description="Share your corridor requirements, commodity profile, and security priorities. SSP will scope a structured program designed for the U.S.–Mexico corridor."
        pills={["Pedimento-aligned workflows", "Border-zone coordination", "Security governance", "Bilateral compliance"]}
        primaryCta={{ label: "Request a Corridor Assessment", href: "/quote" }}
        secondaryCta={{ label: "Contact SSP Group", href: "/contact" }}
      />
    </>
  );
}
