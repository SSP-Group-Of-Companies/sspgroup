import type { NextConfig } from "next";

const imageDomains =
  process.env.NEXT_IMAGE_DOMAINS?.split(",")
    .map((d) => d.trim())
    .filter(Boolean) ?? [];

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      ...imageDomains.map((hostname) => ({
        protocol: "https" as const,
        hostname,
      })),
      { protocol: "https" as const, hostname: "img.youtube.com" },
    ],
    qualities: [70, 74, 75, 78, 84, 88, 90],
  },
};

export default nextConfig;
