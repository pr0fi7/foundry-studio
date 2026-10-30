import { LegalPage } from "@/components/legal-page";
import { pageMetadata } from "@/lib/seo";
export const metadata = pageMetadata(
  "Terms — legal review required",
  "Draft terms for review. Business identity, engagement terms, jurisdiction, and legal provisions must be confirmed.",
  "/terms",
);
export default function Page() {
  return <LegalPage kind="terms" />;
}
