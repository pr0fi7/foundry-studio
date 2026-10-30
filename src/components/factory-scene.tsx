"use client";
import { useEffect, useRef, useState, type RefObject } from "react";
import { Blocks, Check, Wrench } from "lucide-react";
import { FactoryArt } from "./factory-art";

type Mode = "build" | "fix";
const demo = {
  build: {
    status: [
      "DRAFTING THE BLUEPRINT",
      "ASSEMBLING THE PRODUCT",
      "RUNNING THE TESTS",
      "READY FOR WHAT’S NEXT",
    ],
    meter: "BUILD PROGRESS",
    values: [12, 58, 86, 100],
    notes: ["SCOPE", "ASSEMBLY", "QA", "LIVE · v1.0"],
    log: [
      "› sketch the scope",
      "› assemble ui + api",
      "› run 128 checks",
      "✓ v1.0 shipped",
    ],
  },
  fix: {
    status: [
      "INSPECTING & REPAIRING",
      "PATCHING 3 ISSUES",
      "VERIFYING THE FIX",
      "BACK IN WORKING ORDER",
    ],
    meter: "SYSTEM HEALTH",
    values: [34, 63, 88, 99],
    notes: ["3 ISSUES", "1 ISSUE", "0 ISSUES", "ALL CLEAR"],
    log: [
      "› trace 3 faults",
      "› patch & refactor",
      "› 0 failing tests",
      "✓ stable in prod",
    ],
  },
};
/** How long each stage of the hero demonstration holds, in milliseconds. */
const timings = [1900, 2600, 1800];
const restBeforeSwitch = 3600;

export const prefersReducedMotion = () =>
  window.matchMedia("(prefers-reduced-motion: reduce)").matches;

/** Marks an element as running only while it is visible and the tab is shown. */
function useRunning(ref: RefObject<HTMLElement | null>) {
  useEffect(() => {
    const element = ref.current;
    if (!element) return;
    let visible = true;
    const sync = () => {
      element.dataset.running = String(visible && !document.hidden);
    };
    const observer = new IntersectionObserver(([entry]) => {
      visible = entry.isIntersecting;
      sync();
    });
    observer.observe(element);
    document.addEventListener("visibilitychange", sync);
    sync();
    return () => {
      observer.disconnect();
      document.removeEventListener("visibilitychange", sync);
    };
  }, [ref]);
}

export function useCountTo(target: number) {
  const [value, setValue] = useState(target);
  const current = useRef(target);
  useEffect(() => {
    const from = current.current;
    const start = performance.now();
    const duration = prefersReducedMotion() ? 0 : 900;
    let frame = 0;
    const tick = (now: number) => {
      const t = duration ? Math.min(1, (now - start) / duration) : 1;
      const next = Math.round(from + (target - from) * (1 - (1 - t) ** 3));
      current.current = next;
      setValue(next);
      if (t < 1) frame = requestAnimationFrame(tick);
    };
    frame = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(frame);
  }, [target]);
  return value;
}

