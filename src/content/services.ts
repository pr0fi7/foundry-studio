export type Step = {
  name: string;
  /** Indicative price in EUR. Leave out when the step is quoted per project. */
  minEUR?: number;
  maxEUR?: number;
  /** Shown instead of a price, or when indicative prices are switched off. */
  priceNote: string;
  summary: string;
  deliverables: string[];
  optional?: boolean;
};
export type Service = {
  slug: string;
  name: string;
  navLabel: string;
  short: string;
  buyer: string;
  title: string;
  intro: string;
  icon: "fix" | "build" | "ai";
  label: string;
  caption: string;
  art: "analytics" | "platform" | "automation";
  cta: string;
  signals: string[];
  steps: Step[];
  note: string;
  faqIds: string[];
};

const ongoingCare: Step = {
  name: "Ongoing care",
  priceNote: "Monthly, agreed in writing",
  summary:
    "Keep dependencies current, watch for failures, and work through the backlog at a pace that suits you.",
  deliverables: ["Maintenance & monitoring", "Agreed monthly capacity"],
  optional: true,
};

export const services: Service[] = [
  {
    slug: "product-rescue",
    name: "Product Rescue",
    navLabel: "Product Rescue",
    short:
      "Your app is buggy, slow, or expensive to maintain. We find out why, then fix what matters.",
    buyer:
      "For companies with a live application that’s buggy, slow, unreliable, or expensive to keep running.",
    title: "Keep the product. Fix the problems.",
    intro:
      "Start with a paid technical diagnosis. You get a clear picture of what’s wrong and a fixed-scope repair sprint to put it right—no open-ended retainer, no automatic rewrite.",
    icon: "fix",
    label: "01 / FIX WHAT EXISTS",
    caption: "INSPECT → REPAIR → RELEASE",
    art: "analytics",
    cta: "Book a diagnosis",
    signals: [
      "Every release breaks something else.",
      "Pages are slow, or the app falls over under load.",
      "The original developer has gone and nobody wants to touch the code.",
      "Hosting and maintenance costs keep climbing.",
      "An AI-generated MVP has hit its limits.",
    ],
    steps: [
      {
        name: "Technical diagnosis",
        minEUR: 400,
        maxEUR: 900,
        priceNote: "Fixed fee, agreed upfront",
        summary:
          "We review the code, infrastructure, and the symptoms your users see, then rank what to fix by risk and business impact.",
        deliverables: [
          "Findings, ranked by risk",
          "Quick wins you can apply now",
          "A scoped, fixed-price repair plan",
        ],
      },
      {
        name: "Repair sprint",
        minEUR: 2000,
        maxEUR: 6000,
        priceNote: "Fixed price, agreed after diagnosis",
        summary:
          "We fix the agreed issues in a clearly scoped sprint, with tests that prove each fix and a safe release.",
        deliverables: [
          "The agreed list of fixes",
          "Regression tests & release",
          "Handover notes",
        ],
      },
      ongoingCare,
    ],
    note: "A rewrite is a decision to justify, not the default. AI-generated and hand-built products get the same evidence-led diagnosis.",
    faqIds: ["diagnosis", "rewrite", "ai-generated"],
  },
  {
    slug: "mvp-factory",
    name: "MVP Factory",
    navLabel: "MVP Factory",
    short:
      "A new web app, dashboard, SaaS product, or internal tool—scoped first, then built in milestones.",
    buyer:
      "For founders and companies that need a new web application, dashboard, SaaS product, or internal tool.",
    title: "From idea to working product.",
    intro:
      "No promise to build anything for one fixed price. We start with discovery, prove the idea with a prototype, then build in milestones you approve one at a time.",
    icon: "build",
    label: "02 / BUILD SOMETHING NEW",
    caption: "IDEA → PROTOTYPE → PRODUCT",
    art: "platform",
    cta: "Start with discovery",
    signals: [
      "You have an idea and a deadline, but no product team.",
      "A spreadsheet or manual process is running part of the business.",
      "You need a working first version to show customers or investors.",
      "A previous estimate was a single number with no plan behind it.",
    ],
    steps: [
      {
        name: "Discovery",
        priceNote: "Fixed fee, agreed upfront",
        summary:
          "Map the users, the problem, and the constraints. Agree what belongs in version one and what can wait.",
        deliverables: [
          "Scope & user journeys",
          "Technical approach",
          "Milestone plan & estimate",
        ],
      },
      {
        name: "Prototype",
        priceNote: "Fixed fee, agreed upfront",
        summary:
          "A clickable prototype of the key flows, so you can test the idea before paying for the build.",
        deliverables: ["Clickable prototype", "Feedback from real users"],
      },
      {
        name: "Milestone build",
        minEUR: 8000,
        priceNote: "Priced per milestone",
        summary:
          "Build in milestones you sign off one at a time: working software, reviewed together, at every step.",
        deliverables: [
          "Working software per milestone",
          "Source code & deployment access",
          "Launch & handover",
        ],
      },
    ],
    note: "Milestones and prices are agreed after discovery, so you never commit to the whole build blind.",
    faqIds: ["mvp-price", "ownership", "after-launch"],
  },
  {
    slug: "automation",
    name: "Automation & Integration",
    navLabel: "Automation",
    short:
      "Stop moving data between tools by hand. We connect your systems and automate the repetitive work.",
    buyer:
      "For SMEs losing hours to moving data between systems, building reports by hand, or repetitive admin.",
    title: "Less copying. Fewer mistakes.",
    intro:
      "We map one workflow, show how much time and how many errors an integration could save, then build it with proper error handling—so it keeps working when something unexpected arrives.",
    icon: "ai",
    label: "03 / CONNECT YOUR SYSTEMS",
    caption: "INPUT → CONNECT → AUTOMATE",
    art: "automation",
    cta: "Map a workflow",
    signals: [
      "Someone re-types orders, invoices, or customer details between tools.",
      "Weekly reports are stitched together by hand from several exports.",
      "Errors creep in every time data is copied manually.",
      "Your tools have APIs, but nothing is connected.",
    ],
    steps: [
      {
        name: "Workflow audit",
        priceNote: "Fixed fee, agreed upfront",
        summary:
          "We map the process as it runs today and estimate the hours and errors an automation could remove.",
        deliverables: [
          "Map of the current workflow",
          "Time & error savings estimate",
          "A scoped, priced recommendation",
        ],
      },
      {
        name: "Build & connect",
        priceNote: "Scoped proposal",
        summary:
          "Connect the systems, validate the data, and handle the exceptions—with a human review step where it matters.",
        deliverables: [
          "A working integration or workflow",
          "Error alerts & retries",
          "A runbook for your team",
        ],
      },
      ongoingCare,
    ],
    note: "We use AI only where it does the job better than a plain integration.",
    faqIds: ["automation-kind", "stack", "confidential"],
  },
];

export function serviceBySlug(slug: string) {
  return services.find((s) => s.slug === slug);
}
