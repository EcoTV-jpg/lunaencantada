import type { MetadataRoute } from "next";
import { legalPages, siteConfig } from "@/data/site";

/** One-page site: the homepage plus any legal pages that have been published. No #anchors. */
export default function sitemap(): MetadataRoute.Sitemap {
  return [
    { url: `${siteConfig.url}/`, changeFrequency: "monthly", priority: 1 },
    ...legalPages
      .filter((page) => page.path)
      .map((page) => ({ url: `${siteConfig.url}${page.path}`, changeFrequency: "yearly" as const, priority: 0.3 })),
  ];
}
