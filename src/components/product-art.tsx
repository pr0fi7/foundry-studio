import {
  Blocks,
  Check,
  FileText,
  Workflow,
  ShieldCheck,
  ArrowUpRight,
  Sparkles,
} from "lucide-react";
export function ProductArt({ kind }: { kind: string }) {
  const analytics = kind === "analytics";
  const automation = kind === "automation";
  const bom = kind === "euroformat";
  const quoting = kind === "qote";
  return (
    <div className={`product-art art-${kind}`} aria-hidden="true">
      <div className="art-grid" />
      <div className="floating-chip">
        <span className="status-dot" />
        {analytics
          ? "TEXT → INSIGHT"
          : automation
            ? "CONNECTED WORKFLOW"
            : quoting
              ? "REQUEST → QUOTE"
              : bom
                ? "SPEC → BOM"
                : "READY FOR PRODUCTION"}
      </div>
      <div className="mock-window">
        <div className="mock-chrome">
          <div>
            <i />
            <i />
            <i />
          </div>
          <span>
            {analytics
              ? "Insights workspace"
              : automation
                ? "Company registry"
                : quoting
                  ? "Renovation request"
                  : bom
                    ? "Elevator BOM"
                    : "Product workspace"}
          </span>
          <ArrowUpRight size={12} />
        </div>
        <div className="mock-body">
          <aside>
            <Blocks size={18} />
            <i />
            <i />
            <i />
            <i />
          </aside>
          <div className="mock-content">
            <span className="mock-label">
              {analytics
                ? "A CLEARER PICTURE"
                : automation
                  ? "LESS MANUAL WORK"
                  : quoting
                    ? "NO SITE VISIT NEEDED"
                    : bom
                      ? "AI WORKFLOW"
                      : "BUILT TO KEEP MOVING"}
            </span>
            <div className="mock-title">
              {analytics
                ? "From text to clarity."
                : automation
                  ? "One source of truth."
                  : quoting
                    ? "Quoted from the office."
                    : bom
                      ? "Specification in. Parts list out."
                      : "Everything, connected."}
            </div>
            {analytics ? (
              <>
                <div className="bar-chart">
                  {[35, 55, 42, 70, 60, 85, 73, 95].map((v, i) => (
                    <i key={i} style={{ height: `${v}%` }} />
                  ))}
                </div>
                <div className="mock-bottom">
                  <span>Patterns</span>
                  <span>Trends</span>
                  <span>Insights</span>
                </div>
              </>
            ) : quoting ? (
              <div className="mock-form mock-quote">
                {["Roofing", "Insulation", "Windows & frames"].map((t) => (
                  <div key={t}>
                    <span>{t}</span>
                    <b>Pre-priced</b>
                  </div>
                ))}
                <div className="mock-success">
                  <Check size={13} /> Checked · sent under your brand
                </div>
              </div>
            ) : bom ? (
              <div className="mock-form mock-quote">
                {["Drive & traction", "Cabin & doors", "Controls & wiring"].map(
                  (t) => (
                    <div key={t}>
                      <span>{t}</span>
                      <b>Listed</b>
                    </div>
                  ),
                )}
                <div className="mock-success">
                  <Check size={13} /> Bill of materials ready
                </div>
              </div>
            ) : automation ? (
              <div className="mock-form">
                {["Company name", "Registry number", "Registered address"].map(
                  (t) => (
                    <div key={t}>
                      <span>{t}</span>
                      <Check size={14} />
                    </div>
                  ),
                )}
                <div className="mock-success">
                  <Check size={13} /> Details connected
                </div>
              </div>
            ) : (
              <>
                <div className="mock-nodes">
                  <span>
                    <FileText size={23} />
                  </span>
                  <i />
                  <span className="node-main">
                    <Sparkles size={26} />
                  </span>
                  <i />
                  <span>
                    <ShieldCheck size={23} />
                  </span>
                </div>
                <div className="mock-success">
                  <Check size={13} /> Systems working together
                </div>
              </>
            )}
          </div>
        </div>
      </div>
      <div className="art-cube">
        <Workflow size={30} strokeWidth={1.4} />
      </div>
    </div>
  );
}
