export const SHARED_SAFETY_COMPLIANCE_FAQ = {
  question: "How does SSP approach safety and compliance?",
  answer:
    "SSP manages safety and compliance as an operating framework across planning, dispatch readiness, in-transit oversight, and closeout. The focus is consistent control before and during movement, not reactive fixes after exceptions occur.",
} as const;

export const safetyCompliancePage = {
  hero: {
    sectionLabel: "Safety & Compliance",
    title: "Operational discipline in every shipment.",
    subtitle:
      "Safety is built into planning, handling, documentation, and cross-border execution so freight moves with control.",
  },
  governance: {
    title: "Governance built for execution, not optics.",
    intro:
      "Enterprise shippers evaluate safety through execution evidence: pre-move control, documentation quality, in-transit discipline, and exception response. SSP runs these controls as one operating system across North American lanes.",
    domains: [
      {
        title: "People governance",
        body: "Role clarity, operational accountability, and recurring reinforcement of standards at dispatch, planning, and handoff points.",
      },
      {
        title: "Equipment and cargo governance",
        body: "Readiness checks, securement controls, and shipment-specific handling requirements aligned before dispatch release.",
      },
      {
        title: "Documentation governance",
        body: "Document integrity, border readiness, and auditable workflow discipline from booking through closeout.",
      },
    ],
  },
  operatingApproach: {
    title: "How SSP controls risk from planning to closeout.",
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
      "Regulatory frameworks differ by jurisdiction. SSP aligns operating practice to active lane requirements and keeps compliance responsibilities visible at shipment level.",
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
      "When freight is moving, customers need clear status, accountable communication, and rapid exception response. SSP treats visibility as an operating requirement, not a reporting add-on.",
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
      "SSP aligns with recognized partner and certification programs that reinforce shipment security, customs readiness, and operating discipline across North American lanes.",
  },
  faqs: [
    SHARED_SAFETY_COMPLIANCE_FAQ,
    {
      question: "Can SSP support cross-border freight programs across Canada, the U.S., and Mexico?",
      answer:
        "Yes. SSP operates across Canada, the United States, and Mexico and aligns shipment workflows to corridor-specific documentation, handoff, and communication requirements.",
    },
    {
      question: "How does SSP handle lane-specific regulatory requirements?",
      answer:
        "Regulatory requirements are reviewed at shipment level based on corridor, commodity profile, and customer controls. Teams align required documentation and operating procedures before dispatch release.",
    },
    {
      question: "What does SSP provide during in-transit exception events?",
      answer:
        "SSP provides accountable escalation, documented updates, and coordinated recovery actions designed to protect delivery outcomes and keep stakeholders informed.",
    },
    {
      question: "Can SSP align controls for specialized or higher-accountability freight?",
      answer:
        "Yes. SSP can align shipment-specific control requirements including handling protocols, documentation standards, communication cadence, and escalation expectations.",
    },
  ],
  finalCta: {
    kicker: "Start the engagement",
    title: "Need a carrier partner with measurable safety discipline?",
    body: "Share your lane mix, shipment constraints, and compliance expectations. SSP will structure an execution model that aligns operational control with your service commitments.",
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
