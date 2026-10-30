"use client";
import {
  useEffect,
  useRef,
  useState,
  type ComponentType,
  type CSSProperties,
} from "react";
import {
  ArrowDown,
  Check,
  Search,
  Wrench,
  ShieldCheck,
  PackageCheck,
} from "lucide-react";
import { Eyebrow } from "./ui";
import { prefersReducedMotion, useCountTo } from "./factory-scene";

/** idle: not reached yet; run: playing now; done: already passed. */
type PanelState = "idle" | "run" | "done";
const vars = (values: Record<string, number | string>) =>
  values as CSSProperties;

function MockBar({ title }: { title: string }) {
  return (
    <div className="mock-bar">
      <i />
      <i />
      <i />
      <span>{title}</span>
    </div>
  );
}

// Token kinds and widths (%) for an abstract piece of code.
const code: [string, number][][] = [
  [
    ["k", 14],
    ["f", 30],
    ["p", 18],
  ],
  [
    ["sp", 6],
    ["k", 10],
    ["p", 26],
    ["s", 20],
  ],
  [
    ["sp", 6],
    ["f", 22],
    ["p", 34],
  ],
  [
    ["sp", 12],
    ["k", 12],
    ["p", 18],
    ["f", 24],
  ],
  [
    ["sp", 12],
    ["p", 40],
  ],
  [
    ["sp", 6],
    ["k", 16],
    ["s", 28],
  ],
  [
    ["sp", 6],
    ["f", 18],
    ["p", 22],
    ["p", 12],
  ],
  [
    ["sp", 12],
    ["s", 34],
  ],
  [
    ["sp", 6],
    ["k", 10],
    ["p", 30],
  ],
  [["p", 8]],
];
const flagged: Record<number, "high" | "mid"> = {
  2: "high",
  5: "mid",
  7: "high",
};

function InspectArt() {
  return (
    <div className="mock mock-editor">
      <MockBar title="checkout.ts" />
      <div className="code">
        {code.map((tokens, i) => (
          <div
            key={i}
            className={`code-line ${flagged[i] ? `flag flag-${flagged[i]}` : ""}`}
            style={vars({ "--i": i })}
          >
            <span className="ln">{41 + i}</span>
            {tokens.map(([kind, width], j) => (
              <i
                key={j}
                className={`tok tok-${kind}`}
                style={{ width: `${width}%` }}
              />
            ))}
            {flagged[i] && <b className="flag-mark">!</b>}
          </div>
        ))}
        <span className="scan-sweep" />
      </div>
      <ul className="findings">
        <li className="findings-title">3 findings</li>
        <li>
          <span className="sev sev-high" />
          N+1 query in checkout
        </li>
        <li>
          <span className="sev sev-mid" />
          Token refresh race
        </li>
        <li>
          <span className="sev sev-high" />
          Billing has no tests
        </li>
      </ul>
    </div>
  );
}

function EngineerArt() {
  const blocks = ["nav", "side", "head", "chart", "card", "card2"];
  return (
    <div className="mock mock-app">
      <MockBar title="app.yourproduct.com" />
      <div className="app">
        {blocks.map((b) => (
          <span key={`slot-${b}`} className={`slot a-${b}`} />
        ))}
        <div className="blk a-nav">
          <i />
          <i />
          <i />
        </div>
        <div className="blk a-side">
          <i />
          <i />
          <i />
          <i />
        </div>
        <div className="blk a-head">
          <i />
          <i />
        </div>
        <div className="blk a-chart">
          {[38, 62, 46, 78, 58, 92, 70].map((h, i) => (
            <i key={i} style={vars({ "--h": `${h}%`, "--i": i })} />
          ))}
        </div>
        <div className="blk a-card">
          <i />
          <i />
        </div>
        <div className="blk a-card2">
          <i />
          <i />
        </div>
      </div>
      <ul className="commits">
        <li>feat: checkout flow</li>
        <li>feat: billing api</li>
        <li>refactor: auth tokens</li>
      </ul>
    </div>
  );
}

