/**
 * Homepage closing CTA — paired with `StandardFinalCta` via `FinalCtaSection`.
 * Copy should read as the site’s primary commercial close: clear, confident, operational.
 */
export const HOME_FINAL_CTA = {
  kicker: "When the details matter",
  title: "Put your next shipment under tighter control",
  body: "Request a structured quote. We will respond with clear pricing assumptions, realistic transit parameters, and a dispatch-led plan that matches the lanes—truckload, specialized equipment, or cross-border—without softening the constraints in the name of speed.",
  trustSignals: [
    "One operating model across truckload, specialized, and cross-border work",
    "Cross-border documentation treated as a dispatch input, not a paperwork afterthought",
    "Named ownership from booking through final delivery",
  ] as const,
  proof: [
    { value: "≤ 15 min", label: "Initial response target" },
    { value: "24/7", label: "Operations coverage" },
    { value: "CA · US · MX", label: "Corridor scope" },
  ] as const,
  microCopy:
    "If you need to align on scope first, contact us and we will route the inquiry to the right operations lead before you submit formal requirements.",
  ctas: {
    primary: {
      label: "Request a Quote",
      href: "/quote",
      ctaId: "home_final_cta_request_quote",
    },
    secondary: {
      label: "Contact Us",
      href: "/contact",
      ctaId: "home_final_cta_contact_us",
    },
  },
} as const;
