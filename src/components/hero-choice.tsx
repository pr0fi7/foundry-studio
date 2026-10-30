"use client";
import { createContext, useContext, useState, type ReactNode } from "react";
import { Button } from "./ui";

export type Mode = "build" | "fix";
const nextStep = {
  build: { label: "Start your MVP", href: "/services/mvp-factory" },
  fix: { label: "Book a diagnosis", href: "/services/product-rescue" },
};
const HeroChoice = createContext<{
  choice: Mode | null;
  choose: (mode: Mode) => void;
}>({ choice: null, choose: () => {} });

/** Remembers the mode the visitor picked; the automatic demo never sets it. */
export function HeroChoiceProvider({ children }: { children: ReactNode }) {
  const [choice, choose] = useState<Mode | null>(null);
  return (
    <HeroChoice.Provider value={{ choice, choose }}>
      {children}
    </HeroChoice.Provider>
  );
}
export function useHeroChoice() {
  return useContext(HeroChoice).choose;
}
/** Stays put during the demo, and points at a service once the visitor picks. */
export function HeroSecondaryAction() {
  const { choice } = useContext(HeroChoice);
  return choice ? (
    <Button href={nextStep[choice].href} variant="secondary">
      {nextStep[choice].label}
    </Button>
  ) : (
    <Button href="#services" variant="secondary" arrow={false}>
      Compare the services
    </Button>
  );
}