export function FactoryScene() {
  const [mode, setMode] = useState<Mode>("build");
  const [stage, setStage] = useState(3);
  const [run, setRun] = useState(0);
  const auto = useRef(true);
  const ref = useRef<HTMLDivElement>(null);
  useRunning(ref);
  const copy = demo[mode];
  const meter = useCountTo(copy.values[stage]);

  // Start the demonstration once the page has assembled the scene.
  useEffect(() => {
    if (prefersReducedMotion()) return;
    const timer = setTimeout(() => {
      setStage(0);
      setRun(1);
    });
    return () => clearTimeout(timer);
  }, []);

  useEffect(() => {
    if (run === 0) return;
    const timers: ReturnType<typeof setTimeout>[] = [];
    let at = 0;
    timings.forEach((duration, i) => {
      at += duration;
      timers.push(setTimeout(() => setStage(i + 1), at));
    });
    const switchMode = () => {
      if (!auto.current) return;
      // Wait for the scene to be on screen before starting another round.
      if (ref.current?.dataset.running !== "true") {
        timers.push(setTimeout(switchMode, 1000));
        return;
      }
      setMode((m) => (m === "build" ? "fix" : "build"));
      setStage(0);
      setRun((r) => r + 1);
    };
    timers.push(setTimeout(switchMode, at + restBeforeSwitch));
    return () => timers.forEach(clearTimeout);
  }, [run]);

  // Let the headline follow along with the demonstration.
  useEffect(() => {
    const hero = ref.current?.closest<HTMLElement>(".hero");
    if (!hero) return;
    hero.dataset.mode = mode;
    hero.dataset.stage = String(stage);
  }, [mode, stage]);

  // A gentle tilt and parallax that follows the pointer.
  useEffect(() => {
    const element = ref.current;
    if (!element || prefersReducedMotion()) return;
    if (!window.matchMedia("(hover: hover) and (pointer: fine)").matches)
      return;
    let frame = 0;
    const onMove = (event: PointerEvent) => {
      const box = element.getBoundingClientRect();
      const x = ((event.clientX - box.left) / box.width) * 2 - 1;
      const y = ((event.clientY - box.top) / box.height) * 2 - 1;
      cancelAnimationFrame(frame);
      frame = requestAnimationFrame(() => {
        element.style.setProperty("--px", x.toFixed(3));
        element.style.setProperty("--py", y.toFixed(3));
      });
    };
    const onLeave = () => {
      cancelAnimationFrame(frame);
      element.style.setProperty("--px", "0");
      element.style.setProperty("--py", "0");
    };
    element.addEventListener("pointermove", onMove);
    element.addEventListener("pointerleave", onLeave);
    return () => {
      cancelAnimationFrame(frame);
      element.removeEventListener("pointermove", onMove);
      element.removeEventListener("pointerleave", onLeave);
    };
  }, []);

  return (
    <div
      className="hero-workshop"
      ref={ref}
      data-mode={mode}
      data-stage={stage}
    >
      <div className="scene-glow" aria-hidden="true" />
      <div className="scene-top">
        <span className="mono">
          <span className="status-dot" /> THE SOFTWARE FACTORY
        </span>
        <span className="mono scene-edition">FIG. 01</span>
      </div>
      <div className="scene-hud" aria-hidden="true">
        <span className="mono">{copy.meter}</span>
        <strong>
          {meter}
          <small>%</small>
        </strong>
        <span className="hud-bar">
          <i style={{ width: `${meter}%` }} />
        </span>
        <span className="mono hud-note">{copy.notes[stage]}</span>
      </div>
      <ol className="scene-log mono" aria-hidden="true" key={`${mode}-${run}`}>
        {copy.log.map((line, i) => (
          <li
            key={line}
            className={i > stage ? "pending" : i === stage ? "current" : ""}
          >
            {line}
          </li>
        ))}
      </ol>
      <FactoryArt mode={mode} stage={stage} intro productKey={run} />
      <div className="scene-bottom">
        <div
          className="mode-switch"
          role="group"
          aria-label="Factory demonstration"
        >
          <span className="mode-thumb" aria-hidden="true" />
          {(["build", "fix"] as const).map((m) => (
            <button
              key={m}
              aria-pressed={m === mode}
              onClick={() => {
                auto.current = false;
                setMode(m);
                setStage(0);
                setRun((r) => r + 1);
              }}
            >
              {m === "build" ? (
                <Blocks size={15} aria-hidden="true" />
              ) : (
                <Wrench size={15} aria-hidden="true" />
              )}
              {m === "build" ? "Build" : "Fix"}
              <span>{m === "build" ? "01" : "02"}</span>
            </button>
          ))}
        </div>
        <span className="mono scene-status" aria-live="polite">
          {stage === 3 ? <Check size={13} /> : <i className="busy-dot" />}
          {copy.status[stage]}
        </span>
      </div>
    </div>
  );
}
