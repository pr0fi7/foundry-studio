export type Faq = { id: string; question: string; answer: string };
export const faqs: Faq[] = [
  {
    id: "diagnosis",
    question: "Why start with a paid diagnosis?",
    answer:
      "Because a quote for fixing code nobody has looked at is a guess. The diagnosis gives you a ranked list of problems and a fixed-price repair plan. The findings are yours to keep, whoever does the repair work.",
  },
  {
    id: "rewrite",
    question: "Will we have to rewrite everything?",
    answer:
      "Not necessarily. Targeted repairs are often the sensible starting point. We recommend a rewrite only when the evidence and trade-offs justify it, and agree that decision with you.",
  },
  {
    id: "ai-generated",
    question: "Can you repair an AI-generated or vibe-coded product?",
    answer:
      "Yes. We assess what works, what is risky, and what needs attention. How the code was created matters less than whether it is secure, maintainable, and useful.",
  },
  {
    id: "mvp-price",
    question: "How do you price an MVP?",
    answer:
      "Discovery and a prototype come first, each at a fixed fee. Then we agree milestones with a price for each, so you approve the build one step at a time instead of signing up for one large number.",
  },
  {
    id: "automation-kind",
    question: "What kind of automation do you build?",
    answer:
      "Integrations between the tools you already use, such as your CRM, accounting, e-commerce platform, or spreadsheets; automated reports; and workflows that remove repetitive admin. We add AI only where it does the job better than a plain integration.",
  },
  {
    id: "estimate",
    question: "How do you estimate price and timeline?",
    answer:
      "Every service starts with a small, fixed-fee first step: a diagnosis, discovery, or workflow audit. That step gives us what we need for a written proposal with assumptions, milestones, and a change process before any larger work begins.",
  },
  {
    id: "ownership",
    question: "Who owns the code and infrastructure?",
    answer:
      "Ownership, intellectual property, and account access are set out in the agreement. Our approach is to make handover practical, with source code, documentation, and access clearly covered. Third-party licences still apply.",
  },
  {
    id: "stack",
    question: "Can you work with our existing stack and tools?",
    answer:
      "We review the stack and the work required before committing. We will explain where it is a good fit and flag any specialist help or changes that may be needed.",
  },
  {
    id: "after-launch",
    question: "Can you help after launch?",
    answer:
      "Yes. Maintenance, monitoring, and improvements can continue as ongoing care. Capacity, coverage, and response expectations are agreed in writing.",
  },
  {
    id: "confidential",
    question: "How do you handle confidential information?",
    answer:
      "We can discuss an NDA and access requirements before reviewing sensitive material. When you book a call, share a high-level description only; do not include passwords, secrets, or confidential customer data.",
  },
  {
    id: "enquiry",
    question: "What happens after I book a call?",
    answer:
      "You book a 30-minute call at a time that suits you. We talk through goals and constraints, then send a proposal for the right first step. Booking a call is not a commitment to a project.",
  },
];
export function pickFaqs(ids: string[]) {
  return ids.flatMap((id) => faqs.filter((faq) => faq.id === id));
}
