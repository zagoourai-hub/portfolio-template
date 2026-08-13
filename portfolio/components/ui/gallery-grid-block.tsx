"use client";

import React, { useState } from "react";
import Image from "next/image";
import { Maximize2, Sparkles, X } from "lucide-react";

export interface GalleryItem {
  id: string;
  title: string;
  category: "Setup" | "Coding" | "Life";
  imageUrl: string;
  imageAlt: string;
  caption: string;
  span?: string; // Bento grid span layout class
}

const defaultGalleryItems: GalleryItem[] = [
  {
    id: "1",
    title: "Minimal Developer Desk",
    category: "Setup",
    imageUrl: "https://images.unsplash.com/photo-1517694712202-14dd9538aa97?w=1200&auto=format&fit=crop&q=80",
    imageAlt: "MacBook Pro and mechanical keyboard desk setup",
    caption: "Workspace tempat ngulik Next.js 16 & TypeScript setiap malam.",
    span: "md:col-span-2 md:row-span-2 min-h-[240px] sm:min-h-[340px]",
  },
  {
    id: "2",
    title: "Late Night Coding Session",
    category: "Coding",
    imageUrl: "https://images.unsplash.com/photo-1555066931-4365d14bab8c?w=1200&auto=format&fit=crop&q=80",
    imageAlt: "Code editor with syntax highlighting on dark screen",
    caption: "Debugging Prisma ORM and Route Handlers.",
    span: "md:col-span-1 md:row-span-1 min-h-[200px] sm:min-h-[220px]",
  },
  {
    id: "3",
    title: "School Tech Lab",
    category: "Life",
    imageUrl: "https://images.unsplash.com/photo-1531482615713-2afd69097998?w=1200&auto=format&fit=crop&q=80",
    imageAlt: "Students working together in a computer lab",
    caption: "Diskusi project sekolah & kolaborasi bareng temen sekelas.",
    span: "md:col-span-1 md:row-span-1 min-h-[200px] sm:min-h-[220px]",
  },
  {
    id: "4",
    title: "Neovim & Terminal Setup",
    category: "Setup",
    imageUrl: "https://images.unsplash.com/photo-1607799279861-4dd421887fb3?w=1200&auto=format&fit=crop&q=80",
    imageAlt: "Terminal interface with dark green code syntax",
    caption: "Konfigurasi Neovim & Tmux terminal environment.",
    span: "md:col-span-1 md:row-span-2 min-h-[240px] sm:min-h-[340px]",
  },
  {
    id: "5",
    title: "Hackathon Weekend",
    category: "Life",
    imageUrl: "https://images.unsplash.com/photo-1522071820081-009f0129c71c?w=1200&auto=format&fit=crop&q=80",
    imageAlt: "Developers collaborating around a table with laptops",
    caption: "Bikin prototype web app dalam 24 jam.",
    span: "md:col-span-1 md:row-span-1 min-h-[200px] sm:min-h-[220px]",
  },
  {
    id: "6",
    title: "Web Engineering Notebook",
    category: "Coding",
    imageUrl: "https://images.unsplash.com/photo-1542831371-29b0f74f9713?w=1200&auto=format&fit=crop&q=80",
    imageAlt: "HTML & CSS code displayed on modern monitor",
    caption: "Eksperimen komponen UI 21st.dev & Tailwind CSS v4.",
    span: "md:col-span-2 md:row-span-1 min-h-[200px] sm:min-h-[220px]",
  },
];

