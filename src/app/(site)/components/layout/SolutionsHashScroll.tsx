"use client";

import React from "react";
import { usePathname } from "next/navigation";

const HOME_PATH = "/";
const ABOUT_US_PATH = "/about-us";
const ABOUT_FAQS_PATH = "/company/faqs";
const HOME_TOP_HASH = "#top";
const ABOUT_HERO_HASH = "#about-hero";
const HASH_TARGETS = {
  "#solutions": "solutions",
  "#industries": "industries",
} as const;

function normalizePath(path: string) {
  if (!path) return "/";
  return path.endsWith("/") && path !== "/" ? path.slice(0, -1) : path;
}

function normalizeHash(hash: string) {
  return hash.toLowerCase();
}

function getMappedHashTargetId(hash: string) {
  const normalizedHash = normalizeHash(hash) as keyof typeof HASH_TARGETS;
  return HASH_TARGETS[normalizedHash];
}

function getRawHashId(hash: string) {
  if (!hash || hash === "#") return null;
  const raw = hash.startsWith("#") ? hash.slice(1) : hash;
  if (!raw) return null;
  try {
    return decodeURIComponent(raw);
  } catch {
    return raw;
  }
}

function getHashTargetId(hash: string) {
  // First honor explicit mapped anchors (homepage sections).
  const mapped = getMappedHashTargetId(hash);
  if (mapped) return mapped;

  // Fallback: if hash points to an existing id (service pages), use it.
  const rawId = getRawHashId(hash);
  if (!rawId) return null;
  const target = document.getElementById(rawId);
  return target ? rawId : null;
}

function isHomeTopLink(pathname: string, hash: string) {
  const normalizedPath = normalizePath(pathname);
  const normalizedHash = normalizeHash(hash);
  return (
    normalizedPath === HOME_PATH && (normalizedHash === "" || normalizedHash === HOME_TOP_HASH)
  );
}

function isAboutUsTopLink(pathname: string, hash: string) {
  const normalizedPath = normalizePath(pathname);
  const normalizedHash = normalizeHash(hash);
  return (
    normalizedPath === ABOUT_US_PATH &&
    (normalizedHash === "" || normalizedHash === ABOUT_HERO_HASH)
  );
}

function isFaqsTopLink(pathname: string, hash: string) {
  const normalizedPath = normalizePath(pathname);
  const normalizedHash = normalizeHash(hash);
  return normalizedPath === ABOUT_FAQS_PATH && normalizedHash === "";
}

function isFaqsPath(pathname: string) {
  return normalizePath(pathname) === ABOUT_FAQS_PATH;
}

function prefersReducedMotion(): boolean {
  // Guard for older browsers + SSR safety (though this is client-only)
  if (typeof window === "undefined" || !window.matchMedia) return false;
  return window.matchMedia("(prefers-reduced-motion: reduce)").matches;
}

function resolveScrollBehavior(preferred: ScrollBehavior): ScrollBehavior {
  // If user prefers reduced motion, never animate scroll.
  if (preferred === "smooth" && prefersReducedMotion()) return "auto";
  return preferred;
}

