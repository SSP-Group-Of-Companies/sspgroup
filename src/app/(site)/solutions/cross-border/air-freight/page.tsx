import type { Metadata } from "next";
import { SITE_URL } from "@/lib/seo/site";
import {
  AirHero,
  AirCardSection,
  AirGlassSection,
  AirStepsSection,
  AirFaqSection,
  AirCtaSection,
} from "./AirFreightSections";

const PAGE_TITLE = "Cross-Border Air Freight | Time-Critical Logistics";
const PAGE_DESCRIPTION =
  "We manage cross-border air freight for time-critical shipments across Canada, the U.S., and Mexico with customs pre-clearance coordination, door-to-door execution, and recovery options when ground transit cannot meet the deadline.";
const PAGE_OG_IMAGE = "/_optimized/solution/crossBorder/air-hero-globe.jpg";

/* ── Data ─────────────────────────────────────────────────────────────── */

const coreCapabilities = [
  {
    title: "Next-Flight-Out",
    body: "Expedited booking on the next available commercial flight for urgent shipments that cannot wait for scheduled capacity. Arranged within hours.",
  },
  {
    title: "Charter & Dedicated Aircraft",
    body: "Full aircraft charter for oversized, high-priority, or multi-piece shipments requiring guaranteed capacity, departure control, and direct routing.",
  },
  {
    title: "Consolidated Air Freight",
    body: "Cost-optimized air freight for time-sensitive but non-emergency shipments consolidated across scheduled commercial routes with predictable transit windows.",
  },
  {
    title: "Door-to-Door Execution",
    body: "Full pickup-to-delivery management: ground collection, airport handling, customs clearance, air transit, and final-mile delivery coordinated under a single plan.",
  },
  {
    title: "Cross-Border Customs Coordination",
    body: "Export documentation, import clearance, and broker alignment for air shipments crossing Canada–USA or U.S.–Mexico borders, including pre-clearance to reduce airport dwell time.",
  },
  {
    title: "Temperature & Hazmat Capable",
    body: "Specialized handling for temperature-controlled pharmaceuticals, perishables, and regulated hazardous materials requiring certified packaging and carrier compliance.",
  },
] as const;

const differentiators = [
  {
    title: "Production-Line Recovery",
    body: "When a ground shipment fails and a manufacturing line depends on receiving freight within hours, we executes air recovery with the urgency the situation demands.",
  },
  {
    title: "Asset-Backed Ground Legs",
    body: "We coordinate pickup and delivery through its asset network and approved operating partners, keeping one team accountable from your facility to the airport and through final handoff.",
  },
  {
    title: "Cross-Border Specialization",
    body: "Cross-border operating experience in Canada–USA and U.S.–Mexico air customs, documentation, and border logistics. Pre-clearance coordination is built into the process from the outset.",
  },
  {
    title: "Single-Point Accountability",
    body: "One team manages the entire sequence, from ground pickup through air transit, customs, and final delivery. One point of contact, one execution plan, full visibility.",
  },
] as const;

const processSteps = [
  {
    step: "01",
    title: "Requirement assessment",
    body: "Shipment urgency, dimensions, commodity profile, and delivery deadline evaluated. We determines whether next-flight-out, consolidated, or charter is the optimal solution.",
  },
  {
    step: "02",
    title: "Capacity & route booking",
    body: "Flight options identified, capacity secured with preferred carriers, and the full transit plan confirmed, including ground pickup and delivery coordination on both ends.",
  },
  {
    step: "03",
    title: "Customs pre-clearance",
    body: "Export and import documentation prepared, CBSA/CBP/Mexican customs pre-clearance coordinated, and broker alignment confirmed before departure to minimize airport dwell.",
  },
  {
    step: "04",
    title: "Delivery & confirmation",
    body: "Airport arrival monitored, ground transfer executed through the aligned operating network, final-mile delivery completed, and proof of delivery confirmed to the shipper.",
  },
] as const;

