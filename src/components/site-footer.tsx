import Link from "next/link";
import { siteConfig } from "@/content/site-config";
import { services } from "@/content/services";
import { Brand } from "./site-header";
import { ArrowUpRight } from "lucide-react";
export function SiteFooter() {
  return (
    <footer className="site-footer container">
      <div className="footer-main">
        <div className="footer-brand">
          <Brand />
          <p>
            Product Rescue, MVP Factory,
            <br />
            and Automation & Integration.
          </p>
          <Link className="inline-link" href="/contact">
            Start a conversation <ArrowUpRight size={17} />
          </Link>
          {siteConfig.publicEmail && (
            <a href={`mailto:${siteConfig.publicEmail}`}>
              {siteConfig.publicEmail}
            </a>
          )}
        </div>
        <div>
          <h2 className="mono">SERVICES</h2>
          {services.map((s) => (
            <Link href={`/services/${s.slug}`} key={s.slug}>
              {s.name}
            </Link>
          ))}
          <Link href="/services">Compare services</Link>
        </div>
        <div>
          <h2 className="mono">TAKE A LOOK AROUND</h2>
          <Link href="/work">Work</Link>
          <Link href="/pricing">Pricing</Link>
          <Link href="/faq">FAQ</Link>
          <Link href="/contact">Contact</Link>
        </div>
      </div>
      <div className="footer-bottom">
        <span>
          © {new Date().getFullYear()} {siteConfig.brandName}
        </span>
        <span className="footer-tag">
          <span /> Precision. With personality.
        </span>
        <div>
          <Link href="/privacy">Privacy</Link>
          <Link href="/terms">Terms</Link>
          {siteConfig.socialLinks.map((s) => (
            <a key={s.url} href={s.url} rel="noreferrer" target="_blank">
              {s.label}
            </a>
          ))}
        </div>
      </div>
    </footer>
  );
}
