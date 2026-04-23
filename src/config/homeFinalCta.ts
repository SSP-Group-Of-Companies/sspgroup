/**
 * Homepage closing CTA — paired with `StandardFinalCta` via `FinalCtaSection`.
 * Copy should read as the site’s primary commercial close: clear, confident, operational.
 */
export const HOME_FINAL_CTA = {
  kicker: "When execution matters",
  title: "Put your next shipment in motion—with lane-level control",
  body: "Request a structured quote and our operations team will respond with clear pricing assumptions, realistic transit windows, and the governance model that fits how you run freight—from truckload and specialized equipment to cross-border programs that cannot afford ambiguity at the border.",
  trustSignals: [
    "One operating standard across TL, specialized, and cross-border",
    "Documentation and compliance treated as execution inputs, not paperwork",
    "Named ownership from intake through delivery",
  ] as const,
  proof: [
    { value: "≤ 15 min", label: "Initial response target" },
    { value: "24/7", label: "Operations coverage" },
    { value: "CA · US · MX", label: "Corridor scope" },
  ] as const,
  microCopy:
    "Prefer to align on scope before you quote? Contact us and we’ll route you to the right operations owner—then you can submit requirements in whatever format fits procurement.",
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
