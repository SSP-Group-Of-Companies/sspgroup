import Link from "next/link";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Page not found",
  description: "That admin page does not exist.",
  robots: { index: false, follow: false },
};

export default function AdminNotFound() {
  return (
    <div className="flex min-h-[50vh] flex-col items-center justify-center px-4 py-16">
      <div className="w-full max-w-md rounded-2xl border border-[var(--dash-border)] bg-[var(--dash-surface)] p-8 shadow-[var(--dash-shadow)]">
        <p className="text-[11px] font-semibold tracking-[0.18em] text-[var(--dash-muted)] uppercase">
          404
        </p>
        <h1 className="mt-2 text-xl font-semibold tracking-tight text-[var(--dash-text)]">
          Page not found
        </h1>
        <p className="mt-3 text-sm leading-relaxed text-[var(--dash-muted)]">
          This URL isn&apos;t part of the admin app. Go back to the admin home, or reach SSP if you
          need help off-platform.
        </p>
        <div className="mt-6 flex flex-col gap-2.5 sm:flex-row sm:flex-wrap">
          <Link
            href="/admin/blog"
            className="inline-flex h-10 items-center justify-center rounded-xl bg-[var(--dash-brand)] px-4 text-sm font-semibold text-white transition-opacity hover:opacity-90 focus:outline-none focus-visible:ring-2 focus-visible:ring-[var(--dash-brand)] focus-visible:ring-offset-2 focus-visible:ring-offset-[var(--dash-surface)]"
          >
            Go to admin home page
          </Link>
          <Link
            href="/contact"
            className="inline-flex h-10 items-center justify-center rounded-xl border border-[var(--dash-border)] bg-transparent px-4 text-sm font-semibold text-[var(--dash-text)] transition-colors hover:bg-[var(--dash-accent-soft)] focus:outline-none focus-visible:ring-2 focus-visible:ring-[var(--dash-brand)] focus-visible:ring-offset-2 focus-visible:ring-offset-[var(--dash-surface)]"
          >
            Contact SSP
          </Link>
        </div>
      </div>
    </div>
  );
}
