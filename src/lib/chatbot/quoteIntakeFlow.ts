// src/lib/chatbot/quoteIntakeFlow.ts

export type QuoteStepKey = "fullName" | "services" | "route" | "cargo" | "email" | "phone";

export type QuoteIntakePayload = {
  fullName: string;
  services: string;
  route: string;
  cargo: string;
  email: string;
  phone: string;
};

type FlowStep = Readonly<{
  key: QuoteStepKey;
  prompt: string;
}>;

/** Ordered steps for chat quote intake (no intro — starts at full name). */
export const QUOTE_INTAKE_STEPS: readonly FlowStep[] = [
  {
    key: "fullName",
    prompt: "Kindly provide your full name for our records.",
  },
  {
    key: "services",
    prompt: "What freight services are you interested in?",
  },
  {
    key: "route",
    prompt:
      "Kindly share the shipment's origin details (country, city, and zip/postal code) and the destination information (country, city, and zip/postal code) to help us plan the route and provide accurate rates.",
  },
  {
    key: "cargo",
    prompt:
      "Could you provide the unit type (e.g., pallet, box, or container), the total quantity, weight (in lbs or kg), and the dimensions (length × width × height in cm or inches)?",
  },
  {
    key: "email",
    prompt: "Can you provide your email address so our team can send you the best quote?",
  },
  {
    key: "phone",
    prompt: "Great! Kindly share your contact number for a quick call from our freight expert.",
  },
] as const;

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

export function isNonEmpty(s: string) {
  return s.trim().length > 0;
}

export function isValidEmailLoose(s: string) {
  const t = s.trim();
  return EMAIL_RE.test(t);
}

export function isValidPhoneLoose(s: string) {
  const digits = s.replace(/\D/g, "");
  return digits.length >= 10 && digits.length <= 17;
}

export function validateQuoteStep(
  key: QuoteStepKey,
  value: string,
): { ok: true } | { ok: false; message: string } {
  const v = value.trim();
  if (!isNonEmpty(v)) {
    return { ok: false, message: "Please enter an answer before continuing." };
  }
  if (key === "email" && !isValidEmailLoose(v)) {
    return { ok: false, message: "Please enter a valid email address." };
  }
  if (key === "phone" && !isValidPhoneLoose(v)) {
    return { ok: false, message: "Please enter a valid phone number (at least 10 digits)." };
  }
  return { ok: true };
}

export function buildQuoteIntakePayload(
  answers: Partial<Record<QuoteStepKey, string>>,
): QuoteIntakePayload | null {
  const fullName = answers.fullName?.trim() ?? "";
  const services = answers.services?.trim() ?? "";
  const route = answers.route?.trim() ?? "";
  const cargo = answers.cargo?.trim() ?? "";
  const email = answers.email?.trim() ?? "";
  const phone = answers.phone?.trim() ?? "";
  if (!fullName || !services || !route || !cargo || !email || !phone) return null;
  return { fullName, services, route, cargo, email, phone };
}

export type QuoteIntakeControllerState = {
  active: boolean;
  stepIndex: number;
  answers: Partial<Record<QuoteStepKey, string>>;
};

export function createIdleQuoteState(): QuoteIntakeControllerState {
  return { active: false, stepIndex: 0, answers: {} };
}

export function createBootstrappedQuoteState(): QuoteIntakeControllerState {
  return { active: true, stepIndex: 0, answers: {} };
}
