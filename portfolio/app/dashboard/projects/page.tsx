"use client";

import { useEffect, useState, Suspense } from "react";
import { useSearchParams } from "next/navigation";
import { ArrowRight, FolderPlus, Layers3, Loader2, Trash2, AlertTriangle } from "lucide-react";
import Link from "next/link";
import { toast } from "sonner";

import {
  DashboardEmptyState,
  DashboardPageHeader,
  DashboardPanel,
  DashboardStatusBadge,
} from "@/components/dashboard/dashboard-ui";

type ProjectItem = {
  id: string;
  title: string;
  slug: string;
  summary: string;
  category: string;
  status: "DRAFT" | "PUBLISHED";
  updatedAt: string;
};

function ProjectsList() {
  const [projects, setProjects] = useState<ProjectItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  
  const searchParams = useSearchParams();
  const search = searchParams?.get("search") || "";

  const fetchProjects = async () => {
    try {
      const res = await fetch("/api/admin/projects");
      const data = await res.json();
      if (res.ok && data.projects) {
        setProjects(data.projects);
      }
    } catch {
      setError("Gagal memuat daftar project.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    let ignore = false;
    async function load() {
      try {
        const res = await fetch("/api/admin/projects");
        const data = await res.json();
        if (!ignore && res.ok && data.projects) {
          setProjects(data.projects);
        }
      } catch {
        if (!ignore) setError("Gagal memuat daftar project.");
      } finally {
        if (!ignore) setLoading(false);
      }
    }
    load();
    return () => {
      ignore = true;
    };
  }, []);

  const confirmDeleteProject = (id: string, title: string) => {
    toast.custom((t) => (
      <div className="w-full max-w-md rounded-2xl border border-[var(--line-strong)] bg-[var(--paper-card)]/95 backdrop-blur-xl p-5 shadow-2xl space-y-4">
        <div className="flex items-start gap-3.5">
          <div className="flex size-10 shrink-0 items-center justify-center rounded-xl bg-red-500/10 text-red-400 border border-red-500/20">
            <AlertTriangle className="size-5" />
          </div>
          <div>
            <h3 className="text-base font-semibold text-[var(--foreground)]">Hapus Project?</h3>
            <p className="mt-1 text-xs text-[var(--muted-foreground)] leading-relaxed">
              Apakah Anda yakin ingin menghapus project <span className="font-semibold text-[var(--foreground)]">&quot;{title}&quot;</span>? Tindakan ini tidak dapat dibatalkan.
            </p>
          </div>
        </div>
        <div className="flex items-center justify-end gap-2 pt-2 border-t border-[var(--line)]">
          <button
            onClick={() => toast.dismiss(t)}
            className="px-3.5 py-1.5 rounded-lg border border-[var(--line)] text-xs font-medium text-[var(--muted-foreground)] hover:bg-[var(--paper-raised)] hover:text-[var(--foreground)] transition-colors"
          >
            Batal
          </button>
          <button
            onClick={async () => {
              toast.dismiss(t);
              await executeDelete(id, title);
            }}
            className="px-3.5 py-1.5 rounded-lg bg-red-500 hover:bg-red-600 text-xs font-semibold text-white transition-colors"
          >
            Ya, Hapus
          </button>
        </div>
      </div>
    ), { duration: 8000 });
  };

  const executeDelete = async (id: string, title: string) => {
    try {
      const res = await fetch(`/api/admin/projects/${id}`, {
        method: "DELETE",
      });

      if (res.ok) {
        toast.success("Project Berhasil Dihapus", {
          description: `"${title}" telah dihapus dari database.`,
        });
        fetchProjects();
      } else {
        toast.error("Gagal Menghapus Project", {
          description: "Terjadi kesalahan server.",
        });
      }
    } catch {
      toast.error("Kesalahan Jaringan", {
        description: "Gagal terhubung ke server.",
      });
    }
  };

  if (loading) {
    return (
      <main className="flex min-h-[60vh] w-full items-center justify-center px-4" id="main-content">
        <div className="flex items-center gap-3 font-mono text-sm text-[var(--muted-foreground)]">
          <Loader2 className="size-5 animate-spin text-[var(--accent)]" />
          Memuat daftar project...
        </div>
      </main>
    );
  }

  const filteredProjects = projects.filter((project) => {
    if (!search) return true;
    const query = search.toLowerCase().trim();
    return (
      project.title.toLowerCase().includes(query) ||
      project.summary.toLowerCase().includes(query) ||
      project.category.toLowerCase().includes(query)
    );
  });

  return (
    <main className="w-full px-4 lg:px-8 py-6 space-y-6" id="main-content">
      <DashboardPageHeader
        actions={
          <Link className="button-primary focus-ring text-xs" href="/dashboard/projects/new">
            <FolderPlus aria-hidden="true" className="size-3.5" />
            Tambah project
          </Link>
        }
        description="Kelola cerita project yang tersimpan pada database SQLite."
        title="Projects"
      />

      <section aria-labelledby="project-list-title" className="mt-8">
        <div className="flex flex-wrap items-center justify-between gap-3 border-b border-[var(--line)] pb-4">
          <div className="flex items-center gap-2">
            <Layers3 aria-hidden="true" className="size-4 text-[var(--cyan-accent)]" />
            <h2 className="text-lg font-semibold tracking-[-0.02em] text-[var(--foreground)]" id="project-list-title">
              Daftar project tersimpan
            </h2>
          </div>
          <p className="font-mono text-xs text-[var(--muted-foreground)]">{filteredProjects.length} DATABASE ITEMS</p>
        </div>

        {error && (
          <div className="mt-4 rounded-md border border-red-500/30 bg-red-500/10 p-3 text-sm text-red-500">
            {error}
          </div>
        )}

        {projects.length === 0 ? (
          <div className="mt-4">
            <DashboardEmptyState
              action={
                <Link className="button-primary focus-ring text-sm" href="/dashboard/projects/new">
                  Tambah project
                </Link>
              }
              description="Mulai dari satu project yang paling jelas menunjukkan proses belajarmu."
              title="Belum ada project"
            />
          </div>
        ) : filteredProjects.length === 0 ? (
          <div className="mt-8 rounded-xl border border-dashed border-[var(--line)] bg-[var(--paper-raised)] p-12 text-center space-y-4">
            <p className="font-mono text-sm text-[var(--accent)]">404 // NO MATCH FOUND</p>
            <h3 className="text-xl font-bold text-[var(--foreground)]">Tidak ada project yang cocok</h3>
            <p className="text-sm text-[var(--muted-foreground)] max-w-md mx-auto">
              Tidak ada hasil untuk kata kunci pencarian &quot;<span className="text-[var(--foreground)] font-semibold">{search}</span>&quot;. Coba kata kunci lainnya.
            </p>
            <Link
              href="/dashboard/projects"
              className="button-outline focus-ring text-xs inline-flex h-9 items-center justify-center rounded-xl px-4"
            >
              Reset Pencarian
            </Link>
          </div>
        ) : (
          <div className="mt-4 space-y-3">
            {filteredProjects.map((project) => (
              <DashboardPanel key={project.id}>
                <article className="grid gap-5 p-5 md:grid-cols-[minmax(0,1.25fr)_minmax(10rem,0.4fr)_auto] md:items-center sm:p-6">
                  <div className="min-w-0">
                    <div className="flex flex-wrap items-center gap-2">
                      <p className="font-mono text-xs text-[var(--cyan-accent)]">{project.category.toUpperCase()}</p>
                      <DashboardStatusBadge status={project.status} />
                    </div>
                    <h3 className="mt-3 text-lg font-semibold tracking-[-0.025em] text-[var(--foreground)]">{project.title}</h3>
                    <p className="mt-2 max-w-3xl text-sm leading-6 text-[var(--muted-foreground)]">{project.summary}</p>
                  </div>
                  <div className="border-l-0 border-[var(--line)] md:border-l md:pl-5">
                    <p className="font-mono text-[11px] text-[var(--muted-foreground)]">UPDATE</p>
                    <p className="mt-2 text-sm text-[var(--foreground)]">
                      {new Date(project.updatedAt).toLocaleDateString("id-ID", {
                        day: "numeric",
                        month: "short",
                        year: "numeric",
                      })}
                    </p>
                  </div>
                  <div className="flex items-center gap-2">
                    <Link className="button-outline focus-ring text-sm" href={`/dashboard/projects/${project.id}`}>
                      Edit
                      <ArrowRight aria-hidden="true" className="size-4" />
                    </Link>
                    <button
                      aria-label={`Hapus project ${project.title}`}
                      className="focus-ring p-2 text-[var(--muted-foreground)] hover:text-red-400"
                      onClick={() => confirmDeleteProject(project.id, project.title)}
                      type="button"
                    >
                      <Trash2 className="size-4" />
                    </button>
                  </div>
                </article>
              </DashboardPanel>
            ))}
          </div>
        )}
      </section>
    </main>
  );
}

export default function DashboardProjectsPage() {
  return (
    <Suspense fallback={
      <main className="flex min-h-[60vh] w-full items-center justify-center px-4" id="main-content">
        <div className="flex items-center gap-3 font-mono text-sm text-[var(--muted-foreground)]">
          <Loader2 className="size-5 animate-spin text-[var(--accent)]" />
          Memuat halaman project...
        </div>
      </main>
    }>
      <ProjectsList />
    </Suspense>
  );
}
