export type VideoCategory = "flatbed-heavy" | "specialized" | "freight-modes" | "global" | "operations" | "company";

export type VideoItem = Readonly<{
  id: string;
  youtubeId: string;
  title: string;
  category: VideoCategory;
  featured?: boolean;
}>;

export const VIDEO_CATEGORIES: readonly { id: VideoCategory; label: string }[] = [
  { id: "flatbed-heavy", label: "Flatbed & Heavy Haul" },
  { id: "specialized", label: "Specialized Transport" },
  { id: "freight-modes", label: "Freight Modes" },
  { id: "global", label: "Global Freight" },
  { id: "operations", label: "Operations" },
  { id: "company", label: "Company" },
] as const;

export const SSP_VIDEOS: readonly VideoItem[] = [
  { id: "v1", youtubeId: "dQw4w9WgXcQ", title: "Flatbed — Over-Dimensional Load", category: "flatbed-heavy", featured: true },
  { id: "v2", youtubeId: "dQw4w9WgXcQ", title: "110 Feet Long RGN Jeep & Stinger", category: "flatbed-heavy" },
  { id: "v3", youtubeId: "dQw4w9WgXcQ", title: "Oversized Load Transport", category: "flatbed-heavy" },
  { id: "v4", youtubeId: "dQw4w9WgXcQ", title: "Exotic Car Hauling", category: "specialized" },
  { id: "v5", youtubeId: "dQw4w9WgXcQ", title: "Specialized Vehicle Transport", category: "specialized" },
  { id: "v6", youtubeId: "dQw4w9WgXcQ", title: "Truckload & LTL Operations", category: "freight-modes" },
  { id: "v7", youtubeId: "dQw4w9WgXcQ", title: "Dry Van Shipping", category: "freight-modes" },
  { id: "v8", youtubeId: "dQw4w9WgXcQ", title: "Hazardous Materials Transport", category: "freight-modes" },
  { id: "v9", youtubeId: "dQw4w9WgXcQ", title: "Air and Ocean Freight", category: "global", featured: true },
  { id: "v10", youtubeId: "dQw4w9WgXcQ", title: "Ocean Freight Operations", category: "global" },
  { id: "v11", youtubeId: "dQw4w9WgXcQ", title: "San Francisco Operations", category: "operations" },
  { id: "v12", youtubeId: "dQw4w9WgXcQ", title: "Asset-Based Logistics", category: "operations" },
  { id: "v13", youtubeId: "dQw4w9WgXcQ", title: "Customer Care at SSP", category: "company" },
  { id: "v14", youtubeId: "dQw4w9WgXcQ", title: "Choose SSP Group", category: "company", featured: true },
  { id: "v15", youtubeId: "dQw4w9WgXcQ", title: "SSP Boxing Event", category: "company" },
] as const;

export const SSP_YOUTUBE_CHANNEL = "https://www.youtube.com/@SSPTruckLine" as const;
