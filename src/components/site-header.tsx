"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useRef } from "react";
import { ArrowUpRight, Menu, X } from "lucide-react";
import { siteConfig, navigation } from "@/content/site-config";
export function Brand() {
  return (
    <Link
      href="/"
      className="brand"
      aria-label={`${siteConfig.brandName} home`}
    >
      <span className="brand-mark" aria-hidden="true">
        <i />
        <i />
        <i />
      </span>
      <span>
        {siteConfig.brandName}
        <span className="brand-period">.</span>
      </span>
    </Link>
  );
}
export function SiteHeader() {
  const pathname = usePathname();
  const menu = useRef<HTMLDetailsElement>(null);
  const close = () => {
    if (menu.current) menu.current.open = false;
  };
  return (
    <header className="site-header">
      <div className="header-inner">
        <Brand />
        <nav className="desktop-nav" aria-label="Main navigation">
          {navigation.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              aria-current={
                pathname === item.href || pathname.startsWith(item.href + "/")
                  ? "page"
                  : undefined
              }
            >
              {item.label}
            </Link>
          ))}
        </nav>
        <Link className="button button-primary header-cta" href="/contact">
          Let’s talk <ArrowUpRight size={17} />
        </Link>
        <details
          className="mobile-menu"
          ref={menu}
          onKeyDown={(event) => {
            if (event.key === "Escape") {
              close();
              menu.current?.querySelector("summary")?.focus();
            }
          }}
        >
          <summary aria-label="Toggle navigation">
            <Menu className="menu-open" />
            <X className="menu-close" />
          </summary>
          <nav aria-label="Mobile navigation">
            {navigation.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                onClick={close}
                aria-current={
                  pathname === item.href || pathname.startsWith(item.href + "/")
                    ? "page"
                    : undefined
                }
              >
                {item.label}
                <ArrowUpRight size={18} />
              </Link>
            ))}
            <Link href="/contact" onClick={close} className="mobile-contact">
              Let’s talk <ArrowUpRight size={18} />
            </Link>
          </nav>
        </details>
      </div>
    </header>
  );
}
