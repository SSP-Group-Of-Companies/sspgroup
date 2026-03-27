/**
 * Shared industry page theme: background, accents, gradients, and focus utilities.
 * Ensures the entire industry page uses the hero theme (no navy on a green page).
 */

import type { IndustryHeroTheme } from "@/config/industryPages";

export const FOCUS_RING_DARK =
  "focus:outline-none focus-visible:ring-2 focus-visible:ring-white/40 focus-visible:ring-offset-2 focus-visible:ring-offset-transparent";

/** Theme-specific dark background (hero and dark sections) */
export const THEME_BG: Record<IndustryHeroTheme, string> = {
  green: "#133522",
  red: "#0d1218",
  blue: "#0c1929",
  slate: "#1a1f2e",
  amber: "#231a0d",
  steel: "#13263a",
  teal: "#0c242d",
};

/** Theme accent — used for value headline, kicker, section underlines, stats. Intentional per theme (no red on green). */
export const THEME_ACCENT: Record<IndustryHeroTheme, string> = {
  green: "#99cf78",
  red: "#9aa8b8",
  blue: "#60a5fa",
  slate: "#94a3b8",
  amber: "#fbbf24",
  steel: "#6f879d",
  teal: "#5fd5c8",
};

/** Light section background — subtle theme tint so the whole page feels themed */
export const THEME_LIGHT_BG: Record<IndustryHeroTheme, string> = {
  green: "#f3f8f1",
  red: "#eef2f6",
  blue: "#f0f4f9",
  slate: "#f2f3f5",
  amber: "#faf8f4",
  steel: "#eef4f8",
  teal: "#eef8f7",
};

/** Operational Proof background — slightly denser tint for evidence-focused section */
export const THEME_PROOF_BG: Record<IndustryHeroTheme, string> = {
  green: "#f6faf4",
  red: "#e8edf3",
  blue: "#f3f7fb",
  slate: "#f3f5f7",
  amber: "#f8f6f1",
  steel: "#edf4f8",
  teal: "#edf7f6",
};

/** Mode Fit background — cleaner companion tint to separate from Operational Proof */
export const THEME_MODEFIT_BG: Record<IndustryHeroTheme, string> = {
  green: "#e2ebdb",
  red: "#dde5ee",
  blue: "#dbe4ee",
  slate: "#dde2e9",
  amber: "#e5dece",
  steel: "#d9e4ee",
  teal: "#d8e8e6",
};

/** Radial gradient orbs for dark sections (e.g. How we support) — theme-tinted */
export function getThemeOrbs(theme: IndustryHeroTheme): { main: string; secondary: string } {
  switch (theme) {
    case "green":
      return { main: "rgba(153,207,120,0.09)", secondary: "rgba(74,124,58,0.06)" };
    case "red":
      return { main: "rgba(125,144,166,0.16)", secondary: "rgba(70,87,109,0.09)" };
    case "blue":
      return { main: "rgba(37,99,235,0.08)", secondary: "rgba(59,130,246,0.05)" };
    case "slate":
      return { main: "rgba(71,85,105,0.08)", secondary: "rgba(51,65,85,0.05)" };
    case "amber":
      return { main: "rgba(245,158,11,0.08)", secondary: "rgba(217,119,6,0.05)" };
    case "steel":
      return { main: "rgba(111,135,157,0.14)", secondary: "rgba(148,163,184,0.08)" };
    case "teal":
      return { main: "rgba(95,213,200,0.11)", secondary: "rgba(61,176,168,0.07)" };
    default:
      return { main: "rgba(220,38,38,0.08)", secondary: "rgba(185,28,28,0.05)" };
  }
}

/** Top bar gradient for step cards in How we support — theme-tinted */
export function getThemeBarGradient(theme: IndustryHeroTheme): string {
  switch (theme) {
    case "green":
      return "linear-gradient(90deg,#99cf78_0%,rgba(153,207,120,0.14)_70%,transparent_100%)";
    case "red":
      return "linear-gradient(90deg,#b3c1d1_0%,rgba(125,144,166,0.16)_70%,transparent_100%)";
    case "blue":
      return "linear-gradient(90deg,#3b82f6_0%,rgba(37,99,235,0.12)_70%,transparent_100%)";
    case "slate":
      return "linear-gradient(90deg,#64748b_0%,rgba(71,85,105,0.12)_70%,transparent_100%)";
    case "amber":
      return "linear-gradient(90deg,#f59e0b_0%,rgba(245,158,11,0.12)_70%,transparent_100%)";
    case "steel":
      return "linear-gradient(90deg,#89a0b5_0%,rgba(111,135,157,0.18)_70%,transparent_100%)";
    case "teal":
      return "linear-gradient(90deg,#5fd5c8_0%,rgba(95,213,200,0.16)_70%,transparent_100%)";
    default:
      return "linear-gradient(90deg,#ef4444_0%,rgba(220,38,38,0.12)_70%,transparent_100%)";
  }
}
