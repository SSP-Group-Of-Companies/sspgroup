// src/lib/mail/chatbot/sendChatbotQuoteIntakeEmails.ts
import { sendMailAppOnly } from "@/lib/mail/mailer";
import { escapeHtml } from "@/lib/mail/utils";
import { buildDefaultEmailTemplate } from "@/lib/mail/templates/defaultTemplate";
import { NEXT_PUBLIC_SSP_EMAIL } from "@/config/env";

import type { QuoteIntakePayload } from "@/lib/chatbot/quoteIntakeFlow";

function row(label: string, value: string) {
  return `<tr><td style="padding:6px 0; vertical-align:top; color:#6b7280; width:140px;">${escapeHtml(label)}</td><td style="padding:6px 0; color:#111827;">${escapeHtml(value)}</td></tr>`;
}

export async function sendChatbotQuoteIntakeCustomerEmail(params: {
  data: QuoteIntakePayload;
  sourceLabel?: string;
}): Promise<void> {
  const d = params.data;
  const toAddr = d.email;
  if (!toAddr) return;

  const safeFirst = escapeHtml(d.fullName.split(/\s+/)[0] || "there");
  const subject = "We received your quote request";

  const bodyHtml = `
    <p style="margin:0 0 12px 0;">Hi ${safeFirst},</p>
    <p style="margin:0 0 12px 0;">
      Thanks for contacting SSP Group — we've received your quick quote request from the chat assistant. Our team will review it and follow up as soon as possible.
    </p>
    ${
      params.sourceLabel
        ? `<p style="margin:0 0 12px 0; font-size:13px; color:#6b7280;">Source: ${escapeHtml(params.sourceLabel)}</p>`
        : ""
    }
    <p style="margin:0 0 12px 0; color:#374151;">
      If you need to add details, reply to this email or contact us using the information below.
    </p>
  `;

  const html = buildDefaultEmailTemplate({
    subject,
    heading: "We've got it!",
    subtitle: "Chat quote request",
    bodyHtml,
    footerContactEmail: NEXT_PUBLIC_SSP_EMAIL,
  });

  await sendMailAppOnly({
    from: NEXT_PUBLIC_SSP_EMAIL,
    to: [toAddr],
    subject,
    html,
  });
}

export async function sendChatbotQuoteIntakeInternalEmail(params: {
  data: QuoteIntakePayload;
  internalTo: string;
  sourceLabel?: string;
}): Promise<void> {
  const d = params.data;
  const subject = `New chat quote request — ${d.fullName}`;

  const bodyHtml = `
    <p style="margin:0 0 12px 0;">A visitor submitted a quick quote through the SSP Assistant chat.</p>
    ${
      params.sourceLabel
        ? `<p style="margin:0 0 12px 0; font-size:13px; color:#6b7280;">Source: ${escapeHtml(params.sourceLabel)}</p>`
        : ""
    }
    <table role="presentation" cellspacing="0" cellpadding="0" style="width:100%; border-collapse:collapse; margin:0 0 16px 0; font-size:14px;">
      <tbody>
        ${row("Name", d.fullName)}
        ${row("Services", d.services)}
        ${row("Origin / destination", d.route)}
        ${row("Cargo details", d.cargo)}
        ${row("Email", d.email)}
        ${row("Phone", d.phone)}
      </tbody>
    </table>
    <p style="margin:0;">— SSP website (chat intake)</p>
  `;

  const html = buildDefaultEmailTemplate({
    subject,
    heading: "Chat quote intake",
    subtitle: d.email,
    bodyHtml,
    footerContactEmail: NEXT_PUBLIC_SSP_EMAIL,
  });

  await sendMailAppOnly({
    from: NEXT_PUBLIC_SSP_EMAIL,
    to: [params.internalTo],
    subject,
    html,
  });
}
