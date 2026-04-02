export type VideoItem = Readonly<{
  id: string;
  youtubeId: string;
  title: string;
  description: string;
  category:
    | "Flatbed Operations"
    | "Air & Ocean Visibility"
    | "Interstate Delivery"
    | "Specialized Handling"
    | "Operational Reel";
  featured?: boolean;
}>;

export const MEDIA_HERO_VIDEO: VideoItem = {
  id: "hero_primary_video",
  youtubeId: "mQv-1GA-HYo",
  title: "SSP Group Fleet + Service Overview",
  description: "A full-spectrum look at SSP fleet capability, execution standards, and service breadth.",
  category: "Operational Reel",
  featured: true,
};

export const SSP_VIDEOS: readonly VideoItem[] = [
  {
    id: "v1",
    youtubeId: "X0YDh2Wfzxo",
    title: "Over-Dimensional Flatbed Load",
    description: "Heavy-haul flatbed execution for over-dimensional freight.",
    category: "Flatbed Operations",
    featured: true,
  },
  {
    id: "v2",
    youtubeId: "3u_JYvOxchg",
    title: "Air & Ocean Freight",
    description: "Intermodal visibility across air and ocean freight lanes.",
    category: "Air & Ocean Visibility",
  },
  {
    id: "v3",
    youtubeId: "PJXMyL4rCbc",
    title: "High-Value Vehicle Transport",
    description: "Specialized handling and secure transport for high-value vehicles.",
    category: "Specialized Handling",
  },
  {
    id: "v4",
    youtubeId: "IeeJhbGAkkQ",
    title: "Oversized Load Execution",
    description: "Route planning, permits, and escort-ready oversized load execution.",
    category: "Operational Reel",
  },
  {
    id: "v5",
    youtubeId: "FiwFSsFNGJc",
    title: "Customer Care",
    description: "Service responsiveness and communication standards in motion.",
    category: "Operational Reel",
  },
  {
    id: "v6",
    youtubeId: "sFrqsuiF0eI",
    title: "Truckload & LTL Coverage",
    description: "Flexible truckload and LTL capacity tailored to shipment needs.",
    category: "Interstate Delivery",
  },
  {
    id: "v7",
    youtubeId: "-v73DWWmbH0",
    title: "110-Foot RGN Jeep & Stinger",
    description: "Extended RGN + stinger setup for complex long-haul transport.",
    category: "Specialized Handling",
  },
  {
    id: "v8",
    youtubeId: "tJ3cEu4tZGU",
    title: "Event Logistics Support",
    description: "Event support logistics with precise timing and coordination.",
    category: "Operational Reel",
  },
  {
    id: "v9",
    youtubeId: "0qj4GFs6248",
    title: "San Francisco Operations",
    description: "West-coast operating highlights from SSP field activity.",
    category: "Operational Reel",
  },
  {
    id: "v10",
    youtubeId: "q4m44PY8zLY",
    title: "Dry Vans",
    description: "Dry van service reliability across regional and long-haul lanes.",
    category: "Interstate Delivery",
  },
  {
    id: "v11",
    youtubeId: "_fhzL-YsFqs",
    title: "Hazardous Materials",
    description: "Safety-first HazMat handling with compliant operating controls.",
    category: "Operational Reel",
  },
  {
    id: "v12",
    youtubeId: "T8W_xOws1m8",
    title: "End-to-End Shipping Logistics",
    description: "End-to-end shipment logistics across diverse freight profiles.",
    category: "Operational Reel",
  },
  {
    id: "v13",
    youtubeId: "Y2NTMExNqIU",
    title: "Ocean Freight",
    description: "Ocean freight movement with coordinated inland execution.",
    category: "Air & Ocean Visibility",
  },
  {
    id: "v14",
    youtubeId: "hgM0yi4gZjI",
    title: "Asset-Based Logistics",
    description: "Asset-based transportation model built for accountability.",
    category: "Operational Reel",
  },
  {
    id: "v15",
    youtubeId: "XpqCOyO1jgA",
    title: "Why Shippers Choose SSP",
    description: "A concise overview of why shippers choose SSP.",
    category: "Operational Reel",
  },
] as const;

export const MEDIA_LIBRARY_VIDEOS: readonly VideoItem[] = [
  MEDIA_HERO_VIDEO,
  ...SSP_VIDEOS,
] as const;

export const SSP_YOUTUBE_CHANNEL = "https://www.youtube.com/@SSPGroupofCompanies" as const;
