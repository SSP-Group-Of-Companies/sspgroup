import Link from "next/link";
import type { Metadata } from "next";
import { SITE_NAME } from "@/lib/seo/site";

export const metadata: Metadata = {
  title: "Page not found",
  description: `The page you were looking for couldn't be found on ${SITE_NAME}.`,
  robots: { index: false, follow: true },
};

export default function RootNotFound() {
  return (
    <div className="flex min-h-[80dvh] items-center justify-center bg-gradient-to-b from-slate-50 via-white to-white px-6 py-16">
      <div className="w-full max-w-xl rounded-[28px] border border-slate-200/70 bg-white p-8 shadow-sm sm:p-10">
        <p className="text-[11px] font-semibold tracking-[0.18em] text-slate-500 uppercase">
          404 — Page not found
        </p>
        <h1 className="mt-3 text-2xl font-semibold tracking-[-0.01em] text-slate-900 sm:text-[1.75rem]">
          We couldn&rsquo;t find that page.
        </h1>
        <p className="mt-3 text-[15px] leading-[1.8] text-slate-600">
          The link may have moved, expired, or never existed. Head back to the homepage to keep
          exploring {SITE_NAME}.
        </p>

        <div className="mt-7 flex flex-wrap gap-3">
          <Link
            href="/"
            className="inline-flex h-11 items-center justify-center rounded-xl bg-slate-900 px-5 text-sm font-semibold text-white shadow-sm transition-colors hover:bg-slate-800 focus:outline-none focus-visible:ring-2 focus-visible:ring-slate-900 focus-visible:ring-offset-2"
          >
            Go to homepage
          </Link>
          <Link
            href="/contact"
            className="inline-flex h-11 items-center justify-center rounded-xl border border-slate-200 bg-white px-5 text-sm font-semibold text-slate-700 transition-colors hover:bg-slate-50 focus:outline-none focus-visible:ring-2 focus-visible:ring-slate-900 focus-visible:ring-offset-2"
          >
            Contact SSP
          </Link>
        </div>
      </div>
    </div>
  );
}
