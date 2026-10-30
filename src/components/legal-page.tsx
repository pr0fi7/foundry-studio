import { Breadcrumbs, PageIntro, InlineLink } from "./ui";
import { siteConfig } from "@/content/site-config";
const privacy = [
  [
    "Who is responsible",
    `Controller: ${siteConfig.legal.entity}. Registered address: ${siteConfig.legal.address}. Privacy contact: ${siteConfig.legal.privacyContact}. These details must be completed before taking bookings.`,
  ],
  [
    "Booking a call",
    "Calls are booked through Calendly. Its scheduler loads only when you choose to open it, or when you follow the link to Calendly’s own site. Calendly then processes the details you enter, such as your name, email address, and any notes, under its own privacy policy. Please do not include credentials, secrets, or sensitive customer information.",
  ],
  [
    "Hosting",
    "This website is a static site hosted on GitHub Pages. It has no forms or database of its own. GitHub may log technical request data, such as IP addresses, to operate and secure the service.",
  ],
  [
    "Purpose and legal basis",
    "Proposed purpose: assess and respond to your enquiry. The correct legal basis, any pre-contract processing, and the wording of the consent field require legal review for the actual business and jurisdiction. This template does not settle those questions.",
  ],
  [
    "Processors and international transfers",
    "Confirm processor agreements, processing locations, and transfer safeguards for GitHub (hosting) and Calendly (scheduling) before launch. No analytics or advertising integrations are included. The site code sets no cookies; Calendly may set its own once its scheduler is opened.",
  ],
  [
    "Retention",
    `Enquiry retention: ${siteConfig.legal.retention}. Confirm deletion rules for Calendly bookings, your inbox, and hosting logs. Do not treat this placeholder as a retention promise.`,
  ],
  [
    "Your rights and requests",
    "The final policy must explain applicable access, correction, deletion, objection, restriction, portability, consent withdrawal, and complaint rights, where those rights apply. Add the actual contact channel and relevant supervisory authority after legal review.",
  ],
  [
    "Policy completion",
    "Replace this draft with an approved policy that reflects the deployed service and real business. Review it when the booking tool, processors, analytics, or data handling changes.",
  ],
];
const terms = [
  [
    "Business identity",
    `Service provider: ${siteConfig.legal.entity}. Registered address: ${siteConfig.legal.address}. Governing jurisdiction: ${siteConfig.legal.jurisdiction}. Add registration, tax, and mandatory business disclosures as applicable.`,
  ],
  [
    "Information on this website",
    "The site describes proposed capabilities and engagement formats. Booking a call is a request for a conversation; it is not acceptance of a project or a contract. Service availability and terms require agreement.",
  ],
  [
    "Proposals and engagements",
    "A written agreement should define scope, deliverables, acceptance, fees, taxes, payment terms, timelines, dependencies, changes, and termination. The website does not replace that agreement.",
  ],
  [
    "Reference cases and pricing",
    "Project figures describe past work and are not guarantees of future results. Indicative prices are not binding quotes; the price of any work is set in a written proposal.",
  ],
  [
    "Intellectual property",
    "The final agreement must specify ownership of commissioned work, licences for pre-existing materials, third-party dependencies, and the conditions of any transfer. Do not assume this template assigns rights.",
  ],
  [
    "Security and assurance",
    "Engineering support can help prepare technical controls and evidence. It does not replace legal advice, independent security assurance, or an auditor’s SOC 2 examination. No certification or compliance outcome is guaranteed here.",
  ],
  [
    "Liability, disputes, and applicable law",
    "Liability provisions, warranties, dispute processes, governing law, consumer protections, and mandatory rights must be drafted for the actual entity and services. These clauses remain intentionally unresolved pending legal review.",
  ],
  [
    "Contact and changes",
    `Add a verified business contact and an effective date when the terms are approved. The working brand name ${siteConfig.brandName} does not identify a registered legal entity.`,
  ],
];
export function LegalPage({ kind }: { kind: "privacy" | "terms" }) {
  const isPrivacy = kind === "privacy";
  return (
    <div className="container legal-layout">
      <Breadcrumbs items={[{ label: isPrivacy ? "Privacy" : "Terms" }]} />
      <PageIntro
        eyebrow="LEGAL / DRAFT TEMPLATE"
        title={
          isPrivacy ? "Privacy, in plain sight." : "Clear terms for good work."
        }
        description="This page is a reviewable template, not a completed legal document."
      />
      <div className="legal-warning">
        <strong>{siteConfig.legal.status}</strong>
        <p>
          Business identity, jurisdiction, contact details, and operational
          policies are not yet confirmed. Complete and approve this document
          before launch.
        </p>
      </div>
      <div className="legal-sections">
        {(isPrivacy ? privacy : terms).map(([title, text], i) => (
          <section key={title}>
            <span className="mono">{String(i + 1).padStart(2, "0")}</span>
            <div>
              <h2>{title}</h2>
              <p>{text}</p>
            </div>
          </section>
        ))}
      </div>
      <InlineLink href="/contact">Book a call</InlineLink>
    </div>
  );
}
