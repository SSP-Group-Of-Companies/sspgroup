import type { Metadata } from "next";
import { SITE_URL } from "@/lib/seo/site";
import {
  CorridorHero,
  CorridorCardSection,
  CorridorGlassSection,
  CorridorStepsSection,
  CorridorFaqSection,
  CorridorCtaSection,
} from "./CanadaUsaSections";

const PAGE_TITLE = "Canada–USA Cross-Border Freight | Managed Corridor Programs";
const PAGE_DESCRIPTION =
  "SSP operates managed freight programs across the Canada–USA border with CUSMA-aligned documentation, coordinated customs brokerage, strategic crossing selection, and structured governance from first mile to final delivery.";

/* ── Data ─────────────────────────────────────────────────────────────── */

const capabilities = [
  {
    title: "Full Truckload (Dry Van)",
    body: "High-volume truckload coverage across major Canada–USA corridors. Consistent lane availability, committed capacity, and schedule discipline for programs that require reliability at scale.",
    href: "/solutions/dry-van",
  },
  {
    title: "Flatbed & Step Deck",
    body: "Over-dimensional and open-deck freight with cross-border permitting, escort coordination, route planning, and securement standards compliant with both Canadian and U.S. federal requirements.",
    href: "/solutions/flatbed",
  },
  {
    title: "Temperature-Controlled",
    body: "Reefer and multi-temp capacity for perishable, pharmaceutical, and cold-chain commodities. Continuous temperature monitoring and cross-border compliance documentation included.",
    href: "/solutions/temperature-controlled",
  },
  {
    title: "Hazmat & Regulated Materials",
    body: "TDG and DOT-compliant transport for hazardous and regulated materials. Placarding, safety documentation, and pre-cleared border protocols managed for both jurisdictions.",
    href: "/solutions/hazmat",
  },
  {
    title: "LTL & Consolidated",
    body: "Consolidated cross-border shipments for lower-volume or multi-stop programs. Customs clearance coordinated at both origin and destination with unified tracking.",
    href: "/solutions/ltl",
  },
  {
    title: "Expedited & Time-Critical",
    body: "Dedicated capacity for urgent recoveries, production-line support, and time-definite commitments when standard transit windows are not sufficient.",
    href: "/solutions/expedited",
  },
] as const;

const differentiators = [
  {
    title: "Pre-Movement Documentation Control",
    body: "Rules-of-origin certification, tariff classification, and preferential duty treatment structured before freight dispatches. CUSMA compliance built into the program design, not corrected at the border.",
  },
  {
    title: "Strategic Crossing Selection",
    body: "Routing decisions informed by real-time crossing congestion, commodity restrictions, and clearance history. Ambassador Bridge, Peace Bridge, Pacific Highway, and Blue Water Bridge programs actively managed.",
  },
  {
    title: "Bilateral Broker Coordination",
    body: "Licensed customs brokers on both sides of the border aligned before the first shipment moves. Release models, payment pathways, and clearance expectations confirmed, documented, and monitored.",
  },
  {
    title: "Lane-Level Performance Governance",
    body: "Delivery metrics, border dwell-time trends, and exception patterns reviewed in recurring governance cycles. Operational feedback loops that strengthen reliability, not quarterly summaries.",
  },
] as const;

const processSteps = [
  {
    step: "01",
    title: "Program scoping",
    body: "Corridor requirements, commodity profile, service-level targets, and documentation standards defined. No freight moves until the lane is qualified and the operating playbook is confirmed.",
  },
  {
    step: "02",
    title: "Network alignment",
    body: "Vetted carriers assigned to qualified lanes. Licensed customs brokers confirmed for both Canada and the United States. Release models and clearance protocols documented before dispatch.",
  },
  {
    step: "03",
    title: "Border execution",
    body: "Shipments dispatched against planned milestones with real-time tracking through the border zone. Clearance, post-release delivery, and exception management executed to defined protocols.",
  },
  {
    step: "04",
    title: "Performance governance",
    body: "Delivery consistency, dwell-time trends, and exception drivers reviewed in structured governance cycles. Lane reliability strengthened through data, not reaction.",
  },
] as const;

