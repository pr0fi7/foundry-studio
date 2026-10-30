import { Breadcrumbs, Eyebrow, InlineLink } from "@/components/ui";
import { BookingPanel } from "@/components/booking-panel";
import { siteConfig } from "@/content/site-config";
import { pageMetadata } from "@/lib/seo";
export const metadata = pageMetadata(
  "Let’s talk",
  "Book a 30-minute call about what you are building or what is breaking. We’ll help you find the right first step.",
  "/contact",
);
export default function ContactPage() {
  return (
    <div className="container">
      <Breadcrumbs items={[{ label: "Contact" }]} />
      <section className="contact-layout">
        <div className="contact-intro">
          <Eyebrow>LET’S MAKE IT WORK</Eyebrow>
          <h1>
            Tell us what you’re building.
            <br />
            <span>Or what’s breaking.</span>
          </h1>
          <p className="lede">
            Book a free 30-minute call. Bring the problem; we’ll help you find
            the right first step.
          </p>
          <div className="contact-next">
            <span className="mono">WHAT HAPPENS NEXT</span>
            <ol>
              <li>You pick a time that suits you.</li>
              <li>We talk through the goals and constraints.</li>
              <li>You get a proposal for the right first step.</li>
            </ol>
            <p>
              No complete brief required.
              <br />
              No commitment from booking a call.
            </p>
          </div>
          {siteConfig.publicEmail && (
            <p className="contact-email">
              Prefer email?{" "}
              <a href={`mailto:${siteConfig.publicEmail}`}>
                {siteConfig.publicEmail}
              </a>
            </p>
          )}
          <div className="contact-faq">
            <InlineLink href="/faq">A few answers before you ask</InlineLink>
          </div>
        </div>
        <BookingPanel url={siteConfig.bookingUrl} />
      </section>
    </div>
  );
}