function getSiteHeaderOffset() {
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

function scrollToElementById(id: string, behavior: ScrollBehavior) {
  const target = document.getElementById(id);
  if (!target) return false;

  const serviceShell = target.closest?.("[data-service-shell]") as HTMLElement | null;
  if (serviceShell) {
    const style = getComputedStyle(serviceShell);
    const headerH = parseFloat(style.getPropertyValue("--service-header-h")) || 0;
    const subnavH = parseFloat(style.getPropertyValue("--service-subnav-h")) || 0;
    const top = window.scrollY + target.getBoundingClientRect().top - (headerH + subnavH);
    window.scrollTo({ top: Math.max(0, top), left: 0, behavior });
    return true;
  }

  // Locked/company pages need a deterministic offset under sticky header across soft navigations.
  const stickyHeaderOffset = getSiteHeaderOffset();
  const offset = stickyHeaderOffset + 8;
  const top = window.scrollY + target.getBoundingClientRect().top - offset;
  window.scrollTo({ top: Math.max(0, top), left: 0, behavior });
  return true;
}

function scrollToHomeTop(behavior: ScrollBehavior) {
  window.scrollTo({ top: 0, left: 0, behavior });
}

export function SolutionsHashScroll() {
  const pathname = usePathname();
  const isFaqPage = isFaqsPath(pathname ?? "");

  // Same-page hash and initial load: scroll to hash target (homepage #solutions/#industries, about #locations-network, etc.)
  React.useEffect(() => {
    let correctionTimeoutA: number | null = null;
    let correctionTimeoutB: number | null = null;

    const scrollWithCorrection = (targetId: string, behavior: ScrollBehavior) => {
      const resolved = resolveScrollBehavior(behavior);
      scrollToElementById(targetId, resolved);

      // Re-apply offset after layout settles (images/fonts/hydration), using instant correction.
      correctionTimeoutA = window.setTimeout(() => {
        scrollToElementById(targetId, "auto");
      }, 160);
      correctionTimeoutB = window.setTimeout(() => {
        scrollToElementById(targetId, "auto");
      }, 380);
    };

    const handleHashRoute = (behavior: ScrollBehavior) => {
      if (isFaqPage) return;
      const targetId = getHashTargetId(window.location.hash);
      if (!targetId) return;

      // Double RAF ensures layout is stable before scrolling (e.g. about page sections in DOM).
      requestAnimationFrame(() => {
        requestAnimationFrame(() => {
          scrollWithCorrection(targetId, behavior);
        });
      });
    };

    const onHashChange = () => handleHashRoute("smooth");

    const onClick = (event: MouseEvent) => {
      const target = event.target as HTMLElement | null;
      const anchor = target?.closest("a[href]") as HTMLAnchorElement | null;
      if (!anchor) return;

      let url: URL;
      try {
        url = new URL(anchor.href, window.location.href);
      } catch {
        return;
      }

      if (url.origin !== window.location.origin) return;

      const currentPath = normalizePath(window.location.pathname);
      const linkPath = normalizePath(url.pathname || "/");
      if (currentPath !== linkPath) return;

      const hashTargetId = getHashTargetId(url.hash);
      if (hashTargetId && !isFaqPage) {
        // Same-page hash click: scroll (home #solutions, about #locations-network, etc.).
        event.preventDefault();
        scrollWithCorrection(hashTargetId, "smooth");
        window.history.replaceState(null, "", `${window.location.pathname}${window.location.search}${url.hash}`);
        return;
      }

      if (isHomeTopLink(url.pathname, url.hash)) {
        // Clicking the logo/home on the homepage should always return to hero top.
        event.preventDefault();
        scrollToHomeTop(resolveScrollBehavior("smooth"));
        if (window.location.hash) {
          window.history.replaceState(null, "", window.location.pathname + window.location.search);
        }
        return;
      }

      if (isAboutUsTopLink(url.pathname, url.hash)) {
        // On the about page, clicking "About us" in the nav should scroll to the top.
        event.preventDefault();
        scrollToHomeTop(resolveScrollBehavior("smooth"));
        if (window.location.hash) {
          window.history.replaceState(null, "", window.location.pathname + window.location.search);
        }
        return;
      }

      if (isFaqsTopLink(url.pathname, url.hash)) {
        // On the FAQ page, clicking "FAQs" in the nav should scroll to the top.
        event.preventDefault();
        scrollToHomeTop(resolveScrollBehavior("smooth"));
        if (window.location.hash) {
          window.history.replaceState(null, "", window.location.pathname + window.location.search);
        }
      }
    };

    // Initial route: don't animate to avoid jank on load.
    handleHashRoute("auto");

    window.addEventListener("hashchange", onHashChange);
    document.addEventListener("click", onClick, true);

    return () => {
      if (correctionTimeoutA) window.clearTimeout(correctionTimeoutA);
      if (correctionTimeoutB) window.clearTimeout(correctionTimeoutB);
      window.removeEventListener("hashchange", onHashChange);
      document.removeEventListener("click", onClick, true);
    };
  }, [isFaqPage]);

  // After client navigation: scroll to hash target OR scroll to top.
  // Next.js soft nav may not fire hashchange; pathname change ensures we run.
  const prevPathnameRef = React.useRef<string | null>(null);
  React.useEffect(() => {
    const currentPath = normalizePath(pathname ?? "");
    const prevPath = prevPathnameRef.current;
    prevPathnameRef.current = currentPath;
    if (prevPath === null || prevPath === currentPath) return;
    if (typeof window === "undefined") return;

    // If URL has a hash, try to scroll to the section target.
    if (window.location.hash && !isFaqPage) {
      const targetId = getHashTargetId(window.location.hash);
      if (targetId) {
        let correctionTimeoutA: number | null = null;
        let correctionTimeoutB: number | null = null;
        const id = requestAnimationFrame(() => {
          requestAnimationFrame(() => {
            const resolved = resolveScrollBehavior("smooth");
            scrollToElementById(targetId, resolved);
            correctionTimeoutA = window.setTimeout(() => {
              scrollToElementById(targetId, "auto");
            }, 160);
            correctionTimeoutB = window.setTimeout(() => {
              scrollToElementById(targetId, "auto");
            }, 380);
          });
        });
        return () => {
          cancelAnimationFrame(id);
          if (correctionTimeoutA) window.clearTimeout(correctionTimeoutA);
          if (correctionTimeoutB) window.clearTimeout(correctionTimeoutB);
        };
      }
    }

    // No hash (or unrecognized hash): ensure scroll to top on page change.
    window.scrollTo({ top: 0, left: 0, behavior: "auto" });
  }, [isFaqPage, pathname]);

  return null;
}
