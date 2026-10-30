import { Breadcrumbs, PageIntro, CallToAction } from "@/components/ui";
import { WorkFilter } from "@/components/work-filter";
import { pageMetadata } from "@/lib/seo";
export const metadata = pageMetadata(
  "Work",
  "Qote, built from scratch; Pam by Harmix, repaired, moved to new infrastructure, and supported through SOC 2 and GDPR; and Euroformat’s core operations, moved onto AI workflows.",
  "/work",
);
export default function WorkPage() {
  return (
    <>
      <div className="container">
        <Breadcrumbs items={[{ label: "Work" }]} />
        <PageIntro
          eyebrow="QUALITY CHECK / RECENT WORK"
          title="Things that made it through the workshop."
          description="A selection of software challenges, technical outcomes, and product improvements."
        />
        <section className="work-list-section" aria-label="Projects">
          <WorkFilter />
        </section>
      </div>
      <CallToAction title="Your product could be the next conversation." />
    </>
  );
}