const faqItems = [
  {
    q: "Which border crossings does SSP manage for Canada–USA freight?",
    a: "SSP operates programs through Ambassador Bridge (Windsor–Detroit), Peace Bridge (Fort Erie–Buffalo), Pacific Highway (Surrey–Blaine), Blue Water Bridge (Point Edward–Port Huron), and additional crossings matched to lane requirements and commodity profiles.",
  },
  {
    q: "Does SSP handle both northbound and southbound freight?",
    a: "Yes. SSP manages bilateral programs with dedicated playbooks for each direction, including country-specific documentation, broker coordination, and distinct clearance workflows for CBP (U.S.-bound) and CBSA (Canada-bound).",
  },
  {
    q: "How does SSP manage CUSMA compliance?",
    a: "Through pre-movement rules-of-origin verification, tariff classification review, and certificate-of-origin coordination between shipper, customs broker, and the SSP program team. Documentation is validated before dispatch to prevent clearance delays.",
  },
  {
    q: "What equipment types are available for Canada–USA lanes?",
    a: "Dry van, flatbed, step deck, temperature-controlled, hazmat, LTL, and expedited. Equipment is matched to commodity profile, lane requirements, and regulatory constraints on both sides of the border.",
  },
  {
    q: "How does SSP handle unexpected delays at the border?",
    a: "Every program includes pre-defined exception protocols. When delays occur, SSP initiates escalation within the committed response window, coordinates with the customs broker, and communicates revised ETAs to the shipper in real time.",
  },
  {
    q: "What level of visibility do shippers receive?",
    a: "Milestone-level tracking from dispatch through border clearance to proof of delivery. Proactive updates at key checkpoints, with full documentation accessible through the SSP platform.",
  },
] as const;

/* ── Metadata ────────────────────────────────────────────────────────── */

export const metadata: Metadata = {
  title: PAGE_TITLE,
  description: PAGE_DESCRIPTION,
  alternates: { canonical: "/solutions/cross-border/canada-usa" },
  openGraph: {
    title: `${PAGE_TITLE} | SSP Group`,
    description: PAGE_DESCRIPTION,
    url: "/solutions/cross-border/canada-usa",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: `${PAGE_TITLE} | SSP Group`,
    description: PAGE_DESCRIPTION,
  },
};

/* ── Page ─────────────────────────────────────────────────────────────── */

export default function CanadaUsaPage() {
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
    name: "Canada–USA Cross-Border Freight",
    provider: { "@type": "Organization", name: "SSP Group", url: SITE_URL },
    serviceType: "Canada-USA Cross-Border Logistics",
    areaServed: ["Canada", "United States"],
    description: PAGE_DESCRIPTION,
    url: `${SITE_URL}/solutions/cross-border/canada-usa`,
  };

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(serviceJsonLd) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqJsonLd) }} />

      <CorridorHero
        eyebrow="Canada–USA Corridor"
        title="Cross-border freight for North America's highest-volume trade corridor."
        description="SSP operates managed freight programs across the Canada–USA border with CUSMA-aligned documentation, coordinated customs brokerage, strategic crossing selection, and structured governance from first mile to final delivery."
        primaryCta={{ label: "Discuss Your Requirements", href: "/contact" }}
        secondaryCta={{ label: "Explore Capabilities", href: "#capabilities" }}
        flag="canada-usa"
      />

      <CorridorCardSection
        id="capabilities"
        eyebrow="Service Capabilities"
        title="Cross-border capacity across every major equipment class."
        description="Truckload, specialized, and consolidated modes for recurring bilateral programs and time-sensitive cross-border freight."
        cards={capabilities}
        layout="sidebar"
      />

      <CorridorGlassSection
        eyebrow="The SSP Difference"
        title="What separates SSP from standard cross-border providers."
        description="Carrier coverage is table stakes. SSP builds the operating framework around your freight: documentation controls, crossing strategy, broker alignment, and lane-level governance designed to prevent failures before they occur."
        cards={differentiators}
      />

      <CorridorStepsSection
        eyebrow="How It Works"
        title="How SSP builds and governs a Canada–USA freight program."
        description="Every corridor follows a defined execution framework: scope the program, align the network, execute to plan, govern with data."
        steps={processSteps}
      />

      <CorridorFaqSection
        eyebrow="FAQ"
        title="Questions shippers ask before choosing a Canada–USA freight partner."
        description="Practical questions from procurement, logistics, and operations teams evaluating cross-border freight programs for the Canada–USA corridor."
        items={faqItems}
      />

      <CorridorCtaSection
        eyebrow="Start Your Program"
        title="Build a Canada–USA freight program with operational discipline."
        description="Share your lane requirements and service priorities. SSP will scope a structured program designed for your corridor."
        pills={["Lane-level onboarding", "CUSMA-aligned workflows", "Dedicated corridor team", "Bilateral broker coordination"]}
        primaryCta={{ label: "Request a Corridor Assessment", href: "/quote", ctaId: "cb_canada_usa_final_quote" }}
        secondaryCta={{ label: "Contact SSP Group", href: "/contact", ctaId: "cb_canada_usa_final_contact" }}
      />
    </>
  );
}
