"use client";

import React from "react";
import { Code2, Cpu, Globe2, ShieldCheck, Sparkles, Terminal, Zap } from "lucide-react";

export interface RuixenFeature {
  icon: React.ReactNode;
  title: string;
  description: string;
  badge?: string;
  highlight?: string;
}

export interface RuixenFeatureSectionProps {
  eyebrow?: string;
  title?: string;
  description?: string;
  features?: RuixenFeature[];
}

export function RuixenFeatureSection({
  eyebrow = "Ruixen Feature Matrix // 21st.dev",
  title = "Arsitektur Koding Tanpa AI Slop",
  description = "Setiap komponen dirancang dengan fungsionalitas utama, kontras tinggi, type-safety TypeScript, dan performa tinggi.",
  features = [
    {
      icon: <Code2 className="h-5 w-5 text-[var(--accent)]" />,
      title: "Type-Safe Fullstack Logic",
      description: "Integrasi Next.js 16 App Router + Route Handlers dengan validasi Zod & TypeScript murni.",
      badge: "TypeScript 5",
      highlight: "Zod Validated",
    },
    {
      icon: <Zap className="h-5 w-5 text-[var(--cyan-accent)]" />,
      title: "Turbopack Fast Build",
      description: "Kompilasi cepat di bawah 1 detik untuk pengalaman developer yang frictionless.",
      badge: "Next.js 16",
      highlight: "Instant HMR",
    },
    {
      icon: <ShieldCheck className="h-5 w-5 text-[var(--accent)]" />,
      title: "Clean DOM & Accessibility",
      description: "100% Semantic HTML5, visible focus rings, ARIA landmarks, & keyboard navigation.",
      badge: "WCAG Compliant",
      highlight: "A11y Verified",
    },
    {
      icon: <Globe2 className="h-5 w-5 text-[var(--cyan-accent)]" />,
      title: "Edge Database & Prisma",
      description: "Driver adapter Prisma v7 SQLite/Postgres dengan response time ultra-rendah.",
      badge: "Prisma v7",
      highlight: "SQLite / Postgres",
    },
  ],
}: RuixenFeatureSectionProps) {
  return (
    <div className="space-y-12">
      {/* Header */}
      <div className="space-y-3 text-center max-w-2xl mx-auto">
        <div className="inline-flex items-center gap-2 rounded-full border border-[var(--line)] bg-[var(--paper-raised)] px-3 py-1 text-xs font-mono text-[var(--accent)]">
          <Sparkles className="h-3.5 w-3.5" />
          <span>{eyebrow}</span>
        </div>
        <h2 className="text-3xl sm:text-4xl font-bold tracking-tight text-[var(--foreground)]">
          {title}
        </h2>
        <p className="text-sm sm:text-base text-[var(--muted-foreground)] leading-relaxed">
          {description}
        </p>
      </div>

      {/* Feature Grid Container */}
      <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
        {features.map((feat, idx) => (
          <div
            key={idx}
            className="group relative overflow-hidden rounded-xl border border-[var(--line)] bg-[var(--paper-raised)] p-6 space-y-4 transition-all duration-200 hover:border-[var(--accent)] hover:-translate-y-1"
          >
            {/* Top Badge & Icon */}
            <div className="flex items-center justify-between border-b border-[var(--line)] pb-3">
              <div className="rounded-lg border border-[var(--line)] bg-[var(--paper)] p-2.5">
                {feat.icon}
              </div>
              {feat.badge && (
                <span className="font-mono text-[10px] font-semibold px-2 py-0.5 rounded border border-[var(--line)] text-[var(--accent)] bg-[var(--paper-card)]">
                  {feat.badge}
                </span>
              )}
            </div>

            {/* Title & Description */}
            <div className="space-y-2">
              <h3 className="text-lg font-bold text-[var(--foreground)] group-hover:text-[var(--accent)] transition-colors">
                {feat.title}
              </h3>
              <p className="text-xs sm:text-sm text-[var(--muted-foreground)] leading-relaxed">
                {feat.description}
              </p>
            </div>

            {/* Bottom Highlight Status */}
            {feat.highlight && (
              <div className="pt-2 flex items-center gap-1.5 font-mono text-[11px] text-[var(--muted-foreground)]">
                <Terminal className="h-3 w-3 text-[var(--accent)]" />
                <span>{feat.highlight}</span>
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}
