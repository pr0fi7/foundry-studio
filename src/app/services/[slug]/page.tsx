import { notFound } from "next/navigation";
import { ArrowRight } from "lucide-react";
import { services, serviceBySlug } from "@/content/services";
import { projects } from "@/content/projects";
import { siteConfig } from "@/content/site-config";
import { formatPrice } from "@/content/pricing";
import { pickFaqs } from "@/content/faq";
import {
  Breadcrumbs,
  Eyebrow,
  Button,
  CallToAction,
  SectionHeader,
  ProjectGrid,
  ServiceIcon,
  StepLadder,
  FaqAccordion,
  InlineLink,
} from "@/components/ui";
import { ProductArt } from "@/components/product-art";
import { pageMetadata } from "@/lib/seo";
export function generateStaticParams() {
  return services.map(({ slug }) => ({ slug }));
}
export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const s = serviceBySlug(slug);
  return s ? pageMetadata(s.name, s.short, `/services/${slug}`) : {};
}
export default async function ServicePage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const s = serviceBySlug(slug);
  if (!s) notFound();
  const related = projects.filter((p) => p.relatedServiceSlugs.includes(slug));
  const [first] = s.steps;
  return (
    <>
      <div className="container">
        <Breadcrumbs
          items={[{ label: "Services", href: "/services" }, { label: s.name }]}
        />
        <section className="detail-hero">
          <div>
            <Eyebrow>{s.label}</Eyebrow>
            <h1>{s.title}</h1>
            <p className="lede">{s.intro}</p>
            <p className="entry-offer">
              <span className="mono">START HERE</span>
              <strong>{first.name}</strong>
              <ArrowRight size={16} aria-hidden="true" />
              <span>{formatPrice(first)}</span>
            </p>
            <Button href="/contact">{s.cta}</Button>
          </div>
          <div className={`service-art-panel service-art-${s.icon}`}>
            <div className="service-art-title">
              <ServiceIcon name={s.icon} />
              <span className="mono">{s.name}</span>
            </div>
            <ProductArt kind={s.art} />
            <span className="mono service-art-caption">{s.caption}</span>
          </div>
        </section>
        <section className="audience-band">
          <Eyebrow>SOUNDS FAMILIAR?</Eyebrow>
          <div>
            <p>{s.buyer}</p>
            <ul className="signal-list">
              {s.signals.map((signal) => (
                <li key={signal}>{signal}</li>
              ))}
            </ul>
          </div>
        </section>
        <section className="section">
          <SectionHeader
            eyebrow="HOW IT WORKS"
            title="Small first step. Clear next one."
            description={s.note}
          />
          <StepLadder steps={s.steps} />
          <p className="ladder-footnote">
            {siteConfig.showIndicativePrices ? "Prices are indicative. " : ""}
            Every step is fixed in a written proposal before work begins.{" "}
            <InlineLink href="/pricing">How pricing works</InlineLink>
          </p>
        </section>
        {related.length > 0 && (
          <section className="section">
            <SectionHeader
              eyebrow="RELATED WORK"
              title="See the kind of problem we mean."
            />
            <ProjectGrid selected={related} />
          </section>
        )}
        <section className="section faq-preview">
          <div>
            <Eyebrow>FAIR QUESTIONS</Eyebrow>
            <h2>Before you start.</h2>
          </div>
          <FaqAccordion items={pickFaqs(s.faqIds)} />
        </section>
      </div>
      <CallToAction
        title={
          s.icon === "fix"
            ? "Let’s get your product moving again."
            : s.icon === "build"
              ? "Let’s make the first version real."
              : "Let’s give your team its hours back."
        }
      />
    </>
  );
}
