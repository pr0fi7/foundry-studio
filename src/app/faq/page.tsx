import {
  Breadcrumbs,
  PageIntro,
  FaqAccordion,
  CallToAction,
} from "@/components/ui";
import { pageMetadata } from "@/lib/seo";
export const metadata = pageMetadata(
  "Frequently asked questions",
  "Answers about new products, existing codebases, pricing, timelines, ownership, confidentiality, and support.",
  "/faq",
);
export default function FaqPage() {
  return (
    <>
      <div className="container narrow">
        <Breadcrumbs items={[{ label: "FAQ" }]} />
        <PageIntro
          eyebrow="BEFORE WE GET TO WORK"
          title="Good questions. Straight answers."
          description="A little clarity on building, fixing, and working together."
        />
        <FaqAccordion />
      </div>
      <CallToAction
        title="Something else on your mind?"
        text="Tell us a little about your product. We can work through the specifics together."
      />
    </>
  );
}