const faqItems = [
  {
    q: "When should I use air freight instead of ground?",
    a: "When the delivery deadline cannot be met by ground transit, the shipment is a production-critical recovery, or the cost of delay exceeds the cost of air freight. We helps evaluate the trade-off and identify the most efficient option.",
  },
  {
    q: "Do we handle customs clearance for air freight?",
    a: "Yes. We coordinate export documentation, import clearance, and broker alignment for cross-border air shipments, including pre-clearance through CBSA and CBP where possible to reduce airport dwell time.",
  },
  {
    q: "How quickly can we arrange a cross-border air shipment?",
    a: "Next-flight-out options can be arranged within hours for urgent recoveries. Consolidated and scheduled air freight typically requires 24–48 hours of lead time depending on origin, destination, and carrier availability.",
  },
  {
    q: "What size and weight limits apply to air freight?",
    a: "Limits depend on the aircraft type and route. Commercial flights handle standard palletized freight up to standard ULD dimensions. Charter options accommodate oversized, heavy, or multi-piece shipments with dedicated capacity.",
  },
  {
    q: "Can we handle temperature-controlled or hazardous air cargo?",
    a: "Yes. We manage air freight for temperature-sensitive pharmaceuticals, perishables, and classified hazardous materials with certified packaging, compliant labeling, and carrier coordination for regulated commodities.",
  },
  {
    q: "Do we manage the ground legs on both sides?",
    a: "Yes. We coordinate the ground legs on both sides through its asset network and approved operating partners, with one team accountable for pickup, airport transfer, and final delivery.",
  },
] as const;

/* ── Metadata ────────────────────────────────────────────────────────── */

export const metadata: Metadata = {
  title: PAGE_TITLE,
  description: PAGE_DESCRIPTION,
  alternates: { canonical: "/solutions/cross-border/air-freight" },
  openGraph: {
    title: `${PAGE_TITLE} | SSP Group`,
    description: PAGE_DESCRIPTION,
    url: "/solutions/cross-border/air-freight",
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

export default function CrossBorderAirFreightPage() {
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
    name: "Cross-Border Air Freight",
    provider: { "@type": "Organization", name: "SSP Group", url: SITE_URL },
    serviceType: "Cross-Border Air Freight",
    areaServed: ["Canada", "United States", "Mexico"],
    description: PAGE_DESCRIPTION,
    url: `${SITE_URL}/solutions/cross-border/air-freight`,
  };

  const breadcrumbJsonLd = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: "Home", item: `${SITE_URL}/` },
      { "@type": "ListItem", position: 2, name: "Solutions", item: `${SITE_URL}/solutions` },
      { "@type": "ListItem", position: 3, name: "Cross-Border", item: `${SITE_URL}/solutions/cross-border` },
      { "@type": "ListItem", position: 4, name: "Air Freight", item: `${SITE_URL}/solutions/cross-border/air-freight` },
    ],
  };

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(serviceJsonLd) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbJsonLd) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqJsonLd) }} />

      <AirHero
        eyebrow="Cross-Border Air Freight"
        title="Time-critical air freight across borders, managed from pickup to delivery."
        description="When ground transit cannot meet the deadline, we executes cross-border air freight with customs pre-clearance, door-to-door coordination, and asset-backed ground legs on both ends. Canada, the U.S., and Mexico. Hours, not weeks."
        primaryCta={{ label: "Discuss Your Requirements", href: "/contact", ctaId: "cb_air_freight_hero_contact" }}
        secondaryCta={{ label: "Explore Capabilities", href: "#capabilities", ctaId: "cb_air_freight_hero_capabilities" }}
      />

      <AirCardSection
        id="capabilities"
        eyebrow="Air Freight Capabilities"
        title="The full scope of what we manage in the air."
        description="From next-flight-out recoveries to consolidated scheduled freight. Every option structured with customs coordination, ground-leg management, and door-to-door execution."
        cards={coreCapabilities}
        layout="sidebar"
      />

      <AirGlassSection
        eyebrow="The SSP Difference"
        title="What separates us from a standard air freight broker."
        description="Most brokers book flights. We manage the full chain: ground pickup, air transit, customs clearance, and final delivery, with its own fleet on the ground and a single team accountable end to end."
        cards={differentiators}
      />

      <AirStepsSection
        eyebrow="How It Works"
        title="A defined execution sequence for every air shipment."
        description="Every cross-border air engagement follows a structured process, from initial assessment through confirmed delivery, built for speed without sacrificing coordination."
        steps={processSteps}
      />

      <AirFaqSection
        eyebrow="FAQ"
        title="What shippers ask about air freight with SSP."
        description="Practical questions from procurement, logistics, and operations teams evaluating air freight for time-critical cross-border shipments."
        items={faqItems}
      />

      <AirCtaSection
        eyebrow="Start a Shipment"
        title="Need it there fast? Let's move it."
        description="Share your shipment details, delivery deadline, and origin/destination. We will identify the fastest available option and coordinate the full door-to-door execution."
        pills={["Next-flight-out available", "Customs pre-clearance", "Asset-backed ground legs", "Temperature & hazmat capable"]}
        primaryCta={{ label: "Request an Air Freight Quote", href: "/quote", ctaId: "cb_air_freight_final_quote" }}
        secondaryCta={{ label: "Contact SSP Group", href: "/contact", ctaId: "cb_air_freight_final_contact" }}
      />
    </>
  );
}
