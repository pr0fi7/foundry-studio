import {
  Breadcrumbs,
  PageIntro,
  OfferCards,
  CallToAction,
  SectionHeader,
  Button,
} from "@/components/ui";
import { services } from "@/content/services";
import { pageMetadata } from "@/lib/seo";
export const metadata = pageMetadata(
  "Services",
  "Product Rescue, MVP Factory, and Automation & Integration: three services, each with a small, clearly priced first step.",
  "/services",
);
export default function ServicesPage() {
  return (
    <>
      <div className="container">
        <Breadcrumbs items={[{ label: "Services" }]} />
        <PageIntro
          eyebrow="ONE FACTORY. THREE SERVICES."
          title="Three services. One clear first step each."
          description="Fix an application that’s holding you back, build something new, or connect the tools your team already uses."
        />
        <OfferCards />
        <section className="section problems">
          <SectionHeader
            eyebrow="NOT SURE WHICH ONE?"
            title="Start with the problem."
          />
          <div className="problem-list">
            {[
              ...services.map(
                (s) => [s.signals[0], s.short, `/services/${s.slug}`] as const,
              ),
              [
                "Something else entirely.",
                "Tell us what’s going on. We’ll point you to the right starting point.",
                "/contact",
              ] as const,
            ].map(([title, text, href], i) => (
              <article key={title}>
                <span className="mono">0{i + 1}</span>
                <div>
                  <h3>{title}</h3>
                  <p>{text}</p>
                </div>
                <Button href={href} variant="text">
                  {href === "/contact" ? "Ask us" : "Explore"}
                </Button>
              </article>
            ))}
          </div>
        </section>
      </div>
      <CallToAction />
    </>
  );
}
