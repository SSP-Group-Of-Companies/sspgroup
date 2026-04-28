/**
 * FAQ page content: categories and questions/answers.
 * Structured for accordion UI and hash-linked category sidebar.
 */

import { SHARED_SAFETY_COMPLIANCE_FAQ } from "./companyPages";

export type FaqItem = Readonly<{
  question: string;
  answer: string;
}>;

export type FaqCategory = Readonly<{
  id: string;
  label: string;
  items: readonly FaqItem[];
}>;

export const FAQ_CATEGORIES: readonly FaqCategory[] = [
  {
    id: "service-scope",
    label: "Service Scope & Coverage",
    items: [
      {
        question: "What freight services does SSP Group operate today?",
        answer:
          "We operate asset-based freight programs across truckload and specialized equipment profiles, plus cross-border lane execution between Canada, the United States, and Mexico. Program scope is aligned to lane requirements, commodity constraints, and service commitments.",
      },
      {
        question: "Which geographies do you cover?",
        answer:
          "We support domestic and cross-border freight execution across Canada, the United States, and Mexico. Coverage is lane-dependent, and final operating design is confirmed during onboarding based on origin-destination profile, commodity, and service cadence.",
      },
      {
        question: "Can we support dedicated or recurring lane programs?",
        answer:
          "Yes. We support recurring lane structures, defined service standards, and governance cadence for enterprise programs. Operating design is built around forecasted volume, equipment fit, service windows, and exception handling requirements.",
      },
      {
        question: "How should we request a quote or program review?",
        answer:
          "Submit lane origin and destination, commodity profile, pickup and delivery windows, target volume, and any compliance constraints. We use that input to return an execution model with clear assumptions, responsibilities, and service controls.",
      },
    ],
  },
  {
    id: "cross-border-customs",
    label: "Cross-Border & Customs",
    items: [
      {
        question: "Do we handle cross-border freight between Canada, the U.S., and Mexico?",
        answer:
          "Yes. Cross-border execution is a core part of SSP's operating footprint. Programs are structured around corridor requirements, document readiness, handoff control, and communication cadence from dispatch through delivery.",
      },
      {
        question: "Who is responsible for customs brokerage and formal entry processes?",
        answer:
          "Broker-of-record and importer responsibilities are determined by shipment structure and customer setup. We coordinate operational handoffs and document discipline, while formal customs roles remain aligned to the agreed commercial model and applicable broker instructions.",
      },
      {
        question: "What documents are typically required for cross-border moves?",
        answer:
          "Requirements vary by lane and commodity, but commonly include commercial invoice data, bill of lading details, and any required customs or commodity documentation. Final document requirements are determined by corridor rules, customs authorities, and broker guidance. We confirm required document sets before release to reduce border delays.",
      },
      {
        question: "How do we reduce border-delay risk?",
        answer:
          "Risk is reduced through pre-move document checks, lane-specific operating controls, and active milestone governance during transit. When conditions change, escalation ownership and communication remain defined.",
      },
    ],
  },
  {
    id: "visibility-control",
    label: "Visibility & Exception Control",
    items: [
      {
        question: "How do we track shipment progress?",
        answer:
          "Shipment visibility is provided through our tracking workflows and operations communication cadence. Milestone updates, status changes, and exception notices are tied to defined points in the move lifecycle.",
      },
      {
        question: "How are delays or service exceptions handled?",
        answer:
          "Exceptions are managed through accountable escalation: issue identification, corrective action, updated ETA, and documented communication. We prioritize decision-ready updates so customer teams can act quickly.",
      },
      {
        question: "Will we have a single point of operational accountability?",
        answer:
          "Yes. SSP's operating model is structured around named ownership across planning, dispatch, in-transit governance, and closeout. That reduces handoff ambiguity and accelerates escalation response.",
      },
      {
        question: "Can we align communication cadence to our internal SLA model?",
        answer:
          "Yes. Communication cadence can be aligned to your internal operating rhythm, including milestone updates, escalation thresholds, and stakeholder notification requirements.",
      },
    ],
  },
  {
    id: "safety-compliance",
    label: "Safety, Compliance & Documentation",
    items: [
      {
        question: SHARED_SAFETY_COMPLIANCE_FAQ.question,
        answer: SHARED_SAFETY_COMPLIANCE_FAQ.answer,
      },
      {
        question: "Can we support higher-accountability or regulated freight profiles?",
        answer:
          "We can support shipment profiles that require elevated handling discipline, documentation quality, and operating controls. Lane and commodity requirements are validated before movement is authorized.",
      },
      {
        question: "How is documentation quality controlled?",
        answer:
          "Documentation requirements are reviewed at shipment level against lane and commodity context. We apply pre-release checks and closeout discipline to improve completeness and audit readiness.",
      },
      {
        question: "How do we align to CA-US-MX regulatory environments?",
        answer:
          "Regulatory requirements differ by jurisdiction and shipment type. We align operational controls to active corridor requirements and keeps responsibilities visible throughout the execution lifecycle. Regulatory references are informational; formal legal and customs determinations are made by authorized entities.",
      },
    ],
  },
  {
    id: "commercial-billing-claims",
    label: "Commercial, Billing & Claims",
    items: [
      {
        question: "Do you work directly with shippers only, or also with 3PLs and brokers?",
        answer:
          "We support direct shipper programs and partner-led models, including 3PL and broker relationships. Operating governance and accountability are maintained regardless of commercial channel.",
      },
      {
        question: "How is billing structured?",
        answer:
          "Billing structure and terms are defined at onboarding or quoting stage. We align invoicing workflow to the agreed commercial model so finance and operations teams have clear documentation and reconciliation flow.",
      },
      {
        question: "How are cargo claims handled?",
        answer:
          "Claims are handled through a documented review process with shipment records, supporting documentation, and defined response steps. We coordinate investigation and resolution in alignment with agreed terms and applicable requirements.",
      },
      {
        question: "Can we support integration with transportation systems?",
        answer:
          "Integration support is discussed during onboarding. Based on workflow scope, we can align operational data exchange and reporting expectations to customer system requirements.",
      },
    ],
  },
] as const;

export const FAQ_HERO = {
  title: "Frequently Asked Questions",
  subtitle:
    "Find clear, operational answers on service scope, cross-border execution, compliance, and shipment governance.",
} as const;

export const FAQ_PAGE_ROUTES = {
  aboutSsp: "/about-us",
  insights: "/insights",
  contact: "/contact",
  quote: "/quote",
  /** Same destination as Company → FAQs in site navigation. */
  faqs: "/company/faqs",
} as const;

/** FAQ page final CTA: help-oriented copy with direct contact routing. */
export const FAQ_FINAL_CTA = {
  kicker: "Need more help?",
  title: "Couldn't find what you need above?",
  body: "Share your lane requirements or operational constraints. We will route your request to the right team and respond with the next best step.",
  trustSignals: [
    "Enterprise request triage",
    "Lane-level requirement intake",
    "Clear ownership on next steps",
  ] as const,
  proof: [
    { value: "Structured", label: "Request intake" },
    { value: "Named", label: "Response ownership" },
    { value: "Scope-fit", label: "Program review" },
  ] as const,
  microCopy:
    "Prefer a call? We can align on lane profile, service windows, and escalation expectations.",
  ctas: {
    primary: {
      label: "Contact Us",
      href: FAQ_PAGE_ROUTES.contact,
      ctaId: "faq_final_contact_us",
    },
    secondary: {
      label: "Request a Quote",
      href: FAQ_PAGE_ROUTES.quote,
      ctaId: "faq_final_request_quote",
    },
  },
} as const;
