import type { MetadataRoute } from "next";
import { siteConfig, routes } from "@/content/site-config";
export const dynamic = "force-static";
export default function sitemap(): MetadataRoute.Sitemap {
  return siteConfig.siteUrl
    ? routes.map((path) => ({
        url: siteConfig.siteUrl + (path === "/" ? "/" : `${path}/`),
      }))
    : [];
}
