import type { Metadata } from "next";
import { redirect, notFound } from "next/navigation";

const SECTION_REDIRECTS: Record<string, string> = {
  "about-ssp": "/about-us",
  "our-history": "/company/our-history",
  "mission-vision-values": "/about-us#mission-vision-values",
  "our-companies": "/about-us#our-companies",
  "safety-compliance": "/company/safety-compliance",
  leadership: "/company/leadership",
  sustainability: "/company/sustainability",
  awards: "/company/awards-recognition",
  "video-gallery": "/company/media",
  faqs: "/company/faqs",
};

export function generateStaticParams() {
  return Object.keys(SECTION_REDIRECTS).map((section) => ({ section }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ section: string }>;
}): Promise<Metadata> {
  const { section } = await params;
  if (!SECTION_REDIRECTS[section]) return {};
  return { robots: { index: false, follow: true } };
}

export default async function CompanySectionPage({
  params,
}: {
  params: Promise<{ section: string }>;
}) {
  const { section } = await params;
  const target = SECTION_REDIRECTS[section];
  if (!target) notFound();
  redirect(target);
}
