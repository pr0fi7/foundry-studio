# Digital product workshop

A complete, original agency website built from `ROBO_FACTORY_CODEX_BUILD_SPEC.md`. The working brand is configured once in `src/content/site-config.ts`. The older `../atomiztech-clone` snapshot is unchanged; none of its visual assets or code are used here.

## Run locally

Requires Node.js 22 or newer and npm. From this directory:

```sh
npm ci
npm run dev -- --port 4310
```

Open **http://127.0.0.1:4310**. You can also double-click `Start preview.command`. Stop with Ctrl+C. The development server binds to loopback. For a production preview of the static export:

```sh
npm run build   # writes the static site to out/
npm run start   # serves out/ on http://127.0.0.1:4310
```

The first build needs access to Google Fonts. `next/font/google` downloads and bundles Bricolage Grotesque, DM Sans, and IBM Plex Mono; visitors receive fonts from this application, without a Google Fonts runtime request. Subsequent builds can reuse Next’s font cache.

## What is implemented

- Home: an original SVG miniature factory that assembles itself and runs a self-playing Build/Fix demonstration, a marquee, the three service offers with their priced first steps, the four-station production line, recent work, a short FAQ, and a call to action.
- Three services, each sold with a small fixed first step: **Product Rescue** (technical diagnosis → repair sprint), **MVP Factory** (discovery → prototype → milestone build), and **Automation & Integration** (workflow audit → build & connect). A services overview compares them.
- Main navigation links straight to the three services, Work, and Pricing.
- Work filtering and three case studies, each linking to the live site: Qote (built from scratch), Pam by Harmix (repairs, new infrastructure, SOC 2 and GDPR support), and Euroformat (core operations moved onto AI workflows, including elevator BOM creation).
- Pricing (one price table per service), contact, FAQ, privacy and terms templates, and branded 404 handling.
- The retired pages (`/process`, `/about`, and the old `/services/build`, `/services/fix`, `/services/ai-automation`, `/services/cloud-security`, `/services/support`) redirect from `next.config.ts`. Old `?intent=fix|build|ai-automation` contact links still preselect the matching service.
- Shared responsive navigation, native mobile disclosure with Escape/focus handling, breadcrumbs, footer, active navigation, metadata, sitemap, and robots.
- Native accessible FAQ disclosures. Most pages are prerendered; contact configuration is checked on the server at request time.
- A Zod-validated contact endpoint and Resend delivery adapter with explicit accepted/error/unconfigured states.

## Edit content

| File                             | Purpose                                                                                      |
| -------------------------------- | -------------------------------------------------------------------------------------------- |
| `src/content/site-config.ts`     | Working brand, confirmed URLs/contact details, ownership/price approvals, legal placeholders |
| `src/content/services.ts`        | The three services: buyer, signals, priced steps, deliverables, and FAQ picks                |
| `src/content/projects.ts`        | Attributed case facts, metrics, source URLs, and related services                            |
| `src/content/pricing.ts`         | Price formatting and the “what changes the price” factors                                    |
| `src/content/faq.ts`             | Shared FAQ, picked by id on each page                                                        |
| `src/components/legal-page.tsx`  | Draft legal template sections                                                                |
| `src/app/globals.css`            | Palette, typography, layout, responsive rules, motion fallback                               |
| `src/components/factory-art.tsx` | Original, editable vector factory illustration                                               |

All public English copy is grouped by content domain, with reusable page templates. Extra languages are not implemented.

Case studies live in `src/content/projects.ts`: `role` and `scope` describe our part, and `url` is the live site linked from each card and case page. Metrics that start with a number count up on scroll; labels such as “SOC 2” stay static.

Prices are a starting hypothesis to test, not verified market pricing: €400–€900 for a technical diagnosis, €2,000–€6,000 for a repair sprint, and MVP builds from €8,000. They are labelled “indicative” on the site and live on each step in `src/content/services.ts`. Steps without a number (discovery, prototype, workflow audit, automation builds, ongoing care) show their “agreed upfront” note instead. Set `showIndicativePrices: false` in `site-config.ts` to hide every number at once. No testimonials, biographies, or client logos are included.

## Booking calls

