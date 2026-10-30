import {
  Breadcrumbs,
  PageIntro,
  FaqAccordion,
  CallToAction,
  Eyebrow,
  Button,
  ServiceIcon,
} from "@/components/ui";
import { services } from "@/content/services";
import { formatPrice, priceFactors } from "@/content/pricing";
import { siteConfig } from "@/content/site-config";
import { pickFaqs } from "@/content/faq";
import { pageMetadata } from "@/lib/seo";
export const metadata = pageMetadata(
  "Pricing",
  "How Product Rescue, MVP Factory, and Automation & Integration are priced: a small fixed-fee first step, then a written proposal for the rest.",
  "/pricing",
);
export default function PricingPage() {
  return (
    <>
      <div className="container">
        <Breadcrumbs items={[{ label: "Pricing" }]} />
        <PageIntro
          eyebrow="CLEAR SCOPE. CLEAR PRICE."
          title="Know the first step before you take it."
          description="Every service starts small and fixed. The bigger work is priced in writing once we both understand the problem."
        />
        <div className="price-ladders">
          {services.map((s) => (
            <section
              className={`price-ladder offer-${s.icon}`}
              key={s.slug}
              aria-labelledby={`price-${s.slug}`}
              data-reveal
            >
              <div className="price-ladder-head">
                <span className="icon-box">
                  <ServiceIcon name={s.icon} />
                </span>
                <div>
                  <h2 id={`price-${s.slug}`}>{s.name}</h2>
                  <p>{s.buyer}</p>
                </div>
                <Button href={`/services/${s.slug}`} variant="text">
                  Details
                </Button>
              </div>
              <div className="table-scroll">
                {/* Explicit roles keep the table's meaning when phones stack it. */}
                <table role="table">
                  <caption className="sr-only">{s.name} pricing</caption>
                  <thead role="rowgroup">
                    <tr role="row">
                      <th scope="col" role="columnheader">
                        Step
                      </th>
                      <th scope="col" role="columnheader">
                        {siteConfig.showIndicativePrices
                          ? "Indicative price"
                          : "Price"}
                      </th>
                      <th scope="col" role="columnheader">
                        How it’s agreed
                      </th>
                    </tr>
                  </thead>
                  <tbody role="rowgroup">
                    {s.steps.map((step) => (
                      <tr key={step.name} role="row">
                        <th scope="row" role="rowheader">
                          {step.name}
                          {step.optional && (
                            <span className="muted"> (optional)</span>
                          )}
                        </th>
                        {formatPrice(step) === step.priceNote ? (
                          <td colSpan={2} className="is-note" role="cell">
                            {step.priceNote}
                          </td>
                        ) : (
                          <>
                            <td role="cell">{formatPrice(step)}</td>
                            <td role="cell">{step.priceNote}</td>
                          </>
                        )}
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </section>
          ))}
        </div>
        {siteConfig.showIndicativePrices && (
          <div className="notice">
            <strong>Indicative prices, not quotes.</strong>
            <p>
              These ranges show where typical engagements start. The price you
              pay is fixed in a written proposal before work begins, and covers
              the scope, schedule, third-party costs, and applicable tax.
            </p>
          </div>
        )}
        <section className="section quote-factors">
          <div>
            <Eyebrow>WHAT CHANGES THE PRICE?</Eyebrow>
            <h2>The details behind the proposal.</h2>
            <p>
              We make assumptions visible so you can make informed decisions. If
              the scope changes, we explain the effect on cost and timing before
              doing the extra work.
            </p>
          </div>
          <div className="factor-grid">
            {priceFactors.map(([title, text]) => (
              <article key={title}>
                <h3>{title}</h3>
                <p>{text}</p>
              </article>
            ))}
          </div>
        </section>
        <section className="section faq-preview">
          <div>
            <Eyebrow>BEFORE YOU COMMIT</Eyebrow>
            <h2>Fair questions.</h2>
          </div>
          <FaqAccordion
            items={pickFaqs([
              "diagnosis",
              "estimate",
              "mvp-price",
              "ownership",
            ])}
          />
        </section>
      </div>
      <CallToAction title="Let’s find the right first step." />
    </>
  );
}
