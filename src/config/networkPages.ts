/**
 * Network coverage pages (freight by location, freight lanes) — hero copy
 * and route targets for the FAQ-style company hero.
 */

export const NETWORK_PAGE_ROUTES = {
  home: "/",
  locations: "/locations",
  lanes: "/lanes",
} as const;

export const LOCATIONS_HUB_HERO = {
  backLabel: "Home",
  backHref: "/",
  eyebrow: "Freight by location",
  title: "Where we operate across North America",
  description:
    "Key markets where SSP Group runs truckload, LTL, and cross-border programs with lane-level control and one accountable operations team.",
} as const;

export const LANES_HUB_HERO = {
  backLabel: "Home",
  backHref: "/",
  eyebrow: "Freight lanes",
  title: "Corridors we run with dedicated execution",
  description:
    "High-demand North America moves across Canada, the United States, and Mexico. Priority lanes are listed first to match the routes our teams scale every week.",
} as const;

export const LOCATION_DETAIL = {
  backLabel: "Freight by location",
  backHref: "/locations",
  heroEyebrow: "Market",
} as const;

export const LANE_DETAIL = {
  backLabel: "Freight lanes",
  backHref: "/lanes",
  heroEyebrow: "Lane",
} as const;

export const LOCATIONS_HUB_SEO = {
  title: "Freight by Location | SSP Group",
  description:
    "Explore SSP Group freight coverage by market across Canada, the United States, and Mexico—truckload, LTL, and cross-border execution.",
} as const;

export const LANES_HUB_SEO = {
  title: "Freight Lanes | SSP Group",
  description:
    "North America freight corridors served by SSP Group: truckload, LTL, and cross-border lanes across Canada, the U.S., and Mexico.",
} as const;
