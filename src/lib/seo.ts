import type { Metadata } from "next";
import { siteConfig } from "@/content/site-config";
export function pageMetadata(
  title: string,
  description: string,
  path: string,
): Metadata {
  // Pages are exported as folders, so their public URLs end in a slash.
  const url = siteConfig.siteUrl + (path === "/" ? "/" : `${path}/`);
  return {
    title,
    description,
    ...(siteConfig.siteUrl ? { alternates: { canonical: url } } : {}),
    openGraph: {
      title: `${title} | ${siteConfig.brandName}`,
      description,
      type: "website",
      ...(siteConfig.siteUrl ? { url } : {}),
    },
    twitter: { card: "summary_large_image", title, description },
  };
}
