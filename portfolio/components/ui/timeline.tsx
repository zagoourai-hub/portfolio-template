"use client";

import React from "react";
import { CheckCircle2, Clock, Sparkles } from "lucide-react";
import { ScrollReveal } from "../scroll-reveal";

export interface TimelineItem {
  id: string;
  date: string;
  title: string;
  subtitle?: string;
  description: string;
  tags?: readonly string[];
  icon?: React.ReactNode;
  current?: boolean;
}

export interface TimelineProps {
  title?: string;
  subtitle?: string;
  description?: string;
  items: readonly TimelineItem[];
}

export function Timeline({
  title = "Journey & Learning Timeline",
  subtitle = "Milestone Progress",
  description = "Jejak langkah belajar koding dari awal mengenal HTML hingga membangun aplikasi fullstack web.",
  items,
}: TimelineProps) {
  return (
    <div className="space-y-10">
      {/* Header */}
      <div className="space-y-2">
        <div className="flex items-center gap-2">
          <Sparkles className="h-4 w-4 text-[var(--accent)]" />
          <span className="eyebrow">{subtitle}</span>
        </div>
        <h2 className="text-3xl sm:text-4xl font-bold tracking-tight text-[var(--foreground)]">
          {title}
        </h2>
        {description && (
          <p className="max-w-2xl text-sm sm:text-base text-[var(--muted-foreground)] leading-relaxed">
            {description}
          </p>
        )}
      </div>

      {/* Vertical Timeline Structure */}
      <div className="relative pl-6 sm:pl-8 space-y-8 before:absolute before:left-2 sm:before:left-3 before:top-3 before:bottom-3 before:w-0.5 before:bg-gradient-to-b before:from-[var(--accent)] before:via-[var(--line-strong)] before:to-transparent">
        {items.map((item, idx) => (
          <ScrollReveal key={item.id} delay={idx * 0.15} duration={0.8}>
            <div className="relative group">
              {/* Timeline Node Icon / Dot */}
              <div className="absolute -left-6 sm:-left-8 top-1.5 flex h-5 w-5 items-center justify-center">
                {item.current ? (
                  <span className="relative flex h-4 w-4">
                    <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[var(--accent)] opacity-75" />
                    <span className="relative inline-flex rounded-full h-4 w-4 bg-[var(--accent)] shadow-[0_0_10px_var(--accent)]" />
                  </span>
                ) : (
                  <span className="h-3 w-3 rounded-full border-2 border-[var(--line-strong)] bg-[var(--paper-raised)] group-hover:border-[var(--accent)] group-hover:bg-[var(--accent)] transition-colors" />
                )}
              </div>

              {/* Timeline Content Card */}
              <div className="rounded-xl border border-[var(--line)] bg-[var(--paper-raised)] p-5 sm:p-6 space-y-3 transition-all hover:border-[var(--line-strong)]">
                <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2 border-b border-[var(--line)] pb-3">
                  <div>
                    <div className="flex items-center gap-2">
                      <h3 className="text-lg font-bold text-[var(--foreground)] group-hover:text-[var(--accent)] transition-colors">
                        {item.title}
                      </h3>
                      {item.current && (
                        <span className="inline-flex items-center gap-1 rounded-full border border-[var(--accent)] bg-[var(--paper-card)] px-2 py-0.5 font-mono text-[10px] font-semibold text-[var(--accent)]">
                          <Clock className="h-3 w-3" />
                          ACTIVE
                        </span>
                      )}
                    </div>
                    {item.subtitle && (
                      <p className="font-mono text-xs text-[var(--muted-foreground)]">
                        {item.subtitle}
                      </p>
                    )}
                  </div>

                  <span className="inline-flex items-center gap-1 font-mono text-xs text-[var(--accent)] bg-[var(--paper)] border border-[var(--line)] px-2.5 py-1 rounded-md shrink-0 w-fit">
                    {item.date}
                  </span>
                </div>

                <p className="text-sm leading-relaxed text-[var(--muted-foreground)]">
                  {item.description}
                </p>

                {item.tags && item.tags.length > 0 && (
                  <div className="flex flex-wrap gap-1.5 pt-2">
                    {item.tags.map((tag) => (
                      <span className="tech-tag text-[11px]" key={tag}>
                        {tag}
                      </span>
                    ))}
                  </div>
                )}
              </div>
            </div>
          </ScrollReveal>
        ))}
      </div>
    </div>
  );
}
