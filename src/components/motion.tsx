"use client";
import { useEffect } from "react";
import { usePathname } from "next/navigation";

/** Counts every number inside a short metric such as "~50%" or "2–3k". */
function countUp(element: HTMLElement, duration = 1300) {
  const final = element.textContent ?? "";
  const numbers = final.match(/\d+(\.\d+)?/g);
  if (!numbers) return;
  const start = performance.now();
  const tick = (now: number) => {
    const t = Math.min(1, (now - start) / duration);
    const eased = 1 - (1 - t) ** 3;
    let i = 0;
    element.textContent = final.replace(/\d+(\.\d+)?/g, () => {
      const value = Number(numbers[i++]) * eased;
      return String(Math.round(value));
    });
    if (t < 1) requestAnimationFrame(tick);
    else element.textContent = final;
  };
  requestAnimationFrame(tick);
}

const spotlight = ".offer-card, .step-card, .project-card";

export function MotionEnhancer() {
  const path = usePathname();
  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    let disposed = false;
    let cleanup: (() => void) | undefined;
    // Pointer spotlight on cards; purely decorative, set through CSS variables.
    const onMove = (event: PointerEvent) => {
      const card = (event.target as Element | null)?.closest<HTMLElement>(
        spotlight,
      );
      if (!card) return;
      const box = card.getBoundingClientRect();
      card.style.setProperty("--mx", `${event.clientX - box.left}px`);
      card.style.setProperty("--my", `${event.clientY - box.top}px`);
    };
    document.addEventListener("pointermove", onMove, { passive: true });
    void Promise.all([import("gsap"), import("gsap/ScrollTrigger")]).then(
      ([{ gsap }, { ScrollTrigger }]) => {
        if (disposed) return;
        gsap.registerPlugin(ScrollTrigger);
        document.documentElement.classList.add("motion-ready");
        // Only content that starts below the fold is hidden, so nothing the
        // visitor can already see ever disappears.
        const below = (element: Element) =>
          element.getBoundingClientRect().top > window.innerHeight * 0.95;
        const context = gsap.context(() => {
          const reveals = gsap.utils.toArray<HTMLElement>("[data-reveal]");
          reveals.forEach((element) => {
            ScrollTrigger.create({
              trigger: element,
              start: "top 92%",
              once: true,
              onEnter: () => element.classList.add("is-in"),
            });
          });
          const hidden = reveals.filter(below);
          gsap.set(hidden, { autoAlpha: 0, y: 56 });
          ScrollTrigger.batch(hidden, {
            start: "top 92%",
            once: true,
            onEnter: (batch) =>
              gsap.to(batch, {
                autoAlpha: 1,
                y: 0,
                duration: 0.9,
                ease: "power3.out",
                stagger: 0.11,
                overwrite: true,
                clearProps: "transform,visibility,opacity",
              }),
          });
          gsap.utils
            .toArray<HTMLElement>(
              ".section-heading h2, .story-head h2, .cta h2, .faq-preview h2",
            )
            .filter(below)
            .forEach((heading) => {
              gsap.fromTo(
                heading,
                { clipPath: "inset(0 0 100% 0)", y: 42 },
                {
                  clipPath: "inset(0 0 -20% 0)",
                  y: 0,
                  duration: 1,
                  ease: "power4.out",
                  clearProps: "clipPath,transform",
                  scrollTrigger: { trigger: heading, start: "top 90%" },
                },
              );
            });
          gsap.utils.toArray<HTMLElement>("[data-count]").forEach((metric) => {
            ScrollTrigger.create({
              trigger: metric,
              start: "top 92%",
              once: true,
              onEnter: () => countUp(metric),
            });
          });
          gsap.utils
            .toArray<HTMLElement>(".project-image .product-art")
            .forEach((art) => {
              gsap.fromTo(
                art,
                { yPercent: 6 },
                {
                  yPercent: -6,
                  ease: "none",
                  scrollTrigger: {
                    trigger: art.parentElement,
                    start: "top bottom",
                    end: "bottom top",
                    scrub: true,
                  },
                },
              );
            });
          gsap.utils
            .toArray<HTMLElement>(".cta-symbol > svg")
            .forEach((arrow) => {
              gsap.fromTo(
                arrow,
                { rotate: -90, scale: 0.7 },
                {
                  rotate: 0,
                  scale: 1,
                  ease: "none",
                  scrollTrigger: {
                    trigger: arrow,
                    start: "top bottom",
                    end: "center 55%",
                    scrub: 0.6,
                  },
                },
              );
            });
          const bar = document.querySelector<HTMLElement>(".scroll-progress");
          if (bar)
            ScrollTrigger.create({
              start: 0,
              end: "max",
              onUpdate: (self) =>
                bar.style.setProperty("--progress", self.progress.toFixed(4)),
            });
          const header = document.querySelector(".site-header");
          if (header)
            ScrollTrigger.create({
              start: 24,
              end: "max",
              toggleClass: { targets: header, className: "is-scrolled" },
            });
        });
        cleanup = () => {
          context.revert();
          document.documentElement.classList.remove("motion-ready");
        };
      },
    );
    return () => {
      disposed = true;
      document.removeEventListener("pointermove", onMove);
      cleanup?.();
    };
  }, [path]);
  return null;
}
