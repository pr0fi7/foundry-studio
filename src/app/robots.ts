import type { MetadataRoute } from "next";
import { siteConfig } from "@/content/site-config";
export const dynamic = "force-static";
export default function robots(): MetadataRoute.Robots {
  return siteConfig.siteUrl
    ? {
        rules: { userAgent: "*", allow: "/" },
        sitemap: `${siteConfig.siteUrl}/sitemap.xml`,
      }
    : { rules: { userAgent: "*", disallow: "/" } };
}
