import { ArrowDown } from "lucide-react";
import {
  Button,
  Eyebrow,
  SectionHeader,
  OfferCards,
  ProjectGrid,
  FaqAccordion,
  CallToAction,
  InlineLink,
} from "@/components/ui";
import { FactoryScene } from "@/components/factory-scene";
import {
  HeroChoiceProvider,
  HeroSecondaryAction,
} from "@/components/hero-choice";
import { ProductionLine } from "@/components/production-line";
import { pickFaqs } from "@/content/faq";
import { services } from "@/content/services";
import { pageMetadata } from "@/lib/seo";
export const metadata = pageMetadata(
  "We build it. We fix it. We make it work.",
  "Product Rescue, MVP Factory, and Automation & Integration. Each starts with a small, clearly priced first step.",
  "/",
);
const marquee = services.flatMap((service) => [
  service.name,
  ...service.steps.filter((step) => !step.optional).map((step) => step.name),
]);
export default function Home() {
  return (
    <>
      <section className="hero container" data-mode="build" data-stage="3">
        <div className="hero-backdrop" aria-hidden="true" />
        <HeroChoiceProvider>
          <div className="hero-copy">
            <Eyebrow>THE SOFTWARE FACTORY</Eyebrow>
            <h1>
              <span className="h-line line-build">
                <span>We build it.</span>
              </span>{" "}
              <span className="h-line line-fix">
                <span>We fix it.</span>
              </span>{" "}
              <span className="h-line line-work">
                <span>We make it work.</span>
              </span>
            </h1>
            <p className="hero-description">
              Rescue an app that keeps breaking, launch a new MVP, or automate
              the busywork. Each one starts with a small, clearly priced first
              step.
            </p>
            <div className="actions">
              <Button href="/contact">Book a free call</Button>
              <HeroSecondaryAction />
            </div>
            <p className="hero-audience">For founders, product teams & SMEs.</p>
          </div>
          <FactoryScene />
        </HeroChoiceProvider>
        <a className="scroll-cue mono" href="#services">
          <span>
            <ArrowDown size={15} />
          </span>
          A LITTLE FURTHER. A LOT CLEARER.
        </a>
      </section>
      <div className="marquee" aria-hidden="true">
        <div className="marquee-track">
          {[0, 1].map((copy) => (
            <div key={copy}>
              {marquee.map((item) => (
                <span key={item}>
                  {item}
                  <i />
                </span>
              ))}
            </div>
          ))}
        </div>
      </div>
      <section className="section container offers-section" id="services">
        <SectionHeader
          eyebrow="THREE WAYS INTO THE FACTORY"
          title="Pick the problem. Start small."
          description="Every service begins with a fixed, clearly scoped first step, so you know what you’re buying before anything bigger."
          href="/pricing"
          link="Pricing in detail"
        />
        <OfferCards />
      </section>
      <ProductionLine />
      <section className="section work-section">
        <div className="container">
          <SectionHeader
            eyebrow="QUALITY CHECK / RECENT WORK"
            title="Built, repaired, and shipped."
            description="Built from scratch, repaired and moved, automated."
            href="/work"
            link="See all work"
          />
          <ProjectGrid />
        </div>
      </section>
      <section className="section container faq-preview">
        <div>
          <Eyebrow>A FEW GOOD QUESTIONS</Eyebrow>
          <h2>
            Before we
            <br />
            get to work.
          </h2>
          <p>Good projects start with clear expectations.</p>
          <InlineLink href="/faq">All your questions, answered</InlineLink>
        </div>
        <FaqAccordion
          items={pickFaqs([
            "diagnosis",
            "mvp-price",
            "automation-kind",
            "rewrite",
          ])}
        />
      </section>
      <CallToAction />
    </>
  );
}
