// src/app/(site)/insights/InsightsIndexClient.tsx
"use client";

import * as React from "react";
import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";
import { Calendar, Clock, Search, ArrowRight, X, Loader2 } from "lucide-react";
import { Select } from "@/app/(site)/components/ui/Select";
import { CardImage } from "@/components/media/CardImage";
import { HeroImage } from "@/components/media/HeroImage";
import { cn } from "@/lib/cn";
import { motion, useReducedMotion, type Variants } from "framer-motion";
import { Container } from "@/app/(site)/components/layout/Container";
import { Section } from "@/app/(site)/components/layout/Section";
import { INSIGHTS_DEFAULT_OG_IMAGE } from "@/lib/seo/site";
import { trackCtaClick } from "@/lib/analytics/cta";
import { SectionSignalEyebrow } from "@/app/(site)/components/ui/SectionSignalEyebrow";

type CategoryItem = {
  id: string;
  name: string;
  slug: string;
  postCount?: number;
};

type InsightPostListItem = {
  id: string;
  slug: string;
  title: string;
  excerpt?: string;
  coverImage?: { url?: string; alt?: string } | null;
  categories?: Array<{ id: string; name: string; slug: string }> | null;
  publishedAt?: string | null;
  readTimeMins?: number | null;
  viewCount?: number | null;
};

type Meta = { page: number; limit: number; total: number; totalPages: number };

type Query = {
  q: string;
  categoryId: string;
  categorySlug: string;
  sortBy: string;
  page: number;
  limit: number;
};

function insightPath(slug: string) {
  return `/insights/${encodeURIComponent(slug)}`;
}

