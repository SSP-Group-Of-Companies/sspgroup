// src/app/api/v1/chatbot/quote-intake/route.ts
import { NextRequest } from "next/server";
import { successResponse, errorResponse } from "@/lib/utils/apiResponse";
import { parseJsonBody } from "@/lib/utils/reqParser";
import { getSiteUrlFromRequest } from "@/lib/utils/urlHelper";
import { NEXT_PUBLIC_SSP_DISPATCH_EMAIL, NEXT_PUBLIC_SSP_EMAIL } from "@/config/env";
import {
  isValidEmailLoose,
  isValidPhoneLoose,
  type QuoteIntakePayload,
} from "@/lib/chatbot/quoteIntakeFlow";
import {
  sendChatbotQuoteIntakeCustomerEmail,
  sendChatbotQuoteIntakeInternalEmail,
} from "@/lib/mail/chatbot/sendChatbotQuoteIntakeEmails";

type Body = Partial<QuoteIntakePayload> & { source?: string };

function validatePayload(b: Body): QuoteIntakePayload | null {
  const fullName = typeof b.fullName === "string" ? b.fullName.trim() : "";
  const services = typeof b.services === "string" ? b.services.trim() : "";
  const route = typeof b.route === "string" ? b.route.trim() : "";
  const cargo = typeof b.cargo === "string" ? b.cargo.trim() : "";
  const email = typeof b.email === "string" ? b.email.trim() : "";
  const phone = typeof b.phone === "string" ? b.phone.trim() : "";
  if (!fullName || !services || !route || !cargo || !email || !phone) return null;
  return { fullName, services, route, cargo, email, phone };
}

export const POST = async (req: NextRequest) => {
  try {
    const body = await parseJsonBody<Body>(req);
    const validated = validatePayload(body);
    if (!validated) {
      return errorResponse(400, "Invalid quote intake payload");
    }
    if (!isValidEmailLoose(validated.email)) {
      return errorResponse(400, "Invalid email");
    }
    if (!isValidPhoneLoose(validated.phone)) {
      return errorResponse(400, "Invalid phone");
    }

    const siteUrl = getSiteUrlFromRequest(req);
    const sourceLabel = body.source || siteUrl;

    const internalTo = NEXT_PUBLIC_SSP_DISPATCH_EMAIL || NEXT_PUBLIC_SSP_EMAIL;

    let customerOk = false;
    let internalOk = false;

    try {
      await sendChatbotQuoteIntakeCustomerEmail({ data: validated, sourceLabel });
      customerOk = true;
    } catch (e) {
      console.warn("Chatbot quote intake: customer email failed:", e);
    }

    try {
      await sendChatbotQuoteIntakeInternalEmail({
        data: validated,
        internalTo,
        sourceLabel,
      });
      internalOk = true;
    } catch (e) {
      console.warn("Chatbot quote intake: internal email failed:", e);
    }

    const ok = customerOk && internalOk;
    return successResponse(
      ok ? 200 : 202,
      ok ? "Quote request sent" : "Quote received; some notifications may be pending",
      { notifications: { customerOk, internalOk } },
    );
  } catch (err) {
    return errorResponse(err);
  }
};
