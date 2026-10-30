import { notFound } from "next/navigation";
import { ArrowUpRight } from "lucide-react";
import { projects, domain } from "@/content/projects";
import { services } from "@/content/services";
import {
  Breadcrumbs,
  Eyebrow,
  CallToAction,
  OfferCards,
  Button,
} from "@/components/ui";
import { ProductArt } from "@/components/product-art";
import { pageMetadata } from "@/lib/seo";
import { countable } from "@/components/ui";
export function generateStaticParams() {
  return projects.map(({ slug }) => ({ slug }));
}
export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const p = projects.find((p) => p.slug === slug);
  return p ? pageMetadata(p.name, p.summary, `/work/${slug}`) : {};
}
export default async function ProjectPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const index = projects.findIndex((p) => p.slug === slug);
  if (index < 0) notFound();
  const p = projects[index];
  const next = projects[(index + 1) % projects.length];
  const prev = projects[(index + projects.length - 1) % projects.length];
  return (
    <>
      <div className="container">
        <Breadcrumbs
          items={[{ label: "Work", href: "/work" }, { label: p.name }]}
        />
        <div className="case-heading">
          <div>
            <Eyebrow>{p.category}</Eyebrow>
            <h1>
              {p.name}
              <span>.</span>
            </h1>
            <p className="lede">{p.summary}</p>
          </div>
          <div className="case-credit">
            <span className="mono">OUR PART</span>
            <p>{p.role}</p>
            <a
              className="inline-link"
              href={p.url}
              target="_blank"
              rel="noreferrer"
            >
              Visit {domain(p)}
              <ArrowUpRight size={17} aria-hidden="true" />
              <span className="sr-only"> (opens in a new tab)</span>
            </a>
          </div>
        </div>
        <div className={`case-hero project-${p.slug}`}>
          <ProductArt kind={p.slug} />
          <span className="art-caption">
            ORIGINAL CONCEPTUAL ILLUSTRATION · NOT A PRODUCT SCREENSHOT
          </span>
        </div>
        <div className="case-body">
          <div className="case-label">
            <Eyebrow>WHAT WE DID</Eyebrow>
            <ul className="scope-list">
              {p.scope.map((item) => (
                <li key={item}>{item}</li>
              ))}
            </ul>
          </div>
          <div>
            <section>
              <h2>The challenge.</h2>
              <p>{p.challenge}</p>
            </section>
            <section>
              <h2>What we did.</h2>
              <p>{p.solution}</p>
            </section>
            <section>
              <h2>In numbers.</h2>
              <div className="case-metrics">
                {p.outcomes.map((o) => (
                  <div key={o.label}>
                    <strong data-count={countable(o.value) || undefined}>
                      {o.value}
                    </strong>
                    <span>{o.label}</span>
                  </div>
                ))}
              </div>
              <p className="small muted">
                These figures describe this project, not a promise of future
                results.
              </p>
            </section>
          </div>
        </div>
        <section className="section">
          <Eyebrow>RELATED SERVICES</Eyebrow>
          <h2 className="mb-48">Similar challenge? Start here.</h2>
          <OfferCards
            selected={services.filter((s) =>
              p.relatedServiceSlugs.includes(s.slug),
            )}
          />
        </section>
        <nav className="case-nav" aria-label="Other case studies">
          <Button href={`/work/${prev.slug}`} variant="text">
            Previous: {prev.name}
          </Button>
          <Button href={`/work/${next.slug}`} variant="text">
            Next: {next.name}
          </Button>
        </nav>
      </div>
      <CallToAction title="Have a similar project?" />
    </>
  );
}