There is no contact form: the site is static. The contact page offers a 30-minute call through Calendly. The scheduler loads only after the visitor clicks **Show available times**, so Calendly sets no cookies until then; a plain link to Calendly works without JavaScript. Change the booking link in `bookingUrl` in `src/content/site-config.ts`. Set `NEXT_PUBLIC_CONTACT_EMAIL` (or `publicEmail`) to also show an email address.

## Visual and motion choices

The scene is handcrafted SVG and CSS, using the supplied palette. It renders without WebGL, model downloads, or JavaScript; the static fallback shows the finished product on the shipping tile.

- **Hero.** Headline lines rise out of a mask, and a highlighter follows the demonstration (build → fix → “make it work”). The factory assembles itself, then loops Build and Fix until the visitor picks one. Build drafts a wireframe and flies the interface parts in. Fix shows a glitching screen, bugs, smoke and an alarm, then patches them one by one. Both runs pass the product through the arm, the test arch and onto the shipping tile, with a live health/progress meter and log. Pointer movement tilts the card and gives the layers a slight parallax. Loops pause offscreen and when the tab is hidden. The meter and log are hidden below 520px.
- **From problem to production** (`src/components/production-line.tsx`). The hero shows the factory from the outside; this section shows the screens inside it. On desktop the section pins, and scrolling moves four station panels sideways. Each panel tilts into place as it reaches the centre, and a package travels along the rail beneath. Each station plays its own sequence: Inspect scans code and flags faulty lines, Engineer snaps interface blocks into a blueprint, Verify turns the test run green and fills a coverage ring, and Launch runs the deploy pipeline to LIVE with uptime bars. Phones, tablets and short screens get the same panels stacked vertically, each playing as it scrolls into view. Without JavaScript or with reduced motion, every panel shows its finished state.
- **Site-wide** (`src/components/motion.tsx`). Staggered reveals, heading wipes, metric count-ups, card spotlights, light parallax, a scroll progress bar, and the header shadow. Only content that starts below the fold is hidden before it animates in, so above-the-fold text is never transparent.

Reduced motion turns off all animation and the tilt; GSAP is not loaded. Without JavaScript, every section renders in its final state.

`--cobalt-text: #3B50CF` is a darker derivative for small accent text. `--danger-text: #AE3636` improves small error-text contrast. The original cobalt remains the main accent; white on its button fill meets AA. Decorative object shading is derived from the same palette. Original art and third-party sources are documented in `ASSET_MANIFEST.md`.

## Checks

```sh
npm run format:check
npm run typecheck
npm run lint
npm run build
npx playwright install chromium --only-shell
npm run test:e2e
```

The browser suite uses port 4310, reusing a server there or serving `out/`. Build first. It checks all 14 content routes at 320, 375, 390, 768, 1024, and 1440 pixels; internal links; 404; console exceptions; filters; pricing; mobile keyboard navigation; Calendly loading only on request; reduced motion; JavaScript-disabled content; and WCAG AA rules with axe. It also saves screenshots under `preview/`.

Automated accessibility tests do not replace a complete manual assistive-technology audit.

## Deployment

The site is a static export (`output: "export"` in `next.config.ts`) hosted on **GitHub Pages** from `github.com/pr0fi7/foundry-studio`. Every push to `main` runs `.github/workflows/deploy.yml`: typecheck, lint, build, then publish `out/` to Pages. The custom domain `foundry-studio.eu` is set in the repository’s **Settings → Pages**; the workflow reads the base path from Pages, so the same build also works on `pr0fi7.github.io/foundry-studio` before the domain is live.

DNS for `foundry-studio.eu` (managed at Squarespace → Domains → DNS settings):

| Type  | Host  | Value                                                                                      |
| ----- | ----- | ------------------------------------------------------------------------------------------ |
| A     | `@`   | `185.199.108.153`, `185.199.109.153`, `185.199.110.153`, `185.199.111.153`                 |
| AAAA  | `@`   | `2606:50c0:8000::153`, `2606:50c0:8001::153`, `2606:50c0:8002::153`, `2606:50c0:8003::153` |
| CNAME | `www` | `pr0fi7.github.io`                                                                         |

Remove Squarespace’s default records for `@` and `www` first, and never add a wildcard (`*`) record. Once GitHub has issued the certificate, tick **Enforce HTTPS** in Settings → Pages.

Static hosting cannot set response headers, run redirects, or run server code, so none are used.
