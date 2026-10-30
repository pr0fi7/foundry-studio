function publicUrl(value: string | undefined) {
  if (!value) return "";
  try {
    const url = new URL(value);
    return ["http:", "https:"].includes(url.protocol)
      ? url.toString().replace(/\/$/, "")
      : "";
  } catch {
    return "";
  }
}
export const siteConfig = {
  brandName: "Foundry Studio", // Working name. Edit only here.
  tagline: "We build it. We fix it. We make it work.",
  siteUrl:
    publicUrl(process.env.NEXT_PUBLIC_SITE_URL) || "https://foundry-studio.eu",
  publicEmail: process.env.NEXT_PUBLIC_CONTACT_EMAIL || "",
  bookingUrl:
    publicUrl(process.env.NEXT_PUBLIC_BOOKING_URL) ||
    "https://calendly.com/mark-shevchenko/30min",
  // Shows the indicative prices from content/services.ts. Set to false to
  // replace every price with its "agreed upfront" note.
  showIndicativePrices: true,
  socialLinks: [] as { label: string; url: string }[],
  legal: {
    status: "REQUIRES LEGAL REVIEW",
    entity: "[Legal business name]",
    address: "[Registered address]",
    jurisdiction: "[Governing jurisdiction]",
    retention: "[Approved enquiry retention period]",
    privacyContact: "[Privacy contact]",
  },
};
export const navigation = [
  { href: "/services/product-rescue", label: "Product Rescue" },
  { href: "/services/mvp-factory", label: "MVP Factory" },
  { href: "/services/automation", label: "Automation" },
  { href: "/work", label: "Work" },
  { href: "/pricing", label: "Pricing" },
];
export const routes = [
  "/",
  "/services",
  "/services/product-rescue",
  "/services/mvp-factory",
  "/services/automation",
  "/work",
  "/work/qote",
  "/work/pam",
  "/work/euroformat",
  "/pricing",
  "/contact",
  "/faq",
  "/privacy",
  "/terms",
];
