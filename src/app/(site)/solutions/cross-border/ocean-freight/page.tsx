import type { Metadata } from "next";
import { SITE_URL } from "@/lib/seo/site";
import {
  OceanHero,
  OceanCardSection,
  OceanGlassSection,
  OceanStepsSection,
  OceanFaqSection,
  OceanCtaSection,
} from "./OceanFreightSections";

const PAGE_TITLE = "Cross-Border Ocean Freight | Managed Port-to-Door Programs";
const PAGE_DESCRIPTION =
  "We manage ocean freight from booking through port clearance, customs coordination, and inland delivery across Canada, the U.S., and Mexico. Milestone visibility and cross-border execution built into every program.";
const PAGE_OG_IMAGE = "/_optimized/solution/crossBorder/ocean-hero-globe.jpg";

/* ── Data ─────────────────────────────────────────────────────────────── */

const coreCapabilities = [
  {
    title: "Full Container Load (FCL)",
    body: "Dedicated container capacity for high-volume shipments with direct routing, predictable scheduling, and milestone governance from origin port to final delivery.",
  },
  {
    title: "Less-than-Container Load (LCL)",
    body: "Consolidated ocean freight for smaller volumes with shared container economics, no minimum commitments, and coordination with your inland delivery schedule.",
  },
  {
    title: "Port-to-Door Management",
    body: "Post-arrival execution managed end to end: port discharge, customs clearance, drayage, deconsolidation, and inland delivery under a single coordination plan.",
  },
  {
    title: "Cross-Border Distribution",
    body: "Ocean containers arriving at U.S. or Canadian ports distributed across Canada–USA or U.S.–Mexico corridors with customs coordination and delivery confirmation at every border.",
  },
  {
    title: "Heavy & Oversized Cargo",
    body: "Engineered loading plans for heavy machinery, steel coils, and over-dimensional freight. Flat racks, open-tops, and precision blocking and bracing for safe international transit.",
  },
  {
    title: "Customs & Trade Compliance",
    body: "CBSA, CBP, and Mexican customs coordination built into every program. HS classification, duty management, permits, and advance filing handled before cargo arrives.",
  },
] as const;

const differentiators = [
  {
    title: "Asset-Backed Inland Delivery",
    body: "We connects ocean freight into its inland network and approved operating partners across North America, keeping one team accountable from port clearance through final-mile delivery.",
  },
  {
    title: "Cross-Border Specialization",
    body: "Cross-border operating experience in Canada–USA and U.S.–Mexico customs, documentation, and border logistics is built into how We structure ocean programs.",
  },
  {
    title: "Milestone Governance",
    body: "Every shipment tracked from vessel departure through port clearance, drayage, inland transit, and delivery confirmation, with proactive exception management when timelines shift.",
  },
  {
    title: "Single-Provider Accountability",
    body: "One team, one execution plan, one point of contact from port to final delivery. No fragmented handoffs between disconnected providers.",
  },
] as const;

const processSteps = [
  {
    step: "01",
    title: "Program planning",
    body: "Volume forecasts, origin ports, commodity profiles, container requirements, and inland destinations defined. We structure the program around your supply chain rhythm.",
  },
  {
    step: "02",
    title: "Booking & documentation",
    body: "Container capacity secured with preferred carriers. Bills of lading, ISF filings, export documentation, and cargo insurance coordinated before vessel departure.",
  },
  {
    step: "03",
    title: "Port clearance & drayage",
    body: "Vessel arrival monitored. Customs clearance executed through CBSA, CBP, or Mexican customs. Container drayage arranged. Inspections and holds managed proactively.",
  },
  {
    step: "04",
    title: "Inland & cross-border delivery",
    body: "Freight moves from port through inland transit, with cross-border customs coordination where required, to final delivery through the aligned operating network with milestone confirmation.",
  },
] as const;

const faqItems = [
  {
    q: "Do we manage the full port-to-door journey?",
    a: "Yes. We coordinate from vessel arrival through customs clearance, drayage, inland transit, and final delivery, including cross-border movements where the destination requires border coordination. One team manages the sequence end to end.",
  },
  {
    q: "What is the difference between FCL and LCL?",
    a: "FCL dedicates a full container to your freight, ideal for larger volumes with direct routing and faster transit. LCL consolidates your cargo with other shipments in a shared container, making it more cost-effective for smaller volumes with slightly longer transit due to consolidation handling.",
  },
  {
    q: "Can ocean freight connect into cross-border distribution?",
    a: "Yes. Containerized freight arriving at U.S. or Canadian ports can be distributed across the Canada–USA or U.S.–Mexico border with full customs coordination, inland trucking, and milestone governance at every stage.",
  },
  {
    q: "Which ports do we operate through?",
    a: "We coordinate programs through major Canadian gateways such as the Port of Vancouver, the Port of Montreal, and Greater Toronto Area logistics hubs, with routing aligned to the origin, destination, and cargo profile.",
  },
  {
    q: "Can we handle heavy, oversized, or specialized cargo?",
    a: "Yes. We manage ocean freight for heavy machinery, steel coils, and over-dimensional cargo using flat racks, open-top containers, engineered loading plans, and precision blocking and bracing for safe international transit.",
  },
  {
    q: "How far in advance should I plan ocean freight shipments?",
    a: "Typical programs require 2–6 weeks of lead time depending on origin, destination port, and vessel availability. We works with shippers to build booking cadences aligned with production schedules and inventory cycles.",
  },
] as const;

