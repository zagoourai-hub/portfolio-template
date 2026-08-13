"use client";

import { useState } from "react";
import { Filter, Search } from "lucide-react";
import { PortfolioProject } from "@/data/portfolio";
import { ProjectCard } from "@/components/project-card";

type InteractiveProjectsProps = {
  initialProjects: readonly PortfolioProject[];
};

export function InteractiveProjects({ initialProjects }: InteractiveProjectsProps) {
  const [selectedCategory, setSelectedCategory] = useState<string>("All");
  const [searchQuery, setSearchQuery] = useState<string>("");

  const categories = ["All", "School", "Lab", "Personal"] as const;

  const filteredProjects = initialProjects.filter((project) => {
    const matchesCategory =
      selectedCategory === "All" || project.category === selectedCategory;
    const matchesSearch =
      project.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      project.summary.toLowerCase().includes(searchQuery.toLowerCase()) ||
      project.skills.some((skill) =>
        skill.toLowerCase().includes(searchQuery.toLowerCase())
      );

    return matchesCategory && matchesSearch;
  });

  return (
    <div className="space-y-8">
      {/* Filter and Search Bar */}
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between rounded-xl border border-[var(--line)] bg-[var(--paper-raised)] p-4">
        {/* Category Filters */}
        <div className="flex flex-wrap items-center gap-2">
          <Filter className="h-4 w-4 text-[var(--accent)] mr-1 hidden sm:inline-block" />
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setSelectedCategory(cat)}
              className={`rounded-lg px-3 py-1.5 font-mono text-xs transition-colors ${
                selectedCategory === cat
                  ? "bg-[var(--accent)] text-[var(--accent-ink)] font-semibold"
                  : "bg-[var(--paper)] text-[var(--muted-foreground)] hover:text-[var(--foreground)] border border-[var(--line)]"
              }`}
              type="button"
            >
              {cat === "All" ? "All Projects" : cat}
            </button>
          ))}
        </div>

        {/* Search Bar */}
        <div className="relative min-w-[240px]">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-3.5 w-3.5 text-[var(--muted-foreground)]" />
          <input
            type="text"
            placeholder="Search project or skill..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full rounded-lg border border-[var(--line)] bg-[var(--paper)] py-1.5 pl-9 pr-3 font-mono text-xs text-[var(--foreground)] placeholder-[var(--muted-foreground)] focus:border-[var(--accent)] focus:outline-none"
          />
        </div>
      </div>

      {/* Results Count */}
      <div className="flex items-center justify-between text-xs font-mono text-[var(--muted-foreground)] px-1">
        <span>Showing {filteredProjects.length} of {initialProjects.length} projects</span>
        {(selectedCategory !== "All" || searchQuery !== "") && (
          <button
            onClick={() => {
              setSelectedCategory("All");
              setSearchQuery("");
            }}
            className="text-[var(--accent)] hover:underline"
            type="button"
          >
            Reset Filters
          </button>
        )}
      </div>

      {/* Projects List */}
      {filteredProjects.length > 0 ? (
        <div className="grid gap-8">
          {filteredProjects.map((project, index) => (
            <ProjectCard
              featured={index === 0}
              key={project.slug}
              preload={index === 0}
              project={project}
            />
          ))}
        </div>
      ) : (
        <div className="rounded-xl border border-dashed border-[var(--line)] bg-[var(--paper-raised)] p-12 text-center space-y-3">
          <p className="font-mono text-sm text-[var(--accent)]">404 // NO MATCH FOUND</p>
          <h3 className="text-xl font-bold text-[var(--foreground)]">Tidak ada project yang cocok</h3>
          <p className="text-sm text-[var(--muted-foreground)] max-w-md mx-auto">
            Coba ganti kata kunci pencarian atau pilih kategori &quot;All Projects&quot;.
          </p>
        </div>
      )}
    </div>
  );
}