export function GalleryGridBlock() {
  const [selectedCategory, setSelectedCategory] = useState<string>("All");
  const [activeItem, setActiveItem] = useState<GalleryItem | null>(null);

  const categories = ["All", "Setup", "Coding", "Life"] as const;

  const filteredItems = defaultGalleryItems.filter(
    (item) => selectedCategory === "All" || item.category === selectedCategory
  );

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between border-b border-[var(--line)] pb-6">
        <div className="space-y-2">
          <div className="flex items-center gap-2">
            <Sparkles className="h-4 w-4 text-[var(--accent)]" />
            <span className="eyebrow">21st.dev Bento Gallery</span>
          </div>
          <h2 className="text-2xl sm:text-4xl font-bold tracking-tight text-[var(--foreground)]">
            Galeri Dev Bento Grid
          </h2>
          <p className="text-xs sm:text-sm text-[var(--muted-foreground)]">
            Kumpulan momen ngulik, setup meja koding, dan kegiatan belajar sehari-hari dalam bento grid layout.
          </p>
        </div>

        {/* Category Filters */}
        <div className="flex flex-wrap items-center gap-2">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setSelectedCategory(cat)}
              className={`rounded-lg px-3 py-1.5 font-mono text-xs transition-colors ${
                selectedCategory === cat
                  ? "bg-[var(--accent)] text-[var(--accent-ink)] font-semibold"
                  : "bg-[var(--paper-raised)] text-[var(--muted-foreground)] hover:text-[var(--foreground)] border border-[var(--line)]"
              }`}
              type="button"
            >
              {cat === "All" ? "All Photos" : cat}
            </button>
          ))}
        </div>
      </div>

      {/* 21st.dev Bento Grid Layout */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 auto-rows-[200px] sm:auto-rows-[220px]">
        {filteredItems.map((item) => (
          <div
            key={item.id}
            onClick={() => setActiveItem(item)}
            className={`group relative overflow-hidden rounded-2xl border border-[var(--line)] bg-[var(--paper-raised)] cursor-pointer hover:border-[var(--accent)] transition-all ${
              selectedCategory === "All" ? item.span : "min-h-[200px]"
            }`}
          >
            <Image
              src={item.imageUrl}
              alt={item.imageAlt}
              fill
              sizes="(min-width: 1024px) 33vw, (min-width: 640px) 50vw, 100vw"
              className="object-cover transition-transform duration-500 group-hover:scale-105"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/30 to-transparent opacity-80 group-hover:opacity-95 transition-opacity" />

            <div className="absolute top-3 right-3 rounded-full border border-white/10 bg-black/60 p-2 text-white opacity-0 group-hover:opacity-100 transition-opacity backdrop-blur">
              <Maximize2 className="h-4 w-4" />
            </div>

            <div className="absolute bottom-0 inset-x-0 p-4 sm:p-5 space-y-1 z-10">
              <span className="font-mono text-[10px] font-semibold text-[var(--accent)] px-2.5 py-0.5 rounded border border-[var(--line)] bg-black/70 backdrop-blur w-fit inline-block">
                {item.category}
              </span>
              <h3 className="text-base sm:text-lg font-bold text-white group-hover:text-[var(--accent)] transition-colors">
                {item.title}
              </h3>
              <p className="text-xs text-white/80 line-clamp-2 leading-relaxed">
                {item.caption}
              </p>
            </div>
          </div>
        ))}
      </div>

      {/* Lightbox Modal */}
      {activeItem && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 backdrop-blur-md p-4">
          <div className="relative max-w-4xl w-full max-h-[90vh] overflow-y-auto rounded-2xl border border-[var(--line-strong)] bg-[var(--paper-raised)] shadow-2xl space-y-4 p-4 sm:p-6">
            <button
              onClick={() => setActiveItem(null)}
              className="absolute top-4 right-4 z-10 rounded-full border border-[var(--line)] bg-[var(--paper)] p-2 text-[var(--foreground)] hover:border-[var(--accent)] hover:text-[var(--accent)] transition-colors"
              type="button"
            >
              <X className="h-5 w-5" />
            </button>

            <div className="relative aspect-[16/10] w-full rounded-xl overflow-hidden bg-[var(--paper)]">
              <Image
                src={activeItem.imageUrl}
                alt={activeItem.imageAlt}
                fill
                sizes="100vw"
                className="object-cover"
              />
            </div>

            <div className="space-y-2 font-mono">
              <div className="flex items-center justify-between">
                <span className="text-xs text-[var(--accent)] font-semibold uppercase">
                  {"// "}{activeItem.category}
                </span>
                <span className="text-xs text-[var(--muted-foreground)]">
                  Risz Developer Bento Gallery
                </span>
              </div>
              <h3 className="text-xl font-bold text-[var(--foreground)]">
                {activeItem.title}
              </h3>
              <p className="text-sm text-[var(--muted-foreground)] leading-relaxed">
                {activeItem.caption}
              </p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
