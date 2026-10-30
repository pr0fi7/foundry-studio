# Owner decisions before launch

- Confirm the public brand name and legal business identity. Replace the working name in `src/content/site-config.ts`.
- Add the GitHub Pages DNS records for `foundry-studio.eu` at Squarespace (see README → Deployment), then enable **Enforce HTTPS** once the certificate is issued.
- Confirm each client is happy to be named and linked (Qote, Harmix/Pam, Euroformat). Add specifics to the Euroformat case (which processes were automated, where AI is used, any measured time saved), and any measured results for Pam’s fixes and migration.
- Test and confirm the indicative prices (diagnosis €400–€900, repair sprint €2,000–€6,000, MVP from €8,000) against what you can actually deliver, and decide fixed fees for discovery, prototypes, and workflow audits. Edit them in `src/content/services.ts`, or set `showIndicativePrices: false` to hide them.
- In Calendly, check the 30-minute event’s availability and time zone (the profile is set to America/New_York). Optionally add a public email address.
- Complete legal review of the privacy and terms templates: entity, jurisdiction, contact details, legal basis, retention, hosting (GitHub) and scheduling (Calendly) processors, transfers, rights, and contractual provisions.
