/**
 * FAQ page content: categories and questions/answers.
 * Structured for accordion UI and hash-linked category sidebar.
 */

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
    id: "services",
    label: "Our Services",
    items: [
      {
        question: "What freight modes does SSP Group offer?",
        answer:
          "We offer full truckload (FTL), less-than-truckload (LTL), expedited and specialized, temperature-controlled, hazmat, and cross-border and global services. Each mode is designed for specific lane, timeline, and compliance needs—we help you match the right mode to your shipment.",
      },
      {
        question: "How do I get a quote?",
        answer:
          "Request a quote through our website or contact operations. For the fastest response, provide lane (origin and destination), weight and dimensions, pickup and delivery windows, and any special requirements (temperature, hazmat, customs). We typically respond with a structured quote within one business cycle.",
      },
      {
        question: "Do you handle cross-border shipments?",
        answer:
          "Yes. We coordinate Canada–U.S. and Mexico cross-border moves with documentation readiness, broker handoffs, and milestone visibility. We also support ocean and air freight for international lanes. Tell us your origin, destination, and commodity and we'll outline the process and timing.",
      },
      {
        question: "What is your coverage area?",
        answer:
          "We operate across North America with offices and capacity in Canada, the U.S., and Mexico. We provide a single point of accountability for domestic and cross-border lanes rather than handing you off between regional brokers.",
      },
    ],
  },
  {
    id: "tracking-operations",
    label: "Tracking & Operations",
    items: [
      {
        question: "How do I track my shipment?",
        answer:
          "Use our Track Shipment tool on the website with your pro or reference number. You'll see milestone-level status and can contact operations for details. We provide proactive updates at key stages so you're not left wondering.",
      },
      {
        question: "Who do I contact for updates or issues?",
        answer:
          "Your load has a single point of ownership from dispatch through delivery. Operations coverage is available so you have a clear escalation path. Contact details are provided at booking and in confirmation communications.",
      },
      {
        question: "What happens if there's a delay or exception?",
        answer:
          "We manage exceptions with root cause, corrective action, and revised ETAs—documented and communicated. We don't leave you in the dark; we outline what's happening and what we're doing to get the load back on plan.",
      },
    ],
  },
  {
    id: "billing-partners",
    label: "Billing & Partners",
    items: [
      {
        question: "How does billing work?",
        answer:
          "We issue a single invoice per load (or as agreed for dedicated programs). Payment terms are confirmed at booking. You get one statement and one relationship—no chasing multiple carriers or brokers for the same move.",
      },
      {
        question: "Do you work with freight brokers or only direct shippers?",
        answer:
          "We work with shippers, 3PLs, and brokers. Our model is built for disciplined execution and clear accountability whether you're shipping direct or through a partner. We can align to your procurement and reporting requirements.",
      },
      {
        question: "Can we integrate with our TMS or ERP?",
        answer:
          "We can discuss EDI, API, and system integration for visibility, tenders, and documentation. Share your stack and we'll outline what we support today and what we can roadmap.",
      },
    ],
  },
] as const;

export const FAQ_HERO = {
  title: "Frequently Asked Questions",
  subtitle:
    "How may we help? Browse common questions about our services, safety, tracking, and operations.",
} as const;

/** FAQ page final CTA: help-oriented copy and live-agent CTA. */
export const FAQ_FINAL_CTA = {
  kicker: "Need more help?",
  title: "Couldn't find what you need above?",
  body: "Chat with our team or request a quote—we're here to help with your freight questions, quotes, and operations.",
  trustSignals: [
    "Live chat with our team",
    "Fast quote response",
    "Lane-level support",
  ] as const,
  proof: [
    { value: "≤ 15 min", label: "Initial response" },
    { value: "24/7", label: "Operations coverage" },
    { value: "CA–US–MX", label: "Lane scope" },
  ] as const,
  microCopy: "Prefer a quick call? Our team can align on your lanes and timing.",
  ctas: {
    primary: {
      label: "Contact Us",
      href: "/contact",
      ctaId: "faq_final_contact_us",
    },
    secondary: {
      label: "Speak with a live agent",
      href: "#live-chat",
      ctaId: "faq_final_speak_live_agent",
    },
  },
} as const;
