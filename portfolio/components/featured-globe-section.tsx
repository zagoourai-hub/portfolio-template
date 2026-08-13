"use client";

import { Globe } from "@/components/ui/globe";
import { siteConfig } from "@/data/portfolio";
import { Compass, Globe2, MapPin, Sparkles } from "lucide-react";

export function FeaturedGlobeSection() {
  return (
    <div className="relative overflow-hidden rounded-2xl border border-[var(--line)] bg-[var(--paper-raised)] p-6 sm:p-10 transition-all hover:border-[var(--line-strong)]">
      <div className="grid gap-8 lg:grid-cols-2 lg:items-center">
        <div className="space-y-6 z-10">
          <div className="flex items-center gap-2">
            <span className="eyebrow">
              <Sparkles className="h-3.5 w-3.5" />
              21st.dev Featured Component
            </span>
          </div>

          <h2 className="text-3xl sm:text-4xl font-bold tracking-tight text-[var(--foreground)]">
            Global Tech Reach <br />
            <span className="text-[var(--accent)] font-mono">&amp; Interactive 3D Globe</span>
          </h2>

          <p className="text-sm sm:text-base text-[var(--muted-foreground)] leading-relaxed">
            Eksperimen komponen UI dari 21st.dev yang mengintegrasikan Cobe 3D Globe canvas. Drag dan putar globe di samping untuk melihat marker lokasi koding &amp; server node.
          </p>

          <div className="grid grid-cols-2 gap-4 font-mono text-xs pt-2">
            <div className="rounded-lg border border-[var(--line)] bg-[var(--paper)] p-3 space-y-1">
              <div className="flex items-center gap-1.5 text-[var(--accent)] font-semibold">
                <MapPin className="h-3.5 w-3.5" />
                <span>Base City</span>
              </div>
              <p className="text-[var(--foreground)] font-medium">{siteConfig.location}</p>
            </div>

            <div className="rounded-lg border border-[var(--line)] bg-[var(--paper)] p-3 space-y-1">
              <div className="flex items-center gap-1.5 text-[var(--cyan-accent)] font-semibold">
                <Globe2 className="h-3.5 w-3.5" />
                <span>Target Node</span>
              </div>
              <p className="text-[var(--foreground)] font-medium">Asia-Pacific / Vercel Edge</p>
            </div>
          </div>

          <div className="flex items-center gap-2 text-xs font-mono text-[var(--muted-foreground)]">
            <Compass className="h-4 w-4 text-[var(--accent)]" />
            <span>Interactive controls: Click &amp; drag canvas to rotate globe</span>
          </div>
        </div>

        {/* 3D GLOBE CONTAINER */}
        <div className="relative min-h-[320px] sm:min-h-[400px] w-full flex items-center justify-center overflow-hidden rounded-xl border border-[var(--line)] bg-[var(--paper-card)]">
          <Globe className="max-w-[380px] opacity-90" />
          <div className="absolute bottom-4 left-4 z-20 rounded-full border border-[var(--line)] bg-[var(--paper-raised)] px-3 py-1.5 font-mono text-[10px] text-[var(--muted-foreground)] backdrop-blur">
            <span className="text-[var(--accent)] font-semibold">● COBE 3D</span> Canvas Active
          </div>
        </div>
      </div>
    </div>
  );
}
