"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { ArrowUpRight, Code2, Menu, X } from "lucide-react";

import { siteConfig } from "@/data/portfolio";

export function SiteHeader() {
  const [isOpen, setIsOpen] = useState(false);
  const pathname = usePathname();

  useEffect(() => {
    const closeOnEscape = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        setIsOpen(false);
      }
    };

    window.addEventListener("keydown", closeOnEscape);
    return () => window.removeEventListener("keydown", closeOnEscape);
  }, []);

  return (
    <header className="site-header">
      <div className="page-shell flex min-h-16 items-center justify-between gap-4">
        <Link
          className="brand-mark focus-ring"
          href="/"
          onClick={() => setIsOpen(false)}
        >
          <Code2 className="h-5 w-5 text-[var(--accent)]" />
          <span>risz@dev:<span className="brand-prompt">~$</span></span>
        </Link>

        <div className="hidden items-center gap-6 md:flex">
          <nav aria-label="Navigasi utama" className="flex items-center gap-6">
            {siteConfig.navigation.map((item) => {
              const isActive = pathname === item.href;
              return (
                <Link
                  className={`nav-link focus-ring ${isActive ? "active" : ""}`}
                  href={item.href}
                  key={item.href}
                >
                  {isActive && <span className="text-[var(--accent)] mr-1">&gt;</span>}
                  {item.label}
                </Link>
              );
            })}
          </nav>

          <div className="h-4 w-px bg-[var(--line)]" />

          <div className="status-badge">
            <span className="dot-live" />
            <span>STUDENT DEV // 2026</span>
          </div>

          <a
            href={siteConfig.github}
            target="_blank"
            rel="noopener noreferrer"
            className="button-outline focus-ring text-xs py-1.5 px-3 min-h-0"
          >
            <span>GitHub</span>
            <ArrowUpRight className="h-3.5 w-3.5" />
          </a>
        </div>

        <button
          aria-controls="mobile-navigation"
          aria-expanded={isOpen}
          aria-label="Toggle mobile menu"
          className="menu-button focus-ring flex md:hidden"
          onClick={() => setIsOpen((open) => !open)}
          type="button"
        >
          {isOpen ? <X className="h-4 w-4" /> : <Menu className="h-4 w-4" />}
          <span>{isOpen ? "Close" : "Menu"}</span>
        </button>
      </div>

      <nav
        aria-label="Navigasi mobile"
        className={isOpen ? "mobile-navigation is-open" : "mobile-navigation"}
        id="mobile-navigation"
      >
        <div className="page-shell flex flex-col py-6 space-y-2">
          {siteConfig.navigation.map((item) => (
            <Link
              className="mobile-nav-link focus-ring"
              href={item.href}
              key={item.href}
              onClick={() => setIsOpen(false)}
            >
              <span>{item.label}</span>
              <ArrowUpRight className="h-4 w-4 text-[var(--accent)]" />
            </Link>
          ))}
          <div className="pt-4 flex items-center justify-between border-t border-[var(--line)]">
            <div className="status-badge">
              <span className="dot-live" />
              <span>ONLINE</span>
            </div>
            <a
              href={siteConfig.github}
              target="_blank"
              rel="noopener noreferrer"
              className="text-xs font-mono text-[var(--accent)] hover:underline"
            >
              github.com/riszdeveloper ↗
            </a>
          </div>
        </div>
      </nav>
    </header>
  );
}