/* ── Metadata ────────────────────────────────────────────────────────── */

export const metadata: Metadata = {
  title: PAGE_TITLE,
  description: PAGE_DESCRIPTION,
  alternates: { canonical: "/solutions/cross-border/ocean-freight" },
  openGraph: {
    title: `${PAGE_TITLE} | SSP Group`,
    description: PAGE_DESCRIPTION,
    url: "/solutions/cross-border/ocean-freight",
    type: "website",
    images: [PAGE_OG_IMAGE],
  },
  twitter: {
    card: "summary_large_image",
    title: `${PAGE_TITLE} | SSP Group`,
    description: PAGE_DESCRIPTION,
    images: [PAGE_OG_IMAGE],
  },
};

/* ── Page ─────────────────────────────────────────────────────────────── */

export default function CrossBorderOceanFreightPage() {
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
    name: "Cross-Border Ocean Freight",
    provider: { "@type": "Organization", name: "SSP Group", url: SITE_URL },
    serviceType: "Cross-Border Ocean Freight",
    areaServed: ["Canada", "United States", "Mexico"],
    description: PAGE_DESCRIPTION,
    url: `${SITE_URL}/solutions/cross-border/ocean-freight`,
  };

  const breadcrumbJsonLd = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: "Home", item: `${SITE_URL}/` },
      { "@type": "ListItem", position: 2, name: "Solutions", item: `${SITE_URL}/solutions` },
      { "@type": "ListItem", position: 3, name: "Cross-Border", item: `${SITE_URL}/solutions/cross-border` },
      { "@type": "ListItem", position: 4, name: "Ocean Freight", item: `${SITE_URL}/solutions/cross-border/ocean-freight` },
    ],
  };

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(serviceJsonLd) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbJsonLd) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqJsonLd) }} />

      <OceanHero
        eyebrow="Cross-Border Ocean Freight"
        title="Managed ocean freight from port to final delivery, across every border."
        description="We coordinate the full ocean freight journey: booking, documentation, port clearance, customs compliance, drayage, and inland delivery into Canada, the U.S., and Mexico. Every program governed with milestone visibility from vessel to destination."
        primaryCta={{ label: "Discuss Your Requirements", href: "/contact", ctaId: "cb_ocean_freight_hero_contact" }}
        secondaryCta={{ label: "Explore Capabilities", href: "#capabilities", ctaId: "cb_ocean_freight_hero_capabilities" }}
      />

      <OceanCardSection
        id="capabilities"
        eyebrow="Ocean Freight Capabilities"
        title="The full scope of what we manage."
        description="From container booking to cross-border final mile. Structured ocean freight programs with the compliance coordination and milestone governance that complex supply chains require."
        cards={coreCapabilities}
        layout="sidebar"
      />

      <OceanGlassSection
        eyebrow="The SSP Difference"
        title="What separates us from a standard ocean forwarder."
        description="Beyond vessel booking, we manages the full journey: port through customs, across borders, to final delivery, with asset-backed execution and compliance at every stage."
        cards={differentiators}
      />

      <OceanStepsSection
        eyebrow="How It Works"
        title="A defined execution sequence for every program."
        description="Every ocean freight engagement follows a structured process, from initial planning through final delivery, refined through complex cross-border program execution."
        steps={processSteps}
      />

      <OceanFaqSection
        eyebrow="FAQ"
        title="What shippers ask about ocean freight with SSP."
        description="Practical questions from procurement, logistics, and operations teams evaluating managed ocean freight for cross-border programs."
        items={faqItems}
      />

      <OceanCtaSection
        eyebrow="Start a Conversation"
        title="Let's structure your ocean freight program."
        description="Share your volume, origin ports, and inland delivery requirements. We will design a port-to-door execution plan with customs coordination and cross-border distribution built in."
        pills={["FCL & LCL programs", "Port-to-door governance", "Cross-border execution", "Heavy & oversized capability"]}
        primaryCta={{ label: "Request an Ocean Freight Quote", href: "/quote", ctaId: "cb_ocean_freight_final_quote" }}
        secondaryCta={{ label: "Contact SSP Group", href: "/contact", ctaId: "cb_ocean_freight_final_contact" }}
      />
    </>
  );
}
