import { test, expect } from "@playwright/test";
import AxeBuilder from "@axe-core/playwright";
import { routes } from "../src/content/site-config";
for (const width of [320, 375, 390, 768, 1024, 1440]) {
  test(`all pages render and fit at ${width}px`, async ({ page }) => {
    await page.setViewportSize({ width, height: 900 });
    const errors: string[] = [];
    page.on("pageerror", (error) => errors.push(error.message));
    const titles = new Set<string>();
    for (const route of routes) {
      const response = await page.goto(route);
      expect(response?.status(), route).toBe(200);
      await expect(page.locator("h1"), route).toHaveCount(1);
      await expect(page.locator("h1"), route).toBeVisible();
      const title = await page.title();
      expect(title, route).not.toBe("");
      expect(titles.has(title), `unique title for ${route}`).toBe(false);
      titles.add(title);
      const dimensions = await page.evaluate(() => ({
        width: document.documentElement.clientWidth,
        scroll: document.documentElement.scrollWidth,
      }));
      expect(dimensions.scroll, route).toBeLessThanOrEqual(
        dimensions.width + 1,
      );
      expect(
        await page.locator('a[href=""], a[href="#"]').count(),
        `no empty links on ${route}`,
      ).toBe(0);
    }
    expect(errors).toEqual([]);
  });
}
test("all internal links resolve; unknown pages return a branded 404", async ({
  page,
  request,
}) => {
  const paths = new Set<string>();
  for (const route of routes) {
    await page.goto(route);
    for (const href of await page
      .locator('a[href^="/"]')
      .evaluateAll((links) =>
        links.map(
          (link) => (link as HTMLAnchorElement).getAttribute("href") || "",
        ),
      )) {
      paths.add(href.split(/[?#]/)[0]);
    }
  }
  for (const path of paths) {
    expect((await request.get(path)).status(), path).toBe(200);
  }
  const response = await page.goto("/this-blueprint-is-missing");
  expect(response?.status()).toBe(404);
  await expect(
    page.getByRole("heading", {
      name: "This page didn’t make it through the factory.",
    }),
  ).toBeVisible();
});
test("work filters, FAQ, pricing, and factory toggle work", async ({
  page,
}) => {
  await page.goto("/");
  await page.getByRole("button", { name: "Fix 02" }).click();
  await expect(page.getByRole("button", { name: "Fix 02" })).toHaveAttribute(
    "aria-pressed",
    "true",
  );
  await expect(page.getByText("INSPECTING & REPAIRING")).toBeVisible();
  await page.goto("/work");
  await page.getByRole("button", { name: "AI platforms", exact: true }).click();
  await expect(page.locator(".project-card")).toHaveCount(1);
  await expect(page.locator(".project-card h3")).toHaveText("Pam");
  await page.getByRole("button", { name: "All 03" }).click();
  await expect(page.locator(".project-card")).toHaveCount(3);
  await page.goto("/faq");
  await page.locator(".faq-list summary").first().press("Enter");
  await expect(page.locator(".faq-list details").first()).toHaveAttribute(
    "open",
    "",
  );
  await page.goto("/pricing");
  await expect(page.getByText("€400–€900").first()).toBeVisible();
});
test("hero next step follows the visitor's choice, not the demo", async ({
  page,
}) => {
  await page.goto("/");
  const actions = page.locator(".hero .actions");
  await expect(
    actions.getByRole("link", { name: "Book a free call" }),
  ).toHaveAttribute("href", /^\/contact/);
  await expect(page.locator(".hero-workshop")).toHaveAttribute(
    "data-mode",
    "fix",
    { timeout: 20_000 },
  );
  await expect(
    actions.getByRole("link", { name: "Compare the services" }),
  ).toBeVisible();
  await page.getByRole("button", { name: "Build 01" }).click();
  await expect(
    actions.getByRole("link", { name: "Start your MVP" }),
  ).toHaveAttribute("href", /^\/services\/mvp-factory/);
  await page.getByRole("button", { name: "Fix 02" }).click();
  await expect(
    actions.getByRole("link", { name: "Book a diagnosis" }),
  ).toHaveAttribute("href", /^\/services\/product-rescue/);
  await expect(actions.getByRole("link")).toHaveCount(2);
});
test("pricing rows stack on phones and stay one table on desktop", async ({
  page,
}) => {
  await page.setViewportSize({ width: 375, height: 812 });
  await page.goto("/pricing");
  const row = page.locator(".price-ladder tbody tr").first();
  const [step, price, note] = await Promise.all(
    [0, 1, 2].map((i) =>
      row
        .locator("th, td")
        .nth(i)
        .evaluate((el) => el.getBoundingClientRect().top),
    ),
  );
  expect(price).toBeGreaterThan(step);
  expect(note).toBeGreaterThan(price);
  await expect(page.locator(".price-ladder thead").first()).toHaveCSS(
    "position",
    "absolute",
  );
  await expect(page.getByRole("table").first()).toBeAttached();
  await page.setViewportSize({ width: 1024, height: 800 });
  await expect(row).toHaveCSS("display", "table-row");
});
test("every page shares the link preview image", async ({ page, request }) => {
  for (const route of routes) {
    await page.goto(route);
    const image = await page
      .locator('meta[property="og:image"]')
      .getAttribute("content");
    expect(image, route).toMatch(/\/og-image\.png$/);
  }
  const response = await request.get("/og-image.png");
  expect(response.status()).toBe(200);
  expect(response.headers()["content-type"]).toBe("image/png");
});
test("mobile menu opens with keyboard and returns focus on Escape", async ({
  page,
}) => {
  await page.setViewportSize({ width: 375, height: 812 });
  await page.goto("/");
  const toggle = page.locator(".mobile-menu summary");
  await toggle.focus();
  await toggle.press("Enter");
  await expect(
    page.getByRole("navigation", { name: "Mobile navigation" }),
  ).toBeVisible();
  await page
    .getByRole("navigation", { name: "Mobile navigation" })
    .getByRole("link", { name: "Product Rescue", exact: true })
    .focus();
  await page.keyboard.press("Escape");
  await expect(toggle).toBeFocused();
  await expect(page.locator(".mobile-menu")).not.toHaveAttribute("open", "");
  await toggle.press("Enter");
  await page
    .getByRole("navigation", { name: "Mobile navigation" })
    .getByRole("link", { name: "Work", exact: true })
    .click();
  await expect(page).toHaveURL("/work/");
  await expect(page.locator(".mobile-menu")).not.toHaveAttribute("open", "");
});
test("contact page loads Calendly only on request", async ({ page }) => {
  await page.goto("/contact");
  await expect(page.locator("iframe")).toHaveCount(0);
  await expect(
    page.getByRole("link", { name: /Open Calendly in a new tab/ }),
  ).toHaveAttribute("href", /^https:\/\/calendly\.com\//);
  await page.getByRole("button", { name: "Show available times" }).click();
  await expect(page.locator("iframe.booking-frame")).toHaveAttribute(
    "src",
    /^https:\/\/calendly\.com\//,
  );
});
test("reduced motion and JavaScript-disabled layouts preserve content", async ({
  browser,
}) => {
  const context = await browser.newContext({
    javaScriptEnabled: false,
    viewport: { width: 375, height: 812 },
    reducedMotion: "reduce",
  });
  const page = await context.newPage();
  await page.goto("/");
  await expect(page.locator("h1")).toBeVisible();
  await expect(page.locator(".factory-art").first()).toBeVisible();
  await page.locator(".mobile-menu summary").click();
  await expect(
    page.getByRole("navigation", { name: "Mobile navigation" }),
  ).toBeVisible();
  await page
    .getByRole("navigation", { name: "Mobile navigation" })
    .getByRole("link", { name: "Product Rescue", exact: true })
    .click();
  await expect(page.locator("h1")).toContainText("Keep the product");
  await context.close();
  const motionContext = await browser.newContext({ reducedMotion: "reduce" });
  const motionPage = await motionContext.newPage();
  await motionPage.goto("/");
  expect(
    await motionPage
      .locator(".robot-arm")
      .first()
      .evaluate((el) => getComputedStyle(el).animationName),
  ).toBe("none");
  await motionContext.close();
});
test("WCAG AA automated accessibility scan on every page", async ({ page }) => {
  for (const route of routes) {
    await page.goto(route);
    const result = await new AxeBuilder({ page })
      .withTags(["wcag2a", "wcag2aa", "wcag21a", "wcag21aa"])
      .analyze();
    expect(
      result.violations.map((v) => ({
        id: v.id,
        description: v.description,
        nodes: v.nodes.map((n) => n.target),
      })),
      route,
    ).toEqual([]);
  }
});
test("capture desktop and mobile presentation", async ({ page }) => {
  await page.setViewportSize({ width: 1440, height: 1000 });
  await page.goto("/");
  await page.screenshot({ path: "preview/home-desktop.png", fullPage: true });
  await page.screenshot({ path: "preview/home-hero.png" });
  await page.goto("/contact");
  await page.screenshot({
    path: "preview/contact-desktop.png",
    fullPage: true,
  });
  await page.setViewportSize({ width: 375, height: 812 });
  await page.goto("/");
  await page.screenshot({ path: "preview/home-mobile.png", fullPage: true });
  await page.goto("/services/product-rescue");
  await page.screenshot({ path: "preview/service-mobile.png", fullPage: true });
});
