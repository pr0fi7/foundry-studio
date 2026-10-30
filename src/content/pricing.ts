import { siteConfig } from "./site-config";
import type { Step } from "./services";

const euro = new Intl.NumberFormat("en-GB", {
  style: "currency",
  currency: "EUR",
  maximumFractionDigits: 0,
});

/** The indicative price of a step, or its note when no price is published. */
export function formatPrice(step: Step) {
  if (!siteConfig.showIndicativePrices || !step.minEUR) return step.priceNote;
  return step.maxEUR
    ? `${euro.format(step.minEUR)}–${euro.format(step.maxEUR)}`
    : `From ${euro.format(step.minEUR)}`;
}

export const priceFactors = [
  [
    "Product complexity",
    "How much behaviour, design, and testing the work needs.",
  ],
  [
    "State of the code",
    "What can be reused, what is risky, and what needs repair.",
  ],
  [
    "Integrations & data",
    "The systems involved, data migration, and the failure cases to handle.",
  ],
  [
    "Risk & responsibility",
    "Security, uptime, and liability expectations for the finished work.",
  ],
] as const;
