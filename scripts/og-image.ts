/**
 * Renders the link preview at public/og-image.png from the built site, so it
 * uses the real fonts, colours, and factory art. Run `npm run build`, serve
 * `out/` with `npm run start`, then `npm run og:image`. Re-run it whenever the
 * brand name or tagline in src/content/site-config.ts changes.
 */
import { chromium } from "@playwright/test";
import { siteConfig } from "../src/content/site-config";

const browser = await chromium.launch();
const page = await browser.newPage({
  viewport: { width: 1200, height: 630 },
  reducedMotion: "reduce",
});
await page.goto("http://127.0.0.1:4310/");
await page.evaluate(
  ({ brand, lines, host }) => {
    const art = document.querySelector(".hero-workshop > .factory-art");
    document.body.innerHTML = `
      <div style="position:fixed;inset:0;display:grid;grid-template-columns:1.12fr 1fr;align-items:center;gap:24px;padding:56px;background:var(--canvas);overflow:hidden">
        <div style="align-self:stretch;display:flex;flex-direction:column;justify-content:space-between">
          <div style="font-family:var(--font-display);font-size:30px;font-weight:600;color:var(--ink)">${brand}</div>
          <div style="font-family:var(--font-display);font-size:70px;line-height:1.02;font-weight:600;letter-spacing:-.03em;color:var(--ink)">
            ${lines.map((line) => `<div>${line}</div>`).join("")}
          </div>
          <div style="font-family:var(--font-mono);font-size:20px;color:var(--cobalt-text)">${host}</div>
        </div>
        <div id="og-art" style="width:100%"></div>
      </div>`;
    if (art) document.querySelector("#og-art")?.append(art);
    window.scrollTo(0, 0);
  },
  {
    brand: siteConfig.brandName,
    lines: siteConfig.tagline.match(/[^.]+\./g) ?? [siteConfig.tagline],
    host: new URL(siteConfig.siteUrl).hostname,
  },
);
await page.evaluate(() => document.fonts.ready);
await page.screenshot({ path: "public/og-image.png" });
await browser.close();
