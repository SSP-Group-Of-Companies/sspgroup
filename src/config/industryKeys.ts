export const INDUSTRY_KEYS = [
  "automotive",
  "manufacturing",
  "retail",
  "food",
  "construction",
  "steel-aluminum",
  "chemical-plastics",
] as const;

export type IndustryKey = (typeof INDUSTRY_KEYS)[number];
