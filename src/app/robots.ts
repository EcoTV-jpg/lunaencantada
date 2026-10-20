import type { MetadataRoute } from "next";
import { siteConfig } from "@/data/site";

/** Open to all crawlers, including Googlebot, Bingbot and OAI-SearchBot. */
export default function robots(): MetadataRoute.Robots {
  return {
    rules: [{ userAgent: "*", allow: "/" }],
    sitemap: `${siteConfig.url}/sitemap.xml`,
    host: siteConfig.url,
  };
}
