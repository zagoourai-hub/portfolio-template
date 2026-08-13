"use client";

import React, { useState } from "react";
import { ArrowUpRight, Check, Code2, Copy, Globe2, Layers, MapPin, Sparkles, Terminal, User } from "lucide-react";
import { GithubIcon } from "@/components/icons";
import { siteConfig } from "@/data/portfolio";

export function GlassmorphismAbout() {
  const [copiedBio, setCopiedBio] = useState(false);

  const stats = [
    { label: "Experience", value: "2+ Years", sub: "Koding & Ngulik Web" },
    { label: "Projects Built", value: "15+ Repos", sub: "Open Source & School" },
    { label: "Code Architecture", value: "100%", sub: "Type-Safe TypeScript" },
    { label: "Base Location", value: "Jawa Barat", sub: "Indonesia (GMT+7)" },
  ] as const;

  const techBadges = [
    "Next.js 16",
    "React 19",
    "TypeScript",
    "Tailwind v4",
    "Prisma v7",
    "Zustand",
    "Node.js",
  ] as const;

  const copyBio = () => {
    navigator.clipboard.writeText(`${siteConfig.name} - ${siteConfig.bio}`);
    setCopiedBio(true);
    setTimeout(() => setCopiedBio(false), 2000);
  };

  return (
    <div className="relative overflow-hidden rounded-3xl border border-[var(--line-strong)] bg-[var(--paper-raised)]/70 backdrop-blur-2xl p-8 sm:p-12 shadow-2xl space-y-10">
      {/* 21st.dev Ambient Dual Glow Corners */}
      <div className="absolute -top-24 -right-24 h-72 w-72 rounded-full bg-[var(--accent)]/15 blur-3xl pointer-events-none" />
      <div className="absolute -bottom-24 -left-24 h-72 w-72 rounded-full bg-[var(--cyan-accent)]/15 blur-3xl pointer-events-none" />

      {/* Top Header Row */}
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between border-b border-[var(--line)] pb-6 relative z-10">
        <div className="flex items-center gap-4">
          <div className="relative">
            <div className="flex h-14 w-14 items-center justify-center rounded-2xl border border-[var(--line-strong)] bg-[var(--paper-card)] text-[var(--accent)] shadow-xl">
              <Code2 className="h-7 w-7" />
            </div>
            <span className="absolute -bottom-1 -right-1 flex h-4 w-4">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[var(--accent)] opacity-75" />
              <span className="relative inline-flex rounded-full h-4 w-4 bg-[var(--accent)] border-2 border-[var(--paper-raised)]" />
            </span>
          </div>

          <div>
            <div className="flex items-center gap-2">
              <h3 className="font-bold text-xl text-[var(--foreground)]">{siteConfig.name}</h3>
              <span className="font-mono text-xs text-[var(--accent)] px-2 py-0.5 rounded border border-[var(--line)] bg-[var(--paper)]">
                {siteConfig.handle}
              </span>
            </div>
            <p className="font-mono text-xs text-[var(--muted-foreground)] pt-0.5">
              {siteConfig.role}
            </p>
          </div>
        </div>

        <div className="flex items-center gap-3">
          <div className="status-badge">
            <span className="dot-live" />
            <span>AVAILABLE FOR COLLAB</span>
          </div>
        </div>
      </div>

      {/* Main Content Grid */}
      <div className="grid gap-10 lg:grid-cols-[1.1fr_0.9fr] lg:items-center relative z-10">
        {/* Left Column: Bio, Philosophy & Badges */}
        <div className="space-y-6">
          <div className="inline-flex items-center gap-2 rounded-full border border-[var(--line)] bg-[var(--paper)] px-3 py-1 text-xs font-mono text-[var(--accent)]">
            <Sparkles className="h-3.5 w-3.5" />
            <span>@moumensoliman / Glassmorphism Block</span>
          </div>

          <h2 className="text-3xl sm:text-4xl font-bold tracking-tight text-[var(--foreground)] leading-[1.15]">
            Building Modern Fullstack Apps with <br />
            <span className="text-[var(--accent)] font-mono">Clean Code Principles.</span>
          </h2>

          <p className="text-sm sm:text-base leading-relaxed text-[var(--muted-foreground)]">
            {siteConfig.bio}
          </p>

          {/* Tech Badges List */}
          <div className="space-y-2 pt-2">
            <span className="font-mono text-xs text-[var(--muted-foreground)]">Core Stack &amp; Tools:</span>
            <div className="flex flex-wrap gap-2">
              {techBadges.map((badge) => (
                <span
                  key={badge}
                  className="rounded-lg border border-[var(--line)] bg-[var(--paper)]/90 px-3 py-1 font-mono text-xs text-[var(--foreground)] hover:border-[var(--accent)] transition-colors backdrop-blur"
                >
                  {badge}
                </span>
              ))}
            </div>
          </div>

          {/* Action Buttons */}
          <div className="flex flex-wrap gap-3 pt-2">
            <a
              href={siteConfig.github}
              target="_blank"
              rel="noopener noreferrer"
              className="button-primary focus-ring text-xs"
            >
              <GithubIcon className="h-4 w-4" />
              <span>GitHub Profile</span>
              <ArrowUpRight className="h-3.5 w-3.5" />
            </a>

            <button
              onClick={copyBio}
              className="button-secondary focus-ring text-xs"
              type="button"
            >
              {copiedBio ? (
                <>
                  <Check className="h-4 w-4 text-[var(--accent)]" />
                  <span className="text-[var(--accent)]">Copied Bio!</span>
                </>
              ) : (
                <>
                  <Copy className="h-4 w-4" />
                  <span>Copy Developer Bio</span>
                </>
              )}
            </button>
          </div>
        </div>

        {/* Right Column: Glass Bento Stats Cards */}
        <div className="grid grid-cols-2 gap-4">
          {stats.map((stat, idx) => (
            <div
              key={idx}
              className="group rounded-2xl border border-[var(--line)] bg-[var(--paper)]/80 p-5 space-y-2 hover:border-[var(--accent)] transition-all hover:-translate-y-0.5 backdrop-blur shadow-lg"
            >
              <p className="font-mono text-[11px] text-[var(--muted-foreground)]">{stat.label}</p>
              <p className="text-2xl sm:text-3xl font-bold text-[var(--foreground)] group-hover:text-[var(--accent)] transition-colors">
                {stat.value}
              </p>
              <p className="font-mono text-[10px] text-[var(--accent)]">{stat.sub}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
