import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowLeft, ExternalLink, Terminal } from "lucide-react";

import { GithubIcon } from "@/components/icons";
import { getPublicProjectBySlug } from "@/server/public";

type ProjectPageProps = {
  params: Promise<{ slug: string }>;
};

export async function generateMetadata({ params }: ProjectPageProps): Promise<Metadata> {
  const { slug } = await params;
  const project = await getPublicProjectBySlug(slug);

  if (!project) {
    return { title: "Project Tidak Ditemukan" };
  }

  return {
    title: project.title,
    description: project.summary,
  };
}

export default async function ProjectPage({ params }: ProjectPageProps) {
  const { slug } = await params;
  const project = await getPublicProjectBySlug(slug);

  if (!project) {
    notFound();
  }

  const tags = project.tags.split(",").map((s) => s.trim());

  return (
    <main id="main-content">
      <section className="page-shell py-[clamp(3rem,7vw,6rem)] space-y-10">
        <Link className="inline-flex items-center gap-2 font-mono text-xs text-[var(--muted-foreground)] hover:text-[var(--accent)] transition-colors focus-ring" href="/projects">
          <ArrowLeft className="h-3.5 w-3.5" />
          <span>Kembali ke Kumpulan Project</span>
        </Link>

        <div className="grid gap-10 lg:grid-cols-[1fr_1.1fr] lg:items-start">
          <div className="space-y-6">
            <div className="space-y-3">
              <span className="eyebrow">{project.category}</span>
              <h1 className="text-3xl sm:text-5xl font-bold tracking-tight text-[var(--foreground)]">
                {project.title}
              </h1>
              <p className="text-base sm:text-lg leading-relaxed text-[var(--muted-foreground)]">
                {project.summary}
              </p>
            </div>

            {/* Spec Table */}
            <div className="rounded-xl border border-[var(--line)] bg-[var(--paper-raised)] p-5 space-y-4 font-mono text-xs">
              <div className="flex items-center justify-between border-b border-[var(--line)] pb-3">
                <span className="text-[var(--muted-foreground)]">Waktu Diterbitkan</span>
                <span className="text-[var(--foreground)]">{new Date(project.createdAt).getFullYear()}</span>
              </div>
              <div className="flex items-center justify-between border-b border-[var(--line)] pb-3">
                <span className="text-[var(--muted-foreground)]">Kategori</span>
                <span className="text-[var(--accent)]">{project.category} Project</span>
              </div>
              <div className="flex flex-wrap items-center justify-between gap-2">
                <span className="text-[var(--muted-foreground)]">Links</span>
                <div className="flex items-center gap-3">
                  {project.repoUrl && (
                    <a
                      href={project.repoUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-1 text-[var(--accent)] hover:underline"
                    >
                      <GithubIcon className="h-3.5 w-3.5" />
                      <span>GitHub</span>
                    </a>
                  )}
                  {project.demoUrl && (
                    <a
                      href={project.demoUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-1 text-[var(--accent)] hover:underline"
                    >
                      <ExternalLink className="h-3.5 w-3.5" />
                      <span>Live Demo</span>
                    </a>
                  )}
                </div>
              </div>
            </div>

            {/* Tech Badges */}
            <div className="space-y-2">
              <span className="font-mono text-xs text-[var(--muted-foreground)]">Tech Stack:</span>
              <div className="flex flex-wrap gap-2">
                {tags.map((skill) => (
                  <span className="tech-tag" key={skill}>
                    {skill}
                  </span>
                ))}
              </div>
            </div>
          </div>

          {/* Project Details / Content */}
          <div className="rounded-xl border border-[var(--line)] bg-[var(--paper-raised)] p-6 space-y-4">
            <h2 className="font-semibold text-[var(--foreground)]">Detail & Cerita Koding</h2>
            <p className="text-sm leading-relaxed text-[var(--muted-foreground)] whitespace-pre-line">
              {project.content}
            </p>
          </div>
        </div>
      </section>

      {/* CASE STUDY SECTION */}
      <section className="border-y border-[var(--line)] bg-[var(--paper-raised)] py-[clamp(3.5rem,8vw,7rem)]">
        <div className="page-shell space-y-10">
          <div className="space-y-2">
            <span className="eyebrow">Project Summary</span>
            <h2 className="text-2xl sm:text-4xl font-bold tracking-tight text-[var(--foreground)]">
              Tantangan &amp; Solusi
            </h2>
          </div>

          <div className="grid gap-6 md:grid-cols-2">
            <div className="rounded-xl border border-[var(--line)] bg-[var(--paper)] p-6 space-y-3">
              <div className="flex items-center gap-2 text-[var(--accent)] font-mono text-sm font-semibold">
                <Terminal className="h-4 w-4" />
                <span>Ringkasan Singkat</span>
              </div>
              <p className="text-sm text-[var(--muted-foreground)] leading-relaxed">
                {project.summary}
              </p>
            </div>

            <div className="rounded-xl border border-[var(--line)] bg-[var(--paper)] p-6 space-y-3">
              <div className="flex items-center gap-2 text-[var(--cyan-accent)] font-mono text-sm font-semibold">
                <Terminal className="h-4 w-4" />
                <span>Pendekatan &amp; Implementasi</span>
              </div>
              <p className="text-sm text-[var(--muted-foreground)] leading-relaxed">
                {project.content}
              </p>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}
