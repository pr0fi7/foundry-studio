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
    role: "AI implementation & automation",
    scope: ["AI implementation", "Workflow automation"],
    summary:
      "AI and automation for a Kyiv lift manufacturer that sells to developers, architects, procurement teams, and installation partners.",
    challenge:
      "Euroformat designs, manufactures, and services lifts and electrical enclosures in Kyiv, and has supplied the EU market since 2015. It sells to very different buyers—developers, architects, public procurement teams, installation partners, and homeowners’ associations—each with their own questions, documents, and requirements, and its engineers promise a reply to every project enquiry within one business day.",
    solution:
      "We worked on AI implementation and automation for Euroformat, putting AI and automated workflows to work on the repetitive steps around the business so its specialists can spend their time on engineering and customers rather than routine handling.",
    outcomes: [
      { value: "1 day", label: "engineer reply promised on every enquiry" },
      { value: "6", label: "buyer types served" },
    ],
    url: "https://euroformat.com/en/",
    relatedServiceSlugs: ["automation"],
  },
];
/** The website's host name, for link text. */
export function domain(project: Project) {
  return new URL(project.url).hostname.replace(/^www\./, "");
}
