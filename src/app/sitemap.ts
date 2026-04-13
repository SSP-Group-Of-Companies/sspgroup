import type { MetadataRoute } from "next";
import { getIndustrySlugs } from "@/config/industryPages";
import { getSeoLocationPriority, getSeoLocationSlugs } from "@/config/seoLocations";
import { getSeoLanePriority, getSeoLaneSlugs } from "@/config/seoLanes";
import { SITE_URL } from "@/lib/seo/site";
import connectDB from "@/lib/utils/connectDB";
import { BlogPostModel } from "@/mongoose/models/BlogPost";
import { JobPostingModel } from "@/mongoose/models/JobPosting";
import { EBlogStatus } from "@/types/blogPost.types";
import { EJobPostingStatus } from "@/types/jobPosting.types";

const siteUrl = SITE_URL;
const SITEMAP_QUERY_MAX_TIME_MS = 8000;
const SITEMAP_FETCH_RETRY_COUNT = 2;
const SITEMAP_FETCH_RETRY_DELAY_MS = 500;

function toAbsolute(path: string) {
  return new URL(path, siteUrl).toString();
}

async function getBlogRoutes() {
  const posts = await BlogPostModel.find({ status: EBlogStatus.PUBLISHED })
    .sort({ publishedAt: -1, _id: -1 })
    .select({ slug: 1 })
    .maxTimeMS(SITEMAP_QUERY_MAX_TIME_MS)
    .lean();

  return posts
    .map((post: any) => post?.slug)
    .filter((slug: unknown): slug is string => typeof slug === "string" && slug.length > 0)
    .map((slug) => `/insights/${encodeURIComponent(slug)}`);
}

async function getCareersRoutes() {
  const jobs = await JobPostingModel.find({ status: EJobPostingStatus.PUBLISHED })
    .sort({ publishedAt: -1, _id: -1 })
    .select({ slug: 1 })
    .maxTimeMS(SITEMAP_QUERY_MAX_TIME_MS)
    .lean();

  return jobs
    .map((job: any) => job?.slug)
    .filter((slug: unknown): slug is string => typeof slug === "string" && slug.length > 0)
    .map((slug) => `/careers/${encodeURIComponent(slug)}`);
}

function wait(ms: number) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

async function getDynamicSitemapRoutesWithRetry() {
  if (!process.env.MONGO_URI) {
    return { blogRoutes: [] as string[], careersRoutes: [] as string[] };
  }

  let lastError: unknown = null;
  for (let attempt = 0; attempt <= SITEMAP_FETCH_RETRY_COUNT; attempt += 1) {
    try {
      await connectDB();
      const [blogRoutes, careersRoutes] = await Promise.all([getBlogRoutes(), getCareersRoutes()]);
      return { blogRoutes, careersRoutes };
    } catch (error) {
      lastError = error;
      if (attempt < SITEMAP_FETCH_RETRY_COUNT) {
        await wait(SITEMAP_FETCH_RETRY_DELAY_MS * (attempt + 1));
      }
    }
  }

  console.warn(
    "Sitemap dynamic routes fallback: unable to load blog/career slugs after retries.",
    lastError,
  );
  return { blogRoutes: [] as string[], careersRoutes: [] as string[] };
}

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const staticRoutes = [
    "/",
    "/solutions",
    "/industries",
    "/locations",
    "/lanes",
    "/about-us",
    "/company/our-history",
    "/company/safety-compliance",
    "/company/media",
    "/company/faqs",
    "/careers",
    "/insights",
    "/contact",
    "/quote",
    "/privacy",
    "/terms",
    "/cookies",
    "/cookie-preferences",
    "/accessibility",
  ];

  const solutionRoutes = [
    "/solutions/core-freight-modes",
    "/solutions/truckload",
    "/solutions/dry-van",
    "/solutions/flatbed",
    "/solutions/step-deck",
    "/solutions/rgn-heavy-haul",
    "/solutions/conestoga-roll-tite",
    "/solutions/ltl",
    "/solutions/specialized-critical-freight",
    "/solutions/expedited",
    "/solutions/specialized-vehicles",
    "/solutions/hazmat",
    "/solutions/temperature-controlled",
    "/solutions/cross-border",
    "/solutions/cross-border/canada-usa",
    "/solutions/cross-border/mexico",
    "/solutions/cross-border/air-freight",
    "/solutions/cross-border/ocean-freight",
    "/solutions/managed-logistics",
    "/solutions/warehousing-distribution",
    "/solutions/managed-capacity",
    "/solutions/dedicated-contract",
    "/solutions/project-freight",
  ];
  const industryRoutes = getIndustrySlugs().map((slug) => `/industries/${slug}`);
  const locationRoutes = getSeoLocationSlugs().map((slug) => `/locations/${slug}`);
  const laneRoutes = getSeoLaneSlugs().map((slug) => `/lanes/${slug}`);
  const { blogRoutes, careersRoutes } = await getDynamicSitemapRoutesWithRetry();

  const getPriority = (path: string) => {
    if (path === "/") return 1;
    if (path.startsWith("/solutions/")) return 0.9;
    if (path.startsWith("/locations/")) {
      const slug = path.replace("/locations/", "");
      const rank = getSeoLocationPriority(slug);
      return rank === "P1" ? 0.9 : rank === "P2" ? 0.8 : 0.7;
    }
    if (path.startsWith("/lanes/")) {
      const slug = path.replace("/lanes/", "");
      const rank = getSeoLanePriority(slug);
      return rank === "P1" ? 0.9 : rank === "P2" ? 0.8 : 0.7;
    }
    if (path.startsWith("/industries/")) return 0.82;
    return 0.7;
  };

  return [
    ...staticRoutes,
    ...solutionRoutes,
    ...industryRoutes,
    ...locationRoutes,
    ...laneRoutes,
    ...blogRoutes,
    ...careersRoutes,
  ].map((path) => ({
    url: toAbsolute(path),
    changeFrequency:
      path === "/" ? "daily" : path === "/insights" || path.startsWith("/insights/") ? "weekly" : "monthly",
    priority: getPriority(path),
  }));
}
