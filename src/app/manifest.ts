import type { MetadataRoute } from "next";

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: "SSP Group",
    short_name: "SSP",
    description:
      "Reliable freight transportation across North America for complex, time-critical, and compliance-sensitive shipments.",
    start_url: "/",
    scope: "/",
    display: "standalone",
    orientation: "portrait",
    background_color: "#f5f7fa",
    theme_color: "#0b3e5e",
    categories: ["business", "logistics", "transportation"],
    icons: [
      {
        src: "/_optimized/brand/favicon.png?v=20260401",
        sizes: "any",
        type: "image/png",
        purpose: "any",
      },
      {
        src: "/_optimized/brand/favicon.png?v=20260401",
        sizes: "any",
        type: "image/png",
        purpose: "maskable",
      },
    ],
  };
}
