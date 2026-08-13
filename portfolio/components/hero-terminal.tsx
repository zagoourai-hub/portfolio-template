"use client";

import { useState } from "react";
import { Check, Copy, Terminal } from "lucide-react";

export function HeroTerminal() {
  const [copied, setCopied] = useState(false);
  const [activeTab, setActiveTab] = useState<"pnpm" | "npm" | "bun">("pnpm");

  const commands = {
    pnpm: "pnpm create portfolio-student my-portfolio",
    npm: "npx create-portfolio-student my-portfolio",
    bun: "bun create portfolio-student my-portfolio",
  };

  const currentCommand = commands[activeTab];

  const handleCopy = () => {
    navigator.clipboard.writeText(currentCommand);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="terminal-card w-full max-w-full overflow-hidden">
      {/* Terminal Header */}
      <div className="terminal-header flex flex-wrap sm:flex-nowrap items-center justify-between gap-2.5">
        <div className="flex items-center gap-2 shrink-0">
          <div className="terminal-dots">
            <span className="terminal-dot terminal-dot-red" />
            <span className="terminal-dot terminal-dot-yellow" />
            <span className="terminal-dot terminal-dot-green" />
          </div>
          <div className="flex items-center gap-1.5">
            <Terminal className="h-3.5 w-3.5 text-[var(--accent)]" />
            <span className="terminal-title font-mono text-[11px] sm:text-xs">bash — 80x24</span>
          </div>
        </div>

        {/* Tab Switcher */}
        <div className="flex items-center gap-1 rounded bg-[var(--paper)] p-0.5 text-xs font-mono text-[var(--muted-foreground)] border border-[var(--line)]">
          {(["pnpm", "npm", "bun"] as const).map((pm) => (
            <button
              key={pm}
              onClick={() => setActiveTab(pm)}
              className={`rounded px-2 py-0.5 text-[11px] sm:text-xs transition-colors ${
                activeTab === pm
                  ? "bg-[var(--line-strong)] text-[var(--accent)] font-semibold"
                  : "hover:text-[var(--foreground)]"
              }`}
              type="button"
            >
              {pm}
            </button>
          ))}
        </div>
      </div>

      {/* Terminal Body */}
      <div className="p-4 sm:p-6 font-mono text-xs sm:text-sm space-y-4 max-w-full overflow-hidden">
        {/* Command Line Row */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 min-w-0">
          <div className="flex items-center gap-2 overflow-x-auto max-w-full min-w-0 pb-1 sm:pb-0 scrollbar-thin">
            <span className="text-[var(--accent)] font-bold shrink-0">~/student-dev $</span>
            <span className="whitespace-nowrap text-xs font-mono text-[var(--foreground)]">{currentCommand}</span>
          </div>

          <button
            onClick={handleCopy}
            className="flex items-center justify-center gap-1.5 rounded border border-[var(--line)] bg-[var(--paper)] px-3 py-1.5 text-xs text-[var(--muted-foreground)] hover:border-[var(--accent)] hover:text-[var(--accent)] transition-colors shrink-0 w-fit"
            type="button"
            aria-label="Copy terminal command"
          >
            {copied ? (
              <>
                <Check className="h-3.5 w-3.5 text-[var(--accent)]" />
                <span className="text-[var(--accent)] font-semibold">Copied</span>
              </>
            ) : (
              <>
                <Copy className="h-3.5 w-3.5" />
                <span>Copy</span>
              </>
            )}
          </button>
        </div>

        {/* Environment Output Info */}
        <div className="pt-3 border-t border-[var(--line)] text-[11px] sm:text-xs text-[var(--muted-foreground)] space-y-1.5 font-mono overflow-hidden">
          <p className="text-[var(--accent)] font-medium">✓ Environment configured:</p>
          <p className="pl-2 sm:pl-3 truncate sm:whitespace-normal">├─ Framework: Next.js 16 (App Router + Turbopack)</p>
          <p className="pl-2 sm:pl-3 truncate sm:whitespace-normal">├─ UI &amp; Style: Tailwind CSS v4 + Geist Mono</p>
          <p className="pl-2 sm:pl-3 truncate sm:whitespace-normal">├─ Data Layer: Prisma ORM + Type-safe Zod</p>
          <p className="pl-2 sm:pl-3 truncate sm:whitespace-normal">└─ Status: 🟢 Ready for production build</p>
        </div>
      </div>
    </div>
  );
}
