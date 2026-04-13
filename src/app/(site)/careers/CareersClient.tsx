// src/app/(site)/careers/CareersClient.tsx
"use client";

import * as React from "react";
import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";
import {
  ArrowRight,
  Briefcase,
  Building2,
  Calendar,
  CheckCircle2,
  ChevronRight,
  ArrowUpRight,
  Home,
  Loader2,
  MapPin,
  Search,
  X,
} from "lucide-react";
import { motion, useReducedMotion, type Variants } from "framer-motion";

import { EEmploymentType, EWorkplaceType, type IJobPosting } from "@/types/jobPosting.types";
import { trackCtaClick } from "@/lib/analytics/cta";
import { Container } from "@/app/(site)/components/layout/Container";
import { Section } from "@/app/(site)/components/layout/Section";
import { Select } from "@/app/(site)/components/ui/Select";
import { cn } from "@/lib/cn";
import { SectionSignalEyebrow } from "@/app/(site)/components/ui/SectionSignalEyebrow";

type SortBy = "publishedAt" | "title" | "createdAt";
type SortDir = "asc" | "desc";

type JobItem = Partial<IJobPosting> & {
  departmentName?: string;
};

type JobsMeta = {
  page?: number;
  pageSize?: number;
  total?: number;
  totalPages?: number;
  hasPrev?: boolean;
  hasNext?: boolean;
  sortBy?: SortBy;
  sortDir?: SortDir;
};

type Query = {
  page: number;
  pageSize: number;
  q: string;
  department: string;
  location: string;
  workplaceType: string;
  employmentType: string;
  sortBy: SortBy;
  sortDir: SortDir;
};

function pillLabel(v?: string) {
  return (v || "")
    .replace(/_/g, " ")
    .toLowerCase()
    .replace(/\b\w/g, (m) => m.toUpperCase());
}

function fmtDate(d?: Date | string | null) {
  if (!d) return "";
  try {
    return new Date(d).toLocaleDateString(undefined, {
      year: "numeric",
      month: "short",
      day: "numeric",
    });
  } catch {
    return "";
  }
}

function clampPage(p: number) {
  return Number.isFinite(p) && p > 0 ? Math.floor(p) : 1;
}

function getSiteHeaderOffset() {
  if (typeof window === "undefined") return 0;
  const header = document.querySelector("[data-site-header]") as HTMLElement | null;
  if (header) {
    const rect = header.getBoundingClientRect();
    return Math.max(0, rect.height || 0);
  }
  const mainbar = document.querySelector("[data-header-mainbar]") as HTMLElement | null;
  if (mainbar) {
    const rect = mainbar.getBoundingClientRect();
    return Math.max(0, rect.height || 0);
  }
  return 0;
}

function scrollToId(id: string) {
  if (typeof window === "undefined") return;
  const el = document.getElementById(id);
  if (!el) return;

  const extra = 8;
  const offset = getSiteHeaderOffset() + extra;
  const y = el.getBoundingClientRect().top + window.scrollY - offset;
  const behavior: ScrollBehavior = window.matchMedia?.("(prefers-reduced-motion: reduce)").matches
    ? "auto"
    : "smooth";
  window.scrollTo({ top: Math.max(0, y), behavior });
}

const WORKPLACE_OPTIONS = [
  { value: "", label: "Workplace type" },
  ...Object.values(EWorkplaceType).map((v) => ({ value: v, label: pillLabel(v) })),
];

const EMPLOYMENT_OPTIONS = [
  { value: "", label: "Employment type" },
  ...Object.values(EEmploymentType).map((v) => ({ value: v, label: pillLabel(v) })),
];

const SORT_OPTIONS: Array<{ value: string; label: string }> = [
  { value: "publishedAt:desc", label: "Newest" },
  { value: "publishedAt:asc", label: "Oldest" },
  { value: "title:asc", label: "Title (A–Z)" },
  { value: "title:desc", label: "Title (Z–A)" },
  { value: "createdAt:desc", label: "Recently added" },
];

const DEFAULTS = {
  page: 1,
  pageSize: 12,
  sortBy: "publishedAt" as SortBy,
  sortDir: "desc" as SortDir,
};

const FILTER_FIELD_CLASS =
  "w-full rounded-xl border bg-white py-2.5 pr-10 pl-10 text-sm transition-all duration-200 border-[color:var(--color-border-light-soft)] text-[color:var(--color-text-light)] shadow-[var(--shadow-control-soft)] placeholder:text-[color:var(--color-subtle-light)] hover:border-[color:var(--color-brand-600)] focus:border-[color:var(--color-brand-600)] focus:ring-4 focus:ring-[color:var(--color-brand-600)]/10 focus:outline-none";

const FILTER_SELECT_BUTTON_CLASS =
  "w-full items-center justify-between rounded-xl bg-white px-4 py-2.5 text-sm border border-[color:var(--color-border-light-soft)] text-[color:var(--color-text-light)] shadow-[var(--shadow-control-soft)] transition-all duration-200 hover:border-[color:var(--color-brand-600)] focus:border-[color:var(--color-brand-600)] focus:outline-none focus:ring-4 focus:ring-[color:var(--color-brand-600)]/10";

const FILTER_SELECT_MENU_CLASS =
  "mt-1 overflow-hidden rounded-xl bg-white text-sm text-[color:var(--color-text-light)] border border-[color:var(--color-border-light-soft)] shadow-[var(--shadow-control-popover)]";
const DRIVER_ONBOARDING_URL = "https://drivedock.ssp4you.com/";

function buildUrlParams(q: Query) {
  const qs = new URLSearchParams();

  if (q.q.trim()) qs.set("q", q.q.trim());
  if (q.department.trim()) qs.set("department", q.department.trim());
  if (q.location.trim()) qs.set("location", q.location.trim());
  if (q.workplaceType) qs.set("workplaceType", q.workplaceType);
  if (q.employmentType) qs.set("employmentType", q.employmentType);

  const page = clampPage(q.page);
  const pageSize = q.pageSize || DEFAULTS.pageSize;

  if (page !== DEFAULTS.page) qs.set("page", String(page));
  if (pageSize !== DEFAULTS.pageSize) qs.set("pageSize", String(pageSize));

  if (q.sortBy !== DEFAULTS.sortBy) qs.set("sortBy", q.sortBy);
  if (q.sortDir !== DEFAULTS.sortDir) qs.set("sortDir", q.sortDir);

  return qs;
}

