# Asset manifest

## Original site artwork

| Asset                                                                                     | Location                                                | Origin / rights                                                                         |
| ----------------------------------------------------------------------------------------- | ------------------------------------------------------- | --------------------------------------------------------------------------------------- |
| Factory floor, conveyor, robot arm, test arch, app device, shipping tile, companion robot | `src/components/factory-art.tsx`                        | Original SVG geometry authored for this implementation; no third-party model or texture |
| Qote, Pam, and Euroformat conceptual visuals                                              | `src/components/product-art.tsx`, `src/app/globals.css` | Original HTML/CSS product illustrations, not screenshots or client logos                |
| Working geometric brand mark                                                              | `src/components/site-header.tsx`                        | Original CSS geometry                                                                   |
| Favicon                                                                                   | `public/icon.svg`, `src/app/icon.svg`                   | Original SVG geometry                                                                   |
| 404 robot and blueprint                                                                   | `src/app/not-found.tsx`, `src/app/globals.css`          | Original CSS geometry                                                                   |
| QA screenshots                                                                            | `preview/`                                              | Browser captures of this implementation                                                 |

No Atomiz CSS, artwork, typography files, branding, screenshots, animation code, or downloaded model packs are used. No stock or hotlinked production imagery is included. The deliberate 2.5D implementation does not require WebGL or an external rendering service.

## Third-party fonts and functional icons

| Resource            | Source                                                                                                                   | Licence / delivery                                                                                                                         |
| ------------------- | ------------------------------------------------------------------------------------------------------------------------ | ------------------------------------------------------------------------------------------------------------------------------------------ |
| Bricolage Grotesque | https://fonts.google.com/specimen/Bricolage+Grotesque · https://github.com/google/fonts/tree/main/ofl/bricolagegrotesque | SIL Open Font License 1.1; locally bundled by `next/font/google`; licence in `public/licenses/`                                            |
| DM Sans             | https://fonts.google.com/specimen/DM+Sans · https://github.com/google/fonts/tree/main/ofl/dmsans                         | SIL Open Font License 1.1; locally bundled by `next/font/google`; licence in `public/licenses/`                                            |
| IBM Plex Mono       | https://fonts.google.com/specimen/IBM+Plex+Mono · https://github.com/google/fonts/tree/main/ofl/ibmplexmono              | SIL Open Font License 1.1; locally bundled by `next/font/google`; licence in `public/licenses/`                                            |
| Lucide icons        | https://lucide.dev/license                                                                                               | ISC, with included Feather-derived attribution where applicable; installed package licence retained in `node_modules/lucide-react/LICENSE` |

All runtime package versions are pinned by `package-lock.json`. GSAP/ScrollTrigger comes from the official npm `gsap` package; its package licence applies. Other software dependencies retain their package licences.

## Factual sources, separate from assets

- Supplied `ROBO_FACTORY_CODEX_BUILD_SPEC.md`.
- https://manager.harmix.ai/ — public Pam Memory product description (MCP memory for AI agents; Gmail, Slack, Notion, HubSpot sources) and Trust Center badges (SOC 2 Type II compliant, GDPR in progress). Used to describe the product around our repair, migration, and compliance work.
- https://qote.be/fr/index.html — public Qote product description and figures (5 min to validate a quote, 0 km travel, ~2 h 30 manual comparison), published by NXTWEB. Paraphrased and attributed; no Qote branding or imagery is used.
- https://euroformat.com/en/ — public Euroformat Plant site (Kyiv lift manufacturer): what the company makes and its EU supply history. Paraphrased and attributed; no Euroformat branding, photos, or logos are used.
- Service context: https://atomiztech.si/ai-poc-to-production/, https://atomiztech.si/vibe-coded-mvp-rescue/, https://atomiztech.si/soc2-gdpr-engineering/.

Reference labels remain on by default. Ownership, certification, project dates, budgets, staff, and endorsements are not inferred from these facts.
