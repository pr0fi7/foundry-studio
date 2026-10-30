import Link from "next/link";
import {
  ArrowUpRight,
  ArrowRight,
  Blocks,
  Wrench,
  Workflow,
  Plus,
  Check,
} from "lucide-react";
import type { ReactNode } from "react";
import { services, type Service, type Step } from "@/content/services";
import { projects, domain, type Project } from "@/content/projects";
import { formatPrice } from "@/content/pricing";
import { faqs } from "@/content/faq";
import { ProductArt } from "./product-art";

export function Button({
  href,
  children,
  variant = "primary",
  arrow = true,
}: {
  href: string;
  children: ReactNode;
  variant?: "primary" | "secondary" | "light" | "text";
  arrow?: boolean;
}) {
  return (
    <Link href={href} className={`button button-${variant}`}>
      {children}
      {arrow && <ArrowUpRight size={18} aria-hidden="true" />}
    </Link>
  );
}
export function Eyebrow({
  children,
  light = false,
}: {
  children: ReactNode;
  light?: boolean;
}) {
  return (
    <p className={`eyebrow ${light ? "light" : ""}`}>
      <span />
      {children}
    </p>
  );
}
export function SectionHeader({
  eyebrow,
  title,
  description,
  href,
  link = "Explore more",
}: {
  eyebrow: string;
  title: string;
  description?: string;
  href?: string;
  link?: string;
}) {
  return (
    <div className="section-heading" data-reveal>
      <div>
        <Eyebrow>{eyebrow}</Eyebrow>
        <h2>{title}</h2>
        {description && <p className="lede">{description}</p>}
      </div>
      {href && (
        <Button href={href} variant="text">
          {link}
        </Button>
      )}
    </div>
  );
}
export function Breadcrumbs({
  items,
}: {
  items: { label: string; href?: string }[];
}) {
  return (
    <nav aria-label="Breadcrumb" className="breadcrumbs">
      <Link href="/">Home</Link>
      {items.map((item, i) => (
        <span key={item.label}>
          <span aria-hidden="true">/</span>
          {item.href ? (
            <Link href={item.href}>{item.label}</Link>
          ) : (
            <span aria-current={i === items.length - 1 ? "page" : undefined}>
              {item.label}
            </span>
          )}
        </span>
      ))}
    </nav>
  );
}
export function PageIntro({
  eyebrow,
  title,
  description,
  children,
}: {
  eyebrow: string;
  title: string;
  description: string;
  children?: ReactNode;
}) {
  return (
    <div className="page-intro" data-reveal>
      <Eyebrow>{eyebrow}</Eyebrow>
      <h1>{title}</h1>
      <p className="lede">{description}</p>
      {children}
    </div>
  );
}
const icons = {
  build: Blocks,
  fix: Wrench,
  ai: Workflow,
};
export function ServiceIcon({
  name,
  size = 26,
}: {
  name: Service["icon"];
  size?: number;
}) {
  const Icon = icons[name];
  return <Icon size={size} strokeWidth={1.6} aria-hidden="true" />;
}
/** The three services, each with its priced first steps and a way to start. */
export function OfferCards({ selected = services }: { selected?: Service[] }) {
  return (
    <div className="offer-grid">
      {selected.map((service) => (
        <article
          className={`offer-card offer-${service.icon}`}
          key={service.slug}
          data-reveal
        >
          <div className="card-top">
            <span className="icon-box">
              <ServiceIcon name={service.icon} />
            </span>
            <span className="mono">{service.label}</span>
          </div>
          <h3>{service.name}</h3>
          <p>{service.buyer}</p>
          <ol className="offer-ladder">
            {service.steps
              .filter((step) => !step.optional)
              .map((step, i) => (
                <li key={step.name}>
                  <span className="mono">{i === 0 ? "START" : "THEN"}</span>
                  <span>{step.name}</span>
                  <strong
                    className={
                      formatPrice(step) === step.priceNote ? "is-note" : ""
                    }
                  >
                    {formatPrice(step)}
                  </strong>
                </li>
              ))}
          </ol>
          <div className="offer-actions">
            <Button href="/contact">{service.cta}</Button>
            <InlineLink href={`/services/${service.slug}`}>
              How {service.navLabel} works
            </InlineLink>
          </div>
        </article>
      ))}
    </div>
  );
}
export function StepLadder({ steps }: { steps: Step[] }) {
  return (
    <ol className="step-ladder">
      {steps.map((step, i) => {
        const price = formatPrice(step);
        return (
          <li
            className={`step-card ${step.optional ? "optional" : ""}`}
            key={step.name}
            data-reveal
          >
            <div className="step-top">
              <span className="step-square mono">0{i + 1}</span>
              <span className="mono">
                {step.optional ? "OPTIONAL" : i === 0 ? "START HERE" : "NEXT"}
              </span>
            </div>
            <h3>{step.name}</h3>
            <p className="step-price">
              <strong className={price === step.priceNote ? "is-note" : ""}>
                {price}
              </strong>
              {price !== step.priceNote && <small>{step.priceNote}</small>}
            </p>
            <p>{step.summary}</p>
            <ul className="check-list">
              {step.deliverables.map((item) => (
                <li key={item}>
                  <Check size={17} aria-hidden="true" />
                  {item}
                </li>
              ))}
            </ul>
          </li>
        );
      })}
    </ol>
  );
}
/** Metrics such as "5 min" count up; labels such as "SOC 2" stay put. */
export function countable(value: string) {
  return /^[~\d]/.test(value);
}
export function ProjectCard({ project }: { project: Project }) {
  return (
    <article className="project-card" data-reveal>
      <Link
        href={`/work/${project.slug}`}
        className={`project-image project-${project.slug}`}
      >
        <span className="sr-only">Read {project.name} case study. </span>
        <ProductArt kind={project.slug} />
        <span className="art-caption">CONCEPTUAL ILLUSTRATION</span>
      </Link>
      <div className="project-copy">
        <div className="project-title">
          <div>
            <span className="mono muted">{project.category}</span>
            <h3>
              <Link href={`/work/${project.slug}`}>{project.name}</Link>
            </h3>
          </div>
          <Link
            className="round-link"
            href={`/work/${project.slug}`}
            aria-label={`Read ${project.name} case study`}
          >
            <ArrowUpRight size={22} />
          </Link>
        </div>
        <p>{project.summary}</p>
        <div className="project-metric">
          <strong
            data-count={countable(project.outcomes[0].value) || undefined}
          >
            {project.outcomes[0].value}
          </strong>
          <span>{project.outcomes[0].label}</span>
        </div>
        <a
          className="project-site mono"
          href={project.url}
          target="_blank"
          rel="noreferrer"
        >
          {domain(project)}
          <ArrowUpRight size={13} aria-hidden="true" />
          <span className="sr-only"> (opens in a new tab)</span>
        </a>
      </div>
    </article>
  );
}
export function ProjectGrid({ selected = projects }: { selected?: Project[] }) {
  return (
    <div className="project-grid">
      {selected.map((p) => (
        <ProjectCard key={p.slug} project={p} />
      ))}
    </div>
  );
}
export function FaqAccordion({ items = faqs }: { items?: typeof faqs }) {
  return (
    <div className="faq-list">
      {items.map((faq, i) => (
        <details key={faq.question}>
          <summary>
            <span className="mono faq-number">
              {String(i + 1).padStart(2, "0")}
            </span>
            <span>{faq.question}</span>
            <Plus size={20} aria-hidden="true" />
          </summary>
          <div>
            <p>{faq.answer}</p>
          </div>
        </details>
      ))}
    </div>
  );
}
export function CallToAction({
  title = "Have an idea? Have a problem?",
  text = "Either way, let’s talk. A short description is all it takes to find the next step.",
}: {
  title?: string;
  text?: string;
}) {
  return (
    <section className="container cta-wrap">
      <div className="cta" data-reveal>
        <div>
          <Eyebrow light>THE NEXT THING STARTS HERE</Eyebrow>
          <h2>{title}</h2>
          <p>{text}</p>
          <div className="actions">
            <Button href="/contact" variant="light">
              Book a call
            </Button>
            <Button href="/work" variant="text">
              See our work
            </Button>
          </div>
        </div>
        <div className="cta-symbol" aria-hidden="true">
          <ArrowUpRight strokeWidth={0.9} />
          <span className="mono">LET’S MAKE IT WORK.</span>
        </div>
      </div>
    </section>
  );
}
export function InlineLink({
  href,
  children,
}: {
  href: string;
  children: ReactNode;
}) {
  return (
    <Link className="inline-link" href={href}>
      {children}
      <ArrowRight size={17} />
    </Link>
  );
}
