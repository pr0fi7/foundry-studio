# Owner decisions before launch

- Confirm the public brand name and legal business identity. Replace the working name in `src/content/site-config.ts`.
- Add the GitHub Pages DNS records for `foundry-studio.eu` at Squarespace (see README → Deployment), then enable **Enforce HTTPS** once the certificate is issued.
- Confirm each client is happy to be named and linked (Qote, Harmix/Pam, Euroformat). Confirm Euroformat is happy to publish its BOM result (2 days down to 20 minutes). Add detail to that case (other processes moved onto AI workflows, any human review step), and any measured results for Pam’s fixes and migration.
- Test and confirm the indicative prices (diagnosis €400–€900, repair sprint €2,000–€6,000, MVP from €8,000) against what you can actually deliver, and decide fixed fees for discovery, prototypes, and workflow audits. Edit them in `src/content/services.ts`, or set `showIndicativePrices: false` to hide them.
- Confirm the Calendly availability suits you: on 2026-10-30 the 30-minute event was on Europe/Berlin time, open on weekdays 09:00–19:30 CET. Optionally add a public email address.
- Complete legal review of the privacy and terms templates: entity, jurisdiction, contact details, legal basis, retention, hosting (GitHub) and scheduling (Calendly) processors, transfers, rights, and contractual provisions. Include Calendly’s cookie banner: the embed now shows it, because hiding it (`hide_gdpr_banner=1`) would remove the visitor’s choice over Calendly’s optional cookies. Only hide it again if the review approves that.