const tests = [
  ["checkout › applies discount", "38ms"],
  ["auth › refreshes token once", "52ms"],
  ["billing › retries webhook", "61ms"],
  ["perf › p95 under 200ms", "1.2s"],
  ["security › strict headers", "17ms"],
];
function VerifyArt({ state }: { state: PanelState }) {
  const passed = useCountTo(state === "idle" ? 0 : 128);
  return (
    <div className="mock mock-tests">
      <MockBar title="test run · main" />
      <div className="tests-head">
        <strong>
          {passed}
          <small>/128</small>
        </strong>
        <span>passing</span>
      </div>
      <ul className="tests">
        {tests.map(([name, time], i) => (
          <li key={name} style={vars({ "--i": i })}>
            <span className="t-state">
              <i className="t-spin" />
              <Check className="t-ok" size={13} strokeWidth={3} />
            </span>
            <span className="t-name">{name}</span>
            <span className="t-time">{time}</span>
          </li>
        ))}
      </ul>
      <div className="tests-foot">
        <div className="coverage">
          <svg viewBox="0 0 64 64">
            <circle cx="32" cy="32" r="26" />
            <circle className="coverage-fill" cx="32" cy="32" r="26" />
          </svg>
          <span>
            94%
            <small>coverage</small>
          </span>
        </div>
        <div className="latency">
          <svg viewBox="0 0 160 48" preserveAspectRatio="none">
            <path
              className="latency-line"
              pathLength={1}
              d="M0 14 L16 22 L32 12 L48 30 L64 26 L80 34 L96 31 L112 38 L128 36 L144 40 L160 39"
            />
          </svg>
          <span>
            p95 180ms <small>after fixes</small>
          </span>
        </div>
      </div>
    </div>
  );
}

function LaunchArt() {
  return (
    <div className="mock mock-deploy">
      <MockBar title="deploy · production" />
      <ol className="pipeline">
        {["Build", "Test", "Deploy", "Live"].map((step, i) => (
          <li key={step} style={vars({ "--i": i })}>
            <span className="node" />
            {step}
          </li>
        ))}
        <span className="pipeline-pulse" />
      </ol>
      <div className="live">
        <span className="live-pill">
          <i />
          LIVE
        </span>
        <span className="live-version">v1.0.0 · eu-central</span>
        <span className="burst">
          {Array.from({ length: 10 }, (_, i) => (
            <i key={i} style={vars({ "--a": `${i * 36}deg` })} />
          ))}
        </span>
      </div>
      <div className="uptime">
        {Array.from({ length: 30 }, (_, i) => (
          <i
            key={i}
            style={vars({ "--h": `${70 + ((i * 53) % 30)}%`, "--i": i })}
          />
        ))}
      </div>
      <div className="uptime-label">
        <span>99.98% uptime</span>
        <span>last 30 days</span>
      </div>
    </div>
  );
}

const stations: {
  name: string;
  status: string;
  text: string;
  Icon: typeof Search;
  Art: ComponentType<{ state: PanelState }>;
}[] = [
  {
    name: "Inspect",
    status: "INSPECTING",
    text: "We find what’s slowing your product down—or map what needs building.",
    Icon: Search,
    Art: InspectArt,
  },
  {
    name: "Engineer",
    status: "ASSEMBLING",
    text: "We design and ship the code that actually solves the problem.",
    Icon: Wrench,
    Art: EngineerArt,
  },
  {
    name: "Verify",
    status: "TESTING",
    text: "Tests, performance checks, security, and real-world validation.",
    Icon: ShieldCheck,
    Art: VerifyArt,
  },
  {
    name: "Launch",
    status: "READY",
    text: "A product ready to run, and code you can keep improving.",
    Icon: PackageCheck,
    Art: LaunchArt,
  },
];