function fmtDate(d?: any) {
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

const SORT_OPTIONS: Array<{ value: string; label: string }> = [
  { value: "newest", label: "Newest" },
  { value: "oldest", label: "Oldest" },
  { value: "mostViewed", label: "Most viewed" },
  { value: "titleAsc", label: "Title (A–Z)" },
  { value: "relevance", label: "Relevance" },
];

const FILTER_FIELD_CLASS =
  "w-full rounded-xl border bg-white py-2.5 pr-10 pl-10 text-sm transition-all duration-200 border-[color:var(--color-border-light-soft)] text-[color:var(--color-text-light)] shadow-[var(--shadow-control-soft)] placeholder:text-[color:var(--color-subtle-light)] hover:border-[color:var(--color-brand-600)] focus:border-[color:var(--color-brand-600)] focus:ring-4 focus:ring-[color:var(--color-brand-600)]/10 focus:outline-none";

const FILTER_SELECT_BUTTON_CLASS =
  "w-full items-center justify-between rounded-xl bg-white px-4 py-2.5 text-sm border border-[color:var(--color-border-light-soft)] text-[color:var(--color-text-light)] shadow-[var(--shadow-control-soft)] transition-all duration-200 hover:border-[color:var(--color-brand-600)] focus:border-[color:var(--color-brand-600)] focus:outline-none focus:ring-4 focus:ring-[color:var(--color-brand-600)]/10";

const FILTER_SELECT_MENU_CLASS =
  "mt-1 overflow-hidden rounded-xl bg-white text-sm text-[color:var(--color-text-light)] border border-[color:var(--color-border-light-soft)] shadow-[var(--shadow-control-popover)]";

function buildUrlParams(q: Query) {
  const qs = new URLSearchParams();

  if (q.q) qs.set("q", q.q);

  if (q.categorySlug) qs.set("categorySlug", q.categorySlug);
  else if (q.categoryId) qs.set("categoryId", q.categoryId);

  if (q.sortBy) qs.set("sortBy", q.sortBy);
  qs.set("page", String(clampPage(q.page)));
  qs.set("limit", String(q.limit || 9));

  return qs;
}

async function fetchPosts(qs: URLSearchParams, signal?: AbortSignal) {
  const res = await fetch(`/api/v1/blog?${qs.toString()}`, {
    signal,
    cache: "no-store",
  });
  const json = await res.json().catch(() => ({}));
  if (!res.ok) throw new Error(json?.message || "Failed to fetch posts");
  return json as { data: { items: InsightPostListItem[]; meta: Meta } };
}

async function fetchCategories(qs: URLSearchParams, signal?: AbortSignal) {
  const res = await fetch(`/api/v1/blog/categories?${qs.toString()}`, {
    signal,
    cache: "no-store",
  });
  const json = await res.json().catch(() => ({}));
  if (!res.ok) throw new Error(json?.message || "Failed to fetch categories");
  return json as { data: CategoryItem[] };
}

function SkeletonCard() {
  return (
    <div className="rounded-2xl border border-black/[0.06] bg-[color:var(--color-surface-0-light)]/70 p-3">
      <div className="animate-pulse">
        <div className="aspect-[16/10] w-full rounded-xl bg-[color:var(--color-surface-1-light)]" />

        <div className="mt-3 flex gap-2">
          <div className="h-5 w-16 rounded-full bg-[color:var(--color-surface-1-light)]" />
          <div className="h-5 w-20 rounded-full bg-[color:var(--color-surface-1-light)]" />
        </div>

        <div className="mt-3 h-4 w-[78%] rounded-md bg-[color:var(--color-surface-1-light)]" />
        <div className="mt-2 h-4 w-[62%] rounded-md bg-[color:var(--color-surface-1-light)]" />

        <div className="mt-3 space-y-2">
          <div className="h-3 w-full rounded-md bg-[color:var(--color-surface-1-light)]" />
          <div className="h-3 w-[88%] rounded-md bg-[color:var(--color-surface-1-light)]" />
        </div>

        <div className="mt-4 flex items-center justify-between">
          <div className="h-3 w-24 rounded-md bg-[color:var(--color-surface-1-light)]" />
          <div className="h-3 w-14 rounded-md bg-[color:var(--color-surface-1-light)]" />
        </div>

        <div className="mt-4 h-3 w-20 rounded-md bg-[color:var(--color-surface-1-light)]" />
      </div>
    </div>
  );
}

export default function InsightsIndexClient({
  initialItems,
  initialMeta,
  categories: initialCategories,
  recentItems,
  initialQuery,
  initialFetchError,
}: {
  initialItems: InsightPostListItem[];
  initialMeta: Meta;
  categories: CategoryItem[];
  recentItems: InsightPostListItem[];
  initialQuery: Query;
  /** Set when SSR blog API calls fail so the page renders and shows inline error instead of error.tsx */
  initialFetchError?: string | null;
}) {
  const router = useRouter();
  const sp = useSearchParams();

  const [query, setQuery] = React.useState<Query>(initialQuery);
  const [qInput, setQInput] = React.useState(initialQuery.q || "");

  const [items, setItems] = React.useState<InsightPostListItem[]>(initialItems ?? []);
  const [meta, setMeta] = React.useState<Meta>(initialMeta);
  const [categories, setCategories] = React.useState<CategoryItem[]>(initialCategories ?? []);

  const [loading, setLoading] = React.useState(false);
  const [catLoading, setCatLoading] = React.useState(false);
  const [error, setError] = React.useState<string | null>(initialFetchError ?? null);

  const resultsRef = React.useRef<HTMLDivElement | null>(null);
  const postsAbortRef = React.useRef<AbortController | null>(null);
  const catsAbortRef = React.useRef<AbortController | null>(null);

  const didMountRef = React.useRef(false);
  const queryRef = React.useRef<Query>(initialQuery);
  const lastUrlRef = React.useRef<string>("");

  React.useEffect(() => {
    queryRef.current = query;
  }, [query]);

  const hasFilters = Boolean(
    query.q ||
    query.categorySlug ||
    query.categoryId ||
    (query.sortBy && query.sortBy !== "newest"),
  );

  const showRelevanceOption = Boolean(query.q.trim().length > 0);
  const reduceMotion = useReducedMotion();
  const SECTION_SCROLL_MARGIN_TOP = "128px";

  const scrollToResults = React.useCallback(() => {
    resultsRef.current?.scrollIntoView({ behavior: "smooth", block: "start" });
  }, []);

  const scrollToId = React.useCallback((id: string) => {
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
  }, []);

  const runFetch = React.useCallback(
    async (
      next: Partial<Query>,
      opts?: { fetchCats?: boolean; scroll?: boolean; replaceUrl?: boolean },
    ) => {
      const fetchCatsOpt = opts?.fetchCats ?? true;
      const scroll = opts?.scroll ?? false;
      const replaceUrl = opts?.replaceUrl ?? true;

      const base = queryRef.current;
      const merged: Query = {
        ...base,
        ...next,
      };

      if (merged.sortBy === "relevance" && !merged.q) merged.sortBy = "newest";
      merged.page = clampPage(merged.page);
      merged.limit = merged.limit || 9;

      const qs = buildUrlParams(merged);
      const nextUrl = `/insights?${qs.toString()}`;

      if (replaceUrl && lastUrlRef.current !== nextUrl) {
        lastUrlRef.current = nextUrl;
        router.replace(nextUrl, { scroll: false });
      }

      postsAbortRef.current?.abort();
      const postsAc = new AbortController();
      postsAbortRef.current = postsAc;

      setLoading(true);
      setError(null);

      try {
        const posts = await fetchPosts(qs, postsAc.signal);

        setItems(posts.data.items);
        setMeta(posts.data.meta);
        setQuery(merged);

        if (fetchCatsOpt) {
          catsAbortRef.current?.abort();
          const catsAc = new AbortController();
          catsAbortRef.current = catsAc;

          setCatLoading(true);

          try {
            const cqs = new URLSearchParams();
            if (merged.q) cqs.set("q", merged.q);
            if (merged.categorySlug) cqs.set("categorySlug", merged.categorySlug);

            const cats = await fetchCategories(cqs, catsAc.signal);
            setCategories(cats.data);
          } finally {
            setCatLoading(false);
          }
        }

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

  React.useEffect(() => {
    const next: Query = {
      q: sp.get("q") ?? "",
      categorySlug: sp.get("categorySlug") ?? "",
      categoryId: sp.get("categoryId") ?? "",
      sortBy: sp.get("sortBy") ?? "newest",
      page: clampPage(Number(sp.get("page") ?? "1")),
      limit: clampPage(Number(sp.get("limit") ?? String(queryRef.current.limit || 9))),
    };

    const current = queryRef.current;
    const changed =
      current.q !== next.q ||
      current.categorySlug !== next.categorySlug ||
      current.categoryId !== next.categoryId ||
      current.sortBy !== next.sortBy ||
      current.page !== next.page ||
      current.limit !== next.limit;

    if (!changed) return;

    setQuery(next);

    // only sync the input when the URL changed from browser navigation / external navigation
    // do not force-write during normal typing flow if it's already the same
    setQInput((prev) => (prev === next.q ? prev : next.q));
  }, [sp]);

  React.useEffect(() => {
    if (!didMountRef.current) {
      didMountRef.current = true;
      return;
    }

    const t = window.setTimeout(() => {
      const current = queryRef.current;

      // avoid redundant fetches
      if (qInput === current.q) return;

      runFetch(
        {
          q: qInput,
          page: 1,
          sortBy: current.sortBy === "relevance" && !qInput ? "newest" : current.sortBy,
        },
        { fetchCats: true, scroll: false, replaceUrl: true },
      );
    }, 350);

    return () => window.clearTimeout(t);
  }, [qInput, runFetch]);

  const onPickCategory = (c: CategoryItem | null) => {
    if (!c) {
      runFetch(
        { categorySlug: "", categoryId: "", page: 1 },
        { fetchCats: false, replaceUrl: true, scroll: false },
      );
      return;
    }

    runFetch(
      { categorySlug: c.slug, categoryId: "", page: 1 },
      { fetchCats: false, replaceUrl: true, scroll: false },
    );
  };

  const onChangeSort = (v: string) => {
    runFetch({ sortBy: v, page: 1 }, { fetchCats: false, replaceUrl: true, scroll: false });
  };

  const clearAll = () => {
    setQInput("");
    runFetch(
      { q: "", categorySlug: "", categoryId: "", sortBy: "newest", page: 1 },
      { fetchCats: true, replaceUrl: true, scroll: false },
    );
  };

  const canPrev = (meta?.page ?? query.page) > 1;
  const canNext = (meta?.page ?? query.page) < (meta?.totalPages ?? 1);

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

  const categorySelectOptions = React.useMemo(
    () => [
      { value: "", label: "All categories" },
      ...categories.map((c) => ({
        value: c.slug,
        label: typeof c.postCount === "number" ? `${c.name} (${c.postCount})` : c.name,
      })),
    ],
    [categories],
  );

  const basePill =
    "cursor-pointer rounded-full border px-3 py-1 text-xs transition-all duration-200";

  const inactivePill =
    "border-[color:var(--color-border-light)] bg-white text-[color:var(--color-text-light)] hover:border-[color:var(--color-brand-200)] hover:bg-[color:var(--color-brand-50)] hover:text-[color:var(--color-brand-700)]";

  const activePill =
    "border-[color:var(--color-brand-600)] bg-[color:var(--color-brand-600)] text-white ring-2 ring-[color:var(--color-brand-600)]/15";

  return (
    <>
      <Section
        variant="dark"
        className="relative overflow-hidden border-b border-white/10 py-20 sm:py-24 lg:py-[6.5rem]"
        style={{ scrollMarginTop: SECTION_SCROLL_MARGIN_TOP }}
      >
        {/* Top-down yard (generated): SSP navy + cyan rim light—same composition language as premium logistics editorial refs. */}
        <div className="absolute inset-0">
          <div
            className="absolute inset-0 bg-[color:var(--color-company-ink)]"
            aria-hidden="true"
          />
          <div className="absolute inset-0">
            <HeroImage
              fill
              src={INSIGHTS_DEFAULT_OG_IMAGE}
              alt="Top-down view of shipping containers on a navy yard—abstract logistics composition for Insights."
              priority
              className="object-cover object-[62%_50%] opacity-[0.68] contrast-[1.05] sm:object-[58%_48%] sm:opacity-[0.72]"
              sizes="100vw"
            />
          </div>
          {/* Strong scrim only behind type (left); ease off to the right so volumes/shadows read photoreal, not “line art”. */}
          <div
            className="absolute inset-0"
            aria-hidden="true"
            style={{
              background:
                "linear-gradient(105deg, rgba(7, 13, 20, 0.96) 0%, rgba(7, 13, 20, 0.78) 28%, rgba(7, 13, 20, 0.42) 48%, rgba(10, 17, 28, 0.14) 68%, rgba(10, 17, 28, 0.06) 100%)",
            }}
          />
          <div
            className="absolute inset-0"
            aria-hidden="true"
            style={{
              background:
                "radial-gradient(75% 55% at 100% 0%, var(--color-insights-hero-glow-brand), transparent 52%), radial-gradient(65% 50% at 0% 100%, var(--color-insights-hero-glow-ink), transparent 58%)",
            }}
          />
          <div
            className="absolute inset-x-0 bottom-0 h-20 bg-gradient-to-b from-transparent to-[color:var(--color-insights-hero-bottom-fade)]"
            aria-hidden="true"
          />
        </div>

        <div className="relative">
          <Container className="site-page-container">
            <motion.div initial="hidden" animate="show" variants={stagger} className="pb-4">
              <motion.div
                variants={fadeUp}
                transition={{ duration: reduceMotion ? 0 : 0.35, ease: "easeOut" }}
              >
                <SectionSignalEyebrow label="Insights" light />
              </motion.div>

              <motion.h1
                variants={fadeUp}
                transition={{ duration: reduceMotion ? 0 : 0.5, ease: "easeOut" }}
                className={cn(
                  "mt-4 max-w-xl font-semibold tracking-[-0.02em] text-balance text-white sm:max-w-2xl lg:max-w-[40rem]",
                  "text-[2.15rem] leading-[1.08] sm:text-[2.55rem] lg:text-[3rem]",
                )}
              >
                Market Intelligence for Freight Leaders.
              </motion.h1>

              <motion.p
                variants={fadeUp}
                transition={{ duration: reduceMotion ? 0 : 0.45, ease: "easeOut" }}
                className="mt-5 max-w-[52ch] text-[15px] leading-[1.75] font-normal text-white/78 sm:text-[15.5px]"
              >
                Analysis, updates, and operating perspectives from the SSP team. Explore practical
                guidance on freight execution, cross-border strategy, network planning, and supply
                chain resilience.
              </motion.p>

              <motion.div
                variants={fadeUp}
                transition={{ duration: reduceMotion ? 0 : 0.45, ease: "easeOut" }}
                className="mt-6"
              >
                <button
                  type="button"
                  onClick={() => scrollToId("insights")}
                  className={cn(
                    "inline-flex h-11 items-center justify-center gap-2 rounded-xl px-5 text-sm font-semibold",
                    "cursor-pointer border border-[color:var(--color-brand-600)] bg-[linear-gradient(180deg,var(--color-brand-500),var(--color-brand-600)_54%,var(--color-brand-700))] text-white shadow-[var(--shadow-action-primary)] transition hover:-translate-y-[2px] hover:brightness-[1.04]",
                    "focus-ring-surface",
                  )}
                >
                  Explore latest insights <ArrowRight className="h-4 w-4" />
                </button>
              </motion.div>
            </motion.div>
          </Container>
        </div>
      </Section>

      <Section
        id="insights"
        variant="light"
        className="relative overflow-hidden"
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
              "radial-gradient(900px 420px at 80% 0%, rgba(15,23,42,0.03), transparent 55%), radial-gradient(900px 420px at 10% 10%, rgba(15,23,42,0.025), transparent 55%)",
          }}
        />
        <Container className="site-page-container relative">
          <div className="flex flex-col gap-2 sm:flex-row sm:items-end sm:justify-between">
            <div>
              <SectionSignalEyebrow label="Editorial Feed" />
              <h2 className="text-[1.6rem] font-semibold tracking-tight text-[color:var(--color-text-light)] sm:text-[1.95rem] lg:text-[2.2rem]">
                Latest Insights
              </h2>
              <p className="mt-1 max-w-2xl text-sm text-[color:var(--color-muted-light)]">
                Decision-grade insight across operations, service design, freight markets, and
                cross-border execution.
              </p>
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
                    placeholder="Search articles (e.g., cross-border, LTL, compliance)…"
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

                <div className="sm:w-44">
                  <Select
                    value={query.categorySlug || ""}
                    onChange={(v) => {
                      const picked = categories.find((c) => c.slug === v) ?? null;
                      onPickCategory(picked);
                    }}
                    options={categorySelectOptions}
                    placeholder={catLoading ? "Loading…" : "All categories"}
                    disabled={catLoading}
                    className="w-full cursor-pointer"
                    buttonClassName={FILTER_SELECT_BUTTON_CLASS}
                    menuClassName={FILTER_SELECT_MENU_CLASS}
                  />
                </div>

                <div className="sm:w-44">
                  <Select
                    value={query.sortBy}
                    onChange={(v) => onChangeSort(v)}
                    options={SORT_OPTIONS.filter(
                      (o) => o.value !== "relevance" || showRelevanceOption,
                    )}
                    placeholder="Sort"
                    className="w-full cursor-pointer"
                    buttonClassName={FILTER_SELECT_BUTTON_CLASS}
                    menuClassName={FILTER_SELECT_MENU_CLASS}
                  />
                </div>
              </div>

              <div className="flex flex-wrap items-center justify-between gap-3">
                <div className="text-xs font-medium text-[color:var(--color-subtle-light)]">
                  {loading ? (
                    <span className="inline-flex items-center gap-1.5">
                      <Loader2 className="h-3.5 w-3.5 animate-spin" />
                      Searching…
                    </span>
                  ) : error ? (
                    <span className="text-[color:var(--color-muted-light)]">
                      Unable to load results
                    </span>
                  ) : (
                    <span>
                      <span className="font-bold text-[color:var(--color-text-light)]">
                        {meta?.total ?? items.length}
                      </span>{" "}
                      result{(meta?.total ?? items.length) === 1 ? "" : "s"} found
                    </span>
                  )}
                </div>

                {hasFilters ? (
                  <button
                    type="button"
                    onClick={clearAll}
                    className="cursor-pointer rounded-lg px-3 py-1.5 text-xs font-semibold text-[color:var(--color-brand-600)] transition-colors hover:bg-[color:var(--color-brand-50)]"
                  >
                    Clear all
                  </button>
                ) : (
                  <span className="text-xs text-[color:var(--color-subtle-light)]">
                    Tip: try searching "cross-border"
                  </span>
                )}
              </div>
            </div>
          </div>

          <div className="mt-10 pb-16 sm:mt-12 sm:pb-20">
            <div className="grid grid-cols-1 gap-6 lg:grid-cols-12">
              <div className="lg:col-span-9">
                <div
                  ref={resultsRef}
                  className="rounded-[28px] border border-[color:var(--color-border-light)]/80 bg-white/88 p-3 shadow-[0_16px_44px_rgba(12,23,38,0.08)] backdrop-blur-[1px] sm:p-4"
                >
                  <div className="flex items-center justify-between">
                    <h2 className="text-sm font-semibold tracking-[0.01em] text-[color:var(--color-text-light)]">
                      Latest Insights
                    </h2>
                    <div className="text-xs font-medium text-[color:var(--color-subtle-light)]">
                      Page {meta?.page ?? 1} of {meta?.totalPages ?? 1}
                    </div>
                  </div>

                  {error ? (
                    <div className="mt-4 rounded-2xl border border-[color:var(--color-border-light)] bg-[color:var(--color-surface-1-light)] p-4 text-sm text-[color:var(--color-text-light)]">
                      <div className="font-medium">Couldn’t load posts.</div>
                      <div className="mt-1 text-[color:var(--color-muted-light)]">{error}</div>
                      <button
                        type="button"
                        onClick={() =>
                          runFetch({}, { fetchCats: false, replaceUrl: false, scroll: false })
                        }
                        className="mt-3 cursor-pointer rounded-md border border-[color:var(--color-border-light)] bg-[color:var(--color-surface-1-light)] px-3 py-2 text-xs text-[color:var(--color-text-light)] hover:bg-[color:var(--color-surface-0-light)]"
                      >
                        Retry
                      </button>
                    </div>
                  ) : null}

                  <div className="mt-5 grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-3">
                    {loading ? (
                      <>
                        <SkeletonCard />
                        <SkeletonCard />
                        <SkeletonCard />
                        <SkeletonCard />
                      </>
                    ) : error && !items.length ? null : items.length ? (
                      items.map((p) => (
                        <Link
                          key={p.id}
                          href={insightPath(p.slug)}
                          className="group cursor-pointer rounded-2xl border border-[color:var(--color-border-light)]/80 bg-white p-3 shadow-[0_1px_0_rgba(12,23,38,0.03)] transition hover:-translate-y-[2px] hover:shadow-[0_12px_30px_rgba(12,23,38,0.12)]"
                        >
                          <div className="relative aspect-[16/10] w-full overflow-hidden rounded-xl border border-[color:var(--color-border-light)] bg-[color:var(--color-surface-1-light)]">
                            {p.coverImage?.url ? (
                              <CardImage
                                src={p.coverImage.url}
                                alt={p.coverImage.alt || p.title}
                                fill
                                className="object-cover transition duration-300 group-hover:scale-[1.02]"
                                sizes="(max-width: 768px) 100vw, 420px"
                              />
                            ) : (
                              <div className="absolute inset-0 bg-[linear-gradient(to_bottom_right,var(--color-brand-50),var(--color-surface-0-light),var(--color-surface-1-light))]" />
                            )}
                          </div>

                          <div className="mt-3">
                            <div className="flex flex-wrap gap-2">
                              {(p.categories ?? []).slice(0, 2).map((c) => (
                                <span
                                  key={c.id}
                                  className="rounded-full border border-[color:var(--color-border-light)] bg-[color:var(--color-surface-1-light)] px-2 py-0.5 text-[10px] text-[color:var(--color-muted-light)]"
                                >
                                  {c.name}
                                </span>
                              ))}
                            </div>

                            <h3 className="mt-2 line-clamp-2 text-[14px] leading-[1.35] font-semibold text-[color:var(--color-text-light)]">
                              {p.title}
                            </h3>

                            {p.excerpt ? (
                              <p className="mt-1 line-clamp-2 text-xs text-[color:var(--color-muted-light)]">
                                {p.excerpt}
                              </p>
                            ) : null}

                            <div className="mt-3 flex items-center justify-between text-[11px] text-[color:var(--color-subtle-light)]">
                              <span className="inline-flex items-center gap-1">
                                <Calendar className="h-3.5 w-3.5" />
                                {fmtDate(p.publishedAt)}
                              </span>
                              <span className="inline-flex items-center gap-1">
                                <Clock className="h-3.5 w-3.5" />
                                {p.readTimeMins ?? 5} min
                              </span>
                            </div>

                            <div className="mt-3 inline-flex items-center gap-2 text-xs font-medium text-[color:var(--color-text-light)]">
                              Read more
                              <ArrowRight className="h-4 w-4 transition group-hover:translate-x-0.5" />
                            </div>
                          </div>
                        </Link>
                      ))
                    ) : !error ? (
                      <div className="col-span-full rounded-2xl border border-[color:var(--color-border-light)] bg-[linear-gradient(180deg,#ffffff_0%,#f7f9fc_100%)] p-7 text-center">
                        <div className="text-sm font-semibold tracking-[0.01em] text-[color:var(--color-text-light)]">
                          No insights matched this filter set.
                        </div>
                        <div className="mx-auto mt-1 max-w-[50ch] text-xs text-[color:var(--color-muted-light)]">
                          Try a different keyword, or reset filters to browse everything.
                        </div>
                        <button
                          type="button"
                          onClick={clearAll}
                          className="mt-4 cursor-pointer rounded-lg border border-[color:var(--color-border-light)] bg-white px-3.5 py-2 text-xs font-semibold text-[color:var(--color-text-light)] transition hover:bg-[color:var(--color-surface-0-light)]"
                        >
                          Reset filters
                        </button>
                      </div>
                    ) : null}
                  </div>

                  <div className="mt-8 flex justify-center">
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
                            { fetchCats: false, scroll: true, replaceUrl: true },
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
                          {meta?.page ?? 1}
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
                            { fetchCats: false, scroll: true, replaceUrl: true },
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
                </div>
              </div>

              <div className="lg:col-span-3">
                <div className="sticky top-24 space-y-4">
                  <div className="rounded-3xl border border-[color:var(--color-border-light)]/80 bg-white/90 p-4 shadow-[0_10px_28px_rgba(12,23,38,0.07)]">
                    <div className="flex items-center justify-between">
                      <h3 className="text-sm font-semibold text-[color:var(--color-text-light)]">
                        Categories
                      </h3>
                      <span className="text-[11px] text-[color:var(--color-subtle-light)]">
                        {catLoading ? "Updating…" : `${categories.length}`}
                      </span>
                    </div>

                    <div className="mt-3 flex flex-wrap gap-2">
                      <button
                        type="button"
                        onClick={() => onPickCategory(null)}
                        aria-pressed={!query.categorySlug && !query.categoryId}
                        className={cn(
                          basePill,
                          !query.categorySlug && !query.categoryId ? activePill : inactivePill,
                        )}
                      >
                        All
                      </button>

                      {categories.map((c) => {
                        const active =
                          (!!query.categorySlug && c.slug === query.categorySlug) ||
                          (!!query.categoryId && c.id === query.categoryId);

                        return (
                          <button
                            key={c.id}
                            type="button"
                            onClick={() => onPickCategory(c)}
                            aria-pressed={active}
                            className={cn(basePill, active ? activePill : inactivePill)}
                          >
                            {c.name}

                            {typeof c.postCount === "number" && (
                              <span
                                className={cn(
                                  "ml-2 text-[10px]",
                                  active
                                    ? "text-white/75"
                                    : "text-[color:var(--color-muted-light)]",
                                )}
                              >
                                {c.postCount}
                              </span>
                            )}
                          </button>
                        );
                      })}
                    </div>
                  </div>

                  <div className="rounded-3xl border border-[color:var(--color-border-light)]/80 bg-white/90 p-4 shadow-[0_10px_28px_rgba(12,23,38,0.07)]">
                    <h3 className="text-sm font-semibold text-[color:var(--color-text-light)]">
                      Recent
                    </h3>
                    <div className="mt-3 space-y-3">
                      {recentItems?.map((p) => (
                        <Link
                          key={p.id}
                          href={insightPath(p.slug)}
                          className="block cursor-pointer rounded-2xl border border-[color:var(--color-border-light)]/80 bg-white p-3 transition hover:bg-[color:var(--color-surface-0-light)]"
                        >
                          <div className="line-clamp-2 text-xs font-semibold text-[color:var(--color-text-light)]">
                            {p.title}
                          </div>
                          <div className="mt-2 flex items-center justify-between text-[11px] text-[color:var(--color-subtle-light)]">
                            <span>{fmtDate(p.publishedAt)}</span>
                            <span>{p.readTimeMins ?? 5} min</span>
                          </div>
                        </Link>
                      ))}
                    </div>
                  </div>

                  <div
                    className="group relative overflow-hidden rounded-3xl p-5 sm:p-6"
                    style={{
                      backgroundColor: "var(--color-insights-sidebar-cta-bg)",
                      boxShadow: "var(--shadow-insights-sidebar-cta)",
                    }}
                  >
                    <div
                      aria-hidden="true"
                      className="pointer-events-none absolute inset-0 rounded-3xl"
                      style={{
                        background:
                          "radial-gradient(ellipse at 15% 0%, var(--color-insights-sidebar-cta-glow) 0%, transparent 55%)",
                      }}
                    />
                    <div
                      className="absolute top-0 right-0 left-0 h-[2px] rounded-t-3xl"
                      style={{
                        background:
                          "linear-gradient(90deg, var(--color-brand-500) 0%, rgba(215,25,32,0.15) 60%, transparent 100%)",
                      }}
                    />

                    <div className="relative">
                      <h3 className="text-sm font-bold text-white">Plan with SSP Specialists</h3>
                      <p className="mt-2 text-xs leading-[1.6] text-[rgba(255,255,255,0.7)]">
                        Connect with our team to map a resilient, cost-aware freight strategy
                        aligned to your service, compliance, and growth objectives.
                      </p>
                      <div className="mt-4 flex flex-col gap-2 sm:flex-row">
                        <Link
                          href="/quote"
                          onClick={() =>
                            trackCtaClick({
                              ctaId: "request_quote",
                              location: "insights_sidebar_cta",
                              destination: "/quote",
                              label: "Request a quote",
                            })
                          }
                          className={cn(
                            "inline-flex h-9 items-center justify-center gap-2 rounded-md px-4 text-xs font-semibold",
                            "border border-[color:var(--color-brand-600)] bg-[linear-gradient(180deg,var(--color-brand-600),var(--color-brand-700))] text-white shadow-[0_8px_20px_rgba(215,25,32,0.25)] transition hover:-translate-y-[2px] hover:shadow-[0_12px_28px_rgba(215,25,32,0.32)]",
                            "focus-ring-surface",
                          )}
                        >
                          Request a quote
                        </Link>
                        <Link
                          href="/contact"
                          onClick={() =>
                            trackCtaClick({
                              ctaId: "contact_us",
                              location: "insights_sidebar_cta",
                              destination: "/contact",
                              label: "Contact us",
                            })
                          }
                          className={cn(
                            "inline-flex h-9 items-center justify-center gap-2 rounded-md px-4 text-xs font-semibold",
                            "border border-[rgba(255,255,255,0.22)] bg-[rgba(255,255,255,0.10)] text-[color:var(--color-muted-strong)] shadow-sm backdrop-blur transition hover:-translate-y-[2px] hover:border-[rgba(255,255,255,0.38)] hover:text-white",
                            "focus-ring-surface",
                          )}
                        >
                          Contact us
                        </Link>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </Container>
      </Section>
    </>
  );
}
