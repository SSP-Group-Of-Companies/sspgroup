// src/app/contact/page.tsx
import type { Metadata } from "next";
import { SITE_DEFAULT_OG_IMAGE } from "@/lib/seo/site";

import ContactClient from "./ContactClient";

export const metadata: Metadata = {
  title: { absolute: "Contact | SSP Group" },
  description:
    "Contact SSP Group for freight operations, customer support, carrier relations, safety, IT support, or general business inquiries.",
  alternates: {
    canonical: "/contact",
  },
  openGraph: {
    title: "Contact | SSP Group",
    description:
      "Contact SSP Group for freight operations, customer support, carrier relations, safety, IT support, or general business inquiries.",
    type: "website",
    url: "/contact",
    images: [SITE_DEFAULT_OG_IMAGE],
  },
  twitter: {
    card: "summary_large_image",
    title: "Contact | SSP Group",
    description:
      "Contact SSP Group for freight operations, customer support, carrier relations, safety, IT support, or general business inquiries.",
    images: [SITE_DEFAULT_OG_IMAGE],
  },
};

export default function ContactPage() {
  return <ContactClient />;
}
