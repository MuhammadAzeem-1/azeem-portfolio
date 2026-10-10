import type { MetadataRoute } from "next";
import { portfolio } from "@/data/portfolio";
export default function sitemap(): MetadataRoute.Sitemap {
  if (!portfolio.siteUrl) return [];
  return [{ url: portfolio.siteUrl, changeFrequency: "monthly", priority: 1 }, ...portfolio.projects.map(p => ({ url: `${portfolio.siteUrl}/projects/${p.slug}`, changeFrequency: "monthly" as const, priority: 0.8 }))];
}
