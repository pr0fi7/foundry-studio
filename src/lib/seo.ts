import type { Metadata } from "next";
import { siteConfig } from "@/content/site-config";
export function pageMetadata(
  title: string,
  description: string,
  path: string,
): Metadata {
  // Pages are exported as folders, so their public URLs end in a slash.
  const url = siteConfig.siteUrl + (path === "/" ? "/" : `${path}/`);
  // Set on each page because a page's openGraph replaces the layout's whole.
  const image = {
    url: "/og-image.png",
    width: 1200,
    height: 630,
    alt: `${siteConfig.brandName}: ${siteConfig.tagline}`,
  };
  return {
    title,
    description,
    ...(siteConfig.siteUrl ? { alternates: { canonical: url } } : {}),
    openGraph: {
      title: `${title} | ${siteConfig.brandName}`,
      description,
      type: "website",
      ...(siteConfig.siteUrl ? { url } : {}),
      images: [image],
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
      images: [image],
    },
  };
}
