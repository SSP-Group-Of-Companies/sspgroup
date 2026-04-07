// src/app/(admin)/admin/page.tsx
import Link from "next/link";
import { Briefcase, ChevronRight, FileText, Settings } from "lucide-react";
import { cn } from "@/lib/cn";

const cards = [
  {
    href: "/admin/blog",
    title: "Blog",
    description: "Drafts, publishing, categories, and comment moderation.",
    Icon: FileText,
  },
  {
    href: "/admin/jobs",
    title: "Job postings",
    description: "Open roles, applications, and hiring workflows.",
    Icon: Briefcase,
  },
  {
    href: "/admin/settings",
    title: "Settings",
    description: "Appearance and admin preferences.",
    Icon: Settings,
  },
];

export default function AdminDashboardPage() {
  return (
    <div className="space-y-8">
      <header className="relative overflow-hidden rounded-3xl border border-[var(--dash-border)] bg-[var(--dash-surface)] p-6 shadow-[var(--dash-shadow)] sm:p-8">
        <div className="pointer-events-none absolute -top-24 -right-16 h-64 w-64 rounded-full bg-[var(--dash-accent-soft)] blur-3xl" />
        <div className="pointer-events-none absolute -bottom-20 -left-10 h-48 w-48 rounded-full bg-[var(--dash-brand-soft)] opacity-80 blur-3xl" />
        <div className="relative">
          <p className="text-xs font-semibold tracking-[0.22em] text-[var(--dash-muted)] uppercase">
            Overview
          </p>
          <h1 className="mt-2 text-3xl font-semibold tracking-tight text-[var(--dash-text)]">
            Admin dashboard
          </h1>
          <p className="mt-2 max-w-xl text-sm leading-relaxed text-[var(--dash-muted)]">
            Manage content, careers, and workspace preferences—aligned with the SSP Group brand
            system.
          </p>
        </div>
      </header>

      <section className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {cards.map(({ href, title, description, Icon }) => (
          <Link
            key={href}
            href={href}
            className={cn(
              "group relative cursor-pointer overflow-hidden rounded-3xl border border-[var(--dash-border)] bg-[var(--dash-surface)] p-6 shadow-[var(--dash-shadow-soft)] transition duration-200",
              "hover:-translate-y-0.5 hover:border-[var(--dash-border-strong)] hover:shadow-[var(--dash-shadow)]",
              "focus:outline-none focus-visible:ring-2 focus-visible:ring-[var(--dash-accent-soft)]",
            )}
          >
            <div className="pointer-events-none absolute inset-0 opacity-0 transition group-hover:opacity-100">
              <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-[var(--dash-accent)]/35 to-transparent" />
            </div>
            <div className="flex items-start justify-between gap-3">
              <div
                className={cn(
                  "flex h-12 w-12 items-center justify-center rounded-2xl border border-[var(--dash-border)]",
                  "bg-[var(--dash-accent-muted)] text-[var(--dash-accent)]",
                )}
              >
                <Icon className="h-6 w-6" aria-hidden />
              </div>
              <ChevronRight
                className="h-5 w-5 shrink-0 text-[var(--dash-muted)] transition group-hover:translate-x-0.5 group-hover:text-[var(--dash-accent)]"
                aria-hidden
              />
            </div>
            <h2 className="mt-4 text-lg font-semibold text-[var(--dash-text)]">{title}</h2>
            <p className="mt-1 text-sm leading-relaxed text-[var(--dash-muted)]">{description}</p>
          </Link>
        ))}
      </section>
    </div>
  );
}