async function fetchJobs(qs: URLSearchParams, signal?: AbortSignal) {
  const res = await fetch(`/api/v1/jobs?${qs.toString()}`, { signal, cache: "no-store" });
  const json = await res.json().catch(() => ({}));
  if (!res.ok) throw new Error(json?.message || "Failed to fetch jobs");
  return json as { data: { items: JobItem[]; meta: JobsMeta } };
}

function parseSortValue(v: string): { sortBy: SortBy; sortDir: SortDir } {
  const [rawSortBy, rawDir] = (v || "").split(":");

  const allowed = new Set<SortBy>(["publishedAt", "title", "createdAt"]);
  const sortBy: SortBy = allowed.has(rawSortBy as SortBy) ? (rawSortBy as SortBy) : "publishedAt";
  const sortDir: SortDir = rawDir === "asc" ? "asc" : "desc";

  return { sortBy, sortDir };
}

export default function CareersClient({
  initialItems,
  initialMeta,
  initialQuery,
}: {
  initialItems: JobItem[];
  initialMeta: JobsMeta;
  initialQuery: Query;
}) {
  const router = useRouter();
  const sp = useSearchParams();
  const reduceMotion = useReducedMotion();

  const [query, setQuery] = React.useState<Query>(initialQuery);
  const queryRef = React.useRef<Query>(initialQuery);
  const lastUrlRef = React.useRef<string>("");
  const didMountRef = React.useRef(false);

  React.useEffect(() => {
    queryRef.current = query;
  }, [query]);

  const [items, setItems] = React.useState<JobItem[]>(initialItems ?? []);
  const [meta, setMeta] = React.useState<JobsMeta>(initialMeta ?? {});
  const [loading, setLoading] = React.useState(false);
  const [error, setError] = React.useState<string | null>(null);

  const jobsAbortRef = React.useRef<AbortController | null>(null);
  const resultsRef = React.useRef<HTMLDivElement | null>(null);

  const SECTION_SCROLL_MARGIN_TOP = "128px";

  // local inputs (debounced), same approach as Insights
  const [qInput, setQInput] = React.useState(initialQuery.q ?? "");
  const [deptInput, setDeptInput] = React.useState(initialQuery.department ?? "");
  const [locInput, setLocInput] = React.useState(initialQuery.location ?? "");

  const activeFilters = Boolean(
    query.q.trim() ||
    query.department.trim() ||
    query.location.trim() ||
    query.workplaceType ||
    query.employmentType ||
    query.sortBy !== DEFAULTS.sortBy ||
    query.sortDir !== DEFAULTS.sortDir,
  );

  const scrollToResults = React.useCallback(() => {
    resultsRef.current?.scrollIntoView({ behavior: "smooth", block: "start" });
  }, []);

  const runFetch = React.useCallback(
    async (next: Partial<Query>, opts?: { scroll?: boolean; replaceUrl?: boolean }) => {
      const scroll = opts?.scroll ?? false;
      const replaceUrl = opts?.replaceUrl ?? true;

      const base = queryRef.current;
      const merged: Query = { ...base, ...next };

      merged.page = clampPage(merged.page);
      merged.pageSize = merged.pageSize || DEFAULTS.pageSize;
      merged.sortBy = (merged.sortBy || DEFAULTS.sortBy) as SortBy;
      merged.sortDir = (merged.sortDir || DEFAULTS.sortDir) as SortDir;

      const qs = buildUrlParams(merged);
      const qsStr = qs.toString();
      const nextUrl = `/careers${qsStr ? `?${qsStr}` : ""}`;

      if (replaceUrl && lastUrlRef.current !== nextUrl) {
        lastUrlRef.current = nextUrl;
        router.replace(nextUrl, { scroll: false });
      }

      jobsAbortRef.current?.abort();
      const ac = new AbortController();
      jobsAbortRef.current = ac;

      setLoading(true);
      setError(null);

      try {
        const resp = await fetchJobs(qs, ac.signal);
        setItems(resp.data.items ?? []);
        setMeta(resp.data.meta ?? {});
        setQuery(merged);

        if (scroll) scrollToResults();
      } catch (e: any) {
        if (e?.name === "AbortError") return;
        setError(e?.message ?? "Something went wrong.");
      } finally {
        setLoading(false);
      }
    },
    [router, scrollToResults],
  );

  // sync from URL like Insights
  React.useEffect(() => {
    const nextPage = clampPage(Number(sp.get("page") ?? String(DEFAULTS.page)));
    const nextPageSize =
      Number(sp.get("pageSize") ?? String(queryRef.current.pageSize ?? DEFAULTS.pageSize)) ||
      DEFAULTS.pageSize;

    const rawSortBy = sp.get("sortBy") ?? DEFAULTS.sortBy;
    const rawSortDir = sp.get("sortDir") ?? DEFAULTS.sortDir;

    const allowedSort = new Set<SortBy>(["publishedAt", "title", "createdAt"]);
    const nextSortBy: SortBy = allowedSort.has(rawSortBy as SortBy)
      ? (rawSortBy as SortBy)
      : DEFAULTS.sortBy;
    const nextSortDir: SortDir = rawSortDir === "asc" ? "asc" : "desc";

    const next: Query = {
      page: nextPage,
      pageSize: nextPageSize,
      q: sp.get("q") ?? "",
      department: sp.get("department") ?? "",
      location: sp.get("location") ?? "",
      workplaceType: sp.get("workplaceType") ?? "",
      employmentType: sp.get("employmentType") ?? "",
      sortBy: nextSortBy,
      sortDir: nextSortDir,
    };

    const prev = queryRef.current;

    const changed =
      prev.page !== next.page ||
      prev.pageSize !== next.pageSize ||
      prev.q !== next.q ||
      prev.department !== next.department ||
      prev.location !== next.location ||
      prev.workplaceType !== next.workplaceType ||
      prev.employmentType !== next.employmentType ||
      prev.sortBy !== next.sortBy ||
      prev.sortDir !== next.sortDir;

    if (!changed) return;

    setQuery(next);

    // listing-style input sync only when URL changed externally/browser nav
    setQInput((prevVal) => (prevVal === next.q ? prevVal : next.q));
    setDeptInput((prevVal) => (prevVal === next.department ? prevVal : next.department));
    setLocInput((prevVal) => (prevVal === next.location ? prevVal : next.location));
  }, [sp]);

  // debounced fetch for text inputs, same search behavior pattern as Insights
  React.useEffect(() => {
    if (!didMountRef.current) {
      didMountRef.current = true;
      return;
    }

    const t = window.setTimeout(() => {
      const current = queryRef.current;

      if (
        qInput === current.q &&
        deptInput === current.department &&
        locInput === current.location
      ) {
        return;
      }

      runFetch(
        {
          q: qInput,
          department: deptInput,
          location: locInput,
          page: 1,
        },
        { replaceUrl: true, scroll: false },
      );
    }, 350);

    return () => window.clearTimeout(t);
  }, [qInput, deptInput, locInput, runFetch]);

  // deep-link support: /careers#overview | #why-work-with-ssp | #drive | #jobs
  // Also supports nav query routing:
  // /careers?track=drivers -> #drive
  // /careers?track=office-operations -> #jobs
  React.useEffect(() => {
    if (typeof window === "undefined") return;

    const hash = window.location.hash || "";
    const id = hash.replace("#", "");
    const track = new URLSearchParams(window.location.search).get("track");
    const targetId =
      id || (track === "drivers" ? "drive" : track === "office-operations" ? "jobs" : "");

    if (!targetId) return;
    const t = window.setTimeout(() => scrollToId(targetId), 50);
    return () => window.clearTimeout(t);
  }, []);

  const canPrev = Boolean(meta?.hasPrev ?? (meta?.page ?? query.page) > 1);
  const canNext = Boolean(meta?.hasNext ?? (meta?.page ?? query.page) < (meta?.totalPages ?? 1));

  const sortValue = `${query.sortBy}:${query.sortDir}`;

  const stagger: Variants = reduceMotion
    ? { hidden: { opacity: 1 }, show: { opacity: 1 } }
    : { hidden: {}, show: { transition: { staggerChildren: 0.08, delayChildren: 0.06 } } };

  const fadeUp: Variants = reduceMotion
    ? { hidden: { opacity: 1, y: 0 }, show: { opacity: 1, y: 0 } }
    : {
        // Visible-first motion: keep opacity readable, animate subtle lift + scale.
        hidden: { opacity: 1, y: 12, scale: 0.985 },
        show: { opacity: 1, y: 0, scale: 1 },
      };

  const heroShardMaskStyle: React.CSSProperties = {
    background:
      "linear-gradient(162deg, rgba(255,255,255,0.9) 0%, color-mix(in srgb, var(--color-brand-500) 84%, white 16%) 58%, color-mix(in srgb, var(--color-company-hero-midnight-end) 78%, var(--color-brand-600) 22%) 100%)",
    WebkitMaskImage: "url('/_optimized/company/ssp-shard-mask.svg')",
    maskImage: "url('/_optimized/company/ssp-shard-mask.svg')",
    WebkitMaskRepeat: "no-repeat",
    maskRepeat: "no-repeat",
    WebkitMaskPosition: "center",
    maskPosition: "center",
    WebkitMaskSize: "contain",
    maskSize: "contain",
  };

  const heroShardFadeStyle: React.CSSProperties = {
    WebkitMaskImage:
      "linear-gradient(136deg, rgba(0,0,0,0.01) 0%, rgba(0,0,0,0.12) 30%, rgba(0,0,0,0.86) 63%, #000 100%)",
    maskImage:
      "linear-gradient(136deg, rgba(0,0,0,0.01) 0%, rgba(0,0,0,0.12) 30%, rgba(0,0,0,0.86) 63%, #000 100%)",
  };

  return (
    <>
      <Section
        id="overview"
        className="relative overflow-hidden border-b border-white/10 py-18 sm:py-22 lg:py-24"
        variant="dark"
        style={{
          scrollMarginTop: SECTION_SCROLL_MARGIN_TOP,
          background:
            "linear-gradient(135deg,#061321 0%, var(--color-company-ink) 48%, #04101c 100%)",
        }}
      >
        <div className="absolute inset-0">
          <div
            aria-hidden
            className="absolute inset-0"
            style={{
              background:
                "linear-gradient(120deg, rgba(3,10,19,0.7) 0%, rgba(5,13,24,0.5) 46%, rgba(4,11,21,0.62) 100%)",
            }}
          />
          <div
            aria-hidden
            className="absolute inset-0"
            style={{
              background:
                "radial-gradient(62% 64% at 88% 45%, rgba(56,189,248,0.11), rgba(56,189,248,0.01) 56%, transparent 100%)",
            }}
          />
          <div
            aria-hidden
            className="absolute inset-0"
            style={{
              background:
                "radial-gradient(55% 58% at 8% 100%, rgba(2,132,199,0.14), transparent 72%)",
            }}
          />
          <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-[color:var(--color-ssp-cyan-500)]/32 to-transparent" />
          <div
            className="absolute inset-x-0 bottom-0 h-20"
            style={{
              background: "linear-gradient(to bottom, transparent, var(--color-careers-drive-bg))",
            }}
            aria-hidden
          />
        </div>

        <div className="relative z-10">
          <Container className="site-page-container">
            <motion.div
              initial="hidden"
              animate="show"
              variants={stagger}
              className="grid items-end gap-10 lg:grid-cols-[minmax(0,1fr)_minmax(350px,0.88fr)]"
            >
              <div className="relative z-20">
                <motion.div
                  variants={fadeUp}
                  transition={{ duration: reduceMotion ? 0 : 0.35, ease: "easeOut" }}
                >
                  <SectionSignalEyebrow label="Careers" light />
                </motion.div>

                <motion.h1
                  variants={fadeUp}
                  transition={{ duration: reduceMotion ? 0 : 0.5, ease: "easeOut" }}
                  className={cn(
                    "mt-4 max-w-3xl font-bold tracking-tight text-balance text-white",
                    "text-[2.05rem] leading-[1.04] sm:text-[2.45rem] lg:text-[2.92rem]",
                  )}
                >
                  Build a Career in Disciplined Freight Operations.
                </motion.h1>

                <motion.p
                  variants={fadeUp}
                  transition={{ duration: reduceMotion ? 0 : 0.45, ease: "easeOut" }}
                  className="mt-4 max-w-[54ch] text-[14.25px] leading-[1.74] text-white/84 sm:text-[15px]"
                >
                  Join a team where ownership, safety, and operating discipline define daily
                  execution. Whether you are on the road or in operations, SSP provides the
                  structure, support, and accountability required for long-term growth.
                </motion.p>

                <motion.div
                  variants={fadeUp}
                  transition={{ duration: reduceMotion ? 0 : 0.45, ease: "easeOut" }}
                  className="mt-7 flex flex-wrap items-center gap-3"
                >
                  <button
                    type="button"
                    onClick={() => {
                      scrollToId("jobs");
                    }}
                    className={cn(
                      "inline-flex h-11 items-center justify-center gap-2 px-5 text-sm font-semibold",
                      "cursor-pointer border border-[color:var(--color-brand-600)] bg-[linear-gradient(180deg,var(--color-brand-500),var(--color-brand-600)_54%,var(--color-brand-700))] text-white shadow-[var(--shadow-action-primary)] transition hover:-translate-y-[2px] hover:brightness-[1.04]",
                      "site-cta-radius",
                      "focus-ring-surface",
                    )}
                  >
                    View Open Roles <ArrowRight className="h-4 w-4" />
                  </button>

                  <button
                    type="button"
                    onClick={() => {
                      scrollToId("drive");
                    }}
                    className={cn(
                      "inline-flex h-11 items-center justify-center gap-2 px-5 text-sm font-semibold",
                      "cursor-pointer border border-white/24 bg-white/12 text-white/94 shadow-sm backdrop-blur transition hover:-translate-y-[2px] hover:border-white/40 hover:bg-white/16 hover:text-white",
                      "site-cta-radius",
                      "focus-ring-surface",
                    )}
                  >
                    Driver Opportunities <ArrowRight className="h-4 w-4" />
                  </button>
                </motion.div>

                <motion.div
                  variants={fadeUp}
                  transition={{ duration: reduceMotion ? 0 : 0.45, ease: "easeOut" }}
                  className="mt-7 flex flex-wrap gap-x-7 gap-y-3 text-[12.5px] text-white/78"
                >
                  <div className="flex items-center gap-2">
                    <span className="h-1.5 w-1.5 rounded-full bg-white/55" />
                    Clear expectations
                  </div>
                  <div className="flex items-center gap-2">
                    <span className="h-1.5 w-1.5 rounded-full bg-white/55" />
                    Safety-led decisions
                  </div>
                  <div className="flex items-center gap-2">
                    <span className="h-1.5 w-1.5 rounded-full bg-white/55" />
                    Strong dispatch and ops support
                  </div>
                </motion.div>
              </div>

              <motion.aside
                variants={fadeUp}
                transition={{ duration: reduceMotion ? 0 : 0.48, ease: "easeOut" }}
                className="relative hidden overflow-hidden rounded-3xl border border-white/16 bg-black/24 p-6 shadow-[var(--shadow-glass-card)] backdrop-blur-xl lg:block"
              >
                <div className="pointer-events-none absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-white/70 to-transparent" />
                <p className="text-[10.5px] font-semibold tracking-[0.15em] text-white/64 uppercase">
                  Talent Command Desk
                </p>
                <h2 className="mt-3 text-[1.3rem] leading-tight font-semibold tracking-tight text-white">
                  Hiring across fleet, operations, and growth-critical functions.
                </h2>
                <p className="mt-3 text-[13px] leading-[1.72] text-white/74">
                  Structured onboarding, clear role ownership, and leadership support from
                  application through placement.
                </p>

                <div className="mt-5 grid grid-cols-2 gap-2.5">
                  <div className="rounded-xl border border-white/18 bg-black/18 px-3 py-2.5">
                    <p className="text-[1.05rem] font-semibold tracking-tight text-white">
                      {meta?.total ?? items.length}
                    </p>
                    <p className="mt-1 text-[10px] tracking-[0.14em] text-white/60 uppercase">
                      Live openings
                    </p>
                  </div>
                  <div className="rounded-xl border border-white/18 bg-black/18 px-3 py-2.5">
                    <p className="text-[1.05rem] font-semibold tracking-tight text-white">24 / 7</p>
                    <p className="mt-1 text-[10px] tracking-[0.14em] text-white/60 uppercase">
                      Ops support
                    </p>
                  </div>
                </div>

                <div className="mt-5 flex flex-wrap gap-2">
                  {["Driver opportunities", "Office and operations", "Leadership tracks"].map(
                    (x) => (
                      <span
                        key={x}
                        className="rounded-full border border-white/20 bg-white/[0.1] px-2.5 py-1 text-[10px] font-medium text-white/82"
                      >
                        {x}
                      </span>
                    ),
                  )}
                </div>
              </motion.aside>
            </motion.div>

            <motion.div
              initial={reduceMotion ? { opacity: 0.1 } : { opacity: 0.04, x: -34, y: 20 }}
              animate={reduceMotion ? { opacity: 0.1 } : { opacity: 0.14, x: 0, y: 0 }}
              transition={{ duration: reduceMotion ? 0 : 0.66, ease: [0.22, 1, 0.36, 1] }}
              className="pointer-events-none absolute top-[-2%] right-[-45%] h-[120%] w-[118%] sm:top-[-4%] sm:right-[-40%] sm:h-[126%] sm:w-[110%] md:top-[-7%] md:right-[-31%] md:h-[130%] md:w-[98%] lg:top-[-10%] lg:right-[-23%] lg:h-[134%] lg:w-[80%]"
              aria-hidden
              style={heroShardFadeStyle}
            >
              <div className="h-full w-full" style={heroShardMaskStyle} />
            </motion.div>
          </Container>
        </div>
      </Section>

      <Section
        id="why-work-with-ssp"
        className="relative py-14 sm:py-16"
        variant="light"
        style={{ scrollMarginTop: SECTION_SCROLL_MARGIN_TOP }}
      >
        <div
          aria-hidden
          className="absolute inset-0"
          style={{
            background:
              "radial-gradient(900px 420px at 20% 0%, var(--color-careers-light-glow-brand), transparent 60%), radial-gradient(900px 420px at 90% 10%, var(--color-careers-light-glow-ink), transparent 60%)",
          }}
        />
        <div className="relative">
          <Container className="site-page-container">
            <motion.div
              initial="hidden"
              whileInView="show"
              viewport={{ once: true, amount: 0.2 }}
              variants={stagger}
            >
              <motion.div variants={fadeUp} className="flex items-end justify-between gap-4">
                <div className="max-w-2xl">
                  <SectionSignalEyebrow label="Why SSP" />
                  <h2 className="text-[1.6rem] font-semibold tracking-tight text-[color:var(--color-text-light)] sm:text-[1.95rem] lg:text-[2.2rem]">
                    High Standards. Real Operating Support.
                  </h2>
                  <p className="mt-2 text-sm leading-6 text-[color:var(--color-muted-light)]">
                    We run freight with clear expectations, direct communication, and accountable
                    follow-through. The result is an operating environment where execution quality
                    is supported, measured, and consistently recognized.
                  </p>
                </div>

                <button
                  type="button"
                  onClick={() => scrollToId("jobs")}
                  className={cn(
                    "hidden cursor-pointer items-center gap-2 rounded-md border border-[color:var(--color-border-light)] bg-white px-4 py-2 text-sm font-semibold text-[color:var(--color-text-light)] shadow-sm transition hover:bg-[color:var(--color-surface-0-light)] sm:inline-flex",
                    "focus-ring-light",
                  )}
                >
                  See openings <ChevronRight className="h-4 w-4" />
                </button>
              </motion.div>

              <motion.div
                variants={fadeUp}
                className="mt-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-4"
              >
                {[
                  {
                    title: "Safety as a Core Value",
                    desc: "Training, maintenance, and operating checks designed to protect people, freight, and public roadways.",
                  },
                  {
                    title: "Operational Clarity",
                    desc: "Structured workflows and clear handoffs reduce ambiguity so teams can execute with confidence.",
                  },
                  {
                    title: "Dedicated Support Infrastructure",
                    desc: "Dispatch and operations teams work as partners, resolve issues quickly, and keep commitments visible.",
                  },
                  {
                    title: "Structured Career Growth",
                    desc: "Ownership and consistency are rewarded. As SSP grows, high performers gain broader scope and leadership opportunities.",
                  },
                ].map((c) => (
                  <div
                    key={c.title}
                    className="site-card-surface-subtle overflow-hidden rounded-2xl p-5 transition-all duration-300 hover:-translate-y-[2px]"
                  >
                    <div className="flex items-center gap-2 text-sm font-semibold text-[color:var(--color-text-light)]">
                      <CheckCircle2 className="h-4 w-4 text-[color:var(--color-brand-600)]" />
                      {c.title}
                    </div>
                    <p className="mt-2 text-sm leading-6 text-[color:var(--color-muted-light)]">
                      {c.desc}
                    </p>
                  </div>
                ))}
              </motion.div>
            </motion.div>
          </Container>
        </div>
      </Section>

      <Section
        id="drive"
        className="relative overflow-hidden"
        variant="dark"
        style={{
          backgroundColor: "var(--color-careers-drive-bg)",
          scrollMarginTop: SECTION_SCROLL_MARGIN_TOP,
        }}
      >
        <div aria-hidden className="pointer-events-none absolute inset-0">
          <div
            className="absolute top-0 right-0 h-[600px] w-[600px] rounded-full"
            style={{
              background:
                "radial-gradient(circle, var(--color-careers-drive-glow-brand), transparent 60%)",
            }}
          />
          <div
            className="absolute bottom-0 left-0 h-[500px] w-[500px] rounded-full"
            style={{
              background:
                "radial-gradient(circle, var(--color-careers-drive-glow-ink), transparent 70%)",
            }}
          />
        </div>
        <Container className="site-page-container relative">
          <div className="grid gap-8 lg:grid-cols-[1.2fr_0.8fr]">
            <div>
              <SectionSignalEyebrow label="Fleet Operations" light />

              <h2 className="text-[1.6rem] font-semibold tracking-tight text-white sm:text-[1.95rem] lg:text-[2.2rem]">
                Driver Opportunities
              </h2>

              <p className="mt-2 max-w-2xl text-sm leading-6 text-white/74">
                SSP operates a safety-first fleet backed by structured dispatch and operational
                support. If you value reliable equipment, clear communication, and accountable
                planning, this is a platform to build a durable driving career.
              </p>

              <div className="mt-5 grid gap-4 sm:grid-cols-2">
                <div
                  className="rounded-2xl p-5"
                  style={{
                    background: "var(--color-careers-drive-card-bg)",
                    border: "1px solid var(--color-careers-drive-card-border)",
                    boxShadow: "var(--shadow-careers-drive-card)",
                  }}
                >
                  <div className="text-sm font-semibold text-white">
                    Premium Equipment &amp; Maintenance
                  </div>
                  <p className="mt-2 text-sm leading-6 text-white/68">
                    A modernized fleet with proactive, scheduled maintenance to keep you moving
                    safely and efficiently.
                  </p>
                </div>

                <div
                  className="rounded-2xl p-5"
                  style={{
                    background: "var(--color-careers-drive-card-bg)",
                    border: "1px solid var(--color-careers-drive-card-border)",
                    boxShadow: "var(--shadow-careers-drive-card)",
                  }}
                >
                  <div className="text-sm font-semibold text-white">
                    Strategic Dispatch &amp; Planning
                  </div>
                  <p className="mt-2 text-sm leading-6 text-white/68">
                    Intelligent routing and 24/7 cross-functional support designed to maximize your
                    time, earnings, and work-life balance.
                  </p>
                </div>
              </div>
            </div>

            <div className="group relative overflow-hidden rounded-[2rem] p-[1px] shadow-[var(--shadow-careers-feature-card)]">
              <div
                className="absolute inset-0 bg-gradient-to-br from-[color:var(--color-brand-500)] via-transparent to-white/10 opacity-40 transition-opacity duration-500 group-hover:opacity-70"
                aria-hidden="true"
              />

              <div className="relative h-full rounded-[calc(2rem-1px)] bg-[color:var(--color-careers-drive-bg)]/95 p-6 backdrop-blur-2xl sm:p-8">
                <div
                  className="pointer-events-none absolute -top-24 -right-24 h-64 w-64 rounded-full bg-[color:var(--color-brand-600)] opacity-20 mix-blend-screen blur-3xl transition-all duration-700 group-hover:scale-110 group-hover:opacity-30"
                  aria-hidden="true"
                />

                <div className="mb-6 inline-flex h-12 w-12 items-center justify-center rounded-xl border border-[color:var(--color-brand-500)]/30 bg-[color:var(--color-brand-500)]/12 shadow-[0_0_15px_var(--color-careers-drive-glow-brand)]">
                  <ArrowUpRight className="h-5 w-5 text-[color:var(--color-careers-drivedock-500)] transition-transform duration-300 group-hover:scale-110 group-hover:rotate-12" />
                </div>

                <h3 className="mb-2 text-xl font-bold tracking-tight text-white">
                  Driver Onboarding
                </h3>
                <p className="mb-6 text-sm leading-relaxed text-white/72">
                  SSP driver applications run through DriveDock, our digital onboarding platform.
                  Start your profile, submit required details, and move through qualification steps
                  in one secure workflow.
                </p>

                <a
                  href={DRIVER_ONBOARDING_URL}
                  target="_blank"
                  rel="noopener noreferrer"
                  onClick={() =>
                    trackCtaClick({
                      ctaId: "careers_driver_onboarding_open",
                      location: "careers_drive_card",
                      destination: DRIVER_ONBOARDING_URL,
                      label: "Open Driver Onboarding",
                    })
                  }
                  className={cn(
                    "group/btn relative flex w-full items-center justify-between rounded-xl px-5 py-4 transition-all duration-300",
                    "border border-[color:var(--color-careers-drivedock-500)]/50 bg-gradient-to-r from-[color:var(--color-careers-drivedock-700)] via-[color:var(--color-careers-drivedock-600)] to-[color:var(--color-careers-drivedock-500)]",
                    "shadow-[var(--shadow-careers-drivedock-cta)] hover:-translate-y-1 hover:brightness-[1.05]",
                    "focus-ring-light",
                  )}
                >
                  <span className="min-w-0">
                    <span className="block font-semibold tracking-wide text-white">
                      Open Driver Onboarding
                    </span>
                    <span className="block truncate text-xs text-white/80">
                      drivedock.ssp4you.com | opens in new tab
                    </span>
                  </span>

                  <div className="ml-4 flex h-8 w-8 shrink-0 items-center justify-center rounded-full border border-white/20 bg-white/10 backdrop-blur-md transition-all duration-300 group-hover/btn:bg-white group-hover/btn:text-[color:var(--color-brand-700)]">
                    <ArrowRight className="h-4 w-4 text-white transition-transform duration-300 group-hover/btn:translate-x-0.5 group-hover/btn:text-[color:var(--color-brand-700)]" />
                  </div>
                </a>

                <div className="mt-5 flex items-center justify-between">
                  <div className="flex items-center gap-2 text-xs font-medium text-white/55">
                    <div className="h-1.5 w-1.5 animate-pulse rounded-full bg-emerald-400 shadow-[var(--shadow-careers-status-dot)]" />
                    Onboarding is open
                  </div>
                  <div className="text-[10px] tracking-wider text-white/40 uppercase">
                    Digital platform
                  </div>
                </div>
              </div>
            </div>
          </div>
        </Container>
      </Section>

      <Section
        id="jobs"
        className="relative overflow-hidden"
        variant="light"
        style={{
          backgroundColor: "var(--color-audience-bg)",
          scrollMarginTop: SECTION_SCROLL_MARGIN_TOP,
        }}
      >
        <div
          aria-hidden
          className="pointer-events-none absolute inset-0"
          style={{
            background:
              "radial-gradient(900px 420px at 80% 0%, var(--color-careers-light-glow-brand), transparent 55%), radial-gradient(900px 420px at 10% 10%, var(--color-careers-light-glow-ink), transparent 55%)",
          }}
        />
        <Container className="site-page-container relative">
          <div className="flex flex-col gap-2 sm:flex-row sm:items-end sm:justify-between">
            <div>
              <SectionSignalEyebrow label="Current Openings" />
              <h2 className="text-[1.6rem] font-semibold tracking-tight text-[color:var(--color-text-light)] sm:text-[1.95rem] lg:text-[2.2rem]">
                Office and Operations Roles
              </h2>
              <p className="mt-1 max-w-2xl text-sm text-[color:var(--color-muted-light)]">
                Explore open positions across dispatch, planning, compliance, customer operations,
                and leadership support. Every role contributes directly to disciplined execution
                across the SSP network.
              </p>
            </div>

            <div className="text-sm text-[color:var(--color-subtle-light)]">
              Total:{" "}
              <span className="font-semibold text-[color:var(--color-text-light)]">
                {meta?.total ?? items.length}
              </span>
            </div>
          </div>

          <div className="mt-6">
            <div className="site-card-surface relative flex flex-col gap-4 rounded-2xl p-4 sm:p-5">
              <div className="flex flex-col gap-3 lg:flex-row lg:items-center">
                <div className="relative flex-1">
                  <Search className="pointer-events-none absolute top-1/2 left-3.5 h-4 w-4 -translate-y-1/2 text-[color:var(--color-subtle-light)]" />
                  <input
                    value={qInput}
                    onChange={(e) => setQInput(e.target.value)}
                    placeholder="Search roles (e.g., dispatcher, safety, operations)…"
                    aria-label="Search roles"
                    className={FILTER_FIELD_CLASS}
                  />
                  {qInput ? (
                    <button
                      type="button"
                      onClick={() => setQInput("")}
                      className="absolute top-1/2 right-2 -translate-y-1/2 cursor-pointer rounded-lg p-1.5 text-[color:var(--color-subtle-light)] transition-colors hover:bg-[color:var(--color-surface-0)] hover:text-[color:var(--color-text-light)]"
                      aria-label="Clear search"
                    >
                      <X className="h-3.5 w-3.5" />
                    </button>
                  ) : null}
                </div>

                <div className="relative lg:w-56">
                  <Building2 className="pointer-events-none absolute top-1/2 left-3.5 h-4 w-4 -translate-y-1/2 text-[color:var(--color-subtle-light)]" />
                  <input
                    value={deptInput}
                    onChange={(e) => setDeptInput(e.target.value)}
                    placeholder="Department (optional)"
                    aria-label="Filter by department"
                    className={FILTER_FIELD_CLASS}
                  />
                  {deptInput ? (
                    <button
                      type="button"
                      onClick={() => setDeptInput("")}
                      className="absolute top-1/2 right-2 -translate-y-1/2 cursor-pointer rounded-lg p-1.5 text-[color:var(--color-subtle-light)] transition-colors hover:bg-[color:var(--color-surface-0)] hover:text-[color:var(--color-text-light)]"
                      aria-label="Clear department"
                    >
                      <X className="h-3.5 w-3.5" />
                    </button>
                  ) : null}
                </div>

                <div className="relative lg:w-56">
                  <MapPin className="pointer-events-none absolute top-1/2 left-3.5 h-4 w-4 -translate-y-1/2 text-[color:var(--color-subtle-light)]" />
                  <input
                    value={locInput}
                    onChange={(e) => setLocInput(e.target.value)}
                    placeholder="Location (optional)"
                    aria-label="Filter by location"
                    className={FILTER_FIELD_CLASS}
                  />
                  {locInput ? (
                    <button
                      type="button"
                      onClick={() => setLocInput("")}
                      className="absolute top-1/2 right-2 -translate-y-1/2 cursor-pointer rounded-lg p-1.5 text-[color:var(--color-subtle-light)] transition-colors hover:bg-[color:var(--color-surface-0)] hover:text-[color:var(--color-text-light)]"
                      aria-label="Clear location"
                    >
                      <X className="h-3.5 w-3.5" />
                    </button>
                  ) : null}
                </div>
              </div>

              <div className="flex flex-col gap-3 lg:flex-row lg:items-center lg:justify-between">
                <div className="flex flex-col gap-3 sm:flex-row">
                  <div className="sm:w-48">
                    <Select
                      value={query.workplaceType || ""}
                      onChange={(v) =>
                        runFetch({ workplaceType: v, page: 1 }, { replaceUrl: true, scroll: false })
                      }
                      options={WORKPLACE_OPTIONS}
                      placeholder="Workplace type"
                      ariaLabel="Filter by workplace type"
                      className="w-full cursor-pointer"
                      buttonClassName={FILTER_SELECT_BUTTON_CLASS}
                      menuClassName={FILTER_SELECT_MENU_CLASS}
                    />
                  </div>

                  <div className="sm:w-48">
                    <Select
                      value={query.employmentType || ""}
                      onChange={(v) =>
                        runFetch(
                          { employmentType: v, page: 1 },
                          { replaceUrl: true, scroll: false },
                        )
                      }
                      options={EMPLOYMENT_OPTIONS}
                      placeholder="Employment type"
                      ariaLabel="Filter by employment type"
                      className="w-full cursor-pointer"
                      buttonClassName={FILTER_SELECT_BUTTON_CLASS}
                      menuClassName={FILTER_SELECT_MENU_CLASS}
                    />
                  </div>

                  <div className="sm:w-48">
                    <Select
                      value={sortValue}
                      onChange={(v) => {
                        const { sortBy, sortDir } = parseSortValue(v);
                        runFetch({ sortBy, sortDir, page: 1 }, { replaceUrl: true, scroll: false });
                      }}
                      options={SORT_OPTIONS}
                      placeholder="Sort"
                      ariaLabel="Sort roles"
                      className="w-full cursor-pointer"
                      buttonClassName={FILTER_SELECT_BUTTON_CLASS}
                      menuClassName={FILTER_SELECT_MENU_CLASS}
                    />
                  </div>
                </div>

                <div className="flex flex-wrap items-center justify-between gap-3 lg:justify-end">
                  <div className="text-xs font-medium text-[color:var(--color-subtle-light)]">
                    {loading ? (
                      <span className="inline-flex items-center gap-1.5">
                        <Loader2 className="h-3.5 w-3.5 animate-spin" />
                        Searching…
                      </span>
                    ) : (
                      <span>
                        <span className="font-bold text-[color:var(--color-text-light)]">
                          {meta?.total ?? items.length}
                        </span>{" "}
                        role{(meta?.total ?? items.length) === 1 ? "" : "s"} found
                      </span>
                    )}
                  </div>

                  {activeFilters ? (
                    <button
                      type="button"
                      onClick={() => {
                        setQInput("");
                        setDeptInput("");
                        setLocInput("");
                        runFetch(
                          {
                            q: "",
                            department: "",
                            location: "",
                            workplaceType: "",
                            employmentType: "",
                            sortBy: DEFAULTS.sortBy,
                            sortDir: DEFAULTS.sortDir,
                            page: 1,
                          },
                          { replaceUrl: true, scroll: false },
                        );
                      }}
                      className="cursor-pointer rounded-lg px-3 py-1.5 text-xs font-semibold text-[color:var(--color-brand-600)] transition-colors hover:bg-[color:var(--color-brand-50)]"
                    >
                      Clear all
                    </button>
                  ) : (
                    <span className="text-xs text-[color:var(--color-subtle-light)]">
                      Tip: search by function, e.g. "dispatch"
                    </span>
                  )}
                </div>
              </div>
            </div>
          </div>

          <div className="mt-10" ref={resultsRef}>
            <div className="site-card-surface relative overflow-hidden rounded-2xl p-5 sm:p-8">
              <div className="mb-6 flex items-center justify-between">
                <h3 className="text-[15px] font-semibold tracking-tight text-[color:var(--color-text-light)]">
                  Available Listings
                </h3>
                <div className="text-xs font-medium text-[color:var(--color-subtle-light)]">
                  Page{" "}
                  <span className="font-bold text-[color:var(--color-text-light)]">
                    {meta?.page ?? query.page}
                  </span>{" "}
                  of{" "}
                  <span className="font-bold text-[color:var(--color-text-light)]">
                    {meta?.totalPages ?? 1}
                  </span>
                </div>
              </div>

              {error ? (
                <div className="mt-4 rounded-2xl border border-[color:var(--color-brand-100)] bg-[color:var(--color-brand-50)] p-5 text-sm">
                  <div className="font-medium">Couldn’t load jobs.</div>
                  <div className="mt-1 text-[color:var(--color-muted-light)]">{error}</div>
                  <button
                    type="button"
                    onClick={() => runFetch({}, { replaceUrl: false, scroll: false })}
                    className="mt-4 cursor-pointer rounded-lg border border-[color:var(--color-border-light)] bg-white px-4 py-2 text-xs font-semibold text-[color:var(--color-text-light)] shadow-sm transition hover:bg-[color:var(--color-surface-0-light)]"
                  >
                    Retry
                  </button>
                </div>
              ) : null}

              <div className="mt-2">
                <div className="flex flex-col">
                  {loading ? (
                    <div className="p-10 text-center text-sm text-[color:var(--color-subtle-light)]">
                      <span className="inline-flex items-center gap-2">
                        <Loader2 className="h-4 w-4 animate-spin" />
                        Loading roles…
                      </span>
                    </div>
                  ) : items.length ? (
                    items.map((j: any) => {
                      const loc = Array.isArray(j.locations) ? j.locations : [];
                      const locLabel =
                        loc[0]?.label || loc[0]?.city || loc[0]?.region || loc[0]?.country || "—";

                      const empLabel = j.employmentType ? pillLabel(String(j.employmentType)) : "—";
                      const workLabel = j.workplaceType ? pillLabel(String(j.workplaceType)) : "—";
                      const deptLabel = j.department || j.departmentName || "—";
                      const publishedLabel = fmtDate(j.publishedAt || j.createdAt);

                      const slug = String(j.slug || "");
                      const jobHref = `/careers/${encodeURIComponent(slug)}`;

                      return (
                        <Link
                          key={String(j.id ?? j.slug)}
                          href={jobHref}
                          onClick={() =>
                            trackCtaClick({
                              ctaId: "apply_now",
                              location: "careers_jobs_list",
                              destination: jobHref,
                              label: j.title || "Open job listing",
                            })
                          }
                          className={cn(
                            "group block border-b border-[color:var(--color-border-light)] py-4 transition-colors duration-200 last:border-0",
                            "focus-ring-light hover:bg-[color:var(--color-surface-0)]",
                          )}
                        >
                          <div className="flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between">
                            <div className="min-w-0">
                              <div className="truncate text-[15px] font-semibold tracking-tight text-[color:var(--color-text-light)]">
                                {j.title || "Untitled role"}
                              </div>

                              <div className="mt-1 flex flex-wrap items-center gap-x-3 gap-y-1 text-xs text-[color:var(--color-muted-light)]">
                                <span className="inline-flex items-center gap-1.5">
                                  <MapPin className="h-3.5 w-3.5 shrink-0" />
                                  {locLabel}
                                </span>
                                <span className="inline-flex items-center gap-1.5">
                                  <Building2 className="h-3.5 w-3.5 shrink-0" />
                                  {deptLabel}
                                </span>
                                <span className="inline-flex items-center gap-1.5">
                                  <Briefcase className="h-3.5 w-3.5 shrink-0" />
                                  {empLabel}
                                </span>
                                <span className="inline-flex items-center gap-1.5">
                                  <Home className="h-3.5 w-3.5 shrink-0" />
                                  {workLabel}
                                </span>
                                {publishedLabel ? (
                                  <span className="inline-flex items-center gap-1.5">
                                    <Calendar className="h-3.5 w-3.5 shrink-0" />
                                    {publishedLabel}
                                  </span>
                                ) : null}
                              </div>

                              {j.summary ? (
                                <div className="mt-1.5 line-clamp-2 text-sm text-[color:var(--color-muted-light)]">
                                  {j.summary}
                                </div>
                              ) : null}
                            </div>

                            <div className="mt-2 inline-flex items-center gap-1.5 text-sm font-medium text-[color:var(--color-text-light)] sm:mt-0">
                              View role
                              <ArrowRight className="h-3.5 w-3.5 transition-transform group-hover:translate-x-0.5" />
                            </div>
                          </div>
                        </Link>
                      );
                    })
                  ) : (
                    <div className="rounded-xl border border-[color:var(--color-border-light)] bg-[color:var(--color-surface-0-light)]/30 p-8 text-center">
                      <p className="text-sm font-medium text-[color:var(--color-text-light)]">
                        No roles found
                      </p>
                      <p className="mt-0.5 text-xs text-[color:var(--color-muted-light)]">
                        Try adjusting your search or filters.
                      </p>
                    </div>
                  )}
                </div>
              </div>

              <div className="mt-10 flex justify-center">
                <div
                  className={cn(
                    "inline-flex items-center gap-2 rounded-full border border-[color:var(--color-border-light)] bg-white px-2 py-1.5",
                    loading ? "opacity-80" : "",
                  )}
                >
                  <button
                    disabled={!canPrev || loading}
                    onClick={() =>
                      runFetch(
                        { page: Math.max(1, (meta?.page ?? query.page) - 1) },
                        { scroll: true, replaceUrl: true },
                      )
                    }
                    className={cn(
                      "min-w-[92px] text-center",
                      "cursor-pointer rounded-full px-3 py-1.5 text-xs font-medium transition",
                      canPrev && !loading
                        ? "text-[color:var(--color-text-light)] hover:bg-[color:var(--color-careers-control-hover-bg)]"
                        : "cursor-not-allowed text-[color:var(--color-subtle-light)]",
                    )}
                  >
                    Previous
                  </button>

                  <div className="h-5 w-px bg-[color:var(--color-border-light)]" />

                  <div className="px-3 text-xs text-[color:var(--color-subtle-light)]">
                    <span className="font-semibold text-[color:var(--color-text-light)]">
                      {meta?.page ?? query.page}
                    </span>
                    <span className="mx-1">/</span>
                    <span>{meta?.totalPages ?? 1}</span>
                  </div>

                  <div className="h-5 w-px bg-[color:var(--color-border-light)]" />

                  <button
                    disabled={!canNext || loading}
                    onClick={() =>
                      runFetch(
                        { page: (meta?.page ?? query.page) + 1 },
                        { scroll: true, replaceUrl: true },
                      )
                    }
                    className={cn(
                      "min-w-[92px] text-center",
                      "cursor-pointer rounded-full px-3 py-1.5 text-xs font-medium transition",
                      canNext && !loading
                        ? "text-[color:var(--color-text-light)] hover:bg-[color:var(--color-careers-control-hover-bg)]"
                        : "cursor-not-allowed text-[color:var(--color-subtle-light)]",
                    )}
                  >
                    Next
                  </button>
                </div>
              </div>

              <div className="mt-8 text-center text-xs text-[color:var(--color-subtle-light)]">
                Looking for a driver role? Jump to{" "}
                <button
                  type="button"
                  onClick={() => {
                    scrollToId("drive");
                  }}
                  className={cn(
                    "cursor-pointer font-medium text-[color:var(--color-brand-600)] underline underline-offset-2 transition-colors hover:text-[color:var(--color-brand-700)]",
                    "focus-ring-light",
                  )}
                >
                  Driver Opportunities
                </button>
                .
              </div>
            </div>
          </div>
        </Container>
      </Section>
    </>
  );
}
