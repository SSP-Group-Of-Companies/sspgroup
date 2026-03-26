import type { Metadata } from "next";
import { CrossBorderIntroSections } from "./CrossBorderIntroSections";
import { CrossBorderDetailSections } from "./CrossBorderDetailSections";
import { SITE_URL } from "@/lib/seo/site";

const PAGE_TITLE = "Cross-Border Freight Solutions | Canada, USA & Mexico";
const PAGE_DESCRIPTION =
  "SSP Group manages cross-border freight programs across Canada, the United States, and Mexico with structured customs coordination, corridor-specific playbooks, and milestone-level visibility from origin to final delivery.";
const LAST_REVIEWED_DATE = "March 24, 2026";

const capabilityPillars = [
  {
    title: "Documentation Governance",
    body: "Pre-movement compliance reviews and classification controls aligned to customs expectations, by lane and by corridor.",
  },
  {
    title: "Corridor Playbooks",
    body: "Dedicated operating procedures for Canada–USA and Mexico corridors with defined handoff protocols, escalation paths, and service controls.",
  },
  {
    title: "Milestone Visibility",
    body: "End-to-end tracking from pickup through border clearance to final delivery, with real-time escalation on delays and holds.",
  },
  {
    title: "Equipment & Mode Coverage",
    body: "Truckload, flatbed, step deck, dry van, hazmat, and temperature-controlled capacity matched to commodity profile and lane requirements.",
  },
] as const;

const processSteps = [
  {
    step: "01",
    title: "Lane qualification",
    body: "We define corridor scope, SLA targets, commodity handling requirements, and documentation standards before any freight moves.",
  },
  {
    step: "02",
    title: "Pre-movement validation",
    body: "Commercial documents, broker coordination checkpoints, and customs-readiness criteria are verified before dispatch.",
  },
  {
    step: "03",
    title: "Border execution",
    body: "Dispatch, border-zone handoffs, and post-clearance delivery follow a defined milestone cadence with exception protocols.",
  },
  {
    step: "04",
    title: "Performance governance",
    body: "Delivery performance, dwell-time trends, and exception patterns are reviewed in recurring governance cycles.",
  },
] as const;

const crossBorderServicePaths = [
  {
    key: "canada-usa",
    label: "Canada–USA Freight",
    href: "/solutions/cross-border/canada-usa",
    bestFor: "Recurring bilateral lanes between Canadian and U.S. facilities.",
    summary:
      "Structured for repeatable truckload and specialized freight with stable schedules, customs continuity, and defined handoff discipline.",
  },
  {
    key: "mexico",
    label: "Mexico Cross-Border",
    href: "/solutions/cross-border/mexico",
    bestFor: "Corridors where documentation control and security governance are essential.",
    summary:
      "Built for freight that requires pedimento-aware planning, controlled border-zone transfers, and route-specific escalation ownership.",
  },
  {
    key: "air",
    label: "Cross-Border Air Freight",
    href: "/solutions/cross-border/air-freight",
    bestFor: "Time-critical shipments where speed and recovery options determine outcomes.",
    summary:
      "Designed for urgent freight that demands faster transit, tighter exception handling, and clear service-level commitments.",
  },
  {
    key: "ocean",
    label: "Cross-Border Ocean Freight",
    href: "/solutions/cross-border/ocean-freight",
    bestFor: "Planned international volume where cost structure and capacity alignment matter.",
    summary:
      "Connects global ocean programs into North American inland distribution with milestone governance through final delivery.",
  },
] as const;

const complianceHighlights = [
  {
    title: "United States (CBP)",
    points: [
      "Entry-summary data quality and shipment identifiers verified before dispatch.",
      "Invoice, classification, and commodity fields aligned to CBP workflow expectations.",
      "Broker coordination structured around mode, commodity profile, and port-of-entry requirements.",
    ],
  },
  {
    title: "Canada (CBSA / CARM)",
    points: [
      "Accounting and release assumptions structured for current CARM-era importing workflows.",
      "Importer and broker responsibilities clarified early to reduce release delays at arrival.",
      "Security, release model, and payment-pathway expectations documented before program activation.",
    ],
  },
  {
    title: "Mexico (Pedimento / SAT)",
    points: [
      "Pedimento-aware planning and handoff discipline built into corridor operating design.",
      "Documentation completeness and customs-representation requirements verified before movement.",
      "Security and control standards calibrated to route risk profile and cargo sensitivity.",
    ],
  },
] as const;

const performanceMetrics = [
  {
    value: "98.2%",
    label: "On-time delivery",
    note: "Across managed cross-border corridor programs.",
  },
  {
    value: "< 2h",
    label: "Exception response",
    note: "Priority escalation response commitment.",
  },
  {
    value: "99.1%",
    label: "Document accuracy",
    note: "Pre-movement documentation completeness rate.",
  },
  {
    value: "–27%",
    label: "Dwell-time reduction",
    note: "After corridor-level workflow redesign.",
  },
] as const;

