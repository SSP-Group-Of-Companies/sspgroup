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
    qualities: [70, 74, 75, 84, 90],
  },

  async redirects() {
    return [
      {
        source: "/who-we-are",
        destination: "/about-us",
        permanent: true,
      },
      {
        source: "/company/about-ssp",
        destination: "/about-us",
        permanent: true,
      },
      {
        source: "/about-us/faqs",
        destination: "/company/faqs",
        permanent: true,
      },
      {
        source: "/company/mission-vision-values",
        destination: "/about-us#mission-vision-values",
        permanent: true,
      },
      {
        source: "/company/coverage-network",
        destination: "/about-us#coverage-network",
        permanent: true,
      },
      {
        source: "/company/our-companies",
        destination: "/about-us#our-companies",
        permanent: true,
      },

      // Legacy service URLs from old site
      {
        source: "/service/road-freight",
        destination: "/services/truckload",
        permanent: true,
      },
      {
        source: "/service/train-freight",
        destination: "/services/cross-border",
        permanent: true,
      },
      {
        source: "/service/ocean-freight",
        destination: "/services/cross-border",
        permanent: true,
      },
    ];
  },
};

export default nextConfig;
