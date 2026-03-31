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
    background_color: "#070a12",
    theme_color: "#070a12",
    categories: ["business", "logistics", "transportation"],
    icons: [
      {
        src: "/_optimized/brand/favicon.png",
        sizes: "192x192",
        type: "image/png",
        purpose: "any",
      },
      {
        src: "/_optimized/brand/SSPlogo.png",
        sizes: "512x512",
        type: "image/png",
        purpose: "maskable",
      },
    ],
  };
}
