"use client";

import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import { motion } from "framer-motion";
import { cn } from "@/lib/cn";
import { Container } from "@/app/(site)/components/layout/Container";
import { FAQ_CATEGORIES } from "@/config/faqs";
import { FOCUS_RING_LIGHT } from "./faqStyles";
import { FaqAccordionItem } from "./FaqAccordionItem";

export function FaqContent({ reduceMotion }: { reduceMotion: boolean }) {
  const [activeCategoryId, setActiveCategoryId] = useState(FAQ_CATEGORIES[0].id);
  const [openMap, setOpenMap] = useState<Record<string, number | null>>({});
  const sectionRefs = useRef<Record<string, HTMLElement | null>>({});
  const latestEntriesRef = useRef<
    Record<string, { isIntersecting: boolean; intersectionRatio: number; top: number }>
  >({});
  const [observerVersion, setObserverVersion] = useState(0);

  const allSectionsReady = useMemo(
    () => FAQ_CATEGORIES.every((category) => Boolean(sectionRefs.current[category.id])),
    [observerVersion],
  );

  const setRef = useCallback(
    (id: string) => (el: HTMLElement | null) => {
      sectionRefs.current[id] = el;
      setObserverVersion((prev) => prev + 1);
    },
    [],
  );

  const scrollToCategory = useCallback(
    (id: string) => {
      if (typeof window !== "undefined") {
        window.history.replaceState(null, "", `#${id}`);
      }
      const el = sectionRefs.current[id];
      if (!el) return;
      el.scrollIntoView({ behavior: reduceMotion ? "auto" : "smooth", block: "start" });
    },
    [reduceMotion],
  );

  const onCategorySelect = useCallback(
    (id: string) => {
      scrollToCategory(id);
    },
    [scrollToCategory],
  );

  useEffect(() => {
    if (!allSectionsReady) return;

    const updateActiveCategory = () => {
      const bestVisible = FAQ_CATEGORIES.map((category) => ({
        id: category.id,
        entry: latestEntriesRef.current[category.id],
      }))
        .filter((item) => item.entry?.isIntersecting)
        .sort((a, b) => {
          const ratioDelta = (b.entry?.intersectionRatio ?? 0) - (a.entry?.intersectionRatio ?? 0);
          if (Math.abs(ratioDelta) > 0.001) return ratioDelta;
          return Math.abs(a.entry?.top ?? 0) - Math.abs(b.entry?.top ?? 0);
        })[0];

      if (bestVisible) {
        setActiveCategoryId(bestVisible.id);
        return;
      }

      const threshold = 160;
      const sections = FAQ_CATEGORIES.map((category) => {
        const el = sectionRefs.current[category.id];
        return el
          ? { id: category.id, top: el.getBoundingClientRect().top }
          : null;
      }).filter((item): item is { id: string; top: number } => Boolean(item));

      const nearestPassed = [...sections]
        .filter((section) => section.top <= threshold)
        .sort((a, b) => b.top - a.top)[0];

      if (nearestPassed) {
        setActiveCategoryId(nearestPassed.id);
        return;
      }

      const nearestUpcoming = sections.sort((a, b) => a.top - b.top)[0];
      if (nearestUpcoming) setActiveCategoryId(nearestUpcoming.id);
    };

    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          const id = (entry.target as HTMLElement).id;
          latestEntriesRef.current[id] = {
            isIntersecting: entry.isIntersecting,
            intersectionRatio: entry.intersectionRatio,
            top: entry.boundingClientRect.top,
          };
        }
        updateActiveCategory();
      },
      { rootMargin: "-20% 0px -60% 0px", threshold: [0, 0.15, 0.3, 0.5, 0.75, 1] },
    );

    for (const category of FAQ_CATEGORIES) {
      const el = sectionRefs.current[category.id];
      if (!el) continue;
      observer.observe(el);
    }

    updateActiveCategory();

    return () => observer.disconnect();
  }, [allSectionsReady]);

  useEffect(() => {
    if (typeof window === "undefined" || !allSectionsReady) return;
    const id = window.location.hash.replace("#", "");
    if (!id || !FAQ_CATEGORIES.some((category) => category.id === id)) return;
    setActiveCategoryId(id);
    const el = sectionRefs.current[id];
    if (!el) return;
    el.scrollIntoView({ behavior: "auto", block: "start" });
  }, [allSectionsReady]);

  const toggleItem = (categoryId: string, idx: number) => {
    setOpenMap((prev) => {
      const nextValue = prev[categoryId] === idx ? null : idx;
      return {
        ...prev,
        [categoryId]: nextValue,
      };
    });
  };

  return (
    <section
      aria-label="Frequently asked questions"
      className="relative border-b border-[color:var(--color-border-light-soft)] py-20 sm:py-24"
      style={{
        background:
          "linear-gradient(180deg, var(--color-surface-1-light) 0%, var(--color-surface-0-light) 40%, var(--color-ssp-cloud-100) 100%)",
      }}
    >
      <div className="pointer-events-none absolute inset-0" aria-hidden>
        <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-[color:var(--color-ssp-cyan-500)]/20 to-transparent" />
        <div
          className="absolute left-0 top-0 h-[min(18rem,44vh)] w-full max-w-3xl opacity-[0.025]"
          style={{
            backgroundImage:
              "linear-gradient(to right, var(--color-company-companies-grid-line) 1px, transparent 1px), linear-gradient(to bottom, var(--color-company-companies-grid-line) 1px, transparent 1px)",
            backgroundSize: "60px 60px",
            maskImage: "radial-gradient(115% 98% at 0% 0%, black 0%, rgba(0,0,0,0.92) 62%, transparent 100%)",
            WebkitMaskImage:
              "radial-gradient(115% 98% at 0% 0%, black 0%, rgba(0,0,0,0.92) 62%, transparent 100%)",
          }}
        />
      </div>
      <Container className="site-page-container">
        <div className="lg:grid lg:grid-cols-12 lg:gap-14">
          <nav className="hidden lg:col-span-3 lg:block" aria-label="FAQ categories">
            <div className="sticky top-24 rounded-2xl border border-[color:var(--color-border-light-soft)]/70 bg-white/58 p-4 backdrop-blur-[1.5px]">
              <p className="mb-4 text-[10.5px] font-semibold uppercase tracking-[0.14em] text-[color:var(--color-subtle)]">
                Categories
              </p>
              <ul className="flex flex-col gap-1.5">
                {FAQ_CATEGORIES.map((category) => (
                  <li key={category.id}>
                    <a
                      href={`#${category.id}`}
                      onClick={(event) => {
                        event.preventDefault();
                        onCategorySelect(category.id);
                      }}
                      aria-current={activeCategoryId === category.id ? "true" : undefined}
                      className={cn(
                        "block rounded-xl border px-3.5 py-3 text-[12.5px] font-medium leading-[1.34] tracking-[-0.004em] transition-all duration-150",
                        FOCUS_RING_LIGHT,
                        activeCategoryId === category.id
                          ? "border-[color:var(--color-border-light)] bg-white text-[color:var(--color-text-strong)] shadow-[0_12px_24px_-18px_rgba(2,6,23,0.45)]"
                          : "border-transparent text-[color:var(--color-muted)] hover:border-[color:var(--color-border-light)]/80 hover:bg-white/74 hover:text-[color:var(--color-text-strong)]",
                      )}
                    >
                      {category.label}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          </nav>

          <div className="mb-8 lg:hidden">
            <p className="mb-3 text-[10.5px] font-semibold uppercase tracking-[0.14em] text-[color:var(--color-subtle)]">
              Browse by category
            </p>
            <div className="-mx-1 overflow-x-auto pb-1">
              <div className="flex min-w-max gap-2 px-1">
                {FAQ_CATEGORIES.map((category) => (
                  <a
                    key={category.id}
                    href={`#${category.id}`}
                    onClick={(event) => {
                      event.preventDefault();
                      onCategorySelect(category.id);
                    }}
                    aria-current={activeCategoryId === category.id ? "true" : undefined}
                    className={cn(
                      "rounded-full border px-4 py-2.5 text-left text-[12.5px] font-medium leading-[1.34] tracking-[-0.004em] whitespace-nowrap transition-all duration-150",
                      FOCUS_RING_LIGHT,
                      activeCategoryId === category.id
                        ? "border-[color:var(--color-menu-accent)]/28 bg-[color:var(--color-nav-hover)] text-[color:var(--color-text-strong)]"
                        : "border-[color:var(--color-menu-border)] bg-white/84 text-[color:var(--color-muted)] hover:text-[color:var(--color-text-strong)]",
                    )}
                  >
                    {category.label}
                  </a>
                ))}
              </div>
            </div>
          </div>

          <div className="lg:col-span-9">
            {FAQ_CATEGORIES.map((category) => (
              <motion.div
                key={category.id}
                ref={setRef(category.id)}
                id={category.id}
                className="scroll-mt-24 [&+&]:mt-16"
                initial={reduceMotion ? false : { opacity: 1, y: 10 }}
                whileInView={reduceMotion ? undefined : { opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.15 }}
                transition={{ duration: reduceMotion ? 0 : 0.3, ease: "easeOut" }}
              >
                <div className="mb-2.5 flex items-center gap-2" aria-hidden>
                  <span className="h-1.5 w-1.5 rounded-full bg-[color:var(--color-menu-accent)]/70" />
                  <span className="h-px w-10 bg-gradient-to-r from-[color:var(--color-menu-accent)]/55 to-transparent" />
                </div>
                <h2 className="mb-4 text-[1.03rem] font-semibold leading-[1.25] tracking-[0.01em] text-[color:var(--color-text-strong)] sm:text-[1.1rem]">
                  {category.label}
                </h2>
                <div className="flex flex-col gap-2">
                  {category.items.map((item, idx) => (
                    <FaqAccordionItem
                      key={`${category.id}-${idx}`}
                      question={item.question}
                      answer={item.answer}
                      isOpen={openMap[category.id] === idx}
                      onToggle={() => toggleItem(category.id, idx)}
                      reduceMotion={reduceMotion}
                      panelId={`faq-dedicated-${category.id}-panel-${idx}`}
                      triggerId={`faq-dedicated-${category.id}-trigger-${idx}`}
                    />
                  ))}
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </Container>
    </section>
  );
}
