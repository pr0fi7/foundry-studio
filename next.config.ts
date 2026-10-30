import type { NextConfig } from "next";
const config: NextConfig = {
  // A fully static site, served by GitHub Pages.
  output: "export",
  trailingSlash: true,
  // Set by the deploy workflow; empty when the site runs on its own domain.
  basePath: process.env.PAGES_BASE_PATH || "",
  poweredByHeader: false,
};
export default config;