const performanceSnapshots = [
  {
    title: "Automotive Tier-1 Supply Network",
    challenge:
      "Border delay variance was disrupting plant-side production schedules for time-sensitive components across Canada–USA lanes.",
    approach:
      "SSP implemented lane-readiness gates, broker coordination checkpoints, and corridor-level escalation ownership with weekly governance.",
    outcome:
      "Transit consistency improved. Preventable holds declined. Recovery timelines shortened through structured exception management.",
  },
  {
    title: "Industrial Equipment Distribution",
    challenge:
      "Mixed-mode freight across Canada–USA and Mexico corridors lacked consistent handoff quality and centralized exception visibility.",
    approach:
      "SSP deployed corridor playbooks, milestone governance standards, and unified exception escalation across both programs.",
    outcome:
      "Cross-border reliability improved in both corridors. Intervention speed on at-risk loads increased. Executive reporting was consolidated.",
  },
] as const;

const faqItems = [
  {
    q: "Which cross-border corridors does SSP operate?",
    a: "SSP manages dedicated freight programs for Canada–USA and Mexico cross-border corridors, each with lane-specific playbooks, customs-aligned documentation controls, and structured escalation protocols.",
  },
  {
    q: "Can SSP handle specialized or regulated freight across borders?",
    a: "Yes. Cross-border programs can be configured for flatbed, step deck, hazmat, and temperature-controlled freight where requirements are properly documented and lane-qualified.",
  },
  {
    q: "How does SSP reduce border delays?",
    a: "Through pre-movement readiness. Documentation is validated, broker coordination is confirmed, and escalation ownership is assigned before freight reaches the border zone, not after.",
  },
  {
    q: "Does SSP support spot shipments or only recurring programs?",
    a: "Both. SSP handles tactical spot movements and structured recurring corridor programs with formal service governance and performance review cycles.",
  },
] as const;

const referenceLinks = [
  {
    label: "U.S. Customs and Border Protection: Entry Summary and Post Release Processes",
    href: "https://www.cbp.gov/trade/programs-administration/entry-summary-and-post-release-processes",
  },
  {
    label: "CBSA: CARM - Assess and pay duties and taxes on imported commercial goods",
    href: "http://cbsa-asfc.gc.ca/services/carm-gcra/menu-eng.html",
  },
  {
    label: "CBSA: Certifying the origin of goods (CUSMA)",
    href: "https://www.cbsa-asfc.gc.ca/services/cusma-aceum/cog-com-eng.html",
  },
  {
    label: "SAT Mexico: Required digital documents attached to import pedimento",
    href: "http://omawww.sat.gob.mx/aduanas/importando_exportando/regimenes/Paginas/documento_que_deben_anexar_al_pedimento_importacion.aspx",
  },
] as const;

export const metadata: Metadata = {
  title: PAGE_TITLE,
  description: PAGE_DESCRIPTION,
  alternates: {
    canonical: "/solutions/cross-border",
  },
  openGraph: {
    title: `${PAGE_TITLE} | SSP Group`,
    description: PAGE_DESCRIPTION,
    url: "/solutions/cross-border",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: `${PAGE_TITLE} | SSP Group`,
    description: PAGE_DESCRIPTION,
  },
};

export default function CrossBorderPage() {
  const faqJsonLd = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: faqItems.map((item) => ({
      "@type": "Question",
      name: item.q,
      acceptedAnswer: {
        "@type": "Answer",
        text: item.a,
      },
    })),
  };

  const serviceJsonLd = {
    "@context": "https://schema.org",
    "@type": "Service",
    name: "Cross-Border Freight Solutions | Canada, USA & Mexico",
    provider: {
      "@type": "Organization",
      name: "SSP Group",
      url: SITE_URL,
    },
    serviceType: "Cross-Border Logistics",
    areaServed: ["Canada", "United States", "Mexico"],
    description: PAGE_DESCRIPTION,
    url: `${SITE_URL}/solutions/cross-border`,
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(serviceJsonLd) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqJsonLd) }}
      />

      <CrossBorderIntroSections capabilityPillars={capabilityPillars} processSteps={processSteps} />

      <CrossBorderDetailSections
        crossBorderServicePaths={crossBorderServicePaths}
        performanceMetrics={performanceMetrics}
        performanceSnapshots={performanceSnapshots}
        lastReviewedDate={LAST_REVIEWED_DATE}
        complianceHighlights={complianceHighlights}
        referenceLinks={referenceLinks}
        faqItems={faqItems}
      />
    </>
  );
}
