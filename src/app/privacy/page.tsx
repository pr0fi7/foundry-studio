import { LegalPage } from "@/components/legal-page";
import { pageMetadata } from "@/lib/seo";
export const metadata = pageMetadata(
  "Privacy — legal review required",
  "Draft privacy template describing the enquiry form and the business details requiring legal review.",
  "/privacy",
);
export default function Page() {
  return <LegalPage kind="privacy" />;
}
