export const SHARED_SAFETY_COMPLIANCE_FAQ = {
  question: "How do we approach safety and compliance?",
  answer:
    "We manage safety and compliance as an operating framework across planning, dispatch readiness, in-transit oversight, and closeout. The focus is consistent control before and during movement, not reactive fixes after exceptions occur.",
} as const;

export const safetyCompliancePage = {
  hero: {
    sectionLabel: "Safety & Compliance",
    title: "Operational discipline in every shipment.",
    subtitle:
      "Safety is built into planning, handling, documentation, and cross-border execution so freight moves with control.",
  },
  /** Same layout as solution `ModeSolutionOverviewSection` (truckload, solutions hub). */
  complianceOverview: {
    eyebrow: "Safety & compliance",
    title: "Evidence-led controls from booking through closeout—not policy slides after the fact.",
    description:
      "In freight logistics, safety and compliance only hold weight when they show up in dispatch readiness, driver and hours discipline, equipment checks, regulated commodity handling, border documentation, and how exceptions are owned while cargo is in motion. We align each shipment to lane-appropriate US, Canadian, and Mexican expectations—with traceable controls from intake through delivery.",
    video: {
      src: "/_optimized/company/safety&ComplianceVideo.mp4",
      posterSrc: "/_optimized/company/safety&compliancePoster.jpg",
      title: "We safety and compliance in practice",
    },
  },
  operatingApproach: {
    title: "How we control risk from planning to closeout.",
    intro:
      "Safety performance is the result of sequence discipline. Each shipment follows a defined operating flow that keeps ownership clear and control points visible.",
    steps: [
      {
        title: "Pre-move requirement review",
        body: "Lane profile, commodity handling constraints, border requirements, and customer controls are validated before dispatch commitment.",
      },
      {
        title: "Execution readiness confirmation",
        body: "Equipment fit, document completeness, securement expectations, and communication cadence are confirmed before movement.",
      },
      {
        title: "In-transit control and exception management",
        body: "Milestones are monitored, updates are documented, and escalation is triggered quickly when route or timing conditions change.",
      },
      {
        title: "Delivery closeout and continuous improvement",
        body: "Delivery outcomes, exceptions, and root causes are reviewed to improve controls and reduce repeat risk on future loads.",
      },
    ],
  },
  regulatoryCoverage: {
    title: "Regulatory awareness across CA-US-MX freight movement.",
    intro:
      "Regulatory frameworks differ by jurisdiction. We align operating practice to active lane requirements and keeps compliance responsibilities visible at shipment level.",
    markets: [
      {
        market: "United States",
        authority: "FMCSA",
        controls:
          "Carrier safety management aligned to CSA categories including driver fitness, hours-of-service, vehicle maintenance, and hazardous materials handling where applicable.",
      },
      {
        market: "Canada",
        authority: "National Safety Code (provincial enforcement)",
        controls:
          "Carrier standards aligned to NSC requirements for driver, vehicle, and carrier oversight, including safety fitness expectations and maintenance discipline.",
      },
      {
        market: "Mexico",
        authority: "SICT federal transport rules",
        controls:
          "Cross-border coordination includes alignment to applicable federal transport rules, including hours-of-service and service log expectations on covered routes.",
      },
    ],
    note:
      "Regulatory references are informational and lane-dependent. Final requirements vary by commodity, route, and current legal updates.",
  },
  visibilityControl: {
    title: "Control in transit is where trust is earned.",
    intro:
      "When freight is moving, customers need clear status, accountable communication, and rapid exception response. We treat visibility as an operating requirement, not a reporting add-on.",
    items: [
      {
        icon: "radio",
        title: "Real-time shipment status",
        body: "Operational teams and customers maintain current movement visibility to reduce uncertainty and speed decision-making.",
      },
      {
        icon: "route",
        title: "Structured communication cadence",
        body: "Updates are tied to milestones and exceptions so procurement and operations stakeholders receive relevant, decision-ready information.",
      },
      {
        icon: "shield",
        title: "Escalation with ownership",
        body: "When conditions shift, ownership is assigned immediately, actions are documented, and recovery expectations are communicated clearly.",
      },
    ],
  },
  certificationPartners: {
    title: "Credentials that strengthen execution governance.",
    body:
      "We align with recognized partner and certification programs that reinforce shipment security, customs readiness, and operating discipline across North American lanes.",
  },
  faqs: [
    SHARED_SAFETY_COMPLIANCE_FAQ,
    {
      question: "Can we support cross-border freight programs across Canada, the U.S., and Mexico?",
      answer:
        "Yes. We operate across Canada, the United States, and Mexico and aligns shipment workflows to corridor-specific documentation, handoff, and communication requirements.",
    },
    {
      question: "How do we handle lane-specific regulatory requirements?",
      answer:
        "Regulatory requirements are reviewed at shipment level based on corridor, commodity profile, and customer controls. Teams align required documentation and operating procedures before dispatch release.",
    },
    {
      question: "What do we provide during in-transit exception events?",
      answer:
        "We provide accountable escalation, documented updates, and coordinated recovery actions designed to protect delivery outcomes and keep stakeholders informed.",
    },
    {
      question: "Can we align controls for specialized or higher-accountability freight?",
      answer:
        "Yes. We can align shipment-specific control requirements including handling protocols, documentation standards, communication cadence, and escalation expectations.",
    },
  ],
  finalCta: {
    kicker: "Start the engagement",
    title: "Need a carrier partner with measurable safety discipline?",
    body: "Share your lane mix, shipment constraints, and compliance expectations. We will structure an execution model that aligns operational control with your service commitments.",
    trustSignals: [
      "Asset-based operations",
      "Cross-border lane execution",
      "Shipment-level governance",
    ],
    proof: [
      { label: "Coverage", value: "CA-US-MX" },
      { label: "Model", value: "Asset-based" },
      { label: "Focus", value: "Execution control" },
    ],
    ctas: {
      primary: {
        label: "Schedule a Safety Review",
        href: "/contact",
        ctaId: "safety_page_schedule_review",
      },
      secondary: {
        label: "Request a Freight Quote",
        href: "/quote",
        ctaId: "safety_page_request_quote_final",
      },
    },
  },
} as const;
