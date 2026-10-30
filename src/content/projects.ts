export type Project = {
  slug: string;
  name: string;
  category: string;
  filter: string;
  /** Our part in the project, in a few words. */
  role: string;
  scope: string[];
  summary: string;
  challenge: string;
  solution: string;
  outcomes: { value: string; label: string }[];
  url: string;
  relatedServiceSlugs: string[];
};
export const projects: Project[] = [
  {
    slug: "qote",
    name: "Qote",
    category: "Construction tech / SaaS",
    filter: "SaaS",
    role: "Designed & built from scratch",
    scope: [
      "Homeowner questionnaire",
      "Pricing engine",
      "Editable price grid",
      "White-label PDF reports",
      "Widget, subdomain & mini-site",
    ],
    summary:
      "A remote quoting platform for Belgian renovation contractors, built from scratch. Requests arrive pre-priced, ready to check, adjust, and send.",
    challenge:
      "Pricing a renovation usually means driving to the site and building a quote by hand—around two and a half hours per job—before the contractor even knows whether the lead is serious. Small contractors lose evenings to quotes that never convert.",
    solution:
      "We built Qote end to end, from the first scope to a live product. Homeowners answer a guided questionnaire, and Qote turns their answers into a pre-estimated quote using Belgian reference prices. The contractor reviews every line in an editable price grid—nothing is sent without their approval—and the quote goes out under their own brand. The same engine runs as a widget on the contractor’s website, a hosted subdomain, or a stand-alone mini-site, and produces a white-label PDF report covering materials, the PEB energy rating, and regional renovation subsidies.",
    outcomes: [
      { value: "5 min", label: "to validate a pre-priced quote" },
      { value: "0 km", label: "travelled to price a job" },
    ],
    url: "https://qote.be/fr/index.html",
    relatedServiceSlugs: ["mvp-factory"],
  },
  {
    slug: "pam",
    name: "Pam",
    category: "AI platform / Harmix",
    filter: "AI platforms",
    role: "Repairs, new infrastructure & compliance",
    scope: [
      "Targeted fixes",
      "Infrastructure migration",
      "SOC 2 support",
      "GDPR support",
    ],
    summary:
      "Harmix’s memory layer for AI agents. We fixed key parts of the product, moved it onto new infrastructure, and supported its SOC 2 and GDPR work.",
    challenge:
      "Pam Memory connects to a company’s tools—Gmail, Slack, Notion, HubSpot—reconciles conflicting information, and gives AI agents persistent company context through an MCP server. A product that holds a company’s email and documents has to be reliable, and it has to pass the security reviews business customers ask for. Parts of the platform needed repair, and the infrastructure needed to be ready for that scrutiny.",
    solution:
      "We repaired the parts of the product that were holding it back, then moved Pam onto new infrastructure. Alongside the move, we supported the engineering side of SOC 2 and GDPR: the kind of controls Pam describes publicly, such as encryption in transit and at rest, strict access controls, and auditable data lineage. Harmix’s Trust Center now lists SOC 2 Type II as compliant, with GDPR in progress.",
    outcomes: [
      { value: "SOC 2", label: "Type II, listed as compliant" },
      { value: "GDPR", label: "compliance work in progress" },
    ],
    url: "https://manager.harmix.ai/",
    relatedServiceSlugs: ["product-rescue"],
  },
  {
    slug: "euroformat",
    name: "Euroformat",
    category: "Manufacturing / AI & automation",
    filter: "Automation",
    role: "Core operations moved onto AI workflows",
    scope: [
      "Elevator BOM creation",
      "Core process automation",
      "AI implementation",
    ],
    summary:
      "From lift specification to parts list in 20 minutes, not 2 days. We moved core operations at a Kyiv lift manufacturer onto AI workflows, including elevator BOM creation.",
    challenge:
      "Euroformat designs, manufactures, and services lifts and electrical enclosures in Kyiv, and has supplied the EU market since 2015. Before a lift can be built, its specification has to become an exact bill of materials, and a missed part only shows up later, on the factory floor. This isn’t routine admin. It’s core, detail-heavy work, and when people do it by hand, it takes time specialists could be spending on engineering and customers.",
    solution:
      "We didn’t add AI around the edges of the business. We moved some of Euroformat’s core operations onto it. Elevator BOM creation is the clearest example: what used to be assembled by hand now runs as an AI workflow, turning a lift’s requirements into a structured bill of materials in 20 minutes instead of 2 days. The same approach carries across other core processes, giving the team one repeatable way of working where there used to be manual handling.",
    outcomes: [
      { value: "20 min", label: "per BOM, down from 2 days" },
      { value: "Core", label: "processes now run through AI workflows" },
    ],
    url: "https://euroformat.com/en/",
    relatedServiceSlugs: ["automation"],
  },
];
/** The website's host name, for link text. */
export function domain(project: Project) {
  return new URL(project.url).hostname.replace(/^www\./, "");
}