export function ProductionLine() {
  // -1 until the section is reached; Infinity marks every station as done.
  const [active, setActive] = useState(Infinity);
  const ref = useRef<HTMLElement>(null);
  useEffect(() => {
    const section = ref.current;
    if (!section || prefersReducedMotion()) return;
    const horizontal = window.matchMedia(
      "(min-width: 900px) and (min-height: 600px)",
    ).matches;
    let disposed = false;
    let cleanup: (() => void) | undefined;
    void Promise.all([import("gsap"), import("gsap/ScrollTrigger")]).then(
      ([{ gsap }, { ScrollTrigger }]) => {
        if (disposed) return;
        gsap.registerPlugin(ScrollTrigger);
        // Classes go straight onto the element so the layout is measurable now.
        section.classList.add("story-anim");
        if (horizontal) section.classList.add("story-h");
        setActive(-1);
        const panels = gsap.utils.toArray<HTMLElement>(".story-panel", section);
        const context = gsap.context(() => {
          if (!horizontal) {
            panels.forEach((panel, i) => {
              ScrollTrigger.create({
                trigger: panel,
                start: "top 70%",
                onEnter: () => setActive(i),
                onLeaveBack: () => setActive(i - 1),
              });
            });
            return;
          }
          const pin = section.querySelector<HTMLElement>(".story-pin")!;
          const track = section.querySelector<HTMLElement>(".story-track")!;
          const rail = section.querySelector<HTMLElement>(".story-rail")!;
          const distance = () => {
            const first = panels[0];
            const last = panels[panels.length - 1];
            return (
              last.offsetLeft +
              last.offsetWidth +
              first.offsetLeft -
              track.parentElement!.clientWidth
            );
          };
          let armed = false;
          const update = (progress: number) => {
            rail.style.setProperty("--p", progress.toFixed(4));
            const x = Number(gsap.getProperty(track, "x"));
            const width = window.innerWidth;
            panels.forEach((panel) => {
              const center = panel.offsetLeft + panel.offsetWidth / 2 + x;
              const d = Math.max(-1, Math.min(1, (center - width / 2) / width));
              panel.style.transform = `perspective(1600px) rotateY(${(d * -16).toFixed(2)}deg) scale(${(1 - Math.abs(d) * 0.1).toFixed(3)})`;
              panel.style.setProperty(
                "--dim",
                Math.min(1, Math.abs(d) * 1.7).toFixed(3),
              );
              panel.style.setProperty("--d", d.toFixed(3));
            });
            if (armed) setActive(Math.round(progress * (panels.length - 1)));
          };
          let progress = 0;
          gsap.to(track, {
            x: () => -distance(),
            ease: "none",
            scrollTrigger: {
              trigger: pin,
              pin: true,
              start: "top top",
              end: () => `+=${distance() * 1.3}`,
              scrub: 0.8,
              invalidateOnRefresh: true,
            },
            onUpdate() {
              progress = this.progress();
              update(progress);
            },
          });
          ScrollTrigger.create({
            trigger: section,
            start: "top 45%",
            onEnter: () => {
              armed = true;
              update(progress);
            },
            onLeaveBack: () => {
              armed = false;
              setActive(-1);
            },
          });
          update(0);
        }, section);
        cleanup = () => {
          context.revert();
          section.classList.remove("story-anim", "story-h");
          panels.forEach((panel) => panel.removeAttribute("style"));
        };
      },
    );
    return () => {
      disposed = true;
      cleanup?.();
    };
  }, []);
  const current = Math.min(stations.length - 1, Math.max(0, active));
  return (
    <section className="factory-story" ref={ref}>
      <div className="story-pin">
        <div className="container story-head">
          <div>
            <Eyebrow light>FROM PROBLEM TO PRODUCTION</Eyebrow>
            <h2>
              Good software.
              <br />
              No loose ends.
            </h2>
          </div>
          <div className="story-meta">
            <p>One connected process. Care at every station.</p>
            <span className="story-counter mono" aria-hidden="true">
              <strong>0{current + 1}</strong> / 04 · {stations[current].status}
            </span>
          </div>
        </div>
        <div className="story-viewport">
          <div className="story-track">
            {stations.map(({ name, status, text, Icon, Art }, i) => {
              const state: PanelState =
                i < active ? "done" : i === active ? "run" : "idle";
              return (
                <article
                  className={`story-panel is-${state}`}
                  data-num={`0${i + 1}`}
                  key={name}
                >
                  <div className="panel-copy">
                    <span className="mono panel-status">
                      0{i + 1} · {status}
                    </span>
                    <h3>
                      {name}
                      <Icon size={26} aria-hidden="true" />
                    </h3>
                    <p>{text}</p>
                    {i === 3 && (
                      <a href="/contact" className="inline-link">
                        Let’s get started <ArrowDown size={16} />
                      </a>
                    )}
                  </div>
                  <div className="panel-art" aria-hidden="true">
                    <Art state={state} />
                  </div>
                </article>
              );
            })}
          </div>
        </div>
        <div className="container story-rail" aria-hidden="true">
          <span className="rail-line">
            <span className="rail-fill" />
            <span className="rail-package" />
          </span>
          <ol>
            {stations.map(({ name }, i) => (
              <li key={name} className={i <= active ? "reached" : ""}>
                {name}
              </li>
            ))}
          </ol>
        </div>
      </div>
    </section>
  );
}
