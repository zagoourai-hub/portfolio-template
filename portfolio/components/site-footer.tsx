"use client";

import Link from "next/link";
import { ArrowUp, Code2, Mail } from "lucide-react";
import { GithubIcon } from "@/components/icons";
import { siteConfig } from "@/data/portfolio";

export function SiteFooter() {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <footer className="border-t border-[var(--line)] bg-[var(--paper-raised)] py-12">
      <div className="page-shell space-y-8">
        <div className="flex flex-col gap-6 md:flex-row md:items-center md:justify-between border-b border-[var(--line)] pb-8">
          <div className="space-y-2">
            <Link className="brand-mark focus-ring" href="/">
              <Code2 className="h-5 w-5 text-[var(--accent)]" />
              <span>{siteConfig.handle}</span>
            </Link>
            <p className="text-xs text-[var(--muted-foreground)] max-w-md">
              {siteConfig.bio}
            </p>
          </div>

          <div className="flex flex-wrap items-center gap-4">
            <a
              href={siteConfig.github}
              target="_blank"
              rel="noopener noreferrer"
              className="button-outline focus-ring text-xs py-1.5 px-3 min-h-0"
            >
              <GithubIcon className="h-3.5 w-3.5" />
              <span>GitHub</span>
            </a>
            <a
              href={`mailto:${siteConfig.email}`}
              className="button-outline focus-ring text-xs py-1.5 px-3 min-h-0"
            >
              <Mail className="h-3.5 w-3.5" />
              <span>Email</span>
            </a>
            <button
              onClick={scrollToTop}
              className="button-secondary focus-ring text-xs py-1.5 px-3 min-h-0"
              type="button"
              aria-label="Back to top"
            >
              <ArrowUp className="h-3.5 w-3.5" />
              <span>Top</span>
            </button>
          </div>
        </div>

        <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between text-xs font-mono text-[var(--muted-foreground)]">
          <p>© {new Date().getFullYear()} {siteConfig.name}. Open-source template for student developers.</p>
          <div className="flex items-center gap-3">
            <span>Built with Next.js 16 & Tailwind v4</span>
            <span className="text-[var(--accent)]">•</span>
            <span>Anti-AI-Slop Edition</span>
          </div>
        </div>
      </div>
    </footer>
  );
}
