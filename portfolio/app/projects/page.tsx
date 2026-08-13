import type { Metadata } from "next";
import Link from "next/link";
import { ArrowLeft, Code2 } from "lucide-react";

import { InteractiveProjects } from "@/components/interactive-projects";
import { getPublicPublishedProjects } from "@/server/public";

export const metadata: Metadata = {
  title: "Projects",
  description: "Kumpulan project sekolah, latihan mandiri, dan aplikasi web buatan Risz Developer.",
};

export default async function ProjectsPage() {
  const dbProjects = await getPublicPublishedProjects();

  const formattedProjects = dbProjects.map((p) => ({
    slug: p.slug,
    label: p.category,
    title: p.title,
    summary: p.summary,
    year: new Date(p.createdAt).getFullYear().toString(),
    skills: p.tags.split(",").map((s) => s.trim()),
    challenge: p.summary,
    approach: p.content,
    outcome: "Diterbitkan ke portofolio publik.",
    image: p.imageUrl || "/images/studio-work.png",
    imageAlt: p.title,
    visual: "grid" as const,
    category: p.category as "School" | "Lab" | "Personal",
    githubUrl: p.repoUrl || undefined,
    demoUrl: p.demoUrl || undefined,
  }));

  return (
    <main className="page-shell py-[clamp(3.5rem,8vw,7rem)] space-y-10" id="main-content">
      <div className="space-y-4 border-b border-[var(--line)] pb-8">
        <Link className="inline-flex items-center gap-2 font-mono text-xs text-[var(--muted-foreground)] hover:text-[var(--accent)] transition-colors focus-ring" href="/">
          <ArrowLeft className="h-3.5 w-3.5" />
          <span>Kembali ke Beranda</span>
        </Link>

        <div className="flex items-center gap-2">
          <Code2 className="h-5 w-5 text-[var(--accent)]" />
          <span className="eyebrow">Projects Directory</span>
        </div>

        <h1 className="text-3xl sm:text-5xl font-bold tracking-tight text-[var(--foreground)]">
          Kumpulan Project &amp; Eksperimen
        </h1>

        <p className="max-w-2xl text-base text-[var(--muted-foreground)] leading-relaxed">
          Semua project berstatus PUBLISHED dari database. Gunakan filter atau pencarian di bawah untuk memilah project berdasar kategori atau tech stack.
        </p>
      </div>

      <InteractiveProjects initialProjects={formattedProjects} />
    </main>
  );
}
